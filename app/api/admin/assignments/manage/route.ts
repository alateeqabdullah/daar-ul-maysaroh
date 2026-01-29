import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session || !["ADMIN", "SUPER_ADMIN"].includes(session.user.role)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const currentUser = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true },
    });

    if (!currentUser)
      return NextResponse.json({ error: "User not found" }, { status: 404 });

    const body = await req.json();
    const { action, data, assignmentId } = body;

    // --- 1. CREATE ASSIGNMENT ---
    if (action === "CREATE") {
      if (!data.title || !data.subjectId || !data.dueDate) {
        return NextResponse.json(
          { error: "Missing required fields" },
          { status: 400 }
        );
      }

      const newAssignment = await prisma.assignment.create({
        data: {
          title: data.title,
          description: data.description,
          subjectId: data.subjectId,
          type: data.type || "HOMEWORK",
          totalMarks: parseFloat(data.totalMarks) || 100,
          dueDate: new Date(data.dueDate),
          createdById: currentUser.id,
        },
        include: {
          subject: {
            select: {
              id: true,
              name: true,
              class: { select: { id: true, name: true } },
              teacher: {
                include: { user: { select: { name: true, image: true } } },
              },
            },
          },
          _count: { select: { submissions: true } },
        },
      });

      const formatted = {
        ...newAssignment,
        dueDate: newAssignment.dueDate.toISOString(),
        createdAt: newAssignment.createdAt.toISOString(),
        submissionCount: 0,
      };

      return NextResponse.json({ success: true, assignment: formatted });
    }

    // --- 2. UPDATE ASSIGNMENT ---
    if (action === "UPDATE") {
      const updatedAssignment = await prisma.assignment.update({
        where: { id: assignmentId },
        data: {
          title: data.title,
          description: data.description,
          subjectId: data.subjectId,
          type: data.type,
          totalMarks: parseFloat(data.totalMarks),
          dueDate: new Date(data.dueDate),
        },
        include: {
          subject: {
            select: {
              id: true,
              name: true,
              class: { select: { id: true, name: true } },
              teacher: {
                include: { user: { select: { name: true, image: true } } },
              },
            },
          },
          _count: { select: { submissions: true } },
        },
      });

      const formatted = {
        ...updatedAssignment,
        dueDate: updatedAssignment.dueDate.toISOString(),
        createdAt: updatedAssignment.createdAt.toISOString(),
        submissionCount: updatedAssignment._count.submissions,
      };

      return NextResponse.json({ success: true, assignment: formatted });
    }

    // --- 3. DELETE ASSIGNMENT ---
    if (action === "DELETE") {
      await prisma.assignment.delete({ where: { id: assignmentId } });
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error: unknown) {
    console.error("Assignment API Error:", error);
    return NextResponse.json(
      { error: error.message || "Server Error" },
      { status: 500 }
    );
  }
}
