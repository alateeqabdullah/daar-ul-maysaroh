import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { Prisma } from "@/app/generated/prisma/client";


export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session || !["ADMIN", "SUPER_ADMIN"].includes(session.user.role)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { action, data, scheduleId } = body;

    // --- 1. CREATE SCHEDULE ---
    if (action === "CREATE") {
      if (!data.classId || !data.startTime || !data.endTime) {
        return NextResponse.json(
          { error: "Class, Start Time, and End Time are required." },
          { status: 400 }
        );
      }

      const newSchedule = await prisma.classSchedule.create({
        data: {
          classId: data.classId,
          dayOfWeek: parseInt(data.dayOfWeek),
          startTime: data.startTime,
          endTime: data.endTime,

          // FIX 1: Map 'isOnline' (from frontend) to 'isLive' (database schema)
          isLive: data.isOnline === true || data.isOnline === "true",

          meetingUrl:
            data.meetingUrl && data.meetingUrl.trim() !== ""
              ? data.meetingUrl
              : null,
          meetingPlatform: data.meetingPlatform || "ZOOM",
        },
        include: {
          class: { include: { teacher: { include: { user: true } } } },
        },
      });

      const formatted = {
        ...newSchedule,
        createdAt: newSchedule.createdAt.toISOString(),
        updatedAt: newSchedule.updatedAt.toISOString(),
      };

      return NextResponse.json({ success: true, schedule: formatted });
    }

    // --- 2. UPDATE SCHEDULE ---
    if (action === "UPDATE") {
      if (!scheduleId) {
        return NextResponse.json(
          { error: "Schedule ID missing" },
          { status: 400 }
        );
      }

      const updated = await prisma.classSchedule.update({
        where: { id: scheduleId },
        data: {
          dayOfWeek: parseInt(data.dayOfWeek),
          startTime: data.startTime,
          endTime: data.endTime,

          // FIX 1: Map 'isOnline' to 'isLive' here too
          isLive: data.isOnline === true || data.isOnline === "true",

          meetingUrl:
            data.meetingUrl && data.meetingUrl.trim() !== ""
              ? data.meetingUrl
              : null,
          meetingPlatform: data.meetingPlatform,
        },
        include: {
          class: { include: { teacher: { include: { user: true } } } },
        },
      });
      return NextResponse.json({ success: true, schedule: updated });
    }

    // --- 3. DELETE SCHEDULE ---
    if (action === "DELETE") {
      await prisma.classSchedule.delete({ where: { id: scheduleId } });
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error: unknown) {
    // FIX 2: Use 'unknown' instead of 'any'
    console.error("Schedule API Error:", error);

    // FIX 2: Type guard for Prisma Errors
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return NextResponse.json(
          { error: "A session for this class already exists at this time." },
          { status: 409 }
        );
      }
    }

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
