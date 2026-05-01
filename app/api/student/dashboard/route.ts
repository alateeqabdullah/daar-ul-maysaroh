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
  if (!session?.user?.id)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const userId = session.user.id;

    const student = await prisma.student.findUnique({
      where: { userId },
      select: {
        id: true,
        studentId: true,
        currentLevel: true,
        hifzLevel: true,
        parentId: true,
        user: { select: { name: true, image: true } },
      },
    });

    if (!student)
      return NextResponse.json({ error: "Student not found" }, { status: 404 });

    const now = new Date();

    const [
      enrollments,
      attendance,
      hifzLogs,
      sessions,
      assignments,
      materials,
      invoices,
    ] = await Promise.all([
      // 1. Active Courses
      prisma.enrollment.findMany({
        where: { studentId: student.id, status: EnrollmentStatus.ACTIVE },
        include: { class: { select: { name: true, code: true } } },
      }),
      // 2. Attendance Stats
      prisma.attendance.groupBy({
        by: ["status"],
        where: { studentId: student.id },
        _count: { status: true },
      }),
      // 3. Spiritual/Hifz History
      prisma.hifzProgress.findMany({
        where: { studentId: student.id },
        orderBy: { date: "desc" },
        take: 15,
        include: { teacher: { include: { user: { select: { name: true } } } } },
      }),
      // 4. Real-time Scheduled Sessions
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
        take: 5,
      }),
      // 5. Academic Task Queue
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
          description: true,
          subject: { select: { name: true } },
        },
        orderBy: { dueDate: "asc" },
        take: 6,
      }),
      // 6. Library Resources
      prisma.classMaterial.findMany({
        where: { class: { enrollments: { some: { studentId: student.id } } } },
        orderBy: { createdAt: "desc" },
        take: 6,
      }),
      // 7. Wallet / Invoices
      student.parentId
        ? prisma.invoice.findMany({
            where: { parentId: student.parentId, status: "PENDING" },
            select: { amount: true, dueDate: true, id: true },
          })
        : Promise.resolve([]),
    ]);

    // Business Logic Aggregations
    const totalAtt = attendance.reduce(
      (acc, curr) => acc + curr._count.status,
      0,
    );
    const presentAtt =
      attendance.find((a) => a.status === AttendanceStatus.PRESENT)?._count
        .status || 0;

    return NextResponse.json({
      user: student.user,
      studentId: student.studentId,
      stats: {
        attendance:
          totalAtt > 0 ? Math.round((presentAtt / totalAtt) * 100) : 100,
        assignments: assignments.length,
        activeCourses: enrollments.length,
        walletBalance: invoices.reduce(
          (acc, curr) => acc + Number(curr.amount),
          0,
        ),
      },
      hifz: {
        level: student.hifzLevel || "Foundation",
        currentSurah: hifzLogs[0]?.surah || "Not Set",
        logs: hifzLogs,
      },
      sessions,
      assignments,
      materials,
      invoices,
    });
  } catch (error) {
    return NextResponse.json({ error: "Database Sync Error" }, { status: 500 });
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
