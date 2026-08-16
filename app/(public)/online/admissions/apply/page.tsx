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
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Loader2,
  Sparkles,
  Shield,
  Globe,
  AlertCircle,
  Languages,
  Clock,
  Building,
  DollarSign,
  AlertTriangle,
  UserPlus,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Program data
const PROGRAMS = {
  hifz: { name: "Hifz Al-Quran", duration: "2-3 years", format: "1-on-1", price: "$2.25/month" },
  tajweed: { name: "Tajweed Al-Itqan", duration: "6-12 months", format: "1-on-1", price: "$2+/month" },
  "group-tajweed": { name: "Group Tajweed", duration: "6-9 months", format: "Group (4-10)", price: "$6/month" },
  arabic: { name: "Al-Lughah Al-Arabiyyah", duration: "12-18 months", format: "1-on-1", price: "$2+/month" },
  tafsir: { name: "Tafsir Al-Mubin", duration: "12-18 months", format: "1-on-1", price: "$2+/month" },
  qiroah: { name: "Qiro'ah Program", duration: "6-12 months", format: "1-on-1", price: "$2+/month" },
  "group-qiroah": { name: "Group Qiro'ah", duration: "6-9 months", format: "Group (4-10)", price: "$6/month" },
  "juz-amma": { name: "Juz Amma", duration: "6-12 months", format: "Group", price: "$7/month" },
  "juz-tabarak": { name: "Juz Tabarak", duration: "8-12 months", format: "Group", price: "$8/month" },
  murojaah: { name: "Muroja'ah Program", duration: "Ongoing", format: "1-on-1", price: "$3/month" },
};

// Country list
const COUNTRIES = [
  "United States", "United Kingdom", "Canada", "Australia", "Nigeria",
  "South Africa", "Egypt", "Saudi Arabia", "UAE", "India", "Pakistan",
  "Malaysia", "Indonesia", "Turkey", "Morocco", "Other",
];

// How did you hear options
const HEAR_OPTIONS = [
  "Search Engine (Google/Bing)",
  "Social Media (Instagram/Facebook)",
  "YouTube",
  "Friend or Family",
  "Email Newsletter",
  "Advertisement",
  "Podcast",
  "Other",
];

// Languages
const LANGUAGES = [
  { value: "english", label: "English", fluency: "Native/Professional" },
  { value: "arabic", label: "Arabic", fluency: "Native/Professional" },
  { value: "urdu", label: "Urdu", fluency: "Fluent" },
  { value: "hindi", label: "Hindi", fluency: "Fluent" },
  { value: "bengali", label: "Bengali", fluency: "Fluent" },
  { value: "french", label: "French", fluency: "Fluent" },
  { value: "hausa", label: "Hausa", fluency: "Fluent" },
  { value: "yoruba", label: "Yoruba", fluency: "Fluent" },
];

// Time zones
const TIME_ZONES = [
  "America/New_York (EST)", "America/Chicago (CST)", "America/Denver (MST)",
  "America/Los_Angeles (PST)", "Europe/London (GMT)", "Europe/Paris (CET)",
  "Asia/Dubai (GST)", "Asia/Riyadh (AST)", "Asia/Karachi (PKT)",
  "Asia/Kolkata (IST)", "Asia/Jakarta (WIB)", "Australia/Sydney (AEST)",
  "Africa/Lagos (WAT)", "Africa/Cairo (EET)", "Africa/Johannesburg (SAST)",
];

// Formspree Endpoint
const FORMSPREE_ENDPOINT = "https://formspree.io/f/mykljjbl";

export default function ApplyPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const preSelectedProgram = searchParams.get("program") || "";

  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userTimeZone, setUserTimeZone] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    emergencyPhone: "",
    dateOfBirth: "",
    country: "",
    city: "",
    timeZone: "",
    programInterest: preSelectedProgram,
    currentLevel: "",
    previousStudy: "",
    previousInstitution: "",
    goals: "",
    isMinor: false,
    parentName: "",
    parentEmail: "",
    parentPhone: "",
    preferredLanguage: "english",
    howDidYouHear: "",
    referralCode: "",
    expectedStartDate: "",
    financialAidRequest: false,
    accessibilityNeeds: "",
    notes: "",
    agreeTerms: false,
    agreeContact: false,
  });

  // Auto-detect user's time zone
  useEffect(() => {
    const detectedTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const formattedTimeZone = TIME_ZONES.find(tz => tz.includes(detectedTimeZone.split('/')[1])) || TIME_ZONES[0];
    setUserTimeZone(formattedTimeZone);
    setFormData(prev => ({ ...prev, timeZone: formattedTimeZone }));
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData((prev) => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    validateField(name, formData[name as keyof typeof formData] as string);
  };

  const validateField = (name: string, value: string) => {
    let error = "";
    
    switch (name) {
      case "fullName":
        if (!value.trim()) error = "Full name is required";
        else if (value.length < 2) error = "Name must be at least 2 characters";
        break;
      case "email":
        if (!value.trim()) error = "Email is required";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = "Invalid email format";
        break;
      case "phone":
        if (!value.trim()) error = "Phone number is required";
        else if (!/^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,6}[-\s\.]?[0-9]{1,6}$/.test(value)) 
          error = "Invalid phone number";
        break;
      case "country":
        if (!value) error = "Country is required";
        break;
      case "currentLevel":
        if (!value) error = "Please select your current level";
        break;
      case "programInterest":
        if (!value) error = "Please select a program";
        break;
    }
    
    setErrors(prev => ({ ...prev, [name]: error }));
    return !error;
  };

  const validateStep = () => {
    const fieldsToValidate = step === 1 
      ? ["fullName", "email", "phone", "country"]
      : step === 2 
      ? ["currentLevel", "programInterest"]
      : [];
    
    let isValid = true;
    fieldsToValidate.forEach(field => {
      const value = formData[field as keyof typeof formData] as string;
      if (!validateField(field, value)) isValid = false;
    });
    
    if (step === 1 && formData.isMinor) {
      if (!formData.parentName) {
        toast.error("Parent/Guardian name is required for minors");
        isValid = false;
      }
      if (!formData.parentPhone) {
        toast.error("Parent/Guardian phone is required for minors");
        isValid = false;
      }
    }
    
    return isValid;
  };

  const canProceed = () => {
    if (step === 1) {
      const baseValid = formData.fullName && formData.email && formData.phone && formData.country && !errors.fullName && !errors.email && !errors.phone;
      if (formData.isMinor) {
        return baseValid && formData.parentName && formData.parentPhone;
      }
      return baseValid;
    }
    if (step === 2) {
      return formData.programInterest && formData.currentLevel;
    }
    return true;
  };

  const generateReferenceNumber = () => {
    return `ALM-${Date.now().toString().slice(-8)}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
  };

  const nextStep = () => {
    if (validateStep()) {
      setStep((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const prevStep = () => {
    setStep((prev) => prev - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.agreeTerms) {
      toast.error("Please agree to the Terms & Conditions");
      return;
    }
    
    setIsSubmitting(true);

    const referenceNumber = generateReferenceNumber();
    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== undefined && value !== false) {
        formDataToSend.append(key, value.toString());
      }
    });
    formDataToSend.append("referenceNumber", referenceNumber);
    formDataToSend.append("userTimeZone", userTimeZone);
    formDataToSend.append("submittedAt", new Date().toISOString());
    formDataToSend.append("_subject", `[Al-Maysaroh] New Application - ${formData.fullName}`);
    formDataToSend.append("_replyto", formData.email);

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: formDataToSend,
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        // Store submission data in sessionStorage for success page protection
        sessionStorage.setItem('applicationSubmitted', 'true');
        sessionStorage.setItem('applicationReference', referenceNumber);
        sessionStorage.setItem('applicationEmail', formData.email);
        sessionStorage.setItem('applicationName', formData.fullName);
        sessionStorage.setItem('applicationTimestamp', new Date().toISOString());
        
        toast.success("Application Submitted!", {
          description: "Our admissions team will review your application within 24 hours.",
          duration: 5000,
        });
        
        router.push("/admissions/success");
      } else {
        throw new Error("Submission failed");
      }
    } catch (error) {
      toast.error("Submission Failed", {
        description: "Please check your information and try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedProgramInfo = formData.programInterest
    ? PROGRAMS[formData.programInterest as keyof typeof PROGRAMS]
    : null;

  const today = new Date();
  const minDate = new Date(today.getFullYear() - 100, today.getMonth(), today.getDate()).toISOString().split('T')[0];
  const maxDate = new Date(today.getFullYear() - 5, today.getMonth(), today.getDate()).toISOString().split('T')[0];

  return (
    <main className="pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 md:pb-20 bg-background min-h-screen">
      <div className="container mx-auto px-3 xs:px-4 sm:px-6 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 text-[8px] sm:text-[10px] font-black uppercase tracking-wider mb-3 sm:mb-4">
            <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-500" />
            Admissions 2026 • Limited Slots Available
          </div>
          <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter font-heading mb-2 sm:mb-3 px-2">
            Application{" "}
            <span className="bg-linear-to-r from-purple-600 to-amber-600 bg-clip-text text-transparent italic">
              Form
            </span>
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground px-4">
            Complete the form below to begin your journey with Al-Maysaroh
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8 sm:mb-12">
          {[
            { step: 1, label: "Personal Info" },
            { step: 2, label: "Academic" },
            { step: 3, label: "Additional" },
          ].map((s) => (
            <div key={s.step} className="flex items-center">
              <div
                className={cn(
                  "w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-black text-xs sm:text-sm transition-all",
                  step >= s.step
                    ? "bg-linear-to-r from-purple-600 to-purple-700 text-white shadow-md"
                    : "bg-muted text-muted-foreground",
                )}
              >
                {step > s.step ? (
                  <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5" />
                ) : (
                  s.step
                )}
              </div>
              <span className="hidden sm:block text-[9px] font-black ml-1 text-muted-foreground">
                {s.label}
              </span>
              {s.step < 3 && (
                <div
                  className={cn(
                    "w-8 sm:w-12 md:w-16 h-0.5 mx-1 sm:mx-2",
                    step > s.step
                      ? "bg-linear-to-r from-purple-600 to-amber-500"
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

            <AnimatePresence mode="wait">
              {/* Step 1: Personal Information */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-5 sm:space-y-6"
                >
                  <h2 className="text-lg sm:text-xl font-black mb-3 sm:mb-4 bg-linear-to-r from-purple-600 to-amber-600 bg-clip-text text-transparent">
                    Personal Information
                  </h2>

                  <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
                    <div className="space-y-1.5 sm:space-y-2">
                      <Label className="text-[10px] sm:text-xs font-black uppercase tracking-wider">
                        Full Name <span className="text-red-500">*</span>
                      </Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-500" />
                        <Input
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          required
                          className={cn(
                            "pl-9 sm:pl-10 py-2 sm:py-2.5 text-sm",
                            errors.fullName && touched.fullName && "border-red-500 focus:border-red-500"
                          )}
                          placeholder="Enter your full name"
                        />
                      </div>
                      {errors.fullName && touched.fullName && (
                        <p className="text-[10px] text-red-500 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {errors.fullName}
                        </p>
                      )}
                    </div>

                    <div className="space-y-1.5 sm:space-y-2">
                      <Label className="text-[10px] sm:text-xs font-black uppercase tracking-wider">
                        Email <span className="text-red-500">*</span>
                      </Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-500" />
                        <Input
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          required
                          className={cn(
                            "pl-9 sm:pl-10 py-2 sm:py-2.5 text-sm",
                            errors.email && touched.email && "border-red-500 focus:border-red-500"
                          )}
                          placeholder="your@email.com"
                        />
                      </div>
                      {errors.email && touched.email && (
                        <p className="text-[10px] text-red-500 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {errors.email}
                        </p>
                      )}
                    </div>

                    <div className="space-y-1.5 sm:space-y-2">
                      <Label className="text-[10px] sm:text-xs font-black uppercase tracking-wider">
                        Phone <span className="text-red-500">*</span>
                      </Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-500" />
                        <Input
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          required
                          className={cn(
                            "pl-9 sm:pl-10 py-2 sm:py-2.5 text-sm",
                            errors.phone && touched.phone && "border-red-500 focus:border-red-500"
                          )}
                          placeholder="+123 456 7890"
                        />
                      </div>
                      {errors.phone && touched.phone && (
                        <p className="text-[10px] text-red-500 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {errors.phone}
                        </p>
                      )}
                    </div>

                    <div className="space-y-1.5 sm:space-y-2">
                      <Label className="text-[10px] sm:text-xs font-black uppercase tracking-wider">
                        Emergency Phone <span className="text-amber-500">(Optional)</span>
                      </Label>
                      <div className="relative">
                        <AlertTriangle className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-500" />
                        <Input
                          name="emergencyPhone"
                          value={formData.emergencyPhone}
                          onChange={handleChange}
                          className="pl-9 sm:pl-10 py-2 sm:py-2.5 text-sm"
                          placeholder="Emergency contact number"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5 sm:space-y-2">
                      <Label className="text-[10px] sm:text-xs font-black uppercase tracking-wider">
                        Date of Birth
                      </Label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-500" />
                        <Input
                          name="dateOfBirth"
                          type="date"
                          value={formData.dateOfBirth}
                          onChange={handleChange}
                          min={minDate}
                          max={maxDate}
                          className="pl-9 sm:pl-10 py-2 sm:py-2.5 text-sm"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5 sm:space-y-2">
                      <Label className="text-[10px] sm:text-xs font-black uppercase tracking-wider">
                        Country <span className="text-red-500">*</span>
                      </Label>
                      <div className="relative">
                        <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-500" />
                        <select
                          name="country"
                          value={formData.country}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          required
                          className={cn(
                            "w-full h-9 sm:h-10 pl-9 sm:pl-10 rounded-md border border-input bg-background px-3 py-1.5 sm:py-2 text-sm",
                            errors.country && touched.country && "border-red-500"
                          )}
                        >
                          <option value="">Select country</option>
                          {COUNTRIES.map((c) => (
                            <option key={c} value={c}>{c}</option>
                          ))}
                        </select>
                      </div>
                      {errors.country && touched.country && (
                        <p className="text-[10px] text-red-500 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {errors.country}
                        </p>
                      )}
                    </div>

                    <div className="space-y-1.5 sm:space-y-2">
                      <Label className="text-[10px] sm:text-xs font-black uppercase tracking-wider">
                        City
                      </Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-500" />
                        <Input
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          className="pl-9 sm:pl-10 py-2 sm:py-2.5 text-sm"
                          placeholder="Your city"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5 sm:space-y-2">
                      <Label className="text-[10px] sm:text-xs font-black uppercase tracking-wider">
                        Time Zone
                      </Label>
                      <div className="relative">
                        <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-500" />
                        <select
                          name="timeZone"
                          value={formData.timeZone}
                          onChange={handleChange}
                          className="w-full h-9 sm:h-10 pl-9 sm:pl-10 rounded-md border border-input bg-background px-3 py-1.5 sm:py-2 text-sm"
                        >
                          {TIME_ZONES.map((tz) => (
                            <option key={tz} value={tz}>{tz}</option>
                          ))}
                        </select>
                      </div>
                      <p className="text-[8px] text-muted-foreground">
                        Detected: {userTimeZone} • Used for scheduling
                      </p>
                    </div>

                    <div className="space-y-1.5 sm:space-y-2">
                      <div className="flex items-center gap-2 mt-2">
                        <input
                          type="checkbox"
                          id="isMinor"
                          name="isMinor"
                          checked={formData.isMinor}
                          onChange={handleChange}
                          className="w-4 h-4 rounded border-purple-300 text-purple-600 focus:ring-purple-500"
                        />
                        <Label htmlFor="isMinor" className="text-xs font-black cursor-pointer">
                          I am under 18 years old
                        </Label>
                      </div>
                    </div>

                    {formData.isMinor && (
                      <>
                        <div className="space-y-1.5 sm:space-y-2">
                          <Label className="text-[10px] sm:text-xs font-black uppercase tracking-wider">
                            Parent/Guardian Name <span className="text-red-500">*</span>
                          </Label>
                          <div className="relative">
                            <UserPlus className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-500" />
                            <Input
                              name="parentName"
                              value={formData.parentName}
                              onChange={handleChange}
                              className="pl-9 sm:pl-10 py-2 sm:py-2.5 text-sm"
                              placeholder="Parent/Guardian full name"
                            />
                          </div>
                        </div>

                        <div className="space-y-1.5 sm:space-y-2">
                          <Label className="text-[10px] sm:text-xs font-black uppercase tracking-wider">
                            Parent/Guardian Email
                          </Label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-500" />
                            <Input
                              name="parentEmail"
                              type="email"
                              value={formData.parentEmail}
                              onChange={handleChange}
                              className="pl-9 sm:pl-10 py-2 sm:py-2.5 text-sm"
                              placeholder="parent@email.com"
                            />
                          </div>
                        </div>

                        <div className="space-y-1.5 sm:space-y-2">
                          <Label className="text-[10px] sm:text-xs font-black uppercase tracking-wider">
                            Parent/Guardian Phone <span className="text-red-500">*</span>
                          </Label>
                          <div className="relative">
                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-500" />
                            <Input
                              name="parentPhone"
                              type="tel"
                              value={formData.parentPhone}
                              onChange={handleChange}
                              className="pl-9 sm:pl-10 py-2 sm:py-2.5 text-sm"
                              placeholder="Parent/Guardian phone"
                            />
                          </div>
                        </div>
                      </>
                    )}
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
                  className="space-y-5 sm:space-y-6"
                >
                  <h2 className="text-lg sm:text-xl font-black mb-3 sm:mb-4 bg-linear-to-r from-purple-600 to-amber-600 bg-clip-text text-transparent">
                    Academic Information
                  </h2>

                  <div className="space-y-4 sm:space-y-5">
                    <div className="space-y-1.5 sm:space-y-2">
                      <Label className="text-[10px] sm:text-xs font-black uppercase tracking-wider">
                        Program of Interest <span className="text-red-500">*</span>
                      </Label>
                      <select
                        name="programInterest"
                        value={formData.programInterest}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                        className={cn(
                          "w-full h-9 sm:h-10 rounded-md border border-input bg-background px-3 py-1.5 sm:py-2 text-sm",
                          errors.programInterest && touched.programInterest && "border-red-500"
                        )}
                      >
                        <option value="">Select a program</option>
                        <option value="hifz">Hifz Al-Quran (Full Memorization)</option>
                        <option value="tajweed">Tajweed Al-Itqan (Mastery)</option>
                        <option value="group-tajweed">Group Tajweed</option>
                        <option value="arabic">Al-Lughah Al-Arabiyyah</option>
                        <option value="tafsir">Tafsir Al-Mubin</option>
                        <option value="qiroah">{`Qiro'ah Program`}</option>
                        <option value="group-qiroah">{`Group Qiro'ah`}</option>
                        <option value="juz-amma">{`Juz Amma`}</option>
                        <option value="juz-tabarak">Juz Tabarak</option>
                        <option value="murojaah">{`Muroja'ah Program`}</option>
                        <option value="qiraat">{`Qira'at`}</option>

                      </select>
                      {errors.programInterest && touched.programInterest && (
                        <p className="text-[10px] text-red-500 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {errors.programInterest}
                        </p>
                      )}
                    </div>

                    {selectedProgramInfo && (
                      <div className="p-3 sm:p-4 rounded-lg bg-linear-to-r from-purple-50 to-amber-50 dark:from-purple-950/30 dark:to-amber-950/30 border border-purple-200 dark:border-purple-800">
                        <p className="text-xs sm:text-sm mb-1">
                          <span className="font-black text-purple-600">Program Details:</span>
                        </p>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div><span className="font-black">Name:</span> {selectedProgramInfo.name}</div>
                          <div><span className="font-black">Duration:</span> {selectedProgramInfo.duration}</div>
                          <div><span className="font-black">Format:</span> {selectedProgramInfo.format}</div>
                          <div><span className="font-black">Price:</span> {selectedProgramInfo.price}</div>
                        </div>
                      </div>
                    )}

                    <div className="space-y-1.5 sm:space-y-2">
                      <Label className="text-[10px] sm:text-xs font-black uppercase tracking-wider">
                        Current Level <span className="text-red-500">*</span>
                      </Label>
                      <select
                        name="currentLevel"
                        value={formData.currentLevel}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                        className={cn(
                          "w-full h-9 sm:h-10 rounded-md border border-input bg-background px-3 py-1.5 sm:py-2 text-sm",
                          errors.currentLevel && touched.currentLevel && "border-red-500"
                        )}
                      >
                        <option value="">Select your level</option>
                        <option value="beginner">Beginner - Cannot read Arabic</option>
                        <option value="some">Some Knowledge - Can read slowly</option>
                        <option value="intermediate">Intermediate - Can read fluently</option>
                        <option value="advanced">Advanced - Some memorization</option>
                        <option value="master">Master - Complete Quran / Ijazah candidate</option>
                      </select>
                      {errors.currentLevel && touched.currentLevel && (
                        <p className="text-[10px] text-red-500 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {errors.currentLevel}
                        </p>
                      )}
                    </div>

                    <div className="space-y-1.5 sm:space-y-2">
                      <Label className="text-[10px] sm:text-xs font-black uppercase tracking-wider">
                        Previous Institution
                      </Label>
                      <div className="relative">
                        <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-500" />
                        <Input
                          name="previousInstitution"
                          value={formData.previousInstitution}
                          onChange={handleChange}
                          className="pl-9 sm:pl-10 py-2 sm:py-2.5 text-sm"
                          placeholder="Previous Quran institution (if any)"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5 sm:space-y-2">
                      <Label className="text-[10px] sm:text-xs font-black uppercase tracking-wider">
                        Preferred Language
                      </Label>
                      <div className="relative">
                        <Languages className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-500" />
                        <select
                          name="preferredLanguage"
                          value={formData.preferredLanguage}
                          onChange={handleChange}
                          className="w-full h-9 sm:h-10 pl-9 sm:pl-10 rounded-md border border-input bg-background px-3 py-1.5 sm:py-2 text-sm"
                        >
                          {LANGUAGES.map((lang) => (
                            <option key={lang.value} value={lang.value}>
                              {lang.label} ({lang.fluency})
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="space-y-1.5 sm:space-y-2">
                      <Label className="text-[10px] sm:text-xs font-black uppercase tracking-wider">
                        Expected Start Date
                      </Label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-500" />
                        <Input
                          name="expectedStartDate"
                          type="date"
                          value={formData.expectedStartDate}
                          onChange={handleChange}
                          min={new Date().toISOString().split('T')[0]}
                          className="pl-9 sm:pl-10 py-2 sm:py-2.5 text-sm"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5 sm:space-y-2">
                      <Label className="text-[10px] sm:text-xs font-black uppercase tracking-wider">
                        Previous Study
                      </Label>
                      <textarea
                        name="previousStudy"
                        value={formData.previousStudy}
                        onChange={handleChange}
                        rows={2}
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        placeholder="Describe any previous Quran study experience..."
                      />
                    </div>

                    <div className="space-y-1.5 sm:space-y-2">
                      <Label className="text-[10px] sm:text-xs font-black uppercase tracking-wider">
                        Your Goals
                      </Label>
                      <textarea
                        name="goals"
                        value={formData.goals}
                        onChange={handleChange}
                        rows={2}
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        placeholder="What are your goals for studying with us?"
                      />
                    </div>

                    <div className="space-y-1.5 sm:space-y-2">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id="financialAidRequest"
                          name="financialAidRequest"
                          checked={formData.financialAidRequest}
                          onChange={handleChange}
                          className="w-4 h-4 rounded border-purple-300 text-purple-600 focus:ring-purple-500"
                        />
                        <Label htmlFor="financialAidRequest" className="text-xs font-black cursor-pointer flex items-center gap-2">
                          <DollarSign className="w-3.5 h-3.5 text-amber-500" />
                          I would like to inquire about financial aid
                        </Label>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Additional Information */}
              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-5 sm:space-y-6"
                >
                  <h2 className="text-lg sm:text-xl font-black mb-3 sm:mb-4 bg-linear-to-r from-purple-600 to-amber-600 bg-clip-text text-transparent">
                    Additional Information
                  </h2>

                  <div className="space-y-4 sm:space-y-5">
                    <div className="space-y-1.5 sm:space-y-2">
                      <Label className="text-[10px] sm:text-xs font-black uppercase tracking-wider">
                        How did you hear about us?
                      </Label>
                      <select
                        name="howDidYouHear"
                        value={formData.howDidYouHear}
                        onChange={handleChange}
                        className="w-full h-9 sm:h-10 rounded-md border border-input bg-background px-3 py-1.5 sm:py-2 text-sm"
                      >
                        <option value="">Select an option</option>
                        {HEAR_OPTIONS.map((o) => (
                          <option key={o} value={o}>{o}</option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-1.5 sm:space-y-2">
                      <Label className="text-[10px] sm:text-xs font-black uppercase tracking-wider">
                        Referral Code
                      </Label>
                      <Input
                        name="referralCode"
                        value={formData.referralCode}
                        onChange={handleChange}
                        className="py-2 sm:py-2.5 text-sm"
                        placeholder="Enter referral code if any"
                      />
                    </div>

                    <div className="space-y-1.5 sm:space-y-2">
                      <Label className="text-[10px] sm:text-xs font-black uppercase tracking-wider">
                        Accessibility Needs
                      </Label>
                      <textarea
                        name="accessibilityNeeds"
                        value={formData.accessibilityNeeds}
                        onChange={handleChange}
                        rows={2}
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        placeholder="Any accessibility requirements we should know about?"
                      />
                    </div>

                    <div className="space-y-1.5 sm:space-y-2">
                      <Label className="text-[10px] sm:text-xs font-black uppercase tracking-wider">
                        Additional Notes
                      </Label>
                      <textarea
                        name="notes"
                        value={formData.notes}
                        onChange={handleChange}
                        rows={2}
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        placeholder="Any additional information you'd like to share..."
                      />
                    </div>

                    <div className="space-y-3 sm:space-y-4 pt-2 sm:pt-4">
                      <div className="flex items-start gap-2 sm:gap-3">
                        <Checkbox
                          id="agreeTerms"
                          checked={formData.agreeTerms}
                          onCheckedChange={(checked) =>
                            setFormData(prev => ({ ...prev, agreeTerms: checked as boolean }))
                          }
                          className="mt-0.5 border-purple-300 data-[state=checked]:bg-purple-600"
                        />
                        <Label htmlFor="agreeTerms" className="text-xs sm:text-sm font-medium cursor-pointer leading-relaxed">
                          I agree to the{" "}
                          <Link href="/legal" className="text-purple-600 font-black hover:underline">
                            Terms & Conditions
                          </Link>{" "}
                          and{" "}
                          <Link href="/privacy" className="text-purple-600 font-black hover:underline">
                            Privacy Policy
                          </Link>{" "}
                          <span className="text-red-500">*</span>
                        </Label>
                      </div>

                      <div className="flex items-start gap-2 sm:gap-3">
                        <Checkbox
                          id="agreeContact"
                          checked={formData.agreeContact}
                          onCheckedChange={(checked) =>
                            setFormData(prev => ({ ...prev, agreeContact: checked as boolean }))
                          }
                          className="mt-0.5 border-purple-300 data-[state=checked]:bg-purple-600"
                        />
                        <Label htmlFor="agreeContact" className="text-xs sm:text-sm font-medium cursor-pointer leading-relaxed">
                          I agree to receive communications about my application via email and SMS
                        </Label>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex flex-col xs:flex-row justify-between gap-3 sm:gap-4 mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-border/50">
              {step > 1 && (
                <Button
                  type="button"
                  onClick={prevStep}
                  variant="outline"
                  className="rounded-full px-5 sm:px-6 py-2.5 sm:py-3 font-black text-sm border-purple-300 text-purple-600 hover:bg-purple-50 order-2 xs:order-1"
                >
                  <ChevronLeft className="w-3.5 h-3.5 mr-1" />
                  Back
                </Button>
              )}
              {step < 3 ? (
                <Button
                  type="button"
                  onClick={nextStep}
                  disabled={!canProceed()}
                  className={cn(
                    "rounded-full px-5 sm:px-6 py-2.5 sm:py-3 font-black text-sm bg-linear-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white order-1 xs:order-2",
                    !canProceed() && "opacity-50 cursor-not-allowed",
                    step === 1 && "ml-auto"
                  )}
                >
                  Continue
                  <ChevronRight className="w-3.5 h-3.5 ml-1" />
                </Button>
              ) : (
                <Button
                  type="submit"
                  disabled={!formData.agreeTerms || isSubmitting}
                  className="rounded-full px-6 sm:px-8 py-2.5 sm:py-3 font-black text-sm bg-linear-to-r from-purple-600 to-amber-600 hover:from-purple-700 hover:to-amber-700 text-white order-1 xs:order-2 ml-auto"
                >
                  {isSubmitting ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      Submit Application
                      <CheckCircle2 className="w-3.5 h-3.5 ml-1" />
                    </>
                  )}
                </Button>
              )}
            </div>
          </form>
        </div>

        <p className="text-center text-[10px] sm:text-xs text-muted-foreground mt-6 sm:mt-8">
          <Shield className="w-3 h-3 inline mr-1" />
          Your information is secure and encrypted. We never share your data.
        </p>
      </div>
    </main>
  );
}