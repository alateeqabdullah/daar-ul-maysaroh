// app/(portal)/dashboard/admin/users/add/page.tsx
import { Metadata } from "next";
import { AddUserClient } from "./add-user-client";

export const metadata: Metadata = {
  title: "Add New User | Admin Dashboard | Al-Maysaroh",
  description: "Create new user accounts with role-based profiles",
};

export default function AddUserPage() {
  return <AddUserClient />;
}
