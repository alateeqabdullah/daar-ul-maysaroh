// src/app/(dashboard)/page.tsx
"use client";

import { useSession } from "next-auth/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Users,
  BookOpen,
  Calendar,
  BarChart,
  TrendingUp,
  Clock,
  Award,
  FileText,
  Video,
  MessageSquare,
  Download,
  Eye,
  Settings,
  CreditCard,
} from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const { data: session } = useSession();

  // Stats based on user role
  const getStats = () => {
    const baseStats = [
      {
        label: "Total Classes",
        value: "5",
        icon: BookOpen,
        change: "+2 this month",
        color: "text-blue-600 bg-blue-100",
      },
      {
        label: "Active Students",
        value: "48",
        icon: Users,
        change: "+12% from last month",
        color: "text-green-600 bg-green-100",
      },
      {
        label: "Attendance Rate",
        value: "94%",
        icon: Calendar,
        change: "+3% improvement",
        color: "text-purple-600 bg-purple-100",
      },
      {
        label: "Avg. Grade",
        value: "A-",
        icon: BarChart,
        change: "Maintained",
        color: "text-yellow-600 bg-yellow-100",
      },
    ];

    switch (session?.user?.role) {
      case "STUDENT":
        return [
          {
            label: "Enrolled Classes",
            value: "4",
            icon: BookOpen,
            change: "2 new this term",
            color: "text-blue-600 bg-blue-100",
          },
          {
            label: "Assignments Due",
            value: "3",
            icon: FileText,
            change: "Next: Tomorrow",
            color: "text-red-600 bg-red-100",
          },
          {
            label: "Quran Progress",
            value: "78%",
            icon: Award,
            change: "+5% this week",
            color: "text-green-600 bg-green-100",
          },
          {
            label: "Attendance",
            value: "96%",
            icon: Calendar,
            change: "Perfect this month",
            color: "text-purple-600 bg-purple-100",
          },
        ];
      case "TEACHER":
        return [
          {
            label: "Active Classes",
            value: "6",
            icon: BookOpen,
            change: "2 new this term",
            color: "text-blue-600 bg-blue-100",
          },
          {
            label: "Total Students",
            value: "142",
            icon: Users,
            change: "+18 this month",
            color: "text-green-600 bg-green-100",
          },
          {
            label: "Assignments to Grade",
            value: "24",
            icon: FileText,
            change: "Due this week",
            color: "text-red-600 bg-red-100",
          },
          {
            label: "Avg. Class Rating",
            value: "4.8/5",
            icon: Award,
            change: "+0.2 this month",
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
            change: "3 new today",
            color: "text-red-600 bg-red-100",
          },
          {
            label: "Active Users",
            value: "2,543",
            icon: Users,
            change: "+124 this month",
            color: "text-green-600 bg-green-100",
          },
          {
            label: "Total Revenue",
            value: "$45,280",
            icon: TrendingUp,
            change: "+18% from last month",
            color: "text-blue-600 bg-blue-100",
          },
          {
            label: "System Health",
            value: "100%",
            icon: Award,
            change: "All systems operational",
            color: "text-purple-600 bg-purple-100",
          },
        ];
      case "PARENT":
        return [
          {
            label: "Children",
            value: "2",
            icon: Users,
            change: "Both active",
            color: "text-blue-600 bg-blue-100",
          },
          {
            label: "Avg. Grades",
            value: "A-",
            icon: BarChart,
            change: "Stable",
            color: "text-green-600 bg-green-100",
          },
          {
            label: "Attendance",
            value: "95%",
            icon: Calendar,
            change: "Good",
            color: "text-purple-600 bg-purple-100",
          },
          {
            label: "Due Payments",
            value: "1",
            icon: TrendingUp,
            change: "Due next week",
            color: "text-yellow-600 bg-yellow-100",
          },
        ];
      default:
        return baseStats;
    }
  };

  // Quick actions based on role
  const getQuickActions = () => {
    switch (session?.user?.role) {
      case "STUDENT":
        return [
          {
            label: "Join Live Class",
            icon: Video,
            href: "/student/live-class",
          },
          {
            label: "Submit Assignment",
            icon: FileText,
            href: "/student/assignments",
          },
          { label: "View Grades", icon: BarChart, href: "/student/grades" },
          { label: "Quran Practice", icon: BookOpen, href: "/student/quran" },
        ];
      case "TEACHER":
        return [
          {
            label: "Take Attendance",
            icon: Calendar,
            href: "/teacher/attendance",
          },
          {
            label: "Create Assignment",
            icon: FileText,
            href: "/teacher/assignments/new",
          },
          {
            label: "Grade Submissions",
            icon: BarChart,
            href: "/teacher/grades",
          },
          {
            label: "Send Announcement",
            icon: MessageSquare,
            href: "/teacher/announcements",
          },
        ];
      case "ADMIN":
      case "SUPER_ADMIN":
        return [
          { label: "Review Approvals", icon: Users, href: "/admin/approvals" },
          { label: "Create Class", icon: BookOpen, href: "/admin/classes/new" },
          { label: "View Reports", icon: BarChart, href: "/admin/reports" },
          { label: "System Settings", icon: Settings, href: "/admin/settings" },
        ];
      case "PARENT":
        return [
          { label: "View Progress", icon: BarChart, href: "/parent/progress" },
          {
            label: "Check Attendance",
            icon: Calendar,
            href: "/parent/attendance",
          },
          { label: "Make Payment", icon: CreditCard, href: "/parent/payments" },
          {
            label: "Message Teacher",
            icon: MessageSquare,
            href: "/parent/messages",
          },
        ];
      default:
        return [];
    }
  };

  // Recent activity based on role
  const getRecentActivity = () => {
    const baseActivity = [
      {
        title: "Class scheduled",
        description: "Quran Memorization - Level 2",
        time: "10 min ago",
        type: "class",
      },
      {
        title: "Assignment graded",
        description: "Tajweed Rules Quiz",
        time: "1 hour ago",
        type: "assignment",
      },
      {
        title: "New announcement",
        description: "Eid al-Fitr Holiday Notice",
        time: "2 hours ago",
        type: "announcement",
      },
      {
        title: "Payment received",
        description: "Monthly fee - Student ID: STD-2024-001",
        time: "1 day ago",
        type: "payment",
      },
    ];

    return baseActivity;
  };

  const stats = getStats();
  const quickActions = getQuickActions();
  const recentActivity = getRecentActivity();

  return (
    <div className="space-y-8">
      {/* Welcome section */}
      <div className="rounded-2xl bg-gradient-primary p-6 text-white">
        <div className="flex flex-col justify-between md:flex-row md:items-center">
          <div>
            <h1 className="text-2xl font-bold">
              Assalamu Alaikum, {session?.user?.name}!
            </h1>
            <p className="mt-2 text-purple-100">
              {session?.user?.role === "STUDENT" &&
                "Keep up the great work in your Islamic studies!"}
              {session?.user?.role === "TEACHER" &&
                "Continue inspiring the next generation of Muslims!"}
              {session?.user?.role === "ADMIN" &&
                "Manage your madrasah efficiently with our tools."}
              {session?.user?.role === "PARENT" &&
                "Stay updated on your child's progress."}
            </p>
          </div>
          <div className="mt-4 flex items-center space-x-3 md:mt-0">
            <Button
              variant="outline"
              className="border-white text-white hover:bg-white/10"
            >
              <Download className="mr-2 h-4 w-4" />
              Download Report
            </Button>
            <Button className="bg-white text-purple-700 hover:bg-gray-100">
              <Eye className="mr-2 h-4 w-4" />
              View Analytics
            </Button>
          </div>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {stat.label}
                  </p>
                  <p className="mt-2 text-3xl font-bold">{stat.value}</p>
                  <p className="mt-1 text-xs text-gray-500">{stat.change}</p>
                </div>
                <div
                  className={`rounded-lg p-3 ${stat.color} dark:bg-opacity-20`}
                >
                  <stat.icon className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick actions & Recent activity */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Quick actions */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Quickly access frequently used features
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {quickActions.map((action, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="h-24 flex-col"
                  asChild
                >
                  <Link href={action.href}>
                    <action.icon className="mb-2 h-6 w-6" />
                    <span className="text-xs">{action.label}</span>
                  </Link>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates from your account</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="mt-1">
                    <div
                      className={`rounded-full p-2 ${
                        activity.type === "class"
                          ? "bg-blue-100 text-blue-600"
                          : activity.type === "assignment"
                          ? "bg-green-100 text-green-600"
                          : activity.type === "announcement"
                          ? "bg-purple-100 text-purple-600"
                          : "bg-yellow-100 text-yellow-600"
                      }`}
                    >
                      {activity.type === "class" && (
                        <BookOpen className="h-4 w-4" />
                      )}
                      {activity.type === "assignment" && (
                        <FileText className="h-4 w-4" />
                      )}
                      {activity.type === "announcement" && (
                        <MessageSquare className="h-4 w-4" />
                      )}
                      {activity.type === "payment" && (
                        <TrendingUp className="h-4 w-4" />
                      )}
                    </div>
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">{activity.title}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {activity.description}
                    </p>
                    <p className="text-xs text-gray-500">
                      <Clock className="mr-1 inline h-3 w-3" />
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming schedule */}
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Schedule</CardTitle>
          <CardDescription>
            Your classes and events for the next 7 days
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="flex items-center justify-between rounded-lg border border-gray-200 p-4 dark:border-gray-700"
              >
                <div className="flex items-center space-x-4">
                  <div className="rounded-lg bg-purple-100 p-3 dark:bg-purple-900/30">
                    <Calendar className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <h4 className="font-medium">Quran Memorization Class</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      with Sheikh Ahmed • Level: Beginner
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">Tomorrow, 9:00 AM</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    1.5 hours • Zoom Meeting
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
