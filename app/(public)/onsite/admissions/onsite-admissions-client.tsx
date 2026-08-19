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
  Users
} from "lucide-react";
import Link from "next/link";
import { FormEvent, useState } from "react";

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

const COLOR_STYLES = {
  purple: {
    text: "text-purple-400",
    border: "border-purple-800/30",
    bg: "bg-purple-600/20",
    gradient: "from-purple-500 to-purple-600",
    glow: "shadow-purple-500/30",
  },
  amber: {
    text: "text-amber-400",
    border: "border-amber-800/30",
    bg: "bg-amber-500/20",
    gradient: "from-amber-500 to-amber-600",
    glow: "shadow-amber-500/30",
  },
} as const;

const getColorStyles = (color: keyof typeof COLOR_STYLES) => {
  return COLOR_STYLES[color];
};

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
    <main className="relative bg-slate-950 overflow-hidden min-h-screen pt-24 md:pt-28">
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.02] bg-[url('/islamic-pattern.svg')] bg-center bg-repeat"
          style={{ backgroundSize: "300px" }}
        />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[150px]" />
      </div>

      <div className="container mx-auto px-4 xs:px-5 sm:px-6 relative z-10">
        {/* Breadcrumb */}
        <nav className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 flex items-center gap-2 mb-8 flex-wrap">
          <Link
            href="/onsite"
            className="hover:text-amber-500 transition-colors"
          >
            Home
          </Link>
          <span className="opacity-30">/</span>
          <span className="text-amber-500">Admissions</span>
        </nav>

        {/* ===== HERO ===== */}
        <section className="py-8 md:py-12">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 text-amber-500 font-black text-xs uppercase tracking-wider mb-4">
                <GraduationCap className="w-4 h-4" />
                Begin Your Journey
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter font-heading leading-[1.1] text-white">
                Join{" "}
                <span className="bg-gradient-to-r from-purple-400 to-amber-400 bg-clip-text text-transparent">
                  Daar-ul-Maysaroh
                </span>
              </h1>
              <p className="text-lg text-slate-300 max-w-2xl mx-auto mt-4">
                Begin your journey to Quranic excellence. Submit your
                application today and start your path to Ijazah.
              </p>
            </div>
          </Reveal>
        </section>

        {/* ===== STEPS ===== */}
        <section className="py-6 md:py-10">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
            {STEPS.map((step, idx) => {
              const Icon = step.icon;
              const colors = getColorStyles(step.color);
              return (
                <Reveal key={idx} delay={idx * 0.1}>
                  <div className="text-center p-6 rounded-2xl hover:bg-slate-900/30 transition-all group">
                    <div
                      className={`w-14 h-14 rounded-2xl ${colors.bg} flex items-center justify-center mx-auto mb-4 shadow-lg ${colors.glow} group-hover:scale-110 transition-transform`}
                    >
                      <Icon className={`w-7 h-7 ${colors.text}`} />
                    </div>
                    <p className={`text-xs font-black ${colors.text} mb-1`}>
                      {step.step}
                    </p>
                    <h3 className="font-black text-white text-sm">
                      {step.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">
                      {step.description}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </section>

        {/* ===== APPLICATION FORM ===== */}
        <section className="py-8 md:py-12">
          <div className="max-w-3xl mx-auto">
            <Reveal>
              <div className="flex items-center justify-center gap-3 mb-8">
                <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-purple-500" />
                <span className="text-purple-400 font-black text-xs uppercase tracking-wider flex items-center gap-2">
                  <FileText className="w-3 h-3" />
                  Application Form
                </span>
                <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-purple-500" />
              </div>
            </Reveal>

            <div className="p-6 md:p-8 rounded-3xl bg-slate-900/30 hover:bg-slate-900/50 transition-all">
              {/* Status Messages */}
              {submitStatus.type === "success" && (
                <div className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                  {submitStatus.message}
                </div>
              )}
              {submitStatus.type === "error" && (
                <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-center gap-2">
                  <Shield className="w-5 h-5 flex-shrink-0" />
                  {submitStatus.message}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-black uppercase tracking-wider text-slate-400">
                      Student's Full Name{" "}
                      <span className="text-amber-500">*</span>
                    </label>
                    <input
                      name="studentName"
                      value={formData.studentName}
                      onChange={handleChange}
                      className="w-full h-11 px-4 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all"
                      placeholder="Enter student name"
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-black uppercase tracking-wider text-slate-400">
                      Parent/Guardian Name{" "}
                      <span className="text-amber-500">*</span>
                    </label>
                    <input
                      name="parentName"
                      value={formData.parentName}
                      onChange={handleChange}
                      className="w-full h-11 px-4 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all"
                      placeholder="Enter parent name"
                      required
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-black uppercase tracking-wider text-slate-400">
                      Email <span className="text-amber-500">*</span>
                    </label>
                    <input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full h-11 px-4 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all"
                      placeholder="email@example.com"
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-black uppercase tracking-wider text-slate-400">
                      Phone <span className="text-amber-500">*</span>
                    </label>
                    <input
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full h-11 px-4 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all"
                      placeholder="+234 800 000 0000"
                      required
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-black uppercase tracking-wider text-slate-400">
                      Student's Age <span className="text-amber-500">*</span>
                    </label>
                    <input
                      name="age"
                      type="number"
                      value={formData.age}
                      onChange={handleChange}
                      className="w-full h-11 px-4 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all"
                      placeholder="e.g., 12"
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-black uppercase tracking-wider text-slate-400">
                      Preferred Programme{" "}
                      <span className="text-amber-500">*</span>
                    </label>
                    <select
                      name="programme"
                      value={formData.programme}
                      onChange={handleChange}
                      className="w-full h-11 px-4 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all"
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
                  <label className="text-xs font-black uppercase tracking-wider text-slate-400">
                    Message <span className="text-amber-500">(Optional)</span>
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full p-4 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all resize-none"
                    placeholder="Any additional information you'd like to share..."
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-12 rounded-xl font-black bg-gradient-to-r from-purple-600 to-amber-500 hover:from-purple-700 hover:to-amber-600 text-white shadow-lg shadow-purple-500/20 transition-all group disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      Submit Application
                      <Send className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </Button>

                <p className="text-center text-xs text-slate-500 flex items-center justify-center gap-1">
                  <Shield className="w-3 h-3 text-purple-400" />
                  Your information is secure. We'll contact you within 24 hours.
                </p>
              </form>
            </div>
          </div>
        </section>

        {/* ===== CONTACT INFO ===== */}
        <section className="py-6 md:py-10">
          <div className="max-w-3xl mx-auto text-center p-6 rounded-2xl bg-slate-900/30">
            <p className="text-sm text-slate-400">
              Questions? Contact us directly:
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-3">
              <a
                href="tel:+2349110163930"
                className="flex items-center gap-2 text-sm font-black text-amber-500 hover:text-amber-400 transition"
              >
                <Phone className="w-4 h-4" />
                +234 911 016 3930
              </a>
              <span className="text-slate-600">|</span>
              <a
                href="mailto:info.almaysaroh@gmail.com"
                className="flex items-center gap-2 text-sm font-black text-amber-500 hover:text-amber-400 transition"
              >
                <Mail className="w-4 h-4" />
                info.almaysaroh@gmail.com
              </a>
            </div>
          </div>
        </section>

        {/* ===== TRUST BADGE ===== */}
        <div className="text-center">
          <div className="inline-flex flex-wrap items-center justify-center gap-4 px-6 py-3 rounded-2xl bg-slate-900/30">
            <span className="flex items-center gap-2 text-xs text-slate-400">
              <Shield className="w-4 h-4 text-purple-400" />
              Ijazah Certified
            </span>
            <span className="flex items-center gap-2 text-xs text-slate-400">
              <Crown className="w-4 h-4 text-amber-400" />
              Authentic Sanad
            </span>
            <span className="flex items-center gap-2 text-xs text-slate-400">
              <Clock className="w-4 h-4 text-purple-400" />
              Full-Time Program
            </span>
          </div>
        </div>

        {/* ===== CTA ===== */}
        <section className="py-12 md:py-16">
          <Reveal>
            <div className="max-w-3xl mx-auto text-center p-8 md:p-10 rounded-3xl bg-gradient-to-br from-purple-600/10 to-amber-500/10">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-600 to-amber-500 flex items-center justify-center mx-auto mb-4 shadow-xl shadow-purple-500/30">
                <Rocket className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-black text-white mb-3">
                Start Your Journey Today
              </h2>
              <p className="text-slate-300 mb-5 max-w-md mx-auto">
                Join Daar-ul-Maysaroh and begin your path to Quranic excellence.
              </p>
              <Link href="/onsite/visit">
                <Button className="rounded-full px-8 py-4 font-black bg-gradient-to-r from-purple-600 to-amber-500 text-white shadow-lg shadow-purple-500/20 hover:shadow-xl transition-all">
                  Visit Our Campus
                  <ArrowRight className="w-4 h-4 ml-2 inline" />
                </Button>
              </Link>
            </div>
          </Reveal>
        </section>
      </div>
    </main>
  );
}
