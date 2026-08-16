// app/(marketing)/physical/components/sections/PhysicalFAQ.tsx
"use client";

import { useState } from "react";
import { Reveal } from "@/components/shared/section-animation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  HelpCircle,
  Sparkles,
  Search,
  X,
  Clock,
  Users,
  Home,
  Calendar,
  Award,
  Shield,
  BookOpen,
  Mail,
  Phone,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const FAQS = [
  {
    id: "admission-requirements",
    q: "What are the admission requirements?",
    a: "Students should have basic Quran reading ability. A placement assessment is conducted to determine the appropriate starting level. No prior memorization experience is required.",
    category: "Admissions",
    icon: Shield,
  },
  {
    id: "day-boarding-difference",
    q: "What is the difference between Day and Boarding programmes?",
    a: "Day students attend classes and return home daily. Boarding students live on campus in a fully immersive environment with structured daily routines (4:00 AM - 9:00 PM), meals, and 24/7 supervision. Both programmes follow the same curriculum but boarding offers a more intensive experience.",
    category: "Programmes",
    icon: Home,
  },
  {
    id: "program-duration",
    q: "How long does it take to complete the program?",
    a: "The duration varies based on individual pace. On average, students complete Juz Amma in 6-12 months and full Hifz in 2-5 years. Day students may take slightly longer due to fewer weekly hours.",
    category: "Programmes",
    icon: Clock,
  },
  {
    id: "ijazah-certification",
    q: "Do you offer Ijazah certification?",
    a: "Yes. Students who complete the full memorization with proper Tajweed and pass the final examination receive Ijazah certification with a complete Sanad chain. This is recognized internationally.",
    category: "Certification",
    icon: Award,
  },
  {
    id: "fee-structure",
    q: "What is the fee structure?",
    a: "Fees are term-based. Day Programme: ₦120,000/term. Boarding Programme: ₦250,000/term. Boarding + Ijazah Track: ₦320,000/term. Payment plans and sibling discounts are available.",
    category: "Fees",
    icon: Shield,
  },
  {
    id: "trial-period",
    q: "Is there a trial period?",
    a: "Yes. We offer a one-week trial for new students to experience the programme before committing to full enrollment. This allows students and parents to assess if Daar-ul-Maysaroh is the right fit.",
    category: "Admissions",
    icon: Calendar,
  },
  {
    id: "age-range",
    q: "What age groups do you accept?",
    a: "We accept students aged 7 and above. Our programmes cater to children (7-12), teenagers (13-17), and adults (18+). Each age group has age-appropriate teaching methods.",
    category: "Admissions",
    icon: Users,
  },
  {
    id: "schedule-flexibility",
    q: "Can I customize my schedule?",
    a: "Yes. We offer flexible scheduling options including Part-Time Day (Sat-Sun), Full-Time Day (Weekends + Evenings), Part-Time Boarding (Fri-Sun), and Full-Time Boarding (Daily). Custom schedules can be arranged upon request.",
    category: "Programmes",
    icon: Calendar,
  },
  {
    id: "daily-routine",
    q: "What does a typical day look like for boarding students?",
    a: "Boarding students follow a structured routine from 4:00 AM to 9:00 PM daily. This includes Tahajjud, Fajr, Tahfeedh sessions, Tajweed classes, Islamic Studies, meals, revision, Isha prayer, and night revision.",
    category: "Student Life",
    icon: Clock,
  },
  {
    id: "parent-involvement",
    q: "How are parents involved in their child's progress?",
    a: "Parents receive regular progress reports and have access to a parent portal. We schedule parent-teacher meetings termly and maintain open communication through our support channels.",
    category: "Parent",
    icon: Users,
  },
];

const CATEGORIES = [
  { id: "All", label: "All Questions", icon: HelpCircle },
  { id: "Admissions", label: "Admissions", icon: Shield },
  { id: "Programmes", label: "Programmes", icon: BookOpen },
  { id: "Certification", label: "Certification", icon: Award },
  { id: "Fees", label: "Fees", icon: Shield },
  { id: "Student Life", label: "Student Life", icon: Clock },
  { id: "Parent", label: "Parent", icon: Users },
];

export function PhysicalFAQ() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [openId, setOpenId] = useState<string | null>("admission-requirements");

  const filteredFAQs = FAQS.filter((faq) => {
    const matchesSearch =
      searchQuery === "" ||
      faq.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.a.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      activeCategory === "All" || faq.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleFAQ = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  const clearFilters = () => {
    setSearchQuery("");
    setActiveCategory("All");
  };

  return (
    <section className="py-16 sm:py-20 md:py-24 lg:py-28 bg-gradient-to-b from-background via-purple-50/5 to-amber-50/5 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 xs:px-5 sm:px-6 relative z-10">
        {/* Section Header */}
        <Reveal>
          <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-100 to-amber-100 dark:from-purple-900/30 dark:to-amber-900/30 border border-purple-200 dark:border-purple-800 mb-4">
              <HelpCircle className="w-4 h-4 text-amber-500" />
              <span className="text-[10px] font-black uppercase tracking-wider text-purple-700 dark:text-purple-400">
                Frequently Asked Questions
              </span>
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter font-heading leading-[1.1] mb-4">
              Common{" "}
              <span className="bg-gradient-to-r from-purple-600 via-purple-700 to-amber-600 bg-clip-text text-transparent italic">
                Questions
              </span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to know about Daar-ul-Maysaroh
            </p>
          </div>
        </Reveal>

        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search your question..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-10 py-3 rounded-full border-2 border-purple-200 dark:border-purple-800 bg-background focus:border-purple-500 outline-none text-sm transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2"
              >
                <X className="w-4 h-4 text-muted-foreground hover:text-purple-600 transition-colors" />
              </button>
            )}
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={cn(
                  "px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-wider transition-all flex items-center gap-1.5",
                  isActive
                    ? "bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-md"
                    : "bg-muted/30 hover:bg-purple-100 dark:hover:bg-purple-950/40 border border-purple-200 dark:border-purple-800",
                )}
              >
                <Icon className="w-3 h-3" />
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Results Count */}
        {searchQuery && (
          <div className="text-center mb-4">
            <p className="text-xs text-muted-foreground">
              Found {filteredFAQs.length} question
              {filteredFAQs.length !== 1 ? "s" : ""}
            </p>
          </div>
        )}

        {/* FAQ Accordion */}
        {filteredFAQs.length === 0 ? (
          <div className="text-center py-12">
            <HelpCircle className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">
              No questions found matching your search.
            </p>
            <button
              onClick={clearFilters}
              className="text-purple-600 font-black text-sm mt-2 hover:underline"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-4 max-w-5xl mx-auto">
            {filteredFAQs.map((faq) => {
              const Icon = faq.icon;
              const isOpen = openId === faq.id;
              return (
                <Reveal key={faq.id} delay={0.05}>
                  <div className="bg-card rounded-xl border border-purple-200 dark:border-purple-800 hover:border-purple-300 transition-all overflow-hidden">
                    <button
                      onClick={() => toggleFAQ(faq.id)}
                      className="w-full text-left p-4 flex items-start gap-3 hover:bg-purple-50/30 dark:hover:bg-purple-950/20 transition"
                    >
                      <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-950/40 flex items-center justify-center shrink-0 mt-0.5">
                        <Icon className="w-4 h-4 text-purple-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-[8px] font-black text-purple-600 bg-purple-100 dark:bg-purple-950/40 px-2 py-0.5 rounded">
                            {faq.category}
                          </span>
                        </div>
                        <p className="font-black text-sm mt-1">{faq.q}</p>
                      </div>
                      <ChevronDown
                        className={cn(
                          "w-4 h-4 text-purple-600 shrink-0 transition-transform mt-1",
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
                          transition={{ duration: 0.3 }}
                        >
                          <div className="px-4 pb-4 pt-0">
                            <p className="text-sm text-muted-foreground leading-relaxed border-l-2 border-amber-500 pl-4">
                              {faq.a}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </Reveal>
              );
            })}
          </div>
        )}

        {/* Still Have Questions? */}
        <Reveal delay={0.3}>
          <div className="mt-12 text-center">
            <div className="inline-flex flex-col sm:flex-row items-center gap-3 px-6 py-4 rounded-2xl bg-gradient-to-r from-purple-50/30 to-amber-50/30 dark:from-purple-950/20 dark:to-amber-950/20 border border-purple-200 dark:border-purple-800">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span className="text-sm font-medium text-muted-foreground">
                  Still have questions?
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Link href="/physical/contact">
                  <Button className="rounded-full px-4 py-1.5 font-black text-xs bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white">
                    Contact Us
                  </Button>
                </Link>
                <Link href="/physical/admissions">
                  <Button
                    variant="outline"
                    className="rounded-full px-4 py-1.5 font-black text-xs border-purple-300 text-purple-600"
                  >
                    Apply Now
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
