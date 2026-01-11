import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import ParentsManagementClient from "@/components/admin/parents-management-client";
import { auth } from "@/lib/auth";
import { Prisma } from "@/app/generated/prisma/client";

export const metadata = {
  title: "Parent Management | Admin",
  description: "Manage guardians and family accounts",
};

export default async function ParentsManagementPage({
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
  const limit = 12;
  const skip = (page - 1) * limit;

  // --- Build Filter ---
  const where: Prisma.ParentWhereInput = {
    user: {
      status: "APPROVED",
      ...(params.search && {
        OR: [
          { name: { contains: params.search, mode: "insensitive" } },
          { email: { contains: params.search, mode: "insensitive" } },
          { phone: { contains: params.search, mode: "insensitive" } },
        ],
      }),
    },
  };

  try {
    const [parentsRaw, total, statsRaw] = await Promise.all([
      // 1. Fetch Parents
      prisma.parent.findMany({
        where,
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              image: true,
              phone: true,
              status: true,
              createdAt: true,
            },
          },
          students: {
            include: {
              user: { select: { name: true, image: true } },
              currentClass: { select: { name: true } },
            },
          },
          _count: { select: { students: true } },
        },
        orderBy: { user: { createdAt: "desc" } },
        skip,
        take: limit,
      }),
      // 2. Count Total
      prisma.parent.count({ where }),
      // 3. Stats
      Promise.all([
        prisma.parent.count(),
        prisma.parent.count({ where: { user: { status: "SUSPENDED" } } }),
        prisma.student.count({ where: { parentId: { not: null } } }), // Total linked students
      ]),
    ]);

    // Serialize
    const parents = parentsRaw.map((p) => ({
      ...p,
      joinedAt: p.user.createdAt.toISOString(),
      updatedAt: p.updatedAt.toISOString(),
      studentsCount: p._count.students,
    }));

    const stats = {
      totalParents: statsRaw[0],
      suspended: statsRaw[1],
      linkedStudents: statsRaw[2],
    };

    return (
      <ParentsManagementClient
        initialParents={parents}
        stats={stats}
        pagination={{ page, total, limit, pages: Math.ceil(total / limit) }}
      />
    );
  } catch (error) {
    console.error("Parent Page Error:", error);
    return <div>Error loading parents.</div>;
  }
}
