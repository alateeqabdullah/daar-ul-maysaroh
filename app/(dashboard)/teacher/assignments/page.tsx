// src/app/(dashboard)/teacher/assignments/page.tsx
"use client";

import { useState, useEffect } from "react";
import {
  Search,
  Plus,
  FileText,
  Calendar,
  BookOpen,
  Users,
  CheckCircle,
  Clock,
  AlertCircle,
  Download,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  Share2,
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
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import Link from "next/link";
import { format } from "date-fns";

interface Assignment {
  id: string;
  title: string;
  description: string;
  subject: string;
  class: {
    id: string;
    name: string;
    code: string;
  };
  dueDate: string;
  totalMarks: number;
  submissions: number;
  totalStudents: number;
  status: "draft" | "published" | "grading" | "completed";
  createdAt: string;
  attachments: string[];
}

export default function AssignmentsPage() {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [filteredAssignments, setFilteredAssignments] = useState<Assignment[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedClass, setSelectedClass] = useState("ALL");
  const [selectedStatus, setSelectedStatus] = useState("ALL");
  const [classes, setClasses] = useState<string[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    filterAssignments();
  }, [searchQuery, selectedClass, selectedStatus, assignments]);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const [assignmentsRes, classesRes] = await Promise.all([
        fetch("/api/teacher/assignments"),
        fetch("/api/teacher/classes"),
      ]);

      if (assignmentsRes.ok) {
        const assignmentsData = await assignmentsRes.json();
        setAssignments(assignmentsData);
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

  const filterAssignments = () => {
    let filtered = [...assignments];

    // Filter by search
    if (searchQuery) {
      filtered = filtered.filter(
        (assignment) =>
          assignment.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          assignment.description
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          assignment.subject.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by class
    if (selectedClass !== "ALL") {
      filtered = filtered.filter(
        (assignment) => assignment.class.name === selectedClass
      );
    }

    // Filter by status
    if (selectedStatus !== "ALL") {
      filtered = filtered.filter(
        (assignment) => assignment.status === selectedStatus
      );
    }

    setFilteredAssignments(filtered);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "draft":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300";
      case "published":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300";
      case "grading":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300";
      case "completed":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "draft":
        return <FileText className="h-4 w-4" />;
      case "published":
        return <Share2 className="h-4 w-4" />;
      case "grading":
        return <Clock className="h-4 w-4" />;
      case "completed":
        return <CheckCircle className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const getSubmissionRate = (assignment: Assignment) => {
    if (assignment.totalStudents === 0) return 0;
    return Math.round(
      (assignment.submissions / assignment.totalStudents) * 100
    );
  };

  const handleDeleteAssignment = async (assignmentId: string) => {
    if (!confirm("Are you sure you want to delete this assignment?")) return;

    try {
      const response = await fetch(`/api/teacher/assignments/${assignmentId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast.success("Assignment deleted successfully");
        setAssignments((prev) => prev.filter((a) => a.id !== assignmentId));
      } else {
        throw new Error("Failed to delete assignment");
      }
    } catch (error) {
      toast.error("Failed to delete assignment");
    }
  };

  const stats = {
    total: assignments.length,
    pendingGrading: assignments.filter((a) => a.status === "grading").length,
    overdue: assignments.filter(
      (a) => new Date(a.dueDate) < new Date() && a.status !== "completed"
    ).length,
    completed: assignments.filter((a) => a.status === "completed").length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Assignment Management
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Create, manage, and grade student assignments
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button className="bg-gradient-primary gap-2" asChild>
            <Link href="/teacher/assignments/create">
              <Plus className="h-4 w-4" />
              Create Assignment
            </Link>
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
                  Total Assignments
                </p>
                <p className="mt-2 text-2xl font-bold text-purple-600">
                  {stats.total}
                </p>
              </div>
              <div className="rounded-lg bg-purple-100 p-3">
                <FileText className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Pending Grading
                </p>
                <p className="mt-2 text-2xl font-bold text-yellow-600">
                  {stats.pendingGrading}
                </p>
              </div>
              <div className="rounded-lg bg-yellow-100 p-3">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Overdue</p>
                <p className="mt-2 text-2xl font-bold text-red-600">
                  {stats.overdue}
                </p>
              </div>
              <div className="rounded-lg bg-red-100 p-3">
                <AlertCircle className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="mt-2 text-2xl font-bold text-green-600">
                  {stats.completed}
                </p>
              </div>
              <div className="rounded-lg bg-green-100 p-3">
                <CheckCircle className="h-6 w-6 text-green-600" />
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
                Search Assignments
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search by title, description, or subject..."
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
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="grading">Grading</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">
            All Assignments ({assignments.length})
          </TabsTrigger>
          <TabsTrigger value="active">
            Active ({assignments.filter((a) => a.status === "published").length}
            )
          </TabsTrigger>
          <TabsTrigger value="grading">
            Needs Grading ({stats.pendingGrading})
          </TabsTrigger>
          <TabsTrigger value="overdue">Overdue ({stats.overdue})</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {isLoading ? (
            <div className="flex h-64 items-center justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-purple-500 border-t-transparent"></div>
            </div>
          ) : filteredAssignments.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <FileText className="mx-auto h-12 w-12 text-gray-300" />
                <h3 className="mt-4 text-lg font-semibold">
                  No assignments found
                </h3>
                <p className="mt-2 text-gray-500">
                  {searchQuery ||
                  selectedClass !== "ALL" ||
                  selectedStatus !== "ALL"
                    ? "Try adjusting your search filters"
                    : "Create your first assignment to get started"}
                </p>
                <Button className="mt-4 bg-gradient-primary" asChild>
                  <Link href="/teacher/assignments/create">
                    Create Assignment
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6">
              {filteredAssignments.map((assignment) => (
                <Card key={assignment.id}>
                  <CardContent className="p-6">
                    <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
                      <div className="space-y-3">
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center space-x-2">
                              <h3 className="text-xl font-bold">
                                {assignment.title}
                              </h3>
                              <Badge
                                className={getStatusColor(assignment.status)}
                              >
                                {getStatusIcon(assignment.status)}
                                <span className="ml-1 capitalize">
                                  {assignment.status}
                                </span>
                              </Badge>
                            </div>
                            <p className="mt-1 text-gray-600 dark:text-gray-400">
                              {assignment.description}
                            </p>
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <BookOpen className="h-4 w-4" />
                            <span>{assignment.subject}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            <span>
                              Due:{" "}
                              {format(
                                new Date(assignment.dueDate),
                                "MMM d, yyyy"
                              )}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            <span>
                              {assignment.class.name} ({assignment.class.code})
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <FileText className="h-4 w-4" />
                            <span>{assignment.totalMarks} marks</span>
                          </div>
                        </div>

                        {/* Submission Progress */}
                        <div className="pt-2">
                          <div className="mb-2 flex items-center justify-between text-sm">
                            <span className="font-medium">Submissions</span>
                            <span className="text-gray-600">
                              {assignment.submissions}/
                              {assignment.totalStudents} students (
                              {getSubmissionRate(assignment)}%)
                            </span>
                          </div>
                          <Progress
                            value={getSubmissionRate(assignment)}
                            className="h-2"
                          />
                        </div>

                        {/* Attachments */}
                        {assignment.attachments.length > 0 && (
                          <div className="pt-2">
                            <p className="mb-2 text-sm font-medium">
                              Attachments
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {assignment.attachments.map(
                                (attachment, index) => (
                                  <Badge
                                    key={index}
                                    variant="outline"
                                    className="gap-1"
                                  >
                                    <FileText className="h-3 w-3" />
                                    Attachment {index + 1}
                                  </Badge>
                                )
                              )}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-col space-y-2 md:items-end">
                        <div className="flex items-center space-x-2">
                          <Button size="sm" variant="outline" asChild>
                            <Link
                              href={`/teacher/assignments/${assignment.id}`}
                            >
                              <Eye className="mr-2 h-4 w-4" />
                              View
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
                                  href={`/teacher/assignments/${assignment.id}/edit`}
                                >
                                  <Edit className="mr-2 h-4 w-4" />
                                  Edit
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem asChild>
                                <Link
                                  href={`/teacher/assignments/${assignment.id}/grade`}
                                >
                                  <BarChart3 className="mr-2 h-4 w-4" />
                                  Grade Submissions
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem asChild>
                                <Link
                                  href={`/teacher/assignments/${assignment.id}/submissions`}
                                >
                                  <Users className="mr-2 h-4 w-4" />
                                  View Submissions
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="text-red-600"
                                onClick={() =>
                                  handleDeleteAssignment(assignment.id)
                                }
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>

                        <div className="text-right text-sm text-gray-500">
                          Created{" "}
                          {format(
                            new Date(assignment.createdAt),
                            "MMM d, yyyy"
                          )}
                        </div>

                        {assignment.status === "grading" && (
                          <Button
                            size="sm"
                            className="bg-gradient-primary"
                            asChild
                          >
                            <Link
                              href={`/teacher/assignments/${assignment.id}/grade`}
                            >
                              <BarChart3 className="mr-2 h-4 w-4" />
                              Grade Now
                            </Link>
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Upcoming Deadlines */}
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Deadlines</CardTitle>
          <CardDescription>Assignments due in the next 7 days</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {assignments
              .filter((a) => {
                const dueDate = new Date(a.dueDate);
                const today = new Date();
                const nextWeek = new Date(today);
                nextWeek.setDate(today.getDate() + 7);
                return (
                  dueDate > today &&
                  dueDate <= nextWeek &&
                  a.status !== "completed"
                );
              })
              .slice(0, 5)
              .map((assignment) => (
                <div
                  key={assignment.id}
                  className="flex items-center justify-between rounded-lg border border-gray-200 p-4 dark:border-gray-700"
                >
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-semibold">{assignment.title}</h3>
                      <Badge variant="outline">{assignment.class.name}</Badge>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span>
                        Due:{" "}
                        {format(new Date(assignment.dueDate), "EEE, MMM d")}
                      </span>
                      <span>
                        {assignment.submissions}/{assignment.totalStudents}{" "}
                        submitted
                      </span>
                    </div>
                  </div>
                  <Button size="sm" variant="outline" asChild>
                    <Link href={`/teacher/assignments/${assignment.id}/grade`}>
                      Grade
                    </Link>
                  </Button>
                </div>
              ))}

            {assignments.filter((a) => {
              const dueDate = new Date(a.dueDate);
              const today = new Date();
              const nextWeek = new Date(today);
              nextWeek.setDate(today.getDate() + 7);
              return (
                dueDate > today &&
                dueDate <= nextWeek &&
                a.status !== "completed"
              );
            }).length === 0 && (
              <div className="py-4 text-center">
                <CheckCircle className="mx-auto h-8 w-8 text-green-400" />
                <p className="mt-2 text-gray-500">No upcoming deadlines</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
