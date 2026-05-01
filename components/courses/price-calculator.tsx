"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calculator,
  Users,
  Clock,
  Calendar,
  Zap,
  Tag,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface PriceCalculation {
  basePrice: number;
  sessionDuration: number;
  sessionsPerWeek: number;
  studentCount: number;
  totalMonthly: number;
  discountedPrice: number;
  savings: number;
}

export function PriceCalculator() {
  const [calculation, setCalculation] = useState<PriceCalculation>({
    basePrice: 49,
    sessionDuration: 45,
    sessionsPerWeek: 2,
    studentCount: 1,
    totalMonthly: 0,
    discountedPrice: 0,
    savings: 0,
  });

  const sessionDurations = [
    { value: 30, label: "30 mins", pricePerMin: 1.2 },
    { value: 45, label: "45 mins", pricePerMin: 1.1 },
    { value: 60, label: "1 hour", pricePerMin: 1.0 },
    { value: 90, label: "1.5 hours", pricePerMin: 0.9 },
  ];

  const familyDiscounts = [
    { students: 1, discount: 0 },
    { students: 2, discount: 0.15 },
    { students: 3, discount: 0.25 },
    { students: 4, discount: 0.35 },
  ];

  useEffect(() => {
    calculatePrice();
  }, [
    calculation.sessionDuration,
    calculation.sessionsPerWeek,
    calculation.studentCount,
  ]);

  const calculatePrice = () => {
    const durationMultiplier =
      sessionDurations.find((d) => d.value === calculation.sessionDuration)
        ?.pricePerMin || 1;
    const weeklyHours =
      (calculation.sessionDuration / 60) * calculation.sessionsPerWeek;
    const baseWeeklyPrice = weeklyHours * 25 * durationMultiplier; // $25/hour base rate
    const baseMonthlyPrice = baseWeeklyPrice * 4.33; // Average weeks per month

    const discount =
      familyDiscounts.find((d) => d.students === calculation.studentCount)
        ?.discount || 0;
    const discountedPrice = baseMonthlyPrice * (1 - discount);
    const savings = baseMonthlyPrice - discountedPrice;

    setCalculation((prev) => ({
      ...prev,
      totalMonthly: Math.round(baseMonthlyPrice),
      discountedPrice: Math.round(discountedPrice),
      savings: Math.round(savings),
    }));
  };

  const updateCalculation = (field: keyof PriceCalculation, value: number) => {
    setCalculation((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="bg-card rounded-2xl border shadow-sm p-6 lg:p-8">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <Calculator className="w-6 h-6 text-primary" />
          <h3 className="text-2xl font-heading font-bold">
            Customize Your Learning Plan
          </h3>
        </div>
        <p className="text-muted-foreground">
          Adjust the settings below to see personalized pricing for your Quran
          learning journey
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Calculator Controls */}
        <div className="space-y-6">
          {/* Session Duration */}
          <div>
            <label className="flex items-center space-x-2 text-sm font-medium text-card-foreground mb-3">
              <Clock className="w-4 h-4 text-primary" />
              <span>Session Duration</span>
            </label>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
              {sessionDurations.map((duration) => (
                <button
                  key={duration.value}
                  onClick={() =>
                    updateCalculation("sessionDuration", duration.value)
                  }
                  className={cn(
                    "p-3 border rounded-lg text-sm font-medium transition-all duration-200",
                    calculation.sessionDuration === duration.value
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border hover:border-primary/50 text-card-foreground"
                  )}
                >
                  {duration.label}
                </button>
              ))}
            </div>
          </div>

          {/* Sessions Per Week */}
          <div>
            <label className="flex items-center space-x-2 text-sm font-medium text-card-foreground mb-3">
              <Calendar className="w-4 h-4 text-primary" />
              <span>Sessions Per Week</span>
            </label>
            <div className="flex items-center space-x-2">
              {[1, 2, 3, 4, 5].map((count) => (
                <button
                  key={count}
                  onClick={() => updateCalculation("sessionsPerWeek", count)}
                  className={cn(
                    "flex-1 p-3 border rounded-lg text-sm font-medium transition-all duration-200",
                    calculation.sessionsPerWeek === count
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border hover:border-primary/50 text-card-foreground"
                  )}
                >
                  {count}
                </button>
              ))}
            </div>
          </div>

          {/* Number of Students */}
          <div>
            <label className="flex items-center space-x-2 text-sm font-medium text-card-foreground mb-3">
              <Users className="w-4 h-4 text-primary" />
              <span>Number of Students</span>
            </label>
            <div className="grid grid-cols-4 gap-2">
              {[1, 2, 3, 4].map((count) => {
                const discount =
                  familyDiscounts.find((d) => d.students === count)?.discount ||
                  0;
                return (
                  <button
                    key={count}
                    onClick={() => updateCalculation("studentCount", count)}
                    className={cn(
                      "p-3 border rounded-lg text-sm font-medium transition-all duration-200 relative",
                      calculation.studentCount === count
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border hover:border-primary/50 text-card-foreground"
                    )}
                  >
                    {count}
                    {discount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs px-1 rounded">
                        -{discount * 100}%
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Price Display */}
        <div className="bg-gradient-to-br from-primary to-accent rounded-xl p-6 text-white">
          <div className="text-center mb-6">
            <h4 className="text-xl font-heading font-bold mb-2">
              Your Monthly Investment
            </h4>
            <p className="text-primary-foreground/80">
              {calculation.sessionsPerWeek} sessions/week ×{" "}
              {calculation.sessionDuration} mins
            </p>
          </div>

          <div className="space-y-4">
            {/* Base Price */}
            <div className="flex justify-between items-center">
              <span className="text-primary-foreground/80">Base Price:</span>
              <span className="text-lg font-semibold">
                ${calculation.totalMonthly}
              </span>
            </div>

            {/* Family Discount */}
            {calculation.studentCount > 1 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex justify-between items-center bg-white/10 rounded-lg p-3"
              >
                <div className="flex items-center space-x-2">
                  <Tag className="w-4 h-4 text-green-300" />
                  <span className="text-green-300">
                    Family Discount ({calculation.studentCount} students):
                  </span>
                </div>
                <span className="text-green-300 font-semibold">
                  -${calculation.savings}
                </span>
              </motion.div>
            )}

            {/* Total Price */}
            <div className="border-t border-white/20 pt-4 flex justify-between items-center">
              <span className="text-lg font-semibold">Total Monthly:</span>
              <div className="text-right">
                <div className="text-2xl lg:text-3xl font-bold">
                  ${calculation.discountedPrice}
                </div>
                <div className="text-sm text-primary-foreground/80">
                  per month
                </div>
              </div>
            </div>

            {/* Savings Highlight */}
            {calculation.savings > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-green-500/20 border border-green-400 rounded-lg p-3 text-center"
              >
                <div className="flex items-center justify-center space-x-2 text-green-300">
                  <Sparkles className="w-4 h-4" />
                  <span className="font-semibold">
                    You save ${calculation.savings}/month!
                  </span>
                </div>
              </motion.div>
            )}

            {/* CTA Button */}
            <Button
              size="lg"
              className="w-full bg-white text-primary hover:bg-white/90 mt-4"
              asChild
            >
              <Link href="/contact?inquiry=custom-plan">
                <Zap className="w-4 h-4 mr-2" />
                Get This Plan
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Additional Info */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
        <div className="p-4 bg-muted/50 rounded-lg">
          <div className="text-sm text-muted-foreground mb-1">
            Flexible Scheduling
          </div>
          <div className="font-semibold text-card-foreground">
            Choose Your Times
          </div>
        </div>
        <div className="p-4 bg-muted/50 rounded-lg">
          <div className="text-sm text-muted-foreground mb-1">
            Certified Teachers
          </div>
          <div className="font-semibold text-card-foreground">
            Expert Guidance
          </div>
        </div>
        <div className="p-4 bg-muted/50 rounded-lg">
          <div className="text-sm text-muted-foreground mb-1">Satisfaction</div>
          <div className="font-semibold text-card-foreground">
            14-Day Guarantee
          </div>
        </div>
      </div>
    </div>
  );
}
