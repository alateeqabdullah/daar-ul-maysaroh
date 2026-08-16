// app/(marketing)/physical/components/sections/PhysicalWhyChoose.tsx
"use client";

import { Reveal } from "@/components/shared/section-animation";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Users,
  Award,
  Clock,
  Globe,
  Heart,
  Crown,
  BookOpen,
  Sparkles,
  Check,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const REASONS = [
  {
    icon: ShieldCheck,
    title: "Authentic Sanad",
    description: "Unbroken chain of transmission to Prophet Muhammad (ﷺ)",
    color: "purple",
    stat: "1400+ Years",
  },
  {
    icon: Users,
    title: "1-on-1 Instruction",
    description: "Personalized attention from certified scholars",
    color: "amber",
    stat: "certified Scholars",
  },
  {
    icon: Award,
    title: "Ijazah Certification",
    description: "Formal certification recognized internationally",
    color: "purple",
    stat: "Ijazah Track",
  },
  {
    icon: Clock,
    title: "Full-Time Structure",
    description: "Immersive daily routine from 4AM to 9PM",
    color: "amber",
    stat: "Daily Routine",
  },
  {
    icon: Globe,
    title: "Global Recognition",
    description: "Recognized by international scholarly councils",
    color: "purple",
    stat: "Global Reach",
  },
  {
    icon: Heart,
    title: "Spiritual Environment",
    description: "Daily Tazkiyah and character development",
    color: "amber",
    stat: "Spiritual Growth",
  },
];

const getColorStyles = (color: string) => {
  const styles = {
    purple: {
      text: "text-purple-600 dark:text-purple-400",
      bg: "bg-purple-100 dark:bg-purple-950/40",
      gradient: "from-purple-600 to-purple-700",
      light: "hover:bg-purple-50/30 dark:hover:bg-purple-950/20",
      glow: "shadow-purple-500/10",
    },
    amber: {
      text: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-100 dark:bg-amber-950/40",
      gradient: "from-amber-500 to-amber-600",
      light: "hover:bg-amber-50/30 dark:hover:bg-amber-950/20",
      glow: "shadow-amber-500/10",
    },
  };
  return styles[color as keyof typeof styles] || styles.purple;
};

export function PhysicalWhyChoose() {
  return (
    <section className="py-20 sm:py-24 md:py-28 lg:py-32 relative overflow-hidden">
      {/* Premium Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[150px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/3 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 xs:px-5 sm:px-6 relative z-10">
        {/* Section Header */}
        <Reveal>
          <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-100 to-amber-100 dark:from-purple-900/30 dark:to-amber-900/30 border border-purple-200 dark:border-purple-800 mb-4">
              <Crown className="w-4 h-4 text-amber-500" />
              <span className="text-[10px] font-black uppercase tracking-wider text-purple-700 dark:text-purple-400">
                Why Choose Us
              </span>
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter font-heading leading-[1.1] mb-4">
              The{" "}
              <span className="bg-gradient-to-r from-purple-600 via-purple-700 to-amber-600 bg-clip-text text-transparent italic">
                Daar-ul-Maysaroh
              </span>{" "}
              Difference
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              What sets our Quranic education apart
            </p>
          </div>
        </Reveal>

        {/* Premium Borderless Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
          {REASONS.map((reason, index) => {
            const Icon = reason.icon;
            const colors = getColorStyles(reason.color);
            return (
              <Reveal key={index} delay={index * 0.08}>
                <motion.div
                  whileHover={{ y: -6 }}
                  className={`group relative p-6 rounded-2xl transition-all duration-500 ${colors.light} cursor-default`}
                >
                  {/* Decorative Background Glow */}
                  <div
                    className={`absolute inset-0 ${colors.glow} opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-700 rounded-2xl`}
                  />

                  {/* Content */}
                  <div className="relative flex items-start gap-5">
                    {/* Icon with Premium Ring */}
                    <div className="relative shrink-0">
                      <div
                        className={`absolute inset-0 ${colors.text} opacity-0 group-hover:opacity-10 blur-md transition-opacity duration-500 rounded-xl`}
                      />
                      <div
                        className={`relative w-14 h-14 rounded-xl ${colors.bg} flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-md group-hover:shadow-lg`}
                      >
                        <Icon className={`w-7 h-7 ${colors.text}`} />
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className={`font-black text-lg ${colors.text}`}>
                          {reason.title}
                        </h3>
                        <span className="text-[9px] font-black text-muted-foreground/30 hidden sm:inline">
                          —
                        </span>
                        <span
                          className={`text-[9px] font-black ${colors.text} opacity-60 hidden sm:inline`}
                        >
                          {reason.stat}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                        {reason.description}
                      </p>
                      {/* Stat - visible on mobile */}
                      <span
                        className={`inline-block text-[9px] font-black ${colors.text} opacity-60 mt-1 sm:hidden`}
                      >
                        {reason.stat}
                      </span>
                    </div>
                  </div>

                  {/* Decorative Line */}
                  <div
                    className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${colors.gradient} scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left opacity-30`}
                  />
                </motion.div>
              </Reveal>
            );
          })}
        </div>

        {/* Premium Bottom Note */}
        <Reveal delay={0.3}>
          <div className="mt-14 text-center">
            <div className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl bg-gradient-to-r from-purple-50/30 to-amber-50/30 dark:from-purple-950/20 dark:to-amber-950/20 border border-purple-200 dark:border-purple-800 shadow-sm">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-amber-500 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm font-medium text-muted-foreground">
                  All programmes include Ijazah certification and authentic
                  Sanad
                </span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
