// src/app/(dashboard)/admin/schedule/page.tsx
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import ScheduleManagementClient from "@/components/admin/schedule-management-client";
import { auth } from "@/lib/auth";

// Added searchParams to the page props
export default async function ScheduleManagementPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const session = await auth();
  const params = await searchParams;

  if (!session) redirect("/login");
  if (!["SUPER_ADMIN", "ADMIN"].includes(session.user.role))
    redirect("/dashboard");

  // Create filters object from URL params
  const filters = {
    search: typeof params.search === "string" ? params.search : "",
    day: typeof params.day === "string" ? params.day : "all",
  };

  let scheduleData;

  try {
    const [classes, teachers, allSchedules] = await Promise.all([
      prisma.class.findMany({
        include: {
          teacher: { include: { user: true } },
          schedules: true,
          enrollments: { include: { student: { include: { user: true } } } },
        },
        where: { isActive: true },
      }),
      prisma.teacher.findMany({
        include: { user: true },
        where: { isAvailable: true },
      }),
      prisma.classSchedule.findMany({
        include: {
          class: { include: { teacher: { include: { user: true } } } },
          attendances: { include: { student: { include: { user: true } } } },
        },
        orderBy: [{ dayOfWeek: "asc" }, { startTime: "asc" }],
      }),
    ]);

    const scheduleByDay: Record<number, any[]> = {
      0: [],
      1: [],
      2: [],
      3: [],
      4: [],
      5: [],
      6: [],
    };
    allSchedules.forEach((schedule) => {
      scheduleByDay[schedule.dayOfWeek].push(schedule);
    });

    scheduleData = {
      initialClasses: JSON.parse(JSON.stringify(classes)),
      teachers: JSON.parse(JSON.stringify(teachers)),
      scheduleByDay: JSON.parse(JSON.stringify(scheduleByDay)),
      allSchedules: JSON.parse(JSON.stringify(allSchedules)),
    };
  } catch (error) {
    console.error("Error loading schedule data:", error);
    scheduleData = {
      initialClasses: [],
      teachers: [],
      scheduleByDay: { 0: [], 1: [], 2: [], 3: [], 4: [], 5: [], 6: [] },
      allSchedules: [],
    };
  }

  return (
    <ScheduleManagementClient
      initialClasses={scheduleData.initialClasses}
      teachers={scheduleData.teachers}
      scheduleByDay={scheduleData.scheduleByDay}
      allSchedules={scheduleData.allSchedules}
      filters={filters} // PASSING FILTERS HERE FIXES THE ERROR
    />
  );
}
