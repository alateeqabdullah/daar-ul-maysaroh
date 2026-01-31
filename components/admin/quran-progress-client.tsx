"use client";

import { useState, useTransition, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  Search,
  Award,
  Sparkles,
  ChevronRight,
  Loader2,
  Filter,
  X,
  Plus,
} from "lucide-react";
import { QURAN_SURAHS, Surah } from "@/lib/quran-data"; // Import the full list
import { toggleSurahMastery } from "@/app/actions/admin/quran/actions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

export default function QuranProgressClient({
  initialStudents,
}: {
  initialStudents: any[];
}) {
  const [isPending, startTransition] = useTransition();
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [juzFilter, setJuzFilter] = useState<number | null>(null);

  const student = initialStudents[selectedIdx];
  const masteredSet = useMemo(() => {
    return new Set(
      student?.quranProgress
        ?.filter((p: any) => p.status === "MASTERED")
        .map((p: any) => p.surahNumber),
    );
  }, [student]);

  // ELITE FILTERING LOGIC
  const filteredSurahs = useMemo(() => {
    return QURAN_SURAHS.filter((s) => {
      const matchesSearch =
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.id.toString() === searchQuery;
      const matchesJuz = juzFilter ? s.juz === juzFilter : true;
      return matchesSearch && matchesJuz;
    });
  }, [searchQuery, juzFilter]);

  const handleToggle = (surah: Surah) => {
    startTransition(async () => {
      const res = await toggleSurahMastery({
        studentId: student.id,
        surahNumber: surah.id,
        surahName: surah.name,
      });
      if (res.error) toast.error(res.error);
      else toast.success(`${surah.name} Registry Updated`);
    });
  };

  return (
    <div className="max-w-5xl mx-auto px-4 md:px-8 space-y-10 pb-32">
      {/* --- HEADER --- */}
      <header className="pt-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="space-y-2">
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-primary-700">
            Mastery Hub
          </p>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter dark:text-white leading-none">
            Quran <span className="text-primary-700">Registry</span>
          </h1>
        </div>

        {/* SEARCH & FILTER BAR */}
        <div className="w-full md:w-80 relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-primary-700 transition-colors" />
          <input
            placeholder="Search by name or number..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-12 pl-11 pr-4 glass-surface rounded-2xl outline-none border-0 focus:ring-2 ring-primary-700/20 text-sm font-bold"
          />
        </div>
      </header>

      {/* --- STUDENT SELECTOR --- */}
      <div className="flex gap-4 overflow-x-auto no-scrollbar py-2 border-b dark:border-white/5 pb-6">
        {initialStudents.map((s, i) => (
          <button
            key={s.id}
            onClick={() => setSelectedIdx(i)}
            className={`flex-shrink-0 p-1 pr-5 rounded-full flex items-center gap-3 transition-all ${
              selectedIdx === i
                ? "bg-primary-700 text-white shadow-royal scale-105"
                : "glass-surface hover:bg-slate-50 dark:hover:bg-slate-900"
            }`}
          >
            <Avatar className="h-9 w-9 border-2 border-white/20">
              <AvatarImage src={s.user.image} />
              <AvatarFallback>{s.user.name[0]}</AvatarFallback>
            </Avatar>
            <span className="text-[11px] font-black uppercase tracking-tighter whitespace-nowrap">
              {s.user.name}
            </span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
        {/* --- STATS BENTO --- */}
        <div className="md:col-span-4 space-y-6">
          <div className="institutional-card bg-primary-700 text-white p-8 space-y-8 relative overflow-hidden group">
            <Award className="absolute -right-6 -bottom-6 h-32 w-32 opacity-10 group-hover:scale-110 transition-transform" />
            <div className="relative z-10">
              <p className="text-[10px] font-black uppercase tracking-widest text-primary-200">
                Completion Status
              </p>
              <h3 className="text-7xl font-black tracking-tighter mt-2 leading-none">
                {Math.round((masteredSet.size / 114) * 100)}%
              </h3>
              <div className="mt-8 flex justify-between text-[11px] font-black text-primary-200 uppercase tracking-widest">
                <span>Progress</span>
                <span>{masteredSet.size} / 114</span>
              </div>
              <div className="w-full h-2 bg-white/10 rounded-full mt-3 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(masteredSet.size / 114) * 100}%` }}
                  className="h-full bg-gold shadow-[0_0_15px_rgba(212,175,55,0.5)]"
                />
              </div>
            </div>
          </div>

          {/* QUICK JUZ FILTERS */}
          <div className="institutional-card glass-surface p-6 space-y-4">
            <div className="flex items-center gap-2">
              <Filter className="h-3 w-3 text-primary-700" />
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                Filter by Juz
              </p>
            </div>
            <div className="grid grid-cols-5 gap-2">
              {[1, 5, 10, 15, 20, 25, 30].map((j) => (
                <button
                  key={j}
                  onClick={() => setJuzFilter(juzFilter === j ? null : j)}
                  className={`h-10 rounded-xl text-[10px] font-black transition-all border ${
                    juzFilter === j
                      ? "bg-primary-700 border-primary-700 text-white"
                      : "bg-slate-50 dark:bg-slate-900 border-transparent text-slate-400"
                  }`}
                >
                  {j}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* --- THE JEWELED LIST (Full 114 Support) --- */}
        <div className="md:col-span-8 space-y-4">
          <div className="flex items-center justify-between px-4 pb-2 border-b dark:border-white/5">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
              Surah Nodes
            </h3>
            <div className="flex items-center gap-4">
              <span className="text-[10px] font-bold text-slate-400 italic">
                Showing {filteredSurahs.length} results
              </span>
              {isPending && (
                <Loader2 className="animate-spin h-4 w-4 text-primary-700" />
              )}
            </div>
          </div>

          <div className="space-y-3">
            <AnimatePresence mode="popLayout">
              {filteredSurahs.map((surah) => {
                const isMastered = masteredSet.has(surah.id);
                return (
                  <motion.div
                    key={surah.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    onClick={() => handleToggle(surah)}
                    className={`p-5 rounded-4xl border-2 cursor-pointer transition-all flex items-center justify-between group ${
                      isMastered
                        ? "bg-primary-700/5 border-primary-700/20"
                        : "glass-surface border-transparent hover:border-slate-100 dark:hover:border-slate-800"
                    }`}
                  >
                    <div className="flex items-center gap-5">
                      <div
                        className={`h-12 w-12 rounded-2xl flex items-center justify-center font-black text-xs transition-all ${
                          isMastered
                            ? "bg-primary-700 text-white shadow-lg"
                            : "bg-slate-100 dark:bg-slate-900 text-slate-400"
                        }`}
                      >
                        {surah.id}
                      </div>
                      <div>
                        <h4 className="text-lg font-black tracking-tight text-slate-900 dark:text-white leading-none mb-1 group-hover:text-primary-700 transition-colors">
                          {surah.name}
                        </h4>
                        <div className="flex items-center gap-3">
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                            Juz {surah.juz} • {surah.ayahs} Verses
                          </p>
                          <Badge
                            className={`text-[8px] font-black border-0 ${surah.revelation === "Meccan" ? "bg-amber-100 text-amber-600" : "bg-blue-100 text-blue-600"}`}
                          >
                            {surah.revelation}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      {isMastered ? (
                        <div className="h-10 w-10 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center shadow-inner">
                          <CheckCircle2 className="h-6 w-6" />
                        </div>
                      ) : (
                        <div className="h-10 w-10 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center border border-slate-100 dark:border-slate-800 group-hover:border-primary-200">
                          <Plus className="h-4 w-4 text-slate-300 group-hover:text-primary-700 transition-colors" />
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>

            {filteredSurahs.length === 0 && (
              <div className="py-20 text-center glass-surface rounded-[2rem] opacity-40">
                <X className="h-12 w-12 mx-auto mb-4" />
                <p className="text-xs font-black uppercase tracking-widest">
                  No matching surah found
                </p>
              </div>
            )}
          </div>

          <div className="p-8 text-center bg-slate-50 dark:bg-slate-900/50 rounded-[2.5rem] border border-dashed border-slate-200 dark:border-slate-800 mt-10">
            <Sparkles className="h-6 w-6 text-gold mx-auto mb-3 animate-pulse" />
            <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest leading-relaxed max-w-[250px] mx-auto">
              Institutional Mastery Terminal: Tap to verify student nodes
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
