// app/(portal)/dashboard/admin/users/page.tsx
import { Metadata } from "next";
import { UsersClient } from "./users-client";
import { getUsers, getUserStats } from "../actions/users";

export const metadata: Metadata = {
  title: "User Management | Admin Dashboard | Al-Maysaroh",
  description: "Manage users, approve registrations, and control access",
};

interface PageProps {
  searchParams: Promise<{
    page?: string;
    role?: string;
    status?: string;
    search?: string;
  }>;
}

export default async function AdminUsersPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const page = params.page ? parseInt(params.page) : 1;
  const role = params.role as any;
  const status = params.status as any;
  const search = params.search;

  const [usersData, stats] = await Promise.all([
    getUsers({ page, limit: 10, role, status, search }),
    getUserStats(),
  ]);

  return (
    <UsersClient
      initialUsers={usersData.data}
      initialStats={stats}
      initialPage={page}
      initialRole={role}
      initialStatus={status}
      initialSearch={search}
      totalPages={usersData.totalPages}
      totalUsers={usersData.total}
    />
  );
}
