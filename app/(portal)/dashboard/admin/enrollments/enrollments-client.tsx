// app/(portal)/dashboard/admin/enrollments/enrollments-client.tsx
"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import {
  Users,
  Search,
  X,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  Calendar,
  BookOpen,
  Plus,
  Edit,
  Trash2,
  Eye,
  Loader2,
  CheckCircle,
  XCircle,
  AlertCircle,
  GraduationCap,
  Clock,
  TrendingUp,
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
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import {
  dropEnrollment,
  updateEnrollmentProgress,
  bulkUpdateEnrollmentStatus,
  bulkDeleteEnrollments,
} from "../actions/enrollments";
import { EnrollmentStatus } from "@/app/generated/prisma/enums";

interface Enrollment {
  id: string;
  studentId: string;
  classId: string;
  enrolledAt: Date;
  enrollmentType: string;
  status: EnrollmentStatus;
  progress: number | null;
  student: {
    user: {
      name: string;
      email: string;
      image: string | null;
    };
    studentId: string;
  };
  class: {
    name: string;
    code: string;
    level: string;
  };
}

interface Stats {
  totalEnrollments: number;
  activeEnrollments: number;
  completedEnrollments: number;
  droppedEnrollments: number;
  averageProgress: number;
  completionRate: number;
}

interface EnrollmentsClientProps {
  initialEnrollments: Enrollment[];
  initialStats: Stats;
  initialPage: number;
  totalPages: number;
  totalEnrollments: number;
}

const STATUS_COLORS: Record<
  EnrollmentStatus,
  { bg: string; text: string; dot: string }
> = {
  ACTIVE: {
    bg: "bg-emerald-100 dark:bg-emerald-950/30",
    text: "text-emerald-700 dark:text-emerald-400",
    dot: "bg-emerald-500",
  },
  COMPLETED: {
    bg: "bg-blue-100 dark:bg-blue-950/30",
    text: "text-blue-700 dark:text-blue-400",
    dot: "bg-blue-500",
  },
  DROPPED: {
    bg: "bg-red-100 dark:bg-red-950/30",
    text: "text-red-700 dark:text-red-400",
    dot: "bg-red-500",
  },
  SUSPENDED: {
    bg: "bg-orange-100 dark:bg-orange-950/30",
    text: "text-orange-700 dark:text-orange-400",
    dot: "bg-orange-500",
  },
  FAILED: {
    bg: "bg-rose-100 dark:bg-rose-950/30",
    text: "text-rose-700 dark:text-rose-400",
    dot: "bg-rose-500",
  },
};

const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
  }).format(new Date(date));
};

export function EnrollmentsClient({
  initialEnrollments,
  initialStats,
  initialPage,
  totalPages,
  totalEnrollments,
}: EnrollmentsClientProps) {
  const router = useRouter();
  const pathname = usePathname();

  const [enrollments, setEnrollments] = useState(initialEnrollments);
  const [selectedEnrollments, setSelectedEnrollments] = useState<Set<string>>(
    new Set(),
  );
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isActionLoading, setIsActionLoading] = useState(false);
  const [openDropDialog, setOpenDropDialog] = useState(false);
  const [selectedEnrollment, setSelectedEnrollment] =
    useState<Enrollment | null>(null);
  const [page, setPage] = useState(initialPage);
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [status, setStatus] = useState<string>("all");

  const fetchEnrollments = useCallback(async () => {
    setIsRefreshing(true);
    try {
      const params = new URLSearchParams();
      params.set("page", page.toString());
      params.set("limit", "10");
      if (search) params.set("search", search);
      if (status !== "all") params.set("status", status);

      const response = await fetch(
        `/api/admin/enrollments?${params.toString()}`,
      );
      const data = await response.json();
      setEnrollments(data.data);
    } catch (error) {
      toast.error("Failed to load enrollments");
    } finally {
      setIsRefreshing(false);
    }
  }, [page, search, status]);

  useEffect(() => {
    fetchEnrollments();
  }, [fetchEnrollments]);

  const handleSearch = () => {
    setSearch(searchInput);
    setPage(1);
  };

  const clearFilters = () => {
    setSearchInput("");
    setSearch("");
    setStatus("all");
    setPage(1);
  };

  const handleDropEnrollment = async (id: string) => {
    setIsActionLoading(true);
    try {
      await dropEnrollment(id);
      await fetchEnrollments();
      toast.success("Enrollment dropped successfully");
      setOpenDropDialog(false);
      setSelectedEnrollment(null);
    } catch (error) {
      toast.error("Failed to drop enrollment");
    } finally {
      setIsActionLoading(false);
    }
  };

  const handleUpdateProgress = async (id: string, progress: number) => {
    setIsActionLoading(true);
    try {
      await updateEnrollmentProgress(id, progress);
      await fetchEnrollments();
      toast.success("Progress updated successfully");
    } catch (error) {
      toast.error("Failed to update progress");
    } finally {
      setIsActionLoading(false);
    }
  };

  const handleBulkAction = async (action: "activate" | "complete" | "drop") => {
    const ids = Array.from(selectedEnrollments);
    if (ids.length === 0) return;

    let confirmMessage = "";
    let newStatus: EnrollmentStatus | null = null;

    switch (action) {
      case "activate":
        confirmMessage = `Activate ${ids.length} enrollment(s)?`;
        newStatus = "ACTIVE";
        break;
      case "complete":
        confirmMessage = `Mark ${ids.length} enrollment(s) as completed?`;
        newStatus = "COMPLETED";
        break;
      case "drop":
        confirmMessage = `Drop ${ids.length} enrollment(s)?`;
        newStatus = "DROPPED";
        break;
    }

    if (!confirm(confirmMessage)) return;

    setIsActionLoading(true);
    try {
      if (newStatus) {
        await bulkUpdateEnrollmentStatus(ids, newStatus);
      }
      await fetchEnrollments();
      setSelectedEnrollments(new Set());
      toast.success(`${ids.length} enrollment(s) updated successfully`);
    } catch (error) {
      toast.error(`Failed to update enrollments`);
    } finally {
      setIsActionLoading(false);
    }
  };

  const toggleSelectAll = () => {
    if (selectedEnrollments.size === enrollments.length) {
      setSelectedEnrollments(new Set());
    } else {
      setSelectedEnrollments(new Set(enrollments.map((e) => e.id)));
    }
  };

  const toggleSelectEnrollment = (id: string) => {
    const newSelected = new Set(selectedEnrollments);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedEnrollments(newSelected);
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return "bg-emerald-500";
    if (progress >= 60) return "bg-blue-500";
    if (progress >= 40) return "bg-amber-500";
    return "bg-red-500";
  };

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
        <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Users className="w-5 h-5 text-amber-500" />
                  <span className="text-xs font-black uppercase tracking-wider text-amber-600 dark:text-amber-400">
                    Enrollment Management
                  </span>
                </div>
                <h1 className="text-3xl sm:text-4xl font-black tracking-tighter bg-gradient-to-r from-purple-600 to-amber-600 bg-clip-text text-transparent">
                  Student Enrollments
                </h1>
                <p className="text-muted-foreground text-sm mt-1">
                  Manage student enrollments, track progress, and monitor
                  attendance
                </p>
              </div>
              <Link href="/dashboard/admin/enrollments/new">
                <Button className="rounded-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 shadow-md">
                  <Plus className="w-4 h-4 mr-2" />
                  New Enrollment
                </Button>
              </Link>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Total Enrollments
                  </p>
                  <p className="text-2xl font-black">
                    {initialStats.totalEnrollments}
                  </p>
                </div>
                <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-950/40 flex items-center justify-center">
                  <Users className="w-5 h-5 text-purple-600" />
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active</p>
                  <p className="text-2xl font-black text-emerald-600">
                    {initialStats.activeEnrollments}
                  </p>
                </div>
                <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-950/40 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Completion Rate
                  </p>
                  <p className="text-2xl font-black text-blue-600">
                    {initialStats.completionRate}%
                  </p>
                </div>
                <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-950/40 flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-blue-600" />
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg. Progress</p>
                  <p className="text-2xl font-black text-amber-600">
                    {initialStats.averageProgress}%
                  </p>
                </div>
                <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-950/40 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-amber-600" />
                </div>
              </div>
            </div>
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
          {selectedEnrollments.size > 0 && (
            <div className="bg-purple-50 dark:bg-purple-950/30 rounded-xl p-4 mb-6 flex flex-wrap items-center justify-between gap-4 border border-purple-200 dark:border-purple-800">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-purple-600" />
                <span className="text-sm font-black">
                  {selectedEnrollments.size} enrollment(s) selected
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleBulkAction("activate")}
                  disabled={isActionLoading}
                  className="border-emerald-300 text-emerald-600 hover:bg-emerald-50"
                >
                  <CheckCircle className="w-4 h-4 mr-1" />
                  Activate
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleBulkAction("complete")}
                  disabled={isActionLoading}
                  className="border-blue-300 text-blue-600 hover:bg-blue-50"
                >
                  <GraduationCap className="w-4 h-4 mr-1" />
                  Complete
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleBulkAction("drop")}
                  disabled={isActionLoading}
                  className="border-red-300 text-red-600 hover:bg-red-50"
                >
                  <XCircle className="w-4 h-4 mr-1" />
                  Drop
                </Button>
              </div>
            </div>
          )}

          {/* Filters */}
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 mb-6">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search by student name, email, or class..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                  className="pl-9 rounded-full border-slate-200 dark:border-slate-800"
                />
              </div>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger className="w-full sm:w-36 rounded-full">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="ACTIVE">Active</SelectItem>
                  <SelectItem value="COMPLETED">Completed</SelectItem>
                  <SelectItem value="DROPPED">Dropped</SelectItem>
                  <SelectItem value="SUSPENDED">Suspended</SelectItem>
                  <SelectItem value="FAILED">Failed</SelectItem>
                </SelectContent>
              </Select>
              <Button
                onClick={handleSearch}
                className="rounded-full px-6 bg-purple-600 hover:bg-purple-700"
              >
                <Search className="w-4 h-4 mr-2" />
                Search
              </Button>
              {(status !== "all" || search) && (
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
          </div>

          {/* Enrollments Table */}
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-slate-50 dark:bg-slate-800/50">
                  <TableRow>
                    <TableHead className="w-12">
                      <input
                        type="checkbox"
                        checked={
                          selectedEnrollments.size === enrollments.length &&
                          enrollments.length > 0
                        }
                        onChange={toggleSelectAll}
                        disabled={isRefreshing}
                        className="w-4 h-4 rounded border-slate-300"
                      />
                    </TableHead>
                    <TableHead>Student</TableHead>
                    <TableHead>Class</TableHead>
                    <TableHead>Enrolled</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Progress</TableHead>
                    <TableHead className="w-12"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {enrollments.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-12">
                        <div className="flex flex-col items-center gap-2">
                          <Users className="w-12 h-12 text-muted-foreground/30" />
                          <p className="text-muted-foreground">
                            No enrollments found
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
                    enrollments.map((enrollment) => {
                      const statusColors =
                        STATUS_COLORS[enrollment.status as EnrollmentStatus];
                      const progress = enrollment.progress || 0;
                      const progressColor = getProgressColor(progress);

                      return (
                        <TableRow
                          key={enrollment.id}
                          className="hover:bg-slate-50 dark:hover:bg-slate-800/50"
                        >
                          <TableCell>
                            <input
                              type="checkbox"
                              checked={selectedEnrollments.has(enrollment.id)}
                              onChange={() =>
                                toggleSelectEnrollment(enrollment.id)
                              }
                              disabled={isRefreshing}
                              className="w-4 h-4 rounded border-slate-300"
                            />
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar className="w-8 h-8">
                                <AvatarFallback className="text-xs bg-gradient-to-br from-purple-100 to-amber-100 text-purple-600">
                                  {getInitials(enrollment.student.user.name)}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-black text-sm">
                                  {enrollment.student.user.name}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {enrollment.student.user.email}
                                </p>
                                <p className="text-[10px] text-purple-600 font-mono">
                                  ID: {enrollment.student.studentId}
                                </p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <p className="font-medium text-sm">
                                {enrollment.class.name}
                              </p>
                              <p className="text-xs text-muted-foreground font-mono">
                                {enrollment.class.code}
                              </p>
                              <p className="text-[10px] text-amber-600">
                                {enrollment.class.level}
                              </p>
                            </div>
                          </TableCell>
                          <TableCell className="text-sm">
                            {formatDate(enrollment.enrolledAt)}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <div
                                className={`w-2 h-2 rounded-full ${statusColors.dot}`}
                              />
                              <span
                                className={`text-xs font-black ${statusColors.text}`}
                              >
                                {enrollment.status}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-col gap-1">
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-black">
                                  {progress}%
                                </span>
                              </div>
                              <div className="w-24 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                                <div
                                  className={`h-full ${progressColor} rounded-full`}
                                  style={{ width: `${progress}%` }}
                                />
                              </div>
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
                                    href={`/dashboard/admin/enrollments/${enrollment.id}`}
                                  >
                                    <Eye className="w-4 h-4 mr-2" />
                                    View Details
                                  </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                  <Link
                                    href={`/dashboard/admin/enrollments/${enrollment.id}/progress`}
                                  >
                                    <TrendingUp className="w-4 h-4 mr-2" />
                                    Update Progress
                                  </Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                {enrollment.status !== "COMPLETED" && (
                                  <DropdownMenuItem
                                    onClick={() =>
                                      handleUpdateProgress(
                                        enrollment.id,
                                        Math.min(progress + 10, 100),
                                      )
                                    }
                                    className="text-blue-600"
                                  >
                                    <CheckCircle className="w-4 h-4 mr-2" />
                                    +10% Progress
                                  </DropdownMenuItem>
                                )}
                                {enrollment.status === "ACTIVE" && (
                                  <DropdownMenuItem
                                    onClick={() => {
                                      setSelectedEnrollment(enrollment);
                                      setOpenDropDialog(true);
                                    }}
                                    className="text-red-600"
                                  >
                                    <XCircle className="w-4 h-4 mr-2" />
                                    Drop Enrollment
                                  </DropdownMenuItem>
                                )}
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
              <div className="flex items-center justify-between px-4 py-4 border-t border-slate-200 dark:border-slate-800">
                <p className="text-sm text-muted-foreground">
                  Page {page} of {totalPages} • {totalEnrollments} total
                  enrollments
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
          </div>
        </div>
      </div>

      {/* Drop Confirmation Dialog */}
      <Dialog open={openDropDialog} onOpenChange={setOpenDropDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Drop Enrollment</DialogTitle>
            <DialogDescription>
              Are you sure you want to drop{" "}
              {selectedEnrollment?.student.user.name} from{" "}
              {selectedEnrollment?.class.name}? This action will remove the
              student from the class and update the class capacity.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenDropDialog(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => handleDropEnrollment(selectedEnrollment!.id)}
              disabled={isActionLoading}
              className="bg-red-600 hover:bg-red-700"
            >
              {isActionLoading && (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              )}
              Drop Enrollment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </TooltipProvider>
  );
}
