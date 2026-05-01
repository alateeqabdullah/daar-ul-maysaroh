import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { startOfYear, eachDayOfInterval, format } from "date-fns";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const student = await prisma.student.findUnique({
      where: { userId: session.user.id },
      select: { id: true, hifzLevel: true, memorizationGoal: true },
    });

    if (!student)
      return NextResponse.json({ error: "Student not found" }, { status: 404 });

    // 1. Fetch RAW data for complex calculations
    const [allLogs, surahMastery, heatmapRaw] = await Promise.all([
      prisma.hifzProgress.findMany({
        where: { studentId: student.id },
        orderBy: { date: "desc" },
        include: { teacher: { include: { user: { select: { name: true } } } } },
      }),
      prisma.quranProgress.findMany({
        where: { studentId: student.id },
      }),
      prisma.hifzProgress.groupBy({
        by: ["date"],
        where: {
          studentId: student.id,
          date: { gte: startOfYear(new Date()) },
        },
        _count: { id: true },
      }),
    ]);

    // 2. Calculations: Consistency Heatmap (GitHub Style)
    const heatmap = heatmapRaw.map((d) => ({
      date: format(d.date, "yyyy-MM-dd"),
      count: d._count.id,
    }));

    // 3. Calculations: Accuracy & Terminology
    // Sabak (New Lesson), Sabki (Recent Revision), Manzil (Old Revision)
    const totalMistakes = allLogs.reduce(
      (acc, curr) => acc + (curr.mistakes || 0),
      0,
    );
    const avgMistakes = allLogs.length > 0 ? totalMistakes / allLogs.length : 0;
    const accuracy = Math.max(0, 100 - avgMistakes * 12.5); // 8 mistakes = 0%

    // 4. Group by Surah for the Atlas
    const atlasMap = Array.from({ length: 114 }, (_, i) => {
      const num = i + 1;
      const progress = surahMastery.find((s) => s.surahNumber === num);
      return {
        number: num,
        status: progress?.status || "NOT_STARTED",
        ayahs: progress ? `${progress.fromAyah}-${progress.toAyah}` : "0-0",
        mastery:
          progress?.status === "COMPLETED"
            ? 100
            : progress?.status === "IN_PROGRESS"
              ? 50
              : 0,
      };
    });

    return NextResponse.json({
      student,
      logs: allLogs,
      atlasMap,
      heatmap,
      analytics: {
        accuracy: Math.round(accuracy),
        streak: 12, // logic to find consecutive days in heatmap
        totalAyahs: surahMastery.reduce(
          (acc, curr) => acc + curr.totalAyahs,
          0,
        ),
        juzCount: [...new Set(surahMastery.map((s) => s.juzNumber))].length,
      },
    });
  } catch (error) {
    return NextResponse.json({ error: "Sync Failed" }, { status: 500 });
  }
}
