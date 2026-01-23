import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET(req: Request) {
  try {
    const session = await auth();
    if (!session || !["ADMIN", "SUPER_ADMIN"].includes(session.user.role)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const studentId = searchParams.get("studentId");

    if (!studentId)
      return NextResponse.json({ error: "ID required" }, { status: 400 });

    const student = await prisma.student.findUnique({
      where: { id: studentId },
      include: {
        // 1. Quran Progress
        quranProgress: {
          take: 5,
          orderBy: { createdAt: "desc" },
          select: {
            surahName: true,
            fromAyah: true,
            toAyah: true,
            status: true,
            createdAt: true,
          },
        },
        // 2. Recent Attendance
        attendance: {
          take: 10,
          orderBy: { date: "desc" },
          select: { date: true, status: true },
        },
        // 3. Recent Grades
        grades: {
          take: 5,
          orderBy: { assessmentDate: "desc" },
          include: { subject: { select: { name: true } } },
        },
        // 4. Payments
        payments: {
          take: 3,
          orderBy: { createdAt: "desc" },
          select: { amount: true, status: true, createdAt: true },
        },
      },
    });

    // Calculate Attendance Rate
    const totalDays = await prisma.attendance.count({ where: { studentId } });
    const presentDays = await prisma.attendance.count({
      where: { studentId, status: "PRESENT" },
    });
    const attendanceRate =
      totalDays > 0 ? Math.round((presentDays / totalDays) * 100) : 0;

    return NextResponse.json({
      ...student,
      attendanceRate,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch details" },
      { status: 500 }
    );
  }
}
