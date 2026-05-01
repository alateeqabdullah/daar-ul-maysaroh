// app/(portal)/dashboard/admin/classes/classes-client.tsx
"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import {
  School,
  Search,
  X,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  Calendar,
  Users,
  BookOpen,
  Clock,
  Plus,
  Edit,
  Trash2,
  Eye,
  Loader2,
  CheckCircle,
  XCircle,
  AlertCircle,
<<<<<<< HEAD
=======
  Building2,
  UserCheck,
  GraduationCap,
>>>>>>> 7a4dd40e090cb3ddef36ddbdb69a3b6bf074ca71
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
  deleteClass,
  bulkActivateClasses,
  bulkDeactivateClasses,
  bulkDeleteClasses,
<<<<<<< HEAD
  getClasses, // Import the server action
=======
>>>>>>> 7a4dd40e090cb3ddef36ddbdb69a3b6bf074ca71
} from "../actions/classes";

// Types
interface ClassWithRelations {
  id: string;
  name: string;
  code: string;
  description: string | null;
  level: string;
  section: string | null;
  capacity: number;
  currentEnrollment: number;
  academicYear: string;
  term: string | null;
  scheduleType: string;
  isActive: boolean;
  startDate: Date | null;
  endDate: Date | null;
  createdAt: Date;
  teacher: {
    id: string;
    user: {
      name: string;
      email: string;
      image: string | null;
    };
    specialization: string | null;
  };
  schedules: Array<{
    id: string;
    dayOfWeek: number;
    startTime: string;
    endTime: string;
  }>;
}

interface Stats {
  totalClasses: number;
  activeClasses: number;
  totalEnrollments: number;
  averageClassSize: number;
  classesByLevel: Record<string, number>;
}

interface Teacher {
  id: string;
  user: {
    name: string;
    email: string;
  };
}

interface ClassesClientProps {
  initialClasses: ClassWithRelations[];
  initialStats: Stats;
  initialPage: number;
  initialSearch?: string;
  initialLevel?: string;
  initialAcademicYear?: string;
  initialTeacherId?: string;
  totalPages: number;
  totalClasses: number;
  academicYears: string[];
  levels: string[];
  teachers: Teacher[];
}

const getLevelColor = (level: string) => {
  const colors: Record<string, string> = {
    Beginner:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400",
    Intermediate:
      "bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400",
    Advanced:
      "bg-purple-100 text-purple-700 dark:bg-purple-950/40 dark:text-purple-400",
    Expert:
      "bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400",
  };
<<<<<<< HEAD
  return (
    colors[level] ||
    "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400"
  );
=======
  return colors[level] || "bg-gray-100 text-gray-700";
>>>>>>> 7a4dd40e090cb3ddef36ddbdb69a3b6bf074ca71
};

const getDayName = (day: number) => {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
<<<<<<< HEAD
  return days[day] || "Unknown";
};

const getInitials = (name: string) => {
  if (!name) return "??";
=======
  return days[day];
};

const getInitials = (name: string) => {
>>>>>>> 7a4dd40e090cb3ddef36ddbdb69a3b6bf074ca71
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

export function ClassesClient({
<<<<<<< HEAD
  initialClasses = [],
=======
  initialClasses = [], // Add default value
>>>>>>> 7a4dd40e090cb3ddef36ddbdb69a3b6bf074ca71
  initialStats,
  initialPage,
  initialSearch,
  initialLevel,
  initialAcademicYear,
  initialTeacherId,
<<<<<<< HEAD
  totalPages: initialTotalPages = 1,
  totalClasses: initialTotalClasses = 0,
  academicYears = [],
  levels = [],
  teachers = [],
=======
  totalPages: initialTotalPages = 1, // Add default value
  totalClasses: initialTotalClasses = 0, // Add default value
  academicYears = [], // Add default value
  levels = [], // Add default value
  teachers = [], // Add default value
>>>>>>> 7a4dd40e090cb3ddef36ddbdb69a3b6bf074ca71
}: ClassesClientProps) {
  const router = useRouter();
  const pathname = usePathname();

  // Data states
<<<<<<< HEAD
  const [classes, setClasses] = useState<ClassWithRelations[]>(initialClasses);
  const [totalPages, setTotalPages] = useState(initialTotalPages);
  const [totalClassesCount, setTotalClassesCount] =
    useState(initialTotalClasses);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isActionLoading, setIsActionLoading] = useState(false);
=======
  const [classes, setClasses] = useState<ClassWithRelations[]>(
    initialClasses || [],
  );
  const [totalPages, setTotalPages] = useState(initialTotalPages || 1);
  const [totalClassesCount, setTotalClassesCount] = useState(
    initialTotalClasses || 0,
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
>>>>>>> 7a4dd40e090cb3ddef36ddbdb69a3b6bf074ca71

  // Selection states
  const [selectedClasses, setSelectedClasses] = useState<Set<string>>(
    new Set(),
  );

<<<<<<< HEAD
=======
  const hasClasses = classes && classes.length > 0;

>>>>>>> 7a4dd40e090cb3ddef36ddbdb69a3b6bf074ca71
  // Dialog states
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedClass, setSelectedClass] = useState<ClassWithRelations | null>(
    null,
  );

  // Filter states
<<<<<<< HEAD
  const [page, setPage] = useState(initialPage);
=======
  const [page, setPage] = useState(initialPage || 1);
>>>>>>> 7a4dd40e090cb3ddef36ddbdb69a3b6bf074ca71
  const [search, setSearch] = useState(initialSearch || "");
  const [searchInput, setSearchInput] = useState(initialSearch || "");
  const [level, setLevel] = useState(initialLevel || "all");
  const [academicYear, setAcademicYear] = useState(
    initialAcademicYear || "all",
  );
  const [teacherId, setTeacherId] = useState(initialTeacherId || "all");

<<<<<<< HEAD
  const hasClasses = classes && classes.length > 0;

  // Fetch classes using server action
  const fetchClasses = useCallback(async () => {
    setIsRefreshing(true);
    try {
      const result = await getClasses({
        page,
        limit: 10,
        search: search || undefined,
        level: level !== "all" ? level : undefined,
        academicYear: academicYear !== "all" ? academicYear : undefined,
        teacherId: teacherId !== "all" ? teacherId : undefined,
      });

      setClasses(result.data || []);
      setTotalPages(result.totalPages || 1);
      setTotalClassesCount(result.total || 0);
      setSelectedClasses(new Set());
    } catch (error) {
      console.error("Error fetching classes:", error);
=======
  // Fetch classes when filters change
  const fetchClasses = useCallback(async () => {
    setIsRefreshing(true);
    try {
      const params = new URLSearchParams();
      params.set("page", page.toString());
      params.set("limit", "10");
      if (search) params.set("search", search);
      if (level !== "all") params.set("level", level);
      if (academicYear !== "all") params.set("academicYear", academicYear);
      if (teacherId !== "all") params.set("teacherId", teacherId);

      const response = await fetch(`/api/admin/classes?${params.toString()}`);
      const data = await response.json();

      setClasses(data.data);
      setTotalPages(data.totalPages);
      setTotalClassesCount(data.total);
      setSelectedClasses(new Set());
    } catch (error) {
>>>>>>> 7a4dd40e090cb3ddef36ddbdb69a3b6bf074ca71
      toast.error("Failed to load classes");
    } finally {
      setIsRefreshing(false);
    }
  }, [page, search, level, academicYear, teacherId]);

  // Update URL when filters change
  const updateUrl = useCallback(() => {
    const params = new URLSearchParams();
    if (page > 1) params.set("page", page.toString());
    if (search) params.set("search", search);
    if (level !== "all") params.set("level", level);
    if (academicYear !== "all") params.set("academicYear", academicYear);
    if (teacherId !== "all") params.set("teacherId", teacherId);

    const newUrl = `${pathname}${params.toString() ? `?${params.toString()}` : ""}`;
    router.replace(newUrl, { scroll: false });
  }, [page, search, level, academicYear, teacherId, router, pathname]);

  // Fetch data when filters change
  useEffect(() => {
    fetchClasses();
  }, [fetchClasses]);

  // Update URL when filters change (debounced)
  useEffect(() => {
    const timer = setTimeout(() => {
      updateUrl();
    }, 300);
    return () => clearTimeout(timer);
  }, [page, search, level, academicYear, teacherId, updateUrl]);

  const handleSearch = () => {
    setSearch(searchInput);
    setPage(1);
  };

  const clearFilters = () => {
    setSearchInput("");
    setSearch("");
    setLevel("all");
    setAcademicYear("all");
    setTeacherId("all");
    setPage(1);
  };

  const handleDeleteClass = async (id: string) => {
<<<<<<< HEAD
    setIsActionLoading(true);
=======
    setIsLoading(true);
>>>>>>> 7a4dd40e090cb3ddef36ddbdb69a3b6bf074ca71
    try {
      await deleteClass(id);
      await fetchClasses();
      toast.success("Class deleted successfully");
      setOpenDeleteDialog(false);
      setSelectedClass(null);
    } catch (error) {
      toast.error("Failed to delete class");
    } finally {
<<<<<<< HEAD
      setIsActionLoading(false);
=======
      setIsLoading(false);
>>>>>>> 7a4dd40e090cb3ddef36ddbdb69a3b6bf074ca71
    }
  };

  const handleBulkAction = async (
    action: "activate" | "deactivate" | "delete",
  ) => {
    const ids = Array.from(selectedClasses);
    if (ids.length === 0) return;

    let confirmMessage = "";
    let actionFn: any;

    switch (action) {
      case "activate":
        confirmMessage = `Activate ${ids.length} class(es)?`;
        actionFn = bulkActivateClasses;
        break;
      case "deactivate":
        confirmMessage = `Deactivate ${ids.length} class(es)?`;
        actionFn = bulkDeactivateClasses;
        break;
      case "delete":
        confirmMessage = `Delete ${ids.length} class(es)? This action cannot be undone.`;
        actionFn = bulkDeleteClasses;
        break;
    }

    if (!confirm(confirmMessage)) return;

<<<<<<< HEAD
    setIsActionLoading(true);
=======
    setIsLoading(true);
>>>>>>> 7a4dd40e090cb3ddef36ddbdb69a3b6bf074ca71
    try {
      await actionFn(ids);
      await fetchClasses();
      setSelectedClasses(new Set());
      toast.success(`${ids.length} class(es) ${action}d successfully`);
    } catch (error) {
      toast.error(`Failed to ${action} classes`);
    } finally {
<<<<<<< HEAD
      setIsActionLoading(false);
=======
      setIsLoading(false);
>>>>>>> 7a4dd40e090cb3ddef36ddbdb69a3b6bf074ca71
    }
  };

  const toggleSelectAll = () => {
<<<<<<< HEAD
    if (!hasClasses) return;
=======
    if (!classes || classes.length === 0) return;
>>>>>>> 7a4dd40e090cb3ddef36ddbdb69a3b6bf074ca71

    if (selectedClasses.size === classes.length) {
      setSelectedClasses(new Set());
    } else {
      setSelectedClasses(new Set(classes.map((c) => c.id)));
    }
  };

  const toggleSelectClass = (id: string) => {
    const newSelected = new Set(selectedClasses);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedClasses(newSelected);
  };

<<<<<<< HEAD
  // Get safe display name for teacher
  const getTeacherName = (teacher: ClassWithRelations["teacher"]) => {
    return teacher?.user?.name || "Not Assigned";
  };

  // Get safe schedule display
  const getScheduleDisplay = (schedules: ClassWithRelations["schedules"]) => {
    if (!schedules || schedules.length === 0) {
      return { day: "No schedule", time: "" };
    }
    const firstSchedule = schedules[0];
    return {
      day: getDayName(firstSchedule.dayOfWeek),
      time: `${firstSchedule.startTime} - ${firstSchedule.endTime}`,
    };
  };

  // Get enrollment percentage
  const getEnrollmentPercentage = (current: number, capacity: number) => {
    if (!capacity || capacity === 0) return 0;
    return Math.min(100, (current / capacity) * 100);
  };

=======
>>>>>>> 7a4dd40e090cb3ddef36ddbdb69a3b6bf074ca71
  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
        <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <School className="w-5 h-5 text-amber-500" />
                  <span className="text-xs font-black uppercase tracking-wider text-amber-600 dark:text-amber-400">
                    Academic Management
                  </span>
                </div>
                <h1 className="text-3xl sm:text-4xl font-black tracking-tighter bg-gradient-to-r from-purple-600 to-amber-600 bg-clip-text text-transparent">
                  Class Management
                </h1>
                <p className="text-muted-foreground text-sm mt-1">
                  Manage classes, schedules, enrollments, and subjects
                </p>
              </div>
              <Link href="/dashboard/admin/classes/new">
                <Button className="rounded-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 shadow-md">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Class
                </Button>
              </Link>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Classes</p>
                  <p className="text-2xl font-black">
<<<<<<< HEAD
                    {initialStats?.totalClasses || 0}
=======
                    {initialStats.totalClasses}
>>>>>>> 7a4dd40e090cb3ddef36ddbdb69a3b6bf074ca71
                  </p>
                </div>
                <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-950/40 flex items-center justify-center">
                  <School className="w-5 h-5 text-purple-600" />
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Active Classes
                  </p>
                  <p className="text-2xl font-black text-emerald-600">
<<<<<<< HEAD
                    {initialStats?.activeClasses || 0}
=======
                    {initialStats.activeClasses}
>>>>>>> 7a4dd40e090cb3ddef36ddbdb69a3b6bf074ca71
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
                    Total Enrollments
                  </p>
                  <p className="text-2xl font-black">
<<<<<<< HEAD
                    {initialStats?.totalEnrollments || 0}
=======
                    {initialStats.totalEnrollments}
>>>>>>> 7a4dd40e090cb3ddef36ddbdb69a3b6bf074ca71
                  </p>
                </div>
                <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-950/40 flex items-center justify-center">
                  <Users className="w-5 h-5 text-blue-600" />
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Avg. Class Size
                  </p>
                  <p className="text-2xl font-black text-amber-600">
<<<<<<< HEAD
                    {initialStats?.averageClassSize || 0}
=======
                    {initialStats.averageClassSize}
>>>>>>> 7a4dd40e090cb3ddef36ddbdb69a3b6bf074ca71
                  </p>
                </div>
                <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-950/40 flex items-center justify-center">
                  <Users className="w-5 h-5 text-amber-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Loading Overlay */}
<<<<<<< HEAD
          {(isRefreshing || isActionLoading) && (
=======
          {isRefreshing && (
>>>>>>> 7a4dd40e090cb3ddef36ddbdb69a3b6bf074ca71
            <div className="fixed inset-0 bg-black/20 z-50 flex items-center justify-center pointer-events-none">
              <div className="bg-white dark:bg-slate-900 rounded-full p-3 shadow-lg">
                <Loader2 className="w-6 h-6 animate-spin text-purple-600" />
              </div>
            </div>
          )}

          {/* Bulk Actions Bar */}
          {selectedClasses.size > 0 && (
            <div className="bg-purple-50 dark:bg-purple-950/30 rounded-xl p-4 mb-6 flex flex-wrap items-center justify-between gap-4 border border-purple-200 dark:border-purple-800">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-purple-600" />
                <span className="text-sm font-black">
                  {selectedClasses.size} class(es) selected
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleBulkAction("activate")}
<<<<<<< HEAD
                  disabled={isActionLoading}
=======
                  disabled={isLoading}
>>>>>>> 7a4dd40e090cb3ddef36ddbdb69a3b6bf074ca71
                  className="border-emerald-300 text-emerald-600 hover:bg-emerald-50"
                >
                  <CheckCircle className="w-4 h-4 mr-1" />
                  Activate
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleBulkAction("deactivate")}
<<<<<<< HEAD
                  disabled={isActionLoading}
=======
                  disabled={isLoading}
>>>>>>> 7a4dd40e090cb3ddef36ddbdb69a3b6bf074ca71
                  className="border-orange-300 text-orange-600 hover:bg-orange-50"
                >
                  <XCircle className="w-4 h-4 mr-1" />
                  Deactivate
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleBulkAction("delete")}
<<<<<<< HEAD
                  disabled={isActionLoading}
=======
                  disabled={isLoading}
>>>>>>> 7a4dd40e090cb3ddef36ddbdb69a3b6bf074ca71
                  className="border-red-300 text-red-600 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4 mr-1" />
                  Delete
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
                  placeholder="Search by name or code..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                  className="pl-9 rounded-full border-slate-200 dark:border-slate-800"
                />
              </div>
              <Select value={level} onValueChange={setLevel}>
                <SelectTrigger className="w-full sm:w-36 rounded-full">
                  <SelectValue placeholder="Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  {levels.map((l) => (
                    <SelectItem key={l} value={l}>
                      {l}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={academicYear} onValueChange={setAcademicYear}>
                <SelectTrigger className="w-full sm:w-36 rounded-full">
                  <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Years</SelectItem>
                  {academicYears.map((year) => (
                    <SelectItem key={year} value={year}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={teacherId} onValueChange={setTeacherId}>
                <SelectTrigger className="w-full sm:w-44 rounded-full">
                  <SelectValue placeholder="Teacher" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Teachers</SelectItem>
                  {teachers.map((teacher) => (
                    <SelectItem key={teacher.id} value={teacher.id}>
                      {teacher.user?.name || "Unknown Teacher"}
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
              {(level !== "all" ||
                academicYear !== "all" ||
                teacherId !== "all" ||
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
          </div>

          {/* Classes Table */}
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-slate-50 dark:bg-slate-800/50">
                  <TableRow>
                    <TableHead className="w-12">
                      <input
                        type="checkbox"
                        checked={
<<<<<<< HEAD
                          hasClasses
                            ? selectedClasses.size === classes.length
                            : false
                        }
                        onChange={toggleSelectAll}
                        disabled={isRefreshing || !hasClasses}
=======
                          hasClasses ? selectedClasses.size === classes.length : false
                        }
                        onChange={toggleSelectAll }
                        disabled={isRefreshing || !hasClasses }  
>>>>>>> 7a4dd40e090cb3ddef36ddbdb69a3b6bf074ca71
                        className="w-4 h-4 rounded border-slate-300"
                      />
                    </TableHead>
                    <TableHead>Class</TableHead>
                    <TableHead>Level</TableHead>
                    <TableHead>Teacher</TableHead>
                    <TableHead>Schedule</TableHead>
                    <TableHead>Enrollment</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-12"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
<<<<<<< HEAD
                  {!hasClasses ? (
=======
                  {!hasClasses ?   (
>>>>>>> 7a4dd40e090cb3ddef36ddbdb69a3b6bf074ca71
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-12">
                        <div className="flex flex-col items-center gap-2">
                          <School className="w-12 h-12 text-muted-foreground/30" />
                          <p className="text-muted-foreground">
                            No classes found
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
<<<<<<< HEAD
                    classes.map((cls) => {
                      const schedule = getScheduleDisplay(cls.schedules);
                      const enrollmentPercent = getEnrollmentPercentage(
                        cls.currentEnrollment,
                        cls.capacity,
                      );

                      return (
                        <TableRow
                          key={cls.id}
                          className="hover:bg-slate-50 dark:hover:bg-slate-800/50"
                        >
                          <TableCell>
                            <input
                              type="checkbox"
                              checked={selectedClasses.has(cls.id)}
                              onChange={() => toggleSelectClass(cls.id)}
                              disabled={isRefreshing}
                              className="w-4 h-4 rounded border-slate-300"
                            />
                          </TableCell>
                          <TableCell>
                            <div>
                              <p className="font-black text-sm">{cls.name}</p>
                              <p className="text-xs text-muted-foreground font-mono">
                                {cls.code}
                              </p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <span
                              className={cn(
                                "text-xs font-black px-2 py-0.5 rounded-full",
                                getLevelColor(cls.level),
                              )}
                            >
                              {cls.level}
                            </span>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Avatar className="w-6 h-6">
                                <AvatarFallback className="text-[10px]">
                                  {getInitials(getTeacherName(cls.teacher))}
                                </AvatarFallback>
                              </Avatar>
                              <span className="text-sm font-medium">
                                {getTeacherName(cls.teacher)}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="text-xs">
                              <p className="font-medium">{schedule.day}</p>
                              {schedule.time && (
                                <p className="text-muted-foreground">
                                  {schedule.time}
                                </p>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-col gap-1">
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-black">
                                  {cls.currentEnrollment}
                                </span>
                                <span className="text-xs text-muted-foreground">
                                  / {cls.capacity}
                                </span>
                              </div>
                              <div className="w-20 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-purple-600 rounded-full"
                                  style={{ width: `${enrollmentPercent}%` }}
                                />
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            {cls.isActive ? (
                              <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400 border-0">
                                Active
                              </Badge>
                            ) : (
                              <Badge
                                variant="secondary"
                                className="bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                              >
                                Inactive
                              </Badge>
                            )}
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
                                    href={`/dashboard/admin/classes/${cls.id}`}
                                  >
                                    <Eye className="w-4 h-4 mr-2" />
                                    View Details
                                  </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                  <Link
                                    href={`/dashboard/admin/classes/${cls.id}/edit`}
                                  >
                                    <Edit className="w-4 h-4 mr-2" />
                                    Edit Class
                                  </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                  <Link
                                    href={`/dashboard/admin/classes/${cls.id}/schedule`}
                                  >
                                    <Calendar className="w-4 h-4 mr-2" />
                                    Manage Schedule
                                  </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                  <Link
                                    href={`/dashboard/admin/classes/${cls.id}/students`}
                                  >
                                    <Users className="w-4 h-4 mr-2" />
                                    Manage Students
                                  </Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                  onClick={() => {
                                    setSelectedClass(cls);
                                    setOpenDeleteDialog(true);
                                  }}
                                  className="text-red-600"
                                >
                                  <Trash2 className="w-4 h-4 mr-2" />
                                  Delete Class
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      );
                    })
=======
                    classes.map((cls) => (
                      <TableRow
                        key={cls.id}
                        className="hover:bg-slate-50 dark:hover:bg-slate-800/50"
                      >
                        <TableCell>
                          <input
                            type="checkbox"
                            checked={selectedClasses?.has(cls.id) ?? false}
                            onChange={() => toggleSelectClass(cls.id)}
                            disabled={isRefreshing}
                            className="w-4 h-4 rounded border-slate-300"
                          />
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-black text-sm">{cls.name}</p>
                            <p className="text-xs text-muted-foreground font-mono">
                              {cls.code}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span
                            className={cn(
                              "text-xs font-black px-2 py-0.5 rounded-full",
                              getLevelColor(cls.level),
                            )}
                          >
                            {cls.level}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="w-6 h-6">
                              <AvatarFallback className="text-[10px]">
                                {getInitials(cls.teacher.user.name)}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-sm font-medium">
                              {cls.teacher.user.name}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          {cls.schedules.length > 0 ? (
                            <div className="text-xs">
                              <p className="font-medium">
                                {getDayName(cls.schedules[0].dayOfWeek)}
                              </p>
                              <p className="text-muted-foreground">
                                {cls.schedules[0].startTime} -{" "}
                                {cls.schedules[0].endTime}
                              </p>
                            </div>
                          ) : (
                            <span className="text-xs text-muted-foreground">
                              No schedule
                            </span>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-black">
                              {cls.currentEnrollment}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              / {cls.capacity}
                            </span>
                            <div className="w-16 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-purple-600 rounded-full"
                                style={{
                                  width: `${(cls.currentEnrollment / cls.capacity) * 100}%`,
                                }}
                              />
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          {cls.isActive ? (
                            <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400 border-0">
                              Active
                            </Badge>
                          ) : (
                            <Badge
                              variant="secondary"
                              className="bg-gray-100 text-gray-600"
                            >
                              Inactive
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                disabled={isLoading}
                              >
                                <MoreHorizontal className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-48">
                              <DropdownMenuItem asChild>
                                <Link
                                  href={`/dashboard/admin/classes/${cls.id}`}
                                >
                                  <Eye className="w-4 h-4 mr-2" />
                                  View Details
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem asChild>
                                <Link
                                  href={`/dashboard/admin/classes/${cls.id}/edit`}
                                >
                                  <Edit className="w-4 h-4 mr-2" />
                                  Edit Class
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem asChild>
                                <Link
                                  href={`/dashboard/admin/classes/${cls.id}/schedule`}
                                >
                                  <Calendar className="w-4 h-4 mr-2" />
                                  Manage Schedule
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem asChild>
                                <Link
                                  href={`/dashboard/admin/classes/${cls.id}/students`}
                                >
                                  <Users className="w-4 h-4 mr-2" />
                                  Manage Students
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                onClick={() => {
                                  setSelectedClass(cls);
                                  setOpenDeleteDialog(true);
                                }}
                                className="text-red-600"
                              >
                                <Trash2 className="w-4 h-4 mr-2" />
                                Delete Class
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
>>>>>>> 7a4dd40e090cb3ddef36ddbdb69a3b6bf074ca71
                  )}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between px-4 py-4 border-t border-slate-200 dark:border-slate-800">
                <p className="text-sm text-muted-foreground">
                  Page {page} of {totalPages} • {totalClassesCount} total
                  classes
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
<<<<<<< HEAD
                      let pageNum: number;
=======
                      let pageNum;
>>>>>>> 7a4dd40e090cb3ddef36ddbdb69a3b6bf074ca71
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

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Delete Class</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{selectedClass?.name}"? This
              action cannot be undone.
              {selectedClass && selectedClass.currentEnrollment > 0 && (
<<<<<<< HEAD
                <div className="mt-2 p-2 bg-amber-50 dark:bg-amber-950/30 rounded-lg flex items-center gap-2 text-amber-600 dark:text-amber-400">
=======
                <div className="mt-2 p-2 bg-amber-50 dark:bg-amber-950/30 rounded-lg flex items-center gap-2 text-amber-600">
>>>>>>> 7a4dd40e090cb3ddef36ddbdb69a3b6bf074ca71
                  <AlertCircle className="w-4 h-4" />
                  <span className="text-sm">
                    This class has {selectedClass.currentEnrollment} enrolled
                    students.
                  </span>
                </div>
              )}
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
              onClick={() => handleDeleteClass(selectedClass!.id)}
<<<<<<< HEAD
              disabled={isActionLoading}
              className="bg-red-600 hover:bg-red-700"
            >
              {isActionLoading && (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              )}
=======
              disabled={isLoading}
              className="bg-red-600 hover:bg-red-700"
            >
              {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
>>>>>>> 7a4dd40e090cb3ddef36ddbdb69a3b6bf074ca71
              Delete Class
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </TooltipProvider>
  );
}
