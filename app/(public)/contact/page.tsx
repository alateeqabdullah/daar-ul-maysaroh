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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/shared/section-animation";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import Link from "next/link";

// REAL CONTACT INFO
const CONTACT_INFO = {
  email: "info.almaysaroh@gmail.com",
  phone: "+234 911 016 3930",
  whatsapp: "+234 911 016 3930",
  // address: "Nigeria | Global Online Campus",
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
  },
  {
    id: "bursar",
    name: "Financial Bursar",
    email: "info.almaysaroh@gmail.com",
    desc: "Bank transfers, receipt verification, scholarship grants.",
    icon: Landmark,
    arabic: "أمين الصندوق",
  },
  {
    id: "academic",
    name: "Academic Support",
    email: "info.almaysaroh@gmail.com",
    desc: "Schedule changes, teacher transitions, progress tracking.",
    icon: BookOpen,
    arabic: "الدعم الأكاديمي",
  },
  {
    id: "tech",
    name: "Technical Desk",
    email: "info.almaysaroh@gmail.com",
    desc: "Portal access, app feedback, classroom connectivity.",
    icon: Laptop,
    arabic: "الدعم التقني",
  },
];

export default function ContactHub() {
  const [isOfficeOpen, setIsOfficeOpen] = useState(false);
  const [selectedDept, setSelectedDept] = useState("admissions");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    studentId: "",
    subject: "",
    message: "",
    department: "admissions",
  });

  // Check office hours (Nigeria time UTC+1)
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    setFormData((prev) => ({ ...prev, department: selectedDept }));
  }, [selectedDept]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formDataToSend = new FormData();
    formDataToSend.append("fullName", formData.fullName);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("studentId", formData.studentId);
    formDataToSend.append("subject", formData.subject);
    formDataToSend.append("message", formData.message);
    formDataToSend.append("department", formData.department);
    formDataToSend.append("_replyto", formData.email);
    formDataToSend.append("_subject", `[Al-Maysaroh] ${formData.subject}`);

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
          description: "Our team will respond within 24 hours.",
        });

        setFormData({
          fullName: "",
          email: "",
          studentId: "",
          subject: "",
          message: "",
          department: selectedDept,
        });

        setTimeout(() => setIsSuccess(false), 5000);
      } else {
        toast.error("Submission Failed", {
          description: "Please try again or email us directly.",
        });
      }
    } catch (error) {
      toast.error("Network Error", {
        description: "Check your connection and try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedDeptInfo = DEPARTMENTS.find((d) => d.id === selectedDept);

  return (
    <main className="pt-48 sm:pt-32 md:pt-40 pb-20 sm:pb-28 md:pb-32 bg-background relative overflow-hidden">
      {/* Islamic Pattern Background - Bolder */}
      <div
        className="absolute inset-0 opacity-[0.03] bg-[url('/islamic-pattern.svg')] bg-center bg-repeat"
        style={{ backgroundSize: "200px" }}
      />

      {/* Large Celestial Orbs */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary-700/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-gold/10 rounded-full blur-3xl" />

      {/* Floating Stars - More Visible */}
      {[...Array(15)].map((_, i) => (
        <div
          key={i}
          className="absolute animate-pulse"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 8}s`,
            opacity: 0.15 + Math.random() * 0.2,
          }}
        >
          <Star className="w-3 h-3 text-gold fill-gold/20" />
        </div>
      ))}

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Hero Section - BOLD */}
        <div className="text-center mb-20 sm:mb-24 lg:mb-32">
          <Reveal>
            <div className="inline-flex font-arabic items-center gap-3 px-5 py-2 rounded-full bg-primary-100 dark:bg-primary-950/50 text-primary-700 text-sm font-black uppercase tracking-wider border border-primary-200/50 mb-8">
              <Heart className="w-4 h-4"  />
              بسم الله الرحمن الرحيم
              <Heart className="w-4 h-4" />
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tighter font-heading leading-[0.85] mb-8">
              Reach the{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-gold via-primary-600 to-primary-800">
                Scholars.
              </span>
            </h1>

            <p className="text-xl sm:text-2xl md:text-3xl text-muted-foreground font-light max-w-3xl mx-auto leading-relaxed">
            {`  Connect directly with our scholarly council. Whether you seek
              knowledge, need guidance, or wish to begin your journey - we're
              here.`}
            </p>
          </Reveal>
        </div>

        {/* Contact Cards - BOLD, LARGE */}
        <div className="grid font-arabic sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-20 lg:mb-28">
          {[
            {
              icon: Mail,
              label: "Email",
              value: CONTACT_INFO.email,
              href: `mailto:${CONTACT_INFO.email}`,
              arabic: "البريد الإلكتروني",
            },
            {
              icon: Phone,
              label: "Phone",
              value: CONTACT_INFO.phone,
              href: `tel:${CONTACT_INFO.phone}`,
              arabic: "الهاتف",
            },
            {
              icon: MessageCircle,
              label: "WhatsApp",
              value: CONTACT_INFO.whatsapp,
              href: `https://wa.me/${CONTACT_INFO.whatsapp.replace(/\D/g, "")}`,
              arabic: "واتساب",
            },
            {
              icon: Globe,
              label: "Location",
              value: CONTACT_INFO.address,
              href: "#",
              arabic: "الموقع",
            },
          ].map((item, idx) => (
            <Reveal key={idx} delay={idx * 0.1}>
              <Link
                href={item.href}
                target={item.label === "Location" ? "_self" : "_blank"}
                rel="noopener noreferrer"
                className="group block p-8 rounded-2xl bg-linear-to-br from-background to-primary-50/10 border-2 border-primary-700/20 hover:border-primary-700/60 transition-all duration-500 hover:-translate-y-2"
              >
                <div className="flex items-center gap-5 mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-primary-700/15 flex items-center justify-center group-hover:bg-primary-700/25 transition-colors">
                    <item.icon className="w-7 h-7 text-primary-700" />
                  </div>
                  <div>
                    <p className="text-sm text-primary-700 font-black uppercase tracking-wider">
                      {item.arabic}
                    </p>
                    <p className="text-xs text-muted-foreground font-medium">
                      {item.label}
                    </p>
                  </div>
                </div>
                <p className="text-base font-bold break-all group-hover:text-primary-700 transition-colors">
                  {item.value}
                </p>
              </Link>
            </Reveal>
          ))}
        </div>

        {/* Office Status Bar - More Visible */}
        <div className="mb-16 p-5 rounded-2xl bg-muted/40 border border-primary-700/20 text-center">
          <div className="flex items-center justify-center gap-4">
            <span
              className={cn(
                "w-3 h-3 rounded-full animate-pulse",
                isOfficeOpen ? "bg-accent" : "bg-red-500",
              )}
            />
            <p className="text-sm font-black uppercase tracking-wider">
              {isOfficeOpen
                ? "ADMISSIONS OFFICE OPEN — RESPONSE WITHIN 4 HOURS"
                : "OFFICE HOURS: 9AM - 6PM (WAT) • LEAVE A MESSAGE"}
            </p>
            <Clock className="w-4 h-4 text-muted-foreground" />
          </div>
        </div>

        {/* Department & Form Section - Larger Text */}
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-20">
          {/* Department Selector */}
          <div className="lg:col-span-5">
            <div className="space-y-4 sticky top-32">
              <div className="flex items-center gap-4 mb-8">
                <div className="h-px flex-1 bg-linear-to-r from-transparent to-primary-700/40" />
                <p className="text-sm font-arabic font-black uppercase tracking-wider text-primary-700">
                  الأقسام
                </p>
                <div className="h-px flex-1 bg-linear-to-l from-transparent to-primary-700/40" />
              </div>

              {DEPARTMENTS.map((dept) => (
                <button
                  key={dept.id}
                  onClick={() => setSelectedDept(dept.id)}
                  className={cn(
                    "w-full p-6 rounded-2xl border-2 transition-all duration-500 text-left group",
                    selectedDept === dept.id
                      ? "border-primary-700 bg-linear-to-r from-primary-700/10 to-transparent shadow-xl"
                      : "border-border hover:border-primary-700/40 hover:bg-primary-700/5",
                  )}
                >
                  <div className="flex items-center gap-5">
                    <div
                      className={cn(
                        "w-14 h-14 rounded-2xl flex items-center justify-center transition-all",
                        selectedDept === dept.id
                          ? "bg-primary-700 text-white scale-105"
                          : "bg-muted text-muted-foreground",
                      )}
                    >
                      <dept.icon className="w-7 h-7" />
                    </div>
                    <div className="flex-1">
                      <p className="font-black text-lg uppercase tracking-tight">
                        {dept.name}
                      </p>
                      <p className="text-sm font-arabic font-medium text-muted-foreground mt-1">
                        {dept.arabic}
                      </p>
                    </div>
                    <ChevronRight
                      className={cn(
                        "w-6 h-6 transition-all",
                        selectedDept === dept.id
                          ? "translate-x-0 opacity-100 text-primary-700"
                          : "-translate-x-4 opacity-0",
                      )}
                    />
                  </div>
                  <p className="text-sm text-muted-foreground mt-3 ml-19 pl-1">
                    {dept.desc}
                  </p>
                </button>
              ))}
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
                <div className="glass-surface p-8 md:p-10 lg:p-12 rounded-3xl border-2 border-primary-700/20 relative overflow-hidden shadow-2xl">
                  {isSuccess && (
                    <div className="absolute inset-0 bg-background/95 backdrop-blur-sm z-20 flex items-center justify-center">
                      <div className="bg-linear-to-br from-primary-50 to-background p-10 rounded-3xl text-center max-w-md mx-4 shadow-2xl border-2 border-primary-700/30">
                        <div className="w-20 h-20 mx-auto mb-5 rounded-full bg-primary-700/15 flex items-center justify-center">
                          <CheckCircle2 className="w-10 h-10 text-primary-700" />
                        </div>
                        <h3 className="font-black font-arabic text-2xl mb-3">
                          جزاك الله خيرًا
                        </h3>
                        <p className="text-base text-muted-foreground">
                          Your message has been received. Our team will respond
                          within 24 hours.
                        </p>
                        <Button
                          onClick={() => setIsSuccess(false)}
                          variant="outline"
                          className="mt-8 rounded-full px-8 py-3 text-base font-black"
                        >
                          Send Another
                        </Button>
                      </div>
                    </div>
                  )}

                  <div className="mb-8">
                    <h2 className="text-3xl font-black uppercase tracking-tighter">
                      Message to{" "}
                      <span className="text-primary-700">
                        {selectedDeptInfo?.name}
                      </span>
                    </h2>
                    <p className="text-lg text-muted-foreground mt-2">
                      {selectedDeptInfo?.desc}
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <label className="text-sm font-black uppercase tracking-wider">
                          Full Name *
                        </label>
                        <input
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleChange}
                          required
                          className="w-full h-14 px-5 rounded-xl bg-background border-2 border-border focus:border-primary-700/60 outline-none font-medium text-base transition-all"
                          placeholder="Enter your full name"
                          disabled={isSubmitting}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-black uppercase tracking-wider">
                          Email *
                        </label>
                        <input
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full h-14 px-5 rounded-xl bg-background border-2 border-border focus:border-primary-700/60 outline-none font-medium text-base transition-all"
                          placeholder="your@email.com"
                          disabled={isSubmitting}
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <label className="text-sm font-black uppercase tracking-wider">
                          Student ID (Optional)
                        </label>
                        <input
                          name="studentId"
                          value={formData.studentId}
                          onChange={handleChange}
                          placeholder="AM-XXXX"
                          className="w-full h-14 px-5 rounded-xl bg-background border-2 border-border focus:border-primary-700/60 outline-none font-medium text-base transition-all"
                          disabled={isSubmitting}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-black uppercase tracking-wider">
                          Subject *
                        </label>
                        <input
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                          className="w-full h-14 px-5 rounded-xl bg-background border-2 border-border focus:border-primary-700/60 outline-none font-medium text-base transition-all"
                          placeholder="Brief subject"
                          disabled={isSubmitting}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-black uppercase tracking-wider">
                        Message *
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={6}
                        required
                        className="w-full p-5 rounded-xl bg-background border-2 border-border focus:border-primary-700/60 outline-none font-medium text-base transition-all resize-none"
                        placeholder="Please share your inquiry in detail..."
                        disabled={isSubmitting}
                      />
                    </div>

                    <input
                      type="text"
                      name="_gotcha"
                      style={{ display: "none" }}
                    />

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-16 rounded-xl bg-primary-700 hover:bg-primary-800 text-white font-black text-base tracking-wider uppercase transition-all duration-300 group"
                    >
                      {isSubmitting ? (
                        <Loader2 className="w-6 h-6 animate-spin mx-auto" />
                      ) : (
                        <span className="flex items-center justify-center gap-3">
                          SEND INQUIRY{" "}
                          <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </span>
                      )}
                    </Button>

                    <p className="text-sm text-center text-muted-foreground">
                      {`We'll respond within 48 hours. Your information is
                      protected.`}
                    </p>
                  </form>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Quranic Footer - Large & Visible */}
        <div className="mt-24 pt-12 border-t-2 border-border/40 text-center">
          <p className="text-2xl font-arabic text-primary-700/60 mb-3">
            وَقُل رَّبِّ زِدْنِي عِلْمًا
          </p>
          <p className="text-sm text-muted-foreground">
           {` "My Lord, increase me in knowledge." - Surah Ta-Ha 20:114`}
          </p>
        </div>
      </div>
    </main>
  );
}
