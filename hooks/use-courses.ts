
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

export interface Course {
  id: string;
  title: string;
  description: string;
  level: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
  type: "ONE_ON_ONE" | "GROUP";
  duration: number;
  price: number;
  features: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Teacher {
  id: string;
  name: string;
  qualification: string;
  specialization: string[];
  experience: string;
  bio: string;
  expertise: string[];
  hourlyRate?: number;
  isActive?: boolean;
}

export interface Enrollment {
  id: string;
  studentId: string;
  courseId: string;
  teacherId: string;
  startDate: string;
  endDate?: string;
  status: "ACTIVE" | "COMPLETED" | "CANCELLED";
  progress: number;
  totalClasses: number;
  completedClasses: number;
  createdAt: string;
  updatedAt: string;
  course: Course;
  teacher: {
    user: {
      name: string;
      email: string;
      phone?: string;
    };
  };
}

interface ApiResponse<T> {
  success: boolean;
  data: T;
  total?: number;
  error?: string;
}

interface CoursesParams {
  type?: string;
  level?: string;
  isActive?: boolean;
}

const fetcher = async (url: string): Promise<any> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  return response.json();
};

// Courses hooks
export function useCourses(params?: CoursesParams) {
  const queryParams = new URLSearchParams();

  if (params?.type) queryParams.append("type", params.type);
  if (params?.level) queryParams.append("level", params.level);
  if (params?.isActive !== undefined)
    queryParams.append("isActive", params.isActive.toString());

  const { data, error, isLoading, mutate } = useSWR<ApiResponse<Course[]>>(
    `/api/courses?${queryParams.toString()}`,
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 60000, // 1 minute
    }
  );

  return {
    courses: data?.data || [],
    isLoading,
    isError: error,
    total: data?.total || 0,
    mutate,
  };
}

export function useCourse(courseId: string) {
  const { data, error, isLoading, mutate } = useSWR<ApiResponse<Course>>(
    courseId ? `/api/courses/${courseId}` : null,
    fetcher,
    {
      revalidateOnFocus: false,
    }
  );

  return {
    course: data?.data,
    isLoading,
    isError: error,
    mutate,
  };
}

export function useTeachers() {
  const { data, error, isLoading, mutate } = useSWR<ApiResponse<Teacher[]>>(
    "/api/teachers",
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 300000, // 5 minutes
    }
  );

  return {
    teachers: data?.data || [],
    isLoading,
    isError: error,
    total: data?.total || 0,
    mutate,
  };
}

export function useTeacher(teacherId: string) {
  const { data, error, isLoading, mutate } = useSWR<ApiResponse<Teacher>>(
    teacherId ? `/api/teachers/${teacherId}` : null,
    fetcher,
    {
      revalidateOnFocus: false,
    }
  );

  return {
    teacher: data?.data,
    isLoading,
    isError: error,
    mutate,
  };
}

// Enrollment hooks
export function useEnrollments(studentId?: string) {
  const queryParams = new URLSearchParams();
  if (studentId) queryParams.append("studentId", studentId);

  const { data, error, isLoading, mutate } = useSWR<ApiResponse<Enrollment[]>>(
    studentId ? `/api/enrollments?${queryParams.toString()}` : null,
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 30000, // 30 seconds
    }
  );

  return {
    enrollments: data?.data || [],
    isLoading,
    isError: error,
    total: data?.total || 0,
    mutate,
  };
}

export function useEnrollment(enrollmentId: string) {
  const { data, error, isLoading, mutate } = useSWR<ApiResponse<Enrollment>>(
    enrollmentId ? `/api/enrollments/${enrollmentId}` : null,
    fetcher,
    {
      revalidateOnFocus: false,
    }
  );

  return {
    enrollment: data?.data,
    isLoading,
    isError: error,
    mutate,
  };
}

// Mutation hooks
export function useCreateEnrollment() {
  const { trigger, isMutating, error } = useSWRMutation(
    "/api/enrollments",
    async (url: string, { arg }: { arg: any }) => {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(arg),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to create enrollment");
      }

      return result;
    }
  );

  return {
    createEnrollment: trigger,
    isCreating: isMutating,
    error: error as Error,
  };
}

export function useUpdateEnrollment() {
  const { trigger, isMutating, error } = useSWRMutation(
    "/api/enrollments",
    async (url: string, { arg }: { arg: { id: string; data: any } }) => {
      const response = await fetch(`${url}/${arg.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(arg.data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to update enrollment");
      }

      return result;
    }
  );

  return {
    updateEnrollment: trigger,
    isUpdating: isMutating,
    error: error as Error,
  };
}

export function useCreateCourse() {
  const { trigger, isMutating, error } = useSWRMutation(
    "/api/courses",
    async (url: string, { arg }: { arg: Partial<Course> }) => {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(arg),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to create course");
      }

      return result;
    }
  );

  return {
    createCourse: trigger,
    isCreating: isMutating,
    error: error as Error,
  };
}

export function useUpdateCourse() {
  const { trigger, isMutating, error } = useSWRMutation(
    "/api/courses",
    async (
      url: string,
      { arg }: { arg: { id: string; data: Partial<Course> } }
    ) => {
      const response = await fetch(`${url}/${arg.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(arg.data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to update course");
      }

      return result;
    }
  );

  return {
    updateCourse: trigger,
    isUpdating: isMutating,
    error: error as Error,
  };
}

export function useDeleteCourse() {
  const { trigger, isMutating, error } = useSWRMutation(
    "/api/courses",
    async (url: string, { arg }: { arg: string }) => {
      const response = await fetch(`${url}/${arg}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to delete course");
      }

      return result;
    }
  );

  return {
    deleteCourse: trigger,
    isDeleting: isMutating,
    error: error as Error,
  };
}

// Utility functions
export function filterCoursesByType(
  courses: Course[],
  type: "ONE_ON_ONE" | "GROUP" | "ALL"
): Course[] {
  if (type === "ALL") return courses;
  return courses.filter((course) => course.type === type);
}

export function filterCoursesByLevel(
  courses: Course[],
  level: "BEGINNER" | "INTERMEDIATE" | "ADVANCED" | "ALL"
): Course[] {
  if (level === "ALL") return courses;
  return courses.filter((course) => course.level === level);
}

export function getCourseProgress(
  enrollments: Enrollment[],
  courseId: string
): number {
  const enrollment = enrollments.find((e) => e.courseId === courseId);
  return enrollment?.progress || 0;
}

export function isUserEnrolled(
  enrollments: Enrollment[],
  courseId: string
): boolean {
  return enrollments.some(
    (e) => e.courseId === courseId && e.status === "ACTIVE"
  );
}

export function getActiveEnrollments(enrollments: Enrollment[]): Enrollment[] {
  return enrollments.filter((e) => e.status === "ACTIVE");
}

export function getCompletedEnrollments(
  enrollments: Enrollment[]
): Enrollment[] {
  return enrollments.filter((e) => e.status === "COMPLETED");
}

// Custom hook for course enrollment status
export function useCourseEnrollmentStatus(
  courseId: string,
  studentId?: string
) {
  const { enrollments, isLoading, isError } = useEnrollments(studentId);

  const enrollment = enrollments.find((e) => e.courseId === courseId);
  const isEnrolled = Boolean(enrollment);
  const progress = enrollment?.progress || 0;
  const status = enrollment?.status;

  return {
    isEnrolled,
    progress,
    status,
    enrollment,
    isLoading,
    isError,
  };
}

// Hook for teacher's courses
export function useTeacherCourses(teacherId?: string) {
  const { courses, isLoading, isError } = useCourses();

  // In a real app, you'd have an API endpoint for teacher-specific courses
  // For now, we'll filter from all courses
  const teacherCourses = courses; // This would be filtered by teacherId in real implementation

  return {
    courses: teacherCourses,
    isLoading,
    isError,
    total: teacherCourses.length,
  };
}

// Hook for popular courses
export function usePopularCourses(limit?: number) {
  const { courses, isLoading, isError } = useCourses();

  // Mock popularity - in real app, this would come from analytics
  const popularCourses = courses
    .sort((a, b) => b.price - a.price) // Mock: higher price = more popular
    .slice(0, limit || 6);

  return {
    courses: popularCourses,
    isLoading,
    isError,
  };
}

// Hook for recommended courses based on user's level
export function useRecommendedCourses(
  userLevel?: "BEGINNER" | "INTERMEDIATE" | "ADVANCED"
) {
  const { courses, isLoading, isError } = useCourses();

  let recommendedCourses: Course[] = [];

  if (userLevel) {
    // Recommend courses at user's level and one level above
    const levels: ("BEGINNER" | "INTERMEDIATE" | "ADVANCED")[] = [userLevel];

    if (userLevel === "BEGINNER") levels.push("INTERMEDIATE");
    if (userLevel === "INTERMEDIATE") levels.push("ADVANCED");

    recommendedCourses = courses.filter(
      (course) => levels.includes(course.level) && course.isActive
    );
  } else {
    // If no user level, show beginner courses
    recommendedCourses = courses.filter(
      (course) => course.level === "BEGINNER" && course.isActive
    );
  }

  return {
    courses: recommendedCourses.slice(0, 4), // Limit to 4 recommendations
    isLoading,
    isError,
  };
}





// // src/hooks/use-courses.ts

// import useSWR from "swr";

// const fetcher = (url: string) => fetch(url).then((res) => res.json());

// export function useCourses(type?: string, level?: string) {
//   const params = new URLSearchParams();
//   if (type) params.append("type", type);
//   if (level) params.append("level", level);

//   const { data, error, isLoading } = useSWR(
//     `/api/courses?${params.toString()}`,
//     fetcher,
//     {
//       revalidateOnFocus: false,
//     }
//   );

//   return {
//     courses: data?.data || [],
//     isLoading,
//     isError: error,
//     total: data?.total || 0,
//   };
// }

// export function useTeachers() {
//   const { data, error, isLoading } = useSWR("/api/teachers", fetcher, {
//     revalidateOnFocus: false,
//   });

//   return {
//     teachers: data?.data || [],
//     isLoading,
//     isError: error,
//     total: data?.total || 0,
//   };
// }
