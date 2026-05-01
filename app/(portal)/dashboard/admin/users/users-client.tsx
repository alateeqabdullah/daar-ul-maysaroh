// app/(portal)/dashboard/admin/users/users-client.tsx
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
  Shield,
  UserCheck,
  UserX,
  UserPlus,
  Trash2,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  Edit,
  Loader2,
  Crown,
  GraduationCap,
  BookOpen,
  Heart,
  Globe,
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
import { TooltipProvider } from "@/components/ui/tooltip";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { UserRole, UserStatus } from "@/app/generated/prisma/enums";
import {
  updateUserStatus,
  deleteUser,
  bulkApproveUsers,
  bulkRejectUsers,
  bulkDeleteUsers,
  bulkSuspendUsers,
  bulkActivateUsers,
  getUsers,
} from "../actions/users";

// Types
interface UserWithProfile {
  id: string;
  email: string;
  name: string;
  phone: string | null;
  image: string | null;
  role: UserRole;
  status: UserStatus;
  isActive: boolean;
  emailVerified: Date | null;
  phoneVerified: boolean;
  lastLogin: Date | null;
  loginCount: number;
  createdAt: Date;
  updatedAt: Date;
  studentProfile?: {
    studentId: string;
    currentLevel: string | null;
    enrollmentDate: Date;
  } | null;
  teacherProfile?: {
    teacherId: string;
    specialization: string | null;
    isAvailable: boolean;
  } | null;
  parentProfile?: {
    occupation: string | null;
    students: { studentId: string }[];
  } | null;
  adminProfile?: {
    department: string | null;
  } | null;
}

interface Stats {
  total: number;
  byRole: Record<UserRole, number>;
  byStatus: Record<UserStatus, number>;
  pendingApproval: number;
}

interface UsersClientProps {
  initialUsers: UserWithProfile[];
  initialStats: Stats;
  initialPage: number;
  initialRole?: string;
  initialStatus?: string;
  initialSearch?: string;
  totalPages: number;
  totalUsers: number;
}

const ROLE_ICONS: Record<UserRole, any> = {
  SUPER_ADMIN: Crown,
  ADMIN: Shield,
  TEACHER: GraduationCap,
  STUDENT: BookOpen,
  PARENT: Heart,
  CONTENT_MANAGER: Globe,
  SUPPORT: Users,
};

const STATUS_COLORS: Record<
  UserStatus,
  { bg: string; text: string; dot: string }
> = {
  PENDING: {
    bg: "bg-amber-100 dark:bg-amber-950/30",
    text: "text-amber-700 dark:text-amber-400",
    dot: "bg-amber-500",
  },
  APPROVED: {
    bg: "bg-green-100 dark:bg-green-950/30",
    text: "text-green-700 dark:text-green-400",
    dot: "bg-green-500",
  },
  REJECTED: {
    bg: "bg-red-100 dark:bg-red-950/30",
    text: "text-red-700 dark:text-red-400",
    dot: "bg-red-500",
  },
  SUSPENDED: {
    bg: "bg-orange-100 dark:bg-orange-950/30",
    text: "text-orange-700 dark:text-orange-400",
    dot: "bg-orange-500",
  },
  DEACTIVATED: {
    bg: "bg-gray-100 dark:bg-gray-800",
    text: "text-gray-500 dark:text-gray-400",
    dot: "bg-gray-500",
  },
};

const getRoleIcon = (role: UserRole) => {
  const Icon = ROLE_ICONS[role] || Users;
  return Icon;
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

export function UsersClient({
  initialUsers,
  initialStats,
  initialPage,
  initialRole,
  initialStatus,
  initialSearch,
  totalPages: initialTotalPages,
  totalUsers: initialTotalUsers,
}: UsersClientProps) {
  const router = useRouter();
  const pathname = usePathname();

  // Data states
  const [users, setUsers] = useState(initialUsers);
  const [totalPages, setTotalPages] = useState(initialTotalPages);
  const [totalUsers, setTotalUsers] = useState(initialTotalUsers);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Selection states
  const [selectedUsers, setSelectedUsers] = useState<Set<string>>(new Set());

  // Dialog states
  const [openStatusDialog, setOpenStatusDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserWithProfile | null>(
    null,
  );
  const [newStatus, setNewStatus] = useState<UserStatus | null>(null);
  const [rejectionReason, setRejectionReason] = useState("");
  const [isActionLoading, setIsActionLoading] = useState(false);

  // Filter states
  const [page, setPage] = useState(initialPage);
  const [role, setRole] = useState(initialRole || "all");
  const [status, setStatus] = useState(initialStatus || "all");
  const [search, setSearch] = useState(initialSearch || "");
  const [searchInput, setSearchInput] = useState(initialSearch || "");

  // Fetch users when filters change
  const fetchUsers = useCallback(async () => {
    setIsRefreshing(true);
    try {
      const result = await getUsers({
        page,
        limit: 10,
        role: role === "all" ? undefined : (role as UserRole),
        status: status === "all" ? undefined : (status as UserStatus),
        search: search || undefined,
      });

      setUsers(result.data);
      setTotalPages(result.totalPages);
      setTotalUsers(result.total);
      setSelectedUsers(new Set()); // Clear selection on new data
    } catch (error) {
      toast.error("Failed to load users");
    } finally {
      setIsRefreshing(false);
    }
  }, [page, role, status, search]);

  // Update URL when filters change
  const updateUrl = useCallback(() => {
    const params = new URLSearchParams();
    if (page > 1) params.set("page", page.toString());
    if (role && role !== "all") params.set("role", role);
    if (status && status !== "all") params.set("status", status);
    if (search) params.set("search", search);

    const newUrl = `${pathname}${params.toString() ? `?${params.toString()}` : ""}`;
    router.replace(newUrl, { scroll: false });
  }, [page, role, status, search, router, pathname]);

  // Fetch data when filters change
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // Update URL when filters change (debounced)
  useEffect(() => {
    const timer = setTimeout(() => {
      updateUrl();
    }, 300);
    return () => clearTimeout(timer);
  }, [page, role, status, search, updateUrl]);

  const handleSearch = () => {
    setSearch(searchInput);
    setPage(1);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const clearFilters = () => {
    setRole("all");
    setStatus("all");
    setSearchInput("");
    setSearch("");
    setPage(1);
  };

  const handleStatusChange = async (
    userId: string,
    newStatus: UserStatus,
    reason?: string,
  ) => {
    setIsActionLoading(true);
    try {
      await updateUserStatus(userId, {
        status: newStatus,
        rejectionReason: reason,
      });

      await fetchUsers(); // Refresh data

      toast.success(`User status updated to ${newStatus.toLowerCase()}`);
      setOpenStatusDialog(false);
      setSelectedUser(null);
      setNewStatus(null);
      setRejectionReason("");
    } catch (error) {
      toast.error("Failed to update user status");
    } finally {
      setIsActionLoading(false);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (!confirm("Are you sure you want to delete this user?")) return;

    setIsActionLoading(true);
    try {
      await deleteUser(userId);
      await fetchUsers(); // Refresh data
      toast.success("User deleted successfully");
    } catch (error) {
      toast.error("Failed to delete user");
    } finally {
      setIsActionLoading(false);
    }
  };

  const handleBulkAction = async (
    action: "approve" | "reject" | "delete" | "suspend" | "activate",
  ) => {
    const ids = Array.from(selectedUsers);
    if (ids.length === 0) return;

    let confirmMessage = "";
    let actionFn: any;
    let additionalData: any = {};

    switch (action) {
      case "approve":
        confirmMessage = `Approve ${ids.length} user(s)?`;
        actionFn = bulkApproveUsers;
        break;
      case "reject":
        confirmMessage = `Reject ${ids.length} user(s)?`;
        actionFn = bulkRejectUsers;
        additionalData = { rejectionReason: "Bulk rejection" };
        break;
      case "delete":
        confirmMessage = `Delete ${ids.length} user(s)? This action cannot be undone.`;
        actionFn = bulkDeleteUsers;
        break;
      case "suspend":
        confirmMessage = `Suspend ${ids.length} user(s)?`;
        actionFn = bulkSuspendUsers;
        break;
      case "activate":
        confirmMessage = `Activate ${ids.length} user(s)?`;
        actionFn = bulkActivateUsers;
        break;
    }

    if (!confirm(confirmMessage)) return;

    setIsActionLoading(true);
    try {
      await actionFn(ids, additionalData);
      await fetchUsers(); // Refresh data
      setSelectedUsers(new Set());
      toast.success(`${ids.length} user(s) ${action}ed successfully`);
    } catch (error) {
      toast.error(`Failed to ${action} users`);
    } finally {
      setIsActionLoading(false);
    }
  };

  const toggleSelectAll = () => {
    if (selectedUsers.size === users.length) {
      setSelectedUsers(new Set());
    } else {
      setSelectedUsers(new Set(users.map((u) => u.id)));
    }
  };

  const toggleSelectUser = (userId: string) => {
    const newSelected = new Set(selectedUsers);
    if (newSelected.has(userId)) {
      newSelected.delete(userId);
    } else {
      newSelected.add(userId);
    }
    setSelectedUsers(newSelected);
  };

  const getRoleBadge = (role: UserRole) => {
    const variants: Record<UserRole, string> = {
      SUPER_ADMIN:
        "bg-purple-100 text-purple-700 dark:bg-purple-950/40 dark:text-purple-400",
      ADMIN: "bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400",
      TEACHER:
        "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400",
      STUDENT:
        "bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400",
      PARENT:
        "bg-rose-100 text-rose-700 dark:bg-rose-950/40 dark:text-rose-400",
      CONTENT_MANAGER:
        "bg-cyan-100 text-cyan-700 dark:bg-cyan-950/40 dark:text-cyan-400",
      SUPPORT:
        "bg-indigo-100 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-400",
    };
    return variants[role];
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
                  <Crown className="w-5 h-5 text-amber-500" />
                  <span className="text-xs font-black uppercase tracking-wider text-amber-600 dark:text-amber-400">
                    Admin Portal
                  </span>
                </div>
                <h1 className="text-3xl sm:text-4xl font-black tracking-tighter bg-gradient-to-r from-purple-600 to-amber-600 bg-clip-text text-transparent">
                  User Management
                </h1>
                <p className="text-muted-foreground text-sm mt-1">
                  Manage users, approve registrations, and control access
                  permissions
                </p>
              </div>
              <Link href="/dashboard/admin/users/add">
                <Button className="rounded-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 shadow-md">
                  <UserPlus className="w-4 h-4 mr-2" />
                  Add New User
                </Button>
              </Link>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Users</p>
                  <p className="text-2xl font-black">{initialStats.total}</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-950/40 flex items-center justify-center">
                  <Users className="w-5 h-5 text-purple-600" />
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Pending Approval
                  </p>
                  <p className="text-2xl font-black text-amber-600">
                    {initialStats.pendingApproval}
                  </p>
                </div>
                <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-950/40 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-amber-600" />
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Active Students
                  </p>
                  <p className="text-2xl font-black">
                    {initialStats.byRole?.STUDENT || 0}
                  </p>
                </div>
                <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-950/40 flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-emerald-600" />
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Certified Teachers
                  </p>
                  <p className="text-2xl font-black">
                    {initialStats.byRole?.TEACHER || 0}
                  </p>
                </div>
                <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-950/40 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-blue-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Loading Overlay */}
          {isRefreshing && (
            <div className="fixed inset-0 bg-black/20 z-50 flex items-center justify-center pointer-events-none">
              <div className="bg-white dark:bg-slate-900 rounded-full p-3 shadow-lg">
                <Loader2 className="w-6 h-6 animate-spin text-purple-600" />
              </div>
            </div>
          )}

          {/* Bulk Actions Bar */}
          {selectedUsers.size > 0 && (
            <div className="bg-purple-50 dark:bg-purple-950/30 rounded-xl p-4 mb-6 flex flex-wrap items-center justify-between gap-4 border border-purple-200 dark:border-purple-800">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-purple-600" />
                <span className="text-sm font-black">
                  {selectedUsers.size} user(s) selected
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleBulkAction("approve")}
                  disabled={isActionLoading}
                  className="border-green-300 text-green-600 hover:bg-green-50"
                >
                  <CheckCircle className="w-4 h-4 mr-1" />
                  Approve
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleBulkAction("reject")}
                  disabled={isActionLoading}
                  className="border-red-300 text-red-600 hover:bg-red-50"
                >
                  <XCircle className="w-4 h-4 mr-1" />
                  Reject
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleBulkAction("suspend")}
                  disabled={isActionLoading}
                  className="border-orange-300 text-orange-600 hover:bg-orange-50"
                >
                  <UserX className="w-4 h-4 mr-1" />
                  Suspend
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleBulkAction("activate")}
                  disabled={isActionLoading}
                  className="border-emerald-300 text-emerald-600 hover:bg-emerald-50"
                >
                  <UserCheck className="w-4 h-4 mr-1" />
                  Activate
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
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 mb-6">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name, email, or phone..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="pl-9 rounded-full border-slate-200 dark:border-slate-800"
                />
              </div>
              <Select value={role} onValueChange={setRole}>
                <SelectTrigger className="w-full sm:w-36 rounded-full">
                  <SelectValue placeholder="All Roles" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="SUPER_ADMIN">Super Admin</SelectItem>
                  <SelectItem value="ADMIN">Admin</SelectItem>
                  <SelectItem value="TEACHER">Teacher</SelectItem>
                  <SelectItem value="STUDENT">Student</SelectItem>
                  <SelectItem value="PARENT">Parent</SelectItem>
                </SelectContent>
              </Select>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger className="w-full sm:w-36 rounded-full">
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="PENDING">Pending</SelectItem>
                  <SelectItem value="APPROVED">Approved</SelectItem>
                  <SelectItem value="REJECTED">Rejected</SelectItem>
                  <SelectItem value="SUSPENDED">Suspended</SelectItem>
                  <SelectItem value="DEACTIVATED">Deactivated</SelectItem>
                </SelectContent>
              </Select>
              <Button
                onClick={handleSearch}
                className="rounded-full px-6 bg-purple-600 hover:bg-purple-700"
              >
                <Search className="w-4 h-4 mr-2" />
                Search
              </Button>
              {(role !== "all" || status !== "all" || search) && (
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

          {/* Users Table */}
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-slate-50 dark:bg-slate-800/50">
                  <TableRow>
                    <TableHead className="w-12">
                      <input
                        type="checkbox"
                        checked={
                          selectedUsers.size === users.length &&
                          users.length > 0
                        }
                        onChange={toggleSelectAll}
                        disabled={isRefreshing}
                        className="w-4 h-4 rounded border-slate-300"
                      />
                    </TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Joined</TableHead>
                    <TableHead>Last Active</TableHead>
                    <TableHead className="w-12"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-12">
                        <div className="flex flex-col items-center gap-2">
                          <Users className="w-12 h-12 text-muted-foreground/30" />
                          <p className="text-muted-foreground">
                            No users found
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
                    users.map((user) => {
                      const RoleIcon = getRoleIcon(user.role);
                      const statusColors = STATUS_COLORS[user.status];

                      return (
                        <TableRow
                          key={user.id}
                          className="hover:bg-slate-50 dark:hover:bg-slate-800/50"
                        >
                          <TableCell>
                            <input
                              type="checkbox"
                              checked={selectedUsers.has(user.id)}
                              onChange={() => toggleSelectUser(user.id)}
                              disabled={isRefreshing}
                              className="w-4 h-4 rounded border-slate-300"
                            />
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar className="w-10 h-10">
                                <AvatarFallback className="bg-gradient-to-br from-purple-100 to-amber-100 dark:from-purple-950/40 dark:to-amber-950/40 text-purple-600 font-black">
                                  {getInitials(user.name)}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-black text-sm">
                                  {user.name}
                                </p>
                                <p className="text-xs text-muted-foreground flex items-center gap-1">
                                  <Mail className="w-3 h-3" />
                                  {user.email}
                                </p>
                                {user.phone && (
                                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                                    <Phone className="w-3 h-3" />
                                    {user.phone}
                                  </p>
                                )}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <RoleIcon className="w-4 h-4" />
                              <span
                                className={`text-xs font-black ${getRoleBadge(user.role)} px-2 py-0.5 rounded-full`}
                              >
                                {user.role.replace("_", " ")}
                              </span>
                            </div>
                            {user.studentProfile && (
                              <p className="text-xs text-muted-foreground mt-1">
                                ID: {user.studentProfile.studentId}
                              </p>
                            )}
                            {user.teacherProfile && (
                              <p className="text-xs text-muted-foreground mt-1">
                                ID: {user.teacherProfile.teacherId}
                              </p>
                            )}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <div
                                className={`w-2 h-2 rounded-full ${statusColors.dot}`}
                              />
                              <span
                                className={`text-xs font-black ${statusColors.text}`}
                              >
                                {user.status}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell className="text-sm">
                            {formatDate(user.createdAt)}
                          </TableCell>
                          <TableCell className="text-sm">
                            {user.lastLogin
                              ? formatDate(user.lastLogin)
                              : "Never"}
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
                                    href={`/dashboard/admin/users/${user.id}`}
                                  >
                                    <Eye className="w-4 h-4 mr-2" />
                                    View Details
                                  </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                  <Link
                                    href={`/dashboard/admin/users/${user.id}/edit`}
                                  >
                                    <Edit className="w-4 h-4 mr-2" />
                                    Edit User
                                  </Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                {user.status === "PENDING" && (
                                  <>
                                    <DropdownMenuItem
                                      onClick={() => {
                                        setSelectedUser(user);
                                        setNewStatus("APPROVED");
                                        setOpenStatusDialog(true);
                                      }}
                                      className="text-green-600"
                                    >
                                      <CheckCircle className="w-4 h-4 mr-2" />
                                      Approve
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                      onClick={() => {
                                        setSelectedUser(user);
                                        setNewStatus("REJECTED");
                                        setOpenStatusDialog(true);
                                      }}
                                      className="text-red-600"
                                    >
                                      <XCircle className="w-4 h-4 mr-2" />
                                      Reject
                                    </DropdownMenuItem>
                                  </>
                                )}
                                {user.status === "APPROVED" && (
                                  <DropdownMenuItem
                                    onClick={() => {
                                      setSelectedUser(user);
                                      setNewStatus("SUSPENDED");
                                      setOpenStatusDialog(true);
                                    }}
                                    className="text-orange-600"
                                  >
                                    <UserX className="w-4 h-4 mr-2" />
                                    Suspend
                                  </DropdownMenuItem>
                                )}
                                {user.status === "SUSPENDED" && (
                                  <DropdownMenuItem
                                    onClick={() =>
                                      handleStatusChange(user.id, "APPROVED")
                                    }
                                    className="text-green-600"
                                  >
                                    <UserCheck className="w-4 h-4 mr-2" />
                                    Activate
                                  </DropdownMenuItem>
                                )}
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                  onClick={() => handleDeleteUser(user.id)}
                                  className="text-red-600"
                                >
                                  <Trash2 className="w-4 h-4 mr-2" />
                                  Delete User
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
              <div className="flex items-center justify-between px-4 py-4 border-t border-slate-200 dark:border-slate-800">
                <p className="text-sm text-muted-foreground">
                  Showing {(page - 1) * 10 + 1} to{" "}
                  {Math.min(page * 10, totalUsers)} of {totalUsers} users
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

      {/* Status Change Dialog */}
      <Dialog open={openStatusDialog} onOpenChange={setOpenStatusDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {newStatus === "APPROVED" && "Approve User"}
              {newStatus === "REJECTED" && "Reject User"}
              {newStatus === "SUSPENDED" && "Suspend User"}
            </DialogTitle>
            <DialogDescription>
              {newStatus === "APPROVED" &&
                `Are you sure you want to approve ${selectedUser?.name}?`}
              {newStatus === "REJECTED" &&
                `Are you sure you want to reject ${selectedUser?.name}'s application?`}
              {newStatus === "SUSPENDED" &&
                `Are you sure you want to suspend ${selectedUser?.name}?`}
            </DialogDescription>
          </DialogHeader>
          {newStatus === "REJECTED" && (
            <div className="space-y-2">
              <label className="text-sm font-black">Rejection Reason</label>
              <textarea
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                placeholder="Please provide a reason for rejection..."
                className="w-full p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-background text-sm"
                rows={3}
              />
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setOpenStatusDialog(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={() =>
                handleStatusChange(
                  selectedUser!.id,
                  newStatus!,
                  rejectionReason,
                )
              }
              disabled={isActionLoading}
              className={cn(
                newStatus === "APPROVED" && "bg-green-600 hover:bg-green-700",
                newStatus === "REJECTED" && "bg-red-600 hover:bg-red-700",
                newStatus === "SUSPENDED" &&
                  "bg-orange-600 hover:bg-orange-700",
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
    </TooltipProvider>
  );
}
