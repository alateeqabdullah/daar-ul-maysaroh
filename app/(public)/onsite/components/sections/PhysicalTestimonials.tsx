// app/(marketing)/physical/components/sections/PhysicalTestimonials.tsx
"use client";

import { Reveal } from "@/components/shared/section-animation";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import {
  Quote,
  Star,
  Users,
  Award,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Heart,
  Crown,
  Shield,
  BookOpen,
} from "lucide-react";
import { cn } from "@/lib/utils";

const TESTIMONIALS = [
  {
    id: 1,
    name: "Ustadh Abdurrahman",
    role: "Boarding Student",
    content:
      "The structured environment at Daar-ul-Maysaroh transformed my memorization. In 18 months, I completed Juz Amma to Juz Tabarak with proper Tajweed. The teachers didn't just teach me Quran; they taught me how to live with it.",
    rating: 5,
    initials: "ع",
    category: "Boarding",
    program: "Tahfeedh",
    journey: "18 months",
  },
  {
    id: 2,
    name: "Hafidhah Fatimah",
    role: "Day Programme Graduate",
    content:
      "Balancing school and memorization seemed impossible until I joined the Day Programme. The teachers were patient and the revision system kept me consistent. I never felt like I was falling behind, even with my busy schedule.",
    rating: 5,
    initials: "ف",
    category: "Day",
    program: "Tahfeedh",
    journey: "2 years",
  },
  {
    id: 3,
    name: "Dr. Ahmed Al-Makki",
    role: "Parent of Two Students",
    content:
      "My children have been at Daar-ul-Maysaroh for 2 years. Their character, confidence, and Quranic fluency have improved tremendously. I've seen them grow not just in memorization but in their love for the Quran and their commitment to Islamic values.",
    rating: 5,
    initials: "أ",
    category: "Parent",
    program: "Children's Program",
    journey: "2 years",
  },
  {
    id: 4,
    name: "Shaykh Musa",
    role: "Alumni & Ijazah Graduate",
    content:
      "I came to Daar-ul-Maysaroh with just basic Arabic reading skills. Today, I hold an Ijazah in Hafs 'an 'Asim. The scholars here don't just teach; they pour their hearts into every student. This place is truly blessed.",
    rating: 5,
    initials: "م",
    category: "Alumni",
    program: "Ijazah Track",
    journey: "3 years",
  },
  {
    id: 5,
    name: "Ummu Khadijah",
    role: "Boarding Student",
    content:
      "Living on campus has been the most rewarding experience of my life. The daily routine, the Quranic environment, and the sisterhood have made memorization feel natural. I'm now in my final year and I can't imagine learning anywhere else.",
    rating: 5,
    initials: "خ",
    category: "Boarding",
    program: "Tahfeedh",
    journey: "2 years",
  },
  {
    id: 6,
    name: "Prof. Ibrahim",
    role: "Academic Advisor",
    content:
      "I've reviewed the curriculum and teaching methodology at Daar-ul-Maysaroh. It's one of the most rigorous and well-structured Quran memorization programs I've seen. The combination of traditional Sanad and modern pedagogy is exceptional.",
    rating: 5,
    initials: "إ",
    category: "Academic",
    program: "Full Program",
    journey: "Ongoing",
  },
];

const CATEGORIES = ["All", "Boarding", "Day", "Parent", "Alumni", "Academic"];

const getColorStyles = (color: string) => {
  const styles = {
    purple: {
      text: "text-purple-600 dark:text-purple-400",
      border: "border-purple-200 dark:border-purple-800",
      bg: "bg-purple-100 dark:bg-purple-950/40",
      gradient: "from-purple-600 to-purple-700",
    },
    amber: {
      text: "text-amber-600 dark:text-amber-400",
      border: "border-amber-200 dark:border-amber-800",
      bg: "bg-amber-100 dark:bg-amber-950/40",
      gradient: "from-amber-500 to-amber-600",
    },
  };
  return styles[color as keyof typeof styles] || styles.purple;
};

export function PhysicalTestimonials() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Filter testimonials based on category
  const filteredTestimonials =
    activeCategory === "All"
      ? TESTIMONIALS
      : TESTIMONIALS.filter((t) => t.category === activeCategory);

  const totalSlides = filteredTestimonials.length;

  // Reset index when category changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [activeCategory]);

  // Auto-play
  useEffect(() => {
    if (!isAutoPlaying || totalSlides <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalSlides);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, totalSlides]);

  // Ensure current index is valid
  const safeIndex = Math.min(currentIndex, totalSlides - 1);
  const current = filteredTestimonials[safeIndex];

  const nextSlide = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  // Empty state
  if (totalSlides === 0) {
    return (
      <section className="py-16 sm:py-20 md:py-24 lg:py-28">
        <div className="container mx-auto px-4 xs:px-5 sm:px-6 text-center">
          <p className="text-muted-foreground">
            No testimonials found for this category.
          </p>
        </div>
      </section>
    );
  }

  const colors = getColorStyles("purple");

  return (
    <section className="py-16 sm:py-20 md:py-24 lg:py-28 bg-gradient-to-b from-background via-purple-50/5 to-amber-50/5 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 right-0 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 left-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 xs:px-5 sm:px-6 relative z-10">
        {/* Section Header */}
        <Reveal>
          <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-100 to-amber-100 dark:from-purple-900/30 dark:to-amber-900/30 border border-purple-200 dark:border-purple-800 mb-4">
              <Heart className="w-4 h-4 text-amber-500" />
              <span className="text-[10px] font-black uppercase tracking-wider text-purple-700 dark:text-purple-400">
                Student Stories
              </span>
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter font-heading leading-[1.1] mb-4">
              Voices of Our{" "}
              <span className="bg-gradient-to-r from-purple-600 via-purple-700 to-amber-600 bg-clip-text text-transparent italic">
                Community
              </span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Real stories from students, parents, and alumni who found their
              path at Daar-ul-Maysaroh
            </p>
          </div>
        </Reveal>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-wider transition-all",
                activeCategory === category
                  ? "bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-md"
                  : "bg-muted/30 hover:bg-purple-100 dark:hover:bg-purple-950/40 border border-purple-200 dark:border-purple-800",
              )}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Testimonial Carousel */}
        <div className="max-w-4xl mx-auto relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={safeIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="bg-card rounded-2xl border-2 border-purple-200 dark:border-purple-800 p-6 md:p-10 shadow-xl hover:shadow-2xl transition-all"
            >
              {/* Quote Icon */}
              <div className="flex justify-between items-start mb-4">
                <Quote className="w-10 h-10 text-purple-200 dark:text-purple-800/30" />
                <div className="flex items-center gap-1">
                  {current &&
                    [...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          "w-4 h-4",
                          i < (current.rating || 0)
                            ? "fill-amber-500 text-amber-500"
                            : "fill-gray-200 text-gray-200 dark:fill-gray-700 dark:text-gray-700",
                        )}
                      />
                    ))}
                </div>
              </div>

              {/* Content - with fallback */}
              <p className="text-base sm:text-lg text-muted-foreground italic leading-relaxed mb-6">
                "{current?.content || "No testimonial content available."}"
              </p>

              {/* Author */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-4 border-t border-purple-200 dark:border-purple-800">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-600 to-amber-500 flex items-center justify-center text-white text-xl font-black shadow-lg">
                    {current?.initials || "?"}
                  </div>
                  <div>
                    <p className="font-black text-lg">
                      {current?.name || "Anonymous"}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {current?.role || ""}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 mt-3 sm:mt-0">
                  <span className="px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-950/40 text-purple-700 text-[10px] font-black">
                    {current?.category || ""}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/40 text-amber-700 text-[10px] font-black">
                    {current?.journey || ""}
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          {totalSlides > 1 && (
            <div className="flex items-center justify-center gap-4 mt-6">
              <button
                onClick={prevSlide}
                className="w-10 h-10 rounded-full border-2 border-purple-200 dark:border-purple-800 flex items-center justify-center hover:bg-purple-100 dark:hover:bg-purple-950/30 transition"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5 text-purple-600" />
              </button>

              <div className="flex gap-1.5">
                {filteredTestimonials.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setIsAutoPlaying(false);
                      setCurrentIndex(idx);
                    }}
                    className={cn(
                      "w-2 h-2 rounded-full transition-all",
                      idx === safeIndex
                        ? "w-6 bg-purple-600"
                        : "bg-purple-600/30 hover:bg-purple-600/50",
                    )}
                    aria-label={`Go to testimonial ${idx + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={nextSlide}
                className="w-10 h-10 rounded-full border-2 border-purple-200 dark:border-purple-800 flex items-center justify-center hover:bg-purple-100 dark:hover:bg-purple-950/30 transition"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5 text-purple-600" />
              </button>
            </div>
          )}
        </div>

        {/* Bottom Trust Badge */}
        <Reveal delay={0.3}>
          <div className="mt-12 text-center">
            <div className="inline-flex flex-wrap items-center justify-center gap-4 px-6 py-3 rounded-full bg-gradient-to-r from-purple-50/30 to-amber-50/30 dark:from-purple-950/20 dark:to-amber-950/20 border border-purple-200 dark:border-purple-800">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-purple-600" />
                <span className="text-[10px] font-black text-muted-foreground">
                  Authentic Reviews
                </span>
              </div>
              <div className="w-px h-4 bg-border hidden xs:block" />
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-amber-500" />
                <span className="text-[10px] font-black text-muted-foreground">
                  Verified Students
                </span>
              </div>
              <div className="w-px h-4 bg-border hidden xs:block" />
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-purple-600" />
                <span className="text-[10px] font-black text-muted-foreground">
                  Ijazah Graduates
                </span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
