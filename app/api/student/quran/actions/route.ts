import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.email)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { action, payload } = await req.json();
    const student = await prisma.student.findUnique({
      where: { userId: session.user.id },
    });
    if (!student) throw new Error("Student not found");

    switch (action) {
      case "LOG_PRACTICE":
        await prisma.hifzProgress.create({
          data: {
            studentId: student.id,
            surah: parseInt(payload.surah),
            startAyah: payload.start,
            endAyah: payload.end,
            mistakes: payload.mistakes || 0,
            status: "PASS",
            date: new Date(),
          },
        });
        break;

      case "SUBMIT_RECORDING":
        await prisma.quranProgress.create({
          data: {
            studentId: student.id,
            surahName: payload.surahName,
            recordingUrl: payload.url,
            recordingDuration: payload.duration,
            type: "RECITATION",
            status: "IN_PROGRESS",
            surahNumber: 1,
            juzNumber: 1,
            fromAyah: 1,
            toAyah: 1,
            totalAyahs: 1, // Default values to satisfy schema
          },
        });
        break;

      default:
        return NextResponse.json(
          { error: "Action not recognized" },
          { status: 400 },
        );
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
