import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { HifzStatus } from "@/app/generated/prisma/enums"

export async function POST(req: Request) {
  try {
    const session = await auth();
    // 1. Auth Check
    if (!session || session.user.role !== "TEACHER") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { action, data } = body;

    // 2. Get Teacher Profile
    // We need the actual Teacher ID, not just the User ID
    const teacherProfile = await prisma.teacher.findUnique({
      where: { userId: session.user.id },
      select: { id: true },
    });

    if (!teacherProfile) {
      return NextResponse.json(
        { error: "Teacher profile not found" },
        { status: 404 }
      );
    }

    // =========================================================
    // ACTION: LOG HIFZ PROGRESS
    // =========================================================
    if (action === "LOG_HIFZ") {
      // Validate inputs
      if (!data.studentId || !data.surah || !data.endAyah) {
        return NextResponse.json(
          { error: "Missing required fields" },
          { status: 400 }
        );
      }

      await prisma.hifzProgress.create({
        data: {
          // Scalars
          surah: parseInt(data.surah),
          startAyah: parseInt(data.startAyah) || 1,
          endAyah: parseInt(data.endAyah),
          status: data.status as HifzStatus, // e.g. "PASS"
          mistakes: parseInt(data.mistakes) || 0,
          comments: data.comments,

          // Relations (FIX: Used 'connect' for both to satisfy TypeScript)
          student: {
            connect: { id: data.studentId },
          },
          teacher: {
            connect: { id: teacherProfile.id },
          },
        },
      });

      // Update student's "Current Level" cache for quick display
      await prisma.student.update({
        where: { id: data.studentId },
        data: {
          hifzLevel: `Surah ${data.surah} : ${data.endAyah}`,
        },
      });

      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: "Invalid Action" }, { status: 400 });
  } catch (error: any) {
    console.error("Student Actions API Error:", error);
    return NextResponse.json(
      { error: error.message || "Server Error" },
      { status: 500 }
    );
  }
}
