"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Plus,
  MoreVertical,
  Edit,
  Trash2,
  Download,
  LayoutGrid,
  List as ListIcon,
  Loader2,
  X,
  FileText,
  Calendar,
  CheckCircle2,
  AlertCircle,
  BookOpen,
  GraduationCap,
  Clock,
  ChevronRight,
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
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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

interface Props {
  initialAssignments: any[];
  classes: any[];
  subjects: any[];
  stats: any;
  pagination: any;
}

export default function AssignmentsManagementClient({
  initialAssignments,
  classes,
  subjects,
  stats: serverStats,
}: Props) {
  const router = useRouter();
  const [assignments, setAssignments] = useState(initialAssignments);
  const [isLoading, setIsLoading] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [filterClass, setFilterClass] = useState("ALL");
  const [filterType, setFilterType] = useState("ALL");

  // Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState<any>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Form Data
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    classId: "",
    subjectId: "",
    type: "HOMEWORK",
    totalMarks: "100",
    dueDate: "",
  });

  // --- FILTER LOGIC ---
  const filteredAssignments = useMemo(() => {
    return assignments.filter((a) => {
      const term = searchQuery.toLowerCase();
      const matchesSearch =
        a.title.toLowerCase().includes(term) ||
        a.subject.name.toLowerCase().includes(term);
      const matchesClass =
        filterClass === "ALL" || a.subject.class.id === filterClass;
      const matchesType = filterType === "ALL" || a.type === filterType;
      return matchesSearch && matchesClass && matchesType;
    });
  }, [assignments, searchQuery, filterClass, filterType]);

  // --- DYNAMIC STATS ---
  const currentStats = useMemo(() => {
    const total = filteredAssignments.length;
    const now = new Date();
    const upcoming = filteredAssignments.filter(
      (a) => new Date(a.dueDate) > now
    ).length;
    const overdue = filteredAssignments.filter(
      (a) => new Date(a.dueDate) < now
    ).length;
    // Mock completion rate based on data availability
    const completion = Math.round(
      (filteredAssignments.reduce(
        (acc, a) => acc + (a.submissionCount || 0),
        0
      ) /
        (total * 20 || 1)) *
        100
    );

    return { total, upcoming, overdue, completion };
  }, [filteredAssignments]);

  const availableSubjects = useMemo(() => {
    if (!formData.classId) return [];
    return subjects.filter((s) => s.classId === formData.classId);
  }, [formData.classId, subjects]);

  // --- ACTIONS ---
  const handleCreateOrUpdate = async () => {
    if (!formData.title || !formData.subjectId || !formData.dueDate) {
      return toast.error("Title, Subject, and Due Date required");
    }
    setIsLoading(true);

    try {
      const res = await fetch("/api/admin/assignments/manage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: isEditing ? "UPDATE" : "CREATE",
          assignmentId: selectedAssignment?.id,
          data: formData,
        }),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.error);

      if (isEditing) {
        setAssignments((prev) =>
          prev.map((a) =>
            a.id === selectedAssignment.id ? result.assignment : a
          )
        );
        setSelectedAssignment(result.assignment);
        toast.success("Assignment updated");
        setIsEditing(false);
      } else {
        setAssignments([result.assignment, ...assignments]);
        toast.success("Assignment created");
        setIsAddModalOpen(false);
        resetForm();
      }
    } catch (error: any) {
      toast.error(error.message || "Failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (assignmentId: string) => {
    if (!confirm("Delete this assignment?")) return;
    setAssignments((prev) => prev.filter((a) => a.id !== assignmentId));
    setIsDetailOpen(false);
    try {
      await fetch("/api/admin/assignments/manage", {
        method: "POST",
        body: JSON.stringify({ action: "DELETE", assignmentId }),
      });
      toast.success("Deleted");
    } catch {
      toast.error("Delete failed");
      router.refresh();
    }
  };

  // --- HELPERS ---
  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      classId: "",
      subjectId: "",
      type: "HOMEWORK",
      totalMarks: "100",
      dueDate: "",
    });
    setIsEditing(false);
  };

  const openEdit = (a: any) => {
    // If opening directly from grid/list
    if (!selectedAssignment) setSelectedAssignment(a);

    setFormData({
      title: a.title,
      description: a.description || "",
      classId: a.subject.class.id,
      subjectId: a.subject.id,
      type: a.type,
      totalMarks: a.totalMarks.toString(),
      dueDate: new Date(a.dueDate).toISOString().split("T")[0],
    });
    setIsEditing(true);
    // If not in detail view, open Add Modal in Edit Mode
    if (!isDetailOpen) setIsAddModalOpen(true);
  };

  const openDetail = (a: any) => {
    setSelectedAssignment(a);
    setFormData({
      title: a.title,
      description: a.description || "",
      classId: a.subject.class.id,
      subjectId: a.subject.id,
      type: a.type,
      totalMarks: a.totalMarks.toString(),
      dueDate: new Date(a.dueDate).toISOString().split("T")[0],
    });
    setIsDetailOpen(true);
    setIsEditing(false);
  };

  const getStatusColor = (date: string) => {
    const diff =
      (new Date(date).getTime() - new Date().getTime()) / (1000 * 3600 * 24);
    if (diff < 0) return "text-rose-600 bg-rose-50 border-rose-200";
    if (diff < 3) return "text-amber-600 bg-amber-50 border-amber-200";
    return "text-emerald-600 bg-emerald-50 border-emerald-200";
  };

  const getDaysLeft = (date: string) => {
    const diff = Math.ceil(
      (new Date(date).getTime() - new Date().getTime()) / (1000 * 3600 * 24)
    );
    if (diff < 0) return "Expired";
    if (diff === 0) return "Due Today";
    return `${diff} Days Left`;
  };

  const statCards = [
    {
      label: "Total Tasks",
      value: currentStats.total,
      icon: FileText,
      color: "from-blue-500 to-cyan-500",
      shadow: "shadow-blue-500/20",
    },
    {
      label: "Active",
      value: currentStats.upcoming,
      icon: Calendar,
      color: "from-purple-500 to-pink-500",
      shadow: "shadow-purple-500/20",
    },
    {
      label: "Past Due",
      value: currentStats.overdue,
      icon: AlertCircle,
      color: "from-rose-500 to-red-500",
      shadow: "shadow-rose-500/20",
    },
    {
      label: "Completion",
      value: `${currentStats.completion}%`,
      icon: CheckCircle2,
      color: "from-emerald-500 to-green-500",
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
      {/* HEADER */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
            Assignments
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage tasks, homework, and assessments
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
            onClick={() => {
              resetForm();
              setIsAddModalOpen(true);
            }}
          >
            <Plus className="h-4 w-4 mr-2" /> Create Task
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
            placeholder="Search assignments..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 bg-white dark:bg-slate-950"
          />
        </div>
        <Select value={filterClass} onValueChange={setFilterClass}>
          <SelectTrigger className="w-[180px] bg-white dark:bg-slate-950">
            <SelectValue placeholder="Filter by Class" />
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
        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger className="w-[150px] bg-white dark:bg-slate-950">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All Types</SelectItem>
            <SelectItem value="HOMEWORK">Homework</SelectItem>
            <SelectItem value="QUIZ">Quiz</SelectItem>
            <SelectItem value="PROJECT">Project</SelectItem>
          </SelectContent>
        </Select>
      </motion.div>

      {/* CONTENT GRID */}
      {viewMode === "grid" ? (
        <motion.div
          variants={containerVariants}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {filteredAssignments.map((a) => (
            <motion.div
              key={a.id}
              variants={itemVariants}
              layoutId={a.id}
              onClick={() => openDetail(a)}
              className="cursor-pointer"
            >
              <Card className="group h-full border hover:border-purple-300 dark:hover:border-purple-800 transition-all hover:shadow-xl bg-card">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="flex justify-between items-start mb-4">
                    <Badge
                      variant="outline"
                      className={cn(
                        "text-xs font-medium border",
                        getStatusColor(a.dueDate)
                      )}
                    >
                      {getDaysLeft(a.dueDate)}
                    </Badge>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button size="icon" variant="ghost" className="h-8 w-8">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={(e) => {
                            e.stopPropagation();
                            openEdit(a);
                          }}
                        >
                          <Edit className="mr-2 h-4 w-4" /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(a.id);
                          }}
                          className="text-red-600"
                        >
                          <Trash2 className="mr-2 h-4 w-4" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  <h3 className="font-bold text-lg leading-tight mb-2 line-clamp-2">
                    {a.title}
                  </h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant="secondary" className="text-xs">
                      {a.subject.name}
                    </Badge>
                    <Badge
                      variant="outline"
                      className="text-xs text-muted-foreground"
                    >
                      {a.subject.class.name}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-3 mb-6 p-2 rounded-lg bg-muted/50">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={a.subject.teacher.user.image} />
                      <AvatarFallback>
                        {getInitials(a.subject.teacher.user.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium truncate">
                        {a.subject.teacher.user.name}
                      </p>
                      <p className="text-[10px] text-muted-foreground">
                        Instructor
                      </p>
                    </div>
                  </div>

                  <div className="mt-auto pt-4 border-t flex justify-between items-center text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <BookOpen className="h-3 w-3" /> {a.type}
                    </span>
                    <span>{a.submissionCount} Submissions</span>
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
                      <th className="px-6 py-4 text-left">Title</th>
                      <th className="px-6 py-4 text-left">Subject</th>
                      <th className="px-6 py-4 text-left">Class</th>
                      <th className="px-6 py-4 text-left">Due Date</th>
                      <th className="px-6 py-4 text-left">Status</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {filteredAssignments.map((a) => (
                      <motion.tr
                        key={a.id}
                        variants={itemVariants}
                        className="group hover:bg-muted/40 transition-colors cursor-pointer"
                        onClick={() => openDetail(a)}
                      >
                        <td className="px-6 py-4 font-medium">{a.title}</td>
                        <td className="px-6 py-4">{a.subject.name}</td>
                        <td className="px-6 py-4">
                          <Badge variant="secondary" className="text-xs">
                            {a.subject.class.name}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 text-muted-foreground">
                          {new Date(a.dueDate).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4">
                          <Badge
                            variant="outline"
                            className={getStatusColor(a.dueDate)}
                          >
                            {getDaysLeft(a.dueDate)}
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

      {/* --- ADD MODAL (Standard Center) --- */}
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
                <h2 className="text-xl font-bold">
                  {isEditing ? "Edit Assignment" : "New Assignment"}
                </h2>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => setIsAddModalOpen(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <div className="grid gap-4">
                <div className="space-y-1">
                  <Label>Title</Label>
                  <Input
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    placeholder="e.g. Surah Al-Kahf Review"
                  />
                </div>
                <div className="space-y-1">
                  <Label>Description</Label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    placeholder="Instructions..."
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <Label>Class</Label>
                    <Select
                      value={formData.classId}
                      onValueChange={(v) =>
                        setFormData({ ...formData, classId: v, subjectId: "" })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Class" />
                      </SelectTrigger>
                      <SelectContent>
                        {classes.map((c) => (
                          <SelectItem key={c.id} value={c.id}>
                            {c.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1">
                    <Label>Subject</Label>
                    <Select
                      value={formData.subjectId}
                      onValueChange={(v) =>
                        setFormData({ ...formData, subjectId: v })
                      }
                      disabled={!formData.classId}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Subject" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableSubjects.length > 0 ? (
                          availableSubjects.map((s: any) => (
                            <SelectItem key={s.id} value={s.id}>
                              {s.name}
                            </SelectItem>
                          ))
                        ) : (
                          <div className="p-2 text-xs text-muted-foreground">
                            No subjects found
                          </div>
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <Label>Type</Label>
                    <Select
                      value={formData.type}
                      onValueChange={(v) =>
                        setFormData({ ...formData, type: v })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="HOMEWORK">Homework</SelectItem>
                        <SelectItem value="PROJECT">Project</SelectItem>
                        <SelectItem value="QUIZ">Quiz</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1">
                    <Label>Marks</Label>
                    <Input
                      type="number"
                      value={formData.totalMarks}
                      onChange={(e) =>
                        setFormData({ ...formData, totalMarks: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <Label>Due Date</Label>
                  <Input
                    type="date"
                    value={formData.dueDate}
                    onChange={(e) =>
                      setFormData({ ...formData, dueDate: e.target.value })
                    }
                  />
                </div>

                <Button
                  className="w-full mt-4 bg-purple-600 hover:bg-purple-700 text-white"
                  onClick={handleCreateOrUpdate}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="animate-spin mr-2" />
                  ) : isEditing ? (
                    "Save Changes"
                  ) : (
                    "Create Task"
                  )}
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- DETAIL MODAL (Apple Style) --- */}
      <AnimatePresence>
        {isDetailOpen && selectedAssignment && (
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
              className="bg-background w-full max-w-3xl h-[85vh] rounded-2xl shadow-2xl border overflow-hidden flex flex-col"
            >
              {/* Header */}
              <div className="h-40 bg-gradient-to-br from-purple-600 to-indigo-700 p-8 flex flex-col justify-end text-white relative shrink-0">
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => setIsDetailOpen(false)}
                  className="absolute top-4 right-4 text-white hover:bg-white/20"
                >
                  <X className="h-6 w-6" />
                </Button>
                <div className="flex gap-2 mb-2">
                  <Badge className="bg-white/20 hover:bg-white/30 text-white border-0">
                    {selectedAssignment.type}
                  </Badge>
                  <Badge
                    variant="outline"
                    className="text-white border-white/40"
                  >
                    {selectedAssignment.totalMarks} Marks
                  </Badge>
                </div>
                <h2 className="text-3xl font-bold">
                  {selectedAssignment.title}
                </h2>
              </div>

              {/* Body */}
              <div className="flex-1 overflow-y-auto p-8 space-y-6 bg-muted/10">
                {isEditing ? (
                  // Simple redirect to standard edit form (Add Modal reused)
                  <div className="flex flex-col items-center justify-center h-full">
                    <p className="text-muted-foreground mb-4">
                      Edit mode is active.
                    </p>
                    <Button
                      onClick={() => {
                        setIsDetailOpen(false);
                        openEdit(selectedAssignment);
                      }}
                    >
                      Open Editor
                    </Button>
                  </div>
                ) : (
                  <Tabs defaultValue="overview" className="w-full">
                    <TabsList className="w-full justify-start border-b rounded-none bg-transparent p-0 mb-6 h-auto">
                      <TabsTrigger
                        value="overview"
                        className="rounded-none border-b-2 border-transparent data-[state=active]:border-purple-600 px-4 py-2"
                      >
                        Overview
                      </TabsTrigger>
                      <TabsTrigger
                        value="submissions"
                        className="rounded-none border-b-2 border-transparent data-[state=active]:border-purple-600 px-4 py-2"
                      >
                        Submissions ({selectedAssignment.submissionCount})
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview" className="space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                        <Card>
                          <CardContent className="p-4">
                            <p className="text-xs font-bold text-muted-foreground uppercase mb-1">
                              Class
                            </p>
                            <p className="font-semibold">
                              {selectedAssignment.subject.class.name}
                            </p>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardContent className="p-4">
                            <p className="text-xs font-bold text-muted-foreground uppercase mb-1">
                              Subject
                            </p>
                            <p className="font-semibold">
                              {selectedAssignment.subject.name}
                            </p>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardContent className="p-4">
                            <p className="text-xs font-bold text-muted-foreground uppercase mb-1">
                              Due Date
                            </p>
                            <p className="font-semibold">
                              {new Date(
                                selectedAssignment.dueDate
                              ).toLocaleDateString()}
                            </p>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardContent className="p-4">
                            <p className="text-xs font-bold text-muted-foreground uppercase mb-1">
                              Instructor
                            </p>
                            <div className="flex items-center gap-2">
                              <Avatar className="h-6 w-6">
                                <AvatarImage
                                  src={
                                    selectedAssignment.subject.teacher.user
                                      .image
                                  }
                                />
                              </Avatar>
                              <span className="text-sm">
                                {selectedAssignment.subject.teacher.user.name}
                              </span>
                            </div>
                          </CardContent>
                        </Card>
                      </div>

                      <div>
                        <h4 className="font-bold text-lg mb-2 flex items-center gap-2">
                          <FileText className="h-5 w-5 text-indigo-500" />{" "}
                          Description
                        </h4>
                        <div className="bg-white dark:bg-slate-900 border p-4 rounded-xl text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                          {selectedAssignment.description ||
                            "No detailed instructions provided."}
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="submissions">
                      <div className="text-center py-12 text-muted-foreground bg-white dark:bg-slate-900 border border-dashed rounded-xl">
                        <BookOpen className="h-10 w-10 mx-auto mb-3 opacity-20" />
                        <p>No submissions to display yet.</p>
                      </div>
                    </TabsContent>
                  </Tabs>
                )}

                {!isEditing && (
                  <div className="flex gap-3 pt-8 border-t">
                    <Button
                      className="flex-1"
                      variant="outline"
                      onClick={() => openEdit(selectedAssignment)}
                    >
                      <Edit className="mr-2 h-4 w-4" /> Edit
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => handleDelete(selectedAssignment.id)}
                    >
                      <Trash2 className="mr-2 h-4 w-4" /> Delete
                    </Button>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
