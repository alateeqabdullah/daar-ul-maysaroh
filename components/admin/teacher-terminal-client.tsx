"use client";

import { useState, useTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Search,
  Briefcase,
  Wallet,
  Mail,
  Phone,
  Globe,
  Loader2,
  Calendar,
  ToggleRight,
  Trash2,
  Banknote,
} from "lucide-react";

// Actions
import {
  manageTeacherNode,
  toggleTeacherAvailability, generateTeacherPayroll, decommissionTeacherNode, getTeacherDeepStats, 
} from "@/app/actions/admin/teachers/actions";

// UI Components
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

export default function TeacherTerminalClient({ initialTeachers }: any) {
  const [isPending, startTransition] = useTransition();
  const [activeTeacher, setActiveTeacher] = useState<any>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filtered = initialTeachers.filter(
    (t: any) =>
      t.user.name.toLowerCase().includes(search.toLowerCase()) ||
      t.teacherId.toLowerCase().includes(search.toLowerCase()),
  );



const handlePayroll = (id: string, salary: number) => {
  if (!confirm(`Initialize payroll node for $${salary}?`)) return;
  
  startTransition(async () => {
    try {
      const res = await generateTeacherPayroll(id, salary);
      if (res.success) toast.success("Payroll Synchronized");
    } catch (e: any) {
      toast.error(e.message);
    }
  });
};

const handleDecommission = (id: string) => {
  const confirmation = confirm("CRITICAL: Decommissioning will permanently erase this faculty node and associated user access. Proceed?");
  if (!confirmation) return;

  startTransition(async () => {
    try {
      await decommissionTeacherNode(id);
      setActiveTeacher(null);
      toast.success("Faculty node successfully decommissioned.");
    } catch (e: any) {
      toast.error(e.message);
    }
  });
};

const handleStatusToggle = (id: string, currentStatus: boolean) => {
  startTransition(async () => {
    await toggleTeacherAvailability(id, !currentStatus);
    toast.info(`Node availability: ${!currentStatus ? 'ACTIVE' : 'OFFLINE'}`);
  });
};

  return (
    <div className="max-w-[1600px] mx-auto space-y-10 pb-32 px-4">
      {/* --- HEADER --- */}
      <header className="flex flex-col gap-6">
        <div className="space-y-3">
          <Badge className="bg-primary-700/10 text-primary-700 dark:text-primary-300 border-0 font-black text-[10px] uppercase tracking-[0.3em] px-4 py-1.5 rounded-full">
            Faculty Orchestrator v2.6
          </Badge>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-none text-slate-900 dark:text-white">
            Faculty <span className="text-primary-700">Nodes</span>
          </h1>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1 group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-primary-700 transition-colors" />
            <input
              placeholder="Search faculty registry..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-16 pl-14 glass-surface rounded-[2rem] outline-none border-0 focus:ring-4 ring-primary-700/10 font-bold dark:bg-slate-900 dark:text-white"
            />
          </div>
          <Button
            onClick={() => setIsAddModalOpen(true)}
            className="h-16 px-10 rounded-[2rem] bg-primary-700 text-white font-black uppercase text-xs tracking-widest shadow-royal hover:scale-105 transition-all"
          >
            <Plus className="mr-2 h-5 w-5" /> Inject Faculty
          </Button>
        </div>
      </header>

      {/* --- BENTO GRID --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence mode="popLayout">
          {filtered.map((teacher: any) => (
            <motion.div
              layout
              key={teacher.id}
              onClick={() => setActiveTeacher(teacher)}
              className="institutional-card glass-surface p-10 cursor-pointer group hover:border-primary-700/40 transition-all dark:bg-slate-900/40 flex flex-col justify-between min-h-[420px]"
            >
              <div className="space-y-8">
                <div className="flex justify-between items-start">
                  <Avatar className="h-20 w-20 border-4 border-white dark:border-slate-800 shadow-2xl transition-transform group-hover:scale-110">
                    <AvatarImage src={teacher.user.image} />
                    <AvatarFallback className="text-2xl font-black text-primary-700">
                      {teacher.user.name[0]}
                    </AvatarFallback>
                  </Avatar>
                  <Badge
                    className={`border-0 font-black text-[9px] uppercase tracking-widest px-4 py-2 rounded-xl shadow-sm ${teacher.isAvailable ? "bg-emerald-500 text-white" : "bg-slate-200 text-slate-500"}`}
                  >
                    {teacher.isAvailable ? "Available" : "Unavailable"}
                  </Badge>
                </div>
                <div>
                  <p className="text-[10px] font-black text-primary-700 uppercase tracking-widest mb-1">
                    {teacher.teacherId}
                  </p>
                  <h3 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white leading-none">
                    {teacher.user.name}
                  </h3>
                  <div className="flex gap-2 mt-4 flex-wrap">
                    {teacher.expertise.slice(0, 2).map((exp: string) => (
                      <Badge
                        key={exp}
                        variant="secondary"
                        className="bg-slate-100 dark:bg-slate-800 text-[8px] font-bold uppercase"
                      >
                        {exp}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-8 border-t border-slate-100 dark:border-slate-800 grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
                    Active Load
                  </p>
                  <p className="text-sm font-black dark:text-white">
                    {teacher._count.classes} Classes
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
                    Contract
                  </p>
                  <p className="text-sm font-black dark:text-white capitalize">
                    {teacher.contractType.replace("_", " ")}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* --- IDENTITY DRAWER --- */}
      <Sheet open={!!activeTeacher} onOpenChange={() => setActiveTeacher(null)}>
        <SheetContent className="w-full sm:max-w-2xl lg:max-w-3xl dark:bg-slate-950 border-0 p-0 overflow-y-auto no-scrollbar">
          <SheetHeader className="sr-only">
            <SheetTitle>Faculty Node: {activeTeacher?.user.name}</SheetTitle>
            <SheetDescription>
              Employment and academic orchestration for{" "}
              {activeTeacher?.teacherId}
            </SheetDescription>
          </SheetHeader>

          {/* Elite Banner */}
          <div className="p-12 md:p-16 bg-primary-700 text-white relative overflow-hidden flex flex-col justify-end min-h-[350px]">
            <div className="absolute -right-10 -bottom-10 opacity-10 rotate-12">
              <Briefcase className="h-80 w-80" />
            </div>
            <div className="relative z-10 space-y-6">
              <Badge className="bg-white/20 text-white border-0 backdrop-blur-md font-black px-6 py-2 rounded-full uppercase text-[10px]">
                ID: {activeTeacher?.teacherId}
              </Badge>
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-none">
                {activeTeacher?.user.name}
              </h2>
              <div className="flex flex-wrap gap-8">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-white/10 shadow-inner">
                    <Wallet className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-[9px] font-black uppercase text-primary-200 tracking-widest">
                      Base Salary
                    </p>
                    <p className="text-lg font-black">
                      ${activeTeacher?.salary || 0}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-white/10 shadow-inner">
                    <Calendar className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-[9px] font-black uppercase text-primary-200 tracking-widest">
                      Joined On
                    </p>
                    <p className="text-lg font-black">
                      {new Date(
                        activeTeacher?.joiningDate,
                      ).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-8 md:p-12">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="bg-slate-100 dark:bg-slate-900 p-2 rounded-[2.5rem] w-full justify-start h-20 mb-12 shadow-inner">
                <TabsTrigger
                  value="overview"
                  className="rounded-[2rem] font-black text-xs uppercase tracking-widest px-10 h-full"
                >
                  The Node
                </TabsTrigger>
                <TabsTrigger
                  value="load"
                  className="rounded-[2rem] font-black text-xs uppercase tracking-widest px-10 h-full"
                >
                  Academic Load
                </TabsTrigger>
                <TabsTrigger
                  value="payroll"
                  className="rounded-[2rem] font-black text-xs uppercase tracking-widest px-10 h-full"
                >
                  Payroll
                </TabsTrigger>
                <TabsTrigger
                  value="ops"
                  className="rounded-[2rem] font-black text-xs uppercase tracking-widest px-10 h-full text-gold"
                >
                  Security
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-10">
                <div className="grid grid-cols-2 gap-6">
                  <InfoBlock
                    label="Email Address"
                    value={activeTeacher?.user.email}
                    icon={Mail}
                  />
                  <InfoBlock
                    label="Contact Number"
                    value={activeTeacher?.user.phone || "Not Set"}
                    icon={Phone}
                  />
                  <InfoBlock
                    label="Contract Type"
                    value={activeTeacher?.contractType}
                    icon={Briefcase}
                  />
                  <InfoBlock
                    label="Availability"
                    value={activeTeacher?.isAvailable ? "Active" : "On Leave"}
                    icon={Globe}
                  />
                </div>
                <div className="institutional-card glass-surface p-8 space-y-4">
                  <p className="text-[10px] font-black uppercase text-primary-700 tracking-widest">
                    Faculty Bio
                  </p>
                  <p className="text-sm font-medium leading-relaxed dark:text-slate-300 italic">
                    "
                    {activeTeacher?.bio ||
                      "No professional biography has been initialized for this node."}
                    "
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="load" className="space-y-6">
                <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-4 mb-4">
                  Current Assignments
                </h4>
                <div className="grid gap-4">
                  {activeTeacher?.classes.map((cls: any) => (
                    <div
                      key={cls.id}
                      className="p-6 rounded-[2.5rem] glass-surface flex justify-between items-center border-slate-100 dark:border-slate-800"
                    >
                      <div className="flex items-center gap-6">
                        <div className="h-14 w-14 rounded-2xl bg-indigo-600/10 text-indigo-600 flex items-center justify-center font-black">
                          DNA
                        </div>
                        <div>
                          <p className="text-[10px] font-black uppercase text-indigo-600">
                            {cls.code}
                          </p>
                          <p className="text-lg font-black dark:text-white leading-none">
                            {cls.name}
                          </p>
                        </div>
                      </div>
                      <Badge className="bg-slate-900 text-white rounded-full px-6 py-2 font-black text-[9px] uppercase tracking-widest">
                        {cls.level}
                      </Badge>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="payroll" className="space-y-8">
                <div className="p-10 bg-emerald-600 rounded-[3rem] text-white space-y-6 shadow-2xl shadow-emerald-600/20 relative overflow-hidden">
                  <Banknote className="absolute -right-8 -bottom-8 h-48 w-48 opacity-10" />
                  <div className="relative z-10 space-y-4">
                    <h4 className="text-3xl font-black tracking-tighter leading-none">
                      Initialize Payroll
                    </h4>
                    <p className="text-xs font-bold opacity-80 max-w-sm">
                      Generate a pending payroll node for the current billing
                      cycle.
                    </p>
                    <Button
                      onClick={() =>
                        handlePayroll(activeTeacher.id, activeTeacher.salary)
                      }
                      disabled={isPending}
                      className="h-16 px-10 rounded-2xl bg-white text-emerald-600 font-black uppercase text-xs tracking-widest hover:bg-emerald-50 transition-all"
                    >
                      {isPending ? (
                        <Loader2 className="animate-spin" />
                      ) : (
                        "PROCEED WITH $" + activeTeacher?.salary
                      )}
                    </Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="ops" className="space-y-6">
                <div className="grid gap-4">
                  <Button
                    onClick={() =>
                      toggleTeacherAvailability(
                        activeTeacher.id,
                        !activeTeacher.isAvailable,
                      )
                    }
                    variant="outline"
                    className="h-20 rounded-[2rem] border-2 border-slate-100 font-black text-xs uppercase tracking-widest"
                  >
                    <ToggleRight className="h-5 w-5 mr-3" /> Toggle Field
                    Availability
                  </Button>
                  <Button
                    variant="ghost"
                    className="h-24 rounded-[3rem] border-4 border-dashed border-rose-100 text-rose-500 font-black text-xs uppercase tracking-widest hover:bg-rose-500 hover:text-white transition-all"
                  >
                    <Trash2 className="h-5 w-5 mr-3" /> Decommission Faculty
                    Node
                  </Button>
                </div>
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
              Initialize <span className="text-primary-700">Faculty Node</span>
            </DialogTitle>
            <DialogDescription className="text-slate-400 font-bold text-xs uppercase tracking-widest pt-2">
              Identity Deployment v2.6
            </DialogDescription>
          </DialogHeader>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              manageTeacherNode(
                Object.fromEntries(new FormData(e.currentTarget)),
              ).then(() => setIsAddModalOpen(false));
            }}
            className="space-y-6"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase text-slate-400 ml-6">
                  Full Name
                </Label>
                <Input
                  name="name"
                  required
                  className="h-16 rounded-2xl glass-surface px-8 font-bold"
                  placeholder="Ahmad Abdullah"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase text-slate-400 ml-6">
                  Registry Email
                </Label>
                <Input
                  name="email"
                  type="email"
                  required
                  className="h-16 rounded-2xl glass-surface px-8 font-bold"
                  placeholder="ahmad@faculty.com"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase text-slate-400 ml-6">
                  Faculty ID
                </Label>
                <Input
                  name="teacherId"
                  required
                  className="h-16 rounded-2xl glass-surface px-8 font-bold"
                  placeholder="FAC-101"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase text-slate-400 ml-6">
                  Contract Type
                </Label>
                <Select name="contractType" defaultValue="FULL_TIME">
                  <SelectTrigger className="h-16 rounded-2xl bg-slate-100 dark:bg-slate-900 border-0 font-bold">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="rounded-2xl border-0 shadow-2xl">
                    <SelectItem value="FULL_TIME" className="font-bold py-3">
                      FULL TIME
                    </SelectItem>
                    <SelectItem value="PART_TIME" className="font-bold py-3">
                      PART TIME
                    </SelectItem>
                    <SelectItem value="VOLUNTEER" className="font-bold py-3">
                      VOLUNTEER
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase text-slate-400 ml-6">
                  Salary ($)
                </Label>
                <Input
                  name="salary"
                  type="number"
                  className="h-16 rounded-2xl glass-surface px-8 font-bold"
                  placeholder="3500"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase text-slate-400 ml-6">
                  Specialization
                </Label>
                <Input
                  name="expertise"
                  className="h-16 rounded-2xl glass-surface px-8 font-bold"
                  placeholder="Hifz, Tajweed, Arabic"
                />
              </div>
            </div>
            <Button
              type="submit"
              disabled={isPending}
              className="w-full h-24 rounded-[3rem] bg-primary-700 text-white font-black text-xl shadow-royal transition-all hover:scale-[1.02]"
            >
              {isPending ? (
                <Loader2 className="animate-spin" />
              ) : (
                "DEPLOY FACULTY BLUEPRINT"
              )}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function InfoBlock({ label, value, icon: Icon }: any) {
  return (
    <div className="p-6 rounded-[2.5rem] glass-surface border dark:border-slate-800 transition-all hover:border-primary-100">
      <div className="flex items-center gap-2 mb-2">
        <Icon className="h-4 w-4 text-primary-700" />
        <span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">
          {label}
        </span>
      </div>
      <p className="text-base font-black text-slate-900 dark:text-white truncate">
        {value || "NONE"}
      </p>
    </div>
  );
}
