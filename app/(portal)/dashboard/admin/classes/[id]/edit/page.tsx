// app/(portal)/dashboard/admin/classes/[id]/edit/page.tsx
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { EditClassClient } from "./edit-class-client";
import {
  getClassById,
  getClassLevels,
  getAcademicYears,
} from "../../../actions/classes";
import { prisma } from "@/lib/prisma";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const classData = await getClassById(id);

  if (!classData) {
    return { title: "Class Not Found | Admin Dashboard" };
  }

  return {
    title: `Edit ${classData.name} | Class Management | Admin Dashboard`,
    description: `Edit class details, schedule, and settings for ${classData.name}`,
  };
}

export default async function EditClassPage({ params }: PageProps) {
  const { id } = await params;
  const [classData, teachers, academicYears, levels] = await Promise.all([
    getClassById(id),
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

  if (!classData) {
    notFound();
  }

  const formattedTeachers = teachers.map((teacher) => ({
    id: teacher.id,
    name: teacher.user?.name || "Unknown Teacher",
    email: teacher.user?.email || "",
    specialization: teacher.specialization,
  }));

  return (
    <EditClassClient
      classData={classData}
      teachers={formattedTeachers}
      academicYears={academicYears}
      levels={levels}
    />
  );
}
