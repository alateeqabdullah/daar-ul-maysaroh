// // app/(marketing)/onsite/components/layout/OnsiteFooter.tsx
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
//   ChevronRight,
//   Building2,
// } from "lucide-react";
// import { motion } from "framer-motion";

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
//     { label: "Boarding Programme", href: "/onsite/boarding" },
//     { label: "Day Programme", href: "/onsite/boarding#day" },
//     { label: "Attendance Options", href: "/onsite/attendance" },
//     { label: "Student Life", href: "/onsite/student-life" },
//     { label: "Schedule", href: "/onsite/schedule" },
//   ],
//   support: [
//     { label: "Admissions", href: "/onsite/admissions" },
//     { label: "Contact", href: "/onsite/contact" },
//     { label: "FAQ", href: "/onsite/faq" },
//     { label: "Fees", href: "/onsite/fees" },
//     { label: "Apply Now", href: "/onsite/admissions" },
//   ],
// };

// const SOCIAL_LINKS = [
//   {
//     icon: Instagram,
//     href: "https://instagram.com/almaysaroh",
//     label: "Instagram",
//     color: "hover:text-pink-500",
//   },
//   {
//     icon: Facebook,
//     href: "https://facebook.com/almaysaroh",
//     label: "Facebook",
//     color: "hover:text-blue-500",
//   },
//   {
//     icon: Twitter,
//     href: "https://twitter.com/almaysaroh",
//     label: "Twitter",
//     color: "hover:text-sky-400",
//   },
//   {
//     icon: Youtube,
//     href: "https://youtube.com/almaysaroh",
//     label: "YouTube",
//     color: "hover:text-red-500",
//   },
// ];

// const TRUST_BADGES = [
//   { icon: Shield, label: "Ijazah Certified" },
//   { icon: Crown, label: "Authentic Sanad" },
//   { icon: Clock, label: "Full-Time Program" },
//   { icon: Users, label: "50+ Students" },
//   { icon: Globe, label: "Global Reach" },
// ];

// export function OnsiteFooter() {
//   return (
//     <footer className="relative bg-background dark:bg-slate-950 border-t border-purple-200/20 dark:border-purple-800/30 overflow-hidden">
//       {/* Premium Background Effects */}
//       <div className="absolute inset-0 pointer-events-none">
//         <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-purple-600/10 dark:bg-purple-600/5 rounded-full blur-[150px]" />
//         <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-amber-500/10 dark:bg-amber-500/5 rounded-full blur-[150px]" />
//         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/5 dark:bg-purple-600/3 rounded-full blur-[200px]" />

//         {/* Islamic Pattern */}
//         <div
//           className="absolute inset-0 bg-[url('/islamic-pattern.svg')] bg-center bg-repeat opacity-[0.02] dark:opacity-[0.02] pointer-events-none"
//           style={{ backgroundSize: "300px" }}
//         />
//       </div>

//       {/* Main Footer */}
//       <div className="container mx-auto px-4 xs:px-5 sm:px-6 relative z-10">
//         <div className="py-12 md:py-16 lg:py-20">
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
//             {/* Brand Column */}
//             <div className="lg:col-span-2 space-y-5">
//               <Link href="/onsite" className="flex items-center gap-3 group">
//                 <div className="relative">
//                   <div className="absolute inset-0 bg-linear-to-r from-purple-600 to-amber-500 rounded-2xl blur-md opacity-50 group-hover:opacity-100 transition-opacity" />
//                   <div className="relative w-10 h-10 md:w-12 md:h-12 bg-linear-to-br from-purple-600 to-amber-500 rounded-2xl flex items-center justify-center shadow-2xl group-hover:scale-105 group-hover:rotate-3 transition-all duration-300">
//                     <Building2 className="h-5 w-5 md:h-6 md:w-6 text-white" />
//                   </div>
//                 </div>
//                 <div>
//                   <span className="font-black text-lg tracking-tight text-foreground">
//                     <span className="text-purple-700 dark:text-purple-400">
//                       Al-May
//                     </span>
//                     <span className="text-amber-600 dark:text-amber-400">
//                       saroh
//                     </span>
//                   </span>
//                   <p className="text-[8px] font-black uppercase tracking-[0.3em] text-amber-600 dark:text-amber-500">
//                     Institute(onsite)
//                   </p>
//                 </div>
//               </Link>

//               <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
//                 Daar-ul-Maysaroh is a full-time Quran memorization institute
//                 dedicated to producing carriers of the Quran with authentic
//                 Sanad in Ibadan, Nigeria.
//               </p>

//               {/* Contact Info */}
//               <div className="space-y-2.5">
//                 {[
//                   { icon: MapPin, text: "Ibadan, Nigeria" },
//                   { icon: Phone, text: "+234 911 016 3930" },
//                   { icon: Mail, text: "info.almaysaroh@gmail.com" },
//                 ].map((item, idx) => {
//                   const Icon = item.icon;
//                   return (
//                     <motion.div
//                       key={idx}
//                       whileHover={{ x: 3 }}
//                       className="flex items-center gap-3 text-sm group"
//                     >
//                       <div className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-600/20 flex items-center justify-center shrink-0 group-hover:bg-purple-200 dark:group-hover:bg-purple-600/30 transition-colors">
//                         <Icon className="w-4 h-4 text-purple-600 dark:text-amber-500" />
//                       </div>
//                       <span className="text-muted-foreground group-hover:text-foreground dark:group-hover:text-white transition-colors">
//                         {item.text}
//                       </span>
//                     </motion.div>
//                   );
//                 })}
//               </div>

//               {/* Social Links */}
//               <div className="flex gap-2 pt-2">
//                 {SOCIAL_LINKS.map((social, i) => {
//                   const Icon = social.icon;
//                   return (
//                     <motion.a
//                       key={i}
//                       href={social.href}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       whileHover={{ y: -3, scale: 1.05 }}
//                       className={`p-2.5 rounded-full bg-muted/30 dark:bg-white/5 hover:bg-muted/50 dark:hover:bg-white/10 border border-border dark:border-white/10 transition-all ${social.color}`}
//                       aria-label={social.label}
//                     >
//                       <Icon className="w-4 h-4 text-muted-foreground dark:text-slate-400 group-hover:text-current" />
//                     </motion.a>
//                   );
//                 })}
//               </div>
//             </div>

//             {/* Programs */}
//             <div>
//               <h4 className="font-black text-sm uppercase tracking-wider text-purple-600 dark:text-amber-500 mb-4 flex items-center gap-2">
//                 <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
//                 Programs
//               </h4>
//               <ul className="space-y-2.5">
//                 {FOOTER_LINKS.programs.map((item) => (
//                   <li key={item.href}>
//                     <Link
//                       href={item.href}
//                       className="text-sm text-muted-foreground hover:text-purple-600 dark:hover:text-amber-400 transition-colors flex items-center gap-1.5 group"
//                     >
//                       <ChevronRight className="w-3 h-3 text-amber-500/30 opacity-0 group-hover:opacity-100 transition-opacity" />
//                       {item.label}
//                     </Link>
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             {/* Campus */}
//             <div>
//               <h4 className="font-black text-sm uppercase tracking-wider text-purple-600 dark:text-amber-500 mb-4 flex items-center gap-2">
//                 <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
//                 Campus
//               </h4>
//               <ul className="space-y-2.5">
//                 {FOOTER_LINKS.campus.map((item) => (
//                   <li key={item.href}>
//                     <Link
//                       href={item.href}
//                       className="text-sm text-muted-foreground hover:text-purple-600 dark:hover:text-amber-400 transition-colors flex items-center gap-1.5 group"
//                     >
//                       <ChevronRight className="w-3 h-3 text-amber-500/30 opacity-0 group-hover:opacity-100 transition-opacity" />
//                       {item.label}
//                     </Link>
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             {/* Support */}
//             <div>
//               <h4 className="font-black text-sm uppercase tracking-wider text-purple-600 dark:text-amber-500 mb-4 flex items-center gap-2">
//                 <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
//                 Support
//               </h4>
//               <ul className="space-y-2.5">
//                 {FOOTER_LINKS.support.map((item) => (
//                   <li key={item.label}>
//                     <Link
//                       href={item.href}
//                       className="text-sm text-muted-foreground hover:text-purple-600 dark:hover:text-amber-400 transition-colors flex items-center gap-1.5 group"
//                     >
//                       <ChevronRight className="w-3 h-3 text-amber-500/30 opacity-0 group-hover:opacity-100 transition-opacity" />
//                       {item.label}
//                     </Link>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </div>
//         </div>

//         {/* Trust Badges */}
//         <div className="py-6 border-t border-border dark:border-purple-800/30">
//           <div className="flex flex-wrap justify-center gap-6 md:gap-10">
//             {TRUST_BADGES.map((item, idx) => {
//               const Icon = item.icon;
//               return (
//                 <motion.div
//                   key={idx}
//                   initial={{ opacity: 0, y: 10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: idx * 0.05 }}
//                   className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground dark:hover:text-white transition-colors"
//                 >
//                   <Icon className="w-3.5 h-3.5 text-amber-500" />
//                   <span className="font-medium">{item.label}</span>
//                 </motion.div>
//               );
//             })}
//           </div>
//         </div>

//         {/* Bottom Bar */}
//         <div className="py-4 border-t border-border dark:border-purple-800/30">
//           <div className="flex flex-col sm:flex-row justify-between items-center gap-3 text-[10px] text-muted-foreground">
//             <p className="flex items-center gap-1.5">
//               © {new Date().getFullYear()} Daar-ul-Maysaroh.
//               <span className="text-muted-foreground/50">
//                 All rights reserved.
//               </span>
//             </p>
//             <div className="flex items-center gap-4">
//               <Link
//                 href="/privacy"
//                 className="hover:text-purple-600 dark:hover:text-amber-400 transition-colors"
//               >
//                 Privacy Policy
//               </Link>
//               <Link
//                 href="/terms"
//                 className="hover:text-purple-600 dark:hover:text-amber-400 transition-colors"
//               >
//                 Terms of Service
//               </Link>
//               <span className="flex items-center gap-1.5 text-muted-foreground/50">
//                 Made with{" "}
//                 <Heart className="w-3 h-3 text-rose-500 animate-pulse" /> by
//                 Al-Maysaroh
//               </span>
//             </div>
//           </div>
//         </div>

//         {/* Decorative Line */}
//         <div className="h-0.5 bg-linear-to-r from-transparent via-amber-500/30 to-transparent w-1/2 mx-auto" />
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
  ChevronRight,
  BookOpen,
} from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  BRAND TOKENS — matches the landing page                            */
/* ------------------------------------------------------------------ */

const G = "from-purple-700 via-purple-600 to-amber-500";
const G_DARK = "dark:from-purple-400 dark:via-purple-400 dark:to-amber-400";

const BRAND = {
  purple: "text-purple-700 dark:text-purple-300",
  purpleSoft: "text-purple-600/70 dark:text-purple-300/70",

  gradientText: `bg-gradient-to-r ${G} ${G_DARK} bg-clip-text text-transparent`,
  gradientFill: `bg-gradient-to-r ${G} ${G_DARK}`,
  gradientFillHover: `hover:from-purple-800 hover:via-purple-700 hover:to-amber-600 dark:hover:from-purple-300 dark:hover:via-purple-300 dark:hover:to-amber-300`,
  gradientRule: `bg-gradient-to-r ${G} ${G_DARK}`,
  gradientRuleVert: `bg-gradient-to-b ${G} ${G_DARK}`,
};

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

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
  { icon: Instagram, href: "https://instagram.com/almaysaroh", label: "Instagram" },
  { icon: Facebook, href: "https://facebook.com/almaysaroh", label: "Facebook" },
  { icon: Twitter, href: "https://twitter.com/almaysaroh", label: "Twitter" },
  { icon: Youtube, href: "https://youtube.com/almaysaroh", label: "YouTube" },
];

const TRUST_BADGES = [
  { icon: Shield, label: "Ijazah Certified" },
  { icon: Crown, label: "Authentic Sanad" },
  { icon: Clock, label: "Full-Time Programme" },
  { icon: Users, label: "50+ Students" },
  { icon: Globe, label: "Global Reach" },
];

const CONTACT_ITEMS = [
  { icon: MapPin, text: "Ibadan, Nigeria" },
  { icon: Phone, text: "+234 911 016 3930" },
  { icon: Mail, text: "info.almaysaroh@gmail.com" },
];

/* ------------------------------------------------------------------ */
/*  FOOTER                                                             */
/* ------------------------------------------------------------------ */

export function OnsiteFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-foreground/10 bg-background">
      {/* Quiet brand wash — same language as the landing page hero */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(900px 500px at 15% -10%, hsl(262 83% 58% / 0.05), transparent 60%), radial-gradient(700px 400px at 90% 100%, #d4af37 / 0.05, transparent 60%)",
        }}
      />

      <div className="container relative z-10 mx-auto px-6 lg:px-8">
        {/* ---------- Main footer ---------- */}
        <div className="py-16 md:py-20 lg:py-24">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-12">
            {/* ---------- Brand column ---------- */}
            <div className="space-y-6 lg:col-span-4">
              <Link href="/onsite" className="group inline-flex items-center gap-3">
                {/* Gradient logo mark — no blur glow, the gradient IS the logo */}
                <span
                  className={cn(
                    "flex h-12 w-12 items-center justify-center rounded-2xl shadow-lg shadow-purple-700/20 transition-transform duration-300 group-hover:scale-[1.03]",
                    BRAND.gradientFill
                  )}
                >
                  <BookOpen className="h-5 w-5 text-white" strokeWidth={1.75} />
                </span>
                <span className="flex flex-col">
                  <span
                    className={cn(
                      "bg-clip-text font-heading text-[20px] font-bold leading-none tracking-[-0.01em] text-transparent",
                      "bg-gradient-to-r",
                      G,
                      G_DARK
                    )}
                  >
                    Al-Maysaroh
                  </span>
                  <span className="mt-1 text-[9px] font-semibold uppercase tracking-[0.28em] text-foreground/55">
                    Institute · Onsite
                  </span>
                </span>
              </Link>

              {/* Arabic wordmark — same as page hero */}
              <p
                dir="rtl"
                lang="ar"
                className={cn(
                  "bg-clip-text font-quran text-[22px] leading-tight text-transparent",
                  "bg-gradient-to-r",
                  G,
                  G_DARK
                )}
              >
                دار الميسرة
              </p>

              <p className="max-w-sm text-[13px] leading-relaxed text-foreground/65">
                Daar-ul-Maysaroh is a full-time Qur&apos;an memorisation
                institute dedicated to producing carriers of the Qur&apos;an
                with authentic Sanad — in Ibadan, Nigeria.
              </p>

              {/* Contact */}
              <ul className="space-y-3 pt-2">
                {CONTACT_ITEMS.map((item) => {
                  const Icon = item.icon;
                  return (
                    <li key={item.text} className="flex items-center gap-3">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-purple-700/15 bg-purple-50/60 text-purple-700 dark:border-purple-300/15 dark:bg-purple-950/30 dark:text-purple-300">
                        <Icon className="h-3.5 w-3.5" strokeWidth={1.75} />
                      </span>
                      <span className="text-[13px] text-foreground/70">
                        {item.text}
                      </span>
                    </li>
                  );
                })}
              </ul>

              {/* Social — muted, purple on hover, no brand-color rainbows */}
              <div className="flex gap-2 pt-2">
                {SOCIAL_LINKS.map((social) => {
                  const Icon = social.icon;
                  return (
                    <Link
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="group flex h-9 w-9 items-center justify-center rounded-full border border-foreground/10 bg-background transition-all duration-300 hover:border-purple-700/40 hover:bg-purple-50/60 dark:hover:border-purple-300/40 dark:hover:bg-purple-950/30"
                    >
                      <Icon
                        className="h-3.5 w-3.5 text-foreground/50 transition-colors duration-300 group-hover:text-purple-700 dark:group-hover:text-purple-300"
                        strokeWidth={1.75}
                      />
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* ---------- Link columns ---------- */}
            {(
              [
                { title: "Programmes", items: FOOTER_LINKS.programs },
                { title: "Campus", items: FOOTER_LINKS.campus },
                { title: "Support", items: FOOTER_LINKS.support },
              ] as const
            ).map((column, colIdx) => (
              <div
                key={column.title}
                className={cn(
                  "lg:col-span-3",
                  colIdx === 2 && "md:col-span-2 lg:col-span-2"
                )}
              >
                {/* Column header with brand gradient rule */}
                <div className="mb-5 flex items-center gap-3">
                  <span
                    aria-hidden
                    className={cn("h-px w-6", BRAND.gradientRule)}
                  />
                  <h4 className="text-[11px] font-semibold uppercase tracking-[0.22em] text-foreground/70">
                    {column.title}
                  </h4>
                </div>

                <ul className="space-y-2.5">
                  {column.items.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="group inline-flex items-center gap-2 text-[13px] text-foreground/65 transition-colors duration-300 hover:text-purple-700 dark:hover:text-purple-300"
                      >
                        <ChevronRight
                          className="h-3 w-3 -translate-x-1 text-purple-700/0 transition-all duration-300 group-hover:translate-x-0 group-hover:text-purple-700/70 dark:group-hover:text-purple-300/70"
                          strokeWidth={2}
                        />
                        <span className="transition-transform duration-300 group-hover:translate-x-0.5">
                          {item.label}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* ---------- Trust badges ---------- */}
        <div className="border-t border-foreground/10 py-8">
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {TRUST_BADGES.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.label}
                  className="flex items-center gap-2 text-[11px] text-foreground/60"
                >
                  <span
                    className={cn(
                      "flex h-6 w-6 items-center justify-center rounded-md",
                      BRAND.gradientFill
                    )}
                  >
                    <Icon
                      className="h-3 w-3 text-white"
                      strokeWidth={2}
                    />
                  </span>
                  <span className="font-medium">{item.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* ---------- Bottom bar ---------- */}
        <div className="border-t border-foreground/10 py-6">
          <div className="flex flex-col items-center justify-between gap-4 text-[11px] text-foreground/55 sm:flex-row">
            <p>
              © {new Date().getFullYear()} Daar-ul-Maysaroh.{" "}
              <span className="text-foreground/40">All rights reserved.</span>
            </p>

            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
              <Link
                href="/privacy"
                className="transition-colors duration-300 hover:text-purple-700 dark:hover:text-purple-300"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="transition-colors duration-300 hover:text-purple-700 dark:hover:text-purple-300"
              >
                Terms of Service
              </Link>
              <span className="flex items-center gap-1.5">
                Made with{" "}
                <Heart
                  className={cn(
                    "h-3 w-3 fill-current",
                    "text-purple-700 dark:text-purple-300"
                  )}
                  strokeWidth={1.5}
                />{" "}
                by Al-Maysaroh
              </span>
            </div>
          </div>
        </div>

        {/* ---------- Bottom gradient rule ---------- */}
        <div className="pb-6">
          <div
            aria-hidden
            className={cn(
              "mx-auto h-px w-1/2 bg-gradient-to-r from-transparent via-purple-600/40 to-transparent",
              "dark:via-purple-300/40"
            )}
          />
        </div>
      </div>
    </footer>
  );
}