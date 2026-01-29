"use client";

import { Reveal } from "@/components/shared/section-animation";
import { GraduationCap, Verified, ShieldCheck, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const PREVIEW_TEACHERS = [
  {
    name: "Sheikh Dr. Ahmad Al-Maysari",
    rank: "Dean of Faculty",
    credentials: "PhD Al-Azhar, Ijazah in 10 Qira'at",
    philosophy: "Preserving the trust of the Divine Word.",
  },
  {
    name: "Ustadha Fatima Zahra",
    rank: "Head of Female Hifz",
    credentials: "Verified Sanad in Hafs 'an 'Asim",
    philosophy: "Nurturing hearts through the Quranic Sunnah.",
  },
];

export function Teachers() {
  return (
    <section className="py-32 bg-background relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between md:items-end gap-8 mb-24">
          <div className="max-w-2xl space-y-6">
            <Reveal>
              <div className="inline-flex items-center gap-2 text-gold font-black text-[10px] uppercase tracking-[0.3em]">
                <ShieldCheck className="w-4 h-4" /> Unbroken Scholarly Lineage
              </div>
              <h2 className="text-6xl lg:text-8xl font-black tracking-tighter font-heading leading-tight">
                Carriers of <br />
                <span className="text-primary-700 italic">The Sanad.</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.2}>
            <Link href="/teachers">
              <Button
                variant="outline"
                className="h-16 px-10 rounded-2xl border-2 font-black text-xs tracking-widest uppercase hover:bg-primary-700 hover:text-white transition-all"
              >
                View Full Faculty <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </Reveal>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {PREVIEW_TEACHERS.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.1}>
              <div className="institutional-card p-12 relative group bg-card hover:border-primary-700/50 transition-all duration-700">
                <div className="flex flex-col lg:flex-row gap-8 items-start">
                  {/* Portrait Placeholder */}
                  <div className="w-full p-8 lg:w-40 h-56 bg-muted/50 rounded-8xl overflow-hidden relative border border-border group-hover:border-primary-700/20">
                    <div className="absolute inset-0 flex items-center justify-center opacity-10">
                      <GraduationCap className="w-12 h-12" />
                    </div>
                  </div>

                  <div className="flex-1 space-y-4">
                    <div>
                      <h3 className="text-2xl font-black tracking-tight group-hover:text-primary-700 transition-colors uppercase">
                        {t.name}
                      </h3>
                      <p className="text-primary-700 font-black text-[9px] uppercase tracking-[0.2em] mt-1">
                        {t.rank}
                      </p>
                    </div>
                    <p className="text-sm font-bold text-muted-foreground">
                      {t.credentials}
                    </p>
                    <p className="text-xs italic font-medium text-muted-foreground opacity-80 leading-relaxed">
                      "{t.philosophy}"
                    </p>
                    <div className="pt-4 flex items-center gap-2">
                      <Verified className="w-4 h-4 text-accent" />
                      <span className="text-[8px] font-black uppercase tracking-widest text-accent">
                        Ijazah Verified
                      </span>
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
