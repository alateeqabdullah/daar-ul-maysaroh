import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import TeacherGradesClient from "@/components/teacher/teacher-grades-client";
import {
  GradeData,
  ClassOption,
  GradeStats,
} from "@/types/(dashboard)/teacher/grades";

export const metadata = {
  title: "Grades & Results | Teacher",
  description: "Record and analyze student performance",
};

export default async function TeacherGradesPage() {
  const session = await auth();
  if (!session?.user?.email) redirect("/login");

  // 1. Get Teacher Profile
  const dbUser = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: {
      teacherProfile: {
        include: {
          classes: {
            where: { isActive: true },
            select: {
              id: true,
              name: true,
              subjects: { select: { id: true, name: true } },
              enrollments: {
                where: { status: "ACTIVE" },
                include: {
                  student: {
                    include: {
                      user: { select: { id: true, name: true, image: true } },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  });

  if (!dbUser?.teacherProfile) redirect("/dashboard");
  const teacherId = dbUser.teacherProfile.id;

  // 2. Fetch Grades
  const gradesRaw = await prisma.grade.findMany({
    where: {
      subject: { teacherId: teacherId },
    },
    include: {
      student: { include: { user: { select: { name: true, image: true } } } },
      subject: { include: { class: { select: { name: true } } } },
    },
    orderBy: { assessmentDate: "desc" },
    take: 100,
  });

  // 3. Serialize to Strict Type
  const grades: GradeData[] = gradesRaw.map((g) => ({
    id: g.id,
    studentId: g.studentId,
    studentName: g.student.user.name,
    studentImage: g.student.user.image,
    className: g.subject.class.name,
    subjectName: g.subject.name,
    subjectId: g.subjectId,
    examType: g.examType,
    score: g.score,
    totalScore: g.totalScore,
    percentage: g.percentage,
    grade: g.grade,
    remarks: g.remarks,
    date: g.assessmentDate.toISOString(),
  }));

  // 4. Calculate Stats
  const total = grades.length;
  const avg =
    total > 0
      ? Math.round(grades.reduce((a, b) => a + b.percentage, 0) / total)
      : 0;
  const topStudent = grades.reduce(
    (prev, current) => (prev.percentage > current.percentage ? prev : current),
    grades[0] || null,
  );

  const stats: GradeStats = {
    totalGrades: total,
    averageScore: avg,
    topStudentName: topStudent?.studentName || "N/A",
    failingCount: grades.filter((g) => g.grade === "F" || g.percentage < 50)
      .length,
  };

  // 5. Prepare Classes for Dropdown
  const myClasses: ClassOption[] = dbUser.teacherProfile.classes.map((c) => ({
    id: c.id,
    name: c.name,
    subjects: c.subjects.map((s) => ({ id: s.id, name: s.name })),
    students: c.enrollments.map((e) => ({
      id: e.student.id,
      name: e.student.user.name,
      image: e.student.user.image,
    })),
  }));

  return (
    <TeacherGradesClient
      initialGrades={grades}
      myClasses={myClasses}
      stats={stats}
    />
  );
}
