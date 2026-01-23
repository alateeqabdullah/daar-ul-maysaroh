"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Info,
  Calculator,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

// ELITE MOCK DATA (Used if Database is empty)
const MOCK_PRICING_CONFIG = {
  subjects: [
    { id: "quran", name: "Quran Recitation", baseFactor: 1.0 },
    { id: "hifz", name: "Hifz (Memorization)", baseFactor: 1.3 },
    { id: "arabic", name: "Classical Arabic", baseFactor: 1.1 },
  ],
  durations: [30, 45, 60],
  frequencies: [1, 2, 3, 5],
  basePricePerMinute: 0.5, // $0.50 per minute
};

export function PricingCalculator({ dbPlans }: { dbPlans?: any[] }) {
  const [selection, setSelection] = useState({
    subject: "quran",
    duration: 30,
    frequency: 2,
  });

  const [totalPrice, setTotalPrice] = useState(0);

  // LOGIC: Price = (Base Minute Rate * Duration * Frequency * 4 Weeks) * Subject Factor
  useEffect(() => {
    const subject = MOCK_PRICING_CONFIG.subjects.find(
      (s) => s.id === selection.subject,
    );
    const monthlySessions = selection.frequency * 4;
    const pricePerSession =
      selection.duration * MOCK_PRICING_CONFIG.basePricePerMinute;
    const rawPrice =
      pricePerSession * monthlySessions * (subject?.baseFactor || 1);

    setTotalPrice(Math.round(rawPrice));
  }, [selection]);

  return (
    <div className="institutional-card p-1 shadow-2xl overflow-hidden bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl">
      <div className="grid lg:grid-cols-2">
        {/* SETTINGS PANEL */}
        <div className="p-10 lg:p-16 space-y-10 border-r border-border/50">
          <div className="flex items-center gap-3">
            <Calculator className="w-6 h-6 text-primary-700" />
            <h3 className="text-xl font-black uppercase tracking-tighter">
              Tuition Calculator
            </h3>
          </div>

          {/* Subject Selection */}
          <div className="space-y-4">
            <label className="text-[10px] font-black uppercase tracking-widest opacity-50">
              Select Discipline
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {MOCK_PRICING_CONFIG.subjects.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSelection({ ...selection, subject: s.id })}
                  className={cn(
                    "p-4 rounded-xl border-2 text-xs font-bold transition-all",
                    selection.subject === s.id
                      ? "border-primary-700 bg-primary-700/5 text-primary-700"
                      : "hover:border-primary-700/30",
                  )}
                >
                  {s.name}
                </button>
              ))}
            </div>
          </div>

          {/* Duration Selection */}
          <div className="space-y-4">
            <label className="text-[10px] font-black uppercase tracking-widest opacity-50">
              Session Duration
            </label>
            <div className="flex gap-4">
              {MOCK_PRICING_CONFIG.durations.map((d) => (
                <button
                  key={d}
                  onClick={() => setSelection({ ...selection, duration: d })}
                  className={cn(
                    "flex-1 p-4 rounded-xl border-2 text-sm font-black transition-all",
                    selection.duration === d
                      ? "border-primary-700 bg-primary-700 text-white"
                      : "hover:border-primary-700/30",
                  )}
                >
                  {d}m
                </button>
              ))}
            </div>
          </div>

          {/* Frequency Selection */}
          <div className="space-y-4">
            <label className="text-[10px] font-black uppercase tracking-widest opacity-50">
              Sessions per Week
            </label>
            <div className="flex gap-4">
              {MOCK_PRICING_CONFIG.frequencies.map((f) => (
                <button
                  key={f}
                  onClick={() => setSelection({ ...selection, frequency: f })}
                  className={cn(
                    "flex-1 p-4 rounded-xl border-2 text-sm font-black transition-all",
                    selection.frequency === f
                      ? "border-primary-700 bg-primary-700 text-white"
                      : "hover:border-primary-700/30",
                  )}
                >
                  {f}x
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* SUMMARY PANEL */}
        <div className="p-10 lg:p-16 bg-primary-700/5 flex flex-col justify-center items-center text-center space-y-8">
          <div className="space-y-2">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-700">
              Estimated Monthly Tuition
            </p>
            <motion.div
              key={totalPrice}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-8xl font-black tracking-tighter"
            >
              ${totalPrice}
            </motion.div>
          </div>

          <div className="w-full space-y-4 bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-xl border">
            <div className="flex justify-between text-xs font-bold uppercase">
              <span className="opacity-50">Monthly Sessions</span>
              <span>{selection.frequency * 4} Lessons</span>
            </div>
            <div className="flex justify-between text-xs font-bold uppercase">
              <span className="opacity-50">Rate</span>
              <span>${totalPrice / (selection.frequency * 4)} / lesson</span>
            </div>
          </div>

          <Link href="/register" className="w-full">
            <Button className="w-full h-16 rounded-2xl bg-primary-700 text-white font-black text-xs tracking-widest uppercase shadow-2xl">
              Proceed to Admission
            </Button>
          </Link>

          <p className="text-[10px] font-medium text-muted-foreground flex items-center gap-2">
            <Info className="w-3 h-3" /> Final price may vary based on scholar
            assignment.
          </p>
        </div>
      </div>
    </div>
  );
}










// "use client";

// import { useState, useMemo } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Check, ArrowRight, Star } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Slider } from "@/components/ui/slider";
// import { Badge } from "@/components/ui/badge";
// import { cn } from "@/lib/utils";
// import Link from "next/link";

// interface PricingPlan {
//   id: string;
//   name: string;
//   type: string;
//   pricingTiers: any[];
// }

// interface Props {
//   dbPlans: PricingPlan[];
// }

// export default function PricingCalculator({ dbPlans }: Props) {
//   // Default State
//   const [duration, setDuration] = useState([30]); // 30, 45, 60 mins
//   const [days, setDays] = useState(3); // 2, 3, 4, 5 days
//   const [billingCycle, setBillingCycle] = useState<"MONTHLY" | "QUARTERLY">(
//     "MONTHLY",
//   );

//   // Get the main One-on-One plan (assuming first one is primary)
//   const mainPlan = dbPlans.find((p) => p.type === "ONE_ON_ONE") || dbPlans[0];

//   // Calculate Price Logic
//   const priceData = useMemo(() => {
//     if (!mainPlan) return { price: 0, perClass: 0 };

//     // Find the tier that matches Days & Duration
//     // Note: In a real app, you'd match exact tier logic from DB.
//     // Here is a robust fallback calculation if exact tier isn't found.
//     const tier = mainPlan.pricingTiers.find(
//       (t) => t.minDuration === duration[0] && t.daysPerWeek === days,
//     );

//     let monthlyPrice = 0;

//     if (tier) {
//       monthlyPrice = tier.pricePerMonth;
//     } else {
//       // Fallback calculation if specific tier missing
//       // Base rate approx $8/hr
//       const hoursPerMonth = (duration[0] / 60) * days * 4;
//       monthlyPrice = hoursPerMonth * 9;
//     }

//     // Apply Discount
//     if (billingCycle === "QUARTERLY") {
//       monthlyPrice = monthlyPrice * 0.9; // 10% discount
//     }

//     return {
//       price: Math.round(monthlyPrice),
//       perClass: (monthlyPrice / (days * 4)).toFixed(2),
//     };
//   }, [mainPlan, duration, days, billingCycle]);

//   return (
//     <div className="w-full max-w-5xl mx-auto">
//       <div className="grid lg:grid-cols-12 gap-8 bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800">
//         {/* LEFT: CONTROLS */}
//         <div className="lg:col-span-7 p-8 md:p-12 space-y-10">
//           <div>
//             <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
//               Configure Your Plan
//             </h3>
//             <p className="text-slate-500">
//               Customize the intensity of your hifz or tajweed program.
//             </p>
//           </div>

//           {/* Duration Slider */}
//           <div className="space-y-6">
//             <div className="flex justify-between items-center">
//               <label className="text-sm font-bold uppercase tracking-wider text-slate-500">
//                 Session Duration
//               </label>
//               <span className="text-xl font-bold text-slate-900 dark:text-white">
//                 {duration[0]} Minutes
//               </span>
//             </div>
//             <Slider
//               defaultValue={[30]}
//               max={60}
//               min={30}
//               step={15}
//               value={duration}
//               onValueChange={setDuration}
//               className="py-4"
//             />
//             <div className="flex justify-between text-xs text-slate-400 font-medium">
//               <span>30 Min (Standard)</span>
//               <span>45 Min (Intensive)</span>
//               <span>60 Min (Advanced)</span>
//             </div>
//           </div>

//           {/* Days Selector */}
//           <div className="space-y-4">
//             <label className="text-sm font-bold uppercase tracking-wider text-slate-500">
//               Frequency (Days / Week)
//             </label>
//             <div className="grid grid-cols-4 gap-3">
//               {[2, 3, 4, 5].map((d) => (
//                 <button
//                   key={d}
//                   onClick={() => setDays(d)}
//                   className={cn(
//                     "h-14 rounded-xl border-2 font-bold text-lg transition-all duration-200",
//                     days === d
//                       ? "border-emerald-600 bg-emerald-600 text-white shadow-lg shadow-emerald-200 dark:shadow-none"
//                       : "border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-600 hover:border-emerald-200",
//                   )}
//                 >
//                   {d}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Billing Toggle */}
//           <div className="bg-slate-50 dark:bg-slate-950 p-1.5 rounded-xl inline-flex relative w-full sm:w-auto">
//             <button
//               onClick={() => setBillingCycle("MONTHLY")}
//               className={cn(
//                 "flex-1 sm:w-40 py-2.5 text-sm font-bold rounded-lg transition-all z-10",
//                 billingCycle === "MONTHLY"
//                   ? "bg-white dark:bg-slate-800 shadow text-slate-900 dark:text-white"
//                   : "text-slate-500",
//               )}
//             >
//               Monthly
//             </button>
//             <button
//               onClick={() => setBillingCycle("QUARTERLY")}
//               className={cn(
//                 "flex-1 sm:w-40 py-2.5 text-sm font-bold rounded-lg transition-all z-10",
//                 billingCycle === "QUARTERLY"
//                   ? "bg-white dark:bg-slate-800 shadow text-slate-900 dark:text-white"
//                   : "text-slate-500",
//               )}
//             >
//               Quarterly{" "}
//               <span className="text-[10px] text-emerald-600 ml-1">-10%</span>
//             </button>
//           </div>
//         </div>

//         {/* RIGHT: SUMMARY CARD */}
//         <div className="lg:col-span-5 bg-slate-900 p-8 md:p-12 text-white flex flex-col relative overflow-hidden">
//           {/* Decor */}
//           <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/20 rounded-full blur-[80px] -mr-16 -mt-16 pointer-events-none" />

//           <div className="relative z-10">
//             <div className="flex items-start justify-between mb-8">
//               <div>
//                 <p className="text-slate-400 text-sm font-medium mb-1">
//                   Estimated Tuition
//                 </p>
//                 <div className="flex items-baseline gap-1">
//                   <span className="text-5xl font-extrabold tracking-tight">
//                     ${priceData.price}
//                   </span>
//                   <span className="text-slate-400 font-medium">/mo</span>
//                 </div>
//               </div>
//               <Badge className="bg-emerald-500 hover:bg-emerald-600 text-white border-0 px-3 py-1 text-xs">
//                 ${priceData.perClass} per class
//               </Badge>
//             </div>

//             <div className="space-y-4 mb-10">
//               <SummaryItem text={`${days} Live Classes per week`} />
//               <SummaryItem text={`${duration[0]} Minutes 1-on-1 interaction`} />
//               <SummaryItem text="Qualified Al-Azhar Tutor" />
//               <SummaryItem text="Monthly Progress Reports" />
//               <SummaryItem text="Certificate upon completion" />
//             </div>

//             <div className="mt-auto">
//               <Button
//                 className="w-full h-14 rounded-xl bg-white text-slate-900 hover:bg-emerald-50 font-bold text-lg shadow-xl transition-transform hover:scale-[1.02]"
//                 asChild
//               >
//                 <Link
//                   href={`/register?plan=one-on-one&days=${days}&duration=${duration[0]}&cycle=${billingCycle}`}
//                 >
//                   Enroll Now <ArrowRight className="ml-2 h-5 w-5" />
//                 </Link>
//               </Button>
//               <p className="text-center text-xs text-slate-500 mt-4">
//                 7-day money-back guarantee. Cancel anytime.
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// function SummaryItem({ text }: { text: string }) {
//   return (
//     <div className="flex items-center gap-3">
//       <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center shrink-0">
//         <Check className="w-3.5 h-3.5 text-emerald-400" />
//       </div>
//       <span className="text-slate-300 font-medium">{text}</span>
//     </div>
//   );
// }