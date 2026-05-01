// app/(portal)/dashboard/admin/assignments/[id]/submissions/page.tsx
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { ManageSubmissionsClient } from "./manage-submissions-client";
import {
  getAssignmentById,
  getSubmissionsByAssignment,
} from "../../../actions/assignments";
import { prisma } from "@/lib/prisma";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const assignment = await getAssignmentById(id);

  return {
    title: `Submissions - ${assignment?.title || "Assignment"} | Admin Dashboard | Al-Maysaroh`,
    description:
      "Manage student submissions, grade assignments, and provide feedback",
  };
}

export default async function ManageSubmissionsPage({ params }: PageProps) {
  const { id } = await params;

  const assignment = await getAssignmentById(id);
  if (!assignment) {
    notFound();
  }

  const [submissions, students] = await Promise.all([
    getSubmissionsByAssignment(id),
    prisma.student.findMany({
      where: {
        enrollments: {
          some: {
            status: "ACTIVE",
            classId: assignment.subject.class.id,
          },
        },
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          },
        },
      },
      orderBy: { user: { name: "asc" } },
    }),
  ]);

  // Create a map of existing submissions
  const submissionMap = new Map();
  submissions.forEach((sub) => {
    submissionMap.set(sub.studentId, sub);
  });

  // Combine students with their submission status
  const studentsWithStatus = students.map((student) => ({
    id: student.id,
    studentId: student.id,
    studentName: student.user.name,
    studentEmail: student.user.email,
    studentImage: student.user.image,
    submittedAt: submissionMap.get(student.id)?.submittedAt || null,
    lateSubmission: submissionMap.get(student.id)?.lateSubmission || false,
    marks: submissionMap.get(student.id)?.marks || null,
    status: submissionMap.get(student.id)?.status || "NOT_SUBMITTED",
    feedback: submissionMap.get(student.id)?.feedback || null,
    submissionId: submissionMap.get(student.id)?.id || null,
  }));

  return (
    <ManageSubmissionsClient
      assignment={assignment}
      students={studentsWithStatus}
      submissions={submissions}
    />
  );
}
