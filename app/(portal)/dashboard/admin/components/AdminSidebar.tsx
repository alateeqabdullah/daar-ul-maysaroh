// app/(portal)/dashboard/admin/components/AdminSidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut as clientSignOut } from "next-auth/react";
import {
  LogOut,
  LayoutDashboard,
  Users,
  GraduationCap,
  BookOpen,
  Clock,
  DollarSign,
  Calendar,
  Settings,
  Group,
  ScrollText,
  GitBranch,
  ShieldCheck,
  ChevronDown,
  Sparkles,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { UserRole } from "@/app/generated/prisma/enums";

interface AdminSidebarProps {
  userRole?: UserRole;
}

// Your navigation items (preserved)
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
  { name: "Student Groups", href: "/dashboard/admin/groups", icon: Group },
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

// Group navigation items (optional but helpful - you can remove if not wanted)
const NAV_GROUPS = {
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

export default function AdminSidebar({ userRole }: AdminSidebarProps) {
  const pathname = usePathname();
  const [expandedGroups, setExpandedGroups] = useState<string[]>([
    "Overview",
    "Academics",
  ]);

  const toggleGroup = (groupName: string) => {
    setExpandedGroups((prev) =>
      prev.includes(groupName)
        ? prev.filter((g) => g !== groupName)
        : [...prev, groupName],
    );
  };

  const handleSignOut = async () => {
    await clientSignOut({ callbackUrl: "/login" });
  };

  const isActive = (href: string) => {
    return (
      pathname === href ||
      (pathname?.startsWith(href) && href !== "/dashboard/admin")
    );
  };

  return (
    <aside className="w-64 bg-card border-r border-border flex flex-col h-full">
      {/* Logo Section - Enhanced */}
      <div className="p-5 border-b border-border">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-amber-500 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div>
            <h1 className="font-black text-sm tracking-tight">Al-Maysaroh</h1>
            <p className="text-[9px] text-purple-600 font-black uppercase tracking-wider">
              ADMIN PORTAL
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-3">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);

            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                    active
                      ? "bg-gradient-to-r from-purple-600/10 to-amber-500/10 text-purple-600"
                      : "text-muted-foreground hover:bg-muted/50 hover:text-foreground",
                  )}
                >
                  <Icon
                    className={cn("w-4 h-4", active ? "text-purple-600" : "")}
                  />
                  <span>{item.name}</span>
                  {active && (
                    <div className="ml-auto w-1.5 h-1.5 rounded-full bg-purple-600" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer - Sign Out */}
      <div className="p-4 border-t border-border">
        <button
          onClick={handleSignOut}
          className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 transition-all duration-200"
        >
          <LogOut className="w-4 h-4" />
          <span className="text-sm font-medium">Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
