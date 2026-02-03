"use client";

import { useState, useTransition, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Search,
  FileText,
  Clock,
  ChevronRight,
  Loader2,
  Download,
  Zap,
  ShieldAlert,
  BarChart3,
  X,
  Mic,
} from "lucide-react";

import {
  manageAssignmentNode,
  evaluateSubmissionNode,
  nudgePendingNodes,
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
import { toast } from "sonner";

// --- ANIMATION ENGINE ---
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

  // Filter Logic
  const filtered = useMemo(() => {
    return initialAssignments.filter(
      (a: any) =>
        a.title.toLowerCase().includes(search.toLowerCase()) ||
        a.subject.name.toLowerCase().includes(search.toLowerCase()),
    );
  }, [initialAssignments, search]);

  // Stat Aggregator
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

  const handleNudge = async (id: string) => {
    startTransition(async () => {
      await nudgePendingNodes(id);
      toast.success("Nudge Protocol Broadcasted");
    });
  };

  return (
    <div className="max-w-[1700px] mx-auto space-y-8 pb-40">
      {/* --- ELITE SUMMARY --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SummaryCard
          label="Task Load"
          value={stats.total}
          icon={Zap}
          color="purple"
          trend="Institutional Reach"
        />
        <SummaryCard
          label="Grading Queue"
          value={stats.pending}
          icon={Clock}
          color="rose"
          trend="Action Required"
        />
        <SummaryCard
          label="Avg Weightage"
          value={`${stats.avgWeight}%`}
          icon={BarChart3}
          color="emerald"
          trend="Grade Influence"
        />
      </div>

      {/* --- HEADER --- */}
      <header className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 bg-white dark:bg-slate-900 p-8 md:p-12 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-sm relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-12 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity pointer-events-none">
          <FileText className="h-64 w-64 rotate-12" />
        </div>
        <div className="space-y-4 relative z-10">
          <Badge className="bg-primary-700/10 text-primary-700 dark:text-primary-300 border-0 font-black text-[10px] uppercase tracking-[0.3em] px-4 py-2 rounded-full">
            Academic Orchestration v2.6
          </Badge>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-none text-slate-900 dark:text-white">
            Task <span className="text-primary-700">Registry</span>
          </h1>
        </div>
        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:w-80 group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-primary-700 transition-colors" />
            <input
              placeholder="Deep search curriculum node..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-16 md:h-20 pl-16 glass-surface rounded-[1.5rem] md:rounded-[2.5rem] outline-none border-0 focus:ring-4 ring-primary-700/10 font-bold dark:bg-slate-950"
            />
          </div>
          <Button
            onClick={() => setIsAddOpen(true)}
            className="h-16 md:h-20 px-10 rounded-[1.5rem] md:rounded-[2.5rem] bg-primary-700 text-white font-black uppercase text-xs tracking-widest shadow-royal hover:scale-105 transition-all"
          >
            <Plus className="mr-3 h-5 w-5" /> Deploy Node
          </Button>
        </div>
      </header>

      {/* --- ASSIGNMENT FEED --- */}
      <motion.div
        variants={kContainer}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((task: any) => (
            <motion.div
              key={task.id}
              variants={kItem}
              layout
              onClick={() => setActiveTask(task)}
              className="institutional-card glass-surface p-8 cursor-pointer group hover:border-primary-700 transition-all dark:bg-slate-900/40 flex flex-col justify-between min-h-[420px]"
            >
              <div className="space-y-6">
                <div className="flex justify-between items-start">
                  <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 shadow-sm border border-slate-100 dark:border-slate-700">
                    <TaskIcon type={task.type} />
                  </div>
                  <Badge className="bg-slate-100 dark:bg-slate-800 text-slate-400 border-0 font-black text-[9px] uppercase tracking-widest px-3 py-1">
                    Delta: {task.weightage}%
                  </Badge>
                </div>
                <div>
                  <p className="text-[10px] font-black text-primary-700 uppercase tracking-widest mb-1">
                    {task.subject.name}
                  </p>
                  <h3 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white leading-tight mb-2 truncate">
                    {task.title}
                  </h3>
                  <div className="flex items-center gap-3 text-[10px] font-bold text-slate-400">
                    <Clock className="h-3.5 w-3.5" /> Handover:{" "}
                    {new Date(task.dueDate).toLocaleDateString()}
                  </div>
                </div>
              </div>

              <div className="pt-8 space-y-4">
                <div className="flex justify-between items-end text-[10px] font-black uppercase tracking-widest text-slate-400">
                  <span>Sync Progress</span>
                  <span className="text-primary-700 font-bold">
                    {task.submissions.length} / Node Capacity
                  </span>
                </div>
                <Progress
                  value={(task.submissions.length / 25) * 100}
                  className="h-2 bg-slate-100 dark:bg-slate-800"
                />
                <Button
                  variant="ghost"
                  className="w-full h-14 rounded-2xl bg-slate-50 dark:bg-slate-800/50 group-hover:bg-primary-700 group-hover:text-white transition-all font-black uppercase text-[10px] tracking-widest"
                >
                  Open Terminal <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* --- EVALUATION DRAWER --- */}
      <Sheet open={!!activeTask} onOpenChange={() => setActiveTask(null)}>
        <SheetContent
          side="right"
          className="w-full sm:max-w-3xl lg:max-w-4xl dark:bg-slate-950 border-0 p-0 overflow-y-auto no-scrollbar shadow-2xl"
        >
          <SheetHeader className="p-10 pb-0">
            <SheetTitle className="text-4xl font-black tracking-tighter">
              Node <span className="text-primary-700">Submissions</span>
            </SheetTitle>
            <SheetDescription className="font-bold text-[10px] uppercase tracking-widest text-slate-400 pt-2">
              Curriculum Payload Synchronization
            </SheetDescription>
          </SheetHeader>

          <div className="p-10 space-y-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <InfoTile
                label="Total Nodes"
                value={activeTask?.submissions.length}
              />
              <InfoTile
                label="Graded"
                value={
                  activeTask?.submissions.filter(
                    (s: any) => s.status === "GRADED",
                  ).length
                }
              />
              <InfoTile
                label="Late"
                value={
                  activeTask?.submissions.filter((s: any) => s.lateSubmission)
                    .length
                }
              />
              <InfoTile label="Weightage" value={`${activeTask?.weightage}%`} />
            </div>

            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h4 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400">
                  Identity Stream
                </h4>
                <Button
                  onClick={() => handleNudge(activeTask.id)}
                  variant="outline"
                  className="rounded-xl font-black text-[10px] uppercase tracking-widest h-12 border-rose-100 text-rose-500 hover:bg-rose-50"
                >
                  <ShieldAlert className="mr-2 h-4 w-4" /> Nudge Pending
                </Button>
              </div>

              <div className="grid gap-4">
                {activeTask?.submissions.map((sub: any) => (
                  <div
                    key={sub.id}
                    className="p-6 rounded-[2.5rem] glass-surface flex flex-col md:flex-row justify-between items-center gap-6 border-slate-100 dark:border-slate-800 transition-all hover:border-primary-700/30 group"
                  >
                    <div className="flex items-center gap-6 w-full md:w-auto">
                      <Avatar className="h-16 w-16 border-4 border-white shadow-lg">
                        <AvatarImage src={sub.student.user.image} />
                        <AvatarFallback>
                          {sub.student.user.name[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-lg font-black dark:text-white leading-none mb-1">
                          {sub.student.user.name}
                        </p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                          Handed over{" "}
                          {new Date(sub.submittedAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 w-full md:w-auto">
                      <Badge
                        className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest ${sub.status === "GRADED" ? "bg-emerald-500 text-white" : "bg-amber-500 text-white"}`}
                      >
                        {sub.status}
                      </Badge>
                      <Button
                        onClick={() => setGradingSub(sub)}
                        className="flex-1 md:flex-none h-14 px-8 rounded-2xl bg-primary-700 text-white font-black text-[10px] uppercase tracking-widest shadow-xl active:scale-95 transition-transform"
                      >
                        {sub.status === "GRADED"
                          ? "Inspect Grade"
                          : "Commence Evaluation"}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* --- EVALUATION TERMINAL (MODAL) --- */}
      <Dialog open={!!gradingSub} onOpenChange={() => setGradingSub(null)}>
        <DialogContent className="max-w-4xl rounded-[4rem] p-0 dark:bg-slate-950 border-0 shadow-royal overflow-hidden">
          <div className="flex flex-col md:flex-row h-full">
            {/* Submission Details */}
            <div className="w-full md:w-1/2 p-12 bg-slate-50 dark:bg-slate-900 border-r dark:border-slate-800 overflow-y-auto no-scrollbar max-h-[90vh]">
              <Badge className="bg-primary-700 mb-4">Payload Discovery</Badge>
              <h3 className="text-4xl font-black tracking-tighter text-slate-900 dark:text-white leading-none mb-8">
                Node <span className="text-primary-700">Identity</span>
              </h3>

              <div className="space-y-8">
                <div className="p-8 bg-white dark:bg-slate-800 rounded-[2.5rem] shadow-sm">
                  <p className="text-[10px] font-black uppercase text-slate-400 mb-4">
                    Attached Handouts
                  </p>
                  <div className="space-y-3">
                    {gradingSub?.attachments.map(
                      (file: string, idx: number) => (
                        <Button
                          key={idx}
                          variant="outline"
                          className="w-full h-16 rounded-2xl justify-between px-6 border-slate-100 dark:border-slate-700 group hover:border-primary-700"
                          onClick={() => window.open(file)}
                        >
                          <span className="flex items-center gap-3 truncate max-w-[80%] font-black text-xs uppercase">
                            <Download className="h-4 w-4" /> NODE_SYNC_{idx + 1}
                            .pdf
                          </span>
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      ),
                    )}
                  </div>
                </div>

                <div className="space-y-3">
                  <p className="text-[10px] font-black uppercase text-slate-400 ml-4">
                    Student Context
                  </p>
                  <div className="p-6 rounded-[2rem] bg-indigo-50/50 dark:bg-indigo-900/10 border border-indigo-100 dark:border-indigo-800">
                    <p className="text-sm font-medium leading-relaxed italic opacity-80">
                      "
                      {gradingSub?.submissionText ||
                        "No context payload provided."}
                      "
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Input Form */}
            <div className="w-full md:w-1/2 p-12 overflow-y-auto max-h-[90vh]">
              <div className="flex justify-between items-start mb-10">
                <div>
                  <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">
                    Grading Matrix
                  </p>
                  <h4 className="text-2xl font-black dark:text-white">
                    Commit Evaluation
                  </h4>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setGradingSub(null)}
                >
                  <X />
                </Button>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const d = Object.fromEntries(new FormData(e.currentTarget));
                  startTransition(async () => {
                    await evaluateSubmissionNode(gradingSub.id, {
                      marks: parseFloat(d.marks as string),
                      feedback: d.feedback as string,
                    });
                    setGradingSub(null);
                    toast.success("Identity Evaluation Synced");
                  });
                }}
                className="space-y-8"
              >
                <div className="space-y-3">
                  <Label className="text-[10px] font-black uppercase text-slate-400 ml-6">
                    Achievement Score (Max {activeTask?.totalMarks})
                  </Label>
                  <Input
                    name="marks"
                    required
                    type="number"
                    defaultValue={gradingSub?.marks}
                    className="h-24 rounded-[2rem] glass-surface border-0 font-black text-6xl px-10 text-primary-700"
                  />
                </div>
                <div className="space-y-3">
                  <Label className="text-[10px] font-black uppercase text-slate-400 ml-6">
                    Teacher's Observations
                  </Label>
                  <Textarea
                    name="feedback"
                    defaultValue={gradingSub?.feedback}
                    required
                    rows={6}
                    className="rounded-[2.5rem] bg-slate-50 dark:bg-slate-900 border-0 p-8 font-medium text-sm"
                    placeholder="Pedagogical feedback for student growth..."
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isPending}
                  className="w-full h-24 rounded-[3rem] bg-primary-700 text-white font-black text-xl shadow-royal hover:scale-[1.02] active:scale-95 transition-all"
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

      {/* --- DEPLOYMENT MODAL --- */}
      <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
        <DialogContent className="max-w-2xl rounded-[4rem] p-12 md:p-20 dark:bg-slate-950 border-0 shadow-royal overflow-y-auto max-h-[95vh] no-scrollbar">
          <DialogHeader className="mb-10 text-left">
            <DialogTitle className="text-5xl font-black tracking-tighter">
              Initialize <span className="text-primary-700">Task Node</span>
            </DialogTitle>
            <DialogDescription className="font-bold text-slate-400 uppercase tracking-widest pt-2">
              Curriculum Deployment Protocol
            </DialogDescription>
          </DialogHeader>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const d = Object.fromEntries(new FormData(e.currentTarget));
              startTransition(async () => {
                try {
                  await manageAssignmentNode(d);
                  setIsAddOpen(false);
                  toast.success("Task Deployed Successfully");
                } catch (e: any) {
                  toast.error(e.message);
                }
              });
            }}
            className="space-y-8"
          >
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase text-slate-400 ml-6">
                Task Title
              </Label>
              <Input
                name="title"
                required
                className="h-16 rounded-[1.5rem] glass-surface px-8 font-bold"
                placeholder="Surah Al-Mulk Assessment"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase text-slate-400 ml-6">
                  Target Academic Node
                </Label>
                <Select name="subjectId" required>
                  <SelectTrigger className="h-16 rounded-[1.5rem] bg-slate-100 dark:bg-slate-900 border-0 font-bold">
                    <SelectValue placeholder="Select Subject..." />
                  </SelectTrigger>
                  <SelectContent className="rounded-2xl border-0 shadow-2xl">
                    {subjects.map((s: any) => (
                      <SelectItem
                        key={s.id}
                        value={s.id}
                        className="font-bold py-4"
                      >
                        {s.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase text-slate-400 ml-6">
                  Task Classification
                </Label>
                <Select name="type" defaultValue="HOMEWORK">
                  <SelectTrigger className="h-16 rounded-[1.5rem] bg-slate-100 dark:bg-slate-900 border-0 font-bold">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="rounded-2xl border-0 shadow-2xl">
                    <SelectItem value="RECITATION" className="font-bold py-4">
                      RECITATION assessment
                    </SelectItem>
                    <SelectItem value="TEST" className="font-bold py-4">
                      WRITTEN exam
                    </SelectItem>
                    <SelectItem value="HOMEWORK" className="font-bold py-4">
                      HOMEWORK task
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase text-slate-400 ml-6">
                  Score Ceiling (Max)
                </Label>
                <Input
                  name="totalMarks"
                  type="number"
                  defaultValue="100"
                  className="h-16 rounded-[1.5rem] glass-surface px-8 font-bold"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase text-slate-400 ml-6">
                  Academic Weight (%)
                </Label>
                <Input
                  name="weightage"
                  type="number"
                  defaultValue="10"
                  className="h-16 rounded-[1.5rem] glass-surface px-8 font-bold"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase text-slate-400 ml-6">
                Sync Deadline
              </Label>
              <Input
                name="dueDate"
                type="datetime-local"
                required
                className="h-16 rounded-[1.5rem] glass-surface px-8 font-bold text-sm"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase text-slate-400 ml-6">
                Instructional Payload
              </Label>
              <Textarea
                name="instructions"
                className="rounded-[2.5rem] bg-slate-100 dark:bg-slate-900 border-0 p-8 min-h-[150px] font-medium"
              />
            </div>

            <Button
              type="submit"
              disabled={isPending}
              className="w-full h-24 rounded-[3.5rem] bg-primary-700 text-white font-black text-xl shadow-royal hover:scale-[1.02] transition-all"
            >
              {isPending ? (
                <Loader2 className="animate-spin" />
              ) : (
                "DEPLOY CURRICULUM NODE"
              )}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// --- SUB-COMPONENTS ---

function SummaryCard({ label, value, icon: Icon, color, trend }: any) {
  const themes: any = {
    purple: "bg-primary-700/5 text-primary-700 border-primary-700/10",
    rose: "bg-rose-500/5 text-rose-600 border-rose-500/10",
    emerald: "bg-emerald-500/5 text-emerald-600 border-emerald-500/10",
  };
  return (
    <motion.div
      variants={kItem}
      className={`p-8 rounded-[3rem] border ${themes[color]} glass-surface`}
    >
      <div className="flex justify-between items-start mb-6">
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 shadow-sm">
          <Icon className="h-6 w-6" />
        </div>
        <p className="text-[10px] font-black uppercase text-slate-400 tracking-tighter">
          {trend}
        </p>
      </div>
      <p className="text-[10px] font-black uppercase text-slate-400 tracking-[0.3em] mb-1">
        NODE: {label}
      </p>
      <h4 className="text-5xl font-black tracking-tighter leading-none">
        {value}
      </h4>
    </motion.div>
  );
}

function TaskIcon({ type }: { type: string }) {
  if (type === "RECITATION")
    return <Mic className="h-6 w-6 text-primary-700" />;
  if (type === "TEST")
    return <ShieldAlert className="h-6 w-6 text-amber-500" />;
  return <FileText className="h-6 w-6 text-indigo-500" />;
}

function InfoTile({ label, value }: any) {
  return (
    <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center">
      <p className="text-[8px] font-black uppercase text-slate-400 tracking-widest leading-none mb-1.5">
        {label}
      </p>
      <p className="text-xl font-black dark:text-white leading-none">
        {value || 0}
      </p>
    </div>
  );
}
