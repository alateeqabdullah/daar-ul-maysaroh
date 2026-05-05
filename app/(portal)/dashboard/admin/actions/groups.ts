// app/(portal)/dashboard/admin/actions/groups.ts
"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import {
  GroupType,
  ScheduleType,
  MeetingPlatform,
 
} from "@/app/generated/prisma/enums";
import { Prisma } from "@/app/generated/prisma/client";

// ==================== TYPES ====================

export interface GroupFilters {
  search?: string;
  type?: GroupType;
  teacherId?: string;
  classId?: string;
  isActive?: boolean;
  page?: number;
  limit?: number;
}

export interface GroupWithRelations {
  id: string;
  name: string;
  description: string | null;
  type: GroupType;
  academicYear: string;
  term: string | null;
  capacity: number;
  currentCount: number;
  teacherId: string | null;
  assistantTeacherId: string | null;
  classId: string | null;
  scheduleType: ScheduleType;
  isActive: boolean;
  startDate: Date | null;
  endDate: Date | null;
  createdAt: Date;
  updatedAt: Date;
  teacher?: {
    id: string;
    user: {
      name: string;
      email: string;
      image: string | null;
    };
    specialization: string | null;
  };
  assistantTeacher?: {
    id: string;
    user: {
      name: string;
      email: string;
      image: string | null;
    };
  };
  class?: {
    id: string;
    name: string;
    code: string;
    level: string;
  };
  schedules: GroupSchedule[];
  members: GroupMemberSummary[];
  announcements: GroupAnnouncementSummary[];
  assignments: GroupAssignmentSummary[];
}

export interface GroupSchedule {
  id: string;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  timezone: string;
  isOnline: boolean;
  meetingPlatform: MeetingPlatform;
  meetingUrl: string | null;
  meetingId: string | null;
  meetingPassword: string | null;
  physicalLocation: string | null;
  isRecurring: boolean;
  recurrenceRule: string | null;
}

export interface GroupMemberSummary {
  id: string;
  studentId: string;
  studentName: string;
  studentEmail: string;
  joinedAt: Date;
  role: string;
  status: string;
  groupProgress: number | null;
}

export interface GroupAnnouncementSummary {
  id: string;
  title: string;
  content: string;
  priority: string;
  createdAt: Date;
}

export interface GroupAssignmentSummary {
  id: string;
  title: string;
  dueDate: Date;
  totalMarks: number;
  submissions: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  totalPages: number;
  limit: number;
}

export interface GroupStats {
  totalGroups: number;
  activeGroups: number;
  totalMembers: number;
  averageGroupSize: number;
  byType: Record<GroupType, number>;
}

// ==================== READ OPERATIONS ====================

/**
 * Get paginated list of groups with filters
 */
export async function getGroups(
  filters: GroupFilters = {},
): Promise<PaginatedResponse<GroupWithRelations>> {
  const {
    search,
    type,
    teacherId,
    classId,
    isActive = true,
    page = 1,
    limit = 20,
  } = filters;

  const skip = (page - 1) * limit;

  const where: Prisma.StudentGroupWhereInput = { isActive };

  if (search) {
    where.OR = [
      { name: { contains: search, mode: "insensitive" } },
      { description: { contains: search, mode: "insensitive" } },
    ];
  }

  if (type) {
    where.type = type;
  }

  if (teacherId) {
    where.teacherId = teacherId;
  }

  if (classId) {
    where.classId = classId;
  }

  try {
    const [groups, total] = await Promise.all([
      prisma.studentGroup.findMany({
        where,
        skip,
        take: limit,
        orderBy: [{ createdAt: "desc" }],
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
          assistantTeacher: {
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
          class: {
            select: {
              id: true,
              name: true,
              code: true,
              level: true,
            },
          },
          schedules: true,
          members: {
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
            orderBy: { joinedAt: "desc" },
          },
          announcements: {
            orderBy: { createdAt: "desc" },
            take: 3,
          },
          assignments: {
            orderBy: { dueDate: "asc" },
            take: 3,
          },
          _count: {
            select: { members: true },
          },
        },
      }),
      prisma.studentGroup.count({ where }),
    ]);

    const formattedGroups = groups.map((group) => ({
      ...group,
      currentCount: group._count.members,
      members: group.members.map((member) => ({
        id: member.id,
        studentId: member.studentId,
        studentName: member.student.user.name,
        studentEmail: member.student.user.email,
        joinedAt: member.joinedAt,
        role: member.role,
        status: member.status,
        groupProgress: member.groupProgress,
      })),
    }));

    return {
      data: formattedGroups as unknown as GroupWithRelations[],
      total,
      page,
      totalPages: Math.ceil(total / limit),
      limit,
    };
  } catch (error) {
    console.error("Error fetching groups:", error);
    throw new Error("Failed to fetch groups");
  }
}

/**
 * Get group by ID
 */
export async function getGroupById(
  id: string,
): Promise<GroupWithRelations | null> {
  try {
    const group = await prisma.studentGroup.findUnique({
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
        assistantTeacher: {
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
        class: {
          select: {
            id: true,
            name: true,
            code: true,
            level: true,
          },
        },
        schedules: true,
        members: {
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
          orderBy: { joinedAt: "desc" },
        },
        announcements: {
          orderBy: { createdAt: "desc" },
        },
        assignments: {
          orderBy: { dueDate: "asc" },
        },
      },
    });

    if (!group) return null;

    return {
        ...group,
        currentCount: group.members.length,
        members: group.members.map((member) => ({
            id: member.id,
            studentId: member.studentId,
            studentName: member.student.user.name,
            studentEmail: member.student.user.email,
            joinedAt: member.joinedAt,
            role: member.role,
            status: member.status,
            groupProgress: member.groupProgress,
        })),
    } as unknown as GroupWithRelations;
  } catch (error) {
    console.error("Error fetching group:", error);
    throw new Error("Failed to fetch group");
  }
}

/**
 * Get groups by teacher
 */
export async function getGroupsByTeacher(
  teacherId: string,
): Promise<GroupWithRelations[]> {
  try {
    const groups = await prisma.studentGroup.findMany({
      where: { teacherId, isActive: true },
      orderBy: { name: "asc" },
      include: {
        schedules: true,
        _count: {
          select: { members: true },
        },
      },
    });

    return groups.map((group) => ({
        ...group,
        currentCount: group._count.members,
    })) as unknown as GroupWithRelations[];
  } catch (error) {
    console.error("Error fetching groups by teacher:", error);
    throw new Error("Failed to fetch groups by teacher");
  }
}

/**
 * Get groups by student
 */
export async function getGroupsByStudent(
  studentId: string,
): Promise<GroupWithRelations[]> {
  try {
    const memberships = await prisma.groupMember.findMany({
      where: { studentId, status: "ACTIVE" },
      include: {
        group: {
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
            _count: {
              select: { members: true },
            },
          },
        },
      },
    });

    return memberships.map((m) => ({
        ...m.group,
        currentCount: m.group._count.members,
    })) as unknown as GroupWithRelations[];
  } catch (error) {
    console.error("Error fetching groups by student:", error);
    throw new Error("Failed to fetch groups by student");
  }
}

/**
 * Get group statistics
 */
export async function getGroupStats(): Promise<GroupStats> {
  try {
    const [totalGroups, activeGroups, totalMembers, byType] = await Promise.all(
      [
        prisma.studentGroup.count(),
        prisma.studentGroup.count({ where: { isActive: true } }),
        prisma.groupMember.count({ where: { status: "ACTIVE" } }),
        prisma.studentGroup.groupBy({
          by: ["type"],
          _count: true,
        }),
      ],
    );

    const typeCounts = {} as Record<GroupType, number>;
    byType.forEach((item) => {
      typeCounts[item.type] = item._count;
    });

    const averageGroupSize = activeGroups > 0 ? totalMembers / activeGroups : 0;

    return {
      totalGroups,
      activeGroups,
      totalMembers,
      averageGroupSize: Math.round(averageGroupSize * 10) / 10,
      byType: typeCounts,
    };
  } catch (error) {
    console.error("Error fetching group stats:", error);
    throw new Error("Failed to fetch group stats");
  }
}

// ==================== WRITE OPERATIONS ====================

export interface CreateGroupInput {
  name: string;
  description?: string;
  type: GroupType;
  academicYear: string;
  term?: string;
  capacity?: number;
  teacherId?: string;
  assistantTeacherId?: string;
  classId?: string;
  scheduleType?: ScheduleType;
  startDate?: Date;
  endDate?: Date;
  schedules?: Array<{
    dayOfWeek: number;
    startTime: string;
    endTime: string;
    timezone?: string;
    isOnline?: boolean;
    meetingPlatform?: MeetingPlatform;
    meetingUrl?: string;
    meetingId?: string;
    meetingPassword?: string;
  }>;
}

/**
 * Create a new group
 */
export async function createGroup(
  input: CreateGroupInput,
): Promise<GroupWithRelations> {
  const {
    name,
    description,
    type,
    academicYear,
    term,
    capacity = 20,
    teacherId,
    assistantTeacherId,
    classId,
    scheduleType = "REGULAR",
    startDate,
    endDate,
    schedules = [],
  } = input;

  try {
    const group = await prisma.studentGroup.create({
      data: {
        name,
        description,
        type,
        academicYear,
        term,
        capacity,
        teacherId,
        assistantTeacherId,
        classId,
        scheduleType,
        startDate,
        endDate,
        currentCount: 0,
        schedules: {
          create: schedules.map((schedule) => ({
            dayOfWeek: schedule.dayOfWeek,
            startTime: schedule.startTime,
            endTime: schedule.endTime,
            timezone: schedule.timezone || "UTC",
            isOnline: schedule.isOnline ?? true,
            meetingPlatform: schedule.meetingPlatform || "ZOOM",
            meetingUrl: schedule.meetingUrl,
            meetingId: schedule.meetingId,
            meetingPassword: schedule.meetingPassword,
            isRecurring: true,
          })),
        },
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
        assistantTeacher: {
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
        class: true,
        schedules: true,
      },
    });

    revalidatePath("/dashboard/admin/groups");
    return group as unknown as GroupWithRelations;
  } catch (error) {
    console.error("Error creating group:", error);
    throw error;
  }
}

export interface UpdateGroupInput {
  name?: string;
  description?: string;
  type?: GroupType;
  academicYear?: string;
  term?: string;
  capacity?: number;
  teacherId?: string;
  assistantTeacherId?: string;
  classId?: string;
  scheduleType?: ScheduleType;
  isActive?: boolean;
  startDate?: Date;
  endDate?: Date;
}

/**
 * Update group
 */
export async function updateGroup(
  id: string,
  input: UpdateGroupInput,
): Promise<GroupWithRelations> {
  try {
    const group = await prisma.studentGroup.update({
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
        assistantTeacher: {
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
        class: true,
        schedules: true,
      },
    });

    revalidatePath(`/dashboard/admin/groups/${id}`);
    revalidatePath("/dashboard/admin/groups");
    return group as unknown as GroupWithRelations;
  } catch (error) {
    console.error("Error updating group:", error);
    throw new Error("Failed to update group");
  }
}

/**
 * Delete group (soft delete)
 */
export async function deleteGroup(id: string): Promise<void> {
  try {
    await prisma.studentGroup.update({
      where: { id },
      data: { isActive: false },
    });

    revalidatePath("/dashboard/admin/groups");
  } catch (error) {
    console.error("Error deleting group:", error);
    throw new Error("Failed to delete group");
  }
}

/**
 * Hard delete group
 */
export async function hardDeleteGroup(id: string): Promise<void> {
  try {
    await prisma.studentGroup.delete({
      where: { id },
    });

    revalidatePath("/dashboard/admin/groups");
  } catch (error) {
    console.error("Error permanently deleting group:", error);
    throw new Error("Failed to permanently delete group");
  }
}

// ==================== MEMBER OPERATIONS ====================

export interface AddMemberInput {
  groupId: string;
  studentId: string;
  role?: "LEADER" | "ASSISTANT" | "MEMBER" | "MONITOR";
}

/**
 * Add member to group
 */
export async function addGroupMember(input: AddMemberInput): Promise<void> {
  const { groupId, studentId, role = "MEMBER" } = input;

  try {
    const group = await prisma.studentGroup.findUnique({
      where: { id: groupId },
      select: { capacity: true, currentCount: true, isActive: true },
    });

    if (!group) throw new Error("Group not found");
    if (!group.isActive) throw new Error("Group is not active");
    if (group.currentCount >= group.capacity)
      throw new Error("Group has reached maximum capacity");

    const existingMember = await prisma.groupMember.findUnique({
      where: {
        groupId_studentId: {
          groupId,
          studentId,
        },
      },
    });

    if (existingMember)
      throw new Error("Student is already a member of this group");

    await prisma.$transaction([
      prisma.groupMember.create({
        data: {
          groupId,
          studentId,
          role,
          status: "ACTIVE",
        },
      }),
      prisma.studentGroup.update({
        where: { id: groupId },
        data: { currentCount: { increment: 1 } },
      }),
    ]);

    revalidatePath(`/dashboard/admin/groups/${groupId}`);
  } catch (error) {
    console.error("Error adding group member:", error);
    throw error;
  }
}

/**
 * Remove member from group
 */
export async function removeGroupMember(
  groupId: string,
  studentId: string,
): Promise<void> {
  try {
    await prisma.$transaction([
      prisma.groupMember.delete({
        where: {
          groupId_studentId: {
            groupId,
            studentId,
          },
        },
      }),
      prisma.studentGroup.update({
        where: { id: groupId },
        data: { currentCount: { decrement: 1 } },
      }),
    ]);

    revalidatePath(`/dashboard/admin/groups/${groupId}`);
  } catch (error) {
    console.error("Error removing group member:", error);
    throw new Error("Failed to remove group member");
  }
}

/**
 * Update member role
 */
export async function updateMemberRole(
  groupId: string,
  studentId: string,
  role: "LEADER" | "ASSISTANT" | "MEMBER" | "MONITOR",
): Promise<void> {
  try {
    await prisma.groupMember.update({
      where: {
        groupId_studentId: {
          groupId,
          studentId,
        },
      },
      data: { role },
    });

    revalidatePath(`/dashboard/admin/groups/${groupId}`);
  } catch (error) {
    console.error("Error updating member role:", error);
    throw new Error("Failed to update member role");
  }
}

// ==================== SCHEDULE OPERATIONS ====================

export interface AddScheduleInput {
  groupId: string;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  timezone?: string;
  isOnline?: boolean;
  meetingPlatform?: MeetingPlatform;
  meetingUrl?: string;
  meetingId?: string;
  meetingPassword?: string;
  physicalLocation?: string;
}

/**
 * Add schedule to group
 */
export async function addGroupSchedule(
  input: AddScheduleInput,
): Promise<GroupSchedule> {
  const {
    groupId,
    dayOfWeek,
    startTime,
    endTime,
    timezone = "UTC",
    isOnline = true,
    meetingPlatform = "ZOOM",
    meetingUrl,
    meetingId,
    meetingPassword,
    physicalLocation,
  } = input;

  try {
    const schedule = await prisma.groupSchedule.create({
      data: {
        groupId,
        dayOfWeek,
        startTime,
        endTime,
        timezone,
        isOnline,
        meetingPlatform,
        meetingUrl,
        meetingId,
        meetingPassword,
        physicalLocation,
        isRecurring: true,
      },
    });

    revalidatePath(`/dashboard/admin/groups/${groupId}`);
    return schedule;
  } catch (error) {
    console.error("Error adding group schedule:", error);
    throw new Error("Failed to add group schedule");
  }
}

/**
 * Delete group schedule
 */
export async function deleteGroupSchedule(id: string): Promise<void> {
  try {
    const schedule = await prisma.groupSchedule.findUnique({
      where: { id },
      select: { groupId: true },
    });

    await prisma.groupSchedule.delete({
      where: { id },
    });

    if (schedule) {
      revalidatePath(`/dashboard/admin/groups/${schedule.groupId}`);
    }
  } catch (error) {
    console.error("Error deleting group schedule:", error);
    throw new Error("Failed to delete group schedule");
  }
}

// ==================== BULK OPERATIONS ====================

/**
 * Bulk delete groups
 */
export async function bulkDeleteGroups(ids: string[]): Promise<number> {
  try {
    const result = await prisma.studentGroup.updateMany({
      where: { id: { in: ids } },
      data: { isActive: false },
    });

    revalidatePath("/dashboard/admin/groups");
    return result.count;
  } catch (error) {
    console.error("Error bulk deleting groups:", error);
    throw new Error("Failed to bulk delete groups");
  }
}

/**
 * Bulk activate groups
 */
export async function bulkActivateGroups(ids: string[]): Promise<number> {
  try {
    const result = await prisma.studentGroup.updateMany({
      where: { id: { in: ids } },
      data: { isActive: true },
    });

    revalidatePath("/dashboard/admin/groups");
    return result.count;
  } catch (error) {
    console.error("Error bulk activating groups:", error);
    throw new Error("Failed to bulk activate groups");
  }
}

// ==================== HELPER FUNCTIONS ====================

/**
 * Get group types for dropdown
 */
export async function getGroupTypes(): Promise<string[]> {
  return Object.values(GroupType);
}

/**
 * Get available students for group
 */
export async function getAvailableStudentsForGroup(
  groupId: string,
  search?: string,
): Promise<{ id: string; name: string; email: string; studentId: string }[]> {
  try {
    const group = await prisma.studentGroup.findUnique({
      where: { id: groupId },
      select: { classId: true },
    });

    const whereCondition: Prisma.StudentWhereInput = {};

    if (group?.classId) {
      whereCondition.enrollments = {
        some: {
          classId: group.classId,
        },
      };
    }

    if (search) {
      whereCondition.user = {
        OR: [
          { name: { contains: search, mode: "insensitive" } },
          { email: { contains: search, mode: "insensitive" } },
        ],
      };
    }

    const existingMembers = await prisma.groupMember.findMany({
      where: { groupId },
      select: { studentId: true },
    });

    const existingIds = existingMembers.map((m) => m.studentId);

    const students = await prisma.student.findMany({
      where: {
        ...whereCondition,
        id: { notIn: existingIds },
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
