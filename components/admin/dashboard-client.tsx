"use client";

import { processUserAction, quickBroadcast } from "@/app/actions/admin/dashboard/actions";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { AnimatePresence, motion } from "framer-motion";
import {
  CheckCircle2,
  Loader2,
  Moon,
  Radio,
  Search,
  Send,
  ShieldAlert,
  Sparkles,
  TrendingUp,
  Users,
  Wallet,
  X
} from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "sonner";

const kContainer = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } };
const kItem = { hidden: { y: 20, opacity: 0 }, show: { y: 0, opacity: 1 } };

export default function AdminDashboardClient({ data }: { data: any }) {
  const [isPending, startTransition] = useTransition();
  const [activeModal, setActiveModal] = useState<"BROADCAST" | "APPROVALS" | null>(null);
  const [broadcast, setBroadcast] = useState({ title: "", content: "" });

  const handleBroadcast = async () => {
    if (!broadcast.title || !broadcast.content) return toast.error("Heading and Payload required");
    startTransition(async () => {
      const result = await quickBroadcast(broadcast.title, broadcast.content);
      if (result.success) {
        toast.success("Broadcast transmitted");
        setActiveModal(null);
        setBroadcast({ title: "", content: "" });
      } else {
        toast.error(result.error);
      }
    });
  };

  const handleUserAction = (userId: string, action: "APPROVE" | "REJECT") => {
    startTransition(async () => {
      await processUserAction(userId, action);
      toast.success(`Node ${action === "APPROVE" ? "Approved" : "Rejected"}`);
    });
  };

  return (
    <motion.div variants={kContainer} initial="hidden" animate="show" className="space-y-10 pb-20">
      
      {/* --- HEADER --- */}
      <header className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-surface border-primary-100 dark:border-primary-900/50">
            <Sparkles className="h-3 w-3 text-gold" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary-700 dark:text-primary-300">Daar-ul-Maysaroh Intelligence</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black tracking-tighter leading-none text-slate-900 dark:text-white">
            Admin <span className="text-primary-700">Cockpit</span>
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
          <div className="relative flex-1 min-w-[240px] lg:w-80 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 dark:text-slate-500" />
            <input 
              placeholder="Deep Search nodes..." 
              className="w-full h-14 pl-12 glass-surface rounded-2xl outline-none focus:ring-2 ring-primary/20 dark:bg-slate-900 dark:text-white"
            />
          </div>
          <Button onClick={() => setActiveModal("BROADCAST")} className="h-14 px-8 rounded-2xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-black text-[10px] uppercase tracking-widest shadow-xl">
            <Send className="h-4 w-4 mr-2" /> Broadcast
          </Button>
        </div>
      </header>

      {/* --- BENTO PULSE (100% DB Driven) --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <PulseStat label="Total Students" value={data.counts.students} icon={Users} color="purple" trend="Institutional Reach" />
        <PulseStat label="Live Revenue" value={`$${data.finance.income.toLocaleString()}`} icon={Wallet} color="emerald" trend="Completed Payments" />
        <PulseStat label="Spiritual Pulse" value={`${data.spiritualPulse}%`} icon={Moon} color="gold" trend="Prayer Compliance" />
        <PulseStat label="Active Sessions" value={data.liveSessions.length} icon={Radio} color="purple" trend="Running Now" />
      </div>

      {/* --- OPERATIONS --- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Approvals Island */}
        <div className="lg:col-span-4">
          <div className="institutional-card bg-primary-700 text-white p-8 h-full flex flex-col justify-between relative overflow-hidden group">
            <ShieldAlert className="absolute -right-10 -bottom-10 h-64 w-64 opacity-10 group-hover:rotate-12 transition-transform" />
            <div className="relative z-10 space-y-6">
              <Badge className="bg-white/20 text-white border-0 backdrop-blur-md">Security Guard</Badge>
              <h3 className="text-5xl font-black tracking-tighter">
                {data.counts.pendingUsers} <span className="text-primary-200 block text-2xl">Awaiting Identity</span>
              </h3>
              <Button onClick={() => setActiveModal("APPROVALS")} className="w-full h-16 bg-white text-primary-700 font-black rounded-2xl hover:bg-gold hover:text-white transition-all shadow-2xl">
                Open Handshake Terminal
              </Button>
            </div>
          </div>
        </div>

        {/* Financial Delta (DB Driven) */}
        <div className="lg:col-span-4">
          <div className="institutional-card glass-surface p-8 h-full flex flex-col justify-between dark:bg-slate-900/50">
            <div>
              <div className="flex justify-between items-center mb-6">
                <div className="h-12 w-12 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center"><TrendingUp className="h-6 w-6" /></div>
                <Badge variant="outline" className="text-emerald-600 border-emerald-200 dark:border-emerald-800 uppercase text-[9px] font-black tracking-widest">Financial Health</Badge>
              </div>
              <h4 className="text-xs font-black uppercase text-slate-400 tracking-widest mb-1">Total Net Flow</h4>
              <div className="text-3xl font-black text-slate-900 dark:text-white mb-4">
                ${(data.finance.income - data.finance.expenses).toLocaleString()}
              </div>
              <div className="space-y-4">
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] font-black uppercase text-slate-500"><span>Income</span><span className="text-emerald-500">${data.finance.income}</span></div>
                  <Progress value={100} className="h-1 bg-emerald-500/10" />
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] font-black uppercase text-slate-500"><span>Expense</span><span className="text-rose-500">${data.finance.expenses}</span></div>
                  <Progress value={(data.finance.expenses / data.finance.income) * 100} className="h-1 bg-rose-500/10" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Live Academic Radar (DB Driven) */}
        <div className="lg:col-span-4">
          <div className="institutional-card glass-surface p-8 h-full dark:bg-slate-900/50">
            <h4 className="text-xs font-black uppercase text-slate-400 tracking-widest mb-6 flex items-center gap-2">
              <span className="h-2 w-2 bg-rose-500 rounded-full animate-ping" /> Live Now
            </h4>
            <div className="space-y-4">
              {data.liveSessions.length > 0 ? data.liveSessions.map((s: any) => (
                <div key={s.id} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
                  <p className="text-xs font-black text-slate-900 dark:text-white leading-none">{s.class.name}</p>
                  <p className="text-[10px] text-slate-500 mt-1 uppercase font-bold">{s.class.teacher.user.name}</p>
                </div>
              )) : (
                <div className="text-center py-10 text-slate-400 font-bold uppercase text-[10px]">No sessions live</div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* --- MODALS --- */}
      <AnimatePresence>
        {activeModal === "BROADCAST" && (
          <ModalWrapper title="Node Broadcast" close={() => setActiveModal(null)}>
            <div className="space-y-6">
              <input 
                className="w-full h-14 px-4 glass-surface rounded-xl outline-none font-bold dark:bg-slate-800 dark:text-white border-primary-100 dark:border-slate-700"
                placeholder="Heading..."
                value={broadcast.title}
                onChange={(e) => setBroadcast({...broadcast, title: e.target.value})}
              />
              <textarea 
                rows={4}
                className="w-full p-4 glass-surface rounded-xl outline-none font-medium dark:bg-slate-800 dark:text-white border-primary-100 dark:border-slate-700"
                placeholder="Message details..."
                value={broadcast.content}
                onChange={(e) => setBroadcast({...broadcast, content: e.target.value})}
              />
              <Button onClick={handleBroadcast} disabled={isPending} className="w-full h-16 bg-primary-700 text-white rounded-2xl font-black uppercase tracking-widest">
                {isPending ? <Loader2 className="animate-spin" /> : "Execute Transmission"}
              </Button>
            </div>
          </ModalWrapper>
        )}

        {activeModal === "APPROVALS" && (
          <ModalWrapper title="Waitlist Terminal" close={() => setActiveModal(null)}>
            <div className="space-y-3 max-h-[50vh] overflow-y-auto no-scrollbar">
              {data.pendingList.map((user: any) => (
                <div key={user.id} className="p-4 rounded-2xl border dark:border-slate-700 bg-slate-50 dark:bg-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10"><AvatarImage src={user.image} /></Avatar>
                    <span className="text-xs font-black text-slate-900 dark:text-white">{user.name}</span>
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={() => handleUserAction(user.id, "REJECT")} variant="ghost" className="text-rose-600 text-[10px] font-black uppercase">Deny</Button>
                    <Button onClick={() => handleUserAction(user.id, "APPROVE")} className="bg-accent text-white text-[10px] font-black uppercase px-4 rounded-lg">Verify</Button>
                  </div>
                </div>
              ))}
            </div>
          </ModalWrapper>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function PulseStat({ label, value, icon: Icon, color, trend }: any) {
  const isPurple = color === 'purple';
  const isGold = color === 'gold';
  return (
    <motion.div variants={kItem}>
      <div className="institutional-card glass-surface p-6 group dark:bg-slate-900/50">
        <div className={`h-12 w-12 rounded-2xl flex items-center justify-center mb-6 transition-all group-hover:rotate-12 ${
          isPurple ? 'bg-primary-700 text-white shadow-royal' : 
          isGold ? 'bg-gold text-white' : 'bg-emerald-500 text-white'
        }`}>
          <Icon className="h-5 w-5" />
        </div>
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{label}</p>
        <h4 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter">{value}</h4>
        <p className="text-[9px] font-bold text-slate-400 mt-2 uppercase flex items-center gap-1"><CheckCircle2 className="h-3 w-3 text-emerald-500" /> {trend}</p>
      </div>
    </motion.div>
  );
}

function ModalWrapper({ children, title, close }: any) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={close} />
      <motion.div initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }} className="relative bg-white dark:bg-slate-950 w-full max-w-lg rounded-[2.5rem] shadow-royal border dark:border-slate-800 overflow-hidden">
        <div className="p-8 border-b dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-900/50">
          <h2 className="text-xl font-black tracking-tight text-slate-900 dark:text-white">{title}</h2>
          <Button variant="ghost" size="icon" onClick={close} className="rounded-full h-10 w-10 text-slate-900 dark:text-white"><X /></Button>
        </div>
        <div className="p-8">{children}</div>
      </motion.div>
    </div>
  );
}