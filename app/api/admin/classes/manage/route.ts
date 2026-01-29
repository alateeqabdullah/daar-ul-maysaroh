import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const session = await auth();
    // 1. Check Auth & Role
    if (
      !session?.user?.email ||
      !["ADMIN", "SUPER_ADMIN"].includes(session.user.role)
    ) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2. Get Current User ID (Required for createdById)
    const currentUser = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true },
    });

    if (!currentUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const body = await req.json();
    const { action, data, classId } = body;

    // --- HELPER: Safe Date Parsing ---
    const parseDate = (dateStr: string | undefined) => {
      if (!dateStr || dateStr.trim() === "") return null;
      return new Date(dateStr);
    };

    const currentYear = new Date().getFullYear();
    const defaultAcademicYear = `${currentYear}-${currentYear + 1}`;

    // --- 1. CREATE CLASS ---
    if (action === "CREATE") {
      // Validation
      if (!data.name || !data.code || !data.teacherId) {
        return NextResponse.json(
          { error: "Name, Code, and Teacher are required." },
          { status: 400 }
        );
      }

      // Unique Code Check
      const existing = await prisma.class.findUnique({
        where: { code: data.code },
      });
      if (existing) {
        return NextResponse.json(
          { error: "Class Code already exists." },
          { status: 400 }
        );
      }

      const newClass = await prisma.class.create({
        data: {
          name: data.name,
          code: data.code,
          description: data.description || null,
          level: data.level,
          capacity: parseInt(data.capacity) || 20,
          teacherId: data.teacherId, // Connect via ID (Unchecked Input)
          createdById: currentUser.id, // <--- FIXED: Added required creator ID
          academicYear: defaultAcademicYear,
          startDate: parseDate(data.startDate),
          endDate: parseDate(data.endDate),
          isActive: true,
        },
        include: {
          teacher: {
            include: { user: { select: { name: true, image: true } } },
          },
          _count: { select: { enrollments: true } },
          schedules: true,
        },
      });

      // Format for UI
      const formatted = { ...newClass, currentEnrollment: 0 };
      return NextResponse.json({ success: true, class: formatted });
    }

    // --- 2. UPDATE CLASS ---
    if (action === "UPDATE") {
      if (!classId)
        return NextResponse.json({ error: "ID required" }, { status: 400 });

      const updatedClass = await prisma.class.update({
        where: { id: classId },
        data: {
          name: data.name,
          description: data.description || null,
          level: data.level,
          capacity: parseInt(data.capacity) || 20,
          teacherId: data.teacherId,
          startDate: parseDate(data.startDate),
          endDate: parseDate(data.endDate),
        },
        include: {
          teacher: {
            include: { user: { select: { name: true, image: true } } },
          },
          _count: { select: { enrollments: true } },
          schedules: true,
        },
      });

      const formatted = {
        ...updatedClass,
        currentEnrollment: updatedClass._count.enrollments,
      };
      return NextResponse.json({ success: true, class: formatted });
    }

    // --- 3. TOGGLE STATUS ---
    if (action === "TOGGLE_STATUS") {
      const updatedClass = await prisma.class.update({
        where: { id: classId },
        data: { isActive: data.isActive },
      });
      return NextResponse.json({ success: true, class: updatedClass });
    }

    // --- 4. DELETE ---
    if (action === "DELETE") {
      // Optional: Check enrollments before delete
      // const hasStudents = await prisma.enrollment.count({ where: { classId } });
      // if (hasStudents > 0) return NextResponse.json({ error: "Cannot delete class with students" }, { status: 400 });

      await prisma.class.delete({ where: { id: classId } });
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error: any) {
    console.error("Class API Error:", error);
    // Return specific Prisma errors for easier debugging
    if (error.code === "P2002") {
      return NextResponse.json(
        { error: "Class Code already exists" },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: error.message || "Server Error" },
      { status: 500 }
    );
  }
}
