import {
  Calendar,
  CreditCard,
  Banknote,
  GraduationCap,
  CheckCircle2,
  Shield,
  Users,
  Clock,
  BookOpen,
  Sparkles,
  Award,
  ArrowRight,
  HelpCircle,
  Landmark,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/shared/section-animation";
import Link from "next/link";

export default function AdmissionsPage() {
  return (
    <main className="pt-16 sm:pt-20 md:pt-24 lg:pt-28 xl:pt-32 bg-background overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-6xl mx-auto py-8 sm:py-12 md:py-16 lg:py-20 space-y-6 sm:space-y-8 md:space-y-10">
            {/* Breadcrumb */}
            <div className="text-xs sm:text-sm text-muted-foreground">
              <Link
                href="/"
                className="hover:text-primary-700 transition-colors"
              >
                Home
              </Link>
              <span className="mx-2">/</span>
              <span className="text-primary-700 font-medium">Admissions</span>
            </div>

            {/* Hero Content */}
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 xl:gap-16">
              <div className="lg:w-1/2 space-y-4 sm:space-y-6">
                <Reveal>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 text-[11px] font-black uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5" /> 2026 Intake Now Open
                  </div>
                </Reveal>

                <Reveal delay={0.1}>
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter font-heading leading-[0.9]">
                    Al-Maysaroh{" "}
                    <span className="text-primary-700 italic">Admissions</span>
                    <br />
                    Process
                  </h1>
                </Reveal>

                <Reveal delay={0.2}>
                  <p className="text-base sm:text-lg text-muted-foreground font-light leading-relaxed">
                    Begin your sacred journey with a streamlined, transparent
                    admission process. Our global enrollment system accommodates
                    students from 50+ countries with diverse financial
                    backgrounds.
                  </p>
                </Reveal>

                <Reveal delay={0.3}>
                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <Link href="#apply-now" className="w-full sm:w-auto">
                      <Button className="w-full rounded-full px-6 py-3 sm:px-8 sm:py-4 font-black bg-primary-700 hover:bg-primary-800 text-sm sm:text-base min-h-[44px]">
                        <span className="flex items-center justify-center gap-2 sm:gap-3">
                          START APPLICATION
                          <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        </span>
                      </Button>
                    </Link>
                    <Link
                      href="#financial-channels"
                      className="w-full sm:w-auto"
                    >
                      <Button
                        variant="outline"
                        className="w-full rounded-full px-6 py-3 sm:px-8 sm:py-4 font-black text-sm sm:text-base min-h-[44px]"
                      >
                        VIEW PAYMENT OPTIONS
                      </Button>
                    </Link>
                  </div>
                </Reveal>
              </div>

              {/* Hero Stats */}
              <Reveal delay={0.4} className="lg:w-1/2">
                <div className="institutional-card p-6 sm:p-8 bg-gradient-to-br from-primary-50/20 to-primary-100/10 dark:from-primary-950/20 dark:to-primary-900/10 border-2 border-primary-700/20">
                  <div className="grid grid-cols-2 gap-4 sm:gap-6 mb-6">
                    {[
                      {
                        value: "24-48",
                        label: "Hours Processing",
                        icon: Clock,
                      },
                      { value: "50+", label: "Countries", icon: Users },
                      {
                        value: "2",
                        label: "Payment Channels",
                        icon: CreditCard,
                      },
                      { value: "100%", label: "Online Process", icon: Shield },
                    ].map((stat, idx) => (
                      <div key={idx} className="space-y-1">
                        <div className="text-2xl sm:text-3xl font-black text-primary-700">
                          {stat.value}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="p-4 sm:p-6 rounded-xl bg-primary-700/5 border border-primary-700/10">
                    <div className="flex items-center gap-3 mb-2">
                      <Award className="w-6 h-6 sm:w-7 sm:h-7 text-primary-700" />
                      <div className="font-black text-base sm:text-lg uppercase tracking-tight">
                        Global Accessibility
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Bank transfers, cards, mobile money, and cryptocurrency
                      accepted
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Admissions Process */}
      <section className="py-12 sm:py-16 md:py-24 bg-gradient-to-b from-background to-primary-50/5">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <Reveal>
              <div className="text-center mb-12 sm:mb-16 space-y-4">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter">
                  Four-Step{" "}
                  <span className="text-primary-700 italic">Admission</span>
                </h2>
                <p className="text-lg sm:text-xl text-muted-foreground font-light max-w-3xl mx-auto">
                  A streamlined process from application to first class
                </p>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {[
                {
                  step: "01",
                  icon: FileText,
                  title: "Application & Assessment",
                  description:
                    "Complete online form with educational background and goals",
                },
                {
                  step: "02",
                  icon: CreditCard,
                  title: "Tuition Settlement",
                  description:
                    "Choose payment method and complete financial registration",
                },
                {
                  step: "03",
                  icon: Users,
                  title: "Scholar Matching",
                  description:
                    "Our council assigns teacher based on your level and schedule",
                },
                {
                  step: "04",
                  icon: Calendar,
                  title: "Orientation & Start",
                  description:
                    "Portal access, materials, and first class scheduling",
                },
              ].map((step, index) => (
                <Reveal key={index} delay={index * 0.1}>
                  <div className="institutional-card p-6 sm:p-8 text-center hover:border-primary-700/30 transition-all duration-300">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 mx-auto mb-4 rounded-xl bg-primary-50 dark:bg-primary-950/40 flex items-center justify-center relative">
                      <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary-700 text-white text-xs font-black flex items-center justify-center">
                        {step.step}
                      </div>
                      <step.icon className="w-6 h-6 sm:w-7 sm:h-7 text-primary-700" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-black uppercase tracking-tight mb-2">
                      {step.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Financial Channels */}
      <section id="financial-channels" className="py-12 sm:py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <Reveal>
              <div className="text-center mb-12 sm:mb-16 space-y-4">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter">
                  Global{" "}
                  <span className="text-primary-700 italic">Payment</span>{" "}
                  Channels
                </h2>
                <p className="text-lg sm:text-xl text-muted-foreground font-light max-w-3xl mx-auto">
                  Designed for students from diverse financial ecosystems
                  worldwide
                </p>
              </div>
            </Reveal>

            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
              {/* Instant Digital */}
              <Reveal delay={0.1}>
                <div className="institutional-card p-6 sm:p-8 md:p-10 border-2 border-primary-700/20 hover:border-primary-700/40 transition-all duration-300">
                  <div className="flex items-start gap-4 sm:gap-6 mb-6">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-primary-700 flex items-center justify-center flex-shrink-0">
                      <CreditCard className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                    </div>
                    <div>
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-700/10 text-primary-700 text-xs font-black uppercase tracking-wider mb-3">
                        <Sparkles className="w-3 h-3" /> Instant Access
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight mb-2">
                        Digital Payment
                      </h3>
                      <p className="text-muted-foreground">
                        For students with international credit/debit cards
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary-700 flex-shrink-0" />
                      <span className="font-medium">
                        Immediate portal activation
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary-700 flex-shrink-0" />
                      <span className="font-medium">
                        Secure Stripe processing
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary-700 flex-shrink-0" />
                      <span className="font-medium">
                        Multi-currency support
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary-700 flex-shrink-0" />
                      <span className="font-medium">
                        Teacher assignment within 2 hours
                      </span>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-border/50">
                    <div className="text-sm text-muted-foreground mb-4">
                      <span className="font-black text-primary-700">
                        Supported:
                      </span>{" "}
                      Visa, Mastercard, American Express, Discover
                    </div>
                    <Link href="#apply-now">
                      <Button className="w-full rounded-full py-3 font-black bg-primary-700 hover:bg-primary-800">
                        PAY WITH CARD
                      </Button>
                    </Link>
                  </div>
                </div>
              </Reveal>

              {/* Manual Payment */}
              <Reveal delay={0.2}>
                <div className="institutional-card p-6 sm:p-8 md:p-10 border-2 border-accent/20 hover:border-accent/40 transition-all duration-300">
                  <div className="flex items-start gap-4 sm:gap-6 mb-6">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-accent flex items-center justify-center flex-shrink-0">
                      <Banknote className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                    </div>
                    <div>
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-black uppercase tracking-wider mb-3">
                        <Shield className="w-3 h-3" /> Manual Processing
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight mb-2">
                        Bank Transfer
                      </h3>
                      <p className="text-muted-foreground">
                        For regions without card access or preferring bank
                        transfers
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0" />
                      <span className="font-medium">
                        Bank details provided upon application
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0" />
                      <span className="font-medium">
                        Upload receipt for manual verification
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0" />
                      <span className="font-medium">
                        Portal activation within 12 hours
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0" />
                      <span className="font-medium">
                        Mobile money & Western Union accepted
                      </span>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-border/50">
                    <div className="text-sm text-muted-foreground mb-4">
                      <span className="font-black text-accent">
                        Processing Time:
                      </span>{" "}
                      12-24 hours after receipt submission
                    </div>
                    <Link href="#apply-now">
                      <Button className="w-full rounded-full py-3 font-black bg-accent hover:bg-accent/90">
                        CHOOSE BANK TRANSFER
                      </Button>
                    </Link>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Tuition & Financial Aid */}
      <section className="py-12 sm:py-16 md:py-24 bg-gradient-to-b from-background to-primary-50/5">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <Reveal>
              <div className="text-center mb-12 sm:mb-16 space-y-4">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter">
                  Tuition &{" "}
                  <span className="text-primary-700 italic">Financial Aid</span>
                </h2>
                <p className="text-lg sm:text-xl text-muted-foreground font-light max-w-3xl mx-auto">
                  Transparent pricing with support for dedicated students
                </p>
              </div>
            </Reveal>

            <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
              {/* Standard Tuition */}
              <Reveal delay={0.1}>
                <div className="institutional-card p-6 sm:p-8 h-full">
                  <div className="w-12 h-12 rounded-xl bg-primary-700/10 flex items-center justify-center mb-4">
                    <BookOpen className="w-6 h-6 text-primary-700" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight mb-3">
                    Standard Tuition
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Monthly tuition based on program selection. Includes all
                    digital materials, portal access, and scheduled sessions.
                  </p>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b border-border/50">
                      <span className="font-medium">Hifz Program</span>
                      <span className="font-black text-primary-700">
                        $200-300/mo
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-border/50">
                      <span className="font-medium">Tajweed Mastery</span>
                      <span className="font-black text-primary-700">
                        $150-200/mo
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-border/50">
                      <span className="font-medium">Arabic Fluency</span>
                      <span className="font-black text-primary-700">
                        $100-150/mo
                      </span>
                    </div>
                  </div>
                </div>
              </Reveal>

              {/* Financial Aid */}
              <Reveal delay={0.2}>
                <div className="institutional-card p-6 sm:p-8 h-full border-2 border-accent/20">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                    <Shield className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight mb-3">
                    Zakat-Funded Grants
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    For dedicated students facing financial hardship. Partial
                    and full scholarships available based on need and
                    commitment.
                  </p>
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-4 h-4 text-accent" />
                      <span className="text-sm">
                        Application review by scholarship committee
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-4 h-4 text-accent" />
                      <span className="text-sm">
                        Requires proof of need and academic dedication
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-4 h-4 text-accent" />
                      <span className="text-sm">
                        Limited spots available each term
                      </span>
                    </div>
                  </div>
                  <Link href="/financial-aid">
                    <Button className="w-full rounded-full py-3 font-black bg-accent hover:bg-accent/90">
                      APPLY FOR AID
                    </Button>
                  </Link>
                </div>
              </Reveal>

              {/* Family Discount */}
              <Reveal delay={0.3}>
                <div className="institutional-card p-6 sm:p-8 h-full border-2 border-gold/20">
                  <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center mb-4">
                    <Users className="w-6 h-6 text-gold" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight mb-3">
                    Family Benefits
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Making sacred knowledge accessible for entire households.
                    Special rates for families learning together.
                  </p>
                  <div className="space-y-3 mb-6">
                    <div className="bg-gold/5 p-4 rounded-lg">
                      <div className="font-black text-gold text-lg mb-1">
                        15% Discount
                      </div>
                      <div className="text-sm text-muted-foreground">
                        For 3+ family members
                      </div>
                    </div>
                    <div className="bg-gold/5 p-4 rounded-lg">
                      <div className="font-black text-gold text-lg mb-1">
                        Shared Portal
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Family dashboard access
                      </div>
                    </div>
                  </div>
                  <Link href="/contact">
                    <Button className="w-full rounded-full py-3 font-black border-2 border-gold text-gold hover:bg-gold/10">
                      INQUIRE FAMILY RATES
                    </Button>
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Application Form Preview */}
      <section id="apply-now" className="py-12 sm:py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <Reveal>
              <div className="institutional-card p-6 sm:p-8 md:p-10 border-2 border-primary-700/20">
                <div className="text-center mb-8 sm:mb-12">
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter mb-4">
                    Begin Your{" "}
                    <span className="text-primary-700 italic">Application</span>
                  </h2>
                  <p className="text-lg text-muted-foreground">
                    Complete the form below to start your admission process
                  </p>
                </div>

                <div className="space-y-6">
                  {/* Personal Information */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-black uppercase tracking-tight border-b border-border/50 pb-2">
                      Personal Information
                    </h3>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          Full Name *
                        </label>
                        <div className="h-12 rounded-lg bg-muted/50 border border-border animate-pulse" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          Email Address *
                        </label>
                        <div className="h-12 rounded-lg bg-muted/50 border border-border animate-pulse" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          Phone Number
                        </label>
                        <div className="h-12 rounded-lg bg-muted/50 border border-border animate-pulse" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Country *</label>
                        <div className="h-12 rounded-lg bg-muted/50 border border-border animate-pulse" />
                      </div>
                    </div>
                  </div>

                  {/* Program Selection */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-black uppercase tracking-tight border-b border-border/50 pb-2">
                      Program Selection
                    </h3>
                    <div className="space-y-3">
                      {[
                        "Hifz Al-Quran Program (Memorization)",
                        "Tajweed Al-Itqan (Recitation Mastery)",
                        "Al-Lughah Al-Arabiyyah (Arabic Fluency)",
                        "Tafsir Al-Mubin (Quranic Exegesis)",
                      ].map((program, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-3 p-3 rounded-lg bg-muted/30"
                        >
                          <div className="w-5 h-5 rounded border border-primary-700" />
                          <span className="font-medium">{program}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Schedule Preference */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-black uppercase tracking-tight border-b border-border/50 pb-2">
                      Schedule & Availability
                    </h3>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          Preferred Days *
                        </label>
                        <div className="h-12 rounded-lg bg-muted/50 border border-border animate-pulse" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          Time Zone *
                        </label>
                        <div className="h-12 rounded-lg bg-muted/50 border border-border animate-pulse" />
                      </div>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <div className="pt-6">
                    <Link href="/apply">
                      <Button className="w-full rounded-full py-4 font-black bg-primary-700 hover:bg-primary-800 text-lg">
                        <span className="flex items-center justify-center gap-3">
                          COMPLETE APPLICATION
                          <ArrowRight className="w-5 h-5" />
                        </span>
                      </Button>
                    </Link>
                    <p className="text-center text-sm text-muted-foreground mt-4">
                      Application review within 24 hours • No commitment until
                      payment
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Guarantee & Support */}
      <section className="py-12 sm:py-16 md:py-24 bg-gradient-to-b from-background to-primary-50/5">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <Reveal>
              <div className="text-center mb-12 sm:mb-16 space-y-4">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter">
                  Our{" "}
                  <span className="text-primary-700 italic">Commitment</span> to
                  You
                </h2>
                <p className="text-lg sm:text-xl text-muted-foreground font-light max-w-3xl mx-auto">
                  We ensure your educational journey begins with confidence and
                  clarity
                </p>
              </div>
            </Reveal>

            <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
              {[
                {
                  icon: Shield,
                  title: "14-Day Satisfaction Guarantee",
                  description:
                    "Full refund if unsatisfied with your teacher match or learning experience within first two weeks.",
                },
                {
                  icon: Clock,
                  title: "24-Hour Response Time",
                  description:
                    "Our admissions team responds to all inquiries within one business day, seven days a week.",
                },
                {
                  icon: HelpCircle,
                  title: "Dedicated Support",
                  description:
                    "Personal admissions advisor assigned to guide you through the entire enrollment process.",
                },
              ].map((item, index) => (
                <Reveal key={index} delay={index * 0.1}>
                  <div className="institutional-card p-6 sm:p-8 text-center hover:border-primary-700/30 transition-all duration-300">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 mx-auto mb-4 rounded-xl bg-primary-50 dark:bg-primary-950/40 flex items-center justify-center">
                      <item.icon className="w-6 h-6 sm:w-7 sm:h-7 text-primary-700" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-black uppercase tracking-tight mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 sm:py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <Reveal>
              <div className="text-center mb-12 sm:mb-16 space-y-4">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter">
                  Admissions{" "}
                  <span className="text-primary-700 italic">FAQ</span>
                </h2>
                <p className="text-lg sm:text-xl text-muted-foreground font-light">
                  Common questions about the admission process
                </p>
              </div>
            </Reveal>

            <div className="space-y-4">
              {[
                {
                  q: "How long does the admission process take?",
                  a: "Complete applications are reviewed within 24 hours. Once approved and payment is processed, teacher matching and portal access typically occur within 48 hours for digital payments, or 12-24 hours after bank transfer receipt submission.",
                },
                {
                  q: "Can I change programs after starting?",
                  a: "Yes, you can switch programs within the first month without additional fees. After the first month, program changes may involve adjustment fees and require reassessment.",
                },
                {
                  q: "What documents are required for admission?",
                  a: "For most programs, only the application form is required. For financial aid applications, we may request proof of income or financial hardship documentation.",
                },
                {
                  q: "Is there an application fee?",
                  a: "No, there is no application fee. You only pay tuition after your application is approved and you've been matched with a teacher.",
                },
                {
                  q: "What if I need to pause my studies?",
                  a: "You can pause your studies for up to 3 months with proper notice. Your progress and teacher assignment will be preserved for your return.",
                },
                {
                  q: "Are there age restrictions?",
                  a: "We accept students from age 7 through adulthood. Children under 13 require parental supervision during sessions and portal access.",
                },
              ].map((faq, index) => (
                <Reveal key={index} delay={index * 0.05}>
                  <div className="institutional-card p-6 sm:p-8 hover:border-primary-700/30 transition-all duration-300">
                    <h3 className="font-black text-lg sm:text-xl uppercase tracking-tight mb-3">
                      {faq.q}
                    </h3>
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.3}>
              <div className="mt-12 text-center">
                <div className="institutional-card p-6 sm:p-8 border-2 border-primary-700/20">
                  <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight mb-4">
                    Ready to Begin Your Journey?
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Our admissions team is available 7 days a week to assist you
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="/apply">
                      <Button className="rounded-full px-8 py-4 font-black bg-primary-700 hover:bg-primary-800 min-h-[44px]">
                        START APPLICATION NOW
                      </Button>
                    </Link>
                    <Link href="/contact">
                      <Button
                        variant="outline"
                        className="rounded-full px-8 py-4 font-black min-h-[44px]"
                      >
                        SPEAK TO ADVISOR
                      </Button>
                    </Link>
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
