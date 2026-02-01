// import { redirect } from "next/navigation";
// import { auth } from "@/lib/auth";
// import { prisma } from "@/lib/prisma";
// import ClassManagementClient from "@/components/admin/class-management-client";

// export const metadata = {
//   title: "Class Management | Admin",
//   description: "Manage academic classes and schedules",
// };

// export default async function ClassManagementPage() {
//   const session = await auth();
//   if (!session) redirect("/login");
//   if (!["SUPER_ADMIN", "ADMIN"].includes(session.user.role))
//     redirect("/dashboard");

//   try {
//     const [classesRaw, teachersRaw] = await Promise.all([
//       prisma.class.findMany({
//         include: {
//           teacher: {
//             include: { user: { select: { name: true, image: true } } },
//           },
//           _count: { select: { enrollments: true } }, // More efficient than fetching all enrollments
//           schedules: true,
//         },
//         orderBy: { createdAt: "desc" },
//       }),
//       prisma.teacher.findMany({
//         where: { isAvailable: true },
//         include: { user: { select: { name: true, image: true } } },
//       }),
//     ]);

//     // Optimize Serialization
//     const classes = classesRaw.map((c) => ({
//       ...c,
//       createdAt: c.createdAt.toISOString(),
//       updatedAt: c.updatedAt.toISOString(),
//       startDate: c.startDate?.toISOString() || null,
//       endDate: c.endDate?.toISOString() || null,
//       currentEnrollment: c._count.enrollments, // Flatten count
//     }));

//     const teachers = teachersRaw.map((t) => ({
//       id: t.id,
//       name: t.user.name,
//       image: t.user.image,
//     }));

//     // Calculate Stats
//     const stats = {
//       totalClasses: classes.length,
//       activeClasses: classes.filter((c) => c.isActive).length,
//       totalStudents: classes.reduce((sum, c) => sum + c.currentEnrollment, 0),
//       totalTeachers: teachers.length,
//     };

//     return (
//       <ClassManagementClient
//         initialClasses={classes}
//         teachers={teachers}
//         stats={stats}
//       />
//     );
//   } catch (error) {
//     console.error("Class Page Error:", error);
//     return <div>Error loading classes. Please refresh.</div>;
//   }
// }

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import ClassTerminalClient from "@/components/admin/class-terminal-client";

export default async function ClassesPage() {
  const session = await auth();
  if (!session) redirect("/login");

  const [classesRaw, teachersRaw, studentsRaw] = await Promise.all([
    prisma.class.findMany({
      include: {
        teacher: { include: { user: true } },
        subjects: { include: { teacher: { include: { user: true } } } },
        enrollments: { include: { student: { include: { user: true } } } },
        schedules: true,
        _count: { select: { enrollments: true } },
      },
      orderBy: { level: "asc" },
    }),
    prisma.teacher.findMany({ include: { user: true } }),
    prisma.student.findMany({ include: { user: true } }),
  ]);

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 p-4 md:p-10">
      <ClassTerminalClient
        initialClasses={JSON.parse(JSON.stringify(classesRaw))}
        teachers={JSON.parse(JSON.stringify(teachersRaw))}
        allStudents={JSON.parse(JSON.stringify(studentsRaw))}
      />
    </div>
  );
}