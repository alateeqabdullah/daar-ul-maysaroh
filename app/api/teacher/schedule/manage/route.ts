import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { Prisma } from "@/app/generated/prisma/client";

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session || session.user.role !== "TEACHER") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { action, data, scheduleId } = body;

    // --- 1. CREATE SESSION ---
    if (action === "CREATE") {
      // Validate inputs
      if (!data.classId || data.dayOfWeek === undefined || !data.startTime || !data.endTime) {
        return NextResponse.json({ error: "Missing required fields (Class, Day, Time)" }, { status: 400 });
      }

      const newSchedule = await prisma.classSchedule.create({
        data: {
          classId: data.classId,
          // DATA SANITIZATION: Ensure correct types
          dayOfWeek: parseInt(data.dayOfWeek.toString()), 
          startTime: data.startTime,
          endTime: data.endTime,
          isLive: data.isLive === true || data.isLive === "true", // Handle string/bool
          meetingUrl: data.meetingUrl && data.meetingUrl.trim() !== "" ? data.meetingUrl : null,
          meetingPlatform: data.meetingPlatform || "ZOOM",
        },
        include: {
          class: { 
            include: { 
              teacher: { include: { user: true } },
              _count: { select: { enrollments: true } }
            } 
          }
        }
      });

      // Serialize for client
      const formatted = {
        id: newSchedule.id,
        dayOfWeek: newSchedule.dayOfWeek,
        startTime: newSchedule.startTime,
        endTime: newSchedule.endTime,
        isLive: newSchedule.isLive,
        meetingUrl: newSchedule.meetingUrl,
        meetingPlatform: newSchedule.meetingPlatform,
        className: newSchedule.class.name,
        classCode: newSchedule.class.code,
        classLevel: newSchedule.class.level,
        studentCount: newSchedule.class._count.enrollments,
      };

      return NextResponse.json({ success: true, schedule: formatted });
    }

    // --- 2. DELETE SESSION ---
    if (action === "DELETE") {
      await prisma.classSchedule.delete({ where: { id: scheduleId } });
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });

  } catch (error: any) {
    console.error("Schedule API Error:", error);

    // Handle Prisma Unique Constraint Error (P2002)
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return NextResponse.json({ error: "This time slot is already taken for this class." }, { status: 409 });
      }
    }

    return NextResponse.json({ error: error.message || "Server Error" }, { status: 500 });
  }
}