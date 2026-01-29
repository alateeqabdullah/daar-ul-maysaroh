"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Calculator, ShieldCheck, ArrowRight, Info, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const CONFIG = {
  disciplines: [
    { id: "hifz", name: "Hifz Mastery", rate: 1.5, icon: "📖" },
    { id: "tajweed", name: "Tajweed Science", rate: 1.2, icon: "💎" },
    { id: "arabic", name: "Classical Arabic", rate: 1.0, icon: "✍️" },
  ],
  sessionsPerWeek: [1, 2, 3, 5],
  durations: [30, 45, 60],
};

export function TuitionCalculator() {
  const [setup, setSetup] = useState({
    discipline: "hifz",
    frequency: 2,
    duration: 45,
  });

  const monthlyTuition = useMemo(() => {
    const baseRate = 0.5; // $0.50 per minute
    const disc = CONFIG.disciplines.find((d) => d.id === setup.discipline);
    const sessionsMonth = setup.frequency * 4;
    return Math.round(
      setup.duration * baseRate * sessionsMonth * (disc?.rate || 1),
    );
  }, [setup]);

  return (
    <div className="w-full grid lg:grid-cols-12 gap-10 items-start">
      <div className="lg:col-span-7 glass-academic p-8 lg:p-12 rounded-[3rem] shadow-2xl space-y-12">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
            <Calculator className="text-primary" />
          </div>
          <div>
            <h3 className="text-2xl font-black uppercase tracking-tighter">
              Academic Tuition Builder
            </h3>
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
              Structure your scholarly commitment
            </p>
          </div>
        </div>

        {/* Selection Logic */}
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {CONFIG.disciplines.map((d) => (
              <button
                key={d.id}
                onClick={() => setSetup({ ...setup, discipline: d.id })}
                className={`p-6 rounded-2xl border-2 transition-all text-left ${setup.discipline === d.id ? "border-primary bg-primary/5 shadow-inner" : "hover:border-primary/20"}`}
              >
                <span className="text-2xl mb-2 block">{d.icon}</span>
                <span className="font-black text-xs uppercase tracking-tight">
                  {d.name}
                </span>
              </button>
            ))}
          </div>

          <div className="space-y-4">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40">
              Sessions Per Week
            </p>
            <div className="flex gap-3">
              {CONFIG.sessionsPerWeek.map((f) => (
                <button
                  key={f}
                  onClick={() => setSetup({ ...setup, frequency: f })}
                  className={`flex-1 h-14 rounded-xl font-black border-2 transition-all ${setup.frequency === f ? "bg-primary text-white border-primary" : "hover:bg-muted"}`}
                >
                  {f}x
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40">
              Minutes Per Session
            </p>
            <div className="flex gap-3">
              {CONFIG.durations.map((d) => (
                <button
                  key={d}
                  onClick={() => setSetup({ ...setup, duration: d })}
                  className={`flex-1 h-14 rounded-xl font-black border-2 transition-all ${setup.duration === d ? "bg-primary text-white border-primary" : "hover:bg-muted"}`}
                >
                  {d}m
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="lg:col-span-5 space-y-6">
        <div className="bg-primary text-white p-12 rounded-[3.5rem] shadow-[0_40px_80px_-20px_rgba(124,58,237,0.5)] text-center relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-10 rotate-12">
            <Zap className="w-32 h-32" />
          </div>
          <p className="text-[10px] font-black uppercase tracking-[0.4em] opacity-60 mb-4">
            Estimated Monthly Tuition
          </p>
          <div className="text-8xl font-black tracking-tighter mb-6">
            ${monthlyTuition}
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 mb-8 text-left space-y-2">
            <div className="flex justify-between text-[10px] font-black uppercase">
              <span>Academic Track</span>
              <span>{setup.discipline}</span>
            </div>
            <div className="flex justify-between text-[10px] font-black uppercase">
              <span>Total Lessons</span>
              <span>{setup.frequency * 4} / month</span>
            </div>
          </div>

          <Button className="w-full h-16 rounded-2xl bg-white text-primary font-black tracking-widest hover:bg-gold hover:text-white transition-all">
            PROCEED TO ADMISSION <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>

        <div className="p-8 glass-academic rounded-[2.5rem] border-2 border-dashed border-primary/20">
          <p className="text-xs font-bold text-muted-foreground flex items-start gap-3 leading-relaxed">
            <Info className="w-5 h-5 text-primary shrink-0" />
            Pricing includes full access to the digital campus, scholarly
            materials, and 24/7 student support. Final tuition is confirmed
            after the scholarly assessment.
          </p>
        </div>
      </div>
    </div>
  );
}
