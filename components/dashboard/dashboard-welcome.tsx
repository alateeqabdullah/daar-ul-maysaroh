// src/components/dashboard/dashboard-welcome.tsx
"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Bell,
  Calendar,
  BookOpen,
  TrendingUp,
  MessageSquare,
  Award,
  Clock,
  ChevronRight,
  Sun,
  Moon,
  Book,
  Users,
  Star,
  Target,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { format } from "date-fns";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

// --- UTILITY TYPES & FUNCTIONS (Outside Component) ---

interface User {
  name: string;
  role: "STUDENT" | "TEACHER" | "ADMIN" | "SUPER_ADMIN" | "PARENT";
  status: "APPROVED" | "PENDING";
}

interface DashboardWelcomeProps {
  user: User;
}

// Helper function to calculate initial state (Time and Greeting)
const getInitialTimeAndGreeting = () => {
  const now = new Date();
  const hour = now.getHours();
  let initialGreeting = "";

  if (hour < 12) initialGreeting = "Good morning";
  else if (hour < 18) initialGreeting = "Good afternoon";
  else initialGreeting = "Good evening";

  return { initialTime: now, initialGreeting };
};

// Link maps for cleaner JSX and link maintenance
const ROLE_BASED_LINKS = {
  CLASSES: {
    STUDENT: "/student/classes",
    TEACHER: "/teacher/classes",
    ADMIN: "/admin/classes",
    SUPER_ADMIN: "/admin/classes",
    PARENT: "/parent/children",
  },
  SCHEDULE: {
    STUDENT: "/student/schedule",
    TEACHER: "/teacher/schedule",
    ADMIN: "/admin/schedule",
    SUPER_ADMIN: "/admin/schedule",
    PARENT: "/parent/schedule",
  },
  ASSIGNMENTS_REPORTS: {
    STUDENT: { href: "/student/assignments", label: "Assignments" },
    TEACHER: { href: "/teacher/assignments", label: "Grade Work" },
    ADMIN: { href: "/admin/reports", label: "Reports" },
    SUPER_ADMIN: { href: "/admin/reports", label: "Reports" },
    PARENT: { href: "/parent/progress", label: "Progress" },
  },
};

// --- COMPONENT START ---

export default function DashboardWelcome({ user }: DashboardWelcomeProps) {
  const { theme, setTheme } = useTheme();

  // ✅ FIX: Initialize state directly on the first render to avoid cascading renders
  const { initialTime, initialGreeting } = getInitialTimeAndGreeting();
  const [currentTime, setCurrentTime] = useState(initialTime);
  const [greeting, setGreeting] = useState(initialGreeting);

  // 2. The update function is now ONLY for the interval tick
  const updateTimeAndGreeting = useCallback(() => {
    const now = new Date();
    setCurrentTime(now);

    const hour = now.getHours();
    if (hour < 12) setGreeting("Good morning");
    else if (hour < 18) setGreeting("Good afternoon");
    else setGreeting("Good evening");
  }, []);

  // 3. The useEffect is now ONLY for the external system (setInterval)
  useEffect(() => {
    // We removed updateTimeAndGreeting() here!
    const timer = setInterval(updateTimeAndGreeting, 60000);

    // Cleanup function
    return () => clearInterval(timer);
  }, [updateTimeAndGreeting]);

  // Get role-specific stats (Mock Data)
  const getRoleStats = () => {
    switch (user?.role) {
      case "STUDENT":
        return [
          {
            label: "Classes Today",
            value: "3",
            icon: Book,
            color: "text-blue-600 bg-blue-100",
          },
          {
            label: "Assignments Due",
            value: "2",
            icon: Clock,
            color: "text-red-600 bg-red-100",
          },
          {
            label: "Quran Progress",
            value: "78%",
            icon: TrendingUp,
            color: "text-green-600 bg-green-100",
          },
          {
            label: "Attendance",
            value: "96%",
            icon: Users,
            color: "text-purple-600 bg-purple-100",
          },
        ];
      case "TEACHER":
        return [
          {
            label: "Active Classes",
            value: "6",
            icon: Book,
            color: "text-blue-600 bg-blue-100",
          },
          {
            label: "Students",
            value: "142",
            icon: Users,
            color: "text-green-600 bg-green-100",
          },
          {
            label: "To Grade",
            value: "24",
            icon: Award,
            color: "text-red-600 bg-red-100",
          },
          {
            label: "Avg. Rating",
            value: "4.8/5",
            icon: Star,
            color: "text-yellow-600 bg-yellow-100",
          },
        ];
      case "ADMIN":
      case "SUPER_ADMIN":
        return [
          {
            label: "Pending Approvals",
            value: "12",
            icon: Users,
            color: "text-red-600 bg-red-100",
          },
          {
            label: "Active Users",
            value: "2,543",
            icon: Users,
            color: "text-green-600 bg-green-100",
          },
          {
            label: "Revenue",
            value: "$45,280",
            icon: TrendingUp,
            color: "text-blue-600 bg-blue-100",
          },
          {
            label: "System Health",
            value: "100%",
            icon: Target,
            color: "text-purple-600 bg-purple-100",
          },
        ];
      case "PARENT":
        return [
          {
            label: "Children",
            value: "2",
            icon: Users,
            color: "text-blue-600 bg-blue-100",
          },
          {
            label: "Avg. Grades",
            value: "A-",
            icon: Award,
            color: "text-green-600 bg-green-100",
          },
          {
            label: "Attendance",
            value: "95%",
            icon: Users,
            color: "text-purple-600 bg-purple-100",
          },
          {
            label: "Due Payments",
            value: "1",
            icon: TrendingUp,
            color: "text-yellow-600 bg-yellow-100",
          },
        ];
      default:
        return [];
    }
  };

  // Get role-specific message
  const getRoleMessage = () => {
    switch (user?.role) {
      case "STUDENT":
        return "Keep up the great work in your Islamic studies!";
      case "TEACHER":
        return "Continue inspiring the next generation of Muslims!";
      case "ADMIN":
      case "SUPER_ADMIN":
        return "Manage your madrasah efficiently with our tools.";
      case "PARENT":
        return "Stay updated on your child's progress.";
      default:
        return "Welcome to MadrasahPro!";
    }
  };

  const roleStats = getRoleStats();
  const roleMessage = getRoleMessage();

  // Get prayer times (simplified - in production use an API)
  const getNextPrayer = () => {
    const prayers = [
      { name: "Fajr", time: "05:30" },
      { name: "Dhuhr", time: "12:30" },
      { name: "Asr", time: "15:45" },
      { name: "Maghrib", time: "18:15" },
      { name: "Isha", time: "19:45" },
    ];

    const now = currentTime;
    const currentTimeStr = format(now, "HH:mm");

    for (const prayer of prayers) {
      if (prayer.time > currentTimeStr) {
        return prayer;
      }
    }

    return prayers[0];
  };

  const nextPrayer = getNextPrayer();
  const userRole = user?.role || "";
  const assignmentsData = ROLE_BASED_LINKS.ASSIGNMENTS_REPORTS[userRole] || {
    href: "/dashboard",
    label: "View Progress",
  };

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <Card className="relative overflow-hidden border-0 bg-gradient-primary text-white shadow-xl">
        <div className="absolute right-0 top-0 h-full w-1/3">
          <div className="absolute inset-0 bg-linear-to-l from-white/10 to-transparent" />
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/5" />
          <div className="absolute -bottom-20 -right-10 h-64 w-64 rounded-full bg-white/5" />
        </div>

        <CardContent className="relative p-6">
          <div className="flex flex-col justify-between md:flex-row md:items-start">
            <div className="space-y-4">
              <div>
                <h1 className="text-2xl font-bold">
                  {greeting}, {user?.name}!
                </h1>
                <p className="mt-2 text-purple-100">{roleMessage}</p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <Badge className="border-white/30 bg-white/20 text-white backdrop-blur-sm">
                  <Calendar className="mr-1 h-3 w-3" />
                  {format(currentTime, "EEEE, MMMM d, yyyy")}
                </Badge>
                <Badge className="border-white/30 bg-white/20 text-white backdrop-blur-sm">
                  <Clock className="mr-1 h-3 w-3" />
                  {format(currentTime, "hh:mm a")}
                </Badge>
                <Badge className="border-white/30 bg-white/20 text-white backdrop-blur-sm">
                  <BookOpen className="mr-1 h-3 w-3" />
                  {userRole.replace("_", " ")}
                </Badge>
              </div>
            </div>

            <div className="mt-4 md:mt-0">
              <div className="rounded-xl bg-white/10 p-4 backdrop-blur-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-purple-100">Next Prayer</p>
                    <p className="text-2xl font-bold">{nextPrayer.name}</p>
                    <p className="text-sm text-purple-100">{nextPrayer.time}</p>
                  </div>
                  <div className="text-4xl">🕌</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {roleStats.map((stat, index) => (
          <Card key={index} className="group transition-all hover:shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {stat.label}
                  </p>
                  <p className="mt-2 text-3xl font-bold">{stat.value}</p>
                </div>
                <div
                  className={cn(
                    "rounded-xl p-3 transition-transform group-hover:scale-110",
                    stat.color
                  )}
                >
                  <stat.icon className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Quick Actions</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Get things done faster
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="rounded-full"
              >
                <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="relative rounded-full"
              >
                <Bell className="h-5 w-5" />
                <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-red-500" />
              </Button>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <Button
              variant="outline"
              className="h-auto flex-col items-center justify-center p-4"
              asChild
            >
              <a href={ROLE_BASED_LINKS.CLASSES[userRole] || "/dashboard"}>
                <Book className="mb-2 h-6 w-6" />
                <span className="text-sm">
                  {userRole === "STUDENT"
                    ? "My Classes"
                    : userRole === "TEACHER"
                    ? "Manage Classes"
                    : userRole === "ADMIN" || userRole === "SUPER_ADMIN"
                    ? "All Classes"
                    : "Children"}
                </span>
              </a>
            </Button>

            <Button
              variant="outline"
              className="h-auto flex-col items-center justify-center p-4"
              asChild
            >
              <a href={ROLE_BASED_LINKS.SCHEDULE[userRole] || "/dashboard"}>
                <Calendar className="mb-2 h-6 w-6" />
                <span className="text-sm">Schedule</span>
              </a>
            </Button>

            <Button
              variant="outline"
              className="h-auto flex-col items-center justify-center p-4"
              asChild
            >
              <a href={assignmentsData.href}>
                <Award className="mb-2 h-6 w-6" />
                <span className="text-sm">{assignmentsData.label}</span>
              </a>
            </Button>

            <Button
              variant="outline"
              className="h-auto flex-col items-center justify-center p-4"
              asChild
            >
              <a href="/messages">
                <MessageSquare className="mb-2 h-6 w-6" />
                <span className="text-sm">Messages</span>
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Progress & Notifications */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Progress Summary */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Weekly Progress</h3>
              <Button variant="ghost" size="sm" className="text-purple-600">
                View Details
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>

            <div className="mt-6 space-y-4">
              {[
                {
                  label: "Quran Memorization",
                  value: 78,
                  color: "bg-purple-500",
                },
                {
                  label: "Assignment Completion",
                  value: 92,
                  color: "bg-green-500",
                },
                { label: "Class Attendance", value: 96, color: "bg-blue-500" },
                {
                  label: "Teacher Evaluation",
                  value: 85,
                  color: "bg-yellow-500",
                },
              ].map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{item.label}</span>
                    <span>{item.value}%</span>
                  </div>
                  <Progress value={item.value} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Notifications */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Recent Notifications</h3>
              <Button variant="ghost" size="sm" className="text-purple-600">
                See All
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>

            <div className="mt-6 space-y-4">
              {[
                {
                  title: "New Assignment Posted",
                  description: "Tajweed Rules Quiz due tomorrow",
                  time: "10 min ago",
                  type: "assignment",
                  unread: true,
                },
                {
                  title: "Quran Evaluation Completed",
                  description: "Surah Al-Mulk evaluation score: 9.5/10",
                  time: "1 hour ago",
                  type: "quran",
                  unread: true,
                },
                {
                  title: "Class Schedule Updated",
                  description: "Friday class moved to 9:00 AM",
                  time: "2 hours ago",
                  type: "schedule",
                  unread: false,
                },
                {
                  title: "Payment Received",
                  description: "Monthly fee payment confirmed",
                  time: "1 day ago",
                  type: "payment",
                  unread: false,
                },
              ].map((notification, index) => (
                <div
                  key={index}
                  className={`flex items-start space-x-3 rounded-lg p-3 ${
                    notification.unread ? "bg-blue-50 dark:bg-blue-900/20" : ""
                  }`}
                >
                  <div
                    className={`mt-1 rounded-full p-2 ${
                      notification.type === "assignment"
                        ? "bg-green-100 text-green-600"
                        : notification.type === "quran"
                        ? "bg-purple-100 text-purple-600"
                        : notification.type === "schedule"
                        ? "bg-blue-100 text-blue-600"
                        : "bg-yellow-100 text-yellow-600"
                    }`}
                  >
                    <Bell className="h-4 w-4" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-start justify-between">
                      <p className="font-medium">{notification.title}</p>
                      {notification.unread && (
                        <div className="h-2 w-2 rounded-full bg-blue-600" />
                      )}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {notification.description}
                    </p>
                    <p className="text-xs text-gray-500">{notification.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Schedule */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Upcoming Schedule</h3>
            <Button variant="ghost" size="sm" className="text-purple-600">
              View Full Calendar
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>

          <div className="mt-6 space-y-4">
            {[
              {
                title: "Quran Memorization Class",
                time: "Tomorrow, 9:00 AM - 10:30 AM",
                teacher: "Sheikh Ahmed Al-Qari",
                type: "class",
              },
              {
                title: "Tajweed Rules Workshop",
                time: "Wednesday, 2:00 PM - 3:30 PM",
                teacher: "Ustadh Muhammad Ali",
                type: "workshop",
              },
              {
                title: "Parent-Teacher Meeting",
                time: "Friday, 4:00 PM - 5:00 PM",
                teacher: "Academic Department",
                type: "meeting",
              },
              {
                title: "Islamic Studies Exam",
                time: "Next Monday, 10:00 AM - 11:30 AM",
                teacher: "Exam Hall",
                type: "exam",
              },
            ].map((event, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded-lg border border-gray-200 p-4 dark:border-gray-700"
              >
                <div className="flex items-center space-x-4">
                  <div
                    className={`rounded-lg p-3 ${
                      event.type === "class"
                        ? "bg-blue-100 text-blue-600"
                        : event.type === "workshop"
                        ? "bg-purple-100 text-purple-600"
                        : event.type === "meeting"
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    <Calendar className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-medium">{event.title}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {event.time}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      with {event.teacher}
                    </p>
                  </div>
                </div>
                <Button size="sm" variant="outline">
                  Add to Calendar
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
