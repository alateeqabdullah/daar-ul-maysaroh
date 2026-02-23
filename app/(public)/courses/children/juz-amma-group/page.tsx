import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/shared/section-animation";
import Link from "next/link";
import { EnrollmentForm } from "@/components/forms/enrollment-form";
import {
  Sparkles,
  Users,
  Clock,
  Calendar,
  Star,
  Heart,
  BookOpen,
  CheckCircle2,
  Shield,
  CheckCircle,
  ArrowRight,
  Crown,
  Volume2,
  BookHeart,
  Scroll,
  Sun as SunIcon,
  CloudSun,
  Star as StarIcon,
  Moon as MoonIcon,
  Trophy,
  MoonStar,
} from "lucide-react";
import { TrialForm } from "@/components/forms/trial-form";
import { cn } from "@/lib/utils";

// Mock data - replace with actual Prisma queries
const JUZ_AMMA_DETAILS = {
  name: "Juz Amma Group for Children",
  tagline: "Memorize the Last Chapter with Joy & Understanding",
  description: "A fun, engaging program where children ages 6-12 memorize Juz Amma (Surah 78-114) with proper Tajweed, understanding of meanings, and interactive activities.",
  ageGroup: "6-12 years",
  duration: "8 months",
  sessionsPerWeek: 2,
  sessionDuration: "50-90 minutes",
  classSize: "5-8 students",
  startDate: "March 2026",
  surahs: 37,
  verses: 564,
  price: {
    monthly: 15,
    quarterly: 60,
    annually: 120,
  },
  features: [
    "Complete Juz Amma memorization",
    "Meaning of each surah (simple Tafsir)",
    "Tajweed rules for children",
    "Fun memorization games",
    "Progress certificates",
    "Parent portal access",
    "Weekly progress reports",
    "Reward system with prizes",
    "Audio recordings for practice",
  ],
  curriculum: [
    {
      level: "Level 1: Short Surahs",
      months: "Months 1-2",
      surahs: "Surah Al-Fatiha, An-Nas to Al-Falaq (Surah 114-105)",
      topics: [
        "Surah Al-Fatiha (The Opening)",
        "Surah An-Nas (Mankind)",
        "Surah Al-Falaq (The Daybreak)",
        "Surah Al-Ikhlas (Sincerity)",
        "Surah Al-Masad (The Palm Fiber)",
        "Surah An-Nasr (Divine Support)",
        "Memorization techniques for beginners",
        "Basic pronunciation practice",
      ],
      icon: SunIcon,
    },
    {
      level: "Level 2: Middle Surahs",
      months: "Months 3-5",
      surahs: "Surah Al-Kafirun to Al-Qadr (Surah 104-97)",
      topics: [
        "Surah Al-Kafirun (The Disbelievers)",
        "Surah Al-Kawthar (Abundance)",
        "Surah Al-Ma'un (Small Kindnesses)",
        "Surah Quraysh (Quraysh)",
        "Surah Al-Fil (The Elephant)",
        "Surah Al-Humazah (The Slanderer)",
        "Surah Al-Asr (The Time)",
        "Surah At-Takathur (Competition)",
        "Introduction to Tajweed rules",
        "Meaning and stories behind surahs",
      ],
      icon: CloudSun,
    },
    {
      level: "Level 3: Longer Surahs",
      months: "Months 6-8",
      surahs: "Surah Al-Qari'ah to An-Naba (Surah 96-78)",
      topics: [
        "Surah Al-Qari'ah (The Striking Hour)",
        "Surah Al-Zalzalah (The Earthquake)",
        "Surah Al-Bayyinah (The Clear Proof)",
        "Surah Al-Qadr (The Night of Power)",
        "Surah Al-Alaq (The Clot)",
        "Surah At-Tin (The Fig)",
        "Surah Al-Inshirah (The Relief)",
        "Surah Ad-Duha (The Morning Hours)",
        "Surah Al-Lail (The Night)",
        "Surah Ash-Shams (The Sun)",
        "Surah Al-Balad (The City)",
        "Surah Al-Fajr (The Dawn)",
        "Surah Al-Ghashiyah (The Overwhelming)",
        "Surah Al-A'la (The Most High)",
        "Surah At-Tariq (The Nightcomer)",
        "Surah Al-Buruj (The Constellations)",
        "Surah Al-Inshiqaq (The Splitting Open)",
        "Surah Al-Mutaffifin (The Defrauding)",
        "Surah Al-Infitar (The Cleaving)",
        "Surah At-Takwir (The Overthrowing)",
        "Surah Abasa (He Frowned)",
        "Surah An-Nazi'at (Those Who Drag Forth)",
        "Surah An-Naba (The Great News)",
        "Complete revision and fluency",
        "Public recitation practice",
      ],
      icon: MoonStar,
    },
  ],
  schedule: [
    { day: "Monday & Wednesday", time: "4:30 PM - 5:20 PM (EST)" },
    { day: "Tuesday & Thursday", time: "5:30 PM - 6:20 PM (EST)" },
    { day: "Saturday", time: "11:00 AM - 12:30 PM (EST)" },
    { day: "Sunday", time: "10:00 AM - 11:30 AM (EST)" },
  ],
  teachers: [
    {
      name: "Ustadha Aisha Al-Makkiyyah",
      qualifications: "Ijazah in Hifz & Tajweed, 12 years teaching children's Hifz programs",
      specialty: "Juz Amma memorization specialist",
    },
    {
      name: "Ustadh Yusuf Al-Madani",
      qualifications: "Ijazah in the Ten Qira'at, 9 years experience with children",
      specialty: "Tajweed and pronunciation expert",
    },
    {
      name: "Ustadha Khadija Al-Misriyyah",
      qualifications: "Child psychology background, 8 years teaching Juz Amma",
      specialty: "Engaging young learners",
    },
  ],
  benefits: [
    {
      icon: Crown,
      title: "Complete Juz Amma",
      description: "All 37 surahs from Surah An-Naba to An-Nas",
    },
    {
      icon: Heart,
      title: "Love for Quran",
      description: "Build a lifelong connection through fun activities",
    },
    {
      icon: Volume2,
      title: "Proper Tajweed",
      description: "Learn correct pronunciation from the start",
    },
    {
      icon: BookHeart,
      title: "Understand Meanings",
      description: "Simple Tafsir tailored for children",
    },
    {
      icon: Trophy,
      title: "Reward System",
      description: "Earn badges, certificates, and prizes",
    },
    {
      icon: Users,
      title: "Peer Motivation",
      description: "Learn together in a supportive group",
    },
  ],
  milestones: [
    {
      title: "Surah Al-Fatiha",
      description: "Master the most important surah in prayer",
      icon: Star,
    },
    {
      title: "Al-Ikhlas & Al-Mu'awwidhatayn",
      description: "The three protection surahs",
      icon: Shield,
    },
    {
      title: "Ayatul Kursi",
      description: "The Throne Verse",
      icon: Crown,
    },
    {
      title: "Complete Juz Amma",
      description: "All 37 surahs memorized perfectly",
      icon: Trophy,
    },
  ],
  rewards: [
    {
      name: "Bronze Reciter",
      surahs: "5 surahs",
      badge: "🎖️",
    },
    {
      name: "Silver Reciter",
      surahs: "15 surahs",
      badge: "🏅",
    },
    {
      name: "Gold Reciter",
      surahs: "25 surahs",
      badge: "🥇",
    },
    {
      name: "Juz Amma Master",
      surahs: "All 37 surahs",
      badge: "🏆",
    },
  ],
  faqs: [
    {
      q: "My child has never memorized before. Is this suitable?",
      a: "Absolutely! We start from the very beginning with short, easy surahs. Our teachers are experienced in introducing memorization techniques to complete beginners.",
    },
    {
      q: "How much time should we practice at home?",
      a: "We recommend 15-20 minutes of daily revision. Our portal provides audio tracks and games to make home practice fun and engaging.",
    },
    {
      q: "What if my child already knows some surahs?",
      a: "We'll assess their level during the first session and place them appropriately. They can review known surahs while progressing to new ones.",
    },
    {
      q: "Will my child learn the meanings of the surahs?",
      a: "Yes! Each surah is taught with simple, age-appropriate explanations of its meaning and context. We use stories and activities to reinforce understanding.",
    },
    {
      q: "What happens after completing Juz Amma?",
      a: "Graduates receive a special certificate and can advance to our Juz Tabarak or full Hifz program. Many continue their memorization journey with us.",
    },
  ],
};

export default async function JuzAmmaAdmissionsPage() {
  return (
    <main className="pt-16 sm:pt-20 md:pt-24 lg:pt-28 xl:pt-32 bg-background overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-6xl mx-auto py-8 sm:py-12 md:py-16 lg:py-20 space-y-6 sm:space-y-8 md:space-y-10">
            {/* Breadcrumb */}
            <div className="text-xs sm:text-sm text-muted-foreground">
              <Link href="/courses" className="hover:text-primary-700 transition-colors">Programs</Link>
              <span className="mx-2">/</span>
              <Link href="/courses/children" className="hover:text-primary-700 transition-colors">Children</Link>
              <span className="mx-2">/</span>
              <span className="text-primary-700 font-medium">Juz Amma Group</span>
            </div>

            {/* Hero Content */}

            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 xl:gap-16">
              <div className="lg:w-1/2 space-y-4 sm:space-y-6">
                <Reveal>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 text-[11px] font-black uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5" /> ENROLLING NOW • AGES 6-12
                  </div>
                </Reveal>

                <Reveal delay={0.1}>
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter font-heading leading-[0.9]">
                    Juz Amma <span className="text-primary-700 italic">Group</span>
                    <br />for Children
                  </h1>
                </Reveal>

                <Reveal delay={0.2}>
                  <p className="text-base sm:text-lg text-muted-foreground font-light leading-relaxed">
                    {JUZ_AMMA_DETAILS.description}
                  </p>
                </Reveal>

                <Reveal delay={0.3}>
                  <div className="flex flex-wrap gap-3 pt-2">
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 text-accent text-xs font-black">
                      <BookOpen className="w-3.5 h-3.5" />
                      {JUZ_AMMA_DETAILS.surahs} Surahs
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 text-accent text-xs font-black">
                      <Users className="w-3.5 h-3.5" />
                      {JUZ_AMMA_DETAILS.classSize}
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 text-accent text-xs font-black">
                      <Clock className="w-3.5 h-3.5" />
                      {JUZ_AMMA_DETAILS.sessionDuration}
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 text-accent text-xs font-black">
                      <Calendar className="w-3.5 h-3.5" />
                      {JUZ_AMMA_DETAILS.sessionsPerWeek}x/week
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
                      <Button variant="outline" className="w-full rounded-full px-6 py-3 sm:px-8 sm:py-4 font-black text-sm sm:text-base min-h-[44px]">
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
                      <div className="text-2xl sm:text-3xl font-black text-primary-700">$79</div>
                      <div className="text-xs text-muted-foreground">Monthly</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-2xl sm:text-3xl font-black text-primary-700">8 mo</div>
                      <div className="text-xs text-muted-foreground">Duration</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-2xl sm:text-3xl font-black text-primary-700">37</div>
                      <div className="text-xs text-muted-foreground">Surahs</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-2xl sm:text-3xl font-black text-primary-700">564</div>
                      <div className="text-xs text-muted-foreground">Verses</div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    <div className="p-2 rounded-lg bg-primary-700/10 text-center">
                      <SunIcon className="w-4 h-4 mx-auto mb-1 text-primary-700" />
                      <span className="text-xs">Short</span>
                    </div>
                    <div className="p-2 rounded-lg bg-primary-700/10 text-center">
                      <MoonIcon className="w-4 h-4 mx-auto mb-1 text-primary-700" />
                      <span className="text-xs">Middle</span>
                    </div>
                    <div className="p-2 rounded-lg bg-primary-700/10 text-center">
                      <StarIcon className="w-4 h-4 mx-auto mb-1 text-primary-700" />
                      <span className="text-xs">Long</span>
                    </div>
                  </div>

                  <div className="p-4 sm:p-6 rounded-xl bg-primary-700/5 border border-primary-700/10">
                    <div className="flex items-center gap-3 mb-2">
                      <Trophy className="w-6 h-6 sm:w-7 sm:h-7 text-primary-700" />
                      <div className="font-black text-base sm:text-lg uppercase tracking-tight">Reward-Based Learning</div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Badges • Certificates • Prizes • Progress Tracking
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="border-y border-border/50 bg-muted/10">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6 sm:py-8">
            {[
              { value: "37", label: "Surahs", icon: BookOpen },
              { value: "564", label: "Verses", icon: Scroll },
              { value: "8", label: "Months", icon: Calendar },
              { value: "5-8", label: "Students/Class", icon: Users },
            ].map((stat, index) => (
              <Reveal key={index} delay={index * 0.1}>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl md:text-4xl font-black text-primary-700">{stat.value}</div>
                  <div className="text-xs sm:text-sm text-muted-foreground mt-1">{stat.label}</div>
                </div>
              </Reveal>
            ))}
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
                  Why Choose Our <span className="text-primary-700 italic">Juz Amma</span> Program
                </h2>
                <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto">
                  A comprehensive approach to memorization, understanding, and loving the Quran
                </p>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {JUZ_AMMA_DETAILS.benefits.map((benefit, index) => (
                <Reveal key={index} delay={index * 0.1}>
                  <div className="institutional-card p-5 sm:p-6 h-full hover:border-primary-700/30 transition-all duration-300">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-primary-50 dark:bg-primary-950/40 flex items-center justify-center mb-3">
                      <benefit.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary-700" />
                    </div>
                    <h3 className="font-black text-sm sm:text-base uppercase tracking-tight mb-2">{benefit.title}</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground">{benefit.description}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Curriculum Section */}
      <section id="curriculum" className="py-12 sm:py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <Reveal>
              <div className="text-center mb-12 sm:mb-16 space-y-4">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter">
                  Step-by-Step <span className="text-primary-700 italic">Memorization</span>
                </h2>
                <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto">
                  A structured journey through all 37 surahs of Juz Amma
                </p>
              </div>
            </Reveal>

            <div className="space-y-6 sm:space-y-8">
              {JUZ_AMMA_DETAILS.curriculum.map((level, index) => {
                const Icon = level.icon;
                return (
                  <Reveal key={index} delay={index * 0.1}>
                    <div className="institutional-card p-5 sm:p-6 md:p-8 hover:border-primary-700/30 transition-all duration-300">
                      <div className="flex flex-col md:flex-row gap-6">
                        <div className="md:w-80 flex-shrink-0">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 rounded-lg bg-primary-700 text-white flex items-center justify-center">
                              <Icon className="w-5 h-5" />
                            </div>
                            <div>
                              <div className="font-black text-base sm:text-lg uppercase tracking-tight">{level.level}</div>
                              <p className="text-xs text-primary-700 font-black mt-1">{level.months}</p>
                            </div>
                          </div>
                          <p className="text-xs sm:text-sm text-muted-foreground font-medium mb-3">
                            {level.surahs}
                          </p>
                        </div>
                        
                        <div className="flex-1">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                            {level.topics.map((topic, idx) => (
                              <div key={idx} className="flex items-center gap-2 p-2 rounded-lg bg-primary-50/50 dark:bg-primary-950/20">
                                <CheckCircle2 className="w-3.5 h-3.5 text-primary-700 shrink-0" />
                                <span className="text-xs sm:text-sm">{topic}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Rewards & Milestones Section */}
      <section className="py-12 sm:py-16 md:py-24 bg-linear-to-b from-background to-primary-50/5 dark:to-primary-950/5">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <Reveal>
              <div className="text-center mb-12 sm:mb-16 space-y-4">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter">
                  Rewards & <span className="text-primary-700 italic">Achievements</span>
                </h2>
                <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto">
               {`   Celebrating every milestone in your child's memorization journey`}
                </p>
              </div>
            </Reveal>

            <div className="grid md:grid-cols-2 gap-8 sm:gap-12">
              {/* Milestones */}
              <div className="space-y-6">
                <h3 className="font-black text-xl uppercase tracking-tight mb-4">Key Milestones</h3>
                {JUZ_AMMA_DETAILS.milestones.map((milestone, index) => {
                  const Icon = milestone.icon;
                  return (
                    <Reveal key={index} delay={index * 0.1}>
                      <div className="flex items-start gap-4 p-4 rounded-xl bg-card border border-primary-700/10">
                        <div className="w-10 h-10 rounded-lg bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
                          <Icon className="w-5 h-5 text-primary-700" />
                        </div>
                        <div>
                          <h4 className="font-black text-base uppercase tracking-tight mb-1">{milestone.title}</h4>
                          <p className="text-sm text-muted-foreground">{milestone.description}</p>
                        </div>
                      </div>
                    </Reveal>
                  );
                })}
              </div>

              {/* Reward Badges */}
              <div className="space-y-6">
                <h3 className="font-black text-xl uppercase tracking-tight mb-4">Achievement Badges</h3>
                {JUZ_AMMA_DETAILS.rewards.map((reward, index) => (
                  <Reveal key={index} delay={index * 0.1}>
                    <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-accent/5 to-accent/10 border border-accent/20">
                      <div className="flex items-center gap-4">
                        <span className="text-3xl">{reward.badge}</span>
                        <div>
                          <h4 className="font-black text-base uppercase tracking-tight">{reward.name}</h4>
                          <p className="text-xs text-muted-foreground">{reward.surahs}</p>
                        </div>
                      </div>
                      <Trophy className="w-5 h-5 text-accent" />
                    </div>
                  </Reveal>
                ))}

                <div className="mt-8 p-6 rounded-xl bg-primary-700/5 border border-primary-700/20 text-center">
                  <Crown className="w-8 h-8 mx-auto mb-3 text-primary-700" />
                  <h4 className="font-black text-lg uppercase tracking-tight mb-2">Graduation Ceremony</h4>
                  <p className="text-sm text-muted-foreground">
                    All Juz Amma graduates receive a special certificate and are honored in our quarterly graduation ceremony.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Schedule Section */}
      <section className="py-12 sm:py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 sm:gap-12 items-start">
              <Reveal>
                <div className="space-y-6">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tighter">
                    Choose Your <span className="text-primary-700 italic">Schedule</span>
                  </h2>
                  <p className="text-base sm:text-lg text-muted-foreground">
                   {` Multiple time slots available to fit your family's routine. All times shown in Eastern Time (EST).`}
                  </p>
                  
                  <div className="space-y-3 sm:space-y-4">
                    {JUZ_AMMA_DETAILS.schedule.map((slot, index) => (
                      <div key={index} className="p-4 sm:p-5 rounded-xl bg-card border border-primary-700/10 hover:border-primary-700/30 transition-all">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-primary-700" />
                            <span className="font-black text-sm sm:text-base">{slot.day}</span>
                          </div>
                          <span className="text-xs sm:text-sm text-muted-foreground">{slot.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.2}>
                <div className="institutional-card p-6 sm:p-8 bg-linear-to-br from-accent/5 to-accent/10 border-2 border-accent/20">
                  <h3 className="font-black text-xl sm:text-2xl uppercase tracking-tight mb-4 text-center">
                    Free Trial Class
                  </h3>
                  <div className="text-center mb-6">
                    <div className="text-4xl sm:text-5xl font-black text-accent mb-2">$0</div>
                    <p className="text-sm text-muted-foreground">No commitment required</p>
                  </div>
                  <ul className="space-y-3 mb-6">
                    {[
                      "30-minute trial session",
                      "Meet the teacher",
                      "Sample our teaching method",
                      "Assessment of your child's level",
                      "Take home practice materials",
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

      {/* Teachers Section */}
      <section className="py-12 sm:py-16 md:py-24 bg-gradient-to-b from-background to-primary-50/5 dark:to-primary-950/5">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <Reveal>
              <div className="text-center mb-12 sm:mb-16 space-y-4">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter">
                  Meet Your <span className="text-primary-700 italic">Teachers</span>
                </h2>
                <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto">
                  Experienced, patient educators who specialize in teaching children
                </p>
              </div>
            </Reveal>

            <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
              {JUZ_AMMA_DETAILS.teachers.map((teacher, index) => (
                <Reveal key={index} delay={index * 0.1}>
                  <div className="institutional-card p-5 sm:p-6 text-center h-full">
                    <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary-700 to-primary-800 flex items-center justify-center text-white font-black text-3xl">
                      {teacher.name.charAt(0)}
                    </div>
                    <h3 className="font-black text-lg uppercase tracking-tight mb-2">{teacher.name}</h3>
                    <p className="text-xs text-primary-700 font-black mb-3">{teacher.specialty}</p>
                    <p className="text-xs sm:text-sm text-muted-foreground">{teacher.qualifications}</p>
                  </div>
                </Reveal>
              ))}
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
                  Simple, <span className="text-primary-700 italic">Affordable</span> Plans
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
                  price: "$20",
                  period: "/month",
                  description: "Perfect for trying out",
                  features: ["No long-term commitment", "Cancel anytime", "Full access to all classes", "Weekly progress reports"],
                  popular: false,
                  planId: "monthly",
                },
                {
                  name: "Quarterly",
                  price: "$55",
                  period: "/3 months",
                  description: "Save 10%",
                  features: ["Best value", "Priority scheduling", "Free practice materials", "Parent portal access", "Monthly progress calls"],
                  popular: true,
                  planId: "quarterly",
                },
                {
                  name: "Annual",
                  price: "$100",
                  period: "/year",
                  description: "Save 15% + bonus",
                  features: ["Maximum savings", "Free trial class", "Certificate included", "Bonus workbook", "Graduation gift"],
                  popular: false,
                  planId: "annual",
                },
              ].map((plan, index) => (
                <Reveal key={index} delay={index * 0.1}>
                  <div className={cn(
                    "institutional-card p-5 sm:p-6 md:p-8 h-full flex flex-col relative",
                    plan.popular && "border-2 border-primary-700 shadow-royal"
                  )}>
                    {plan.popular && (
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary-700 text-white px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider">
                        MOST POPULAR
                      </div>
                    )}
                    
                    <div className="mb-4 sm:mb-6">
                      <h3 className="font-black text-lg sm:text-xl uppercase tracking-tight mb-2">{plan.name}</h3>
                      <div className="flex items-baseline gap-1">
                        <span className="text-3xl sm:text-4xl font-black text-primary-700">{plan.price}</span>
                        <span className="text-xs sm:text-sm text-muted-foreground">{plan.period}</span>
                      </div>
                      <p className="text-xs sm:text-sm text-muted-foreground mt-2">{plan.description}</p>
                    </div>

                    <ul className="space-y-2 sm:space-y-3 mb-6 flex-grow">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-xs sm:text-sm">
                          <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary-700 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Link href={`#enroll-form?plan=${plan.planId}`} className="mt-auto">
                      <Button 
                        className={cn(
                          "w-full rounded-full font-black",
                          plan.popular 
                            ? "bg-primary-700 hover:bg-primary-800 text-white" 
                            : "bg-primary-700/10 hover:bg-primary-700/20 text-primary-700"
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

      {/* ENROLLMENT FORM SECTION */}
      <section id="enroll-form" className="py-12 sm:py-16 md:py-24 bg-gradient-to-b from-background to-primary-50/5 dark:to-primary-950/5 scroll-mt-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <Reveal>
              <div className="text-center mb-8 sm:mb-12 space-y-4">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter">
                  Enroll Your <span className="text-primary-700 italic">Child</span> Today
                </h2>
                <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
                  Complete the form below to secure your child's spot in our Juz Amma program
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="institutional-card p-6 sm:p-8 md:p-10">
                <EnrollmentForm 
                  courseId="juz-amma"
                  courseName="Juz Amma Group for Children"
                  priceOptions={[
                    { id: "monthly", name: "Monthly", price: 79 },
                    { id: "quarterly", name: "Quarterly", price: 215 },
                    { id: "annual", name: "Annual", price: 799 },
                  ]}
                  scheduleOptions={JUZ_AMMA_DETAILS.schedule.map((slot, index) => ({
                    id: `slot-${index}`,
                    label: `${slot.day} • ${slot.time}`,
                  }))}
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* TRIAL FORM SECTION */}
      <section id="trial-form" className="py-12 sm:py-16 md:py-24 bg-gradient-to-b from-background to-primary-50/5 dark:to-primary-950/5 scroll-mt-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <Reveal>
              <div className="text-center mb-8 sm:mb-12 space-y-4">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter">
                  Schedule a  <span className="text-primary-700 italic">Free Assessment Class</span>
                </h2>
                <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
                  Experience our teaching style and see if Juz Amma memorization is right for your child.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="institutional-card p-6 sm:p-8 md:p-10 border-2 border-accent/20 bg-gradient-to-br from-accent/5 to-accent/10">
                <TrialForm 
                  courseId="juz-amma"
                  courseName="Juz Amma Group for Children"
                  scheduleOptions={JUZ_AMMA_DETAILS.schedule.map((slot, index) => ({
                    id: `trial-${index}`,
                    label: `${slot.day} • ${slot.time}`,
                  }))}
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
                  Frequently Asked <span className="text-primary-700 italic">Questions</span>
                </h2>
                <p className="text-base sm:text-lg text-muted-foreground">
                  Everything parents need to know about Juz Amma memorization
                </p>
              </div>
            </Reveal>

            <div className="space-y-3 sm:space-y-4">
              {JUZ_AMMA_DETAILS.faqs.map((faq, index) => (
                <Reveal key={index} delay={index * 0.05}>
                  <div className="institutional-card p-4 sm:p-6 hover:border-primary-700/30 transition-all duration-300">
                    <h3 className="font-black text-sm sm:text-base uppercase tracking-tight mb-2">{faq.q}</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
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
                <MoonStar className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 mx-auto mb-4 sm:mb-6 text-primary-700" />
                
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter mb-4">
                  Begin Your Child's <span className="text-primary-700 italic">Juz Amma</span> Journey
                </h2>
                
                <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto mb-6 sm:mb-8">
                  Give your child the gift of memorizing the most recited portion of the Quran
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
                    <Button variant="outline" className="rounded-full px-8 py-4 sm:px-10 sm:py-5 font-black text-base sm:text-lg min-h-[44px]">
                      FREE TRIAL CLASS
                    </Button>
                  </Link>
                </div>

                <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-border/50">
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary-700" />
                      37 Surahs Complete
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary-700" />
                      Reward System
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary-700" />
                      Graduation Ceremony
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
