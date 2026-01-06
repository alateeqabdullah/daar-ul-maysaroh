// src/app/(dashboard)/admin/parents/page.tsx

import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import ParentsManagementClient from "@/components/admin/parents-management-client";
import { auth } from "@/lib/auth";

export default async function ParentsManagementPage({
  searchParams,
}: {
  // In Next.js 15, searchParams is a Promise
  searchParams: Promise<{ page?: string; search?: string }>;
}) {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  if (!["SUPER_ADMIN", "ADMIN"].includes(session.user.role)) {
    redirect("/dashboard");
  }

  // 1. Await searchParams
  const params = await searchParams;
  const page = parseInt(params.page || "1");
  const limit = 10;
  const skip = (page - 1) * limit;

  // 2. Initialize data variables
  let parents: any[] = [];
  let total = 0;

  const where: any = {
    user: {
      status: "APPROVED",
    },
  };

  if (params.search) {
    where.OR = [
      {
        user: {
          name: { contains: params.search, mode: "insensitive" },
        },
      },
      {
        user: {
          email: { contains: params.search, mode: "insensitive" },
        },
      },
    ];
  }

  try {
    // 3. Fetch data inside try block
    const [parentsData, totalCount] = await Promise.all([
      prisma.parent.findMany({
        where,
        include: {
          user: true,
          students: {
            include: {
              user: true,
              currentClass: true,
            },
          },
        },
        orderBy: { user: { createdAt: "desc" } },
        skip,
        take: limit,
      }),
      prisma.parent.count({ where }),
    ]);

    parents = parentsData;
    total = totalCount;
  } catch (error) {
    console.error("Error loading parents:", error);
    // Data remains empty arrays/zero on error
  }

  // 4. Return JSX outside of the try/catch block
  return (
    <ParentsManagementClient
      initialParents={JSON.parse(JSON.stringify(parents))}
      total={total}
      page={page}
      filters={params}
    />
  );
}
