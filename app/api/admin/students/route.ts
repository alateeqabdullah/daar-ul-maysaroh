// src/app/api/admin/students/route.ts
import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { auth } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    const session = await auth();

    if (!session || !["SUPER_ADMIN", "ADMIN"].includes(session.user.role)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const search = searchParams.get("search");
    const classId = searchParams.get("class");
    const status = searchParams.get("status");

    const skip = (page - 1) * limit;

    const where: any = {
      user: {
        status: "APPROVED",
      },
    };

    if (search) {
      where.OR = [
        { user: { name: { contains: search, mode: "insensitive" } } },
        { user: { email: { contains: search, mode: "insensitive" } } },
        { studentId: { contains: search, mode: "insensitive" } },
      ];
    }

    if (classId && classId !== "all") {
      where.currentClassId = classId;
    }

    if (status && status !== "all") {
      if (status === "active") {
        where.user.isActive = true;
      } else if (status === "inactive") {
        where.user.isActive = false;
      }
    }

    const [students, total] = await Promise.all([
      prisma.student.findMany({
        where,
        include: {
          user: true,
          currentClass: {
            include: {
              teacher: {
                include: {
                  user: true,
                },
              },
            },
          },
          parent: {
            include: {
              user: true,
            },
          },
          enrollments: {
            include: {
              class: true,
            },
          },
        },
        orderBy: { user: { createdAt: "desc" } },
        skip,
        take: limit,
      }),
      prisma.student.count({ where }),
    ]);

    return NextResponse.json({
      students,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching students:", error);
    return NextResponse.json(
      { error: "Failed to fetch students" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth()

    if (!session || !["SUPER_ADMIN", "ADMIN"].includes(session.user.role)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();

    // Hash password
    const hashedPassword = await bcrypt.hash(body.password, 12);

    // Generate student ID
    const studentId = `STD-${Date.now().toString().slice(-6)}`;

    // Create user and student
    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: hashedPassword,
        name: body.name,
        phone: body.phone,
        role: "STUDENT",
        status: "APPROVED",
        approvedAt: new Date(),
        approvedById: session.user.id,
        studentProfile: {
          create: {
            studentId,
            dateOfBirth: body.dateOfBirth ? new Date(body.dateOfBirth) : null,
            gender: body.gender,
            hifzLevel: body.hifzLevel,
            memorizationGoal: body.memorizationGoal,
            currentClassId: body.classId || null,
            enrollmentDate: new Date(),
          },
        },
      },
      include: {
        studentProfile: {
          include: {
            currentClass: true,
          },
        },
      },
    });

    return NextResponse.json({
      message: "Student created successfully",
      student: user.studentProfile,
    });
  } catch (error: any) {
    console.error("Error creating student:", error);

    if (error.code === "P2002") {
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: "Failed to create student" },
      { status: 500 }
    );
  }
}
