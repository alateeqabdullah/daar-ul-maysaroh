// // app/(portal)/dashboard/admin/actions/classes.ts
// "use server";

// import { prisma } from "@/lib/prisma";
// import { revalidatePath } from "next/cache";
// import {
//   ScheduleType,
//   MeetingPlatform,
//   EnrollmentType,
//   SubjectCategory,
// } from "@/app/generated/prisma/enums";
// import { Prisma, Subject } from "@/app/generated/prisma/client";

// // ==================== TYPES ====================

// type EnrollmentStatusType = "ACTIVE" | "COMPLETED" | "DROPPED" | "SUSPENDED" | "FAILED";

// export interface ClassFilters {
//   search?: string;
//   teacherId?: string;
//   level?: string;
//   academicYear?: string;
//   isActive?: boolean;
//   page?: number;
//   limit?: number;
// }

// export interface ClassWithRelations {
//   id: string;
//   name: string;
//   code: string;
//   description: string | null;
//   level: string;
//   section: string | null;
//   capacity: number;
//   currentEnrollment: number;
//   academicYear: string;
//   term: string | null;
//   scheduleType: ScheduleType;
//   isActive: boolean;
//   startDate: Date | null;
//   endDate: Date | null;
//   createdAt: Date;
//   updatedAt: Date;
//   teacher: {
//     id: string;
//     user: {
//       name: string;
//       email: string;
//       image: string | null;
//     };
//     specialization: string | null;
//   };
//   createdBy: {
//     id: string;
//     name: string;
//     email: string;
//   };
//   schedules: ClassSchedule[];
//   enrollments: EnrollmentSummary[];
//   subjects: SubjectSummary[];
//   studentGroups: GroupSummary[];
// }

// export interface ClassSchedule {
//   id: string;
//   dayOfWeek: number;
//   startTime: string;
//   endTime: string;
//   timezone: string;
//   isLive: boolean;
//   meetingPlatform: MeetingPlatform;
//   meetingUrl: string | null;
//   meetingId: string | null;
//   meetingPassword: string | null;
//   isRecurring: boolean;
//   recurrenceRule: string | null;
// }

// export interface EnrollmentSummary {
//   id: string;
//   studentId: string;
//   studentName: string;
//   studentEmail: string;
//   enrolledAt: Date;
//   status: string;
//   progress: number | null;
// }

// export interface SubjectSummary {
//   id: string;
//   name: string;
//   code: string;
//   category: SubjectCategory;
//   teacherId: string;
//   teacherName: string;
// }

// export interface GroupSummary {
//   id: string;
//   name: string;
//   type: string;
//   memberCount: number;
// }

// export interface PaginatedResponse<T> {
//   data: T[];
//   total: number;
//   page: number;
//   totalPages: number;
//   limit: number;
// }

// // ==================== READ OPERATIONS ====================

// export async function getClasses(
//   filters: ClassFilters = {},
// ): Promise<PaginatedResponse<ClassWithRelations>> {
//   const {
//     search,
//     teacherId,
//     level,
//     academicYear,
//     isActive = true,
//     page = 1,
//     limit = 20,
//   } = filters;

//   const skip = (page - 1) * limit;

//   const where: Prisma.ClassWhereInput = { isActive }; // Import Prisma types

//   if (search) {
//     where.OR = [
//       { name: { contains: search, mode: "insensitive" } },
//       { code: { contains: search, mode: "insensitive" } },
//       { description: { contains: search, mode: "insensitive" } },
//     ];
//   }

//   if (teacherId) {
//     where.teacherId = teacherId;
//   }

//   if (level) {
//     where.level = level;
//   }

//   if (academicYear) {
//     where.academicYear = academicYear;
//   }

//   try {
//     const [classes, total] = await Promise.all([
//       prisma.class.findMany({
//         where,
//         skip,
//         take: limit,
//         orderBy: [{ academicYear: "desc" }, { name: "asc" }],
//         include: {
//           teacher: {
//             include: {
//               user: {
//                 select: {
//                   name: true,
//                   email: true,
//                   image: true,
//                 },
//               },
//             },
//           },
//           createdBy: {
//             select: {
//               id: true,
//               name: true,
//               email: true,
//             },
//           },
//           schedules: true,
//           enrollments: {
//             include: {
//               student: {
//                 include: {
//                   user: {
//                     select: {
//                       name: true,
//                       email: true,
//                     },
//                   },
//                 },
//               },
//             },
//             take: 5,
//             orderBy: { enrolledAt: "desc" },
//           },
//           subjects: {
//             include: {
//               teacher: {
//                 include: {
//                   user: {
//                     select: { name: true },
//                   },
//                 },
//               },
//             },
//           },
//           studentGroups: true,
//         },
//       }),
//       prisma.class.count({ where }),
//     ]);

//     const formattedClasses = classes.map((cls) => ({
//       ...cls,
//       enrollments: cls.enrollments.map((enrollment) => ({
//         id: enrollment.id,
//         studentId: enrollment.student.id,
//         studentName: enrollment.student.user.name,
//         studentEmail: enrollment.student.user.email,
//         enrolledAt: enrollment.enrolledAt,
//         status: enrollment.status,
//         progress: enrollment.progress,
//       })),
//       subjects: cls.subjects.map((subject) => ({
//         id: subject.id,
//         name: subject.name,
//         code: subject.code,
//         category: subject.category,
//         teacherId: subject.teacherId,
//         teacherName: subject.teacher.user.name,
//       })),
//       studentGroups: cls.studentGroups.map((group) => ({
//         id: group.id,
//         name: group.name,
//         type: group.type,
//         memberCount: group.currentCount,
//       })),
//     }));

//     return {
//       data: formattedClasses as ClassWithRelations[],
//       total,
//       page,
//       totalPages: Math.ceil(total / limit),
//       limit,
//     };
//   } catch (error) {
//     console.error("Error fetching classes:", error);
//     throw new Error("Failed to fetch classes");
//   }
// }

// export async function getClassById(
//   id: string,
// ): Promise<ClassWithRelations | null> {
//   try {
//     const classData = await prisma.class.findUnique({
//       where: { id },
//       include: {
//         teacher: {
//           include: {
//             user: {
//               select: {
//                 name: true,
//                 email: true,
//                 image: true,
//               },
//             },
//           },
//         },
//         createdBy: {
//           select: {
//             id: true,
//             name: true,
//             email: true,
//           },
//         },
//         schedules: {
//           orderBy: { dayOfWeek: "asc" },
//         },
//         enrollments: {
//           include: {
//             student: {
//               include: {
//                 user: {
//                   select: {
//                     name: true,
//                     email: true,
//                   },
//                 },
//               },
//             },
//           },
//           orderBy: { enrolledAt: "desc" },
//         },
//         subjects: {
//           include: {
//             teacher: {
//               include: {
//                 user: {
//                   select: { name: true },
//                 },
//               },
//             },
//           },
//         },
//         studentGroups: {
//           include: {
//             members: {
//               include: {
//                 student: {
//                   include: {
//                     user: {
//                       select: { name: true },
//                     },
//                   },
//                 },
//               },
//             },
//           },
//         },
//         announcements: {
//           orderBy: { createdAt: "desc" },
//           take: 10,
//         },
//         materials: {
//           orderBy: { createdAt: "desc" },
//           take: 10,
//         },
//         attendances: {
//           orderBy: { date: "desc" },
//           take: 10,
//         },
//       },
//     });

//     if (!classData) return null;

//     return {
//       ...classData,
//       enrollments: classData.enrollments.map((enrollment) => ({
//         id: enrollment.id,
//         studentId: enrollment.student.id,
//         studentName: enrollment.student.user.name,
//         studentEmail: enrollment.student.user.email,
//         enrolledAt: enrollment.enrolledAt,
//         status: enrollment.status,
//         progress: enrollment.progress,
//       })),
//       subjects: classData.subjects.map((subject) => ({
//         id: subject.id,
//         name: subject.name,
//         code: subject.code,
//         category: subject.category,
//         teacherId: subject.teacherId,
//         teacherName: subject.teacher.user.name,
//       })),
//       studentGroups: classData.studentGroups.map((group) => ({
//         id: group.id,
//         name: group.name,
//         type: group.type,
//         memberCount: group.members.length,
//       })),
//     } as ClassWithRelations;
//   } catch (error) {
//     console.error("Error fetching class:", error);
//     throw new Error("Failed to fetch class");
//   }
// }

// export async function getClassByCode(
//   code: string,
// ): Promise<ClassWithRelations | null> {
//   try {
//     const classData = await prisma.class.findUnique({
//       where: { code },
//       include: {
//         teacher: {
//           include: {
//             user: {
//               select: {
//                 name: true,
//                 email: true,
//                 image: true,
//               },
//             },
//           },
//         },
//         schedules: true,
//         enrollments: {
//           take: 5,
//         },
//       },
//     });

//     return classData as ClassWithRelations | null;
//   } catch (error) {
//     console.error("Error fetching class by code:", error);
//     throw new Error("Failed to fetch class");
//   }
// }

// export async function getClassesByTeacher(
//   teacherId: string,
// ): Promise<ClassWithRelations[]> {
//   try {
//     const classes = await prisma.class.findMany({
//       where: { teacherId, isActive: true },
//       orderBy: { name: "asc" },
//       include: {
//         schedules: true,
//         enrollments: {
//           select: { id: true },
//         },
//       },
//     });

//     return classes as unknown as ClassWithRelations[];
//   } catch (error) {
//     console.error("Error fetching classes by teacher:", error);
//     throw new Error("Failed to fetch classes");
//   }
// }

// export async function getClassesByStudent(
//   studentId: string,
// ): Promise<ClassWithRelations[]> {
//   try {
//     const enrollments = await prisma.enrollment.findMany({
//       where: { studentId, status: "ACTIVE" },
//       include: {
//         class: {
//           include: {
//             teacher: {
//               include: {
//                 user: {
//                   select: {
//                     name: true,
//                     email: true,
//                   },
//                 },
//               },
//             },
//             schedules: true,
//           },
//         },
//       },
//     });

//     return enrollments.map((e) => e.class as unknown as ClassWithRelations);
//   } catch (error) {
//     console.error("Error fetching classes by student:", error);
//     throw new Error("Failed to fetch classes");
//   }
// }

// // ==================== WRITE OPERATIONS ====================

// export interface CreateClassInput {
//   name: string;
//   code: string;
//   description?: string;
//   level: string;
//   section?: string;
//   capacity?: number;
//   academicYear: string;
//   term?: string;
//   scheduleType?: ScheduleType;
//   teacherId: string;
//   createdById: string;
//   startDate?: Date;
//   endDate?: Date;
// }

// export async function createClass(
//   input: CreateClassInput,
// ): Promise<ClassWithRelations> {
//   const {
//     name,
//     code,
//     description,
//     level,
//     section,
//     capacity = 20,
//     academicYear,
//     term,
//     scheduleType = "REGULAR",
//     teacherId,
//     createdById,
//     startDate,
//     endDate,
//   } = input;

//   try {
//     const existingClass = await prisma.class.findUnique({
//       where: { code },
//     });

//     if (existingClass) {
//       throw new Error("Class with this code already exists");
//     }

//     const newClass = await prisma.class.create({
//       data: {
//         name,
//         code,
//         description,
//         level,
//         section,
//         capacity,
//         academicYear,
//         term,
//         scheduleType,
//         teacherId,
//         createdById,
//         startDate,
//         endDate,
//         currentEnrollment: 0,
//       },
//       include: {
//         teacher: {
//           include: {
//             user: {
//               select: {
//                 name: true,
//                 email: true,
//                 image: true,
//               },
//             },
//           },
//         },
//         createdBy: {
//           select: {
//             id: true,
//             name: true,
//             email: true,
//           },
//         },
//         schedules: true,
//       },
//     });

//     revalidatePath("/dashboard/admin/classes");
//     return newClass as unknown as ClassWithRelations;
//   } catch (error) {
//     console.error("Error creating class:", error);
//     throw error;
//   }
// }

// export interface UpdateClassInput {
//   name?: string;
//   description?: string;
//   level?: string;
//   section?: string;
//   capacity?: number;
//   academicYear?: string;
//   term?: string;
//   scheduleType?: ScheduleType;
//   teacherId?: string;
//   startDate?: Date;
//   endDate?: Date;
//   isActive?: boolean;
// }

// export async function updateClass(
//   id: string,
//   input: UpdateClassInput,
// ): Promise<ClassWithRelations> {
//   try {
//     const updatedClass = await prisma.class.update({
//       where: { id },
//       data: input,
//       include: {
//         teacher: {
//           include: {
//             user: {
//               select: {
//                 name: true,
//                 email: true,
//                 image: true,
//               },
//             },
//           },
//         },
//         schedules: true,
//       },
//     });

//     revalidatePath(`/dashboard/admin/classes/${id}`);
//     revalidatePath("/dashboard/admin/classes");
//     return updatedClass as unknown as ClassWithRelations;
//   } catch (error) {
//     console.error("Error updating class:", error);
//     throw new Error("Failed to update class");
//   }
// }

// export async function deleteClass(id: string): Promise<void> {
//   try {
//     await prisma.class.update({
//       where: { id },
//       data: { isActive: false },
//     });

//     revalidatePath("/dashboard/admin/classes");
//   } catch (error) {
//     console.error("Error deleting class:", error);
//     throw new Error("Failed to delete class");
//   }
// }

// export async function hardDeleteClass(id: string): Promise<void> {
//   try {
//     await prisma.class.delete({
//       where: { id },
//     });

//     revalidatePath("/dashboard/admin/classes");
//   } catch (error) {
//     console.error("Error permanently deleting class:", error);
//     throw new Error("Failed to permanently delete class");
//   }
// }

// // ==================== SCHEDULE OPERATIONS ====================

// export interface CreateScheduleInput {
//   classId: string;
//   dayOfWeek: number;
//   startTime: string;
//   endTime: string;
//   timezone?: string;
//   isLive?: boolean;
//   meetingPlatform?: MeetingPlatform;
//   meetingUrl?: string;
//   meetingId?: string;
//   meetingPassword?: string;
//   isRecurring?: boolean;
//   recurrenceRule?: string;
// }

// export async function addClassSchedule(
//   input: CreateScheduleInput,
// ): Promise<ClassSchedule> {
//   const {
//     classId,
//     dayOfWeek,
//     startTime,
//     endTime,
//     timezone = "UTC",
//     isLive = true,
//     meetingPlatform = "ZOOM",
//     meetingUrl,
//     meetingId,
//     meetingPassword,
//     isRecurring = true,
//     recurrenceRule,
//   } = input;

//   try {
//     const existingSchedule = await prisma.classSchedule.findFirst({
//       where: {
//         classId,
//         dayOfWeek,
//         startTime,
//       },
//     });

//     if (existingSchedule) {
//       throw new Error("A schedule already exists for this day and time");
//     }

//     const schedule = await prisma.classSchedule.create({
//       data: {
//         classId,
//         dayOfWeek,
//         startTime,
//         endTime,
//         timezone,
//         isLive,
//         meetingPlatform,
//         meetingUrl,
//         meetingId,
//         meetingPassword,
//         isRecurring,
//         recurrenceRule,
//       },
//     });

//     revalidatePath(`/dashboard/admin/classes/${classId}`);
//     return schedule;
//   } catch (error) {
//     console.error("Error adding schedule:", error);
//     throw error;
//   }
// }

// export async function updateClassSchedule(
//   id: string,
//   input: Partial<CreateScheduleInput>,
// ): Promise<ClassSchedule> {
//   try {
//     const schedule = await prisma.classSchedule.update({
//       where: { id },
//       data: input,
//     });

//     revalidatePath(`/dashboard/admin/classes/${schedule.classId}`);
//     return schedule;
//   } catch (error) {
//     console.error("Error updating schedule:", error);
//     throw new Error("Failed to update schedule");
//   }
// }

// export async function deleteClassSchedule(id: string): Promise<void> {
//   try {
//     const schedule = await prisma.classSchedule.findUnique({
//       where: { id },
//       select: { classId: true },
//     });

//     await prisma.classSchedule.delete({
//       where: { id },
//     });

//     if (schedule) {
//       revalidatePath(`/dashboard/admin/classes/${schedule.classId}`);
//     }
//   } catch (error) {
//     console.error("Error deleting schedule:", error);
//     throw new Error("Failed to delete schedule");
//   }
// }

// // ==================== ENROLLMENT OPERATIONS ====================

// export interface EnrollStudentInput {
//   studentId: string;
//   classId: string;
//   enrollmentType?: "REGULAR" | "TRIAL" | "AUDIT" | "MAKEUP";
// }

// export async function enrollStudent(input: EnrollStudentInput): Promise<void> {
//   const { studentId, classId, enrollmentType = "REGULAR" } = input;

//   try {
//     const existingEnrollment = await prisma.enrollment.findUnique({
//       where: {
//         studentId_classId: {
//           studentId,
//           classId,
//         },
//       },
//     });

//     if (existingEnrollment) {
//       throw new Error("Student is already enrolled in this class");
//     }

//     const classData = await prisma.class.findUnique({
//       where: { id: classId },
//       select: { capacity: true, currentEnrollment: true },
//     });

//     if (classData && classData.currentEnrollment >= classData.capacity) {
//       throw new Error("Class has reached maximum capacity");
//     }

//     await prisma.$transaction([
//       prisma.enrollment.create({
//         data: {
//           studentId,
//           classId,
//           enrollmentType,
//         },
//       }),
//       prisma.class.update({
//         where: { id: classId },
//         data: { currentEnrollment: { increment: 1 } },
//       }),
//     ]);

//     revalidatePath(`/dashboard/admin/classes/${classId}`);
//     revalidatePath("/dashboard/admin/enrollments");
//   } catch (error) {
//     console.error("Error enrolling student:", error);
//     throw error;
//   }
// }

// export async function removeStudentFromClass(
//   studentId: string,
//   classId: string,
// ): Promise<void> {
//   try {
//     await prisma.$transaction([
//       prisma.enrollment.delete({
//         where: {
//           studentId_classId: {
//             studentId,
//             classId,
//           },
//         },
//       }),
//       prisma.class.update({
//         where: { id: classId },
//         data: { currentEnrollment: { decrement: 1 } },
//       }),
//     ]);

//     revalidatePath(`/dashboard/admin/classes/${classId}`);
//     revalidatePath("/dashboard/admin/enrollments");
//   } catch (error) {
//     console.error("Error removing student from class:", error);
//     throw new Error("Failed to remove student from class");
//   }
// }

// export async function updateEnrollmentStatus(
//   studentId: string,
//   classId: string,
//   // status: "ACTIVE" | "COMPLETED" | "DROPPED" | "SUSPENDED" | "FAILED",
//   status: EnrollmentStatusType
// ): Promise<void> {
//   try {
//     await prisma.enrollment.update({
//       where: {
//         studentId_classId: {
//           studentId,
//           classId,
//         },
//       },
//       data: { status },
//     });

//     revalidatePath(`/dashboard/admin/classes/${classId}`);
//   } catch (error) {
//     console.error("Error updating enrollment status:", error);
//     throw new Error("Failed to update enrollment status");
//   }
// }

// // ==================== SUBJECT OPERATIONS ====================

// export interface AddSubjectToClassInput {
//   name: string;
//   code: string;
//   category: SubjectCategory;
//   teacherId: string;
//   classId: string;
// }

// export async function addSubjectToClass(
//   input: AddSubjectToClassInput,
// ): Promise<Subject> {
//   const { name, code, category, teacherId, classId } = input;

//   try {
//     const subject = await prisma.subject.create({
//       data: {
//         name,
//         code,
//         category,
//         teacherId,
//         classId,
//       },
//     });

//     revalidatePath(`/dashboard/admin/classes/${classId}`);
//     return subject;
//   } catch (error) {
//     console.error("Error adding subject to class:", error);
//     throw error;
//   }
// }

// export async function removeSubjectFromClass(subjectId: string): Promise<void> {
//   try {
//     const subject = await prisma.subject.findUnique({
//       where: { id: subjectId },
//       select: { classId: true },
//     });

//     await prisma.subject.update({
//       where: { id: subjectId },
//       data: { classId: null },
//     });

//     if (subject?.classId) {
//       revalidatePath(`/dashboard/admin/classes/${subject.classId}`);
//     }
//   } catch (error) {
//     console.error("Error removing subject from class:", error);
//     throw new Error("Failed to remove subject from class");
//   }
// }

// // ==================== HELPER FUNCTIONS ====================

// export async function getClassLevels(): Promise<string[]> {
//   try {
//     const levels = await prisma.class.findMany({
//       select: {
//         level: true,
//       },
//       distinct: ["level"],
//       orderBy: {
//         level: "asc",
//       },
//     });

//     const levelValues = levels.map((l) => l.level).filter(Boolean);

//     if (levelValues.length > 0) {
//       return levelValues;
//     }

//     return ["Beginner", "Intermediate", "Advanced", "Expert"];
//   } catch (error) {
//     console.error("Error fetching class levels:", error);
//     return ["Beginner", "Intermediate", "Advanced", "Expert"];
//   }
// }

// export async function getAcademicYears(): Promise<string[]> {
//   try {
//     const years = await prisma.class.findMany({
//       select: {
//         academicYear: true,
//       },
//       distinct: ["academicYear"],
//       orderBy: {
//         academicYear: "desc",
//       },
//     });

//     const yearValues = years.map((y) => y.academicYear).filter(Boolean);

//     if (yearValues.length > 0) {
//       return yearValues;
//     }

//     return ["2024-2025", "2025-2026"];
//   } catch (error) {
//     console.error("Error fetching academic years:", error);
//     return ["2024-2025", "2025-2026"];
//   }
// }

// export async function isClassCodeExists(code: string): Promise<boolean> {
//   try {
//     const classData = await prisma.class.findUnique({
//       where: { code },
//       select: { id: true },
//     });
//     return !!classData;
//   } catch (error) {
//     console.error("Error checking class code:", error);
//     throw new Error("Failed to check class code");
//   }
// }

// export async function getClassStats(): Promise<{
//   totalClasses: number;
//   activeClasses: number;
//   totalEnrollments: number;
//   averageClassSize: number;
//   classesByLevel: Record<string, number>;
// }> {
//   try {
//     const [totalClasses, activeClasses, totalEnrollments, classesByLevel] =
//       await Promise.all([
//         prisma.class.count(),
//         prisma.class.count({ where: { isActive: true } }),
//         prisma.enrollment.count({ where: { status: "ACTIVE" } }),
//         prisma.class.groupBy({
//           by: ["level"],
//           _count: true,
//         }),
//       ]);

//     const levelCounts: Record<string, number> = {};
//     classesByLevel.forEach((item) => {
//       levelCounts[item.level] = item._count;
//     });

//     const averageClassSize =
//       activeClasses > 0 ? totalEnrollments / activeClasses : 0;

//     return {
//       totalClasses,
//       activeClasses,
//       totalEnrollments,
//       averageClassSize: Math.round(averageClassSize * 10) / 10,
//       classesByLevel: levelCounts,
//     };
//   } catch (error) {
//     console.error("Error fetching class stats:", error);
//     throw new Error("Failed to fetch class stats");
//   }
// }

// // ==================== BULK OPERATIONS ====================

// export async function bulkActivateClasses(ids: string[]): Promise<number> {
//   try {
//     const result = await prisma.class.updateMany({
//       where: { id: { in: ids } },
//       data: { isActive: true },
//     });

//     revalidatePath("/dashboard/admin/classes");
//     return result.count;
//   } catch (error) {
//     console.error("Error bulk activating classes:", error);
//     throw new Error("Failed to bulk activate classes");
//   }
// }

// export async function bulkDeactivateClasses(ids: string[]): Promise<number> {
//   try {
//     const result = await prisma.class.updateMany({
//       where: { id: { in: ids } },
//       data: { isActive: false },
//     });

//     revalidatePath("/dashboard/admin/classes");
//     return result.count;
//   } catch (error) {
//     console.error("Error bulk deactivating classes:", error);
//     throw new Error("Failed to bulk deactivate classes");
//   }
// }

// export async function bulkDeleteClasses(ids: string[]): Promise<number> {
//   try {
//     const result = await prisma.class.updateMany({
//       where: { id: { in: ids } },
//       data: { isActive: false },
//     });

//     revalidatePath("/dashboard/admin/classes");
//     return result.count;
//   } catch (error) {
//     console.error("Error bulk deleting classes:", error);
//     throw new Error("Failed to bulk delete classes");
//   }
// }







// app/(portal)/dashboard/admin/actions/classes.ts
"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { z } from "zod";
import type { Prisma } from "@/app/generated/prisma";
import type { Subject } from "@/app/generated/prisma";
import {
  ScheduleType,
  MeetingPlatform,
  EnrollmentStatus,
  SubjectCategory,
  EnrollmentType,
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
  category: SubjectCategory;
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

export interface CreateClassInput {
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

export interface UpdateClassInput {
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

export interface CreateScheduleInput {
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

export interface EnrollStudentInput {
  studentId: string;
  classId: string;
  enrollmentType?: EnrollmentType;
}

export interface BulkEnrollInput {
  classId: string;
  studentIds: string[];
  enrollmentType?: EnrollmentType;
}

export interface AddSubjectToClassInput {
  name: string;
  code: string;
  category: SubjectCategory;
  teacherId: string;
  classId: string;
}

// ==================== VALIDATION SCHEMAS ====================

const createClassSchema = z.object({
  name: z.string().min(2).max(100),
  code: z.string().regex(/^[A-Z0-9-]+$/, "Code must contain only uppercase letters, numbers, and hyphens"),
  description: z.string().optional(),
  level: z.string().min(1),
  section: z.string().optional(),
  capacity: z.number().int().min(1).max(100).default(20),
  academicYear: z.string().regex(/^\d{4}-\d{4}$/, "Academic year must be in format YYYY-YYYY"),
  term: z.string().optional(),
  scheduleType: z.nativeEnum(ScheduleType).default(ScheduleType.REGULAR),
  teacherId: z.string().cuid(),
  createdById: z.string().cuid(),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
});

const updateClassSchema = z.object({
  name: z.string().min(2).max(100).optional(),
  description: z.string().optional(),
  level: z.string().min(1).optional(),
  section: z.string().optional(),
  capacity: z.number().int().min(1).max(100).optional(),
  academicYear: z.string().regex(/^\d{4}-\d{4}$/).optional(),
  term: z.string().optional(),
  scheduleType: z.nativeEnum(ScheduleType).optional(),
  teacherId: z.string().cuid().optional(),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  isActive: z.boolean().optional(),
});

const createScheduleSchema = z.object({
  classId: z.string().cuid(),
  dayOfWeek: z.number().int().min(0).max(6),
  startTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/),
  endTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/),
  timezone: z.string().default("UTC"),
  isLive: z.boolean().default(true),
  meetingPlatform: z.nativeEnum(MeetingPlatform).default(MeetingPlatform.ZOOM),
  meetingUrl: z.string().url().optional(),
  meetingId: z.string().optional(),
  meetingPassword: z.string().optional(),
  isRecurring: z.boolean().default(true),
  recurrenceRule: z.string().optional(),
});

const enrollStudentSchema = z.object({
  studentId: z.string().cuid(),
  classId: z.string().cuid(),
  enrollmentType: z.nativeEnum(EnrollmentType).default(EnrollmentType.REGULAR),
});

// ==================== ERROR HANDLER ====================

async function throwError(message: string, code: string, statusCode: number = 400): Promise<never> {
  const error = new Error(message);
  (error as any).code = code;
  (error as any).statusCode = statusCode;
  throw error;
}

// ==================== AUTHENTICATION HELPERS ====================

async function requireAuth() {
  const session = await auth();
  if (!session) {
    await throwError("Unauthorized: Please log in", "UNAUTHORIZED", 401);
  }
  return session;
}

async function requireAdmin() {
  const session = await requireAuth();
  if (session.user?.role !== "ADMIN" && session.user?.role !== "SUPER_ADMIN") {
    await throwError("Unauthorized: Admin access required", "FORBIDDEN", 403);
  }
  return session;
}

async function requireTeacherOrAdmin() {
  const session = await requireAuth();
  if (!["ADMIN", "SUPER_ADMIN", "TEACHER"].includes(session.user?.role || "")) {
    await throwError("Unauthorized: Teacher or admin access required", "FORBIDDEN", 403);
  }
  return session;
}

// ==================== HELPER FUNCTIONS ====================

function formatClassResponse(classData: any): ClassWithRelations {
  return {
    ...classData,
    enrollments: classData.enrollments?.map((e: any) => ({
      id: e.id,
      studentId: e.student.id,
      studentName: e.student.user.name,
      studentEmail: e.student.user.email,
      enrolledAt: e.enrolledAt,
      status: e.status,
      progress: e.progress,
    })) || [],
    subjects: classData.subjects?.map((s: any) => ({
      id: s.id,
      name: s.name,
      code: s.code,
      category: s.category,
      teacherId: s.teacherId,
      teacherName: s.teacher.user.name,
    })) || [],
    studentGroups: classData.studentGroups?.map((g: any) => ({
      id: g.id,
      name: g.name,
      type: g.type,
      memberCount: g.currentCount || g.members?.length || 0,
    })) || [],
  };
}

async function logClassActivity(
  action: string,
  classId: string,
  userId: string,
  details?: any
) {
  try {
    await prisma.notification.create({
      data: {
        userId,
        type: "SYSTEM",
        title: `Class ${action}`,
        message: `Class ${action.toLowerCase()}: ${JSON.stringify(details)}`,
        referenceId: classId,
        referenceType: "CLASS",
      },
    });
  } catch (error) {
    console.error("Error logging class activity:", error);
    // Don't throw - logging should not break main functionality
  }
}

// ==================== READ OPERATIONS ====================

export async function getClasses(
  filters: ClassFilters = {},
): Promise<PaginatedResponse<ClassWithRelations>> {
  await requireTeacherOrAdmin();
  
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

  const where: Prisma.ClassWhereInput = { isActive };

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

    const formattedClasses = classes.map(formatClassResponse);

    return {
      data: formattedClasses,
      total,
      page,
      totalPages: Math.ceil(total / limit),
      limit,
    };
  } catch (error) {
    console.error("Error fetching classes:", error);
    await throwError("Failed to fetch classes", "FETCH_ERROR", 500);
  }
}

export async function getClassById(
  id: string,
): Promise<ClassWithRelations | null> {
  await requireTeacherOrAdmin();
  
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

    return formatClassResponse(classData);
  } catch (error) {
    console.error("Error fetching class:", error);
    await throwError("Failed to fetch class", "FETCH_ERROR", 500);
  }
}

export async function getClassByCode(
  code: string,
): Promise<ClassWithRelations | null> {
  await requireTeacherOrAdmin();
  
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

    if (!classData) return null;
    return formatClassResponse(classData);
  } catch (error) {
    console.error("Error fetching class by code:", error);
    await throwError("Failed to fetch class", "FETCH_ERROR", 500);
  }
}

export async function getClassesByTeacher(
  teacherId: string,
): Promise<ClassWithRelations[]> {
  await requireTeacherOrAdmin();
  
  try {
    const classes = await prisma.class.findMany({
      where: { teacherId, isActive: true },
      orderBy: { name: "asc" },
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
          select: { id: true },
        },
        subjects: true,
        studentGroups: true,
        createdBy: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    return classes.map(formatClassResponse);
  } catch (error) {
    console.error("Error fetching classes by teacher:", error);
    await throwError("Failed to fetch classes", "FETCH_ERROR", 500);
  }
}

export async function getClassesByStudent(
  studentId: string,
): Promise<ClassWithRelations[]> {
  const session = await requireAuth();
  
  // Students can only see their own classes
  if (session.user?.role === "STUDENT" && session.user?.id !== studentId) {
    await throwError("Unauthorized: Cannot view other student's classes", "FORBIDDEN", 403);
  }
  
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
            createdBy: {
              select: {
                id: true,
                name: true,
                email: true,
              },
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
        },
      },
    });

    return enrollments.map((e) => formatClassResponse(e.class));
  } catch (error) {
    console.error("Error fetching classes by student:", error);
    await throwError("Failed to fetch classes", "FETCH_ERROR", 500);
  }
}

// ==================== WRITE OPERATIONS ====================

export async function createClass(
  input: CreateClassInput,
): Promise<ClassWithRelations> {
  await requireAdmin();
  
  const validated = createClassSchema.parse(input);
  const {
    name,
    code,
    description,
    level,
    section,
    capacity = 20,
    academicYear,
    term,
    scheduleType = ScheduleType.REGULAR,
    teacherId,
    createdById,
    startDate,
    endDate,
  } = validated;

  try {
    const existingClass = await prisma.class.findUnique({
      where: { code },
    });

    if (existingClass) {
      await throwError("Class with this code already exists", "DUPLICATE_CODE", 409);
    }

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
        enrollments: true,
        subjects: true,
        studentGroups: true,
      },
    });

    // Log activity
    await logClassActivity("CREATED", newClass.id, createdById, { name });

    revalidatePath("/dashboard/admin/classes");
    return formatClassResponse(newClass);
  } catch (error) {
    if (error instanceof Error && (error as any).code) throw error;
    console.error("Error creating class:", error);
    await throwError("Failed to create class", "CREATE_ERROR", 500);
  }
}

export async function updateClass(
  id: string,
  input: UpdateClassInput,
): Promise<ClassWithRelations> {
  await requireAdmin();
  
  const validated = updateClassSchema.parse(input);

  try {
    const updatedClass = await prisma.class.update({
      where: { id },
      data: validated,
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
        enrollments: true,
        subjects: true,
        studentGroups: true,
        createdBy: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    // Log activity
    await logClassActivity("UPDATED", id, updatedClass.createdById, validated);

    revalidatePath(`/dashboard/admin/classes/${id}`);
    revalidatePath("/dashboard/admin/classes");
    return formatClassResponse(updatedClass);
  } catch (error) {
    console.error("Error updating class:", error);
    await throwError("Failed to update class", "UPDATE_ERROR", 500);
  }
}

export async function deleteClass(id: string): Promise<void> {
  await requireAdmin();
  
  try {
    const classData = await prisma.class.findUnique({
      where: { id },
      select: { createdById: true }
    });

    await prisma.class.update({
      where: { id },
      data: { isActive: false },
    });

    // Log activity
    if (classData) {
      await logClassActivity("DEACTIVATED", id, classData.createdById, {});
    }

    revalidatePath("/dashboard/admin/classes");
  } catch (error) {
    console.error("Error deleting class:", error);
    await throwError("Failed to delete class", "DELETE_ERROR", 500);
  }
}

export async function hardDeleteClass(id: string): Promise<void> {
  await requireAdmin();
  
  try {
    const classData = await prisma.class.findUnique({
      where: { id },
      select: { createdById: true }
    });

    await prisma.class.delete({
      where: { id },
    });

    // Log activity
    if (classData) {
      await logClassActivity("PERMANENTLY_DELETED", id, classData.createdById, {});
    }

    revalidatePath("/dashboard/admin/classes");
  } catch (error) {
    console.error("Error permanently deleting class:", error);
    await throwError("Failed to permanently delete class", "DELETE_ERROR", 500);
  }
}

// ==================== SCHEDULE OPERATIONS ====================

export async function addClassSchedule(
  input: CreateScheduleInput,
): Promise<ClassSchedule> {
  await requireAdmin();
  
  const validated = createScheduleSchema.parse(input);
  const {
    classId,
    dayOfWeek,
    startTime,
    endTime,
    timezone = "UTC",
    isLive = true,
    meetingPlatform = MeetingPlatform.ZOOM,
    meetingUrl,
    meetingId,
    meetingPassword,
    isRecurring = true,
    recurrenceRule,
  } = validated;

  try {
    const existingSchedule = await prisma.classSchedule.findFirst({
      where: {
        classId,
        dayOfWeek,
        startTime,
      },
    });

    if (existingSchedule) {
      await throwError("A schedule already exists for this day and time", "DUPLICATE_SCHEDULE", 409);
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
    if (error instanceof Error && (error as any).code) throw error;
    console.error("Error adding schedule:", error);
    await throwError("Failed to add schedule", "CREATE_ERROR", 500);
  }
}

export async function updateClassSchedule(
  id: string,
  input: Partial<CreateScheduleInput>,
): Promise<ClassSchedule> {
  await requireAdmin();
  
  try {
    const schedule = await prisma.classSchedule.update({
      where: { id },
      data: input,
    });

    revalidatePath(`/dashboard/admin/classes/${schedule.classId}`);
    return schedule;
  } catch (error) {
    console.error("Error updating schedule:", error);
    await throwError("Failed to update schedule", "UPDATE_ERROR", 500);
  }
}

export async function deleteClassSchedule(id: string): Promise<void> {
  await requireAdmin();
  
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
    await throwError("Failed to delete schedule", "DELETE_ERROR", 500);
  }
}

// ==================== ENROLLMENT OPERATIONS ====================

export async function enrollStudent(input: EnrollStudentInput): Promise<void> {
  await requireAdmin();
  
  const validated = enrollStudentSchema.parse(input);
  const { studentId, classId, enrollmentType = EnrollmentType.REGULAR } = validated;

  try {
    const existingEnrollment = await prisma.enrollment.findUnique({
      where: {
        studentId_classId: {
          studentId,
          classId,
        },
      },
    });

    if (existingEnrollment) {
      await throwError("Student is already enrolled in this class", "DUPLICATE_ENROLLMENT", 409);
    }

    const classData = await prisma.class.findUnique({
      where: { id: classId },
      select: { capacity: true, currentEnrollment: true, name: true },
    });

    if (!classData) {
      await throwError("Class not found", "NOT_FOUND", 404);
    }

    if (classData && classData.currentEnrollment >= classData.capacity) {
      await throwError("Class has reached maximum capacity", "CLASS_FULL", 409);
    }

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

    // Create notification for student
    await prisma.notification.create({
      data: {
        userId: studentId,
        type: "ANNOUNCEMENT",
        title: "Enrolled in Class",
        message: `You have been enrolled in class ${classData.name}`,
        referenceId: classId,
        referenceType: "CLASS",
      },
    });

    revalidatePath(`/dashboard/admin/classes/${classId}`);
    revalidatePath("/dashboard/admin/enrollments");
  } catch (error) {
    if (error instanceof Error && (error as any).code) throw error;
    console.error("Error enrolling student:", error);
    await throwError("Failed to enroll student", "ENROLLMENT_ERROR", 500);
  }
}

export async function removeStudentFromClass(
  studentId: string,
  classId: string,
): Promise<void> {
  await requireAdmin();
  
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
    await throwError("Failed to remove student from class", "REMOVE_ERROR", 500);
  }
}

export async function updateEnrollmentStatus(
  studentId: string,
  classId: string,
  status: EnrollmentStatus,
): Promise<void> {
  await requireAdmin();
  
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
    await throwError("Failed to update enrollment status", "UPDATE_ERROR", 500);
  }
}

// ==================== SUBJECT OPERATIONS ====================

export async function addSubjectToClass(
  input: AddSubjectToClassInput,
): Promise<Subject> {
  await requireAdmin();
  
  const { name, code, category, teacherId, classId } = input;

  try {
    const existingSubject = await prisma.subject.findUnique({
      where: { code },
    });

    if (existingSubject) {
      await throwError("Subject with this code already exists", "DUPLICATE_CODE", 409);
    }

    const subject = await prisma.subject.create({
      data: {
        name,
        code,
        category,
        teacherId,
        classId,
      },
    });

    revalidatePath(`/dashboard/admin/classes/${classId}`);
    return subject;
  } catch (error) {
    if (error instanceof Error && (error as any).code) throw error;
    console.error("Error adding subject to class:", error);
    await throwError("Failed to add subject", "CREATE_ERROR", 500);
  }
}

export async function removeSubjectFromClass(subjectId: string): Promise<void> {
  await requireAdmin();
  
  try {
    const subject = await prisma.subject.findUnique({
      where: { id: subjectId },
      select: { classId: true },
    });

    await prisma.subject.delete({
      where: { id: subjectId },
    });

    if (subject?.classId) {
      revalidatePath(`/dashboard/admin/classes/${subject.classId}`);
    }
  } catch (error) {
    console.error("Error removing subject from class:", error);
    await throwError("Failed to remove subject", "DELETE_ERROR", 500);
  }
}

// ==================== BULK OPERATIONS ====================

export async function bulkEnrollStudents(
  input: BulkEnrollInput
): Promise<{ success: string[]; failed: { id: string; error: string }[] }> {
  await requireAdmin();
  
  const { classId, studentIds, enrollmentType = EnrollmentType.REGULAR } = input;
  
  const results = { success: [] as string[], failed: [] as { id: string; error: string }[] };
  
  try {
    // Check capacity first
    const classData = await prisma.class.findUnique({
      where: { id: classId },
      select: { capacity: true, currentEnrollment: true, name: true }
    });
    
    if (!classData) {
      await throwError("Class not found", "NOT_FOUND", 404);
    }
    
    const availableSlots = classData.capacity - classData.currentEnrollment;
    
    if (studentIds.length > availableSlots) {
      await throwError(
        `Cannot enroll ${studentIds.length} students. Only ${availableSlots} slots available.`,
        "INSUFFICIENT_CAPACITY",
        409
      );
    }
    
    // Process enrollments
    for (const studentId of studentIds) {
      try {
        await prisma.$transaction([
          prisma.enrollment.create({
            data: { studentId, classId, enrollmentType }
          }),
          prisma.class.update({
            where: { id: classId },
            data: { currentEnrollment: { increment: 1 } }
          }),
          prisma.notification.create({
            data: {
              userId: studentId,
              type: "ANNOUNCEMENT",
              title: "Enrolled in Class",
              message: `You have been enrolled in ${classData.name}`,
              referenceId: classId,
              referenceType: "CLASS",
            },
          })
        ]);
        results.success.push(studentId);
      } catch (error: any) {
        results.failed.push({ 
          id: studentId, 
          error: error.message || "Enrollment failed" 
        });
      }
    }
    
    revalidatePath(`/dashboard/admin/classes/${classId}`);
  } catch (error) {
    if (error instanceof Error && (error as any).code) throw error;
    console.error("Error in bulk enrollment:", error);
    await throwError("Failed to process bulk enrollment", "BULK_ENROLLMENT_ERROR", 500);
  }
  
  return results;
}

export async function bulkActivateClasses(ids: string[]): Promise<number> {
  await requireAdmin();
  
  try {
    const result = await prisma.class.updateMany({
      where: { id: { in: ids } },
      data: { isActive: true },
    });

    revalidatePath("/dashboard/admin/classes");
    return result.count;
  } catch (error) {
    console.error("Error bulk activating classes:", error);
    await throwError("Failed to bulk activate classes", "BULK_UPDATE_ERROR", 500);
  }
}

export async function bulkDeactivateClasses(ids: string[]): Promise<number> {
  await requireAdmin();
  
  try {
    const result = await prisma.class.updateMany({
      where: { id: { in: ids } },
      data: { isActive: false },
    });

    revalidatePath("/dashboard/admin/classes");
    return result.count;
  } catch (error) {
    console.error("Error bulk deactivating classes:", error);
    await throwError("Failed to bulk deactivate classes", "BULK_UPDATE_ERROR", 500);
  }
}

export async function bulkDeleteClasses(ids: string[]): Promise<number> {
  await requireAdmin();
  
  try {
    const result = await prisma.class.updateMany({
      where: { id: { in: ids } },
      data: { isActive: false },
    });

    revalidatePath("/dashboard/admin/classes");
    return result.count;
  } catch (error) {
    console.error("Error bulk deleting classes:", error);
    await throwError("Failed to bulk delete classes", "BULK_DELETE_ERROR", 500);
  }
}

// ==================== HELPER QUERIES ====================

export async function getClassLevels(): Promise<string[]> {
  try {
    const levels = await prisma.class.findMany({
      select: {
        level: true,
      },
      distinct: ["level"],
      orderBy: {
        level: "asc",
      },
    });

    const levelValues = levels.map((l) => l.level).filter(Boolean);

    if (levelValues.length > 0) {
      return levelValues;
    }

    return ["Beginner", "Intermediate", "Advanced", "Expert"];
  } catch (error) {
    console.error("Error fetching class levels:", error);
    return ["Beginner", "Intermediate", "Advanced", "Expert"];
  }
}

export async function getAcademicYears(): Promise<string[]> {
  try {
    const years = await prisma.class.findMany({
      select: {
        academicYear: true,
      },
      distinct: ["academicYear"],
      orderBy: {
        academicYear: "desc",
      },
    });

    const yearValues = years.map((y) => y.academicYear).filter(Boolean);

    if (yearValues.length > 0) {
      return yearValues;
    }

    const currentYear = new Date().getFullYear();
    return [`${currentYear}-${currentYear + 1}`, `${currentYear - 1}-${currentYear}`];
  } catch (error) {
    console.error("Error fetching academic years:", error);
    const currentYear = new Date().getFullYear();
    return [`${currentYear}-${currentYear + 1}`, `${currentYear - 1}-${currentYear}`];
  }
}

export async function isClassCodeExists(code: string): Promise<boolean> {
  await requireTeacherOrAdmin();
  
  try {
    const classData = await prisma.class.findUnique({
      where: { code },
      select: { id: true },
    });
    return !!classData;
  } catch (error) {
    console.error("Error checking class code:", error);
    await throwError("Failed to check class code", "CHECK_ERROR", 500);
  }
}

export async function getClassStats(): Promise<{
  totalClasses: number;
  activeClasses: number;
  totalEnrollments: number;
  averageClassSize: number;
  classesByLevel: Record<string, number>;
}> {
  await requireTeacherOrAdmin();
  
  try {
    const [totalClasses, activeClasses, totalEnrollments, classesByLevel] =
      await Promise.all([
        prisma.class.count(),
        prisma.class.count({ where: { isActive: true } }),
        prisma.enrollment.count({ where: { status: EnrollmentStatus.ACTIVE } }),
        prisma.class.groupBy({
          by: ["level"],
          _count: true,
        }),
      ]);

    const levelCounts: Record<string, number> = {};
    classesByLevel.forEach((item) => {
      if (item.level) {
        levelCounts[item.level] = item._count;
      }
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
    await throwError("Failed to fetch class stats", "STATS_ERROR", 500);
  }
}