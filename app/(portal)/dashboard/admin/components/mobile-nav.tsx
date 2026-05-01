// app/(portal)/dashboard/components/mobile-nav.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Crown } from "lucide-react";
import { cn } from "@/lib/utils";
import { signOut } from "next-auth/react";

interface MobileNavProps {
  userRole: string;
}

const navigationConfig = {
  SUPER_ADMIN: [
    { name: "Dashboard", href: "/dashboard", icon: "📊" },
    { name: "Users", href: "/dashboard/users", icon: "👥" },
    { name: "Academics", href: "/dashboard/academics", icon: "📚" },
    { name: "Attendance", href: "/dashboard/attendance", icon: "✅" },
    { name: "Groups", href: "/dashboard/groups", icon: "👥" },
    { name: "Islamic Features", href: "/dashboard/islamic", icon: "🕌" },
    { name: "Finance", href: "/dashboard/finances", icon: "💰" },
    { name: "Resources", href: "/dashboard/resources", icon: "📁" },
    { name: "Communications", href: "/dashboard/communications", icon: "📢" },
    { name: "Pricing", href: "/dashboard/pricing", icon: "🏷️" },
    { name: "Events", href: "/dashboard/events", icon: "📅" },
    { name: "Reports", href: "/dashboard/reports", icon: "📊" },
    { name: "Settings", href: "/dashboard/settings", icon: "⚙️" },
    { name: "Audit Logs", href: "/dashboard/audit-logs", icon: "📜" },
  ],
  ADMIN: [
    { name: "Dashboard", href: "/dashboard", icon: "📊" },
    { name: "Users", href: "/dashboard/users", icon: "👥" },
    { name: "Academics", href: "/dashboard/academics", icon: "📚" },
    { name: "Attendance", href: "/dashboard/attendance", icon: "✅" },
    { name: "Groups", href: "/dashboard/groups", icon: "👥" },
    { name: "Islamic Features", href: "/dashboard/islamic", icon: "🕌" },
    { name: "Finance", href: "/dashboard/finances", icon: "💰" },
    { name: "Resources", href: "/dashboard/resources", icon: "📁" },
    { name: "Communications", href: "/dashboard/communications", icon: "📢" },
    { name: "Events", href: "/dashboard/events", icon: "📅" },
    { name: "Reports", href: "/dashboard/reports", icon: "📊" },
    { name: "Settings", href: "/dashboard/settings", icon: "⚙️" },
  ],
  TEACHER: [
    { name: "Dashboard", href: "/dashboard", icon: "📊" },
    { name: "My Classes", href: "/dashboard/classes", icon: "🏫" },
    { name: "Attendance", href: "/dashboard/attendance", icon: "✅" },
    { name: "Assignments", href: "/dashboard/assignments", icon: "📝" },
    { name: "Grades", href: "/dashboard/grades", icon: "🏆" },
    { name: "Students", href: "/dashboard/students", icon: "👨‍🎓" },
    { name: "Resources", href: "/dashboard/resources", icon: "📁" },
  ],
  CONTENT_MANAGER: [
    { name: "Dashboard", href: "/dashboard", icon: "📊" },
    { name: "Courses", href: "/dashboard/courses", icon: "📚" },
    { name: "Resources", href: "/dashboard/resources", icon: "📁" },
    { name: "Announcements", href: "/dashboard/announcements", icon: "📢" },
  ],
  SUPPORT: [
    { name: "Dashboard", href: "/dashboard", icon: "📊" },
    { name: "Users", href: "/dashboard/users", icon: "👥" },
    { name: "Support Tickets", href: "/dashboard/tickets", icon: "🎫" },
    { name: "Communications", href: "/dashboard/communications", icon: "📢" },
  ],
};

export function MobileNav({ userRole }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navItems =
    navigationConfig[userRole as keyof typeof navigationConfig] ||
    navigationConfig.ADMIN;

  return (
    <>
      {/* Bottom Navigation Bar - Always visible on mobile */}
      <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background lg:hidden">
        <div className="flex items-center justify-around py-2">
          {navItems.slice(0, 5).map((item) => {
            const isActive =
              pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "flex flex-col items-center gap-1 rounded-lg px-3 py-1 text-xs transition-all",
                  isActive
                    ? "text-purple-600 dark:text-purple-400"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                <span className="text-lg">{item.icon}</span>
                <span className="text-[10px]">{item.name}</span>
              </Link>
            );
          })}

          {/* More button to open full menu */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex flex-col items-center gap-1 rounded-lg px-3 py-1 text-xs text-muted-foreground"
          >
            <span className="text-lg">{isOpen ? "✕" : "⋯"}</span>
            <span className="text-[10px]">{isOpen ? "Close" : "More"}</span>
          </button>
        </div>
      </div>

      {/* Full Menu Drawer */}
      {isOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 z-40 bg-black/50 lg:hidden"
            onClick={() => setIsOpen(false)}
          />

          {/* Drawer */}
          <div className="fixed bottom-16 left-0 right-0 z-50 max-h-[70vh] overflow-y-auto rounded-t-2xl border-t border-border bg-background p-4 lg:hidden">
            <div className="mb-4 flex items-center justify-between border-b border-border pb-3">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-purple-600 to-amber-500">
                  <Crown className="h-4 w-4 text-white" />
                </div>
                <span className="text-sm font-bold">Al-Maysaroh</span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-lg p-1 hover:bg-muted"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {navItems.map((item) => {
                const isActive =
                  pathname === item.href ||
                  pathname.startsWith(`${item.href}/`);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "flex flex-col items-center gap-1 rounded-lg p-3 transition-all",
                      isActive
                        ? "bg-purple-50 text-purple-600 dark:bg-purple-950/40 dark:text-purple-400"
                        : "text-muted-foreground hover:bg-muted",
                    )}
                  >
                    <span className="text-xl">{item.icon}</span>
                    <span className="text-xs">{item.name}</span>
                  </Link>
                );
              })}
            </div>

            {/* Sign Out Button */}
            <div className="mt-4 border-t border-border pt-3">
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="flex w-full items-center justify-center gap-2 rounded-lg p-3 text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20"
              >
                <span>🚪</span>
                Sign Out
              </button>
            </div>
          </div>
        </>
      )}

      {/* Add padding to bottom of main content to account for bottom nav */}
      <style jsx global>{`
        @media (max-width: 768px) {
          main {
            padding-bottom: 70px;
          }
        }
      `}</style>
    </>
  );
}
