// import { redirect } from "next/navigation";
// import { prisma } from "@/lib/prisma";
// import GradesManagementClient from "@/components/admin/grades-management-client";
// import { auth } from "@/lib/auth";
// import { Prisma } from "@/app/generated/prisma/client";

// export const metadata = {
//   title: "Grades & Results | Admin",
//   description: "Manage academic performance and assessments",
// };

// export default async function GradesManagementPage({
//   searchParams,
// }: {
//   searchParams: Promise<{ page?: string; search?: string; classId?: string }>;
// }) {
//   const session = await auth();
//   if (!session) redirect("/login");
//   if (!["SUPER_ADMIN", "ADMIN"].includes(session.user.role))
//     redirect("/dashboard");

//   const params = await searchParams;
//   const page = parseInt(params.page || "1");
//   const limit = 15;
//   const skip = (page - 1) * limit;

//   // --- Filter Logic ---
//   const where: Prisma.GradeWhereInput = {
//     ...(params.classId &&
//       params.classId !== "ALL" && {
//         subject: { classId: params.classId },
//       }),
//     ...(params.search && {
//       student: {
//         user: { name: { contains: params.search, mode: "insensitive" } },
//       },
//     }),
//   };

//   try {
//     const [gradesRaw, total, classesRaw, aggregates, topPerformersRaw] =
//       await Promise.all([
//         // 1. Fetch Grades List
//         prisma.grade.findMany({
//           where,
//           include: {
//             student: {
//               include: { user: { select: { name: true, image: true } } },
//             },
//             subject: {
//               include: { class: { select: { name: true, code: true } } },
//             },
//           },
//           orderBy: { assessmentDate: "desc" },
//           skip,
//           take: limit,
//         }),

//         // 2. Count for Pagination
//         prisma.grade.count({ where }),

//         // 3. Classes for Dropdown
//         prisma.class.findMany({
//           where: { isActive: true },
//           select: { id: true, name: true },
//         }),

//         // 4. Global Stats (Aggregations)
//         prisma.grade.aggregate({
//           _avg: { score: true },
//           _count: { _all: true },
//           where: { isPublished: true },
//         }),

//         // 5. Top Performers (Simplified: Highest recent scores)
//         prisma.grade.findMany({
//           where: { isPublished: true },
//           orderBy: { score: "desc" },
//           take: 5,
//           include: {
//             student: {
//               include: { user: { select: { name: true, image: true } } },
//             },
//             subject: { select: { name: true } },
//           },
//         }),
//       ]);

//     // Serialize Dates & Structure
//     const grades = gradesRaw.map((g) => ({
//       ...g,
//       assessmentDate: g.assessmentDate.toISOString(),
//       createdAt: g.createdAt.toISOString(),
//       studentName: g.student.user.name,
//       studentImage: g.student.user.image,
//       subjectName: g.subject.name,
//       className: g.subject.class.name,
//     }));

//     const stats = {
//       total: aggregates._count._all,
//       average: Math.round(aggregates._avg.score || 0),
//       // Map top performers for the UI
//       topStudents: topPerformersRaw.map((t) => ({
//         id: t.studentId,
//         name: t.student.user.name,
//         image: t.student.user.image,
//         score: t.score,
//         subject: t.subject.name,
//       })),
//     };

//     return (
//       <GradesManagementClient
//         initialGrades={grades}
//         classes={classesRaw}
//         stats={stats}
//         pagination={{ page, total, limit, pages: Math.ceil(total / limit) }}
//       />
//     );
//   } catch (error) {
//     console.error("Grades Page Error:", error);
//     return <div>Error loading grades. Please refresh.</div>;
//   }
// }

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import GradeTerminalClient from "@/components/admin/grade-terminal-client";

export default async function GradesPage() {
  const session = await auth();
  if (
    !session ||
    !["ADMIN", "TEACHER", "SUPER_ADMIN"].includes(session.user.role)
  )
    redirect("/login");

  const [gradesRaw, studentsRaw, subjectsRaw] = await Promise.all([
    prisma.grade.findMany({
      include: {
        student: { include: { user: { select: { name: true, image: true } } } },
        subject: { select: { name: true, code: true } },
      },
      orderBy: { createdAt: "desc" },
    }),
    prisma.student.findMany({
      include: { user: { select: { name: true } } },
    }),
    prisma.subject.findMany({
      select: { id: true, name: true, code: true },
    }),
  ]);

  // Next.js 16/Turbopack Serialization
  const grades = JSON.parse(JSON.stringify(gradesRaw));
  const students = JSON.parse(JSON.stringify(studentsRaw));
  const subjects = JSON.parse(JSON.stringify(subjectsRaw));

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 p-4 md:p-10">
      <GradeTerminalClient
        initialGrades={grades}
        students={students}
        subjects={subjects}
      />
    </div>
  );
}