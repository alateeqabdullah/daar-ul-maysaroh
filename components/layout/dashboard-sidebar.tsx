"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { useSidebarStore } from "@/store/use-sidebar-store";
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
  X,
  Book,
  GraduationCap,
  Wallet,
  User as UserIcon,
  MessageSquare,
  Folder,
  PieChart,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { cn, getInitials } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// --- TYPES ---
interface NavigationItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

interface User {
  name: string;
  email: string;
  role: string; // Simplified for flexibility
  image?: string | null; // Handle Prisma nullable
}

interface SidebarProps {
  user: User;
}

// --- NAV DATA (Kept your exact data) ---
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
  { name: "Student Management", href: "/admin/students", icon: UserIcon },
  { name: "Parent Management", href: "/admin/parents", icon: Users },
  { name: "Schedule", href: "/admin/schedule", icon: Calendar },
  { name: "Attendance", href: "/admin/attendance", icon: UserCheck },
  { name: "Assignments", href: "/admin/assignments", icon: FileText },
  { name: "Grades", href: "/admin/grades", icon: BarChart3 },
  { name: "Financial", href: "/admin/financial", icon: Wallet },
  { name: "Reports", href: "/admin/reports", icon: BarChart3 },
  { name: "System Settings", href: "/admin/settings", icon: Settings },
];

const teacherNavigation: NavigationItem[] = [
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

const parentNavigation: NavigationItem[] = [
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
  const { isOpen, setOpen } = useSidebarStore();
  const pathname = usePathname();
  const router = useRouter();

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

  const handleQuickAction = (path: string) => {
    router.push(path);
    setOpen(false);
  };

  return (
    <>
      {/* 
        MOBILE OVERLAY 
        Only visible on small screens (lg:hidden) when sidebar is open
      */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-slate-950/80 backdrop-blur-sm lg:hidden transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setOpen(false)}
      />

      {/* 
        SIDEBAR CONTAINER
        - Mobile: fixed, z-50, slides in from left
        - Desktop: static (flows in layout), full height, visible
      */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-72 flex-col bg-slate-900 border-r border-white/10 transition-transform duration-300 ease-in-out",
          // Desktop Logic: Always show, position static (part of flex layout)
          "lg:translate-x-0 lg:static lg:h-full",
          // Mobile Logic: Slide in/out based on isOpen
          isOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"
        )}
      >
        {/* HEADER */}
        <div className="flex h-16 shrink-0 items-center justify-between px-6 bg-gradient-to-b from-purple-500/10 to-transparent">
          <Link href="/dashboard" className="flex items-center space-x-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-600 shadow-lg shadow-purple-600/20">
              <BookOpen className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-black tracking-tight text-white uppercase">
              Al-may<span className="text-purple-400">Saroh</span>
            </span>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="text-slate-400 hover:text-white hover:bg-white/10 lg:hidden"
            onClick={() => setOpen(false)}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* USER PROFILE MINI */}
        <div className="px-4 py-4">
          <div className="flex items-center space-x-3 rounded-xl bg-white/5 p-3 border border-white/5 ring-1 ring-white/10">
            <Avatar className="h-10 w-10 border border-purple-500/30">
              <AvatarImage src={user.image || undefined} alt={user.name} />
              <AvatarFallback className="bg-purple-600 text-white font-bold text-xs">
                {getInitials(user.name)}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-bold text-white mb-0.5">
                {user.name}
              </p>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="h-3 w-3 text-purple-400" />
                <span className="truncate text-[10px] text-slate-400 font-bold uppercase tracking-wide">
                  {user.role.replace("_", " ")}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* NAVIGATION SCROLL AREA */}
        <nav className="flex-1 space-y-1 overflow-y-auto px-4 py-2 custom-scrollbar">
          <div className="mb-2 px-3">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
              Menu
            </p>
          </div>

          {navigation.map((item) => {
            // Updated active check to be more precise
            const isActive =
              pathname === item.href || pathname?.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "group flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 relative",
                  isActive
                    ? "bg-purple-600 text-white shadow-md shadow-purple-900/20"
                    : "text-slate-400 hover:bg-white/5 hover:text-white"
                )}
                onClick={() => setOpen(false)}
              >
                <item.icon
                  className={cn(
                    "mr-3 h-5 w-5 shrink-0 transition-colors",
                    isActive
                      ? "text-white"
                      : "text-slate-500 group-hover:text-purple-400"
                  )}
                />
                <span className="flex-1">{item.name}</span>
                {item.badge === "pending" && (
                  <span className="ml-2 flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-amber-500 px-1 text-[10px] font-bold text-slate-900">
                    5
                  </span>
                )}

                {/* Active Indicator Strip */}
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 rounded-r bg-white/50" />
                )}
              </Link>
            );
          })}

          {/* QUICK ACTIONS (ADMIN ONLY) */}
          {(user.role === "SUPER_ADMIN" || user.role === "ADMIN") && (
            <div className="pt-6 mt-2 border-t border-white/5">
              <div className="px-3 mb-2">
                <h3 className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
                  <Zap className="h-3 w-3 text-purple-400" /> Quick Actions
                </h3>
              </div>
              <div className="space-y-1">
                <button
                  onClick={() => handleQuickAction("/admin/approvals")}
                  className="flex w-full items-center rounded-lg px-3 py-2 text-xs font-bold text-slate-400 hover:bg-white/5 hover:text-white transition-all"
                >
                  <UserCheck className="mr-3 h-4 w-4" /> Approve Users
                </button>
                <button
                  onClick={() => handleQuickAction("/admin/classes/create")}
                  className="flex w-full items-center rounded-lg px-3 py-2 text-xs font-bold text-slate-400 hover:bg-white/5 hover:text-white transition-all"
                >
                  <BookOpen className="mr-3 h-4 w-4" /> Add Class
                </button>
              </div>
            </div>
          )}
        </nav>

        {/* FOOTER */}
        <div className="mt-auto border-t border-white/5 p-4 space-y-1">
          <Link
            href="/help"
            className="flex items-center rounded-lg px-3 py-2 text-sm font-medium text-slate-400 hover:bg-white/5 hover:text-white transition-all"
            onClick={() => setOpen(false)}
          >
            <HelpCircle className="mr-3 h-4 w-4" /> Help & Support
          </Link>
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="flex w-full items-center rounded-lg px-3 py-2 text-sm font-medium text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-all"
          >
            <LogOut className="mr-3 h-4 w-4" /> Sign Out
          </button>
        </div>
      </div>
    </>
  );
}
