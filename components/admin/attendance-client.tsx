"use client";

import { useState, useTransition, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Check,
  X,
  Clock,
  Coffee,
  ChevronLeft,
  ChevronRight,
  Zap,
  ArrowRightLeft,
  Users,
} from "lucide-react";
import {
  markAttendance,
  logDeparture,
} from "@/app/actions/admin/attendance/actions";

// Brand UI
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { format } from "date-fns";

export default function AttendanceRegister({
  initialSchedules,
}: {
  initialSchedules: any[];
}) {
  const [isPending, startTransition] = useTransition();
  const [activeIdx, setActiveIdx] = useState(0);
  const [targetDate, setTargetDate] = useState(new Date());
  const [search, setSearch] = useState("");

  const schedule = initialSchedules[activeIdx];
  const enrollments = schedule?.class.enrollments || [];

  const filteredData = useMemo(() => {
    return enrollments.filter((e: any) =>
      e.student.user.name.toLowerCase().includes(search.toLowerCase()),
    );
  }, [enrollments, search]);

  const stats = useMemo(() => {
    const total = enrollments.length;
    const present =
      schedule?.attendances.filter((a: any) => a.status === "PRESENT").length ||
      0;
    const percent = total > 0 ? Math.round((present / total) * 100) : 0;
    return { total, present, percent };
  }, [schedule, enrollments]);

  const handleUpdate = (studentId: string, status: string) => {
    startTransition(async () => {
      try {
        await markAttendance({
          studentId,
          classId: schedule.classId,
          scheduleId: schedule.id,
          status: status as any,
          date: targetDate.toISOString(),
        });
        toast.success("Identity Verified");
      } catch (e) {
        toast.error("Handshake Refused");
      }
    });
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-20">
      {/* --- MASTER HEADER --- */}
      <header className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 px-2">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-700 dark:text-primary-300">
              Daar-ul-Maysaroh Terminal
            </span>
          </div>
          <h1 className="text-5xl font-black tracking-tighter text-slate-900 dark:text-white">
            Daily <span className="text-primary-700">Register</span>
          </h1>
        </div>

        <div className="flex flex-wrap gap-3 w-full lg:w-auto">
          <div className="flex items-center glass-surface px-4 py-2 rounded-2xl border-0 h-14">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="px-6 text-xs font-black uppercase tracking-widest">
              {format(targetDate, "EEE, MMM dd")}
            </span>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <Button className="h-14 px-8 rounded-2xl bg-primary-700 text-white font-black uppercase text-[10px] tracking-widest shadow-royal transition-all hover:scale-105 active:scale-95">
            <Zap className="h-4 w-4 mr-2 text-gold" /> Bulk Presence
          </Button>
        </div>
      </header>

      {/* --- QUICK ANALYTICS --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-2">
        <div className="institutional-card glass-surface p-6 flex justify-between items-center border-emerald-500/20">
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
              Fill Rate
            </p>
            <h4 className="text-2xl font-black">{stats.percent}%</h4>
          </div>
          <Progress
            value={stats.percent}
            className="h-2 w-24 bg-emerald-500/10"
          />
        </div>
        <div className="institutional-card glass-surface p-6 flex justify-between items-center">
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
              Verified Nodes
            </p>
            <h4 className="text-2xl font-black">
              {stats.present}{" "}
              <span className="text-slate-300">/ {stats.total}</span>
            </h4>
          </div>
          <Users className="text-primary-700 opacity-20 h-8 w-8" />
        </div>
        <div className="institutional-card glass-surface p-6 flex justify-between items-center border-gold/20">
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
              Active Class
            </p>
            <h4 className="text-2xl font-black truncate max-w-[150px]">
              {schedule?.class.name}
            </h4>
          </div>
          <ArrowRightLeft className="text-gold h-6 w-6" />
        </div>
      </div>

      {/* --- SEARCH & CLASS FILTER --- */}
      <div className="flex flex-col md:flex-row gap-4 px-2">
        <div className="relative flex-1 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            placeholder="Search identity registry..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-14 pl-12 glass-surface rounded-2xl border-0 outline-none focus:ring-2 ring-primary-700/10 dark:bg-slate-900"
          />
        </div>
        <select
          className="h-14 px-6 glass-surface rounded-2xl border-0 font-bold text-xs uppercase tracking-widest outline-none dark:bg-slate-900"
          onChange={(e) => setActiveIdx(Number(e.target.value))}
        >
          {initialSchedules.map((s, i) => (
            <option key={s.id} value={i}>
              {s.class.name} — {s.startTime}
            </option>
          ))}
        </select>
      </div>

      {/* --- THE MASTER LEDGER (High Density Table) --- */}
      <div className="institutional-card glass-surface overflow-hidden mx-2">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-slate-50/50 dark:bg-slate-900/50 border-b dark:border-slate-800">
                <th className="p-6 text-[10px] font-black uppercase tracking-widest text-slate-400">
                  Identity Registry
                </th>
                <th className="p-6 text-[10px] font-black uppercase tracking-widest text-slate-400">
                  Node Status
                </th>
                <th className="p-6 text-[10px] font-black uppercase tracking-widest text-slate-400">
                  Checkout
                </th>
                <th className="p-6 text-[10px] font-black uppercase tracking-widest text-slate-400">
                  Timestamp
                </th>
              </tr>
            </thead>
            <tbody className="divide-y dark:divide-slate-800">
              <AnimatePresence mode="popLayout">
                {filteredData.map((e: any) => {
                  const att = schedule.attendances.find(
                    (a: any) => a.studentId === e.student.id,
                  );
                  return (
                    <motion.tr
                      key={e.student.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="group hover:bg-slate-50/30 dark:hover:bg-slate-900/30 transition-all"
                    >
                      <td className="p-6">
                        <div className="flex items-center gap-4">
                          <Avatar className="h-10 w-10 border-2 border-white shadow-sm">
                            <AvatarImage src={e.student.user.image} />
                            <AvatarFallback>
                              {e.student.user.name[0]}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-black text-slate-900 dark:text-white">
                              {e.student.user.name}
                            </p>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                              {e.student.studentId}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="p-6">
                        <div className="flex items-center p-1 bg-slate-100 dark:bg-slate-800 rounded-xl w-fit">
                          <StatusBtn
                            active={att?.status === "PRESENT"}
                            color="emerald"
                            icon={Check}
                            onClick={() =>
                              handleUpdate(e.student.id, "PRESENT")
                            }
                          />
                          <StatusBtn
                            active={att?.status === "ABSENT"}
                            color="rose"
                            icon={X}
                            onClick={() => handleUpdate(e.student.id, "ABSENT")}
                          />
                          <StatusBtn
                            active={att?.status === "LATE"}
                            color="amber"
                            icon={Clock}
                            onClick={() => handleUpdate(e.student.id, "LATE")}
                          />
                          <StatusBtn
                            active={att?.status === "EXCUSED"}
                            color="indigo"
                            icon={Coffee}
                            onClick={() =>
                              handleUpdate(e.student.id, "EXCUSED")
                            }
                          />
                        </div>
                      </td>

                      <td className="p-6">
                        {att?.status === "PRESENT" && !att.departureTime ? (
                          <Button
                            onClick={() => logDeparture(att.id)}
                            variant="ghost"
                            className="rounded-xl h-10 px-4 text-[9px] font-black uppercase gap-2 hover:bg-rose-500 hover:text-white transition-all"
                          >
                            Release Node
                          </Button>
                        ) : att?.departureTime ? (
                          <Badge className="bg-emerald-500/10 text-emerald-500 border-0 text-[9px]">
                            Released
                          </Badge>
                        ) : (
                          <span className="text-[9px] font-bold text-slate-300">
                            Pending
                          </span>
                        )}
                      </td>

                      <td className="p-6">
                        {att?.markedAt ? (
                          <div className="flex flex-col">
                            <span className="text-[10px] font-black">
                              {format(new Date(att.markedAt), "HH:mm")}
                            </span>
                            <span className="text-[8px] font-bold text-slate-400 uppercase">
                              Synced
                            </span>
                          </div>
                        ) : (
                          <span className="text-[10px] font-black text-slate-200">
                            --:--
                          </span>
                        )}
                      </td>
                    </motion.tr>
                  );
                })}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function StatusBtn({ active, icon: Icon, color, onClick }: any) {
  const themes: any = {
    emerald: active
      ? "bg-emerald-500 text-white shadow-lg"
      : "text-emerald-500 hover:bg-emerald-500/10",
    rose: active
      ? "bg-rose-500 text-white shadow-lg"
      : "text-rose-500 hover:bg-rose-500/10",
    amber: active
      ? "bg-amber-500 text-white shadow-lg"
      : "text-amber-500 hover:bg-amber-500/10",
    indigo: active
      ? "bg-indigo-500 text-white shadow-lg"
      : "text-indigo-500 hover:bg-indigo-500/10",
  };
  return (
    <button
      onClick={onClick}
      className={`h-10 w-10 rounded-lg flex items-center justify-center transition-all active:scale-90 ${themes[color]}`}
    >
      <Icon className="h-4 w-4" />
    </button>
  );
}
