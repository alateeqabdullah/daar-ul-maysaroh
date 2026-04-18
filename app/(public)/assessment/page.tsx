// app/assessment/page.tsx
"use client";

import { useState } from "react";
import {
  Calendar,
  Clock,
  User,
  Mail,
  Phone,
  Star,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Loader2,
  BookOpen,
  Users,
  Heart,
  Award,
  Crown,
  Shield,
  GraduationCap,
  MapPin,
  Globe,
  Quote,
  Scroll,
  Sun,
  Moon,
  Star as StarIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/shared/section-animation";
import Link from "next/link";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

// Dean Abubakar Al-Maysariy
const DEAN = {
  name: "Shaykh Abubakar Al-Maysariy",
  title: "Dean of Academic Affairs & Chief Scholar",
  credentials: "Ijazah in Ten Qira'at • PhD in Quranic Sciences • 30+ Years",
  experience: "30+ years",
  students: "5000+",
  sanad: "Unbroken chain to Prophet Muhammad (ﷺ)",
  image: "أ",
  bio: "A direct disciple of senior Makkan scholars, Shaykh Abubakar personally oversees every student's assessment, ensuring each receives a tailored learning path with proper teacher matching.",
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
      <main className="pt-32 pb-20 bg-background min-h-screen flex items-center justify-center">
        <div className="container mx-auto px-4 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="institutional-card p-8 sm:p-12 text-center"
          >
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-accent/10 flex items-center justify-center">
              <CheckCircle2 className="w-12 h-12 text-accent" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-black mb-4">
              Assessment Request Received! 🎉
            </h1>
            <p className="text-muted-foreground mb-6">
              Shaykh Abubakar's office will contact you within 24 hours to
              schedule your personalized assessment session.
            </p>

            <div className="p-6 rounded-xl bg-gradient-to-br from-primary-50/50 to-primary-100/30 dark:from-primary-950/30 dark:to-primary-900/20 mb-8 text-left">
              <h3 className="font-black text-sm mb-4 flex items-center gap-2">
                <Crown className="w-5 h-5 text-gold" />
                Your Journey Ahead
              </h3>
              <div className="space-y-4">
                {[
                  "Dean's office confirms your 20-minute assessment slot",
                  "Meet Shaykh Abubakar for personal level evaluation",
                  "Receive tailored teacher matching based on your level",
                  "Begin your sacred journey with the perfect guide",
                ].map((text, idx) => (
                  <div key={idx} className="flex gap-4 items-start">
                    <div className="w-8 h-8 rounded-full bg-primary-700 text-white flex items-center justify-center text-sm font-black shrink-0">
                      {idx + 1}
                    </div>
                    <p className="font-medium">{text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/">
                <Button variant="outline" className="rounded-full px-8">
                  Return Home
                </Button>
              </Link>
              <Link href="/courses">
                <Button className="rounded-full px-8 bg-primary-700">
                  Explore Programs
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </main>
    );
  }

  return (
    <main className="pt-24 sm:pt-28 md:pt-32 pb-20 bg-background relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.02] bg-[url('/islamic-pattern.svg')] bg-center bg-repeat" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-700/5 rounded-full blur-[100px] -z-10" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary-700/5 rounded-full blur-[100px] -z-10" />

      <div className="container mx-auto px-4 sm:px-6">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Reveal>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-xs font-black uppercase tracking-wider mb-6 border border-accent/20">
              <Sparkles className="w-4 h-4" />
              Free Service • No Commitment
            </div>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter font-heading leading-[0.9] mb-6">
              Your{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-primary-600 to-primary-800">
                Sacred Journey
              </span>
              <br />
              Begins Here
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
              Receive a personal assessment from Shaykh Abubakar Al-Maysariy.
              Get evaluated, matched with the perfect teacher, and start your
              path to Quranic mastery.
            </p>
          </Reveal>
        </div>

        {/* Dean Profile Card */}
        <Reveal delay={0.1}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto mb-16"
          >
            <div className="institutional-card p-0 overflow-hidden bg-gradient-to-br from-primary-50/30 to-primary-100/20 dark:from-primary-950/30 dark:to-primary-900/20 border-2 border-primary-700/20 shadow-2xl">
              <div className="h-1.5 bg-gradient-to-r from-gold via-primary-700 to-gold" />

              <div className="p-8 sm:p-10">
                <div className="flex flex-col lg:flex-row gap-8 items-center lg:items-start">
                  <div className="relative shrink-0">
                    <div className="absolute -inset-1 bg-gradient-to-r from-gold to-primary-700 rounded-2xl blur opacity-30" />
                    <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-2xl bg-gradient-to-br from-primary-700 to-primary-800 flex items-center justify-center text-white text-5xl sm:text-6xl font-black shadow-2xl">
                      {DEAN.image}
                    </div>
                    <div className="absolute -bottom-2 -right-2 bg-gold rounded-full p-1.5 shadow-lg">
                      <Crown className="w-4 h-4 text-white" />
                    </div>
                  </div>

                  <div className="flex-1 text-center lg:text-left">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/10 border border-gold/30 mb-3">
                      <Shield className="w-3 h-3 text-gold" />
                      <span className="text-[10px] font-black text-gold uppercase tracking-wider">
                        Dean of Academic Affairs
                      </span>
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-black mb-2">
                      {DEAN.name}
                    </h2>
                    <p className="text-primary-700 font-black text-sm mb-3">
                      {DEAN.credentials}
                    </p>

                    <div className="flex flex-wrap gap-4 justify-center lg:justify-start mb-4">
                      <div className="flex items-center gap-2 text-xs bg-background/50 px-3 py-1.5 rounded-full">
                        <GraduationCap className="w-3.5 h-3.5 text-primary-700" />
                        <span className="font-medium">{DEAN.experience}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs bg-background/50 px-3 py-1.5 rounded-full">
                        <Users className="w-3.5 h-3.5 text-primary-700" />
                        <span className="font-medium">
                          {DEAN.students} Students
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-xs bg-background/50 px-3 py-1.5 rounded-full">
                        <Scroll className="w-3.5 h-3.5 text-primary-700" />
                        <span className="font-medium truncate">
                          Sanad: {DEAN.sanad}
                        </span>
                      </div>
                    </div>

                    <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                      {DEAN.bio}
                    </p>

                    <div className="relative mt-4 pt-3">
                      <Quote className="absolute -top-2 -left-2 w-6 h-6 text-gold/20" />
                      <p className="text-sm italic text-muted-foreground/80 pl-6">
                        "{DEAN.quote}"
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </Reveal>

        {/* Multi-Step Form */}
        <div className="max-w-4xl mx-auto">
          {/* Progress Steps */}
          <div className="flex items-center justify-center mb-8">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center">
                <div
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center font-black transition-all",
                    step >= s
                      ? "bg-primary-700 text-white"
                      : "bg-muted text-muted-foreground",
                  )}
                >
                  {step > s ? <CheckCircle2 className="w-5 h-5" /> : s}
                </div>
                {s < 3 && (
                  <div
                    className={cn(
                      "w-16 h-0.5 mx-2",
                      step > s ? "bg-primary-700" : "bg-muted",
                    )}
                  />
                )}
              </div>
            ))}
          </div>

          <div className="institutional-card p-8 sm:p-10 md:p-12 shadow-2xl">
            <form onSubmit={handleSubmit}>
              <input type="text" name="_gotcha" style={{ display: "none" }} />

              {/* Step 1: Personal Information */}
              {step === 1 && (
                <div className="space-y-6">
                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-black mb-2">
                      Tell us about yourself
                    </h2>
                    <p className="text-muted-foreground">
                      We'll match you with the right scholar
                    </p>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="text-sm font-black uppercase tracking-wider">
                        Full Name *
                      </label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <input
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleChange}
                          required
                          placeholder="Enter your full name"
                          className="w-full h-14 pl-12 pr-4 rounded-xl border-2 border-border focus:border-primary-700 outline-none transition-all bg-background"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-black uppercase tracking-wider">
                        Email *
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <input
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          placeholder="your@email.com"
                          className="w-full h-14 pl-12 pr-4 rounded-xl border-2 border-border focus:border-primary-700 outline-none transition-all bg-background"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-black uppercase tracking-wider">
                        Phone *
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <input
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          placeholder="+123 456 7890"
                          className="w-full h-14 pl-12 pr-4 rounded-xl border-2 border-border focus:border-primary-700 outline-none transition-all bg-background"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-black uppercase tracking-wider">
                        Age
                      </label>
                      <input
                        name="age"
                        type="number"
                        value={formData.age}
                        onChange={handleChange}
                        placeholder="Your age"
                        min="1"
                        max="120"
                        className="w-full h-14 px-4 rounded-xl border-2 border-border focus:border-primary-700 outline-none transition-all bg-background"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-black uppercase tracking-wider">
                        Country
                      </label>
                      <div className="relative">
                        <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <input
                          name="country"
                          value={formData.country}
                          onChange={handleChange}
                          placeholder="Your country"
                          className="w-full h-14 pl-12 pr-4 rounded-xl border-2 border-border focus:border-primary-700 outline-none transition-all bg-background"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Academic Information */}
              {step === 2 && (
                <div className="space-y-6">
                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-black mb-2">
                      Your Academic Background
                    </h2>
                    <p className="text-muted-foreground">
                      Help us understand your current level
                    </p>
                  </div>

                  <div className="space-y-5">
                    <div className="space-y-2">
                      <label className="text-sm font-black uppercase tracking-wider">
                        Program Interest
                      </label>
                      <select
                        name="programInterest"
                        value={formData.programInterest}
                        onChange={handleChange}
                        className="w-full h-14 px-4 rounded-xl border-2 border-border focus:border-primary-700 outline-none transition-all bg-background cursor-pointer"
                      >
                        <option value="">Select a program</option>
                        <option value="hifz">Hifz Al-Quran</option>
                        <option value="tajweed">Tajweed Mastery</option>
                        <option value="arabic">Quranic Arabic</option>
                        <option value="tafsir">Tafsir Studies</option>
                        <option value="qiroah">Group Qiro'ah (Children)</option>
                        <option value="juz-amma">Juz Amma (Children)</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-black uppercase tracking-wider">
                        Current Quran Reading Level
                      </label>
                      <select
                        name="currentLevel"
                        value={formData.currentLevel}
                        onChange={handleChange}
                        className="w-full h-14 px-4 rounded-xl border-2 border-border focus:border-primary-700 outline-none transition-all bg-background cursor-pointer"
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

                    <div className="space-y-2">
                      <label className="text-sm font-black uppercase tracking-wider">
                        Additional Notes (Optional)
                      </label>
                      <textarea
                        name="notes"
                        value={formData.notes}
                        onChange={handleChange}
                        rows={4}
                        placeholder="Any specific questions, goals, or areas you'd like to focus on?"
                        className="w-full p-4 rounded-xl border-2 border-border focus:border-primary-700 outline-none transition-all resize-none bg-background"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Schedule */}
              {step === 3 && (
                <div className="space-y-6">
                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-black mb-2">
                      Schedule Your Assessment
                    </h2>
                    <p className="text-muted-foreground">
                      Choose a preferred date and time
                    </p>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <label className="text-sm font-black uppercase tracking-wider mb-3 block">
                        Select Date
                      </label>
                      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-3">
                        {days.map((date, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() =>
                              setSelectedDate(date.toLocaleDateString())
                            }
                            className={cn(
                              "p-3 rounded-xl border-2 text-center transition-all cursor-pointer",
                              selectedDate === date.toLocaleDateString()
                                ? "border-primary-700 bg-primary-700/5 shadow-md"
                                : "border-border hover:border-primary-700/30",
                            )}
                          >
                            <p className="text-xs font-black">
                              {date.toLocaleDateString("en-US", {
                                weekday: "short",
                              })}
                            </p>
                            <p className="text-lg font-black">
                              {date.getDate()}
                            </p>
                            <p className="text-[10px] text-muted-foreground">
                              {date.toLocaleDateString("en-US", {
                                month: "short",
                              })}
                            </p>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-black uppercase tracking-wider mb-3 block">
                        Select Time
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {TIME_SLOTS.map((time) => (
                          <button
                            key={time}
                            type="button"
                            onClick={() => setSelectedTime(time)}
                            className={cn(
                              "p-3 rounded-xl border-2 text-center transition-all cursor-pointer",
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
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between gap-4 mt-10 pt-6 border-t border-border/50">
                {step > 1 && (
                  <Button
                    type="button"
                    onClick={prevStep}
                    variant="outline"
                    className="rounded-full px-8 py-6 font-black"
                  >
                    ← Back
                  </Button>
                )}
                {step < 3 ? (
                  <Button
                    type="button"
                    onClick={nextStep}
                    disabled={!canProceed()}
                    className={cn(
                      "rounded-full px-8 py-6 font-black ml-auto",
                      !canProceed() && "opacity-50 cursor-not-allowed",
                    )}
                  >
                    Continue
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    disabled={!canProceed() || isSubmitting}
                    className="rounded-full px-8 py-6 font-black bg-primary-700 hover:bg-primary-800 ml-auto"
                  >
                    {isSubmitting ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <>
                        Request Assessment
                        <Calendar className="ml-2 w-4 h-4" />
                      </>
                    )}
                  </Button>
                )}
              </div>
            </form>
          </div>

          {/* Trust Indicators */}
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            {[
              {
                icon: Crown,
                label: "Dean-Led",
                value: "Personally assessed by Shaykh Abubakar",
              },
              {
                icon: Users,
                label: "Teacher Matching",
                value: "Perfect teacher for your level",
              },
              {
                icon: Clock,
                label: "20-Minute Session",
                value: "Focused personal evaluation",
              },
              {
                icon: Heart,
                label: "Free Service",
                value: "No commitment required",
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + idx * 0.1 }}
                className="p-4 rounded-xl bg-muted/20 border border-border/50 hover:border-primary-700/20 transition-all group"
              >
                <item.icon className="w-6 h-6 mx-auto mb-2 text-primary-700 group-hover:scale-110 transition-transform" />
                <p className="text-xs font-black">{item.label}</p>
                <p className="text-[10px] text-muted-foreground mt-1">
                  {item.value}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Sanad Callout */}
          <div className="mt-8 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-700/5 border border-primary-700/10">
              <Scroll className="w-4 h-4 text-gold" />
              <p className="text-[10px] font-black uppercase tracking-wider text-muted-foreground">
                Complete Sanad • Unbroken Chain to Prophet Muhammad (ﷺ)
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
