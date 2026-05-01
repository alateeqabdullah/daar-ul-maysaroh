// app/(portal)/dashboard/admin/actions/grades.ts
"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { Prisma } from "@/app/generated/prisma/client";
import { ExamType } from "@/app/generated/prisma/enums";

// ==================== TYPES ====================

export interface GradeFilters {
  search?: string;
  studentId?: string;
  subjectId?: string;
  classId?: string;
  examType?: ExamType;
  minScore?: number;
  maxScore?: number;
  page?: number;
  limit?: number;
}

export interface GradeWithRelations {
  id: string;
  studentId: string;
  subjectId: string;
  examType: ExamType;
  score: number;
  totalScore: number;
  percentage: number;
  grade: string | null;
  gradePoint: number | null;
  assessmentDate: Date;
  assessedBy: string;
  remarks: string | null;
  isPublished: boolean;
  publishedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
  student: {
    id: string;
    studentId: string;
    user: {
      id: string;
      name: string;
      email: string;
      image: string | null;
    };
  };
  subject: {
    id: string;
    name: string;
    code: string;
    category: string;
    class: {
      id: string;
      name: string;
      code: string;
      level: string;
    };
    teacher: {
      id: string;
      user: {
        name: string;
        email: string;
      };
    };
  };
  assessedByUser?: {
    id: string;
    name: string;
    email: string;
  };
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  totalPages: number;
  limit: number;
}

export interface GradeStats {
  totalGrades: number;
  publishedGrades: number;
  averageScore: number;
  passRate: number;
  byExamType: Record<ExamType, number>;
  gradeDistribution: {
    A: number;
    B: number;
    C: number;
    D: number;
    F: number;
  };
  topPerformers: {
    studentId: string;
    studentName: string;
    averageScore: number;
  }[];
}

export interface StudentGradeSummary {
  studentId: string;
  studentName: string;
  studentEmail: string;
  overallAverage: number;
  subjects: {
    subjectId: string;
    subjectName: string;
    subjectCode: string;
    averageScore: number;
    grades: {
      id: string;
      examType: ExamType;
      score: number;
      totalScore: number;
      percentage: number;
      grade: string | null;
      assessmentDate: Date;
    }[];
  }[];
}

// ==================== READ OPERATIONS ====================

/**
 * Get paginated list of grades with filters
 */
export async function getGrades(
  filters: GradeFilters = {},
): Promise<PaginatedResponse<GradeWithRelations>> {
  const {
    search,
    studentId,
    subjectId,
    classId,
    examType,
    minScore,
    maxScore,
    page = 1,
    limit = 20,
  } = filters;

  const skip = (page - 1) * limit;

  // Build where clause
  const where: Prisma.GradeWhereInput = {};

  if (studentId) {
    where.studentId = studentId;
  }

  if (subjectId) {
    where.subjectId = subjectId;
  }

  if (classId) {
    where.subject = { classId };
  }

  if (examType) {
    where.examType = examType;
  }

  if (minScore !== undefined) {
    where.score = { gte: minScore };
  }

  if (maxScore !== undefined) {
    where.score = { ...(where.score as object), lte: maxScore };
  }

  if (search) {
    where.OR = [
      {
        student: { user: { name: { contains: search, mode: "insensitive" } } },
      },
      { student: { studentId: { contains: search, mode: "insensitive" } } },
      { subject: { name: { contains: search, mode: "insensitive" } } },
    ];
  }

  try {
    const [grades, total] = await Promise.all([
      prisma.grade.findMany({
        where,
        skip,
        take: limit,
        orderBy: [{ assessmentDate: "desc" }, { createdAt: "desc" }],
        include: {
          student: {
            include: {
              user: {
                select: {
                  id: true,
                  name: true,
                  email: true,
                  image: true,
                },
              },
            },
          },
          subject: {
            include: {
              class: {
                select: {
                  id: true,
                  name: true,
                  code: true,
                  level: true,
                },
              },
              teacher: {
                include: {
                  user: {
                    select: {
                      name: true,
                      email: true,
                    },
                  },
                },
              },
            },
          },
        },
      }),
      prisma.grade.count({ where }),
    ]);

    return {
      data: grades as GradeWithRelations[],
      total,
      page,
      totalPages: Math.ceil(total / limit),
      limit,
    };
  } catch (error) {
    console.error("Error fetching grades:", error);
    throw new Error("Failed to fetch grades");
  }
}

/**
 * Get grade by ID
 */
export async function getGradeById(
  id: string,
): Promise<GradeWithRelations | null> {
  try {
    const grade = await prisma.grade.findUnique({
      where: { id },
      include: {
        student: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                image: true,
              },
            },
          },
        },
        subject: {
          include: {
            class: {
              select: {
                id: true,
                name: true,
                code: true,
                level: true,
              },
            },
            teacher: {
              include: {
                user: {
                  select: {
                    name: true,
                    email: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    return grade as GradeWithRelations | null;
  } catch (error) {
    console.error("Error fetching grade:", error);
    throw new Error("Failed to fetch grade");
  }
}

/**
 * Get grades by student
 */
export async function getGradesByStudent(
  studentId: string,
): Promise<GradeWithRelations[]> {
  try {
    const grades = await prisma.grade.findMany({
      where: { studentId },
      orderBy: { assessmentDate: "desc" },
      include: {
        subject: {
          include: {
            class: {
              select: {
                name: true,
                code: true,
              },
            },
          },
        },
      },
    });

    return grades as unknown as GradeWithRelations[];
  } catch (error) {
    console.error("Error fetching grades by student:", error);
    throw new Error("Failed to fetch grades by student");
  }
}

/**
 * Get grades by subject
 */
export async function getGradesBySubject(
  subjectId: string,
): Promise<GradeWithRelations[]> {
  try {
    const grades = await prisma.grade.findMany({
      where: { subjectId },
      orderBy: { assessmentDate: "desc" },
      include: {
        student: {
          include: {
            user: {
              select: {
                name: true,
                email: true,
              },
            },
          },
        },
      },
    });

    return grades as unknown as GradeWithRelations[];
  } catch (error) {
    console.error("Error fetching grades by subject:", error);
    throw new Error("Failed to fetch grades by subject");
  }
}

/**
 * Get student grade summary
 */
export async function getStudentGradeSummary(
  studentId: string,
): Promise<StudentGradeSummary | null> {
  try {
    const student = await prisma.student.findUnique({
      where: { id: studentId },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
        grades: {
          include: {
            subject: {
              select: {
                id: true,
                name: true,
                code: true,
              },
            },
          },
          orderBy: { assessmentDate: "desc" },
        },
      },
    });

    if (!student) return null;

    // Group grades by subject
    const subjectMap = new Map();
    student.grades.forEach((grade) => {
      const subjectId = grade.subject.id;
      if (!subjectMap.has(subjectId)) {
        subjectMap.set(subjectId, {
          subjectId: grade.subject.id,
          subjectName: grade.subject.name,
          subjectCode: grade.subject.code,
          grades: [],
          scores: [],
        });
      }
      const subjectData = subjectMap.get(subjectId);
      subjectData.grades.push({
        id: grade.id,
        examType: grade.examType,
        score: grade.score,
        totalScore: grade.totalScore,
        percentage: grade.percentage,
        grade: grade.grade,
        assessmentDate: grade.assessmentDate,
      });
      subjectData.scores.push(grade.percentage);
    });

    // Calculate averages
    const subjects = Array.from(subjectMap.values()).map((subject) => ({
      subjectId: subject.subjectId,
      subjectName: subject.subjectName,
      subjectCode: subject.subjectCode,
      averageScore:
        subject.scores.reduce((a: number, b: number) => a + b, 0) /
        subject.scores.length,
      grades: subject.grades,
    }));

    const overallAverage =
      subjects.length > 0
        ? subjects.reduce((acc, s) => acc + s.averageScore, 0) / subjects.length
        : 0;

    return {
      studentId: student.id,
      studentName: student.user.name,
      studentEmail: student.user.email,
      overallAverage,
      subjects,
    };
  } catch (error) {
    console.error("Error fetching student grade summary:", error);
    throw new Error("Failed to fetch student grade summary");
  }
}

/**
 * Get grade statistics
 */
export async function getGradeStats(): Promise<GradeStats> {
  try {
    const [totalGrades, publishedGrades, allGrades, byExamType] =
      await Promise.all([
        prisma.grade.count(),
        prisma.grade.count({ where: { isPublished: true } }),
        prisma.grade.findMany({
          select: {
            percentage: true,
            grade: true,
            examType: true,
          },
        }),
        prisma.grade.groupBy({
          by: ["examType"],
          _count: true,
        }),
      ]);

    // Calculate average score
    const averageScore =
      allGrades.length > 0
        ? allGrades.reduce((acc, g) => acc + g.percentage, 0) / allGrades.length
        : 0;

    // Calculate pass rate (percentage >= 60)
    const passCount = allGrades.filter((g) => g.percentage >= 60).length;
    const passRate =
      allGrades.length > 0 ? (passCount / allGrades.length) * 100 : 0;

    // Grade distribution
    const gradeDistribution = {
      A: allGrades.filter((g) => g.percentage >= 90).length,
      B: allGrades.filter((g) => g.percentage >= 80 && g.percentage < 90)
        .length,
      C: allGrades.filter((g) => g.percentage >= 70 && g.percentage < 80)
        .length,
      D: allGrades.filter((g) => g.percentage >= 60 && g.percentage < 70)
        .length,
      F: allGrades.filter((g) => g.percentage < 60).length,
    };

    // Exam type counts
    const examTypeCounts = {} as Record<ExamType, number>;
    byExamType.forEach((item) => {
      examTypeCounts[item.examType] = item._count;
    });

    // Get top performers
    const topPerformersRaw = await prisma.grade.groupBy({
      by: ["studentId"],
      _avg: { percentage: true },
      orderBy: { _avg: { percentage: "desc" } },
      take: 10,
    });

    const topPerformers = await Promise.all(
      topPerformersRaw.map(async (performer) => {
        const student = await prisma.student.findUnique({
          where: { id: performer.studentId },
          include: {
            user: {
              select: { name: true },
            },
          },
        });
        return {
          studentId: performer.studentId,
          studentName: student?.user.name || "Unknown",
          averageScore: performer._avg.percentage || 0,
        };
      }),
    );

    return {
      totalGrades,
      publishedGrades,
      averageScore: Math.round(averageScore * 10) / 10,
      passRate: Math.round(passRate * 10) / 10,
      byExamType: examTypeCounts,
      gradeDistribution,
      topPerformers,
    };
  } catch (error) {
    console.error("Error fetching grade stats:", error);
    throw new Error("Failed to fetch grade stats");
  }
}

// ==================== WRITE OPERATIONS ====================

export interface CreateGradeInput {
  studentId: string;
  subjectId: string;
  examType: ExamType;
  score: number;
  totalScore: number;
  assessedBy: string;
  remarks?: string;
  assessmentDate?: Date;
}

/**
 * Create a new grade
 */
export async function createGrade(
  input: CreateGradeInput,
): Promise<GradeWithRelations> {
  const {
    studentId,
    subjectId,
    examType,
    score,
    totalScore,
    assessedBy,
    remarks,
    assessmentDate,
  } = input;

  try {
    // Check if student exists
    const student = await prisma.student.findUnique({
      where: { id: studentId },
    });
    if (!student) {
      throw new Error("Student not found");
    }

    // Check if subject exists
    const subject = await prisma.subject.findUnique({
      where: { id: subjectId },
    });
    if (!subject) {
      throw new Error("Subject not found");
    }

    const percentage = (score / totalScore) * 100;
    const grade = calculateGrade(percentage);
    const gradePoint = calculateGradePoint(percentage);

    const newGrade = await prisma.grade.create({
      data: {
        studentId,
        subjectId,
        examType,
        score,
        totalScore,
        percentage,
        grade,
        gradePoint,
        assessedBy,
        remarks,
        assessmentDate: assessmentDate || new Date(),
      },
      include: {
        student: {
          include: {
            user: {
              select: {
                name: true,
                email: true,
              },
            },
          },
        },
        subject: {
          include: {
            class: {
              select: {
                name: true,
                code: true,
              },
            },
          },
        },
      },
    });

    revalidatePath(`/dashboard/admin/students/${studentId}/grades`);
    revalidatePath(`/dashboard/admin/subjects/${subjectId}/grades`);
    revalidatePath("/dashboard/admin/grades");
    return newGrade as unknown as GradeWithRelations;
  } catch (error) {
    console.error("Error creating grade:", error);
    throw error;
  }
}

export interface UpdateGradeInput {
  score?: number;
  totalScore?: number;
  examType?: ExamType;
  remarks?: string;
  assessmentDate?: Date;
}

/**
 * Update grade
 */
export async function updateGrade(
  id: string,
  input: UpdateGradeInput,
): Promise<GradeWithRelations> {
  const { score, totalScore, examType, remarks, assessmentDate } = input;

  try {
    const updateData: Prisma.GradeUpdateInput = {};

    if (score !== undefined) updateData.score = score;
    if (totalScore !== undefined) updateData.totalScore = totalScore;
    if (examType !== undefined) updateData.examType = examType;
    if (remarks !== undefined) updateData.remarks = remarks;
    if (assessmentDate !== undefined)
      updateData.assessmentDate = assessmentDate;

    // Recalculate percentage if score or totalScore changed
    if (score !== undefined || totalScore !== undefined) {
      const current = await prisma.grade.findUnique({
        where: { id },
        select: { score: true, totalScore: true },
      });
      const newScore = score !== undefined ? score : current?.score;
      const newTotalScore =
        totalScore !== undefined ? totalScore : current?.totalScore;
      if (newScore !== undefined && newTotalScore !== undefined && newTotalScore !== 0) {
        const percentage = (newScore / newTotalScore) * 100;
        updateData.percentage = percentage;
        updateData.grade = calculateGrade(percentage);
        updateData.gradePoint = calculateGradePoint(percentage);
      }
    }

    const grade = await prisma.grade.update({
      where: { id },
      data: updateData,
      include: {
        student: {
          include: {
            user: {
              select: {
                name: true,
                email: true,
              },
            },
          },
        },
        subject: {
          include: {
            class: {
              select: {
                name: true,
                code: true,
              },
            },
          },
        },
      },
    });

    revalidatePath(`/dashboard/admin/grades/${id}`);
    revalidatePath("/dashboard/admin/grades");
    return grade as unknown as GradeWithRelations;
  } catch (error) {
    console.error("Error updating grade:", error);
    throw new Error("Failed to update grade");
  }
}

/**
 * Delete grade
 */
export async function deleteGrade(id: string): Promise<void> {
  try {
    const grade = await prisma.grade.findUnique({
      where: { id },
      select: { studentId: true, subjectId: true },
    });

    if (!grade) {
      throw new Error("Grade not found");
    }

    await prisma.grade.delete({
      where: { id },
    });

    revalidatePath(`/dashboard/admin/students/${grade.studentId}/grades`);
    revalidatePath(`/dashboard/admin/subjects/${grade.subjectId}/grades`);
    revalidatePath("/dashboard/admin/grades");
  } catch (error) {
    console.error("Error deleting grade:", error);
    throw new Error("Failed to delete grade");
  }
}

/**
 * Publish grade
 */
export async function publishGrade(id: string): Promise<void> {
  try {
    await prisma.grade.update({
      where: { id },
      data: {
        isPublished: true,
        publishedAt: new Date(),
      },
    });

    revalidatePath(`/dashboard/admin/grades/${id}`);
    revalidatePath("/dashboard/admin/grades");
  } catch (error) {
    console.error("Error publishing grade:", error);
    throw new Error("Failed to publish grade");
  }
}

/**
 * Unpublish grade
 */
export async function unpublishGrade(id: string): Promise<void> {
  try {
    await prisma.grade.update({
      where: { id },
      data: {
        isPublished: false,
        publishedAt: null,
      },
    });

    revalidatePath(`/dashboard/admin/grades/${id}`);
    revalidatePath("/dashboard/admin/grades");
  } catch (error) {
    console.error("Error unpublishing grade:", error);
    throw new Error("Failed to unpublish grade");
  }
}

// ==================== BULK OPERATIONS ====================

export interface BulkCreateGradeInput {
  studentId: string;
  subjectId: string;
  examType: ExamType;
  score: number;
  totalScore: number;
  assessedBy: string;
  remarks?: string;
}

/**
 * Bulk create grades
 */
export async function bulkCreateGrades(
  grades: BulkCreateGradeInput[],
): Promise<number> {
  let successCount = 0;

  try {
    for (const grade of grades) {
      try {
        await createGrade(grade);
        successCount++;
      } catch (error) {
        console.error(
          `Failed to create grade for student ${grade.studentId}:`,
          error,
        );
      }
    }

    revalidatePath("/dashboard/admin/grades");
    return successCount;
  } catch (error) {
    console.error("Error bulk creating grades:", error);
    throw new Error("Failed to bulk create grades");
  }
}

/**
 * Bulk publish grades
 */
export async function bulkPublishGrades(ids: string[]): Promise<number> {
  try {
    const result = await prisma.grade.updateMany({
      where: { id: { in: ids } },
      data: {
        isPublished: true,
        publishedAt: new Date(),
      },
    });

    revalidatePath("/dashboard/admin/grades");
    return result.count;
  } catch (error) {
    console.error("Error bulk publishing grades:", error);
    throw new Error("Failed to bulk publish grades");
  }
}

/**
 * Bulk delete grades
 */
export async function bulkDeleteGrades(ids: string[]): Promise<number> {
  try {
    const result = await prisma.grade.deleteMany({
      where: { id: { in: ids } },
    });

    revalidatePath("/dashboard/admin/grades");
    return result.count;
  } catch (error) {
    console.error("Error bulk deleting grades:", error);
    throw new Error("Failed to bulk delete grades");
  }
}

// ==================== HELPER FUNCTIONS ====================

/**
 * Calculate letter grade based on percentage
 */
function calculateGrade(percentage: number): string {
  if (percentage >= 90) return "A";
  if (percentage >= 80) return "B";
  if (percentage >= 70) return "C";
  if (percentage >= 60) return "D";
  return "F";
}

/**
 * Calculate grade point based on percentage
 */
function calculateGradePoint(percentage: number): number {
  if (percentage >= 90) return 4.0;
  if (percentage >= 80) return 3.0;
  if (percentage >= 70) return 2.0;
  if (percentage >= 60) return 1.0;
  return 0.0;
}

/**
 * Get exam types for dropdown
 */
export async function getExamTypes(): Promise<string[]> {
  return Object.values(ExamType);
}

/**
 * Get grade ranges for filtering
 */
export async function getGradeRanges(): Promise<
  { label: string; min: number; max: number }[]
> {
  return [
    { label: "A (90-100%)", min: 90, max: 100 },
    { label: "B (80-89%)", min: 80, max: 89 },
    { label: "C (70-79%)", min: 70, max: 79 },
    { label: "D (60-69%)", min: 60, max: 69 },
    { label: "F (Below 60%)", min: 0, max: 59 },
  ];
}

/**
 * Check if grade exists for student and subject
 */
export async function gradeExists(
  studentId: string,
  subjectId: string,
  examType: ExamType,
): Promise<boolean> {
  try {
    const grade = await prisma.grade.findFirst({
      where: {
        studentId,
        subjectId,
        examType,
      },
    });
    return !!grade;
  } catch (error) {
    console.error("Error checking grade existence:", error);
    throw new Error("Failed to check grade existence");
  }
}

/**
 * Get student's average grade by subject
 */
export async function getStudentSubjectAverage(
  studentId: string,
  subjectId: string,
): Promise<number> {
  try {
    const grades = await prisma.grade.findMany({
      where: {
        studentId,
        subjectId,
      },
      select: { percentage: true },
    });

    if (grades.length === 0) return 0;
    const total = grades.reduce((acc, g) => acc + g.percentage, 0);
    return total / grades.length;
  } catch (error) {
    console.error("Error fetching student subject average:", error);
    throw new Error("Failed to fetch student subject average");
  }
}
