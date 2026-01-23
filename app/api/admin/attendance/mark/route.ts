import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session || !["ADMIN", "SUPER_ADMIN"].includes(session.user.role)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { date, classId, scheduleId, updates } = body;

    if (!scheduleId) {
      return NextResponse.json(
        { error: "No class schedule found for this day." },
        { status: 400 }
      );
    }

    const targetDate = new Date(date);

    // Use transaction for consistency
    await prisma.$transaction(
      updates.map((update: any) =>
        prisma.attendance.upsert({
          where: {
            studentId_scheduleId_date: {
              studentId: update.studentId,
              scheduleId: scheduleId,
              date: targetDate,
            },
          },
          update: {
            status: update.status,
            remarks: update.remarks || null,
            markedBy: session.user.id,
            markedAt: new Date(),
          },
          create: {
            studentId: update.studentId,
            classId: classId,
            scheduleId: scheduleId,
            date: targetDate,
            status: update.status,
            remarks: update.remarks || null,
            markedBy: session.user.id,
            markedAt: new Date(),
          },
        })
      )
    );

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Server Error" },
      { status: 500 }
    );
  }
}
