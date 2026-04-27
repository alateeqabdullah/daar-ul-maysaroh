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
      {/* Minimalist background */}
      <div className="absolute inset-0 opacity-[0.02] bg-[url('/islamic-pattern.svg')] bg-repeat bg-center pointer-events-none" />

      {/* Main Footer */}
      <div className="container mx-auto px-6 py-16 lg:py-20">
        {/* Top Section - Brand + Newsletter */}
        <div className="grid lg:grid-cols-2 gap-12 pb-12 border-b border-white/10">
          {/* Brand */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-600 rounded-xl flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-black tracking-tight">
                  AL-MAYSAROH
                </h1>
                <p className="text-[9px] text-purple-400 font-bold tracking-[0.25em] uppercase">
                  International Institute
                </p>
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-md">
              Preserving the authentic transmission of the Quran through
              Ijazah-certified scholarship and global accessibility.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="#"
                className="text-slate-500 hover:text-purple-400 transition"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="text-slate-500 hover:text-purple-400 transition"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="text-slate-500 hover:text-purple-400 transition"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="text-slate-500 hover:text-purple-400 transition"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Crown className="w-4 h-4 text-amber-500" />
              <span className="text-xs font-bold uppercase tracking-wider text-amber-500">
                Scholarly Circle
              </span>
            </div>
            <h3 className="text-xl font-bold">Join our newsletter</h3>
            <p className="text-slate-400 text-sm">
              Receive updates directly from our Dean.
            </p>
            <div className="flex max-w-md">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 h-11 px-4 bg-white/5 border border-white/10 rounded-l-xl outline-none focus:border-purple-500 text-sm"
              />
              <Button className="h-11 px-5 rounded-r-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-sm">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12">
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title} className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-purple-400">
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
          <div className="flex items-center gap-3 text-xs text-slate-500">
            <span>© {currentYear} Al-Maysaroh Institute</span>
            <span>•</span>
            <span>All Rights Reserved</span>
            <Heart className="w-3 h-3 text-amber-500 fill-amber-500" />
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
              <span className="text-[9px] font-bold uppercase tracking-wider text-slate-500">
                Sanad Verified
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="w-3.5 h-3.5 text-purple-400" />
              <span className="text-[9px] font-bold uppercase tracking-wider text-slate-500">
                Global Access
              </span>
            </div>
            <button
              onClick={scrollToTop}
              className="w-8 h-8 rounded-full bg-white/5 hover:bg-purple-600 transition flex items-center justify-center"
            >
              <ArrowUp className="w-4 h-4 text-slate-400 hover:text-white" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
