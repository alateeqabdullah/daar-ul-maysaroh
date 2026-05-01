// // // app/(portal)/dashboard/admin/layout.tsx
// // "use client";

// // import { useState, useEffect } from "react";
// // import Link from "next/link";
// // import { usePathname } from "next/navigation";
// // import {
// //   LayoutDashboard,
// //   Users,
// //   GraduationCap,
// //   BookOpen,
// //   ScrollText,
// //   Group,
// //   GitBranch,
// //   DollarSign,
// //   ShieldCheck,
// //   Calendar,
// //   Settings,
// //   ChevronLeft,
// //   ChevronRight,
// //   Menu,
// //   X,
// //   LogOut,
// //   User,
// //   Bell,
// //   Moon,
// //   Sun,
// //   Crown,
// // } from "lucide-react";
// // import { Button } from "@/components/ui/button";
// // import { Avatar, AvatarFallback } from "@/components/ui/avatar";
// // import {
// //   DropdownMenu,
// //   DropdownMenuContent,
// //   DropdownMenuItem,
// //   DropdownMenuLabel,
// //   DropdownMenuSeparator,
// //   DropdownMenuTrigger,
// // } from "@/components/ui/dropdown-menu";
// // import { cn } from "@/lib/utils";
// // import { useTheme } from "next-themes";

// // // Navigation Items
// // const NAV_ITEMS = [
// //   { name: "Dashboard", href: "/dashboard/admin", icon: LayoutDashboard },
// //   { name: "Users", href: "/dashboard/admin/users", icon: Users },
// //   { name: "Classes", href: "/dashboard/admin/classes", icon: GraduationCap },
// //   { name: "Subjects", href: "/dashboard/admin/subjects", icon: BookOpen },
// //   {
// //     name: "Enrollments",
// //     href: "/dashboard/admin/enrollments",
// //     icon: ScrollText,
// //   },
// //   {
// //     name: "Assignments",
// //     href: "/dashboard/admin/assignments",
// //     icon: ScrollText,
// //   },
// //   { name: "Grades", href: "/dashboard/admin/grades", icon: ScrollText },
// //   { name: "Student Groups", href: "/dashboard/admin/groups", icon: Group },
// //   {
// //     name: "Quran Progress",
// //     href: "/dashboard/admin/quran-progress",
// //     icon: BookOpen,
// //   },
// //   {
// //     name: "Hifz Progress",
// //     href: "/dashboard/admin/hifz-progress",
// //     icon: BookOpen,
// //   },
// //   {
// //     name: "Sanad Chains",
// //     href: "/dashboard/admin/sanad-chains",
// //     icon: GitBranch,
// //   },
// //   { name: "Invoices", href: "/dashboard/admin/invoices", icon: DollarSign },
// //   { name: "Payments", href: "/dashboard/admin/payments", icon: DollarSign },
// //   { name: "Expenses", href: "/dashboard/admin/expenses", icon: DollarSign },
// //   { name: "Payrolls", href: "/dashboard/admin/payrolls", icon: DollarSign },
// //   {
// //     name: "Announcements",
// //     href: "/dashboard/admin/announcements",
// //     icon: ShieldCheck,
// //   },
// //   { name: "Events", href: "/dashboard/admin/events", icon: Calendar },
// //   {
// //     name: "Pricing Plans",
// //     href: "/dashboard/admin/pricing-plans",
// //     icon: DollarSign,
// //   },
// //   {
// //     name: "Subscriptions",
// //     href: "/dashboard/admin/subscriptions",
// //     icon: DollarSign,
// //   },
// //   {
// //     name: "System Settings",
// //     href: "/dashboard/admin/settings",
// //     icon: Settings,
// //   },
// // ];

// // // Grouped Navigation
// // const NAV_GROUPS = [
// //   {
// //     title: "Overview",
// //     items: [{ name: "Dashboard", icon: LayoutDashboard }],
// //   },
// //   {
// //     title: "Academics",
// //     items: [
// //       { name: "Users", icon: Users },
// //       { name: "Classes", icon: GraduationCap },
// //       { name: "Subjects", icon: BookOpen },
// //       { name: "Enrollments", icon: ScrollText },
// //       { name: "Assignments", icon: ScrollText },
// //       { name: "Grades", icon: ScrollText },
// //       { name: "Student Groups", icon: Group },
// //     ],
// //   },
// //   {
// //     title: "Quranic",
// //     items: [
// //       { name: "Quran Progress", icon: BookOpen },
// //       { name: "Hifz Progress", icon: BookOpen },
// //       { name: "Sanad Chains", icon: GitBranch },
// //     ],
// //   },
// //   {
// //     title: "Finance",
// //     items: [
// //       { name: "Invoices", icon: DollarSign },
// //       { name: "Payments", icon: DollarSign },
// //       { name: "Expenses", icon: DollarSign },
// //       { name: "Payrolls", icon: DollarSign },
// //       { name: "Pricing Plans", icon: DollarSign },
// //       { name: "Subscriptions", icon: DollarSign },
// //     ],
// //   },
// //   {
// //     title: "Communication",
// //     items: [
// //       { name: "Announcements", icon: ShieldCheck },
// //       { name: "Events", icon: Calendar },
// //     ],
// //   },
// //   {
// //     title: "System",
// //     items: [{ name: "System Settings", icon: Settings }],
// //   },
// // ];

// // interface AdminLayoutProps {
// //   children: React.ReactNode;
// // }

// // export default function AdminLayout({ children }: AdminLayoutProps) {
// //   const pathname = usePathname();
// //   const [sidebarOpen, setSidebarOpen] = useState(true);
// //   const [isMobile, setIsMobile] = useState(false);
// //   const { theme, setTheme } = useTheme();

// //   useEffect(() => {
// //     const checkMobile = () => {
// //       const mobile = window.innerWidth < 1024;
// //       setIsMobile(mobile);
// //       if (mobile) setSidebarOpen(false);
// //     };
// //     checkMobile();
// //     window.addEventListener("resize", checkMobile);
// //     return () => window.removeEventListener("resize", checkMobile);
// //   }, []);

// //   const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

// //   const getInitials = () => {
// //     // This would come from your session/user data
// //     return "AA";
// //   };

// //   const getUserName = () => {
// //     return "Admin User";
// //   };

// //   const getUserEmail = () => {
// //     return "admin@almaysaroh.com";
// //   };

// //   return (
// //     <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
// //       {/* Mobile Menu Button */}
// //       <div className="fixed top-4 left-4 z-50 lg:hidden">
// //         <Button
// //           variant="outline"
// //           size="icon"
// //           onClick={toggleSidebar}
// //           className="rounded-full bg-white dark:bg-slate-900 shadow-lg"
// //         >
// //           <Menu className="w-5 h-5" />
// //         </Button>
// //       </div>

// //       {/* Sidebar Overlay (Mobile) */}
// //       {isMobile && sidebarOpen && (
// //         <div
// //           className="fixed inset-0 bg-black/50 z-40 lg:hidden"
// //           onClick={() => setSidebarOpen(false)}
// //         />
// //       )}

// //       {/* Sidebar */}
// //       <aside
// //         className={cn(
// //           "fixed left-0 top-0 z-40 h-screen bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 transition-all duration-300 flex flex-col",
// //           sidebarOpen ? "w-72" : "w-20",
// //           isMobile && !sidebarOpen && "-translate-x-full",
// //         )}
// //       >
// //         {/* Logo */}
// //         <div
// //           className={cn(
// //             "flex items-center h-16 px-4 border-b border-slate-200 dark:border-slate-800",
// //             sidebarOpen ? "justify-between" : "justify-center",
// //           )}
// //         >
// //           {sidebarOpen ? (
// //             <>
// //               <div className="flex items-center gap-2">
// //                 <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-amber-500 flex items-center justify-center">
// //                   <Crown className="w-4 h-4 text-white" />
// //                 </div>
// //                 <span className="font-black text-sm">
// //                   AL-MAYSAROH
// //                   <br />
// //                   <span className="text-[8px] text-purple-500">
// //                     Admin Portal
// //                   </span>
// //                 </span>
// //               </div>
// //               <Button
// //                 variant="ghost"
// //                 size="icon"
// //                 onClick={toggleSidebar}
// //                 className="hidden lg:flex"
// //               >
// //                 <ChevronLeft className="w-4 h-4" />
// //               </Button>
// //             </>
// //           ) : (
// //             <Button
// //               variant="ghost"
// //               size="icon"
// //               onClick={toggleSidebar}
// //               className="hidden lg:flex"
// //             >
// //               <ChevronRight className="w-4 h-4" />
// //             </Button>
// //           )}
// //         </div>

// //         {/* Navigation */}
// //         <nav className="flex-1 overflow-y-auto py-4">
// //           <div className="space-y-6 px-3">
// //             {NAV_GROUPS.map((group) => (
// //               <div key={group.title} className="space-y-1">
// //                 {sidebarOpen && (
// //                   <p className="text-[10px] font-black uppercase tracking-wider text-muted-foreground px-3">
// //                     {group.title}
// //                   </p>
// //                 )}
// //                 {group.items.map((item) => {
// //                   const Icon = item.icon;
// //                   const isActive =
// //                     pathname ===
// //                       `/dashboard/admin/${item.name.toLowerCase().replace(/\s+/g, "-")}` ||
// //                     (item.name === "Dashboard" &&
// //                       pathname === "/dashboard/admin") ||
// //                     pathname.startsWith(
// //                       `/dashboard/admin/${item.name.toLowerCase().replace(/\s+/g, "-")}`,
// //                     );

// //                   const href =
// //                     item.name === "Dashboard"
// //                       ? "/dashboard/admin"
// //                       : `/dashboard/admin/${item.name.toLowerCase().replace(/\s+/g, "-")}`;

// //                   return (
// //                     <Link
// //                       key={item.name}
// //                       href={href}
// //                       className={cn(
// //                         "flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200",
// //                         isActive
// //                           ? "bg-gradient-to-r from-purple-100 to-amber-100 dark:from-purple-950/40 dark:to-amber-950/40 text-purple-700 dark:text-purple-300"
// //                           : "text-muted-foreground hover:bg-slate-100 dark:hover:bg-slate-800",
// //                         !sidebarOpen && "justify-center",
// //                       )}
// //                     >
// //                       <Icon
// //                         className={cn("w-5 h-5", isActive && "text-purple-600")}
// //                       />
// //                       {sidebarOpen && (
// //                         <span className="text-sm font-medium">{item.name}</span>
// //                       )}
// //                     </Link>
// //                   );
// //                 })}
// //               </div>
// //             ))}
// //           </div>
// //         </nav>

// //         {/* User Menu */}
// //         <div className="p-4 border-t border-slate-200 dark:border-slate-800">
// //           <DropdownMenu>
// //             <DropdownMenuTrigger asChild>
// //               <button
// //                 className={cn(
// //                   "flex items-center gap-3 w-full rounded-lg p-2 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all",
// //                   !sidebarOpen && "justify-center",
// //                 )}
// //               >
// //                 <Avatar className="w-8 h-8">
// //                   <AvatarFallback className="bg-gradient-to-br from-purple-600 to-amber-500 text-white text-xs">
// //                     {getInitials()}
// //                   </AvatarFallback>
// //                 </Avatar>
// //                 {sidebarOpen && (
// //                   <div className="flex-1 text-left">
// //                     <p className="text-sm font-black">{getUserName()}</p>
// //                     <p className="text-[10px] text-muted-foreground">
// //                       {getUserEmail()}
// //                     </p>
// //                   </div>
// //                 )}
// //               </button>
// //             </DropdownMenuTrigger>
// //             <DropdownMenuContent align="end" className="w-56">
// //               <DropdownMenuLabel>My Account</DropdownMenuLabel>
// //               <DropdownMenuSeparator />
// //               <DropdownMenuItem asChild>
// //                 <Link href="/dashboard/admin/profile">
// //                   <User className="w-4 h-4 mr-2" />
// //                   Profile
// //                 </Link>
// //               </DropdownMenuItem>
// //               <DropdownMenuItem
// //                 onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
// //               >
// //                 {theme === "dark" ? (
// //                   <Sun className="w-4 h-4 mr-2" />
// //                 ) : (
// //                   <Moon className="w-4 h-4 mr-2" />
// //                 )}
// //                 {theme === "dark" ? "Light Mode" : "Dark Mode"}
// //               </DropdownMenuItem>
// //               <DropdownMenuSeparator />
// //               <DropdownMenuItem className="text-red-600">
// //                 <LogOut className="w-4 h-4 mr-2" />
// //                 Logout
// //               </DropdownMenuItem>
// //             </DropdownMenuContent>
// //           </DropdownMenu>
// //         </div>
// //       </aside>

// //       {/* Main Content */}
// //       <main
// //         className={cn(
// //           "transition-all duration-300 min-h-screen",
// //           sidebarOpen ? "lg:ml-72" : "lg:ml-20",
// //         )}
// //       >
// //         {/* Top Bar */}
// //         <div className="sticky top-0 z-30 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
// //           <div className="flex items-center justify-between px-4 sm:px-6 py-3">
// //             <div className="flex items-center gap-2">
// //               {!sidebarOpen && (
// //                 <Button
// //                   variant="ghost"
// //                   size="icon"
// //                   onClick={toggleSidebar}
// //                   className="hidden lg:flex"
// //                 >
// //                   <ChevronRight className="w-4 h-4" />
// //                 </Button>
// //               )}
// //               {/* Page title can be added here dynamically */}
// //               <h1 className="text-lg font-black">
// //                 {pathname === "/dashboard/admin" && "Dashboard"}
// //                 {pathname.includes("/users") && "User Management"}
// //                 {pathname.includes("/classes") && "Class Management"}
// //                 {/* Add more page titles as needed */}
// //               </h1>
// //             </div>
// //             <div className="flex items-center gap-2">
// //               <Button variant="ghost" size="icon" className="relative">
// //                 <Bell className="w-5 h-5" />
// //                 <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
// //               </Button>
// //             </div>
// //           </div>
// //         </div>

// //         {/* Page Content */}
// //         <div className="p-4 sm:p-6">{children}</div>
// //       </main>
// //     </div>
// //   );
// // }

// // app/(portal)/dashboard/admin/layout.tsx
// import { Metadata } from "next";
// import { AdminLayoutClient } from "./admin-layout-client";

// export const metadata: Metadata = {
//   title: "Admin Dashboard | Al-Maysaroh",
//   description:
//     "Manage your Institute - Users, Classes, Quran Progress, and more",
// };

// export default function AdminLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return <AdminLayoutClient>{children}</AdminLayoutClient>;
// }





import { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { AdminLayoutClient } from "./admin-layout-client";

export const metadata: Metadata = {
  title: "Admin Dashboard | Al-Maysaroh",
  description:
    "Manage your Institute - Users, Classes, Quran Progress, and more",
};

// Helper function to check if user has admin access
const isAdminRole = (role: string | undefined) => {
  const allowedRoles = ["SUPER_ADMIN", "ADMIN", "CONTENT_MANAGER", "SUPPORT"];
  return role ? allowedRoles.includes(role) : false;
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  // Check if user is authenticated
  if (!session) {
    redirect("/api/auth/signin");
  }

  // Check if user has admin role
  if (!isAdminRole(session.user?.role)) {
    redirect("/unauthorized");
  }

  return <AdminLayoutClient session={session}>{children}</AdminLayoutClient>;
}