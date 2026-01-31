"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const hifzSchema = z.object({
  studentId: z.string(),
  surah: z.coerce.number().int(),
  startAyah: z.coerce.number().int(),
  endAyah: z.coerce.number().int(),
  status: z.enum(["EXCELLENT", "PASS", "NEEDS_PRACTICE", "FAIL"]),
  mistakes: z.coerce.number().int(),
  comments: z.string().optional(),
});

export async function logHifzSession(rawInput: any) {
  const session = await auth();
  if (!session) throw new Error("Unauthorized");

  try {
    const data = hifzSchema.parse(rawInput);

    return await prisma.$transaction(async (tx) => {
      // 1. Create Daily Log
      await tx.hifzProgress.create({
        data: {
          studentId: data.studentId,
          surah: data.surah,
          startAyah: data.startAyah,
          endAyah: data.endAyah,
          status: data.status,
          mistakes: data.mistakes,
          comments: data.comments || "",
          teacherId: session.user.id,
        },
      });

      // 2. Sync Mastery Node
      await tx.quranProgress.upsert({
        where: {
          studentId_surahNumber: {
            studentId: data.studentId,
            surahNumber: data.surah,
          },
        },
        update: { toAyah: data.endAyah, lastRevisedAt: new Date() },
        create: {
          studentId: data.studentId,
          surahNumber: data.surah,
          surahName: `Surah ${data.surah}`,
          juzNumber: Math.ceil(data.surah / 4),
          fromAyah: data.startAyah,
          toAyah: data.endAyah,
          totalAyahs: 0,
          type: "MEMORIZATION",
          status: "IN_PROGRESS",
        },
      });

      revalidatePath("/admin/hifz");
      return { success: true };
    });
  } catch (error: any) {
    return { error: error.message };
  }
}
