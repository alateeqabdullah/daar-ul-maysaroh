// components/sections/home-faq.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal } from "@/components/shared/section-animation";
import {
  ChevronDown,
  HelpCircle,
  MessageCircle,
 
  Mail,
  Phone,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";

const FAQS = [
  {
    id: 1,
    question: "Can I join if I have no prior Arabic knowledge?",
    answer:
      "Absolutely! We have students starting from absolute zero. Our teachers are experienced in guiding beginners of all ages. You'll start with basic letter recognition and gradually build up to full Quran reading.",
    category: "Beginners",
  },
  {
    id: 2,
    question: "How much time do I need to dedicate daily?",
    answer:
      "We recommend 15-30 minutes of daily revision. Consistency matters more than quantity. Our teachers help you build sustainable habits that fit your schedule, whether you're a student, professional, or parent.",
    category: "Scheduling",
  },
  {
    id: 3,
    question: "What's the difference between group and 1-on-1?",
    answer:
      "Group classes (4-6 students) offer peer motivation, collaborative learning, and lower cost ($79/month). 1-on-1 provides personalized attention, flexible pacing, and direct feedback. Both are highly effective - choose based on your learning style.",
    category: "Formats",
  },
  {
    id: 4,
    question: "Do I get a certificate upon completion?",
    answer:
      "Yes! Upon completing your program, students receive a Certificate of Completion. Those who excel can continue to our Ijazah track for formal certification with a complete Sanad chain to Prophet Muhammad (ﷺ).",
    category: "Certification",
  },
  {
    id: 5,
    question: "Can I switch between group and 1-on-1 classes?",
    answer:
      "Yes, you can switch formats at the end of any month. We understand that your needs may change as you progress, and we want to provide flexibility to ensure you get the best learning experience.",
    category: "Flexibility",
  }
];

export function FAQ() {
  const [openId, setOpenId] = useState<number | null>(1);

  const toggleFAQ = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="py-12 xs:py-16 sm:py-20 md:py-24 lg:py-32 bg-linear-to-b from-background via-purple-50/5 to-amber-50/5 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 xs:px-5 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 xs:mb-10 sm:mb-12 md:mb-16">
          <Reveal>
            <div className="inline-flex items-center gap-1.5 xs:gap-2 px-2.5 xs:px-3 py-1 xs:py-1.5 rounded-full bg-purple-100 dark:bg-purple-900/30 border border-purple-200 dark:border-purple-800 mb-3 xs:mb-4">
              <HelpCircle className="w-3 h-3 xs:w-3.5 xs:h-3.5 text-amber-500" />
              <span className="text-[8px] xs:text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] text-purple-700 dark:text-purple-400">
                Common Questions
              </span>
            </div>
            <h2 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter font-heading leading-[1.1] mb-3 xs:mb-4">
              Frequently Asked{" "}
              <span className="bg-linear-to-r from-purple-600 to-amber-600 bg-clip-text text-transparent italic">
                Questions
              </span>
            </h2>
            <p className="text-sm xs:text-base text-muted-foreground max-w-md mx-auto">
              Everything you need to know about our programs and enrollment
            </p>
          </Reveal>
        </div>

        {/* FAQ Grid - 2 columns on desktop */}
        <div className="grid md:grid-cols-2 gap-4 xs:gap-5 sm:gap-6 max-w-4xl mx-auto">
          {FAQS.map((faq, index) => (
            <Reveal key={faq.id} delay={index * 0.1}>
              <div className="bg-card rounded-xl border border-border hover:border-purple-300 transition-all overflow-hidden h-full">
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full text-left p-4 xs:p-5 sm:p-6 flex items-center justify-between gap-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  aria-expanded={openId === faq.id}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="text-[8px] xs:text-[9px] font-black uppercase tracking-wider text-purple-600 bg-purple-100 dark:bg-purple-950/40 px-2 py-0.5 rounded">
                        {faq.category}
                      </span>
                    </div>
                    <h3 className="font-black text-sm xs:text-base pr-4 group-hover:text-purple-600 transition-colors">
                      {faq.question}
                    </h3>
                  </div>
                  <motion.div
                    animate={{ rotate: openId === faq.id ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="w-4 h-4 xs:w-5 xs:h-5 text-purple-600 shrink-0" />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {openId === faq.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-4 xs:px-5 sm:px-6 pb-4 xs:pb-5 sm:pb-6 pt-0">
                        <p className="text-xs xs:text-sm text-muted-foreground leading-relaxed border-l-2 border-purple-300 pl-3 xs:pl-4">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          ))}
        </div>

        {/* View All FAQs Link */}
        <Reveal delay={0.3}>
          <div className="text-center mt-8 xs:mt-10 sm:mt-12">
            <Link
              href="/faq"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-black text-purple-600 hover:text-purple-700 transition-colors group"
            >
              View all FAQs
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </Reveal>

        {/* Still Have Questions CTA */}
        <Reveal delay={0.35}>
          <div className="mt-10 xs:mt-12 sm:mt-16 text-center">
            <div className="inline-flex flex-col sm:flex-row items-center gap-3 sm:gap-4 px-5 xs:px-6 py-4 xs:py-5 rounded-2xl bg-linear-to-r from-purple-50 to-amber-50 dark:from-purple-950/30 dark:to-amber-950/30 border border-purple-200 dark:border-purple-800">
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 xs:w-5 xs:h-5 text-amber-500" />
                <span className="text-xs xs:text-sm font-bold">
                  Still have questions?
                </span>
              </div>
              <div className="flex flex-col xs:flex-row gap-2 xs:gap-3">
                <Link href="/contact">
                  <button className="px-4 xs:px-5 py-1.5 xs:py-2 rounded-full bg-linear-to-r from-purple-600 to-purple-700 text-white font-black text-[10px] xs:text-xs uppercase tracking-wider hover:from-purple-700 hover:to-purple-800 transition-all shadow-md">
                    Contact Support
                  </button>
                </Link>
                <Link href="/admissions/apply">
                  <button className="px-4 xs:px-5 py-1.5 xs:py-2 rounded-full border-2 border-purple-600 text-purple-600 font-black text-[10px] xs:text-xs uppercase tracking-wider hover:bg-purple-50 dark:hover:bg-purple-950/20 transition-all">
                    Apply Now
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Quick Contact Options */}
        <Reveal delay={0.4}>
          <div className="mt-6 xs:mt-8 text-center">
            <p className="text-[9px] xs:text-[10px] text-muted-foreground mb-2">
              Or reach us directly:
            </p>
            <div className="flex flex-wrap justify-center gap-3 xs:gap-4">
              <a
                href="mailto:info.almaysaroh@gmail.com"
                className="flex items-center gap-1.5 text-[9px] xs:text-[10px] text-purple-600 hover:text-purple-700 transition-colors"
              >
                <Mail className="w-3 h-3" />
                info.almaysaroh@gmail.com
              </a>
              <span className="text-muted-foreground/30 hidden xs:block">
                |
              </span>
              <a
                href="tel:+2349110163930"
                className="flex items-center gap-1.5 text-[9px] xs:text-[10px] text-purple-600 hover:text-purple-700 transition-colors"
              >
                <Phone className="w-3 h-3" />
                +234 911 016 3930
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
