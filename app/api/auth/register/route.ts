// src/app/api/auth/register/route.ts


import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, password, role } = body;

    // Validation
    if (!name || !email || !phone || !password || !role) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "User with this email already exists" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user based on role
    const userData: any = {
      email,
      password: hashedPassword,
      name,
      phone,
      role,
      status: "PENDING", // All new users require approval
    };

    // Create user
    const user = await prisma.user.create({
      data: userData,
      include: {
        studentProfile: true,
        teacherProfile: true,
        parentProfile: true,
      },
    });

    // Create role-specific profile
    if (role === "STUDENT") {
      // Generate student ID
      const year = new Date().getFullYear();
      const count = await prisma.student.count();
      const studentId = `STD-${year}-${String(count + 1).padStart(4, "0")}`;

      await prisma.student.create({
        data: {
          userId: user.id,
          studentId,
          gender: "MALE", // Default, can be updated later
          enrollmentDate: new Date(),
        },
      });
    } else if (role === "TEACHER") {
      // Generate teacher ID
      const year = new Date().getFullYear();
      const count = await prisma.teacher.count();
      const teacherId = `TCH-${year}-${String(count + 1).padStart(4, "0")}`;

      await prisma.teacher.create({
        data: {
          userId: user.id,
          teacherId,
          joiningDate: new Date(),
          isAvailable: true,
        },
      });
    } else if (role === "PARENT") {
      await prisma.parent.create({
        data: {
          userId: user.id,
        },
      });
    }

    // TODO: Send email notification to admin about new registration
    // TODO: Send confirmation email to user

    return NextResponse.json(
      {
        message:
          "Registration successful! Your account is pending admin approval.",
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          status: user.status,
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
