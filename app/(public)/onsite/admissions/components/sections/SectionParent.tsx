// // app/(marketing)/onsite/admissions/components/sections/SectionParent.tsx
// "use client";

// import { cn } from "@/lib/utils";
// import { SectionProps } from "../../types";

// export function SectionParent({
//   formData,
//   handleChange,
//   errors,
//   touched,
// }: SectionProps) {
//   return (
//     <div className="space-y-5">
//       {/* Father & Mother Names */}
//       <div className="grid sm:grid-cols-2 gap-4">
//         <div className="space-y-1.5">
//           <label className="text-xs font-black uppercase tracking-wider text-slate-400">
//             17. Father's Full Name
//           </label>
//           <input
//             name="fatherName"
//             value={formData.fatherName}
//             onChange={handleChange}
//             className="w-full h-12 px-4 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all"
//             placeholder="Father's name"
//           />
//         </div>
//         <div className="space-y-1.5">
//           <label className="text-xs font-black uppercase tracking-wider text-slate-400">
//             18. Mother's Full Name
//           </label>
//           <input
//             name="motherName"
//             value={formData.motherName}
//             onChange={handleChange}
//             className="w-full h-12 px-4 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all"
//             placeholder="Mother's name"
//           />
//         </div>
//       </div>

//       {/* Guardian Name & Relationship */}
//       <div className="grid sm:grid-cols-2 gap-4">
//         <div className="space-y-1.5">
//           <label className="text-xs font-black uppercase tracking-wider text-slate-400">
//             19. Parent/Guardian submitting this application{" "}
//             <span className="text-amber-500">*</span>
//           </label>
//           <input
//             name="guardianName"
//             value={formData.guardianName}
//             onChange={handleChange}
//             onBlur={handleChange as any}
//             className={cn(
//               "w-full h-12 px-4 rounded-xl border bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all",
//               errors.guardianName && touched?.guardianName
//                 ? "border-red-500"
//                 : "border-slate-800"
//             )}
//             placeholder="Full name"
//           />
//           {errors.guardianName && touched?.guardianName && (
//             <p className="text-xs text-red-400 mt-1 error-message">{errors.guardianName}</p>
//           )}
//         </div>
//         <div className="space-y-1.5">
//           <label className="text-xs font-black uppercase tracking-wider text-slate-400">
//             20. Relationship to Student <span className="text-amber-500">*</span>
//           </label>
//           <input
//             name="guardianRelationship"
//             value={formData.guardianRelationship}
//             onChange={handleChange}
//             onBlur={handleChange as any}
//             className={cn(
//               "w-full h-12 px-4 rounded-xl border bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all",
//               errors.guardianRelationship && touched?.guardianRelationship
//                 ? "border-red-500"
//                 : "border-slate-800"
//             )}
//             placeholder="e.g., Father, Mother, Uncle"
//           />
//           {errors.guardianRelationship && touched?.guardianRelationship && (
//             <p className="text-xs text-red-400 mt-1 error-message">{errors.guardianRelationship}</p>
//           )}
//         </div>
//       </div>

//       {/* Phone & WhatsApp */}
//       <div className="grid sm:grid-cols-2 gap-4">
//         <div className="space-y-1.5">
//           <label className="text-xs font-black uppercase tracking-wider text-slate-400">
//             21. Phone Number <span className="text-amber-500">*</span>
//           </label>
//           <input
//             name="guardianPhone"
//             type="tel"
//             value={formData.guardianPhone}
//             onChange={handleChange}
//             onBlur={handleChange as any}
//             className={cn(
//               "w-full h-12 px-4 rounded-xl border bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all",
//               errors.guardianPhone && touched?.guardianPhone
//                 ? "border-red-500"
//                 : "border-slate-800"
//             )}
//             placeholder="+234 800 000 0000"
//           />
//           {errors.guardianPhone && touched?.guardianPhone && (
//             <p className="text-xs text-red-400 mt-1 error-message">{errors.guardianPhone}</p>
//           )}
//         </div>
//         <div className="space-y-1.5">
//           <label className="text-xs font-black uppercase tracking-wider text-slate-400">
//             22. WhatsApp Number
//           </label>
//           <input
//             name="guardianWhatsApp"
//             type="tel"
//             value={formData.guardianWhatsApp}
//             onChange={handleChange}
//             className="w-full h-12 px-4 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all"
//             placeholder="+234 800 000 0000"
//           />
//         </div>
//       </div>

//       {/* Email & Country */}
//       <div className="grid sm:grid-cols-2 gap-4">
//         <div className="space-y-1.5">
//           <label className="text-xs font-black uppercase tracking-wider text-slate-400">
//             23. Email Address <span className="text-amber-500">*</span>
//           </label>
//           <input
//             name="guardianEmail"
//             type="email"
//             value={formData.guardianEmail}
//             onChange={handleChange}
//             onBlur={handleChange as any}
//             className={cn(
//               "w-full h-12 px-4 rounded-xl border bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all",
//               errors.guardianEmail && touched?.guardianEmail
//                 ? "border-red-500"
//                 : "border-slate-800"
//             )}
//             placeholder="email@example.com"
//           />
//           {errors.guardianEmail && touched?.guardianEmail && (
//             <p className="text-xs text-red-400 mt-1 error-message">{errors.guardianEmail}</p>
//           )}
//         </div>
//         <div className="space-y-1.5">
//           <label className="text-xs font-black uppercase tracking-wider text-slate-400">
//             24. Country of Residence <span className="text-amber-500">*</span>
//           </label>
//           <input
//             name="guardianCountry"
//             value={formData.guardianCountry}
//             onChange={handleChange}
//             onBlur={handleChange as any}
//             className={cn(
//               "w-full h-12 px-4 rounded-xl border bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all",
//               errors.guardianCountry && touched?.guardianCountry
//                 ? "border-red-500"
//                 : "border-slate-800"
//             )}
//             placeholder="Country"
//           />
//           {errors.guardianCountry && touched?.guardianCountry && (
//             <p className="text-xs text-red-400 mt-1 error-message">{errors.guardianCountry}</p>
//           )}
//         </div>
//       </div>

//       {/* Residential Address */}
//       <div className="space-y-1.5">
//         <label className="text-xs font-black uppercase tracking-wider text-slate-400">
//           25. Residential Address
//         </label>
//         <input
//           name="guardianAddress"
//           value={formData.guardianAddress}
//           onChange={handleChange}
//           className="w-full h-12 px-4 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all"
//           placeholder="Residential address"
//         />
//       </div>

//       {/* Preferred Communication */}
//       <div className="space-y-1.5">
//         <label className="text-xs font-black uppercase tracking-wider text-slate-400">
//           26. Preferred method of communication <span className="text-amber-500">*</span>
//         </label>
//         <div className="flex flex-wrap gap-2">
//           {["WhatsApp", "Phone Call", "Email"].map((option) => (
//             <button
//               key={option}
//               type="button"
//               onClick={() =>
//                 handleChange({ target: { name: "preferredCommunication", value: option } } as any)
//               }
//               className={cn(
//                 "px-4 py-2 rounded-full text-xs font-black transition-all min-h-[40px]",
//                 formData.preferredCommunication === option
//                   ? "bg-amber-600/40 text-amber-300 border border-amber-500"
//                   : "bg-slate-800/50 text-slate-400 border border-slate-800 hover:border-slate-700"
//               )}
//             >
//               {option}
//             </button>
//           ))}
//         </div>
//         {errors.preferredCommunication && touched?.preferredCommunication && (
//           <p className="text-xs text-red-400 mt-1 error-message">
//             {errors.preferredCommunication}
//           </p>
//         )}
//       </div>

//       {/* Emergency Contact */}
//       <div className="space-y-3">
//         <div className="space-y-1.5">
//           <label className="text-xs font-black uppercase tracking-wider text-slate-400">
//             27. Is there another person we should contact regarding this student?
//           </label>
//           <div className="flex gap-4">
//             {["Yes", "No"].map((option) => (
//               <button
//                 key={option}
//                 type="button"
//                 onClick={() =>
//                   handleChange({ target: { name: "hasEmergencyContact", value: option } } as any)
//                 }
//                 className={cn(
//                   "px-6 py-2 rounded-full text-xs font-black transition-all min-h-[40px]",
//                   formData.hasEmergencyContact === option
//                     ? "bg-purple-600/40 text-purple-300 border border-purple-500"
//                     : "bg-slate-800/50 text-slate-400 border border-slate-800 hover:border-slate-700"
//                 )}
//               >
//                 {option}
//               </button>
//             ))}
//           </div>
//         </div>
//         {formData.hasEmergencyContact === "Yes" && (
//           <div className="pl-4 border-l-2 border-purple-500/30 space-y-3">
//             <div className="grid sm:grid-cols-2 gap-4">
//               <div className="space-y-1.5">
//                 <label className="text-xs font-black uppercase tracking-wider text-slate-400">
//                   Full Name
//                 </label>
//                 <input
//                   name="emergencyContactName"
//                   value={formData.emergencyContactName}
//                   onChange={handleChange}
//                   onBlur={handleChange as any}
//                   className={cn(
//                     "w-full h-12 px-4 rounded-xl border bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all",
//                     errors.emergencyContactName && touched?.emergencyContactName
//                       ? "border-red-500"
//                       : "border-slate-800"
//                   )}
//                   placeholder="Full name"
//                 />
//                 {errors.emergencyContactName && touched?.emergencyContactName && (
//                   <p className="text-xs text-red-400 mt-1 error-message">
//                     {errors.emergencyContactName}
//                   </p>
//                 )}
//               </div>
//               <div className="space-y-1.5">
//                 <label className="text-xs font-black uppercase tracking-wider text-slate-400">
//                   Relationship
//                 </label>
//                 <input
//                   name="emergencyContactRelationship"
//                   value={formData.emergencyContactRelationship}
//                   onChange={handleChange}
//                   className="w-full h-12 px-4 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all"
//                   placeholder="Relationship"
//                 />
//               </div>
//             </div>
//             <div className="grid sm:grid-cols-2 gap-4">
//               <div className="space-y-1.5">
//                 <label className="text-xs font-black uppercase tracking-wider text-slate-400">
//                   Phone
//                 </label>
//                 <input
//                   name="emergencyContactPhone"
//                   value={formData.emergencyContactPhone}
//                   onChange={handleChange}
//                   onBlur={handleChange as any}
//                   className={cn(
//                     "w-full h-12 px-4 rounded-xl border bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all",
//                     errors.emergencyContactPhone && touched?.emergencyContactPhone
//                       ? "border-red-500"
//                       : "border-slate-800"
//                   )}
//                   placeholder="Phone number"
//                 />
//                 {errors.emergencyContactPhone && touched?.emergencyContactPhone && (
//                   <p className="text-xs text-red-400 mt-1 error-message">
//                     {errors.emergencyContactPhone}
//                   </p>
//                 )}
//               </div>
//               <div className="space-y-1.5">
//                 <label className="text-xs font-black uppercase tracking-wider text-slate-400">
//                   WhatsApp
//                 </label>
//                 <input
//                   name="emergencyContactWhatsApp"
//                   value={formData.emergencyContactWhatsApp}
//                   onChange={handleChange}
//                   className="w-full h-12 px-4 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all"
//                   placeholder="WhatsApp number"
//                 />
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }











// app/(marketing)/onsite/admissions/components/sections/SectionParent.tsx
"use client";

import { cn } from "@/lib/utils";
import { SectionProps } from "../../types";
import { motion } from "framer-motion";
import {
  User,
  Users,
  Phone,
  Mail,
  Globe,
  MapPin,
  MessageCircle,
  Shield,
  UserPlus,
  Heart,
  BadgeCheck,
} from "lucide-react";

export function SectionParent({
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
          <Users className="w-5 h-5 text-purple-600 dark:text-purple-400 shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-medium text-foreground">Parent/Guardian Information</p>
            <p className="text-[10px] text-muted-foreground">
              We value open communication with parents and guardians. Please provide accurate contact information.
            </p>
          </div>
        </div>
      </div>

      {/* Father & Mother Names */}
      <motion.div variants={fadeIn} className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-xs font-black uppercase tracking-wider text-muted-foreground">
            17. Father's Full Name
          </label>
          <div className="relative">
            <User className="absolute left-3 top-3 w-4 h-4 text-purple-500" />
            <input
              name="fatherName"
              value={formData.fatherName}
              onChange={handleChange}
              className="w-full h-12 pl-10 pr-4 rounded-xl border border-border bg-card/50 focus:border-purple-500 dark:focus:border-purple-400 outline-none text-foreground text-sm transition-all duration-300"
              placeholder="Father's name"
            />
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-xs font-black uppercase tracking-wider text-muted-foreground">
            18. Mother's Full Name
          </label>
          <div className="relative">
            <User className="absolute left-3 top-3 w-4 h-4 text-amber-500" />
            <input
              name="motherName"
              value={formData.motherName}
              onChange={handleChange}
              className="w-full h-12 pl-10 pr-4 rounded-xl border border-border bg-card/50 focus:border-purple-500 dark:focus:border-purple-400 outline-none text-foreground text-sm transition-all duration-300"
              placeholder="Mother's name"
            />
          </div>
        </div>
      </motion.div>

      {/* Guardian Name & Relationship */}
      <motion.div variants={fadeIn} className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-xs font-black uppercase tracking-wider text-muted-foreground">
            19. Parent/Guardian submitting this application{" "}
            <span className="text-amber-500">*</span>
          </label>
          <div className="relative">
            <UserPlus className="absolute left-3 top-3 w-4 h-4 text-purple-500" />
            <input
              name="guardianName"
              value={formData.guardianName}
              onChange={handleChange}
              className={cn(
                "w-full h-12 pl-10 pr-4 rounded-xl border bg-card/50 focus:border-purple-500 dark:focus:border-purple-400 outline-none text-foreground text-sm transition-all duration-300",
                errors.guardianName && touched?.guardianName
                  ? "border-red-500"
                  : "border-border"
              )}
              placeholder="Full name"
            />
          </div>
          {errors.guardianName && touched?.guardianName && (
            <p className="text-xs text-red-500 mt-1 error-message">{errors.guardianName}</p>
          )}
        </div>
        <div className="space-y-2">
          <label className="text-xs font-black uppercase tracking-wider text-muted-foreground">
            20. Relationship to Student <span className="text-amber-500">*</span>
          </label>
          <div className="relative">
            <Heart className="absolute left-3 top-3 w-4 h-4 text-amber-500" />
            <input
              name="guardianRelationship"
              value={formData.guardianRelationship}
              onChange={handleChange}
              className={cn(
                "w-full h-12 pl-10 pr-4 rounded-xl border bg-card/50 focus:border-purple-500 dark:focus:border-purple-400 outline-none text-foreground text-sm transition-all duration-300",
                errors.guardianRelationship && touched?.guardianRelationship
                  ? "border-red-500"
                  : "border-border"
              )}
              placeholder="e.g., Father, Mother, Uncle"
            />
          </div>
          {errors.guardianRelationship && touched?.guardianRelationship && (
            <p className="text-xs text-red-500 mt-1 error-message">{errors.guardianRelationship}</p>
          )}
        </div>
      </motion.div>

      {/* Phone & WhatsApp */}
      <motion.div variants={fadeIn} className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-xs font-black uppercase tracking-wider text-muted-foreground">
            21. Phone Number <span className="text-amber-500">*</span>
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-3 w-4 h-4 text-purple-500" />
            <input
              name="guardianPhone"
              type="tel"
              value={formData.guardianPhone}
              onChange={handleChange}
              className={cn(
                "w-full h-12 pl-10 pr-4 rounded-xl border bg-card/50 focus:border-purple-500 dark:focus:border-purple-400 outline-none text-foreground text-sm transition-all duration-300",
                errors.guardianPhone && touched?.guardianPhone
                  ? "border-red-500"
                  : "border-border"
              )}
              placeholder="+234 800 000 0000"
            />
          </div>
          {errors.guardianPhone && touched?.guardianPhone && (
            <p className="text-xs text-red-500 mt-1 error-message">{errors.guardianPhone}</p>
          )}
        </div>
        <div className="space-y-2">
          <label className="text-xs font-black uppercase tracking-wider text-muted-foreground">
            22. WhatsApp Number
          </label>
          <div className="relative">
            <MessageCircle className="absolute left-3 top-3 w-4 h-4 text-emerald-500" />
            <input
              name="guardianWhatsApp"
              type="tel"
              value={formData.guardianWhatsApp}
              onChange={handleChange}
              className="w-full h-12 pl-10 pr-4 rounded-xl border border-border bg-card/50 focus:border-purple-500 dark:focus:border-purple-400 outline-none text-foreground text-sm transition-all duration-300"
              placeholder="+234 800 000 0000"
            />
          </div>
        </div>
      </motion.div>

      {/* Email & Country */}
      <motion.div variants={fadeIn} className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-xs font-black uppercase tracking-wider text-muted-foreground">
            23. Email Address <span className="text-amber-500">*</span>
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 w-4 h-4 text-purple-500" />
            <input
              name="guardianEmail"
              type="email"
              value={formData.guardianEmail}
              onChange={handleChange}
              className={cn(
                "w-full h-12 pl-10 pr-4 rounded-xl border bg-card/50 focus:border-purple-500 dark:focus:border-purple-400 outline-none text-foreground text-sm transition-all duration-300",
                errors.guardianEmail && touched?.guardianEmail
                  ? "border-red-500"
                  : "border-border"
              )}
              placeholder="email@example.com"
            />
          </div>
          {errors.guardianEmail && touched?.guardianEmail && (
            <p className="text-xs text-red-500 mt-1 error-message">{errors.guardianEmail}</p>
          )}
        </div>
        <div className="space-y-2">
          <label className="text-xs font-black uppercase tracking-wider text-muted-foreground">
            24. Country of Residence <span className="text-amber-500">*</span>
          </label>
          <div className="relative">
            <Globe className="absolute left-3 top-3 w-4 h-4 text-amber-500" />
            <input
              name="guardianCountry"
              value={formData.guardianCountry}
              onChange={handleChange}
              className={cn(
                "w-full h-12 pl-10 pr-4 rounded-xl border bg-card/50 focus:border-purple-500 dark:focus:border-purple-400 outline-none text-foreground text-sm transition-all duration-300",
                errors.guardianCountry && touched?.guardianCountry
                  ? "border-red-500"
                  : "border-border"
              )}
              placeholder="Country"
            />
          </div>
          {errors.guardianCountry && touched?.guardianCountry && (
            <p className="text-xs text-red-500 mt-1 error-message">{errors.guardianCountry}</p>
          )}
        </div>
      </motion.div>

      {/* Residential Address */}
      <motion.div variants={fadeIn} className="space-y-2">
        <label className="text-xs font-black uppercase tracking-wider text-muted-foreground">
          25. Residential Address
        </label>
        <div className="relative">
          <MapPin className="absolute left-3 top-3 w-4 h-4 text-purple-500" />
          <input
            name="guardianAddress"
            value={formData.guardianAddress}
            onChange={handleChange}
            className="w-full h-12 pl-10 pr-4 rounded-xl border border-border bg-card/50 focus:border-purple-500 dark:focus:border-purple-400 outline-none text-foreground text-sm transition-all duration-300"
            placeholder="Residential address"
          />
        </div>
      </motion.div>

      {/* Preferred Communication */}
      <motion.div variants={fadeIn} className="space-y-2">
        <label className="text-xs font-black uppercase tracking-wider text-muted-foreground">
          26. Preferred method of communication <span className="text-amber-500">*</span>
        </label>
        <div className="flex flex-wrap gap-2">
          {["WhatsApp", "Phone Call", "Email"].map((option) => (
            <motion.button
              key={option}
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() =>
                handleChange({ target: { name: "preferredCommunication", value: option } } as any)
              }
              className={cn(
                "px-6 py-2.5 rounded-full text-xs font-black transition-all duration-300 min-h-[44px]",
                formData.preferredCommunication === option
                  ? option === "WhatsApp"
                    ? "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-500/30"
                    : option === "Phone Call"
                    ? "bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg shadow-purple-500/30"
                    : "bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-lg shadow-amber-500/30"
                  : "bg-card/50 text-muted-foreground border border-border hover:border-purple-300 dark:hover:border-purple-600/30 hover:bg-muted/30",
              )}
            >
              {option}
            </motion.button>
          ))}
        </div>
        {errors.preferredCommunication && touched?.preferredCommunication && (
          <p className="text-xs text-red-500 mt-1 error-message">
            {errors.preferredCommunication}
          </p>
        )}
      </motion.div>

      {/* Emergency Contact */}
      <motion.div variants={fadeIn} className="space-y-3">
        <div className="space-y-2">
          <label className="text-xs font-black uppercase tracking-wider text-muted-foreground">
            27. Is there another person we should contact regarding this student?
          </label>
          <div className="flex gap-4">
            {["Yes", "No"].map((option) => (
              <motion.button
                key={option}
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() =>
                  handleChange({ target: { name: "hasEmergencyContact", value: option } } as any)
                }
                className={cn(
                  "px-6 py-2.5 rounded-full text-xs font-black transition-all duration-300 min-h-[44px]",
                  formData.hasEmergencyContact === option
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

        {formData.hasEmergencyContact === "Yes" && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ duration: 0.3 }}
            className="pl-4 border-l-2 border-amber-500/30 space-y-4"
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-wider text-muted-foreground">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-3 w-4 h-4 text-amber-500" />
                  <input
                    name="emergencyContactName"
                    value={formData.emergencyContactName}
                    onChange={handleChange}
                    className={cn(
                      "w-full h-12 pl-10 pr-4 rounded-xl border bg-card/50 focus:border-purple-500 dark:focus:border-purple-400 outline-none text-foreground text-sm transition-all duration-300",
                      errors.emergencyContactName && touched?.emergencyContactName
                        ? "border-red-500"
                        : "border-border"
                    )}
                    placeholder="Full name"
                  />
                </div>
                {errors.emergencyContactName && touched?.emergencyContactName && (
                  <p className="text-xs text-red-500 mt-1 error-message">
                    {errors.emergencyContactName}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-wider text-muted-foreground">
                  Relationship
                </label>
                <div className="relative">
                  <Heart className="absolute left-3 top-3 w-4 h-4 text-amber-500" />
                  <input
                    name="emergencyContactRelationship"
                    value={formData.emergencyContactRelationship}
                    onChange={handleChange}
                    className="w-full h-12 pl-10 pr-4 rounded-xl border border-border bg-card/50 focus:border-purple-500 dark:focus:border-purple-400 outline-none text-foreground text-sm transition-all duration-300"
                    placeholder="Relationship"
                  />
                </div>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-wider text-muted-foreground">
                  Phone
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 w-4 h-4 text-amber-500" />
                  <input
                    name="emergencyContactPhone"
                    value={formData.emergencyContactPhone}
                    onChange={handleChange}
                    className={cn(
                      "w-full h-12 pl-10 pr-4 rounded-xl border bg-card/50 focus:border-purple-500 dark:focus:border-purple-400 outline-none text-foreground text-sm transition-all duration-300",
                      errors.emergencyContactPhone && touched?.emergencyContactPhone
                        ? "border-red-500"
                        : "border-border"
                    )}
                    placeholder="Phone number"
                  />
                </div>
                {errors.emergencyContactPhone && touched?.emergencyContactPhone && (
                  <p className="text-xs text-red-500 mt-1 error-message">
                    {errors.emergencyContactPhone}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-wider text-muted-foreground">
                  WhatsApp
                </label>
                <div className="relative">
                  <MessageCircle className="absolute left-3 top-3 w-4 h-4 text-emerald-500" />
                  <input
                    name="emergencyContactWhatsApp"
                    value={formData.emergencyContactWhatsApp}
                    onChange={handleChange}
                    className="w-full h-12 pl-10 pr-4 rounded-xl border border-border bg-card/50 focus:border-purple-500 dark:focus:border-purple-400 outline-none text-foreground text-sm transition-all duration-300"
                    placeholder="WhatsApp number"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Parent Info Summary */}
      <motion.div
        variants={fadeIn}
        className="mt-4 p-4 rounded-xl bg-gradient-to-r from-purple-50/30 to-amber-50/30 dark:from-purple-600/10 dark:to-amber-500/10 border border-purple-200 dark:border-purple-800/30"
      >
        <div className="flex items-start gap-3">
          <BadgeCheck className="w-5 h-5 text-purple-600 dark:text-purple-400 shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-medium text-foreground">Contact Information Verified</p>
            <p className="text-[10px] text-muted-foreground">
              We use this information to keep you updated on your ward's progress and important announcements
            </p>
          </div>
        </div>
      </motion.div>

      {/* Quick Contact Summary */}
      {formData.guardianName && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-wrap gap-3 pt-2"
        >
          <div className="px-3 py-1.5 rounded-full bg-muted/30 border border-border flex items-center gap-2">
            <User className="w-3 h-3 text-purple-500" />
            <span className="text-[9px] font-medium text-muted-foreground">
              {formData.guardianName}
            </span>
          </div>
          {formData.guardianPhone && (
            <div className="px-3 py-1.5 rounded-full bg-muted/30 border border-border flex items-center gap-2">
              <Phone className="w-3 h-3 text-purple-500" />
              <span className="text-[9px] font-medium text-muted-foreground">
                {formData.guardianPhone}
              </span>
            </div>
          )}
          {formData.guardianEmail && (
            <div className="px-3 py-1.5 rounded-full bg-muted/30 border border-border flex items-center gap-2">
              <Mail className="w-3 h-3 text-purple-500" />
              <span className="text-[9px] font-medium text-muted-foreground">
                {formData.guardianEmail}
              </span>
            </div>
          )}
        </motion.div>
      )}
    </motion.div>
  );
}