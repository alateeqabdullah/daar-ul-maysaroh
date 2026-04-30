// app/(portal)/dashboard/admin/admin-layout-client.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  LayoutDashboard,
  Users,
  GraduationCap,
  BookOpen,
  ScrollText,
  Users as GroupIcon,
  GitBranch,
  DollarSign,
  ShieldCheck,
  Calendar,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Crown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

// Navigation Items
const navItems = [
  { name: "Dashboard", href: "/dashboard/admin", icon: LayoutDashboard },
  { name: "Users", href: "/dashboard/admin/users", icon: Users },
  { name: "Classes", href: "/dashboard/admin/classes", icon: GraduationCap },
  { name: "Subjects", href: "/dashboard/admin/subjects", icon: BookOpen },
  {
    name: "Enrollments",
    href: "/dashboard/admin/enrollments",
    icon: ScrollText,
  },
  {
    name: "Assignments",
    href: "/dashboard/admin/assignments",
    icon: ScrollText,
  },
  { name: "Grades", href: "/dashboard/admin/grades", icon: ScrollText },
  { name: "Student Groups", href: "/dashboard/admin/groups", icon: GroupIcon },
  {
    name: "Quran Progress",
    href: "/dashboard/admin/quran-progress",
    icon: BookOpen,
  },
  {
    name: "Hifz Progress",
    href: "/dashboard/admin/hifz-progress",
    icon: BookOpen,
  },
  {
    name: "Sanad Chains",
    href: "/dashboard/admin/sanad-chains",
    icon: GitBranch,
  },
  { name: "Invoices", href: "/dashboard/admin/invoices", icon: DollarSign },
  { name: "Payments", href: "/dashboard/admin/payments", icon: DollarSign },
  { name: "Expenses", href: "/dashboard/admin/expenses", icon: DollarSign },
  { name: "Payrolls", href: "/dashboard/admin/payrolls", icon: DollarSign },
  {
    name: "Announcements",
    href: "/dashboard/admin/announcements",
    icon: ShieldCheck,
  },
  { name: "Events", href: "/dashboard/admin/events", icon: Calendar },
  {
    name: "Pricing Plans",
    href: "/dashboard/admin/pricing-plans",
    icon: DollarSign,
  },
  {
    name: "Subscriptions",
    href: "/dashboard/admin/subscriptions",
    icon: DollarSign,
  },
  {
    name: "System Settings",
    href: "/dashboard/admin/settings",
    icon: Settings,
  },
];

// Group navigation items
const NAV_GROUPS: Record<string, string[]> = {
  Overview: ["Dashboard"],
  Academics: [
    "Users",
    "Classes",
    "Subjects",
    "Enrollments",
    "Assignments",
    "Grades",
    "Student Groups",
  ],
  Quranic: ["Quran Progress", "Hifz Progress", "Sanad Chains"],
  Finance: [
    "Invoices",
    "Payments",
    "Expenses",
    "Payrolls",
    "Pricing Plans",
    "Subscriptions",
  ],
  Communication: ["Announcements", "Events"],
  System: ["System Settings"],
};

const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

interface AdminLayoutClientProps {
  children: React.ReactNode;
}

export function AdminLayoutClient({ children }: AdminLayoutClientProps) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const getNavItem = (name: string) => {
    return navItems.find((item) => item.name === name);
  };

  const isActive = (href: string) => {
    if (href === "/dashboard/admin") {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
        {/* Mobile Menu Button */}
        <div className="fixed top-4 left-4 z-50 md:hidden">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="rounded-full bg-white dark:bg-slate-900 shadow-md"
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </Button>
        </div>

        {/* Sidebar */}
        <aside
          className={cn(
            "fixed left-0 top-0 z-40 h-full bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 transition-all duration-300 flex flex-col",
            isSidebarOpen ? "w-72" : "w-20",
            isMobileMenuOpen
              ? "translate-x-0"
              : "-translate-x-full md:translate-x-0",
          )}
        >
          {/* Logo */}
          <div
            className={cn(
              "flex items-center h-16 px-4 border-b border-slate-200 dark:border-slate-800",
              isSidebarOpen ? "justify-between" : "justify-center",
            )}
          >
            {isSidebarOpen ? (
              <>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-amber-500 rounded-lg flex items-center justify-center">
                    <Crown className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h1 className="text-sm font-black tracking-tight">
                      AL-MAYSAROH
                    </h1>
                    <p className="text-[8px] text-purple-600 font-bold tracking-wider uppercase">
                      Admin Portal
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleSidebar}
                  className="h-8 w-8 rounded-full"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
              </>
            ) : (
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleSidebar}
                className="h-8 w-8 rounded-full"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            )}
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-6">
            {Object.entries(NAV_GROUPS).map(([groupName, items]) => {
              const groupItems = items.map(getNavItem).filter(Boolean);
              if (groupItems.length === 0) return null;

              return (
                <div key={groupName} className="space-y-1">
                  {isSidebarOpen && (
                    <p className="text-[10px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 px-3">
                      {groupName}
                    </p>
                  )}
                  {groupItems.map((item) => {
                    const Icon = item!.icon;
                    const active = isActive(item!.href);
                    return (
                      <Tooltip key={item!.name} delayDuration={0}>
                        <TooltipTrigger asChild>
                          <Link
                            href={item!.href}
                            className={cn(
                              "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200",
                              active
                                ? "bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-md"
                                : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800",
                            )}
                          >
                            <Icon
                              className={cn(
                                "w-5 h-5 shrink-0",
                                active && "text-white",
                              )}
                            />
                            {isSidebarOpen && (
                              <span className="text-sm font-medium">
                                {item!.name}
                              </span>
                            )}
                          </Link>
                        </TooltipTrigger>
                        {!isSidebarOpen && (
                          <TooltipContent
                            side="right"
                            className="bg-slate-800 text-white"
                          >
                            {item!.name}
                          </TooltipContent>
                        )}
                      </Tooltip>
                    );
                  })}
                </div>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="p-3 border-t border-slate-200 dark:border-slate-800 space-y-2">
            {isSidebarOpen ? (
              <>
                <div className="flex items-center gap-3 px-3 py-2">
                  <Avatar className="w-9 h-9">
                    <AvatarFallback className="bg-gradient-to-br from-purple-100 to-amber-100 text-purple-600 font-black">
                      {getInitials("Admin User")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-black truncate">Admin User</p>
                    <p className="text-[10px] text-purple-600 font-medium">
                      Super Admin
                    </p>
                  </div>
                </div>
                <Link href="/api/auth/signout">
                  <Button
                    variant="outline"
                    className="w-full rounded-xl border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </Button>
                </Link>
              </>
            ) : (
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <Link
                    href="/api/auth/signout"
                    className="flex items-center justify-center p-3 rounded-xl text-red-500 hover:bg-red-50 transition-colors"
                  >
                    <LogOut className="w-5 h-5" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">Logout</TooltipContent>
              </Tooltip>
            )}
          </div>
        </aside>

        {/* Main Content */}
        <main
          className={cn(
            "transition-all duration-300 min-h-screen",
            isSidebarOpen ? "md:ml-72" : "md:ml-20",
          )}
        >
          {/* Top Bar */}
          <div className="sticky top-0 z-30 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between px-4 sm:px-6 py-3">
              <div className="flex items-center gap-3">
                <div className="hidden md:block">
                  <h2 className="text-sm font-medium text-slate-500 dark:text-slate-400">
                    Welcome back,
                  </h2>
                  <p className="text-base font-black bg-gradient-to-r from-purple-600 to-amber-600 bg-clip-text text-transparent">
                    Admin User
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {/* Quick Stats */}
                <div className="hidden sm:flex items-center gap-2 text-xs">
                  <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-green-100 dark:bg-green-950/30">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                    <span className="text-green-700 dark:text-green-400 font-medium">
                      System Online
                    </span>
                  </div>
                </div>
                {/* Admin Badge */}
                <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-purple-100 dark:bg-purple-950/30">
                  <Sparkles className="w-3 h-3 text-purple-600" />
                  <span className="text-[10px] font-black text-purple-700 dark:text-purple-400 uppercase tracking-wider">
                    Super Admin
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Page Content */}
          <div className="p-4 sm:p-6">{children}</div>
        </main>

        {/* Mobile Overlay */}
        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-30 md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
      </div>
    </TooltipProvider>
  );
}
