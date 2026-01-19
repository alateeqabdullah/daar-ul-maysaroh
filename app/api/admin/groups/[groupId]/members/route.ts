// src/app/api/admin/groups/[groupId]/members/route.ts
import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

// POST add member to group
export async function POST(
  request: NextRequest,
  { params }: { params: { groupId: string } }
) {
  try {
    const session = await auth()

    if (!session || !["SUPER_ADMIN", "ADMIN"].includes(session.user.role)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const groupId = params.groupId;
    const { studentId } = await request.json();

    // Check if group exists and has capacity
    const group = await prisma.studentGroup.findUnique({
      where: { id: groupId },
      include: { members: true },
    });

    if (!group) {
      return NextResponse.json({ error: "Group not found" }, { status: 404 });
    }

    if (group.members.length >= group.capacity) {
      return NextResponse.json(
        { error: "Group has reached maximum capacity" },
        { status: 400 }
      );
    }

    // Check if student is already in group
    const existingMember = group.members.find((m) => m.studentId === studentId);
    if (existingMember) {
      return NextResponse.json(
        { error: "Student is already a member of this group" },
        { status: 400 }
      );
    }

    const member = await prisma.groupMember.create({
      data: {
        groupId,
        studentId,
        role: "MEMBER",
        status: "ACTIVE",
      },
      include: {
        student: {
          include: {
            user: true,
          },
        },
      },
    });

    // Update group member count
    await prisma.studentGroup.update({
      where: { id: groupId },
      data: { currentCount: { increment: 1 } },
    });

    return NextResponse.json({ member });
  } catch (error) {
    console.error("Error adding member to group:", error);
    return NextResponse.json(
      { error: "Failed to add member to group" },
      { status: 500 }
    );
  }
}
