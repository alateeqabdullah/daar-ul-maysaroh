import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/shared/section-animation";
import Link from "next/link";
import { EnrollmentForm } from "@/components/forms/enrollment-form";
import {
  Sparkles,
  Users,
  Clock,
  Calendar,
  Heart,
  Award,
  MessageSquare,
  Smile,
  CheckCircle,
  ArrowRight,
  CheckCircle2,
  Star,
  Trophy,
  Gift,
  HelpCircle,
  Shield,
} from "lucide-react";
// import { TrialForm } from "@/components/forms/trial-form";
import { cn } from "@/lib/utils";
import { Metadata } from "next";

// Dynamic metadata generation
export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://almaysaroh.com";

  return {
    title:
      "Group Qiro'ah for Children | Interactive Quran Reading | Al-Maysaroh",
    description:
      "Interactive group Quran reading program for children ages 7-12. Learn with peers, earn rewards, and build confidence in a fun, supportive environment. Free assessment available.",
    keywords: [
      "group qiro'ah",
      "quran for children",
      "kids quran classes",
      "online quran for kids",
      "children quran reading",
      "interactive quran learning",
      "group quran lessons",
      "quran recitation for kids",
      "quran classes for children",
      "quran reading program for kids",
      "quran learning for children",
      "quran education for kids",
      "quran recitation classes for children",
      "quran study group for kids",
      "quran reading sessions for children",
      "quran learning program for kids",
      "quran recitation program for children",
      "quran classes online for kids",
      "quran reading classes for children",
      "quran learning classes for kids",
      "quran recitation classes online for children",
    ],
    openGraph: {
      title: "Group Qiro'ah for Children | Interactive Quran Reading",
      description:
        "Fun, interactive group Quran reading program for children ages 7-12. Learn with peers, earn rewards, and build confidence.",
      url: `${baseUrl}/courses/group-qiroah`,
      siteName: "Al-Maysaroh Institute",
      images: [
        {
          url: `${baseUrl}/og/qiroah-group.jpg`,
          width: 1200,
          height: 630,
          alt: "Group Qiro'ah for Children - Interactive Quran Reading",
        },
      ],
      type: "website",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: "Group Qiro'ah for Children | Interactive Quran Reading",
      description:
        "Fun, interactive group Quran reading program for children ages 7-12. Free assessment available.",
      images: [`${baseUrl}/og/qiroah-group.jpg`],
    },
    alternates: {
      canonical: `${baseUrl}/courses/group-qiroah`,
    },
  };
}

// Mock data - replace with actual Prisma queries
const COURSE_DETAILS = {
  name: "Group Qiro'ah for Children",
  tagline: "Learn to Read Quran with Joy & Confidence",
  description:
    "A nurturing environment where children ages 7-12 learn proper Quranic recitation through interactive group sessions, games, and positive reinforcement.",
  ageGroup: "7-12 years",
  duration: "6 months",
  sessionsPerWeek: "min: 2, max: 4" ,
  sessionDuration: "30 - 60 minutes",
  classSize: "4-10 students",
  startDate: "April, 2026",
  price: {
    monthly: 6,
    quarterly: 18,
    annually: 70,
  },
  features: [
    "Interactive learning games",
    "Progress certificates",
    "Parent portal access",
    "Weekly progress reports",
    "Fun Quran competitions",
    "Reward system",
  ],
  curriculum: [
    {
      level: "Level 1: Foundations",
      months: "Months 1-2",
      topics: [
        "Arabic alphabet recognition",
        "Proper pronunciation (Makharij basics)",
        "Short vowels (Fatha, Kasra, Damma)",
        "Connecting letters",
        "Basic reading fluency",
        
      ],
    },
    {
      level: "Level 2: Building Fluency",
      months: "Months 3-4",
      topics: [
        "Long vowels (Madd)",
        "Sukoon and Shadda",
        "Basic Tajweed rules for children",
        "Reading short Surahs",
        "Interactive recitation practice",
      ],
    },
    {
      level: "Level 3: Confident Reading",
      months: "Months 5-6",
      topics: [
        "Fluent Quranic reading",
        "Juz Amma practice",
        "Basic memorization",
        "Public recitation practice",
        "Final group recitation project",
        "Celebration and rewards ceremony",
      ],
    },
  ],
  schedule: [
    { day: "Monday & Wednesday", time: "3:00 PM - 4:45 PM (EST)" },
    { day: "Tuesday & Thursday", time: "3:00 PM - 5:45 PM (EST)" },
    { day: "Saturday & Sunday", time: "8:00 AM - 11:30 AM (EST)" },
  ],

  // schedule: [
  //   { day: "Monday & Wednesday", time: "4:00 PM - 4:45 PM (EST)" },
  //   { day: "Tuesday & Thursday", time: "5:00 PM - 5:45 PM (EST)" },
  //   { day: "Saturday", time: "10:00 AM - 11:30 AM (EST)" },
  //   { day: "Sunday", time: "11:00 AM - 12:30 PM (EST)" },
  // ],
  teachers: [
    {
      name: "Ustadha Fatima Zahrah",
      qualifications: "Ijazah in Hifz & Tajweed, 10 years teaching children",
      image: "/teachers/fatima.jpg",
    },
    {
      name: "Ustadh Abubakar Al-Maysariy",
      qualifications: "Ijazah in Qira'at, 15 years experience with children",
      image: "/teachers/dean.jpg",
    },
  ],
  benefits: [
    {
      icon: Heart,
      title: "Nurturing Environment",
      description:
        "Positive, encouraging atmosphere that builds love for the Quran",
    },
    {
      icon: Users,
      title: "Peer Learning",
      description: "Children learn better together with friendly competition",
    },
    {
      icon: Award,
      title: "Reward System",
      description: "Stars, certificates, and prizes to celebrate progress",
    },
    {
      icon: MessageSquare,
      title: "Parent Communication",
      description: "Weekly updates and parent-teacher meetings",
    },
  ],
  rewards: [
    { name: "Star Recruiter", surahs: "5", badge: "⭐" },
    { name: "Moon Reciter", surahs: "10", badge: "🌙" },
    { name: "Sun Scholar", surahs: "15", badge: "☀️" },
    { name: "Quran Champion", surahs: "20+", badge: "🏆" },
  ],
  faqs: [
    {
      q: "What if my child has no prior Arabic knowledge?",
      a: "Perfect! Our Level 1 is designed for absolute beginners. We start from the very basics with fun, engaging activities.",
    },
    {
      q: "How do you keep children engaged online?",
      a: "We use interactive games, visual aids, short activities, and frequent positive reinforcement. Sessions are designed for young attention spans.",
    },
    {
      q: "Can parents observe the classes?",
      a: "Yes! We offer monthly open sessions where parents can observe. You also receive weekly progress reports.",
    },
    {
      q: "What if my child misses a class?",
      a: "Recordings are available, and makeup sessions can be arranged within the same week.",
    },
    {
      q: "Is there a trial class available?",
      a: "Yes! We offer a free trial session so your child can experience the class before committing.",
    },
  ],
};

export default async function GroupQiroahAdmissionsPage() {
  return (
    <main className="pt-16 sm:pt-20 md:pt-24 lg:pt-28 xl:pt-32 bg-background overflow-x-hidden">
      {/* Background Decor - Premium Addition */}
      <div className="absolute top-0 right-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-primary-700/5 blur-[80px] sm:blur-[120px] -z-10 rounded-full" />
      <div className="absolute bottom-0 left-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-primary-700/5 blur-[80px] sm:blur-[120px] -z-10 rounded-full" />

      {/* Floating particles - Premium Addition */}
      <div className="absolute top-1/4 right-1/4 w-2 h-2 bg-primary-700/20 rounded-full blur-[1px] animate-pulse" />
      <div className="absolute bottom-1/3 left-1/3 w-3 h-3 bg-primary-700/20 rounded-full blur-[1px] animate-pulse delay-300" />

      <div className="container mx-auto px-4 sm:px-6">
        {/* Hero Section - Enhanced with better visual */}
        <section className="relative overflow-hidden">
          <div className="max-w-6xl mx-auto py-8 sm:py-12 md:py-16 lg:py-20 space-y-6 sm:space-y-8 md:space-y-10">
            {/* Breadcrumb */}
            <div className="text-xs sm:text-sm text-muted-foreground">
              <Link
                href="/courses"
                className="hover:text-primary-700 transition-colors"
              >
                Programs
              </Link>
              <span className="mx-2">/</span>
              {/* <Link
                href="/courses/children"
                className="hover:text-primary-700 transition-colors"
              >
                Children
              </Link> */}
              <span className="mx-2">/</span>
              <span className="text-primary-700 font-medium">
              {`  Group Qiro'ah`}
              </span>
            </div>

            {/* Hero Content - Enhanced with better spacing */}
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 xl:gap-16">
              <div className="lg:w-1/2 space-y-4 sm:space-y-6">
                <Reveal>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 text-[11px] font-black uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5" /> ENROLLING NOW • AGES
                    7-12
                  </div>
                </Reveal>

                <Reveal delay={0.1}>
                  <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter font-heading leading-[0.9]">
                    Group{" "}
                    <span className="text-primary-700 italic">{`Qiro'ah`}</span>
                    <br />
                    for Children
                  </h1>
                </Reveal>

                <Reveal delay={0.2}>
                  <p className="text-base sm:text-lg text-muted-foreground font-light leading-relaxed">
                    {COURSE_DETAILS.description}
                  </p>
                </Reveal>

                <Reveal delay={0.3}>
                  <div className="flex flex-wrap gap-3 pt-2">
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 text-accent text-xs font-black">
                      <Users className="w-3.5 h-3.5" />
                      {COURSE_DETAILS.classSize}
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 text-accent text-xs font-black">
                      <Clock className="w-3.5 h-3.5" />
                      {COURSE_DETAILS.sessionDuration}
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 text-accent text-xs font-black">
                      <Calendar className="w-3.5 h-3.5" />
                      {COURSE_DETAILS.sessionsPerWeek}x/week
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
                    <Link href="#assessment" className="w-full sm:w-auto">
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

              {/* Hero Visual - Enhanced with rewards preview */}
              <Reveal delay={0.4} className="lg:w-1/2">
                <div className="institutional-card p-6 sm:p-8 bg-linear-to-br from-primary-50/20 to-primary-100/10 dark:from-primary-950/20 dark:to-primary-900/10 border-2 border-primary-700/20">
                  <div className="grid grid-cols-2 gap-4 sm:gap-6 mb-6">
                    <div className="space-y-1">
                      <div className="text-2xl sm:text-3xl font-black text-primary-700">
                        $16
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Monthly
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-2xl sm:text-3xl font-black text-primary-700">
                        6 mo
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Duration
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-2xl sm:text-3xl font-black text-primary-700">
                        4-6
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Students/class
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-2xl sm:text-3xl font-black text-primary-700">
                        April
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Start Date
                      </div>
                    </div>
                  </div>

                  <div className="p-4 sm:p-6 rounded-xl bg-primary-700/5 border border-primary-700/10">
                    <div className="flex items-center gap-3 mb-2">
                      <Smile className="w-6 h-6 sm:w-7 sm:h-7 text-primary-700" />
                      <div className="font-black text-base sm:text-lg uppercase tracking-tight">
                        Child-Friendly Approach
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Games • Rewards • Positive Reinforcement • Progress
                      Tracking
                    </p>
                  </div>

                  {/* Rewards Preview - Premium Addition */}
                  <div className="mt-4 flex justify-between items-center px-2">
                    {COURSE_DETAILS.rewards.slice(0, 3).map((reward, idx) => (
                      <div key={idx} className="text-center">
                        <div className="text-2xl">{reward.badge}</div>
                        <div className="text-[10px] font-black text-muted-foreground mt-1">
                          {reward.name}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Benefits Section - Your existing structure with enhanced icons */}
        <section className="py-12 sm:py-16 md:py-24 bg-linear-to-b from-background to-primary-50/5 dark:to-primary-950/5 rounded-3xl">
          <div className="max-w-6xl mx-auto">
            <Reveal>
              <div className="text-center mb-12 sm:mb-16 space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 dark:bg-primary-900/30 text-primary-700 text-[10px] font-black uppercase tracking-wider mb-4">
                  <Star className="w-3.5 h-3.5" /> WHY PARENTS CHOOSE US
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter">
                  Why Parents{" "}
                  <span className="text-primary-700 italic">Love</span> This
                  Program
                </h2>
                <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto">
                  A nurturing environment where children develop a lifelong love
                  for the Quran
                </p>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {COURSE_DETAILS.benefits.map((benefit, index) => (
                <Reveal key={index} delay={index * 0.1}>
                  <div className="institutional-card p-5 sm:p-6 text-center h-full hover:border-primary-700/30 transition-all duration-300 group">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 mx-auto mb-3 rounded-xl bg-primary-50 dark:bg-primary-950/40 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <benefit.icon className="w-6 h-6 sm:w-7 sm:h-7 text-primary-700" />
                    </div>
                    <h3 className="font-black text-base sm:text-lg uppercase tracking-tight mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      {benefit.description}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Curriculum Section - Enhanced with better visual hierarchy */}
        <section className="py-12 sm:py-16 md:py-24">
          <div className="max-w-6xl mx-auto">
            <Reveal>
              <div className="text-center mb-12 sm:mb-16 space-y-4">
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter">
                  Fun &{" "}
                  <span className="text-primary-700 italic">Effective</span>{" "}
                  Curriculum
                </h2>
                <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto">
                  Age-appropriate progression designed for young learners
                </p>
              </div>
            </Reveal>

            <div className="space-y-4 sm:space-y-6">
              {COURSE_DETAILS.curriculum.map((level, index) => (
                <Reveal key={index} delay={index * 0.1}>
                  <div className="institutional-card p-5 sm:p-6 md:p-8 hover:border-primary-700/30 transition-all duration-300">
                    <div className="flex flex-col md:flex-row md:items-start gap-4 sm:gap-6">
                      <div className="md:w-64 shrink-0">
                        <div className="inline-flex items-center gap-2 sm:gap-3 mb-2">
                          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary-700 text-white flex items-center justify-center text-sm sm:text-base font-black shadow-md">
                            {index + 1}
                          </div>
                          <div>
                            <div className="font-black text-base sm:text-lg uppercase tracking-tight">
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
                              <CheckCircle2 className="w-3.5 h-3.5 text-primary-700 shrink-0" />
                              <span className="text-xs sm:text-sm">
                                {topic}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Rewards Section - Premium Addition */}
        <section className="py-12 sm:py-16 md:py-24 bg-linear-to-b from-background to-primary-50/5 dark:to-primary-950/5 rounded-3xl">
          <div className="max-w-6xl mx-auto">
            <Reveal>
              <div className="text-center mb-12 sm:mb-16 space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-[10px] font-black uppercase tracking-wider mb-4">
                  <Trophy className="w-3.5 h-3.5" /> MOTIVATIONAL REWARDS
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter">
                  <span className="text-primary-700 italic">Rewards</span> &
                  Achievements
                </h2>
                <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto">
                  {` Fun incentives to celebrate your child's Quranic milestones and keep them motivated!`}
                </p>
              </div>
            </Reveal>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {COURSE_DETAILS.rewards.map((reward, index) => (
                <Reveal key={index} delay={index * 0.1}>
                  <div className="text-center p-4 sm:p-6 rounded-xl bg-linear-to-br from-accent/5 to-accent/10 border border-accent/20 hover:border-accent/40 transition-all group">
                    <div className="text-5xl mb-3 group-hover:scale-110 transition-transform">
                      {reward.badge}
                    </div>
                    <div className="font-black text-sm uppercase tracking-tight">
                      {reward.name}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {reward.surahs} Surahs
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Schedule Section - Enhanced with better visual */}
        <section className="py-12 sm:py-16 md:py-24">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 sm:gap-12 items-start">
              <Reveal>
                <div className="space-y-6">
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter">
                    Choose Your{" "}
                    <span className="text-primary-700 italic">Schedule</span>
                  </h2>
                  <p className="text-base sm:text-lg text-muted-foreground">
                    {`  Multiple time slots available to fit your family's routine.
                    All times shown in Eastern Time (EST). Classes are live and interactive, so your child can join from anywhere!`}
                  </p>

                  <div className="space-y-3 sm:space-y-4">
                    {COURSE_DETAILS.schedule.map((slot, index) => (
                      <div
                        key={index}
                        className="p-4 sm:p-5 rounded-xl bg-card border border-primary-700/10 hover:border-primary-700/30 transition-all group"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-primary-700 group-hover:scale-110 transition-transform" />
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
                    <Gift className="w-8 h-8 text-accent" />
                  </div>
                  <h3 className="font-black text-xl sm:text-2xl uppercase tracking-tight mb-2">
                    Free Assessment Session
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    No commitment • No payment required
                  </p>
                </div>

                <ul className="space-y-3 mb-6">
                  {[
                    "30-minute trial session",
                    "Meet the teacher",
                    "Experience our method",
                    "Level assessment",
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <CheckCircle2 className="w-4 h-4 text-accent" />
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>

                <Link href="#assessment">
                  <Button className="w-full rounded-full bg-accent hover:bg-accent/90 text-white font-black">
                    SCHEDULE FREE ASSESSMENT
                  </Button>
                </Link>
              </div>
            </Reveal>
          </div>
          </div>
        </section>

        
     

        {/* Pricing Section - Your existing structure */}
        <section
          id="pricing"
          className="py-12 sm:py-16 md:py-24 bg-linear-to-b from-background to-primary-50/5 dark:to-primary-950/5 rounded-3xl"
        >
          <div className="max-w-6xl mx-auto">
            <Reveal>
              <div className="text-center mb-12 sm:mb-16 space-y-4">
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter">
                  Simple,{" "}
                  <span className="text-primary-700 italic">Affordable</span>{" "}
                  Plans
                </h2>
                <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto">
                  Choose the payment option that works best for your family
                </p>
              </div>
            </Reveal>

            <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
              {[
                {
                  name: "Monthly",
                  price: "$16",
                  period: "/month",
                  description: "Perfect for trying out",
                  features: [
                    "No long-term commitment",
                    "Cancel anytime",
                    "Full access",
                    "Progress reports",
                  ],
                  popular: false,
                  planId: "monthly",
                },
                {
                  name: "Quarterly",
                  price: "$45",
                  period: "/3 months",
                  description: "Save 6+%",
                  features: [
                    "Best value",
                    "Priority scheduling",
                    "Free materials",
                    "Parent portal access",
                  ],
                  popular: true,
                  planId: "quarterly",
                },
                {
                  name: "Annual",
                  price: "$165",
                  period: "/year",
                  description: "Save 1% + bonus",
                  features: [
                    "Maximum savings",
                    "Free assessment sessions",
                    "Certificate included",
                    "Bonus Quran workbook",
                  ],
                  popular: false,
                  planId: "annual",
                },
              ].map((plan, index) => (
                <Reveal key={index} delay={index * 0.1}>
                  <div
                    className={cn(
                      "institutional-card p-5 sm:p-6 md:p-8 h-full flex flex-col relative transition-all duration-300 hover:-translate-y-1",
                      plan.popular &&
                        "border-2 border-primary-700 shadow-royal",
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
                      <p className="text-xs sm:text-sm text-muted-foreground mt-2">
                        {plan.description}
                      </p>
                    </div>

                    <ul className="space-y-2 sm:space-y-3 mb-6 grow">
                      {plan.features.map((feature, idx) => (
                        <li
                          key={idx}
                          className="flex items-center gap-2 text-xs sm:text-sm"
                        >
                          <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary-700 shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Link
                      href={`#enroll-form?plan=${plan.planId}`}
                      className="mt-auto"
                    >
                      <Button
                        className={cn(
                          "w-full rounded-full font-black transition-all duration-300",
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
          </div>
        </section>

        {/* Teachers Section - Your existing structure */}
        <section className="py-12 sm:py-16 md:py-24">
          <div className="max-w-6xl mx-auto">
            <Reveal>
              <div className="text-center mb-12 sm:mb-16 space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 dark:bg-primary-900/30 text-primary-700 text-[10px] font-black uppercase tracking-wider mb-4">
                  <Shield className="w-3.5 h-3.5" /> CERTIFIED SCHOLARS
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter">
                  Meet Your{" "}
                  <span className="text-primary-700 italic">Teachers</span>
                </h2>
                <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto">
                  Experienced, patient, and certified in teaching children
                </p>
              </div>
            </Reveal>

            <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
              {COURSE_DETAILS.teachers.map((teacher, index) => (
                <Reveal key={index} delay={index * 0.1}>
                  <div className="institutional-card p-5 sm:p-6 flex items-start gap-4 hover:border-primary-700/30 transition-all duration-300 group">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-linear-to-br from-primary-700 to-primary-800 flex items-center justify-center text-white font-black text-2xl group-hover:scale-105 transition-transform">
                      {teacher.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-black text-base sm:text-lg uppercase tracking-tight mb-2">
                        {teacher.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        {teacher.qualifications}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ENROLLMENT FORM SECTION - Your existing structure */}
        <section
          id="enroll-form"
          className="py-12 sm:py-16 md:py-24 scroll-mt-20 bg-linear-to-b from-background to-primary-50/5 dark:to-primary-950/5 rounded-3xl"
        >
          <div className="max-w-4xl mx-auto">
            <Reveal>
              <div className="text-center mb-8 sm:mb-12 space-y-4">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter">
                  Enroll Your{" "}
                  <span className="text-primary-700 italic">Child</span> Today
                </h2>
                <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
                  {`  Complete the form below to secure your child's spot in our
                    upcoming Group Qiro'ah session. We can't wait to welcome you to our Quran learning family!`}
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="institutional-card p-6 sm:p-8 md:p-10">
                <EnrollmentForm
                  courseId="group-qiroah"
                  courseName="Group Qiro'ah for Children"
                  priceOptions={[
                    { id: "monthly", name: "Monthly", price: 16 },
                    { id: "quarterly", name: "Quarterly", price: 45 },
                    { id: "annual", name: "Annual", price: 165 },
                  ]}
                  scheduleOptions={COURSE_DETAILS.schedule.map(
                    (slot, index) => ({
                      id: `slot-${index}`,
                      label: `${slot.day} • ${slot.time}`,
                    }),
                  )}
                />
              </div>
            </Reveal>
          </div>
        </section>

        {/* TRIAL FORM SECTION - Your existing structure */}
        {/* <section
          id="trial-form"
          className="py-12 sm:py-16 md:py-24 scroll-mt-20"
        >
          <div className="max-w-4xl mx-auto">
            <Reveal>
              <div className="text-center mb-8 sm:mb-12 space-y-4">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter">
                  Try a{" "}
                  <span className="text-primary-700 italic">Free Class</span>
                </h2>
                <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
                  {No commitment required. Experience our teaching style and see
                  if it's right for your child.}
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="institutional-card p-6 sm:p-8 md:p-10 border-2 border-accent/20 bg-linear-to-br from-accent/5 to-accent/10">
                <TrialForm
                  courseId="group-qiroah"
                  courseName="Group Qiro'ah for Children"
                  scheduleOptions={COURSE_DETAILS.schedule.map(
                    (slot, index) => ({
                      id: `trial-${index}`,
                      label: `${slot.day} • ${slot.time}`,
                    }),
                  )}
                />
              </div>
            </Reveal>
          </div>
        </section> */}

        {/* FAQ Section - Enhanced with better styling */}
        <section className="py-12 sm:py-16 md:py-24 bg-linear-to-b from-background to-primary-50/5 dark:to-primary-950/5 rounded-3xl">
          <div className="max-w-4xl mx-auto">
            <Reveal>
              <div className="text-center mb-12 sm:mb-16 space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 dark:bg-primary-900/30 text-primary-700 text-[10px] font-black uppercase tracking-wider mb-4">
                  <HelpCircle className="w-3.5 h-3.5" /> COMMON QUESTIONS
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter">
                  Frequently Asked{" "}
                  <span className="text-primary-700 italic">Questions</span>
                </h2>
                <p className="text-base sm:text-lg text-muted-foreground">
                  Everything parents need to know
                </p>
              </div>
            </Reveal>

            <div className="space-y-3 sm:space-y-4">
              {COURSE_DETAILS.faqs.map((faq, index) => (
                <Reveal key={index} delay={index * 0.05}>
                  <div className="institutional-card p-4 sm:p-6 hover:border-primary-700/30 transition-all duration-300 group">
                    <div className="flex gap-3 sm:gap-4">
                      <div className="w-8 h-8 rounded-lg bg-primary-50 dark:bg-primary-950/40 flex items-center justify-center shrink-0 group-hover:bg-primary-700/10 transition-colors">
                        <HelpCircle className="w-4 h-4 text-primary-700" />
                      </div>
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
          </div>
        </section>

        {/* ==================== FINAL CTA ==================== */}
        <section id="assessment" className="py-12 sm:py-16 md:py-20">
          <Reveal>
            <div className="institutional-card p-8 sm:p-10 md:p-12 text-center border-2 border-primary-700/20 max-w-4xl mx-auto">
              <Smile className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 mx-auto mb-4 sm:mb-6 text-primary-700" />

              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter mb-4">
                {` Start Your Child's`}{" "}
                <span className="text-primary-700 italic">Quran</span> Journey
              </h2>

              <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto mb-6 sm:mb-8">
                Give your child the gift of Quranic connection in a fun,
                supportive environment
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/admissions">
                  <Button className="rounded-full px-8 py-4 sm:px-10 sm:py-5 font-black bg-primary-700 hover:bg-primary-800 text-base sm:text-lg min-h-11">
                    <span className="flex items-center gap-3">
                      ENROLL NOW
                      <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                    </span>
                  </Button>
                </Link>

                <Link href="/contact">
                  <Button
                    variant="outline"
                    className="rounded-full px-8 py-4 sm:px-10 sm:py-5 font-black text-base sm:text-lg min-h-11"
                  >
                    FREE ASSESSMENT
                  </Button>
                </Link>
              </div>

              <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-border/50">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary-700" />
                    Satisfaction Guaranteed
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary-700" />
                    Free Assessment Available
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary-700" />
                    Flexible Scheduling
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
