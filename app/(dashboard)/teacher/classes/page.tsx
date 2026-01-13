import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import TeacherClassesClient from "@/components/teacher/teacher-classes-client";

export const metadata = {
  title: "My Classes | Teacher",
  description: "Manage your courses and students",
};

export default async function TeacherClassesPage() {
  const session = await auth();
  if (!session?.user?.email) redirect("/login");

  const dbUser = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { teacherProfile: { select: { id: true } } },
  });

  if (!dbUser?.teacherProfile) redirect("/dashboard");

  const classesRaw = await prisma.class.findMany({
    where: { teacherId: dbUser.teacherProfile.id, isActive: true },
    include: {
      _count: { select: { enrollments: true } },
      subjects: {
        select: {
          name: true,
          _count: { select: { assignments: true } },
        },
      },
      schedules: { orderBy: { dayOfWeek: "asc" } },
      enrollments: {
        take: 4,
        include: {
          student: {
            include: { user: { select: { image: true, name: true } } },
          },
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  const classes = classesRaw.map((c) => ({
    id: c.id,
    name: c.name,
    code: c.code,
    level: c.level,
    capacity: c.capacity,
    studentsCount: c._count.enrollments,
    // Sum assignments from all subjects in this class
    assignmentsCount: c.subjects.reduce(
      (acc, s) => acc + s._count.assignments,
      0
    ),
    subjects: c.subjects.map((s) => s.name).join(", "),
    nextSession: getNextSession(c.schedules),
    studentPreviews: c.enrollments.map((e) => ({
      image: e.student.user.image,
      name: e.student.user.name,
    })),
  }));

  return <TeacherClassesClient classes={classes} />;
}

function getNextSession(schedules: any[]) {
  if (!schedules.length) return null;
  const now = new Date();
  const today = now.getDay();
  const time = now.getHours() * 60 + now.getMinutes();

  // Find today later, or next day
  const next =
    schedules.find((s: any) => {
      const [h, m] = s.startTime.split(":").map(Number);
      return (
        s.dayOfWeek > today || (s.dayOfWeek === today && h * 60 + m > time)
      );
    }) || schedules[0]; // Wrap to start of week

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return {
    day: days[next.dayOfWeek],
    time: next.startTime,
    isToday: next.dayOfWeek === today,
  };
}
