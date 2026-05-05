// app/(portal)/dashboard/admin/grades/grades-client.tsx
"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import {
  GraduationCap,
  Search,
  X,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  Calendar,
  BookOpen,
  School,
  Loader2,
  CheckCircle,
  XCircle,
  Eye,
  Edit,
  Trash2,
  Plus,
  TrendingUp,
  Users,
  Award,
  FileText,
  Download,
  Filter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import {
  deleteGrade,
  publishGrade,
  unpublishGrade,
  bulkDeleteGrades,
  bulkPublishGrades,
  getGrades,
} from "../actions/grades";
import { ExamType } from "@/app/generated/prisma/enums";

// Types
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

interface Stats {
  totalGrades: number;
  publishedGrades: number;
  averageScore: number;
  passRate: number;
  byExamType: Record<ExamType, number>;
  gradeDistribution: {
    A: number;
    B: number;
    C: number;
    D: number;
    F: number;
  };
  topPerformers: {
    studentId: string;
    studentName: string;
    averageScore: number;
  }[];
}

interface Subject {
  id: string;
  name: string;
  code: string;
  category: string;
}

interface Class {
  id: string;
  name: string;
  code: string;
  level: string;
}

interface Student {
  id: string;
  name: string;
  email: string;
  studentId: string;
}

interface GradeRange {
  label: string;
  min: number;
  max: number;
}

interface GradesClientProps {
  initialGrades: GradeWithRelations[];
  initialStats: Stats;
  initialPage: number;
  initialSearch?: string;
  initialStudentId?: string;
  initialSubjectId?: string;
  initialClassId?: string;
  initialExamType?: string;
  initialMinScore?: number;
  initialMaxScore?: number;
  totalPages: number;
  totalGrades: number;
  examTypes: string[];
  gradeRanges: GradeRange[];
  subjects: Subject[];
  classes: Class[];
  students: Student[];
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

const getInitials = (name: string) => {
  if (!name) return "??";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

const formatDate = (date: Date | null) => {
  if (!date) return "Not set";
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
  }).format(new Date(date));
};

export function GradesClient({
  initialGrades,
  initialStats,
  initialPage,
  initialSearch,
  initialStudentId,
  initialSubjectId,
  initialClassId,
  initialExamType,
  initialMinScore,
  initialMaxScore,
  totalPages: initialTotalPages,
  totalGrades: initialTotalGrades,
  examTypes,
  gradeRanges,
  subjects,
  classes,
  students,
}: GradesClientProps) {
  const router = useRouter();
  const pathname = usePathname();

  // Data states
  const [grades, setGrades] = useState(initialGrades);
  const [stats] = useState(initialStats);
  const [totalPages, setTotalPages] = useState(initialTotalPages);
  const [totalGradesCount, setTotalGradesCount] = useState(initialTotalGrades);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isActionLoading, setIsActionLoading] = useState(false);

  // Selection states
  const [selectedGrades, setSelectedGrades] = useState<Set<string>>(new Set());

  // Dialog states
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedGrade, setSelectedGrade] = useState<GradeWithRelations | null>(
    null,
  );

  // Filter states
  const [page, setPage] = useState(initialPage);
  const [search, setSearch] = useState(initialSearch || "");
  const [searchInput, setSearchInput] = useState(initialSearch || "");
  const [studentId, setStudentId] = useState(initialStudentId || "all");
  const [subjectId, setSubjectId] = useState(initialSubjectId || "all");
  const [classId, setClassId] = useState(initialClassId || "all");
  const [examType, setExamType] = useState(initialExamType || "all");
  const [minScore, setMinScore] = useState<number | undefined>(initialMinScore);
  const [maxScore, setMaxScore] = useState<number | undefined>(initialMaxScore);
  const [showFilters, setShowFilters] = useState(false);

  const hasGrades = grades && grades.length > 0;

  // Fetch grades using server action
  const fetchGrades = useCallback(async () => {
    setIsRefreshing(true);
    try {
      const result = await getGrades({
        page,
        limit: 10,
        search: search || undefined,
        studentId: studentId !== "all" ? studentId : undefined,
        subjectId: subjectId !== "all" ? subjectId : undefined,
        classId: classId !== "all" ? classId : undefined,
        examType: examType !== "all" ? (examType as ExamType) : undefined,
        minScore,
        maxScore,
      });

      setGrades(result.data);
      setTotalPages(result.totalPages);
      setTotalGradesCount(result.total);
      setSelectedGrades(new Set());
    } catch (error) {
      console.error("Error fetching grades:", error);
      toast.error("Failed to load grades");
    } finally {
      setIsRefreshing(false);
    }
  }, [
    page,
    search,
    studentId,
    subjectId,
    classId,
    examType,
    minScore,
    maxScore,
  ]);

  // Update URL when filters change
  const updateUrl = useCallback(() => {
    const params = new URLSearchParams();
    if (page > 1) params.set("page", page.toString());
    if (search) params.set("search", search);
    if (studentId !== "all") params.set("studentId", studentId);
    if (subjectId !== "all") params.set("subjectId", subjectId);
    if (classId !== "all") params.set("classId", classId);
    if (examType !== "all") params.set("examType", examType);
    if (minScore !== undefined) params.set("minScore", minScore.toString());
    if (maxScore !== undefined) params.set("maxScore", maxScore.toString());

    const newUrl = `${pathname}${params.toString() ? `?${params.toString()}` : ""}`;
    router.replace(newUrl, { scroll: false });
  }, [
    page,
    search,
    studentId,
    subjectId,
    classId,
    examType,
    minScore,
    maxScore,
    router,
    pathname,
  ]);

  // Fetch data when filters change
  useEffect(() => {
    fetchGrades();
  }, [fetchGrades]);

  // Update URL when filters change (debounced)
  useEffect(() => {
    const timer = setTimeout(() => {
      updateUrl();
    }, 300);
    return () => clearTimeout(timer);
  }, [
    page,
    search,
    studentId,
    subjectId,
    classId,
    examType,
    minScore,
    maxScore,
    updateUrl,
  ]);

  const handleSearch = () => {
    setSearch(searchInput);
    setPage(1);
  };

  const clearFilters = () => {
    setSearchInput("");
    setSearch("");
    setStudentId("all");
    setSubjectId("all");
    setClassId("all");
    setExamType("all");
    setMinScore(undefined);
    setMaxScore(undefined);
    setPage(1);
  };

  const handleDeleteGrade = async (gradeId: string) => {
    setIsActionLoading(true);
    try {
      await deleteGrade(gradeId);
      await fetchGrades();
      toast.success("Grade deleted successfully");
      setOpenDeleteDialog(false);
      setSelectedGrade(null);
    } catch (error) {
      toast.error("Failed to delete grade");
    } finally {
      setIsActionLoading(false);
    }
  };

  const handlePublishGrade = async (
    gradeId: string,
    currentStatus: boolean,
  ) => {
    setIsActionLoading(true);
    try {
      if (currentStatus) {
        await unpublishGrade(gradeId);
        toast.success("Grade unpublished");
      } else {
        await publishGrade(gradeId);
        toast.success("Grade published");
      }
      await fetchGrades();
    } catch (error) {
      toast.error("Failed to update grade status");
    } finally {
      setIsActionLoading(false);
    }
  };

  const handleBulkAction = async (action: "publish" | "delete") => {
    const ids = Array.from(selectedGrades);
    if (ids.length === 0) return;

    let confirmMessage = "";
    let actionFn: any;

    switch (action) {
      case "publish":
        confirmMessage = `Publish ${ids.length} grade(s)? Students will be able to see them.`;
        actionFn = bulkPublishGrades;
        break;
      case "delete":
        confirmMessage = `Delete ${ids.length} grade(s)? This action cannot be undone.`;
        actionFn = bulkDeleteGrades;
        break;
    }

    if (!confirm(confirmMessage)) return;

    setIsActionLoading(true);
    try {
      await actionFn(ids);
      await fetchGrades();
      setSelectedGrades(new Set());
      toast.success(`${ids.length} grade(s) ${action}ed successfully`);
    } catch (error) {
      toast.error(`Failed to ${action} grades`);
    } finally {
      setIsActionLoading(false);
    }
  };

  const toggleSelectAll = () => {
    if (!hasGrades) return;

    if (selectedGrades.size === grades.length) {
      setSelectedGrades(new Set());
    } else {
      setSelectedGrades(new Set(grades.map((g) => g.id)));
    }
  };

  const toggleSelectGrade = (id: string) => {
    const newSelected = new Set(selectedGrades);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedGrades(newSelected);
  };

  const getScoreColor = (percentage: number) => {
    if (percentage >= 90) return "text-emerald-600";
    if (percentage >= 80) return "text-blue-600";
    if (percentage >= 70) return "text-amber-600";
    if (percentage >= 60) return "text-orange-600";
    return "text-red-600";
  };

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
        <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-1">
              <GraduationCap className="w-5 h-5 text-amber-500" />
              <span className="text-xs font-black uppercase tracking-wider text-amber-600 dark:text-amber-400">
                Grade Management
              </span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-3xl sm:text-4xl font-black tracking-tighter bg-gradient-to-r from-purple-600 to-amber-600 bg-clip-text text-transparent">
                  Student Grades
                </h1>
                <p className="text-muted-foreground text-sm mt-1">
                  Manage student grades, track performance, and generate reports
                </p>
              </div>
              <Link href="/dashboard/admin/grades/new">
                <Button className="rounded-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 shadow-md">
                  <Plus className="w-4 h-4 mr-2" />
                  Enter Grade
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
                      Total Grades
                    </p>
                    <p className="text-2xl font-black">{stats.totalGrades}</p>
                  </div>
                  <GraduationCap className="w-5 h-5 text-purple-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Published</p>
                    <p className="text-2xl font-black text-green-600">
                      {stats.publishedGrades}
                    </p>
                  </div>
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Avg. Score</p>
                    <p className="text-2xl font-black text-blue-600">
                      {Math.round(stats.averageScore)}%
                    </p>
                  </div>
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Pass Rate</p>
                    <p className="text-2xl font-black text-emerald-600">
                      {Math.round(stats.passRate)}%
                    </p>
                  </div>
                  <Award className="w-5 h-5 text-emerald-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Top Students
                    </p>
                    <p className="text-2xl font-black">
                      {stats.topPerformers.length}
                    </p>
                  </div>
                  <Users className="w-5 h-5 text-amber-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Loading Overlay */}
          {(isRefreshing || isActionLoading) && (
            <div className="fixed inset-0 bg-black/20 z-50 flex items-center justify-center pointer-events-none">
              <div className="bg-white dark:bg-slate-900 rounded-full p-3 shadow-lg">
                <Loader2 className="w-6 h-6 animate-spin text-purple-600" />
              </div>
            </div>
          )}

          {/* Bulk Actions Bar */}
          {selectedGrades.size > 0 && (
            <div className="bg-purple-50 dark:bg-purple-950/30 rounded-xl p-4 mb-6 flex flex-wrap items-center justify-between gap-4 border border-purple-200 dark:border-purple-800">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-purple-600" />
                <span className="text-sm font-black">
                  {selectedGrades.size} grade(s) selected
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleBulkAction("publish")}
                  disabled={isActionLoading}
                  className="border-emerald-300 text-emerald-600 hover:bg-emerald-50"
                >
                  <CheckCircle className="w-4 h-4 mr-1" />
                  Publish Selected
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleBulkAction("delete")}
                  disabled={isActionLoading}
                  className="border-red-300 text-red-600 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4 mr-1" />
                  Delete Selected
                </Button>
              </div>
            </div>
          )}

          {/* Filters */}
          <Card className="mb-6">
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by student name..."
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                    className="pl-9 rounded-full"
                  />
                </div>
                <Select value={studentId} onValueChange={setStudentId}>
                  <SelectTrigger className="w-full sm:w-48 rounded-full">
                    <SelectValue placeholder="Student" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Students</SelectItem>
                    {students.map((s) => (
                      <SelectItem key={s.id} value={s.id}>
                        {s.name} ({s.studentId})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className="rounded-full"
                >
                  <Filter className="w-4 h-4 mr-2" />
                  More Filters
                </Button>
                <Button
                  onClick={handleSearch}
                  className="rounded-full px-6 bg-purple-600 hover:bg-purple-700"
                >
                  <Search className="w-4 h-4 mr-2" />
                  Search
                </Button>
              </div>

              {/* Expanded Filters */}
              {showFilters && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4 pt-4 border-t">
                  <div className="space-y-2">
                    <Label>Subject</Label>
                    <Select value={subjectId} onValueChange={setSubjectId}>
                      <SelectTrigger>
                        <SelectValue placeholder="All Subjects" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Subjects</SelectItem>
                        {subjects.map((s) => (
                          <SelectItem key={s.id} value={s.id}>
                            {s.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Class</Label>
                    <Select value={classId} onValueChange={setClassId}>
                      <SelectTrigger>
                        <SelectValue placeholder="All Classes" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Classes</SelectItem>
                        {classes.map((c) => (
                          <SelectItem key={c.id} value={c.id}>
                            {c.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Exam Type</Label>
                    <Select value={examType} onValueChange={setExamType}>
                      <SelectTrigger>
                        <SelectValue placeholder="All Types" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        {examTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Score Range</Label>
                    <div className="flex gap-2">
                      <Input
                        type="number"
                        placeholder="Min %"
                        value={minScore || ""}
                        onChange={(e) =>
                          setMinScore(
                            e.target.value
                              ? parseInt(e.target.value)
                              : undefined,
                          )
                        }
                        className="rounded-lg"
                      />
                      <span className="self-center">-</span>
                      <Input
                        type="number"
                        placeholder="Max %"
                        value={maxScore || ""}
                        onChange={(e) =>
                          setMaxScore(
                            e.target.value
                              ? parseInt(e.target.value)
                              : undefined,
                          )
                        }
                        className="rounded-lg"
                      />
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Grades Table */}
          <Card>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-slate-50 dark:bg-slate-800/50">
                  <TableRow>
                    <TableHead className="w-12">
                      <input
                        type="checkbox"
                        checked={
                          hasGrades
                            ? selectedGrades.size === grades.length
                            : false
                        }
                        onChange={toggleSelectAll}
                        disabled={isRefreshing || !hasGrades}
                        className="w-4 h-4 rounded border-slate-300"
                      />
                    </TableHead>
                    <TableHead>Student</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Exam Type</TableHead>
                    <TableHead>Score</TableHead>
                    <TableHead>Grade</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="w-12"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {!hasGrades ? (
                    <TableRow>
                      <TableCell colSpan={9} className="text-center py-12">
                        <div className="flex flex-col items-center gap-2">
                          <GraduationCap className="w-12 h-12 text-muted-foreground/30" />
                          <p className="text-muted-foreground">
                            No grades found
                          </p>
                          <Button
                            onClick={clearFilters}
                            variant="outline"
                            size="sm"
                            className="mt-2"
                          >
                            Clear filters
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    grades.map((grade) => {
                      const examTypeColor =
                        EXAM_TYPE_COLORS[grade.examType] ||
                        EXAM_TYPE_COLORS.ASSIGNMENT;
                      const gradeLetterColor =
                        GRADE_LETTER_COLORS[grade.grade || "F"];
                      const scoreColor = getScoreColor(grade.percentage);

                      return (
                        <TableRow
                          key={grade.id}
                          className="hover:bg-slate-50 dark:hover:bg-slate-800/50"
                        >
                          <TableCell>
                            <input
                              type="checkbox"
                              checked={selectedGrades.has(grade.id)}
                              onChange={() => toggleSelectGrade(grade.id)}
                              disabled={isRefreshing}
                              className="w-4 h-4 rounded border-slate-300"
                            />
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Avatar className="w-8 h-8">
                                <AvatarFallback className="bg-purple-100 text-purple-600 text-xs">
                                  {getInitials(grade.student.user.name)}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-black text-sm">
                                  {grade.student.user.name}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {grade.student.studentId}
                                </p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <p className="font-medium text-sm">
                                {grade.subject.name}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {grade.subject.code}
                              </p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge className={examTypeColor}>
                              {grade.examType}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-col">
                              <span className={cn("font-black", scoreColor)}>
                                {Math.round(grade.percentage)}%
                              </span>
                              <span className="text-xs text-muted-foreground">
                                {grade.score}/{grade.totalScore}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <span
                              className={cn(
                                "font-black text-lg",
                                gradeLetterColor,
                              )}
                            >
                              {grade.grade}
                            </span>
                          </TableCell>
                          <TableCell>
                            {grade.isPublished ? (
                              <Badge className="bg-green-100 text-green-700">
                                Published
                              </Badge>
                            ) : (
                              <Badge
                                variant="outline"
                                className="text-amber-600"
                              >
                                Draft
                              </Badge>
                            )}
                          </TableCell>
                          <TableCell className="text-sm">
                            {formatDate(grade.assessmentDate)}
                          </TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8"
                                  disabled={isActionLoading}
                                >
                                  <MoreHorizontal className="w-4 h-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="w-48">
                                <DropdownMenuItem asChild>
                                  <Link
                                    href={`/dashboard/admin/grades/${grade.id}`}
                                  >
                                    <Eye className="w-4 h-4 mr-2" />
                                    View Details
                                  </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                  <Link
                                    href={`/dashboard/admin/grades/${grade.id}/edit`}
                                  >
                                    <Edit className="w-4 h-4 mr-2" />
                                    Edit Grade
                                  </Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                  onClick={() =>
                                    handlePublishGrade(
                                      grade.id,
                                      grade.isPublished,
                                    )
                                  }
                                  className={
                                    grade.isPublished
                                      ? "text-amber-600"
                                      : "text-green-600"
                                  }
                                >
                                  {grade.isPublished ? (
                                    <>
                                      <XCircle className="w-4 h-4 mr-2" />
                                      Unpublish
                                    </>
                                  ) : (
                                    <>
                                      <CheckCircle className="w-4 h-4 mr-2" />
                                      Publish
                                    </>
                                  )}
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                  onClick={() => {
                                    setSelectedGrade(grade);
                                    setOpenDeleteDialog(true);
                                  }}
                                  className="text-red-600"
                                >
                                  <Trash2 className="w-4 h-4 mr-2" />
                                  Delete Grade
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
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
                  Page {page} of {totalPages} • {totalGradesCount} total grades
                </p>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1 || isRefreshing}
                    className="rounded-full"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Previous
                  </Button>
                  <div className="flex gap-1">
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let pageNum: number;
                      if (totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (page <= 3) {
                        pageNum = i + 1;
                      } else if (page >= totalPages - 2) {
                        pageNum = totalPages - 4 + i;
                      } else {
                        pageNum = page - 2 + i;
                      }
                      return (
                        <Button
                          key={pageNum}
                          variant={page === pageNum ? "default" : "outline"}
                          size="sm"
                          onClick={() => setPage(pageNum)}
                          disabled={isRefreshing}
                          className={`rounded-full w-9 ${page === pageNum ? "bg-purple-600 hover:bg-purple-700" : ""}`}
                        >
                          {pageNum}
                        </Button>
                      );
                    })}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages || isRefreshing}
                    className="rounded-full"
                  >
                    Next
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}
          </Card>

          {/* Performance Overview Section */}
          <div className="mt-8 grid lg:grid-cols-2 gap-6">
            {/* Grade Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Grade Distribution</CardTitle>
                <CardDescription>
                  Overall grade distribution across all assessments
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {Object.entries(stats.gradeDistribution).map(
                  ([grade, count]) => (
                    <div key={grade}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="font-black">Grade {grade}</span>
                        <span className="font-black">{count}</span>
                      </div>
                      <Progress
                        value={(count / stats.totalGrades) * 100}
                        className="h-2"
                      />
                    </div>
                  ),
                )}
              </CardContent>
            </Card>

            {/* Top Performers */}
            <Card>
              <CardHeader>
                <CardTitle>Top Performers</CardTitle>
                <CardDescription>
                  Students with highest average scores
                </CardDescription>
              </CardHeader>
              <CardContent>
                {stats.topPerformers.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">
                    No data available
                  </p>
                ) : (
                  <div className="space-y-3">
                    {stats.topPerformers.map((performer, idx) => (
                      <div
                        key={performer.studentId}
                        className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-amber-500 flex items-center justify-center text-white font-black">
                            {idx + 1}
                          </div>
                          <div>
                            <p className="font-black text-sm">
                              {performer.studentName}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {performer.studentId}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-black text-emerald-600">
                            {Math.round(performer.averageScore)}%
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Average
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
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
              Are you sure you want to delete the grade for{" "}
              <span className="font-bold">
                {selectedGrade?.student.user.name}
              </span>{" "}
              in{" "}
              <span className="font-bold">{selectedGrade?.subject.name}</span>?
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
              onClick={() => handleDeleteGrade(selectedGrade!.id)}
              disabled={isActionLoading}
              className="bg-red-600 hover:bg-red-700"
            >
              {isActionLoading && (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              )}
              Delete Grade
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </TooltipProvider>
  );
}
