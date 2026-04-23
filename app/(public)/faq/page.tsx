// app/faq/page.tsx - FIXED VERSION
"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  ChevronDown,
  Search,
  HelpCircle,
  MessageCircle,
  Sparkles,
  Mail,
  Phone,
  X,
  Users,
  Award,
  CreditCard,
  Clock,
  BookOpen,
  Shield,
  ArrowRight,
  Star,
  Zap,
  Heart,
  Headphones,
  Calendar,
  Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/shared/section-animation";

// Enhanced FAQ Data
const FAQS = [
  {
    id: 1,
    question: "Can I join if I have no prior Arabic knowledge?",
    answer:
      "Absolutely! We have students starting from absolute zero. Our teachers are experienced in guiding beginners of all ages. You'll start with basic letter recognition and gradually build up to full Quran reading.",
    category: "Beginners",
    popular: true,
    icon: BookOpen,
    longAnswer:
      "Our structured curriculum begins with the Arabic alphabet, then progresses to joining letters, basic words, and eventually full Quranic reading. Most students achieve basic reading fluency within 4-6 months with consistent practice.",
  },
  {
    id: 2,
    question: "How much time do I need to dedicate daily?",
    answer:
      "We recommend 15-30 minutes of daily revision. Consistency matters more than quantity. Our teachers help you build sustainable habits that fit your schedule.",
    category: "Scheduling",
    popular: true,
    icon: Clock,
    longAnswer:
      "Research shows that short, consistent daily practice is more effective than longer, sporadic sessions. Our revision system is designed to maximize retention in minimal time.",
  },
  {
    id: 3,
    question: "What's the difference between group and 1-on-1?",
    answer:
      "Group classes (4-6 students) offer peer motivation and lower cost ($79/month). 1-on-1 provides personalized attention and flexible pacing ($2+ per session/month).",
    category: "Formats",
    popular: true,
    icon: Users,
    longAnswer:
      "Both formats are highly effective. Group classes foster healthy competition and peer learning, while 1-on-1 allows for complete customization of pace and focus areas.",
  },
  {
    id: 4,
    question: "Do I get a certificate upon completion?",
    answer:
      "Yes! Students receive a Certificate of Completion. Advanced students can pursue Ijazah certification with a complete Sanad chain to Prophet Muhammad (ﷺ).",
    category: "Certification",
    popular: true,
    icon: Award,
    longAnswer:
      "Our certificates are recognized by scholarly councils worldwide. The Ijazah certification is a traditional license to teach the Quran with an unbroken chain of transmission.",
  },
  {
    id: 5,
    question: "Is there a free trial?",
    answer:
      "Yes! We offer a free 20-30 minute assessment session where you can experience our teaching methodology and get your level evaluated. No commitment required.",
    category: "Assessment",
    popular: true,
    icon: Star,
    longAnswer:
      "During your free assessment, you'll meet with a senior scholar who will evaluate your current level, discuss your goals, and recommend the ideal program path.",
  },
  {
    id: 6,
    question: "What is an Ijazah?",
    answer:
      "Ijazah is a formal certification that grants permission to recite and teach the Quran with an unbroken chain of transmission (Sanad) reaching back to Prophet Muhammad (ﷺ).",
    category: "Certification",
    popular: true,
    icon: Shield,
    longAnswer:
      "The Ijazah represents the culmination of traditional Islamic scholarship. It's not just a certificate - it's a spiritual and scholarly connection to 1400 years of Quranic preservation.",
  },
  {
    id: 7,
    question: "Do you have female teachers?",
    answer:
      "Yes! We have qualified female teachers (Ustadhas) available for female students who prefer female instructors.",
    category: "Audience",
    popular: false,
    icon: Heart,
    longAnswer:
      "Our female teachers are Ijazah-certified scholars with years of experience teaching women and children. You can request a female instructor during enrollment.",
  },
  {
    id: 8,
    question: "What technology do I need?",
    answer:
      "A computer or tablet with a camera and microphone, stable internet connection, and Zoom (free version works perfectly).",
    category: "Technical",
    popular: false,
    icon: Headphones,
    longAnswer:
      "We recommend using a laptop or tablet for the best experience. Our platform works on all major browsers.",
  },
  {
    id: 9,
    question: "How do I pay?",
    answer:
      "We accept credit/debit cards (Visa, Mastercard, AMEX), bank transfers, mobile money, and Western Union. Monthly subscriptions are processed securely through Stripe.",
    category: "Payment",
    popular: false,
    icon: CreditCard,
    longAnswer:
      "Payments are processed through our secure payment gateway. You can choose monthly, quarterly, or annual billing cycles.",
  },
  {
    id: 10,
    question: "Is financial aid available?",
    answer:
      "Yes, Zakat-funded grants are available for eligible students facing financial hardship. Applications are reviewed quarterly.",
    category: "Payment",
    popular: false,
    icon: Heart,
    longAnswer:
      "We believe sacred knowledge should be accessible to all sincere seekers. Our Zakat-funded grant program has supported over 50 students.",
  },
];

const CATEGORIES = [
  { id: "all", name: "All", icon: HelpCircle, count: FAQS.length },
  {
    id: "Beginners",
    name: "Beginners",
    icon: BookOpen,
    count: FAQS.filter((f) => f.category === "Beginners").length,
  },
  {
    id: "Scheduling",
    name: "Schedule",
    icon: Clock,
    count: FAQS.filter((f) => f.category === "Scheduling").length,
  },
  {
    id: "Formats",
    name: "Formats",
    icon: Users,
    count: FAQS.filter((f) => f.category === "Formats").length,
  },
  {
    id: "Certification",
    name: "Certification",
    icon: Award,
    count: FAQS.filter((f) => f.category === "Certification").length,
  },
  {
    id: "Payment",
    name: "Payment",
    icon: CreditCard,
    count: FAQS.filter((f) => f.category === "Payment").length,
  },
  {
    id: "Technical",
    name: "Technical",
    icon: Headphones,
    count: FAQS.filter((f) => f.category === "Technical").length,
  },
];

function CategoryCard({
  category,
  isActive,
  onClick,
}: {
  category: (typeof CATEGORIES)[0];
  isActive: boolean;
  onClick: () => void;
}) {
  const Icon = category.icon;

  return (
    <motion.button
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={cn(
        "p-3 xs:p-4 rounded-xl xs:rounded-2xl text-center transition-all duration-300",
        isActive
          ? "bg-gradient-to-r from-purple-600 to-purple-700 shadow-lg"
          : "bg-card border border-border hover:border-purple-300",
      )}
    >
      <div
        className={cn(
          "w-10 h-10 xs:w-12 xs:h-12 mx-auto mb-2 xs:mb-3 rounded-xl flex items-center justify-center transition-all duration-300",
          isActive
            ? "bg-white/20"
            : "bg-purple-100 dark:bg-purple-950/40 group-hover:scale-110",
        )}
      >
        <Icon
          className={cn(
            "w-5 h-5 xs:w-6 xs:h-6",
            isActive ? "text-white" : "text-purple-600",
          )}
        />
      </div>
      <p
        className={cn(
          "text-[10px] xs:text-xs font-black uppercase tracking-tight",
          isActive ? "text-white" : "text-foreground",
        )}
      >
        {category.name}
      </p>
      <p
        className={cn(
          "text-[8px] xs:text-[9px] font-medium mt-0.5",
          isActive ? "text-white/70" : "text-muted-foreground",
        )}
      >
        {category.count} questions
      </p>
    </motion.button>
  );
}

function FAQAccordionItem({
  faq,
  isOpen,
  onToggle,
  index,
}: {
  faq: (typeof FAQS)[0];
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}) {
  const Icon = faq.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.03 }}
      className="group"
    >
      <div
        className={cn(
          "bg-card rounded-xl xs:rounded-2xl border transition-all duration-300",
          isOpen
            ? "border-purple-300 shadow-xl"
            : "border-border hover:border-purple-200 hover:shadow-md",
        )}
      >
        <button
          onClick={onToggle}
          className="w-full text-left p-4 xs:p-5 sm:p-6 flex items-start gap-3 xs:gap-4"
        >
          <div className="shrink-0 mt-0.5">
            <div
              className={cn(
                "w-8 h-8 xs:w-10 xs:h-10 rounded-xl flex items-center justify-center transition-all duration-300",
                isOpen
                  ? "bg-purple-600 text-white"
                  : "bg-purple-100 dark:bg-purple-950/40 text-purple-600 group-hover:scale-110",
              )}
            >
              <Icon className="w-4 h-4 xs:w-5 xs:h-5" />
            </div>
          </div>

          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-1.5 xs:gap-2 mb-1">
              <span
                className={cn(
                  "text-[7px] xs:text-[8px] font-black uppercase tracking-wider px-1.5 xs:px-2 py-0.5 rounded",
                  isOpen
                    ? "bg-purple-600 text-white"
                    : "bg-purple-100 dark:bg-purple-950/40 text-purple-600",
                )}
              >
                {faq.category}
              </span>
              {faq.popular && (
                <span className="text-[7px] xs:text-[8px] font-black uppercase tracking-wider text-amber-600 bg-amber-100 dark:bg-amber-950/40 px-1.5 xs:px-2 py-0.5 rounded flex items-center gap-1">
                  <Star className="w-2 h-2 xs:w-2.5 xs:h-2.5" />
                  Popular
                </span>
              )}
            </div>
            <h3 className="font-black text-sm xs:text-base sm:text-lg pr-4">
              {faq.question}
            </h3>
          </div>

          <ChevronDown
            className={cn(
              "w-4 h-4 xs:w-5 xs:h-5 text-purple-600 transition-all duration-300 shrink-0 mt-1",
              isOpen && "rotate-180",
            )}
          />
        </button>

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <div className="px-4 xs:px-5 sm:px-6 pb-4 xs:pb-5 sm:pb-6 pt-0">
                <div className="pl-10 xs:pl-12">
                  <p className="text-xs xs:text-sm text-muted-foreground leading-relaxed mb-3">
                    {faq.answer}
                  </p>
                  {faq.longAnswer && (
                    <div className="mt-3 p-3 xs:p-4 rounded-xl bg-purple-50/30 dark:bg-purple-950/20 border border-purple-100 dark:border-purple-800">
                      <p className="text-[10px] xs:text-xs text-muted-foreground leading-relaxed">
                        <span className="font-black text-purple-600">
                          💡 Did you know?
                        </span>{" "}
                        {faq.longAnswer}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [openId, setOpenId] = useState<number | null>(null);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, [searchQuery, activeCategory]);

  const filteredFAQs = FAQS.filter((faq) => {
    const matchesSearch =
      searchQuery === "" ||
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.longAnswer?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      activeCategory === "all" || faq.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleFAQ = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  const popularFAQs = FAQS.filter((f) => f.popular).slice(0, 4);

  return (
    <main className="min-h-screen bg-background pt-16 sm:pt-20">
      {/* Hero Section */}
      <section className="relative pt-8 xs:pt-10 sm:pt-12 pb-8 xs:pb-10 sm:pb-16 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-64 xs:w-96 h-64 xs:h-96 bg-purple-600/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 xs:w-96 h-64 xs:h-96 bg-amber-500/5 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 xs:px-5 sm:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <Reveal>
              <div className="inline-flex items-center gap-1.5 xs:gap-2 px-2.5 xs:px-3 py-1 xs:py-1.5 rounded-full bg-gradient-to-r from-purple-100 to-amber-100 dark:from-purple-900/30 dark:to-amber-900/30 border border-purple-200 dark:border-purple-800 mb-3 xs:mb-4">
                <Sparkles className="w-3 h-3 xs:w-3.5 xs:h-3.5 text-amber-500" />
                <span className="text-[8px] xs:text-[9px] sm:text-[10px] font-black uppercase tracking-wider text-purple-700 dark:text-purple-400">
                  Knowledge Base
                </span>
              </div>
              <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter font-heading leading-[1.1] mb-3 xs:mb-4">
                Frequently Asked{" "}
                <span className="bg-gradient-to-r from-purple-600 to-amber-600 bg-clip-text text-transparent italic">
                  Questions
                </span>
              </h1>
              <p className="text-sm xs:text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
                Everything you need to know about beginning your Quranic journey
                with Al-Maysaroh
              </p>
            </Reveal>

            {/* Search Bar */}
            <Reveal delay={0.1}>
              <div className="max-w-md mx-auto mt-6 xs:mt-8">
                <div
                  className={cn(
                    "relative transition-all duration-300",
                    isSearchFocused && "scale-[1.02]",
                  )}
                >
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    ref={searchRef}
                    type="text"
                    placeholder="Search your question..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setIsSearchFocused(true)}
                    onBlur={() => setIsSearchFocused(false)}
                    className="w-full pl-11 pr-11 py-3 rounded-full border-2 border-border bg-background focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 outline-none transition-all text-sm"
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
            </Reveal>
          </div>
        </div>
      </section>

      {/* Popular Questions Quick Access */}
      {searchQuery === "" && activeCategory === "all" && (
        <section className="py-4 xs:py-6">
          <div className="container mx-auto px-4 xs:px-5 sm:px-6 max-w-5xl">
            <div className="flex flex-wrap items-center justify-center gap-1.5 xs:gap-2 mb-4 xs:mb-6">
              <Zap className="w-3 h-3 xs:w-4 xs:h-4 text-amber-500" />
              <span className="text-[9px] xs:text-[10px] font-black uppercase tracking-wider text-muted-foreground">
                Popular Questions
              </span>
            </div>
            <div className="flex flex-wrap justify-center gap-1.5 xs:gap-2">
              {popularFAQs.map((faq) => (
                <button
                  key={faq.id}
                  onClick={() => {
                    setSearchQuery(faq.question);
                    searchRef.current?.focus();
                  }}
                  className="px-2 xs:px-3 py-1 xs:py-1.5 rounded-full bg-muted/30 hover:bg-purple-100 dark:hover:bg-purple-950/30 border border-border text-[9px] xs:text-xs font-medium transition-all"
                >
                  {faq.question.length > 35
                    ? faq.question.substring(0, 35) + "..."
                    : faq.question}
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Category Filters */}
      <section className="py-4 xs:py-6">
        <div className="container mx-auto px-4 xs:px-5 sm:px-6 max-w-5xl">
          <div className="grid grid-cols-2 xs:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2 xs:gap-3">
            {CATEGORIES.map((cat) => (
              <CategoryCard
                key={cat.id}
                category={cat}
                isActive={activeCategory === cat.id}
                onClick={() => setActiveCategory(cat.id)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="py-6 xs:py-8 sm:py-12">
        <div className="container mx-auto px-4 xs:px-5 sm:px-6 max-w-3xl">
          {/* Results Count */}
          <div className="flex items-center justify-between mb-4 xs:mb-6">
            <p className="text-[11px] xs:text-xs sm:text-sm text-muted-foreground">
              {isLoading ? (
                <Loader2 className="w-3 h-3 xs:w-4 xs:h-4 animate-spin" />
              ) : (
                <>
                  Found{" "}
                  <span className="font-black text-purple-600">
                    {filteredFAQs.length}
                  </span>{" "}
                  questions
                </>
              )}
            </p>
            {(searchQuery || activeCategory !== "all") && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("all");
                }}
                className="text-[10px] xs:text-xs text-purple-600 hover:underline flex items-center gap-1"
              >
                <X className="w-3 h-3" />
                Clear filters
              </button>
            )}
          </div>

          {/* No Results */}
          {filteredFAQs.length === 0 && !isLoading && (
            <div className="text-center py-12 xs:py-16">
              <div className="w-16 h-16 xs:w-20 xs:h-20 mx-auto mb-3 xs:mb-4 rounded-full bg-muted/30 flex items-center justify-center">
                <HelpCircle className="w-8 h-8 xs:w-10 xs:h-10 text-muted-foreground/50" />
              </div>
              <h3 className="text-lg xs:text-xl font-black mb-2">
                No questions found
              </h3>
              <p className="text-xs xs:text-sm text-muted-foreground mb-4 xs:mb-6">
                Try adjusting your search or browse by category
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("all");
                }}
                className="px-5 xs:px-6 py-2 xs:py-2.5 rounded-full bg-purple-600 text-white font-black text-[10px] xs:text-xs"
              >
                Browse all questions
              </button>
            </div>
          )}

          {/* FAQ Items */}
          <AnimatePresence mode="wait">
            {!isLoading && (
              <motion.div
                key={`${activeCategory}-${searchQuery}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-3"
              >
                {filteredFAQs.map((faq, index) => (
                  <FAQAccordionItem
                    key={faq.id}
                    faq={faq}
                    isOpen={openId === faq.id}
                    onToggle={() => toggleFAQ(faq.id)}
                    index={index}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Still Need Help - CTA */}
      <section className="py-12 xs:py-16 sm:py-20">
        <div className="container mx-auto px-4 xs:px-5 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <Reveal>
              <div className="relative overflow-hidden rounded-2xl xs:rounded-3xl bg-gradient-to-br from-purple-600/10 to-amber-500/10 border border-purple-200 dark:border-purple-800 p-6 xs:p-8 sm:p-12 text-center">
                <div className="absolute top-0 right-0 w-32 xs:w-40 h-32 xs:h-40 bg-purple-600/5 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-32 xs:w-40 h-32 xs:h-40 bg-amber-500/5 rounded-full blur-3xl" />

                <div className="relative z-10">
                  <div className="inline-flex items-center gap-1.5 xs:gap-2 px-2.5 xs:px-3 py-1 xs:py-1.5 rounded-full bg-purple-100 dark:bg-purple-900/30 mb-3 xs:mb-4">
                    <MessageCircle className="w-3 h-3 xs:w-3.5 xs:h-3.5 text-amber-500" />
                    <span className="text-[8px] xs:text-[9px] sm:text-[10px] font-black uppercase tracking-wider text-purple-700 dark:text-purple-400">
                      Still Have Questions?
                    </span>
                  </div>

                  <h2 className="text-xl xs:text-2xl sm:text-3xl font-black mb-2 xs:mb-3">
                    We're Here to Help
                  </h2>

                  <p className="text-xs xs:text-sm text-muted-foreground mb-6 xs:mb-8 max-w-md mx-auto px-4">
                    Our academic advisors are available 7 days a week to discuss
                    your specific needs and answer any questions.
                  </p>

                  <div className="flex flex-col xs:flex-row gap-3 xs:gap-4 justify-center">
                    <Link href="/contact">
                      <Button className="rounded-full px-6 xs:px-8 py-2.5 xs:py-3.5 font-black bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white shadow-lg transition-all duration-300 group">
                        <span className="flex items-center gap-2 text-[10px] xs:text-xs">
                          Contact Support
                          <ArrowRight className="w-3.5 h-3.5 xs:w-4 xs:h-4 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </Button>
                    </Link>
                    <Link href="/assessment">
                      <Button
                        variant="outline"
                        className="rounded-full px-6 xs:px-8 py-2.5 xs:py-3.5 font-black border-purple-300 text-purple-600 hover:bg-purple-50 transition-all duration-300 text-[10px] xs:text-xs"
                      >
                        Book Free Assessment
                      </Button>
                    </Link>
                  </div>

                  <div className="mt-6 xs:mt-8 pt-4 xs:pt-6 border-t border-border/50 flex flex-wrap justify-center gap-4 xs:gap-6 text-[9px] xs:text-xs text-muted-foreground">
                    <div className="flex items-center gap-1.5 xs:gap-2">
                      <Mail className="w-3 h-3 xs:w-3.5 xs:h-3.5 text-purple-600" />
                      <a
                        href="mailto:support@almaysaroh.org"
                        className="hover:text-purple-600 transition-colors"
                      >
                        support@almaysaroh.org
                      </a>
                    </div>
                    <div className="flex items-center gap-1.5 xs:gap-2">
                      <Phone className="w-3 h-3 xs:w-3.5 xs:h-3.5 text-purple-600" />
                      <a
                        href="tel:+2349110163930"
                        className="hover:text-purple-600 transition-colors"
                      >
                        +234 911 016 3930
                      </a>
                    </div>
                    <div className="flex items-center gap-1.5 xs:gap-2">
                      <Clock className="w-3 h-3 xs:w-3.5 xs:h-3.5 text-purple-600" />
                      <span>Response within 24 hours</span>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </main>
  );
}
