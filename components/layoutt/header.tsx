"use client";

import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  ChevronDown,
  Sun,
  Moon,
  LogOut,
  LayoutDashboard,
  Menu,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

const navigation = [
  { name: "Home", href: "/" },
  {
    name: "Programs",
    href: "/courses",
    dropdown: [
      {
        name: "Full Curriculum",
        href: "/courses",
        desc: "Our complete educational path",
      },
      {
        name: "Ijazah Program",
        href: "/courses/hifz",
        desc: "Sanad-based memorization",
      },
      {
        name: "Tajweed Mastery",
        href: "/courses/tajweed",
        desc: "Scientific recitation rules",
      },
      {
        name: "Arabic Language",
        href: "/courses/arabic",
        desc: "Unlock the Quranic language",
      },
    ],
  },
  { name: "Faculty", href: "/teachers" },
  { name: "Admissions", href: "/pricing" },
];

export function Header() {
  const { data: session } = useSession();
  const { theme, setTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-500",
        isScrolled ? "glass-surface shadow-2xl py-2" : "bg-transparent py-4",
      )}
    >
      <nav className="container mx-auto px-6 flex items-center justify-between h-16">
        {/* --- LOGO SECTION --- */}
        <Link href="/" className="flex items-center space-x-4 relative z-50">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-primary-700 rounded-2xl flex items-center justify-center shadow-2xl">
            <BookOpen className="h-6 w-6 md:h-7 md:w-7 text-white" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-xl md:text-2xl font-black tracking-tighter leading-none">
              AL-MAYSAROH
            </h1>
            <p className="text-[9px] md:text-[10px] text-primary-700 font-bold tracking-[0.3em] uppercase">
              International Institute
            </p>
          </div>
        </Link>

        {/* --- DESKTOP NAVIGATION --- */}
        <div className="hidden lg:flex items-center space-x-2">
          {navigation.map((item) => (
            <div
              key={item.name}
              className="relative group"
              onMouseEnter={() => setActiveDropdown(item.name)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link
                href={item.href}
                className="px-5 py-2 text-sm font-black flex items-center gap-2 hover:text-primary-700 transition-colors uppercase tracking-wider"
              >
                {item.name}
                {item.dropdown && (
                  <ChevronDown
                    className={cn(
                      "w-4 h-4 opacity-50 transition-transform",
                      activeDropdown === item.name && "rotate-180",
                    )}
                  />
                )}
              </Link>

              <AnimatePresence>
                {item.dropdown && activeDropdown === item.name && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute top-full left-0 w-80 p-3 bg-white dark:bg-slate-950 border border-border/50 rounded-2xl shadow-3xl"
                  >
                    {item.dropdown.map((sub) => (
                      <Link
                        key={sub.name}
                        href={sub.href}
                        className="block p-4 rounded-xl hover:bg-primary-50 dark:hover:bg-primary-900/20 group transition-all"
                      >
                        <div className="font-black text-sm group-hover:text-primary-700">
                          {sub.name}
                        </div>
                        <div className="text-[11px] text-muted-foreground">
                          {sub.desc}
                        </div>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* --- GLOBAL ACTIONS --- */}
        <div className="flex items-center space-x-2 md:space-x-3 relative z-50">
          {mounted && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="rounded-full bg-muted/20 hover:bg-primary-50 dark:hover:bg-primary-950/40"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
          )}

          {/* User Section / Auth */}
          <div className="hidden md:flex items-center gap-2">
            {session ? (
              <Link href="/dashboard">
                <Button className="rounded-xl font-black px-6 bg-primary-700 hover:bg-primary-800 text-white shadow-lg relative overflow-hidden group">
                  <span className="relative z-10 flex items-center gap-2">
                    <LayoutDashboard className="w-4 h-4" /> DASHBOARD
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                    animate={{ x: ["-100%", "200%"] }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                </Button>
              </Link>
            ) : (
              <>
                <Link href="/login">
                  <Button
                    variant="ghost"
                    className="font-black text-[11px] tracking-widest uppercase"
                  >
                    SIGN IN
                  </Button>
                </Link>
                <Link href="/register">
                  <Button className="rounded-xl font-black px-6 bg-primary-700 hover:bg-primary-800 text-white shadow-lg text-[11px] tracking-widest relative overflow-hidden group">
                    <span className="relative z-10">ADMISSIONS</span>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                      animate={{ x: ["-100%", "200%"] }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* MOBILE MENU TOGGLE */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden rounded-full bg-muted/20"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>

        {/* --- MOBILE NAVIGATION DRAWER --- */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-0 z-40 lg:hidden bg-background glass-surface p-6 pt-24"
            >
              <div className="flex flex-col space-y-2">
                {navigation.map((item) => (
                  <div
                    key={item.name}
                    className="border-b border-border/50 py-2"
                  >
                    {item.dropdown ? (
                      <div className="space-y-4">
                        <button
                          onClick={() =>
                            setActiveDropdown(
                              activeDropdown === item.name ? null : item.name,
                            )
                          }
                          className="flex items-center justify-between w-full text-xl font-black uppercase tracking-tighter"
                        >
                          {item.name}
                          <ChevronDown
                            className={cn(
                              "w-6 h-6 transition-transform",
                              activeDropdown === item.name && "rotate-180",
                            )}
                          />
                        </button>
                        <AnimatePresence>
                          {activeDropdown === item.name && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden space-y-2 pl-4"
                            >
                              {item.dropdown.map((sub) => (
                                <Link
                                  key={sub.name}
                                  href={sub.href}
                                  onClick={() => setMobileMenuOpen(false)}
                                  className="block p-3 rounded-lg bg-muted/30"
                                >
                                  <div className="font-bold text-sm">
                                    {sub.name}
                                  </div>
                                  <div className="text-[10px] opacity-60">
                                    {sub.desc}
                                  </div>
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Link
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block text-xl font-black uppercase tracking-tighter py-2"
                      >
                        {item.name}
                      </Link>
                    )}
                  </div>
                ))}
              </div>

              {/* Mobile Auth Bottom Section */}
              <div className="mt-12 space-y-4">
                {session ? (
                  <div className="space-y-3">
                    <Link
                      href="/dashboard"
                      className="w-full"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Button className="w-full h-14 rounded-2xl font-black bg-primary-700">
                        DASHBOARD
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      className="w-full h-14 rounded-2xl font-black border-2"
                      onClick={() => {
                        signOut();
                        setMobileMenuOpen(false);
                      }}
                    >
                      <LogOut className="w-4 h-4 mr-2" /> SIGN OUT
                    </Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-4">
                    <Link
                      href="/register"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Button className="w-full h-14 rounded-2xl font-black bg-primary-700 text-lg">
                        ADMISSIONS
                      </Button>
                    </Link>
                    <Link
                      href="/login"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Button
                        variant="outline"
                        className="w-full h-14 rounded-2xl font-black border-2"
                      >
                        SIGN IN
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
