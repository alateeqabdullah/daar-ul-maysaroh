// src/app/(dashboard)/teacher/classes/[id]/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import {
  BookOpen,
  Users,
  Calendar,
  BarChart3,
  FileText,

  ArrowLeft,
  Eye,
  MessageSquare,
  Download,
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";

export default function ClassDetailPage() {
  const params = useParams();
  const classId = params.id;
  const [classData, setClassData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchClassData();
  }, [classId]);

  const fetchClassData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/teacher/classes/${classId}`);
      if (response.ok) {
        const data = await response.json();
        setClassData(data);
      }
    } catch (error) {
      console.error("Failed to fetch class data");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-purple-500 border-t-transparent"></div>
      </div>
    );
  }

  if (!classData) {
    return (
      <div className="py-12 text-center">
        <BookOpen className="mx-auto h-12 w-12 text-gray-300" />
        <h3 className="mt-4 text-lg font-semibold">Class not found</h3>
        <Button className="mt-4" asChild>
          <Link href="/teacher/classes">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Classes
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/teacher/classes">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {classData.name}
            </h1>
            <div className="mt-2 flex items-center space-x-4">
              <Badge variant="outline">{classData.code}</Badge>
              <Badge className="bg-gradient-primary text-white">
                {classData.level}
              </Badge>
              <span className="text-gray-600 dark:text-gray-400">
                {classData.currentEnrollment}/{classData.capacity} students
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button className="bg-gradient-primary gap-2">
            <MessageSquare className="h-4 w-4" />
            Message Class
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-6 sm:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-sm font-medium text-gray-600">
                Attendance Rate
              </p>
              <p className="mt-2 text-2xl font-bold text-green-600">92%</p>
              <Progress value={92} className="mt-2" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-sm font-medium text-gray-600">
                Avg Performance
              </p>
              <p className="mt-2 text-2xl font-bold text-blue-600">85%</p>
              <Progress value={85} className="mt-2" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-sm font-medium text-gray-600">Assignments</p>
              <p className="mt-2 text-2xl font-bold text-purple-600">12</p>
              <p className="mt-1 text-sm text-gray-500">3 pending</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-sm font-medium text-gray-600">Resources</p>
              <p className="mt-2 text-2xl font-bold text-yellow-600">24</p>
              <p className="mt-1 text-sm text-gray-500">Files & videos</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="students">Students</TabsTrigger>
          <TabsTrigger value="assignments">Assignments</TabsTrigger>
          <TabsTrigger value="schedule">Schedule</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Class Information</CardTitle>
                <CardDescription>Basic class details</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Description
                    </p>
                    <p className="mt-1">
                      {classData.description || "No description provided."}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Academic Year
                    </p>
                    <p className="mt-1">
                      {classData.academicYear || "2024-2025"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Term</p>
                    <p className="mt-1">{classData.term || "Fall 2024"}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest class activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="rounded-lg bg-gray-100 p-2 dark:bg-gray-800">
                          <FileText className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="font-medium">New assignment posted</p>
                          <p className="text-sm text-gray-500">2 hours ago</p>
                        </div>
                      </div>
                      <Button size="sm" variant="ghost">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="students">
          <Card>
            <CardHeader>
              <CardTitle>Class Students</CardTitle>
              <CardDescription>
                {classData.currentEnrollment} enrolled students
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-gray-50 dark:bg-gray-800">
                      <th className="px-6 py-3 text-left text-sm font-semibold">
                        Student
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold">
                        Attendance
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold">
                        Performance
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {/* Student rows would be populated from API */}
                    <tr>
                      <td
                        colSpan={5}
                        className="px-6 py-8 text-center text-gray-500"
                      >
                        Student data loading...
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Quick Links */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks for this class</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-4">
            <Button
              variant="outline"
              className="h-auto flex-col gap-2 p-4"
              asChild
            >
              <Link href={`/teacher/classes/${classId}/attendance`}>
                <Users className="h-6 w-6" />
                <span>Take Attendance</span>
              </Link>
            </Button>
            <Button
              variant="outline"
              className="h-auto flex-col gap-2 p-4"
              asChild
            >
              <Link href={`/teacher/assignments/create?class=${classId}`}>
                <FileText className="h-6 w-6" />
                <span>Create Assignment</span>
              </Link>
            </Button>
            <Button
              variant="outline"
              className="h-auto flex-col gap-2 p-4"
              asChild
            >
              <Link href={`/teacher/classes/${classId}/schedule`}>
                <Calendar className="h-6 w-6" />
                <span>View Schedule</span>
              </Link>
            </Button>
            <Button
              variant="outline"
              className="h-auto flex-col gap-2 p-4"
              asChild
            >
              <Link href={`/teacher/classes/${classId}/grades`}>
                <BarChart3 className="h-6 w-6" />
                <span>Enter Grades</span>
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
