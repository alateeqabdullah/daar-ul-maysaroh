import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import AttendanceManagementClient from "@/components/admin/attendance-management-client";
import { auth } from "@/lib/auth";

export const metadata = {
  title: "Attendance | Admin",
  description: "Track daily student attendance",
};

export default async function AttendanceManagementPage({
  searchParams,
}: {
  searchParams: Promise<{ date?: string; classId?: string }>;
}) {
  const session = await auth();
  if (!session) redirect("/login");
  if (!["SUPER_ADMIN", "ADMIN"].includes(session.user.role))
    redirect("/dashboard");

  const params = await searchParams;
  const dateStr = params.date || new Date().toISOString().split("T")[0];
  const classId = params.classId;

  try {
    const targetDate = new Date(dateStr);
    const dayOfWeek = targetDate.getDay(); // 0 = Sunday

    // 1. Fetch Classes
    const classes = await prisma.class.findMany({
      where: { isActive: true },
      select: { id: true, name: true, code: true },
      orderBy: { name: "asc" },
    });

    let students: any[] = [];
    let attendanceMap: Record<string, any> = {};
    let activeScheduleId = null;

    // 2. Fetch Students & Attendance if class selected
    if (classId) {
      // Find Schedule
      const schedules = await prisma.classSchedule.findMany({
        where: { classId, dayOfWeek },
        take: 1,
      });
      activeScheduleId = schedules[0]?.id || null;

      // Fetch Students
      const classData = await prisma.class.findUnique({
        where: { id: classId },
        include: {
          enrollments: {
            where: { status: "ACTIVE" },
            include: {
              student: {
                include: {
                  user: {
                    select: { id: true, name: true, image: true, email: true },
                  },
                },
              },
            },
          },
        },
      });

      if (classData) {
        students = classData.enrollments.map((e) => ({
          studentId: e.student.id,
          userId: e.student.user.id,
          name: e.student.user.name,
          image: e.student.user.image,
          email: e.student.user.email,
          studentCode: e.student.studentId,
        }));
      }

      // Fetch Records
      const startOfDay = new Date(targetDate);
      startOfDay.setHours(0, 0, 0, 0);
      const endOfDay = new Date(targetDate);
      endOfDay.setHours(23, 59, 59, 999);

      const records = await prisma.attendance.findMany({
        where: { classId, date: { gte: startOfDay, lte: endOfDay } },
      });

      // Map: { studentId: { status: 'PRESENT', remarks: '...' } }
      records.forEach((r) => {
        attendanceMap[r.studentId] = {
          status: r.status,
          remarks: r.remarks || "",
        };
      });
    }

    // 3. Stats
    const todayStatsRaw = await prisma.attendance.groupBy({
      by: ["status"],
      where: {
        date: {
          gte: new Date(new Date(dateStr).setHours(0, 0, 0, 0)),
          lte: new Date(new Date(dateStr).setHours(23, 59, 59, 999)),
        },
        ...(classId && { classId }),
      },
      _count: { status: true },
    });

    const stats = {
      present:
        todayStatsRaw.find((s) => s.status === "PRESENT")?._count.status || 0,
      absent:
        todayStatsRaw.find((s) => s.status === "ABSENT")?._count.status || 0,
      late: todayStatsRaw.find((s) => s.status === "LATE")?._count.status || 0,
      total: students.length > 0 ? students.length : 0,
    };

    return (
      <AttendanceManagementClient
        classes={classes}
        students={students}
        attendanceMap={attendanceMap}
        selectedDate={dateStr}
        selectedClassId={classId || ""}
        activeScheduleId={activeScheduleId}
        stats={stats}
      />
    );
  } catch (error) {
    console.error("Attendance Page Error:", error);
    return <div>Error loading data.</div>;
  }
}
