import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import QuranProgressClient from "@/components/(portal)/student/quran-progress-client";

export default async function QuranProgressPage() {
  const session = await auth();
  if (!session?.user?.email) redirect("/login");

  try {
    const student = await prisma.student.findFirst({
      where: { user: { email: session.user.email } },
      select: {
        id: true,
        studentId: true,
        hifzLevel: true,
        tajweedLevel: true,
        memorizationGoal: true,
        user: { select: { name: true, image: true } },
      },
    });

    if (!student) redirect("/onboarding");

    // Parallel Fetch
    const [
      progress,
      hifzLogs,
      assignments,
      recordings,
      evaluations,
      certificates,
      statsResult,
    ] = await Promise.all([
      prisma.quranProgress.findMany({
        where: { studentId: student.id },
        orderBy: { surahNumber: "asc" },
      }),
      prisma.hifzProgress.findMany({
        where: { studentId: student.id },
        orderBy: { date: "desc" },
        take: 15,
        include: { teacher: { include: { user: true } } },
      }),
      prisma.assignment.findMany({
        where: {
          subject: {
            category: "QURAN",
            class: {
              enrollments: {
                some: { studentId: student.id, status: "ACTIVE" },
              },
            },
          },
        },
        include: {
          subject: true,
          submissions: { where: { studentId: student.id }, take: 1 },
        },
        take: 5,
      }),
      prisma.quranProgress.findMany({
        where: { studentId: student.id, recordingUrl: { not: null } },
        orderBy: { createdAt: "desc" },
        take: 10,
      }),
      prisma.quranProgress.findMany({
        where: { studentId: student.id, evaluationScore: { not: null } },
        orderBy: { evaluatedAt: "desc" },
        take: 10,
      }),
      prisma.certificate.findMany({
        where: {
          studentId: student.id,
          type: { in: ["MEMORIZATION", "COMPLETION"] },
        },
        orderBy: { issuedAt: "desc" },
        take: 5,
      }),
      // Stats
      Promise.all([
        prisma.quranProgress.aggregate({
          where: { studentId: student.id, status: "COMPLETED" },
          _sum: { totalAyahs: true },
        }),
        prisma.quranProgress.aggregate({
          where: { studentId: student.id, evaluationScore: { not: null } },
          _avg: { evaluationScore: true },
        }),
        prisma.hifzProgress.groupBy({
          by: ["date"],
          where: { studentId: student.id },
          _count: { id: true },
        }),
      ]),
    ]);

    const totalAyahs = Number(statsResult[0]._sum.totalAyahs || 0);
    const averageScore = Math.round(
      Number(statsResult[1]._avg.evaluationScore || 0),
    );
    const progressPercentage = Math.round((totalAyahs / 6236) * 100);

    // Group progress by juz
    const juzProgress = Array.from({ length: 30 }, (_, i) => {
      const juzNumber = i + 1;
      const juzP = progress.filter((p) => p.juzNumber === juzNumber);
      const completed = juzP.filter((p) => p.status === "COMPLETED").length;
      const total = juzP.length || 1;
      return {
        juz: juzNumber,
        progress: Math.round((completed / total) * 100),
        status:
          completed > 0
            ? completed === total
              ? "COMPLETED"
              : "IN_PROGRESS"
            : "NOT_STARTED",
      };
    });

    // Final Data Payload for Elite UI
    const data = {
      student: {
        ...student,
        name: student.user.name,
        image: student.user.image,
      },
      analytics: {
        // RENAMED FROM 'stats' TO 'analytics' TO MATCH CLIENT
        accuracy: averageScore || 0,
        totalAyahs: totalAyahs,
        streak: statsResult[2].length, // Number of active days
        juzCount: juzProgress.filter((j) => j.status === "COMPLETED").length,
        progressPercentage,
      },
      heatmap: statsResult[2].map((h) => ({
        date: h.date.toISOString(),
        count: h._count.id,
      })),
      juzProgress,
      logs: hifzLogs.map((l) => ({
        id: l.id,
        surah: l.surah,
        startAyah: l.startAyah,
        endAyah: l.endAyah,
        status: l.status,
        mistakes: l.mistakes,
        comments: l.comments,
        date: l.date.toISOString(),
        teacherName: l.teacher?.user.name,
      })),
      recordings: recordings.map((r) => ({
        id: r.id,
        surah: r.surahName,
        url: r.recordingUrl,
        date: r.createdAt.toISOString(),
      })),
      evaluations: evaluations.map((e) => ({
        id: e.id,
        surah: e.surahName,
        score: e.evaluationScore,
        notes: e.evaluationNotes,
        date: e.evaluatedAt?.toISOString(),
      })),
      certificates: certificates.map((c) => ({
        id: c.id,
        title: c.title,
        date: c.issuedAt.toISOString(),
        url: c.certificateUrl,
      })),
    };

    return <QuranProgressClient data={data} />;
  } catch (error) {
    console.error(error);
    return (
      <div className="p-20 text-center font-bold">
        Failed to synchronize Quran records.
      </div>
    );
  }
}
