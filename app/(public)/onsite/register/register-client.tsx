// app/(marketing)/onsite/register/register-client.tsx
"use client";

import { Reveal } from "@/components/shared/section-animation";
import { Button } from "@/components/ui/button";
import {
  Clock,
  Mail,
  Phone,
  Shield,
  Send,
  GraduationCap,
  Sun,
  Moon,
  Home,
  Crown,
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

const PROGRAM_DETAILS: Record<string, any> = {
  "part-time-day": {
    title: "Part-Time Day",
    icon: Sun,
    color: "amber",
    schedule: "Sat - Sun",
    time: "9:00 AM - 4:30 PM",
    badge: "Weekend",
    features: [
      "2 days per week",
      "Full academic program",
      "Tahfeedh & Tajweed",
      "Islamic Studies",
    ],
  },
  "full-time-day": {
    title: "Full-Time Day",
    icon: Sun,
    color: "purple",
    schedule: "Sat - Sun & Mon - Wed",
    time: "Sat-Sun: 9-4:30 • Mon-Wed: 4:30-6:30",
    badge: "Most Popular",
    features: [
      "5 days per week",
      "Extended learning hours",
      "Complete curriculum",
      "Accelerated progress",
    ],
  },
  "part-time-boarding": {
    title: "Part-Time Boarding",
    icon: Moon,
    color: "amber",
    schedule: "Fri - Sun",
    time: "Fri 4:30PM - Sun 4:30PM",
    badge: "Weekend Intensive",
    features: [
      "Weekend immersion",
      "On-campus accommodation",
      "Full supervision",
      "Community experience",
    ],
  },
  "full-time-boarding": {
    title: "Full-Time Boarding",
    icon: Moon,
    color: "purple",
    schedule: "Daily",
    time: "Full-time residential",
    badge: "Premium",
    features: [
      "Full-time campus living",
      "Immersive environment",
      "24/7 supervision",
      "Accelerated memorization",
    ],
  },
};

const getColorStyles = (color: string) => {
  const map = {
    purple: {
      text: "text-purple-400",
      border: "border-purple-800/30",
      bg: "bg-purple-600/20",
      linear: "from-purple-500 to-purple-600",
      glow: "shadow-purple-500/30",
    },
    amber: {
      text: "text-amber-400",
      border: "border-amber-800/30",
      bg: "bg-amber-500/20",
      linear: "from-amber-500 to-amber-600",
      glow: "shadow-amber-500/30",
    },
  } as const;
  return map[color as keyof typeof map] ?? map.purple;
};

export default function RegisterClient() {
  const searchParams = useSearchParams();
  const programSlug = searchParams.get("program");
  const [selectedProgram, setSelectedProgram] = useState<string | null>(null);

  useEffect(() => {
    if (programSlug && PROGRAM_DETAILS[programSlug]) {
      setSelectedProgram(programSlug);
    }
  }, [programSlug]);

  const program = selectedProgram ? PROGRAM_DETAILS[selectedProgram] : null;
  const colors = program
    ? getColorStyles(program.color)
    : getColorStyles("purple");

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
    console.log("Form submitted:", { ...formData, program: selectedProgram });
  };

  const Icon = program?.icon || Home;

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
          <span className="text-amber-500">Register</span>
        </nav>

        {/* ===== HERO ===== */}
        <section className="py-8 md:py-12">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 text-amber-500 font-black text-xs uppercase tracking-wider mb-4">
                <GraduationCap className="w-4 h-4" />
                {program
                  ? `Register for ${program.title}`
                  : "Program Registration"}
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter font-heading leading-[1.1] text-white">
                Begin Your{" "}
                <span className="bg-linear-to-r from-purple-400 to-amber-400 bg-clip-text text-transparent">
                  Journey
                </span>
              </h1>
              <p className="text-lg text-slate-300 max-w-2xl mx-auto mt-4">
                Complete the form below to register for your chosen programme.
              </p>
            </div>
          </Reveal>
        </section>

        {/* ===== PROGRAM SUMMARY ===== */}
        {program && (
          <section className="py-4">
            <div className="max-w-3xl mx-auto p-6 rounded-2xl bg-slate-900/30">
              <div className="flex items-center gap-4">
                <div
                  className={`w-12 h-12 rounded-xl ${colors.bg} flex items-center justify-center`}
                >
                  <Icon className={`w-6 h-6 ${colors.text}`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 flex-wrap">
                    <h3 className="font-black text-white text-lg">
                      {program.title}
                    </h3>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[8px] font-black ${colors.bg} ${colors.text}`}
                    >
                      {program.badge}
                    </span>
                  </div>
                  <p className="text-sm text-slate-400">
                    {program.schedule} • {program.time}
                  </p>
                </div>
                <Link href="/onsite/programs">
                  <Button
                    variant="outline"
                    className="rounded-xl py-1.5 font-black text-xs border-slate-700 text-slate-300 hover:bg-slate-800/50"
                  >
                    Change
                  </Button>
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* ===== REGISTRATION FORM ===== */}
        <section className="py-8 md:py-12">
          <div className="max-w-3xl mx-auto">
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
                  className="w-full h-12 rounded-xl font-black bg-linear-to-r from-purple-600 to-amber-500 hover:from-purple-700 hover:to-amber-600 text-white shadow-lg shadow-purple-500/20 transition-all group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Register Now
                  <Send className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>

                <p className="text-center text-xs text-slate-500 flex items-center justify-center gap-1">
                  <Shield className="w-3 h-3 text-purple-400" />
                 {` Your information is secure. We'll contact you within 24 hours.`}
                </p>
              </form>
            </div>
          </div>
        </section>

        {/* ===== CONTACT ===== */}
        <section className="py-6 md:py-10">
          <div className="max-w-3xl mx-auto text-center p-6 rounded-2xl bg-slate-900/30">
            <p className="text-sm text-slate-400">
              Have questions about registration?
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
