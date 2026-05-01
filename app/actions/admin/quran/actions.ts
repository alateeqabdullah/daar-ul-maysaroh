"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function toggleSurahMastery(formData: {
  studentId: string;
  surahNumber: number;
  surahName: string;
}) {
  const session = await auth();
  if (!session) throw new Error("Unauthorized");

  // CRITICAL: Explicitly cast to Number for the Prisma Handshake
  const sId = String(formData.studentId);
  const sNum = Number(formData.surahNumber);

  try {
    return await prisma.$transaction(async (tx) => {
      const existing = await tx.quranProgress.findUnique({
        where: {
          studentId_surahNumber: {
            studentId: sId,
            surahNumber: sNum,
          },
        },
      });

      if (existing) {
        await tx.quranProgress.delete({ where: { id: existing.id } });
      } else {
        await tx.quranProgress.create({
          data: {
            studentId: sId,
            surahNumber: sNum,
            surahName: formData.surahName,
            juzNumber: Math.ceil(sNum / 4),
            fromAyah: 1,
            toAyah: 7,
            totalAyahs: 7,
            status: "MASTERED",
            type: "MEMORIZATION",
          },
        });
      }
      revalidatePath("/admin/quran-progress");
      return { success: true };
    });
  } catch (error: any) {
    console.error("Prisma Sync Error:", error);
    return { error: "Handshake Failed: Ensure surahNumber is an Integer" };
  }
}
