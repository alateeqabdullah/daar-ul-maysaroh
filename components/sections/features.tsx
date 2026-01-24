import { Reveal } from "@/components/shared/section-animation";
import {
  ShieldCheck,

  Clock,
  Users,
  Zap,
  Globe,
 
} from "lucide-react";

const PILLARS = [
  {
    title: "Sanad Preservation",
    desc: "Connect your voice to a lineage of scholars reaching back 1,400 years to the Prophet (ﷺ).",
    icon: ShieldCheck,
    tag: "Traditional",
  },
  {
    title: "1-on-1 Academic Rigor",
    desc: "Personalized sessions with Ijazah-certified scholars. Undivided attention to your phonetics.",
    icon: Users,
    tag: "Exclusive",
  },
  {
    title: "Digital Sanctuary",
    desc: "A proprietary portal designed for scholarly focus. Track every surah, ayah, and mistake live.",
    icon: Globe,
    tag: "Modern",
  },
  {
    title: "Adaptive Scheduling",
    desc: "Access scholars across multiple timezones. Structure your path around your professional life.",
    icon: Clock,
    tag: "Flexible",
  },
];

export function Features() {
  return (
    <section className="py-32 bg-background relative">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="max-w-4xl mb-24 space-y-6">
          <Reveal>
            <div className="inline-flex items-center gap-2 text-primary-700 font-black text-[10px] uppercase tracking-[0.3em]">
              <Zap className="w-4 h-4" /> The Al-Maysaroh Advantage
            </div>
            <h2 className="text-6xl lg:text-8xl font-black tracking-tighter font-heading leading-tight">
              Pillars of <br />
              <span className="text-primary-700 italic">Excellence.</span>
            </h2>
            <p className="text-xl text-muted-foreground font-medium max-w-xl border-l-4 border-gold pl-6">
              Our methodology combines the spiritual depth of traditional
              madrasahs with the efficiency of modern technology.
            </p>
          </Reveal>
        </div>

        {/* Pillars Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {PILLARS.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.1}>
              <div className="institutional-card p-10 h-full flex flex-col group hover:border-primary-700/50 transition-all duration-500">
                <div className="mb-8">
                  <div className="w-14 h-14 rounded-2xl bg-primary-50 dark:bg-primary-950/40 flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner">
                    <p.icon className="w-7 h-7 text-primary-700" />
                  </div>
                </div>

                <p className="text-[10px] font-black text-primary-700 uppercase tracking-widest mb-2 opacity-50">
                  {p.tag}
                </p>
                <h3 className="text-2xl font-black uppercase tracking-tight mb-4">
                  {p.title}
                </h3>
                <p className="text-sm text-muted-foreground font-medium leading-relaxed mb-8 flex-grow">
                  {p.desc}
                </p>

                <div className="pt-6 border-t border-border/50">
                  <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary-700 opacity-0 group-hover:opacity-100 transition-opacity">
                    Learn More <ChevronRight className="w-3 h-3" />
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

function ChevronRight(props: any) {
  return (
    <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={3}
        d="M9 5l7 7-7 7"
      />
    </svg>
  );
}
