import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { classId } = await req.json();

    const student = await prisma.student.findUnique({
      where: { userId: session.user.id },
    });

    if (!student)
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });

    // Transaction: Create enrollment and increment class count
    const result = await prisma.$transaction([
      prisma.enrollment.create({
        data: {
          studentId: student.id,
          classId: classId,
          status: "ACTIVE",
        },
      }),
      prisma.class.update({
        where: { id: classId },
        data: { currentEnrollment: { increment: 1 } },
      }),
    ]);

    return NextResponse.json({ success: true, data: result[0] });
  } catch (error) {
    return NextResponse.json({ error: "Enrollment failed" }, { status: 500 });
  }
}
