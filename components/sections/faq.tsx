// "use client";

// import { useState } from "react";
// import { Reveal } from "@/components/shared/section-animation";
// import {
//   ChevronDown,
//   HelpCircle,
//   BookOpen,
//   Users,
//   Clock,
//   Shield,
// } from "lucide-react";

// const FAQ_ITEMS = [
//   {
//     question: "What is an Ijazah?",
//     answer:
//       "An Ijazah is a traditional Islamic certification with an unbroken chain of transmission (sanad) reaching back to Prophet Muhammad (ﷺ). It ensures authentic preservation of Quranic recitation.",
//     icon: Shield,
//   },
//   {
//     question: "How are you different?",
//     answer:
//       "We combine traditional sanad-based methodology with modern pedagogy. Each student receives 1-on-1 attention from Ijazah-certified scholars with detailed progress analytics.",
//     icon: BookOpen,
//   },
//   {
//     question: "I work full-time. Can I enroll?",
//     answer:
//       "Yes! 78% of our students are professionals. We offer flexible scheduling across timezones with 24/7 portal access. Average commitment is 3-5 hours weekly.",
//     icon: Clock,
//   },
//   {
//     question: "No Arabic knowledge?",
//     answer:
//       "Perfect! Our Arabic program starts from absolute beginner. Within 6 months, students typically can read Quranic Arabic and understand basic grammar.",
//     icon: HelpCircle,
//   },
// ];

// export function FAQ() {
//   const [openIndex, setOpenIndex] = useState<number | null>(0);

//   return (
//     <section className="py-12 sm:py-16 md:py-24 lg:py-32 bg-background">
//       <div className="container mx-auto px-4 sm:px-6">
//         {/* Section Header */}
//         <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16 md:mb-20 space-y-4 sm:space-y-6">
//           <Reveal>
//             <div className="inline-flex items-center gap-2 text-primary-700 font-black text-xs sm:text-[10px] uppercase tracking-widest sm:tracking-[0.3em]">
//               <HelpCircle className="w-3 h-3 sm:w-4 sm:h-4" /> Common Questions
//             </div>
//             <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tighter font-heading leading-tight">
//               Your <span className="text-primary-700 italic">Questions</span>
//               <br />
//               Answered
//             </h2>
//             <p className="text-base sm:text-lg md:text-xl text-muted-foreground font-medium max-w-2xl mx-auto border-l-4 border-gold pl-4 sm:pl-6">
//               Everything about beginning your Quranic journey with Al-Maysaroh.
//             </p>
//           </Reveal>
//         </div>

//         {/* FAQ Accordion */}
//         <div className="max-w-3xl mx-auto">
//           {FAQ_ITEMS.map((item, index) => (
//             <Reveal key={index} delay={index * 0.05}>
//               <div className="mb-3 sm:mb-4">
//                 <button
//                   onClick={() =>
//                     setOpenIndex(openIndex === index ? null : index)
//                   }
//                   className="w-full text-left p-4 sm:p-6 md:p-8 institutional-card hover:border-primary-700/50 min-h-[44px]"
//                   aria-expanded={openIndex === index}
//                 >
//                   <div className="flex items-center justify-between gap-4 sm:gap-6">
//                     <div className="flex items-center gap-4 sm:gap-6">
//                       <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-primary-50 dark:bg-primary-950/40 flex items-center justify-center flex-shrink-0">
//                         <item.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary-700" />
//                       </div>
//                       <h3 className="text-base sm:text-lg md:text-xl font-black uppercase tracking-tight text-left">
//                         {item.question}
//                       </h3>
//                     </div>
//                     <ChevronDown
//                       className={`w-4 h-4 sm:w-5 sm:h-5 text-primary-700 transition-transform duration-300 flex-shrink-0 ${
//                         openIndex === index ? "rotate-180" : ""
//                       }`}
//                     />
//                   </div>

//                   <div
//                     className={`overflow-hidden transition-all duration-300 ${
//                       openIndex === index ? "mt-4 sm:mt-6" : "max-h-0"
//                     }`}
//                   >
//                     <div className="pl-14 sm:pl-18 pr-4">
//                       <p className="text-sm sm:text-base text-muted-foreground leading-relaxed font-medium">
//                         {item.answer}
//                       </p>
//                     </div>
//                   </div>
//                 </button>
//               </div>
//             </Reveal>
//           ))}
//         </div>

//         {/* Still Have Questions? */}
//         <Reveal>
//           <div className="max-w-2xl mx-auto mt-12 sm:mt-16 p-6 sm:p-8 institutional-card border-primary-500/20 text-center">
//             <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight mb-3 sm:mb-4">
//               Still Have Questions?
//             </h3>
//             <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6">
//               Our academic advisors are available 7 days a week.
//             </p>
//             <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
//               <a
//                 href="mailto:admissions@almaysaroh.com"
//                 className="px-4 py-2 sm:px-6 sm:py-3 rounded-full bg-primary-700 text-white font-black text-xs sm:text-sm uppercase tracking-widest hover:bg-primary-800 transition-colors min-h-[44px] flex items-center justify-center"
//               >
//                 Email Admissions
//               </a>
//               <a
//                 href="tel:+11234567890"
//                 className="px-4 py-2 sm:px-6 sm:py-3 rounded-full border-2 border-primary-700 text-primary-700 font-black text-xs sm:text-sm uppercase tracking-widest hover:bg-primary-700/10 transition-colors min-h-[44px] flex items-center justify-center"
//               >
//                 Call Now
//               </a>
//             </div>
//           </div>
//         </Reveal>
//       </div>
//     </section>
//   );
// }











"use client";

import { useState } from "react";
import { Reveal } from "@/components/shared/section-animation";
import {
  ChevronDown,
  HelpCircle,
  BookOpen,
  Users,
  Clock,
  Shield,
  MessageCircle,
  Phone,
  Mail,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const FAQ_ITEMS = [
  {
    question: "What exactly is an Ijazah certificate?",
    answer:
      "An Ijazah is a traditional Islamic certification with an unbroken chain of transmission (sanad) tracing back to Prophet Muhammad (ﷺ).",
    icon: Shield,
    shortAnswer: "Traditional certification with unbroken chain to Prophet (ﷺ)",
  },
  {
    question: "How does Al-Maysaroh differ from others?",
    answer:
      "We combine authentic sanad-based methodology with structured modern pedagogy. 1-on-1 attention from Ijazah-certified scholars with detailed progress analytics.",
    icon: BookOpen,
    shortAnswer: "Sanad-based + modern pedagogy with 1-on-1 scholar attention",
  },
  {
    question: "Can working professionals enroll?",
    answer:
      "Yes! 78% of our students are professionals. Flexible scheduling across timezones with 24/7 portal access. 3-5 hours weekly commitment.",
    icon: Clock,
    shortAnswer: "Yes - flexible scheduling for professionals (3-5 hrs/week)",
  },
  {
    question: "No Arabic background - where to start?",
    answer:
      "Our Arabic program is designed for absolute beginners. Read Quranic Arabic within 3 months, understand basic grammar by 6 months.",
    icon: Users,
    shortAnswer: "Beginner program - read Arabic in 3 months",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-12 md:py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header - Mobile Optimized */}
        <div className="max-w-3xl mx-auto mb-12 md:mb-16">
          <Reveal>
            <div className="text-center space-y-4 md:space-y-6">
              {/* Badge - Mobile Sized */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 dark:bg-primary-950/40 border border-primary-700/20">
                <HelpCircle className="w-4 h-4 text-primary-700" />
                <span className="text-xs font-bold text-primary-700 uppercase tracking-wider">
                  COMMON QUESTIONS
                </span>
              </div>

              {/* Main Heading - Mobile First */}
              <div className="space-y-3">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight font-heading leading-tight">
                  <span className="block">Your Questions</span>
                  <span className="text-primary-700 italic">Answered</span>
                </h2>

                {/* Subtitle - Short & Clear */}
                <p className="text-base md:text-lg text-muted-foreground font-light leading-relaxed max-w-xl mx-auto px-2">
                  Clear answers about your Quranic journey
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        {/* FAQ Accordion - Mobile Optimized */}
        <div className="max-w-3xl mx-auto space-y-2 md:space-y-3">
          {FAQ_ITEMS.map((item, index) => (
            <Reveal key={index} delay={index * 0.05}>
              <motion.div
                layout
                className="overflow-hidden rounded-xl md:rounded-2xl border border-border/50 hover:border-primary-700/20 transition-colors duration-200"
              >
                <button
                  onClick={() =>
                    setOpenIndex(openIndex === index ? null : index)
                  }
                  className="w-full text-left p-4 md:p-6 bg-white dark:bg-gray-900/30 hover:bg-white/70 dark:hover:bg-gray-900/50 transition-all duration-200 touch-target"
                  aria-expanded={openIndex === index}
                >
                  <div className="flex items-start justify-between gap-3 md:gap-4">
                    {/* Left Content - Stacked on Mobile */}
                    <div className="flex items-start gap-3 md:gap-4 flex-1">
                      {/* Icon - Smaller on Mobile */}
                      <div className="shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-primary-50 dark:bg-primary-900/30 flex items-center justify-center">
                        <item.icon className="w-5 h-5 md:w-6 md:h-6 text-primary-700" />
                      </div>

                      {/* Text Content */}
                      <div className="flex-1 min-w-0">
                        {/* Question - Mobile Optimized */}
                        <h3 className="text-base md:text-lg font-semibold text-foreground leading-snug mb-1 md:mb-2">
                          {item.question}
                        </h3>

                        {/* Short Answer Preview - Only Show When Collapsed */}
                        <AnimatePresence>
                          {openIndex !== index && (
                            <motion.p
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              className="text-sm text-muted-foreground line-clamp-2"
                            >
                              {item.shortAnswer}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>

                    {/* Chevron - Right Aligned */}
                    <div className="hrink-0 pt-1">
                      <ChevronDown
                        className={`w-5 h-5 md:w-6 md:h-6 text-primary-700 transition-transform duration-300 ${
                          openIndex === index ? "rotate-180" : ""
                        }`}
                      />
                    </div>
                  </div>

                  {/* Full Answer - Optimized for Mobile Reading */}
                  <AnimatePresence>
                    {openIndex === index && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-4 pt-4 border-t border-border/20">
                          <div className="pl-0 md:pl-14">
                            <p className="text-sm md:text-base text-foreground/80 leading-relaxed font-normal">
                              {item.answer}
                            </p>

                            {/* Additional Note for First Item */}
                            {index === 0 && (
                              <div className="mt-3 p-3 rounded-lg bg-primary-50/50 dark:bg-primary-900/20 border border-primary-700/10">
                                <p className="text-xs md:text-sm text-primary-700 font-medium">
                                  <span className="font-bold">Note:</span>{" "}
                                  Complete sanad documentation available.
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              </motion.div>
            </Reveal>
          ))}
        </div>

        {/* Additional Support - Mobile Optimized */}
        <Reveal delay={0.3}>
          <div className="max-w-3xl mx-auto mt-12 md:mt-16">
            <div className="bg-linear-to-b from-white/50 to-primary-50/20 dark:from-gray-900/30 dark:to-primary-950/10 border border-primary-700/10 rounded-2xl md:rounded-3xl p-6 md:p-8">
              {/* Header */}
              <div className="text-center space-y-4 mb-6 md:mb-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 dark:bg-primary-950/40 border border-primary-700/20">
                  <MessageCircle className="w-4 h-4 text-primary-700" />
                  <span className="text-xs font-bold text-primary-700 uppercase tracking-wider">
                    NEED HELP?
                  </span>
                </div>

                <h3 className="text-xl md:text-2xl font-bold text-foreground">
                  Personal Guidance Available
                </h3>

                <p className="text-sm md:text-base text-muted-foreground font-light">
                  Speak with our academic advisors
                </p>
              </div>

              {/* Contact Options - Stack on Mobile */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {/* Email */}
                <a
                  href="mailto:admissions@almaysaroh.com"
                  className="group p-4 md:p-5 rounded-xl bg-white/70 dark:bg-gray-900/40 border border-border hover:border-primary-700/30 hover:bg-white dark:hover:bg-gray-900/60 transition-all duration-200 text-left touch-target"
                >
                  <div className="flex items-center gap-3 md:gap-4 mb-3">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5 md:w-6 md:h-6 text-primary-700" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-primary-700 uppercase tracking-wider mb-1">
                        Email • 2-4 Hours
                      </div>
                      <div className="text-sm md:text-base font-semibold text-foreground truncate">
                        info.almaysaroh@gmail.com
                      </div>
                    </div>
                  </div>
                  <p className="text-xs md:text-sm text-muted-foreground">
                    For detailed questions
                  </p>
                </a>

                {/* Phone */}
                <a
                  href="tel:+11234567890"
                  className="group p-4 md:p-5 rounded-xl bg-white/70 dark:bg-gray-900/40 border border-border hover:border-primary-700/30 hover:bg-white dark:hover:bg-gray-900/60 transition-all duration-200 text-left touch-target"
                >
                  <div className="flex items-center gap-3 md:gap-4 mb-3">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center shrink-0">
                      <Phone className="w-5 h-5 md:w-6 md:h-6 text-primary-700" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-primary-700 uppercase tracking-wider mb-1">
                        whatsApp • 10AM-8PM GMT
                      </div>
                      <div className="text-sm md:text-base font-semibold text-foreground">
                         (+234) 703-117-0308
                      </div>
                    </div>
                  </div>
                  <p className="text-xs md:text-sm text-muted-foreground">
                    For immediate answers
                  </p>
                </a>
              </div>

              {/* Guarantee Note */}
              <div className="mt-6 pt-6 border-t border-border/20">
                <p className="text-xs md:text-sm text-muted-foreground font-light text-center">
                  <span className="font-bold text-primary-700">
                    Free Assessment Session
                  </span>{" "}
                  Visible Progress in30 Das - In Shaa Allaah.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
