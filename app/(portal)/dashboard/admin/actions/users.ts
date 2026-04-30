// app/(portal)/dashboard/admin/actions/users.ts
"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";
import { UserRole, UserStatus } from "@/app/generated/prisma/enums";

// ==================== TYPES ====================

export interface UserFilters {
  role?: UserRole;
  status?: UserStatus;
  search?: string;
  page?: number;
  limit?: number;
}

export interface UserWithProfile {
  id: string;
  email: string;
  name: string;
  phone: string | null;
  image: string | null;
  role: UserRole;
  status: UserStatus;
  isActive: boolean;
  emailVerified: Date | null;
  phoneVerified: boolean;
  lastLogin: Date | null;
  loginCount: number;
  createdAt: Date;
  updatedAt: Date;
  studentProfile?: {
    studentId: string;
    currentLevel: string | null;
    enrollmentDate: Date;
  } | null;
  teacherProfile?: {
    teacherId: string;
    specialization: string | null;
    isAvailable: boolean;
  } | null;
  parentProfile?: {
    occupation: string | null;
    students: { studentId: string }[];
  } | null;
  adminProfile?: {
    department: string | null;
  } | null;
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
 * Get paginated list of users with filters
 */
export async function getUsers(
  filters: UserFilters = {},
): Promise<PaginatedResponse<UserWithProfile>> {
  const { role, status, search, page = 1, limit = 20 } = filters;

  const skip = (page - 1) * limit;

  // Build where clause
  const where: any = {};

  if (role) {
    where.role = role;
  }

  if (status) {
    where.status = status;
  }

  if (search) {
    where.OR = [
      { name: { contains: search, mode: "insensitive" } },
      { email: { contains: search, mode: "insensitive" } },
      { phone: { contains: search, mode: "insensitive" } },
    ];
  }

  try {
    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
        include: {
          studentProfile: {
            select: {
              studentId: true,
              currentLevel: true,
              enrollmentDate: true,
            },
          },
          teacherProfile: {
            select: {
              teacherId: true,
              specialization: true,
              isAvailable: true,
            },
          },
          parentProfile: {
            select: {
              occupation: true,
              students: {
                select: { studentId: true },
              },
            },
          },
          adminProfile: {
            select: {
              department: true,
            },
          },
        },
      }),
      prisma.user.count({ where }),
    ]);

    return {
      data: users as UserWithProfile[],
      total,
      page,
      totalPages: Math.ceil(total / limit),
      limit,
    };
  } catch (error) {
    console.error("Error fetching users:", error);
    throw new Error("Failed to fetch users");
  }
}

/**
 * Get single user by ID with all profiles
 */
// app/(portal)/dashboard/admin/actions/users.ts

export async function getUserById(id: string): Promise<UserWithProfile | null> {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        studentProfile: {
          include: {
            enrollments: {
              include: {
                class: true,
              },
            },
            payments: true,
            certificates: true,
          },
        },
        teacherProfile: {
          include: {
            classes: true,
            subjects: true,
            // sanadChains: true,  // ← COMMENT THIS OUT temporarily
          },
        },
        parentProfile: {
          include: {
            students: true,
            payments: true,
            invoices: true,
          },
        },
        adminProfile: true,
      },
    });

    return user as UserWithProfile | null;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw new Error("Failed to fetch user");
  }
}

/**
 * Get user by email
 */
export async function getUserByEmail(
  email: string,
): Promise<UserWithProfile | null> {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        studentProfile: true,
        teacherProfile: true,
        parentProfile: true,
        adminProfile: true,
      },
    });

    return user as UserWithProfile | null;
  } catch (error) {
    console.error("Error fetching user by email:", error);
    throw new Error("Failed to fetch user");
  }
}

/**
 * Get users by role
 */
export async function getUsersByRole(
  role: UserRole,
): Promise<UserWithProfile[]> {
  try {
    const users = await prisma.user.findMany({
      where: { role },
      orderBy: { name: "asc" },
      include: {
        studentProfile: true,
        teacherProfile: true,
        parentProfile: true,
        adminProfile: true,
      },
    });

    return users as UserWithProfile[];
  } catch (error) {
    console.error("Error fetching users by role:", error);
    throw new Error("Failed to fetch users");
  }
}

/**
 * Get pending users (awaiting approval)
 */
export async function getPendingUsers(): Promise<UserWithProfile[]> {
  try {
    const users = await prisma.user.findMany({
      where: { status: "PENDING" },
      orderBy: { createdAt: "asc" },
      include: {
        studentProfile: true,
        teacherProfile: true,
        parentProfile: true,
        adminProfile: true,
      },
    });

    return users as UserWithProfile[];
  } catch (error) {
    console.error("Error fetching pending users:", error);
    throw new Error("Failed to fetch pending users");
  }
}

// ==================== WRITE OPERATIONS ====================

interface CreateUserInput {
  email: string;
  name: string;
  password: string;
  phone?: string;
  role?: UserRole;
}

/**
 * Create a new user
 */
export async function createUser(
  input: CreateUserInput,
): Promise<UserWithProfile> {
  const { email, name, password, phone, role = "STUDENT" } = input;

  try {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new Error("User with this email already exists");
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        phone,
        role,
        status: "PENDING",
      },
      include: {
        studentProfile: true,
        teacherProfile: true,
        parentProfile: true,
        adminProfile: true,
      },
    });

    // Create role-specific profile
    if (role === "STUDENT") {
      await prisma.student.create({
        data: {
          userId: user.id,
          studentId: `STU-${Date.now()}`,
          enrollmentDate: new Date(),
          academicYear: new Date().getFullYear().toString(),
        },
      });
    } else if (role === "TEACHER") {
      await prisma.teacher.create({
        data: {
          userId: user.id,
          teacherId: `TCH-${Date.now()}`,
          joiningDate: new Date(),
        },
      });
    } else if (role === "PARENT") {
      await prisma.parent.create({
        data: {
          userId: user.id,
        },
      });
    } else if (role === "ADMIN" || role === "SUPER_ADMIN") {
      await prisma.adminProfile.create({
        data: {
          userId: user.id,
        },
      });
    }

    revalidatePath("/dashboard/admin/users");
    return user as UserWithProfile;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
}

interface UpdateUserInput {
  name?: string;
  phone?: string;
  role?: UserRole;
  language?: string;
  timezone?: string;
}

/**
 * Update user details
 */
export async function updateUser(
  id: string,
  input: UpdateUserInput,
): Promise<UserWithProfile> {
  try {
    const user = await prisma.user.update({
      where: { id },
      data: input,
      include: {
        studentProfile: true,
        teacherProfile: true,
        parentProfile: true,
        adminProfile: true,
      },
    });

    revalidatePath(`/dashboard/admin/users/${id}`);
    revalidatePath("/dashboard/admin/users");
    return user as UserWithProfile;
  } catch (error) {
    console.error("Error updating user:", error);
    throw new Error("Failed to update user");
  }
}

interface UpdateUserStatusInput {
  status: UserStatus;
  approvedById?: string;
  rejectionReason?: string;
}

/**
 * Update user status (approve, reject, suspend, etc.)
 */
export async function updateUserStatus(
  id: string,
  input: UpdateUserStatusInput,
): Promise<UserWithProfile> {
  const { status, approvedById, rejectionReason } = input;

  try {
    const updateData: any = { status };

    if (status === "APPROVED") {
      updateData.approvedAt = new Date();
      if (approvedById) {
        updateData.approvedBy = { connect: { id: approvedById } };
      }
    }

    if (status === "REJECTED" && rejectionReason) {
      updateData.rejectionReason = rejectionReason;
    }

    const user = await prisma.user.update({
      where: { id },
      data: updateData,
      include: {
        studentProfile: true,
        teacherProfile: true,
        parentProfile: true,
        adminProfile: true,
      },
    });

    revalidatePath(`/dashboard/admin/users/${id}`);
    revalidatePath("/dashboard/admin/users");
    return user as UserWithProfile;
  } catch (error) {
    console.error("Error updating user status:", error);
    throw new Error("Failed to update user status");
  }
}

/**
 * Delete user (soft delete by deactivating)
 */
export async function deleteUser(id: string): Promise<void> {
  try {
    await prisma.user.update({
      where: { id },
      data: {
        isActive: false,
        status: "DEACTIVATED",
      },
    });

    revalidatePath("/dashboard/admin/users");
  } catch (error) {
    console.error("Error deleting user:", error);
    throw new Error("Failed to delete user");
  }
}

/**
 * Permanently delete user (hard delete - use with caution)
 */
export async function hardDeleteUser(id: string): Promise<void> {
  try {
    await prisma.user.delete({
      where: { id },
    });

    revalidatePath("/dashboard/admin/users");
  } catch (error) {
    console.error("Error permanently deleting user:", error);
    throw new Error("Failed to permanently delete user");
  }
}

/**
 * Reset user password
 */
export async function resetUserPassword(
  id: string,
  newPassword: string,
): Promise<void> {
  try {
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: { id },
      data: { password: hashedPassword },
    });

    revalidatePath(`/dashboard/admin/users/${id}`);
  } catch (error) {
    console.error("Error resetting password:", error);
    throw new Error("Failed to reset password");
  }
}

// ==================== BULK OPERATIONS ====================

/**
 * Bulk approve users
 */
export async function bulkApproveUsers(
  ids: string[],
  approvedById: string,
): Promise<number> {
  try {
    const result = await prisma.user.updateMany({
      where: {
        id: { in: ids },
        status: "PENDING",
      },
      data: {
        status: "APPROVED",
        approvedAt: new Date(),
        approvedById,
      },
    });

    revalidatePath("/dashboard/admin/users");
    return result.count;
  } catch (error) {
    console.error("Error bulk approving users:", error);
    throw new Error("Failed to bulk approve users");
  }
}

/**
 * Bulk reject users
 */
export async function bulkRejectUsers(
  ids: string[],
  rejectionReason: string,
): Promise<number> {
  try {
    const result = await prisma.user.updateMany({
      where: {
        id: { in: ids },
        status: "PENDING",
      },
      data: {
        status: "REJECTED",
        rejectionReason,
      },
    });

    revalidatePath("/dashboard/admin/users");
    return result.count;
  } catch (error) {
    console.error("Error bulk rejecting users:", error);
    throw new Error("Failed to bulk reject users");
  }
}

/**
 * Bulk delete users (soft delete)
 */
export async function bulkDeleteUsers(ids: string[]): Promise<number> {
  try {
    const result = await prisma.user.updateMany({
      where: {
        id: { in: ids },
      },
      data: {
        isActive: false,
        status: "DEACTIVATED",
      },
    });

    revalidatePath("/dashboard/admin/users");
    return result.count;
  } catch (error) {
    console.error("Error bulk deleting users:", error);
    throw new Error("Failed to bulk delete users");
  }
}

/**
 * Bulk suspend users
 */
export async function bulkSuspendUsers(ids: string[]): Promise<number> {
  try {
    const result = await prisma.user.updateMany({
      where: {
        id: { in: ids },
        status: { not: "DEACTIVATED" },
      },
      data: {
        status: "SUSPENDED",
      },
    });

    revalidatePath("/dashboard/admin/users");
    return result.count;
  } catch (error) {
    console.error("Error bulk suspending users:", error);
    throw new Error("Failed to bulk suspend users");
  }
}

/**
 * Bulk activate users
 */
export async function bulkActivateUsers(ids: string[]): Promise<number> {
  try {
    const result = await prisma.user.updateMany({
      where: {
        id: { in: ids },
        status: { in: ["SUSPENDED", "DEACTIVATED"] },
      },
      data: {
        status: "APPROVED",
        isActive: true,
      },
    });

    revalidatePath("/dashboard/admin/users");
    return result.count;
  } catch (error) {
    console.error("Error bulk activating users:", error);
    throw new Error("Failed to bulk activate users");
  }
}

// ==================== HELPER FUNCTIONS ====================

/**
 * Get user statistics
 */
export async function getUserStats(): Promise<{
  total: number;
  byRole: Record<UserRole, number>;
  byStatus: Record<UserStatus, number>;
  pendingApproval: number;
}> {
  try {
    const [total, byRole, byStatus, pendingApproval] = await Promise.all([
      prisma.user.count(),
      prisma.user.groupBy({
        by: ["role"],
        _count: true,
      }),
      prisma.user.groupBy({
        by: ["status"],
        _count: true,
      }),
      prisma.user.count({
        where: { status: "PENDING" },
      }),
    ]);

    const roleCounts = {} as Record<UserRole, number>;
    byRole.forEach((item) => {
      roleCounts[item.role] = item._count;
    });

    const statusCounts = {} as Record<UserStatus, number>;
    byStatus.forEach((item) => {
      statusCounts[item.status] = item._count;
    });

    return {
      total,
      byRole: roleCounts,
      byStatus: statusCounts,
      pendingApproval,
    };
  } catch (error) {
    console.error("Error fetching user stats:", error);
    throw new Error("Failed to fetch user stats");
  }
}

/**
//  * Check if email exists
//  */
// export async function isEmailExists(email: string): Promise<boolean> {
//   try {
//     const user = await prisma.user.findUnique({
//       where: { email },
//       select: { id: true },
//     });
//     return !!user;
//   } catch (error) {
//     console.error("Error checking email:", error);
//     throw new Error("Failed to check email");
//   }
// }


// In actions/users.ts - update isEmailExists
export async function isEmailExists(email: string): Promise<boolean> {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
      select: { id: true },
    });
    return !!user;
  } catch (error) {
    console.error("Error checking email:", error);
    return false;
  }
}



/**
 * Get user count by role
 */
export async function getUserCountByRole(role: UserRole): Promise<number> {
  try {
    return await prisma.user.count({
      where: { role },
    });
  } catch (error) {
    console.error("Error fetching user count:", error);
    throw new Error("Failed to fetch user count");
  }
}
