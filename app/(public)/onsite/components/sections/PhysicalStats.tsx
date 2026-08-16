// app/(marketing)/physical/components/sections/PhysicalStats.tsx
"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Users,
  BookOpen,
  Award,
  Clock,
  Building2,
  Crown,
  GraduationCap,
  Heart,
  MapPin,
  Globe,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Star,
} from "lucide-react";
import { Reveal } from "@/components/shared/section-animation";

const MAIN_STATS = [
  {
    value: "50+",
    label: "Active Students",
    icon: Users,
    color: "purple",
    description: "Dedicated learners on campus",
    detail: "Growing community",
  },
  {
    value: "6",
    label: "Certified Teachers",
    icon: BookOpen,
    color: "amber",
    description: "Ijazah-holding scholars",
    detail: "Expert guidance",
  },
  {
    value: "1400+",
    label: "Years of Sanad",
    icon: Crown,
    color: "purple",
    description: "Unbroken chain to Prophet (ﷺ)",
    detail: "Authentic lineage",
  },
  {
    value: "24/7",
    label: "Learning Environment",
    icon: Clock,
    color: "amber",
    description: "Full-time campus access",
    detail: "Always available",
  },
];

const CAMPUS_STATS = [
  { value: "5", label: "Supervision", icon: Building2, color: "purple" },
  { value: "3", label: "Quran Circles", icon: Heart, color: "amber" },
  {
    value: "10+",
    label: "Flexibility",
    icon: GraduationCap,
    color: "purple",
  },
  { value: "Ibadan", label: "Day & Boarding", icon: MapPin, color: "amber" },
];

const getColorStyles = (color: string) => {
  const styles = {
    purple: {
      text: "text-purple-600 dark:text-purple-400",
      border: "border-purple-200 dark:border-purple-800",
      bg: "bg-purple-100 dark:bg-purple-950/40",
      gradient: "from-purple-600 to-purple-700",
      light: "bg-purple-50/30 dark:bg-purple-950/20",
      glow: "shadow-purple-500/20",
      ring: "ring-purple-500/30",
    },
    amber: {
      text: "text-amber-600 dark:text-amber-400",
      border: "border-amber-200 dark:border-amber-800",
      bg: "bg-amber-100 dark:bg-amber-950/40",
      gradient: "from-amber-500 to-amber-600",
      light: "bg-amber-50/30 dark:bg-amber-950/20",
      glow: "shadow-amber-500/20",
      ring: "ring-amber-500/30",
    },
  };
  return styles[color as keyof typeof styles] || styles.purple;
};

// Counter Animation Component
function AnimatedCounter({
  value,
  suffix = "",
  prefix = "",
}: {
  value: string;
  suffix?: string;
  prefix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const numValue = parseInt(value.replace(/[^0-9]/g, ""));
  const hasPlus = value.includes("+");

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {isInView ? (
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {numValue.toLocaleString()}
          {hasPlus && "+"}
        </motion.span>
      ) : (
        "0"
      )}
      {suffix}
    </span>
  );
}

export function PhysicalStats() {
  return (
    <section className="py-16 sm:py-20 md:py-24 lg:py-28 bg-gradient-to-b from-background via-purple-50/5 to-amber-50/5 relative overflow-hidden">
      {/* Premium Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-0 w-80 h-80 bg-purple-600/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-600/3 rounded-full blur-[120px]" />
      </div>

      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-purple-500/20"
            animate={{
              y: [0, -100, 0],
              x: [0, i % 2 === 0 ? 50 : -50, 0],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              delay: i * 1.5,
              ease: "easeInOut",
            }}
            style={{
              left: `${10 + i * 15}%`,
              top: `${20 + i * 10}%`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 xs:px-5 sm:px-6 relative z-10">
        {/* Section Header - Premium */}
        <Reveal>
          <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-100 to-amber-100 dark:from-purple-900/30 dark:to-amber-900/30 border border-purple-200 dark:border-purple-800 mb-4">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-wider text-purple-700 dark:text-purple-400">
                Daar-ul-Maysaroh • Ibadan Campus
              </span>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-1.5 h-1.5 rounded-full bg-emerald-500"
              />
            </div>

            <h2 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter font-heading leading-[1.1] mb-4">
              By the{" "}
              <span className="bg-gradient-to-r from-purple-600 to-amber-600 bg-clip-text text-transparent italic">
                Numbers
              </span>
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
              The impact of Daar-ul-Maysaroh in numbers - a growing community
              dedicated to Quranic excellence.
            </p>
          </div>
        </Reveal>

        {/* Main Stats - Premium Cards with Gradient */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 xs:gap-5 sm:gap-6 max-w-5xl mx-auto mb-12 sm:mb-16">
          {MAIN_STATS.map((stat, i) => {
            const Icon = stat.icon;
            const colors = getColorStyles(stat.color);
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6, ease: "easeOut" }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative text-center p-5 xs:p-6 rounded-2xl bg-card border-2 border-purple-200 dark:border-purple-800 hover:border-purple-300 transition-all duration-500 shadow-lg hover:shadow-2xl overflow-hidden"
              >
                {/* Premium Gradient Overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                />

                {/* Premium Glow Ring */}
                <div
                  className={`absolute -inset-1 ${colors.glow} opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500`}
                />

                {/* Icon with Premium Ring */}
                <div className="relative">
                  <div
                    className={`absolute inset-0 ${colors.ring} opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-500 rounded-xl`}
                  />
                  <div
                    className={`relative w-14 h-14 rounded-xl ${colors.bg} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-500 shadow-md group-hover:shadow-lg`}
                  >
                    <Icon className={`w-7 h-7 ${colors.text}`} />
                  </div>
                </div>

                {/* Value with Animation */}
                <div
                  className={`text-3xl md:text-4xl font-black ${colors.text} mb-1 tracking-tighter`}
                >
                  <AnimatedCounter value={stat.value} />
                </div>

                {/* Label */}
                <div className="text-sm font-black text-foreground mb-1">
                  {stat.label}
                </div>

                {/* Description */}
                <div className="text-xs text-muted-foreground/70">
                  {stat.description}
                </div>

                {/* Detail Badge */}
                <div
                  className={`mt-3 inline-block px-3 py-0.5 rounded-full text-[9px] font-black ${colors.bg} ${colors.text} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                >
                  {stat.detail}
                </div>

                {/* Premium Decorative Line */}
                <div
                  className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${colors.gradient} scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left`}
                />
              </motion.div>
            );
          })}
        </div>

        {/* Campus Stats - Premium Pill Design */}
        <div className="max-w-4xl mx-auto">
          <div className="relative p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-purple-50/20 to-amber-50/20 dark:from-purple-950/10 dark:to-amber-950/10 border border-purple-200 dark:border-purple-800">
            {/* Decorative Element */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-purple-600 to-amber-500 text-white text-[9px] font-black uppercase tracking-wider shadow-lg">
              Campus Facts
            </div>

            <div className="flex flex-wrap justify-center gap-3 xs:gap-4 sm:gap-5 pt-4">
              {CAMPUS_STATS.map((stat, i) => {
                const Icon = stat.icon;
                const colors = getColorStyles(stat.color);
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: 0.3 + i * 0.05,
                      type: "spring",
                      stiffness: 300,
                    }}
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-card border border-purple-200 dark:border-purple-800 shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    <div className={`p-1.5 rounded-lg ${colors.bg}`}>
                      <Icon className={`w-4 h-4 ${colors.text}`} />
                    </div>
                    <div>
                      {/* <span className="font-black text-sm">{stat.value}</span> */}
                      <span className="text-xs font-black text-muted-foreground ml-1.5">
                        {stat.label}
                      </span>
                    </div>
                    {/* Small decorative dot */}
                    <div
                      className={`w-1 h-1 rounded-full ${colors.text} opacity-30`}
                    />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Premium Trust Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-10 sm:mt-12 text-center"
        >
          <div className="inline-flex flex-wrap items-center justify-center gap-3 sm:gap-4 px-6 py-3 rounded-full bg-gradient-to-r from-purple-50/30 to-amber-50/30 dark:from-purple-950/20 dark:to-amber-950/20 border border-purple-200 dark:border-purple-800 shadow-md">
            {[
              {
                icon: ShieldCheck,
                label: "Ijazah Certified",
                color: "emerald",
              },
              { icon: Crown, label: "Authentic Sanad", color: "amber" },
              { icon: Clock, label: "Full-Time Program", color: "purple" },
              { icon: Users, label: "50+ Students", color: "purple" },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="flex items-center gap-1.5">
                  <Icon className={`w-4 h-4 text-${item.color}-500`} />
                  <span className="text-[9px] xs:text-[10px] font-black uppercase tracking-wider text-muted-foreground">
                    {item.label}
                  </span>
                  {idx < 3 && (
                    <div className="w-px h-4 bg-border/50 ml-1 sm:ml-2" />
                  )}
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
