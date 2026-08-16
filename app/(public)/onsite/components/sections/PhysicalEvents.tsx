// app/(marketing)/physical/components/sections/PhysicalEvents.tsx
"use client";

import { Reveal } from "@/components/shared/section-animation";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Sparkles,
  Award,
  Heart,
  BookOpen,
  Crown,
  ChevronLeft,
  ChevronRight,
  Star,
  Sun,
  Moon,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const EVENTS = [
  {
    id: 1,
    title: "Annual Quran Competition",
    description:
      "Students showcase their memorization skills in a friendly competition across all levels.",
    date: "July 15, 2026",
    time: "9:00 AM - 5:00 PM",
    location: "Daar-ul-Maysaroh Campus",
    icon: Crown,
    color: "amber",
    badge: "Annual",
    category: "Competition",
  },
  {
    id: 2,
    title: "Ijazah Graduation Ceremony",
    description:
      "Celebrating students who have completed their Ijazah certification with full Sanad.",
    date: "June 30, 2026",
    time: "10:00 AM - 2:00 PM",
    location: "Main Hall",
    icon: Award,
    color: "purple",
    badge: "Graduation",
    category: "Ceremony",
  },
  {
    id: 3,
    title: "Parents Day & Progress Showcase",
    description: "Parent-teacher meetings and student progress presentations.",
    date: "May 20, 2026",
    time: "11:00 AM - 3:00 PM",
    location: "Campus Grounds",
    icon: Heart,
    color: "amber",
    badge: "Community",
    category: "Family",
  },
  {
    id: 4,
    title: "Ramadan Intensive Program",
    description:
      "Special memorization and revision program during the blessed month.",
    date: "March 1-30, 2026",
    time: "Daily (After Fajr)",
    location: "Online & Campus",
    icon: Moon,
    color: "purple",
    badge: "Seasonal",
    category: "Religious",
  },
  {
    id: 5,
    title: "Tajweed Workshop",
    description:
      "Intensive workshop focused on perfecting recitation and pronunciation.",
    date: "August 10, 2026",
    time: "2:00 PM - 6:00 PM",
    location: "Learning Center",
    icon: BookOpen,
    color: "amber",
    badge: "Workshop",
    category: "Academic",
  },
  {
    id: 6,
    title: "Community Iftar Night",
    description: "Community gathering to break fast during Ramadan.",
    date: "March 15, 2026",
    time: "6:30 PM - 9:00 PM",
    location: "Campus Courtyard",
    icon: Sun,
    color: "purple",
    badge: "Community",
    category: "Social",
  },
];

const CATEGORIES = [
  "All",
  "Competition",
  "Ceremony",
  "Community",
  "Religious",
  "Academic",
  "Social",
  "Workshop",
  "Family",
];

const getColorStyles = (color: string) => {
  const styles = {
    purple: {
      text: "text-purple-600 dark:text-purple-400",
      bg: "bg-purple-100 dark:bg-purple-950/40",
      gradient: "from-purple-600 to-purple-700",
      light: "hover:bg-purple-50/30 dark:hover:bg-purple-950/20",
      glow: "shadow-purple-500/10",
    },
    amber: {
      text: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-100 dark:bg-amber-950/40",
      gradient: "from-amber-500 to-amber-600",
      light: "hover:bg-amber-50/30 dark:hover:bg-amber-950/20",
      glow: "shadow-amber-500/10",
    },
  };
  return styles[color as keyof typeof styles] || styles.purple;
};

export function PhysicalEvents() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const filteredEvents =
    activeCategory === "All"
      ? EVENTS
      : EVENTS.filter((e) => e.category === activeCategory);

  const totalSlides = filteredEvents.length;
  const visibleEvents = 3;

  useEffect(() => {
    if (!isAutoPlaying || totalSlides <= visibleEvents) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % (totalSlides - visibleEvents + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, totalSlides]);

  const displayedEvents = filteredEvents.slice(
    currentIndex,
    currentIndex + visibleEvents,
  );

  const nextSlide = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % (totalSlides - visibleEvents + 1));
  };

  const prevSlide = () => {
    setIsAutoPlaying(false);
    setCurrentIndex(
      (prev) =>
        (prev - 1 + (totalSlides - visibleEvents + 1)) %
        (totalSlides - visibleEvents + 1),
    );
  };

  return (
    <section className="py-20 sm:py-24 md:py-28 lg:py-32 bg-gradient-to-b from-background via-purple-50/5 to-amber-50/5 relative overflow-hidden">
      {/* Premium Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[150px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/3 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 xs:px-5 sm:px-6 relative z-10">
        {/* Section Header */}
        <Reveal>
          <div className="text-center max-w-3xl mx-auto mb-14 md:mb-18">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-100 to-amber-100 dark:from-purple-900/30 dark:to-amber-900/30 border border-purple-200 dark:border-purple-800 mb-4">
              <Calendar className="w-4 h-4 text-amber-500" />
              <span className="text-[10px] font-black uppercase tracking-wider text-purple-700 dark:text-purple-400">
                Campus Events
              </span>
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter font-heading leading-[1.1] mb-4">
              Campus{" "}
              <span className="bg-gradient-to-r from-purple-600 via-purple-700 to-amber-600 bg-clip-text text-transparent italic">
                Calendar
              </span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Regular events that enrich the learning experience and build
              community
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

        {/* Events Carousel */}
        {filteredEvents.length === 0 ? (
          <div className="text-center py-12">
            <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">
              No events found for this category.
            </p>
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {displayedEvents.map((event, idx) => {
                const Icon = event.icon;
                const colors = getColorStyles(event.color);
                return (
                  <Reveal key={event.id} delay={idx * 0.05}>
                    <motion.div
                      whileHover={{ y: -6 }}
                      className={`group relative p-6 rounded-2xl transition-all duration-500 ${colors.light} cursor-default`}
                    >
                      {/* Decorative Background Glow */}
                      <div
                        className={`absolute inset-0 ${colors.glow} opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-700 rounded-2xl`}
                      />

                      {/* Badge */}
                      <div className="absolute top-4 right-4">
                        <span
                          className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-wider ${colors.bg} ${colors.text} border ${colors.text}/20`}
                        >
                          {event.badge}
                        </span>
                      </div>

                      {/* Content */}
                      <div className="relative">
                        {/* Icon */}
                        <div
                          className={`w-14 h-14 rounded-xl ${colors.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500 shadow-md group-hover:shadow-lg`}
                        >
                          <Icon className={`w-7 h-7 ${colors.text}`} />
                        </div>

                        <h3 className={`font-black text-xl ${colors.text}`}>
                          {event.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                          {event.description}
                        </p>

                        {/* Event Details */}
                        <div className="mt-4 pt-4 border-t border-border/50 space-y-2">
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Calendar className="w-3.5 h-3.5 text-amber-500" />
                            <span>{event.date}</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Clock className="w-3.5 h-3.5 text-purple-600" />
                            <span>{event.time}</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <MapPin className="w-3.5 h-3.5 text-amber-500" />
                            <span>{event.location}</span>
                          </div>
                        </div>

                        {/* Decorative Line */}
                        <div
                          className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${colors.gradient} scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left opacity-30`}
                        />
                      </div>
                    </motion.div>
                  </Reveal>
                );
              })}
            </div>

            {/* Navigation Controls */}
            {totalSlides > visibleEvents && (
              <div className="flex items-center justify-center gap-4 mt-8">
                <button
                  onClick={prevSlide}
                  className="w-10 h-10 rounded-full border-2 border-purple-200 dark:border-purple-800 flex items-center justify-center hover:bg-purple-100 dark:hover:bg-purple-950/30 transition"
                  aria-label="Previous events"
                >
                  <ChevronLeft className="w-5 h-5 text-purple-600" />
                </button>

                <div className="flex gap-1.5">
                  {Array.from({ length: totalSlides - visibleEvents + 1 }).map(
                    (_, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setIsAutoPlaying(false);
                          setCurrentIndex(idx);
                        }}
                        className={cn(
                          "w-2 h-2 rounded-full transition-all",
                          idx === currentIndex
                            ? "w-6 bg-purple-600"
                            : "bg-purple-600/30 hover:bg-purple-600/50",
                        )}
                        aria-label={`Go to slide ${idx + 1}`}
                      />
                    ),
                  )}
                </div>

                <button
                  onClick={nextSlide}
                  className="w-10 h-10 rounded-full border-2 border-purple-200 dark:border-purple-800 flex items-center justify-center hover:bg-purple-100 dark:hover:bg-purple-950/30 transition"
                  aria-label="Next events"
                >
                  <ChevronRight className="w-5 h-5 text-purple-600" />
                </button>
              </div>
            )}
          </>
        )}

        {/* Bottom CTA */}
        <Reveal delay={0.3}>
          <div className="mt-12 text-center">
            <div className="inline-flex flex-col sm:flex-row items-center gap-3 px-6 py-4 rounded-2xl bg-gradient-to-r from-purple-50/30 to-amber-50/30 dark:from-purple-950/20 dark:to-amber-950/20 border border-purple-200 dark:border-purple-800">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span className="text-sm font-medium text-muted-foreground">
                  Want to stay updated on all events?
                </span>
              </div>
              <Link href="/physical/contact">
                <Button className="rounded-full px-4 py-1.5 font-black text-xs bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white">
                  Join Our Mailing List
                </Button>
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
