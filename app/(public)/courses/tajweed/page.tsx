import {
  Mic,
  Headphones,
  Volume2,
  Music,
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

export default function TajweedMasteryPage() {
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
            <span className="text-primary-700 font-medium">
              Tajweed Mastery
            </span>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            <div className="lg:w-1/2 space-y-4 sm:space-y-6">
              <Reveal>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 text-accent text-[11px] font-black uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" /> Scientific Recitation
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter font-heading leading-[0.9]">
                  Tajweed <span className="text-accent italic">Al-Itqan</span>
                  <br />
                  Mastery Program
                </h1>
              </Reveal>

              <Reveal delay={0.2}>
                <p className="text-base sm:text-lg text-muted-foreground font-light leading-relaxed">
                  Master Quranic phonetics with precision. Learn the rules of
                  Makharij and Sifaat through scientific methodology and live
                  correction.
                </p>
              </Reveal>

              <Reveal delay={0.3}>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link href="/admissions" className="w-full sm:w-auto">
                    <Button className="w-full rounded-full px-6 py-3 sm:px-8 sm:py-4 font-black bg-accent hover:bg-accent/90 text-sm sm:text-base min-h-[44px]">
                      START LEARNING
                    </Button>
                  </Link>
                  <Link href="#methodology" className="w-full sm:w-auto">
                    <Button
                      variant="outline"
                      className="w-full rounded-full px-6 py-3 sm:px-8 sm:py-4 font-black text-sm sm:text-base min-h-[44px]"
                    >
                      VIEW METHODOLOGY
                    </Button>
                  </Link>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.4} className="lg:w-1/2">
              <div className="institutional-card p-6 sm:p-8 border-accent/20">
                <div className="grid grid-cols-2 gap-4 sm:gap-6 mb-6">
                  {[
                    { value: "6", label: "Months", icon: Clock },
                    { value: "Small", label: "Groups", icon: Headphones },
                    { value: "Beginner+", label: "Level", icon: Target },
                    { value: "Live", label: "Correction", icon: Mic },
                  ].map((stat, idx) => (
                    <div key={idx} className="space-y-2">
                      <div className="flex items-center gap-2">
                        <stat.icon className="w-4 h-4 text-accent" />
                        <div className="text-xl sm:text-2xl font-black text-accent">
                          {stat.value}
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-4 sm:p-6 rounded-xl bg-accent/5 border border-accent/10">
                  <div className="font-black text-base sm:text-lg uppercase tracking-tight mb-2">
                    Audio Analysis Technology
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Real-time feedback on your recitation using advanced
                    phonetic analysis
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Program Features */}
        <section className="py-12 sm:py-16 md:py-20">
          <Reveal>
            <div className="text-center mb-8 sm:mb-12 space-y-3">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tighter">
                Master Every <span className="text-accent italic">Rule</span>
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
                Comprehensive coverage of all Tajweed rules with practical
                application
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              { icon: Mic, title: "Makharij", desc: "Articulation points" },
              {
                icon: Volume2,
                title: "Sifaat",
                desc: "Letter characteristics",
              },
              { icon: Music, title: "Ahkam", desc: "Recitation rules" },
              {
                icon: Headphones,
                title: "Practical",
                desc: "Live application",
              },
            ].map((item, idx) => (
              <Reveal key={idx} delay={idx * 0.1}>
                <div className="institutional-card p-4 sm:p-6 text-center">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 rounded-lg bg-accent/10 flex items-center justify-center">
                    <item.icon className="w-5 h-5 sm:w-6 sm:h-6 text-accent" />
                  </div>
                  <h3 className="font-black text-sm sm:text-base uppercase tracking-tight mb-1">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    {item.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="py-12 sm:py-16">
          <Reveal>
            <div className="institutional-card p-6 sm:p-8 md:p-10 text-center max-w-3xl mx-auto border-accent/20">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="text-left">
                  <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight mb-2">
                    Perfect Your Recitation
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground">
                    Start with a free assessment session
                  </p>
                </div>
                <Link href="/admissions">
                  <Button className="rounded-full px-6 py-3 sm:px-8 sm:py-4 font-black bg-accent hover:bg-accent/90 min-h-[44px]">
                    BOOK ASSESSMENT
                  </Button>
                </Link>
              </div>
            </div>
          </Reveal>
        </section>
      </div>
    </main>
  );
}
