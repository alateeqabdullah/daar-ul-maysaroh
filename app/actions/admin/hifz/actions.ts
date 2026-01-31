"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { HifzStatus } from "@/app/generated/prisma/enums";

export async function logHifzSession(data: any) {
  const session = await auth();
  if (
    !session ||
    !["ADMIN", "TEACHER", "SUPER_ADMIN"].includes(session.user.role)
  ) {
    throw new Error("Unauthorized");
  }

  const { studentId, surah, startAyah, endAyah, status, mistakes, comments } =
    data;

  return await prisma.$transaction(async (tx) => {
    // 1. Create the Daily Hifz Log
    const log = await tx.hifzProgress.create({
      data: {
        studentId,
        surah: parseInt(surah),
        startAyah: parseInt(startAyah),
        endAyah: parseInt(endAyah),
        status: status as HifzStatus,
        mistakes: parseInt(mistakes),
        comments,
        teacherId: session.user.id,
      },
    });

    // 2. Update/Sync the Global QuranProgress (Mastery Tracking)
    // This ensures the "Spiritual Pulse" on the dashboard stays updated
    await tx.quranProgress.upsert({
      where: {
        studentId_surahNumber: {
          studentId,
          surahNumber: parseInt(surah),
        },
      },
      update: {
        toAyah: parseInt(endAyah),
        status:
          status === "EXCELLENT" || status === "PASS"
            ? "COMPLETED"
            : "IN_PROGRESS",
        lastRevisedAt: new Date(),
      },
      create: {
        studentId,
        surahNumber: parseInt(surah),
        surahName: `Surah ${surah}`, // You can map this to real names later
        juzNumber: Math.ceil(parseInt(surah) / 4), // Rough estimate logic
        fromAyah: parseInt(startAyah),
        toAyah: parseInt(endAyah),
        totalAyahs: parseInt(endAyah),
        type: "MEMORIZATION",
        status: "IN_PROGRESS",
      },
    });

    revalidatePath("/admin/hifz");
    return { success: true };
  });
}
