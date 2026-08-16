// app/(marketing)/physical/components/sections/PhysicalAttendance.tsx
"use client";

import { Reveal } from "@/components/shared/section-animation";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  Sun,
  Moon,
  Users,
  Sparkles,
  Check,
  ArrowRight,
  Building2,
  Home,
  Zap,
  Award,
  Crown,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";

const ATTENDANCE_OPTIONS = [
  {
    id: "day-part-time",
    title: "Part-Time Day",
    type: "day",
    schedule: "Saturday - Sunday",
    time: "9:00 AM - 4:30 PM",
    icon: Sun,
    color: "amber",
    badge: "Weekend Only",
    features: [
      "2 days per week",
      "Full academic program",
      "Tahfeedh & Tajweed",
      "Islamic Studies",
    ],
  },
  {
    id: "day-full-time",
    title: "Full-Time Day",
    type: "day",
    schedule: "Saturday - Sunday & Monday - Wednesday",
    time: "Sat-Sun: 9AM - 4:30PM • Mon-Wed: 4:30PM - 6:30PM",
    icon: Sun,
    color: "purple",
    badge: "Most Popular",
    features: [
      "5 days per week",
      "Extended learning hours",
      "Complete curriculum",
      "Accelerated progress",
    ],
  },
  {
    id: "boarding-part-time",
    title: "Part-Time Boarding",
    type: "boarding",
    schedule: "Friday - Sunday",
    time: "Friday 4:30PM - Sunday 4:30PM",
    icon: Moon,
    color: "amber",
    badge: "Weekend Intensive",
    features: [
      "Weekend immersion",
      "On-campus accommodation",
      "Full supervision",
      "Community experience",
    ],
  },
  {
    id: "boarding-full-time",
    title: "Full-Time Boarding",
    type: "boarding",
    schedule: "Daily",
    time: "Full-time residential",
    icon: Moon,
    color: "purple",
    badge: "Premium",
    features: [
      "Full-time campus living",
      "Immersive environment",
      "24/7 supervision",
      "Accelerated memorization",
    ],
  },
];

const FLEXIBLE_OPTIONS = [
  {
    title: "Custom Schedule",
    description: "Tailored attendance plan to fit your family's needs",
    icon: Crown,
    color: "purple",
  },
  {
    title: "Flexible Days",
    description: "Choose specific days that work for you",
    icon: Calendar,
    color: "amber",
  },
  {
    title: "Hybrid Learning",
    description: "Combine day and boarding elements",
    icon: Zap,
    color: "purple",
  },
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
    },
    amber: {
      text: "text-amber-600 dark:text-amber-400",
      border: "border-amber-200 dark:border-amber-800",
      bg: "bg-amber-100 dark:bg-amber-950/40",
      gradient: "from-amber-500 to-amber-600",
      light: "bg-amber-50/30 dark:bg-amber-950/20",
      glow: "shadow-amber-500/20",
    },
  };
  return styles[color as keyof typeof styles] || styles.purple;
};

export function PhysicalAttendance() {
  const [activeType, setActiveType] = useState<"all" | "day" | "boarding">("all");

  const filteredOptions = ATTENDANCE_OPTIONS.filter(option => 
    activeType === "all" || option.type === activeType
  );

  return (
    <section className="py-16 sm:py-20 md:py-24 lg:py-28 bg-gradient-to-b from-background via-purple-50/5 to-amber-50/5 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-purple-600/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-amber-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 xs:px-5 sm:px-6 relative z-10">
        {/* Header */}
        <Reveal>
          <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 dark:bg-purple-900/30 border border-purple-200 dark:border-purple-800 mb-4">
              <Calendar className="w-4 h-4 text-amber-500" />
              <span className="text-[10px] font-black uppercase tracking-wider text-purple-700 dark:text-purple-400">
                Attendance Options
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter font-heading leading-[1.1] mb-4">
              Choose Your{" "}
              <span className="bg-gradient-to-r from-purple-600 to-amber-600 bg-clip-text text-transparent italic">
                Schedule
              </span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Flexible attendance options designed to accommodate different
              needs and lifestyles
            </p>
          </div>
        </Reveal>

        {/* Type Filter */}
        <div className="flex justify-center mb-10">
          <div className="flex gap-1 p-1 rounded-xl bg-muted/30 border border-purple-200 dark:border-purple-800">
            <button
              onClick={() => setActiveType("all")}
              className={cn(
                "px-6 py-2.5 rounded-lg font-black text-sm transition-all",
                activeType === "all"
                  ? "bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg"
                  : "text-muted-foreground hover:text-purple-600"
              )}
            >
              All Options
            </button>
            <button
              onClick={() => setActiveType("day")}
              className={cn(
                "px-6 py-2.5 rounded-lg font-black text-sm transition-all",
                activeType === "day"
                  ? "bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg"
                  : "text-muted-foreground hover:text-purple-600"
              )}
            >
              <Sun className="w-4 h-4 inline mr-2" />
              Day Programmes
            </button>
            <button
              onClick={() => setActiveType("boarding")}
              className={cn(
                "px-6 py-2.5 rounded-lg font-black text-sm transition-all",
                activeType === "boarding"
                  ? "bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg"
                  : "text-muted-foreground hover:text-purple-600"
              )}
            >
              <Moon className="w-4 h-4 inline mr-2" />
              Boarding Programmes
            </button>
          </div>
        </div>

        {/* Attendance Options Grid */}
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {filteredOptions.map((option, index) => {
            const Icon = option.icon;
            const colors = getColorStyles(option.color);
            const isPopular = option.badge === "Most Popular";
            const isPremium = option.badge === "Premium";
            
            return (
              <Reveal key={option.id} delay={index * 0.08}>
                <motion.div
                  whileHover={{ y: -6 }}
                  className={`group relative bg-card rounded-2xl border-2 ${colors.border} hover:border-${option.color === 'purple' ? 'purple' : 'amber'}-400 transition-all duration-500 p-6 md:p-8 shadow-lg hover:shadow-2xl overflow-hidden`}
                >
                  {/* Gradient Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} opacity-0 group-hover:opacity-[0.04] transition-opacity duration-700`} />
                  
                  {/* Glow */}
                  <div className={`absolute -inset-2 ${colors.glow} opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-700`} />

                  {/* Badge */}
                  <div className="absolute top-4 right-4">
                    {isPopular && (
                      <span className="px-3 py-1 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-white text-[8px] font-black uppercase tracking-wider shadow-md">
                        Most Popular
                      </span>
                    )}
                    {isPremium && (
                      <span className="px-3 py-1 rounded-full bg-gradient-to-r from-purple-600 to-purple-700 text-white text-[8px] font-black uppercase tracking-wider shadow-md">
                        Premium
                      </span>
                    )}
                    {option.badge === "Weekend Only" && (
                      <span className="px-3 py-1 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-white text-[8px] font-black uppercase tracking-wider shadow-md">
                        Weekend Only
                      </span>
                    )}
                    {option.badge === "Weekend Intensive" && (
                      <span className="px-3 py-1 rounded-full bg-gradient-to-r from-purple-600 to-purple-700 text-white text-[8px] font-black uppercase tracking-wider shadow-md">
                        Weekend Intensive
                      </span>
                    )}
                  </div>

                  {/* Icon */}
                  <div className="relative mb-5">
                    <div className={`absolute inset-0 ${colors.ring || ''} opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-500 rounded-xl`} />
                    <div className={`relative w-14 h-14 rounded-xl ${colors.bg} flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-md group-hover:shadow-lg`}>
                      <Icon className={`w-7 h-7 ${colors.text}`} />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="font-black text-xl md:text-2xl mb-1 group-hover:text-purple-600 transition-colors">
                    {option.title}
                  </h3>

                  {/* Schedule */}
                  <div className="space-y-1 mb-4">
                    <p className="text-sm font-black">{option.schedule}</p>
                    <p className="text-xs text-muted-foreground">{option.time}</p>
                  </div>

                  {/* Features */}
                  <div className="space-y-1.5 mb-6">
                    {option.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm">
                        <Check className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                        <span className="text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <Link href="/physical/admissions">
                    <Button className={`w-full rounded-xl py-3 font-black text-sm bg-gradient-to-r ${colors.gradient} hover:from-${option.color === 'purple' ? 'purple-700' : 'amber-600'} hover:to-${option.color === 'purple' ? 'purple-800' : 'amber-700'} text-white shadow-md hover:shadow-lg transition-all group/btn`}>
                      Apply Now
                      <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </Link>

                  {/* Decorative Line */}
                  <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${colors.gradient} scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left`} />
                </motion.div>
              </Reveal>
            );
          })}
        </div>

        {/* Flexible Options */}
        <Reveal delay={0.3}>
          <div className="mt-14 max-w-4xl mx-auto">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-black mb-2">Flexible & Custom Options</h3>
              <p className="text-sm text-muted-foreground">
                Can't find what you're looking for? We offer flexible solutions
              </p>
            </div>
            <div className="grid sm:grid-cols-3 gap-4">
              {FLEXIBLE_OPTIONS.map((option, idx) => {
                const Icon = option.icon;
                const colors = getColorStyles(option.color);
                return (
                  <motion.div
                    key={idx}
                    whileHover={{ y: -3 }}
                    className={`bg-card rounded-xl border ${colors.border} p-5 text-center group hover:shadow-lg transition-all`}
                  >
                    <div className={`w-12 h-12 rounded-xl ${colors.bg} flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}>
                      <Icon className={`w-6 h-6 ${colors.text}`} />
                    </div>
                    <p className="font-black text-sm">{option.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">{option.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </Reveal>

        {/* Bottom CTA */}
        <Reveal delay={0.4}>
          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-3 px-5 py-3 rounded-full bg-gradient-to-r from-purple-50/30 to-amber-50/30 dark:from-purple-950/20 dark:to-amber-950/20 border border-purple-200 dark:border-purple-800">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span className="text-xs font-medium text-muted-foreground">
                Need a custom schedule? Contact us to discuss your needs
              </span>
              <Link href="/physical/contact">
                <Button variant="outline" className="rounded-full px-4 py-1.5 font-black text-xs border-purple-300 text-purple-600">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}