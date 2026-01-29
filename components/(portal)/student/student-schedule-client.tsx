"use client";

import { useState, useTransition, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Clock,
  Video,
  BookOpen,
  Users,
  ChevronLeft,
  ChevronRight,
  Plus,
  X,
  Play,
  Sparkles,
  SeparatorVertical,
  MoreVertical,
  CalendarDays,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

// --- ANIMATION VARIANTS ---
const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } },
};
const item = { hidden: { y: 20, opacity: 0 }, show: { y: 0, opacity: 1 } };

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

  // Component State
  const [viewMode, setViewMode] = useState(filters.view || "weekly");
  const [bookingTeacher, setBookingTeacher] = useState<any>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  // --- ACTIONS ---
  const navigateWeek = (dir: "prev" | "next" | "current") => {
    const params = new URLSearchParams(searchParams.toString());
    const currentWeekTime = parseInt(
      params.get("week") || Date.now().toString(),
    );
    const newDate = new Date(currentWeekTime);

    if (dir === "prev") newDate.setDate(newDate.getDate() - 7);
    else if (dir === "next") newDate.setDate(newDate.getDate() + 7);
    else {
      params.delete("week");
      return startTransition(() => router.push(`?${params.toString()}`));
    }

    params.set("week", newDate.getTime().toString());
    startTransition(() => router.push(`?${params.toString()}`));
  };

  const handleBook = async (payload: any) => {
    toast.loading("Securing your session...");
    const res = await fetch("/api/student/schedule", {
      method: "POST",
      body: JSON.stringify({ action: "BOOK_SESSION", ...payload }),
    });
    if (res.ok) {
      toast.success("Session successfully booked!");
      setIsBookingModalOpen(false);
      router.refresh();
    } else {
      toast.error("Time slot unavailable.");
    }
  };

  // Find "Live" items happening now
  const liveSession = useMemo(() => {
    return weeklySchedule
      .flatMap((d: any) => d.items)
      .find((i: any) => i.isOnline && i.meetingUrl);
  }, [weeklySchedule]);

  return (
    <div className="min-h-screen bg-transparent pb-24 text-slate-900 dark:text-zinc-100">
      <motion.main
        variants={container}
        initial="hidden"
        animate="show"
        className="max-w-[1600px] mx-auto space-y-8"
      >
        {/* 1. ELITE HUD & NAVIGATION */}
        <section className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div className="space-y-1">
            <motion.div
              variants={item}
              className="flex items-center gap-2 text-primary font-black text-[10px] uppercase tracking-[0.3em]"
            >
              <Sparkles className="h-3 w-3" /> Temporal Dashboard
            </motion.div>
            <motion.h2
              variants={item}
              className="text-4xl md:text-6xl font-black tracking-tighter leading-none italic uppercase"
            >
              Schedule
            </motion.h2>
          </div>

          <motion.div
            variants={item}
            className="flex flex-wrap items-center gap-3 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-xl p-2 rounded-[2rem] border shadow-2xl border-slate-200/50 dark:border-zinc-800/50"
          >
            <div className="flex items-center bg-secondary/50 rounded-xl px-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigateWeek("prev")}
                className="rounded-lg h-9 w-9"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <div className="px-4 text-center min-w-[140px]">
                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                  {stats.dateRange.split("-")[0]}
                </p>
                <p className="text-xs font-bold">Standard Term</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigateWeek("next")}
                className="rounded-lg h-9 w-9"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            <SeparatorVertical orientation="vertical" className="h-8 hidden md:block" />

            <div className="flex p-1 bg-secondary/30 rounded-xl">
              <Button
                variant={viewMode === "weekly" ? "white" : "ghost"}
                onClick={() => setViewMode("weekly")}
                className="h-9 rounded-lg px-4 font-bold text-xs uppercase tracking-widest"
              >
                Grid
              </Button>
              <Button
                variant={viewMode === "list" ? "white" : "ghost"}
                onClick={() => setViewMode("list")}
                className="h-9 rounded-lg px-4 font-bold text-xs uppercase tracking-widest"
              >
                List
              </Button>
            </div>

            <Button
              onClick={() => setIsBookingModalOpen(true)}
              className="rounded-xl h-11 px-6 font-black bg-primary text-white shadow-xl shadow-primary/20 transition-transform active:scale-95"
            >
              <Plus className="h-4 w-4 mr-2" /> Book Teacher
            </Button>
          </motion.div>
        </section>

        {/* 2. THE LIVE INTERCEPTOR (Real-time Focus) */}
        <AnimatePresence>
          {liveSession && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
            >
              <Card className="border-none bg-rose-500 text-white rounded-[2.5rem] shadow-2xl shadow-rose-500/20 overflow-hidden relative group">
                <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:scale-110 transition-transform">
                  <Video className="h-40 w-40" />
                </div>
                <CardContent className="p-8 md:p-12 relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
                  <div className="space-y-4">
                    <Badge className="bg-white/20 text-white border-none font-black px-4 py-1 animate-pulse">
                      SESSION LIVE NOW
                    </Badge>
                    <h3 className="text-4xl font-black tracking-tighter uppercase italic">
                      {liveSession.title}
                    </h3>
                    <p className="text-rose-100 font-medium">
                      Instructor {liveSession.teacher} is waiting for you in the
                      virtual classroom.
                    </p>
                  </div>
                  <Button
                    onClick={() => window.open(liveSession.meetingUrl)}
                    className="w-full md:w-auto h-20 px-12 rounded-[2rem] bg-white text-rose-600 hover:bg-zinc-100 font-black text-2xl shadow-2xl transition-all active:scale-95"
                  >
                    Enter Room <Play className="ml-3 h-6 w-6 fill-rose-600" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 3. CORE SCHEDULE HUB */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* MAIN VIEW (8 COLS) */}
          <div className="lg:col-span-8 space-y-8">
            {viewMode === "weekly" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {weeklySchedule.map((day: any) => (
                  <motion.div key={day.day} variants={item}>
                    <Card
                      className={cn(
                        "border-none bg-white dark:bg-zinc-900/50 shadow-xl rounded-[2.5rem] p-8 min-h-[300px] transition-all hover:ring-4 ring-primary/5",
                        day.day === new Date().getDay() &&
                          "ring-4 ring-primary/20 bg-primary/5 dark:bg-primary/5",
                      )}
                    >
                      <div className="flex justify-between items-center mb-8">
                        <h4 className="text-2xl font-black uppercase tracking-tighter italic">
                          {day.dayName}
                        </h4>
                        <Badge
                          variant="secondary"
                          className="rounded-lg font-black text-[10px] px-3 tracking-widest"
                        >
                          {day.items.length} EVENTS
                        </Badge>
                      </div>

                      <div className="space-y-4">
                        {day.items.length > 0 ? (
                          day.items.map((event: any) => (
                            <div
                              key={event.id}
                              className="p-5 rounded-3xl bg-secondary/40 border border-transparent hover:border-primary/20 transition-all group flex items-center justify-between"
                            >
                              <div className="flex items-center gap-4">
                                <div
                                  className={cn(
                                    "h-12 w-12 rounded-2xl flex items-center justify-center transition-all shadow-sm",
                                    event.type === "CLASS"
                                      ? "bg-blue-500 text-white"
                                      : "bg-emerald-500 text-white",
                                  )}
                                >
                                  {event.type === "CLASS" ? (
                                    <BookOpen className="h-5 w-5" />
                                  ) : (
                                    <Users className="h-5 w-5" />
                                  )}
                                </div>
                                <div>
                                  <p className="font-bold text-sm tracking-tight group-hover:text-primary uppercase">
                                    {event.title}
                                  </p>
                                  <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest flex items-center gap-2 mt-1">
                                    <Clock className="h-3 w-3" /> {event.time}
                                  </p>
                                </div>
                              </div>
                              <ChevronRight className="h-4 w-4 text-zinc-300 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                            </div>
                          ))
                        ) : (
                          <div className="h-40 flex items-center justify-center border-2 border-dashed border-zinc-100 dark:border-zinc-800 rounded-[2rem]">
                            <p className="text-xs font-black uppercase text-muted-foreground tracking-widest opacity-40">
                              Unscheduled
                            </p>
                          </div>
                        )}
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            ) : (
              /* LIST VIEW - ELITE SPATIAL ROWS */
              <div className="space-y-4">
                {weeklySchedule
                  .flatMap((d: any) =>
                    d.items.map((i: any) => ({ ...i, dayName: d.dayName })),
                  )
                  .map((event: any) => (
                    <Card
                      key={event.id}
                      className="border-none bg-white dark:bg-zinc-950 shadow-xl rounded-[2rem] p-6 hover:shadow-2xl transition-all group"
                    >
                      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="flex items-center gap-6 w-full lg:w-auto">
                          <div className="text-center w-20 hidden md:block">
                            <p className="text-[10px] font-black uppercase text-primary tracking-widest">
                              {event.dayName.substring(0, 3)}
                            </p>
                            <p className="text-2xl font-black">29</p>
                          </div>
                          <Separator
                            orientation="vertical"
                            className="h-12 hidden md:block"
                          />
                          <div>
                            <p className="text-xl font-black uppercase tracking-tight italic group-hover:text-primary transition-colors">
                              {event.title}
                            </p>
                            <div className="flex items-center gap-4 mt-1">
                              <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">
                                {event.teacher}
                              </span>
                              <Badge className="bg-secondary text-foreground text-[8px] font-black uppercase border-none">
                                {event.type}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 w-full md:w-auto">
                          <div className="text-right">
                            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                              Session Interval
                            </p>
                            <p className="font-bold tabular-nums">
                              {event.time}
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-full bg-slate-50 dark:bg-zinc-900"
                          >
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
              </div>
            )}
          </div>

          {/* SIDEBAR COMMANDS (4 COLS) */}
          <div className="lg:col-span-4 space-y-8">
            {/* KPI STATS CARD */}
            <motion.div variants={item}>
              <Card className="border-none bg-slate-900 text-white rounded-[3rem] shadow-2xl p-10 relative overflow-hidden">
                <div className="absolute -top-10 -right-10 opacity-10 rotate-12">
                  <CalendarDays className="h-40 w-40" />
                </div>
                <div className="relative z-10 space-y-8">
                  <h3 className="text-2xl font-black uppercase tracking-tighter italic">
                    Weekly Load
                  </h3>
                  <div className="space-y-6">
                    {[
                      {
                        label: "Active Nodes",
                        val: stats.totalClasses,
                        sub: "Scheduled events",
                      },
                      {
                        label: "Busiest Hub",
                        val: stats.busyDay,
                        sub: "Peak performance",
                      },
                    ].map((s) => (
                      <div key={s.label}>
                        <p className="text-[10px] font-black uppercase text-slate-500 tracking-[0.2em] mb-1">
                          {s.label}
                        </p>
                        <p className="text-3xl font-black italic">{s.val}</p>
                        <p className="text-xs text-slate-400 mt-1">{s.sub}</p>
                      </div>
                    ))}
                  </div>
                  <Button className="w-full bg-primary h-14 rounded-2xl font-black uppercase text-xs tracking-widest shadow-xl">
                    Download PDF Record
                  </Button>
                </div>
              </Card>
            </motion.div>

            {/* ASSIGNMENT RADAR */}
            <motion.div variants={item}>
              <Card className="border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-xl rounded-[3rem] p-10">
                <h3 className="text-2xl font-black mb-8 uppercase tracking-tighter italic pr-10">
                  Temporal Deadlines
                </h3>
                <div className="space-y-6">
                  {upcomingAssignments.map((a: any) => (
                    <div
                      key={a.id}
                      className="relative pl-6 border-l-2 border-slate-100 dark:border-zinc-800 hover:border-primary transition-colors cursor-pointer group"
                    >
                      <div className="absolute -left-[5px] top-0 h-2 w-2 rounded-full bg-zinc-200 group-hover:bg-primary transition-all" />
                      <p className="text-xs font-black uppercase text-rose-500 mb-1">
                        {new Date(a.dueDate).toLocaleDateString()}
                      </p>
                      <p className="font-bold text-sm group-hover:text-primary transition-colors">
                        {a.title}
                      </p>
                      <p className="text-[10px] font-black text-muted-foreground uppercase mt-1 tracking-widest">
                        {a.subject}
                      </p>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </motion.main>

      {/* --- ELITE BOOKING MODAL --- */}
      <AnimatePresence>
        {isBookingModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsBookingModalOpen(false)}
              className="absolute inset-0 bg-black/85 backdrop-blur-3xl"
            />
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 50 }}
              className="relative w-full max-w-4xl bg-white dark:bg-[#0A0A0B] rounded-[4rem] shadow-3xl border border-white/5 overflow-hidden"
            >
              <div className="p-12 pb-6 flex justify-between items-center border-b border-zinc-100 dark:border-zinc-900 bg-slate-50/50 dark:bg-zinc-900/50">
                <div className="space-y-1">
                  <h2 className="text-4xl font-black tracking-tighter uppercase leading-none italic">
                    Reservations Center
                  </h2>
                  <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.4em] mt-2">
                    One-on-One Session Booking
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full h-16 w-16 bg-white dark:bg-zinc-800 shadow-xl"
                  onClick={() => setIsBookingModalOpen(false)}
                >
                  <X className="h-8 w-8" />
                </Button>
              </div>

              <div className="p-12 max-h-[60vh] overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* Step 1: Select Teacher */}
                <div className="space-y-6">
                  <h4 className="text-xs font-black uppercase text-muted-foreground tracking-widest px-2">
                    1. Select Elite Instructor
                  </h4>
                  <div className="space-y-3">
                    {availableTeachers.map((t: any) => (
                      <div
                        key={t.id}
                        onClick={() => setBookingTeacher(t)}
                        className={cn(
                          "p-6 rounded-[2.5rem] border transition-all cursor-pointer flex items-center gap-6",
                          bookingTeacher?.id === t.id
                            ? "bg-primary border-primary text-white shadow-2xl"
                            : "bg-slate-50 dark:bg-zinc-900 border-zinc-100 dark:border-zinc-800 hover:border-primary/20",
                        )}
                      >
                        <Avatar className="h-16 w-16 border-4 border-white/10 shadow-xl">
                          <AvatarImage src={t.image} />
                          <AvatarFallback className="font-black bg-zinc-800 text-white">
                            AA
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-xl font-black uppercase tracking-tight">
                            {t.name.split(" ")[0]}
                          </p>
                          <p
                            className={cn(
                              "text-[10px] font-black uppercase tracking-widest mt-1",
                              bookingTeacher?.id === t.id
                                ? "text-white/80"
                                : "text-muted-foreground",
                            )}
                          >
                            Specialist: Quran
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Step 2: Select Temporal Slot */}
                <div className="space-y-8">
                  <h4 className="text-xs font-black uppercase text-muted-foreground tracking-widest px-2">
                    2. Synchronize Time
                  </h4>
                  <div className="space-y-6 bg-slate-50 dark:bg-zinc-900/50 p-8 rounded-[3rem] border border-zinc-100 dark:border-zinc-800">
                    <div className="space-y-4">
                      <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground px-2">
                        Preferred Date
                      </label>
                      <input
                        type="date"
                        className="w-full h-16 rounded-2xl bg-white dark:bg-zinc-800 px-6 font-bold border-none focus:ring-2 ring-primary/20"
                      />
                    </div>
                    <div className="space-y-4">
                      <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground px-2">
                        Temporal Window
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {["09:00", "10:30", "14:00", "16:00"].map((t) => (
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
                    disabled={!bookingTeacher}
                    onClick={() => handleBook({ teacherId: bookingTeacher.id })}
                    className="w-full h-20 rounded-[2rem] font-black text-2xl shadow-2xl shadow-primary/20 transition-all uppercase tracking-widest"
                  >
                    Lock Session
                  </Button>
                </div>
              </div>
              <div className="p-10 border-t bg-slate-50/50 dark:bg-zinc-900/50 flex justify-center italic font-black uppercase text-[10px] text-muted-foreground tracking-[0.5em]">
                Temporal Sync v4.1
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
