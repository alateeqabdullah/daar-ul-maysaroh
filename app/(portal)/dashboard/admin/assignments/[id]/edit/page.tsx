// app/(portal)/dashboard/admin/assignments/[id]/edit/page.tsx
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { EditAssignmentClient } from "./edit-assignment-client";
import {
  getAssignmentById,
  getAssignmentTypes,
} from "../../../actions/assignments";
import { getSubjects } from "../../../actions/subjects";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const assignment = await getAssignmentById(id);

  return {
    title: `Edit ${assignment?.title || "Assignment"} | Admin Dashboard | Al-Maysaroh`,
    description: "Edit assignment details",
  };
}

export default async function EditAssignmentPage({ params }: PageProps) {
  const { id } = await params;

  const [assignment, types, subjects] = await Promise.all([
    getAssignmentById(id),
    getAssignmentTypes(),
    getSubjects({ page: 1, limit: 100 }),
  ]);

  if (!assignment) {
    notFound();
  }

  return (
    <EditAssignmentClient
      assignment={assignment}
      types={types}
      subjects={subjects.data || []}
    />
  );
}
