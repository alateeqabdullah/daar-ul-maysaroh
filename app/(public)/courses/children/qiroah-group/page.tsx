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
} from "lucide-react";
import { TrialForm } from "@/components/forms/trial-form";
import { cn } from "@/lib/utils";

// Mock data - replace with actual Prisma queries
const COURSE_DETAILS = {
  name: "Group Qiro'ah for Children",
  tagline: "Learn to Read Quran with Joy & Confidence",
  description:
    "A nurturing environment where children ages 7-12 learn proper Quranic recitation through interactive group sessions, games, and positive reinforcement.",
  ageGroup: "7-12 years",
  duration: "6 months",
  sessionsPerWeek: 2,
  sessionDuration: "45 minutes",
  classSize: "4-6 students",
  startDate: "September 2026",
  price: {
    monthly: 89,
    quarterly: 240,
    annually: 899,
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
      ],
    },
    {
      level: "Level 3: Confident Reading",
      months: "Months 5-6",
      topics: [
        "Fluent Quranic reading",
        "Juz Amma mastery",
        "Basic memorization",
        "Public recitation practice",
      ],
    },
  ],
  schedule: [
    { day: "Monday & Wednesday", time: "4:00 PM - 4:45 PM (EST)" },
    { day: "Tuesday & Thursday", time: "5:00 PM - 5:45 PM (EST)" },
    { day: "Saturday", time: "10:00 AM - 11:30 AM (EST)" },
  ],
  teachers: [
    {
      name: "Ustadha Fatima Al-Misri",
      qualifications: "Ijazah in Hifz & Tajweed, 10 years teaching children",
      image: "/teachers/fatima.jpg",
    },
    {
      name: "Ustadh Ahmed Al-Makki",
      qualifications: "Ijazah in Qira'at, 8 years experience with children",
      image: "/teachers/ahmed.jpg",
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
  // Fetch pricing plans from database if needed
  // const dbPlans = await prisma.pricingPlan.findMany({
  //   where: { isActive: true, courseId: "group-qiroah" },
  //   include: { pricingTiers: true },
  //   orderBy: { orderIndex: "asc" },
  // });

  return (
    <main className="pt-16 sm:pt-20 md:pt-24 lg:pt-28 xl:pt-32 bg-background overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6">
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
              <Link
                href="/courses/children"
                className="hover:text-primary-700 transition-colors"
              >
                Children
              </Link>
              <span className="mx-2">/</span>
              <span className="text-primary-700 font-medium">
                Group Qiro'ah
              </span>
            </div>

            {/* Hero Content */}
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 xl:gap-16">
              <div className="lg:w-1/2 space-y-4 sm:space-y-6">
                <Reveal>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 text-[11px] font-black uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5" /> ENROLLING NOW • AGES
                    7-12
                  </div>
                </Reveal>

                <Reveal delay={0.1}>
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter font-heading leading-[0.9]">
                    Group{" "}
                    <span className="text-primary-700 italic">Qiro'ah</span>
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
                    <Link href="#enroll-form" className="w-full sm:w-auto">
                      <Button className="w-full rounded-full px-6 py-3 sm:px-8 sm:py-4 font-black bg-primary-700 hover:bg-primary-800 text-sm sm:text-base min-h-[44px]">
                        <span className="flex items-center justify-center gap-2 sm:gap-3">
                          ENROLL NOW
                          <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        </span>
                      </Button>
                    </Link>
                    <Link href="#trial-form" className="w-full sm:w-auto">
                      <Button
                        variant="outline"
                        className="w-full rounded-full px-6 py-3 sm:px-8 sm:py-4 font-black text-sm sm:text-base min-h-[44px]"
                      >
                        FREE TRIAL CLASS
                      </Button>
                    </Link>
                  </div>
                </Reveal>
              </div>

              {/* Hero Visual */}
              <Reveal delay={0.4} className="lg:w-1/2">
                <div className="institutional-card p-6 sm:p-8 bg-gradient-to-br from-primary-50/20 to-primary-100/10 dark:from-primary-950/20 dark:to-primary-900/10 border-2 border-primary-700/20">
                  <div className="grid grid-cols-2 gap-4 sm:gap-6 mb-6">
                    <div className="space-y-1">
                      <div className="text-2xl sm:text-3xl font-black text-primary-700">
                        $89
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
                        Sept
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
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-12 sm:py-16 md:py-24 bg-gradient-to-b from-background to-primary-50/5 dark:to-primary-950/5">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <Reveal>
              <div className="text-center mb-12 sm:mb-16 space-y-4">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter">
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
          </div>
        </div>
      </section>

      {/* Curriculum Section */}
      <section className="py-12 sm:py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <Reveal>
              <div className="text-center mb-12 sm:mb-16 space-y-4">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter">
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
        </div>
      </section>

      {/* Schedule Section */}
      <section className="py-12 sm:py-16 md:py-24 bg-gradient-to-b from-background to-primary-50/5 dark:to-primary-950/5">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 sm:gap-12 items-start">
              <Reveal>
                <div className="space-y-6">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tighter">
                    Choose Your{" "}
                    <span className="text-primary-700 italic">Schedule</span>
                  </h2>
                  <p className="text-base sm:text-lg text-muted-foreground">
                    Multiple time slots available to fit your family's routine.
                    All times shown in Eastern Time (EST).
                  </p>

                  <div className="space-y-3 sm:space-y-4">
                    {COURSE_DETAILS.schedule.map((slot, index) => (
                      <div
                        key={index}
                        className="p-4 sm:p-5 rounded-xl bg-card border border-primary-700/10 hover:border-primary-700/30 transition-all"
                      >
                        <div className="flex items-center justify-between">
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
                <div className="institutional-card p-6 sm:p-8 bg-gradient-to-br from-accent/5 to-accent/10 border-2 border-accent/20">
                  <h3 className="font-black text-xl sm:text-2xl uppercase tracking-tight mb-4 text-center">
                    Free Trial Class
                  </h3>
                  <div className="text-center mb-6">
                    <div className="text-4xl sm:text-5xl font-black text-accent mb-2">
                      $0
                    </div>
                    <p className="text-sm text-muted-foreground">
                      No commitment required
                    </p>
                  </div>
                  <ul className="space-y-3 mb-6">
                    {[
                      "30-minute trial session",
                      "Meet the teacher",
                      "Experience our method",
                      "Assessment of your child's level",
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-center gap-3">
                        <CheckCircle className="w-4 h-4 text-accent" />
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href="#trial-form">
                    <Button className="w-full rounded-full bg-accent hover:bg-accent/90 text-white font-black">
                      SCHEDULE FREE TRIAL
                    </Button>
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-12 sm:py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <Reveal>
              <div className="text-center mb-12 sm:mb-16 space-y-4">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter">
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
                  price: "$89",
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
                  price: "$240",
                  period: "/3 months",
                  description: "Save 10%",
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
                  price: "$899",
                  period: "/year",
                  description: "Save 15% + bonus",
                  features: [
                    "Maximum savings",
                    "Free trial class",
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
                      "institutional-card p-5 sm:p-6 md:p-8 h-full flex flex-col relative",
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

                    <ul className="space-y-2 sm:space-y-3 mb-6 flex-grow">
                      {plan.features.map((feature, idx) => (
                        <li
                          key={idx}
                          className="flex items-center gap-2 text-xs sm:text-sm"
                        >
                          <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary-700 flex-shrink-0" />
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
          </div>
        </div>
      </section>

      {/* Teachers Section */}
      <section className="py-12 sm:py-16 md:py-24 bg-gradient-to-b from-background to-primary-50/5 dark:to-primary-950/5">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <Reveal>
              <div className="text-center mb-12 sm:mb-16 space-y-4">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter">
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
                  <div className="institutional-card p-5 sm:p-6 flex items-start gap-4">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-primary-700 to-primary-800 flex items-center justify-center text-white font-black text-2xl">
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
        </div>
      </section>

      {/* ENROLLMENT FORM SECTION */}
      <section
        id="enroll-form"
        className="py-12 sm:py-16 md:py-24 scroll-mt-20"
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <Reveal>
              <div className="text-center mb-8 sm:mb-12 space-y-4">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter">
                  Enroll Your{" "}
                  <span className="text-primary-700 italic">Child</span> Today
                </h2>
                <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
                  Complete the form below to secure your child's spot in our
                  upcoming Group Qiro'ah session
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="institutional-card p-6 sm:p-8 md:p-10">
                <EnrollmentForm
                  courseId="group-qiroah"
                  courseName="Group Qiro'ah for Children"
                  priceOptions={[
                    { id: "monthly", name: "Monthly", price: 89 },
                    { id: "quarterly", name: "Quarterly", price: 240 },
                    { id: "annual", name: "Annual", price: 899 },
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
        </div>
      </section>

      {/* TRIAL FORM SECTION */}
      <section
        id="trial-form"
        className="py-12 sm:py-16 md:py-24 bg-gradient-to-b from-background to-primary-50/5 dark:to-primary-950/5 scroll-mt-20"
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <Reveal>
              <div className="text-center mb-8 sm:mb-12 space-y-4">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter">
                  Try a{" "}
                  <span className="text-primary-700 italic">Free Class</span>
                </h2>
                <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
                  No commitment required. Experience our teaching style and see
                  if it's right for your child.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="institutional-card p-6 sm:p-8 md:p-10 border-2 border-accent/20 bg-gradient-to-br from-accent/5 to-accent/10">
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
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 sm:py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <Reveal>
              <div className="text-center mb-12 sm:mb-16 space-y-4">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter">
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
                  <div className="institutional-card p-4 sm:p-6 hover:border-primary-700/30 transition-all duration-300">
                    <h3 className="font-black text-sm sm:text-base uppercase tracking-tight mb-2">
                      {faq.q}
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-12 sm:py-16 md:py-24 bg-gradient-to-b from-background to-primary-50/5 dark:to-primary-950/5">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <Reveal>
              <div className="institutional-card p-8 sm:p-10 md:p-12 text-center border-2 border-primary-700/20">
                <Smile className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 mx-auto mb-4 sm:mb-6 text-primary-700" />

                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter mb-4">
                  Start Your Child's{" "}
                  <span className="text-primary-700 italic">Quran</span> Journey
                </h2>

                <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto mb-6 sm:mb-8">
                  Give your child the gift of Quranic connection in a fun,
                  supportive environment
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="#enroll-form">
                    <Button className="rounded-full px-8 py-4 sm:px-10 sm:py-5 font-black bg-primary-700 hover:bg-primary-800 text-base sm:text-lg min-h-[44px]">
                      <span className="flex items-center gap-3">
                        ENROLL NOW
                        <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                      </span>
                    </Button>
                  </Link>

                  <Link href="#trial-form">
                    <Button
                      variant="outline"
                      className="rounded-full px-8 py-4 sm:px-10 sm:py-5 font-black text-base sm:text-lg min-h-[44px]"
                    >
                      FREE TRIAL CLASS
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
                      Free Trial Available
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary-700" />
                      Flexible Scheduling
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </main>
  );
}

