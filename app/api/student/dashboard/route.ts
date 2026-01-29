import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import {
  AttendanceStatus,
  EnrollmentStatus,
  SessionStatus,
} from "@/app/generated/prisma/enums";

export async function GET() {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const userId = session.user.id;

    // 1. Get the student profile
    const student = await prisma.student.findUnique({
      where: { userId },
      select: {
        id: true,
        studentId: true,
        currentLevel: true,
        hifzLevel: true,
        parentId: true,
      },
    });

    if (!student) {
      return NextResponse.json({ error: "Student not found" }, { status: 404 });
    }

    const now = new Date();

    // 2. Comprehensive Parallel Data Fetching
    const [
      enrollments,
      attendanceStats,
      hifzLogs,
      upcomingSessions,
      pendingAssignments,
      recentMaterials,
      unpaidInvoices,
    ] = await Promise.all([
      // Active Enrollments
      prisma.enrollment.findMany({
        where: { studentId: student.id, status: EnrollmentStatus.ACTIVE },
        include: { class: { select: { name: true, code: true } } },
      }),
      // Attendance Aggregation
      prisma.attendance.groupBy({
        by: ["status"],
        where: { studentId: student.id },
        _count: { status: true },
      }),
      // Latest Hifz Logs
      prisma.hifzProgress.findMany({
        where: { studentId: student.id },
        orderBy: { date: "desc" },
        take: 10,
        include: { teacher: { include: { user: { select: { name: true } } } } },
      }),
      // Live Sessions (Next 48 hours)
      prisma.scheduledSession.findMany({
        where: {
          subscription: { studentId: student.id },
          date: { gte: now },
          status: SessionStatus.SCHEDULED,
        },
        include: {
          teacher: {
            include: { user: { select: { name: true, image: true } } },
          },
        },
        orderBy: { date: "asc" },
        take: 3,
      }),
      // Pending Assignments (Assignments for enrolled subjects with no submission)
      prisma.assignment.findMany({
        where: {
          subject: {
            class: { enrollments: { some: { studentId: student.id } } },
          },
          submissions: { none: { studentId: student.id } },
        },
        select: {
          id: true,
          title: true,
          dueDate: true,
          type: true,
          subject: { select: { name: true } },
        },
        orderBy: { dueDate: "asc" },
        take: 5,
      }),
      // Newest Materials across all classes
      prisma.classMaterial.findMany({
        where: { class: { enrollments: { some: { studentId: student.id } } } },
        orderBy: { createdAt: "desc" },
        take: 4,
        select: { id: true, title: true, type: true, fileUrl: true },
      }),
      // Unpaid Invoices (linked via Parent)
      student.parentId
        ? prisma.invoice.findMany({
            where: { parentId: student.parentId, status: "PENDING" },
            select: { amount: true },
          })
        : Promise.resolve([]),
    ]);

    // 3. Stats Calculation Logic
    const totalAttendance = attendanceStats.reduce(
      (acc, curr) => acc + curr._count.status,
      0,
    );
    const presentCount =
      attendanceStats.find((a) => a.status === AttendanceStatus.PRESENT)?._count
        .status || 0;

    const attendanceRate =
      totalAttendance > 0
        ? Math.round((presentCount / totalAttendance) * 100)
        : 100;

    const totalBalance = unpaidInvoices.reduce(
      (acc, curr) => acc + Number(curr.amount),
      0,
    );

    return NextResponse.json({
      studentInfo: student,
      stats: {
        attendanceRate,
        pendingAssignments: pendingAssignments.length,
        activeEnrollments: enrollments.length,
        totalBalance,
      },
      hifz: {
        currentSurah: hifzLogs[0]?.surah || null,
        logs: hifzLogs,
        level: student.hifzLevel,
      },
      sessions: upcomingSessions,
      assignments: pendingAssignments,
      materials: recentMaterials,
    });
  } catch (error) {
    console.error("DASHBOARD_DATA_ERROR", error);
    return NextResponse.json(
      { error: "Critical Data Sync Failure" },
      { status: 500 },
    );
  }
}




// import { NextResponse } from "next/server";
// import { auth } from "@/lib/auth";
// import { prisma } from "@/lib/prisma";

// export async function GET() {
//   const session = await auth();
//   if (!session?.user?.email)
//     return new NextResponse("Unauthorized", { status: 401 });

//   try {
//     const student = await prisma.student.findFirst({
//       where: { user: { email: session.user.email } },
//       select: { id: true },
//     });

//     if (!student) return new NextResponse("Not Found", { status: 404 });

//     // Fetch live data for quick client refreshes
//     const [quran, sessions] = await Promise.all([
//       prisma.quranProgress.aggregate({
//         where: { studentId: student.id, status: "COMPLETED" },
//         _sum: { totalAyahs: true },
//       }),
//       prisma.scheduledSession.findMany({
//         where: {
//           subscription: { studentId: student.id },
//           date: { gte: new Date() },
//         },
//         take: 5,
//         orderBy: { date: "asc" },
//       }),
//     ]);

//     return NextResponse.json({
//       ayahs: quran._sum.totalAyahs || 0,
//       sessions: sessions,
//     });
//   } catch (e) {
//     return new NextResponse("Error", { status: 500 });
//   }
// }
