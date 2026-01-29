import useSWR from "swr";
import { EnrollmentStatus } from "@prisma/client";

export interface RecentEnrollment {
  id: string;
  student: string;
  course: string;
  teacher: string;
  date: Date;
  status: EnrollmentStatus;
  avatar: string;
}

export interface DashboardStats {
  totalStudents: number;
  totalTeachers: number;
  activeCourses: number;
  totalRevenue: number;
  studentGrowth: number;
  teacherGrowth: number;
  revenueGrowth: number;
  courseGrowth: number;
  activeEnrollments: number;
  completionRate: number;
  newStudents: number;
  newTeachers: number;
  recentEnrollments: RecentEnrollment[];
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useAdminStats() {
  const { data, error, isLoading, mutate } = useSWR<DashboardStats>(
    "/api/admin/stats",
    fetcher,
    {
      refreshInterval: 30000, // Refresh every 30 seconds
      revalidateOnFocus: true,
    }
  );

  return {
    stats: data,
    isLoading,
    isError: error,
    refresh: mutate,
  };
}
