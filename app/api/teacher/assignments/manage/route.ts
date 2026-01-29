import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const session = await auth();
    // 1. Auth Check
    if (!session || !session.user?.email || session.user.role !== "TEACHER") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { action, data, assignmentId } = body;

    // 2. Get User & Teacher Profile
    // We use include to ensure TypeScript knows teacherProfile exists
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { teacherProfile: true } 
    });

    // Explicit Null Checks to satisfy TypeScript
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (!user.teacherProfile) {
      return NextResponse.json({ error: "Teacher profile not found" }, { status: 404 });
    }

    // =========================================================
    // ACTION: CREATE ASSIGNMENT
    // =========================================================
    if (action === "CREATE") {
      if (!data.title || !data.classId || !data.dueDate) {
        return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
      }

      let subjectId = data.subjectId;
      
      // Auto-resolve Subject Logic
      if (!subjectId) {
        const defaultSub = await prisma.subject.findFirst({ where: { classId: data.classId } });
        if (defaultSub) {
           subjectId = defaultSub.id;
        } else {
           // Fallback: Create generic subject
           const newSub = await prisma.subject.create({
             data: { 
               name: "General", 
               code: `GEN-${Date.now().toString().slice(-4)}`, 
               category: "OTHER",
               classId: data.classId,
               teacherId: user.teacherProfile.id
             }
           });
           subjectId = newSub.id;
        }
      }

      const newAssignment = await prisma.assignment.create({
        data: {
          title: data.title,
          description: data.description,
          totalMarks: parseFloat(data.totalMarks) || 100,
          type: data.type || "HOMEWORK",
          dueDate: new Date(data.dueDate),
          subjectId: subjectId,
          createdById: user.id,
        },
        include: {
          subject: { select: { name: true, class: { select: { id: true, name: true, code: true } } } },
          _count: { select: { submissions: true } }
        }
      });

      // Format for Client (Fixing null types)
      const formatted = {
        ...newAssignment,
        dueDate: newAssignment.dueDate.toISOString(),
        createdAt: newAssignment.createdAt.toISOString(),
        subjectName: newAssignment.subject.name,
        className: newAssignment.subject.class.name,
        classCode: newAssignment.subject.class.code,
        submissionCount: 0,
        status: "ACTIVE"
      };

      return NextResponse.json({ success: true, assignment: formatted });
    }

    // =========================================================
    // ACTION: UPDATE ASSIGNMENT
    // =========================================================
    if (action === "UPDATE") {
      if (!assignmentId) return NextResponse.json({ error: "ID missing" }, { status: 400 });

      const updated = await prisma.assignment.update({
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
          subject: { select: { name: true, class: { select: { id: true, name: true, code: true } } } },
          _count: { select: { submissions: true } }
        }
      });

      const formatted = {
        ...updated,
        dueDate: updated.dueDate.toISOString(),
        createdAt: updated.createdAt.toISOString(),
        subjectName: updated.subject.name,
        className: updated.subject.class.name,
        classCode: updated.subject.class.code,
        submissionCount: updated._count.submissions,
        status: new Date(updated.dueDate) < new Date() ? "OVERDUE" : "ACTIVE"
      };

      return NextResponse.json({ success: true, assignment: formatted });
    }

    // =========================================================
    // ACTION: DELETE ASSIGNMENT
    // =========================================================
    if (action === "DELETE") {
      await prisma.assignment.delete({ where: { id: assignmentId } });
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: "Invalid Action" }, { status: 400 });

  } catch (error: any) {
    console.error("Assignment API Error:", error);
    return NextResponse.json({ error: error.message || "Server Error" }, { status: 500 });
  }
}