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
    const { classId, date, records, scheduleId } = body;

    if (!classId || !date || !records) {
      return NextResponse.json({ error: "Missing data" }, { status: 400 });
    }

    const targetDate = new Date(date);

    // Transaction: Upsert every record
    await prisma.$transaction(
      records.map((r: any) => 
        prisma.attendance.upsert({
          where: {
            studentId_scheduleId_date: {
              studentId: r.studentId,
              scheduleId: scheduleId || "adhoc", // Fallback if schema allows
              date: targetDate
            }
          },
          update: {
            status: r.status,
            remarks: r.remarks,
            markedAt: new Date(),
            markedBy: session.user.id
          },
          create: {
            classId,
            studentId: r.studentId,
            scheduleId: scheduleId,
            date: targetDate,
            status: r.status,
            remarks: r.remarks,
            markedBy: session.user.id,
            markedAt: new Date()
          }
        })
      )
    );

    return NextResponse.json({ success: true });

  } catch (error: any) {
    console.error("Attendance API Error:", error);
    return NextResponse.json({ error: "Failed to save" }, { status: 500 });
  }
}