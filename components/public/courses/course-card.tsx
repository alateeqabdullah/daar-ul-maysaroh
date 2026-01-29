"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Award,
  Sparkles,
  Zap,
  CheckCircle2,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useRouter } from "next/navigation"; // FIXED: Missing import

export function CourseCard({
  program,
  viewType,
}: {
  program: any;
  viewType: "grid" | "list";
}) {
  const router = useRouter(); // FIXED: Initialize router

  if (!program) return null;

  const handleEnroll = (e: React.MouseEvent) => {
    e.preventDefault();
    if (program.isMock) {
      toast.info("Admission for this scholarly track opens soon.", {
        description:
          "We are currently finalizing the scholarly council for this program.",
        className: "glass-surface border-gold/50",
      });
    } else {
      // Lead to the dynamic Application Office
      router.push(`/admissions/apply?courseId=${program.id}`);
    }
  };

  return (
    <motion.div
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className={cn(
        "institutional-card relative overflow-hidden group bg-card transition-all duration-500",
        viewType === "list"
          ? "flex flex-col md:flex-row items-center gap-10 p-12"
          : "flex flex-col p-10 h-full",
      )}
    >
      {/* 1. TOP BAR: STATUS & BADGE */}
      <div
        className={cn(
          "flex justify-between items-center mb-8",
          viewType === "list" && "mb-0 md:w-64 w-full",
        )}
      >
        <div className="relative">
          <div className="absolute inset-0 bg-primary-700/20 blur-lg rounded-full" />
          <div className="relative px-4 py-1.5 bg-primary-700 text-white rounded-full text-[9px] font-black uppercase tracking-[0.2em] shadow-xl">
            {program.category}
          </div>
        </div>
        {program.isMock && (
          <div className="flex items-center gap-1.5 text-[9px] font-black text-gold uppercase tracking-widest bg-gold/5 px-3 py-1.5 rounded-lg border border-gold/20">
            <Sparkles className="w-3 h-3 fill-current" /> Scholar Sanad
          </div>
        )}
      </div>

      {/* 2. CONTENT AREA */}
      <div className="flex-grow space-y-6 w-full">
        <div>
          <h3 className="text-3xl font-black uppercase tracking-tighter leading-none group-hover:text-primary-700 transition-colors mb-2">
            {program.name}
          </h3>
          <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] opacity-60">
            Level: {program.isMock ? "Elite Traditional" : "Academic Standard"}
          </p>
        </div>

        <p className="text-muted-foreground font-medium leading-relaxed line-clamp-3 text-sm italic">
          {`"{program.description}"`}
        </p>

        {/* Technical Specs Grid */}
        <div className="grid grid-cols-2 gap-4 py-6 border-y border-border/50">
          <div className="space-y-1">
            <p className="text-[8px] font-black uppercase opacity-40 tracking-widest">
              Intensity
            </p>
            <div className="flex items-center gap-2 text-xs font-bold uppercase">
              <Zap className="w-3.5 h-3.5 text-primary-700" /> Personalized
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-[8px] font-black uppercase opacity-40 tracking-widest">
              Sanad Track
            </p>
            <div className="flex items-center gap-2 text-xs font-bold uppercase">
              <Award className="w-3.5 h-3.5 text-accent" /> Ijazah Eligible
            </div>
          </div>
        </div>

        {/* Features as Tags */}
        <div className="flex flex-wrap gap-2 pt-2">
          {program.features?.map((f: string, i: number) => (
            <span
              key={i}
              className="px-3 py-1 bg-muted/50 rounded-md text-[10px] font-bold text-muted-foreground uppercase border border-border/50 transition-colors hover:bg-primary-50 hover:text-primary-700"
            >
              {f}
            </span>
          ))}
        </div>
      </div>

      {/* 3. COMMAND FOOTER */}
      <div
        className={cn(
          "mt-10 space-y-6 w-full",
          viewType === "list" &&
            "mt-0 md:w-80 md:border-l md:pl-10 border-border/50",
        )}
      >
        <div className="flex flex-col items-center justify-center text-center">
          <div className="flex items-baseline gap-1">
            <span className="text-5xl font-black tracking-tighter">
              ${Number(program.basePrice)}
            </span>
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
              /mo
            </span>
          </div>
          <p className="text-[9px] font-black text-accent uppercase tracking-widest mt-1">
            Institutional Rate
          </p>
        </div>

        <Button
          onClick={handleEnroll} // FIXED: Attached handleEnroll
          className="w-full h-16 rounded-2xl bg-primary-700 text-white font-black text-[11px] tracking-[0.2em] uppercase shadow-2xl relative overflow-hidden group/btn transition-all active:scale-95"
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            ADMISSION OFFICE{" "}
            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
          </span>
          {/* Institutional Shimmer Animation */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover/btn:animate-shimmer" />
        </Button>
      </div>

      {/* Decoration: Subtle Background Calligraphy */}
      <div className="absolute -bottom-10 -right-10 opacity-[0.03] scale-150 pointer-events-none font-quran text-9xl group-hover:opacity-[0.06] group-hover:scale-[1.6] transition-all duration-700">
        قرآن
      </div>
    </motion.div>
  );
}
