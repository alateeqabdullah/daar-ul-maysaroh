import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session || !["ADMIN", "SUPER_ADMIN"].includes(session.user.role)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { action, data, groupId, studentId } = body;

    // Helper to calculate current academic year if not provided
    const currentYear = new Date().getFullYear();
    const defaultAcademicYear = `${currentYear}-${currentYear + 1}`;

    // --- 1. CREATE GROUP ---
    if (action === "CREATE") {
      if (!data.teacherId)
        return NextResponse.json(
          { error: "Teacher is required" },
          { status: 400 }
        );

      const newGroup = await prisma.studentGroup.create({
        data: {
          name: data.name,
          description: data.description,
          type: data.type,
          capacity: parseInt(data.capacity) || 20,
          teacherId: data.teacherId,
          // Handle optional class relation
          classId:
            data.classId && data.classId !== "none" ? data.classId : null,

          // FIX: Use isActive (Boolean) instead of status (String)
          isActive: true,

          academicYear: data.academicYear || defaultAcademicYear,
        },
        include: {
          teacher: { include: { user: true } },
          members: { include: { student: { include: { user: true } } } },
          class: true,
        },
      });
      return NextResponse.json({ success: true, group: newGroup });
    }

    // --- 2. UPDATE GROUP ---
    if (action === "UPDATE") {
      if (!groupId)
        return NextResponse.json(
          { error: "Group ID required" },
          { status: 400 }
        );

      const updatedGroup = await prisma.studentGroup.update({
        where: { id: groupId },
        data: {
          name: data.name,
          description: data.description,
          type: data.type,
          capacity: parseInt(data.capacity) || 20,
          teacherId: data.teacherId,
          classId:
            data.classId && data.classId !== "none" ? data.classId : null,
          academicYear: data.academicYear,
        },
        include: {
          teacher: { include: { user: true } },
          members: { include: { student: { include: { user: true } } } },
          class: true,
        },
      });
      return NextResponse.json({ success: true, group: updatedGroup });
    }

    // --- 3. DELETE GROUP ---
    if (action === "DELETE") {
      await prisma.studentGroup.delete({ where: { id: groupId } });
      return NextResponse.json({ success: true });
    }

    // --- 4. MEMBER ACTIONS ---
    if (action === "ADD_MEMBER" || action === "REMOVE_MEMBER") {
      if (action === "ADD_MEMBER") {
        const exists = await prisma.groupMember.findUnique({
          where: { groupId_studentId: { groupId, studentId } },
        });
        if (!exists) {
          // GroupMember uses 'status' enum (ACTIVE/INACTIVE), not Boolean
          await prisma.groupMember.create({
            data: { groupId, studentId, status: "ACTIVE" },
          });
        }
      } else {
        await prisma.groupMember.delete({
          where: { groupId_studentId: { groupId, studentId } },
        });
      }

      const refreshedGroup = await prisma.studentGroup.findUnique({
        where: { id: groupId },
        include: {
          teacher: { include: { user: true } },
          members: { include: { student: { include: { user: true } } } },
          class: true,
        },
      });
      return NextResponse.json({ success: true, group: refreshedGroup });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error: any) {
    // Log the specific Prisma error message to console
    console.error("Group API Error:", error.message || error);
    return NextResponse.json(
      { error: error.message || "Database Error" },
      { status: 500 }
    );
  }
}
