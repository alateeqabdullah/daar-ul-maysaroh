import { prisma } from "@/lib/prisma";
import { PricingCalculator } from "@/components/public/pricing/pricing-calculator";
import {
  ShieldCheck,
  Banknote,
  CreditCard,
  ArrowRight,
  HelpCircle,
  Info,
  GraduationCap,
  CheckCircle2,
  Landmark,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionAnimation } from "@/components/shared/section-animation"; // We'll create this

export default async function AdmissionsPricingPage() {
  const dbPlans = await prisma.pricingPlan.findMany({
    where: { isActive: true },
    include: { pricingTiers: true },
    orderBy: { orderIndex: "asc" },
  });

  return (
    <main className="pt-32 pb-20 bg-background overflow-x-hidden">
      <div className="container mx-auto px-6">
        {/* SECTION 1: MONUMENTAL HEADER */}
        <div className="text-left max-w-5xl mb-32 space-y-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 text-[10px] font-black uppercase tracking-[0.2em]">
            <Landmark className="w-4 h-4" /> Admissions 2026 Now Open
          </div>
          <h1 className="text-7xl lg:text-9xl font-black tracking-tighter font-heading leading-[0.85] text-balance">
            Admission <br />
            <span className="text-primary-700 italic">Framework.</span>
          </h1>
          <p className="text-2xl text-muted-foreground font-medium max-w-2xl leading-relaxed">
            Al-Maysaroh provides a globally accessible enrollment system,
            accommodating diverse banking infrastructures from over 50 nations.
          </p>
        </div>

        {/* SECTION 2: FINANCIAL CHANNELS & STEPS */}
        <section className="grid lg:grid-cols-12 gap-16 mb-40">
          <div className="lg:col-span-7 space-y-10">
            <div className="space-y-4">
              <h2 className="text-4xl font-black uppercase tracking-tighter">
                Financial Channels
              </h2>
              <p className="text-muted-foreground font-medium leading-relaxed max-w-xl">
                To ensure sacred knowledge is never barred by technical hurdles,
                we offer both automated and manual tuition settlement.
              </p>
            </div>

            <div className="grid gap-6">
              <div className="p-8 rounded-[2.5rem] bg-card border-2 border-primary-100 dark:border-primary-950 flex flex-col md:flex-row gap-6 hover:shadow-xl transition-all duration-500">
                <div className="w-16 h-16 bg-primary-700 rounded-2xl flex items-center justify-center shrink-0 shadow-lg">
                  <CreditCard className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h4 className="font-black text-lg uppercase tracking-tight mb-2">
                    Instant Digital Activation
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed font-medium">
                    Secure card processing via Stripe. Use any international
                    Credit/Debit card for immediate portal access and teacher
                    assignment.
                  </p>
                </div>
              </div>

              <div className="p-8 rounded-[2.5rem] bg-card border-2 border-accent/10 flex flex-col md:flex-row gap-6 hover:shadow-xl transition-all duration-500">
                <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center shrink-0 shadow-lg">
                  <Banknote className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h4 className="font-black text-lg uppercase tracking-tight mb-2">
                    Manual Scholarly Approval
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed font-medium">
                    Designed for students using Bank Transfer, Mobile Money, or
                    Western Union. Submit your receipt to our bursar for manual
                    portal activation within 12 hours.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: THE ENROLLMENT ROADMAP */}
          <div className="lg:col-span-5">
            <div className="glass-surface p-12 rounded-[3.5rem] border shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <GraduationCap className="w-32 h-32 text-primary-700" />
              </div>

              <h3 className="text-xl font-black uppercase tracking-[0.2em] mb-12">
                Admissions Process
              </h3>

              <div className="space-y-10 relative">
                <div className="absolute left-[1.2rem] top-2 h-full w-px bg-primary-200 dark:bg-primary-800 -z-10" />
                {[
                  {
                    n: "01",
                    t: "Structure Your Plan",
                    d: "Use the calculator below to define your frequency.",
                  },
                  {
                    n: "02",
                    t: "Academic Registry",
                    d: "Complete the admission form with your educational history.",
                  },
                  {
                    n: "03",
                    t: "Settle Tuition",
                    d: "Select your preferred channel (Instant vs Manual).",
                  },
                  {
                    n: "04",
                    t: "Scholar Match",
                    d: "Our Council assigns a teacher matching your makharij level.",
                  },
                ].map((step) => (
                  <div key={step.n} className="flex gap-6 group">
                    <div className="w-10 h-10 rounded-xl bg-primary-700 text-white flex items-center justify-center text-xs font-black shadow-lg group-hover:scale-110 transition-transform">
                      {step.n}
                    </div>
                    <div>
                      <p className="font-black text-sm uppercase tracking-wider">
                        {step.t}
                      </p>
                      <p className="text-xs text-muted-foreground font-medium leading-relaxed mt-1">
                        {step.d}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: THE DYNAMIC CALCULATOR */}
        <section className="mb-40 pt-20 border-t border-border/50">
          <div className="max-w-4xl mb-16 space-y-6">
            <h2 className="text-5xl lg:text-7xl font-black tracking-tighter font-heading leading-tight">
              Calculated <br />
              <span className="text-primary-700 italic">Tuition.</span>
            </h2>
            <p className="text-xl text-muted-foreground font-medium max-w-2xl leading-relaxed">
              Every soul is unique. Our tuition adjusts based on your intensity,
              duration, and chosen discipline.
            </p>
          </div>

          <PricingCalculator dbPlans={dbPlans} />
        </section>

        {/* SECTION 4: FINANCIAL AID & GRANTS */}
        <section className="grid lg:grid-cols-2 gap-10 mb-40">
          <div className="p-12 institutional-card space-y-6">
            <h3 className="text-3xl font-black tracking-tighter uppercase">
              Scholarly Grants
            </h3>
            <p className="text-muted-foreground font-medium leading-relaxed">
              Are you a dedicated student of knowledge facing extreme financial
              hardship? Al-Maysaroh offers Zakat-funded grants for eligible
              students.
            </p>
            <Button
              variant="outline"
              className="h-14 rounded-xl border-2 font-black px-8"
            >
              APPLY FOR FINANCIAL AID
            </Button>
          </div>

          <div className="p-12 glass-surface rounded-[3rem] border-2 border-dashed border-primary-200 dark:border-primary-800 flex flex-col justify-center">
            <div className="flex items-center gap-4 mb-4">
              <CheckCircle2 className="w-6 h-6 text-accent" />
              <p className="font-black text-sm uppercase tracking-widest">
                14-Day Refund Guarantee
              </p>
            </div>
            <p className="text-sm text-muted-foreground font-medium">
              Not satisfied with your assigned scholar? We offer a full refund
              or a teacher change within the first 14 days of your journey.
            </p>
          </div>
        </section>

        {/* SECTION 5: FAQ */}
        <section className="space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-5xl font-black tracking-tighter uppercase">
              Admissions FAQ
            </h2>
            <p className="text-muted-foreground font-medium">
              Frequently asked questions about the Al-Maysaroh admission
              process.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {FAQS.map((faq) => (
              <div
                key={faq.q}
                className="p-8 rounded-[2rem] bg-card border hover:border-primary-700 transition-all group"
              >
                <div className="flex gap-4">
                  <HelpCircle className="w-6 h-6 text-primary-700 shrink-0" />
                  <div className="space-y-2">
                    <p className="font-black text-sm uppercase tracking-tight">
                      {faq.q}
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed font-medium">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

const FAQS = [
  {
    q: "How do I submit a Bank Transfer receipt?",
    a: "Once you register, your dashboard will have a 'Submit Receipt' portal where you can upload a photo of your transfer confirmation.",
  },
  {
    q: "Is the pricing inclusive of learning materials?",
    a: "Yes. All digital Mushafs, Tajweed PDFs, and tracking software are included in your monthly tuition.",
  },
  {
    q: "Can family members share a plan?",
    a: "Plans are 1-on-1 for quality assurance. However, we offer a 15% 'Family Discount' for 3 or more enrollments from the same household.",
  },
  {
    q: "Do I get a certificate upon completion?",
    a: "Upon completing any major level or the full Hifz, students undergo a final exam to receive their Ijazah or Certificate of Excellence.",
  },
];
