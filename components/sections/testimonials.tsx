// components/sections/testimonials.tsx
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal } from "@/components/shared/section-animation";
import {
  Star,
  Quote,
  ChevronLeft,
  ChevronRight,
 
  Users,
  Heart,
  Award,
  MessageCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

const TESTIMONIALS = [
  {
    id: 1,
    name: "Zainab Bint Abdullah",
    role: "Hifz Student",
    location: "Nigeria",
    initials: "ZB",
    rating: 5,
    text: "Alhamdulillah, I completed my Hifz in just 2 years with Shaykh Abubakar. The structured revision system and constant encouragement made all the difference.",
    program: "Hifz Al-Quran",
    date: "March 2024",
    featured: true,
  },
  {
    id: 2,
    name: "Abdulmalik Adewale",
    role: "Working Professional",
    location: "Nigeria",
    initials: "AA",
    rating: 5,
    text: "The flexibility of scheduling around my job was incredible. My Tajweed has improved dramatically, and I lead prayers at my local masjid. The 1-on-1 attention is worth every penny.",
    program: "Tajweed Al-Itqan",
    date: "February 2024",
    featured: false,
  },
  {
    id: 3,
    name: "Fatimah Isa",
    role: "Mother of 3",
    location: "Germany",
    initials: "FA",
    rating: 5,
    text: "My children (ages 7, 9, and 12) are all in the Group Qiro'ah program. They've gone from zero Arabic to reading confidently. The teachers are patient and engaging.I Highly recommend!",
    program: "Group Qiro'ah",
    date: "January 2025",
    featured: false,
  },
  {
    id: 4,
    name: "Yusuf Ibrahim",
    role: "University Professor",
    location: "Canada",
    initials: "YI",
    rating: 5,
    text: "The depth of Tafsir instruction is remarkable. Shaykh connects classical sources with modern application. I've gained a whole new appreciation for the Quran's timeless wisdom.",
    program: "Tafsir Al-Mubin",
    date: "December 2026",
    featured: false,
  },
  {
    id: 5,
    name: "Mubarak Ali",
    role: "Student",
    location: "Nigeria",
    initials: "MA",
    rating: 5,
    text: "The program has transformed my understanding of the Quran. The instructors are knowledgeable and approachable. I feel more connected to my faith and community.",
    program: "Hifz Al-Quran",
    date: "October 2025",
    featured: false,
  },
  // {
  //   id: 6,
  //   name: "Aisha John",
  //   role: "Revert",
  //   location: "South Africa",
  //   initials: "AB",
  //   rating: 5,
  //   text: "As a revert, I was nervous about learning to read the Quran. The teachers were so patient and supportive. Within 6 months, I was reciting fluently. Alhamdulillah for this blessed program!",
  //   program: "Qiro'ah Program",
  //   date: "November 2023",
  //   featured: false,
  // },
];

// Check for reduced motion preference
const prefersReducedMotion =
  typeof window !== "undefined"
    ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
    : false;

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={cn(
            "w-3 h-3 xs:w-3.5 xs:h-3.5",
            i < rating
              ? "fill-amber-500 text-amber-500"
              : "fill-gray-200 text-gray-200 dark:fill-gray-700 dark:text-gray-700",
          )}
        />
      ))}
    </div>
  );
}

export function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Auto-play carousel
  useEffect(() => {
    if (!isAutoPlaying || isMobile || !mounted) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, isMobile, mounted]);

  // Empty state
  if (TESTIMONIALS.length === 0) {
    return (
      <div className="py-20 text-center">
        <p className="text-muted-foreground">Testimonials coming soon...</p>
      </div>
    );
  }

  const featuredTestimonials = TESTIMONIALS.filter((t) => t.featured);
  const regularTestimonials = TESTIMONIALS.filter((t) => !t.featured);

  const nextTestimonial = () => {
    setIsAutoPlaying(false);
    setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const prevTestimonial = () => {
    setIsAutoPlaying(false);
    setActiveIndex(
      (prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length,
    );
  };

  const currentTestimonial = TESTIMONIALS[activeIndex];

  return (
    <section className="py-12 xs:py-16 sm:py-20 md:py-24 lg:py-32 bg-linear-to-b from-background via-purple-50/5 to-amber-50/5 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-0 w-64 h-64 bg-purple-600/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 xs:px-5 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 xs:mb-10 sm:mb-12 md:mb-16">
          <Reveal>
            <div className="inline-flex items-center gap-1.5 xs:gap-2 px-2.5 xs:px-3 py-1 xs:py-1.5 rounded-full bg-purple-100 dark:bg-purple-900/30 border border-purple-200 dark:border-purple-800 mb-3 xs:mb-4">
              <Users className="w-3 h-3 xs:w-3.5 xs:h-3.5 text-amber-500" />
              <span className="text-[8px] xs:text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] text-purple-700 dark:text-purple-400">
                Student Stories
              </span>
            </div>
            <h2 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter font-heading leading-[1.1] mb-3 xs:mb-4">
              What Our{" "}
              <span className="bg-linear-to-r from-purple-600 to-amber-600 bg-clip-text text-transparent italic">
                Students
              </span>{" "}
              Say
            </h2>
            <p className="text-sm xs:text-base text-muted-foreground max-w-md mx-auto">
              Join hundreds of satisfied learners who have transformed their
              relationship with the Quran
            </p>
          </Reveal>
        </div>

        {/* Featured Testimonial - Large Card */}
        {featuredTestimonials.length > 0 && (
          <Reveal delay={0.1}>
            <div className="mb-10 xs:mb-12 sm:mb-16">
              <div className="bg-linear-to-br from-purple-600/10 to-amber-500/10 rounded-xl xs:rounded-2xl border border-purple-200 dark:border-purple-800 p-6 xs:p-8 md:p-10 relative overflow-hidden">
                {/* Decorative Quote Mark */}
                <Quote className="absolute -top-4 -right-4 w-20 h-20 xs:w-24 xs:h-24 text-purple-600/10 dark:text-purple-400/5" />

                <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center md:items-start">
                  {/* Avatar */}
                  <div className="shrink-0">
                    <div className="w-20 h-20 xs:w-24 xs:h-24 rounded-full bg-linear-to-br from-purple-600 to-amber-500 flex items-center justify-center text-white text-2xl xs:text-3xl font-black shadow-lg">
                      {featuredTestimonials[0].initials}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 text-center md:text-left">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 mb-3">
                      <div>
                        <h3 className="text-lg xs:text-xl font-black">
                          {featuredTestimonials[0].name}
                        </h3>
                        <p className="text-xs text-purple-600 dark:text-purple-400 font-medium">
                          {featuredTestimonials[0].role} •{" "}
                          {featuredTestimonials[0].location}
                        </p>
                      </div>
                      <StarRating rating={featuredTestimonials[0].rating} />
                    </div>

                    <p className="text-sm xs:text-base text-muted-foreground leading-relaxed italic mb-4">
                     {` "${featuredTestimonials[0].text}"`}
                    </p>

                    <div className="flex flex-wrap items-center gap-3">
                      <span className="text-[10px] xs:text-xs font-black uppercase tracking-wider text-amber-600 dark:text-amber-400">
                        {featuredTestimonials[0].program}
                      </span>
                      <span className="text-[9px] xs:text-[10px] text-muted-foreground">
                        • {featuredTestimonials[0].date}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        )}

        {/* Desktop Grid View (4 columns) - Hidden on mobile */}
        <div className="hidden lg:grid lg:grid-cols-2 xl:grid-cols-4 gap-5 sm:gap-6 md:gap-8">
          {regularTestimonials.map((testimonial, index) => (
            <Reveal key={testimonial.id} delay={0.2 + index * 0.1}>
              <div className="bg-card rounded-xl xs:rounded-2xl border border-border hover:border-purple-300 transition-all p-5 xs:p-6 h-full flex flex-col shadow-sm hover:shadow-xl group">
                {/* Quote Icon */}
                <Quote className="w-8 h-8 text-purple-600/20 mb-3 group-hover:text-purple-600/30 transition" />

                {/* Text */}
                <p className="text-xs xs:text-sm text-muted-foreground leading-relaxed mb-4 flex-1 italic">
                  {` "${testimonial.text.substring(0, 120)}..."`}
                </p>

                {/* Rating */}
                <StarRating rating={testimonial.rating} />

                {/* Divider */}
                <div className="my-3 h-px bg-linear-to-r from-transparent via-purple-300/50 to-transparent" />

                {/* Author */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-linear-to-br from-purple-600 to-amber-500 flex items-center justify-center text-white text-xs font-black">
                    {testimonial.initials}
                  </div>
                  <div>
                    <p className="text-sm font-black">{testimonial.name}</p>
                    <p className="text-[9px] xs:text-[10px] text-muted-foreground">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Mobile Carousel View */}
        <div className="lg:hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.3 }}
              className="bg-card rounded-xl xs:rounded-2xl border border-border p-6 xs:p-8"
            >
              {/* Quote Icon */}
              <Quote className="w-10 h-10 text-purple-600/20 mb-4" />

              {/* Text */}
              <p className="text-sm xs:text-base text-muted-foreground leading-relaxed mb-5 italic">
                {` "${currentTestimonial.text}"`}
              </p>

              {/* Rating */}
              <StarRating rating={currentTestimonial.rating} />

              {/* Divider */}
              <div className="my-4 h-px bg-linear-to-r from-transparent via-purple-300/50 to-transparent" />

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-linear-to-br from-purple-600 to-amber-500 flex items-center justify-center text-white text-sm font-black">
                  {currentTestimonial.initials}
                </div>
                <div>
                  <p className="text-base font-black">
                    {currentTestimonial.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {currentTestimonial.role} • {currentTestimonial.location}
                  </p>
                  <p className="text-[9px] text-purple-600 dark:text-purple-400 font-medium mt-0.5">
                    {currentTestimonial.program}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Carousel Navigation */}
          <div className="flex items-center justify-between gap-3 mt-5">
            <button
              onClick={prevTestimonial}
              className="w-10 h-10 rounded-full border border-purple-300 dark:border-purple-700 flex items-center justify-center hover:bg-purple-100 dark:hover:bg-purple-900/30 transition"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5 text-purple-600" />
            </button>

            <div className="flex gap-1.5">
              {TESTIMONIALS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setIsAutoPlaying(false);
                    setActiveIndex(idx);
                  }}
                  className={cn(
                    "rounded-full transition-all",
                    idx === activeIndex
                      ? "w-4 h-1.5 bg-purple-600"
                      : "w-1.5 h-1.5 bg-purple-600/30 hover:bg-purple-600/50",
                  )}
                  aria-label={`Go to testimonial ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              className="w-10 h-10 rounded-full border border-purple-300 dark:border-purple-700 flex items-center justify-center hover:bg-purple-100 dark:hover:bg-purple-900/30 transition"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5 text-purple-600" />
            </button>
          </div>
        </div>

        {/* Bottom Stats */}
        <Reveal delay={0.5}>
          <div className="mt-10 xs:mt-12 sm:mt-16 pt-6 xs:pt-8 border-t border-border/50">
            <div className="flex flex-wrap justify-center gap-6 xs:gap-8 sm:gap-12">
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-amber-500" />
                <span className="text-[10px] xs:text-xs font-black uppercase tracking-wider text-muted-foreground">
                  98% Satisfaction Rate
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-purple-600" />
                <span className="text-[10px] xs:text-xs font-black uppercase tracking-wider text-muted-foreground">
                  100+ Happy Students
                </span>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-amber-500" />
                <span className="text-[10px] xs:text-xs font-black uppercase tracking-wider text-muted-foreground">
                  Verified Reviews
                </span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
