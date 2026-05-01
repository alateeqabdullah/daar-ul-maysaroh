// app/(portal)/dashboard/admin/assignments/assignments-client.tsx
"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import {
  ClipboardList,
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
  FileText,
  Clock,
  TrendingUp,
  Users,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import {
  deleteAssignment,
  bulkDeleteAssignments,
  getAssignments,
} from "../actions/assignments";
import { AssignmentType } from "@/app/generated/prisma/enums";

// Types
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
  createdBy: {
    id: string;
    name: string;
    email: string;
  };
  _count?: {
    submissions: number;
  };
}

interface Stats {
  totalAssignments: number;
  pendingAssignments: number;
  completedAssignments: number;
  overdueAssignments: number;
  averageScore: number;
  submissionRate: number;
  byType: Record<AssignmentType, number>;
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

interface AssignmentsClientProps {
  initialAssignments: AssignmentWithRelations[];
  initialStats: Stats;
  initialPage: number;
  initialSearch?: string;
  initialSubjectId?: string;
  initialClassId?: string;
  initialType?: string;
  totalPages: number;
  totalAssignments: number;
  types: string[];
  subjects: Subject[];
  classes: Class[];
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

const getStatusBadge = (dueDate: Date, submissions: number) => {
  const now = new Date();
  const isOverdue = new Date(dueDate) < now;

  if (submissions > 0) {
    return {
      label: "Has Submissions",
      color:
        "bg-green-100 text-green-700 dark:bg-green-950/40 dark:text-green-400",
      icon: CheckCircle,
    };
  }
  if (isOverdue) {
    return {
      label: "Overdue",
      color: "bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-400",
      icon: AlertCircle,
    };
  }
  return {
    label: "Pending",
    color:
      "bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400",
    icon: Clock,
  };
};

const formatDate = (date: Date | null) => {
  if (!date) return "Not set";
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
  }).format(new Date(date));
};

const isOverdue = (dueDate: Date) => {
  return new Date(dueDate) < new Date();
};

export function AssignmentsClient({
  initialAssignments,
  initialStats,
  initialPage,
  initialSearch,
  initialSubjectId,
  initialClassId,
  initialType,
  totalPages: initialTotalPages,
  totalAssignments: initialTotalAssignments,
  types,
  subjects,
  classes,
}: AssignmentsClientProps) {
  const router = useRouter();
  const pathname = usePathname();

  // Data states
  const [assignments, setAssignments] = useState(initialAssignments);
  const [stats] = useState(initialStats);
  const [totalPages, setTotalPages] = useState(initialTotalPages);
  const [totalAssignmentsCount, setTotalAssignmentsCount] = useState(
    initialTotalAssignments,
  );
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isActionLoading, setIsActionLoading] = useState(false);

  // Selection states
  const [selectedAssignments, setSelectedAssignments] = useState<Set<string>>(
    new Set(),
  );

  // Dialog states
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedAssignment, setSelectedAssignment] =
    useState<AssignmentWithRelations | null>(null);

  // Filter states
  const [page, setPage] = useState(initialPage);
  const [search, setSearch] = useState(initialSearch || "");
  const [searchInput, setSearchInput] = useState(initialSearch || "");
  const [subjectId, setSubjectId] = useState(initialSubjectId || "all");
  const [classId, setClassId] = useState(initialClassId || "all");
  const [type, setType] = useState(initialType || "all");

  const hasAssignments = assignments && assignments.length > 0;

  // Fetch assignments using server action
  const fetchAssignments = useCallback(async () => {
    setIsRefreshing(true);
    try {
      const result = await getAssignments({
        page,
        limit: 10,
        search: search || undefined,
        subjectId: subjectId !== "all" ? subjectId : undefined,
        classId: classId !== "all" ? classId : undefined,
        type: type !== "all" ? (type as AssignmentType) : undefined,
      });

      setAssignments(result.data);
      setTotalPages(result.totalPages);
      setTotalAssignmentsCount(result.total);
      setSelectedAssignments(new Set());
    } catch (error) {
      console.error("Error fetching assignments:", error);
      toast.error("Failed to load assignments");
    } finally {
      setIsRefreshing(false);
    }
  }, [page, search, subjectId, classId, type]);

  // Update URL when filters change
  const updateUrl = useCallback(() => {
    const params = new URLSearchParams();
    if (page > 1) params.set("page", page.toString());
    if (search) params.set("search", search);
    if (subjectId !== "all") params.set("subjectId", subjectId);
    if (classId !== "all") params.set("classId", classId);
    if (type !== "all") params.set("type", type);

    const newUrl = `${pathname}${params.toString() ? `?${params.toString()}` : ""}`;
    router.replace(newUrl, { scroll: false });
  }, [page, search, subjectId, classId, type, router, pathname]);

  // Fetch data when filters change
  useEffect(() => {
    fetchAssignments();
  }, [fetchAssignments]);

  // Update URL when filters change (debounced)
  useEffect(() => {
    const timer = setTimeout(() => {
      updateUrl();
    }, 300);
    return () => clearTimeout(timer);
  }, [page, search, subjectId, classId, type, updateUrl]);

  const handleSearch = () => {
    setSearch(searchInput);
    setPage(1);
  };

  const clearFilters = () => {
    setSearchInput("");
    setSearch("");
    setSubjectId("all");
    setClassId("all");
    setType("all");
    setPage(1);
  };

  const handleDeleteAssignment = async (assignmentId: string) => {
    setIsActionLoading(true);
    try {
      await deleteAssignment(assignmentId);
      await fetchAssignments();
      toast.success("Assignment deleted successfully");
      setOpenDeleteDialog(false);
      setSelectedAssignment(null);
    } catch (error) {
      toast.error("Failed to delete assignment");
    } finally {
      setIsActionLoading(false);
    }
  };

  const handleBulkDelete = async () => {
    const ids = Array.from(selectedAssignments);
    if (ids.length === 0) return;

    if (
      !confirm(
        `Delete ${ids.length} assignment(s)? This action cannot be undone.`,
      )
    )
      return;

    setIsActionLoading(true);
    try {
      await bulkDeleteAssignments(ids);
      await fetchAssignments();
      setSelectedAssignments(new Set());
      toast.success(`${ids.length} assignment(s) deleted successfully`);
    } catch (error) {
      toast.error("Failed to delete assignments");
    } finally {
      setIsActionLoading(false);
    }
  };

  const toggleSelectAll = () => {
    if (!hasAssignments) return;

    if (selectedAssignments.size === assignments.length) {
      setSelectedAssignments(new Set());
    } else {
      setSelectedAssignments(new Set(assignments.map((a) => a.id)));
    }
  };

  const toggleSelectAssignment = (id: string) => {
    const newSelected = new Set(selectedAssignments);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedAssignments(newSelected);
  };

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
        <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-1">
              <ClipboardList className="w-5 h-5 text-amber-500" />
              <span className="text-xs font-black uppercase tracking-wider text-amber-600 dark:text-amber-400">
                Assignment Management
              </span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-3xl sm:text-4xl font-black tracking-tighter bg-gradient-to-r from-purple-600 to-amber-600 bg-clip-text text-transparent">
                  Assignments
                </h1>
                <p className="text-muted-foreground text-sm mt-1">
                  Manage assignments, grade submissions, and track student
                  performance
                </p>
              </div>
              <Link href="/dashboard/admin/assignments/new">
                <Button className="rounded-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 shadow-md">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Assignment
                </Button>
              </Link>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Card className="border-purple-200 dark:border-purple-800">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Total Assignments
                    </p>
                    <p className="text-3xl font-black">
                      {stats.totalAssignments}
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-950/40 flex items-center justify-center">
                    <ClipboardList className="w-5 h-5 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-amber-200 dark:border-amber-800">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Pending</p>
                    <p className="text-3xl font-black text-amber-600">
                      {stats.pendingAssignments}
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-950/40 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-amber-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-red-200 dark:border-red-800">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Overdue</p>
                    <p className="text-3xl font-black text-red-600">
                      {stats.overdueAssignments}
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-950/40 flex items-center justify-center">
                    <AlertCircle className="w-5 h-5 text-red-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-emerald-200 dark:border-emerald-800">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Avg. Score</p>
                    <p className="text-3xl font-black text-emerald-600">
                      {stats.averageScore}%
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-950/40 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-emerald-600" />
                  </div>
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
          {selectedAssignments.size > 0 && (
            <div className="bg-purple-50 dark:bg-purple-950/30 rounded-xl p-4 mb-6 flex flex-wrap items-center justify-between gap-4 border border-purple-200 dark:border-purple-800">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-purple-600" />
                <span className="text-sm font-black">
                  {selectedAssignments.size} assignment(s) selected
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleBulkDelete}
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
                    placeholder="Search by title..."
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                    className="pl-9 rounded-full"
                  />
                </div>
                <Select value={subjectId} onValueChange={setSubjectId}>
                  <SelectTrigger className="w-full sm:w-44 rounded-full">
                    <SelectValue placeholder="Subject" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Subjects</SelectItem>
                    {subjects.map((s) => (
                      <SelectItem key={s.id} value={s.id}>
                        {s.name} ({s.code})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={classId} onValueChange={setClassId}>
                  <SelectTrigger className="w-full sm:w-44 rounded-full">
                    <SelectValue placeholder="Class" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Classes</SelectItem>
                    {classes.map((c) => (
                      <SelectItem key={c.id} value={c.id}>
                        {c.name} ({c.code})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={type} onValueChange={setType}>
                  <SelectTrigger className="w-full sm:w-36 rounded-full">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    {types.map((t) => (
                      <SelectItem key={t} value={t}>
                        {t}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button
                  onClick={handleSearch}
                  className="rounded-full px-6 bg-purple-600 hover:bg-purple-700"
                >
                  <Search className="w-4 h-4 mr-2" />
                  Search
                </Button>
                {(subjectId !== "all" ||
                  classId !== "all" ||
                  type !== "all" ||
                  search) && (
                  <Button
                    onClick={clearFilters}
                    variant="outline"
                    className="rounded-full"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Clear
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Assignments Table */}
          <Card>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-slate-50 dark:bg-slate-800/50">
                  <TableRow>
                    <TableHead className="w-12">
                      <input
                        type="checkbox"
                        checked={
                          hasAssignments
                            ? selectedAssignments.size === assignments.length
                            : false
                        }
                        onChange={toggleSelectAll}
                        disabled={isRefreshing || !hasAssignments}
                        className="w-4 h-4 rounded border-slate-300"
                      />
                    </TableHead>
                    <TableHead>Assignment</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Class</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Submissions</TableHead>
                    <TableHead className="w-12"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {!hasAssignments ? (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-12">
                        <div className="flex flex-col items-center gap-2">
                          <ClipboardList className="w-12 h-12 text-muted-foreground/30" />
                          <p className="text-muted-foreground">
                            No assignments found
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
                    assignments.map((assignment) => {
                      const typeColor =
                        TYPE_COLORS[assignment.type] || TYPE_COLORS.OTHER;
                      const status = getStatusBadge(
                        assignment.dueDate,
                        assignment._count?.submissions || 0,
                      );
                      const StatusIcon = status.icon;
                      const isAssignmentOverdue = isOverdue(assignment.dueDate);

                      return (
                        <TableRow
                          key={assignment.id}
                          className="hover:bg-slate-50 dark:hover:bg-slate-800/50"
                        >
                          <TableCell>
                            <input
                              type="checkbox"
                              checked={selectedAssignments.has(assignment.id)}
                              onChange={() =>
                                toggleSelectAssignment(assignment.id)
                              }
                              disabled={isRefreshing}
                              className="w-4 h-4 rounded border-slate-300"
                            />
                          </TableCell>
                          <TableCell>
                            <div>
                              <p className="font-black text-sm">
                                {assignment.title}
                              </p>
                              <p className="text-xs text-muted-foreground line-clamp-1">
                                {assignment.description || "No description"}
                              </p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <p className="text-sm font-medium">
                                {assignment.subject.name}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {assignment.subject.code}
                              </p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <p className="text-sm font-medium">
                                {assignment.subject.class.name}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {assignment.subject.class.level}
                              </p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div
                              className={cn(
                                "flex items-center gap-2",
                                isAssignmentOverdue && "text-red-600",
                              )}
                            >
                              <Calendar className="w-3.5 h-3.5" />
                              <span className="text-sm font-medium">
                                {formatDate(assignment.dueDate)}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <StatusIcon className="w-3.5 h-3.5" />
                              <span
                                className={cn(
                                  "text-xs font-black",
                                  status.color,
                                )}
                              >
                                {status.label}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Users className="w-3.5 h-3.5 text-muted-foreground" />
                              <span className="text-sm font-black">
                                {assignment._count?.submissions || 0}
                              </span>
                            </div>
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
                                    href={`/dashboard/admin/assignments/${assignment.id}`}
                                  >
                                    <Eye className="w-4 h-4 mr-2" />
                                    View Details
                                  </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                  <Link
                                    href={`/dashboard/admin/assignments/${assignment.id}/submissions`}
                                  >
                                    <Users className="w-4 h-4 mr-2" />
                                    View Submissions
                                  </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                  <Link
                                    href={`/dashboard/admin/assignments/${assignment.id}/edit`}
                                  >
                                    <Edit className="w-4 h-4 mr-2" />
                                    Edit Assignment
                                  </Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                  onClick={() => {
                                    setSelectedAssignment(assignment);
                                    setOpenDeleteDialog(true);
                                  }}
                                  className="text-red-600"
                                >
                                  <Trash2 className="w-4 h-4 mr-2" />
                                  Delete Assignment
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
                  Page {page} of {totalPages} • {totalAssignmentsCount} total
                  assignments
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
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Delete Assignment</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{selectedAssignment?.title}"?
              This action will also delete all student submissions. This action
              cannot be undone.
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
              onClick={() => handleDeleteAssignment(selectedAssignment!.id)}
              disabled={isActionLoading}
              className="bg-red-600 hover:bg-red-700"
            >
              {isActionLoading && (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              )}
              Delete Assignment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </TooltipProvider>
  );
}
