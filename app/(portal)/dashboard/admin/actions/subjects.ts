// app/(portal)/dashboard/admin/actions/subjects.ts
"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { Prisma } from "@/app/generated/prisma/client";
import { SubjectCategory, MaterialType } from "@/app/generated/prisma/enums";

// ==================== TYPES ====================

export interface SubjectFilters {
  search?: string;
  category?: SubjectCategory;
  teacherId?: string;
  classId?: string;
  isActive?: boolean;
  page?: number;
  limit?: number;
}

export interface SubjectWithRelations {
  id: string;
  name: string;
  code: string;
  description: string | null;
  category: SubjectCategory;
  teacherId: string;
  classId: string;
  creditHours: number;
  orderIndex: number;
  createdAt: Date;
  updatedAt: Date;
  teacher: {
    id: string;
    teacherId: string;
    specialization: string | null;
    user: {
      id: string;
      name: string;
      email: string;
      image: string | null;
    };
  };
  class: {
    id: string;
    name: string;
    code: string;
    level: string;
    academicYear: string;
  };
  materials: SubjectMaterial[];
  assignments: AssignmentSummary[];
  grades: GradeSummary[];
}

export interface SubjectMaterial {
  id: string;
  title: string;
  description: string | null;
  type: string;
  fileUrl: string;
  fileSize: number | null;
  fileType: string | null;
  chapter: string | null;
  lessonNumber: number | null;
  createdAt: Date;
}

export interface AssignmentSummary {
  id: string;
  title: string;
  dueDate: Date;
  totalMarks: number;
  type: string;
  submissions: number;
}

export interface GradeSummary {
  id: string;
  studentId: string;
  score: number;
  totalScore: number;
  percentage: number;
  studentName: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  totalPages: number;
  limit: number;
}

export interface SubjectStats {
  totalSubjects: number;
  byCategory: Record<SubjectCategory, number>;
  byClass: { className: string; count: number }[];
  byTeacher: { teacherName: string; count: number }[];
  totalMaterials: number;
  totalAssignments: number;
  averageGrade: number;
}

// ==================== READ OPERATIONS ====================

/**
 * Get paginated list of subjects with filters
 */
export async function getSubjects(
  filters: SubjectFilters = {},
): Promise<PaginatedResponse<SubjectWithRelations>> {
  const {
    search,
    category,
    teacherId,
    classId,
    page = 1,
    limit = 20,
  } = filters;

  const skip = (page - 1) * limit;

  // Build where clause
  const where: Prisma.SubjectWhereInput = {};

  if (search) {
    where.OR = [
      { name: { contains: search, mode: "insensitive" } },
      { code: { contains: search, mode: "insensitive" } },
      { description: { contains: search, mode: "insensitive" } },
    ];
  }

  if (category) {
    where.category = category;
  }

  if (teacherId) {
    where.teacherId = teacherId;
  }

  if (classId) {
    where.classId = classId;
  }

  try {
    const [subjects, total] = await Promise.all([
      prisma.subject.findMany({
        where,
        skip,
        take: limit,
        orderBy: [{ classId: "asc" }, { orderIndex: "asc" }, { name: "asc" }],
        include: {
          teacher: {
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
          class: {
            select: {
              id: true,
              name: true,
              code: true,
              level: true,
              academicYear: true,
            },
          },
          materials: {
            orderBy: { createdAt: "desc" },
            take: 5,
          },
          assignments: {
            select: {
              id: true,
              title: true,
              dueDate: true,
              totalMarks: true,
              type: true,
              _count: {
                select: { submissions: true },
              },
            },
            take: 5,
          },
        },
      }),
      prisma.subject.count({ where }),
    ]);

    // Format assignments with submission count
    const formattedSubjects = subjects.map((subject) => ({
      ...subject,
      assignments: subject.assignments.map((assignment) => ({
        id: assignment.id,
        title: assignment.title,
        dueDate: assignment.dueDate,
        totalMarks: assignment.totalMarks,
        type: assignment.type,
        submissions: assignment._count.submissions,
      })),
    }));

    return {
      data: formattedSubjects as unknown as SubjectWithRelations[],
      total,
      page,
      totalPages: Math.ceil(total / limit),
      limit,
    };
  } catch (error) {
    console.error("Error fetching subjects:", error);
    throw new Error("Failed to fetch subjects");
  }
}

/**
 * Get subject by ID with full details
 */
export async function getSubjectById(
  id: string,
): Promise<SubjectWithRelations | null> {
  try {
    const subject = await prisma.subject.findUnique({
      where: { id },
      include: {
        teacher: {
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
        materials: {
          orderBy: { createdAt: "desc" },
        },
        assignments: {
          include: {
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
          },
          orderBy: { dueDate: "asc" },
        },
        grades: {
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
          orderBy: { assessmentDate: "desc" },
          take: 20,
        },
      },
    });

    if (!subject) return null;

    // Format grades with student names
    const formattedGrades = subject.grades.map((grade) => ({
      id: grade.id,
      studentId: grade.studentId,
      score: grade.score,
      totalScore: grade.totalScore,
      percentage: grade.percentage,
      studentName: grade.student.user.name,
    }));

    return {
        ...subject,
        grades: formattedGrades,
    } as unknown as SubjectWithRelations;
  } catch (error) {
    console.error("Error fetching subject:", error);
    throw new Error("Failed to fetch subject");
  }
}

/**
 * Get subjects by class
 */
export async function getSubjectsByClass(
  classId: string,
): Promise<SubjectWithRelations[]> {
  try {
    const subjects = await prisma.subject.findMany({
      where: { classId },
      orderBy: { orderIndex: "asc" },
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
        materials: {
          select: { id: true, title: true, type: true },
        },
        assignments: {
          select: { id: true, title: true, dueDate: true },
        },
      },
    });

    return subjects as unknown as SubjectWithRelations[];
  } catch (error) {
    console.error("Error fetching subjects by class:", error);
    throw new Error("Failed to fetch subjects by class");
  }
}

/**
 * Get subjects by teacher
 */
export async function getSubjectsByTeacher(
  teacherId: string,
): Promise<SubjectWithRelations[]> {
  try {
    const subjects = await prisma.subject.findMany({
      where: { teacherId },
      orderBy: { createdAt: "desc" },
      include: {
        class: {
          select: {
            id: true,
            name: true,
            code: true,
            level: true,
          },
        },
        materials: {
          select: { id: true, title: true },
        },
      },
    });

    return subjects as SubjectWithRelations[];
  } catch (error) {
    console.error("Error fetching subjects by teacher:", error);
    throw new Error("Failed to fetch subjects by teacher");
  }
}

/**
 * Get subject statistics
 */
export async function getSubjectStats(): Promise<SubjectStats> {
  try {
    const [
      totalSubjects,
      byCategory,
      byClass,
      byTeacher,
      totalMaterials,
      totalAssignments,
      averageGrade,
    ] = await Promise.all([
      prisma.subject.count(),
      prisma.subject.groupBy({
        by: ["category"],
        _count: true,
      }),
      prisma.subject.groupBy({
        by: ["classId"],
        _count: true,
        orderBy: { _count: { classId: "desc" } },
        take: 5,
      }),
      prisma.subject.groupBy({
        by: ["teacherId"],
        _count: true,
        orderBy: { _count: { teacherId: "desc" } },
        take: 5,
      }),
      prisma.subjectMaterial.count(),
      prisma.assignment.count(),
      prisma.grade.aggregate({
        _avg: { percentage: true },
      }),
    ]);

    // Format category counts
    const categoryCounts = {} as Record<SubjectCategory, number>;
    byCategory.forEach((item) => {
      categoryCounts[item.category] = item._count;
    });

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

    // Get teacher names for byTeacher stats
    const teacherStats = await Promise.all(
      byTeacher.map(async (item) => {
        const teacher = await prisma.teacher.findUnique({
          where: { id: item.teacherId },
          include: {
            user: {
              select: { name: true },
            },
          },
        });
        return {
          teacherName: teacher?.user.name || "Unknown",
          count: item._count,
        };
      }),
    );

    return {
      totalSubjects,
      byCategory: categoryCounts,
      byClass: classStats,
      byTeacher: teacherStats,
      totalMaterials,
      totalAssignments,
      averageGrade: averageGrade._avg.percentage || 0,
    };
  } catch (error) {
    console.error("Error fetching subject stats:", error);
    throw new Error("Failed to fetch subject stats");
  }
}

/**
 * Get available categories
 */
export async function getSubjectCategories(): Promise<string[]> {
  return Object.values(SubjectCategory);
}

/**
 * Check if subject code exists
 */
export async function isSubjectCodeExists(code: string): Promise<boolean> {
  try {
    const subject = await prisma.subject.findUnique({
      where: { code },
      select: { id: true },
    });
    return !!subject;
  } catch (error) {
    console.error("Error checking subject code:", error);
    throw new Error("Failed to check subject code");
  }
}

// ==================== WRITE OPERATIONS ====================

export interface CreateSubjectInput {
  name: string;
  code: string;
  description?: string;
  category: SubjectCategory;
  teacherId: string;
  classId: string;
  creditHours?: number;
  orderIndex?: number;
}

/**
 * Create a new subject
 */
export async function createSubject(
  input: CreateSubjectInput,
): Promise<SubjectWithRelations> {
  const {
    name,
    code,
    description,
    category,
    teacherId,
    classId,
    creditHours = 1,
    orderIndex = 0,
  } = input;

  try {
    // Check if subject code already exists
    const existingSubject = await prisma.subject.findUnique({
      where: { code },
    });

    if (existingSubject) {
      throw new Error("Subject with this code already exists");
    }

    // Check if class exists
    const classData = await prisma.class.findUnique({
      where: { id: classId },
    });

    if (!classData) {
      throw new Error("Class not found");
    }

    // Check if teacher exists
    const teacher = await prisma.teacher.findUnique({
      where: { id: teacherId },
    });

    if (!teacher) {
      throw new Error("Teacher not found");
    }

    const subject = await prisma.subject.create({
      data: {
        name,
        code,
        description,
        category,
        teacherId,
        classId,
        creditHours,
        orderIndex,
      },
      include: {
        teacher: {
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
        class: {
          select: {
            id: true,
            name: true,
            code: true,
            level: true,
            academicYear: true,
          },
        },
        materials: true,
      },
    });

    revalidatePath(`/dashboard/admin/classes/${classId}`);
    revalidatePath("/dashboard/admin/subjects");
    return subject as unknown as SubjectWithRelations;
  } catch (error) {
    console.error("Error creating subject:", error);
    throw error;
  }
}

export interface UpdateSubjectInput {
  name?: string;
  description?: string;
  category?: SubjectCategory;
  teacherId?: string;
  creditHours?: number;
  orderIndex?: number;
}

/**
 * Update subject
 */
export async function updateSubject(
  id: string,
  input: UpdateSubjectInput,
): Promise<SubjectWithRelations> {
  try {
    const subject = await prisma.subject.update({
      where: { id },
      data: input,
      include: {
        teacher: {
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
        class: {
          select: {
            id: true,
            name: true,
            code: true,
            level: true,
            academicYear: true,
          },
        },
        materials: true,
      },
    });

    revalidatePath(`/dashboard/admin/subjects/${id}`);
    revalidatePath(`/dashboard/admin/classes/${subject.classId}`);
    revalidatePath("/dashboard/admin/subjects");
    return subject as unknown as SubjectWithRelations;
  } catch (error) {
    console.error("Error updating subject:", error);
    throw new Error("Failed to update subject");
  }
}

/**
 * Delete subject
 */
export async function deleteSubject(id: string): Promise<void> {
  try {
    const subject = await prisma.subject.findUnique({
      where: { id },
      select: { classId: true },
    });

    if (!subject) {
      throw new Error("Subject not found");
    }

    await prisma.subject.delete({
      where: { id },
    });

    revalidatePath(`/dashboard/admin/classes/${subject.classId}`);
    revalidatePath("/dashboard/admin/subjects");
  } catch (error) {
    console.error("Error deleting subject:", error);
    throw new Error("Failed to delete subject");
  }
}

// ==================== MATERIAL OPERATIONS ====================

export interface CreateMaterialInput {
  subjectId: string;
  title: string;
  description?: string;
  type: MaterialType;
  fileUrl: string;
  fileSize?: number;
  fileType?: string;
  chapter?: string;
  lessonNumber?: number;
  uploadedById: string;
}

/**
 * Add material to subject
 */
export async function addSubjectMaterial(
  input: CreateMaterialInput,
): Promise<SubjectMaterial> {
  const {
    subjectId,
    title,
    description,
    type,
    fileUrl,
    fileSize,
    fileType,
    chapter,
    lessonNumber,
    uploadedById,
  } = input;

  try {
    const material = await prisma.subjectMaterial.create({
      data: {
        subjectId,
        title,
        description,
        type,
        fileUrl,
        fileSize,
        fileType,
        chapter,
        lessonNumber,
        uploadedById,
      },
    });

    revalidatePath(`/dashboard/admin/subjects/${subjectId}`);
    return material;
  } catch (error) {
    console.error("Error adding subject material:", error);
    throw new Error("Failed to add subject material");
  }
}

/**
 * Delete subject material
 */
export async function deleteSubjectMaterial(id: string): Promise<void> {
  try {
    const material = await prisma.subjectMaterial.findUnique({
      where: { id },
      select: { subjectId: true },
    });

    if (!material) {
      throw new Error("Material not found");
    }

    await prisma.subjectMaterial.delete({
      where: { id },
    });

    revalidatePath(`/dashboard/admin/subjects/${material.subjectId}`);
  } catch (error) {
    console.error("Error deleting subject material:", error);
    throw new Error("Failed to delete subject material");
  }
}

// ==================== BULK OPERATIONS ====================

/**
 * Bulk create subjects for a class
 */
export async function bulkCreateSubjects(
  subjects: CreateSubjectInput[],
): Promise<number> {
  let successCount = 0;

  try {
    for (const subject of subjects) {
      try {
        await createSubject(subject);
        successCount++;
      } catch (error) {
        console.error(`Failed to create subject ${subject.name}:`, error);
      }
    }

    if (subjects.length > 0 && subjects[0].classId) {
      revalidatePath(`/dashboard/admin/classes/${subjects[0].classId}`);
    }
    revalidatePath("/dashboard/admin/subjects");
    return successCount;
  } catch (error) {
    console.error("Error bulk creating subjects:", error);
    throw new Error("Failed to bulk create subjects");
  }
}

/**
 * Bulk delete subjects
 */
export async function bulkDeleteSubjects(ids: string[]): Promise<number> {
  try {
    const result = await prisma.subject.deleteMany({
      where: { id: { in: ids } },
    });

    revalidatePath("/dashboard/admin/subjects");
    return result.count;
  } catch (error) {
    console.error("Error bulk deleting subjects:", error);
    throw new Error("Failed to bulk delete subjects");
  }
}

/**
 * Reorder subjects in a class
 */
export async function reorderSubjects(
  subjectOrders: { id: string; orderIndex: number }[],
): Promise<void> {
  try {
    await prisma.$transaction(
      subjectOrders.map(({ id, orderIndex }) =>
        prisma.subject.update({
          where: { id },
          data: { orderIndex },
        }),
      ),
    );

    if (subjectOrders.length > 0) {
      const firstSubject = await prisma.subject.findUnique({
        where: { id: subjectOrders[0].id },
        select: { classId: true },
      });
      if (firstSubject?.classId) {
        revalidatePath(`/dashboard/admin/classes/${firstSubject.classId}`);
      }
    }
    revalidatePath("/dashboard/admin/subjects");
  } catch (error) {
    console.error("Error reordering subjects:", error);
    throw new Error("Failed to reorder subjects");
  }
}

// ==================== HELPER FUNCTIONS ====================

/**
 * Get available teachers for dropdown
 */
export async function getAvailableTeachers(): Promise<
  { id: string; name: string; specialization: string | null }[]
> {
  try {
    const teachers = await prisma.teacher.findMany({
      where: { isAvailable: true },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
      orderBy: { user: { name: "asc" } },
    });

    return teachers.map((teacher) => ({
      id: teacher.id,
      name: teacher.user.name,
      specialization: teacher.specialization,
    }));
  } catch (error) {
    console.error("Error fetching available teachers:", error);
    throw new Error("Failed to fetch available teachers");
  }
}

/**
 * Get available classes for dropdown
 */
export async function getAvailableClasses(): Promise<
  { id: string; name: string; code: string; level: string }[]
> {
  try {
    const classes = await prisma.class.findMany({
      where: { isActive: true },
      select: {
        id: true,
        name: true,
        code: true,
        level: true,
      },
      orderBy: { name: "asc" },
    });

    return classes;
  } catch (error) {
    console.error("Error fetching available classes:", error);
    throw new Error("Failed to fetch available classes");
  }
}
