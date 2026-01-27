import {
  BookOpen,
  Scroll,
  Brain,
  Users,
  Sparkles,
  Award,
  Target,
  Clock,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/shared/section-animation";
import Link from "next/link";

export default function TafsirStudiesPage() {
  return (
    <main className="pt-16 sm:pt-20 md:pt-24 lg:pt-28 xl:pt-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Hero */}
        <div className="max-w-6xl mx-auto py-8 sm:py-12 md:py-16 space-y-6 sm:space-y-8">
          <div className="text-xs sm:text-sm text-muted-foreground">
            <Link href="/courses" className="hover:text-primary-700">
              Programs
            </Link>
            <span className="mx-2">/</span>
            <span className="text-primary-700 font-medium">Tafsir Studies</span>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            <div className="lg:w-1/2 space-y-4 sm:space-y-6">
              <Reveal>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 text-[11px] font-black uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" /> Quranic Exegesis
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter font-heading leading-[0.9]">
                  Tafsir{" "}
                  <span className="text-primary-700 italic">Al-Mubin</span>
                  <br />
                  Studies Program
                </h1>
              </Reveal>

              <Reveal delay={0.2}>
                <p className="text-base sm:text-lg text-muted-foreground font-light leading-relaxed">
                  Deep dive into Quranic meanings with classical methodology.
                  Study authentic Tafsir from primary sources with scholarly
                  guidance.
                </p>
              </Reveal>

              <Reveal delay={0.3}>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link href="/admissions" className="w-full sm:w-auto">
                    <Button className="w-full rounded-full px-6 py-3 sm:px-8 sm:py-4 font-black bg-primary-700 hover:bg-primary-800 text-sm sm:text-base min-h-[44px]">
                      ENROLL NOW
                    </Button>
                  </Link>
                  <Link href="#syllabus" className="w-full sm:w-auto">
                    <Button
                      variant="outline"
                      className="w-full rounded-full px-6 py-3 sm:px-8 sm:py-4 font-black text-sm sm:text-base min-h-[44px]"
                    >
                      VIEW SYLLABUS
                    </Button>
                  </Link>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.4} className="lg:w-1/2">
              <div className="institutional-card p-6 sm:p-8">
                <div className="grid grid-cols-2 gap-4 sm:gap-6 mb-6">
                  {[
                    { value: "1.5", label: "Years", icon: Clock },
                    { value: "1-on-1", label: "Sessions", icon: Users },
                    { value: "Advanced", label: "Level", icon: Target },
                    { value: "Classical", label: "Sources", icon: Scroll },
                  ].map((stat, idx) => (
                    <div key={idx} className="space-y-2">
                      <div className="flex items-center gap-2">
                        <stat.icon className="w-4 h-4 text-primary-700" />
                        <div className="text-xl sm:text-2xl font-black text-primary-700">
                          {stat.value}
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-4 sm:p-6 rounded-xl bg-primary-700/5 border border-primary-700/10">
                  <div className="font-black text-base sm:text-lg uppercase tracking-tight mb-2">
                    Scholarly Mentorship
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Direct guidance from Tafsir specialists with Ijazah in
                    classical works
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Curriculum Overview */}
        <section className="py-12 sm:py-16 md:py-20">
          <Reveal>
            <div className="text-center mb-8 sm:mb-12 space-y-3">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tighter">
                Study <span className="text-primary-700 italic">Classical</span>{" "}
                Tafsir
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
                Engage with authentic exegesis works in their original context
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
            {[
              {
                title: "Tafsir Al-Tabari",
                desc: "Historical context and linguistic analysis",
                icon: BookOpen,
              },
              {
                title: "Tafsir Ibn Kathir",
                desc: "Hadith-based interpretation",
                icon: Scroll,
              },
              {
                title: "Tafsir Al-Qurtubi",
                desc: "Jurisprudential insights",
                icon: Brain,
              },
              {
                title: "Tafsir Al-Sa'di",
                desc: "Contemporary relevance",
                icon: Users,
              },
            ].map((item, idx) => (
              <Reveal key={idx} delay={idx * 0.1}>
                <div className="institutional-card p-4 sm:p-6">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-primary-50 dark:bg-primary-950/40 flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary-700" />
                    </div>
                    <div>
                      <h3 className="font-black text-base sm:text-lg uppercase tracking-tight mb-1">
                        {item.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
