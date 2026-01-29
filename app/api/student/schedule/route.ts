import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { SessionStatus } from "@/app/generated/prisma/enums";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { action, teacherId, date, startTime, duration } = await req.json();
    const student = await prisma.student.findUnique({
      where: { userId: session.user.id },
    });
    if (!student)
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });

    if (action === "BOOK_SESSION") {
      // 1. Conflict Check: Is student already busy?
      const conflict = await prisma.scheduledSession.findFirst({
        where: {
          studentId: student.id,
          date: new Date(date),
          startTime,
          status: "SCHEDULED",
        },
      });
      if (conflict)
        return NextResponse.json(
          { error: "You already have a session at this time." },
          { status: 400 },
        );

      // 2. Find an active subscription to link this session to
      const subscription = await prisma.subscription.findFirst({
        where: { studentId: student.id, status: "ACTIVE" },
      });

      if (!subscription)
        return NextResponse.json(
          { error: "No active subscription found." },
          { status: 400 },
        );

      // 3. Create Session
      const newSession = await prisma.scheduledSession.create({
        data: {
          subscriptionId: subscription.id,
          teacherId,
          date: new Date(date),
          startTime,
          endTime: "Calculated based on duration...", // Logic here
          duration,
          status: SessionStatus.SCHEDULED,
        },
      });

      return NextResponse.json({ success: true, data: newSession });
    }
  } catch (error) {
    return NextResponse.json({ error: "Booking Failed" }, { status: 500 });
  }
}
