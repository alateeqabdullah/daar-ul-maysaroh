// app/api/admin/dashboard/export/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { UserRole } from "@/app/generated/prisma/enums";
import { format, subDays, subYears } from "date-fns";
import { stringify } from "csv-stringify/sync";

export async function GET(request: NextRequest) {
  try {
    const session = await auth();

    if (
      !session?.user ||
      !["ADMIN", "SUPER_ADMIN"].includes(session.user.role as UserRole)
    ) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const range = searchParams.get("range") || "30days";
    const type = searchParams.get("type") || "all"; // Allow exporting specific types
    const startDate = getStartDate(range);

    // 1. Fetch data in parallel
    const [users, payments, classes] = await Promise.all([
      prisma.user.findMany({
        where: { createdAt: { gte: startDate } },
        orderBy: { createdAt: "desc" },
      }),
      prisma.payment.findMany({
        where: { createdAt: { gte: startDate } },
        include: {
          student: { include: { user: { select: { name: true } } } },
          parent: { include: { user: { select: { name: true } } } },
        },
        orderBy: { createdAt: "desc" },
      }),
      prisma.class.findMany({
        where: { createdAt: { gte: startDate } },
        orderBy: { createdAt: "desc" },
      }),
    ]);

    // 2. Format rows with a consistent schema
    // Recommendation: If exporting "All", use a universal header that makes sense
    // Better Recommendation: Most admins prefer separate exports.
    // Here, we'll label them clearly so they can be filtered.

    const rows: any[] = [];

    // Header Row (General Purpose)
    const header = [
      "Record Type",
      "ID",
      "Entity Name",
      "Reference Info",
      "Status",
      "Value/Amount",
      "Date",
    ];

    users.forEach((u) =>
      rows.push([
        "USER",
        u.id,
        u.name,
        u.email,
        u.status,
        u.role,
        format(u.createdAt, "yyyy-MM-dd HH:mm"),
      ])
    );
    payments.forEach((p) =>
      rows.push([
        "PAYMENT",
        p.id,
        p.student?.user.name || p.parent?.user.name,
        p.paymentMethod,
        p.status,
        p.amount,
        format(p.createdAt, "yyyy-MM-dd HH:mm"),
      ])
    );
    classes.forEach((c) =>
      rows.push([
        "CLASS",
        c.id,
        c.name,
        c.code,
        c.isActive ? "Active" : "Inactive",
        `${c.currentEnrollment}/${c.capacity}`,
        format(c.createdAt, "yyyy-MM-dd HH:mm"),
      ])
    );

    const csvData = stringify(rows, { header: true, columns: header });

    return new NextResponse(csvData, {
      status: 200,
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": `attachment; filename="export-${range}-${format(
          new Date(),
          "yyyyMMdd"
        )}.csv"`,
      },
    });
  } catch (error) {
    console.error("Export error:", error);
    return NextResponse.json(
      { error: "Failed to export data" },
      { status: 500 }
    );
  }
}

// Fixed Date Logic (Original code was mutating 'now' in place which can lead to bugs)
function getStartDate(range: string): Date {
  const now = new Date();
  switch (range) {
    case "7days":
      return subDays(now, 7);
    case "30days":
      return subDays(now, 30);
    case "90days":
      return subDays(now, 90);
    case "year":
      return subYears(now, 1);
    default:
      return subDays(now, 30);
  }
}
