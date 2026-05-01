// app/(portal)/dashboard/admin/classes/[id]/schedule/page.tsx
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { ManageScheduleClient } from "./manage-schedule-client";
import { getClassById } from "../../../actions/classes";

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
    title: `Manage Schedule - ${classData.name} | Admin Dashboard`,
    description: `Manage weekly schedule for ${classData.name}`,
  };
}

export default async function ManageSchedulePage({ params }: PageProps) {
  const { id } = await params;
  const classData = await getClassById(id);

  if (!classData) {
    notFound();
  }

  return <ManageScheduleClient classData={classData} />;
}
