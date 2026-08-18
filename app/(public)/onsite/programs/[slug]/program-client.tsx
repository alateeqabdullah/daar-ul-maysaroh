// app/(marketing)/onsite/programs/[slug]/program-client.tsx
"use client";

import { Reveal } from "@/components/shared/section-animation";
import { Button } from "@/components/ui/button";
import {
    ArrowRight,
    Award,
    BookOpen,
    Calendar,
    CheckCircle2,
    ChevronRight,
    Clock,
    Moon,
    Sparkles,
    Sun,
    Target,
    Users
} from "lucide-react";
import Link from "next/link";

// Map icon strings to components
const ICON_MAP: Record<string, any> = {
  Moon: Moon,
  Sun: Sun,
};

const getColorStyles = (color: string) => {
  const map = {
    purple: {
      text: "text-purple-400",
      border: "border-purple-800/30",
      bg: "bg-purple-600/20",
      gradient: "from-purple-500 to-purple-600",
      glow: "shadow-purple-500/30",
    },
    amber: {
      text: "text-amber-400",
      border: "border-amber-800/30",
      bg: "bg-amber-500/20",
      gradient: "from-amber-500 to-amber-600",
      glow: "shadow-amber-500/30",
    },
  } as const;
  return map[color as keyof typeof map] ?? map.purple;
};

export default function ProgramClient({ program }: { program: any }) {
  const Icon = ICON_MAP[program.icon] || BookOpen;
  const colors = getColorStyles(program.color);
  const isPurple = program.color === "purple";

  return (
    <main className="relative bg-slate-950 overflow-hidden min-h-screen pt-24 md:pt-28">
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.02] bg-[url('/islamic-pattern.svg')] bg-center bg-repeat"
          style={{ backgroundSize: "300px" }}
        />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[150px]" />
      </div>

      <div className="container mx-auto px-4 xs:px-5 sm:px-6 relative z-10">
        {/* Breadcrumb */}
        <nav className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 flex items-center gap-2 mb-8 flex-wrap">
          <Link
            href="/onsite"
            className="hover:text-amber-500 transition-colors"
          >
            Home
          </Link>
          <span className="opacity-30">/</span>
          <Link
            href="/onsite/programs"
            className="hover:text-amber-500 transition-colors"
          >
            Programs
          </Link>
          <span className="opacity-30">/</span>
          <span className="text-amber-500">{program.title}</span>
        </nav>

        {/* ===== HERO ===== */}
        <section className="py-8 md:py-12">
          <Reveal>
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <div className="space-y-6">
                <div className="flex items-center gap-3 flex-wrap">
                  <div
                    className={`w-14 h-14 rounded-2xl ${colors.bg} flex items-center justify-center shadow-lg ${colors.glow}`}
                  >
                    <Icon className={`w-7 h-7 ${colors.text}`} />
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-[10px] font-black ${colors.bg} ${colors.text}`}
                  >
                    {program.badge}
                  </span>
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tighter font-heading leading-[1.1] text-white">
                  {program.title}
                </h1>
                <p className={`text-lg font-black ${colors.text}`}>
                  {program.subtitle}
                </p>
                <p className="text-lg text-slate-300 leading-relaxed">
                  {program.description}
                </p>

                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 text-sm text-slate-400">
                    <Clock className="w-4 h-4 text-amber-500" />
                    {program.duration}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-400">
                    <Target className="w-4 h-4 text-purple-400" />
                    {program.level}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-400">
                    <Calendar className="w-4 h-4 text-amber-500" />
                    {program.attendance}
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 pt-2">
                  <Link href="/onsite/admissions">
                    <Button className="rounded-full px-8 py-4 font-black bg-gradient-to-r from-purple-600 to-amber-500 hover:from-purple-700 hover:to-amber-600 text-white shadow-lg shadow-purple-500/20 hover:shadow-xl transition-all">
                      Apply Now
                      <ArrowRight className="w-4 h-4 ml-2 inline" />
                    </Button>
                  </Link>
                  <Link href="/onsite/contact">
                    <Button
                      variant="outline"
                      className="rounded-full px-8 py-4 font-black border-slate-700 text-slate-300 hover:bg-slate-800/50 transition-all"
                    >
                      Contact Us
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Quick Info Cards */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-slate-900/30">
                  <Users className="w-5 h-5 text-amber-500 mb-2" />
                  <p className="font-black text-white text-sm">Who It's For</p>
                  <ul className="space-y-1 mt-2">
                    {program.whoIsItFor
                      .slice(0, 3)
                      .map((item: string, i: number) => (
                        <li
                          key={i}
                          className="text-xs text-slate-400 flex items-start gap-2"
                        >
                          <ChevronRight className="w-3 h-3 text-amber-500 mt-0.5" />
                          {item}
                        </li>
                      ))}
                  </ul>
                </div>
                <div className="p-5 rounded-2xl bg-slate-900/30">
                  <Award className="w-5 h-5 text-purple-400 mb-2" />
                  <p className="font-black text-white text-sm">
                    Program Outcomes
                  </p>
                  <ul className="space-y-1 mt-2">
                    {program.outcomes
                      .slice(0, 3)
                      .map((item: string, i: number) => (
                        <li
                          key={i}
                          className="text-xs text-slate-400 flex items-start gap-2"
                        >
                          <ChevronRight className="w-3 h-3 text-purple-400 mt-0.5" />
                          {item}
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* ===== DETAILED DESCRIPTION ===== */}
        <section className="py-8 md:py-12 border-t border-slate-800/50">
          <Reveal>
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-black text-white mb-4">
                About This Programme
              </h2>
              <div className="text-slate-300 leading-relaxed space-y-4">
                {program.detailedDescription
                  .split("\n\n")
                  .map((paragraph: string, i: number) => (
                    <p key={i}>{paragraph}</p>
                  ))}
              </div>
            </div>
          </Reveal>
        </section>

        {/* ===== CURRICULUM ===== */}
        <section className="py-8 md:py-12 border-t border-slate-800/50">
          <Reveal>
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-black text-white mb-4">
                Curriculum
              </h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {program.curriculum.map((subject: string, i: number) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/30"
                  >
                    <CheckCircle2
                      className={`w-4 h-4 ${isPurple ? "text-purple-400" : "text-amber-400"}`}
                    />
                    <span className="text-slate-300 font-medium">
                      {subject}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </section>

        {/* ===== DAILY SCHEDULE ===== */}
        {program.schedule && program.schedule.length > 0 && (
          <section className="py-8 md:py-12 border-t border-slate-800/50">
            <Reveal>
              <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl font-black text-white mb-4">
                  Daily Schedule
                </h2>
                <div className="grid sm:grid-cols-2 gap-2">
                  {program.schedule.map((item: string, i: number) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/30"
                    >
                      <Clock
                        className={`w-4 h-4 ${isPurple ? "text-purple-400" : "text-amber-400"}`}
                      />
                      <span className="text-sm text-slate-300">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </section>
        )}

        {/* ===== FEATURES ===== */}
        <section className="py-8 md:py-12 border-t border-slate-800/50">
          <Reveal>
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-black text-white mb-4">
                Program Features
              </h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {program.features.map((feature: string, i: number) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/30"
                  >
                    <CheckCircle2
                      className={`w-4 h-4 ${isPurple ? "text-purple-400" : "text-amber-400"}`}
                    />
                    <span className="text-slate-300 font-medium">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </section>

        {/* ===== WHO IT'S FOR & OUTCOMES ===== */}
        <section className="py-8 md:py-12 border-t border-slate-800/50">
          <Reveal>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div>
                <h2 className="text-xl font-black text-white mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5 text-amber-500" />
                  Who It's For
                </h2>
                <ul className="space-y-2">
                  {program.whoIsItFor.map((item: string, i: number) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm text-slate-300"
                    >
                      <ChevronRight
                        className={`w-4 h-4 ${isPurple ? "text-purple-400" : "text-amber-400"} shrink-0 mt-0.5`}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="text-xl font-black text-white mb-4 flex items-center gap-2">
                  <Award className="w-5 h-5 text-purple-400" />
                  Program Outcomes
                </h2>
                <ul className="space-y-2">
                  {program.outcomes.map((item: string, i: number) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm text-slate-300"
                    >
                      <ChevronRight
                        className={`w-4 h-4 ${isPurple ? "text-purple-400" : "text-amber-400"} shrink-0 mt-0.5`}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </section>

        {/* ===== CTA ===== */}
        <section className="py-12 md:py-16">
          <Reveal>
            <div className="max-w-3xl mx-auto text-center p-8 md:p-10 rounded-3xl bg-gradient-to-br from-purple-600/10 to-amber-500/10">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-600 to-amber-500 flex items-center justify-center mx-auto mb-4 shadow-xl shadow-purple-500/30">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-black text-white mb-3">
                Ready to Join {program.title}?
              </h2>
              <p className="text-slate-300 mb-5 max-w-md mx-auto">
                Begin your journey to Quranic excellence today.
              </p>
              <Link href="/onsite/admissions">
                <Button className="rounded-full px-8 py-4 font-black bg-gradient-to-r from-purple-600 to-amber-500 text-white shadow-lg shadow-purple-500/20 hover:shadow-xl transition-all">
                  Apply Now
                  <ArrowRight className="w-4 h-4 ml-2 inline" />
                </Button>
              </Link>
            </div>
          </Reveal>
        </section>
      </div>
    </main>
  );
}
