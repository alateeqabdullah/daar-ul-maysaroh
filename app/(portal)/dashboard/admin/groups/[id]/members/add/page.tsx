// app/(portal)/dashboard/admin/groups/[id]/members/add/page.tsx
import { Metadata } from "next";
import { AddMembersClient } from "./add-members-client";
import { getGroupById } from "../../../../actions/groups";
import { prisma } from "@/lib/prisma";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const group = await getGroupById(id);
  
  return {
    title: `Add Members - ${group?.name || "Group"} | Admin Dashboard | Al-Maysaroh`,
    description: "Add students to the group",
  };
}

export default async function AddMembersPage({ params }: PageProps) {
  const { id } = await params;
  const group = await getGroupById(id);

  if (!group) {
    return <div>Group not found</div>;
  }

  // Get students not already in the group
  const existingMemberIds = group.members.map((m: any) => m.studentId);
  
  const availableStudents = await prisma.student.findMany({
    where: {
      id: { notIn: existingMemberIds },
      status: "ACTIVE",
      ...(group.classId && { classId: group.classId }),
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
    orderBy: { user: { name: "asc" } },
    take: 50,
  });

  const formattedStudents = availableStudents.map((student) => ({
    id: student.id,
    name: student.user.name,
    email: student.user.email,
    studentId: student.studentId,
  }));

  return (
    <AddMembersClient
      group={group}
      availableStudents={formattedStudents}
    />
  );
}