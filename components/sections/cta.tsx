"use client";

import { Reveal } from "@/components/shared/section-animation";
import { Calendar, CheckCircle, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function CTA() {
  return (
    <section className="py-32 relative overflow-hidden">
      <div className="container mx-auto px-6 relative">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <div className="institutional-card p-12 md:p-16 relative overflow-hidden">
              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-linear-to-bl from-primary-500/5 to-transparent rounded-full blur-3xl -translate-y-32 translate-x-32" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-linear-to-tr from-primary-500/5 to-transparent rounded-full blur-3xl translate-y-32 -translate-x-32" />

              <div className="relative z-10 text-center space-y-8">
                {/* Header */}
                <div className="space-y-6">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20">
                    <Star className="w-4 h-4 text-primary-700" />
                    <span className="text-xs font-black text-primary-700 uppercase tracking-widest">
                      Limited Seats Available
                    </span>
                  </div>

                  <h2 className="text-6xl lg:text-8xl font-black tracking-tighter font-heading leading-tight">
                    Begin Your{" "}
                    <span className="text-primary-700 italic">Sacred</span>
                    <br />
                    Journey Today
                  </h2>

                  <p className="text-xl text-muted-foreground font-medium max-w-2xl mx-auto border-l-4 border-gold pl-6">
                    Join 1,200+ students who have transformed their relationship
                    with the Quran through our sanad-based programs.
                  </p>
                </div>

                {/* Features */}
                <div className="grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
                  {[
                    { icon: CheckCircle, text: "Free Trial Class" },
                    { icon: CheckCircle, text: "1-on-1 Assessment" },
                    { icon: CheckCircle, text: "Flexible Scheduling" },
                  ].map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-4 rounded-xl bg-muted/30"
                    >
                      <feature.icon className="w-5 h-5 text-primary-700 hrink-0" />
                      <span className="text-sm font-black uppercase tracking-tight">
                        {feature.text}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
                  <Link href="/register" className="w-full sm:w-auto">
                    <Button
                      size="lg"
                      className="w-full rounded-full px-8 py-6 text-lg font-black bg-primary-700 hover:bg-primary-800"
                    >
                      <span className="flex items-center gap-3">
                        <Calendar className="w-5 h-5" />
                        Enroll Now
                      </span>
                    </Button>
                  </Link>

                  <Link href="/contact">
                    <Button
                      variant="outline"
                      size="lg"
                      className="w-full sm:w-auto rounded-full px-8 py-6 text-lg font-black border-2"
                    >
                      <span className="flex items-center gap-3">
                        Speak to Advisor
                        <ArrowRight className="w-5 h-5" />
                      </span>
                    </Button>
                  </Link>
                </div>

                {/* Guarantee */}
                <p className="text-sm text-muted-foreground pt-8 border-t border-border/50 max-w-md mx-auto">
                  <span className="font-black text-primary-700">
                    30-Day Satisfaction Guarantee
                  </span>{" "}
                  – If you're not satisfied within the first month, get a full
                  refund.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
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
