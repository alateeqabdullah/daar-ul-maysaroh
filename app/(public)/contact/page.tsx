

"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  MessageCircle,
  Send,
  Clock,
  Landmark,
  ChevronRight,
  Laptop,
  GraduationCap,
  Loader2,
  CheckCircle2,
  Phone,
  Globe,
  Heart,
  Star,
  BookOpen,
  AlertCircle,
  AlertTriangle,
  HelpCircle,
  Instagram,
  Facebook,
  Twitter,
  Youtube,
  FileText,
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/shared/section-animation";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import Link from "next/link";

// CONTACT INFO
const CONTACT_INFO = {
  email: "info.almaysaroh@gmail.com",
  phone: "+234 911 016 3930",
  whatsapp: "+234 911 016 3930",
  address: "Global Online Campus",
};

const DEPARTMENTS = [
  {
    id: "admissions",
    name: "Admissions Council",
    email: "info.almaysaroh@gmail.com",
    desc: "New student assessments, scholar matching, Ijazah track inquiries.",
    icon: GraduationCap,
    arabic: "مجلس القبول",
    color: "purple",
    responseTime: "4-6 hours",
  },
  {
    id: "bursar",
    name: "Financial Bursar",
    email: "info.almaysaroh@gmail.com",
    desc: "Bank transfers, receipt verification, scholarship grants.",
    icon: Landmark,
    arabic: "أمين الصندوق",
    color: "amber",
    responseTime: "6-8 hours",
  },
  {
    id: "academic",
    name: "Academic Support",
    email: "info.almaysaroh@gmail.com",
    desc: "Schedule changes, teacher transitions, progress tracking.",
    icon: BookOpen,
    arabic: "الدعم الأكاديمي",
    color: "purple",
    responseTime: "4-6 hours",
  },
  {
    id: "tech",
    name: "Technical Desk",
    email: "info.almaysaroh@gmail.com",
    desc: "Portal access, app feedback, classroom connectivity.",
    icon: Laptop,
    arabic: "الدعم التقني",
    color: "amber",
    responseTime: "2-4 hours",
  },
];

const FAQS = [
  {
    q: "How long does it take to get a response?",
    a: "Response times vary by department: Admissions (4-6h), Financial (6-8h), Academic (4-6h), Technical (2-4h). Urgent inquiries are prioritized.",
  },
  {
    q: "Can I apply for financial aid?",
    a: "Yes! We offer Zakat-funded grants and family discounts. Please contact our Financial Bursar department for more information.",
  },
  {
    q: "What information should I include in my inquiry?",
    a: "Include your full name, student ID (if applicable), and specific details about your request. This helps us route your inquiry correctly.",
  },
  {
    q: "Do you offer support in multiple languages?",
    a: "Yes! We support English, Arabic, Urdu, French, and Hausa. Please specify your preferred language in your message.",
  },
];

const PRIORITY_OPTIONS = [
  {
    value: "normal",
    label: "Normal (1-2 days)",
    color: "purple",
    time: "24-48 hours",
  },
  {
    value: "urgent",
    label: "Urgent (Within 24h)",
    color: "amber",
    time: "12-24 hours",
  },
  {
    value: "emergency",
    label: "Emergency (ASAP)",
    color: "red",
    time: "2-4 hours",
  },
];

const SOCIAL_LINKS = [
  {
    icon: Instagram,
    href: "https://instagram.com/almaysaroh",
    label: "Instagram",
    color: "hover:text-pink-600",
  },
  {
    icon: Facebook,
    href: "https://facebook.com/almaysaroh",
    label: "Facebook",
    color: "hover:text-blue-600",
  },
  {
    icon: Twitter,
    href: "https://twitter.com/almaysaroh",
    label: "Twitter",
    color: "hover:text-sky-500",
  },
  {
    icon: Youtube,
    href: "https://youtube.com/almaysaroh",
    label: "YouTube",
    color: "hover:text-red-600",
  },
];

const getColorStyles = (color: string) => {
  const styles = {
    purple: {
      text: "text-purple-600 dark:text-purple-400",
      border: "border-purple-200 dark:border-purple-800",
      bg: "bg-purple-100 dark:bg-purple-950/40",
      gradient: "from-purple-600 to-purple-700",
      light: "bg-purple-50/30 dark:bg-purple-950/20",
      ring: "ring-purple-500/20",
    },
    amber: {
      text: "text-amber-600 dark:text-amber-400",
      border: "border-amber-200 dark:border-amber-800",
      bg: "bg-amber-100 dark:bg-amber-950/40",
      gradient: "from-amber-500 to-amber-600",
      light: "bg-amber-50/30 dark:bg-amber-950/20",
      ring: "ring-amber-500/20",
    },
    red: {
      text: "text-red-600 dark:text-red-400",
      border: "border-red-200 dark:border-red-800",
      bg: "bg-red-100 dark:bg-red-950/40",
      gradient: "from-red-500 to-red-600",
      light: "bg-red-50/30 dark:bg-red-950/20",
      ring: "ring-red-500/20",
    },
    green: {
      text: "text-green-600 dark:text-green-400",
      border: "border-green-200 dark:border-green-800",
      bg: "bg-green-100 dark:bg-green-950/40",
      gradient: "from-green-500 to-green-600",
      light: "bg-green-50/30 dark:bg-green-950/20",
      ring: "ring-green-500/20",
    },
  };
  return styles[color as keyof typeof styles] || styles.purple;
};

interface FormErrors {
  fullName?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export default function ContactHub() {
  const [isOfficeOpen, setIsOfficeOpen] = useState(false);
  const [selectedDept, setSelectedDept] = useState("admissions");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [characterCount, setCharacterCount] = useState(0);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    studentId: "",
    subject: "",
    message: "",
    department: "admissions",
    priority: "normal",
  });

  // Check office hours
  useEffect(() => {
    const checkStatus = () => {
      const d = new Date();
      const utc = d.getTime() + d.getTimezoneOffset() * 60000;
      const nigeriaTime = new Date(utc + 3600000 * 1);
      const hours = nigeriaTime.getHours();
      setIsOfficeOpen(hours >= 9 && hours < 18);
    };
    checkStatus();
    const timer = setInterval(checkStatus, 60000);
    return () => clearInterval(timer);
  }, []);

  // Update character count
  useEffect(() => {
    setCharacterCount(formData.message.length);
  }, [formData.message]);

  const validateField = (name: string, value: string) => {
    let error = "";

    switch (name) {
      case "fullName":
        if (!value.trim()) error = "Full name is required";
        else if (value.length < 2) error = "Name must be at least 2 characters";
        break;
      case "email":
        if (!value.trim()) error = "Email is required";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          error = "Invalid email format";
        break;
      case "subject":
        if (!value.trim()) error = "Subject is required";
        else if (value.length < 3)
          error = "Subject must be at least 3 characters";
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

  const handleBlur = (
    e: React.FocusEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    validateField(name, value);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  useEffect(() => {
    setFormData((prev) => ({ ...prev, department: selectedDept }));
  }, [selectedDept]);

  const validateForm = () => {
    const fields = ["fullName", "email", "subject", "message"];
    let isValid = true;
    fields.forEach((field) => {
      const value = formData[field as keyof typeof formData] as string;
      if (!validateField(field, value)) isValid = false;
    });
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the errors before submitting");
      return;
    }

    setIsSubmitting(true);

    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value) formDataToSend.append(key, value.toString());
    });
    formDataToSend.append("_replyto", formData.email);
    formDataToSend.append(
      "_subject",
      `[Al-Maysaroh] ${formData.subject} (${formData.priority.toUpperCase()})`,
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
          description: `Our team will respond within ${PRIORITY_OPTIONS.find((p) => p.value === formData.priority)?.time || "24-48 hours"}.`,
        });

        setFormData({
          fullName: "",
          email: "",
          studentId: "",
          subject: "",
          message: "",
          department: selectedDept,
          priority: "normal",
        });
        setCharacterCount(0);
        setErrors({});
        setTouched({});

        setTimeout(() => setIsSuccess(false), 5000);
      } else {
        throw new Error("Submission failed");
      }
    } catch (error) {
      toast.error("Submission Failed", {
        description: "Please try again or email us directly.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedDeptInfo = DEPARTMENTS.find((d) => d.id === selectedDept);
  const selectedColors = getColorStyles(selectedDeptInfo?.color || "purple");
  const priorityColors = getColorStyles(
    PRIORITY_OPTIONS.find((p) => p.value === formData.priority)?.color ||
      "purple",
  );

  return (
    <main className="pt-30 md:pt-32 lg:pt-36 pb-16 xs:pb-20 sm:pb-24 md:pb-28 lg:pb-32 bg-gradient-to-b from-background via-purple-50/5 to-amber-50/5 relative overflow-hidden">
      {/* Islamic Pattern Background */}
      <div
        className="absolute inset-0 opacity-[0.03] bg-[url('/islamic-pattern.svg')] bg-center bg-repeat pointer-events-none"
        style={{ backgroundSize: "200px" }}
      />

      {/* Celestial Orbs */}
      <div className="absolute top-1/4 -left-20 w-80 xs:w-96 h-80 xs:h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-80 xs:w-96 h-80 xs:h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Enhanced Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 xs:px-5 sm:px-6 relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-12 xs:mb-16 sm:mb-20 lg:mb-24 xl:mb-28">
          <Reveal>
            <div className="inline-flex font-arabic items-center gap-1.5 xs:gap-2 px-3 xs:px-4 py-1.5 xs:py-2 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 text-[9px] xs:text-[10px] sm:text-xs font-black uppercase tracking-wider border border-purple-200 dark:border-purple-800 mb-4 xs:mb-5 sm:mb-6">
              <Heart className="w-3 h-3 xs:w-3.5 xs:h-3.5 text-amber-500" />
              بسم الله الرحمن الرحيم
              <Heart className="w-3 h-3 xs:w-3.5 xs:h-3.5 text-amber-500" />
            </div>

            <h1 className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tighter font-heading leading-[1.1] mb-4 xs:mb-5 sm:mb-6 md:mb-8">
              Reach the{" "}
              <span className="bg-gradient-to-r from-purple-600 via-purple-700 to-amber-600 bg-clip-text text-transparent">
                Scholars.
              </span>
            </h1>

            <p className="text-base xs:text-lg sm:text-xl md:text-2xl text-muted-foreground font-light max-w-3xl mx-auto leading-relaxed px-4">
              Connect directly with our scholarly council. Whether you seek
              knowledge, need guidance, or wish to begin your journey - we're
              here.
            </p>
          </Reveal>
        </div>

        {/* Contact Cards */}
        <div className="grid xs:grid-cols-2 lg:grid-cols-4 gap-4 xs:gap-5 sm:gap-6 md:gap-8 mb-12 xs:mb-16 sm:mb-20 lg:mb-24">
          {[
            {
              icon: Mail,
              label: "Email",
              value: CONTACT_INFO.email,
              href: `mailto:${CONTACT_INFO.email}`,
              arabic: "البريد الإلكتروني",
              color: "purple",
            },
            {
              icon: Phone,
              label: "Phone",
              value: CONTACT_INFO.phone,
              href: `tel:${CONTACT_INFO.phone}`,
              arabic: "الهاتف",
              color: "amber",
            },
            {
              icon: MessageCircle,
              label: "WhatsApp",
              value: CONTACT_INFO.whatsapp,
              href: `https://wa.me/${CONTACT_INFO.whatsapp.replace(/\D/g, "")}`,
              arabic: "واتساب",
              color: "green",
            },
            {
              icon: Globe,
              label: "Location",
              value: CONTACT_INFO.address,
              href: "#",
              arabic: "الموقع",
              color: "purple",
            },
          ].map((item, idx) => {
            const Icon = item.icon;
            const itemColors = getColorStyles(item.color);
            return (
              <Reveal key={idx} delay={idx * 0.1}>
                <Link
                  href={item.href}
                  target={item.label === "Location" ? "_self" : "_blank"}
                  rel="noopener noreferrer"
                  className="group block p-5 xs:p-6 sm:p-7 md:p-8 rounded-xl xs:rounded-2xl bg-card border-2 border-purple-200 dark:border-purple-800 hover:border-purple-300 transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-xl"
                >
                  <div className="flex items-center gap-3 xs:gap-4 mb-3 xs:mb-4">
                    <div className="w-10 h-10 xs:w-11 xs:h-11 sm:w-12 sm:h-12 rounded-xl bg-purple-100 dark:bg-purple-950/40 flex items-center justify-center group-hover:bg-purple-200 dark:group-hover:bg-purple-900/60 transition-colors">
                      <Icon className="w-5 h-5 xs:w-5.5 xs:h-5.5 sm:w-6 sm:h-6 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-[8px] xs:text-[9px] sm:text-[10px] text-purple-600 font-black uppercase tracking-wider">
                        {item.arabic}
                      </p>
                      <p className="text-[9px] xs:text-[10px] text-muted-foreground font-medium">
                        {item.label}
                      </p>
                    </div>
                  </div>
                  <p className="text-xs xs:text-sm sm:text-base font-bold break-all group-hover:text-purple-600 transition-colors">
                    {item.value}
                  </p>
                </Link>
              </Reveal>
            );
          })}
        </div>

        {/* Office Status Bar - Enhanced */}
        <div className="mb-12 xs:mb-16 sm:mb-20 p-4 xs:p-5 rounded-xl xs:rounded-2xl bg-muted/30 border border-purple-200 dark:border-purple-800 text-center">
          <div className="flex flex-col xs:flex-row items-center justify-center gap-2 xs:gap-3 sm:gap-4">
            <div className="flex items-center gap-2">
              <span
                className={cn(
                  "w-2.5 h-2.5 rounded-full animate-pulse",
                  isOfficeOpen ? "bg-amber-500" : "bg-red-500",
                )}
              />
              <p className="text-[9px] xs:text-[10px] sm:text-xs font-black uppercase tracking-wider">
                {isOfficeOpen
                  ? "ADMISSIONS OFFICE OPEN — RESPONSE WITHIN 4 HOURS"
                  : "OFFICE HOURS: 9AM - 6PM (WAT) • LEAVE A MESSAGE"}
              </p>
            </div>
            <Clock className="w-3.5 h-3.5 text-muted-foreground" />
          </div>
        </div>

        {/* Department & Form Section */}
        <div className="grid lg:grid-cols-12 gap-8 xs:gap-10 lg:gap-16 xl:gap-20">
          {/* Department Selector */}
          <div className="lg:col-span-5">
            <div className="space-y-3 xs:space-y-4 sticky top-24 sm:top-28">
              <div className="flex items-center gap-3 xs:gap-4 mb-5 xs:mb-6 sm:mb-8">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent to-purple-600/40" />
                <p className="text-[9px] xs:text-[10px] sm:text-xs font-arabic font-black uppercase tracking-wider text-purple-600">
                  الأقسام
                </p>
                <div className="h-px flex-1 bg-gradient-to-l from-transparent to-purple-600/40" />
              </div>

              {DEPARTMENTS.map((dept) => {
                const Icon = dept.icon;
                const colors = getColorStyles(dept.color);
                const isSelected = selectedDept === dept.id;

                return (
                  <button
                    key={dept.id}
                    onClick={() => setSelectedDept(dept.id)}
                    className={cn(
                      "w-full p-4 xs:p-5 sm:p-6 rounded-xl xs:rounded-2xl border-2 transition-all duration-300 text-left group",
                      isSelected
                        ? `${colors.border} ${colors.light} shadow-md`
                        : "border-border hover:border-purple-300 hover:bg-purple-50/30 dark:hover:bg-purple-950/20",
                    )}
                  >
                    <div className="flex items-center gap-3 xs:gap-4 sm:gap-5">
                      <div
                        className={cn(
                          "w-10 h-10 xs:w-11 xs:h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center transition-all",
                          isSelected
                            ? `bg-gradient-to-r ${colors.gradient} text-white scale-105 shadow-md`
                            : "bg-muted text-muted-foreground",
                        )}
                      >
                        <Icon className="w-5 h-5 xs:w-5.5 xs:h-5.5 sm:w-6 sm:h-6" />
                      </div>
                      <div className="flex-1">
                        <p
                          className={`font-black text-sm xs:text-base sm:text-lg uppercase tracking-tight ${isSelected ? colors.text : ""}`}
                        >
                          {dept.name}
                        </p>
                        <p className="text-[9px] xs:text-[10px] font-arabic font-medium text-muted-foreground mt-0.5">
                          {dept.arabic}
                        </p>
                      </div>
                      <ChevronRight
                        className={cn(
                          "w-4 h-4 xs:w-5 xs:h-5 transition-all",
                          isSelected
                            ? `translate-x-0 opacity-100 ${colors.text}`
                            : "-translate-x-3 opacity-0",
                        )}
                      />
                    </div>
                    <p className="text-[10px] xs:text-xs text-muted-foreground mt-2 xs:mt-3 ml-13 xs:ml-14 sm:ml-16 pl-1">
                      {dept.desc}
                    </p>
                    {/* Response Time Badge */}
                    <div className="mt-2 ml-13 xs:ml-14 sm:ml-16">
                      <span
                        className={`text-[8px] xs:text-[9px] font-black ${colors.text} opacity-70`}
                      >
                        ⏱ Response: {dept.responseTime}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Social Links */}
            <div className="mt-8 xs:mt-10 pt-6 xs:pt-8 border-t border-purple-200 dark:border-purple-800">
              <p className="text-[9px] xs:text-[10px] font-black uppercase tracking-wider text-center text-muted-foreground mb-3 xs:mb-4">
                Follow Us
              </p>
              <div className="flex justify-center gap-3 xs:gap-4">
                {SOCIAL_LINKS.map((social, i) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={i}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-2 rounded-full bg-muted/30 hover:bg-muted/50 transition-all ${social.color}`}
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Inquiry Form */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedDept}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="relative"
              >
                <div
                  className={`bg-card p-5 xs:p-6 sm:p-7 md:p-8 lg:p-10 rounded-xl xs:rounded-2xl border-2 ${selectedColors.border} relative overflow-hidden shadow-lg`}
                >
                  {/* Success Overlay */}
                  {isSuccess && (
                    <div className="absolute inset-0 bg-background/95 backdrop-blur-sm z-20 flex items-center justify-center p-4">
                      <div className="bg-card rounded-xl p-6 xs:p-8 text-center max-w-md w-full shadow-2xl border-2 border-purple-200 dark:border-purple-800">
                        <div className="w-14 h-14 xs:w-16 xs:h-16 mx-auto mb-3 xs:mb-4 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                          <CheckCircle2 className="w-7 h-7 xs:w-8 xs:h-8 text-purple-600" />
                        </div>
                        <h3 className="font-black font-arabic text-lg xs:text-xl mb-2">
                          جزاك الله خيرًا
                        </h3>
                        <p className="text-xs xs:text-sm text-muted-foreground">
                          Your message has been received. Our team will respond
                          within{" "}
                          {PRIORITY_OPTIONS.find(
                            (p) => p.value === formData.priority,
                          )?.time || "24-48 hours"}
                          .
                        </p>
                        <Button
                          onClick={() => setIsSuccess(false)}
                          variant="outline"
                          className="mt-5 xs:mt-6 rounded-full px-5 xs:px-6 py-2 xs:py-2.5 text-xs font-black border-purple-300 text-purple-600"
                        >
                          Send Another
                        </Button>
                      </div>
                    </div>
                  )}

                  <div className="mb-5 xs:mb-6 sm:mb-7 md:mb-8">
                    <h2 className="text-xl xs:text-2xl sm:text-3xl font-black uppercase tracking-tighter">
                      Message to{" "}
                      <span className={selectedColors.text}>
                        {selectedDeptInfo?.name}
                      </span>
                    </h2>
                    <p className="text-xs xs:text-sm sm:text-base text-muted-foreground mt-1 xs:mt-2">
                      {selectedDeptInfo?.desc}
                    </p>
                    <p
                      className={`text-[9px] xs:text-[10px] mt-1 ${selectedColors.text} opacity-70`}
                    >
                      ⏱ Typical response time: {selectedDeptInfo?.responseTime}
                    </p>
                  </div>

                  <form
                    onSubmit={handleSubmit}
                    className="space-y-4 xs:space-y-5 sm:space-y-6"
                  >
                    <div className="grid xs:grid-cols-2 gap-3 xs:gap-4 sm:gap-5">
                      <div className="space-y-1.5 xs:space-y-2">
                        <label className="text-[9px] xs:text-[10px] sm:text-xs font-black uppercase tracking-wider">
                          Full Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          required
                          className={cn(
                            "w-full h-11 xs:h-12 px-4 rounded-lg bg-background border-2 transition-all text-sm",
                            errors.fullName && touched.fullName
                              ? "border-red-500 focus:border-red-500"
                              : "border-border focus:border-purple-500",
                          )}
                          placeholder="Enter your full name"
                          disabled={isSubmitting}
                        />
                        {errors.fullName && touched.fullName && (
                          <p className="text-[9px] text-red-500 mt-1 flex items-center gap-1">
                            <AlertCircle className="w-2.5 h-2.5" />
                            {errors.fullName}
                          </p>
                        )}
                      </div>
                      <div className="space-y-1.5 xs:space-y-2">
                        <label className="text-[9px] xs:text-[10px] sm:text-xs font-black uppercase tracking-wider">
                          Email <span className="text-red-500">*</span>
                        </label>
                        <input
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          required
                          className={cn(
                            "w-full h-11 xs:h-12 px-4 rounded-lg bg-background border-2 transition-all text-sm",
                            errors.email && touched.email
                              ? "border-red-500 focus:border-red-500"
                              : "border-border focus:border-purple-500",
                          )}
                          placeholder="your@email.com"
                          disabled={isSubmitting}
                        />
                        {errors.email && touched.email && (
                          <p className="text-[9px] text-red-500 mt-1 flex items-center gap-1">
                            <AlertCircle className="w-2.5 h-2.5" />
                            {errors.email}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid xs:grid-cols-2 gap-3 xs:gap-4 sm:gap-5">
                      <div className="space-y-1.5 xs:space-y-2">
                        <label className="text-[9px] xs:text-[10px] sm:text-xs font-black uppercase tracking-wider">
                          Student ID (Optional)
                        </label>
                        <input
                          name="studentId"
                          value={formData.studentId}
                          onChange={handleChange}
                          placeholder="AM-XXXX"
                          className="w-full h-11 xs:h-12 px-4 rounded-lg bg-background border-2 border-border focus:border-purple-500 outline-none text-sm transition-all"
                          disabled={isSubmitting}
                        />
                      </div>
                      <div className="space-y-1.5 xs:space-y-2">
                        <label className="text-[9px] xs:text-[10px] sm:text-xs font-black uppercase tracking-wider">
                          Priority
                        </label>
                        <select
                          name="priority"
                          value={formData.priority}
                          onChange={handleChange}
                          className="w-full h-11 xs:h-12 px-4 rounded-lg bg-background border-2 border-border focus:border-purple-500 outline-none text-sm transition-all cursor-pointer"
                          disabled={isSubmitting}
                        >
                          {PRIORITY_OPTIONS.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="space-y-1.5 xs:space-y-2">
                      <label className="text-[9px] xs:text-[10px] sm:text-xs font-black uppercase tracking-wider">
                        Subject <span className="text-red-500">*</span>
                      </label>
                      <input
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                        className={cn(
                          "w-full h-11 xs:h-12 px-4 rounded-lg bg-background border-2 transition-all text-sm",
                          errors.subject && touched.subject
                            ? "border-red-500 focus:border-red-500"
                            : "border-border focus:border-purple-500",
                        )}
                        placeholder="Brief subject"
                        disabled={isSubmitting}
                      />
                      {errors.subject && touched.subject && (
                        <p className="text-[9px] text-red-500 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-2.5 h-2.5" />
                          {errors.subject}
                        </p>
                      )}
                    </div>

                    <div className="space-y-1.5 xs:space-y-2">
                      <label className="text-[9px] xs:text-[10px] sm:text-xs font-black uppercase tracking-wider">
                        Message <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        rows={5}
                        required
                        className={cn(
                          "w-full p-3 xs:p-4 rounded-lg bg-background border-2 transition-all text-sm resize-none",
                          errors.message && touched.message
                            ? "border-red-500 focus:border-red-500"
                            : "border-border focus:border-purple-500",
                        )}
                        placeholder="Please share your inquiry in detail..."
                        disabled={isSubmitting}
                        maxLength={1000}
                      />
                      <div className="flex justify-between items-center">
                        {errors.message && touched.message && (
                          <p className="text-[9px] text-red-500 flex items-center gap-1">
                            <AlertCircle className="w-2.5 h-2.5" />
                            {errors.message}
                          </p>
                        )}
                        <p
                          className={`text-[8px] xs:text-[9px] ml-auto ${characterCount > 900 ? "text-amber-500" : "text-muted-foreground"}`}
                        >
                          {characterCount}/1000 characters
                        </p>
                      </div>
                    </div>

                    <input
                      type="text"
                      name="_gotcha"
                      style={{ display: "none" }}
                    />

                    {/* Priority Notice */}
                    {formData.priority !== "normal" && (
                      <div
                        className={`p-3 rounded-lg ${priorityColors.light} border ${priorityColors.border}`}
                      >
                        <div className="flex items-center gap-2">
                          {formData.priority === "urgent" ? (
                            <AlertCircle
                              className={`w-4 h-4 ${priorityColors.text}`}
                            />
                          ) : (
                            <AlertTriangle
                              className={`w-4 h-4 ${priorityColors.text}`}
                            />
                          )}
                          <p
                            className={`text-[9px] xs:text-[10px] font-medium ${priorityColors.text}`}
                          >
                            {formData.priority === "emergency"
                              ? "⚠️ Emergency priority selected. Our team will respond within 2-4 hours."
                              : "📢 Urgent priority selected. Our team will respond within 12-24 hours."}
                          </p>
                        </div>
                      </div>
                    )}

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full h-12 xs:h-13 rounded-lg bg-gradient-to-r ${selectedColors.gradient} hover:from-purple-700 hover:to-purple-800 text-white font-black text-xs sm:text-sm tracking-wider uppercase transition-all duration-300 group shadow-md hover:shadow-lg`}
                    >
                      {isSubmitting ? (
                        <Loader2 className="w-4 h-4 xs:w-5 xs:h-5 animate-spin mx-auto" />
                      ) : (
                        <span className="flex items-center justify-center gap-2">
                          SEND INQUIRY{" "}
                          <Send className="w-3.5 h-3.5 xs:w-4 xs:h-4 group-hover:translate-x-1 transition-transform" />
                        </span>
                      )}
                    </Button>

                    <p className="text-[9px] xs:text-[10px] text-center text-muted-foreground flex items-center justify-center gap-1">
                      <Shield className="w-2.5 h-2.5" />
                      Your information is protected. We never share your data.
                    </p>
                  </form>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* FAQ Accordion */}
            <div className="mt-8 xs:mt-10">
              <div className="flex items-center gap-2 mb-4">
                <HelpCircle className="w-4 h-4 text-purple-600" />
                <p className="text-[10px] xs:text-xs font-black uppercase tracking-wider text-purple-600">
                  Frequently Asked Questions
                </p>
              </div>
              <div className="space-y-3">
                {FAQS.map((faq, idx) => (
                  <div
                    key={idx}
                    className="border border-purple-200 dark:border-purple-800 rounded-lg overflow-hidden"
                  >
                    <button
                      onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                      className="w-full p-3 xs:p-4 text-left flex items-center justify-between hover:bg-purple-50/30 dark:hover:bg-purple-950/20 transition"
                    >
                      <span className="text-xs xs:text-sm font-black">
                        {faq.q}
                      </span>
                      <ChevronRight
                        className={cn(
                          "w-4 h-4 transition-transform",
                          openFaq === idx && "rotate-90",
                        )}
                      />
                    </button>
                    <AnimatePresence>
                      {openFaq === idx && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="border-t border-purple-200 dark:border-purple-800"
                        >
                          <p className="p-3 xs:p-4 text-xs xs:text-sm text-muted-foreground">
                            {faq.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Quranic Footer */}
        <div className="mt-12 xs:mt-16 sm:mt-20 md:mt-24 pt-6 xs:pt-8 sm:pt-10 md:pt-12 border-t-2 border-border/40 text-center">
          <p className="text-lg xs:text-xl sm:text-2xl font-arabic text-purple-600/60 mb-2 xs:mb-3">
            وَقُل رَّبِّ زِدْنِي عِلْمًا
          </p>
          <p className="text-[9px] xs:text-[10px] sm:text-xs text-muted-foreground">
            "My Lord, increase me in knowledge." - Surah Ta-Ha 20:114
          </p>
        </div>
      </div>
    </main>
  );
}