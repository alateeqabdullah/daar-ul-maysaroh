// app/(portal)/dashboard/admin/actions/enrollments.ts
"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { EnrollmentType, EnrollmentStatus } from "@/app/generated/prisma/enums";

// ==================== TYPES ====================

export interface EnrollmentFilters {
  search?: string;
  studentId?: string;
  classId?: string;
  status?: EnrollmentStatus;
  enrollmentType?: EnrollmentType;
  dateFrom?: Date;
  dateTo?: Date;
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
  createdAt: Date;
  updatedAt: Date;
  student: {
    id: string;
    studentId: string;
    user: {
      id: string;
      name: string;
      email: string;
      phone: string | null;
      image: string | null;
    };
    currentLevel: string | null;
    enrollmentDate: Date;
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
  certificates?: {
    id: string;
    type: string;
    title: string;
    issuedAt: Date;
  }[];
  attendance: {
    id: string;
    date: Date;
    status: string;
  }[];
  grades: {
    id: string;
    subjectId: string;
    score: number;
    percentage: number;
    grade: string | null;
  }[];
}

export interface EnrollmentSummary {
  id: string;
  studentName: string;
  studentEmail: string;
  className: string;
  classCode: string;
  enrolledAt: Date;
  status: EnrollmentStatus;
  progress: number | null;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  totalPages: number;
  limit: number;
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
    studentId,
    classId,
    status,
    enrollmentType,
    dateFrom,
    dateTo,
    page = 1,
    limit = 20,
  } = filters;

  const skip = (page - 1) * limit;

  // Build where clause
  const where: any = {};

  if (studentId) {
    where.studentId = studentId;
  }

  if (classId) {
    where.classId = classId;
  }

  if (status) {
    where.status = status;
  }

  if (enrollmentType) {
    where.enrollmentType = enrollmentType;
  }

  if (dateFrom || dateTo) {
    where.enrolledAt = {};
    if (dateFrom) where.enrolledAt.gte = dateFrom;
    if (dateTo) where.enrolledAt.lte = dateTo;
  }

  if (search) {
    where.OR = [
      {
        student: { user: { name: { contains: search, mode: "insensitive" } } },
      },
      {
        student: { user: { email: { contains: search, mode: "insensitive" } } },
      },
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
          payment: true,
          attendance: {
            orderBy: { date: "desc" },
            take: 10,
          },
          grades: true,
        },
      }),
      prisma.enrollment.count({ where }),
    ]);

    // Get certificates separately for each enrollment (certificates belong to student, not enrollment)
    const enrollmentsWithCertificates = await Promise.all(
      enrollments.map(async (enrollment) => {
        const certificates = await prisma.certificate.findMany({
          where: { studentId: enrollment.studentId },
          orderBy: { issuedAt: "desc" },
          select: {
            id: true,
            type: true,
            title: true,
            issuedAt: true,
          },
        });

        return {
          ...enrollment,
          certificates,
        };
      }),
    );

    return {
      data: enrollmentsWithCertificates as EnrollmentWithRelations[],
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
 * Get single enrollment by ID
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
            subjects: true,
          },
        },
        payment: true,
        attendance: {
          orderBy: { date: "desc" },
        },
        grades: {
          include: {
            subject: true,
          },
        },
      },
    });

    if (!enrollment) return null;

    // Get certificates separately
    const certificates = await prisma.certificate.findMany({
      where: { studentId: enrollment.studentId },
      orderBy: { issuedAt: "desc" },
      select: {
        id: true,
        type: true,
        title: true,
        issuedAt: true,
      },
    });

    return {
      ...enrollment,
      certificates,
    } as EnrollmentWithRelations;
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
        attendance: {
          take: 5,
          orderBy: { date: "desc" },
        },
      },
    });

    // Get certificates for each enrollment
    const enrollmentsWithCertificates = await Promise.all(
      enrollments.map(async (enrollment) => {
        const certificates = await prisma.certificate.findMany({
          where: { studentId: enrollment.studentId },
          orderBy: { issuedAt: "desc" },
          select: {
            id: true,
            type: true,
            title: true,
            issuedAt: true,
          },
        });

        return {
          ...enrollment,
          certificates,
        };
      }),
    );

    return enrollmentsWithCertificates as EnrollmentWithRelations[];
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
      orderBy: { enrolledAt: "asc" },
      include: {
        student: {
          include: {
            user: {
              select: {
                name: true,
                email: true,
                phone: true,
              },
            },
          },
        },
        attendance: true,
        grades: true,
      },
    });

    // Get certificates for each enrollment
    const enrollmentsWithCertificates = await Promise.all(
      enrollments.map(async (enrollment) => {
        const certificates = await prisma.certificate.findMany({
          where: { studentId: enrollment.studentId },
          select: {
            id: true,
            type: true,
            title: true,
            issuedAt: true,
          },
        });

        return {
          ...enrollment,
          certificates,
        };
      }),
    );

    return enrollmentsWithCertificates as EnrollmentWithRelations[];
  } catch (error) {
    console.error("Error fetching enrollments by class:", error);
    throw new Error("Failed to fetch enrollments");
  }
}

/**
 * Get enrollment summary for dashboard
 */
export async function getEnrollmentSummary(): Promise<{
  totalEnrollments: number;
  activeEnrollments: number;
  completedEnrollments: number;
  droppedEnrollments: number;
  suspendedEnrollments: number;
  failedEnrollments: number;
  enrollmentTrend: { month: string; count: number }[];
  recentEnrollments: EnrollmentSummary[];
}> {
  const now = new Date();
  const sixMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 5, 1);

  try {
    const [
      totalEnrollments,
      activeEnrollments,
      completedEnrollments,
      droppedEnrollments,
      suspendedEnrollments,
      failedEnrollments,
      recentEnrollments,
    ] = await Promise.all([
      prisma.enrollment.count(),
      prisma.enrollment.count({ where: { status: "ACTIVE" } }),
      prisma.enrollment.count({ where: { status: "COMPLETED" } }),
      prisma.enrollment.count({ where: { status: "DROPPED" } }),
      prisma.enrollment.count({ where: { status: "SUSPENDED" } }),
      prisma.enrollment.count({ where: { status: "FAILED" } }),
      prisma.enrollment.findMany({
        take: 10,
        orderBy: { enrolledAt: "desc" },
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
          class: {
            select: {
              name: true,
              code: true,
            },
          },
        },
      }),
    ]);

    // Calculate enrollment trend by month
    const enrollmentTrend: { month: string; count: number }[] = [];
    for (let i = 5; i >= 0; i--) {
      const monthDate = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthStart = new Date(
        monthDate.getFullYear(),
        monthDate.getMonth(),
        1,
      );
      const monthEnd = new Date(
        monthDate.getFullYear(),
        monthDate.getMonth() + 1,
        0,
      );

      const count = await prisma.enrollment.count({
        where: {
          enrolledAt: {
            gte: monthStart,
            lte: monthEnd,
          },
        },
      });

      enrollmentTrend.push({
        month: monthDate.toLocaleString("default", {
          month: "short",
          year: "numeric",
        }),
        count,
      });
    }

    const recent = recentEnrollments.map((enrollment) => ({
      id: enrollment.id,
      studentName: enrollment.student.user.name,
      studentEmail: enrollment.student.user.email,
      className: enrollment.class.name,
      classCode: enrollment.class.code,
      enrolledAt: enrollment.enrolledAt,
      status: enrollment.status,
      progress: enrollment.progress,
    }));

    return {
      totalEnrollments,
      activeEnrollments,
      completedEnrollments,
      droppedEnrollments,
      suspendedEnrollments,
      failedEnrollments,
      enrollmentTrend,
      recentEnrollments: recent,
    };
  } catch (error) {
    console.error("Error fetching enrollment summary:", error);
    throw new Error("Failed to fetch enrollment summary");
  }
}

// ==================== WRITE OPERATIONS ====================

interface CreateEnrollmentInput {
  studentId: string;
  classId: string;
  enrollmentType?: EnrollmentType;
  paymentId?: string;
  progress?: number;
}

/**
 * Create a new enrollment
 */
export async function createEnrollment(
  input: CreateEnrollmentInput,
): Promise<EnrollmentWithRelations> {
  const {
    studentId,
    classId,
    enrollmentType = "REGULAR",
    paymentId,
    progress = 0,
  } = input;

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
      select: { capacity: true, currentEnrollment: true },
    });

    if (classData && classData.currentEnrollment >= classData.capacity) {
      throw new Error("Class has reached maximum capacity");
    }

    // Create enrollment and update class capacity in a transaction
    const [enrollment] = await prisma.$transaction([
      prisma.enrollment.create({
        data: {
          studentId,
          classId,
          enrollmentType,
          paymentId,
          progress,
        },
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
          attendance: true,
          grades: true,
        },
      }),
      prisma.class.update({
        where: { id: classId },
        data: { currentEnrollment: { increment: 1 } },
      }),
    ]);

    revalidatePath(`/dashboard/admin/classes/${classId}`);
    revalidatePath("/dashboard/admin/enrollments");

    return {
      ...enrollment,
      certificates: [],
    } as EnrollmentWithRelations;
  } catch (error) {
    console.error("Error creating enrollment:", error);
    throw error;
  }
}

interface UpdateEnrollmentInput {
  status?: EnrollmentStatus;
  progress?: number;
  completedAt?: Date | null;
  enrollmentType?: EnrollmentType;
  paymentId?: string | null;
}

/**
 * Update enrollment details
 */
export async function updateEnrollment(
  id: string,
  input: UpdateEnrollmentInput,
): Promise<EnrollmentWithRelations> {
  const { status, progress, completedAt, enrollmentType, paymentId } = input;

  try {
    const enrollment = await prisma.enrollment.update({
      where: { id },
      data: {
        status,
        progress,
        completedAt,
        enrollmentType,
        paymentId,
      },
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
        attendance: true,
        grades: true,
      },
    });

    // Get certificates separately
    const certificates = await prisma.certificate.findMany({
      where: { studentId: enrollment.studentId },
      select: {
        id: true,
        type: true,
        title: true,
        issuedAt: true,
      },
    });

    revalidatePath(`/dashboard/admin/enrollments/${id}`);
    revalidatePath(`/dashboard/admin/classes/${enrollment.classId}`);

    return {
      ...enrollment,
      certificates,
    } as EnrollmentWithRelations;
  } catch (error) {
    console.error("Error updating enrollment:", error);
    throw new Error("Failed to update enrollment");
  }
}

/**
 * Update enrollment progress
 */
export async function updateEnrollmentProgress(
  id: string,
  progress: number,
): Promise<void> {
  try {
    await prisma.enrollment.update({
      where: { id },
      data: { progress },
    });

    revalidatePath(`/dashboard/admin/enrollments/${id}`);
  } catch (error) {
    console.error("Error updating enrollment progress:", error);
    throw new Error("Failed to update enrollment progress");
  }
}

/**
 * Complete enrollment (mark as completed)
 */
export async function completeEnrollment(id: string): Promise<void> {
  try {
    await prisma.enrollment.update({
      where: { id },
      data: {
        status: "COMPLETED",
        completedAt: new Date(),
        progress: 100,
      },
    });

    revalidatePath(`/dashboard/admin/enrollments/${id}`);
  } catch (error) {
    console.error("Error completing enrollment:", error);
    throw new Error("Failed to complete enrollment");
  }
}

/**
 * Drop enrollment
 */
export async function dropEnrollment(
  id: string,
  reason?: string,
): Promise<void> {
  try {
    const enrollment = await prisma.enrollment.findUnique({
      where: { id },
      select: { classId: true, studentId: true },
    });

    if (!enrollment) {
      throw new Error("Enrollment not found");
    }

    await prisma.$transaction([
      prisma.enrollment.update({
        where: { id },
        data: {
          status: "DROPPED",
        },
      }),
      prisma.class.update({
        where: { id: enrollment.classId },
        data: { currentEnrollment: { decrement: 1 } },
      }),
    ]);

    revalidatePath(`/dashboard/admin/classes/${enrollment.classId}`);
    revalidatePath("/dashboard/admin/enrollments");
  } catch (error) {
    console.error("Error dropping enrollment:", error);
    throw new Error("Failed to drop enrollment");
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
      prisma.enrollment.delete({
        where: { id },
      }),
      prisma.class.update({
        where: { id: enrollment.classId },
        data: { currentEnrollment: { decrement: 1 } },
      }),
    ]);

    revalidatePath(`/dashboard/admin/classes/${enrollment.classId}`);
    revalidatePath("/dashboard/admin/enrollments");
  } catch (error) {
    console.error("Error deleting enrollment:", error);
    throw new Error("Failed to delete enrollment");
  }
}

// ==================== ATTENDANCE OPERATIONS ====================

interface RecordAttendanceInput {
  enrollmentId: string;
  date: Date;
  status: "PRESENT" | "ABSENT" | "LATE" | "EXCUSED" | "LEAVE";
  remarks?: string;
  markedBy: string;
}

/**
 * Record attendance for an enrollment
 */
export async function recordAttendance(
  input: RecordAttendanceInput,
): Promise<void> {
  const { enrollmentId, date, status, remarks, markedBy } = input;

  try {
    const enrollment = await prisma.enrollment.findUnique({
      where: { id: enrollmentId },
      select: { studentId: true, classId: true },
    });

    if (!enrollment) {
      throw new Error("Enrollment not found");
    }

    // Get class schedule for the day
    const schedule = await prisma.classSchedule.findFirst({
      where: {
        classId: enrollment.classId,
        dayOfWeek: date.getDay(),
      },
    });

    if (!schedule) {
      throw new Error("No schedule found for this day");
    }

    await prisma.attendance.upsert({
      where: {
        studentId_scheduleId_date: {
          studentId: enrollment.studentId,
          scheduleId: schedule.id,
          date,
        },
      },
      update: {
        status,
        remarks,
        markedBy,
        markedAt: new Date(),
      },
      create: {
        studentId: enrollment.studentId,
        classId: enrollment.classId,
        scheduleId: schedule.id,
        date,
        status,
        remarks,
        markedBy,
        markedAt: new Date(),
      },
    });

    revalidatePath(`/dashboard/admin/enrollments/${enrollmentId}`);
  } catch (error) {
    console.error("Error recording attendance:", error);
    throw new Error("Failed to record attendance");
  }
}

/**
 * Get attendance for an enrollment
 */
export async function getEnrollmentAttendance(
  enrollmentId: string,
): Promise<{
  present: number;
  absent: number;
  late: number;
  excused: number;
  total: number;
  rate: number;
}> {
  try {
    const enrollment = await prisma.enrollment.findUnique({
      where: { id: enrollmentId },
      select: { studentId: true },
    });

    if (!enrollment) {
      throw new Error("Enrollment not found");
    }

    const attendance = await prisma.attendance.findMany({
      where: { studentId: enrollment.studentId },
    });

    const present = attendance.filter((a) => a.status === "PRESENT").length;
    const absent = attendance.filter((a) => a.status === "ABSENT").length;
    const late = attendance.filter((a) => a.status === "LATE").length;
    const excused = attendance.filter(
      (a) => a.status === "EXCUSED" || a.status === "LEAVE",
    ).length;
    const total = attendance.length;
    const rate = total > 0 ? (present / total) * 100 : 0;

    return {
      present,
      absent,
      late,
      excused,
      total,
      rate: Math.round(rate * 10) / 10,
    };
  } catch (error) {
    console.error("Error fetching attendance:", error);
    throw new Error("Failed to fetch attendance");
  }
}

// ==================== GRADE OPERATIONS ====================

interface RecordGradeInput {
  enrollmentId: string;
  subjectId: string;
  examType:
    | "MIDTERM"
    | "FINAL"
    | "QUIZ"
    | "ASSIGNMENT"
    | "RECITATION_TEST"
    | "MEMORIZATION_TEST"
    | "ORAL_EXAM"
    | "WRITTEN_EXAM";
  score: number;
  totalScore?: number;
  remarks?: string;
  assessedBy: string;
}

/**
 * Record a grade for an enrollment
 */
export async function recordGrade(input: RecordGradeInput): Promise<void> {
  const {
    enrollmentId,
    subjectId,
    examType,
    score,
    totalScore = 100,
    remarks,
    assessedBy,
  } = input;

  try {
    const enrollment = await prisma.enrollment.findUnique({
      where: { id: enrollmentId },
      select: { studentId: true },
    });

    if (!enrollment) {
      throw new Error("Enrollment not found");
    }

    const percentage = (score / totalScore) * 100;
    let grade: string | null = null;

    if (percentage >= 90) grade = "A+";
    else if (percentage >= 85) grade = "A";
    else if (percentage >= 80) grade = "A-";
    else if (percentage >= 75) grade = "B+";
    else if (percentage >= 70) grade = "B";
    else if (percentage >= 65) grade = "B-";
    else if (percentage >= 60) grade = "C+";
    else if (percentage >= 55) grade = "C";
    else if (percentage >= 50) grade = "C-";
    else if (percentage >= 45) grade = "D+";
    else if (percentage >= 40) grade = "D";
    else grade = "F";

    await prisma.grade.create({
      data: {
        studentId: enrollment.studentId,
        subjectId,
        examType,
        score,
        totalScore,
        percentage,
        grade,
        remarks,
        assessedBy,
      },
    });

    revalidatePath(`/dashboard/admin/enrollments/${enrollmentId}`);
  } catch (error) {
    console.error("Error recording grade:", error);
    throw new Error("Failed to record grade");
  }
}

/**
 * Get grades for an enrollment
 */
export async function getEnrollmentGrades(enrollmentId: string): Promise<
  {
    id: string;
    subjectName: string;
    examType: string;
    score: number;
    totalScore: number;
    percentage: number;
    grade: string | null;
    assessedAt: Date;
  }[]
> {
  try {
    const enrollment = await prisma.enrollment.findUnique({
      where: { id: enrollmentId },
      select: { studentId: true },
    });

    if (!enrollment) {
      throw new Error("Enrollment not found");
    }

    const grades = await prisma.grade.findMany({
      where: { studentId: enrollment.studentId },
      include: {
        subject: {
          select: { name: true },
        },
      },
      orderBy: { assessmentDate: "desc" },
    });

    return grades.map((grade) => ({
      id: grade.id,
      subjectName: grade.subject.name,
      examType: grade.examType,
      score: grade.score,
      totalScore: grade.totalScore,
      percentage: grade.percentage,
      grade: grade.grade,
      assessedAt: grade.assessmentDate,
    }));
  } catch (error) {
    console.error("Error fetching grades:", error);
    throw new Error("Failed to fetch grades");
  }
}

// ==================== BULK OPERATIONS ====================

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
    // Get class IDs to update capacities
    const enrollments = await prisma.enrollment.findMany({
      where: { id: { in: ids } },
      select: { classId: true },
    });

    const classIds = [...new Set(enrollments.map((e) => e.classId))];

    const result = await prisma.$transaction(async (tx) => {
      const deleteResult = await tx.enrollment.deleteMany({
        where: { id: { in: ids } },
      });

      // Update class capacities
      for (const classId of classIds) {
        const activeEnrollments = await tx.enrollment.count({
          where: { classId, status: "ACTIVE" },
        });

        await tx.class.update({
          where: { id: classId },
          data: { currentEnrollment: activeEnrollments },
        });
      }

      return deleteResult;
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

/**
 * Get enrollment statistics
 */
export async function getEnrollmentStats(): Promise<{
  byStatus: Record<EnrollmentStatus, number>;
  byType: Record<EnrollmentType, number>;
  completionRate: number;
  averageProgress: number;
}> {
  try {
    const [
      byStatus,
      byType,
      totalEnrollments,
      completedEnrollments,
      totalProgress,
    ] = await Promise.all([
      prisma.enrollment.groupBy({
        by: ["status"],
        _count: true,
      }),
      prisma.enrollment.groupBy({
        by: ["enrollmentType"],
        _count: true,
      }),
      prisma.enrollment.count(),
      prisma.enrollment.count({ where: { status: "COMPLETED" } }),
      prisma.enrollment.aggregate({
        _avg: { progress: true },
      }),
    ]);

    const statusCounts = {} as Record<EnrollmentStatus, number>;
    byStatus.forEach((item) => {
      statusCounts[item.status as EnrollmentStatus] = item._count;
    });

    const typeCounts = {} as Record<EnrollmentType, number>;
    byType.forEach((item) => {
      typeCounts[item.enrollmentType as EnrollmentType] = item._count;
    });

    const completionRate =
      totalEnrollments > 0
        ? (completedEnrollments / totalEnrollments) * 100
        : 0;

    return {
      byStatus: statusCounts,
      byType: typeCounts,
      completionRate: Math.round(completionRate * 10) / 10,
      averageProgress: Math.round((totalProgress._avg.progress || 0) * 10) / 10,
    };
  } catch (error) {
    console.error("Error fetching enrollment stats:", error);
    throw new Error("Failed to fetch enrollment stats");
  }
}
