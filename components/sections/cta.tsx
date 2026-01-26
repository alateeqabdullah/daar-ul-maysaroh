"use client";

import { Reveal } from "@/components/shared/section-animation";
import { Calendar, CheckCircle,Sparkles, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";


export function CTA() {
  return (
    <section className="py-32 lg:py-48 relative overflow-hidden bg-linear-to-b from-background to-primary-50/5 dark:to-primary-950/10">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02] bg-[url('/islamic-pattern.svg')] bg-center bg-repeat" />

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-linear-to-br from-primary-700/10 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-linear-to-tl from-primary-700/10 to-transparent rounded-full blur-3xl" />

      <div className="container mx-auto px-6 relative">
        <Reveal>
          <div className="max-w-6xl mx-auto">
            <div className="glass-surface rounded-[2.5rem] p-12 md:p-20 relative overflow-hidden border border-primary-700/20">
              {/* Decorative Corner Accents */}
              <div className="absolute top-0 left-0 w-32 h-32 border-t-2 border-l-2 border-primary-700/30 rounded-tl-[2.5rem]" />
              <div className="absolute top-0 right-0 w-32 h-32 border-t-2 border-r-2 border-primary-700/30 rounded-tr-[2.5rem]" />
              <div className="absolute bottom-0 left-0 w-32 h-32 border-b-2 border-l-2 border-primary-700/30 rounded-bl-[2.5rem]" />
              <div className="absolute bottom-0 right-0 w-32 h-32 border-b-2 border-r-2 border-primary-700/30 rounded-br-[2.5rem]" />

              <div className="relative z-10 text-center space-y-12">
                {/* Header */}
                <div className="space-y-8">
                  <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-linear-to-r from-primary-700/10 to-primary-500/10 border border-primary-700/20">
                    <Sparkles className="w-5 h-5 text-primary-700" />
                    <span className="text-sm font-black text-primary-700 uppercase tracking-[0.3em]">
                      ENROLLMENT NOW OPEN
                    </span>
                    <Award className="w-5 h-5 text-primary-700" />
                  </div>

                  <h2 className="text-6xl lg:text-8xl font-black tracking-tighter font-heading leading-[0.9]">
                    Your{" "}
                    <span className="bg-linear-to-br from-primary-600 via-primary-700 to-primary-800 bg-clip-text text-transparent italic">
                      Sacred
                    </span>
                    <br />
                    Journey Begins
                  </h2>

                  <div className="max-w-2xl mx-auto">
                    <p className="text-2xl text-muted-foreground font-light leading-relaxed border-l-4 border-gold/50 pl-8 py-2">
                      Join 1,847 students who have transformed their
                      relationship with the Quran through authentic, sanad-based
                      education.
                    </p>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
                  {[
                    { value: "98%", label: "Completion Rate" },
                    { value: "14:1", label: "Student:Scholar Ratio" },
                    { value: "1400+", label: "Years of Sanad" },
                    { value: "30-Day", label: "Guarantee" },
                  ].map((stat, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="text-center p-6 rounded-2xl bg-linear-to-b from-background/50 to-background/30 border border-primary-700/10"
                    >
                      <div className="text-4xl font-black text-primary-700 mb-2">
                        {stat.value}
                      </div>
                      <div className="text-sm font-medium text-muted-foreground">
                        {stat.label}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Features */}
                <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
                  {[
                    {
                      icon: CheckCircle,
                      title: "Free Trial Session",
                      desc: "Experience our methodology",
                    },
                    {
                      icon: CheckCircle,
                      title: "1-on-1 Assessment",
                      desc: "Personalized learning path",
                    },
                    {
                      icon: CheckCircle,
                      title: "Flexible Scheduling",
                      desc: "Across timezones",
                    },
                  ].map((feature, index) => (
                    <div
                      key={index}
                      className="p-6 rounded-2xl bg-linear-to-br from-background to-primary-50/10 dark:to-primary-950/5 border border-primary-700/10 group hover:border-primary-700/30 transition-all duration-300"
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-xl bg-primary-700/10 flex items-center justify-center">
                          <feature.icon className="w-6 h-6 text-primary-700" />
                        </div>
                        <div className="text-left">
                          <div className="text-lg font-black uppercase tracking-tight">
                            {feature.title}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {feature.desc}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Action Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8"
                >
                  <Link href="/register" className="w-full sm:w-auto">
                    <Button
                      size="xl"
                      className="w-full rounded-full px-12 py-7 text-xl font-black bg-linear-to-r from-primary-700 to-primary-800 hover:shadow-2xl hover:shadow-primary-500/40 transition-all duration-500 group"
                    >
                      <span className="flex items-center gap-4">
                        <Calendar className="w-6 h-6" />
                        ENROLL NOW
                      </span>

                      {/* Shimmer Effect */}
                      <div className="absolute inset-0 -z-10 overflow-hidden rounded-full">
                        <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-shimmer" />
                      </div>
                    </Button>
                  </Link>

                  <Link href="/contact">
                    <Button
                      variant="elite"
                      size="xl"
                      className="w-full sm:w-auto rounded-full px-12 py-7 text-xl font-black border-2"
                    >
                      <span className="flex items-center gap-4">
                        SPEAK TO ADVISOR
                        <ArrowRight className="w-6 h-6 transition-transform duration-500 group-hover:translate-x-3" />
                      </span>
                    </Button>
                  </Link>
                </motion.div>

                {/* Guarantee */}
                <div className="pt-12 border-t border-primary-700/20 max-w-2xl mx-auto">
                  <div className="inline-flex items-center gap-4 text-lg text-muted-foreground">
                    <Shield className="w-8 h-8 text-primary-700" />
                    <span>
                      <span className="font-black text-primary-700">
                        30-Day Satisfaction Guarantee
                      </span>{" "}
                      – Full refund if not satisfied with your progress.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Shield(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
      />
    </svg>
  );
}

function ArrowRight(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M14 5l7 7-7 7"
      />
    </svg>
  );
}
