"use client";

import { useState, useTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Search,
  Users,
  BookOpen,
  Calendar,
  Clock,
  Layout,
  Trash2,
  ShieldCheck,
  Loader2,
  UserPlus,
  Hash,
  Globe,
  Sparkles,
  Send,
  X,
  BarChart3,
  GraduationCap,
  ArrowUpRight,
  FileText,
  Zap,
  Lock,
  Unlock,
  Activity,
} from "lucide-react";

// Actions
import {
  manageClassNode,
  toggleEnrollment,
  broadcastToClass,
  toggleClassStatus,
  promoteClassCohort,
  decommissionClass,
} from "@/app/actions/admin/classes/actions";

// UI Components
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

export default function ClassTerminalClient({
  initialClasses,
  teachers,
  allStudents,
}: any) {
  const [isPending, startTransition] = useTransition();
  const [activeNode, setActiveNode] = useState<any>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [search, setSearch] = useState("");

  const [broadcast, setBroadcast] = useState({ title: "", content: "" });
  const [targetClassId, setTargetClassId] = useState("");

  const filtered = initialClasses.filter(
    (c: any) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.code.toLowerCase().includes(search.toLowerCase()),
  );

  const handleBroadcast = () => {
    if (!broadcast.title || !broadcast.content)
      return toast.error("Heading and Body required");
    startTransition(async () => {
      await broadcastToClass(activeNode.id, broadcast.title, broadcast.content);
      toast.success("Broadcast dispatched to class feed");
      setBroadcast({ title: "", content: "" });
    });
  };

  const handlePromotion = () => {
    if (!targetClassId) return toast.error("Select target node");
    startTransition(async () => {
      try {
        const res = await promoteClassCohort(activeNode.id, targetClassId);
        toast.success(`Successfully migrated ${res.count} students`);
        setActiveNode(null);
      } catch (e: any) {
        toast.error(e.message);
      }
    });
  };

  return (
    <div className="max-w-[1800px] mx-auto space-y-8 pb-32 px-2 md:px-0">
      {/* --- HEADER --- */}
      <header className="flex flex-col gap-6 md:px-4">
        <div className="space-y-3">
          <Badge className="bg-primary-700/10 text-primary-700 dark:text-primary-300 border-0 font-black text-[10px] uppercase tracking-[0.3em] px-4 py-1.5 rounded-full">
            Institutional Registry v2.6
          </Badge>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-none text-slate-900 dark:text-white">
            Class <span className="text-primary-700">DNA</span>
          </h1>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1 group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-primary-700 transition-colors" />
            <input
              placeholder="Search registry..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-16 pl-14 glass-surface rounded-[2rem] outline-none border-0 focus:ring-4 ring-primary-700/10 font-bold dark:bg-slate-900 dark:text-white"
            />
          </div>
          <Button
            onClick={() => setIsAddModalOpen(true)}
            className="h-16 px-10 rounded-[2rem] bg-primary-700 text-white font-black uppercase text-xs tracking-widest shadow-royal hover:scale-105 transition-all w-full md:w-auto"
          >
            <Plus className="mr-2 h-5 w-5" /> New Node
          </Button>
        </div>
      </header>

      {/* --- MOBILE BENTO STATS --- */}
      <div className="flex md:grid md:grid-cols-4 gap-4 overflow-x-auto no-scrollbar pb-4 md:px-4">
        <MiniStat
          label="Nodes"
          value={initialClasses.length}
          icon={Layout}
          color="purple"
        />
        <MiniStat
          label="Roster"
          value={initialClasses.reduce(
            (a: any, b: any) => a + b._count.enrollments,
            0,
          )}
          icon={Users}
          color="emerald"
        />
        <MiniStat label="Load" value="74%" icon={BarChart3} color="gold" />
        <MiniStat
          label="Health"
          value="Stable"
          icon={ShieldCheck}
          color="purple"
        />
      </div>

      {/* --- CLASS NODES --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 md:px-4">
        <AnimatePresence mode="popLayout">
          {filtered.map((node: any) => {
            const occupancy = Math.round(
              (node._count.enrollments / node.capacity) * 100,
            );
            return (
              <motion.div
                layout
                key={node.id}
                onClick={() => setActiveNode(node)}
                className="institutional-card glass-surface p-8 md:p-10 cursor-pointer group hover:border-primary-700/40 transition-all dark:bg-slate-900/40 min-h-[380px] flex flex-col justify-between"
              >
                <div className="space-y-6">
                  <div className="flex justify-between items-start">
                    <div className="h-14 w-14 rounded-3xl bg-primary-700/10 text-primary-700 flex items-center justify-center dark:bg-primary-900/20">
                      <Hash className="h-7 w-7" />
                    </div>
                    <Badge className="bg-primary-700 text-white border-0 font-black text-[9px] uppercase tracking-widest px-4 py-2 rounded-xl">
                      {node.level}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-primary-700 uppercase tracking-widest mb-1">
                      {node.code}
                    </p>
                    <h3 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white leading-none">
                      {node.name}
                    </h3>
                  </div>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 border-2 border-white dark:border-slate-800 shadow-xl">
                      <AvatarImage src={node.teacher?.user.image} />
                      <AvatarFallback className="font-black text-primary-700">
                        {node.teacher?.user.name[0]}
                      </AvatarFallback>
                    </Avatar>
                    <p className="text-xs font-black dark:text-white truncate">
                      {node.teacher?.user.name}
                    </p>
                  </div>
                </div>

                <div className="mt-10 space-y-4">
                  <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-400">
                    <span>Occupancy radar</span>
                    <span
                      className={
                        occupancy > 90 ? "text-rose-500" : "text-primary-700"
                      }
                    >
                      {node._count.enrollments}/{node.capacity}
                    </span>
                  </div>
                  <Progress value={occupancy} className="h-1.5" />
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* --- DEEP-DIVE COCKPIT --- */}
      <Sheet open={!!activeNode} onOpenChange={() => setActiveNode(null)}>
        <SheetContent className="w-full sm:max-w-2xl lg:max-w-4xl dark:bg-slate-950 border-0 overflow-y-auto no-scrollbar p-0 flex flex-col">
          {/* ACCESSIBILITY FIX: Required SheetTitle and SheetDescription */}
          <SheetHeader className="sr-only">
            <SheetTitle>{activeNode?.name || "Node Interface"}</SheetTitle>
            <SheetDescription>
              Deep identity management for node {activeNode?.code}
            </SheetDescription>
          </SheetHeader>

          {/* Elite Header */}
          <div className="p-10 md:p-16 bg-primary-700 text-white relative overflow-hidden flex flex-col justify-end min-h-[320px]">
            <div className="absolute -right-10 -bottom-10 opacity-10 rotate-12">
              <GraduationCap className="h-80 w-80" />
            </div>
            <div className="relative z-10 space-y-6">
              <div className="flex items-center gap-3">
                <Badge className="bg-white/20 text-white border-0 backdrop-blur-md uppercase text-[10px] font-black px-6 py-2 rounded-full">
                  BLUEPRINT: {activeNode?.code}
                </Badge>
                <button
                  onClick={() =>
                    toggleClassStatus(activeNode.id, !activeNode.isActive)
                  }
                  className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all"
                >
                  {activeNode?.isActive ? (
                    <Unlock className="h-4 w-4" />
                  ) : (
                    <Lock className="h-4 w-4 text-rose-300" />
                  )}
                </button>
              </div>
              <h2 className="text-5xl md:text-8xl font-black tracking-tighter leading-none">
                {activeNode?.name}
              </h2>
              <div className="flex flex-wrap gap-8">
                <Metric
                  icon={Users}
                  label="Identity Nodes"
                  value={activeNode?._count.enrollments}
                />
                <Metric
                  icon={BookOpen}
                  label="Curriculum"
                  value={activeNode?.subjects.length}
                />
                <Metric icon={Activity} label="Pulse" value="Active" />
              </div>
            </div>
          </div>

          <div className="flex-1 p-6 md:p-12">
            <Tabs defaultValue="roster" className="w-full">
              <TabsList className="bg-slate-100 dark:bg-slate-900 p-2 rounded-[2.5rem] w-full justify-start h-20 mb-12 shadow-inner overflow-x-auto no-scrollbar">
                <TabsTrigger
                  value="roster"
                  className="rounded-[2rem] font-black text-xs uppercase tracking-widest px-12 h-full"
                >
                  The Roster
                </TabsTrigger>
                <TabsTrigger
                  value="comms"
                  className="rounded-[2rem] font-black text-xs uppercase tracking-widest px-12 h-full"
                >
                  Comms
                </TabsTrigger>
                <TabsTrigger
                  value="routine"
                  className="rounded-[2rem] font-black text-xs uppercase tracking-widest px-12 h-full"
                >
                  Routine
                </TabsTrigger>
                <TabsTrigger
                  value="ops"
                  className="rounded-[2rem] font-black text-xs uppercase tracking-widest px-12 h-full text-gold"
                >
                  Ops
                </TabsTrigger>
              </TabsList>

              <TabsContent value="roster" className="space-y-8">
                <div className="p-8 glass-surface rounded-[3rem] border-primary-100 dark:border-primary-900/50 flex flex-col md:flex-row gap-4 items-end">
                  <div className="flex-1 space-y-3 w-full">
                    <Label className="text-[10px] font-black uppercase text-slate-400 ml-6 tracking-widest">
                      Inject Student Node
                    </Label>
                    <Select
                      onValueChange={(v) =>
                        toggleEnrollment(activeNode.id, v, "ENROLL")
                      }
                    >
                      <SelectTrigger className="h-16 rounded-[1.5rem] bg-white dark:bg-slate-900 border-0 font-bold text-lg">
                        <SelectValue placeholder="Identify identity..." />
                      </SelectTrigger>
                      <SelectContent className="rounded-2xl border-0 shadow-2xl">
                        {allStudents.map((s: any) => (
                          <SelectItem
                            key={s.id}
                            value={s.id}
                            className="py-4 font-bold"
                          >
                            {s.user.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {activeNode?.enrollments.map((e: any) => (
                    <div
                      key={e.id}
                      className="p-6 rounded-[2.5rem] bg-slate-50 dark:bg-slate-900 border dark:border-slate-800 flex items-center justify-between group shadow-sm hover:shadow-md transition-all"
                    >
                      <div className="flex items-center gap-4">
                        <Avatar className="h-12 w-12 border-4 border-white dark:border-slate-800 shadow-xl">
                          <AvatarImage src={e.student.user.image} />
                        </Avatar>
                        <div>
                          <p className="text-sm font-black dark:text-white leading-none mb-1">
                            {e.student.user.name}
                          </p>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                            {e.student.studentId}
                          </p>
                        </div>
                      </div>
                      <Button
                        onClick={() =>
                          toggleEnrollment(
                            activeNode.id,
                            e.student.id,
                            "UNENROLL",
                          )
                        }
                        variant="ghost"
                        size="icon"
                        className="text-rose-500 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="h-5 w-5" />
                      </Button>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="comms" className="space-y-6">
                <div className="p-10 bg-slate-900 rounded-[3rem] text-white space-y-8 relative overflow-hidden group">
                  <Send className="absolute -right-8 -bottom-8 h-48 w-48 opacity-5 group-hover:translate-x-2 transition-transform" />
                  <div className="relative z-10 space-y-6">
                    <h4 className="text-3xl font-black tracking-tighter leading-none">
                      Class <span className="text-indigo-400">Broadcast</span>
                    </h4>
                    <Input
                      value={broadcast.title}
                      onChange={(e) =>
                        setBroadcast({ ...broadcast, title: e.target.value })
                      }
                      className="h-16 rounded-2xl bg-white/5 border-white/10 text-white font-bold"
                      placeholder="Heading..."
                    />
                    <textarea
                      value={broadcast.content}
                      onChange={(e) =>
                        setBroadcast({ ...broadcast, content: e.target.value })
                      }
                      className="w-full h-40 bg-white/5 border-white/10 text-white rounded-[2rem] p-6 text-sm outline-none focus:ring-2 ring-primary-500"
                      placeholder="Payload content..."
                    />
                    <Button
                      onClick={handleBroadcast}
                      disabled={isPending}
                      className="w-full h-20 rounded-[2.5rem] bg-primary-600 text-white font-black uppercase text-xs tracking-widest shadow-2xl"
                    >
                      {isPending ? (
                        <Loader2 className="animate-spin" />
                      ) : (
                        "TRANSMIT BROADCAST"
                      )}
                    </Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="routine" className="space-y-4">
                {activeNode?.schedules.map((s: any) => (
                  <div
                    key={s.id}
                    className="p-10 rounded-[3rem] glass-surface flex justify-between items-center border-emerald-100 dark:border-emerald-900/30"
                  >
                    <div className="flex items-center gap-10">
                      <div className="h-16 w-16 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shadow-lg">
                        <Clock className="h-8 w-8" />
                      </div>
                      <p className="text-4xl font-black dark:text-white tracking-tighter leading-none">
                        {s.startTime} — {s.endTime}
                      </p>
                    </div>
                    <Badge className="bg-slate-900 text-white dark:bg-white dark:text-slate-900 rounded-full px-10 py-3 font-black uppercase text-[10px] tracking-[0.2em]">
                      {
                        ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"][
                          s.dayOfWeek
                        ]
                      }
                    </Badge>
                  </div>
                ))}
              </TabsContent>

              <TabsContent value="ops" className="space-y-8">
                <div className="p-12 bg-rose-500 rounded-[3.5rem] text-white space-y-8 relative overflow-hidden shadow-2xl shadow-rose-500/20">
                  <div className="relative z-10 space-y-6">
                    <h4 className="text-4xl font-black tracking-tighter leading-none">
                      Cohort Promotion
                    </h4>
                    <p className="text-sm font-bold opacity-80 max-w-md">
                      Batch-migrate every student node in this class to a new
                      academic destination (e.g. Year 1 to Year 2).
                    </p>
                    <div className="flex flex-col md:flex-row gap-4 pt-4">
                      <Select onValueChange={setTargetClassId}>
                        <SelectTrigger className="h-16 rounded-2xl bg-white text-slate-900 border-0 font-bold">
                          <SelectValue placeholder="Target Node..." />
                        </SelectTrigger>
                        <SelectContent className="rounded-2xl border-0 shadow-2xl">
                          {initialClasses
                            .filter((c: any) => c.id !== activeNode?.id)
                            .map((c: any) => (
                              <SelectItem
                                key={c.id}
                                value={c.id}
                                className="font-bold py-4"
                              >
                                {c.name}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                      <Button
                        onClick={handlePromotion}
                        disabled={isPending || !targetClassId}
                        className="h-16 px-12 rounded-2xl bg-slate-900 text-white font-black shadow-xl"
                      >
                        {isPending ? (
                          <Loader2 className="animate-spin" />
                        ) : (
                          "MIGRATE COHORT"
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  onClick={() => decommissionClass(activeNode.id)}
                  className="w-full h-24 rounded-[3rem] border-4 border-dashed border-rose-100 text-rose-500 font-black uppercase text-xs tracking-widest hover:bg-rose-500 hover:text-white transition-all"
                >
                  Decommission Class Architecture
                </Button>
              </TabsContent>
            </Tabs>
          </div>
        </SheetContent>
      </Sheet>

      {/* --- ADD MODAL --- */}
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent className="max-w-2xl rounded-[4rem] p-16 dark:bg-slate-950 border-0 shadow-royal">
          <DialogHeader className="mb-10 text-left">
            <DialogTitle className="text-4xl font-black tracking-tighter">
              Initialize <span className="text-primary-700">Class Node</span>
            </DialogTitle>
            <DialogDescription className="text-slate-400 font-bold text-xs uppercase tracking-widest pt-2">
              Blueprint deployment v2.6
            </DialogDescription>
          </DialogHeader>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              manageClassNode(
                Object.fromEntries(new FormData(e.currentTarget)),
              ).then(() => setIsAddModalOpen(false));
            }}
            className="space-y-8"
          >
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase text-slate-400 ml-6 tracking-widest">
                  Node Name
                </Label>
                <Input
                  name="name"
                  required
                  className="h-16 rounded-2xl glass-surface px-8 font-bold"
                  placeholder="e.g. Hifz Level 2"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase text-slate-400 ml-6 tracking-widest">
                  Registry Code
                </Label>
                <Input
                  name="code"
                  required
                  className="h-16 rounded-2xl glass-surface px-8 font-bold"
                  placeholder="HIF-02"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase text-slate-400 ml-6 tracking-widest">
                Assigned Instructor
              </Label>
              <Select name="teacherId" required>
                <SelectTrigger className="h-16 rounded-2xl bg-slate-100 dark:bg-slate-900 border-0 font-bold">
                  <SelectValue placeholder="Identify Teacher..." />
                </SelectTrigger>
                <SelectContent className="rounded-3xl border-0 shadow-2xl">
                  {teachers.map((t: any) => (
                    <SelectItem
                      key={t.id}
                      value={t.id}
                      className="font-bold py-4"
                    >
                      {t.user.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button
              type="submit"
              disabled={isPending}
              className="w-full h-24 rounded-3xl bg-primary-700 text-white font-black text-xl shadow-royal transition-all hover:scale-[1.02]"
            >
              {isPending ? (
                <Loader2 className="animate-spin" />
              ) : (
                "DEPLOY BLUEPRINT"
              )}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// --- SUB-COMPONENTS ---

function MiniStat({ label, value, icon: Icon, color }: any) {
  const styles: any = {
    purple: "bg-primary-700/10 text-primary-700",
    emerald: "bg-emerald-500/10 text-emerald-600",
    gold: "bg-gold/10 text-gold",
  };
  return (
    <div className="institutional-card glass-surface p-6 flex flex-col items-center text-center space-y-3 min-w-[150px] md:w-auto">
      <div className={`p-4 rounded-2xl ${styles[color]}`}>
        <Icon className="h-6 w-6" />
      </div>
      <div>
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1 leading-none">
          {label}
        </p>
        <p className="text-2xl font-black tracking-tighter dark:text-white leading-none">
          {value}
        </p>
      </div>
    </div>
  );
}

function Metric({ icon: Icon, label, value }: any) {
  return (
    <div className="flex items-center gap-3">
      <div className="p-2.5 rounded-xl bg-white/10 shadow-inner">
        <Icon className="h-4 w-4" />
      </div>
      <div>
        <p className="text-[9px] font-black uppercase text-primary-200 tracking-widest">
          {label}
        </p>
        <p className="text-base font-black text-white">{value}</p>
      </div>
    </div>
  );
}
