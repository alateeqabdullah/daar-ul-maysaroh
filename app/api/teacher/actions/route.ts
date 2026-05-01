import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const session = await auth();

    // 1. Strict Role Check
    if (!session || session.user.role !== "TEACHER") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { action, data } = body;

    // Get Teacher Profile ID
    const teacher = await prisma.teacher.findUnique({
      where: { userId: session.user.id },
      select: { id: true },
    });

    if (!teacher) {
      return NextResponse.json({ error: "Profile error" }, { status: 404 });
    }

    // --- ACTION: TOGGLE AVAILABILITY ---
    if (action === "TOGGLE_AVAILABILITY") {
      const { isAvailable } = data;

      const updated = await prisma.teacher.update({
        where: { id: teacher.id },
        data: { isAvailable },
      });

      return NextResponse.json({
        success: true,
        isAvailable: updated.isAvailable,
      });
    }

    // --- ACTION: START CLASS (Placeholder for logic) ---
    if (action === "START_CLASS") {
      // Here you would generate a Zoom/Jitsi link or mark attendance as "Open"
      // For now, we return success
      return NextResponse.json({
        success: true,
        message: "Class session started",
      });
    }

    return NextResponse.json({ error: "Invalid Action" }, { status: 400 });
  } catch (error: any) {
    console.error("Teacher API Error:", error);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}
