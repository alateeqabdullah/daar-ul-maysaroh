"use client";

import { useSession } from "next-auth/react";

interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: string;
  studentId?: string;
  teacherId?: string;
  avatar?: string;
}

interface UseAuthReturn {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isStudent: boolean;
  isTeacher: boolean;
  isAdmin: boolean;
}

export function useAuth(): UseAuthReturn {
  const { data: session, status } = useSession();

  const user = session?.user as AuthUser | null;
  const isAuthenticated = !!user;
  const isLoading = status === "loading";
  const isStudent = user?.role === "STUDENT";
  const isTeacher = user?.role === "TEACHER";
  const isAdmin = user?.role === "ADMIN";

  return {
    user,
    isAuthenticated,
    isLoading,
    isStudent,
    isTeacher,
    isAdmin,
  };
}

// // src/hooks/use-auth.ts
// 'use client';

// import { useSession } from 'next-auth/react';

// export function useAuth() {
//   const { data: session, status, update } = useSession();

//   return {
//     user: session?.user,
//     isAuthenticated: !!session?.user,
//     isLoading: status === 'loading',
//     isStudent: session?.user?.role === 'STUDENT',
//     isTeacher: session?.user?.role === 'TEACHER',
//     isAdmin: session?.user?.role === 'ADMIN',
//     updateSession: update,
//   };
// }
