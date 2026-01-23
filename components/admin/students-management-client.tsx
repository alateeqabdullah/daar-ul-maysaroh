"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Plus,
  MoreVertical,
  Edit,
  Trash2,
  GraduationCap,
  Download,
  LayoutGrid,
  List as ListIcon,
  Loader2,
  X,
  User,
  UserCheck,
  Shield,
  Book,
  FileText,
  CalendarCheck,
  Wallet,
  Clock,
  Mail,
  Phone,
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
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"; // Added Tabs
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

interface StudentsManagementClientProps {
  initialStudents: any[];
  classes: any[];
  parents: any[];
  stats: any;
  pagination: any;
}

export default function StudentsManagementClient({
  initialStudents,
  classes,
  parents,
  stats,
  pagination,
}: StudentsManagementClientProps) {
  const router = useRouter();
  const [students, setStudents] = useState(initialStudents);
  const [isLoading, setIsLoading] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [filterClass, setFilterClass] = useState("ALL");

  // Modals & Details
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Extended Data State (Fetched on click)
  const [extendedData, setExtendedData] = useState<any>(null);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);

  // Form Data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "MALE",
    hifzLevel: "",
    memorizationGoal: "",
    classId: "none",
    parentId: "none",
  });

  // Filter Logic
  const filteredStudents = students.filter((s) => {
    const term = searchQuery.toLowerCase();
    const matchesSearch =
      s.user.name.toLowerCase().includes(term) ||
      s.user.email.toLowerCase().includes(term) ||
      s.studentId.toLowerCase().includes(term);
    const matchesClass =
      filterClass === "ALL" || s.currentClassId === filterClass;
    return matchesSearch && matchesClass;
  });

  // --- ACTIONS ---

  // Fetch Deep Details
  const fetchExtendedDetails = async (studentId: string) => {
    setIsLoadingDetails(true);
    setExtendedData(null);
    try {
      const res = await fetch(
        `/api/admin/students/details?studentId=${studentId}`
      );
      if (res.ok) {
        const data = await res.json();
        setExtendedData(data);
      }
    } catch (error) {
      console.error("Failed to load details");
    } finally {
      setIsLoadingDetails(false);
    }
  };

  const handleCreateOrUpdate = async () => {
    if (!formData.name || !formData.email)
      return toast.error("Name and Email required");
    setIsLoading(true);

    try {
      const res = await fetch("/api/admin/students/manage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: isEditing ? "UPDATE" : "CREATE",
          studentId: selectedStudent?.id,
          userId: selectedStudent?.user.id,
          data: formData,
        }),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.error);

      if (isEditing) {
        // Update specific student in list
        const updatedStudent = {
          ...selectedStudent,
          ...result.studentProfile,
          user: {
            ...selectedStudent.user,
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
          },
        };
        setStudents((prev) =>
          prev.map((s) => (s.id === selectedStudent.id ? updatedStudent : s))
        );
        setSelectedStudent(updatedStudent);
        toast.success("Profile updated");
        setIsEditing(false);
      } else {
        // Add new student to list
        setStudents([result.student, ...students]);
        toast.success("Student created");
        setIsAddModalOpen(false);
        resetForm();
      }
    } catch (error: any) {
      toast.error(error.message || "Failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (studentId: string, userId: string) => {
    if (!confirm("Delete student? This removes user access.")) return;
    setStudents((prev) => prev.filter((s) => s.id !== studentId));
    setIsDetailOpen(false);
    try {
      await fetch("/api/admin/students/manage", {
        method: "POST",
        body: JSON.stringify({ action: "DELETE", studentId, userId }),
      });
      toast.success("Student deleted");
    } catch {
      toast.error("Delete failed");
      router.refresh();
    }
  };

  // --- HELPERS ---
  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      gender: "MALE",
      hifzLevel: "",
      memorizationGoal: "",
      classId: "none",
      parentId: "none",
    });
    setIsEditing(false);
  };

  const openAddModal = () => {
    resetForm();
    setIsAddModalOpen(true);
  };

  const openDetail = (s: any) => {
    setSelectedStudent(s);
    setFormData({
      name: s.user.name,
      email: s.user.email,
      phone: s.user.phone || "",
      gender: s.gender,
      hifzLevel: s.hifzLevel || "",
      memorizationGoal: s.memorizationGoal || "",
      classId: s.currentClassId || "none",
      parentId: s.parentId || "none",
    });
    setIsDetailOpen(true);
    setIsEditing(false);
    // Fetch deep data
    fetchExtendedDetails(s.id);
  };

  const statCards = [
    {
      label: "Total Students",
      value: stats.totalStudents,
      icon: GraduationCap,
      color: "from-blue-500 to-cyan-500",
      shadow: "shadow-blue-500/20",
    },
    {
      label: "Boys",
      value: stats.boys,
      icon: User,
      color: "from-indigo-500 to-violet-500",
      shadow: "shadow-indigo-500/20",
    },
    {
      label: "Girls",
      value: stats.girls,
      icon: User,
      color: "from-pink-500 to-rose-500",
      shadow: "shadow-pink-500/20",
    },
    {
      label: "Suspended",
      value: stats.suspended,
      icon: UserCheck,
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
            Student Management
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage enrollments and academic profiles
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
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" /> Export
          </Button>
          <Button
            className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md hover:scale-105 transition-all"
            onClick={openAddModal}
          >
            <Plus className="h-4 w-4 mr-2" /> Add Student
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
            placeholder="Search students..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 bg-white dark:bg-slate-950"
          />
        </div>
        <Select value={filterClass} onValueChange={setFilterClass}>
          <SelectTrigger className="w-[180px] bg-white dark:bg-slate-950">
            <SelectValue placeholder="Filter Class" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All Classes</SelectItem>
            {classes.map((c) => (
              <SelectItem key={c.id} value={c.id}>
                {c.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </motion.div>

      {/* GRID VIEW */}
      {viewMode === "grid" ? (
        <motion.div
          variants={containerVariants}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {filteredStudents.map((s) => (
            <motion.div
              key={s.id}
              variants={itemVariants}
              layoutId={s.id}
              onClick={() => openDetail(s)}
              className="cursor-pointer"
            >
              <Card className="group h-full border hover:border-purple-300 dark:hover:border-purple-800 transition-all hover:shadow-xl bg-card">
                <CardContent className="p-6 flex flex-col h-full items-center text-center">
                  <div className="relative mb-4">
                    <Avatar className="h-24 w-24 border-4 border-white dark:border-slate-900 shadow-lg">
                      <AvatarImage src={s.user.image} />
                      <AvatarFallback className="text-2xl bg-gradient-to-br from-blue-50 to-blue-100 text-blue-600">
                        {getInitials(s.user.name)}
                      </AvatarFallback>
                    </Avatar>
                    <Badge className="absolute -bottom-3 left-1/2 -translate-x-1/2 shadow-sm whitespace-nowrap bg-white text-foreground hover:bg-white dark:bg-slate-800">
                      {s.studentId}
                    </Badge>
                  </div>
                  <h3 className="font-bold text-lg mt-2">{s.user.name}</h3>
                  <div className="flex gap-2 mt-1">
                    {s.currentClass ? (
                      <Badge variant="secondary" className="text-xs">
                        {s.currentClass.name}
                      </Badge>
                    ) : (
                      <Badge
                        variant="outline"
                        className="text-xs text-muted-foreground"
                      >
                        Unassigned
                      </Badge>
                    )}
                    <Badge
                      variant="outline"
                      className="text-xs border-purple-200 text-purple-700 bg-purple-50"
                    >
                      {s.gender}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-2 w-full my-4">
                    <div className="bg-muted/50 p-2 rounded-lg">
                      <p className="text-xs text-muted-foreground">
                        Hifz Level
                      </p>
                      <p className="font-bold text-sm">{s.hifzLevel || "-"}</p>
                    </div>
                    <div className="bg-muted/50 p-2 rounded-lg">
                      <p className="text-xs text-muted-foreground">Goal</p>
                      <p className="font-bold text-sm truncate">
                        {s.memorizationGoal || "-"}
                      </p>
                    </div>
                  </div>
                  <div className="mt-auto w-full pt-4 border-t flex justify-between items-center text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <User className="h-3 w-3" />{" "}
                      {s.parent?.user.name || "No Parent"}
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-auto p-0 hover:text-purple-600"
                    >
                      View Profile
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
                      <th className="px-6 py-4 text-left">Student</th>
                      <th className="px-6 py-4 text-left">ID</th>
                      <th className="px-6 py-4 text-left">Class</th>
                      <th className="px-6 py-4 text-left">Parent</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {filteredStudents.map((s) => (
                      <motion.tr
                        key={s.id}
                        variants={itemVariants}
                        className="group hover:bg-muted/40 transition-colors cursor-pointer"
                        onClick={() => openDetail(s)}
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={s.user.image} />
                              <AvatarFallback>
                                {getInitials(s.user.name)}
                              </AvatarFallback>
                            </Avatar>
                            <span className="font-medium">{s.user.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 font-mono text-xs">
                          {s.studentId}
                        </td>
                        <td className="px-6 py-4">
                          {s.currentClass?.name || "-"}
                        </td>
                        <td className="px-6 py-4">
                          {s.parent?.user.name || "-"}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button size="icon" variant="ghost">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => openDetail(s)}>
                                <Edit className="mr-2 h-4 w-4" /> Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleDelete(s.id, s.user.id)}
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
                <h2 className="text-xl font-bold">Add New Student</h2>
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
                      placeholder="Student Name"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label>Gender</Label>
                    <Select
                      value={formData.gender}
                      onValueChange={(v) =>
                        setFormData({ ...formData, gender: v })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="MALE">Male</SelectItem>
                        <SelectItem value="FEMALE">Female</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-1">
                  <Label>Email</Label>
                  <Input
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="student@example.com"
                  />
                </div>
                <div className="space-y-1">
                  <Label>Phone</Label>
                  <Input
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    placeholder="Optional"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <Label>Assign Class</Label>
                    <Select
                      value={formData.classId}
                      onValueChange={(v) =>
                        setFormData({ ...formData, classId: v })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Class" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">Unassigned</SelectItem>
                        {classes.map((c) => (
                          <SelectItem key={c.id} value={c.id}>
                            {c.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1">
                    <Label>Link Parent</Label>
                    <Select
                      value={formData.parentId}
                      onValueChange={(v) =>
                        setFormData({ ...formData, parentId: v })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Parent" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">None</SelectItem>
                        {parents.map((p) => (
                          <SelectItem key={p.id} value={p.id}>
                            {p.user.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <Label>Hifz Level</Label>
                    <Input
                      value={formData.hifzLevel}
                      onChange={(e) =>
                        setFormData({ ...formData, hifzLevel: e.target.value })
                      }
                      placeholder="Juz 1"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label>Goal</Label>
                    <Input
                      value={formData.memorizationGoal}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          memorizationGoal: e.target.value,
                        })
                      }
                      placeholder="Complete Quran"
                    />
                  </div>
                </div>
                <Button
                  className="w-full mt-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white"
                  onClick={handleCreateOrUpdate}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="animate-spin mr-2" />
                  ) : (
                    "Create Student"
                  )}
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- DETAIL MODAL (Enhanced with Tabs) --- */}
      <AnimatePresence>
        {isDetailOpen && selectedStudent && (
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
              <div className="h-40 bg-gradient-to-r from-blue-600 to-cyan-600 p-6 flex items-end relative shrink-0">
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
                    <AvatarImage src={selectedStudent.user.image} />
                    <AvatarFallback className="text-4xl bg-muted">
                      {getInitials(selectedStudent.user.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="mb-8 text-white">
                    <h2 className="text-3xl font-bold">
                      {selectedStudent.user.name}
                    </h2>
                    <p className="opacity-90 font-mono text-sm bg-black/20 px-2 py-1 rounded inline-block mt-1">
                      {selectedStudent.studentId}
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
                    {/* EDIT FORM (Simplified for brevity, matches structure) */}
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
                        <Label>Class</Label>
                        <Select
                          value={formData.classId}
                          onValueChange={(v) =>
                            setFormData({ ...formData, classId: v })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="none">Unassigned</SelectItem>
                            {classes.map((c) => (
                              <SelectItem key={c.id} value={c.id}>
                                {c.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-1">
                        <Label>Parent</Label>
                        <Select
                          value={formData.parentId}
                          onValueChange={(v) =>
                            setFormData({ ...formData, parentId: v })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="none">None</SelectItem>
                            {parents.map((p) => (
                              <SelectItem key={p.id} value={p.id}>
                                {p.user.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <Label>Hifz Level</Label>
                        <Input
                          value={formData.hifzLevel}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              hifzLevel: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="space-y-1">
                        <Label>Goal</Label>
                        <Input
                          value={formData.memorizationGoal}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              memorizationGoal: e.target.value,
                            })
                          }
                        />
                      </div>
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
                            selectedStudent.id,
                            selectedStudent.user.id
                          )
                        }
                      >
                        Delete Student
                      </Button>
                    </div>
                  </div>
                ) : (
                  <Tabs defaultValue="overview" className="w-full">
                    <TabsList className="mb-6">
                      <TabsTrigger value="overview">Overview</TabsTrigger>
                      <TabsTrigger value="quran">Quran Progress</TabsTrigger>
                      <TabsTrigger value="academic">Academic</TabsTrigger>
                      <TabsTrigger value="finance">Finance</TabsTrigger>
                    </TabsList>

                    {/* OVERVIEW TAB */}
                    <TabsContent value="overview">
                      <div className="grid gap-6 md:grid-cols-2">
                        <Card>
                          <CardContent className="p-6 space-y-4">
                            <h3 className="font-semibold flex items-center gap-2">
                              <UserCheck className="h-4 w-4 text-purple-600" />{" "}
                              Academic Info
                            </h3>
                            <div className="space-y-3 text-sm">
                              <div className="flex justify-between border-b pb-2">
                                <span className="text-muted-foreground">
                                  Class
                                </span>{" "}
                                <span className="font-medium">
                                  {selectedStudent.currentClass?.name ||
                                    "Unassigned"}
                                </span>
                              </div>
                              <div className="flex justify-between border-b pb-2">
                                <span className="text-muted-foreground">
                                  Code
                                </span>{" "}
                                <span className="font-mono text-xs bg-muted px-1 rounded">
                                  {selectedStudent.currentClass?.code || "-"}
                                </span>
                              </div>
                              <div className="flex justify-between border-b pb-2">
                                <span className="text-muted-foreground">
                                  Hifz Level
                                </span>{" "}
                                <span className="font-medium">
                                  {selectedStudent.hifzLevel || "Beginner"}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">
                                  Goal
                                </span>{" "}
                                <span className="font-medium">
                                  {selectedStudent.memorizationGoal || "-"}
                                </span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardContent className="p-6 space-y-4">
                            <h3 className="font-semibold flex items-center gap-2">
                              <Shield className="h-4 w-4 text-emerald-600" />{" "}
                              Personal & Parent
                            </h3>
                            <div className="space-y-3 text-sm">
                              <div className="flex justify-between items-center">
                                <span className="text-muted-foreground">
                                  Email
                                </span>{" "}
                                <span>{selectedStudent.user.email}</span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-muted-foreground">
                                  Phone
                                </span>{" "}
                                <span>
                                  {selectedStudent.user.phone || "N/A"}
                                </span>
                              </div>
                              <div className="mt-4 pt-4 border-t">
                                <p className="text-xs font-bold text-muted-foreground uppercase mb-2">
                                  Guardian
                                </p>
                                {selectedStudent.parent ? (
                                  <div className="flex items-center gap-3">
                                    <Avatar className="h-8 w-8">
                                      <AvatarFallback>
                                        {getInitials(
                                          selectedStudent.parent.user.name
                                        )}
                                      </AvatarFallback>
                                    </Avatar>
                                    <div>
                                      <p className="font-medium">
                                        {selectedStudent.parent.user.name}
                                      </p>
                                      <p className="text-xs text-muted-foreground">
                                        {selectedStudent.parent.user.phone}
                                      </p>
                                    </div>
                                  </div>
                                ) : (
                                  <p className="text-muted-foreground italic">
                                    No parent linked
                                  </p>
                                )}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </TabsContent>

                    {/* QURAN TAB (DYNAMIC FETCHED DATA) */}
                    <TabsContent value="quran">
                      <Card>
                        <CardContent className="p-6">
                          <h3 className="font-semibold mb-4 flex items-center gap-2">
                            <Book className="h-4 w-4 text-amber-500" /> Recent
                            Progress
                          </h3>
                          {isLoadingDetails ? (
                            <div className="py-8 flex justify-center">
                              <Loader2 className="animate-spin text-muted-foreground" />
                            </div>
                          ) : extendedData?.quranProgress?.length > 0 ? (
                            <div className="space-y-3">
                              {extendedData.quranProgress.map(
                                (p: any, i: number) => (
                                  <div
                                    key={i}
                                    className="flex justify-between items-center p-3 border rounded-lg bg-card"
                                  >
                                    <div>
                                      <p className="font-bold">{p.surahName}</p>
                                      <p className="text-xs text-muted-foreground">
                                        Ayah {p.fromAyah} - {p.toAyah}
                                      </p>
                                    </div>
                                    <Badge variant="secondary">
                                      {p.status}
                                    </Badge>
                                  </div>
                                )
                              )}
                            </div>
                          ) : (
                            <p className="text-muted-foreground text-center py-8">
                              No progress recorded yet.
                            </p>
                          )}
                        </CardContent>
                      </Card>
                    </TabsContent>

                    {/* ACADEMIC TAB (DYNAMIC FETCHED DATA) */}
                    <TabsContent value="academic">
                      <div className="grid gap-4">
                        <Card>
                          <CardContent className="p-6">
                            <h3 className="font-semibold mb-4 flex items-center gap-2">
                              <FileText className="h-4 w-4 text-blue-500" />{" "}
                              Recent Grades
                            </h3>
                            {isLoadingDetails ? (
                              <Loader2 className="animate-spin" />
                            ) : extendedData?.grades?.length > 0 ? (
                              <div className="space-y-2">
                                {extendedData.grades.map(
                                  (g: any, i: number) => (
                                    <div
                                      key={i}
                                      className="flex justify-between border-b pb-2 last:border-0"
                                    >
                                      <span className="text-sm">
                                        {g.subject.name}
                                      </span>
                                      <span className="font-bold">
                                        {g.score}%
                                      </span>
                                    </div>
                                  )
                                )}
                              </div>
                            ) : (
                              <p className="text-sm text-muted-foreground">
                                No recent grades.
                              </p>
                            )}
                          </CardContent>
                        </Card>
                        <Card>
                          <CardContent className="p-6">
                            <h3 className="font-semibold mb-4 flex items-center gap-2">
                              <CalendarCheck className="h-4 w-4 text-purple-500" />{" "}
                              Recent Attendance
                            </h3>
                            {isLoadingDetails ? (
                              <Loader2 className="animate-spin" />
                            ) : extendedData?.attendance?.length > 0 ? (
                              <div className="flex gap-2 flex-wrap">
                                {extendedData.attendance.map(
                                  (a: any, i: number) => (
                                    <div
                                      key={i}
                                      title={new Date(
                                        a.date
                                      ).toLocaleDateString()}
                                      className={`h-8 w-8 rounded flex items-center justify-center text-xs font-bold ${
                                        a.status === "PRESENT"
                                          ? "bg-green-100 text-green-700"
                                          : "bg-red-100 text-red-700"
                                      }`}
                                    >
                                      {new Date(a.date).getDate()}
                                    </div>
                                  )
                                )}
                              </div>
                            ) : (
                              <p className="text-sm text-muted-foreground">
                                No attendance records.
                              </p>
                            )}
                          </CardContent>
                        </Card>
                      </div>
                    </TabsContent>

                    {/* FINANCE TAB (DYNAMIC FETCHED DATA) */}
                    <TabsContent value="finance">
                      <Card>
                        <CardContent className="p-6">
                          <h3 className="font-semibold mb-4 flex items-center gap-2">
                            <Wallet className="h-4 w-4 text-green-600" />{" "}
                            Payment History
                          </h3>
                          {isLoadingDetails ? (
                            <Loader2 className="animate-spin" />
                          ) : extendedData?.payments?.length > 0 ? (
                            <div className="space-y-3">
                              {extendedData.payments.map(
                                (p: any, i: number) => (
                                  <div
                                    key={i}
                                    className="flex justify-between items-center p-3 bg-muted/30 rounded-lg"
                                  >
                                    <div className="flex items-center gap-3">
                                      <div className="h-8 w-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                                        <Clock className="h-4 w-4" />
                                      </div>
                                      <div>
                                        <p className="font-bold">${p.amount}</p>
                                        <p className="text-xs text-muted-foreground">
                                          {new Date(
                                            p.createdAt
                                          ).toLocaleDateString()}
                                        </p>
                                      </div>
                                    </div>
                                    <Badge
                                      variant="outline"
                                      className="text-green-600 border-green-200"
                                    >
                                      {p.status}
                                    </Badge>
                                  </div>
                                )
                              )}
                            </div>
                          ) : (
                            <p className="text-muted-foreground text-center py-8">
                              No payments found.
                            </p>
                          )}
                        </CardContent>
                      </Card>
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
























// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   Search,
//   Plus,
//   MoreVertical,
//   Edit,
//   Trash2,
//   GraduationCap,
//   Download,
//   LayoutGrid,
//   List as ListIcon,
//   Loader2,
//   X,
//   User,
//   UserCheck,
//   Shield,
//   Book,
//   FileText,
//   CalendarCheck,
//   Wallet,
//   Clock,
//   Mail,
//   Phone,
//   MapPin,
//   Ban,
//   CheckCircle,
// } from "lucide-react";
// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Badge } from "@/components/ui/badge";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Label } from "@/components/ui/label";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { toast } from "sonner";
// import { getInitials } from "@/lib/utils";
// import { Counter } from "@/components/admin/dashboard-ui";

// // --- ANIMATION ---
// const containerVariants = {
//   hidden: { opacity: 0 },
//   show: { opacity: 1, transition: { staggerChildren: 0.05 } },
// };
// const itemVariants = {
//   hidden: { y: 20, opacity: 0 },
//   show: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 50 } },
// };

// interface StudentsManagementClientProps {
//   initialStudents: any[];
//   classes: any[];
//   parents: any[];
//   stats: any;
//   pagination: any;
// }

// export default function StudentsManagementClient({
//   initialStudents,
//   classes,
//   parents,
//   stats,
//   pagination,
// }: StudentsManagementClientProps) {
//   const router = useRouter();
//   const [students, setStudents] = useState(initialStudents);
//   const [isLoading, setIsLoading] = useState(false);
//   const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

//   // Filters
//   const [searchQuery, setSearchQuery] = useState("");
//   const [filterClass, setFilterClass] = useState("ALL");

//   // Modals & Details
//   const [isAddModalOpen, setIsAddModalOpen] = useState(false);
//   const [selectedStudent, setSelectedStudent] = useState<any>(null);
//   const [isDetailOpen, setIsDetailOpen] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);

//   // Extended Data State (Fetched on click)
//   const [extendedData, setExtendedData] = useState<any>(null);
//   const [isLoadingDetails, setIsLoadingDetails] = useState(false);

//   // Form Data
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     gender: "MALE",
//     hifzLevel: "",
//     memorizationGoal: "",
//     classId: "none",
//     parentId: "none",
//   });

//   // Filter Logic
//   const filteredStudents = students.filter((s) => {
//     const term = searchQuery.toLowerCase();
//     const matchesSearch =
//       s.user.name.toLowerCase().includes(term) ||
//       s.user.email.toLowerCase().includes(term) ||
//       s.studentId.toLowerCase().includes(term);
//     const matchesClass =
//       filterClass === "ALL" || s.currentClassId === filterClass;
//     return matchesSearch && matchesClass;
//   });

//   // --- ACTIONS ---

//   // 1. Fetch Deep Details (Quran, Finance, etc.)
//   const fetchExtendedDetails = async (studentId: string) => {
//     setIsLoadingDetails(true);
//     setExtendedData(null);
//     try {
//       const res = await fetch(
//         `/api/admin/students/details?studentId=${studentId}`
//       );
//       if (res.ok) {
//         const data = await res.json();
//         setExtendedData(data);
//       }
//     } catch (error) {
//       console.error("Failed to load details");
//     } finally {
//       setIsLoadingDetails(false);
//     }
//   };

//   // 2. Create / Update Student
//   const handleCreateOrUpdate = async () => {
//     if (!formData.name || !formData.email)
//       return toast.error("Name and Email required");
//     setIsLoading(true);

//     try {
//       const res = await fetch("/api/admin/students/manage", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           action: isEditing ? "UPDATE" : "CREATE",
//           studentId: selectedStudent?.id,
//           userId: selectedStudent?.user.id,
//           data: formData,
//         }),
//       });

//       const result = await res.json();
//       if (!res.ok) throw new Error(result.error);

//       if (isEditing) {
//         const updatedStudent = {
//           ...selectedStudent,
//           ...result.studentProfile,
//           user: {
//             ...selectedStudent.user,
//             name: formData.name,
//             email: formData.email,
//             phone: formData.phone,
//           },
//         };
//         setStudents((prev) =>
//           prev.map((s) => (s.id === selectedStudent.id ? updatedStudent : s))
//         );
//         setSelectedStudent(updatedStudent);
//         toast.success("Profile updated");
//         setIsEditing(false);
//       } else {
//         setStudents([result.student, ...students]);
//         toast.success("Student created");
//         setIsAddModalOpen(false);
//         resetForm();
//       }
//     } catch (error: any) {
//       toast.error(error.message || "Failed");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // 3. Delete Student
//   const handleDelete = async (studentId: string, userId: string) => {
//     if (!confirm("Delete student? This removes user access.")) return;
//     setStudents((prev) => prev.filter((s) => s.id !== studentId));
//     setIsDetailOpen(false);
//     try {
//       await fetch("/api/admin/students/manage", {
//         method: "POST",
//         body: JSON.stringify({ action: "DELETE", studentId, userId }),
//       });
//       toast.success("Student deleted");
//     } catch {
//       toast.error("Delete failed");
//       router.refresh();
//     }
//   };

//   // 4. Suspend / Activate (Status Change)
//   const handleStatusChange = async (
//     studentId: string,
//     userId: string,
//     newStatus: string
//   ) => {
//     // Optimistic Update
//     setStudents((prev) =>
//       prev.map((s) =>
//         s.id === studentId
//           ? { ...s, user: { ...s.user, status: newStatus } }
//           : s
//       )
//     );

//     try {
//       // Reuse User Management API for status
//       const res = await fetch("/api/admin/users/manage", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           action: "UPDATE_STATUS",
//           userId: userId,
//           data: { status: newStatus },
//         }),
//       });

//       if (!res.ok) throw new Error("Status update failed");
//       toast.success(`Student marked as ${newStatus}`);
//     } catch (error) {
//       toast.error("Failed to update status");
//       router.refresh(); // Revert
//     }
//   };

//   // --- HELPERS ---
//   const resetForm = () => {
//     setFormData({
//       name: "",
//       email: "",
//       phone: "",
//       gender: "MALE",
//       hifzLevel: "",
//       memorizationGoal: "",
//       classId: "none",
//       parentId: "none",
//     });
//     setIsEditing(false);
//   };

//   const openAddModal = () => {
//     resetForm();
//     setIsAddModalOpen(true);
//   };

//   const openDetail = (s: any) => {
//     setSelectedStudent(s);
//     setFormData({
//       name: s.user.name,
//       email: s.user.email,
//       phone: s.user.phone || "",
//       gender: s.gender,
//       hifzLevel: s.hifzLevel || "",
//       memorizationGoal: s.memorizationGoal || "",
//       classId: s.currentClassId || "none",
//       parentId: s.parentId || "none",
//     });
//     setIsDetailOpen(true);
//     setIsEditing(false);
//     fetchExtendedDetails(s.id);
//   };

//   const statCards = [
//     {
//       label: "Total Students",
//       value: stats.totalStudents,
//       icon: GraduationCap,
//       color: "from-blue-500 to-cyan-500",
//       shadow: "shadow-blue-500/20",
//     },
//     {
//       label: "Boys",
//       value: stats.boys,
//       icon: User,
//       color: "from-indigo-500 to-violet-500",
//       shadow: "shadow-indigo-500/20",
//     },
//     {
//       label: "Girls",
//       value: stats.girls,
//       icon: User,
//       color: "from-pink-500 to-rose-500",
//       shadow: "shadow-pink-500/20",
//     },
//     {
//       label: "Suspended",
//       value: stats.suspended,
//       icon: UserCheck,
//       color: "from-amber-400 to-orange-500",
//       shadow: "shadow-amber-500/20",
//     },
//   ];

//   return (
//     <motion.div
//       variants={containerVariants}
//       initial="hidden"
//       animate="show"
//       className="space-y-8 pb-10"
//     >
//       {/* HEADER */}
//       <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
//         <div>
//           <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
//             Student Management
//           </h1>
//           <p className="text-muted-foreground mt-1">
//             Manage enrollments and academic profiles
//           </p>
//         </div>
//         <div className="flex gap-2">
//           <div className="flex items-center bg-muted p-1 rounded-lg border">
//             <Button
//               size="icon"
//               variant={viewMode === "grid" ? "white" : "ghost"}
//               className={`h-7 w-7 rounded-md ${
//                 viewMode === "grid" ? "shadow-sm" : ""
//               }`}
//               onClick={() => setViewMode("grid")}
//             >
//               <LayoutGrid className="h-4 w-4" />
//             </Button>
//             <Button
//               size="icon"
//               variant={viewMode === "list" ? "white" : "ghost"}
//               className={`h-7 w-7 rounded-md ${
//                 viewMode === "list" ? "shadow-sm" : ""
//               }`}
//               onClick={() => setViewMode("list")}
//             >
//               <ListIcon className="h-4 w-4" />
//             </Button>
//           </div>
//           <Button variant="outline">
//             <Download className="h-4 w-4 mr-2" /> Export
//           </Button>
//           <Button
//             className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md hover:scale-105 transition-all"
//             onClick={openAddModal}
//           >
//             <Plus className="h-4 w-4 mr-2" /> Add Student
//           </Button>
//         </div>
//       </div>

//       {/* STATS */}
//       <motion.div
//         variants={containerVariants}
//         className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
//       >
//         {statCards.map((stat) => (
//           <motion.div key={stat.label} variants={itemVariants}>
//             <Card className="border-none shadow-sm bg-white/50 backdrop-blur-sm dark:bg-slate-900/50 hover:shadow-md transition-all overflow-hidden relative">
//               <div
//                 className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${stat.color} opacity-10 rounded-bl-full`}
//               />
//               <CardContent className="p-6 relative z-10 flex items-center justify-between">
//                 <div>
//                   <p className="text-xs font-semibold text-muted-foreground uppercase">
//                     {stat.label}
//                   </p>
//                   <div className="text-2xl font-bold mt-2">
//                     <Counter value={stat.value} />
//                   </div>
//                 </div>
//                 <div
//                   className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} text-white ${stat.shadow} shadow-lg`}
//                 >
//                   <stat.icon className="h-6 w-6" />
//                 </div>
//               </CardContent>
//             </Card>
//           </motion.div>
//         ))}
//       </motion.div>

//       {/* FILTERS */}
//       <motion.div
//         variants={itemVariants}
//         className="flex flex-col sm:flex-row gap-4 bg-white/60 dark:bg-slate-900/60 backdrop-blur-md p-4 rounded-xl border shadow-sm"
//       >
//         <div className="relative flex-1">
//           <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//           <Input
//             placeholder="Search students..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="pl-9 bg-white dark:bg-slate-950"
//           />
//         </div>
//         <Select value={filterClass} onValueChange={setFilterClass}>
//           <SelectTrigger className="w-[180px] bg-white dark:bg-slate-950">
//             <SelectValue placeholder="Filter Class" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="ALL">All Classes</SelectItem>
//             {classes.map((c) => (
//               <SelectItem key={c.id} value={c.id}>
//                 {c.name}
//               </SelectItem>
//             ))}
//           </SelectContent>
//         </Select>
//       </motion.div>

//       {/* GRID VIEW */}
//       {viewMode === "grid" ? (
//         <motion.div
//           variants={containerVariants}
//           className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
//         >
//           {filteredStudents.map((s) => (
//             <motion.div
//               key={s.id}
//               variants={itemVariants}
//               layoutId={s.id}
//               className="cursor-pointer"
//             >
//               <Card
//                 className={`group h-full border transition-all hover:shadow-xl bg-card ${
//                   s.user.status === "SUSPENDED" ? "opacity-70 grayscale" : ""
//                 }`}
//               >
//                 <CardContent className="p-6 flex flex-col h-full items-center text-center">
//                   <div className="relative mb-4" onClick={() => openDetail(s)}>
//                     <Avatar className="h-24 w-24 border-4 border-white dark:border-slate-900 shadow-lg">
//                       <AvatarImage src={s.user.image} />
//                       <AvatarFallback className="text-2xl bg-gradient-to-br from-blue-50 to-blue-100 text-blue-600">
//                         {getInitials(s.user.name)}
//                       </AvatarFallback>
//                     </Avatar>
//                     <Badge className="absolute -bottom-3 left-1/2 -translate-x-1/2 shadow-sm whitespace-nowrap bg-white text-foreground hover:bg-white dark:bg-slate-800">
//                       {s.studentId}
//                     </Badge>
//                   </div>

//                   <h3 className="font-bold text-lg mt-2">{s.user.name}</h3>
//                   <div className="flex gap-2 mt-1">
//                     {s.currentClass ? (
//                       <Badge variant="secondary" className="text-xs">
//                         {s.currentClass.name}
//                       </Badge>
//                     ) : (
//                       <Badge
//                         variant="outline"
//                         className="text-xs text-muted-foreground"
//                       >
//                         Unassigned
//                       </Badge>
//                     )}
//                     <Badge
//                       variant="outline"
//                       className="text-xs border-purple-200 text-purple-700 bg-purple-50"
//                     >
//                       {s.gender}
//                     </Badge>
//                   </div>

//                   <div className="grid grid-cols-2 gap-2 w-full my-4">
//                     <div className="bg-muted/50 p-2 rounded-lg">
//                       <p className="text-xs text-muted-foreground">
//                         Hifz Level
//                       </p>
//                       <p className="font-bold text-sm">{s.hifzLevel || "-"}</p>
//                     </div>
//                     <div className="bg-muted/50 p-2 rounded-lg">
//                       <p className="text-xs text-muted-foreground">Goal</p>
//                       <p className="font-bold text-sm truncate">
//                         {s.memorizationGoal || "-"}
//                       </p>
//                     </div>
//                   </div>

//                   <div className="mt-auto w-full pt-4 border-t flex justify-between items-center text-xs text-muted-foreground">
//                     <div className="flex items-center gap-1">
//                       <User className="h-3 w-3" />{" "}
//                       {s.parent?.user.name || "No Parent"}
//                     </div>

//                     <DropdownMenu>
//                       <DropdownMenuTrigger asChild>
//                         <Button
//                           size="sm"
//                           variant="ghost"
//                           className="h-auto p-0 hover:text-purple-600"
//                         >
//                           Actions
//                         </Button>
//                       </DropdownMenuTrigger>
//                       <DropdownMenuContent align="end">
//                         <DropdownMenuItem onClick={() => openDetail(s)}>
//                           <Edit className="mr-2 h-4 w-4" /> View / Edit
//                         </DropdownMenuItem>
//                         {s.user.status === "APPROVED" ? (
//                           <DropdownMenuItem
//                             onClick={() =>
//                               handleStatusChange(s.id, s.user.id, "SUSPENDED")
//                             }
//                           >
//                             <Ban className="mr-2 h-4 w-4 text-amber-500" />{" "}
//                             Suspend
//                           </DropdownMenuItem>
//                         ) : (
//                           <DropdownMenuItem
//                             onClick={() =>
//                               handleStatusChange(s.id, s.user.id, "APPROVED")
//                             }
//                           >
//                             <CheckCircle className="mr-2 h-4 w-4 text-green-500" />{" "}
//                             Activate
//                           </DropdownMenuItem>
//                         )}
//                         <DropdownMenuItem
//                           onClick={() => handleDelete(s.id, s.user.id)}
//                           className="text-red-600"
//                         >
//                           <Trash2 className="mr-2 h-4 w-4" /> Delete
//                         </DropdownMenuItem>
//                       </DropdownMenuContent>
//                     </DropdownMenu>
//                   </div>
//                 </CardContent>
//               </Card>
//             </motion.div>
//           ))}
//         </motion.div>
//       ) : (
//         /* LIST VIEW */
//         <motion.div variants={containerVariants}>
//           <Card className="border-none shadow-sm overflow-hidden bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
//             <CardContent className="p-0">
//               <div className="overflow-x-auto">
//                 <table className="w-full text-sm">
//                   <thead className="bg-muted/30 border-b">
//                     <tr>
//                       <th className="px-6 py-4 text-left">Student</th>
//                       <th className="px-6 py-4 text-left">ID</th>
//                       <th className="px-6 py-4 text-left">Class</th>
//                       <th className="px-6 py-4 text-left">Parent</th>
//                       <th className="px-6 py-4 text-center">Status</th>
//                       <th className="px-6 py-4 text-right">Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody className="divide-y">
//                     {filteredStudents.map((s) => (
//                       <motion.tr
//                         key={s.id}
//                         variants={itemVariants}
//                         className="group hover:bg-muted/40 transition-colors"
//                       >
//                         <td className="px-6 py-4">
//                           <div className="flex items-center gap-3">
//                             <Avatar className="h-8 w-8">
//                               <AvatarImage src={s.user.image} />
//                               <AvatarFallback>
//                                 {getInitials(s.user.name)}
//                               </AvatarFallback>
//                             </Avatar>
//                             <span className="font-medium">{s.user.name}</span>
//                           </div>
//                         </td>
//                         <td className="px-6 py-4 font-mono text-xs">
//                           {s.studentId}
//                         </td>
//                         <td className="px-6 py-4">
//                           {s.currentClass?.name || "-"}
//                         </td>
//                         <td className="px-6 py-4">
//                           {s.parent?.user.name || "-"}
//                         </td>
//                         <td className="px-6 py-4 text-center">
//                           {s.user.status === "APPROVED" ? (
//                             <Badge
//                               variant="outline"
//                               className="text-green-600 bg-green-50 border-green-200"
//                             >
//                               Active
//                             </Badge>
//                           ) : (
//                             <Badge variant="destructive">Suspended</Badge>
//                           )}
//                         </td>
//                         <td className="px-6 py-4 text-right">
//                           <DropdownMenu>
//                             <DropdownMenuTrigger asChild>
//                               <Button size="icon" variant="ghost">
//                                 <MoreVertical className="h-4 w-4" />
//                               </Button>
//                             </DropdownMenuTrigger>
//                             <DropdownMenuContent align="end">
//                               <DropdownMenuItem onClick={() => openDetail(s)}>
//                                 <Edit className="mr-2 h-4 w-4" /> Edit
//                               </DropdownMenuItem>
//                               {s.user.status === "APPROVED" ? (
//                                 <DropdownMenuItem
//                                   onClick={() =>
//                                     handleStatusChange(
//                                       s.id,
//                                       s.user.id,
//                                       "SUSPENDED"
//                                     )
//                                   }
//                                 >
//                                   <Ban className="mr-2 h-4 w-4 text-amber-500" />{" "}
//                                   Suspend
//                                 </DropdownMenuItem>
//                               ) : (
//                                 <DropdownMenuItem
//                                   onClick={() =>
//                                     handleStatusChange(
//                                       s.id,
//                                       s.user.id,
//                                       "APPROVED"
//                                     )
//                                   }
//                                 >
//                                   <CheckCircle className="mr-2 h-4 w-4 text-green-500" />{" "}
//                                   Activate
//                                 </DropdownMenuItem>
//                               )}
//                               <DropdownMenuItem
//                                 onClick={() => handleDelete(s.id, s.user.id)}
//                                 className="text-red-600"
//                               >
//                                 <Trash2 className="mr-2 h-4 w-4" /> Delete
//                               </DropdownMenuItem>
//                             </DropdownMenuContent>
//                           </DropdownMenu>
//                         </td>
//                       </motion.tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </CardContent>
//           </Card>
//         </motion.div>
//       )}

//       {/* --- ADD MODAL --- */}
//       <AnimatePresence>
//         {isAddModalOpen && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
//           >
//             <motion.div
//               initial={{ scale: 0.95 }}
//               animate={{ scale: 1 }}
//               exit={{ scale: 0.95 }}
//               className="bg-background w-full max-w-lg rounded-2xl shadow-2xl border p-6 max-h-[90vh] overflow-y-auto"
//             >
//               <div className="flex justify-between items-center mb-6">
//                 <h2 className="text-xl font-bold">Add New Student</h2>
//                 <Button
//                   size="icon"
//                   variant="ghost"
//                   onClick={() => setIsAddModalOpen(false)}
//                 >
//                   <X className="h-5 w-5" />
//                 </Button>
//               </div>
//               <div className="grid gap-4">
//                 <div className="grid grid-cols-2 gap-4">
//                   <div className="space-y-1">
//                     <Label>Full Name</Label>
//                     <Input
//                       value={formData.name}
//                       onChange={(e) =>
//                         setFormData({ ...formData, name: e.target.value })
//                       }
//                       placeholder="Student Name"
//                     />
//                   </div>
//                   <div className="space-y-1">
//                     <Label>Gender</Label>
//                     <Select
//                       value={formData.gender}
//                       onValueChange={(v) =>
//                         setFormData({ ...formData, gender: v })
//                       }
//                     >
//                       <SelectTrigger>
//                         <SelectValue />
//                       </SelectTrigger>
//                       <SelectContent>
//                         <SelectItem value="MALE">Male</SelectItem>
//                         <SelectItem value="FEMALE">Female</SelectItem>
//                       </SelectContent>
//                     </Select>
//                   </div>
//                 </div>
//                 <div className="space-y-1">
//                   <Label>Email</Label>
//                   <Input
//                     value={formData.email}
//                     onChange={(e) =>
//                       setFormData({ ...formData, email: e.target.value })
//                     }
//                     placeholder="student@example.com"
//                   />
//                 </div>
//                 <div className="space-y-1">
//                   <Label>Phone</Label>
//                   <Input
//                     value={formData.phone}
//                     onChange={(e) =>
//                       setFormData({ ...formData, phone: e.target.value })
//                     }
//                     placeholder="Optional"
//                   />
//                 </div>
//                 <div className="grid grid-cols-2 gap-4">
//                   <div className="space-y-1">
//                     <Label>Assign Class</Label>
//                     <Select
//                       value={formData.classId}
//                       onValueChange={(v) =>
//                         setFormData({ ...formData, classId: v })
//                       }
//                     >
//                       <SelectTrigger>
//                         <SelectValue placeholder="Select Class" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         <SelectItem value="none">Unassigned</SelectItem>
//                         {classes.map((c) => (
//                           <SelectItem key={c.id} value={c.id}>
//                             {c.name}
//                           </SelectItem>
//                         ))}
//                       </SelectContent>
//                     </Select>
//                   </div>
//                   <div className="space-y-1">
//                     <Label>Link Parent</Label>
//                     <Select
//                       value={formData.parentId}
//                       onValueChange={(v) =>
//                         setFormData({ ...formData, parentId: v })
//                       }
//                     >
//                       <SelectTrigger>
//                         <SelectValue placeholder="Select Parent" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         <SelectItem value="none">None</SelectItem>
//                         {parents.map((p) => (
//                           <SelectItem key={p.id} value={p.id}>
//                             {p.user.name}
//                           </SelectItem>
//                         ))}
//                       </SelectContent>
//                     </Select>
//                   </div>
//                 </div>
//                 <div className="grid grid-cols-2 gap-4">
//                   <div className="space-y-1">
//                     <Label>Hifz Level</Label>
//                     <Input
//                       value={formData.hifzLevel}
//                       onChange={(e) =>
//                         setFormData({ ...formData, hifzLevel: e.target.value })
//                       }
//                       placeholder="Juz 1"
//                     />
//                   </div>
//                   <div className="space-y-1">
//                     <Label>Goal</Label>
//                     <Input
//                       value={formData.memorizationGoal}
//                       onChange={(e) =>
//                         setFormData({
//                           ...formData,
//                           memorizationGoal: e.target.value,
//                         })
//                       }
//                       placeholder="Complete Quran"
//                     />
//                   </div>
//                 </div>
//                 <Button
//                   className="w-full mt-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white"
//                   onClick={handleCreateOrUpdate}
//                   disabled={isLoading}
//                 >
//                   {isLoading ? (
//                     <Loader2 className="animate-spin mr-2" />
//                   ) : (
//                     "Create Student"
//                   )}
//                 </Button>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* --- DETAIL MODAL (Enhanced with Tabs) --- */}
//       <AnimatePresence>
//         {isDetailOpen && selectedStudent && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
//             onClick={() => setIsDetailOpen(false)}
//           >
//             <motion.div
//               initial={{ scale: 0.95 }}
//               animate={{ scale: 1 }}
//               exit={{ scale: 0.95 }}
//               onClick={(e) => e.stopPropagation()}
//               className="bg-background w-full max-w-4xl h-[85vh] rounded-2xl shadow-2xl border overflow-hidden flex flex-col"
//             >
//               {/* Profile Header */}
//               <div className="h-40 bg-gradient-to-r from-blue-600 to-cyan-600 p-6 flex items-end relative shrink-0">
//                 <Button
//                   size="icon"
//                   variant="ghost"
//                   className="absolute top-4 right-4 text-white hover:bg-white/20"
//                   onClick={() => setIsDetailOpen(false)}
//                 >
//                   <X className="h-6 w-6" />
//                 </Button>
//                 <div className="flex items-end gap-6 relative top-8 w-full">
//                   <Avatar className="h-32 w-32 border-4 border-background shadow-xl">
//                     <AvatarImage src={selectedStudent.user.image} />
//                     <AvatarFallback className="text-4xl bg-muted">
//                       {getInitials(selectedStudent.user.name)}
//                     </AvatarFallback>
//                   </Avatar>
//                   <div className="mb-8 text-white">
//                     <h2 className="text-3xl font-bold">
//                       {selectedStudent.user.name}
//                     </h2>
//                     <p className="opacity-90 font-mono text-sm bg-black/20 px-2 py-1 rounded inline-block mt-1">
//                       {selectedStudent.studentId}
//                     </p>
//                   </div>
//                   <div className="ml-auto mb-8 flex gap-2">
//                     <Button
//                       variant="secondary"
//                       onClick={() => setIsEditing(!isEditing)}
//                     >
//                       {isEditing ? "View Mode" : "Edit Profile"}
//                     </Button>
//                   </div>
//                 </div>
//               </div>

//               {/* Content */}
//               <div className="flex-1 overflow-y-auto bg-muted/10 p-6 pt-12">
//                 {isEditing ? (
//                   <div className="max-w-2xl mx-auto space-y-4">
//                     {/* EDIT FORM (Simplified for brevity, matches structure) */}
//                     <div className="grid grid-cols-2 gap-4">
//                       <div className="space-y-1">
//                         <Label>Name</Label>
//                         <Input
//                           value={formData.name}
//                           onChange={(e) =>
//                             setFormData({ ...formData, name: e.target.value })
//                           }
//                         />
//                       </div>
//                       <div className="space-y-1">
//                         <Label>Email</Label>
//                         <Input
//                           value={formData.email}
//                           onChange={(e) =>
//                             setFormData({ ...formData, email: e.target.value })
//                           }
//                         />
//                       </div>
//                     </div>
//                     <div className="space-y-1">
//                       <Label>Phone</Label>
//                       <Input
//                         value={formData.phone}
//                         onChange={(e) =>
//                           setFormData({ ...formData, phone: e.target.value })
//                         }
//                       />
//                     </div>
//                     <div className="grid grid-cols-2 gap-4">
//                       <div className="space-y-1">
//                         <Label>Class</Label>
//                         <Select
//                           value={formData.classId}
//                           onValueChange={(v) =>
//                             setFormData({ ...formData, classId: v })
//                           }
//                         >
//                           <SelectTrigger>
//                             <SelectValue />
//                           </SelectTrigger>
//                           <SelectContent>
//                             <SelectItem value="none">Unassigned</SelectItem>
//                             {classes.map((c) => (
//                               <SelectItem key={c.id} value={c.id}>
//                                 {c.name}
//                               </SelectItem>
//                             ))}
//                           </SelectContent>
//                         </Select>
//                       </div>
//                       <div className="space-y-1">
//                         <Label>Parent</Label>
//                         <Select
//                           value={formData.parentId}
//                           onValueChange={(v) =>
//                             setFormData({ ...formData, parentId: v })
//                           }
//                         >
//                           <SelectTrigger>
//                             <SelectValue />
//                           </SelectTrigger>
//                           <SelectContent>
//                             <SelectItem value="none">None</SelectItem>
//                             {parents.map((p) => (
//                               <SelectItem key={p.id} value={p.id}>
//                                 {p.user.name}
//                               </SelectItem>
//                             ))}
//                           </SelectContent>
//                         </Select>
//                       </div>
//                     </div>
//                     <div className="grid grid-cols-2 gap-4">
//                       <div className="space-y-1">
//                         <Label>Hifz Level</Label>
//                         <Input
//                           value={formData.hifzLevel}
//                           onChange={(e) =>
//                             setFormData({
//                               ...formData,
//                               hifzLevel: e.target.value,
//                             })
//                           }
//                         />
//                       </div>
//                       <div className="space-y-1">
//                         <Label>Goal</Label>
//                         <Input
//                           value={formData.memorizationGoal}
//                           onChange={(e) =>
//                             setFormData({
//                               ...formData,
//                               memorizationGoal: e.target.value,
//                             })
//                           }
//                         />
//                       </div>
//                     </div>
//                     <Button
//                       className="w-full bg-green-600 hover:bg-green-700"
//                       onClick={handleCreateOrUpdate}
//                       disabled={isLoading}
//                     >
//                       {isLoading ? (
//                         <Loader2 className="animate-spin" />
//                       ) : (
//                         "Save Changes"
//                       )}
//                     </Button>
//                     <div className="pt-4 border-t mt-4 flex justify-between items-center text-sm text-muted-foreground">
//                       <span>Danger Zone</span>
//                       <Button
//                         variant="destructive"
//                         size="sm"
//                         onClick={() =>
//                           handleDelete(
//                             selectedStudent.id,
//                             selectedStudent.user.id
//                           )
//                         }
//                       >
//                         Delete Student
//                       </Button>
//                     </div>
//                   </div>
//                 ) : (
//                   <Tabs defaultValue="overview" className="w-full">
//                     <TabsList className="mb-6">
//                       <TabsTrigger value="overview">Overview</TabsTrigger>
//                       <TabsTrigger value="quran">Quran Progress</TabsTrigger>
//                       <TabsTrigger value="academic">Academic</TabsTrigger>
//                       <TabsTrigger value="finance">Finance</TabsTrigger>
//                     </TabsList>

//                     {/* OVERVIEW TAB */}
//                     <TabsContent value="overview">
//                       <div className="grid gap-6 md:grid-cols-2">
//                         <Card>
//                           <CardContent className="p-6 space-y-4">
//                             <h3 className="font-semibold flex items-center gap-2">
//                               <UserCheck className="h-4 w-4 text-purple-600" />{" "}
//                               Academic Info
//                             </h3>
//                             <div className="space-y-3 text-sm">
//                               <div className="flex justify-between border-b pb-2">
//                                 <span className="text-muted-foreground">
//                                   Class
//                                 </span>{" "}
//                                 <span className="font-medium">
//                                   {selectedStudent.currentClass?.name ||
//                                     "Unassigned"}
//                                 </span>
//                               </div>
//                               <div className="flex justify-between border-b pb-2">
//                                 <span className="text-muted-foreground">
//                                   Code
//                                 </span>{" "}
//                                 <span className="font-mono text-xs bg-muted px-1 rounded">
//                                   {selectedStudent.currentClass?.code || "-"}
//                                 </span>
//                               </div>
//                               <div className="flex justify-between border-b pb-2">
//                                 <span className="text-muted-foreground">
//                                   Hifz Level
//                                 </span>{" "}
//                                 <span className="font-medium">
//                                   {selectedStudent.hifzLevel || "Beginner"}
//                                 </span>
//                               </div>
//                               <div className="flex justify-between">
//                                 <span className="text-muted-foreground">
//                                   Goal
//                                 </span>{" "}
//                                 <span className="font-medium">
//                                   {selectedStudent.memorizationGoal || "-"}
//                                 </span>
//                               </div>
//                             </div>
//                           </CardContent>
//                         </Card>
//                         <Card>
//                           <CardContent className="p-6 space-y-4">
//                             <h3 className="font-semibold flex items-center gap-2">
//                               <Shield className="h-4 w-4 text-emerald-600" />{" "}
//                               Personal & Parent
//                             </h3>
//                             <div className="space-y-3 text-sm">
//                               <div className="flex justify-between items-center">
//                                 <span className="text-muted-foreground">
//                                   Email
//                                 </span>{" "}
//                                 <span>{selectedStudent.user.email}</span>
//                               </div>
//                               <div className="flex justify-between items-center">
//                                 <span className="text-muted-foreground">
//                                   Phone
//                                 </span>{" "}
//                                 <span>
//                                   {selectedStudent.user.phone || "N/A"}
//                                 </span>
//                               </div>
//                               <div className="mt-4 pt-4 border-t">
//                                 <p className="text-xs font-bold text-muted-foreground uppercase mb-2">
//                                   Guardian
//                                 </p>
//                                 {selectedStudent.parent ? (
//                                   <div className="flex items-center gap-3">
//                                     <Avatar className="h-8 w-8">
//                                       <AvatarFallback>
//                                         {getInitials(
//                                           selectedStudent.parent.user.name
//                                         )}
//                                       </AvatarFallback>
//                                     </Avatar>
//                                     <div>
//                                       <p className="font-medium">
//                                         {selectedStudent.parent.user.name}
//                                       </p>
//                                       <p className="text-xs text-muted-foreground">
//                                         {selectedStudent.parent.user.phone}
//                                       </p>
//                                     </div>
//                                   </div>
//                                 ) : (
//                                   <p className="text-muted-foreground italic">
//                                     No parent linked
//                                   </p>
//                                 )}
//                               </div>
//                             </div>
//                           </CardContent>
//                         </Card>
//                       </div>
//                     </TabsContent>

//                     {/* QURAN TAB (DYNAMIC FETCHED DATA) */}
//                     <TabsContent value="quran">
//                       <Card>
//                         <CardContent className="p-6">
//                           <h3 className="font-semibold mb-4 flex items-center gap-2">
//                             <Book className="h-4 w-4 text-amber-500" /> Recent
//                             Progress
//                           </h3>
//                           {isLoadingDetails ? (
//                             <div className="py-8 flex justify-center">
//                               <Loader2 className="animate-spin text-muted-foreground" />
//                             </div>
//                           ) : extendedData?.quranProgress?.length > 0 ? (
//                             <div className="space-y-3">
//                               {extendedData.quranProgress.map(
//                                 (p: any, i: number) => (
//                                   <div
//                                     key={i}
//                                     className="flex justify-between items-center p-3 border rounded-lg bg-card"
//                                   >
//                                     <div>
//                                       <p className="font-bold">{p.surahName}</p>
//                                       <p className="text-xs text-muted-foreground">
//                                         Ayah {p.fromAyah} - {p.toAyah}
//                                       </p>
//                                     </div>
//                                     <Badge variant="secondary">
//                                       {p.status}
//                                     </Badge>
//                                   </div>
//                                 )
//                               )}
//                             </div>
//                           ) : (
//                             <p className="text-muted-foreground text-center py-8">
//                               No progress recorded yet.
//                             </p>
//                           )}
//                         </CardContent>
//                       </Card>
//                     </TabsContent>

//                     {/* ACADEMIC TAB (DYNAMIC FETCHED DATA) */}
//                     <TabsContent value="academic">
//                       <div className="grid gap-4">
//                         <Card>
//                           <CardContent className="p-6">
//                             <h3 className="font-semibold mb-4 flex items-center gap-2">
//                               <FileText className="h-4 w-4 text-blue-500" />{" "}
//                               Recent Grades
//                             </h3>
//                             {isLoadingDetails ? (
//                               <Loader2 className="animate-spin" />
//                             ) : extendedData?.grades?.length > 0 ? (
//                               <div className="space-y-2">
//                                 {extendedData.grades.map(
//                                   (g: any, i: number) => (
//                                     <div
//                                       key={i}
//                                       className="flex justify-between border-b pb-2 last:border-0"
//                                     >
//                                       <span className="text-sm">
//                                         {g.subject.name}
//                                       </span>
//                                       <span className="font-bold">
//                                         {g.score}%
//                                       </span>
//                                     </div>
//                                   )
//                                 )}
//                               </div>
//                             ) : (
//                               <p className="text-sm text-muted-foreground">
//                                 No recent grades.
//                               </p>
//                             )}
//                           </CardContent>
//                         </Card>
//                         <Card>
//                           <CardContent className="p-6">
//                             <h3 className="font-semibold mb-4 flex items-center gap-2">
//                               <CalendarCheck className="h-4 w-4 text-purple-500" />{" "}
//                               Recent Attendance
//                             </h3>
//                             {isLoadingDetails ? (
//                               <Loader2 className="animate-spin" />
//                             ) : extendedData?.attendance?.length > 0 ? (
//                               <div className="flex gap-2 flex-wrap">
//                                 {extendedData.attendance.map(
//                                   (a: any, i: number) => (
//                                     <div
//                                       key={i}
//                                       title={new Date(
//                                         a.date
//                                       ).toLocaleDateString()}
//                                       className={`h-8 w-8 rounded flex items-center justify-center text-xs font-bold ${
//                                         a.status === "PRESENT"
//                                           ? "bg-green-100 text-green-700"
//                                           : "bg-red-100 text-red-700"
//                                       }`}
//                                     >
//                                       {new Date(a.date).getDate()}
//                                     </div>
//                                   )
//                                 )}
//                               </div>
//                             ) : (
//                               <p className="text-sm text-muted-foreground">
//                                 No attendance records.
//                               </p>
//                             )}
//                           </CardContent>
//                         </Card>
//                       </div>
//                     </TabsContent>

//                     {/* FINANCE TAB (DYNAMIC FETCHED DATA) */}
//                     <TabsContent value="finance">
//                       <Card>
//                         <CardContent className="p-6">
//                           <h3 className="font-semibold mb-4 flex items-center gap-2">
//                             <Wallet className="h-4 w-4 text-green-600" />{" "}
//                             Payment History
//                           </h3>
//                           {isLoadingDetails ? (
//                             <Loader2 className="animate-spin" />
//                           ) : extendedData?.payments?.length > 0 ? (
//                             <div className="space-y-3">
//                               {extendedData.payments.map(
//                                 (p: any, i: number) => (
//                                   <div
//                                     key={i}
//                                     className="flex justify-between items-center p-3 bg-muted/30 rounded-lg"
//                                   >
//                                     <div className="flex items-center gap-3">
//                                       <div className="h-8 w-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
//                                         <Clock className="h-4 w-4" />
//                                       </div>
//                                       <div>
//                                         <p className="font-bold">${p.amount}</p>
//                                         <p className="text-xs text-muted-foreground">
//                                           {new Date(
//                                             p.createdAt
//                                           ).toLocaleDateString()}
//                                         </p>
//                                       </div>
//                                     </div>
//                                     <Badge
//                                       variant="outline"
//                                       className="text-green-600 border-green-200"
//                                     >
//                                       {p.status}
//                                     </Badge>
//                                   </div>
//                                 )
//                               )}
//                             </div>
//                           ) : (
//                             <p className="text-muted-foreground text-center py-8">
//                               No payments found.
//                             </p>
//                           )}
//                         </CardContent>
//                       </Card>
//                     </TabsContent>
//                   </Tabs>
//                 )}
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </motion.div>
//   );
// }
