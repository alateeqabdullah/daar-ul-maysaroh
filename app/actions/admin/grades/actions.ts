"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { ExamType } from "@/app/generated/prisma/enums";



export async function manageGradeNode(data: any) {
  const session = await auth();
  if (!session || !["ADMIN", "TEACHER", "SUPER_ADMIN"].includes(session.user.role)) throw new Error("Unauthorized");

  const score = parseFloat(data.score);
  const total = parseFloat(data.totalScore) || 100;
  const percentage = (score / total) * 100;

  let letterGrade = "F";
  if (percentage >= 95) letterGrade = "A+";
  else if (percentage >= 85) letterGrade = "A";
  else if (percentage >= 75) letterGrade = "B";
  else if (percentage >= 65) letterGrade = "C";
  else if (percentage >= 50) letterGrade = "D";

  try {
    const payload = {
      score,
      totalScore: total,
      percentage,
      grade: letterGrade,
      remarks: data.remarks || "",
      isPublished: data.isPublished === "true" || data.isPublished === true,
    };

    let result;

    if (data.id && data.id !== "new-node") {
      result = await prisma.grade.update({ 
        where: { id: data.id }, 
        data: payload,
        include: { student: { include: { user: true } } } // Include for instant UI update
      });
    } else {
      result = await prisma.grade.create({
        data: {
          ...payload,
          studentId: data.studentId,
          subjectId: data.subjectId,
          examType: data.examType as ExamType,
          assessedBy: session.user.name || "Admin",
        },
        include: { student: { include: { user: true } } }
      });
    }

    revalidatePath("/admin/grades");
    // Handshake: Return the clean object
    return { success: true, grade: JSON.parse(JSON.stringify(result)) };
  } catch (error: any) { throw new Error(`Handshake Failed: ${error.message}`); }
}


export async function bulkUpdateRemarks(
  subjectId: string,
  examType: string,
  remark: string,
) {
  await prisma.grade.updateMany({
    where: { subjectId, examType: examType as ExamType, isPublished: false },
    data: { remarks: remark },
  });
  revalidatePath("/admin/grades");
  return { success: true };
}

export async function applyGraceMarks(
  subjectId: string,
  examType: string,
  bonus: number,
) {
  const grades = await prisma.grade.findMany({
    where: { subjectId, examType: examType as ExamType },
  });
  const updates = grades.map((g) => {
    const newScore = Math.min(Number(g.totalScore), Number(g.score) + bonus);
    return prisma.grade.update({
      where: { id: g.id },
      data: {
        score: newScore,
        percentage: (newScore / Number(g.totalScore)) * 100,
      },
    });
  });
  await prisma.$transaction(updates);
  revalidatePath("/admin/grades");
  return { success: true };
}

export async function publishGradesBulk(subjectId: string, examType: string) {
  await prisma.grade.updateMany({
    where: { subjectId, examType: examType as ExamType },
    data: { isPublished: true, publishedAt: new Date() },
  });
  revalidatePath("/admin/grades");
  return { success: true };
}

export async function resetTermNodes(subjectId: string, examType: string) {
  const session = await auth();
  if (session?.user.role !== "SUPER_ADMIN")
    throw new Error("Super Admin required");
  await prisma.grade.deleteMany({
    where: { subjectId, examType: examType as ExamType, isPublished: false },
  });
  revalidatePath("/admin/grades");
  return { success: true };
}

export async function nudgeGradeToParent(gradeId: string) {
  const grade = await prisma.grade.findUnique({
    where: { id: gradeId },
    include: {
      student: { include: { user: true, parent: { include: { user: true } } } },
      subject: true,
    },
  });
  if (!grade?.student.parent) throw new Error("No linked guardian node");
  await prisma.notification.create({
    data: {
      userId: grade.student.parent.userId,
      title: "Result Synchronized",
      message: `${grade.student.user.name}'s assessment in ${grade.subject.name} is available.`,
      type: "GRADE",
      priority: "NORMAL",
    },
  });
  return { success: true };
}

export async function deleteGradeNode(id: string) {
  await prisma.grade.delete({ where: { id } });
  revalidatePath("/admin/grades");
  return { success: true };
}
