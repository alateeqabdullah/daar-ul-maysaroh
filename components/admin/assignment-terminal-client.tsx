"use client";

import { useState, useTransition, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Search,
  FileText,
  Clock,
  CheckCircle2,
  MoreVertical,
  ChevronRight,
  GraduationCap,
  Trash2,
  Edit,
  Loader2,
  Download,
  Award,
  Zap,
  Copy,
  RotateCcw,
  CalendarPlus,
  X,
  MessageSquare,
  BarChart3,
  LayoutGrid,
  List,
  Info,
  ShieldAlert,
  TrendingUp,
  Mic,
  HardDrive,
} from "lucide-react";

import {
  manageAssignmentNode,
  evaluateSubmissionNode,
  nudgePendingNodes,
  decommissionAssignment,
  cloneAssignment,
  resetSubmission,
} from "@/app/actions/admin/assignments/actions";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

const kContainer = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } },
};
const kItem = { hidden: { y: 20, opacity: 0 }, show: { y: 0, opacity: 1 } };

export default function AssignmentTerminalClient({
  initialAssignments,
  subjects,
}: any) {
  const [isPending, startTransition] = useTransition();
  const [search, setSearch] = useState("");

  const [activeTask, setActiveTask] = useState<any>(null);
  const [gradingSub, setGradingSub] = useState<any>(null);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<any>(null);

  const filtered = useMemo(() => {
    return initialAssignments.filter(
      (a: any) =>
        a.title.toLowerCase().includes(search.toLowerCase()) ||
        a.subject.name.toLowerCase().includes(search.toLowerCase()),
    );
  }, [initialAssignments, search]);

  const stats = useMemo(
    () => ({
      total: initialAssignments.length,
      pending: initialAssignments.reduce(
        (acc: number, curr: any) =>
          acc +
          curr.submissions.filter((s: any) => s.status === "SUBMITTED").length,
        0,
      ),
      avgWeight:
        Math.round(
          initialAssignments.reduce(
            (acc: number, curr: any) => acc + curr.weightage,
            0,
          ) / initialAssignments.length,
        ) || 0,
    }),
    [initialAssignments],
  );

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const d = Object.fromEntries(new FormData(e.currentTarget));
    startTransition(async () => {
      try {
        const res = await manageAssignmentNode({ ...d, id: editingTask?.id });
        if (res.success) {
          setIsAddOpen(false);
          setEditingTask(null);
          toast.success(editingTask ? "Node Updated" : "Task Deployed");
        }
      } catch (e: any) {
        toast.error(e.message);
      }
    });
  };

  const handleClone = (id: string) => {
    startTransition(async () => {
      try {
        await cloneAssignment(id);
        toast.success("Node Cloned");
      } catch (e: any) {
        toast.error(e.message);
      }
    });
  };

  return (
    <div className="max-w-[1700px] mx-auto space-y-6 md:space-y-10 pb-40 px-4 md:px-10 mt-4 md:mt-10">
      {/* --- RESPONSIVE STATS (Horizontal Scroll on Mobile) --- */}
      <div className="flex md:grid md:grid-cols-3 gap-4 overflow-x-auto no-scrollbar pb-2 md:pb-0">
        <SummaryCard
          label="Tasks"
          value={stats.total}
          icon={Zap}
          color="purple"
          trend="Institutional"
          className="min-w-[280px] md:min-w-0"
        />
        <SummaryCard
          label="Grading"
          value={stats.pending}
          icon={Clock}
          color="rose"
          trend="Action Needed"
          className="min-w-[280px] md:min-w-0"
        />
        <SummaryCard
          label="Weight"
          value={`${stats.avgWeight}%`}
          icon={BarChart3}
          color="emerald"
          trend="Grade Impact"
          className="min-w-[280px] md:min-w-0"
        />
      </div>

      {/* --- HEADER --- */}
      <header className="flex flex-col gap-6 md:gap-8">
        <div className="text-center md:text-left space-y-2">
          <Badge className="bg-primary-700/10 text-primary-700 dark:text-primary-300 border-0 font-black text-[10px] uppercase tracking-[0.3em] px-4 py-1.5 rounded-full">
            Deployment v2.6
          </Badge>
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-none text-slate-900 dark:text-white">
            Task <span className="text-primary-700">Control</span>
          </h1>
        </div>

        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1 group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-primary-700 transition-colors" />
            <input
              placeholder="Search curriculum..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-14 md:h-20 pl-14 glass-surface rounded-2xl md:rounded-[2.5rem] outline-none border-0 focus:ring-4 ring-primary-700/10 font-bold dark:bg-slate-900"
            />
          </div>
          <Button
            onClick={() => {
              setEditingTask(null);
              setIsAddOpen(true);
            }}
            className="h-14 md:h-20 px-8 rounded-2xl md:rounded-[2.5rem] bg-primary-700 text-white font-black uppercase text-xs tracking-widest shadow-royal active:scale-95"
          >
            <Plus className="mr-2 h-4 w-4" /> Deploy Task
          </Button>
        </div>
      </header>

      {/* --- TASK GRID (1 col mobile, 3 col desktop) --- */}
      <motion.div
        variants={kContainer}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((task: any) => (
            <motion.div
              key={task.id}
              variants={kItem}
              layout
              className="institutional-card glass-surface p-6 md:p-10 cursor-pointer group hover:border-primary-700 transition-all dark:bg-slate-900/40 flex flex-col justify-between min-h-[380px] md:min-h-[450px]"
            >
              <div className="space-y-6">
                <div className="flex justify-between items-start">
                  <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 shadow-sm border border-slate-100 dark:border-slate-700">
                    <TaskIcon type={task.type} />
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full h-12 w-12"
                      >
                        <MoreVertical />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      className="w-56 rounded-[1.5rem] p-2 border-0 shadow-royal"
                    >
                      <DropdownMenuItem
                        onClick={() => {
                          setEditingTask(task);
                          setIsAddOpen(true);
                        }}
                        className="rounded-xl py-4 font-bold text-xs gap-3"
                      >
                        <Edit className="h-4 w-4" /> Edit Configuration
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleClone(task.id)}
                        className="rounded-xl py-4 font-bold text-xs gap-3"
                      >
                        <Copy className="h-4 w-4" /> Clone Node
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => decommissionAssignment(task.id)}
                        className="rounded-xl py-4 font-bold text-xs gap-3 text-rose-600"
                      >
                        <Trash2 className="h-4 w-4" /> Decommission
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div onClick={() => setActiveTask(task)}>
                  <p className="text-[10px] font-black text-primary-700 uppercase tracking-widest mb-1">
                    {task.subject.name}
                  </p>
                  <h3 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white leading-tight mb-2 truncate">
                    {task.title}
                  </h3>
                  <div className="flex items-center gap-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    <Clock className="h-3.5 w-3.5" /> Handover:{" "}
                    {new Date(task.dueDate).toLocaleDateString()}
                  </div>
                </div>
              </div>

              <div
                className="pt-6 md:pt-8 space-y-4"
                onClick={() => setActiveTask(task)}
              >
                <div className="flex justify-between items-end text-[10px] font-black uppercase tracking-widest text-slate-400">
                  <span>Sync Status</span>
                  <span className="text-primary-700 font-bold">
                    {task.submissions.length} Nodes
                  </span>
                </div>
                <Progress
                  value={(task.submissions.length / 25) * 100}
                  className="h-1.5 bg-slate-100 dark:bg-slate-800"
                />
                <Button
                  variant="ghost"
                  className="w-full h-14 rounded-2xl bg-slate-50 dark:bg-slate-800/50 group-hover:bg-primary-700 group-hover:text-white transition-all font-black uppercase text-[10px] tracking-widest"
                >
                  Manage Submissions <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* --- SUBMISSION DRAWER (Mobile Optimized) --- */}
      <Sheet open={!!activeTask} onOpenChange={() => setActiveTask(null)}>
        <SheetContent
          side="right"
          className="w-full sm:max-w-2xl lg:max-w-4xl dark:bg-slate-950 border-0 p-0 overflow-y-auto no-scrollbar shadow-2xl"
        >
          <div className="p-8 md:p-16 bg-slate-900 text-white relative overflow-hidden min-h-[300px] md:min-h-[400px] flex flex-col justify-end">
            <SheetTitle className="absolute top-0 right-0 p-12 opacity-10 rotate-12 scale-75 md:scale-100">
              <TaskIcon type={activeTask?.type} size={200} />
            </SheetTitle>
            <div className="relative z-10 space-y-4">
              <Badge className="bg-primary-700 text-white border-0 font-black px-4 py-1.5 rounded-full uppercase text-[9px] tracking-widest">
                Master Node
              </Badge>
              <h2 className="text-4xl md:text-7xl font-black tracking-tighter leading-tight">
                {activeTask?.title}
              </h2>
              <div className="flex flex-wrap gap-4 md:gap-8 pt-6">
                <MiniMetric
                  label="Submissions"
                  value={activeTask?.submissions.length}
                />
                <MiniMetric
                  label="Weightage"
                  value={`${activeTask?.weightage}%`}
                />
                <MiniMetric label="Max Score" value={activeTask?.totalMarks} />
              </div>
            </div>
          </div>

          <div className="p-6 md:p-16 space-y-8 md:space-y-12">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">
                Identity Stream
              </h4>
              <Button
                onClick={() => nudgePendingNodes(activeTask.id)}
                variant="outline"
                className="w-full md:w-auto rounded-xl font-black text-[10px] uppercase h-14 border-rose-100 text-rose-500 hover:bg-rose-50 active:scale-95 transition-all"
              >
                <ShieldAlert className="mr-2 h-4 w-4" /> Nudge Pending Nodes
              </Button>
            </div>

            <div className="grid gap-3">
              {activeTask?.submissions.map((sub: any) => (
                <div
                  key={sub.id}
                  className="p-5 md:p-8 rounded-[2rem] md:rounded-[3rem] glass-surface flex flex-col md:flex-row justify-between items-center gap-6 border-slate-100 dark:border-slate-800 hover:border-primary-700/30 transition-all group"
                >
                  <div className="flex items-center gap-5 w-full md:w-auto">
                    <Avatar className="h-14 w-14 md:h-20 md:w-20 border-4 border-white shadow-xl group-hover:scale-105 transition-transform">
                      <AvatarImage src={sub.student.user.image} />
                      <AvatarFallback>
                        {sub.student.user.name[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className="truncate">
                      <p className="text-lg md:text-2xl font-black dark:text-white leading-none mb-1.5 truncate">
                        {sub.student.user.name}
                      </p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        Handed over:{" "}
                        {new Date(sub.submittedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 w-full md:w-auto">
                    <Button
                      onClick={() => setGradingSub(sub)}
                      className="flex-1 md:flex-none h-14 md:h-16 px-8 md:px-10 rounded-2xl md:rounded-[1.5rem] bg-primary-700 text-white font-black text-[10px] md:text-xs uppercase tracking-widest shadow-royal active:scale-95 transition-all"
                    >
                      {sub.status === "GRADED"
                        ? `Node Score: ${sub.marks}`
                        : "Start Evaluation"}
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-14 w-14 rounded-2xl bg-slate-50 dark:bg-slate-800"
                        >
                          <MoreVertical />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="end"
                        className="rounded-2xl p-2"
                      >
                        <DropdownMenuItem
                          onClick={() => resetSubmission(sub.id)}
                          className="rounded-xl py-3 font-bold text-xs text-rose-500 gap-2"
                        >
                          <RotateCcw className="h-4 w-4" /> Reset Identity
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* --- EVALUATION MODAL (MOBILE STACKED) --- */}
      <Dialog open={!!gradingSub} onOpenChange={() => setGradingSub(null)}>
        <DialogContent className="max-w-5xl w-full h-[100dvh] md:h-auto md:max-h-[90vh] rounded-none md:rounded-[4rem] p-0 dark:bg-slate-950 border-0 shadow-royal overflow-y-auto no-scrollbar">
          <div className="flex flex-col md:flex-row min-h-full">
            {/* Top/Left: Context Section */}
            <div className="w-full md:w-5/12 p-8 md:p-12 bg-slate-50 dark:bg-slate-900 border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-800">
              <div className="flex justify-between items-start mb-10 md:hidden">
                <Badge className="bg-primary-700 font-black">
                  Identity Payload
                </Badge>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setGradingSub(null)}
                  className="h-12 w-12 rounded-full bg-white shadow-sm"
                >
                  <X />
                </Button>
              </div>
              <h3 className="text-3xl md:text-5xl font-black tracking-tighter mb-8 text-slate-900 dark:text-white leading-none">
                Payload{" "}
                <span className="text-primary-700 text-2xl block md:inline opacity-50">
                  Discovery
                </span>
              </h3>

              <div className="space-y-6 md:space-y-10">
                <div className="p-8 bg-white dark:bg-slate-800 rounded-[2.5rem] shadow-sm">
                  <p className="text-[10px] font-black uppercase text-slate-400 mb-6 tracking-widest">
                    Handover Documents
                  </p>
                  <div className="space-y-4">
                    {gradingSub?.attachments.map(
                      (file: string, idx: number) => (
                        <Button
                          key={idx}
                          variant="outline"
                          className="w-full h-16 md:h-20 rounded-2xl justify-between px-6 md:px-8 border-slate-100 dark:border-slate-700 font-black text-[10px] uppercase tracking-widest group hover:border-primary-700 transition-all"
                          onClick={() => window.open(file)}
                        >
                          <span className="flex items-center gap-3 truncate max-w-[80%]">
                            <Download className="h-4 w-4" /> PAYLOAD_SYNC_
                            {idx + 1}
                          </span>
                          <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      ),
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  <Label className="text-[10px] font-black uppercase text-slate-400 ml-4">
                    Student Context
                  </Label>
                  <div className="p-8 rounded-[2.5rem] glass-surface italic text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                    "
                    {gradingSub?.submissionText ||
                      "No context payload provided for this node."}
                    "
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom/Right: Action Section */}
            <div className="w-full md:w-7/12 p-8 md:p-12 space-y-10">
              <div className="hidden md:flex justify-between items-start">
                <div>
                  <p className="text-[10px] font-black uppercase text-slate-400 tracking-[0.4em] mb-1.5">
                    Evaluation Terminal
                  </p>
                  <h4 className="text-3xl font-black dark:text-white tracking-tight">
                    {gradingSub?.student.user.name}
                  </h4>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setGradingSub(null)}
                  className="h-12 w-12 rounded-full hover:bg-slate-100"
                >
                  <X />
                </Button>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const d = Object.fromEntries(new FormData(e.currentTarget));
                  startTransition(async () => {
                    try {
                      await evaluateSubmissionNode(gradingSub.id, {
                        marks: parseFloat(d.marks as string),
                        feedback: d.feedback as string,
                      });
                      setGradingSub(null);
                      toast.success("Identity Evaluated");
                    } catch (err: any) {
                      toast.error(err.message);
                    }
                  });
                }}
                className="space-y-10"
              >
                <div className="space-y-4">
                  <Label className="text-[10px] font-black uppercase text-slate-400 ml-6 tracking-widest">
                    Achievement Score (Max {activeTask?.totalMarks})
                  </Label>
                  <Input
                    name="marks"
                    required
                    type="number"
                    defaultValue={gradingSub?.marks}
                    className="h-24 md:h-32 rounded-[2.5rem] md:rounded-[3.5rem] glass-surface border-0 font-black text-6xl md:text-8xl px-10 text-primary-700 focus:ring-8 ring-primary-700/10 transition-all text-center md:text-left"
                  />
                </div>
                <div className="space-y-4">
                  <Label className="text-[10px] font-black uppercase text-slate-400 ml-6 tracking-widest">
                    Pedagogical Observation
                  </Label>
                  <Textarea
                    name="feedback"
                    defaultValue={gradingSub?.feedback}
                    required
                    rows={6}
                    className="rounded-[2.5rem] md:rounded-[3rem] bg-slate-50 dark:bg-slate-900 border-0 p-8 font-medium text-sm md:text-base leading-relaxed"
                    placeholder="Node-specific feedback for growth..."
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isPending}
                  className="w-full h-20 md:h-28 rounded-[2.5rem] md:rounded-[4rem] bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-black text-xl md:text-2xl shadow-2xl active:scale-95 transition-all"
                >
                  {isPending ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    "COMMIT EVALUATION"
                  )}
                </Button>
              </form>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* --- DEPLOYMENT MODAL (MOBILE FULL) --- */}
      <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
        <DialogContent className="max-w-2xl w-full h-[100dvh] md:h-auto md:max-h-[90vh] rounded-none md:rounded-[4rem] p-8 md:p-20 dark:bg-slate-950 border-0 shadow-royal overflow-y-auto no-scrollbar">
          <DialogHeader className="mb-10 text-left">
            <div className="flex justify-between items-start md:block">
              <DialogTitle className="text-4xl md:text-6xl font-black tracking-tighter leading-none">
                {editingTask ? "Modify" : "Initialize"} Node
              </DialogTitle>
              <Button
                variant="ghost"
                onClick={() => setIsAddOpen(false)}
                className="md:hidden h-12 w-12 rounded-full bg-slate-100 dark:bg-slate-900"
              >
                <X />
              </Button>
            </div>
            <DialogDescription className="font-bold text-slate-400 uppercase tracking-widest pt-2">
              Curriculum Deployment v2.6
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSave} className="space-y-6 md:space-y-10">
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase text-slate-400 ml-6">
                Node Title
              </Label>
              <Input
                name="title"
                defaultValue={editingTask?.title}
                required
                className="h-16 md:h-20 rounded-[1.5rem] md:rounded-[2.5rem] glass-surface px-8 font-bold text-lg"
                placeholder="Assessment Alpha"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase text-slate-400 ml-6">
                  Subject Node
                </Label>
                <Select
                  name="subjectId"
                  defaultValue={editingTask?.subjectId}
                  required
                >
                  <SelectTrigger className="h-16 md:h-20 rounded-[1.5rem] md:rounded-[2.5rem] bg-slate-100 dark:bg-slate-900 border-0 font-bold px-8">
                    <SelectValue placeholder="Identify..." />
                  </SelectTrigger>
                  <SelectContent className="rounded-3xl border-0 shadow-2xl">
                    {subjects.map((s: any) => (
                      <SelectItem
                        key={s.id}
                        value={s.id}
                        className="font-bold py-5"
                      >
                        {s.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase text-slate-400 ml-6">
                  Classification
                </Label>
                <Select
                  name="type"
                  defaultValue={editingTask?.type || "HOMEWORK"}
                >
                  <SelectTrigger className="h-16 md:h-20 rounded-[1.5rem] md:rounded-[2.5rem] bg-slate-100 dark:bg-slate-900 border-0 font-bold px-8">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="rounded-3xl border-0 shadow-2xl">
                    <SelectItem
                      value="RECITATION"
                      className="font-bold py-5 text-primary-700"
                    >
                      RECITATION assessment
                    </SelectItem>
                    <SelectItem value="TEST" className="font-bold py-5">
                      WRITTEN exam
                    </SelectItem>
                    <SelectItem value="HOMEWORK" className="font-bold py-5">
                      HOMEWORK task
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase text-slate-400 ml-6">
                  Max Achievement
                </Label>
                <Input
                  name="totalMarks"
                  type="number"
                  defaultValue={editingTask?.totalMarks || "100"}
                  className="h-16 md:h-20 rounded-[1.5rem] md:rounded-[2.5rem] glass-surface px-8 font-bold text-xl"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase text-slate-400 ml-6">
                  Weight Delta (%)
                </Label>
                <Input
                  name="weightage"
                  type="number"
                  defaultValue={editingTask?.weightage || "10"}
                  className="h-16 md:h-20 rounded-[1.5rem] md:rounded-[2.5rem] glass-surface px-8 font-bold text-xl"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase text-slate-400 ml-6">
                Synchronization Deadline
              </Label>
              <Input
                name="dueDate"
                type="datetime-local"
                required
                defaultValue={
                  editingTask
                    ? new Date(editingTask.dueDate).toISOString().slice(0, 16)
                    : ""
                }
                className="h-16 md:h-20 rounded-[1.5rem] md:rounded-[2.5rem] glass-surface px-8 font-bold text-sm"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase text-slate-400 ml-6">
                Payload Instructions
              </Label>
              <Textarea
                name="instructions"
                defaultValue={editingTask?.instructions}
                className="rounded-[2.5rem] md:rounded-[3rem] bg-slate-100 dark:bg-slate-900 border-0 p-8 min-h-[150px] font-medium"
              />
            </div>

            <Button
              type="submit"
              disabled={isPending}
              className="w-full h-20 md:h-28 rounded-[2.5rem] md:rounded-[4rem] bg-primary-700 text-white font-black text-xl md:text-2xl shadow-royal transition-all active:scale-95"
            >
              {isPending ? (
                <Loader2 className="animate-spin" />
              ) : editingTask ? (
                "COMMIT CHANGES"
              ) : (
                "DEPLOY NODE"
              )}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// --- ELITE UI SUB-COMPONENTS ---

function SummaryCard({
  label,
  value,
  icon: Icon,
  color,
  trend,
  className,
}: any) {
  const themes: any = {
    purple: "bg-primary-700/5 text-primary-700 border-primary-700/10",
    rose: "bg-rose-500/5 text-rose-600 border-rose-500/20",
    emerald: "bg-emerald-500/5 text-emerald-600 border-emerald-500/20",
  };
  return (
    <motion.div
      variants={kItem}
      className={`p-6 md:p-10 rounded-[2.5rem] border ${themes[color]} glass-surface shrink-0 ${className}`}
    >
      <div className="flex justify-between items-start mb-6 md:mb-10">
        <div className="p-3.5 md:p-4 rounded-xl md:rounded-2xl bg-white dark:bg-slate-900 shadow-sm">
          <Icon className="h-5 w-5 md:h-7 md:w-7" />
        </div>
        <p className="text-[9px] md:text-[10px] font-black uppercase tracking-tighter opacity-60 bg-white/40 px-3 py-1 rounded-full">
          {trend}
        </p>
      </div>
      <p className="text-[9px] md:text-[11px] font-black uppercase text-slate-400 tracking-[0.4em] mb-1 opacity-50">
        NODE: {label}
      </p>
      <h4 className="text-4xl md:text-6xl font-black tracking-tighter leading-none dark:text-white">
        {value}
      </h4>
    </motion.div>
  );
}

function TaskIcon({ type, size = 24 }: { type: string; size?: number }) {
  const s = { width: size, height: size };
  if (type === "RECITATION")
    return <Mic style={s} className="text-primary-700" />;
  if (type === "TEST")
    return <ShieldAlert style={s} className="text-amber-500" />;
  return <FileText style={s} className="text-indigo-500" />;
}

function MiniMetric({ label, value }: any) {
  return (
    <div>
      <p className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 mb-1">
        {label}
      </p>
      <p className="text-xl md:text-4xl font-black text-white leading-none tracking-tight">
        {value}
      </p>
    </div>
  );
}
