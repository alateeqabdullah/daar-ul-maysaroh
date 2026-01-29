import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import StudentScheduleClient from "@/components/(portal)/student/student-schedule-client";

export default async function StudentSchedulePage({
  searchParams,
}: {
  searchParams: Promise<{ view?: string; week?: string }>;
}) {
  const session = await auth();
  if (!session?.user?.email) redirect("/login");

  const params = await searchParams;
  const view = params.view || "weekly";
  const week = params.week || "current";

  try {
    // Get student
    const student = await prisma.student.findFirst({
      where: { user: { email: session.user.email } },
      select: { id: true, studentId: true, user: { select: { name: true } } },
    });

    if (!student) redirect("/onboarding");

    // Calculate date range
    const now = new Date();
    let startDate: Date;
    let endDate: Date;

    if (week === "current") {
      const day = now.getDay();
      const diff = now.getDate() - day + (day === 0 ? -6 : 1);
      startDate = new Date(now.setDate(diff));
      startDate.setHours(0, 0, 0, 0);
      endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + 6);
      endDate.setHours(23, 59, 59, 999);
    } else {
      const weekStart = new Date(parseInt(week));
      startDate = new Date(weekStart);
      startDate.setHours(0, 0, 0, 0);
      endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + 6);
      endDate.setHours(23, 59, 59, 999);
    }

    // Fetch data in parallel
    const [schedules, sessions, assignments, teachers] = await Promise.all([
      // Regular classes
      prisma.classSchedule.findMany({
        where: {
          class: {
            enrollments: {
              some: {
                studentId: student.id,
                status: "ACTIVE",
              },
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
        orderBy: [{ dayOfWeek: "asc" }, { startTime: "asc" }],
      }),

      // Scheduled sessions this week
      prisma.scheduledSession.findMany({
        where: {
          subscription: { studentId: student.id },
          status: "SCHEDULED",
          date: {
            gte: startDate,
            lte: endDate,
          },
        },
        include: {
          teacher: {
            include: { user: { select: { name: true, image: true } } },
          },
          subscription: {
            include: { plan: { select: { name: true } } },
          },
        },
        orderBy: [{ date: "asc" }, { startTime: "asc" }],
      }),

      // Assignments due this week
      prisma.assignment.findMany({
        where: {
          subject: {
            class: {
              enrollments: {
                some: {
                  studentId: student.id,
                  status: "ACTIVE",
                },
              },
            },
          },
          dueDate: {
            gte: startDate,
            lte: endDate,
          },
        },
        include: {
          subject: {
            include: {
              class: { select: { name: true } },
              teacher: {
                include: { user: { select: { name: true } } },
              },
            },
          },
        },
        take: 10,
      }),

      // Available teachers for booking
      prisma.teacher.findMany({
        where: { isAvailable: true },
        include: {
          user: { select: { name: true, image: true } },
          _count: {
            select: {
              scheduledSessions: {
                where: {
                  status: "SCHEDULED",
                  date: { gte: startDate },
                },
              },
            },
          },
        },
        take: 10,
      }),
    ]);

    // Prepare data
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
            type: "CLASS" as const,
            id: s.id,
            title: s.class.name,
            time: `${s.startTime} - ${s.endTime}`,
            teacher: s.class.teacher.user.name,
            teacherImage: s.class.teacher.user.image,
            isOnline: s.isLive,
            meetingUrl: s.meetingUrl,
            isRecurring: s.isRecurring,
          })),
          ...daySessions.map((s) => ({
            type: "SESSION" as const,
            id: s.id,
            title: s.subscription.plan.name,
            time: `${s.startTime} - ${s.endTime}`,
            teacher: s.teacher.user.name,
            teacherImage: s.teacher.user.image,
            meetingUrl: s.meetingUrl,
            duration: s.duration,
          })),
        ].sort((a, b) => a.time.localeCompare(b.time)),
      };
    });

    const upcomingAssignments = assignments.map((a) => ({
      id: a.id,
      title: a.title,
      subject: a.subject.name,
      class: a.subject.class.name,
      dueDate: a.dueDate.toISOString(),
      teacher: a.subject.teacher.user.name,
    }));

    const availableTeachers = teachers.map((t) => ({
      id: t.id,
      name: t.user.name,
      image: t.user.image,
      specialization: t.specialization,
      sessionsCount: t._count.scheduledSessions,
    }));

    // Stats
    const totalClasses = schedules.length;
    const totalSessions = sessions.length;
    const totalAssignments = assignments.length;
    const busyDay = weeklySchedule.reduce((max, day) =>
      day.items.length > max.items.length ? day : max,
    );

    return (
      <StudentScheduleClient
        student={{
          name: student.user.name,
          studentId: student.studentId,
        }}
        weeklySchedule={weeklySchedule}
        upcomingAssignments={upcomingAssignments}
        availableTeachers={availableTeachers}
        stats={{
          totalClasses,
          totalSessions,
          totalAssignments,
          busyDay: busyDay.dayName,
          dateRange: `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`,
        }}
        filters={{
          view,
          week,
        }}
      />
    );
  } catch (error) {
    console.error("Schedule page error:", error);
    return (
      <div className="p-8 text-center">
        <h2 className="text-xl font-bold mb-2">Unable to load schedule</h2>
        <p className="text-muted-foreground">Please try again later.</p>
      </div>
    );
  }
}
