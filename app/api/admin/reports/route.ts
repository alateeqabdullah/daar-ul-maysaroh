// src/app/api/admin/reports/route.ts
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { startOfDay, subDays, startOfYear } from "date-fns";

export async function GET(request: NextRequest) {
  try {
    const session = await auth();

    // 1. Authorization
    if (!session || !["SUPER_ADMIN", "ADMIN"].includes(session.user.role)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const range = searchParams.get("range") || "30d"; // 7d, 30d, 90d, 1y
    const type = searchParams.get("type") || "OVERVIEW";

    // 2. Calculate Date Range
    let startDate = startOfDay(subDays(new Date(), 30));
    if (range === "7d") startDate = startOfDay(subDays(new Date(), 7));
    if (range === "90d") startDate = startOfDay(subDays(new Date(), 90));
    if (range === "1y") startDate = startOfYear(new Date());

    // 3. Conditional Data Fetching based on Report Type
    const [
      studentStats,
      attendanceStats,
      financialStats,
      teacherStats,
      recentActivities,
    ] = await Promise.all([
      // Gender breakdown
      prisma.student.groupBy({
        by: ["gender"],
        _count: true,
      }),
      // Attendance status in range
      prisma.attendance.groupBy({
        by: ["status"],
        where: { date: { gte: startDate } },
        _count: true,
      }),
      // Financial aggregates
      prisma.payment.aggregate({
        where: {
          status: "COMPLETED",
          paidAt: { gte: startDate },
        },
        _sum: { amount: true },
        _avg: { amount: true },
        _count: true,
      }),
      // Teacher availability
      prisma.teacher.groupBy({
        by: ["isAvailable"],
        _count: true,
      }),
      // Latest users
      prisma.user.findMany({
        where: { createdAt: { gte: startDate } },
        select: {
          id: true,
          name: true,
          role: true,
          createdAt: true,
        },
        orderBy: { createdAt: "desc" },
        take: 20,
      }),
    ]);

    // 4. Format for the Client
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
      },
      teacherStats: {
        available:
          teacherStats.find((t) => t.isAvailable === true)?._count || 0,
        unavailable:
          teacherStats.find((t) => t.isAvailable === false)?._count || 0,
      },
      recentActivities,
    };

    return NextResponse.json(reportsData);
  } catch (error) {
    console.error("[REPORTS_GET_ERROR]:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
