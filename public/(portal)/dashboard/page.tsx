// app/(portal)/page.tsx
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import AdminDashboardPage from "./admin/page"; // Import your admin dashboard
import TeacherDashboardPage from "./teacher/page";
import StudentDashboardPage from "./student/page";
import ParentDashboardPage from "./parent/page";
// import SupportDashboardPage from "./support/page";


export default async function PortalPage() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  const user = session.user;
  const role = user?.role || "STUDENT";

  // Render role-specific content directly
  switch (role) {
    case "SUPER_ADMIN":
    case "ADMIN":
      // Use your existing admin dashboard component
      return <AdminDashboardPage />;
    case "TEACHER":
      return <TeacherDashboardPage user={user} />;
    case "STUDENT":
      return <StudentDashboardPage user={user} />;
    case "PARENT":
      return <ParentDashboardPage user={user} />;
    case "SUPPORT":
      // return <SupportDashboardPage user={user} />;
    default:
      return <StudentDashboardPage user={user} />;
  }
}
