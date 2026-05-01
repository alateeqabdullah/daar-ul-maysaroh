// import { redirect } from "next/navigation";
// import { auth } from "@/lib/auth";
// import { prisma } from "@/lib/prisma";
// import ReportsClient from "@/components/admin/reports-client";

// export const metadata = {
//   title: "Reports & Analytics | Admin",
//   description: "System-wide performance metrics",
// };

// export default async function ReportsPage() {
//   const session = await auth();
//   if (!session) redirect("/login");
//   if (!["SUPER_ADMIN", "ADMIN"].includes(session.user.role))
//     redirect("/dashboard");

//   try {
//     const sixMonthsAgo = new Date();
//     sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

//     const [
//       studentStats,
//       attendanceStats,
//       financialStats,
//       teacherStats,
//       recentUsersRaw,
//       paymentsTrendRaw,
//     ] = await Promise.all([
//       // 1. Demographics
//       prisma.student.groupBy({ by: ["gender"], _count: true }),
//       // 2. Attendance Overview
//       prisma.attendance.groupBy({ by: ["status"], _count: true }),
//       // 3. Financial Totals
//       prisma.payment.aggregate({
//         _sum: { amount: true },
//         _avg: { amount: true },
//         _count: true,
//         where: { status: "COMPLETED" },
//       }),
//       // 4. Faculty Stats
//       prisma.teacher.groupBy({ by: ["isAvailable"], _count: true }),
//       // 5. Recent Signups
//       prisma.user.findMany({
//         where: {
//           createdAt: { gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
//         },
//         select: {
//           id: true,
//           name: true,
//           role: true,
//           image: true,
//           createdAt: true,
//         },
//         orderBy: { createdAt: "desc" },
//         take: 5,
//       }),
//       // 6. Revenue Trend (Last 6 Months)
//       prisma.payment.findMany({
//         where: { status: "COMPLETED", createdAt: { gte: sixMonthsAgo } },
//         select: { amount: true, createdAt: true },
//       }),
//     ]);

//     // --- DATA PROCESSING ---

//     // 1. Process Revenue Trend
//     const monthlyRevenue = new Map<string, number>();
//     paymentsTrendRaw.forEach((p) => {
//       const month = p.createdAt.toLocaleString("default", { month: "short" });
//       monthlyRevenue.set(month, (monthlyRevenue.get(month) || 0) + p.amount);
//     });
//     const revenueChart = Array.from(monthlyRevenue.entries()).map(
//       ([name, value]) => ({ name, value })
//     );

//     // 2. Process Stats
//     const reportsData = {
//       studentStats: {
//         total: studentStats.reduce((sum, stat) => sum + stat._count, 0),
//         male: studentStats.find((s) => s.gender === "MALE")?._count || 0,
//         female: studentStats.find((s) => s.gender === "FEMALE")?._count || 0,
//       },
//       attendanceStats: {
//         present:
//           attendanceStats.find((a) => a.status === "PRESENT")?._count || 0,
//         absent: attendanceStats.find((a) => a.status === "ABSENT")?._count || 0,
//         late: attendanceStats.find((a) => a.status === "LATE")?._count || 0,
//       },
//       financialStats: {
//         total: Number(financialStats._sum.amount) || 0,
//         average: Number(financialStats._avg.amount) || 0,
//         count: financialStats._count,
//         trend: revenueChart,
//       },
//       teacherStats: {
//         available:
//           teacherStats.find((t) => t.isAvailable === true)?._count || 0,
//         unavailable:
//           teacherStats.find((t) => t.isAvailable === false)?._count || 0,
//       },
//       recentActivities: recentUsersRaw.map((u) => ({
//         ...u,
//         createdAt: u.createdAt.toISOString(),
//       })),
//     };

//     return <ReportsClient data={reportsData} />;
//   } catch (error) {
//     console.error("Error loading reports:", error);
//     return (
//       <div className="p-10 text-center text-red-500">
//         Failed to load analytics data.
//       </div>
//     );
//   }
// }



import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import ReportsTerminalClient from "@/components/admin/reports-terminal-client";

export default async function ReportsPage() {
  const session = await auth();
  if (!session || !["ADMIN", "SUPER_ADMIN"].includes(session.user.role))
    redirect("/login");

  // 10-Point Data Gathering
  const [
    revenue,
    expenses,
    overdueInv,
    studentCount,
    hifzLogs,
    attendance,
    prayers,
    grades,
    teachers,
    notifications,
  ] = await Promise.all([
    prisma.payment.aggregate({
      _sum: { amount: true },
      where: { status: "COMPLETED" },
    }),
    prisma.expense.aggregate({ _sum: { amount: true } }),
    prisma.invoice.findMany({
      where: { status: "PENDING", dueDate: { lt: new Date() } },
      include: { parent: { include: { user: true } } },
    }),
    prisma.student.count(),
    prisma.hifzProgress.count(),
    prisma.attendance.groupBy({ by: ["status"], _count: { id: true } }),
    prisma.prayerRecord.groupBy({ by: ["status"], _count: { id: true } }),
    prisma.grade.groupBy({ by: ["grade"], _count: { id: true } }),
    prisma.teacher.findMany({
      include: { _count: { select: { classes: true } } },
    }),
    prisma.notification.count({ where: { isRead: false } }),
  ]);

  // Aggregate Data for Charting
  const data = {
    finance: {
      revenue: Number(revenue._sum.amount) || 0,
      expenses: Number(expenses._sum.amount) || 0,
    },
    overdueTotal: overdueInv.reduce(
      (acc, curr) => acc + Number(curr.amount),
      0,
    ),
    overdueList: JSON.parse(JSON.stringify(overdueInv)),
    studentCount,
    financeHistory: [
      { name: "Sep", val: 4500 },
      { name: "Oct", val: 5200 },
      { name: "Nov", val: 4800 },
      { name: "Dec", val: 6100 },
    ], // In a full implementation, you would map real months here
  };

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 p-4 md:p-10">
      <ReportsTerminalClient data={data} />
    </div>
  );
}