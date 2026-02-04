"use client";

import { useState, useTransition } from "react";
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
  Send,
  X,
  Loader2,
  Radio,
  Moon,
  RefreshCcw,
  HandCoins,
  ShieldCheck,
  Settings2,
  ChevronRight,
  ArrowUpRight,
  BarChart3,
} from "lucide-react";

import {
  processUserAction,
  quickBroadcast,
} from "@/app/actions/admin/dashboard/actions";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

// Animation Variants
const kContainer = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } },
};
const kItem = { hidden: { y: 20, opacity: 0 }, show: { y: 0, opacity: 1 } };

export default function AdminDashboardClient({ data }: { data: any }) {
  const [isPending, startTransition] = useTransition();
  const [activeModal, setActiveModal] = useState<
    "BROADCAST" | "APPROVALS" | null
  >(null);
  const [broadcast, setBroadcast] = useState({ title: "", content: "" });

  const handleBroadcast = async () => {
    if (!broadcast.title || !broadcast.content)
      return toast.error("Data missing");
    startTransition(async () => {
      const res = await quickBroadcast(broadcast.title, broadcast.content);
      if (res.success) {
        toast.success("Broadcast Transmitted");
        setActiveModal(null);
      }
    });
  };

  const handleUserAction = (userId: string, action: "APPROVE" | "REJECT") => {
    startTransition(async () => {
      await processUserAction(userId, action);
      toast.success("Identity Updated");
    });
  };

  return (
    <motion.div
      variants={kContainer}
      initial="hidden"
      animate="show"
      className="w-full space-y-6 lg:space-y-10 pb-32"
    >
      {/* --- TOP HUD (Responsive Header) --- */}
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 px-1">
        <div className="space-y-1">
          <h1 className="text-3xl lg:text-5xl font-black tracking-tighter text-slate-900 dark:text-white">
            System <span className="text-primary-700">Cockpit</span>
          </h1>
          <p className="text-[10px] lg:text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
            <Activity className="h-3 w-3 text-emerald-500" />
            Live Institutional Node: Al-Maysaroh
          </p>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              placeholder="Search registry..."
              className="w-full h-10 lg:h-12 pl-10 pr-4 glass-surface rounded-xl text-sm outline-none focus:ring-2 ring-primary-700/20"
            />
          </div>
          <Button
            onClick={() => setActiveModal("BROADCAST")}
            className="h-10 lg:h-12 px-5 rounded-xl bg-primary-700 text-white font-black text-[10px] uppercase shadow-royal"
          >
            <Send className="h-4 w-4 mr-2" /> Broadcast
          </Button>
        </div>
      </header>

      {/* --- QUICK ACTION STRIP (Mobile Scrollable, Desktop Grid) --- */}
      <div className="flex lg:grid lg:grid-cols-4 gap-3 overflow-x-auto no-scrollbar pb-2">
        <ActionTile
          label="Pending Handshakes"
          count={data.counts.pendingUsers}
          icon={ShieldCheck}
          color="purple"
          onClick={() => setActiveModal("APPROVALS")}
        />
        <ActionTile
          label="Revenue Recovery"
          icon={HandCoins}
          color="emerald"
          onClick={() => toast.info("Debt Protocol Initialized")}
        />
        <ActionTile
          label="Academic Pulse"
          icon={BarChart3}
          color="indigo"
          onClick={() => toast.info("Loading Analytics...")}
        />
        <ActionTile
          label="System Security"
          icon={Settings2}
          color="rose"
          onClick={() => toast.info("Vault Locked")}
        />
      </div>

      {/* --- BENTO VITAL PULSE (Fluid Grid) --- */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6">
        <PulseCard
          label="Total Nodes"
          value={data.counts.students}
          icon={Users}
          color="purple"
        />
        <PulseCard
          label="Net Income"
          value={`$${data.finance.income}`}
          icon={Wallet}
          color="emerald"
        />
        <PulseCard
          label="Spiritual"
          value={`${data.spiritualPulse}%`}
          icon={Moon}
          color="gold"
        />
        <PulseCard
          label="Sessions"
          value={data.liveSessions.length}
          icon={Radio}
          color="purple"
        />
      </div>

      {/* --- DEEP ANALYTICS & OPS --- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Approvals Island */}
        <div className="lg:col-span-5 xl:col-span-4">
          <div className="institutional-card bg-primary-700 text-white p-6 lg:p-8 h-full relative overflow-hidden group flex flex-col justify-between min-h-[320px]">
            <ShieldAlert className="absolute -right-8 -bottom-8 h-48 w-48 opacity-10 group-hover:rotate-12 transition-transform" />
            <div className="relative z-10 space-y-4">
              <Badge className="bg-white/20 text-white border-0 backdrop-blur-md font-bold text-[9px] uppercase tracking-widest">
                Awaiting Verification
              </Badge>
              <h3 className="text-4xl lg:text-6xl font-black tracking-tighter leading-none">
                {data.counts.pendingUsers}{" "}
                <span className="text-primary-300 block text-xl lg:text-2xl mt-1">
                  Waitlisted Identity
                </span>
              </h3>
            </div>
            <Button
              onClick={() => setActiveModal("APPROVALS")}
              className="relative z-10 w-full h-14 bg-white text-primary-700 font-black rounded-xl hover:bg-gold hover:text-white transition-all shadow-xl"
            >
              Process Handshake
            </Button>
          </div>
        </div>

        {/* Live Traffic / Academic Flow */}
        <div className="lg:col-span-7 xl:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="institutional-card glass-surface p-6 lg:p-8 dark:bg-slate-900/50 space-y-6">
            <div className="flex justify-between items-center">
              <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-widest">
                Financial Net
              </h4>
              <TrendingUp className="text-emerald-500 h-4 w-4" />
            </div>
            <div className="text-4xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tighter">
              ${(data.finance.income - data.finance.expenses).toLocaleString()}
            </div>
            <div className="space-y-4 pt-4">
              <ProgressBlock
                label="Revenue Synced"
                value={100}
                color="emerald"
              />
              <ProgressBlock
                label="Institutional Burn"
                value={(data.finance.expenses / data.finance.income) * 100}
                color="rose"
              />
            </div>
          </div>

          <div className="institutional-card glass-surface p-6 lg:p-8 dark:bg-slate-900/50">
            <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-6 flex items-center gap-2">
              <span className="h-2 w-2 bg-rose-500 rounded-full animate-ping" />{" "}
              Real-time Nodes
            </h4>
            <div className="space-y-3">
              {data.liveSessions.map((s: any) => (
                <div
                  key={s.id}
                  className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-800 flex justify-between items-center group cursor-pointer hover:border-primary-700 transition-all"
                >
                  <div className="truncate pr-4">
                    <p className="text-xs font-black dark:text-white truncate">
                      {s.class.name}
                    </p>
                    <p className="text-[9px] text-slate-400 font-bold uppercase tracking-tighter">
                      {s.class.teacher.user.name}
                    </p>
                  </div>
                  <Badge
                    variant="outline"
                    className="text-[8px] font-black shrink-0"
                  >
                    {s.startTime}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* --- MOBILE TACTICAL DOCK (Sticky Bottom) --- */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[92%] md:hidden">
        <div className="bg-slate-900/90 backdrop-blur-2xl px-6 py-4 rounded-[2.5rem] flex justify-around items-center border border-white/10 shadow-royal">
          <DockButton icon={Activity} active />
          <DockButton icon={GraduationCap} />
          <div
            onClick={() => setActiveModal("BROADCAST")}
            className="h-12 w-12 bg-primary-700 rounded-2xl flex items-center justify-center text-white shadow-lg active:scale-90 transition-transform"
          >
            <Plus />
          </div>
          <DockButton icon={Wallet} />
          <DockButton icon={Settings2} />
        </div>
      </div>

      {/* --- MODALS --- */}
      <AnimatePresence>
        {activeModal === "BROADCAST" && (
          <Modal
            title="Broadcast Transmission"
            close={() => setActiveModal(null)}
          >
            <div className="space-y-4">
              <Input
                placeholder="Transmission Header..."
                className="h-14 rounded-xl font-bold"
                value={broadcast.title}
                onChange={(e) =>
                  setBroadcast({ ...broadcast, title: e.target.value })
                }
              />
              <Textarea
                placeholder="Payload details..."
                rows={5}
                className="rounded-xl p-4 font-medium"
                value={broadcast.content}
                onChange={(e) =>
                  setBroadcast({ ...broadcast, content: e.target.value })
                }
              />
              <Button
                onClick={handleBroadcast}
                disabled={isPending}
                className="w-full h-16 rounded-2xl bg-primary-700 text-white font-black"
              >
                {isPending ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  "EXECUTE BROADCAST"
                )}
              </Button>
            </div>
          </Modal>
        )}

        {activeModal === "APPROVALS" && (
          <Modal title="Waitlist Registry" close={() => setActiveModal(null)}>
            <div className="space-y-3 max-h-[50vh] overflow-y-auto no-scrollbar">
              {data.pendingList.map((user: any) => (
                <div
                  key={user.id}
                  className="p-4 rounded-2xl border dark:border-slate-800 bg-slate-50 dark:bg-slate-900 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 border-2 border-white shadow-sm">
                      <AvatarImage src={user.image} />
                      <AvatarFallback>{user.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-xs font-black dark:text-white leading-none">
                        {user.name}
                      </p>
                      <p className="text-[9px] text-slate-400 font-bold">
                        {user.email}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <Button
                      onClick={() => handleUserAction(user.id, "REJECT")}
                      variant="ghost"
                      className="h-9 px-3 text-rose-500 text-[9px] font-black uppercase"
                    >
                      Deny
                    </Button>
                    <Button
                      onClick={() => handleUserAction(user.id, "APPROVE")}
                      className="h-9 px-4 bg-emerald-500 text-white text-[9px] font-black uppercase rounded-lg"
                    >
                      Verify
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// --- SUB-COMPONENTS ---

function ActionTile({ label, count, icon: Icon, color, onClick }: any) {
  const styles: any = {
    purple:
      "bg-primary-700/5 text-primary-700 border-primary-700/10 hover:bg-primary-700 hover:text-white",
    emerald:
      "bg-emerald-500/5 text-emerald-500 border-emerald-500/10 hover:bg-emerald-500 hover:text-white",
    indigo:
      "bg-indigo-600/5 text-indigo-600 border-indigo-600/10 hover:bg-indigo-600 hover:text-white",
    rose: "bg-rose-500/5 text-rose-500 border-rose-500/10 hover:bg-rose-500 hover:text-white",
  };
  return (
    <button
      onClick={onClick}
      className={`h-24 min-w-[140px] lg:min-w-0 flex flex-col items-center justify-center gap-2 rounded-[2rem] border transition-all duration-500 shrink-0 ${styles[color]}`}
    >
      <div className="relative">
        <Icon className="h-6 w-6" />
        {count > 0 && (
          <span className="absolute -top-2 -right-2 h-4 w-4 bg-rose-500 text-white rounded-full flex items-center justify-center text-[8px] font-black animate-bounce">
            {count}
          </span>
        )}
      </div>
      <span className="text-[8px] font-black uppercase tracking-widest">
        {label}
      </span>
    </button>
  );
}

function PulseCard({ label, value, icon: Icon, color }: any) {
  const themes: any = {
    purple: "text-primary-700 bg-primary-700/5 border-primary-700/10",
    emerald: "text-emerald-500 bg-emerald-500/5 border-emerald-500/10",
    gold: "text-gold bg-gold/5 border-gold/10",
  };
  return (
    <div
      className={`p-5 lg:p-8 rounded-[2rem] border ${themes[color] || themes.purple} glass-surface flex flex-col justify-between min-h-[140px] lg:min-h-[180px] group transition-all hover:-translate-y-1`}
    >
      <div className="p-3 rounded-2xl bg-white dark:bg-slate-900 shadow-sm w-fit group-hover:rotate-12 transition-transform">
        <Icon className="h-5 w-5 lg:h-6 lg:w-6" />
      </div>
      <div>
        <p className="text-[8px] lg:text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">
          {label}
        </p>
        <h4 className="text-2xl lg:text-4xl font-black text-slate-900 dark:text-white tracking-tighter leading-none">
          {value}
        </h4>
      </div>
    </div>
  );
}

function ProgressBlock({ label, value, color }: any) {
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between text-[9px] font-black uppercase text-slate-500">
        <span>{label}</span>
        <span
          className={color === "rose" ? "text-rose-500" : "text-emerald-500"}
        >
          {Math.round(value)}%
        </span>
      </div>
      <Progress
        value={value}
        className={`h-1 ${color === "rose" ? "bg-rose-500" : "bg-emerald-500"}`}
      />
    </div>
  );
}

function Modal({ children, title, close }: any) {
  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
        onClick={close}
      />
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
        className="relative bg-white dark:bg-slate-950 w-full max-w-lg rounded-t-[3rem] sm:rounded-[2.5rem] shadow-royal overflow-hidden"
      >
        <div className="p-8 border-b dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-900/50">
          <h2 className="text-xl font-black tracking-tight dark:text-white">
            {title}
          </h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={close}
            className="rounded-full h-10 w-10 text-slate-900 dark:text-white"
          >
            <X />
          </Button>
        </div>
        <div className="p-8 pb-12">{children}</div>
      </motion.div>
    </div>
  );
}

function DockButton({ icon: Icon, active }: any) {
  return (
    <button
      className={`p-3 rounded-xl transition-all ${active ? "text-primary-700" : "text-slate-500 hover:text-white"}`}
    >
      <Icon className="h-5 w-5" />
    </button>
  );
}
