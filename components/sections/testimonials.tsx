// components/sections/testimonials.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import { Reveal } from "@/components/shared/section-animation";
import {
  Star,
  Quote,
  ChevronLeft,
  ChevronRight,
  Users,
  Heart,
  MessageCircle,
  Sparkles,
  Crown,
  Shield,
  Award,
  TrendingUp,
  Play,
  Pause,
 
} from "lucide-react";
import { cn } from "@/lib/utils";

const TESTIMONIALS = [
  {
    id: 1,
    name: "Ahmed Hassan",
    role: "Hifz Graduate, UK",
    content:
      "Al-Maysaroh changed my relationship with the Quran. The Sanad-based approach gave me confidence that my recitation is authentic. The scholars are patient, knowledgeable, and truly care about your progress.",
    rating: 5,
    image: "أ",
    program: "Hifz Program",
    location: "United Kingdom",
    achievement: "Completed 15 Juz",
    journey: "6 months",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    role: "Parent, USA",
    content:
      "My daughter loves her classes! The teachers are patient, engaging, and truly care about her progress. I've seen remarkable improvement in her recitation in just a few months. Highly recommend!",
    rating: 5,
    image: "س",
    program: "Group Qiro'ah",
    location: "United States",
    achievement: "Daughter now reads fluently",
    journey: "4 months",
  },
  {
    id: 3,
    name: "Dr. Omar Farooq",
    role: "Professional Student, Canada",
    content:
      "Balancing work and Hifz seemed impossible until I found Al-Maysaroh. The flexible schedule and quality instruction made it possible. I'm now in the final phase of my memorization journey.",
    rating: 5,
    image: "ع",
    program: "Hifz Program",
    location: "Canada",
    achievement: "Final phase of Hifz",
    journey: "2 years",
  },
  {
    id: 4,
    name: "Fatima Al-Mansouri",
    role: "Tajweed Graduate, UAE",
    content:
      "The attention to detail in Tajweed is unmatched. Every letter, every rule is taught with precision. The audio analysis technology helped me correct mistakes I didn't even know I had.",
    rating: 5,
    image: "ف",
    program: "Tajweed Mastery",
    location: "UAE",
    achievement: "Mastered Al-Jazariyyah",
    journey: "8 months",
  },
  {
    id: 5,
    name: "Abdullah Rahman",
    role: "Parent, Australia",
    content:
      "My son was struggling with Quran reading. After joining Al-Maysaroh, his confidence soared. The 1-on-1 attention and patient teaching style made all the difference. Jazakum Allah khair!",
    rating: 5,
    image: "ع",
    program: "Children's Program",
    location: "Australia",
    achievement: "Now reads with confidence",
    journey: "3 months",
  },
  {
    id: 6,
    name: "Mariam Al-Khalifa",
    role: "Ijazah Candidate, Bahrain",
    content:
      "The journey from beginner to Ijazah has been transformative. The scholars don't just teach; they mentor and guide. I'm proud to soon be part of this unbroken chain.",
    rating: 5,
    image: "م",
    program: "Ijazah Track",
    location: "Bahrain",
    achievement: "Ijazah candidate",
    journey: "18 months",
  },
  {
    id: 7,
    name: "Ali Ahmed",
    role: "Hifz Graduate, USA",
    content:
      "The personalized approach and dedicated instructors at Al-Maysaroh made my Hifz journey seamless. I'm now confident in my recitation and have a deeper appreciation for the Quran.",
    rating: 5,
    image: "ع",
    program: "Hifz Program",
    location: "United States",
    achievement: "Completed 30 Juz",
    journey: "1 year",
  },
  {
    id: 8,
    name: "Layla Hassan",
    role: "Tajweed Student, UK",
    content:
      "The Tajweed classes are fantastic! The instructors are knowledgeable and patient, and the use of technology for feedback is a game-changer. I've seen significant improvement in my recitation.",
    rating: 5,
    image: "ل",
    program: "Tajweed Mastery",
    location: "United Kingdom",
    achievement: "Improved recitation",
    journey: "6 months",  
  },
  {
    id: 9,
    name: "Youssef Ali",
    role: "Quran Memorization Student, Egypt",
    content:
      "The structured approach and comprehensive curriculum at Al-Maysaroh have been instrumental in my Quran memorization journey. The supportive community and expert instruction have made all the difference.",
    rating: 5,
    image: "ي",
    program: "Hifz Program",
    location: "Egypt",
    achievement: "Memorized entire Quran",
    journey: "2 years",
  },
  {
    id: 10,
    name: "Amina Mohammed",
    role: "Tajweed Graduate, Sudan",
    content:
      "The Tajweed program at Al-Maysaroh has been a game-changer for my recitation. The instructors are highly qualified and the learning environment is supportive and motivating.",
    rating: 5,
    image: "أ",
    program: "Tajweed Mastery",
    location: "Sudan",
    achievement: "Graduated with distinction",
    journey: "1 year",
  }
];

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const [visibleCount, setVisibleCount] = useState(3);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [activeDot, setActiveDot] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -100]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setVisibleCount(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCount(2);
      } else {
        setVisibleCount(3);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!autoplay) return;
    const interval = setInterval(() => {
      setCurrentIndex(
        (prev) => (prev + 1) % (TESTIMONIALS.length - visibleCount + 1),
      );
      setActiveDot(Math.floor((currentIndex + 1) / visibleCount));
    }, 6000);
    return () => clearInterval(interval);
  }, [autoplay, visibleCount, currentIndex]);

  const nextSlide = () => {
    setAutoplay(false);
    setCurrentIndex((prev) =>
      prev + visibleCount >= TESTIMONIALS.length ? 0 : prev + 1,
    );
    setActiveDot(Math.floor((currentIndex + 1) / visibleCount));
  };

  const prevSlide = () => {
    setAutoplay(false);
    setCurrentIndex((prev) =>
      prev === 0 ? TESTIMONIALS.length - visibleCount : prev - 1,
    );
    setActiveDot(Math.floor((currentIndex - 1) / visibleCount));
  };

  const toggleExpand = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedId(expandedId === id ? null : id);
  };

  const visibleTestimonials = TESTIMONIALS.slice(
    currentIndex,
    currentIndex + visibleCount,
  );
  const totalDots = Math.ceil(TESTIMONIALS.length / visibleCount);

  return (
    <section
      ref={sectionRef}
      className="py-16 sm:py-24 lg:py-32 bg-linear-to-b from-background via-background to-primary-50/20 relative overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.02] bg-[url('/islamic-pattern.svg')] bg-center bg-repeat"
          style={{ backgroundSize: "300px" }}
        />

        {/* Animated linear Orbs */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-20 right-20 w-[500px] h-[500px] bg-primary-700/10 rounded-full blur-[120px] -z-10"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            x: [0, -50, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-20 left-20 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[120px] -z-10"
        />

        {/* Floating Particles */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -100, 0],
              x: [0, i % 2 === 0 ? 50 : -50, 0],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeInOut",
            }}
            className="absolute w-1 h-1 bg-gold/30 rounded-full"
            style={{
              left: `${5 + i * 8}%`,
              top: `${20 + i * 5}%`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* SECTION HEADER - Enhanced with Parallax */}
        <motion.div style={{ y: parallaxY }}>
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 lg:mb-20">
            <Reveal>
              <div className="flex justify-center mb-6">
                <div className="w-20 h-px bg-linear-to-r from-transparent via-gold to-transparent" />
              </div>

              <div className="inline-flex items-center gap-2 text-gold font-black text-[10px] uppercase tracking-[0.3em] mb-6 bg-gold/5 px-5 py-2.5 rounded-full border border-gold/20 backdrop-blur-sm">
                <Sparkles className="w-4 h-4" /> Voices of the Eternal Journey
              </div>

              <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tighter font-heading leading-[0.9]">
                Scholarly <br />
                <span className="text-primary-700 italic relative inline-block">
                  Success.
                  <motion.div
                    animate={{ width: ["0%", "100%", "0%"] }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="absolute -bottom-2 left-0 h-0.5 bg-linear-to-r from-primary-700 to-gold"
                  />
                </span>
              </h2>

              <p className="text-lg sm:text-xl text-muted-foreground font-light max-w-xl border-l-4 border-primary-700 pl-6 mx-auto mt-6">
                Hear from the noble students who have traversed the Al-Maysaroh
                path, from foundational phonetics to verified Ijazah.
              </p>
            </Reveal>
          </div>
        </motion.div>

        {/* Stats Row - Glassmorphism Style */}
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-10 sm:mb-12">
          {[
            {
              icon: Users,
              label: "100+ Students",
              desc: "Active learners",
              color: "primary",
            },
            {
              icon: MessageCircle,
              label: "30+ Reviews",
              desc: "5-star rated",
              color: "primary",
            },
            {
              icon: TrendingUp,
              label: "98%",
              desc: "Success rate",
              color: "gold",
            },
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + idx * 0.1 }}
              whileHover={{ y: -4, scale: 1.02 }}
              className="flex items-center gap-3 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-white/5 dark:bg-black/20 backdrop-blur-md border border-white/10 shadow-lg"
            >
              <div className="w-8 h-8 rounded-full bg-primary-700/10 flex items-center justify-center">
                <stat.icon className="w-4 h-4 text-primary-700" />
              </div>
              <div>
                <div className="flex items-baseline gap-1">
                  <span className="text-sm sm:text-base font-black">
                    {stat.label}
                  </span>
                  <span className="text-[10px] text-muted-foreground">
                    {stat.desc}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Testimonials Carousel - PREMIUM DESIGN */}
        <div className="relative">
          {/* linear Overlays for carousel edges */}
          <div className="absolute left-0 top-0 bottom-0 w-12 bg-linear-to-r from-background to-transparent z-10 pointer-events-none hidden lg:block" />
          <div className="absolute right-0 top-0 bottom-0 w-12 bg-linear-to-l from-background to-transparent z-10 pointer-events-none hidden lg:block" />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            <AnimatePresence mode="wait">
              {visibleTestimonials.map((testimonial, idx) => {
                const isExpanded = expandedId === testimonial.id;
                const shouldTruncate = testimonial.content.length > 180;
                const displayContent = isExpanded
                  ? testimonial.content
                  : testimonial.content.slice(0, 180);
                const isHovered = hoveredCard === testimonial.id;

                return (
                  <motion.div
                    key={testimonial.id}
                    initial={{ opacity: 0, scale: 0.9, y: 30 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: -30 }}
                    transition={{
                      duration: 0.5,
                      delay: idx * 0.1,
                      type: "spring",
                      stiffness: 300,
                    }}
                    onMouseEnter={() => setHoveredCard(testimonial.id)}
                    onMouseLeave={() => setHoveredCard(null)}
                    className="relative"
                  >
                    {/* 3D Rotate Effect on Hover */}
                    <motion.div
                      animate={{
                        rotateX: isHovered ? 5 : 0,
                        rotateY: isHovered ? 5 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                      className="relative h-full"
                    >
                      {/* Animated Border Glow */}
                      {/* <motion.div
                        animate={{
                          opacity: isHovered ? 1 : 0,
                          scale: isHovered ? 1.02 : 1,
                        }}
                        transition={{ duration: 0.3 }}
                        className="absolute -inset-0.5 bg-linear-to-r from-gold via-primary-700 to-gold rounded-3xl blur-xl opacity-0"
                      /> */}

                      {/* Card Content */}
                      <div className="relative bg-linear-to-br from-background to-primary-50/10 dark:from-background dark:to-primary-950/20 rounded-3xl border border-primary-700/10 p-6 sm:p-7 md:p-8 h-full flex flex-col backdrop-blur-sm transition-all duration-500">
                        {/* Decorative Corner Elements */}
                        <div className="absolute top-0 left-0 w-20 h-20 border-l-2 border-t-2 border-primary-700/10 rounded-tl-3xl" />
                        <div className="absolute top-0 right-0 w-20 h-20 border-r-2 border-t-2 border-primary-700/10 rounded-tr-3xl" />

                        {/* Floating Quote Background */}
                        <motion.div
                          animate={{
                            scale: isHovered ? 1.1 : 1,
                            rotate: isHovered ? 5 : 0,
                          }}
                          className="absolute bottom-4 right-4 opacity-5"
                        >
                          <Quote className="w-16 h-16 text-primary-700" />
                        </motion.div>

                        {/* Achievement Badge with Animation */}
                        <motion.div
                          animate={{
                            scale: isHovered ? 1.05 : 1,
                          }}
                          className="mb-4"
                        >
                          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-linear-to-r from-gold/20 to-gold/5 border border-gold/30 text-gold text-[9px] font-black uppercase tracking-wider backdrop-blur-sm">
                            <Crown className="w-2.5 h-2.5" />
                            {testimonial.achievement}
                            <Sparkles className="w-2.5 h-2.5 ml-1" />
                          </div>
                        </motion.div>

                        {/* Journey Timeline */}
                        <div className="mb-3">
                          <div className="flex items-center gap-1.5">
                            <div className="w-8 h-px bg-gold/30" />
                            <span className="text-[8px] font-black uppercase tracking-wider text-muted-foreground">
                              Journey: {testimonial.journey}
                            </span>
                            <div className="flex-1 h-px bg-gold/30" />
                          </div>
                        </div>

                        {/* Content with Read More */}
                        <div className="mb-5 grow">
                          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed font-medium">
                            {`"${displayContent}`}
                            {shouldTruncate && !isExpanded && "..."}
                            {shouldTruncate && (
                              <motion.button
                                whileHover={{ x: 2 }}
                                onClick={(e) => toggleExpand(testimonial.id, e)}
                                className="text-primary-700 font-black text-xs ml-1 hover:underline inline-block"
                              >
                                {isExpanded ? "Show less" : "Read more"}
                              </motion.button>
                            )}
                           {` "`}
                          </p>
                        </div>

                        {/* Rating with Animation */}
                        <div className="flex gap-0.5 mb-4">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <motion.div
                              key={i}
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: i * 0.05 }}
                            >
                              <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-gold text-gold" />
                            </motion.div>
                          ))}
                        </div>

                        {/* User Info Section - Enhanced */}
                        <div className="flex items-center gap-3 pt-4 border-t border-primary-700/10">
                          {/* Animated Avatar with Ring */}
                          <motion.div
                            animate={{
                              scale: isHovered ? 1.05 : 1,
                              rotate: isHovered ? 5 : 0,
                            }}
                            transition={{ duration: 0.3 }}
                            className="relative"
                          >
                            <div className="absolute inset-0 rounded-full bg-linear-to-r from-gold to-primary-700 blur-md opacity-0 group-hover:opacity-30 transition-opacity" />
                            <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-linear-to-br from-primary-700 to-primary-800 flex items-center justify-center text-white text-lg sm:text-xl font-black shadow-lg ring-2 ring-primary-700/20">
                              {testimonial.image}
                            </div>
                          </motion.div>

                          <div className="flex-1">
                            <h4 className="font-black text-base sm:text-lg tracking-tight">
                              {testimonial.name}
                            </h4>
                            <p className="text-[10px] text-muted-foreground font-medium flex items-center gap-1">
                              <Award className="w-3 h-3 text-gold" />
                              {testimonial.role}
                            </p>
                            <div className="flex items-center gap-1 mt-1">
                              <Shield className="w-3 h-3 text-primary-700" />
                              <span className="text-[9px] font-black text-primary-700 uppercase tracking-wider">
                                {testimonial.program}
                              </span>
                            </div>
                          </div>

                          {/* Interactive Quote Icon */}
                          <motion.div
                            whileHover={{ scale: 1.1, rotate: 15 }}
                            className="opacity-30 cursor-pointer"
                          >
                            <Quote className="w-6 h-6 text-primary-700" />
                          </motion.div>
                        </div>

                        {/* Hover linear Overlay */}
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: isHovered ? 0.08 : 0 }}
                          transition={{ duration: 0.3 }}
                          className="absolute inset-0 rounded-3xl bg-linear-to-br from-primary-700 to-primary-800 pointer-events-none"
                        />
                      </div>
                    </motion.div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Navigation Controls - Premium */}
          {TESTIMONIALS.length > visibleCount && (
            <div className="flex justify-center items-center gap-6 mt-10">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={prevSlide}
                className="w-12 h-12 rounded-full bg-linear-to-r from-primary-700/20 to-primary-800/20 border border-primary-700/30 flex items-center justify-center hover:bg-primary-700 hover:text-white transition-all duration-300 backdrop-blur-sm"
                aria-label="Previous testimonials"
              >
                <ChevronLeft className="w-5 h-5" />
              </motion.button>

              {/* Animated Play/Pause Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setAutoplay(!autoplay)}
                className="w-10 h-10 rounded-full bg-primary-700/20 border border-primary-700/30 flex items-center justify-center hover:bg-primary-700 hover:text-white transition-all duration-300"
              >
                {autoplay ? (
                  <Pause className="w-4 h-4" />
                ) : (
                  <Play className="w-4 h-4 ml-0.5" />
                )}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={nextSlide}
                className="w-12 h-12 rounded-full bg-linear-to-r from-primary-700/20 to-primary-800/20 border border-primary-700/30 flex items-center justify-center hover:bg-primary-700 hover:text-white transition-all duration-300 backdrop-blur-sm"
                aria-label="Next testimonials"
              >
                <ChevronRight className="w-5 h-5" />
              </motion.button>
            </div>
          )}

          {/* Premium Dots Indicator */}
          <div className="flex justify-center gap-3 mt-8">
            {Array.from({ length: totalDots }).map((_, idx) => (
              <motion.button
                key={idx}
                whileHover={{ scale: 1.2 }}
                onClick={() => {
                  setAutoplay(false);
                  setCurrentIndex(idx * visibleCount);
                  setActiveDot(idx);
                }}
                className="relative group"
                aria-label={`Go to slide ${idx + 1}`}
              >
                <div
                  className={cn(
                    "rounded-full transition-all duration-500",
                    activeDot === idx
                      ? "w-8 h-2 bg-primary-700"
                      : "w-2 h-2 bg-primary-700/30 group-hover:bg-primary-700/50",
                  )}
                />
                {activeDot === idx && (
                  <motion.div
                    layoutId="activeDot"
                    className="absolute -top-4 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary-700"
                  />
                )}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Trust Badge with Animation */}
        <div className="text-center mt-10 lg:mt-12">
          <motion.div
            whileHover={{ scale: 1.02 }}
            animate={{
              boxShadow: [
                "0 0 0 0 rgba(212, 175, 55, 0)",
                "0 0 0 4px rgba(212, 175, 55, 0.1)",
                "0 0 0 0 rgba(212, 175, 55, 0)",
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-linear-to-r from-primary-700/5 to-primary-800/5 border border-primary-700/20 hover:border-gold/40 transition-all duration-300 backdrop-blur-sm"
          >
            <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary-700 animate-pulse" />
            <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-wider text-muted-foreground">
              Trusted by families across 15+ countries
            </span>
            <Sparkles className="w-3 h-3 text-gold" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
