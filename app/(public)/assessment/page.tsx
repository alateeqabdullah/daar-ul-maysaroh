// app/assessment/page.tsx
"use client";

import { useState } from "react";
import {
  Clock,
  User,
  Mail,
  Phone,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Loader2,
  Users,
  Heart,
  Crown,
  Shield,
  GraduationCap,
  Globe,
  Quote,
  Scroll,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/shared/section-animation";
import Link from "next/link";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

// Dean Abubakar Al-Maysariy
const DEAN = {
  name: "Shaykh Abubakar Al-Maysariy",
  title: "Dean of Academic Affairs & Chief Scholar",
  credentials: "Ijazah in Qira'at",
  experience: "15+ years",
  students: "500+",
  sanad: "Unbroken chain to Prophet Muhammad (ﷺ)",
  image: "أ",
  bio: "Shaykh Abubakar personally oversees every student's assessment, ensuring each receives a tailored learning path with proper teacher matching.",
  quote:
    "Every soul has a unique path to the Quran. My duty is to illuminate that path for you.",
};

// Time slots
const TIME_SLOTS = [
  "09:00 AM",
  "09:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "12:00 PM",
  "12:30 PM",
  "01:00 PM",
  "01:30 PM",
  "02:00 PM",
  "02:30 PM",
  "03:00 PM",
  "03:30 PM",
  "04:00 PM",
  "04:30 PM",
];

// Formspree Endpoint
const FORMSPREE_ENDPOINT = "https://formspree.io/f/xjgjrobk";

export default function AssessmentPage() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    age: "",
    country: "",
    currentLevel: "",
    programInterest: "",
    notes: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formDataToSend = new FormData();
    formDataToSend.append("fullName", formData.fullName);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("phone", formData.phone);
    formDataToSend.append("age", formData.age);
    formDataToSend.append("country", formData.country);
    formDataToSend.append("currentLevel", formData.currentLevel);
    formDataToSend.append("programInterest", formData.programInterest);
    formDataToSend.append("preferredDate", selectedDate);
    formDataToSend.append("preferredTime", selectedTime);
    formDataToSend.append("notes", formData.notes);
    formDataToSend.append("_subject", "[Al-Maysaroh] Assessment Request");

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: formDataToSend,
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        setIsSuccess(true);
        toast.success("Assessment Request Submitted!", {
          description:
            "Shaykh Abubakar's office will contact you within 24 hours.",
        });
      } else {
        toast.error("Submission Failed", {
          description: "Please check your information and try again.",
        });
      }
    } catch (error) {
      toast.error("Network Error", {
        description: "Please check your connection and try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getNext7Days = () => {
    const days = [];
    const today = new Date();
    for (let i = 1; i <= 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      days.push(date);
    }
    return days;
  };

  const days = getNext7Days();
  const canProceed = () => {
    if (step === 1)
      return formData.fullName && formData.email && formData.phone;
    if (step === 2) return formData.currentLevel && formData.programInterest;
    if (step === 3) return selectedDate && selectedTime;
    return true;
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  if (isSuccess) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center py-40 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="institutional-card p-6 sm:p-8 md:p-12 text-center max-w-xl w-full mx-auto"
        >
          <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-6 rounded-full bg-accent/10 flex items-center justify-center">
            <CheckCircle2 className="w-10 h-10 sm:w-12 sm:h-12 text-accent" />
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black mb-4">
            Assessment Request Received!
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base mb-6">
           {` Shaykh Abubakar's office will contact you within 24 hours to
            schedule your personalized assessment session.`}
          </p>

          <div className="p-4 sm:p-6 rounded-xl bg-primary-50/50 dark:bg-primary-950/30 mb-6 text-left">
            <h3 className="font-black text-sm mb-4 flex items-center gap-2">
              <Crown className="w-5 h-5 text-gold" />
              Your Journey Ahead
            </h3>
            <div className="space-y-3">
              {[
                "Dean's office confirms your 20-minute assessment slot",
                "Meet Shaykh Abubakar for personal level evaluation",
                "Receive tailored teacher matching based on your level",
                "Begin your sacred journey with the perfect guide",
              ].map((text, idx) => (
                <div key={idx} className="flex gap-3 items-start">
                  <div className="w-6 h-6 rounded-full bg-primary-700 text-white flex items-center justify-center text-xs font-black shrink-0 mt-0.5">
                    {idx + 1}
                  </div>
                  <p className="text-xs sm:text-sm font-medium">{text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/">
              <Button variant="outline" className="rounded-full px-6">
                Return Home
              </Button>
            </Link>
            <Link href="/courses">
              <Button className="rounded-full px-6 bg-primary-700">
                Explore Programs
              </Button>
            </Link>
          </div>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background overflow-hidden py-20 sm:py-12 md:py-16">
      {/* Background Elements - Reduced opacity for mobile */}
      <div className="fixed inset-0 opacity-[0.02] bg-[url('/islamic-pattern.svg')] bg-center bg-repeat pointer-events-none" />
      <div className="fixed top-0 right-0 w-64 h-64 sm:w-96 sm:h-96 bg-primary-700/5 rounded-full blur-3xl -z-10" />
      <div className="fixed bottom-0 left-0 w-64 h-64 sm:w-96 sm:h-96 bg-primary-700/5 rounded-full blur-3xl -z-10" />

      <div className="container mx-auto px-4 sm:px-6">
        {/* Hero Section - Mobile First */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 md:mb-16">
          <Reveal>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 text-accent text-[10px] font-black uppercase tracking-wider mb-4 border border-accent/20">
              <Sparkles className="w-3 h-3" />
              Free Service • No Commitment
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tighter font-heading leading-[1.1] mb-4">
              Your{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-gold via-primary-600 to-primary-800">
                Sacred Journey
              </span>
              <br className="hidden sm:block" />
              Begins Here
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Receive a personal assessment from Shaykh Abubakar Al-Maysariy.
              Get evaluated, matched with the perfect teacher, and start your
              path to Quranic mastery.
            </p>
          </Reveal>
        </div>

        {/* Dean Profile Card - Mobile First */}
        <Reveal delay={0.1}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto mb-8 sm:mb-12 md:mb-16"
          >
            <div className="institutional-card p-5 sm:p-6 md:p-8 overflow-hidden border-2 border-primary-700/20">
              <div className="h-1 bg-linear-to-r from-gold via-primary-700 to-gold -mt-5 sm:-mt-6 md:-mt-8 mb-5 sm:mb-6 md:mb-8" />

              <div className="flex flex-col items-center text-center">
                <div className="relative shrink-0 mb-4">
                  <div className="absolute -inset-1 bg-linear-to-r from-gold to-primary-700 rounded-full blur opacity-30" />
                  <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full bg-linear-to-br from-primary-700 to-primary-800 flex items-center justify-center text-white text-3xl sm:text-4xl font-black shadow-2xl">
                    {DEAN.image}
                  </div>
                  <div className="absolute -bottom-1 -right-1 bg-gold rounded-full p-1 shadow-lg">
                    <Crown className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                  </div>
                </div>

                <div>
                  <div className="inline-flex items-center gap-2 px-2 py-0.5 rounded-full bg-gold/10 border border-gold/30 mb-2">
                    <Shield className="w-3 h-3 text-gold" />
                    <span className="text-[8px] font-black text-gold uppercase tracking-wider">
                      Dean of Academic Affairs
                    </span>
                  </div>

                  <h2 className="text-xl sm:text-2xl md:text-3xl font-black mb-1">
                    {DEAN.name}
                  </h2>
                  <p className="text-primary-700 font-black text-xs mb-2">
                    {DEAN.credentials}
                  </p>

                  <div className="flex flex-wrap gap-2 justify-center mb-3">
                    <div className="flex items-center gap-1 text-[10px] bg-background/50 px-2 py-1 rounded-full">
                      <GraduationCap className="w-3 h-3 text-primary-700" />
                      <span>{DEAN.experience}</span>
                    </div>
                    <div className="flex items-center gap-1 text-[10px] bg-background/50 px-2 py-1 rounded-full">
                      <Users className="w-3 h-3 text-primary-700" />
                      <span>{DEAN.students} Students</span>
                    </div>
                    <div className="flex items-center gap-1 text-[10px] bg-background/50 px-2 py-1 rounded-full">
                      <Scroll className="w-3 h-3 text-primary-700" />
                      <span className="truncate max-w-[100px]">
                        Sanad: {DEAN.sanad.substring(0, 20)}...
                      </span>
                    </div>
                  </div>

                  <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed mb-3">
                    {DEAN.bio}
                  </p>

                  <div className="relative pt-2">
                    <Quote className="absolute -top-1 -left-1 w-4 h-4 text-gold/20" />
                    <p className="text-xs italic text-muted-foreground/80 pl-4">
                     {` "${DEAN.quote}"`}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </Reveal>

        {/* Multi-Step Form - Mobile First */}
        <div className="max-w-4xl mx-auto">
          {/* Progress Steps - Mobile Friendly */}
          <div className="flex items-center justify-center mb-6 sm:mb-8">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center">
                <div
                  className={cn(
                    "w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-black text-sm transition-all",
                    step >= s
                      ? "bg-primary-700 text-white"
                      : "bg-muted text-muted-foreground",
                  )}
                >
                  {step > s ? (
                    <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5" />
                  ) : (
                    s
                  )}
                </div>
                {s < 3 && (
                  <div
                    className={cn(
                      "w-12 sm:w-16 h-0.5 mx-1 sm:mx-2",
                      step > s ? "bg-primary-700" : "bg-muted",
                    )}
                  />
                )}
              </div>
            ))}
          </div>

          <div className="institutional-card p-5 sm:p-6 md:p-8 lg:p-10">
            <form onSubmit={handleSubmit}>
              <input type="text" name="_gotcha" style={{ display: "none" }} />

              <AnimatePresence mode="wait">
                {/* Step 1: Personal Information */}
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4 sm:space-y-5"
                  >
                    <div className="text-center mb-4 sm:mb-6">
                      <h2 className="text-xl sm:text-2xl font-black mb-1">
                        Tell us about yourself
                      </h2>
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        {`We'll match you with the right scholar`}
                      </p>
                    </div>

                    <div className="space-y-3 sm:space-y-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] sm:text-xs font-black uppercase tracking-wider">
                          Full Name *
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <input
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            required
                            placeholder="Enter your full name"
                            className="w-full h-11 sm:h-12 pl-9 pr-3 rounded-xl border-2 border-border focus:border-primary-700 outline-none transition-all bg-background text-sm"
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] sm:text-xs font-black uppercase tracking-wider">
                          Email *
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <input
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="your@email.com"
                            className="w-full h-11 sm:h-12 pl-9 pr-3 rounded-xl border-2 border-border focus:border-primary-700 outline-none transition-all bg-background text-sm"
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] sm:text-xs font-black uppercase tracking-wider">
                          Phone *
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <input
                            name="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            placeholder="+123 456 7890"
                            className="w-full h-11 sm:h-12 pl-9 pr-3 rounded-xl border-2 border-border focus:border-primary-700 outline-none transition-all bg-background text-sm"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1.5">
                          <label className="text-[10px] sm:text-xs font-black uppercase tracking-wider">
                            Age
                          </label>
                          <input
                            name="age"
                            type="number"
                            value={formData.age}
                            onChange={handleChange}
                            placeholder="Age"
                            min="1"
                            max="120"
                            className="w-full h-11 sm:h-12 px-3 rounded-xl border-2 border-border focus:border-primary-700 outline-none transition-all bg-background text-sm"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-[10px] sm:text-xs font-black uppercase tracking-wider">
                            Country
                          </label>
                          <div className="relative">
                            <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <input
                              name="country"
                              value={formData.country}
                              onChange={handleChange}
                              placeholder="Your country"
                              className="w-full h-11 sm:h-12 pl-9 pr-3 rounded-xl border-2 border-border focus:border-primary-700 outline-none transition-all bg-background text-sm"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Academic Information */}
                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4 sm:space-y-5"
                  >
                    <div className="text-center mb-4 sm:mb-6">
                      <h2 className="text-xl sm:text-2xl font-black mb-1">
                        Your Academic Background
                      </h2>
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        Help us understand your current level
                      </p>
                    </div>

                    <div className="space-y-3 sm:space-y-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] sm:text-xs font-black uppercase tracking-wider">
                          Program Interest
                        </label>
                        <select
                          name="programInterest"
                          value={formData.programInterest}
                          onChange={handleChange}
                          className="w-full h-11 sm:h-12 px-3 rounded-xl border-2 border-border focus:border-primary-700 outline-none transition-all bg-background text-sm"
                        >
                          <option value="">Select a program</option>
                          <option value="hifz">Hifz Al-Quran</option>
                          <option value="qiroah">{`Qiro'ah Al-Quran`}</option>
                          <option value="tajweed">Tajweed Mastery</option>
                          <option value="arabic">Quranic Arabic</option>
                          <option value="tafsir">Tafsir Studies</option>
                          <option value="qiroah">
                            {`Group Qiro'ah (Children)`}
                          </option>
                          <option value="juz-amma">Juz Amma (Children)</option>
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] sm:text-xs font-black uppercase tracking-wider">
                          Current Quran Reading Level
                        </label>
                        <select
                          name="currentLevel"
                          value={formData.currentLevel}
                          onChange={handleChange}
                          className="w-full h-11 sm:h-12 px-3 rounded-xl border-2 border-border focus:border-primary-700 outline-none transition-all bg-background text-sm"
                        >
                          <option value="">Select your level</option>
                          <option value="beginner">
                            Beginner - Cannot read Arabic
                          </option>
                          <option value="some">
                            Some Knowledge - Can read slowly
                          </option>
                          <option value="intermediate">
                            Intermediate - Can read fluently
                          </option>
                          <option value="advanced">
                            Advanced - Some memorization
                          </option>
                          <option value="master">
                            Master - Complete Quran / Ijazah candidate
                          </option>
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] sm:text-xs font-black uppercase tracking-wider">
                          Additional Notes (Optional)
                        </label>
                        <textarea
                          name="notes"
                          value={formData.notes}
                          onChange={handleChange}
                          rows={3}
                          placeholder="Any specific questions, goals, or areas you'd like to focus on?"
                          className="w-full p-3 rounded-xl border-2 border-border focus:border-primary-700 outline-none transition-all resize-none bg-background text-sm"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Schedule */}
                {step === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4 sm:space-y-5"
                  >
                    <div className="text-center mb-4 sm:mb-6">
                      <h2 className="text-xl sm:text-2xl font-black mb-1">
                        Schedule Your Assessment
                      </h2>
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        Choose a preferred date and time
                      </p>
                    </div>

                    <div className="space-y-4 sm:space-y-5">
                      {/* Date Selection - Horizontal Scroll on Mobile */}
                      <div>
                        <label className="text-[10px] sm:text-xs font-black uppercase tracking-wider mb-2 block">
                          Select Date
                        </label>
                        <div className="overflow-x-auto pb-2 -mx-1 px-1">
                          <div className="flex gap-2 min-w-max">
                            {days.map((date, idx) => (
                              <button
                                key={idx}
                                type="button"
                                onClick={() =>
                                  setSelectedDate(date.toLocaleDateString())
                                }
                                className={cn(
                                  "p-2 sm:p-3 rounded-xl border-2 text-center transition-all shrink-0 w-16 sm:w-20",
                                  selectedDate === date.toLocaleDateString()
                                    ? "border-primary-700 bg-primary-700/5 shadow-md"
                                    : "border-border hover:border-primary-700/30",
                                )}
                              >
                                <p className="text-[10px] font-black">
                                  {date.toLocaleDateString("en-US", {
                                    weekday: "short",
                                  })}
                                </p>
                                <p className="text-base sm:text-lg font-black">
                                  {date.getDate()}
                                </p>
                                <p className="text-[8px] text-muted-foreground">
                                  {date.toLocaleDateString("en-US", {
                                    month: "short",
                                  })}
                                </p>
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Time Selection - Grid on mobile */}
                      <div>
                        <label className="text-[10px] sm:text-xs font-black uppercase tracking-wider mb-2 block">
                          Select Time
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                          {TIME_SLOTS.map((time) => (
                            <button
                              key={time}
                              type="button"
                              onClick={() => setSelectedTime(time)}
                              className={cn(
                                "p-2 sm:p-3 rounded-xl border-2 text-center transition-all text-xs sm:text-sm",
                                selectedTime === time
                                  ? "border-primary-700 bg-primary-700/5 text-primary-700 font-black"
                                  : "border-border hover:border-primary-700/30",
                              )}
                            >
                              {time}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Navigation Buttons - Mobile Friendly */}
              <div className="flex justify-between gap-3 mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-border/50">
                {step > 1 && (
                  <Button
                    type="button"
                    onClick={prevStep}
                    variant="outline"
                    className="rounded-full px-5 sm:px-6 py-2 sm:py-3 font-black text-sm"
                  >
                    <ChevronLeft className="w-4 h-4 mr-1" />
                    Back
                  </Button>
                )}
                {step < 3 ? (
                  <Button
                    type="button"
                    onClick={nextStep}
                    disabled={!canProceed()}
                    className={cn(
                      "rounded-full px-5 sm:px-6 py-2 sm:py-3 font-black text-sm ml-auto",
                      !canProceed() && "opacity-50 cursor-not-allowed",
                    )}
                  >
                    Continue
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    disabled={!canProceed() || isSubmitting}
                    className="rounded-full px-5 sm:px-6 py-2 sm:py-3 font-black text-sm bg-primary-700 hover:bg-primary-800 ml-auto"
                  >
                    {isSubmitting ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <>
                        Submit Request
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </>
                    )}
                  </Button>
                )}
              </div>
            </form>
          </div>

          {/* Trust Indicators - Mobile First */}
          <div className="mt-6 sm:mt-8 grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 text-center">
            {[
              { icon: Crown, label: "Dean-Led", value: "Personally assessed" },
              { icon: Users, label: "Teacher Matching", value: "Perfect fit" },
              { icon: Clock, label: "20-Minute", value: "Focused" },
              { icon: Heart, label: "Free", value: "No commitment" },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + idx * 0.1 }}
                className="p-2 sm:p-3 rounded-xl bg-muted/20 border border-border/50"
              >
                <item.icon className="w-4 h-4 sm:w-5 sm:h-5 mx-auto mb-1 text-primary-700" />
                <p className="text-[10px] font-black">{item.label}</p>
                <p className="text-[8px] text-muted-foreground">{item.value}</p>
              </motion.div>
            ))}
          </div>

          {/* Sanad Callout */}
          <div className="mt-6 text-center">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary-700/5 border border-primary-700/10">
              <Scroll className="w-3 h-3 text-gold" />
              <p className="text-[8px] font-black uppercase tracking-wider text-muted-foreground">
                Complete Sanad • Unbroken Chain to Prophet Muhammad (ﷺ)
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
