// app/(portal)/dashboard/admin/subjects/[id]/edit/page.tsx
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { EditSubjectClient } from "./edit-subject-client";
import {
  getSubjectById,
  getSubjectCategories,
  getAvailableTeachers,
  getAvailableClasses,
} from "../../../actions/subjects";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const subject = await getSubjectById(id);

  return {
    title: `Edit ${subject?.name || "Subject"} | Admin Dashboard | Al-Maysaroh`,
    description: "Edit subject details and configuration",
  };
}

export default async function EditSubjectPage({ params }: PageProps) {
  const { id } = await params;

  const [subject, categories, teachers, classes] = await Promise.all([
    getSubjectById(id),
    getSubjectCategories(),
    getAvailableTeachers(),
    getAvailableClasses(),
  ]);

  if (!subject) {
    notFound();
  }

  return (
    <EditSubjectClient
      subject={subject}
      categories={categories}
      teachers={teachers}
      classes={classes}
    />
  );
}
