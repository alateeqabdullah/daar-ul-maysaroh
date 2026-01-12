import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import FinancialManagementClient from "@/components/admin/financial-management-client";
import { auth } from "@/lib/auth";
import { Prisma } from "@/app/generated/prisma/client";

export const metadata = {
  title: "Financials | Admin",
  description: "Track revenue, invoices, and payments",
};

export default async function FinancialManagementPage({
  searchParams,
}: {
  searchParams: Promise<{
    page?: string;
    search?: string;
    status?: string;
    month?: string;
  }>;
}) {
  const session = await auth();
  if (!session) redirect("/login");
  if (!["SUPER_ADMIN", "ADMIN"].includes(session.user.role))
    redirect("/dashboard");

  const params = await searchParams;
  const page = parseInt(params.page || "1");
  const limit = 15;
  const skip = (page - 1) * limit;

  // --- Filter Logic ---
  const where: Prisma.PaymentWhereInput = {
    ...(params.status &&
      params.status !== "ALL" && { status: params.status as any }),
    ...(params.search && {
      OR: [
        { invoiceNumber: { contains: params.search, mode: "insensitive" } },
        {
          student: {
            user: { name: { contains: params.search, mode: "insensitive" } },
          },
        },
        {
          parent: {
            user: { name: { contains: params.search, mode: "insensitive" } },
          },
        },
      ],
    }),
  };

  try {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0);

    const [paymentsRaw, total, statsRaw] = await Promise.all([
      // 1. Payments List
      prisma.payment.findMany({
        where,
        include: {
          student: {
            include: {
              user: { select: { name: true, image: true, email: true } },
            },
          },
          parent: {
            include: {
              user: { select: { name: true, image: true, email: true } },
            },
          },
        },
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      // 2. Total Count
      prisma.payment.count({ where }),
      // 3. Financial Stats
      Promise.all([
        prisma.payment.aggregate({
          _sum: { amount: true },
          where: { status: "COMPLETED" },
        }),
        prisma.payment.aggregate({
          _sum: { amount: true },
          where: { status: "PENDING" },
        }),
        prisma.payment.aggregate({
          _sum: { amount: true },
          where: { status: "COMPLETED", paidAt: { gte: startOfMonth } },
        }),
        prisma.payment.aggregate({
          _sum: { amount: true },
          where: {
            status: "COMPLETED",
            paidAt: { gte: startOfLastMonth, lte: endOfLastMonth },
          },
        }),
      ]),
    ]);

    // Serialize
    const payments = paymentsRaw.map((p) => ({
      ...p,
      paidAt: p.paidAt?.toISOString() || null,
      dueDate: p.dueDate?.toISOString() || null,
      createdAt: p.createdAt.toISOString(),
      userName: p.student?.user.name || p.parent?.user.name || "Unknown",
      userImage: p.student?.user.image || p.parent?.user.image,
      userEmail: p.student?.user.email || p.parent?.user.email,
      userRole: p.student ? "Student" : "Parent",
    }));

    const stats = {
      totalRevenue: statsRaw[0]._sum.amount || 0,
      pendingAmount: statsRaw[1]._sum.amount || 0,
      thisMonthRevenue: statsRaw[2]._sum.amount || 0,
      lastMonthRevenue: statsRaw[3]._sum.amount || 0,
    };

    return (
      <FinancialManagementClient
        initialPayments={payments}
        stats={stats}
        pagination={{ page, total, limit, pages: Math.ceil(total / limit) }}
      />
    );
  } catch (error) {
    console.error("Financial Page Error:", error);
    return <div>Error loading financial data.</div>;
  }
}
