// app/(marketing)/onsite/about/onsite-about-client.tsx
"use client";

import { Reveal } from "@/components/shared/section-animation";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
    ArrowRight,
    Bed,
    BookOpen,
    Clock,
    Coffee,
    Compass,
    Crown,
    Droplet,
    Eye,
    GraduationCap,
    Heart,
    Home,
    MapPin,
    Moon,
    Quote,
    RefreshCw,
    Rocket,
    Shield,
    Star,
    Sun,
    Target,
    Users,
    Utensils
} from "lucide-react";
import Link from "next/link";

const DAILY_RHYTHM = [
  {
    time: "4:00 AM",
    activity: "Tahajjud Preparation",
    icon: Moon,
    color: "purple",
  },
  {
    time: "4:30 AM",
    activity: "Tahajjud Prayer",
    icon: Star,
    color: "amber",
  },
  {
    time: "5:00 AM",
    activity: "Personal Hygiene",
    icon: Droplet,
    color: "purple",
  },
  {
    time: "5:30 AM",
    activity: "Fajr Prayer",
    icon: Sun,
    color: "amber",
  },
  {
    time: "6:00 AM",
    activity: "Adhkaar & Qur'an Classes",
    icon: BookOpen,
    color: "purple",
  },
  {
    time: "8:00 AM",
    activity: "Morning Prep, Breakfast & Rest",
    icon: Coffee,
    color: "amber",
  },
  {
    time: "10:00 AM",
    activity: "Qur'an Classes",
    icon: BookOpen,
    color: "purple",
  },
  {
    time: "1:00 PM",
    activity: "Dhuhr Prayer",
    icon: Sun,
    color: "amber",
  },
  {
    time: "2:00 PM",
    activity: "Lunch & Rest",
    icon: Utensils,
    color: "purple",
  },
  {
    time: "4:00 PM",
    activity: "Asr Prayer",
    icon: Sun,
    color: "amber",
  },
  {
    time: "4:30 PM",
    activity: "Afternoon Session",
    icon: BookOpen,
    color: "purple",
  },
  {
    time: "7:00 PM",
    activity: "Maghrib Prayer, Adhkaar & Dinner",
    icon: Utensils,
    color: "amber",
  },
  {
    time: "8:00 PM",
    activity: "Isha Prayer & Night Revision",
    icon: Moon,
    color: "purple",
  },
  {
    time: "8:20 PM",
    activity: "Evening Revision & Review",
    icon: RefreshCw,
    color: "amber",
  },
  {
    time: "9:00 PM",
    activity: "Rest & Sleep",
    icon: Bed,
    color: "purple",
  },
];

const LEADERSHIP = [
  {
    name: "Shaykh Abubakar Al-Maysariy",
    role: "Founder & Chief Scholar",
    credentials: "Ijazah in 10 Qira'at",
    initials: "أ",
    bio: "Over 13 years teaching, trained 100+ certified Qurra.",
  },
  {
    name: "Ustadh Shu'ayb Abdullah",
    role: "Head of Hifz Department",
    credentials: "Ijazah in Hafs 'an 'Asim",
    initials: "ي",
    bio: "Guided 50+ students to complete memorization.",
  },
  {
    name: "Ustadhah Fatimah Alagbada",
    role: "Head of Female Education",
    credentials: "Ijazah in Tajweed",
    initials: "م",
    bio: "Dedicated to nurturing female students.",
  },
];

const TESTIMONIALS = [
  {
    name: "Abdulrahman",
    role: "Day Programme",
    content:
      "The structured environment transformed my memorization. In 18 months. Ustaz's guidance was invaluable.",
    initials: "ع",
  },
  {
    name: "Hafidh",
    role: "Day Programme",
    content:
      "Balancing school and memorization seemed impossible until we joined. The revision system kept me consistent.",
    initials: "ف",
  },
];

const VALUES = [
  {
    title: "Discipline",
    arabic: "الانضباط",
    description: "Structured daily routine from Fajr to Isha builds character.",
    icon: Clock,
    gradient: "from-purple-500 to-purple-600",
  },
  {
    title: "Community",
    arabic: "المجتمع",
    description: "Brotherhood and sisterhood fostering mutual growth.",
    icon: Users,
    gradient: "from-amber-500 to-amber-600",
  },
  {
    title: "Excellence",
    arabic: "الإتقان",
    description:
      "Pursuing perfection in memorization, recitation, and character.",
    icon: Target,
    gradient: "from-purple-500 to-purple-600",
  },
  {
    title: "Spirituality",
    arabic: "الروحانية",
    description:
      "Daily connection with Allah through Quran, prayer, and reflection.",
    icon: Heart,
    gradient: "from-amber-500 to-amber-600",
  },
];

// Helper for gradient text
const gradientText = (color: "purple" | "amber") => {
  return color === "purple"
    ? "bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent"
    : "bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent";
};

export default function OnsiteAboutClient() {
  return (
    <main className="relative bg-slate-950 overflow-hidden min-h-screen pt-24 md:pt-28">
      {/* Background - Clean */}
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
          <span className="text-amber-500">About</span>
        </nav>

        {/* ===== HERO ===== */}
        <section className="py-8 md:py-16">
          <Reveal>
            <div className="flex flex-col lg:flex-row lg:items-center gap-12 lg:gap-20">
              <div className="flex-1 space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-0.5 bg-gradient-to-r from-purple-500 to-amber-500" />
                  <span className="text-amber-500 font-black text-xs uppercase tracking-wider flex items-center gap-2">
                    <MapPin className="w-3 h-3" />
                    Ibadan, Nigeria • Residential & Day
                  </span>
                </div>
                <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tighter font-heading leading-[1.1] text-white">
                  A Sanctuary for{" "}
                  <span className="bg-gradient-to-r from-purple-400 via-amber-500 to-purple-400 bg-clip-text text-transparent">
                    Quran Memorization
                  </span>
                </h1>
                <p className="text-lg text-slate-300 max-w-lg leading-relaxed">
                  Daar-ul-Maysaroh is a full-time residential Quran memorization
                  institute where students immerse themselves in the divine
                  word, living and breathing the Quran daily.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link href="/onsite/admissions">
                    <Button className="rounded-full px-8 py-4 font-black bg-gradient-to-r from-purple-600 to-amber-500 text-white hover:shadow-xl shadow-purple-500/20 transition-all">
                      Apply Now
                      <ArrowRight className="w-4 h-4 ml-2 inline" />
                    </Button>
                  </Link>
                  <Link href="/onsite/visit">
                    <Button
                      variant="outline"
                      className="rounded-full px-8 py-4 font-black border-slate-700 text-slate-300 hover:bg-slate-800/50 transition-all"
                    >
                      Visit Campus
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Feature Icons - Vibrant with Glow */}
              <div className="flex-1 grid grid-cols-2 gap-5">
                {[
                  {
                    icon: GraduationCap,
                    label: "Full-Time",
                    gradient: "from-purple-500 to-purple-600",
                  },
                  {
                    icon: Home,
                    label: "Boarding & Day",
                    gradient: "from-amber-500 to-amber-600",
                  },
                  {
                    icon: BookOpen,
                    label: "Tahfeedh Focus",
                    gradient: "from-purple-500 to-purple-600",
                  },
                  {
                    icon: Shield,
                    label: "Ijazah Track",
                    gradient: "from-amber-500 to-amber-600",
                  },
                ].map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={i}
                      whileHover={{ y: -4, scale: 1.02 }}
                      className="flex items-center gap-4 p-4 rounded-2xl bg-slate-900/30 hover:bg-slate-900/50 transition-all group"
                    >
                      <div
                        className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center shadow-lg shadow-purple-500/20 group-hover:scale-110 transition-transform`}
                      >
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <span className="text-sm font-bold text-white">
                        {item.label}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </Reveal>
        </section>

        {/* ===== STATS - Vibrant Icons ===== */}
        <section className="py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            {[
              {
                value: "4",
                label: "Daily Sessions",
                icon: Clock,
                gradient: "from-purple-500 to-purple-600",
              },
              {
                value: "4:00 AM",
                label: "Day Starts",
                icon: Sun,
                gradient: "from-amber-500 to-amber-600",
              },
              {
                value: "9:00 PM",
                label: "Day Ends",
                icon: Moon,
                gradient: "from-purple-500 to-purple-600",
              },
              {
                value: "24/7",
                label: "Supervision",
                icon: Shield,
                gradient: "from-amber-500 to-amber-600",
              },
            ].map((stat, i) => {
              const Icon = stat.icon;
              return (
                <Reveal key={i} delay={i * 0.1}>
                  <div className="text-center group">
                    <div
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center mx-auto mb-3 shadow-lg shadow-purple-500/20 group-hover:scale-110 transition-transform`}
                    >
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <div
                      className={`text-2xl md:text-3xl font-black bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}
                    >
                      {stat.value}
                    </div>
                    <div className="text-xs text-slate-400 mt-1">
                      {stat.label}
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </section>

        {/* ===== MISSION & VISION ===== */}
        <section className="py-16 md:py-20">
          <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
            <Reveal>
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/30">
                  <Target className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-black text-white">Our Mission</h3>
                <p className="text-slate-300 leading-relaxed">
                  To produce carriers of the Quran who embody its character in
                  every facet of life, while preserving the Sanad for future
                  generations.
                </p>
                <div className="flex items-start gap-3">
                  <Quote className="w-5 h-5 text-amber-500 mt-1" />
                  <p className="text-sm italic text-slate-400">
                    "We don't just teach the Quran; we nurture carriers of the
                    Quran."
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/30">
                  <Eye className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-black text-white">Our Vision</h3>
                <p className="text-slate-300 leading-relaxed">
                  To become the world's most trusted institution for authentic
                  Quranic education, producing scholars who carry the light of
                  revelation.
                </p>
                <div className="flex items-start gap-3">
                  <Quote className="w-5 h-5 text-amber-500 mt-1" />
                  <p className="text-sm italic text-slate-400">
                    "A generation that carries the Word, and lives its Light."
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ===== DAILY RHYTHM - Clean Grid ===== */}
        <section className="py-16 md:py-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <Reveal>
              <div className="flex items-center justify-center gap-3 mb-3">
                <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-amber-500" />
                <span className="text-amber-500 font-black text-xs uppercase tracking-wider flex items-center gap-2">
                  <Clock className="w-3 h-3" />
                  Daily Rhythm
                </span>
                <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-amber-500" />
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter text-white">
                A Day at{" "}
                <span className="bg-gradient-to-r from-purple-400 to-amber-400 bg-clip-text text-transparent">
                  Daar-ul-Maysaroh
                </span>
              </h2>
            </Reveal>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-5xl mx-auto">
            {DAILY_RHYTHM.map((item, idx) => {
              const Icon = item.icon;
              const isPurple = item.color === "purple";
              return (
                <Reveal key={idx} delay={idx * 0.03}>
                  <div className="flex items-center gap-4 p-4 rounded-xl hover:bg-slate-900/30 transition-all group">
                    <div
                      className={`w-10 h-10 rounded-xl ${isPurple ? "bg-purple-600/20" : "bg-amber-500/20"} flex items-center justify-center group-hover:scale-110 transition-transform`}
                    >
                      <Icon
                        className={`w-4 h-4 ${isPurple ? "text-purple-400" : "text-amber-400"}`}
                      />
                    </div>
                    <div>
                      <p
                        className={`text-xs font-black ${isPurple ? "text-purple-400" : "text-amber-400"}`}
                      >
                        {item.time}
                      </p>
                      <p className="text-sm font-medium text-white">
                        {item.activity}
                      </p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </section>

        {/* ===== VALUES - Vibrant Icons ===== */}
        <section className="py-16 md:py-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <Reveal>
              <div className="flex items-center justify-center gap-3 mb-3">
                <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-purple-500" />
                <span className="text-purple-400 font-black text-xs uppercase tracking-wider flex items-center gap-2">
                  <Heart className="w-3 h-3" />
                  Our Foundation
                </span>
                <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-purple-500" />
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter text-white">
                Living the{" "}
                <span className="bg-gradient-to-r from-purple-400 to-amber-400 bg-clip-text text-transparent">
                  Values
                </span>
              </h2>
            </Reveal>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
            {VALUES.map((value, i) => {
              const Icon = value.icon;
              return (
                <Reveal key={i} delay={i * 0.1}>
                  <div className="text-center p-6 rounded-2xl hover:bg-slate-900/30 transition-all group">
                    <div
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${value.gradient} flex items-center justify-center mx-auto mb-4 shadow-lg shadow-purple-500/20 group-hover:scale-110 transition-transform`}
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-black text-lg text-white">
                      {value.title}
                    </h3>
                    <p className="text-[10px] font-black text-amber-500/70 mb-2">
                      {value.arabic}
                    </p>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </section>

        {/* ===== LEADERSHIP - Clean ===== */}
        <section className="py-16 md:py-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <Reveal>
              <div className="flex items-center justify-center gap-3 mb-3">
                <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-amber-500" />
                <span className="text-amber-500 font-black text-xs uppercase tracking-wider flex items-center gap-2">
                  <Users className="w-3 h-3" />
                  Our Team
                </span>
                <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-amber-500" />
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter text-white">
                Guiding the{" "}
                <span className="bg-gradient-to-r from-purple-400 to-amber-400 bg-clip-text text-transparent">
                  Vision
                </span>
              </h2>
            </Reveal>
          </div>

          <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {LEADERSHIP.map((leader, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="text-center p-6 rounded-2xl hover:bg-slate-900/30 transition-all group">
                  <div className="relative inline-block">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-600 to-amber-500 blur-xl opacity-0 group-hover:opacity-40 transition-opacity" />
                    <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-purple-600 to-amber-500 flex items-center justify-center text-white text-3xl font-black shadow-xl group-hover:scale-110 transition-transform">
                      {leader.initials}
                    </div>
                  </div>
                  <h3 className="font-black text-white text-sm mt-4">
                    {leader.name}
                  </h3>
                  <p className="text-amber-400 font-black text-[9px] uppercase">
                    {leader.role}
                  </p>
                  <p className="text-[10px] text-slate-500 mt-1">
                    {leader.credentials}
                  </p>
                  <p className="text-[9px] text-slate-500 mt-2">{leader.bio}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ===== JOURNEY - Vibrant ===== */}
        <section className="py-16 md:py-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <Reveal>
              <div className="flex items-center justify-center gap-3 mb-3">
                <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-purple-500" />
                <span className="text-purple-400 font-black text-xs uppercase tracking-wider flex items-center gap-2">
                  <Compass className="w-3 h-3" />
                  Your Journey
                </span>
                <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-purple-500" />
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter text-white">
                Path to{" "}
                <span className="bg-gradient-to-r from-purple-400 to-amber-400 bg-clip-text text-transparent">
                  Mastery
                </span>
              </h2>
            </Reveal>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                title: "Foundation",
                desc: "Qaida mastery, basic Makharij, and Juz Amma recitation.",
                icon: Star,
                color: "purple",
              },
              {
                title: "Building",
                desc: "Tajweed science, Juz Amma & Tabarak Hifz, memorization techniques.",
                icon: BookOpen,
                color: "amber",
              },
              {
                title: "Mastery",
                desc: "Full Quran Hifz, Mutashabihat mastery, and Sanad certification.",
                icon: Crown,
                color: "purple",
              },
            ].map((path, i) => {
              const Icon = path.icon;
              const isPurple = path.color === "purple";
              return (
                <Reveal key={i} delay={i * 0.1}>
                  <div className="text-center p-8 rounded-2xl hover:bg-slate-900/30 transition-all group">
                    <div
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${isPurple ? "from-purple-500 to-purple-600" : "from-amber-500 to-amber-600"} flex items-center justify-center mx-auto mb-4 shadow-lg shadow-purple-500/20 group-hover:scale-110 transition-transform`}
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3
                      className={`font-black text-xl ${isPurple ? "text-purple-400" : "text-amber-400"}`}
                    >
                      {path.title}
                    </h3>
                    <p className="text-sm text-slate-400 mt-2 leading-relaxed">
                      {path.desc}
                    </p>
                    <div className="mt-4 text-xs text-slate-600">
                      Step {i + 1} of 3
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </section>

        {/* ===== TESTIMONIALS ===== */}
        <section className="py-16 md:py-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <Reveal>
              <div className="flex items-center justify-center gap-3 mb-3">
                <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-amber-500" />
                <span className="text-amber-500 font-black text-xs uppercase tracking-wider flex items-center gap-2">
                  <Quote className="w-3 h-3" />
                  Student Stories
                </span>
                <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-amber-500" />
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter text-white">
                What Our{" "}
                <span className="bg-gradient-to-r from-purple-400 to-amber-400 bg-clip-text text-transparent">
                  Students
                </span>{" "}
                Say
              </h2>
            </Reveal>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {TESTIMONIALS.map((testimonial, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="p-6 rounded-2xl hover:bg-slate-900/30 transition-all">
                  <Quote className="w-6 h-6 text-amber-500/30 mb-3" />
                  <p className="text-sm text-slate-300 italic leading-relaxed">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center gap-3 mt-4 pt-4 border-t border-slate-800/50">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-amber-500 flex items-center justify-center text-white font-black shadow-lg">
                      {testimonial.initials}
                    </div>
                    <div>
                      <p className="font-black text-white text-sm">
                        {testimonial.name}
                      </p>
                      <p className="text-xs text-slate-400">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ===== CTA ===== */}
        <section className="py-16 md:py-20">
          <Reveal>
            <div className="max-w-3xl mx-auto text-center p-8 md:p-12 rounded-3xl bg-gradient-to-br from-purple-600/10 to-amber-500/10">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-600 to-amber-500 flex items-center justify-center mx-auto mb-5 shadow-xl shadow-purple-500/30">
                <Rocket className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-2xl md:text-3xl font-black text-white mb-4">
                Ready to Begin Your Journey?
              </h2>
              <p className="text-slate-300 mb-6 max-w-md mx-auto">
                Join Daar-ul-Maysaroh and start your path to Quranic excellence
                today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/onsite/admissions">
                  <Button className="rounded-full px-8 py-4 font-black bg-gradient-to-r from-purple-600 to-amber-500 text-white shadow-lg shadow-purple-500/20 hover:shadow-xl transition-all">
                    Apply Now
                    <ArrowRight className="w-4 h-4 ml-2 inline" />
                  </Button>
                </Link>
                <Link href="/onsite/contact">
                  <Button
                    variant="outline"
                    className="rounded-full px-8 py-4 font-black border-slate-700 text-slate-300 hover:bg-slate-800/50 transition-all"
                  >
                    Contact Us
                  </Button>
                </Link>
              </div>
              <p className="text-xs text-slate-400 mt-4">
                Free 20-minute assessment • No commitment
              </p>
            </div>
          </Reveal>
        </section>
      </div>
    </main>
  );
}
