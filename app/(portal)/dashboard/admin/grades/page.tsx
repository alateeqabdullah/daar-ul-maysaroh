// app/(portal)/dashboard/admin/grades/page.tsx
import { Metadata } from "next";
import { GradesClient } from "./grades-client";
import {
  getGrades,
  getGradeStats,
  getExamTypes,
  getGradeRanges,
} from "../actions/grades";
import { getSubjects } from "../actions/subjects";
import { prisma } from "@/lib/prisma";
import { ExamType } from "@/app/generated/prisma/enums";

export const metadata: Metadata = {
  title: "Grade Management | Admin Dashboard | Al-Maysaroh",
  description: "Manage student grades, track performance, and generate reports",
};

interface PageProps {
  searchParams: Promise<{
    page?: string;
    search?: string;
    studentId?: string;
    subjectId?: string;
    classId?: string;
    examType?: string;
    minScore?: string;
    maxScore?: string;
  }>;
}

export default async function GradesPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const page = params.page ? parseInt(params.page) : 1;
  const search = params.search;
  const studentId = params.studentId;
  const subjectId = params.subjectId;
  const classId = params.classId;
  const examType = params.examType as ExamType | undefined;
  const minScore = params.minScore ? parseInt(params.minScore) : undefined;
  const maxScore = params.maxScore ? parseInt(params.maxScore) : undefined;

  let data;
  let errorOccurred = false;

  const defaultStats = {
    totalGrades: 0,
    publishedGrades: 0,
    averageScore: 0,
    passRate: 0,
    byExamType: {} as Record<string, number>,
    gradeDistribution: { A: 0, B: 0, C: 0, D: 0, F: 0 },
    topPerformers: [],
  };

  try {
    const [
      gradesData,
      stats,
      examTypes,
      gradeRanges,
      subjects,
      classes,
      students,
    ] = await Promise.all([
      getGrades({
        page,
        limit: 10,
        search,
        studentId,
        subjectId,
        classId,
        examType,
        minScore,
        maxScore,
      }),
      getGradeStats(),
      getExamTypes(),
      getGradeRanges(),
      getSubjects({ page: 1, limit: 100 }),
      prisma.class.findMany({
        where: { isActive: true },
        select: {
          id: true,
          name: true,
          code: true,
          level: true,
        },
        orderBy: { name: "asc" },
      }),
      prisma.student.findMany({
        take: 100,
        include: {
          user: {
            select: {
              name: true,
              email: true,
            },
          },
        },
        orderBy: { user: { name: "asc" } },
      }),
    ]);

    const formattedStudents = students.map((student) => ({
      id: student.id,
      name: student.user.name,
      email: student.user.email,
      studentId: student.studentId,
    }));

    data = {
      gradesData,
      stats,
      examTypes,
      gradeRanges,
      subjects,
      classes,
      formattedStudents,
    };
  } catch (error) {
    console.error("Error loading grades page:", error);
    errorOccurred = true;
  }

  return (
    <GradesClient
      initialGrades={data?.gradesData?.data || []}
      initialStats={data?.stats || defaultStats}
      initialPage={page}
      initialSearch={search || ""}
      initialStudentId={studentId || ""}
      initialSubjectId={subjectId || ""}
      initialClassId={classId || ""}
      initialExamType={examType || ""}
      initialMinScore={minScore}
      initialMaxScore={maxScore}
      totalPages={data?.gradesData?.totalPages || 1}
      totalGrades={data?.gradesData?.total || 0}
      examTypes={
        data?.examTypes || [
          "MIDTERM",
          "FINAL",
          "QUIZ",
          "ASSIGNMENT",
          "RECITATION_TEST",
          "MEMORIZATION_TEST",
          "ORAL_EXAM",
          "WRITTEN_EXAM",
        ]
      }
      gradeRanges={data?.gradeRanges || []}
      subjects={data?.subjects?.data || []}
      classes={data?.classes || []}
      students={data?.formattedStudents || []}
    />
  );
}