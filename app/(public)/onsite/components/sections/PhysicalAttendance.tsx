// // // app/(marketing)/physical/components/sections/PhysicalAttendance.tsx
// // "use client";

// // import { Reveal } from "@/components/shared/section-animation";
// // import { motion } from "framer-motion";
// // import {
// //   Calendar,
// //   Sun,
// //   Moon,
// //   Sparkles,
// //   Check,
// //   ArrowRight,
// //   Zap,
// //   Crown,
// // } from "lucide-react";
// // import Link from "next/link";
// // import { Button } from "@/components/ui/button";
// // import { cn } from "@/lib/utils";
// // import { useState } from "react";

// // const ATTENDANCE_OPTIONS = [
// //   {
// //     id: "day-part-time",
// //     title: "Part-Time Day",
// //     type: "day",
// //     schedule: "Saturday - Sunday",
// //     time: "9:00 AM - 4:30 PM",
// //     icon: Sun,
// //     color: "amber",
// //     badge: "Weekend Only",
// //     features: [
// //       "2 days per week",
// //       "Full academic program",
// //       "Tahfeedh & Tajweed",
// //       "Islamic Studies",
// //     ],
// //   },
// //   {
// //     id: "day-full-time",
// //     title: "Full-Time Day",
// //     type: "day",
// //     schedule: "Saturday - Sunday & Monday - Wednesday",
// //     time: "Sat-Sun: 9AM - 4:30PM • Mon-Wed: 4:30PM - 6:30PM",
// //     icon: Sun,
// //     color: "purple",
// //     badge: "Most Popular",
// //     features: [
// //       "5 days per week",
// //       "Extended learning hours",
// //       "Complete curriculum",
// //       "Accelerated progress",
// //     ],
// //   },
// //   {
// //     id: "boarding-part-time",
// //     title: "Part-Time Boarding",
// //     type: "boarding",
// //     schedule: "Friday - Sunday",
// //     time: "Friday 4:30PM - Sunday 4:30PM",
// //     icon: Moon,
// //     color: "amber",
// //     badge: "Weekend Intensive",
// //     features: [
// //       "Weekend immersion",
// //       "On-campus accommodation",
// //       "Full supervision",
// //       "Community experience",
// //     ],
// //   },
// //   {
// //     id: "boarding-full-time",
// //     title: "Full-Time Boarding",
// //     type: "boarding",
// //     schedule: "Daily",
// //     time: "Full-time residential",
// //     icon: Moon,
// //     color: "purple",
// //     badge: "Premium",
// //     features: [
// //       "Full-time campus living",
// //       "Immersive environment",
// //       "24/7 supervision",
// //       "Accelerated memorization",
// //     ],
// //   },
// // ];

// // const FLEXIBLE_OPTIONS = [
// //   {
// //     title: "Custom Schedule",
// //     description: "Tailored attendance plan to fit your family's needs",
// //     icon: Crown,
// //     color: "purple",
// //   },
// //   {
// //     title: "Flexible Days",
// //     description: "Choose specific days that work for you",
// //     icon: Calendar,
// //     color: "amber",
// //   },
// //   {
// //     title: "Hybrid Learning",
// //     description: "Combine day and boarding elements",
// //     icon: Zap,
// //     color: "purple",
// //   },
// // ];

// // const getColorStyles = (color: string) => {
// //   const styles = {
// //     purple: {
// //       text: "text-purple-600 dark:text-purple-400",
// //       border: "border-purple-200 dark:border-purple-800",
// //       hoverBorder: "hover:border-purple-400 dark:hover:border-purple-500",
// //       bg: "bg-purple-100 dark:bg-purple-950/40",
// //       linear: "bg-linear-to-r from-purple-600 to-purple-700",
// //       linearBr: "bg-linear-to-br from-purple-600 to-purple-700",
// //       hoverFrom: "hover:from-purple-700",
// //       hoverTo: "hover:to-purple-800",
// //       light: "bg-purple-50/30 dark:bg-purple-950/20",
// //       glow: "shadow-purple-500/20",
// //       ring: "bg-purple-500/40",
// //     },
// //     amber: {
// //       text: "text-amber-600 dark:text-amber-400",
// //       border: "border-amber-200 dark:border-amber-800",
// //       hoverBorder: "hover:border-amber-400 dark:hover:border-amber-500",
// //       bg: "bg-amber-100 dark:bg-amber-950/40",
// //       linear: "bg-linear-to-r from-amber-500 to-amber-600",
// //       linearBr: "bg-linear-to-br from-amber-500 to-amber-600",
// //       hoverFrom: "hover:from-amber-600",
// //       hoverTo: "hover:to-amber-700",
// //       light: "bg-amber-50/30 dark:bg-amber-950/20",
// //       glow: "shadow-amber-500/20",
// //       ring: "bg-amber-500/40",
// //     },
// //   };
// //   return styles[color as keyof typeof styles] || styles.purple;
// // };

// // const getBadgeStyles = (badge: string) => {
// //   const amberBadges = ["Weekend Only", "Most Popular"];
// //   return amberBadges.includes(badge)
// //     ? "bg-linear-to-r from-amber-500 to-amber-600"
// //     : "bg-linear-to-r from-purple-600 to-purple-700";
// // };

// // export function PhysicalAttendance() {
// //   const [activeType, setActiveType] = useState<"all" | "day" | "boarding">(
// //     "all",
// //   );

// //   const filteredOptions = ATTENDANCE_OPTIONS.filter(
// //     (option) => activeType === "all" || option.type === activeType,
// //   );

// //   const filterButtonClass = (isActive: boolean) =>
// //     cn(
// //       "px-6 py-2.5 rounded-lg font-black text-sm transition-all",
// //       isActive
// //         ? "bg-linear-to-r from-purple-600 to-purple-700 text-white shadow-lg"
// //         : "text-muted-foreground hover:text-purple-600",
// //     );

// //   return (
// //     <section className="py-16 sm:py-20 md:py-24 lg:py-28 bg-linear-to-b from-background via-purple-50/5 to-amber-50/5 relative overflow-hidden">
// //       {/* Background */}
// //       <div className="absolute inset-0 pointer-events-none">
// //         <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-purple-600/5 rounded-full blur-3xl" />
// //         <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-amber-500/5 rounded-full blur-3xl" />
// //       </div>

// //       <div className="container mx-auto px-4 xs:px-5 sm:px-6 relative z-10">
// //         {/* Header */}
// //         <Reveal>
// //           <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
// //             <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 dark:bg-purple-900/30 border border-purple-200 dark:border-purple-800 mb-4">
// //               <Calendar className="w-4 h-4 text-amber-500" />
// //               <span className="text-[10px] font-black uppercase tracking-wider text-purple-700 dark:text-purple-400">
// //                 Attendance Options
// //               </span>
// //             </div>
// //             <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter font-heading leading-[1.1] mb-4">
// //               Choose Your{" "}
// //               <span className="bg-linear-to-r from-purple-600 to-amber-600 bg-clip-text text-transparent italic">
// //                 Schedule
// //               </span>
// //             </h2>
// //             <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
// //               Flexible attendance options designed to accommodate different
// //               needs and lifestyles
// //             </p>
// //           </div>
// //         </Reveal>

// //         {/* Type Filter */}
// //         <div className="flex justify-center mb-10">
// //           <div className="flex gap-1 p-1 rounded-xl bg-muted/30 border border-purple-200 dark:border-purple-800">
// //             <button
// //               onClick={() => setActiveType("all")}
// //               className={filterButtonClass(activeType === "all")}
// //             >
// //               All Options
// //             </button>
// //             <button
// //               onClick={() => setActiveType("day")}
// //               className={filterButtonClass(activeType === "day")}
// //             >
// //               <Sun className="w-4 h-4 inline mr-2" />
// //               Day Programmes
// //             </button>
// //             <button
// //               onClick={() => setActiveType("boarding")}
// //               className={filterButtonClass(activeType === "boarding")}
// //             >
// //               <Moon className="w-4 h-4 inline mr-2" />
// //               Boarding Programmes
// //             </button>
// //           </div>
// //         </div>

// //         {/* Attendance Options Grid */}
// //         <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
// //           {filteredOptions.map((option, index) => {
// //             const Icon = option.icon;
// //             const colors = getColorStyles(option.color);

// //             return (
// //               <Reveal key={option.id} delay={index * 0.08}>
// //                 <motion.div
// //                   whileHover={{ y: -6 }}
// //                   className={cn(
// //                     "group relative bg-card rounded-2xl border-2 transition-all duration-500 p-6 md:p-8 shadow-lg hover:shadow-2xl overflow-hidden",
// //                     colors.border,
// //                     colors.hoverBorder,
// //                   )}
// //                 >
// //                   {/* linear Overlay */}
// //                   <div
// //                     className={cn(
// //                       "absolute inset-0 opacity-0 group-hover:opacity-[0.04] transition-opacity duration-700",
// //                       colors.linearBr,
// //                     )}
// //                   />

// //                   {/* Glow */}
// //                   <div
// //                     className={cn(
// //                       "absolute -inset-2 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-700",
// //                       colors.glow,
// //                     )}
// //                   />

// //                   {/* Badge */}
// //                   {option.badge && (
// //                     <div className="absolute top-4 right-4">
// //                       <span
// //                         className={cn(
// //                           "px-3 py-1 rounded-full text-white text-[8px] font-black uppercase tracking-wider shadow-md",
// //                           getBadgeStyles(option.badge),
// //                         )}
// //                       >
// //                         {option.badge}
// //                       </span>
// //                     </div>
// //                   )}

// //                   {/* Icon */}
// //                   <div className="relative mb-5">
// //                     <div
// //                       className={cn(
// //                         "absolute inset-0 opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-500 rounded-xl",
// //                         colors.ring,
// //                       )}
// //                     />
// //                     <div
// //                       className={cn(
// //                         "relative w-14 h-14 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-md group-hover:shadow-lg",
// //                         colors.bg,
// //                       )}
// //                     >
// //                       <Icon className={cn("w-7 h-7", colors.text)} />
// //                     </div>
// //                   </div>

// //                   {/* Title */}
// //                   <h3 className="font-black text-xl md:text-2xl mb-1 group-hover:text-purple-600 transition-colors">
// //                     {option.title}
// //                   </h3>

// //                   {/* Schedule */}
// //                   <div className="space-y-1 mb-4">
// //                     <p className="text-sm font-black">{option.schedule}</p>
// //                     <p className="text-xs text-muted-foreground">
// //                       {option.time}
// //                     </p>
// //                   </div>

// //                   {/* Features */}
// //                   <div className="space-y-1.5 mb-6">
// //                     {option.features.map((feature, idx) => (
// //                       <div
// //                         key={idx}
// //                         className="flex items-center gap-2 text-sm"
// //                       >
// //                         <Check className="w-3.5 h-3.5 text-amber-500 shrink-0" />
// //                         <span className="text-muted-foreground">{feature}</span>
// //                       </div>
// //                     ))}
// //                   </div>

// //                   {/* CTA */}
// //                   <Link href="/onsite/admissions">
// //                     <Button
// //                       className={cn(
// //                         "w-full rounded-xl py-3 font-black text-sm text-white shadow-md hover:shadow-lg transition-all group/btn",
// //                         colors.linear,
// //                         colors.hoverFrom,
// //                         colors.hoverTo,
// //                       )}
// //                     >
// //                       Apply Now
// //                       <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
// //                     </Button>
// //                   </Link>

// //                   {/* Decorative Line */}
// //                   <div
// //                     className={cn(
// //                       "absolute bottom-0 left-0 right-0 h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left",
// //                       colors.linear,
// //                     )}
// //                   />
// //                 </motion.div>
// //               </Reveal>
// //             );
// //           })}
// //         </div>

// //         {/* Flexible Options */}
// //         <Reveal delay={0.3}>
// //           <div className="mt-14 max-w-4xl mx-auto">
// //             <div className="text-center mb-6">
// //               <h3 className="text-2xl font-black mb-2">
// //                 Flexible &amp; Custom Options
// //               </h3>
// //               <p className="text-sm text-muted-foreground">
// //                 {`Can't find what you're looking for? We offer flexible solutions to accommodate your unique needs.`}
// //               </p>
// //             </div>
// //             <div className="grid sm:grid-cols-3 gap-4">
// //               {FLEXIBLE_OPTIONS.map((option, idx) => {
// //                 const Icon = option.icon;
// //                 const colors = getColorStyles(option.color);
// //                 return (
// //                   <motion.div
// //                     key={idx}
// //                     whileHover={{ y: -3 }}
// //                     className={cn(
// //                       "bg-card rounded-xl border p-5 text-center group hover:shadow-lg transition-all",
// //                       colors.border,
// //                     )}
// //                   >
// //                     <div
// //                       className={cn(
// //                         "w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform",
// //                         colors.bg,
// //                       )}
// //                     >
// //                       <Icon className={cn("w-6 h-6", colors.text)} />
// //                     </div>
// //                     <p className="font-black text-sm">{option.title}</p>
// //                     <p className="text-xs text-muted-foreground mt-1">
// //                       {option.description}
// //                     </p>
// //                   </motion.div>
// //                 );
// //               })}
// //             </div>
// //           </div>
// //         </Reveal>

// //         {/* Bottom CTA */}
// //         <Reveal delay={0.4}>
// //           <div className="mt-12 text-center">
// //             <div className="inline-flex flex-wrap items-center justify-center gap-3 px-5 py-3 rounded-full bg-linear-to-r from-purple-50/30 to-amber-50/30 dark:from-purple-950/20 dark:to-amber-950/20 border border-purple-200 dark:border-purple-800">
// //               <Sparkles className="w-4 h-4 text-amber-500" />
// //               <span className="text-xs font-medium text-muted-foreground">
// //                 Need a custom schedule? Contact us to discuss your needs
// //               </span>
// //               <Link href="/physical/contact">
// //                 <Button
// //                   variant="outline"
// //                   className="rounded-full px-4 py-1.5 font-black text-xs border-purple-300 text-purple-600"
// //                 >
// //                   Contact Us
// //                 </Button>
// //               </Link>
// //             </div>
// //           </div>
// //         </Reveal>
// //       </div>
// //     </section>
// //   );
// // }












// // app/(marketing)/physical/components/sections/PhysicalAttendance.tsx
// "use client";

// import { Reveal } from "@/components/shared/section-animation";
// import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
// import {
//   Calendar,
//   Sun,
//   Moon,
//   Sparkles,
//   Check,
//   ArrowRight,
//   Zap,
//   Crown,
//   Star,
// } from "lucide-react";
// import Link from "next/link";
// import { Button } from "@/components/ui/button";
// import { cn } from "@/lib/utils";
// import { useState, useRef, MouseEvent } from "react";

// /* ------------------------------------------------------------------ */
// /*  DATA                                                               */
// /* ------------------------------------------------------------------ */

// const ATTENDANCE_OPTIONS = [
//   {
//     id: "day-part-time",
//     title: "Part-Time Day",
//     type: "day",
//     schedule: "Saturday – Sunday",
//     time: "9:00 AM – 4:30 PM",
//     icon: Sun,
//     accent: "amber",
//     badge: "Weekend Only",
//     features: [
//       "2 days per week",
//       "Full academic program",
//       "Tahfeedh & Tajweed",
//       "Islamic Studies",
//     ],
//   },
//   {
//     id: "day-full-time",
//     title: "Full-Time Day",
//     type: "day",
//     schedule: "Sat – Sun & Mon – Wed",
//     time: "Sat–Sun 9:00–4:30 · Mon–Wed 4:30–6:30",
//     icon: Sun,
//     accent: "purple",
//     badge: "Most Popular",
//     features: [
//       "5 days per week",
//       "Extended learning hours",
//       "Complete curriculum",
//       "Accelerated progress",
//     ],
//   },
//   {
//     id: "boarding-part-time",
//     title: "Part-Time Boarding",
//     type: "boarding",
//     schedule: "Friday – Sunday",
//     time: "Fri 4:30 PM – Sun 4:30 PM",
//     icon: Moon,
//     accent: "amber",
//     badge: "Weekend Intensive",
//     features: [
//       "Weekend immersion",
//       "On-campus accommodation",
//       "Full supervision",
//       "Community experience",
//     ],
//   },
//   {
//     id: "boarding-full-time",
//     title: "Full-Time Boarding",
//     type: "boarding",
//     schedule: "Daily",
//     time: "Full-time residential",
//     icon: Moon,
//     accent: "purple",
//     badge: "Premium",
//     features: [
//       "Full-time campus living",
//       "Immersive environment",
//       "24/7 supervision",
//       "Accelerated memorization",
//     ],
//   },
// ] as const;

// const FLEXIBLE_OPTIONS = [
//   {
//     title: "Custom Schedule",
//     description: "Tailored attendance plan to fit your family's needs",
//     icon: Crown,
//     accent: "purple",
//   },
//   {
//     title: "Flexible Days",
//     description: "Choose specific days that work for you",
//     icon: Calendar,
//     accent: "amber",
//   },
//   {
//     title: "Hybrid Learning",
//     description: "Combine day and boarding elements",
//     icon: Zap,
//     accent: "purple",
//   },
// ] as const;

// const FILTERS = [
//   { id: "all", label: "All Options", icon: Sparkles },
//   { id: "day", label: "Day Programmes", icon: Sun },
//   { id: "boarding", label: "Boarding", icon: Moon },
// ] as const;

// /* ------------------------------------------------------------------ */
// /*  STYLE MAPS                                                         */
// /* ------------------------------------------------------------------ */

// type Accent = "purple" | "amber";

// const ACCENT: Record<
//   Accent,
//   {
//     text: string;
//     ring: string;
//     border: string;
//     glow: string;
//     surface: string;
//     linear: string;
//     softGlow: string;
//     dot: string;
//   }
// > = {
//   purple: {
//     text: "text-purple-600 dark:text-purple-300",
//     ring: "ring-purple-500/20",
//     border: "border-purple-200/70 dark:border-purple-800/60",
//     glow: "shadow-[0_0_60px_-15px_rgba(147,51,234,0.45)]",
//     surface:
//       "bg-linear-to-br from-white/80 to-purple-50/60 dark:from-purple-950/30 dark:to-purple-900/10",
//     linear: "from-purple-600 via-purple-600 to-fuchsia-600",
//     softGlow: "bg-purple-500/20",
//     dot: "bg-purple-500",
//   },
//   amber: {
//     text: "text-amber-600 dark:text-amber-300",
//     ring: "ring-amber-500/20",
//     border: "border-amber-200/70 dark:border-amber-800/60",
//     glow: "shadow-[0_0_60px_-15px_rgba(245,158,11,0.45)]",
//     surface:
//       "bg-linear-to-br from-white/80 to-amber-50/60 dark:from-amber-950/30 dark:to-amber-900/10",
//     linear: "from-amber-500 via-amber-500 to-orange-500",
//     softGlow: "bg-amber-500/20",
//     dot: "bg-amber-500",
//   },
// };

// const getAccent = (a: string) => ACCENT[(a as Accent) in ACCENT ? (a as Accent) : "purple"];

// /* ------------------------------------------------------------------ */
// /*  SPOTLIGHT CARD                                                     */
// /* ------------------------------------------------------------------ */

// function SpotlightCard({
//   children,
//   accent,
//   className,
// }: {
//   children: React.ReactNode;
//   accent: Accent;
//   className?: string;
// }) {
//   const ref = useRef<HTMLDivElement>(null);
//   const mx = useMotionValue(0);
//   const my = useMotionValue(0);
//   const a = ACCENT[accent];

//   function onMove(e: MouseEvent<HTMLDivElement>) {
//     if (!ref.current) return;
//     const r = ref.current.getBoundingClientRect();
//     mx.set(e.clientX - r.left);
//     my.set(e.clientY - r.top);
//   }

//   const background = useMotionTemplate`radial-linear(420px circle at ${mx}px ${my}px, ${
//     accent === "purple" ? "rgba(147,51,234,0.10)" : "rgba(245,158,11,0.10)"
//   }, transparent 70%)`;

//   return (
//     <motion.div
//       ref={ref}
//       onMouseMove={onMove}
//       whileHover={{ y: -6 }}
//       transition={{ type: "spring", stiffness: 260, damping: 22 }}
//       className={cn(
//         "group relative overflow-hidden rounded-3xl border bg-card/60 backdrop-blur-xl",
//         a.border,
//         "shadow-[0_1px_0_0_rgba(255,255,255,0.06)_inset,0_20px_60px_-30px_rgba(0,0,0,0.35)]",
//         "hover:shadow-[0_1px_0_0_rgba(255,255,255,0.08)_inset,0_30px_80px_-40px_rgba(0,0,0,0.45)]",
//         "transition-shadow duration-500",
//         className
//       )}
//     >
//       {/* spotlight */}
//       <motion.div
//         aria-hidden
//         style={{ background }}
//         className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
//       />
//       {/* animated linear border */}
//       <div
//         aria-hidden
//         className={cn(
//           "pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100",
//           "bg-linear-to-r p-px",
//           `bg-linear-to-r ${a.linear}`
//         )}
//         style={{
//           WebkitMask:
//             "linear-linear(#000 0 0) content-box, linear-linear(#000 0 0)",
//           WebkitMaskComposite: "xor",
//           maskComposite: "exclude",
//         }}
//       />
//       {children}
//     </motion.div>
//   );
// }

// /* ------------------------------------------------------------------ */
// /*  MAIN                                                               */
// /* ------------------------------------------------------------------ */

// export function PhysicalAttendance() {
//   const [activeType, setActiveType] =
//     useState<(typeof FILTERS)[number]["id"]>("all");

//   const filtered = ATTENDANCE_OPTIONS.filter(
//     (o) => activeType === "all" || o.type === activeType
//   );

//   return (
//     <section className="relative overflow-hidden py-20 sm:py-24 md:py-28 lg:py-32">
//       {/* ambient background */}
//       <div className="pointer-events-none absolute inset-0">
//         <div className="absolute inset-0 bg-linear-to-b from-background via-background to-background" />
//         <div className="absolute -top-40 right-0 h-[520px] w-[520px] rounded-full bg-purple-600/10 blur-[120px] dark:bg-purple-600/20" />
//         <div className="absolute -bottom-40 left-0 h-[520px] w-[520px] rounded-full bg-amber-500/10 blur-[120px] dark:bg-amber-500/15" />
//         {/* subtle grid */}
//         <div
//           className="absolute inset-0 opacity-[0.035] dark:opacity-[0.06]"
//           style={{
//             backgroundImage:
//               "linear-linear(to right, currentColor 1px, transparent 1px), linear-linear(to bottom, currentColor 1px, transparent 1px)",
//             backgroundSize: "56px 56px",
//             maskImage:
//               "radial-linear(ellipse at center, black 40%, transparent 75%)",
//             WebkitMaskImage:
//               "radial-linear(ellipse at center, black 40%, transparent 75%)",
//           }}
//         />
//       </div>

//       <div className="container relative z-10 mx-auto px-4 xs:px-5 sm:px-6">
//         {/* ---------------- HEADER ---------------- */}
//         <Reveal>
//           <div className="mx-auto mb-14 max-w-3xl text-center md:mb-20">
//             <motion.div
//               initial={{ opacity: 0, y: 12 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6 }}
//               className="mb-5 inline-flex items-center gap-2 rounded-full border border-purple-200/60 bg-white/60 px-4 py-1.5 backdrop-blur-md dark:border-purple-800/50 dark:bg-purple-950/30"
//             >
//               <span className="relative flex h-1.5 w-1.5">
//                 <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" />
//                 <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-amber-500" />
//               </span>
//               <span className="text-[10px] font-black uppercase tracking-[0.18em] text-purple-700 dark:text-purple-300">
//                 Attendance Options
//               </span>
//             </motion.div>

//             <h2 className="font-heading text-4xl font-black leading-[1.05] tracking-tighter md:text-5xl lg:text-6xl">
//               Choose Your{" "}
//               <span className="relative inline-block">
//                 <span className="bg-linear-to-r from-purple-600 via-fuchsia-600 to-amber-500 bg-clip-text italic text-transparent">
//                   Schedule
//                 </span>
//                 <motion.span
//                   initial={{ scaleX: 0 }}
//                   whileInView={{ scaleX: 1 }}
//                   viewport={{ once: true }}
//                   transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" }}
//                   className="absolute -bottom-2 left-0 h-[3px] w-full origin-left rounded-full bg-linear-to-r from-purple-500/60 via-fuchsia-500/50 to-amber-400/60"
//                 />
//               </span>
//             </h2>

//             <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
//               Flexible attendance built around your family&apos;s rhythm —
//               from weekend intensives to full residential immersion.
//             </p>
//           </div>
//         </Reveal>

//         {/* ---------------- SEGMENTED FILTER ---------------- */}
//         <Reveal delay={0.1}>
//           <div className="mb-12 flex justify-center">
//             <div className="relative flex items-center gap-1 rounded-2xl border border-purple-200/60 bg-white/70 p-1.5 shadow-lg shadow-purple-500/5 backdrop-blur-xl dark:border-purple-800/50 dark:bg-purple-950/20">
//               {FILTERS.map((f) => {
//                 const Icon = f.icon;
//                 const isActive = activeType === f.id;
//                 return (
//                   <button
//                     key={f.id}
//                     onClick={() => setActiveType(f.id)}
//                     className={cn(
//                       "relative z-10 flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-black uppercase tracking-wider transition-colors sm:px-5 sm:text-[13px]",
//                       isActive
//                         ? "text-white"
//                         : "text-muted-foreground hover:text-purple-600 dark:hover:text-purple-300"
//                     )}
//                   >
//                     {isActive && (
//                       <motion.span
//                         layoutId="filter-pill"
//                         transition={{
//                           type: "spring",
//                           stiffness: 400,
//                           damping: 34,
//                         }}
//                         className="absolute inset-0 -z-10 rounded-xl bg-linear-to-r from-purple-600 via-purple-600 to-fuchsia-600 shadow-md shadow-purple-600/30"
//                       />
//                     )}
//                     <Icon className="h-3.5 w-3.5" />
//                     <span className="hidden xs:inline">{f.label}</span>
//                   </button>
//                 );
//               })}
//             </div>
//           </div>
//         </Reveal>

//         {/* ---------------- CARDS ---------------- */}
//         <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
//           {filtered.map((option, index) => {
//             const Icon = option.icon;
//             const a = getAccent(option.accent);
//             const isPopular = option.badge === "Most Popular";
//             const isPremium = option.badge === "Premium";

//             return (
//               <Reveal key={option.id} delay={index * 0.07}>
//                 <SpotlightCard accent={option.accent} className="h-full">
//                   {/* ribbon for popular / premium */}
//                   {(isPopular || isPremium) && (
//                     <div
//                       className={cn(
//                         "absolute right-0 top-0 z-20 flex items-center gap-1 rounded-bl-2xl rounded-tr-3xl bg-linear-to-r px-3 py-1.5 text-[9px] font-black uppercase tracking-wider text-white shadow-lg",
//                         isPopular
//                           ? "from-amber-500 to-orange-500 shadow-amber-500/30"
//                           : "from-purple-600 to-fuchsia-600 shadow-purple-600/30"
//                       )}
//                     >
//                       <Star className="h-3 w-3 fill-white" />
//                       {option.badge}
//                     </div>
//                   )}

//                   <div className="relative z-10 p-6 sm:p-7 md:p-8">
//                     {/* icon + badge row */}
//                     <div className="mb-5 flex items-start justify-between">
//                       <div className="relative">
//                         <div
//                           className={cn(
//                             "absolute inset-0 rounded-2xl opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100",
//                             a.softGlow
//                           )}
//                         />
//                         <div
//                           className={cn(
//                             "relative flex h-14 w-14 items-center justify-center rounded-2xl border ring-1 transition-transform duration-500 group-hover:scale-105 group-hover:-rotate-3",
//                             a.border,
//                             a.ring,
//                             a.surface
//                           )}
//                         >
//                           <Icon className={cn("h-6 w-6", a.text)} />
//                         </div>
//                       </div>

//                       {!isPopular && !isPremium && option.badge && (
//                         <span
//                           className={cn(
//                             "rounded-full border px-2.5 py-1 text-[9px] font-black uppercase tracking-wider",
//                             a.border,
//                             a.text,
//                             "bg-white/60 dark:bg-white/5"
//                           )}
//                         >
//                           {option.badge}
//                         </span>
//                       )}
//                     </div>

//                     {/* title */}
//                     <h3 className="font-heading text-xl font-black tracking-tight md:text-2xl">
//                       {option.title}
//                     </h3>

//                     {/* schedule */}
//                     <div className="mt-2 space-y-1">
//                       <p className="text-sm font-bold text-foreground/90">
//                         {option.schedule}
//                       </p>
//                       <p className="text-xs text-muted-foreground">
//                         {option.time}
//                       </p>
//                     </div>

//                     {/* divider */}
//                     <div className="my-5 h-px w-full bg-linear-to-r from-transparent via-border to-transparent" />

//                     {/* features */}
//                     <ul className="space-y-2.5">
//                       {option.features.map((feature, i) => (
//                         <li
//                           key={i}
//                           className="flex items-center gap-2.5 text-sm"
//                         >
//                           <span
//                             className={cn(
//                               "flex h-4 w-4 shrink-0 items-center justify-center rounded-full",
//                               a.softGlow
//                             )}
//                           >
//                             <Check
//                               className={cn("h-2.5 w-2.5", a.text)}
//                               strokeWidth={3.5}
//                             />
//                           </span>
//                           <span className="text-muted-foreground">
//                             {feature}
//                           </span>
//                         </li>
//                       ))}
//                     </ul>

//                     {/* CTA */}
//                     <Button
//                       asChild
//                       className={cn(
//                         "group/btn mt-7 h-11 w-full rounded-xl bg-linear-to-r font-black text-[13px] uppercase tracking-wider text-white shadow-lg transition-all hover:shadow-xl",
//                         a.linear,
//                         "hover:brightness-110 active:scale-[0.98]"
//                       )}
//                     >
//                       <Link href="/onsite/admissions">
//                         Apply Now
//                         <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
//                       </Link>
//                     </Button>
//                   </div>

//                   {/* bottom accent line */}
//                   <div
//                     className={cn(
//                       "absolute bottom-0 left-0 right-0 h-[3px] origin-left scale-x-0 bg-linear-to-r transition-transform duration-700 group-hover:scale-x-100",
//                       a.linear
//                     )}
//                   />
//                 </SpotlightCard>
//               </Reveal>
//             );
//           })}
//         </div>

//         {/* ---------------- FLEXIBLE OPTIONS ---------------- */}
//         <Reveal delay={0.2}>
//           <div className="mx-auto mt-20 max-w-4xl">
//             <div className="mb-8 text-center">
//               <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-border/60 bg-muted/40 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-muted-foreground">
//                 <Sparkles className="h-3 w-3 text-amber-500" />
//                 Beyond the standard
//               </div>
//               <h3 className="font-heading text-2xl font-black tracking-tight md:text-3xl">
//                 Flexible &amp; Custom Options
//               </h3>
//               <p className="mx-auto mt-2 max-w-xl text-sm text-muted-foreground">
//                 Can&apos;t find the perfect fit? We design bespoke schedules
//                 around your family&apos;s needs.
//               </p>
//             </div>

//             <div className="grid gap-4 sm:grid-cols-3">
//               {FLEXIBLE_OPTIONS.map((option, idx) => {
//                 const Icon = option.icon;
//                 const a = getAccent(option.accent);
//                 return (
//                   <motion.div
//                     key={idx}
//                     whileHover={{ y: -4 }}
//                     transition={{ type: "spring", stiffness: 300, damping: 20 }}
//                     className={cn(
//                       "group relative overflow-hidden rounded-2xl border bg-card/60 p-5 text-center backdrop-blur-md transition-all hover:shadow-xl",
//                       a.border
//                     )}
//                   >
//                     <div
//                       className={cn(
//                         "absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100",
//                         a.surface
//                       )}
//                     />
//                     <div className="relative">
//                       <div
//                         className={cn(
//                           "mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl border ring-1 transition-transform duration-500 group-hover:scale-110",
//                           a.border,
//                           a.ring,
//                           a.surface
//                         )}
//                       >
//                         <Icon className={cn("h-5 w-5", a.text)} />
//                       </div>
//                       <p className="text-sm font-black">{option.title}</p>
//                       <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
//                         {option.description}
//                       </p>
//                     </div>
//                   </motion.div>
//                 );
//               })}
//             </div>
//           </div>
//         </Reveal>

//         {/* ---------------- BOTTOM CTA ---------------- */}
//         <Reveal delay={0.3}>
//           <div className="mt-16 flex justify-center">
//             <div className="group relative overflow-hidden rounded-2xl border border-purple-200/60 bg-linear-to-r from-purple-50/60 via-white/60 to-amber-50/60 p-1 backdrop-blur-md dark:border-purple-800/50 dark:from-purple-950/30 dark:via-background dark:to-amber-950/20">
//               <div className="flex flex-wrap items-center justify-center gap-4 rounded-xl px-5 py-3">
//                 <Sparkles className="h-4 w-4 shrink-0 text-amber-500" />
//                 <span className="text-xs font-medium text-muted-foreground sm:text-sm">
//                   Need a custom schedule? Let&apos;s design it together.
//                 </span>
//                 <Button
//                   asChild
//                   variant="outline"
//                   className="h-8 rounded-full border-purple-300/70 bg-white/70 px-4 text-xs font-black uppercase tracking-wider text-purple-700 backdrop-blur transition-all hover:border-purple-400 hover:bg-purple-50 dark:border-purple-700 dark:bg-purple-950/40 dark:text-purple-300 dark:hover:bg-purple-900/50"
//                 >
//                   <Link href="/physical/contact">
//                     Contact Us
//                     <ArrowRight className="ml-1.5 h-3 w-3" />
//                   </Link>
//                 </Button>
//               </div>
//             </div>
//           </div>
//         </Reveal>
//       </div>
//     </section>
//   );
// }







// app/(marketing)/physical/components/sections/PhysicalAttendance.tsx
"use client";

import { Reveal } from "@/components/shared/section-animation";
import { motion } from "framer-motion";
import {
  Sun,
  Moon,
  Clock,
  Check,
  ArrowUpRight,
  Calendar,
  Crown,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useState } from "react";

/* ------------------------------------------------------------------ */
/*  BRAND TOKENS                                                       */
/* ------------------------------------------------------------------ */

const BRAND = {
  purple: "text-purple-700 dark:text-purple-300",
  purpleSoft: "text-purple-600/70 dark:text-purple-300/70",
  purpleWash: "bg-purple-50/40 dark:bg-purple-950/15",
  purpleWashHover: "hover:bg-purple-50/30 dark:hover:bg-purple-950/10",

  gradientText:
    "bg-gradient-to-r from-purple-700 via-purple-600 to-amber-500 bg-clip-text text-transparent dark:from-purple-300 dark:via-purple-300 dark:to-amber-300",
  gradientRule: "bg-gradient-to-r from-purple-600 to-amber-500",
  gradientRuleVert:
    "bg-gradient-to-b from-purple-700 via-purple-600 to-amber-500",
  gradientHairline:
    "bg-gradient-to-r from-purple-600/60 via-amber-500/50 to-transparent",
  gradientButton:
    "bg-gradient-to-r from-purple-700 via-purple-700 to-amber-500 dark:from-purple-600 dark:via-purple-600 dark:to-amber-400",
  gradientButtonHover:
    "hover:from-purple-800 hover:via-purple-800 hover:to-amber-600 dark:hover:from-purple-500 dark:hover:via-purple-500 dark:hover:to-amber-300",
};

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

const OPTIONS = [
  {
    id: "day-part-time",
    title: "Part-Time Day",
    arabic: "الدوام الجزئي",
    type: "day",
    schedule: "Saturday – Sunday",
    time: "9:00 AM – 4:30 PM",
    icon: Sun,
    note: "Weekend attendance",
    features: [
      "Two days per week",
      "Full academic programme",
      "Tahfeedh & Tajweed",
      "Islamic Studies",
    ],
  },
  {
    id: "day-full-time",
    title: "Full-Time Day",
    arabic: "الدوام الكامل",
    type: "day",
    schedule: "Sat – Sun & Mon – Wed",
    time: "Sat–Sun 9:00–4:30 · Mon–Wed 4:30–6:30",
    icon: Sun,
    note: "The standard programme",
    featured: true,
    features: [
      "Five days per week",
      "Extended instruction hours",
      "Complete curriculum",
      "Accelerated progression",
    ],
  },
  {
    id: "boarding-part-time",
    title: "Part-Time Boarding",
    arabic: "الإقامة الجزئية",
    type: "boarding",
    schedule: "Friday – Sunday",
    time: "Fri 4:30 PM – Sun 4:30 PM",
    icon: Moon,
    note: "Weekend residence",
    features: [
      "Weekend immersion",
      "On-campus accommodation",
      "Full supervision",
      "Community life",
    ],
  },
  {
    id: "boarding-full-time",
    title: "Full-Time Boarding",
    arabic: "الإقامة الكاملة",
    type: "boarding",
    schedule: "Daily",
    time: "Full residential programme",
    icon: Moon,
    note: "Residential study",
    features: [
      "Full-time residence",
      "Immersive environment",
      "Continuous supervision",
      "Accelerated memorisation",
    ],
  },
] as const;

const FLEXIBLE = [
  {
    title: "Custom Schedule",
    description: "A tailored attendance plan built around your family.",
    icon: Crown,
  },
  {
    title: "Flexible Days",
    description: "Choose the specific days that work for you.",
    icon: Calendar,
  },
  {
    title: "Hybrid Learning",
    description: "Combine day-programme and boarding elements.",
    icon: Zap,
  },
] as const;

const FILTERS = [
  { id: "all", label: "All structures" },
  { id: "day", label: "Day programme" },
  { id: "boarding", label: "Boarding" },
] as const;

/* ------------------------------------------------------------------ */
/*  COMPONENT                                                          */
/* ------------------------------------------------------------------ */

export function PhysicalAttendance() {
  const [activeType, setActiveType] =
    useState<(typeof FILTERS)[number]["id"]>("all");

  const filtered = OPTIONS.filter(
    (o) => activeType === "all" || o.type === activeType
  );

  return (
    <section className="relative overflow-hidden bg-background py-24 sm:py-28 md:py-32 lg:py-40">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(900px 500px at 15% -10%, hsl(262 83% 58% / 0.05), transparent 60%), radial-gradient(700px 400px at 90% 100%, hsl(43 74% 49% / 0.045), transparent 60%)",
        }}
      />

      <div className="container relative mx-auto px-6 lg:px-8">
        {/* ---------- Colophon header ---------- */}
        <Reveal>
          <div className="mx-auto mb-16 max-w-4xl md:mb-20">
            <div className="mb-10 flex items-center gap-4">
              <span
                aria-hidden
                className={cn("h-px w-10", BRAND.gradientRule)}
              />
              <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-foreground/60">
                Attendance
              </span>
              <span aria-hidden className="h-px flex-1 bg-foreground/10" />
              <span
                dir="rtl"
                lang="ar"
                className="font-arabic text-[13px] leading-none text-foreground/45"
              >
                أنظمة الحضور
              </span>
            </div>

            <h2 className="font-heading text-4xl font-medium leading-[1.08] tracking-[-0.02em] text-foreground sm:text-5xl md:text-[3.5rem] lg:text-[4rem]">
              Four structures,
              <br />
              <span className="text-foreground/40">
                one curriculum —{" "}
                <em
                  className={cn("not-italic font-medium", BRAND.gradientText)}
                >
                  arranged around your life
                </em>
                .
              </span>
            </h2>

            <p className="mt-8 max-w-2xl text-base leading-relaxed text-foreground/60 sm:text-[17px]">
              Every structure covers the same course of study. The difference
              is pace, presence, and how much of the week you give to it.
            </p>
          </div>
        </Reveal>

        {/* ---------- Filter ---------- */}
        <Reveal delay={0.1}>
          <div className="mb-14 flex items-center gap-8 border-b border-foreground/10">
            {FILTERS.map((f) => {
              const isActive = activeType === f.id;
              return (
                <button
                  key={f.id}
                  onClick={() => setActiveType(f.id)}
                  className={cn(
                    "relative -mb-px pb-4 text-[13px] font-medium tracking-wide transition-colors duration-300",
                    isActive
                      ? "text-foreground"
                      : "text-foreground/40 hover:text-foreground/70"
                  )}
                >
                  {f.label}
                  {isActive && (
                    <motion.span
                      layoutId="filter-underline"
                      transition={{
                        type: "spring",
                        stiffness: 420,
                        damping: 34,
                      }}
                      className={cn(
                        "absolute inset-x-0 -bottom-px h-px",
                        BRAND.gradientRule
                      )}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* ---------- Grid ---------- */}
        <div className="grid gap-px overflow-hidden rounded-lg border border-foreground/10 bg-foreground/10 sm:grid-cols-2">
          {filtered.map((option, index) => {
            const Icon = option.icon;
            const isFeatured = "featured" in option && option.featured;

            return (
              <Reveal key={option.id} delay={index * 0.05}>
                <div
                  className={cn(
                    "group relative flex h-full flex-col p-8 transition-colors duration-300 sm:p-10",
                    isFeatured
                      ? BRAND.purpleWash
                      : cn("bg-background", BRAND.purpleWashHover)
                  )}
                >
                  {/* featured accent bar */}
                  {isFeatured && (
                    <span
                      aria-hidden
                      className={cn(
                        "absolute inset-y-0 left-0 w-px",
                        BRAND.gradientRuleVert
                      )}
                    />
                  )}

                  {/* top row — index · Arabic · icon */}
                  <div className="mb-10 flex items-start justify-between">
                    <span
                      className={cn(
                        "bg-clip-text text-[11px] font-medium tabular-nums tracking-[0.2em]",
                        "bg-gradient-to-br from-purple-600/50 to-amber-500/40 text-transparent"
                      )}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <div className="flex items-center gap-4">
                      <span
                        dir="rtl"
                        lang="ar"
                        className="font-arabic text-[18px] leading-none text-foreground/35 transition-colors duration-300 group-hover:text-foreground/55"
                      >
                        {option.arabic}
                      </span>
                      <Icon
                        className={cn(
                          "h-[18px] w-[18px] transition-colors duration-300",
                          isFeatured
                            ? BRAND.purple
                            : cn(
                                BRAND.purpleSoft,
                                "group-hover:text-purple-700 dark:group-hover:text-purple-300"
                              )
                        )}
                        strokeWidth={1.5}
                      />
                    </div>
                  </div>

                  {/* title block */}
                  <div className="mb-6">
                    <div className="mb-2 flex items-center gap-3">
                      <h3
                        className={cn(
                          "font-heading text-[22px] font-medium tracking-[-0.01em] text-foreground",
                          !isFeatured &&
                            "transition-colors duration-300 group-hover:text-purple-700 dark:group-hover:text-purple-300"
                        )}
                      >
                        {option.title}
                      </h3>
                      {isFeatured && (
                        <span className="rounded-full border border-purple-700/30 bg-gradient-to-r from-purple-700/5 to-amber-500/5 px-2 py-0.5 text-[9px] font-medium uppercase tracking-[0.15em] text-purple-700 dark:border-purple-300/30 dark:text-purple-300">
                          {option.note}
                        </span>
                      )}
                    </div>
                    {!isFeatured && (
                      <p className="text-[13px] text-foreground/50">
                        {option.note}
                      </p>
                    )}
                  </div>

                  {/* schedule */}
                  <div className="mb-8 space-y-1.5 border-l border-foreground/10 pl-4">
                    <p className="text-[13px] font-medium text-foreground/85">
                      {option.schedule}
                    </p>
                    <p className="text-[12px] leading-relaxed text-foreground/50">
                      {option.time}
                    </p>
                  </div>

                  {/* features */}
                  <ul className="mb-8 flex-1 space-y-2.5">
                    {option.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-3 text-[13px] leading-relaxed text-foreground/65"
                      >
                        <Check
                          className={cn(
                            "mt-[3px] h-[13px] w-[13px] shrink-0",
                            BRAND.purpleSoft
                          )}
                          strokeWidth={2}
                        />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* footer CTA */}
                  <Link
                    href="/onsite/admissions"
                    className="group/btn flex items-center justify-between border-t border-foreground/10 pt-5 focus:outline-none"
                  >
                    <span className="text-[12px] font-medium tracking-wide text-foreground/60 transition-colors duration-300 group-hover/btn:text-purple-700 dark:group-hover/btn:text-purple-300">
                      Apply
                    </span>
                    <span
                      className={cn(
                        "flex h-7 w-7 items-center justify-center rounded-full border border-foreground/15 text-foreground/60 transition-all duration-300",
                        "group-hover/btn:border-transparent group-hover/btn:text-white",
                        "group-hover/btn:bg-gradient-to-br group-hover/btn:from-purple-700 group-hover/btn:to-amber-500"
                      )}
                    >
                      <ArrowUpRight
                        className="h-[13px] w-[13px] transition-transform duration-300 group-hover/btn:-translate-y-px group-hover/btn:translate-x-px"
                        strokeWidth={1.5}
                      />
                    </span>
                  </Link>

                  {/* hover hairline */}
                  <span
                    aria-hidden
                    className={cn(
                      "pointer-events-none absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100",
                      BRAND.gradientHairline
                    )}
                  />
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* ---------- Flexible options ---------- */}
        <Reveal delay={0.2}>
          <div className="mt-20 border-t border-foreground/10 pt-12">
            <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <div className="mb-3 flex items-center gap-3">
                  <span
                    aria-hidden
                    className="h-px w-8 bg-gradient-to-r from-purple-600/60 to-amber-500/60"
                  />
                  <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-foreground/40">
                    Beyond the four
                  </span>
                </div>
                <h3 className="font-heading text-2xl font-medium tracking-[-0.01em] text-foreground sm:text-[28px]">
                  Bespoke arrangements
                </h3>
              </div>
              <p className="max-w-md text-[13px] leading-relaxed text-foreground/50">
                If none of the standard structures fit, we design attendance
                around your circumstances.
              </p>
            </div>

            <div className="grid gap-px overflow-hidden rounded-lg border border-foreground/10 bg-foreground/10 sm:grid-cols-3">
              {FLEXIBLE.map((option) => {
                const Icon = option.icon;
                return (
                  <div
                    key={option.title}
                    className={cn(
                      "group flex flex-col bg-background p-6 transition-colors duration-300 sm:p-7",
                      BRAND.purpleWashHover
                    )}
                  >
                    <Icon
                      className={cn(
                        "mb-6 h-[18px] w-[18px] transition-colors duration-300",
                        BRAND.purpleSoft,
                        "group-hover:text-purple-700 dark:group-hover:text-purple-300"
                      )}
                      strokeWidth={1.5}
                    />
                    <p className="font-heading text-[16px] font-medium text-foreground">
                      {option.title}
                    </p>
                    <p className="mt-2 text-[13px] leading-relaxed text-foreground/55">
                      {option.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </Reveal>

        {/* ---------- Footer note ---------- */}
        <Reveal delay={0.3}>
          <div className="mt-16 flex flex-col items-start justify-between gap-6 border-t border-foreground/10 pt-10 sm:flex-row sm:items-center">
            <div className="flex items-start gap-3">
              <Clock
                className="mt-0.5 h-[14px] w-[14px] text-amber-500/80"
                strokeWidth={1.5}
              />
              <p className="max-w-xl text-[13px] leading-relaxed text-foreground/50">
                Schedules follow the academic calendar. Mid-year entry is
                considered case by case — please speak with the administration.
              </p>
            </div>

            <Link
              href="/physical/contact"
              className={cn(
                "group inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[13px] font-medium tracking-wide text-white shadow-sm transition-all duration-300",
                BRAND.gradientButton,
                BRAND.gradientButtonHover
              )}
            >
              Discuss your schedule
              <ArrowUpRight
                className="h-[14px] w-[14px] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                strokeWidth={1.5}
              />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}