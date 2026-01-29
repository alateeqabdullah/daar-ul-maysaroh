// // src/hooks/use-enrollments.ts
// import useSWR from "swr";
// import useSWRMutation from "swr/mutation";

// const fetcher = (url: string) => fetch(url).then((res) => res.json());

// export function useEnrollments(studentId?: string) {
//   const params = new URLSearchParams();
//   if (studentId) params.append("studentId", studentId);

//   const { data, error, isLoading, mutate } = useSWR(
//     `/api/enrollments?${params.toString()}`,
//     fetcher
//   );

//   return {
//     enrollments: data?.data || [],
//     isLoading,
//     isError: error,
//     total: data?.total || 0,
//     mutate,
//   };
// }

// export function useCreateEnrollment() {
//   const { trigger, isMutating, error } = useSWRMutation(
//     "/api/enrollments",
//     async (url, { arg }: { arg: any }) => {
//       const response = await fetch(url, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(arg),
//       });
//       return response.json();
//     }
//   );

//   return {
//     createEnrollment: trigger,
//     isCreating: isMutating,
//     error,
//   };
// }




import useSWR from 'swr'
import useSWRMutation from 'swr/mutation'

const fetcher = (url: string) => fetch(url).then(res => res.json())

export function useEnrollments(studentId?: string) {
  const params = new URLSearchParams()
  if (studentId) params.append('studentId', studentId)

  const { data, error, isLoading, mutate } = useSWR(
    studentId ? `/api/enrollments?${params.toString()}` : null,
    fetcher
  )

  return {
    enrollments: data?.data || [],
    isLoading,
    isError: error,
    total: data?.total || 0,
    mutate
  }
}

export function useCreateEnrollment() {
  const { trigger, isMutating, error } = useSWRMutation(
    '/api/enrollments',
    async (url, { arg }: { arg: any }) => {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(arg)
      })
      return response.json()
    }
  )

  return {
    createEnrollment: trigger,
    isCreating: isMutating,
    error
  }
}