import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import TeacherScheduleClient from "@/components/teacher/teacher-schedule-client";

export const metadata = {
  title: "My Schedule | Teacher",
  description: "Weekly class timetable",
};

export default async function TeacherSchedulePage() {
  const session = await auth();

  if (!session?.user?.email) redirect("/login");
  if (session.user.role !== "TEACHER") redirect("/dashboard");

  // 1. Get Teacher ID
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: { teacherProfile: true },
  });

  if (!user?.teacherProfile) return <div>Profile not found.</div>;

  // 2. Fetch Schedule & Classes
  const schedules = await prisma.classSchedule.findMany({
    where: {
      class: { teacherId: user.teacherProfile.id },
    },
    include: {
      class: {
        select: { id: true, name: true, code: true, level: true },
      },
    },
    orderBy: [{ dayOfWeek: "asc" }, { startTime: "asc" }],
  });

  // Serialize
  const serializedSchedules = schedules.map((s) => ({
    ...s,
    createdAt: s.createdAt.toISOString(),
    updatedAt: s.updatedAt.toISOString(),
  }));

  return <TeacherScheduleClient schedules={serializedSchedules} />;
}
