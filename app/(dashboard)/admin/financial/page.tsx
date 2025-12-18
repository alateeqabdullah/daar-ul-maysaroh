// src/app/(dashboard)/admin/financial/page.tsx
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import FinancialManagementClient from "@/components/admin/financial-management-client";

interface PageProps {
  searchParams: Promise<{
    page?: string;
    limit?: string;
    status?: string;
    month?: string;
    year?: string;
  }>;
}

export default async function FinancialManagementPage({
  searchParams,
}: PageProps) {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  if (!["SUPER_ADMIN", "ADMIN"].includes(session.user.role)) {
    redirect("/dashboard");
  }

  // Await searchParams for Next.js 15 compatibility
  const params = await searchParams;
  const page = parseInt(params.page || "1");
  const limit = parseInt(params.limit || "20");
  const status = params.status;
  const month = params.month;
  const year = params.year || new Date().getFullYear().toString();

  const skip = (page - 1) * limit;

  const where: any = {};

  if (status && status !== "ALL") {
    where.status = status;
  }

  if (month) {
    const m = parseInt(month);
    const y = parseInt(year);
    // Safer date range logic: 1st of current month to 1st of next month
    where.paidAt = {
      gte: new Date(y, m - 1, 1),
      lt: new Date(m === 12 ? y + 1 : y, m === 12 ? 0 : m, 1),
    };
  }

  // Default data structure
  let data = {
    payments: [],
    pagination: {
      page,
      limit,
      total: 0,
      pages: 0,
    },
    stats: {
      totalRevenue: 0,
      pendingPayments: 0,
      completedPayments: 0,
      thisMonthRevenue: 0,
      lastMonthRevenue: 0,
    },
  };

  try {
    const [
      payments,
      total,
      totalRevenue,
      pendingPayments,
      completedPayments,
      thisMonthRevenue,
      lastMonthRevenue,
    ] = await Promise.all([
      prisma.payment.findMany({
        where,
        include: {
          student: { include: { user: true } },
          parent: { include: { user: true } },
        },
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.payment.count({ where }),
      // Total revenue
      prisma.payment.aggregate({
        where: { status: "COMPLETED" },
        _sum: { amount: true },
      }),
      // Pending payments
      prisma.payment.count({
        where: { status: "PENDING" },
      }),
      // Completed payments
      prisma.payment.count({
        where: { status: "COMPLETED" },
      }),
      // This month revenue
      prisma.payment.aggregate({
        where: {
          status: "COMPLETED",
          paidAt: {
            gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
            lt: new Date(
              new Date().getFullYear(),
              new Date().getMonth() + 1,
              1
            ),
          },
        },
        _sum: { amount: true },
      }),
      // Last month revenue
      prisma.payment.aggregate({
        where: {
          status: "COMPLETED",
          paidAt: {
            gte: new Date(
              new Date().getFullYear(),
              new Date().getMonth() - 1,
              1
            ),
            lt: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
          },
        },
        _sum: { amount: true },
      }),
    ]);

    data = {
      payments: JSON.parse(JSON.stringify(payments)),
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
      stats: {
        totalRevenue: Number(totalRevenue._sum.amount) || 0,
        pendingPayments,
        completedPayments,
        thisMonthRevenue: Number(thisMonthRevenue._sum.amount) || 0,
        lastMonthRevenue: Number(lastMonthRevenue._sum.amount) || 0,
      },
    };
  } catch (error) {
    console.error("Error loading financial data:", error);
    // Uses initialized default 'data'
  }

  return (
    <FinancialManagementClient
      initialPayments={data.payments}
      pagination={data.pagination}
      filters={{ status, month, year }}
      stats={data.stats}
    />
  );
}
