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
  let teachersData: any[] = [];
  let academicYears: string[] = ["2024-2025", "2025-2026"];
  let levels: string[] = ["Beginner", "Intermediate", "Advanced", "Expert"];

  try {
    const [teachersRes, yearsRes, levelsRes] = await Promise.all([
      prisma.teacher.findMany({
        where: { isAvailable: true },
        include: {
          user: { select: { id: true, name: true, email: true, image: true } },
        },
        orderBy: { user: { name: "asc" } },
      }),
      getAcademicYears(),
      getClassLevels(),
    ]);
    teachersData = teachersRes;
    if (yearsRes) academicYears = yearsRes;
    if (levelsRes) levels = levelsRes;
  } catch (error) {
    console.error("Error loading new class page:", error);
  }

  const formattedTeachers = teachersData.map((teacher) => ({
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
    />
  );
}
