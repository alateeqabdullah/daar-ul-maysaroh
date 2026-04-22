// // // "use client";

// // // import { useState } from "react";
// // // import { Reveal } from "@/components/shared/section-animation";
// // // import {
// // //   ChevronDown,
// // //   HelpCircle,
// // //   BookOpen,
// // //   Users,
// // //   Clock,
// // //   Shield,
// // // } from "lucide-react";

// // // const FAQ_ITEMS = [
// // //   {
// // //     question: "What is an Ijazah?",
// // //     answer:
// // //       "An Ijazah is a traditional Islamic certification with an unbroken chain of transmission (sanad) reaching back to Prophet Muhammad (ﷺ). It ensures authentic preservation of Quranic recitation.",
// // //     icon: Shield,
// // //   },
// // //   {
// // //     question: "How are you different?",
// // //     answer:
// // //       "We combine traditional sanad-based methodology with modern pedagogy. Each student receives 1-on-1 attention from Ijazah-certified scholars with detailed progress analytics.",
// // //     icon: BookOpen,
// // //   },
// // //   {
// // //     question: "I work full-time. Can I enroll?",
// // //     answer:
// // //       "Yes! 78% of our students are professionals. We offer flexible scheduling across timezones with 24/7 portal access. Average commitment is 3-5 hours weekly.",
// // //     icon: Clock,
// // //   },
// // //   {
// // //     question: "No Arabic knowledge?",
// // //     answer:
// // //       "Perfect! Our Arabic program starts from absolute beginner. Within 6 months, students typically can read Quranic Arabic and understand basic grammar.",
// // //     icon: HelpCircle,
// // //   },
// // // ];

// // // export function FAQ() {
// // //   const [openIndex, setOpenIndex] = useState<number | null>(0);

// // //   return (
// // //     <section className="py-12 sm:py-16 md:py-24 lg:py-32 bg-background">
// // //       <div className="container mx-auto px-4 sm:px-6">
// // //         {/* Section Header */}
// // //         <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16 md:mb-20 space-y-4 sm:space-y-6">
// // //           <Reveal>
// // //             <div className="inline-flex items-center gap-2 text-primary-700 font-black text-xs sm:text-[10px] uppercase tracking-widest sm:tracking-[0.3em]">
// // //               <HelpCircle className="w-3 h-3 sm:w-4 sm:h-4" /> Common Questions
// // //             </div>
// // //             <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tighter font-heading leading-tight">
// // //               Your <span className="text-primary-700 italic">Questions</span>
// // //               <br />
// // //               Answered
// // //             </h2>
// // //             <p className="text-base sm:text-lg md:text-xl text-muted-foreground font-medium max-w-2xl mx-auto border-l-4 border-gold pl-4 sm:pl-6">
// // //               Everything about beginning your Quranic journey with Al-Maysaroh.
// // //             </p>
// // //           </Reveal>
// // //         </div>

// // //         {/* FAQ Accordion */}
// // //         <div className="max-w-3xl mx-auto">
// // //           {FAQ_ITEMS.map((item, index) => (
// // //             <Reveal key={index} delay={index * 0.05}>
// // //               <div className="mb-3 sm:mb-4">
// // //                 <button
// // //                   onClick={() =>
// // //                     setOpenIndex(openIndex === index ? null : index)
// // //                   }
// // //                   className="w-full text-left p-4 sm:p-6 md:p-8 institutional-card hover:border-primary-700/50 min-h-[44px]"
// // //                   aria-expanded={openIndex === index}
// // //                 >
// // //                   <div className="flex items-center justify-between gap-4 sm:gap-6">
// // //                     <div className="flex items-center gap-4 sm:gap-6">
// // //                       <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-primary-50 dark:bg-primary-950/40 flex items-center justify-center flex-shrink-0">
// // //                         <item.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary-700" />
// // //                       </div>
// // //                       <h3 className="text-base sm:text-lg md:text-xl font-black uppercase tracking-tight text-left">
// // //                         {item.question}
// // //                       </h3>
// // //                     </div>
// // //                     <ChevronDown
// // //                       className={`w-4 h-4 sm:w-5 sm:h-5 text-primary-700 transition-transform duration-300 flex-shrink-0 ${
// // //                         openIndex === index ? "rotate-180" : ""
// // //                       }`}
// // //                     />
// // //                   </div>

// // //                   <div
// // //                     className={`overflow-hidden transition-all duration-300 ${
// // //                       openIndex === index ? "mt-4 sm:mt-6" : "max-h-0"
// // //                     }`}
// // //                   >
// // //                     <div className="pl-14 sm:pl-18 pr-4">
// // //                       <p className="text-sm sm:text-base text-muted-foreground leading-relaxed font-medium">
// // //                         {item.answer}
// // //                       </p>
// // //                     </div>
// // //                   </div>
// // //                 </button>
// // //               </div>
// // //             </Reveal>
// // //           ))}
// // //         </div>

// // //         {/* Still Have Questions? */}
// // //         <Reveal>
// // //           <div className="max-w-2xl mx-auto mt-12 sm:mt-16 p-6 sm:p-8 institutional-card border-primary-500/20 text-center">
// // //             <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight mb-3 sm:mb-4">
// // //               Still Have Questions?
// // //             </h3>
// // //             <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6">
// // //               Our academic advisors are available 7 days a week.
// // //             </p>
// // //             <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
// // //               <a
// // //                 href="mailto:admissions@almaysaroh.com"
// // //                 className="px-4 py-2 sm:px-6 sm:py-3 rounded-full bg-primary-700 text-white font-black text-xs sm:text-sm uppercase tracking-widest hover:bg-primary-800 transition-colors min-h-[44px] flex items-center justify-center"
// // //               >
// // //                 Email Admissions
// // //               </a>
// // //               <a
// // //                 href="tel:+11234567890"
// // //                 className="px-4 py-2 sm:px-6 sm:py-3 rounded-full border-2 border-primary-700 text-primary-700 font-black text-xs sm:text-sm uppercase tracking-widest hover:bg-primary-700/10 transition-colors min-h-[44px] flex items-center justify-center"
// // //               >
// // //                 Call Now
// // //               </a>
// // //             </div>
// // //           </div>
// // //         </Reveal>
// // //       </div>
// // //     </section>
// // //   );
// // // }











// // "use client";

// // import { Reveal } from "@/components/shared/section-animation";
// // import { AnimatePresence, motion } from "framer-motion";
// // import {
// //   BookOpen,
// //   ChevronDown,
// //   Clock,
// //   HelpCircle,
// //   Mail,
// //   MessageCircle,
// //   Phone,
// //   Shield,
// //   Users,
// // } from "lucide-react";
// // import { useState } from "react";

// // const FAQ_ITEMS = [
// //   {
// //     question: "What exactly is an Ijazah certificate?",
// //     answer:
// //       "An Ijazah is a traditional Islamic certification with an unbroken chain of transmission (sanad) tracing back to Prophet Muhammad (ﷺ).",
// //     icon: Shield,
// //     shortAnswer: "Traditional certification with unbroken chain to Prophet (ﷺ)",
// //   },
// //   {
// //     question: "How does Al-Maysaroh differ from others?",
// //     answer:
// //       "We combine authentic sanad-based methodology with structured modern pedagogy. 1-on-1 attention from Ijazah-certified scholars with detailed progress analytics.",
// //     icon: BookOpen,
// //     shortAnswer: "Sanad-based + modern pedagogy with 1-on-1 scholar attention",
// //   },
// //   {
// //     question: "Can working professionals enroll?",
// //     answer:
// //       "Yes! 78% of our students are professionals. Flexible scheduling across timezones with 24/7 portal access. 3-5 hours weekly commitment.",
// //     icon: Clock,
// //     shortAnswer: "Yes - flexible scheduling for professionals (3-5 hrs/week)",
// //   },
// //   {
// //     question: "No Arabic background - where to start?",
// //     answer:
// //       "Our Arabic program is designed for absolute beginners. Read Quranic Arabic within 3 months, understand basic grammar by 6 months.",
// //     icon: Users,
// //     shortAnswer: "Beginner program - read Arabic in 3 months",
// //   },
// // ];

// // export function FAQ() {
// //   const [openIndex, setOpenIndex] = useState<number | null>(0);

// //   return (
// //     <section className="py-12 md:py-16 lg:py-24 bg-background">
// //       <div className="container mx-auto px-4">
// //         {/* Section Header - Mobile Optimized */}
// //         <div className="max-w-3xl mx-auto mb-12 md:mb-16">
// //           <Reveal>
// //             <div className="text-center space-y-4 md:space-y-6">
// //               {/* Badge - Mobile Sized */}
// //               <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 dark:bg-primary-950/40 border border-primary-700/20">
// //                 <HelpCircle className="w-4 h-4 text-primary-700" />
// //                 <span className="text-xs font-bold text-primary-700 uppercase tracking-wider">
// //                   COMMON QUESTIONS
// //                 </span>
// //               </div>

// //               {/* Main Heading - Mobile First */}
// //               <div className="space-y-3">
// //                 <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight font-heading leading-tight">
// //                   <span className="block">Your Questions</span>
// //                   <span className="text-primary-700 italic">Answered</span>
// //                 </h2>

// //                 {/* Subtitle - Short & Clear */}
// //                 <p className="text-base md:text-lg text-muted-foreground font-light leading-relaxed max-w-xl mx-auto px-2">
// //                   Clear answers about your Quranic journey
// //                 </p>
// //               </div>
// //             </div>
// //           </Reveal>
// //         </div>

// //         {/* FAQ Accordion - Mobile Optimized */}
// //         <div className="max-w-3xl mx-auto space-y-2 md:space-y-3">
// //           {FAQ_ITEMS.map((item, index) => (
// //             <Reveal key={index} delay={index * 0.05}>
// //               <motion.div
// //                 layout
// //                 className="overflow-hidden rounded-xl md:rounded-2xl border border-border/50 hover:border-primary-700/20 transition-colors duration-200"
// //               >
// //                 <button
// //                   onClick={() =>
// //                     setOpenIndex(openIndex === index ? null : index)
// //                   }
// //                   className="w-full text-left p-4 md:p-6 bg-white dark:bg-gray-900/30 hover:bg-white/70 dark:hover:bg-gray-900/50 transition-all duration-200 touch-target"
// //                   aria-expanded={openIndex === index}
// //                 >
// //                   <div className="flex items-start justify-between gap-3 md:gap-4">
// //                     {/* Left Content - Stacked on Mobile */}
// //                     <div className="flex items-start gap-3 md:gap-4 flex-1">
// //                       {/* Icon - Smaller on Mobile */}
// //                       <div className="shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-primary-50 dark:bg-primary-900/30 flex items-center justify-center">
// //                         <item.icon className="w-5 h-5 md:w-6 md:h-6 text-primary-700" />
// //                       </div>

// //                       {/* Text Content */}
// //                       <div className="flex-1 min-w-0">
// //                         {/* Question - Mobile Optimized */}
// //                         <h3 className="text-base md:text-lg font-semibold text-foreground leading-snug mb-1 md:mb-2">
// //                           {item.question}
// //                         </h3>

// //                         {/* Short Answer Preview - Only Show When Collapsed */}
// //                         <AnimatePresence>
// //                           {openIndex !== index && (
// //                             <motion.p
// //                               initial={{ opacity: 0, height: 0 }}
// //                               animate={{ opacity: 1, height: "auto" }}
// //                               exit={{ opacity: 0, height: 0 }}
// //                               className="text-sm text-muted-foreground line-clamp-2"
// //                             >
// //                               {item.shortAnswer}
// //                             </motion.p>
// //                           )}
// //                         </AnimatePresence>
// //                       </div>
// //                     </div>

// //                     {/* Chevron - Right Aligned */}
// //                     <div className="hrink-0 pt-1">
// //                       <ChevronDown
// //                         className={`w-5 h-5 md:w-6 md:h-6 text-primary-700 transition-transform duration-300 ${
// //                           openIndex === index ? "rotate-180" : ""
// //                         }`}
// //                       />
// //                     </div>
// //                   </div>

// //                   {/* Full Answer - Optimized for Mobile Reading */}
// //                   <AnimatePresence>
// //                     {openIndex === index && (
// //                       <motion.div
// //                         initial={{ opacity: 0, height: 0 }}
// //                         animate={{ opacity: 1, height: "auto" }}
// //                         exit={{ opacity: 0, height: 0 }}
// //                         className="overflow-hidden"
// //                       >
// //                         <div className="mt-4 pt-4 border-t border-border/20">
// //                           <div className="pl-0 md:pl-14">
// //                             <p className="text-sm md:text-base text-foreground/80 leading-relaxed font-normal">
// //                               {item.answer}
// //                             </p>

// //                             {/* Additional Note for First Item */}
// //                             {index === 0 && (
// //                               <div className="mt-3 p-3 rounded-lg bg-primary-50/50 dark:bg-primary-900/20 border border-primary-700/10">
// //                                 <p className="text-xs md:text-sm text-primary-700 font-medium">
// //                                   <span className="font-bold">Note:</span>{" "}
// //                                   Complete sanad documentation available.
// //                                 </p>
// //                               </div>
// //                             )}
// //                           </div>
// //                         </div>
// //                       </motion.div>
// //                     )}
// //                   </AnimatePresence>
// //                 </button>
// //               </motion.div>
// //             </Reveal>
// //           ))}
// //         </div>

// //         {/* Additional Support - Mobile Optimized */}
// //         <Reveal delay={0.3}>
// //           <div className="max-w-3xl mx-auto mt-12 md:mt-16">
// //             <div className="bg-linear-to-b from-white/50 to-primary-50/20 dark:from-gray-900/30 dark:to-primary-950/10 border border-primary-700/10 rounded-2xl md:rounded-3xl p-6 md:p-8">
// //               {/* Header */}
// //               <div className="text-center space-y-4 mb-6 md:mb-8">
// //                 <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 dark:bg-primary-950/40 border border-primary-700/20">
// //                   <MessageCircle className="w-4 h-4 text-primary-700" />
// //                   <span className="text-xs font-bold text-primary-700 uppercase tracking-wider">
// //                     NEED HELP?
// //                   </span>
// //                 </div>

// //                 <h3 className="text-xl md:text-2xl font-bold text-foreground">
// //                   Personal Guidance Available
// //                 </h3>

// //                 <p className="text-sm md:text-base text-muted-foreground font-light">
// //                   Speak with our academic advisors
// //                 </p>
// //               </div>

// //               {/* Contact Options - Stack on Mobile */}
// //               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
// //                 {/* Email */}
// //                 <a
// //                   href="mailto:admissions@almaysaroh.com"
// //                   className="group p-4 md:p-5 rounded-xl bg-white/70 dark:bg-gray-900/40 border border-border hover:border-primary-700/30 hover:bg-white dark:hover:bg-gray-900/60 transition-all duration-200 text-left touch-target"
// //                 >
// //                   <div className="flex items-center gap-3 md:gap-4 mb-3">
// //                     <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center shrink-0">
// //                       <Mail className="w-5 h-5 md:w-6 md:h-6 text-primary-700" />
// //                     </div>
// //                     <div className="min-w-0">
// //                       <div className="text-xs font-bold text-primary-700 uppercase tracking-wider mb-1">
// //                         Email • 2-4 Hours
// //                       </div>
// //                       <div className="text-sm md:text-base font-semibold text-foreground truncate">
// //                         info.almaysaroh@gmail.com
// //                       </div>
// //                     </div>
// //                   </div>
// //                   <p className="text-xs md:text-sm text-muted-foreground">
// //                     For detailed questions
// //                   </p>
// //                 </a>

// //                 {/* Phone */}
// //                 <a
// //                   href="tel:+11234567890"
// //                   className="group p-4 md:p-5 rounded-xl bg-white/70 dark:bg-gray-900/40 border border-border hover:border-primary-700/30 hover:bg-white dark:hover:bg-gray-900/60 transition-all duration-200 text-left touch-target"
// //                 >
// //                   <div className="flex items-center gap-3 md:gap-4 mb-3">
// //                     <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center shrink-0">
// //                       <Phone className="w-5 h-5 md:w-6 md:h-6 text-primary-700" />
// //                     </div>
// //                     <div className="min-w-0">
// //                       <div className="text-xs font-bold text-primary-700 uppercase tracking-wider mb-1">
// //                         whatsApp • 10AM-8PM GMT
// //                       </div>
// //                       <div className="text-sm md:text-base font-semibold text-foreground">
// //                          (+234) 911-016-3930
// //                       </div>
// //                     </div>
// //                   </div>
// //                   <p className="text-xs md:text-sm text-muted-foreground">
// //                     For immediate answers
// //                   </p>
// //                 </a>
// //               </div>

// //               {/* Guarantee Note */}
// //               <div className="mt-6 pt-6 border-t border-border/20">
// //                 <p className="text-xs md:text-sm text-muted-foreground font-light text-center">
// //                   <span className="font-bold text-primary-700">
// //                     Free Assessment Session.
// //                   </span>{" "}
// //                   Visible Progress in 30 Days - In Shaa Allaah.
// //                 </p>
// //               </div>
// //             </div>
// //           </div>
// //         </Reveal>
// //       </div>
// //     </section>
// //   );
// // }




// // components/sections/faq.tsx
// "use client";

// import { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Reveal } from "@/components/shared/section-animation";
// import {
//   HelpCircle,
//   ChevronDown,
//   BookOpen,
//   CreditCard,
//   Users,
//   Clock,
//   Globe,
//   Shield,
//   Award,
//   GraduationCap,
//   MessageCircle,
//   Sparkles,
// } from "lucide-react";
// import { cn } from "@/lib/utils";
// import Link from "next/link";

// const FAQS = [
//   {
//     question: "What is an Ijazah and why is it important?",
//     answer: "An Ijazah is a traditional Islamic certification granting permission to teach the Quran with an unbroken chain of transmission (Sanad) reaching back to Prophet Muhammad (ﷺ). It ensures authentic preservation of Quranic recitation exactly as revealed. Our scholars hold Ijazahs with complete chains of transmission.",
//     category: "certification",
//     icon: Award,
//   },
//   {
//     question: "How are your programs different from other online Quran schools?",
//     answer: "We combine traditional Sanad-based methodology with modern pedagogy. Each student receives 1-on-1 attention from Ijazah-certified scholars, not just teachers. Our proprietary tracking system monitors every ayah and mistake, providing detailed progress analytics unavailable elsewhere.",
//     category: "programs",
//     icon: BookOpen,
//   },
//   {
//     question: "I work full-time. Can I still enroll?",
//     answer: "Yes! 78% of our students are working professionals. We offer flexible scheduling across multiple timezones with 24/7 portal access. Average commitment is 3-5 hours weekly, which can be scheduled around your work hours.",
//     category: "scheduling",
//     icon: Clock,
//   },
//   {
//     question: "What if I have no prior Arabic knowledge?",
//     answer: "Perfect! Our Arabic program starts from absolute beginner level using our proven methodology. Within 6 months, students typically can read Quranic Arabic and understand basic grammar. We provide English/Arabic bilingual support throughout.",
//     category: "programs",
//     icon: Globe,
//   },
//   {
//     question: "Are your teachers male and female?",
//     answer: "Yes, we have both male and female Ijazah-certified scholars. Students can request same-gender teachers if preferred. All our scholars have minimum 10 years teaching experience and are trained in modern pedagogical techniques.",
//     category: "teachers",
//     icon: Users,
//   },
//   {
//     question: "What technology do I need?",
//     answer: "Just a stable internet connection and a device (computer, tablet, or phone). We provide access to our proprietary portal for lessons, tracking, and materials. No special software required - everything works in your browser.",
//     category: "technical",
//     icon: Shield,
//   },
//   {
//     question: "What payment methods do you accept?",
//     answer: "We accept credit/debit cards (Visa, Mastercard, AMEX) via Stripe for instant activation, as well as bank transfers, mobile money, and Western Union for manual processing. Payment plans are available monthly, quarterly, or annually.",
//     category: "payments",
//     icon: CreditCard,
//   },
//   {
//     question: "Do you offer any discounts?",
//     answer: "Yes! We offer a 15% family discount for 3 or more enrollments from the same household. We also have Zakat-funded grants for students facing financial hardship. Contact our admissions council for more information.",
//     category: "payments",
//     icon: Shield,
//   },
//   {
//     question: "How long does it take to complete Hifz?",
//     answer: "The Hifz program typically takes 2-3 years depending on your pace, dedication, and prior memorization. We offer personalized pacing - some students complete sooner, others take longer based on their schedule and goals.",
//     category: "programs",
//     icon: GraduationCap,
//   },
// ];

// const CATEGORIES = [
//   { id: "all", name: "All Questions", icon: HelpCircle },
//   { id: "programs", name: "Programs", icon: BookOpen },
//   { id: "payments", name: "Payments", icon: CreditCard },
//   { id: "scheduling", name: "Scheduling", icon: Clock },
//   { id: "teachers", name: "Teachers", icon: Users },
//   { id: "technical", name: "Technical", icon: Shield },
//   { id: "certification", name: "Certification", icon: Award },
// ];

// export function FAQ() {
//   const [openIndex, setOpenIndex] = useState<number | null>(0);
//   const [activeCategory, setActiveCategory] = useState("all");
//   const [searchQuery, setSearchQuery] = useState("");

//   const filteredFAQs = FAQS.filter((faq) => {
//     const matchesCategory = activeCategory === "all" || faq.category === activeCategory;
//     const matchesSearch = searchQuery === "" || 
//       faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
//     return matchesCategory && matchesSearch;
//   });

//   return (
//     <section className="py-16 sm:py-24 lg:py-32 bg-linear-to-b from-background via-background to-primary-50/10 relative overflow-hidden">
//       {/* Background Decor */}
//       <div className="absolute inset-0 opacity-[0.02] bg-[url('/islamic-pattern.svg')] bg-center bg-repeat" />
//       <div className="absolute top-0 right-0 w-96 h-96 bg-primary-700/5 rounded-full blur-3xl" />
//       <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-700/5 rounded-full blur-3xl" />

//       <div className="container mx-auto px-4 sm:px-6 relative z-10">
//         {/* Section Header */}
//         <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
//           <Reveal>
//             <div className="inline-flex items-center gap-2 text-primary-700 font-black text-[10px] uppercase tracking-[0.3em] mb-6">
//               <HelpCircle className="w-4 h-4" /> Common Questions
//             </div>
//             <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter font-heading leading-tight mb-4">
//               Your <span className="text-primary-700 italic">Questions</span>
//               <br />Answered
//             </h2>
//             <p className="text-lg sm:text-xl text-muted-foreground font-light max-w-2xl mx-auto">
//               Everything you need to know about beginning your Quranic journey with Al-Maysaroh.
//             </p>
//           </Reveal>
//         </div>

//         {/* Search Bar */}
//         <div className="max-w-md mx-auto mb-8">
//           <div className="relative">
//             <HelpCircle className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
//             <input
//               type="text"
//               placeholder="Search your question..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="w-full pl-11 pr-4 py-3 rounded-full border-2 border-primary-100/50 focus:border-primary-700 outline-none transition-all bg-background"
//             />
//           </div>
//         </div>

//         {/* Category Filters - Horizontal Scroll on Mobile */}
//         <div className="overflow-x-auto pb-4 mb-8">
//           <div className="flex gap-2 min-w-max justify-center">
//             {CATEGORIES.map((cat) => {
//               const Icon = cat.icon;
//               const isActive = activeCategory === cat.id;
//               return (
//                 <button
//                   key={cat.id}
//                   onClick={() => setActiveCategory(cat.id)}
//                   className={cn(
//                     "px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2",
//                     isActive
//                       ? "bg-primary-700 text-white shadow-md"
//                       : "bg-muted/30 hover:bg-primary-700/10 border border-border"
//                   )}
//                 >
//                   <Icon className="w-3.5 h-3.5" />
//                   {cat.name}
//                 </button>
//               );
//             })}
//           </div>
//         </div>

//         {/* FAQ Accordion */}
//         <div className="max-w-3xl mx-auto">
//           {filteredFAQs.length === 0 ? (
//             <div className="text-center py-12">
//               <p className="text-muted-foreground">No questions found matching your search.</p>
//               <button
//                 onClick={() => {
//                   setSearchQuery("");
//                   setActiveCategory("all");
//                 }}
//                 className="text-primary-700 font-black text-sm mt-2 hover:underline"
//               >
//                 Clear filters
//               </button>
//             </div>
//           ) : (
//             <div className="space-y-3 sm:space-y-4">
//               {filteredFAQs.map((faq, index) => {
//                 const Icon = faq.icon;
//                 const isOpen = openIndex === index;
//                 return (
//                   <Reveal key={index} delay={index * 0.03}>
//                     <div className="institutional-card overflow-hidden transition-all duration-300 hover:border-primary-700/30">
//                       <button
//                         onClick={() => setOpenIndex(isOpen ? null : index)}
//                         className="w-full text-left p-5 sm:p-6 md:p-7 flex items-center justify-between gap-4 group"
//                         aria-expanded={isOpen}
//                       >
//                         <div className="flex items-center gap-3 sm:gap-4 flex-1">
//                           <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary-50 dark:bg-primary-950/40 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
//                             <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary-700" />
//                           </div>
//                           <h3 className="font-black text-sm sm:text-base uppercase tracking-tight flex-1 pr-4">
//                             {faq.question}
//                           </h3>
//                         </div>
//                         <ChevronDown
//                           className={cn(
//                             "w-5 h-5 text-primary-700 transition-transform duration-300 shrink-0",
//                             isOpen && "rotate-180"
//                           )}
//                         />
//                       </button>
                      
//                       <AnimatePresence>
//                         {isOpen && (
//                           <motion.div
//                             initial={{ height: 0, opacity: 0 }}
//                             animate={{ height: "auto", opacity: 1 }}
//                             exit={{ height: 0, opacity: 0 }}
//                             transition={{ duration: 0.3, ease: "easeInOut" }}
//                             className="overflow-hidden"
//                           >
//                             <div className="px-5 sm:px-6 md:px-7 pb-5 sm:pb-6 md:pb-7 pt-0">
//                               <div className="pl-13 sm:pl-16">
//                                 <p className="text-sm sm:text-base text-muted-foreground leading-relaxed font-medium">
//                                   {faq.answer}
//                                 </p>
//                               </div>
//                             </div>
//                           </motion.div>
//                         )}
//                       </AnimatePresence>
//                     </div>
//                   </Reveal>
//                 );
//               })}
//             </div>
//           )}
//         </div>

//         {/* Still Have Questions? CTA */}
//         <div className="mt-12 sm:mt-16 text-center">
//           <Reveal>
//             <div className="institutional-card p-6 sm:p-8 md:p-10 bg-linear-to-br from-primary-50/20 to-primary-100/10 border border-primary-700/20 max-w-2xl mx-auto">
//               <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 text-[10px] font-black uppercase tracking-wider mb-4">
//                 <MessageCircle className="w-3 h-3" /> Need More Help?
//               </div>
//               <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tighter mb-3">
//                 Still Have Questions?
//               </h3>
//               <p className="text-sm sm:text-base text-muted-foreground mb-6">
//                 Our academic advisors are available 7 days a week to discuss your specific needs.
//               </p>
//               <div className="flex flex-col sm:flex-row gap-4 justify-center">
//                 <Link href="/contact">
//                   <Button className="rounded-full px-6 sm:px-8 py-3 sm:py-4 font-black bg-primary-700 hover:bg-primary-800 text-sm">
//                     <span className="flex items-center gap-2">
//                       Contact Admissions
//                       <Sparkles className="w-4 h-4" />
//                     </span>
//                   </Button>
//                 </Link>
//                 <Link href="/assessment">
//                   <Button variant="outline" className="rounded-full px-6 sm:px-8 py-3 sm:py-4 font-black border-2 text-sm">
//                     Book Free Assessment
//                   </Button>
//                 </Link>
//               </div>
//               <p className="text-xs text-muted-foreground mt-4">
//                 ⚡ Average response time: 2-4 hours during office hours
//               </p>
//             </div>
//           </Reveal>
//         </div>
//       </div>
//     </section>
//   );
// }

// // Helper component
// function Button({ children, className, variant = "default", ...props }: any) {
//   return (
//     <button
//       className={cn(
//         "transition-all duration-300 font-black",
//         variant === "outline"
//           ? "border-2 border-primary-700 text-primary-700 hover:bg-primary-50"
//           : "bg-primary-700 text-white hover:bg-primary-800",
//         className
//       )}
//       {...props}
//     >
//       {children}
//     </button>
//   );
// }








// components/sections/faq.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal } from "@/components/shared/section-animation";
import {
  ChevronDown,
  Search,
  HelpCircle,
  MessageCircle,
  Sparkles,
  Mail,
  Phone,
  MessageSquare,
  X,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const FAQS = [
  {
    id: 1,
    question: "Can I join if I have no prior Arabic knowledge?",
    answer: "Absolutely! We have students starting from absolute zero. Our teachers are experienced in guiding beginners of all ages. You'll start with basic letter recognition and gradually build up to full Quran reading.",
    category: "Beginners",
    popular: true,
  },
  {
    id: 2,
    question: "How much time do I need to dedicate daily?",
    answer: "We recommend 15-30 minutes of daily revision. Consistency matters more than quantity. Our teachers help you build sustainable habits that fit your schedule, whether you're a student, professional, or parent.",
    category: "Scheduling",
    popular: true,
  },
  {
    id: 3,
    question: "What if I have a busy schedule?",
    answer: "We offer flexible scheduling with sessions available 7 days a week, including early morning (6 AM EST), evening (8 PM EST), and weekend options. You can reschedule sessions with 24-hour notice.",
    category: "Scheduling",
    popular: false,
  },
  {
    id: 4,
    question: "Can I learn at my own pace?",
    answer: "Yes! Every student has a personalized learning plan. You can accelerate or take more time based on your goals and availability. Some complete Juz Amma in 6 months, others take 18 months - both are perfectly fine.",
    category: "Learning",
    popular: true,
  },
  {
    id: 5,
    question: "Is this program only for children?",
    answer: "Not at all! We have students ranging from 6 to 65+. Our program is tailored to each individual's learning style and goals. Adults, professionals, and reverts are all welcome and thriving in our program.",
    category: "Audience",
    popular: true,
  },
  {
    id: 6,
    question: "What's the difference between group and 1-on-1?",
    answer: "Group classes (4-6 students) offer peer motivation, collaborative learning, and lower cost ($79/month). 1-on-1 provides personalized attention, flexible pacing, and direct feedback ($2+ per session/month). Both are highly effective - choose based on your learning style.",
    category: "Formats",
    popular: true,
  },
  {
    id: 7,
    question: "Do I get a certificate upon completion?",
    answer: "Yes! Upon completing your program, students receive a Certificate of Completion. Those who excel can continue to our Ijazah track for formal certification with a complete Sanad chain to Prophet Muhammad (ﷺ).",
    category: "Certification",
    popular: false,
  },
  {
    id: 8,
    question: "What technology do I need?",
    answer: "A computer or tablet with a camera and microphone, stable internet connection, and Zoom (free version works perfectly). Our portal works on all devices - no special software required.",
    category: "Technical",
    popular: false,
  },
  {
    id: 9,
    question: "Is there a free trial?",
    answer: "Yes! We offer a free 20-30 minute assessment session where you can experience our teaching methodology, meet a teacher, and get your level evaluated. No commitment required.",
    category: "Assessment",
    popular: true,
  },
  {
    id: 10,
    question: "How do I pay?",
    answer: "We accept multiple payment methods including credit/debit cards (Visa, Mastercard, AMEX), bank transfers, mobile money, and Western Union. Monthly subscriptions are processed securely through Stripe.",
    category: "Payment",
    popular: false,
  },
];

const CATEGORIES = [
  { id: "all", name: "All Questions", icon: HelpCircle },
  { id: "Beginners", name: "Beginners", icon: Sparkles },
  { id: "Scheduling", name: "Scheduling", icon: MessageSquare },
  { id: "Formats", name: "Formats", icon: MessageCircle },
  { id: "Audience", name: "Audience", icon: Users },
  { id: "Certification", name: "Certification", icon: Award },
  { id: "Payment", name: "Payment", icon: CreditCard },
];

// Import missing icons
import { Users, Award, CreditCard } from "lucide-react";

export function FAQ() {
  const [openId, setOpenId] = useState<number | null>(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredFAQs = FAQS.filter((faq) => {
    const matchesSearch = searchQuery === "" || 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "all" || faq.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const popularFAQs = FAQS.filter(faq => faq.popular);

  const toggleFAQ = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="py-12 xs:py-16 sm:py-20 md:py-24 lg:py-32 bg-gradient-to-b from-background via-purple-50/5 to-amber-50/5 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 xs:px-5 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 xs:mb-10 sm:mb-12 md:mb-16">
          <Reveal>
            <div className="inline-flex items-center gap-1.5 xs:gap-2 px-2.5 xs:px-3 py-1 xs:py-1.5 rounded-full bg-purple-100 dark:bg-purple-900/30 border border-purple-200 dark:border-purple-800 mb-3 xs:mb-4">
              <HelpCircle className="w-3 h-3 xs:w-3.5 xs:h-3.5 text-amber-500" />
              <span className="text-[8px] xs:text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] text-purple-700 dark:text-purple-400">
                Common Questions
              </span>
            </div>
            <h2 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter font-heading leading-[1.1] mb-3 xs:mb-4">
              Frequently Asked{" "}
              <span className="bg-gradient-to-r from-purple-600 to-amber-600 bg-clip-text text-transparent italic">
                Questions
              </span>
            </h2>
            <p className="text-sm xs:text-base text-muted-foreground max-w-md mx-auto">
              Everything you need to know about our programs, methodology, and enrollment process
            </p>
          </Reveal>
        </div>

        {/* Search Bar */}
        <Reveal delay={0.1}>
          <div className="relative max-w-md mx-auto mb-8 xs:mb-10">
            <Search className="absolute left-3 xs:left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 xs:w-4 xs:h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search your question..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 xs:pl-11 pr-9 xs:pr-10 py-2.5 xs:py-3 rounded-full border-2 border-border bg-background focus:border-purple-500 outline-none transition-all text-sm"
              aria-label="Search FAQs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 xs:right-4 top-1/2 -translate-y-1/2"
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5 xs:w-4 xs:h-4 text-muted-foreground hover:text-purple-600 transition" />
              </button>
            )}
          </div>
        </Reveal>

        {/* Category Filters */}
        <Reveal delay={0.15}>
          <div className="flex flex-wrap justify-center gap-1.5 xs:gap-2 sm:gap-3 mb-8 xs:mb-10">
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={cn(
                    "px-3 xs:px-4 py-1.5 xs:py-2 rounded-full text-[9px] xs:text-[10px] font-black uppercase tracking-wider transition-all flex items-center gap-1 xs:gap-1.5",
                    isActive
                      ? "bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-md"
                      : "bg-muted/30 hover:bg-purple-100 dark:hover:bg-purple-950/40 border border-border"
                  )}
                >
                  <Icon className="w-3 h-3 xs:w-3.5 xs:h-3.5" />
                  {cat.name}
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Popular Questions Quick Access */}
        {searchQuery === "" && activeCategory === "all" && (
          <Reveal delay={0.2}>
            <div className="mb-8 xs:mb-10">
              <p className="text-center text-[9px] xs:text-[10px] font-black uppercase tracking-wider text-amber-600 mb-3 xs:mb-4">
                🔥 Most Asked Questions
              </p>
              <div className="flex flex-wrap justify-center gap-2 xs:gap-3">
                {popularFAQs.slice(0, 4).map((faq) => (
                  <button
                    key={faq.id}
                    onClick={() => {
                      toggleFAQ(faq.id);
                      setSearchQuery("");
                      setActiveCategory("all");
                      document.getElementById(`faq-${faq.id}`)?.scrollIntoView({ 
                        behavior: "smooth", 
                        block: "center" 
                      });
                    }}
                    className="px-3 xs:px-4 py-1.5 xs:py-2 rounded-full bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 text-[10px] xs:text-xs font-medium hover:bg-amber-100 dark:hover:bg-amber-950/50 transition-all"
                  >
                    {faq.question.length > 40 ? faq.question.slice(0, 40) + "..." : faq.question}
                  </button>
                ))}
              </div>
            </div>
          </Reveal>
        )}

        {/* Results Count */}
        {searchQuery && (
          <p className="text-center text-[10px] xs:text-xs text-muted-foreground mb-4 xs:mb-6">
            Found {filteredFAQs.length} question{filteredFAQs.length !== 1 ? 's' : ''}
          </p>
        )}

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto">
          {filteredFAQs.length === 0 ? (
            <div className="text-center py-10 xs:py-12">
              <HelpCircle className="w-10 h-10 xs:w-12 xs:h-12 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground font-medium">No questions found matching your search.</p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("all");
                }}
                className="text-purple-600 font-black text-xs mt-2 hover:underline"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="space-y-3 xs:space-y-4">
              {filteredFAQs.map((faq, index) => (
                <Reveal key={faq.id} delay={index * 0.05}>
                  <div 
                    id={`faq-${faq.id}`}
                    className="bg-card rounded-xl border border-border hover:border-purple-300 transition-all overflow-hidden"
                  >
                    <button
                      onClick={() => toggleFAQ(faq.id)}
                      className="w-full text-left p-4 xs:p-5 sm:p-6 flex items-center justify-between gap-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      aria-expanded={openId === faq.id}
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <span className="text-[8px] xs:text-[9px] font-black uppercase tracking-wider text-purple-600 bg-purple-100 dark:bg-purple-950/40 px-2 py-0.5 rounded">
                            {faq.category}
                          </span>
                          {faq.popular && (
                            <span className="text-[8px] xs:text-[9px] font-black uppercase tracking-wider text-amber-600 bg-amber-100 dark:bg-amber-950/40 px-2 py-0.5 rounded">
                              Popular
                            </span>
                          )}
                        </div>
                        <h3 className="font-black text-sm xs:text-base pr-4 group-hover:text-purple-600 transition-colors">
                          {faq.question}
                        </h3>
                      </div>
                      <motion.div
                        animate={{ rotate: openId === faq.id ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronDown className="w-4 h-4 xs:w-5 xs:h-5 text-purple-600 shrink-0" />
                      </motion.div>
                    </button>
                    
                    <AnimatePresence>
                      {openId === faq.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                        >
                          <div className="px-4 xs:px-5 sm:px-6 pb-4 xs:pb-5 sm:pb-6 pt-0">
                            <p className="text-xs xs:text-sm text-muted-foreground leading-relaxed border-l-2 border-purple-300 pl-3 xs:pl-4">
                              {faq.answer}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </Reveal>
              ))}
            </div>
          )}
        </div>

        {/* Still Need Help? CTA */}
        <Reveal delay={0.3}>
          <div className="text-center mt-10 xs:mt-12 sm:mt-16">
            <div className="inline-flex flex-col sm:flex-row items-center gap-3 sm:gap-4 px-5 xs:px-6 py-4 xs:py-5 rounded-2xl bg-gradient-to-r from-purple-50 to-amber-50 dark:from-purple-950/30 dark:to-amber-950/30 border border-purple-200 dark:border-purple-800">
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 xs:w-5 xs:h-5 text-amber-500" />
                <span className="text-xs xs:text-sm font-bold">Still have questions?</span>
              </div>
              <div className="flex flex-col xs:flex-row gap-2 xs:gap-3">
                <Link href="/contact">
                  <button className="px-4 xs:px-5 py-1.5 xs:py-2 rounded-full bg-gradient-to-r from-purple-600 to-purple-700 text-white font-black text-[10px] xs:text-xs uppercase tracking-wider hover:from-purple-700 hover:to-purple-800 transition-all shadow-md">
                    Contact Support
                  </button>
                </Link>
                <Link href="/admissions/apply">
                  <button className="px-4 xs:px-5 py-1.5 xs:py-2 rounded-full border-2 border-purple-600 text-purple-600 font-black text-[10px] xs:text-xs uppercase tracking-wider hover:bg-purple-50 dark:hover:bg-purple-950/20 transition-all">
                    Apply Now
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Contact Options */}
        <Reveal delay={0.35}>
          <div className="mt-6 xs:mt-8 text-center">
            <p className="text-[9px] xs:text-[10px] text-muted-foreground mb-2">Or reach us directly:</p>
            <div className="flex flex-wrap justify-center gap-3 xs:gap-4">
              <a href="mailto:info.almaysaroh@gmail.com" className="flex items-center gap-1.5 text-[9px] xs:text-[10px] text-purple-600 hover:underline">
                <Mail className="w-3 h-3" />
                info.almaysaroh@gmail.com
              </a>
              <a href="tel:+2349110163930" className="flex items-center gap-1.5 text-[9px] xs:text-[10px] text-purple-600 hover:underline">
                <Phone className="w-3 h-3" />
                +234 911 016 3930
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}