
// // app/(marketing)/onsite/components/layout/OnsiteHeader.tsx
// "use client";

// import { useState, useEffect } from "react";
// import { useTheme } from "next-themes";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   BookOpen,
//   ChevronDown,
//   Sun,
//   Moon,
//   Menu,
//   X,
//   Sparkles,
//   RefreshCw,
//   Phone,
//   Mail,
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { cn } from "@/lib/utils";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import Image from "next/image";
// import Logo from "@/public/logo.png";


// // Navigation - Same structure as online
// const NAVIGATION = [
//   { name: "Home", href: "/onsite" },
//   { name: "About", href: "/onsite/about" },
//   {
//     name: "Programs",
//     href: "/onsite/programs",
//     dropdown: true,
//   },
//   { name: "Boarding", href: "/onsite/boarding" },
//   { name: "Student Life", href: "/onsite/student-life" },
//   { name: "Admissions", href: "/onsite/admissions" },
// ];

// // Mega menu data - Onsite specific
// const MEGA_MENU = {
//   featured: {
//     name: "ALL PROGRAMS",
//     href: "/onsite/programs",
//     desc: "Browse our complete catalog",
//     icon: BookOpen,
//   },
//   attendanceOptions: [
//     {
//       name: "Part-Time Day",
//       href: "/onsite/programs/part-time-day",
//       icon: Sun,
//       desc: "Sat-Sun: 9AM - 4:30PM",
//     },
//     {
//       name: "Full-Time Day",
//       href: "/onsite/programs/full-time-day",
//       icon: Sun,
//       desc: "Sat-Sun (9-4:30) + Mon-Wed (4:30-6:30)",
//     },
//     {
//       name: "Part-Time Boarding",
//       href: "/onsite/programs/part-time-boarding",
//       icon: Moon,
//       desc: "Fri 4:30PM - Sun 4:30PM",
//     },
//     {
//       name: "Full-Time Boarding",
//       href: "/onsite/programs/full-time-boarding",
//       icon: Moon,
//       desc: "Full-time residential program",
//     },
//     {
//       name: "Flexible / Custom",
//       href: "/onsite/programs/flexible",
//       icon: RefreshCw,
//       desc: "Tailored schedule to fit your needs",
//     },
//   ],
//   groupPrograms: [
//     {
//       name: "Day Programme",
//       href: "/onsite/programs/day",
//       icon: Sun,
//       desc: "Weekends + Evenings",
//       badge: "Popular",
//     },
//     {
//       name: "Boarding Programme",
//       href: "/onsite/programs/boarding",
//       icon: Moon,
//       desc: "Full-time residential",
//       badge: "Recommended",
//     },
//   ],
// };

// // Throttle function
// function throttle<T extends (...args: unknown[]) => unknown>(
//   func: T,
//   limit: number,
// ): (...args: Parameters<T>) => void {
//   let inThrottle: boolean;
//   return function (this: unknown, ...args: Parameters<T>) {
//     if (!inThrottle) {
//       func.apply(this, args);
//       inThrottle = true;
//       setTimeout(() => (inThrottle = false), limit);
//     }
//   };
// }

// export function OnsiteHeader() {
//   const { theme, setTheme } = useTheme();
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [mobileDropdownOpen, setMobileDropdownOpen] = useState<string | null>(
//     null,
//   );
//   const [mounted, setMounted] = useState(false);
//   const pathname = usePathname();

//   useEffect(() => {
//     setMounted(true);

//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 20);
//     };

//     const throttledScroll = throttle(handleScroll, 100);
//     window.addEventListener("scroll", throttledScroll, { passive: true });
//     return () => window.removeEventListener("scroll", throttledScroll);
//   }, []);

//   useEffect(() => {
//     if (mobileMenuOpen) {
//       document.body.style.overflow = "hidden";
//     } else {
//       document.body.style.overflow = "";
//     }
//     return () => {
//       document.body.style.overflow = "";
//     };
//   }, [mobileMenuOpen]);

//   useEffect(() => {
//     setMobileMenuOpen(false);
//     setActiveDropdown(null);
//     setMobileDropdownOpen(null);
//   }, [pathname]);

//   useEffect(() => {
//     const handleEscape = (e: KeyboardEvent) => {
//       if (e.key === "Escape" && mobileMenuOpen) {
//         setMobileMenuOpen(false);
//       }
//     };
//     window.addEventListener("keydown", handleEscape);
//     return () => window.removeEventListener("keydown", handleEscape);
//   }, [mobileMenuOpen]);

//   const toggleMobileDropdown = (name: string) => {
//     setMobileDropdownOpen(mobileDropdownOpen === name ? null : name);
//   };

//   return (
//     <>
//       <header
//         className={cn(
//           "fixed top-0 left-0 right-0 z-50 w-full transition-all duration-500 flex items-center",
//           isScrolled
//             ? "bg-slate-950/95 backdrop-blur-md border-b border-white/10 py-2 h-20"
//             : "bg-transparent py-4 h-24",
//           "pt-safe",
//         )}
//       >
//         <nav className="container mx-auto px-4 md:px-6 flex items-center justify-between">

          
//           {/* --- LOGO SECTION --- */}
//           <Link
//             href="/onsite"
//             className="flex items-center space-x-3 md:space-x-4 relative z-60 group outline-none min-h-11 min-w-11"
//             onClick={() => setMobileMenuOpen(false)}
//             aria-label="Daar-ul-Maysaroh - Home"
//           >
//              <div className="relative">
//                                         <div className="absolute inset-0 bg-linear-to-r from-purple-600 to-amber-500 rounded-2xl blur-md opacity-50 group-hover:opacity-100 transition-opacity" />
//                                         <Image
//                                           src={Logo}
//                                           width={100}
//                                           height={100}
//                                           alt="Al-Maysaroh Institute Logo"
//                                           className="relative w-10 h-10 md:w-12 md:h-12 bg-linear-to-br from-purple-600 to-amber-500 rounded-2xl flex items-center justify-center shadow-2xl group-hover:scale-105 group-hover:rotate-3 transition-all duration-300"
//                                         />
//                                       </div>
//             <div className="hidden lg:flex flex-col">
//               <h1 className="text-lg md:text-xl lg:text-2xl font-black tracking-tighter leading-none bg-linear-to-r from-white to-purple-300 bg-clip-text text-transparent">
//                 AL-MAYSAROH
//               </h1>
//               <p className="text-[8px] md:text-[10px] text-amber-500 font-bold tracking-[0.3em] md:tracking-[0.4em] uppercase">
//                 Institute (onsite).
//               </p>
//             </div>
//           </Link>

//           {/* --- DESKTOP NAVIGATION --- */}
//           <ul className="hidden xl:flex items-center space-x-1">
//             {NAVIGATION.map((item) => {
//               const isActive = pathname === item.href;

//               return (
//                 <li
//                   key={item.name}
//                   className="relative"
//                   onMouseEnter={() =>
//                     item.dropdown && setActiveDropdown(item.name)
//                   }
//                   onMouseLeave={() => setActiveDropdown(null)}
//                   onFocus={() => item.dropdown && setActiveDropdown(item.name)}
//                   onBlur={(e) => {
//                     if (!e.currentTarget.contains(e.relatedTarget as Node)) {
//                       setActiveDropdown(null);
//                     }
//                   }}
//                 >
//                   <Link
//                     href={item.href}
//                     aria-expanded={activeDropdown === item.name}
//                     aria-haspopup={item.dropdown ? "true" : "false"}
//                     aria-current={isActive ? "page" : undefined}
//                     className={cn(
//                       "px-4 py-3 text-[13px] font-black flex items-center gap-1 transition-all uppercase tracking-wider outline-none min-h-11 rounded-lg",
//                       "focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 focus-visible:outline-none",
//                       activeDropdown === item.name || isActive
//                         ? "text-amber-500 bg-white/5"
//                         : "text-slate-300 hover:text-white hover:bg-white/5",
//                     )}
//                   >
//                     {item.name}
//                     {item.dropdown && (
//                       <ChevronDown
//                         className={cn(
//                           "w-3 h-3 md:w-4 md:h-4 opacity-70 transition-transform",
//                           activeDropdown === item.name && "rotate-180",
//                         )}
//                         aria-hidden="true"
//                       />
//                     )}
//                   </Link>

//                   {/* MEGA MENU DROPDOWN */}
//                   <AnimatePresence>
//                     {item.dropdown && activeDropdown === item.name && (
//                       <motion.div
//                         initial={{ opacity: 0, y: 10, scale: 0.95 }}
//                         animate={{ opacity: 1, y: 0, scale: 1 }}
//                         exit={{ opacity: 0, y: 10, scale: 0.95 }}
//                         className="absolute top-full left-1/2 -translate-x-1/2 w-[90vw] max-w-[1000px] p-8 bg-slate-950 border border-purple-800/30 rounded-2xl shadow-2xl mt-2 z-50 max-h-[85vh] overflow-y-auto custom-scrollbar"
//                         role="menu"
//                       >
//                         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//                           {/* Column 1: Featured */}
//                           <div className="space-y-5">
//                             <div className="text-xs font-black text-amber-500/70 uppercase tracking-[0.3em] mb-3">
//                               FEATURED
//                             </div>
//                             <Link
//                               href={MEGA_MENU.featured.href}
//                               className="block p-5 rounded-xl bg-linear-to-br from-purple-600/10 to-amber-500/10 border border-purple-700/30 hover:border-amber-500/50 transition-all group"
//                             >
//                               <div className="flex items-center gap-4">
//                                 <div className="w-12 h-12 rounded-lg bg-linear-to-br from-purple-600/20 to-amber-500/20 flex items-center justify-center">
//                                   <MEGA_MENU.featured.icon className="w-6 h-6 text-amber-500" />
//                                 </div>
//                                 <div>
//                                   <div className="font-black text-base group-hover:text-amber-500">
//                                     {MEGA_MENU.featured.name}
//                                   </div>
//                                   <div className="text-sm text-slate-400">
//                                     {MEGA_MENU.featured.desc}
//                                   </div>
//                                 </div>
//                                 <Sparkles className="w-5 h-5 text-amber-500 ml-auto opacity-50" />
//                               </div>
//                             </Link>
//                           </div>

//                           {/* Column 2: Attendance Options */}
//                           <div className="space-y-4">
//                             <div className="text-xs font-black text-amber-500/70 uppercase tracking-[0.3em] mb-3">
//                               ATTENDANCE OPTIONS
//                             </div>
//                             <div className="space-y-2">
//                               {MEGA_MENU.attendanceOptions.map((prog) => {
//                                 const Icon = prog.icon;
//                                 return (
//                                   <Link
//                                     key={prog.name}
//                                     href={prog.href}
//                                     className="flex items-center gap-4 p-3 rounded-xl hover:bg-purple-600/10 transition-colors group"
//                                   >
//                                     <div className="w-10 h-10 rounded-lg bg-purple-600/20 flex items-center justify-center">
//                                       <Icon className="w-5 h-5 text-purple-400" />
//                                     </div>
//                                     <div className="flex-1">
//                                       <div className="font-black text-sm group-hover:text-amber-500">
//                                         {prog.name}
//                                       </div>
//                                       <div className="text-xs text-slate-400">
//                                         {prog.desc}
//                                       </div>
//                                     </div>
//                                   </Link>
//                                 );
//                               })}
//                             </div>
//                           </div>

//                           {/* Column 3: Program Types */}
//                           <div className="space-y-4">
//                             <div className="text-xs font-black text-amber-500/70 uppercase tracking-[0.3em] mb-3">
//                               PROGRAM TYPES
//                             </div>
//                             <div className="space-y-2">
//                               {MEGA_MENU.groupPrograms.map((prog) => {
//                                 const Icon = prog.icon;
//                                 return (
//                                   <Link
//                                     key={prog.name}
//                                     href={prog.href}
//                                     className="flex items-center gap-4 p-3 rounded-xl hover:bg-purple-600/10 transition-colors group"
//                                   >
//                                     <div className="w-10 h-10 rounded-lg bg-purple-600/20 flex items-center justify-center">
//                                       <Icon className="w-5 h-5 text-purple-400" />
//                                     </div>
//                                     <div className="flex-1">
//                                       <div className="flex items-center gap-2">
//                                         <div className="font-black text-sm group-hover:text-amber-500">
//                                           {prog.name}
//                                         </div>
//                                         {prog.badge && (
//                                           <span className="text-[9px] font-black px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400">
//                                             {prog.badge}
//                                           </span>
//                                         )}
//                                       </div>
//                                       <div className="text-xs text-slate-400">
//                                         {prog.desc}
//                                       </div>
//                                     </div>
//                                   </Link>
//                                 );
//                               })}
//                             </div>
//                           </div>
//                         </div>

//                         {/* Footer */}
//                         <div className="mt-8 pt-5 border-t border-purple-800/30 flex justify-between items-center">
//                           <p className="text-xs text-slate-400">
//                             <span className="font-black text-amber-500">
//                               Day
//                             </span>{" "}
//                             or{" "}
//                             <span className="font-black text-amber-500">
//                               Boarding
//                             </span>{" "}
//                             • Flexible attendance options
//                           </p>
//                           <Link
//                             href="/onsite/programs"
//                             className="text-xs font-black text-amber-500 hover:text-amber-400 transition flex items-center gap-2"
//                           >
//                             VIEW ALL PROGRAMS
//                             <ChevronDown className="w-4 h-4 -rotate-90" />
//                           </Link>
//                         </div>
//                       </motion.div>
//                     )}
//                   </AnimatePresence>
//                 </li>
//               );
//             })}
//           </ul>

//           {/* --- COMMAND ACTIONS --- */}
//           <div className="flex items-center space-x-2 md:space-x-3 lg:space-x-4 relative z-60">
//             {/* Theme Toggle */}
//             <Button
//               variant="ghost"
//               size="icon"
//               onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
//               className="rounded-full bg-white/5 hover:bg-purple-600/20 w-10 h-10 md:w-11 md:h-11 touch-target-lg text-slate-300 hover:text-amber-500"
//               aria-label="Toggle theme"
//               disabled={!mounted}
//             >
//               {!mounted ? (
//                 <div className="w-5 h-5 rounded-full bg-muted-foreground/20 animate-pulse" />
//               ) : theme === "dark" ? (
//                 <Sun className="h-5 w-5" aria-hidden="true" />
//               ) : (
//                 <Moon className="h-5 w-5" aria-hidden="true" />
//               )}
//             </Button>

//             <div className="hidden sm:flex items-center gap-2 lg:gap-3">
//               <Link href="/onsite/admissions">
//                 <Button className="rounded-xl font-black px-6 lg:px-8 bg-linear-to-r from-purple-600 to-amber-500 hover:from-purple-700 hover:to-amber-600 text-white shadow-lg text-[11px] tracking-widest relative overflow-hidden group min-h-11">
//                   <span className="relative z-10 flex items-center gap-2">
//                     APPLY NOW
//                     <Sparkles className="w-4 h-4" />
//                   </span>
//                   <motion.div
//                     className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -skew-x-12"
//                     animate={{ x: ["-100%", "200%"] }}
//                     transition={{
//                       duration: 4,
//                       repeat: Infinity,
//                       ease: "linear",
//                     }}
//                   />
//                 </Button>
//               </Link>
//             </div>

//             {/* Mobile Menu Toggle */}
//             <Button
//               variant="ghost"
//               size="icon"
//               className="xl:hidden rounded-xl bg-purple-600/10 text-amber-500 w-11 h-11 border border-purple-600/30 touch-target-lg hover:bg-purple-600/20"
//               onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//               aria-expanded={mobileMenuOpen}
//               aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
//               aria-controls="mobile-navigation-drawer"
//             >
//               {mobileMenuOpen ? (
//                 <X className="h-5 w-5 md:h-6 md:w-6" aria-hidden="true" />
//               ) : (
//                 <Menu className="h-5 w-5 md:h-6 md:w-6" aria-hidden="true" />
//               )}
//             </Button>
//           </div>
//         </nav>
//       </header>

//       {/* --- MOBILE DRAWER --- */}
//       <AnimatePresence>
//         {mobileMenuOpen && (
//           <>
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               onClick={() => setMobileMenuOpen(false)}
//               className="fixed inset-0 bg-black/70 backdrop-blur-md z-90 xl:hidden"
//               aria-hidden="true"
//             />

//             <motion.div
//               initial={{ x: "100%" }}
//               animate={{ x: 0 }}
//               exit={{ x: "100%" }}
//               transition={{ type: "spring", damping: 25, stiffness: 200 }}
//               className="fixed inset-y-0 right-0 z-100 w-full max-w-full sm:max-w-sm bg-slate-950 shadow-2xl xl:hidden flex flex-col p-4 sm:p-6 md:p-8 pt-24 sm:pt-28 md:pt-32 min-h-dvh overflow-y-auto border-l border-purple-800/30"
//               style={{
//                 paddingBottom: "calc(2rem + env(safe-area-inset-bottom))",
//               }}
//               id="mobile-navigation-drawer"
//               role="dialog"
//               aria-modal="true"
//               aria-label="Mobile navigation menu"
//             >
//               <button
//                 onClick={() => setMobileMenuOpen(false)}
//                 className="absolute top-6 right-4 sm:right-6 p-2 rounded-full bg-white/5 hover:bg-purple-600/20 touch-target-lg transition-colors"
//                 aria-label="Close menu"
//               >
//                 <X className="h-5 w-5 text-slate-300" />
//               </button>

//               <div className="flex-1 overflow-y-auto hide-scrollbar">
//                 <nav
//                   className="flex flex-col space-y-4"
//                   aria-label="Mobile navigation"
//                 >
//                   {NAVIGATION.map((item) => (
//                     <div
//                       key={item.name}
//                       className="border-b border-purple-800/30 pb-4"
//                     >
//                       {item.dropdown ? (
//                         <div className="space-y-3">
//                           <button
//                             onClick={() => toggleMobileDropdown(item.name)}
//                             className="flex items-center justify-between w-full text-lg font-black uppercase tracking-tighter px-3 py-2 text-slate-200"
//                           >
//                             <span
//                               className={
//                                 mobileDropdownOpen === item.name
//                                   ? "text-amber-500"
//                                   : ""
//                               }
//                             >
//                               {item.name}
//                             </span>
//                             <ChevronDown
//                               className={cn(
//                                 "w-5 h-5 transition-transform duration-300 text-slate-400",
//                                 mobileDropdownOpen === item.name &&
//                                   "rotate-180",
//                               )}
//                             />
//                           </button>

//                           <AnimatePresence>
//                             {mobileDropdownOpen === item.name && (
//                               <motion.div
//                                 initial={{ height: 0, opacity: 0 }}
//                                 animate={{ height: "auto", opacity: 1 }}
//                                 exit={{ height: 0, opacity: 0 }}
//                                 className="overflow-hidden space-y-4 pl-2"
//                               >
//                                 <Link
//                                   href={MEGA_MENU.featured.href}
//                                   onClick={() => setMobileMenuOpen(false)}
//                                   className="block p-4 rounded-xl bg-linear-to-r from-purple-600/10 to-amber-500/10 border border-purple-700/30"
//                                 >
//                                   <div className="font-black text-sm text-amber-500">
//                                     {MEGA_MENU.featured.name}
//                                   </div>
//                                   <div className="text-xs text-slate-400">
//                                     {MEGA_MENU.featured.desc}
//                                   </div>
//                                 </Link>

//                                 <div>
//                                   <div className="text-xs font-black text-amber-500/70 uppercase tracking-wider mb-2">
//                                     ATTENDANCE OPTIONS
//                                   </div>
//                                   <div className="grid grid-cols-1 gap-2">
//                                     {MEGA_MENU.attendanceOptions.map((prog) => {
//                                       const Icon = prog.icon;
//                                       return (
//                                         <Link
//                                           key={prog.name}
//                                           href={prog.href}
//                                           onClick={() =>
//                                             setMobileMenuOpen(false)
//                                           }
//                                           className="flex items-start gap-3 p-3 rounded-xl bg-slate-800/50 hover:bg-purple-600/10 transition-colors"
//                                         >
//                                           <div className="w-8 h-8 rounded-lg bg-purple-600/20 flex items-center justify-center">
//                                             <Icon className="w-4 h-4 text-purple-400" />
//                                           </div>
//                                           <div>
//                                             <div className="font-black text-sm text-slate-200">
//                                               {prog.name}
//                                             </div>
//                                             <div className="text-xs text-slate-400">
//                                               {prog.desc}
//                                             </div>
//                                           </div>
//                                         </Link>
//                                       );
//                                     })}
//                                   </div>
//                                 </div>

//                                 <div>
//                                   <div className="text-xs font-black text-amber-500/70 uppercase tracking-wider mb-2">
//                                     PROGRAM TYPES
//                                   </div>
//                                   <div className="grid grid-cols-1 gap-2">
//                                     {MEGA_MENU.groupPrograms.map((prog) => {
//                                       const Icon = prog.icon;
//                                       return (
//                                         <Link
//                                           key={prog.name}
//                                           href={prog.href}
//                                           onClick={() =>
//                                             setMobileMenuOpen(false)
//                                           }
//                                           className="flex items-start gap-3 p-3 rounded-xl bg-slate-800/50 hover:bg-purple-600/10 transition-colors"
//                                         >
//                                           <div className="w-8 h-8 rounded-lg bg-purple-600/20 flex items-center justify-center">
//                                             <Icon className="w-4 h-4 text-purple-400" />
//                                           </div>
//                                           <div>
//                                             <div className="flex items-center gap-2">
//                                               <div className="font-black text-sm text-slate-200">
//                                                 {prog.name}
//                                               </div>
//                                               {prog.badge && (
//                                                 <span className="text-[8px] font-black px-1.5 py-0.5 rounded-full bg-amber-500/20 text-amber-400">
//                                                   {prog.badge}
//                                                 </span>
//                                               )}
//                                             </div>
//                                             <div className="text-xs text-slate-400">
//                                               {prog.desc}
//                                             </div>
//                                           </div>
//                                         </Link>
//                                       );
//                                     })}
//                                   </div>
//                                 </div>
//                               </motion.div>
//                             )}
//                           </AnimatePresence>
//                         </div>
//                       ) : (
//                         <Link
//                           href={item.href}
//                           onClick={() => setMobileMenuOpen(false)}
//                           className="block text-lg font-black uppercase tracking-tighter py-2 px-3 text-slate-200 hover:text-amber-500 transition"
//                         >
//                           {item.name}
//                         </Link>
//                       )}
//                     </div>
//                   ))}
//                 </nav>
//               </div>

//               {/* Mobile Actions */}
//               <div className="mt-auto pt-6 space-y-4 pb-safe">
//                 {/* Quranic Verse */}
//                 <div className="text-center py-3">
//                   <p className="quran-monumental text-base text-slate-600">
//                     وَقُل رَّبِّ زِدْنِي عِلْمًا
//                   </p>
//                   <p className="text-[8px] text-slate-600 mt-1 italic">
//                     {`"My Lord, increase me in knowledge"`}
//                   </p>
//                 </div>

//                 <div className="grid grid-cols-1 gap-4">
//                   <Link href="/onsite/admissions" onClick={() => setMobileMenuOpen(false)}>
//                     <Button className="w-full h-14 rounded-2xl font-black bg-linear-to-r from-purple-600 to-amber-500 hover:from-purple-700 hover:to-amber-600 text-white">
//                       APPLY NOW
//                     </Button>
//                   </Link>
//                   <div className="flex items-center justify-center gap-4 text-[10px] text-slate-400">
//                     <span className="flex items-center gap-1.5">
//                       <Phone className="w-3 h-3 text-amber-500" />
//                       +234 911 016 3930
//                     </span>
//                     <span className="flex items-center gap-1.5">
//                       <Mail className="w-3 h-3 text-amber-500" />
//                       info.almaysaroh@gmail.com
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           </>
//         )}
//       </AnimatePresence>

//       <style jsx>{`
//         .quran-monumental {
//           font-family:
//             "Amiri", "Scheherazade", "Lateef", "Noto Naskh Arabic", serif;
//         }
//         .custom-scrollbar::-webkit-scrollbar {
//           width: 6px;
//         }
//         .custom-scrollbar::-webkit-scrollbar-track {
//           background: rgba(255, 255, 255, 0.05);
//           border-radius: 10px;
//         }
//         .custom-scrollbar::-webkit-scrollbar-thumb {
//           background: rgba(245, 158, 11, 0.3);
//           border-radius: 10px;
//         }
//         .hide-scrollbar::-webkit-scrollbar {
//           display: none;
//         }
//         .hide-scrollbar {
//           -ms-overflow-style: none;
//           scrollbar-width: none;
//         }
//       `}</style>
//     </>
//   );
// }








// app/(marketing)/onsite/components/layout/OnsiteHeader.tsx
"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  ChevronDown,
  Sun,
  Moon,
  Menu,
  X,
  Sparkles,
  RefreshCw,
  Phone,
  Mail,
  Home,
  Info,
  Users,
  Calendar,
  GraduationCap,
  Building2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Logo from "@/public/logo.png";

// Navigation
const NAVIGATION = [
  { name: "Home", href: "/onsite", icon: Home },
  { name: "About", href: "/onsite/about", icon: Info },
  {
    name: "Programs",
    href: "/onsite/programs",
    dropdown: true,
    icon: BookOpen,
  },
  { name: "Boarding", href: "/onsite/boarding", icon: Building2 },
  { name: "Student Life", href: "/onsite/student-life", icon: Users },
  { name: "Admissions", href: "/onsite/admissions", icon: GraduationCap },
];

// Mega menu data
const MEGA_MENU = {
  featured: {
    name: "ALL PROGRAMS",
    href: "/onsite/programs",
    desc: "Browse our complete catalog",
    icon: BookOpen,
  },
  attendanceOptions: [
    {
      name: "Part-Time Day",
      href: "/onsite/programs/part-time-day",
      icon: Sun,
      desc: "Sat-Sun: 9AM - 4:30PM",
    },
    {
      name: "Full-Time Day",
      href: "/onsite/programs/full-time-day",
      icon: Sun,
      desc: "Sat-Sun (9-4:30) + Mon-Wed (4:30-6:30)",
    },
    {
      name: "Part-Time Boarding",
      href: "/onsite/programs/part-time-boarding",
      icon: Moon,
      desc: "Fri 4:30PM - Sun 4:30PM",
    },
    {
      name: "Full-Time Boarding",
      href: "/onsite/programs/full-time-boarding",
      icon: Moon,
      desc: "Full-time residential program",
    },
    {
      name: "Flexible / Custom",
      href: "/onsite/programs/flexible",
      icon: RefreshCw,
      desc: "Tailored schedule to fit your needs",
    },
  ],
  groupPrograms: [
    {
      name: "Day Programme",
      href: "/onsite/programs/day",
      icon: Sun,
      desc: "Weekends + Evenings",
      badge: "Popular",
    },
    {
      name: "Boarding Programme",
      href: "/onsite/programs/boarding",
      icon: Moon,
      desc: "Full-time residential",
      badge: "Recommended",
    },
  ],
};

// Throttle function
function throttle<T extends (...args: unknown[]) => unknown>(
  func: T,
  limit: number,
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return function (this: unknown, ...args: Parameters<T>) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Color styles for light/dark mode
const getThemeColors = () => {
  return {
    headerBg: "bg-background/95 dark:bg-slate-950/95",
    border: "border-border/50 dark:border-white/10",
    text: "text-foreground dark:text-slate-300",
    textHover: "hover:text-purple-600 dark:hover:text-amber-500",
    activeText: "text-purple-600 dark:text-amber-500",
    activeBg: "bg-purple-50/50 dark:bg-white/5",
    dropdownBg: "bg-card dark:bg-slate-950",
    dropdownBorder: "border-purple-200 dark:border-purple-800/30",
    mobileBg: "bg-background dark:bg-slate-950",
  };
};

export function OnsiteHeader() {
  const { theme, setTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState<string | null>(
    null,
  );
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const colors = getThemeColors();

  useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    const throttledScroll = throttle(handleScroll, 100);
    window.addEventListener("scroll", throttledScroll, { passive: true });
    return () => window.removeEventListener("scroll", throttledScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
    setMobileDropdownOpen(null);
  }, [pathname]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [mobileMenuOpen]);

  const toggleMobileDropdown = (name: string) => {
    setMobileDropdownOpen(mobileDropdownOpen === name ? null : name);
  };

  const isActive = (href: string) => {
    if (href === "/onsite") return pathname === "/onsite";
    return pathname?.startsWith(href);
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 w-full transition-all duration-500 flex items-center",
          isScrolled
            ? `${colors.headerBg} backdrop-blur-md border-b ${colors.border} py-2 h-20 shadow-lg`
            : "bg-transparent py-4 h-24",
          "pt-safe",
        )}
      >
        <nav className="container mx-auto px-4 md:px-6 flex items-center justify-between">
          {/* --- LOGO SECTION --- */}
          <Link
            href="/onsite"
            className="flex items-center space-x-3 md:space-x-4 relative z-60 group outline-none min-h-11 min-w-11"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Daar-ul-Maysaroh - Home"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-amber-500 rounded-2xl blur-md opacity-50 group-hover:opacity-100 transition-opacity" />
              <Image
                src={Logo}
                width={100}
                height={100}
                alt="Al-Maysaroh Institute Logo"
                className="relative w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-purple-600 to-amber-500 rounded-2xl flex items-center justify-center shadow-2xl group-hover:scale-105 group-hover:rotate-3 transition-all duration-300"
              />
            </div>
            <div className="hidden lg:flex flex-col">
              <h1 className="text-lg md:text-xl lg:text-2xl font-black tracking-tighter leading-none bg-gradient-to-r from-foreground to-purple-600 dark:from-white dark:to-purple-300 bg-clip-text text-transparent">
                AL-MAYSAROH
              </h1>
              <p className="text-[8px] md:text-[10px] text-amber-600 dark:text-amber-500 font-bold tracking-[0.3em] md:tracking-[0.4em] uppercase">
                Institute (onsite).
              </p>
            </div>
          </Link>

          {/* --- DESKTOP NAVIGATION --- */}
          <ul className="hidden xl:flex items-center space-x-1">
            {NAVIGATION.map((item) => {
              const isActivePage = isActive(item.href);

              return (
                <li
                  key={item.name}
                  className="relative"
                  onMouseEnter={() =>
                    item.dropdown && setActiveDropdown(item.name)
                  }
                  onMouseLeave={() => setActiveDropdown(null)}
                  onFocus={() => item.dropdown && setActiveDropdown(item.name)}
                  onBlur={(e) => {
                    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                      setActiveDropdown(null);
                    }
                  }}
                >
                  <Link
                    href={item.href}
                    aria-expanded={activeDropdown === item.name}
                    aria-haspopup={item.dropdown ? "true" : "false"}
                    aria-current={isActivePage ? "page" : undefined}
                    className={cn(
                      "px-4 py-3 text-[13px] font-black flex items-center gap-1 transition-all uppercase tracking-wider outline-none min-h-11 rounded-lg",
                      "focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 focus-visible:outline-none",
                      activeDropdown === item.name || isActivePage
                        ? `${colors.activeText} ${colors.activeBg}`
                        : `${colors.text} ${colors.textHover}`,
                    )}
                  >
                    {item.name}
                    {item.dropdown && (
                      <ChevronDown
                        className={cn(
                          "w-3 h-3 md:w-4 md:h-4 opacity-70 transition-transform",
                          activeDropdown === item.name && "rotate-180",
                        )}
                        aria-hidden="true"
                      />
                    )}
                  </Link>

                  {/* MEGA MENU DROPDOWN */}
                  <AnimatePresence>
                    {item.dropdown && activeDropdown === item.name && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className={cn(
                          "absolute top-full left-1/2 -translate-x-1/2 w-[90vw] max-w-[1000px] p-8 rounded-2xl shadow-2xl mt-2 z-50 max-h-[85vh] overflow-y-auto custom-scrollbar",
                          colors.dropdownBg,
                          colors.dropdownBorder,
                          "border"
                        )}
                        role="menu"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                          {/* Column 1: Featured */}
                          <div className="space-y-5">
                            <div className="text-xs font-black text-amber-600 dark:text-amber-500/70 uppercase tracking-[0.3em] mb-3">
                              FEATURED
                            </div>
                            <Link
                              href={MEGA_MENU.featured.href}
                              className="block p-5 rounded-xl bg-gradient-to-br from-purple-100/30 to-amber-100/30 dark:from-purple-600/10 dark:to-amber-500/10 border border-purple-200 dark:border-purple-700/30 hover:border-amber-500/50 transition-all group"
                            >
                              <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-200/50 to-amber-200/50 dark:from-purple-600/20 dark:to-amber-500/20 flex items-center justify-center">
                                  <MEGA_MENU.featured.icon className="w-6 h-6 text-purple-600 dark:text-amber-500" />
                                </div>
                                <div>
                                  <div className="font-black text-base text-foreground dark:group-hover:text-amber-500">
                                    {MEGA_MENU.featured.name}
                                  </div>
                                  <div className="text-sm text-muted-foreground dark:text-slate-400">
                                    {MEGA_MENU.featured.desc}
                                  </div>
                                </div>
                                <Sparkles className="w-5 h-5 text-amber-500 ml-auto opacity-50" />
                              </div>
                            </Link>
                          </div>

                          {/* Column 2: Attendance Options */}
                          <div className="space-y-4">
                            <div className="text-xs font-black text-amber-600 dark:text-amber-500/70 uppercase tracking-[0.3em] mb-3">
                              ATTENDANCE OPTIONS
                            </div>
                            <div className="space-y-2">
                              {MEGA_MENU.attendanceOptions.map((prog) => {
                                const Icon = prog.icon;
                                return (
                                  <Link
                                    key={prog.name}
                                    href={prog.href}
                                    className="flex items-center gap-4 p-3 rounded-xl hover:bg-purple-100/30 dark:hover:bg-purple-600/10 transition-colors group"
                                  >
                                    <div className="w-10 h-10 rounded-lg bg-purple-100/50 dark:bg-purple-600/20 flex items-center justify-center">
                                      <Icon className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                                    </div>
                                    <div className="flex-1">
                                      <div className="font-black text-sm text-foreground dark:group-hover:text-amber-500">
                                        {prog.name}
                                      </div>
                                      <div className="text-xs text-muted-foreground dark:text-slate-400">
                                        {prog.desc}
                                      </div>
                                    </div>
                                  </Link>
                                );
                              })}
                            </div>
                          </div>

                          {/* Column 3: Program Types */}
                          <div className="space-y-4">
                            <div className="text-xs font-black text-amber-600 dark:text-amber-500/70 uppercase tracking-[0.3em] mb-3">
                              PROGRAM TYPES
                            </div>
                            <div className="space-y-2">
                              {MEGA_MENU.groupPrograms.map((prog) => {
                                const Icon = prog.icon;
                                return (
                                  <Link
                                    key={prog.name}
                                    href={prog.href}
                                    className="flex items-center gap-4 p-3 rounded-xl hover:bg-purple-100/30 dark:hover:bg-purple-600/10 transition-colors group"
                                  >
                                    <div className="w-10 h-10 rounded-lg bg-purple-100/50 dark:bg-purple-600/20 flex items-center justify-center">
                                      <Icon className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                                    </div>
                                    <div className="flex-1">
                                      <div className="flex items-center gap-2">
                                        <div className="font-black text-sm text-foreground dark:group-hover:text-amber-500">
                                          {prog.name}
                                        </div>
                                        {prog.badge && (
                                          <span className="text-[9px] font-black px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-400">
                                            {prog.badge}
                                          </span>
                                        )}
                                      </div>
                                      <div className="text-xs text-muted-foreground dark:text-slate-400">
                                        {prog.desc}
                                      </div>
                                    </div>
                                  </Link>
                                );
                              })}
                            </div>
                          </div>
                        </div>

                        {/* Footer */}
                        <div className="mt-8 pt-5 border-t border-purple-200/50 dark:border-purple-800/30 flex justify-between items-center">
                          <p className="text-xs text-muted-foreground dark:text-slate-400">
                            <span className="font-black text-amber-600 dark:text-amber-500">
                              Day
                            </span>{" "}
                            or{" "}
                            <span className="font-black text-amber-600 dark:text-amber-500">
                              Boarding
                            </span>{" "}
                            • Flexible attendance options
                          </p>
                          <Link
                            href="/onsite/programs"
                            className="text-xs font-black text-amber-600 dark:text-amber-500 hover:text-amber-700 dark:hover:text-amber-400 transition flex items-center gap-2"
                          >
                            VIEW ALL PROGRAMS
                            <ChevronDown className="w-4 h-4 -rotate-90" />
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>

          {/* --- COMMAND ACTIONS --- */}
          <div className="flex items-center space-x-2 md:space-x-3 lg:space-x-4 relative z-60">
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className={cn(
                "rounded-full w-10 h-10 md:w-11 md:h-11 touch-target-lg transition-all duration-300",
                isScrolled
                  ? "bg-muted/30 hover:bg-purple-100/30 dark:bg-white/5 dark:hover:bg-purple-600/20"
                  : "bg-white/10 hover:bg-purple-600/20",
                "text-foreground dark:text-slate-300 hover:text-amber-600 dark:hover:text-amber-500"
              )}
              aria-label="Toggle theme"
              disabled={!mounted}
            >
              {!mounted ? (
                <div className="w-5 h-5 rounded-full bg-muted-foreground/20 animate-pulse" />
              ) : theme === "dark" ? (
                <Sun className="h-5 w-5" aria-hidden="true" />
              ) : (
                <Moon className="h-5 w-5" aria-hidden="true" />
              )}
            </Button>

            <div className="hidden sm:flex items-center gap-2 lg:gap-3">
              <Link href="/onsite/admissions">
                <Button className="rounded-xl font-black px-6 lg:px-8 bg-gradient-to-r from-purple-600 to-amber-500 hover:from-purple-700 hover:to-amber-600 text-white shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 text-[11px] tracking-widest relative overflow-hidden group min-h-11 transition-all duration-300">
                  <span className="relative z-10 flex items-center gap-2">
                    APPLY NOW
                    <Sparkles className="w-4 h-4" />
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                    animate={{ x: ["-100%", "200%"] }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "xl:hidden rounded-xl w-11 h-11 border touch-target-lg transition-all duration-300",
                isScrolled
                  ? "bg-purple-100/30 dark:bg-purple-600/10 text-purple-600 dark:text-amber-500 border-purple-200 dark:border-purple-600/30 hover:bg-purple-200/30 dark:hover:bg-purple-600/20"
                  : "bg-white/10 text-white border-white/20 hover:bg-white/20"
              )}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-controls="mobile-navigation-drawer"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5 md:h-6 md:w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-5 w-5 md:h-6 md:w-6" aria-hidden="true" />
              )}
            </Button>
          </div>
        </nav>
      </header>

      {/* --- MOBILE DRAWER --- */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/70 backdrop-blur-md z-90 xl:hidden"
              aria-hidden="true"
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className={cn(
                "fixed inset-y-0 right-0 z-100 w-full max-w-full sm:max-w-sm shadow-2xl xl:hidden flex flex-col p-4 sm:p-6 md:p-8 pt-24 sm:pt-28 md:pt-32 min-h-dvh overflow-y-auto border-l",
                colors.mobileBg,
                "border-purple-200/50 dark:border-purple-800/30"
              )}
              style={{
                paddingBottom: "calc(2rem + env(safe-area-inset-bottom))",
              }}
              id="mobile-navigation-drawer"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation menu"
            >
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="absolute top-6 right-4 sm:right-6 p-2 rounded-full bg-muted/30 hover:bg-muted/50 touch-target-lg transition-colors"
                aria-label="Close menu"
              >
                <X className="h-5 w-5 text-foreground dark:text-slate-300" />
              </button>

              <div className="flex-1 overflow-y-auto hide-scrollbar">
                <nav
                  className="flex flex-col space-y-4"
                  aria-label="Mobile navigation"
                >
                  {NAVIGATION.map((item) => (
                    <div
                      key={item.name}
                      className="border-b border-border/50 dark:border-purple-800/30 pb-4"
                    >
                      {item.dropdown ? (
                        <div className="space-y-3">
                          <button
                            onClick={() => toggleMobileDropdown(item.name)}
                            className="flex items-center justify-between w-full text-lg font-black uppercase tracking-tighter px-3 py-2 text-foreground dark:text-slate-200"
                          >
                            <span
                              className={
                                mobileDropdownOpen === item.name
                                  ? "text-amber-600 dark:text-amber-500"
                                  : ""
                              }
                            >
                              {item.name}
                            </span>
                            <ChevronDown
                              className={cn(
                                "w-5 h-5 transition-transform duration-300 text-muted-foreground dark:text-slate-400",
                                mobileDropdownOpen === item.name &&
                                  "rotate-180"
                              )}
                            />
                          </button>

                          <AnimatePresence>
                            {mobileDropdownOpen === item.name && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden space-y-4 pl-2"
                              >
                                <Link
                                  href={MEGA_MENU.featured.href}
                                  onClick={() => setMobileMenuOpen(false)}
                                  className="block p-4 rounded-xl bg-gradient-to-r from-purple-100/30 to-amber-100/30 dark:from-purple-600/10 dark:to-amber-500/10 border border-purple-200 dark:border-purple-700/30"
                                >
                                  <div className="font-black text-sm text-amber-600 dark:text-amber-500">
                                    {MEGA_MENU.featured.name}
                                  </div>
                                  <div className="text-xs text-muted-foreground dark:text-slate-400">
                                    {MEGA_MENU.featured.desc}
                                  </div>
                                </Link>

                                <div>
                                  <div className="text-xs font-black text-amber-600 dark:text-amber-500/70 uppercase tracking-wider mb-2">
                                    ATTENDANCE OPTIONS
                                  </div>
                                  <div className="grid grid-cols-1 gap-2">
                                    {MEGA_MENU.attendanceOptions.map((prog) => {
                                      const Icon = prog.icon;
                                      return (
                                        <Link
                                          key={prog.name}
                                          href={prog.href}
                                          onClick={() =>
                                            setMobileMenuOpen(false)
                                          }
                                          className="flex items-start gap-3 p-3 rounded-xl bg-muted/30 dark:bg-slate-800/50 hover:bg-purple-100/30 dark:hover:bg-purple-600/10 transition-colors"
                                        >
                                          <div className="w-8 h-8 rounded-lg bg-purple-100/50 dark:bg-purple-600/20 flex items-center justify-center">
                                            <Icon className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                                          </div>
                                          <div>
                                            <div className="font-black text-sm text-foreground dark:text-slate-200">
                                              {prog.name}
                                            </div>
                                            <div className="text-xs text-muted-foreground dark:text-slate-400">
                                              {prog.desc}
                                            </div>
                                          </div>
                                        </Link>
                                      );
                                    })}
                                  </div>
                                </div>

                                <div>
                                  <div className="text-xs font-black text-amber-600 dark:text-amber-500/70 uppercase tracking-wider mb-2">
                                    PROGRAM TYPES
                                  </div>
                                  <div className="grid grid-cols-1 gap-2">
                                    {MEGA_MENU.groupPrograms.map((prog) => {
                                      const Icon = prog.icon;
                                      return (
                                        <Link
                                          key={prog.name}
                                          href={prog.href}
                                          onClick={() =>
                                            setMobileMenuOpen(false)
                                          }
                                          className="flex items-start gap-3 p-3 rounded-xl bg-muted/30 dark:bg-slate-800/50 hover:bg-purple-100/30 dark:hover:bg-purple-600/10 transition-colors"
                                        >
                                          <div className="w-8 h-8 rounded-lg bg-purple-100/50 dark:bg-purple-600/20 flex items-center justify-center">
                                            <Icon className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                                          </div>
                                          <div>
                                            <div className="flex items-center gap-2">
                                              <div className="font-black text-sm text-foreground dark:text-slate-200">
                                                {prog.name}
                                              </div>
                                              {prog.badge && (
                                                <span className="text-[8px] font-black px-1.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-400">
                                                  {prog.badge}
                                                </span>
                                              )}
                                            </div>
                                            <div className="text-xs text-muted-foreground dark:text-slate-400">
                                              {prog.desc}
                                            </div>
                                          </div>
                                        </Link>
                                      );
                                    })}
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ) : (
                        <Link
                          href={item.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="block text-lg font-black uppercase tracking-tighter py-2 px-3 text-foreground dark:text-slate-200 hover:text-amber-600 dark:hover:text-amber-500 transition"
                        >
                          {item.name}
                        </Link>
                      )}
                    </div>
                  ))}
                </nav>
              </div>

              {/* Mobile Actions */}
              <div className="mt-auto pt-6 space-y-4 pb-safe">
                {/* Quranic Verse */}
                <div className="text-center py-3">
                  <p className="quran-monumental text-base text-muted-foreground/50 dark:text-slate-600">
                    وَقُل رَّبِّ زِدْنِي عِلْمًا
                  </p>
                  <p className="text-[8px] text-muted-foreground/40 dark:text-slate-600 mt-1 italic">
                    "My Lord, increase me in knowledge"
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <Link href="/onsite/admissions" onClick={() => setMobileMenuOpen(false)}>
                    <Button className="w-full h-14 rounded-2xl font-black bg-gradient-to-r from-purple-600 to-amber-500 hover:from-purple-700 hover:to-amber-600 text-white shadow-lg shadow-purple-500/30">
                      APPLY NOW
                    </Button>
                  </Link>
                  <div className="flex items-center justify-center gap-4 text-[10px] text-muted-foreground dark:text-slate-400">
                    <span className="flex items-center gap-1.5">
                      <Phone className="w-3 h-3 text-amber-600 dark:text-amber-500" />
                      +234 911 016 3930
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Mail className="w-3 h-3 text-amber-600 dark:text-amber-500" />
                      info.almaysaroh@gmail.com
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <style jsx>{`
        .quran-monumental {
          font-family:
            "Amiri", "Scheherazade", "Lateef", "Noto Naskh Arabic", serif;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(245, 158, 11, 0.3);
          border-radius: 10px;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </>
  );
}