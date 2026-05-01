// app/(portal)/dashboard/admin/assignments/[id]/view-assignment-client.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Edit,
  Trash2,
  ClipboardList,
  Calendar,
  BookOpen,
  School,
  User,
  FileText,
  Clock,
  CheckCircle,
  XCircle,
  Loader2,
  Download,
  Eye,
  TrendingUp,
  Users,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { deleteAssignment, gradeSubmission } from "../../actions/assignments";
import { AssignmentType } from "@/app/generated/prisma/enums";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

interface AssignmentWithRelations {
  id: string;
  title: string;
  description: string | null;
  subjectId: string;
  dueDate: Date;
  totalMarks: number;
  weightage: number;
  type: AssignmentType;
  attachments: string[];
  instructions: string | null;
  rubric: string | null;
  createdById: string;
  createdAt: Date;
  updatedAt: Date;
  subject: {
    id: string;
    name: string;
    code: string;
    category: string;
    classId: string;
    class?: {
      id: string;
      name: string;
      code: string;
      level: string;
      academicYear: string;
    };
    teacher: {
      id: string;
      user: {
        name: string;
        email: string;
      };
    };
  };
  createdBy: {
    id: string;
    name: string;
    email: string;
  };
  submissions: Array<{
    id: string;
    studentId: string;
    studentName: string;
    studentEmail: string;
    submittedAt: Date;
    lateSubmission: boolean;
    marks: number | null;
    status: string;
    feedback: string | null;
  }>;
}

interface ViewAssignmentClientProps {
  assignment: AssignmentWithRelations;
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

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "full",
    timeStyle: "short",
  }).format(new Date(date));
};

export function ViewAssignmentClient({
  assignment,
}: ViewAssignmentClientProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState<
    (typeof assignment.submissions)[0] | null
  >(null);
  const [openGradeDialog, setOpenGradeDialog] = useState(false);
  const [gradeMarks, setGradeMarks] = useState<number>(0);
  const [gradeFeedback, setGradeFeedback] = useState("");

  const typeColor = TYPE_COLORS[assignment.type];
  const submissionRate = assignment.submissions?.length || 0;
  const gradedCount =
    assignment.submissions?.filter((s) => s.marks !== null).length || 0;
  const averageScore =
    gradedCount > 0
      ? assignment.submissions.reduce((acc, s) => acc + (s.marks || 0), 0) /
        gradedCount
      : 0;

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteAssignment(assignment.id);
      toast.success("Assignment deleted successfully");
      router.push("/dashboard/admin/assignments");
      router.refresh();
    } catch (error) {
      toast.error("Failed to delete assignment");
    } finally {
      setIsDeleting(false);
      setOpenDeleteDialog(false);
    }
  };

  const handleGrade = async () => {
    if (!selectedSubmission) return;

    setIsDeleting(true);
    try {
      await gradeSubmission(selectedSubmission.id, {
        marks: gradeMarks,
        feedback: gradeFeedback || undefined,
        gradedById: "current-user-id", // Replace with actual user ID
      });
      toast.success("Submission graded successfully");
      setOpenGradeDialog(false);
      router.refresh();
    } catch (error) {
      toast.error("Failed to grade submission");
    } finally {
      setIsDeleting(false);
    }
  };

  // Safe access to class data with optional chaining
  const className = assignment.subject?.class?.name || "Not assigned";
  const classCode = assignment.subject?.class?.code || "";
  const classLevel = assignment.subject?.class?.level || "";

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-1">
            <ClipboardList className="w-5 h-5 text-amber-500" />
            <span className="text-xs font-black uppercase tracking-wider text-amber-600 dark:text-amber-400">
              Assignment Details
            </span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-black tracking-tighter bg-gradient-to-r from-purple-600 to-amber-600 bg-clip-text text-transparent">
                {assignment.title}
              </h1>
              <p className="text-muted-foreground text-sm mt-1">
                {assignment.description || "No description provided"}
              </p>
            </div>
            <div className="flex gap-3">
              <Link href="/dashboard/admin/assignments">
                <Button variant="outline" className="rounded-full">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              </Link>
              <Link href={`/dashboard/admin/assignments/${assignment.id}/edit`}>
                <Button
                  variant="outline"
                  className="rounded-full border-blue-300 text-blue-600 hover:bg-blue-50"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </Button>
              </Link>
              <Button
                onClick={() => setOpenDeleteDialog(true)}
                variant="outline"
                className="rounded-full border-red-300 text-red-600 hover:bg-red-50"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </Button>
            </div>
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Type</p>
                  <Badge className={cn("mt-1", typeColor)}>
                    {assignment.type}
                  </Badge>
                </div>
                <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-950/40 flex items-center justify-center">
                  <ClipboardList className="w-5 h-5 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Due Date</p>
                  <p className="text-sm font-medium mt-1">
                    {formatDate(assignment.dueDate)}
                  </p>
                </div>
                <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-950/40 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-amber-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Marks</p>
                  <p className="text-2xl font-black">{assignment.totalMarks}</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-950/40 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Submissions</p>
                  <p className="text-2xl font-black">{submissionRate}</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-950/40 flex items-center justify-center">
                  <Users className="w-5 h-5 text-emerald-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="details" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-3 rounded-full bg-slate-100 dark:bg-slate-800 p-1">
            <TabsTrigger
              value="details"
              className="rounded-full data-[state=active]:bg-purple-600 data-[state=active]:text-white"
            >
              Details
            </TabsTrigger>
            <TabsTrigger
              value="submissions"
              className="rounded-full data-[state=active]:bg-purple-600 data-[state=active]:text-white"
            >
              Submissions
            </TabsTrigger>
            <TabsTrigger
              value="statistics"
              className="rounded-full data-[state=active]:bg-purple-600 data-[state=active]:text-white"
            >
              Statistics
            </TabsTrigger>
          </TabsList>

          {/* Details Tab */}
          <TabsContent value="details">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Assignment Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm font-black text-muted-foreground">
                      Title
                    </p>
                    <p className="text-base">{assignment.title}</p>
                  </div>
                  <div>
                    <p className="text-sm font-black text-muted-foreground">
                      Description
                    </p>
                    <p className="text-base text-muted-foreground">
                      {assignment.description || "No description"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-black text-muted-foreground">
                      Instructions
                    </p>
                    <p className="text-base text-muted-foreground whitespace-pre-wrap">
                      {assignment.instructions || "No instructions"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-black text-muted-foreground">
                      Rubric
                    </p>
                    <p className="text-base text-muted-foreground whitespace-pre-wrap">
                      {assignment.rubric || "No rubric provided"}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Subject & Class</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-sm font-black text-muted-foreground">
                        Subject
                      </p>
                      <p className="text-base font-medium">
                        {assignment.subject?.name || "Unknown"}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {assignment.subject?.code || ""}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-black text-muted-foreground">
                        Class
                      </p>
                      <p className="text-base font-medium">{className}</p>
                      <p className="text-sm text-muted-foreground">
                        {classCode} • {classLevel}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-black text-muted-foreground">
                        Teacher
                      </p>
                      <p className="text-base font-medium">
                        {assignment.subject?.teacher?.user?.name || "Unknown"}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {assignment.subject?.teacher?.user?.email || ""}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Attachments</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {!assignment.attachments ||
                    assignment.attachments.length === 0 ? (
                      <p className="text-muted-foreground">No attachments</p>
                    ) : (
                      <div className="space-y-2">
                        {assignment.attachments.map((url, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-2 bg-slate-50 dark:bg-slate-800/50 rounded-lg"
                          >
                            <span className="text-sm truncate flex-1">
                              {url}
                            </span>
                            <Button variant="ghost" size="sm" asChild>
                              <a
                                href={url}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <Download className="w-4 h-4" />
                              </a>
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Submissions Tab */}
          <TabsContent value="submissions">
            <Card>
              <CardHeader>
                <CardTitle>Student Submissions</CardTitle>
                <CardDescription>
                  View and grade student submissions
                </CardDescription>
              </CardHeader>
              <CardContent>
                {!assignment.submissions ||
                assignment.submissions.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <Users className="w-12 h-12 mx-auto mb-3 opacity-30" />
                    <p>No submissions yet</p>
                    <p className="text-sm">
                      Submissions will appear here once students submit their
                      work
                    </p>
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Student</TableHead>
                        <TableHead>Submitted</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Marks</TableHead>
                        <TableHead className="w-12"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {assignment.submissions.map((submission) => (
                        <TableRow key={submission.id}>
                          <TableCell>
                            <div>
                              <p className="font-medium">
                                {submission.studentName}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {submission.studentEmail}
                              </p>
                            </div>
                          </TableCell>
                          <TableCell className="text-sm">
                            {formatDate(submission.submittedAt)}
                            {submission.lateSubmission && (
                              <Badge
                                variant="outline"
                                className="ml-2 text-red-600"
                              >
                                Late
                              </Badge>
                            )}
                          </TableCell>
                          <TableCell>
                            <Badge
                              className={cn(
                                submission.status === "GRADED"
                                  ? "bg-green-100 text-green-700"
                                  : "bg-amber-100 text-amber-700",
                              )}
                            >
                              {submission.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {submission.marks !== null ? (
                              <span className="font-black">
                                {submission.marks}/{assignment.totalMarks}
                              </span>
                            ) : (
                              <span className="text-muted-foreground">
                                Not graded
                              </span>
                            )}
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setSelectedSubmission(submission);
                                setGradeMarks(submission.marks || 0);
                                setGradeFeedback(submission.feedback || "");
                                setOpenGradeDialog(true);
                              }}
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Statistics Tab */}
          <TabsContent value="statistics">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Submission Statistics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Submission Rate</span>
                      <span className="text-sm font-black">
                        {submissionRate}
                      </span>
                    </div>
                    <Progress
                      value={(submissionRate / 20) * 100}
                      className="h-2"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Graded</span>
                      <span className="text-sm font-black">{gradedCount}</span>
                    </div>
                    <Progress
                      value={(gradedCount / submissionRate) * 100}
                      className="h-2"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Average Score</span>
                      <span className="text-sm font-black">
                        {Math.round(averageScore)}%
                      </span>
                    </div>
                    <Progress value={averageScore} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Score Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  {gradedCount === 0 ? (
                    <p className="text-center text-muted-foreground py-8">
                      No graded submissions yet
                    </p>
                  ) : (
                    <div className="space-y-2">
                      {[
                        {
                          range: "90-100%",
                          count: assignment.submissions.filter(
                            (s) =>
                              (s.marks || 0) / assignment.totalMarks >= 0.9,
                          ).length,
                        },
                        {
                          range: "75-89%",
                          count: assignment.submissions.filter((s) => {
                            const pct = (s.marks || 0) / assignment.totalMarks;
                            return pct >= 0.75 && pct < 0.9;
                          }).length,
                        },
                        {
                          range: "60-74%",
                          count: assignment.submissions.filter((s) => {
                            const pct = (s.marks || 0) / assignment.totalMarks;
                            return pct >= 0.6 && pct < 0.75;
                          }).length,
                        },
                        {
                          range: "50-59%",
                          count: assignment.submissions.filter((s) => {
                            const pct = (s.marks || 0) / assignment.totalMarks;
                            return pct >= 0.5 && pct < 0.6;
                          }).length,
                        },
                        {
                          range: "Below 50%",
                          count: assignment.submissions.filter(
                            (s) => (s.marks || 0) / assignment.totalMarks < 0.5,
                          ).length,
                        },
                      ].map((item) => (
                        <div key={item.range}>
                          <div className="flex justify-between text-sm">
                            <span>{item.range}</span>
                            <span className="font-black">{item.count}</span>
                          </div>
                          <Progress
                            value={(item.count / gradedCount) * 100}
                            className="h-1.5 mt-1"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Delete Dialog */}
      <Dialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Delete Assignment</DialogTitle>
            <DialogDescription>
            { ` Are you sure you want to delete "${assignment.title}"? This action
              will also delete all student submissions. This action cannot be
              undone.`}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setOpenDeleteDialog(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-700"
            >
              {isDeleting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Delete Assignment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Grade Dialog */}
      <Dialog open={openGradeDialog} onOpenChange={setOpenGradeDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Grade Submission</DialogTitle>
            <DialogDescription>
              {` Grade ${selectedSubmission?.studentName}'s submission`}
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
              disabled={isDeleting}
              className="bg-purple-600 hover:bg-purple-700"
            >
              {isDeleting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Submit Grade
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
