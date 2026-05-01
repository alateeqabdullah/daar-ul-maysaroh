// app/(portal)/dashboard/admin/assignments/[id]/page.tsx
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { ViewAssignmentClient } from "./view-assignment-client";
import { getAssignmentById } from "../../actions/assignments";
import { AssignmentType } from "@/app/generated/prisma/enums";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const assignment = await getAssignmentById(id);

  return {
    title: `${assignment?.title || "Assignment"} | Admin Dashboard | Al-Maysaroh`,
    description:
      assignment?.description || "View assignment details and submissions",
  };
}

export default async function ViewAssignmentPage({ params }: PageProps) {
  const { id } = await params;
  const assignment = await getAssignmentById(id);

  if (!assignment) {
    notFound();
  }

  const formattedAssignment = {
    ...assignment,
    createdAt: assignment.createdAt.toISOString(),
    updatedAt: assignment.updatedAt.toISOString(),
    dueDate: assignment.dueDate.toISOString(),
    type: assignment.type as AssignmentType,
    subject: assignment.subject ? {
      id: assignment.subject.id,
      name: assignment.subject.name,
      code: assignment.subject.code,
    } : undefined,
    createdBy: assignment.createdBy ? {
      name: assignment.createdBy.name,
    } : undefined,
  };

  return <ViewAssignmentClient assignment={formattedAssignment as any} />;
}
