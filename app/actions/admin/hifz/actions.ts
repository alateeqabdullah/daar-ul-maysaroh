"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function logHifzSession(data: any) {
  const session = await auth();
  if (!session) throw new Error("Unauthorized");

  try {
    // 1. Resolve Teacher Profile ID
    const teacherProfile = await prisma.teacher.findUnique({
      where: { userId: session.user.id },
      select: { id: true },
    });
    if (!teacherProfile) return { error: "No Teacher Profile found." };

    // 2. Strict Integer Conversion (The Handshake Fix)
    const sId = String(data.studentId); // This is student.id
    const surahNum = Math.floor(Number(data.surah));
    const start = Math.floor(Number(data.startAyah));
    const end = Math.floor(Number(data.endAyah));
    const mistakeCount = Math.floor(Number(data.mistakes));

    return await prisma.$transaction(async (tx) => {
      // 3. Create Daily Log
      await tx.hifzProgress.create({
        data: {
          studentId: sId,
          teacherId: teacherProfile.id,
          surah: surahNum,
          startAyah: start,
          endAyah: end,
          status: data.status,
          mistakes: mistakeCount,
          comments: data.comments || "",
        },
      });

      // 4. Update Mastery
      await tx.quranProgress.upsert({
        where: {
          studentId_surahNumber: { studentId: sId, surahNumber: surahNum },
        },
        update: {
          toAyah: end,
          status: data.status === "EXCELLENT" ? "COMPLETED" : "IN_PROGRESS",
        },
        create: {
          studentId: sId,
          surahNumber: surahNum,
          surahName: `Surah ${surahNum}`,
          juzNumber: Math.ceil(surahNum / 4) || 1,
          fromAyah: start,
          toAyah: end,
          totalAyahs: end, // Required field
          status: "IN_PROGRESS",
        },
      });

      revalidatePath("/admin/hifz");
      return { success: true };
    });
  } catch (e: any) {
    console.error("DB Error:", e);
    return { error: "Sync Refused: Check Schema Constraints." };
  }
}
