"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Filter,
  MoreHorizontal,
  UserCheck,
  UserX,
  ShieldAlert,
  GraduationCap,
  Users,
  UserRound,
  Mail,
  Phone,
  Calendar,
  Trash2,
  ExternalLink,
  ChevronRight,
  Hash,
} from "lucide-react";
import {
  updateUserStatus,
  deleteUser,
} from "@/app/actions/admin/users/actions";

// Brand Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

export default function UserRegistryClient({
  initialUsers,
}: {
  initialUsers: any[];
}) {
  const [users, setUsers] = useState(initialUsers);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<
    "ALL" | "STUDENT" | "TEACHER" | "PARENT" | "ADMIN"
  >("ALL");

  // Filter Logic
  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase());
      const matchesTab = activeTab === "ALL" || user.role === activeTab;
      return matchesSearch && matchesTab;
    });
  }, [users, search, activeTab]);

  const handleStatusUpdate = async (userId: string, status: string) => {
    try {
      await updateUserStatus(userId, status as any);
      setUsers((prev) =>
        prev.map((u) => (u.id === userId ? { ...u, status } : u)),
      );
      toast.success(`User status set to ${status}`);
    } catch (e) {
      toast.error("Failed to update status");
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* --- COMMAND HEADER --- */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="h-2 w-2 rounded-full bg-primary-700 animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">
              Identity Management
            </span>
          </div>
          <h1 className="text-5xl font-black tracking-tighter text-slate-900 dark:text-white">
            Registry <span className="text-primary-700">Terminal</span>
          </h1>
        </div>

        <div className="flex flex-wrap gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-80 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              placeholder="Search by name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-14 pl-12 glass-surface rounded-2xl outline-none border-0 focus:ring-2 ring-primary/20 dark:bg-slate-900"
            />
          </div>
          <Button className="h-14 px-8 rounded-2xl bg-primary-700 text-white font-black uppercase text-[10px] tracking-widest shadow-royal">
            Export CSV
          </Button>
        </div>
      </header>

      {/* --- ROLE TABS --- */}
      <div className="flex gap-2 p-1.5 glass-surface rounded-2xl w-fit">
        {["ALL", "STUDENT", "TEACHER", "PARENT", "ADMIN"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
              activeTab === tab
                ? "bg-primary-700 text-white shadow-lg"
                : "text-slate-400 hover:text-primary-700"
            }`}
          >
            {tab}s
          </button>
        ))}
      </div>

      {/* --- REGISTRY GRID/TABLE --- */}
      <div className="institutional-card glass-surface overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
                <th className="p-6 text-[10px] font-black uppercase tracking-widest text-slate-400">
                  Node / Identity
                </th>
                <th className="p-6 text-[10px] font-black uppercase tracking-widest text-slate-400">
                  Classification
                </th>
                <th className="p-6 text-[10px] font-black uppercase tracking-widest text-slate-400">
                  Current Status
                </th>
                <th className="p-6 text-[10px] font-black uppercase tracking-widest text-slate-400">
                  Registration
                </th>
                <th className="p-6"></th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence mode="popLayout">
                {filteredUsers.map((user) => (
                  <motion.tr
                    key={user.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="border-b dark:border-slate-800 group hover:bg-slate-50/50 dark:hover:bg-slate-900/50 transition-all"
                  >
                    {/* Identity Node */}
                    <td className="p-6">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-12 w-12 ring-2 ring-white dark:ring-slate-800 transition-transform group-hover:scale-110">
                          <AvatarImage src={user.image} />
                          <AvatarFallback className="bg-primary-100 text-primary-700 font-black">
                            {user.name[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-black text-slate-900 dark:text-white leading-none mb-1">
                            {user.name}
                          </p>
                          <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400">
                            <Mail className="h-3 w-3" /> {user.email}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Role Classification */}
                    <td className="p-6">
                      <div className="flex flex-col gap-1">
                        <Badge
                          variant="outline"
                          className={`w-fit text-[9px] font-black uppercase tracking-tighter ${getRoleColor(user.role)}`}
                        >
                          {user.role}
                        </Badge>
                        <span className="text-[9px] font-bold text-slate-400 uppercase ml-1">
                          {user.studentProfile?.studentId ||
                            user.teacherProfile?.teacherId ||
                            "Internal Staff"}
                        </span>
                      </div>
                    </td>

                    {/* Status Node */}
                    <td className="p-6">
                      <div className="flex items-center gap-2">
                        <div
                          className={`h-1.5 w-1.5 rounded-full ${getStatusColor(user.status)} animate-pulse`}
                        />
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-600 dark:text-slate-300">
                          {user.status}
                        </span>
                      </div>
                    </td>

                    {/* Registration Date */}
                    <td className="p-6">
                      <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400">
                        <Calendar className="h-3 w-3" />
                        {new Date(user.createdAt).toLocaleDateString()}
                      </div>
                    </td>

                    {/* Actions Terminal */}
                    <td className="p-6 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-full hover:bg-white dark:hover:bg-slate-800"
                          >
                            <MoreHorizontal className="h-5 w-5 text-slate-400" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          align="end"
                          className="w-56 rounded-2xl p-2 shadow-royal border-slate-100 dark:border-slate-800"
                        >
                          <DropdownMenuItem
                            onClick={() =>
                              handleStatusUpdate(user.id, "APPROVED")
                            }
                            className="rounded-xl py-3 font-bold text-xs gap-2"
                          >
                            <UserCheck className="h-4 w-4 text-emerald-500" />{" "}
                            Verify Identity
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() =>
                              handleStatusUpdate(user.id, "SUSPENDED")
                            }
                            className="rounded-xl py-3 font-bold text-xs gap-2"
                          >
                            <ShieldAlert className="h-4 w-4 text-amber-500" />{" "}
                            Suspend Access
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="rounded-xl py-3 font-bold text-xs gap-2">
                            <ExternalLink className="h-4 w-4 text-primary-700" />{" "}
                            Deep Profile
                          </DropdownMenuItem>
                          <DropdownMenuItem className="rounded-xl py-3 font-bold text-xs gap-2 text-rose-600">
                            <Trash2 className="h-4 w-4" /> Decommission Node
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// --- HELPER UTILITIES ---

function getRoleColor(role: string) {
  switch (role) {
    case "ADMIN":
      return "border-primary-700 text-primary-700 bg-primary-50";
    case "TEACHER":
      return "border-gold text-gold bg-gold/5";
    case "STUDENT":
      return "border-emerald-500 text-emerald-500 bg-emerald-50";
    default:
      return "border-slate-400 text-slate-400";
  }
}

function getStatusColor(status: string) {
  switch (status) {
    case "APPROVED":
      return "bg-emerald-500";
    case "PENDING":
      return "bg-amber-500";
    case "SUSPENDED":
      return "bg-rose-500";
    default:
      return "bg-slate-300";
  }
}
