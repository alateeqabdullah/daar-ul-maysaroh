// app/(portal)/dashboard/admin/assignments/page.tsx
import { Metadata } from "next";
import { AssignmentsClient } from "./assignments-client";
import {
  getAssignments,
  getAssignmentStats,
  getAssignmentTypes,
} from "../actions/assignments";
import { AssignmentType } from "@/app/generated/prisma/enums"
import { getSubjects } from "../actions/subjects";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Assignment Management | Admin Dashboard | Al-Maysaroh",
  description:
    "Manage assignments, grade submissions, and track student performance",
};

interface PageProps {
  searchParams: Promise<{
    page?: string;
    search?: string;
    subjectId?: string;
    classId?: string;
    type?: string;
  }>;
}

export default async function AssignmentsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const page = params.page ? parseInt(params.page) : 1;
  const search = params.search;
  const subjectId = params.subjectId;
  const classId = params.classId;
  const type = params.type as AssignmentType | undefined;

  let assignmentsData;
  let stats;
  let types;
  let subjects;
  let classes;
  let hasError = false;

  try {
    const results =
      await Promise.all([
        getAssignments({
          page,
          limit: 10,
          search,
          subjectId,
          classId,
          type,
        }),
        getAssignmentStats(),
        getAssignmentTypes(),
        getSubjects({ page: 1, limit: 100 }),
        prisma.class.findMany({
          where: { isActive: true },
          select: {
            id: true,
            name: true,
            code: true,
            level: true,
          },
          orderBy: { name: "asc" },
        }),
      ]);
    assignmentsData = results[0];
    stats = results[1];
    types = results[2];
    subjects = results[3];
    classes = results[4];
  } catch (error) {
    console.error("Error loading assignments page:", error);
    hasError = true;
  }

  if (hasError) {
    return (
      <AssignmentsClient
        initialAssignments={[]}
        initialStats={{
          totalAssignments: 0,
          pendingAssignments: 0,
          completedAssignments: 0,
          overdueAssignments: 0,
          averageScore: 0,
          submissionRate: 0,
          byType: {} as Record<string, number>,
        } satisfies {
          totalAssignments: number;
          pendingAssignments: number;
          completedAssignments: number;
          overdueAssignments: number;
          averageScore: number;
          submissionRate: number;
          byType: Record<string, number>;
        }}
        initialPage={page}
        initialSearch={search || ""}
        initialSubjectId={subjectId || ""}
        initialClassId={classId || ""}
        initialType={type || ""}
        totalPages={1}
        totalAssignments={0}
        types={[]}
        subjects={[]}
        classes={[]}
      />
    );
  }

  return (
    <AssignmentsClient
      initialAssignments={assignmentsData?.data || []}
      initialStats={stats!}
      initialPage={page}
      initialSearch={search || ""}
      initialSubjectId={subjectId || ""}
      initialClassId={classId || ""}
      initialType={type || ""}
      totalPages={assignmentsData?.totalPages || 1}
      totalAssignments={assignmentsData?.total || 0}
      types={types!}
      subjects={subjects?.data || []}
      classes={classes!}
    />
  );
}
