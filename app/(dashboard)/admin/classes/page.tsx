// src/app/(dashboard)/admin/classes/page.tsx
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import ClassManagementClient from "@/components/admin/class-management-client";

export default async function ClassManagementPage() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  if (!["SUPER_ADMIN", "ADMIN"].includes(session.user.role)) {
    redirect("/dashboard");
  }

  // Initialize default data structure
  let data = {
    classes: [],
    teachers: [],
    subjects: [],
    stats: {
      totalClasses: 0,
      activeClasses: 0,
      totalStudents: 0,
      totalTeachers: 0,
    },
  };

  try {
    const [classes, teachers, subjects] = await Promise.all([
      prisma.class.findMany({
        include: {
          teacher: {
            include: {
              user: true,
            },
          },
          enrollments: {
            include: {
              student: {
                include: {
                  user: true,
                },
              },
            },
          },
          subjects: true,
          schedules: true,
        },
        orderBy: { createdAt: "desc" },
      }),
      prisma.teacher.findMany({
        include: {
          user: true,
        },
        where: {
          isAvailable: true,
        },
      }),
      prisma.subject.findMany({
        include: {
          teacher: {
            include: {
              user: true,
            },
          },
        },
      }),
    ]);

    // Serialize data and calculate stats inside the try block
    data = {
      classes: JSON.parse(JSON.stringify(classes)),
      teachers: JSON.parse(JSON.stringify(teachers)),
      subjects: JSON.parse(JSON.stringify(subjects)),
      stats: {
        totalClasses: classes.length,
        activeClasses: classes.filter((c) => c.isActive).length,
        totalStudents: classes.reduce(
          (sum, c) => sum + (c.enrollments?.length || 0),
          0
        ),
        totalTeachers: teachers.length,
      },
    };
  } catch (error) {
    console.error("Error loading classes:", error);
    // data remains at default values defined above
  }

  return (
    <ClassManagementClient
      initialClasses={data.classes}
      teachers={data.teachers}
      subjects={data.subjects}
      stats={data.stats}
    />
  );
}
