"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Book,
  TrendingUp,
  Target,
  AlertTriangle,
  Search,
  Plus,
  MoreVertical,
  Clock,
  CheckCircle2,
  XCircle,
  Loader2,
  Play,
  LayoutGrid,
  List as ListIcon,
  Download,
  ArrowLeft,
  Mic,
  Save,
  History,
  X,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { getInitials, cn } from "@/lib/utils";
import { Counter } from "@/components/admin/dashboard-ui";

// Import Strict Types
import { QuranStudent, QuranLog, QuranStats } from "@/types/quran";

// --- ANIMATION ---
const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } },
};
const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1 },
};
const slideUpVariants = {
  hidden: { y: "100%" },
  visible: {
    y: 0,
    transition: { type: "spring", damping: 25, stiffness: 200 },
  },
};

interface Props {
  students: QuranStudent[];
  logs: QuranLog[];
  stats: QuranStats;
}

// Form Interface
interface LogFormState {
  studentId: string;
  surah: string;
  startAyah: string;
  endAyah: string;
  mistakes: string;
  status: "EXCELLENT" | "PASS" | "NEEDS_PRACTICE" | "FAIL";
  comments: string;
}

export default function QuranTrackerClient({
  students,
  logs: initialLogs,
  stats,
}: Props) {
  const [logs, setLogs] = useState<QuranLog[]>(initialLogs);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  const [isLoading, setIsLoading] = useState(false);

  // View State
  const [mode, setMode] = useState<"LIST" | "LOG">("LIST");

  // Selection
  const [selectedStudent, setSelectedStudent] = useState<QuranStudent | null>(
    null,
  );
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  // Form
  const [formData, setFormData] = useState<LogFormState>({
    studentId: "",
    surah: "",
    startAyah: "",
    endAyah: "",
    mistakes: "0",
    status: "PASS",
    comments: "",
  });

  // --- FILTER LOGIC ---
  const filteredStudents = useMemo(() => {
    return students.filter(
      (s) =>
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.email.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [students, searchQuery]);

  const studentLogs = useMemo(() => {
    return logs.filter((l) => l.studentId === selectedStudent?.id);
  }, [logs, selectedStudent]);

  // --- ACTIONS ---

  const handleLogSession = async () => {
    if (!formData.studentId || !formData.surah || !formData.endAyah) {
      return toast.error("Please fill required fields");
    }
    setIsLoading(true);

    try {
      const res = await fetch("/api/teacher/quran/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "LOG_SESSION",
          data: formData,
        }),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.error);

      setLogs([result.log, ...logs]);
      toast.success("Progress Logged");
      setMode("LIST");

      // Reset form but keep generic fields
      setFormData({
        studentId: "",
        surah: "",
        startAyah: "",
        endAyah: "",
        mistakes: "0",
        status: "PASS",
        comments: "",
      });
    } catch (e) {
      toast.error("Failed to save");
    } finally {
      setIsLoading(false);
    }
  };

  const getRatingColor = (status: string) => {
    switch (status) {
      case "EXCELLENT":
        return "text-emerald-600 bg-emerald-50 border-emerald-200";
      case "PASS":
        return "text-blue-600 bg-blue-50 border-blue-200";
      case "NEEDS_PRACTICE":
        return "text-amber-600 bg-amber-50 border-amber-200";
      case "FAIL":
        return "text-rose-600 bg-rose-50 border-rose-200";
      default:
        return "text-slate-600";
    }
  };

  const getStatusBadge = (status: string) => {
    if (status === "Active")
      return (
        <Badge className="bg-green-100 text-green-700 hover:bg-green-200">
          Active
        </Badge>
      );
    if (status === "At Risk")
      return (
        <Badge
          variant="destructive"
          className="bg-rose-100 text-rose-700 hover:bg-rose-200 border-rose-200"
        >
          At Risk
        </Badge>
      );
    return <Badge variant="secondary">Inactive</Badge>;
  };

  // --- RENDER: LIST VIEW ---
  if (mode === "LIST") {
    const statCards = [
      {
        label: "Active Reciters",
        value: stats.activeReciters,
        icon: TrendingUp,
        color: "from-emerald-500 to-teal-500",
        shadow: "shadow-emerald-500/20",
      },
      {
        label: "Juz Completed",
        value: stats.totalJuzCompleted,
        icon: Target,
        color: "from-blue-500 to-cyan-500",
        shadow: "shadow-blue-500/20",
      },
      {
        label: "Needs Attention",
        value: stats.needsAttention,
        icon: AlertTriangle,
        color: "from-rose-500 to-red-500",
        shadow: "shadow-rose-500/20",
      },
      {
        label: "Total Students",
        value: stats.totalStudents,
        icon: Book,
        color: "from-purple-500 to-indigo-500",
        shadow: "shadow-purple-500/20",
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
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              Quran Tracker
            </h1>
            <p className="text-muted-foreground mt-1">
              Monitor Hifz memorization and Tajweed performance
            </p>
          </div>
          <div className="flex gap-2">
            <div className="flex items-center bg-muted p-1 rounded-lg border">
              <Button
                size="icon"
                variant={viewMode === "grid" ? "white" : "ghost"}
                onClick={() => setViewMode("grid")}
              >
                <LayoutGrid className="h-4 w-4" />
              </Button>
              <Button
                size="icon"
                variant={viewMode === "list" ? "white" : "ghost"}
                onClick={() => setViewMode("list")}
              >
                <ListIcon className="h-4 w-4" />
              </Button>
            </div>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" /> Export
            </Button>
            <Button
              className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md hover:scale-105 transition-all gap-2"
              onClick={() => {
                setFormData({ ...formData, studentId: "" });
                setMode("LOG");
              }}
            >
              <Mic className="h-4 w-4 mr-2" /> Log Session
            </Button>
          </div>
        </div>

        {/* STATS */}
        <motion.div
          variants={containerVariants}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {statCards.map((stat, i) => (
            <motion.div key={i} variants={itemVariants}>
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
              placeholder="Search students..."
              className="pl-9 bg-white dark:bg-slate-950 border-muted"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </motion.div>

        {/* CONTENT */}
        {viewMode === "grid" ? (
          <motion.div
            variants={containerVariants}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {filteredStudents.map((s) => (
              <motion.div key={s.id} variants={itemVariants} layoutId={s.id}>
                <Card
                  className="group h-full border hover:border-emerald-300 dark:hover:border-emerald-800 transition-all hover:shadow-xl bg-card cursor-pointer"
                  onClick={() => {
                    setSelectedStudent(s);
                    setIsDetailOpen(true);
                  }}
                >
                  <CardContent className="p-6 flex flex-col h-full">
                    <div className="flex justify-between items-start mb-4">
                      {getStatusBadge(s.status)}
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8 -mr-2"
                      >
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex items-center gap-3 mb-4">
                      <Avatar className="h-12 w-12 border-2 border-emerald-100">
                        <AvatarImage src={s.image || undefined} />
                        <AvatarFallback className="bg-emerald-50 text-emerald-700">
                          {getInitials(s.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-bold text-sm leading-tight">
                          {s.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Current: Surah {s.currentSurah}
                        </p>
                      </div>
                    </div>
                    <div className="mt-auto pt-4 border-t flex justify-between items-center text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" /> Last: {s.lastRecited}
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-auto p-0 hover:text-emerald-600"
                      >
                        History
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div variants={containerVariants}>
            <Card className="border-none shadow-sm overflow-hidden bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-muted/30 border-b">
                      <tr>
                        <th className="px-6 py-4 text-left">Student</th>
                        <th className="px-6 py-4 text-left">Level</th>
                        <th className="px-6 py-4 text-left">Goal</th>
                        <th className="px-6 py-4 text-left">Last Recited</th>
                        <th className="px-6 py-4 text-left">Status</th>
                        <th className="px-6 py-4 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {filteredStudents.map((s) => (
                        <motion.tr
                          key={s.id}
                          variants={itemVariants}
                          className="group hover:bg-muted/40 transition-colors cursor-pointer"
                          onClick={() => {
                            setSelectedStudent(s);
                            setIsDetailOpen(true);
                          }}
                        >
                          <td className="px-6 py-4 font-medium flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={s.image || undefined} />
                              <AvatarFallback>
                                {getInitials(s.name)}
                              </AvatarFallback>
                            </Avatar>{" "}
                            {s.name}
                          </td>
                          <td className="px-6 py-4">{s.hifzLevel}</td>
                          <td className="px-6 py-4 text-muted-foreground">
                            {s.goal}
                          </td>
                          <td className="px-6 py-4">{s.lastRecited}</td>
                          <td className="px-6 py-4">
                            {getStatusBadge(s.status)}
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

        {/* --- DETAIL SLIDE-OVER --- */}
        <AnimatePresence>
          {isDetailOpen && selectedStudent && (
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
                className="w-full max-w-xl bg-background h-full shadow-2xl border-l flex flex-col"
              >
                <div className="h-40 bg-gradient-to-br from-emerald-600 to-teal-700 p-8 flex flex-col justify-end relative shrink-0">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="absolute top-4 right-4 text-white hover:bg-white/20"
                    onClick={() => setIsDetailOpen(false)}
                  >
                    <X className="h-6 w-6" />
                  </Button>
                  <div className="flex items-end gap-5">
                    <Avatar className="h-24 w-24 border-4 border-background shadow-xl">
                      <AvatarImage src={selectedStudent.image || undefined} />
                      <AvatarFallback className="text-3xl">
                        {getInitials(selectedStudent.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="mb-2 text-white">
                      <h2 className="text-2xl font-bold">
                        {selectedStudent.name}
                      </h2>
                      <p className="text-emerald-100 text-sm">
                        Hifz Level: {selectedStudent.hifzLevel}
                      </p>
                    </div>
                    <div className="ml-auto mb-2">
                      <Button
                        variant="secondary"
                        onClick={() => {
                          setIsDetailOpen(false);
                          setFormData({
                            ...formData,
                            studentId: selectedStudent.id,
                          });
                          setMode("LOG");
                        }}
                      >
                        Log Session
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-lg flex items-center gap-2">
                      <History className="h-5 w-5 text-emerald-600" /> History
                    </h3>
                    <Badge variant="outline">
                      {studentLogs.length} Sessions
                    </Badge>
                  </div>
                  <div className="space-y-3">
                    {studentLogs.length > 0 ? (
                      studentLogs.map((log) => (
                        <div
                          key={log.id}
                          className="p-4 bg-muted/20 border rounded-xl flex justify-between items-start"
                        >
                          <div>
                            <p className="font-bold text-sm">
                              Surah {log.surah}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              Ayah {log.startAyah} - {log.endAyah}
                            </p>
                          </div>
                          <div className="text-right">
                            <Badge
                              variant="outline"
                              className={getRatingColor(log.rating)}
                            >
                              {log.rating.replace("_", " ")}
                            </Badge>
                            <p className="text-[10px] text-muted-foreground mt-1">
                              {new Date(log.date).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8 text-muted-foreground">
                        No history available
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  }

  // --- RENDER: LOGGING MODE ---
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={slideUpVariants}
      className="min-h-screen bg-slate-50/50 dark:bg-slate-950 pb-20"
    >
      <div className="max-w-md mx-auto space-y-6 pt-10">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => setMode("LIST")}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </Button>
          <h1 className="text-xl font-bold">Log Recitation</h1>
        </div>

        <Card className="border-0 shadow-lg ring-1 ring-slate-200 dark:ring-slate-800">
          <CardContent className="p-6 space-y-6">
            <div className="space-y-2">
              <Label>Student</Label>
              <Select
                value={formData.studentId}
                onValueChange={(v) =>
                  setFormData({ ...formData, studentId: v })
                }
              >
                <SelectTrigger className="h-11">
                  <SelectValue placeholder="Select Student" />
                </SelectTrigger>
                <SelectContent>
                  {students.map((s) => (
                    <SelectItem key={s.id} value={s.id}>
                      {s.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div className="space-y-1">
                <Label>Surah #</Label>
                <Input
                  type="number"
                  value={formData.surah}
                  onChange={(e) =>
                    setFormData({ ...formData, surah: e.target.value })
                  }
                  placeholder="114"
                  className="h-11"
                />
              </div>
              <div className="space-y-1">
                <Label>Start</Label>
                <Input
                  type="number"
                  value={formData.startAyah}
                  onChange={(e) =>
                    setFormData({ ...formData, startAyah: e.target.value })
                  }
                  className="h-11"
                />
              </div>
              <div className="space-y-1">
                <Label>End</Label>
                <Input
                  type="number"
                  value={formData.endAyah}
                  onChange={(e) =>
                    setFormData({ ...formData, endAyah: e.target.value })
                  }
                  className="h-11"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label>Rating</Label>
                <Select
                  value={formData.status}
                  onValueChange={(v: any) =>
                    setFormData({ ...formData, status: v })
                  }
                >
                  <SelectTrigger className="h-11">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="EXCELLENT">Excellent</SelectItem>
                    <SelectItem value="PASS">Pass</SelectItem>
                    <SelectItem value="NEEDS_PRACTICE">Practice</SelectItem>
                    <SelectItem value="FAIL">Fail</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1">
                <Label>Mistakes</Label>
                <Input
                  type="number"
                  value={formData.mistakes}
                  onChange={(e) =>
                    setFormData({ ...formData, mistakes: e.target.value })
                  }
                  className="h-11"
                />
              </div>
            </div>
            <div className="space-y-1">
              <Label>Notes</Label>
              <Textarea
                value={formData.comments}
                onChange={(e) =>
                  setFormData({ ...formData, comments: e.target.value })
                }
                placeholder="Tajweed notes..."
                className="min-h-[100px]"
              />
            </div>
            <Button
              className="w-full h-12 bg-emerald-600 hover:bg-emerald-700 text-white text-lg"
              onClick={handleLogSession}
              disabled={isLoading}
            >
              {isLoading ? <Loader2 className="animate-spin" /> : "Save Log"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}
