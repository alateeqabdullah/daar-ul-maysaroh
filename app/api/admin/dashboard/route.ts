import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth"; // Your auth location
import { startOfMonth, subMonths, format, subDays } from "date-fns";
import { DashboardApiResponse, ActivityItem } from "@/types/dashboard";

export async function GET() {
  try {
    // 1. Auth & Role Check
    const session = await auth();
    if (!session?.user?.email)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const currentUser = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { role: true },
    });

    if (currentUser?.role !== "ADMIN" && currentUser?.role !== "SUPER_ADMIN") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const today = new Date();

    // 2. Parallel Data Fetching
    // We fetch limits (take: 5) to keep the dashboard fast
    const [
      totalUsers,
      pendingUsersCount,
      activeClasses,
      activeTeachers,
      totalRevenue,
      attendanceRecords,
      recentPayments,
      recentUsers,
    ] = await Promise.all([
      prisma.user.count(),
      prisma.user.count({ where: { status: "PENDING" } }),
      prisma.class.count({ where: { isActive: true } }),
      prisma.teacher.count(),
      prisma.payment.aggregate({
        where: { status: "COMPLETED" },
        _sum: { amount: true },
      }),
      prisma.attendance.findMany({
        where: { date: { gte: subDays(today, 7) } },
        select: { status: true, date: true },
      }),
      // Fetch for Activity Feed
      prisma.payment.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        include: {
          student: {
            select: { studentId: true, user: { select: { name: true } } },
          },
        },
      }),
      prisma.user.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        select: { id: true, name: true, role: true, createdAt: true },
      }),
    ]);

    // 3. Process Activity Feed (Merge Payments & Signups)
    const activities: ActivityItem[] = [
      ...recentPayments.map((p) => ({
        id: p.id,
        type: "PAYMENT" as const,
        title: "Payment Received",
        description: `${p.student?.user.name || "Unknown"} paid for enrollment`,
        timestamp: p.createdAt.toISOString(),
        amount: p.amount,
      })),
      ...recentUsers.map((u) => ({
        id: u.id,
        type: "USER_JOINED" as const,
        title: "New Registration",
        description: `${u.name} joined as ${u.role.toLowerCase()}`,
        timestamp: u.createdAt.toISOString(),
      })),
    ]
      .sort(
        (a, b) =>
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      )
      .slice(0, 5); // Only show top 5 mixed events

    // 4. Pending Users Table
    const pendingUsers = await prisma.user.findMany({
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
    });

    // 5. Chart Calculations
    // ... (Keep your existing revenue/attendance calculation logic here) ...
    // For brevity, assuming the same logic as previous response for `revenueData`, `attendanceChartData`, `userDistribution`

    // --- REVENUE CALC LOGIC ---
    const revenueData = [];
    for (let i = 5; i >= 0; i--) {
      const date = subMonths(today, i);
      const start = startOfMonth(date);
      const end = new Date(date.getFullYear(), date.getMonth() + 1, 0);
      const monthlyRev = await prisma.payment.aggregate({
        where: { status: "COMPLETED", createdAt: { gte: start, lte: end } },
        _sum: { amount: true },
      });
      revenueData.push({
        month: format(date, "MMM"),
        revenue: Number(monthlyRev._sum.amount) || 0,
      });
    }

    // --- ATTENDANCE CALC LOGIC ---
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const attendanceChartData = daysOfWeek.map((day) => ({
      day,
      present: 0,
      absent: 0,
    }));
    attendanceRecords.forEach((record) => {
      const dayName = format(record.date, "EEE");
      const dayIndex = attendanceChartData.findIndex((d) => d.day === dayName);
      if (dayIndex !== -1) {
        if (record.status === "PRESENT")
          attendanceChartData[dayIndex].present++;
        else attendanceChartData[dayIndex].absent++;
      }
    });

    // --- USER DISTRIBUTION LOGIC ---
    const userRoles = await prisma.user.groupBy({
      by: ["role"],
      _count: { role: true },
    });
    const roleColors: Record<string, string> = {
      STUDENT: "#8b5cf6",
      TEACHER: "#3b82f6",
      PARENT: "#10b981",
      ADMIN: "#f59e0b",
    };
    const userDistribution = userRoles.map((r) => ({
      name: r.role,
      value: r._count.role,
      color: roleColors[r.role] || "#94a3b8",
    }));

    // 6. Final Typed Response
    const response: DashboardApiResponse = {
      stats: {
        totalUsers,
        pendingUsers: pendingUsersCount,
        activeClasses,
        activeTeachers,
        revenue: Number(totalRevenue._sum.amount) || 0,
        attendanceRate:
          attendanceRecords.length > 0
            ? Math.round(
                (attendanceRecords.filter((a) => a.status === "PRESENT")
                  .length /
                  attendanceRecords.length) *
                  100
              )
            : 0,
      },
      pendingUsers: pendingUsers.map((u) => ({
        ...u,
        createdAt: u.createdAt.toISOString(),
      })),
      charts: {
        revenue: revenueData,
        attendance: attendanceChartData,
        userDistribution,
      },
      recentActivity: activities,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Dashboard Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
