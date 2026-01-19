import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import ScheduleManagementClient from "@/components/admin/schedule-management-client";
import { auth } from "@/lib/auth";

export const metadata = {
  title: "Schedule Management | Admin",
  description: "Manage weekly class timetables",
};

export default async function ScheduleManagementPage({
  searchParams,
}: {
  searchParams: Promise<{ day?: string; search?: string }>;
}) {
  const session = await auth();
  if (!session) redirect("/login");
  if (!["SUPER_ADMIN", "ADMIN"].includes(session.user.role))
    redirect("/dashboard");

  const params = await searchParams;

  try {
    const [classesRaw, teachersRaw, schedulesRaw] = await Promise.all([
      // 1. Classes (for dropdown)
      prisma.class.findMany({
        where: { isActive: true },
        select: { id: true, name: true, code: true, teacherId: true },
      }),
      // 2. Teachers (for reference)
      prisma.teacher.findMany({
        where: { isAvailable: true },
        include: { user: { select: { name: true, image: true } } },
      }),
      // 3. All Schedules
      prisma.classSchedule.findMany({
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
    ]);

    // Serialize
    const schedules = schedulesRaw.map((s) => ({
      ...s,
      createdAt: s.createdAt.toISOString(),
      updatedAt: s.updatedAt.toISOString(),
    }));

    // Calculate Stats
    const stats = {
      totalSessions: schedules.length,
      onlineSessions: schedules.filter((s) => s.isOnline).length,
      uniqueClasses: new Set(schedules.map((s) => s.classId)).size,
      busiestDay: getBusiestDay(schedules),
    };

    return (
      <ScheduleManagementClient
        initialSchedules={schedules}
        classes={classesRaw}
        teachers={teachersRaw}
        stats={stats}
        filters={{ day: params.day || "all", search: params.search || "" }}
      />
    );
  } catch (error) {
    console.error("Schedule Load Error:", error);
    return <div>Error loading schedule.</div>;
  }
}

function getBusiestDay(schedules: any[]) {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const counts = [0, 0, 0, 0, 0, 0, 0];
  schedules.forEach((s) => counts[s.dayOfWeek]++);
  const max = Math.max(...counts);
  return days[counts.indexOf(max)];
}
