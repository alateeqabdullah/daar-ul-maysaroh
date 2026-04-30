// src/app/(dashboard)/student/dashboard/page.tsx
import DashboardWelcome from "@/components/(portal)/dashboard/dashboard-welcome";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function StudentDashboard() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  if (session.user.role !== "STUDENT") {
    redirect("/dashboard");
  }

  return (
    <div className="space-y-6">
      <DashboardWelcome user={session.user} />
    </div>
  );
}
