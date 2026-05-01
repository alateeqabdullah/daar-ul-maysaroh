// src/app/api/admin/groups/route.ts
import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

// GET all groups
export async function GET(request: NextRequest) {
  try {
    const session = await auth();

    if (!session || !["SUPER_ADMIN", "ADMIN"].includes(session.user.role)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const groups = await prisma.studentGroup.findMany({
      include: {
        teacher: {
          include: {
            user: true,
          },
        },
        members: {
          include: {
            student: {
              include: {
                user: true,
              },
            },
          },
        },
        class: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ groups });
  } catch (error) {
    console.error("Error fetching groups:", error);
    return NextResponse.json(
      { error: "Failed to fetch groups" },
      { status: 500 }
    );
  }
}

// POST create new group
export async function POST(request: NextRequest) {
  try {
    const session = await auth()

    if (!session || !["SUPER_ADMIN", "ADMIN"].includes(session.user.role)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();

    const group = await prisma.studentGroup.create({
      data: {
        name: body.name,
        description: body.description,
        type: body.type,
        academicYear: body.academicYear,
        capacity: body.capacity,
        teacherId: body.teacherId || null,
        classId: body.classId || null,
        isActive: body.isActive,
        currentCount: 0,
      },
      include: {
        teacher: {
          include: {
            user: true,
          },
        },
        members: true,
        class: true,
      },
    });

    return NextResponse.json({ group });
  } catch (error) {
    console.error("Error creating group:", error);
    return NextResponse.json(
      { error: "Failed to create group" },
      { status: 500 }
    );
  }
}
