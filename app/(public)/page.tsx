// app/(marketing)/page.tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  Globe,
  Building2,
  ShieldCheck,
  Users,
  Award,
  Sparkles,
  BookOpen,
  Crown,
  Mic,
  Heart,
  CheckCircle2,
  Compass,
  Target,
  Infinity,
  Quote,

} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/shared/section-animation";

// ============================================================
// DATA
// ============================================================

const TRUST_SEALS = [
  { label: "Ijazah Authenticated", icon: ShieldCheck, color: "purple" },
  { label: "Authentic Sanad Chain", icon: Crown, color: "amber" },
  { label: "1-on-1 Instruction", icon: Users, color: "purple" },
  { label: "Global Reach", icon: Globe, color: "amber" },
];

const PROGRAMS = [
  {
    id: "tahfeedh",
    title: "Tahfeedh",
    subtitle: "Quran Memorization",
    description:
      "Complete memorization of the Quran with proper Tajweed and revision system.",
    icon: BookOpen,
    color: "purple",
    features: ["Personalized Plan", "Daily Revision", "Ijazah Track"],
    audience: "All Ages",
  },
  {
    id: "tajweed",
    title: "Tajweed",
    subtitle: "Scientific Recitation",
    description:
      "Master the rules of Quranic recitation with precision and proper pronunciation.",
    icon: Mic,
    color: "amber",
    features: ["Makharij Mastery", "Sifaat Practice", "Audio Analysis"],
    audience: "All Levels",
  },
  {
    id: "qiraat",
    title: "Qira'aat",
    subtitle: "The Ten Recitations",
    description:
      "Study the ten authentic Qira'at with certified scholars and Sanad chains.",
    icon: Crown,
    color: "purple",
    features: ["Ten Qira'at", "Sanad Verification", "Advanced Study"],
    audience: "Advanced",
  },
  {
    id: "arabic",
    title: "Arabic Language",
    subtitle: "Quranic Arabic",
    description:
      "Learn classical Arabic to understand the Quran in its original language.",
    icon: Globe,
    color: "amber",
    features: ["Grammar", "Vocabulary", "Tafsir Reading"],
    audience: "Beginner+",
  },
  {
    id: "tafsir",
    title: "Tafsir",
    subtitle: "Quranic Exegesis",
    description:
      "Deep dive into Quranic meaning with classical and contemporary scholarship.",
    icon: BookOpen,
    color: "purple",
    features: [
      "Classical Sources",
      "Scholarly Analysis",
      "Practical Application",
    ],
    audience: "Intermediate+",
  },
  {
    id: "children",
    title: "Children's Program",
    subtitle: "Foundation & Juz Amma",
    description:
      "Fun, engaging Quran learning for children aged 5-12 with structured progression.",
    icon: Heart,
    color: "amber",
    features: ["Juz Amma", "Fun Activities", "Parent Portal"],
    audience: "Ages 5-12",
  },
];

const FEATURES = [
  {
    icon: ShieldCheck,
    title: "Authentic Sanad",
    description: "Unbroken chain of transmission to Prophet Muhammad (ﷺ)",
    color: "purple",
  },
  {
    icon: Award,
    title: "Ijazah Certification",
    description:
      "Formal certification recognized by Islamic scholarly councils",
    color: "amber",
  },
  {
    icon: Users,
    title: "1-on-1 Instruction",
    description: "Personalized attention from certified teachers",
    color: "purple",
  },
  {
    icon: Globe,
    title: "Flexible Learning",
    description: "Online or in-person, at your own pace",
    color: "amber",
  },
];

const TESTIMONIALS = [
  {
    name: "Zainab Bint Abdullah",
    role: "Hifz Graduate",
    content:
      "Alhamdulillah, I completed my Hifz in just 2 years. The teachers were patient, supportive, and the revision system made all the difference.",
    initials: "ZB",
  },
  {
    name: "Shaykh Dr. Ahmed",
    role: "Al-Azhar Scholar",
    content:
      "Al-Maysaroh represents the highest standard of Quranic education. Their commitment to authentic Sanad is exemplary and truly inspiring.",
    initials: "أ",
  },
];

const STATS = [
  { value: "500+", label: "Active Students", icon: Users, color: "purple" },
  { value: "94%", label: "Success Rate", icon: Award, color: "amber" },
  { value: "15+", label: "Countries", icon: Globe, color: "purple" },
  {
    value: "1400+",
    label: "Years of Sanad",
    icon: ShieldCheck,
    color: "amber",
  },
];

const getColorStyles = (color: string) => {
  const styles = {
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
  };
  return styles[color as keyof typeof styles] || styles.purple;
};

// ============================================================
// COMPONENTS
// ============================================================

function PremiumStatCard({ value, label, icon, delay, color }: any) {
  const Icon = icon;
  const colors = getColorStyles(color);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delay || 0 }}
      className="text-center group"
    >
      <div
        className={`w-14 h-14 rounded-2xl ${colors.bg} flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}
      >
        <Icon className={`w-7 h-7 ${colors.text}`} />
      </div>
      <div className={`text-2xl md:text-3xl font-black ${colors.text}`}>
        {value}
      </div>
      <div className="text-xs text-slate-400">{label}</div>
    </motion.div>
  );
}

function PremiumCampusCard({
  href,
  title,
  description,
  features,
  icon,
  color,
  buttonText,
}: any) {
  const colors = getColorStyles(color);

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="h-full"
    >
      <Link href={href} className="block h-full">
        <div
          className={cn(
            "group relative p-6 md:p-8 rounded-2xl border-2 transition-all duration-300 hover:shadow-2xl h-full flex flex-col bg-slate-900/50 hover:bg-slate-900/70",
            colors.border,
          )}
        >
          {/* Glow Effect */}
          <div
            className={`absolute -inset-0.5 ${colors.glow} opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 rounded-2xl`}
          />

          {/* Icon */}
          <div
            className={`relative w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center mb-4 ${colors.bg}`}
          >
            <div className={colors.text}>{icon}</div>
          </div>

          <h3 className="text-xl md:text-2xl font-black text-white mb-2">
            {title}
          </h3>
          <p className="text-slate-400 text-sm mb-4">{description}</p>

          <ul className="space-y-2 mb-6 flex-1">
            {features.map((feature: string, i: number) => (
              <li
                key={i}
                className="flex items-center gap-2 text-sm text-slate-300"
              >
                <CheckCircle2 className={cn("w-4 h-4", colors.text)} />
                {feature}
              </li>
            ))}
          </ul>

          <Button
            className={cn(
              "w-full font-black group/btn rounded-xl py-3",
              `bg-gradient-to-r ${colors.gradient} text-white shadow-lg ${colors.glow} hover:shadow-xl transition-all`,
            )}
          >
            {buttonText}
            <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
          </Button>
        </div>
      </Link>
    </motion.div>
  );
}

// ============================================================
// PAGE
// ============================================================

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-slate-950 overflow-hidden">
      {/* ============================================================
           HERO SECTION - PREMIUM DARK
           ============================================================ */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Premium Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/2 w-[800px] h-[800px] bg-purple-600/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/2 w-[800px] h-[800px] bg-amber-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
          <div
            className="absolute inset-0 bg-[url('/islamic-pattern.svg')] opacity-[0.02] bg-center bg-repeat"
            style={{ backgroundSize: "300px" }}
          />
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 xs:px-5 sm:px-6 relative z-10 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-5xl mx-auto"
          >
            <div className="text-center">
              {/* Premium Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-600/20 border border-purple-600/30 mb-6">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span className="text-xs font-black uppercase tracking-wider text-amber-500">
                  Al-Maysaroh Institute • Established 2018
                </span>
              </div>

              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tighter leading-[1.1] mb-6 text-white">
                Your Journey to
                <span className="block bg-gradient-to-r from-purple-400 via-amber-500 to-purple-400 bg-clip-text text-transparent">
                  Quranic Excellence
                </span>
              </h1>

              <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-10">
                Choose your learning path. Whether online from anywhere or
                in-person at our physical campus, start your Sanad today.
              </p>

              {/* Premium Stats Row */}
              <div className="flex flex-wrap justify-center gap-8 md:gap-12 mb-12">
                {STATS.map((stat, i) => (
                  <PremiumStatCard
                    key={i}
                    value={stat.value}
                    label={stat.label}
                    icon={stat.icon}
                    color={stat.color}
                    delay={0.2 + i * 0.1}
                  />
                ))}
              </div>
            </div>

            {/* Premium Campus Cards */}
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <PremiumCampusCard
                href="/online"
                title="Online Campus"
                description="Learn from anywhere with 1-on-1 sessions"
                features={[
                  "Flexible Scheduling",
                  "Global Access",
                  "Certified Teachers",
                ]}
                icon={<Globe className="w-8 h-8" />}
                color="purple"
                buttonText="Explore Online"
              />
              <PremiumCampusCard
                href="/onsite"
                title="Physical Campus"
                description="Full-time residential Quran memorization"
                features={[
                  "Boarding Available",
                  "Structured Routine",
                  "Community",
                ]}
                icon={<Building2 className="w-8 h-8" />}
                color="amber"
                buttonText="Explore Physical"
              />
            </div>
          </motion.div>
        </div>

        {/* Premium Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 rounded-full border-2 border-purple-600/30 flex items-start justify-center p-1">
            <div className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce" />
          </div>
        </motion.div>
      </section>

      {/* ============================================================
           TRUST SEALS - PREMIUM DARK
           ============================================================ */}
      <section className="py-12 md:py-16 border-y border-slate-800/50 bg-slate-900/30">
        <div className="container mx-auto px-4 xs:px-5 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            {TRUST_SEALS.map((item, i) => {
              const Icon = item.icon;
              const colors = getColorStyles(item.color);
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="text-center group"
                >
                  <div
                    className={cn(
                      "w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform",
                      colors.bg,
                    )}
                  >
                    <Icon className={cn("w-7 h-7", colors.text)} />
                  </div>
                  <p className={cn("text-xs font-black", colors.text)}>
                    {item.label}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================
           PROGRAMS SECTION - PREMIUM DARK
           ============================================================ */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 xs:px-5 sm:px-6">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-amber-500" />
                <span className="text-amber-500 font-black text-xs uppercase tracking-wider flex items-center gap-2">
                  <Compass className="w-4 h-4" />
                  Our Programs
                </span>
                <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-amber-500" />
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter font-heading text-white mb-4">
                Comprehensive{" "}
                <span className="bg-gradient-to-r from-purple-400 to-amber-400 bg-clip-text text-transparent italic">
                  Quranic Education
                </span>
              </h2>
              <p className="text-lg text-slate-300">
                Whether you're beginning your journey or seeking advanced
                certification, we have a program tailored for you.
              </p>
            </div>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {PROGRAMS.map((program, index) => {
              const Icon = program.icon;
              const colors = getColorStyles(program.color);
              return (
                <Reveal key={program.id} delay={index * 0.05}>
                  <motion.div
                    whileHover={{ y: -6 }}
                    className="bg-slate-900/50 rounded-2xl border border-slate-800/50 hover:border-purple-600/50 transition-all p-6 h-full flex flex-col group"
                  >
                    <div
                      className={cn(
                        "w-14 h-14 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform",
                        colors.bg,
                      )}
                    >
                      <Icon className={cn("w-7 h-7", colors.text)} />
                    </div>

                    <h3 className="font-black text-lg text-white mb-0.5">
                      {program.title}
                    </h3>
                    <p
                      className={cn(
                        "text-xs font-black uppercase tracking-wider mb-2",
                        colors.text,
                      )}
                    >
                      {program.subtitle}
                    </p>

                    <p className="text-sm text-slate-300 mb-4 flex-1">
                      {program.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-3">
                      {program.features.map((feature, idx) => (
                        <span
                          key={idx}
                          className={cn(
                            "text-[10px] font-black px-2.5 py-1 rounded-full",
                            colors.bg,
                            colors.text,
                          )}
                        >
                          {feature}
                        </span>
                      ))}
                    </div>

                    <div className="text-xs text-slate-500">
                      🎯 {program.audience}
                    </div>
                  </motion.div>
                </Reveal>
              );
            })}
          </div>

          <Reveal delay={0.3}>
            <div className="text-center mt-12">
              <Link href="/courses">
                <Button className="rounded-full px-8 py-4 font-black bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white shadow-lg hover:shadow-xl transition-all duration-300 group">
                  View All Programs
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============================================================
           FEATURES SECTION - PREMIUM DARK
           ============================================================ */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-transparent via-purple-600/5 to-amber-600/5">
        <div className="container mx-auto px-4 xs:px-5 sm:px-6">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-purple-500" />
                <span className="text-purple-400 font-black text-xs uppercase tracking-wider flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  Why Choose Us
                </span>
                <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-purple-500" />
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter font-heading text-white mb-4">
                The{" "}
                <span className="bg-gradient-to-r from-purple-400 to-amber-400 bg-clip-text text-transparent italic">
                  Al-Maysaroh
                </span>{" "}
                Advantage
              </h2>
              <p className="text-lg text-slate-300">
                What sets our Quranic education apart
              </p>
            </div>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {FEATURES.map((feature, index) => {
              const Icon = feature.icon;
              const colors = getColorStyles(feature.color);
              return (
                <Reveal key={index} delay={index * 0.1}>
                  <div className="text-center p-6 rounded-2xl bg-slate-900/50 border border-slate-800/50 hover:border-purple-600/50 transition-all group">
                    <div
                      className={cn(
                        "w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform",
                        colors.bg,
                      )}
                    >
                      <Icon className={cn("w-8 h-8", colors.text)} />
                    </div>
                    <h3
                      className={cn(
                        "font-black text-base text-white mb-2",
                        colors.text,
                      )}
                    >
                      {feature.title}
                    </h3>
                    <p className="text-sm text-slate-300">
                      {feature.description}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================
           TESTIMONIALS SECTION - PREMIUM DARK
           ============================================================ */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 xs:px-5 sm:px-6">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-amber-500" />
                <span className="text-amber-500 font-black text-xs uppercase tracking-wider flex items-center gap-2">
                  <Quote className="w-4 h-4" />
                  Testimonials
                </span>
                <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-amber-500" />
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter font-heading text-white mb-4">
                What Our{" "}
                <span className="bg-gradient-to-r from-purple-400 to-amber-400 bg-clip-text text-transparent italic">
                  Students
                </span>{" "}
                Say
              </h2>
            </div>
          </Reveal>

          <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {TESTIMONIALS.map((testimonial, index) => (
              <Reveal key={index} delay={index * 0.1}>
                <div className="bg-slate-900/50 rounded-2xl border border-slate-800/50 hover:border-purple-600/50 transition-all p-6 h-full flex flex-col">
                  <Quote className="w-8 h-8 text-amber-500/30 mb-3" />
                  <p className="text-sm text-slate-300 italic mb-4 flex-1 leading-relaxed">
                    {`"${testimonial.content}"`}
                  </p>
                  <div className="flex items-center gap-3 pt-3 border-t border-slate-800/50">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-amber-500 flex items-center justify-center text-white font-black text-sm">
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
        </div>
      </section>

      {/* ============================================================
           CTA SECTION - PREMIUM DARK
           ============================================================ */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-purple-600/20 via-purple-700/20 to-amber-600/20">
        <div className="container mx-auto px-4 xs:px-5 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-600 to-amber-500 mb-6 shadow-xl shadow-purple-500/30">
              <Sparkles className="w-10 h-10 text-white" />
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4">
              Ready to Begin Your Journey?
            </h2>

            <p className="text-slate-300 text-lg mb-8 max-w-md mx-auto">
              Choose your learning path and start your Sanad today. Your journey
              to Quranic excellence begins here.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/online">
                <Button className="rounded-full px-8 py-4 font-black bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white shadow-lg hover:shadow-xl transition-all group">
                  Start Online
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/onsite">
                <Button
                  variant="outline"
                  className="rounded-full px-8 py-4 font-black border-amber-500 text-amber-500 hover:bg-amber-500/10 transition-all"
                >
                  Visit Physical Campus
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>

            <p className="text-slate-400 text-sm mt-6">
              Free assessment • No commitment • All ages welcome
            </p>
          </motion.div>
        </div>
      </section>

      {/* ============================================================
           FOOTER TRUST BADGE
           ============================================================ */}
      <div className="py-4 border-t border-slate-800/50 bg-slate-900/30">
        <div className="container mx-auto px-4 xs:px-5 sm:px-6">
          <div className="flex flex-wrap justify-center gap-6 text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
              Ijazah Certified
            </span>
            <span className="flex items-center gap-1.5">
              <Crown className="w-3.5 h-3.5 text-amber-400" />
              Authentic Sanad
            </span>
            <span className="flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-purple-400" />
              500+ Students
            </span>
            <span className="flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-amber-400" />
              5+ Countries
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}
