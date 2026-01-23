"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Loader2,
  Banknote,
  CreditCard,
  ShieldCheck,
  ArrowRight,
  Star,
} from "lucide-react";
import { cn } from "@/lib/utils";

export function CourseCard({ program }: { program: any }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // CRITICAL: Prevent the 'undefined' error
  if (!program || !program.name) return null;

  const onEnroll = async (method: string) => {
    // Prevent enrollment on mock items
    if (program.isMock) {
      toast.info("This program will be available for enrollment shortly.");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch("/api/admissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          planId: program.id,
          paymentMethod: method,
        }),
      });

      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || "Failed to start admission");

      toast.success("Enrollment path initialized!");
      router.push(data.redirectUrl || data.url);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="institutional-card p-10 flex flex-col h-full group">
      {/* Category & Badge */}
      <div className="flex justify-between items-start mb-8">
        <div className="px-3 py-1 bg-muted rounded-lg text-[10px] font-black uppercase tracking-widest opacity-60">
          {program.category}
        </div>
        {program.isMock && (
          <div className="flex items-center gap-1 text-[10px] font-black text-gold uppercase tracking-widest">
            <Star className="w-3 h-3 fill-current" /> Scholar Recommended
          </div>
        )}
      </div>

      {/* Pricing Header */}
      <div className="mb-6 flex items-baseline gap-1">
        <span className="text-4xl font-black tracking-tighter">
          ${Number(program.basePrice)}
        </span>
        <span className="text-sm font-bold text-muted-foreground uppercase">
          /mo
        </span>
      </div>

      <h3 className="text-2xl font-black mb-4 uppercase tracking-tighter group-hover:text-primary-700 transition-colors">
        {program.name}
      </h3>

      <p className="text-muted-foreground font-medium leading-relaxed mb-10 flex-grow">
        {program.description}
      </p>

      {/* Features List */}
      <div className="space-y-4 mb-12 pt-8 border-t border-border/50">
        {program.features?.map((feature: string, i: number) => (
          <div key={i} className="flex items-center gap-3 text-sm font-bold">
            <ShieldCheck className="w-5 h-5 text-accent shrink-0" />
            <span className="opacity-80">{feature}</span>
          </div>
        ))}
      </div>

      {/* ACTION COMMAND CENTER */}
      <div className="space-y-3">
        <Button
          disabled={loading}
          onClick={() => onEnroll("CREDIT_CARD")}
          className="w-full h-16 rounded-2xl bg-primary-700 text-white font-black text-xs tracking-[0.2em] relative overflow-hidden group/btn shadow-xl shadow-primary-700/20"
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            {loading ? (
              <Loader2 className="animate-spin w-4 h-4" />
            ) : (
              <CreditCard className="w-4 h-4" />
            )}
            ADMISSION: CARD
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/btn:animate-shimmer" />
        </Button>

        <Button
          disabled={loading}
          variant="outline"
          onClick={() => onEnroll("BANK_TRANSFER")}
          className="w-full h-16 rounded-2xl border-2 font-black text-xs tracking-[0.2em] hover:bg-muted"
        >
          <Banknote className="w-4 h-4 mr-2" />
          BANK TRANSFER
        </Button>
      </div>
    </div>
  );
}
