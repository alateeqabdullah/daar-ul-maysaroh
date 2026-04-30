// src/app/(dashboard)/student/classes/[classId]/page.tsx - UPDATED
"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Video,
  FileText,
  Users,
  Calendar,
  MessageSquare,
  BookOpen,
  Download,
  Share2,
  Star,
  Clock,
  AlertCircle,
  MoreVertical,
  BarChart3,
  Book,
  Filter,
  Search,
  Eye,
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
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getInitials } from "@/lib/utils";
import { toast } from "sonner";

interface ClassData {
  id: string;
  name: string;
  code: string;
  description: string;
  teacher: {
    id: string;
    name: string;
    email: string;
    avatar: string;
    qualification: string;
    specialization: string;
    bio: string;
  };
  schedule: Array<{
    day: string;
    time: string;
    type: string;
    platform: string;
  }>;
  progress: {
    overall: number;
    attendance: number;
    assignments: number;
    participation: number;
  };
  materials: Array<{
    id: string;
    name: string;
    type: string;
    size: string;
    uploaded: string;
    downloads: number;
  }>;
  assignments: Array<{
    id: string;
    title: string;
    dueDate: string;
    status: string;
    progress: number;
  }>;
  announcements: Array<{
    id: string;
    title: string;
    content: string;
    date: string;
  }>;
  classmates: Array<{
    id: string;
    name: string;
    avatar: string;
    progress: number;
  }>;
}

export default function ClassDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [classData, setClassData] = useState<ClassData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchClassData();
  }, [params.classId]);

  const fetchClassData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch(`/api/student/classes/${params.classId}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch class data");
      }

      setClassData(data);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Failed to load class data"
      );
      toast.error("Error", {
        description: "Failed to load class data. Please try again.",
      });
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

  if (error || !classData) {
    return (
      <div className="flex h-64 flex-col items-center justify-center">
        <AlertCircle className="h-12 w-12 text-red-500" />
        <h3 className="mt-4 text-lg font-semibold">Error Loading Class</h3>
        <p className="mt-2 text-gray-600">{error || "Class not found"}</p>
        <Button
          className="mt-4"
          onClick={() => router.push("/student/classes")}
        >
          Back to Classes
        </Button>
      </div>
    );
  }

  const filteredMaterials = classData.materials.filter((material) =>
    material.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredClassmates = classData.classmates.filter((classmate) =>
    classmate.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header with Back Button */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.back()}
            className="rounded-full"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {classData.name}
            </h1>
            <div className="mt-2 flex items-center space-x-4">
              <Badge variant="outline" className="gap-1">
                <BookOpen className="h-3 w-3" />
                {classData.code}
              </Badge>
              <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                Active
              </Badge>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {classData.schedule.length} sessions/week
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" className="gap-2">
            <Share2 className="h-4 w-4" />
            Share
          </Button>
          <Button className="bg-gradient-primary gap-2">
            <Video className="h-4 w-4" />
            Join Next Class
          </Button>
        </div>
      </div>

      {/* Class Description */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-gray-700 dark:text-gray-300">
                {classData.description}
              </p>
              <div className="mt-4 flex flex-wrap gap-4">
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <Calendar className="mr-2 h-4 w-4" />
                  {classData.schedule[0]?.day} & {classData.schedule[1]?.day}
                </div>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <Clock className="mr-2 h-4 w-4" />
                  {classData.schedule[0]?.time}
                </div>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <Video className="mr-2 h-4 w-4" />
                  Live on {classData.schedule[0]?.platform || "Zoom"}
                </div>
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Add to Calendar</DropdownMenuItem>
                <DropdownMenuItem>Set Reminders</DropdownMenuItem>
                <DropdownMenuItem>Class Settings</DropdownMenuItem>
                <DropdownMenuItem className="text-red-600">
                  Leave Class
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column - Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Tabs Navigation */}
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="materials">Materials</TabsTrigger>
              <TabsTrigger value="assignments">Assignments</TabsTrigger>
              <TabsTrigger value="announcements">Announcements</TabsTrigger>
              <TabsTrigger value="classmates">Classmates</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6 pt-6">
              {/* Progress Stats */}
              <Card>
                <CardHeader>
                  <CardTitle>Your Progress</CardTitle>
                  <CardDescription>
                    Track your performance in this class
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <div className="mb-4 flex items-center justify-between">
                        <span className="text-sm font-medium">
                          Overall Progress
                        </span>
                        <span className="font-bold text-purple-600">
                          {classData.progress.overall}%
                        </span>
                      </div>
                      <Progress
                        value={classData.progress.overall}
                        className="h-3"
                      />
                    </div>
                    <div>
                      <div className="mb-4 flex items-center justify-between">
                        <span className="text-sm font-medium">Attendance</span>
                        <span className="font-bold text-green-600">
                          {classData.progress.attendance}%
                        </span>
                      </div>
                      <Progress
                        value={classData.progress.attendance}
                        className="h-3"
                      />
                    </div>
                    <div>
                      <div className="mb-4 flex items-center justify-between">
                        <span className="text-sm font-medium">Assignments</span>
                        <span className="font-bold text-blue-600">
                          {classData.progress.assignments}%
                        </span>
                      </div>
                      <Progress
                        value={classData.progress.assignments}
                        className="h-3"
                      />
                    </div>
                    <div>
                      <div className="mb-4 flex items-center justify-between">
                        <span className="text-sm font-medium">
                          Participation
                        </span>
                        <span className="font-bold text-yellow-600">
                          {classData.progress.participation}%
                        </span>
                      </div>
                      <Progress
                        value={classData.progress.participation}
                        className="h-3"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Class Schedule */}
              <Card>
                <CardHeader>
                  <CardTitle>Class Schedule</CardTitle>
                  <CardDescription>
                    Weekly class timings and links
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {classData.schedule.map((session, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between rounded-lg border border-gray-200 p-4 dark:border-gray-700"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="rounded-lg bg-purple-100 p-3 dark:bg-purple-900/30">
                            <Calendar className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                          </div>
                          <div>
                            <h4 className="font-medium">{session.day}</h4>
                            <div className="mt-1 flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                              <span className="flex items-center">
                                <Clock className="mr-1 h-3 w-3" />
                                {session.time}
                              </span>
                              <span className="flex items-center">
                                <Video className="mr-1 h-3 w-3" />
                                {session.type === "live"
                                  ? "Live Session"
                                  : "Recorded"}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Badge
                            className={
                              session.type === "live"
                                ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                                : "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400"
                            }
                          >
                            {session.type === "live" ? "Live Now" : "Upcoming"}
                          </Badge>
                          <Button size="sm" asChild>
                            <Link
                              href={`/student/classes/${params.classId}/join`}
                            >
                              Join Class
                            </Link>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Materials Tab */}
            <TabsContent value="materials" className="space-y-6 pt-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Class Materials</CardTitle>
                      <CardDescription>
                        Study resources and documents
                      </CardDescription>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                        <Input
                          placeholder="Search materials..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-64 pl-10"
                        />
                      </div>
                      <Button variant="outline">
                        <Filter className="mr-2 h-4 w-4" />
                        Filter
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {filteredMaterials.length === 0 ? (
                      <div className="py-12 text-center">
                        <FileText className="mx-auto h-12 w-12 text-gray-300" />
                        <h3 className="mt-4 text-lg font-semibold">
                          No materials found
                        </h3>
                        <p className="mt-2 text-gray-500">
                          No materials match your search criteria
                        </p>
                      </div>
                    ) : (
                      filteredMaterials.map((material) => (
                        <div
                          key={material.id}
                          className="flex items-center justify-between rounded-lg border border-gray-200 p-4 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
                        >
                          <div className="flex items-center space-x-4">
                            <div
                              className={`rounded-lg p-3 ${
                                material.type === "pdf"
                                  ? "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
                                  : material.type === "video"
                                  ? "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                                  : "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
                              }`}
                            >
                              <FileText className="h-6 w-6" />
                            </div>
                            <div>
                              <h4 className="font-medium">{material.name}</h4>
                              <div className="mt-1 flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                                <span className="capitalize">
                                  {material.type}
                                </span>
                                <span>•</span>
                                <span>{material.size}</span>
                                <span>•</span>
                                <span>Uploaded {material.uploaded}</span>
                                <span>•</span>
                                <span>{material.downloads} downloads</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button size="sm" variant="outline">
                              <Eye className="mr-2 h-4 w-4" />
                              Preview
                            </Button>
                            <Button size="sm" variant="outline">
                              <Download className="mr-2 h-4 w-4" />
                              Download
                            </Button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Assignments Tab */}
            <TabsContent value="assignments" className="space-y-6 pt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Class Assignments</CardTitle>
                  <CardDescription>
                    Tasks and submissions for this class
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {classData.assignments.map((assignment) => (
                      <div
                        key={assignment.id}
                        className="rounded-lg border border-gray-200 p-6 dark:border-gray-700"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3">
                              <div className="rounded-lg bg-blue-100 p-2 dark:bg-blue-900/30">
                                <Book className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                              </div>
                              <div>
                                <h4 className="font-medium">
                                  {assignment.title}
                                </h4>
                                <div className="mt-1 flex items-center space-x-3">
                                  <Badge
                                    variant={
                                      assignment.status === "pending"
                                        ? "destructive"
                                        : assignment.status === "submitted"
                                        ? "default"
                                        : "secondary"
                                    }
                                  >
                                    {assignment.status === "pending"
                                      ? "Pending"
                                      : assignment.status === "submitted"
                                      ? "Submitted"
                                      : "Graded"}
                                  </Badge>
                                  <span className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                                    <Clock className="mr-1 h-3 w-3" />
                                    Due {assignment.dueDate}
                                  </span>
                                </div>
                              </div>
                            </div>

                            <div className="mt-6">
                              <div className="mb-2 flex items-center justify-between text-sm">
                                <span>Progress</span>
                                <span className="font-medium">
                                  {assignment.progress}%
                                </span>
                              </div>
                              <Progress
                                value={assignment.progress}
                                className="h-2"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="mt-6 flex space-x-3">
                          {assignment.status === "pending" && (
                            <Button size="sm" asChild>
                              <Link
                                href={`/student/assignments/${assignment.id}`}
                              >
                                Start Assignment
                              </Link>
                            </Button>
                          )}
                          {assignment.status === "submitted" && (
                            <Button size="sm" variant="outline">
                              View Submission
                            </Button>
                          )}
                          <Button size="sm" variant="outline" asChild>
                            <Link
                              href={`/student/assignments/${assignment.id}/instructions`}
                            >
                              View Instructions
                            </Link>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Announcements Tab */}
            <TabsContent value="announcements" className="space-y-6 pt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Class Announcements</CardTitle>
                  <CardDescription>
                    Important updates from your teacher
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {classData.announcements.map((announcement) => (
                      <div
                        key={announcement.id}
                        className="rounded-lg border border-gray-200 p-6 dark:border-gray-700"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3">
                              <div className="rounded-full bg-purple-100 p-2 dark:bg-purple-900/30">
                                <AlertCircle className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                              </div>
                              <div>
                                <h4 className="font-medium">
                                  {announcement.title}
                                </h4>
                                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                                  {announcement.content}
                                </p>
                                <div className="mt-4 flex items-center space-x-4 text-sm text-gray-500">
                                  <span>Posted {announcement.date}</span>
                                  <span>•</span>
                                  <span>By {classData.teacher.name}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Classmates Tab */}
            <TabsContent value="classmates" className="space-y-6 pt-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Classmates</CardTitle>
                      <CardDescription>
                        Students enrolled in this class
                      </CardDescription>
                    </div>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                      <Input
                        placeholder="Search classmates..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-64 pl-10"
                      />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {filteredClassmates.length === 0 ? (
                      <div className="py-12 text-center">
                        <Users className="mx-auto h-12 w-12 text-gray-300" />
                        <h3 className="mt-4 text-lg font-semibold">
                          No classmates found
                        </h3>
                        <p className="mt-2 text-gray-500">
                          No classmates match your search criteria
                        </p>
                      </div>
                    ) : (
                      filteredClassmates.map((classmate) => (
                        <div
                          key={classmate.id}
                          className="flex items-center justify-between rounded-lg border border-gray-200 p-4 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
                        >
                          <div className="flex items-center space-x-4">
                            <Avatar>
                              <AvatarImage src={classmate.avatar} />
                              <AvatarFallback className="bg-gradient-primary text-white">
                                {getInitials(classmate.name)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <h4 className="font-medium">{classmate.name}</h4>
                              <div className="mt-1 flex items-center space-x-3">
                                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                                  <BarChart3 className="mr-1 h-3 w-3" />
                                  Progress: {classmate.progress}%
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button size="sm" variant="outline">
                              <MessageSquare className="mr-2 h-4 w-4" />
                              Message
                            </Button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Right Column - Teacher Info & Quick Stats */}
        <div className="space-y-6">
          {/* Teacher Profile */}
          <Card>
            <CardHeader>
              <CardTitle>Your Teacher</CardTitle>
              <CardDescription>Instructor for this class</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-16 w-16 border-2 border-purple-200 dark:border-purple-800">
                    <AvatarImage src={classData.teacher.avatar} />
                    <AvatarFallback className="bg-gradient-primary text-xl text-white">
                      {getInitials(classData.teacher.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">{classData.teacher.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {classData.teacher.email}
                    </p>
                    <div className="mt-1">
                      <Badge
                        variant="outline"
                        className="bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400"
                      >
                        <Star className="mr-1 h-3 w-3" />
                        Teacher
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <h4 className="text-sm font-medium">Qualification</h4>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                      {classData.teacher.qualification || "Not specified"}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">Specialization</h4>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                      {classData.teacher.specialization || "Not specified"}
                    </p>
                  </div>
                  {classData.teacher.bio && (
                    <div>
                      <h4 className="text-sm font-medium">About</h4>
                      <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        {classData.teacher.bio}
                      </p>
                    </div>
                  )}
                </div>

                <div className="pt-4">
                  <div className="grid grid-cols-2 gap-3">
                    <Button size="sm" asChild>
                      <Link href={`/student/teacher/${classData.teacher.id}`}>
                        View Profile
                      </Link>
                    </Button>
                    <Button size="sm" variant="outline">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Message
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Class Statistics */}
          <Card>
            <CardHeader>
              <CardTitle>Class Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-gray-400" />
                    <span className="text-sm">Total Students</span>
                  </div>
                  <span className="font-medium">
                    {classData.classmates.length + 1}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <FileText className="h-4 w-4 text-gray-400" />
                    <span className="text-sm">Materials</span>
                  </div>
                  <span className="font-medium">
                    {classData.materials.length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Book className="h-4 w-4 text-gray-400" />
                    <span className="text-sm">Active Assignments</span>
                  </div>
                  <span className="font-medium">
                    {classData.assignments.length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <BarChart3 className="h-4 w-4 text-gray-400" />
                    <span className="text-sm">Your Progress</span>
                  </div>
                  <span className="font-medium text-green-600">
                    {classData.progress.overall}%
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
