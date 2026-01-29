// src/components/payment/payment-plans.tsx
"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Check, Star, Zap, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const paymentPlans = [
  {
    id: "basic",
    name: "Basic Plan",
    description: "Perfect for beginners starting their Quran journey",
    price: 49,
    duration: "month",
    popular: false,
    features: [
      "4 One-on-One Sessions/Month",
      "30 Minutes per Session",
      "Basic Tajweed Instruction",
      "Weekly Progress Report",
      "Email Support",
      "Flexible Scheduling",
    ],
    cta: "Start Learning",
  },
  {
    id: "standard",
    name: "Standard Plan",
    description: "Our most popular choice for consistent learning",
    price: 89,
    duration: "month",
    popular: true,
    features: [
      "8 One-on-One Sessions/Month",
      "45 Minutes per Session",
      "Advanced Tajweed Rules",
      "Daily Practice Assignments",
      "Priority Scheduling",
      "Phone & Email Support",
      "Monthly Assessment",
      "Progress Certificate",
    ],
    cta: "Get Started",
  },
  {
    id: "premium",
    name: "Premium Plan",
    description: "Complete Quran mastery with intensive training",
    price: 149,
    duration: "month",
    popular: false,
    features: [
      "16 One-on-One Sessions/Month",
      "1 Hour per Session",
      "Complete Tajweed Mastery",
      "Personalized Learning Plan",
      "24/7 Teacher Support",
      "Weekly Progress Meetings",
      "Certification Preparation",
      "Ijazah Opportunity",
      "Flexible Rescheduling",
      "Dedicated Student Manager",
    ],
    cta: "Go Premium",
  },
  {
    id: "hifz",
    name: "Hifz Program",
    description: "Complete Quran memorization program",
    price: 199,
    duration: "month",
    popular: false,
    features: [
      "Daily One-on-One Sessions",
      "2 Hours Daily Commitment",
      "Expert Hifz Teacher",
      "Individual Memorization Plan",
      "Regular Revision Schedule",
      "Progress Tracking System",
      "Ijazah Preparation",
      "Parent/Guardian Updates",
      "Flexible Payment Options",
      "Completion Certificate",
    ],
    cta: "Start Hifz Journey",
  },
];

export function PaymentPlans() {
  const [selectedPlan, setSelectedPlan] = useState("standard");
  const [billingCycle, setBillingCycle] = useState<"month" | "year">("month");

  const getFinalPrice = (price: number) => {
    return billingCycle === "year" ? Math.floor(price * 12 * 0.8) : price;
  };

  return (
    <div className="py-20 bg-background">
      <div className="container mx-auto px-4 lg:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-4xl font-heading font-bold mb-4">
            Choose Your <span className="text-primary">Quran Learning</span>{" "}
            Plan
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Affordable pricing with flexible options for every student. Start
            your Quran journey today with our certified teachers.
          </p>

          {/* Billing Toggle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-center space-x-4 mt-8"
          >
            <span
              className={cn(
                "text-lg font-medium transition-colors",
                billingCycle === "month"
                  ? "text-foreground"
                  : "text-muted-foreground"
              )}
            >
              Monthly
            </span>
            <button
              onClick={() =>
                setBillingCycle(billingCycle === "month" ? "year" : "month")
              }
              className="relative w-14 h-7 bg-primary rounded-full transition-colors"
            >
              <motion.div
                className="w-5 h-5 bg-white rounded-full absolute top-1"
                animate={{ left: billingCycle === "month" ? 4 : 30 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              />
            </button>
            <div className="flex items-center space-x-2">
              <span
                className={cn(
                  "text-lg font-medium transition-colors",
                  billingCycle === "year"
                    ? "text-foreground"
                    : "text-muted-foreground"
                )}
              >
                Yearly
              </span>
              <span className="bg-green-100 text-green-800 text-sm px-2 py-1 rounded-full">
                Save 20%
              </span>
            </div>
          </motion.div>
        </motion.div>

        <div className="grid lg:grid-cols-2 xl:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {paymentPlans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={cn(
                "relative bg-card rounded-2xl border shadow-sm hover:shadow-md transition-all duration-300",
                plan.popular && "ring-2 ring-accent scale-105"
              )}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <div className="bg-accent text-accent-foreground px-4 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
                    <Star className="w-4 h-4 fill-current" />
                    <span>Most Popular</span>
                  </div>
                </div>
              )}

              {plan.id === "hifz" && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
                    <Crown className="w-4 h-4 fill-current" />
                    <span>Hifz Program</span>
                  </div>
                </div>
              )}

              <div className="p-6 space-y-6">
                {/* Header */}
                <div className="text-center space-y-2">
                  <h3 className="text-xl font-heading font-bold">
                    {plan.name}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {plan.description}
                  </p>

                  {/* Price */}
                  <div className="flex items-baseline justify-center space-x-1 mt-4">
                    <span className="text-3xl lg:text-4xl font-bold text-foreground">
                      ${getFinalPrice(plan.price)}
                    </span>
                    <span className="text-muted-foreground">
                      /{billingCycle === "year" ? "year" : plan.duration}
                    </span>
                  </div>

                  {billingCycle === "year" && (
                    <p className="text-sm text-green-600">
                      Save ${plan.price * 12 - getFinalPrice(plan.price)} yearly
                    </p>
                  )}
                </div>

                {/* Features */}
                <div className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <div
                      key={featureIndex}
                      className="flex items-center space-x-3"
                    >
                      <div className="w-5 h-5 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-primary" />
                      </div>
                      <span className="text-sm text-card-foreground">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <Button
                  className={cn(
                    "w-full",
                    plan.popular &&
                      "bg-accent text-accent-foreground hover:bg-accent/90",
                    plan.id === "hifz" &&
                      "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                  )}
                  size="lg"
                >
                  {plan.id === "hifz" && <Zap className="w-4 h-4 mr-2" />}
                  {plan.cta}
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                title: "Flexible Payments",
                description:
                  "Multiple payment methods available with secure processing",
              },
              {
                title: "Free Trial",
                description:
                  "Start with a free one-on-one trial class to experience our teaching",
              },
              {
                title: "Satisfaction Guarantee",
                description:
                  "Not satisfied? Get a full refund within the first 2 weeks",
              },
            ].map((item, index) => (
              <div key={item.title} className="text-center">
                <h4 className="font-semibold text-foreground mb-2">
                  {item.title}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
