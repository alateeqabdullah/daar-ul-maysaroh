"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Users,
  MoreVertical,
  UserCheck,
  AlertCircle,
  Download,
  Star,
  Phone,
  Mail,
  X,
  MessageSquare,
  Loader2,
  Book,
  Plus,
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
  show: { y: 0, opacity: 1 },
};

interface Props {
  initialStudents: any[];
  stats: any;
}

export default function TeacherStudentsClient({
  initialStudents,
  stats,
}: Props) {
  const [students, setStudents] = useState(initialStudents);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("ALL");

  // Selection & Modals
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isLogOpen, setIsLogOpen] = useState(false);

  // Extended Data (Fetched on demand)
  const [extendedData, setExtendedData] = useState<any>(null);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);

  // Forms
  const [logData, setLogData] = useState({
    surah: "",
    startAyah: "",
    endAyah: "",
    mistakes: "0",
    status: "PASS",
    comments: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // --- FILTERING ---
  const filteredStudents = useMemo(() => {
    return students.filter((s) => {
      const matchesSearch =
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.email.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus =
        filterStatus === "ALL" ||
        (filterStatus === "At Risk"
          ? s.status === "At Risk"
          : s.status === "Active");
      return matchesSearch && matchesStatus;
    });
  }, [students, searchQuery, filterStatus]);

  // --- ACTIONS ---

  const fetchExtendedDetails = async (studentId: string) => {
    setIsLoadingDetails(true);
    setExtendedData(null);
    try {
      // Assuming you have the route /api/admin/students/details?studentId=... (reusing admin route or creating teacher specific)
      // Since we defined /api/admin/students/details earlier, we can reuse it if the role check allows TEACHER
      // Or create /api/teacher/students/details. Let's assume we use the API we built.
      const res = await fetch(
        `/api/admin/students/details?studentId=${studentId}`
      );
      if (res.ok) setExtendedData(await res.json());
    } catch {
      toast.error("Could not load full details");
    } finally {
      setIsLoadingDetails(false);
    }
  };

  const handleOpenDetail = (s: any) => {
    setSelectedStudent(s);
    setIsDetailOpen(true);
    fetchExtendedDetails(s.id);
  };

  const handleLogProgress = async () => {
    if (!logData.surah || !logData.endAyah)
      return toast.error("Surah and End Ayah required");
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/teacher/students/actions", {
        method: "POST",
        body: JSON.stringify({
          action: "LOG_HIFZ",
          data: { ...logData, studentId: selectedStudent.id },
        }),
      });

      if (!res.ok) throw new Error();

      // Optimistic Update
      const newLevel = `Surah ${logData.surah} : ${logData.endAyah}`;
      setStudents((prev) =>
        prev.map((s) =>
          s.id === selectedStudent.id ? { ...s, hifzLevel: newLevel } : s
        )
      );

      // Update extended data if open
      if (extendedData) {
        setExtendedData({
          ...extendedData,
          quranProgress: [
            {
              surahName: `Surah ${logData.surah}`,
              fromAyah: parseInt(logData.startAyah),
              toAyah: parseInt(logData.endAyah),
              status: logData.status,
              createdAt: new Date().toISOString(),
            },
            ...(extendedData.quranProgress || []),
          ],
        });
      }

      toast.success("Progress Logged");
      setIsLogOpen(false);
      setLogData({
        surah: "",
        startAyah: "",
        endAyah: "",
        mistakes: "0",
        status: "PASS",
        comments: "",
      });
    } catch {
      toast.error("Failed to log progress");
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- STATS CONFIG ---
  const statCards = [
    {
      label: "Total Students",
      value: stats.total,
      icon: Users,
      color: "from-blue-500 to-indigo-500",
      shadow: "shadow-blue-500/20",
    },
    {
      label: "Avg Attendance",
      value: `${stats.avgAttendance}%`,
      icon: UserCheck,
      color: "from-emerald-500 to-green-500",
      shadow: "shadow-emerald-500/20",
    },
    {
      label: "At Risk",
      value: stats.atRisk,
      icon: AlertCircle,
      color: "from-rose-500 to-red-500",
      shadow: "shadow-rose-500/20",
    },
    {
      label: "Top Performers",
      value: "8",
      icon: Star,
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
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            My Students
          </h1>
          <p className="text-muted-foreground mt-1">
            Track performance, attendance, and Hifz progress
          </p>
        </div>
        <div className="flex gap-2">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search students..."
              className="pl-9 bg-white dark:bg-slate-900"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" /> Export
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

      {/* STUDENTS GRID */}
      <motion.div
        variants={containerVariants}
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {filteredStudents.map((s) => (
          <motion.div key={s.id} variants={itemVariants} layoutId={s.id}>
            <Card
              className="group border hover:border-indigo-300 dark:hover:border-indigo-800 transition-all hover:shadow-xl bg-card overflow-hidden cursor-pointer"
              onClick={() => handleOpenDetail(s)}
            >
              {/* Header Gradient */}
              <div
                className={cn(
                  "h-2 w-full",
                  s.status === "At Risk"
                    ? "bg-rose-500"
                    : "bg-gradient-to-r from-blue-500 to-indigo-500"
                )}
              />

              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <Avatar className="h-16 w-16 border-2 border-white shadow-md">
                    <AvatarImage src={s.image} />
                    <AvatarFallback className="text-xl bg-indigo-50 text-indigo-600 font-bold">
                      {getInitials(s.name)}
                    </AvatarFallback>
                  </Avatar>
                  <Badge
                    variant={s.status === "At Risk" ? "destructive" : "outline"}
                    className={
                      s.status === "Active"
                        ? "text-green-600 border-green-200 bg-green-50"
                        : ""
                    }
                  >
                    {s.status}
                  </Badge>
                </div>

                <div>
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                    {s.name}
                  </h3>
                  <p className="text-xs text-muted-foreground">{s.className}</p>
                </div>

                <div className="grid grid-cols-2 gap-3 my-6">
                  <div className="bg-muted/40 p-2.5 rounded-lg border border-muted/50">
                    <p className="text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1">
                      <UserCheck className="h-3 w-3" /> Attendance
                    </p>
                    <p className="font-bold text-sm mt-1">
                      {s.attendanceRate}%
                    </p>
                  </div>
                  <div className="bg-muted/40 p-2.5 rounded-lg border border-muted/50">
                    <p className="text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1">
                      <Book className="h-3 w-3" /> Hifz
                    </p>
                    <p className="font-bold text-sm mt-1 truncate">
                      {s.hifzLevel}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    size="sm"
                    className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedStudent(s);
                      setIsLogOpen(true);
                    }}
                  >
                    <Plus className="h-3 w-3 mr-1" /> Log Hifz
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button size="icon" variant="outline">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleOpenDetail(s)}>
                        View Profile
                      </DropdownMenuItem>
                      <DropdownMenuItem>Message Parent</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* --- DETAIL SLIDE OVER (Apple Style) --- */}
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
              {/* Detail Header */}
              <div className="h-48 bg-gradient-to-br from-indigo-600 to-purple-700 p-8 flex flex-col justify-end relative shrink-0">
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
                    <AvatarImage src={selectedStudent.image} />
                    <AvatarFallback className="text-3xl bg-slate-100 text-slate-600">
                      {getInitials(selectedStudent.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="mb-2 text-white">
                    <h2 className="text-2xl font-bold">
                      {selectedStudent.name}
                    </h2>
                    <div className="flex items-center gap-2 text-indigo-100 text-sm">
                      <Mail className="h-3 w-3" /> {selectedStudent.email}
                    </div>
                  </div>
                </div>
              </div>

              {/* Detail Body */}
              <div className="flex-1 overflow-y-auto p-0">
                <Tabs defaultValue="overview" className="w-full">
                  <TabsList className="w-full justify-start rounded-none border-b bg-muted/20 p-0 h-12">
                    <TabsTrigger
                      value="overview"
                      className="h-full rounded-none border-b-2 border-transparent data-[state=active]:border-indigo-600 data-[state=active]:bg-transparent px-6"
                    >
                      Overview
                    </TabsTrigger>
                    <TabsTrigger
                      value="hifz"
                      className="h-full rounded-none border-b-2 border-transparent data-[state=active]:border-indigo-600 data-[state=active]:bg-transparent px-6"
                    >
                      Hifz Logs
                    </TabsTrigger>
                    <TabsTrigger
                      value="academic"
                      className="h-full rounded-none border-b-2 border-transparent data-[state=active]:border-indigo-600 data-[state=active]:bg-transparent px-6"
                    >
                      Academics
                    </TabsTrigger>
                  </TabsList>

                  <div className="p-6">
                    <TabsContent value="overview" className="mt-0 space-y-6">
                      {/* Guardian Card */}
                      <Card>
                        <CardContent className="p-4 flex items-center justify-between">
                          <div>
                            <p className="text-xs font-bold text-muted-foreground uppercase mb-1">
                              Guardian
                            </p>
                            {selectedStudent.parent ? (
                              <div>
                                <p className="font-semibold text-sm">
                                  {selectedStudent.parent.name}
                                </p>
                                <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                                  <Phone className="h-3 w-3" />{" "}
                                  {selectedStudent.parent.phone || "N/A"}
                                </div>
                              </div>
                            ) : (
                              <p className="text-sm italic text-muted-foreground">
                                No guardian linked
                              </p>
                            )}
                          </div>
                          {selectedStudent.parent && (
                            <Button size="sm" variant="outline">
                              <MessageSquare className="h-4 w-4 mr-2" /> Message
                            </Button>
                          )}
                        </CardContent>
                      </Card>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 rounded-xl bg-green-50 border border-green-100 text-green-800">
                          <p className="text-xs uppercase font-bold opacity-70">
                            Attendance
                          </p>
                          <p className="text-2xl font-bold mt-1">
                            {selectedStudent.attendanceRate}%
                          </p>
                        </div>
                        <div className="p-4 rounded-xl bg-blue-50 border border-blue-100 text-blue-800">
                          <p className="text-xs uppercase font-bold opacity-70">
                            Current Level
                          </p>
                          <p className="text-xl font-bold mt-1 truncate">
                            {selectedStudent.hifzLevel}
                          </p>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="hifz" className="mt-0">
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <h3 className="font-semibold text-sm uppercase text-muted-foreground">
                            Recent Logs
                          </h3>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setIsLogOpen(true)}
                          >
                            <Plus className="h-3 w-3 mr-2" /> Log Entry
                          </Button>
                        </div>
                        {isLoadingDetails ? (
                          <div className="flex justify-center py-8">
                            <Loader2 className="animate-spin text-indigo-600" />
                          </div>
                        ) : extendedData?.quranProgress?.length > 0 ? (
                          <div className="space-y-2">
                            {extendedData.quranProgress.map(
                              (log: any, i: number) => (
                                <div
                                  key={i}
                                  className="flex items-center justify-between p-3 bg-white dark:bg-slate-900 border rounded-lg"
                                >
                                  <div className="flex items-center gap-3">
                                    <div
                                      className={`w-2 h-2 rounded-full ${
                                        log.status === "PASS"
                                          ? "bg-green-500"
                                          : log.status === "FAIL"
                                          ? "bg-red-500"
                                          : "bg-amber-500"
                                      }`}
                                    />
                                    <div>
                                      <p className="font-bold text-sm">
                                        {log.surahName}
                                      </p>
                                      <p className="text-xs text-muted-foreground">
                                        Ayah {log.fromAyah} - {log.toAyah}
                                      </p>
                                    </div>
                                  </div>
                                  <span className="text-xs text-slate-400">
                                    {new Date(
                                      log.createdAt
                                    ).toLocaleDateString()}
                                  </span>
                                </div>
                              )
                            )}
                          </div>
                        ) : (
                          <div className="text-center py-10 border border-dashed rounded-xl text-muted-foreground">
                            <Book className="h-8 w-8 mx-auto mb-2 opacity-20" />{" "}
                            No records yet
                          </div>
                        )}
                      </div>
                    </TabsContent>

                    <TabsContent value="academic" className="mt-0">
                      <div className="space-y-4">
                        <h3 className="font-semibold text-sm uppercase text-muted-foreground">
                          Grades & Attendance
                        </h3>
                        {isLoadingDetails ? (
                          <div className="flex justify-center py-8">
                            <Loader2 className="animate-spin text-indigo-600" />
                          </div>
                        ) : (
                          <div className="space-y-3">
                            {extendedData?.grades?.map((g: any, i: number) => (
                              <div
                                key={i}
                                className="flex justify-between items-center p-3 border rounded-lg"
                              >
                                <span className="text-sm font-medium">
                                  {g.subject.name}
                                </span>
                                <Badge
                                  variant={
                                    g.score >= 80 ? "default" : "secondary"
                                  }
                                >
                                  {g.score}%
                                </Badge>
                              </div>
                            ))}
                            {(!extendedData?.grades ||
                              extendedData.grades.length === 0) && (
                              <p className="text-sm text-slate-500">
                                No grades recorded.
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    </TabsContent>
                  </div>
                </Tabs>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- LOG PROGRESS MODAL --- */}
      <AnimatePresence>
        {isLogOpen && (
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
              className="bg-white dark:bg-slate-950 w-full max-w-md rounded-2xl shadow-2xl border p-6"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Log Hifz Progress</h2>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => setIsLogOpen(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <div className="space-y-4">
                <div className="space-y-1">
                  <Label>Surah Number</Label>
                  <Input
                    type="number"
                    placeholder="e.g. 18 (Kahf)"
                    value={logData.surah}
                    onChange={(e) =>
                      setLogData({ ...logData, surah: e.target.value })
                    }
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <Label>Start Ayah</Label>
                    <Input
                      type="number"
                      value={logData.startAyah}
                      onChange={(e) =>
                        setLogData({ ...logData, startAyah: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-1">
                    <Label>End Ayah</Label>
                    <Input
                      type="number"
                      value={logData.endAyah}
                      onChange={(e) =>
                        setLogData({ ...logData, endAyah: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <Label>Mistakes</Label>
                    <Input
                      type="number"
                      value={logData.mistakes}
                      onChange={(e) =>
                        setLogData({ ...logData, mistakes: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-1">
                    <Label>Status</Label>
                    <Select
                      value={logData.status}
                      onValueChange={(v) =>
                        setLogData({ ...logData, status: v })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="PASS">Pass</SelectItem>
                        <SelectItem value="NEEDS_PRACTICE">
                          Needs Practice
                        </SelectItem>
                        <SelectItem value="FAIL">Fail</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-1">
                  <Label>Comments</Label>
                  <Textarea
                    value={logData.comments}
                    onChange={(e) =>
                      setLogData({ ...logData, comments: e.target.value })
                    }
                    placeholder="Notes..."
                  />
                </div>

                <Button
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white mt-2"
                  onClick={handleLogProgress}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    "Save Log"
                  )}
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
