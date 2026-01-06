// src/app/(dashboard)/admin/students/page.tsx

import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import StudentsManagementClient from "@/components/admin/students-management-client";
import { auth } from "@/lib/auth";

export default async function StudentsManagementPage({
  searchParams,
}: {
  // searchParams is a Promise in Next.js 15
  searchParams: Promise<{
    page?: string;
    search?: string;
    class?: string;
    status?: string;
  }>;
}) {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  if (!["SUPER_ADMIN", "ADMIN"].includes(session.user.role)) {
    redirect("/dashboard");
  }

  // 1. Await searchParams before accessing properties
  const params = await searchParams;
  const page = parseInt(params.page || "1");
  const limit = 10;
  const skip = (page - 1) * limit;

  // 2. Initialize data variables outside the try block
  let students: any[] = [];
  let total = 0;
  let classes: any[] = [];

  const where: any = {
    user: {
      status: "APPROVED", // Filter by APPROVED status from UserStatus enum
    },
  };

  if (params.search) {
    where.OR = [
      { user: { name: { contains: params.search, mode: "insensitive" } } },
      { user: { email: { contains: params.search, mode: "insensitive" } } },
      { studentId: { contains: params.search, mode: "insensitive" } }, // studentId from Student model [cite: 13, 14]
    ];
  }

  if (params.class && params.class !== "all") {
    where.currentClassId = params.class;
  }

  if (params.status && params.status !== "all") {
    if (params.status === "active") {
      where.user.isActive = true;
    } else if (params.status === "inactive") {
      where.user.isActive = false;
    }
  }

  try {
    // 3. Fetch data from the database using models defined in schema.prisma [cite: 1, 13, 39]
    const [studentsData, totalCount, classesData] = await Promise.all([
      prisma.student.findMany({
        where,
        include: {
          user: true, // Includes core user details like email and role [cite: 1, 4]
          currentClass: {
            include: {
              teacher: {
                include: {
                  user: true,
                },
              },
            },
          },
          parent: {
            // Includes parent relation [cite: 23, 24]
            include: {
              user: true,
            },
          },
          enrollments: {
            // Includes student enrollments [cite: 55, 56]
            include: {
              class: true,
            },
          },
        },
        orderBy: { user: { createdAt: "desc" } },
        skip,
        take: limit,
      }),
      prisma.student.count({ where }),
      prisma.class.findMany({
        where: { isActive: true }, // class model has isActive [cite: 44]
        include: {
          teacher: {
            include: {
              user: true,
            },
          },
        },
      }),
    ]);

    students = studentsData;
    total = totalCount;
    classes = classesData;
  } catch (error) {
    console.error("Error loading students:", error);
    // Data remains at initial empty values if error occurs
  }

  // 4. Return JSX outside of the try/catch block
  return (
    <StudentsManagementClient
      initialStudents={JSON.parse(JSON.stringify(students))}
      total={total}
      page={page}
      classes={JSON.parse(JSON.stringify(classes))}
      filters={params}
    />
  );
}
