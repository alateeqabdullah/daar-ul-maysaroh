import { Prisma } from "@/app/generated/prisma/client";
import { UserRole } from "@/app/generated/prisma/enums";
import { prisma } from "@/lib/prisma";


/**
 * Using Prisma.UserWhereInput ensures that the filter object
 * matches the schema exactly.
 */
export async function getPendingUsers(
  page: number = 1,
  limit: number = 10,
  role?: UserRole | "ALL",
  search?: string
) {
  const skip = (page - 1) * limit;

  // v7 Approach: Define strict types for the where clause
  const where: Prisma.UserWhereInput = {
    status: "PENDING",
  };

  if (role && role !== "ALL") {
    where.role = role;
  }

  if (search) {
    where.OR = [
      { name: { contains: search, mode: "insensitive" } },
      { email: { contains: search, mode: "insensitive" } },
      { phone: { contains: search, mode: "insensitive" } },
    ];
  }

  // Promise.all remains the standard for parallel execution
  const [users, total] = await Promise.all([
    prisma.user.findMany({
      where,
      include: {
        studentProfile: true,
        teacherProfile: true,
        parentProfile: true,
      },
      orderBy: { createdAt: "desc" },
      skip,
      take: limit,
    }),
    prisma.user.count({ where }),
  ]);

  return {
    users,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    },
  };
}

export async function getUserById(id: string) {
  return prisma.user.findUnique({
    where: { id },
    include: {
      studentProfile: true,
      teacherProfile: true,
      parentProfile: true,
      adminProfile: true,
    },
  });
}

/**
 * Approval logic using nested writes.
 * Prisma 7 handles nested updates more efficiently within transactions.
 */
export async function approveUser(userId: string, approvedById: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      role: true,
      status: true,
      studentProfile: { select: { id: true } },
      teacherProfile: { select: { id: true } },
    },
  });

  if (!user) throw new Error("User not found");
  if (user.status !== "PENDING")
    throw new Error("User is not pending approval");

  // Generate unique IDs
  const randomId = Date.now().toString().slice(-6);

  return prisma.user.update({
    where: { id: userId },
    data: {
      status: "APPROVED",
      approvedAt: new Date(),
      approvedById,
      // Conditional nested updates based on role
      ...(user.role === "STUDENT" && user.studentProfile
        ? {
            studentProfile: {
              update: { data: { studentId: `STD-${randomId}` } },
            },
          }
        : {}),
      ...(user.role === "TEACHER" && user.teacherProfile
        ? {
            teacherProfile: {
              update: { data: { teacherId: `TCH-${randomId}` } },
            },
          }
        : {}),
    },
    include: {
      studentProfile: true,
      teacherProfile: true,
      parentProfile: true,
    },
  });
}

export async function getDashboardStats() {
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);

  // Prisma 7+ optimized: Promise.all for dashboard counts
  const [
    totalUsers,
    pendingUsers,
    activeClasses,
    activeTeachers,
    totalStudents,
    totalParents,
    recentPayments,
    todayAttendance,
  ] = await Promise.all([
    prisma.user.count({ where: { status: "APPROVED" } }),
    prisma.user.count({ where: { status: "PENDING" } }),
    prisma.class.count({ where: { isActive: true } }),
    prisma.teacher.count({ where: { isAvailable: true } }),
    prisma.student.count(),
    prisma.parent.count(),
    prisma.payment.findMany({
      where: {
        status: "COMPLETED",
        paidAt: { gte: thirtyDaysAgo },
      },
      orderBy: { paidAt: "desc" },
      take: 10,
    }),
    prisma.attendance.findMany({
      where: {
        date: { gte: startOfToday },
      },
      include: {
        student: {
          include: { user: { select: { name: true } } },
        },
      },
    }),
  ]);

  const totalRevenue = recentPayments.reduce(
    (sum, p) => sum + Number(p.amount),
    0
  );
  const presentToday = todayAttendance.filter(
    (a) => a.status === "PRESENT"
  ).length;
  const attendanceRate =
    todayAttendance.length > 0
      ? (presentToday / todayAttendance.length) * 100
      : 0;

  return {
    totalUsers,
    pendingUsers,
    activeClasses,
    activeTeachers,
    totalStudents,
    totalParents,
    totalRevenue,
    attendanceRate: Math.round(attendanceRate),
    recentPayments,
    todayAttendance,
  };
}
