import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { SessionStatus } from "@/app/generated/prisma/enums";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { action, teacherId, date, startTime, duration } = await req.json();
    const student = await prisma.student.findUnique({ where: { userId: session.user.id } });
    if (!student) return NextResponse.json({ error: "Profile not found" }, { status: 404 });

    if (action === "BOOK_SESSION") {
      // 1. Availability check logic would go here
      
      // 2. Fetch an active subscription
      const subscription = await prisma.subscription.findFirst({
        where: { studentId: student.id, status: "ACTIVE" }
      });
      if (!subscription) return NextResponse.json({ error: "Active plan required" }, { status: 403 });

      // 3. Create Session Record
      const newSession = await prisma.scheduledSession.create({
        data: {
          subscriptionId: subscription.id,
          teacherId,
          date: new Date(date),
          startTime,
          endTime: "Calculated...", // Simple string logic
          duration: parseInt(duration),
          status: SessionStatus.SCHEDULED,
        }
      });

      return NextResponse.json({ success: true, data: newSession });
    }
  } catch (error) {
    return NextResponse.json({ error: "Conflict Error" }, { status: 500 });
  }
}