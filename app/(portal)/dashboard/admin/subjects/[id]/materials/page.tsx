// app/(portal)/dashboard/admin/subjects/[id]/materials/page.tsx
import { Metadata } from "next";
import { MaterialsClient } from "./materials-client";
import { getSubjectById } from "../../../actions/subjects";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const subject = await getSubjectById(id);

  return {
    title: `Materials - ${subject?.name || "Subject"} | Admin Dashboard`,
    description: "Manage subject materials and resources",
  };
}

export default async function MaterialsPage({ params }: PageProps) {
  const { id } = await params;
  const subject = await getSubjectById(id);

  if (!subject) {
    return <div>Subject not found</div>;
  }

  return <MaterialsClient subjectId={id} subjectName={subject.name} />;
}
