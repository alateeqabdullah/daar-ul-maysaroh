// app/(marketing)/onsite/admissions/components/sections/SectionProgramme.tsx
"use client";

import { cn } from "@/lib/utils";
import { SectionProps } from "../../types";
import { motion } from "framer-motion";
import {
  GraduationCap,
  Calendar,
  Clock,
  Users,
  CheckCircle2,
  Building2,
  Home,
  Moon,
  Sun,
} from "lucide-react";

export function SectionProgramme({
  formData,
  handleChange,
  handleArrayChange,
  errors,
  touched,
}: SectionProps) {
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
          <GraduationCap className="w-5 h-5 text-purple-600 dark:text-purple-400 shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-medium text-foreground">
              Programme Selection
            </p>
            <p className="text-[10px] text-muted-foreground">
              Choose the programme that best fits your learning goals and
              lifestyle
            </p>
          </div>
        </div>
      </div>

      {/* Question 1 - Programme Type */}
      <motion.div variants={fadeIn} className="space-y-2">
        <label className="text-xs font-black uppercase tracking-wider text-muted-foreground">
          1. Which programme are you applying for?{" "}
          <span className="text-amber-500">*</span>
        </label>
        <div className="grid sm:grid-cols-2 gap-3">
          {[
            {
              value: "Full-Time Boarding",
              icon: Home,
              desc: "Full immersion on campus",
            },
            {
              value: "Part-Time / Weekend Boarding",
              icon: Moon,
              desc: "Weekend intensive",
            },
          ].map((option) => {
            const Icon = option.icon;
            const isSelected = formData.programmeType === option.value;
            return (
              <motion.button
                key={option.value}
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() =>
                  handleChange({
                    target: { name: "programmeType", value: option.value },
                  } as any)
                }
                className={cn(
                  "p-4 rounded-xl border-2 text-left transition-all duration-300 min-h-[60px] group",
                  isSelected
                    ? "border-purple-500 bg-purple-600/20 dark:bg-purple-600/20 text-foreground shadow-lg shadow-purple-500/20"
                    : "border-border bg-card/50 text-muted-foreground hover:border-purple-300 dark:hover:border-purple-600/30",
                )}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={cn(
                      "w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300",
                      isSelected
                        ? "bg-gradient-to-r from-purple-600 to-amber-500 text-white shadow-md"
                        : "bg-muted/30 text-muted-foreground",
                    )}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-black text-sm">{option.value}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">
                      {option.desc}
                    </div>
                  </div>
                </div>
                {isSelected && (
                  <CheckCircle2 className="absolute top-3 right-3 w-4 h-4 text-purple-500" />
                )}
              </motion.button>
            );
          })}
        </div>
        {errors.programmeType && touched?.programmeType && (
          <p className="text-xs text-red-500 mt-1 error-message">
            {errors.programmeType}
          </p>
        )}
      </motion.div>

      {/* Question 2 - Programme of Study */}
      <motion.div variants={fadeIn} className="space-y-2">
        <label className="text-xs font-black uppercase tracking-wider text-muted-foreground">
          2. Preferred programme of study{" "}
          <span className="text-amber-500">*</span>
        </label>
        <div className="flex flex-wrap gap-2">
          {[
            "Tahfeedh",
            "Tahfeedh & Murāja‘ah",
            "Murāja‘ah",
            "Tajweed",
            "Qirā’aat",
            "Arabic & Islamic Studies",
            "General Madrasah",
            "Other",
          ].map((option) => (
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
                  : "bg-card/50 text-muted-foreground border border-border hover:border-purple-300 dark:hover:border-purple-600/30",
              )}
            >
              {option}
            </motion.button>
          ))}
        </div>
        {errors.programmeOfStudy && touched?.programmeOfStudy && (
          <p className="text-xs text-red-500 mt-1 error-message">
            {errors.programmeOfStudy}
          </p>
        )}
      </motion.div>

      {/* Question 3 & 4 - Enrolment Period & Resumption Date */}
      <div className="grid sm:grid-cols-2 gap-4">
        <motion.div variants={fadeIn} className="space-y-2">
          <label className="text-xs font-black uppercase tracking-wider text-muted-foreground">
            3. Intended period of enrolment{" "}
            <span className="text-amber-500">*</span>
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-500" />
            <select
              name="enrolmentPeriod"
              value={formData.enrolmentPeriod}
              onChange={handleChange}
              className={cn(
                "w-full h-12 pl-10 pr-4 rounded-xl border bg-card/50 focus:border-purple-500 dark:focus:border-purple-400 outline-none text-foreground text-sm transition-all duration-300 appearance-none",
                errors.enrolmentPeriod && touched?.enrolmentPeriod
                  ? "border-red-500"
                  : "border-border",
              )}
            >
              <option value="">Select period</option>
              <option value="Full Academic Session">
                Full Academic Session
              </option>
              <option value="One Term">One Term</option>
              <option value="Several Months">Several Months</option>
              <option value="Short-Term">Short-Term</option>
              <option value="Other">Other</option>
            </select>
          </div>
          {errors.enrolmentPeriod && touched?.enrolmentPeriod && (
            <p className="text-xs text-red-500 mt-1 error-message">
              {errors.enrolmentPeriod}
            </p>
          )}
        </motion.div>

        <motion.div variants={fadeIn} className="space-y-2">
          <label className="text-xs font-black uppercase tracking-wider text-muted-foreground">
            4. Preferred date of resumption{" "}
            <span className="text-amber-500">*</span>
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-500" />
            <input
              type="date"
              name="resumptionDate"
              value={formData.resumptionDate}
              onChange={handleChange}
              className={cn(
                "w-full h-12 pl-10 pr-4 rounded-xl border bg-card/50 focus:border-purple-500 dark:focus:border-purple-400 outline-none text-foreground text-sm transition-all duration-300",
                errors.resumptionDate && touched?.resumptionDate
                  ? "border-red-500"
                  : "border-border",
              )}
            />
          </div>
          {errors.resumptionDate && touched?.resumptionDate && (
            <p className="text-xs text-red-500 mt-1 error-message">
              {errors.resumptionDate}
            </p>
          )}
        </motion.div>
      </div>

      {/* Question 5 - Weekend Days */}
      <motion.div variants={fadeIn} className="space-y-2">
        <label className="text-xs font-black uppercase tracking-wider text-muted-foreground">
          5. If Part-Time / Weekend Boarding, which days will the student
          normally stay?
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
                  : "bg-card/50 text-muted-foreground border border-border hover:border-amber-300 dark:hover:border-amber-600/30",
              )}
            >
              {option}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Selection Summary */}
      {(formData.programmeType || formData.programmeOfStudy.length > 0) && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-4 rounded-xl bg-gradient-to-r from-purple-50/30 to-amber-50/30 dark:from-purple-600/10 dark:to-amber-500/10 border border-purple-200 dark:border-purple-800/30"
        >
          <div className="flex items-start gap-3">
            <Users className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-medium text-foreground">
                Your Selection
              </p>
              <div className="flex flex-wrap gap-2 mt-1">
                {formData.programmeType && (
                  <span className="px-2 py-0.5 rounded-full bg-purple-100 dark:bg-purple-600/20 text-purple-700 dark:text-purple-400 text-[8px] font-black">
                    {formData.programmeType}
                  </span>
                )}
                {formData.programmeOfStudy.map((program: string, i: number) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-600/20 text-amber-700 dark:text-amber-400 text-[8px] font-black"
                  >
                    {program}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

// // app/(marketing)/onsite/admissions/components/sections/SectionProgramme.tsx
// "use client";

// import { cn } from "@/lib/utils";
// import { SectionProps } from "../../types";
// import { motion } from "framer-motion";

// export function SectionProgramme({
//   formData,
//   handleChange,
//   handleArrayChange,
//   errors,
//   touched,
// }: SectionProps) {
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 10 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.3 }}
//       className="space-y-5"
//     >
//       {/* Programme Type */}
//       <div className="space-y-2">
//         <label className="text-xs font-black uppercase tracking-wider text-muted-foreground">
//           1. Which programme are you applying for? <span className="text-amber-500">*</span>
//         </label>
//         <div className="grid sm:grid-cols-2 gap-3">
//           {["Full-Time Boarding", "Part-Time / Weekend Boarding"].map((option) => (
//             <motion.button
//               key={option}
//               type="button"
//               whileHover={{ scale: 1.02 }}
//               whileTap={{ scale: 0.98 }}
//               onClick={() =>
//                 handleChange({ target: { name: "programmeType", value: option } } as any)
//               }
//               className={cn(
//                 "p-4 rounded-xl border-2 text-left transition-all duration-300 min-h-[60px]",
//                 formData.programmeType === option
//                   ? "border-purple-500 bg-purple-600/20 dark:bg-purple-600/20 text-foreground shadow-lg shadow-purple-500/20"
//                   : "border-border bg-card/50 text-muted-foreground hover:border-purple-300 dark:hover:border-purple-600/30"
//               )}
//             >
//               <div className="font-black text-sm">{option}</div>
//             </motion.button>
//           ))}
//         </div>
//         {errors.programmeType && touched?.programmeType && (
//           <p className="text-xs text-red-500 mt-1 error-message">{errors.programmeType}</p>
//         )}
//       </div>

//       {/* Programme of Study */}
//       <div className="space-y-2">
//         <label className="text-xs font-black uppercase tracking-wider text-muted-foreground">
//           2. Preferred programme of study <span className="text-amber-500">*</span>
//         </label>
//         <div className="flex flex-wrap gap-2">
//           {["Tahfeedh", "Tahfeedh & Murāja‘ah", "Murāja‘ah", "Tajweed", "Qirā’aat", "Arabic & Islamic Studies", "General Madrasah", "Other"].map((option) => (
//             <motion.button
//               key={option}
//               type="button"
//               whileHover={{ scale: 1.02 }}
//               whileTap={{ scale: 0.98 }}
//               onClick={() => handleArrayChange?.("programmeOfStudy", option)}
//               className={cn(
//                 "px-4 py-2 rounded-full text-xs font-black transition-all duration-300 min-h-[40px]",
//                 formData.programmeOfStudy.includes(option)
//                   ? "bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-md"
//                   : "bg-card/50 text-muted-foreground border border-border hover:border-purple-300 dark:hover:border-purple-600/30"
//               )}
//             >
//               {option}
//             </motion.button>
//           ))}
//         </div>
//         {errors.programmeOfStudy && touched?.programmeOfStudy && (
//           <p className="text-xs text-red-500 mt-1 error-message">{errors.programmeOfStudy}</p>
//         )}
//       </div>

//       {/* Enrolment Period & Resumption Date */}
//       <div className="grid sm:grid-cols-2 gap-4">
//         <div className="space-y-2">
//           <label className="text-xs font-black uppercase tracking-wider text-muted-foreground">
//             3. Intended period of enrolment <span className="text-amber-500">*</span>
//           </label>
//           <select
//             name="enrolmentPeriod"
//             value={formData.enrolmentPeriod}
//             onChange={handleChange}
//             className={cn(
//               "w-full h-12 px-4 rounded-xl border bg-card/50 focus:border-purple-500 dark:focus:border-purple-400 outline-none text-foreground text-sm transition-all duration-300",
//               errors.enrolmentPeriod && touched?.enrolmentPeriod
//                 ? "border-red-500"
//                 : "border-border"
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
//             <p className="text-xs text-red-500 mt-1 error-message">{errors.enrolmentPeriod}</p>
//           )}
//         </div>
//         <div className="space-y-2">
//           <label className="text-xs font-black uppercase tracking-wider text-muted-foreground">
//             4. Preferred date of resumption <span className="text-amber-500">*</span>
//           </label>
//           <input
//             type="date"
//             name="resumptionDate"
//             value={formData.resumptionDate}
//             onChange={handleChange}
//             className={cn(
//               "w-full h-12 px-4 rounded-xl border bg-card/50 focus:border-purple-500 dark:focus:border-purple-400 outline-none text-foreground text-sm transition-all duration-300",
//               errors.resumptionDate && touched?.resumptionDate
//                 ? "border-red-500"
//                 : "border-border"
//             )}
//           />
//           {errors.resumptionDate && touched?.resumptionDate && (
//             <p className="text-xs text-red-500 mt-1 error-message">{errors.resumptionDate}</p>
//           )}
//         </div>
//       </div>

//       {/* Weekend Days */}
//       <div className="space-y-2">
//         <label className="text-xs font-black uppercase tracking-wider text-muted-foreground">
//           5. If Part-Time / Weekend Boarding, which days will the student normally stay?
//         </label>
//         <div className="flex flex-wrap gap-2">
//           {["Friday", "Saturday", "Sunday", "Other"].map((option) => (
//             <motion.button
//               key={option}
//               type="button"
//               whileHover={{ scale: 1.02 }}
//               whileTap={{ scale: 0.98 }}
//               onClick={() => handleArrayChange?.("weekendDays", option)}
//               className={cn(
//                 "px-4 py-2 rounded-full text-xs font-black transition-all duration-300 min-h-[40px]",
//                 formData.weekendDays.includes(option)
//                   ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-md"
//                   : "bg-card/50 text-muted-foreground border border-border hover:border-amber-300 dark:hover:border-amber-600/30"
//               )}
//             >
//               {option}
//             </motion.button>
//           ))}
//         </div>
//       </div>
//     </motion.div>
//   );
// }
