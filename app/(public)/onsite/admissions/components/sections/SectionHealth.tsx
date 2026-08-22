// // app/(marketing)/onsite/admissions/components/sections/SectionHealth.tsx
// "use client";

// import { cn } from "@/lib/utils";
// import { SectionProps } from "../../types";

// export function SectionHealth({ formData, handleChange }: SectionProps) {
//   return (
//     <div className="space-y-5">
//       <div className="space-y-1.5">
//         <label className="text-xs font-black uppercase tracking-wider text-slate-400">
//           68. Does the student have any medical condition?
//         </label>
//         <div className="flex gap-4">
//           {["Yes", "No"].map((option) => (
//             <button
//               key={option}
//               type="button"
//               onClick={() =>
//                 handleChange({
//                   target: { name: "medicalCondition", value: option },
//                 } as any)
//               }
//               className={cn(
//                 "px-6 py-2 rounded-full text-xs font-black transition-all min-h-[40px]",
//                 formData.medicalCondition === option
//                   ? "bg-red-600/40 text-red-300 border border-red-500"
//                   : "bg-slate-800/50 text-slate-400 border border-slate-800 hover:border-slate-700",
//               )}
//             >
//               {option}
//             </button>
//           ))}
//         </div>
//       </div>
//       {formData.medicalCondition === "Yes" && (
//         <div className="space-y-1.5 pl-4 border-l-2 border-red-500/30">
//           <label className="text-xs font-black uppercase tracking-wider text-slate-400">
//             Please explain:
//           </label>
//           <input
//             name="medicalConditionDetails"
//             value={formData.medicalConditionDetails}
//             onChange={handleChange}
//             className="w-full h-12 px-4 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all"
//             placeholder="Medical condition details..."
//           />
//         </div>
//       )}

//       <div className="space-y-1.5">
//         <label className="text-xs font-black uppercase tracking-wider text-slate-400">
//           69. Does the student have any allergies?
//         </label>
//         <div className="flex gap-4">
//           {["Yes", "No"].map((option) => (
//             <button
//               key={option}
//               type="button"
//               onClick={() =>
//                 handleChange({
//                   target: { name: "allergies", value: option },
//                 } as any)
//               }
//               className={cn(
//                 "px-6 py-2 rounded-full text-xs font-black transition-all min-h-[40px]",
//                 formData.allergies === option
//                   ? "bg-red-600/40 text-red-300 border border-red-500"
//                   : "bg-slate-800/50 text-slate-400 border border-slate-800 hover:border-slate-700",
//               )}
//             >
//               {option}
//             </button>
//           ))}
//         </div>
//       </div>
//       {formData.allergies === "Yes" && (
//         <div className="space-y-1.5 pl-4 border-l-2 border-red-500/30">
//           <label className="text-xs font-black uppercase tracking-wider text-slate-400">
//             Please explain:
//           </label>
//           <input
//             name="allergiesDetails"
//             value={formData.allergiesDetails}
//             onChange={handleChange}
//             className="w-full h-12 px-4 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all"
//             placeholder="Allergy details..."
//           />
//         </div>
//       )}

//       <div className="space-y-1.5">
//         <label className="text-xs font-black uppercase tracking-wider text-slate-400">
//           70. Is the student currently taking any medication?
//         </label>
//         <div className="flex gap-4">
//           {["Yes", "No"].map((option) => (
//             <button
//               key={option}
//               type="button"
//               onClick={() =>
//                 handleChange({
//                   target: { name: "medication", value: option },
//                 } as any)
//               }
//               className={cn(
//                 "px-6 py-2 rounded-full text-xs font-black transition-all min-h-[40px]",
//                 formData.medication === option
//                   ? "bg-red-600/40 text-red-300 border border-red-500"
//                   : "bg-slate-800/50 text-slate-400 border border-slate-800 hover:border-slate-700",
//               )}
//             >
//               {option}
//             </button>
//           ))}
//         </div>
//       </div>
//       {formData.medication === "Yes" && (
//         <div className="space-y-1.5 pl-4 border-l-2 border-red-500/30">
//           <label className="text-xs font-black uppercase tracking-wider text-slate-400">
//             Please provide details:
//           </label>
//           <input
//             name="medicationDetails"
//             value={formData.medicationDetails}
//             onChange={handleChange}
//             className="w-full h-12 px-4 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all"
//             placeholder="Medication details..."
//           />
//         </div>
//       )}

//       <div className="space-y-1.5">
//         <label className="text-xs font-black uppercase tracking-wider text-slate-400">
//           71. Does the student have any dietary restrictions?
//         </label>
//         <div className="flex gap-4">
//           {["Yes", "No"].map((option) => (
//             <button
//               key={option}
//               type="button"
//               onClick={() =>
//                 handleChange({
//                   target: { name: "dietaryRestrictions", value: option },
//                 } as any)
//               }
//               className={cn(
//                 "px-6 py-2 rounded-full text-xs font-black transition-all min-h-[40px]",
//                 formData.dietaryRestrictions === option
//                   ? "bg-amber-600/40 text-amber-300 border border-amber-500"
//                   : "bg-slate-800/50 text-slate-400 border border-slate-800 hover:border-slate-700",
//               )}
//             >
//               {option}
//             </button>
//           ))}
//         </div>
//       </div>
//       {formData.dietaryRestrictions === "Yes" && (
//         <div className="space-y-1.5 pl-4 border-l-2 border-amber-500/30">
//           <label className="text-xs font-black uppercase tracking-wider text-slate-400">
//             Please explain:
//           </label>
//           <input
//             name="dietaryRestrictionsDetails"
//             value={formData.dietaryRestrictionsDetails}
//             onChange={handleChange}
//             className="w-full h-12 px-4 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all"
//             placeholder="Dietary restriction details..."
//           />
//         </div>
//       )}

//       <div className="space-y-1.5">
//         <label className="text-xs font-black uppercase tracking-wider text-slate-400">
//           72. Has the student ever experienced any serious medical condition or
//           emergency that the Madrasah should know about?
//         </label>
//         <input
//           name="seriousMedicalHistory"
//           value={formData.seriousMedicalHistory}
//           onChange={handleChange}
//           className="w-full h-12 px-4 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all"
//           placeholder="Any serious medical history..."
//         />
//       </div>

//       <div className="space-y-1.5">
//         <label className="text-xs font-black uppercase tracking-wider text-slate-400">
//           73. Does the student have any special physical, emotional, behavioural
//           or learning needs?
//         </label>
//         <div className="flex gap-4">
//           {["Yes", "No"].map((option) => (
//             <button
//               key={option}
//               type="button"
//               onClick={() =>
//                 handleChange({
//                   target: { name: "specialNeeds", value: option },
//                 } as any)
//               }
//               className={cn(
//                 "px-6 py-2 rounded-full text-xs font-black transition-all min-h-[40px]",
//                 formData.specialNeeds === option
//                   ? "bg-purple-600/40 text-purple-300 border border-purple-500"
//                   : "bg-slate-800/50 text-slate-400 border border-slate-800 hover:border-slate-700",
//               )}
//             >
//               {option}
//             </button>
//           ))}
//         </div>
//       </div>
//       {formData.specialNeeds === "Yes" && (
//         <div className="space-y-1.5 pl-4 border-l-2 border-purple-500/30">
//           <label className="text-xs font-black uppercase tracking-wider text-slate-400">
//             Please explain:
//           </label>
//           <input
//             name="specialNeedsDetails"
//             value={formData.specialNeedsDetails}
//             onChange={handleChange}
//             className="w-full h-12 px-4 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all"
//             placeholder="Special needs details..."
//           />
//         </div>
//       )}

//       <div className="space-y-1.5">
//         <label className="text-xs font-black uppercase tracking-wider text-slate-400">
//           74. Is there any other health or welfare information we should know?
//         </label>
//         <textarea
//           name="healthNotes"
//           value={formData.healthNotes}
//           onChange={handleChange}
//           rows={2}
//           className="w-full p-3 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all resize-none"
//           placeholder="Any additional health information..."
//         />
//       </div>
//     </div>
//   );
// }





// app/(marketing)/onsite/admissions/components/sections/SectionHealth.tsx
"use client";

import { cn } from "@/lib/utils";
import { SectionProps } from "../../types";
import { motion } from "framer-motion";
import { AlertTriangle, HeartPulse, Shield, AlertCircle } from "lucide-react";

export function SectionHealth({ formData, handleChange }: SectionProps) {
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
      <div className="p-4 rounded-xl bg-gradient-to-r from-amber-50/30 to-red-50/30 dark:from-amber-600/10 dark:to-red-600/10 border border-amber-200 dark:border-amber-800/30">
        <div className="flex items-start gap-3">
          <HeartPulse className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          <p className="text-xs text-muted-foreground">
            Please provide accurate health information. This helps us ensure the 
            safety and well-being of your ward during their time with us.
          </p>
        </div>
      </div>

      {/* Question 68 - Medical Condition */}
      <motion.div variants={fadeIn} className="space-y-2">
        <label className="text-xs font-black uppercase tracking-wider text-muted-foreground">
          68. Does the student have any medical condition?
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
                  target: { name: "medicalCondition", value: option },
                } as any)
              }
              className={cn(
                "px-6 py-2.5 rounded-full text-xs font-black transition-all duration-300 min-h-[44px]",
                formData.medicalCondition === option
                  ? option === "Yes"
                    ? "bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg shadow-red-500/30"
                    : "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-500/30"
                  : "bg-card/50 text-muted-foreground border border-border hover:border-red-300 dark:hover:border-red-600/30 hover:bg-muted/30",
              )}
            >
              {option}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {formData.medicalCondition === "Yes" && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          transition={{ duration: 0.3 }}
          className="space-y-2 pl-4 border-l-2 border-red-500/30"
        >
          <label className="text-xs font-black uppercase tracking-wider text-muted-foreground">
            Please explain:
          </label>
          <div className="relative">
            <AlertCircle className="absolute left-3 top-3 w-4 h-4 text-red-500" />
            <input
              name="medicalConditionDetails"
              value={formData.medicalConditionDetails}
              onChange={handleChange}
              className="w-full h-12 pl-10 pr-4 rounded-xl border border-red-300 dark:border-red-800/30 bg-card/50 focus:border-red-500 dark:focus:border-red-400 outline-none text-foreground text-sm transition-all duration-300"
              placeholder="Medical condition details..."
            />
          </div>
        </motion.div>
      )}

      {/* Question 69 - Allergies */}
      <motion.div variants={fadeIn} className="space-y-2">
        <label className="text-xs font-black uppercase tracking-wider text-muted-foreground">
          69. Does the student have any allergies?
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
                  target: { name: "allergies", value: option },
                } as any)
              }
              className={cn(
                "px-6 py-2.5 rounded-full text-xs font-black transition-all duration-300 min-h-[44px]",
                formData.allergies === option
                  ? option === "Yes"
                    ? "bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg shadow-red-500/30"
                    : "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-500/30"
                  : "bg-card/50 text-muted-foreground border border-border hover:border-red-300 dark:hover:border-red-600/30 hover:bg-muted/30",
              )}
            >
              {option}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {formData.allergies === "Yes" && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          transition={{ duration: 0.3 }}
          className="space-y-2 pl-4 border-l-2 border-red-500/30"
        >
          <label className="text-xs font-black uppercase tracking-wider text-muted-foreground">
            Please explain:
          </label>
          <div className="relative">
            <AlertTriangle className="absolute left-3 top-3 w-4 h-4 text-red-500" />
            <input
              name="allergiesDetails"
              value={formData.allergiesDetails}
              onChange={handleChange}
              className="w-full h-12 pl-10 pr-4 rounded-xl border border-red-300 dark:border-red-800/30 bg-card/50 focus:border-red-500 dark:focus:border-red-400 outline-none text-foreground text-sm transition-all duration-300"
              placeholder="Allergy details..."
            />
          </div>
        </motion.div>
      )}

      {/* Question 70 - Medication */}
      <motion.div variants={fadeIn} className="space-y-2">
        <label className="text-xs font-black uppercase tracking-wider text-muted-foreground">
          70. Is the student currently taking any medication?
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
                  target: { name: "medication", value: option },
                } as any)
              }
              className={cn(
                "px-6 py-2.5 rounded-full text-xs font-black transition-all duration-300 min-h-[44px]",
                formData.medication === option
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

      {formData.medication === "Yes" && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          transition={{ duration: 0.3 }}
          className="space-y-2 pl-4 border-l-2 border-amber-500/30"
        >
          <label className="text-xs font-black uppercase tracking-wider text-muted-foreground">
            Please provide details:
          </label>
          <input
            name="medicationDetails"
            value={formData.medicationDetails}
            onChange={handleChange}
            className="w-full h-12 px-4 rounded-xl border border-amber-300 dark:border-amber-800/30 bg-card/50 focus:border-amber-500 dark:focus:border-amber-400 outline-none text-foreground text-sm transition-all duration-300"
            placeholder="Medication details..."
          />
        </motion.div>
      )}

      {/* Question 71 - Dietary Restrictions */}
      <motion.div variants={fadeIn} className="space-y-2">
        <label className="text-xs font-black uppercase tracking-wider text-muted-foreground">
          71. Does the student have any dietary restrictions?
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
                  target: { name: "dietaryRestrictions", value: option },
                } as any)
              }
              className={cn(
                "px-6 py-2.5 rounded-full text-xs font-black transition-all duration-300 min-h-[44px]",
                formData.dietaryRestrictions === option
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

      {formData.dietaryRestrictions === "Yes" && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          transition={{ duration: 0.3 }}
          className="space-y-2 pl-4 border-l-2 border-amber-500/30"
        >
          <label className="text-xs font-black uppercase tracking-wider text-muted-foreground">
            Please explain:
          </label>
          <input
            name="dietaryRestrictionsDetails"
            value={formData.dietaryRestrictionsDetails}
            onChange={handleChange}
            className="w-full h-12 px-4 rounded-xl border border-amber-300 dark:border-amber-800/30 bg-card/50 focus:border-amber-500 dark:focus:border-amber-400 outline-none text-foreground text-sm transition-all duration-300"
            placeholder="Dietary restriction details..."
          />
        </motion.div>
      )}

      {/* Question 72 - Serious Medical History */}
      <motion.div variants={fadeIn} className="space-y-2">
        <label className="text-xs font-black uppercase tracking-wider text-muted-foreground">
          72. Has the student ever experienced any serious medical condition or
          emergency that the Madrasah should know about?
        </label>
        <div className="relative">
          <AlertTriangle className="absolute left-3 top-3 w-4 h-4 text-amber-500" />
          <input
            name="seriousMedicalHistory"
            value={formData.seriousMedicalHistory}
            onChange={handleChange}
            className="w-full h-12 pl-10 pr-4 rounded-xl border border-border bg-card/50 focus:border-purple-500 dark:focus:border-purple-400 outline-none text-foreground text-sm transition-all duration-300"
            placeholder="Any serious medical history..."
          />
        </div>
      </motion.div>

      {/* Question 73 - Special Needs */}
      <motion.div variants={fadeIn} className="space-y-2">
        <label className="text-xs font-black uppercase tracking-wider text-muted-foreground">
          73. Does the student have any special physical, emotional, behavioural
          or learning needs?
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
                  target: { name: "specialNeeds", value: option },
                } as any)
              }
              className={cn(
                "px-6 py-2.5 rounded-full text-xs font-black transition-all duration-300 min-h-[44px]",
                formData.specialNeeds === option
                  ? option === "Yes"
                    ? "bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg shadow-purple-500/30"
                    : "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-500/30"
                  : "bg-card/50 text-muted-foreground border border-border hover:border-purple-300 dark:hover:border-purple-600/30 hover:bg-muted/30",
              )}
            >
              {option}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {formData.specialNeeds === "Yes" && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          transition={{ duration: 0.3 }}
          className="space-y-2 pl-4 border-l-2 border-purple-500/30"
        >
          <label className="text-xs font-black uppercase tracking-wider text-muted-foreground">
            Please explain:
          </label>
          <textarea
            name="specialNeedsDetails"
            value={formData.specialNeedsDetails}
            onChange={handleChange}
            rows={2}
            className="w-full p-3 rounded-xl border border-purple-300 dark:border-purple-800/30 bg-card/50 focus:border-purple-500 dark:focus:border-purple-400 outline-none text-foreground text-sm transition-all duration-300 resize-none"
            placeholder="Special needs details..."
          />
        </motion.div>
      )}

      {/* Question 74 - Additional Health Information */}
      <motion.div variants={fadeIn} className="space-y-2">
        <label className="text-xs font-black uppercase tracking-wider text-muted-foreground">
          74. Is there any other health or welfare information we should know?
        </label>
        <textarea
          name="healthNotes"
          value={formData.healthNotes}
          onChange={handleChange}
          rows={3}
          className="w-full p-4 rounded-xl border border-border bg-card/50 focus:border-purple-500 dark:focus:border-purple-400 outline-none text-foreground text-sm transition-all duration-300 resize-none placeholder:text-muted-foreground/50"
          placeholder="Any additional health information..."
        />
        <p className="text-[10px] text-muted-foreground/70 italic">
          All health information is kept confidential and used only for the safety and well-being of the student.
        </p>
      </motion.div>

      {/* Health Summary Badge */}
      <motion.div
        variants={fadeIn}
        className="mt-4 p-4 rounded-xl bg-gradient-to-r from-purple-50/30 to-amber-50/30 dark:from-purple-600/10 dark:to-amber-500/10 border border-purple-200 dark:border-purple-800/30"
      >
        <div className="flex items-center gap-3">
          <Shield className="w-5 h-5 text-purple-600 dark:text-purple-400" />
          <div>
            <p className="text-xs font-medium text-foreground">Confidential Health Information</p>
            <p className="text-[10px] text-muted-foreground">
              All health information is protected and only shared with authorized staff
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}