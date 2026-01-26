"use client";

import { useState } from "react";
import { Reveal } from "@/components/shared/section-animation";
import {
  ChevronDown,
  HelpCircle,
  BookOpen,
  Users,
  Clock,
  Shield,
} from "lucide-react";

const FAQ_ITEMS = [
  {
    question: "What is an Ijazah?",
    answer:
      "An Ijazah is a traditional Islamic certification with an unbroken chain of transmission (sanad) reaching back to Prophet Muhammad (ﷺ). It ensures authentic preservation of Quranic recitation.",
    icon: Shield,
  },
  {
    question: "How are you different?",
    answer:
      "We combine traditional sanad-based methodology with modern pedagogy. Each student receives 1-on-1 attention from Ijazah-certified scholars with detailed progress analytics.",
    icon: BookOpen,
  },
  {
    question: "I work full-time. Can I enroll?",
    answer:
      "Yes! 78% of our students are professionals. We offer flexible scheduling across timezones with 24/7 portal access. Average commitment is 3-5 hours weekly.",
    icon: Clock,
  },
  {
    question: "No Arabic knowledge?",
    answer:
      "Perfect! Our Arabic program starts from absolute beginner. Within 6 months, students typically can read Quranic Arabic and understand basic grammar.",
    icon: HelpCircle,
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-12 sm:py-16 md:py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16 md:mb-20 space-y-4 sm:space-y-6">
          <Reveal>
            <div className="inline-flex items-center gap-2 text-primary-700 font-black text-xs sm:text-[10px] uppercase tracking-widest sm:tracking-[0.3em]">
              <HelpCircle className="w-3 h-3 sm:w-4 sm:h-4" /> Common Questions
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tighter font-heading leading-tight">
              Your <span className="text-primary-700 italic">Questions</span>
              <br />
              Answered
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground font-medium max-w-2xl mx-auto border-l-4 border-gold pl-4 sm:pl-6">
              Everything about beginning your Quranic journey with Al-Maysaroh.
            </p>
          </Reveal>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto">
          {FAQ_ITEMS.map((item, index) => (
            <Reveal key={index} delay={index * 0.05}>
              <div className="mb-3 sm:mb-4">
                <button
                  onClick={() =>
                    setOpenIndex(openIndex === index ? null : index)
                  }
                  className="w-full text-left p-4 sm:p-6 md:p-8 institutional-card hover:border-primary-700/50 min-h-[44px]"
                  aria-expanded={openIndex === index}
                >
                  <div className="flex items-center justify-between gap-4 sm:gap-6">
                    <div className="flex items-center gap-4 sm:gap-6">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-primary-50 dark:bg-primary-950/40 flex items-center justify-center flex-shrink-0">
                        <item.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary-700" />
                      </div>
                      <h3 className="text-base sm:text-lg md:text-xl font-black uppercase tracking-tight text-left">
                        {item.question}
                      </h3>
                    </div>
                    <ChevronDown
                      className={`w-4 h-4 sm:w-5 sm:h-5 text-primary-700 transition-transform duration-300 flex-shrink-0 ${
                        openIndex === index ? "rotate-180" : ""
                      }`}
                    />
                  </div>

                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      openIndex === index ? "mt-4 sm:mt-6" : "max-h-0"
                    }`}
                  >
                    <div className="pl-14 sm:pl-18 pr-4">
                      <p className="text-sm sm:text-base text-muted-foreground leading-relaxed font-medium">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </button>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Still Have Questions? */}
        <Reveal>
          <div className="max-w-2xl mx-auto mt-12 sm:mt-16 p-6 sm:p-8 institutional-card border-primary-500/20 text-center">
            <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight mb-3 sm:mb-4">
              Still Have Questions?
            </h3>
            <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6">
              Our academic advisors are available 7 days a week.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <a
                href="mailto:admissions@almaysaroh.com"
                className="px-4 py-2 sm:px-6 sm:py-3 rounded-full bg-primary-700 text-white font-black text-xs sm:text-sm uppercase tracking-widest hover:bg-primary-800 transition-colors min-h-[44px] flex items-center justify-center"
              >
                Email Admissions
              </a>
              <a
                href="tel:+11234567890"
                className="px-4 py-2 sm:px-6 sm:py-3 rounded-full border-2 border-primary-700 text-primary-700 font-black text-xs sm:text-sm uppercase tracking-widest hover:bg-primary-700/10 transition-colors min-h-[44px] flex items-center justify-center"
              >
                Call Now
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
