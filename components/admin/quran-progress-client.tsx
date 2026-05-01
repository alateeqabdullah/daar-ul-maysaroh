"use client";

import { toggleSurahMastery } from "@/app/actions/admin/quran/actions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { QURAN_SURAHS, Surah } from "@/lib/quran-data";
import { AnimatePresence, motion } from "framer-motion";
import {
  BookOpen,
  CheckCircle2,
  Loader2,
  Search,
  Sparkles
} from "lucide-react";
import { useMemo, useState, useTransition } from "react";
import { toast } from "sonner";

export default function QuranProgressClient({ initialStudents }: { initialStudents: any[] }) {
  const [isPending, startTransition] = useTransition();
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeJuz, setActiveJuz] = useState<number>(30); // Default to Juz Amma

  const student = initialStudents[selectedIdx];
  const masteredSet = useMemo(() => {
    return new Set(student?.quranProgress?.filter((p: any) => p.status === "MASTERED").map((p: any) => p.surahNumber));
  }, [student]);

  // Group surahs by Juz
  const juzStats = useMemo(() => {
    const stats: Record<number, { total: number; mastered: number }> = {};
    for (let i = 1; i <= 30; i++) stats[i] = { total: 0, mastered: 0 };
    
    QURAN_SURAHS.forEach(s => {
      stats[s.juz].total++;
      if (masteredSet.has(s.id)) stats[s.juz].mastered++;
    });
    return stats;
  }, [masteredSet]);

  const filteredSurahs = useMemo(() => {
    return QURAN_SURAHS.filter(s => {
      const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesJuz = searchQuery ? true : s.juz === activeJuz;
      return matchesSearch && matchesJuz;
    });
  }, [searchQuery, activeJuz]);

  const handleToggle = (surah: Surah) => {
    startTransition(async () => {
      const res = await toggleSurahMastery({
        studentId: student.id,
        surahNumber: surah.id,
        surahName: surah.name
      });
      if (res.error) toast.error(res.error);
    });
  };

  return (
    <div className="space-y-10 pb-20">
      
      {/* --- 1. TITLE & STUDENT SELECTOR --- */}
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-4xl font-black tracking-tighter dark:text-white">
            Quran <span className="text-primary-700">Mastery Hub</span>
          </h1>
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mt-1">Registry node oversight</p>
        </div>

        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
          {initialStudents.map((s, i) => (
            <button
              key={s.id} onClick={() => setSelectedIdx(i)}
              className={`flex-shrink-0 flex items-center gap-3 p-2 pr-5 rounded-full border-2 transition-all ${
                selectedIdx === i ? 'bg-primary-700 border-primary-700 text-white shadow-xl' : 'glass-surface border-transparent'
              }`}
            >
              <Avatar className="h-8 w-8 border border-white/10">
                <AvatarImage src={s.user.image} /><AvatarFallback>{s.user.name[0]}</AvatarFallback>
              </Avatar>
              <span className="text-[10px] font-black uppercase tracking-widest">{s.user.name.split(' ')[0]}</span>
            </button>
          ))}
        </div>
      </div>

      {/* --- 2. THE JUZ HUB (NAVIGATION GRID) --- */}
      <div className="institutional-card glass-surface p-8">
        <div className="flex justify-between items-end mb-6">
           <div>
              <h3 className="text-lg font-black tracking-tight">Juz Navigation</h3>
              <p className="text-[10px] font-bold text-slate-400 uppercase">Select a Juz to view specific Surahs</p>
           </div>
           <div className="text-right">
              <span className="text-3xl font-black text-primary-700">{Math.round((masteredSet.size / 114) * 100)}%</span>
              <p className="text-[8px] font-black uppercase text-slate-400">Total Progress</p>
           </div>
        </div>

        <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-10 gap-2">
          {Array.from({ length: 30 }, (_, i) => i + 1).map(juz => {
            const isFull = juzStats[juz].mastered === juzStats[juz].total && juzStats[juz].total > 0;
            const isStarted = juzStats[juz].mastered > 0;
            
            return (
              <button
                key={juz} onClick={() => { setActiveJuz(juz); setSearchQuery(""); }}
                className={`aspect-square rounded-xl flex flex-col items-center justify-center border-2 transition-all relative ${
                  activeJuz === juz 
                    ? 'border-primary-700 bg-primary-700 text-white shadow-lg scale-105' 
                    : isFull ? 'border-emerald-500 bg-emerald-500/10 text-emerald-600' : 'border-transparent bg-slate-100 dark:bg-slate-900 text-slate-400'
                }`}
              >
                <span className="text-xs font-black">{juz}</span>
                {isStarted && !isFull && <div className="absolute bottom-1.5 h-1 w-1 rounded-full bg-primary-700" />}
                {isFull && <CheckCircle2 className="h-3 w-3 absolute -top-1 -right-1 text-emerald-500 fill-white" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* --- 3. THE SURAH LIST (DYNAMICALY FILTERED) --- */}
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
           <h4 className="text-sm font-black uppercase tracking-[0.2em] text-slate-400">
             {searchQuery ? 'Search Results' : `Surahs in Juz ${activeJuz}`}
           </h4>
           <div className="relative w-full md:w-80 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input 
                placeholder="Deep search Surahs..." value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-12 pl-11 glass-surface rounded-2xl outline-none focus:ring-2 ring-primary-700/20"
              />
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <AnimatePresence mode="popLayout">
            {filteredSurahs.map((surah) => {
              const mastered = masteredSet.has(surah.id);
              return (
                <motion.div
                  key={surah.id} layout
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  onClick={() => handleToggle(surah)}
                  className={`p-5 rounded-[2rem] border-2 cursor-pointer transition-all flex items-center justify-between group ${
                    mastered ? 'bg-emerald-500/5 border-emerald-500/20' : 'glass-surface border-transparent hover:border-primary-100'
                  }`}
                >
                  <div className="flex items-center gap-5">
                    <div className={`h-12 w-12 rounded-2xl flex items-center justify-center font-black text-xs ${
                      mastered ? 'bg-emerald-500 text-white' : 'bg-slate-100 dark:bg-slate-900 text-slate-400'
                    }`}>
                      {surah.id}
                    </div>
                    <div>
                      <h5 className="font-black text-slate-900 dark:text-white leading-none">{surah.name}</h5>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                        {surah.ayahs} Verses • {surah.revelation}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    {isPending && <Loader2 className="h-4 w-4 animate-spin text-primary-700" />}
                    {mastered ? (
                      <CheckCircle2 className="h-6 w-6 text-emerald-500" />
                    ) : (
                      <div className="h-6 w-6 rounded-full border-2 border-slate-200 dark:border-slate-800" />
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {filteredSurahs.length === 0 && (
          <div className="p-20 text-center glass-surface rounded-[3rem] opacity-30">
            <BookOpen className="h-12 w-12 mx-auto mb-4" />
            <p className="font-black uppercase tracking-widest text-xs">No Surah Nodes found in this sector</p>
          </div>
        )}
      </div>

      {/* --- 4. BRAND FOOTER LOGO --- */}
      <div className="pt-20 flex flex-col items-center opacity-20 gap-4">
         <Sparkles className="h-8 w-8 text-gold" />
         <div className="h-px w-24 bg-gradient-to-r from-transparent via-slate-500 to-transparent" />
         <p className="text-[10px] font-black uppercase tracking-[0.5em]">Al-Maysaroh Mastery</p>
      </div>
    </div>
  );
}