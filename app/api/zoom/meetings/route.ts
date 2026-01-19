// src/app/api/zoom/meetings/route.ts
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { ZoomService } from "@/lib/zoom";

export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    if (!["TEACHER", "ADMIN", "SUPER_ADMIN"].includes(session.user.role)) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const zoom = new ZoomService();
    const meetingData = await request.json();

    const meeting = await zoom.createMeeting(meetingData);

    // Save meeting to database
    // This would link the Zoom meeting to your class/group

    return NextResponse.json({
      message: "Meeting created successfully",
      meeting,
    });
  } catch (error) {
    console.error("Error creating Zoom meeting:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
