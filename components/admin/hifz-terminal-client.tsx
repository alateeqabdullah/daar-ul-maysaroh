"use client";

import { useState, useTransition, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Plus,
  Minus,
  Save,
  Sparkles,
  BookOpen,
  History,
  Star,
  Loader2,
  UserCircle,
} from "lucide-react";
import { logHifzSession } from "@/app/actions/admin/hifz/actions";
import { QURAN_SURAHS } from "@/lib/quran-data"; // Use the 114 Surahs list we made
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

export default function HifzTerminalClient({
  initialStudents,
}: {
  initialStudents: any[];
}) {
  const [isPending, startTransition] = useTransition();
  const [selectedIdx, setSelectedIdx] = useState(0);

  const student = initialStudents[selectedIdx];
  const [form, setForm] = useState({
    surah: 78,
    start: 1,
    end: "",
    mistakes: 0,
    status: "PASS",
    comments: "",
  });

  const handleCommit = () => {
    if (!form.end) return toast.error("Ending Ayah required");

    startTransition(async () => {
      const res = await logHifzSession({
        studentId: student.id,
        surah: form.surah,
        startAyah: form.start,
        endAyah: Number(form.end),
        status: form.status,
        mistakes: form.mistakes,
        comments: form.comments,
      });

      if (res.error) {
        toast.error(res.error);
      } else {
        toast.success("Registry Synced", {
          icon: <Sparkles className="text-gold" />,
        });
        // Smart Auto-Increment for the teacher
        setForm((prev) => ({
          ...prev,
          start: Number(prev.end) + 1,
          end: "",
          mistakes: 0,
          comments: "",
        }));
      }
    });
  };

  return (
    <div className="space-y-10 pb-20 max-w-5xl mx-auto">
      {/* --- 1. HEADER & SELECTOR --- */}
      <div className="space-y-6">
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-4xl font-black tracking-tighter">
              Hifz <span className="text-primary-700">Terminal</span>
            </h1>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
              Live Session Recording
            </p>
          </div>
          <Badge className="bg-primary-700/10 text-primary-700 border-0 uppercase font-black text-[10px]">
            Academic v2.6
          </Badge>
        </div>

        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
          {initialStudents.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setSelectedIdx(i)}
              className={`flex-shrink-0 flex items-center gap-3 p-2 pr-5 rounded-full border-2 transition-all ${
                selectedIdx === i
                  ? "bg-primary-700 border-primary-700 text-white shadow-xl"
                  : "glass-surface border-transparent"
              }`}
            >
              <Avatar className="h-8 w-8 border border-white/20">
                <AvatarImage src={s.user.image} />
                <AvatarFallback>{s.user.name[0]}</AvatarFallback>
              </Avatar>
              <span className="text-[10px] font-black uppercase tracking-widest">
                {s.user.name.split(" ")[0]}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* --- 2. THE COMMAND CONSOLE --- */}
      <div className="grid grid-cols-1 gap-8">
        <div className="institutional-card bg-white dark:bg-slate-900 p-8 md:p-12 space-y-10">
          <div className="flex items-center gap-4 border-b dark:border-slate-800 pb-8">
            <div className="h-14 w-14 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
              <UserCircle className="h-8 w-8 text-primary-700" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">
                Active Focus
              </p>
              <h3 className="text-2xl font-black">{student.user.name}</h3>
            </div>
          </div>

          {/* Input Territory */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase text-slate-400 ml-4">
                Surah Node
              </label>
              <select
                value={form.surah}
                onChange={(e) =>
                  setForm({ ...form, surah: Number(e.target.value) })
                }
                className="h-16 w-full rounded-2xl bg-slate-50 dark:bg-slate-800 border-0 px-6 font-black text-lg focus:ring-2 ring-primary-700/20 outline-none appearance-none"
              >
                {QURAN_SURAHS.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.id}. {s.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase text-slate-400 ml-4">
                Verse Start
              </label>
              <input
                type="number"
                value={form.start}
                onChange={(e) =>
                  setForm({ ...form, start: Number(e.target.value) })
                }
                className="h-16 w-full rounded-2xl bg-slate-50 dark:bg-slate-800 border-0 px-6 font-black text-2xl focus:ring-2 ring-primary-700/20 outline-none"
              />
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase text-slate-400 ml-4">
                Verse End
              </label>
              <input
                type="number"
                value={form.end}
                placeholder="..."
                onChange={(e) => setForm({ ...form, end: e.target.value })}
                className="h-16 w-full rounded-2xl bg-slate-50 dark:bg-slate-800 border-0 px-6 font-black text-2xl focus:ring-2 ring-primary-700/20 outline-none"
              />
            </div>
          </div>

          {/* Mistake Dashboard */}
          <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
            <div className="text-center md:text-left">
              <p className="text-[10px] font-black uppercase text-indigo-400 tracking-widest leading-none mb-1">
                Mistake Engine
              </p>
              <p className="text-sm font-bold text-slate-400">
                Live tactile recording
              </p>
            </div>
            <div className="flex items-center gap-8">
              <button
                onClick={() =>
                  setForm({ ...form, mistakes: Math.max(0, form.mistakes - 1) })
                }
                className="h-14 w-14 rounded-2xl bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all"
              >
                <Minus />
              </button>
              <span
                className={`text-7xl font-black tracking-tighter ${form.mistakes > 2 ? "text-rose-500" : "text-white"}`}
              >
                {form.mistakes}
              </span>
              <button
                onClick={() =>
                  setForm({ ...form, mistakes: form.mistakes + 1 })
                }
                className="h-14 w-14 rounded-2xl bg-primary-700 shadow-lg shadow-primary-700/40 flex items-center justify-center hover:scale-105 transition-all"
              >
                <Plus />
              </button>
            </div>
          </div>

          {/* Status Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {["EXCELLENT", "PASS", "NEEDS_PRACTICE", "FAIL"].map((s) => (
              <button
                key={s}
                onClick={() => setForm({ ...form, status: s })}
                className={`h-14 rounded-2xl text-[9px] font-black uppercase tracking-widest transition-all ${
                  form.status === s
                    ? "bg-primary-700 text-white shadow-xl scale-105"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-400"
                }`}
              >
                {s.replace("_", " ")}
              </button>
            ))}
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase text-slate-400 ml-4">
              Teacher's Commentary
            </label>
            <textarea
              value={form.comments}
              onChange={(e) => setForm({ ...form, comments: e.target.value })}
              placeholder="Tajweed notes or general observations..."
              className="w-full p-6 rounded-[2rem] bg-slate-50 dark:bg-slate-800 border-0 outline-none focus:ring-2 ring-primary-700/20 min-h-[120px] font-bold"
            />
          </div>

          <Button
            disabled={isPending}
            onClick={handleCommit}
            className="w-full h-24 rounded-[3rem] bg-primary-700 hover:bg-primary-800 text-white font-black text-2xl shadow-royal transition-all hover:scale-[1.01] active:scale-95 group"
          >
            {isPending ? (
              <Loader2 className="animate-spin h-8 w-8" />
            ) : (
              <span className="flex items-center gap-4">
                <Save className="h-7 w-7" /> COMMIT SESSION
              </span>
            )}
          </Button>
        </div>

        {/* --- 3. RECENT HISTORY TABLE --- */}
        <div className="institutional-card glass-surface p-8 space-y-6">
          <div className="flex items-center gap-3">
            <History className="h-5 w-5 text-primary-700" />
            <h4 className="text-sm font-black uppercase tracking-widest">
              Recent Node Activity
            </h4>
          </div>

          <div className="space-y-3">
            {student.hifzLogs?.slice(0, 5).map((log: any) => (
              <div
                key={log.id}
                className="p-5 bg-white/50 dark:bg-slate-900/50 rounded-2xl border border-white/10 flex justify-between items-center group hover:border-primary-700/30 transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-xl bg-primary-700/10 text-primary-700 flex items-center justify-center font-black text-xs">
                    {log.surah}
                  </div>
                  <div>
                    <p className="text-sm font-black leading-none">
                      Ayahs {log.startAyah} - {log.endAyah}
                    </p>
                    <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase">
                      {new Date(log.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge className="bg-emerald-500 font-black text-[9px] mb-1">
                    {log.status}
                  </Badge>
                  <p className="text-[9px] font-bold text-rose-500 uppercase">
                    {log.mistakes} Mistakes
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
