// src/app/api/groups/route.ts
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
    const teacherId = searchParams.get("teacherId");
    const classId = searchParams.get("classId");

    const where: any = {};
    if (teacherId) where.teacherId = teacherId;
    if (classId) where.classId = classId;

    const groups = await prisma.studentGroup.findMany({
      where,
      include: {
        teacher: {
          include: {
            user: true,
          },
        },
        class: true,
        schedules: true,
        _count: {
          select: {
            members: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ groups });
  } catch (error) {
    console.error("Error fetching groups:", error);
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

    if (!["SUPER_ADMIN", "ADMIN", "TEACHER"].includes(session.user.role)) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const body = await request.json();
    const { name, type, description, capacity, teacherId, classId, schedules } =
      body;

    const group = await prisma.studentGroup.create({
      data: {
        name,
        type,
        description,
        capacity,
        teacherId,
        classId,
        schedules: {
          create: schedules,
        },
      },
      include: {
        teacher: {
          include: {
            user: true,
          },
        },
        class: true,
        schedules: true,
      },
    });

    return NextResponse.json(
      {
        message: "Group created successfully",
        group,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating group:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
