// app/(portal)/page.tsx
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import AdminDashboardPage from "./admin/dashboard/page"; // Import your admin dashboard
import ParentDashboardPage from "./parent/page";
import StudentDashboardPage from "./student/page";
import TeacherDashboardPage from "./teacher/page";


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
      return <TeacherDashboardPage/>;
    case "STUDENT":
      return <StudentDashboardPage />;
    case "PARENT":
      return <ParentDashboardPage />;
    // case "SUPPORT":
    //   return <SupportDashboard />;
    default:
      return <StudentDashboardPage />;
  }
}
