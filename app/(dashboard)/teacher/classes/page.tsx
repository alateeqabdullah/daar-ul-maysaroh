// src/app/(dashboard)/teacher/classes/page.tsx
"use client";

import { useState, useEffect } from "react";
import {
  Search,
  Plus,
  Users,
  Calendar,
  Video,
  MoreVertical,
  BookOpen,
  BarChart3,
  FileText,
  Download,
  Eye,
  TrendingUp,
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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

interface Class {
  id: string;
  name: string;
  code: string;
  level: string;
  description?: string;
  currentEnrollment: number;
  capacity: number;
  schedule: ClassSchedule[];
  teacher: {
    name: string;
    email: string;
  };
  subjects: Subject[];
  attendanceRate: number;
  performance: number;
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

interface Subject {
  id: string;
  name: string;
  code: string;
}

export default function TeacherClassesPage() {
  const [classes, setClasses] = useState<Class[]>([]);
  const [filteredClasses, setFilteredClasses] = useState<Class[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("ALL");
  const [selectedTab, setSelectedTab] = useState("all");

  useEffect(() => {
    fetchClasses();
  }, []);

  useEffect(() => {
    filterClasses();
  }, [searchQuery, selectedLevel, selectedTab, classes]);

  const fetchClasses = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/teacher/classes");
      if (response.ok) {
        const data = await response.json();
        setClasses(data);
      }
    } catch (error) {
      toast.error("Failed to load classes");
    } finally {
      setIsLoading(false);
    }
  };

  const filterClasses = () => {
    let filtered = [...classes];

    // Filter by search
    if (searchQuery) {
      filtered = filtered.filter(
        (cls) =>
          cls.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          cls.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
          cls.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by level
    if (selectedLevel !== "ALL") {
      filtered = filtered.filter((cls) => cls.level === selectedLevel);
    }

    // Filter by tab
    if (selectedTab === "active") {
      filtered = filtered.filter((cls) => cls.currentEnrollment > 0);
    } else if (selectedTab === "full") {
      filtered = filtered.filter(
        (cls) => cls.currentEnrollment >= cls.capacity
      );
    }

    setFilteredClasses(filtered);
  };

  const getDayName = (dayIndex: number) => {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    return days[dayIndex];
  };

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(":");
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? "PM" : "AM";
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const getLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case "beginner":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300";
      case "intermediate":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300";
      case "advanced":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300";
    }
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
            My Classes
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Manage and monitor all your assigned classes
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button className="bg-gradient-primary gap-2">
            <Plus className="h-4 w-4" />
            Add Class
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
                  Total Classes
                </p>
                <p className="mt-2 text-2xl font-bold text-purple-600">
                  {classes.length}
                </p>
              </div>
              <div className="rounded-lg bg-purple-100 p-3">
                <BookOpen className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Students
                </p>
                <p className="mt-2 text-2xl font-bold text-blue-600">
                  {classes.reduce((sum, cls) => sum + cls.currentEnrollment, 0)}
                </p>
              </div>
              <div className="rounded-lg bg-blue-100 p-3">
                <Users className="h-6 w-6 text-blue-600" />
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
                <p className="mt-2 text-2xl font-bold text-green-600">
                  {Math.round(
                    classes.reduce((sum, cls) => sum + cls.attendanceRate, 0) /
                      classes.length
                  )}
                  %
                </p>
              </div>
              <div className="rounded-lg bg-green-100 p-3">
                <BarChart3 className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Avg Performance
                </p>
                <p className="mt-2 text-2xl font-bold text-yellow-600">
                  {Math.round(
                    classes.reduce((sum, cls) => sum + cls.performance, 0) /
                      classes.length
                  )}
                  %
                </p>
              </div>
              <div className="rounded-lg bg-yellow-100 p-3">
                <TrendingUp className="h-6 w-6 text-yellow-600" />
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
                Search Classes
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search by name, code, or description..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium">Level</label>
              <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                <SelectTrigger>
                  <SelectValue placeholder="All Levels" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">All Levels</SelectItem>
                  <SelectItem value="BEGINNER">Beginner</SelectItem>
                  <SelectItem value="INTERMEDIATE">Intermediate</SelectItem>
                  <SelectItem value="ADVANCED">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium">Sort By</label>
              <Select defaultValue="name">
                <SelectTrigger>
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="enrollment">Enrollment</SelectItem>
                  <SelectItem value="performance">Performance</SelectItem>
                  <SelectItem value="attendance">Attendance</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs defaultValue="all" onValueChange={setSelectedTab}>
        <TabsList>
          <TabsTrigger value="all">All Classes ({classes.length})</TabsTrigger>
          <TabsTrigger value="active">
            Active ({classes.filter((c) => c.currentEnrollment > 0).length})
          </TabsTrigger>
          <TabsTrigger value="full">
            Full (
            {classes.filter((c) => c.currentEnrollment >= c.capacity).length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value={selectedTab} className="space-y-4">
          {filteredClasses.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <BookOpen className="mx-auto h-12 w-12 text-gray-300" />
                <h3 className="mt-4 text-lg font-semibold">No classes found</h3>
                <p className="mt-2 text-gray-500">
                  {searchQuery || selectedLevel !== "ALL"
                    ? "Try adjusting your search filters"
                    : "No classes assigned yet"}
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredClasses.map((classItem) => (
                <Card key={classItem.id} className="overflow-hidden">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center space-x-2">
                          <CardTitle className="text-lg">
                            {classItem.name}
                          </CardTitle>
                          <Badge className={getLevelColor(classItem.level)}>
                            {classItem.level}
                          </Badge>
                        </div>
                        <CardDescription className="mt-1">
                          {classItem.code}
                        </CardDescription>
                        {classItem.description && (
                          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                            {classItem.description}
                          </p>
                        )}
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link href={`/teacher/classes/${classItem.id}`}>
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link
                              href={`/teacher/classes/${classItem.id}/attendance`}
                            >
                              <Users className="mr-2 h-4 w-4" />
                              Attendance
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link
                              href={`/teacher/classes/${classItem.id}/assignments`}
                            >
                              <FileText className="mr-2 h-4 w-4" />
                              Assignments
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link
                              href={`/teacher/classes/${classItem.id}/students`}
                            >
                              <Users className="mr-2 h-4 w-4" />
                              Students
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link
                              href={`/teacher/classes/${classItem.id}/schedule`}
                            >
                              <Calendar className="mr-2 h-4 w-4" />
                              Schedule
                            </Link>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>

                  <CardContent>
                    {/* Stats */}
                    <div className="mb-4 grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-gray-600">
                          Enrollment
                        </p>
                        <div className="mt-1 flex items-center space-x-2">
                          <Progress
                            value={
                              (classItem.currentEnrollment /
                                classItem.capacity) *
                              100
                            }
                            className="h-2 flex-1"
                          />
                          <span className="text-sm font-medium">
                            {classItem.currentEnrollment}/{classItem.capacity}
                          </span>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600">
                          Attendance
                        </p>
                        <p className="mt-1 text-lg font-bold text-green-600">
                          {classItem.attendanceRate}%
                        </p>
                      </div>
                    </div>

                    {/* Schedule */}
                    <div className="mb-4">
                      <p className="mb-2 text-sm font-medium text-gray-600">
                        Schedule
                      </p>
                      <div className="space-y-2">
                        {classItem.schedule.map((schedule) => (
                          <div
                            key={schedule.id}
                            className="flex items-center justify-between text-sm"
                          >
                            <div className="flex items-center space-x-2">
                              <Calendar className="h-4 w-4 text-gray-400" />
                              <span>{getDayName(schedule.dayOfWeek)}</span>
                              <span>
                                {formatTime(schedule.startTime)} -{" "}
                                {formatTime(schedule.endTime)}
                              </span>
                            </div>
                            {schedule.isLive && (
                              <Badge variant="outline" className="gap-1">
                                <Video className="h-3 w-3" />
                                Live
                              </Badge>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Subjects */}
                    <div className="mb-4">
                      <p className="mb-2 text-sm font-medium text-gray-600">
                        Subjects
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {classItem.subjects.map((subject) => (
                          <Badge key={subject.id} variant="secondary">
                            {subject.name}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="grid grid-cols-2 gap-2">
                      <Button size="sm" variant="outline" asChild>
                        <Link
                          href={`/teacher/classes/${classItem.id}/students`}
                        >
                          <Users className="mr-2 h-4 w-4" />
                          Students
                        </Link>
                      </Button>
                      <Button size="sm" asChild>
                        <Link href={`/teacher/classes/${classItem.id}`}>
                          <Eye className="mr-2 h-4 w-4" />
                          View Class
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
