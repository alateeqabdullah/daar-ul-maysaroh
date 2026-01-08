// src/app/(dashboard)/teacher/students/page.tsx
"use client";

import { useState, useEffect } from "react";
import {
  Search,
  Mail,
  Phone,
  TrendingUp,
  MoreVertical,
  MessageSquare,
  Eye,
  FileText,
  UserCheck,
  AlertCircle,
  Download,
  Plus,
  Users,
  CheckCircle,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import Link from "next/link";

interface Student {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  class: {
    id: string;
    name: string;
    code: string;
  };
  enrollmentDate: string;
  attendanceRate: number;
  performance: number;
  hifzLevel?: string;
  tajweedLevel?: string;
  lastActive: string;
  status: "active" | "inactive" | "at-risk";
}

export default function TeacherStudentsPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedClass, setSelectedClass] = useState("ALL");
  const [selectedStatus, setSelectedStatus] = useState("ALL");
  const [classes, setClasses] = useState<string[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    filterStudents();
  }, [searchQuery, selectedClass, selectedStatus, students]);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const [studentsRes, classesRes] = await Promise.all([
        fetch("/api/teacher/students"),
        fetch("/api/teacher/classes"),
      ]);

      if (studentsRes.ok) {
        const studentsData = await studentsRes.json();
        setStudents(studentsData);
      }

      if (classesRes.ok) {
        const classesData = await classesRes.json();
        setClasses(["ALL", ...classesData.map((c: any) => c.name)]);
      }
    } catch (error) {
      toast.error("Failed to load data");
    } finally {
      setIsLoading(false);
    }
  };

  const filterStudents = () => {
    let filtered = [...students];

    // Filter by search
    if (searchQuery) {
      filtered = filtered.filter(
        (student) =>
          student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          student.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          student.phone?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by class
    if (selectedClass !== "ALL") {
      filtered = filtered.filter(
        (student) => student.class.name === selectedClass
      );
    }

    // Filter by status
    if (selectedStatus !== "ALL") {
      filtered = filtered.filter(
        (student) => student.status === selectedStatus
      );
    }

    setFilteredStudents(filtered);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
      case "inactive":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300";
      case "at-risk":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getLevelColor = (level?: string) => {
    if (!level) return "bg-gray-100 text-gray-800";

    if (level.toLowerCase().includes("beginner")) {
      return "bg-blue-100 text-blue-800";
    } else if (level.toLowerCase().includes("intermediate")) {
      return "bg-purple-100 text-purple-800";
    } else if (level.toLowerCase().includes("advanced")) {
      return "bg-green-100 text-green-800";
    }
    return "bg-gray-100 text-gray-800";
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
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Student Management
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Monitor and manage all your students
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button className="bg-gradient-primary gap-2">
            <Plus className="h-4 w-4" />
            Add Student
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-6 sm:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Students
                </p>
                <p className="mt-2 text-2xl font-bold text-purple-600">
                  {students.length}
                </p>
              </div>
              <div className="rounded-lg bg-purple-100 p-3">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Active Students
                </p>
                <p className="mt-2 text-2xl font-bold text-green-600">
                  {students.filter((s) => s.status === "active").length}
                </p>
              </div>
              <div className="rounded-lg bg-green-100 p-3">
                <UserCheck className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Avg Attendance
                </p>
                <p className="mt-2 text-2xl font-bold text-blue-600">
                  {Math.round(
                    students.reduce((sum, s) => sum + s.attendanceRate, 0) /
                      students.length
                  )}
                  %
                </p>
              </div>
              <div className="rounded-lg bg-blue-100 p-3">
                <TrendingUp className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">At Risk</p>
                <p className="mt-2 text-2xl font-bold text-red-600">
                  {students.filter((s) => s.status === "at-risk").length}
                </p>
              </div>
              <div className="rounded-lg bg-red-100 p-3">
                <AlertCircle className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="grid gap-4 md:grid-cols-4">
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium">
                Search Students
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search by name, email, or phone..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium">Class</label>
              <Select value={selectedClass} onValueChange={setSelectedClass}>
                <SelectTrigger>
                  <SelectValue placeholder="All Classes" />
                </SelectTrigger>
                <SelectContent>
                  {classes.map((className) => (
                    <SelectItem key={className} value={className}>
                      {className}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium">Status</label>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="at-risk">At Risk</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Students Table */}
      <Card>
        <CardHeader>
          <CardTitle>Students List</CardTitle>
          <CardDescription>
            Showing {filteredStudents.length} of {students.length} students
          </CardDescription>
        </CardHeader>
        <CardContent>
          {filteredStudents.length === 0 ? (
            <div className="py-12 text-center">
              <Users className="mx-auto h-12 w-12 text-gray-300" />
              <h3 className="mt-4 text-lg font-semibold">No students found</h3>
              <p className="mt-2 text-gray-500">
                {searchQuery ||
                selectedClass !== "ALL" ||
                selectedStatus !== "ALL"
                  ? "Try adjusting your search filters"
                  : "No students assigned to your classes"}
              </p>
            </div>
          ) : (
            <div className="overflow-hidden rounded-lg border">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-gray-50 dark:bg-gray-800">
                    <th className="px-6 py-3 text-left text-sm font-semibold">
                      Student
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">
                      Class
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">
                      Quran Level
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
                  {filteredStudents.map((student) => (
                    <tr
                      key={student.id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-800"
                    >
                      <td className="whitespace-nowrap px-6 py-4">
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
                            <div className="flex items-center space-x-2 text-sm text-gray-500">
                              <Mail className="h-3 w-3" />
                              <span>{student.email}</span>
                            </div>
                            {student.phone && (
                              <div className="flex items-center space-x-2 text-sm text-gray-500">
                                <Phone className="h-3 w-3" />
                                <span>{student.phone}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <div>
                          <p className="font-medium">{student.class.name}</p>
                          <p className="text-sm text-gray-500">
                            {student.class.code}
                          </p>
                          <p className="text-xs text-gray-400">
                            Since{" "}
                            {new Date(
                              student.enrollmentDate
                            ).toLocaleDateString()}
                          </p>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="space-y-1">
                          {student.hifzLevel && (
                            <Badge className={getLevelColor(student.hifzLevel)}>
                              Hifz: {student.hifzLevel}
                            </Badge>
                          )}
                          {student.tajweedLevel && (
                            <Badge
                              className={getLevelColor(student.tajweedLevel)}
                            >
                              Tajweed: {student.tajweedLevel}
                            </Badge>
                          )}
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <Progress
                              value={student.attendanceRate}
                              className="h-2 w-24"
                            />
                            <span className="text-sm font-medium">
                              {student.attendanceRate}%
                            </span>
                          </div>
                          <p className="text-xs text-gray-500">
                            Last active: {student.lastActive}
                          </p>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <Progress
                              value={student.performance}
                              className="h-2 w-24"
                            />
                            <span className="text-sm font-medium">
                              {student.performance}%
                            </span>
                          </div>
                          <p className="text-xs text-gray-500">
                            Overall performance
                          </p>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <Badge className={getStatusColor(student.status)}>
                          {student.status.toUpperCase()}
                        </Badge>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <Button size="sm" variant="ghost" asChild>
                            <Link href={`/teacher/students/${student.id}`}>
                              <Eye className="h-4 w-4" />
                            </Link>
                          </Button>
                          <Button size="sm" variant="ghost" asChild>
                            <Link
                              href={`/teacher/communication?student=${student.id}`}
                            >
                              <MessageSquare className="h-4 w-4" />
                            </Link>
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button size="sm" variant="ghost">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem asChild>
                                <Link
                                  href={`/teacher/students/${student.id}/progress`}
                                >
                                  <TrendingUp className="mr-2 h-4 w-4" />
                                  View Progress
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem asChild>
                                <Link
                                  href={`/teacher/students/${student.id}/attendance`}
                                >
                                  <UserCheck className="mr-2 h-4 w-4" />
                                  Attendance
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem asChild>
                                <Link
                                  href={`/teacher/students/${student.id}/grades`}
                                >
                                  <FileText className="mr-2 h-4 w-4" />
                                  Grades
                                </Link>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Student Groups */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Top Performing Students */}
        <Card>
          <CardHeader>
            <CardTitle>Top Performing Students</CardTitle>
            <CardDescription>Students with highest performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {students
                .sort((a, b) => b.performance - a.performance)
                .slice(0, 5)
                .map((student) => (
                  <div
                    key={student.id}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-3">
                      <Avatar>
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
                        <p className="text-sm text-gray-500">
                          {student.class.name}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-green-600">
                        {student.performance}%
                      </p>
                      <Badge className={getStatusColor(student.status)}>
                        {student.status}
                      </Badge>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>

        {/* Students Needing Attention */}
        <Card>
          <CardHeader>
            <CardTitle>Students Needing Attention</CardTitle>
            <CardDescription>Low attendance or performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {students
                .filter(
                  (s) =>
                    s.status === "at-risk" ||
                    s.attendanceRate < 70 ||
                    s.performance < 60
                )
                .slice(0, 5)
                .map((student) => (
                  <div
                    key={student.id}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarFallback className="bg-red-100 text-red-600">
                          {student.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{student.name}</p>
                        <div className="flex items-center space-x-4 text-sm">
                          <span className="text-red-600">
                            {student.attendanceRate}% attendance
                          </span>
                          <span className="text-yellow-600">
                            {student.performance}% performance
                          </span>
                        </div>
                      </div>
                    </div>
                    <Button size="sm" variant="outline" asChild>
                      <Link href={`/teacher/students/${student.id}`}>
                        Review
                      </Link>
                    </Button>
                  </div>
                ))}
              {students.filter((s) => s.status === "at-risk").length === 0 && (
                <div className="py-4 text-center">
                  <CheckCircle className="mx-auto h-8 w-8 text-green-400" />
                  <p className="mt-2 text-gray-500">
                    All students are doing well!
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
