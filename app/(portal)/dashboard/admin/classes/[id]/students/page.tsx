// app/(portal)/dashboard/admin/classes/[id]/students/page.tsx
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { ManageStudentsClient } from "./manage-students-client";
import { getClassById } from "../../../actions/classes";
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
    title: `Manage Students - ${classData.name} | Admin Dashboard`,
    description: `Manage student enrollment for ${classData.name}`,
  };
}

export default async function ManageStudentsPage({ params }: PageProps) {
  const { id } = await params;
  const [classData, availableStudents] = await Promise.all([
    getClassById(id),
    prisma.student.findMany({
      where: {
        enrollments: {
          none: { classId: id },
        },
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      take: 50,
    }),
  ]);

  if (!classData) {
    notFound();
  }

  const formattedStudents = availableStudents.map((student) => ({
    id: student.id,
    name: student.user.name,
    email: student.user.email,
    studentId: student.studentId,
  }));

  return (
    <ManageStudentsClient
      classData={classData}
      availableStudents={formattedStudents}
    />
  );
}
