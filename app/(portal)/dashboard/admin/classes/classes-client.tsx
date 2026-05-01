// app/(portal)/dashboard/admin/classes/classes-client.tsx
"use client";

import { useState, useCallback, useEffect, useMemo } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
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
  Filter,
  ChevronDown,
  Grid3x3,
  List,
  Phone,
  Mail,
  MapPin,
  TrendingUp,
  Percent,
  UserCheck,
  GraduationCap,
  Sparkles,
  Star,
  ArrowUpRight,
  Download,
  Share2,
  Copy,
  RefreshCw,
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
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-media-query";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  deleteClass,
  bulkActivateClasses,
  bulkDeactivateClasses,
  bulkDeleteClasses,
  getClasses,
} from "../actions/classes";

// ============ TYPES ============
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
      phone?: string | null;
    };
    specialization: string | null;
    qualification?: string | null;
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
  capacityUtilization?: number;
  growthRate?: number;
}

interface Teacher {
  id: string;
  user: {
    name: string;
    email: string;
    image?: string | null;
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

// ============ HELPERS ============
const getLevelColor = (level: string) => {
  const colors: Record<string, string> = {
    Beginner:
      "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800",
    Intermediate:
      "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800",
    Advanced:
      "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-800",
    Expert:
      "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-800",
  };
  return (
    colors[level] ||
    "bg-gray-500/10 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-800"
  );
};

const getLevelGradient = (level: string) => {
  const gradients: Record<string, string> = {
    Beginner: "from-emerald-500 to-teal-500",
    Intermediate: "from-blue-500 to-indigo-500",
    Advanced: "from-purple-500 to-pink-500",
    Expert: "from-amber-500 to-orange-500",
  };
  return gradients[level] || "from-gray-500 to-gray-600";
};

const getDayName = (day: number, short = false) => {
  const days = short
    ? ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    : [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
  return days[day] || "Unknown";
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

const formatTime = (time: string) => {
  if (!time) return "";
  const [hours, minutes] = time.split(":");
  const hour = parseInt(hours, 10);
  const ampm = hour >= 12 ? "PM" : "AM";
  const hour12 = hour % 12 || 12;
  return `${hour12}:${minutes} ${ampm}`;
};

// ============ STAT CARD COMPONENT ============
interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ElementType;
  trend?: number;
  color: string;
  delay: number;
}

function StatCard({
  title,
  value,
  icon: Icon,
  trend,
  color,
  delay,
}: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={cn(
        "relative overflow-hidden rounded-2xl border bg-white dark:bg-slate-900/50 p-5",
        "backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5",
        `border-${color}-200 dark:border-${color}-800`,
      )}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p
            className={cn(
              "text-3xl font-black mt-1",
              `text-${color}-600 dark:text-${color}-400`,
            )}
          >
            {value}
          </p>
          {trend !== undefined && (
            <div className="flex items-center gap-1 mt-2">
              <TrendingUp
                className={cn(
                  "w-3 h-3",
                  trend >= 0 ? "text-emerald-500" : "text-red-500",
                )}
              />
              <span
                className={cn(
                  "text-xs font-medium",
                  trend >= 0 ? "text-emerald-500" : "text-red-500",
                )}
              >
                {trend >= 0 ? "+" : ""}
                {trend}%
              </span>
              <span className="text-xs text-muted-foreground">
                vs last month
              </span>
            </div>
          )}
        </div>
        <div
          className={cn(
            "rounded-xl p-3",
            `bg-${color}-100 dark:bg-${color}-950/40`,
          )}
        >
          <Icon
            className={cn(
              "w-5 h-5",
              `text-${color}-600 dark:text-${color}-400`,
            )}
          />
        </div>
      </div>
      <div
        className={cn(
          "absolute bottom-0 left-0 h-1",
          `bg-gradient-to-r ${getLevelGradient(title)}`,
        )}
        style={{
          width: `${Math.min(100, typeof value === "number" ? value : 0)}%`,
        }}
      />
    </motion.div>
  );
}

// ============ MOBILE CLASS CARD ============
interface MobileClassCardProps {
  cls: ClassWithRelations;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onDelete: (cls: ClassWithRelations) => void;
  isActionLoading: boolean;
}

function MobileClassCard({
  cls,
  isSelected,
  onSelect,
  onDelete,
  isActionLoading,
}: MobileClassCardProps) {
  const schedule = cls.schedules?.[0];
  const enrollmentPercent = cls.capacity
    ? (cls.currentEnrollment / cls.capacity) * 100
    : 0;
  const teacherName = cls.teacher?.user?.name || "Not Assigned";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -2 }}
      className={cn(
        "relative rounded-xl border bg-white dark:bg-slate-900 p-4 transition-all",
        isSelected
          ? "border-purple-400 bg-purple-50/50 dark:bg-purple-950/20"
          : "border-slate-200 dark:border-slate-800",
      )}
    >
      {/* Selection Checkbox */}
      <div className="absolute top-4 left-4">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => onSelect(cls.id)}
          className="w-4 h-4 rounded border-slate-300 focus:ring-purple-500"
        />
      </div>

      {/* Status Badge */}
      <div className="absolute top-4 right-4">
        <div
          className={cn(
            "px-2 py-0.5 rounded-full text-xs font-medium",
            cls.isActive
              ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400"
              : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400",
          )}
        >
          {cls.isActive ? "Active" : "Inactive"}
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-6 px-2 pb-2">
        {/* Class Header */}
        <div className="flex items-start gap-3 mb-3">
          <div
            className={cn(
              "w-12 h-12 rounded-xl flex items-center justify-center",
              "bg-gradient-to-br shadow-md",
              getLevelGradient(cls.level),
            )}
          >
            <School className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-base truncate">{cls.name}</h3>
            <p className="text-xs font-mono text-muted-foreground">
              {cls.code}
            </p>
          </div>
        </div>

        {/* Level Badge */}
        <div className="mb-3">
          <span
            className={cn(
              "text-xs font-medium px-2 py-1 rounded-full border",
              getLevelColor(cls.level),
            )}
          >
            {cls.level}
          </span>
        </div>

        {/* Teacher Info */}
        <div className="flex items-center gap-2 mb-3 p-2 rounded-lg bg-slate-50 dark:bg-slate-800/50">
          <Avatar className="w-8 h-8">
            <AvatarFallback className="text-xs">
              {getInitials(teacherName)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{teacherName}</p>
            <p className="text-xs text-muted-foreground truncate">
              {cls.teacher?.specialization || "Teacher"}
            </p>
          </div>
        </div>

        {/* Schedule */}
        {schedule && (
          <div className="flex items-center gap-2 mb-3 text-sm">
            <Calendar className="w-4 h-4 text-muted-foreground" />
            <span className="font-medium">
              {getDayName(schedule.dayOfWeek, true)}
            </span>
            <span className="text-muted-foreground">
              {formatTime(schedule.startTime)} - {formatTime(schedule.endTime)}
            </span>
          </div>
        )}

        {/* Enrollment Progress */}
        <div className="mb-3">
          <div className="flex justify-between text-xs mb-1">
            <span className="text-muted-foreground">Enrollment</span>
            <span className="font-medium">
              {cls.currentEnrollment} / {cls.capacity}
            </span>
          </div>
          <Progress value={enrollmentPercent} className="h-2" />
        </div>

        {/* Academic Year */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
          <GraduationCap className="w-3 h-3" />
          <span>{cls.academicYear}</span>
          {cls.term && <span>• {cls.term}</span>}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
          <Link href={`/dashboard/admin/classes/${cls.id}`} className="flex-1">
            <Button variant="outline" size="sm" className="w-full gap-1">
              <Eye className="w-3 h-3" />
              View
            </Button>
          </Link>
          <Link
            href={`/dashboard/admin/classes/${cls.id}/edit`}
            className="flex-1"
          >
            <Button variant="outline" size="sm" className="w-full gap-1">
              <Edit className="w-3 h-3" />
              Edit
            </Button>
          </Link>
          <Button
            variant="ghost"
            size="sm"
            className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/30"
            onClick={() => onDelete(cls)}
            disabled={isActionLoading}
          >
            <Trash2 className="w-3 h-3" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

// ============ MAIN COMPONENT ============
export function ClassesClient({
  initialClasses = [],
  initialStats,
  initialPage,
  initialSearch,
  initialLevel,
  initialAcademicYear,
  initialTeacherId,
  totalPages: initialTotalPages = 1,
  totalClasses: initialTotalClasses = 0,
  academicYears = [],
  levels = [],
  teachers = [],
}: ClassesClientProps) {
  const router = useRouter();
  const pathname = usePathname();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const isTablet = useMediaQuery("(min-width: 769px) and (max-width: 1024px)");
  const [viewMode, setViewMode] = useState<"table" | "grid">("grid");

  // Data states
  const [classes, setClasses] = useState<ClassWithRelations[]>(initialClasses);
  const [totalPages, setTotalPages] = useState(initialTotalPages);
  const [totalClassesCount, setTotalClassesCount] =
    useState(initialTotalClasses);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isActionLoading, setIsActionLoading] = useState(false);
  const [stats, setStats] = useState<Stats>(initialStats);

  // Selection states
  const [selectedClasses, setSelectedClasses] = useState<Set<string>>(
    new Set(),
  );

  // UI States
  const [isFilterSheetOpen, setIsFilterSheetOpen] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedClass, setSelectedClass] = useState<ClassWithRelations | null>(
    null,
  );

  // Filter states
  const [page, setPage] = useState(initialPage);
  const [search, setSearch] = useState(initialSearch || "");
  const [searchInput, setSearchInput] = useState(initialSearch || "");
  const [level, setLevel] = useState(initialLevel || "all");
  const [academicYear, setAcademicYear] = useState(
    initialAcademicYear || "all",
  );
  const [teacherId, setTeacherId] = useState(initialTeacherId || "all");
  const [showOnlyActive, setShowOnlyActive] = useState(false);

  const hasClasses = classes && classes.length > 0;

  // Filtered classes for grid view (for additional client-side filtering)
  const filteredClasses = useMemo(() => {
    let filtered = [...classes];
    if (showOnlyActive) {
      filtered = filtered.filter((c) => c.isActive);
    }
    return filtered;
  }, [classes, showOnlyActive]);

  // Fetch classes
  const fetchClasses = useCallback(async () => {
    setIsRefreshing(true);
    try {
      const result = await getClasses({
        page,
        limit: isMobile ? 10 : 15,
        search: search || undefined,
        level: level !== "all" ? level : undefined,
        academicYear: academicYear !== "all" ? academicYear : undefined,
        teacherId: teacherId !== "all" ? teacherId : undefined,
      });

      setClasses(result.data || []);
      setTotalPages(result.totalPages || 1);
      setTotalClassesCount(result.total || 0);
      setSelectedClasses(new Set());

      // Update stats if provided in response
      if (result.stats) {
        setStats((prev) => ({ ...prev, ...result.stats }));
      }
    } catch (error) {
      console.error("Error fetching classes:", error);
      toast.error("Failed to load classes");
    } finally {
      setIsRefreshing(false);
    }
  }, [page, search, level, academicYear, teacherId, isMobile]);

  // Update URL
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

  // Effects
  useEffect(() => {
    fetchClasses();
  }, [fetchClasses]);

  useEffect(() => {
    const timer = setTimeout(updateUrl, 300);
    return () => clearTimeout(timer);
  }, [page, search, level, academicYear, teacherId, updateUrl]);

  // Handlers
  const handleSearch = () => {
    setSearch(searchInput);
    setPage(1);
    setIsFilterSheetOpen(false);
  };

  const clearFilters = () => {
    setSearchInput("");
    setSearch("");
    setLevel("all");
    setAcademicYear("all");
    setTeacherId("all");
    setShowOnlyActive(false);
    setPage(1);
    setIsFilterSheetOpen(false);
    toast.success("Filters cleared");
  };

  const handleDeleteClass = async (id: string) => {
    setIsActionLoading(true);
    try {
      await deleteClass(id);
      await fetchClasses();
      toast.success("Class deleted successfully");
      setOpenDeleteDialog(false);
      setSelectedClass(null);
    } catch (error) {
      toast.error("Failed to delete class");
    } finally {
      setIsActionLoading(false);
    }
  };

  const handleBulkAction = async (
    action: "activate" | "deactivate" | "delete",
  ) => {
    const ids = Array.from(selectedClasses);
    if (ids.length === 0) return;

    let confirmMessage = "";
    let actionFn: any;
    let successMsg = "";

    switch (action) {
      case "activate":
        confirmMessage = `Activate ${ids.length} class(es)?`;
        actionFn = bulkActivateClasses;
        successMsg = `${ids.length} class(es) activated`;
        break;
      case "deactivate":
        confirmMessage = `Deactivate ${ids.length} class(es)?`;
        actionFn = bulkDeactivateClasses;
        successMsg = `${ids.length} class(es) deactivated`;
        break;
      case "delete":
        confirmMessage = `Delete ${ids.length} class(es)? This cannot be undone.`;
        actionFn = bulkDeleteClasses;
        successMsg = `${ids.length} class(es) deleted`;
        break;
    }

    if (!confirm(confirmMessage)) return;

    setIsActionLoading(true);
    try {
      await actionFn(ids);
      await fetchClasses();
      setSelectedClasses(new Set());
      toast.success(successMsg);
    } catch (error) {
      toast.error(`Failed to ${action} classes`);
    } finally {
      setIsActionLoading(false);
    }
  };

  const toggleSelectAll = () => {
    if (!hasClasses) return;
    if (selectedClasses.size === filteredClasses.length) {
      setSelectedClasses(new Set());
    } else {
      setSelectedClasses(new Set(filteredClasses.map((c) => c.id)));
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

  // Get active filter count
  const activeFilterCount = [
    search && "search",
    level !== "all" && "level",
    academicYear !== "all" && "year",
    teacherId !== "all" && "teacher",
    showOnlyActive && "active",
  ].filter(Boolean).length;

  // Render mobile filters sheet
  const renderFilterSheet = () => (
    <Sheet open={isFilterSheetOpen} onOpenChange={setIsFilterSheetOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="relative rounded-full">
          <Filter className="w-4 h-4 mr-2" />
          Filters
          {activeFilterCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 text-[10px] font-bold rounded-full bg-purple-500 text-white flex items-center justify-center">
              {activeFilterCount}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent
        side="bottom"
        className="rounded-t-2xl max-h-[85vh] overflow-y-auto"
      >
        <SheetHeader>
          <SheetTitle>Filter Classes</SheetTitle>
          <SheetDescription>Narrow down your class list</SheetDescription>
        </SheetHeader>
        <div className="py-6 space-y-5">
          {/* Search */}
          <div className="space-y-2">
            <Label>Search</Label>
            <Input
              placeholder="Class name or code..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="rounded-full"
            />
          </div>

          {/* Level */}
          <div className="space-y-2">
            <Label>Level</Label>
            <Select value={level} onValueChange={setLevel}>
              <SelectTrigger className="rounded-full">
                <SelectValue placeholder="All Levels" />
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
          </div>

          {/* Academic Year */}
          <div className="space-y-2">
            <Label>Academic Year</Label>
            <Select value={academicYear} onValueChange={setAcademicYear}>
              <SelectTrigger className="rounded-full">
                <SelectValue placeholder="All Years" />
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
          </div>

          {/* Teacher */}
          <div className="space-y-2">
            <Label>Teacher</Label>
            <Select value={teacherId} onValueChange={setTeacherId}>
              <SelectTrigger className="rounded-full">
                <SelectValue placeholder="All Teachers" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Teachers</SelectItem>
                {teachers.map((teacher) => (
                  <SelectItem key={teacher.id} value={teacher.id}>
                    {teacher.user?.name || "Unknown"}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Active Only Toggle */}
          <div className="flex items-center justify-between">
            <Label>Show active only</Label>
            <Switch
              checked={showOnlyActive}
              onCheckedChange={setShowOnlyActive}
            />
          </div>

          <Separator />

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <Button
              onClick={handleSearch}
              className="flex-1 rounded-full bg-purple-600"
            >
              <Search className="w-4 h-4 mr-2" />
              Apply Filters
            </Button>
            <Button
              variant="outline"
              onClick={clearFilters}
              className="flex-1 rounded-full"
            >
              <X className="w-4 h-4 mr-2" />
              Clear All
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );

  // Active filters bar for mobile
  const renderActiveFilters = () => {
    if (activeFilterCount === 0) return null;

    const filters = [];
    if (search)
      filters.push({
        label: `"${search}"`,
        onRemove: () => {
          setSearch("");
          setSearchInput("");
          setPage(1);
        },
      });
    if (level !== "all")
      filters.push({
        label: levels.find((l) => l === level) || level,
        onRemove: () => {
          setLevel("all");
          setPage(1);
        },
      });
    if (academicYear !== "all")
      filters.push({
        label: academicYear,
        onRemove: () => {
          setAcademicYear("all");
          setPage(1);
        },
      });
    if (teacherId !== "all")
      filters.push({
        label:
          teachers.find((t) => t.id === teacherId)?.user?.name || "Teacher",
        onRemove: () => {
          setTeacherId("all");
          setPage(1);
        },
      });
    if (showOnlyActive)
      filters.push({
        label: "Active only",
        onRemove: () => setShowOnlyActive(false),
      });

    return (
      <div className="flex flex-wrap gap-2 mt-3">
        {filters.map((filter, i) => (
          <Badge
            key={i}
            variant="secondary"
            className="gap-1 px-3 py-1.5 rounded-full"
          >
            {filter.label}
            <X
              className="w-3 h-3 ml-1 cursor-pointer hover:text-red-500"
              onClick={filter.onRemove}
            />
          </Badge>
        ))}
        <Button
          variant="ghost"
          size="sm"
          onClick={clearFilters}
          className="text-xs h-7"
        >
          Clear all
        </Button>
      </div>
    );
  };

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-8">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 sm:mb-8"
          >
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-gradient-to-br from-purple-500 to-amber-500 shadow-md">
                    <School className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-xs font-black uppercase tracking-wider text-purple-600 dark:text-purple-400">
                      Academic Management
                    </p>
                    <h1 className="text-2xl sm:text-3xl font-black tracking-tight bg-gradient-to-r from-purple-600 via-purple-500 to-amber-600 bg-clip-text text-transparent">
                      Classes
                    </h1>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={fetchClasses}
                        disabled={isRefreshing}
                        className="rounded-full"
                      >
                        <RefreshCw
                          className={cn(
                            "w-4 h-4",
                            isRefreshing && "animate-spin",
                          )}
                        />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Refresh</TooltipContent>
                  </Tooltip>
                  <Link href="/dashboard/admin/classes/new">
                    <Button className="rounded-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 shadow-md">
                      <Plus className="w-4 h-4 mr-2" />
                      {!isMobile && "Create Class"}
                    </Button>
                  </Link>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Manage classes, schedules, enrollments, and subjects
              </p>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
            <StatCard
              title="Total Classes"
              value={stats?.totalClasses || 0}
              icon={School}
              trend={8.2}
              color="purple"
              delay={0.1}
            />
            <StatCard
              title="Active Classes"
              value={stats?.activeClasses || 0}
              icon={CheckCircle}
              trend={5.1}
              color="emerald"
              delay={0.2}
            />
            <StatCard
              title="Enrollments"
              value={stats?.totalEnrollments || 0}
              icon={Users}
              trend={12.3}
              color="blue"
              delay={0.3}
            />
            <StatCard
              title="Avg. Class Size"
              value={stats?.averageClassSize || 0}
              icon={UserCheck}
              trend={2.4}
              color="amber"
              delay={0.4}
            />
          </div>

          {/* Loading Overlay */}
          <AnimatePresence>
            {(isRefreshing || isActionLoading) && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/20 z-50 flex items-center justify-center pointer-events-none"
              >
                <div className="bg-white dark:bg-slate-900 rounded-full p-3 shadow-lg">
                  <Loader2 className="w-6 h-6 animate-spin text-purple-600" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Bulk Actions Bar */}
          <AnimatePresence>
            {selectedClasses.size > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                className="bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-950/50 dark:to-purple-900/30 rounded-xl p-3 mb-4 border border-purple-200 dark:border-purple-800"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-purple-200 dark:bg-purple-800 flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                    </div>
                    <span className="text-sm font-semibold">
                      {selectedClasses.size} class
                      {selectedClasses.size !== 1 ? "es" : ""} selected
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleBulkAction("activate")}
                          disabled={isActionLoading}
                          className="border-emerald-300 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 rounded-full"
                        >
                          <CheckCircle className="w-3 h-3 sm:mr-1" />
                          <span className="hidden sm:inline">Activate</span>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Activate selected</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleBulkAction("deactivate")}
                          disabled={isActionLoading}
                          className="border-orange-300 text-orange-600 hover:bg-orange-50 dark:hover:bg-orange-950/30 rounded-full"
                        >
                          <XCircle className="w-3 h-3 sm:mr-1" />
                          <span className="hidden sm:inline">Deactivate</span>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Deactivate selected</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleBulkAction("delete")}
                          disabled={isActionLoading}
                          className="border-red-300 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-full"
                        >
                          <Trash2 className="w-3 h-3 sm:mr-1" />
                          <span className="hidden sm:inline">Delete</span>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Delete selected</TooltipContent>
                    </Tooltip>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Toolbar */}
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-3 mb-4">
            <div className="flex flex-col sm:flex-row gap-3">
              {/* Search - Desktop */}
              {!isMobile && (
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
              )}

              {/* Mobile Search and Filter Row */}
              {isMobile && (
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Search..."
                      value={searchInput}
                      onChange={(e) => setSearchInput(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                      className="pl-9 rounded-full"
                    />
                  </div>
                  {renderFilterSheet()}
                </div>
              )}

              {/* Desktop Filters */}
              {!isMobile && (
                <>
                  <Select value={level} onValueChange={setLevel}>
                    <SelectTrigger className="w-full sm:w-32 rounded-full">
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
                          {teacher.user?.name || "Unknown"}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button
                    onClick={handleSearch}
                    className="rounded-full px-6 bg-purple-600"
                  >
                    <Search className="w-4 h-4 mr-2" />
                    Search
                  </Button>
                </>
              )}

              {/* View Toggle */}
              {!isMobile && (
                <div className="flex gap-1 p-1 rounded-full bg-slate-100 dark:bg-slate-800">
                  <Button
                    variant={viewMode === "table" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("table")}
                    className={cn(
                      "rounded-full",
                      viewMode === "table" ? "bg-purple-600" : "",
                    )}
                  >
                    <List className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className={cn(
                      "rounded-full",
                      viewMode === "grid" ? "bg-purple-600" : "",
                    )}
                  >
                    <Grid3x3 className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </div>

            {/* Active Filters */}
            {renderActiveFilters()}
          </div>

          {/* Main Content - Table View (Desktop & Tablet) */}
          {!isMobile && viewMode === "table" && (
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader className="bg-slate-50 dark:bg-slate-800/50">
                    <TableRow>
                      <TableHead className="w-12">
                        <input
                          type="checkbox"
                          checked={
                            hasClasses
                              ? selectedClasses.size === filteredClasses.length
                              : false
                          }
                          onChange={toggleSelectAll}
                          disabled={isRefreshing || !hasClasses}
                          className="w-4 h-4 rounded border-slate-300 focus:ring-purple-500"
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
                    {!hasClasses ? (
                      <TableRow>
                        <TableCell colSpan={8} className="text-center py-12">
                          <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="flex flex-col items-center gap-3"
                          >
                            <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                              <School className="w-8 h-8 text-muted-foreground/50" />
                            </div>
                            <p className="text-muted-foreground">
                              No classes found
                            </p>
                            <Button
                              onClick={clearFilters}
                              variant="outline"
                              size="sm"
                              className="rounded-full"
                            >
                              Clear filters
                            </Button>
                          </motion.div>
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredClasses.map((cls, idx) => {
                        const schedule = cls.schedules?.[0];
                        const enrollmentPercent = cls.capacity
                          ? (cls.currentEnrollment / cls.capacity) * 100
                          : 0;
                        const teacherName =
                          cls.teacher?.user?.name || "Not Assigned";

                        return (
                          <motion.tr
                            key={cls.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.03 }}
                            className="hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer"
                            onClick={() =>
                              router.push(`/dashboard/admin/classes/${cls.id}`)
                            }
                          >
                            <TableCell onClick={(e) => e.stopPropagation()}>
                              <input
                                type="checkbox"
                                checked={selectedClasses.has(cls.id)}
                                onChange={() => toggleSelectClass(cls.id)}
                                disabled={isRefreshing}
                                className="w-4 h-4 rounded border-slate-300 focus:ring-purple-500"
                              />
                            </TableCell>
                            <TableCell>
                              <div>
                                <p className="font-bold text-sm">{cls.name}</p>
                                <p className="text-xs text-muted-foreground font-mono">
                                  {cls.code}
                                </p>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge
                                className={cn(
                                  "border font-medium",
                                  getLevelColor(cls.level),
                                )}
                              >
                                {cls.level}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Avatar className="w-6 h-6">
                                  <AvatarFallback className="text-[10px]">
                                    {getInitials(teacherName)}
                                  </AvatarFallback>
                                </Avatar>
                                <span className="text-sm font-medium truncate max-w-[120px]">
                                  {teacherName}
                                </span>
                              </div>
                            </TableCell>
                            <TableCell>
                              {schedule ? (
                                <div className="text-xs">
                                  <p className="font-medium">
                                    {getDayName(schedule.dayOfWeek, true)}
                                  </p>
                                  <p className="text-muted-foreground text-[10px]">
                                    {formatTime(schedule.startTime)} -{" "}
                                    {formatTime(schedule.endTime)}
                                  </p>
                                </div>
                              ) : (
                                <span className="text-xs text-muted-foreground">
                                  No schedule
                                </span>
                              )}
                            </TableCell>
                            <TableCell>
                              <div className="flex flex-col gap-1 min-w-[100px]">
                                <div className="flex items-center justify-between gap-2 text-xs">
                                  <span className="font-medium">
                                    {cls.currentEnrollment}
                                  </span>
                                  <span className="text-muted-foreground">
                                    / {cls.capacity}
                                  </span>
                                  <span className="text-emerald-600 font-medium">
                                    {Math.round(enrollmentPercent)}%
                                  </span>
                                </div>
                                <Progress
                                  value={enrollmentPercent}
                                  className="h-1.5"
                                />
                              </div>
                            </TableCell>
                            <TableCell>
                              <div
                                className={cn(
                                  "px-2 py-1 rounded-full text-xs font-medium inline-flex items-center gap-1",
                                  cls.isActive
                                    ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400"
                                    : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400",
                                )}
                              >
                                <div
                                  className={cn(
                                    "w-1.5 h-1.5 rounded-full",
                                    cls.isActive
                                      ? "bg-emerald-500"
                                      : "bg-gray-400",
                                  )}
                                />
                                {cls.isActive ? "Active" : "Inactive"}
                              </div>
                            </TableCell>
                            <TableCell onClick={(e) => e.stopPropagation()}>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 rounded-full"
                                  >
                                    <MoreHorizontal className="w-4 h-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                  align="end"
                                  className="w-48"
                                >
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
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem
                                    onClick={() => {
                                      setSelectedClass(cls);
                                      setOpenDeleteDialog(true);
                                    }}
                                    className="text-red-600"
                                  >
                                    <Trash2 className="w-4 h-4 mr-2" />
                                    Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </motion.tr>
                        );
                      })
                    )}
                  </TableBody>
                </Table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-4 py-4 border-t border-slate-200 dark:border-slate-800">
                  <p className="text-sm text-muted-foreground order-2 sm:order-1">
                    Page {page} of {totalPages} • {totalClassesCount} total
                  </p>
                  <div className="flex gap-2 order-1 sm:order-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                      disabled={page === 1 || isRefreshing}
                      className="rounded-full"
                    >
                      <ChevronLeft className="w-4 h-4 mr-1" />
                      Prev
                    </Button>
                    <div className="hidden sm:flex gap-1">
                      {Array.from(
                        { length: Math.min(5, totalPages) },
                        (_, i) => {
                          let pageNum: number;
                          if (totalPages <= 5) pageNum = i + 1;
                          else if (page <= 3) pageNum = i + 1;
                          else if (page >= totalPages - 2)
                            pageNum = totalPages - 4 + i;
                          else pageNum = page - 2 + i;
                          return (
                            <Button
                              key={pageNum}
                              variant={page === pageNum ? "default" : "outline"}
                              size="sm"
                              onClick={() => setPage(pageNum)}
                              disabled={isRefreshing}
                              className={cn(
                                "rounded-full w-9",
                                page === pageNum ? "bg-purple-600" : "",
                              )}
                            >
                              {pageNum}
                            </Button>
                          );
                        },
                      )}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setPage((p) => Math.min(totalPages, p + 1))
                      }
                      disabled={page === totalPages || isRefreshing}
                      className="rounded-full"
                    >
                      Next
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Main Content - Grid/Card View (Mobile & Tablet) */}
          {(isMobile || viewMode === "grid") && (
            <div className="space-y-4">
              {/* Select All for Mobile */}
              {hasClasses && filteredClasses.length > 0 && !isMobile && (
                <div className="flex items-center justify-between px-2 py-2 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                  <button
                    onClick={toggleSelectAll}
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-purple-600"
                  >
                    <input
                      type="checkbox"
                      checked={selectedClasses.size === filteredClasses.length}
                      onChange={toggleSelectAll}
                      className="w-4 h-4 rounded"
                    />
                    Select All
                  </button>
                  <span className="text-xs text-muted-foreground">
                    {filteredClasses.length} classes
                  </span>
                </div>
              )}

              {/* Grid of Cards */}
              <AnimatePresence>
                <div className="grid grid-cols-1 gap-4">
                  {!hasClasses ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center py-12"
                    >
                      <div className="flex flex-col items-center gap-3">
                        <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                          <School className="w-8 h-8 text-muted-foreground/50" />
                        </div>
                        <p className="text-muted-foreground">
                          No classes found
                        </p>
                        <Button
                          onClick={clearFilters}
                          variant="outline"
                          size="sm"
                          className="rounded-full"
                        >
                          Clear filters
                        </Button>
                      </div>
                    </motion.div>
                  ) : (
                    filteredClasses.map((cls) => (
                      <MobileClassCard
                        key={cls.id}
                        cls={cls}
                        isSelected={selectedClasses.has(cls.id)}
                        onSelect={toggleSelectClass}
                        onDelete={(c) => {
                          setSelectedClass(c);
                          setOpenDeleteDialog(true);
                        }}
                        isActionLoading={isActionLoading}
                      />
                    ))
                  )}
                </div>
              </AnimatePresence>

              {/* Pagination for Mobile */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between gap-4 pt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1 || isRefreshing}
                    className="rounded-full"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <span className="text-sm text-muted-foreground">
                    Page {page} of {totalPages}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages || isRefreshing}
                    className="rounded-full"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
        <DialogContent className="sm:max-w-md rounded-2xl">
          <DialogHeader>
            <div className="mx-auto w-12 h-12 rounded-full bg-red-100 dark:bg-red-950/40 flex items-center justify-center mb-3">
              <AlertCircle className="w-6 h-6 text-red-600" />
            </div>
            <DialogTitle className="text-center">Delete Class</DialogTitle>
            <DialogDescription className="text-center">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-foreground">
                "{selectedClass?.name}"
              </span>
              ?
              <br />
              This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          {selectedClass && selectedClass.currentEnrollment > 0 && (
            <div className="p-3 bg-amber-50 dark:bg-amber-950/30 rounded-lg flex items-center gap-2 text-amber-600 dark:text-amber-400">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span className="text-sm">
                This class has{" "}
                <strong>{selectedClass.currentEnrollment}</strong> enrolled
                students.
              </span>
            </div>
          )}
          <DialogFooter className="flex gap-3 sm:gap-2">
            <Button
              variant="outline"
              onClick={() => setOpenDeleteDialog(false)}
              className="flex-1 rounded-full"
            >
              Cancel
            </Button>
            <Button
              onClick={() => handleDeleteClass(selectedClass!.id)}
              disabled={isActionLoading}
              className="flex-1 rounded-full bg-red-600 hover:bg-red-700"
            >
              {isActionLoading && (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              )}
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </TooltipProvider>
  );
}
