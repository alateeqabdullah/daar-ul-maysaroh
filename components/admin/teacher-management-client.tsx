"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Filter,
  Download,
  Plus,
  MoreVertical,
  Edit,
  Trash2,
  GraduationCap,
  Users,
  BookOpen,
  Clock,
  MapPin,
  Mail,
  Phone,
  CheckCircle,
  XCircle,
  LayoutGrid,
  List as ListIcon,
  Loader2,
  X,
  Star,
  User,
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { getInitials } from "@/lib/utils";
import { Counter } from "@/components/admin/dashboard-ui";

// --- ANIMATION ---
const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } },
};
const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 50 } },
};

interface TeacherManagementClientProps {
  initialTeachers: any[];
  stats: any;
}

export default function TeacherManagementClient({
  initialTeachers,
  stats,
}: TeacherManagementClientProps) {
  const router = useRouter();
  const [teachers, setTeachers] = useState(initialTeachers);
  const [isLoading, setIsLoading] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("ALL");

  // Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState<any>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Form Data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    specialization: "",
    qualification: "",
    experienceYears: "",
    bio: "",
  });

  // --- FILTERS ---
  const filteredTeachers = teachers.filter((t) => {
    const matchesSearch =
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      filterStatus === "ALL" ||
      (filterStatus === "AVAILABLE" ? t.isAvailable : !t.isAvailable);
    return matchesSearch && matchesStatus;
  });

  // --- ACTIONS ---
  const handleCreateOrUpdate = async () => {
    if (!formData.name || !formData.email)
      return toast.error("Name and Email required");
    setIsLoading(true);

    try {
      const res = await fetch("/api/admin/teachers/manage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: isEditing ? "UPDATE" : "CREATE",
          teacherId: selectedTeacher?.id,
          userId: selectedTeacher?.userId,
          data: formData,
        }),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.error);

      if (isEditing) {
        setTeachers((prev) =>
          prev.map((t) =>
            t.id === selectedTeacher.id ? { ...t, ...result.teacher } : t
          )
        );
        setSelectedTeacher({ ...selectedTeacher, ...result.teacher });
        toast.success("Profile updated");
        setIsEditing(false);
      } else {
        setTeachers([result.teacher, ...teachers]);
        toast.success("Teacher added");
        setIsAddModalOpen(false);
        resetForm();
      }
    } catch (error: any) {
      toast.error(error.message || "Failed");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleStatus = async (teacherId: string, currentStatus: boolean) => {
    setTeachers((prev) =>
      prev.map((t) =>
        t.id === teacherId ? { ...t, isAvailable: !currentStatus } : t
      )
    );
    try {
      await fetch("/api/admin/teachers/manage", {
        method: "POST",
        body: JSON.stringify({
          action: "TOGGLE_STATUS",
          teacherId,
          data: { isAvailable: !currentStatus },
        }),
      });
      toast.success(currentStatus ? "Marked as Away" : "Marked Available");
    } catch {
      toast.error("Update failed");
      router.refresh();
    }
  };

  const handleDelete = async (teacherId: string, userId: string) => {
    if (!confirm("Delete this teacher? This removes their user account."))
      return;
    setTeachers((prev) => prev.filter((t) => t.id !== teacherId));
    setIsDetailOpen(false);
    try {
      await fetch("/api/admin/teachers/manage", {
        method: "POST",
        body: JSON.stringify({ action: "DELETE", teacherId, userId }),
      });
      toast.success("Teacher deleted");
    } catch {
      toast.error("Delete failed");
      router.refresh();
    }
  };

  const handleExport = () => {
    const headers = ["Name", "Email", "Specialization", "Status", "Joined"];
    const rows = teachers.map((t) => [
      t.name,
      t.email,
      t.specialization,
      t.isAvailable ? "Active" : "Inactive",
      new Date(t.createdAt).toLocaleDateString(),
    ]);
    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows].map((e) => e.join(",")).join("\n");
    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csvContent));
    link.setAttribute("download", "teachers_export.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // --- HELPERS ---
  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      specialization: "",
      qualification: "",
      experienceYears: "",
      bio: "",
    });
    setIsEditing(false);
  };

  const openAddModal = () => {
    resetForm();
    setIsAddModalOpen(true);
  };

  const openDetail = (t: any) => {
    setSelectedTeacher(t);
    setFormData({
      name: t.name,
      email: t.email,
      phone: t.phone || "",
      specialization: t.specialization || "",
      qualification: t.qualification || "",
      experienceYears: t.experienceYears?.toString() || "0",
      bio: t.bio || "",
    });
    setIsDetailOpen(true);
    setIsEditing(false);
  };

  const statCards = [
    {
      label: "Total Faculty",
      value: stats.totalTeachers,
      icon: GraduationCap,
      color: "from-blue-500 to-cyan-500",
      shadow: "shadow-blue-500/20",
    },
    {
      label: "Available",
      value: stats.availableTeachers,
      icon: CheckCircle,
      color: "from-green-500 to-emerald-500",
      shadow: "shadow-green-500/20",
    },
    {
      label: "Total Classes",
      value: stats.totalClasses,
      icon: BookOpen,
      color: "from-purple-500 to-pink-500",
      shadow: "shadow-purple-500/20",
    },
    {
      label: "Student Reach",
      value: stats.totalStudents,
      icon: Users,
      color: "from-amber-400 to-orange-500",
      shadow: "shadow-amber-500/20",
    },
  ];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-8 pb-10"
    >
      {/* HEADER */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
            Teacher Management
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage faculty profiles and assignments
          </p>
        </div>
        <div className="flex gap-2">
          <div className="flex items-center bg-muted p-1 rounded-lg border">
            <Button
              size="icon"
              variant={viewMode === "grid" ? "white" : "ghost"}
              className={`h-7 w-7 rounded-md ${
                viewMode === "grid" ? "shadow-sm" : ""
              }`}
              onClick={() => setViewMode("grid")}
            >
              <LayoutGrid className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              variant={viewMode === "list" ? "white" : "ghost"}
              className={`h-7 w-7 rounded-md ${
                viewMode === "list" ? "shadow-sm" : ""
              }`}
              onClick={() => setViewMode("list")}
            >
              <ListIcon className="h-4 w-4" />
            </Button>
          </div>
          <Button variant="outline" onClick={handleExport}>
            <Download className="h-4 w-4 mr-2" /> Export
          </Button>
          <Button
            className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md hover:scale-105 transition-all"
            onClick={openAddModal}
          >
            <Plus className="h-4 w-4 mr-2" /> Add Teacher
          </Button>
        </div>
      </div>

      {/* STATS */}
      <motion.div
        variants={containerVariants}
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        {statCards.map((stat) => (
          <motion.div key={stat.label} variants={itemVariants}>
            <Card className="border-none shadow-sm bg-white/50 backdrop-blur-sm dark:bg-slate-900/50 hover:shadow-md transition-all overflow-hidden relative">
              <div
                className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${stat.color} opacity-10 rounded-bl-full`}
              />
              <CardContent className="p-6 relative z-10 flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase">
                    {stat.label}
                  </p>
                  <div className="text-2xl font-bold mt-2">
                    <Counter value={stat.value} />
                  </div>
                </div>
                <div
                  className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} text-white ${stat.shadow} shadow-lg`}
                >
                  <stat.icon className="h-6 w-6" />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* FILTERS */}
      <motion.div
        variants={itemVariants}
        className="flex flex-col sm:flex-row gap-4 bg-white/60 dark:bg-slate-900/60 backdrop-blur-md p-4 rounded-xl border shadow-sm"
      >
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search teachers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 bg-white dark:bg-slate-950"
          />
        </div>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-[180px] bg-white dark:bg-slate-950">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All Status</SelectItem>
            <SelectItem value="AVAILABLE">Available</SelectItem>
            <SelectItem value="UNAVAILABLE">Unavailable</SelectItem>
          </SelectContent>
        </Select>
      </motion.div>

      {/* GRID VIEW */}
      {viewMode === "grid" ? (
        <motion.div
          variants={containerVariants}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {filteredTeachers.map((t) => (
            <motion.div
              key={t.id}
              variants={itemVariants}
              layoutId={t.id}
              onClick={() => openDetail(t)}
              className="cursor-pointer"
            >
              <Card
                className={`group h-full border hover:border-purple-300 dark:hover:border-purple-800 transition-all hover:shadow-xl bg-card ${
                  !t.isAvailable ? "opacity-75 grayscale" : ""
                }`}
              >
                <CardContent className="p-6 flex flex-col h-full items-center text-center">
                  <div className="relative mb-4">
                    <Avatar className="h-24 w-24 border-4 border-white dark:border-slate-900 shadow-lg">
                      <AvatarImage src={t.image} />
                      <AvatarFallback className="text-2xl">
                        {getInitials(t.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div
                      className={`absolute bottom-1 right-1 h-5 w-5 rounded-full border-2 border-white ${
                        t.isAvailable ? "bg-green-500" : "bg-gray-400"
                      }`}
                    />
                  </div>
                  <h3 className="font-bold text-lg">{t.name}</h3>
                  <p className="text-sm text-purple-600 font-medium mb-4">
                    {t.specialization || "General Instructor"}
                  </p>

                  <div className="grid grid-cols-2 gap-2 w-full mb-4">
                    <div className="bg-muted/50 p-2 rounded-lg">
                      <p className="text-xs text-muted-foreground">Classes</p>
                      <p className="font-bold">{t.totalClasses}</p>
                    </div>
                    <div className="bg-muted/50 p-2 rounded-lg">
                      <p className="text-xs text-muted-foreground">Students</p>
                      <p className="font-bold">{t.totalStudents}</p>
                    </div>
                  </div>

                  <div className="mt-auto flex gap-2 w-full">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleStatus(t.id, t.isAvailable);
                      }}
                    >
                      {t.isAvailable ? "Set Away" : "Set Active"}
                    </Button>
                    <Button
                      size="sm"
                      className="flex-1 bg-purple-600 hover:bg-purple-700"
                      onClick={(e) => {
                        e.stopPropagation();
                        openDetail(t);
                      }}
                    >
                      Profile
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        /* LIST VIEW */
        <motion.div variants={containerVariants}>
          <Card className="border-none shadow-sm overflow-hidden bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-muted/30 border-b">
                    <tr>
                      <th className="px-6 py-4 text-left font-semibold">
                        Teacher
                      </th>
                      <th className="px-6 py-4 text-left font-semibold">
                        Specialization
                      </th>
                      <th className="px-6 py-4 text-left font-semibold">
                        Classes
                      </th>
                      <th className="px-6 py-4 text-left font-semibold">
                        Status
                      </th>
                      <th className="px-6 py-4 text-right font-semibold">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {filteredTeachers.map((t) => (
                      <motion.tr
                        key={t.id}
                        variants={itemVariants}
                        className="group hover:bg-muted/40 transition-colors cursor-pointer"
                        onClick={() => openDetail(t)}
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={t.image} />
                              <AvatarFallback>
                                {getInitials(t.name)}
                              </AvatarFallback>
                            </Avatar>
                            <span className="font-medium">{t.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">{t.specialization}</td>
                        <td className="px-6 py-4">{t.totalClasses}</td>
                        <td className="px-6 py-4">
                          <Badge
                            variant={t.isAvailable ? "default" : "secondary"}
                          >
                            {t.isAvailable ? "Active" : "Away"}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button size="icon" variant="ghost">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => openDetail(t)}>
                                <Edit className="mr-2 h-4 w-4" /> Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() =>
                                  toggleStatus(t.id, t.isAvailable)
                                }
                              >
                                {t.isAvailable ? "Set Away" : "Set Active"}
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleDelete(t.id, t.userId)}
                                className="text-red-600"
                              >
                                <Trash2 className="mr-2 h-4 w-4" /> Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* --- ADD MODAL --- */}
      <AnimatePresence>
        {isAddModalOpen && (
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
              className="bg-background w-full max-w-lg rounded-2xl shadow-2xl border p-6 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Add New Teacher</h2>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => setIsAddModalOpen(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <div className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <Label>Full Name</Label>
                    <Input
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="Jane Doe"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label>Email</Label>
                    <Input
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      placeholder="jane@example.com"
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <Label>Phone</Label>
                  <Input
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    placeholder="+1 234 567 890"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <Label>Specialization</Label>
                    <Input
                      value={formData.specialization}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          specialization: e.target.value,
                        })
                      }
                      placeholder="Tajweed"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label>Experience (Yrs)</Label>
                    <Input
                      type="number"
                      value={formData.experienceYears}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          experienceYears: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <Label>Qualification</Label>
                  <Input
                    value={formData.qualification}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        qualification: e.target.value,
                      })
                    }
                    placeholder="PhD in Islamic Studies"
                  />
                </div>
                <div className="space-y-1">
                  <Label>Bio</Label>
                  <Textarea
                    value={formData.bio}
                    onChange={(e) =>
                      setFormData({ ...formData, bio: e.target.value })
                    }
                    placeholder="Short biography..."
                  />
                </div>
                <Button
                  className="w-full mt-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white"
                  onClick={handleCreateOrUpdate}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="animate-spin mr-2" />
                  ) : (
                    "Create Teacher"
                  )}
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- DETAIL MODAL --- */}
      <AnimatePresence>
        {isDetailOpen && selectedTeacher && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsDetailOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-background w-full max-w-4xl h-[85vh] rounded-2xl shadow-2xl border overflow-hidden flex flex-col"
            >
              {/* Profile Header */}
              <div className="h-40 bg-gradient-to-r from-purple-600 to-indigo-700 p-6 flex items-end relative shrink-0">
                <Button
                  size="icon"
                  variant="ghost"
                  className="absolute top-4 right-4 text-white hover:bg-white/20"
                  onClick={() => setIsDetailOpen(false)}
                >
                  <X className="h-6 w-6" />
                </Button>
                <div className="flex items-end gap-6 relative top-8 w-full">
                  <Avatar className="h-32 w-32 border-4 border-background shadow-xl">
                    <AvatarImage src={selectedTeacher.image} />
                    <AvatarFallback className="text-4xl bg-muted">
                      {getInitials(selectedTeacher.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="mb-8 text-white">
                    <h2 className="text-3xl font-bold">
                      {selectedTeacher.name}
                    </h2>
                    <p className="opacity-90">
                      {selectedTeacher.specialization || "Instructor"}
                    </p>
                  </div>
                  <div className="ml-auto mb-8 flex gap-2">
                    <Button
                      variant="secondary"
                      onClick={() => setIsEditing(!isEditing)}
                    >
                      {isEditing ? "View Mode" : "Edit Profile"}
                    </Button>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto bg-muted/10 p-6 pt-12">
                {isEditing ? (
                  <div className="max-w-2xl mx-auto space-y-4">
                    {/* EDIT FORM */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <Label>Name</Label>
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
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <Label>Specialization</Label>
                        <Input
                          value={formData.specialization}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              specialization: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="space-y-1">
                        <Label>Experience</Label>
                        <Input
                          value={formData.experienceYears}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              experienceYears: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <Label>Qualification</Label>
                      <Input
                        value={formData.qualification}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            qualification: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="space-y-1">
                      <Label>Bio</Label>
                      <Textarea
                        value={formData.bio}
                        onChange={(e) =>
                          setFormData({ ...formData, bio: e.target.value })
                        }
                      />
                    </div>
                    <Button
                      className="w-full bg-green-600 hover:bg-green-700"
                      onClick={handleCreateOrUpdate}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <Loader2 className="animate-spin" />
                      ) : (
                        "Save Changes"
                      )}
                    </Button>
                    <div className="pt-4 border-t mt-4 flex justify-between items-center text-sm text-muted-foreground">
                      <span>Danger Zone</span>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() =>
                          handleDelete(
                            selectedTeacher.id,
                            selectedTeacher.userId
                          )
                        }
                      >
                        Delete Teacher
                      </Button>
                    </div>
                  </div>
                ) : (
                  <Tabs defaultValue="overview" className="w-full">
                    <TabsList className="mb-6">
                      <TabsTrigger value="overview">Overview</TabsTrigger>
                      <TabsTrigger value="classes">
                        Classes ({selectedTeacher.totalClasses})
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview">
                      <div className="grid gap-6 md:grid-cols-2">
                        <Card>
                          <CardContent className="p-6 space-y-4">
                            <h3 className="font-semibold flex items-center gap-2">
                              <User className="h-4 w-4 text-purple-600" />{" "}
                              Contact Info
                            </h3>
                            <div className="space-y-2 text-sm">
                              <p className="flex justify-between">
                                <span className="text-muted-foreground">
                                  Email:
                                </span>{" "}
                                <span>{selectedTeacher.email}</span>
                              </p>
                              <p className="flex justify-between">
                                <span className="text-muted-foreground">
                                  Phone:
                                </span>{" "}
                                <span>{selectedTeacher.phone || "N/A"}</span>
                              </p>
                            </div>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardContent className="p-6 space-y-4">
                            <h3 className="font-semibold flex items-center gap-2">
                              <Star className="h-4 w-4 text-amber-500" />{" "}
                              Professional
                            </h3>
                            <div className="space-y-2 text-sm">
                              <p className="flex justify-between">
                                <span className="text-muted-foreground">
                                  Qualification:
                                </span>{" "}
                                <span>
                                  {selectedTeacher.qualification || "N/A"}
                                </span>
                              </p>
                              <p className="flex justify-between">
                                <span className="text-muted-foreground">
                                  Experience:
                                </span>{" "}
                                <span>
                                  {selectedTeacher.experienceYears} Years
                                </span>
                              </p>
                            </div>
                          </CardContent>
                        </Card>
                        <Card className="md:col-span-2">
                          <CardContent className="p-6">
                            <h3 className="font-semibold mb-2">Biography</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              {selectedTeacher.bio || "No biography provided."}
                            </p>
                          </CardContent>
                        </Card>
                      </div>
                    </TabsContent>

                    <TabsContent value="classes">
                      <div className="space-y-2">
                        {selectedTeacher.classes?.length > 0 ? (
                          selectedTeacher.classes.map((c: any) => (
                            <div
                              key={c.id}
                              className="flex justify-between items-center p-3 bg-card border rounded-lg"
                            >
                              <div className="flex items-center gap-3">
                                <div className="h-8 w-8 bg-purple-100 text-purple-600 rounded flex items-center justify-center font-bold text-xs">
                                  {c.name.charAt(0)}
                                </div>
                                <span className="font-medium">{c.name}</span>
                              </div>
                              <Badge variant="outline">
                                {c.students} Students
                              </Badge>
                            </div>
                          ))
                        ) : (
                          <div className="text-center py-12 text-muted-foreground border-dashed border rounded-xl">
                            No classes assigned.
                          </div>
                        )}
                      </div>
                    </TabsContent>
                  </Tabs>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
