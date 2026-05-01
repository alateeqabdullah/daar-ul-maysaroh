// src/app/parent/dashboard/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Users,
  BookOpen,
  TrendingUp,
  Calendar,
  Award,
  MessageSquare,
  Bell,
  Download,
  Eye,
  ChevronRight,
  CreditCard,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDate } from "@/lib/utils";

interface Child {
  id: string;
  name: string;
  studentId: string;
  currentClass: string;
  avatar?: string;
  attendance: number;
  averageGrade: string;
}

interface Notification {
  id: string;
  title: string;
  message: string;
  type: string;
  createdAt: string;
  isRead: boolean;
}

export default function ParentDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [children, setChildren] = useState<Child[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "loading") return;

    if (!session) {
      router.push("/login");
      return;
    }

    if (session.user.role !== "PARENT") {
      router.push("/dashboard");
    }
  }, [session, status, router]);

  useEffect(() => {
    if (session) {
      fetchData();
    }
  }, [session]);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch children
      const childrenRes = await fetch("/api/parent/children");
      const childrenData = await childrenRes.json();

      // Fetch notifications
      const notifRes = await fetch("/api/notifications");
      const notifData = await notifRes.json();

      if (childrenRes.ok) {
        setChildren(childrenData.children);
      }

      if (notifRes.ok) {
        setNotifications(notifData.notifications);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const unreadNotifications = notifications.filter((n) => !n.isRead).length;

  if (status === "loading" || loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-purple-600 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Parent Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Monitor your children's progress and activities
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Reports
          </Button>
          <Button>
            <MessageSquare className="mr-2 h-4 w-4" />
            Message Teachers
          </Button>
        </div>
      </div>

      {/* Welcome Card */}
      <Card className="bg-gradient-primary text-white">
        <CardContent className="p-6">
          <div className="flex flex-col justify-between md:flex-row md:items-center">
            <div>
              <h2 className="text-2xl font-bold">
                Assalamu Alaikum, {session?.user?.name}!
              </h2>
              <p className="mt-2 text-purple-100">
                You have {children.length} child
                {children.length !== 1 ? "ren" : ""} enrolled
              </p>
            </div>
            <div className="mt-4 flex items-center space-x-2 md:mt-0">
              <Bell className="h-5 w-5" />
              <Badge className="bg-white text-purple-700">
                {unreadNotifications} new notification
                {unreadNotifications !== 1 ? "s" : ""}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Children Overview */}
      <div className="grid gap-6 lg:grid-cols-3">
        {children.map((child) => (
          <Card key={child.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage src={child.avatar} />
                    <AvatarFallback>
                      {child.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{child.name}</CardTitle>
                    <CardDescription>ID: {child.studentId}</CardDescription>
                  </div>
                </div>
                <Button size="sm" variant="ghost" asChild>
                  <Link href={`/parent/children/${child.id}`}>
                    <Eye className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">
                    Class
                  </span>
                  <span className="font-medium">{child.currentClass}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">
                    Attendance
                  </span>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">{child.attendance}%</span>
                    <Badge
                      className={
                        child.attendance >= 90
                          ? "bg-green-100 text-green-800"
                          : child.attendance >= 75
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }
                    >
                      {child.attendance >= 90
                        ? "Excellent"
                        : child.attendance >= 75
                        ? "Good"
                        : "Needs Improvement"}
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">
                    Avg. Grade
                  </span>
                  <Badge className="bg-blue-100 text-blue-800">
                    {child.averageGrade}
                  </Badge>
                </div>
              </div>

              <Progress value={child.attendance} className="h-2" />

              <div className="grid grid-cols-2 gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="h-auto flex-col p-2"
                  asChild
                >
                  <Link href={`/parent/children/${child.id}/progress`}>
                    <TrendingUp className="mb-1 h-4 w-4" />
                    <span className="text-xs">Progress</span>
                  </Link>
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="h-auto flex-col p-2"
                  asChild
                >
                  <Link href={`/parent/children/${child.id}/attendance`}>
                    <Calendar className="mb-1 h-4 w-4" />
                    <span className="text-xs">Attendance</span>
                  </Link>
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="h-auto flex-col p-2"
                  asChild
                >
                  <Link href={`/parent/children/${child.id}/grades`}>
                    <Award className="mb-1 h-4 w-4" />
                    <span className="text-xs">Grades</span>
                  </Link>
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="h-auto flex-col p-2"
                  asChild
                >
                  <Link href={`/parent/children/${child.id}/messages`}>
                    <MessageSquare className="mb-1 h-4 w-4" />
                    <span className="text-xs">Messages</span>
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}

        {/* Add Child Card */}
        {children.length < 3 && (
          <Card className="border-dashed">
            <CardContent className="flex h-full flex-col items-center justify-center p-6 text-center">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full border-2 border-dashed border-gray-300 dark:border-gray-700">
                <Users className="h-6 w-6 text-gray-400" />
              </div>
              <h3 className="mb-2 font-semibold">Add Another Child</h3>
              <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                Enroll another child in our madrasah
              </p>
              <Button variant="outline">Add Child</Button>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Notifications & Quick Actions */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Notifications */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Notifications</CardTitle>
            <CardDescription>
              Latest updates about your children
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {notifications.slice(0, 5).map((notification) => (
                <div
                  key={notification.id}
                  className={`flex items-start space-x-3 rounded-lg p-3 ${
                    !notification.isRead ? "bg-blue-50 dark:bg-blue-900/20" : ""
                  }`}
                >
                  <div
                    className={`mt-1 rounded-full p-1 ${
                      notification.type === "GRADE"
                        ? "bg-green-100 text-green-600"
                        : notification.type === "ATTENDANCE"
                        ? "bg-yellow-100 text-yellow-600"
                        : notification.type === "ANNOUNCEMENT"
                        ? "bg-purple-100 text-purple-600"
                        : "bg-blue-100 text-blue-600"
                    }`}
                  >
                    <Bell className="h-4 w-4" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="font-medium">{notification.title}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {notification.message}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatDate(notification.createdAt)}
                    </p>
                  </div>
                  {!notification.isRead && (
                    <div className="h-2 w-2 rounded-full bg-blue-600" />
                  )}
                </div>
              ))}

              {notifications.length === 0 && (
                <div className="text-center py-4">
                  <Bell className="mx-auto h-8 w-8 text-gray-400" />
                  <p className="mt-2 text-gray-600 dark:text-gray-400">
                    No notifications yet
                  </p>
                </div>
              )}
            </div>

            {notifications.length > 0 && (
              <Button variant="ghost" className="mt-4 w-full" asChild>
                <Link href="/parent/notifications">
                  View All Notifications
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks for parents</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="h-auto flex-col p-4" asChild>
                <Link href="/parent/payments">
                  <CreditCard className="mb-2 h-6 w-6" />
                  <span>Make Payment</span>
                </Link>
              </Button>
              <Button variant="outline" className="h-auto flex-col p-4" asChild>
                <Link href="/parent/schedule">
                  <Calendar className="mb-2 h-6 w-6" />
                  <span>View Schedule</span>
                </Link>
              </Button>
              <Button variant="outline" className="h-auto flex-col p-4" asChild>
                <Link href="/parent/reports">
                  <BookOpen className="mb-2 h-6 w-6" />
                  <span>Progress Reports</span>
                </Link>
              </Button>
              <Button variant="outline" className="h-auto flex-col p-4" asChild>
                <Link href="/parent/messages">
                  <MessageSquare className="mb-2 h-6 w-6" />
                  <span>Messages</span>
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Events */}
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Events</CardTitle>
          <CardDescription>
            Important dates and events for your children
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                title: "Parent-Teacher Meeting",
                date: "Tomorrow, 2:00 PM",
                child: "Omar Ahmed",
              },
              {
                title: "Quran Competition",
                date: "Oct 25, 2024",
                child: "Aisha Ahmed",
              },
              {
                title: "Midterm Exams",
                date: "Nov 1-5, 2024",
                child: "All Children",
              },
              {
                title: "Eid al-Fitr Holiday",
                date: "Apr 10-15, 2025",
                child: "School Break",
              },
            ].map((event, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded-lg border border-gray-200 p-4 dark:border-gray-700"
              >
                <div className="flex items-center space-x-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900/30">
                    <Calendar className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <h4 className="font-medium">{event.title}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {event.child} • {event.date}
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
