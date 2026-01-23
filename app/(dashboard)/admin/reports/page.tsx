import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import ReportsClient from "@/components/admin/reports-client";

export const metadata = {
  title: "Reports & Analytics | Admin",
  description: "System-wide performance metrics",
};

export default async function ReportsPage() {
  const session = await auth();
  if (!session) redirect("/login");
  if (!["SUPER_ADMIN", "ADMIN"].includes(session.user.role))
    redirect("/dashboard");

  try {
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const [
      studentStats,
      attendanceStats,
      financialStats,
      teacherStats,
      recentUsersRaw,
      paymentsTrendRaw,
    ] = await Promise.all([
      // 1. Demographics
      prisma.student.groupBy({ by: ["gender"], _count: true }),
      // 2. Attendance Overview
      prisma.attendance.groupBy({ by: ["status"], _count: true }),
      // 3. Financial Totals
      prisma.payment.aggregate({
        _sum: { amount: true },
        _avg: { amount: true },
        _count: true,
        where: { status: "COMPLETED" },
      }),
      // 4. Faculty Stats
      prisma.teacher.groupBy({ by: ["isAvailable"], _count: true }),
      // 5. Recent Signups
      prisma.user.findMany({
        where: {
          createdAt: { gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
        },
        select: {
          id: true,
          name: true,
          role: true,
          image: true,
          createdAt: true,
        },
        orderBy: { createdAt: "desc" },
        take: 5,
      }),
      // 6. Revenue Trend (Last 6 Months)
      prisma.payment.findMany({
        where: { status: "COMPLETED", createdAt: { gte: sixMonthsAgo } },
        select: { amount: true, createdAt: true },
      }),
    ]);

    // --- DATA PROCESSING ---

    // 1. Process Revenue Trend
    const monthlyRevenue = new Map<string, number>();
    paymentsTrendRaw.forEach((p) => {
      const month = p.createdAt.toLocaleString("default", { month: "short" });
      monthlyRevenue.set(month, (monthlyRevenue.get(month) || 0) + p.amount);
    });
    const revenueChart = Array.from(monthlyRevenue.entries()).map(
      ([name, value]) => ({ name, value })
    );

    // 2. Process Stats
    const reportsData = {
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
        trend: revenueChart,
      },
      teacherStats: {
        available:
          teacherStats.find((t) => t.isAvailable === true)?._count || 0,
        unavailable:
          teacherStats.find((t) => t.isAvailable === false)?._count || 0,
      },
      recentActivities: recentUsersRaw.map((u) => ({
        ...u,
        createdAt: u.createdAt.toISOString(),
      })),
    };

    return <ReportsClient data={reportsData} />;
  } catch (error) {
    console.error("Error loading reports:", error);
    return (
      <div className="p-10 text-center text-red-500">
        Failed to load analytics data.
      </div>
    );
  }
}
