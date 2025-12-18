// src/components/admin/user-approvals-client.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Search,
  Filter,
  Download,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Book,
  GraduationCap,
  User,
  CheckCircle,
  XCircle,
  Eye,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  Loader2,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { getInitials, formatDate } from "@/lib/utils";

interface UserApprovalsClientProps {
  initialUsers: any[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
  filters: {
    role?: string;
    search?: string;
    status?: string;
  };
}

export default function UserApprovalsClient({
  initialUsers,
  pagination,
  filters,
}: UserApprovalsClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [users, setUsers] = useState(initialUsers);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState(filters.search || "");
  const [selectedRole, setSelectedRole] = useState(filters.role || "ALL");
  const [selectedStatus, setSelectedStatus] = useState(
    filters.status || "PENDING"
  );
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  const refreshData = async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams(searchParams.toString());
      if (searchQuery) params.set("search", searchQuery);
      if (selectedRole !== "ALL") params.set("role", selectedRole);
      params.set("status", selectedStatus);

      router.push(`/admin/approvals?${params.toString()}`);

      // Refetch data
      const response = await fetch(
        `/api/admin/users/pending?${params.toString()}`
      );
      const data = await response.json();

      if (response.ok) {
        setUsers(data.users);
      }
    } catch (error) {
      console.error("Error refreshing data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setUsers(initialUsers);
  }, [initialUsers]);

  const handleApproveUser = async (userId: string) => {
    try {
      const response = await fetch(`/api/admin/users/${userId}/approve`, {
        method: "POST",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to approve user");
      }

      toast.success("User approved successfully", {
        description: "The user has been approved and notified via email.",
      });

      // Refresh data
      refreshData();
    } catch (error) {
      toast.error("Failed to approve user", {
        description:
          error instanceof Error ? error.message : "Please try again.",
      });
    }
  };

  const handleRejectUser = async (userId: string, reason: string) => {
    try {
      const response = await fetch(`/api/admin/users/${userId}/reject`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rejectionReason: reason }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to reject user");
      }

      toast.error("User rejected", {
        description: `User has been rejected: ${reason}`,
      });

      // Refresh data
      refreshData();
    } catch (error) {
      toast.error("Failed to reject user", {
        description:
          error instanceof Error ? error.message : "Please try again.",
      });
    }
  };

  const handleBulkApprove = async () => {
    try {
      const userIds = users.map((user) => user.id);
      const promises = userIds.map((id) =>
        fetch(`/api/admin/users/${id}/approve`, { method: "POST" })
      );

      await Promise.all(promises);

      toast.success("Bulk approval completed", {
        description: `${userIds.length} users have been approved.`,
      });

      // Refresh data
      refreshData();
    } catch (error) {
      toast.error("Failed to approve users", {
        description: "Some users could not be approved.",
      });
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    refreshData();
  };

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    router.push(`/admin/approvals?${params.toString()}`);
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "TEACHER":
        return <GraduationCap className="h-4 w-4" />;
      case "STUDENT":
        return <Book className="h-4 w-4" />;
      case "PARENT":
        return <User className="h-4 w-4" />;
      default:
        return <User className="h-4 w-4" />;
    }
  };

  const stats = [
    { label: "Total Pending", value: pagination.total, color: "yellow" },
    {
      label: "Students",
      value: users.filter((u) => u.role === "STUDENT").length,
      color: "blue",
    },
    {
      label: "Teachers",
      value: users.filter((u) => u.role === "TEACHER").length,
      color: "purple",
    },
    {
      label: "Parents",
      value: users.filter((u) => u.role === "PARENT").length,
      color: "green",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            User Approvals
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Review and manage user registration requests
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" className="gap-2" disabled={isLoading}>
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button
            className="bg-gradient-primary gap-2"
            onClick={handleBulkApprove}
            disabled={isLoading || users.length === 0}
          >
            <CheckCircle className="h-4 w-4" />
            Approve All ({users.length})
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-6 sm:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    {stat.label}
                  </p>
                  <p
                    className={`mt-2 text-2xl font-bold text-${stat.color}-600`}
                  >
                    {stat.value}
                  </p>
                </div>
                <div className={`rounded-lg bg-${stat.color}-100 p-3`}>
                  <User className={`h-6 w-6 text-${stat.color}-600`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <form onSubmit={handleSearch} className="grid gap-4 sm:grid-cols-3">
            <div>
              <label className="mb-2 block text-sm font-medium">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search by name, email, or phone..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                  disabled={isLoading}
                />
              </div>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium">Role</label>
              <Select
                value={selectedRole}
                onValueChange={setSelectedRole}
                disabled={isLoading}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All Roles" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">All Roles</SelectItem>
                  <SelectItem value="STUDENT">Student</SelectItem>
                  <SelectItem value="TEACHER">Teacher</SelectItem>
                  <SelectItem value="PARENT">Parent</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium">Status</label>
              <Select
                value={selectedStatus}
                onValueChange={setSelectedStatus}
                disabled={isLoading}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PENDING">Pending</SelectItem>
                  <SelectItem value="APPROVED">Approved</SelectItem>
                  <SelectItem value="REJECTED">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="sm:col-span-3 flex justify-end space-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedRole("ALL");
                  setSelectedStatus("PENDING");
                  router.push("/admin/approvals");
                }}
                disabled={isLoading}
              >
                Clear Filters
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Applying...
                  </>
                ) : (
                  <>
                    <Filter className="mr-2 h-4 w-4" />
                    Apply Filters
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* User List */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>
                {selectedStatus === "PENDING"
                  ? "Pending Approvals"
                  : selectedStatus === "APPROVED"
                  ? "Approved Users"
                  : "Rejected Users"}
              </CardTitle>
              <CardDescription>
                {pagination.total} users found • Page {pagination.page} of{" "}
                {pagination.pages}
              </CardDescription>
            </div>
            {selectedStatus === "PENDING" && users.length > 0 && (
              <Button
                size="sm"
                className="bg-green-500 hover:bg-green-600"
                onClick={handleBulkApprove}
                disabled={isLoading}
              >
                <CheckCircle className="mr-2 h-4 w-4" />
                Approve All
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex h-64 items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-purple-500" />
            </div>
          ) : users.length === 0 ? (
            <div className="py-12 text-center">
              <User className="mx-auto h-12 w-12 text-gray-300" />
              <h3 className="mt-4 text-lg font-semibold">No users found</h3>
              <p className="mt-2 text-gray-500">
                {selectedStatus === "PENDING"
                  ? "All registration requests have been processed."
                  : "No users found with the selected criteria."}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {users.map((user) => (
                <div
                  key={user.id}
                  className="rounded-lg border border-gray-200 p-4 dark:border-gray-700"
                >
                  <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarFallback className="bg-gradient-primary text-white">
                          {getInitials(user.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h3 className="font-semibold">{user.name}</h3>
                          <Badge variant="outline" className="gap-1">
                            {getRoleIcon(user.role)}
                            {user.role}
                          </Badge>
                          <Badge
                            variant={
                              user.status === "PENDING"
                                ? "secondary"
                                : user.status === "APPROVED"
                                ? "default"
                                : "destructive"
                            }
                          >
                            {user.status}
                          </Badge>
                        </div>
                        <div className="mt-2 flex flex-wrap gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Mail className="h-4 w-4" />
                            {user.email}
                          </div>
                          {user.phone && (
                            <div className="flex items-center gap-1">
                              <Phone className="h-4 w-4" />
                              {user.phone}
                            </div>
                          )}
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            Applied {formatDate(user.createdAt)}
                          </div>
                        </div>
                        {user.studentProfile && (
                          <p className="mt-2 text-sm text-gray-500">
                            Student •{" "}
                            {user.studentProfile.hifzLevel ||
                              "No level specified"}
                          </p>
                        )}
                        {user.teacherProfile && (
                          <p className="mt-2 text-sm text-gray-500">
                            Teacher •{" "}
                            {user.teacherProfile.specialization ||
                              "No specialization"}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      {selectedStatus === "PENDING" && (
                        <>
                          <Button
                            size="sm"
                            className="bg-green-500 hover:bg-green-600"
                            onClick={() => handleApproveUser(user.id)}
                            disabled={isLoading}
                          >
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Approve
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                size="sm"
                                variant="destructive"
                                disabled={isLoading}
                              >
                                <XCircle className="mr-2 h-4 w-4" />
                                Reject
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              <DropdownMenuItem
                                onClick={() =>
                                  handleRejectUser(
                                    user.id,
                                    "Incomplete information"
                                  )
                                }
                              >
                                Incomplete information
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() =>
                                  handleRejectUser(
                                    user.id,
                                    "Does not meet requirements"
                                  )
                                }
                              >
                                Does not meet requirements
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() =>
                                  handleRejectUser(user.id, "Other reason")
                                }
                              >
                                Other reason
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </>
                      )}
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setSelectedUser(user);
                          setIsViewModalOpen(true);
                        }}
                        disabled={isLoading}
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        View
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            size="sm"
                            variant="ghost"
                            disabled={isLoading}
                          >
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Send Message</DropdownMenuItem>
                          <DropdownMenuItem>Request More Info</DropdownMenuItem>
                          <DropdownMenuItem>
                            View Full Application
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {pagination.pages > 1 && (
            <div className="mt-6 flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Showing {(pagination.page - 1) * pagination.limit + 1} to{" "}
                {Math.min(pagination.page * pagination.limit, pagination.total)}{" "}
                of {pagination.total} results
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(pagination.page - 1)}
                  disabled={pagination.page === 1 || isLoading}
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(pagination.page + 1)}
                  disabled={pagination.page === pagination.pages || isLoading}
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* User Detail Modal */}
      {isViewModalOpen && selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="mx-4 w-full max-w-2xl rounded-lg bg-white p-6 shadow-xl">
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="bg-gradient-primary text-white">
                    {getInitials(selectedUser.name)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-xl font-bold">{selectedUser.name}</h2>
                  <div className="flex items-center space-x-2">
                    <Badge>{selectedUser.role}</Badge>
                    <Badge
                      variant={
                        selectedUser.status === "PENDING"
                          ? "secondary"
                          : selectedUser.status === "APPROVED"
                          ? "default"
                          : "destructive"
                      }
                    >
                      {selectedUser.status}
                    </Badge>
                  </div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsViewModalOpen(false)}
              >
                <XCircle className="h-5 w-5" />
              </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <div>
                  <h3 className="mb-2 font-semibold">Contact Information</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-gray-400" />
                      {selectedUser.email}
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-gray-400" />
                      {selectedUser.phone || "Not provided"}
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      Applied: {formatDate(selectedUser.createdAt)}
                    </div>
                  </div>
                </div>

                {selectedUser.studentProfile && (
                  <div>
                    <h3 className="mb-2 font-semibold">Student Information</h3>
                    <div className="space-y-2 text-sm">
                      <div>
                        Gender:{" "}
                        {selectedUser.studentProfile.gender || "Not specified"}
                      </div>
                      <div>
                        Hifz Level:{" "}
                        {selectedUser.studentProfile.hifzLevel ||
                          "Not specified"}
                      </div>
                      <div>
                        Memorization Goal:{" "}
                        {selectedUser.studentProfile.memorizationGoal ||
                          "Not specified"}
                      </div>
                    </div>
                  </div>
                )}

                {selectedUser.teacherProfile && (
                  <div>
                    <h3 className="mb-2 font-semibold">Teacher Information</h3>
                    <div className="space-y-2 text-sm">
                      <div>
                        Qualification:{" "}
                        {selectedUser.teacherProfile.qualification ||
                          "Not specified"}
                      </div>
                      <div>
                        Specialization:{" "}
                        {selectedUser.teacherProfile.specialization ||
                          "Not specified"}
                      </div>
                      <div>
                        Experience:{" "}
                        {selectedUser.teacherProfile.experienceYears || 0} years
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="mb-2 font-semibold">Quick Actions</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedUser.status === "PENDING" && (
                      <>
                        <Button
                          className="bg-green-500 hover:bg-green-600"
                          onClick={() => {
                            handleApproveUser(selectedUser.id);
                            setIsViewModalOpen(false);
                          }}
                          disabled={isLoading}
                        >
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Approve
                        </Button>
                        <Button
                          variant="destructive"
                          onClick={() => {
                            handleRejectUser(
                              selectedUser.id,
                              "Reviewing application"
                            );
                            setIsViewModalOpen(false);
                          }}
                          disabled={isLoading}
                        >
                          <XCircle className="mr-2 h-4 w-4" />
                          Reject
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <Button
                variant="outline"
                onClick={() => setIsViewModalOpen(false)}
              >
                Close
              </Button>
              <Button className="bg-gradient-primary">
                Process Application
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
