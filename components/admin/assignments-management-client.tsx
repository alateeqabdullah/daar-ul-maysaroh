// src/components/admin/assignments-management-client.tsx
"use client";

import { useState, useEffect } from "react";
import {
  FileText,
  Plus,
  Search,
  Filter,
  Download,
  Calendar,
  Clock,
  BookOpen,
  GraduationCap,
  User,
  CheckCircle,
  XCircle,
  AlertCircle,
  Eye,
  Edit,
  Trash2,
  BarChart3,
  TrendingUp,
  Loader2,
  ChevronLeft,
  ChevronRight,
  Upload,
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { toast } from "sonner";
import {
  getInitials,
  formatDate,
  formatDateTime,
  formatCurrency,
} from "@/lib/utils";

interface AssignmentsManagementClientProps {
  initialAssignments: any[];
  classes: any[];
  stats: {
    total: number;
    upcoming: number;
    overdue: number;
    graded: number;
  };
}

const ASSIGNMENT_TYPES = [
  { value: "HOMEWORK", label: "Homework", color: "bg-blue-100 text-blue-800" },
  {
    value: "PROJECT",
    label: "Project",
    color: "bg-purple-100 text-purple-800",
  },
  { value: "QUIZ", label: "Quiz", color: "bg-green-100 text-green-800" },
  { value: "TEST", label: "Test", color: "bg-yellow-100 text-yellow-800" },
  {
    value: "PRESENTATION",
    label: "Presentation",
    color: "bg-pink-100 text-pink-800",
  },
  {
    value: "RECITATION",
    label: "Recitation",
    color: "bg-indigo-100 text-indigo-800",
  },
  {
    value: "MEMORIZATION_TEST",
    label: "Memorization Test",
    color: "bg-red-100 text-red-800",
  },
  { value: "OTHER", label: "Other", color: "bg-gray-100 text-gray-800" },
];

export default function AssignmentsManagementClient({
  initialAssignments,
  classes,
  stats,
}: AssignmentsManagementClientProps) {
  const [assignments, setAssignments] = useState(initialAssignments);
  const [selectedClass, setSelectedClass] = useState<string>("all");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [newAssignment, setNewAssignment] = useState({
    title: "",
    description: "",
    subjectId: "",
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    totalMarks: 100,
    weightage: 100,
    type: "HOMEWORK",
    attachments: [] as string[],
    instructions: "",
    rubric: "",
  });

  const [attachmentInput, setAttachmentInput] = useState("");

  // Get all subjects from classes
  const allSubjects = classes.flatMap((classItem) =>
    classItem.subjects.map((subject: any) => ({
      ...subject,
      className: classItem.name,
      teacherName: classItem.teacher?.user?.name,
    }))
  );

  const filteredAssignments = assignments.filter((assignment) => {
    const matchesClass =
      selectedClass === "all" ||
      allSubjects.find((s: any) => s.id === assignment.subjectId)?.classId ===
        selectedClass;
    const matchesType =
      selectedType === "all" || assignment.type === selectedType;
    const matchesSearch =
      !searchQuery ||
      assignment.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      assignment.description?.toLowerCase().includes(searchQuery.toLowerCase());

    // Status matching
    const now = new Date();
    const dueDate = new Date(assignment.dueDate);
    let statusMatch = true;

    if (selectedStatus === "upcoming") {
      statusMatch = dueDate > now;
    } else if (selectedStatus === "overdue") {
      statusMatch = dueDate < now && assignment.submissions.length === 0;
    } else if (selectedStatus === "submitted") {
      statusMatch = assignment.submissions.length > 0;
    } else if (selectedStatus === "graded") {
      statusMatch = assignment.submissions.some(
        (s: any) => s.status === "GRADED"
      );
    }

    return matchesClass && matchesType && matchesSearch && statusMatch;
  });

  // Pagination
  const totalPages = Math.ceil(filteredAssignments.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedAssignments = filteredAssignments.slice(startIndex, endIndex);

  const getAssignmentType = (type: string) => {
    return (
      ASSIGNMENT_TYPES.find((t) => t.value === type) ||
      ASSIGNMENT_TYPES[ASSIGNMENT_TYPES.length - 1]
    );
  };

  const getStatusBadge = (assignment: any) => {
    const now = new Date();
    const dueDate = new Date(assignment.dueDate);

    if (dueDate < now && assignment.submissions.length === 0) {
      return <Badge variant="destructive">Overdue</Badge>;
    } else if (dueDate < now && assignment.submissions.length > 0) {
      return <Badge variant="secondary">Submitted</Badge>;
    } else if (assignment.submissions.some((s: any) => s.status === "GRADED")) {
      return <Badge className="bg-green-100 text-green-800">Graded</Badge>;
    } else if (assignment.submissions.length > 0) {
      return <Badge className="bg-blue-100 text-blue-800">Submitted</Badge>;
    } else if (dueDate.getTime() - now.getTime() < 24 * 60 * 60 * 1000) {
      return <Badge className="bg-yellow-100 text-yellow-800">Due Soon</Badge>;
    } else {
      return <Badge variant="outline">Upcoming</Badge>;
    }
  };

  const getSubmissionStats = (assignment: any) => {
    const totalStudents = assignment.subject?.class?.enrollments?.length || 0;
    const submitted = assignment.submissions.length;
    const graded = assignment.submissions.filter(
      (s: any) => s.status === "GRADED"
    ).length;

    return {
      totalStudents,
      submitted,
      graded,
      pending: totalStudents - submitted,
      submissionRate: totalStudents > 0 ? (submitted / totalStudents) * 100 : 0,
    };
  };

  const handleCreateAssignment = async () => {
    if (!newAssignment.title.trim() || !newAssignment.subjectId) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("/api/admin/assignments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...newAssignment,
          createdById: "current-user-id", // This should come from session
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create assignment");
      }

      toast.success("Assignment created successfully");

      // Update local state
      setAssignments([data.assignment, ...assignments]);
      setIsCreateDialogOpen(false);
      resetNewAssignment();
    } catch (error) {
      toast.error("Failed to create assignment", {
        description:
          error instanceof Error ? error.message : "Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateAssignment = async (assignmentId: string, updates: any) => {
    try {
      const response = await fetch(`/api/admin/assignments/${assignmentId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to update assignment");
      }

      toast.success("Assignment updated successfully");

      // Update local state
      setAssignments(
        assignments.map((a) =>
          a.id === assignmentId ? { ...a, ...updates } : a
        )
      );
      setIsEditDialogOpen(false);
    } catch (error) {
      toast.error("Failed to update assignment", {
        description:
          error instanceof Error ? error.message : "Please try again.",
      });
    }
  };

  const handleDeleteAssignment = async (assignmentId: string) => {
    if (
      !confirm(
        "Are you sure you want to delete this assignment? This action cannot be undone."
      )
    ) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/assignments/${assignmentId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete assignment");
      }

      toast.success("Assignment deleted successfully");

      // Update local state
      setAssignments(assignments.filter((a) => a.id !== assignmentId));
    } catch (error) {
      toast.error("Failed to delete assignment", {
        description: "Please try again.",
      });
    }
  };

  const handleAddAttachment = () => {
    if (attachmentInput.trim()) {
      setNewAssignment({
        ...newAssignment,
        attachments: [...newAssignment.attachments, attachmentInput.trim()],
      });
      setAttachmentInput("");
    }
  };

  const handleRemoveAttachment = (index: number) => {
    setNewAssignment({
      ...newAssignment,
      attachments: newAssignment.attachments.filter((_, i) => i !== index),
    });
  };

  const resetNewAssignment = () => {
    setNewAssignment({
      title: "",
      description: "",
      subjectId: "",
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0],
      totalMarks: 100,
      weightage: 100,
      type: "HOMEWORK",
      attachments: [],
      instructions: "",
      rubric: "",
    });
  };

  const exportAssignments = () => {
    const csvContent = [
      [
        "Title",
        "Type",
        "Subject",
        "Class",
        "Due Date",
        "Total Marks",
        "Submissions",
        "Graded",
        "Status",
      ],
      ...filteredAssignments.map((assignment) => {
        const stats = getSubmissionStats(assignment);
        return [
          assignment.title,
          getAssignmentType(assignment.type).label,
          assignment.subject?.name || "N/A",
          assignment.subject?.class?.name || "N/A",
          formatDate(assignment.dueDate),
          assignment.totalMarks.toString(),
          `${stats.submitted}/${stats.totalStudents}`,
          `${stats.graded}/${stats.submitted}`,
          stats.submissionRate.toFixed(1) + "%",
        ];
      }),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `assignments-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();

    toast.success("Assignments exported successfully");
  };

  const assignmentChartData = [
    {
      name: "Homework",
      value: assignments.filter((a) => a.type === "HOMEWORK").length,
      color: "#3b82f6",
    },
    {
      name: "Quiz",
      value: assignments.filter((a) => a.type === "QUIZ").length,
      color: "#10b981",
    },
    {
      name: "Project",
      value: assignments.filter((a) => a.type === "PROJECT").length,
      color: "#8b5cf6",
    },
    {
      name: "Test",
      value: assignments.filter((a) => a.type === "TEST").length,
      color: "#f59e0b",
    },
    {
      name: "Recitation",
      value: assignments.filter((a) => a.type === "RECITATION").length,
      color: "#6366f1",
    },
  ];

  const submissionChartData = assignments
    .map((assignment) => {
      const stats = getSubmissionStats(assignment);
      return {
        name:
          assignment.title.substring(0, 20) +
          (assignment.title.length > 20 ? "..." : ""),
        submissionRate: stats.submissionRate,
      };
    })
    .slice(0, 10);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Assignments Management
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Create, manage, and track assignments across all classes
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            className="gap-2"
            onClick={exportAssignments}
          >
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Dialog
            open={isCreateDialogOpen}
            onOpenChange={setIsCreateDialogOpen}
          >
            <DialogTrigger asChild>
              <Button className="bg-gradient-primary gap-2">
                <Plus className="h-4 w-4" />
                Create Assignment
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[700px]">
              <DialogHeader>
                <DialogTitle>Create New Assignment</DialogTitle>
                <DialogDescription>
                  Create a new assignment for students
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Assignment Title *</Label>
                  <Input
                    id="title"
                    value={newAssignment.title}
                    onChange={(e) =>
                      setNewAssignment({
                        ...newAssignment,
                        title: e.target.value,
                      })
                    }
                    placeholder="e.g., Chapter 5 Homework, Midterm Project, etc."
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={newAssignment.description}
                    onChange={(e) =>
                      setNewAssignment({
                        ...newAssignment,
                        description: e.target.value,
                      })
                    }
                    placeholder="Describe the assignment requirements and objectives..."
                    rows={3}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject *</Label>
                    <Select
                      value={newAssignment.subjectId}
                      onValueChange={(value) =>
                        setNewAssignment({ ...newAssignment, subjectId: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select subject" />
                      </SelectTrigger>
                      <SelectContent>
                        {allSubjects.map((subject: any) => (
                          <SelectItem key={subject.id} value={subject.id}>
                            {subject.name} ({subject.className})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="type">Assignment Type *</Label>
                    <Select
                      value={newAssignment.type}
                      onValueChange={(value) =>
                        setNewAssignment({ ...newAssignment, type: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        {ASSIGNMENT_TYPES.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="dueDate">Due Date *</Label>
                    <Input
                      id="dueDate"
                      type="datetime-local"
                      value={newAssignment.dueDate + "T23:59"}
                      onChange={(e) => {
                        const date = e.target.value.split("T")[0];
                        setNewAssignment({ ...newAssignment, dueDate: date });
                      }}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="totalMarks">Total Marks</Label>
                    <Input
                      id="totalMarks"
                      type="number"
                      min="0"
                      step="0.5"
                      value={newAssignment.totalMarks}
                      onChange={(e) =>
                        setNewAssignment({
                          ...newAssignment,
                          totalMarks: parseFloat(e.target.value),
                        })
                      }
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="instructions">Instructions (Optional)</Label>
                  <Textarea
                    id="instructions"
                    value={newAssignment.instructions}
                    onChange={(e) =>
                      setNewAssignment({
                        ...newAssignment,
                        instructions: e.target.value,
                      })
                    }
                    placeholder="Provide detailed instructions for students..."
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Attachments (Optional)</Label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Enter file URL or path..."
                      value={attachmentInput}
                      onChange={(e) => setAttachmentInput(e.target.value)}
                    />
                    <Button type="button" onClick={handleAddAttachment}>
                      Add
                    </Button>
                  </div>
                  {newAssignment.attachments.length > 0 && (
                    <div className="mt-2 space-y-2">
                      {newAssignment.attachments.map((attachment, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between rounded-lg border p-2"
                        >
                          <span className="truncate text-sm">{attachment}</span>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveAttachment(index)}
                          >
                            <XCircle className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rubric">Grading Rubric (Optional)</Label>
                  <Textarea
                    id="rubric"
                    value={newAssignment.rubric}
                    onChange={(e) =>
                      setNewAssignment({
                        ...newAssignment,
                        rubric: e.target.value,
                      })
                    }
                    placeholder="Enter grading criteria in JSON format or plain text..."
                    rows={3}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsCreateDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button onClick={handleCreateAssignment} disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    "Create Assignment"
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
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
                <p className="mt-2 text-2xl font-bold">{stats.total}</p>
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
                <p className="text-sm font-medium text-gray-600">Upcoming</p>
                <p className="mt-2 text-2xl font-bold text-blue-600">
                  {stats.upcoming}
                </p>
              </div>
              <div className="rounded-lg bg-blue-100 p-3">
                <Calendar className="h-6 w-6 text-blue-600" />
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
                <p className="text-sm font-medium text-gray-600">Graded</p>
                <p className="mt-2 text-2xl font-bold text-green-600">
                  {stats.graded}
                </p>
              </div>
              <div className="rounded-lg bg-green-100 p-3">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Assignment Types Distribution</CardTitle>
            <CardDescription>Breakdown of assignments by type</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={assignmentChartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) =>
                      `${name}: ${(percent * 100).toFixed(1)}%`
                    }
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {assignmentChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value) => [`${value} assignments`, "Count"]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Submission Rates</CardTitle>
            <CardDescription>
              Top 10 assignments by submission rate
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={submissionChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="name"
                    angle={-45}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis domain={[0, 100]} />
                  <Tooltip
                    formatter={(value) => [`${value}%`, "Submission Rate"]}
                  />
                  <Bar
                    dataKey="submissionRate"
                    fill="#8b5cf6"
                    name="Submission Rate"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters & Actions */}
      <Card>
        <CardContent className="p-6">
          <div className="grid gap-4 sm:grid-cols-4">
            <div className="space-y-2">
              <Label>Class</Label>
              <Select
                value={selectedClass}
                onValueChange={(value) => {
                  setSelectedClass(value);
                  setCurrentPage(1);
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All Classes" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Classes</SelectItem>
                  {classes.map((classItem) => (
                    <SelectItem key={classItem.id} value={classItem.id}>
                      {classItem.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Type</Label>
              <Select
                value={selectedType}
                onValueChange={(value) => {
                  setSelectedType(value);
                  setCurrentPage(1);
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  {ASSIGNMENT_TYPES.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Status</Label>
              <Select
                value={selectedStatus}
                onValueChange={(value) => {
                  setSelectedStatus(value);
                  setCurrentPage(1);
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="upcoming">Upcoming</SelectItem>
                  <SelectItem value="overdue">Overdue</SelectItem>
                  <SelectItem value="submitted">Submitted</SelectItem>
                  <SelectItem value="graded">Graded</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Search</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search assignments..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="pl-10"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Assignments List */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Assignments</CardTitle>
              <CardDescription>
                {filteredAssignments.length} assignments found • Page{" "}
                {currentPage} of {totalPages}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {paginatedAssignments.length === 0 ? (
            <div className="py-12 text-center">
              <FileText className="mx-auto h-12 w-12 text-gray-300" />
              <h3 className="mt-4 text-lg font-semibold">
                No assignments found
              </h3>
              <p className="mt-2 text-gray-500">
                {selectedClass !== "all" ||
                selectedType !== "all" ||
                selectedStatus !== "all" ||
                searchQuery
                  ? "Try adjusting your filters"
                  : "Create your first assignment"}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {paginatedAssignments.map((assignment) => {
                const type = getAssignmentType(assignment.type);
                const stats = getSubmissionStats(assignment);
                const subject = allSubjects.find(
                  (s: any) => s.id === assignment.subjectId
                );

                return (
                  <div
                    key={assignment.id}
                    className="rounded-lg border p-4 hover:border-purple-300"
                  >
                    <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
                      <div className="flex-1 space-y-3">
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="text-lg font-semibold">
                                {assignment.title}
                              </h3>
                              <Badge className={type.color}>{type.label}</Badge>
                              {getStatusBadge(assignment)}
                            </div>
                            <p className="mt-1 text-sm text-gray-600">
                              {assignment.description ||
                                "No description provided"}
                            </p>
                            <div className="mt-2 flex flex-wrap gap-4 text-sm text-gray-600">
                              <div className="flex items-center gap-1">
                                <BookOpen className="h-4 w-4" />
                                {subject?.name || "Unknown Subject"}
                              </div>
                              <div className="flex items-center gap-1">
                                <GraduationCap className="h-4 w-4" />
                                {subject?.className || "Unknown Class"}
                              </div>
                              <div className="flex items-center gap-1">
                                <User className="h-4 w-4" />
                                {subject?.teacherName || "No Teacher"}
                              </div>
                              <div className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                Due: {formatDate(assignment.dueDate)}
                              </div>
                              <div className="flex items-center gap-1">
                                <BarChart3 className="h-4 w-4" />
                                {assignment.totalMarks} marks
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Submission Stats */}
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">
                              Submission Progress
                            </span>
                            <span className="font-medium">
                              {stats.submitted}/{stats.totalStudents} students (
                              {stats.submissionRate.toFixed(1)}%)
                            </span>
                          </div>
                          <div className="h-2 w-full rounded-full bg-gray-200">
                            <div
                              className="h-full rounded-full bg-gradient-primary transition-all duration-300"
                              style={{ width: `${stats.submissionRate}%` }}
                            />
                          </div>
                          <div className="flex justify-between text-xs text-gray-500">
                            <span>Not submitted: {stats.pending}</span>
                            <span>Graded: {stats.graded}</span>
                            <span>
                              Pending grading: {stats.submitted - stats.graded}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2 md:ml-4 md:w-48">
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex-1"
                            onClick={() => {
                              setSelectedAssignment(assignment);
                              setIsViewDialogOpen(true);
                            }}
                          >
                            <Eye className="mr-2 h-4 w-4" />
                            View
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button size="sm" variant="ghost">
                                <Edit className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onClick={() => {
                                  setSelectedAssignment(assignment);
                                  setIsEditDialogOpen(true);
                                }}
                              >
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
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
                        <Button
                          size="sm"
                          variant="outline"
                          className="w-full"
                          onClick={() => {
                            // Navigate to submissions page or open submissions modal
                            toast.info("View submissions feature coming soon");
                          }}
                        >
                          View Submissions ({stats.submitted})
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-6 flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Showing {startIndex + 1} to{" "}
                {Math.min(endIndex, filteredAssignments.length)} of{" "}
                {filteredAssignments.length} assignments
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* View Assignment Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-[700px]">
          {selectedAssignment && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedAssignment.title}</DialogTitle>
                <DialogDescription>
                  Assignment details and submission statistics
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-6">
                <div>
                  <h3 className="mb-2 font-semibold">Description</h3>
                  <p className="text-gray-700">
                    {selectedAssignment.description ||
                      "No description provided"}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="mb-2 font-semibold">Details</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Type:</span>
                        <Badge
                          className={
                            getAssignmentType(selectedAssignment.type).color
                          }
                        >
                          {getAssignmentType(selectedAssignment.type).label}
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Due Date:</span>
                        <span className="font-medium">
                          {formatDate(selectedAssignment.dueDate)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total Marks:</span>
                        <span className="font-medium">
                          {selectedAssignment.totalMarks}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Weightage:</span>
                        <span className="font-medium">
                          {selectedAssignment.weightage}%
                        </span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="mb-2 font-semibold">Submission Stats</h3>
                    {(() => {
                      const stats = getSubmissionStats(selectedAssignment);
                      return (
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">
                              Total Students:
                            </span>
                            <span className="font-medium">
                              {stats.totalStudents}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Submitted:</span>
                            <span className="font-medium text-green-600">
                              {stats.submitted}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Graded:</span>
                            <span className="font-medium text-blue-600">
                              {stats.graded}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">
                              Submission Rate:
                            </span>
                            <span className="font-medium">
                              {stats.submissionRate.toFixed(1)}%
                            </span>
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                </div>

                {selectedAssignment.instructions && (
                  <div>
                    <h3 className="mb-2 font-semibold">Instructions</h3>
                    <p className="text-gray-700 whitespace-pre-wrap">
                      {selectedAssignment.instructions}
                    </p>
                  </div>
                )}

                {selectedAssignment.attachments &&
                  selectedAssignment.attachments.length > 0 && (
                    <div>
                      <h3 className="mb-2 font-semibold">Attachments</h3>
                      <div className="space-y-2">
                        {selectedAssignment.attachments.map(
                          (attachment: string, index: number) => (
                            <div
                              key={index}
                              className="flex items-center justify-between rounded-lg border p-2"
                            >
                              <span className="truncate text-sm">
                                {attachment}
                              </span>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() =>
                                  window.open(attachment, "_blank")
                                }
                              >
                                Download
                              </Button>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  )}

                <div className="flex justify-end space-x-3">
                  <Button
                    variant="outline"
                    onClick={() => setIsViewDialogOpen(false)}
                  >
                    Close
                  </Button>
                  <Button
                    onClick={() => {
                      setIsViewDialogOpen(false);
                      setSelectedAssignment(selectedAssignment);
                      setIsEditDialogOpen(true);
                    }}
                  >
                    Edit Assignment
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Assignment Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[700px]">
          {selectedAssignment && (
            <>
              <DialogHeader>
                <DialogTitle>Edit Assignment</DialogTitle>
                <DialogDescription>
                  Update assignment details and requirements
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-title">Assignment Title *</Label>
                  <Input
                    id="edit-title"
                    value={selectedAssignment.title}
                    onChange={(e) =>
                      setSelectedAssignment({
                        ...selectedAssignment,
                        title: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-description">Description</Label>
                  <Textarea
                    id="edit-description"
                    value={selectedAssignment.description || ""}
                    onChange={(e) =>
                      setSelectedAssignment({
                        ...selectedAssignment,
                        description: e.target.value,
                      })
                    }
                    rows={3}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-dueDate">Due Date *</Label>
                    <Input
                      id="edit-dueDate"
                      type="date"
                      value={selectedAssignment.dueDate.split("T")[0]}
                      onChange={(e) =>
                        setSelectedAssignment({
                          ...selectedAssignment,
                          dueDate: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-totalMarks">Total Marks</Label>
                    <Input
                      id="edit-totalMarks"
                      type="number"
                      min="0"
                      step="0.5"
                      value={selectedAssignment.totalMarks}
                      onChange={(e) =>
                        setSelectedAssignment({
                          ...selectedAssignment,
                          totalMarks: parseFloat(e.target.value),
                        })
                      }
                    />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsEditDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  onClick={() =>
                    handleUpdateAssignment(selectedAssignment.id, {
                      title: selectedAssignment.title,
                      description: selectedAssignment.description,
                      dueDate: selectedAssignment.dueDate,
                      totalMarks: selectedAssignment.totalMarks,
                    })
                  }
                  disabled={isLoading}
                >
                  {isLoading ? "Saving..." : "Save Changes"}
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
