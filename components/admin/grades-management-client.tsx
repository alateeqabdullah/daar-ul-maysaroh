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
  GraduationCap,
  Medal,
  FileText,
  CheckCircle2,
  AlertCircle,
  BookOpen,
  Calendar,
  TrendingUp,
  BarChart3,
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
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
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
  initialGrades: any[];
  classes: any[];
  stats: any;
  pagination: any;
}

export default function GradesManagementClient({
  initialGrades,
  classes,
  stats: serverStats,
  pagination,
}: Props) {
  const router = useRouter();
  const [grades, setGrades] = useState(initialGrades);
  const [isLoading, setIsLoading] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [filterClass, setFilterClass] = useState("ALL");
  const [filterType, setFilterType] = useState("ALL");

  // Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedGrade, setSelectedGrade] = useState<any>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Form Data
  const [formData, setFormData] = useState({
    studentId: "",
    subjectId: "",
    score: "",
    totalMarks: "100",
    examType: "MIDTERM",
    remarks: "",
  });

  // --- FILTER LOGIC ---
  const filteredGrades = useMemo(() => {
    return grades.filter((g) => {
      const term = searchQuery.toLowerCase();
      const matchesSearch =
        g.studentName.toLowerCase().includes(term) ||
        g.subjectName.toLowerCase().includes(term);
      const matchesClass = filterClass === "ALL" || g.className === filterClass; // Note: Filtering by Class Name for demo, usually ID
      const matchesType = filterType === "ALL" || g.examType === filterType;
      return matchesSearch && matchesClass && matchesType;
    });
  }, [grades, searchQuery, filterClass, filterType]);

  // --- ANALYTICS DATA ---
  const distributionData = useMemo(() => {
    const counts = { A: 0, B: 0, C: 0, F: 0 };
    filteredGrades.forEach((g) => {
      if (g.percentage >= 90) counts.A++;
      else if (g.percentage >= 75) counts.B++;
      else if (g.percentage >= 50) counts.C++;
      else counts.F++;
    });
    return [
      { name: "A (90+)", value: counts.A, color: "#10b981" },
      { name: "B (75+)", value: counts.B, color: "#3b82f6" },
      { name: "C (50+)", value: counts.C, color: "#f59e0b" },
      { name: "F (<50)", value: counts.F, color: "#ef4444" },
    ];
  }, [filteredGrades]);

  // --- ACTIONS ---
  const handleCreateOrUpdate = async () => {
    if (!formData.score || !formData.studentId)
      return toast.error("Student and Score required");
    setIsLoading(true);

    try {
      const res = await fetch("/api/admin/grades/manage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: isEditing ? "UPDATE" : "CREATE",
          gradeId: selectedGrade?.id,
          data: formData,
        }),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.error);

      if (isEditing) {
        setGrades((prev) =>
          prev.map((g) => (g.id === selectedGrade.id ? result.grade : g))
        );
        setSelectedGrade(result.grade);
        toast.success("Grade updated");
        setIsEditing(false);
      } else {
        setGrades([result.grade, ...grades]);
        toast.success("Grade recorded");
        setIsAddModalOpen(false);
        resetForm();
      }
    } catch (error: any) {
      toast.error(error.message || "Failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (gradeId: string) => {
    if (!confirm("Delete this grade record?")) return;
    setGrades((prev) => prev.filter((g) => g.id !== gradeId));
    setIsDetailOpen(false);
    try {
      await fetch("/api/admin/grades/manage", {
        method: "POST",
        body: JSON.stringify({ action: "DELETE", gradeId }),
      });
      toast.success("Record deleted");
    } catch {
      toast.error("Delete failed");
      router.refresh();
    }
  };

  const handleExport = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      ["Student,Subject,Exam,Score,Date"].join(",") +
      "\n" +
      grades
        .map(
          (g) =>
            `${g.studentName},${g.subjectName},${g.examType},${
              g.percentage
            }%,${new Date(g.assessmentDate).toLocaleDateString()}`
        )
        .join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "grades_export.csv");
    document.body.appendChild(link);
    link.click();
  };

  // --- HELPERS ---
  const resetForm = () => {
    setFormData({
      studentId: "",
      subjectId: "",
      score: "",
      totalMarks: "100",
      examType: "MIDTERM",
      remarks: "",
    });
    setIsEditing(false);
  };

  const openEdit = (g: any) => {
    if (!selectedGrade) setSelectedGrade(g);
    setFormData({
      studentId: g.studentId,
      subjectId: g.subjectId,
      score: g.score.toString(),
      totalMarks: g.totalScore.toString(),
      examType: g.examType,
      remarks: g.remarks || "",
    });
    setIsEditing(true);
    if (!isDetailOpen) setIsAddModalOpen(true);
  };

  const openDetail = (g: any) => {
    setSelectedGrade(g);
    setFormData({
      studentId: g.studentId,
      subjectId: g.subjectId,
      score: g.score.toString(),
      totalMarks: g.totalScore.toString(),
      examType: g.examType,
      remarks: g.remarks || "",
    });
    setIsDetailOpen(true);
    setIsEditing(false);
  };

  const getGradeColor = (percentage: number) => {
    if (percentage >= 90)
      return "text-emerald-600 bg-emerald-50 border-emerald-200";
    if (percentage >= 75) return "text-blue-600 bg-blue-50 border-blue-200";
    if (percentage >= 50) return "text-amber-600 bg-amber-50 border-amber-200";
    return "text-rose-600 bg-rose-50 border-rose-200";
  };

  const getLetterGrade = (percentage: number) => {
    if (percentage >= 90) return "A";
    if (percentage >= 80) return "B";
    if (percentage >= 70) return "C";
    if (percentage >= 60) return "D";
    return "F";
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-8 pb-10"
    >
      {/* 1. HEADER */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
            Grades & Results
          </h1>
          <p className="text-muted-foreground mt-1">
            Academic performance and assessment tracking
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
            className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md hover:scale-105 transition-all gap-2"
            onClick={() => {
              resetForm();
              setIsAddModalOpen(true);
            }}
          >
            <Plus className="h-4 w-4 mr-2" /> Record Grade
          </Button>
        </div>
      </div>

      {/* 2. ANALYTICS BENTO GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Main Stats Card */}
        <Card className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white border-0 shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-16 -mt-16 pointer-events-none"></div>
          <CardContent className="p-6 relative z-10">
            <p className="text-indigo-100 text-xs font-bold uppercase tracking-wider">
              Overall Average
            </p>
            <h3 className="text-5xl font-extrabold mt-2">
              <Counter value={serverStats.average} />%
            </h3>
            <div className="mt-4 flex gap-2">
              <Badge className="bg-white/20 hover:bg-white/30 text-white border-0 backdrop-blur-md">
                Total Assessments: {serverStats.total}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Top Performers */}
        <Card className="border-none shadow-sm bg-white/60 dark:bg-slate-900/60 backdrop-blur-md">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Medal className="h-5 w-5 text-amber-500" />
              <h3 className="font-bold text-sm uppercase text-muted-foreground tracking-wider">
                Top Performers
              </h3>
            </div>
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
              {serverStats.topStudents.length > 0 ? (
                serverStats.topStudents.map((s: any, i: number) => (
                  <div
                    key={i}
                    className="flex flex-col items-center min-w-[70px] snap-center"
                  >
                    <Avatar className="h-12 w-12 border-2 border-amber-200 shadow-sm">
                      <AvatarImage src={s.image} />
                      <AvatarFallback>{getInitials(s.name)}</AvatarFallback>
                    </Avatar>
                    <p className="text-[10px] font-bold mt-2 truncate w-full text-center">
                      {s.name.split(" ")[0]}
                    </p>
                    <span className="text-[10px] text-green-600 font-bold bg-green-50 px-1.5 rounded">
                      {s.score}%
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-muted-foreground text-sm">
                  No data available.
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Distribution Chart */}
        <Card className="border-none shadow-sm bg-white/60 dark:bg-slate-900/60 backdrop-blur-md">
          <CardContent className="p-6 pb-2">
            <div className="flex items-center gap-2 mb-2">
              <BarChart3 className="h-5 w-5 text-blue-500" />
              <h3 className="font-bold text-sm uppercase text-muted-foreground tracking-wider">
                Distribution
              </h3>
            </div>
            <div className="h-[100px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={distributionData}>
                  <Tooltip
                    cursor={{ fill: "transparent" }}
                    contentStyle={{
                      borderRadius: "8px",
                      border: "none",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    }}
                  />
                  <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                    {distributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 3. FILTERS (Glassmorphism) */}
      <motion.div
        variants={itemVariants}
        className="flex flex-col sm:flex-row gap-4 bg-white/60 dark:bg-slate-900/60 backdrop-blur-md p-4 rounded-xl border shadow-sm"
      >
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search student or subject..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 bg-white dark:bg-slate-950 border-muted"
          />
        </div>
        <Select value={filterClass} onValueChange={setFilterClass}>
          <SelectTrigger className="w-[180px] bg-white dark:bg-slate-950 border-muted">
            <SelectValue placeholder="Filter Class" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All Classes</SelectItem>
            {classes.map((c: any) => (
              <SelectItem key={c.id} value={c.name}>
                {c.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger className="w-[150px] bg-white dark:bg-slate-950 border-muted">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All Types</SelectItem>
            <SelectItem value="MIDTERM">Midterm</SelectItem>
            <SelectItem value="FINAL">Final</SelectItem>
            <SelectItem value="QUIZ">Quiz</SelectItem>
          </SelectContent>
        </Select>
      </motion.div>

      {/* 4. CONTENT GRID */}
      {viewMode === "grid" ? (
        <motion.div
          variants={containerVariants}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {filteredGrades.map((g) => (
            <motion.div
              key={g.id}
              variants={itemVariants}
              layoutId={g.id}
              onClick={() => openDetail(g)}
              className="cursor-pointer"
            >
              <Card className="group h-full border hover:border-emerald-300 dark:hover:border-emerald-800 transition-all hover:shadow-xl bg-card overflow-hidden">
                {/* Dynamic color stripe based on score */}
                <div
                  className={cn(
                    "h-1.5 w-full",
                    g.percentage >= 75
                      ? "bg-emerald-500"
                      : g.percentage >= 50
                      ? "bg-amber-500"
                      : "bg-rose-500"
                  )}
                />

                <CardContent className="p-6 flex flex-col h-full">
                  <div className="flex justify-between items-start mb-4">
                    <Badge
                      variant="outline"
                      className={cn(
                        "font-bold text-xs px-2 py-0.5",
                        getGradeColor(g.percentage)
                      )}
                    >
                      {g.percentage.toFixed(0)}% •{" "}
                      {getLetterGrade(g.percentage)}
                    </Badge>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8 -mr-2 text-muted-foreground"
                        >
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={(e) => {
                            e.stopPropagation();
                            openEdit(g);
                          }}
                        >
                          <Edit className="mr-2 h-4 w-4" /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(g.id);
                          }}
                          className="text-red-600"
                        >
                          <Trash2 className="mr-2 h-4 w-4" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  <div className="flex items-center gap-3 mb-4">
                    <Avatar className="h-12 w-12 border-2 border-white shadow-md">
                      <AvatarImage src={g.studentImage} />
                      <AvatarFallback>
                        {getInitials(g.studentName)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <p className="font-bold text-sm leading-tight truncate">
                        {g.studentName}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {g.className}
                      </p>
                    </div>
                  </div>

                  <div className="mt-auto pt-4 border-t border-dashed space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground text-xs font-medium uppercase tracking-wide">
                        Subject
                      </span>
                      <span className="font-semibold">{g.subjectName}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground text-xs font-medium uppercase tracking-wide">
                        Exam
                      </span>
                      <span className="font-medium capitalize">
                        {g.examType.toLowerCase()}
                      </span>
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
                      <th className="px-6 py-4 text-left">Student</th>
                      <th className="px-6 py-4 text-left">Class</th>
                      <th className="px-6 py-4 text-left">Subject</th>
                      <th className="px-6 py-4 text-left">Type</th>
                      <th className="px-6 py-4 text-left">Score</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {filteredGrades.map((g) => (
                      <motion.tr
                        key={g.id}
                        variants={itemVariants}
                        className="group hover:bg-muted/40 transition-colors cursor-pointer"
                        onClick={() => openDetail(g)}
                      >
                        <td className="px-6 py-4 font-medium">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={g.studentImage} />
                              <AvatarFallback>
                                {getInitials(g.studentName)}
                              </AvatarFallback>
                            </Avatar>
                            {g.studentName}
                          </div>
                        </td>
                        <td className="px-6 py-4">{g.className}</td>
                        <td className="px-6 py-4">{g.subjectName}</td>
                        <td className="px-6 py-4 capitalize">
                          {g.examType.toLowerCase()}
                        </td>
                        <td className="px-6 py-4">
                          <Badge
                            variant="outline"
                            className={getGradeColor(g.percentage)}
                          >
                            {g.percentage}% ({getLetterGrade(g.percentage)})
                          </Badge>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <Button variant="ghost" size="icon">
                            <ChevronRight className="h-4 w-4 text-muted-foreground" />
                          </Button>
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

      {/* --- ADD/EDIT MODAL --- */}
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
              className="bg-background w-full max-w-lg rounded-2xl shadow-2xl border p-6"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">
                  {isEditing ? "Edit Grade" : "Record Grade"}
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
                {/* 
                    NOTE: In a real app, this section needs Dropdowns to select:
                    1. Class -> 2. Student & Subject.
                    Since we don't have the full filtered lists here, I am using Inputs as placeholders.
                 */}
                {!isEditing && (
                  <div className="p-3 bg-blue-50 text-blue-700 text-xs rounded-lg border border-blue-100 mb-2 flex items-center gap-2">
                    <AlertCircle className="h-4 w-4" />
                    <span>
                      Enter Student & Subject IDs manually for this demo.
                    </span>
                  </div>
                )}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <Label>Student ID</Label>
                    <Input
                      value={formData.studentId}
                      onChange={(e) =>
                        setFormData({ ...formData, studentId: e.target.value })
                      }
                      disabled={isEditing}
                    />
                  </div>
                  <div className="space-y-1">
                    <Label>Subject ID</Label>
                    <Input
                      value={formData.subjectId}
                      onChange={(e) =>
                        setFormData({ ...formData, subjectId: e.target.value })
                      }
                      disabled={isEditing}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <Label>Score</Label>
                    <Input
                      type="number"
                      value={formData.score}
                      onChange={(e) =>
                        setFormData({ ...formData, score: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-1">
                    <Label>Total Marks</Label>
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
                  <Label>Exam Type</Label>
                  <Select
                    value={formData.examType}
                    onValueChange={(v) =>
                      setFormData({ ...formData, examType: v })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="MIDTERM">Midterm</SelectItem>
                      <SelectItem value="FINAL">Final</SelectItem>
                      <SelectItem value="QUIZ">Quiz</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1">
                  <Label>Remarks</Label>
                  <Input
                    value={formData.remarks}
                    onChange={(e) =>
                      setFormData({ ...formData, remarks: e.target.value })
                    }
                    placeholder="Excellent work..."
                  />
                </div>

                <Button
                  className="w-full mt-4 bg-emerald-600 hover:bg-emerald-700 text-white"
                  onClick={handleCreateOrUpdate}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="animate-spin mr-2" />
                  ) : isEditing ? (
                    "Save Changes"
                  ) : (
                    "Save Grade"
                  )}
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- DETAIL SLIDE OVER --- */}
      <AnimatePresence>
        {isDetailOpen && selectedGrade && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex justify-end bg-black/20 backdrop-blur-sm"
            onClick={() => setIsDetailOpen(false)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-xl bg-background shadow-2xl h-full border-l flex flex-col"
            >
              {/* Header */}
              <div className="h-48 bg-gradient-to-br from-emerald-600 to-teal-700 p-8 flex flex-col justify-end text-white relative shrink-0">
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => setIsDetailOpen(false)}
                  className="absolute top-4 right-4 text-white hover:bg-white/20"
                >
                  <X className="h-6 w-6" />
                </Button>
                <div className="flex items-end gap-6">
                  <div className="relative">
                    <Avatar className="h-24 w-24 border-[4px] border-white/20 shadow-xl">
                      <AvatarImage src={selectedGrade.studentImage} />
                      <AvatarFallback className="text-3xl bg-white/20 text-white">
                        {getInitials(selectedGrade.studentName)}
                      </AvatarFallback>
                    </Avatar>
                    <Badge
                      className={cn(
                        "absolute -bottom-3 left-1/2 -translate-x-1/2 shadow-lg border-2 border-white",
                        getGradeColor(selectedGrade.percentage)
                      )}
                    >
                      {selectedGrade.percentage}%
                    </Badge>
                  </div>
                  <div className="mb-2">
                    <h2 className="text-3xl font-bold">
                      {selectedGrade.studentName}
                    </h2>
                    <p className="text-emerald-100 opacity-90">
                      {selectedGrade.className}
                    </p>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-8 space-y-8">
                <div className="grid grid-cols-2 gap-4">
                  <Card>
                    <CardContent className="p-4">
                      <p className="text-xs font-bold text-muted-foreground uppercase mb-1">
                        Subject
                      </p>
                      <p className="font-semibold">
                        {selectedGrade.subjectName}
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <p className="text-xs font-bold text-muted-foreground uppercase mb-1">
                        Exam Type
                      </p>
                      <p className="font-semibold capitalize">
                        {selectedGrade.examType.toLowerCase()}
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <p className="text-xs font-bold text-muted-foreground uppercase mb-1">
                        Score
                      </p>
                      <p className="font-semibold">
                        {selectedGrade.score} / {selectedGrade.totalScore}
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <p className="text-xs font-bold text-muted-foreground uppercase mb-1">
                        Date
                      </p>
                      <p className="font-semibold">
                        {new Date(
                          selectedGrade.assessmentDate
                        ).toLocaleDateString()}
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <div>
                  <h4 className="font-bold text-lg mb-2 flex items-center gap-2">
                    <FileText className="h-5 w-5 text-emerald-600" /> Remarks
                  </h4>
                  <div className="bg-muted/30 p-4 rounded-xl text-sm leading-relaxed border">
                    {selectedGrade.remarks || (
                      <span className="text-muted-foreground italic">
                        No remarks provided by instructor.
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex gap-3 pt-8 border-t">
                  <Button
                    className="flex-1"
                    variant="outline"
                    onClick={() => {
                      setIsDetailOpen(false);
                      openEdit(selectedGrade);
                    }}
                  >
                    <Edit className="mr-2 h-4 w-4" /> Edit Record
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => handleDelete(selectedGrade.id)}
                  >
                    <Trash2 className="mr-2 h-4 w-4" /> Delete
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
