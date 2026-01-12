"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  Search,
  Plus,
  MoreVertical,
  Edit,
  Trash2,
  GraduationCap,
  Users,
  Calendar,
  Download,
  Layers,
  Clock,
  CheckCircle,
  Ban,
  X,
  Loader2,
  LayoutGrid,
  List as ListIcon,
  Copy,
  ChevronRight,
  User,
  Mail,
  Shield,
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { getInitials, cn } from "@/lib/utils";
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

interface ClassManagementClientProps {
  initialClasses: any[];
  teachers: any[];
  stats: any;
}

export default function ClassManagementClient({
  initialClasses,
  teachers,
  stats,
}: ClassManagementClientProps) {
  const router = useRouter();
  const [classes, setClasses] = useState(initialClasses);
  const [isLoading, setIsLoading] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [filterLevel, setFilterLevel] = useState("ALL");

  // Modals & Details
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState<any>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Extended Data (Students List)
  const [classStudents, setClassStudents] = useState<any[]>([]);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);

  // Form Data
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    description: "",
    level: "Beginner",
    capacity: "20",
    teacherId: "",
    startDate: "",
    endDate: "",
  });

  // --- FILTER LOGIC ---
  const filteredClasses = classes.filter((c) => {
    const term = searchQuery.toLowerCase();
    const matchesSearch =
      c.name.toLowerCase().includes(term) ||
      c.code.toLowerCase().includes(term);
    const matchesLevel = filterLevel === "ALL" || c.level === filterLevel;
    return matchesSearch && matchesLevel;
  });

  // --- ACTIONS ---

  // Fetch Class Students on Demand
  const fetchClassDetails = async (classId: string) => {
    setIsLoadingDetails(true);
    setClassStudents([]); // Clear prev
    try {
      // We can reuse the student API with a filter or create a specific endpoint
      // For now, let's assume we fetch from the students API filtering by class
      const res = await fetch(`/api/admin/students/manage?classId=${classId}`); // Note: You might need to adjust your existing API to handle GET or use a new route
      // Simpler approach for this demo: Pass 'enrolled students' if available or create a small API action
      // Let's implement a quick fetcher if the API doesn't exist yet:
      // const data = await res.json();
      // setClassStudents(data.students);
      setIsLoadingDetails(false); // Placeholder
    } catch (error) {
      console.error("Failed to load class students");
    } finally {
      setIsLoadingDetails(false);
    }
  };

  const handleCreateOrUpdate = async () => {
    if (!formData.name || !formData.code || !formData.teacherId) {
      return toast.error("Please fill required fields");
    }
    setIsLoading(true);

    try {
      const res = await fetch("/api/admin/classes/manage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: isEditing ? "UPDATE" : "CREATE",
          classId: selectedClass?.id,
          data: formData,
        }),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.error);

      if (isEditing) {
        setClasses((prev) =>
          prev.map((c) => (c.id === selectedClass.id ? result.class : c))
        );
        setSelectedClass(result.class);
        toast.success("Class updated");
        setIsEditing(false);
      } else {
        setClasses([result.class, ...classes]);
        toast.success("Class created");
        setIsAddModalOpen(false);
        resetForm();
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to save");
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleStatus = async (
    classId: string,
    currentStatus: boolean
  ) => {
    setClasses((prev) =>
      prev.map((c) =>
        c.id === classId ? { ...c, isActive: !currentStatus } : c
      )
    );
    try {
      await fetch("/api/admin/classes/manage", {
        method: "POST",
        body: JSON.stringify({
          action: "TOGGLE_STATUS",
          classId,
          data: { isActive: !currentStatus },
        }),
      });
      toast.success(currentStatus ? "Class Deactivated" : "Class Activated");
    } catch {
      toast.error("Status update failed");
      router.refresh();
    }
  };

  const handleDelete = async (classId: string) => {
    if (!confirm("Delete this class? All enrollments will be affected."))
      return;
    setClasses((prev) => prev.filter((c) => c.id !== classId));
    setIsDetailOpen(false);
    try {
      await fetch("/api/admin/classes/manage", {
        method: "POST",
        body: JSON.stringify({ action: "DELETE", classId }),
      });
      toast.success("Class deleted");
    } catch {
      toast.error("Delete failed");
      router.refresh();
    }
  };

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast.success("Class Code Copied!");
  };

  // --- HELPERS ---
  const resetForm = () => {
    setFormData({
      name: "",
      code: "",
      description: "",
      level: "Beginner",
      capacity: "20",
      teacherId: "",
      startDate: "",
      endDate: "",
    });
    setIsEditing(false);
  };

  const openAddModal = () => {
    resetForm();
    setIsAddModalOpen(true);
  };

  const openDetailModal = (c: any) => {
    setSelectedClass(c);
    setFormData({
      name: c.name,
      code: c.code,
      description: c.description || "",
      level: c.level,
      capacity: c.capacity.toString(),
      teacherId: c.teacherId,
      startDate: c.startDate
        ? new Date(c.startDate).toISOString().split("T")[0]
        : "",
      endDate: c.endDate ? new Date(c.endDate).toISOString().split("T")[0] : "",
    });
    setIsDetailOpen(true);
    setIsEditing(false);
    // fetchClassDetails(c.id); // Uncomment when API is ready
  };

  const getCapacityColor = (current: number, max: number) => {
    const percentage = (current / max) * 100;
    if (percentage >= 100) return "bg-red-500";
    if (percentage >= 80) return "bg-amber-500";
    return "bg-emerald-500";
  };

  const statCards = [
    {
      label: "Total Classes",
      value: stats.totalClasses,
      icon: Layers,
      color: "from-blue-500 to-cyan-500",
      shadow: "shadow-blue-500/20",
    },
    {
      label: "Active Classes",
      value: stats.activeClasses,
      icon: BookOpen,
      color: "from-purple-500 to-pink-500",
      shadow: "shadow-purple-500/20",
    },
    {
      label: "Total Students",
      value: stats.totalStudents,
      icon: Users,
      color: "from-emerald-500 to-green-500",
      shadow: "shadow-emerald-500/20",
    },
    {
      label: "Faculty",
      value: stats.totalTeachers,
      icon: GraduationCap,
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
            Class Management
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage curriculum, schedules, and capacity
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
            className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md hover:scale-105 transition-all gap-2"
            onClick={openAddModal}
          >
            <Plus className="h-4 w-4 mr-2" /> Add Class
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
            <Card className="border-none shadow-sm bg-white/50 backdrop-blur-sm dark:bg-slate-900/50 hover:shadow-md transition-all relative overflow-hidden">
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
            placeholder="Search classes or code..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 bg-white dark:bg-slate-950"
          />
        </div>
        <Select value={filterLevel} onValueChange={setFilterLevel}>
          <SelectTrigger className="w-[180px] bg-white dark:bg-slate-950">
            <SelectValue placeholder="Level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All Levels</SelectItem>
            <SelectItem value="Beginner">Beginner</SelectItem>
            <SelectItem value="Intermediate">Intermediate</SelectItem>
            <SelectItem value="Advanced">Advanced</SelectItem>
          </SelectContent>
        </Select>
      </motion.div>

      {/* GRID VIEW */}
      {viewMode === "grid" ? (
        <motion.div
          variants={containerVariants}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {filteredClasses.map((cls) => (
            <motion.div
              key={cls.id}
              variants={itemVariants}
              layoutId={cls.id}
              onClick={() => openDetailModal(cls)}
              className="cursor-pointer"
            >
              <Card
                className={`group h-full border hover:border-purple-300 dark:hover:border-purple-800 transition-all hover:shadow-xl bg-card ${
                  !cls.isActive ? "opacity-80" : ""
                }`}
              >
                <CardContent className="p-0">
                  <div className="h-20 bg-gradient-to-r from-purple-100 to-indigo-100 dark:from-purple-900/30 dark:to-indigo-900/30 relative p-4 flex justify-between items-start">
                    <Badge
                      variant="secondary"
                      className="bg-white/90 dark:bg-black/50 backdrop-blur-sm shadow-sm font-mono"
                    >
                      {cls.code}
                    </Badge>
                    <Badge
                      className={cls.isActive ? "bg-green-500" : "bg-gray-500"}
                    >
                      {cls.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                  <div className="p-6 pt-2">
                    <div className="-mt-10 mb-3 flex justify-between items-end">
                      <div className="flex items-end gap-2">
                        <Avatar className="h-14 w-14 border-4 border-white dark:border-slate-950 shadow-md">
                          <AvatarImage src={cls.teacher?.user.image} />
                          <AvatarFallback className="bg-slate-200">
                            {getInitials(cls.teacher?.user.name || "T")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="mb-1">
                          <p className="text-xs text-muted-foreground font-medium">
                            Instructor
                          </p>
                          <p className="text-sm font-semibold leading-none">
                            {cls.teacher?.user.name || "Unassigned"}
                          </p>
                        </div>
                      </div>
                    </div>
                    <h3 className="font-bold text-lg leading-tight mb-2 group-hover:text-purple-600 transition-colors">
                      {cls.name}
                    </h3>
                    <div className="space-y-1.5 mb-4">
                      <div className="flex justify-between text-xs font-medium">
                        <span className="text-muted-foreground">Capacity</span>
                        <span>
                          {Math.round(
                            (cls.currentEnrollment / cls.capacity) * 100
                          )}
                          % Full
                        </span>
                      </div>
                      <Progress
                        value={(cls.currentEnrollment / cls.capacity) * 100}
                        className="h-2"
                        indicatorClassName={getCapacityColor(
                          cls.currentEnrollment,
                          cls.capacity
                        )}
                      />
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground bg-muted/50 p-2.5 rounded-lg">
                      <div className="flex items-center gap-1.5">
                        <Layers className="h-3.5 w-3.5" /> {cls.level}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Users className="h-3.5 w-3.5" />{" "}
                        {cls.currentEnrollment} Students
                      </div>
                    </div>
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
                      <th className="px-6 py-4 text-left">Class Name</th>
                      <th className="px-6 py-4 text-left">Code</th>
                      <th className="px-6 py-4 text-left">Instructor</th>
                      <th className="px-6 py-4 text-left">Level</th>
                      <th className="px-6 py-4 text-left">Capacity</th>
                      <th className="px-6 py-4 text-left">Status</th>
                      <th className="px-6 py-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {filteredClasses.map((cls) => (
                      <motion.tr
                        key={cls.id}
                        variants={itemVariants}
                        className="group hover:bg-muted/40 transition-colors cursor-pointer"
                        onClick={() => openDetailModal(cls)}
                      >
                        <td className="px-6 py-4 font-medium">{cls.name}</td>
                        <td className="px-6 py-4 text-muted-foreground font-mono">
                          {cls.code}
                        </td>
                        <td className="px-6 py-4">{cls.teacher?.user.name}</td>
                        <td className="px-6 py-4">
                          <Badge variant="outline">{cls.level}</Badge>
                        </td>
                        <td className="px-6 py-4 text-muted-foreground">
                          {cls.currentEnrollment} / {cls.capacity}
                        </td>
                        <td className="px-6 py-4">
                          <Badge
                            className={
                              cls.isActive
                                ? "bg-green-100 text-green-700"
                                : "bg-gray-100 text-gray-700"
                            }
                          >
                            {cls.isActive ? "Active" : "Inactive"}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <ChevronRight className="h-4 w-4 ml-auto text-muted-foreground" />
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
                <h2 className="text-xl font-bold">Create New Class</h2>
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
                    <Label>Class Name</Label>
                    <Input
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="e.g. Quran Memorization"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label>Class Code</Label>
                    <Input
                      value={formData.code}
                      onChange={(e) =>
                        setFormData({ ...formData, code: e.target.value })
                      }
                      placeholder="e.g. QRN-101"
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <Label>Description</Label>
                  <Input
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <Label>Level</Label>
                    <Select
                      value={formData.level}
                      onValueChange={(v) =>
                        setFormData({ ...formData, level: v })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Beginner">Beginner</SelectItem>
                        <SelectItem value="Intermediate">
                          Intermediate
                        </SelectItem>
                        <SelectItem value="Advanced">Advanced</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1">
                    <Label>Capacity</Label>
                    <Input
                      type="number"
                      value={formData.capacity}
                      onChange={(e) =>
                        setFormData({ ...formData, capacity: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <Label>Assign Teacher</Label>
                  <Select
                    value={formData.teacherId}
                    onValueChange={(v) =>
                      setFormData({ ...formData, teacherId: v })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Teacher" />
                    </SelectTrigger>
                    <SelectContent>
                      {teachers.map((t) => (
                        <SelectItem key={t.id} value={t.id}>
                          {t.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <Label>Start Date</Label>
                    <Input
                      type="date"
                      value={formData.startDate}
                      onChange={(e) =>
                        setFormData({ ...formData, startDate: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-1">
                    <Label>End Date</Label>
                    <Input
                      type="date"
                      value={formData.endDate}
                      onChange={(e) =>
                        setFormData({ ...formData, endDate: e.target.value })
                      }
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
                    "Create Class"
                  )}
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- DETAIL MODAL --- */}
      <AnimatePresence>
        {isDetailOpen && selectedClass && (
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
              {/* Header */}
              <div className="h-32 bg-gradient-to-r from-purple-600 to-indigo-700 p-6 flex justify-between items-start text-white shrink-0">
                <div className="flex gap-4 items-center">
                  <div className="h-16 w-16 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center text-3xl font-bold border border-white/20">
                    {selectedClass.name.charAt(0)}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">{selectedClass.name}</h2>
                    <div className="flex items-center gap-3 mt-1 opacity-90">
                      <Badge
                        variant="outline"
                        className="text-white border-white/30 bg-white/10 hover:bg-white/20 cursor-pointer"
                        onClick={() => copyCode(selectedClass.code)}
                      >
                        {selectedClass.code} <Copy className="ml-1.5 h-3 w-3" />
                      </Badge>
                      <span className="text-sm border-l border-white/30 pl-3">
                        {selectedClass.level}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="secondary"
                    className="bg-white/20 text-white hover:bg-white/30 border-0"
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    {isEditing ? "View Mode" : "Edit Class"}
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="text-white hover:bg-white/20"
                    onClick={() => setIsDetailOpen(false)}
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              {/* Tabs */}
              <div className="flex-1 overflow-y-auto bg-muted/10 p-6">
                {isEditing ? (
                  <div className="max-w-xl mx-auto space-y-4">
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
                      <Label>Description</Label>
                      <Input
                        value={formData.description}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            description: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <Label>Capacity</Label>
                        <Input
                          type="number"
                          value={formData.capacity}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              capacity: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="space-y-1">
                        <Label>Teacher</Label>
                        <Select
                          value={formData.teacherId}
                          onValueChange={(v) =>
                            setFormData({ ...formData, teacherId: v })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {teachers.map((t) => (
                              <SelectItem key={t.id} value={t.id}>
                                {t.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
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
                    <div className="pt-4 border-t mt-4 flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">
                        Danger Zone
                      </span>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(selectedClass.id)}
                      >
                        Delete Class
                      </Button>
                    </div>
                  </div>
                ) : (
                  <Tabs
                    defaultValue="overview"
                    className="w-full h-full flex flex-col"
                  >
                    <TabsList className="w-full justify-start border-b rounded-none bg-transparent p-0 mb-6 h-auto">
                      <TabsTrigger
                        value="overview"
                        className="rounded-none border-b-2 border-transparent data-[state=active]:border-purple-600 px-4 py-2"
                      >
                        Overview
                      </TabsTrigger>
                      <TabsTrigger
                        value="schedule"
                        className="rounded-none border-b-2 border-transparent data-[state=active]:border-purple-600 px-4 py-2"
                      >
                        Schedule
                      </TabsTrigger>
                      <TabsTrigger
                        value="students"
                        className="rounded-none border-b-2 border-transparent data-[state=active]:border-purple-600 px-4 py-2"
                      >
                        Students ({selectedClass.currentEnrollment})
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview" className="mt-0">
                      <div className="grid gap-6 md:grid-cols-2">
                        <Card>
                          <CardContent className="p-6">
                            <h3 className="font-semibold mb-4 flex items-center gap-2">
                              <GraduationCap className="h-4 w-4 text-purple-600" />{" "}
                              Instructor
                            </h3>
                            <div className="flex items-center gap-4">
                              <Avatar className="h-14 w-14">
                                <AvatarImage
                                  src={selectedClass.teacher?.user.image}
                                />
                                <AvatarFallback>
                                  {getInitials(
                                    selectedClass.teacher?.user.name || "T"
                                  )}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-bold text-lg">
                                  {selectedClass.teacher?.user.name ||
                                    "Unassigned"}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  Head Teacher
                                </p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardContent className="p-6">
                            <h3 className="font-semibold mb-4 flex items-center gap-2">
                              <Users className="h-4 w-4 text-emerald-600" />{" "}
                              Enrollment
                            </h3>
                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span>Occupancy</span>
                                <span className="font-bold">
                                  {selectedClass.currentEnrollment} /{" "}
                                  {selectedClass.capacity}
                                </span>
                              </div>
                              <Progress
                                value={
                                  (selectedClass.currentEnrollment /
                                    selectedClass.capacity) *
                                  100
                                }
                                className="h-3"
                                indicatorClassName={getCapacityColor(
                                  selectedClass.currentEnrollment,
                                  selectedClass.capacity
                                )}
                              />
                              <p className="text-xs text-muted-foreground pt-1">
                                Academic Year: {selectedClass.academicYear}
                              </p>
                            </div>
                          </CardContent>
                        </Card>
                        <Card className="md:col-span-2">
                          <CardContent className="p-6">
                            <h3 className="font-semibold mb-2">Description</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              {selectedClass.description ||
                                "No description provided."}
                            </p>
                          </CardContent>
                        </Card>
                      </div>
                    </TabsContent>

                    <TabsContent value="schedule">
                      <div className="text-center py-12 text-muted-foreground bg-muted/30 rounded-xl border border-dashed">
                        <Calendar className="h-10 w-10 mx-auto mb-3 opacity-20" />
                        <p>No schedule configured yet.</p>
                        <Button variant="link" className="mt-2">
                          Configure Schedule
                        </Button>
                      </div>
                    </TabsContent>

                    <TabsContent value="students">
                      <div className="text-center py-12 text-muted-foreground bg-muted/30 rounded-xl border border-dashed">
                        <Users className="h-10 w-10 mx-auto mb-3 opacity-20" />
                        <p>No students enrolled yet.</p>
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
