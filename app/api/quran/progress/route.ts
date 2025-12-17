// src/app/api/quran/progress/route.ts
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const searchParams = request.nextUrl.searchParams;
    const studentId =
      searchParams.get("studentId") || session.user.studentProfile?.id;

    if (!studentId) {
      return NextResponse.json(
        { message: "Student ID required" },
        { status: 400 }
      );
    }

    const progress = await prisma.quranProgress.findMany({
      where: { studentId },
      orderBy: [{ juzNumber: "asc" }, { surahNumber: "asc" }],
    });

    return NextResponse.json({ progress });
  } catch (error) {
    console.error("Error fetching Quran progress:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    if (
      !["STUDENT", "TEACHER", "ADMIN", "SUPER_ADMIN"].includes(
        session.user.role
      )
    ) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const body = await request.json();

    const progress = await prisma.quranProgress.create({
      data: body,
    });

    return NextResponse.json(
      {
        message: "Progress recorded successfully",
        progress,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error recording Quran progress:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
