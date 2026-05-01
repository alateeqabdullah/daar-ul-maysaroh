// app/(portal)/dashboard/admin/actions/enrollments.ts
"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { EnrollmentStatus, EnrollmentType } from "@/app/generated/prisma/enums";
import { Prisma } from "@/app/generated/prisma/client";

// ==================== TYPES ====================

export interface EnrollmentFilters {
  search?: string;
  classId?: string;
  studentId?: string;
  status?: EnrollmentStatus;
  enrollmentType?: EnrollmentType;
  page?: number;
  limit?: number;
}

export interface EnrollmentWithRelations {
  id: string;
  studentId: string;
  classId: string;
  enrolledAt: Date;
  enrollmentType: EnrollmentType;
  status: EnrollmentStatus;
  progress: number | null;
  completedAt: Date | null;
  paymentId: string | null;
  createdAt: Date;
  updatedAt: Date;
  student: {
    id: string;
    studentId: string;
    currentLevel: string | null;
    user: {
      id: string;
      name: string;
      email: string;
      phone: string | null;
      image: string | null;
    };
  };
  class: {
    id: string;
    name: string;
    code: string;
    level: string;
    academicYear: string;
    teacher: {
      id: string;
      user: {
        name: string;
        email: string;
      };
    };
  };
  payment?: {
    id: string;
    amount: number;
    status: string;
    paidAt: Date | null;
  } | null;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  totalPages: number;
  limit: number;
}

export interface EnrollmentStats {
  totalEnrollments: number;
  activeEnrollments: number;
  completedEnrollments: number;
  droppedEnrollments: number;
  suspendedEnrollments: number;
  failedEnrollments: number;
  byClass: { className: string; count: number }[];
  byLevel: { level: string; count: number }[];
  recentEnrollments: number;
  completionRate: number;
}

// ==================== READ OPERATIONS ====================

/**
 * Get paginated list of enrollments with filters
 */
export async function getEnrollments(
  filters: EnrollmentFilters = {},
): Promise<PaginatedResponse<EnrollmentWithRelations>> {
  const {
    search,
    classId,
    studentId,
    status,
    enrollmentType,
    page = 1,
    limit = 20,
  } = filters;

  const skip = (page - 1) * limit;

  // Build where clause
  const where: Prisma.EnrollmentWhereInput = {};

  if (classId) {
    where.classId = classId;
  }

  if (studentId) {
    where.studentId = studentId;
  }

  if (status) {
    where.status = status;
  }

  if (enrollmentType) {
    where.enrollmentType = enrollmentType;
  }

  if (search) {
    where.OR = [
      {
        student: { user: { name: { contains: search, mode: "insensitive" } } },
      },
      { student: { studentId: { contains: search, mode: "insensitive" } } },
      { class: { name: { contains: search, mode: "insensitive" } } },
      { class: { code: { contains: search, mode: "insensitive" } } },
    ];
  }

  try {
    const [enrollments, total] = await Promise.all([
      prisma.enrollment.findMany({
        where,
        skip,
        take: limit,
        orderBy: { enrolledAt: "desc" },
        include: {
          student: {
            include: {
              user: {
                select: {
                  id: true,
                  name: true,
                  email: true,
                  phone: true,
                  image: true,
                },
              },
            },
          },
          class: {
            include: {
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
          payment: {
            select: {
              id: true,
              amount: true,
              status: true,
              paidAt: true,
            },
          },
        },
      }),
      prisma.enrollment.count({ where }),
    ]);

    return {
      data: enrollments as unknown as EnrollmentWithRelations[],
      total,
      page,
      totalPages: Math.ceil(total / limit),
      limit,
    };
  } catch (error) {
    console.error("Error fetching enrollments:", error);
    throw new Error("Failed to fetch enrollments");
  }
}

/**
 * Get enrollment by ID
 */
export async function getEnrollmentById(
  id: string,
): Promise<EnrollmentWithRelations | null> {
  try {
    const enrollment = await prisma.enrollment.findUnique({
      where: { id },
      include: {
        student: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                phone: true,
                image: true,
              },
            },
          },
        },
        class: {
          include: {
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
            schedules: true,
          },
        },
        payment: true,
        courses: true,
      },
    });

    return enrollment as EnrollmentWithRelations | null;
  } catch (error) {
    console.error("Error fetching enrollment:", error);
    throw new Error("Failed to fetch enrollment");
  }
}

/**
 * Get enrollments by student
 */
export async function getEnrollmentsByStudent(
  studentId: string,
): Promise<EnrollmentWithRelations[]> {
  try {
    const enrollments = await prisma.enrollment.findMany({
      where: { studentId },
      orderBy: { enrolledAt: "desc" },
      include: {
        class: {
          include: {
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
        payment: true,
      },
    });

    return enrollments as unknown as EnrollmentWithRelations[];
  } catch (error) {
    console.error("Error fetching enrollments by student:", error);
    throw new Error("Failed to fetch enrollments");
  }
}

/**
 * Get enrollments by class
 */
export async function getEnrollmentsByClass(
  classId: string,
): Promise<EnrollmentWithRelations[]> {
  try {
    const enrollments = await prisma.enrollment.findMany({
      where: { classId, status: "ACTIVE" },
      orderBy: { enrolledAt: "desc" },
      include: {
        student: {
          include: {
            user: {
              select: {
                name: true,
                email: true,
                phone: true,
                image: true,
              },
            },
          },
        },
        payment: true,
      },
    });

    return enrollments as unknown as EnrollmentWithRelations[];
  } catch (error) {
    console.error("Error fetching enrollments by class:", error);
    throw new Error("Failed to fetch enrollments");
  }
}

/**
 * Get enrollment statistics
 */
export async function getEnrollmentStats(): Promise<EnrollmentStats> {
  try {
    const [
      totalEnrollments,
      activeEnrollments,
      completedEnrollments,
      droppedEnrollments,
      suspendedEnrollments,
      failedEnrollments,
      recentEnrollments,
      byClass,
      byLevel,
    ] = await Promise.all([
      prisma.enrollment.count(),
      prisma.enrollment.count({ where: { status: "ACTIVE" } }),
      prisma.enrollment.count({ where: { status: "COMPLETED" } }),
      prisma.enrollment.count({ where: { status: "DROPPED" } }),
      prisma.enrollment.count({ where: { status: "SUSPENDED" } }),
      prisma.enrollment.count({ where: { status: "FAILED" } }),
      prisma.enrollment.count({
        where: {
          enrolledAt: {
            gte: new Date(new Date().setDate(new Date().getDate() - 30)),
          },
        },
      }),
      prisma.enrollment.groupBy({
        by: ["classId"],
        _count: true,
        orderBy: { _count: { classId: "desc" } },
        take: 5,
      }),
      prisma.enrollment.findMany({
        select: {
          class: {
            select: { level: true },
          },
        },
      }),
    ]);

    // Get class names for byClass stats
    const classStats = await Promise.all(
      byClass.map(async (item) => {
        const classData = await prisma.class.findUnique({
          where: { id: item.classId },
          select: { name: true },
        });
        return {
          className: classData?.name || "Unknown",
          count: item._count,
        };
      }),
    );

    // Calculate by level
    const levelMap = new Map<string, number>();
    byLevel.forEach((enrollment) => {
      const level = enrollment.class?.level || "Unknown";
      levelMap.set(level, (levelMap.get(level) || 0) + 1);
    });

    const levelStats = Array.from(levelMap.entries()).map(([level, count]) => ({
      level,
      count,
    }));

    const completionRate =
      totalEnrollments > 0
        ? (completedEnrollments / totalEnrollments) * 100
        : 0;

    return {
      totalEnrollments,
      activeEnrollments,
      completedEnrollments,
      droppedEnrollments,
      suspendedEnrollments,
      failedEnrollments,
      byClass: classStats,
      byLevel: levelStats,
      recentEnrollments,
      completionRate: Math.round(completionRate * 10) / 10,
    };
  } catch (error) {
    console.error("Error fetching enrollment stats:", error);
    throw new Error("Failed to fetch enrollment stats");
  }
}

/**
 * Check if student is enrolled in class
 */
export async function isStudentEnrolled(
  studentId: string,
  classId: string,
): Promise<boolean> {
  try {
    const enrollment = await prisma.enrollment.findUnique({
      where: {
        studentId_classId: {
          studentId,
          classId,
        },
      },
    });
    return !!enrollment;
  } catch (error) {
    console.error("Error checking enrollment:", error);
    throw new Error("Failed to check enrollment");
  }
}

// ==================== WRITE OPERATIONS ====================

export interface CreateEnrollmentInput {
  studentId: string;
  classId: string;
  enrollmentType?: EnrollmentType;
  paymentId?: string;
}

/**
 * Create a new enrollment
 */
export async function createEnrollment(
  input: CreateEnrollmentInput,
): Promise<EnrollmentWithRelations> {
  const { studentId, classId, enrollmentType = "REGULAR", paymentId } = input;

  try {
    // Check if already enrolled
    const existingEnrollment = await prisma.enrollment.findUnique({
      where: {
        studentId_classId: {
          studentId,
          classId,
        },
      },
    });

    if (existingEnrollment) {
      throw new Error("Student is already enrolled in this class");
    }

    // Check class capacity
    const classData = await prisma.class.findUnique({
      where: { id: classId },
      select: { capacity: true, currentEnrollment: true, isActive: true },
    });

    if (!classData) {
      throw new Error("Class not found");
    }

    if (!classData.isActive) {
      throw new Error("Class is not active");
    }

    if (classData.currentEnrollment >= classData.capacity) {
      throw new Error("Class has reached maximum capacity");
    }

    // Create enrollment and update class capacity in a transaction
    const result = await prisma.$transaction(async (tx) => {
      const enrollment = await tx.enrollment.create({
        data: {
          studentId,
          classId,
          enrollmentType,
          paymentId,
          status: "ACTIVE",
        },
        include: {
          student: {
            include: {
              user: {
                select: {
                  id: true,
                  name: true,
                  email: true,
                  phone: true,
                  image: true,
                },
              },
            },
          },
          class: {
            include: {
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
          payment: true,
        },
      });

      await tx.class.update({
        where: { id: classId },
        data: { currentEnrollment: { increment: 1 } },
      });

      return enrollment;
    });

    revalidatePath(`/dashboard/admin/classes/${classId}`);
    revalidatePath("/dashboard/admin/enrollments");
    return result as unknown as EnrollmentWithRelations;
  } catch (error) {
    console.error("Error creating enrollment:", error);
    throw error;
  }
}

export interface UpdateEnrollmentInput {
  status?: EnrollmentStatus;
  progress?: number;
  completedAt?: Date;
  paymentId?: string;
}

/**
 * Update enrollment
 */
export async function updateEnrollment(
  id: string,
  input: UpdateEnrollmentInput,
): Promise<EnrollmentWithRelations> {
  const { status, progress, completedAt, paymentId } = input;

  try {
    const enrollment = await prisma.enrollment.update({
      where: { id },
      data: {
        status,
        progress,
        completedAt,
        paymentId,
      },
      include: {
        student: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                phone: true,
                image: true,
              },
            },
          },
        },
        class: {
          include: {
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
        payment: true,
      },
    });

    revalidatePath(`/dashboard/admin/enrollments/${id}`);
    revalidatePath(`/dashboard/admin/classes/${enrollment.classId}`);
    return enrollment as unknown as EnrollmentWithRelations;
  } catch (error) {
    console.error("Error updating enrollment:", error);
    throw new Error("Failed to update enrollment");
  }
}

/**
 * Update enrollment status
 */
export async function updateEnrollmentStatus(
  id: string,
  status: EnrollmentStatus,
): Promise<void> {
  try {
    const enrollment = await prisma.enrollment.findUnique({
      where: { id },
      select: { classId: true, status: true },
    });

    if (!enrollment) {
      throw new Error("Enrollment not found");
    }

    await prisma.enrollment.update({
      where: { id },
      data: { status },
    });

    // If dropping/removing, decrement class capacity
    if (
      enrollment.status === "ACTIVE" &&
      (status === "DROPPED" || status === "COMPLETED" || status === "SUSPENDED")
    ) {
      await prisma.class.update({
        where: { id: enrollment.classId },
        data: { currentEnrollment: { decrement: 1 } },
      });
    }

    revalidatePath(`/dashboard/admin/enrollments/${id}`);
    revalidatePath(`/dashboard/admin/classes/${enrollment.classId}`);
  } catch (error) {
    console.error("Error updating enrollment status:", error);
    throw new Error("Failed to update enrollment status");
  }
}

/**
 * Delete enrollment (hard delete - use with caution)
 */
export async function deleteEnrollment(id: string): Promise<void> {
  try {
    const enrollment = await prisma.enrollment.findUnique({
      where: { id },
      select: { classId: true },
    });

    if (!enrollment) {
      throw new Error("Enrollment not found");
    }

    await prisma.$transaction([
      prisma.class.update({
        where: { id: enrollment.classId },
        data: { currentEnrollment: { decrement: 1 } },
      }),
      prisma.enrollment.delete({
        where: { id },
      }),
    ]);

    revalidatePath(`/dashboard/admin/classes/${enrollment.classId}`);
    revalidatePath("/dashboard/admin/enrollments");
  } catch (error) {
    console.error("Error deleting enrollment:", error);
    throw new Error("Failed to delete enrollment");
  }
}

// ==================== BULK OPERATIONS ====================

/**
 * Bulk create enrollments
 */
export async function bulkCreateEnrollments(
  enrollments: CreateEnrollmentInput[],
): Promise<number> {
  let successCount = 0;

  try {
    for (const enrollment of enrollments) {
      try {
        await createEnrollment(enrollment);
        successCount++;
      } catch (error) {
        console.error(
          `Failed to enroll student ${enrollment.studentId}:`,
          error,
        );
      }
    }

    revalidatePath("/dashboard/admin/enrollments");
    return successCount;
  } catch (error) {
    console.error("Error bulk creating enrollments:", error);
    throw new Error("Failed to bulk create enrollments");
  }
}

/**
 * Bulk update enrollment status
 */
export async function bulkUpdateEnrollmentStatus(
  ids: string[],
  status: EnrollmentStatus,
): Promise<number> {
  try {
    const result = await prisma.enrollment.updateMany({
      where: { id: { in: ids } },
      data: { status },
    });

    revalidatePath("/dashboard/admin/enrollments");
    return result.count;
  } catch (error) {
    console.error("Error bulk updating enrollment status:", error);
    throw new Error("Failed to bulk update enrollment status");
  }
}

/**
 * Bulk delete enrollments
 */
export async function bulkDeleteEnrollments(ids: string[]): Promise<number> {
  try {
    // Get all enrollments to decrement class capacities
    const enrollments = await prisma.enrollment.findMany({
      where: { id: { in: ids } },
      select: { classId: true },
    });

    // Decrement class capacities
    for (const enrollment of enrollments) {
      await prisma.class.update({
        where: { id: enrollment.classId },
        data: { currentEnrollment: { decrement: 1 } },
      });
    }

    // Delete enrollments
    const result = await prisma.enrollment.deleteMany({
      where: { id: { in: ids } },
    });

    revalidatePath("/dashboard/admin/enrollments");
    return result.count;
  } catch (error) {
    console.error("Error bulk deleting enrollments:", error);
    throw new Error("Failed to bulk delete enrollments");
  }
}

// ==================== HELPER FUNCTIONS ====================

/**
 * Get available enrollment statuses
 */
export async function getEnrollmentStatuses(): Promise<string[]> {
  return ["ACTIVE", "COMPLETED", "DROPPED", "SUSPENDED", "FAILED"];
}

/**
 * Get available enrollment types
 */
export async function getEnrollmentTypes(): Promise<string[]> {
  return ["REGULAR", "TRIAL", "AUDIT", "MAKEUP"];
}

/**
 * Get enrollment by student and class
 */
export async function getEnrollmentByStudentAndClass(
  studentId: string,
  classId: string,
): Promise<EnrollmentWithRelations | null> {
  try {
    const enrollment = await prisma.enrollment.findUnique({
      where: {
        studentId_classId: {
          studentId,
          classId,
        },
      },
      include: {
        student: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                phone: true,
                image: true,
              },
            },
          },
        },
        class: {
          include: {
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
        payment: true,
      },
    });

    return enrollment as EnrollmentWithRelations | null;
  } catch (error) {
    console.error("Error fetching enrollment by student and class:", error);
    throw new Error("Failed to fetch enrollment");
  }
}

/**
 * Get students not enrolled in a class
 */
export async function getAvailableStudentsForClass(
  classId: string,
  search?: string,
): Promise<{ id: string; name: string; email: string; studentId: string }[]> {
  try {
    // Get enrolled student IDs
    const enrolledStudents = await prisma.enrollment.findMany({
      where: { classId },
      select: { studentId: true },
    });

    const enrolledIds = enrolledStudents.map((e) => e.studentId);

    // Get available students
    const students = await prisma.student.findMany({
      where: {
        id: { notIn: enrolledIds },
        ...(search && {
          OR: [
            { user: { name: { contains: search, mode: "insensitive" } } },
            { studentId: { contains: search, mode: "insensitive" } },
            { user: { email: { contains: search, mode: "insensitive" } } },
          ],
        }),
      },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
      take: 20,
    });

    return students.map((student) => ({
      id: student.id,
      name: student.user.name,
      email: student.user.email,
      studentId: student.studentId,
    }));
  } catch (error) {
    console.error("Error fetching available students:", error);
    throw new Error("Failed to fetch available students");
  }
}
