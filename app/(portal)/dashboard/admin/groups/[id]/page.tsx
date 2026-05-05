// app/(portal)/dashboard/admin/groups/[id]/page.tsx
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { ViewGroupClient } from "./view-group-client";
import { getGroupById } from "../../actions/groups";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const group = await getGroupById(id);
  
  return {
    title: `${group?.name || "Group"} | Admin Dashboard | Al-Maysaroh`,
    description: group?.description || "View group details and members",
  };
}

export default async function ViewGroupPage({ params }: PageProps) {
  const { id } = await params;
  const group = await getGroupById(id);

  if (!group) {
    notFound();
  }

  return <ViewGroupClient group={group} />;
}