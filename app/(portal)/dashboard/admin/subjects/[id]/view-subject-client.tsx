// app/(portal)/dashboard/admin/subjects/[id]/view-subject-client.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Edit,
  Trash2,
  BookOpen,
  User,
  School,
  Calendar,
  FileText,
  Clock,
  CheckCircle,
  XCircle,
  Loader2,
  Plus,
  Download,
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
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { deleteSubject } from "../../actions/subjects";
import { SubjectCategory } from "@/app/generated/prisma/enums";

interface SubjectWithRelations {
  id: string;
  name: string;
  code: string;
  description: string | null;
  category: SubjectCategory;
  teacherId: string;
  classId: string;
  creditHours: number;
  orderIndex: number;
  createdAt: Date;
  updatedAt: Date;
  teacher: {
    id: string;
    teacherId: string;
    specialization: string | null;
    user: {
      id: string;
      name: string;
      email: string;
      image: string | null;
    };
  };
  class: {
    id: string;
    name: string;
    code: string;
    level: string;
    academicYear: string;
    teacher: {
      user: {
        name: string;
        email: string;
      };
    };
  };
  materials: Array<{
    id: string;
    title: string;
    description: string | null;
    type: string;
    fileUrl: string;
    fileSize: number | null;
    createdAt: Date;
  }>;
  assignments: Array<{
    id: string;
    title: string;
    dueDate: Date;
    totalMarks: number;
    type: string;
    submissions: number;
  }>;
  grades: Array<{
    id: string;
    studentId: string;
    score: number;
    totalScore: number;
    percentage: number;
    studentName: string;
  }>;
}

interface ViewSubjectClientProps {
  subject: SubjectWithRelations;
}

const CATEGORY_COLORS: Record<SubjectCategory, string> = {
  QURAN:
    "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400",
  TAJWEED: "bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400",
  ARABIC:
    "bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400",
  FIQH: "bg-purple-100 text-purple-700 dark:bg-purple-950/40 dark:text-purple-400",
  AQEEDAH: "bg-rose-100 text-rose-700 dark:bg-rose-950/40 dark:text-rose-400",
  SEERAH:
    "bg-orange-100 text-orange-700 dark:bg-orange-950/40 dark:text-orange-400",
  HADITH:
    "bg-indigo-100 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-400",
  AKHLAQ: "bg-teal-100 text-teal-700 dark:bg-teal-950/40 dark:text-teal-400",
  HISTORY: "bg-cyan-100 text-cyan-700 dark:bg-cyan-950/40 dark:text-cyan-400",
  OTHER: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400",
};

const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

const formatDate = (date: Date | null) => {
  if (!date) return "Never";
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
  }).format(new Date(date));
};

export function ViewSubjectClient({ subject }: ViewSubjectClientProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const categoryColor =
    CATEGORY_COLORS[subject.category] || CATEGORY_COLORS.OTHER;

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteSubject(subject.id);
      toast.success("Subject deleted successfully");
      router.push("/dashboard/admin/subjects");
      router.refresh();
    } catch (error) {
      toast.error("Failed to delete subject");
    } finally {
      setIsDeleting(false);
      setOpenDeleteDialog(false);
    }
  };

  const averageGrade =
    subject.grades.length > 0
      ? subject.grades.reduce((acc, g) => acc + g.percentage, 0) /
        subject.grades.length
      : 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-1">
            <BookOpen className="w-5 h-5 text-amber-500" />
            <span className="text-xs font-black uppercase tracking-wider text-amber-600 dark:text-amber-400">
              Curriculum Management
            </span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-black tracking-tighter bg-gradient-to-r from-purple-600 to-amber-600 bg-clip-text text-transparent">
                {subject.name}
              </h1>
              <p className="text-muted-foreground text-sm mt-1">
                Subject Details & Management
              </p>
            </div>
            <div className="flex gap-3">
              <Link href="/dashboard/admin/subjects">
                <Button variant="outline" className="rounded-full">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              </Link>
              <Link href={`/dashboard/admin/subjects/${subject.id}/edit`}>
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
                  <p className="text-sm text-muted-foreground">Category</p>
                  <Badge className={cn("mt-1", categoryColor)}>
                    {subject.category}
                  </Badge>
                </div>
                <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-950/40 flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Credit Hours</p>
                  <p className="text-2xl font-black">{subject.creditHours}</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-950/40 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Materials</p>
                  <p className="text-2xl font-black">
                    {subject.materials.length}
                  </p>
                </div>
                <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-950/40 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-amber-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Average Grade</p>
                  <p className="text-2xl font-black text-emerald-600">
                    {Math.round(averageGrade)}%
                  </p>
                </div>
                <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-950/40 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="details" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-4 rounded-full bg-slate-100 dark:bg-slate-800 p-1">
            <TabsTrigger
              value="details"
              className="rounded-full data-[state=active]:bg-purple-600 data-[state=active]:text-white"
            >
              Details
            </TabsTrigger>
            <TabsTrigger
              value="materials"
              className="rounded-full data-[state=active]:bg-purple-600 data-[state=active]:text-white"
            >
              Materials
            </TabsTrigger>
            <TabsTrigger
              value="assignments"
              className="rounded-full data-[state=active]:bg-purple-600 data-[state=active]:text-white"
            >
              Assignments
            </TabsTrigger>
            <TabsTrigger
              value="grades"
              className="rounded-full data-[state=active]:bg-purple-600 data-[state=active]:text-white"
            >
              Grades
            </TabsTrigger>
          </TabsList>

          {/* Details Tab */}
          <TabsContent value="details">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Subject Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm font-black text-muted-foreground">
                      Name
                    </p>
                    <p className="text-base">{subject.name}</p>
                  </div>
                  <div>
                    <p className="text-sm font-black text-muted-foreground">
                      Code
                    </p>
                    <p className="text-base font-mono">{subject.code}</p>
                  </div>
                  <div>
                    <p className="text-sm font-black text-muted-foreground">
                      Description
                    </p>
                    <p className="text-base text-muted-foreground">
                      {subject.description || "No description provided"}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Assignment Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm font-black text-muted-foreground">
                      Teacher
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className="bg-purple-100 text-purple-600">
                          {getInitials(subject.teacher.user.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">
                          {subject.teacher.user.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {subject.teacher.specialization ||
                            "No specialization"}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-black text-muted-foreground">
                      Class
                    </p>
                    <p className="text-base font-medium">
                      {subject.class.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {subject.class.code} • {subject.class.level}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Teacher: {subject.class.teacher.user.name}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-black text-muted-foreground">
                      Created
                    </p>
                    <p className="text-sm">{formatDate(subject.createdAt)}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Materials Tab */}
          <TabsContent value="materials">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Subject Materials</CardTitle>
                  <CardDescription>
                    Learning resources and materials for this subject
                  </CardDescription>
                </div>
                <Link
                  href={`/dashboard/admin/subjects/${subject.id}/materials/new`}
                >
                  <Button
                    size="sm"
                    className="rounded-full bg-purple-600 hover:bg-purple-700"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Material
                  </Button>
                </Link>
              </CardHeader>
              <CardContent>
                {subject.materials.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <FileText className="w-12 h-12 mx-auto mb-3 opacity-30" />
                    <p>No materials added yet</p>
                    <p className="text-sm">
                      Add learning resources for this subject
                    </p>
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Added</TableHead>
                        <TableHead className="w-12"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {subject.materials.map((material) => (
                        <TableRow key={material.id}>
                          <TableCell>
                            <div>
                              <p className="font-medium">{material.title}</p>
                              {material.description && (
                                <p className="text-xs text-muted-foreground">
                                  {material.description}
                                </p>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{material.type}</Badge>
                          </TableCell>
                          <TableCell className="text-sm">
                            {formatDate(material.createdAt)}
                          </TableCell>
                          <TableCell>
                            <Button variant="ghost" size="icon" asChild>
                              <a
                                href={material.fileUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <Download className="w-4 h-4" />
                              </a>
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

          {/* Assignments Tab */}
          <TabsContent value="assignments">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Assignments</CardTitle>
                  <CardDescription>
                    Tasks and assessments for students
                  </CardDescription>
                </div>
                <Link
                  href={`/dashboard/admin/subjects/${subject.id}/assignments/new`}
                >
                  <Button
                    size="sm"
                    className="rounded-full bg-purple-600 hover:bg-purple-700"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Create Assignment
                  </Button>
                </Link>
              </CardHeader>
              <CardContent>
                {subject.assignments.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <Clock className="w-12 h-12 mx-auto mb-3 opacity-30" />
                    <p>No assignments created yet</p>
                    <p className="text-sm">
                      Create assignments to track student progress
                    </p>
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Due Date</TableHead>
                        <TableHead>Total Marks</TableHead>
                        <TableHead>Submissions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {subject.assignments.map((assignment) => (
                        <TableRow key={assignment.id}>
                          <TableCell className="font-medium">
                            {assignment.title}
                          </TableCell>
                          <TableCell>{assignment.type}</TableCell>
                          <TableCell>
                            {formatDate(assignment.dueDate)}
                          </TableCell>
                          <TableCell>{assignment.totalMarks}</TableCell>
                          <TableCell>
                            <Badge variant="secondary">
                              {assignment.submissions} submitted
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Grades Tab */}
          <TabsContent value="grades">
            <Card>
              <CardHeader>
                <CardTitle>Student Grades</CardTitle>
                <CardDescription>
                  Performance records for this subject
                </CardDescription>
              </CardHeader>
              <CardContent>
                {subject.grades.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <CheckCircle className="w-12 h-12 mx-auto mb-3 opacity-30" />
                    <p>No grades recorded yet</p>
                    <p className="text-sm">
                      Grades will appear here once assessments are completed
                    </p>
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Student</TableHead>
                        <TableHead>Score</TableHead>
                        <TableHead>Total</TableHead>
                        <TableHead>Percentage</TableHead>
                        <TableHead>Grade</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {subject.grades.map((grade) => (
                        <TableRow key={grade.id}>
                          <TableCell className="font-medium">
                            {grade.studentName}
                          </TableCell>
                          <TableCell>{grade.score}</TableCell>
                          <TableCell>{grade.totalScore}</TableCell>
                          <TableCell>
                            <span
                              className={cn(
                                "font-black",
                                grade.percentage >= 80
                                  ? "text-green-600"
                                  : grade.percentage >= 60
                                    ? "text-amber-600"
                                    : grade.percentage >= 40
                                      ? "text-orange-600"
                                      : "text-red-600",
                              )}
                            >
                              {Math.round(grade.percentage)}%
                            </span>
                          </TableCell>
                          <TableCell>
                            {grade.percentage >= 90
                              ? "A"
                              : grade.percentage >= 80
                                ? "B"
                                : grade.percentage >= 70
                                  ? "C"
                                  : grade.percentage >= 60
                                    ? "D"
                                    : "F"}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Delete Dialog */}
      <Dialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Delete Subject</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{subject.name}"? This action will
              also delete all associated materials, assignments, and grades.
              This action cannot be undone.
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
              Delete Subject
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
