import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import QuranTrackerClient from "@/components/teacher/quran-tracker-client";
import {
  QuranStudent,
  QuranLog,
  QuranStats,
} from "@/types/(dashboard)/teacher/quran";

export const metadata = {
  title: "Quran Tracker | Teacher",
  description: "Monitor Hifz and Tajweed progress",
};

export default async function QuranPage() {
  const session = await auth();
  if (!session?.user?.email) redirect("/login");

  // 1. Get Teacher
  const dbUser = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: { teacherProfile: { select: { id: true } } },
  });

  if (!dbUser?.teacherProfile) redirect("/dashboard");
  const teacherId = dbUser.teacherProfile.id;

  // 2. Fetch Data
  const [studentsRaw, logsRaw] = await Promise.all([
    // Students assigned to this teacher
    prisma.student.findMany({
      where: {
        enrollments: {
          some: {
            class: { teacherId: teacherId, isActive: true },
            status: "ACTIVE",
          },
        },
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
            email: true,
            phone: true,
          },
        },
        parent: { include: { user: { select: { name: true, phone: true } } } },
        hifzLogs: {
          take: 1,
          orderBy: { date: "desc" },
          select: { status: true, date: true, surah: true },
        },
      },
      orderBy: { user: { name: "asc" } },
    }),

    // Recent Logs for Feed
    prisma.hifzProgress.findMany({
      where: { teacherId: teacherId },
      take: 20,
      orderBy: { createdAt: "desc" },
      include: {
        student: { select: { user: { select: { name: true, image: true } } } },
      },
    }),
  ]);

  // 3. Serialize & Map to Types
  const students: QuranStudent[] = studentsRaw.map((s) => {
    const lastLog = s.hifzLogs[0];
    const lastLogDate = lastLog?.date ? new Date(lastLog.date) : null;

    // Calculate "Last Recited" text
    let lastRecited = "Never";
    if (lastLogDate) {
      const diffDays = Math.floor(
        (new Date().getTime() - lastLogDate.getTime()) / (1000 * 3600 * 24),
      );
      lastRecited =
        diffDays === 0
          ? "Today"
          : diffDays === 1
            ? "Yesterday"
            : `${diffDays} days ago`;
    }

    // Status logic
    let status: QuranStudent["status"] = "Active";
    if (!lastLogDate) status = "Inactive";
    else if (
      (new Date().getTime() - lastLogDate.getTime()) / (1000 * 3600 * 24) >
      7
    )
      status = "At Risk";

    return {
      id: s.id,
      name: s.user.name,
      image: s.user.image,
      email: s.user.email,
      phone: s.user.phone,
      hifzLevel: s.hifzLevel || "Juz 1",
      currentSurah: lastLog?.surah || 1,
      goal: s.memorizationGoal || "Complete Quran",
      lastRecited,
      status,
      parentName: s.parent?.user.name,
      parentPhone: s.parent?.user.phone,
    };
  });

  const logs: QuranLog[] = logsRaw.map((l) => ({
    id: l.id,
    studentId: l.studentId,
    studentName: l.student.user.name,
    studentImage: l.student.user.image,
    surah: l.surah,
    startAyah: l.startAyah,
    endAyah: l.endAyah,
    mistakes: l.mistakes,

    rating: l.status,
    date: l.createdAt.toISOString(),
  }));

  const stats: QuranStats = {
    totalStudents: students.length,
    activeReciters: students.filter((s) => s.status === "Active").length,
    totalJuzCompleted: 0, // Placeholder for complex calc
    needsAttention: students.filter((s) => s.status === "At Risk").length,
  };

  return <QuranTrackerClient students={students} logs={logs} stats={stats} />;
}
