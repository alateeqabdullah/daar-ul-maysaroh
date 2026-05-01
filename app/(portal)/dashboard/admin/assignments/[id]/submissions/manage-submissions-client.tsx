// app/(portal)/dashboard/admin/assignments/[id]/submissions/manage-submissions-client.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  ClipboardList,
  Calendar,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  Download,
  FileText,
  Loader2,
  Search,
  ChevronLeft,
  ChevronRight,
  Users,
  Award,
  TrendingUp,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import {
  gradeSubmission,
  bulkGradeSubmissions,
} from "../../../actions/assignments";
import { AssignmentType } from "@/app/generated/prisma/enums";

interface Assignment {
  id: string;
  title: string;
  totalMarks: number;
  type: AssignmentType;
  dueDate: Date;
  subject: {
    name: string;
    code: string;
    class: {
      name: string;
      code: string;
      level: string;
    };
  };
}

interface StudentSubmission {
  id: string;
  studentId: string;
  studentName: string;
  studentEmail: string;
  studentImage: string | null;
  submittedAt: Date | null;
  lateSubmission: boolean;
  marks: number | null;
  status: string;
  feedback: string | null;
  submissionId: string | null;
}

interface Submission {
  id: string;
  studentId: string;
  studentName: string;
  studentEmail: string;
  submittedAt: Date;
  lateSubmission: boolean;
  marks: number | null;
  status: string;
  feedback: string | null;
}

interface ManageSubmissionsClientProps {
  assignment: Assignment;
  students: StudentSubmission[];
  submissions: Submission[];
}

const TYPE_COLORS: Record<AssignmentType, string> = {
  HOMEWORK:
    "bg-purple-100 text-purple-700 dark:bg-purple-950/40 dark:text-purple-400",
  PROJECT: "bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400",
  QUIZ: "bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400",
  TEST: "bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-400",
  PRESENTATION:
    "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400",
  RECITATION:
    "bg-cyan-100 text-cyan-700 dark:bg-cyan-950/40 dark:text-cyan-400",
  OTHER: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400",
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case "GRADED":
      return {
        label: "Graded",
        color:
          "bg-green-100 text-green-700 dark:bg-green-950/40 dark:text-green-400",
        icon: CheckCircle,
      };
    case "SUBMITTED":
      return {
        label: "Submitted",
        color:
          "bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400",
        icon: Clock,
      };
    case "LATE":
      return {
        label: "Late",
        color: "bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-400",
        icon: AlertCircle,
      };
    default:
      return {
        label: "Not Submitted",
        color: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400",
        icon: XCircle,
      };
  }
};

const formatDate = (date: Date | null) => {
  if (!date) return "Not submitted";
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(date));
};

const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

export function ManageSubmissionsClient({
  assignment,
  students,
  submissions,
}: ManageSubmissionsClientProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedSubmission, setSelectedSubmission] =
    useState<StudentSubmission | null>(null);
  const [openGradeDialog, setOpenGradeDialog] = useState(false);
  const [gradeMarks, setGradeMarks] = useState(0);
  const [gradeFeedback, setGradeFeedback] = useState("");
  const [selectedForBulk, setSelectedForBulk] = useState<Set<string>>(
    new Set(),
  );
  const [openBulkGradeDialog, setOpenBulkGradeDialog] = useState(false);
  const [bulkMarks, setBulkMarks] = useState(0);
  const [bulkFeedback, setBulkFeedback] = useState("");

  const itemsPerPage = 20;
  const typeColor = TYPE_COLORS[assignment.type];

  // Filter students
  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      searchQuery === "" ||
      student.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.studentEmail.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "submitted" && student.status !== "NOT_SUBMITTED") ||
      (statusFilter === "graded" && student.status === "GRADED") ||
      (statusFilter === "pending" && student.status === "SUBMITTED") ||
      (statusFilter === "late" && student.lateSubmission) ||
      (statusFilter === "not_submitted" && student.status === "NOT_SUBMITTED");

    return matchesSearch && matchesStatus;
  });

  // Pagination
  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);
  const paginatedStudents = filteredStudents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  // Statistics
  const totalStudents = students.length;
  const submittedCount = students.filter((s) => s.submittedAt).length;
  const gradedCount = students.filter((s) => s.status === "GRADED").length;
  const lateCount = students.filter((s) => s.lateSubmission).length;
  const notSubmittedCount = students.filter(
    (s) => s.status === "NOT_SUBMITTED",
  ).length;
  const submissionRate = (submittedCount / totalStudents) * 100;
  const gradingRate = (gradedCount / submittedCount) * 100;
  const averageScore =
    gradedCount > 0
      ? students
          .filter((s) => s.marks)
          .reduce((acc, s) => acc + (s.marks || 0), 0) / gradedCount
      : 0;

  const handleGrade = async () => {
    if (!selectedSubmission) return;

    setIsLoading(true);
    try {
      await gradeSubmission(selectedSubmission.submissionId!, {
        marks: gradeMarks,
        feedback: gradeFeedback || undefined,
        gradedById: "current-user-id",
      });
      toast.success("Submission graded successfully");
      setOpenGradeDialog(false);
      router.refresh();
    } catch (error) {
      toast.error("Failed to grade submission");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBulkGrade = async () => {
    const submissionIds = Array.from(selectedForBulk).filter((id) => id);
    if (submissionIds.length === 0) return;

    setIsLoading(true);
    try {
      await bulkGradeSubmissions(
        submissionIds.map((id) => ({
          id,
          marks: bulkMarks,
          feedback: bulkFeedback,
        })),
        "current-user-id",
      );
      toast.success(
        `${submissionIds.length} submission(s) graded successfully`,
      );
      setSelectedForBulk(new Set());
      setOpenBulkGradeDialog(false);
      router.refresh();
    } catch (error) {
      toast.error("Failed to grade submissions");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleSelectForBulk = (submissionId: string | null) => {
    if (!submissionId) return;
    const newSelected = new Set(selectedForBulk);
    if (newSelected.has(submissionId)) {
      newSelected.delete(submissionId);
    } else {
      newSelected.add(submissionId);
    }
    setSelectedForBulk(newSelected);
  };

  const toggleSelectAll = () => {
    const ungradedSubmissions = paginatedStudents
      .filter((s) => s.submissionId && s.status !== "GRADED")
      .map((s) => s.submissionId!);

    if (
      selectedForBulk.size === ungradedSubmissions.length &&
      ungradedSubmissions.length > 0
    ) {
      setSelectedForBulk(new Set());
    } else {
      setSelectedForBulk(new Set(ungradedSubmissions));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-1">
            <ClipboardList className="w-5 h-5 text-amber-500" />
            <span className="text-xs font-black uppercase tracking-wider text-amber-600 dark:text-amber-400">
              Assignment Submissions
            </span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-black tracking-tighter bg-gradient-to-r from-purple-600 to-amber-600 bg-clip-text text-transparent">
                {assignment.title}
              </h1>
              <div className="flex flex-wrap gap-2 mt-2">
                <Badge className={typeColor}>{assignment.type}</Badge>
                <Badge variant="outline">
                  {assignment.subject.name} ({assignment.subject.code})
                </Badge>
                <Badge variant="outline">{assignment.subject.class.name}</Badge>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Calendar className="w-3.5 h-3.5" />
                  Due: {formatDate(assignment.dueDate)}
                </div>
              </div>
            </div>
            <Link href={`/dashboard/admin/assignments/${assignment.id}`}>
              <Button variant="outline" className="rounded-full">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Assignment
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Total Students
                  </p>
                  <p className="text-2xl font-black">{totalStudents}</p>
                </div>
                <Users className="w-5 h-5 text-purple-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Submitted</p>
                  <p className="text-2xl font-black text-blue-600">
                    {submittedCount}
                  </p>
                </div>
                <FileText className="w-5 h-5 text-blue-600" />
              </div>
              <Progress value={submissionRate} className="mt-2 h-1" />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Graded</p>
                  <p className="text-2xl font-black text-green-600">
                    {gradedCount}
                  </p>
                </div>
                <Award className="w-5 h-5 text-green-600" />
              </div>
              <Progress value={gradingRate} className="mt-2 h-1" />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Late</p>
                  <p className="text-2xl font-black text-red-600">
                    {lateCount}
                  </p>
                </div>
                <Clock className="w-5 h-5 text-red-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg. Score</p>
                  <p className="text-2xl font-black text-amber-600">
                    {Math.round(averageScore)}
                  </p>
                </div>
                <TrendingUp className="w-5 h-5 text-amber-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by student name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 rounded-full"
            />
          </div>
          <div className="flex gap-2">
            {[
              "all",
              "submitted",
              "graded",
              "pending",
              "late",
              "not_submitted",
            ].map((filter) => (
              <button
                key={filter}
                onClick={() => setStatusFilter(filter)}
                className={cn(
                  "px-3 py-1.5 rounded-full text-xs font-black transition-all",
                  statusFilter === filter
                    ? "bg-purple-600 text-white"
                    : "bg-muted/30 hover:bg-purple-100",
                )}
              >
                {filter.replace("_", " ").toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Bulk Actions Bar */}
        {selectedForBulk.size > 0 && (
          <div className="bg-purple-50 dark:bg-purple-950/30 rounded-xl p-4 mb-6 flex flex-wrap items-center justify-between gap-4 border border-purple-200 dark:border-purple-800">
            <span className="text-sm font-black">
              {selectedForBulk.size} submission(s) selected
            </span>
            <Button
              size="sm"
              onClick={() => setOpenBulkGradeDialog(true)}
              className="bg-purple-600 hover:bg-purple-700"
            >
              Grade Selected
            </Button>
          </div>
        )}

        {/* Submissions Table */}
        <Card>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-slate-50 dark:bg-slate-800/50">
                <TableRow>
                  <TableHead className="w-12">
                    <input
                      type="checkbox"
                      checked={
                        selectedForBulk.size ===
                          paginatedStudents.filter(
                            (s) => s.submissionId && s.status !== "GRADED",
                          ).length &&
                        paginatedStudents.filter(
                          (s) => s.submissionId && s.status !== "GRADED",
                        ).length > 0
                      }
                      onChange={toggleSelectAll}
                      className="w-4 h-4 rounded"
                    />
                  </TableHead>
                  <TableHead>Student</TableHead>
                  <TableHead>Submitted</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Marks</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedStudents.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-12">
                      <div className="flex flex-col items-center gap-2">
                        <Users className="w-12 h-12 text-muted-foreground/30" />
                        <p className="text-muted-foreground">
                          No students found
                        </p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedStudents.map((student) => {
                    const status = getStatusBadge(student.status);
                    const StatusIcon = status.icon;

                    return (
                      <TableRow
                        key={student.studentId}
                        className="hover:bg-slate-50 dark:hover:bg-slate-800/50"
                      >
                        <TableCell>
                          <input
                            type="checkbox"
                            checked={selectedForBulk.has(
                              student.submissionId || "",
                            )}
                            onChange={() =>
                              toggleSelectForBulk(student.submissionId)
                            }
                            disabled={
                              !student.submissionId ||
                              student.status === "GRADED"
                            }
                            className="w-4 h-4 rounded"
                          />
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="w-10 h-10">
                              <AvatarFallback className="bg-purple-100 text-purple-600">
                                {getInitials(student.studentName)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-black text-sm">
                                {student.studentName}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {student.studentEmail}
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          {student.submittedAt ? (
                            <div className="flex flex-col">
                              <span className="text-sm">
                                {formatDate(student.submittedAt)}
                              </span>
                              {student.lateSubmission && (
                                <Badge
                                  variant="outline"
                                  className="mt-1 text-red-600"
                                >
                                  Late
                                </Badge>
                              )}
                            </div>
                          ) : (
                            <span className="text-muted-foreground">
                              Not submitted
                            </span>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <StatusIcon className="w-3.5 h-3.5" />
                            <span
                              className={cn("text-xs font-black", status.color)}
                            >
                              {status.label}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          {student.marks !== null ? (
                            <span className="font-black">
                              {student.marks}/{assignment.totalMarks}
                            </span>
                          ) : (
                            <span className="text-muted-foreground">—</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            {student.submissionId && (
                              <>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => {
                                    setSelectedSubmission(student);
                                    setGradeMarks(student.marks || 0);
                                    setGradeFeedback(student.feedback || "");
                                    setOpenGradeDialog(true);
                                  }}
                                >
                                  <Eye className="w-4 h-4" />
                                </Button>
                                <Button variant="ghost" size="sm" asChild>
                                  <a
                                    href={`/api/submissions/${student.submissionId}/download`}
                                    target="_blank"
                                  >
                                    <Download className="w-4 h-4" />
                                  </a>
                                </Button>
                              </>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between px-4 py-4 border-t">
              <p className="text-sm text-muted-foreground">
                Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
                {Math.min(currentPage * itemsPerPage, filteredStudents.length)}{" "}
                of {filteredStudents.length} students
              </p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="rounded-full"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </Button>
                <div className="flex gap-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }
                    return (
                      <Button
                        key={pageNum}
                        variant={
                          currentPage === pageNum ? "default" : "outline"
                        }
                        size="sm"
                        onClick={() => setCurrentPage(pageNum)}
                        className={`rounded-full w-9 ${currentPage === pageNum ? "bg-purple-600" : ""}`}
                      >
                        {pageNum}
                      </Button>
                    );
                  })}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="rounded-full"
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}
        </Card>
      </div>

      {/* Grade Dialog */}
      <Dialog open={openGradeDialog} onOpenChange={setOpenGradeDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Grade Submission</DialogTitle>
            <DialogDescription>
              Grade {selectedSubmission?.studentName}'s submission
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Marks (out of {assignment.totalMarks})</Label>
              <Input
                type="number"
                min={0}
                max={assignment.totalMarks}
                value={gradeMarks}
                onChange={(e) => setGradeMarks(parseInt(e.target.value) || 0)}
              />
            </div>
            <div className="space-y-2">
              <Label>Feedback</Label>
              <Textarea
                value={gradeFeedback}
                onChange={(e) => setGradeFeedback(e.target.value)}
                placeholder="Provide feedback to the student..."
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenGradeDialog(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleGrade}
              disabled={isLoading}
              className="bg-purple-600 hover:bg-purple-700"
            >
              {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Submit Grade
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Bulk Grade Dialog */}
      <Dialog open={openBulkGradeDialog} onOpenChange={setOpenBulkGradeDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Bulk Grade Submissions</DialogTitle>
            <DialogDescription>
              Grade {selectedForBulk.size} selected submission(s)
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Marks (out of {assignment.totalMarks})</Label>
              <Input
                type="number"
                min={0}
                max={assignment.totalMarks}
                value={bulkMarks}
                onChange={(e) => setBulkMarks(parseInt(e.target.value) || 0)}
              />
            </div>
            <div className="space-y-2">
              <Label>Feedback (optional)</Label>
              <Textarea
                value={bulkFeedback}
                onChange={(e) => setBulkFeedback(e.target.value)}
                placeholder="Provide feedback to all selected students..."
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setOpenBulkGradeDialog(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleBulkGrade}
              disabled={isLoading}
              className="bg-purple-600 hover:bg-purple-700"
            >
              {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Grade All
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
