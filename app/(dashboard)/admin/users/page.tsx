// src/app/(dashboard)/admin/users/page.tsx

import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import UserManagementClient from "@/components/admin/user-management-client";
import { auth } from "@/lib/auth";

interface PageProps {
  searchParams: Promise<{
    page?: string;
    limit?: string;
    role?: string;
    search?: string;
    status?: string;
  }>;
}

export default async function UserManagementPage({ searchParams }: PageProps) {
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
  const role = params.role;
  const search = params.search;
  const status = params.status;

  const skip = (page - 1) * limit;

  const where: any = {
    role: { not: "SUPER_ADMIN" }, // Don't show super admins in list
  };

  if (role && role !== "ALL") {
    where.role = role;
  }

  if (status && status !== "ALL") {
    where.status = status;
  }

  if (search) {
    where.OR = [
      { name: { contains: search, mode: "insensitive" } },
      { email: { contains: search, mode: "insensitive" } },
      { phone: { contains: search, mode: "insensitive" } },
    ];
  }

  // Define default/empty state
  let data = {
    users: [],
    pagination: {
      page,
      limit,
      total: 0,
      pages: 0,
    },
    stats: {
      students: 0,
      teachers: 0,
      parents: 0,
      pending: 0,
      suspended: 0,
    },
  };

  try {
    const [users, total, counts] = await Promise.all([
      prisma.user.findMany({
        where,
        include: {
          studentProfile: true,
          teacherProfile: true,
          parentProfile: true,
          approvedBy: {
            select: { name: true },
          },
        },
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.user.count({ where }),
      Promise.all([
        prisma.user.count({ where: { role: "STUDENT", status: "APPROVED" } }),
        prisma.user.count({ where: { role: "TEACHER", status: "APPROVED" } }),
        prisma.user.count({ where: { role: "PARENT", status: "APPROVED" } }),
        prisma.user.count({ where: { status: "PENDING" } }),
        prisma.user.count({ where: { status: "SUSPENDED" } }),
      ]),
    ]);

    // Serialize data inside the try block
    data = {
      users: JSON.parse(JSON.stringify(users)),
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
      stats: {
        students: counts[0],
        teachers: counts[1],
        parents: counts[2],
        pending: counts[3],
        suspended: counts[4],
      },
    };
  } catch (error) {
    console.error("Error loading users:", error);
    // Keep the default data structure initialized above
  }

  // Return component outside of try/catch
  return (
    <UserManagementClient
      initialUsers={data.users}
      pagination={data.pagination}
      filters={{ role, search, status }}
      stats={data.stats}
    />
  );
}
