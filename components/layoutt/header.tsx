<<<<<<< HEAD
// src/components/layout/header.tsx - ENHANCED
"use client";

import { useState, useRef, useEffect } from "react";
import { signOut, useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  BookOpen,
  User,
  LogOut,
  ChevronDown,
  ChevronRight,
  Search,
  Bell,
  Settings,
=======
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
  Search,
  LogOut,
  LayoutDashboard,
  Menu,
  X,
  ArrowRight,
>>>>>>> 5a5d906 (Fresh start on Zorin Lite)
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
<<<<<<< HEAD
import { NotificationBell } from "@/components/notifications/notification-bell";

const navigation = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Courses",
    href: "/courses",
    dropdown: [
      {
        name: "All Courses",
        href: "/courses",
        description: "Browse all Quran courses",
      },
      {
        name: "One-on-One Courses",
        href: "/courses/one-on-one",
        description: "Personalized learning with dedicated teachers",
      },
      {
        name: "Group Courses",
        href: "/courses/group",
        description: "Learn together in small groups",
      },
      {
        name: "Hifz Program",
        href: "/courses/hifz",
        description: "Complete Quran memorization program",
=======

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
>>>>>>> 5a5d906 (Fresh start on Zorin Lite)
      },
      {
        name: "Tajweed Mastery",
        href: "/courses/tajweed",
<<<<<<< HEAD
        description: "Perfect your Quran recitation",
      },
      {
        name: "level",
        href: "/courses/level/beginner",
        description: "Courses for Beginners",
      },
      {
        name: "quiz",
        href: "/courses/quiz",
        description: "Test your Quran knowledge",
      },
      {
        name: "Comparison",
        href: "/courses/compare",
        description: "Compare our course offerings",
      },
    ],
  },
  {
    name: "About",
    href: "/about",
  },
  {
    name: "Teachers",
    href: "/teachers",
  },
  {
    name: "Pricing",
    href: "/pricing",
  },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { data: session } = useSession();

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setActiveDropdown(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = (name: string) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  return (
    <header className="fixed top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b supports-backdrop-blur:bg-background/60">
      <nav className="container mx-auto px-4 lg:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <div className="text-left">
              <h1 className="text-xl font-heading font-bold text-foreground bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                Al-Maysaroh
              </h1>
              <p className="text-xs text-muted-foreground">Quran Institute</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navigation.map((item) => (
              <div
                key={item.name}
                className="relative"
                ref={item.dropdown ? dropdownRef : null}
              >
                {item.dropdown ? (
                  <div className="relative">
                    <button
                      onClick={() => toggleDropdown(item.name)}
                      className={cn(
                        "flex items-center space-x-1 px-4 py-2 text-foreground/80 hover:text-primary transition-colors font-medium rounded-lg hover:bg-muted/50",
                        activeDropdown === item.name &&
                          "text-primary bg-muted/50"
                      )}
                    >
                      <span>{item.name}</span>
                      <ChevronDown
                        className={cn(
                          "w-4 h-4 transition-transform duration-200",
                          activeDropdown === item.name && "rotate-180"
                        )}
                      />
                    </button>

                    <AnimatePresence>
                      {activeDropdown === item.name && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-0 mt-2 w-80 bg-card border border-border rounded-xl shadow-lg z-50 overflow-hidden"
                        >
                          <div className="p-2">
                            {item.dropdown.map((dropdownItem) => (
                              <Link
                                key={dropdownItem.name}
                                href={dropdownItem.href}
                                onClick={() => setActiveDropdown(null)}
                                className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors group"
                              >
                                <div className="w-2 h-2 bg-primary rounded-full mt-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center justify-between">
                                    <p className="font-medium text-card-foreground group-hover:text-primary transition-colors">
                                      {dropdownItem.name}
                                    </p>
                                    <ChevronRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                                  </div>
                                  <p className="text-sm text-muted-foreground mt-1">
                                    {dropdownItem.description}
                                  </p>
                                </div>
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className="px-4 py-2 text-foreground/80 hover:text-primary transition-colors font-medium rounded-lg hover:bg-muted/50"
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Desktop Auth & Actions */}
          <div className="hidden lg:flex items-center space-x-3">
            {/* Search Button */}
            <button className="p-2 text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-muted/50">
              <Search className="w-5 h-5" />
            </button>

            {/* Notifications */}
            <NotificationBell />

            {session ? (
              <div className="flex items-center space-x-3">
                {/* User Menu */}
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => toggleDropdown("user")}
                    className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-white" />
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-medium text-foreground">
                        {session.user.name}
                      </p>
                      <p className="text-xs text-muted-foreground capitalize">
                        {session.user.role.toLowerCase()}
                      </p>
                    </div>
                    <ChevronDown
                      className={cn(
                        "w-4 h-4 text-muted-foreground transition-transform duration-200",
                        activeDropdown === "user" && "rotate-180"
                      )}
                    />
                  </button>

                  <AnimatePresence>
                    {activeDropdown === "user" && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full right-0 mt-2 w-64 bg-card border border-border rounded-xl shadow-lg z-50 overflow-hidden"
                      >
                        <div className="p-2">
                          {/* Dashboard Link */}
                          <Link
                            href={
                              session.user.role === "ADMIN"
                                ? "/admin"
                                : session.user.role === "TEACHER"
                                  ? "/teacher"
                                  : "/dashboard"
                            }
                            onClick={() => setActiveDropdown(null)}
                            className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors group"
                          >
                            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                              <Settings className="w-4 h-4 text-primary" />
                            </div>
                            <div>
                              <p className="font-medium text-card-foreground">
                                Dashboard
                              </p>
                              <p className="text-sm text-muted-foreground">
                                Manage your account
                              </p>
                            </div>
                          </Link>

                          {/* Sign Out */}
                          <button
                            onClick={() => {
                              signOut();
                              setActiveDropdown(null);
                            }}
                            className="flex items-center space-x-3 p-3 rounded-lg hover:bg-red-50 text-red-600 transition-colors w-full text-left"
                          >
                            <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                              <LogOut className="w-4 h-4" />
                            </div>
                            <div>
                              <p className="font-medium">Sign Out</p>
                              <p className="text-sm text-red-500/80">
                                End your session
                              </p>
                            </div>
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link href="/auth/signin">
                  <Button variant="ghost" size="sm">
                    Sign In
                  </Button>
                </Link>
                <Link href="/auth/signup">
                  <Button size="sm">Get Started</Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-foreground hover:bg-muted rounded-lg transition-colors"
=======
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
>>>>>>> 5a5d906 (Fresh start on Zorin Lite)
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
<<<<<<< HEAD
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-card border-t border-border overflow-hidden"
            >
              <div className="py-4 space-y-2">
                {navigation.map((item) => (
                  <div key={item.name}>
                    {item.dropdown ? (
                      <div className="px-4">
                        <button
                          onClick={() => toggleDropdown(`mobile-${item.name}`)}
                          className="flex items-center justify-between w-full py-3 text-foreground/80 hover:text-primary transition-colors font-medium"
                        >
                          <span>{item.name}</span>
                          <ChevronDown
                            className={cn(
                              "w-4 h-4 transition-transform duration-200",
                              activeDropdown === `mobile-${item.name}` &&
                                "rotate-180"
                            )}
                          />
                        </button>

                        <AnimatePresence>
                          {activeDropdown === `mobile-${item.name}` && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              className="ml-4 space-y-1 border-l border-border"
                            >
                              {item.dropdown.map((dropdownItem) => (
                                <Link
                                  key={dropdownItem.name}
                                  href={dropdownItem.href}
                                  onClick={() => setMobileMenuOpen(false)}
                                  className="block py-2 px-4 text-foreground/70 hover:text-primary transition-colors"
                                >
                                  {dropdownItem.name}
=======
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
>>>>>>> 5a5d906 (Fresh start on Zorin Lite)
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
<<<<<<< HEAD
                        className="block px-4 py-3 text-foreground/80 hover:text-primary transition-colors font-medium"
=======
                        className="block text-xl font-black uppercase tracking-tighter py-2"
>>>>>>> 5a5d906 (Fresh start on Zorin Lite)
                      >
                        {item.name}
                      </Link>
                    )}
                  </div>
                ))}
<<<<<<< HEAD

                {/* Mobile Auth Section */}
                <div className="pt-4 border-t border-border px-4 space-y-3">
                  {session ? (
                    <>
                      <div className="flex items-center space-x-3 p-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                          <User className="w-4 h-4 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground truncate">
                            {session.user.name}
                          </p>
                          <p className="text-xs text-muted-foreground capitalize">
                            {session.user.role.toLowerCase()}
                          </p>
                        </div>
                      </div>

                      <Link
                        href={
                          session.user.role === "ADMIN"
                            ? "/admin"
                            : session.user.role === "TEACHER"
                              ? "/teacher"
                              : "/dashboard"
                        }
                        onClick={() => setMobileMenuOpen(false)}
                        className="block w-full text-center py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
                      >
                        Go to Dashboard
                      </Link>

                      <button
                        onClick={() => {
                          signOut();
                          setMobileMenuOpen(false);
                        }}
                        className="block w-full text-center py-2 border border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition-colors font-medium"
                      >
                        Sign Out
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        href="/auth/signin"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block w-full text-center py-2 border border-primary text-primary rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors font-medium"
                      >
                        Sign In
                      </Link>
                      <Link
                        href="/auth/signup"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block w-full text-center py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
                      >
                        Get Started
                      </Link>
                    </>
                  )}
                </div>
=======
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
>>>>>>> 5a5d906 (Fresh start on Zorin Lite)
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
<<<<<<< HEAD




// // 📄 src/components/layout/header.tsx
// "use client";

// import { useState, useEffect } from "react";
// import { usePathname } from "next/navigation";
// import { motion, AnimatePresence } from "framer-motion";
// import { Menu, X, BookOpen } from "lucide-react";
// import { cn } from "@/lib/utils";
// import { Navigation } from "./navigation";
// import { UserMenu } from "./user-menu";
// import { NotificationBell } from "@/components/notifications/notification-bell";
// import Link from "next/link";

// export function Header() {
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const pathname = usePathname();

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 10);
//     };

//     window.addEventListener("scroll", handleScroll, { passive: true });
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   // Close mobile menu on route change
//   useEffect(() => {
//     setMobileMenuOpen(false);
//   }, [pathname]);

//   return (
//     <header
//       className={cn(
//         "fixed top-0 z-50 w-full transition-all duration-300",
//         isScrolled
//           ? "bg-background/80 backdrop-blur-md border-b border-border shadow-sm"
//           : "bg-transparent"
//       )}
//     >
//       <div className="container mx-auto px-4 lg:px-6">
//         <div className="flex items-center justify-between h-16 lg:h-20">
//           {/* Logo */}
//           <div className="flex items-center space-x-3">
//             <Link
//               href="/"
//               className="flex items-center space-x-3 group"
//               aria-label="Al-Maysaroh Quran Institute - Home"
//             >
//               <div className="relative">
//                 <BookOpen className="h-8 w-8 lg:h-10 lg:w-10 text-primary transition-transform group-hover:scale-110" />
//                 <div className="absolute -inset-1 bg-primary/10 rounded-full blur-sm group-hover:bg-primary/20 transition-colors" />
//               </div>
//               <div className="flex flex-col">
//                 <h1 className="text-xl lg:text-2xl font-heading font-bold text-foreground leading-tight">
//                   Al-Maysaroh
//                 </h1>
//                 <p className="text-xs text-muted-foreground leading-tight">
//                   Quran Institute
//                 </p>
//               </div>
//             </Link>
//           </div>

//           {/* Desktop Navigation */}
//           <div className="hidden lg:flex items-center space-x-8">
//             <Navigation />

//             <div className="flex items-center space-x-4">
//               <NotificationBell />
//               <UserMenu />
//             </div>
//           </div>

//           {/* Mobile menu button */}
//           <button
//             onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//             className="lg:hidden p-2 text-foreground hover:text-primary transition-colors"
//             aria-label="Toggle menu"
//           >
//             {mobileMenuOpen ? (
//               <X className="h-6 w-6" />
//             ) : (
//               <Menu className="h-6 w-6" />
//             )}
//           </button>
//         </div>
//       </div>

//       {/* Mobile Navigation */}
//       <AnimatePresence>
//         {mobileMenuOpen && (
//           <motion.div
//             initial={{ opacity: 0, height: 0 }}
//             animate={{ opacity: 1, height: "auto" }}
//             exit={{ opacity: 0, height: 0 }}
//             transition={{ duration: 0.3, ease: "easeInOut" }}
//             className="lg:hidden bg-background/95 backdrop-blur-md border-b border-border"
//           >
//             <div className="container mx-auto px-4 py-6 space-y-6">
//               <Navigation mobile />

//               <div className="pt-4 border-t border-border space-y-4">
//                 <NotificationBell />
//                 <UserMenu mobile />
//               </div>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </header>
//   );
// }
=======
>>>>>>> 5a5d906 (Fresh start on Zorin Lite)
