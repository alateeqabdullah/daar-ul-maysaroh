// components/sections/home-stats.tsx
"use client";

import { Reveal } from "@/components/shared/section-animation";
import { useInView } from "framer-motion";
import {
  Award,
  Globe,
  GraduationCap,
  Sparkles,
  Users
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

const HOME_STATS = [
  {
    id: "students",
    label: "Active Students",
    value: 100,
    suffix: "+",
    icon: Users,
    color: "purple",
    description: "Growing global community",
  },
  {
    id: "countries",
    label: "Countries",
    value: 6,
    suffix: "+",
    icon: Globe,
    color: "amber",
    description: "Worldwide reach",
  },
  {
    id: "success",
    label: "Success Rate",
    value: 94,
    suffix: "%",
    icon: Award,
    color: "purple",
    description: "Students achieve goals",
  },
  {
    id: "scholars",
    label: "Certified Scholars",
    value: 8,
    suffix: "+",
    icon: GraduationCap,
    color: "amber",
    description: "Ijazah-certified teachers",
  },
];

function AnimatedCounter({
  value,
  suffix = "",
  prefix = "",
}: {
  value: number;
  suffix?: string;
  prefix?: string;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / 2000, 1);
      const currentCount = Math.floor(progress * value);
      setCount(currentCount);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [isInView, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

export function Stats() {
  return (
    <section className="py-12 xs:py-16 sm:py-20 md:py-24 bg-linear-to-b from-background via-purple-50/5 to-amber-50/5 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-purple-600/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 xs:px-5 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 xs:mb-10 sm:mb-12 md:mb-16">
          <Reveal>
            <div className="inline-flex items-center gap-1.5 xs:gap-2 px-2.5 xs:px-3 py-1 xs:py-1.5 rounded-full bg-purple-100 dark:bg-purple-900/30 border border-purple-200 dark:border-purple-800 mb-3 xs:mb-4">
              <Sparkles className="w-3 h-3 xs:w-3.5 xs:h-3.5 text-amber-500" />
              <span className="text-[8px] xs:text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] text-purple-700 dark:text-purple-400">
                Al-Maysaroh by the Numbers
              </span>
            </div>
            <h2 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter font-heading leading-[1.1] mb-3 xs:mb-4">
              Trusted by{" "}
              <span className="bg-linear-to-r from-purple-600 to-amber-600 bg-clip-text text-transparent italic">
                Students
              </span>{" "}
              Worldwide
            </h2>
            <p className="text-sm xs:text-base text-muted-foreground max-w-md mx-auto">
              Join a growing community of learners mastering the Quran with
              authentic Sanad
            </p>
          </Reveal>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4 xs:gap-5 sm:gap-6 md:gap-8">
          {HOME_STATS.map((stat, index) => {
            const Icon = stat.icon;
            const isPurple = stat.color === "purple";

            return (
              <Reveal key={stat.id} delay={index * 0.1}>
                <div
                  className={`group text-center p-5 xs:p-6 sm:p-7 md:p-8 rounded-xl xs:rounded-2xl bg-card border border-border hover:border-${isPurple ? "purple" : "amber"}-300 transition-all duration-300 shadow-sm hover:shadow-xl`}
                >
                  {/* Icon */}
                  <div
                    className={`inline-flex items-center justify-center w-12 h-12 xs:w-14 xs:h-14 rounded-full ${isPurple ? "bg-purple-100 dark:bg-purple-950/40" : "bg-amber-100 dark:bg-amber-950/40"} mb-3 xs:mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon
                      className={`w-6 h-6 xs:w-7 xs:h-7 ${isPurple ? "text-purple-600" : "text-amber-500"}`}
                    />
                  </div>

                  {/* Number */}
                  <div
                    className={`text-3xl xs:text-4xl sm:text-5xl font-black ${isPurple ? "text-purple-600" : "text-amber-500"} mb-1 xs:mb-2`}
                  >
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </div>

                  {/* Label */}
                  <p className="text-xs xs:text-sm font-black uppercase tracking-tighter mb-1">
                    {stat.label}
                  </p>

                  {/* Description */}
                  <p className="text-[9px] xs:text-[10px] text-muted-foreground">
                    {stat.description}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Bottom Trust Message */}
        <Reveal delay={0.4}>
          <div className="mt-10 xs:mt-12 sm:mt-16 text-center">
            <div className="inline-flex flex-wrap items-center justify-center gap-3 xs:gap-4 sm:gap-6">
              <div className="flex items-center gap-1.5 xs:gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-purple-600" />
                <span className="text-[8px] xs:text-[9px] sm:text-[10px] font-black uppercase tracking-wider text-muted-foreground">
                  Authentic Sanad
                </span>
              </div>
              <div className="flex items-center gap-1.5 xs:gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                <span className="text-[8px] xs:text-[9px] sm:text-[10px] font-black uppercase tracking-wider text-muted-foreground">
                  Ijazah Certified
                </span>
              </div>
              <div className="flex items-center gap-1.5 xs:gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-purple-600" />
                <span className="text-[8px] xs:text-[9px] sm:text-[10px] font-black uppercase tracking-wider text-muted-foreground">
                  24/7 Support
                </span>
              </div>
              <div className="flex items-center gap-1.5 xs:gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                <span className="text-[8px] xs:text-[9px] sm:text-[10px] font-black uppercase tracking-wider text-muted-foreground">
                  Flexible Scheduling
                </span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
