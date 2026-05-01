import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import StudentClassesClient from "@/components/(portal)/student/student-classes-client";
import { EnrollmentStatus } from "@/app/generated/prisma/enums";
import { Prisma } from "@/app/generated/prisma/client";

export default async function StudentClassesPage({
  searchParams,
}: {
  searchParams: Promise<{ view?: string; status?: string; search?: string }>;
}) {
  const session = await auth();
  if (!session?.user?.email) redirect("/login");

  const params = await searchParams;
  const view = params.view || "grid";
  const status = (params.status as EnrollmentStatus | "all") || "all";
  const search = params.search || "";

  try {
    // 1. GET STUDENT PROFILE (Strict Select)
    const student = await prisma.student.findFirst({
      where: { user: { email: session.user.email } },
      select: {
        id: true,
        studentId: true,
        user: { select: { name: true, email: true, image: true } },
      },
    });

    if (!student) redirect("/onboarding");

    // 2. TYPESAFE WHERE CLAUSE
    const enrollmentWhere: Prisma.EnrollmentWhereInput = {
      studentId: student.id,
      ...(status !== "all" && { status: status as EnrollmentStatus }),
      ...(search && {
        class: {
          OR: [
            { name: { contains: search, mode: "insensitive" } },
            { code: { contains: search, mode: "insensitive" } },
          ],
        },
      }),
    };

    // 3. FETCH DATA IN PARALLEL
    const [enrollments, available, attendance, schedules] = await Promise.all([
      prisma.enrollment.findMany({
        where: enrollmentWhere,
        select: {
          id: true,
          status: true,
          progress: true,
          enrolledAt: true,
          class: {
            select: {
              name: true,
              code: true,
              schedules: true,
              materials: { take: 3, orderBy: { createdAt: "desc" } },
              teacher: {
                select: { user: { select: { name: true, image: true } } },
              },
            },
          },
        },
        orderBy: { enrolledAt: "desc" },
      }),

      prisma.class.findMany({
        where: {
          isActive: true,
          enrollments: { none: { studentId: student.id } },
          ...(search && {
            OR: [
              { name: { contains: search, mode: "insensitive" } },
              { code: { contains: search, mode: "insensitive" } },
            ],
          }),
        },
        select: {
          id: true,
          name: true,
          code: true,
          capacity: true,
          currentEnrollment: true,
          teacher: { select: { user: { select: { name: true } } } },
        },
        take: 6,
      }),

      prisma.attendance.groupBy({
        by: ["status"],
        where: { studentId: student.id },
        _count: { status: true },
      }),

      prisma.classSchedule.findMany({
        where: {
          class: {
            enrollments: { some: { studentId: student.id, status: "ACTIVE" } },
          },
        },
        select: {
          id: true,
          dayOfWeek: true,
          startTime: true,
          endTime: true,
          meetingUrl: true,
          class: {
            select: {
              name: true,
              teacher: { select: { user: { select: { name: true } } } },
            },
          },
        },
        orderBy: [{ dayOfWeek: "asc" }, { startTime: "asc" }],
      }),
    ]);

    // 4. STATS CALCULATION
    const attendanceStats = attendance.reduce(
      (acc, curr) => {
        acc.total += curr._count.status;
        if (curr.status === "PRESENT") acc.present += curr._count.status;
        return acc;
      },
      { total: 0, present: 0 },
    );

    const stats = {
      totalClasses: enrollments.length,
      activeClasses: enrollments.filter((e) => e.status === "ACTIVE").length,
      completedClasses: enrollments.filter((e) => e.status === "COMPLETED")
        .length,
      averageProgress:
        enrollments.length > 0
          ? Math.round(
              enrollments.reduce(
                (sum, e) => sum + (Number(e.progress) || 0),
                0,
              ) / enrollments.length,
            )
          : 0,
      attendanceRate:
        attendanceStats.total > 0
          ? Math.round((attendanceStats.present / attendanceStats.total) * 100)
          : 100,
    };

    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    // 5. DATA MAPPING (Clean & Direct)
    return (
      <StudentClassesClient
        student={{
          name: student.user.name,
          email: student.user.email,
          image: student.user.image,
          studentId: student.studentId,
        }}
        enrollments={enrollments.map((e) => ({
          id: e.id,
          className: e.class.name,
          classCode: e.class.code,
          teacher: {
            name: e.class.teacher.user.name,
            email: "", // Added to satisfy your Teacher interface
            avatar: e.class.teacher.user.image,
          },
          status: e.status as any, // Cast to your local ClassStatus type
          progress: Number(e.progress || 0),
          enrolledAt: e.enrolledAt.toISOString(),
        }))}
        availableClasses={available.map((c) => ({
          id: c.id,
          name: c.name,
          code: c.code,
          teacher: c.teacher.user.name,
          capacity: c.capacity,
          enrolled: c.currentEnrollment,
        }))}
        stats={stats}
        schedule={schedules.map((s) => ({
          id: s.id,
          className: s.class.name,
          teacher: s.class.teacher.user.name,
          day: days[s.dayOfWeek],
          time: `${s.startTime} - ${s.endTime}`,
          meetingUrl: s.meetingUrl,
        }))}
        filters={{ view, status, search }}
      />
    );
  } catch (error) {
    console.error("Critical Page Error:", error);
    throw error; // Let the Next.js error.tsx handle it
  }
}






// import { redirect } from "next/navigation";
// import { prisma } from "@/lib/prisma";
// import { auth } from "@/lib/auth";
// import StudentClassesClient from "@/components/(portal)/student/student-classes-client";

// export default async function StudentClassesPage() {
//   const session = await auth();
//   if (!session?.user?.email) redirect("/login");

//   try {
//     // 1. IDENTITY RESOLUTION (Bypassing the userId crash)
//     const studentBase = await prisma.student.findFirst({
//       where: { user: { email: session.user.email } },
//       select: { id: true, studentId: true },
//     });
//     if (!studentBase) redirect("/onboarding");
//     const sId = studentBase.id;

//     // 2. TITAN PARALLEL DATA FETCHING
//     const [enrollmentsData, availableData, weeklySessionsData, invoicesCount] =
//       await Promise.all([
//         prisma.enrollment.findMany({
//           where: { studentId: sId },
//           include: {
//             class: {
//               include: {
//                 teacher: {
//                   include: { user: { select: { name: true, image: true } } },
//                 },
//                 subjects: {
//                   include: {
//                     assignments: {
//                       where: { dueDate: { gte: new Date() } },
//                       take: 2,
//                     },
//                   },
//                 },
//                 materials: { take: 3, orderBy: { createdAt: "desc" } },
//                 announcements: { take: 2, orderBy: { createdAt: "desc" } },
//                 schedules: true,
//               },
//             },
//           },
//           orderBy: { enrolledAt: "desc" },
//         }),
//         prisma.class.findMany({
//           where: { enrollments: { none: { studentId: sId } }, isActive: true },
//           include: {
//             teacher: {
//               include: { user: { select: { name: true, image: true } } },
//             },
//           },
//           take: 6,
//         }),
//         prisma.scheduledSession.findMany({
//           where: {
//             subscription: { studentId: sId },
//             date: { gte: new Date() },
//           },
//           include: {
//             teacher: {
//               include: { user: { select: { name: true, image: true } } },
//             },
//           },
//           orderBy: [{ date: "asc" }, { startTime: "asc" }],
//           take: 15,
//         }),
//         prisma.invoice.count({
//           where: {
//             parent: { students: { some: { id: sId } } },
//             status: "PENDING",
//           },
//         }),
//       ]);

//     // 3. LOGIC: SERIALIZATION & MAPPING
//     const days = [
//       "Sunday",
//       "Monday",
//       "Tuesday",
//       "Wednesday",
//       "Thursday",
//       "Friday",
//       "Saturday",
//     ];

//     const enrollments = enrollmentsData.map((e) => ({
//       id: e.id,
//       status: e.status,
//       progress: Number(e.progress || 0),
//       attendanceRate: 94, // Placeholder: can be calculated via e.class.attendances
//       enrolledAt: e.enrolledAt.toISOString(),
//       class: {
//         ...e.class,
//         teacher: {
//           id: e.class.teacher.id,
//           name: e.class.teacher.user.name,
//           image: e.class.teacher.user.image,
//         },
//         subjects: e.class.subjects.map((s) => ({
//           ...s,
//           upcomingAssignments: s.assignments.map((a) => ({
//             id: a.id,
//             title: a.title,
//             dueDate: a.dueDate.toISOString(),
//           })),
//         })),
//         recentMaterials: e.class.materials.map((m) => ({
//           id: m.id,
//           title: m.title,
//           type: m.type,
//           fileUrl: m.fileUrl,
//           uploadedAt: m.createdAt.toISOString(),
//         })),
//       },
//     }));

//     const weeklySessions = weeklySessionsData.map((s) => ({
//       id: s.id,
//       class: { name: "Studio Session", teacher: { name: s.teacher.user.name } },
//       dayOfWeek: new Date(s.date).getDay(),
//       dayName: days[new Date(s.date).getDay()],
//       startTime: s.startTime,
//       endTime: s.endTime,
//       isOnline: !!s.meetingUrl,
//       meetingUrl: s.meetingUrl || undefined,
//     }));

//     return (
//       <StudentClassesClient
//         studentId={studentBase.studentId}
//         enrollments={enrollments}
//         availableClasses={availableData.map((c) => ({
//           ...c,
//           teacher: { name: c.teacher.user.name, image: c.teacher.user.image },
//         }))}
//         schedule={weeklySessions}
//         stats={{
//           total: enrollments.length,
//           active: enrollments.filter((e) => e.status === "ACTIVE").length,
//           completed: enrollments.filter((e) => e.status === "COMPLETED").length,
//           averageProgress:
//             enrollments.length > 0
//               ? Math.round(
//                   enrollments.reduce((acc, e) => acc + e.progress, 0) /
//                     enrollments.length,
//                 )
//               : 0,
//           pendingPayments: invoicesCount,
//         }}
//       />
//     );
//   } catch (error) {
//     console.error("Classes Error:", error);
//     return (
//       <div className="p-20 text-center font-bold text-destructive">
//         Critical failure in Curriculum Engine.
//       </div>
//     );
//   }
// }
