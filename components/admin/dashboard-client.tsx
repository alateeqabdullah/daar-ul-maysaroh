"use client";

import { useState, useTransition, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  ShieldAlert,
  TrendingUp,
  CheckCircle2,
  Bell,
  Plus,
  Search,
  Activity,
  GraduationCap,
  Wallet,
  Sparkles,
  Zap,
  X,
  Loader2,
  Send,
  ChevronRight,
  Moon,
  Star,
  AlertTriangle,
  TrendingDown,
  Radio,
} from "lucide-react";
import { toast } from "sonner";

// Actions & Types
import {
  processUserAction,
  quickBroadcast,
} from "@/app/actions/admin/dashboard/actions";
import { DashboardData } from "@/types/(dashboard)/admin/admin";

// Components
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";

const kContainer = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};
const kItem = { hidden: { y: 20, opacity: 0 }, show: { y: 0, opacity: 1 } };

export default function AdminDashboardClient({
  data,
}: {
  data: DashboardData;
}) {
  const [isPending, startTransition] = useTransition();
  const [activeModal, setActiveModal] = useState<
    "BROADCAST" | "APPROVALS" | null
  >(null);
  const [broadcast, setBroadcast] = useState({ title: "", content: "" });

  // 1. Logic for Approvals
  const handleUserAction = (userId: string, action: "APPROVE" | "REJECT") => {
    startTransition(async () => {
      const result = await processUserAction(userId, action);
      if (result.success)
        toast.success(
          `Node ${action === "APPROVE" ? "Verified" : "Deactivated"}`,
        );
      else toast.error(result.error);
    });
  };

  // 2. Logic for Broadcast
  const handleBroadcast = async () => {
    if (!broadcast.title || !broadcast.content)
      return toast.error("Heading and Payload required");
    startTransition(async () => {
      const result = await quickBroadcast(broadcast.title, broadcast.content);
      if (result.success) {
        toast.success("Broadcast transmitted to all nodes");
        setActiveModal(null);
        setBroadcast({ title: "", content: "" });
      } else {
        toast.error(result.error);
      }
    });
  };

  return (
    <motion.div
      variants={kContainer}
      initial="hidden"
      animate="show"
      className="space-y-10 pb-20"
    >
      {/* --- ELITE COMMAND HEADER --- */}
      <header className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-surface border-primary-100/50">
            <Sparkles className="h-3 w-3 text-gold animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary-700">
              Daar-ul-Maysaroh v2.6 Control
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black tracking-tighter leading-none">
            Center <span className="text-primary-700">Intelligence</span>
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
          <div className="relative flex-1 min-w-[240px] lg:w-80 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary-700 transition-colors" />
            <input
              placeholder="Search global registry..."
              className="w-full h-14 pl-12 glass-surface rounded-2xl focus:ring-2 ring-primary/20 outline-none font-medium transition-all"
            />
          </div>
          <Button
            onClick={() => setActiveModal("BROADCAST")}
            className="h-14 px-8 rounded-2xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-black text-[10px] uppercase tracking-widest shadow-xl hover:scale-105 transition-all"
          >
            <Send className="h-4 w-4 mr-2" /> Broadcast
          </Button>
        </div>
      </header>

      {/* --- BENTO PULSE GRID --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <PulseStat
          label="Financial Node"
          value={`$${data.revenue.monthly}`}
          icon={Wallet}
          color="purple"
          trend="Institutional Revenue"
        />
        <PulseStat
          label="Active Entities"
          value={data.counts.students}
          icon={Users}
          color="gold"
          trend="+4 New Enrollments"
        />
        <PulseStat
          label="Spiritual Pulse"
          value="92%"
          icon={Moon}
          color="emerald"
          trend="Prayer Compliance"
        />
        <PulseStat
          label="Live Streams"
          value="3 Active"
          icon={Radio}
          color="purple"
          trend="Running Now"
        />
      </div>

      {/* --- OPERATIONS VIEW --- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* User Approval Island */}
        <div className="lg:col-span-4">
          <div className="institutional-card bg-primary-700 text-white p-8 h-full flex flex-col justify-between relative overflow-hidden group">
            <ShieldAlert className="absolute -right-10 -bottom-10 h-64 w-64 opacity-10 group-hover:rotate-12 transition-transform" />
            <div className="relative z-10 space-y-6">
              <Badge className="bg-white/20 text-white border-0 backdrop-blur-md px-3 py-1">
                Security Node
              </Badge>
              <h3 className="text-5xl font-black tracking-tighter">
                {data.counts.pendingUsers}{" "}
                <span className="text-primary-200 block text-2xl font-bold">
                  Pending Access
                </span>
              </h3>
              <p className="text-primary-100 text-sm font-medium">
                New students and teachers are awaiting identity verification.
              </p>
              <Button
                onClick={() => setActiveModal("APPROVALS")}
                className="w-full h-16 bg-white text-primary-700 font-black rounded-2xl hover:bg-gold hover:text-white transition-all shadow-2xl"
              >
                Open Approval Terminal
              </Button>
            </div>
          </div>
        </div>

        {/* Financial Awareness (MISSING FEATURE ADDED) */}
        <div className="lg:col-span-4">
          <div className="institutional-card glass-surface p-8 h-full flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-6">
                <div className="h-12 w-12 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                  <TrendingUp className="h-6 w-6" />
                </div>
                <Badge
                  variant="outline"
                  className="text-emerald-600 border-emerald-200"
                >
                  Financial Health
                </Badge>
              </div>
              <h4 className="text-xs font-black uppercase text-slate-400 tracking-widest mb-1">
                Cash Flow Delta
              </h4>
              <div className="text-3xl font-black mb-4">+$12,450.00</div>
              <div className="space-y-3">
                <div className="flex justify-between text-[10px] font-bold">
                  <span className="text-slate-500">Revenue Stream</span>
                  <span className="text-emerald-600 font-black">$24k</span>
                </div>
                <Progress value={75} className="h-1.5 bg-emerald-500/10" />
                <div className="flex justify-between text-[10px] font-bold">
                  <span className="text-slate-500">Operational Burn</span>
                  <span className="text-rose-600 font-black">$11k</span>
                </div>
                <Progress value={35} className="h-1.5 bg-rose-500/10" />
              </div>
            </div>
            <Button
              variant="ghost"
              className="w-full mt-6 text-xs font-black uppercase text-primary-700 hover:bg-primary-50 rounded-xl"
            >
              Generate Report
            </Button>
          </div>
        </div>

        {/* Live Session Radar (MISSING FEATURE ADDED) */}
        <div className="lg:col-span-4">
          <div className="institutional-card glass-surface p-8 h-full">
            <h4 className="text-xs font-black uppercase text-slate-400 tracking-widest mb-6 flex items-center gap-2">
              <span className="h-2 w-2 bg-rose-500 rounded-full animate-ping" />
              Live Academic Nodes
            </h4>
            <div className="space-y-4">
              <LiveSession
                name="Hifz Morning B"
                teacher="Sheikh Abdullah"
                platform="Zoom"
              />
              <LiveSession
                name="Tajweed Level 1"
                teacher="Ustadh Hamza"
                platform="Meet"
              />
              <div className="pt-4 mt-4 border-t border-slate-100 flex justify-center">
                <Button
                  variant="link"
                  className="text-[10px] font-black uppercase text-primary-700 tracking-widest"
                >
                  View All Sessions
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- MODALS --- */}
      <AnimatePresence>
        {activeModal === "BROADCAST" && (
          <ModalWrapper
            title="Node Broadcast"
            close={() => setActiveModal(null)}
          >
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
                  Transmission Heading
                </label>
                <input
                  className="w-full h-14 px-4 glass-surface rounded-xl focus:ring-2 ring-primary/20 outline-none font-bold"
                  value={broadcast.title}
                  onChange={(e) =>
                    setBroadcast({ ...broadcast, title: e.target.value })
                  }
                  placeholder="Urgent: Eid Holiday Notice"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
                  Data Payload
                </label>
                <textarea
                  rows={4}
                  className="w-full p-4 glass-surface rounded-xl focus:ring-2 ring-primary/20 outline-none font-medium text-sm"
                  value={broadcast.content}
                  onChange={(e) =>
                    setBroadcast({ ...broadcast, content: e.target.value })
                  }
                  placeholder="Details of the transmission..."
                />
              </div>
              <Button
                onClick={handleBroadcast}
                disabled={isPending}
                className="w-full h-16 bg-primary-700 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-royal"
              >
                {isPending ? (
                  <Loader2 className="animate-spin h-5 w-5" />
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" /> Execute Transmission
                  </>
                )}
              </Button>
            </div>
          </ModalWrapper>
        )}

        {activeModal === "APPROVALS" && (
          <ModalWrapper
            title="Handshake Terminal"
            close={() => setActiveModal(null)}
          >
            <div className="space-y-3 max-h-[50vh] overflow-y-auto custom-scrollbar pr-2">
              {data.pendingList.length > 0 ? (
                data.pendingList.map((user) => (
                  <div
                    key={user.id}
                    className="p-4 rounded-2xl border bg-slate-50/50 flex items-center justify-between group hover:bg-white transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10 ring-2 ring-white shadow-sm">
                        <AvatarImage src={user.image || ""} />
                      </Avatar>
                      <div>
                        <p className="text-xs font-black">{user.name}</p>
                        <p className="text-[9px] text-muted-foreground uppercase font-bold tracking-tighter">
                          {user.role}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => handleUserAction(user.id, "REJECT")}
                        variant="ghost"
                        className="h-8 rounded-lg text-[9px] font-black uppercase text-rose-600 hover:bg-rose-50"
                      >
                        Deny
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => handleUserAction(user.id, "APPROVE")}
                        className="h-8 rounded-lg text-[9px] font-black uppercase bg-accent text-white shadow-lg shadow-accent/20"
                      >
                        Verify
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-10 text-slate-400 font-bold uppercase text-[10px]">
                  Registry is clear
                </div>
              )}
            </div>
          </ModalWrapper>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// --- SUB-COMPONENTS ---

function PulseStat({ label, value, icon: Icon, color, trend }: any) {
  const styles: any = {
    purple: "bg-primary-700 text-white shadow-royal",
    gold: "bg-gold text-white shadow-lg shadow-gold/20",
    emerald: "bg-emerald-500 text-white shadow-lg shadow-emerald-500/20",
  };
  return (
    <motion.div variants={kItem}>
      <div className="institutional-card glass-surface p-6 group">
        <div
          className={`h-12 w-12 rounded-2xl flex items-center justify-center mb-6 transition-all group-hover:rotate-12 ${styles[color]}`}
        >
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">
            {label}
          </p>
          <h4 className="text-3xl font-black tracking-tighter">{value}</h4>
          <p className="text-[9px] font-bold text-slate-400 mt-2 uppercase tracking-tighter flex items-center gap-1">
            <Zap className="h-3 w-3 text-gold" /> {trend}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

function LiveSession({ name, teacher, platform }: any) {
  return (
    <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100">
      <div className="flex items-center gap-3">
        <div className="h-2 w-2 bg-rose-500 rounded-full animate-pulse" />
        <div>
          <p className="text-xs font-black">{name}</p>
          <p className="text-[9px] font-bold text-slate-400">{teacher}</p>
        </div>
      </div>
      <Badge className="text-[8px] bg-indigo-50 text-indigo-600 border-0">
        {platform}
      </Badge>
    </div>
  );
}

function ModalWrapper({ children, title, close }: any) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        onClick={close}
      />
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="relative bg-white w-full max-w-lg rounded-[2.5rem] shadow-royal border border-white/20 overflow-hidden"
      >
        <div className="p-8 border-b flex justify-between items-center bg-slate-50/50">
          <h2 className="text-xl font-black tracking-tight">{title}</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={close}
            className="rounded-full h-10 w-10 hover:bg-white"
          >
            <X />
          </Button>
        </div>
        <div className="p-8">{children}</div>
      </motion.div>
    </div>
  );
}
