// src/app/(dashboard)/admin/teachers/page.tsx
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import TeacherManagementClient from "@/components/admin/teacher-management-client";

export default async function TeacherManagementPage() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  if (!["SUPER_ADMIN", "ADMIN"].includes(session.user.role)) {
    redirect("/dashboard");
  }

  // Initialize default data structure to prevent hydration mismatch or undefined errors
  let data = {
    teachers: [],
    stats: {
      totalTeachers: 0,
      availableTeachers: 0,
      totalClasses: 0,
      totalStudents: 0,
    },
  };

  try {
    const teachers = await prisma.teacher.findMany({
      include: {
        user: true,
        classes: {
          include: {
            enrollments: true,
          },
        },
        subjects: true,
      },
      orderBy: { createdAt: "desc" },
    });

    // Serialize data and calculate stats inside the try block
    data = {
      teachers: JSON.parse(JSON.stringify(teachers)),
      stats: {
        totalTeachers: teachers.length,
        availableTeachers: teachers.filter((t) => t.isAvailable).length,
        totalClasses: teachers.reduce(
          (sum, t) => sum + (t.classes?.length || 0),
          0
        ),
        totalStudents: teachers.reduce(
          (sum, t) =>
            sum +
            (t.classes?.reduce(
              (classSum, c) => classSum + (c.enrollments?.length || 0),
              0
            ) || 0),
          0
        ),
      },
    };
  } catch (error) {
    console.error("Error loading teachers:", error);
    // Data remains at the default state defined above
  }

  // Single return point for cleaner Server Component execution
  return (
    <TeacherManagementClient
      initialTeachers={data.teachers}
      stats={data.stats}
    />
  );
}
