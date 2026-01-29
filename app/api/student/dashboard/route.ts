import { auth } from "@/lib/auth"; // Your Auth.js config
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import {
  EnrollmentStatus,
  AttendanceStatus,
  SessionStatus,
} from "@/app/generated/prisma/enums";

export async function GET() {
  const session = await auth();

  if (!session?.user || session.user.role !== "STUDENT") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const userId = session.user.id;
    const now = new Date();

    // 1. Get the student ID first to link all queries
    const student = await prisma.student.findUnique({
      where: { userId },
      select: {
        id: true,
        studentId: true,
        currentLevel: true,
        hifzLevel: true,
      },
    });

    if (!student) {
      return NextResponse.json(
        { error: "Student profile not found" },
        { status: 404 },
      );
    }

    // 2. Parallel Fetching for "Command Center" Performance
    const [
      enrollments,
      attendanceData,
      upcomingSessions,
      pendingAssignments,
      recentMaterials,
      hifzLogs,
      pendingInvoices,
    ] = await Promise.all([
      // Active Enrollments
      prisma.enrollment.findMany({
        where: { studentId: student.id, status: EnrollmentStatus.ACTIVE },
        include: { class: true },
      }),
      // Attendance Stats
      prisma.attendance.groupBy({
        by: ["status"],
        where: { studentId: student.id },
        _count: true,
      }),
      // Next 3 Scheduled Sessions
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
      // Pending Assignments (Assignments with no submission from this student)
      prisma.assignment.findMany({
        where: {
          subject: {
            class: { enrollments: { some: { studentId: student.id } } },
          },
          submissions: { none: { studentId: student.id } },
        },
        orderBy: { dueDate: "asc" },
        take: 4,
      }),
      // Recent Class Materials
      prisma.classMaterial.findMany({
        where: { class: { enrollments: { some: { studentId: student.id } } } },
        orderBy: { createdAt: "desc" },
        take: 5,
      }),
      // Hifz Progress
      prisma.hifzProgress.findMany({
        where: { studentId: student.id },
        orderBy: { date: "desc" },
        take: 5,
      }),
      // Parent Invoices (Wallet Balance)
      prisma.invoice.findMany({
        where: {
          parent: { students: { some: { id: student.id } } },
          status: "PENDING",
        },
        select: { amount: true },
      }),
    ]);

    // 3. Stats Aggregation
    const totalAtt = attendanceData.reduce((acc, curr) => acc + curr._count, 0);
    const presentAtt =
      attendanceData.find((a) => a.status === AttendanceStatus.PRESENT)
        ?._count || 0;
    const attendanceRate =
      totalAtt > 0 ? Math.round((presentAtt / totalAtt) * 100) : 100;

    const walletBalance = pendingInvoices.reduce(
      (acc, curr) => acc + Number(curr.amount),
      0,
    );

    return NextResponse.json({
      student: {
        ...student,
        name: session.user.name,
        image: session.user.image,
      },
      stats: {
        attendance: attendanceRate,
        assignments: pendingAssignments.length,
        activeCourses: enrollments.length,
        walletBalance,
      },
      hifz: {
        currentSurah: hifzLogs[0]?.surah || "Not Started",
        logs: hifzLogs,
      },
      sessions: upcomingSessions,
      assignments: pendingAssignments,
      materials: recentMaterials,
    });
  } catch (error) {
    console.error("DASHBOARD_API_ERROR:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
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
