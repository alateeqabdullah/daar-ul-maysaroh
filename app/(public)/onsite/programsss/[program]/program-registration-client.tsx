// app/(marketing)/onsite/programs/[program]/program-registration-client.tsx
"use client";

import { Reveal } from "@/components/shared/section-animation";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  Calendar,
  MapPin,
  Mail,
  Phone,
  Shield,
  Rocket,
  BookOpen,
  Heart,
  Star,
  Crown,
  Target,
  Sun,
  Moon,
  User,
  Mail as MailIcon,
  MessageCircle,
  Send,
  GraduationCap,
  Sparkles,
  Home,
  Utensils,
  Bed,
  Users,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";

const FEATURES_LIST = [
  {
    icon: BookOpen,
    title: "Tahfeedh",
    description: "Structured Quran memorization with daily revision",
    color: "purple",
  },
  {
    icon: Crown,
    title: "Tajweed Mastery",
    description: "Scientific recitation with proper pronunciation",
    color: "amber",
  },
  {
    icon: Users,
    title: "Community Learning",
    description: "Learn alongside dedicated students",
    color: "purple",
  },
  {
    icon: Heart,
    title: "Spiritual Growth",
    description: "Character development and Islamic values",
    color: "amber",
  },
];

const getColorStyles = (color: string) => {
  return {
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
  }[color];
};

interface ProgramRegistrationProps {
  program: {
    title: string;
    subtitle: string;
    icon: string;
    schedule: string;
    time: string;
    badge: string;
    description: string;
    features: string[];
    price: string;
  };
}

export default function ProgramRegistrationClient({
  program,
}: ProgramRegistrationProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    age: "",
    gender: "",
    previousQuran: "",
    message: "",
    agreeTerms: false,
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
  };

  const Icon =
    program.icon === "Sun" ? Sun : program.icon === "Moon" ? Moon : Home;

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
          <Link
            href="/onsite/programs"
            className="hover:text-amber-500 transition-colors"
          >
            Programs
          </Link>
          <span className="opacity-30">/</span>
          <span className="text-amber-500">{program.title}</span>
        </nav>

        {/* ===== HERO ===== */}
        <section className="py-8 md:py-12">
          <Reveal>
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 text-amber-500 font-black text-xs uppercase tracking-wider">
                  <GraduationCap className="w-4 h-4" />
                  {program.badge} Programme
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tighter font-heading leading-[1.1] text-white">
                  {program.title}
                  <span className="block bg-gradient-to-r from-purple-400 to-amber-400 bg-clip-text text-transparent text-3xl md:text-4xl mt-2">
                    {program.subtitle}
                  </span>
                </h1>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 text-sm text-slate-300">
                    <Calendar className="w-4 h-4 text-amber-500" />
                    {program.schedule}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-300">
                    <Clock className="w-4 h-4 text-purple-400" />
                    {program.time}
                  </div>
                </div>
                <p className="text-lg text-slate-300 leading-relaxed">
                  {program.description}
                </p>
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {[...Array(4)].map((_, i) => (
                      <div
                        key={i}
                        className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-amber-500 border-2 border-slate-900 flex items-center justify-center text-white text-[8px] font-black"
                      >
                        {String.fromCharCode(65 + i)}
                      </div>
                    ))}
                  </div>
                  <span className="text-xs text-slate-400">
                    Join 50+ students
                  </span>
                </div>
              </div>

              {/* Program Card */}
              <div className="p-6 md:p-8 rounded-3xl bg-slate-900/30 hover:bg-slate-900/50 transition-all">
                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-purple-500/30`}
                >
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-black text-white text-center">
                  {program.title}
                </h3>
                <p className="text-sm text-slate-400 text-center mt-1">
                  {program.schedule}
                </p>

                <div className="mt-6 space-y-3">
                  {program.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0" />
                      <span className="text-slate-300">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t border-slate-800/50 text-center">
                  <p className="text-xs text-slate-400">Tuition</p>
                  <p className="text-2xl font-black text-amber-500">
                    {program.price}
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* ===== REGISTRATION FORM ===== */}
        <section className="py-8 md:py-12">
          <div className="max-w-3xl mx-auto">
            <Reveal>
              <div className="flex items-center justify-center gap-3 mb-8">
                <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-purple-500" />
                <span className="text-purple-400 font-black text-xs uppercase tracking-wider flex items-center gap-2">
                  <User className="w-3 h-3" />
                  Registration Form
                </span>
                <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-purple-500" />
              </div>
            </Reveal>

            <div className="p-6 md:p-8 rounded-3xl bg-slate-900/30 hover:bg-slate-900/50 transition-all">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-black uppercase tracking-wider text-slate-400">
                      Full Name <span className="text-amber-500">*</span>
                    </label>
                    <input
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="w-full h-11 px-4 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
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
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
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
                  <div className="space-y-1.5">
                    <label className="text-xs font-black uppercase tracking-wider text-slate-400">
                      Age <span className="text-amber-500">*</span>
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
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-black uppercase tracking-wider text-slate-400">
                      Gender <span className="text-amber-500">*</span>
                    </label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      className="w-full h-11 px-4 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all"
                      required
                    >
                      <option value="">Select gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-black uppercase tracking-wider text-slate-400">
                      Previous Quran Study
                    </label>
                    <input
                      name="previousQuran"
                      value={formData.previousQuran}
                      onChange={handleChange}
                      className="w-full h-11 px-4 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all"
                      placeholder="e.g., Some Tajweed, Juz Amma"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-black uppercase tracking-wider text-slate-400">
                    Additional Notes
                  </label>
                  <textarea
                    name="message"
                    rows={3}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full p-4 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all resize-none"
                    placeholder="Any special requirements or questions..."
                  />
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="agreeTerms"
                    name="agreeTerms"
                    checked={formData.agreeTerms}
                    onChange={handleChange}
                    className="w-4 h-4 rounded border-slate-700 bg-slate-900/50 text-purple-600 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-slate-950"
                    required
                  />
                  <label
                    htmlFor="agreeTerms"
                    className="text-xs text-slate-400"
                  >
                    I agree to the{" "}
                    <Link
                      href="/onsite/terms"
                      className="text-amber-500 hover:underline"
                    >
                      Terms & Conditions
                    </Link>{" "}
                    and{" "}
                    <Link
                      href="/onsite/privacy"
                      className="text-amber-500 hover:underline"
                    >
                      Privacy Policy
                    </Link>
                  </label>
                </div>

                <Button
                  type="submit"
                  disabled={!formData.agreeTerms}
                  className="w-full h-12 rounded-xl font-black bg-gradient-to-r from-purple-600 to-amber-500 hover:from-purple-700 hover:to-amber-600 text-white shadow-lg shadow-purple-500/20 transition-all group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Register for {program.title}
                  <Send className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>

                <p className="text-center text-xs text-slate-500 flex items-center justify-center gap-1">
                  <Shield className="w-3 h-3 text-purple-400" />
                  Your information is secure. We'll contact you within 24 hours.
                </p>
              </form>
            </div>
          </div>
        </section>

        {/* ===== FEATURES ===== */}
        <section className="py-8 md:py-12">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <Reveal>
              <div className="flex items-center justify-center gap-3 mb-3">
                <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-amber-500" />
                <span className="text-amber-500 font-black text-xs uppercase tracking-wider flex items-center gap-2">
                  <Sparkles className="w-3 h-3" />
                  What You'll Experience
                </span>
                <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-amber-500" />
              </div>
            </Reveal>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-4xl mx-auto">
            {FEATURES_LIST.map((feature, idx) => {
              const Icon = feature.icon;
              const colors = getColorStyles(feature.color);
              return (
                <Reveal key={idx} delay={idx * 0.1}>
                  <div className="text-center p-6 rounded-2xl hover:bg-slate-900/30 transition-all group">
                    <div
                      className={`w-14 h-14 rounded-2xl ${colors.bg} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}
                    >
                      <Icon className={`w-7 h-7 ${colors.text}`} />
                    </div>
                    <h3 className={`font-black text-sm ${colors.text}`}>
                      {feature.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">
                      {feature.description}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </section>

        {/* ===== CONTACT ===== */}
        <section className="py-6 md:py-10">
          <div className="max-w-3xl mx-auto text-center p-6 rounded-2xl bg-slate-900/30">
            <p className="text-sm text-slate-400">
              Have questions about this programme?
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
        <div className="text-center pb-8">
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
              Flexible Schedule
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}
