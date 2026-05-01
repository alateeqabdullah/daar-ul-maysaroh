// app/(portal)/dashboard/admin/classes/[id]/page.tsx
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { ViewClassClient } from "./view-class-client";
import { getClassById } from "../../actions/classes";

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
    title: `${classData.name} | Class Details | Admin Dashboard`,
    description: `Manage ${classData.name} - view schedule, enrollment, and class materials`,
  };
}

export default async function ViewClassPage({ params }: PageProps) {
  const { id } = await params;
  const classData = await getClassById(id);

  if (!classData) {
    notFound();
  }

  return <ViewClassClient classData={classData} />;
}
