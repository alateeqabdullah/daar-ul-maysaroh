// // app/(marketing)/onsite/admissions/components/sections/SectionProgramme.tsx
// "use client";

// import { cn } from "@/lib/utils";
// import { SectionProps } from "../../types";

// export function SectionProgramme({
//   formData,
//   handleChange,
//   handleArrayChange,
//   errors,
//   touched,
// }: SectionProps) {
//   return (
//     <div className="space-y-5">
//       {/* Programme Type */}
//       <div className="space-y-1.5">
//         <label className="text-xs font-black uppercase tracking-wider text-slate-400">
//           1. Which programme are you applying for?{" "}
//           <span className="text-amber-500">*</span>
//         </label>
//         <div className="grid sm:grid-cols-2 gap-3">
//           {["Full-Time Boarding", "Part-Time / Weekend Boarding"].map(
//             (option) => (
//               <button
//                 key={option}
//                 type="button"
//                 onClick={() =>
//                   handleChange({
//                     target: { name: "programmeType", value: option },
//                   } as any)
//                 }
//                 className={cn(
//                   "p-4 rounded-xl border-2 text-left transition-all min-h-[52px]",
//                   formData.programmeType === option
//                     ? "border-purple-500 bg-purple-600/20 text-white"
//                     : "border-slate-800 text-slate-400 hover:border-slate-700",
//                 )}
//               >
//                 <div className="font-black text-sm">{option}</div>
//               </button>
//             ),
//           )}
//         </div>
//         {errors.programmeType && touched?.programmeType && (
//           <p className="text-xs text-red-400 mt-1 error-message">
//             {errors.programmeType}
//           </p>
//         )}
//       </div>

//       {/* Programme of Study */}
//       <div className="space-y-1.5">
//         <label className="text-xs font-black uppercase tracking-wider text-slate-400">
//           2. Preferred programme of study{" "}
//           <span className="text-amber-500">*</span>
//         </label>
//         <div className="flex flex-wrap gap-2">
//           {[
//             "Tahfeedh",
//             "Tahfeedh & Murāja‘ah",
//             "Murāja‘ah",
//             "Tajweed",
//             "Qirā’aat",
//             "Arabic & Islamic Studies",
//             "General Madrasah",
//             "Other",
//           ].map((option) => (
//             <button
//               key={option}
//               type="button"
//               onClick={() => handleArrayChange?.("programmeOfStudy", option)}
//               className={cn(
//                 "px-4 py-2 rounded-full text-xs font-black transition-all min-h-[40px]",
//                 formData.programmeOfStudy.includes(option)
//                   ? "bg-purple-600/40 text-purple-300 border border-purple-500"
//                   : "bg-slate-800/50 text-slate-400 border border-slate-800 hover:border-slate-700",
//               )}
//             >
//               {option}
//             </button>
//           ))}
//         </div>
//         {errors.programmeOfStudy && touched?.programmeOfStudy && (
//           <p className="text-xs text-red-400 mt-1 error-message">
//             {errors.programmeOfStudy}
//           </p>
//         )}
//       </div>

//       {/* Enrolment Period & Resumption Date */}
//       <div className="grid sm:grid-cols-2 gap-4">
//         <div className="space-y-1.5">
//           <label className="text-xs font-black uppercase tracking-wider text-slate-400">
//             3. Intended period of enrolment{" "}
//             <span className="text-amber-500">*</span>
//           </label>
//           <select
//             name="enrolmentPeriod"
//             value={formData.enrolmentPeriod}
//             onChange={handleChange}
//             onBlur={handleChange as any}
//             className={cn(
//               "w-full h-12 px-4 rounded-xl border bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all",
//               errors.enrolmentPeriod && touched?.enrolmentPeriod
//                 ? "border-red-500"
//                 : "border-slate-800",
//             )}
//           >
//             <option value="">Select period</option>
//             <option value="Full Academic Session">Full Academic Session</option>
//             <option value="One Term">One Term</option>
//             <option value="Several Months">Several Months</option>
//             <option value="Short-Term">Short-Term</option>
//             <option value="Other">Other</option>
//           </select>
//           {errors.enrolmentPeriod && touched?.enrolmentPeriod && (
//             <p className="text-xs text-red-400 mt-1 error-message">
//               {errors.enrolmentPeriod}
//             </p>
//           )}
//         </div>
//         <div className="space-y-1.5">
//           <label className="text-xs font-black uppercase tracking-wider text-slate-400">
//             4. Preferred date of resumption{" "}
//             <span className="text-amber-500">*</span>
//           </label>
//           <input
//             type="date"
//             name="resumptionDate"
//             value={formData.resumptionDate}
//             onChange={handleChange}
//             onBlur={handleChange as any}
//             className={cn(
//               "w-full h-12 px-4 rounded-xl border bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all",
//               errors.resumptionDate && touched?.resumptionDate
//                 ? "border-red-500"
//                 : "border-slate-800",
//             )}
//           />
//           {errors.resumptionDate && touched?.resumptionDate && (
//             <p className="text-xs text-red-400 mt-1 error-message">
//               {errors.resumptionDate}
//             </p>
//           )}
//         </div>
//       </div>

//       {/* Weekend Days */}
//       <div className="space-y-1.5">
//         <label className="text-xs font-black uppercase tracking-wider text-slate-400">
//           5. If Part-Time / Weekend Boarding, which days will the student
//           normally stay?
//         </label>
//         <div className="flex flex-wrap gap-2">
//           {["Friday", "Saturday", "Sunday", "Other"].map((option) => (
//             <button
//               key={option}
//               type="button"
//               onClick={() => handleArrayChange?.("weekendDays", option)}
//               className={cn(
//                 "px-4 py-2 rounded-full text-xs font-black transition-all min-h-[40px]",
//                 formData.weekendDays.includes(option)
//                   ? "bg-amber-600/40 text-amber-300 border border-amber-500"
//                   : "bg-slate-800/50 text-slate-400 border border-slate-800 hover:border-slate-700",
//               )}
//             >
//               {option}
//             </button>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }














// app/(marketing)/onsite/admissions/components/sections/SectionProgramme.tsx
"use client";

import { cn } from "@/lib/utils";
import { SectionProps } from "../../types";
import { motion } from "framer-motion";

export function SectionProgramme({
  formData,
  handleChange,
  handleArrayChange,
  errors,
  touched,
}: SectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-5"
    >
      {/* Programme Type */}
      <div className="space-y-2">
        <label className="text-xs font-black uppercase tracking-wider text-muted-foreground">
          1. Which programme are you applying for? <span className="text-amber-500">*</span>
        </label>
        <div className="grid sm:grid-cols-2 gap-3">
          {["Full-Time Boarding", "Part-Time / Weekend Boarding"].map((option) => (
            <motion.button
              key={option}
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() =>
                handleChange({ target: { name: "programmeType", value: option } } as any)
              }
              className={cn(
                "p-4 rounded-xl border-2 text-left transition-all duration-300 min-h-[60px]",
                formData.programmeType === option
                  ? "border-purple-500 bg-purple-600/20 dark:bg-purple-600/20 text-foreground shadow-lg shadow-purple-500/20"
                  : "border-border bg-card/50 text-muted-foreground hover:border-purple-300 dark:hover:border-purple-600/30"
              )}
            >
              <div className="font-black text-sm">{option}</div>
            </motion.button>
          ))}
        </div>
        {errors.programmeType && touched?.programmeType && (
          <p className="text-xs text-red-500 mt-1 error-message">{errors.programmeType}</p>
        )}
      </div>

      {/* Programme of Study */}
      <div className="space-y-2">
        <label className="text-xs font-black uppercase tracking-wider text-muted-foreground">
          2. Preferred programme of study <span className="text-amber-500">*</span>
        </label>
        <div className="flex flex-wrap gap-2">
          {["Tahfeedh", "Tahfeedh & Murāja‘ah", "Murāja‘ah", "Tajweed", "Qirā’aat", "Arabic & Islamic Studies", "General Madrasah", "Other"].map((option) => (
            <motion.button
              key={option}
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleArrayChange?.("programmeOfStudy", option)}
              className={cn(
                "px-4 py-2 rounded-full text-xs font-black transition-all duration-300 min-h-[40px]",
                formData.programmeOfStudy.includes(option)
                  ? "bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-md"
                  : "bg-card/50 text-muted-foreground border border-border hover:border-purple-300 dark:hover:border-purple-600/30"
              )}
            >
              {option}
            </motion.button>
          ))}
        </div>
        {errors.programmeOfStudy && touched?.programmeOfStudy && (
          <p className="text-xs text-red-500 mt-1 error-message">{errors.programmeOfStudy}</p>
        )}
      </div>

      {/* Enrolment Period & Resumption Date */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-xs font-black uppercase tracking-wider text-muted-foreground">
            3. Intended period of enrolment <span className="text-amber-500">*</span>
          </label>
          <select
            name="enrolmentPeriod"
            value={formData.enrolmentPeriod}
            onChange={handleChange}
            className={cn(
              "w-full h-12 px-4 rounded-xl border bg-card/50 focus:border-purple-500 dark:focus:border-purple-400 outline-none text-foreground text-sm transition-all duration-300",
              errors.enrolmentPeriod && touched?.enrolmentPeriod
                ? "border-red-500"
                : "border-border"
            )}
          >
            <option value="">Select period</option>
            <option value="Full Academic Session">Full Academic Session</option>
            <option value="One Term">One Term</option>
            <option value="Several Months">Several Months</option>
            <option value="Short-Term">Short-Term</option>
            <option value="Other">Other</option>
          </select>
          {errors.enrolmentPeriod && touched?.enrolmentPeriod && (
            <p className="text-xs text-red-500 mt-1 error-message">{errors.enrolmentPeriod}</p>
          )}
        </div>
        <div className="space-y-2">
          <label className="text-xs font-black uppercase tracking-wider text-muted-foreground">
            4. Preferred date of resumption <span className="text-amber-500">*</span>
          </label>
          <input
            type="date"
            name="resumptionDate"
            value={formData.resumptionDate}
            onChange={handleChange}
            className={cn(
              "w-full h-12 px-4 rounded-xl border bg-card/50 focus:border-purple-500 dark:focus:border-purple-400 outline-none text-foreground text-sm transition-all duration-300",
              errors.resumptionDate && touched?.resumptionDate
                ? "border-red-500"
                : "border-border"
            )}
          />
          {errors.resumptionDate && touched?.resumptionDate && (
            <p className="text-xs text-red-500 mt-1 error-message">{errors.resumptionDate}</p>
          )}
        </div>
      </div>

      {/* Weekend Days */}
      <div className="space-y-2">
        <label className="text-xs font-black uppercase tracking-wider text-muted-foreground">
          5. If Part-Time / Weekend Boarding, which days will the student normally stay?
        </label>
        <div className="flex flex-wrap gap-2">
          {["Friday", "Saturday", "Sunday", "Other"].map((option) => (
            <motion.button
              key={option}
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleArrayChange?.("weekendDays", option)}
              className={cn(
                "px-4 py-2 rounded-full text-xs font-black transition-all duration-300 min-h-[40px]",
                formData.weekendDays.includes(option)
                  ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-md"
                  : "bg-card/50 text-muted-foreground border border-border hover:border-amber-300 dark:hover:border-amber-600/30"
              )}
            >
              {option}
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
