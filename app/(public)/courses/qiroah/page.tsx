import { Reveal } from "@/components/shared/section-animation";
import {
  User,
  Clock,
  Calendar,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  HelpCircle,
  Zap,
  TrendingUp,
  Heart,
  Gem,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

export const metadata = {
  title: "Individual Qiro'ah for Children | Al-Maysaroh",
  description:
    "Personalized 1-on-1 Quran reading program for children ages 6-12. Individual attention from certified scholars for faster progress and confidence building.",
};

const PROGRAM = {
  name: "Individual Qiro'ah",
  subtitle: "1-on-1 Quran Reading for Children",
  tagline: "Personalized Attention for Faster Progress",
  description:
    "A personalized 1-on-1 Quran reading program designed for children ages 6-12. Each child receives undivided attention from a certified scholar, ensuring faster progress, proper pronunciation, and building confidence in Quranic recitation.",
  ageGroup: "6-12 years",
  duration: "Flexible (3-9 months)",
  sessionsPerWeek: 2,
  sessionDuration: "45 minutes",
  classSize: "1-on-1",
  price: "$129/month",
  features: [
    "100% personalized attention",
    "Custom learning pace",
    "Flexible scheduling",
    "Parent progress reports",
    "Recording access",
    "Certificate of completion",
  ],
  curriculum: [
    {
      level: "Level 1: Foundations",
      months: "Months 1-3",
      topics: [
        "Arabic alphabet recognition & writing",
        "Proper pronunciation (Makharij training)",
        "Short vowels (Fatha, Kasra, Damma)",
        "Connecting letters practice",
        "Basic reading fluency development",
      ],
    },
    {
      level: "Level 2: Building Fluency",
      months: "Months 3-6",
      topics: [
        "Long vowels (Madd) mastery",
        "Sukoon and Shadda rules",
        "Basic Tajweed for children",
        "Reading short Surahs independently",
        "Building reading speed & confidence",
      ],
    },
    {
      level: "Level 3: Advanced Reading",
      months: "Months 6-9",
      topics: [
        "Fluent Quranic reading",
        "Juz Amma complete mastery",
        "Introduction to memorization",
        "Public recitation practice",
        "Graduation & certification",
      ],
    },
  ],
  benefits: [
    {
      icon: User,
      title: "Individual Attention",
      description: "100% focus on your child's unique learning needs",
    },
    {
      icon: TrendingUp,
      title: "Faster Progress",
      description: "2-3x faster progress than group settings",
    },
    {
      icon: Heart,
      title: "Confidence Building",
      description: "Safe environment to practice and improve",
    },
    {
      icon: Calendar,
      title: "Flexible Schedule",
      description: "Choose times that work for your family",
    },
  ],
  schedule: [
    { day: "Monday - Friday", time: "9:00 AM - 8:00 PM (EST)" },
    { day: "Saturday - Sunday", time: "10:00 AM - 4:00 PM (EST)" },
  ],
  teachers: [
    {
      name: "Ustadha Fatima Al-Misriyyah",
      qualifications: "Ijazah in Tajweed, 10 years teaching children",
      specialty: "Early childhood Quran education",
    },
    {
      name: "Ustadh Ahmed Al-Makki",
      qualifications: "Ijazah in Qira'at, 8 years experience with children",
      specialty: "Building reading confidence",
    },
  ],
  faqs: [
    {
      q: "Is 1-on-1 better than group classes?",
      a: "Both have benefits! 1-on-1 offers personalized attention and faster progress. The teacher adapts completely to your child's pace and learning style. Many parents choose individual for children who need extra attention or have specific learning goals.",
    },
    {
      q: "How much faster will my child progress?",
      a: "Typically, children in 1-on-1 programs progress 2-3x faster than group settings. Without waiting for others, your child receives full teacher attention throughout each session.",
    },
    {
      q: "Can we schedule sessions around school?",
      a: "Absolutely! We offer flexible scheduling including after-school hours, evenings, and weekends. You can choose times that work best for your family's routine.",
    },
    {
      q: "What if we need to reschedule?",
      a: "We offer flexible rescheduling with 24-hour notice. Life happens, and we understand! Recordings are also available for review.",
    },
    {
      q: "Is there a trial available?",
      a: "Yes! We offer a free assessment session where your child can meet the teacher and experience the 1-on-1 format before committing.",
    },
  ],
};

export default function IndividualQiroahPage() {
  return (
    <main className="pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 md:pb-20 bg-background overflow-x-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-primary-700/5 blur-[80px] sm:blur-[120px] -z-10 rounded-full" />
      <div className="absolute bottom-0 left-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-primary-700/5 blur-[80px] sm:blur-[120px] -z-10 rounded-full" />

      <div className="container mx-auto px-4 sm:px-6">
        {/* Breadcrumb */}
        <div className="text-xs sm:text-sm text-muted-foreground">
          <Link
            href="/courses"
            className="hover:text-primary-700 transition-colors"
          >
            Programs
          </Link>

          <span className="mx-2">/</span>
          <span className="text-primary-700 font-medium">Juz Amma Group</span>
        </div>
        {/* ==================== HERO SECTION ==================== */}
        <div className="max-w-6xl mx-auto mb-12 sm:mb-16 md:mb-20 lg:mb-24">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 xl:gap-16">
            {/* Left Content */}
            <div className="lg:w-1/2 space-y-4 sm:space-y-6">
              <Reveal>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 text-[11px] font-black uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" /> 1-ON-1 • AGES 6-12
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter font-heading leading-[0.9]">
                  Individual{" "}
                  <span className="text-primary-700 italic">{`Qiro'ah`}</span>
                  <br />
                  for Children
                </h1>
              </Reveal>

              <Reveal delay={0.2}>
                <p className="text-base sm:text-lg text-muted-foreground font-light leading-relaxed">
                  {PROGRAM.description}
                </p>
              </Reveal>

              <Reveal delay={0.3}>
                <div className="flex flex-wrap gap-3 pt-2">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 text-accent text-xs font-black">
                    <User className="w-3.5 h-3.5" />
                    {PROGRAM.classSize}
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 text-accent text-xs font-black">
                    <Clock className="w-3.5 h-3.5" />
                    {PROGRAM.sessionDuration}
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 text-accent text-xs font-black">
                    <Calendar className="w-3.5 h-3.5" />
                    {PROGRAM.sessionsPerWeek}x/week
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.4}>
                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <Link href="/admissions" className="w-full sm:w-auto">
                    <Button className="w-full rounded-full px-6 py-3 sm:px-8 sm:py-4 font-black bg-primary-700 hover:bg-primary-800 text-sm sm:text-base min-h-11">
                      <span className="flex items-center justify-center gap-2 sm:gap-3">
                        ENROLL NOW
                        <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      </span>
                    </Button>
                  </Link>
                  <Link href="/contact" className="w-full sm:w-auto">
                    <Button
                      variant="outline"
                      className="w-full rounded-full px-6 py-3 sm:px-8 sm:py-4 font-black text-sm sm:text-base min-h-11"
                    >
                      FREE ASSESSMENT
                    </Button>
                  </Link>
                </div>
              </Reveal>
            </div>

            {/* Right Visual - Stats Card */}
            <Reveal delay={0.4} className="lg:w-1/2">
              <div className="institutional-card p-6 sm:p-8 bg-linear-to-br from-primary-50/20 to-primary-100/10 dark:from-primary-950/20 dark:to-primary-900/10 border-2 border-primary-700/20">
                <div className="grid grid-cols-2 gap-4 sm:gap-6 mb-6">
                  <div className="space-y-1">
                    <div className="text-2xl sm:text-3xl font-black text-primary-700">
                      $129
                    </div>
                    <div className="text-xs text-muted-foreground">Monthly</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-2xl sm:text-3xl font-black text-primary-700">
                      3-9 mo
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Duration
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-2xl sm:text-3xl font-black text-primary-700">
                      1-on-1
                    </div>
                    <div className="text-xs text-muted-foreground">Format</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-2xl sm:text-3xl font-black text-primary-700">
                      Flexible
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Schedule
                    </div>
                  </div>
                </div>

                <div className="p-4 sm:p-6 rounded-xl bg-primary-700/5 border border-primary-700/10">
                  <div className="flex items-center gap-3 mb-2">
                    <Zap className="w-6 h-6 sm:w-7 sm:h-7 text-primary-700" />
                    <div className="font-black text-base sm:text-lg uppercase tracking-tight">
                      2-3x Faster Progress
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Individual attention means your child advances at their own
                    pace
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* ==================== FEATURES SECTION ==================== */}
        <section className="py-12 sm:py-16 md:py-20 bg-linear-to-b from-background to-primary-50/5 dark:to-primary-950/5 rounded-3xl">
          <div className="text-center mb-12 sm:mb-16 space-y-4">
            <Reveal>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter">
                Why Choose{" "}
                <span className="text-primary-700 italic">1-on-1</span>
              </h2>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
                {`Personalized attention that accelerates your child's Quran
                journey and builds lasting confidence in their recitation skills. Experience the transformative power of 1-on-1 learning with Al-Maysaroh's Individual Qiro'ah program
                 designed specifically for children ages 6-12.
                 Our certified scholars provide undivided attention, ensuring your child receives a customized learning experience that adapts to their unique pace and style. With flexible scheduling, progress tracking, and a curriculum tailored to their needs, our 1-on-1 program is the ultimate choice for parents seeking the best Quran education for their children. Watch your child thrive with personalized guidance and support every step of the way.`}
              </p>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {PROGRAM.benefits.map((benefit, index) => (
              <Reveal key={index} delay={index * 0.1}>
                <div className="institutional-card p-5 sm:p-6 text-center h-full hover:border-primary-700/30 transition-all duration-300">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 rounded-lg bg-primary-50 dark:bg-primary-950/40 flex items-center justify-center">
                    <benefit.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary-700" />
                  </div>
                  <h3 className="font-black text-sm sm:text-base uppercase tracking-tight mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    {benefit.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ==================== CURRICULUM SECTION ==================== */}
        <section className="py-12 sm:py-16 md:py-20">
          <div className="text-center mb-12 sm:mb-16 space-y-4">
            <Reveal>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter">
                Personalized{" "}
                <span className="text-primary-700 italic">Learning Path</span>
              </h2>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
                Tailored curriculum that adapts to your child's pace
              </p>
            </Reveal>
          </div>

          <div className="space-y-4 sm:space-y-6">
            {PROGRAM.curriculum.map((level, index) => (
              <Reveal key={index} delay={index * 0.1}>
                <div className="institutional-card p-5 sm:p-6 md:p-8 hover:border-primary-700/30 transition-all duration-300">
                  <div className="flex flex-col md:flex-row md:items-start gap-4 sm:gap-6">
                    <div className="md:w-64 flex-shrink-0">
                      <div className="inline-flex items-center gap-2 sm:gap-3 mb-2">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-primary-700 text-white flex items-center justify-center text-xs sm:text-sm font-black">
                          {index + 1}
                        </div>
                        <div>
                          <div className="font-black text-sm sm:text-base uppercase tracking-tight">
                            {level.level}
                          </div>
                          <p className="text-xs text-primary-700 font-black mt-1">
                            {level.months}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex-1">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                        {level.topics.map((topic, idx) => (
                          <div
                            key={idx}
                            className="flex items-center gap-2 p-2 rounded-lg bg-primary-50/50 dark:bg-primary-950/20"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 text-primary-700 flex-shrink-0" />
                            <span className="text-xs sm:text-sm">{topic}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ==================== SCHEDULE & FREE ASSESSMENT ==================== */}
        <section className="py-12 sm:py-16 md:py-20 bg-linear-to-b from-background to-primary-50/5 dark:to-primary-950/5 rounded-3xl">
          <div className="grid md:grid-cols-2 gap-8 sm:gap-12 items-start">
            <Reveal>
              <div className="space-y-6">
                <h2 className="text-3xl sm:text-4xl font-black tracking-tighter">
                  Flexible{" "}
                  <span className="text-primary-700 italic">Schedule</span>
                </h2>
                <p className="text-lg text-muted-foreground">
                  Choose times that work around your family's routine
                </p>

                <div className="space-y-3 sm:space-y-4">
                  {PROGRAM.schedule.map((slot, index) => (
                    <div
                      key={index}
                      className="p-4 sm:p-5 rounded-xl bg-card border border-primary-700/10 hover:border-primary-700/30 transition-all"
                    >
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <div className="flex items-center gap-3">
                          <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-primary-700" />
                          <span className="font-black text-sm sm:text-base">
                            {slot.day}
                          </span>
                        </div>
                        <span className="text-xs sm:text-sm text-muted-foreground">
                          {slot.time}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="institutional-card p-6 sm:p-8 bg-linear-to-br from-accent/5 to-accent/10 border-2 border-accent/20">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 mb-4">
                    <Gem className="w-8 h-8 text-accent" />
                  </div>
                  <h3 className="font-black text-xl sm:text-2xl uppercase tracking-tight mb-2">
                    Free Assessment Session
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Experience 1-on-1 learning before committing
                  </p>
                </div>

                <ul className="space-y-3 mb-6">
                  {[
                    "30-minute personalized session",
                    "Meet your dedicated teacher",
                    "Custom learning plan created",
                    "No obligation to continue",
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <CheckCircle2 className="w-4 h-4 text-accent" />
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>

                <Link href="/contact">
                  <Button className="w-full rounded-full bg-accent hover:bg-accent/90 text-white font-black">
                    SCHEDULE FREE ASSESSMENT
                  </Button>
                </Link>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ==================== TEACHERS SECTION ==================== */}
        <section className="py-12 sm:py-16 md:py-20">
          <Reveal>
            <div className="text-center mb-12 sm:mb-16 space-y-4">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter">
                Meet Your{" "}
                <span className="text-primary-700 italic">Teacher</span>
              </h2>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
                Certified scholars specializing in children's Quran education
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
            {PROGRAM.teachers.map((teacher, index) => (
              <Reveal key={index} delay={index * 0.1}>
                <div className="institutional-card p-5 sm:p-6 flex items-start gap-4">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-linear-to-br from-primary-700 to-primary-800 flex items-center justify-center text-white font-black text-2xl">
                    {teacher.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-black text-base sm:text-lg uppercase tracking-tight mb-1">
                      {teacher.name}
                    </h3>
                    <p className="text-xs text-primary-700 font-black mb-2">
                      {teacher.specialty}
                    </p>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      {teacher.qualifications}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ==================== PRICING SECTION ==================== */}
        <section className="py-12 sm:py-16 md:py-20 bg-linear-to-b from-background to-primary-50/5 dark:to-primary-950/5 rounded-3xl">
          <Reveal>
            <div className="text-center mb-12 sm:mb-16 space-y-4">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter">
                Investment in Your{" "}
                <span className="text-primary-700 italic">Child's Future</span>
              </h2>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
                Choose the payment option that works best for your family
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto">
            {[
              {
                name: "Monthly",
                price: "$129",
                period: "/month",
                features: [
                  "8-12 sessions per month",
                  "Flexible scheduling",
                  "Progress reports",
                  "Cancel anytime",
                ],
                popular: false,
              },
              {
                name: "Quarterly",
                price: "$349",
                period: "/3 months",
                features: [
                  "Save $38",
                  "Priority scheduling",
                  "Free assessment",
                  "Parent portal access",
                ],
                popular: true,
              },
              {
                name: "Annual",
                price: "$1299",
                period: "/year",
                features: [
                  "Save $249",
                  "Certificate included",
                  "Bonus Quran set",
                  "Graduation gift",
                ],
                popular: false,
              },
            ].map((plan, index) => (
              <Reveal key={index} delay={index * 0.1}>
                <div
                  className={cn(
                    "institutional-card p-5 sm:p-6 md:p-8 h-full flex flex-col relative",
                    plan.popular && "border-2 border-primary-700 shadow-royal",
                  )}
                >
                  {plan.popular && (
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary-700 text-white px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider">
                      MOST POPULAR
                    </div>
                  )}

                  <div className="mb-4 sm:mb-6">
                    <h3 className="font-black text-lg sm:text-xl uppercase tracking-tight mb-2">
                      {plan.name}
                    </h3>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl sm:text-4xl font-black text-primary-700">
                        {plan.price}
                      </span>
                      <span className="text-xs sm:text-sm text-muted-foreground">
                        {plan.period}
                      </span>
                    </div>
                  </div>

                  <ul className="space-y-2 sm:space-y-3 mb-6 flex-grow">
                    {plan.features.map((feature, idx) => (
                      <li
                        key={idx}
                        className="flex items-center gap-2 text-xs sm:text-sm"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary-700 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Link href="/admissions" className="mt-auto">
                    <Button
                      className={cn(
                        "w-full rounded-full font-black",
                        plan.popular
                          ? "bg-primary-700 hover:bg-primary-800 text-white"
                          : "bg-primary-700/10 hover:bg-primary-700/20 text-primary-700",
                      )}
                    >
                      SELECT PLAN
                    </Button>
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ==================== FAQ SECTION ==================== */}
        <section className="py-12 sm:py-16 md:py-20">
          <div className="text-center mb-12 sm:mb-16 space-y-4">
            <Reveal>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter">
                Frequently Asked{" "}
                <span className="text-primary-700 italic">Questions</span>
              </h2>
              <p className="text-lg sm:text-xl text-muted-foreground">
                Everything parents need to know about 1-on-1 learning
              </p>
            </Reveal>
          </div>

          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 max-w-5xl mx-auto">
            {PROGRAM.faqs.map((faq, index) => (
              <Reveal key={index} delay={index * 0.05}>
                <div className="institutional-card p-4 sm:p-6 hover:border-primary-700/30 transition-all duration-300">
                  <div className="flex gap-3 sm:gap-4">
                    <HelpCircle className="w-5 h-5 sm:w-6 sm:h-6 text-primary-700 shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-black text-sm sm:text-base uppercase tracking-tight mb-2">
                        {faq.q}
                      </h3>
                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                        {faq.a}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ==================== FINAL CTA ==================== */}
        <section className="py-12 sm:py-16 md:py-20">
          <Reveal>
            <div className="institutional-card p-8 sm:p-10 md:p-12 text-center border-2 border-primary-700/20 max-w-4xl mx-auto">
              <User className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 mx-auto mb-4 sm:mb-6 text-primary-700" />

              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter mb-4">
                Give Your Child{" "}
                <span className="text-primary-700 italic">Individual</span>{" "}
                Attention
              </h2>

              <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto mb-6 sm:mb-8">
                Every child deserves personalized guidance on their Quran
                journey. Start with a free assessment today.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/admissions">
                  <Button className="rounded-full px-8 py-4 sm:px-10 sm:py-5 font-black bg-primary-700 hover:bg-primary-800 text-base sm:text-lg min-h-[44px]">
                    <span className="flex items-center gap-3">
                      ENROLL NOW
                      <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                    </span>
                  </Button>
                </Link>

                <Link href="/contact">
                  <Button
                    variant="outline"
                    className="rounded-full px-8 py-4 sm:px-10 sm:py-5 font-black text-base sm:text-lg min-h-[44px]"
                  >
                    FREE ASSESSMENT
                  </Button>
                </Link>
              </div>

              <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-border/50">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary-700" />
                    1-on-1 Attention
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary-700" />
                    Flexible Scheduling
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary-700" />
                    Free Assessment
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </section>
      </div>
    </main>
  );
}

