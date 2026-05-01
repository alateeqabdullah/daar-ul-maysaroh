// app/(portal)/dashboard/admin/classes/[id]/subjects/add/page.tsx
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { AddSubjectClient } from "./add-subject-client";
import { getClassById } from "../../../../actions/classes";
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
    title: `Add Subject - ${classData.name} | Admin Dashboard`,
    description: `Add a new subject to ${classData.name}`,
  };
}

export default async function AddSubjectPage({ params }: PageProps) {
  const { id } = await params;
  const [classData, teachers] = await Promise.all([
    getClassById(id),
    prisma.teacher.findMany({
      where: { isAvailable: true },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    }),
  ]);

  if (!classData) {
    notFound();
  }

  const formattedTeachers = teachers.map((teacher) => ({
    id: teacher.id,
    name: teacher.user?.name || "Unknown Teacher",
  }));

  return (
    <AddSubjectClient classData={classData} teachers={formattedTeachers} />
  );
}
