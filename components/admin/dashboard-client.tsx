"use client";

import { motion } from "framer-motion";
import {
  Users,
  ShieldAlert,
  TrendingUp,
  ArrowUpRight,
  CheckCircle2,
  Bell,
  Plus,
  Search,
  Activity,
  GraduationCap,
  Wallet,
  Sparkles,
  Zap,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { DashboardStats, RecentHifzLog } from "@/types/(dashboard)/admin/admin";

// Types
// import { DashboardStats, RecentHifzLog } from "@/types/dasboard/admin/admin";

interface DashboardProps {
  stats: DashboardStats;
  recentHifz: RecentHifzLog[];
}

const kContainer = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const kItem = {
  hidden: { y: 20, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
};

export default function AdminDashboardClient({
  stats,
  recentHifz,
}: DashboardProps) {
  const handleQuickApproval = () => {
    toast.promise(new Promise((r) => setTimeout(r, 1000)), {
      loading: "Opening Approval Terminal...",
      success: "Redirecting to Waitlist",
    });
  };

  return (
    <motion.div
      variants={kContainer}
      initial="hidden"
      animate="show"
      className="max-w-7xl mx-auto space-y-8 pb-32"
    >
      {/* --- BRANDED HEADER --- */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">
              Al-Maysaroh Management
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter">
            System <span className="text-primary-700">Pulse</span>
          </h1>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-72 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary-700 transition-colors" />
            <input
              placeholder="Search students, teachers..."
              className="w-full h-14 pl-12 pr-4 glass-surface rounded-2xl text-sm focus:ring-2 ring-primary/20 outline-none transition-all"
            />
          </div>
          <Button className="h-14 px-8 rounded-2xl bg-primary-700 hover:bg-primary-800 text-white font-black text-xs uppercase tracking-widest shadow-royal transition-all hover:scale-105 active:scale-95">
            <Plus className="h-5 w-5 mr-2" /> New Entry
          </Button>
        </div>
      </header>

      {/* --- QUICK ACTIONS (Primary Color Integration) --- */}
      <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
        <QuickAction
          label="Approvals"
          icon={ShieldAlert}
          count={stats.pendingApprovals}
          color="purple"
          onClick={handleQuickApproval}
        />
        <QuickAction label="Enrollment" icon={GraduationCap} color="gold" />
        <QuickAction label="Finances" icon={Wallet} color="green" />
        <QuickAction label="Broadcast" icon={Bell} color="purple" />
      </div>

      {/* --- BENTO GRID --- */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Revenue Card (Emerald/Green Accent) */}
        <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <DashboardStat
            label="Monthly Revenue"
            value={`$${stats.revenue}`}
            icon={TrendingUp}
            color="emerald"
            trend="+14% From Last Month"
          />
          <DashboardStat
            label="Today Attendance"
            value={`${stats.todayAttendance}`}
            icon={CheckCircle2}
            color="purple"
            trend="Institutional High"
          />
        </div>

        {/* Pending Approvals Card (Institutional Card Utility) */}
        <div className="md:col-span-4">
          <div className="institutional-card h-full bg-primary-700 text-white p-8 relative overflow-hidden group">
            <Sparkles className="absolute -right-4 -top-4 h-32 w-32 opacity-10 group-hover:rotate-12 transition-transform" />
            <div className="relative z-10 space-y-6">
              <p className="text-[10px] font-black uppercase tracking-widest text-primary-100">
                Action Required
              </p>
              <h3 className="text-5xl font-black tracking-tighter">
                {stats.pendingApprovals}{" "}
                <span className="text-primary-300 text-2xl block">
                  Waitlisted Users
                </span>
              </h3>
              <Button
                onClick={handleQuickApproval}
                className="w-full h-14 bg-white text-primary-700 font-black rounded-2xl hover:bg-gold hover:text-white transition-all shadow-xl"
              >
                Review Terminal
              </Button>
            </div>
          </div>
        </div>

        {/* Hifz Progress Feed (Glass Surface) */}
        <div className="md:col-span-8">
          <div className="institutional-card glass-surface p-8">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h3 className="text-xl font-black tracking-tight">
                  Academic Pulse
                </h3>
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                  Recent Hifz Logs
                </p>
              </div>
              <Button
                variant="ghost"
                className="text-primary-700 font-black text-[10px] uppercase"
              >
                View History
              </Button>
            </div>

            <div className="space-y-6">
              {recentHifz.map((log) => (
                <div
                  key={log.id}
                  className="flex items-center justify-between group cursor-pointer hover:bg-slate-50 p-2 rounded-2xl transition-all"
                >
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12 border-2 border-white shadow-sm transition-transform group-hover:scale-110">
                      <AvatarImage src={log.student.user.image || ""} />
                      <AvatarFallback className="bg-primary-100 text-primary-700 font-black">
                        {log.student.user.name[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-black">
                        {log.student.user.name}
                      </p>
                      <p className="text-[10px] font-bold text-muted-foreground uppercase">
                        Surah {log.surah} • Ayah {log.startAyah}-{log.endAyah}
                      </p>
                    </div>
                  </div>
                  <Badge
                    className={`rounded-lg px-3 py-1 text-[9px] font-black uppercase ${
                      log.status === "EXCELLENT"
                        ? "bg-accent/10 text-accent"
                        : "bg-primary-700/10 text-primary-700"
                    }`}
                  >
                    {log.status}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Capacity Radar (Gold Integration) */}
        <div className="md:col-span-4">
          <div className="institutional-card bg-white p-8 border-gold/30">
            <div className="space-y-6">
              <div className="p-4 bg-gold/10 rounded-2xl w-fit">
                <Zap className="h-6 w-6 text-gold" />
              </div>
              <div>
                <h4 className="text-2xl font-black tracking-tight">
                  System Load
                </h4>
                <p className="text-xs font-bold text-muted-foreground">
                  Class Capacity Density
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-[10px] font-black uppercase text-slate-400 tracking-widest">
                  <span>Occupancy</span>
                  <span className="text-gold">88%</span>
                </div>
                <Progress value={88} className="h-2" />
              </div>
              <p className="text-[10px] font-bold text-primary-700 uppercase tracking-tighter">
                Expand Hifz Sections Recommended
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* --- FLOATING COMMAND BAR (Mobile First) --- */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 w-[90%] md:w-auto">
        <div className="bg-slate-900/90 backdrop-blur-2xl px-6 py-4 rounded-[2.5rem] flex justify-around items-center gap-8 shadow-royal border border-white/10">
          <NavIcon icon={Activity} active />
          <NavIcon icon={GraduationCap} />
          <div className="h-12 w-12 bg-primary-700 rounded-2xl flex items-center justify-center text-white shadow-lg active:scale-90 transition-transform cursor-pointer">
            <Plus />
          </div>
          <NavIcon icon={Users} />
          <NavIcon icon={Bell} />
        </div>
      </div>
    </motion.div>
  );
}

// --- SUB-COMPONENTS ---

function DashboardStat({ label, value, icon: Icon, color, trend }: any) {
  const isEmerald = color === "emerald";
  return (
    <motion.div variants={kItem}>
      <div className="institutional-card glass-surface p-8 group">
        <div className="flex justify-between items-center mb-6">
          <div
            className={`p-4 rounded-2xl ${isEmerald ? "bg-accent/10 text-accent" : "bg-primary-700/10 text-primary-700"} transition-transform group-hover:rotate-12`}
          >
            <Icon className="h-6 w-6" />
          </div>
          <ArrowUpRight className="h-5 w-5 text-slate-300" />
        </div>
        <div>
          <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">
            {label}
          </p>
          <h4 className="text-4xl font-black tracking-tighter">{value}</h4>
        </div>
        <p
          className={`text-[10px] font-bold uppercase tracking-tighter mt-4 ${isEmerald ? "text-accent" : "text-primary-700"}`}
        >
          {trend}
        </p>
      </div>
    </motion.div>
  );
}

function QuickAction({ label, icon: Icon, count, color, onClick }: any) {
  const styles: any = {
    purple:
      "bg-primary-700/10 text-primary-700 hover:bg-primary-700 hover:text-white",
    gold: "bg-gold/10 text-gold hover:bg-gold hover:text-white",
    green: "bg-accent/10 text-accent hover:bg-accent hover:text-white",
  };
  return (
    <button
      onClick={onClick}
      className={`h-16 px-6 rounded-[1.5rem] font-black text-[10px] uppercase tracking-widest shrink-0 flex items-center gap-3 transition-all duration-300 ${styles[color]}`}
    >
      <Icon className="h-4 w-4" />
      {label}
      {count !== undefined && (
        <span className="ml-1 px-2 py-0.5 bg-current text-white rounded-full text-[8px] contrast-200">
          {count}
        </span>
      )}
    </button>
  );
}

function NavIcon({ icon: Icon, active }: any) {
  return (
    <button
      className={`p-2 transition-all ${active ? "text-primary-700 scale-125" : "text-slate-500 hover:text-white"}`}
    >
      <Icon className="h-5 w-5" />
    </button>
  );
}
