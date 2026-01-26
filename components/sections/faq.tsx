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
  MessageCircle,
  Phone,
  Mail,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const FAQ_ITEMS = [
  {
    question: "What exactly is an Ijazah certificate?",
    answer:
      "An Ijazah is a traditional Islamic certification granting permission to teach the Quran. It represents an unbroken chain of oral transmission (sanad) that traces back directly to Prophet Muhammad (ﷺ). This ensures the Quran is recited today exactly as it was revealed 1,400 years ago.",
    icon: Shield,
    category: "Certification",
  },
  {
    question: "How does Al-Maysaroh differ from other online Quran schools?",
    answer:
      "Unlike typical online programs, we combine authentic sanad-based methodology with structured modern pedagogy. Every student receives personalized 1-on-1 attention from Ijazah-certified scholars (not just teachers). Our proprietary tracking system provides detailed analytics for every ayah, mistake, and improvement—unavailable elsewhere.",
    icon: BookOpen,
    category: "Methodology",
  },
  {
    question: "Can working professionals with busy schedules enroll?",
    answer:
      "Absolutely. 78% of our students are professionals. We offer flexible scheduling across global timezones with 24/7 portal access. Most students commit 3-5 hours weekly, scheduled around their work and family commitments. Progress is consistent, not rushed.",
    icon: Clock,
    category: "Scheduling",
  },
  {
    question: "I have zero Arabic background. Where do I start?",
    answer:
      "Our Arabic Fluency program is designed for absolute beginners. Using our proven methodology, students typically read Quranic Arabic within 3 months and understand basic grammar by 6 months. We provide bilingual support throughout your journey.",
    icon: Users,
    category: "Beginner Friendly",
  },
  {
    question: "Are male and female teachers available?",
    answer:
      "Yes, we have both male and female Ijazah-certified scholars. Students may request same-gender instructors. All our scholars have minimum 10 years teaching experience and complete training in modern pedagogical techniques.",
    icon: Users,
    category: "Faculty",
  },
  {
    question: "What technology or equipment do I need?",
    answer:
      "Just a stable internet connection and any device (computer, tablet, or smartphone). We provide access to our proprietary learning portal for all lessons, materials, and tracking. No special software required—everything works securely in your browser.",
    icon: HelpCircle,
    category: "Technical",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-16 sm:py-20 md:py-28 lg:py-36 bg-gradient-to-b from-background to-primary-50/5 dark:to-primary-950/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-4xl mx-auto mb-16 sm:mb-20 lg:mb-24">
          <Reveal>
            <div className="text-center space-y-6 md:space-y-8">
              {/* Badge */}
              <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-primary-50 dark:bg-primary-950/40 border border-primary-700/20">
                <HelpCircle className="w-4 h-4 sm:w-5 sm:h-5 text-primary-700" />
                <span className="text-xs sm:text-sm font-black text-primary-700 uppercase tracking-[0.2em]">
                  GUIDANCE & CLARITY
                </span>
              </div>

              {/* Main Heading */}
              <div className="space-y-4">
                <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-7.5xl font-black tracking-tight font-heading leading-[1.1]">
                  <span className="block">Common Questions,</span>
                  <span className="text-primary-700 italic">Clear Answers</span>
                </h2>

                {/* Subtitle */}
                <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground font-light leading-relaxed max-w-2xl mx-auto px-4 sm:px-0">
                  Everything you need to know about beginning your authentic
                  Quranic journey
                </p>
              </div>

              {/* Decorative Line */}
              <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-primary-700 to-transparent mx-auto" />
            </div>
          </Reveal>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-4xl mx-auto space-y-3 sm:space-y-4">
          {FAQ_ITEMS.map((item, index) => (
            <Reveal key={index} delay={index * 0.07}>
              <motion.div
                layout
                className="overflow-hidden rounded-2xl sm:rounded-3xl border border-border/50 hover:border-primary-700/30 transition-colors duration-300"
              >
                <button
                  onClick={() =>
                    setOpenIndex(openIndex === index ? null : index)
                  }
                  className="w-full text-left p-6 sm:p-8 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm hover:bg-white/70 dark:hover:bg-gray-900/70 transition-all duration-300"
                  aria-expanded={openIndex === index}
                >
                  <div className="flex items-start justify-between gap-6">
                    {/* Left Content */}
                    <div className="flex items-start gap-4 sm:gap-6 flex-1">
                      {/* Icon */}
                      <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/30 dark:to-primary-800/20 flex items-center justify-center shadow-sm">
                        <item.icon className="w-6 h-6 sm:w-7 sm:h-7 text-primary-700" />
                      </div>

                      {/* Text Content */}
                      <div className="flex-1 min-w-0">
                        {/* Category Tag */}
                        <div className="inline-block mb-3">
                          <span className="px-3 py-1 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 text-xs font-bold uppercase tracking-wider">
                            {item.category}
                          </span>
                        </div>

                        {/* Question */}
                        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground leading-tight mb-2 sm:mb-3">
                          {item.question}
                        </h3>

                        {/* Answer Preview (Collapsed) */}
                        <AnimatePresence>
                          {openIndex !== index && (
                            <motion.p
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              className="text-sm sm:text-base text-muted-foreground line-clamp-2"
                            >
                              {item.answer.substring(0, 100)}...
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>

                    {/* Chevron */}
                    <div className="flex-shrink-0">
                      <ChevronDown
                        className={`w-5 h-5 sm:w-6 sm:h-6 text-primary-700 transition-transform duration-300 ${
                          openIndex === index ? "rotate-180" : ""
                        }`}
                      />
                    </div>
                  </div>

                  {/* Full Answer (Expanded) */}
                  <AnimatePresence>
                    {openIndex === index && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-6 pt-6 border-t border-border/30">
                          <div className="pl-16 sm:pl-20">
                            <p className="text-base sm:text-lg md:text-xl text-foreground/80 leading-relaxed font-light">
                              {item.answer}
                            </p>

                            {/* Optional Additional Info */}
                            {index === 0 && (
                              <div className="mt-4 p-4 rounded-lg bg-primary-50 dark:bg-primary-900/20 border border-primary-700/10">
                                <p className="text-sm text-primary-700 font-medium">
                                  <span className="font-bold">Note:</span> Our
                                  scholars maintain complete sanad
                                  documentation, which students can review upon
                                  request.
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              </motion.div>
            </Reveal>
          ))}
        </div>

        {/* Additional Support Section */}
        <Reveal delay={0.4}>
          <div className="max-w-4xl mx-auto mt-16 sm:mt-20 lg:mt-24">
            <div className="bg-gradient-to-br from-background to-primary-50/10 dark:to-primary-950/10 border border-primary-700/20 rounded-3xl p-8 sm:p-10 lg:p-12 text-center space-y-8">
              {/* Header */}
              <div className="space-y-4">
                <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-primary-50 dark:bg-primary-950/40 border border-primary-700/20">
                  <MessageCircle className="w-5 h-5 text-primary-700" />
                  <span className="text-sm font-black text-primary-700 uppercase tracking-[0.2em]">
                    PERSONAL GUIDANCE
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
                  Need More Specific Guidance?
                </h3>

                <p className="text-lg text-muted-foreground font-light max-w-2xl mx-auto">
                  Our academic advisors provide personalized consultations to
                  match you with the perfect program and scholar.
                </p>
              </div>

              {/* Contact Options */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                {/* Email */}
                <a
                  href="mailto:admissions@almaysaroh.com"
                  className="group p-6 rounded-2xl bg-white/50 dark:bg-gray-900/50 border border-border hover:border-primary-700/50 hover:bg-white dark:hover:bg-gray-900 transition-all duration-300 text-left"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
                      <Mail className="w-6 h-6 text-primary-700" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-primary-700 uppercase tracking-wider mb-1">
                        Email Response: 2-4 Hours
                      </div>
                      <div className="text-lg font-bold text-foreground">
                        admissions@almaysaroh.com
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Ideal for detailed program questions and documentation
                    requests
                  </p>
                </a>

                {/* Phone */}
                <a
                  href="tel:+11234567890"
                  className="group p-6 rounded-2xl bg-white/50 dark:bg-gray-900/50 border border-border hover:border-primary-700/50 hover:bg-white dark:hover:bg-gray-900 transition-all duration-300 text-left"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
                      <Phone className="w-6 h-6 text-primary-700" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-primary-700 uppercase tracking-wider mb-1">
                        Call: 10AM-8PM (GMT)
                      </div>
                      <div className="text-lg font-bold text-foreground">
                        +1 (123) 456-7890
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Speak directly with an advisor for immediate answers
                  </p>
                </a>
              </div>

              {/* Guarantee Note */}
              <div className="pt-6 border-t border-border/30">
                <p className="text-base text-muted-foreground font-light">
                  <span className="font-bold text-primary-700">
                    All consultations are free
                  </span>{" "}
                  and come with our 30-day satisfaction guarantee. No commitment
                  required.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
