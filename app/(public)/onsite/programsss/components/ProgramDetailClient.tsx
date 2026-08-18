// app/(marketing)/onsite/programs/components/ProgramDetailClient.tsx
"use client";

import { Reveal } from "@/components/shared/section-animation";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  Calendar,
  Users,
  BookOpen,
  Heart,
  Shield,
  Crown,
  Sparkles,
  Sun,
  Moon,
  Home,
  GraduationCap,
  MapPin,
  Phone,
  Mail,
  Send,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface ProgramData {
  title: string;
  subtitle: string;
  icon: React.ElementType;
  color: "purple" | "amber";
  schedule: string;
  time: string;
  badge: string;
  description: string;
  features: string[];
  curriculum: string[];
  price: string;
  slug: string;
  audience: string;
}

interface ProgramDetailClientProps {
  program: ProgramData;
}

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

export function ProgramDetailClient({ program }: ProgramDetailClientProps) {
  const Icon = program.icon;
  const colors = getColorStyles(program.color);
  const isPurple = program.color === "purple";

  // Features for display
  const featuresList = [
    { icon: Clock, label: program.schedule, color: program.color },
    { icon: Calendar, label: program.time, color: program.color },
    { icon: Users, label: "Small Groups", color: program.color },
    { icon: BookOpen, label: "Tahfeedh Focus", color: program.color },
  ];

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
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 text-amber-500 font-black text-xs uppercase tracking-wider">
                  <GraduationCap className="w-4 h-4" />
                  {program.badge} Programme
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tighter font-heading leading-[1.1] text-white">
                  {program.title}
                  <span className="block bg-gradient-to-r from-purple-400 to-amber-400 bg-clip-text text-transparent text-3xl md:text-4xl mt-2">
                    {program.subtitle}
                  </span>
                </h1>
                <p className="text-lg text-slate-300 leading-relaxed">
                  {program.description}
                </p>

                {/* Quick Info */}
                <div className="grid grid-cols-2 gap-3">
                  {featuresList.map((item, idx) => {
                    const ItemIcon = item.icon;
                    const itemColors = getColorStyles(item.color);
                    return (
                      <div
                        key={idx}
                        className={`flex items-center gap-2 p-3 rounded-xl ${itemColors.bg} border ${itemColors.border}`}
                      >
                        <ItemIcon className={`w-4 h-4 ${itemColors.text}`} />
                        <span className="text-xs text-slate-300">
                          {item.label}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* CTA */}
                <div className="flex flex-wrap gap-4 pt-4">
                  <Link href={`/onsite/register?program=${program.slug}`}>
                    <Button className="rounded-full px-8 py-4 font-black bg-gradient-to-r from-purple-600 to-amber-500 hover:from-purple-700 hover:to-amber-600 text-white shadow-lg shadow-purple-500/20 hover:shadow-xl transition-all group">
                      Register Now
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                  <Link href="/onsite/contact">
                    <Button
                      variant="outline"
                      className="rounded-full px-8 py-4 font-black border-slate-700 text-slate-300 hover:bg-slate-800/50 transition-all"
                    >
                      Ask a Question
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Program Card */}
              <div className="p-6 md:p-8 rounded-3xl bg-slate-900/30 hover:bg-slate-900/50 transition-all">
                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${colors.gradient} flex items-center justify-center mx-auto mb-4 shadow-lg ${colors.glow}`}
                >
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-black text-white text-center">
                  {program.title}
                </h3>
                <p className="text-sm text-slate-400 text-center mt-1">
                  {program.schedule}
                </p>

                <div className="mt-6 space-y-3">
                  {program.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-sm">
                      <CheckCircle2
                        className={`w-4 h-4 ${colors.text} shrink-0`}
                      />
                      <span className="text-slate-300">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t border-slate-800/50 text-center">
                  <p className="text-xs text-slate-400">Tuition</p>
                  <p className={`text-2xl font-black ${colors.text}`}>
                    {program.price}
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* ===== CURRICULUM ===== */}
        <section className="py-12 md:py-16 border-t border-slate-800/50">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <Reveal>
              <div className="flex items-center justify-center gap-3 mb-3">
                <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-purple-500" />
                <span className="text-purple-400 font-black text-xs uppercase tracking-wider flex items-center gap-2">
                  <BookOpen className="w-3 h-3" />
                  Curriculum
                </span>
                <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-purple-500" />
              </div>
              <h2 className="text-2xl md:text-3xl font-black text-white">
                What You'll Learn
              </h2>
            </Reveal>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {program.curriculum.map((item, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <Reveal key={idx} delay={idx * 0.05}>
                  <div
                    className={`flex items-center gap-3 p-4 rounded-xl ${
                      isEven
                        ? "bg-purple-600/10 border border-purple-800/30"
                        : "bg-amber-500/10 border border-amber-800/30"
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full ${
                        isEven ? "bg-purple-600/20" : "bg-amber-500/20"
                      } flex items-center justify-center shrink-0`}
                    >
                      <span
                        className={`text-xs font-black ${isEven ? "text-purple-400" : "text-amber-400"}`}
                      >
                        {idx + 1}
                      </span>
                    </div>
                    <span className="text-sm text-slate-300">{item}</span>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </section>

        {/* ===== WHY CHOOSE ===== */}
        <section className="py-12 md:py-16 border-t border-slate-800/50">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <Reveal>
              <div className="flex items-center justify-center gap-3 mb-3">
                <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-amber-500" />
                <span className="text-amber-500 font-black text-xs uppercase tracking-wider flex items-center gap-2">
                  <Heart className="w-3 h-3" />
                  Why Choose This Programme
                </span>
                <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-amber-500" />
              </div>
            </Reveal>
          </div>

          <div className="grid sm:grid-cols-2 gap-5 max-w-4xl mx-auto">
            {[
              {
                icon: Shield,
                title: "Authentic Sanad",
                description: "Unbroken chain to Prophet Muhammad (ﷺ)",
                color: "purple",
              },
              {
                icon: Crown,
                title: "Ijazah Track",
                description: "Formal certification upon completion",
                color: "amber",
              },
              {
                icon: Users,
                title: "Community Learning",
                description: "Grow together with fellow students",
                color: "purple",
              },
              {
                icon: Heart,
                title: "Spiritual Growth",
                description: "Character development and Islamic values",
                color: "amber",
              },
            ].map((item, idx) => {
              const ItemIcon = item.icon;
              const itemColors = getColorStyles(item.color);
              return (
                <Reveal key={idx} delay={idx * 0.1}>
                  <div className="flex items-start gap-4 p-5 rounded-2xl hover:bg-slate-900/30 transition-all group">
                    <div
                      className={`w-12 h-12 rounded-xl ${itemColors.bg} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}
                    >
                      <ItemIcon className={`w-6 h-6 ${itemColors.text}`} />
                    </div>
                    <div>
                      <h3 className={`font-black text-lg ${itemColors.text}`}>
                        {item.title}
                      </h3>
                      <p className="text-sm text-slate-400">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </section>

        {/* ===== FAQ ===== */}
        <section className="py-12 md:py-16 border-t border-slate-800/50">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <Reveal>
              <div className="flex items-center justify-center gap-3 mb-3">
                <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-purple-500" />
                <span className="text-purple-400 font-black text-xs uppercase tracking-wider flex items-center gap-2">
                  <Sparkles className="w-3 h-3" />
                  FAQs
                </span>
                <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-purple-500" />
              </div>
              <h2 className="text-2xl md:text-3xl font-black text-white">
                Common Questions
              </h2>
            </Reveal>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {[
              {
                q: "What are the entry requirements?",
                a: "Students should have basic Quran reading ability. A placement assessment is conducted to determine the appropriate starting level.",
              },
              {
                q: "How is progress tracked?",
                a: "Regular assessments, teacher feedback, and progress reports are provided to monitor memorization and recitation improvement.",
              },
              {
                q: "What materials are provided?",
                a: "All learning materials, including Mushafs, Tajweed guides, and digital resources are provided.",
              },
              {
                q: "Can I switch between programmes?",
                a: "Yes, students can transition between programmes based on their progress and needs with guidance from teachers.",
              },
            ].map((faq, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <Reveal key={idx} delay={idx * 0.05}>
                  <div
                    className={`p-5 rounded-2xl ${
                      isEven
                        ? "bg-purple-600/5 border border-purple-800/30"
                        : "bg-amber-500/5 border border-amber-800/30"
                    }`}
                  >
                    <h3
                      className={`font-black text-sm ${isEven ? "text-purple-400" : "text-amber-400"} mb-2`}
                    >
                      {faq.q}
                    </h3>
                    <p className="text-sm text-slate-400">{faq.a}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </section>

        {/* ===== CTA ===== */}
        <section className="py-12 md:py-16">
          <Reveal>
            <div className="max-w-3xl mx-auto text-center p-8 md:p-10 rounded-3xl bg-gradient-to-br from-purple-600/10 to-amber-500/10">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-600 to-amber-500 flex items-center justify-center mx-auto mb-4 shadow-xl shadow-purple-500/30">
                <GraduationCap className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-black text-white mb-3">
                Ready to Begin Your Journey?
              </h2>
              <p className="text-slate-300 mb-5 max-w-md mx-auto">
                Join the {program.title} programme and start your path to
                Quranic excellence.
              </p>
              <Link href={`/onsite/register?program=${program.slug}`}>
                <Button className="rounded-full px-8 py-4 font-black bg-gradient-to-r from-purple-600 to-amber-500 text-white shadow-lg shadow-purple-500/20 hover:shadow-xl transition-all">
                  Register Now
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
