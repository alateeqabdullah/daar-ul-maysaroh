// app/(portal)/dashboard/admin/groups/[id]/edit/page.tsx
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { EditGroupClient } from "./edit-group-client";
import { getGroupById, getGroupTypes } from "../../../actions/groups";
import { prisma } from "@/lib/prisma";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const group = await getGroupById(id);

  return {
    title: `Edit ${group?.name || "Group"} | Admin Dashboard | Al-Maysaroh`,
    description: "Edit group details and settings",
  };
}

export default async function EditGroupPage({ params }: PageProps) {
  const { id } = await params;

  const [group, types, teachers, classes] = await Promise.all([
    getGroupById(id),
    getGroupTypes(),
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
      orderBy: { user: { name: "asc" } },
    }),
    prisma.class.findMany({
      where: { isActive: true },
      select: {
        id: true,
        name: true,
        code: true,
        level: true,
      },
      orderBy: { name: "asc" },
    }),
  ]);

  if (!group) {
    notFound();
  }

  const formattedTeachers = teachers.map((teacher) => ({
    id: teacher.id,
    name: teacher.user.name,
    email: teacher.user.email,
  }));

  return (
    <EditGroupClient
      group={group}
      types={types}
      teachers={formattedTeachers}
      classes={classes}
    />
  );
}
