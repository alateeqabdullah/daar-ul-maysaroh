// // app/(marketing)/onsite/admissions/components/sections/SectionLearning.tsx
// "use client";

// import { cn } from "@/lib/utils";
// import { SectionProps } from "../../types";

// export function SectionLearning({ formData, handleChange }: SectionProps) {
//   return (
//     <div className="space-y-5">
//       <div className="space-y-1.5">
//         <label className="text-xs font-black uppercase tracking-wider text-slate-400">
//           51. What motivates you to enrol your ward at Daar-ul-Maysaroh?
//         </label>
//         <textarea
//           name="motivation"
//           value={formData.motivation}
//           onChange={handleChange}
//           rows={2}
//           className="w-full p-3 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all resize-none"
//           placeholder="Why are you choosing Daar-ul-Maysaroh?"
//         />
//       </div>

//       <div className="space-y-1.5">
//         <label className="text-xs font-black uppercase tracking-wider text-slate-400">
//           52. What would you like the student to achieve during their time with us?
//         </label>
//         <textarea
//           name="desiredAchievement"
//           value={formData.desiredAchievement}
//           onChange={handleChange}
//           rows={2}
//           className="w-full p-3 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all resize-none"
//           placeholder="What are your hopes for your child?"
//         />
//       </div>

//       <div className="space-y-1.5">
//         <label className="text-xs font-black uppercase tracking-wider text-slate-400">
//           53. Does the student enjoy Qur'ān memorisation?
//         </label>
//         <div className="flex flex-wrap gap-2">
//           {["Very much", "Somewhat", "Not really", "Not sure"].map((option) => (
//             <button
//               key={option}
//               type="button"
//               onClick={() =>
//                 handleChange({ target: { name: "enjoysMemorization", value: option } } as any)
//               }
//               className={cn(
//                 "px-6 py-2 rounded-full text-xs font-black transition-all min-h-[40px]",
//                 formData.enjoysMemorization === option
//                   ? "bg-amber-600/40 text-amber-300 border border-amber-500"
//                   : "bg-slate-800/50 text-slate-400 border border-slate-800 hover:border-slate-700"
//               )}
//             >
//               {option}
//             </button>
//           ))}
//         </div>
//       </div>

//       <div className="space-y-1.5">
//         <label className="text-xs font-black uppercase tracking-wider text-slate-400">
//           54. How does the student usually respond when corrected by a teacher?
//         </label>
//         <input
//           name="responseToCorrection"
//           value={formData.responseToCorrection}
//           onChange={handleChange}
//           className="w-full h-12 px-4 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all"
//           placeholder="e.g., Receptive, shy, frustrated..."
//         />
//       </div>

//       <div className="space-y-1.5">
//         <label className="text-xs font-black uppercase tracking-wider text-slate-400">
//           55. Does the student have difficulty maintaining concentration during Qur'ān lessons?
//         </label>
//         <div className="flex flex-wrap gap-2">
//           {["Yes", "No", "Sometimes"].map((option) => (
//             <button
//               key={option}
//               type="button"
//               onClick={() =>
//                 handleChange({
//                   target: { name: "concentrationDifficulty", value: option },
//                 } as any)
//               }
//               className={cn(
//                 "px-6 py-2 rounded-full text-xs font-black transition-all min-h-[40px]",
//                 formData.concentrationDifficulty === option
//                   ? "bg-purple-600/40 text-purple-300 border border-purple-500"
//                   : "bg-slate-800/50 text-slate-400 border border-slate-800 hover:border-slate-700"
//               )}
//             >
//               {option}
//             </button>
//           ))}
//         </div>
//       </div>

//       <div className="space-y-1.5">
//         <label className="text-xs font-black uppercase tracking-wider text-slate-400">
//           56. Are there any learning difficulties or circumstances that may affect the student's
//           Tahfeedh?
//         </label>
//         <div className="flex gap-4">
//           {["Yes", "No"].map((option) => (
//             <button
//               key={option}
//               type="button"
//               onClick={() =>
//                 handleChange({
//                   target: { name: "learningDifficulties", value: option },
//                 } as any)
//               }
//               className={cn(
//                 "px-6 py-2 rounded-full text-xs font-black transition-all min-h-[40px]",
//                 formData.learningDifficulties === option
//                   ? "bg-purple-600/40 text-purple-300 border border-purple-500"
//                   : "bg-slate-800/50 text-slate-400 border border-slate-800 hover:border-slate-700"
//               )}
//             >
//               {option}
//             </button>
//           ))}
//         </div>
//       </div>
//       {formData.learningDifficulties === "Yes" && (
//         <div className="space-y-1.5 pl-4 border-l-2 border-purple-500/30">
//           <label className="text-xs font-black uppercase tracking-wider text-slate-400">
//             Please explain:
//           </label>
//           <textarea
//             name="learningDifficultiesDetails"
//             value={formData.learningDifficultiesDetails}
//             onChange={handleChange}
//             rows={2}
//             className="w-full p-3 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all resize-none"
//             placeholder="Any learning difficulties..."
//           />
//         </div>
//       )}

//       <div className="grid sm:grid-cols-2 gap-4">
//         <div className="space-y-1.5">
//           <label className="text-xs font-black uppercase tracking-wider text-slate-400">
//             57. What do you consider the student's greatest strength in Qur'ān learning?
//           </label>
//           <input
//             name="greatestStrength"
//             value={formData.greatestStrength}
//             onChange={handleChange}
//             className="w-full h-12 px-4 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all"
//             placeholder="e.g., Good memory, loves reciting..."
//           />
//         </div>
//         <div className="space-y-1.5">
//           <label className="text-xs font-black uppercase tracking-wider text-slate-400">
//             58. What area do you believe the student needs the most improvement?
//           </label>
//           <input
//             name="needsImprovement"
//             value={formData.needsImprovement}
//             onChange={handleChange}
//             className="w-full h-12 px-4 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all"
//             placeholder="e.g., Tajweed, consistency, focus..."
//           />
//         </div>
//       </div>
//     </div>
//   );
// }





// app/(marketing)/onsite/admissions/components/sections/SectionLearning.tsx
"use client";

import { cn } from "@/lib/utils";
import { SectionProps } from "../../types";
import { motion } from "framer-motion";
import {
  Target,
  Heart,
  Brain,
  TrendingUp,
  Sparkles,
  Lightbulb,
  Star,
  Users,
  Shield,
  Award,
} from "lucide-react";

export function SectionLearning({ formData, handleChange }: SectionProps) {
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
          <Brain className="w-5 h-5 text-purple-600 dark:text-purple-400 shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-medium text-foreground">Learning Profile</p>
            <p className="text-[10px] text-muted-foreground">
              Understanding your ward's learning style helps us provide the best educational experience
            </p>
          </div>
        </div>
      </div>

      {/* Question 51 - Motivation */}
      <motion.div variants={fadeIn} className="space-y-2">
        <label className="text-xs font-black uppercase tracking-wider text-muted-foreground">
          51. What motivates you to enrol your ward at Daar-ul-Maysaroh?
        </label>
        <div className="relative">
          <Target className="absolute left-3 top-3 w-4 h-4 text-amber-500" />
          <textarea
            name="motivation"
            value={formData.motivation}
            onChange={handleChange}
            rows={3}
            className="w-full p-4 pl-10 rounded-xl border border-border bg-card/50 focus:border-purple-500 dark:focus:border-purple-400 outline-none text-foreground text-sm transition-all duration-300 resize-none placeholder:text-muted-foreground/50"
            placeholder="Why are you choosing Daar-ul-Maysaroh?"
          />
        </div>
      </motion.div>

      {/* Question 52 - Desired Achievement */}
      <motion.div variants={fadeIn} className="space-y-2">
        <label className="text-xs font-black uppercase tracking-wider text-muted-foreground">
          52. What would you like the student to achieve during their time with us?
        </label>
        <div className="relative">
          <Star className="absolute left-3 top-3 w-4 h-4 text-amber-500" />
          <textarea
            name="desiredAchievement"
            value={formData.desiredAchievement}
            onChange={handleChange}
            rows={3}
            className="w-full p-4 pl-10 rounded-xl border border-border bg-card/50 focus:border-purple-500 dark:focus:border-purple-400 outline-none text-foreground text-sm transition-all duration-300 resize-none placeholder:text-muted-foreground/50"
            placeholder="What are your hopes for your child?"
          />
        </div>
      </motion.div>

      {/* Question 53 - Enjoys Memorization */}
      <motion.div variants={fadeIn} className="space-y-2">
        <label className="text-xs font-black uppercase tracking-wider text-muted-foreground">
          53. Does the student enjoy Qur'ān memorisation?
        </label>
        <div className="flex flex-wrap gap-2">
          {["Very much", "Somewhat", "Not really", "Not sure"].map((option) => (
            <motion.button
              key={option}
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() =>
                handleChange({ target: { name: "enjoysMemorization", value: option } } as any)
              }
              className={cn(
                "px-6 py-2.5 rounded-full text-xs font-black transition-all duration-300 min-h-[44px]",
                formData.enjoysMemorization === option
                  ? option === "Very much"
                    ? "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-500/30"
                    : "bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-lg shadow-amber-500/30"
                  : "bg-card/50 text-muted-foreground border border-border hover:border-amber-300 dark:hover:border-amber-600/30 hover:bg-muted/30",
              )}
            >
              {option}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Question 54 - Response to Correction */}
      <motion.div variants={fadeIn} className="space-y-2">
        <label className="text-xs font-black uppercase tracking-wider text-muted-foreground">
          54. How does the student usually respond when corrected by a teacher?
        </label>
        <div className="relative">
          <Heart className="absolute left-3 top-3 w-4 h-4 text-purple-500" />
          <input
            name="responseToCorrection"
            value={formData.responseToCorrection}
            onChange={handleChange}
            className="w-full h-12 pl-10 pr-4 rounded-xl border border-border bg-card/50 focus:border-purple-500 dark:focus:border-purple-400 outline-none text-foreground text-sm transition-all duration-300"
            placeholder="e.g., Receptive, shy, frustrated..."
          />
        </div>
      </motion.div>

      {/* Question 55 - Concentration Difficulty */}
      <motion.div variants={fadeIn} className="space-y-2">
        <label className="text-xs font-black uppercase tracking-wider text-muted-foreground">
          55. Does the student have difficulty maintaining concentration during Qur'ān lessons?
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
                  target: { name: "concentrationDifficulty", value: option },
                } as any)
              }
              className={cn(
                "px-6 py-2.5 rounded-full text-xs font-black transition-all duration-300 min-h-[44px]",
                formData.concentrationDifficulty === option
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

      {/* Question 56 - Learning Difficulties */}
      <motion.div variants={fadeIn} className="space-y-2">
        <label className="text-xs font-black uppercase tracking-wider text-muted-foreground">
          56. Are there any learning difficulties or circumstances that may affect the student's
          Tahfeedh?
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
                  target: { name: "learningDifficulties", value: option },
                } as any)
              }
              className={cn(
                "px-6 py-2.5 rounded-full text-xs font-black transition-all duration-300 min-h-[44px]",
                formData.learningDifficulties === option
                  ? option === "Yes"
                    ? "bg-gradient-to-r from-rose-500 to-rose-600 text-white shadow-lg shadow-rose-500/30"
                    : "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-500/30"
                  : "bg-card/50 text-muted-foreground border border-border hover:border-rose-300 dark:hover:border-rose-600/30 hover:bg-muted/30",
              )}
            >
              {option}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {formData.learningDifficulties === "Yes" && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          transition={{ duration: 0.3 }}
          className="space-y-2 pl-4 border-l-2 border-rose-500/30"
        >
          <label className="text-xs font-black uppercase tracking-wider text-muted-foreground">
            Please explain:
          </label>
          <div className="relative">
            <Shield className="absolute left-3 top-3 w-4 h-4 text-rose-500" />
            <textarea
              name="learningDifficultiesDetails"
              value={formData.learningDifficultiesDetails}
              onChange={handleChange}
              rows={3}
              className="w-full p-4 pl-10 rounded-xl border border-rose-300 dark:border-rose-800/30 bg-card/50 focus:border-rose-500 dark:focus:border-rose-400 outline-none text-foreground text-sm transition-all duration-300 resize-none placeholder:text-muted-foreground/50"
              placeholder="Any learning difficulties..."
            />
          </div>
        </motion.div>
      )}

      {/* Question 57 & 58 - Strengths & Improvement */}
      <div className="grid sm:grid-cols-2 gap-4">
        <motion.div variants={fadeIn} className="space-y-2">
          <label className="text-xs font-black uppercase tracking-wider text-muted-foreground">
            57. What do you consider the student's greatest strength in Qur'ān learning?
          </label>
          <div className="relative">
            <Award className="absolute left-3 top-3 w-4 h-4 text-emerald-500" />
            <input
              name="greatestStrength"
              value={formData.greatestStrength}
              onChange={handleChange}
              className="w-full h-12 pl-10 pr-4 rounded-xl border border-border bg-card/50 focus:border-purple-500 dark:focus:border-purple-400 outline-none text-foreground text-sm transition-all duration-300"
              placeholder="e.g., Good memory, loves reciting..."
            />
          </div>
        </motion.div>

        <motion.div variants={fadeIn} className="space-y-2">
          <label className="text-xs font-black uppercase tracking-wider text-muted-foreground">
            58. What area do you believe the student needs the most improvement?
          </label>
          <div className="relative">
            <TrendingUp className="absolute left-3 top-3 w-4 h-4 text-amber-500" />
            <input
              name="needsImprovement"
              value={formData.needsImprovement}
              onChange={handleChange}
              className="w-full h-12 pl-10 pr-4 rounded-xl border border-border bg-card/50 focus:border-purple-500 dark:focus:border-purple-400 outline-none text-foreground text-sm transition-all duration-300"
              placeholder="e.g., Tajweed, consistency, focus..."
            />
          </div>
        </motion.div>
      </div>

      {/* Learning Summary */}
      <motion.div
        variants={fadeIn}
        className="mt-4 p-4 rounded-xl bg-gradient-to-r from-purple-50/30 to-amber-50/30 dark:from-purple-600/10 dark:to-amber-500/10 border border-purple-200 dark:border-purple-800/30"
      >
        <div className="flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-medium text-foreground">Personalized Learning Approach</p>
            <p className="text-[10px] text-muted-foreground">
              Your responses help us create a tailored learning experience that maximizes the student's potential
            </p>
          </div>
        </div>
      </motion.div>

      {/* Progress Indicators */}
      <div className="flex flex-wrap gap-3 pt-2">
        {[
          { label: "Motivation", value: formData.motivation, icon: Target },
          { label: "Enjoyment", value: formData.enjoysMemorization, icon: Heart },
          { label: "Focus", value: formData.concentrationDifficulty, icon: Brain },
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="px-3 py-1.5 rounded-full bg-muted/30 border border-border flex items-center gap-2"
          >
            <item.icon className="w-3 h-3 text-purple-500" />
            <span className="text-[9px] font-medium text-muted-foreground">
              {item.label}: {item.value || "Not specified"}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}