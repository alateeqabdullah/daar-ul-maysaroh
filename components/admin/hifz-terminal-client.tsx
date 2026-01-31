"use client";

import { useState, useTransition } from "react";
import { motion } from "framer-motion";
import {
  Plus,
  Minus,
  Loader2,
  Sparkles,
  BookOpen,
} from "lucide-react";
import { logHifzSession } from "@/app/actions/admin/hifz/actions";
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
  const [showHistory, setShowHistory] = useState(false);

  const student = initialStudents[selectedIdx];
  const [form, setForm] = useState({
    surah: "78",
    start: "1",
    end: "",
    mistakes: 0,
    status: "PASS",
  });

  const handleSync = () => {
    startTransition(async () => {
      const res = await logHifzSession({
        studentId: student.id,
        surah: form.surah,
        startAyah: form.start,
        endAyah: form.end,
        status: form.status,
        mistakes: form.mistakes,
      });
      if (res?.error) toast.error("Handshake Failed");
      else {
        toast.success("Progress Synced", {
          icon: <Sparkles className="text-gold" />,
        });
        setForm((prev) => ({
          ...prev,
          start: (Number(prev.end) + 1).toString(),
          end: "",
          mistakes: 0,
        }));
      }
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground pb-24">
      {/* --- 1. TOP SELECTOR (Horizontal Scroll) --- */}
      <div className="sticky top-0 z-30 w-full glass-surface border-b dark:border-white/5 py-4">
        <div className="flex gap-4 overflow-x-auto px-6 no-scrollbar">
          {initialStudents.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setSelectedIdx(i)}
              className={`flex-shrink-0 flex flex-col items-center gap-2 transition-all ${selectedIdx === i ? "scale-110 opacity-100" : "opacity-40 scale-90"}`}
            >
              <Avatar
                className={`h-14 w-14 border-2 ${selectedIdx === i ? "border-primary-700 shadow-royal" : "border-transparent"}`}
              >
                <AvatarImage src={s.user.image} />
                <AvatarFallback>{s.user.name[0]}</AvatarFallback>
              </Avatar>
              <span className="text-[10px] font-black uppercase tracking-tighter">
                {s.user.name.split(" ")[0]}
              </span>
            </button>
          ))}
        </div>
      </div>

      <main className="max-w-xl mx-auto px-6 mt-8 space-y-8">
        {/* --- 2. FOCUS CARD --- */}
        <motion.div
          key={student.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="institutional-card glass-surface p-8 space-y-8 border-primary-700/20"
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[10px] font-black uppercase text-primary-700 tracking-widest mb-1">
                Active Session
              </p>
              <h2 className="text-3xl font-black tracking-tighter leading-none">
                {student.user.name}
              </h2>
            </div>
            <Badge className="bg-gold text-white font-black rounded-full px-4">
              Level {student.currentLevel || "1"}
            </Badge>
          </div>

          {/* Recitation Params */}
          <div className="grid grid-cols-3 gap-4">
            <HUDInput
              label="Surah"
              value={form.surah}
              onChange={(v) => setForm({ ...form, surah: v })}
            />
            <HUDInput
              label="From"
              value={form.start}
              onChange={(v) => setForm({ ...form, start: v })}
            />
            <HUDInput
              label="To"
              value={form.end}
              onChange={(v) => setForm({ ...form, end: v })}
              placeholder="..."
            />
          </div>

          {/* MISTAKE JOYPAD */}
          <div className="bg-slate-900 dark:bg-black rounded-[2.5rem] p-8 text-white text-center space-y-4 shadow-2xl">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-400">
              Mistake Engine
            </p>
            <div className="flex items-center justify-center gap-10">
              <button
                onClick={() =>
                  setForm({ ...form, mistakes: Math.max(0, form.mistakes - 1) })
                }
                className="h-14 w-14 rounded-2xl bg-white/10 flex items-center justify-center active:scale-90 transition-all"
              >
                <Minus className="h-6 w-6" />
              </button>
              <span
                className={`text-8xl font-black tracking-tighter ${form.mistakes > 2 ? "text-rose-500" : "text-white"}`}
              >
                {form.mistakes}
              </span>
              <button
                onClick={() =>
                  setForm({ ...form, mistakes: form.mistakes + 1 })
                }
                className="h-14 w-14 rounded-2xl bg-primary-700 flex items-center justify-center shadow-lg shadow-primary-700/40 active:scale-90 transition-all"
              >
                <Plus className="h-6 w-6" />
              </button>
            </div>
          </div>

          {/* Status Selection */}
          <div className="grid grid-cols-2 gap-2">
            {["EXCELLENT", "PASS", "NEEDS_PRACTICE", "FAIL"].map((s) => (
              <button
                key={s}
                onClick={() => setForm({ ...form, status: s })}
                className={`h-12 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${
                  form.status === s
                    ? "bg-primary-700 text-white shadow-xl"
                    : "bg-secondary text-muted-foreground"
                }`}
              >
                {s.replace("_", " ")}
              </button>
            ))}
          </div>
        </motion.div>

        {/* --- 3. HISTORY TIMELINE --- */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-2">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
              Session Logs
            </h4>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowHistory(!showHistory)}
              className="text-[9px] font-black"
            >
              {showHistory ? "HIDE" : "VIEW ALL"}
            </Button>
          </div>

          <div className="space-y-3">
            {student.hifzLogs.slice(0, showHistory ? 10 : 2).map((log: any) => (
              <div
                key={log.id}
                className="p-5 glass-surface border-0 rounded-3xl flex justify-between items-center shadow-sm"
              >
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-2xl bg-primary-700/10 text-primary-700 flex items-center justify-center">
                    <BookOpen className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-black tracking-tight">
                      Surah {log.surah}
                    </p>
                    <p className="text-[10px] font-bold text-muted-foreground uppercase">
                      Verse {log.startAyah}-{log.endAyah}
                    </p>
                  </div>
                </div>
                <Badge
                  variant="outline"
                  className="border-emerald-500/30 text-emerald-600 text-[9px] font-black"
                >
                  {log.status}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* --- 4. FLOATING ACTION BUTTON --- */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-full px-6 max-w-xl">
        <Button
          disabled={isPending}
          onClick={handleSync}
          className="w-full h-20 rounded-[2.5rem] bg-primary-700 hover:bg-primary-800 text-white font-black text-xl shadow-royal transition-all hover:scale-[1.02] active:scale-95"
        >
          {isPending ? (
            <Loader2 className="animate-spin h-6 w-6" />
          ) : (
            "COMMIT PROGRESS"
          )}
        </Button>
      </div>
    </div>
  );
}

function HUDInput({ label, value, onChange, placeholder }: any) {
  return (
    <div className="space-y-2 text-center">
      <p className="text-[8px] font-black uppercase text-muted-foreground tracking-widest">
        {label}
      </p>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full h-16 rounded-2xl bg-secondary dark:bg-slate-900 border-0 text-2xl font-black text-center focus:ring-2 ring-primary-700/50 outline-none transition-all"
      />
    </div>
  );
}
