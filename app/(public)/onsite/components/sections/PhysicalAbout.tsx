// app/(marketing)/physical/components/sections/PhysicalAbout.tsx
"use client";

import { Reveal } from "@/components/shared/section-animation";
import { motion } from "framer-motion";
import {
  Building2,
  Users,
  Heart,
  Clock,
  Award,
  ShieldCheck,
  Quote,
  Target,
  Eye,
  Compass,
  MapPin,
} from "lucide-react";

const CORE_VALUES = [
  {
    title: "Ikhlas",
    arabic: "الإخلاص",
    meaning: "Sincerity",
    description:
      "Teaching purely for the sake of Allah, seeking His pleasure alone.",
    icon: Heart,
    linear: "from-purple-600 to-purple-700",
  },
  {
    title: "Itqan",
    arabic: "الإتقان",
    meaning: "Excellence",
    description:
      "Pursuing perfection in every recitation, every rule, every transmission.",
    icon: Target,
    linear: "from-amber-500 to-amber-600",
  },
  {
    title: "Amanah",
    arabic: "الأمانة",
    meaning: "Trust",
    description:
      "A sacred responsibility to preserve and transmit the Quran exactly as revealed.",
    icon: ShieldCheck,
    linear: "from-purple-600 to-amber-500",
  },
  {
    title: "Tarbiyah",
    arabic: "التربية",
    meaning: "Character Development",
    description:
      "Cultivating good manners, responsibility, and Islamic values in every student.",
    icon: Compass,
    linear: "from-amber-500 to-purple-600",
  },
];

export function PhysicalAbout() {
  return (
    <section className="py-16 sm:py-20 md:py-24 lg:py-28 bg-linear-to-b from-background via-purple-50/5 to-amber-50/5 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="hidden sm:block absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 xs:px-5 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-20 items-start">
          {/* Left Column */}
          <Reveal>
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 text-amber-500 font-black text-xs uppercase tracking-[0.3em]">
                <Building2 className="w-4 h-4" /> About Daar-ul-Maysaroh
              </div>

              <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter font-heading leading-[1.1]">
                A Sanctuary for{" "}
                <span className="bg-linear-to-r from-purple-600 to-amber-600 bg-clip-text text-transparent italic">
                  Quranic Excellence
                </span>
              </h2>

              <p className="text-lg text-muted-foreground leading-relaxed">
                Daar-ul-Maysaroh is a full-time Quran memorization institute
                dedicated to producing carriers of the Quran who embody its
                character in every facet of life.
              </p>

              <p className="text-base text-muted-foreground leading-relaxed">
                Located in{" "}
                <span className="font-black text-purple-600">
                  Ibadan, Nigeria
                </span>
                , our campus provides a structured, immersive environment where
                students dedicate their time to Tahfeedh, Tajweed, Islamic
                studies, and personal development under the guidance of
                Ijazah-certified scholars.
              </p>

              {/* Quick Stats - Enhanced */}
              <div className="grid grid-cols-2 gap-3 xs:gap-4 pt-4">
                {[
                  {
                    icon: MapPin,
                    label: "Location",
                    value: "Ibadan, Nigeria",
                    color: "amber",
                  },
                  {
                    icon: Users,
                    label: "Student Capacity",
                    value: "50+",
                    color: "purple",
                  },
                  {
                    icon: Clock,
                    label: "Program Type",
                    value: "Full-Time • Part-Time",
                    color: "amber",
                  },
                  {
                    icon: Award,
                    label: "Certification",
                    value: "Ijazah Track",
                    color: "purple",
                  },
                ].map((item, i) => {
                  const Icon = item.icon;
                  const isPurple = item.color === "purple";
                  return (
                    <motion.div
                      key={i}
                      whileHover={{ y: -2 }}
                      className="flex items-center gap-3 p-3 rounded-xl bg-card border border-purple-200 dark:border-purple-800 hover:border-purple-300 transition-all"
                    >
                      <div
                        className={`w-8 h-8 rounded-lg ${isPurple ? "bg-purple-100 dark:bg-purple-950/40" : "bg-amber-100 dark:bg-amber-950/40"} flex items-center justify-center`}
                      >
                        <Icon
                          className={`w-4 h-4 ${isPurple ? "text-purple-600" : "text-amber-500"}`}
                        />
                      </div>
                      <div>
                        <p className="text-[9px] xs:text-[10px] font-black">
                          {item.label}
                        </p>
                        <p className="text-[10px] xs:text-xs font-bold">
                          {item.value}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Arabic Calligraphy */}
              <div className="mt-4 p-4 rounded-xl bg-linear-to-r from-purple-50/50 to-amber-50/50 dark:from-purple-950/20 dark:to-amber-950/20 border border-purple-200 dark:border-purple-800">
                <p className="text-xl xs:text-2xl sm:text-3xl text-center font-arabic text-purple-800 dark:text-purple-200 font-bold leading-relaxed">
                  بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                </p>
                <p className="text-[10px] xs:text-xs text-center text-muted-foreground mt-1">
                  {` "In the name of Allah, the Most Gracious, the Most Merciful"`}
                </p>
              </div>
            </div>
          </Reveal>

          {/* Right Column - Enhanced Mission & Vision */}
          <Reveal delay={0.2}>
            <div className="space-y-6">
              {/* Mission Card */}
              <motion.div
                whileHover={{ y: -4 }}
                className="relative bg-card rounded-2xl border border-purple-200 dark:border-purple-800 p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="absolute -top-3 left-6 px-4 py-1 rounded-full bg-linear-to-r from-purple-600 to-purple-700 text-white text-[10px] font-black uppercase tracking-wider shadow-md">
                  Our Mission
                </div>
                <div className="flex items-center gap-3 mb-4 mt-2">
                  <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-950/40 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Target className="w-5 h-5 text-purple-600" />
                  </div>
                  <h3 className="font-black text-lg">
                    Preserving the Word of Allah
                  </h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  To produce carriers of the Quran who embody its character in
                  every facet of life, while preserving the Sanad (unbroken
                  chain of transmission) for future generations.
                </p>
                <div className="mt-4 p-3 rounded-lg bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800">
                  <div className="flex items-start gap-2">
                    <Quote className="w-4 h-4 text-purple-600 mt-0.5" />
                    <p className="text-xs font-medium italic text-purple-700 dark:text-purple-400">
                      {`   "We don't just teach the Quran; we nurture carriers of the
                      Quran."`}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Vision Card */}
              <motion.div
                whileHover={{ y: -4 }}
                className="relative bg-card rounded-2xl border border-amber-200 dark:border-amber-800 p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="absolute -top-3 left-6 px-4 py-1 rounded-full bg-linear-to-r from-amber-500 to-amber-600 text-white text-[10px] font-black uppercase tracking-wider shadow-md">
                  Our Vision
                </div>
                <div className="flex items-center gap-3 mb-4 mt-2">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950/40 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Eye className="w-5 h-5 text-amber-500" />
                  </div>
                  <h3 className="font-black text-lg">
                    Global Quranic Leadership
                  </h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {` To become the world's most trusted institution for authentic
                  Quranic education, producing scholars who carry the light of
                  revelation to every corner of the globe.`}
                </p>
                <div className="mt-4 p-3 rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800">
                  <div className="flex items-start gap-2">
                    <Quote className="w-4 h-4 text-amber-500 mt-0.5" />
                    <p className="text-xs font-medium italic text-amber-700 dark:text-amber-400">
                      {`"A generation that carries the Word, and lives its Light."`}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Core Values - Enhanced */}
              <div className="space-y-3">
                <p className="text-[10px] font-black uppercase tracking-wider text-muted-foreground">
                  Core Values
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {CORE_VALUES.map((value, i) => {
                    const Icon = value.icon;
                    return (
                      <motion.div
                        key={i}
                        whileHover={{ scale: 1.02 }}
                        className={`flex items-center gap-2 p-2 rounded-lg bg-linear-to-r ${value.linear} bg-opacity-5 border border-purple-200 dark:border-purple-800`}
                      >
                        <div className="w-6 h-6 rounded-full bg-white/20 dark:bg-black/20 flex items-center justify-center">
                          <Icon className="w-3.5 h-3.5 text-white" />
                        </div>
                        <div>
                          <p className="text-[10px] font-black text-white">
                            {value.title}
                          </p>
                          <p className="text-[7px] text-white/80">
                            {value.arabic}
                          </p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Trust Badge */}
              <div className="flex items-center gap-3 p-3 rounded-xl bg-linear-to-r from-purple-50/30 to-amber-50/30 border border-purple-200 dark:border-purple-800">
                <ShieldCheck className="w-8 h-8 text-emerald-500" />
                <div>
                  <p className="font-black text-sm">Qur’an-Centred Education</p>
                  <p className="text-xs text-muted-foreground">
                    Building strong foundations in recitation, memorisation &
                    Islamic learning
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      <style jsx>{`
        .font-arabic {
          font-family:
            "Amiri", "Scheherazade", "Lateef", "Noto Naskh Arabic", serif;
        }
      `}</style>
    </section>
  );
}
