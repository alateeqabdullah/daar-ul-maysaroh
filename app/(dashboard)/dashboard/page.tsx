// // src/app/dashboard/page.tsx
// import DashboardWelcome from "@/components/dashboard/dashboard-welcome";
// import { auth } from "@/lib/auth";
// import { redirect } from "next/navigation";

// export default async function DashboardPage() {
//   const session = await auth();

//   if (!session) {
//     redirect("/login");
//   }

//   if (session.user.status !== "APPROVED") {
//     redirect("/pending");
//   }

//   return (
//     <div>
//       <DashboardWelcome user={session.user} />
//       {/* Add dashboard widgets based on user role */}
//     </div>
//   );
// }



// src/app/(dashboard)/page.tsx
import { auth } from "@/lib/auth";





// src/app/(dashboard)/admin/page.tsx
import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { getDashboardStats, getRecentActivities } from '@/lib/db/users'
import AdminDashboardClient from '@/components/dashboard/admin-dashboard-client'

export default async function AdminDashboardPage() {
  const session = await auth()

  if (!session) {
    redirect('/login')
  }

  if (!['SUPER_ADMIN', 'ADMIN'].includes(session.user.role)) {
    redirect('/dashboard')
  }

  try {
    const [stats, activities] = await Promise.all([
      getDashboardStats(),
      getRecentActivities(5),
    ])

    return <AdminDashboardClient stats={stats} activities={activities} />
  } catch (error) {
    console.error('Error loading dashboard data:', error)
    // Return empty state if there's an error
    return <AdminDashboardClient stats={null} activities={[]} />
  }
}