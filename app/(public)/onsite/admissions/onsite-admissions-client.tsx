// app/(marketing)/onsite/admissions/onsite-admissions-client.tsx
"use client";

import { Reveal } from "@/components/shared/section-animation";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  Crown,
  FileText,
  GraduationCap,
  Loader2,
  Mail,
  Phone,
  Rocket,
  Send,
  Shield,
  Users,
  Sparkles,
  ChevronRight,
  Building2,
  Calendar,
  Target,
  Award,
} from "lucide-react";
import Link from "next/link";
import { FormEvent, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

const STEPS = [
  {
    step: "01",
    title: "Submit Application",
    description: "Complete the online application form with student details",
    icon: FileText,
    color: "purple",
  },
  {
    step: "02",
    title: "Placement Assessment",
    description: "Schedule and complete a level assessment with our scholars",
    icon: Users,
    color: "amber",
  },
  {
    step: "03",
    title: "Enrollment & Payment",
    description: "Complete registration and fee payment",
    icon: GraduationCap,
    color: "purple",
  },
  {
    step: "04",
    title: "Begin Your Journey",
    description: "Start your Quran memorization journey at Daar-ul-Maysaroh",
    icon: Rocket,
    color: "amber",
  },
] as const;

// ============================================================
// COLOR STYLES - SUPPORTS BOTH LIGHT & DARK
// ============================================================

const COLOR_STYLES = {
  purple: {
    text: "text-purple-700 dark:text-purple-400",
    border: "border-purple-200 dark:border-purple-800/30",
    bg: "bg-purple-100 dark:bg-purple-600/20",
    lightBg: "bg-purple-50 dark:bg-purple-950/40",
    gradient:
      "from-purple-600 to-purple-700 dark:from-purple-500 dark:to-purple-600",
    glow: "shadow-purple-500/30 dark:shadow-purple-500/30",
    hover: "hover:bg-purple-50 dark:hover:bg-purple-600/10",
  },
  amber: {
    text: "text-amber-700 dark:text-amber-400",
    border: "border-amber-200 dark:border-amber-800/30",
    bg: "bg-amber-100 dark:bg-amber-500/20",
    lightBg: "bg-amber-50 dark:bg-amber-950/40",
    gradient:
      "from-amber-500 to-amber-600 dark:from-amber-500 dark:to-amber-600",
    glow: "shadow-amber-500/30 dark:shadow-amber-500/30",
    hover: "hover:bg-amber-50 dark:hover:bg-amber-500/10",
  },
} as const;

const getColorStyles = (color: keyof typeof COLOR_STYLES) => {
  return COLOR_STYLES[color];
};

// ============================================================
// FLOATING PARTICLES
// ============================================================

function FloatingParticles({ count = 6 }: { count?: number }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(count)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-purple-500/30 dark:bg-purple-500/20"
          animate={{
            y: [0, -60 + i * 5],
            x: [0, (i % 2 === 0 ? 30 : -30) + i * 2],
            opacity: [0, 0.4, 0],
          }}
          transition={{
            duration: 5 + i,
            repeat: Infinity,
            delay: i * 0.4,
            ease: "easeInOut",
          }}
          style={{
            left: `${10 + i * 12}%`,
            top: `${20 + i * 10}%`,
          }}
        />
      ))}
    </div>
  );
}

// ============================================================
// MAIN COMPONENT
// ============================================================

export default function OnsiteAdmissionsClient() {
  const [formData, setFormData] = useState({
    studentName: "",
    parentName: "",
    email: "",
    phone: "",
    age: "",
    programme: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const formRef = useRef(null);
  const isFormInView = useInView(formRef, { once: true, margin: "-100px" });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      const response = await fetch("https://formspree.io/f/mdenyaln", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          studentName: formData.studentName,
          parentName: formData.parentName,
          email: formData.email,
          phone: formData.phone,
          age: formData.age,
          programme: formData.programme,
          message: formData.message,
        }),
      });

      if (response.ok) {
        setSubmitStatus({
          type: "success",
          message:
            "✅ Application submitted successfully! We'll contact you within 24 hours.",
        });
        setFormData({
          studentName: "",
          parentName: "",
          email: "",
          phone: "",
          age: "",
          programme: "",
          message: "",
        });
      } else {
        setSubmitStatus({
          type: "error",
          message:
            "❌ Something went wrong. Please try again or contact us directly.",
        });
      }
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message:
          "❌ Network error. Please check your connection and try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="relative bg-background dark:bg-slate-950 overflow-hidden min-h-screen pt-24 md:pt-28">
      {/* Premium Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.02] dark:opacity-[0.02] bg-[url('/islamic-pattern.svg')] bg-center bg-repeat"
          style={{ backgroundSize: "300px" }}
        />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-600/10 dark:bg-purple-600/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-amber-500/10 dark:bg-amber-500/10 rounded-full blur-[150px]" />
        <FloatingParticles count={8} />
      </div>

      <div className="container mx-auto px-4 xs:px-5 sm:px-6 relative z-10">
        {/* Breadcrumb */}
        <nav className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground flex items-center gap-2 mb-8 flex-wrap">
          <Link
            href="/onsite"
            className="hover:text-purple-600 dark:hover:text-amber-500 transition-colors"
          >
            Home
          </Link>
          <span className="opacity-30">/</span>
          <span className="text-purple-600 dark:text-amber-500">
            Admissions
          </span>
        </nav>

        {/* ===== HERO ===== */}
        <section className="py-8 md:py-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 text-amber-600 dark:text-amber-500 font-black text-xs uppercase tracking-wider mb-4">
              <GraduationCap className="w-4 h-4" />
              Begin Your Journey
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter font-heading leading-[1.1] text-foreground">
              Join{" "}
              <span className="bg-gradient-to-r from-purple-600 to-amber-600 dark:from-purple-400 dark:to-amber-400 bg-clip-text text-transparent">
                Daar-ul-Maysaroh
              </span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mt-4">
              Begin your journey to Quranic excellence. Submit your application
              today and start your path to Ijazah.
            </p>
          </motion.div>
        </section>

        {/* ===== STEPS ===== */}
        <section className="py-6 md:py-10">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
            {STEPS.map((step, idx) => {
              const Icon = step.icon;
              const colors = getColorStyles(step.color);
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ y: -6 }}
                  className="text-center p-6 rounded-2xl bg-card/50 dark:bg-slate-900/30 hover:bg-card/60 dark:hover:bg-slate-900/50 transition-all group border border-border dark:border-slate-800/30"
                >
                  <div
                    className={`w-14 h-14 rounded-2xl ${colors.lightBg} flex items-center justify-center mx-auto mb-4 shadow-lg ${colors.glow} group-hover:scale-110 transition-transform`}
                  >
                    <Icon className={`w-7 h-7 ${colors.text}`} />
                  </div>
                  <p className={`text-xs font-black ${colors.text} mb-1`}>
                    {step.step}
                  </p>
                  <h3 className="font-black text-foreground text-sm">
                    {step.title}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    {step.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* ===== APPLICATION FORM ===== */}
        <section ref={formRef} className="py-8 md:py-12">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isFormInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="flex items-center justify-center gap-3 mb-8"
            >
              <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-purple-500" />
              <span className="text-purple-700 dark:text-purple-400 font-black text-xs uppercase tracking-wider flex items-center gap-2">
                <FileText className="w-3 h-3" />
                Application Form
              </span>
              <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-purple-500" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isFormInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="p-6 md:p-8 rounded-3xl bg-card/50 dark:bg-slate-900/30 hover:bg-card/60 dark:hover:bg-slate-900/50 transition-all border border-border dark:border-slate-800/30 shadow-xl"
            >
              {/* Status Messages */}
              {submitStatus.type === "success" && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-sm flex items-center gap-3"
                >
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                  {submitStatus.message}
                </motion.div>
              )}
              {submitStatus.type === "error" && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-sm flex items-center gap-3"
                >
                  <Shield className="w-5 h-5 flex-shrink-0" />
                  {submitStatus.message}
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-black uppercase tracking-wider text-muted-foreground">
                      Student's Full Name{" "}
                      <span className="text-amber-500">*</span>
                    </label>
                    <input
                      name="studentName"
                      value={formData.studentName}
                      onChange={handleChange}
                      className="w-full h-11 px-4 rounded-xl border border-border bg-card/50 focus:border-purple-500 dark:focus:border-purple-400 outline-none text-foreground text-sm transition-all duration-300"
                      placeholder="Enter student name"
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-black uppercase tracking-wider text-muted-foreground">
                      Parent/Guardian Name{" "}
                      <span className="text-amber-500">*</span>
                    </label>
                    <input
                      name="parentName"
                      value={formData.parentName}
                      onChange={handleChange}
                      className="w-full h-11 px-4 rounded-xl border border-border bg-card/50 focus:border-purple-500 dark:focus:border-purple-400 outline-none text-foreground text-sm transition-all duration-300"
                      placeholder="Enter parent name"
                      required
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-black uppercase tracking-wider text-muted-foreground">
                      Email <span className="text-amber-500">*</span>
                    </label>
                    <input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full h-11 px-4 rounded-xl border border-border bg-card/50 focus:border-purple-500 dark:focus:border-purple-400 outline-none text-foreground text-sm transition-all duration-300"
                      placeholder="email@example.com"
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-black uppercase tracking-wider text-muted-foreground">
                      Phone <span className="text-amber-500">*</span>
                    </label>
                    <input
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full h-11 px-4 rounded-xl border border-border bg-card/50 focus:border-purple-500 dark:focus:border-purple-400 outline-none text-foreground text-sm transition-all duration-300"
                      placeholder="+234 800 000 0000"
                      required
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-black uppercase tracking-wider text-muted-foreground">
                      Student's Age <span className="text-amber-500">*</span>
                    </label>
                    <input
                      name="age"
                      type="number"
                      value={formData.age}
                      onChange={handleChange}
                      className="w-full h-11 px-4 rounded-xl border border-border bg-card/50 focus:border-purple-500 dark:focus:border-purple-400 outline-none text-foreground text-sm transition-all duration-300"
                      placeholder="e.g., 12"
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-black uppercase tracking-wider text-muted-foreground">
                      Preferred Programme{" "}
                      <span className="text-amber-500">*</span>
                    </label>
                    <select
                      name="programme"
                      value={formData.programme}
                      onChange={handleChange}
                      className="w-full h-11 px-4 rounded-xl border border-border bg-card/50 focus:border-purple-500 dark:focus:border-purple-400 outline-none text-foreground text-sm transition-all duration-300"
                      required
                    >
                      <option value="">Select programme</option>
                      <option value="part-time-day">Part-Time Day</option>
                      <option value="full-time-day">Full-Time Day</option>
                      <option value="part-time-boarding">
                        Part-Time Boarding
                      </option>
                      <option value="full-time-boarding">
                        Full-Time Boarding
                      </option>
                      <option value="flexible">Flexible / Custom</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-black uppercase tracking-wider text-muted-foreground">
                    Message <span className="text-amber-500">(Optional)</span>
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full p-4 rounded-xl border border-border bg-card/50 focus:border-purple-500 dark:focus:border-purple-400 outline-none text-foreground text-sm transition-all duration-300 resize-none placeholder:text-muted-foreground/50"
                    placeholder="Any additional information you'd like to share..."
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-12 rounded-xl font-black bg-gradient-to-r from-purple-600 to-amber-500 hover:from-purple-700 hover:to-amber-600 text-white shadow-2xl shadow-purple-500/30 hover:shadow-purple-500/50 transition-all duration-300 group disabled:opacity-70 disabled:cursor-not-allowed relative overflow-hidden"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <span className="relative z-10 flex items-center">
                        Submit Application
                        <Send className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </span>
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                        animate={{ x: ["-100%", "200%"] }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      />
                    </>
                  )}
                </Button>

                <p className="text-center text-xs text-muted-foreground flex items-center justify-center gap-1">
                  <Shield className="w-3 h-3 text-purple-600 dark:text-purple-400" />
                  Your information is secure. We'll contact you within 24 hours.
                </p>
              </form>
            </motion.div>
          </div>
        </section>

        {/* ===== CONTACT INFO ===== */}
        <section className="py-6 md:py-10">
          <div className="max-w-3xl mx-auto text-center p-6 rounded-2xl bg-card/50 dark:bg-slate-900/30 border border-border dark:border-slate-800/30">
            <p className="text-sm text-muted-foreground">
              Questions? Contact us directly:
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-3">
              <a
                href="tel:+2349110163930"
                className="flex items-center gap-2 text-sm font-black text-amber-600 dark:text-amber-500 hover:text-amber-700 dark:hover:text-amber-400 transition"
              >
                <Phone className="w-4 h-4" />
                +234 911 016 3930
              </a>
              <span className="text-muted-foreground/50">|</span>
              <a
                href="mailto:info.almaysaroh@gmail.com"
                className="flex items-center gap-2 text-sm font-black text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition"
              >
                <Mail className="w-4 h-4" />
                info.almaysaroh@gmail.com
              </a>
            </div>
          </div>
        </section>

        {/* ===== TRUST BADGE ===== */}
        <div className="text-center">
          <div className="inline-flex flex-wrap items-center justify-center gap-4 px-6 py-3 rounded-2xl bg-card/50 dark:bg-slate-900/30 border border-border dark:border-slate-800/30">
            <span className="flex items-center gap-2 text-xs text-muted-foreground">
              <Shield className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              Ijazah Certified
            </span>
            <span className="flex items-center gap-2 text-xs text-muted-foreground">
              <Crown className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              Authentic Sanad
            </span>
            <span className="flex items-center gap-2 text-xs text-muted-foreground">
              <Clock className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              Full-Time Program
            </span>
          </div>
        </div>

        {/* ===== CTA ===== */}
        <section className="py-12 md:py-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center p-8 md:p-10 rounded-3xl bg-gradient-to-br from-purple-50/30 to-amber-50/30 dark:from-purple-600/10 dark:to-amber-500/10 border border-purple-200 dark:border-purple-800/30"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-600 to-amber-500 flex items-center justify-center mx-auto mb-4 shadow-xl shadow-purple-500/30"
            >
              <Rocket className="w-8 h-8 text-white" />
            </motion.div>
            <h2 className="text-2xl font-black text-foreground mb-3">
              Start Your Journey Today
            </h2>
            <p className="text-muted-foreground mb-5 max-w-md mx-auto">
              Join Daar-ul-Maysaroh and begin your path to Quranic excellence.
            </p>
            <Link href="/onsite/visit">
              <Button className="rounded-full px-8 py-4 font-black bg-gradient-to-r from-purple-600 to-amber-500 hover:from-purple-700 hover:to-amber-600 text-white shadow-2xl shadow-purple-500/30 hover:shadow-purple-500/50 transition-all duration-300 group">
                Visit Our Campus
                <ArrowRight className="w-4 h-4 ml-2 inline group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>
        </section>
      </div>
    </main>
  );
}
