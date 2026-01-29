import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session || session.user.role !== "TEACHER") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { action, data } = body;

    // Get Teacher Profile
    const teacher = await prisma.teacher.findUnique({
      where: { userId: session.user.id },
      include: { user: true },
    });

    if (!teacher)
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });

    // --- ACTION: START CLASS SESSION ---
    // In a real app, this might generate a Zoom link or mark attendance as "Open"
    if (action === "START_SESSION") {
      // Log notification that class started (Simulating activity)
      await prisma.notification.create({
        data: {
          userId: session.user.id,
          title: "Class Started",
          message: `You started a session for class ID: ${data.classId}`,
          type: "SYSTEM",
        },
      });

      return NextResponse.json({ success: true, message: "Session started" });
    }

    // --- ACTION: REQUEST NEW CLASS ---
    if (action === "REQUEST_CLASS") {
      const { className, subject } = data;

      // Find Admins to notify
      const admins = await prisma.user.findMany({
        where: { role: "ADMIN" },
        select: { id: true },
      });

      if (admins.length > 0) {
        await prisma.notification.createMany({
          data: admins.map((admin) => ({
            userId: admin.id,
            title: "New Class Request",
            message: `Teacher ${teacher.user.name} requested: ${className} (${subject})`,
            type: "SYSTEM",
            priority: "NORMAL",
          })),
        });
      }

      return NextResponse.json({
        success: true,
        message: "Request sent to Admin",
      });
    }

    return NextResponse.json({ error: "Invalid Action" }, { status: 400 });
  } catch (error: any) {
    console.error("Class Action Error:", error);
    return NextResponse.json({ error: "Operation failed" }, { status: 500 });
  }
}
