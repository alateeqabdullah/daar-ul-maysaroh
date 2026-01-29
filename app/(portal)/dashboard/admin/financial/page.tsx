import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import FinancialManagementClient from "@/components/admin/financial-management-client";
import { auth } from "@/lib/auth";
import { Prisma } from "@/app/generated/prisma/client";

export const metadata = {
  title: "Finance OS | Admin",
  description: "Complete financial oversight",
};

export default async function FinancialManagementPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; search?: string; status?: string }>;
}) {
  const session = await auth();
  if (!session) redirect("/login");
  if (!["SUPER_ADMIN", "ADMIN"].includes(session.user.role))
    redirect("/dashboard");

  const params = await searchParams;
  const page = parseInt(params.page || "1");
  const limit = 15;
  const skip = (page - 1) * limit;

  // Invoice Filters
  const paymentWhere: Prisma.PaymentWhereInput = {
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
      ],
    }),
  };

  try {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const [
      paymentsRaw,
      totalPayments,
      donationsRaw,
      expensesRaw,
      payrollsRaw,
      parentsRaw,
      teachersRaw,
      statsRaw,
    ] = await Promise.all([
      // 1. Payments (Invoices)
      prisma.payment.findMany({
        where: paymentWhere,
        include: {
          student: {
            include: { user: { select: { name: true, image: true } } },
          },
          parent: {
            include: { user: { select: { name: true, image: true } } },
          },
        },
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      // 2. Count
      prisma.payment.count({ where: paymentWhere }),
      // 3. Donations
      prisma.donation.findMany({ orderBy: { date: "desc" }, take: 10 }),
      // 4. Expenses
      prisma.expense.findMany({ orderBy: { date: "desc" }, take: 10 }),
      // 5. Payroll
      prisma.payroll.findMany({
        include: {
          teacher: {
            include: { user: { select: { name: true, image: true } } },
          },
        },
        orderBy: { createdAt: "desc" },
        take: 10,
      }),
      // 6. Parents (For dropdown)
      prisma.parent.findMany({
        include: { user: { select: { id: true, name: true, email: true } } },
      }),
      // 7. Teachers (For Payroll)
      prisma.teacher.findMany({
        where: { isAvailable: true },
        include: { user: { select: { name: true } } },
      }),
      // 8. Aggregates
      Promise.all([
        prisma.payment.aggregate({
          _sum: { amount: true },
          where: { status: "COMPLETED" },
        }), // Revenue
        prisma.expense.aggregate({ _sum: { amount: true } }), // Expenses
        prisma.donation.aggregate({ _sum: { amount: true } }), // Donations
      ]),
    ]);

    // Serialize
    const payments = paymentsRaw.map((p) => ({
      ...p,
      paidAt: p.paidAt?.toISOString(),
      createdAt: p.createdAt.toISOString(),
      userName: p.student?.user.name || p.parent?.user.name || "Unknown",
      userImage: p.student?.user.image || p.parent?.user.image,
      userRole: p.student ? "Student" : "Parent",
    }));

    const donations = donationsRaw.map((d) => ({
      ...d,
      date: d.date.toISOString(),
    }));
    const expenses = expensesRaw.map((e) => ({
      ...e,
      date: e.date.toISOString(),
    }));
    const payrolls = payrollsRaw.map((p) => ({
      ...p,
      teacherName: p.teacher.user.name,
      teacherImage: p.teacher.user.image,
      createdAt: p.createdAt.toISOString(),
    }));

    const parents = parentsRaw.map((p) => ({
      id: p.id,
      name: p.user.name,
      email: p.user.email,
    }));
    const teachers = teachersRaw.map((t) => ({
      id: t.id,
      name: t.user.name,
      salary: t.salary || 0,
    }));

    const stats = {
      revenue: statsRaw[0]._sum.amount || 0,
      expenses: statsRaw[1]._sum.amount || 0,
      donations: statsRaw[2]._sum.amount || 0,
      netIncome:
        (statsRaw[0]._sum.amount || 0) +
        (statsRaw[2]._sum.amount || 0) -
        (statsRaw[1]._sum.amount || 0),
    };

    return (
      <FinancialManagementClient
        initialPayments={payments}
        initialDonations={donations}
        initialExpenses={expenses}
        initialPayrolls={payrolls}
        parents={parents}
        teachers={teachers}
        stats={stats}
        pagination={{
          page,
          total: totalPayments,
          limit,
          pages: Math.ceil(totalPayments / limit),
        }}
      />
    );
  } catch (error) {
    console.error("Finance Page Error:", error);
    return <div>Error loading finances.</div>;
  }
}
