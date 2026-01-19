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
    const { action, data, parentId, userId } = body;

    // --- 1. CREATE PARENT ---
    if (action === "CREATE") {
      const existing = await prisma.user.findUnique({
        where: { email: data.email },
      });
      if (existing)
        return NextResponse.json({ error: "Email exists" }, { status: 400 });

      const hashedPassword = await hash("Password123!", 10);

      const newUser = await prisma.user.create({
        data: {
          name: data.name,
          email: data.email,
          phone: data.phone,
          password: hashedPassword,
          role: "PARENT",
          status: "APPROVED",
          parentProfile: {
            create: {
              occupation: data.occupation,
              address: data.address,
            },
          },
        },
        include: {
          parentProfile: {
            include: {
              students: { include: { user: true, currentClass: true } },
              _count: { select: { students: true } },
            },
          },
        },
      });

      // Format for client
      const formatted = {
        ...newUser.parentProfile,
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          image: newUser.image,
          phone: newUser.phone,
          status: newUser.status,
          createdAt: new Date().toISOString(),
        },
        joinedAt: newUser.createdAt.toISOString(),
        studentsCount: 0,
        students: [],
      };

      return NextResponse.json({ success: true, parent: formatted });
    }

    // --- 2. UPDATE PARENT ---
    if (action === "UPDATE") {
      // Update User
      await prisma.user.update({
        where: { id: userId },
        data: { name: data.name, email: data.email, phone: data.phone },
      });

      // Update Profile
      const updatedProfile = await prisma.parent.update({
        where: { id: parentId },
        data: {
          occupation: data.occupation,
          address: data.address,
        },
        include: {
          students: { include: { user: true, currentClass: true } },
          _count: { select: { students: true } },
        },
      });

      return NextResponse.json({
        success: true,
        parentProfile: updatedProfile,
      });
    }

    // --- 3. DELETE PARENT ---
    if (action === "DELETE") {
      await prisma.user.delete({ where: { id: userId } });
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error: any) {
    console.error("Parent API Error:", error);
    return NextResponse.json(
      { error: error.message || "Server Error" },
      { status: 500 }
    );
  }
}
