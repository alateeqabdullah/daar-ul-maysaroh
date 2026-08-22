// // app/(marketing)/onsite/admissions/components/sections/SectionVisitation.tsx
// "use client";

// import { cn } from "@/lib/utils";
// import { SectionProps } from "../../types";

// export function SectionVisitation({ formData, handleChange }: SectionProps) {
//   return (
//     <div className="space-y-5">
//       <div className="space-y-1.5">
//         <label className="text-xs font-black uppercase tracking-wider text-slate-400">
//           79. Who is authorised to visit the student?
//         </label>
//         <div className="grid grid-cols-3 gap-2">
//           <input
//             name="authorisedVisitors"
//             value={formData.authorisedVisitors}
//             onChange={handleChange}
//             className="col-span-2 w-full h-12 px-4 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all"
//             placeholder="Full Name"
//           />
//           <input
//             name="authorisedVisitors"
//             value={formData.authorisedVisitors}
//             onChange={handleChange}
//             className="w-full h-12 px-4 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all"
//             placeholder="Phone"
//           />
//         </div>
//         <p className="text-[10px] text-slate-500 italic">
//           Add multiple visitors separated by commas
//         </p>
//       </div>

//       <div className="space-y-1.5">
//         <label className="text-xs font-black uppercase tracking-wider text-slate-400">
//           80. Who is authorised to collect the student from the Madrasah?
//         </label>
//         <div className="grid grid-cols-3 gap-2">
//           <input
//             name="authorisedCollectors"
//             value={formData.authorisedCollectors}
//             onChange={handleChange}
//             className="col-span-2 w-full h-12 px-4 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all"
//             placeholder="Full Name"
//           />
//           <input
//             name="authorisedCollectors"
//             value={formData.authorisedCollectors}
//             onChange={handleChange}
//             className="w-full h-12 px-4 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all"
//             placeholder="Phone"
//           />
//         </div>
//         <p className="text-[10px] text-slate-500 italic">
//           Add multiple collectors separated by commas
//         </p>
//       </div>

//       <div className="space-y-1.5">
//         <label className="text-xs font-black uppercase tracking-wider text-slate-400">
//           81. Is there anyone who should NOT be permitted to collect or visit
//           the student?
//         </label>
//         <div className="flex gap-4">
//           {["Yes", "No"].map((option) => (
//             <button
//               key={option}
//               type="button"
//               onClick={() =>
//                 handleChange({
//                   target: { name: "restrictedPersons", value: option },
//                 } as any)
//               }
//               className={cn(
//                 "px-6 py-2 rounded-full text-xs font-black transition-all min-h-[40px]",
//                 formData.restrictedPersons === option
//                   ? "bg-red-600/40 text-red-300 border border-red-500"
//                   : "bg-slate-800/50 text-slate-400 border border-slate-800 hover:border-slate-700",
//               )}
//             >
//               {option}
//             </button>
//           ))}
//         </div>
//       </div>
//       {formData.restrictedPersons === "Yes" && (
//         <div className="space-y-1.5 pl-4 border-l-2 border-red-500/30">
//           <label className="text-xs font-black uppercase tracking-wider text-slate-400">
//             Please provide details:
//           </label>
//           <input
//             name="restrictedPersonsDetails"
//             value={formData.restrictedPersonsDetails}
//             onChange={handleChange}
//             className="w-full h-12 px-4 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all"
//             placeholder="Details of restricted persons..."
//           />
//         </div>
//       )}
//     </div>
//   );
// }














// app/(marketing)/onsite/admissions/components/sections/SectionVisitation.tsx
"use client";

import { cn } from "@/lib/utils";
import { SectionProps } from "../../types";
import { motion } from "framer-motion";
import {
  UserCheck,
  UserPlus,
  UserX,
  Phone,
  Users,
  Shield,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";

export function SectionVisitation({ formData, handleChange }: SectionProps) {
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
          <Shield className="w-5 h-5 text-purple-600 dark:text-purple-400 shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-medium text-foreground">Student Safety & Security</p>
            <p className="text-[10px] text-muted-foreground">
              Please provide accurate information to ensure the safety and security of your ward
            </p>
          </div>
        </div>
      </div>

      {/* Question 79 - Authorised Visitors */}
      <motion.div variants={fadeIn} className="space-y-2">
        <label className="text-xs font-black uppercase tracking-wider text-muted-foreground">
          79. Who is authorised to visit the student?
        </label>
        <div className="grid grid-cols-3 gap-2">
          <div className="col-span-2 relative">
            <UserCheck className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-500" />
            <input
              name="authorisedVisitors"
              value={formData.authorisedVisitors}
              onChange={handleChange}
              className="w-full h-12 pl-10 pr-4 rounded-xl border border-border bg-card/50 focus:border-purple-500 dark:focus:border-purple-400 outline-none text-foreground text-sm transition-all duration-300"
              placeholder="Full Name"
            />
          </div>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-500" />
            <input
              name="authorisedVisitors"
              value={formData.authorisedVisitors}
              onChange={handleChange}
              className="w-full h-12 pl-10 pr-4 rounded-xl border border-border bg-card/50 focus:border-purple-500 dark:focus:border-purple-400 outline-none text-foreground text-sm transition-all duration-300"
              placeholder="Phone"
            />
          </div>
        </div>
        <p className="text-[10px] text-muted-foreground/70 italic flex items-center gap-1">
          <UserPlus className="w-3 h-3" />
          Add multiple visitors separated by commas
        </p>
      </motion.div>

      {/* Question 80 - Authorised Collectors */}
      <motion.div variants={fadeIn} className="space-y-2">
        <label className="text-xs font-black uppercase tracking-wider text-muted-foreground">
          80. Who is authorised to collect the student from the Madrasah?
        </label>
        <div className="grid grid-cols-3 gap-2">
          <div className="col-span-2 relative">
            <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-500" />
            <input
              name="authorisedCollectors"
              value={formData.authorisedCollectors}
              onChange={handleChange}
              className="w-full h-12 pl-10 pr-4 rounded-xl border border-border bg-card/50 focus:border-purple-500 dark:focus:border-purple-400 outline-none text-foreground text-sm transition-all duration-300"
              placeholder="Full Name"
            />
          </div>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-500" />
            <input
              name="authorisedCollectors"
              value={formData.authorisedCollectors}
              onChange={handleChange}
              className="w-full h-12 pl-10 pr-4 rounded-xl border border-border bg-card/50 focus:border-purple-500 dark:focus:border-purple-400 outline-none text-foreground text-sm transition-all duration-300"
              placeholder="Phone"
            />
          </div>
        </div>
        <p className="text-[10px] text-muted-foreground/70 italic flex items-center gap-1">
          <UserPlus className="w-3 h-3" />
          Add multiple collectors separated by commas
        </p>
      </motion.div>

      {/* Question 81 - Restricted Persons */}
      <motion.div variants={fadeIn} className="space-y-2">
        <label className="text-xs font-black uppercase tracking-wider text-muted-foreground">
          81. Is there anyone who should NOT be permitted to collect or visit
          the student?
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
                  target: { name: "restrictedPersons", value: option },
                } as any)
              }
              className={cn(
                "px-6 py-2.5 rounded-full text-xs font-black transition-all duration-300 min-h-[44px]",
                formData.restrictedPersons === option
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

      {formData.restrictedPersons === "Yes" && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          transition={{ duration: 0.3 }}
          className="space-y-2 pl-4 border-l-2 border-red-500/30"
        >
          <label className="text-xs font-black uppercase tracking-wider text-muted-foreground">
            Please provide details:
          </label>
          <div className="relative">
            <UserX className="absolute left-3 top-3 w-4 h-4 text-red-500" />
            <textarea
              name="restrictedPersonsDetails"
              value={formData.restrictedPersonsDetails}
              onChange={handleChange}
              rows={3}
              className="w-full p-4 pl-10 rounded-xl border border-red-300 dark:border-red-800/30 bg-card/50 focus:border-red-500 dark:focus:border-red-400 outline-none text-foreground text-sm transition-all duration-300 resize-none placeholder:text-muted-foreground/50"
              placeholder="Details of restricted persons..."
            />
          </div>
          <p className="text-[10px] text-red-500/70 italic flex items-center gap-1">
            <AlertTriangle className="w-3 h-3" />
            This information is kept confidential and used for security purposes only
          </p>
        </motion.div>
      )}

      {/* Security Summary */}
      <motion.div
        variants={fadeIn}
        className="mt-4 p-4 rounded-xl bg-gradient-to-r from-purple-50/30 to-amber-50/30 dark:from-purple-600/10 dark:to-amber-500/10 border border-purple-200 dark:border-purple-800/30"
      >
        <div className="flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-medium text-foreground">Security Check Complete</p>
            <p className="text-[10px] text-muted-foreground">
              {formData.authorisedVisitors || formData.authorisedCollectors ? (
                <>
                  {formData.authorisedVisitors && (
                    <span>Visitors: {formData.authorisedVisitors.split(',').length} authorized</span>
                  )}
                  {formData.authorisedVisitors && formData.authorisedCollectors && " • "}
                  {formData.authorisedCollectors && (
                    <span>Collectors: {formData.authorisedCollectors.split(',').length} authorized</span>
                  )}
                  {formData.restrictedPersons === "Yes" && " • ⚠️ Restrictions in place"}
                </>
              ) : (
                "Please add authorized visitors and collectors"
              )}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Quick Stats */}
      <div className="flex flex-wrap gap-3 pt-2">
        {[
          { 
            label: "Authorized Visitors", 
            count: formData.authorisedVisitors ? formData.authorisedVisitors.split(',').length : 0,
            icon: UserCheck,
            color: "text-purple-500"
          },
          { 
            label: "Authorized Collectors", 
            count: formData.authorisedCollectors ? formData.authorisedCollectors.split(',').length : 0,
            icon: Users,
            color: "text-amber-500"
          },
          { 
            label: "Restrictions", 
            count: formData.restrictedPersons === "Yes" ? 1 : 0,
            icon: AlertTriangle,
            color: formData.restrictedPersons === "Yes" ? "text-red-500" : "text-emerald-500"
          },
        ].map((item, i) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="px-3 py-1.5 rounded-full bg-muted/30 border border-border flex items-center gap-2"
            >
              <Icon className={`w-3 h-3 ${item.color}`} />
              <span className="text-[9px] font-medium text-muted-foreground">
                {item.label}: {item.count}
              </span>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}