// app/(portal)/dashboard/admin/actions/classes.ts
"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import {
  ScheduleType,
  MeetingPlatform,
  EnrollmentStatus,
} from "@/app/generated/prisma/enums";

// ==================== TYPES ====================

export interface ClassFilters {
  search?: string;
  teacherId?: string;
  level?: string;
  academicYear?: string;
  isActive?: boolean;
  page?: number;
  limit?: number;
}

export interface ClassWithRelations {
  id: string;
  name: string;
  code: string;
  description: string | null;
  level: string;
  section: string | null;
  capacity: number;
  currentEnrollment: number;
  academicYear: string;
  term: string | null;
  scheduleType: ScheduleType;
  isActive: boolean;
  startDate: Date | null;
  endDate: Date | null;
  createdAt: Date;
  updatedAt: Date;
  teacher: {
    id: string;
    user: {
      name: string;
      email: string;
      image: string | null;
    };
    specialization: string | null;
  };
  createdBy: {
    id: string;
    name: string;
    email: string;
  };
  schedules: ClassSchedule[];
  enrollments: EnrollmentSummary[];
  subjects: SubjectSummary[];
  studentGroups: GroupSummary[];
}

export interface ClassSchedule {
  id: string;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  timezone: string;
  isLive: boolean;
  meetingPlatform: MeetingPlatform;
  meetingUrl: string | null;
  meetingId: string | null;
  meetingPassword: string | null;
  isRecurring: boolean;
  recurrenceRule: string | null;
}

export interface EnrollmentSummary {
  id: string;
  studentId: string;
  studentName: string;
  studentEmail: string;
  enrolledAt: Date;
  status: string;
  progress: number | null;
}

export interface SubjectSummary {
  id: string;
  name: string;
  code: string;
  category: string;
  teacherId: string;
  teacherName: string;
}

export interface GroupSummary {
  id: string;
  name: string;
  type: string;
  memberCount: number;
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
 * Get paginated list of classes with filters
 */
export async function getClasses(
  filters: ClassFilters = {},
): Promise<PaginatedResponse<ClassWithRelations>> {
  const {
    search,
    teacherId,
    level,
    academicYear,
    isActive = true,
    page = 1,
    limit = 20,
  } = filters;

  const skip = (page - 1) * limit;

  // Build where clause
  const where: any = { isActive };

  if (search) {
    where.OR = [
      { name: { contains: search, mode: "insensitive" } },
      { code: { contains: search, mode: "insensitive" } },
      { description: { contains: search, mode: "insensitive" } },
    ];
  }

  if (teacherId) {
    where.teacherId = teacherId;
  }

  if (level) {
    where.level = level;
  }

  if (academicYear) {
    where.academicYear = academicYear;
  }

  try {
    const [classes, total] = await Promise.all([
      prisma.class.findMany({
        where,
        skip,
        take: limit,
        orderBy: [{ academicYear: "desc" }, { name: "asc" }],
        include: {
          teacher: {
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
          createdBy: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          schedules: true,
          enrollments: {
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
            take: 5,
            orderBy: { enrolledAt: "desc" },
          },
          subjects: {
            include: {
              teacher: {
                include: {
                  user: {
                    select: { name: true },
                  },
                },
              },
            },
          },
          studentGroups: true,
        },
      }),
      prisma.class.count({ where }),
    ]);

    // Format the response
    const formattedClasses = classes.map((cls) => ({
      ...cls,
      enrollments: cls.enrollments.map((enrollment) => ({
        id: enrollment.id,
        studentId: enrollment.student.id,
        studentName: enrollment.student.user.name,
        studentEmail: enrollment.student.user.email,
        enrolledAt: enrollment.enrolledAt,
        status: enrollment.status,
        progress: enrollment.progress,
      })),
      subjects: cls.subjects.map((subject) => ({
        id: subject.id,
        name: subject.name,
        code: subject.code,
        category: subject.category,
        teacherId: subject.teacherId,
        teacherName: subject.teacher.user.name,
      })),
      studentGroups: cls.studentGroups.map((group) => ({
        id: group.id,
        name: group.name,
        type: group.type,
        memberCount: group.currentCount,
      })),
    }));

    return {
      data: formattedClasses as ClassWithRelations[],
      total,
      page,
      totalPages: Math.ceil(total / limit),
      limit,
    };
  } catch (error) {
    console.error("Error fetching classes:", error);
    throw new Error("Failed to fetch classes");
  }
}

/**
 * Get single class by ID with full details
 */
export async function getClassById(
  id: string,
): Promise<ClassWithRelations | null> {
  try {
    const classData = await prisma.class.findUnique({
      where: { id },
      include: {
        teacher: {
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
        createdBy: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        schedules: {
          orderBy: { dayOfWeek: "asc" },
        },
        enrollments: {
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
          orderBy: { enrolledAt: "desc" },
        },
        subjects: {
          include: {
            teacher: {
              include: {
                user: {
                  select: { name: true },
                },
              },
            },
          },
        },
        studentGroups: {
          include: {
            members: {
              include: {
                student: {
                  include: {
                    user: {
                      select: { name: true },
                    },
                  },
                },
              },
            },
          },
        },
        announcements: {
          orderBy: { createdAt: "desc" },
          take: 10,
        },
        materials: {
          orderBy: { createdAt: "desc" },
          take: 10,
        },
        attendances: {
          orderBy: { date: "desc" },
          take: 10,
        },
      },
    });

    if (!classData) return null;

    return {
      ...classData,
      enrollments: classData.enrollments.map((enrollment) => ({
        id: enrollment.id,
        studentId: enrollment.student.id,
        studentName: enrollment.student.user.name,
        studentEmail: enrollment.student.user.email,
        enrolledAt: enrollment.enrolledAt,
        status: enrollment.status,
        progress: enrollment.progress,
      })),
      subjects: classData.subjects.map((subject) => ({
        id: subject.id,
        name: subject.name,
        code: subject.code,
        category: subject.category,
        teacherId: subject.teacherId,
        teacherName: subject.teacher.user.name,
      })),
      studentGroups: classData.studentGroups.map((group) => ({
        id: group.id,
        name: group.name,
        type: group.type,
        memberCount: group.members.length,
      })),
    } as ClassWithRelations;
  } catch (error) {
    console.error("Error fetching class:", error);
    throw new Error("Failed to fetch class");
  }
}

/**
 * Get class by code
 */
export async function getClassByCode(
  code: string,
): Promise<ClassWithRelations | null> {
  try {
    const classData = await prisma.class.findUnique({
      where: { code },
      include: {
        teacher: {
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
        schedules: true,
        enrollments: {
          take: 5,
        },
      },
    });

    return classData as ClassWithRelations | null;
  } catch (error) {
    console.error("Error fetching class by code:", error);
    throw new Error("Failed to fetch class");
  }
}

/**
 * Get classes by teacher
 */
export async function getClassesByTeacher(
  teacherId: string,
): Promise<ClassWithRelations[]> {
  try {
    const classes = await prisma.class.findMany({
      where: { teacherId, isActive: true },
      orderBy: { name: "asc" },
      include: {
        schedules: true,
        enrollments: {
          select: { id: true },
        },
      },
    });

    return classes as unknown as ClassWithRelations[];
  } catch (error) {
    console.error("Error fetching classes by teacher:", error);
    throw new Error("Failed to fetch classes");
  }
}

/**
 * Get classes by student
 */
export async function getClassesByStudent(
  studentId: string,
): Promise<ClassWithRelations[]> {
  try {
    const enrollments = await prisma.enrollment.findMany({
      where: { studentId, status: "ACTIVE" },
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
            schedules: true,
          },
        },
      },
    });

    return enrollments.map((e) => e.class as unknown as ClassWithRelations);
  } catch (error) {
    console.error("Error fetching classes by student:", error);
    throw new Error("Failed to fetch classes");
  }
}

// ==================== WRITE OPERATIONS ====================

interface CreateClassInput {
  name: string;
  code: string;
  description?: string;
  level: string;
  section?: string;
  capacity?: number;
  academicYear: string;
  term?: string;
  scheduleType?: ScheduleType;
  teacherId: string;
  createdById: string;
  startDate?: Date;
  endDate?: Date;
}

/**
 * Create a new class
 */
export async function createClass(
  input: CreateClassInput,
): Promise<ClassWithRelations> {
  const {
    name,
    code,
    description,
    level,
    section,
    capacity = 20,
    academicYear,
    term,
    scheduleType = "REGULAR",
    teacherId,
    createdById,
    startDate,
    endDate,
  } = input;

  try {
    // Check if class code already exists
    const existingClass = await prisma.class.findUnique({
      where: { code },
    });

    if (existingClass) {
      throw new Error("Class with this code already exists");
    }

    // Create class
    const newClass = await prisma.class.create({
      data: {
        name,
        code,
        description,
        level,
        section,
        capacity,
        academicYear,
        term,
        scheduleType,
        teacherId,
        createdById,
        startDate,
        endDate,
        currentEnrollment: 0,
      },
      include: {
        teacher: {
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
        createdBy: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        schedules: true,
      },
    });

    revalidatePath("/dashboard/admin/classes");
    return newClass as unknown as ClassWithRelations;
  } catch (error) {
    console.error("Error creating class:", error);
    throw error;
  }
}

interface UpdateClassInput {
  name?: string;
  description?: string;
  level?: string;
  section?: string;
  capacity?: number;
  academicYear?: string;
  term?: string;
  scheduleType?: ScheduleType;
  teacherId?: string;
  startDate?: Date;
  endDate?: Date;
  isActive?: boolean;
}

/**
 * Update class details
 */
export async function updateClass(
  id: string,
  input: UpdateClassInput,
): Promise<ClassWithRelations> {
  try {
    const updatedClass = await prisma.class.update({
      where: { id },
      data: input,
      include: {
        teacher: {
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
        schedules: true,
      },
    });

    revalidatePath(`/dashboard/admin/classes/${id}`);
    revalidatePath("/dashboard/admin/classes");
    return updatedClass as unknown as ClassWithRelations;
  } catch (error) {
    console.error("Error updating class:", error);
    throw new Error("Failed to update class");
  }
}

/**
 * Delete class (soft delete by deactivating)
 */
export async function deleteClass(id: string): Promise<void> {
  try {
    await prisma.class.update({
      where: { id },
      data: { isActive: false },
    });

    revalidatePath("/dashboard/admin/classes");
  } catch (error) {
    console.error("Error deleting class:", error);
    throw new Error("Failed to delete class");
  }
}

/**
 * Permanently delete class (hard delete - use with caution)
 */
export async function hardDeleteClass(id: string): Promise<void> {
  try {
    await prisma.class.delete({
      where: { id },
    });

    revalidatePath("/dashboard/admin/classes");
  } catch (error) {
    console.error("Error permanently deleting class:", error);
    throw new Error("Failed to permanently delete class");
  }
}

// ==================== SCHEDULE OPERATIONS ====================

interface CreateScheduleInput {
  classId: string;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  timezone?: string;
  isLive?: boolean;
  meetingPlatform?: MeetingPlatform;
  meetingUrl?: string;
  meetingId?: string;
  meetingPassword?: string;
  isRecurring?: boolean;
  recurrenceRule?: string;
}

/**
 * Add schedule to class
 */
export async function addClassSchedule(
  input: CreateScheduleInput,
): Promise<ClassSchedule> {
  const {
    classId,
    dayOfWeek,
    startTime,
    endTime,
    timezone = "UTC",
    isLive = true,
    meetingPlatform = "ZOOM",
    meetingUrl,
    meetingId,
    meetingPassword,
    isRecurring = true,
    recurrenceRule,
  } = input;

  try {
    // Check if schedule already exists for this day/time
    const existingSchedule = await prisma.classSchedule.findFirst({
      where: {
        classId,
        dayOfWeek,
        startTime,
      },
    });

    if (existingSchedule) {
      throw new Error("A schedule already exists for this day and time");
    }

    const schedule = await prisma.classSchedule.create({
      data: {
        classId,
        dayOfWeek,
        startTime,
        endTime,
        timezone,
        isLive,
        meetingPlatform,
        meetingUrl,
        meetingId,
        meetingPassword,
        isRecurring,
        recurrenceRule,
      },
    });

    revalidatePath(`/dashboard/admin/classes/${classId}`);
    return schedule;
  } catch (error) {
    console.error("Error adding schedule:", error);
    throw error;
  }
}

/**
 * Update class schedule
 */
export async function updateClassSchedule(
  id: string,
  input: Partial<CreateScheduleInput>,
): Promise<ClassSchedule> {
  try {
    const schedule = await prisma.classSchedule.update({
      where: { id },
      data: input,
    });

    revalidatePath(`/dashboard/admin/classes/${schedule.classId}`);
    return schedule;
  } catch (error) {
    console.error("Error updating schedule:", error);
    throw new Error("Failed to update schedule");
  }
}

/**
 * Delete class schedule
 */
export async function deleteClassSchedule(id: string): Promise<void> {
  try {
    const schedule = await prisma.classSchedule.findUnique({
      where: { id },
      select: { classId: true },
    });

    await prisma.classSchedule.delete({
      where: { id },
    });

    if (schedule) {
      revalidatePath(`/dashboard/admin/classes/${schedule.classId}`);
    }
  } catch (error) {
    console.error("Error deleting schedule:", error);
    throw new Error("Failed to delete schedule");
  }
}

// ==================== ENROLLMENT OPERATIONS ====================

interface EnrollStudentInput {
  studentId: string;
  classId: string;
  enrollmentType?: "REGULAR" | "TRIAL" | "AUDIT" | "MAKEUP";
}

/**
 * Enroll a student in a class
 */
export async function enrollStudent(input: EnrollStudentInput): Promise<void> {

    
  const { studentId, classId, enrollmentType = "REGULAR" } = input;
  const student = await prisma.student.findUnique({
    where: { id: studentId },
  });
  if (!student) throw new Error("Student not found");

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
    await prisma.$transaction([
      prisma.enrollment.create({
        data: {
          studentId,
          classId,
          enrollmentType,
        },
      }),
      prisma.class.update({
        where: { id: classId },
        data: { currentEnrollment: { increment: 1 } },
      }),
    ]);

    revalidatePath(`/dashboard/admin/classes/${classId}`);
    revalidatePath("/dashboard/admin/enrollments");
  } catch (error) {
    console.error("Error enrolling student:", error);
    throw error;
  }
}

/**
 * Remove student from class
 */
export async function removeStudentFromClass(
  studentId: string,
  classId: string,
): Promise<void> {
  try {
    await prisma.$transaction([
      prisma.enrollment.delete({
        where: {
          studentId_classId: {
            studentId,
            classId,
          },
        },
      }),
      prisma.class.update({
        where: { id: classId },
        data: { currentEnrollment: { decrement: 1 } },
      }),
    ]);

    revalidatePath(`/dashboard/admin/classes/${classId}`);
    revalidatePath("/dashboard/admin/enrollments");
  } catch (error) {
    console.error("Error removing student from class:", error);
    throw new Error("Failed to remove student from class");
  }
}

/**
 * Update enrollment status
 */
export async function updateEnrollmentStatus(
  studentId: string,
  classId: string,
  status: "ACTIVE" | "COMPLETED" | "DROPPED" | "SUSPENDED" | "FAILED",
): Promise<void> {
  try {
    await prisma.enrollment.update({
      where: {
        studentId_classId: {
          studentId,
          classId,
        },
      },
      data: { status },
    });

    revalidatePath(`/dashboard/admin/classes/${classId}`);
  } catch (error) {
    console.error("Error updating enrollment status:", error);
    throw new Error("Failed to update enrollment status");
  }
}

// ==================== SUBJECT OPERATIONS ====================

interface AddSubjectToClassInput {
  classId: string;
  subjectId: string;
}

/**
 * Add subject to class
 */
export async function addSubjectToClass(
  input: AddSubjectToClassInput,
): Promise<void> {
  const { classId, subjectId } = input;

  try {
    // Check if subject already exists in class
    const existing = await prisma.subject.findFirst({
      where: {
        id: subjectId,
        classId,
      },
    });

    if (existing) {
      throw new Error("Subject is already assigned to this class");
    }

    await prisma.subject.update({
      where: { id: subjectId },
      data: { classId },
    });

    revalidatePath(`/dashboard/admin/classes/${classId}`);
  } catch (error) {
    console.error("Error adding subject to class:", error);
    throw error;
  }
}

/**
 * Remove subject from class
 */
export async function removeSubjectFromClass(subjectId: string): Promise<void> {
  try {
    const subject = await prisma.subject.findUnique({
      where: { id: subjectId },
      select: { classId: true },
    });

    await prisma.subject.update({
      where: { id: subjectId },
      data: { classId: null },
    });

    if (subject?.classId) {
      revalidatePath(`/dashboard/admin/classes/${subject.classId}`);
    }
  } catch (error) {
    console.error("Error removing subject from class:", error);
    throw new Error("Failed to remove subject from class");
  }
}

// ==================== HELPER FUNCTIONS ====================

/**
 * Get available class levels
 */
export async function getClassLevels(): Promise<string[]> {
  try {
    const levels = await prisma.class.groupBy({
      by: ["level"],
    });
    return levels.map((l) => l.level);
  } catch (error) {
    console.error("Error fetching class levels:", error);
    throw new Error("Failed to fetch class levels");
  }
}

/**
 * Get available academic years
 */
export async function getAcademicYears(): Promise<string[]> {
  try {
    const years = await prisma.class.groupBy({
      by: ["academicYear"],
      orderBy: { academicYear: "desc" },
    });
    return years.map((y) => y.academicYear);
  } catch (error) {
    console.error("Error fetching academic years:", error);
    throw new Error("Failed to fetch academic years");
  }
}

/**
 * Check if class code exists
 */
export async function isClassCodeExists(code: string): Promise<boolean> {
  try {
    const classData = await prisma.class.findUnique({
      where: { code },
      select: { id: true },
    });
    return !!classData;
  } catch (error) {
    console.error("Error checking class code:", error);
    throw new Error("Failed to check class code");
  }
}

/**
 * Get class statistics
 */
export async function getClassStats(): Promise<{
  totalClasses: number;
  activeClasses: number;
  totalEnrollments: number;
  averageClassSize: number;
  classesByLevel: Record<string, number>;
}> {
  try {
    const [totalClasses, activeClasses, totalEnrollments, classesByLevel] =
      await Promise.all([
        prisma.class.count(),
        prisma.class.count({ where: { isActive: true } }),
        prisma.enrollment.count({ where: { status: "ACTIVE" } }),
        prisma.class.groupBy({
          by: ["level"],
          _count: true,
        }),
      ]);

    const levelCounts: Record<string, number> = {};
    classesByLevel.forEach((item) => {
      levelCounts[item.level] = item._count;
    });

    const averageClassSize =
      activeClasses > 0 ? totalEnrollments / activeClasses : 0;

    return {
      totalClasses,
      activeClasses,
      totalEnrollments,
      averageClassSize: Math.round(averageClassSize * 10) / 10,
      classesByLevel: levelCounts,
    };
  } catch (error) {
    console.error("Error fetching class stats:", error);
    throw new Error("Failed to fetch class stats");
  }
}

// ==================== BULK OPERATIONS ====================

/**
 * Bulk activate classes
 */
export async function bulkActivateClasses(ids: string[]): Promise<number> {
  try {
    const result = await prisma.class.updateMany({
      where: { id: { in: ids } },
      data: { isActive: true },
    });

    revalidatePath("/dashboard/admin/classes");
    return result.count;
  } catch (error) {
    console.error("Error bulk activating classes:", error);
    throw new Error("Failed to bulk activate classes");
  }
}

/**
 * Bulk deactivate classes
 */
export async function bulkDeactivateClasses(ids: string[]): Promise<number> {
  try {
    const result = await prisma.class.updateMany({
      where: { id: { in: ids } },
      data: { isActive: false },
    });

    revalidatePath("/dashboard/admin/classes");
    return result.count;
  } catch (error) {
    console.error("Error bulk deactivating classes:", error);
    throw new Error("Failed to bulk deactivate classes");
  }
}

/**
 * Bulk delete classes (soft delete)
 */
export async function bulkDeleteClasses(ids: string[]): Promise<number> {
  try {
    const result = await prisma.class.updateMany({
      where: { id: { in: ids } },
      data: { isActive: false },
    });

    revalidatePath("/dashboard/admin/classes");
    return result.count;
  } catch (error) {
    console.error("Error bulk deleting classes:", error);
    throw new Error("Failed to bulk delete classes");
  }
}



