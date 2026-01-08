// // src/components/layout/dashboard-sidebar.tsx
// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import {
//   LayoutDashboard,
//   Users,
//   UserCheck,
//   BookOpen,
//   Users2,
//   Calendar,
//   FileText,
//   BarChart3,
//   Settings,
//   HelpCircle,
//   LogOut,
//   Menu,
//   X,
//   Book,
//   GraduationCap,
//   Wallet,
//   Bell,
//   User,
// } from "lucide-react";
// import { cn } from "@/lib/utils";
// import { Button } from "@/components/ui/button";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { getInitials } from "@/lib/utils";
// import { signOut } from "next-auth/react";

// interface SidebarProps {
//   user: any;
// }

// const adminNavigation = [
//   { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
//   { name: 'User Approval', href: '/admin/approvals', icon: UserCheck, badge: 'pending' },
//   { name: 'User Management', href: '/admin/users', icon: Users },
//   { name: 'Student Groups', href: '/admin/groups', icon: Users2 },
//   { name: 'Class Management', href: '/admin/classes', icon: BookOpen },
//   { name: 'Teacher Management', href: '/admin/teachers', icon: GraduationCap },
//   { name: 'Student Management', href: '/admin/students', icon: User },
//   { name: 'Parent Management', href: '/admin/parents', icon: Users },
//   { name: 'Schedule', href: '/admin/schedule', icon: Calendar },
//   { name: 'Attendance', href: '/admin/attendance', icon: UserCheck },
//   { name: 'Assignments', href: '/admin/assignments', icon: FileText },
//   { name: 'Grades', href: '/admin/grades', icon: BarChart3 },
//   { name: 'Financial', href: '/admin/financial', icon: Wallet },
//   { name: 'Reports', href: '/admin/reports', icon: BarChart3 },
//   { name: 'System Settings', href: '/admin/settings', icon: Settings },
// ];

// const teacherNavigation = [
//   { name: "Dashboard", href: "/teacher", icon: LayoutDashboard },
//   { name: "My Classes", href: "/teacher/classes", icon: BookOpen },
//   { name: "Students", href: "/teacher/students", icon: Users },
//   { name: "Attendance", href: "/teacher/attendance", icon: UserCheck },
//   { name: "Assignments", href: "/teacher/assignments", icon: FileText },
//   { name: "Grades", href: "/teacher/grades", icon: BarChart3 },
//   { name: "Schedule", href: "/teacher/schedule", icon: Calendar },
//   { name: "Resources", href: "/teacher/resources", icon: Book },
// ];

// const studentNavigation = [
//   { name: "Dashboard", href: "/student", icon: LayoutDashboard },
//   { name: "My Classes", href: "/student/classes", icon: BookOpen },
//   { name: "Schedule", href: "/student/schedule", icon: Calendar },
//   { name: "Assignments", href: "/student/assignments", icon: FileText },
//   { name: "Grades", href: "/student/grades", icon: BarChart3 },
//   { name: "Quran Progress", href: "/student/quran", icon: Book },
//   { name: "Attendance", href: "/student/attendance", icon: UserCheck },
// ];

// const parentNavigation = [
//   { name: "Dashboard", href: "/parent", icon: LayoutDashboard },
//   { name: "Children", href: "/parent/children", icon: Users },
//   { name: "Progress", href: "/parent/progress", icon: BarChart3 },
//   { name: "Attendance", href: "/parent/attendance", icon: UserCheck },
//   { name: "Payments", href: "/parent/payments", icon: Wallet },
//   { name: "Messages", href: "/parent/messages", icon: Bell },
// ];

// export default function DashboardSidebar({ user }: SidebarProps) {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [expandedSections, setExpandedSections] = useState<string[]>([]);
//   const pathname = usePathname();

//   const getNavigation = () => {
//     switch (user.role) {
//       case "SUPER_ADMIN":
//       case "ADMIN":
//         return adminNavigation;
//       case "TEACHER":
//         return teacherNavigation;
//       case "STUDENT":
//         return studentNavigation;
//       case "PARENT":
//         return parentNavigation;
//       default:
//         return [];
//     }
//   };

//   const navigation = getNavigation();

//   const toggleSection = (section: string) => {
//     setExpandedSections((prev) =>
//       prev.includes(section)
//         ? prev.filter((s) => s !== section)
//         : [...prev, section]
//     );
//   };

//   const handleSignOut = async () => {
//     await signOut({ callbackUrl: "/" });
//   };

//   return (
//     <>
//       {/* Mobile sidebar backdrop */}
//       {sidebarOpen && (
//         <div
//           className="fixed inset-0 z-40 bg-gray-900/80 lg:hidden"
//           onClick={() => setSidebarOpen(false)}
//         />
//       )}

//       {/* Sidebar */}
//       <div
//         className={cn(
//           "fixed inset-y-0 left-0 z-50 flex w-72 flex-col bg-linear-to-b from-purple-900 to-indigo-900 shadow-xl transition-transform duration-300 lg:translate-x-0",
//           sidebarOpen ? "translate-x-0" : "-translate-x-full"
//         )}
//       >
//         {/* Sidebar Header */}
//         <div className="flex h-16 items-center justify-between border-b border-white/10 px-6">
//           <Link href="/dashboard" className="flex items-center space-x-3">
//             <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/20">
//               <BookOpen className="h-5 w-5 text-white" />
//             </div>
//             <span className="text-xl font-bold text-white">
//               Madrasah<span className="text-purple-300">Pro</span>
//             </span>
//           </Link>
//           <Button
//             variant="ghost"
//             size="icon"
//             className="text-white hover:bg-white/10 lg:hidden"
//             onClick={() => setSidebarOpen(false)}
//           >
//             <X className="h-6 w-6" />
//           </Button>
//         </div>

//         {/* User Profile */}
//         <div className="border-b border-white/10 px-6 py-4">
//           <div className="flex items-center space-x-3">
//             <Avatar className="h-10 w-10 border-2 border-white/20">
//               <AvatarImage src={user.image} />
//               <AvatarFallback className="bg-gradient-primary text-white">
//                 {getInitials(user.name)}
//               </AvatarFallback>
//             </Avatar>
//             <div className="min-w-0 flex-1">
//               <p className="truncate text-sm font-medium text-white">
//                 {user.name}
//               </p>
//               <div className="flex items-center space-x-1">
//                 <span className="truncate text-xs text-white/70">
//                   {user.email}
//                 </span>
//                 <span className="inline-flex items-center rounded-full bg-white/20 px-2 py-0.5 text-xs font-medium text-white">
//                   {user.role.replace("_", " ")}
//                 </span>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Navigation */}
//         <nav className="flex-1 space-y-1 overflow-y-auto px-4 py-6">
//           {navigation.map((item) => {
//             const isActive =
//               pathname === item.href || pathname?.startsWith(item.href + "/");

//             return (
//               <Link
//                 key={item.name}
//                 href={item.href}
//                 className={cn(
//                   "group flex items-center rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
//                   isActive
//                     ? "bg-white/10 text-white"
//                     : "text-white/80 hover:bg-white/5 hover:text-white"
//                 )}
//                 onClick={() => setSidebarOpen(false)}
//               >
//                 <item.icon
//                   className={cn(
//                     "mr-3 h-5 w-5 shrink-0",
//                     isActive
//                       ? "text-white"
//                       : "text-white/60 group-hover:text-white"
//                   )}
//                 />
//                 <span className="flex-1">{item.name}</span>
//                 {item.badge === "pending" && (
//                   <span className="ml-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-medium text-white">
//                     5
//                   </span>
//                 )}
//               </Link>
//             );
//           })}

//           {/* Quick Actions Section - Only for Admin */}
//           {(user.role === "SUPER_ADMIN" || user.role === "ADMIN") && (
//             <div className="pt-6">
//               <div className="px-3">
//                 <h3 className="text-xs font-semibold uppercase tracking-wider text-white/50">
//                   Quick Actions
//                 </h3>
//               </div>
//               <div className="mt-2 space-y-1">
//                 <button
//                   onClick={() => (window.location.href = "/admin/users/create")}
//                   className="flex w-full items-center rounded-lg px-3 py-2 text-sm font-medium text-white/80 hover:bg-white/5 hover:text-white"
//                 >
//                   <UserCheck className="mr-3 h-5 w-5" />
//                   Approve Users
//                 </button>
//                 <button
//                   onClick={() =>
//                     (window.location.href = "/admin/groups/create")
//                   }
//                   className="flex w-full items-center rounded-lg px-3 py-2 text-sm font-medium text-white/80 hover:bg-white/5 hover:text-white"
//                 >
//                   <Users2 className="mr-3 h-5 w-5" />
//                   Create Group
//                 </button>
//                 <button
//                   onClick={() =>
//                     (window.location.href = "/admin/classes/create")
//                   }
//                   className="flex w-full items-center rounded-lg px-3 py-2 text-sm font-medium text-white/80 hover:bg-white/5 hover:text-white"
//                 >
//                   <BookOpen className="mr-3 h-5 w-5" />
//                   Add Class
//                 </button>
//               </div>
//             </div>
//           )}
//         </nav>

//         {/* Sidebar Footer */}
//         <div className="border-t border-white/10 px-4 py-4">
//           <div className="space-y-1">
//             <Link
//               href="/help"
//               className="flex items-center rounded-lg px-3 py-2 text-sm font-medium text-white/80 hover:bg-white/5 hover:text-white"
//             >
//               <HelpCircle className="mr-3 h-5 w-5" />
//               Help & Support
//             </Link>
//             <Link
//               href="/settings"
//               className="flex items-center rounded-lg px-3 py-2 text-sm font-medium text-white/80 hover:bg-white/5 hover:text-white"
//             >
//               <Settings className="mr-3 h-5 w-5" />
//               Settings
//             </Link>
//             <button
//               onClick={handleSignOut}
//               className="flex w-full items-center rounded-lg px-3 py-2 text-sm font-medium text-white/80 hover:bg-white/5 hover:text-white"
//             >
//               <LogOut className="mr-3 h-5 w-5" />
//               Sign Out
//             </button>
//           </div>

//           {/* System Status */}
//           <div className="mt-4 rounded-lg bg-white/5 p-3">
//             <div className="flex items-center justify-between text-xs">
//               <span className="text-white/70">System Status</span>
//               <span className="inline-flex items-center">
//                 <span className="mr-1 h-2 w-2 rounded-full bg-green-500"></span>
//                 <span className="text-green-400">Online</span>
//               </span>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Mobile sidebar button */}
//       <button
//         type="button"
//         className="fixed left-4 top-4 z-40 rounded-lg bg-gradient-primary p-2 text-white lg:hidden"
//         onClick={() => setSidebarOpen(true)}
//       >
//         <Menu className="h-6 w-6" />
//       </button>
//     </>
//   );
// }

"use client";

import { useState, useEffect } from "react"; // Added useEffect
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard,
  Users,
  UserCheck,
  BookOpen,
  Users2,
  Calendar,
  FileText,
  BarChart3,
  Settings,
  HelpCircle,
  LogOut,
  Menu,
  X,
  Book,
  GraduationCap,
  Wallet,
  User,
  MessageSquare,
  Folder,
  PieChart,
} from "lucide-react";
import { cn, getInitials } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface NavigationItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

interface User {
  name: string;
  email: string;
  role: "SUPER_ADMIN" | "ADMIN" | "TEACHER" | "STUDENT" | "PARENT";
  image?: string;
}

interface SidebarProps {
  user: User;
}

const adminNavigation: NavigationItem[] = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  {
    name: "User Approval",
    href: "/admin/approvals",
    icon: UserCheck,
    badge: "pending",
  },
  { name: "User Management", href: "/admin/users", icon: Users },
  { name: "Student Groups", href: "/admin/groups", icon: Users2 },
  { name: "Class Management", href: "/admin/classes", icon: BookOpen },
  { name: "Teacher Management", href: "/admin/teachers", icon: GraduationCap },
  { name: "Student Management", href: "/admin/students", icon: User },
  { name: "Parent Management", href: "/admin/parents", icon: Users },
  { name: "Schedule", href: "/admin/schedule", icon: Calendar },
  { name: "Attendance", href: "/admin/attendance", icon: UserCheck },
  { name: "Assignments", href: "/admin/assignments", icon: FileText },
  { name: "Grades", href: "/admin/grades", icon: BarChart3 },
  { name: "Financial", href: "/admin/financial", icon: Wallet },
  { name: "Reports", href: "/admin/reports", icon: BarChart3 },
  { name: "System Settings", href: "/admin/settings", icon: Settings },
];
// In dashboard-sidebar.tsx, update teacherNavigation:
const teacherNavigation = [
  { name: "Dashboard", href: "/teacher", icon: LayoutDashboard },
  { name: "My Classes", href: "/teacher/classes", icon: BookOpen },
  { name: "Students", href: "/teacher/students", icon: Users },
  { name: "Attendance", href: "/teacher/attendance", icon: UserCheck },
  { name: "Assignments", href: "/teacher/assignments", icon: FileText },
  { name: "Grades", href: "/teacher/grades", icon: BarChart3 },
  { name: "Schedule", href: "/teacher/schedule", icon: Calendar },
  { name: "Quran Progress", href: "/teacher/quran", icon: Book },
  { name: "Resources", href: "/teacher/resources", icon: Folder },
  {
    name: "Communication",
    href: "/teacher/communication",
    icon: MessageSquare,
  },
  { name: "Reports", href: "/teacher/reports", icon: PieChart },
];

const studentNavigation: NavigationItem[] = [
  { name: "Dashboard", href: "/student", icon: LayoutDashboard },
  { name: "My Classes", href: "/student/classes", icon: BookOpen },
  { name: "Schedule", href: "/student/schedule", icon: Calendar },
  { name: "Assignments", href: "/student/assignments", icon: FileText },
  { name: "Grades", href: "/student/grades", icon: BarChart3 },
  { name: "Quran Progress", href: "/student/quran", icon: Book },
  { name: "Attendance", href: "/student/attendance", icon: UserCheck },
];

const parentNavigation = [
  { name: "Dashboard", href: "/parent", icon: LayoutDashboard },
  { name: "My Children", href: "/parent/children", icon: Users },
  { name: "Progress Reports", href: "/parent/progress", icon: BarChart3 },
  { name: "Attendance", href: "/parent/attendance", icon: UserCheck },
  { name: "Payments", href: "/parent/payments", icon: Wallet },
  { name: "Messages", href: "/parent/messages", icon: MessageSquare },
  { name: "Schedule", href: "/parent/schedule", icon: Calendar },
  { name: "Quran Progress", href: "/parent/quran", icon: Book },
];

export default function DashboardSidebar({ user }: SidebarProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false); // Added state for mobile detection
  const pathname = usePathname();
  const router = useRouter();

  // Detect if we're on mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    // Check initially
    checkIfMobile();

    // Add event listener for resize
    window.addEventListener("resize", checkIfMobile);

    // Cleanup
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  const getNavigation = (): NavigationItem[] => {
    switch (user.role) {
      case "SUPER_ADMIN":
      case "ADMIN":
        return adminNavigation;
      case "TEACHER":
        return teacherNavigation;
      case "STUDENT":
        return studentNavigation;
      case "PARENT":
        return parentNavigation;
      default:
        return [];
    }
  };

  const navigation = getNavigation();

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/" });
  };

  const handleQuickAction = (path: string) => {
    router.push(path);
    setSidebarOpen(false);
  };

  return (
    <>
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-gray-900/80 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-72 flex-col bg-gradient-to-b from-purple-900 to-indigo-900 shadow-xl transition-transform duration-300 ease-in-out",
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* Sidebar Header */}
        <div className="flex h-16 items-center justify-between border-b border-white/10 px-6">
          <Link href="/dashboard" className="flex items-center space-x-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/20">
              <BookOpen className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">
              Madrasah<span className="text-purple-300">Pro</span>
            </span>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/10 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-6 w-6" />
          </Button>
        </div>

        {/* User Profile */}
        <div className="border-b border-white/10 px-6 py-4">
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10 border-2 border-white/20">
              <AvatarImage src={user.image} alt={user.name} />
              <AvatarFallback className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
                {getInitials(user.name)}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-white">
                {user.name}
              </p>
              <div className="flex items-center space-x-1">
                <span className="truncate text-xs text-white/70">
                  {user.email}
                </span>
                <span className="inline-flex items-center rounded-full bg-white/20 px-2 py-0.5 text-xs font-medium text-white">
                  {user.role.replace("_", " ")}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 overflow-y-auto px-4 py-6">
          {navigation.map((item) => {
            const isActive =
              pathname === item.href || pathname?.startsWith(item.href + "/");

            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "group flex items-center rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-white/10 text-white"
                    : "text-white/80 hover:bg-white/5 hover:text-white"
                )}
                onClick={() => isMobile && setSidebarOpen(false)}
              >
                <item.icon
                  className={cn(
                    "mr-3 h-5 w-5 shrink-0",
                    isActive
                      ? "text-white"
                      : "text-white/60 group-hover:text-white"
                  )}
                />
                <span className="flex-1">{item.name}</span>
                {item.badge === "pending" && (
                  <span className="ml-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-medium text-white">
                    5
                  </span>
                )}
              </Link>
            );
          })}

          {/* Quick Actions Section - Only for Admin */}
          {(user.role === "SUPER_ADMIN" || user.role === "ADMIN") && (
            <div className="pt-6">
              <div className="px-3">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-white/50">
                  Quick Actions
                </h3>
              </div>
              <div className="mt-2 space-y-1">
                <button
                  onClick={() => handleQuickAction("/admin/approvals")}
                  className="flex w-full items-center rounded-lg px-3 py-2 text-sm font-medium text-white/80 hover:bg-white/5 hover:text-white"
                >
                  <UserCheck className="mr-3 h-5 w-5" />
                  Approve Users
                </button>
                <button
                  onClick={() => handleQuickAction("/admin/groups/create")}
                  className="flex w-full items-center rounded-lg px-3 py-2 text-sm font-medium text-white/80 hover:bg-white/5 hover:text-white"
                >
                  <Users2 className="mr-3 h-5 w-5" />
                  Create Group
                </button>
                <button
                  onClick={() => handleQuickAction("/admin/classes/create")}
                  className="flex w-full items-center rounded-lg px-3 py-2 text-sm font-medium text-white/80 hover:bg-white/5 hover:text-white"
                >
                  <BookOpen className="mr-3 h-5 w-5" />
                  Add Class
                </button>
              </div>
            </div>
          )}
        </nav>

        {/* Sidebar Footer */}
        <div className="border-t border-white/10 px-4 py-4">
          <div className="space-y-1">
            <Link
              href="/help"
              className="flex items-center rounded-lg px-3 py-2 text-sm font-medium text-white/80 hover:bg-white/5 hover:text-white"
              onClick={() => isMobile && setSidebarOpen(false)}
            >
              <HelpCircle className="mr-3 h-5 w-5" />
              Help & Support
            </Link>
            <Link
              href="/settings"
              className="flex items-center rounded-lg px-3 py-2 text-sm font-medium text-white/80 hover:bg-white/5 hover:text-white"
              onClick={() => isMobile && setSidebarOpen(false)}
            >
              <Settings className="mr-3 h-5 w-5" />
              Settings
            </Link>
            <button
              onClick={handleSignOut}
              className="flex w-full items-center rounded-lg px-3 py-2 text-sm font-medium text-white/80 hover:bg-white/5 hover:text-white"
            >
              <LogOut className="mr-3 h-5 w-5" />
              Sign Out
            </button>
          </div>

          {/* System Status */}
          <div className="mt-4 rounded-lg bg-white/5 p-3">
            <div className="flex items-center justify-between text-xs">
              <span className="text-white/70">System Status</span>
              <span className="inline-flex items-center">
                <span className="mr-1 h-2 w-2 rounded-full bg-green-500"></span>
                <span className="text-green-400">Online</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile sidebar button - FIXED */}
      <button
        type="button"
        className={cn(
          "fixed left-4 top-4 z-50 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 p-2.5 text-white shadow-lg transition-opacity duration-200 hover:opacity-90 lg:hidden",
          sidebarOpen ? "opacity-0 pointer-events-none" : "opacity-100"
        )}
        onClick={() => setSidebarOpen(true)}
        aria-label="Open menu"
      >
        <Menu className="h-6 w-6" />
      </button>
    </>
  );
}
