// src/app/admin/approvals/page.tsx
"use client";

import { useState, useEffect, useCallback } from "react"; // 1. Imported useCallback
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  Search,
  Filter,
  UserCheck,
  UserX,
  Eye,
  Mail,
  Phone,
  Calendar,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  XCircle,
  Clock,
  Download,
  RefreshCw,
  MoreVertical,
} from "lucide-react";
import { formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import UserDetailModal from "@/components/admin/user-detail-modal";
import ApprovalActionModal from "@/components/admin/approval-action-modal";
import BulkActionsModal from "@/components/admin/bulk-actions-modal";
import { toast } from "sonner";

interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: string;
  status: string;
  createdAt: string;
  studentProfile?: any;
  teacherProfile?: any;
  parentProfile?: any;
  approvedAt?: string;
  rejectionReason?: string;
}

// 4. Defined types for badge functions (to improve TS safety)
type UserStatus = "PENDING" | "APPROVED" | "REJECTED" | "SUSPENDED";
type UserRole = "STUDENT" | "TEACHER" | "PARENT" | "ADMIN" | "SUPER_ADMIN";

export default function AdminApprovalsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All"); // Initialized to "All"
  const [statusFilter, setStatusFilter] = useState("PENDING");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const [limit] = useState(20);

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [actionModalOpen, setActionModalOpen] = useState(false);
  const [bulkModalOpen, setBulkModalOpen] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  // Fetch users - 1. Wrapped in useCallback with dependencies
  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        search,
        role: roleFilter,
        status: statusFilter,
      });

      const response = await fetch(`/api/admin/users/pending?${params}`);
      const data = await response.json();

      if (response.ok) {
        setUsers(data.users);
        setTotalPages(data.pagination.totalPages);
        setTotalUsers(data.pagination.total);
      } else {
        toast.error(data.message || "Failed to fetch users");
      }
    } catch (error) {
      toast.error("An error occurred");
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [page, limit, search, roleFilter, statusFilter]); // Dependencies for useCallback

  // Check admin access
  useEffect(() => {
    if (status === "loading") return;

    if (!session) {
      router.push("/login");
      return;
    }

    // 3. Safely check admin role
    const userRole = session.user?.role;
    if (!userRole || !["SUPER_ADMIN", "ADMIN"].includes(userRole)) {
      router.push("/dashboard");
    }
  }, [session, status, router]);

  // Initial fetch - 2. Added fetchUsers to dependency array
  useEffect(() => {
    // 3. Safely check role before fetching
    if (
      session?.user?.role &&
      ["SUPER_ADMIN", "ADMIN"].includes(session.user.role)
    ) {
      fetchUsers();
    }
  }, [session, fetchUsers]); // fetchUsers is now a dependency

  // Handle search with debounce - 2. Added fetchUsers to dependency array
  useEffect(() => {
    const timer = setTimeout(() => {
      setPage(1);
      fetchUsers();
    }, 500);

    return () => clearTimeout(timer);
  }, [search, fetchUsers]); // fetchUsers is now a dependency

  // Handle user selection
  const handleUserSelect = (userId: string) => {
    setSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  // Handle select all
  const handleSelectAll = () => {
    if (selectedUsers.length === users.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(users.map((user) => user.id));
    }
  };

  // Handle approval/rejection
  const handleUserAction = async (
    userId: string,
    action: "APPROVE" | "REJECT",
    reason?: string
  ) => {
    try {
      const response = await fetch(`/api/admin/users/${userId}/approve`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action, reason }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message);
        fetchUsers(); // Refresh the list
        setSelectedUsers((prev) => prev.filter((id) => id !== userId));
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("An error occurred");
      console.error("Error processing action:", error);
    }
  };

  // Handle bulk action
  const handleBulkAction = async (
    action: "APPROVE" | "REJECT",
    reason?: string
  ) => {
    try {
      const response = await fetch(`/api/admin/users/bulk-actions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userIds: selectedUsers,
          action,
          reason,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message);
        fetchUsers(); // Refresh the list
        setSelectedUsers([]);
        setBulkModalOpen(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("An error occurred");
      console.error("Error processing bulk action:", error);
    }
  };

  // Refresh data
  const handleRefresh = () => {
    setRefreshing(true);
    fetchUsers();
  };

  // Export data
  const handleExport = () => {
    // TODO: Implement export functionality
    toast.info("Export functionality coming soon");
  };

  // Get status badge - uses defined UserStatus type
  const getStatusBadge = (status: string) => {
    const variants: Record<UserStatus, { label: string; color: string }> = {
      PENDING: { label: "Pending", color: "bg-yellow-100 text-yellow-800" },
      APPROVED: { label: "Approved", color: "bg-green-100 text-green-800" },
      REJECTED: { label: "Rejected", color: "bg-red-100 text-red-800" },
      SUSPENDED: { label: "Suspended", color: "bg-gray-100 text-gray-800" },
    };

    const variant = variants[status as UserStatus] || variants.PENDING;
    return <Badge className={variant.color}>{variant.label}</Badge>;
  };

  // Get role badge - uses defined UserRole type
  const getRoleBadge = (role: string) => {
    const variants: Partial<
      Record<UserRole, { label: string; color: string }>
    > = {
      // Use Partial since not all roles are listed
      STUDENT: { label: "Student", color: "bg-blue-100 text-blue-800" },
      TEACHER: { label: "Teacher", color: "bg-purple-100 text-purple-800" },
      PARENT: { label: "Parent", color: "bg-green-100 text-green-800" },
      ADMIN: { label: "Admin", color: "bg-red-100 text-red-800" },
    };

    const variant = variants[role as UserRole] || {
      label: role,
      color: "bg-gray-100 text-gray-800",
    };
    return <Badge className={variant.color}>{variant.label}</Badge>;
  };

  if (status === "loading") {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-purple-600 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">User Approvals</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Review and manage user registration requests
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={handleRefresh}
            disabled={refreshing}
          >
            <RefreshCw
              className={`mr-2 h-4 w-4 ${refreshing ? "animate-spin" : ""}`}
            />
            Refresh
          </Button>
          <Button variant="outline" onClick={handleExport}>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          {selectedUsers.length > 0 && (
            <Button onClick={() => setBulkModalOpen(true)}>
              Bulk Actions ({selectedUsers.length})
            </Button>
          )}
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search users..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Role filter */}
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Roles" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Roles</SelectItem>
                <SelectItem value="STUDENT">Students</SelectItem>
                <SelectItem value="TEACHER">Teachers</SelectItem>
                <SelectItem value="PARENT">Parents</SelectItem>
              </SelectContent>
            </Select>

            {/* Status filter */}
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="PENDING">Pending</SelectItem>
                <SelectItem value="APPROVED">Approved</SelectItem>
                <SelectItem value="REJECTED">Rejected</SelectItem>
                <SelectItem value="ALL">All Status</SelectItem>
              </SelectContent>
            </Select>

            {/* Clear filters */}
            <Button
              variant="outline"
              onClick={() => {
                setSearch("");
                setRoleFilter("All"); // 5. Changed from "" to "All" to match the SelectItem value
                setStatusFilter("PENDING");
              }}
            >
              <Filter className="mr-2 h-4 w-4" />
              Clear Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>Users</CardTitle>
          <CardDescription>
            {totalUsers} user{totalUsers !== 1 ? "s" : ""} found
            {statusFilter !== "ALL" && ` (${statusFilter.toLowerCase()})`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex h-64 items-center justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-purple-600 border-t-transparent" />
            </div>
          ) : users.length === 0 ? (
            <div className="flex h-64 flex-col items-center justify-center text-center">
              <UserCheck className="h-12 w-12 text-gray-400" />
              <h3 className="mt-4 text-lg font-semibold">No users found</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                {search || roleFilter !== "All" || statusFilter !== "PENDING"
                  ? "Try adjusting your filters"
                  : "All pending registrations have been processed"}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="px-4 py-3 text-left">
                      <input
                        type="checkbox"
                        checked={
                          selectedUsers.length === users.length &&
                          users.length > 0
                        }
                        onChange={handleSelectAll}
                        className="h-4 w-4 rounded border-gray-300"
                      />
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium">
                      User
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium">
                      Role
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium">
                      Status
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium">
                      Registered
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {users.map((user) => (
                    <tr
                      key={user.id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-800"
                    >
                      <td className="px-4 py-3">
                        <input
                          type="checkbox"
                          checked={selectedUsers.includes(user.id)}
                          onChange={() => handleUserSelect(user.id)}
                          className="h-4 w-4 rounded border-gray-300"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center space-x-3">
                          <div className="h-10 w-10 rounded-full bg-gradient-primary p-0.5">
                            <div className="flex h-full w-full items-center justify-center rounded-full bg-white dark:bg-gray-800">
                              <span className="font-semibold text-purple-600">
                                {user.name.charAt(0).toUpperCase()}
                              </span>
                            </div>
                          </div>
                          <div>
                            <div className="font-medium">{user.name}</div>
                            <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                              <Mail className="h-3 w-3" />
                              <span>{user.email}</span>
                            </div>
                            {user.phone && (
                              <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                                <Phone className="h-3 w-3" />
                                <span>{user.phone}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        {getRoleBadge(user.role)}
                        {user.studentProfile && (
                          <div className="mt-1 text-xs text-gray-500">
                            ID: {user.studentProfile.studentId}
                          </div>
                        )}
                        {user.teacherProfile && (
                          <div className="mt-1 text-xs text-gray-500">
                            ID: {user.teacherProfile.teacherId}
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        {getStatusBadge(user.status)}
                        {user.rejectionReason && (
                          <div className="mt-1 max-w-xs text-xs text-red-600">
                            {user.rejectionReason}
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-3 w-3" />
                          <span>{formatDate(user.createdAt)}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setSelectedUser(user);
                              setDetailModalOpen(true);
                            }}
                          >
                            <Eye className="h-4 w-4" />
                            <span className="sr-only sm:not-sr-only sm:ml-2">
                              View
                            </span>
                          </Button>

                          {user.status === "PENDING" && (
                            <>
                              <Button
                                size="sm"
                                variant="default"
                                className="bg-green-600 hover:bg-green-700"
                                onClick={() => {
                                  setSelectedUser(user);
                                  setActionModalOpen(true);
                                }}
                              >
                                <CheckCircle className="h-4 w-4" />
                                <span className="sr-only sm:not-sr-only sm:ml-2">
                                  Review
                                </span>
                              </Button>
                            </>
                          )}

                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button size="sm" variant="ghost">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              {user.status === "PENDING" && (
                                <>
                                  <DropdownMenuItem
                                    onClick={() =>
                                      handleUserAction(user.id, "APPROVE")
                                    }
                                    className="text-green-600"
                                  >
                                    <CheckCircle className="mr-2 h-4 w-4" />
                                    Approve
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    onClick={() =>
                                      handleUserAction(user.id, "REJECT")
                                    }
                                    className="text-red-600"
                                  >
                                    <UserX className="mr-2 h-4 w-4" />
                                    Reject
                                  </DropdownMenuItem>
                                </>
                              )}
                              {user.status === "APPROVED" && (
                                <DropdownMenuItem
                                  onClick={() =>
                                    handleUserAction(
                                      user.id,
                                      "REJECT",
                                      "Account suspended"
                                    )
                                  }
                                  className="text-red-600"
                                >
                                  <UserX className="mr-2 h-4 w-4" />
                                  Suspend
                                </DropdownMenuItem>
                              )}
                              {user.status === "REJECTED" && (
                                <DropdownMenuItem
                                  onClick={() =>
                                    handleUserAction(user.id, "APPROVE")
                                  }
                                  className="text-green-600"
                                >
                                  <CheckCircle className="mr-2 h-4 w-4" />
                                  Approve
                                </DropdownMenuItem>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-6 flex items-center justify-between">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Showing page {page} of {totalPages}
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Modals */}
      {selectedUser && (
        <>
          <UserDetailModal
            user={selectedUser}
            open={detailModalOpen}
            onOpenChange={setDetailModalOpen}
          />

          <ApprovalActionModal
            user={selectedUser}
            open={actionModalOpen}
            onOpenChange={setActionModalOpen}
            onAction={handleUserAction}
          />
        </>
      )}

      <BulkActionsModal
        open={bulkModalOpen}
        onOpenChange={setBulkModalOpen}
        selectedCount={selectedUsers.length}
        onAction={handleBulkAction}
      />
    </div>
  );
}
