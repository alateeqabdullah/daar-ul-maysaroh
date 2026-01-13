"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  Users,
  Calendar,
  FileText,
  CheckCircle2,
  Bell,
  MessageSquare,
  Plus,
  ArrowRight,
  GraduationCap,
  Video,
  MapPin,
  Clock,
  ToggleLeft,
  ToggleRight,
  Loader2,
  X,
  UploadCloud,
  Link as LinkIcon,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Counter } from "@/components/admin/dashboard-ui";
import Link from "next/link";
import { getInitials } from "@/lib/utils";
import { toast } from "sonner";

// --- ANIMATION ---
const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};
const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1 },
};

interface Props {
  data: {
    teacherId: string;
    teacherName: string;
    isAvailable: boolean;
    myClasses: any[]; // For dropdowns
    stats: any;
    todaySchedule: any[];
    assignments: any[];
    recentSubmissions: any[];
  };
}

export default function TeacherDashboardClient({ data }: Props) {
  const router = useRouter();
  const [isAvailable, setIsAvailable] = useState(data.isAvailable);
  const [isLoading, setIsLoading] = useState(false);

  // Modal States
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isGradeOpen, setIsGradeOpen] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState<any>(null);

  // Form Data
  const [contentForm, setContentForm] = useState({
    title: "",
    description: "",
    classId: "",
    subjectId: "",
    totalMarks: "100",
    dueDate: "",
    fileUrl: "",
  });
  const [gradeForm, setGradeForm] = useState({ marks: "", feedback: "" });

  const formatTime = (time: string) => {
    const [h, m] = time.split(":");
    const hour = parseInt(h);
    const ampm = hour >= 12 ? "PM" : "AM";
    const hour12 = hour % 12 || 12;
    return `${hour12}:${m} ${ampm}`;
  };

  // --- ACTIONS ---

  const toggleAvailability = async () => {
    const newState = !isAvailable;
    setIsAvailable(newState); // Optimistic UI
    try {
      await fetch("/api/teacher/actions", {
        method: "POST",
        body: JSON.stringify({
          action: "TOGGLE_AVAILABILITY",
          data: { isAvailable: newState },
        }),
      });
      toast.success(newState ? "You are now Online" : "You are set to Away");
    } catch (error) {
      setIsAvailable(!newState);
      toast.error("Failed to update status");
    }
  };

  const handleCreateContent = async (type: "ASSIGNMENT" | "RESOURCE") => {
    if (!contentForm.title || !contentForm.classId)
      return toast.error("Title and Class are required");
    setIsLoading(true);

    try {
      const res = await fetch("/api/teacher/actions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "CREATE_CONTENT",
          data: { ...contentForm, type },
        }),
      });

      if (!res.ok) throw new Error("Failed");

      toast.success(
        type === "ASSIGNMENT" ? "Assignment Created" : "Resource Uploaded"
      );
      setIsCreateOpen(false);
      setContentForm({
        title: "",
        description: "",
        classId: "",
        subjectId: "",
        totalMarks: "100",
        dueDate: "",
        fileUrl: "",
      });
      router.refresh();
    } catch (e) {
      toast.error("Error creating content");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGrade = async () => {
    if (!gradeForm.marks) return toast.error("Marks required");
    setIsLoading(true);
    try {
      const res = await fetch("/api/teacher/actions", {
        method: "POST",
        body: JSON.stringify({
          action: "GRADE_SUBMISSION",
          data: { ...gradeForm, submissionId: selectedSubmission.id },
        }),
      });
      if (!res.ok) throw new Error("Failed");

      toast.success("Graded Successfully");
      setIsGradeOpen(false);
      setGradeForm({ marks: "", feedback: "" });
      router.refresh();
    } catch (e) {
      toast.error("Error submitting grade");
    } finally {
      setIsLoading(false);
    }
  };

  const startClass = (id: string) => {
    toast.loading("Starting virtual classroom...");
    setTimeout(() => {
      toast.dismiss();
      toast.success("Class Started!", {
        description: "Redirecting to Zoom...",
      });
      // router.push('/classroom/' + id);
    }, 1500);
  };

  // derived state for subjects based on selected class
  const availableSubjects =
    data.myClasses.find((c) => c.id === contentForm.classId)?.subjects || [];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-8 pb-10"
    >
      {/* 1. WELCOME HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Welcome back,{" "}
            <span className="text-indigo-600">
              {data.teacherName.split(" ")[0]}
            </span>{" "}
            👋
          </h1>
          <p className="text-muted-foreground mt-1">
            Here is your daily briefing.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-white dark:bg-slate-900 border px-3 py-1.5 rounded-full shadow-sm">
            <span
              className={`text-xs font-bold ${
                isAvailable ? "text-green-600" : "text-slate-400"
              }`}
            >
              {isAvailable ? "Online" : "Away"}
            </span>
            <button onClick={toggleAvailability} className="focus:outline-none">
              {isAvailable ? (
                <ToggleRight className="h-8 w-8 text-green-500" />
              ) : (
                <ToggleLeft className="h-8 w-8 text-slate-300" />
              )}
            </button>
          </div>
          <Button
            onClick={() => setIsCreateOpen(true)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full px-6 shadow-lg shadow-indigo-200 dark:shadow-none"
          >
            <Plus className="h-4 w-4 mr-2" /> Create Content
          </Button>
        </div>
      </div>

      {/* 2. BENTO STATS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Active Classes */}
        <motion.div variants={itemVariants}>
          <Card className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white border-0 shadow-lg relative overflow-hidden h-full">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <BookOpen className="h-24 w-24" />
            </div>
            <CardContent className="p-6 relative z-10 flex flex-col justify-between h-full">
              <div>
                <p className="text-indigo-100 text-xs font-bold uppercase tracking-wider">
                  Active Classes
                </p>
                <h3 className="text-4xl font-extrabold mt-2">
                  <Counter value={data.stats.totalClasses} />
                </h3>
              </div>
              <div className="mt-4 text-xs font-medium bg-white/20 w-fit px-2 py-1 rounded backdrop-blur-sm cursor-pointer hover:bg-white/30 transition">
                View Schedule
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Total Students */}
        <motion.div variants={itemVariants}>
          <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm h-full">
            <CardContent className="p-6 flex flex-col justify-between h-full">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">
                    Students
                  </p>
                  <h3 className="text-3xl font-bold mt-2 text-slate-900 dark:text-white">
                    <Counter value={data.stats.totalStudents} />
                  </h3>
                </div>
                <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-600">
                  <Users className="h-5 w-5" />
                </div>
              </div>
              <div className="mt-4">
                <div className="flex justify-between text-xs mb-1">
                  <span>Avg Attendance</span>
                  <span className="text-green-600 font-bold">94%</span>
                </div>
                <Progress value={94} className="h-1.5" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Pending Grading */}
        <motion.div variants={itemVariants}>
          <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm h-full">
            <CardContent className="p-6 flex flex-col justify-between h-full">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-amber-600 text-xs font-bold uppercase tracking-wider">
                    To Grade
                  </p>
                  <h3 className="text-3xl font-bold mt-2 text-slate-900 dark:text-white">
                    <Counter value={data.stats.pendingGrades} />
                  </h3>
                </div>
                <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg text-amber-600">
                  <FileText className="h-5 w-5" />
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                Submissions waiting review
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Active Tasks */}
        <motion.div variants={itemVariants}>
          <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm h-full">
            <CardContent className="p-6 flex flex-col justify-between h-full">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-purple-600 text-xs font-bold uppercase tracking-wider">
                    Assignments
                  </p>
                  <h3 className="text-3xl font-bold mt-2 text-slate-900 dark:text-white">
                    <Counter value={data.stats.assignmentsCount} />
                  </h3>
                </div>
                <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg text-purple-600">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                Active for this term
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 3. TIMELINE & GRADING */}
        <motion.div variants={itemVariants} className="lg:col-span-2 space-y-6">
          {/* Schedule */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Calendar className="h-5 w-5 text-indigo-600" /> Today's
                Schedule
              </h2>
            </div>

            {data.todaySchedule.length > 0 ? (
              data.todaySchedule.map((session: any, i: number) => (
                <div key={session.id} className="group relative flex gap-4">
                  <div className="w-20 text-right pt-2 flex-shrink-0">
                    <p className="text-sm font-bold text-slate-700 dark:text-slate-200">
                      {formatTime(session.startTime)}
                    </p>
                    <p className="text-xs text-slate-400">
                      {formatTime(session.endTime)}
                    </p>
                  </div>
                  <div className="relative flex flex-col items-center">
                    <div className="w-3 h-3 rounded-full bg-indigo-600 border-2 border-white dark:border-slate-950 z-10" />
                    {i !== data.todaySchedule.length - 1 && (
                      <div className="w-0.5 h-full bg-slate-200 dark:bg-slate-800 -mt-1" />
                    )}
                  </div>
                  <Card className="flex-1 mb-2 hover:shadow-md transition-shadow border-slate-200 dark:border-slate-800">
                    <CardContent className="p-4 flex justify-between items-center">
                      <div>
                        <h4 className="font-bold text-slate-900 dark:text-white">
                          {session.class.name}
                        </h4>
                        <div className="flex items-center gap-3 mt-1 text-xs text-slate-500">
                          <span className="font-mono bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">
                            {session.class.code}
                          </span>
                          <span className="flex items-center gap-1">
                            {session.isLive ? (
                              <>
                                <Video className="h-3 w-3 text-blue-500" />{" "}
                                Online
                              </>
                            ) : (
                              <>
                                <MapPin className="h-3 w-3 text-amber-500" />{" "}
                                Room 101
                              </>
                            )}
                          </span>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-indigo-200 text-indigo-600 hover:bg-indigo-50"
                        onClick={() => startClass(session.id)}
                      >
                        Start Class
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              ))
            ) : (
              <div className="p-8 text-center bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-dashed">
                <Clock className="h-10 w-10 text-slate-300 mx-auto mb-2" />
                <p className="text-slate-500">
                  No classes scheduled for today.
                </p>
              </div>
            )}
          </div>

          {/* Grading Queue */}
          <div className="pt-8">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-4">
              <GraduationCap className="h-5 w-5 text-emerald-600" /> Needs
              Grading
            </h2>
            <div className="grid gap-3">
              {data.recentSubmissions.map((sub: any) => (
                <div
                  key={sub.id}
                  className="flex items-center justify-between p-3 bg-white dark:bg-slate-900 border rounded-xl shadow-sm cursor-pointer hover:border-indigo-200 transition-all"
                  onClick={() => {
                    setSelectedSubmission(sub);
                    setIsGradeOpen(true);
                  }}
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={sub.student.user.image} />
                      <AvatarFallback>
                        {getInitials(sub.student.user.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-bold text-slate-900 dark:text-white">
                        {sub.student.user.name}
                      </p>
                      <p className="text-xs text-slate-500">
                        {sub.assignment.title}
                      </p>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-xs text-indigo-600 font-medium group"
                  >
                    Grade{" "}
                    <ArrowRight className="h-3 w-3 ml-1 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              ))}
              {data.recentSubmissions.length === 0 && (
                <p className="text-sm text-slate-500 italic">
                  No pending submissions.
                </p>
              )}
            </div>
          </div>
        </motion.div>

        {/* 4. RIGHT SIDEBAR (Quick Actions & List) */}
        <motion.div variants={itemVariants} className="space-y-6">
          {/* Quick Action Card */}
          <Card className="bg-indigo-900 text-white border-0 overflow-hidden relative">
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
            <CardContent className="p-6">
              <h3 className="font-bold text-lg mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Button
                  variant="secondary"
                  className="w-full justify-start bg-white/10 hover:bg-white/20 text-white border-0 h-11"
                  asChild
                >
                  <Link href="/teacher/attendance">
                    <CheckCircle2 className="mr-2 h-4 w-4" /> Mark Attendance
                  </Link>
                </Button>
                <Button
                  variant="secondary"
                  className="w-full justify-start bg-white/10 hover:bg-white/20 text-white border-0 h-11"
                  asChild
                >
                  <Link href="/teacher/students">
                    <Users className="mr-2 h-4 w-4" /> Student Directory
                  </Link>
                </Button>
                <Button
                  variant="secondary"
                  className="w-full justify-start bg-white/10 hover:bg-white/20 text-white border-0 h-11"
                  asChild
                >
                  <Link href="/teacher/grades">
                    <FileText className="mr-2 h-4 w-4" /> Gradebook
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Assignments List */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm uppercase tracking-wider text-muted-foreground">
                Active Assignments
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                {data.assignments.length > 0 ? (
                  data.assignments.map((a: any) => (
                    <div
                      key={a.id}
                      className="p-4 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors flex justify-between items-center group cursor-pointer"
                    >
                      <div>
                        <p className="font-medium text-sm">{a.title}</p>
                        <p className="text-xs text-slate-500">
                          {a.subject.name}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-bold block text-slate-700 dark:text-slate-300">
                          {a._count.submissions} Subs
                        </span>
                        <span className="text-[10px] text-red-500">
                          Due {new Date(a.dueDate).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-6 text-center text-xs text-muted-foreground">
                    No active assignments
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* --- CREATE CONTENT MODAL --- */}
      <AnimatePresence>
        {isCreateOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsCreateOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-slate-950 w-full max-w-lg rounded-2xl shadow-2xl border p-6"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Create Content</h2>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => setIsCreateOpen(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <Tabs defaultValue="assignment">
                <TabsList className="grid w-full grid-cols-2 mb-4">
                  <TabsTrigger value="assignment">Assignment</TabsTrigger>
                  <TabsTrigger value="resource">Resource</TabsTrigger>
                </TabsList>

                <TabsContent value="assignment" className="space-y-4">
                  <div className="space-y-1">
                    <Label>Title</Label>
                    <Input
                      value={contentForm.title}
                      onChange={(e) =>
                        setContentForm({
                          ...contentForm,
                          title: e.target.value,
                        })
                      }
                      placeholder="e.g. Surah Review"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <Label>Class</Label>
                      <Select
                        onValueChange={(v) =>
                          setContentForm({
                            ...contentForm,
                            classId: v,
                            subjectId: "",
                          })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select Class" />
                        </SelectTrigger>
                        <SelectContent>
                          {data.myClasses.map((c: any) => (
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
                        onValueChange={(v) =>
                          setContentForm({ ...contentForm, subjectId: v })
                        }
                        disabled={!contentForm.classId}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Subject" />
                        </SelectTrigger>
                        <SelectContent>
                          {availableSubjects.map((s: any) => (
                            <SelectItem key={s.id} value={s.id}>
                              {s.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <Label>Total Marks</Label>
                      <Input
                        type="number"
                        value={contentForm.totalMarks}
                        onChange={(e) =>
                          setContentForm({
                            ...contentForm,
                            totalMarks: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="space-y-1">
                      <Label>Due Date</Label>
                      <Input
                        type="date"
                        value={contentForm.dueDate}
                        onChange={(e) =>
                          setContentForm({
                            ...contentForm,
                            dueDate: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <Label>Description</Label>
                    <Textarea
                      value={contentForm.description}
                      onChange={(e) =>
                        setContentForm({
                          ...contentForm,
                          description: e.target.value,
                        })
                      }
                    />
                  </div>
                  <Button
                    className="w-full bg-purple-600 hover:bg-purple-700"
                    onClick={() => handleCreateContent("ASSIGNMENT")}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <Loader2 className="animate-spin" />
                    ) : (
                      "Create Assignment"
                    )}
                  </Button>
                </TabsContent>

                <TabsContent value="resource" className="space-y-4">
                  <div className="space-y-1">
                    <Label>Resource Title</Label>
                    <Input
                      value={contentForm.title}
                      onChange={(e) =>
                        setContentForm({
                          ...contentForm,
                          title: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="space-y-1">
                    <Label>Class</Label>
                    <Select
                      onValueChange={(v) =>
                        setContentForm({ ...contentForm, classId: v })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Class" />
                      </SelectTrigger>
                      <SelectContent>
                        {data.myClasses.map((c: any) => (
                          <SelectItem key={c.id} value={c.id}>
                            {c.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1">
                    <Label>Link / URL</Label>
                    <div className="flex gap-2">
                      <Input
                        value={contentForm.fileUrl}
                        onChange={(e) =>
                          setContentForm({
                            ...contentForm,
                            fileUrl: e.target.value,
                          })
                        }
                        placeholder="https://..."
                      />
                      <Button size="icon" variant="outline">
                        <UploadCloud className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <Button
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    onClick={() => handleCreateContent("RESOURCE")}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <Loader2 className="animate-spin" />
                    ) : (
                      "Upload Resource"
                    )}
                  </Button>
                </TabsContent>
              </Tabs>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- GRADING MODAL --- */}
      <AnimatePresence>
        {isGradeOpen && selectedSubmission && (
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
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-xl font-bold">Grade Submission</h2>
                  <p className="text-sm text-muted-foreground">
                    {selectedSubmission.student.user.name} •{" "}
                    {selectedSubmission.assignment.title}
                  </p>
                </div>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => setIsGradeOpen(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <div className="space-y-4">
                <div className="space-y-1">
                  <Label>
                    Marks (Out of {selectedSubmission.assignment.totalMarks})
                  </Label>
                  <Input
                    type="number"
                    value={gradeForm.marks}
                    onChange={(e) =>
                      setGradeForm({ ...gradeForm, marks: e.target.value })
                    }
                    autoFocus
                  />
                </div>
                <div className="space-y-1">
                  <Label>Feedback</Label>
                  <Textarea
                    value={gradeForm.feedback}
                    onChange={(e) =>
                      setGradeForm({ ...gradeForm, feedback: e.target.value })
                    }
                    placeholder="Great job..."
                  />
                </div>
                <Button
                  className="w-full bg-green-600 hover:bg-green-700"
                  onClick={handleGrade}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    "Submit Grade"
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
