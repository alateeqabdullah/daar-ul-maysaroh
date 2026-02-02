"use client";

import { useState, useTransition, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Plus,
  MoreVertical,
  ShieldAlert,
  GraduationCap,
  Mail,
  Globe,
  Zap,
  Loader2,
  Calendar,
  Trash2,
  ChevronRight,
  Award,
  UserCircle,
  MapPin,
  TrendingUp,
  Wallet,
  CheckCircle,
  Filter,
  UserPlus,
  ArrowUpCircle,
  Users,
  X,
  Info,
  LayoutGrid,
  List,
  BarChart3,
  Fingerprint,
  Phone,
  Link as LinkIcon,
  ShieldCheck,
  Heart,
} from "lucide-react";

// Actions
import {
  manageStudentNode,
  updateStudentStatus,
  linkGuardian,
  decommissionStudent,
  bulkEnrollStudents,
  promoteStudent,
  getStudentContext,
} from "@/app/actions/admin/students/actions";

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
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

// --- ANIMATION CONFIG ---
const kContainer = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.04 } },
};
const kItem = { hidden: { y: 20, opacity: 0 }, show: { y: 0, opacity: 1 } };

export default function StudentTerminalClient({
  initialStudents = [],
  classes = [],
}: {
  initialStudents: any[];
  classes: any[];
}) {
  const [isPending, startTransition] = useTransition();

  // Terminal UI State
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [search, setSearch] = useState("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [activeStudent, setActiveStudent] = useState<any>(null);
  const [analytics, setAnalytics] = useState<any>(null);

  // Modal Control
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isBulkModalOpen, setIsBulkModalOpen] = useState(false);

  // --- MISSING BRIDGE FUNCTIONS ADDED HERE ---

  const handlePromotion = (id: string, level: string) => {
    startTransition(async () => {
      try {
        await promoteStudent(id, level);
        toast.success("Academic Node Promoted", {
          icon: <ArrowUpCircle className="text-gold" />,
        });
      } catch (e: any) {
        toast.error(e.message);
      }
    });
  };

  const handleStatusChange = (userId: string, status: any) => {
    startTransition(async () => {
      try {
        await updateStudentStatus(userId, status);
        toast.success(`Security Node: ${status}`);
      } catch (e: any) {
        toast.error(e.message);
      }
    });
  };

  const handleBulkEnroll = async (classId: string) => {
    if (selectedIds.length === 0) return;
    startTransition(async () => {
      try {
        const res = await bulkEnrollStudents(selectedIds, classId);
        if (res.success) {
          toast.success(`Synchronized ${selectedIds.length} nodes to class`);
          setSelectedIds([]);
          setIsBulkModalOpen(false);
        }
      } catch (e: any) {
        toast.error(e.message || "Bulk enrollment failed");
      }
    });
  };

  // Logic: Real-time Filtering
  const filtered = useMemo(() => {
    return (initialStudents || []).filter(
      (s: any) =>
        s.user.name.toLowerCase().includes(search.toLowerCase()) ||
        s.studentId.toLowerCase().includes(search.toLowerCase()),
    );
  }, [initialStudents, search]);

  // Logic: Deep Analytics Handshake
  useEffect(() => {
    if (activeStudent) {
      startTransition(async () => {
        const context = await getStudentContext(activeStudent.id);
        setAnalytics(context);
      });
    }
  }, [activeStudent]);

  return (
    <div className="max-w-[1800px] mx-auto space-y-8 pb-40 px-4 md:px-10 mt-6">
      {/* --- ELITE TOP COMMAND BAR --- */}
      <header className="space-y-8">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 bg-white dark:bg-slate-900 p-8 md:p-12 rounded-[3rem] shadow-sm border border-slate-100 dark:border-slate-800 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-12 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity pointer-events-none">
            <GraduationCap className="h-64 w-64 rotate-12" />
          </div>

          <div className="space-y-4 relative z-10">
            <div className="flex items-center gap-3">
              <div className="h-3 w-3 rounded-full bg-primary-700 animate-pulse" />
              <Badge className="bg-primary-700/5 text-primary-700 border-primary-700/10 font-black text-[10px] uppercase tracking-[0.4em] px-4 py-1.5 rounded-full">
                Daar-ul-Maysaroh Intel
              </Badge>
            </div>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-none text-slate-900 dark:text-white">
              Identity <span className="text-primary-700">Nodes</span>
            </h1>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto relative z-10">
            <Button
              onClick={() => setIsAddModalOpen(true)}
              className="h-16 md:h-20 px-10 rounded-[1.8rem] md:rounded-[2.5rem] bg-primary-700 text-white font-black uppercase text-xs tracking-[0.2em] shadow-royal hover:scale-105 transition-all"
            >
              <Plus className="mr-2 h-5 w-5" /> Inject Node
            </Button>
          </div>
        </div>

        {/* Global Controls */}
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-1 w-full group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-primary-700 transition-colors" />
            <input
              placeholder="Deep search node identities..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-16 md:h-20 pl-16 pr-8 glass-surface rounded-[1.5rem] md:rounded-[2.5rem] outline-none border-0 focus:ring-4 ring-primary-700/10 font-bold text-lg dark:bg-slate-900 dark:text-white"
            />
          </div>

          <div className="flex items-center gap-2 p-2 bg-slate-100 dark:bg-slate-800 rounded-[1.8rem]">
            <button
              onClick={() => setViewMode("grid")}
              className={`h-12 w-16 flex items-center justify-center rounded-2xl transition-all ${viewMode === "grid" ? "bg-white dark:bg-slate-900 text-primary-700 shadow-sm" : "text-slate-400"}`}
            >
              <LayoutGrid className="h-5 w-5" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`h-12 w-16 flex items-center justify-center rounded-2xl transition-all ${viewMode === "list" ? "bg-white dark:bg-slate-900 text-primary-700 shadow-sm" : "text-slate-400"}`}
            >
              <List className="h-5 w-5" />
            </button>
          </div>

          <AnimatePresence>
            {selectedIds.length > 0 && (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
              >
                <Button
                  onClick={() => setIsBulkModalOpen(true)}
                  className="h-16 md:h-20 px-10 rounded-[1.8rem] md:rounded-[2.5rem] bg-gold text-white font-black uppercase text-xs tracking-widest shadow-xl relative overflow-hidden"
                >
                  <Users className="mr-3 h-5 w-5" /> Bulk Protocol (
                  {selectedIds.length})
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* --- DYNAMIC VIEW ENGINE --- */}
      <AnimatePresence mode="wait">
        {viewMode === "grid" ? (
          <motion.div
            key="grid"
            variants={kContainer}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filtered.map((s) => (
              <motion.div
                layout
                key={s.id}
                variants={kItem}
                onClick={() => setActiveStudent(s)}
                className="institutional-card glass-surface p-8 cursor-pointer group hover:border-primary-700/50 transition-all dark:bg-slate-900/40 flex flex-col justify-between min-h-[400px] relative overflow-hidden"
              >
                <div
                  className="absolute top-0 right-0 p-4"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Checkbox
                    checked={selectedIds.includes(s.id)}
                    onCheckedChange={(v) =>
                      setSelectedIds((prev) =>
                        v ? [...prev, s.id] : prev.filter((id) => id !== s.id),
                      )
                    }
                    className="h-6 w-6 rounded-full border-slate-200"
                  />
                </div>
                <div className="space-y-6">
                  <Avatar className="h-20 w-20 border-4 border-white dark:border-slate-800 shadow-xl group-hover:scale-110 transition-transform">
                    <AvatarImage src={s.user.image} />
                    <AvatarFallback className="font-black text-primary-700">
                      {s.user.name[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-[10px] font-black text-primary-700 uppercase tracking-widest mb-1">
                      {s.studentId}
                    </p>
                    <h3 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white leading-none">
                      {s.user.name}
                    </h3>
                    <div className="flex gap-2 mt-4">
                      <Badge
                        variant="outline"
                        className="text-[8px] font-black uppercase tracking-widest border-slate-200"
                      >
                        {s.currentLevel || "Unset"}
                      </Badge>
                      <Badge className="bg-emerald-500/10 text-emerald-600 border-0 uppercase text-[8px] font-black">
                        {s.user.status}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="pt-8 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
                  <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">
                    Mastery: {s.hifzLevel || "Juz 30"}
                  </p>
                  <ChevronRight className="h-5 w-5 text-slate-300 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="institutional-card glass-surface overflow-hidden"
          >
            <table className="w-full text-left">
              <thead className="bg-slate-50 dark:bg-slate-900/50 border-b dark:border-slate-800">
                <tr>
                  <th className="p-8 w-12">
                    <Checkbox
                      onCheckedChange={(checked) =>
                        setSelectedIds(checked ? filtered.map((s) => s.id) : [])
                      }
                    />
                  </th>
                  <th className="p-8 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                    Node Identity
                  </th>
                  <th className="p-8 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                    Classification
                  </th>
                  <th className="p-8 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                    Mastery Index
                  </th>
                  <th className="p-8 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                    Status
                  </th>
                  <th className="p-8"></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((s) => (
                  <tr
                    key={s.id}
                    onClick={() => setActiveStudent(s)}
                    className="group border-b dark:border-slate-800 hover:bg-slate-50/80 dark:hover:bg-slate-900/40 transition-all cursor-pointer"
                  >
                    <td className="p-8" onClick={(e) => e.stopPropagation()}>
                      <Checkbox
                        checked={selectedIds.includes(s.id)}
                        onCheckedChange={(v) =>
                          setSelectedIds((prev) =>
                            v
                              ? [...prev, s.id]
                              : prev.filter((id) => id !== s.id),
                          )
                        }
                      />
                    </td>
                    <td className="p-8">
                      <div className="flex items-center gap-5">
                        <Avatar className="h-14 w-14 ring-4 ring-white shadow-lg">
                          <AvatarImage src={s.user.image} />
                        </Avatar>
                        <div>
                          <p className="text-[10px] font-black text-primary-700 uppercase">
                            {s.studentId}
                          </p>
                          <p className="text-xl font-black dark:text-white leading-none">
                            {s.user.name}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="p-8">
                      <p className="text-sm font-black dark:text-white">
                        {s.currentLevel || "Unleveled"}
                      </p>
                      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                        {s.academicYear}
                      </p>
                    </td>
                    <td className="p-8">
                      <span className="text-xs font-black text-primary-700">
                        {s.hifzLevel || "Juz 30"}
                      </span>
                    </td>
                    <td className="p-8">
                      <Badge
                        className={`rounded-full px-5 py-1.5 font-black text-[9px] uppercase border-0 text-white ${s.user.status === "APPROVED" ? "bg-emerald-500" : "bg-amber-500"}`}
                      >
                        {s.user.status}
                      </Badge>
                    </td>
                    <td className="p-8 text-right">
                      <ChevronRight className="h-6 w-6 text-slate-200" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- IDENTITY DRAWER --- */}
      <Sheet open={!!activeStudent} onOpenChange={() => setActiveStudent(null)}>
        <SheetContent
          side="right"
          className="w-full sm:max-w-3xl lg:max-w-4xl dark:bg-slate-950 border-0 p-0 overflow-y-auto no-scrollbar shadow-2xl"
        >
          {/* ACCESSIBILITY FIX: Added SheetTitle */}
          <SheetHeader className="sr-only">
            <SheetTitle>
              Identity Terminal: {activeStudent?.user.name}
            </SheetTitle>
            <SheetDescription>
              Deep identity synchronization for node {activeStudent?.studentId}
            </SheetDescription>
          </SheetHeader>

          <div className="p-10 md:p-16 bg-primary-700 text-white relative overflow-hidden min-h-[450px] flex flex-col justify-end">
            <div className="absolute -right-20 -bottom-20 opacity-10 rotate-12">
              <Fingerprint className="h-[500px] w-[500px]" />
            </div>
            <div className="relative z-10 space-y-8">
              <div className="flex items-center gap-4">
                <Avatar className="h-24 w-24 border-4 border-white/20 shadow-2xl">
                  <AvatarImage src={activeStudent?.user.image} />
                </Avatar>
                <Badge className="bg-white/20 text-white border-0 backdrop-blur-md px-5 py-2 font-black text-[10px] uppercase tracking-[0.3em] rounded-full">
                  STUDENT_NODE :: {activeStudent?.studentId}
                </Badge>
              </div>
              <h2 className="text-6xl md:text-9xl font-black tracking-tighter leading-none">
                {activeStudent?.user.name}
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-10 border-t border-white/10">
                <Metric
                  label="Mastered"
                  value={analytics?.masteredSurahs || "0"}
                  icon={Award}
                />
                <Metric label="Attendance" value="94%" icon={CheckCircle} />
                <Metric label="Health Node" value="Optimal" icon={Heart} />
                <Metric label="Finance" value="CLEARED" icon={Wallet} />
              </div>
            </div>
          </div>

          <div className="p-8 md:p-16">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="bg-slate-100 dark:bg-slate-900 p-2 rounded-[2.5rem] w-full justify-start h-20 mb-16 overflow-x-auto no-scrollbar shadow-inner">
                <TabsTrigger
                  value="overview"
                  className="rounded-[1.5rem] font-black text-xs uppercase tracking-widest px-10 h-full"
                >
                  Identity
                </TabsTrigger>
                <TabsTrigger
                  value="academic"
                  className="rounded-[1.5rem] font-black text-xs uppercase tracking-widest px-10 h-full"
                >
                  Promotion
                </TabsTrigger>
                <TabsTrigger
                  value="guardian"
                  className="rounded-[1.5rem] font-black text-xs uppercase tracking-widest px-10 h-full"
                >
                  Linking
                </TabsTrigger>
                <TabsTrigger
                  value="ops"
                  className="rounded-[1.5rem] font-black text-xs uppercase tracking-widest px-10 h-full text-rose-500"
                >
                  Security
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InfoCard
                    label="Registry Email"
                    value={activeStudent?.user.email}
                    icon={Mail}
                  />
                  <InfoCard
                    label="Node Nationality"
                    value={activeStudent?.nationality}
                    icon={Globe}
                  />
                  <InfoCard
                    label="Biometric Gender"
                    value={activeStudent?.gender}
                    icon={Users}
                  />
                  <InfoCard
                    label="Contact Sync"
                    value={activeStudent?.phone || "Not Encrypted"}
                    icon={Phone}
                  />
                </div>
              </TabsContent>

              <TabsContent value="academic" className="space-y-8">
                <div className="p-10 bg-indigo-600 rounded-[3rem] text-white space-y-8 shadow-2xl">
                  <h4 className="text-4xl font-black tracking-tighter">
                    Level Promotion
                  </h4>
                  <Select
                    onValueChange={(v) => handlePromotion(activeStudent.id, v)}
                  >
                    <SelectTrigger className="h-16 rounded-2xl bg-white/10 border-0 text-white font-black text-lg">
                      <SelectValue placeholder="Select Target Tier..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Beginner">Beginner Tier</SelectItem>
                      <SelectItem value="Intermediate">
                        Intermediate Tier
                      </SelectItem>
                      <SelectItem value="Advanced">Advanced Tier</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </TabsContent>

              <TabsContent value="guardian" className="space-y-6">
                <div className="p-10 bg-slate-900 rounded-[3rem] text-white space-y-8 shadow-2xl">
                  <h4 className="text-3xl font-black tracking-tight">
                    Guardian Handshake
                  </h4>
                  <div className="flex gap-4">
                    <Input
                      placeholder="parent@registry.node"
                      className="h-16 bg-white/5 border-0 rounded-2xl px-8 font-bold"
                      id="pEmail"
                    />
                    <Button
                      onClick={() => {
                        const email = (
                          document.getElementById("pEmail") as HTMLInputElement
                        ).value;
                        handleLinkGuardian(activeStudent.id, email);
                      }}
                      className="h-16 px-10 bg-white text-slate-900 font-black rounded-2xl hover:bg-primary-700 hover:text-white transition-all"
                    >
                      CONNECT
                    </Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="ops" className="space-y-6 pt-4">
                <Button
                  onClick={() =>
                    handleStatusChange(
                      activeStudent.user.id,
                      activeStudent.user.status === "APPROVED"
                        ? "SUSPENDED"
                        : "APPROVED",
                    )
                  }
                  className="h-20 w-full rounded-[2rem] bg-white dark:bg-slate-900 border-2 font-black uppercase text-xs tracking-widest text-slate-900 dark:text-white"
                >
                  <ShieldCheck className="mr-3 h-5 w-5" /> Toggle Identity
                  Permission
                </Button>
                <Button
                  onClick={() => handleDecommission(activeStudent.id)}
                  variant="ghost"
                  className="h-24 w-full rounded-[3rem] border-4 border-dashed border-rose-100 text-rose-500 font-black uppercase text-xs tracking-[0.2em] hover:bg-rose-500 hover:text-white transition-all"
                >
                  <Trash2 className="mr-3 h-6 w-6" /> Execute Decommissioning
                </Button>
              </TabsContent>
            </Tabs>
          </div>
        </SheetContent>
      </Sheet>

      {/* --- BULK ACTION MODAL --- */}
      <Dialog open={isBulkModalOpen} onOpenChange={setIsBulkModalOpen}>
        <DialogContent className="max-w-2xl rounded-[4rem] p-16 dark:bg-slate-950 border-0 shadow-royal overflow-hidden">
          {/* ACCESSIBILITY FIX: Added DialogTitle */}
          <DialogHeader className="mb-12 relative z-10 text-left">
            <DialogTitle className="text-5xl font-black tracking-tighter leading-none text-slate-900 dark:text-white">
              Bulk <span className="text-primary-700">Protocol</span>
            </DialogTitle>
            <DialogDescription className="font-black text-[11px] uppercase tracking-[0.3em] text-slate-400 mt-4 flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-gold animate-pulse" />
              Synchronizing {selectedIds.length} Identity Nodes
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-10 relative z-10">
            <div className="space-y-4">
              <Label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 ml-4">
                Identify Target Academic Node
              </Label>
              <Select onValueChange={handleBulkEnroll}>
                <SelectTrigger className="h-20 rounded-[2rem] border-0 bg-slate-100 dark:bg-slate-900 font-black text-xl px-8 shadow-inner focus:ring-4 ring-primary-700/10 dark:text-white">
                  <SelectValue placeholder="Identify Target..." />
                </SelectTrigger>
                <SelectContent className="rounded-3xl border-0 shadow-2xl">
                  {classes.length > 0 ? (
                    classes.map((c: any) => (
                      <SelectItem
                        key={c.id}
                        value={c.id}
                        className="font-bold py-6 text-lg border-b last:border-0"
                      >
                        {c.name} — {c.code}
                      </SelectItem>
                    ))
                  ) : (
                    <div className="p-10 text-center font-black text-slate-300 uppercase">
                      No target nodes found
                    </div>
                  )}
                </SelectContent>
              </Select>
            </div>
            <div className="p-8 bg-gold/10 rounded-[2.5rem] border border-gold/20">
              <p className="text-xs font-bold text-gold text-center uppercase tracking-widest leading-relaxed">
                CAUTION: This protocol will override existing enrollments for
                the selected identity nodes.
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// --- ELITE SUB-COMPONENTS ---

function Metric({ icon: Icon, label, value }: any) {
  return (
    <div className="flex items-center gap-4">
      <div className="p-4 rounded-[1.5rem] bg-white/10 backdrop-blur-md shadow-inner border border-white/5">
        <Icon className="h-6 w-6" />
      </div>
      <div>
        <p className="text-[10px] font-black uppercase text-primary-200 tracking-[0.2em] leading-none mb-1.5">
          {label}
        </p>
        <p className="text-3xl font-black leading-none tracking-tighter">
          {value}
        </p>
      </div>
    </div>
  );
}

function InfoCard({ label, value, icon: Icon }: any) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="p-8 md:p-10 rounded-[2.5rem] glass-surface border dark:border-slate-800 transition-all hover:border-primary-700/30 group bg-white/50 dark:bg-slate-900/30"
    >
      <div className="flex items-center gap-4 mb-3">
        <div className="p-2 rounded-xl bg-primary-700/10 text-primary-700 group-hover:rotate-12 transition-transform">
          <Icon className="h-4 w-4" />
        </div>
        <span className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">
          {label}
        </span>
      </div>
      <p className="text-xl font-black text-slate-900 dark:text-white truncate tracking-tight">
        {value || "NODE_ABSENT"}
      </p>
    </motion.div>
  );
}
