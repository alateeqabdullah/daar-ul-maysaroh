// // src/components/layout/footer.tsx - ENHANCED
// "use client";

// import { motion } from "framer-motion";
// import {
//   BookOpen,
//   Mail,
//   Phone,
//   MapPin,
//   Facebook,
//   Youtube,
//   Instagram,
//   Twitter,
//   Heart,
//   ArrowUp,

// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import Link from "next/link";
// import { useState } from "react";

// export function Footer() {
//   const [email, setEmail] = useState("");
//   const currentYear = new Date().getFullYear();

//   const scrollToTop = () => {
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   const handleNewsletterSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     // Handle newsletter subscription
//     console.log("Newsletter subscription:", email);
//     setEmail("");
//     alert("Thank you for subscribing to our newsletter!");
//   };

//   const footerSections = [
//     {
//       title: "Courses",
//       links: [
//         { name: "Quran Recitation", href: "/courses/one-on-one" },
//         { name: "Hifz Program", href: "/courses/hifz" },
//         { name: "Tajweed Mastery", href: "/courses/tajweed" },
//         { name: "Group Courses", href: "/courses/group" },
//         { name: "Arabic Language", href: "/courses/arabic" },
//       ],
//     },
//     {
//       title: "Institute",
//       links: [
//         { name: "About Us", href: "/about" },
//         { name: "Our Teachers", href: "/teachers" },
//         { name: "Success Stories", href: "/testimonials" },
//         { name: "Blog", href: "/blog" },
//         { name: "Careers", href: "/careers" },
//       ],
//     },
//     {
//       title: "Support",
//       links: [
//         { name: "Help Center", href: "/help" },
//         { name: "Contact Us", href: "/contact" },
//         { name: "FAQ", href: "/faq" },
//         { name: "Privacy Policy", href: "/privacy" },
//         { name: "Terms of Service", href: "/terms" },
//       ],
//     },
//     {
//       title: "Resources",
//       links: [
//         { name: "Learning Materials", href: "/resources" },
//         { name: "Quran Videos", href: "/videos" },
//         { name: "Mobile App", href: "/app" },
//         { name: "Gift Cards", href: "/gift-cards" },
//         { name: "Affiliate Program", href: "/affiliate" },
//       ],
//     },
//   ];

//   const contactInfo = [
//     {
//       icon: Phone,
//       text: "+1 (555) 123-4567",
//       description: "Mon to Fri 9am to 6pm",
//     },
//     {
//       icon: Mail,
//       text: "admin@almaysaroh.com",
//       description: "Email support",
//     },
//     {
//       icon: MapPin,
//       text: "123 Islamic Center, Education City",
//       description: "Doha, Qatar",
//     },
//   ];

//   const socialLinks = [
//     {
//       icon: Facebook,
//       href: "https://facebook.com/almaysaroh",
//       label: "Facebook",
//     },
//     { icon: Twitter, href: "https://twitter.com/almaysaroh", label: "Twitter" },
//     {
//       icon: Instagram,
//       href: "https://instagram.com/almaysaroh",
//       label: "Instagram",
//     },
//     { icon: Youtube, href: "https://youtube.com/almaysaroh", label: "YouTube" },
//   ];

//   return (
//     <footer className="bg-foreground text-background relative overflow-hidden">
//       {/* Background Pattern */}
//       <div className="absolute inset-0 opacity-5">
//         <div
//           className="absolute inset-0"
//           style={{
//             backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
//           }}
//         />
//       </div>

//       <div className="relative z-10">
//         {/* Main Footer Content */}
//         <div className="container mx-auto px-4 lg:px-6 py-12 lg:py-16">
//           <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 mb-12">
//             {/* Brand & Newsletter Section */}
//             <div className="space-y-6">
//               {/* Brand */}
//               <div className="flex items-center space-x-3">
//                 <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center">
//                   <BookOpen className="w-6 h-6 text-white" />
//                 </div>
//                 <div>
//                   <h3 className="text-2xl font-heading font-bold">
//                     Al-Maysaroh
//                   </h3>
//                   <p className="text-background/80 text-sm">Quran Institute</p>
//                 </div>
//               </div>

//               <p className="text-background/80 text-lg max-w-md">
//                 Dedicated to providing authentic Quranic education with
//                 qualified teachers and modern teaching methodologies for
//                 students worldwide.
//               </p>

//               {/* Newsletter */}
//               <div className="space-y-4">
//                 <h4 className="font-heading font-bold text-lg">Stay Updated</h4>
//                 <p className="text-background/70 text-sm">
//                   Subscribe to our newsletter for course updates and Islamic
//                   insights.
//                 </p>
//                 <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
//                   <input
//                     type="email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     placeholder="Enter your email"
//                     className="flex-1 px-4 py-3 bg-background/10 border border-background/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent placeholder-background/50 text-background"
//                     required
//                   />
//                   <Button
//                     type="submit"
//                     className="bg-primary text-primary-foreground hover:bg-primary/90 whitespace-nowrap"
//                   >
//                     Subscribe
//                   </Button>
//                 </form>
//               </div>
//             </div>

//             {/* Links Grid */}
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
//               {footerSections.map((section, index) => (
//                 <motion.div
//                   key={section.title}
//                   initial={{ opacity: 0, y: 20 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   transition={{ delay: index * 0.1 }}
//                   className="space-y-4"
//                 >
//                   <h4 className="font-heading font-bold text-lg">
//                     {section.title}
//                   </h4>
//                   <nav className="space-y-2">
//                     {section.links.map((link) => (
//                       <Link
//                         key={link.name}
//                         href={link.href}
//                         className="block text-background/70 hover:text-background transition-colors text-sm hover:translate-x-1 transition-transform duration-200"
//                       >
//                         {link.name}
//                       </Link>
//                     ))}
//                   </nav>
//                 </motion.div>
//               ))}
//             </div>
//           </div>

//           {/* Contact & Social Section */}
//           <div className="grid lg:grid-cols-2 gap-8 pt-8 border-t border-background/20">
//             {/* Contact Info */}
//             <div className="space-y-6">
//               <h4 className="font-heading font-bold text-lg">Get In Touch</h4>
//               <div className="space-y-4">
//                 {contactInfo.map((item, index) => (
//                   <motion.div
//                     key={item.text}
//                     initial={{ opacity: 0, x: -20 }}
//                     whileInView={{ opacity: 1, x: 0 }}
//                     transition={{ delay: index * 0.1 }}
//                     className="flex items-start space-x-3"
//                   >
//                     <div className="w-10 h-10 bg-background/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
//                       <item.icon className="w-5 h-5 text-background/80" />
//                     </div>
//                     <div>
//                       <p className="font-medium text-background">{item.text}</p>
//                       <p className="text-background/70 text-sm">
//                         {item.description}
//                       </p>
//                     </div>
//                   </motion.div>
//                 ))}
//               </div>
//             </div>

//             {/* Social Links */}
//             <div className="space-y-6">
//               <h4 className="font-heading font-bold text-lg">Follow Us</h4>
//               <div className="flex space-x-4">
//                 {socialLinks.map((social, index) => (
//                   <motion.a
//                     key={social.label}
//                     href={social.href}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     initial={{ opacity: 0, scale: 0.8 }}
//                     whileInView={{ opacity: 1, scale: 1 }}
//                     transition={{ delay: index * 0.1 }}
//                     whileHover={{ scale: 1.1 }}
//                     className="w-12 h-12 bg-background/10 rounded-lg flex items-center justify-center hover:bg-background/20 transition-colors group"
//                     aria-label={social.label}
//                   >
//                     <social.icon className="w-5 h-5 text-background/80 group-hover:text-background transition-colors" />
//                   </motion.a>
//                 ))}
//               </div>

//               {/* App Download CTA */}
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.4 }}
//                 className="bg-background/10 rounded-xl p-4 border border-background/20"
//               >
//                 <div className="flex items-center space-x-3">
//                   <BookOpen className="w-8 h-8 text-primary" />
//                   <div className="flex-1">
//                     <p className="font-medium text-background text-sm">
//                       Mobile App
//                     </p>
//                     <p className="text-background/70 text-xs">
//                       Learn on the go
//                     </p>
//                   </div>
//                   <Button
//                     size="sm"
//                     className="bg-primary text-primary-foreground hover:bg-primary/90 text-xs"
//                   >
//                     Download
//                   </Button>
//                 </div>
//               </motion.div>
//             </div>
//           </div>
//         </div>

//         {/* Bottom Bar */}
//         <div className="border-t border-background/20">
//           <div className="container mx-auto px-4 lg:px-6 py-6">
//             <div className="flex flex-col md:flex-row items-center justify-between gap-4">
//               {/* Copyright */}
//               <div className="flex items-center space-x-2 text-background/70 text-sm">
//                 <span>
//                   &copy; {currentYear} Al-Maysaroh Quran Institute. All rights
//                   reserved.
//                 </span>
//                 <Heart className="w-4 h-4 text-red-400" />
//               </div>

//               {/* Additional Links */}
//               <div className="flex items-center space-x-6 text-sm text-background/70">
//                 <Link
//                   href="/privacy"
//                   className="hover:text-background transition-colors"
//                 >
//                   Privacy Policy
//                 </Link>
//                 <Link
//                   href="/terms"
//                   className="hover:text-background transition-colors"
//                 >
//                   Terms of Service
//                 </Link>
//                 <Link
//                   href="/sitemap"
//                   className="hover:text-background transition-colors"
//                 >
//                   Sitemap
//                 </Link>
//               </div>

//               {/* Scroll to Top */}
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 onClick={scrollToTop}
//                 className="w-10 h-10 bg-primary text-primary-foreground rounded-lg flex items-center justify-center hover:bg-primary/90 transition-colors"
//                 aria-label="Scroll to top"
//               >
//                 <ArrowUp className="w-5 h-5" />
//               </motion.button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// }

// // "use client";

// // import { motion } from "framer-motion";
// // import {
// //   BookOpen,
// //   Mail,
// //   Phone,
// //   MapPin,
// //   Facebook,
// //   Youtube,
// //   Instagram,
// // } from "lucide-react";
// // import Link from "next/link";

// // export function Footer() {
// //   const currentYear = new Date().getFullYear();

// //   return (
// //     <footer className="bg-foreground text-background">
// //       <div className="container mx-auto px-4 lg:px-6 py-12">
// //         <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
// //           {/* Brand */}
// //           <motion.div
// //             initial={{ opacity: 0, y: 20 }}
// //             whileInView={{ opacity: 1, y: 0 }}
// //             className="space-y-4"
// //           >
// //             <div className="flex items-center space-x-2">
// //               <BookOpen className="h-8 w-8 text-background" />
// //               <div>
// //                 <h3 className="text-xl font-heading font-bold">Al-Maysaroh</h3>
// //                 <p className="text-sm text-background/80">Quran Institute</p>
// //               </div>
// //             </div>
// //             <p className="text-background/80 text-sm leading-relaxed">
// //               Dedicated to providing authentic Quranic education with qualified
// //               teachers and modern teaching methodologies for students worldwide.
// //             </p>
// //             <div className="flex space-x-4">
// //               {[Facebook, Youtube, Instagram].map((Icon, index) => (
// //                 <motion.button
// //                   key={index}
// //                   whileHover={{ scale: 1.1 }}
// //                   whileTap={{ scale: 0.9 }}
// //                   className="w-10 h-10 bg-background/10 rounded-lg flex items-center justify-center hover:bg-background/20 transition-colors"
// //                 >
// //                   <Icon className="w-5 h-5" />
// //                 </motion.button>
// //               ))}
// //             </div>
// //           </motion.div>

// //           {/* Quick Links */}
// //           <motion.div
// //             initial={{ opacity: 0, y: 20 }}
// //             whileInView={{ opacity: 1, y: 0 }}
// //             transition={{ delay: 0.1 }}
// //             className="space-y-4"
// //           >
// //             <h4 className="font-heading font-bold text-lg">Quick Links</h4>
// //             <nav className="space-y-2">
// //               {[
// //                 "Home",
// //                 "Courses",
// //                 "About",
// //                 "Teachers",
// //                 "Testimonials",
// //                 "Contact",
// //                 "FAQ",
// //               ].map((item) => (
// //                 <a
// //                   key={item}
// //                   href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
// //                   className="block text-background/80 hover:text-background transition-colors text-sm"
// //                 >
// //                   {item}
// //                 </a>
// //               ))}
// //             </nav>
// //           </motion.div>

// //           {/* Courses */}
// //           <motion.div
// //             initial={{ opacity: 0, y: 20 }}
// //             whileInView={{ opacity: 1, y: 0 }}
// //             transition={{ delay: 0.2 }}
// //             className="space-y-4"
// //           >
// //             <h4 className="font-heading font-bold text-lg">Our Courses</h4>
// //             <nav className="space-y-2">
// //               {[
// //                 "Quran Recitation",
// //                 "Quran Memorization",
// //                 "Advanced Tajweed",
// //                 "Arabic Language",
// //                 "Islamic Studies",
// //               ].map((course) => (
// //                 <Link
// //                   key={course}
// //                   href="/#courses"
// //                   className="block text-background/80 hover:text-background transition-colors text-sm"
// //                 >
// //                   {course}
// //                 </Link>
// //               ))}
// //             </nav>
// //           </motion.div>

// //           {/* Contact Info */}
// //           <motion.div
// //             initial={{ opacity: 0, y: 20 }}
// //             whileInView={{ opacity: 1, y: 0 }}
// //             transition={{ delay: 0.3 }}
// //             className="space-y-4"
// //           >
// //             <h4 className="font-heading font-bold text-lg">Contact Info</h4>
// //             <div className="space-y-3">
// //               {[
// //                 { icon: Phone, text: "+1 (555) 123-4567" },
// //                 { icon: Mail, text: "admin@almaysaroh.com" },
// //                 {
// //                   icon: MapPin,
// //                   text: "123 Islamic Center, Education City, Doha, Qatar",
// //                 },
// //               ].map((item, index) => (
// //                 <div key={index} className="flex items-start space-x-3">
// //                   <item.icon className="w-4 h-4 text-background/80 mt-0.5 flex-shrink-0" />
// //                   <span className="text-background/80 text-sm">
// //                     {item.text}
// //                   </span>
// //                 </div>
// //               ))}
// //             </div>
// //           </motion.div>
// //         </div>

// //         {/* Bottom Bar */}
// //         <motion.div
// //           initial={{ opacity: 0 }}
// //           whileInView={{ opacity: 1 }}
// //           transition={{ duration: 0.6, delay: 0.4 }}
// //           className="border-t border-background/20 mt-8 pt-8 text-center"
// //         >
// //           <p className="text-background/60 text-sm">
// //             © {currentYear} Al-Maysaroh Quran Institute. All rights reserved.
// //             Made with ❤️ for the Ummah.
// //           </p>
// //         </motion.div>
// //       </div>
// //     </footer>
// //   );
// // }

"use client";

import { motion } from "framer-motion";
import {
  BookOpen,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Youtube,
  Instagram,
  Twitter,
  Heart,
  ArrowUp,
  ShieldCheck,
  Globe,
  GraduationCap,
  Send,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const footerLinks = {
    Academic: [
      { name: "Hifz Program", href: "/courses/hifz" },
      { name: "Tajweed Mastery", href: "/courses/tajweed" },
      { name: "Arabic Language", href: "/courses/arabic" },
      { name: "Full Curriculum", href: "/courses" },
    ],
    Institute: [
      { name: "The Methodology", href: "/about" },
      { name: "Noble Faculty", href: "/teachers" },
      { name: "Scholarly Council", href: "/teachers#council" },
      { name: "Research", href: "/research" },
    ],
    Admissions: [
      { name: "Enrollment Plans", href: "/pricing" },
      { name: "Scholarships", href: "/pricing#grants" },
      { name: "Admission FAQ", href: "/pricing#faq" },
      { name: "Student Portal", href: "/dashboard" },
    ],
    Support: [
      { name: "Help Center", href: "/help" },
      { name: "Contact Us", href: "/contact" },
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
    ],
  };

  return (
    <footer className="relative bg-slate-950 text-white overflow-hidden border-t border-primary-900/50">
      {/* 1. ARCHITECTURAL OVERLAY */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('/islamic-pattern.svg')] bg-repeat bg-center" />
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary-700/10 blur-[120px] rounded-full -z-10" />

      {/* 2. NEWSLETTER / SCHOLARLY CIRCLE */}
      <div className="container mx-auto px-6 pt-20 pb-16 border-b border-white/5">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-4">
            <h3 className="text-3xl font-black uppercase tracking-tighter font-heading">
              Join the{" "}
              <span className="text-primary-400">Scholarly Circle.</span>
            </h3>
            <p className="text-slate-400 font-medium max-w-md">
              Receive academic updates, Quranic insights, and institutional
              announcements directly from our Dean.
            </p>
          </div>
          <form className="relative group">
            <input
              type="email"
              placeholder="Enter your scholarly email"
              className="w-full h-16 bg-white/5 border border-white/10 rounded-2xl px-6 outline-none focus:border-primary-500 transition-all font-medium pr-36"
            />
            <Button className="absolute right-2 top-2 h-12 px-6 rounded-xl bg-primary-700 hover:bg-primary-600 font-black text-[10px] tracking-widest uppercase shadow-lg group-hover:animate-shimmer">
              SUBSCRIBE <Send className="ml-2 w-3 h-3" />
            </Button>
          </form>
        </div>
      </div>

      {/* 3. MAIN FOOTER CONTENT */}
      <div className="container mx-auto px-6 py-20">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-12">
          {/* Brand Pillar */}
          <div className="col-span-2 space-y-8">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-primary-700 rounded-2xl flex items-center justify-center shadow-2xl">
                <BookOpen className="h-7 w-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-black tracking-tighter leading-none">
                  AL-MAYSAROH
                </h1>
                <p className="text-[10px] text-primary-400 font-bold tracking-[0.3em] uppercase">
                  International Institute
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="quran-monumental text-3xl text-right opacity-30 pointer-events-none">
                بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
              </div>
              <p className="text-slate-400 text-sm leading-relaxed font-medium text-balance">
                A distinguished sanctuary for the preservation of Quranic
                traditions through Ijazah-certified academic excellence and
                global digital accessibility.
              </p>
            </div>

            <div className="flex items-center gap-4">
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                <Link
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary-700 hover:border-primary-700 transition-all group"
                >
                  <Icon className="w-4 h-4 text-slate-400 group-hover:text-white" />
                </Link>
              ))}
            </div>
          </div>

          {/* Links Pillars */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title} className="space-y-6">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-400">
                {title}
              </h4>
              <ul className="space-y-4">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm font-bold text-slate-400 hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* 4. INSTITUTIONAL STATUS BAR */}
      <div className="bg-primary-950/50 border-y border-white/5 py-8">
        <div className="container mx-auto px-6 flex flex-wrap justify-between items-center gap-8">
          <div className="flex items-center gap-4">
            <Globe className="w-5 h-5 text-primary-400" />
            <span className="text-[10px] font-black uppercase tracking-widest opacity-60">
              Global Presence: 50+ Nations
            </span>
          </div>
          <div className="flex items-center gap-4">
            <ShieldCheck className="w-5 h-5 text-accent" />
            <span className="text-[10px] font-black uppercase tracking-widest opacity-60">
              Traditional Sanad Verified
            </span>
          </div>
          <div className="flex items-center gap-4">
            <GraduationCap className="w-5 h-5 text-gold" />
            <span className="text-[10px] font-black uppercase tracking-widest opacity-60">
              Al-Azhar Affiliated Faculty
            </span>
          </div>
        </div>
      </div>

      {/* 5. LEGAL BOTTOM BAR */}
      <div className="container mx-auto px-6 py-10 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
          <span>
            &copy; {currentYear} Al-Maysaroh International Institute. All Rights
            Reserved.
          </span>
          <Heart className="w-3 h-3 text-red-900 fill-current" />
        </div>

        <div className="flex items-center gap-8">
          <div className="flex gap-4 text-[10px] font-black uppercase tracking-widest text-slate-500">
            <Link
              href="/privacy"
              className="hover:text-white transition-colors"
            >
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms
            </Link>
            <Link
              href="/sitemap"
              className="hover:text-white transition-colors"
            >
              Sitemap
            </Link>
          </div>

          <button
            onClick={scrollToTop}
            className="w-10 h-10 rounded-full bg-primary-700 text-white flex items-center justify-center hover:scale-110 transition-all shadow-xl"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        </div>
      </div>
    </footer>
  );
}