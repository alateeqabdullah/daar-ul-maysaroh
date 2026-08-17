
// // app/(marketing)/physical/components/layout/PhysicalFooter.tsx
// "use client";

// import Link from "next/link";
// import {
//   Phone,
//   Mail,
//   MapPin,
//   Heart,
//   Instagram,
//   Facebook,
//   Twitter,
//   Youtube,
//   Crown,
//   Shield,
//   Clock,
//   Users,
//   Globe,
// } from "lucide-react";
// import Image from "next/image";
// import Logo from "@/public/logo.png";

// const FOOTER_LINKS = {
//   programs: [
//     { label: "Tahfeedh", href: "/onsite/programs/tahfeedh" },
//     { label: "Tajweed", href: "/onsite/programs/tajweed" },
//     { label: "Qira'aat", href: "/onsite/programs/qiraat" },
//     { label: "Islamic Studies", href: "/onsite/programs/islamic-studies" },
//     { label: "Arabic", href: "/onsite/programs/arabic" },
//     { label: "Tarbiyah", href: "/onsite/programs/tarbiyah" },
//   ],
//   campus: [
//     { label: "Boarding Programme", href: "/onsite/programs/boarding" },
//     { label: "Day Programme", href: "/onsite/programs/day" },
//     { label: "Attendance Options", href: "/onsite/programs/attendance" },
//     { label: "Student Life", href: "/onsite/student-life" },
//     { label: "Events", href: "/onsite/events" },
//     { label: "Gallery", href: "/onsite/gallery" },
//   ],
//   support: [
//     { label: "Admissions", href: "/onsite/admissions" },
//     { label: "Contact", href: "/onsite/contact" },
//     { label: "FAQ", href: "/onsite/faq" },
//     { label: "Schedule", href: "/onsite/schedule" },
//     { label: "Fees", href: "/onsite/fees" },
//     { label: "Apply Now", href: "/onsite/admissions" },
//   ],
// };

// const SOCIAL_LINKS = [
//   { icon: Instagram, href: "https://instagram.com/almaysaroh", label: "Instagram", color: "hover:text-pink-600" },
//   { icon: Facebook, href: "https://facebook.com/almaysaroh", label: "Facebook", color: "hover:text-blue-600" },
//   { icon: Twitter, href: "https://twitter.com/almaysaroh", label: "Twitter", color: "hover:text-sky-500" },
//   { icon: Youtube, href: "https://youtube.com/almaysaroh", label: "YouTube", color: "hover:text-red-600" },
// ];

// export function OnsiteFooter() {
//   return (
//     <footer className="relative bg-gradient-to-b from-background via-purple-50/5 to-amber-50/5 border-t border-purple-200/20 overflow-hidden">
//       {/* Background Decoration */}
//       <div className="absolute inset-0 pointer-events-none">
//         <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl" />
//         <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />
//       </div>

//       {/* Main Footer */}
//       <div className="container mx-auto px-4 xs:px-5 sm:px-6 relative z-10">
//         <div className="py-12 md:py-16 lg:py-20">
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
//             {/* Brand Column */}
//             <div className="lg:col-span-2 space-y-5">
//               <Link href="/onsite" className="flex items-center gap-3 group">
//                 <div className="relative">
//                              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-amber-500 rounded-2xl blur-md opacity-50 group-hover:opacity-100 transition-opacity" />
//                              <Image
//                                src={Logo}
//                                width={100}
//                                height={100}
//                                alt="Al-Maysaroh Institute Logo"
//                                className="relative w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-purple-600 to-amber-500 rounded-2xl flex items-center justify-center shadow-2xl group-hover:scale-105 group-hover:rotate-3 transition-all duration-300"
//                              />
//                            </div>
//                 <div>
//                   <span className="font-black text-lg tracking-tight">
//                     <span className="text-purple-700 dark:text-purple-400">Al-May</span>
//                     <span className="text-amber-600 dark:text-amber-400">saroh</span>
//                   </span>
//                   <p className="text-[8px] font-black uppercase tracking-[0.3em] text-muted-foreground">
//                     Institute (onsite)
//                   </p>
//                 </div>
//               </Link>

//               <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
//                 Daar-ul-Maysaroh is a full-time Quran memorization institute
//                 dedicated to producing carriers of the Quran with authentic Sanad.
//               </p>

//               {/* Contact Info */}
//               <div className="space-y-2.5">
//                 <div className="flex items-center gap-3 text-sm">
//                   <div className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-950/40 flex items-center justify-center shrink-0">
//                     <MapPin className="w-4 h-4 text-purple-600" />
//                   </div>
//                   <span className="text-muted-foreground">Ibadan, Nigeria</span>
//                 </div>
//                 <div className="flex items-center gap-3 text-sm">
//                   <div className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-950/40 flex items-center justify-center shrink-0">
//                     <Phone className="w-4 h-4 text-purple-600" />
//                   </div>
//                   <span className="text-muted-foreground">+234 911 016 3930</span>
//                 </div>
//                 <div className="flex items-center gap-3 text-sm">
//                   <div className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-950/40 flex items-center justify-center shrink-0">
//                     <Mail className="w-4 h-4 text-purple-600" />
//                   </div>
//                   <span className="text-muted-foreground">info.almaysaroh@gmail.com</span>
//                 </div>
//               </div>

//               {/* Social Links */}
//               <div className="flex gap-2 pt-2">
//                 {SOCIAL_LINKS.map((social, i) => {
//                   const Icon = social.icon;
//                   return (
//                     <a
//                       key={i}
//                       href={social.href}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className={`p-2 rounded-full bg-muted/30 hover:bg-muted/50 transition-all ${social.color}`}
//                       aria-label={social.label}
//                     >
//                       <Icon className="w-4 h-4" />
//                     </a>
//                   );
//                 })}
//               </div>
//             </div>

//             {/* Programs */}
//             <div>
//               <h4 className="font-black text-sm uppercase tracking-wider text-purple-600 dark:text-purple-400 mb-4">
//                 Programs
//               </h4>
//               <ul className="space-y-2.5">
//                 {FOOTER_LINKS.programs.map((item) => (
//                   <li key={item.href}>
//                     <Link
//                       href={item.href}
//                       className="text-sm text-muted-foreground hover:text-purple-600 transition-colors flex items-center gap-1.5 group"
//                     >
//                       <span className="w-1 h-1 rounded-full bg-amber-500 opacity-0 group-hover:opacity-100 transition-opacity" />
//                       {item.label}
//                     </Link>
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             {/* Campus */}
//             <div>
//               <h4 className="font-black text-sm uppercase tracking-wider text-purple-600 dark:text-purple-400 mb-4">
//                 Campus
//               </h4>
//               <ul className="space-y-2.5">
//                 {FOOTER_LINKS.campus.map((item) => (
//                   <li key={item.href}>
//                     <Link
//                       href={item.href}
//                       className="text-sm text-muted-foreground hover:text-purple-600 transition-colors flex items-center gap-1.5 group"
//                     >
//                       <span className="w-1 h-1 rounded-full bg-amber-500 opacity-0 group-hover:opacity-100 transition-opacity" />
//                       {item.label}
//                     </Link>
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             {/* Support */}
//             <div>
//               <h4 className="font-black text-sm uppercase tracking-wider text-purple-600 dark:text-purple-400 mb-4">
//                 Support
//               </h4>
//               <ul className="space-y-2.5">
//                 {FOOTER_LINKS.support.map((item) => (
//                   <li key={item.href}>
//                     <Link
//                       href={item.href}
//                       className="text-sm text-muted-foreground hover:text-purple-600 transition-colors flex items-center gap-1.5 group"
//                     >
//                       <span className="w-1 h-1 rounded-full bg-amber-500 opacity-0 group-hover:opacity-100 transition-opacity" />
//                       {item.label}
//                     </Link>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </div>
//         </div>

//         {/* Trust Badges */}
//         <div className="py-6 border-t border-border/50">
//           <div className="flex flex-wrap justify-center gap-6 md:gap-10">
//             {[
//               { icon: Shield, label: "Ijazah Certified" },
//               { icon: Crown, label: "Authentic Sanad" },
//               { icon: Clock, label: "Full-Time Program" },
//               { icon: Users, label: "50+ Students" },
//               { icon: Globe, label: "Global Reach" },
//             ].map((item, idx) => {
//               const Icon = item.icon;
//               return (
//                 <div key={idx} className="flex items-center gap-2 text-xs text-muted-foreground">
//                   <Icon className="w-3.5 h-3.5 text-amber-500" />
//                   <span className="font-medium">{item.label}</span>
//                 </div>
//               );
//             })}
//           </div>
//         </div>

//         {/* Bottom Bar */}
//         <div className="py-4 border-t border-border/30">
//           <div className="flex flex-col sm:flex-row justify-between items-center gap-3 text-[10px] text-muted-foreground">
//             <p>
//               © {new Date().getFullYear()} Daar-ul-Maysaroh. All rights reserved.
//             </p>
//             <div className="flex items-center gap-4">
//               <Link href="/privacy" className="hover:text-purple-600 transition-colors">
//                 Privacy Policy
//               </Link>
//               <Link href="/terms" className="hover:text-purple-600 transition-colors">
//                 Terms of Service
//               </Link>
//               <span className="flex items-center gap-1.5">
//                 Made with <Heart className="w-3 h-3 text-rose-500 animate-pulse" /> by Al-Maysaroh
//               </span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// }




// app/(marketing)/onsite/components/layout/OnsiteFooter.tsx
"use client";

import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  Heart,
  Instagram,
  Facebook,
  Twitter,
  Youtube,
  Crown,
  Shield,
  Clock,
  Users,
  Globe,
  Sparkles,
  ChevronRight,
  Building2,
} from "lucide-react";
import Image from "next/image";
import Logo from "@/public/logo.png";
import { motion } from "framer-motion";

const FOOTER_LINKS = {
  programs: [
    { label: "Tahfeedh", href: "/onsite/programs/tahfeedh" },
    { label: "Tajweed", href: "/onsite/programs/tajweed" },
    { label: "Qira'aat", href: "/onsite/programs/qiraat" },
    { label: "Islamic Studies", href: "/onsite/programs/islamic-studies" },
    { label: "Arabic", href: "/onsite/programs/arabic" },
    { label: "Tarbiyah", href: "/onsite/programs/tarbiyah" },
  ],
  campus: [
    { label: "Boarding Programme", href: "/onsite/boarding" },
    { label: "Day Programme", href: "/onsite/boarding#day" },
    { label: "Attendance Options", href: "/onsite/attendance" },
    { label: "Student Life", href: "/onsite/student-life" },
    { label: "Schedule", href: "/onsite/schedule" },
  ],
  support: [
    { label: "Admissions", href: "/onsite/admissions" },
    { label: "Contact", href: "/onsite/contact" },
    { label: "FAQ", href: "/onsite/faq" },
    { label: "Fees", href: "/onsite/fees" },
    { label: "Apply Now", href: "/onsite/admissions" },
  ],
};

const SOCIAL_LINKS = [
  { icon: Instagram, href: "https://instagram.com/almaysaroh", label: "Instagram", color: "hover:text-pink-500" },
  { icon: Facebook, href: "https://facebook.com/almaysaroh", label: "Facebook", color: "hover:text-blue-500" },
  { icon: Twitter, href: "https://twitter.com/almaysaroh", label: "Twitter", color: "hover:text-sky-400" },
  { icon: Youtube, href: "https://youtube.com/almaysaroh", label: "YouTube", color: "hover:text-red-500" },
];

const TRUST_BADGES = [
  { icon: Shield, label: "Ijazah Certified" },
  { icon: Crown, label: "Authentic Sanad" },
  { icon: Clock, label: "Full-Time Program" },
  { icon: Users, label: "50+ Students" },
  { icon: Globe, label: "Global Reach" },
];

export function OnsiteFooter() {
  return (
    <footer className="relative bg-slate-950 border-t border-purple-800/30 overflow-hidden">
      {/* Premium Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-amber-500/10 rounded-full blur-[150px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/5 rounded-full blur-[200px]" />
        
        {/* Islamic Pattern */}
        <div
          className="absolute inset-0 bg-[url('/islamic-pattern.svg')] bg-center bg-repeat opacity-[0.02] pointer-events-none"
          style={{ backgroundSize: "300px" }}
        />
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 xs:px-5 sm:px-6 relative z-10">
        <div className="py-12 md:py-16 lg:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Brand Column - Enhanced */}
            <div className="lg:col-span-2 space-y-5">
              <Link href="/onsite" className="flex items-center gap-3 group">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-amber-500 rounded-2xl blur-md opacity-50 group-hover:opacity-100 transition-opacity" />
                  <div className="relative w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-purple-600 to-amber-500 rounded-2xl flex items-center justify-center shadow-2xl group-hover:scale-105 group-hover:rotate-3 transition-all duration-300">
                    <Building2 className="h-5 w-5 md:h-6 md:w-6 text-white" />
                  </div>
                </div>
                <div>
                  <span className="font-black text-lg tracking-tight bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent">
                    AL-MAYSAROH
                  </span>
                  <p className="text-[8px] font-black uppercase tracking-[0.3em] text-amber-500">
                    Institute(onsite)
                  </p>
                </div>
              </Link>

              <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
                Daar-ul-Maysaroh is a full-time Quran memorization institute
                dedicated to producing carriers of the Quran with authentic Sanad
                in Ibadan, Nigeria.
              </p>

              {/* Contact Info - Premium */}
              <div className="space-y-2.5">
                {[
                  { icon: MapPin, text: "Ibadan, Nigeria" },
                  { icon: Phone, text: "+234 911 016 3930" },
                  { icon: Mail, text: "info.almaysaroh@gmail.com" },
                ].map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div key={idx} className="flex items-center gap-3 text-sm group">
                      <div className="w-8 h-8 rounded-lg bg-purple-600/20 flex items-center justify-center shrink-0 group-hover:bg-purple-600/30 transition-colors">
                        <Icon className="w-4 h-4 text-amber-500" />
                      </div>
                      <span className="text-slate-400 group-hover:text-white transition-colors">
                        {item.text}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Social Links - Premium */}
              <div className="flex gap-2 pt-2">
                {SOCIAL_LINKS.map((social, i) => {
                  const Icon = social.icon;
                  return (
                    <motion.a
                      key={i}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ y: -3, scale: 1.05 }}
                      className={`p-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-all ${social.color}`}
                      aria-label={social.label}
                    >
                      <Icon className="w-4 h-4 text-slate-400 group-hover:text-white" />
                    </motion.a>
                  );
                })}
              </div>
            </div>

            {/* Programs - Premium */}
            <div>
              <h4 className="font-black text-sm uppercase tracking-wider text-amber-500 mb-4 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                Programs
              </h4>
              <ul className="space-y-2.5">
                {FOOTER_LINKS.programs.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-slate-400 hover:text-amber-400 transition-colors flex items-center gap-1.5 group"
                    >
                      <ChevronRight className="w-3 h-3 text-amber-500/30 opacity-0 group-hover:opacity-100 transition-opacity" />
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Campus - Premium */}
            <div>
              <h4 className="font-black text-sm uppercase tracking-wider text-amber-500 mb-4 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                Campus
              </h4>
              <ul className="space-y-2.5">
                {FOOTER_LINKS.campus.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-slate-400 hover:text-amber-400 transition-colors flex items-center gap-1.5 group"
                    >
                      <ChevronRight className="w-3 h-3 text-amber-500/30 opacity-0 group-hover:opacity-100 transition-opacity" />
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support - Premium */}
            <div>
              <h4 className="font-black text-sm uppercase tracking-wider text-amber-500 mb-4 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                Support
              </h4>
              <ul className="space-y-2.5">
                {FOOTER_LINKS.support.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-sm text-slate-400 hover:text-amber-400 transition-colors flex items-center gap-1.5 group"
                    >
                      <ChevronRight className="w-3 h-3 text-amber-500/30 opacity-0 group-hover:opacity-100 transition-opacity" />
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Trust Badges - Premium */}
        <div className="py-6 border-t border-purple-800/30">
          <div className="flex flex-wrap justify-center gap-6 md:gap-10">
            {TRUST_BADGES.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="flex items-center gap-2 text-xs text-slate-400 hover:text-white transition-colors"
                >
                  <Icon className="w-3.5 h-3.5 text-amber-500" />
                  <span className="font-medium">{item.label}</span>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Bottom Bar - Premium */}
        <div className="py-4 border-t border-purple-800/30">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 text-[10px] text-slate-500">
            <p className="flex items-center gap-1.5">
              © {new Date().getFullYear()} Daar-ul-Maysaroh.
              <span className="text-slate-600">All rights reserved.</span>
            </p>
            <div className="flex items-center gap-4">
              <Link href="/privacy" className="hover:text-amber-400 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-amber-400 transition-colors">
                Terms of Service
              </Link>
              <span className="flex items-center gap-1.5 text-slate-600">
                Made with <Heart className="w-3 h-3 text-rose-500 animate-pulse" /> by Al-Maysaroh
              </span>
            </div>
          </div>
        </div>

        {/* Premium Decorative Line */}
        <div className="h-0.5 bg-gradient-to-r from-transparent via-amber-500/30 to-transparent w-1/2 mx-auto" />
      </div>
    </footer>
  );
}