// components/pricing/pricing-calculator-hifz.tsx
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Info,
  Calculator,
  Check,
  TrendingUp,
  Clock,
  Calendar,
  Sparkles,
  ArrowRight,
  DollarSign,
  BookOpen,
  Star,
  Crown,
  Mic,
  Volume2,
  Languages,
  PenTool,
  ScrollText,
  Library,
  Eye,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

// Hifz-specific pricing configuration
const HIFZ_PRICING_CONFIG = {
  subjects: [
    {
      id: "hifz",
      name: "Hifz Program",
      baseFactor: 0.3,
      icon: Crown,
      description: "Complete memorization with Sanad certification",
    },
  ],
  durations: [30, 45, 60, 90],
  frequencies: [1, 2, 3, 4, 5],
  basePricePerMinute: 0.32, // Slightly higher for Hifz
};

export function PricingCalculatorHifz({ dbPlans }: { dbPlans?: any[] }) {
  const [selection, setSelection] = useState({
    subject: "hifz",
    duration: 45,
    frequency: 2,
  });
  const [totalPrice, setTotalPrice] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const subject = HIFZ_PRICING_CONFIG.subjects.find(
      (s) => s.id === selection.subject,
    );
    const monthlySessions = selection.frequency * 4;
    const pricePerSession =
      selection.duration * HIFZ_PRICING_CONFIG.basePricePerMinute;
    const rawPrice =
      pricePerSession * monthlySessions * (subject?.baseFactor || 1);
    setTotalPrice(Math.round(rawPrice));
  }, [selection]);

  const currentSubject = HIFZ_PRICING_CONFIG.subjects.find(
    (s) => s.id === selection.subject,
  );
  const monthlySessions = selection.frequency * 4;
  const pricePerLesson = totalPrice / monthlySessions;

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="institutional-card overflow-hidden bg-gradient-to-br from-background to-muted/5 shadow-2xl">
        <div className="grid lg:grid-cols-5">
          {/* Settings Panel */}
          <div className="lg:col-span-3 p-6 sm:p-8 md:p-10 space-y-8 border-r border-border/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-700/10 flex items-center justify-center">
                  <Calculator className="w-5 h-5 text-purple-700" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-black uppercase tracking-tighter">
                    Hifz Tuition Calculator
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Customize your memorization journey
                  </p>
                </div>
              </div>
              <Sparkles className="w-5 h-5 text-purple-700/50" />
            </div>

            {/* Subject Selection - Fixed for Hifz */}
            <div className="space-y-4">
              <label className="text-[11px] font-black uppercase tracking-widest text-purple-700">
                Select Discipline
              </label>
              <div className="grid grid-cols-1 gap-3">
                {HIFZ_PRICING_CONFIG.subjects.map((s) => (
                  <button
                    key={s.id}
                    className="group relative p-4 rounded-xl border-2 border-purple-700 bg-purple-700/5 shadow-md cursor-default"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-purple-700 text-white flex items-center justify-center">
                        <s.icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1">
                        <p className="font-black text-sm uppercase tracking-tight text-purple-700">
                          {s.name}
                        </p>
                        <p className="text-[10px] text-muted-foreground mt-0.5">
                          {s.description}
                        </p>
                      </div>
                      <Check className="w-4 h-4 text-purple-700" />
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Duration Selection */}
            <div className="space-y-4">
              <label className="text-[11px] font-black uppercase tracking-widest text-purple-700 flex items-center gap-2">
                <Clock className="w-3 h-3" /> Session Duration
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {HIFZ_PRICING_CONFIG.durations.map((d) => (
                  <button
                    key={d}
                    onClick={() => setSelection({ ...selection, duration: d })}
                    className={cn(
                      "py-3 px-4 rounded-xl border-2 text-sm font-black transition-all duration-300",
                      selection.duration === d
                        ? "border-purple-700 bg-purple-700 text-white shadow-md"
                        : "border-border hover:border-purple-700/30 hover:bg-purple-50/50",
                    )}
                  >
                    {d} min
                  </button>
                ))}
              </div>
            </div>

            {/* Frequency Selection */}
            <div className="space-y-4">
              <label className="text-[11px] font-black uppercase tracking-widest text-purple-700 flex items-center gap-2">
                <Calendar className="w-3 h-3" /> Sessions per Week
              </label>
              <div className="grid grid-cols-5 gap-2 sm:gap-3">
                {HIFZ_PRICING_CONFIG.frequencies.map((f) => (
                  <button
                    key={f}
                    onClick={() => setSelection({ ...selection, frequency: f })}
                    className={cn(
                      "py-3 rounded-xl border-2 text-sm font-black transition-all duration-300",
                      selection.frequency === f
                        ? "border-purple-700 bg-purple-700 text-white shadow-md"
                        : "border-border hover:border-purple-700/30 hover:bg-purple-50/50",
                    )}
                  >
                    {f}x
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-border/50">
              <p className="text-[10px] text-muted-foreground flex items-center gap-2">
                <Info className="w-3 h-3" />
                Based on {selection.frequency}x weekly • {monthlySessions}{" "}
                sessions/month
              </p>
            </div>
          </div>

          {/* Summary Panel */}
          <div className="lg:col-span-2 p-6 sm:p-8 md:p-10 bg-gradient-to-br from-purple-700/5 to-indigo-800/5 flex flex-col justify-between">
            <div className="space-y-8">
              <div className="text-center space-y-3">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-purple-700">
                  Estimated Monthly Tuition
                </p>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={totalPrice}
                    initial={{ scale: 0.9, opacity: 0, y: 10 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: -10 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="relative"
                  >
                    <div className="text-6xl sm:text-7xl md:text-8xl font-black tracking-tighter">
                      ${totalPrice}
                    </div>
                    <div className="absolute -top-2 -right-2 sm:-right-4">
                      <DollarSign className="w-5 h-5 text-purple-700/30" />
                    </div>
                  </motion.div>
                </AnimatePresence>
                <p className="text-xs text-muted-foreground">
                  per month • flexible billing
                </p>
              </div>

              <div className="space-y-4 bg-background/50 p-5 sm:p-6 rounded-2xl border border-border/50 shadow-sm">
                <div className="flex justify-between items-center py-2 border-b border-border/30">
                  <span className="text-xs font-black uppercase tracking-wider text-muted-foreground">
                    Monthly Sessions
                  </span>
                  <span className="text-lg font-black">
                    {monthlySessions} lessons
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-border/30">
                  <span className="text-xs font-black uppercase tracking-wider text-muted-foreground">
                    Per Lesson Rate
                  </span>
                  <span className="text-lg font-black">
                    ${pricePerLesson.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-xs font-black uppercase tracking-wider text-muted-foreground">
                    Per Minute Rate
                  </span>
                  <span className="text-lg font-black">
                    ${HIFZ_PRICING_CONFIG.basePricePerMinute.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-purple-700/5 border border-purple-700/10">
                <div className="flex items-center gap-2 mb-2">
                  <Crown className="w-3 h-3 text-purple-700" />
                  <span className="text-[10px] font-black uppercase tracking-wider text-purple-700">
                    Your Selection
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-muted-foreground text-xs">
                      Program:
                    </span>
                    <p className="font-black">{currentSubject?.name}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground text-xs">
                      Duration:
                    </span>
                    <p className="font-black">{selection.duration} min</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground text-xs">
                      Weekly:
                    </span>
                    <p className="font-black">
                      {selection.frequency}x sessions
                    </p>
                  </div>
                  <div>
                    <span className="text-muted-foreground text-xs">
                      Total monthly:
                    </span>
                    <p className="font-black">{monthlySessions} sessions</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 space-y-3">
              <Link href="/admissions" className="block">
                <Button
                  className="w-full h-14 sm:h-16 rounded-xl font-black text-sm tracking-widest uppercase shadow-xl group relative overflow-hidden bg-purple-700 hover:bg-purple-800"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Proceed to Admission
                    <ArrowRight
                      className={cn(
                        "w-4 h-4 transition-all duration-300",
                        isHovered ? "translate-x-1" : "",
                      )}
                    />
                  </span>
                  <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                </Button>
              </Link>
              <p className="text-[10px] text-center text-muted-foreground flex items-center justify-center gap-1">
                <Info className="w-3 h-3" />
                Final price may vary based on scholar assignment
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}








// Tajweed-specific pricing configuration
const TAJWEED_PRICING_CONFIG = {
  subjects: [
    {
      id: "tajweed",
      name: "Tajweed Mastery",
      baseFactor: 0.27,
      icon: Mic,
      description: "Scientific phonetics and pronunciation rules",
    },
  ],
  durations: [30, 45, 60],
  frequencies: [1, 2, 3, 4],
  basePricePerMinute: 0.25,
};

export function PricingCalculatorTajweed({ dbPlans }: { dbPlans?: any[] }) {
  const [selection, setSelection] = useState({
    subject: "tajweed",
    duration: 45,
    frequency: 2,
  });
  const [totalPrice, setTotalPrice] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const subject = TAJWEED_PRICING_CONFIG.subjects.find(
      (s) => s.id === selection.subject
    );
    const monthlySessions = selection.frequency * 4;
    const pricePerSession =
      selection.duration * TAJWEED_PRICING_CONFIG.basePricePerMinute;
    const rawPrice =
      pricePerSession * monthlySessions * (subject?.baseFactor || 1);
    setTotalPrice(Math.round(rawPrice));
  }, [selection]);

  const currentSubject = TAJWEED_PRICING_CONFIG.subjects.find(
    (s) => s.id === selection.subject
  );
  const monthlySessions = selection.frequency * 4;
  const pricePerLesson = totalPrice / monthlySessions;

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="institutional-card overflow-hidden bg-gradient-to-br from-background to-muted/5 shadow-2xl">
        <div className="grid lg:grid-cols-5">
          <div className="lg:col-span-3 p-6 sm:p-8 md:p-10 space-y-8 border-r border-border/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-700/10 flex items-center justify-center">
                  <Calculator className="w-5 h-5 text-blue-700" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-black uppercase tracking-tighter">
                    Tajweed Tuition Calculator
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Customize your learning journey
                  </p>
                </div>
              </div>
              <Sparkles className="w-5 h-5 text-blue-700/50" />
            </div>

            {/* Subject Selection - Fixed for Tajweed */}
            <div className="space-y-4">
              <label className="text-[11px] font-black uppercase tracking-widest text-blue-700">
                Select Discipline
              </label>
              <div className="grid grid-cols-1 gap-3">
                {TAJWEED_PRICING_CONFIG.subjects.map((s) => (
                  <button
                    key={s.id}
                    className="group relative p-4 rounded-xl border-2 border-blue-700 bg-blue-700/5 shadow-md cursor-default"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-700 text-white flex items-center justify-center">
                        <s.icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1">
                        <p className="font-black text-sm uppercase tracking-tight text-blue-700">
                          {s.name}
                        </p>
                        <p className="text-[10px] text-muted-foreground mt-0.5">
                          {s.description}
                        </p>
                      </div>
                      <Check className="w-4 h-4 text-blue-700" />
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Duration Selection */}
            <div className="space-y-4">
              <label className="text-[11px] font-black uppercase tracking-widest text-blue-700 flex items-center gap-2">
                <Clock className="w-3 h-3" /> Session Duration
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {TAJWEED_PRICING_CONFIG.durations.map((d) => (
                  <button
                    key={d}
                    onClick={() => setSelection({ ...selection, duration: d })}
                    className={cn(
                      "py-3 px-4 rounded-xl border-2 text-sm font-black transition-all duration-300",
                      selection.duration === d
                        ? "border-blue-700 bg-blue-700 text-white shadow-md"
                        : "border-border hover:border-blue-700/30 hover:bg-blue-50/50"
                    )}
                  >
                    {d} min
                  </button>
                ))}
              </div>
            </div>

            {/* Frequency Selection */}
            <div className="space-y-4">
              <label className="text-[11px] font-black uppercase tracking-widest text-blue-700 flex items-center gap-2">
                <Calendar className="w-3 h-3" /> Sessions per Week
              </label>
              <div className="grid grid-cols-4 gap-2 sm:gap-3">
                {TAJWEED_PRICING_CONFIG.frequencies.map((f) => (
                  <button
                    key={f}
                    onClick={() => setSelection({ ...selection, frequency: f })}
                    className={cn(
                      "py-3 rounded-xl border-2 text-sm font-black transition-all duration-300",
                      selection.frequency === f
                        ? "border-blue-700 bg-blue-700 text-white shadow-md"
                        : "border-border hover:border-blue-700/30 hover:bg-blue-50/50"
                    )}
                  >
                    {f}x
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-border/50">
              <p className="text-[10px] text-muted-foreground flex items-center gap-2">
                <Info className="w-3 h-3" />
                Based on {selection.frequency}x weekly • {monthlySessions} sessions/month
              </p>
            </div>
          </div>

          {/* Summary Panel */}
          <div className="lg:col-span-2 p-6 sm:p-8 md:p-10 bg-gradient-to-br from-blue-700/5 to-cyan-700/5 flex flex-col justify-between">
            <div className="space-y-8">
              <div className="text-center space-y-3">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-700">
                  Estimated Monthly Tuition
                </p>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={totalPrice}
                    initial={{ scale: 0.9, opacity: 0, y: 10 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: -10 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="relative"
                  >
                    <div className="text-6xl sm:text-7xl md:text-8xl font-black tracking-tighter">
                      ${totalPrice}
                    </div>
                    <div className="absolute -top-2 -right-2 sm:-right-4">
                      <DollarSign className="w-5 h-5 text-blue-700/30" />
                    </div>
                  </motion.div>
                </AnimatePresence>
                <p className="text-xs text-muted-foreground">per month • flexible billing</p>
              </div>

              <div className="space-y-4 bg-background/50 p-5 sm:p-6 rounded-2xl border border-border/50 shadow-sm">
                <div className="flex justify-between items-center py-2 border-b border-border/30">
                  <span className="text-xs font-black uppercase tracking-wider text-muted-foreground">
                    Monthly Sessions
                  </span>
                  <span className="text-lg font-black">{monthlySessions} lessons</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-border/30">
                  <span className="text-xs font-black uppercase tracking-wider text-muted-foreground">
                    Per Lesson Rate
                  </span>
                  <span className="text-lg font-black">${pricePerLesson.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-xs font-black uppercase tracking-wider text-muted-foreground">
                    Per Minute Rate
                  </span>
                  <span className="text-lg font-black">
                    ${TAJWEED_PRICING_CONFIG.basePricePerMinute.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-blue-700/5 border border-blue-700/10">
                <div className="flex items-center gap-2 mb-2">
                  <Volume2 className="w-3 h-3 text-blue-700" />
                  <span className="text-[10px] font-black uppercase tracking-wider text-blue-700">
                    Your Selection
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-muted-foreground text-xs">Program:</span>
                    <p className="font-black">{currentSubject?.name}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground text-xs">Duration:</span>
                    <p className="font-black">{selection.duration} min</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground text-xs">Weekly:</span>
                    <p className="font-black">{selection.frequency}x sessions</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground text-xs">Total monthly:</span>
                    <p className="font-black">{monthlySessions} sessions</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 space-y-3">
              <Link href="/admissions" className="block">
                <Button
                  className="w-full h-14 sm:h-16 rounded-xl font-black text-sm tracking-widest uppercase shadow-xl group relative overflow-hidden bg-blue-700 hover:bg-blue-800"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Proceed to Admission
                    <ArrowRight className={cn("w-4 h-4 transition-all duration-300", isHovered ? "translate-x-1" : "")} />
                  </span>
                  <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                </Button>
              </Link>
              <p className="text-[10px] text-center text-muted-foreground flex items-center justify-center gap-1">
                <Info className="w-3 h-3" />
                Final price may vary based on scholar assignment
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}













// Arabic-specific pricing configuration
const ARABIC_PRICING_CONFIG = {
  subjects: [
    {
      id: "arabic",
      name: "Classical Arabic",
      baseFactor: 0.27,
      icon: Languages,
      description: "Quranic language and grammar foundations",
    },
  ],
  durations: [45, 60, 75, 90],
  frequencies: [1, 2, 3, 4],
  basePricePerMinute: 0.23,
};

export function PricingCalculatorArabic({ dbPlans }: { dbPlans?: any[] }) {
  const [selection, setSelection] = useState({
    subject: "arabic",
    duration: 60,
    frequency: 2,
  });
  const [totalPrice, setTotalPrice] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const subject = ARABIC_PRICING_CONFIG.subjects.find(
      (s) => s.id === selection.subject
    );
    const monthlySessions = selection.frequency * 4;
    const pricePerSession =
      selection.duration * ARABIC_PRICING_CONFIG.basePricePerMinute;
    const rawPrice =
      pricePerSession * monthlySessions * (subject?.baseFactor || 1);
    setTotalPrice(Math.round(rawPrice));
  }, [selection]);

  const currentSubject = ARABIC_PRICING_CONFIG.subjects.find(
    (s) => s.id === selection.subject
  );
  const monthlySessions = selection.frequency * 4;
  const pricePerLesson = totalPrice / monthlySessions;

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="institutional-card overflow-hidden bg-gradient-to-br from-background to-muted/5 shadow-2xl">
        <div className="grid lg:grid-cols-5">
          <div className="lg:col-span-3 p-6 sm:p-8 md:p-10 space-y-8 border-r border-border/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-700/10 flex items-center justify-center">
                  <Calculator className="w-5 h-5 text-amber-700" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-black uppercase tracking-tighter">
                    Arabic Tuition Calculator
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Customize your learning journey
                  </p>
                </div>
              </div>
              <Sparkles className="w-5 h-5 text-amber-700/50" />
            </div>

            {/* Subject Selection - Fixed for Arabic */}
            <div className="space-y-4">
              <label className="text-[11px] font-black uppercase tracking-widest text-amber-700">
                Select Discipline
              </label>
              <div className="grid grid-cols-1 gap-3">
                {ARABIC_PRICING_CONFIG.subjects.map((s) => (
                  <button
                    key={s.id}
                    className="group relative p-4 rounded-xl border-2 border-amber-700 bg-amber-700/5 shadow-md cursor-default"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-amber-700 text-white flex items-center justify-center">
                        <s.icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1">
                        <p className="font-black text-sm uppercase tracking-tight text-amber-700">
                          {s.name}
                        </p>
                        <p className="text-[10px] text-muted-foreground mt-0.5">
                          {s.description}
                        </p>
                      </div>
                      <Check className="w-4 h-4 text-amber-700" />
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Duration Selection */}
            <div className="space-y-4">
              <label className="text-[11px] font-black uppercase tracking-widest text-amber-700 flex items-center gap-2">
                <Clock className="w-3 h-3" /> Session Duration
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {ARABIC_PRICING_CONFIG.durations.map((d) => (
                  <button
                    key={d}
                    onClick={() => setSelection({ ...selection, duration: d })}
                    className={cn(
                      "py-3 px-4 rounded-xl border-2 text-sm font-black transition-all duration-300",
                      selection.duration === d
                        ? "border-amber-700 bg-amber-700 text-white shadow-md"
                        : "border-border hover:border-amber-700/30 hover:bg-amber-50/50"
                    )}
                  >
                    {d} min
                  </button>
                ))}
              </div>
            </div>

            {/* Frequency Selection */}
            <div className="space-y-4">
              <label className="text-[11px] font-black uppercase tracking-widest text-amber-700 flex items-center gap-2">
                <Calendar className="w-3 h-3" /> Sessions per Week
              </label>
              <div className="grid grid-cols-4 gap-2 sm:gap-3">
                {ARABIC_PRICING_CONFIG.frequencies.map((f) => (
                  <button
                    key={f}
                    onClick={() => setSelection({ ...selection, frequency: f })}
                    className={cn(
                      "py-3 rounded-xl border-2 text-sm font-black transition-all duration-300",
                      selection.frequency === f
                        ? "border-amber-700 bg-amber-700 text-white shadow-md"
                        : "border-border hover:border-amber-700/30 hover:bg-amber-50/50"
                    )}
                  >
                    {f}x
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-border/50">
              <p className="text-[10px] text-muted-foreground flex items-center gap-2">
                <Info className="w-3 h-3" />
                Based on {selection.frequency}x weekly • {monthlySessions} sessions/month
              </p>
            </div>
          </div>

          {/* Summary Panel */}
          <div className="lg:col-span-2 p-6 sm:p-8 md:p-10 bg-gradient-to-br from-amber-700/5 to-orange-700/5 flex flex-col justify-between">
            <div className="space-y-8">
              <div className="text-center space-y-3">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-amber-700">
                  Estimated Monthly Tuition
                </p>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={totalPrice}
                    initial={{ scale: 0.9, opacity: 0, y: 10 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: -10 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="relative"
                  >
                    <div className="text-6xl sm:text-7xl md:text-8xl font-black tracking-tighter">
                      ${totalPrice}
                    </div>
                    <div className="absolute -top-2 -right-2 sm:-right-4">
                      <DollarSign className="w-5 h-5 text-amber-700/30" />
                    </div>
                  </motion.div>
                </AnimatePresence>
                <p className="text-xs text-muted-foreground">per month • flexible billing</p>
              </div>

              <div className="space-y-4 bg-background/50 p-5 sm:p-6 rounded-2xl border border-border/50 shadow-sm">
                <div className="flex justify-between items-center py-2 border-b border-border/30">
                  <span className="text-xs font-black uppercase tracking-wider text-muted-foreground">
                    Monthly Sessions
                  </span>
                  <span className="text-lg font-black">{monthlySessions} lessons</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-border/30">
                  <span className="text-xs font-black uppercase tracking-wider text-muted-foreground">
                    Per Lesson Rate
                  </span>
                  <span className="text-lg font-black">${pricePerLesson.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-xs font-black uppercase tracking-wider text-muted-foreground">
                    Per Minute Rate
                  </span>
                  <span className="text-lg font-black">
                    ${ARABIC_PRICING_CONFIG.basePricePerMinute.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-amber-700/5 border border-amber-700/10">
                <div className="flex items-center gap-2 mb-2">
                  <PenTool className="w-3 h-3 text-amber-700" />
                  <span className="text-[10px] font-black uppercase tracking-wider text-amber-700">
                    Your Selection
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-muted-foreground text-xs">Program:</span>
                    <p className="font-black">{currentSubject?.name}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground text-xs">Duration:</span>
                    <p className="font-black">{selection.duration} min</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground text-xs">Weekly:</span>
                    <p className="font-black">{selection.frequency}x sessions</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground text-xs">Total monthly:</span>
                    <p className="font-black">{monthlySessions} sessions</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 space-y-3">
              <Link href="/register" className="block">
                <Button
                  className="w-full h-14 sm:h-16 rounded-xl font-black text-sm tracking-widest uppercase shadow-xl group relative overflow-hidden bg-amber-700 hover:bg-amber-800"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Proceed to Admission
                    <ArrowRight className={cn("w-4 h-4 transition-all duration-300", isHovered ? "translate-x-1" : "")} />
                  </span>
                  <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                </Button>
              </Link>
              <p className="text-[10px] text-center text-muted-foreground flex items-center justify-center gap-1">
                <Info className="w-3 h-3" />
                Final price may vary based on scholar assignment
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}








// Tafsir-specific pricing configuration
const TAFSIR_PRICING_CONFIG = {
  subjects: [
    {
      id: "tafsir",
      name: "Tafsir Studies",
      baseFactor: 0.3,
      icon: ScrollText,
      description: "Deep Quranic understanding and exegesis",
    },
  ],
  durations: [45, 60, 75, 90],
  frequencies: [1, 2, 3],
  basePricePerMinute: 0.28,
};

export function PricingCalculatorTafsir({ dbPlans }: { dbPlans?: any[] }) {
  const [selection, setSelection] = useState({
    subject: "tafsir",
    duration: 60,
    frequency: 2,
  });
  const [totalPrice, setTotalPrice] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const subject = TAFSIR_PRICING_CONFIG.subjects.find(
      (s) => s.id === selection.subject
    );
    const monthlySessions = selection.frequency * 4;
    const pricePerSession =
      selection.duration * TAFSIR_PRICING_CONFIG.basePricePerMinute;
    const rawPrice =
      pricePerSession * monthlySessions * (subject?.baseFactor || 1);
    setTotalPrice(Math.round(rawPrice));
  }, [selection]);

  const currentSubject = TAFSIR_PRICING_CONFIG.subjects.find(
    (s) => s.id === selection.subject
  );
  const monthlySessions = selection.frequency * 4;
  const pricePerLesson = totalPrice / monthlySessions;

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="institutional-card overflow-hidden bg-gradient-to-br from-background to-muted/5 shadow-2xl">
        <div className="grid lg:grid-cols-5">
          <div className="lg:col-span-3 p-6 sm:p-8 md:p-10 space-y-8 border-r border-border/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-700/10 flex items-center justify-center">
                  <Calculator className="w-5 h-5 text-slate-700" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-black uppercase tracking-tighter">
                    Tafsir Tuition Calculator
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Customize your learning journey
                  </p>
                </div>
              </div>
              <Sparkles className="w-5 h-5 text-slate-700/50" />
            </div>

            {/* Subject Selection - Fixed for Tafsir */}
            <div className="space-y-4">
              <label className="text-[11px] font-black uppercase tracking-widest text-slate-700">
                Select Discipline
              </label>
              <div className="grid grid-cols-1 gap-3">
                {TAFSIR_PRICING_CONFIG.subjects.map((s) => (
                  <button
                    key={s.id}
                    className="group relative p-4 rounded-xl border-2 border-slate-700 bg-slate-700/5 shadow-md cursor-default"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-slate-700 text-white flex items-center justify-center">
                        <s.icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1">
                        <p className="font-black text-sm uppercase tracking-tight text-slate-700">
                          {s.name}
                        </p>
                        <p className="text-[10px] text-muted-foreground mt-0.5">
                          {s.description}
                        </p>
                      </div>
                      <Check className="w-4 h-4 text-slate-700" />
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Duration Selection */}
            <div className="space-y-4">
              <label className="text-[11px] font-black uppercase tracking-widest text-slate-700 flex items-center gap-2">
                <Clock className="w-3 h-3" /> Session Duration
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {TAFSIR_PRICING_CONFIG.durations.map((d) => (
                  <button
                    key={d}
                    onClick={() => setSelection({ ...selection, duration: d })}
                    className={cn(
                      "py-3 px-4 rounded-xl border-2 text-sm font-black transition-all duration-300",
                      selection.duration === d
                        ? "border-slate-700 bg-slate-700 text-white shadow-md"
                        : "border-border hover:border-slate-700/30 hover:bg-slate-50/50"
                    )}
                  >
                    {d} min
                  </button>
                ))}
              </div>
            </div>

            {/* Frequency Selection */}
            <div className="space-y-4">
              <label className="text-[11px] font-black uppercase tracking-widest text-slate-700 flex items-center gap-2">
                <Calendar className="w-3 h-3" /> Sessions per Week
              </label>
              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                {TAFSIR_PRICING_CONFIG.frequencies.map((f) => (
                  <button
                    key={f}
                    onClick={() => setSelection({ ...selection, frequency: f })}
                    className={cn(
                      "py-3 rounded-xl border-2 text-sm font-black transition-all duration-300",
                      selection.frequency === f
                        ? "border-slate-700 bg-slate-700 text-white shadow-md"
                        : "border-border hover:border-slate-700/30 hover:bg-slate-50/50"
                    )}
                  >
                    {f}x
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-border/50">
              <p className="text-[10px] text-muted-foreground flex items-center gap-2">
                <Info className="w-3 h-3" />
                Based on {selection.frequency}x weekly • {monthlySessions} sessions/month
              </p>
            </div>
          </div>

          {/* Summary Panel */}
          <div className="lg:col-span-2 p-6 sm:p-8 md:p-10 bg-gradient-to-br from-slate-700/5 to-gray-700/5 flex flex-col justify-between">
            <div className="space-y-8">
              <div className="text-center space-y-3">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-700">
                  Estimated Monthly Tuition
                </p>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={totalPrice}
                    initial={{ scale: 0.9, opacity: 0, y: 10 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: -10 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="relative"
                  >
                    <div className="text-6xl sm:text-7xl md:text-8xl font-black tracking-tighter">
                      ${totalPrice}
                    </div>
                    <div className="absolute -top-2 -right-2 sm:-right-4">
                      <DollarSign className="w-5 h-5 text-slate-700/30" />
                    </div>
                  </motion.div>
                </AnimatePresence>
                <p className="text-xs text-muted-foreground">per month • flexible billing</p>
              </div>

              <div className="space-y-4 bg-background/50 p-5 sm:p-6 rounded-2xl border border-border/50 shadow-sm">
                <div className="flex justify-between items-center py-2 border-b border-border/30">
                  <span className="text-xs font-black uppercase tracking-wider text-muted-foreground">
                    Monthly Sessions
                  </span>
                  <span className="text-lg font-black">{monthlySessions} lessons</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-border/30">
                  <span className="text-xs font-black uppercase tracking-wider text-muted-foreground">
                    Per Lesson Rate
                  </span>
                  <span className="text-lg font-black">${pricePerLesson.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-xs font-black uppercase tracking-wider text-muted-foreground">
                    Per Minute Rate
                  </span>
                  <span className="text-lg font-black">
                    ${TAFSIR_PRICING_CONFIG.basePricePerMinute.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-700/5 border border-slate-700/10">
                <div className="flex items-center gap-2 mb-2">
                  <Library className="w-3 h-3 text-slate-700" />
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-700">
                    Your Selection
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-muted-foreground text-xs">Program:</span>
                    <p className="font-black">{currentSubject?.name}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground text-xs">Duration:</span>
                    <p className="font-black">{selection.duration} min</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground text-xs">Weekly:</span>
                    <p className="font-black">{selection.frequency}x sessions</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground text-xs">Total monthly:</span>
                    <p className="font-black">{monthlySessions} sessions</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 space-y-3">
              <Link href="/register" className="block">
                <Button
                  className="w-full h-14 sm:h-16 rounded-xl font-black text-sm tracking-widest uppercase shadow-xl group relative overflow-hidden bg-slate-700 hover:bg-slate-800"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Proceed to Admission
                    <ArrowRight className={cn("w-4 h-4 transition-all duration-300", isHovered ? "translate-x-1" : "")} />
                  </span>
                  <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                </Button>
              </Link>
              <p className="text-[10px] text-center text-muted-foreground flex items-center justify-center gap-1">
                <Info className="w-3 h-3" />
                Final price may vary based on scholar assignment
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}









// Qiro'ah-specific pricing configuration
const QIROAH_PRICING_CONFIG = {
  subjects: [
    {
      id: "qiroah",
      name: "Qiro'ah (Quran Reading)",
      baseFactor: 0.25,
      icon: BookOpen,
      description: "Learn to read the Quran with confidence",
    },
  ],
  durations: [30, 45, 60],
  frequencies: [1, 2, 3, 4, 5],
  basePricePerMinute: 0.22,
};

export function PricingCalculatorQiroah({ dbPlans }: { dbPlans?: any[] }) {
  const [selection, setSelection] = useState({
    subject: "qiroah",
    duration: 45,
    frequency: 2,
  });
  const [totalPrice, setTotalPrice] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const subject = QIROAH_PRICING_CONFIG.subjects.find(
      (s) => s.id === selection.subject
    );
    const monthlySessions = selection.frequency * 4;
    const pricePerSession =
      selection.duration * QIROAH_PRICING_CONFIG.basePricePerMinute;
    const rawPrice =
      pricePerSession * monthlySessions * (subject?.baseFactor || 1);
    setTotalPrice(Math.round(rawPrice));
  }, [selection]);

  const currentSubject = QIROAH_PRICING_CONFIG.subjects.find(
    (s) => s.id === selection.subject
  );
  const monthlySessions = selection.frequency * 4;
  const pricePerLesson = totalPrice / monthlySessions;

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="institutional-card overflow-hidden bg-gradient-to-br from-background to-muted/5 shadow-2xl">
        <div className="grid lg:grid-cols-5">
          <div className="lg:col-span-3 p-6 sm:p-8 md:p-10 space-y-8 border-r border-border/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-teal-700/10 flex items-center justify-center">
                  <Calculator className="w-5 h-5 text-teal-700" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-black uppercase tracking-tighter">
                    Qiro'ah Tuition Calculator
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Customize your learning journey
                  </p>
                </div>
              </div>
              <Sparkles className="w-5 h-5 text-teal-700/50" />
            </div>

            {/* Subject Selection - Fixed for Qiro'ah */}
            <div className="space-y-4">
              <label className="text-[11px] font-black uppercase tracking-widest text-teal-700">
                Select Discipline
              </label>
              <div className="grid grid-cols-1 gap-3">
                {QIROAH_PRICING_CONFIG.subjects.map((s) => (
                  <button
                    key={s.id}
                    className="group relative p-4 rounded-xl border-2 border-teal-700 bg-teal-700/5 shadow-md cursor-default"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-teal-700 text-white flex items-center justify-center">
                        <s.icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1">
                        <p className="font-black text-sm uppercase tracking-tight text-teal-700">
                          {s.name}
                        </p>
                        <p className="text-[10px] text-muted-foreground mt-0.5">
                          {s.description}
                        </p>
                      </div>
                      <Check className="w-4 h-4 text-teal-700" />
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Duration Selection */}
            <div className="space-y-4">
              <label className="text-[11px] font-black uppercase tracking-widest text-teal-700 flex items-center gap-2">
                <Clock className="w-3 h-3" /> Session Duration
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {QIROAH_PRICING_CONFIG.durations.map((d) => (
                  <button
                    key={d}
                    onClick={() => setSelection({ ...selection, duration: d })}
                    className={cn(
                      "py-3 px-4 rounded-xl border-2 text-sm font-black transition-all duration-300",
                      selection.duration === d
                        ? "border-teal-700 bg-teal-700 text-white shadow-md"
                        : "border-border hover:border-teal-700/30 hover:bg-teal-50/50"
                    )}
                  >
                    {d} min
                  </button>
                ))}
              </div>
            </div>

            {/* Frequency Selection */}
            <div className="space-y-4">
              <label className="text-[11px] font-black uppercase tracking-widest text-teal-700 flex items-center gap-2">
                <Calendar className="w-3 h-3" /> Sessions per Week
              </label>
              <div className="grid grid-cols-5 gap-2 sm:gap-3">
                {QIROAH_PRICING_CONFIG.frequencies.map((f) => (
                  <button
                    key={f}
                    onClick={() => setSelection({ ...selection, frequency: f })}
                    className={cn(
                      "py-3 rounded-xl border-2 text-sm font-black transition-all duration-300",
                      selection.frequency === f
                        ? "border-teal-700 bg-teal-700 text-white shadow-md"
                        : "border-border hover:border-teal-700/30 hover:bg-teal-50/50"
                    )}
                  >
                    {f}x
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-border/50">
              <p className="text-[10px] text-muted-foreground flex items-center gap-2">
                <Info className="w-3 h-3" />
                Based on {selection.frequency}x weekly • {monthlySessions} sessions/month
              </p>
            </div>
          </div>

          {/* Summary Panel */}
          <div className="lg:col-span-2 p-6 sm:p-8 md:p-10 bg-gradient-to-br from-teal-700/5 to-emerald-700/5 flex flex-col justify-between">
            <div className="space-y-8">
              <div className="text-center space-y-3">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-teal-700">
                  Estimated Monthly Tuition
                </p>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={totalPrice}
                    initial={{ scale: 0.9, opacity: 0, y: 10 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: -10 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="relative"
                  >
                    <div className="text-6xl sm:text-7xl md:text-8xl font-black tracking-tighter">
                      ${totalPrice}
                    </div>
                    <div className="absolute -top-2 -right-2 sm:-right-4">
                      <DollarSign className="w-5 h-5 text-teal-700/30" />
                    </div>
                  </motion.div>
                </AnimatePresence>
                <p className="text-xs text-muted-foreground">per month • flexible billing</p>
              </div>

              <div className="space-y-4 bg-background/50 p-5 sm:p-6 rounded-2xl border border-border/50 shadow-sm">
                <div className="flex justify-between items-center py-2 border-b border-border/30">
                  <span className="text-xs font-black uppercase tracking-wider text-muted-foreground">
                    Monthly Sessions
                  </span>
                  <span className="text-lg font-black">{monthlySessions} lessons</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-border/30">
                  <span className="text-xs font-black uppercase tracking-wider text-muted-foreground">
                    Per Lesson Rate
                  </span>
                  <span className="text-lg font-black">${pricePerLesson.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-xs font-black uppercase tracking-wider text-muted-foreground">
                    Per Minute Rate
                  </span>
                  <span className="text-lg font-black">
                    ${QIROAH_PRICING_CONFIG.basePricePerMinute.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-teal-700/5 border border-teal-700/10">
                <div className="flex items-center gap-2 mb-2">
                  <Eye className="w-3 h-3 text-teal-700" />
                  <span className="text-[10px] font-black uppercase tracking-wider text-teal-700">
                    Your Selection
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-muted-foreground text-xs">Program:</span>
                    <p className="font-black">{currentSubject?.name}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground text-xs">Duration:</span>
                    <p className="font-black">{selection.duration} min</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground text-xs">Weekly:</span>
                    <p className="font-black">{selection.frequency}x sessions</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground text-xs">Total monthly:</span>
                    <p className="font-black">{monthlySessions} sessions</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 space-y-3">
              <Link href="/register" className="block">
                <Button
                  className="w-full h-14 sm:h-16 rounded-xl font-black text-sm tracking-widest uppercase shadow-xl group relative overflow-hidden bg-teal-700 hover:bg-teal-800"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Proceed to Admission
                    <ArrowRight className={cn("w-4 h-4 transition-all duration-300", isHovered ? "translate-x-1" : "")} />
                  </span>
                  <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                </Button>
              </Link>
              <p className="text-[10px] text-center text-muted-foreground flex items-center justify-center gap-1">
                <Info className="w-3 h-3" />
                Final price may vary based on teacher assignment
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}