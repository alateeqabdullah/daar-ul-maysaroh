"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

// Middleware
async function checkAuth() {
  const session = await auth();
  if (!session || !["ADMIN", "SUPER_ADMIN"].includes(session.user.role))
    throw new Error("Unauthorized");
  return session;
}

// 1. FINANCIAL FLOW (Revenue vs Expenses)
export async function getFinancialFlow() {
  await checkAuth();
  const payments = await prisma.payment.aggregate({
    _sum: { amount: true },
    where: { status: "COMPLETED" },
  });
  const expenses = await prisma.expense.aggregate({ _sum: { amount: true } });
  return {
    revenue: Number(payments._sum.amount) || 0,
    expenses: Number(expenses._sum.amount) || 0,
  };
}

// 2. DEBT RECOVERY LIST
export async function getOverdueRegistry() {
  await checkAuth();
  return await prisma.invoice.findMany({
    where: { status: "PENDING", dueDate: { lt: new Date() } },
    include: { parent: { include: { user: true } } },
  });
}

// 3. HIFZ MASTERY VELOCITY
export async function getHifzVelocity() {
  await checkAuth();
  return await prisma.hifzProgress.groupBy({
    by: ["status"],
    _count: { id: true },
  });
}

// 4. ATTENDANCE PULSE (Last 7 Days)
export async function getAttendancePulse() {
  await checkAuth();
  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);
  return await prisma.attendance.groupBy({
    by: ["status"],
    where: { date: { gte: weekAgo } },
    _count: { id: true },
  });
}

// 5. SPIRITUAL COMPLIANCE (Prayer Records)
export async function getPrayerCompliance() {
  await checkAuth();
  return await prisma.prayerRecord.groupBy({
    by: ["status"],
    _count: { id: true },
  });
}

// 6. GRADE DISTRIBUTION
export async function getGradeDistribution() {
  await checkAuth();
  return await prisma.grade.groupBy({
    by: ["grade"],
    _count: { id: true },
  });
}

// 7. TEACHER LOAD REPORT
export async function getTeacherLoad() {
  await checkAuth();
  return await prisma.teacher.findMany({
    include: {
      _count: { select: { classes: true, scheduledSessions: true } },
      user: { select: { name: true } },
    },
  });
}

// 8. ENROLLMENT DYNAMICS
export async function getEnrollmentStats() {
  await checkAuth();
  return await prisma.student.count();
}

// 9. RECENT FINANCIAL TRANSACTIONS
export async function getRecentTransactions() {
  await checkAuth();
  return await prisma.payment.findMany({
    take: 10,
    orderBy: { createdAt: "desc" },
    include: { parent: { include: { user: true } } },
  });
}

// 10. SYSTEM ACTIVITY SNAPSHOT (Notifications)
export async function getSystemActivity() {
  await checkAuth();
  return await prisma.notification.count({ where: { isRead: false } });
}
