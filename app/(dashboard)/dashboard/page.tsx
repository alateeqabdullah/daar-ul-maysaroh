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
import { redirect } from 'next/navigation'
import { getDashboardStats, getRecentActivities } from '@/lib/db/users' // Both now exist
import AdminDashboardClient from '@/components/dashboard/admin-dashboard-client'

export default async function AdminDashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const session = await auth()

  if (!session) {
    redirect('/login')
  }

  if (!['SUPER_ADMIN', 'ADMIN'].includes(session.user.role)) {
    redirect('/dashboard')
  }

  // Comply with Next.js 15
  await searchParams;

  let stats = null;
  let activities: any[] = [];

  try {
    // Parallel fetch using the now-defined functions
    const [statsData, activitiesData] = await Promise.all([
      getDashboardStats(),
      getRecentActivities(5),
    ])

    stats = statsData;
    activities = activitiesData;
  } catch (error) {
    console.error('Error loading dashboard data:', error)
  }

  // Return JSX outside of try/catch to maintain pure rendering
  return (
    <AdminDashboardClient 
      stats={stats} 
      activities={activities} 
    />
  )
}