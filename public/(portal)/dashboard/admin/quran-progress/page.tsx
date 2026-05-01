import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import QuranProgressClient from "@/components/admin/quran-progress-client";

export default async function QuranProgressPage() {
  const session = await auth();
  if (
    !session ||
    !["ADMIN", "SUPER_ADMIN", "TEACHER"].includes(session.user.role)
  )
    redirect("/login");

  const studentsRaw = await prisma.student.findMany({
    where: { user: { status: "APPROVED" } },
    include: {
      user: { select: { name: true, image: true } },
      quranProgress: true, // This is the state data
    },
    orderBy: { user: { name: "asc" } },
  });

  const students = JSON.parse(JSON.stringify(studentsRaw));

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 p-4 md:p-8">
      <QuranProgressClient initialStudents={students} />
    </div>
  );
}
