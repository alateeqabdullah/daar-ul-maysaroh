import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import {
  startOfMonth,
  subMonths,
  format,
  subDays,
  startOfDay,
  endOfDay,
} from "date-fns";
import { DashboardApiResponse, ActivityItem } from "@/types/dashboard";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    // Validate Admin Role
    const user = await prisma.user.findUnique({
      where: { email: session.user.email! },
      select: { role: true },
    });
    if (!["ADMIN", "SUPER_ADMIN"].includes(user?.role || "")) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const today = new Date();

    // Parallel Execution for Performance
    const [
      userCounts,
      activeClasses,
      activeTeachers,
      revenueAgg,
      recentPayments,
      recentUsers,
      pendingUsers,
      attendanceRaw,
    ] = await Promise.all([
      prisma.user.groupBy({ by: ["status"], _count: true }),
      prisma.class.count({ where: { isActive: true } }),
      prisma.teacher.count(),
      prisma.payment.aggregate({
        where: { status: "COMPLETED" },
        _sum: { amount: true },
      }),
      prisma.payment.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        include: { student: { include: { user: { select: { name: true } } } } },
      }),
      prisma.user.findMany({
        take: 5,
        where: { status: "APPROVED" },
        orderBy: { createdAt: "desc" },
        select: { id: true, name: true, role: true, createdAt: true },
      }),
      prisma.user.findMany({
        where: { status: "PENDING" },
        take: 10,
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          createdAt: true,
          image: true,
        },
      }),
      prisma.attendance.findMany({
        where: { date: { gte: subDays(startOfDay(today), 7) } },
        select: { status: true, date: true },
      }),
    ]);

    // 1. Calculate Stats
    const totalUsers = userCounts.reduce((acc, curr) => acc + curr._count, 0);
    const pendingCount =
      userCounts.find((c) => c.status === "PENDING")?._count || 0;

    // 2. Revenue Chart (Optimized Loop)
    const revenueData = await Promise.all(
      Array.from({ length: 6 }).map(async (_, i) => {
        const d = subMonths(today, i);
        const res = await prisma.payment.aggregate({
          where: {
            status: "COMPLETED",
            paidAt: { gte: startOfMonth(d), lte: endOfDay(d) },
          },
          _sum: { amount: true },
        });
        return {
          month: format(d, "MMM"),
          revenue: Number(res._sum.amount) || 0,
        };
      }),
    ).then((res) => res.reverse());

    // 3. Transform Activity Feed
    const activities: ActivityItem[] = [
      ...recentPayments.map((p) => ({
        id: p.id,
        type: "PAYMENT" as const,
        title: "Revenue Received",
        description: `${p.student?.user.name || "Student"} completed a payment`,
        timestamp: p.createdAt.toISOString(),
        amount: Number(p.amount),
      })),
      ...recentUsers.map((u) => ({
        id: u.id,
        type: "USER_JOINED" as const,
        title: "New Member",
        description: `${u.name} verified as ${u.role.toLowerCase()}`,
        timestamp: u.createdAt.toISOString(),
      })),
    ].sort(
      (a, b) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
    );

    const response: DashboardApiResponse = {
      stats: {
        totalUsers,
        pendingUsers: pendingCount,
        activeClasses,
        activeTeachers,
        revenue: Number(revenueAgg._sum.amount) || 0,
        attendanceRate:
          attendanceRaw.length > 0
            ? Math.round(
                (attendanceRaw.filter((a) => a.status === "PRESENT").length /
                  attendanceRaw.length) *
                  100,
              )
            : 0,
      },
      charts: {
        revenue: revenueData,
        attendance: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
          (day) => ({
            day,
            present: attendanceRaw.filter(
              (a) => format(a.date, "EEE") === day && a.status === "PRESENT",
            ).length,
            absent: attendanceRaw.filter(
              (a) => format(a.date, "EEE") === day && a.status === "ABSENT",
            ).length,
          }),
        ),
        userDistribution: [
          {
            name: "Students",
            value: userCounts.find((u) => u.status === "APPROVED")?._count || 0,
            color: "#8b5cf6",
          },
          { name: "Teachers", value: activeTeachers, color: "#3b82f6" },
          { name: "Pending", value: pendingCount, color: "#f59e0b" },
        ],
      },
      pendingUsers: pendingUsers.map((u) => ({
        ...u,
        createdAt: u.createdAt.toISOString(),
      })),
      recentActivity: activities.slice(0, 5),
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Dashboard API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}






// import { NextResponse } from "next/server";
// import { prisma } from "@/lib/prisma";
// import { auth } from "@/lib/auth"; // Your auth location
// import { startOfMonth, subMonths, format, subDays } from "date-fns";
// import { DashboardApiResponse, ActivityItem } from "@/types/dashboard";

// export async function GET() {
//   try {
//     // 1. Auth & Role Check
//     const session = await auth();
//     if (!session?.user?.email)
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

//     const currentUser = await prisma.user.findUnique({
//       where: { email: session.user.email },
//       select: { role: true },
//     });

//     if (currentUser?.role !== "ADMIN" && currentUser?.role !== "SUPER_ADMIN") {
//       return NextResponse.json({ error: "Forbidden" }, { status: 403 });
//     }

//     const today = new Date();

//     // 2. Parallel Data Fetching
//     // We fetch limits (take: 5) to keep the dashboard fast
//     const [
//       totalUsers,
//       pendingUsersCount,
//       activeClasses,
//       activeTeachers,
//       totalRevenue,
//       attendanceRecords,
//       recentPayments,
//       recentUsers,
//     ] = await Promise.all([
//       prisma.user.count(),
//       prisma.user.count({ where: { status: "PENDING" } }),
//       prisma.class.count({ where: { isActive: true } }),
//       prisma.teacher.count(),
//       prisma.payment.aggregate({
//         where: { status: "COMPLETED" },
//         _sum: { amount: true },
//       }),
//       prisma.attendance.findMany({
//         where: { date: { gte: subDays(today, 7) } },
//         select: { status: true, date: true },
//       }),
//       // Fetch for Activity Feed
//       prisma.payment.findMany({
//         take: 5,
//         orderBy: { createdAt: "desc" },
//         include: {
//           student: {
//             select: { studentId: true, user: { select: { name: true } } },
//           },
//         },
//       }),
//       prisma.user.findMany({
//         take: 5,
//         orderBy: { createdAt: "desc" },
//         select: { id: true, name: true, role: true, createdAt: true },
//       }),
//     ]);

//     // 3. Process Activity Feed (Merge Payments & Signups)
//     const activities: ActivityItem[] = [
//       ...recentPayments.map((p) => ({
//         id: p.id,
//         type: "PAYMENT" as const,
//         title: "Payment Received",
//         description: `${p.student?.user.name || "Unknown"} paid for enrollment`,
//         timestamp: p.createdAt.toISOString(),
//         amount: p.amount,
//       })),
//       ...recentUsers.map((u) => ({
//         id: u.id,
//         type: "USER_JOINED" as const,
//         title: "New Registration",
//         description: `${u.name} joined as ${u.role.toLowerCase()}`,
//         timestamp: u.createdAt.toISOString(),
//       })),
//     ]
//       .sort(
//         (a, b) =>
//           new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
//       )
//       .slice(0, 5); // Only show top 5 mixed events

//     // 4. Pending Users Table
//     const pendingUsers = await prisma.user.findMany({
//       where: { status: "PENDING" },
//       take: 10,
//       orderBy: { createdAt: "desc" },
//       select: {
//         id: true,
//         name: true,
//         email: true,
//         role: true,
//         createdAt: true,
//         image: true,
//       },
//     });

//     // 5. Chart Calculations
//     // ... (Keep your existing revenue/attendance calculation logic here) ...
//     // For brevity, assuming the same logic as previous response for `revenueData`, `attendanceChartData`, `userDistribution`

//     // --- REVENUE CALC LOGIC ---
//     const revenueData = [];
//     for (let i = 5; i >= 0; i--) {
//       const date = subMonths(today, i);
//       const start = startOfMonth(date);
//       const end = new Date(date.getFullYear(), date.getMonth() + 1, 0);
//       const monthlyRev = await prisma.payment.aggregate({
//         where: { status: "COMPLETED", createdAt: { gte: start, lte: end } },
//         _sum: { amount: true },
//       });
//       revenueData.push({
//         month: format(date, "MMM"),
//         revenue: Number(monthlyRev._sum.amount) || 0,
//       });
//     }

//     // --- ATTENDANCE CALC LOGIC ---
//     const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
//     const attendanceChartData = daysOfWeek.map((day) => ({
//       day,
//       present: 0,
//       absent: 0,
//     }));
//     attendanceRecords.forEach((record) => {
//       const dayName = format(record.date, "EEE");
//       const dayIndex = attendanceChartData.findIndex((d) => d.day === dayName);
//       if (dayIndex !== -1) {
//         if (record.status === "PRESENT")
//           attendanceChartData[dayIndex].present++;
//         else attendanceChartData[dayIndex].absent++;
//       }
//     });

//     // --- USER DISTRIBUTION LOGIC ---
//     const userRoles = await prisma.user.groupBy({
//       by: ["role"],
//       _count: { role: true },
//     });
//     const roleColors: Record<string, string> = {
//       STUDENT: "#8b5cf6",
//       TEACHER: "#3b82f6",
//       PARENT: "#10b981",
//       ADMIN: "#f59e0b",
//     };
//     const userDistribution = userRoles.map((r) => ({
//       name: r.role,
//       value: r._count.role,
//       color: roleColors[r.role] || "#94a3b8",
//     }));

//     // 6. Final Typed Response
//     const response: DashboardApiResponse = {
//       stats: {
//         totalUsers,
//         pendingUsers: pendingUsersCount,
//         activeClasses,
//         activeTeachers,
//         revenue: Number(totalRevenue._sum.amount) || 0,
//         attendanceRate:
//           attendanceRecords.length > 0
//             ? Math.round(
//                 (attendanceRecords.filter((a) => a.status === "PRESENT")
//                   .length /
//                   attendanceRecords.length) *
//                   100
//               )
//             : 0,
//       },
//       pendingUsers: pendingUsers.map((u) => ({
//         ...u,
//         createdAt: u.createdAt.toISOString(),
//       })),
//       charts: {
//         revenue: revenueData,
//         attendance: attendanceChartData,
//         userDistribution,
//       },
//       recentActivity: activities,
//     };

//     return NextResponse.json(response);
//   } catch (error) {
//     console.error("Dashboard Error:", error);
//     return NextResponse.json(
//       { error: "Internal Server Error" },
//       { status: 500 }
//     );
//   }
// }
