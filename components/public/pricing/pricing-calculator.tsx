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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

// ELITE MOCK DATA (Used if Database is empty)
const MOCK_PRICING_CONFIG = {
  subjects: [
    {
      id: "quran",
      name: "Quran Recitation",
      baseFactor: 0.27,
      icon: BookOpen,
      description: "Focus on proper recitation with Tajweed foundations",
    },
    {
      id: "hifz",
      name: "Hifz Program",
      baseFactor: 0.3,
      icon: Star,
      description: "Complete memorization with Sanad certification",
    },
    {
      id: "tajweed",
      name: "Tajweed Mastery",
      baseFactor: 0.27,
      icon: TrendingUp,
      description: "Scientific phonetics and pronunciation rules",
    },
    {
      id: "arabic",
      name: "Classical Arabic",
      baseFactor: 0.27,
      icon: BookOpen,
      description: "Quranic language and grammar foundations",
    },
  ],
  durations: [30, 45, 60, 90],
  frequencies: [1, 2, 3, 4, 5],
  basePricePerMinute: 0.25, // $0.25 per minute
};

export function PricingCalculator({ dbPlans }: { dbPlans?: any[] }) {
  const [selection, setSelection] = useState({
    subject: "quran",
    duration: 45,
    frequency: 2,
  });
  const [totalPrice, setTotalPrice] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Calculate price
  useEffect(() => {
    const subject = MOCK_PRICING_CONFIG.subjects.find(
      (s) => s.id === selection.subject,
    );
    const monthlySessions = selection.frequency * 4;
    const pricePerSession =
      selection.duration * MOCK_PRICING_CONFIG.basePricePerMinute;
    const rawPrice =
      pricePerSession * monthlySessions * (subject?.baseFactor || 1);

    setTotalPrice(Math.round(rawPrice));
  }, [selection]);

  const currentSubject = MOCK_PRICING_CONFIG.subjects.find(
    (s) => s.id === selection.subject,
  );

  const monthlySessions = selection.frequency * 4;
  const pricePerLesson = totalPrice / monthlySessions;

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="institutional-card overflow-hidden bg-linear-to-br from-background to-muted/5 shadow-2xl">
        <div className="grid lg:grid-cols-5">
          {/* SETTINGS PANEL - 3 columns on desktop */}
          <div className="lg:col-span-3 p-6 sm:p-8 md:p-10 space-y-8 border-r border-border/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary-700/10 flex items-center justify-center">
                  <Calculator className="w-5 h-5 text-primary-700" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-black uppercase tracking-tighter">
                    Tuition Calculator
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Customize your learning journey
                  </p>
                </div>
              </div>
              <Sparkles className="w-5 h-5 text-primary-700/50" />
            </div>

            {/* Subject Selection */}
            <div className="space-y-4">
              <label className="text-[11px] font-black uppercase tracking-widest text-primary-700">
                Select Discipline
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {MOCK_PRICING_CONFIG.subjects.map((s) => (
                  <button
                    key={s.id}
                    onClick={() =>
                      setSelection({ ...selection, subject: s.id })
                    }
                    className={cn(
                      "group relative p-4 rounded-xl border-2 text-left transition-all duration-300",
                      selection.subject === s.id
                        ? "border-primary-700 bg-primary-700/5 shadow-md"
                        : "border-border hover:border-primary-700/30 hover:bg-primary-50/50 dark:hover:bg-primary-950/20",
                    )}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={cn(
                          "w-8 h-8 rounded-lg flex items-center justify-center transition-all",
                          selection.subject === s.id
                            ? "bg-primary-700 text-white"
                            : "bg-primary-100 dark:bg-primary-900/30 text-primary-700",
                        )}
                      >
                        <s.icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1">
                        <p
                          className={cn(
                            "font-black text-sm uppercase tracking-tight",
                            selection.subject === s.id
                              ? "text-primary-700"
                              : "",
                          )}
                        >
                          {s.name}
                        </p>
                        <p className="text-[10px] text-muted-foreground mt-0.5 line-clamp-1">
                          {s.description}
                        </p>
                      </div>
                      {selection.subject === s.id && (
                        <Check className="w-4 h-4 text-primary-700" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Duration Selection */}
            <div className="space-y-4">
              <label className="text-[11px] font-black uppercase tracking-widest text-primary-700 flex items-center gap-2">
                <Clock className="w-3 h-3" /> Session Duration
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {MOCK_PRICING_CONFIG.durations.map((d) => (
                  <button
                    key={d}
                    onClick={() => setSelection({ ...selection, duration: d })}
                    className={cn(
                      "py-3 px-4 rounded-xl border-2 text-sm font-black transition-all duration-300",
                      selection.duration === d
                        ? "border-primary-700 bg-primary-700 text-white shadow-md"
                        : "border-border hover:border-primary-700/30 hover:bg-primary-50/50 dark:hover:bg-primary-950/20",
                    )}
                  >
                    {d} min
                  </button>
                ))}
              </div>
            </div>

            {/* Frequency Selection */}
            <div className="space-y-4">
              <label className="text-[11px] font-black uppercase tracking-widest text-primary-700 flex items-center gap-2">
                <Calendar className="w-3 h-3" /> Sessions per Week
              </label>
              <div className="grid grid-cols-5 gap-2 sm:gap-3">
                {MOCK_PRICING_CONFIG.frequencies.map((f) => (
                  <button
                    key={f}
                    onClick={() => setSelection({ ...selection, frequency: f })}
                    className={cn(
                      "py-3 rounded-xl border-2 text-sm font-black transition-all duration-300",
                      selection.frequency === f
                        ? "border-primary-700 bg-primary-700 text-white shadow-md"
                        : "border-border hover:border-primary-700/30 hover:bg-primary-50/50 dark:hover:bg-primary-950/20",
                    )}
                  >
                    {f}x
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Info */}
            <div className="pt-4 border-t border-border/50">
              <p className="text-[10px] text-muted-foreground flex items-center gap-2">
                <Info className="w-3 h-3" />
                Based on {selection.frequency}x weekly • {monthlySessions}{" "}
                sessions/month
              </p>
            </div>
          </div>

          {/* SUMMARY PANEL - 2 columns on desktop */}
          <div className="lg:col-span-2 p-6 sm:p-8 md:p-10 bg-linear-to-br from-primary-700/5 to-primary-800/5 flex flex-col justify-between">
            <div className="space-y-8">
              {/* Price Display */}
              <div className="text-center space-y-3">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-700">
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
                      <DollarSign className="w-5 h-5 text-primary-700/30" />
                    </div>
                  </motion.div>
                </AnimatePresence>
                <p className="text-xs text-muted-foreground">
                  per month • flexible billing
                </p>
              </div>

              {/* Breakdown Card */}
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
                    ${MOCK_PRICING_CONFIG.basePricePerMinute.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Current Selection Summary */}
              <div className="p-4 rounded-xl bg-primary-700/5 border border-primary-700/10">
                <div className="flex items-center gap-2 mb-2">
                  <Star className="w-3 h-3 text-primary-700" />
                  <span className="text-[10px] font-black uppercase tracking-wider text-primary-700">
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

            {/* CTA Button */}
            <div className="mt-8 space-y-3">
              <Link href="/register" className="block">
                <Button
                  className="w-full h-14 sm:h-16 rounded-xl font-black text-sm tracking-widest uppercase shadow-xl group relative overflow-hidden"
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
