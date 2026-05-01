// app/(portal)/dashboard/admin/users/[id]/edit/page.tsx
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { EditUserClient } from "./edit-user-client";
import { getUserById } from "../../../actions/users";

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
    title: `Edit ${user.name} | User Management | Admin Dashboard`,
  };
}

export default async function EditUserPage({ params }: PageProps) {
  const { id } = await params;
  const user = await getUserById(id);

  if (!user) {
    notFound();
  }

  return <EditUserClient user={user} />;
}
