import { Reveal } from "@/components/shared/section-animation";
import {
  ShieldCheck,
  CheckCircle,
  BookOpen,
  ScrollText,
  ArrowRight,
  Lightbulb,
} from "lucide-react";

export default function AboutPage() {
  return (
    <main className="pt-40 pb-20">
      <div className="container mx-auto px-6">
        {/* SECTION 1: THE VISION */}
        <div className="grid lg:grid-cols-2 gap-20 items-center mb-40">
          <Reveal>
            <div className="space-y-8">
              <h1 className="text-7xl lg:text-9xl font-black tracking-tighter font-heading leading-tight">
                The Divine <br />
                <span className="text-primary-700 italic">Sanctuary.</span>
              </h1>
              <p className="text-2xl text-muted-foreground font-medium leading-relaxed">
               {` Al-Maysaroh Institute bridges the gap between the classical
                scholarly rigor methods and the 21st-century digital world.
                We don't just teach books; we preserve the light of the Quran.`}
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <h4 className="font-black uppercase text-sm tracking-widest">
                    Our Mission
                  </h4>
                  <p className="text-sm text-muted-foreground font-medium">
                    To produce Huffadh who embody the Quranic character in every
                    facet of life.
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-black uppercase text-sm tracking-widest">
                    Our Legacy
                  </h4>
                  <p className="text-sm text-muted-foreground font-medium">
                    Preserving a Sanad (Chain) that has remained unbroken for
                    1,400 years.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="relative aspect-square glass-surface rounded-[4rem] border shadow-2xl flex items-center justify-center p-12 overflow-hidden">
              <div className="quran-monumental opacity-10 absolute scale-150 rotate-12 -z-10">
                بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
              </div>
              <div className="text-center space-y-6">
                <Lightbulb className="w-12 h-12 text-gold mx-auto" />
                <p className="text-3xl font-heading italic text-balance leading-snug">
                 {` "A generation that carries the Word, and lives its Light."`}
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        {/* SECTION 2: THE 4 PILLARS (METHODOLOGY) */}
        <div className="text-center mb-20">
          <h2 className="text-4xl font-black uppercase tracking-tighter mb-4">
            The Al-Maysaroh Method
          </h2>
          <p className="text-muted-foreground font-medium">
            Our scientific approach to Quranic mastery.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-40">
          {[
            {
              t: "Makharij",
              d: "The biology of articulation. Correcting every sound.",
              i: ShieldCheck,
            },
            {
              t: "Itqan",
              d: "Advanced memorization with 'fixed' precision.",
              i: CheckCircle,
            },
            {
              t: "Tafakkur",
              d: "Understanding the depth of the Divine message.",
              i: BookOpen,
            },
            {
              t: "Sanad",
              d: "Connecting your voice to a lineage of scholars.",
              i: ScrollText,
            },
          ].map((pillar, i) => (
            <Reveal key={pillar.t} delay={i * 0.1}>
              <div className="institutional-card p-10 text-center space-y-4 h-full">
                <pillar.i className="w-10 h-10 text-primary-700 mx-auto" />
                <h3 className="text-lg font-black uppercase tracking-widest">
                  {pillar.t}
                </h3>
                <p className="text-xs text-muted-foreground font-bold leading-relaxed">
                  {pillar.d}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* SECTION 3: THE LEARNING ROADMAP */}
        <div className="glass-surface p-12 lg:p-24 rounded-[4rem] border shadow-2xl">
          <div className="max-w-3xl mb-16">
            <h2 className="text-4xl font-black uppercase tracking-tighter mb-4">
              Your Journey to Ijazah
            </h2>
            <p className="text-muted-foreground font-medium">
              A structured path from beginner to verified carrier of the Quran.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-16 relative">
            <div className="hidden lg:block absolute top-12 left-0 w-full h-px bg-primary-100 dark:bg-primary-900 -z-10" />

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
              <div
                key={phase.lvl}
                className="space-y-8 bg-background p-8 rounded-3xl border shadow-sm"
              >
                <div className="w-12 h-12 rounded-full bg-primary-700 text-white flex items-center justify-center font-black">
                  0{i + 1}
                </div>
                <h4 className="text-xl font-black uppercase tracking-tight">
                  {phase.lvl}
                </h4>
                <ul className="space-y-4">
                  {phase.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-3 text-sm font-bold text-muted-foreground"
                    >
                      <ArrowRight className="w-4 h-4 text-gold" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
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
