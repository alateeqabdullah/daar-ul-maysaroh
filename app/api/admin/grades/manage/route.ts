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
    const { action, data, gradeId } = body;

    // --- 1. CREATE GRADE ---
    if (action === "CREATE") {
      if (!data.studentId || !data.subjectId || !data.score) {
        return NextResponse.json({ error: "Missing fields" }, { status: 400 });
      }

      const newGrade = await prisma.grade.create({
        data: {
          studentId: data.studentId,
          subjectId: data.subjectId,
          score: parseFloat(data.score),
          totalScore: parseFloat(data.totalScore) || 100,
          percentage:
            (parseFloat(data.score) / (parseFloat(data.totalScore) || 100)) *
            100,
          examType: data.examType || "MIDTERM",
          remarks: data.remarks,
          isPublished: true, // Auto publish for admin
          assessedBy: session.user.id,
        },
        include: {
          student: {
            include: { user: { select: { name: true, image: true } } },
          },
          subject: {
            include: { class: { select: { name: true, code: true } } },
          },
        },
      });

      // Format for UI
      const formatted = {
        ...newGrade,
        assessmentDate: newGrade.assessmentDate.toISOString(),
        createdAt: newGrade.createdAt.toISOString(),
        studentName: newGrade.student.user.name,
        studentImage: newGrade.student.user.image,
        subjectName: newGrade.subject.name,
        className: newGrade.subject.class.name,
      };

      return NextResponse.json({ success: true, grade: formatted });
    }

    // --- 2. UPDATE GRADE ---
    if (action === "UPDATE") {
      const updatedGrade = await prisma.grade.update({
        where: { id: gradeId },
        data: {
          score: parseFloat(data.score),
          totalScore: parseFloat(data.totalScore),
          percentage:
            (parseFloat(data.score) / parseFloat(data.totalScore)) * 100,
          remarks: data.remarks,
          examType: data.examType,
        },
        include: {
          student: {
            include: { user: { select: { name: true, image: true } } },
          },
          subject: {
            include: { class: { select: { name: true, code: true } } },
          },
        },
      });

      // Re-format
      const formatted = {
        ...updatedGrade,
        assessmentDate: updatedGrade.assessmentDate.toISOString(),
        createdAt: updatedGrade.createdAt.toISOString(),
        studentName: updatedGrade.student.user.name,
        studentImage: updatedGrade.student.user.image,
        subjectName: updatedGrade.subject.name,
        className: updatedGrade.subject.class.name,
      };

      return NextResponse.json({ success: true, grade: formatted });
    }

    // --- 3. DELETE GRADE ---
    if (action === "DELETE") {
      await prisma.grade.delete({ where: { id: gradeId } });
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error: any) {
    console.error("Grades API Error:", error);
    return NextResponse.json(
      { error: error.message || "Server Error" },
      { status: 500 }
    );
  }
}
