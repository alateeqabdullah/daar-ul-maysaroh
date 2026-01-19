import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { hash } from "bcryptjs"; // You might need to install bcryptjs

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session || !["ADMIN", "SUPER_ADMIN"].includes(session.user.role)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { userId, action, data } = body;

    // --- CASE 1: CREATE USER ---
    if (action === "CREATE") {
      const existingUser = await prisma.user.findUnique({
        where: { email: data.email },
      });
      if (existingUser) {
        return NextResponse.json(
          { error: "Email already exists" },
          { status: 400 }
        );
      }

      // Default password: Password123!
      const hashedPassword = await hash("Password123!", 10);

      const newUser = await prisma.user.create({
        data: {
          name: data.name,
          email: data.email,
          role: data.role,
          status: "APPROVED",
          password: hashedPassword,
          // Create empty profile based on role to avoid errors later
          ...(data.role === "STUDENT" && {
            studentProfile: { create: { gender: "MALE" } },
          }),
          ...(data.role === "TEACHER" && { teacherProfile: { create: {} } }),
          ...(data.role === "PARENT" && { parentProfile: { create: {} } }),
        },
      });
      return NextResponse.json({ success: true, user: newUser });
    }

    // --- CASE 2: UPDATE USER ---
    if (action === "UPDATE") {
      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: {
          name: data.name,
          email: data.email,
          role: data.role,
          phone: data.phone,
        },
      });
      return NextResponse.json({ success: true, user: updatedUser });
    }

    // --- CASE 3: UPDATE STATUS ---
    if (action === "UPDATE_STATUS") {
      const user = await prisma.user.update({
        where: { id: userId },
        data: { status: data.status },
      });
      return NextResponse.json({ success: true, user });
    }

    // --- CASE 4: DELETE USER ---
    if (action === "DELETE") {
      await prisma.user.delete({ where: { id: userId } });
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error) {
    console.error("Manage User API Error:", error);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}
