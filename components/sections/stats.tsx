"use client";

import { Reveal } from "@/components/shared/section-animation";
import { Globe, Users, BookMarked, Award } from "lucide-react";

const STATS = [
  { label: "Noble Students", value: "100+", icon: Users },
  { label: "Global Nations", value: "6+", icon: Globe },
  { label: "Sanad Scholars", value: "8+", icon: Award },
  { label: "Surahs Completed", value: "114", icon: BookMarked },
];

export function Stats() {
  return (
    <section className="py-24 bg-slate-950 text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-5 bg-[url('/islamic-pattern.svg')] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
          {STATS.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.1}>
              <div className="text-center space-y-4 group">
                <div className="w-16 h-16 rounded-2xl bg-primary-700/20 border border-primary-700/30 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform shadow-2xl">
                  <stat.icon className="w-7 h-7 text-primary-400" />
                </div>
                <div>
                  <div className="text-5xl font-black tracking-tighter text-white mb-1">
                    {stat.value}
                  </div>
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-400 opacity-60">
                    {stat.label}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
