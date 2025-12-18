// src/app/(dashboard)/admin/reports/page.tsx
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import ReportsClient from "@/components/admin/reports-client";

export default async function ReportsPage() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  if (!["SUPER_ADMIN", "ADMIN"].includes(session.user.role)) {
    redirect("/dashboard");
  }

  // Initialize empty state structure
  let reportsData: any = {
    studentStats: { total: 0, male: 0, female: 0 },
    attendanceStats: { present: 0, absent: 0, late: 0 },
    financialStats: { total: 0, average: 0, count: 0 },
    teacherStats: { available: 0, unavailable: 0 },
    recentActivities: [],
  };

  try {
    const [
      studentStats,
      attendanceStats,
      financialStats,
      teacherStats,
      recentActivities,
    ] = await Promise.all([
      // Student statistics
      prisma.student.groupBy({
        by: ["gender"],
        _count: true,
      }),
      // Attendance statistics
      prisma.attendance.groupBy({
        by: ["status"],
        _count: true,
      }),
      // Financial statistics
      prisma.payment.aggregate({
        _sum: { amount: true },
        _avg: { amount: true },
        _count: true,
      }),
      // Teacher statistics
      prisma.teacher.groupBy({
        by: ["isAvailable"],
        _count: true,
      }),
      // Recent activities (last 30 days)
      prisma.user.findMany({
        where: {
          status: "APPROVED",
          createdAt: {
            gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
          },
        },
        select: {
          id: true,
          name: true,
          role: true,
          createdAt: true,
        },
        orderBy: { createdAt: "desc" },
        take: 10,
      }),
    ]);

    // Format the results into our data structure
    reportsData = {
      studentStats: {
        total: studentStats.reduce((sum, stat) => sum + stat._count, 0),
        male: studentStats.find((s) => s.gender === "MALE")?._count || 0,
        female: studentStats.find((s) => s.gender === "FEMALE")?._count || 0,
      },
      attendanceStats: {
        present:
          attendanceStats.find((a) => a.status === "PRESENT")?._count || 0,
        absent: attendanceStats.find((a) => a.status === "ABSENT")?._count || 0,
        late: attendanceStats.find((a) => a.status === "LATE")?._count || 0,
      },
      financialStats: {
        total: Number(financialStats._sum.amount) || 0,
        average: Number(financialStats._avg.amount) || 0,
        count: financialStats._count,
      },
      teacherStats: {
        available:
          teacherStats.find((t) => t.isAvailable === true)?._count || 0,
        unavailable:
          teacherStats.find((t) => t.isAvailable === false)?._count || 0,
      },
      // Important: Serialize the recent activities to handle Date objects
      recentActivities: JSON.parse(JSON.stringify(recentActivities)),
    };
  } catch (error) {
    console.error("Error loading reports:", error);
    // reportsData remains as the default structure initialized above
  }

  return <ReportsClient reportsData={reportsData} />;
}
