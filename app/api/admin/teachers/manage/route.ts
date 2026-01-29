import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { hash } from "bcryptjs"; // Ensure bcryptjs is installed

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session || !["ADMIN", "SUPER_ADMIN"].includes(session.user.role)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { action, data, teacherId, userId } = body;

    // --- 1. CREATE TEACHER (Creates User + Profile) ---
    if (action === "CREATE") {
      const existing = await prisma.user.findUnique({
        where: { email: data.email },
      });
      if (existing)
        return NextResponse.json(
          { error: "Email already exists" },
          { status: 400 }
        );

      const hashedPassword = await hash("Password123!", 10);
      const randomId = Math.floor(1000 + Math.random() * 9000);

      // Transactional Create
      const newUser = await prisma.user.create({
        data: {
          name: data.name,
          email: data.email,
          phone: data.phone,
          password: hashedPassword,
          role: "TEACHER",
          status: "APPROVED",
          teacherProfile: {
            create: {
              teacherId: `TCH-${randomId}`,
              specialization: data.specialization,
              qualification: data.qualification,
              experienceYears: parseInt(data.experienceYears) || 0,
              bio: data.bio,
              isAvailable: true,
            },
          },
        },
        include: { teacherProfile: true }, // Return profile to update UI
      });

      // Format to match client structure
      const formatted = {
        id: newUser.teacherProfile?.id,
        userId: newUser.id,
        name: newUser.name,
        email: newUser.email,
        phone: newUser.phone,
        image: newUser.image,
        specialization: data.specialization,
        isAvailable: true,
        totalClasses: 0,
        totalStudents: 0,
        classes: [],
        createdAt: new Date().toISOString(),
      };

      return NextResponse.json({ success: true, teacher: formatted });
    }

    // --- 2. UPDATE TEACHER ---
    if (action === "UPDATE") {
      // Update User Info
      await prisma.user.update({
        where: { id: userId },
        data: { name: data.name, email: data.email, phone: data.phone },
      });

      // Update Profile Info
      const updatedProfile = await prisma.teacher.update({
        where: { id: teacherId },
        data: {
          specialization: data.specialization,
          qualification: data.qualification,
          experienceYears: parseInt(data.experienceYears),
          bio: data.bio,
        },
      });

      return NextResponse.json({
        success: true,
        teacher: {
          ...updatedProfile,
          name: data.name,
          email: data.email,
          phone: data.phone,
        },
      });
    }

    // --- 3. TOGGLE AVAILABILITY ---
    if (action === "TOGGLE_STATUS") {
      await prisma.teacher.update({
        where: { id: teacherId },
        data: { isAvailable: data.isAvailable },
      });
      return NextResponse.json({ success: true });
    }

    // --- 4. DELETE TEACHER ---
    if (action === "DELETE") {
      // Deleting the USER cascades to the profile
      await prisma.user.delete({ where: { id: userId } });
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error: any) {
    console.error("Teacher API Error:", error);
    return NextResponse.json(
      { error: error.message || "Server Error" },
      { status: 500 }
    );
  }
}
