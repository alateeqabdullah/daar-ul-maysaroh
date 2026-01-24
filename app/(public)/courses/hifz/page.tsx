// src/app/(marketing)/courses/hifz/page.tsx
"use client";

import { motion } from "framer-motion";
import {
  BookOpen,
  Target,
  Star,
  Clock,
  CheckCircle,
  Zap,
  Award,
  Users,
  Crown,
  Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCourses } from "@/hooks/use-courses";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function HifzProgramPage() {
  const { courses, isLoading } = useCourses();

  const hifzCourses = courses.filter(
    (course) =>
      course.title.toLowerCase().includes("hifz") ||
      course.title.toLowerCase().includes("memorization")
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background pt-16">
        <div className="container mx-auto px-4 lg:px-6 py-8">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-card rounded w-1/4"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-64 bg-card rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-500 to-pink-600 text-white py-16 lg:py-20">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div className="flex items-center space-x-2 bg-white/20 rounded-full px-4 py-2 w-fit">
                <Crown className="w-5 h-5" />
                <span className="text-sm font-medium">Hifz Program</span>
              </div>

              <h1 className="text-4xl lg:text-6xl font-heading font-bold">
                Quran Memorization Program
              </h1>

              <p className="text-xl text-purple-100">
                Embark on the sacred journey of memorizing the entire Quran with
                our comprehensive Hifz program guided by expert Huffaz.
              </p>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Completion Time", value: "2-3 Years" },
                  { label: "Success Rate", value: "95%" },
                  { label: "Daily Commitment", value: "2-3 Hours" },
                  { label: "Ijazah Ready", value: "Yes" },
                ].map((stat, index) => (
                  <div key={stat.label} className="text-center">
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <div className="text-sm text-purple-200">{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white/10 rounded-2xl p-8 backdrop-blur-sm"
            >
              <h3 className="text-2xl font-heading font-bold mb-6">
                Program Highlights
              </h3>
              <div className="space-y-4">
                {[
                  "Daily one-on-one sessions with certified Huffaz",
                  "Personalized memorization plan and schedule",
                  "Regular revision and testing system",
                  "Tajweed perfection alongside memorization",
                  "Ijazah preparation and certification",
                  "Parent/guardian progress updates",
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-purple-300 flex-shrink-0" />
                    <span className="text-purple-100">{benefit}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Program Structure */}
      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-heading font-bold mb-4">
              Program Structure
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A carefully designed journey to help you memorize the entire Quran
              with perfection
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              {
                phase: "Phase 1",
                title: "Foundation & Juz Amma",
                duration: "6 Months",
                description:
                  "Build strong foundation and memorize the 30th Juz with proper Tajweed",
                features: [
                  "Basic Tajweed rules",
                  "Memorization techniques",
                  "Daily 1-hour sessions",
                ],
              },
              {
                phase: "Phase 2",
                title: "Core Memorization",
                duration: "18-24 Months",
                description:
                  "Systematic memorization of the entire Quran with regular revision",
                features: [
                  "Weekly new pages",
                  "Daily revision",
                  "Monthly testing",
                ],
              },
              {
                phase: "Phase 3",
                title: "Mastery & Ijazah",
                duration: "6 Months",
                description:
                  "Perfect memorization and prepare for Ijazah certification",
                features: [
                  "Complete revision",
                  "Ijazah preparation",
                  "Recitation perfection",
                ],
              },
            ].map((phase, index) => (
              <motion.div
                key={phase.phase}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="bg-card rounded-2xl border shadow-sm p-6 text-center"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="font-bold text-primary">{phase.phase}</span>
                </div>
                <h3 className="text-xl font-heading font-bold mb-2">
                  {phase.title}
                </h3>
                <div className="text-sm text-primary font-medium mb-3">
                  {phase.duration}
                </div>
                <p className="text-muted-foreground text-sm mb-4">
                  {phase.description}
                </p>
                <div className="space-y-2 text-left">
                  {phase.features.map((feature, idx) => (
                    <div
                      key={idx}
                      className="flex items-center space-x-2 text-sm"
                    >
                      <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Hifz Courses */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-heading font-bold mb-4">
              Hifz Program Options
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {hifzCourses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-card rounded-2xl border shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group relative"
              >
                {/* Premium Badge */}
                <div className="absolute top-4 right-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                  Premium
                </div>

                <div className="p-6 space-y-4">
                  {/* Course Header */}
                  <div className="space-y-2">
                    <h3 className="text-xl font-heading font-bold text-card-foreground group-hover:text-primary transition-colors">
                      {course.title}
                    </h3>
                    <p className="text-muted-foreground text-sm line-clamp-2">
                      {course.description}
                    </p>
                  </div>

                  {/* Commitment */}
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span>Daily commitment required</span>
                  </div>

                  {/* Key Features */}
                  <div className="space-y-2">
                    {course.features
                      .slice(0, 4)
                      .map((feature: string, idx: number) => (
                        <div key={idx} className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                          <span className="text-sm text-card-foreground">
                            {feature}
                          </span>
                        </div>
                      ))}
                  </div>

                  {/* Price & Duration */}
                  <div className="flex items-center justify-between pt-4 border-t">
                    <div>
                      <div className="text-2xl font-bold text-primary">
                        ${course.price}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        per month
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        <span>{course.duration}m</span>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        daily session
                      </div>
                    </div>
                  </div>

                  {/* CTA */}
                  <Button
                    className="w-full group-hover:scale-105 transition-transform duration-200 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                    asChild
                  >
                    <Link href={`/courses/${course.id}`}>
                      <Crown className="w-4 h-4 mr-2" />
                      Start Hifz Journey
                    </Link>
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <BookOpen className="w-16 h-16 text-primary mx-auto mb-6" />
            <h2 className="text-3xl lg:text-4xl font-heading font-bold mb-4">
              Begin Your Sacred Journey of Hifz
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join the blessed path of becoming a Hafiz/Hafiza with our
              comprehensive memorization program.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                asChild
              >
                <Link href="/auth/signup">
                  <Zap className="w-4 h-4 mr-2" />
                  Start Free Assessment
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/contact">
                  <Users className="w-4 h-4 mr-2" />
                  Speak with Hafiz
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
