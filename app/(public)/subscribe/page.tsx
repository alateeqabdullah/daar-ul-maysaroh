// src/app/(public)/subscribe/page.tsx
"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Check, Clock, Calendar, Users, DollarSign, Zap } from "lucide-react";
import Link from "next/link";

const plans = [
  {
    id: "1",
    name: "One-on-One Quran Hifz",
    description: "Personalized Quran memorization with dedicated teacher",
    type: "ONE_ON_ONE",
    category: "QURAN",
    minDuration: 30,
    maxDuration: 120,
    durationStep: 5,
    basePrice: 49,
    pricePerMinute: 1.25,
    features: [
      "Personalized lesson plan",
      "Weekly progress reports",
      "Recording review",
      "Tajweed correction",
      "Flexible scheduling",
      "One-on-one attention",
    ],
  },
  {
    id: "2",
    name: "Group Tajweed Class",
    description: "Learn tajweed rules in small groups",
    type: "GROUP",
    category: "TAJWEED",
    minDuration: 45,
    maxDuration: 90,
    durationStep: 15,
    basePrice: 29,
    pricePerSession: 19,
    features: [
      "Small group (3-6 students)",
      "Interactive sessions",
      "Group exercises",
      "Peer learning",
      "Weekly assignments",
    ],
  },
  {
    id: "3",
    name: "Arabic Language Intensive",
    description: "Comprehensive Arabic course with certified teachers",
    type: "CLASS",
    category: "ARABIC",
    minDuration: 60,
    maxDuration: 120,
    durationStep: 30,
    basePrice: 39,
    pricePerSession: 29,
    features: [
      "Structured curriculum",
      "Certified teachers",
      "Speaking practice",
      "Writing exercises",
      "Monthly assessments",
    ],
  },
];

const daysPerWeekOptions = [
  { value: 1, label: "1 day" },
  { value: 2, label: "2 days" },
  { value: 3, label: "3 days" },
  { value: 5, label: "5 days" },
  { value: 7, label: "Everyday" },
];

const billingPeriods = [
  { value: "monthly", label: "Monthly", discount: 0 },
  { value: "quarterly", label: "Quarterly (Save 10%)", discount: 10 },
  { value: "yearly", label: "Yearly (Save 15%)", discount: 15 },
];

export default function SubscribePage() {
  const [selectedPlan, setSelectedPlan] = useState(plans[0]);
  const [duration, setDuration] = useState(30);
  const [daysPerWeek, setDaysPerWeek] = useState(2);
  const [billingPeriod, setBillingPeriod] = useState("monthly");
  const [preferredDays, setPreferredDays] = useState<number[]>([1, 3, 5]); // Mon, Wed, Fri
  const [preferredTime, setPreferredTime] = useState("14:00");

  const calculatePrice = () => {
    let basePrice = 0;

    if (selectedPlan.pricePerMinute) {
      basePrice = selectedPlan.pricePerMinute * duration;
    } else if (selectedPlan.pricePerSession) {
      basePrice = selectedPlan.pricePerSession;
    } else {
      basePrice = selectedPlan.basePrice;
    }

    // Apply days per week multiplier
    const sessionsPerWeek = daysPerWeek;
    const weeklyPrice = basePrice * sessionsPerWeek;

    // Calculate monthly price (4 weeks)
    const monthlyPrice = weeklyPrice * 4;

    // Apply billing period discount
    const billingDiscount =
      billingPeriods.find((bp) => bp.value === billingPeriod)?.discount || 0;
    const discountedPrice = monthlyPrice * (1 - billingDiscount / 100);

    return {
      perSession: basePrice,
      weekly: weeklyPrice,
      monthly: monthlyPrice,
      final: discountedPrice,
    };
  };

  const prices = calculatePrice();

  const handleDaySelect = (day: number) => {
    if (preferredDays.includes(day)) {
      setPreferredDays(preferredDays.filter((d) => d !== day));
    } else {
      if (preferredDays.length < daysPerWeek) {
        setPreferredDays([...preferredDays, day].sort());
      }
    }
  };

  const getDayName = (day: number) => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return days[day % 7];
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50/50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-6xl">
          {/* Header */}
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              <span className="block text-gradient bg-gradient-primary bg-clip-text">
                Customize Your Learning
              </span>
              <span className="block text-gray-900 dark:text-white">
                Choose Your Perfect Plan
              </span>
            </h1>
            <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
              Select your preferences and get a personalized quote
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Left Column - Plan Selection */}
            <div className="lg:col-span-2 space-y-8">
              {/* Plan Selection */}
              <Card className="border-gray-200/50 bg-white/50 backdrop-blur-sm dark:border-gray-700/50 dark:bg-gray-800/50">
                <CardHeader>
                  <CardTitle>Select Learning Type</CardTitle>
                  <CardDescription>
                    Choose the learning style that suits you best
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <RadioGroup
                    value={selectedPlan.id}
                    onValueChange={(value) =>
                      setSelectedPlan(
                        plans.find((p) => p.id === value) || plans[0]
                      )
                    }
                    className="grid gap-4 sm:grid-cols-3"
                  >
                    {plans.map((plan) => (
                      <div key={plan.id}>
                        <RadioGroupItem
                          value={plan.id}
                          id={plan.id}
                          className="peer sr-only"
                        />
                        <Label
                          htmlFor={plan.id}
                          className="flex flex-col items-center justify-between rounded-md border-2 border-gray-200 bg-white p-4 hover:bg-gray-50 hover:text-gray-900 peer-data-[state=checked]:border-purple-500 peer-data-[state=checked]:bg-purple-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-gray-100 dark:peer-data-[state=checked]:border-purple-600 dark:peer-data-[state=checked]:bg-purple-900/20"
                        >
                          <div className="mb-3 flex items-center gap-2">
                            {plan.type === "ONE_ON_ONE" && (
                              <Users className="h-5 w-5" />
                            )}
                            {plan.type === "GROUP" && (
                              <Users className="h-5 w-5" />
                            )}
                            {plan.type === "CLASS" && (
                              <Users className="h-5 w-5" />
                            )}
                            <span className="font-semibold">
                              {plan.name.split(" ")[0]}
                            </span>
                          </div>
                          <div className="text-center">
                            <div className="text-sm font-medium">
                              {plan.type.replace("_", "-")}
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              {plan.category}
                            </div>
                          </div>
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </CardContent>
              </Card>

              {/* Session Configuration */}
              <Card className="border-gray-200/50 bg-white/50 backdrop-blur-sm dark:border-gray-700/50 dark:bg-gray-800/50">
                <CardHeader>
                  <CardTitle>Session Configuration</CardTitle>
                  <CardDescription>
                    Customize your learning schedule
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                  {/* Duration */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label className="text-base font-medium">
                        <Clock className="mr-2 inline h-5 w-5" />
                        Session Duration
                      </Label>
                      <Badge
                        variant="outline"
                        className="text-lg font-semibold"
                      >
                        {duration} minutes
                      </Badge>
                    </div>
                    <Slider
                      value={[duration]}
                      min={selectedPlan.minDuration}
                      max={selectedPlan.maxDuration}
                      step={selectedPlan.durationStep}
                      onValueChange={([value]) => setDuration(value)}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                      <span>{selectedPlan.minDuration} min</span>
                      <span>{selectedPlan.maxDuration} min</span>
                    </div>
                  </div>

                  {/* Days Per Week */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label className="text-base font-medium">
                        <Calendar className="mr-2 inline h-5 w-5" />
                        Days Per Week
                      </Label>
                      <Badge
                        variant="outline"
                        className="text-lg font-semibold"
                      >
                        {daysPerWeek} days
                      </Badge>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {daysPerWeekOptions.map((option) => (
                        <Button
                          key={option.value}
                          type="button"
                          variant={
                            daysPerWeek === option.value ? "default" : "outline"
                          }
                          size="sm"
                          onClick={() => setDaysPerWeek(option.value)}
                          className={
                            daysPerWeek === option.value
                              ? "bg-gradient-primary"
                              : ""
                          }
                        >
                          {option.label}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Preferred Days Selection */}
                  {daysPerWeek > 0 && (
                    <div className="space-y-4">
                      <Label className="text-base font-medium">
                        Select Preferred Days
                      </Label>
                      <div className="flex flex-wrap gap-2">
                        {[0, 1, 2, 3, 4, 5, 6].map((day) => (
                          <Button
                            key={day}
                            type="button"
                            variant={
                              preferredDays.includes(day)
                                ? "default"
                                : "outline"
                            }
                            size="sm"
                            onClick={() => handleDaySelect(day)}
                            disabled={
                              !preferredDays.includes(day) &&
                              preferredDays.length >= daysPerWeek
                            }
                            className={
                              preferredDays.includes(day)
                                ? "bg-gradient-primary"
                                : ""
                            }
                          >
                            {getDayName(day)}
                          </Button>
                        ))}
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Selected:{" "}
                        {preferredDays.map((d) => getDayName(d)).join(", ")}
                      </p>
                    </div>
                  )}

                  {/* Preferred Time */}
                  <div className="space-y-4">
                    <Label className="text-base font-medium">
                      Preferred Time
                    </Label>
                    <div className="grid grid-cols-4 gap-2 sm:grid-cols-6">
                      {[
                        "09:00",
                        "10:00",
                        "11:00",
                        "14:00",
                        "15:00",
                        "16:00",
                        "17:00",
                        "18:00",
                        "19:00",
                        "20:00",
                      ].map((time) => (
                        <Button
                          key={time}
                          type="button"
                          variant={
                            preferredTime === time ? "default" : "outline"
                          }
                          size="sm"
                          onClick={() => setPreferredTime(time)}
                          className={
                            preferredTime === time ? "bg-gradient-primary" : ""
                          }
                        >
                          {time}
                        </Button>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Features */}
              <Card className="border-gray-200/50 bg-white/50 backdrop-blur-sm dark:border-gray-700/50 dark:bg-gray-800/50">
                <CardHeader>
                  <CardTitle>What&apos;s Included</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {selectedPlan.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="mr-3 mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
                        <span className="text-gray-700 dark:text-gray-300">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Pricing Summary */}
            <div className="space-y-6">
              {/* Pricing Summary */}
              <Card className="sticky top-6 border-purple-200/50 bg-gradient-to-b from-purple-50/50 to-white backdrop-blur-sm dark:border-purple-800/50 dark:from-gray-900/50 dark:to-gray-800/50">
                <CardHeader>
                  <CardTitle>Pricing Summary</CardTitle>
                  <CardDescription>Review your custom plan</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Plan Details */}
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <h4 className="font-semibold">{selectedPlan.name}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {selectedPlan.description}
                      </p>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          Session Duration
                        </span>
                        <span className="font-medium">{duration} minutes</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          Days Per Week
                        </span>
                        <span className="font-medium">{daysPerWeek} days</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          Preferred Time
                        </span>
                        <span className="font-medium">{preferredTime}</span>
                      </div>
                      {preferredDays.length > 0 && (
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            Preferred Days
                          </span>
                          <span className="font-medium">
                            {preferredDays
                              .map((d) => getDayName(d).slice(0, 1))
                              .join("")}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Billing Period */}
                  <div className="space-y-4">
                    <Label className="font-medium">Billing Period</Label>
                    <RadioGroup
                      value={billingPeriod}
                      onValueChange={setBillingPeriod}
                      className="space-y-2"
                    >
                      {billingPeriods.map((period) => (
                        <div
                          key={period.value}
                          className="flex items-center space-x-2"
                        >
                          <RadioGroupItem
                            value={period.value}
                            id={period.value}
                          />
                          <Label
                            htmlFor={period.value}
                            className="flex-1 cursor-pointer"
                          >
                            <div className="flex items-center justify-between">
                              <span>{period.label}</span>
                              {period.discount > 0 && (
                                <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                                  Save {period.discount}%
                                </Badge>
                              )}
                            </div>
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>

                  {/* Price Breakdown */}
                  <div className="space-y-3 rounded-lg bg-gray-50 p-4 dark:bg-gray-800/50">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Price per session
                      </span>
                      <span className="font-medium">
                        ${prices.perSession.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Weekly total
                      </span>
                      <span className="font-medium">
                        ${prices.weekly.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Monthly total
                      </span>
                      <span className="font-medium">
                        ${prices.monthly.toFixed(2)}
                      </span>
                    </div>
                    {billingPeriods.find((bp) => bp.value === billingPeriod)
                      ?.discount > 0 && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          Discount
                        </span>
                        <span className="font-medium text-green-600 dark:text-green-400">
                          -${(prices.monthly - prices.final).toFixed(2)}
                        </span>
                      </div>
                    )}
                    <div className="border-t pt-3">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold">
                          Final Monthly Price
                        </span>
                        <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                          ${prices.final.toFixed(2)}
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                        Billed{" "}
                        {billingPeriod === "monthly"
                          ? "monthly"
                          : billingPeriod === "quarterly"
                          ? "every 3 months"
                          : "annually"}
                      </p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full bg-gradient-primary"
                    size="lg"
                    asChild
                  >
                    <Link href="/register">
                      <Zap className="mr-2 h-5 w-5" />
                      Continue to Registration
                    </Link>
                  </Button>
                </CardFooter>
              </Card>

              {/* Value Proposition */}
              <Card className="border-gray-200/50 bg-white/50 backdrop-blur-sm dark:border-gray-700/50 dark:bg-gray-800/50">
                <CardHeader>
                  <CardTitle className="text-lg">Why Choose Us?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
                      <Check className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Flexible Scheduling</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Choose days and times that work for you
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                      <DollarSign className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Transparent Pricing</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        No hidden fees, pay only for what you need
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400">
                      <Users className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Qualified Teachers</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Certified and experienced Islamic teachers
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
