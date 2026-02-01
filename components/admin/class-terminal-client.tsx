"use client";

import { useState, useTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Search,
  MoreVertical,
  Edit,
  Users,
  GraduationCap,
  BookOpen,
  Calendar,
  Clock,
  Layout,
  Trash2,
  ChevronRight,
  ShieldCheck,
  Loader2,
  UserPlus,
  Hash,
  Globe,
  Sparkles,
  Settings2,
  Activity,
  BarChart3,
  Power,
  X,
} from "lucide-react";
import {
  manageClassNode,
  enrollStudentNode,
  decommissionClass,
} from "@/app/actions/admin/classes/actions";

// Brand UI
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
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
  const [selectedStudentId, setSelectedStudentId] = useState("");

  const filtered = initialClasses.filter(
    (c: any) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.code.toLowerCase().includes(search.toLowerCase()),
  );

  const handleEnroll = async () => {
    if (!selectedStudentId) return;
    startTransition(async () => {
      await enrollStudentNode(activeNode.id, selectedStudentId);
      toast.success("Student Node Injected into Class Registry");
      setSelectedStudentId("");
    });
  };

  return (
    <div className="max-w-[1800px] mx-auto space-y-12 pb-32">
      {/* --- HUD HEADER --- */}
      <header className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8">
        <div className="space-y-4">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full glass-surface border-primary-100 dark:border-primary-900/50 w-fit">
            <Sparkles className="h-3 w-3 text-gold" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-700 dark:text-primary-300">
              Institutional Architecture v2.6
            </span>
          </div>
          <h1 className="text-7xl md:text-8xl font-black tracking-tighter dark:text-white leading-none">
            Class <span className="text-primary-700">DNA</span>
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-4 w-full lg:w-auto">
          <div className="relative flex-1 min-w-[300px] group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-primary-700 transition-colors" />
            <input
              placeholder="Deep Search Registry..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-20 pl-16 glass-surface rounded-[2rem] outline-none border-0 focus:ring-4 ring-primary-700/10 font-bold text-lg dark:bg-slate-950"
            />
          </div>
          <Button
            onClick={() => setIsAddModalOpen(true)}
            className="h-20 px-12 rounded-[2rem] bg-primary-700 text-white font-black uppercase text-xs tracking-widest shadow-royal hover:scale-105 transition-all"
          >
            <Plus className="mr-3 h-6 w-6" /> Initialize Node
          </Button>
        </div>
      </header>

      {/* --- ANALYTICS BENTO --- */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        <AnalyticsTile
          label="Operational Nodes"
          value={initialClasses.length}
          icon={Layout}
          color="purple"
        />
        <AnalyticsTile
          label="Total Enrollment"
          value={initialClasses.reduce(
            (a: any, b: any) => a + b._count.enrollments,
            0,
          )}
          icon={Users}
          color="emerald"
        />
        <AnalyticsTile
          label="Avg Load Rate"
          value="74%"
          icon={BarChart3}
          color="gold"
        />
        <AnalyticsTile
          label="System Health"
          value="Optimal"
          icon={ShieldCheck}
          color="purple"
        />
      </div>

      {/* --- BLUEPRINT GRID --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
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
                className="institutional-card glass-surface p-10 cursor-pointer group hover:border-primary-700/50 transition-all dark:bg-slate-900/40 flex flex-col justify-between min-h-[420px]"
              >
                <div className="space-y-8">
                  <div className="flex justify-between items-start">
                    <div className="h-16 w-16 rounded-3xl bg-primary-700/10 text-primary-700 flex items-center justify-center dark:bg-primary-900/20">
                      <Hash className="h-8 w-8" />
                    </div>
                    <Badge className="bg-primary-700 text-white rounded-xl border-0 font-black text-[10px] uppercase px-5 py-2 tracking-widest">
                      {node.level}
                    </Badge>
                  </div>

                  <div>
                    <p className="text-[11px] font-black text-primary-700 uppercase tracking-[0.3em] mb-2">
                      {node.code}
                    </p>
                    <h3 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white group-hover:text-primary-700 transition-colors leading-none mb-3">
                      {node.name}
                    </h3>
                    <div className="flex items-center gap-3 text-slate-400 font-bold uppercase text-[10px] tracking-widest">
                      <Calendar className="h-3.5 w-3.5" /> {node.academicYear}
                      <span className="h-1 w-1 rounded-full bg-slate-300" />
                      <Clock className="h-3.5 w-3.5" /> {node.schedules.length}{" "}
                      Sessions/Week
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-5 bg-slate-50 dark:bg-slate-800 rounded-[2.5rem]">
                    <Avatar className="h-12 w-12 border-2 border-white dark:border-slate-700 shadow-xl">
                      <AvatarImage src={node.teacher?.user.image} />
                      <AvatarFallback className="font-black text-primary-700">
                        {node.teacher?.user.name[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-black text-slate-900 dark:text-white leading-none">
                        {node.teacher?.user.name}
                      </p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                        Lead Architect (Teacher)
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-12 space-y-4">
                  <div className="flex justify-between items-center text-[11px] font-black uppercase tracking-[0.2em]">
                    <span className="text-slate-400">Node Capacity</span>
                    <span
                      className={
                        occupancy > 90 ? "text-rose-500" : "text-primary-700"
                      }
                    >
                      {node._count.enrollments} / {node.capacity}
                    </span>
                  </div>
                  <Progress
                    value={occupancy}
                    className="h-3 rounded-full bg-primary-100 dark:bg-slate-800"
                  />
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* --- CLASS COCKPIT (DEEP DIVE) --- */}
      <Sheet open={!!activeNode} onOpenChange={() => setActiveNode(null)}>
        <SheetContent className="sm:max-w-4xl dark:bg-slate-950 border-0 overflow-y-auto no-scrollbar shadow-2xl">
          <SheetHeader className="mb-12 text-left">
            <Badge className="bg-primary-700 w-fit mb-3 font-black px-6 uppercase tracking-widest">
              BLUEPRINT: {activeNode?.code}
            </Badge>
            <SheetTitle className="text-6xl font-black tracking-tighter dark:text-white leading-none">
              {activeNode?.name}
            </SheetTitle>
          </SheetHeader>

          <Tabs defaultValue="roster" className="w-full">
            <TabsList className="bg-slate-100 dark:bg-slate-900 p-2 rounded-[2.5rem] w-full justify-start h-20 mb-12 shadow-inner">
              <TabsTrigger
                value="roster"
                className="rounded-[2rem] font-black text-xs uppercase tracking-widest px-12 h-full"
              >
                The Roster
              </TabsTrigger>
              <TabsTrigger
                value="curriculum"
                className="rounded-[2rem] font-black text-xs uppercase tracking-widest px-12 h-full"
              >
                Curriculum
              </TabsTrigger>
              <TabsTrigger
                value="schedule"
                className="rounded-[2rem] font-black text-xs uppercase tracking-widest px-12 h-full"
              >
                Routine
              </TabsTrigger>
            </TabsList>

            {/* --- ROSTER TAB --- */}
            <TabsContent value="roster" className="space-y-10">
              <div className="p-10 glass-surface rounded-[3.5rem] border-primary-100 dark:border-primary-900/50 flex flex-col md:flex-row gap-6 items-end">
                <div className="flex-1 w-full space-y-3">
                  <Label className="text-[10px] font-black uppercase text-slate-400 ml-6 tracking-[0.2em]">
                    Inject Student Node
                  </Label>
                  <Select
                    value={selectedStudentId}
                    onValueChange={setSelectedStudentId}
                  >
                    <SelectTrigger className="h-20 rounded-[2rem] bg-white dark:bg-slate-900 border-0 font-bold text-lg">
                      <SelectValue placeholder="Identify student node..." />
                    </SelectTrigger>
                    <SelectContent className="rounded-3xl border-0 shadow-2xl">
                      {allStudents.map((s: any) => (
                        <SelectItem
                          key={s.id}
                          value={s.id}
                          className="py-5 font-bold border-b last:border-0"
                        >
                          {s.user.name} ({s.studentId})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button
                  onClick={handleEnroll}
                  disabled={isPending}
                  className="h-20 px-12 rounded-[2rem] bg-primary-700 text-white font-black uppercase text-xs shadow-lg w-full md:w-auto"
                >
                  {isPending ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    <UserPlus className="h-6 w-6" />
                  )}
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {activeNode?.enrollments.map((e: any) => (
                  <div
                    key={e.id}
                    className="p-6 rounded-[2.5rem] bg-white dark:bg-slate-900/50 border-2 dark:border-slate-800 flex items-center justify-between group hover:border-primary-700/30 transition-all shadow-sm"
                  >
                    <div className="flex items-center gap-5">
                      <Avatar className="h-16 w-16 border-4 border-white dark:border-slate-800 shadow-xl">
                        <AvatarImage src={e.student.user.image} />
                      </Avatar>
                      <div>
                        <p className="text-xl font-black dark:text-white leading-none mb-2">
                          {e.student.user.name}
                        </p>
                        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                          {e.student.studentId}
                        </p>
                      </div>
                    </div>
                    <Button
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

            {/* --- CURRICULUM TAB --- */}
            <TabsContent value="curriculum" className="space-y-8">
              <div className="grid grid-cols-1 gap-4">
                {activeNode?.subjects.map((s: any) => (
                  <div
                    key={s.id}
                    className="p-8 rounded-[3rem] institutional-card glass-surface flex justify-between items-center group"
                  >
                    <div className="flex items-center gap-8">
                      <div className="h-16 w-16 rounded-[2rem] bg-slate-950 text-white flex items-center justify-center dark:bg-white dark:text-slate-950 transition-transform group-hover:rotate-12">
                        <BookOpen className="h-8 w-8" />
                      </div>
                      <div>
                        <p className="text-2xl font-black dark:text-white leading-none mb-2">
                          {s.name}
                        </p>
                        <div className="flex items-center gap-3">
                          <Badge className="bg-emerald-500/10 text-emerald-500 font-black text-[9px] border-0">
                            {s.category}
                          </Badge>
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                            Instructor: {s.teacher.user.name}
                          </span>
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-2xl h-12 w-12"
                    >
                      <Settings2 className="h-6 w-6 text-slate-400" />
                    </Button>
                  </div>
                ))}
                <Button className="w-full h-24 rounded-[3rem] border-4 border-dashed border-primary-100 text-primary-700 bg-primary-50/50 font-black text-xs uppercase tracking-widest hover:bg-primary-700 hover:text-white transition-all">
                  <Plus className="mr-2 h-6 w-6" /> Map New Subject Node
                </Button>
              </div>
            </TabsContent>

            {/* --- ROUTINE TAB --- */}
            <TabsContent value="schedule" className="space-y-6">
              {activeNode?.schedules.map((s: any) => (
                <div
                  key={s.id}
                  className="p-10 rounded-[3rem] glass-surface flex justify-between items-center border-emerald-100 dark:border-emerald-900/30"
                >
                  <div className="flex items-center gap-10">
                    <div className="h-20 w-20 rounded-[2.5rem] bg-emerald-500 text-white flex items-center justify-center shadow-lg">
                      <Clock className="h-10 w-10" />
                    </div>
                    <div className="space-y-2">
                      <p className="text-4xl font-black dark:text-white tracking-tighter leading-none">
                        {s.startTime} — {s.endTime}
                      </p>
                      <p className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                        <Globe className="h-3 w-3" /> Zone: {s.timezone}
                      </p>
                    </div>
                  </div>
                  <Badge className="bg-slate-900 text-white dark:bg-white dark:text-slate-900 rounded-full px-12 py-4 font-black uppercase text-xs tracking-[0.3em] shadow-xl">
                    {
                      ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"][
                        s.dayOfWeek
                      ]
                    }
                  </Badge>
                </div>
              ))}
            </TabsContent>
          </Tabs>
        </SheetContent>
      </Sheet>

      {/* --- ADD MODAL (Manual Node Entry) --- */}
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent className="max-w-3xl rounded-[4rem] p-16 dark:bg-slate-950 border-0 shadow-royal">
          <DialogHeader className="mb-10 text-left">
            <DialogTitle className="text-5xl font-black tracking-tighter leading-none">
              Initialize <span className="text-primary-700">Class Node</span>
            </DialogTitle>
          </DialogHeader>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              manageClassNode(
                Object.fromEntries(new FormData(e.currentTarget)),
              ).then(() => setIsAddModalOpen(false));
            }}
            className="space-y-10"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-6">
                  Node Name
                </Label>
                <Input
                  name="name"
                  required
                  className="h-20 rounded-[2rem] glass-surface px-8 font-bold text-xl"
                  placeholder="Advanced Hifz"
                />
              </div>
              <div className="space-y-3">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-6">
                  Node Code
                </Label>
                <Input
                  name="code"
                  required
                  className="h-20 rounded-[2rem] glass-surface px-8 font-bold text-xl"
                  placeholder="HIF-01"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-3">
                <Label className="text-[10px] font-black uppercase text-slate-400 ml-6">
                  Level
                </Label>
                <Select name="level" defaultValue="BEGINNER">
                  <SelectTrigger className="h-16 rounded-[1.5rem] bg-slate-100 dark:bg-slate-900 border-0 font-bold">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="rounded-3xl border-0 shadow-2xl">
                    {["BEGINNER", "INTERMEDIATE", "ADVANCED"].map((l) => (
                      <SelectItem
                        key={l}
                        value={l}
                        className="font-bold py-4 uppercase text-[10px] tracking-widest"
                      >
                        {l}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-3">
                <Label className="text-[10px] font-black uppercase text-slate-400 ml-6">
                  Capacity
                </Label>
                <Input
                  name="capacity"
                  type="number"
                  defaultValue={20}
                  className="h-16 rounded-[1.5rem] glass-surface px-8 font-bold"
                />
              </div>
              <div className="space-y-3">
                <Label className="text-[10px] font-black uppercase text-slate-400 ml-6">
                  Cycle
                </Label>
                <Input
                  name="academicYear"
                  defaultValue="2025/2026"
                  className="h-16 rounded-[1.5rem] glass-surface px-8 font-bold"
                />
              </div>
            </div>
            <div className="space-y-3">
              <Label className="text-[10px] font-black uppercase text-slate-400 ml-6">
                Assigned Architect (Lead Teacher)
              </Label>
              <Select name="teacherId" required>
                <SelectTrigger className="h-20 rounded-[2rem] bg-slate-100 dark:bg-slate-900 border-0 font-bold text-xl">
                  <SelectValue placeholder="Identify Teacher Node..." />
                </SelectTrigger>
                <SelectContent className="rounded-3xl border-0 shadow-2xl">
                  {teachers.map((t: any) => (
                    <SelectItem
                      key={t.id}
                      value={t.id}
                      className="font-bold py-5 border-b last:border-0"
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
              className="w-full h-24 rounded-[3rem] bg-primary-700 text-white font-black text-2xl shadow-royal hover:scale-[1.02] transition-all"
            >
              {isPending ? (
                <Loader2 className="animate-spin" />
              ) : (
                "DEPLOY ACADEMIC BLUEPRINT"
              )}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function AnalyticsTile({ label, value, icon: Icon, color }: any) {
  const styles: any = {
    purple: "bg-primary-700/10 text-primary-700 shadow-royal/10",
    emerald: "bg-emerald-500/10 text-emerald-500",
    gold: "bg-gold/10 text-gold shadow-gold/10",
  };
  return (
    <div className="institutional-card glass-surface p-8 flex flex-col items-center text-center space-y-4 group">
      <div
        className={`p-5 rounded-[2.5rem] ${styles[color]} transition-transform group-hover:rotate-12`}
      >
        <Icon className="h-8 w-8" />
      </div>
      <div>
        <p className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2 leading-none">
          {label}
        </p>
        <p className="text-5xl font-black tracking-tighter dark:text-white leading-none">
          {value}
        </p>
      </div>
    </div>
  );
}
