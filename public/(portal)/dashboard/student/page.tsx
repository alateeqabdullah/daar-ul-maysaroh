import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import {
  EnrollmentStatus,
  AttendanceStatus,
  SubmissionStatus,
} from "@/app/generated/prisma/enums";
import StudentDashboardClient from "@/components/(portal)/student/student-dashboard-client";

export default async function StudentDashboardPage() {
  const session = await auth();
  if (!session?.user?.email) redirect("/login");

  const student = await prisma.student.findFirst({
    where: { user: { email: session.user.email } },
    include: {
      user: { select: { name: true, image: true, email: true } },
      enrollments: {
        where: { status: EnrollmentStatus.ACTIVE },
        include: {
          class: { include: { teacher: { include: { user: true } } } },
        },
      },
      // Hifz Progress
      hifzLogs: { orderBy: { date: "desc" }, take: 5 },
      // Financials
      parent: {
        include: {
          invoices: {
            orderBy: { dueDate: "asc" },
            where: { status: "PENDING" },
            take: 1,
          },
        },
      },
    },
  });

  if (!student) redirect("/onboarding");

  const now = new Date();

  const [
    upcomingSessions,
    pendingAssignments,
    recentMaterials,
    attendanceOverview,
  ] = await Promise.all([
    // 1. Next Scheduled Sessions (from your ScheduledSession model)
    prisma.scheduledSession.findMany({
      where: {
        subscription: { studentId: student.id },
        date: { gte: now },
        status: "SCHEDULED",
      },
      include: { teacher: { include: { user: true } } },
      orderBy: { date: "asc" },
      take: 3,
    }),
    // 2. Pending Assignments
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
    // 3. New Materials
    prisma.classMaterial.findMany({
      where: { class: { enrollments: { some: { studentId: student.id } } } },
      orderBy: { createdAt: "desc" },
      take: 3,
    }),
    // 4. Attendance Stats
    prisma.attendance.groupBy({
      by: ["status"],
      where: { studentId: student.id },
      _count: true,
    }),
  ]);

  // Logic: Calculate Attendance %
  const attTotal = attendanceOverview.reduce(
    (acc, curr) => acc + curr._count,
    0,
  );
  const attPresent =
    attendanceOverview.find((a) => a.status === AttendanceStatus.PRESENT)
      ?._count || 0;

  const dashboardData = {
    user: student.user,
    studentId: student.studentId,
    stats: {
      attendance:
        attTotal > 0 ? Math.round((attPresent / attTotal) * 100) : 100,
      assignments: pendingAssignments.length,
      activeCourses: student.enrollments.length,
      walletBalance: student.parent?.invoices[0]?.amount || 0,
    },
    hifz: {
      currentSurah: student.hifzLogs[0]?.surah || 1,
      logs: student.hifzLogs,
      level: student.hifzLevel,
    },
    sessions: upcomingSessions,
    assignments: pendingAssignments,
    materials: recentMaterials,
  };

  return <StudentDashboardClient data={dashboardData} />;
}






// import { redirect } from "next/navigation";
// import { prisma } from "@/lib/prisma";
// import { auth } from "@/lib/auth";
// import StudentDashboardClient from "@/components/(portal)/student/student-dashboard-client";

// export default async function StudentDashboardPage() {
//   const session = await auth();
//   if (!session?.user?.email) redirect("/login");

//   try {
//     // 1. IDENTITY RESOLUTION (Same efficient approach)
//     const student = await prisma.student.findFirst({
//       where: { user: { email: session.user.email } },
//       select: {
//         id: true,
//         studentId: true,
//         currentLevel: true,
//         memorizationGoal: true,
//         user: { select: { name: true, email: true, image: true } },
//       },
//     });
//     if (!student) redirect("/onboarding");

//     const studentId = student.id;

//     // 2. PARALLEL DATA FETCH (Extended but still clean)
//     const [
//       enrollments,
//       submissions,
//       attendance,
//       upcomingSessions,
//       quranProgress,
//       certificates,
//       materials,
//       grades,
//       announcements,
//     ] = await Promise.all([
//       // Current enrollments with progress
//       prisma.enrollment.findMany({
//         where: { studentId, status: "ACTIVE" },
//         include: {
//           class: {
//             include: {
//               teacher: { include: { user: true } },
//               subjects: true,
//             },
//           },
//         },
//       }),

//       // Recent submissions with grades
//       prisma.assignmentSubmission.findMany({
//         where: { studentId },
//         include: {
//           assignment: {
//             include: {
//               subject: { include: { class: true } },
//             },
//           },
//         },
//         orderBy: { submittedAt: "desc" },
//         take: 5,
//       }),

//       // Attendance this month
//       prisma.attendance.groupBy({
//         by: ["status"],
//         where: {
//           studentId,
//           date: {
//             gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
//           },
//         },
//         _count: { status: true },
//       }),

//       // Next 24h sessions
//       prisma.scheduledSession.findMany({
//         where: {
//           subscription: { studentId },
//           date: {
//             gte: new Date(),
//             lt: new Date(Date.now() + 24 * 60 * 60 * 1000),
//           },
//         },
//         include: {
//           teacher: { include: { user: true } },
//           subscription: { include: { plan: true } },
//         },
//         orderBy: [{ date: "asc" }, { startTime: "asc" }],
//         take: 3,
//       }),

//       // Quran progress
//       prisma.quranProgress.aggregate({
//         where: { studentId, status: "COMPLETED" },
//         _sum: { totalAyahs: true },
//         _avg: { evaluationScore: true },
//       }),

//       // Certificates
//       prisma.certificate.findMany({
//         where: { studentId },
//         orderBy: { issuedAt: "desc" },
//         take: 3,
//       }),

//       // Recent materials
//       prisma.classMaterial.findMany({
//         where: {
//           class: { enrollments: { some: { studentId, status: "ACTIVE" } } },
//         },
//         orderBy: { createdAt: "desc" },
//         take: 4,
//       }),

//       // Grade summary
//       prisma.grade.aggregate({
//         where: { studentId },
//         _avg: { percentage: true },
//       }),

//       // Important announcements
//       prisma.announcement.findMany({
//         where: {
//           targetAudience: { has: "STUDENTS" },
//           isPublished: true,
//           publishAt: { lte: new Date() },
//           expireAt: { gte: new Date() },
//           priority: { in: ["HIGH", "URGENT"] },
//         },
//         take: 3,
//       }),
//     ]);

//     // 3. SMART CALCULATIONS
//     const attendancePresent =
//       attendance.find((a) => a.status === "PRESENT")?._count.status || 0;
//     const attendanceTotal = attendance.reduce(
//       (sum, a) => sum + a._count.status,
//       0,
//     );
//     const attendanceRate =
//       attendanceTotal > 0
//         ? Math.round((attendancePresent / attendanceTotal) * 100)
//         : 100;

//     const averageGrade = Math.round(grades._avg.percentage || 0);
//     const memorizedAyahs = Number(quranProgress._sum.totalAyahs || 0);
//     const hifzProgress = Math.round((memorizedAyahs / 6236) * 100); // Total Quran ayahs

//     // Calculate upcoming assignments
//     const upcomingAssignments = await prisma.assignment.findMany({
//       where: {
//         subject: {
//           class: {
//             enrollments: {
//               some: { studentId, status: "ACTIVE" },
//             },
//           },
//         },
//         dueDate: {
//           gt: new Date(),
//           lt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Next 7 days
//         },
//       },
//       include: { subject: true },
//       take: 5,
//     });

//     // 4. CLEAN DATA PREPARATION
//     const data = {
//       student: {
//         name: student.user.name,
//         email: student.user.email,
//         image: student.user.image,
//         studentId: student.studentId,
//         currentLevel: student.currentLevel,
//         memorizationGoal: student.memorizationGoal,
//       },
//       stats: {
//         activeClasses: enrollments.length,
//         attendanceRate,
//         averageGrade,
//         memorizedAyahs,
//         certificates: certificates.length,
//         upcomingAssignments: upcomingAssignments.length,
//         materials: materials.length,
//       },
//       quickView: {
//         nextClass: upcomingSessions[0]
//           ? {
//               title: upcomingSessions[0].subscription.plan.name,
//               teacher: upcomingSessions[0].teacher.user.name,
//               time: upcomingSessions[0].startTime,
//               meetingUrl: upcomingSessions[0].meetingUrl,
//             }
//           : null,
//         latestGrade: submissions.find((s) => s.marks)?.marks || null,
//         hifzProgress,
//         urgentAnnouncements: announcements.length,
//       },
//       enrollments: enrollments.map((e) => ({
//         id: e.id,
//         className: e.class.name,
//         teacher: e.class.teacher.user.name,
//         progress: Number(e.progress || 0),
//         subjectCount: e.class.subjects.length,
//       })),
//       recentActivity: submissions.map((s) => ({
//         id: s.id,
//         title: s.assignment.title,
//         subject: s.assignment.subject.name,
//         grade: s.marks ? Number(s.marks) : null,
//         submittedAt: s.submittedAt.toISOString(),
//         status: s.status,
//       })),
//       resources: {
//         materials: materials.map((m) => ({
//           id: m.id,
//           title: m.title,
//           type: m.type,
//           uploadedAt: m.createdAt.toISOString(),
//         })),
//         certificates: certificates.map((c) => ({
//           id: c.id,
//           title: c.title,
//           issuedAt: c.issuedAt.toISOString(),
//         })),
//       },
//       upcomingAssignments: upcomingAssignments.map((a) => ({
//         id: a.id,
//         title: a.title,
//         subject: a.subject.name,
//         dueDate: a.dueDate.toISOString(),
//         type: a.type,
//       })),
//     };

//     return <StudentDashboardClient data={data} />;
//   } catch (error) {
//     console.error("Dashboard error:", error);
//     return (
//       <div className="p-10 text-center">
//         <h2 className="text-2xl font-bold mb-4">Dashboard Unavailable</h2>
//         <p className="text-muted-foreground mb-6">
//           Please try refreshing the page.
//         </p>
//         <button
//           onClick={() => window.location.reload()}
//           className="px-6 py-2 bg-primary text-white rounded-lg"
//         >
//           Refresh
//         </button>
//       </div>
//     );
//   }
// }

// // import { redirect } from "next/navigation";
// // import { prisma } from "@/lib/prisma";
// // import { auth } from "@/lib/auth";
// // import StudentDashboardClient from "@/components/(portal)/student/student-dashboard-client";

// // export default async function StudentDashboardPage() {
// //   const session = await auth();
// //   if (!session?.user?.email) redirect("/login");

// //   try {
// //     // 1. IDENTITY RESOLUTION (Fixes userId crash)
// //     const base = await prisma.student.findFirst({
// //       where: { user: { email: session.user.email } },
// //       select: { id: true, studentId: true },
// //     });
// //     if (!base) redirect("/onboarding");
// //     const sId = base.id;

// //     // 2. PARALLEL DATA AGGREGATION
// //     const [
// //       profile,
// //       enrollments,
// //       submissions,
// //       hifzLogs,
// //       attendance,
// //       sessions,
// //       quranProgress,
// //       invoices,
// //       prayers,
// //       materials,
// //     ] = await Promise.all([
// //       prisma.student.findUnique({
// //         where: { id: sId },
// //         include: {
// //           user: true,
// //           currentClass: { include: { teacher: { include: { user: true } } } },
// //           parent: { include: { user: true } },
// //         },
// //       }),
// //       prisma.enrollment.findMany({
// //         where: { studentId: sId, status: "ACTIVE" },
// //         include: { class: { include: { subjects: true } } },
// //       }),
// //       prisma.assignmentSubmission.findMany({
// //         where: { studentId: sId },
// //         include: { assignment: { include: { subject: true } } },
// //         orderBy: { submittedAt: "desc" },
// //         take: 5,
// //       }),
// //       prisma.hifzProgress.findMany({
// //         where: { studentId: sId },
// //         orderBy: { date: "desc" },
// //         take: 5,
// //       }),
// //       prisma.attendance.groupBy({
// //         by: ["status"],
// //         where: { studentId: sId },
// //         _count: { status: true },
// //       }),
// //       prisma.scheduledSession.findMany({
// //         where: { subscription: { studentId: sId }, date: { gte: new Date() } },
// //         include: {
// //           teacher: { include: { user: true } },
// //           subscription: { include: { plan: true } },
// //         },
// //         orderBy: { date: "asc" },
// //         take: 3,
// //       }),
// //       prisma.quranProgress.aggregate({
// //         where: { studentId: sId, status: "COMPLETED" },
// //         _sum: { totalAyahs: true },
// //       }),
// //       prisma.invoice.findFirst({
// //         where: { parent: { students: { some: { id: sId } } } },
// //         orderBy: { dueDate: "desc" },
// //       }),
// //       prisma.prayerRecord.findMany({
// //         where: {
// //           studentId: sId,
// //           date: { gte: new Date(new Date().setHours(0, 0, 0, 0)) },
// //         },
// //       }),
// //       prisma.classMaterial.findMany({
// //         where: { class: { enrollments: { some: { studentId: sId } } } },
// //         take: 3,
// //         orderBy: { createdAt: "desc" },
// //       }),
// //     ]);

// //     // 3. LOGIC & CALCULATIONS
// //     const attTotal = attendance.reduce((acc, c) => acc + c._count.status, 0);
// //     const attRate =
// //       attTotal > 0
// //         ? Math.round(
// //             ((attendance.find((a) => a.status === "PRESENT")?._count.status ||
// //               0) /
// //               attTotal) *
// //               100,
// //           )
// //         : 100;

// //     return (
// //       <StudentDashboardClient
// //         student={{
// //           ...profile,
// //           name: profile?.user.name,
// //           email: profile?.user.email,
// //           image: profile?.user.image,
// //           enrollmentDate: profile?.enrollmentDate.toISOString(),
// //         }}
// //         enrollments={enrollments.map((e) => ({
// //           ...e,
// //           progress: Number(e.progress || 0),
// //         }))}
// //         stats={{
// //           attendanceRate: attRate,
// //           assignmentsCompleted: submissions.length,
// //           memorizedAyahs: Number(quranProgress._sum.totalAyahs || 0),
// //           pendingInvoice: invoices ? Number(invoices.amount) : 0,
// //           activeClasses: enrollments.length,
// //         }}
// //         upcomingClasses={sessions.map((s) => ({
// //           id: s.id,
// //           title: s.subscription.plan.name,
// //           teacher: s.teacher.user,
// //           startTime: s.startTime,
// //           endTime: s.endTime,
// //           meetingUrl: s.meetingUrl,
// //           status: s.status,
// //         }))}
// //         recentActivity={submissions.map((s) => ({
// //           id: s.id,
// //           title: s.assignment.title,
// //           description: s.assignment.subject.name,
// //           type: s.status,
// //           timestamp: s.submittedAt.toISOString(),
// //           grade: s.marks ? Number(s.marks) : undefined,
// //         }))}
// //         prayers={prayers}
// //         hifzComments={hifzLogs[0]?.comments || "Keep up the great work!"}
// //         materials={materials}
// //       />
// //     );
// //   } catch (e) {
// //     console.error(e);
// //     return (
// //       <div className="p-20 text-center font-bold">
// //         Portal offline. Resolving Titan Identity...
// //       </div>
// //     );
// //   }
// // }
