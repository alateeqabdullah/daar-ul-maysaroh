// "use client";

// import { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { MessageCircle, X, Phone, Mail, Send } from "lucide-react";

// import { cn } from "@/lib/utils";
// import Link from "next/link";

// interface WhatsAppButtonProps {
//   phoneNumber?: string; // Format: "2349110163930" (country code without +)
//   message?: string; // Pre-filled message
//   showOnMobile?: boolean;
//   showOnDesktop?: boolean;
// }

// export function WhatsAppButton({
//   phoneNumber = "2349110163930", // Nigeria +234
//   message = "Assalamu Alaikum! I'm interested in learning more about Al-Maysaroh programs.",
//   showOnMobile = true,
//   showOnDesktop = true,
// }: WhatsAppButtonProps) {
//   const [isOpen, setIsOpen] = useState(false);
//   const [isMobile, setIsMobile] = useState(false);
//   const [isVisible, setIsVisible] = useState(true);
//   const [lastScrollY, setLastScrollY] = useState(0);

//   // Detect mobile
//   useEffect(() => {
//     const checkMobile = () => {
//       setIsMobile(window.innerWidth < 768);
//     };
//     checkMobile();
//     window.addEventListener("resize", checkMobile);
//     return () => window.removeEventListener("resize", checkMobile);
//   }, []);

//   // Hide on scroll down, show on scroll up
//   useEffect(() => {
//     const handleScroll = () => {
//       const currentScrollY = window.scrollY;
//       if (currentScrollY > lastScrollY && currentScrollY > 100) {
//         setIsVisible(false);
//       } else {
//         setIsVisible(true);
//       }
//       setLastScrollY(currentScrollY);
//     };

//     window.addEventListener("scroll", handleScroll, { passive: true });
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, [lastScrollY]);

//   // Don't show if not on desired devices
//   if ((isMobile && !showOnMobile) || (!isMobile && !showOnDesktop)) {
//     return null;
//   }

//   const encodedMessage = encodeURIComponent(message);
//   const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

//   return (
//     <>
//       {/* Floating Button */}
//       <motion.div
//         initial={{ scale: 0, opacity: 0 }}
//         animate={{
//           scale: isVisible ? 1 : 0,
//           opacity: isVisible ? 1 : 0
//         }}
//         transition={{ type: "spring", stiffness: 260, damping: 20 }}
//         className="fixed bottom-6 right-4 sm:bottom-8 sm:right-6 z-50"
//       >
//         {/* WhatsApp Button */}
//         <button
//           onClick={() => setIsOpen(!isOpen)}
//           className={cn(
//             "relative w-14 h-14 sm:w-16 sm:h-16 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 group",
//             "bg-linear-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700",
//             "focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-background"
//           )}
//           aria-label="Contact us on WhatsApp"
//         >
//           <AnimatePresence mode="wait">
//             {isOpen ? (
//               <motion.div
//                 key="close"
//                 initial={{ rotate: -90, opacity: 0 }}
//                 animate={{ rotate: 0, opacity: 1 }}
//                 exit={{ rotate: 90, opacity: 0 }}
//                 transition={{ duration: 0.2 }}
//               >
//                 <X className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
//               </motion.div>
//             ) : (
//               <motion.div
//                 key="whatsapp"
//                 initial={{ rotate: 90, opacity: 0 }}
//                 animate={{ rotate: 0, opacity: 1 }}
//                 exit={{ rotate: -90, opacity: 0 }}
//                 transition={{ duration: 0.2 }}
//               >
//                 <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
//               </motion.div>
//             )}
//           </AnimatePresence>

//           {/* Pulse Ring */}
//           <span className="absolute inset-0 rounded-full animate-ping bg-green-500/30" />
//         </button>

//         {/* Expanded Menu */}
//         <AnimatePresence>
//           {isOpen && (
//             <motion.div
//               initial={{ opacity: 0, y: 20, scale: 0.9 }}
//               animate={{ opacity: 1, y: 0, scale: 1 }}
//               exit={{ opacity: 0, y: 20, scale: 0.9 }}
//               transition={{ duration: 0.2 }}
//               className="absolute bottom-full right-0 mb-4 w-72 sm:w-80"
//             >
//               <div className="glass-surface rounded-2xl shadow-2xl border border-green-500/20 overflow-hidden">
//                 {/* Header */}
//                 <div className="bg-linear-to-r from-green-500 to-green-600 p-4 text-white">
//                   <div className="flex items-center gap-3">
//                     <MessageCircle className="w-5 h-5" />
//                     <div>
//                       <p className="font-black text-sm uppercase tracking-wider">
//                         Quick Contact
//                       </p>
//                       <p className="text-xs opacity-90">We typically respond within minutes</p>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Options */}
//                 <div className="p-3 space-y-2">
//                   {/* WhatsApp Direct */}
//                   <Link
//                     href={whatsappUrl}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="flex items-center gap-3 p-3 rounded-xl hover:bg-green-50 dark:hover:bg-green-950/20 transition-all group"
//                   >
//                     <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center group-hover:bg-green-500/20 transition-colors">
//                       <MessageCircle className="w-5 h-5 text-green-500" />
//                     </div>
//                     <div className="flex-1">
//                       <p className="font-black text-sm uppercase tracking-tight">
//                         WhatsApp Chat
//                       </p>
//                       <p className="text-xs text-muted-foreground">
//                         Instant messaging with our team
//                       </p>
//                     </div>
//                     <Send className="w-4 h-4 text-green-500 opacity-0 group-hover:opacity-100 transition-opacity" />
//                   </Link>

//                   {/* Call */}
//                   <Link
//                     href="tel:+2349110163930"
//                     className="flex items-center gap-3 p-3 rounded-xl hover:bg-primary-50 dark:hover:bg-primary-950/20 transition-all group"
//                   >
//                     <div className="w-10 h-10 rounded-full bg-primary-500/10 flex items-center justify-center group-hover:bg-primary-500/20 transition-colors">
//                       <Phone className="w-5 h-5 text-primary-500" />
//                     </div>
//                     <div className="flex-1">
//                       <p className="font-black text-sm uppercase tracking-tight">
//                         Call Us
//                       </p>
//                       <p className="text-xs text-muted-foreground">
//                         +234 911 016 3930
//                       </p>
//                     </div>
//                   </Link>

//                   {/* Email */}
//                   <Link
//                     href="mailto:info.almaysaroh@gmail.com"
//                     className="flex items-center gap-3 p-3 rounded-xl hover:bg-primary-50 dark:hover:bg-primary-950/20 transition-all group"
//                   >
//                     <div className="w-10 h-10 rounded-full bg-primary-500/10 flex items-center justify-center group-hover:bg-primary-500/20 transition-colors">
//                       <Mail className="w-5 h-5 text-primary-500" />
//                     </div>
//                     <div className="flex-1">
//                       <p className="font-black text-sm uppercase tracking-tight">
//                         Send Email
//                       </p>
//                       <p className="text-xs text-muted-foreground">
//                         info.almaysaroh@gmail.com
//                       </p>
//                     </div>
//                   </Link>
//                 </div>

//                 {/* Footer Note */}
//                 <div className="p-3 border-t border-border/50 bg-muted/30">
//                   <p className="text-[10px] text-center text-muted-foreground">
//                     Available 7 days a week • 9AM - 9PM WAT
//                   </p>
//                 </div>
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </motion.div>
//     </>
//   );
// }

"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircle,
  X,
  Phone,
  Mail,
  Send,
  Clock,
  Zap,
  Sparkles,
  ChevronRight,

  Bell,
  Calendar,
  BookOpen,
  DollarSign,
  GraduationCap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useTheme } from "next-themes";

interface WhatsAppButtonProps {
  phoneNumber?: string;
  message?: string;
  showOnMobile?: boolean;
  showOnDesktop?: boolean;
  position?: "bottom-left" | "bottom-right";
  showQuickReplies?: boolean;
  showAvailability?: boolean;
  trackAnalytics?: boolean;
  autoOpenOnFirstVisit?: boolean;
}

// Quick reply templates
const QUICK_REPLIES = [
  {
    icon: BookOpen,
    label: "Courses",
    message: "I'd like to know about your available Quran programs",
  },
  {
    icon: DollarSign,
    label: "Pricing",
    message: "What are the tuition fees and payment options?",
  },
  {
    icon: GraduationCap,
    label: "Enrollment",
    message: "How do I enroll in the program?",
  },
  {
    icon: Calendar,
    label: "Schedule",
    message: "Can we schedule a call to discuss my options?",
  },
];

export function WhatsAppButton({
  phoneNumber = "2349110163930",
  message = "Assalamu Alaikum! I'm interested in learning more about Al-Maysaroh programs.",
  showOnMobile = true,
  showOnDesktop = true,
  position = "bottom-right",
  showQuickReplies = true,
  showAvailability = true,
  trackAnalytics = true,
  autoOpenOnFirstVisit = false,
}: WhatsAppButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isFirstVisit, setIsFirstVisit] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const { theme } = useTheme();

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Check business hours
  useEffect(() => {
    const checkAvailability = () => {
      const now = new Date();
      const day = now.getDay();
      const hour = now.getHours();

      if (day >= 1 && day <= 5 && hour >= 9 && hour < 21) {
        setIsOnline(true);
      } else if ((day === 0 || day === 6) && hour >= 10 && hour < 18) {
        setIsOnline(true);
      } else {
        setIsOnline(false);
      }
    };

    checkAvailability();
    const interval = setInterval(checkAvailability, 60000); // Check every minute
    return () => clearInterval(interval);
  }, []);

  // Track analytics
  const trackEvent = useCallback(
    (action: string, channel: string) => {
      if (!trackAnalytics) return;

      if (typeof window !== "undefined" && (window as any).gtag) {
        (window as any).gtag("event", action, {
          event_category: "contact",
          event_label: channel,
        });
      }

      // Also log to console in development
      if (process.env.NODE_ENV === "development") {
        console.log(`[Analytics] ${action}: ${channel}`);
      }
    },
    [trackAnalytics],
  );

  // First visit detection
  useEffect(() => {
    const hasVisited = localStorage.getItem("whatsapp_visited");
    if (!hasVisited && autoOpenOnFirstVisit) {
      setIsFirstVisit(true);
      localStorage.setItem("whatsapp_visited", "true");
      // Auto-open after 3 seconds on first visit
      const timer = setTimeout(() => setIsOpen(true), 3000);
      return () => clearTimeout(timer);
    }
  }, [autoOpenOnFirstVisit]);

  // Hide on scroll down, show on scroll up
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen]);

  // Don't show if not on desired devices
  if ((isMobile && !showOnMobile) || (!isMobile && !showOnDesktop)) {
    return null;
  }

  // Get page context
  const getPageContext = () => {
    if (typeof window === "undefined") return "";
    return window.location.pathname;
  };

  const encodedMessage = encodeURIComponent(
    `${message}\n\n📍 Page: ${getPageContext()}\n🕐 Time: ${new Date().toLocaleString()}`,
  );
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  // Position classes
  const positionClasses = {
    "bottom-right": "bottom-6 right-4 sm:bottom-8 sm:right-6",
    "bottom-left": "bottom-6 left-4 sm:bottom-8 sm:left-6",
  };

  const menuPositionClasses = {
    "bottom-right": "bottom-full right-0 mb-4",
    "bottom-left": "bottom-full left-0 mb-4",
  };

  // Button gradient based on theme
  const buttonGradient =
    theme === "dark"
      ? "bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
      : "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700";

  const handleContact = (channel: string) => {
    trackEvent("click", channel);
    setIsOpen(false);
  };

  return (
    <>
      {/* Floating Button */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{
          scale: isVisible ? 1 : 0,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className={cn("fixed z-50", positionClasses[position])}
      >
        {/* WhatsApp Button */}
        <button
          onClick={() => {
            trackEvent("toggle", isOpen ? "close" : "open");
            setIsOpen(!isOpen);
          }}
          className={cn(
            "relative w-14 h-14 sm:w-16 sm:h-16 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 group",
            buttonGradient,
            "focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-background",
            "active:scale-95 transition-transform",
          )}
          aria-label="Contact us on WhatsApp"
          aria-expanded={isOpen}
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              </motion.div>
            ) : (
              <motion.div
                key="whatsapp"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Pulse Ring - only when closed */}
          {!isOpen && isOnline && (
            <span className="absolute inset-0 rounded-full animate-ping bg-green-500/30" />
          )}

          {/* Online Status Dot */}
          {!isOpen && isOnline && (
            <span className="absolute -top-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-green-400 rounded-full border-2 border-white dark:border-gray-900" />
          )}
        </button>

        {/* Expanded Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className={cn(
                "absolute w-80 sm:w-96",
                menuPositionClasses[position],
              )}
            >
              <div className="glass-surface rounded-2xl shadow-2xl border border-green-500/20 overflow-hidden">
                {/* Header with Availability */}
                <div className="bg-gradient-to-r from-green-500 to-green-600 p-4 text-white">
                  <div className="flex items-center gap-3">
                    <MessageCircle className="w-5 h-5" />
                    <div className="flex-1">
                      <p className="font-black text-sm uppercase tracking-wider">
                        Quick Contact
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        {showAvailability && (
                          <>
                            {isOnline ? (
                              <>
                                <Zap className="w-3 h-3" />
                                <p className="text-xs opacity-90">
                                  We're online now! 🟢
                                </p>
                              </>
                            ) : (
                              <>
                                <Clock className="w-3 h-3" />
                                <p className="text-xs opacity-90">
                                  Offline • Leave a message
                                </p>
                              </>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* First Visit Welcome Message */}
                {isFirstVisit && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="p-3 bg-green-50 dark:bg-green-950/20 border-b border-green-500/20"
                  >
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-green-500" />
                      <p className="text-xs font-medium">
                        👋 Welcome! How can we help you today?
                      </p>
                    </div>
                  </motion.div>
                )}

                {/* Quick Replies */}
                {showQuickReplies && (
                  <div className="p-3 border-b border-border/50">
                    <p className="text-xs font-black text-muted-foreground uppercase tracking-wider mb-2">
                      Quick Replies
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      {QUICK_REPLIES.map((reply, idx) => {
                        const Icon = reply.icon;
                        return (
                          <button
                            key={idx}
                            onClick={() => {
                              const quickMessage = encodeURIComponent(
                                reply.message,
                              );
                              window.open(
                                `https://wa.me/${phoneNumber}?text=${quickMessage}`,
                                "_blank",
                              );
                              handleContact("quick_reply");
                            }}
                            className="flex items-center gap-2 p-2 rounded-lg bg-muted/30 hover:bg-green-50 dark:hover:bg-green-950/20 transition-all group"
                          >
                            <Icon className="w-3 h-3 text-green-500" />
                            <span className="text-xs font-medium">
                              {reply.label}
                            </span>
                            <ChevronRight className="w-3 h-3 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Contact Options */}
                <div className="p-3 space-y-2">
                  {/* WhatsApp Direct */}
                  <Link
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => handleContact("whatsapp")}
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-green-50 dark:hover:bg-green-950/20 transition-all group"
                  >
                    <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center group-hover:bg-green-500/20 transition-colors">
                      <MessageCircle className="w-5 h-5 text-green-500" />
                    </div>
                    <div className="flex-1">
                      <p className="font-black text-sm uppercase tracking-tight">
                        WhatsApp Chat
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {isOnline
                          ? "Instant response"
                          : "We'll respond within 24h"}
                      </p>
                    </div>
                    <Send className="w-4 h-4 text-green-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>

                  {/* Call */}
                  <Link
                    href="tel:+2349110163930"
                    onClick={() => handleContact("call")}
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-primary-50 dark:hover:bg-primary-950/20 transition-all group"
                  >
                    <div className="w-10 h-10 rounded-full bg-primary-500/10 flex items-center justify-center group-hover:bg-primary-500/20 transition-colors">
                      <Phone className="w-5 h-5 text-primary-500" />
                    </div>
                    <div className="flex-1">
                      <p className="font-black text-sm uppercase tracking-tight">
                        Call Us
                      </p>
                      <p className="text-xs text-muted-foreground">
                        +234 911 016 3930
                      </p>
                    </div>
                  </Link>

                  {/* Email */}
                  <Link
                    href="mailto:info.almaysaroh@gmail.com"
                    onClick={() => handleContact("email")}
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-primary-50 dark:hover:bg-primary-950/20 transition-all group"
                  >
                    <div className="w-10 h-10 rounded-full bg-primary-500/10 flex items-center justify-center group-hover:bg-primary-500/20 transition-colors">
                      <Mail className="w-5 h-5 text-primary-500" />
                    </div>
                    <div className="flex-1">
                      <p className="font-black text-sm uppercase tracking-tight">
                        Send Email
                      </p>
                      <p className="text-xs text-muted-foreground">
                        info.almaysaroh@gmail.com
                      </p>
                    </div>
                  </Link>
                </div>

                {/* Footer Note */}
                <div className="p-3 border-t border-border/50 bg-muted/30">
                  <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                    <span>Available 7 days a week</span>
                    <span>9AM - 9PM WAT</span>
                  </div>
                  {!isOnline && (
                    <p className="text-[10px] text-center text-muted-foreground mt-2">
                      <Bell className="w-3 h-3 inline mr-1" />
                      Leave a message, we'll respond within 12 hours
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}