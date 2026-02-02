"use client";

import { useState, useTransition, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Search,
  Users,
  GraduationCap,
  Star,
  X,
  MoreHorizontal,
  Mail,
  Globe,
  Zap,
  Loader2,
  Calendar,
  ShieldCheck,
  Trash2,
  ChevronRight,
  Award,
  Fingerprint,
  History,
  Link as LinkIcon,
  UserCircle,
  MapPin,
  HeartPulse,
} from "lucide-react";

import {
  manageStudentNode,
  updateStudentStatus,
  linkGuardian,
  decommissionStudent,
} from "@/app/actions/admin/students/actions";

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

const kContainer = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } },
};
const kItem = { hidden: { y: 20, opacity: 0 }, show: { y: 0, opacity: 1 } };

export default function StudentTerminalClient({
  initialStudents,
}: {
  initialStudents: any[];
}) {
  const [isPending, startTransition] = useTransition();
  const [activeStudent, setActiveStudent] = useState<any>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [parentEmail, setParentEmail] = useState("");

  const filtered = useMemo(() => {
    return initialStudents.filter(
      (s: any) =>
        s.user.name.toLowerCase().includes(search.toLowerCase()) ||
        s.studentId.toLowerCase().includes(search.toLowerCase()),
    );
  }, [initialStudents, search]);

  const handleStatusChange = (userId: string, status: any) => {
    startTransition(async () => {
      await updateStudentStatus(userId, status);
      toast.success("Security Status Synchronized");
    });
  };

  const handleLinkParent = (studentId: string) => {
    if (!parentEmail) return;
    startTransition(async () => {
      try {
        await linkGuardian(studentId, parentEmail);
        toast.success("Guardian Link Established");
        setParentEmail("");
      } catch (e: any) {
        toast.error(e.message);
      }
    });
  };

  return (
    <div className="max-w-[1700px] mx-auto space-y-6 md:space-y-12 pb-32 px-4 md:px-10 mt-4 md:mt-10">
      {/* --- ELITE HEADER --- */}
      <header className="flex flex-col gap-6 md:gap-10">
        <div className="space-y-2 md:space-y-4 text-center md:text-left">
          <Badge className="bg-primary-700/10 text-primary-700 dark:text-primary-300 border-0 font-black text-[10px] uppercase tracking-[0.4em] px-4 py-2 rounded-full">
            Student Registry v2.6
          </Badge>
          <h1 className="text-5xl md:text-9xl font-black tracking-tighter leading-none text-slate-900 dark:text-white">
            Registry <span className="text-primary-700">Nodes</span>
          </h1>
        </div>

        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1 group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              placeholder="Search student ID or name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-14 md:h-16 pl-12 md:pl-16 glass-surface rounded-2xl md:rounded-[2rem] outline-none border-0 focus:ring-4 ring-primary-700/10 font-bold dark:bg-slate-900 dark:text-white"
            />
          </div>
          <Button
            onClick={() => setIsAddModalOpen(true)}
            className="h-14 md:h-16 rounded-2xl md:rounded-[2rem] bg-primary-700 text-white font-black uppercase text-[10px] md:text-xs tracking-widest shadow-royal transition-all active:scale-95"
          >
            <Plus className="mr-2 h-4 w-4" /> Inject Student
          </Button>
        </div>
      </header>

      {/* --- GRID --- */}
      <motion.div
        variants={kContainer}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((student: any) => (
            <motion.div
              layout
              key={student.id}
              variants={kItem}
              onClick={() => setActiveStudent(student)}
              className="institutional-card glass-surface p-6 md:p-10 cursor-pointer group hover:border-primary-700 transition-all dark:bg-slate-900/40 flex flex-col justify-between min-h-[350px] md:min-h-[450px]"
            >
              <div className="space-y-6">
                <div className="flex justify-between items-start">
                  <Avatar className="h-16 w-16 md:h-24 md:w-24 border-2 md:border-4 border-white dark:border-slate-800 shadow-xl">
                    <AvatarImage src={student.user.image} />
                    <AvatarFallback className="text-xl md:text-3xl font-black text-primary-700">
                      {student.user.name[0]}
                    </AvatarFallback>
                  </Avatar>
                  <Badge
                    className={`border-0 font-black text-[8px] md:text-[9px] uppercase tracking-widest px-3 py-1.5 rounded-lg ${student.user.status === "APPROVED" ? "bg-emerald-500 text-white" : "bg-amber-500 text-white"}`}
                  >
                    {student.user.status}
                  </Badge>
                </div>
                <div>
                  <p className="text-[9px] font-black text-primary-700 uppercase tracking-widest mb-1">
                    {student.studentId}
                  </p>
                  <h3 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900 dark:text-white leading-tight md:leading-none mb-3">
                    {student.user.name}
                  </h3>
                  <div className="flex gap-2">
                    <Badge
                      variant="outline"
                      className="text-[8px] font-black uppercase border-slate-200 dark:border-slate-800"
                    >
                      {student.currentLevel || "No Level"}
                    </Badge>
                    <Badge
                      variant="outline"
                      className="text-[8px] font-black uppercase border-slate-200 dark:border-slate-800"
                    >
                      {student.gender}
                    </Badge>
                  </div>
                </div>
              </div>
              <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex justify-between">
                <MetricBlock
                  label="Academic Year"
                  value={student.academicYear}
                />
                <ChevronRight className="h-5 w-5 text-slate-300 group-hover:text-primary-700 transition-colors" />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* --- DRAWER --- */}
      <Sheet open={!!activeStudent} onOpenChange={() => setActiveStudent(null)}>
        <SheetContent
          side="right"
          className="w-full sm:max-w-2xl lg:max-w-3xl dark:bg-slate-950 border-0 p-0 overflow-y-auto no-scrollbar shadow-2xl"
        >
          <SheetHeader className="p-8 pb-0">
            <SheetTitle className="text-3xl font-black tracking-tighter text-slate-900 dark:text-white">
              Student Deep Identity
            </SheetTitle>
            <SheetDescription className="text-xs font-bold uppercase tracking-widest text-slate-400">
              Synchronizing registry node {activeStudent?.studentId}
            </SheetDescription>
          </SheetHeader>

          <div className="mt-6 p-8 md:p-12 bg-primary-700 text-white relative overflow-hidden flex flex-col justify-end min-h-[300px]">
            <div className="absolute -right-10 -bottom-10 opacity-10 rotate-12">
              <UserCircle className="h-64 md:h-80 w-64 md:w-80" />
            </div>
            <div className="relative z-10 space-y-6">
              <Badge className="bg-white/20 text-white border-0 backdrop-blur-md font-black px-4 py-1.5 rounded-full uppercase text-[9px] tracking-widest w-fit">
                STUDENT ID: {activeStudent?.studentId}
              </Badge>
              <h2 className="text-4xl md:text-7xl font-black tracking-tighter leading-none">
                {activeStudent?.user.name}
              </h2>
              <div className="flex flex-wrap gap-6">
                <Metric
                  icon={GraduationCap}
                  label="Current Level"
                  value={activeStudent?.currentLevel || "Pending"}
                />
                <Metric
                  icon={HeartPulse}
                  label="Hifz Status"
                  value={activeStudent?.hifzLevel || "Juz 30"}
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
                  value="guardian"
                  className="rounded-xl font-black text-[9px] uppercase tracking-widest px-8 h-full"
                >
                  Guardian
                </TabsTrigger>
                <TabsTrigger
                  value="ops"
                  className="rounded-xl font-black text-[9px] uppercase tracking-widest px-8 h-full text-rose-500"
                >
                  Ops
                </TabsTrigger>
              </TabsList>

              <TabsContent value="identity" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InfoCard
                    label="Email Node"
                    value={activeStudent?.user.email}
                    icon={Mail}
                  />
                  <InfoCard
                    label="Nationality"
                    value={activeStudent?.nationality}
                    icon={Globe}
                  />
                  <InfoCard
                    label="Gender"
                    value={activeStudent?.gender}
                    icon={Users}
                  />
                  <InfoCard
                    label="Joined Registry"
                    value={new Date(
                      activeStudent?.createdAt,
                    ).toLocaleDateString()}
                    icon={Calendar}
                  />
                </div>
                <div className="institutional-card glass-surface p-6 space-y-2">
                  <p className="text-[9px] font-black uppercase text-primary-700 tracking-widest">
                    Medical / Special Notes
                  </p>
                  <p className="text-sm font-medium dark:text-slate-300 italic">
                    "
                    {activeStudent?.medicalNotes ||
                      "No critical health flags recorded."}
                    "
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="guardian" className="space-y-6">
                <div className="p-8 bg-slate-900 rounded-[2.5rem] text-white space-y-6 shadow-2xl relative overflow-hidden group">
                  <LinkIcon className="absolute -right-6 -bottom-6 h-32 w-32 opacity-10 group-hover:scale-110 transition-transform duration-700" />
                  <div className="relative z-10 space-y-4">
                    <h4 className="text-2xl font-black tracking-tight leading-none">
                      Connect Guardian Node
                    </h4>
                    <p className="text-[10px] font-bold opacity-60 uppercase tracking-widest">
                      Establish relationship via identity email
                    </p>
                    <div className="flex gap-2">
                      <Input
                        placeholder="guardian@node.com"
                        value={parentEmail}
                        onChange={(e) => setParentEmail(e.target.value)}
                        className="bg-white/10 border-0 rounded-xl text-white placeholder:text-slate-500"
                      />
                      <Button
                        onClick={() => handleLinkParent(activeStudent.id)}
                        disabled={isPending}
                        className="bg-white text-slate-900 rounded-xl font-black px-6"
                      >
                        {isPending ? (
                          <Loader2 className="animate-spin h-4 w-4" />
                        ) : (
                          "Link"
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
                {activeStudent?.parent && (
                  <div className="p-6 rounded-[2rem] glass-surface flex items-center gap-4">
                    <Avatar className="h-14 w-14">
                      <AvatarImage src={activeStudent.parent.user.image} />
                    </Avatar>
                    <div>
                      <p className="text-[9px] font-black text-primary-700 uppercase">
                        Linked Guardian
                      </p>
                      <p className="text-lg font-black dark:text-white">
                        {activeStudent.parent.user.name}
                      </p>
                    </div>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="ops" className="space-y-4">
                <Button
                  onClick={() =>
                    handleStatusChange(
                      activeStudent.user.id,
                      activeStudent.user.status === "APPROVED"
                        ? "SUSPENDED"
                        : "APPROVED",
                    )
                  }
                  variant="outline"
                  className="w-full h-16 rounded-2xl font-black text-[10px] uppercase tracking-widest"
                >
                  <ShieldCheck className="h-5 w-5 mr-3 text-primary-700" />{" "}
                  Toggle Access Permission
                </Button>
                <Button
                  onClick={() => decommissionStudent(activeStudent.id)}
                  variant="ghost"
                  className="w-full h-16 rounded-2xl border-2 border-dashed border-rose-100 text-rose-500 font-black text-[10px] uppercase tracking-widest hover:bg-rose-500 hover:text-white transition-all"
                >
                  <Trash2 className="h-5 w-5 mr-3" /> Decommission Student Node
                </Button>
              </TabsContent>
            </Tabs>
          </div>
        </SheetContent>
      </Sheet>

      {/* --- ADD MODAL --- */}
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent className="max-w-3xl w-[95vw] md:w-full rounded-[2.5rem] md:rounded-[4rem] p-6 md:p-16 dark:bg-slate-950 border-0 shadow-royal overflow-y-auto no-scrollbar max-h-[90vh]">
          <DialogHeader className="mb-6 text-left">
            <DialogTitle className="text-3xl md:text-5xl font-black tracking-tighter leading-none">
              Initialize <span className="text-primary-700">Student Node</span>
            </DialogTitle>
            <DialogDescription className="text-xs font-bold uppercase tracking-widest text-slate-400 mt-2">
              Core Registry Deployment v2.6
            </DialogDescription>
          </DialogHeader>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const d = Object.fromEntries(new FormData(e.currentTarget));
              startTransition(async () => {
                try {
                  await manageStudentNode(d);
                  setIsAddModalOpen(false);
                  toast.success("Node Deployed");
                } catch (e: any) {
                  toast.error(e.message);
                }
              });
            }}
            className="space-y-4 md:space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase text-slate-400 ml-4">
                  Full Name
                </Label>
                <Input
                  name="name"
                  required
                  className="h-14 md:h-16 rounded-xl md:rounded-2xl glass-surface px-6 font-bold"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase text-slate-400 ml-4">
                  Node Email
                </Label>
                <Input
                  name="email"
                  type="email"
                  required
                  className="h-14 md:h-16 rounded-xl md:rounded-2xl glass-surface px-6 font-bold"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase text-slate-400 ml-4">
                  Student ID
                </Label>
                <Input
                  name="studentId"
                  required
                  className="h-14 md:h-16 rounded-xl md:rounded-2xl glass-surface px-6 font-bold"
                  placeholder="STU-2026-XXX"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase text-slate-400 ml-4">
                  Gender
                </Label>
                <Select name="gender" defaultValue="MALE">
                  <SelectTrigger className="h-14 md:h-16 rounded-xl md:rounded-2xl bg-slate-100 dark:bg-slate-900 border-0 font-bold">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    <SelectItem value="MALE">MALE</SelectItem>
                    <SelectItem value="FEMALE">FEMALE</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase text-slate-400 ml-4">
                  Level
                </Label>
                <Input
                  name="currentLevel"
                  className="h-14 md:h-16 rounded-xl md:rounded-2xl glass-surface px-6 font-bold"
                  placeholder="e.g. Primary 1"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase text-slate-400 ml-4">
                  Nationality
                </Label>
                <Input
                  name="nationality"
                  className="h-14 md:h-16 rounded-xl md:rounded-2xl glass-surface px-6 font-bold"
                />
              </div>
            </div>
            <Button
              type="submit"
              disabled={isPending}
              className="w-full h-16 md:h-24 rounded-2xl md:rounded-[3rem] bg-primary-700 text-white font-black text-lg md:text-xl shadow-royal transition-all active:scale-95"
            >
              {isPending ? (
                <Loader2 className="animate-spin h-6 w-6" />
              ) : (
                "DEPLOY STUDENT NODE"
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
