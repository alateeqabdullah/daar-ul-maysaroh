

// "use client";

// import {
//   BookOpen,
//   Facebook,
//   Youtube,
//   Instagram,
//   Twitter,
//   Heart,
//   ArrowUp,
//   ShieldCheck,
//   Globe,
//   GraduationCap,
//   Send,
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import Link from "next/link";

// export function Footer() {
//   const currentYear = new Date().getFullYear();

//   const scrollToTop = () => {
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   const footerLinks = {
//     Academic: [
//       { name: "Hifz Program", href: "/courses/hifz" },
//       { name: "Tajweed Mastery", href: "/courses/tajweed" },
//       { name: "Arabic Language", href: "/courses/arabic" },
//       { name: "Full Curriculum", href: "/courses" },
//     ],
//     Institute: [
//       { name: "The Methodology", href: "/about" },
//       { name: "Noble Faculty", href: "/teachers" },
//       { name: "Scholarly Council", href: "/teachers#council" },
//       { name: "Research", href: "/research" },
//     ],
//     Admissions: [
//       { name: "Enrollment Plans", href: "/pricing" },
//       { name: "Scholarships", href: "/pricing#grants" },
//       { name: "Admission FAQ", href: "/pricing#faq" },
//       { name: "Student Portal", href: "/dashboard" },
//     ],
//     Support: [
//       { name: "Help Center", href: "/legal" },
//       { name: "Contact Us", href: "/contact" },
//       { name: "Privacy Policy", href: "/legal" },
//       { name: "Terms of Service", href: "/legal" },
//     ],
//   };

//   return (
//     <footer className="relative bg-slate-950 text-white overflow-hidden border-t border-primary-900/50">
//       {/* 1. ARCHITECTURAL OVERLAY */}
//       <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('/islamic-pattern.svg')] bg-repeat bg-center" />
//       <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary-700/10 blur-[120px] rounded-full -z-10" />

//       {/* 2. NEWSLETTER / SCHOLARLY CIRCLE */}
//       <div className="container mx-auto px-6 pt-20 pb-16 border-b border-white/5">
//         <div className="grid lg:grid-cols-2 gap-12 items-center">
//           <div className="space-y-4">
//             <h3 className="text-3xl font-black uppercase tracking-tighter font-heading">
//               Join the{" "}
//               <span className="text-primary-400">Scholarly Circle.</span>
//             </h3>
//             <p className="text-slate-400 font-medium max-w-md">
//               Receive academic updates, Quranic insights, and institutional
//               announcements directly from our Dean.
//             </p>
//           </div>
//           <form className="relative group">
//             <input
//               type="email"
//               placeholder="Enter your scholarly email"
//               className="w-full h-16 bg-white/5 border border-white/10 rounded-2xl px-6 outline-none focus:border-primary-500 transition-all font-medium pr-36"
//             />
//             <Button className="absolute right-2 top-2 h-12 px-6 rounded-xl bg-primary-700 hover:bg-primary-600 font-black text-[10px] tracking-widest uppercase shadow-lg group-hover:animate-shimmer">
//               SUBSCRIBE <Send className="ml-2 w-3 h-3" />
//             </Button>
//           </form>
//         </div>
//       </div>

//       {/* 3. MAIN FOOTER CONTENT */}
//       <div className="container mx-auto px-6 py-20">
//         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-12">
//           {/* Brand Pillar */}
//           <div className="col-span-2 space-y-8">
//             <div className="flex items-center space-x-4">
//               <div className="w-12 h-12 bg-primary-700 rounded-2xl flex items-center justify-center shadow-2xl">
//                 <BookOpen className="h-7 w-7 text-white" />
//               </div>
//               <div>
//                 <h1 className="text-2xl font-black tracking-tighter leading-none">
//                   AL-MAYSAROH
//                 </h1>
//                 <p className="text-[10px] text-primary-400 font-bold tracking-[0.3em] uppercase">
//                   International Institute
//                 </p>
//               </div>
//             </div>

//             <div className="space-y-4">
//               <div className="quran-monumental text-3xl text-right opacity-30 pointer-events-none">
//                 بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
//               </div>
//               <p className="text-slate-400 text-sm leading-relaxed font-medium text-balance">
//                 A distinguished sanctuary for the preservation of Quranic
//                 traditions through Ijazah-certified academic excellence and
//                 global digital accessibility.
//               </p>
//             </div>

//             <div className="flex items-center gap-4">
//               {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
//                 <Link
//                   key={i}
//                   href="#"
//                   className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary-700 hover:border-primary-700 transition-all group"
//                 >
//                   <Icon className="w-4 h-4 text-slate-400 group-hover:text-white" />
//                 </Link>
//               ))}
//             </div>
//           </div>

//           {/* Links Pillars */}
//           {Object.entries(footerLinks).map(([title, links]) => (
//             <div key={title} className="space-y-6">
//               <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-400">
//                 {title}
//               </h4>
//               <ul className="space-y-4">
//                 {links.map((link) => (
//                   <li key={link.name}>
//                     <Link
//                       href={link.href}
//                       className="text-sm font-bold text-slate-400 hover:text-white transition-colors"
//                     >
//                       {link.name}
//                     </Link>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* 4. INSTITUTIONAL STATUS BAR */}
//       <div className="bg-primary-950/50 border-y border-white/5 py-8">
//         <div className="container mx-auto px-6 flex flex-wrap justify-between items-center gap-8">
//           <div className="flex items-center gap-4">
//             <Globe className="w-5 h-5 text-primary-400" />
//             <span className="text-[10px] font-black uppercase tracking-widest opacity-60">
//               Global Presence: 50+ Nations
//             </span>
//           </div>
//           <div className="flex items-center gap-4">
//             <ShieldCheck className="w-5 h-5 text-accent" />
//             <span className="text-[10px] font-black uppercase tracking-widest opacity-60">
//               Traditional Sanad Verified
//             </span>
//           </div>
//           <div className="flex items-center gap-4">
//             <GraduationCap className="w-5 h-5 text-gold" />
//             <span className="text-[10px] font-black uppercase tracking-widest opacity-60">
//               Al-Azhar Affiliated Faculty
//             </span>
//           </div>
//         </div>
//       </div>

//       {/* 5. LEGAL BOTTOM BAR */}
//       <div className="container mx-auto px-6 py-10 flex flex-col md:flex-row justify-between items-center gap-6">
//         <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
//           <span>
//             &copy; {currentYear} Al-Maysaroh Institute. All Rights
//             Reserved.
//           </span>
//           <Heart className="w-3 h-3 text-red-900 fill-current" />
//         </div>

//         <div className="flex items-center gap-8">
//           <div className="flex gap-4 text-[10px] font-black uppercase tracking-widest text-slate-500">
//             <Link
//               href="/privacy"
//               className="hover:text-white transition-colors"
//             >
//               Privacy
//             </Link>
//             <Link href="/terms" className="hover:text-white transition-colors">
//               Terms
//             </Link>
//             <Link
//               href="/sitemap"
//               className="hover:text-white transition-colors"
//             >
//               Sitemap
//             </Link>
//           </div>

//           <button
//             onClick={scrollToTop}
//             className="w-10 h-10 rounded-full bg-primary-700 text-white flex items-center justify-center hover:scale-110 transition-all shadow-xl"
//           >
//             <ArrowUp className="w-5 h-5" />
//           </button>
//         </div>
//       </div>
//     </footer>
//   );
// }


















"use client";

import {
  BookOpen,
  Facebook,
  Youtube,
  Instagram,
  Twitter,
  Heart,
  ArrowUp,
  ShieldCheck,
  Send,
  Crown,
  Scroll,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const footerLinks = {
    Programs: [
      { name: "Hifz Al-Quran", href: "/courses/hifz" },
      { name: "Tajweed Mastery", href: "/courses/tajweed" },
      { name: "Quranic Arabic", href: "/courses/arabic" },
      { name: "Group Qiro'ah", href: "/courses/group-qiroah" },
      { name: "All Courses", href: "/courses" },
    ],
    Institute: [
      { name: "Our Scholars", href: "/teachers" },
      { name: "Methodology", href: "/methodology" },
      { name: "About Us", href: "/about" },
      { name: "Resources", href: "/resources" },
      { name: "Contact", href: "/contact" },
    ],
    Admission: [
      { name: "Free Assessment", href: "/assessment" },
      { name: "Pricing", href: "/pricing" },
      { name: "Scholarships", href: "/pricing#grants" },
      { name: "Student Portal", href: "/dashboard" },
      { name: "FAQ", href: "/faq" },
    ],
    Legal: [
      { name: "Privacy Policy", href: "/legal" },
      { name: "Terms of Service", href: "/legal" },
      { name: "Refund Policy", href: "/legal" },
      { name: "Sitemap", href: "/sitemap" },
    ],
  };

  return (
    <footer className="relative bg-slate-950 text-white">
      <div className="absolute inset-0 opacity-[0.02] bg-[url('/islamic-pattern.svg')] bg-repeat bg-center pointer-events-none" />

      <div className="container mx-auto px-6 py-16 lg:py-20">
        {/* Top Section */}
        <div className="grid lg:grid-cols-2 gap-12 pb-12 border-b border-white/10">
          {/* Brand */}
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-amber-500 rounded-xl flex items-center justify-center shadow-lg">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-black tracking-tight">
                  AL-MAYSAROH
                </h1>
                <p className="text-[9px] text-amber-500 font-bold tracking-[0.25em] uppercase">
                  International Institute
                </p>
              </div>
            </div>

            {/* Quranic Verse - Surah Al-Isra 17:80 */}
            <div className="space-y-2">
              <div className="quran-monumental text-lg text-right opacity-40 leading-relaxed">
                وَقُل رَّبِّ أَدْخِلْنِي مُدْخَلَ صِدْقٍ وَأَخْرِجْنِي مُخْرَجَ
                صِدْقٍ وَاجْعَل لِّي مِن لَّدُنكَ سُلْطَانًا نَّصِيرًا
              </div>
              <p className="text-[10px] text-slate-500 italic">
               {` "My Lord, grant me an honourable entry and an honourable exit,
                and give me supporting authority from Your presence."`}
              </p>
              <p className="text-[9px] text-slate-600">
                — Surah Al-Isra (17:80)
              </p>
            </div>

            <p className="text-slate-400 text-sm leading-relaxed max-w-md pt-2">
              Preserving the authentic transmission of the Quran through
              Ijazah-certified scholarship and global accessibility.
            </p>

            <div className="flex items-center gap-4 pt-2">
              <a
                href="#"
                className="text-slate-500 hover:text-amber-500 transition"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="text-slate-500 hover:text-amber-500 transition"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="text-slate-500 hover:text-amber-500 transition"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="text-slate-500 hover:text-amber-500 transition"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Crown className="w-4 h-4 text-amber-500" />
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-500">
              {`  Dean's Circle`}
              </span>
            </div>
            <h3 className="text-xl font-bold">Join the Scholarly Circle</h3>
            <p className="text-slate-400 text-sm">
              Receive academic updates and Quranic insights from our Dean.
            </p>
            <div className="flex max-w-md">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 h-11 px-4 bg-white/5 border border-white/10 rounded-l-xl outline-none focus:border-amber-500 text-sm"
              />
              <Button className="h-11 px-5 rounded-r-xl bg-gradient-to-r from-purple-600 to-amber-500 hover:from-purple-700 hover:to-amber-600 text-white font-bold text-sm">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12">
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title} className="space-y-4">
              <h4 className="text-[10px] font-bold uppercase tracking-wider text-amber-500">
                {title}
              </h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-400 hover:text-white transition"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span>© {currentYear} Al-Maysaroh Institute</span>
            <span className="hidden xs:inline">•</span>
            <span>All Rights Reserved</span>
            <Heart className="w-3 h-3 text-amber-500 fill-amber-500" />
          </div>

          <div className="flex items-center gap-5">
            <div className="flex items-center gap-1.5">
              <Scroll className="w-3.5 h-3.5 text-amber-500" />
              <span className="text-[8px] font-black uppercase tracking-wider text-slate-500">
                Authentic Sanad
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
              <span className="text-[8px] font-black uppercase tracking-wider text-slate-500">
                Ijazah Certified
              </span>
            </div>
            <button
              onClick={scrollToTop}
              className="w-8 h-8 rounded-full bg-white/5 hover:bg-gradient-to-r hover:from-purple-600 hover:to-amber-500 transition flex items-center justify-center group"
            >
              <ArrowUp className="w-4 h-4 text-slate-400 group-hover:text-white" />
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .quran-monumental {
          font-family:
            "Amiri", "Scheherazade", "Lateef", "Noto Naskh Arabic", serif;
        }
      `}</style>
    </footer>
  );
}
