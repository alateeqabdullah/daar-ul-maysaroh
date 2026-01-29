// src/app/dashboard/page.tsx
import DashboardWelcome from "@/components/(portal)/dashboard/dashboard-welcome";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  if (session.user.status !== "APPROVED") {
    redirect("/pending");
  }

  return (
    <div>
      <DashboardWelcome user={session.user} />
      {/* Add dashboard widgets based on user role */}
    </div>
  );
}
