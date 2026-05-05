// app/(portal)/dashboard/admin/grades/[id]/view-grade-client.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Edit,
  Trash2,
  GraduationCap,
  BookOpen,
  User,
  Calendar,
  TrendingUp,
  Award,
  CheckCircle,
  XCircle,
  FileText,
  Loader2,
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
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import {
  deleteGrade,
  publishGrade,
  unpublishGrade,
} from "../../actions/grades";
import { ExamType } from "@/app/generated/prisma/enums";

interface GradeWithRelations {
  id: string;
  studentId: string;
  subjectId: string;
  examType: ExamType;
  score: number;
  totalScore: number;
  percentage: number;
  grade: string | null;
  gradePoint: number | null;
  assessmentDate: Date;
  assessedBy: string;
  remarks: string | null;
  isPublished: boolean;
  publishedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
  student: {
    id: string;
    studentId: string;
    user: {
      id: string;
      name: string;
      email: string;
      image: string | null;
    };
  };
  subject: {
    id: string;
    name: string;
    code: string;
    category: string;
    class: {
      id: string;
      name: string;
      code: string;
      level: string;
    };
    teacher: {
      id: string;
      user: {
        name: string;
        email: string;
      };
    };
  };
}

interface ViewGradeClientProps {
  grade: GradeWithRelations;
}

const EXAM_TYPE_COLORS: Record<ExamType, string> = {
  MIDTERM:
    "bg-purple-100 text-purple-700 dark:bg-purple-950/40 dark:text-purple-400",
  FINAL: "bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-400",
  QUIZ: "bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400",
  ASSIGNMENT:
    "bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400",
  RECITATION_TEST:
    "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400",
  MEMORIZATION_TEST:
    "bg-cyan-100 text-cyan-700 dark:bg-cyan-950/40 dark:text-cyan-400",
  ORAL_EXAM: "bg-rose-100 text-rose-700 dark:bg-rose-950/40 dark:text-rose-400",
  WRITTEN_EXAM:
    "bg-indigo-100 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-400",
};

const GRADE_LETTER_COLORS: Record<string, string> = {
  A: "text-emerald-600 dark:text-emerald-400",
  B: "text-blue-600 dark:text-blue-400",
  C: "text-amber-600 dark:text-amber-400",
  D: "text-orange-600 dark:text-orange-400",
  F: "text-red-600 dark:text-red-400",
};

const formatDate = (date: Date | null) => {
  if (!date) return "Not set";
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "full",
    timeStyle: "short",
  }).format(new Date(date));
};

const getInitials = (name: string) => {
  if (!name) return "??";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

export function ViewGradeClient({ grade }: ViewGradeClientProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const examTypeColor = EXAM_TYPE_COLORS[grade.examType];
  const gradeLetterColor = GRADE_LETTER_COLORS[grade.grade || "F"];
  const percentageColor = (() => {
    if (grade.percentage >= 90) return "text-emerald-600";
    if (grade.percentage >= 80) return "text-blue-600";
    if (grade.percentage >= 70) return "text-amber-600";
    if (grade.percentage >= 60) return "text-orange-600";
    return "text-red-600";
  })();

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteGrade(grade.id);
      toast.success("Grade deleted successfully");
      router.push("/dashboard/admin/grades");
      router.refresh();
    } catch (error) {
      toast.error("Failed to delete grade");
    } finally {
      setIsDeleting(false);
      setOpenDeleteDialog(false);
    }
  };

  const handlePublishToggle = async () => {
    try {
      if (grade.isPublished) {
        await unpublishGrade(grade.id);
        toast.success("Grade unpublished");
      } else {
        await publishGrade(grade.id);
        toast.success("Grade published");
      }
      router.refresh();
    } catch (error) {
      toast.error("Failed to update grade status");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-1">
            <GraduationCap className="w-5 h-5 text-amber-500" />
            <span className="text-xs font-black uppercase tracking-wider text-amber-600 dark:text-amber-400">
              Grade Details
            </span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-black tracking-tighter bg-gradient-to-r from-purple-600 to-amber-600 bg-clip-text text-transparent">
                Grade Details
              </h1>
              <p className="text-muted-foreground text-sm mt-1">
                View complete grade information and assessment details
              </p>
            </div>
            <div className="flex gap-3">
              <Link href="/dashboard/admin/grades">
                <Button variant="outline" className="rounded-full">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              </Link>
              <Link href={`/dashboard/admin/grades/${grade.id}/edit`}>
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

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Grade Summary Card */}
            <Card>
              <CardHeader>
                <CardTitle>Grade Summary</CardTitle>
                <CardDescription>Assessment result overview</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                    <p className="text-sm text-muted-foreground">Score</p>
                    <p className="text-2xl font-black">
                      {grade.score} / {grade.totalScore}
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                    <p className="text-sm text-muted-foreground">Percentage</p>
                    <p className={cn("text-2xl font-black", percentageColor)}>
                      {Math.round(grade.percentage)}%
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                    <p className="text-sm text-muted-foreground">
                      Letter Grade
                    </p>
                    <p className={cn("text-2xl font-black", gradeLetterColor)}>
                      {grade.grade || "N/A"}
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                    <p className="text-sm text-muted-foreground">GPA</p>
                    <p className="text-2xl font-black">
                      {grade.gradePoint?.toFixed(2) || "N/A"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Assessment Details Card */}
            <Card>
              <CardHeader>
                <CardTitle>Assessment Details</CardTitle>
                <CardDescription>
                  Information about the assessment
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-black text-muted-foreground">
                      Exam Type
                    </p>
                    <Badge className={cn("mt-1", examTypeColor)}>
                      {grade.examType}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm font-black text-muted-foreground">
                      Assessment Date
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span>{formatDate(grade.assessmentDate)}</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-black text-muted-foreground">
                      Status
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      {grade.isPublished ? (
                        <>
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span className="text-green-600 font-medium">
                            Published
                          </span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-4 h-4 text-amber-600" />
                          <span className="text-amber-600 font-medium">
                            Draft
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-black text-muted-foreground">
                      Recorded By
                    </p>
                    <p className="mt-1">{grade.assessedBy || "Unknown"}</p>
                  </div>
                </div>
                {grade.remarks && (
                  <div>
                    <p className="text-sm font-black text-muted-foreground">
                      Remarks
                    </p>
                    <p className="mt-1 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg italic">
                      {grade.remarks}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Publication History Card */}
            <Card>
              <CardHeader>
                <CardTitle>Publication History</CardTitle>
                <CardDescription>Grade visibility tracking</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-sm text-muted-foreground">Created</span>
                  <span className="text-sm font-medium">
                    {formatDate(grade.createdAt)}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-sm text-muted-foreground">
                    Last Updated
                  </span>
                  <span className="text-sm font-medium">
                    {formatDate(grade.updatedAt)}
                  </span>
                </div>
                {grade.publishedAt && (
                  <div className="flex justify-between items-center py-2">
                    <span className="text-sm text-muted-foreground">
                      Published
                    </span>
                    <span className="text-sm font-medium">
                      {formatDate(grade.publishedAt)}
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Student Information Card */}
            <Card>
              <CardHeader>
                <CardTitle>Student Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3">
                  <Avatar className="w-14 h-14">
                    <AvatarFallback className="bg-gradient-to-br from-purple-600 to-amber-500 text-white text-lg">
                      {getInitials(grade.student.user.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-black text-lg">
                      {grade.student.user.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {grade.student.studentId}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {grade.student.user.email}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Subject Information Card */}
            <Card>
              <CardHeader>
                <CardTitle>Subject Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="font-black text-lg">{grade.subject.name}</p>
                <p className="text-sm text-muted-foreground">
                  Code: {grade.subject.code}
                </p>
                <p className="text-sm text-muted-foreground">
                  Category: {grade.subject.category}
                </p>
                <p className="text-sm text-muted-foreground">
                  Class: {grade.subject.class.name}
                </p>
                <p className="text-sm text-muted-foreground">
                  Class Level: {grade.subject.class.level}
                </p>
                <p className="text-sm text-muted-foreground">
                  Teacher: {grade.subject.teacher.user.name}
                </p>
              </CardContent>
            </Card>

            {/* Actions Card */}
            <Card className="border-purple-200 dark:border-purple-800 bg-gradient-to-br from-purple-50/30 to-amber-50/30 dark:from-purple-950/20 dark:to-amber-950/20">
              <CardHeader>
                <CardTitle>Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  onClick={handlePublishToggle}
                  className={cn(
                    "w-full rounded-lg",
                    grade.isPublished
                      ? "bg-amber-600 hover:bg-amber-700"
                      : "bg-green-600 hover:bg-green-700",
                  )}
                >
                  {grade.isPublished ? (
                    <>
                      <XCircle className="w-4 h-4 mr-2" />
                      Unpublish Grade
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Publish Grade
                    </>
                  )}
                </Button>
                <Link href={`/dashboard/admin/grades/${grade.id}/edit`}>
                  <Button
                    variant="outline"
                    className="w-full rounded-lg border-blue-300 text-blue-600"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Grade
                  </Button>
                </Link>
                <Button
                  onClick={() => setOpenDeleteDialog(true)}
                  variant="outline"
                  className="w-full rounded-lg border-red-300 text-red-600 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete Grade
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Delete Grade</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this grade for{" "}
              <span className="font-bold">{grade.student.user.name}</span> in{" "}
              <span className="font-bold">{grade.subject.name}</span>?
              <br />
              <br />
              This action cannot be undone and will remove the grade from all
              records.
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
              Delete Grade
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
