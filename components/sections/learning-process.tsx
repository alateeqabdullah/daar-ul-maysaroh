"use client";

import { Reveal } from "@/components/shared/section-animation";
import {
  UserCheck,
  BookOpen,
  GraduationCap,
  Award,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

const STEPS = [
  {
    title: "Scholarly Assessment",
    desc: "Every student begins with a private 1-on-1 assessment by our Dean to evaluate makharij and hifz level.",
    icon: UserCheck,
    tag: "Tashkhis",
  },
  {
    title: "Scholar Matching",
    desc: "Based on your assessment, the Scholarly Council assigns a teacher best suited to your recitation style.",
    icon: BookOpen,
    tag: "Tawfiq",
  },
  {
    title: "Guided Majlis",
    desc: "Enter your private digital sanctuary for live sessions. Every ayah is tracked with precision in your portal.",
    icon: GraduationCap,
    tag: "Tarbiyah",
  },
  {
    title: "Ijazah Certification",
    desc: "Undergo the final exam (Ikhtibar) to receive your verified Sanad and certification of excellence.",
    icon: Award,
    tag: "Ijazah",
  },
];

export function LearningProcess() {
  return (
    <section className="py-32 relative overflow-hidden bg-muted/10">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mb-24">
          <Reveal>
            <h2 className="text-5xl lg:text-7xl font-black tracking-tighter font-heading leading-tight mb-6">
              The Scholarly <br />
              <span className="text-primary-700 italic">Path.</span>
            </h2>
            <p className="text-xl text-muted-foreground font-medium max-w-xl">
             {` Our standardized curriculum ensures a disciplined progression from
              the basics of phonetics to the mastery of the Ten Qira'at.`}
            </p>
          </Reveal>
        </div>

        <div className="relative grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Connector Line (Desktop) */}
          <div className="hidden lg:block absolute top-12 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary-700/20 to-transparent -z-10" />

          {STEPS.map((step, i) => (
            <Reveal key={step.title} delay={i * 0.1}>
              <div className="group space-y-6">
                <div className="relative">
                  <div className="w-20 h-20 rounded-[2rem] bg-white dark:bg-slate-900 border-2 border-primary-100 flex items-center justify-center shadow-xl group-hover:border-primary-700 transition-all duration-500 relative z-10">
                    <step.icon className="w-8 h-8 text-primary-700" />
                  </div>
                  <div className="absolute -top-2 -left-2 w-24 h-24 bg-primary-700/5 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="absolute -right-4 top-0 text-6xl font-black text-primary-700/5 pointer-events-none">
                    0{i + 1}
                  </span>
                </div>

                <div className="space-y-2">
                  <p className="text-[10px] font-black text-gold uppercase tracking-[0.3em]">
                    {step.tag}
                  </p>
                  <h3 className="text-xl font-black uppercase tracking-tight">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground font-medium leading-relaxed">
                    {step.desc}
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
