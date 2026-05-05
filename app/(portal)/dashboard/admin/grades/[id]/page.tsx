// app/(portal)/dashboard/admin/grades/[id]/page.tsx
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { ViewGradeClient } from "./view-grade-client";
import { getGradeById } from "../../actions/grades";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const grade = await getGradeById(id);

  return {
    title: `${grade?.student.user.name} - ${grade?.subject.name} | Grade Details | Al-Maysaroh`,
    description: `Grade details for ${grade?.student.user.name} in ${grade?.subject.name}`,
  };
}

export default async function ViewGradePage({ params }: PageProps) {
  const { id } = await params;
  const grade = await getGradeById(id);

  if (!grade) {
    notFound();
  }

  return <ViewGradeClient grade={grade} />;
}
