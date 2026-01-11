"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  UserCheck,
  UserX,
  Mail,
  Phone,
  Calendar,
  Book,
  GraduationCap,
  User,
  Shield,
  MoreVertical,
  Search,
  Filter,
  Download,
  Edit,
  Trash2,
  Ban,
  CheckCircle,
  Eye,
  Loader2,
  XCircle,
  MapPin,
  ShieldCheck,
  Plus,
  Save,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { getInitials } from "@/lib/utils";
import { Counter } from "@/components/admin/dashboard-ui";

// --- ANIMATION VARIANTS ---
const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } },
};
const itemVariants = {
  hidden: { y: 10, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 50 } },
};

interface UserManagementClientProps {
  initialUsers: any[];
  pagination: any;
  filters: any;
  stats: {
    students: number;
    teachers: number;
    parents: number;
    pending: number;
    suspended: number;
  };
}

export default function UserManagementClient({
  initialUsers,
  pagination,
  filters,
  stats,
}: UserManagementClientProps) {
  const router = useRouter();
  const [users, setUsers] = useState(initialUsers);
  const [isLoading, setIsLoading] = useState(false);
  const [isActionLoading, setIsActionLoading] = useState(false);

  // Filters
  const [searchQuery, setSearchQuery] = useState(filters.search || "");
  const [selectedRole, setSelectedRole] = useState(filters.role || "ALL");
  const [selectedStatus, setSelectedStatus] = useState(filters.status || "ALL");

  // Modals
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Form States
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "STUDENT",
    phone: "",
  });

  useEffect(() => {
    setUsers(initialUsers);
  }, [initialUsers]);

  // --- REAL-TIME SEARCH (DEBOUNCED) ---
  useEffect(() => {
    // Prevent firing on initial load if query matches URL
    if (searchQuery === filters.search) return;

    const delayDebounceFn = setTimeout(() => {
      setIsLoading(true);
      const params = new URLSearchParams();
      if (searchQuery) params.set("search", searchQuery);
      if (selectedRole !== "ALL") params.set("role", selectedRole);
      if (selectedStatus !== "ALL") params.set("status", selectedStatus);

      router.push(`/admin/users?${params.toString()}`);
      setTimeout(() => setIsLoading(false), 500);
    }, 500); // Wait 500ms after user stops typing

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, selectedRole, selectedStatus, router, filters.search]);

  // --- ACTIONS ---

  // Manual Refresh (triggered by dropdown filters)
  const handleFilterChange = (key: string, value: string) => {
    setIsLoading(true);
    if (key === "role") setSelectedRole(value);
    if (key === "status") setSelectedStatus(value);

    // The useEffect above will handle the actual fetch because state changed
  };

  const handleExport = () => {
    try {
      const headers = ["Name", "Email", "Role", "Status", "Joined", "Phone"];
      const rows = users.map((u) => [
        `"${u.name}"`,
        u.email,
        u.role,
        u.status,
        new Date(u.createdAt).toLocaleDateString(),
        u.phone || "N/A",
      ]);

      const csvContent =
        "data:text/csv;charset=utf-8," +
        [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");

      const link = document.createElement("a");
      link.setAttribute("href", encodeURI(csvContent));
      link.setAttribute(
        "download",
        `users_export_${new Date().toISOString().split("T")[0]}.csv`
      );
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success("Export downloaded successfully");
    } catch (e) {
      toast.error("Failed to export data");
    }
  };

  const handleAddUser = async () => {
    if (!formData.name || !formData.email)
      return toast.error("Name and Email are required");
    setIsActionLoading(true);
    try {
      const res = await fetch("/api/admin/users/manage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "CREATE", data: formData }),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.error);

      toast.success("User created successfully");
      setUsers([result.user, ...users]);
      setIsAddUserOpen(false);
      setFormData({ name: "", email: "", role: "STUDENT", phone: "" });
    } catch (error: any) {
      toast.error(error.message || "Failed to create user");
    } finally {
      setIsActionLoading(false);
    }
  };

  const handleEditUser = async () => {
    setIsActionLoading(true);
    try {
      const res = await fetch("/api/admin/users/manage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: selectedUser.id,
          action: "UPDATE",
          data: formData,
        }),
      });

      if (!res.ok) throw new Error("Update failed");

      toast.success("User details updated");
      const updatedUser = { ...selectedUser, ...formData };
      setUsers((prev) =>
        prev.map((u) => (u.id === selectedUser.id ? updatedUser : u))
      );
      setSelectedUser(updatedUser);
      setIsEditing(false);
    } catch {
      toast.error("Failed to update user");
    } finally {
      setIsActionLoading(false);
    }
  };

  const handleStatusChange = async (userId: string, newStatus: string) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, status: newStatus } : u))
    );
    try {
      await fetch("/api/admin/users/manage", {
        method: "POST",
        body: JSON.stringify({
          userId,
          action: "UPDATE_STATUS",
          data: { status: newStatus },
        }),
      });
      toast.success(`User marked as ${newStatus}`);
    } catch {
      toast.error("Update failed");
      router.refresh();
    }
  };

  const handleDelete = async (userId: string) => {
    if (!confirm("Are you sure? This cannot be undone.")) return;
    setUsers((prev) => prev.filter((u) => u.id !== userId));
    try {
      await fetch("/api/admin/users/manage", {
        method: "POST",
        body: JSON.stringify({ userId, action: "DELETE" }),
      });
      toast.success("User deleted");
    } catch {
      toast.error("Delete failed");
      router.refresh();
    }
  };

  // --- HELPERS ---
  const getRoleIcon = (role: string) => {
    const map: any = {
      TEACHER: GraduationCap,
      STUDENT: Book,
      PARENT: User,
      ADMIN: Shield,
    };
    const Icon = map[role] || User;
    return <Icon className="h-4 w-4" />;
  };

  const getStatusBadge = (status: string) => {
    const styles: any = {
      APPROVED:
        "bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800",
      PENDING:
        "bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-800",
      SUSPENDED:
        "bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800",
    };
    return (
      <Badge variant="outline" className={styles[status]}>
        {status}
      </Badge>
    );
  };

  const openViewModal = (user: any) => {
    setSelectedUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone || "",
    });
    setIsEditing(false);
  };

  // --- 5 STATS CARDS CONFIGURATION ---
  const statCards = [
    {
      label: "Students",
      value: stats.students,
      icon: Book,
      color: "from-blue-400 to-cyan-500",
      shadow: "shadow-blue-500/20",
    },
    {
      label: "Teachers",
      value: stats.teachers,
      icon: GraduationCap,
      color: "from-purple-400 to-violet-500",
      shadow: "shadow-purple-500/20",
    },
    {
      label: "Parents",
      value: stats.parents,
      icon: Users,
      color: "from-emerald-400 to-green-500",
      shadow: "shadow-green-500/20",
    },
    {
      label: "Pending",
      value: stats.pending,
      icon: UserCheck,
      color: "from-amber-400 to-orange-500",
      shadow: "shadow-amber-500/20",
    },
    {
      label: "Suspended",
      value: stats.suspended,
      icon: UserX,
      color: "from-red-400 to-rose-500",
      shadow: "shadow-red-500/20",
    },
  ];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-6"
    >
      {/* HEADER */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
            User Management
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage system access and roles
          </p>
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            className="gap-2"
            onClick={handleExport}
            disabled={isLoading || users.length === 0}
          >
            <Download className="h-4 w-4" /> Export
          </Button>
          <Button
            className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white gap-2 shadow-lg shadow-purple-900/20 hover:scale-105 transition-all"
            onClick={() => {
              setFormData({ name: "", email: "", role: "STUDENT", phone: "" });
              setIsAddUserOpen(true);
            }}
          >
            <Plus className="h-4 w-4" /> Add User
          </Button>
        </div>
      </div>

      {/* STATS (5 Cards with Pattern Design) */}
      <motion.div
        variants={containerVariants}
        className="grid grid-cols-2 lg:grid-cols-5 gap-4"
      >
        {statCards.map((stat) => (
          <motion.div key={stat.label} variants={itemVariants}>
            <Card className="border-none shadow-sm bg-white/50 backdrop-blur-sm dark:bg-slate-900/50 hover:shadow-md transition-all overflow-hidden relative">
              {/* Pattern Background */}
              <div
                className={`absolute top-0 right-0 w-16 h-16 bg-gradient-to-br ${stat.color} opacity-10 rounded-bl-full`}
              />

              <CardContent className="p-4 flex flex-col justify-between h-full relative z-10">
                <div className="flex justify-between items-start mb-2">
                  <div
                    className={`p-2 rounded-xl bg-gradient-to-br ${stat.color} text-white ${stat.shadow} shadow-lg`}
                  >
                    <stat.icon className="h-5 w-5" />
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-bold">
                    <Counter value={stat.value} />
                  </div>
                  <p className="text-xs font-medium text-muted-foreground uppercase mt-1 tracking-wide">
                    {stat.label}
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* FILTERS (Glassmorphism) */}
      <motion.div
        variants={itemVariants}
        className="flex flex-col sm:flex-row gap-3 bg-white/60 dark:bg-slate-900/60 backdrop-blur-md p-4 rounded-xl border shadow-sm"
      >
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name, email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 bg-white dark:bg-slate-950 border-muted"
          />
          {isLoading && (
            <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 animate-spin text-muted-foreground" />
          )}
        </div>
        <Select
          value={selectedRole}
          onValueChange={(v) => handleFilterChange("role", v)}
        >
          <SelectTrigger className="w-full sm:w-[150px] bg-white dark:bg-slate-950 border-muted">
            <SelectValue placeholder="Role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All Roles</SelectItem>
            <SelectItem value="STUDENT">Student</SelectItem>
            <SelectItem value="TEACHER">Teacher</SelectItem>
            <SelectItem value="PARENT">Parent</SelectItem>
          </SelectContent>
        </Select>
        <Select
          value={selectedStatus}
          onValueChange={(v) => handleFilterChange("status", v)}
        >
          <SelectTrigger className="w-full sm:w-[150px] bg-white dark:bg-slate-950 border-muted">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All Status</SelectItem>
            <SelectItem value="APPROVED">Approved</SelectItem>
            <SelectItem value="PENDING">Pending</SelectItem>
            <SelectItem value="SUSPENDED">Suspended</SelectItem>
          </SelectContent>
        </Select>
      </motion.div>

      {/* TABLE */}
      <motion.div variants={containerVariants}>
        <Card className="border-none shadow-sm overflow-hidden bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-muted/30 border-b">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold text-muted-foreground">
                      User
                    </th>
                    <th className="px-6 py-4 text-left font-semibold text-muted-foreground">
                      Role
                    </th>
                    <th className="px-6 py-4 text-left font-semibold text-muted-foreground">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left font-semibold text-muted-foreground">
                      Joined
                    </th>
                    <th className="px-6 py-4 text-right font-semibold text-muted-foreground">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {users.map((user) => (
                    <motion.tr
                      key={user.id}
                      variants={itemVariants}
                      className="group hover:bg-muted/40 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-9 w-9 border-2 border-white dark:border-slate-800 shadow-sm">
                            <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-bold text-xs">
                              {getInitials(user.name)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-semibold text-foreground">
                              {user.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {user.email}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-muted-foreground font-medium">
                          {getRoleIcon(user.role)}{" "}
                          <span className="capitalize">
                            {user.role.toLowerCase()}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {getStatusBadge(user.status)}
                      </td>
                      <td className="px-6 py-4 text-muted-foreground">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-1">
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => openViewModal(user)}
                            className="hover:bg-purple-100 hover:text-purple-600 dark:hover:bg-purple-900/30"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button size="icon" variant="ghost">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onClick={() => {
                                  openViewModal(user);
                                  setIsEditing(true);
                                }}
                              >
                                <Edit className="mr-2 h-4 w-4" /> Edit Details
                              </DropdownMenuItem>
                              {user.status === "APPROVED" ? (
                                <DropdownMenuItem
                                  onClick={() =>
                                    handleStatusChange(user.id, "SUSPENDED")
                                  }
                                >
                                  <Ban className="mr-2 h-4 w-4 text-amber-500" />{" "}
                                  Suspend User
                                </DropdownMenuItem>
                              ) : (
                                <DropdownMenuItem
                                  onClick={() =>
                                    handleStatusChange(user.id, "APPROVED")
                                  }
                                >
                                  <CheckCircle className="mr-2 h-4 w-4 text-green-500" />{" "}
                                  Activate User
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuItem
                                onClick={() => handleDelete(user.id)}
                                className="text-red-600 focus:text-red-600"
                              >
                                <Trash2 className="mr-2 h-4 w-4" /> Delete User
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* --- ADD USER MODAL --- */}
      <AnimatePresence>
        {isAddUserOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-background w-full max-w-md rounded-2xl shadow-2xl border p-6"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Add New User</h2>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => setIsAddUserOpen(false)}
                >
                  <XCircle className="h-5 w-5" />
                </Button>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Full Name</Label>
                  <Input
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="e.g. John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="john@example.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Phone</Label>
                  <Input
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    placeholder="+1 234 567 890"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Role</Label>
                  <Select
                    value={formData.role}
                    onValueChange={(v) => setFormData({ ...formData, role: v })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="STUDENT">Student</SelectItem>
                      <SelectItem value="TEACHER">Teacher</SelectItem>
                      <SelectItem value="PARENT">Parent</SelectItem>
                      <SelectItem value="ADMIN">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button
                  className="w-full mt-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white"
                  onClick={handleAddUser}
                  disabled={isActionLoading}
                >
                  {isActionLoading ? (
                    <Loader2 className="animate-spin mr-2" />
                  ) : (
                    <Plus className="mr-2 h-4 w-4" />
                  )}{" "}
                  Create User
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- VIEW / EDIT MODAL --- */}
      <AnimatePresence>
        {selectedUser && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedUser(null)}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-background w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden border"
            >
              {/* Header */}
              <div className="relative h-24 bg-gradient-to-r from-purple-600 to-blue-600">
                <div className="absolute top-4 right-4 flex gap-2">
                  <Button
                    size="sm"
                    variant="secondary"
                    className="bg-white/20 text-white hover:bg-white/30 border-0"
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    {isEditing ? "Cancel Edit" : "Edit Profile"}
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="text-white hover:bg-white/20"
                    onClick={() => setSelectedUser(null)}
                  >
                    <XCircle className="h-6 w-6" />
                  </Button>
                </div>
                <div className="absolute -bottom-10 left-6">
                  <Avatar className="h-20 w-20 border-4 border-background shadow-xl">
                    <AvatarFallback className="bg-slate-200 text-2xl font-bold">
                      {getInitials(selectedUser.name)}
                    </AvatarFallback>
                  </Avatar>
                </div>
              </div>

              {/* Body */}
              <div className="pt-12 p-6 space-y-4">
                {!isEditing ? (
                  <>
                    {/* VIEW MODE */}
                    <div>
                      <h2 className="text-2xl font-bold">
                        {selectedUser.name}
                      </h2>
                      <div className="flex gap-2 mt-1">
                        {getStatusBadge(selectedUser.status)}{" "}
                        <Badge variant="outline">{selectedUser.role}</Badge>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm bg-muted/30 p-4 rounded-lg border">
                      <div>
                        <p className="text-xs font-bold text-muted-foreground uppercase">
                          Email
                        </p>
                        <p>{selectedUser.email}</p>
                      </div>
                      <div>
                        <p className="text-xs font-bold text-muted-foreground uppercase">
                          Phone
                        </p>
                        <p>{selectedUser.phone || "N/A"}</p>
                      </div>
                      <div>
                        <p className="text-xs font-bold text-muted-foreground uppercase">
                          Joined
                        </p>
                        <p>
                          {new Date(
                            selectedUser.createdAt
                          ).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    {/* Additional Details */}
                    {selectedUser.role === "STUDENT" &&
                      selectedUser.studentProfile && (
                        <div className="p-3 bg-blue-50/50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/50 rounded-lg text-sm">
                          <p>
                            <span className="font-semibold">Hifz Level:</span>{" "}
                            {selectedUser.studentProfile.hifzLevel || "N/A"}
                          </p>
                        </div>
                      )}
                  </>
                ) : (
                  <>
                    {/* EDIT MODE */}
                    <h2 className="text-lg font-bold mb-4">
                      Edit User Details
                    </h2>
                    <div className="space-y-3">
                      <div className="space-y-1">
                        <Label>Full Name</Label>
                        <Input
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                        />
                      </div>
                      <div className="space-y-1">
                        <Label>Email</Label>
                        <Input
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                        />
                      </div>
                      <div className="space-y-1">
                        <Label>Phone</Label>
                        <Input
                          value={formData.phone}
                          onChange={(e) =>
                            setFormData({ ...formData, phone: e.target.value })
                          }
                        />
                      </div>
                      <div className="space-y-1">
                        <Label>Role</Label>
                        <Select
                          value={formData.role}
                          onValueChange={(v) =>
                            setFormData({ ...formData, role: v })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="STUDENT">Student</SelectItem>
                            <SelectItem value="TEACHER">Teacher</SelectItem>
                            <SelectItem value="PARENT">Parent</SelectItem>
                            <SelectItem value="ADMIN">Admin</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Button
                        className="w-full mt-2 bg-green-600 hover:bg-green-700 text-white"
                        onClick={handleEditUser}
                        disabled={isActionLoading}
                      >
                        {isActionLoading ? (
                          <Loader2 className="animate-spin mr-2" />
                        ) : (
                          <Save className="mr-2 h-4 w-4" />
                        )}{" "}
                        Save Changes
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
