import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import StudentScheduleClient from "@/components/(portal)/student/student-schedule-client";
import { EnrollmentStatus, SessionStatus } from "@/app/generated/prisma/enums";

export default async function StudentSchedulePage({
  searchParams,
}: {
  searchParams: Promise<{ view?: string; week?: string }>;
}) {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const params = await searchParams;
  const view = params.view || "weekly";
  const weekParam = params.week;

  // 1. Get Student Profile
  const student = await prisma.student.findUnique({
    where: { userId: session.user.id },
    select: { id: true, studentId: true, user: { select: { name: true } } },
  });

  if (!student) redirect("/onboarding");

  // 2. Temporal Logic (Date Ranges)
  const now = new Date();
  let startDate: Date;
  if (weekParam) {
    startDate = new Date(parseInt(weekParam));
  } else {
    const day = now.getDay();
    const diff = now.getDate() - day + (day === 0 ? -6 : 1); // Monday start
    startDate = new Date(now.setDate(diff));
  }
  startDate.setHours(0, 0, 0, 0);
  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + 6);
  endDate.setHours(23, 59, 59, 999);

  // 3. Parallel Data Fetching
  const [schedules, sessions, assignments, teachers] = await Promise.all([
    // Recurring Weekly Classes via Enrollment
    prisma.classSchedule.findMany({
      where: {
        class: {
          enrollments: {
            some: { studentId: student.id, status: EnrollmentStatus.ACTIVE },
          },
        },
      },
      include: {
        class: {
          include: {
            teacher: {
              include: { user: { select: { name: true, image: true } } },
            },
          },
        },
      },
    }),
    // One-on-One Sessions within this specific week
    prisma.scheduledSession.findMany({
      where: {
        subscription: { studentId: student.id },
        status: SessionStatus.SCHEDULED,
        date: { gte: startDate, lte: endDate },
      },
      include: {
        teacher: { include: { user: { select: { name: true, image: true } } } },
      },
    }),
    // Assignments due in this temporal window
    prisma.assignment.findMany({
      where: {
        subject: {
          class: { enrollments: { some: { studentId: student.id } } },
        },
        dueDate: { gte: startDate, lte: endDate },
      },
      include: { subject: { select: { name: true } } },
    }),
    // Available teachers for booking
    prisma.teacher.findMany({
      where: { isAvailable: true },
      include: { user: { select: { name: true, image: true } } },
      take: 6,
    }),
  ]);

  // 4. Data Transformation for Timeline UI
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const weeklySchedule = days.map((dayName, index) => {
    const daySchedules = schedules.filter((s) => s.dayOfWeek === index);
    const daySessions = sessions.filter(
      (s) => new Date(s.date).getDay() === index,
    );

    return {
      day: index,
      dayName,
      items: [
        ...daySchedules.map((s) => ({
          type: "CLASS",
          id: s.id,
          title: s.class.name,
          time: `${s.startTime} - ${s.endTime}`,
          teacher: s.class.teacher.user.name,
          teacherImage: s.class.teacher.user.image,
          isOnline: s.isLive,
          meetingUrl: s.meetingUrl,
        })),
        ...daySessions.map((s) => ({
          type: "SESSION",
          id: s.id,
          title: "1-on-1 Mentorship",
          time: `${s.startTime} - ${s.endTime}`,
          teacher: s.teacher.user.name,
          teacherImage: s.teacher.user.image,
          isOnline: true,
          meetingUrl: s.meetingUrl,
        })),
      ].sort((a, b) => a.time.localeCompare(b.time)),
    };
  });

  return (
    <StudentScheduleClient
      student={student}
      weeklySchedule={weeklySchedule}
      upcomingAssignments={assignments.map((a) => ({
        ...a,
        dueDate: a.dueDate.toISOString(),
      }))}
      availableTeachers={teachers}
      stats={{
        totalEvents: schedules.length + sessions.length,
        pendingTasks: assignments.length,
        dateRange: `${startDate.toLocaleDateString()} — ${endDate.toLocaleDateString()}`,
      }}
      filters={{ view, week: weekParam || "current" }}
    />
  );
}
