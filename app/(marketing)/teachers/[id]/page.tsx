

import { Reveal } from "@/components/shared/section-animation";
import {
  Award,
  ShieldCheck,
  BookOpen,
  ScrollText,
  GraduationCap,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ScholarProfilePage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <main className="pt-40 pb-20">
      <div className="container mx-auto px-6">
        <Link
          href="/teachers"
          className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-primary-700 transition-colors mb-12"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Faculty
        </Link>

        <div className="grid lg:grid-cols-12 gap-16">
          {/* LEFT: Portrait & Brief */}
          <div className="lg:col-span-4 space-y-8">
            <div className="aspect-[3/4] bg-muted rounded-[3rem] border-8 border-white dark:border-slate-800 shadow-3xl overflow-hidden relative">
              <div className="absolute inset-0 flex items-center justify-center opacity-10">
                <GraduationCap className="w-32 h-32" />
              </div>
            </div>
            <div className="institutional-card p-8 space-y-6">
              <h4 className="font-black uppercase text-xs tracking-widest border-b pb-4">
                Scholarly Rank
              </h4>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center text-gold">
                  <Award className="w-6 h-6" />
                </div>
                <p className="font-bold text-sm">
              {`    Grand Ijazah Holder in 10 Qira'at`}
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT: The Sanad & History */}
          <div className="lg:col-span-8 space-y-12">
            <div className="space-y-4">
              <h2 className="text-5xl font-black tracking-tighter uppercase">
                Scholarly Profile
              </h2>
              <p className="text-xl text-muted-foreground font-medium leading-relaxed italic">
               {` "The Quran is a trust passed from heart to heart. My mission is
                to ensure that trust is delivered with perfection."`}
              </p>
            </div>

            {/* THE SANAD TREE (Elite Visual) */}
            <div className="glass-surface p-10 lg:p-16 rounded-[4rem] border shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5 font-quran text-8xl">
                سند
              </div>
              <h3 className="text-xl font-black uppercase tracking-[0.2em] mb-12 flex items-center gap-3">
                <ScrollText className="text-primary-700" /> Authentic Scholarly
                Lineage
              </h3>

              <div className="space-y-8 relative">
                <div className="absolute left-[1.45rem] top-2 h-full w-px bg-gradient-to-b from-primary-700 to-transparent opacity-20" />

                {[
                  {
                    role: "Current Scholar",
                    name: "Sheikh Dr. Ahmad Al-Maysari",
                  },
                  {
                    role: "Authorized by",
                    name: "Sheikh Muhammad Kurayyim Rajih (Dean of Syrian Reciters)",
                  },
                  {
                    role: "Lineage Path",
                    name: "Continuous Chain to the Sahaba (RA)",
                  },
                  { role: "Source", name: "The Prophet Muhammad (ﷺ)" },
                ].map((link, i) => (
                  <div key={i} className="flex gap-8 items-center group">
                    <div className="w-12 h-12 rounded-full bg-background border-2 border-primary-700 flex items-center justify-center relative z-10 shadow-xl group-hover:scale-110 transition-transform">
                      <div className="w-2 h-2 rounded-full bg-primary-700" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest opacity-40">
                        {link.role}
                      </p>
                      <p className="text-lg font-bold">{link.name}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="institutional-card p-10">
                <h4 className="font-black text-sm uppercase mb-6 tracking-widest">
                  Academic History
                </h4>
                <ul className="space-y-4">
                  {[
                    "PhD in Quranic Sciences",
                    "Ijazah in Ashara Sughra",
                    "20+ Years at Al-Azhar",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-3 text-sm font-bold text-muted-foreground"
                    >
                      <ShieldCheck className="w-4 h-4 text-accent" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="institutional-card p-10 bg-primary-700 text-white">
                <h4 className="font-black text-sm uppercase mb-6 tracking-widest">
                  Student Match
                </h4>
                <p className="text-sm font-medium leading-relaxed opacity-90">
                 {` Best suited for Advanced Hifz students and those seeking
                  Ijazah in specific Qira'at styles.`}
                </p>
                <Button className="w-full mt-8 bg-white text-primary-700 font-black text-[10px] tracking-widest uppercase rounded-xl">
                  Request Assignment
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}