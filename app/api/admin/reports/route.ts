import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET(req: Request) {
  try {
    const session = await auth();
    // 1. Security Check
    if (!session || !["ADMIN", "SUPER_ADMIN"].includes(session.user.role)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2. Parse Query Params
    const { searchParams } = new URL(req.url);
    const range = searchParams.get("range") || "30d"; // Default 30 days
    const type = searchParams.get("type") || "stats"; // 'stats' or 'export'

    // 3. Calculate Date Range
    const now = new Date();
    let startDate = new Date();

    switch (range) {
      case "7d":
        startDate.setDate(now.getDate() - 7);
        break;
      case "30d":
        startDate.setDate(now.getDate() - 30);
        break;
      case "90d":
        startDate.setDate(now.getDate() - 90);
        break;
      case "1y":
        startDate.setFullYear(now.getFullYear() - 1);
        break;
      case "all":
        startDate = new Date(0);
        break; // Beginning of time
      default:
        startDate.setDate(now.getDate() - 30);
    }

    // =========================================================
    // SCENARIO A: FETCH STATS (For Charts/Dashboard)
    // =========================================================
    if (type === "stats") {
      const [payments, attendance, newStudents] = await Promise.all([
        // Financials in range
        prisma.payment.aggregate({
          where: {
            status: "COMPLETED",
            createdAt: { gte: startDate },
          },
          _sum: { amount: true },
          _count: true,
        }),
        // Attendance in range
        prisma.attendance.groupBy({
          by: ["status"],
          where: { date: { gte: startDate } },
          _count: true,
        }),
        // Student Growth (for a chart)
        prisma.user.count({
          where: {
            role: "STUDENT",
            createdAt: { gte: startDate },
          },
        }),
      ]);

      return NextResponse.json({
        financial: {
          revenue: payments._sum.amount || 0,
          transactions: payments._count,
        },
        attendance: {
          present: attendance.find((a) => a.status === "PRESENT")?._count || 0,
          absent: attendance.find((a) => a.status === "ABSENT")?._count || 0,
          late: attendance.find((a) => a.status === "LATE")?._count || 0,
        },
        growth: {
          newStudents,
        },
      });
    }

    // =========================================================
    // SCENARIO B: EXPORT DATA (For CSV Download)
    // =========================================================
    if (type === "export") {
      // Fetch comprehensive data for export
      const [students, payments, attendanceLogs] = await Promise.all([
        prisma.student.findMany({
          select: {
            studentId: true,
            user: { select: { name: true, email: true } },
            currentClass: { select: { name: true } },
          },
        }),
        prisma.payment.findMany({
          where: { createdAt: { gte: startDate } },
          select: {
            invoiceNumber: true,
            amount: true,
            status: true,
            createdAt: true,
            student: { select: { user: { select: { name: true } } } },
          },
        }),
        prisma.attendance.findMany({
          where: { date: { gte: startDate } },
          select: {
            date: true,
            status: true,
            student: { select: { user: { select: { name: true } } } },
          },
        }),
      ]);

      return NextResponse.json({
        students,
        payments: payments.map((p) => ({
          ...p,
          createdAt: p.createdAt.toISOString(),
        })),
        attendance: attendanceLogs.map((a) => ({
          ...a,
          date: a.date.toISOString(),
        })),
      });
    }

    return NextResponse.json({ error: "Invalid type" }, { status: 400 });
  } catch (error: any) {
    console.error("Reports API Error:", error);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}
