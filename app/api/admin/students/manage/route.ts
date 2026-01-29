import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { hash } from "bcryptjs";

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session || !["ADMIN", "SUPER_ADMIN"].includes(session.user.role)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { action, data, studentId, userId } = body;

    // --- 1. CREATE STUDENT ---
    if (action === "CREATE") {
      const existing = await prisma.user.findUnique({
        where: { email: data.email },
      });
      if (existing)
        return NextResponse.json({ error: "Email exists" }, { status: 400 });

      const hashedPassword = await hash("Password123!", 10);
      const uniqueId = `STD-${Math.floor(10000 + Math.random() * 90000)}`;

      const newUser = await prisma.user.create({
        data: {
          name: data.name,
          email: data.email,
          phone: data.phone,
          password: hashedPassword,
          role: "STUDENT",
          status: "APPROVED",
          studentProfile: {
            create: {
              studentId: uniqueId,
              gender: data.gender || "MALE",
              hifzLevel: data.hifzLevel,
              memorizationGoal: data.memorizationGoal,
              currentClassId: data.classId === "none" ? null : data.classId,
              parentId: data.parentId === "none" ? null : data.parentId,
              academicYear: new Date().getFullYear().toString(),
            },
          },
        },
        include: {
          studentProfile: {
            include: {
              currentClass: { select: { id: true, name: true, code: true } },
              parent: {
                include: {
                  user: { select: { name: true, phone: true, email: true } },
                },
              },
            },
          },
        },
      });

      // Flatten structure for client
      const formatted = {
        ...newUser.studentProfile,
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          image: newUser.image,
          phone: newUser.phone,
          status: newUser.status,
          createdAt: new Date().toISOString(), // for immediate UI update
        },
        joinedAt: newUser.createdAt.toISOString(),
      };

      return NextResponse.json({ success: true, student: formatted });
    }

    // --- 2. UPDATE STUDENT ---
    if (action === "UPDATE") {
      // Update User Base
      await prisma.user.update({
        where: { id: userId },
        data: { name: data.name, email: data.email, phone: data.phone },
      });

      // Update Student Profile
      const updatedProfile = await prisma.student.update({
        where: { id: studentId },
        data: {
          gender: data.gender,
          hifzLevel: data.hifzLevel,
          memorizationGoal: data.memorizationGoal,
          currentClassId: data.classId === "none" ? null : data.classId,
          parentId: data.parentId === "none" ? null : data.parentId,
        },
        include: {
          currentClass: { select: { id: true, name: true, code: true } },
          parent: {
            include: {
              user: { select: { name: true, phone: true, email: true } },
            },
          },
        },
      });

      return NextResponse.json({
        success: true,
        studentProfile: updatedProfile,
      });
    }

    // --- 3. DELETE STUDENT ---
    if (action === "DELETE") {
      await prisma.user.delete({ where: { id: userId } }); // Cascades
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error: any) {
    console.error("Student API Error:", error);
    return NextResponse.json(
      { error: error.message || "Server Error" },
      { status: 500 }
    );
  }
}
