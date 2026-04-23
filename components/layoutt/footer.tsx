

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
      { name: "Help Center", href: "/legal" },
      { name: "Contact Us", href: "/contact" },
      { name: "Privacy Policy", href: "/legal" },
      { name: "Terms of Service", href: "/legal" },
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
            &copy; {currentYear} Al-Maysaroh Institute. All Rights
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