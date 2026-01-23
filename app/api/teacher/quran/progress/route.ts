import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { HifzStatus } from "@/app/generated/prisma/enums";

export async function POST(req: Request) {
  try {
    const session = await auth();

    // 1. Auth & Role Check
    if (!session || session.user.role !== "TEACHER") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2. Get Teacher Profile ID
    // We need the Teacher table ID, not just the User ID
    const teacher = await prisma.teacher.findUnique({
      where: { userId: session.user.id },
      select: { id: true },
    });

    if (!teacher) {
      return NextResponse.json(
        { error: "Teacher profile not found" },
        { status: 404 },
      );
    }

    const body = await req.json();
    const { action, data } = body;

    // =========================================================
    // ACTION: LOG_SESSION (Record a Hifz Entry)
    // =========================================================
    if (action === "LOG_SESSION") {
      // Validate inputs
      if (!data.studentId || !data.surah || !data.endAyah) {
        return NextResponse.json(
          { error: "Missing required fields (Student, Surah, Ayah)" },
          { status: 400 },
        );
      }

      // Create the Hifz Progress Record
      const newLog = await prisma.hifzProgress.create({
        data: {
          surah: parseInt(data.surah),
          startAyah: parseInt(data.startAyah) || 1,
          endAyah: parseInt(data.endAyah),
          mistakes: parseInt(data.mistakes) || 0,
          status: data.status as HifzStatus,
          comments: data.comments,
          // Relations
          student: { connect: { id: data.studentId } },
          teacher: { connect: { id: teacher.id } },
        },
        include: {
          student: {
            include: { user: { select: { name: true, image: true } } },
          },
        },
      });

      // Update the Student's "Current Level" for quick display
      // Only update if the status was PASS or EXCELLENT
      if (data.status === "PASS" || data.status === "EXCELLENT") {
        await prisma.student.update({
          where: { id: data.studentId },
          data: {
            hifzLevel: `Surah ${data.surah} : Ayah ${data.endAyah}`,
          },
        });
      }

      // Format response for the client to update UI instantly
      const formattedLog = {
        id: newLog.id,
        studentName: newLog.student.user.name,
        studentImage: newLog.student.user.image,
        surah: newLog.surah,
        ayahs: `${newLog.startAyah}-${newLog.endAyah}`,
        mistakes: newLog.mistakes,
        rating: newLog.status,
        date: newLog.createdAt.toISOString(),
      };

      return NextResponse.json({ success: true, log: formattedLog });
    }

    return NextResponse.json({ error: "Invalid Action" }, { status: 400 });
  } catch (error: any) {
    console.error("Quran API Error:", error);
    return NextResponse.json(
      { error: error.message || "Server Error" },
      { status: 500 },
    );
  }
}
