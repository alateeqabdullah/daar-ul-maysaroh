"use client";

import { useState, useTransition, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Search,
  Award,
  TrendingUp,
  ChevronRight,
  MoreVertical,
  X,
  Loader2,
  Trash2,
  Edit,
  ShieldCheck,
  Settings2,
  FileText,
  Bell,
  Filter,
  Lock,
  SlidersHorizontal,
  MessageSquare,
  RefreshCcw,
  Send,
  CheckCircle2,
  Sparkles,
  GraduationCap,
  ArrowUpRight,
  BarChart3,
} from "lucide-react";

// Actions Handshake
import {
  manageGradeNode,
  publishGradesBulk,
  deleteGradeNode,
  applyGraceMarks,
  nudgeGradeToParent,
  bulkUpdateRemarks,
  resetTermNodes,
} from "@/app/actions/admin/grades/actions";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

// --- ANIMATION CONFIG ---
const kContainer = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.03 } },
};
const kItem = { hidden: { y: 10, opacity: 0 }, show: { y: 0, opacity: 1 } };

export default function GradeTerminalClient({
  initialGrades,
  students,
  subjects,
}: any) {
  const [isPending, startTransition] = useTransition();
  const [localGrades, setLocalGrades] = useState(initialGrades);
  const [search, setSearch] = useState("");

  // Tactical States
  const [activeSub, setActiveSub] = useState(subjects[0]?.id);
  const [activeType, setActiveType] = useState("MIDTERM");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const [editingNode, setEditingNode] = useState<any>(null);

  // --- ANALYTICS ENGINE ---
  const filtered = useMemo(
    () =>
      localGrades.filter(
        (g: any) =>
          g.subjectId === activeSub &&
          g.examType === activeType &&
          (g.student.user.name.toLowerCase().includes(search.toLowerCase()) ||
            g.student.studentId.toLowerCase().includes(search.toLowerCase())),
      ),
    [localGrades, activeSub, activeType, search],
  );

  const stats = useMemo(() => {
    const total = filtered.length;
    const avg =
      total > 0
        ? Math.round(
            filtered.reduce((a: any, b: any) => a + b.percentage, 0) / total,
          )
        : 0;
    return { total, avg };
  }, [filtered]);

  // --- ACTION HANDLERS (INSTANT UI UPDATE) ---
  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    startTransition(async () => {
      try {
        const res = await manageGradeNode({
          ...data,
          id: editingNode?.id,
          subjectId: activeSub,
          examType: activeType,
        });
        if (res.success) {
          setLocalGrades((prev: any) => {
            const index = prev.findIndex((g: any) => g.id === res.grade.id);
            if (index > -1)
              return prev.map((g: any) =>
                g.id === res.grade.id ? res.grade : g,
              );
            return [res.grade, ...prev];
          });
          setIsModalOpen(false);
          setEditingNode(null);
          toast.success("Result Node Synchronized");
        }
      } catch (err: any) {
        toast.error(err.message);
      }
    });
  };

  const handleDecommission = async (id: string) => {
    if (!confirm("Permanent Node Deletion?")) return;
    startTransition(async () => {
      await deleteGradeNode(id);
      setLocalGrades((prev: any) => prev.filter((g: any) => g.id !== id));
      toast.success("Identity Erased");
    });
  };

  return (
    <div className="w-full max-w-7xl mx-auto space-y-4 md:space-y-8 pb-32">
      {/* --- TOP HUD (Compact) --- */}
      <header className="flex justify-between items-center px-4 pt-4 md:px-0">
        <div className="space-y-1">
          <h1 className="text-2xl md:text-5xl font-black tracking-tighter text-slate-900 dark:text-white">
            Ledger
          </h1>
          <p className="text-[10px] font-bold text-primary-700 dark:text-primary-300 uppercase tracking-widest flex items-center gap-2">
            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Live Node Synchronization
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={() => setIsCommandOpen(true)}
            variant="ghost"
            size="icon"
            className="rounded-2xl bg-slate-100 dark:bg-slate-900 md:h-12 md:w-12"
          >
            <Settings2 className="h-5 w-5" />
          </Button>
          <Button
            onClick={() => {
              setEditingNode(null);
              setIsModalOpen(true);
            }}
            className="h-10 md:h-12 px-5 md:px-8 rounded-2xl bg-primary-700 text-white font-black text-[10px] uppercase shadow-royal active:scale-95 transition-all"
          >
            <Plus className="mr-2 h-4 w-4" /> Add
          </Button>
        </div>
      </header>

      {/* --- STATS STRIP (Mobile Scrollable) --- */}
      <div className="flex md:grid md:grid-cols-3 gap-3 overflow-x-auto no-scrollbar px-4 md:px-0">
        <MiniStat
          label="Sync Nodes"
          value={stats.total}
          icon={FileText}
          color="purple"
        />
        <MiniStat
          label="Performance"
          value={`${stats.avg}%`}
          icon={TrendingUp}
          color="emerald"
        />
        <MiniStat
          label="Exam Cycle"
          value={activeType}
          icon={ShieldCheck}
          color="gold"
          isText
        />
      </div>

      {/* --- SEARCH & FILTERS (Desktop Bar) --- */}
      <div className="hidden md:flex gap-4 px-0">
        <Select value={activeSub} onValueChange={setActiveSub}>
          <SelectTrigger className="h-14 w-80 rounded-2xl glass-surface border-0 font-bold px-8 shadow-sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="rounded-2xl border-0 shadow-2xl">
            {subjects.map((s: any) => (
              <SelectItem key={s.id} value={s.id} className="py-4 font-bold">
                {s.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="relative flex-1 group">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-primary-700 transition-colors" />
          <input
            placeholder="Search nodes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-14 pl-14 glass-surface rounded-2xl border-0 outline-none focus:ring-4 ring-primary-700/10 font-bold dark:bg-slate-900"
          />
        </div>
      </div>

      {/* --- MOBILE SEARCH (Compact) --- */}
      <div className="px-4 md:hidden">
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
          <input
            placeholder="Search identity node..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-11 pl-10 glass-surface rounded-xl border-0 outline-none font-bold text-xs"
          />
        </div>
      </div>

      {/* --- RESULT MATRIX (Responsive Nodes) --- */}
      <motion.div
        variants={kContainer}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3  gap-3 md:gap-6 px-4 md:px-0"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((grade: any) => (
            <motion.div
              key={grade.id}
              layout
              variants={kItem}
              className="institutional-card glass-surface p-5 md:p-8 flex flex-col justify-between min-h-[220px] md:min-h-[280px]"
            >
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 border-2 border-white">
                      <AvatarImage src={grade.student.user.image} />
                    </Avatar>
                    <div className="max-w-[120px] truncate">
                      <p className="text-xs font-black dark:text-white truncate">
                        {grade.student.user.name}
                      </p>
                      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                        {grade.student.studentId}
                      </p>
                    </div>
                  </div>
                  <Badge
                    variant="outline"
                    className={`text-[8px] font-black border-0 rounded-full px-3 py-1 ${grade.isPublished ? "bg-emerald-500/10 text-emerald-600" : "bg-amber-500/10 text-amber-600"}`}
                  >
                    {grade.isPublished ? "LIVE" : "DRAFT"}
                  </Badge>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-[9px] font-black uppercase tracking-widest text-slate-400">
                    <span>Mastery</span>
                    <span className="text-primary-700">
                      {grade.percentage}%
                    </span>
                  </div>
                  <Progress
                    value={grade.percentage}
                    className="h-1 bg-slate-100 dark:bg-slate-800"
                  />
                </div>
              </div>

              <div className="flex justify-between items-center mt-6">
                <div>
                  <h4 className="text-4xl font-black text-slate-900 dark:text-white leading-none">
                    {grade.grade}
                  </h4>
                  <p className="text-[8px] font-black text-slate-400 uppercase mt-1">
                    Grade Score
                  </p>
                </div>
                <div className="flex gap-1">
                  <Button
                    onClick={() => {
                      setEditingNode(grade);
                      setIsModalOpen(true);
                    }}
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10 rounded-xl bg-slate-50 dark:bg-slate-800 hover:text-primary-700 transition-colors"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    onClick={() =>
                      nudgeGradeToParent(grade.id).then(() =>
                        toast.success("Guardian notified"),
                      )
                    }
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10 rounded-xl text-slate-400 hover:text-primary-700"
                  >
                    <Bell className="h-4 w-4" />
                  </Button>
                  <Button
                    onClick={() => handleDecommission(grade.id)}
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10 rounded-xl text-rose-500 hover:bg-rose-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* --- COMMAND DRAWER (Bottom Sheet for Mobile Filters) --- */}
      <Sheet open={isCommandOpen} onOpenChange={setIsCommandOpen}>
        <SheetContent
          side="bottom"
          className="rounded-t-[3rem] h-[80vh] md:h-[60vh] dark:bg-slate-950 border-0 p-8 shadow-2xl"
        >
          <SheetHeader className="text-left mb-8">
            <SheetTitle className="text-3xl font-black tracking-tighter">
              Command <span className="text-primary-700">Protocol</span>
            </SheetTitle>
            <SheetDescription className="font-bold text-slate-400 uppercase text-[10px] tracking-widest pt-1">
              Adjust global result parameters
            </SheetDescription>
          </SheetHeader>
          <div className="space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase text-slate-400 ml-4">
                  Subject
                </Label>
                <Select value={activeSub} onValueChange={setActiveSub}>
                  <SelectTrigger className="h-14 rounded-2xl bg-slate-100 dark:bg-slate-900 border-0 font-bold px-6">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="rounded-2xl border-0 shadow-2xl">
                    {subjects.map((s: any) => (
                      <SelectItem
                        key={s.id}
                        value={s.id}
                        className="py-4 font-bold"
                      >
                        {s.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase text-slate-400 ml-4">
                  Exam
                </Label>
                <Select value={activeType} onValueChange={setActiveType}>
                  <SelectTrigger className="h-14 rounded-2xl bg-slate-100 dark:bg-slate-900 border-0 font-bold px-6">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="rounded-2xl border-0 shadow-2xl">
                    {["MIDTERM", "FINAL", "QUIZ", "ASSIGNMENT"].map((t) => (
                      <SelectItem key={t} value={t} className="py-4 font-bold">
                        {t}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="p-8 bg-slate-50 dark:bg-slate-900 rounded-[2.5rem] space-y-6">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                Institutional Overrides
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Button
                  onClick={() => handleBulk("PUBLISH", null)}
                  className="h-14 rounded-xl bg-emerald-600 text-white font-black text-[10px] uppercase shadow-lg"
                >
                  <ShieldCheck className="mr-2 h-4 w-4" /> Release All Nodes
                </Button>
                <Button
                  onClick={() => handleBulk("RESET", null)}
                  variant="outline"
                  className="h-14 rounded-xl border-rose-100 text-rose-500 font-black text-[10px] uppercase"
                >
                  <RefreshCcw className="mr-2 h-4 w-4" /> Wipe draft results
                </Button>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* --- INJECTION MODAL (Responsive Sizing) --- */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl w-[95vw] md:w-full rounded-[2.5rem] p-6 md:p-12 dark:bg-slate-950 border-0 shadow-royal overflow-y-auto no-scrollbar max-h-[90vh]">
          <DialogHeader className="mb-10 text-left">
            <DialogTitle className="text-3xl md:text-5xl font-black tracking-tighter">
              {editingNode ? "Update" : "Initialize"}{" "}
              <span className="text-primary-700">Node</span>
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSave} className="space-y-8">
            {!editingNode && (
              <div className="space-y-3">
                <Label className="text-[10px] font-black uppercase text-slate-400 ml-4">
                  Identify Recipient Node
                </Label>
                <Select name="studentId" required>
                  <SelectTrigger className="h-14 md:h-16 rounded-2xl bg-slate-100 dark:bg-slate-900 border-0 font-bold px-8 text-base">
                    <SelectValue placeholder="Identify student..." />
                  </SelectTrigger>
                  <SelectContent className="rounded-2xl border-0 shadow-2xl max-h-[40vh]">
                    {students.map((s: any) => (
                      <SelectItem
                        key={s.id}
                        value={s.id}
                        className="py-4 font-bold border-b last:border-0"
                      >
                        {s.user.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <Label className="text-[10px] font-black uppercase text-slate-400 ml-4">
                  Achievement Score
                </Label>
                <Input
                  name="score"
                  type="number"
                  step="0.01"
                  defaultValue={editingNode?.score}
                  required
                  className="h-16 md:h-20 rounded-2xl glass-surface border-0 px-8 font-black text-3xl md:text-5xl text-primary-700 text-center"
                />
              </div>
              <div className="space-y-3">
                <Label className="text-[10px] font-black uppercase text-slate-400 ml-4">
                  {" "}
                  Institutional Max
                </Label>
                <Input
                  name="totalScore"
                  type="number"
                  defaultValue={editingNode?.totalScore || 100}
                  required
                  className="h-16 md:h-20 rounded-2xl glass-surface border-0 px-8 font-black text-3xl md:text-5xl text-slate-300 text-center"
                />
              </div>
            </div>
            <div className="space-y-3">
              <Label className="text-[10px] font-black uppercase text-slate-400 ml-4">
                Pedagogical Remarks
              </Label>
              <Textarea
                name="remarks"
                defaultValue={editingNode?.remarks}
                className="rounded-2xl bg-slate-50 dark:bg-slate-900 border-0 p-6 min-h-[120px]"
              />
            </div>
            <Button
              type="submit"
              disabled={isPending}
              className="w-full h-16 md:h-20 rounded-[2rem] bg-primary-700 text-white font-black text-lg shadow-royal active:scale-95 transition-all"
            >
              {isPending ? (
                <Loader2 className="animate-spin" />
              ) : (
                "COMMIT RESULT DATA"
              )}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );

  // Modular helper inside the component
  function handleBulk(type: string, payload: any) {
    startTransition(async () => {
      try {
        if (type === "PUBLISH") await publishGradesBulk(activeSub, activeType);
        if (type === "RESET") await resetTermNodes(activeSub, activeType);
        toast.success("Protocol Success");
      } catch (err: any) {
        toast.error(err.message);
      }
    });
  }
}

function MiniStat({ label, value, icon: Icon, color, isText }: any) {
  const themes: any = {
    purple: "bg-primary-700/5 text-primary-700 border-primary-700/10",
    emerald: "bg-emerald-500/5 text-emerald-600 border-emerald-500/20",
    gold: "bg-gold/5 text-gold border-gold/20",
  };
  return (
    <div
      className={`p-4 md:p-6 rounded-2xl md:rounded-3xl border ${themes[color]} glass-surface shrink-0 min-w-[140px] md:min-w-0 flex items-center gap-4 transition-all hover:shadow-md`}
    >
      <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 shadow-sm">
        <Icon className="h-4 w-4 md:h-5 md:w-5" />
      </div>
      <div>
        <p className="text-[8px] md:text-[9px] font-black uppercase text-slate-400 tracking-widest leading-none mb-1">
          {label}
        </p>
        <h4
          className={`font-black text-slate-900 dark:text-white leading-none ${isText ? "text-xs md:text-sm" : "text-base md:text-xl"}`}
        >
          {value}
        </h4>
      </div>
    </div>
  );
}
