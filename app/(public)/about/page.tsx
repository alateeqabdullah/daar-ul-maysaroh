"use client";

import { Reveal } from "@/components/shared/section-animation";
import {
  ShieldCheck,
  CheckCircle,
  BookOpen,
  ScrollText,
  ArrowRight,
  Lightbulb,
  Sparkles,
  ChevronRight,
  Heart,
  Users,
  Globe,
  GraduationCap,
  Star,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="relative pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 md:pb-20 overflow-hidden bg-background">
      {/* Visual Depth Blobs - Mobile optimized */}
      <div className="absolute top-0 right-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-primary-700/5 rounded-full blur-[80px] sm:blur-[120px] -z-10" />
      <div className="absolute bottom-1/2 -left-20 w-[250px] sm:w-[400px] h-[250px] sm:h-[400px] bg-gold/5 rounded-full blur-[80px] sm:blur-[100px] -z-10" />

      <div className="container mx-auto px-4 sm:px-6">
        {/* Breadcrumb */}
        <div className="text-xs sm:text-sm text-muted-foreground mb-6 sm:mb-8">
          <Link href="/" className="hover:text-primary-700 transition-colors">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-primary-700 font-medium">About</span>
        </div>

        {/* SECTION 1: THE VISION */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-24 items-center mb-24 sm:mb-32 lg:mb-40">
          <Reveal>
            <div className="space-y-6 sm:space-y-8 lg:space-y-10">
              <div className="inline-flex items-center gap-2 text-primary-700 font-black text-[10px] uppercase tracking-[0.3em] bg-primary-50 px-4 py-2 rounded-full border border-primary-700/10">
                <Sparkles className="w-3 h-3" /> Our Philosophical Foundation
              </div>

              {/* <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tighter font-heading leading-[1.1] sm:leading-[0.95]">
                The Divine <br />
                <span className="text-primary-700 italic">Sanctuary.</span>
              </h1>

              <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground font-medium leading-relaxed border-l-4 border-gold pl-4 sm:pl-6 lg:pl-8">
                Al-Maysaroh Institute bridges the gap between classical
                scholarly rigor and the 21st-century digital world. We don't
                just teach books; we preserve the light of the Quran.
              </p> */}

              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter font-heading leading-[0.9]">
                Preserving the{" "}
                <span className="text-primary-700 italic">Word</span>
                <br />
                {" "}of Allah
              </h1>

              {/* ✅ Your Descriptive Paragraph - Perfect here! */}
              <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-2xl leading-relaxed">
                Al-Maysaroh International Institute is a sanctuary of sacred
                knowledge, dedicated to preserving the authentic transmission of
                the Quran through an unbroken chain of scholarship.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 pt-2 sm:pt-4">
                <div className="group p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-card border border-primary-700/10 hover:border-primary-700/30 transition-all">
                  <h4 className="font-black uppercase text-[10px] tracking-[0.3em] text-primary-700 mb-2 sm:mb-3">
                    Our Mission
                  </h4>
                  <p className="text-sm text-muted-foreground font-bold leading-relaxed">
                    To produce Huffadh who embody the Quranic character in every
                    facet of life.
                  </p>
                </div>
                <div className="group p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-card border border-primary-700/10 hover:border-primary-700/30 transition-all">
                  <h4 className="font-black uppercase text-[10px] tracking-[0.3em] text-primary-700 mb-2 sm:mb-3">
                    Our Legacy
                  </h4>
                  <p className="text-sm text-muted-foreground font-bold leading-relaxed">
                    Preserving a Sanad (Chain) that has remained unbroken for
                    1,400 years.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="relative aspect-square">
              <div className="absolute inset-0 border-2 border-gold/20 rounded-[3rem] sm:rounded-[4rem] rotate-3 -z-10" />

              <div className="relative h-full glass-surface rounded-[3rem] sm:rounded-[4rem] border shadow-royal flex items-center justify-center p-8 sm:p-12 overflow-hidden bg-card/40 backdrop-blur-3xl">
                <div className="quran-monumental opacity-5 absolute scale-125 rotate-12 pointer-events-none select-none text-4xl sm:text-6xl whitespace-nowrap">
                  بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
                </div>

                <div className="text-center space-y-6 sm:space-y-8 relative z-10">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gold/10 rounded-full flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(212,175,55,0.2)]">
                    <Lightbulb className="w-8 h-8 sm:w-10 sm:h-10 text-gold" />
                  </div>
                  <p className="text-2xl sm:text-3xl lg:text-4xl font-heading italic text-balance leading-tight text-primary-950 dark:text-white">
                    {`"A generation that carries the Word, and lives its Light."`}
                  </p>
                  <div className="h-px w-10 sm:w-12 bg-gold/50 mx-auto" />
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* SECTION 2: CORE VALUES */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-24 sm:mb-32 lg:mb-40">
          {[
            {
              title: "Ikhlas",
              label: "Sincerity",
              desc: "Teaching for the sake of Allah alone.",
              icon: Heart,
            },
            {
              title: "Itqan",
              label: "Excellence",
              desc: "Pursuing perfection in every recitation.",
              icon: Star,
            },
            {
              title: "Amanah",
              label: "Trust",
              desc: "A sacred responsibility to every student.",
              icon: ShieldCheck,
            },
          ].map((val, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="text-center p-8 sm:p-10 rounded-3xl bg-primary-50/30 border border-primary-700/5 group hover:border-gold/30 transition-all">
                <val.icon className="w-10 h-10 text-gold mx-auto mb-5 sm:mb-6" />
                <h3 className="text-xl font-black uppercase tracking-tight">
                  {val.title}
                </h3>
                <p className="text-[10px] font-black uppercase tracking-widest text-primary-700 mb-3 sm:mb-4">
                  {val.label}
                </p>
                <p className="text-sm text-muted-foreground font-medium italic">
                  {val.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* SUGGESTION 1: FOUNDER'S NOTE */}
        <div className="mb-24 sm:mb-32">
          <Reveal>
            <div className="institutional-card p-8 sm:p-10 bg-gradient-to-br from-primary-50/20 to-primary-100/10 border-l-4 border-gold">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-700 to-primary-800 flex items-center justify-center text-white text-2xl font-black shrink-0">
                  أ
                </div>
                <div>
                  <p className="text-lg italic text-muted-foreground mb-3 leading-relaxed">
                    {` "Al-Maysaroh was born from a simple belief: every sincere
                    seeker deserves access to authentic Quranic education
                    without compromise. We don't just teach the Quran—we connect
                    you to its living chain of transmission."`}
                  </p>
                  <p className="font-black">
                    - Shaykh Abubakar Al-Maysariy, Founder
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* SUGGESTION 2: WHY CHOOSE US */}
        <div className="mb-24 sm:mb-32">
          <div className="text-center mb-12">
            <Reveal>
              <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tighter mb-3">
                Why <span className="text-primary-700 italic">Choose Us</span>
              </h2>
              <div className="h-1 w-16 bg-gold mx-auto rounded-full" />
            </Reveal>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: ShieldCheck,
                title: "Authentic Sanad",
                desc: "Unbroken chain to Prophet (ﷺ)",
              },
              {
                icon: Users,
                title: "1-on-1 Instruction",
                desc: "Personalized attention",
              },
              {
                icon: Globe,
                title: "Global Accessibility",
                desc: "Learn from anywhere",
              },
              {
                icon: Clock,
                title: "Flexible Scheduling",
                desc: "Balance your life",
              },
            ].map((item, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="text-center p-6 rounded-2xl bg-card border border-primary-700/10 hover:border-primary-700/30 transition-all group">
                  <item.icon className="w-8 h-8 text-primary-700 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                  <h3 className="font-black text-sm uppercase tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    {item.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* SECTION 3: THE 4 PILLARS */}
        <div className="text-center mb-16 sm:mb-20 lg:mb-24 space-y-4">
          <Reveal>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter">
              The Al-Maysaroh{" "}
              <span className="text-primary-700 italic">Method</span>
            </h2>
            <div className="h-1 w-16 sm:w-24 bg-gold mx-auto rounded-full" />
            <p className="text-muted-foreground font-bold uppercase tracking-widest text-xs pt-4">
              Our scientific approach to Quranic mastery.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-24 sm:mb-32 lg:mb-40">
          {[
            {
              t: "Makharij",
              d: "The biology of articulation. Correcting every sound with phonetic precision.",
              i: ShieldCheck,
            },
            {
              t: "Itqan",
              d: "Advanced memorization techniques for 'fixed' and unwavering precision.",
              i: CheckCircle,
            },
            {
              t: "Tafakkur",
              d: "Deep intellectual engagement with the Divine message and its context.",
              i: BookOpen,
            },
            {
              t: "Sanad",
              d: "Connecting your personal voice to a lineage of world-class scholars.",
              i: ScrollText,
            },
          ].map((pillar, i) => (
            <Reveal key={pillar.t} delay={i * 0.1}>
              <div className="institutional-card p-8 sm:p-10 text-center flex flex-col items-center group hover:-translate-y-2 transition-all duration-300">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-primary-50 dark:bg-primary-950/40 flex items-center justify-center mb-5 sm:mb-6 group-hover:bg-primary-700 group-hover:text-white transition-all duration-500">
                  <pillar.i className="w-7 h-7 sm:w-8 sm:h-8 text-primary-700 group-hover:text-white" />
                </div>
                <h3 className="text-base sm:text-lg font-black uppercase tracking-widest mb-3 sm:mb-4">
                  {pillar.t}
                </h3>
                <p className="text-sm text-muted-foreground font-medium leading-relaxed italic">
                  {pillar.d}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* SUGGESTION 3: SANAD BADGE */}
        <div className="flex justify-center mb-12">
          <Reveal>
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-primary-700/5 border border-primary-700/20">
              <ScrollText className="w-5 h-5 text-gold" />
              <span className="text-xs font-black uppercase tracking-wider">
                ✓ Complete Sanad • 1400+ Years Unbroken Chain
              </span>
            </div>
          </Reveal>
        </div>

        {/* SECTION 4: GLOBAL IMPACT - ENHANCED */}
        <div className="mb-24 sm:mb-32 lg:mb-40 py-12 sm:py-16 lg:py-20 border-y border-primary-700/5">
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12 text-center">
            {[
              {
                label: "Students Worldwide",
                val: "100+",
                icon: Users,
                desc: "Growing community",
              },
              {
                label: "Represented Nations",
                val: "5+",
                icon: Globe,
                desc: "Global reach",
              },
              {
                label: "Certified Scholars",
                val: "8+",
                icon: GraduationCap,
                desc: "Ijazah-holders",
              },
              {
                label: "Years of Sanad",
                val: "1400+",
                icon: ScrollText,
                desc: "Unbroken chain",
              },
            ].map((stat, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="space-y-2 sm:space-y-3">
                  <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 text-gold mx-auto opacity-40" />
                  <h4 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter text-primary-700">
                    {stat.val}
                  </h4>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
                    {stat.label}
                  </p>
                  <p className="text-[8px] text-muted-foreground/50">
                    {stat.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* SUGGESTION 5: COMMITMENT BANNER */}
        <div className="mb-24 sm:mb-32">
          <Reveal>
            <div className="p-6 rounded-2xl bg-primary-700/5 border border-primary-700/10 text-center">
              <p className="text-sm font-medium text-muted-foreground">
                <span className="font-black text-primary-700">
                  Our Commitment:
                </span>{" "}
                Every student receives a personalized learning plan, progress
                tracking, and direct access to Ijazah-certified scholars.
              </p>
            </div>
          </Reveal>
        </div>

        {/* SECTION 5: THE LEARNING ROADMAP */}
        <div className="relative institutional-card p-6 sm:p-8 lg:p-20 xl:p-24 bg-card/30 backdrop-blur-md border-primary-700/10 overflow-hidden mb-20">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-primary-700 via-gold to-primary-700" />

          <div className="max-w-3xl mb-12 sm:mb-16 lg:mb-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter mb-3 sm:mb-4 leading-tight">
              Your Journey <br />
              <span className="text-primary-700 italic">to Ijazah</span>
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground font-medium">
              A structured path from beginner to verified carrier of the Quran.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12 relative">
            <div className="hidden lg:block absolute top-10 left-0 w-full h-px bg-primary-700/10 -z-10" />

            {[
              {
                lvl: "Phase 01: Foundation",
                items: [
                  "Qaida Noorania Mastery",
                  "Basic Makharij Alignment",
                  "Juz Amma Recitation",
                ],
              },
              {
                lvl: "Phase 02: Intermediate",
                items: [
                  "Full Tajweed Science",
                  "Juz Amma & Tabarak Hifz",
                  "Introduction to Sarf",
                ],
              },
              {
                lvl: "Phase 03: Ijazah Track",
                items: [
                  "Full Quran Hifz",
                  "Mutashabihat Mastery",
                  "Sanad Certification",
                ],
              },
            ].map((phase, i) => (
              <Reveal key={phase.lvl} delay={i * 0.1}>
                <div className="relative space-y-5 sm:space-y-6 bg-background/80 p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-primary-700/5 shadow-xl hover:shadow-royal transition-all group">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-primary-700 text-white flex items-center justify-center font-black text-lg sm:text-xl shadow-lg group-hover:scale-110 transition-transform">
                    0{i + 1}
                  </div>

                  <div>
                    <h4 className="text-lg sm:text-xl font-black uppercase tracking-tight mb-4 sm:mb-6 group-hover:text-primary-700 transition-colors">
                      {phase.lvl}
                    </h4>
                    <ul className="space-y-3 sm:space-y-4">
                      {phase.items.map((item) => (
                        <li
                          key={item}
                          className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm font-bold text-muted-foreground"
                        >
                          <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gold shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* SUGGESTION 6: SOCIAL PROOF */}
        <div className="flex flex-wrap justify-center gap-6 mb-10">
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} className="w-4 h-4 fill-gold text-gold" />
            ))}
            <span className="text-sm font-black">4.9</span>
          </div>
          <div className="w-px h-6 bg-border hidden sm:block" />
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-primary-700" />
            <span className="text-sm font-black">100+ Active Students</span>
          </div>
          <div className="w-px h-6 bg-border hidden sm:block" />
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-primary-700" />
            <span className="text-sm font-black">6+ Countries</span>
          </div>
        </div>

        {/* FINAL CTA */}
        <div className="flex flex-col items-center text-center">
          <Reveal>
            <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tighter mb-5 sm:mb-6">
              Start Your Path to Hifz Today
            </h3>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Link href="/admissions">
                <Button className="px-6 sm:px-8 lg:px-10 py-4 sm:py-5 rounded-full bg-primary-700 hover:bg-primary-800 text-white font-black uppercase text-[10px] sm:text-xs tracking-widest shadow-royal transition-all flex items-center gap-2 sm:gap-3">
                  Enroll Now{" "}
                  <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  variant="outline"
                  className="px-6 sm:px-8 lg:px-10 py-4 sm:py-5 rounded-full border-2 border-primary-700 text-primary-700 font-black uppercase text-[10px] sm:text-xs tracking-widest hover:bg-primary-50 transition-all"
                >
                  Speak to an Advisor
                </Button>
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </main>
  );
}




// import { ArrowRight, BookOpen, CheckCircle, ScrollText, ShieldCheck } from "lucide-react";

// export default function MethodologyPage() {
//   return (
//     <main className="pt-40 pb-20">
//       <div className="container mx-auto px-6">
//         <div className="max-w-4xl mb-32 space-y-10">
//           <h1 className="text-7xl lg:text-9xl font-black tracking-tighter font-heading leading-tight">
//             The Sacred <br />
//             <span className="text-primary-700 italic">Methodology.</span>
//           </h1>
//           <p className="text-2xl text-muted-foreground font-medium leading-relaxed">
//             We do not just teach memorization; we teach the preservation of the
//             Divine Word through a structured, multi-sensory academic framework.
//           </p>
//         </div>

//         {/* The 4 Pillars of Al-Maysaroh */}
//         <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-40">
//           {[
//             {
//               title: "Makharij",
//               desc: "Perfecting the origin of every letter.",
//               icon: ShieldCheck,
//             },
//             {
//               title: "Itqan",
//               desc: "Achieving precision in memorization.",
//               icon: CheckCircle,
//             },
//             {
//               title: "Tafakkur",
//               desc: "Understanding the meaning of the verses.",
//               icon: BookOpen,
//             },
//             {
//               title: "Sanad",
//               desc: "Connecting to a lineage of scholars.",
//               icon: ScrollText,
//             },
//           ].map((p) => (
//             <div
//               key={p.title}
//               className="institutional-card p-8 text-center space-y-4"
//             >
//               <p.icon className="w-10 h-10 text-primary-700 mx-auto" />
//               <h3 className="text-lg font-black uppercase tracking-tighter">
//                 {p.title}
//               </h3>
//               <p className="text-xs text-muted-foreground font-bold leading-relaxed">
//                 {p.desc}
//               </p>
//             </div>
//           ))}
//         </div>

//         {/* The Learning Journey Roadmap (Visual Section) */}
//         <div className="glass-surface p-12 lg:p-20 rounded-[4rem] border shadow-2xl">
//           <div className="text-center mb-16 space-y-4">
//             <h2 className="text-4xl font-black uppercase tracking-tighter">
//               Your Learning Journey
//             </h2>
//             <p className="text-muted-foreground font-medium">
//               A standardized path from Beginner to Ijazah.
//             </p>
//           </div>

//           <div className="grid lg:grid-cols-3 gap-12 relative">
//             {/* Add SVG arrows or lines between these in real world */}
//             {[
//               {
//                 title: "Level 1: Foundation",
//                 items: ["Qaida Noorania", "Basic Makharij", "Short Surahs"],
//               },
//               {
//                 title: "Level 2: Intermediate",
//                 items: [
//                   "Full Tajweed Rules",
//                   "Juz Amma & Tabarak",
//                   "Tafsir Basics",
//                 ],
//               },
//               {
//                 title: "Level 3: Ijazah Track",
//                 items: [
//                   "Full Hifz",
//                   "Advanced Mutashabihat",
//                   "Sanad Certification",
//                 ],
//               },
//             ].map((lvl, i) => (
//               <div key={lvl.title} className="space-y-6">
//                 <div className="text-6xl font-black text-primary-700/20">
//                   0{i + 1}
//                 </div>
//                 <h4 className="text-xl font-black uppercase">{lvl.title}</h4>
//                 <ul className="space-y-3">
//                   {lvl.items.map((item) => (
//                     <li
//                       key={item}
//                       className="flex items-center gap-2 text-sm font-bold text-muted-foreground"
//                     >
//                       <ArrowRight className="w-4 h-4 text-gold" /> {item}
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// }
