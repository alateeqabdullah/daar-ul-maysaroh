import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await auth();
  if (!session?.user?.email)
    return new NextResponse("Unauthorized", { status: 401 });

  try {
    const student = await prisma.student.findFirst({
      where: { user: { email: session.user.email } },
      select: { id: true },
    });

    if (!student) return new NextResponse("Not Found", { status: 404 });

    // Fetch live data for quick client refreshes
    const [quran, sessions] = await Promise.all([
      prisma.quranProgress.aggregate({
        where: { studentId: student.id, status: "COMPLETED" },
        _sum: { totalAyahs: true },
      }),
      prisma.scheduledSession.findMany({
        where: {
          subscription: { studentId: student.id },
          date: { gte: new Date() },
        },
        take: 5,
        orderBy: { date: "asc" },
      }),
    ]);

    return NextResponse.json({
      ayahs: quran._sum.totalAyahs || 0,
      sessions: sessions,
    });
  } catch (e) {
    return new NextResponse("Error", { status: 500 });
  }
}
