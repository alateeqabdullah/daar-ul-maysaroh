"use client";

import { useState, useTransition, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Search,
  Users,
  GraduationCap,
  Briefcase,
  Wallet,
  Star,
  X,
  MoreHorizontal,
  Mail,
  Phone,
  Globe,
  Zap,
  Loader2,
  Calendar,
  ToggleRight,
  Trash2,
  Banknote,
  Award,
  Activity,
  History,
  TrendingUp,
  ChevronRight,
} from "lucide-react";

import {
  manageTeacherNode,
  toggleTeacherAvailability,
  generateTeacherPayroll,
  decommissionTeacherNode,
} from "@/app/actions/admin/teachers/actions";

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
  DialogDescription,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import { toast } from "sonner";

// --- ANIMATION ENGINE ---
const kContainer = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } },
};
const kItem = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1 },
};

export default function TeacherTerminalClient({
  initialTeachers,
}: {
  initialTeachers: any[];
}) {
  const [isPending, startTransition] = useTransition();
  const [activeTeacher, setActiveTeacher] = useState<any>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return initialTeachers.filter(
      (t: any) =>
        t.user.name.toLowerCase().includes(search.toLowerCase()) ||
        t.teacherId.toLowerCase().includes(search.toLowerCase()),
    );
  }, [initialTeachers, search]);

  const handlePayroll = (id: string, salary: number) => {
    if (!confirm(`Initialize payroll node for $${salary}?`)) return;
    startTransition(async () => {
      try {
        const res = await generateTeacherPayroll(id, salary);
        if (res.success) toast.success("Monthly Payroll Initialized");
      } catch (e: any) {
        toast.error(e.message);
      }
    });
  };

  const handleDecommission = (id: string) => {
    if (!confirm("CRITICAL: Decommissioning is permanent. Proceed?")) return;
    startTransition(async () => {
      try {
        await decommissionTeacherNode(id);
        setActiveTeacher(null);
        toast.success("Faculty node decommissioned.");
      } catch (e: any) {
        toast.error(e.message);
      }
    });
  };

  return (
    <div className="max-w-[1700px] mx-auto space-y-6 md:space-y-12 pb-32 px-4 md:px-10 mt-4 md:mt-10">
      {/* --- HEADER --- */}
      <header className="flex flex-col gap-6 md:gap-10">
        <div className="space-y-2 md:space-y-4 text-center md:text-left">
          <Badge className="bg-primary-700/10 text-primary-700 dark:text-primary-300 border-0 font-black text-[10px] uppercase tracking-[0.3em] px-4 py-2 rounded-full">
            Faculty Orchestrator v2.6
          </Badge>
          <h1 className="text-5xl md:text-9xl font-black tracking-tighter leading-none text-slate-900 dark:text-white">
            Faculty <span className="text-primary-700">Registry</span>
          </h1>
        </div>

        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1 group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              placeholder="Search faculty..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-14 md:h-16 pl-12 md:pl-16 glass-surface rounded-2xl md:rounded-[2rem] outline-none border-0 focus:ring-4 ring-primary-700/10 font-bold dark:bg-slate-900"
            />
          </div>
          <Button
            onClick={() => setIsAddModalOpen(true)}
            className="h-14 md:h-16 rounded-2xl md:rounded-[2rem] bg-primary-700 text-white font-black uppercase text-[10px] md:text-xs tracking-widest shadow-royal transition-all active:scale-95"
          >
            <Plus className="mr-2 h-4 w-4" /> Inject Node
          </Button>
        </div>
      </header>

      {/* --- BENTO GRID --- */}
      <motion.div
        variants={kContainer}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((teacher: any) => (
            <motion.div
              layout
              key={teacher.id}
              variants={kItem}
              onClick={() => setActiveTeacher(teacher)}
              className="institutional-card glass-surface p-6 md:p-10 cursor-pointer group hover:border-primary-700 transition-all dark:bg-slate-900/40 flex flex-col justify-between min-h-[350px] md:min-h-[450px]"
            >
              <div className="space-y-6">
                <div className="flex justify-between items-start">
                  <Avatar className="h-16 w-16 md:h-24 md:w-24 border-2 md:border-4 border-white dark:border-slate-800 shadow-xl transition-transform group-hover:scale-105">
                    <AvatarImage src={teacher.user.image} />
                    <AvatarFallback className="text-xl md:text-3xl font-black text-primary-700">
                      {teacher.user.name[0]}
                    </AvatarFallback>
                  </Avatar>
                  <Badge
                    className={`border-0 font-black text-[8px] md:text-[9px] uppercase tracking-widest px-3 py-1.5 rounded-lg md:rounded-xl shadow-sm ${teacher.isAvailable ? "bg-emerald-500 text-white" : "bg-slate-200 text-slate-500"}`}
                  >
                    {teacher.isAvailable ? "Active" : "Offline"}
                  </Badge>
                </div>
                <div>
                  <p className="text-[9px] font-black text-primary-700 uppercase tracking-widest mb-1">
                    {teacher.teacherId}
                  </p>
                  <h3 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900 dark:text-white leading-tight mb-3">
                    {teacher.user.name}
                  </h3>
                  <div className="flex gap-1.5 flex-wrap">
                    {teacher.expertise.slice(0, 2).map((exp: string) => (
                      <Badge
                        key={exp}
                        variant="outline"
                        className="text-[7px] md:text-[8px] font-black uppercase border-slate-200 dark:border-slate-800"
                      >
                        {exp}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-6 md:pt-8 border-t border-slate-100 dark:border-slate-800 grid grid-cols-2 gap-2 md:gap-4">
                <MetricBlock
                  label="Classes"
                  value={teacher._count?.classes || 0}
                />
                <MetricBlock
                  label="Tenure"
                  value={teacher.experienceYears + "y"}
                />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* --- IDENTITY DRAWER (SIDE FIX) --- */}
      <Sheet open={!!activeTeacher} onOpenChange={() => setActiveTeacher(null)}>
        {/* FIXED: side="right" ensures it comes from the right side of the viewport */}
        <SheetContent
          side="right"
          className="w-full sm:max-w-2xl lg:max-w-3xl dark:bg-slate-950 border-0 p-0 overflow-y-auto no-scrollbar shadow-2xl"
        >
          <SheetHeader className="p-8 pb-0">
            {/* FIXED: Added SheetTitle for Accessibility */}
            <SheetTitle className="text-3xl font-black tracking-tighter text-slate-900 dark:text-white">
              Faculty Deep Identity
            </SheetTitle>
            <SheetDescription className="text-xs font-bold uppercase tracking-widest text-slate-400">
              Synchronizing node {activeTeacher?.teacherId}
            </SheetDescription>
          </SheetHeader>

          {/* Elite Banner */}
          <div className="mt-6 p-8 md:p-12 bg-primary-700 text-white relative overflow-hidden flex flex-col justify-end min-h-[300px]">
            <div className="absolute -right-10 -bottom-10 opacity-10 rotate-12">
              <GraduationCap className="h-64 md:h-80 w-64 md:w-80" />
            </div>
            <div className="relative z-10 space-y-6">
              <Badge className="bg-white/20 text-white border-0 backdrop-blur-md font-black px-4 py-1.5 rounded-full uppercase text-[9px] tracking-widest w-fit">
                ID: {activeTeacher?.teacherId}
              </Badge>
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-none">
                {activeTeacher?.user.name}
              </h2>
              <div className="flex flex-wrap gap-6">
                <Metric
                  icon={Wallet}
                  label="Salary"
                  value={"$" + activeTeacher?.salary}
                />
                <Metric
                  icon={TrendingUp}
                  label="Impact"
                  value={activeTeacher?._count?.classes + " Classes"}
                />
              </div>
            </div>
          </div>

          <div className="p-6 md:p-10">
            <Tabs defaultValue="identity" className="w-full">
              <TabsList className="bg-slate-100 dark:bg-slate-900 p-1.5 rounded-2xl w-full justify-start h-14 mb-8 shadow-inner overflow-x-auto no-scrollbar">
                <TabsTrigger
                  value="identity"
                  className="rounded-xl font-black text-[9px] uppercase tracking-widest px-8 h-full"
                >
                  Identity
                </TabsTrigger>
                <TabsTrigger
                  value="academic"
                  className="rounded-xl font-black text-[9px] uppercase tracking-widest px-8 h-full"
                >
                  Academic
                </TabsTrigger>
                <TabsTrigger
                  value="payroll"
                  className="rounded-xl font-black text-[9px] uppercase tracking-widest px-8 h-full"
                >
                  Payroll
                </TabsTrigger>
                <TabsTrigger
                  value="security"
                  className="rounded-xl font-black text-[9px] uppercase tracking-widest px-8 h-full text-gold"
                >
                  Security
                </TabsTrigger>
              </TabsList>

              <TabsContent value="identity" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InfoCard
                    label="Email Node"
                    value={activeTeacher?.user.email}
                    icon={Mail}
                  />
                  <InfoCard
                    label="Contact"
                    value={activeTeacher?.user.phone || "Not Set"}
                    icon={Phone}
                  />
                  <InfoCard
                    label="Contract"
                    value={activeTeacher?.contractType}
                    icon={Briefcase}
                  />
                  <InfoCard
                    label="Experience"
                    value={activeTeacher?.experienceYears + " Years"}
                    icon={Award}
                  />
                </div>
                <div className="institutional-card glass-surface p-6 space-y-4">
                  <p className="text-[9px] font-black uppercase text-primary-700 tracking-widest">
                    Faculty Bio
                  </p>
                  <p className="text-sm font-medium leading-relaxed dark:text-slate-300 italic">
                    "
                    {activeTeacher?.bio ||
                      "No professional biography initialized."}
                    "
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="academic" className="space-y-4">
                {activeTeacher?.classes?.map((cls: any) => (
                  <div
                    key={cls.id}
                    className="p-5 rounded-2xl glass-surface flex justify-between items-center group border border-transparent hover:border-primary-700 transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-lg bg-primary-700/10 text-primary-700 flex items-center justify-center font-black text-[10px]">
                        CLS
                      </div>
                      <div>
                        <p className="text-[9px] font-black uppercase text-primary-700 tracking-widest mb-1">
                          {cls.code}
                        </p>
                        <p className="text-lg font-black dark:text-white leading-none">
                          {cls.name}
                        </p>
                      </div>
                    </div>
                    <Badge className="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-full px-4 py-1.5 font-black text-[8px] uppercase tracking-widest">
                      {cls.level}
                    </Badge>
                  </div>
                ))}
              </TabsContent>

              <TabsContent value="payroll" className="space-y-8">
                <div className="p-8 bg-emerald-600 rounded-[2.5rem] text-white space-y-6 shadow-2xl relative overflow-hidden group">
                  <Banknote className="absolute -right-6 -bottom-6 h-40 w-40 opacity-10 group-hover:scale-110 transition-transform duration-700" />
                  <div className="relative z-10 space-y-6">
                    <h4 className="text-3xl font-black tracking-tighter leading-none mb-2">
                      Disburse Monthly Payroll
                    </h4>
                    <Button
                      onClick={() =>
                        handlePayroll(activeTeacher.id, activeTeacher.salary)
                      }
                      disabled={isPending}
                      className="w-full h-16 rounded-2xl bg-white text-emerald-600 font-black uppercase text-xs tracking-widest hover:bg-emerald-50 transition-all"
                    >
                      {isPending ? (
                        <Loader2 className="animate-spin" />
                      ) : (
                        `PAY DISBURSEMENT $${activeTeacher?.salary}`
                      )}
                    </Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="security" className="space-y-4">
                <Button
                  onClick={() =>
                    startTransition(async () => {
                      await toggleTeacherAvailability(
                        activeTeacher.id,
                        !activeTeacher.isAvailable,
                      );
                      toast.success("Status Updated");
                    })
                  }
                  variant="outline"
                  className="w-full h-16 rounded-2xl font-black text-[10px] uppercase tracking-widest"
                >
                  <ToggleRight className="h-5 w-5 mr-3" /> Toggle Availability
                </Button>
                <Button
                  onClick={() => handleDecommission(activeTeacher.id)}
                  variant="ghost"
                  className="w-full h-16 rounded-2xl border-2 border-dashed border-rose-100 text-rose-500 font-black text-[10px] uppercase tracking-widest hover:bg-rose-500 hover:text-white transition-all"
                >
                  <Trash2 className="h-5 w-5 mr-3" /> Decommission Node
                </Button>
              </TabsContent>
            </Tabs>
          </div>
        </SheetContent>
      </Sheet>

      {/* --- ADD MODAL (ACCESSIBILITY FIX) --- */}
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent className="max-w-2xl w-[95vw] md:w-full rounded-[2.5rem] md:rounded-[4rem] p-6 md:p-16 dark:bg-slate-950 border-0 shadow-royal overflow-y-auto no-scrollbar max-h-[90vh]">
          <DialogHeader className="mb-6 text-left">
            {/* FIXED: Added DialogTitle for Accessibility */}
            <DialogTitle className="text-3xl md:text-5xl font-black tracking-tighter leading-none">
              Initialize <span className="text-primary-700">Faculty Node</span>
            </DialogTitle>
            <DialogDescription className="text-xs font-bold uppercase tracking-widest text-slate-400 mt-2">
              Identity Deployment Protocol v2.6
            </DialogDescription>
          </DialogHeader>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const d = Object.fromEntries(new FormData(e.currentTarget));
              startTransition(async () => {
                await manageTeacherNode(d);
                setIsAddModalOpen(false);
                toast.success("Node Deployed");
              });
            }}
            className="space-y-4 md:space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                name="name"
                required
                className="h-14 md:h-16 rounded-xl md:rounded-2xl glass-surface px-6 font-bold"
                placeholder="Full Name"
              />
              <Input
                name="email"
                type="email"
                required
                className="h-14 md:h-16 rounded-xl md:rounded-2xl glass-surface px-6 font-bold"
                placeholder="Email Address"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                name="teacherId"
                required
                className="h-14 md:h-16 rounded-xl md:rounded-2xl glass-surface px-6 font-bold"
                placeholder="Teacher ID (e.g FAC-101)"
              />
              <Select name="contractType" defaultValue="FULL_TIME">
                <SelectTrigger className="h-14 md:h-16 rounded-xl md:rounded-2xl bg-slate-100 dark:bg-slate-900 border-0 font-bold">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  <SelectItem value="FULL_TIME">FULL TIME</SelectItem>
                  <SelectItem value="PART_TIME">PART TIME</SelectItem>
                  <SelectItem value="VOLUNTEER">VOLUNTEER</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                name="salary"
                type="number"
                className="h-14 md:h-16 rounded-xl md:rounded-2xl glass-surface px-6 font-bold"
                placeholder="Monthly Salary ($)"
              />
              <Input
                name="expertise"
                className="h-14 md:h-16 rounded-xl md:rounded-2xl glass-surface px-6 font-bold"
                placeholder="Expertise (Comma separated)"
              />
            </div>
            <Textarea
              name="bio"
              className="rounded-2xl md:rounded-[2.5rem] bg-slate-100 dark:bg-slate-900 border-0 p-6 min-h-[100px] font-medium"
              placeholder="Node Professional Biography..."
            />
            <Button
              type="submit"
              disabled={isPending}
              className="w-full h-16 md:h-24 rounded-2xl md:rounded-[3rem] bg-primary-700 text-white font-black text-lg md:text-xl shadow-royal transition-all active:scale-95"
            >
              {isPending ? (
                <Loader2 className="animate-spin" />
              ) : (
                "DEPLOY FACULTY NODE"
              )}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// --- SUB-COMPONENTS ---

function MetricBlock({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className="space-y-0.5">
      <p className="text-[7px] md:text-[9px] font-black text-slate-400 uppercase tracking-widest">
        {label}
      </p>
      <p className="text-lg md:text-xl font-black dark:text-white leading-none">
        {value}
      </p>
    </div>
  );
}

function Metric({ icon: Icon, label, value }: any) {
  return (
    <div className="flex items-center gap-3">
      <div className="p-2 md:p-3 rounded-xl bg-white/10 shadow-inner">
        <Icon className="h-4 md:h-5 w-4 md:w-5" />
      </div>
      <div>
        <p className="text-[8px] md:text-[10px] font-black uppercase text-primary-200 tracking-widest leading-none mb-1">
          {label}
        </p>
        <p className="text-base md:text-xl font-black text-white leading-none">
          {value}
        </p>
      </div>
    </div>
  );
}

function InfoCard({ label, value, icon: Icon }: any) {
  return (
    <div className="p-5 md:p-8 rounded-2xl md:rounded-[2.5rem] glass-surface border dark:border-slate-800">
      <div className="flex items-center gap-2 md:gap-3 mb-2">
        <Icon className="h-4 w-4 text-primary-700" />
        <span className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-slate-400">
          {label}
        </span>
      </div>
      <p className="text-sm md:text-lg font-black text-slate-900 dark:text-white truncate">
        {value || "NONE"}
      </p>
    </div>
  );
}
