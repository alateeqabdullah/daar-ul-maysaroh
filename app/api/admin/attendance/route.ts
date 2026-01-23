// src/app/api/admin/attendance/route.ts
import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const session = await auth()

    if (
      !session ||
      !["SUPER_ADMIN", "ADMIN", "TEACHER"].includes(session.user.role)
    ) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { studentId, date, status, remarks, classId } = body;

    // Parse date
    const attendanceDate = new Date(date);
    attendanceDate.setHours(0, 0, 0, 0);

    // Find student's class schedule for today
    const schedule = await prisma.classSchedule.findFirst({
      where: {
        classId,
      },
      orderBy: { startTime: "asc" },
    });

    if (!schedule) {
      return NextResponse.json(
        { error: "No schedule found for this class" },
        { status: 400 }
      );
    }

    // Check if attendance already exists
    const existingAttendance = await prisma.attendance.findFirst({
      where: {
        studentId,
        date: attendanceDate,
        classId,
      },
    });

    let attendance;

    if (existingAttendance) {
      // Update existing attendance
      attendance = await prisma.attendance.update({
        where: { id: existingAttendance.id },
        data: {
          status,
          remarks,
          markedBy: session.user.id,
          markedAt: new Date(),
        },
        include: {
          student: {
            include: {
              user: true,
            },
          },
        },
      });
    } else {
      // Create new attendance
      attendance = await prisma.attendance.create({
        data: {
          studentId,
          classId,
          scheduleId: schedule.id,
          date: attendanceDate,
          status,
          remarks,
          markedBy: session.user.id,
          markedAt: new Date(),
        },
        include: {
          student: {
            include: {
              user: true,
            },
          },
        },
      });
    }

    return NextResponse.json({
      message: "Attendance marked successfully",
      attendance,
    });
  } catch (error) {
    console.error("Error marking attendance:", error);
    return NextResponse.json(
      { error: "Failed to mark attendance" },
      { status: 500 }
    );
  }
}
