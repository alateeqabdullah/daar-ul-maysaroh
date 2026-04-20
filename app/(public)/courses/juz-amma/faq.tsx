"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  Search,
  HelpCircle,
  TrendingUp,
  X,
  MessageCircle,
  Clock,
  Users,
  Heart,
  Award,
  ChevronUp,
  Filter,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Reveal } from "@/components/shared/section-animation";

// Enhanced FAQ Data with categories
const FAQS = [
  {
    q: "Can I join if I have no prior Arabic knowledge?",
    a: "Absolutely! We have students starting from absolute zero. Our teachers are experienced in guiding beginners of all ages. You'll start with basic letter recognition and gradually build up to full surah memorization.",
    category: "Beginners",
    popular: true,
    relatedLink: "/assessment",
  },
  {
    q: "How much time do I need to dedicate daily?",
    a: "We recommend 15-30 minutes of daily revision. Consistency matters more than quantity. Our teachers help you build sustainable habits that fit your schedule, whether you're a student, professional, or parent.",
    category: "Scheduling",
    popular: true,
  },
  {
    q: "What if I have a busy schedule?",
    a: "We offer flexible scheduling with sessions available 7 days a week, including early morning (6 AM EST), evening (8 PM EST), and weekend options. You can reschedule sessions with 24-hour notice.",
    category: "Scheduling",
    popular: false,
  },
  {
    q: "Can I learn at my own pace?",
    a: "Yes! Every student has a personalized learning plan. You can accelerate or take more time based on your goals and availability. Some complete Juz Amma in 6 months, others take 18 months - both are perfectly fine.",
    category: "Learning",
    popular: true,
  },
  {
    q: "Is this program only for children?",
    a: "Not at all! We have students ranging from 6 to 65+. Our program is tailored to each individual's learning style and goals. Adults, professionals, and reverts are all welcome and thriving in our program.",
    category: "Audience",
    popular: true,
  },
  {
    q: "What's the difference between group and 1-on-1?",
    a: "Group classes (4-10 students) offer peer motivation, collaborative learning, and lower cost ($7/month). 1-on-1 provides personalized attention, flexible pacing, and direct feedback ($2+ per session/month). Both are highly effective - choose based on your learning style.",
    category: "Formats",
    popular: true,
  },
  {
    q: "Do I get a certificate upon completion?",
    a: "Yes! Upon completing Juz Amma, students receive a Certificate of Completion. Those who excel can continue to our Ijazah track for formal certification with a complete Sanad chain.",
    category: "Certification",
    popular: false,
  },
  {
    q: "What technology do I need?",
    a: "A computer or tablet with a camera and microphone, stable internet connection, and Zoom (free version works perfectly). Our portal works on all devices - no special software required.",
    category: "Technical",
    popular: false,
  },
];

// Categories for filtering
const CATEGORIES = [
  { id: "all", name: "All Questions", icon: HelpCircle, count: FAQS.length },
  {
    id: "Beginners",
    name: "Beginners",
    icon: TrendingUp,
    count: FAQS.filter((f) => f.category === "Beginners").length,
  },
  {
    id: "Scheduling",
    name: "Scheduling",
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
    id: "Audience",
    name: "Audience",
    icon: Heart,
    count: FAQS.filter((f) => f.category === "Audience").length,
  },
  {
    id: "Certification",
    name: "Certification",
    icon: Award,
    count: FAQS.filter((f) => f.category === "Certification").length,
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [showFilters, setShowFilters] = useState(false);

  // Memoized filtered FAQs for performance
  const filteredFAQs = useMemo(() => {
    return FAQS.filter((faq) => {
      const matchesSearch =
        searchQuery === "" ||
        faq.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.a.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        activeCategory === "all" || faq.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  const popularFAQs = useMemo(() => {
    return FAQS.filter((faq) => faq.popular);
  }, []);

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery("");
    setActiveCategory("all");
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setOpenIndex(openIndex === index ? null : index);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6">
      {/* Search Bar */}
      <div className="relative max-w-md mx-auto mb-8">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search your question..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-11 pr-10 py-3 rounded-full border-2 border-border bg-background focus:border-amber-500 outline-none transition-all"
          aria-label="Search FAQs"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="absolute right-4 top-1/2 -translate-y-1/2 hover:text-amber-600 transition"
            aria-label="Clear search"
          >
            <X className="w-4 h-4 text-muted-foreground" />
          </button>
        )}
      </div>

      {/* Mobile Filter Toggle */}
      <div className="md:hidden flex justify-center mb-4">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-muted/30 border border-border text-sm font-medium"
        >
          <Filter className="w-4 h-4" />
          {showFilters ? "Hide" : "Show"} Categories
          {showFilters ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* Category Filters */}
      <div
        className={cn(
          "flex flex-wrap justify-center gap-2 mb-10 transition-all duration-300",
          !showFilters && "hidden md:flex",
        )}
      >
        {CATEGORIES.map((cat) => {
          const Icon = cat.icon;
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={cn(
                "px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2",
                isActive
                  ? "bg-linear-to-r from-amber-600 to-orange-600 text-white shadow-md"
                  : "bg-muted/30 hover:bg-amber-100 dark:hover:bg-amber-950/40 border border-border",
              )}
              aria-label={`Filter by ${cat.name}`}
            >
              <Icon className="w-3.5 h-3.5" />
              {cat.name}
              <span className="text-[9px] opacity-70">({cat.count})</span>
            </button>
          );
        })}
      </div>

      {/* Popular Questions Quick Access */}
      {searchQuery === "" && activeCategory === "all" && (
        <div className="mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-xs font-black uppercase tracking-wider text-amber-600 bg-amber-100 dark:bg-amber-950/40 px-3 py-1 rounded-full">
              🔥 Most Asked
            </span>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {popularFAQs.map((faq, idx) => (
              <button
                key={idx}
                onClick={() => {
                  const index = FAQS.findIndex((f) => f.q === faq.q);
                  setOpenIndex(index);
                  setSearchQuery("");
                  document.getElementById(`faq-${index}`)?.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                  });
                }}
                className="px-4 py-2 rounded-full bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 text-sm font-medium hover:bg-amber-100 transition-all"
              >
                {faq.q.length > 40 ? faq.q.slice(0, 40) + "..." : faq.q}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Results Info */}
      {searchQuery && (
        <p className="text-center text-xs text-muted-foreground mb-4">
          Found {filteredFAQs.length} question
          {filteredFAQs.length !== 1 ? "s" : ""}
        </p>
      )}

      {/* FAQ Accordion Grid */}
      {filteredFAQs.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-12"
        >
          <HelpCircle className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground font-medium">
            No questions found matching your search.
          </p>
          <button
            onClick={clearFilters}
            className="text-amber-600 font-black text-sm mt-3 hover:underline"
          >
            Clear all filters
          </button>
        </motion.div>
      ) : (
        <div className="grid md:grid-cols-2 gap-5">
          {filteredFAQs.map((faq, i) => {
            const originalIndex = FAQS.findIndex((f) => f.q === faq.q);
            const isOpen = openIndex === originalIndex;
            return (
              <Reveal key={originalIndex} delay={Math.min(i * 0.05, 0.3)}>
                <div
                  id={`faq-${originalIndex}`}
                  className="bg-card rounded-2xl border border-border hover:border-amber-300 transition-all overflow-hidden group"
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : originalIndex)}
                    onKeyDown={(e) => handleKeyDown(e, originalIndex)}
                    className="w-full text-left p-5 flex items-center justify-between gap-4 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 rounded-2xl"
                    aria-expanded={isOpen}
                    aria-controls={`faq-content-${originalIndex}`}
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="text-[9px] font-black uppercase tracking-wider text-amber-600 bg-amber-100 dark:bg-amber-950/40 px-2 py-0.5 rounded">
                          {faq.category}
                        </span>
                        {faq.popular && (
                          <span className="text-[9px] font-black uppercase tracking-wider text-emerald-600 bg-emerald-100 dark:bg-emerald-950/40 px-2 py-0.5 rounded">
                            Popular
                          </span>
                        )}
                      </div>
                      <h3 className="font-black text-sm sm:text-base pr-4 group-hover:text-amber-600 transition-colors">
                        {faq.q}
                      </h3>
                    </div>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown className="w-5 h-5 text-amber-600 shrink-0" />
                    </motion.div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      >
                        <div className="px-5 pb-5 pt-0">
                          <div className="pl-0">
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              {faq.a}
                            </p>

                            {/* Smart Related Links */}
                            {faq.relatedLink && (
                              <div className="mt-3 pt-3 border-t border-border/50">
                                <Link href={faq.relatedLink}>
                                  <p className="text-xs text-amber-600 font-black hover:underline cursor-pointer">
                                    📖 New to Quran? Start with our free
                                    assessment →
                                  </p>
                                </Link>
                              </div>
                            )}

                            {/* Helpful feedback */}
                            <div className="mt-3 flex items-center gap-3 text-[10px] text-muted-foreground">
                              <span>Was this helpful?</span>
                              <button className="hover:text-green-600 transition">
                                👍 Yes
                              </button>
                              <button className="hover:text-red-600 transition">
                                👎 No
                              </button>
                            </div>
                          </div>
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

      {/* Still Need Help? - Enhanced CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-center mt-12 pt-6"
      >
        <div className="inline-flex flex-col sm:flex-row items-center gap-3 px-6 py-4 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 border border-amber-200 dark:border-amber-800">
          <div className="flex items-center gap-2">
            <MessageCircle className="w-5 h-5 text-amber-600" />
            <span className="text-sm font-bold">Still have questions?</span>
          </div>
          <Link href="/contact">
            <button className="px-5 py-2 rounded-full bg-amber-600 text-white font-black text-xs uppercase tracking-wider hover:bg-amber-700 transition-all shadow-md hover:shadow-lg">
              Contact Our Team →
            </button>
          </Link>
          <Link href="/admissions#apply-now">
            <button className="px-5 py-2 rounded-full border-2 border-amber-600 text-amber-600 font-black text-xs uppercase tracking-wider hover:bg-amber-50 dark:hover:bg-amber-950/20 transition-all">
              Apply Now
            </button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
