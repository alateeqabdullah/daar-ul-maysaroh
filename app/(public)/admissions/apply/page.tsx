// app/admissions/apply/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Loader2,
  Sparkles,
  Shield,
  GraduationCap,
  Heart,
  FileText,
  CreditCard,
  Users,
  Globe,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Program data
const PROGRAMS = {
  hifz: { name: "Hifz Al-Quran", duration: "2-3 years", format: "1-on-1" },
  tajweed: {
    name: "Tajweed Al-Itqan",
    duration: "6-12 months",
    format: "1-on-1",
  },
  "group-tajweed": {
    name: "Group Tajweed",
    duration: "6-9 months",
    format: "Group (4-6)",
  },
  arabic: {
    name: "Al-Lughah Al-Arabiyyah",
    duration: "12-18 months",
    format: "1-on-1",
  },
  tafsir: {
    name: "Tafsir Al-Mubin",
    duration: "12-18 months",
    format: "1-on-1",
  },
  qiroah: {
    name: "Qiro'ah Program",
    duration: "6-12 months",
    format: "1-on-1",
  },
  "group-qiroah": {
    name: "Group Qiro'ah",
    duration: "6-9 months",
    format: "Group (4-6)",
  },
  "juz-amma": { name: "Juz Amma", duration: "6-12 months", format: "Group" },
  "juz-tabarak": {
    name: "Juz Tabarak",
    duration: "8-12 months",
    format: "Group",
  },
  murojaah: {
    name: "Muroja'ah Program",
    duration: "Ongoing",
    format: "1-on-1",
  },
};

// Country list
const COUNTRIES = [
  "United States",
  "United Kingdom",
  "Canada",
  "Australia",
  "Nigeria",
  "South Africa",
  "Egypt",
  "Saudi Arabia",
  "UAE",
  "India",
  "Pakistan",
  "Malaysia",
  "Indonesia",
  "Turkey",
  "Morocco",
  "Other",
];

// How did you hear options
const HEAR_OPTIONS = [
  "Search Engine",
  "Social Media",
  "Friend/Family",
  "Email",
  "Advertisement",
  "Other",
];

// Your Formspree Endpoint - REPLACE WITH YOUR ACTUAL ENDPOINT
const FORMSPREE_ENDPOINT = "https://formspree.io/f/mykljjbl";

export default function ApplyPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const preSelectedProgram = searchParams.get("program") || "";

  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    // Personal Information
    fullName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    country: "",
    city: "",

    // Academic Information
    programInterest: preSelectedProgram,
    currentLevel: "",
    previousStudy: "",
    goals: "",

    // Additional Information
    howDidYouHear: "",
    referralCode: "",
    notes: "",

    // Consent
    agreeTerms: false,
    agreeContact: false,
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const nextStep = () => {
    setStep((prev) => prev + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const prevStep = () => {
    setStep((prev) => prev - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value) formDataToSend.append(key, value.toString());
    });
    formDataToSend.append(
      "_subject",
      `[Al-Maysaroh] New Application - ${formData.fullName}`,
    );
    formDataToSend.append("_replyto", formData.email);

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: formDataToSend,
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        toast.success("Application Submitted!", {
          description:
            "Our admissions team will review your application within 24 hours.",
          duration: 5000,
        });
        router.push("/admissions/success");
      } else {
        const data = await response.json();
        toast.error("Submission Failed", {
          description:
            data.errors?.[0] || "Please check your information and try again.",
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

  const canProceed = () => {
    if (step === 1) {
      return (
        formData.fullName &&
        formData.email &&
        formData.phone &&
        formData.country
      );
    }
    if (step === 2) {
      return formData.programInterest && formData.currentLevel;
    }
    return true;
  };

  const selectedProgramInfo = formData.programInterest
    ? PROGRAMS[formData.programInterest as keyof typeof PROGRAMS]
    : null;

  return (
    <main className="pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 md:pb-20 bg-background min-h-screen">
      <div className="container mx-auto px-3 xs:px-4 sm:px-6 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 text-[8px] sm:text-[10px] font-black uppercase tracking-wider mb-3 sm:mb-4">
            <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-500" />
            Admissions 2026
          </div>
          <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter font-heading mb-2 sm:mb-3 px-2">
            Application{" "}
            <span className="bg-gradient-to-r from-purple-600 to-amber-600 bg-clip-text text-transparent italic">
              Form
            </span>
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground px-4">
            Complete the form below to begin your journey with Al-Maysaroh
          </p>
        </div>

        {/* Progress Steps - Mobile Responsive */}
        <div className="flex items-center justify-center mb-8 sm:mb-12">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center">
              <div
                className={cn(
                  "w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-black text-xs sm:text-sm transition-all",
                  step >= s
                    ? "bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-md"
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
                    "w-8 sm:w-12 md:w-16 h-0.5 mx-1 sm:mx-2",
                    step > s
                      ? "bg-gradient-to-r from-purple-600 to-amber-500"
                      : "bg-muted",
                  )}
                />
              )}
            </div>
          ))}
        </div>

        {/* Form Card */}
        <div className="bg-card rounded-xl sm:rounded-2xl border border-border hover:border-purple-300 transition-all p-5 sm:p-6 md:p-8 lg:p-10 shadow-lg">
          <form onSubmit={handleSubmit}>
            <input type="text" name="_gotcha" style={{ display: "none" }} />

            {/* Step 1: Personal Information */}
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-5 sm:space-y-6"
              >
                <h2 className="text-lg sm:text-xl font-black mb-3 sm:mb-4 bg-gradient-to-r from-purple-600 to-amber-600 bg-clip-text text-transparent">
                  Personal Information
                </h2>

                <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
                  <div className="space-y-1.5 sm:space-y-2">
                    <Label
                      htmlFor="fullName"
                      className="text-[10px] sm:text-xs font-black uppercase tracking-wider"
                    >
                      Full Name *
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-500" />
                      <Input
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                        className="pl-9 sm:pl-10 py-2 sm:py-2.5 text-sm"
                        placeholder="Enter your full name"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5 sm:space-y-2">
                    <Label
                      htmlFor="email"
                      className="text-[10px] sm:text-xs font-black uppercase tracking-wider"
                    >
                      Email Address *
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-500" />
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="pl-9 sm:pl-10 py-2 sm:py-2.5 text-sm"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5 sm:space-y-2">
                    <Label
                      htmlFor="phone"
                      className="text-[10px] sm:text-xs font-black uppercase tracking-wider"
                    >
                      Phone Number *
                    </Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-500" />
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="pl-9 sm:pl-10 py-2 sm:py-2.5 text-sm"
                        placeholder="+123 456 7890"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5 sm:space-y-2">
                    <Label
                      htmlFor="dateOfBirth"
                      className="text-[10px] sm:text-xs font-black uppercase tracking-wider"
                    >
                      Date of Birth
                    </Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-500" />
                      <Input
                        id="dateOfBirth"
                        name="dateOfBirth"
                        type="date"
                        value={formData.dateOfBirth}
                        onChange={handleChange}
                        className="pl-9 sm:pl-10 py-2 sm:py-2.5 text-sm"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5 sm:space-y-2">
                    <Label
                      htmlFor="country"
                      className="text-[10px] sm:text-xs font-black uppercase tracking-wider"
                    >
                      Country *
                    </Label>
                    <div className="relative">
                      <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-500" />
                      <select
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        required
                        className="w-full h-9 sm:h-10 pl-9 sm:pl-10 rounded-md border border-input bg-background px-3 py-1.5 sm:py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2"
                      >
                        <option value="">Select country</option>
                        {COUNTRIES.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5 sm:space-y-2">
                    <Label
                      htmlFor="city"
                      className="text-[10px] sm:text-xs font-black uppercase tracking-wider"
                    >
                      City
                    </Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-500" />
                      <Input
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className="pl-9 sm:pl-10 py-2 sm:py-2.5 text-sm"
                        placeholder="Your city"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 2: Academic Information */}
            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-5 sm:space-y-6"
              >
                <h2 className="text-lg sm:text-xl font-black mb-3 sm:mb-4 bg-gradient-to-r from-purple-600 to-amber-600 bg-clip-text text-transparent">
                  Academic Information
                </h2>

                <div className="space-y-4 sm:space-y-5">
                  <div className="space-y-1.5 sm:space-y-2">
                    <Label
                      htmlFor="programInterest"
                      className="text-[10px] sm:text-xs font-black uppercase tracking-wider"
                    >
                      Program of Interest *
                    </Label>
                    <select
                      id="programInterest"
                      name="programInterest"
                      value={formData.programInterest}
                      onChange={handleChange}
                      required
                      className="w-full h-9 sm:h-10 rounded-md border border-input bg-background px-3 py-1.5 sm:py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2"
                    >
                      <option value="">Select a program</option>
                      <option value="hifz">Hifz Al-Quran</option>
                      <option value="tajweed">Tajweed Al-Itqan</option>
                      <option value="group-tajweed">Group Tajweed</option>
                      <option value="arabic">Al-Lughah Al-Arabiyyah</option>
                      <option value="tafsir">Tafsir Al-Mubin</option>
                      <option value="qiroah">Qiro'ah Program</option>
                      <option value="group-qiroah">Group Qiro'ah</option>
                      <option value="juz-amma">Juz Amma</option>
                      <option value="juz-tabarak">Juz Tabarak</option>
                      <option value="murojaah">Muroja'ah Program</option>
                    </select>
                  </div>

                  {selectedProgramInfo && (
                    <div className="p-3 sm:p-4 rounded-lg bg-gradient-to-r from-purple-50 to-amber-50 dark:from-purple-950/30 dark:to-amber-950/30 border border-purple-200 dark:border-purple-800">
                      <p className="text-xs sm:text-sm">
                        <span className="font-black text-purple-600">
                          Program Details:
                        </span>{" "}
                        <span className="text-foreground">
                          {selectedProgramInfo.name}
                        </span>{" "}
                        <span className="text-amber-600">•</span>{" "}
                        <span className="text-foreground">
                          {selectedProgramInfo.duration}
                        </span>{" "}
                        <span className="text-amber-600">•</span>{" "}
                        <span className="text-foreground">
                          {selectedProgramInfo.format}
                        </span>
                      </p>
                    </div>
                  )}

                  <div className="space-y-1.5 sm:space-y-2">
                    <Label
                      htmlFor="currentLevel"
                      className="text-[10px] sm:text-xs font-black uppercase tracking-wider"
                    >
                      Current Quran Reading Level *
                    </Label>
                    <select
                      id="currentLevel"
                      name="currentLevel"
                      value={formData.currentLevel}
                      onChange={handleChange}
                      required
                      className="w-full h-9 sm:h-10 rounded-md border border-input bg-background px-3 py-1.5 sm:py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2"
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

                  <div className="space-y-1.5 sm:space-y-2">
                    <Label
                      htmlFor="previousStudy"
                      className="text-[10px] sm:text-xs font-black uppercase tracking-wider"
                    >
                      Previous Quran Study
                    </Label>
                    <textarea
                      id="previousStudy"
                      name="previousStudy"
                      value={formData.previousStudy}
                      onChange={handleChange}
                      rows={3}
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2"
                      placeholder="Describe any previous Quran study experience..."
                    />
                  </div>

                  <div className="space-y-1.5 sm:space-y-2">
                    <Label
                      htmlFor="goals"
                      className="text-[10px] sm:text-xs font-black uppercase tracking-wider"
                    >
                      Your Goals
                    </Label>
                    <textarea
                      id="goals"
                      name="goals"
                      value={formData.goals}
                      onChange={handleChange}
                      rows={3}
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2"
                      placeholder="What are your goals for studying with us?"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 3: Additional Information & Consent */}
            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-5 sm:space-y-6"
              >
                <h2 className="text-lg sm:text-xl font-black mb-3 sm:mb-4 bg-gradient-to-r from-purple-600 to-amber-600 bg-clip-text text-transparent">
                  Additional Information
                </h2>

                <div className="space-y-4 sm:space-y-5">
                  <div className="space-y-1.5 sm:space-y-2">
                    <Label
                      htmlFor="howDidYouHear"
                      className="text-[10px] sm:text-xs font-black uppercase tracking-wider"
                    >
                      How did you hear about us?
                    </Label>
                    <select
                      id="howDidYouHear"
                      name="howDidYouHear"
                      value={formData.howDidYouHear}
                      onChange={handleChange}
                      className="w-full h-9 sm:h-10 rounded-md border border-input bg-background px-3 py-1.5 sm:py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2"
                    >
                      <option value="">Select an option</option>
                      {HEAR_OPTIONS.map((o) => (
                        <option key={o} value={o}>
                          {o}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5 sm:space-y-2">
                    <Label
                      htmlFor="referralCode"
                      className="text-[10px] sm:text-xs font-black uppercase tracking-wider"
                    >
                      Referral Code (if any)
                    </Label>
                    <Input
                      id="referralCode"
                      name="referralCode"
                      value={formData.referralCode}
                      onChange={handleChange}
                      className="py-2 sm:py-2.5 text-sm"
                      placeholder="Enter referral code"
                    />
                  </div>

                  <div className="space-y-1.5 sm:space-y-2">
                    <Label
                      htmlFor="notes"
                      className="text-[10px] sm:text-xs font-black uppercase tracking-wider"
                    >
                      Additional Notes
                    </Label>
                    <textarea
                      id="notes"
                      name="notes"
                      value={formData.notes}
                      onChange={handleChange}
                      rows={3}
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2"
                      placeholder="Any additional information you'd like to share..."
                    />
                  </div>

                  <div className="space-y-3 sm:space-y-4 pt-2 sm:pt-4">
                    <div className="flex items-start gap-2 sm:gap-3">
                      <Checkbox
                        id="agreeTerms"
                        checked={formData.agreeTerms}
                        onCheckedChange={(checked) =>
                          handleCheckboxChange("agreeTerms", checked as boolean)
                        }
                        className="mt-0.5 border-purple-300 data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
                      />
                      <Label
                        htmlFor="agreeTerms"
                        className="text-xs sm:text-sm font-medium cursor-pointer leading-relaxed"
                      >
                        I agree to the{" "}
                        <Link
                          href="/legal"
                          className="text-purple-600 font-black hover:underline"
                        >
                          Terms & Conditions
                        </Link>{" "}
                        and{" "}
                        <Link
                          href="/privacy"
                          className="text-purple-600 font-black hover:underline"
                        >
                          Privacy Policy
                        </Link>{" "}
                        *
                      </Label>
                    </div>

                    <div className="flex items-start gap-2 sm:gap-3">
                      <Checkbox
                        id="agreeContact"
                        checked={formData.agreeContact}
                        onCheckedChange={(checked) =>
                          handleCheckboxChange(
                            "agreeContact",
                            checked as boolean,
                          )
                        }
                        className="mt-0.5 border-purple-300 data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
                      />
                      <Label
                        htmlFor="agreeContact"
                        className="text-xs sm:text-sm font-medium cursor-pointer leading-relaxed"
                      >
                        I agree to receive communications about my application
                        via email and SMS
                      </Label>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Navigation Buttons */}
            <div className="flex flex-col xs:flex-row justify-between gap-3 sm:gap-4 mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-border/50">
              {step > 1 && (
                <Button
                  type="button"
                  onClick={prevStep}
                  variant="outline"
                  className="rounded-full px-5 sm:px-6 py-2.5 sm:py-3 font-black text-sm border-purple-300 text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-950/20 order-2 xs:order-1"
                >
                  <ChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                  Back
                </Button>
              )}
              {step < 3 ? (
                <Button
                  type="button"
                  onClick={nextStep}
                  disabled={!canProceed()}
                  className={cn(
                    "rounded-full px-5 sm:px-6 py-2.5 sm:py-3 font-black text-sm bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white order-1 xs:order-2",
                    !canProceed() && "opacity-50 cursor-not-allowed",
                  )}
                >
                  Continue
                  <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-1 sm:ml-2" />
                </Button>
              ) : (
                <Button
                  type="submit"
                  disabled={!formData.agreeTerms || isSubmitting}
                  className="rounded-full px-6 sm:px-8 py-2.5 sm:py-3 font-black text-sm bg-gradient-to-r from-purple-600 to-amber-600 hover:from-purple-700 hover:to-amber-700 text-white order-1 xs:order-2 ml-auto"
                >
                  {isSubmitting ? (
                    <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                  ) : (
                    <>
                      Submit Application
                      <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-1 sm:ml-2" />
                    </>
                  )}
                </Button>
              )}
            </div>
          </form>
        </div>

        {/* Help Text */}
        <p className="text-center text-[10px] sm:text-xs text-muted-foreground mt-6 sm:mt-8">
          <Shield className="w-3 h-3 inline mr-1" />
          Your information is secure and encrypted. We never share your data.
        </p>
      </div>
    </main>
  );
}
