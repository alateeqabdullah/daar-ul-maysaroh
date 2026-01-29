import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { hash } from "bcryptjs";

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session || session.user.role !== "TEACHER") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { action, data } = body;

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { teacherProfile: true }
    });

    if (!user || !user.teacherProfile) return NextResponse.json({ error: "Not found" }, { status: 404 });

    // --- UPDATE PROFILE ---
    if (action === "UPDATE_PROFILE") {
      // Update User Table
      await prisma.user.update({
        where: { id: user.id },
        data: {
          name: data.name,
          phone: data.phone,
        }
      });

      // Update Teacher Table
      await prisma.teacher.update({
        where: { id: user.teacherProfile.id },
        data: {
          bio: data.bio,
          qualification: data.qualification,
          specialization: data.specialization,
          experienceYears: parseInt(data.experienceYears),
        }
      });

      return NextResponse.json({ success: true });
    }

    // --- CHANGE PASSWORD ---
    if (action === "CHANGE_PASSWORD") {
      const hashedPassword = await hash(data.newPassword, 10);
      await prisma.user.update({
        where: { id: user.id },
        data: { password: hashedPassword }
      });
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: "Invalid Action" }, { status: 400 });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}