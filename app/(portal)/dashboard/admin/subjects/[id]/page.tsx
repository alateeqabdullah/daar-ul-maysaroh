// app/(portal)/dashboard/admin/subjects/[id]/page.tsx
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { ViewSubjectClient } from "./view-subject-client";
import { getSubjectById } from "../../actions/subjects";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const subject = await getSubjectById(id);

  return {
    title: `${subject?.name || "Subject"} | Admin Dashboard | Al-Maysaroh`,
    description: subject?.description || "View subject details",
  };
}

export default async function ViewSubjectPage({ params }: PageProps) {
  const { id } = await params;
  const subject = await getSubjectById(id);

  if (!subject) {
    notFound();
  }

  return <ViewSubjectClient subject={subject} />;
}
