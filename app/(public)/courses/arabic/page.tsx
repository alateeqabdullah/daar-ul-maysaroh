import {
  Languages,
  BookOpen,
  MessageSquare,
  Globe,
  Sparkles,
  Target,
  Clock,
  Users,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/shared/section-animation";
import Link from "next/link";

export default function ArabicFluencyPage() {
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
            <span className="text-primary-700 font-medium">Arabic Fluency</span>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            <div className="lg:w-1/2 space-y-4 sm:space-y-6">
              <Reveal>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold/10 text-gold text-[11px] font-black uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" /> Quranic Language
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter font-heading leading-[0.9]">
                  Al-Lughah{" "}
                  <span className="text-gold italic">Al-Arabiyyah</span>
                  <br />
                  Fluency Program
                </h1>
              </Reveal>

              <Reveal delay={0.2}>
                <p className="text-base sm:text-lg text-muted-foreground font-light leading-relaxed">
                  Understand the Quran in its divine language. Master Classical
                  Arabic with Quranic vocabulary, grammar, and comprehension.
                </p>
              </Reveal>

              <Reveal delay={0.3}>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link href="/admissions" className="w-full sm:w-auto">
                    <Button className="w-full rounded-full px-6 py-3 sm:px-8 sm:py-4 font-black bg-gold hover:bg-gold/90 text-sm sm:text-base min-h-[44px] text-white">
                      START LEARNING
                    </Button>
                  </Link>
                  <Link href="#curriculum" className="w-full sm:w-auto">
                    <Button
                      variant="outline"
                      className="w-full rounded-full px-6 py-3 sm:px-8 sm:py-4 font-black text-sm sm:text-base min-h-[44px]"
                    >
                      VIEW CURRICULUM
                    </Button>
                  </Link>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.4} className="lg:w-1/2">
              <div className="institutional-card p-6 sm:p-8 border-gold/20">
                <div className="grid grid-cols-2 gap-4 sm:gap-6 mb-6">
                  {[
                    { value: "1", label: "Year", icon: Clock },
                    { value: "Group", label: "Sessions", icon: Users },
                    { value: "Beginner", label: "Level", icon: Target },
                    { value: "Quranic", label: "Focus", icon: BookOpen },
                  ].map((stat, idx) => (
                    <div key={idx} className="space-y-2">
                      <div className="flex items-center gap-2">
                        <stat.icon className="w-4 h-4 text-gold" />
                        <div className="text-xl sm:text-2xl font-black text-gold">
                          {stat.value}
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-4 sm:p-6 rounded-xl bg-gold/5 border border-gold/10">
                  <div className="font-black text-base sm:text-lg uppercase tracking-tight mb-2">
                    Quran-Centric Curriculum
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Learn Arabic through Quranic texts, not artificial sentences
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Learning Path */}
        <section className="py-12 sm:py-16 md:py-20">
          <Reveal>
            <div className="text-center mb-8 sm:mb-12 space-y-3">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tighter">
                Your <span className="text-gold italic">Language</span> Journey
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
                Progress from complete beginner to Quranic comprehension
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-4 sm:gap-6">
            {[
              {
                stage: "Stage 1",
                title: "Foundation (3 Months)",
                desc: "Arabic alphabet, basic vocabulary, Quranic reading",
                icon: BookOpen,
              },
              {
                stage: "Stage 2",
                title: "Grammar & Structure (6 Months)",
                desc: "Nahw & Sarf, sentence construction, Quranic analysis",
                icon: Languages,
              },
              {
                stage: "Stage 3",
                title: "Fluency & Application (3 Months)",
                desc: "Conversation practice, Tafsir integration, independent reading",
                icon: MessageSquare,
              },
            ].map((stage, idx) => (
              <Reveal key={idx} delay={idx * 0.1}>
                <div className="institutional-card p-4 sm:p-6">
                  <div className="inline-flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-lg bg-gold/10 text-gold flex items-center justify-center text-xs font-black">
                      {stage.stage}
                    </div>
                    <h3 className="font-black text-base sm:text-lg uppercase tracking-tight">
                      {stage.title}
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground">{stage.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
