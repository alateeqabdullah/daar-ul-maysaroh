// app/faq/page.tsx - ULTIMATE VERSION
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

// Enhanced FAQ Data with more depth
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
      "Both formats are highly effective. Group classes foster healthy competition and peer learning, while 1-on-1 allows for complete customization of pace and focus areas. Many students start in groups and transition to private sessions as they advance.",
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
      "Our certificates are recognized by scholarly councils worldwide. The Ijazah certification is a traditional license to teach the Quran with an unbroken chain of transmission - a rare and precious achievement.",
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
      "During your free assessment, you'll meet with a senior scholar who will evaluate your current level, discuss your goals, and recommend the ideal program path. It's completely risk-free.",
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
      "We recommend using a laptop or tablet for the best experience. Smartphones work too, but a larger screen makes following along much easier. Our platform works on all major browsers.",
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
      "Payments are processed through our secure payment gateway. You can choose monthly, quarterly, or annual billing cycles. All major international payment methods are accepted.",
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
      "We believe sacred knowledge should be accessible to all sincere seekers. Our Zakat-funded grant program has supported over 50 students in their Quranic journey.",
  },
  {
    id: 11,
    question: "Can I learn at my own pace?",
    answer:
      "Absolutely! Every student has a personalized learning plan. You can accelerate or take more time based on your goals and availability.",
    category: "Scheduling",
    popular: true,
    icon: Clock,
    longAnswer:
      "Our teachers work with you to create a custom pacing plan. Some students complete programs faster, others prefer a more gradual approach - both are supported.",
  },
  {
    id: 12,
    question: "What if I miss a class?",
    answer:
      "All sessions are recorded and available in your portal. You can review and submit practice recordings for feedback.",
    category: "Technical",
    popular: false,
    icon: Calendar,
    longAnswer:
      "We understand that life happens. Our portal gives you access to all session recordings, and you can schedule make-up sessions within the same week. No questions asked.",
  },
];

const CATEGORIES = [
  {
    id: "all",
    name: "All",
    icon: HelpCircle,
    count: FAQS.length,
    color: "purple",
  },
  {
    id: "Beginners",
    name: "Beginners",
    icon: BookOpen,
    count: FAQS.filter((f) => f.category === "Beginners").length,
    color: "emerald",
  },
  {
    id: "Scheduling",
    name: "Schedule",
    icon: Clock,
    count: FAQS.filter((f) => f.category === "Scheduling").length,
    color: "blue",
  },
  {
    id: "Formats",
    name: "Formats",
    icon: Users,
    count: FAQS.filter((f) => f.category === "Formats").length,
    color: "amber",
  },
  {
    id: "Certification",
    name: "Certification",
    icon: Award,
    count: FAQS.filter((f) => f.category === "Certification").length,
    color: "gold",
  },
  {
    id: "Payment",
    name: "Payment",
    icon: CreditCard,
    count: FAQS.filter((f) => f.category === "Payment").length,
    color: "teal",
  },
  {
    id: "Technical",
    name: "Technical",
    icon: Headphones,
    count: FAQS.filter((f) => f.category === "Technical").length,
    color: "slate",
  },
];

const CATEGORY_COLORS: Record<string, string> = {
  purple: "from-purple-600 to-purple-700",
  emerald: "from-emerald-500 to-emerald-600",
  blue: "from-blue-500 to-blue-600",
  amber: "from-amber-500 to-amber-600",
  gold: "from-gold to-amber-600",
  teal: "from-teal-500 to-teal-600",
  slate: "from-slate-500 to-slate-600",
};

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
  const gradientColor =
    CATEGORY_COLORS[category.color] || CATEGORY_COLORS.purple;

  return (
    <motion.button
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={cn(
        "relative group p-4 rounded-2xl text-center transition-all duration-300",
        isActive
          ? "bg-linear-to-br shadow-lg"
          : "bg-card border border-border hover:border-primary-300",
      )}
      style={
        isActive
          ? {
              background: `linear-gradient(135deg, var(--tw-gradient-stops))`,
              backgroundImage: `linear-gradient(135deg, ${gradientColor.split(" ")[1]}, ${gradientColor.split(" ")[3]})`,
            }
          : {}
      }
    >
      <div
        className={cn(
          "w-12 h-12 mx-auto mb-3 rounded-xl flex items-center justify-center transition-all duration-300",
          isActive
            ? "bg-white/20"
            : `bg-${category.color}-100 dark:bg-${category.color}-950/40 group-hover:scale-110`,
        )}
      >
        <Icon
          className={cn(
            "w-6 h-6",
            isActive ? "text-white" : `text-${category.color}-600`,
          )}
        />
      </div>
      <p
        className={cn(
          "text-xs font-black uppercase tracking-tight",
          isActive ? "text-white" : "text-foreground",
        )}
      >
        {category.name}
      </p>
      <p
        className={cn(
          "text-[9px] font-medium mt-0.5",
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
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(contentRef.current.scrollHeight);
    }
  }, [isOpen]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.03 }}
      className="group"
    >
      <div
        className={cn(
          "bg-card rounded-2xl border transition-all duration-300 overflow-hidden",
          isOpen
            ? "border-primary-300 shadow-xl"
            : "border-border hover:border-primary-200 hover:shadow-md",
        )}
      >
        <button
          onClick={onToggle}
          className="w-full text-left p-5 sm:p-6 flex items-start gap-4"
        >
          <div className="shrink-0 mt-0.5">
            <div
              className={cn(
                "w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300",
                isOpen
                  ? "bg-primary-600 text-white"
                  : "bg-primary-100 dark:bg-primary-950/40 text-primary-600 group-hover:scale-110",
              )}
            >
              <Icon className="w-5 h-5" />
            </div>
          </div>

          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <span
                className={cn(
                  "text-[8px] font-black uppercase tracking-wider px-2 py-0.5 rounded",
                  isOpen
                    ? "bg-primary-600 text-white"
                    : "bg-primary-100 dark:bg-primary-950/40 text-primary-600",
                )}
              >
                {faq.category}
              </span>
              {faq.popular && (
                <span className="text-[8px] font-black uppercase tracking-wider text-amber-600 bg-amber-100 dark:bg-amber-950/40 px-2 py-0.5 rounded flex items-center gap-1">
                  <Star className="w-2.5 h-2.5" />
                  Popular
                </span>
              )}
            </div>
            <h3 className="font-black text-base sm:text-lg pr-6">
              {faq.question}
            </h3>
          </div>

          <ChevronDown
            className={cn(
              "w-5 h-5 text-primary-600 transition-all duration-300 shrink-0 mt-1",
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
              className="overflow-hidden"
            >
              <div ref={contentRef} className="px-5 sm:px-6 pb-5 sm:pb-6 pt-0">
                <div className="pl-14">
                  <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                    {faq.answer}
                  </p>
                  {faq.longAnswer && (
                    <div className="mt-3 p-4 rounded-xl bg-primary-50/30 dark:bg-primary-950/20 border border-primary-100 dark:border-primary-800">
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        <span className="font-black text-primary-600">
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

  // Simulate loading on filter change
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

  // Popular questions for quick access
  const popularFAQs = FAQS.filter((f) => f.popular).slice(0, 4);

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section - Enhanced */}
      <section className="relative pt-20 sm:pt-24 pb-12 sm:pb-16 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <Reveal>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-linear-to-r from-purple-100 to-amber-100 dark:from-purple-900/30 dark:to-amber-900/30 border border-purple-200 dark:border-purple-800 mb-4">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span className="text-[10px] font-black uppercase tracking-wider text-purple-700 dark:text-purple-400">
                  Knowledge Base
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter font-heading leading-[1.1] mb-4">
                Frequently Asked{" "}
                <span className="bg-linear-to-r from-purple-600 to-amber-600 bg-clip-text text-transparent italic">
                  Questions
                </span>
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
                Everything you need to know about beginning your Quranic journey
                with Al-Maysaroh
              </p>
            </Reveal>

            {/* Search Bar - Premium */}
            <Reveal delay={0.1}>
              <div className="max-w-md mx-auto mt-8">
                <div
                  className={cn(
                    "relative transition-all duration-300",
                    isSearchFocused && "scale-105",
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
                    className="w-full pl-11 pr-11 py-3.5 rounded-full border-2 border-border bg-background focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 outline-none transition-all text-sm"
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
        <section className="py-6">
          <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
            <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
              <Zap className="w-4 h-4 text-amber-500" />
              <span className="text-xs font-black uppercase tracking-wider text-muted-foreground">
                Popular Questions
              </span>
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              {popularFAQs.map((faq) => (
                <button
                  key={faq.id}
                  onClick={() => {
                    setSearchQuery(faq.question);
                    searchRef.current?.focus();
                  }}
                  className="px-3 py-1.5 rounded-full bg-muted/30 hover:bg-purple-100 dark:hover:bg-purple-950/30 border border-border text-xs font-medium transition-all"
                >
                  {faq.question.length > 40
                    ? faq.question.substring(0, 40) + "..."
                    : faq.question}
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Category Filters - Premium Cards */}
      <section className="py-6">
        <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
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
      <section className="py-8 sm:py-12">
        <div className="container mx-auto px-4 sm:px-6 max-w-3xl">
          {/* Results Count */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-muted-foreground">
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  Found{" "}
                  <span className="font-black text-primary-600">
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
                className="text-xs text-primary-600 hover:underline flex items-center gap-1"
              >
                <X className="w-3 h-3" />
                Clear filters
              </button>
            )}
          </div>

          {/* No Results */}
          {filteredFAQs.length === 0 && !isLoading && (
            <div className="text-center py-16">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-muted/30 flex items-center justify-center">
                <HelpCircle className="w-10 h-10 text-muted-foreground/50" />
              </div>
              <h3 className="text-xl font-black mb-2">No questions found</h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your search or browse by category
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("all");
                }}
                className="px-6 py-2 rounded-full bg-primary-600 text-white font-black text-sm"
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

      {/* Still Need Help - Enhanced CTA */}
      <section className="py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <Reveal>
              <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-purple-600/10 to-amber-500/10 border border-purple-200 dark:border-purple-800 p-8 sm:p-12 text-center">
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-purple-600/5 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-40 h-40 bg-amber-500/5 rounded-full blur-3xl" />

                <div className="relative z-10">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-900/30 mb-4">
                    <MessageCircle className="w-3.5 h-3.5 text-amber-500" />
                    <span className="text-[10px] font-black uppercase tracking-wider text-purple-700 dark:text-purple-400">
                      Still Have Questions?
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-black mb-3">
                   {` We're Here to Help`}
                  </h2>

                  <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                    Our academic advisors are available 7 days a week to discuss
                    your specific needs and answer any questions.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="/contact">
                      <Button className="rounded-full px-8 py-3.5 font-black bg-linear-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white shadow-lg hover:shadow-xl transition-all duration-300 group">
                        <span className="flex items-center gap-2">
                          Contact Support
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </Button>
                    </Link>
                    <Link href="/assessment">
                      <Button
                        variant="outline"
                        className="rounded-full px-8 py-3.5 font-black border-purple-300 text-purple-600 hover:bg-purple-50 transition-all duration-300"
                      >
                        Book Free Assessment
                      </Button>
                    </Link>
                  </div>

                  <div className="mt-8 pt-6 border-t border-border/50 flex flex-wrap justify-center gap-6 text-xs text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 text-purple-600" />
                      <a
                        href="mailto:support@almaysaroh.org"
                        className="hover:text-purple-600 transition-colors"
                      >
                        support@almaysaroh.org
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-purple-600" />
                      <a
                        href="tel:+2349110163930"
                        className="hover:text-purple-600 transition-colors"
                      >
                        +234 911 016 3930
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-purple-600" />
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
