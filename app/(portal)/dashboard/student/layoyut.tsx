// src/app/(dashboard)/student/layout.tsx
import type { Metadata } from "next";

import { redirect } from "next/navigation";
import StudentSidebar from "@/components/layout/student-sidebar";
import StudentHeader from "@/components/layout/student-header";
import { Toaster } from "@/components/ui/sonner";
import { auth } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Student Portal - MadrasahPro",
  description: "Student dashboard for MadrasahPro",
};

export default async function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  if (session.user.role !== "STUDENT") {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <StudentSidebar user={session.user} />
      <div className="lg:pl-64">
        <StudentHeader user={session.user} />
        <main className="py-8">
          <div className="px-4 sm:px-6 lg:px-8">{children}</div>
        </main>
        <Toaster />
      </div>
    </div>
  );
}
