

import { prisma } from "@/lib/prisma";
import { ShieldCheck, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PricingCalculator } from "./pricing-calculator";

export default async function AdmissionsPricingPage() {
  // Fetch from Prisma
  const dbPlans = await prisma.pricingPlan.findMany({
    where: { isActive: true },
    include: { pricingTiers: true },
  });

  return (
    <main className="pt-40 pb-20">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mb-20 space-y-8">
          <h1 className="text-7xl lg:text-9xl font-black tracking-tighter font-heading leading-tight">
            Custom <br />
            <span className="text-primary-700 italic">Enrollment.</span>
          </h1>
          <p className="text-2xl text-muted-foreground font-medium leading-relaxed">
            Tuition at Al-Maysaroh is calculated based on your personal academic
            intensity. Use our calculator to structure your scholarly path.
          </p>
        </div>

        {/* THE DYNAMIC CALCULATOR */}
        <PricingCalculator dbPlans={dbPlans} />

        {/* Manual Payment Support - CRITICAL REAL WORLD FEATURE */}
        <section className="mt-32 grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl font-black uppercase tracking-tighter">
              Global Payment Support
            </h2>
            <p className="text-muted-foreground font-medium leading-relaxed">
              We accommodate students from over 50 countries. If your local
              banking system does not support automated billing, we accept
              manual transfers and mobile money.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 rounded-2xl bg-muted/50 border flex flex-col gap-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-primary-700">
                  Method A
                </span>
                <span className="font-bold">Automated Card Payments</span>
              </div>
              <div className="p-6 rounded-2xl bg-muted/50 border flex flex-col gap-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-accent">
                  Method B
                </span>
                <span className="font-bold">Bank / Manual Transfer</span>
              </div>
            </div>
          </div>

          <div className="glass-surface p-12 rounded-[3rem] border shadow-2xl space-y-6">
            <h4 className="font-black uppercase tracking-widest text-sm">
              Need a Custom Grant?
            </h4>
            <p className="text-sm text-muted-foreground font-medium">
              Al-Maysaroh offers limited scholarships for dedicated students in
              need. Contact our financial council.
            </p>
            <Button
              variant="outline"
              className="w-full h-14 rounded-xl border-2 font-black text-xs"
            >
              CONTACT FINANCIAL COUNCIL
            </Button>
          </div>
        </section>
      </div>
    </main>
  );
}