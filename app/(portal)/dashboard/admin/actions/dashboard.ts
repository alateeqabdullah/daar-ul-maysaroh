// app/(portal)/dashboard/admin/actions/dashboard.ts
"use server";

import { prisma } from "@/lib/prisma";
import { endOfMonth, format, startOfMonth, subDays } from "date-fns";

// ==================== TYPES ====================

export interface DashboardStats {
  // User Statistics
  totalStudents: number;
  totalTeachers: number;
  totalParents: number;
  totalAdmins: number;
  totalPendingUsers: number;
  totalActiveUsers: number;
  totalSuspendedUsers: number;

  // Academic Statistics
  totalClasses: number;
  totalSubjects: number;
  totalCourses: number;
  totalEnrollments: number;
  activeGroups: number;
  totalGroupMembers: number;

  // Islamic Progress Statistics
  totalQuranProgress: number;
  totalHifzProgress: number;
  totalStudentsMemorizing: number;
  totalJuzCompleted: number;
  totalSurahsCompleted: number;
  averageMemorizationRate: number;

  // Financial Statistics
  totalPaymentsThisMonth: number;
  totalRevenueThisMonth: number;
  totalExpensesThisMonth: number;
  pendingInvoices: number;
  pendingPayments: number;
  totalSubscriptions: number;
  totalActiveSubscriptions: number;

  // Activity Statistics
  upcomingEvents: number;
  recentAnnouncements: number;
  totalMessagesSent: number;
  unreadNotifications: number;
  totalAttendanceToday: number;
  averageAttendanceRate: number;

  // Certificate Statistics
  totalCertificatesIssued: number;
  totalIjazahIssued: number;
  // New metrics
  averageClassSize: number;
  teacherToStudentRatio: number;
  retentionRate: number;
  popularCourses: { name: string; enrollments: number }[];
  peakHourAttendance: number;
  mostActiveDay: string;
}

export interface RevenueData {
  daily: { date: string; amount: number }[];
  weekly: { week: string; amount: number }[];
  monthly: { month: string; amount: number }[];
}

export interface EnrollmentTrend {
  month: string;
  enrollments: number;
  completions: number;
}

export interface TopPerformer {
  id: string;
  name: string;
  email: string;
  role: string;
  progress: number;
  achievements: number;
}




// ==================== MAIN DASHBOARD STATS ====================

export async function getDashboardStats(): Promise<DashboardStats> {
  const now = new Date();
  const monthStart = startOfMonth(now);
  const monthEnd = endOfMonth(now);
  const attendanceRate = await calculateAttendanceRate();
const memorizationRate = await calculateMemorizationRate();

  try {
    // User Statistics - Parallel queries
    const [
      totalStudents,
      totalTeachers,
      totalParents,
      totalAdmins,
      totalPendingUsers,
      totalActiveUsers,
      totalSuspendedUsers,
      totalClasses,
      totalSubjects,
      totalCourses,
      totalEnrollments,
      activeGroups,
      totalGroupMembers,
      totalPaymentsThisMonth,
      totalRevenueThisMonth,
      totalExpensesThisMonth,
      pendingInvoices,
      pendingPayments,
      totalSubscriptions,
      totalActiveSubscriptions,
      upcomingEvents,
      recentAnnouncements,
      totalMessagesSent,
      unreadNotifications,
      totalAttendanceToday,
      averageAttendanceRate,
      totalCertificatesIssued,
      totalIjazahIssued,
      totalQuranProgress,
      totalHifzProgress,
      totalStudentsMemorizing,
      totalJuzCompleted,
      totalSurahsCompleted,
      averageMemorizationRate,
      popularCoursesData,
      totalStudentsCount,
      totalTeachersCount,
      totalClassesCount,
      totalEnrollmentsCount,
    ] = await Promise.all([
      // User counts
      prisma.student.count(),
      prisma.teacher.count(),
      prisma.parent.count(),
      prisma.adminProfile.count(),
      prisma.user.count({ where: { status: "PENDING" } }),
      prisma.user.count({ where: { status: "APPROVED", isActive: true } }),
      prisma.user.count({ where: { status: "SUSPENDED" } }),

      // Academic counts
      prisma.class.count({ where: { isActive: true } }),
      prisma.subject.count(),
      prisma.course.count({ where: { isActive: true } }),
      prisma.enrollment.count({ where: { status: "ACTIVE" } }),
      prisma.studentGroup.count({ where: { isActive: true } }),
      prisma.groupMember.count(),

      // Financial counts
      prisma.payment.count({
        where: {
          status: "COMPLETED",
          paidAt: { gte: monthStart, lte: monthEnd },
        },
      }),
      prisma.payment.aggregate({
        where: {
          status: "COMPLETED",
          paidAt: { gte: monthStart, lte: monthEnd },
        },
        _sum: { amount: true },
      }),
      prisma.expense.aggregate({
        where: {
          date: { gte: monthStart, lte: monthEnd },
        },
        _sum: { amount: true },
      }),
      prisma.invoice.count({ where: { status: "PENDING" } }),
      prisma.payment.count({ where: { status: "PENDING" } }),
      prisma.subscription.count(),
      prisma.subscription.count({ where: { status: "ACTIVE" } }),

      // Activity counts
      prisma.event.count({
        where: { startDate: { gte: now }, isPublished: true },
      }),
      prisma.announcement.count({
        where: { isPublished: true, publishAt: { lte: now } },
      }),
      prisma.message.count(),
      prisma.notification.count({ where: { isRead: false } }),
      prisma.attendance.count({
        where: {
          date: { gte: startOfMonth(now), lte: endOfMonth(now) },
          status: "PRESENT",
        },
      }),
      85, // Placeholder - calculate from actual attendance data

      // Certificate counts
      prisma.certificate.count(),
      prisma.certificate.count({ where: { type: "MEMORIZATION" } }),

      // Quran Progress
      prisma.quranProgress.count(),
      prisma.hifzProgress.count(),
      prisma.quranProgress.groupBy({
        by: ["studentId"],
        _count: true,
      }),
      prisma.quranProgress.aggregate({
        _sum: { totalAyahs: true },
      }),
      prisma.quranProgress.aggregate({
        _sum: { totalAyahs: true },
        where: { status: "COMPLETED" },
      }),
      65, // Placeholder - calculate from actual progress data

      // New metrics data
      prisma.course.findMany({
        where: { isActive: true },
        select: { name: true, enrollments: { where: { status: "ACTIVE" } } },
        take: 5,
      }),
      prisma.student.count(),
      prisma.teacher.count(),
      prisma.class.count({ where: { isActive: true } }),
      prisma.enrollment.count({ where: { status: "ACTIVE" } }),
    ]);

    // Calculate derived statistics
    const totalStudentsMemorizingCount = totalStudentsMemorizing.length;
    const totalJuzCompletedValue = totalJuzCompleted._sum.totalAyahs 
      ? Math.floor(totalJuzCompleted._sum.totalAyahs / 20) // Approximate Juz count
      : 0;
    const totalSurahsCompletedValue = totalSurahsCompleted._sum.totalAyahs || 0;

    return {
      // User Statistics
      totalStudents,
      totalTeachers,
      totalParents,
      totalAdmins,
      totalPendingUsers,
      totalActiveUsers,
      totalSuspendedUsers,

      // Academic Statistics
      totalClasses,
      totalSubjects,
      totalCourses,
      totalEnrollments,
      activeGroups,
      totalGroupMembers,

      // Islamic Progress Statistics
      totalQuranProgress,
      totalHifzProgress,
      totalStudentsMemorizing: totalStudentsMemorizingCount,
      totalJuzCompleted: totalJuzCompletedValue,
      totalSurahsCompleted: totalSurahsCompletedValue,
      averageMemorizationRate,

      // Financial Statistics
      totalPaymentsThisMonth,
      totalRevenueThisMonth: totalRevenueThisMonth._sum?.amount ?? 0,
      totalExpensesThisMonth: totalExpensesThisMonth._sum.amount || 0,
      pendingInvoices,
      pendingPayments,
      totalSubscriptions,
      totalActiveSubscriptions,

      // Activity Statistics
      upcomingEvents,
      recentAnnouncements,
      totalMessagesSent,
      unreadNotifications,
      totalAttendanceToday,
      averageAttendanceRate,

      // Certificate Statistics
      totalCertificatesIssued,
      totalIjazahIssued,

      // New metrics
      averageClassSize: totalClassesCount > 0 ? Math.round(totalEnrollmentsCount / totalClassesCount) : 0,
      teacherToStudentRatio: totalTeachersCount > 0 ? Math.round(totalStudentsCount / totalTeachersCount) : 0,
      retentionRate: 92, // Placeholder
      popularCourses: popularCoursesData.map(c => ({ name: c.name, enrollments: c.enrollments.length })),
      peakHourAttendance: 10, // Placeholder (10 AM)
      mostActiveDay: "Monday", // Placeholder
    };
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    throw new Error("Failed to fetch dashboard statistics");
  }
}

// ==================== REVENUE DATA ====================

export async function getRevenueData(days: number = 30): Promise<RevenueData> {
  const now = new Date();
  const startDate = subDays(now, days);

  try {
    // Daily revenue
    const dailyPayments = await prisma.payment.groupBy({
      by: ["paidAt"],
      where: {
        status: "COMPLETED",
        paidAt: { gte: startDate },
      },
      _sum: { amount: true },
    });

    const dailyMap = new Map<string, number>();
    for (let i = 0; i < days; i++) {
      const date = subDays(now, i);
      const dateStr = format(date, "yyyy-MM-dd");
      dailyMap.set(dateStr, 0);
    }

    dailyPayments.forEach((payment) => {
      if (payment.paidAt) {
        const dateStr = format(payment.paidAt, "yyyy-MM-dd");
        dailyMap.set(dateStr, (dailyMap.get(dateStr) || 0) + (payment._sum.amount || 0));
      }
    });

    const daily = Array.from(dailyMap.entries())
      .map(([date, amount]) => ({ date, amount }))
      .reverse();

    // Weekly revenue (last 4 weeks)
    const weekly = [];
    for (let i = 3; i >= 0; i--) {
      const weekStart = subDays(now, i * 7 + 7);
      const weekEnd = subDays(now, i * 7);
      const weekPayments = await prisma.payment.aggregate({
        where: {
          status: "COMPLETED",
          paidAt: { gte: weekStart, lte: weekEnd },
        },
        _sum: { amount: true },
      });
      weekly.push({
        week: `Week ${4 - i}`,
        amount: weekPayments._sum.amount || 0,
      });
    }

    // Monthly revenue (last 6 months)
    const monthly = [];
    for (let i = 5; i >= 0; i--) {
      const monthDate = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthStart = startOfMonth(monthDate);
      const monthEnd = endOfMonth(monthDate);
      const monthPayments = await prisma.payment.aggregate({
        where: {
          status: "COMPLETED",
          paidAt: { gte: monthStart, lte: monthEnd },
        },
        _sum: { amount: true },
      });
      monthly.push({
        month: format(monthDate, "MMM yyyy"),
        amount: monthPayments._sum.amount || 0,
      });
    }

    return { daily, weekly, monthly };
  } catch (error) {
    console.error("Error fetching revenue data:", error);
    throw new Error("Failed to fetch revenue data");
  }
}

// ==================== ENROLLMENT TRENDS ====================

export async function getEnrollmentTrends(months: number = 6): Promise<EnrollmentTrend[]> {
  const now = new Date();
  const trends: EnrollmentTrend[] = [];

  try {
    for (let i = months - 1; i >= 0; i--) {
      const monthDate = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthStart = startOfMonth(monthDate);
      const monthEnd = endOfMonth(monthDate);

      const [enrollments, completions] = await Promise.all([
        prisma.enrollment.count({
          where: {
            enrolledAt: { gte: monthStart, lte: monthEnd },
          },
        }),
        prisma.enrollment.count({
          where: {
            completedAt: { gte: monthStart, lte: monthEnd },
            status: "COMPLETED",
          },
        }),
      ]);

      trends.push({
        month: format(monthDate, "MMM yyyy"),
        enrollments,
        completions,
      });
    }

    return trends;
  } catch (error) {
    console.error("Error fetching enrollment trends:", error);
    throw new Error("Failed to fetch enrollment trends");
  }
}

// ==================== TOP PERFORMERS ====================

export async function getTopPerformers(limit: number = 10): Promise<TopPerformer[]> {
  try {
    // Get students with highest Quran progress
    const topStudents = await prisma.quranProgress.groupBy({
      by: ["studentId"],
      _sum: { totalAyahs: true },
      orderBy: { _sum: { totalAyahs: "desc" } },
      take: limit,
    });

    const performers: TopPerformer[] = [];

    for (const student of topStudents) {
      const studentData = await prisma.student.findUnique({
        where: { id: student.studentId },
        include: { user: true },
      });

      if (studentData) {
        performers.push({
          id: studentData.id,
          name: studentData.user.name,
          email: studentData.user.email,
          role: "STUDENT",
          progress: student._sum.totalAyahs || 0,
          achievements: await prisma.certificate.count({
            where: { studentId: studentData.id },
          }),
        });
      }
    }

    return performers;
  } catch (error) {
    console.error("Error fetching top performers:", error);
    throw new Error("Failed to fetch top performers");
  }
}

// ==================== RECENT ACTIVITIES ====================

export interface RecentActivity {
  id: string;
  type: "user" | "payment" | "enrollment" | "certificate";
  action: string;
  user: { name: string; email: string };
  details: string;
  timestamp: Date;
}

export async function getRecentActivities(limit: number = 10): Promise<RecentActivity[]> {
  try {
    const [recentUsers, recentPayments, recentEnrollments, recentCertificates] = await Promise.all([
      prisma.user.findMany({
        take: limit,
        orderBy: { createdAt: "desc" },
        select: { id: true, name: true, email: true, createdAt: true, role: true },
      }),
      prisma.payment.findMany({
        take: limit,
        orderBy: { createdAt: "desc" },
        include: { student: { include: { user: true } }, parent: { include: { user: true } } },
      }),
      prisma.enrollment.findMany({
        take: limit,
        orderBy: { enrolledAt: "desc" },
        include: { student: { include: { user: true } }, class: true },
      }),
      prisma.certificate.findMany({
        take: limit,
        orderBy: { createdAt: "desc" },
        include: { student: { include: { user: true } } },
      }),
    ]);

    const activities: RecentActivity[] = [];

    recentUsers.forEach((user) => {
      activities.push({
        id: user.id,
        type: "user",
        action: "registered",
        user: { name: user.name, email: user.email },
        details: `New ${user.role} registered`,
        timestamp: user.createdAt,
      });
    });

    recentPayments.forEach((payment) => {
      const studentName = payment.student?.user.name || payment.parent?.user.name || "Unknown";
      activities.push({
        id: payment.id,
        type: "payment",
        action: "completed",
        user: { name: studentName, email: "" },
        details: `Payment of $${payment.amount} completed`,
        timestamp: payment.createdAt,
      });
    });

    recentEnrollments.forEach((enrollment) => {
      activities.push({
        id: enrollment.id,
        type: "enrollment",
        action: "enrolled",
        user: { name: enrollment.student.user.name, email: enrollment.student.user.email },
        details: `Enrolled in ${enrollment.class.name}`,
        timestamp: enrollment.enrolledAt,
      });
    });

    recentCertificates.forEach((certificate) => {
      activities.push({
        id: certificate.id,
        type: "certificate",
        action: "issued",
        user: { name: certificate.student.user.name, email: certificate.student.user.email },
        details: `${certificate.type} certificate issued`,
        timestamp: certificate.createdAt,
      });
    });

    // Sort by timestamp and take top limit
    return activities
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      .slice(0, limit);
  } catch (error) {
    console.error("Error fetching recent activities:", error);
    throw new Error("Failed to fetch recent activities");
  }
}

// ==================== SUBSCRIPTION ANALYTICS ====================

export interface SubscriptionAnalytics {
  active: number;
  expired: number;
  cancelled: number;
  trial: number;
  byPlan: { planName: string; count: number }[];
  monthlyRecurringRevenue: number;
  churnRate: number;
}

export async function getSubscriptionAnalytics(): Promise<SubscriptionAnalytics> {
  try {
    const [active, expired, cancelled, trial, byPlan, mrr, churned] = await Promise.all([
      prisma.subscription.count({ where: { status: "ACTIVE" } }),
      prisma.subscription.count({ where: { status: "EXPIRED" } }),
      prisma.subscription.count({ where: { status: "CANCELLED" } }),
      prisma.subscription.count({ where: { status: "TRIAL" } }),
      prisma.subscription.groupBy({
        by: ["planId"],
        _count: true,
      }),
      prisma.subscription.aggregate({
        where: { status: "ACTIVE" },
        _sum: { finalPrice: true },
      }),
      prisma.subscription.count({
        where: {
          status: "CANCELLED",
          updatedAt: { gte: subDays(new Date(), 30) },
        },
      }),
    ]);

    const total = active + expired + cancelled + trial;
    const monthlyRecurringRevenue = Number(mrr._sum.finalPrice) || 0;
    const churnRate = total > 0 ? (churned / total) * 100 : 0;

    // Get plan names
    const plansWithNames = await Promise.all(
      byPlan.map(async (plan) => {
        const planData = await prisma.pricingPlan.findUnique({
          where: { id: plan.planId },
          select: { name: true },
        });
        return {
          planName: planData?.name || "Unknown",
          count: plan._count,
        };
      })
    );

    return {
      active,
      expired,
      cancelled,
      trial,
      byPlan: plansWithNames,
      monthlyRecurringRevenue,
      churnRate: Math.round(churnRate * 10) / 10,
    };
  } catch (error) {
    console.error("Error fetching subscription analytics:", error);
    throw new Error("Failed to fetch subscription analytics");
  }
}

// ==================== ATTENDANCE SUMMARY ====================

export interface AttendanceSummary {
  today: number;
  week: number;
  month: number;
  averageRate: number;
  byClass: { className: string; present: number; total: number; rate: number }[];
}

export async function getAttendanceSummary(): Promise<AttendanceSummary> {
  const now = new Date();
  const todayStart = startOfMonth(now);
  const weekStart = subDays(now, 7);
  const monthStart = startOfMonth(now);

  try {
    const [todayCount, weekCount, monthCount, byClass] = await Promise.all([
      prisma.attendance.count({
        where: {
          date: { gte: todayStart },
          status: "PRESENT",
        },
      }),
      prisma.attendance.count({
        where: {
          date: { gte: weekStart },
          status: "PRESENT",
        },
      }),
      prisma.attendance.count({
        where: {
          date: { gte: monthStart },
          status: "PRESENT",
        },
      }),
      prisma.class.findMany({
        select: {
          id: true,
          name: true,
          attendances: {
            where: {
              date: { gte: monthStart },
            },
            select: { status: true },
          },
        },
      }),
    ]);

    const totalToday = await prisma.attendance.count({
      where: { date: { gte: todayStart } },
    });

    const totalWeek = await prisma.attendance.count({
      where: { date: { gte: weekStart } },
    });

    const totalMonth = await prisma.attendance.count({
      where: { date: { gte: monthStart } },
    });

    const byClassData = byClass.map((cls) => {
      const total = cls.attendances.length;
      const present = cls.attendances.filter((a) => a.status === "PRESENT").length;
      const rate = total > 0 ? (present / total) * 100 : 0;
      return {
        className: cls.name,
        present,
        total,
        rate: Math.round(rate),
      };
    });

    return {
      today: totalToday > 0 ? Math.round((todayCount / totalToday) * 100) : 0,
      week: totalWeek > 0 ? Math.round((weekCount / totalWeek) * 100) : 0,
      month: totalMonth > 0 ? Math.round((monthCount / totalMonth) * 100) : 0,
      averageRate: totalMonth > 0 ? Math.round((monthCount / totalMonth) * 100) : 0,
      byClass: byClassData,
    };
  } catch (error) {
    console.error("Error fetching attendance summary:", error);
    throw new Error("Failed to fetch attendance summary");
  }
}

// ==================== RECENT ANNOUNCEMENTS ====================

export interface AnnouncementData {
  id: string;
  title: string;
  content: string;
  priority: string;
  createdAt: Date;
  createdBy: { name: string };
}

export async function getRecentAnnouncements(limit: number = 5): Promise<AnnouncementData[]> {
  try {
    const announcements = await prisma.announcement.findMany({
      take: limit,
      orderBy: { createdAt: "desc" },
      where: { isPublished: true },
      include: {
        createdBy: { select: { name: true } },
      },
    });

    return announcements;
  } catch (error) {
    console.error("Error fetching recent announcements:", error);
    throw new Error("Failed to fetch recent announcements");
  }
}

// ==================== UPCOMING EVENTS ====================

export interface EventData {
  id: string;
  title: string;
  description: string | null;
  startDate: Date;
  endDate: Date;
  type: string;
  location: string | null;
}

export async function getUpcomingEvents(limit: number = 5): Promise<EventData[]> {
  const now = new Date();

  try {
    const events = await prisma.event.findMany({
      take: limit,
      orderBy: { startDate: "asc" },
      where: {
        startDate: { gte: now },
        isPublished: true,
      },
    });

    return events;
  } catch (error) {
    console.error("Error fetching upcoming events:", error);
    throw new Error("Failed to fetch upcoming events");
  }
}


async function calculateMemorizationRate(): Promise<number> {
  const monthStart = startOfMonth(new Date());
  
  const totalProgress = await prisma.quranProgress.aggregate({
    where: { updatedAt: { gte: monthStart } },
    _sum: { totalAyahs: true },
    _count: true,
  });

  const totalAyahs = 6236; // Total Ayahs in Quran
  const studentsWithProgress = totalProgress._count || 0;

  if (studentsWithProgress === 0) return 0;

  const totalMemorized = totalProgress._sum.totalAyahs || 0;
  const averagePerStudent = totalMemorized / studentsWithProgress;
  const rate = (averagePerStudent / totalAyahs) * 100;

  return Math.min(Math.round(rate * 10) / 10, 100);
}



async function calculateAttendanceRate(): Promise<number> {
  const monthStart = startOfMonth(new Date());
  const [present, total] = await Promise.all([
    prisma.attendance.count({
      where: { date: { gte: monthStart }, status: "PRESENT" },
    }),
    prisma.attendance.count({
      where: { date: { gte: monthStart } },
    }),
  ]);
  return total > 0 ? Math.round((present / total) * 100) : 0;
}