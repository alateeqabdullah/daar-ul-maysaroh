// app/(marketing)/physical/components/sections/PhysicalAdmissionsProcess.tsx
"use client";

import { Reveal } from "@/components/shared/section-animation";
import { motion } from "framer-motion";
import {
  FileText,
  Users,
  GraduationCap,
  Sparkles,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const STEPS = [
  {
    step: "01",
    title: "Submit Application",
    description: "Complete the online application form with student details",
    icon: FileText,
    color: "purple",
  },
  {
    step: "02",
    title: "Placement Assessment",
    description: "Schedule and complete the placement assessment",
    icon: Users,
    color: "amber",
  },
  {
    step: "03",
    title: "Enrollment & Fee Payment",
    description: "Complete registration and choose payment plan",
    icon: GraduationCap,
    color: "purple",
  },
  {
    step: "04",
    title: "Begin Your Journey",
    description: "Start your Quranic journey at Daar-ul-Maysaroh",
    icon: Sparkles,
    color: "amber",
  },
];

export function PhysicalAdmissionsProcess() {
  return (
    <section className="py-16 sm:py-20 md:py-24 lg:py-28 bg-gradient-to-b from-background via-purple-50/5 to-amber-50/5">
      <div className="container mx-auto px-4 xs:px-5 sm:px-6">
        <Reveal>
          <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-100 to-amber-100 dark:from-purple-900/30 dark:to-amber-900/30 border border-purple-200 dark:border-purple-800 mb-4">
              <FileText className="w-4 h-4 text-amber-500" />
              <span className="text-[10px] font-black uppercase tracking-wider text-purple-700 dark:text-purple-400">
                How to Apply
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter font-heading leading-[1.1] mb-4">
              Your{" "}
              <span className="bg-gradient-to-r from-purple-600 to-amber-600 bg-clip-text text-transparent italic">
                Journey
              </span>{" "}
              Starts Here
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Four simple steps to begin your Quranic journey at
              Daar-ul-Maysaroh
            </p>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {STEPS.map((step, idx) => {
            const Icon = step.icon;
            const isPurple = step.color === "purple";
            return (
              <Reveal key={idx} delay={idx * 0.1}>
                <div className="text-center group">
                  <div
                    className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br ${isPurple ? "from-purple-600 to-purple-700" : "from-amber-500 to-amber-600"} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="relative">
                    <div
                      className={`text-4xl font-black ${isPurple ? "text-purple-600/20" : "text-amber-500/20"} absolute -top-8 left-1/2 -translate-x-1/2`}
                    >
                      {step.step}
                    </div>
                    <h3 className="font-black text-lg mt-2">{step.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {step.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.3}>
          <div className="text-center mt-10">
            <Link href="/physical/admissions">
              <Button className="rounded-full px-8 py-4 font-black bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white shadow-lg hover:shadow-xl transition-all group">
                Start Your Application
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
















// // app/(marketing)/physical/components/sections/PhysicalAdmissionsProcess.tsx
// "use client";

// import { Reveal } from "@/components/shared/section-animation";
// import { motion } from "framer-motion";
// import {
//   FileText,
//   Users,
//   GraduationCap,
//   Sparkles,
//   ArrowRight,
//   Check,
//   Clock,
// } from "lucide-react";
// import Link from "next/link";
// import { Button } from "@/components/ui/button";

// const STEPS = [
//   {
//     step: "01",
//     title: "Submit Application",
//     description: "Complete the online application form with student details and preferred programme",
//     icon: FileText,
//     color: "purple",
//     detail: "10-15 minutes",
//   },
//   {
//     step: "02",
//     title: "Placement Assessment",
//     description: "Schedule and complete the placement assessment to determine your level",
//     icon: Users,
//     color: "amber",
//     detail: "30-45 minutes",
//   },
//   {
//     step: "03",
//     title: "Enrollment & Payment",
//     description: "Complete registration and choose your payment plan",
//     icon: GraduationCap,
//     color: "purple",
//     detail: "24-48 hours",
//   },
//   {
//     step: "04",
//     title: "Begin Your Journey",
//     description: "Start your Quranic journey at Daar-ul-Maysaroh",
//     icon: Sparkles,
//     color: "amber",
//     detail: "Welcome!",
//   },
// ];

// const getColorStyles = (color: string) => {
//   const styles = {
//     purple: {
//       text: "text-purple-600 dark:text-purple-400",
//       bg: "bg-purple-100 dark:bg-purple-950/40",
//       gradient: "from-purple-600 to-purple-700",
//       light: "hover:bg-purple-50/30 dark:hover:bg-purple-950/20",
//       glow: "shadow-purple-500/10",
//     },
//     amber: {
//       text: "text-amber-600 dark:text-amber-400",
//       bg: "bg-amber-100 dark:bg-amber-950/40",
//       gradient: "from-amber-500 to-amber-600",
//       light: "hover:bg-amber-50/30 dark:hover:bg-amber-950/20",
//       glow: "shadow-amber-500/10",
//     },
//   };
//   return styles[color as keyof typeof styles] || styles.purple;
// };

// export function PhysicalAdmissionsProcess() {
//   return (
//     <section className="py-20 sm:py-24 md:py-28 lg:py-32 relative overflow-hidden">
//       {/* Premium Background */}
//       <div className="absolute inset-0 pointer-events-none">
//         <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-[150px]" />
//         <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[150px]" />
//         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/3 rounded-full blur-[120px]" />
//       </div>

//       <div className="container mx-auto px-4 xs:px-5 sm:px-6 relative z-10">
//         {/* Section Header */}
//         <Reveal>
//           <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
//             <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-100 to-amber-100 dark:from-purple-900/30 dark:to-amber-900/30 border border-purple-200 dark:border-purple-800 mb-4">
//               <FileText className="w-4 h-4 text-amber-500" />
//               <span className="text-[10px] font-black uppercase tracking-wider text-purple-700 dark:text-purple-400">
//                 How to Apply
//               </span>
//               <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
//             </div>
//             <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter font-heading leading-[1.1] mb-4">
//               Your{" "}
//               <span className="bg-gradient-to-r from-purple-600 via-purple-700 to-amber-600 bg-clip-text text-transparent italic">
//                 Journey
//               </span>{" "}
//               Starts Here
//             </h2>
//             <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
//               Four simple steps to begin your Quranic journey at Daar-ul-Maysaroh
//             </p>
//           </div>
//         </Reveal>

//         {/* Steps - Borderless Premium Design */}
//         <div className="relative max-w-5xl mx-auto">
//           {/* Connector Line */}
//           <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-600 via-amber-500 to-purple-600 -translate-x-1/2 opacity-20" />

//           <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
//             {STEPS.map((step, index) => {
//               const Icon = step.icon;
//               const colors = getColorStyles(step.color);
//               const isLeft = index % 2 === 0;
//               return (
//                 <Reveal key={index} delay={index * 0.1}>
//                   <motion.div
//                     whileHover={{ y: -6 }}
//                     className={`group relative p-6 rounded-2xl transition-all duration-500 ${colors.light} cursor-default`}
//                   >
//                     {/* Glow Effect */}
//                     <div className={`absolute inset-0 ${colors.glow} opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-700 rounded-2xl`} />

//                     {/* Step Number - Floating */}
//                     <div className="absolute -top-3 right-4 text-5xl font-black text-muted-foreground/5 group-hover:text-muted-foreground/10 transition-colors">
//                       {step.step}
//                     </div>

//                     <div className="relative flex flex-col items-center text-center">
//                       {/* Icon with Ring */}
//                       <div className="relative mb-5">
//                         <div className={`absolute inset-0 ${colors.text} opacity-0 group-hover:opacity-10 blur-md transition-opacity duration-500 rounded-full`} />
//                         <div className={`relative w-16 h-16 rounded-full ${colors.bg} flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-md group-hover:shadow-lg`}>
//                           <Icon className={`w-8 h-8 ${colors.text}`} />
//                         </div>
//                         <div className="absolute -bottom-1 -right-1">
//                           <div className={`w-5 h-5 rounded-full bg-gradient-to-r ${colors.gradient} flex items-center justify-center shadow-md`}>
//                             <span className="text-[8px] font-black text-white">{index + 1}</span>
//                           </div>
//                         </div>
//                       </div>

//                       <h3 className={`font-black text-lg ${colors.text}`}>
//                         {step.title}
//                       </h3>
//                       <p className="text-sm text-muted-foreground mt-2 leading-relaxed max-w-xs mx-auto">
//                         {step.description}
//                       </p>
//                       <div className="mt-3 inline-flex items-center gap-1.5 text-[10px] text-muted-foreground/60">
//                         <Clock className="w-3 h-3" />
//                         <span>{step.detail}</span>
//                       </div>
//                     </div>

//                     {/* Decorative Line */}
//                     <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${colors.gradient} scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left opacity-30`} />
//                   </motion.div>
//                 </Reveal>
//               );
//             })}
//           </div>
//         </div>

//         {/* CTA */}
//         <Reveal delay={0.3}>
//           <div className="text-center mt-14">
//             <Link href="/physical/admissions">
//               <Button className="rounded-full px-8 py-4 font-black bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white shadow-lg hover:shadow-xl transition-all group">
//                 Start Your Application
//                 <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
//               </Button>
//             </Link>
//             <p className="text-xs text-muted-foreground mt-3">Free assessment • No commitment</p>
//           </div>
//         </Reveal>
//       </div>
//     </section>
//   );
// }