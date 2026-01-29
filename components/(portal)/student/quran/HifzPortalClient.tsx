"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Book,
  Award,
  TrendingUp,
  History,
  Mic,
  Zap,
  X,
  UploadCloud,
  ShieldCheck,
  BarChart3,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

// --- ANIMATION VARIANTS ---
const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } },
};
const item = { hidden: { y: 20, opacity: 0 }, show: { y: 0, opacity: 1 } };

export default function HifzPortalClient({ data }: { data: any }) {
  const [activeTab, setActiveTab] = useState("atlas");
  const [selectedSurah, setSelectedSurah] = useState<any>(null);

  // Helper: Find status of Surah from DB
  const getSurahStatus = (num: number) => {
    const mastery = data.surahMastery.find((s: any) => s.surahNumber === num);
    return mastery?.status || "NOT_STARTED";
  };

  return (
    <div className="min-h-screen bg-transparent text-slate-900 dark:text-zinc-100 pb-24">
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
              val: `${data.stats.accuracyScore}%`,
              icon: ShieldCheck,
              col: "text-emerald-500",
              bg: "bg-emerald-500/10",
            },
            {
              label: "Sessions",
              val: data.stats.totalSessions,
              icon: History,
              col: "text-blue-500",
              bg: "bg-blue-500/10",
            },
            {
              label: "Current Focus",
              val: `Surah ${data.stats.currentSurah}`,
              icon: Book,
              col: "text-indigo-500",
              bg: "bg-indigo-500/10",
            },
            {
              label: "Learning Streak",
              val: `${data.stats.streak} Days`,
              icon: Zap,
              col: "text-amber-500",
              bg: "bg-amber-500/10",
            },
          ].map((s) => (
            <motion.div key={s.label} variants={item}>
              <Card className="border border-slate-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/40 backdrop-blur-md rounded-4xl group hover:shadow-2xl transition-all">
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
                className="px-8 rounded-xl font-black text-xs uppercase tracking-widest data-[state=active]:bg-primary data-[state=active]:text-white"
              >
                Quran Atlas
              </TabsTrigger>
              <TabsTrigger
                value="logs"
                className="px-8 rounded-xl font-black text-xs uppercase tracking-widest data-[state=active]:bg-primary data-[state=active]:text-white"
              >
                Session logs
              </TabsTrigger>
              <TabsTrigger
                value="analytics"
                className="px-8 rounded-xl font-black text-xs uppercase tracking-widest data-[state=active]:bg-primary data-[state=active]:text-white"
              >
                Mastery Insights
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
              className="space-y-8"
            >
              {/* THE 114 SURAH INTERACTIVE GRID */}
              <Card className="border-none bg-white dark:bg-zinc-950 shadow-2xl rounded-[3.5rem] p-8 md:p-14">
                <header className="flex flex-col md:flex-row justify-between items-center mb-12 gap-8">
                  <div className="space-y-2">
                    <h3 className="text-4xl font-black tracking-tighter uppercase leading-none italic">
                      The Atlas
                    </h3>
                    <p className="text-sm text-muted-foreground font-bold tracking-[0.2em] uppercase opacity-60">
                      Visualizing 114 Surahs of Revelation
                    </p>
                  </div>
                  <div className="flex flex-wrap justify-center gap-6 bg-secondary/30 p-4 rounded-3xl backdrop-blur-md">
                    {["Mastered", "Revision", "Not Started"].map((st) => (
                      <div key={st} className="flex items-center gap-2">
                        <div
                          className={cn(
                            "h-3 w-3 rounded-full shadow-sm",
                            st === "Mastered"
                              ? "bg-emerald-500"
                              : st === "Revision"
                                ? "bg-amber-500"
                                : "bg-slate-200 dark:bg-zinc-800",
                          )}
                        />
                        <span className="text-[10px] font-black uppercase tracking-widest opacity-80">
                          {st}
                        </span>
                      </div>
                    ))}
                  </div>
                </header>

                <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-12 gap-3 md:gap-4">
                  {Array.from({ length: 114 }).map((_, i) => {
                    const num = i + 1;
                    const status = getSurahStatus(num);
                    return (
                      <motion.div
                        key={num}
                        whileHover={{ scale: 1.15, zIndex: 10 }}
                        onClick={() => setSelectedSurah({ num, status })}
                        className={cn(
                          "aspect-square rounded-2xl flex items-center justify-center cursor-pointer border-2 transition-all duration-500",
                          status === "COMPLETED"
                            ? "bg-emerald-500 border-emerald-400 text-white shadow-xl shadow-emerald-500/20"
                            : status === "IN_PROGRESS"
                              ? "bg-amber-500 border-amber-400 text-white shadow-xl shadow-amber-500/20"
                              : "bg-slate-100 dark:bg-zinc-900 border-transparent text-muted-foreground opacity-40 hover:opacity-100",
                        )}
                      >
                        <span className="text-xs font-black">{num}</span>
                      </motion.div>
                    );
                  })}
                </div>
              </Card>
            </motion.div>
          )}

          {activeTab === "logs" && (
            <motion.div
              key="logs"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-10"
            >
              {/* LEFT: DETAILED LOG FEED */}
              <div className="lg:col-span-8 space-y-6">
                {data.logs.map((log: any) => (
                  <Card
                    key={log.id}
                    className="border-none bg-white dark:bg-zinc-950 shadow-xl rounded-[2.5rem] p-8 group hover:border-primary transition-all"
                  >
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                      <div className="flex items-center gap-8">
                        <div className="h-20 w-20 rounded-4xl bg-slate-100 dark:bg-zinc-900 flex items-center justify-center font-black text-3xl text-primary italic shadow-inner">
                          S{log.surah}
                        </div>
                        <div>
                          <h4 className="text-2xl font-black tracking-tight uppercase">
                            Ayat {log.startAyah} - {log.endAyah}
                          </h4>
                          <div className="flex items-center gap-4 mt-2">
                            <Badge className="bg-primary/10 text-primary border-none font-black text-[10px] px-4 py-1 uppercase tracking-widest">
                              {log.status}
                            </Badge>
                            <span className="text-xs text-muted-foreground font-black uppercase tracking-[0.2em]">
                              {new Date(log.date).toDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-6 w-full md:w-auto">
                        <div className="text-right">
                          <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest mb-1">
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
                          Session Audio
                        </Button>
                      </div>
                    </div>
                    {log.comments && (
                      <div className="mt-8 p-6 rounded-3xl bg-slate-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 text-base font-medium leading-relaxed italic-none opacity-80">
                   {`     " ${log.comments} "`}
                      </div>
                    )}
                  </Card>
                ))}
              </div>

              {/* RIGHT: SUBMISSION & FEEDBACK */}
              <div className="lg:col-span-4 space-y-8">
                <Card className="border-none bg-indigo-600 dark:bg-indigo-700 text-white rounded-3xl shadow-2xl p-10 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:rotate-12 transition-transform">
                    <Mic className="h-48 w-48" />
                  </div>
                  <div className="relative z-10 space-y-8">
                    <h3 className="text-2xl font-black tracking-tighter uppercase leading-none italic">
                      Submission Engine
                    </h3>
                    <p className="text-indigo-100 text-sm font-medium leading-relaxed italic-none">
                      Record and upload your{" "}
                      <span className="font-black text-white underline underline-offset-4 decoration-white/30">
                        Sabak (New Lesson)
                      </span>{" "}
                      for instructor validation.
                    </p>
                    <div className="h-56 border-2 border-dashed border-white/20 rounded-[2.5rem] flex flex-col items-center justify-center gap-4 hover:bg-white/5 transition-all cursor-pointer group/upload">
                      <UploadCloud className="h-12 w-12 group-hover:scale-110 transition-transform" />
                      <p className="font-black text-[10px] uppercase tracking-[0.2em] opacity-60">
                        HQ Recitation (WAV/MP3)
                      </p>
                    </div>
                    <Button className="w-full h-16 bg-white text-indigo-600 hover:bg-zinc-100 rounded-2xl font-black text-lg shadow-2xl transition-transform active:scale-95">
                      Submit to Teacher
                    </Button>
                  </div>
                </Card>

                <Card className="border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-xl rounded-3xl p-10">
                  <h3 className="text-xl font-black mb-8 uppercase tracking-widest opacity-60">
                    Focus Areas
                  </h3>
                  <div className="space-y-4">
                    {[
                      {
                        area: "Madd (surah 18)",
                        desc: "Maintain breath for 4 counts",
                      },
                      {
                        area: "Ghunnah intensity",
                        desc: "Sharpen nasal sound",
                      },
                    ].map((f) => (
                      <div
                        key={f.area}
                        className="p-5 rounded-2xl bg-slate-50 dark:bg-zinc-900 border border-transparent hover:border-primary/20 transition-all"
                      >
                        <p className="text-xs font-black uppercase text-primary mb-1">
                          {f.area}
                        </p>
                        <p className="text-sm font-bold opacity-70 italic-none">
                          {f.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </motion.div>
          )}

          {activeTab === "analytics" && (
            <motion.div
              key="analytics"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              <Card className="border-none bg-white dark:bg-zinc-950 shadow-2xl rounded-[3.5rem] p-10 md:p-16">
                <h3 className="text-3xl font-black mb-10 uppercase tracking-tighter italic">
                  Spiritual Consistency (365 Days)
                </h3>
                {/* Heatmap Simulation (GitHub Style) */}
                <div className="flex flex-wrap gap-1.5 md:gap-2">
                  {Array.from({ length: 365 }).map((_, i) => (
                    <div
                      key={i}
                      className={cn(
                        "h-3 w-3 md:h-4 md:w-4 rounded-xs transition-all",
                        i % 15 === 0
                          ? "bg-primary shadow-[0_0_10px_rgba(var(--primary),0.4)]"
                          : i % 7 === 0
                            ? "bg-primary/40"
                            : "bg-slate-100 dark:bg-zinc-800",
                      )}
                    />
                  ))}
                </div>
                <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="p-8 rounded-[2.5rem] bg-slate-50 dark:bg-zinc-900 flex flex-col items-center">
                    <TrendingUp className="h-8 w-8 text-primary mb-3" />
                    <p className="text-3xl font-black italic">14.2</p>
                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                      Ayats / Session
                    </p>
                  </div>
                  <div className="p-8 rounded-[2.5rem] bg-slate-50 dark:bg-zinc-900 flex flex-col items-center">
                    <BarChart3 className="h-8 w-8 text-emerald-500 mb-3" />
                    <p className="text-3xl font-black italic">96.4%</p>
                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                      Stability Factor
                    </p>
                  </div>
                  <div className="p-8 rounded-[2.5rem] bg-slate-50 dark:bg-zinc-900 flex flex-col items-center">
                    <Award className="h-8 w-8 text-amber-500 mb-3" />
                    <p className="text-3xl font-black italic">Elite</p>
                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                      Current Tier
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.main>

      {/* --- SPATIAL SURAH DETAIL MODAL --- */}
      <AnimatePresence>
        {selectedSurah && (
          <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedSurah(null)}
              className="absolute inset-0 bg-black/85 backdrop-blur-[20px]"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 50 }}
              className="relative w-full max-w-2xl bg-white dark:bg-[#0A0A0B] rounded-[4rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] border border-white/5 overflow-hidden"
            >
              <div className="p-12 pb-6 border-b border-zinc-100 dark:border-zinc-900 flex justify-between items-center bg-slate-50/50 dark:bg-zinc-900/50 backdrop-blur-3xl">
                <div className="space-y-1">
                  <h2 className="text-4xl font-black tracking-tighter uppercase leading-none italic">
                    Surah #{selectedSurah.num}
                  </h2>
                  <Badge className="bg-emerald-500 text-white font-black px-4">
                    {selectedSurah.status}
                  </Badge>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full h-14 w-14 bg-white dark:bg-zinc-800 shadow-xl"
                  onClick={() => setSelectedSurah(null)}
                >
                  <X className="h-8 w-8" />
                </Button>
              </div>
              <div className="p-12 space-y-10">
                <div className="grid grid-cols-2 gap-8">
                  <div className="p-8 rounded-3xl bg-slate-50 dark:bg-zinc-900 border flex flex-col items-center">
                    <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-3">
                      Memorization Date
                    </span>
                    <p className="text-xl font-bold tracking-tight">
                      Jan 12, 2026
                    </p>
                  </div>
                  <div className="p-8 rounded-3xl bg-slate-50 dark:bg-zinc-900 border flex flex-col items-center">
                    <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-3">
                      Revision Cycle
                    </span>
                    <p className="text-xl font-bold tracking-tight">
                      Every 4 Days
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="text-xs font-black uppercase text-muted-foreground tracking-widest italic">
                    Stability Metric
                  </h4>
                  <Progress
                    value={92}
                    className="h-4 rounded-full bg-slate-100 dark:bg-zinc-800"
                  />
                  <p className="text-xs font-bold text-center opacity-60">
                    Calculated based on 14 recorded stumbles across 4 reviews.
                  </p>
                </div>
                <Button className="w-full h-20 rounded-4xl font-black text-2xl shadow-2xl shadow-primary/20 transition-all active:scale-95 uppercase tracking-widest">
                  Open Recitation Lab
                </Button>
              </div>
              <div className="p-8 bg-slate-50 dark:bg-zinc-900/50 flex justify-center text-[10px] font-black text-muted-foreground uppercase tracking-[0.5em] leading-none italic-none">
                Secure Hifz Record Sync v5.0
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
