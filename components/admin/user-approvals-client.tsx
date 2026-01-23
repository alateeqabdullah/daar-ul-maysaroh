"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Filter,
  Download,
  Mail,
  Phone,
  Calendar,
  Book,
  GraduationCap,
  User,
  CheckCircle2,
  XCircle,
  Eye,
  Loader2,
  ShieldCheck,
  MapPin,
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
import { toast } from "sonner";
import { getInitials } from "@/lib/utils";
import { Counter } from "@/components/admin/dashboard-ui"; // Ensure this path is correct based on previous steps

// --- ANIMATION VARIANTS (Identical to Dashboard) ---
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 50, damping: 10 },
  },
};

// --- TYPES ---
interface ProfileData {
  hifzLevel?: string;
  gender?: string;
  memorizationGoal?: string;
  qualification?: string;
  specialization?: string;
  experienceYears?: number;
  occupation?: string;
}

interface PendingUser {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  role: string;
  status: string;
  image?: string | null;
  createdAt: string;
  studentProfile?: ProfileData | null;
  teacherProfile?: ProfileData | null;
  parentProfile?: ProfileData | null;
}

interface UserApprovalsClientProps {
  initialUsers: PendingUser[];
  pagination: { page: number; total: number; pages: number };
  filters: { role?: string; search?: string };
}

export default function UserApprovalsClient({
  initialUsers,
  pagination,
  filters,
}: UserApprovalsClientProps) {
  const router = useRouter();
  const [users, setUsers] = useState(initialUsers);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState(filters.search || "");
  const [selectedRole, setSelectedRole] = useState(filters.role || "ALL");
  const [selectedUser, setSelectedUser] = useState<PendingUser | null>(null);

  // --- ACTIONS ---
  const refresh = () => {
    setIsLoading(true);
    const params = new URLSearchParams();
    if (searchQuery) params.set("search", searchQuery);
    if (selectedRole !== "ALL") params.set("role", selectedRole);
    router.push(`/admin/approvals?${params.toString()}`);
    setTimeout(() => setIsLoading(false), 800);
  };

  const handleAction = async (
    userId: string,
    action: "APPROVE" | "REJECT",
    reason?: string
  ) => {
    // Optimistic UI Update: Remove card immediately
    setUsers((prev) => prev.filter((u) => u.id !== userId));
    if (selectedUser?.id === userId) setSelectedUser(null);

    try {
      const res = await fetch("/api/admin/users/action", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, action, rejectionReason: reason }),
      });

      if (!res.ok) throw new Error("Operation failed");

      toast.success(action === "APPROVE" ? "User Approved" : "User Rejected", {
        description:
          action === "APPROVE"
            ? "Account is now active."
            : "User has been notified.",
      });

      router.refresh();
    } catch (err) {
      toast.error("Action Failed", { description: "Restoring state..." });
      router.refresh();
    }
  };

  // --- HELPERS ---
  const getRoleBadge = (role: string) => {
    const styles: Record<string, string> = {
      STUDENT: "bg-blue-100 text-blue-700 border-blue-200",
      TEACHER: "bg-purple-100 text-purple-700 border-purple-200",
      PARENT: "bg-emerald-100 text-emerald-700 border-emerald-200",
      ADMIN: "bg-amber-100 text-amber-700 border-amber-200",
    };
    const icons: Record<string, any> = {
      STUDENT: Book,
      TEACHER: GraduationCap,
      PARENT: User,
      ADMIN: ShieldCheck,
    };
    const Icon = icons[role] || User;

    return (
      <Badge variant="outline" className={`gap-1.5 py-1 ${styles[role] || ""}`}>
        <Icon className="h-3 w-3" />
        {role}
      </Badge>
    );
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // --- STATS CONFIGURATION (Matches Dashboard Look) ---
  const stats = [
    {
      label: "Total Pending",
      value: users.length,
      icon: Filter,
      color: "from-violet-500 to-purple-600",
      shadow: "shadow-purple-500/20",
    },
    {
      label: "Students",
      value: users.filter((u) => u.role === "STUDENT").length,
      icon: Book,
      color: "from-blue-400 to-cyan-500",
      shadow: "shadow-blue-500/20",
    },
    {
      label: "Teachers",
      value: users.filter((u) => u.role === "TEACHER").length,
      icon: GraduationCap,
      color: "from-amber-400 to-orange-500",
      shadow: "shadow-amber-500/20",
    },
    {
      label: "Parents",
      value: users.filter((u) => u.role === "PARENT").length,
      icon: User,
      color: "from-emerald-400 to-teal-500",
      shadow: "shadow-emerald-500/20",
    },
  ];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-8 pb-10"
    >
      {/* --- HEADER --- */}
      <motion.div
        variants={itemVariants}
        className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-linear-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
            User Approvals
          </h1>
          <p className="text-muted-foreground mt-1">
            Review and manage registration requests ({pagination.total})
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2" disabled={isLoading}>
            <Download className="h-4 w-4" /> Export
          </Button>
          {users.length > 0 && (
            <Button className="bg-linear-to-r from-green-600 to-emerald-600 shadow-lg shadow-green-900/20 hover:scale-105 transition-all gap-2 text-white">
              <CheckCircle2 className="h-4 w-4" /> Approve All
            </Button>
          )}
        </div>
      </motion.div>

      {/* --- STATS GRID (Identical to Dashboard) --- */}
      <motion.div
        variants={containerVariants}
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        {stats.map((stat) => (
          <motion.div
            key={stat.label}
            variants={itemVariants}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="group"
          >
            <Card className="border-none shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden relative">
              {/* Gradient Blob */}
              <div
                className={`absolute top-0 right-0 w-24 h-24 bg-linear-to-br ${stat.color} opacity-10 rounded-bl-full group-hover:scale-110 transition-transform`}
              />
              <CardContent className="p-6 flex justify-between items-center relative z-10">
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    {stat.label}
                  </p>
                  <div className="text-2xl font-bold mt-2">
                    <Counter value={stat.value} />
                  </div>
                </div>
                <div
                  className={`p-3 rounded-xl bg-linear-to-br ${stat.color} text-white ${stat.shadow} shadow-lg`}
                >
                  <stat.icon className="h-5 w-5" />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* --- FILTERS (Glassmorphism Toolbar) --- */}
      <motion.div variants={itemVariants}>
        <div className="flex flex-col sm:flex-row gap-3 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md p-4 rounded-xl border shadow-sm">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, email, phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-white dark:bg-slate-950 border-muted"
            />
          </div>
          <Select value={selectedRole} onValueChange={setSelectedRole}>
            <SelectTrigger className="w-full sm:w-[180px] bg-white dark:bg-slate-950 border-muted">
              <SelectValue placeholder="Filter by Role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All Roles</SelectItem>
              <SelectItem value="STUDENT">Students</SelectItem>
              <SelectItem value="TEACHER">Teachers</SelectItem>
              <SelectItem value="PARENT">Parents</SelectItem>
            </SelectContent>
          </Select>
          <Button
            onClick={refresh}
            disabled={isLoading}
            className="bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-md hover:shadow-lg transition-all"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              "Apply Filters"
            )}
          </Button>
        </div>
      </motion.div>

      {/* --- USERS LIST (Cards with Layout Animations) --- */}
      <motion.div variants={containerVariants} className="space-y-4">
        {users.length === 0 ? (
          <motion.div
            variants={itemVariants}
            className="text-center py-20 bg-muted/20 rounded-xl border border-dashed border-muted-foreground/20"
          >
            <div className="h-16 w-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold">All Caught Up!</h3>
            <p className="text-muted-foreground">
              No pending registration requests found matching your filters.
            </p>
          </motion.div>
        ) : (
          <AnimatePresence>
            {users.map((user) => (
              <motion.div
                key={user.id}
                layoutId={user.id}
                variants={itemVariants}
                exit={{ opacity: 0, x: -20 }}
                className="group bg-card p-4 sm:p-5 rounded-xl border hover:border-purple-200 dark:hover:border-purple-900 transition-all shadow-sm hover:shadow-md flex flex-col sm:flex-row gap-5 items-start sm:items-center justify-between"
              >
                {/* User Info Section */}
                <div className="flex items-start gap-4 w-full sm:w-auto">
                  <Avatar className="h-12 w-12 border-2 border-white dark:border-slate-800 shadow-sm">
                    <AvatarImage src={user.image || undefined} />
                    <AvatarFallback className="bg-gradient-to-br from-purple-500 to-indigo-600 text-white font-bold text-sm">
                      {getInitials(user.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <h3 className="font-bold text-base truncate">
                        {user.name}
                      </h3>
                      {getRoleBadge(user.role)}
                    </div>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1.5">
                        <Mail className="h-3.5 w-3.5" /> {user.email}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5" /> Applied{" "}
                        {formatDate(user.createdAt)}
                      </span>
                    </div>

                    {/* Role Specific Snippet */}
                    <div className="mt-2.5 flex items-center gap-2">
                      <div className="text-xs font-medium text-muted-foreground/80 bg-muted/50 px-2.5 py-1 rounded-md border border-muted/50">
                        {user.role === "STUDENT" &&
                          `Goal: ${
                            user.studentProfile?.memorizationGoal || "N/A"
                          }`}
                        {user.role === "TEACHER" &&
                          `Spec: ${
                            user.teacherProfile?.specialization || "General"
                          }`}
                        {user.role === "PARENT" &&
                          `Occupation: ${
                            user.parentProfile?.occupation || "N/A"
                          }`}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions Section */}
                <div className="flex items-center gap-2 w-full sm:w-auto mt-2 sm:mt-0 pt-3 sm:pt-0 border-t sm:border-t-0 border-muted">
                  <Button
                    size="sm"
                    className="flex-1 sm:flex-none bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm shadow-emerald-900/10"
                    onClick={() => handleAction(user.id, "APPROVE")}
                  >
                    Approve
                  </Button>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-red-600 hover:bg-red-50 border-red-100 dark:text-red-400 dark:border-red-900/30 dark:hover:bg-red-950/20"
                      >
                        Reject
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() =>
                          handleAction(user.id, "REJECT", "Incomplete Data")
                        }
                      >
                        Incomplete Data
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() =>
                          handleAction(user.id, "REJECT", "Ineligible")
                        }
                      >
                        Ineligible
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleAction(user.id, "REJECT", "Other")}
                      >
                        Other
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  <Button
                    size="sm"
                    variant="ghost"
                    className="px-2 text-muted-foreground hover:text-foreground"
                    onClick={() => setSelectedUser(user)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </motion.div>

      {/* --- DETAIL MODAL (Apple Style) --- */}
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
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-background w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden border border-muted"
            >
              {/* Modal Header Art */}
              <div className="relative h-28 bg-gradient-to-br from-indigo-600 via-purple-600 to-violet-600">
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 text-white/70 hover:text-white hover:bg-white/20 rounded-full"
                  onClick={() => setSelectedUser(null)}
                >
                  <XCircle className="h-6 w-6" />
                </Button>
                <div className="absolute -bottom-10 left-8">
                  <Avatar className="h-24 w-24 border-[5px] border-background shadow-xl">
                    <AvatarImage src={selectedUser.image || undefined} />
                    <AvatarFallback className="bg-muted text-muted-foreground text-3xl font-bold">
                      {getInitials(selectedUser.name)}
                    </AvatarFallback>
                  </Avatar>
                </div>
              </div>

              {/* Modal Body */}
              <div className="pt-14 p-8 space-y-6">
                <div>
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-2xl font-bold tracking-tight">
                        {selectedUser.name}
                      </h2>
                      <div className="flex gap-2 mt-2">
                        {getRoleBadge(selectedUser.role)}
                        <Badge
                          variant="outline"
                          className="border-amber-200 bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800"
                        >
                          Pending Review
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6 text-sm">
                  <div className="space-y-3">
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                      Contact Info
                    </p>
                    <div className="space-y-2">
                      <p className="flex items-center gap-2.5">
                        <Mail className="h-4 w-4 text-primary" />{" "}
                        {selectedUser.email}
                      </p>
                      <p className="flex items-center gap-2.5">
                        <Phone className="h-4 w-4 text-primary" />{" "}
                        {selectedUser.phone || "N/A"}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                      System Info
                    </p>
                    <div className="space-y-2">
                      <p className="flex items-center gap-2.5">
                        <Calendar className="h-4 w-4 text-primary" />{" "}
                        {formatDate(selectedUser.createdAt)}
                      </p>
                      <p className="flex items-center gap-2.5">
                        <MapPin className="h-4 w-4 text-primary" />{" "}
                        {selectedUser.role}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Role Specific Details Box */}
                <div className="bg-muted/40 p-5 rounded-xl border border-muted/60">
                  <h3 className="font-semibold mb-4 flex items-center gap-2 text-sm">
                    <ShieldCheck className="h-4 w-4 text-purple-600" />
                    Detailed Profile
                  </h3>

                  {selectedUser.role === "STUDENT" &&
                    selectedUser.studentProfile && (
                      <div className="grid grid-cols-2 gap-y-3 text-sm">
                        <div className="flex flex-col">
                          <span className="text-xs text-muted-foreground">
                            Hifz Level
                          </span>
                          <span className="font-medium">
                            {selectedUser.studentProfile.hifzLevel || "-"}
                          </span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-xs text-muted-foreground">
                            Goal
                          </span>
                          <span className="font-medium">
                            {selectedUser.studentProfile.memorizationGoal ||
                              "-"}
                          </span>
                        </div>
                      </div>
                    )}
                  {selectedUser.role === "TEACHER" &&
                    selectedUser.teacherProfile && (
                      <div className="grid grid-cols-2 gap-y-3 text-sm">
                        <div className="flex flex-col">
                          <span className="text-xs text-muted-foreground">
                            Specialization
                          </span>
                          <span className="font-medium">
                            {selectedUser.teacherProfile.specialization || "-"}
                          </span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-xs text-muted-foreground">
                            Experience
                          </span>
                          <span className="font-medium">
                            {selectedUser.teacherProfile.experienceYears} Years
                          </span>
                        </div>
                      </div>
                    )}
                </div>

                {/* Action Footer */}
                <div className="flex gap-3 pt-4 border-t border-muted">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => setSelectedUser(null)}
                  >
                    Close
                  </Button>
                  <Button
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white shadow-md"
                    onClick={() => handleAction(selectedUser.id, "APPROVE")}
                  >
                    Approve Request
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
