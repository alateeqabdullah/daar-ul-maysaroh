import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session || session.user.role !== "TEACHER") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { action, data, gradeId } = body;

    // --- 1. CREATE SINGLE GRADE ---
    if (action === "CREATE") {
      if (!data.studentId || !data.subjectId || !data.score) return NextResponse.json({ error: "Missing fields" }, { status: 400 });

      const score = parseFloat(data.score);
      const total = parseFloat(data.totalScore) || 100;
      const pct = (score / total) * 100;
      
      let letter = "F";
      if (pct >= 90) letter = "A";
      else if (pct >= 80) letter = "B";
      else if (pct >= 70) letter = "C";
      else if (pct >= 60) letter = "D";

      const newGrade = await prisma.grade.create({
        data: {
          studentId: data.studentId,
          subjectId: data.subjectId,
          score,
          totalScore: total,
          percentage: pct,
          grade: letter,
          examType: data.examType,
          remarks: data.remarks,
          isPublished: true,
          assessedBy: session.user.id
        },
        include: {
          student: { include: { user: { select: { name: true, image: true } } } },
          subject: { include: { class: { select: { name: true } } } }
        }
      });

      const formatted = {
        ...newGrade,
        studentName: newGrade.student.user.name,
        studentImage: newGrade.student.user.image,
        className: newGrade.subject.class.name,
        subjectName: newGrade.subject.name,
        date: newGrade.assessmentDate.toISOString()
      };

      return NextResponse.json({ success: true, grade: formatted });
    }

    // --- 2. DELETE GRADE ---
    if (action === "DELETE") {
      await prisma.grade.delete({ where: { id: gradeId } });
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: "Invalid Action" }, { status: 400 });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}