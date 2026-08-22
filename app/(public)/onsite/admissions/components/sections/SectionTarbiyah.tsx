// // app/(marketing)/onsite/admissions/components/sections/SectionTarbiyah.tsx
// "use client";

// import { SectionProps } from "../../types";

// import {cn} from "@/lib/utils"


// export function SectionTarbiyah({ formData, handleChange }: SectionProps) {
//   return (
//     <div className="space-y-5">
//       <div className="space-y-1.5">
//         <label className="text-xs font-black uppercase tracking-wider text-slate-400">
//           59. Why are you choosing a boarding Madrasah for the student?
//         </label>
//         <textarea
//           name="whyBoarding"
//           value={formData.whyBoarding}
//           onChange={handleChange}
//           rows={2}
//           className="w-full p-3 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all resize-none"
//           placeholder="Why boarding?"
//         />
//       </div>

//       <div className="space-y-1.5">
//         <label className="text-xs font-black uppercase tracking-wider text-slate-400">
//           60. Has the student lived away from parents before?
//         </label>
//         <div className="flex gap-4">
//           {["Yes", "No"].map((option) => (
//             <button
//               key={option}
//               type="button"
//               onClick={() =>
//                 handleChange({
//                   target: { name: "livedAwayFromParents", value: option },
//                 } as any)
//               }
//               className={cn(
//                 "px-6 py-2 rounded-full text-xs font-black transition-all min-h-[40px]",
//                 formData.livedAwayFromParents === option
//                   ? "bg-purple-600/40 text-purple-300 border border-purple-500"
//                   : "bg-slate-800/50 text-slate-400 border border-slate-800 hover:border-slate-700",
//               )}
//             >
//               {option}
//             </button>
//           ))}
//         </div>
//       </div>

//       <div className="space-y-1.5">
//         <label className="text-xs font-black uppercase tracking-wider text-slate-400">
//           61. How does the student normally respond to being away from home?
//         </label>
//         <input
//           name="awayFromHomeResponse"
//           value={formData.awayFromHomeResponse}
//           onChange={handleChange}
//           className="w-full h-12 px-4 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all"
//           placeholder="e.g., Adapts well, homesick at first..."
//         />
//       </div>

//       <div className="space-y-1.5">
//         <label className="text-xs font-black uppercase tracking-wider text-slate-400">
//           62. Does the student have any difficulty following a structured
//           routine?
//         </label>
//         <div className="flex flex-wrap gap-2">
//           {["Yes", "No", "Sometimes"].map((option) => (
//             <button
//               key={option}
//               type="button"
//               onClick={() =>
//                 handleChange({
//                   target: { name: "routineDifficulty", value: option },
//                 } as any)
//               }
//               className={cn(
//                 "px-6 py-2 rounded-full text-xs font-black transition-all min-h-[40px]",
//                 formData.routineDifficulty === option
//                   ? "bg-purple-600/40 text-purple-300 border border-purple-500"
//                   : "bg-slate-800/50 text-slate-400 border border-slate-800 hover:border-slate-700",
//               )}
//             >
//               {option}
//             </button>
//           ))}
//         </div>
//       </div>

//       <div className="space-y-1.5">
//         <label className="text-xs font-black uppercase tracking-wider text-slate-400">
//           63. Does the student normally wake up for Ṣalāh without difficulty?
//         </label>
//         <input
//           name="wakesForSalah"
//           value={formData.wakesForSalah}
//           onChange={handleChange}
//           className="w-full h-12 px-4 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all"
//           placeholder="e.g., Yes, always; Sometimes needs encouragement"
//         />
//       </div>

//       <div className="space-y-1.5">
//         <label className="text-xs font-black uppercase tracking-wider text-slate-400">
//           64. How would you describe the student's general discipline?
//         </label>
//         <input
//           name="generalDiscipline"
//           value={formData.generalDiscipline}
//           onChange={handleChange}
//           className="w-full h-12 px-4 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all"
//           placeholder="e.g., Very disciplined, Needs reminders..."
//         />
//       </div>

//       <div className="space-y-1.5">
//         <label className="text-xs font-black uppercase tracking-wider text-slate-400">
//           65. Are there any behavioural concerns we should know about?
//         </label>
//         <input
//           name="behavioralConcerns"
//           value={formData.behavioralConcerns}
//           onChange={handleChange}
//           className="w-full h-12 px-4 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all"
//           placeholder="Any concerns..."
//         />
//       </div>

//       <div className="space-y-1.5">
//         <label className="text-xs font-black uppercase tracking-wider text-slate-400">
//           66. Is there anything about the student's personality, habits or
//           character that would help our Ustadhs care for them better?
//         </label>
//         <textarea
//           name="personalityNotes"
//           value={formData.personalityNotes}
//           onChange={handleChange}
//           rows={2}
//           className="w-full p-3 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all resize-none"
//           placeholder="Any notes about personality..."
//         />
//       </div>

//       <div className="space-y-1.5">
//         <label className="text-xs font-black uppercase tracking-wider text-slate-400">
//           67. Are there any specific Tarbiyah goals you would like us to work on
//           with the student?
//         </label>
//         <textarea
//           name="tarbiyahGoals"
//           value={formData.tarbiyahGoals}
//           onChange={handleChange}
//           rows={2}
//           className="w-full p-3 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all resize-none"
//           placeholder="Any character goals..."
//         />
//       </div>
//     </div>
//   );
// }






// app/(marketing)/onsite/admissions/components/sections/SectionTarbiyah.tsx
"use client";

import { cn } from "@/lib/utils";
import { SectionProps } from "../../types";
import { motion } from "framer-motion";
import {
  Heart,
  Home,
  Users,
  Clock,
  Sun,
  Moon,
  Shield,
  Sparkles,
  Star,
  Target,
  Crown,
  Compass,
  Quote,
} from "lucide-react";

export function SectionTarbiyah({ formData, handleChange }: SectionProps) {
  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      transition={{ duration: 0.3, staggerChildren: 0.05 }}
      className="space-y-5"
    >
      {/* Info Banner */}
      <div className="p-4 rounded-xl bg-gradient-to-r from-purple-50/30 to-amber-50/30 dark:from-purple-600/10 dark:to-amber-500/10 border border-purple-200 dark:border-purple-800/30">
        <div className="flex items-start gap-3">
          <Heart className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-medium text-foreground">Character & Tarbiyah Development</p>
            <p className="text-[10px] text-muted-foreground">
              Understanding the student's character helps us provide nurturing care and spiritual growth
            </p>
          </div>
        </div>
      </div>

      {/* Question 59 - Why Boarding */}
      <motion.div variants={fadeIn} className="space-y-2">
        <label className="text-xs font-black uppercase tracking-wider text-muted-foreground">
          59. Why are you choosing a boarding Madrasah for the student?
        </label>
        <div className="relative">
          <Home className="absolute left-3 top-3 w-4 h-4 text-purple-500" />
          <textarea
            name="whyBoarding"
            value={formData.whyBoarding}
            onChange={handleChange}
            rows={3}
            className="w-full p-4 pl-10 rounded-xl border border-border bg-card/50 focus:border-purple-500 dark:focus:border-purple-400 outline-none text-foreground text-sm transition-all duration-300 resize-none placeholder:text-muted-foreground/50"
            placeholder="Why boarding?"
          />
        </div>
      </motion.div>

      {/* Question 60 - Lived Away From Parents */}
      <motion.div variants={fadeIn} className="space-y-2">
        <label className="text-xs font-black uppercase tracking-wider text-muted-foreground">
          60. Has the student lived away from parents before?
        </label>
        <div className="flex gap-4">
          {["Yes", "No"].map((option) => (
            <motion.button
              key={option}
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() =>
                handleChange({
                  target: { name: "livedAwayFromParents", value: option },
                } as any)
              }
              className={cn(
                "px-6 py-2.5 rounded-full text-xs font-black transition-all duration-300 min-h-[44px]",
                formData.livedAwayFromParents === option
                  ? option === "Yes"
                    ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-lg shadow-amber-500/30"
                    : "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-500/30"
                  : "bg-card/50 text-muted-foreground border border-border hover:border-amber-300 dark:hover:border-amber-600/30 hover:bg-muted/30",
              )}
            >
              {option}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Question 61 - Away From Home Response */}
      <motion.div variants={fadeIn} className="space-y-2">
        <label className="text-xs font-black uppercase tracking-wider text-muted-foreground">
          61. How does the student normally respond to being away from home?
        </label>
        <div className="relative">
          <Compass className="absolute left-3 top-3 w-4 h-4 text-amber-500" />
          <input
            name="awayFromHomeResponse"
            value={formData.awayFromHomeResponse}
            onChange={handleChange}
            className="w-full h-12 pl-10 pr-4 rounded-xl border border-border bg-card/50 focus:border-purple-500 dark:focus:border-purple-400 outline-none text-foreground text-sm transition-all duration-300"
            placeholder="e.g., Adapts well, homesick at first..."
          />
        </div>
      </motion.div>

      {/* Question 62 - Routine Difficulty */}
      <motion.div variants={fadeIn} className="space-y-2">
        <label className="text-xs font-black uppercase tracking-wider text-muted-foreground">
          62. Does the student have any difficulty following a structured
          routine?
        </label>
        <div className="flex flex-wrap gap-2">
          {["Yes", "No", "Sometimes"].map((option) => (
            <motion.button
              key={option}
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() =>
                handleChange({
                  target: { name: "routineDifficulty", value: option },
                } as any)
              }
              className={cn(
                "px-6 py-2.5 rounded-full text-xs font-black transition-all duration-300 min-h-[44px]",
                formData.routineDifficulty === option
                  ? option === "Yes"
                    ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-lg shadow-amber-500/30"
                    : option === "No"
                    ? "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-500/30"
                    : "bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg shadow-purple-500/30"
                  : "bg-card/50 text-muted-foreground border border-border hover:border-amber-300 dark:hover:border-amber-600/30 hover:bg-muted/30",
              )}
            >
              {option}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Question 63 - Wakes for Salah */}
      <motion.div variants={fadeIn} className="space-y-2">
        <label className="text-xs font-black uppercase tracking-wider text-muted-foreground">
          63. Does the student normally wake up for Ṣalāh without difficulty?
        </label>
        <div className="relative">
          <Sun className="absolute left-3 top-3 w-4 h-4 text-amber-500" />
          <input
            name="wakesForSalah"
            value={formData.wakesForSalah}
            onChange={handleChange}
            className="w-full h-12 pl-10 pr-4 rounded-xl border border-border bg-card/50 focus:border-purple-500 dark:focus:border-purple-400 outline-none text-foreground text-sm transition-all duration-300"
            placeholder="e.g., Yes, always; Sometimes needs encouragement"
          />
        </div>
      </motion.div>

      {/* Question 64 - General Discipline */}
      <motion.div variants={fadeIn} className="space-y-2">
        <label className="text-xs font-black uppercase tracking-wider text-muted-foreground">
          64. How would you describe the student's general discipline?
        </label>
        <div className="relative">
          <Shield className="absolute left-3 top-3 w-4 h-4 text-purple-500" />
          <input
            name="generalDiscipline"
            value={formData.generalDiscipline}
            onChange={handleChange}
            className="w-full h-12 pl-10 pr-4 rounded-xl border border-border bg-card/50 focus:border-purple-500 dark:focus:border-purple-400 outline-none text-foreground text-sm transition-all duration-300"
            placeholder="e.g., Very disciplined, Needs reminders..."
          />
        </div>
      </motion.div>

      {/* Question 65 - Behavioral Concerns */}
      <motion.div variants={fadeIn} className="space-y-2">
        <label className="text-xs font-black uppercase tracking-wider text-muted-foreground">
          65. Are there any behavioural concerns we should know about?
        </label>
        <div className="relative">
          <Shield className="absolute left-3 top-3 w-4 h-4 text-rose-500" />
          <input
            name="behavioralConcerns"
            value={formData.behavioralConcerns}
            onChange={handleChange}
            className="w-full h-12 pl-10 pr-4 rounded-xl border border-border bg-card/50 focus:border-rose-500 dark:focus:border-rose-400 outline-none text-foreground text-sm transition-all duration-300"
            placeholder="Any concerns..."
          />
        </div>
      </motion.div>

      {/* Question 66 - Personality Notes */}
      <motion.div variants={fadeIn} className="space-y-2">
        <label className="text-xs font-black uppercase tracking-wider text-muted-foreground">
          66. Is there anything about the student's personality, habits or
          character that would help our Ustadhs care for them better?
        </label>
        <div className="relative">
          <Star className="absolute left-3 top-3 w-4 h-4 text-purple-500" />
          <textarea
            name="personalityNotes"
            value={formData.personalityNotes}
            onChange={handleChange}
            rows={3}
            className="w-full p-4 pl-10 rounded-xl border border-border bg-card/50 focus:border-purple-500 dark:focus:border-purple-400 outline-none text-foreground text-sm transition-all duration-300 resize-none placeholder:text-muted-foreground/50"
            placeholder="Any notes about personality..."
          />
        </div>
      </motion.div>

      {/* Question 67 - Tarbiyah Goals */}
      <motion.div variants={fadeIn} className="space-y-2">
        <label className="text-xs font-black uppercase tracking-wider text-muted-foreground">
          67. Are there any specific Tarbiyah goals you would like us to work on
          with the student?
        </label>
        <div className="relative">
          <Target className="absolute left-3 top-3 w-4 h-4 text-amber-500" />
          <textarea
            name="tarbiyahGoals"
            value={formData.tarbiyahGoals}
            onChange={handleChange}
            rows={3}
            className="w-full p-4 pl-10 rounded-xl border border-border bg-card/50 focus:border-purple-500 dark:focus:border-purple-400 outline-none text-foreground text-sm transition-all duration-300 resize-none placeholder:text-muted-foreground/50"
            placeholder="Any character goals..."
          />
        </div>
      </motion.div>

      {/* Tarbiyah Summary */}
      <motion.div
        variants={fadeIn}
        className="mt-4 p-4 rounded-xl bg-gradient-to-r from-purple-50/30 to-amber-50/30 dark:from-purple-600/10 dark:to-amber-500/10 border border-purple-200 dark:border-purple-800/30"
      >
        <div className="flex items-start gap-3">
          <Crown className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-medium text-foreground">Holistic Character Development</p>
            <p className="text-[10px] text-muted-foreground">
              Our Tarbiyah program focuses on spiritual growth, discipline, manners, and Islamic character
            </p>
          </div>
        </div>
      </motion.div>

      {/* Progress Indicators */}
      <div className="flex flex-wrap gap-3 pt-2">
        {[
          { 
            label: "Discipline", 
            value: formData.generalDiscipline, 
            icon: Shield,
            color: "purple" 
          },
          { 
            label: "Routine", 
            value: formData.routineDifficulty, 
            icon: Clock,
            color: "amber" 
          },
          { 
            label: "Salah", 
            value: formData.wakesForSalah, 
            icon: Sun,
            color: "emerald" 
          },
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className={`px-3 py-1.5 rounded-full bg-${item.color}-50 dark:bg-${item.color}-500/10 border border-${item.color}-200 dark:border-${item.color}-800/30 flex items-center gap-2`}
          >
            <item.icon className={`w-3 h-3 text-${item.color}-500`} />
            <span className="text-[9px] font-medium text-muted-foreground">
              {item.label}: {item.value || "Not specified"}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Quote */}
      <motion.div
        variants={fadeIn}
        className="mt-4 p-4 rounded-xl bg-gradient-to-r from-amber-50/30 to-orange-50/30 dark:from-amber-600/10 dark:to-orange-600/10 border border-amber-200 dark:border-amber-800/30"
      >
        <div className="flex items-start gap-3">
          <Quote className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
          <p className="text-[10px] italic text-muted-foreground">
            "Indeed, I was sent to perfect good character." — Prophet Muhammad (ﷺ)
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}