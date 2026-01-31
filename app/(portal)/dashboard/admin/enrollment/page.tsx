import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import EnrollmentClient from "@/components/admin/enrollment-client";

export default async function EnrollmentPage() {
  const session = await auth();
  if (!session) redirect("/login");

  const [classesRaw, studentsRaw] = await Promise.all([
    prisma.class.findMany({
      where: { isActive: true },
      include: {
        teacher: { include: { user: true } },
        _count: { select: { enrollments: true } },
      },
    }),
    prisma.student.findMany({
      include: {
        user: true,
        enrollments: { select: { classId: true } },
      },
    }),
  ]);

  return (
    <div className="min-h-screen p-4 md:p-8 bg-slate-50/50 dark:bg-slate-950">
      <EnrollmentClient
        classes={JSON.parse(JSON.stringify(classesRaw))}
        students={JSON.parse(JSON.stringify(studentsRaw))}
      />
    </div>
  );
}
