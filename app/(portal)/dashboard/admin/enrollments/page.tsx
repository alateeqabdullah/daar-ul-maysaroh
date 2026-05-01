// app/(portal)/dashboard/admin/enrollments/page.tsx
import { Metadata } from "next";
import { EnrollmentsClient } from "./enrollments-client";
import {
  getEnrollments,
  getEnrollmentStats,
  getEnrollmentStatuses,
  getEnrollmentTypes,
  type EnrollmentWithRelations,
} from "../actions/enrollments";
import { prisma } from "@/lib/prisma";
import { EnrollmentStatus, EnrollmentType } from "@/app/generated/prisma/enums";

export const metadata: Metadata = {
  title: "Enrollment Management | Admin Dashboard | Al-Maysaroh",
  description: "Manage student enrollments, track progress, and handle class registrations",
};

interface PageProps {
  searchParams: Promise<{
    page?: string;
    search?: string;
    classId?: string;
    status?: string;
    type?: string;
  }>;
}

export default async function EnrollmentsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const page = params.page ? parseInt(params.page) : 1;
  const search = params.search;
  const classId = params.classId;
  const status = params.status as EnrollmentStatus | undefined;
  const type = params.type as EnrollmentType | undefined;

  let data: EnrollmentWithRelations[];
  let stats;
  let statuses;
  let types;
  let classes: { id: string; name: string; code: string; level: string }[];
  let totalPages = 1;
  let totalEnrollments = 0;

  try {
    const [enrollmentsData, statsRes, statusesRes, typesRes, classesRes] = await Promise.all([
      getEnrollments({
        page,
        limit: 10,
        search,
        classId,
        status,
        enrollmentType: type,
      }),
      getEnrollmentStats(),
      getEnrollmentStatuses(),
      getEnrollmentTypes(),
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
    data = enrollmentsData.data || [];
    stats = statsRes;
    statuses = statusesRes;
    types = typesRes;
    classes = classesRes;
    totalPages = enrollmentsData.totalPages || 1;
    totalEnrollments = enrollmentsData.total || 0;
  } catch (error) {
    console.error("Error loading enrollments page:", error);
    data = [];
    stats = {
      totalEnrollments: 0,
      activeEnrollments: 0,
      completedEnrollments: 0,
      droppedEnrollments: 0,
      suspendedEnrollments: 0,
      failedEnrollments: 0,
      byClass: [],
      byLevel: [],
      recentEnrollments: 0,
      completionRate: 0,
    };
    statuses = ["ACTIVE", "COMPLETED", "DROPPED", "SUSPENDED", "FAILED"];
    types = ["REGULAR", "TRIAL", "AUDIT", "MAKEUP"];
    classes = [];
  }

  return (
    <EnrollmentsClient
      initialEnrollments={data}
      initialStats={stats}
      initialPage={page}
      initialSearch={search || ""}
      initialClassId={classId || ""}
      initialStatus={status || ""}
      initialType={type || ""}
      totalPages={totalPages}
      totalEnrollments={totalEnrollments}
      statuses={statuses}
      types={types}
      classes={classes}
    />
  );
}