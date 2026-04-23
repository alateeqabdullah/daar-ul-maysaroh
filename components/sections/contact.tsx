"use client";

import { useState, useEffect, useRef } from "react";
import { Reveal } from "@/components/shared/section-animation";
import {
  Globe,
  Send,
  ShieldCheck,
  Loader2,
  Mail,
  Phone,
  CheckCircle2,
  Sparkles,
  Clock,
  MessageCircle,
  MapPin,
  Users,
  Award,
  Copy,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [characterCount, setCharacterCount] = useState(0);

  const formRef = useRef<HTMLFormElement>(null);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    academicInterest: "",
    message: "",
    preferredContact: "email",
    newsletterOptIn: false,
  });

  // Character count for message
  useEffect(() => {
    setCharacterCount(formData.message.length);
  }, [formData.message]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleBlur = (
    e: React.FocusEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    validateField(name, value);
  };

  const validateField = (name: string, value: string) => {
    let error = "";

    switch (name) {
      case "fullName":
        if (!value.trim()) error = "Full name is required";
        else if (value.length < 2) error = "Name must be at least 2 characters";
        else if (value.length > 50)
          error = "Name must be less than 50 characters";
        break;
      case "email":
        if (!value.trim()) error = "Email is required";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          error = "Invalid email format";
        break;
      case "phone":
        if (
          value &&
          !/^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,6}[-\s\.]?[0-9]{1,6}$/.test(
            value,
          )
        )
          error = "Invalid phone number";
        break;
      case "academicInterest":
        if (!value) error = "Please select a program";
        break;
      case "message":
        if (!value.trim()) error = "Message is required";
        else if (value.length < 10)
          error = "Message must be at least 10 characters";
        else if (value.length > 1000)
          error = "Message must be less than 1000 characters";
        break;
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
    return !error;
  };

  const validateForm = () => {
    const fields = ["fullName", "email", "academicInterest", "message"];
    let isValid = true;

    fields.forEach((field) => {
      const value = formData[field as keyof typeof formData] as string;
      if (!validateField(field, value)) isValid = false;
    });

    if (formData.phone && !validateField("phone", formData.phone))
      isValid = false;

    return isValid;
  };

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the errors before submitting");
      // Scroll to first error
      const firstError = document.querySelector(".error-message");
      if (firstError)
        firstError.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    setIsSubmitting(true);

    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== undefined && value !== false) {
        formDataToSend.append(key, value.toString());
      }
    });
    formDataToSend.append(
      "_subject",
      `[Al-Maysaroh] Inquiry from ${formData.fullName}`,
    );
    formDataToSend.append("_replyto", formData.email);

    const endpoint = "https://formspree.io/f/xgondqpk";

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        body: formDataToSend,
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        setIsSuccess(true);
        toast.success("Inquiry Sent!", {
          description: "Our admissions council will respond within 24 hours.",
          duration: 5000,
        });

        setFormData({
          fullName: "",
          email: "",
          phone: "",
          academicInterest: "",
          message: "",
          preferredContact: "email",
          newsletterOptIn: false,
        });
        setTouched({});
        setCharacterCount(0);

        setTimeout(() => {
          setIsSuccess(false);
        }, 5000);
      } else {
        const data = await response.json();
        toast.error("Submission Failed", {
          description:
            data.errors?.[0] || "Please check your information and try again.",
        });
      }
    } catch (error) {
      toast.error("Network Error", {
        description:
          "Unable to connect. Please check your internet connection.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactMethods = [
    {
      icon: Mail,
      label: "Email",
      value: "info.almaysaroh@gmail.com",
      href: "mailto:info.almaysaroh@gmail.com",
      color: "purple",
      description: "Response within 24 hours",
      copyable: true,
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+234 911 016 3930",
      href: "tel:+2349110163930",
      color: "amber",
      description: "Mon-Fri, 9AM - 6PM WAT",
      copyable: true,
    },
    {
      icon: MessageCircle,
      label: "WhatsApp",
      value: "+234 911 016 3930",
      href: "https://wa.me/2349110163930",
      color: "emerald",
      description: "Fastest response",
      copyable: true,
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Global (Online)",
      href: "#",
      color: "purple",
      description: "Worldwide access",
      copyable: false,
    },
  ];

  const stats = [
    {
      label: "Active Students",
      value: "500+",
      icon: Users,
      trend: "+12% this year",
    },
    { label: "Countries", value: "15+", icon: Globe, trend: "Growing monthly" },
    {
      label: "Success Rate",
      value: "94%",
      icon: Award,
      trend: "Student satisfaction",
    },
    {
      label: "Avg Response",
      value: "<4 hrs",
      icon: Clock,
      trend: "During business hours",
    },
  ];

  return (
    <section className="py-12 xs:py-16 sm:py-20 md:py-24 lg:py-32 bg-linear-to-b from-background via-purple-50/5 to-amber-50/5 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/3 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 xs:px-5 sm:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 xs:gap-10 sm:gap-12 lg:gap-16 xl:gap-20">
          {/* LEFT COLUMN - Enhanced Information */}
          <div className="space-y-6 xs:space-y-8 sm:space-y-10 md:space-y-12">
            <Reveal>
              <div className="space-y-3 xs:space-y-4 sm:space-y-5 md:space-y-6">
                <div className="inline-flex items-center gap-1.5 xs:gap-2 px-2.5 xs:px-3 py-1 xs:py-1.5 rounded-full bg-purple-100 dark:bg-purple-950/40 text-purple-700 text-[8px] xs:text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] border border-purple-200 dark:border-purple-800">
                  <Sparkles className="w-3 h-3 xs:w-3.5 xs:h-3.5" />
                  Global Admissions Office
                </div>
                <h2 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tighter font-heading leading-[1.1]">
                  Begin Your <br />
                  <span className="bg-linear-to-r from-purple-600 to-amber-600 bg-clip-text text-transparent italic">
                    Sanad.
                  </span>
                </h2>
                <p className="text-sm xs:text-base sm:text-lg md:text-xl text-muted-foreground font-light leading-relaxed max-w-md">
                  Inquire about scholarly assignments, academic grants, or
                  international bank transfer activations. Our council is ready
                  to guide you.
                </p>
              </div>
            </Reveal>

            {/* Enhanced Contact Methods Grid */}
            <div className="grid xs:grid-cols-2 gap-3 xs:gap-4 sm:gap-5 md:gap-6">
              {contactMethods.map((method, index) => {
                const Icon = method.icon;
                const isCopied = copiedField === method.label;

                return (
                  <Reveal key={method.label} delay={0.1 + index * 0.1}>
                    <div className="group relative">
                      <div className="absolute -inset-0.5 bg-linear-to-r from-purple-600/20 to-amber-500/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition duration-500" />
                      <div
                        className={cn(
                          "relative p-4 xs:p-5 sm:p-6 rounded-xl border-2 transition-all group bg-card hover:shadow-xl",
                          method.color === "purple"
                            ? "hover:border-purple-400 dark:hover:border-purple-600"
                            : method.color === "amber"
                              ? "hover:border-amber-400 dark:hover:border-amber-500"
                              : "hover:border-emerald-400 dark:hover:border-emerald-500",
                        )}
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <Icon
                              className={cn(
                                "w-5 h-5 xs:w-6 xs:h-6 mb-2 xs:mb-3 transition-transform group-hover:scale-110",
                                method.color === "purple"
                                  ? "text-purple-600"
                                  : method.color === "amber"
                                    ? "text-amber-500"
                                    : "text-emerald-500",
                              )}
                            />
                            <h4 className="font-black uppercase text-[9px] xs:text-[10px] tracking-wider mb-0.5">
                              {method.label}
                            </h4>
                            <p className="text-[10px] xs:text-xs font-medium text-foreground">
                              {method.value}
                            </p>
                            <p className="text-[8px] xs:text-[9px] text-muted-foreground mt-0.5">
                              {method.description}
                            </p>
                          </div>
                          {method.copyable && (
                            <button
                              onClick={() =>
                                copyToClipboard(method.value, method.label)
                              }
                              className="p-1.5 rounded-lg hover:bg-muted/50 transition-colors"
                            >
                              {isCopied ? (
                                <Check className="w-3.5 h-3.5 text-green-500" />
                              ) : (
                                <Copy className="w-3.5 h-3.5 text-muted-foreground" />
                              )}
                            </button>
                          )}
                        </div>

                        <Link
                          href={method.href}
                          target={
                            method.label !== "Location" ? "_blank" : "_self"
                          }
                          rel="noopener noreferrer"
                          className="absolute inset-0 rounded-xl"
                          aria-label={`Contact via ${method.label}`}
                        />
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>

            {/* Stats Section */}
            <Reveal delay={0.4}>
              <div className="grid grid-cols-2 xs:grid-cols-4 gap-2 xs:gap-3 sm:gap-4 pt-4 border-t border-border/50">
                {stats.map((stat, idx) => {
                  const Icon = stat.icon;
                  return (
                    <div
                      key={idx}
                      className="text-center p-2 xs:p-3 rounded-lg bg-muted/20 hover:bg-muted/30 transition-all"
                    >
                      <Icon className="w-4 h-4 xs:w-5 xs:h-5 mx-auto mb-1 text-purple-600" />
                      <p className="text-lg xs:text-xl font-black text-purple-600">
                        {stat.value}
                      </p>
                      <p className="text-[8px] xs:text-[9px] font-black uppercase tracking-wider text-muted-foreground">
                        {stat.label}
                      </p>
                      <p className="text-[6px] xs:text-[7px] text-muted-foreground mt-0.5">
                        {stat.trend}
                      </p>
                    </div>
                  );
                })}
              </div>
            </Reveal>

            {/* Trust Badge */}
            <Reveal delay={0.5}>
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-600 animate-pulse" />
                  <span className="text-[8px] font-black uppercase tracking-wider text-muted-foreground">
                    Authentic Sanad
                  </span>
                </div>
                <div className="w-px h-3 bg-border" />
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                  <span className="text-[8px] font-black uppercase tracking-wider text-muted-foreground">
                    Ijazah Certified
                  </span>
                </div>
                <div className="w-px h-3 bg-border" />
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-600 animate-pulse" />
                  <span className="text-[8px] font-black uppercase tracking-wider text-muted-foreground">
                    24/7 Support
                  </span>
                </div>
              </div>
            </Reveal>
          </div>

          {/* RIGHT COLUMN - Enhanced Form */}
          <Reveal delay={0.3}>
            <div className="bg-card p-5 xs:p-6 sm:p-7 md:p-8 lg:p-10 xl:p-12 rounded-2xl xs:rounded-3xl border border-purple-200 dark:border-purple-800 shadow-xl relative overflow-hidden">
              {/* Background glow */}
              <div className="absolute top-0 right-0 w-48 sm:w-64 h-48 sm:h-64 bg-purple-600/5 blur-[60px] rounded-full pointer-events-none" />

              {/* Success Animation */}
              <AnimatePresence>
                {isSuccess && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="absolute inset-0 bg-background/95 backdrop-blur-sm z-20 flex items-center justify-center rounded-2xl xs:rounded-3xl"
                  >
                    <div className="text-center p-6 xs:p-8">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                          type: "spring",
                          stiffness: 200,
                          delay: 0.1,
                        }}
                        className="w-16 h-16 xs:w-20 xs:h-20 mx-auto mb-4 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center"
                      >
                        <CheckCircle2 className="w-8 h-8 xs:w-10 xs:h-10 text-purple-600" />
                      </motion.div>
                      <h3 className="font-black text-xl xs:text-2xl mb-2">
                        Inquiry Sent!
                      </h3>
                      <p className="text-xs xs:text-sm text-muted-foreground max-w-xs mx-auto">
                        Our admissions council will respond within 24 hours.
                      </p>
                      <Button
                        onClick={() => setIsSuccess(false)}
                        variant="outline"
                        className="mt-5 xs:mt-6 rounded-full px-6 py-2 text-xs font-black border-purple-300 text-purple-600 hover:bg-purple-50"
                      >
                        Send Another Message
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <h3 className="text-lg xs:text-xl sm:text-2xl font-black uppercase tracking-tighter mb-4 xs:mb-5 sm:mb-6 md:mb-8 bg-linear-to-r from-purple-600 to-amber-600 bg-clip-text text-transparent flex items-center gap-2">
                <Mail className="w-5 h-5 text-purple-600" />
                Official Inquiry
              </h3>

              <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="space-y-3 xs:space-y-4 sm:space-y-5"
              >
                {/* Full Name with animation */}
                <div className="space-y-1.5">
                  <label className="text-[9px] xs:text-[10px] font-black uppercase tracking-wider ml-1 flex justify-between">
                    <span>
                      Full Legal Name <span className="text-red-500">*</span>
                    </span>
                    {focusedField === "fullName" && (
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-[8px] text-muted-foreground"
                      >
                        Required
                      </motion.span>
                    )}
                  </label>
                  <div className="relative">
                    <input
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      onFocus={() => setFocusedField("fullName")}
                      required
                      className={cn(
                        "w-full h-11 xs:h-12 sm:h-13 md:h-14 px-4 xs:px-5 rounded-xl bg-background border-2 outline-none font-bold text-sm transition-all",
                        errors.fullName && touched.fullName
                          ? "border-red-500 focus:border-red-500"
                          : "border-border focus:border-purple-500 focus:shadow-[0_0_0_3px_rgba(147,51,234,0.1)]",
                      )}
                      placeholder="Enter your full name"
                      disabled={isSubmitting}
                    />
                  </div>
                  {errors.fullName && touched.fullName && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-[9px] text-red-500 mt-1 ml-1 error-message"
                    >
                      {errors.fullName}
                    </motion.p>
                  )}
                </div>

                {/* Email with validation icon */}
                <div className="space-y-1.5">
                  <label className="text-[9px] xs:text-[10px] font-black uppercase tracking-wider ml-1">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 xs:left-4 top-3 xs:top-3.5 w-3.5 h-3.5 xs:w-4 xs:h-4 text-muted-foreground" />
                    <input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={cn(
                        "w-full h-11 xs:h-12 sm:h-13 md:h-14 pl-9 xs:pl-11 pr-4 rounded-xl bg-background border-2 outline-none font-bold text-sm transition-all",
                        errors.email && touched.email
                          ? "border-red-500 focus:border-red-500"
                          : "border-border focus:border-purple-500 focus:shadow-[0_0_0_3px_rgba(147,51,234,0.1)]",
                      )}
                      placeholder="your@email.com"
                      disabled={isSubmitting}
                    />
                    {formData.email && !errors.email && touched.email && (
                      <CheckCircle2 className="absolute right-3 top-3 xs:top-3.5 w-4 h-4 text-green-500" />
                    )}
                  </div>
                  {errors.email && touched.email && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-[9px] text-red-500 mt-1 ml-1"
                    >
                      {errors.email}
                    </motion.p>
                  )}
                </div>

                {/* Phone with optional badge */}
                <div className="space-y-1.5">
                  <label className="text-[9px] xs:text-[10px] font-black uppercase tracking-wider ml-1 flex justify-between">
                    <span>Phone</span>
                    <span className="text-[8px] text-amber-500">Optional</span>
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 xs:left-4 top-3 xs:top-3.5 w-3.5 h-3.5 xs:w-4 xs:h-4 text-muted-foreground" />
                    <input
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full h-11 xs:h-12 sm:h-13 md:h-14 pl-9 xs:pl-11 pr-4 rounded-xl bg-background border-2 border-border focus:border-purple-500 outline-none font-bold text-sm transition-all focus:shadow-[0_0_0_3px_rgba(147,51,234,0.1)]"
                      placeholder="+1 (555) 000-0000"
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                {/* Academic Interest with custom select */}
                <div className="space-y-1.5">
                  <label className="text-[9px] xs:text-[10px] font-black uppercase tracking-wider ml-1">
                    Academic Interest <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="academicInterest"
                    value={formData.academicInterest}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={cn(
                      "w-full h-11 xs:h-12 sm:h-13 md:h-14 px-4 xs:px-5 rounded-xl bg-background border-2 outline-none font-bold text-sm appearance-none cursor-pointer transition-all",
                      errors.academicInterest && touched.academicInterest
                        ? "border-red-500 focus:border-red-500"
                        : "border-border focus:border-purple-500 focus:shadow-[0_0_0_3px_rgba(147,51,234,0.1)]",
                    )}
                    disabled={isSubmitting}
                  >
                    <option value="">Select a program</option>
                    <option value="qiroah">📖 Quran Reading Mastery</option>
                    <option value="hifz">🕋 Hifz Mastery Track</option>
                    <option value="tajweed">🎙️ Tajweed Phonetics</option>
                    <option value="arabic">📚 Classical Arabic</option>
                    <option value="ijazah">📜 Ijazah Certification</option>
                    <option value="group-qiroah">
                     {` 👥 Group Qiro'ah`}
                    </option>
                    <option value="juz-amma">🌟 Juz Amma (Children)</option>
                    <option value="other">💬 Other Inquiry</option>
                  </select>
                  {errors.academicInterest && touched.academicInterest && (
                    <p className="text-[9px] text-red-500 mt-1 ml-1">
                      {errors.academicInterest}
                    </p>
                  )}
                </div>

                {/* Preferred Contact Method - NEW */}
                <div className="space-y-1.5">
                  <label className="text-[9px] xs:text-[10px] font-black uppercase tracking-wider ml-1">
                    Preferred Contact Method
                  </label>
                  <div className="flex gap-2">
                    {["email", "phone", "whatsapp"].map((method) => (
                      <button
                        key={method}
                        type="button"
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            preferredContact: method,
                          }))
                        }
                        className={cn(
                          "flex-1 py-2 rounded-lg border-2 text-xs font-black uppercase transition-all",
                          formData.preferredContact === method
                            ? "border-purple-600 bg-purple-600/10 text-purple-600"
                            : "border-border text-muted-foreground hover:border-purple-300",
                        )}
                      >
                        {method}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Message with character counter */}
                <div className="space-y-1.5">
                  <label className="text-[9px] xs:text-[10px] font-black uppercase tracking-wider ml-1 flex justify-between">
                    <span>
                      Message to the Council{" "}
                      <span className="text-red-500">*</span>
                    </span>
                    <span
                      className={cn(
                        "text-[8px]",
                        characterCount > 900
                          ? "text-amber-500"
                          : "text-muted-foreground",
                      )}
                    >
                      {characterCount}/1000
                    </span>
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={cn(
                      "w-full p-4 rounded-xl bg-background border-2 outline-none font-medium text-sm transition-all resize-none",
                      errors.message && touched.message
                        ? "border-red-500 focus:border-red-500"
                        : "border-border focus:border-purple-500 focus:shadow-[0_0_0_3px_rgba(147,51,234,0.1)]",
                    )}
                    placeholder="I'm interested in learning more about..."
                    disabled={isSubmitting}
                  />
                  {errors.message && touched.message && (
                    <p className="text-[9px] text-red-500 mt-1 ml-1">
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* Newsletter Opt-in - NEW */}
                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="newsletterOptIn"
                    name="newsletterOptIn"
                    checked={formData.newsletterOptIn}
                    onChange={handleChange}
                    className="w-4 h-4 rounded border-purple-300 text-purple-600 focus:ring-purple-500"
                  />
                  <label
                    htmlFor="newsletterOptIn"
                    className="text-[9px] xs:text-[10px] font-medium cursor-pointer"
                  >
                    Subscribe to our newsletter for updates and resources
                  </label>
                </div>

                <input type="text" name="_gotcha" style={{ display: "none" }} />

                {/* Submit Button with enhanced animation */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-12 xs:h-13 sm:h-14 md:h-15 lg:h-16 rounded-xl bg-linear-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-black text-[9px] xs:text-[10px] sm:text-[11px] tracking-[0.15em] xs:tracking-[0.2em] uppercase shadow-xl relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 xs:w-4 xs:h-4 animate-spin" />
                        SENDING...
                      </>
                    ) : (
                      <>
                        TRANSMIT INQUIRY
                        <Send className="w-3.5 h-3.5 xs:w-4 xs:h-4 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </span>

                  {/* Shimmer effect */}
                  {!isSubmitting && (
                    <div className="absolute inset-0 overflow-hidden rounded-xl">
                      <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent -skew-x-12 animate-shimmer" />
                    </div>
                  )}
                </Button>
              </form>

              {/* Privacy Note */}
              <div className="mt-4 text-center">
                <p className="text-[7px] xs:text-[8px] text-muted-foreground/50 flex items-center justify-center gap-1">
                  <ShieldCheck className="w-2.5 h-2.5" />
                  Your information is encrypted and never shared
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%) skewX(-12deg);
          }
          100% {
            transform: translateX(200%) skewX(-12deg);
          }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </section>
  );
}
