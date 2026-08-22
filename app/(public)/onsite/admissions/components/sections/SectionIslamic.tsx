// // app/(marketing)/onsite/admissions/components/sections/SectionIslamic.tsx
// "use client";

// import { cn } from "@/lib/utils";
// import { SectionProps } from "../../types";

// export function SectionIslamic({
//   formData,
//   handleChange,
//   handleArrayChange,
//   errors,
//   touched,
// }: SectionProps) {
//   return (
//     <div className="space-y-5">
//       {/* Studied Islamic Studies */}
//       <div className="space-y-1.5">
//         <label className="text-xs font-black uppercase tracking-wider text-slate-400">
//           46. Has the student studied Islamic Studies?{" "}
//           <span className="text-amber-500">*</span>
//         </label>
//         <div className="flex gap-4">
//           {["Yes", "No"].map((option) => (
//             <button
//               key={option}
//               type="button"
//               onClick={() =>
//                 handleChange({
//                   target: { name: "studiedIslamicStudies", value: option },
//                 } as any)
//               }
//               className={cn(
//                 "px-6 py-2 rounded-full text-xs font-black transition-all min-h-[40px]",
//                 formData.studiedIslamicStudies === option
//                   ? "bg-purple-600/40 text-purple-300 border border-purple-500"
//                   : "bg-slate-800/50 text-slate-400 border border-slate-800 hover:border-slate-700",
//               )}
//             >
//               {option}
//             </button>
//           ))}
//         </div>
//         {errors.studiedIslamicStudies && touched?.studiedIslamicStudies && (
//           <p className="text-xs text-red-400 mt-1 error-message">
//             {errors.studiedIslamicStudies}
//           </p>
//         )}
//       </div>

//       {/* Islamic Studies Areas */}
//       <div className="space-y-1.5">
//         <label className="text-xs font-black uppercase tracking-wider text-slate-400">
//           47. Which areas has the student studied?
//         </label>
//         <div className="flex flex-wrap gap-2">
//           {[
//             "Ṣalāh",
//             "Fiqh",
//             "Ḥadīth",
//             "‘Aqīdah",
//             "Sīrah",
//             "Adhkār",
//             "Islamic manners/adab",
//             "Other",
//           ].map((option) => (
//             <button
//               key={option}
//               type="button"
//               onClick={() => handleArrayChange?.("islamicStudiesAreas", option)}
//               className={cn(
//                 "px-4 py-2 rounded-full text-xs font-black transition-all min-h-[40px]",
//                 formData.islamicStudiesAreas.includes(option)
//                   ? "bg-purple-600/40 text-purple-300 border border-purple-500"
//                   : "bg-slate-800/50 text-slate-400 border border-slate-800 hover:border-slate-700",
//               )}
//             >
//               {option}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Islamic Knowledge Level */}
//       <div className="grid sm:grid-cols-2 gap-4">
//         <div className="space-y-1.5">
//           <label className="text-xs font-black uppercase tracking-wider text-slate-400">
//             48. How would you describe the student's general Islamic knowledge?{" "}
//             <span className="text-amber-500">*</span>
//           </label>
//           <select
//             name="islamicKnowledgeLevel"
//             value={formData.islamicKnowledgeLevel}
//             onChange={handleChange}
//             onBlur={handleChange as any}
//             className={cn(
//               "w-full h-12 px-4 rounded-xl border bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all",
//               errors.islamicKnowledgeLevel && touched?.islamicKnowledgeLevel
//                 ? "border-red-500"
//                 : "border-slate-800",
//             )}
//           >
//             <option value="">Select level</option>
//             <option value="Beginner">Beginner</option>
//             <option value="Basic">Basic</option>
//             <option value="Intermediate">Intermediate</option>
//             <option value="Advanced">Advanced</option>
//             <option value="Not sure">Not sure</option>
//           </select>
//           {errors.islamicKnowledgeLevel && touched?.islamicKnowledgeLevel && (
//             <p className="text-xs text-red-400 mt-1 error-message">
//               {errors.islamicKnowledgeLevel}
//             </p>
//           )}
//         </div>
//         <div className="space-y-1.5">
//           <label className="text-xs font-black uppercase tracking-wider text-slate-400">
//             49. Has the student studied Arabic?{" "}
//             <span className="text-amber-500">*</span>
//           </label>
//           <div className="flex gap-4">
//             {["Yes", "No"].map((option) => (
//               <button
//                 key={option}
//                 type="button"
//                 onClick={() =>
//                   handleChange({
//                     target: { name: "studiedArabic", value: option },
//                   } as any)
//                 }
//                 className={cn(
//                   "px-6 py-2 rounded-full text-xs font-black transition-all min-h-[40px]",
//                   formData.studiedArabic === option
//                     ? "bg-purple-600/40 text-purple-300 border border-purple-500"
//                     : "bg-slate-800/50 text-slate-400 border border-slate-800 hover:border-slate-700",
//                 )}
//               >
//                 {option}
//               </button>
//             ))}
//           </div>
//           {errors.studiedArabic && touched?.studiedArabic && (
//             <p className="text-xs text-red-400 mt-1 error-message">
//               {errors.studiedArabic}
//             </p>
//           )}
//         </div>
//       </div>

//       {formData.studiedArabic === "Yes" && (
//         <div className="space-y-1.5 pl-4 border-l-2 border-purple-500/30">
//           <label className="text-xs font-black uppercase tracking-wider text-slate-400">
//             Level:
//           </label>
//           <input
//             name="arabicLevel"
//             value={formData.arabicLevel}
//             onChange={handleChange}
//             className="w-full h-12 px-4 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all"
//             placeholder="e.g., Beginner, Intermediate"
//           />
//         </div>
//       )}

//       {/* Islamic Education Goals */}
//       <div className="space-y-1.5">
//         <label className="text-xs font-black uppercase tracking-wider text-slate-400">
//           50. What areas of Islamic education would you particularly like the
//           student to improve?
//         </label>
//         <textarea
//           name="islamicEducationGoals"
//           value={formData.islamicEducationGoals}
//           onChange={handleChange}
//           rows={2}
//           className="w-full p-3 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all resize-none"
//           placeholder="e.g., Salah practice, Adab, Aqidah..."
//         />
//       </div>
//     </div>
//   );
// }









// app/(marketing)/onsite/admissions/components/sections/SectionIslamic.tsx
"use client";

import { cn } from "@/lib/utils";
import { SectionProps } from "../../types";
import { motion } from "framer-motion";
import {
  BookOpen,
  Award,
  GraduationCap,
  Star,
  Shield,
  Heart,
  Compass,
} from "lucide-react";

export function SectionIslamic({
  formData,
  handleChange,
  handleArrayChange,
  errors,
  touched,
}: SectionProps) {
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
          <BookOpen className="w-5 h-5 text-purple-600 dark:text-purple-400 shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-medium text-foreground">Islamic Education Assessment</p>
            <p className="text-[10px] text-muted-foreground">
              Understanding the student's Islamic knowledge helps us provide a well-rounded education
            </p>
          </div>
        </div>
      </div>

      {/* Question 46 - Studied Islamic Studies */}
      <motion.div variants={fadeIn} className="space-y-2">
        <label className="text-xs font-black uppercase tracking-wider text-muted-foreground">
          46. Has the student studied Islamic Studies?{" "}
          <span className="text-amber-500">*</span>
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
                  target: { name: "studiedIslamicStudies", value: option },
                } as any)
              }
              className={cn(
                "px-6 py-2.5 rounded-full text-xs font-black transition-all duration-300 min-h-[44px]",
                formData.studiedIslamicStudies === option
                  ? option === "Yes"
                    ? "bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg shadow-purple-500/30"
                    : "bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-lg shadow-amber-500/30"
                  : "bg-card/50 text-muted-foreground border border-border hover:border-purple-300 dark:hover:border-purple-600/30 hover:bg-muted/30",
              )}
            >
              {option}
            </motion.button>
          ))}
        </div>
        {errors.studiedIslamicStudies && touched?.studiedIslamicStudies && (
          <p className="text-xs text-red-500 mt-1 error-message">
            {errors.studiedIslamicStudies}
          </p>
        )}
      </motion.div>

      {/* Question 47 - Islamic Studies Areas */}
      <motion.div variants={fadeIn} className="space-y-2">
        <label className="text-xs font-black uppercase tracking-wider text-muted-foreground">
          47. Which areas has the student studied?
        </label>
        <div className="flex flex-wrap gap-2">
          {[
            "Ṣalāh",
            "Fiqh",
            "Ḥadīth",
            "‘Aqīdah",
            "Sīrah",
            "Adhkār",
            "Islamic manners/adab",
            "Other",
          ].map((option) => (
            <motion.button
              key={option}
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleArrayChange?.("islamicStudiesAreas", option)}
              className={cn(
                "px-4 py-2 rounded-full text-xs font-black transition-all duration-300 min-h-[40px]",
                formData.islamicStudiesAreas.includes(option)
                  ? "bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-md"
                  : "bg-card/50 text-muted-foreground border border-border hover:border-purple-300 dark:hover:border-purple-600/30",
              )}
            >
              {option}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Question 48 - Islamic Knowledge Level */}
      <motion.div variants={fadeIn} className="space-y-2">
        <label className="text-xs font-black uppercase tracking-wider text-muted-foreground">
          48. How would you describe the student's general Islamic knowledge?{" "}
          <span className="text-amber-500">*</span>
        </label>
        <select
          name="islamicKnowledgeLevel"
          value={formData.islamicKnowledgeLevel}
          onChange={handleChange}
          className={cn(
            "w-full h-12 px-4 rounded-xl border bg-card/50 focus:border-purple-500 dark:focus:border-purple-400 outline-none text-foreground text-sm transition-all duration-300",
            errors.islamicKnowledgeLevel && touched?.islamicKnowledgeLevel
              ? "border-red-500"
              : "border-border"
          )}
        >
          <option value="">Select level</option>
          <option value="Beginner">Beginner</option>
          <option value="Basic">Basic</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
          <option value="Not sure">Not sure</option>
        </select>
        {errors.islamicKnowledgeLevel && touched?.islamicKnowledgeLevel && (
          <p className="text-xs text-red-500 mt-1 error-message">
            {errors.islamicKnowledgeLevel}
          </p>
        )}
      </motion.div>

      {/* Question 49 - Studied Arabic */}
      <motion.div variants={fadeIn} className="space-y-2">
        <label className="text-xs font-black uppercase tracking-wider text-muted-foreground">
          49. Has the student studied Arabic?{" "}
          <span className="text-amber-500">*</span>
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
                  target: { name: "studiedArabic", value: option },
                } as any)
              }
              className={cn(
                "px-6 py-2.5 rounded-full text-xs font-black transition-all duration-300 min-h-[44px]",
                formData.studiedArabic === option
                  ? option === "Yes"
                    ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-lg shadow-amber-500/30"
                    : "bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg shadow-purple-500/30"
                  : "bg-card/50 text-muted-foreground border border-border hover:border-amber-300 dark:hover:border-amber-600/30 hover:bg-muted/30",
              )}
            >
              {option}
            </motion.button>
          ))}
        </div>
        {errors.studiedArabic && touched?.studiedArabic && (
          <p className="text-xs text-red-500 mt-1 error-message">
            {errors.studiedArabic}
          </p>
        )}
      </motion.div>

      {formData.studiedArabic === "Yes" && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          transition={{ duration: 0.3 }}
          className="space-y-2 pl-4 border-l-2 border-amber-500/30"
        >
          <label className="text-xs font-black uppercase tracking-wider text-muted-foreground">
            Level:
          </label>
          <div className="relative">
            <GraduationCap className="absolute left-3 top-3 w-4 h-4 text-amber-500" />
            <input
              name="arabicLevel"
              value={formData.arabicLevel}
              onChange={handleChange}
              className="w-full h-12 pl-10 pr-4 rounded-xl border border-amber-300 dark:border-amber-800/30 bg-card/50 focus:border-amber-500 dark:focus:border-amber-400 outline-none text-foreground text-sm transition-all duration-300"
              placeholder="e.g., Beginner, Intermediate"
            />
          </div>
        </motion.div>
      )}

      {/* Question 50 - Islamic Education Goals */}
      <motion.div variants={fadeIn} className="space-y-2">
        <label className="text-xs font-black uppercase tracking-wider text-muted-foreground">
          50. What areas of Islamic education would you particularly like the
          student to improve?
        </label>
        <div className="relative">
          <Compass className="absolute left-3 top-4 w-4 h-4 text-purple-500" />
          <textarea
            name="islamicEducationGoals"
            value={formData.islamicEducationGoals}
            onChange={handleChange}
            rows={3}
            className="w-full p-4 pl-10 rounded-xl border border-border bg-card/50 focus:border-purple-500 dark:focus:border-purple-400 outline-none text-foreground text-sm transition-all duration-300 resize-none placeholder:text-muted-foreground/50"
            placeholder="e.g., Salah practice, Adab, Aqidah..."
          />
        </div>
        <p className="text-[10px] text-muted-foreground/70 italic">
          Be specific about areas you'd like the student to focus on
        </p>
      </motion.div>

      {/* Islamic Education Summary */}
      <motion.div
        variants={fadeIn}
        className="mt-4 p-4 rounded-xl bg-gradient-to-r from-purple-50/30 to-amber-50/30 dark:from-purple-600/10 dark:to-amber-500/10 border border-purple-200 dark:border-purple-800/30"
      >
        <div className="flex items-start gap-3">
          <Award className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-medium text-foreground">Holistic Islamic Education</p>
            <p className="text-[10px] text-muted-foreground">
              We provide a comprehensive Islamic curriculum covering Aqeedah, Fiqh, Seerah, and more
            </p>
          </div>
        </div>
      </motion.div>

      {/* Quick Stats */}
      {formData.islamicStudiesAreas.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-wrap gap-2 pt-2"
        >
          <span className="text-[10px] text-muted-foreground">Areas selected:</span>
          {formData.islamicStudiesAreas.map((area: string, i: number) => (
            <span
              key={i}
              className="px-2 py-0.5 rounded-full bg-purple-100 dark:bg-purple-600/20 text-purple-700 dark:text-purple-400 text-[8px] font-black"
            >
              {area}
            </span>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
}