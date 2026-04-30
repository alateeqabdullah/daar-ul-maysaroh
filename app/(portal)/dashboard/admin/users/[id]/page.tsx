// app/(portal)/dashboard/admin/users/[id]/page.tsx
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { ViewUserClient } from "./view-user-client";
import { getUserById } from "../../actions/users";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const user = await getUserById(id);

  if (!user) {
    return { title: "User Not Found | Admin Dashboard" };
  }

  return {
    title: `${user.name} | User Details | Admin Dashboard`,
    description: `View and manage ${user.name}'s account details, role, and permissions`,
  };
}

export default async function ViewUserPage({ params }: PageProps) {
  const { id } = await params;
  const user = await getUserById(id);

  if (!user) {
    notFound();
  }

  return <ViewUserClient user={user} />;
}
