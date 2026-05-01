// app/(portal)/dashboard/admin/subjects/subjects-client.tsx
"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import {
  BookOpen,
  Search,
  X,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  Loader2,
  CheckCircle,
  Eye,
  Edit,
  Trash2,
  Plus,
  FileText,
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
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { TooltipProvider } from "@/components/ui/tooltip";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import {
  deleteSubject,
  bulkDeleteSubjects,
  getSubjects,
} from "../actions/subjects";
import { SubjectCategory } from "@/app/generated/prisma/enums";

// Types
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
  };
  materials: Array<{ id: string; title: string; type: string }>;
  assignments: Array<{ id: string; title: string; dueDate: Date; submissions: number }>;
}

interface Stats {
  totalSubjects: number;
  byCategory: Record<SubjectCategory, number>;
  byClass: { className: string; count: number }[];
  byTeacher: { teacherName: string; count: number }[];
  totalMaterials: number;
  totalAssignments: number;
  averageGrade: number;
}

interface Teacher {
  id: string;
  name: string;
  specialization: string | null;
}

interface Class {
  id: string;
  name: string;
  code: string;
  level: string;
}

interface SubjectsClientProps {
  initialSubjects: SubjectWithRelations[];
  initialStats: Stats;
  initialPage: number;
  initialSearch?: string;
  initialCategory?: string;
  initialTeacherId?: string;
  initialClassId?: string;
  totalPages: number;
  totalSubjects: number;
  categories: string[];
  teachers: Teacher[];
  classes: Class[];
}

const CATEGORY_COLORS: Record<SubjectCategory, string> = {
  QURAN: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400",
  TAJWEED: "bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400",
  ARABIC: "bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400",
  FIQH: "bg-purple-100 text-purple-700 dark:bg-purple-950/40 dark:text-purple-400",
  AQEEDAH: "bg-rose-100 text-rose-700 dark:bg-rose-950/40 dark:text-rose-400",
  SEERAH: "bg-orange-100 text-orange-700 dark:bg-orange-950/40 dark:text-orange-400",
  HADITH: "bg-indigo-100 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-400",
  AKHLAQ: "bg-teal-100 text-teal-700 dark:bg-teal-950/40 dark:text-teal-400",
  HISTORY: "bg-cyan-100 text-cyan-700 dark:bg-cyan-950/40 dark:text-cyan-400",
  OTHER: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400",
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

export function SubjectsClient({
  initialSubjects,
  initialStats,
  initialPage,
  initialSearch,
  initialCategory,
  initialTeacherId,
  initialClassId,
  totalPages: initialTotalPages,
  totalSubjects: initialTotalSubjects,
  categories,
  teachers,
  classes,
}: SubjectsClientProps) {
  const router = useRouter();
  const pathname = usePathname();

  // Data states
  const [subjects, setSubjects] = useState(initialSubjects);
  const [stats] = useState(initialStats);
  const [totalPages, setTotalPages] = useState(initialTotalPages);
  const [totalSubjectsCount, setTotalSubjectsCount] = useState(initialTotalSubjects);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isActionLoading, setIsActionLoading] = useState(false);

  // Selection states
  const [selectedSubjects, setSelectedSubjects] = useState<Set<string>>(new Set());

  // Dialog states
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState<SubjectWithRelations | null>(null);

  // Filter states
  const [page, setPage] = useState(initialPage);
  const [search, setSearch] = useState(initialSearch || "");
  const [searchInput, setSearchInput] = useState(initialSearch || "");
  const [category, setCategory] = useState(initialCategory || "all");
  const [teacherId, setTeacherId] = useState(initialTeacherId || "all");
  const [classId, setClassId] = useState(initialClassId || "all");

  const hasSubjects = subjects && subjects.length > 0;

  // Fetch subjects using server action
  const fetchSubjects = useCallback(async () => {
    setIsRefreshing(true);
    try {
      const result = await getSubjects({
        page,
        limit: 10,
        search: search || undefined,
        category: category !== "all" ? category as SubjectCategory : undefined,
        teacherId: teacherId !== "all" ? teacherId : undefined,
        classId: classId !== "all" ? classId : undefined,
      });

      setSubjects(result.data);
      setTotalPages(result.totalPages);
      setTotalSubjectsCount(result.total);
      setSelectedSubjects(new Set());
    } catch (error) {
      console.error("Error fetching subjects:", error);
      toast.error("Failed to load subjects");
    } finally {
      setIsRefreshing(false);
    }
  }, [page, search, category, teacherId, classId]);

  // Update URL when filters change
  const updateUrl = useCallback(() => {
    const params = new URLSearchParams();
    if (page > 1) params.set("page", page.toString());
    if (search) params.set("search", search);
    if (category !== "all") params.set("category", category);
    if (teacherId !== "all") params.set("teacherId", teacherId);
    if (classId !== "all") params.set("classId", classId);

    const newUrl = `${pathname}${params.toString() ? `?${params.toString()}` : ""}`;
    router.replace(newUrl, { scroll: false });
  }, [page, search, category, teacherId, classId, router, pathname]);

  // Fetch data when filters change
  useEffect(() => {
    fetchSubjects();
  }, [fetchSubjects]);

  // Update URL when filters change (debounced)
  useEffect(() => {
    const timer = setTimeout(() => {
      updateUrl();
    }, 300);
    return () => clearTimeout(timer);
  }, [page, search, category, teacherId, classId, updateUrl]);

  const handleSearch = () => {
    setSearch(searchInput);
    setPage(1);
  };

  const clearFilters = () => {
    setSearchInput("");
    setSearch("");
    setCategory("all");
    setTeacherId("all");
    setClassId("all");
    setPage(1);
  };

  const handleDeleteSubject = async (subjectId: string) => {
    setIsActionLoading(true);
    try {
      await deleteSubject(subjectId);
      await fetchSubjects();
      toast.success("Subject deleted successfully");
      setOpenDeleteDialog(false);
      setSelectedSubject(null);
    } catch (error) {
      toast.error("Failed to delete subject");
    } finally {
      setIsActionLoading(false);
    }
  };

  const handleBulkDelete = async () => {
    const ids = Array.from(selectedSubjects);
    if (ids.length === 0) return;

    if (!confirm(`Delete ${ids.length} subject(s)? This action cannot be undone.`)) return;

    setIsActionLoading(true);
    try {
      await bulkDeleteSubjects(ids);
      await fetchSubjects();
      setSelectedSubjects(new Set());
      toast.success(`${ids.length} subject(s) deleted successfully`);
    } catch (error) {
      toast.error("Failed to delete subjects");
    } finally {
      setIsActionLoading(false);
    }
  };

  const toggleSelectAll = () => {
    if (!hasSubjects) return;

    if (selectedSubjects.size === subjects.length) {
      setSelectedSubjects(new Set());
    } else {
      setSelectedSubjects(new Set(subjects.map((s) => s.id)));
    }
  };

  const toggleSelectSubject = (id: string) => {
    const newSelected = new Set(selectedSubjects);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedSubjects(newSelected);
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
                  <BookOpen className="w-5 h-5 text-amber-500" />
                  <span className="text-xs font-black uppercase tracking-wider text-amber-600 dark:text-amber-400">
                    Curriculum Management
                  </span>
                </div>
                <h1 className="text-3xl sm:text-4xl font-black tracking-tighter bg-gradient-to-r from-purple-600 to-amber-600 bg-clip-text text-transparent">
                  Subjects
                </h1>
                <p className="text-muted-foreground text-sm mt-1">
                  Manage subjects, curriculum, and course materials across all classes
                </p>
              </div>
              <Link href="/dashboard/admin/subjects/new">
                <Button className="rounded-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 shadow-md">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Subject
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
                    <p className="text-sm text-muted-foreground">Total Subjects</p>
                    <p className="text-3xl font-black">{stats.totalSubjects}</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-950/40 flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-blue-200 dark:border-blue-800">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Materials</p>
                    <p className="text-3xl font-black text-blue-600">{stats.totalMaterials}</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-950/40 flex items-center justify-center">
                    <FileText className="w-5 h-5 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-amber-200 dark:border-amber-800">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Assignments</p>
                    <p className="text-3xl font-black text-amber-600">{stats.totalAssignments}</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-950/40 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-amber-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-emerald-200 dark:border-emerald-800">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Avg. Grade</p>
                    <p className="text-3xl font-black text-emerald-600">{Math.round(stats.averageGrade)}%</p>
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
          {selectedSubjects.size > 0 && (
            <div className="bg-purple-50 dark:bg-purple-950/30 rounded-xl p-4 mb-6 flex flex-wrap items-center justify-between gap-4 border border-purple-200 dark:border-purple-800">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-purple-600" />
                <span className="text-sm font-black">{selectedSubjects.size} subject(s) selected</span>
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
                    placeholder="Search by name or code..."
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                    className="pl-9 rounded-full"
                  />
                </div>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger className="w-full sm:w-40 rounded-full">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
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
                    {teachers.map((t) => (
                      <SelectItem key={t.id} value={t.id}>
                        {t.name}
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
                <Button onClick={handleSearch} className="rounded-full px-6 bg-purple-600 hover:bg-purple-700">
                  <Search className="w-4 h-4 mr-2" />
                  Search
                </Button>
                {(category !== "all" || teacherId !== "all" || classId !== "all" || search) && (
                  <Button onClick={clearFilters} variant="outline" className="rounded-full">
                    <X className="w-4 h-4 mr-2" />
                    Clear
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Subjects Table */}
          <Card>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-slate-50 dark:bg-slate-800/50">
                  <TableRow>
                    <TableHead className="w-12">
                      <input
                        type="checkbox"
                        checked={hasSubjects ? selectedSubjects.size === subjects.length : false}
                        onChange={toggleSelectAll}
                        disabled={isRefreshing || !hasSubjects}
                        className="w-4 h-4 rounded border-slate-300"
                      />
                    </TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Teacher</TableHead>
                    <TableHead>Class</TableHead>
                    <TableHead>Materials</TableHead>
                    <TableHead>Assignments</TableHead>
                    <TableHead className="w-12"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {!hasSubjects ? (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-12">
                        <div className="flex flex-col items-center gap-2">
                          <BookOpen className="w-12 h-12 text-muted-foreground/30" />
                          <p className="text-muted-foreground">No subjects found</p>
                          <Button onClick={clearFilters} variant="outline" size="sm" className="mt-2">
                            Clear filters
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    subjects.map((subject) => {
                      const categoryColor = CATEGORY_COLORS[subject.category] || CATEGORY_COLORS.OTHER;

                      return (
                        <TableRow key={subject.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                          <TableCell>
                            <input
                              type="checkbox"
                              checked={selectedSubjects.has(subject.id)}
                              onChange={() => toggleSelectSubject(subject.id)}
                              disabled={isRefreshing}
                              className="w-4 h-4 rounded border-slate-300"
                            />
                          </TableCell>
                          <TableCell>
                            <div>
                              <p className="font-black text-sm">{subject.name}</p>
                              <p className="text-xs text-muted-foreground font-mono">{subject.code}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <span className={cn("text-xs font-black px-2 py-0.5 rounded-full", categoryColor)}>
                              {subject.category}
                            </span>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Avatar className="w-6 h-6">
                                <AvatarFallback className="text-[10px]">
                                  {getInitials(subject.teacher.user.name)}
                                </AvatarFallback>
                              </Avatar>
                              <span className="text-sm font-medium">{subject.teacher.user.name}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <p className="text-sm font-medium">{subject.class.name}</p>
                              <p className="text-xs text-muted-foreground">{subject.class.level}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <FileText className="w-3 h-3 text-muted-foreground" />
                              <span className="text-sm font-medium">{subject.materials.length}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3 text-muted-foreground" />
                              <span className="text-sm font-medium">{subject.assignments.length}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8" disabled={isActionLoading}>
                                  <MoreHorizontal className="w-4 h-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="w-48">
                                <DropdownMenuItem asChild>
                                  <Link href={`/dashboard/admin/subjects/${subject.id}`}>
                                    <Eye className="w-4 h-4 mr-2" />
                                    View Details
                                  </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                  <Link href={`/dashboard/admin/subjects/${subject.id}/edit`}>
                                    <Edit className="w-4 h-4 mr-2" />
                                    Edit Subject
                                  </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                  <Link href={`/dashboard/admin/subjects/${subject.id}/materials`}>
                                    <FileText className="w-4 h-4 mr-2" />
                                    Manage Materials
                                  </Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                  onClick={() => {
                                    setSelectedSubject(subject);
                                    setOpenDeleteDialog(true);
                                  }}
                                  className="text-red-600"
                                >
                                  <Trash2 className="w-4 h-4 mr-2" />
                                  Delete Subject
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
                  Page {page} of {totalPages} • {totalSubjectsCount} total subjects
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
            <DialogTitle>Delete Subject</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{selectedSubject?.name}"?
              This action will also delete all associated materials, assignments, and grades.
              This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenDeleteDialog(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => handleDeleteSubject(selectedSubject!.id)}
              disabled={isActionLoading}
              className="bg-red-600 hover:bg-red-700"
            >
              {isActionLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Delete Subject
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </TooltipProvider>
  );
}