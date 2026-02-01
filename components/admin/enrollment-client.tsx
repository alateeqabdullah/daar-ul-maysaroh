"use client";

import { useState, useTransition, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  Search,
  Zap,
  CheckCircle2,
  Loader2,
  GraduationCap,
  Layers,
  Fingerprint,
  ArrowRight,
  ShieldCheck,
  X,
  Filter,
  LayoutList,
} from "lucide-react";
import { bulkEnrollNodes } from "@/app/actions/admin/enrollment/actions";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

export default function EnrollmentTerminal({ classes, students }: any) {
  const [isPending, startTransition] = useTransition();
  const [targetClassId, setTargetClassId] = useState<string | null>(null);
  const [selectedPool, setSelectedPool] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [config, setConfig] = useState({ type: "REGULAR", status: "ACTIVE" });

  const targetClass = useMemo(
    () => classes.find((c: any) => c.id === targetClassId),
    [targetClassId, classes],
  );

  // Intelligence: Filter pool based on search AND exclude students already in this class
  const studentPool = useMemo(() => {
    return students.filter((s: any) => {
      const isAlreadyEnrolled = s.enrollments?.some(
        (e: any) => e.classId === targetClassId,
      );
      const matchesSearch =
        s.user.name.toLowerCase().includes(search.toLowerCase()) ||
        s.studentId.toLowerCase().includes(search.toLowerCase());
      return !isAlreadyEnrolled && matchesSearch;
    });
  }, [students, targetClassId, search]);

  const toggleNode = (id: string) => {
    setSelectedPool((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const handleDeployment = () => {
    startTransition(async () => {
      try {
        await bulkEnrollNodes({
          classId: targetClassId!,
          studentIds: selectedPool,
          type: config.type as any,
          status: config.status as any,
        });
        toast.success(
          `Success: ${selectedPool.length} Nodes Injected into ${targetClass.name}`,
        );
        setSelectedPool([]);
      } catch (e: any) {
        toast.error(e.message);
      }
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-40 px-4 pt-6">
      {/* --- HUD HEADER --- */}
      <header className="flex justify-between items-center bg-slate-900 dark:bg-slate-900 p-6 rounded-[2.5rem] text-white shadow-2xl overflow-hidden relative">
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-1">
            <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400">
              Registry Deployment
            </span>
          </div>
          <h1 className="text-3xl font-black tracking-tighter italic">
            Orion<span className="text-primary-400">Terminal</span>
          </h1>
        </div>
        <ShieldCheck className="h-12 w-12 text-primary-500/20 absolute -right-2 -bottom-2" />
      </header>

      {/* --- STEP 1: TARGET SELECTION --- */}
      <section className="space-y-4">
        <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-4 flex items-center gap-2">
          <Layers className="h-3 w-3" /> Target Class Node
        </h3>
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
          {classes.map((c: any) => (
            <button
              key={c.id}
              onClick={() => {
                setTargetClassId(c.id);
                setSelectedPool([]);
              }}
              className={`flex-shrink-0 px-6 py-4 rounded-[2rem] border-2 transition-all text-left min-w-[180px] ${
                targetClassId === c.id
                  ? "bg-primary-700 border-primary-700 text-white shadow-royal scale-105"
                  : "glass-surface border-transparent"
              }`}
            >
              <p className="text-[8px] font-black uppercase opacity-60 mb-1">
                {c.code}
              </p>
              <p className="text-sm font-black truncate">{c.name}</p>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-[9px] font-bold">
                  {c._count.enrollments}/{c.capacity}
                </span>
                <Progress
                  value={(c._count.enrollments / c.capacity) * 100}
                  className={`h-1 w-12 ${targetClassId === c.id ? "bg-white/20" : ""}`}
                />
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* --- STEP 2: SEARCH & FILTER --- */}
      <section className="space-y-4">
        <div className="relative group">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-primary-700 transition-colors" />
          <input
            placeholder="Identify Students by Name or ID..."
            className="w-full h-16 pl-14 glass-surface rounded-[2rem] border-0 outline-none focus:ring-4 ring-primary-700/10 font-bold dark:bg-slate-900"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </section>

      {/* --- STEP 3: THE POOL --- */}
      <main className="space-y-3">
        {!targetClassId ? (
          <div className="p-20 text-center glass-surface rounded-[3rem] border-dashed border-slate-200">
            <Fingerprint className="h-12 w-12 mx-auto mb-4 text-slate-300" />
            <p className="text-[10px] font-black uppercase text-slate-400">
              Security Locked: Select Class
            </p>
          </div>
        ) : (
          <div className="grid gap-3">
            <AnimatePresence mode="popLayout">
              {studentPool.map((s: any) => (
                <motion.div
                  layout
                  key={s.id}
                  onClick={() => toggleNode(s.id)}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-5 rounded-[2.2rem] border-2 transition-all flex items-center justify-between group ${
                    selectedPool.includes(s.id)
                      ? "bg-emerald-500/10 border-emerald-500 shadow-lg"
                      : "glass-surface border-transparent dark:bg-slate-900/50"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <Avatar className="h-14 w-14 border-2 border-white dark:border-slate-800">
                        <AvatarImage src={s.user.image} />
                        <AvatarFallback className="font-black text-primary-700">
                          {s.user.name[0]}
                        </AvatarFallback>
                      </Avatar>
                      {selectedPool.includes(s.id) && (
                        <div className="absolute -top-1 -right-1 h-6 w-6 bg-emerald-500 rounded-full flex items-center justify-center text-white border-2 border-white">
                          <CheckCircle2 className="h-3.5 w-3.5" />
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="text-base font-black dark:text-white leading-none mb-1">
                        {s.user.name}
                      </p>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant="outline"
                          className="text-[8px] font-black border-slate-200 dark:border-slate-800"
                        >
                          {s.studentId}
                        </Badge>
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">
                          {s.academicYear}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div
                    className={`h-8 w-8 rounded-full flex items-center justify-center transition-all ${
                      selectedPool.includes(s.id)
                        ? "bg-emerald-500 text-white"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-400"
                    }`}
                  >
                    {selectedPool.includes(s.id) ? (
                      <CheckCircle2 className="h-4 w-4" />
                    ) : (
                      <Plus className="h-4 w-4" />
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </main>

      {/* --- STEP 4: DEPLOYMENT DRAWER (STICKY MOBILE) --- */}
      <AnimatePresence>
        {selectedPool.length > 0 && (
          <motion.div
            initial={{ y: 200 }}
            animate={{ y: 0 }}
            exit={{ y: 200 }}
            className="fixed bottom-6 left-4 right-4 z-50"
          >
            <div className="bg-slate-900 text-white p-6 rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.4)] border border-white/10 flex flex-col gap-4">
              <div className="flex justify-between items-center border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <div className="bg-primary-500 h-10 w-10 rounded-2xl flex items-center justify-center font-black text-lg shadow-lg">
                    {selectedPool.length}
                  </div>
                  <div>
                    <p className="text-xs font-black uppercase">
                      Nodes in Queue
                    </p>
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                      Injecting into {targetClass?.name}
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSelectedPool([])}
                  className="text-slate-400"
                >
                  <X />
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <p className="text-[8px] font-black uppercase text-slate-500 ml-2">
                    Mapping Type
                  </p>
                  <Select
                    value={config.type}
                    onValueChange={(v) => setConfig({ ...config, type: v })}
                  >
                    <SelectTrigger className="h-12 rounded-2xl bg-white/5 border-0 font-bold text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="rounded-2xl border-0 shadow-2xl">
                      <SelectItem value="REGULAR" className="font-bold py-3">
                        REGULAR
                      </SelectItem>
                      <SelectItem value="TRIAL" className="font-bold py-3">
                        TRIAL
                      </SelectItem>
                      <SelectItem value="AUDIT" className="font-bold py-3">
                        AUDIT
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1">
                  <p className="text-[8px] font-black uppercase text-slate-500 ml-2">
                    Node Status
                  </p>
                  <Select
                    value={config.status}
                    onValueChange={(v) => setConfig({ ...config, status: v })}
                  >
                    <SelectTrigger className="h-12 rounded-2xl bg-white/5 border-0 font-bold text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="rounded-2xl border-0 shadow-2xl">
                      <SelectItem
                        value="ACTIVE"
                        className="font-bold py-3 text-emerald-500"
                      >
                        ACTIVE
                      </SelectItem>
                      <SelectItem
                        value="PENDING"
                        className="font-bold py-3 text-amber-500"
                      >
                        PENDING
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button
                disabled={isPending}
                onClick={handleDeployment}
                className="h-20 w-full rounded-[2rem] bg-white text-slate-900 hover:bg-gold hover:text-white font-black text-xl shadow-2xl group transition-all"
              >
                {isPending ? (
                  <Loader2 className="animate-spin h-6 w-6" />
                ) : (
                  <span className="flex items-center gap-3">
                    EXECUTE DEPLOYMENT{" "}
                    <ArrowRight className="h-6 w-6 group-hover:translate-x-2 transition-transform" />
                  </span>
                )}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
