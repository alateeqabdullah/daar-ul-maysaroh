"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HelpCircle,
  ChevronDown,
  Search,
  BookOpen,
  Landmark,
  CreditCard,
  Monitor,
  MessageSquare,
} from "lucide-react";
import { Reveal } from "@/components/shared/section-animation";
import { cn } from "@/lib/utils";

const FAQ_DATA = [
  {
    category: "General",
    icon: Landmark,
    questions: [
      {
        q: "What is Al-Maysaroh Institute?",
        a: "Al-Maysaroh is a premier international institute dedicated to the preservation of the Quranic Sanad through 1-on-1 scholarly guidance and modern academic rigor.",
      },
      {
        q: "Do you offer certificates?",
        a: "Yes. We offer both 'Certificate of Completion' for standard levels and traditional 'Ijazah with Sanad' for those who master the entire Quran.",
      },
    ],
  },
  {
    category: "Academic",
    icon: BookOpen,
    questions: [
      {
        q: "How are teachers assigned?",
        a: "Our Dean of Faculty personally reviews your initial assessment to match you with a scholar whose expertise and recitation style align with your goals.",
      },
      {
        q: "Can I choose my scholar?",
        a: "You can request a specific scholar through the Admissions Council Inquiry. We do our best to accommodate these requests based on availability.",
      },
      {
        q: "Are the classes 1-on-1?",
        a: "Yes, our core curriculum is exclusively 1-on-1 to ensure the student receives the undivided attention of the scholar, as per traditional methodology.",
      },
    ],
  },
  {
    category: "Tuition & Financial",
    icon: CreditCard,
    questions: [
      {
        q: "What payment methods do you accept?",
        a: "We accept all major Credit/Debit cards via Stripe, as well as Bank Transfers, Western Union, and Mobile Money for global students.",
      },
      {
        q: "Do you offer financial aid?",
        a: "Al-Maysaroh offers limited Zakat-funded grants for dedicated students of knowledge facing financial hardship. Please contact the Financial Council.",
      },
    ],
  },
  {
    category: "Technical",
    icon: Monitor,
    questions: [
      {
        q: "What software is required for classes?",
        a: "Classes are held via our Integrated Student Portal. You only need a stable internet connection and a modern browser (Chrome, Safari, or Firefox).",
      },
      {
        q: "Is there a mobile app?",
        a: "Our portal is fully responsive for tablets and mobile phones. A dedicated iOS and Android app is currently in development for 2026.",
      },
    ],
  },
];

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [openIndex, setOpenIndex] = useState<string | null>(null);

  return (
    <main className="pt-40 pb-20 bg-background relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary-700/5 blur-[120px] -z-10 rounded-full" />

      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center mb-20 space-y-8">
          <Reveal>
            <div className="w-16 h-16 bg-primary-700/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <HelpCircle className="text-primary-700 w-8 h-8" />
            </div>
            <h1 className="text-6xl lg:text-8xl font-black tracking-tighter font-heading">
              Support & <br />{" "}
              <span className="text-primary-700 italic">Clarity.</span>
            </h1>
            <p className="text-xl text-muted-foreground font-medium max-w-xl mx-auto">
              Everything you need to know about joining the Al-Maysaroh
              scholarly journey.
            </p>
          </Reveal>

          {/* Search Bar */}
          <Reveal delay={0.2}>
            <div className="relative max-w-2xl mx-auto mt-12 group">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary-700 transition-colors" />
              <input
                type="text"
                placeholder="Search for questions (e.g. Ijazah, Payments, Zoom...)"
                className="w-full h-18 pl-16 pr-8 rounded-[2rem] glass-surface border-2 border-transparent focus:border-primary-700/30 outline-none font-bold text-lg shadow-xl transition-all"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </Reveal>
        </div>

        {/* FAQ Grid */}
        <div className="max-w-5xl mx-auto space-y-20">
          {FAQ_DATA.map((section, sIdx) => (
            <div key={section.category} className="space-y-8">
              <div className="flex items-center gap-4 border-b border-border pb-4">
                <section.icon className="w-6 h-6 text-primary-700" />
                <h2 className="text-xl font-black uppercase tracking-widest">
                  {section.category}
                </h2>
              </div>

              <div className="grid gap-4">
                {section.questions
                  .filter((q) =>
                    q.q.toLowerCase().includes(searchTerm.toLowerCase()),
                  )
                  .map((item, qIdx) => {
                    const id = `${sIdx}-${qIdx}`;
                    const isOpen = openIndex === id;

                    return (
                      <div
                        key={id}
                        className={cn(
                          "institutional-card transition-all duration-500 overflow-hidden",
                          isOpen
                            ? "border-primary-700/50 shadow-2xl"
                            : "hover:border-primary-700/30",
                        )}
                      >
                        <button
                          onClick={() => setOpenIndex(isOpen ? null : id)}
                          className="w-full p-8 flex items-center justify-between text-left"
                        >
                          <span className="text-lg font-bold tracking-tight">
                            {item.q}
                          </span>
                          <ChevronDown
                            className={cn(
                              "w-5 h-5 text-primary-700 transition-transform duration-500",
                              isOpen && "rotate-180",
                            )}
                          />
                        </button>
                        <AnimatePresence>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="px-8 pb-8"
                            >
                              <p className="text-muted-foreground font-medium leading-relaxed border-t pt-6">
                                {item.a}
                              </p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
              </div>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-32 text-center">
          <Reveal>
            <div className="glass-surface p-12 rounded-[3rem] border inline-flex flex-col items-center space-y-6">
              <p className="font-black uppercase tracking-widest text-xs">
                Still have unanswered inquiries?
              </p>
              <h3 className="text-3xl font-black">
                Our Support Office is Open.
              </h3>
              <div className="flex gap-4">
                <button className="h-14 px-8 rounded-xl bg-primary-700 text-white font-black text-[10px] tracking-widest uppercase">
                  Contact Admissions
                </button>
                <button className="h-14 px-8 rounded-xl border-2 font-black text-[10px] tracking-widest uppercase">
                  Help Center
                </button>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </main>
  );
}
