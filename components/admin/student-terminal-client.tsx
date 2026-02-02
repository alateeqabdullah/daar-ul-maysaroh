"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  Activity,
  ArrowUpCircle,
  Award,
  CheckCircle,
  ChevronRight,
  Globe,
  GraduationCap,
  Heart,
  LayoutGrid,
  List,
  Loader2,
  Mail,
  Phone,
  Plus,
  Search,
  UserCheck,
  Users,
  Wallet
} from "lucide-react";
import { useEffect, useMemo, useState, useTransition } from "react";

// Actions
import {
  bulkEnrollStudents,
  decommissionStudent,
  getStudentContext,
  linkGuardian,
  manageStudentNode,
  promoteStudent,
  updateStudentStatus,
} from "@/app/actions/admin/students/actions";

// UI Components
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
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
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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

  // --- STATISTICAL ENGINE ---
  const stats = useMemo(() => {
    return {
      total: initialStudents.length,
      male: initialStudents.filter((s) => s.gender === "MALE").length,
      female: initialStudents.filter((s) => s.gender === "FEMALE").length,
      pending: initialStudents.filter((s) => s.user.status === "PENDING")
        .length,
    };
  }, [initialStudents]);

  // --- HANDLERS ---

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    startTransition(async () => {
      try {
        const res = await manageStudentNode(data);
        if (res.success) {
          toast.success("Identity Injected Successfully");
          setIsAddModalOpen(false);
        }
      } catch (e: any) {
        toast.error(e.message);
      }
    });
  };

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
    const nextStatus = status === "APPROVED" ? "SUSPENDED" : "APPROVED";
    startTransition(async () => {
      try {
        await updateStudentStatus(userId, nextStatus);
        toast.success(`Security status set to ${nextStatus}`);
      } catch (e: any) {
        toast.error(e.message);
      }
    });
  };

  const handleBulkEnroll = async (classId: string) => {
    startTransition(async () => {
      try {
        const res = await bulkEnrollStudents(selectedIds, classId);
        if (res.success) {
          toast.success(`Synchronized ${selectedIds.length} nodes`);
          setSelectedIds([]);
          setIsBulkModalOpen(false);
        }
      } catch (e: any) {
        toast.error(e.message);
      }
    });
  };

  const handleLinkGuardian = async (studentId: string, email: string) => {
    if (!email) return toast.error("Email Required");
    startTransition(async () => {
      try {
        await linkGuardian(studentId, email);
        toast.success("Guardian handshaked successfully");
      } catch (e: any) {
        toast.error(e.message);
      }
    });
  };

  const handleDecommission = async (id: string) => {
    if (!confirm("Permanent Node Deletion?")) return;
    startTransition(async () => {
      try {
        await decommissionStudent(id);
        toast.success("Identity erased");
        setActiveStudent(null);
      } catch (e: any) {
        toast.error(e.message);
      }
    });
  };

  // Logic: Filter
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
      {/* --- ELITE SUMMARY CARDS --- */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        <SummaryCard
          label="Total Nodes"
          value={stats.total}
          icon={Users}
          color="purple"
        />
        <SummaryCard
          label="Male Nodes"
          value={stats.male}
          icon={UserCheck}
          color="indigo"
        />
        <SummaryCard
          label="Female Nodes"
          value={stats.female}
          icon={Heart}
          color="pink"
        />
        <SummaryCard
          label="Waitlisted"
          value={stats.pending}
          icon={Activity}
          color="gold"
        />
      </div>

      {/* --- ELITE TOP COMMAND BAR --- */}
      <header className="space-y-8">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 bg-white dark:bg-slate-900 p-8 md:p-12 rounded-[3rem] shadow-sm border border-slate-100 dark:border-slate-800 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-12 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity pointer-events-none">
            <GraduationCap className="h-64 w-64 rotate-12" />
          </div>
          <div className="space-y-4 relative z-10">
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-none">
              Student <span className="text-primary-700">Registry</span>
            </h1>
          </div>
          <Button
            onClick={() => setIsAddModalOpen(true)}
            className="h-16 md:h-20 px-10 rounded-[1.8rem] bg-primary-700 text-white font-black uppercase text-xs tracking-widest shadow-royal hover:scale-105 transition-all"
          >
            <Plus className="mr-2 h-5 w-5" /> Inject Node
          </Button>
        </div>

        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-1 w-full group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-primary-700" />
            <input
              placeholder="Deep search node identities..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-16 md:h-20 pl-16 pr-8 glass-surface rounded-[1.5rem] md:rounded-[2.5rem] outline-none border-0 focus:ring-4 ring-primary-700/10 font-bold dark:bg-slate-900 dark:text-white"
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
          {selectedIds.length > 0 && (
            <Button
              onClick={() => setIsBulkModalOpen(true)}
              className="h-16 md:h-20 px-10 rounded-[1.8rem] bg-gold text-white font-black uppercase shadow-xl"
            >
              <Users className="mr-3 h-5 w-5" /> Bulk Protocol (
              {selectedIds.length})
            </Button>
          )}
        </div>
      </header>

      {/* DYNAMIC VIEW ENGINE */}
      <AnimatePresence mode="wait">
        {viewMode === "grid" ? (
          <motion.div
            key="grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filtered.map((s) => (
              <div
                key={s.id}
                onClick={() => setActiveStudent(s)}
                className="institutional-card glass-surface p-8 cursor-pointer group flex flex-col justify-between min-h-[400px] relative"
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
                  />
                </div>
                <div className="space-y-6">
                  <Avatar className="h-20 w-20 border-4 border-white dark:border-slate-800 shadow-xl group-hover:rotate-6 transition-transform">
                    <AvatarImage src={s.user.image} />
                    <AvatarFallback className="font-black text-primary-700">
                      {s.user.name[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-[10px] font-black text-primary-700 uppercase mb-1">
                      {s.studentId}
                    </p>
                    <h3 className="text-2xl font-black text-slate-900 dark:text-white leading-none">
                      {s.user.name}
                    </h3>
                    <Badge className="mt-4 bg-emerald-500/10 text-emerald-600 border-0 uppercase text-[8px] font-black">
                      {s.user.status}
                    </Badge>
                  </div>
                </div>
                <div className="pt-8 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-slate-400">
                  {s.currentLevel || "Unleveled"}
                  <ChevronRight className="h-4 w-4" />
                </div>
              </div>
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
                    Identity
                  </th>
                  <th className="p-8 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                    Classification
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
                    className="border-b dark:border-slate-800 hover:bg-slate-50/50 cursor-pointer transition-all"
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
                      <div className="flex items-center gap-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={s.user.image} />
                        </Avatar>
                        <div>
                          <p className="text-[10px] font-black text-primary-700 uppercase">
                            {s.studentId}
                          </p>
                          <p className="text-lg font-black">{s.user.name}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-8 text-xs font-black uppercase">
                      {s.currentLevel || "N/A"}
                    </td>
                    <td className="p-8">
                      <Badge
                        className={
                          s.user.status === "APPROVED"
                            ? "bg-emerald-500"
                            : "bg-rose-500"
                        }
                      >
                        {s.user.status}
                      </Badge>
                    </td>
                    <td className="p-8 text-right">
                      <ChevronRight className="h-5 w-5 text-slate-300" />
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
          <SheetHeader className="sr-only">
            <SheetTitle>
              Identity Terminal: {activeStudent?.user.name}
            </SheetTitle>
            <SheetDescription>Deep identity synchronization</SheetDescription>
          </SheetHeader>
          <div className="p-10 md:p-16 bg-primary-700 text-white min-h-[450px] flex flex-col justify-end">
            <div className="relative z-10 space-y-8">
              <Avatar className="h-24 w-24 border-4 border-white shadow-2xl">
                <AvatarImage src={activeStudent?.user.image} />
              </Avatar>
              <h2 className="text-6xl md:text-8xl font-black tracking-tighter leading-none">
                {activeStudent?.user.name}
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-10 border-t border-white/10">
                <Metric
                  label="Mastered"
                  value={analytics?.masteredSurahs || "0"}
                  icon={Award}
                />
                <Metric label="Attendance" value="94%" icon={CheckCircle} />
                <Metric label="Health" value="Optimal" icon={Heart} />
                <Metric label="Finance" value="CLEARED" icon={Wallet} />
              </div>
            </div>
          </div>
          <div className="p-8 md:p-16">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="bg-slate-100 dark:bg-slate-900 p-2 rounded-[2.5rem] w-full h-16 justify-start">
                <TabsTrigger
                  value="overview"
                  className="rounded-xl font-black text-xs uppercase px-10 h-full"
                >
                  Identity
                </TabsTrigger>
                <TabsTrigger
                  value="academic"
                  className="rounded-xl font-black text-xs uppercase px-10 h-full"
                >
                  Promotion
                </TabsTrigger>
                <TabsTrigger
                  value="guardian"
                  className="rounded-xl font-black text-xs uppercase px-10 h-full"
                >
                  Guardian
                </TabsTrigger>
                <TabsTrigger
                  value="ops"
                  className="rounded-xl font-black text-xs uppercase px-10 h-full text-rose-500"
                >
                  Security
                </TabsTrigger>
              </TabsList>
              <TabsContent
                value="overview"
                className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8"
              >
                <InfoCard
                  label="Registry Email"
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
                  label="Contact"
                  value={activeStudent?.phone}
                  icon={Phone}
                />
              </TabsContent>
              <TabsContent value="academic" className="mt-8">
                <div className="p-10 bg-indigo-600 rounded-[3rem] text-white">
                  <h4 className="text-3xl font-black mb-6">Level Promotion</h4>
                  <Select
                    onValueChange={(v) => handlePromotion(activeStudent.id, v)}
                  >
                    <SelectTrigger className="h-16 rounded-2xl bg-white/10 border-0 text-white font-black px-8">
                      <SelectValue placeholder="Target Tier..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Beginner">Beginner</SelectItem>
                      <SelectItem value="Intermediate">Intermediate</SelectItem>
                      <SelectItem value="Advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </TabsContent>
              <TabsContent value="guardian" className="mt-8">
                <div className="p-10 bg-slate-900 rounded-[3rem] text-white">
                  <h4 className="text-2xl font-black mb-6">
                    Establish Relationship
                  </h4>
                  <div className="flex gap-4">
                    <Input
                      placeholder="parent@node.com"
                      className="h-16 bg-white/5 border-0 rounded-2xl"
                      id="pEmail"
                    />
                    <Button
                      onClick={() =>
                        handleLinkGuardian(
                          activeStudent.id,
                          (
                            document.getElementById(
                              "pEmail",
                            ) as HTMLInputElement
                          ).value,
                        )
                      }
                      className="h-16 px-10 bg-white text-slate-900 font-black rounded-2xl"
                    >
                      Establish
                    </Button>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="ops" className="space-y-4 pt-8">
                <Button
                  onClick={() =>
                    handleStatusChange(
                      activeStudent.user.id,
                      activeStudent.user.status,
                    )
                  }
                  className="h-20 w-full rounded-[2rem] bg-white dark:bg-slate-900 border-2 font-black uppercase text-xs"
                >
                  Toggle Identity Permission
                </Button>
                <Button
                  onClick={() => handleDecommission(activeStudent.id)}
                  variant="ghost"
                  className="h-24 w-full rounded-[3rem] border-4 border-dashed border-rose-100 text-rose-500 font-black uppercase text-xs hover:bg-rose-500 hover:text-white transition-all"
                >
                  Execute Decommissioning
                </Button>
              </TabsContent>
            </Tabs>
          </div>
        </SheetContent>
      </Sheet>

      {/* --- INJECTION MODAL (FIXED & COMPLETE) --- */}
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent className="max-w-3xl w-[95vw] md:w-full rounded-[2.5rem] md:rounded-[4rem] p-6 md:p-16 dark:bg-slate-950 border-0 shadow-royal overflow-y-auto no-scrollbar max-h-[90vh]">
          <DialogHeader className="mb-10 text-left">
            <DialogTitle className="text-4xl md:text-5xl font-black tracking-tighter leading-none">
              Initialize <span className="text-primary-700">Student Node</span>
            </DialogTitle>
            <DialogDescription className="text-xs font-bold uppercase tracking-widest text-slate-400 mt-2">
              Core Registry Deployment protocol v2.6
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleCreate} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase text-slate-400 ml-4">
                  Legal Name
                </Label>
                <Input
                  name="name"
                  required
                  placeholder="Ahmad Abdullah"
                  className="h-16 rounded-2xl glass-surface px-8 font-bold text-lg dark:bg-slate-900 border-0 shadow-inner"
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
                  placeholder="ahmad@node.com"
                  className="h-16 rounded-2xl glass-surface px-8 font-bold text-lg dark:bg-slate-900 border-0 shadow-inner"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase text-slate-400 ml-4">
                  Registry ID
                </Label>
                <Input
                  name="studentId"
                  required
                  placeholder="STU-2026-XXX"
                  className="h-16 rounded-2xl glass-surface px-8 font-bold text-lg dark:bg-slate-900 border-0 shadow-inner"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase text-slate-400 ml-4">
                  Gender Classification
                </Label>
                <Select name="gender" defaultValue="MALE">
                  <SelectTrigger className="h-16 rounded-2xl border-0 bg-slate-100 dark:bg-slate-900 font-bold px-8 shadow-inner">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="rounded-2xl border-0 shadow-2xl">
                    <SelectItem value="MALE" className="py-4 font-bold">
                      MALE NODE
                    </SelectItem>
                    <SelectItem value="FEMALE" className="py-4 font-bold">
                      FEMALE NODE
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase text-slate-400 ml-4">
                  Base Level
                </Label>
                <Select name="currentLevel" defaultValue="Beginner">
                  <SelectTrigger className="h-16 rounded-2xl border-0 bg-slate-100 dark:bg-slate-900 font-bold px-8 shadow-inner">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="rounded-2xl border-0 shadow-2xl">
                    <SelectItem value="Beginner" className="py-4 font-bold">
                      Beginner Tier
                    </SelectItem>
                    <SelectItem value="Intermediate" className="py-4 font-bold">
                      Intermediate Tier
                    </SelectItem>
                    <SelectItem value="Advanced" className="py-4 font-bold">
                      Advanced Tier
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase text-slate-400 ml-4">
                  Nationality Node
                </Label>
                <Input
                  name="nationality"
                  placeholder="e.g. Nigerian"
                  className="h-16 rounded-2xl glass-surface px-8 font-bold text-lg dark:bg-slate-900 border-0 shadow-inner"
                />
              </div>
            </div>

            <div className="pt-6">
              <Button
                type="submit"
                disabled={isPending}
                className="w-full h-24 rounded-[2.5rem] bg-primary-700 text-white font-black text-xl shadow-royal hover:scale-[1.02] active:scale-95 transition-all group"
              >
                {isPending ? (
                  <Loader2 className="animate-spin h-8 w-8" />
                ) : (
                  <span className="flex items-center gap-4">
                    DEPLOY IDENTITY BLUEPRINT{" "}
                    <ChevronRight className="group-hover:translate-x-2 transition-transform" />
                  </span>
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* --- BULK MODAL --- */}
      <Dialog open={isBulkModalOpen} onOpenChange={setIsBulkModalOpen}>
        <DialogContent className="max-w-xl rounded-[4rem] p-16 dark:bg-slate-950 border-0 shadow-royal">
          <DialogHeader className="mb-10 text-left">
            <DialogTitle className="text-4xl font-black tracking-tighter text-slate-900 dark:text-white">
              Bulk Protocol
            </DialogTitle>
            <DialogDescription className="text-xs font-bold text-slate-400 uppercase tracking-widest pt-2">
              Syncing {selectedIds.length} Nodes
            </DialogDescription>
          </DialogHeader>
          <Select onValueChange={handleBulkEnroll}>
            <SelectTrigger className="h-20 rounded-[2rem] border-0 bg-slate-100 dark:bg-slate-900 font-black text-xl">
              <SelectValue placeholder="Identify Target..." />
            </SelectTrigger>
            <SelectContent className="rounded-3xl border-0 shadow-2xl">
              {(classes || []).map((c: any) => (
                <SelectItem
                  key={c.id}
                  value={c.id}
                  className="py-6 font-bold text-lg"
                >
                  {c.name} — {c.code}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// --- SUB-COMPONENTS ---

function SummaryCard({ label, value, icon: Icon, color }: any) {
  const themes: any = {
    purple: "bg-primary-700 text-white shadow-primary-700/20",
    indigo: "bg-indigo-600 text-white shadow-indigo-600/20",
    gold: "bg-gold text-white shadow-gold/20",
    pink: "bg-rose-500 text-white shadow-rose-500/20",
  };
  return (
    <motion.div
      variants={kItem}
      className={`p-6 rounded-[2.5rem] ${themes[color]} shadow-xl relative overflow-hidden group`}
    >
      <Icon className="absolute -right-2 -bottom-2 h-20 w-20 opacity-10 group-hover:rotate-12 transition-transform" />
      <p className="text-[10px] font-black uppercase tracking-widest mb-1 opacity-80">
        {label}
      </p>
      <h4 className="text-4xl font-black tracking-tighter leading-none">
        {value}
      </h4>
    </motion.div>
  );
}

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
