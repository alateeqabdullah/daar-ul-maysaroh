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
    question: "What is an Ijazah and why is it important?",
    answer:
      "An Ijazah is a traditional Islamic certification granting permission to teach the Quran with an unbroken chain of transmission (sanad) reaching back to Prophet Muhammad (ﷺ). It ensures authentic preservation of Quranic recitation exactly as revealed. Our scholars hold Ijazahs with complete chains of transmission.",
    icon: Shield,
  },
  {
    question:
      "How are your programs different from other online Quran schools?",
    answer:
      "We combine traditional sanad-based methodology with modern pedagogy. Each student receives 1-on-1 attention from Ijazah-certified scholars, not just teachers. Our proprietary tracking system monitors every ayah and mistake, providing detailed progress analytics unavailable elsewhere.",
    icon: BookOpen,
  },
  {
    question: "I work full-time. Can I still enroll?",
    answer:
      "Yes! 78% of our students are working professionals. We offer flexible scheduling across multiple timezones with 24/7 portal access. Average commitment is 3-5 hours weekly, which can be scheduled around your work hours.",
    icon: Clock,
  },
  {
    question: "What if I have no prior Arabic knowledge?",
    answer:
      "Perfect! Our Arabic program starts from absolute beginner level using our proven methodology. Within 6 months, students typically can read Quranic Arabic and understand basic grammar. We provide English/Arabic bilingual support throughout.",
    icon: HelpCircle,
  },
  {
    question: "Are your teachers male and female?",
    answer:
      "Yes, we have both male and female Ijazah-certified scholars. Students can request same-gender teachers if preferred. All our scholars have minimum 10 years teaching experience and are trained in modern pedagogical techniques.",
    icon: Users,
  },
  {
    question: "What technology do I need?",
    answer:
      "Just a stable internet connection and a device (computer, tablet, or phone). We provide access to our proprietary portal for lessons, tracking, and materials. No special software required - everything works in your browser.",
    icon: ChevronDown,
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-32 bg-background">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-6">
          <Reveal>
            <div className="inline-flex items-center gap-2 text-primary-700 font-black text-[10px] uppercase tracking-[0.3em]">
              <HelpCircle className="w-4 h-4" /> Common Questions
            </div>
            <h2 className="text-6xl lg:text-8xl font-black tracking-tighter font-heading leading-tight">
              Your <span className="text-primary-700 italic">Questions</span>
              <br />
              Answered
            </h2>
            <p className="text-xl text-muted-foreground font-medium max-w-2xl mx-auto border-l-4 border-gold pl-6">
              Everything you need to know about beginning your Quranic journey
              with Al-Maysaroh.
            </p>
          </Reveal>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto">
          {FAQ_ITEMS.map((item, index) => (
            <Reveal key={index} delay={index * 0.05}>
              <div className="mb-4">
                <button
                  onClick={() =>
                    setOpenIndex(openIndex === index ? null : index)
                  }
                  className="w-full text-left p-8 institutional-card hover:border-primary-700/50"
                  aria-expanded={openIndex === index}
                >
                  <div className="flex items-center justify-between gap-6">
                    <div className="flex items-center gap-6">
                      <div className="w-12 h-12 rounded-xl bg-primary-50 dark:bg-primary-950/40 flex items-center justify-center flex-shrink-0">
                        <item.icon className="w-6 h-6 text-primary-700" />
                      </div>
                      <h3 className="text-xl font-black uppercase tracking-tight">
                        {item.question}
                      </h3>
                    </div>
                    <ChevronDown
                      className={`w-5 h-5 text-primary-700 transition-transform duration-300 flex-shrink-0 ${
                        openIndex === index ? "rotate-180" : ""
                      }`}
                    />
                  </div>

                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      openIndex === index ? "mt-6" : "max-h-0"
                    }`}
                  >
                    <div className="pl-18 pr-8">
                      <p className="text-muted-foreground leading-relaxed font-medium">
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
          <div className="max-w-2xl mx-auto mt-16 p-8 institutional-card border-primary-500/20 text-center">
            <h3 className="text-2xl font-black uppercase tracking-tight mb-4">
              Still Have Questions?
            </h3>
            <p className="text-muted-foreground mb-6">
              Our academic advisors are available 7 days a week to discuss your
              specific needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:admissions@almaysaroh.com"
                className="px-6 py-3 rounded-full bg-primary-700 text-white font-black text-sm uppercase tracking-widest hover:bg-primary-800 transition-colors"
              >
                Email Admissions
              </a>
              <a
                href="tel:+11234567890"
                className="px-6 py-3 rounded-full border-2 border-primary-700 text-primary-700 font-black text-sm uppercase tracking-widest hover:bg-primary-700/10 transition-colors"
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
