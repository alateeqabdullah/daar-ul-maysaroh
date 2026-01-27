import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import TeacherScheduleClient from "@/components/teacher/teacher-schedule-client";
import {
  TeacherScheduleItem,
  TeacherClassOption,
  ScheduleStats,
} from "@/types/(dashboard)/teacher/teacher";

export const metadata = {
  title: "My Schedule | Teacher",
  description: "Weekly class timetable",
};

export default async function TeacherSchedulePage() {
  const session = await auth();
  if (!session?.user?.email) redirect("/login");

  const dbUser = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { teacherProfile: { select: { id: true } } },
  });

  if (!dbUser?.teacherProfile)
    return <div className="p-8">Teacher profile not found.</div>;

  // 1. Fetch Schedule
  const schedulesRaw = await prisma.classSchedule.findMany({
    where: {
      class: { teacherId: dbUser.teacherProfile.id, isActive: true },
    },
    include: {
      class: {
        select: {
          id: true,
          name: true,
          code: true,
          level: true,
          _count: { select: { enrollments: true } },
        },
      },
    },
    orderBy: [{ dayOfWeek: "asc" }, { startTime: "asc" }],
  });

  // 2. Fetch Classes (For Dropdown)
  const classesRaw = await prisma.class.findMany({
    where: { teacherId: dbUser.teacherProfile.id, isActive: true },
    select: { id: true, name: true, code: true },
  });

  // 3. Serialize
  const schedules: TeacherScheduleItem[] = schedulesRaw.map((s) => ({
    id: s.id,
    dayOfWeek: s.dayOfWeek,
    startTime: s.startTime,
    endTime: s.endTime,
    isLive: s.isLive,
    meetingUrl: s.meetingUrl,
    meetingPlatform: s.meetingPlatform,
    className: s.class.name,
    classCode: s.class.code,
    classLevel: s.class.level,
    studentCount: s.class._count.enrollments,
  }));

  const classOptions: TeacherClassOption[] = classesRaw;

  // 4. Calculate Stats
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const dayCounts = [0, 0, 0, 0, 0, 0, 0];
  schedules.forEach((s) => dayCounts[s.dayOfWeek]++);
  const busiestIndex = dayCounts.indexOf(Math.max(...dayCounts));

  const stats: ScheduleStats = {
    totalSessions: schedules.length,
    onlineSessions: schedules.filter((s) => s.isLive).length,
    uniqueClasses: new Set(schedules.map((s) => s.className)).size,
    busiestDay: days[busiestIndex],
  };

  return (
    <TeacherScheduleClient
      schedules={schedules}
      classes={classOptions}
      stats={stats}
    />
  );
}
