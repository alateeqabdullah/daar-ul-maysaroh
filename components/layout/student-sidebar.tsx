// src/components/layout/student-sidebar.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BookOpen,
  Calendar,
  FileText,
  BarChart3,
  Book,
  UserCheck,
  Award,
  MessageSquare,
  User,
  Settings,
  HelpCircle,
  LogOut,
  Menu,
  X,
  ChevronDown,
  Clock,
  Star,
  Target,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";
import { signOut } from "next-auth/react";

interface StudentSidebarProps {
  user: any;
}

const navigation = [
  { name: "Dashboard", href: "/student", icon: LayoutDashboard },
  { name: "My Classes", href: "/student/classes", icon: BookOpen },
  { name: "Schedule", href: "/student/schedule", icon: Calendar },
  { name: "Assignments", href: "/student/assignments", icon: FileText },
  { name: "Grades", href: "/student/grades", icon: BarChart3 },
  { name: "Quran Progress", href: "/student/quran", icon: Book },
  { name: "Attendance", href: "/student/attendance", icon: UserCheck },
  { name: "Certificates", href: "/student/certificates", icon: Award },
  { name: "Messages", href: "/student/messages", icon: MessageSquare },
  { name: "Progress Reports", href: "/student/reports", icon: Target },
  { name: "Profile", href: "/student/profile", icon: User },
  { name: "Settings", href: "/student/settings", icon: Settings },
];

export default function StudentSidebar({ user }: StudentSidebarProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState<string[]>([
    "classes",
  ]);
  const pathname = usePathname();

  const toggleSection = (section: string) => {
    setExpandedSections((prev) =>
      prev.includes(section)
        ? prev.filter((s) => s !== section)
        : [...prev, section]
    );
  };

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/" });
  };

  // Mock data - In production, this would come from API
  const quickStats = {
    pendingAssignments: 3,
    nextClass: "Quran 101 - Today 14:00",
    attendanceRate: "94%",
    hifzProgress: "Juz 28 - 75%",
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
          "fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-white shadow-xl transition-transform duration-300 dark:bg-gray-800 lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Sidebar Header */}
        <div className="flex h-16 items-center justify-between border-b border-gray-200 px-6 dark:border-gray-700">
          <Link href="/student" className="flex items-center space-x-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary">
              <BookOpen className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-bold text-gray-900 dark:text-white">
              Student Portal
            </span>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-6 w-6" />
          </Button>
        </div>

        {/* User Profile */}
        <div className="border-b border-gray-200 px-6 py-4 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <Avatar className="h-12 w-12 border-2 border-purple-200 dark:border-purple-800">
              <AvatarImage src={user.image} />
              <AvatarFallback className="bg-gradient-primary text-white">
                {getInitials(user.name)}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <p className="truncate font-medium text-gray-900 dark:text-white">
                {user.name}
              </p>
              <div className="flex items-center space-x-1">
                <span className="truncate text-sm text-gray-600 dark:text-gray-400">
                  Student ID: {user.studentProfile?.studentId || "STD-001"}
                </span>
              </div>
              <div className="mt-1 flex items-center space-x-1">
                <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900/30 dark:text-green-300">
                  Active
                </span>
                <span className="text-xs text-gray-500">
                  Level: Intermediate
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="border-b border-gray-200 p-4 dark:border-gray-700">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <FileText className="h-4 w-4 text-yellow-500" />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Pending Assignments
                </span>
              </div>
              <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-800 dark:bg-red-900/30 dark:text-red-300">
                {quickStats.pendingAssignments}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-blue-500" />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                {quickStats.nextClass}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <UserCheck className="h-4 w-4 text-green-500" />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Attendance
                </span>
              </div>
              <span className="text-sm font-medium text-green-600">
                {quickStats.attendanceRate}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Star className="h-4 w-4 text-purple-500" />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Hifz Progress
                </span>
              </div>
              <span className="text-sm font-medium text-purple-600">
                {quickStats.hifzProgress}
              </span>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 overflow-y-auto p-4">
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
                    ? "bg-gradient-primary text-white shadow-sm"
                    : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                )}
                onClick={() => setSidebarOpen(false)}
              >
                <item.icon
                  className={cn(
                    "mr-3 h-5 w-5 flex-shrink-0",
                    isActive
                      ? "text-white"
                      : "text-gray-400 group-hover:text-gray-500"
                  )}
                />
                <span className="flex-1">{item.name}</span>
                {item.name === "Assignments" &&
                  quickStats.pendingAssignments > 0 && (
                    <span className="ml-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-medium text-white">
                      {quickStats.pendingAssignments}
                    </span>
                  )}
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="border-t border-gray-200 p-4 dark:border-gray-700">
          <div className="space-y-1">
            <Link
              href="/student/help"
              className="flex items-center rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              <HelpCircle className="mr-3 h-5 w-5" />
              Help & Support
            </Link>
            <button
              onClick={handleSignOut}
              className="flex w-full items-center rounded-lg px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
            >
              <LogOut className="mr-3 h-5 w-5" />
              Sign Out
            </button>
          </div>

          {/* Progress Bar */}
          <div className="mt-4 rounded-lg bg-gradient-to-r from-purple-50 to-blue-50 p-3 dark:from-gray-700 dark:to-gray-800">
            <div className="mb-2 flex items-center justify-between text-xs">
              <span className="font-medium text-gray-700 dark:text-gray-300">
                Weekly Goal
              </span>
              <span className="text-purple-600 dark:text-purple-400">65%</span>
            </div>
            <div className="h-2 rounded-full bg-gray-200 dark:bg-gray-700">
              <div className="h-full w-3/5 rounded-full bg-gradient-primary"></div>
            </div>
            <p className="mt-2 text-xs text-gray-600 dark:text-gray-400">
              3 of 5 assignments completed this week
            </p>
          </div>
        </div>
      </div>

      {/* Mobile sidebar button */}
      <button
        type="button"
        className="fixed left-4 top-4 z-40 rounded-lg bg-gradient-primary p-2 text-white lg:hidden"
        onClick={() => setSidebarOpen(true)}
      >
        <Menu className="h-6 w-6" />
      </button>
    </>
  );
}
