// app/(portal)/dashboard/admin/groups/[id]/members/page.tsx
import { Metadata } from "next";
import { ManageMembersClient } from "./manage-members-client";
import {
  getGroupById,
  getAvailableStudentsForGroup,
} from "../../../actions/groups";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const group = await getGroupById(id);

  return {
    title: `Manage Members - ${group?.name || "Group"} | Admin Dashboard | Al-Maysaroh`,
    description: "Add or remove group members",
  };
}

export default async function ManageMembersPage({ params }: PageProps) {
  const { id } = await params;
  const group = await getGroupById(id);

  if (!group) {
    return <div>Group not found</div>;
  }

  const availableStudents = await getAvailableStudentsForGroup(id);

  return (
    <ManageMembersClient group={group} availableStudents={availableStudents} />
  );
}
