"use client";

import React, { useState, useTransition, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Clock,
  Video,
  BookOpen,
  Users,
  FileText,
  ChevronLeft,
  ChevronRight,
  Plus,
  Download,
  Bell,
  X,
  Search,
  Play,
  Sparkles,
  GraduationCap,
  MapPin,
  Loader2,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

// --- ANIMATION CONFIG ---
const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } },
};
const fadeInUp = { hidden: { y: 20, opacity: 0 }, show: { y: 0, opacity: 1 } };

export default function StudentScheduleClient({
  student,
  weeklySchedule,
  upcomingAssignments,
  availableTeachers,
  stats,
  filters,
}: any) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  // Local State
  const [viewMode, setViewMode] = useState(filters.view);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingTeacher, setBookingTeacher] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // --- ACTIONS ---
  const handleWeekChange = (dir: "prev" | "next" | "current") => {
    const params = new URLSearchParams(searchParams.toString());
    const currentWeek = parseInt(params.get("week") || Date.now().toString());
    const date = new Date(currentWeek);

    if (dir === "prev") date.setDate(date.getDate() - 7);
    else if (dir === "next") date.setDate(date.getDate() + 7);
    else {
      params.delete("week");
      return startTransition(() => router.push(`?${params.toString()}`));
    }

    params.set("week", date.getTime().toString());
    startTransition(() => router.push(`?${params.toString()}`));
  };

  const onConfirmBooking = async (payload: any) => {
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/student/schedule", {
        method: "POST",
        body: JSON.stringify({ action: "BOOK_SESSION", ...payload }),
      });
      if (!res.ok) throw new Error();
      toast.success("Temporal Slot Secured!");
      setIsBookingOpen(false);
      router.refresh();
    } catch {
      toast.error("Slot conflict detected.");
    } finally {
      setIsSubmitting(null as any);
    }
  };

  return (
    <div className="min-h-screen bg-transparent pb-20 selection:bg-primary/30">
      <motion.main
        variants={container}
        initial="hidden"
        animate="show"
        className="max-w-[1600px] mx-auto space-y-10"
      >
        {/* 1. ELITE HUD & NAVIGATION */}
        <section className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 pt-4">
          <div className="space-y-1">
            <motion.div
              variants={fadeInUp}
              className="flex items-center gap-2 text-primary font-black text-[10px] uppercase tracking-[0.3em]"
            >
              <Sparkles className="h-3 w-3" /> System Synchronized
            </motion.div>
            <motion.h2
              variants={fadeInUp}
              className="text-5xl md:text-7xl font-black tracking-tighter leading-none italic uppercase"
            >
              Chronos
            </motion.h2>
          </div>

          <motion.div
            variants={fadeInUp}
            className="flex flex-wrap items-center gap-3 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-2xl p-2 rounded-[2rem] border border-slate-200/50 dark:border-zinc-800/50 shadow-2xl"
          >
            <div className="flex items-center bg-secondary/50 rounded-xl px-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleWeekChange("prev")}
                className="h-10 w-10"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <div className="px-6 text-center min-w-[160px]">
                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                  {stats.dateRange.split("-")[0]}
                </p>
                <p className="text-xs font-bold italic">Temporal View</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleWeekChange("next")}
                className="h-10 w-10"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex p-1 bg-secondary/30 rounded-xl ml-2">
              <Button
                variant={viewMode === "weekly" ? "white" : "ghost"}
                onClick={() => setViewMode("weekly")}
                className="h-10 rounded-lg px-6 font-black text-[10px] uppercase tracking-widest"
              >
                Weekly
              </Button>
              <Button
                variant={viewMode === "list" ? "white" : "ghost"}
                onClick={() => setViewMode("list")}
                className="h-10 rounded-lg px-6 font-black text-[10px] uppercase tracking-widest"
              >
                List
              </Button>
            </div>

            <Button
              onClick={() => setIsBookingOpen(true)}
              className="rounded-xl h-12 px-8 font-black bg-primary text-white shadow-xl shadow-primary/20 active:scale-95 transition-all"
            >
              <Plus className="mr-2 h-5 w-5" /> Book Session
            </Button>
          </motion.div>
        </section>

        {/* 2. HUD STATS STRIP */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {[
            {
              label: "Total Events",
              val: stats.totalEvents,
              icon: Calendar,
              col: "text-blue-500",
              bg: "bg-blue-500/10",
            },
            {
              label: "Pending Tasks",
              val: stats.pendingTasks,
              icon: Zap,
              col: "text-amber-500",
              bg: "bg-amber-500/10",
            },
            {
              label: "Active Nodes",
              val: "Elite",
              icon: ShieldCheck,
              col: "text-emerald-500",
              bg: "bg-emerald-500/10",
            },
            {
              label: "Server Sync",
              val: "Live",
              icon: Globe,
              col: "text-indigo-500",
              bg: "bg-indigo-500/10",
            },
          ].map((s) => (
            <motion.div key={s.label} variants={fadeInUp}>
              <Card className="border-none bg-white/50 dark:bg-zinc-900/40 backdrop-blur-md rounded-[2.5rem] shadow-sm hover:shadow-2xl transition-all group border border-transparent hover:border-primary/20">
                <CardContent className="p-6 flex items-center gap-5">
                  <div
                    className={cn(
                      "h-14 w-14 rounded-2xl flex items-center justify-center transition-all group-hover:rotate-6",
                      s.bg,
                      s.col,
                    )}
                  >
                    <s.icon className="h-7 w-7" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                      {s.label}
                    </p>
                    <p className="text-2xl font-black">{s.val}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </section>

        {/* 3. MAIN TIMELINE GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-6">
            <AnimatePresence mode="wait">
              {viewMode === "weekly" ? (
                <motion.div
                  key="weekly"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                  {weeklySchedule.map((day: any) => (
                    <Card
                      key={day.day}
                      className={cn(
                        "border-none bg-white dark:bg-zinc-950 shadow-xl rounded-[2.5rem] p-8 min-h-[300px]",
                        day.day === new Date().getDay() &&
                          "ring-2 ring-primary/40 bg-primary/5",
                      )}
                    >
                      <div className="flex justify-between items-center mb-8">
                        <h4 className="text-2xl font-black uppercase tracking-tighter italic">
                          {day.dayName}
                        </h4>
                        <Badge
                          variant="secondary"
                          className="font-black text-[10px] tracking-widest px-3"
                        >
                          {day.items.length} EVENTS
                        </Badge>
                      </div>
                      <div className="space-y-3">
                        {day.items.map((item: any) => (
                          <div
                            key={item.id}
                            className="p-5 rounded-[1.75rem] bg-secondary/30 border border-transparent hover:border-primary/20 transition-all group flex items-center justify-between"
                          >
                            <div className="flex items-center gap-4">
                              <div
                                className={cn(
                                  "h-12 w-12 rounded-2xl flex items-center justify-center",
                                  item.type === "CLASS"
                                    ? "bg-blue-500 text-white"
                                    : "bg-emerald-500 text-white",
                                )}
                              >
                                {item.type === "CLASS" ? (
                                  <BookOpen className="h-5 w-5" />
                                ) : (
                                  <Users className="h-5 w-5" />
                                )}
                              </div>
                              <div>
                                <p className="font-bold text-sm tracking-tight group-hover:text-primary transition-colors">
                                  {item.title}
                                </p>
                                <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest flex items-center gap-2 mt-1">
                                  <Clock className="h-3 w-3" /> {item.time}
                                </p>
                              </div>
                            </div>
                            {item.meetingUrl && (
                              <Button
                                onClick={() => window.open(item.meetingUrl)}
                                size="icon"
                                variant="ghost"
                                className="rounded-full h-10 w-10"
                              >
                                <Play className="h-4 w-4 fill-current" />
                              </Button>
                            )}
                          </div>
                        ))}
                      </div>
                    </Card>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key="list"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-4"
                >
                  {weeklySchedule
                    .flatMap((d: any) =>
                      d.items.map((i: any) => ({ ...i, dayName: d.dayName })),
                    )
                    .map((item: any) => (
                      <Card
                        key={item.id}
                        className="border-none bg-white dark:bg-zinc-950 shadow-xl rounded-[2rem] p-6 group hover:shadow-2xl transition-all"
                      >
                        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                          <div className="flex items-center gap-8">
                            <div className="text-center w-16 hidden md:block">
                              <p className="text-[10px] font-black text-primary uppercase tracking-widest">
                                {item.dayName.substring(0, 3)}
                              </p>
                              <p className="text-2xl font-black italic">
                                Active
                              </p>
                            </div>
                            <div className="h-16 w-16 rounded-[1.5rem] bg-slate-100 dark:bg-zinc-900 flex items-center justify-center font-black text-primary">
                              <Calendar className="h-6 w-6" />
                            </div>
                            <div>
                              <h4 className="text-xl font-black uppercase tracking-tight italic group-hover:text-primary transition-colors">
                                {item.title}
                              </h4>
                              <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest mt-1">
                                {item.teacher} • {item.time}
                              </p>
                            </div>
                          </div>
                          <Button
                            variant="outline"
                            className="w-full md:w-auto h-12 rounded-xl px-8 font-black uppercase text-[10px] tracking-widest border-zinc-200"
                          >
                            Details
                          </Button>
                        </div>
                      </Card>
                    ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* SIDEBAR: ASSIGNMENTS & TEACHERS */}
          <div className="lg:col-span-4 space-y-8">
            <Card className="border-none bg-slate-900 text-white rounded-[3rem] shadow-2xl p-10 relative overflow-hidden group">
              <div className="absolute -top-10 -right-10 opacity-10 group-hover:scale-110 transition-transform rotate-12">
                <FileText className="h-48 w-48" />
              </div>
              <h3 className="text-2xl font-black uppercase tracking-tighter italic mb-8">
                Academic Queue
              </h3>
              <div className="space-y-6 relative z-10">
                {upcomingAssignments.map((a: any) => (
                  <div
                    key={a.id}
                    className="relative pl-6 border-l-2 border-white/10 hover:border-primary transition-colors cursor-pointer group/task"
                  >
                    <div className="absolute -left-[5px] top-0 h-2 w-2 rounded-full bg-zinc-700 group-hover/task:bg-primary" />
                    <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-1">
                      {new Date(a.dueDate).toLocaleDateString()}
                    </p>
                    <p className="font-bold text-sm leading-tight text-white">
                      {a.title}
                    </p>
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-1">
                      {a.subject.name}
                    </p>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-xl rounded-[3rem] p-8 md:p-10">
              <h3 className="text-xl font-black uppercase tracking-tighter mb-8 italic">
                Academy Faculty
              </h3>
              <div className="space-y-6">
                {availableTeachers.map((t: any) => (
                  <div
                    key={t.id}
                    className="flex items-center justify-between group cursor-pointer"
                    onClick={() => {
                      setBookingTeacher(t);
                      setIsBookingOpen(true);
                    }}
                  >
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12 border-2 border-background shadow-md group-hover:ring-2 ring-primary transition-all">
                        <AvatarImage src={t.user.image} />
                        <AvatarFallback>AA</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-black uppercase tracking-tight">
                          {t.user.name.split(" ")[0]}
                        </p>
                        <p className="text-[10px] font-black text-muted-foreground uppercase opacity-60">
                          Verified Specialist
                        </p>
                      </div>
                    </div>
                    <Plus className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </motion.main>

      {/* --- ELITE SPATIAL MODAL ENGINE --- */}
      <AnimatePresence>
        {isBookingOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsBookingOpen(false)}
              className="absolute inset-0 bg-black/85 backdrop-blur-2xl"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 40 }}
              className="relative w-full max-w-2xl bg-white dark:bg-[#0A0A0B] rounded-[4rem] shadow-3xl border border-white/5 overflow-hidden"
            >
              <div className="p-12 pb-6 flex justify-between items-center border-b border-zinc-100 dark:border-zinc-900 bg-slate-50/50 dark:bg-zinc-900/50">
                <div className="space-y-1">
                  <h2 className="text-4xl font-black tracking-tighter uppercase italic">
                    Reserve Center
                  </h2>
                  <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.4em] mt-2 leading-none">
                    Record Sync v4.2
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full h-14 w-14 bg-white dark:bg-zinc-800 shadow-xl border border-muted-foreground/10"
                  onClick={() => setIsBookingOpen(false)}
                >
                  <X className="h-6 w-6" />
                </Button>
              </div>

              <div className="p-12 space-y-10 max-h-[60vh] overflow-y-auto scrollbar-hide">
                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground px-2">
                    1. Identify Instructor
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {availableTeachers.map((t: any) => (
                      <div
                        key={t.id}
                        onClick={() => setBookingTeacher(t)}
                        className={cn(
                          "p-6 rounded-[2.5rem] border transition-all cursor-pointer flex items-center gap-5",
                          bookingTeacher?.id === t.id
                            ? "bg-primary border-primary text-white shadow-2xl"
                            : "bg-slate-50 dark:bg-zinc-900 border-transparent hover:border-primary/20",
                        )}
                      >
                        <Avatar className="h-12 w-12 border-2 border-white/20">
                          <AvatarImage src={t.user.image} />
                          <AvatarFallback>AA</AvatarFallback>
                        </Avatar>
                        <p className="text-xs font-black uppercase tracking-widest">
                          {t.user.name.split(" ")[0]}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-8">
                  <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground px-2">
                      2. Synchronize Slot
                    </label>
                    <div className="grid grid-cols-1 gap-4 bg-slate-50 dark:bg-zinc-900/50 p-8 rounded-[3rem] border border-zinc-100 dark:border-zinc-800">
                      <div className="space-y-2">
                        <p className="text-[10px] font-black uppercase tracking-widest opacity-60">
                          Calendar Sync
                        </p>
                        <input
                          type="date"
                          className="w-full h-14 bg-white dark:bg-zinc-800 rounded-2xl px-6 font-bold border-none outline-none focus:ring-2 ring-primary/20 transition-all"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        {["09:00", "14:00", "16:30", "20:00"].map((t) => (
                          <Button
                            key={t}
                            variant="outline"
                            className="h-14 rounded-xl font-black italic"
                          >
                            {t}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                  <Button
                    disabled={!bookingTeacher || isSubmitting}
                    onClick={() =>
                      onConfirmBooking({
                        teacherId: bookingTeacher.id,
                        date: new Date(),
                        startTime: "09:00",
                        duration: 30,
                      })
                    }
                    className="w-full h-20 rounded-[2rem] font-black text-2xl shadow-2xl shadow-primary/20 uppercase tracking-widest"
                  >
                    {isSubmitting ? (
                      <Loader2 className="animate-spin h-8 w-8" />
                    ) : (
                      "Authorize Booking"
                    )}
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

// --- SUB-COMPONENTS (SHADCN BASE) ---
function Separator({
  orientation = "horizontal",
  className,
}: {
  orientation?: "horizontal" | "vertical";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "bg-border",
        orientation === "horizontal" ? "h-[1px] w-full" : "w-[1px] h-full",
        className,
      )}
    />
  );
}

function Globe({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a14.5 14.5 0 0 0 0 20" />
      <path d="M2 12h20" />
      <path d="M12 2a14.5 14.5 0 0 1 0 20" />
    </svg>
  );
}

function ShieldCheck({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.5 3.8 17 5 19 5a1 1 0 0 1 1 1z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}
