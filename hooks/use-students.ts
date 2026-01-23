import useSWR from "swr";

export interface Student {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  level: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
  enrolledCourses: number;
  joinDate: string;
  progress: number;
  status: "active" | "inactive";
}

interface StudentsResponse {
  students: Student[];
  total: number;
}

// Standard JSON fetcher
const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || "Failed to fetch data");
  }
  return res.json();
};

export function useStudents(searchTerm: string, statusFilter: string) {
  // The key is null if we shouldn't fetch, otherwise it's the URL
  const shouldFetch = true;
  const url = shouldFetch
    ? `/api/admin/students?search=${encodeURIComponent(searchTerm)}&status=${statusFilter}`
    : null;

  const { data, error, isLoading, mutate } = useSWR<StudentsResponse>(
    url,
    fetcher,
    {
      keepPreviousData: true, // Keeps list visible while typing search
      revalidateOnFocus: false,
    }
  );

  return {
    students: data?.students || [],
    total: data?.total || 0,
    isLoading,
    isError: error,
    refetch: mutate,
  };
}
