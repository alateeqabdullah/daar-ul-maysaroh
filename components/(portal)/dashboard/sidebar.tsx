// src/components/dashboard/sidebar.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Users,
  BookOpen,
  Calendar,
  FileText,
  BarChart,
  Settings,
  ChevronLeft,
  ChevronRight,
  Home,
  Shield,
  School,
  UserCircle,
  LogOut,
  MessageSquare,
  CreditCard,
  Folder,
  Book,
  Video,
  TrendingUp,
} from "lucide-react";

// Define navigation items for each role
const studentNav = [
  { name: "Dashboard", href: "/student/dashboard", icon: LayoutDashboard },
  { name: "My Classes", href: "/student/classes", icon: School },
  { name: "Schedule", href: "/student/schedule", icon: Calendar },
  { name: "Assignments", href: "/student/assignments", icon: FileText },
  { name: "Quran Progress", href: "/student/quran", icon: Book },
  { name: "Grades", href: "/student/grades", icon: BarChart },
  { name: "Messages", href: "/student/messages", icon: MessageSquare },
  { name: "Payments", href: "/student/payments", icon: CreditCard },
  { name: "Resources", href: "/student/resources", icon: Folder },
];

const teacherNav = [
  { name: "Dashboard", href: "/teacher/dashboard", icon: LayoutDashboard },
  { name: "My Classes", href: "/teacher/classes", icon: School },
  { name: "Students", href: "/teacher/students", icon: Users },
  { name: "Attendance", href: "/teacher/attendance", icon: Calendar },
  { name: "Assignments", href: "/teacher/assignments", icon: FileText },
  { name: "Grades", href: "/teacher/grades", icon: BarChart },
  { name: "Messages", href: "/teacher/messages", icon: MessageSquare },
  { name: "Live Classes", href: "/teacher/live-classes", icon: Video },
  { name: "Resources", href: "/teacher/resources", icon: Folder },
  { name: "Analytics", href: "/teacher/analytics", icon: TrendingUp },
];

const adminNav = [
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Users", href: "/admin/users", icon: Users },
  { name: "Approvals", href: "/admin/approvals", icon: Shield },
  { name: "Classes", href: "/admin/classes", icon: School },
  { name: "Groups", href: "/admin/groups", icon: Users },
  { name: "Teachers", href: "/admin/teachers", icon: UserCircle },
  { name: "Students", href: "/admin/students", icon: Users },
  { name: "Payments", href: "/admin/payments", icon: CreditCard },
  { name: "Reports", href: "/admin/reports", icon: BarChart },
  { name: "System", href: "/admin/system", icon: Settings },
];

const parentNav = [
  { name: "Dashboard", href: "/parent/dashboard", icon: LayoutDashboard },
  { name: "Children", href: "/parent/children", icon: Users },
  { name: "Progress", href: "/parent/progress", icon: BarChart },
  { name: "Attendance", href: "/parent/attendance", icon: Calendar },
  { name: "Payments", href: "/parent/payments", icon: CreditCard },
  { name: "Messages", href: "/parent/messages", icon: MessageSquare },
  { name: "Schedule", href: "/parent/schedule", icon: Calendar },
  { name: "Reports", href: "/parent/reports", icon: FileText },
];

interface DashboardSidebarProps {
  user: any;
  className?: string;
}

export default function DashboardSidebar({
  user,
  className,
}: DashboardSidebarProps) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  const getNavItems = () => {
    switch (user?.role) {
      case "SUPER_ADMIN":
      case "ADMIN":
        return adminNav;
      case "TEACHER":
        return teacherNav;
      case "STUDENT":
        return studentNav;
      case "PARENT":
        return parentNav;
      default:
        return [];
    }
  };

  const navItems = getNavItems();

  const getRoleDisplay = () => {
    switch (user?.role) {
      case "SUPER_ADMIN":
        return "Super Admin";
      case "ADMIN":
        return "Administrator";
      case "TEACHER":
        return "Teacher";
      case "STUDENT":
        return "Student";
      case "PARENT":
        return "Parent";
      default:
        return "User";
    }
  };

  return (
    <aside
      className={cn(
        "hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 lg:border-r lg:border-gray-200 lg:bg-white lg:dark:border-gray-800 lg:dark:bg-gray-900",
        collapsed && "lg:w-20",
        className
      )}
    >
      {/* Sidebar Header */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 dark:border-gray-800">
        <Link
          href="/dashboard"
          className={cn(
            "flex items-center space-x-2 transition-all",
            collapsed && "justify-center w-full"
          )}
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary">
            <BookOpen className="h-5 w-5 text-white" />
          </div>
          {!collapsed && (
            <span className="text-lg font-bold text-gray-900 dark:text-white">
              Madrasah
              <span className="text-gradient bg-gradient-primary bg-clip-text">
                Pro
              </span>
            </span>
          )}
        </Link>

        <Button
          variant="ghost"
          size="icon"
          className="hidden lg:flex"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? (
            <ChevronRight className="h-5 w-5" />
          ) : (
            <ChevronLeft className="h-5 w-5" />
          )}
        </Button>
      </div>

      {/* User Profile */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-800">
        <div
          className={cn(
            "flex items-center",
            collapsed ? "justify-center" : "space-x-3"
          )}
        >
          <div className="relative">
            <div className="h-10 w-10 rounded-full bg-gradient-primary p-0.5">
              <div className="flex h-full w-full items-center justify-center rounded-full bg-white dark:bg-gray-800">
                <span className="font-semibold text-purple-600">
                  {user?.name?.charAt(0).toUpperCase()}
                </span>
              </div>
            </div>
            <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-white bg-green-500 dark:border-gray-800" />
          </div>

          {!collapsed && (
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                {user?.name}
              </p>
              <p className="truncate text-xs text-gray-500 dark:text-gray-400">
                {getRoleDisplay()}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-1">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href || pathname?.startsWith(item.href + "/");
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-gradient-primary text-white shadow-sm"
                  : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800",
                collapsed && "justify-center"
              )}
              title={collapsed ? item.name : undefined}
            >
              <item.icon className={cn("h-5 w-5", !collapsed && "mr-3")} />
              {!collapsed && item.name}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Actions */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-800 space-y-2">
        <Button
          variant="ghost"
          size="sm"
          className={cn(
            "w-full justify-start text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800",
            collapsed && "justify-center"
          )}
          asChild
        >
          <Link href="/">
            <Home className={cn("h-5 w-5", !collapsed && "mr-3")} />
            {!collapsed && "Home"}
          </Link>
        </Button>

        <Button
          variant="ghost"
          size="sm"
          className={cn(
            "w-full justify-start text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800",
            collapsed && "justify-center"
          )}
          asChild
        >
          <Link href="/settings">
            <Settings className={cn("h-5 w-5", !collapsed && "mr-3")} />
            {!collapsed && "Settings"}
          </Link>
        </Button>

        <Button
          variant="ghost"
          size="sm"
          className={cn(
            "w-full justify-start text-red-600 hover:bg-red-50 hover:text-red-700 dark:text-red-400 dark:hover:bg-red-900/20",
            collapsed && "justify-center"
          )}
          asChild
        >
          <Link href="/api/auth/signout">
            <LogOut className={cn("h-5 w-5", !collapsed && "mr-3")} />
            {!collapsed && "Sign Out"}
          </Link>
        </Button>
      </div>
    </aside>
  );
}
