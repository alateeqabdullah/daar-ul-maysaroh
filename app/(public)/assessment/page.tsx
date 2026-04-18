// app/assessment/page.tsx
"use client";

import { useState, useEffect } from "react";
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
  MessageCircle,
  ChevronRight,
  Sun,
  Moon,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/shared/section-animation";
import Link from "next/link";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

// Time slots (Nigeria Time WAT)
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
  "05:00 PM",
];

// Assessment types
const ASSESSMENT_TYPES = [
  {
    id: "quran",
    name: "Quran Recitation",
    icon: BookOpen,
    desc: "Evaluate your Tajweed and reading fluency",
    duration: "20 min",
  },
  {
    id: "hifz",
    name: "Hifz Assessment",
    icon: Award,
    desc: "Check memorization level and retention",
    duration: "25 min",
  },
  {
    id: "arabic",
    name: "Arabic Level",
    icon: MessageCircle,
    desc: "Determine your Arabic proficiency",
    duration: "20 min",
  },
  {
    id: "general",
    name: "General Guidance",
    icon: Heart,
    desc: "Get program recommendations",
    duration: "15 min",
  },
];

// Available scholars
const SCHOLARS = [
  {
    id: "fatima",
    name: "Ustadha Fatima Al-Misriyyah",
    title: "Senior Tajweed Scholar",
    specialty: "Quran Recitation & Tajweed",
    image: "F",
    available: true,
  },
  {
    id: "yusuf",
    name: "Shaykh Yusuf Al-Madani",
    title: "Hifz Specialist",
    specialty: "Memorization & Revision",
    image: "Y",
    available: true,
  },
  {
    id: "aminah",
    name: "Ustadha Aminah Al-Qurtubiyyah",
    title: "Arabic Language Scholar",
    specialty: "Classical Arabic & Grammar",
    image: "A",
    available: true,
  },
];

export default function AssessmentPage() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedScholar, setSelectedScholar] = useState("");

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    currentLevel: "",
    notes: "",
  });

  // Generate next 7 days for date picker
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

    // Prepare data for Formspree or your backend
    const assessmentData = {
      ...formData,
      assessmentType: selectedType,
      scholar: selectedScholar,
      date: selectedDate,
      time: selectedTime,
      type: "assessment_request",
    };

    // Send to your preferred endpoint
    const endpoint = "https://formspree.io/f/xjgjrobk";

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(assessmentData),
      });

      if (response.ok) {
        setIsSuccess(true);
        toast.success("Assessment Scheduled!", {
          description: "Check your email for the Zoom link and confirmation.",
        });
      } else {
        throw new Error("Submission failed");
      }
    } catch (error) {
      toast.error("Something went wrong", {
        description: "Please try again or contact us directly.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const canProceed = () => {
    if (step === 1)
      return formData.fullName && formData.email && formData.phone;
    if (step === 2) return selectedType;
    if (step === 3) return selectedScholar;
    if (step === 4) return selectedDate && selectedTime;
    return true;
  };

  const days = getNext7Days();

  if (isSuccess) {
    return (
      <main className="pt-32 pb-20 bg-background min-h-screen flex items-center justify-center">
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <div className="institutional-card p-12">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-accent/10 flex items-center justify-center">
              <CheckCircle2 className="w-12 h-12 text-accent" />
            </div>
            <h1 className="text-3xl font-black mb-4">
              Assessment Scheduled! 🎉
            </h1>
            <p className="text-muted-foreground mb-6">
                {`Your free assessment has been confirmed. You'll receive a Zoom
                link and calendar invitation within the next hour. If you have any questions or need to reschedule, please contact us at info@al-maysaroh.com. We look forward to helping you on your Quranic journey!`}
            </p>
            <div className="p-6 rounded-xl bg-primary-50 dark:bg-primary-950/30 mb-8">
              <p className="text-sm font-black mb-2">📅 Assessment Details:</p>
              <p className="text-sm">Date: {selectedDate}</p>
              <p className="text-sm">Time: {selectedTime} (WAT)</p>
              <p className="text-sm">
                Scholar: {SCHOLARS.find((s) => s.id === selectedScholar)?.name}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/">
                <Button variant="outline" className="rounded-full px-8">
                  Return Home
                </Button>
              </Link>
              <Link href="/admissions">
                <Button className="rounded-full px-8 bg-primary-700">
                  Explore Programs
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="pt-24 sm:pt-28 md:pt-32 pb-20 bg-background relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02] bg-[url('/islamic-pattern.svg')] bg-center bg-repeat" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-700/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-700/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 sm:px-6">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Reveal>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-xs font-black uppercase tracking-wider mb-6">
              <Sparkles className="w-4 h-4" />
              Free Service • No Commitment
            </div>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tighter font-heading leading-[0.9] mb-6">
              Free <span className="text-primary-700 italic">Assessment</span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground">
              Not sure which program fits your level? Book a 20-minute session
              with our scholar. Get personalized guidance and a clear learning
              path.
            </p>
          </Reveal>
        </div>

        {/* Progress Steps */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="flex items-center justify-between">
            {[
              { num: 1, label: "Your Info" },
              { num: 2, label: "Assessment Type" },
              { num: 3, label: "Choose Scholar" },
              { num: 4, label: "Pick Time" },
            ].map((s, idx) => (
              <div key={s.num} className="flex-1">
                <div className="flex items-center">
                  <div
                    className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center font-black transition-all",
                      step >= s.num
                        ? "bg-primary-700 text-white"
                        : "bg-muted text-muted-foreground",
                    )}
                  >
                    {step > s.num ? (
                      <CheckCircle2 className="w-5 h-5" />
                    ) : (
                      s.num
                    )}
                  </div>
                  {idx < 3 && (
                    <div
                      className={cn(
                        "flex-1 h-0.5 mx-2",
                        step > s.num ? "bg-primary-700" : "bg-muted",
                      )}
                    />
                  )}
                </div>
                <p className="text-xs mt-2 text-muted-foreground hidden sm:block">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Main Form */}
        <div className="max-w-4xl mx-auto">
          <div className="institutional-card p-8 sm:p-10 md:p-12">
            <form onSubmit={handleSubmit}>
              {/* Step 1: Personal Information */}
              {step === 1 && (
                <div className="space-y-6">
                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-black mb-2">
                      Tell us about yourself
                    </h2>
                    <p className="text-muted-foreground">
                      {`We'll match you with the right scholar and program based on your current level and goals. Don't worry, it's just basic info!`}
                    </p>
                  </div>

                  <div className="space-y-5">
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
                          className="w-full h-14 pl-12 pr-4 rounded-xl border-2 border-border focus:border-primary-700 outline-none transition-all"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-black uppercase tracking-wider">
                        Email Address *
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
                          className="w-full h-14 pl-12 pr-4 rounded-xl border-2 border-border focus:border-primary-700 outline-none transition-all"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-black uppercase tracking-wider">
                        Phone Number *
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
                          className="w-full h-14 pl-12 pr-4 rounded-xl border-2 border-border focus:border-primary-700 outline-none transition-all"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-black uppercase tracking-wider">
                        Current Level (Optional)
                      </label>
                      <select
                        name="currentLevel"
                        value={formData.currentLevel}
                        onChange={handleChange}
                        className="w-full h-14 px-4 rounded-xl border-2 border-border focus:border-primary-700 outline-none transition-all"
                      >
                        <option value="">Select your level</option>
                        <option value="beginner">
                          Beginner - Just starting
                        </option>
                        <option value="some">
                          Some knowledge - Can read slowly
                        </option>
                        <option value="intermediate">
                          Intermediate - Can read fluently
                        </option>
                        <option value="advanced">
                          Advanced - Some memorization
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Assessment Type */}
              {step === 2 && (
                <div className="space-y-6">
                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-black mb-2">
                      What would you like assessed?
                    </h2>
                    <p className="text-muted-foreground">
                      Choose the focus of your session
                    </p>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    {ASSESSMENT_TYPES.map((type) => {
                      const Icon = type.icon;
                      return (
                        <button
                          key={type.id}
                          type="button"
                          onClick={() => setSelectedType(type.id)}
                          className={cn(
                            "p-6 rounded-2xl border-2 text-left transition-all group",
                            selectedType === type.id
                              ? "border-primary-700 bg-primary-700/5 shadow-lg"
                              : "border-border hover:border-primary-700/30",
                          )}
                        >
                          <Icon
                            className={cn(
                              "w-8 h-8 mb-3",
                              selectedType === type.id
                                ? "text-primary-700"
                                : "text-muted-foreground",
                            )}
                          />
                          <h3 className="font-black text-lg mb-1">
                            {type.name}
                          </h3>
                          <p className="text-sm text-muted-foreground mb-2">
                            {type.desc}
                          </p>
                          <div className="flex items-center gap-2 text-xs text-primary-700">
                            <Clock className="w-3 h-3" />
                            {type.duration}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Step 3: Choose Scholar */}
              {step === 3 && (
                <div className="space-y-6">
                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-black mb-2">
                      Choose Your Scholar
                    </h2>
                    <p className="text-muted-foreground">
                      All scholars are Ijazah-certified
                    </p>
                  </div>

                  <div className="space-y-4">
                    {SCHOLARS.map((scholar) => (
                      <button
                        key={scholar.id}
                        type="button"
                        onClick={() => setSelectedScholar(scholar.id)}
                        className={cn(
                          "w-full p-6 rounded-2xl border-2 text-left transition-all flex items-center gap-6",
                          selectedScholar === scholar.id
                            ? "border-primary-700 bg-primary-700/5 shadow-lg"
                            : "border-border hover:border-primary-700/30",
                        )}
                      >
                        <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-primary-700 to-primary-800 flex items-center justify-center text-white text-2xl font-black">
                          {scholar.image}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-black text-xl mb-1">
                            {scholar.name}
                          </h3>
                          <p className="text-sm text-primary-700 font-black">
                            {scholar.title}
                          </p>
                          <p className="text-sm text-muted-foreground mt-1">
                            {scholar.specialty}
                          </p>
                        </div>
                        {selectedScholar === scholar.id && (
                          <CheckCircle2 className="w-6 h-6 text-primary-700" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 4: Schedule */}
              {step === 4 && (
                <div className="space-y-6">
                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-black mb-2">
                      Pick Your Preferred Time
                    </h2>
                    <p className="text-muted-foreground">
                      All times in West Africa Time (WAT)
                    </p>
                  </div>

                  <div className="space-y-6">
                    {/* Date Selection */}
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
                              "p-3 rounded-xl border-2 text-center transition-all",
                              selectedDate === date.toLocaleDateString()
                                ? "border-primary-700 bg-primary-700/5"
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

                    {/* Time Selection */}
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
                              "p-3 rounded-xl border-2 text-center transition-all",
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

                    {/* Notes */}
                    <div className="space-y-2">
                      <label className="text-sm font-black uppercase tracking-wider">
                        Additional Notes (Optional)
                      </label>
                      <textarea
                        name="notes"
                        value={formData.notes}
                        onChange={handleChange}
                        rows={3}
                        placeholder="Any specific questions or areas you'd like to focus on?"
                        className="w-full p-4 rounded-xl border-2 border-border focus:border-primary-700 outline-none transition-all resize-none"
                      />
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
                {step < 4 ? (
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
                        Schedule Assessment
                        <Calendar className="ml-2 w-4 h-4" />
                      </>
                    )}
                  </Button>
                )}
              </div>
            </form>
          </div>

          {/* Trust Indicators */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            {[
              { icon: Heart, label: "No Commitment", value: "Free Service" },
              { icon: Clock, label: "20-25 Minutes", value: "Session Length" },
              { icon: Users, label: "Ijazah-Certified", value: "Scholars" },
              { icon: Zap, label: "Zoom", value: "Online Session" },
            ].map((item, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-muted/20">
                <item.icon className="w-5 h-5 mx-auto mb-2 text-primary-700" />
                <p className="text-xs font-black">{item.label}</p>
                <p className="text-[10px] text-muted-foreground">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
