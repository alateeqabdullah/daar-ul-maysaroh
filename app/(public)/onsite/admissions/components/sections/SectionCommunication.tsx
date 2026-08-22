// // app/(marketing)/onsite/admissions/components/sections/SectionCommunication.tsx
// "use client";

// import { cn } from "@/lib/utils";
// import { SectionProps } from "../../types";

// export function SectionCommunication({ formData, handleChange }: SectionProps) {
//   return (
//     <div className="space-y-5">
//       <div className="space-y-1.5">
//         <label className="text-xs font-black uppercase tracking-wider text-slate-400">
//           75. How would you prefer to receive updates about your ward?
//         </label>
//         <div className="flex flex-wrap gap-2">
//           {["WhatsApp", "Phone call", "Email"].map((option) => (
//             <button
//               key={option}
//               type="button"
//               onClick={() =>
//                 handleChange({
//                   target: { name: "updatePreference", value: option },
//                 } as any)
//               }
//               className={cn(
//                 "px-6 py-2 rounded-full text-xs font-black transition-all min-h-[40px]",
//                 formData.updatePreference === option
//                   ? "bg-amber-600/40 text-amber-300 border border-amber-500"
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
//           76. How frequently would you like general progress updates?
//         </label>
//         <div className="flex flex-wrap gap-2">
//           {["Weekly", "Bi-weekly", "Monthly", "As necessary"].map((option) => (
//             <button
//               key={option}
//               type="button"
//               onClick={() =>
//                 handleChange({
//                   target: { name: "updateFrequency", value: option },
//                 } as any)
//               }
//               className={cn(
//                 "px-6 py-2 rounded-full text-xs font-black transition-all min-h-[40px]",
//                 formData.updateFrequency === option
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
//           77. Are you comfortable with the Madrasah contacting you whenever
//           there is an important concern regarding your ward?
//         </label>
//         <div className="flex gap-4">
//           {["Yes", "No"].map((option) => (
//             <button
//               key={option}
//               type="button"
//               onClick={() =>
//                 handleChange({
//                   target: { name: "comfortableContact", value: option },
//                 } as any)
//               }
//               className={cn(
//                 "px-6 py-2 rounded-full text-xs font-black transition-all min-h-[40px]",
//                 formData.comfortableContact === option
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
//           78. Are there any specific communication arrangements you would like
//           us to observe?
//         </label>
//         <textarea
//           name="communicationNotes"
//           value={formData.communicationNotes}
//           onChange={handleChange}
//           rows={2}
//           className="w-full p-3 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all resize-none"
//           placeholder="Any communication preferences..."
//         />
//       </div>
//     </div>
//   );
// }





// app/(marketing)/onsite/admissions/components/sections/SectionCommunication.tsx
"use client";

import { cn } from "@/lib/utils";
import { SectionProps } from "../../types";
import { motion } from "framer-motion";

export function SectionCommunication({ formData, handleChange }: SectionProps) {
  const isPurple = (color: string) => color === "purple";

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
      {/* Question 75 */}
      <motion.div variants={fadeIn} className="space-y-2">
        <label className="text-xs font-black uppercase tracking-wider text-muted-foreground">
          75. How would you prefer to receive updates about your ward?
        </label>
        <div className="flex flex-wrap gap-2">
          {["WhatsApp", "Phone call", "Email"].map((option) => (
            <motion.button
              key={option}
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() =>
                handleChange({
                  target: { name: "updatePreference", value: option },
                } as any)
              }
              className={cn(
                "px-6 py-2.5 rounded-full text-xs font-black transition-all duration-300 min-h-[44px]",
                formData.updatePreference === option
                  ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-lg shadow-amber-500/30"
                  : "bg-card/50 text-muted-foreground border border-border hover:border-amber-300 dark:hover:border-amber-600/30 hover:bg-muted/30",
              )}
            >
              {option}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Question 76 */}
      <motion.div variants={fadeIn} className="space-y-2">
        <label className="text-xs font-black uppercase tracking-wider text-muted-foreground">
          76. How frequently would you like general progress updates?
        </label>
        <div className="flex flex-wrap gap-2">
          {["Weekly", "Bi-weekly", "Monthly", "As necessary"].map((option) => (
            <motion.button
              key={option}
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() =>
                handleChange({
                  target: { name: "updateFrequency", value: option },
                } as any)
              }
              className={cn(
                "px-6 py-2.5 rounded-full text-xs font-black transition-all duration-300 min-h-[44px]",
                formData.updateFrequency === option
                  ? "bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg shadow-purple-500/30"
                  : "bg-card/50 text-muted-foreground border border-border hover:border-purple-300 dark:hover:border-purple-600/30 hover:bg-muted/30",
              )}
            >
              {option}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Question 77 */}
      <motion.div variants={fadeIn} className="space-y-2">
        <label className="text-xs font-black uppercase tracking-wider text-muted-foreground">
          77. Are you comfortable with the Madrasah contacting you whenever
          there is an important concern regarding your ward?
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
                  target: { name: "comfortableContact", value: option },
                } as any)
              }
              className={cn(
                "px-6 py-2.5 rounded-full text-xs font-black transition-all duration-300 min-h-[44px]",
                formData.comfortableContact === option
                  ? "bg-gradient-to-r from-purple-600 to-amber-500 text-white shadow-lg shadow-purple-500/30"
                  : "bg-card/50 text-muted-foreground border border-border hover:border-purple-300 dark:hover:border-purple-600/30 hover:bg-muted/30",
              )}
            >
              {option}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Question 78 */}
      <motion.div variants={fadeIn} className="space-y-2">
        <label className="text-xs font-black uppercase tracking-wider text-muted-foreground">
          78. Are there any specific communication arrangements you would like
          us to observe?
        </label>
        <div className="relative">
          <textarea
            name="communicationNotes"
            value={formData.communicationNotes}
            onChange={handleChange}
            rows={3}
            className="w-full p-4 rounded-xl border border-border bg-card/50 focus:border-purple-500 dark:focus:border-purple-400 outline-none text-foreground text-sm transition-all duration-300 resize-none placeholder:text-muted-foreground/50 focus:shadow-lg focus:shadow-purple-500/10"
            placeholder="Any communication preferences..."
          />
          <div className="absolute bottom-3 right-3 text-[10px] text-muted-foreground">
            {formData.communicationNotes?.length || 0}/500
          </div>
        </div>
        <p className="text-[10px] text-muted-foreground/70 italic">
          e.g., preferred times, specific contacts, or any special arrangements
        </p>
      </motion.div>

      {/* Info Box */}
      <motion.div
        variants={fadeIn}
        className="mt-4 p-4 rounded-xl bg-gradient-to-r from-purple-50/30 to-amber-50/30 dark:from-purple-600/10 dark:to-amber-500/10 border border-purple-200 dark:border-purple-800/30"
      >
        <p className="text-xs text-muted-foreground">
          💡 We value open communication with parents and guardians. Your
          preferences help us keep you informed about your ward's progress and
          well-being.
        </p>
      </motion.div>
    </motion.div>
  );
}