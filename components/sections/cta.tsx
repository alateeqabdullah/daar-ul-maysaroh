// "use client";

// import { Reveal } from "@/components/shared/section-animation";
// import { Calendar, CheckCircle, Sparkles, Award } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import Link from "next/link";
// import { motion } from "framer-motion";

// export function CTA() {
//   return (
//     <section className="py-12 sm:py-16 md:py-24 lg:py-32 relative bg-background">
//       <div className="container mx-auto px-4 sm:px-6 relative">
//         <Reveal>
//           <div className="max-w-4xl sm:max-w-5xl md:max-w-6xl mx-auto">
//             <div className="institutional-card p-6 sm:p-8 md:p-12 lg:p-16 xl:p-20 relative overflow-hidden border border-primary-700/20">
//               <div className="relative z-10 text-center space-y-8 sm:space-y-10 md:space-y-12">
//                 {/* Header */}
//                 <div className="space-y-6 sm:space-y-8">
//                   <div className="inline-flex items-center gap-2 sm:gap-3 px-4 py-2 sm:px-6 sm:py-3 rounded-full bg-primary-700/10 border border-primary-700/20">
//                     <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-primary-700" />
//                     <span className="text-xs sm:text-sm font-black text-primary-700 uppercase tracking-widest sm:tracking-[0.3em]">
//                       ENROLLMENT OPEN
//                     </span>
//                     <Award className="w-4 h-4 sm:w-5 sm:h-5 text-primary-700" />
//                   </div>

//                   <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tighter font-heading leading-tight">
//                     Your <span className="text-primary-700 italic">Sacred</span>
//                     <br />
//                     Journey Begins
//                   </h2>

//                   <div className="max-w-2xl mx-auto">
//                     <p className="text-base sm:text-lg md:text-xl text-muted-foreground font-light leading-relaxed border-l-4 border-gold/50 pl-4 sm:pl-6 md:pl-8 py-2">
//                       Join students who have transformed their relationship with
//                       the Quran.
//                     </p>
//                   </div>
//                 </div>

//                 {/* Stats */}
//                 <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 md:gap-8 max-w-3xl mx-auto">
//                   {[
//                     { value: "98%", label: "Completion" },
//                     { value: "14:1", label: "Ratio" },
//                     { value: "1400+", label: "Years" },
//                     // { value: "30-Day", label: "Guarantee" },
//                   ].map((stat, index) => (
//                     <motion.div
//                       key={index}
//                       initial={{ opacity: 0, y: 20 }}
//                       whileInView={{ opacity: 1, y: 0 }}
//                       transition={{ delay: index * 0.1 }}
//                       className="text-center p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-background/50 border border-primary-700/10"
//                     >
//                       <div className="text-2xl sm:text-3xl md:text-4xl font-black text-primary-700 mb-1 sm:mb-2">
//                         {stat.value}
//                       </div>
//                       <div className="text-xs sm:text-sm font-medium text-muted-foreground">
//                         {stat.label}
//                       </div>
//                     </motion.div>
//                   ))}
//                 </div>

//                 {/* Features */}
//                 <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-3xl mx-auto">
//                   {[
//                     {
//                       icon: CheckCircle,
//                       title: "Free Assessment",
//                       desc: "Experience methodology",
//                     },
//                     {
//                       icon: CheckCircle,
//                       title: "1-on-1 Assessment",
//                       desc: "Personalized path",
//                     },
//                     {
//                       icon: CheckCircle,
//                       title: "Flexible",
//                       desc: "Across timezones",
//                     },
//                   ].map((feature, index) => (
//                     <div
//                       key={index}
//                       className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-background/50 border border-primary-700/10 group hover:border-primary-700/30 transition-all duration-300"
//                     >
//                       <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
//                         <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-primary-700/10 flex items-center justify-center shrink-0">
//                           <feature.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary-700" />
//                         </div>
//                         <div className="text-left">
//                           <div className="text-base sm:text-lg font-black uppercase tracking-tight">
//                             {feature.title}
//                           </div>
//                           <div className="text-xs sm:text-sm text-muted-foreground">
//                             {feature.desc}
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>

//                 {/* Action Buttons */}
//                 <motion.div
//                   initial={{ opacity: 0, y: 20 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 0.4 }}
//                   className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center pt-6 sm:pt-8"
//                 >
//                   <Link href="/admissions" className="w-full sm:w-auto">
//                     <Button className="w-full rounded-full px-6 py-4 sm:px-8 sm:py-5 md:px-10 md:py-6 text-base sm:text-lg font-black bg-primary-700 hover:bg-primary-800 min-h-11 min-w-11">
//                       <span className="flex items-center gap-3 sm:gap-4">
//                         <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
//                         ENROLL NOW
//                       </span>
//                     </Button>
//                   </Link>

//                   <Link href="/contact" className="w-full sm:w-auto">
//                     <Button
//                       variant="outline"
//                       className="w-full rounded-full px-6 py-4 sm:px-8 sm:py-5 md:px-10 md:py-6 text-base sm:text-lg font-black border-2 min-h-11 min-w-11"
//                     >
//                       <span className="flex items-center gap-3 sm:gap-4">
//                         SPEAK TO ADVISOR
//                         <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-500 group-hover:translate-x-2" />
//                       </span>
//                     </Button>
//                   </Link>
//                 </motion.div>

//                 {/* Guarantee */}
//                 <div className="pt-6 sm:pt-8 md:pt-12 border-t border-primary-700/20 max-w-2xl mx-auto">
//                   <div className="inline-flex items-center gap-3 sm:gap-4 text-sm sm:text-base md:text-lg text-muted-foreground">
//                     <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-primary-700" />
//                     <span>
//                       <span className="font-black text-primary-700">
//                       Commit 30 Days.
//                       </span>{" "}
//                       See the Difference.
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </Reveal>
//       </div>
//     </section>
//   );
// }

// function Shield(props: React.SVGProps<SVGSVGElement>) {
//   return (
//     <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
//       <path
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         strokeWidth={1.5}
//         d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
//       />
//     </svg>
//   );
// }

// function ArrowRight(props: React.SVGProps<SVGSVGElement>) {
//   return (
//     <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
//       <path
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         strokeWidth={2}
//         d="M14 5l7 7-7 7"
//       />
//     </svg>
//   );
// }



// components/sections/cta.tsx
"use client";

import { motion } from "framer-motion";
import { Reveal } from "@/components/shared/section-animation";
import {
  ArrowRight,
  Calendar,
  CheckCircle2,
  Sparkles,
  Shield,
  Star,
  Users,
  Clock,
  Heart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function CTA() {
  return (
    <section className="py-16 sm:py-24 lg:py-32 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-950/20 via-background to-primary-950/10" />
      <div className="absolute inset-0 opacity-[0.03] bg-[url('/islamic-pattern.svg')] bg-center bg-repeat" />
      
      {/* Animated Orbs */}
      <div className="absolute top-20 left-20 w-64 h-64 bg-primary-700/20 rounded-full blur-[100px] animate-pulse" />
      <div className="absolute bottom-20 right-20 w-80 h-80 bg-gold/10 rounded-full blur-[120px] animate-pulse delay-1000" />
      
      {/* Floating Particles */}
      <div className="absolute top-1/4 left-1/3 w-2 h-2 bg-gold/30 rounded-full animate-ping" />
      <div className="absolute bottom-1/3 right-1/4 w-3 h-3 bg-primary-700/30 rounded-full animate-ping delay-500" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <div className="institutional-card p-8 sm:p-10 md:p-12 lg:p-16 text-center relative overflow-hidden border-2 border-primary-700/20 bg-gradient-to-br from-background via-primary-50/5 to-primary-100/10">
              
              {/* Decorative Corner Accents */}
              <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-primary-700/20 rounded-tl-3xl" />
              <div className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-primary-700/20 rounded-tr-3xl" />
              <div className="absolute bottom-0 left-0 w-20 h-20 border-b-2 border-l-2 border-primary-700/20 rounded-bl-3xl" />
              <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-primary-700/20 rounded-br-3xl" />
              
              {/* Decorative Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-[10px] font-black uppercase tracking-wider mb-6">
                <Sparkles className="w-3.5 h-3.5" />
                Limited Seats Available
                <Sparkles className="w-3.5 h-3.5" />
              </div>

              {/* Main Heading */}
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tighter font-heading leading-tight mb-4">
                Begin Your{" "}
                <span className="text-primary-700 italic">Sacred</span>
                <br />Journey Today
              </h2>

              {/* Subheading */}
              <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-6">
                Join 1,200+ students who have transformed their relationship with the Quran through our authentic Sanad-based programs.
              </p>

              {/* Trust Badges Row */}
              <div className="flex flex-wrap justify-center gap-3 mb-8">
                {[
                  { icon: Shield, label: "Ijazah Certification" },
                  { icon: Users, label: "1-on-1 Instruction" },
                  { icon: Clock, label: "Flexible Scheduling" },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted/30 text-xs font-black">
                    <item.icon className="w-3 h-3 text-primary-700" />
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                <Link href="/assessment" className="w-full sm:w-auto">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button className="w-full rounded-full px-8 py-4 sm:px-10 sm:py-5 font-black bg-primary-700 hover:bg-primary-800 text-base sm:text-lg shadow-xl group">
                      <span className="flex items-center gap-2">
                        <Calendar className="w-5 h-5" />
                        Book Free Assessment
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </Button>
                  </motion.div>
                </Link>
                
                <Link href="/admissions" className="w-full sm:w-auto">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button variant="outline" className="w-full rounded-full px-8 py-4 sm:px-10 sm:py-5 font-black text-base sm:text-lg border-2 group">
                      <span className="flex items-center gap-2">
                        Enroll Now
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </Button>
                  </motion.div>
                </Link>
              </div>

              {/* Guarantee / Trust Message */}
              <div className="pt-6 border-t border-primary-700/20 max-w-md mx-auto">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary-700" />
                    <span>Free Assessment Session</span>
                  </div>
                  <div className="hidden sm:block w-px h-4 bg-border" />
                  <div className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-primary-700" />
                    <span>30-Day Satisfaction Guarantee</span>
                  </div>
                  <div className="hidden sm:block w-px h-4 bg-border" />
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-primary-700" />
                    <span>Flexible Payment Plans</span>
                  </div>
                </div>
              </div>

              {/* Small Print */}
              <p className="text-[10px] text-muted-foreground/50 mt-6">
                No commitment required for free assessment. All programs are Sanad-based with Ijazah certification.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}