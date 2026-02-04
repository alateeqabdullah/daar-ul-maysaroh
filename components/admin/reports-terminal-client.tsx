"use client";

import { useState, useTransition, useMemo } from "react";
import { motion } from "framer-motion";
import {
  FileText,
  Download,
  TrendingUp,
  Wallet,
  Moon,
  Award,
  Zap,
  PieChart,
  BarChart3,
  ShieldCheck,
  ChevronRight,
  Search,
  Calendar,
  Loader2,
  RefreshCcw,
  Globe,
  AlertCircle,
  Activity,
  Users,
  UserCheck,
} from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

// UI
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  Cell,
} from "recharts";
import { toast } from "sonner";

const kContainer = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } },
};

export default function ReportsTerminalClient({ data }: any) {
  const [isPending, startTransition] = useTransition();

  // --- PDF GENERATION PROTOCOL ---
  const generateSovereignPDF = () => {
    const doc = new jsPDF();
    const timestamp = new Date().toLocaleString();

    // Header
    doc.setFontSize(22);
    doc.setTextColor(124, 58, 237); // Branded Purple
    doc.text("Daar-ul-Maysaroh Intelligence Report", 14, 22);

    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(`Generated: ${timestamp} | Node: Admin Terminal v2.6`, 14, 30);

    // Financial Data Table
    doc.text("Financial Ledger Summary", 14, 45);
    autoTable(doc, {
      startY: 50,
      head: [["Metric", "Value"]],
      body: [
        ["Total Revenue Banked", `$${data.finance.revenue}`],
        ["Total Institutional Expenses", `$${data.finance.expenses}`],
        ["Total Revenue Leakage (Pending)", `$${data.overdueTotal}`],
      ],
      headStyles: { fillColor: [124, 58, 237] },
    });

    // Save Handshake
    doc.save(`AlMaysaroh_Sovereign_Report_${Date.now()}.pdf`);
    toast.success("Intelligence Report Exported");
  };

  return (
    <motion.div
      variants={kContainer}
      initial="hidden"
      animate="show"
      className="w-full space-y-8 pb-40"
    >
      {/* --- COMMAND HEADER --- */}
      <header className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 px-1">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-surface border-primary-100 dark:border-primary-900/50">
            <Activity className="h-3 w-3 text-emerald-500" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
              Institutional Analytics
            </span>
          </div>
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-none text-slate-900 dark:text-white">
            System <span className="text-primary-700">Pulse</span>
          </h1>
        </div>
        <div className="flex gap-3 w-full lg:w-auto">
          <Button
            variant="outline"
            className="flex-1 lg:flex-none h-14 md:h-16 rounded-2xl border-2 font-black uppercase text-[10px] tracking-widest active:scale-95"
          >
            <RefreshCcw className="mr-2 h-4 w-4" /> Recalculate
          </Button>
          <Button
            onClick={generateSovereignPDF}
            className="flex-1 lg:flex-none h-14 md:h-16 px-10 rounded-2xl bg-primary-700 text-white font-black uppercase text-[10px] shadow-royal hover:scale-105 active:scale-95"
          >
            <FileText className="mr-2 h-4 w-4" /> Export intelligence
          </Button>
        </div>
      </header>

      {/* --- KPI BENTO GRID --- */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          label="Banked Revenue"
          value={`$${data.finance.revenue}`}
          icon={Wallet}
          color="emerald"
        />
        <KPICard
          label="Leakage Node"
          value={`$${data.overdueTotal}`}
          icon={AlertCircle}
          color="rose"
        />
        <KPICard
          label="Academic Nodes"
          value={data.studentCount}
          icon={Users}
          color="purple"
        />
        <KPICard label="Spirit Sync" value="94%" icon={Moon} color="gold" />
      </div>

      <Tabs defaultValue="finance" className="w-full">
        <TabsList className="bg-white dark:bg-slate-900 h-16 p-1.5 rounded-2xl border w-full lg:w-fit justify-start overflow-x-auto no-scrollbar gap-2 shadow-sm">
          <TabsTrigger
            value="finance"
            className="rounded-xl font-black text-[10px] uppercase px-10 h-full gap-2 transition-all data-[state=active]:bg-primary-700 data-[state=active]:text-white"
          >
            Finance
          </TabsTrigger>
          <TabsTrigger
            value="academic"
            className="rounded-xl font-black text-[10px] uppercase px-10 h-full gap-2 transition-all data-[state=active]:bg-primary-700 data-[state=active]:text-white"
          >
            Academic
          </TabsTrigger>
          <TabsTrigger
            value="ops"
            className="rounded-xl font-black text-[10px] uppercase px-10 h-full gap-2 transition-all data-[state=active]:bg-primary-700 data-[state=active]:text-white"
          >
            Operational
          </TabsTrigger>
        </TabsList>

        {/* --- 1. FINANCE TERMINAL --- */}
        <TabsContent value="finance" className="space-y-6 mt-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-8 institutional-card glass-surface p-8 min-h-[400px]">
              <h3 className="text-xl font-black uppercase tracking-tighter mb-10">
                Revenue Delta (6 Months)
              </h3>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data.financeHistory}>
                    <defs>
                      <linearGradient id="pColor" x1="0" y1="0" x2="0" y2="1">
                        <stop
                          offset="5%"
                          stopColor="#7c3aed"
                          stopOpacity={0.3}
                        />
                        <stop
                          offset="95%"
                          stopColor="#7c3aed"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <Tooltip
                      contentStyle={{
                        borderRadius: "20px",
                        border: "none",
                        boxShadow: "0 20px 50px rgba(0,0,0,0.1)",
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="val"
                      stroke="#7c3aed"
                      strokeWidth={4}
                      fill="url(#pColor)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="lg:col-span-4 space-y-6">
              <div className="institutional-card bg-slate-900 text-white p-8 space-y-6">
                <p className="text-[10px] font-black uppercase text-primary-300">
                  Sustainability Index
                </p>
                <h4 className="text-4xl font-black tracking-tighter">
                  Budget Healthy
                </h4>
                <Progress value={82} className="h-1 bg-white/10" />
                <p className="text-xs font-bold text-slate-400">
                  Institutional expenses covered by 82% of realized revenue.
                </p>
              </div>
              <div className="institutional-card glass-surface p-8">
                <p className="text-[10px] font-black uppercase text-slate-400 mb-4 tracking-widest">
                  Active Overdue
                </p>
                <div className="space-y-4">
                  {data.overdueList.slice(0, 3).map((inv: any) => (
                    <div
                      key={inv.id}
                      className="flex justify-between items-center border-b pb-4 last:border-0"
                    >
                      <span className="text-sm font-black dark:text-white truncate max-w-[120px]">
                        {inv.parent.user.name}
                      </span>
                      <Badge
                        variant="ghost"
                        className="text-rose-500 font-black"
                      >
                        ${inv.amount}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* --- 2. ACADEMIC HUB --- */}
        <TabsContent value="academic" className="mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="institutional-card glass-surface p-8 flex flex-col justify-between h-[300px]">
              <Award className="h-8 w-8 text-gold" />
              <div>
                <p className="text-xs font-black uppercase text-slate-400">
                  Mastery Distribution
                </p>
                <h4 className="text-5xl font-black tracking-tighter">
                  92% <span className="text-sm text-emerald-500">Passing</span>
                </h4>
              </div>
              <Button
                variant="ghost"
                className="w-full bg-slate-100 dark:bg-slate-800 rounded-xl font-black text-[10px] uppercase"
              >
                Review Grade Bell Curve
              </Button>
            </div>

            {/* Hifz Progress Pie Chart Mock (as code) */}
            <div className="institutional-card glass-surface p-8 h-[300px] flex flex-col">
              <h4 className="text-xs font-black uppercase text-slate-400 mb-4">
                Spiritual Node Pulse
              </h4>
              <div className="flex-1 flex items-center justify-center">
                <BarChart3 className="h-20 w-20 text-primary-700 animate-pulse" />
              </div>
              <div className="flex justify-between items-center pt-4 border-t">
                <p className="text-[10px] font-black text-slate-500 uppercase">
                  Juz Amma Completion
                </p>
                <span className="text-xs font-black text-primary-700">64%</span>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}

// --- SUB-COMPONENT ---

function KPICard({ label, value, icon: Icon, color }: any) {
  const themes: any = {
    emerald:
      "bg-emerald-500/5 text-emerald-600 border-emerald-500/20 shadow-emerald-500/5",
    rose: "bg-rose-500/5 text-rose-600 border-rose-500/20 shadow-rose-500/5",
    purple:
      "bg-primary-700/5 text-primary-700 border-primary-700/20 shadow-primary-700/5",
    gold: "bg-gold/5 text-gold border-gold/20 shadow-gold/5",
  };
  return (
    <div
      className={`p-6 md:p-10 rounded-[2.5rem] border ${themes[color]} glass-surface flex flex-col justify-between min-h-[140px] md:min-h-[180px] relative overflow-hidden group transition-all hover:-translate-y-1`}
    >
      <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 shadow-sm w-fit relative z-10">
        <Icon className="h-6 w-6" />
      </div>
      <div>
        <p className="text-[9px] md:text-[11px] font-black uppercase text-slate-400 tracking-widest mb-1 relative z-10">
          {label}
        </p>
        <h4 className="text-3xl md:text-5xl font-black dark:text-white tracking-tighter leading-none relative z-10">
          {value}
        </h4>
      </div>
      <Icon className="absolute -right-4 -bottom-4 h-24 w-24 opacity-[0.03] group-hover:rotate-12 transition-transform duration-700" />
    </div>
  );
}
