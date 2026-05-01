// app/(portal)/dashboard/admin/classes/page.tsx
import { Metadata } from "next";
import { ClassesClient } from "./classes-client";
import {
  getClasses,
  getClassStats,
  getAcademicYears,
  getClassLevels,
} from "../actions/classes";
import { prisma } from "@/lib/prisma"; // Add this import

export const metadata: Metadata = {
  title: "Class Management | Admin Dashboard | Al-Maysaroh",
  description: "Manage classes, schedules, enrollments, and subjects",
};

interface PageProps {
  searchParams: Promise<{
    page?: string;
    search?: string;
    level?: string;
    academicYear?: string;
    teacherId?: string;
  }>;
}

// app/(portal)/dashboard/admin/classes/page.tsx

export default async function AdminClassesPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const page = params.page ? parseInt(params.page) : 1;
  const search = params.search;
  const level = params.level;
  const academicYear = params.academicYear;
  const teacherId = params.teacherId;

  try {
    const [classesData, stats, academicYears, levels, teachers] = await Promise.all([
      getClasses({ page, limit: 10, search, level, academicYear, teacherId }),
      getClassStats(),
      getAcademicYears(),
      getClassLevels(),
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
    ]);

    // Ensure we always have arrays even if empty
    const formattedTeachers = teachers.map((teacher) => ({
      id: teacher.id,
      user: {
        name: teacher.user?.name || "Unknown Teacher",
        email: teacher.user?.email || "",
        image: teacher.user?.image || null,
      },
      specialization: teacher.specialization,
    }));

    return (
      <ClassesClient
        initialClasses={classesData?.data || []}
        initialStats={stats || { totalClasses: 0, activeClasses: 0, totalEnrollments: 0, averageClassSize: 0, classesByLevel: {} }}
        initialPage={page}
        initialSearch={search}
        initialLevel={level}
        initialAcademicYear={academicYear}
        initialTeacherId={teacherId}
        totalPages={classesData?.totalPages || 1}
        totalClasses={classesData?.total || 0}
        academicYears={academicYears || []}
        levels={levels || []}
        teachers={formattedTeachers}
      />
    );
  } catch (error) {
    console.error("Error loading classes page:", error);
    // Return empty state on error
    return (
      <ClassesClient
        initialClasses={[]}
        initialStats={{ totalClasses: 0, activeClasses: 0, totalEnrollments: 0, averageClassSize: 0, classesByLevel: {} }}
        initialPage={1}
        initialSearch=""
        initialLevel=""
        initialAcademicYear=""
        initialTeacherId=""
        totalPages={1}
        totalClasses={0}
        academicYears={[]}
        levels={[]}
        teachers={[]}
      />
    );
  }
}