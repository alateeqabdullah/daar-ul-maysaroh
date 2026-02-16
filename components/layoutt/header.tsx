"use client";

import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "@/public/logo.png"
import {
  BookOpen,
  ChevronDown,
  Sun,
  Moon,
  LayoutDashboard,
  Menu,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

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
  { name: "Faculty", href: "/faculty" },
  { name: "Admissions", href: "/pricing" },
];

// Throttle function for scroll performance
function throttle<T extends (...args: unknown[]) => unknown>(
  func: T,
  limit: number,
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return function (this: unknown, ...args: Parameters<T>) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

export function Header() {
  const { data: session } = useSession();
  const { theme, setTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  // Prevent hydration mismatch for theme toggle
  useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    const throttledScroll = throttle(handleScroll, 100);
    window.addEventListener("scroll", throttledScroll, { passive: true });
    return () => window.removeEventListener("scroll", throttledScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
    } else {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    };
  }, [mobileMenuOpen]);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  // Handle escape key to close mobile menu
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [mobileMenuOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 w-full transition-all duration-500 flex items-center",
          isScrolled
            ? "glass-surface shadow-xl py-2 h-20 bg-background/80 backdrop-blur-lg supports-backdrop-filter:bg-background/60"
            : "bg-transparent py-4 h-24",
          "pt-safe", // Safe area for notched phones
        )}
      >
        <nav className="container mx-auto px-4 md:px-6 flex items-center justify-between">
          {/* --- LOGO SECTION --- */}
          <Link
            href="/"
            className="flex items-center space-x-3 md:space-x-4 relative z-60 group outline-none min-h-11 min-w-11"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="AL-MAYSAROH Institute - Home"
          >
            <Image
              src={Logo}
              width={100}
              height={100}
              alt="logo"
              className="w-10 h-10 md:w-12 md:h-12 bg-primary-700 rounded-2xl flex items-center justify-center shadow-2xl group-hover:rotate-6 group-focus-visible:rotate-6 transition-transform"
            />
            {/* <div className="w-10 h-10 md:w-12 md:h-12 bg-primary-700 rounded-2xl flex items-center justify-center shadow-2xl group-hover:rotate-6 group-focus-visible:rotate-6 transition-transform">
              <BookOpen className="h-5 w-5 md:h-6 md:w-6 text-white" />
            </div> */}
            <div className="hidden lg:flex flex-col ">
              <h1 className="text-lg md:text-xl lg:text-2xl font-black tracking-tighter leading-none">
                AL-MAYSAROH
              </h1>
              <p className="text-[8px] md:text-[10px] text-primary-700 font-bold tracking-[0.2em] md:tracking-[1.5em] uppercase">
                Institute.
              </p>
            </div>
          </Link>

          {/* --- DESKTOP NAVIGATION --- */}
          <ul className="hidden xl:flex items-center space-x-1">
            {navigation.map((item) => {
              const isActive =
                pathname === item.href ||
                item.dropdown?.some((sub) => pathname === sub.href);

              return (
                <li
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => setActiveDropdown(item.name)}
                  onMouseLeave={() => setActiveDropdown(null)}
                  onFocus={() => setActiveDropdown(item.name)}
                  onBlur={(e) => {
                    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                      setActiveDropdown(null);
                    }
                  }}
                >
                  <Link
                    href={item.href}
                    aria-expanded={activeDropdown === item.name}
                    aria-haspopup={item.dropdown ? "true" : "false"}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "px-4 py-3 text-[13px] font-black flex items-center gap-1 transition-all uppercase tracking-wider outline-none min-h-11",
                      "focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:outline-none",
                      activeDropdown === item.name || isActive
                        ? "text-primary-700"
                        : "text-foreground/80 hover:text-foreground",
                    )}
                  >
                    {item.name}
                    {item.dropdown && (
                      <ChevronDown
                        className={cn(
                          "w-3 h-3 md:w-4 md:h-4 opacity-50 transition-transform",
                          activeDropdown === item.name && "rotate-180",
                        )}
                        aria-hidden="true"
                      />
                    )}
                  </Link>

                  <AnimatePresence>
                    {item.dropdown && activeDropdown === item.name && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute top-full left-0 w-80 p-3 bg-white dark:bg-slate-950 border border-border/50 rounded-2xl shadow-3xl mt-2 z-50"
                        role="menu"
                        aria-label={`${item.name} submenu`}
                      >
                        {item.dropdown.map((sub) => {
                          const isSubActive = pathname === sub.href;
                          return (
                            <Link
                              key={sub.name}
                              href={sub.href}
                              className="block p-4 rounded-xl hover:bg-primary-50 dark:hover:bg-primary-900/20 group transition-all outline-none min-h-[60px]"
                              role="menuitem"
                              aria-current={isSubActive ? "page" : undefined}
                              tabIndex={0}
                            >
                              <div className="font-black text-sm group-hover:text-primary-700 group-focus-visible:text-primary-700 uppercase tracking-tight">
                                {sub.name}
                              </div>
                              <div className="text-[11px] text-muted-foreground mt-1 leading-relaxed">
                                {sub.desc}
                              </div>
                            </Link>
                          );
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>

          {/* --- COMMAND ACTIONS --- */}
          <div className="flex items-center space-x-2 md:space-x-3 lg:space-x-4 relative z-60">
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="rounded-full bg-muted/20 hover:bg-primary-50 dark:hover:bg-primary-950/40 w-10 h-10 md:w-11 md:h-11 touch-target-lg"
              aria-label="Toggle theme"
              disabled={!mounted}
            >
              {!mounted ? (
                <div className="w-5 h-5 rounded-full bg-muted-foreground/20 animate-pulse" />
              ) : theme === "dark" ? (
                <Sun className="h-5 w-5" aria-hidden="true" />
              ) : (
                <Moon className="h-5 w-5" aria-hidden="true" />
              )}
            </Button>

            <div className="hidden md:flex items-center gap-2 lg:gap-3">
              {session ? (
                <Link href="/dashboard">
                  <Button className="rounded-xl font-black px-5 lg:px-6 bg-primary-700 hover:bg-primary-800 text-white shadow-lg relative overflow-hidden group min-h-11">
                    <span className="relative z-10 flex items-center gap-2 text-[11px] tracking-widest">
                      <LayoutDashboard className="w-4 h-4" aria-hidden="true" />
                      DASHBOARD
                    </span>
                    <motion.div
                      className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -skew-x-12"
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
                      className="font-black text-[11px] tracking-widest uppercase px-4 min-h-11"
                    >
                      LOGIN
                    </Button>
                  </Link>
                  <Link href="/register">
                    <Button className="rounded-xl font-black px-6 lg:px-8 bg-primary-700 hover:bg-primary-800 text-white shadow-lg text-[11px] tracking-widest relative overflow-hidden group min-h-11">
                      <span className="relative z-10">ADMISSIONS</span>
                      <motion.div
                        className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                        animate={{ x: ["-100%", "200%"] }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      />
                    </Button>
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="xl:hidden rounded-xl bg-primary-700/10 text-primary-700 w-11 h-11 border border-primary-700/20 touch-target-lg"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-controls="mobile-navigation-drawer"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5 md:h-6 md:w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-5 w-5 md:h-6 md:w-6" aria-hidden="true" />
              )}
            </Button>
          </div>
        </nav>
      </header>

      {/* --- MOBILE DRAWER --- */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-md z-90 xl:hidden"
              aria-hidden="true"
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 z-100 w-full max-w-full sm:max-w-sm bg-background shadow-3xl xl:hidden flex flex-col p-4 sm:p-6 md:p-8 pt-24 sm:pt-28 md:pt-32 min-h-dvh"
              style={{
                paddingBottom: "calc(2rem + env(safe-area-inset-bottom))",
              }}
              id="mobile-navigation-drawer"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation menu"
            >
              {/* Close button for mobile */}
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="absolute top-6 right-4 sm:right-6 p-2 rounded-full bg-muted/50 hover:bg-muted touch-target-lg"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="flex-1 overflow-y-auto hide-scrollbar">
                <nav
                  className="flex flex-col space-y-1"
                  aria-label="Mobile navigation"
                >
                  {navigation.map((item) => (
                    <div
                      key={item.name}
                      className="border-b border-border/50 py-3"
                    >
                      {item.dropdown ? (
                        <div className="space-y-3">
                          <button
                            onClick={() =>
                              setActiveDropdown(
                                activeDropdown === item.name ? null : item.name,
                              )
                            }
                            className="flex items-center justify-between w-full text-lg sm:text-xl font-black uppercase tracking-tighter outline-none p-3 rounded-lg hover:bg-muted/50 active:bg-muted transition-colors touch-target-lg"
                            aria-expanded={activeDropdown === item.name}
                            aria-controls={`mobile-dropdown-${item.name.toLowerCase()}`}
                          >
                            <span>{item.name}</span>
                            <ChevronDown
                              className={cn(
                                "w-5 h-5 transition-transform duration-300",
                                activeDropdown === item.name && "rotate-180",
                              )}
                              aria-hidden="true"
                            />
                          </button>
                          <AnimatePresence>
                            {activeDropdown === item.name && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden space-y-2 pl-2 sm:pl-4"
                                id={`mobile-dropdown-${item.name.toLowerCase()}`}
                                role="region"
                              >
                                {item.dropdown.map((sub) => {
                                  const isSubActive = pathname === sub.href;
                                  return (
                                    <Link
                                      key={sub.name}
                                      href={sub.href}
                                      onClick={() => setMobileMenuOpen(false)}
                                      className="block p-3 sm:p-4 rounded-xl bg-muted/30 hover:bg-primary-50 active:bg-primary-100 transition-colors min-h-[60px]"
                                      aria-current={
                                        isSubActive ? "page" : undefined
                                      }
                                    >
                                      <div className="font-black text-sm sm:text-base uppercase">
                                        {sub.name}
                                      </div>
                                      <div className="text-xs sm:text-sm opacity-60 font-medium mt-1">
                                        {sub.desc}
                                      </div>
                                    </Link>
                                  );
                                })}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ) : (
                        <Link
                          href={item.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="block text-lg sm:text-xl font-black uppercase tracking-tighter py-3 px-3 rounded-lg hover:bg-muted/50 active:bg-muted transition-colors outline-none touch-target-lg"
                          aria-current={
                            pathname === item.href ? "page" : undefined
                          }
                        >
                          {item.name}
                        </Link>
                      )}
                    </div>
                  ))}
                </nav>
              </div>

              {/* Mobile Actions */}
              <div className="mt-auto pt-6 space-y-4 pb-safe">
                {session ? (
                  <div className="grid grid-cols-1 gap-3">
                    <Link
                      href="/dashboard"
                      className="w-full"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Button className="w-full h-14 rounded-2xl font-black bg-primary-700 tracking-widest text-white shadow-xl text-base">
                        GO TO DASHBOARD
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      className="w-full h-14 rounded-2xl font-black border-2 text-red-500 border-red-500/20 text-base"
                      onClick={() => {
                        signOut();
                        setMobileMenuOpen(false);
                      }}
                    >
                      SIGN OUT
                    </Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-4">
                    <Link
                      href="/register"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Button className="w-full h-14 sm:h-16 rounded-2xl font-black bg-primary-700 text-white text-base sm:text-lg tracking-widest shadow-xl">
                        ADMISSIONS
                      </Button>
                    </Link>
                    <Link
                      href="/login"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Button
                        variant="outline"
                        className="w-full h-14 sm:h-16 rounded-2xl font-black border-2 text-base sm:text-lg tracking-widest"
                      >
                        SIGN IN
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}













// "use client";

// import { useState, useEffect } from "react";
// import { useSession, signOut } from "next-auth/react";
// import { useTheme } from "next-themes";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   BookOpen,
//   ChevronDown,
//   Sun,
//   Moon,
//   LogOut,
//   LayoutDashboard,
//   Menu,
//   X,
//   Search,
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { cn } from "@/lib/utils";
// import Link from "next/link";

// const navigation = [
//   { name: "Home", href: "/" },
//   {
//     name: "Programs",
//     href: "/courses",
//     dropdown: [
//       {
//         name: "Full Curriculum",
//         href: "/courses",
//         desc: "Our complete educational path",
//       },
//       {
//         name: "Ijazah Program",
//         href: "/courses/hifz",
//         desc: "Sanad-based memorization",
//       },
//       {
//         name: "Tajweed Mastery",
//         href: "/courses/tajweed",
//         desc: "Scientific recitation rules",
//       },
//       {
//         name: "Arabic Language",
//         href: "/courses/arabic",
//         desc: "Unlock the Quranic language",
//       },
//     ],
//   },
//   { name: "Faculty", href: "/teachers" },
//   { name: "Admissions", href: "/pricing" },
// ];

// export function Header() {
//   const { data: session } = useSession();
//   const { theme, setTheme } = useTheme();
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [mounted, setMounted] = useState(false);

//   useEffect(() => {
//     setMounted(true);
//     const handleScroll = () => setIsScrolled(window.scrollY > 20);
//     window.addEventListener("scroll", handleScroll, { passive: true });
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   // Lock body scroll when mobile menu is open to prevent background movement
//   useEffect(() => {
//     if (mobileMenuOpen) {
//       document.body.style.overflow = "hidden";
//     } else {
//       document.body.style.overflow = "unset";
//     }
//   }, [mobileMenuOpen]);

//   return (
//     <>
//       <header
//         className={cn(
//           "fixed top-0 left-0 right-0 z-50 w-full transition-all duration-500 flex items-center",
//           isScrolled
//             ? "glass-surface shadow-xl py-2 h-20"
//             : "bg-transparent py-4 h-24",
//         )}
//       >
//         <nav className="container mx-auto px-6 flex items-center justify-between">
//           {/* --- LOGO SECTION --- */}
//           <Link
//             href="/"
//             className="flex items-center space-x-4 relative z-[60] group"
//             onClick={() => setMobileMenuOpen(false)}
//           >
//             <div className="w-10 h-10 md:w-12 md:h-12 bg-primary-700 rounded-2xl flex items-center justify-center shadow-2xl group-hover:rotate-6 transition-transform">
//               <BookOpen className="h-6 w-6 md:h-7 md:w-7 text-white" />
//             </div>
//             <div className="flex flex-col">
//               <h1 className="text-xl md:text-2xl font-black tracking-tighter leading-none">
//                 AL-MAYSAROH
//               </h1>
//               <p className="text-[9px] md:text-[10px] text-primary-700 font-bold tracking-[0.3em] uppercase">
//                 International Institute
//               </p>
//             </div>
//           </Link>

//           {/* --- DESKTOP NAVIGATION: Hidden on smaller screens --- */}
//           <ul className="hidden lg:flex items-center space-x-1">
//             {navigation.map((item) => (
//               <li
//                 key={item.name}
//                 className="relative"
//                 onMouseEnter={() => setActiveDropdown(item.name)}
//                 onMouseLeave={() => setActiveDropdown(null)}
//               >
//                 <Link
//                   href={item.href}
//                   className={cn(
//                     "px-5 py-2 text-[13px] font-black flex items-center gap-2 transition-all uppercase tracking-wider",
//                     activeDropdown === item.name
//                       ? "text-primary-700"
//                       : "text-foreground/70 hover:text-foreground",
//                   )}
//                 >
//                   {item.name}
//                   {item.dropdown && (
//                     <ChevronDown
//                       className={cn(
//                         "w-4 h-4 opacity-50 transition-transform",
//                         activeDropdown === item.name && "rotate-180",
//                       )}
//                     />
//                   )}
//                 </Link>

//                 <AnimatePresence>
//                   {item.dropdown && activeDropdown === item.name && (
//                     <motion.div
//                       initial={{ opacity: 0, y: 10, scale: 0.95 }}
//                       animate={{ opacity: 1, y: 0, scale: 1 }}
//                       exit={{ opacity: 0, y: 10, scale: 0.95 }}
//                       className="absolute top-full left-0 w-80 p-3 bg-white dark:bg-slate-950 border border-border/50 rounded-2xl shadow-3xl mt-2"
//                     >
//                       {item.dropdown.map((sub) => (
//                         <Link
//                           key={sub.name}
//                           href={sub.href}
//                           className="block p-4 rounded-xl hover:bg-primary-50 dark:hover:bg-primary-900/20 group transition-all"
//                         >
//                           <div className="font-black text-sm group-hover:text-primary-700 uppercase tracking-tight">
//                             {sub.name}
//                           </div>
//                           <div className="text-[11px] text-muted-foreground mt-1 leading-relaxed">
//                             {sub.desc}
//                           </div>
//                         </Link>
//                       ))}
//                     </motion.div>
//                   )}
//                 </AnimatePresence>
//               </li>
//             ))}
//           </ul>

//           {/* --- COMMAND ACTIONS --- */}
//           <div className="flex items-center space-x-2 md:space-x-4 relative z-[60]">
//             {/* Theme Toggle */}
//             {mounted && (
//               <Button
//                 variant="ghost"
//                 size="icon"
//                 onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
//                 className="rounded-full bg-muted/20 hover:bg-primary-50 dark:hover:bg-primary-950/40 w-10 h-10"
//               >
//                 {theme === "dark" ? (
//                   <Sun className="h-5 w-5" />
//                 ) : (
//                   <Moon className="h-5 w-5" />
//                 )}
//               </Button>
//             )}

//             {/* Desktop-only Auth Buttons */}
//             <div className="hidden md:flex items-center gap-3">
//               {session ? (
//                 <Link href="/dashboard">
//                   <Button className="rounded-xl font-black px-6 bg-primary-700 hover:bg-primary-800 text-white shadow-lg relative overflow-hidden group">
//                     <span className="relative z-10 flex items-center gap-2 text-[11px] tracking-widest">
//                       <LayoutDashboard className="w-4 h-4" /> DASHBOARD
//                     </span>
//                     <motion.div
//                       className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -skew-x-12"
//                       animate={{ x: ["-100%", "200%"] }}
//                       transition={{
//                         duration: 3,
//                         repeat: Infinity,
//                         ease: "easeInOut",
//                       }}
//                     />
//                   </Button>
//                 </Link>
//               ) : (
//                 <>
//                   <Link href="/login">
//                     <Button
//                       variant="ghost"
//                       className="font-black text-[11px] tracking-widest uppercase px-4"
//                     >
//                       LOGIN
//                     </Button>
//                   </Link>
//                   <Link href="/register">
//                     <Button className="rounded-xl font-black px-8 bg-primary-700 hover:bg-primary-800 text-white shadow-lg text-[11px] tracking-widest relative overflow-hidden group h-11">
//                       <span className="relative z-10">ADMISSIONS</span>
//                       <motion.div
//                         className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
//                         animate={{ x: ["-100%", "200%"] }}
//                         transition={{
//                           duration: 4,
//                           repeat: Infinity,
//                           ease: "linear",
//                         }}
//                       />
//                     </Button>
//                   </Link>
//                 </>
//               )}
//             </div>

//             {/* MOBILE TOGGLE: Visible only on smaller screens */}
//             <Button
//               variant="ghost"
//               size="icon"
//               className="lg:hidden rounded-xl bg-primary-700/10 text-primary-700 w-11 h-11 border border-primary-700/20"
//               onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//               aria-label="Toggle Menu"
//             >
//               {mobileMenuOpen ? (
//                 <X className="h-6 w-6" />
//               ) : (
//                 <Menu className="h-6 w-6" />
//               )}
//             </Button>
//           </div>
//         </nav>
//       </header>

//       {/* --- ELITE MOBILE DRAWER: Isolated from Header bar --- */}
//       <AnimatePresence>
//         {mobileMenuOpen && (
//           <>
//             {/* Backdrop */}
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               onClick={() => setMobileMenuOpen(false)}
//               className="fixed inset-0 bg-black/60 backdrop-blur-md z-[90] lg:hidden"
//             />

//             <motion.div
//               initial={{ x: "100%" }}
//               animate={{ x: 0 }}
//               exit={{ x: "100%" }}
//               transition={{ type: "spring", damping: 25, stiffness: 200 }}
//               className="fixed inset-y-0 right-0 z-[100] w-full max-w-sm bg-background shadow-3xl lg:hidden flex flex-col p-8 pt-32"
//             >
//               <div className="flex-1 overflow-y-auto hide-scrollbar">
//                 <div className="flex flex-col space-y-2">
//                   {navigation.map((item) => (
//                     <div
//                       key={item.name}
//                       className="border-b border-border/50 py-3"
//                     >
//                       {item.dropdown ? (
//                         <div className="space-y-4">
//                           <button
//                             onClick={() =>
//                               setActiveDropdown(
//                                 activeDropdown === item.name ? null : item.name,
//                               )
//                             }
//                             className="flex items-center justify-between w-full text-2xl font-black uppercase tracking-tighter"
//                           >
//                             {item.name}
//                             <ChevronDown
//                               className={cn(
//                                 "w-6 h-6 transition-transform duration-300",
//                                 activeDropdown === item.name && "rotate-180",
//                               )}
//                             />
//                           </button>
//                           <AnimatePresence>
//                             {activeDropdown === item.name && (
//                               <motion.div
//                                 initial={{ height: 0, opacity: 0 }}
//                                 animate={{ height: "auto", opacity: 1 }}
//                                 exit={{ height: 0, opacity: 0 }}
//                                 className="overflow-hidden space-y-2 pl-4"
//                               >
//                                 {item.dropdown.map((sub) => (
//                                   <Link
//                                     key={sub.name}
//                                     href={sub.href}
//                                     onClick={() => setMobileMenuOpen(false)}
//                                     className="block p-4 rounded-xl bg-muted/30 hover:bg-primary-50 transition-colors"
//                                   >
//                                     <div className="font-black text-sm uppercase">
//                                       {sub.name}
//                                     </div>
//                                     <div className="text-[10px] opacity-60 font-medium">
//                                       {sub.desc}
//                                     </div>
//                                   </Link>
//                                 ))}
//                               </motion.div>
//                             )}
//                           </AnimatePresence>
//                         </div>
//                       ) : (
//                         <Link
//                           href={item.href}
//                           onClick={() => setMobileMenuOpen(false)}
//                           className="block text-2xl font-black uppercase tracking-tighter py-2"
//                         >
//                           {item.name}
//                         </Link>
//                       )}
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* Mobile Auth Bottom Section */}
//               <div className="mt-auto pt-8 space-y-4">
//                 {session ? (
//                   <div className="grid grid-cols-1 gap-3">
//                     <Link
//                       href="/dashboard"
//                       className="w-full"
//                       onClick={() => setMobileMenuOpen(false)}
//                     >
//                       <Button className="w-full h-14 rounded-2xl font-black bg-primary-700 tracking-widest text-white shadow-xl">
//                         GO TO DASHBOARD
//                       </Button>
//                     </Link>
//                     <Button
//                       variant="outline"
//                       className="w-full h-14 rounded-2xl font-black border-2 text-red-500 border-red-500/20"
//                       onClick={() => {
//                         signOut();
//                         setMobileMenuOpen(false);
//                       }}
//                     >
//                       SIGN OUT
//                     </Button>
//                   </div>
//                 ) : (
//                   <div className="grid grid-cols-1 gap-4">
//                     <Link
//                       href="/register"
//                       onClick={() => setMobileMenuOpen(false)}
//                     >
//                       <Button className="w-full h-16 rounded-2xl font-black bg-primary-700 text-white text-lg tracking-widest shadow-xl">
//                         ADMISSIONS
//                       </Button>
//                     </Link>
//                     <Link
//                       href="/login"
//                       onClick={() => setMobileMenuOpen(false)}
//                     >
//                       <Button
//                         variant="outline"
//                         className="w-full h-16 rounded-2xl font-black border-2 text-lg tracking-widest"
//                       >
//                         SIGN IN
//                       </Button>
//                     </Link>
//                   </div>
//                 )}
//               </div>
//             </motion.div>
//           </>
//         )}
//       </AnimatePresence>
//     </>
//   );
// }
