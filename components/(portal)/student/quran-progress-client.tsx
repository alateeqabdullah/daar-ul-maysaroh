"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Book,
  Award,
  History,
  Mic,
  CheckCircle2,
  Sparkles,
  Zap,
  X,
  UploadCloud,
  Heart,
  ShieldCheck,
  Download,
  ChevronRight,
  Play,
  Star,
  Music,
  BarChart3,
  Clock,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.04 } },
};
const item = { hidden: { y: 20, opacity: 0 }, show: { y: 0, opacity: 1 } };

export default function QuranProgressClient({ data }: { data: any }) {
  const [activeTab, setActiveTab] = useState("atlas");
  const [selectedJuz, setSelectedJuz] = useState<any>(null);

  // Fallback to empty objects to prevent 'undefined' crashes
  const analytics = data?.analytics || {};
  const juzProgress = data?.juzProgress || [];
  const logs = data?.logs || [];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return "bg-emerald-500 border-emerald-400 text-white shadow-emerald-500/20";
      case "IN_PROGRESS":
        return "bg-amber-500 border-amber-400 text-white shadow-amber-500/20";
      default:
        return "bg-slate-100 dark:bg-zinc-900 border-transparent opacity-40";
    }
  };

  return (
    <div className="min-h-screen bg-transparent text-slate-900 dark:text-zinc-100 pb-20 selection:bg-primary/30">
      <motion.main
        variants={container}
        initial="hidden"
        animate="show"
        className="max-w-[1600px] mx-auto space-y-10 px-2 md:px-6"
      >
        {/* 1. ELITE PERFORMANCE HUD */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 pt-6">
          {[
            {
              label: "Mastery Index",
              val: `${analytics.accuracy || 0}%`,
              icon: ShieldCheck,
              col: "text-emerald-500",
              bg: "bg-emerald-500/10",
            },
            {
              label: "Ayahs Memorized",
              val: analytics.totalAyahs || 0,
              icon: Book,
              col: "text-blue-500",
              bg: "bg-blue-500/10",
            },
            {
              label: "Activity Streak",
              val: `${analytics.streak || 0}d`,
              icon: Zap,
              col: "text-amber-500",
              bg: "bg-amber-500/10",
            },
            {
              label: "Juz Milestones",
              val: `${analytics.juzCount || 0}/30`,
              icon: Award,
              col: "text-indigo-500",
              bg: "bg-indigo-500/10",
            },
          ].map((s) => (
            <motion.div key={s.label} variants={item}>
              <Card className="border border-slate-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/40 backdrop-blur-md rounded-[2rem] group hover:shadow-2xl transition-all">
                <CardContent className="p-6 md:p-8 flex flex-col md:flex-row items-center gap-5">
                  <div
                    className={cn(
                      "p-4 rounded-2xl group-hover:rotate-6 transition-all",
                      s.bg,
                      s.col,
                    )}
                  >
                    <s.icon className="h-7 w-7" />
                  </div>
                  <div className="text-center md:text-left">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-1">
                      {s.label}
                    </p>
                    <p className="text-2xl font-black">{s.val}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </section>

        {/* 2. COMMAND NAVIGATION */}
        <div className="flex justify-center md:justify-start">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full md:w-auto"
          >
            <TabsList className="bg-slate-200/50 dark:bg-zinc-900/50 p-1.5 rounded-2xl h-16 border border-border/50 backdrop-blur-xl">
              <TabsTrigger
                value="atlas"
                className="px-8 rounded-xl font-black text-xs uppercase tracking-widest data-[state=active]:bg-primary data-[state=active]:text-white transition-all"
              >
                Juz' Atlas
              </TabsTrigger>
              <TabsTrigger
                value="logs"
                className="px-8 rounded-xl font-black text-xs uppercase tracking-widest data-[state=active]:bg-primary data-[state=active]:text-white transition-all"
              >
                Session logs
              </TabsTrigger>
              <TabsTrigger
                value="vault"
                className="px-8 rounded-xl font-black text-xs uppercase tracking-widest data-[state=active]:bg-primary data-[state=active]:text-white transition-all"
              >
                Media Vault
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* 3. CONTENT ENGINE */}
        <AnimatePresence mode="wait">
          {activeTab === "atlas" && (
            <motion.div
              key="atlas"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="space-y-8"
            >
              <Card className="border-none bg-white dark:bg-zinc-950 shadow-2xl rounded-[3.5rem] p-8 md:p-14">
                <header className="flex flex-col md:flex-row justify-between items-center mb-12 gap-8 text-center md:text-left">
                  <div className="space-y-2">
                    <h3 className="text-4xl font-black tracking-tighter uppercase italic leading-none">
                      The Academy Atlas
                    </h3>
                    <p className="text-sm text-muted-foreground font-bold tracking-widest uppercase opacity-60">
                      Visualizing 30 Juz' of Progression
                    </p>
                  </div>
                  <div className="flex gap-4 bg-secondary/30 p-4 rounded-3xl backdrop-blur-md">
                    {["Completed", "In Progress", "Locked"].map((st) => (
                      <div key={st} className="flex items-center gap-2">
                        <div
                          className={cn(
                            "h-3 w-3 rounded-full",
                            st === "Completed"
                              ? "bg-emerald-500"
                              : st === "In Progress"
                                ? "bg-amber-500"
                                : "bg-slate-300 dark:bg-zinc-800",
                          )}
                        />
                        <span className="text-[10px] font-black uppercase tracking-tighter opacity-70">
                          {st}
                        </span>
                      </div>
                    ))}
                  </div>
                </header>
                <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-10 gap-4">
                  {juzProgress.map((juz: any) => (
                    <motion.div
                      key={juz.juz}
                      whileHover={{ scale: 1.1, zIndex: 10 }}
                      onClick={() => setSelectedJuz(juz)}
                      className={cn(
                        "aspect-square rounded-[2rem] flex flex-col items-center justify-center cursor-pointer border-2 transition-all duration-500 gap-1 group",
                        getStatusColor(juz.status),
                      )}
                    >
                      <span className="text-[10px] font-black uppercase opacity-60 group-hover:opacity-100">
                        Juz
                      </span>
                      <span className="text-3xl font-black">{juz.juz}</span>
                      {juz.status === "IN_PROGRESS" && (
                        <span className="text-[10px] font-bold">
                          {juz.progress}%
                        </span>
                      )}
                    </motion.div>
                  ))}
                </div>
              </Card>
            </motion.div>
          )}

          {activeTab === "logs" && (
            <motion.div
              key="logs"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-8 space-y-4">
                  {logs.map((log: any) => (
                    <Card
                      key={log.id}
                      className="border-none bg-white dark:bg-zinc-950 shadow-xl rounded-[2.5rem] p-8 group hover:border-primary transition-all"
                    >
                      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="flex items-center gap-6">
                          <div className="h-16 w-16 rounded-[1.5rem] bg-slate-100 dark:bg-zinc-900 flex items-center justify-center font-black text-2xl text-primary italic uppercase shadow-inner">
                            S{log.surah}
                          </div>
                          <div>
                            <h4 className="text-2xl font-black tracking-tight uppercase leading-none mb-2">
                              Surah {log.surah}
                            </h4>
                            <div className="flex items-center gap-4">
                              <Badge className="bg-primary/10 text-primary border-none font-black text-[10px] px-4 py-1 uppercase">
                                {log.status}
                              </Badge>
                              <span className="text-xs text-muted-foreground font-black uppercase tracking-widest">
                                {new Date(log.date).toDateString()}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-6 w-full md:w-auto">
                          <div className="text-right hidden sm:block">
                            <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">
                              Stumbles
                            </p>
                            <p className="text-2xl font-black text-rose-500 tabular-nums">
                              {log.mistakes}
                            </p>
                          </div>
                          <Button
                            variant="outline"
                            className="h-14 rounded-2xl px-8 font-black text-xs uppercase tracking-widest border-zinc-200"
                          >
                            Feedback
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>

                {/* SIDEBAR: GOALS */}
                <div className="lg:col-span-4 space-y-6">
                  <Card className="border-none bg-slate-900 text-white rounded-[2.5rem] p-10 relative overflow-hidden shadow-2xl">
                    <div className="absolute top-0 right-0 p-8 opacity-10 rotate-12">
                      <Sparkles className="h-40 w-40" />
                    </div>
                    <div className="relative z-10 space-y-6">
                      <Badge className="bg-primary/20 text-primary border-none font-black uppercase text-[10px] tracking-widest">
                        Global Focus
                      </Badge>
                      <h3 className="text-3xl font-black tracking-tighter uppercase leading-[0.9]">
                        {data.student.goal}
                      </h3>
                      <div className="space-y-3">
                        <div className="flex justify-between text-[10px] font-black uppercase text-zinc-500 tracking-widest">
                          <span>Pathway Progress</span>
                          <span>{analytics.progressPercentage}%</span>
                        </div>
                        <Progress
                          value={analytics.progressPercentage}
                          className="h-1.5 bg-zinc-800"
                        />
                      </div>
                      <Button className="w-full h-14 rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] shadow-xl">
                        Update Milestone
                      </Button>
                    </div>
                  </Card>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "vault" && (
            <motion.div
              key="vault"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {data.recordings.map((r: any) => (
                <Card
                  key={r.id}
                  className="p-8 rounded-[2.5rem] border-none bg-white dark:bg-zinc-950 shadow-xl flex flex-col justify-between group hover:border-primary transition-all"
                >
                  <div className="h-14 w-14 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-500 mb-6 group-hover:scale-110 transition-transform">
                    <Music className="h-7 w-7" />
                  </div>
                  <div className="mb-8">
                    <h4 className="text-xl font-black uppercase tracking-tight mb-1">
                      {r.surah}
                    </h4>
                    <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">
                      Uploaded {new Date(r.date).toLocaleDateString()}
                    </p>
                  </div>
                  <Button
                    className="w-full h-14 rounded-2xl font-black uppercase text-xs tracking-widest gap-2"
                    onClick={() => window.open(r.url, "_blank")}
                  >
                    <Play className="h-4 w-4" /> Play Recording
                  </Button>
                </Card>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.main>

      {/* 4. JUZ DETAIL OVERLAY */}
      <AnimatePresence>
        {selectedJuz && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedJuz(null)}
              className="absolute inset-0 bg-black/85 backdrop-blur-2xl"
            />
            <motion.div
              initial={{ scale: 0.9, y: 40 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 40 }}
              className="relative w-full max-w-xl bg-white dark:bg-zinc-950 rounded-[4rem] shadow-3xl border border-white/5 overflow-hidden"
            >
              <div className="p-12 pb-6 flex justify-between items-center border-b border-zinc-100 dark:border-zinc-900 bg-slate-50/50 dark:bg-zinc-900/50">
                <div className="space-y-1">
                  <h2 className="text-4xl font-black tracking-tighter uppercase italic leading-none">
                    Juz' {selectedJuz.juz}
                  </h2>
                  <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.4em] mt-2">
                    Academy Sync v5.0
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full h-14 w-14 bg-white dark:bg-zinc-800 shadow-xl"
                  onClick={() => setSelectedJuz(null)}
                >
                  <X className="h-6 w-6" />
                </Button>
              </div>
              <div className="p-12 space-y-10">
                <div className="grid grid-cols-2 gap-6">
                  <div className="p-10 rounded-[3rem] bg-emerald-500 text-white flex flex-col items-center shadow-xl">
                    <span className="text-[10px] font-black uppercase tracking-widest opacity-80 mb-2">
                      Mastery
                    </span>
                    <p className="text-4xl font-black italic">
                      {selectedJuz.progress}%
                    </p>
                  </div>
                  <div className="p-10 rounded-[3rem] bg-slate-50 dark:bg-zinc-900 flex flex-col items-center">
                    <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-2">
                      Status
                    </span>
                    <p className="text-lg font-black uppercase">
                      {selectedJuz.status.replace("_", " ")}
                    </p>
                  </div>
                </div>
                <Button className="w-full h-20 rounded-[2rem] font-black text-xl shadow-2xl shadow-primary/20">
                  Download Exam Materials
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
