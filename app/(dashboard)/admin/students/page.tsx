import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import StudentsManagementClient from "@/components/admin/students-management-client";
import { auth } from "@/lib/auth";
import { Prisma } from "@/app/generated/prisma/client";


export const metadata = {
  title: "Student Management | Admin",
  description: "Manage student profiles, enrollments, and academic progress",
};

export default async function StudentsManagementPage({
  searchParams,
}: {
  searchParams: Promise<{
    page?: string;
    search?: string;
    classId?: string;
    status?: string;
  }>;
}) {
  const session = await auth();
  if (!session) redirect("/login");
  if (!["SUPER_ADMIN", "ADMIN"].includes(session.user.role))
    redirect("/dashboard");

  const params = await searchParams;
  const page = parseInt(params.page || "1");
  const limit = 12; // Slightly higher for grid view
  const skip = (page - 1) * limit;

  // --- Build Filter ---
  const where: Prisma.StudentWhereInput = {
    user: {
      status: "APPROVED", // Only show active/approved students in main list
      ...(params.search && {
        OR: [
          { name: { contains: params.search, mode: "insensitive" } },
          { email: { contains: params.search, mode: "insensitive" } },
        ],
      }),
    },
    ...(params.classId &&
      params.classId !== "ALL" && { currentClassId: params.classId }),
  };

  try {
    const [studentsRaw, total, classesRaw, parentsRaw, statsRaw] =
      await Promise.all([
        // 1. Fetch Students
        prisma.student.findMany({
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
            currentClass: { select: { id: true, name: true, code: true } },
            parent: {
              include: {
                user: { select: { name: true, phone: true, email: true } },
              },
            },
          },
          orderBy: { user: { createdAt: "desc" } },
          skip,
          take: limit,
        }),
        // 2. Count Total for Pagination
        prisma.student.count({ where }),
        // 3. Fetch Classes for Dropdown
        prisma.class.findMany({
          where: { isActive: true },
          select: { id: true, name: true },
        }),
        // 4. Fetch Parents for Dropdown (Lightweight)
        prisma.parent.findMany({
          include: { user: { select: { name: true } } },
        }),
        // 5. Global Stats
        Promise.all([
          prisma.student.count(),
          prisma.student.count({ where: { user: { status: "SUSPENDED" } } }),
          prisma.student.count({ where: { gender: "MALE" } }),
          prisma.student.count({ where: { gender: "FEMALE" } }),
        ]),
      ]);

    // Serialize Dates
    const students = studentsRaw.map((s) => ({
      ...s,
      joinedAt: s.user.createdAt.toISOString(),
      dateOfBirth: s.dateOfBirth?.toISOString() || null,
      enrollmentDate: s.enrollmentDate.toISOString(),
    }));

    const stats = {
      totalStudents: statsRaw[0],
      suspended: statsRaw[1],
      boys: statsRaw[2],
      girls: statsRaw[3],
    };

    return (
      <StudentsManagementClient
        initialStudents={students}
        classes={classesRaw}
        parents={parentsRaw}
        stats={stats}
        pagination={{ page, total, limit, pages: Math.ceil(total / limit) }}
      />
    );
  } catch (error) {
    console.error("Student Page Error:", error);
    return <div>Error loading students.</div>;
  }
}
