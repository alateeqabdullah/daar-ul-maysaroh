import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import HifzTerminalClient from "@/components/admin/hifz-terminal-client";

export default async function HifzTerminalPage() {
  const session = await auth();
  if (!session) redirect("/login");

  // Fetch students with their last 3 logs for context
  const studentsRaw = await prisma.student.findMany({
    where: { user: { status: "APPROVED" } },
    include: {
      user: true,
      hifzLogs: {
        take: 3,
        orderBy: { date: "desc" },
      },
      quranProgress: true,
    },
  });

  const students = JSON.parse(JSON.stringify(studentsRaw));

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 p-4 md:p-8">
      <HifzTerminalClient initialStudents={students} />
    </div>
  );
}
