// app/(portal)/dashboard/admin/actions/assignments.ts
"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { AssignmentType, SubmissionStatus } from "@/app/generated/prisma/enums";
import { Prisma } from "@/app/generated/prisma/client";

// ==================== TYPES ====================

export interface AssignmentFilters {
  search?: string;
  subjectId?: string;
  classId?: string;
  type?: AssignmentType;
  dueDate?: Date;
  page?: number;
  limit?: number;
}

export interface AssignmentWithRelations {
  id: string;
  title: string;
  description: string | null;
  subjectId: string;
  dueDate: Date;
  totalMarks: number;
  weightage: number;
  type: AssignmentType;
  attachments: string[];
  instructions: string | null;
  rubric: string | null;
  createdById: string;
  createdAt: Date;
  updatedAt: Date;
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
  createdBy: {
    id: string;
    name: string;
    email: string;
  };
  submissions: AssignmentSubmissionSummary[];
  _count?: {
    submissions: number;
  };
}

export interface AssignmentSubmissionSummary {
  id: string;
  studentId: string;
  studentName: string;
  studentEmail: string;
  submittedAt: Date;
  lateSubmission: boolean;
  marks: number | null;
  status: SubmissionStatus;
  feedback: string | null;
}

export interface AssignmentStat {
  id: string;
  title: string;
  dueDate: Date;
  totalSubmissions: number;
  gradedCount: number;
  averageMarks: number;
  pendingCount: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  totalPages: number;
  limit: number;
}

export interface AssignmentStats {
  totalAssignments: number;
  pendingAssignments: number;
  completedAssignments: number;
  overdueAssignments: number;
  averageScore: number;
  submissionRate: number;
  byType: Record<AssignmentType, number>;
}

// ==================== READ OPERATIONS ====================

/**
 * Get paginated list of assignments with filters
 */
export async function getAssignments(
  filters: AssignmentFilters = {},
): Promise<PaginatedResponse<AssignmentWithRelations>> {
  const {
    search,
    subjectId,
    classId,
    type,
    dueDate,
    page = 1,
    limit = 20,
  } = filters;

  const skip = (page - 1) * limit;

  // Build where clause
  const where: Prisma.AssignmentWhereInput = {};

  if (search) {
    where.OR = [
      { title: { contains: search, mode: "insensitive" } },
      { description: { contains: search, mode: "insensitive" } },
    ];
  }

  if (subjectId) {
    where.subjectId = subjectId;
  }

  if (classId) {
    where.subject = { classId };
  }

  if (type) {
    where.type = type;
  }

  if (dueDate) {
    where.dueDate = { lte: dueDate };
  }

  try {
    const [assignments, total] = await Promise.all([
      prisma.assignment.findMany({
        where,
        skip,
        take: limit,
        orderBy: [{ dueDate: "asc" }, { createdAt: "desc" }],
        include: {
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
          createdBy: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          submissions: {
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
          },
          _count: {
            select: { submissions: true },
          },
        },
      }),
      prisma.assignment.count({ where }),
    ]);

    // Format submissions with student names
    const formattedAssignments = assignments.map((assignment) => ({
      ...assignment,
      submissions: assignment.submissions.map((submission) => ({
        id: submission.id,
        studentId: submission.studentId,
        studentName: submission.student.user.name,
        studentEmail: submission.student.user.email,
        submittedAt: submission.submittedAt,
        lateSubmission: submission.lateSubmission,
        marks: submission.marks,
        status: submission.status,
        feedback: submission.feedback,
      })),
    }));

    return {
      data: formattedAssignments as AssignmentWithRelations[],
      total,
      page,
      totalPages: Math.ceil(total / limit),
      limit,
    };
  } catch (error) {
    console.error("Error fetching assignments:", error);
    throw new Error("Failed to fetch assignments");
  }
}

/**
 * Get assignment by ID with full details
 */
export async function getAssignmentById(
  id: string,
): Promise<AssignmentWithRelations | null> {
  try {
    const assignment = await prisma.assignment.findUnique({
      where: { id },
      include: {
        subject: {
          include: {
            class: {
              select: {
                id: true,
                name: true,
                code: true,
                level: true,
                academicYear: true,
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
        createdBy: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        submissions: {
          include: {
            student: {
              include: {
                user: {
                  select: {
                    name: true,
                    email: true,
                    image: true,
                  },
                },
              },
            },
          },
          orderBy: { submittedAt: "desc" },
        },
      },
    });

    if (!assignment) return null;

    return {
      ...assignment,
      submissions: assignment.submissions.map((submission) => ({
        id: submission.id,
        studentId: submission.studentId,
        studentName: submission.student.user.name,
        studentEmail: submission.student.user.email,
        submittedAt: submission.submittedAt,
        lateSubmission: submission.lateSubmission,
        marks: submission.marks,
        status: submission.status,
        feedback: submission.feedback,
      })),
    } as AssignmentWithRelations;
  } catch (error) {
    console.error("Error fetching assignment:", error);
    throw new Error("Failed to fetch assignment");
  }
}

/**
 * Get assignments by subject
 */
export async function getAssignmentsBySubject(
  subjectId: string,
): Promise<AssignmentWithRelations[]> {
  try {
    const assignments = await prisma.assignment.findMany({
      where: { subjectId },
      orderBy: { dueDate: "asc" },
      include: {
        submissions: {
          select: {
            id: true,
            status: true,
          },
        },
        _count: {
          select: { submissions: true },
        },
      },
    });

    return assignments as AssignmentWithRelations[];
  } catch (error) {
    console.error("Error fetching assignments by subject:", error);
    throw new Error("Failed to fetch assignments by subject");
  }
}

/**
 * Get assignments by class
 */
export async function getAssignmentsByClass(
  classId: string,
): Promise<AssignmentWithRelations[]> {
  try {
    const assignments = await prisma.assignment.findMany({
      where: { subject: { classId } },
      orderBy: { dueDate: "asc" },
      include: {
        subject: {
          select: {
            name: true,
            code: true,
          },
        },
        _count: {
          select: { submissions: true },
        },
      },
    });

    return assignments as AssignmentWithRelations[];
  } catch (error) {
    console.error("Error fetching assignments by class:", error);
    throw new Error("Failed to fetch assignments by class");
  }
}

/**
 * Get assignment statistics
 */
export async function getAssignmentStats(): Promise<AssignmentStats> {
  const now = new Date();

  try {
    const [
      totalAssignments,
      pendingAssignments,
      completedAssignments,
      overdueAssignments,
      byType,
      submissions,
    ] = await Promise.all([
      prisma.assignment.count(),
      prisma.assignment.count({
        where: { dueDate: { gt: now } },
      }),
      prisma.assignment.count({
        where: { dueDate: { lt: now } },
      }),
      prisma.assignment.count({
        where: { dueDate: { lt: now }, submissions: { none: {} } },
      }),
      prisma.assignment.groupBy({
        by: ["type"],
        _count: true,
      }),
      prisma.assignmentSubmission.findMany({
        select: {
          marks: true,
          assignment: {
            select: { totalMarks: true },
          },
        },
      }),
    ]);

    const typeCounts = {} as Record<AssignmentType, number>;
    byType.forEach((item) => {
      typeCounts[item.type] = item._count;
    });

    // Calculate average score
    let totalPercentage = 0;
    let gradedCount = 0;
    submissions.forEach((submission) => {
      if (submission.marks !== null && submission.assignment.totalMarks > 0) {
        totalPercentage +=
          (submission.marks / submission.assignment.totalMarks) * 100;
        gradedCount++;
      }
    });

    const averageScore = gradedCount > 0 ? totalPercentage / gradedCount : 0;
    const totalSubmissions = submissions.length;
    const totalExpectedSubmissions = totalAssignments * 20; // Approximate
    const submissionRate =
      totalExpectedSubmissions > 0
        ? (totalSubmissions / totalExpectedSubmissions) * 100
        : 0;

    return {
      totalAssignments,
      pendingAssignments,
      completedAssignments,
      overdueAssignments,
      averageScore: Math.round(averageScore * 10) / 10,
      submissionRate: Math.round(submissionRate * 10) / 10,
      byType: typeCounts,
    };
  } catch (error) {
    console.error("Error fetching assignment stats:", error);
    throw new Error("Failed to fetch assignment stats");
  }
}

// ==================== WRITE OPERATIONS ====================

export interface CreateAssignmentInput {
  title: string;
  description?: string;
  subjectId: string;
  dueDate: Date;
  totalMarks: number;
  weightage?: number;
  type?: AssignmentType;
  attachments?: string[];
  instructions?: string;
  rubric?: string;
  createdById: string;
}

/**
 * Create a new assignment
 */
export async function createAssignment(
  input: CreateAssignmentInput,
): Promise<AssignmentWithRelations> {
  const {
    title,
    description,
    subjectId,
    dueDate,
    totalMarks,
    weightage = 100,
    type = "HOMEWORK",
    attachments = [],
    instructions,
    rubric,
    createdById,
  } = input;

  try {
    // Check if subject exists
    const subject = await prisma.subject.findUnique({
      where: { id: subjectId },
    });

    if (!subject) {
      throw new Error("Subject not found");
    }

    const assignment = await prisma.assignment.create({
      data: {
        title,
        description,
        subjectId,
        dueDate,
        totalMarks,
        weightage,
        type,
        attachments,
        instructions,
        rubric,
        createdById,
      },
      include: {
        subject: {
          include: {
            class: {
              select: {
                id: true,
                name: true,
                code: true,
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
        createdBy: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    revalidatePath(`/dashboard/admin/subjects/${subjectId}`);
    revalidatePath("/dashboard/admin/assignments");
    return assignment as unknown as AssignmentWithRelations;
  } catch (error) {
    console.error("Error creating assignment:", error);
    throw error;
  }
}

export interface UpdateAssignmentInput {
  title?: string;
  description?: string;
  dueDate?: Date;
  totalMarks?: number;
  weightage?: number;
  type?: AssignmentType;
  attachments?: string[];
  instructions?: string;
  rubric?: string;
}

/**
 * Update assignment
 */
export async function updateAssignment(
  id: string,
  input: UpdateAssignmentInput,
): Promise<AssignmentWithRelations> {
  try {
    const assignment = await prisma.assignment.update({
      where: { id },
      data: input,
      include: {
        subject: {
          include: {
            class: {
              select: {
                id: true,
                name: true,
                code: true,
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
        createdBy: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    revalidatePath(`/dashboard/admin/subjects/${assignment.subjectId}`);
    revalidatePath(`/dashboard/admin/assignments/${id}`);
    revalidatePath("/dashboard/admin/assignments");
    return assignment as unknown as AssignmentWithRelations;
  } catch (error) {
    console.error("Error updating assignment:", error);
    throw new Error("Failed to update assignment");
  }
}

/**
 * Delete assignment
 */
export async function deleteAssignment(id: string): Promise<void> {
  try {
    const assignment = await prisma.assignment.findUnique({
      where: { id },
      select: { subjectId: true },
    });

    if (!assignment) {
      throw new Error("Assignment not found");
    }

    await prisma.assignment.delete({
      where: { id },
    });

    revalidatePath(`/dashboard/admin/subjects/${assignment.subjectId}`);
    revalidatePath("/dashboard/admin/assignments");
  } catch (error) {
    console.error("Error deleting assignment:", error);
    throw new Error("Failed to delete assignment");
  }
}

// ==================== SUBMISSION OPERATIONS ====================

export interface GradeSubmissionInput {
  marks: number;
  feedback?: string;
  gradedById: string;
}

/**
 * Grade a student's submission
 */
export async function gradeSubmission(
  submissionId: string,
  input: GradeSubmissionInput,
): Promise<void> {
  const { marks, feedback, gradedById } = input;

  try {
    const submission = await prisma.assignmentSubmission.findUnique({
      where: { id: submissionId },
      include: {
        assignment: {
          select: { totalMarks: true },
        },
      },
    });

    if (!submission) {
      throw new Error("Submission not found");
    }

    if (marks > submission.assignment.totalMarks) {
      throw new Error(
        `Marks cannot exceed ${submission.assignment.totalMarks}`,
      );
    }

    await prisma.assignmentSubmission.update({
      where: { id: submissionId },
      data: {
        marks,
        feedback,
        gradedBy: gradedById,
        gradedAt: new Date(),
        status: "GRADED",
      },
    });

    revalidatePath(`/dashboard/admin/assignments/${submission.assignmentId}`);
  } catch (error) {
    console.error("Error grading submission:", error);
    throw error;
  }
}

/**
 * Bulk grade submissions
 */
export async function bulkGradeSubmissions(
  submissions: { id: string; marks: number; feedback?: string }[],
  gradedById: string,
): Promise<number> {
  let successCount = 0;

  try {
    for (const submission of submissions) {
      try {
        await gradeSubmission(submission.id, {
          marks: submission.marks,
          feedback: submission.feedback,
          gradedById,
        });
        successCount++;
      } catch (error) {
        console.error(`Failed to grade submission ${submission.id}:`, error);
      }
    }

    if (submissions.length > 0) {
      const firstSubmission = await prisma.assignmentSubmission.findUnique({
        where: { id: submissions[0].id },
        select: { assignmentId: true },
      });
      if (firstSubmission) {
        revalidatePath(
          `/dashboard/admin/assignments/${firstSubmission.assignmentId}`,
        );
      }
    }
    revalidatePath("/dashboard/admin/assignments");
    return successCount;
  } catch (error) {
    console.error("Error bulk grading submissions:", error);
    throw new Error("Failed to bulk grade submissions");
  }
}

/**
 * Get submissions by assignment
 */
export async function getSubmissionsByAssignment(
  assignmentId: string,
): Promise<AssignmentSubmissionSummary[]> {
  try {
    const submissions = await prisma.assignmentSubmission.findMany({
      where: { assignmentId },
      include: {
        student: {
          include: {
            user: {
              select: {
                name: true,
                email: true,
                image: true,
              },
            },
          },
        },
      },
      orderBy: { submittedAt: "desc" },
    });

    return submissions.map((submission) => ({
      id: submission.id,
      studentId: submission.studentId,
      studentName: submission.student.user.name,
      studentEmail: submission.student.user.email,
      submittedAt: submission.submittedAt,
      lateSubmission: submission.lateSubmission,
      marks: submission.marks,
      status: submission.status,
      feedback: submission.feedback,
    }));
  } catch (error) {
    console.error("Error fetching submissions:", error);
    throw new Error("Failed to fetch submissions");
  }
}

// ==================== BULK OPERATIONS ====================

/**
 * Bulk delete assignments
 */
export async function bulkDeleteAssignments(ids: string[]): Promise<number> {
  try {
    const result = await prisma.assignment.deleteMany({
      where: { id: { in: ids } },
    });

    revalidatePath("/dashboard/admin/assignments");
    return result.count;
  } catch (error) {
    console.error("Error bulk deleting assignments:", error);
    throw new Error("Failed to bulk delete assignments");
  }
}

/**
 * Bulk update assignment due dates
 */
export async function bulkUpdateDueDates(
  updates: { id: string; dueDate: Date }[],
): Promise<number> {
  let successCount = 0;

  try {
    for (const update of updates) {
      await prisma.assignment.update({
        where: { id: update.id },
        data: { dueDate: update.dueDate },
      });
      successCount++;
    }

    revalidatePath("/dashboard/admin/assignments");
    return successCount;
  } catch (error) {
    console.error("Error bulk updating due dates:", error);
    throw new Error("Failed to bulk update due dates");
  }
}

// ==================== HELPER FUNCTIONS ====================

/**
 * Get assignment types for dropdown
 */
export async function getAssignmentTypes(): Promise<string[]> {
  return Object.values(AssignmentType);
}

/**
 * Get submission statuses for dropdown
 */
export async function getSubmissionStatuses(): Promise<string[]> {
  return Object.values(SubmissionStatus);
}

/**
 * Check if assignment has submissions
 */
export async function hasSubmissions(assignmentId: string): Promise<boolean> {
  try {
    const count = await prisma.assignmentSubmission.count({
      where: { assignmentId },
    });
    return count > 0;
  } catch (error) {
    console.error("Error checking submissions:", error);
    throw new Error("Failed to check submissions");
  }
}

/**
 * Get upcoming assignments count
 */
export async function getUpcomingAssignmentsCount(): Promise<number> {
  const now = new Date();
  const sevenDaysFromNow = new Date(now);
  sevenDaysFromNow.setDate(now.getDate() + 7);

  try {
    return await prisma.assignment.count({
      where: {
        dueDate: {
          gte: now,
          lte: sevenDaysFromNow,
        },
      },
    });
  } catch (error) {
    console.error("Error fetching upcoming assignments:", error);
    throw new Error("Failed to fetch upcoming assignments");
  }
}
