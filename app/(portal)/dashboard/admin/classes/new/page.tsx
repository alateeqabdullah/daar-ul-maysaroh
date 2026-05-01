// app/(portal)/dashboard/admin/classes/new/page.tsx
import { Metadata } from "next";
import { NewClassClient } from "./new-class-client";
import { getAcademicYears, getClassLevels } from "../../actions/classes";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Create New Class | Admin Dashboard | Al-Maysaroh",
  description:
    "Create a new class with schedules, teacher assignment, and enrollment settings",
};

export default async function NewClassPage() {
  // Get current admin user ID from session or use a fallback
  // For now, get the first admin user
  let adminId = "";
  try {
    const adminUser = await prisma.user.findFirst({
      where: {
        role: { in: ["SUPER_ADMIN", "ADMIN"] },
        isActive: true,
      },
      select: { id: true },
    });
    if (adminUser) {
      adminId = adminUser.id;
    }
  } catch (error) {
    console.error("Error fetching admin user:", error);
  }

  try {
    const [teachers, academicYears, levels] = await Promise.all([
      prisma.teacher.findMany({
        where: { isAvailable: true },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              image: true,
            },
          },
        },
        orderBy: { user: { name: "asc" } },
      }),
      getAcademicYears(),
      getClassLevels(),
    ]);

    const formattedTeachers = teachers.map((teacher) => ({
      id: teacher.id,
      name: teacher.user?.name || "Unknown Teacher",
      email: teacher.user?.email || "",
      specialization: teacher.specialization,
    }));

    return (
      <NewClassClient
        teachers={formattedTeachers}
        academicYears={academicYears}
        levels={levels}
        adminId={adminId}
      />
    );
  } catch (error) {
    console.error("Error loading new class page:", error);
    return (
      <NewClassClient
        teachers={[]}
        academicYears={["2024-2025", "2025-2026"]}
        levels={["Beginner", "Intermediate", "Advanced", "Expert"]}
        adminId={adminId}
      />
    );
  }
}
