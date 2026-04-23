"use client";

import { useState } from "react";
import { Reveal } from "@/components/shared/section-animation";
import {
  Globe,
  Send,
  Landmark,
  ShieldCheck,
  Loader2,
  Mail,
  Phone,
  CheckCircle2,
  XCircle,
  Sparkles,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    academicInterest: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
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

    // Validate field
    let error = "";
    if (name === "fullName" && !value.trim()) error = "Full name is required";
    if (name === "email" && !value.trim()) error = "Email is required";
    if (
      name === "email" &&
      value.trim() &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
    )
      error = "Invalid email format";
    if (name === "academicInterest" && !value)
      error = "Please select a program";
    if (name === "message" && !value.trim()) error = "Message is required";

    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Invalid email format";
    if (!formData.academicInterest)
      newErrors.academicInterest = "Please select a program";
    if (!formData.message.trim()) newErrors.message = "Message is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);

    const formDataToSend = new FormData();
    formDataToSend.append("fullName", formData.fullName);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("phone", formData.phone);
    formDataToSend.append("academicInterest", formData.academicInterest);
    formDataToSend.append("message", formData.message);
    formDataToSend.append(
      "_subject",
      `[Al-Maysaroh] Inquiry from ${formData.fullName}`,
    );

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
        });
        setTouched({});

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

  return (
    <section className="py-12 xs:py-16 sm:py-20 md:py-24 lg:py-32 bg-gradient-to-b from-background via-purple-50/5 to-amber-50/5 relative overflow-hidden">
      {/* Background decorative elements */}
      <div
        className="absolute inset-0 opacity-[0.02] bg-[url('/islamic-pattern.svg')] bg-center bg-repeat pointer-events-none"
        style={{ backgroundSize: "300px" }}
      />
      <div className="absolute top-40 right-0 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-40 left-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 xs:px-5 sm:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 xs:gap-10 sm:gap-12 lg:gap-16 xl:gap-20 items-start">
          {/* LEFT COLUMN - Information */}
          <div className="space-y-6 xs:space-y-8 sm:space-y-10 md:space-y-12">
            <Reveal>
              <div className="space-y-3 xs:space-y-4 sm:space-y-5 md:space-y-6">
                <div className="inline-flex items-center gap-1.5 xs:gap-2 px-2.5 xs:px-3 py-1 xs:py-1.5 rounded-full bg-purple-100 dark:bg-purple-950/40 text-purple-700 text-[8px] xs:text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] border border-purple-200 dark:border-purple-800">
                  <Globe className="w-3 h-3 xs:w-3.5 xs:h-3.5" />
                  Global Admissions Office
                </div>
                <h2 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tighter font-heading leading-[1.1]">
                  Begin Your <br />
                  <span className="bg-gradient-to-r from-purple-600 to-amber-600 bg-clip-text text-transparent italic">
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

            <div className="grid xs:grid-cols-2 gap-3 xs:gap-4 sm:gap-5 md:gap-6">
              <Reveal delay={0.2}>
                <div className="p-4 xs:p-5 sm:p-6 md:p-7 lg:p-8 rounded-xl xs:rounded-2xl border-2 border-purple-100 dark:border-purple-900/30 hover:border-purple-400 dark:hover:border-purple-600 transition-all group bg-gradient-to-br from-background to-purple-50/20">
                  <Landmark className="w-5 h-5 xs:w-6 xs:h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-purple-600 mb-2 xs:mb-3 sm:mb-4 group-hover:scale-110 transition-transform" />
                  <h4 className="font-black uppercase text-[9px] xs:text-[10px] tracking-wider mb-1 xs:mb-2">
                    Admissions Council
                  </h4>
                  <Link
                    href="mailto:info.almaysaroh@gmail.com"
                    className="text-[10px] xs:text-xs text-muted-foreground font-bold hover:text-purple-600 transition-colors break-all"
                  >
                    info.almaysaroh@gmail.com
                  </Link>
                </div>
              </Reveal>

              <Reveal delay={0.3}>
                <div className="p-4 xs:p-5 sm:p-6 md:p-7 lg:p-8 rounded-xl xs:rounded-2xl border-2 border-amber-200 dark:border-amber-900/30 hover:border-amber-400 dark:hover:border-amber-500 transition-all group bg-gradient-to-br from-background to-amber-50/20">
                  <ShieldCheck className="w-5 h-5 xs:w-6 xs:h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-amber-500 mb-2 xs:mb-3 sm:mb-4 group-hover:scale-110 transition-transform" />
                  <h4 className="font-black uppercase text-[9px] xs:text-[10px] tracking-wider mb-1 xs:mb-2">
                    Technical Registrar
                  </h4>
                  <Link
                    href="mailto:info.almaysaroh@gmail.com"
                    className="text-[10px] xs:text-xs text-muted-foreground font-bold hover:text-amber-500 transition-colors break-all"
                  >
                    info.almaysaroh@gmail.com
                  </Link>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.4}>
              <div className="flex flex-col xs:flex-row items-start xs:items-center gap-3 xs:gap-4 sm:gap-5 md:gap-6 pt-4 xs:pt-5 sm:pt-6 border-t border-border/50">
                <div className="flex -space-x-2 xs:-space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 xs:w-9 xs:h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full border-2 border-background bg-gradient-to-br from-purple-600 to-purple-700 shadow-xl"
                    />
                  ))}
                </div>
                <div>
                  <p className="text-[10px] xs:text-xs sm:text-sm font-bold text-muted-foreground">
                    Our council serves{" "}
                    <span className="text-foreground">50+ countries</span>{" "}
                    across all major timezones.
                  </p>
                  <p className="text-[9px] xs:text-[10px] text-purple-600 dark:text-purple-400 mt-1 flex items-center gap-1">
                    <Clock className="w-2.5 h-2.5" />⚡ Average response: 4
                    hours
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          {/* RIGHT COLUMN - Form */}
          <Reveal delay={0.5}>
            <div className="bg-card p-5 xs:p-6 sm:p-7 md:p-8 lg:p-10 xl:p-12 rounded-2xl xs:rounded-3xl border border-purple-200 dark:border-purple-800 shadow-xl relative overflow-hidden">
              {/* Background glow */}
              <div className="absolute top-0 right-0 w-48 sm:w-64 h-48 sm:h-64 bg-purple-600/5 blur-[60px] rounded-full pointer-events-none" />

              {/* Success overlay */}
              {isSuccess && (
                <div className="absolute inset-0 bg-background/95 backdrop-blur-sm z-20 flex items-center justify-center animate-in fade-in duration-300 rounded-2xl xs:rounded-3xl">
                  <div className="bg-gradient-to-br from-purple-50 to-background dark:from-purple-950/30 dark:to-background p-6 xs:p-8 rounded-2xl text-center max-w-xs mx-4 shadow-2xl border border-purple-200 dark:border-purple-800">
                    <div className="w-16 h-16 xs:w-20 xs:h-20 mx-auto mb-3 xs:mb-4 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                      <CheckCircle2 className="w-8 h-8 xs:w-10 xs:h-10 text-purple-600" />
                    </div>
                    <h3 className="font-black text-xl xs:text-2xl mb-2">
                      Inquiry Sent!
                    </h3>
                    <p className="text-xs xs:text-sm text-muted-foreground">
                      Our admissions council will respond within 24 hours.
                    </p>
                    <Button
                      onClick={() => setIsSuccess(false)}
                      variant="outline"
                      className="mt-5 xs:mt-6 rounded-full px-5 xs:px-6 py-2 text-xs font-black border-purple-300 text-purple-600 hover:bg-purple-50"
                    >
                      SEND ANOTHER
                    </Button>
                  </div>
                </div>
              )}

              <h3 className="text-lg xs:text-xl sm:text-2xl font-black uppercase tracking-tighter mb-4 xs:mb-5 sm:mb-6 md:mb-8 bg-gradient-to-r from-purple-600 to-amber-600 bg-clip-text text-transparent">
                Official Inquiry
              </h3>

              <form
                onSubmit={handleSubmit}
                className="space-y-3 xs:space-y-4 sm:space-y-5"
              >
                {/* Full Name */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="fullName"
                    className="text-[9px] xs:text-[10px] font-black uppercase tracking-wider ml-1 opacity-60"
                  >
                    Full Legal Name *
                  </label>
                  <input
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    className={cn(
                      "w-full h-11 xs:h-12 sm:h-13 md:h-14 px-4 xs:px-5 rounded-xl bg-background border-2 outline-none font-bold text-sm transition-all",
                      errors.fullName && touched.fullName
                        ? "border-red-500 focus:border-red-500"
                        : "border-border focus:border-purple-500",
                    )}
                    placeholder="Enter your full name"
                    disabled={isSubmitting}
                  />
                  {errors.fullName && touched.fullName && (
                    <p className="text-[9px] text-red-500 mt-1 ml-1">
                      {errors.fullName}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="email"
                    className="text-[9px] xs:text-[10px] font-black uppercase tracking-wider ml-1 opacity-60"
                  >
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 xs:left-4 top-3 xs:top-3.5 w-3.5 h-3.5 xs:w-4 xs:h-4 text-muted-foreground" />
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                      className={cn(
                        "w-full h-11 xs:h-12 sm:h-13 md:h-14 pl-9 xs:pl-11 pr-4 rounded-xl bg-background border-2 outline-none font-bold text-sm transition-all",
                        errors.email && touched.email
                          ? "border-red-500 focus:border-red-500"
                          : "border-border focus:border-purple-500",
                      )}
                      placeholder="your@email.com"
                      disabled={isSubmitting}
                    />
                  </div>
                  {errors.email && touched.email && (
                    <p className="text-[9px] text-red-500 mt-1 ml-1">
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="phone"
                    className="text-[9px] xs:text-[10px] font-black uppercase tracking-wider ml-1 opacity-60"
                  >
                    Phone <span className="text-amber-500">(Optional)</span>
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 xs:left-4 top-3 xs:top-3.5 w-3.5 h-3.5 xs:w-4 xs:h-4 text-muted-foreground" />
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full h-11 xs:h-12 sm:h-13 md:h-14 pl-9 xs:pl-11 pr-4 rounded-xl bg-background border-2 border-border focus:border-purple-500 outline-none font-bold text-sm transition-all"
                      placeholder="+1 (555) 000-0000"
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                {/* Academic Interest */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="academicInterest"
                    className="text-[9px] xs:text-[10px] font-black uppercase tracking-wider ml-1 opacity-60"
                  >
                    Academic Interest *
                  </label>
                  <select
                    id="academicInterest"
                    name="academicInterest"
                    value={formData.academicInterest}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    className={cn(
                      "w-full h-11 xs:h-12 sm:h-13 md:h-14 px-4 xs:px-5 rounded-xl bg-background border-2 outline-none font-bold text-sm appearance-none cursor-pointer",
                      errors.academicInterest && touched.academicInterest
                        ? "border-red-500 focus:border-red-500"
                        : "border-border focus:border-purple-500",
                    )}
                    disabled={isSubmitting}
                  >
                    <option value="">Select a program</option>
                    <option value="qiroah">Quran Reading Mastery</option>
                    <option value="hifz">Hifz Mastery Track</option>
                    <option value="tajweed">Tajweed Phonetics</option>
                    <option value="arabic">Classical Arabic</option>
                    <option value="ijazah">Ijazah Certification</option>
                    <option value="group-qiroah">
                      Group Qiro'ah (Children)
                    </option>
                    <option value="juz-amma">Juz Amma (Children)</option>
                    <option value="other">Other Inquiry</option>
                  </select>
                  {errors.academicInterest && touched.academicInterest && (
                    <p className="text-[9px] text-red-500 mt-1 ml-1">
                      {errors.academicInterest}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="message"
                    className="text-[9px] xs:text-[10px] font-black uppercase tracking-wider ml-1 opacity-60"
                  >
                    Message to the Council *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    className={cn(
                      "w-full p-4 rounded-xl bg-background border-2 outline-none font-medium text-sm transition-all resize-none",
                      errors.message && touched.message
                        ? "border-red-500 focus:border-red-500"
                        : "border-border focus:border-purple-500",
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

                {/* Honeypot */}
                <input type="text" name="_gotcha" style={{ display: "none" }} />

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-12 xs:h-13 sm:h-14 md:h-15 lg:h-16 rounded-xl bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-black text-[9px] xs:text-[10px] sm:text-[11px] tracking-[0.15em] xs:tracking-[0.2em] uppercase shadow-xl relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
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
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 animate-shimmer" />
                    </div>
                  )}
                </Button>
              </form>

              {/* Privacy Note */}
              <p className="text-[8px] xs:text-[9px] text-center text-muted-foreground/50 mt-4">
                🔒 We'll respond within 24 hours. Your information is protected.
              </p>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Add shimmer animation to global CSS if not present */}
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
