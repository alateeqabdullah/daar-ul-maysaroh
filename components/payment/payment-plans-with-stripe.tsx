"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import {
  Check,
  Star,
  Zap,
  Crown,
  CreditCard,
  Shield,
  Lock,
} from "lucide-react";
import { StripeCheckoutButton } from "./stripe-checkout-button";
import { cn } from "@/lib/utils";

interface PaymentPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  stripePriceId: string;
  duration: "month" | "year";
  popular: boolean;
  features: string[];
  cta: string;
  recommended?: boolean;
}

const paymentPlans: PaymentPlan[] = [
  {
    id: "basic",
    name: "Basic Plan",
    description: "Perfect for beginners starting their Quran journey",
    price: 49,
    stripePriceId: "price_basic_monthly",
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
    stripePriceId: "price_standard_monthly",
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
    stripePriceId: "price_premium_monthly",
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
    stripePriceId: "price_hifz_monthly",
    duration: "month",
    popular: false,
    recommended: true,
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

interface PaymentPlansWithStripeProps {
  className?: string;
  showBillingToggle?: boolean;
}

export function PaymentPlansWithStripe({
  className,
  showBillingToggle = true,
}: PaymentPlansWithStripeProps) {
  const [billingCycle, setBillingCycle] = useState<"month" | "year">("month");

  const getFinalPrice = (price: number): number => {
    return billingCycle === "year" ? Math.floor(price * 12 * 0.8) : price;
  };

  const getStripePriceId = (plan: PaymentPlan): string => {
    // In production, you'd have different price IDs for monthly/yearly
    // For now, we'll use the monthly price ID
    return plan.stripePriceId;
  };

  const calculateYearlySavings = (price: number): number => {
    return price * 12 - getFinalPrice(price);
  };

  return (
    <div className={cn("py-20 bg-background", className)}>
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
          {showBillingToggle && (
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
                className="relative w-14 h-7 bg-primary rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                <motion.div
                  className="w-5 h-5 bg-white rounded-full absolute top-1 shadow-md"
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
                <span className="bg-green-100 text-green-800 text-sm px-2 py-1 rounded-full font-medium">
                  Save 20%
                </span>
              </div>
            </motion.div>
          )}
        </motion.div>

        <div className="grid lg:grid-cols-2 xl:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {paymentPlans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={cn(
                "relative bg-card rounded-2xl border shadow-sm hover:shadow-md transition-all duration-300 group",
                plan.popular && "ring-2 ring-accent scale-105 z-10",
                plan.recommended && "ring-2 ring-purple-500 scale-105 z-10"
              )}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <div className="bg-accent text-accent-foreground px-4 py-1 rounded-full text-sm font-medium flex items-center space-x-1 shadow-lg">
                    <Star className="w-4 h-4 fill-current" />
                    <span>Most Popular</span>
                  </div>
                </div>
              )}

              {/* Hifz Program Badge */}
              {plan.recommended && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center space-x-1 shadow-lg">
                    <Crown className="w-4 h-4 fill-current" />
                    <span>Recommended</span>
                  </div>
                </div>
              )}

              <div className="p-6 space-y-6">
                {/* Header */}
                <div className="text-center space-y-2">
                  <h3 className="text-xl font-heading font-bold text-card-foreground">
                    {plan.name}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
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

                  {/* Yearly Savings */}
                  {billingCycle === "year" && (
                    <p className="text-sm text-green-600 font-medium">
                      Save ${calculateYearlySavings(plan.price)} yearly
                    </p>
                  )}

                  {/* Monthly Equivalent */}
                  {billingCycle === "year" && (
                    <p className="text-xs text-muted-foreground">
                      ${plan.price}/month equivalent
                    </p>
                  )}
                </div>

                {/* Features */}
                <div className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <motion.div
                      key={feature}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: featureIndex * 0.05 + index * 0.1 }}
                      className="flex items-center space-x-3"
                    >
                      <div className="w-5 h-5 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-primary" />
                      </div>
                      <span className="text-sm text-card-foreground leading-relaxed">
                        {feature}
                      </span>
                    </motion.div>
                  ))}
                </div>

                {/* CTA */}
                <div className="pt-4">
                  <StripeCheckoutButton
                    priceId={getStripePriceId(plan)}
                    courseId={plan.id}
                    className={cn(
                      "w-full transition-all duration-300",
                      plan.popular &&
                        "bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg",
                      plan.recommended &&
                        "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg",
                      !plan.popular &&
                        !plan.recommended &&
                        "bg-primary hover:bg-primary/90"
                    )}
                  >
                    {plan.recommended && <Zap className="w-4 h-4 mr-2" />}
                    {plan.cta}
                  </StripeCheckoutButton>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Security Badges & Guarantees */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16"
        >
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {/* Security */}
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Shield className="w-6 h-6 text-green-600" />
                </div>
              </div>
              <h4 className="font-heading font-bold text-card-foreground">
                Secure Payment
              </h4>
              <p className="text-sm text-muted-foreground">
                All payments are encrypted and secure. We never store your
                payment details.
              </p>
            </div>

            {/* Guarantee */}
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Check className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <h4 className="font-heading font-bold text-card-foreground">
                14-Day Guarantee
              </h4>
              <p className="text-sm text-muted-foreground">
                Not satisfied? Get a full refund within 14 days of enrollment.
              </p>
            </div>

            {/* Support */}
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <CreditCard className="w-6 h-6 text-orange-600" />
                </div>
              </div>
              <h4 className="font-heading font-bold text-card-foreground">
                Flexible Billing
              </h4>
              <p className="text-sm text-muted-foreground">
                Change or cancel your plan anytime. No long-term contracts
                required.
              </p>
            </div>
          </div>

          {/* Additional Security Info */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-center mt-8 pt-8 border-t border-border"
          >
            <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Lock className="w-4 h-4 text-green-600" />
                <span>PCI DSS Compliant</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4 text-blue-600" />
                <span>256-bit SSL Encryption</span>
              </div>
              <div className="flex items-center space-x-2">
                <CreditCard className="w-4 h-4 text-purple-600" />
                <span>Stripe Certified</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
