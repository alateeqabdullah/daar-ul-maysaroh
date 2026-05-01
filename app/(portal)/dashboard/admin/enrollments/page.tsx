// app/(portal)/dashboard/admin/enrollments/page.tsx
import { Metadata } from "next";
import { EnrollmentsClient } from "./enrollments-client";
import { getEnrollments, getEnrollmentStats } from "../actions/enrollments";

export const metadata: Metadata = {
  title: "Enrollment Management | Admin Dashboard | Al-Maysaroh",
  description:
    "Manage student enrollments, track progress, and monitor attendance",
};

interface PageProps {
  searchParams: Promise<{
    page?: string;
    search?: string;
    status?: string;
  }>;
}

export default async function EnrollmentsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const page = params.page ? parseInt(params.page) : 1;
  const search = params.search;
  const status = params.status as any;

  let enrollmentsData;
  let stats;

  try {
    const [eData, sData] = await Promise.all([
      getEnrollments({ page, limit: 10, search, status }),
      getEnrollmentStats(),
    ]);
    enrollmentsData = eData;
    stats = sData;
  } catch (error) {
    console.error("Error loading enrollments page:", error);
  }

  if (enrollmentsData && stats) {
    return (
      <EnrollmentsClient
        initialEnrollments={enrollmentsData.data}
        initialStats={{
          totalEnrollments: (stats.byStatus.ACTIVE || 0) + (stats.byStatus.COMPLETED || 0) + (stats.byStatus.DROPPED || 0),
          activeEnrollments: stats.byStatus.ACTIVE || 0,
          completedEnrollments: stats.byStatus.COMPLETED || 0,
          droppedEnrollments: stats.byStatus.DROPPED || 0,
          averageProgress: stats.averageProgress,
          completionRate: stats.completionRate,
        }}
        initialPage={page}
        totalPages={enrollmentsData.totalPages}
        totalEnrollments={enrollmentsData.total}
      />
    );
  } else {
    return (
      <EnrollmentsClient
        initialEnrollments={[]}
        initialStats={{
          totalEnrollments: 0,
          activeEnrollments: 0,
          completedEnrollments: 0,
          droppedEnrollments: 0,
          averageProgress: 0,
          completionRate: 0,
        }}
        initialPage={1}
        totalPages={1}
        totalEnrollments={0}
      />
    );
  }
}
