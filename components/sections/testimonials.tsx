"use client";

import { motion } from "framer-motion";
import { Reveal } from "@/components/shared/section-animation";
import { Quote, Star, MapPin, GraduationCap, CheckCircle2 } from "lucide-react";

const TESTIMONIALS = [
  {
    name: "Zaid Al-Hussaini",
    location: "London, UK",
    program: "Hifz Itqan Program",
    scholar: "Sheikh Dr. Ahmad Al-Maysari",
    milestone: "Completed 15 Juz with Ijazah preparation",
    content:
      "The Al-Maysaroh method changed my relationship with the Quran. It wasn't just about memorizing pages; it was about the science of Mutashabihat and correcting makharij I didn't even know were flawed. The 1-on-1 attention is unparalleled.",
    image: null,
  },
  {
    name: "Sarah Benjamin",
    location: "Toronto, Canada",
    program: "Tajweed Mastery",
    scholar: "Ustadha Fatima Zahra",
    milestone: "Mastery of Al-Jazariyyah Phonetics",
    content:
      "As a convert, finding a school that balances traditional scholarly rigor with modern English pedagogical clarity was difficult. Al-Maysaroh provided a sanctuary where I could learn the sacred sciences at a professional academic level.",
    image: null,
  },
  {
    name: "Omar Faridi",
    location: "Doha, Qatar",
    program: "Classical Arabic",
    scholar: "Sheikh Omar Al-Farooq",
    milestone: "Ability to translate 80% of Juz Amma directly",
    content:
      "Studying Nahw and Sarf here is like being in a physical classroom in Cairo or Madinah. The portal makes it so easy to track my progress, and my teacher is a true carrier of the Sanad.",
    image: null,
  },
];

export function Testimonials() {
  return (
    <section className="py-32 bg-muted/10 relative overflow-hidden">
      {/* Visual Artifacts */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary-700/20 to-transparent" />

      <div className="container mx-auto px-6">
        <div className="max-w-4xl mb-24">
          <Reveal>
            <div className="inline-flex items-center gap-2 text-gold font-black text-[10px] uppercase tracking-[0.3em] mb-6">
              <Star className="w-4 h-4 fill-current" /> Voices of the Eternal
              Journey
            </div>
            <h2 className="text-6xl lg:text-8xl font-black tracking-tighter font-heading leading-tight">
              Scholarly <br />
              <span className="text-primary-700 italic">Success.</span>
            </h2>
            <p className="text-xl text-muted-foreground font-medium max-w-xl border-l-4 border-primary-700 pl-6 mt-6">
              Hear from the noble students who have traversed the Al-Maysaroh
              path, from foundational phonetics to verified Ijazah.
            </p>
          </Reveal>
        </div>

        <div className="grid lg:grid-cols-3 gap-10">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.1}>
              <div className="institutional-card p-10 h-full flex flex-col bg-white dark:bg-slate-900 group hover:shadow-primary-700/10 transition-all duration-700">
                <div className="flex items-center justify-between mb-8">
                  <Quote className="w-10 h-10 text-primary-700/20" />
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-gold text-gold" />
                    ))}
                  </div>
                </div>

                <p className="text-lg font-medium leading-relaxed italic text-foreground/80 mb-10 flex-grow">
                 {` "${t.content}"`}
                </p>

                <div className="pt-8 border-t border-border/50 space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary-700/10 flex items-center justify-center font-black text-primary-700">
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-black uppercase tracking-tight text-sm">
                        {t.name}
                      </h4>
                      <p className="text-[10px] font-bold text-muted-foreground flex items-center gap-1">
                        <MapPin className="w-3 h-3" /> {t.location}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2 bg-muted/30 p-4 rounded-2xl">
                    <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-primary-700">
                      <GraduationCap className="w-3.5 h-3.5" /> Program:{" "}
                      {t.program}
                    </div>
                    <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-accent">
                      <CheckCircle2 className="w-3.5 h-3.5" /> {t.milestone}
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
