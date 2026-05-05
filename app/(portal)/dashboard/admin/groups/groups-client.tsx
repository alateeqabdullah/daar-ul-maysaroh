// app/(portal)/dashboard/admin/groups/groups-client.tsx
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
  Clock,
  UserPlus,
  Eye,
  Edit,
  Trash2,
  Plus,
  Loader2,
  CheckCircle,
  XCircle,
  School,
  BookOpen,
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { TooltipProvider } from "@/components/ui/tooltip";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { deleteGroup, bulkDeleteGroups, getGroups } from "../actions/groups";
import { GroupType } from "@/app/generated/prisma/enums";

// Types
interface GroupWithRelations {
  id: string;
  name: string;
  description: string | null;
  type: GroupType;
  academicYear: string;
  term: string | null;
  capacity: number;
  currentCount: number;
  teacherId: string | null;
  assistantTeacherId: string | null;
  classId: string | null;
  scheduleType: string;
  isActive: boolean;
  startDate: Date | null;
  endDate: Date | null;
  createdAt: Date;
  teacher?: {
    id: string;
    user: {
      name: string;
      email: string;
      image: string | null;
    };
  };
  class?: {
    id: string;
    name: string;
    code: string;
    level: string;
  };
  schedules: Array<{
    id: string;
    dayOfWeek: number;
    startTime: string;
    endTime: string;
  }>;
  members: Array<{
    id: string;
    studentName: string;
    joinedAt: Date;
  }>;
}

interface Stats {
  totalGroups: number;
  activeGroups: number;
  totalMembers: number;
  averageGroupSize: number;
  byType: Record<GroupType, number>;
}

interface Teacher {
  id: string;
  name: string;
  email: string;
}

interface Class {
  id: string;
  name: string;
  code: string;
  level: string;
}

interface GroupsClientProps {
  initialGroups: GroupWithRelations[];
  initialStats: Stats;
  initialPage: number;
  initialSearch?: string;
  initialType?: string;
  initialTeacherId?: string;
  initialClassId?: string;
  totalPages: number;
  totalGroups: number;
  types: string[];
  teachers: Teacher[];
  classes: Class[];
}

const TYPE_COLORS: Record<GroupType, string> = {
  ACADEMIC:
    "bg-purple-100 text-purple-700 dark:bg-purple-950/40 dark:text-purple-400",
  HIFZ: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400",
  REVISION: "bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400",
  SUPPORT:
    "bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400",
  PROJECT: "bg-cyan-100 text-cyan-700 dark:bg-cyan-950/40 dark:text-cyan-400",
  COMPETITION:
    "bg-rose-100 text-rose-700 dark:bg-rose-950/40 dark:text-rose-400",
  SOCIAL:
    "bg-indigo-100 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-400",
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
  return days[day];
};

export function GroupsClient({
  initialGroups,
  initialStats,
  initialPage,
  initialSearch,
  initialType,
  initialTeacherId,
  initialClassId,
  totalPages: initialTotalPages,
  totalGroups: initialTotalGroups,
  types,
  teachers,
  classes,
}: GroupsClientProps) {
  const router = useRouter();
  const pathname = usePathname();

  // Data states
  const [groups, setGroups] = useState(initialGroups);
  const [stats] = useState(initialStats);
  const [totalPages, setTotalPages] = useState(initialTotalPages);
  const [totalGroupsCount, setTotalGroupsCount] = useState(initialTotalGroups);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isActionLoading, setIsActionLoading] = useState(false);

  // Selection states
  const [selectedGroups, setSelectedGroups] = useState<Set<string>>(new Set());

  // Dialog states
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<GroupWithRelations | null>(
    null,
  );

  // Filter states
  const [page, setPage] = useState(initialPage);
  const [search, setSearch] = useState(initialSearch || "");
  const [searchInput, setSearchInput] = useState(initialSearch || "");
  const [type, setType] = useState(initialType || "all");
  const [teacherId, setTeacherId] = useState(initialTeacherId || "all");
  const [classId, setClassId] = useState(initialClassId || "all");

  const hasGroups = groups && groups.length > 0;

  // Fetch groups
  const fetchGroups = useCallback(async () => {
    setIsRefreshing(true);
    try {
      const result = await getGroups({
        page,
        limit: 10,
        search: search || undefined,
        type: type !== "all" ? (type as GroupType) : undefined,
        teacherId: teacherId !== "all" ? teacherId : undefined,
        classId: classId !== "all" ? classId : undefined,
      });

      setGroups(result.data);
      setTotalPages(result.totalPages);
      setTotalGroupsCount(result.total);
      setSelectedGroups(new Set());
    } catch (error) {
      toast.error("Failed to load groups");
    } finally {
      setIsRefreshing(false);
    }
  }, [page, search, type, teacherId, classId]);

  // Update URL
  const updateUrl = useCallback(() => {
    const params = new URLSearchParams();
    if (page > 1) params.set("page", page.toString());
    if (search) params.set("search", search);
    if (type !== "all") params.set("type", type);
    if (teacherId !== "all") params.set("teacherId", teacherId);
    if (classId !== "all") params.set("classId", classId);

    const newUrl = `${pathname}${params.toString() ? `?${params.toString()}` : ""}`;
    router.replace(newUrl, { scroll: false });
  }, [page, search, type, teacherId, classId, router, pathname]);

  useEffect(() => {
    fetchGroups();
  }, [fetchGroups]);

  useEffect(() => {
    const timer = setTimeout(() => updateUrl(), 300);
    return () => clearTimeout(timer);
  }, [page, search, type, teacherId, classId, updateUrl]);

  const handleSearch = () => {
    setSearch(searchInput);
    setPage(1);
  };

  const clearFilters = () => {
    setSearchInput("");
    setSearch("");
    setType("all");
    setTeacherId("all");
    setClassId("all");
    setPage(1);
  };

  const handleDeleteGroup = async (id: string) => {
    setIsActionLoading(true);
    try {
      await deleteGroup(id);
      await fetchGroups();
      toast.success("Group deleted successfully");
      setOpenDeleteDialog(false);
      setSelectedGroup(null);
    } catch (error) {
      toast.error("Failed to delete group");
    } finally {
      setIsActionLoading(false);
    }
  };

  const handleBulkDelete = async () => {
    const ids = Array.from(selectedGroups);
    if (ids.length === 0) return;

    if (
      !confirm(`Delete ${ids.length} group(s)? This action cannot be undone.`)
    )
      return;

    setIsActionLoading(true);
    try {
      await bulkDeleteGroups(ids);
      await fetchGroups();
      setSelectedGroups(new Set());
      toast.success(`${ids.length} group(s) deleted successfully`);
    } catch (error) {
      toast.error("Failed to delete groups");
    } finally {
      setIsActionLoading(false);
    }
  };

  const toggleSelectAll = () => {
    if (selectedGroups.size === groups.length) {
      setSelectedGroups(new Set());
    } else {
      setSelectedGroups(new Set(groups.map((g) => g.id)));
    }
  };

  const toggleSelectGroup = (id: string) => {
    const newSelected = new Set(selectedGroups);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedGroups(newSelected);
  };

  const getScheduleDisplay = (schedules: GroupWithRelations["schedules"]) => {
    if (!schedules || schedules.length === 0) return "No schedule";
    const first = schedules[0];
    return `${getDayName(first.dayOfWeek)} ${first.startTime}-${first.endTime}`;
  };

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
        <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-1">
              <Users className="w-5 h-5 text-amber-500" />
              <span className="text-xs font-black uppercase tracking-wider text-amber-600 dark:text-amber-400">
                Group Management
              </span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-3xl sm:text-4xl font-black tracking-tighter bg-gradient-to-r from-purple-600 to-amber-600 bg-clip-text text-transparent">
                  Student Groups
                </h1>
                <p className="text-muted-foreground text-sm mt-1">
                  Manage student groups, schedules, and members
                </p>
              </div>
              <Link href="/dashboard/admin/groups/new">
                <Button className="rounded-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 shadow-md">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Group
                </Button>
              </Link>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Total Groups
                    </p>
                    <p className="text-3xl font-black">{stats.totalGroups}</p>
                  </div>
                  <Users className="w-5 h-5 text-purple-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Active Groups
                    </p>
                    <p className="text-3xl font-black text-emerald-600">
                      {stats.activeGroups}
                    </p>
                  </div>
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Total Members
                    </p>
                    <p className="text-3xl font-black text-blue-600">
                      {stats.totalMembers}
                    </p>
                  </div>
                  <Users className="w-5 h-5 text-blue-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Avg. Group Size
                    </p>
                    <p className="text-3xl font-black text-amber-600">
                      {stats.averageGroupSize}
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
          {selectedGroups.size > 0 && (
            <div className="bg-purple-50 dark:bg-purple-950/30 rounded-xl p-4 mb-6 flex flex-wrap items-center justify-between gap-4 border border-purple-200 dark:border-purple-800">
              <span className="text-sm font-black">
                {selectedGroups.size} group(s) selected
              </span>
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
          )}

          {/* Filters */}
          <Card className="mb-6">
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search groups..."
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                    className="pl-9 rounded-full"
                  />
                </div>
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
                        {c.name}
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
                {(type !== "all" ||
                  teacherId !== "all" ||
                  classId !== "all" ||
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

          {/* Groups Table */}
          <Card>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-slate-50 dark:bg-slate-800/50">
                  <TableRow>
                    <TableHead className="w-12">
                      <input
                        type="checkbox"
                        checked={
                          hasGroups
                            ? selectedGroups.size === groups.length
                            : false
                        }
                        onChange={toggleSelectAll}
                        className="w-4 h-4 rounded"
                      />
                    </TableHead>
                    <TableHead>Group</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Teacher</TableHead>
                    <TableHead>Schedule</TableHead>
                    <TableHead>Members</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-12"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {!hasGroups ? (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-12">
                        <div className="flex flex-col items-center gap-2">
                          <Users className="w-12 h-12 text-muted-foreground/30" />
                          <p className="text-muted-foreground">
                            No groups found
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
                    groups.map((group) => {
                      const typeColor =
                        TYPE_COLORS[group.type] || TYPE_COLORS.OTHER;

                      return (
                        <TableRow
                          key={group.id}
                          className="hover:bg-slate-50 dark:hover:bg-slate-800/50"
                        >
                          <TableCell>
                            <input
                              type="checkbox"
                              checked={selectedGroups.has(group.id)}
                              onChange={() => toggleSelectGroup(group.id)}
                              className="w-4 h-4 rounded"
                            />
                          </TableCell>
                          <TableCell>
                            <div>
                              <p className="font-black text-sm">{group.name}</p>
                              <p className="text-xs text-muted-foreground line-clamp-1">
                                {group.description || "No description"}
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
                              {group.type}
                            </span>
                          </TableCell>
                          <TableCell>
                            {group.teacher ? (
                              <div className="flex items-center gap-2">
                                <Avatar className="w-6 h-6">
                                  <AvatarFallback className="text-[10px]">
                                    {getInitials(group.teacher.user.name)}
                                  </AvatarFallback>
                                </Avatar>
                                <span className="text-sm font-medium">
                                  {group.teacher.user.name}
                                </span>
                              </div>
                            ) : (
                              <span className="text-muted-foreground text-sm">
                                Not assigned
                              </span>
                            )}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1 text-sm">
                              <Calendar className="w-3.5 h-3.5 text-muted-foreground" />
                              <span>{getScheduleDisplay(group.schedules)}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-black">
                                {group.currentCount}
                              </span>
                              <span className="text-xs text-muted-foreground">
                                / {group.capacity}
                              </span>
                              <div className="w-12 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-purple-600 rounded-full"
                                  style={{
                                    width: `${(group.currentCount / group.capacity) * 100}%`,
                                  }}
                                />
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            {group.isActive ? (
                              <Badge className="bg-emerald-100 text-emerald-700">
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
                                >
                                  <MoreHorizontal className="w-4 h-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="w-48">
                                <DropdownMenuItem asChild>
                                  <Link
                                    href={`/dashboard/admin/groups/${group.id}`}
                                  >
                                    <Eye className="w-4 h-4 mr-2" />
                                    View Details
                                  </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                  <Link
                                    href={`/dashboard/admin/groups/${group.id}/edit`}
                                  >
                                    <Edit className="w-4 h-4 mr-2" />
                                    Edit Group
                                  </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                  <Link
                                    href={`/dashboard/admin/groups/${group.id}/members`}
                                  >
                                    <UserPlus className="w-4 h-4 mr-2" />
                                    Manage Members
                                  </Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                  onClick={() => {
                                    setSelectedGroup(group);
                                    setOpenDeleteDialog(true);
                                  }}
                                  className="text-red-600"
                                >
                                  <Trash2 className="w-4 h-4 mr-2" />
                                  Delete Group
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
                  Page {page} of {totalPages} • {totalGroupsCount} total groups
                </p>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="rounded-full"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Previous
                  </Button>
                  <div className="flex gap-1">
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let pageNum;
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
                    disabled={page === totalPages}
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

      {/* Delete Dialog */}
      <Dialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Delete Group</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{selectedGroup?.name}"? This
              action cannot be undone.
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
              onClick={() => handleDeleteGroup(selectedGroup!.id)}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete Group
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </TooltipProvider>
  );
}
