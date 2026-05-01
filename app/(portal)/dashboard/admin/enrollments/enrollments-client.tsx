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
  Mail,
  Phone,
  Calendar,
  BookOpen,
  School,
  Loader2,
  CheckCircle,
  XCircle,
  AlertCircle,
  Eye,
  Edit,
  Trash2,
  UserPlus,
  Download,
  Filter,
  TrendingUp,
  Clock,
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
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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
  updateEnrollmentStatus,
  deleteEnrollment,
  bulkUpdateEnrollmentStatus,
  bulkDeleteEnrollments,
  getEnrollments,
} from "../actions/enrollments";
import { EnrollmentStatus, EnrollmentType } from "@/app/generated/prisma/enums";

// Types
interface EnrollmentWithRelations {
  id: string;
  studentId: string;
  classId: string;
  enrolledAt: Date;
  enrollmentType: EnrollmentType;
  status: EnrollmentStatus;
  progress: number | null;
  completedAt: Date | null;
  paymentId: string | null;
  createdAt: Date;
  updatedAt: Date;
  student: {
    id: string;
    studentId: string;
    currentLevel: string | null;
    user: {
      id: string;
      name: string;
      email: string;
      phone: string | null;
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
      id: string;
      user: {
        name: string;
        email: string;
      };
    };
  };
  payment?: {
    id: string;
    amount: number;
    status: string;
    paidAt: Date | null;
  } | null;
}

interface Stats {
  totalEnrollments: number;
  activeEnrollments: number;
  completedEnrollments: number;
  droppedEnrollments: number;
  suspendedEnrollments: number;
  failedEnrollments: number;
  byClass: { className: string; count: number }[];
  byLevel: { level: string; count: number }[];
  recentEnrollments: number;
  completionRate: number;
}

interface Class {
  id: string;
  name: string;
  code: string;
  level: string;
}

interface EnrollmentsClientProps {
  initialEnrollments: EnrollmentWithRelations[];
  initialStats: Stats;
  initialPage: number;
  initialSearch?: string;
  initialClassId?: string;
  initialStatus?: string;
  initialType?: string;
  totalPages: number;
  totalEnrollments: number;
  statuses: string[];
  types: string[];
  classes: Class[];
}

const STATUS_COLORS: Record<
  EnrollmentStatus,
  { bg: string; text: string; dot: string }
> = {
  ACTIVE: {
    bg: "bg-green-100 dark:bg-green-950/30",
    text: "text-green-700 dark:text-green-400",
    dot: "bg-green-500",
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
    bg: "bg-gray-100 dark:bg-gray-800",
    text: "text-gray-500 dark:text-gray-400",
    dot: "bg-gray-500",
  },
};

const TYPE_COLORS: Record<EnrollmentType, string> = {
  REGULAR:
    "bg-purple-100 text-purple-700 dark:bg-purple-950/40 dark:text-purple-400",
  TRIAL: "bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400",
  AUDIT: "bg-cyan-100 text-cyan-700 dark:bg-cyan-950/40 dark:text-cyan-400",
  MAKEUP: "bg-rose-100 text-rose-700 dark:bg-rose-950/40 dark:text-rose-400",
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
  if (!date) return "Never";
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
  }).format(new Date(date));
};

export function EnrollmentsClient({
  initialEnrollments,
  initialStats,
  initialPage,
  initialSearch,
  initialClassId,
  initialStatus,
  initialType,
  totalPages: initialTotalPages,
  totalEnrollments: initialTotalEnrollments,
  statuses,
  types,
  classes,
}: EnrollmentsClientProps) {
  const router = useRouter();
  const pathname = usePathname();

  // Data states
  const [enrollments, setEnrollments] = useState(initialEnrollments);
  const [stats] = useState(initialStats);
  const [totalPages, setTotalPages] = useState(initialTotalPages);
  const [totalEnrollmentsCount, setTotalEnrollmentsCount] = useState(
    initialTotalEnrollments,
  );
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isActionLoading, setIsActionLoading] = useState(false);

  // Selection states
  const [selectedEnrollments, setSelectedEnrollments] = useState<Set<string>>(
    new Set(),
  );

  // Dialog states
  const [openStatusDialog, setOpenStatusDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedEnrollment, setSelectedEnrollment] =
    useState<EnrollmentWithRelations | null>(null);
  const [newStatus, setNewStatus] = useState<EnrollmentStatus | null>(null);

  // Filter states
  const [page, setPage] = useState(initialPage);
  const [search, setSearch] = useState(initialSearch || "");
  const [searchInput, setSearchInput] = useState(initialSearch || "");
  const [classId, setClassId] = useState(initialClassId || "all");
  const [status, setStatus] = useState(initialStatus || "all");
  const [type, setType] = useState(initialType || "all");

  const hasEnrollments = enrollments && enrollments.length > 0;

  // Fetch enrollments using server action directly
  const fetchEnrollments = useCallback(async () => {
    setIsRefreshing(true);
    try {
      const result = await getEnrollments({
        page,
        limit: 10,
        search: search || undefined,
        classId: classId !== "all" ? classId : undefined,
        status: status !== "all" ? (status as EnrollmentStatus) : undefined,
        enrollmentType: type !== "all" ? (type as EnrollmentType) : undefined,
      });

      setEnrollments(result.data);
      setTotalPages(result.totalPages);
      setTotalEnrollmentsCount(result.total);
      setSelectedEnrollments(new Set());
    } catch (error) {
      console.error("Error fetching enrollments:", error);
      toast.error("Failed to load enrollments");
    } finally {
      setIsRefreshing(false);
    }
  }, [page, search, classId, status, type]);

  // Update URL when filters change
  const updateUrl = useCallback(() => {
    const params = new URLSearchParams();
    if (page > 1) params.set("page", page.toString());
    if (search) params.set("search", search);
    if (classId !== "all") params.set("classId", classId);
    if (status !== "all") params.set("status", status);
    if (type !== "all") params.set("type", type);

    const newUrl = `${pathname}${params.toString() ? `?${params.toString()}` : ""}`;
    router.replace(newUrl, { scroll: false });
  }, [page, search, classId, status, type, router, pathname]);

  // Fetch data when filters change
  useEffect(() => {
    fetchEnrollments();
  }, [fetchEnrollments]);

  // Update URL when filters change (debounced)
  useEffect(() => {
    const timer = setTimeout(() => {
      updateUrl();
    }, 300);
    return () => clearTimeout(timer);
  }, [page, search, classId, status, type, updateUrl]);

  const handleSearch = () => {
    setSearch(searchInput);
    setPage(1);
  };

  const clearFilters = () => {
    setSearchInput("");
    setSearch("");
    setClassId("all");
    setStatus("all");
    setType("all");
    setPage(1);
  };

  const handleStatusChange = async (
    enrollmentId: string,
    newStatus: EnrollmentStatus,
  ) => {
    setIsActionLoading(true);
    try {
      await updateEnrollmentStatus(enrollmentId, newStatus);
      await fetchEnrollments();
      toast.success(`Enrollment status updated to ${newStatus.toLowerCase()}`);
      setOpenStatusDialog(false);
      setSelectedEnrollment(null);
      setNewStatus(null);
    } catch (error) {
      toast.error("Failed to update enrollment status");
    } finally {
      setIsActionLoading(false);
    }
  };

  const handleDeleteEnrollment = async (enrollmentId: string) => {
    setIsActionLoading(true);
    try {
      await deleteEnrollment(enrollmentId);
      await fetchEnrollments();
      toast.success("Enrollment deleted successfully");
      setOpenDeleteDialog(false);
      setSelectedEnrollment(null);
    } catch (error) {
      toast.error("Failed to delete enrollment");
    } finally {
      setIsActionLoading(false);
    }
  };

  const handleBulkAction = async (
    action: "activate" | "complete" | "drop" | "delete",
  ) => {
    const ids = Array.from(selectedEnrollments);
    if (ids.length === 0) return;

    let confirmMessage = "";
    let actionFn: any;
    let newStatusValue: EnrollmentStatus | null = null;

    switch (action) {
      case "activate":
        confirmMessage = `Activate ${ids.length} enrollment(s)?`;
        newStatusValue = "ACTIVE";
        actionFn = bulkUpdateEnrollmentStatus;
        break;
      case "complete":
        confirmMessage = `Mark ${ids.length} enrollment(s) as completed?`;
        newStatusValue = "COMPLETED";
        actionFn = bulkUpdateEnrollmentStatus;
        break;
      case "drop":
        confirmMessage = `Drop ${ids.length} enrollment(s)?`;
        newStatusValue = "DROPPED";
        actionFn = bulkUpdateEnrollmentStatus;
        break;
      case "delete":
        confirmMessage = `Delete ${ids.length} enrollment(s)? This action cannot be undone.`;
        actionFn = bulkDeleteEnrollments;
        break;
    }

    if (!confirm(confirmMessage)) return;

    setIsActionLoading(true);
    try {
      if (action === "delete") {
        await actionFn(ids);
      } else {
        await actionFn(ids, newStatusValue);
      }
      await fetchEnrollments();
      setSelectedEnrollments(new Set());
      toast.success(`${ids.length} enrollment(s) ${action}d successfully`);
    } catch (error) {
      toast.error(`Failed to ${action} enrollments`);
    } finally {
      setIsActionLoading(false);
    }
  };

  const toggleSelectAll = () => {
    if (!hasEnrollments) return;

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

  const getProgressColor = (progress: number | null) => {
    if (!progress) return "bg-slate-200";
    if (progress >= 75) return "bg-green-500";
    if (progress >= 50) return "bg-amber-500";
    if (progress >= 25) return "bg-orange-500";
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
                  Manage student registrations, track progress, and handle class
                  enrollments
                </p>
              </div>
              <Link href="/dashboard/admin/enrollments/new">
                <Button className="rounded-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 shadow-md">
                  <UserPlus className="w-4 h-4 mr-2" />
                  New Enrollment
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
                      Total Enrollments
                    </p>
                    <p className="text-3xl font-black">
                      {stats.totalEnrollments}
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-950/40 flex items-center justify-center">
                    <Users className="w-5 h-5 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-emerald-200 dark:border-emerald-800">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Active</p>
                    <p className="text-3xl font-black text-emerald-600">
                      {stats.activeEnrollments}
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-950/40 flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-emerald-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-blue-200 dark:border-blue-800">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Completed</p>
                    <p className="text-3xl font-black text-blue-600">
                      {stats.completedEnrollments}
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-950/40 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-amber-200 dark:border-amber-800">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Completion Rate
                    </p>
                    <p className="text-3xl font-black text-amber-600">
                      {stats.completionRate}%
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-950/40 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-amber-600" />
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
                  <TrendingUp className="w-4 h-4 mr-1" />
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
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleBulkAction("delete")}
                  disabled={isActionLoading}
                  className="border-gray-300 text-gray-600 hover:bg-gray-50"
                >
                  <Trash2 className="w-4 h-4 mr-1" />
                  Delete
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
                    placeholder="Search by student name, email, or class..."
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                    className="pl-9 rounded-full"
                  />
                </div>
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
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger className="w-full sm:w-36 rounded-full">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    {statuses.map((s) => (
                      <SelectItem key={s} value={s}>
                        {s}
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
                {(classId !== "all" ||
                  status !== "all" ||
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

          {/* Enrollments Table */}
          <Card>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-slate-50 dark:bg-slate-800/50">
                  <TableRow>
                    <TableHead className="w-12">
                      <input
                        type="checkbox"
                        checked={
                          hasEnrollments
                            ? selectedEnrollments.size === enrollments.length
                            : false
                        }
                        onChange={toggleSelectAll}
                        disabled={isRefreshing || !hasEnrollments}
                        className="w-4 h-4 rounded border-slate-300"
                      />
                    </TableHead>
                    <TableHead>Student</TableHead>
                    <TableHead>Class</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Progress</TableHead>
                    <TableHead>Enrolled</TableHead>
                    <TableHead className="w-12"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {!hasEnrollments ? (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-12">
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
                      const statusColors = STATUS_COLORS[enrollment.status];
                      const typeColor = TYPE_COLORS[enrollment.enrollmentType];
                      const progress = enrollment.progress || 0;

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
                              <Avatar className="w-10 h-10">
                                <AvatarFallback className="bg-gradient-to-br from-purple-100 to-amber-100 dark:from-purple-950/40 dark:to-amber-950/40 text-purple-600 font-black">
                                  {getInitials(enrollment.student.user.name)}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-black text-sm">
                                  {enrollment.student.user.name}
                                </p>
                                <p className="text-xs text-muted-foreground flex items-center gap-1">
                                  <Mail className="w-3 h-3" />
                                  {enrollment.student.user.email}
                                </p>
                                <p className="text-xs text-muted-foreground font-mono">
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
                              <p className="text-xs text-muted-foreground">
                                {enrollment.class.level}
                              </p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <span
                              className={cn(
                                "text-xs font-black px-2 py-0.5 rounded-full",
                                typeColor,
                              )}
                            >
                              {enrollment.enrollmentType}
                            </span>
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
                              <div className="flex items-center justify-between text-xs">
                                <span className="font-black">{progress}%</span>
                              </div>
                              <div className="w-24 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                                <div
                                  className={`h-full rounded-full ${getProgressColor(progress)}`}
                                  style={{ width: `${progress}%` }}
                                />
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="text-sm">
                            {formatDate(enrollment.enrolledAt)}
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
                                    href={`/dashboard/admin/enrollments/${enrollment.id}/edit`}
                                  >
                                    <Edit className="w-4 h-4 mr-2" />
                                    Edit Enrollment
                                  </Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                {enrollment.status !== "ACTIVE" && (
                                  <DropdownMenuItem
                                    onClick={() => {
                                      setSelectedEnrollment(enrollment);
                                      setNewStatus("ACTIVE");
                                      setOpenStatusDialog(true);
                                    }}
                                    className="text-green-600"
                                  >
                                    <CheckCircle className="w-4 h-4 mr-2" />
                                    Activate
                                  </DropdownMenuItem>
                                )}
                                {enrollment.status !== "COMPLETED" && (
                                  <DropdownMenuItem
                                    onClick={() => {
                                      setSelectedEnrollment(enrollment);
                                      setNewStatus("COMPLETED");
                                      setOpenStatusDialog(true);
                                    }}
                                    className="text-blue-600"
                                  >
                                    <TrendingUp className="w-4 h-4 mr-2" />
                                    Mark Complete
                                  </DropdownMenuItem>
                                )}
                                {enrollment.status !== "DROPPED" && (
                                  <DropdownMenuItem
                                    onClick={() => {
                                      setSelectedEnrollment(enrollment);
                                      setNewStatus("DROPPED");
                                      setOpenStatusDialog(true);
                                    }}
                                    className="text-red-600"
                                  >
                                    <XCircle className="w-4 h-4 mr-2" />
                                    Drop Student
                                  </DropdownMenuItem>
                                )}
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                  onClick={() => {
                                    setSelectedEnrollment(enrollment);
                                    setOpenDeleteDialog(true);
                                  }}
                                  className="text-red-600"
                                >
                                  <Trash2 className="w-4 h-4 mr-2" />
                                  Delete Enrollment
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
                  Page {page} of {totalPages} • {totalEnrollmentsCount} total
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
          </Card>
        </div>
      </div>

      {/* Status Change Dialog */}
      <Dialog open={openStatusDialog} onOpenChange={setOpenStatusDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Update Enrollment Status</DialogTitle>
            <DialogDescription>
              Are you sure you want to change the status of{" "}
              <span className="font-bold">
                {selectedEnrollment?.student.user.name}
              </span>
              's enrollment in{" "}
              <span className="font-bold">
                {selectedEnrollment?.class.name}
              </span>{" "}
              to <span className="font-bold">{newStatus}?</span>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setOpenStatusDialog(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={() =>
                handleStatusChange(selectedEnrollment!.id, newStatus!)
              }
              disabled={isActionLoading}
              className={cn(
                newStatus === "ACTIVE" && "bg-green-600 hover:bg-green-700",
                newStatus === "COMPLETED" && "bg-blue-600 hover:bg-blue-700",
                newStatus === "DROPPED" && "bg-red-600 hover:bg-red-700",
              )}
            >
              {isActionLoading && (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              )}
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Delete Enrollment</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete{" "}
              <span className="font-bold">
                {selectedEnrollment?.student.user.name}
              </span>
              's enrollment from{" "}
              <span className="font-bold">
                {selectedEnrollment?.class.name}
              </span>
              ? This action cannot be undone.
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
              onClick={() => handleDeleteEnrollment(selectedEnrollment!.id)}
              disabled={isActionLoading}
              className="bg-red-600 hover:bg-red-700"
            >
              {isActionLoading && (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              )}
              Delete Enrollment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </TooltipProvider>
  );
}
