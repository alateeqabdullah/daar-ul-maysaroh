"use client";

import { useState, useTransition, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Search,
  Users,
  GraduationCap,
  X,
  MoreVertical,
  Mail,
  Globe,
  Zap,
  Loader2,
  Calendar,
  ShieldCheck,
  Trash2,
  ChevronRight,
  Award,
  UserCircle,
  MapPin,
  TrendingUp,
  Wallet,
  CheckCircle,
  Fingerprint,
  History,
  Link as LinkIcon,
} from "lucide-react";

import {
  manageStudentNode,
  updateStudentPermissions,
  establishGuardianLink,
  decommissionStudentNode,
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
import { Progress } from "@/components/ui/progress";
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

  const handleLinkParent = (studentId: string) => {
    if (!parentEmail) return;
    startTransition(async () => {
      try {
        await establishGuardianLink(studentId, parentEmail);
        toast.success("Guardian protocol established.");
        setParentEmail("");
      } catch (e: any) {
        toast.error(e.message);
      }
    });
  };

  return (
    <div className="max-w-[1700px] mx-auto space-y-6 md:space-y-12 pb-32 px-4 md:px-10 mt-6 md:mt-10">
      {/* --- ELITE HEADER --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 bg-white dark:bg-slate-900 p-6 md:p-12 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-800">
        <div className="space-y-4">
          <Badge className="bg-primary-700/10 text-primary-700 dark:text-primary-300 border-0 font-black text-[10px] uppercase tracking-[0.4em] px-4 py-2 rounded-full">
            Identity Deployment v2.6
          </Badge>
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-none text-slate-900 dark:text-white">
            Student <span className="text-primary-700">Nodes</span>
          </h1>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-80 group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              placeholder="Search registry..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-14 md:h-16 pl-12 md:pl-16 glass-surface rounded-2xl md:rounded-[2rem] outline-none border-0 focus:ring-4 ring-primary-700/10 font-bold dark:bg-slate-950"
            />
          </div>
          <Button
            onClick={() => setIsAddModalOpen(true)}
            className="h-14 md:h-16 rounded-2xl md:rounded-[2rem] bg-primary-700 text-white font-black uppercase text-[10px] tracking-widest shadow-royal transition-all active:scale-95"
          >
            <Plus className="mr-2 h-4 w-4" /> Inject Student
          </Button>
        </div>
      </div>

      {/* --- DUAL LAYOUT FEED --- */}
      <div className="grid grid-cols-1 md:hidden gap-4">
        {/* MOBILE VIEW: CARDS */}
        {filtered.map((s) => (
          <motion.div
            layout
            key={s.id}
            onClick={() => setActiveStudent(s)}
            className="p-6 glass-surface rounded-[2.5rem] space-y-6 active:scale-95 transition-all"
          >
            <div className="flex justify-between items-start">
              <Avatar className="h-16 w-16 border-2 border-white shadow-xl">
                <AvatarImage src={s.user.image} />
                <AvatarFallback>{s.user.name[0]}</AvatarFallback>
              </Avatar>
              <Badge
                className={`border-0 font-black text-[9px] uppercase tracking-widest px-3 py-1 rounded-lg ${s.user.status === "APPROVED" ? "bg-emerald-500 text-white" : "bg-amber-500 text-white"}`}
              >
                {s.user.status}
              </Badge>
            </div>
            <div>
              <p className="text-[10px] font-black text-primary-700 uppercase mb-1">
                {s.studentId}
              </p>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight leading-none">
                {s.user.name}
              </h3>
            </div>
            <div className="pt-4 border-t border-slate-100 flex justify-between items-center text-[10px] font-black uppercase text-slate-400">
              <span>Level: {s.currentLevel || "Unset"}</span>
              <ChevronRight className="h-4 w-4" />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="hidden md:block institutional-card glass-surface overflow-hidden">
        {/* DESKTOP VIEW: DATA TABLE */}
        <table className="w-full text-left">
          <thead className="bg-slate-50 dark:bg-slate-900/50 border-b dark:border-slate-800">
            <tr>
              <th className="p-8 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                Node Identity
              </th>
              <th className="p-8 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                Academic Context
              </th>
              <th className="p-8 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                Financial Protocol
              </th>
              <th className="p-8"></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((s) => (
              <tr
                key={s.id}
                onClick={() => setActiveStudent(s)}
                className="group cursor-pointer border-b dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900/40 transition-all"
              >
                <td className="p-8">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-14 w-14 ring-4 ring-white shadow-md group-hover:scale-105 transition-transform">
                      <AvatarImage src={s.user.image} />
                    </Avatar>
                    <div>
                      <p className="text-[10px] font-black text-primary-700 uppercase">
                        {s.studentId}
                      </p>
                      <p className="text-lg font-black text-slate-900 dark:text-white leading-none">
                        {s.user.name}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="p-8">
                  <div className="space-y-2">
                    <div className="flex justify-between text-[8px] font-black uppercase text-slate-400">
                      <span>Progress</span>
                      <span>Level: {s.currentLevel || "Pending"}</span>
                    </div>
                    <Progress
                      value={s.currentLevel ? 80 : 10}
                      className="h-1.5"
                    />
                  </div>
                </td>
                <td className="p-8">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-emerald-500" />
                    <span className="text-[10px] font-black uppercase text-slate-500">
                      Cleared Node
                    </span>
                  </div>
                </td>
                <td className="p-8 text-right">
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <MoreVertical className="h-5 w-5 text-slate-300" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* --- DEEP IDENTITY DRAWER --- */}
      <Sheet open={!!activeStudent} onOpenChange={() => setActiveStudent(null)}>
        <SheetContent
          side="right"
          className="w-full sm:max-w-2xl lg:max-w-3xl dark:bg-slate-950 border-0 p-0 overflow-y-auto no-scrollbar shadow-2xl"
        >
          <div className="p-10 md:p-16 bg-primary-700 text-white relative overflow-hidden flex flex-col justify-end min-h-[350px]">
            <div className="absolute -right-10 -bottom-10 opacity-10 rotate-12">
              <UserCircle className="h-96 w-96" />
            </div>
            <div className="relative z-10 space-y-6">
              <Badge className="bg-white/20 text-white border-0 backdrop-blur-md px-4 py-2 font-black text-[10px] uppercase">
                IDENTITY: {activeStudent?.studentId}
              </Badge>
              <h2 className="text-4xl md:text-8xl font-black tracking-tighter leading-none">
                {activeStudent?.user.name}
              </h2>
              <div className="flex flex-wrap gap-8 pt-4 border-t border-white/10">
                <Metric
                  icon={GraduationCap}
                  label="Level Node"
                  value={activeStudent?.currentLevel || "Unassigned"}
                />
                <Metric
                  icon={TrendingUp}
                  label="Mastery Index"
                  value={activeStudent?.hifzLevel || "Juz 30"}
                />
              </div>
            </div>
          </div>

          <div className="p-8 md:p-12">
            <Tabs defaultValue="overview" className="space-y-10">
              <TabsList className="bg-slate-100 dark:bg-slate-900 p-2 rounded-[2rem] w-full h-16 justify-start">
                <TabsTrigger
                  value="overview"
                  className="rounded-xl font-black text-[9px] uppercase tracking-[0.2em] px-8 h-full"
                >
                  The Node
                </TabsTrigger>
                <TabsTrigger
                  value="guardian"
                  className="rounded-xl font-black text-[9px] uppercase tracking-[0.2em] px-8 h-full"
                >
                  Guardian Link
                </TabsTrigger>
                <TabsTrigger
                  value="security"
                  className="rounded-xl font-black text-[9px] uppercase tracking-[0.2em] px-8 h-full text-rose-500"
                >
                  Security Ops
                </TabsTrigger>
              </TabsList>

              <TabsContent
                value="overview"
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                <InfoCard
                  label="Email Pulse"
                  value={activeStudent?.user.email}
                  icon={Mail}
                />
                <InfoCard
                  label="Global Nationality"
                  value={activeStudent?.nationality}
                  icon={Globe}
                />
                <InfoCard
                  label="Registry Entry"
                  value={new Date(
                    activeStudent?.createdAt,
                  ).toLocaleDateString()}
                  icon={Calendar}
                />
                <InfoCard
                  label="Base DNA"
                  value={activeStudent?.gender}
                  icon={Fingerprint}
                />
              </TabsContent>

              <TabsContent value="guardian" className="space-y-6">
                <div className="p-8 bg-slate-950 rounded-[2.5rem] text-white space-y-6 relative overflow-hidden group">
                  <LinkIcon className="absolute -right-6 -bottom-6 h-32 w-32 opacity-10 group-hover:scale-110 transition-transform" />
                  <div className="relative z-10 space-y-4">
                    <h4 className="text-2xl font-black tracking-tighter">
                      Synchronize Guardian Node
                    </h4>
                    <div className="flex gap-2">
                      <Input
                        placeholder="parent@node.com"
                        value={parentEmail}
                        onChange={(e) => setParentEmail(e.target.value)}
                        className="bg-white/10 border-0 h-14 rounded-xl"
                      />
                      <Button
                        onClick={() => handleLinkParent(activeStudent.id)}
                        disabled={isPending}
                        className="bg-white text-slate-950 font-black h-14 px-8 rounded-xl"
                      >
                        {isPending ? (
                          <Loader2 className="animate-spin" />
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
                      <p className="text-[10px] font-black text-primary-700 uppercase">
                        Linked Guardian
                      </p>
                      <p className="text-xl font-black">
                        {activeStudent.parent.user.name}
                      </p>
                    </div>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="security" className="space-y-4">
                <Button
                  onClick={() =>
                    updateStudentPermissions(
                      activeStudent.user.id,
                      activeStudent.user.status === "APPROVED"
                        ? "SUSPENDED"
                        : "APPROVED",
                    )
                  }
                  variant="outline"
                  className="w-full h-16 rounded-2xl font-black text-[10px] uppercase tracking-widest px-8 flex justify-between"
                >
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="h-5 w-5 text-primary-700" /> Toggle
                    Permission Node
                  </div>
                  <ChevronRight className="h-4 w-4" />
                </Button>
                <Button
                  onClick={() => decommissionStudentNode(activeStudent.id)}
                  variant="ghost"
                  className="w-full h-16 rounded-2xl border-2 border-dashed border-rose-100 text-rose-500 font-black text-[10px] uppercase tracking-widest hover:bg-rose-500 hover:text-white"
                >
                  <Trash2 className="h-4 w-4 mr-3" /> Decommission Node
                </Button>
              </TabsContent>
            </Tabs>
          </div>
        </SheetContent>
      </Sheet>

      {/* --- INJECTION MODAL --- */}
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent className="max-w-3xl w-[95vw] md:w-full rounded-[3rem] p-8 md:p-16 dark:bg-slate-950 border-0 shadow-royal overflow-y-auto no-scrollbar max-h-[90vh]">
          <DialogHeader className="mb-10">
            <DialogTitle className="text-3xl md:text-5xl font-black tracking-tighter leading-none">
              Initialize <span className="text-primary-700">Student Node</span>
            </DialogTitle>
            <DialogDescription className="text-xs font-bold uppercase tracking-widest text-slate-400 mt-2">
              Manual Deployment Protocol v2.6
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
                  toast.success("Node Deployed Successfully");
                } catch (e: any) {
                  toast.error(e.message);
                }
              });
            }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase text-slate-400 ml-4">
                  Full Name
                </Label>
                <Input
                  name="name"
                  required
                  className="h-16 rounded-2xl glass-surface px-6 font-bold"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase text-slate-400 ml-4">
                  Identity Email
                </Label>
                <Input
                  name="email"
                  type="email"
                  required
                  className="h-16 rounded-2xl glass-surface px-6 font-bold"
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
                  className="h-16 rounded-2xl glass-surface px-6 font-bold"
                  placeholder="STU-2026-XXX"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase text-slate-400 ml-4">
                  DNA Classification
                </Label>
                <Select name="gender" defaultValue="MALE">
                  <SelectTrigger className="h-16 rounded-2xl bg-slate-100 border-0 dark:bg-slate-900 font-bold">
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
                  Initial Level
                </Label>
                <Input
                  name="currentLevel"
                  className="h-16 rounded-2xl glass-surface px-6 font-bold"
                  placeholder="Primary 1"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase text-slate-400 ml-4">
                  Nationality
                </Label>
                <Input
                  name="nationality"
                  className="h-16 rounded-2xl glass-surface px-6 font-bold"
                />
              </div>
            </div>
            <Button
              type="submit"
              disabled={isPending}
              className="w-full h-20 rounded-[2.5rem] bg-primary-700 text-white font-black text-xl shadow-royal active:scale-95 transition-all"
            >
              {isPending ? <Loader2 className="animate-spin" /> : "DEPLOY NODE"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// --- SUB-COMPONENTS ---

function Metric({ icon: Icon, label, value }: any) {
  return (
    <div className="flex items-center gap-4">
      <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md shadow-inner">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <p className="text-[9px] font-black uppercase text-primary-200 tracking-widest mb-1">
          {label}
        </p>
        <p className="text-xl font-black">{value}</p>
      </div>
    </div>
  );
}

function InfoCard({ label, value, icon: Icon }: any) {
  return (
    <div className="p-6 md:p-8 rounded-[2rem] glass-surface border dark:border-slate-800 transition-all hover:border-primary-700/20">
      <div className="flex items-center gap-3 mb-2">
        <Icon className="h-4 w-4 text-primary-700" />
        <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">
          {label}
        </span>
      </div>
      <p className="text-sm md:text-lg font-black text-slate-900 dark:text-white truncate">
        {value || "NODE_DATA_ABSENT"}
      </p>
    </div>
  );
}
