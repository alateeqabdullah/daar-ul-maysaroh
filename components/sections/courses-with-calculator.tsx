"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import {
  CheckCircle,
  Clock,
  Users,
  Calculator,
  Zap,
  Crown,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface Course {
  id: string;
  title: string;
  description: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  classType: "one-on-one" | "group";
  duration: number; // minutes per session
  basePrice: number; // per session
  features: string[];
  popular?: boolean;
  icon: string;
}

const courses: Course[] = [
  {
    id: "nazrah",
    title: "Quran Recitation (Nazrah)",
    description:
      "Learn to read Quran with proper pronunciation from absolute basics to fluent recitation.",
    level: "Beginner",
    classType: "one-on-one",
    duration: 45,
    basePrice: 12,
    features: [
      "Personalized 1-on-1 Sessions",
      "Arabic Alphabet & Basics",
      "Proper Pronunciation (Makharij)",
      "Individual Pace & Attention",
      "Flexible Scheduling",
      "Weekly Progress Reports",
    ],
    icon: "📖",
  },
  {
    id: "hifz",
    title: "Quran Memorization (Hifz)",
    description:
      "Complete Quran memorization program with certified Huffaz and Ijazah preparation.",
    level: "Intermediate",
    classType: "one-on-one",
    duration: 60,
    basePrice: 20,
    features: [
      "Daily One-on-One Sessions",
      "Individual Revision Plans",
      "Ijazah Preparation",
      "Tahfeezh Methodology",
      "Progress Tracking System",
      "Parent/Guardian Updates",
    ],
    popular: true,
    icon: "🕌",
  },
  {
    id: "tajweed",
    title: "Advanced Tajweed",
    description:
      "Master the rules of Quranic recitation with expert teachers and professional certification.",
    level: "Advanced",
    classType: "one-on-one",
    duration: 60,
    basePrice: 15,
    features: [
      "Advanced Tajweed Rules",
      "Practical Application",
      "Voice Quality Training",
      "Recitation Correction",
      "Professional Certification",
      "Competition Preparation",
    ],
    icon: "🎵",
  },
  {
    id: "arabic",
    title: "Quranic Arabic",
    description:
      "Understand Quran directly in Arabic with vocabulary, grammar, and translation techniques.",
    level: "Intermediate",
    classType: "one-on-one",
    duration: 45,
    basePrice: 14,
    features: [
      "Quranic Vocabulary Building",
      "Arabic Grammar Rules",
      "Translation Techniques",
      "Tafsir Principles",
      "Context Understanding",
      "Practical Application",
    ],
    icon: "🔤",
  },
];

interface CalculatorState {
  course: Course | null;
  sessionsPerWeek: number;
  familyMembers: number;
  duration: number; // months
}

export function CoursesWithCalculator() {
  const [calculator, setCalculator] = useState<CalculatorState>({
    course: null,
    sessionsPerWeek: 2,
    familyMembers: 1,
    duration: 3,
  });

  const calculatePrice = () => {
    if (!calculator.course) return 0;

    const basePrice =
      calculator.course.basePrice * calculator.sessionsPerWeek * 4; // Monthly
    let totalPrice = basePrice * calculator.duration;

    // Family discount
    if (calculator.familyMembers > 1) {
      const discount = Math.min(30, (calculator.familyMembers - 1) * 10); // 10% per additional family member, max 30%
      totalPrice = totalPrice * (1 - discount / 100);
    }

    // Bulk discount for longer duration
    if (calculator.duration >= 6) {
      totalPrice *= 0.9; // 10% off for 6+ months
    } else if (calculator.duration >= 3) {
      totalPrice *= 0.95; // 5% off for 3+ months
    }

    return Math.round(totalPrice);
  };

  const calculateMonthlyPrice = () => {
    const total = calculatePrice();
    return Math.round(total / calculator.duration);
  };

  const calculateSavings = () => {
    if (!calculator.course || calculator.familyMembers === 1) return 0;

    const basePrice =
      calculator.course.basePrice *
      calculator.sessionsPerWeek *
      4 *
      calculator.duration;
    const discountedPrice = calculatePrice();

    return basePrice - discountedPrice;
  };

  return (
    <section
      id="courses"
      className="py-20 bg-gradient-to-b from-background to-muted/30"
    >
      <div className="container mx-auto px-4 lg:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-5xl font-heading font-bold mb-4">
            Our <span className="text-primary">Quran Courses</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Specialized one-on-one Quran education with certified teachers.
            Choose your path to Quranic excellence with flexible pricing.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Courses Grid */}
          <div className="space-y-6">
            {courses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={cn(
                  "bg-card rounded-2xl border-2 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer group",
                  calculator.course?.id === course.id
                    ? "border-primary ring-2 ring-primary/20"
                    : "border-border hover:border-primary/50",
                  course.popular && "ring-2 ring-accent border-accent/50"
                )}
                onClick={() => setCalculator((prev) => ({ ...prev, course }))}
              >
                {course.popular && (
                  <div className="absolute -top-3 -right-3">
                    <div className="bg-gradient-to-r from-accent to-yellow-500 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
                      <Star className="w-4 h-4 fill-current" />
                      <span>Most Popular</span>
                    </div>
                  </div>
                )}

                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="text-3xl">{course.icon}</div>
                      <div>
                        <h3 className="text-xl font-heading font-bold text-card-foreground">
                          {course.title}
                        </h3>
                        <p className="text-muted-foreground">
                          {course.description}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 mb-4 text-sm">
                    <div
                      className={cn(
                        "flex items-center space-x-1 px-3 py-1 rounded-full",
                        course.level === "Beginner"
                          ? "bg-green-100 text-green-800"
                          : course.level === "Intermediate"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-purple-100 text-purple-800"
                      )}
                    >
                      <Zap className="w-3 h-3" />
                      <span>{course.level}</span>
                    </div>
                    <div className="flex items-center space-x-1 px-3 py-1 bg-primary/10 text-primary rounded-full">
                      <Users className="w-3 h-3" />
                      <span>One-on-One</span>
                    </div>
                    <div className="flex items-center space-x-1 px-3 py-1 bg-muted text-muted-foreground rounded-full">
                      <Clock className="w-3 h-3" />
                      <span>{course.duration}m/session</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mb-4">
                    {course.features.slice(0, 4).map((feature, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                        <span className="text-sm text-card-foreground">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-left">
                      <span className="text-2xl font-bold text-primary">
                        ${course.basePrice}
                      </span>
                      <span className="text-muted-foreground ml-1">
                        /session
                      </span>
                    </div>
                    <Button
                      variant={
                        calculator.course?.id === course.id
                          ? "default"
                          : "outline"
                      }
                      size="sm"
                    >
                      {calculator.course?.id === course.id
                        ? "Selected"
                        : "Select Course"}
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Price Calculator */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="sticky top-24"
          >
            <div className="bg-card rounded-2xl border shadow-lg p-6">
              <div className="flex items-center space-x-3 mb-6">
                <Calculator className="w-6 h-6 text-primary" />
                <h3 className="text-2xl font-heading font-bold">
                  Price Calculator
                </h3>
              </div>

              {!calculator.course ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                    <Calculator className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <h4 className="text-lg font-heading font-bold mb-2">
                    Select a Course
                  </h4>
                  <p className="text-muted-foreground">
                    Choose a course from the left to calculate your personalized
                    pricing
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Selected Course */}
                  <div className="bg-primary/5 rounded-xl p-4 border border-primary/20">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-card-foreground">
                          {calculator.course.title}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {calculator.course.level} •{" "}
                          {calculator.course.duration} minutes per session
                        </p>
                      </div>
                      <span className="text-2xl">{calculator.course.icon}</span>
                    </div>
                  </div>

                  {/* Sessions Per Week */}
                  <div>
                    <label className="block text-sm font-medium text-card-foreground mb-3">
                      Sessions Per Week
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      {[1, 2, 3, 5].map((count) => (
                        <button
                          key={count}
                          onClick={() =>
                            setCalculator((prev) => ({
                              ...prev,
                              sessionsPerWeek: count,
                            }))
                          }
                          className={cn(
                            "py-3 rounded-lg border transition-all duration-200",
                            calculator.sessionsPerWeek === count
                              ? "bg-primary text-primary-foreground border-primary"
                              : "bg-background border-border hover:border-primary/50"
                          )}
                        >
                          {count}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Family Members */}
                  <div>
                    <label className="block text-sm font-medium text-card-foreground mb-3">
                      Family Members Learning
                      <span className="text-xs text-muted-foreground ml-2">
                        (Save up to 30% with family discount)
                      </span>
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      {[1, 2, 3, 4].map((count) => (
                        <button
                          key={count}
                          onClick={() =>
                            setCalculator((prev) => ({
                              ...prev,
                              familyMembers: count,
                            }))
                          }
                          className={cn(
                            "py-3 rounded-lg border transition-all duration-200",
                            calculator.familyMembers === count
                              ? "bg-primary text-primary-foreground border-primary"
                              : "bg-background border-border hover:border-primary/50"
                          )}
                        >
                          {count}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Duration */}
                  <div>
                    <label className="block text-sm font-medium text-card-foreground mb-3">
                      Program Duration
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {[1, 3, 6].map((months) => (
                        <button
                          key={months}
                          onClick={() =>
                            setCalculator((prev) => ({
                              ...prev,
                              duration: months,
                            }))
                          }
                          className={cn(
                            "py-3 rounded-lg border transition-all duration-200",
                            calculator.duration === months
                              ? "bg-primary text-primary-foreground border-primary"
                              : "bg-background border-border hover:border-primary/50"
                          )}
                        >
                          {months} {months === 1 ? "Month" : "Months"}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Price Summary */}
                  <div className="bg-gradient-to-br from-primary to-accent rounded-xl p-6 text-white">
                    <div className="text-center mb-4">
                      <div className="text-4xl font-bold mb-2">
                        ${calculateMonthlyPrice()}
                        <span className="text-lg font-normal opacity-90">
                          /month
                        </span>
                      </div>
                      <p className="text-primary-foreground/90">
                        {calculator.duration}-month program total:{" "}
                        <strong>${calculatePrice()}</strong>
                      </p>
                    </div>

                    {calculateSavings() > 0 && (
                      <div className="bg-white/20 rounded-lg p-3 text-center">
                        <p className="text-sm font-medium">
                          🎉 Family Savings:{" "}
                          <strong>${calculateSavings()}</strong>
                        </p>
                      </div>
                    )}

                    {/* Features */}
                    <div className="grid grid-cols-2 gap-3 mt-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4" />
                        <span>{calculator.sessionsPerWeek} sessions/week</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4" />
                        <span>
                          {calculator.familyMembers} family member
                          {calculator.familyMembers > 1 ? "s" : ""}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4" />
                        <span>{calculator.course.duration}min sessions</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Crown className="w-4 h-4" />
                        <span>Certified teacher</span>
                      </div>
                    </div>
                  </div>

                  {/* CTA Buttons */}
                  <div className="flex space-x-3">
                    <Link
                      href={`/courses/${calculator.course.id}`}
                      className="flex-1"
                    >
                      <Button size="lg" className="w-full">
                        Learn More
                      </Button>
                    </Link>
                    <Link href="/auth/signup" className="flex-1">
                      <Button variant="outline" size="lg" className="w-full">
                        Start Learning
                      </Button>
                    </Link>
                  </div>

                  {/* Additional Info */}
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground">
                      ✅ Free trial class available • ✅ Flexible scheduling •
                      ✅ Cancel anytime
                    </p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Additional Features */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 grid md:grid-cols-3 gap-8 text-center"
        >
          {[
            {
              icon: "💰",
              title: "Transparent Pricing",
              description:
                "No hidden fees. Pay only for what you need with flexible plans.",
            },
            {
              icon: "👨‍👩‍👧‍👦",
              title: "Family Discounts",
              description:
                "Save up to 30% when multiple family members learn together.",
            },
            {
              icon: "⚡",
              title: "Quick Start",
              description:
                "Begin your Quran journey within 24 hours of enrollment.",
            },
          ].map((feature, index) => (
            <div key={index} className="space-y-3">
              <div className="text-4xl">{feature.icon}</div>
              <h4 className="font-heading font-bold text-lg">
                {feature.title}
              </h4>
              <p className="text-muted-foreground text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
