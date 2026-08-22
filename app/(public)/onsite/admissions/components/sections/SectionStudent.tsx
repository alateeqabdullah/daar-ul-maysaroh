// // app/(marketing)/onsite/admissions/components/sections/SectionStudent.tsx
// "use client";

// import { cn } from "@/lib/utils";
// import { SectionProps } from "../../types";

// export function SectionStudent({
//   formData,
//   handleChange,
//   errors,
//   touched,
// }: SectionProps) {
//   return (
//     <div className="space-y-5">
//       {/* Full Name & Preferred Name */}
//       <div className="grid sm:grid-cols-2 gap-4">
//         <div className="space-y-1.5">
//           <label className="text-xs font-black uppercase tracking-wider text-slate-400">
//             6. Student's Full Name <span className="text-amber-500">*</span>
//           </label>
//           <input
//             name="studentFullName"
//             value={formData.studentFullName}
//             onChange={handleChange}
//             onBlur={handleChange as any}
//             className={cn(
//               "w-full h-12 px-4 rounded-xl border bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all",
//               errors.studentFullName && touched?.studentFullName
//                 ? "border-red-500"
//                 : "border-slate-800",
//             )}
//             placeholder="Enter full name"
//           />
//           {errors.studentFullName && touched?.studentFullName && (
//             <p className="text-xs text-red-400 mt-1 error-message">
//               {errors.studentFullName}
//             </p>
//           )}
//         </div>
//         <div className="space-y-1.5">
//           <label className="text-xs font-black uppercase tracking-wider text-slate-400">
//             7. Preferred Name
//           </label>
//           <input
//             name="preferredName"
//             value={formData.preferredName}
//             onChange={handleChange}
//             className="w-full h-12 px-4 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all"
//             placeholder="Preferred name"
//           />
//         </div>
//       </div>

//       {/* Gender, DOB, Age */}
//       <div className="grid sm:grid-cols-3 gap-4">
//         <div className="space-y-1.5">
//           <label className="text-xs font-black uppercase tracking-wider text-slate-400">
//             8. Gender <span className="text-amber-500">*</span>
//           </label>
//           <select
//             name="gender"
//             value={formData.gender}
//             onChange={handleChange}
//             onBlur={handleChange as any}
//             className={cn(
//               "w-full h-12 px-4 rounded-xl border bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all",
//               errors.gender && touched?.gender
//                 ? "border-red-500"
//                 : "border-slate-800",
//             )}
//           >
//             <option value="">Select</option>
//             <option value="Male">Male</option>
//             <option value="Female">Female</option>
//           </select>
//           {errors.gender && touched?.gender && (
//             <p className="text-xs text-red-400 mt-1 error-message">
//               {errors.gender}
//             </p>
//           )}
//         </div>
//         <div className="space-y-1.5">
//           <label className="text-xs font-black uppercase tracking-wider text-slate-400">
//             9. Date of Birth
//           </label>
//           <input
//             type="date"
//             name="dateOfBirth"
//             value={formData.dateOfBirth}
//             onChange={handleChange}
//             className="w-full h-12 px-4 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all"
//           />
//         </div>
//         <div className="space-y-1.5">
//           <label className="text-xs font-black uppercase tracking-wider text-slate-400">
//             10. Age <span className="text-amber-500">*</span>
//           </label>
//           <input
//             type="number"
//             name="age"
//             value={formData.age}
//             onChange={handleChange}
//             onBlur={handleChange as any}
//             className={cn(
//               "w-full h-12 px-4 rounded-xl border bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all",
//               errors.age && touched?.age
//                 ? "border-red-500"
//                 : "border-slate-800",
//             )}
//             placeholder="Age"
//           />
//           {errors.age && touched?.age && (
//             <p className="text-xs text-red-400 mt-1 error-message">
//               {errors.age}
//             </p>
//           )}
//         </div>
//       </div>

//       {/* Nationality & Country of Residence */}
//       <div className="grid sm:grid-cols-2 gap-4">
//         <div className="space-y-1.5">
//           <label className="text-xs font-black uppercase tracking-wider text-slate-400">
//             11. Nationality
//           </label>
//           <input
//             name="nationality"
//             value={formData.nationality}
//             onChange={handleChange}
//             className="w-full h-12 px-4 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all"
//             placeholder="Nationality"
//           />
//         </div>
//         <div className="space-y-1.5">
//           <label className="text-xs font-black uppercase tracking-wider text-slate-400">
//             12. Country of Current Residence{" "}
//             <span className="text-amber-500">*</span>
//           </label>
//           <input
//             name="countryOfResidence"
//             value={formData.countryOfResidence}
//             onChange={handleChange}
//             onBlur={handleChange as any}
//             className={cn(
//               "w-full h-12 px-4 rounded-xl border bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all",
//               errors.countryOfResidence && touched?.countryOfResidence
//                 ? "border-red-500"
//                 : "border-slate-800",
//             )}
//             placeholder="Country of residence"
//           />
//           {errors.countryOfResidence && touched?.countryOfResidence && (
//             <p className="text-xs text-red-400 mt-1 error-message">
//               {errors.countryOfResidence}
//             </p>
//           )}
//         </div>
//       </div>

//       {/* State of Origin & Residential Address */}
//       <div className="grid sm:grid-cols-2 gap-4">
//         <div className="space-y-1.5">
//           <label className="text-xs font-black uppercase tracking-wider text-slate-400">
//             13. State of Origin
//           </label>
//           <input
//             name="stateOfOrigin"
//             value={formData.stateOfOrigin}
//             onChange={handleChange}
//             className="w-full h-12 px-4 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all"
//             placeholder="State of origin"
//           />
//         </div>
//         <div className="space-y-1.5">
//           <label className="text-xs font-black uppercase tracking-wider text-slate-400">
//             14. Current Residential Address
//           </label>
//           <input
//             name="residentialAddress"
//             value={formData.residentialAddress}
//             onChange={handleChange}
//             className="w-full h-12 px-4 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all"
//             placeholder="Residential address"
//           />
//         </div>
//       </div>

//       {/* Lived Away From Home */}
//       <div className="space-y-3">
//         <div className="space-y-1.5">
//           <label className="text-xs font-black uppercase tracking-wider text-slate-400">
//             15. Has the student previously lived or studied away from home?
//           </label>
//           <div className="flex gap-4">
//             {["Yes", "No"].map((option) => (
//               <button
//                 key={option}
//                 type="button"
//                 onClick={() =>
//                   handleChange({
//                     target: { name: "livedAwayFromHome", value: option },
//                   } as any)
//                 }
//                 className={cn(
//                   "px-6 py-2 rounded-full text-xs font-black transition-all min-h-[40px]",
//                   formData.livedAwayFromHome === option
//                     ? "bg-purple-600/40 text-purple-300 border border-purple-500"
//                     : "bg-slate-800/50 text-slate-400 border border-slate-800 hover:border-slate-700",
//                 )}
//               >
//                 {option}
//               </button>
//             ))}
//           </div>
//         </div>
//         {formData.livedAwayFromHome === "Yes" && (
//           <div className="space-y-1.5 pl-4 border-l-2 border-purple-500/30">
//             <label className="text-xs font-black uppercase tracking-wider text-slate-400">
//               Please briefly explain:
//             </label>
//             <textarea
//               name="livedAwayFromHomeDetails"
//               value={formData.livedAwayFromHomeDetails}
//               onChange={handleChange}
//               rows={2}
//               className="w-full p-3 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all resize-none"
//               placeholder="Brief explanation..."
//             />
//           </div>
//         )}
//       </div>

//       {/* Boarded Before */}
//       <div className="space-y-3">
//         <div className="space-y-1.5">
//           <label className="text-xs font-black uppercase tracking-wider text-slate-400">
//             16. Has the student boarded in a Madrasah before?
//           </label>
//           <div className="flex gap-4">
//             {["Yes", "No"].map((option) => (
//               <button
//                 key={option}
//                 type="button"
//                 onClick={() =>
//                   handleChange({
//                     target: { name: "boardedBefore", value: option },
//                   } as any)
//                 }
//                 className={cn(
//                   "px-6 py-2 rounded-full text-xs font-black transition-all min-h-[40px]",
//                   formData.boardedBefore === option
//                     ? "bg-purple-600/40 text-purple-300 border border-purple-500"
//                     : "bg-slate-800/50 text-slate-400 border border-slate-800 hover:border-slate-700",
//                 )}
//               >
//                 {option}
//               </button>
//             ))}
//           </div>
//         </div>
//         {formData.boardedBefore === "Yes" && (
//           <div className="pl-4 border-l-2 border-purple-500/30 space-y-3">
//             <div className="grid sm:grid-cols-2 gap-4">
//               <div className="space-y-1.5">
//                 <label className="text-xs font-black uppercase tracking-wider text-slate-400">
//                   Name of previous Madrasah
//                 </label>
//                 <input
//                   name="previousMadrasah"
//                   value={formData.previousMadrasah}
//                   onChange={handleChange}
//                   className="w-full h-12 px-4 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all"
//                   placeholder="Madrasah name"
//                 />
//               </div>
//               <div className="space-y-1.5">
//                 <label className="text-xs font-black uppercase tracking-wider text-slate-400">
//                   Location
//                 </label>
//                 <input
//                   name="previousMadrasahLocation"
//                   value={formData.previousMadrasahLocation}
//                   onChange={handleChange}
//                   className="w-full h-12 px-4 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all"
//                   placeholder="Location"
//                 />
//               </div>
//             </div>
//             <div className="grid sm:grid-cols-2 gap-4">
//               <div className="space-y-1.5">
//                 <label className="text-xs font-black uppercase tracking-wider text-slate-400">
//                   Duration of boarding
//                 </label>
//                 <input
//                   name="previousMadrasahDuration"
//                   value={formData.previousMadrasahDuration}
//                   onChange={handleChange}
//                   className="w-full h-12 px-4 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all"
//                   placeholder="e.g., 1 year"
//                 />
//               </div>
//               <div className="space-y-1.5">
//                 <label className="text-xs font-black uppercase tracking-wider text-slate-400">
//                   Reason for leaving
//                 </label>
//                 <input
//                   name="previousMadrasahReason"
//                   value={formData.previousMadrasahReason}
//                   onChange={handleChange}
//                   className="w-full h-12 px-4 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all"
//                   placeholder="Reason"
//                 />
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }




// app/(marketing)/onsite/admissions/components/sections/SectionStudent.tsx
"use client";

import { cn } from "@/lib/utils";
import { SectionProps } from "../../types";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Globe,
  Home,
  Users,
  School,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";

export function SectionStudent({
  formData,
  handleChange,
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
          <User className="w-5 h-5 text-purple-600 dark:text-purple-400 shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-medium text-foreground">Student Information</p>
            <p className="text-[10px] text-muted-foreground">
              Please provide accurate information about the student
            </p>
          </div>
        </div>
      </div>

      {/* Full Name & Preferred Name */}
      <div className="grid sm:grid-cols-2 gap-4">
        <motion.div variants={fadeIn} className="space-y-2">
          <label className="text-xs font-black uppercase tracking-wider text-muted-foreground">
            6. Student's Full Name <span className="text-amber-500">*</span>
          </label>
          <div className="relative">
            <User className="absolute left-3 top-3 w-4 h-4 text-purple-500" />
            <input
              name="studentFullName"
              value={formData.studentFullName}
              onChange={handleChange}
              onBlur={handleChange as any}
              className={cn(
                "w-full h-12 pl-10 pr-4 rounded-xl border bg-card/50 focus:border-purple-500 dark:focus:border-purple-400 outline-none text-foreground text-sm transition-all duration-300",
                errors.studentFullName && touched?.studentFullName
                  ? "border-red-500"
                  : "border-border",
              )}
              placeholder="Enter full name"
            />
          </div>
          {errors.studentFullName && touched?.studentFullName && (
            <p className="text-xs text-red-500 mt-1 error-message flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              {errors.studentFullName}
            </p>
          )}
        </motion.div>

        <motion.div variants={fadeIn} className="space-y-2">
          <label className="text-xs font-black uppercase tracking-wider text-muted-foreground">
            7. Preferred Name
          </label>
          <div className="relative">
            <User className="absolute left-3 top-3 w-4 h-4 text-amber-500" />
            <input
              name="preferredName"
              value={formData.preferredName}
              onChange={handleChange}
              className="w-full h-12 pl-10 pr-4 rounded-xl border border-border bg-card/50 focus:border-purple-500 dark:focus:border-purple-400 outline-none text-foreground text-sm transition-all duration-300"
              placeholder="Preferred name"
            />
          </div>
        </motion.div>
      </div>

      {/* Gender, DOB, Age */}
      <div className="grid sm:grid-cols-3 gap-4">
        <motion.div variants={fadeIn} className="space-y-2">
          <label className="text-xs font-black uppercase tracking-wider text-muted-foreground">
            8. Gender <span className="text-amber-500">*</span>
          </label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            onBlur={handleChange as any}
            className={cn(
              "w-full h-12 px-4 rounded-xl border bg-card/50 focus:border-purple-500 dark:focus:border-purple-400 outline-none text-foreground text-sm transition-all duration-300",
              errors.gender && touched?.gender
                ? "border-red-500"
                : "border-border",
            )}
          >
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          {errors.gender && touched?.gender && (
            <p className="text-xs text-red-500 mt-1 error-message flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              {errors.gender}
            </p>
          )}
        </motion.div>

        <motion.div variants={fadeIn} className="space-y-2">
          <label className="text-xs font-black uppercase tracking-wider text-muted-foreground">
            9. Date of Birth
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-3 w-4 h-4 text-purple-500" />
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              className="w-full h-12 pl-10 pr-4 rounded-xl border border-border bg-card/50 focus:border-purple-500 dark:focus:border-purple-400 outline-none text-foreground text-sm transition-all duration-300"
            />
          </div>
        </motion.div>

        <motion.div variants={fadeIn} className="space-y-2">
          <label className="text-xs font-black uppercase tracking-wider text-muted-foreground">
            10. Age <span className="text-amber-500">*</span>
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-3 w-4 h-4 text-amber-500" />
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              onBlur={handleChange as any}
              className={cn(
                "w-full h-12 pl-10 pr-4 rounded-xl border bg-card/50 focus:border-purple-500 dark:focus:border-purple-400 outline-none text-foreground text-sm transition-all duration-300",
                errors.age && touched?.age
                  ? "border-red-500"
                  : "border-border",
              )}
              placeholder="Age"
            />
          </div>
          {errors.age && touched?.age && (
            <p className="text-xs text-red-500 mt-1 error-message flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              {errors.age}
            </p>
          )}
        </motion.div>
      </div>

      {/* Nationality & Country of Residence */}
      <div className="grid sm:grid-cols-2 gap-4">
        <motion.div variants={fadeIn} className="space-y-2">
          <label className="text-xs font-black uppercase tracking-wider text-muted-foreground">
            11. Nationality
          </label>
          <div className="relative">
            <Globe className="absolute left-3 top-3 w-4 h-4 text-purple-500" />
            <input
              name="nationality"
              value={formData.nationality}
              onChange={handleChange}
              className="w-full h-12 pl-10 pr-4 rounded-xl border border-border bg-card/50 focus:border-purple-500 dark:focus:border-purple-400 outline-none text-foreground text-sm transition-all duration-300"
              placeholder="Nationality"
            />
          </div>
        </motion.div>

        <motion.div variants={fadeIn} className="space-y-2">
          <label className="text-xs font-black uppercase tracking-wider text-muted-foreground">
            12. Country of Current Residence{" "}
            <span className="text-amber-500">*</span>
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-3 w-4 h-4 text-amber-500" />
            <input
              name="countryOfResidence"
              value={formData.countryOfResidence}
              onChange={handleChange}
              onBlur={handleChange as any}
              className={cn(
                "w-full h-12 pl-10 pr-4 rounded-xl border bg-card/50 focus:border-purple-500 dark:focus:border-purple-400 outline-none text-foreground text-sm transition-all duration-300",
                errors.countryOfResidence && touched?.countryOfResidence
                  ? "border-red-500"
                  : "border-border",
              )}
              placeholder="Country of residence"
            />
          </div>
          {errors.countryOfResidence && touched?.countryOfResidence && (
            <p className="text-xs text-red-500 mt-1 error-message flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              {errors.countryOfResidence}
            </p>
          )}
        </motion.div>
      </div>

      {/* State of Origin & Residential Address */}
      <div className="grid sm:grid-cols-2 gap-4">
        <motion.div variants={fadeIn} className="space-y-2">
          <label className="text-xs font-black uppercase tracking-wider text-muted-foreground">
            13. State of Origin
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-3 w-4 h-4 text-purple-500" />
            <input
              name="stateOfOrigin"
              value={formData.stateOfOrigin}
              onChange={handleChange}
              className="w-full h-12 pl-10 pr-4 rounded-xl border border-border bg-card/50 focus:border-purple-500 dark:focus:border-purple-400 outline-none text-foreground text-sm transition-all duration-300"
              placeholder="State of origin"
            />
          </div>
        </motion.div>

        <motion.div variants={fadeIn} className="space-y-2">
          <label className="text-xs font-black uppercase tracking-wider text-muted-foreground">
            14. Current Residential Address
          </label>
          <div className="relative">
            <Home className="absolute left-3 top-3 w-4 h-4 text-amber-500" />
            <input
              name="residentialAddress"
              value={formData.residentialAddress}
              onChange={handleChange}
              className="w-full h-12 pl-10 pr-4 rounded-xl border border-border bg-card/50 focus:border-purple-500 dark:focus:border-purple-400 outline-none text-foreground text-sm transition-all duration-300"
              placeholder="Residential address"
            />
          </div>
        </motion.div>
      </div>

      {/* Lived Away From Home */}
      <motion.div variants={fadeIn} className="space-y-3">
        <div className="space-y-2">
          <label className="text-xs font-black uppercase tracking-wider text-muted-foreground">
            15. Has the student previously lived or studied away from home?
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
                    target: { name: "livedAwayFromHome", value: option },
                  } as any)
                }
                className={cn(
                  "px-6 py-2.5 rounded-full text-xs font-black transition-all duration-300 min-h-[44px]",
                  formData.livedAwayFromHome === option
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
        </div>
        {formData.livedAwayFromHome === "Yes" && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ duration: 0.3 }}
            className="space-y-2 pl-4 border-l-2 border-amber-500/30"
          >
            <label className="text-xs font-black uppercase tracking-wider text-muted-foreground">
              Please briefly explain:
            </label>
            <textarea
              name="livedAwayFromHomeDetails"
              value={formData.livedAwayFromHomeDetails}
              onChange={handleChange}
              rows={2}
              className="w-full p-3 rounded-xl border border-amber-300 dark:border-amber-800/30 bg-card/50 focus:border-purple-500 dark:focus:border-purple-400 outline-none text-foreground text-sm transition-all duration-300 resize-none"
              placeholder="Brief explanation..."
            />
          </motion.div>
        )}
      </motion.div>

      {/* Boarded Before */}
      <motion.div variants={fadeIn} className="space-y-3">
        <div className="space-y-2">
          <label className="text-xs font-black uppercase tracking-wider text-muted-foreground">
            16. Has the student boarded in a Madrasah before?
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
                    target: { name: "boardedBefore", value: option },
                  } as any)
                }
                className={cn(
                  "px-6 py-2.5 rounded-full text-xs font-black transition-all duration-300 min-h-[44px]",
                  formData.boardedBefore === option
                    ? option === "Yes"
                      ? "bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg shadow-purple-500/30"
                      : "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-500/30"
                    : "bg-card/50 text-muted-foreground border border-border hover:border-purple-300 dark:hover:border-purple-600/30 hover:bg-muted/30",
                )}
              >
                {option}
              </motion.button>
            ))}
          </div>
        </div>
        {formData.boardedBefore === "Yes" && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ duration: 0.3 }}
            className="pl-4 border-l-2 border-purple-500/30 space-y-3"
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-wider text-muted-foreground">
                  Name of previous Madrasah
                </label>
                <div className="relative">
                  <School className="absolute left-3 top-3 w-4 h-4 text-purple-500" />
                  <input
                    name="previousMadrasah"
                    value={formData.previousMadrasah}
                    onChange={handleChange}
                    className="w-full h-12 pl-10 pr-4 rounded-xl border border-border bg-card/50 focus:border-purple-500 dark:focus:border-purple-400 outline-none text-foreground text-sm transition-all duration-300"
                    placeholder="Madrasah name"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-wider text-muted-foreground">
                  Location
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 w-4 h-4 text-amber-500" />
                  <input
                    name="previousMadrasahLocation"
                    value={formData.previousMadrasahLocation}
                    onChange={handleChange}
                    className="w-full h-12 pl-10 pr-4 rounded-xl border border-border bg-card/50 focus:border-purple-500 dark:focus:border-purple-400 outline-none text-foreground text-sm transition-all duration-300"
                    placeholder="Location"
                  />
                </div>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-wider text-muted-foreground">
                  Duration of boarding
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 w-4 h-4 text-purple-500" />
                  <input
                    name="previousMadrasahDuration"
                    value={formData.previousMadrasahDuration}
                    onChange={handleChange}
                    className="w-full h-12 pl-10 pr-4 rounded-xl border border-border bg-card/50 focus:border-purple-500 dark:focus:border-purple-400 outline-none text-foreground text-sm transition-all duration-300"
                    placeholder="e.g., 1 year"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-wider text-muted-foreground">
                  Reason for leaving
                </label>
                <div className="relative">
                  <AlertCircle className="absolute left-3 top-3 w-4 h-4 text-amber-500" />
                  <input
                    name="previousMadrasahReason"
                    value={formData.previousMadrasahReason}
                    onChange={handleChange}
                    className="w-full h-12 pl-10 pr-4 rounded-xl border border-border bg-card/50 focus:border-purple-500 dark:focus:border-purple-400 outline-none text-foreground text-sm transition-all duration-300"
                    placeholder="Reason"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Student Summary */}
      <motion.div
        variants={fadeIn}
        className="mt-4 p-4 rounded-xl bg-gradient-to-r from-purple-50/30 to-amber-50/30 dark:from-purple-600/10 dark:to-amber-500/10 border border-purple-200 dark:border-purple-800/30"
      >
        <div className="flex items-start gap-3">
          <Users className="w-5 h-5 text-purple-600 dark:text-purple-400 shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-medium text-foreground">Student Profile</p>
            <p className="text-[10px] text-muted-foreground">
              {formData.studentFullName ? `${formData.studentFullName} • ` : ""}
              {formData.age ? `${formData.age} years old • ` : ""}
              {formData.gender ? `${formData.gender}` : ""}
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}