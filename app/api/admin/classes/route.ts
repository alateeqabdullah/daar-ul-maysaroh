// src/app/api/admin/classes/route.ts
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    // 1. Authorization Check [cite: 247, 248]
    if (!session || !["SUPER_ADMIN", "ADMIN"].includes(session.user.role)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const {
      name,
      code,
      description,
      level,
      teacherId,
      capacity,
      academicYear,
      isActive,
    } = body;

    // 2. Basic Validation [cite: 275, 276]
    if (!name || !code || !teacherId || !academicYear) {
      return NextResponse.json(
        {
          error:
            "Missing required fields: name, code, teacherId, and academicYear are mandatory.",
        },
        { status: 400 }
      );
    }

    // 3. Unique Code Check [cite: 276]
    const existingClass = await prisma.class.findUnique({
      where: { code },
    });

    if (existingClass) {
      return NextResponse.json(
        { error: "A class with this unique code already exists." },
        { status: 400 }
      );
    }

    // 4. Create Class with Schema Relations [cite: 275, 278, 279]
    const newClass = await prisma.class.create({
      data: {
        name,
        code,
        description,
        level,
        academicYear,
        capacity: parseInt(capacity) || 20,
        isActive: isActive !== undefined ? isActive : true,
        // Link to the Teacher Profile
        teacher: {
          connect: { id: teacherId },
        },
        // Track which Admin created this class
        createdBy: {
          connect: { id: session.user.id },
        },
      },
      include: {
        teacher: {
          include: {
            user: {
              select: { name: true, email: true },
            },
          },
        },
        _count: {
          select: { enrollments: true },
        },
      },
    });

    return NextResponse.json(
      { message: "Class created successfully", class: newClass },
      { status: 201 }
    );
  } catch (error) {
    console.error("[CLASSES_POST_ERROR]:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

/**
 * GET handler to support the ClassManagementClient data refreshing
 */
export async function GET() {
  try {
    const session = await auth();

    if (!session || !["SUPER_ADMIN", "ADMIN"].includes(session.user.role)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const classes = await prisma.class.findMany({
      include: {
        teacher: {
          include: { user: true },
        },
        enrollments: {
          include: { student: { include: { user: true } } },
        },
        subjects: true,
        schedules: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(classes);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
