// src/app/(dashboard)/student/dashboard/page.tsx
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import DashboardWelcome from "@/components/dashboard/dashboard-welcome";

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
