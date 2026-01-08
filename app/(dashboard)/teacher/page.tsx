// src/app/(dashboard)/teacher/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import {
  BookOpen,
  Users,
  Calendar,
  FileText,
  TrendingUp,
  Clock,
  CheckCircle,
  MessageSquare,
  Bell,
  BarChart3,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { toast } from "sonner";
import Link from "next/link";

// Types based on our Prisma schema
interface Class {
  id: string;
  name: string;
  code: string;
  level: string;
  currentEnrollment: number;
  capacity: number;
  schedule: ClassSchedule[];
}

interface ClassSchedule {
  id: string;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  isLive: boolean;
  meetingPlatform?: string;
  meetingUrl?: string;
}

interface Student {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  attendanceRate: number;
  lastActive: string;
}

interface Assignment {
  id: string;
  title: string;
  subject: string;
  dueDate: string;
  totalSubmissions: number;
  totalStudents: number;
  status: "pending" | "graded" | "overdue";
}

interface UpcomingClass {
  id: string;
  className: string;
  time: string;
  duration: string;
  students: number;
  isLive: boolean;
}

export default function TeacherDashboardPage() {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    totalClasses: 0,
    totalStudents: 0,
    attendanceRate: 0,
    assignmentsPending: 0,
  });
  const [classes, setClasses] = useState<Class[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [upcomingClasses, setUpcomingClasses] = useState<UpcomingClass[]>([]);
  const [attendanceData, setAttendanceData] = useState<any[]>([]);

  useEffect(() => {
    fetchTeacherData();
  }, []);

  const fetchTeacherData = async () => {
    try {
      setIsLoading(true);

      // Fetch all teacher data
      const [
        statsRes,
        classesRes,
        studentsRes,
        assignmentsRes,
        upcomingRes,
        attendanceRes,
      ] = await Promise.all([
        fetch("/api/teacher/stats"),
        fetch("/api/teacher/classes"),
        fetch("/api/teacher/students"),
        fetch("/api/teacher/assignments"),
        fetch("/api/teacher/schedule/upcoming"),
        fetch("/api/teacher/attendance/stats"),
      ]);

      if (statsRes.ok) setStats(await statsRes.json());
      if (classesRes.ok) setClasses(await classesRes.json());
      if (studentsRes.ok) setStudents(await studentsRes.json());
      if (assignmentsRes.ok) setAssignments(await assignmentsRes.json());
      if (upcomingRes.ok) setUpcomingClasses(await upcomingRes.json());
      if (attendanceRes.ok) setAttendanceData(await attendanceRes.json());
    } catch (error) {
      toast.error("Failed to load data", {
        description: "Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getDayName = (dayIndex: number) => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return days[dayIndex];
  };

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(":");
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? "PM" : "AM";
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-purple-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Welcome back, {session?.user?.name}!
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Here&apos;s what&apos;s happening with your classes today
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" className="gap-2">
            <Bell className="h-4 w-4" />
            Notifications
          </Button>
          <Button className="bg-gradient-primary gap-2">
            <MessageSquare className="h-4 w-4" />
            Messages
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Total Classes
                </p>
                <p className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
                  {stats.totalClasses}
                </p>
                <p className="mt-1 text-sm text-green-600 dark:text-green-400">
                  +2 this month
                </p>
              </div>
              <div className="rounded-lg bg-purple-100 p-3 dark:bg-purple-900/30">
                <BookOpen className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Total Students
                </p>
                <p className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
                  {stats.totalStudents}
                </p>
                <p className="mt-1 text-sm text-green-600 dark:text-green-400">
                  +12 this month
                </p>
              </div>
              <div className="rounded-lg bg-blue-100 p-3 dark:bg-blue-900/30">
                <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Attendance Rate
                </p>
                <p className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
                  {stats.attendanceRate}%
                </p>
                <p className="mt-1 text-sm text-green-600 dark:text-green-400">
                  +5% from last week
                </p>
              </div>
              <div className="rounded-lg bg-green-100 p-3 dark:bg-green-900/30">
                <TrendingUp className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Assignments Pending
                </p>
                <p className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
                  {stats.assignmentsPending}
                </p>
                <p className="mt-1 text-sm text-yellow-600 dark:text-yellow-400">
                  Need grading
                </p>
              </div>
              <div className="rounded-lg bg-yellow-100 p-3 dark:bg-yellow-900/30">
                <FileText className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column - Upcoming Classes & Students */}
        <div className="space-y-6">
          {/* Upcoming Classes */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Upcoming Classes</CardTitle>
                  <CardDescription>Today&apos;s schedule</CardDescription>
                </div>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/teacher/schedule">View All</Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingClasses.length > 0 ? (
                  upcomingClasses.map((classItem) => (
                    <div
                      key={classItem.id}
                      className="flex items-center justify-between rounded-lg border border-gray-200 p-4 dark:border-gray-700"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-semibold">
                            {classItem.className}
                          </h3>
                          {classItem.isLive && (
                            <Badge variant="destructive" className="text-xs">
                              LIVE
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {classItem.time} ({classItem.duration})
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            {classItem.students} students
                          </div>
                        </div>
                      </div>
                      <Button size="sm" variant="outline">
                        Start
                      </Button>
                    </div>
                  ))
                ) : (
                  <div className="py-8 text-center">
                    <Calendar className="mx-auto h-12 w-12 text-gray-300" />
                    <p className="mt-2 text-gray-500">
                      No classes scheduled for today
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Recent Students */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Recent Students</CardTitle>
                  <CardDescription>Recently active students</CardDescription>
                </div>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/teacher/students">View All</Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {students.slice(0, 5).map((student) => (
                  <div
                    key={student.id}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarImage src={student.avatar} />
                        <AvatarFallback className="bg-gradient-primary text-white">
                          {student.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{student.name}</p>
                        <div className="flex items-center space-x-2">
                          <Progress
                            value={student.attendanceRate}
                            className="h-2 w-24"
                          />
                          <span className="text-xs text-gray-500">
                            {student.attendanceRate}%
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-sm text-gray-500">
                      {student.lastActive}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Middle Column - Attendance & Assignments */}
        <div className="space-y-6">
          {/* Attendance Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Weekly Attendance</CardTitle>
              <CardDescription>Attendance rate by day</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={attendanceData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis
                      dataKey="day"
                      stroke="#9CA3AF"
                      tickFormatter={(value) => getDayName(value)}
                    />
                    <YAxis
                      stroke="#9CA3AF"
                      domain={[0, 100]}
                      tickFormatter={(value) => `${value}%`}
                    />
                    <Tooltip
                      formatter={(value) => [`${value}%`, "Attendance"]}
                      labelFormatter={(label) => getDayName(label)}
                      contentStyle={{
                        backgroundColor: "white",
                        border: "1px solid #E5E7EB",
                        borderRadius: "8px",
                      }}
                    />
                    <Bar
                      dataKey="attendance"
                      fill="#8b5cf6"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Assignments */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Recent Assignments</CardTitle>
                  <CardDescription>Need your attention</CardDescription>
                </div>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/teacher/assignments">View All</Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {assignments.length > 0 ? (
                  assignments.map((assignment) => (
                    <div
                      key={assignment.id}
                      className="flex items-center justify-between rounded-lg border border-gray-200 p-4 dark:border-gray-700"
                    >
                      <div className="space-y-1">
                        <h3 className="font-semibold">{assignment.title}</h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                          <span>{assignment.subject}</span>
                          <span>Due: {assignment.dueDate}</span>
                          <span>
                            {assignment.totalSubmissions}/
                            {assignment.totalStudents} submitted
                          </span>
                        </div>
                        <div className="mt-2">
                          <Progress
                            value={
                              (assignment.totalSubmissions /
                                assignment.totalStudents) *
                              100
                            }
                            className="h-2"
                          />
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge
                          variant={
                            assignment.status === "pending"
                              ? "default"
                              : assignment.status === "graded"
                              ? "secondary"
                              : "destructive"
                          }
                        >
                          {assignment.status}
                        </Badge>
                        <Button size="sm" variant="outline" asChild>
                          <Link href={`/teacher/assignments/${assignment.id}`}>
                            Grade
                          </Link>
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="py-8 text-center">
                    <FileText className="mx-auto h-12 w-12 text-gray-300" />
                    <p className="mt-2 text-gray-500">No assignments pending</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Quick Actions & Notifications */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                <Button
                  className="h-auto flex-col gap-2 p-4"
                  variant="outline"
                  asChild
                >
                  <Link href="/teacher/attendance/mark">
                    <CheckCircle className="h-6 w-6" />
                    <span>Mark Attendance</span>
                  </Link>
                </Button>
                <Button
                  className="h-auto flex-col gap-2 p-4"
                  variant="outline"
                  asChild
                >
                  <Link href="/teacher/assignments/create">
                    <FileText className="h-6 w-6" />
                    <span>Create Assignment</span>
                  </Link>
                </Button>
                <Button
                  className="h-auto flex-col gap-2 p-4"
                  variant="outline"
                  asChild
                >
                  <Link href="/teacher/grades">
                    <BarChart3 className="h-6 w-6" />
                    <span>Enter Grades</span>
                  </Link>
                </Button>
                <Button
                  className="h-auto flex-col gap-2 p-4"
                  variant="outline"
                  asChild
                >
                  <Link href="/teacher/schedule">
                    <Calendar className="h-6 w-6" />
                    <span>View Schedule</span>
                  </Link>
                </Button>
                <Button
                  className="h-auto flex-col gap-2 p-4"
                  variant="outline"
                  asChild
                >
                  <Link href="/teacher/communication">
                    <MessageSquare className="h-6 w-6" />
                    <span>Send Message</span>
                  </Link>
                </Button>
                <Button
                  className="h-auto flex-col gap-2 p-4"
                  variant="outline"
                  asChild
                >
                  <Link href="/teacher/resources">
                    <BookOpen className="h-6 w-6" />
                    <span>Add Resources</span>
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Class Performance */}
          <Card>
            <CardHeader>
              <CardTitle>Class Performance</CardTitle>
              <CardDescription>Top performing classes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {classes.slice(0, 3).map((classItem) => (
                  <div key={classItem.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">{classItem.name}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {classItem.code} • {classItem.level}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-green-600">
                          {Math.round(
                            (classItem.currentEnrollment / classItem.capacity) *
                              100
                          )}
                          %
                        </p>
                        <p className="text-xs text-gray-500">
                          {classItem.currentEnrollment}/{classItem.capacity}
                        </p>
                      </div>
                    </div>
                    <Progress
                      value={
                        (classItem.currentEnrollment / classItem.capacity) * 100
                      }
                      className="h-2"
                    />
                  </div>
                ))}
              </div>
              <Button variant="ghost" className="mt-4 w-full" asChild>
                <Link href="/teacher/classes">View All Classes</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
