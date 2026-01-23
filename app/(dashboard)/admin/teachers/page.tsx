import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import TeacherManagementClient from "@/components/admin/teacher-management-client";

export const metadata = {
  title: "Teacher Management | Admin",
  description: "Manage faculty, assignments, and availability",
};

export default async function TeacherManagementPage() {
  const session = await auth();
  if (!session) redirect("/login");
  if (!["SUPER_ADMIN", "ADMIN"].includes(session.user.role))
    redirect("/dashboard");

  try {
    const teachersRaw = await prisma.teacher.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
            phone: true,
          },
        },
        _count: {
          select: { classes: true },
        },
        // We fetch classes just to sum up students later
        classes: {
          select: {
            id: true,
            name: true,
            _count: { select: { enrollments: true } },
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    // Efficient Serialization & Calculation
    const teachers = teachersRaw.map((t) => {
      const totalStudents = t.classes.reduce(
        (sum, c) => sum + c._count.enrollments,
        0
      );

      return {
        id: t.id,
        userId: t.user.id,
        name: t.user.name,
        email: t.user.email,
        phone: t.user.phone,
        image: t.user.image,
        specialization: t.specialization,
        isAvailable: t.isAvailable,
        qualification: t.qualification,
        experienceYears: t.experienceYears,
        bio: t.bio,
        createdAt: t.createdAt.toISOString(),
        totalClasses: t._count.classes,
        totalStudents: totalStudents,
        // Pass minimal class data for the modal
        classes: t.classes.map((c) => ({
          id: c.id,
          name: c.name,
          students: c._count.enrollments,
        })),
      };
    });

    const stats = {
      totalTeachers: teachers.length,
      availableTeachers: teachers.filter((t) => t.isAvailable).length,
      totalClasses: teachers.reduce((acc, t) => acc + t.totalClasses, 0),
      totalStudents: teachers.reduce((acc, t) => acc + t.totalStudents, 0),
    };

    return <TeacherManagementClient initialTeachers={teachers} stats={stats} />;
  } catch (error) {
    console.error("Teacher Page Error:", error);
    return <div>Error loading teachers. Please refresh.</div>;
  }
}
