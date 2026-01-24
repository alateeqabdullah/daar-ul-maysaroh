"use client";

import { useState, useTransition, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  GraduationCap,
  ShieldCheck,
  Clock,
  Award,
  ArrowRight,
  LayoutGrid,
  UserCheck,
  Search,
  Filter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/shared/section-animation";
import { cn } from "@/lib/utils";
import Link from "next/link";

// ELITE MOCK FACULTY (To supplement Database results)
const MOCK_FACULTY = [
  {
    id: "dean-ahmad",
    name: "Sheikh Dr. Ahmad Al-Maysari",
    rank: "Dean of Faculty",
    credentials: [
      "PhD Quranic Sciences",
      "Ijazah in 10 Qira'at",
      "Authentic Sanad Holder",
    ],
    philosophy: "Memorization is the cultivation of the heart before the mind.",
    availability: "Mon, Wed, Fri",
    department: "Hifz & Qira'at",
    isMock: true,
  },
  {
    id: "head-fatima",
    name: "Ustadha Fatima Zahra",
    rank: "Head of Female Hifz",
    credentials: ["Ijazah in Hafs 'an 'Asim", "Master's in Islamic Pedagogy"],
    philosophy:
      "Nurturing love for the Word through patience and consistent Sunnah.",
    availability: "Tue, Thu, Sat",
    department: "Hifz & Qira'at",
    isMock: true,
  },
  {
    id: "scholar-omar",
    name: "Sheikh Omar Al-Farooq",
    rank: "Senior Tajweed Scholar",
    credentials: ["Expert in Al-Jazariyyah", "Certified in Phonetics"],
    philosophy:
      "Recitation is an art that requires absolute precision and spiritual presence.",
    availability: "Daily",
    department: "Tajweed & Phonetics",
    isMock: true,
  },
];

export function FacultyListClient({ dbTeachers = [] }: { dbTeachers: any[] }) {
  const [activeDept, setActiveDept] = useState("ALL");
  const [isPending, startTransition] = useTransition();

  // Combine DB Teachers with Mocks
  const allFaculty = useMemo(
    () => [...dbTeachers, ...MOCK_FACULTY],
    [dbTeachers],
  );

  // Dynamic Filtering Logic
  const filteredFaculty = useMemo(() => {
    return activeDept === "ALL"
      ? allFaculty
      : allFaculty.filter((t) => t.department === activeDept);
  }, [activeDept, allFaculty]);

  const DEPARTMENTS = [
    "ALL",
    "Hifz & Qira'at",
    "Tajweed & Phonetics",
    "General Studies",
  ];

  return (
    <div className="space-y-16">
      {/* --- ACADEMIC FILTER COMMAND BAR --- */}
      <Reveal delay={0.2}>
        <div className="glass-surface p-2 md:p-3 rounded-2xl border shadow-xl inline-flex flex-wrap items-center gap-2 max-w-full overflow-x-auto hide-scrollbar">
          {DEPARTMENTS.map((dept) => (
            <button
              key={dept}
              onClick={() => startTransition(() => setActiveDept(dept))}
              className={cn(
                "px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all whitespace-nowrap",
                activeDept === dept
                  ? "bg-primary-700 text-white shadow-lg scale-105"
                  : "text-muted-foreground hover:text-primary-700 hover:bg-primary-50",
              )}
            >
              {dept === "ALL" ? "Full Scholarly Council" : dept}
            </button>
          ))}
        </div>
      </Reveal>

      {/* --- FACULTY GRID --- */}
      <div className="grid lg:grid-cols-2 gap-12">
        <AnimatePresence mode="popLayout">
          {filteredFaculty.map((teacher, idx) => (
            <motion.div
              layout
              key={teacher.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
            >
              <div className="institutional-card p-8 lg:p-12 h-full flex flex-col group bg-card hover:border-primary-700/50 transition-all duration-700">
                <div className="flex flex-col md:flex-row gap-10 items-start">
                  {/* Scholar Portrait Container */}
                  <div className="w-full md:w-48 h-64 bg-muted/30 rounded-3xl overflow-hidden relative border-2 border-dashed border-border/50 group-hover:border-primary-700/20 transition-colors">
                    <div className="absolute inset-0 flex items-center justify-center opacity-20 group-hover:scale-110 transition-transform duration-700">
                      <GraduationCap className="w-16 h-16" />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background to-transparent">
                      <div className="flex justify-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-accent animate-ping" />
                        <span className="text-[8px] font-black text-white uppercase tracking-widest">
                          Active Sanad
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Scholar Stats */}
                  <div className="flex-1 space-y-6">
                    <div>
                      <h3 className="text-3xl font-black tracking-tight group-hover:text-primary-700 transition-colors uppercase">
                        {teacher.name}
                      </h3>
                      <p className="text-primary-700 font-black text-[10px] uppercase tracking-[0.2em] mt-1">
                        {teacher.rank}
                      </p>
                    </div>

                    <div className="space-y-4">
                      <p className="text-[9px] font-black uppercase opacity-40 tracking-widest">
                        Scholarly Credentials
                      </p>
                      <ul className="grid grid-cols-1 gap-2.5">
                        {teacher.credentials.slice(0, 3).map((c: string) => (
                          <li
                            key={c}
                            className="flex items-start gap-3 text-sm font-bold text-muted-foreground group-hover:text-foreground transition-colors"
                          >
                            <ShieldCheck className="w-4 h-4 text-accent shrink-0" />
                            {c}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="mt-10 p-8 rounded-3xl bg-primary-50/50 dark:bg-primary-950/20 border-l-4 border-gold italic font-medium text-muted-foreground text-sm leading-relaxed relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-5 rotate-12">
                    <Award className="w-20 h-20" />
                  </div>
                  "{teacher.philosophy}"
                </div>

                <div className="mt-auto pt-8 border-t border-border/50 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest opacity-60">
                      <Clock className="w-4 h-4 text-primary-700" />{" "}
                      {teacher.availability}
                    </div>
                    <div className="w-1 h-1 rounded-full bg-border" />
                    <div className="text-[10px] font-black uppercase tracking-widest text-accent">
                      1-on-1 Path
                    </div>
                  </div>

                  {/* ACTION: Leads to the Dynamic Route we built */}
                  <Link href={`/teachers/${teacher.id}`}>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="font-black text-[10px] tracking-widest uppercase hover:text-primary-700 transition-colors"
                    >
                      Full Sanad Profile <ArrowRight className="ml-2 w-3 h-3" />
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* --- INSTITUTIONAL CALL TO ACTION --- */}
      <Reveal delay={0.4}>
        <div className="mt-32 p-12 lg:p-20 glass-surface rounded-[4rem] border shadow-2xl text-center space-y-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary-700/10 blur-[80px] -z-10" />
          <div className="w-20 h-20 bg-primary-700 rounded-3xl flex items-center justify-center mx-auto shadow-2xl">
            <UserCheck className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-4xl lg:text-6xl font-black uppercase tracking-tighter text-balance">
            Request a Specific <br />{" "}
            <span className="text-primary-700 italic">
              Scholarly Assignment.
            </span>
          </h2>
          <p className="text-xl text-muted-foreground font-medium max-w-xl mx-auto leading-relaxed">
            Our Dean reviews every enrollment to match students with the scholar
            best suited for their recitation style and spiritual goals.
          </p>
          <div className="flex justify-center pt-6">
            <Link href="/admissions/council">
              <Button className="h-16 px-12 rounded-2xl bg-primary-700 text-white font-black text-xs tracking-widest uppercase shadow-2xl group relative overflow-hidden">
                <span className="relative z-10 flex items-center gap-2">
                  Contact Admissions Council <ArrowRight className="w-4 h-4" />
                </span>
                <div className="absolute inset-0 bg-white/10 -translate-x-full group-hover:animate-shimmer" />
              </Button>
            </Link>
          </div>
        </div>
      </Reveal>
    </div>
  );
}
