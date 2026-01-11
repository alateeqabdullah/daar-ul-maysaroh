import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { getPendingUsers } from "@/lib/db/users";
import UserApprovalsClient from "@/components/admin/user-approvals-client";

interface PageProps {
  searchParams: Promise<{
    page?: string;
    limit?: string;
    role?: string;
    search?: string;
  }>;
}

export const metadata = {
  title: "User Approvals | Admin Dashboard",
  description: "Review pending registration requests",
};

export default async function UserApprovalsPage({ searchParams }: PageProps) {
  // 1. Auth Guard
  const session = await auth();
  if (!session) redirect("/login");

  const userRole = session.user.role;
  if (userRole !== "SUPER_ADMIN" && userRole !== "ADMIN") {
    redirect("/dashboard");
  }

  // 2. Resolve Params (Next.js 15)
  const resolvedParams = await searchParams;
  const page = parseInt(resolvedParams.page || "1");
  const limit = parseInt(resolvedParams.limit || "10");
  const role = resolvedParams.role || "ALL";
  const search = resolvedParams.search || "";

  // 3. Fetch Data
  const { users, pagination } = await getPendingUsers(
    page,
    limit,
    role,
    search
  );

  // 4. Render Client
  return (
    <UserApprovalsClient
      initialUsers={users}
      pagination={pagination}
      filters={{ role, search }}
    />
  );
}
