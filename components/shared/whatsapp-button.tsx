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

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import {
  Mail,
  MessageCircle,
  Phone,
  X,
  Clock,
  Globe,
  Shield,
  CheckCircle,
  ChevronRight,
} from "lucide-react";
import { useEffect, useState, useCallback, useRef } from "react";

interface WhatsAppButtonProps {
  phoneNumber?: string;
  email?: string;
  message?: string;
  showOnMobile?: boolean;
  showOnDesktop?: boolean;
  position?: "bottom-left" | "bottom-right";
  theme?: "green" | "blue" | "dark" | "custom";
  customColors?: {
    primary: string;
    secondary: string;
    accent: string;
  };
  showAvailability?: boolean;
  availabilityHours?: {
    start: string;
    end: string;
    timezone: string;
  };
  enableAnalytics?: boolean;
  analyticsCallback?: (action: string, source: string) => void;
  prefillMessage?: boolean;
  autoCloseDelay?: number;
  showTooltip?: boolean;
  tooltipText?: string;
  disableScrollHide?: boolean;
  zIndex?: number;
  size?: "sm" | "md" | "lg";
}

// Throttle function for performance
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

// Check if currently within availability hours
function isWithinAvailability(hours?: {
  start: string;
  end: string;
  timezone: string;
}) {
  if (!hours) return true;

  try {
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = {
      timeZone: hours.timezone,
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    };

    const currentTime = new Intl.DateTimeFormat("en-US", options).format(now);
    const [currentHour, currentMinute] = currentTime.split(":").map(Number);
    const [startHour, startMinute] = hours.start.split(":").map(Number);
    const [endHour, endMinute] = hours.end.split(":").map(Number);

    const currentMinutes = currentHour * 60 + currentMinute;
    const startMinutes = startHour * 60 + startMinute;
    const endMinutes = endHour * 60 + endMinute;

    return currentMinutes >= startMinutes && currentMinutes <= endMinutes;
  } catch {
    return true;
  }
}

export function WhatsAppButton({
  phoneNumber = "2349110163930",
  email = "info.almaysaroh@gmail.com",
  message = "Assalamu Alaikum! I'm interested in learning more about Al-Maysaroh programs.",
  showOnMobile = true,
  showOnDesktop = true,
  position = "bottom-right",
  theme = "green",
  customColors,
  showAvailability = true,
  availabilityHours = {
    start: "00:00",
    end: "22:00",
    timezone: "Africa/Lagos",
  },
  enableAnalytics = false,
  analyticsCallback,
  prefillMessage = true,
  autoCloseDelay = 5000,
  showTooltip = true,
  tooltipText = "Chat with us! 💬",
  disableScrollHide = false,
  zIndex = 50,
  size = "md",
}: WhatsAppButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isAvailable, setIsAvailable] = useState(true);
  const [showSuccessTooltip, setShowSuccessTooltip] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const autoCloseTimerRef = useRef<NodeJS.Timeout>();
  const buttonRef = useRef<HTMLDivElement>(null);

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Check availability
  useEffect(() => {
    if (!showAvailability) return;

    const checkAvailability = () => {
      setIsAvailable(isWithinAvailability(availabilityHours));
    };

    checkAvailability();
    const interval = setInterval(checkAvailability, 60000); // Check every minute

    return () => clearInterval(interval);
  }, [showAvailability, availabilityHours]);

  // Hide on scroll down, show on scroll up
  useEffect(() => {
    if (disableScrollHide) return;

    const handleScroll = throttle(() => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    }, 100);

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, disableScrollHide]);

  // Handle escape key and click outside
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (
        isOpen &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("keydown", handleEscape);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Auto close menu after delay
  useEffect(() => {
    if (isOpen && autoCloseDelay > 0) {
      autoCloseTimerRef.current = setTimeout(() => {
        setIsOpen(false);
      }, autoCloseDelay);
    }

    return () => {
      if (autoCloseTimerRef.current) {
        clearTimeout(autoCloseTimerRef.current);
      }
    };
  }, [isOpen, autoCloseDelay]);

  // Track analytics
  const trackAnalytics = useCallback(
    (action: string, source: string) => {
      if (enableAnalytics && analyticsCallback) {
        analyticsCallback(action, source);
      } else if (enableAnalytics) {
        // Default analytics to console (replace with your analytics service)
        console.log(`[Analytics] ${action} - Source: ${source}`);
      }
    },
    [enableAnalytics, analyticsCallback],
  );

  // Handle WhatsApp click
  const handleWhatsAppClick = useCallback(() => {
    const finalMessage = prefillMessage ? message : "";
    const encodedMessage = encodeURIComponent(finalMessage);
    const whatsappUrl = `https://wa.me/${phoneNumber}${finalMessage ? `?text=${encodedMessage}` : ""}`;

    trackAnalytics("click_whatsapp", "whatsapp_button");
    setIsOpen(false);

    // Show success feedback
    setShowSuccessTooltip(true);
    setTimeout(() => setShowSuccessTooltip(false), 2000);

    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  }, [phoneNumber, message, prefillMessage, trackAnalytics]);

  // Handle call click
  const handleCallClick = useCallback(() => {
    trackAnalytics("click_call", "call_button");
    setIsOpen(false);
    window.location.href = `tel:${phoneNumber}`;
  }, [phoneNumber, trackAnalytics]);

  // Handle email click
  const handleEmailClick = useCallback(() => {
    const subject = prefillMessage ? "Inquiry from Website" : "";
    const body = prefillMessage ? message : "";
    const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    trackAnalytics("click_email", "email_button");
    setIsOpen(false);
    window.location.href = mailtoUrl;
  }, [email, message, prefillMessage, trackAnalytics]);

  // Theme configurations
  const themes = {
    green: {
      gradient: "from-green-500 to-green-600",
      hoverGradient: "hover:from-green-600 hover:to-green-700",
      ring: "ring-green-500",
      bg: "bg-green-500",
      bgLight: "bg-green-50 dark:bg-green-950/20",
      border: "border-green-500/20",
      text: "text-green-500",
    },
    blue: {
      gradient: "from-blue-500 to-blue-600",
      hoverGradient: "hover:from-blue-600 hover:to-blue-700",
      ring: "ring-blue-500",
      bg: "bg-blue-500",
      bgLight: "bg-blue-50 dark:bg-blue-950/20",
      border: "border-blue-500/20",
      text: "text-blue-500",
    },
    dark: {
      gradient: "from-gray-700 to-gray-800",
      hoverGradient: "hover:from-gray-800 hover:to-gray-900",
      ring: "ring-gray-500",
      bg: "bg-gray-700",
      bgLight: "bg-gray-50 dark:bg-gray-800/20",
      border: "border-gray-500/20",
      text: "text-gray-700 dark:text-gray-300",
    },
    custom: customColors
      ? {
          gradient: `from-[${customColors.primary}] to-[${customColors.secondary}]`,
          hoverGradient: `hover:from-[${customColors.secondary}] hover:to-[${customColors.accent}]`,
          ring: `ring-[${customColors.primary}]`,
          bg: `bg-[${customColors.primary}]`,
          bgLight: `bg-[${customColors.primary}]/10`,
          border: `border-[${customColors.primary}]/20`,
          text: `text-[${customColors.primary}]`,
        }
      : {
          gradient: "from-green-500 to-green-600",
          hoverGradient: "hover:from-green-600 hover:to-green-700",
          ring: "ring-green-500",
          bg: "bg-green-500",
          bgLight: "bg-green-50 dark:bg-green-950/20",
          border: "border-green-500/20",
          text: "text-green-500",
        },
  };

  // Don't show if not on desired devices
  if ((isMobile && !showOnMobile) || (!isMobile && !showOnDesktop)) {
    return null;
  }

  const activeTheme =
    theme === "custom" && customColors
      ? themes.custom
      : themes[theme as keyof typeof themes];

  // Size configurations
  const sizes = {
    sm: {
      button: "w-10 h-10",
      icon: "w-4 h-4",
      menu: "w-64",
      iconContainer: "w-8 h-8",
    },
    md: {
      button: "w-14 h-14 sm:w-16 sm:h-16",
      icon: "w-6 h-6 sm:w-7 sm:h-7",
      menu: "w-72 sm:w-80",
      iconContainer: "w-10 h-10",
    },
    lg: {
      button: "w-16 h-16 sm:w-20 sm:h-20",
      icon: "w-7 h-7 sm:w-8 sm:h-8",
      menu: "w-80 sm:w-96",
      iconContainer: "w-12 h-12",
    },
  };

  const currentSize = sizes[size];

  // Position classes
  const positionClasses = {
    "bottom-right": "bottom-6 right-4 sm:bottom-8 sm:right-6",
    "bottom-left": "bottom-6 left-4 sm:bottom-8 sm:left-6",
  };

  const menuPositionClasses = {
    "bottom-right": "bottom-full right-0 mb-4",
    "bottom-left": "bottom-full left-0 mb-4",
  };

  return (
    <>
      {/* Tooltip */}
      <AnimatePresence>
        {showTooltip && !isOpen && isVisible && !isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className={cn(
              "fixed z-40 px-3 py-2 rounded-lg text-sm font-medium shadow-lg",
              "bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900",
              "whitespace-nowrap",
              position === "bottom-right" ? "right-24" : "left-24",
              position === "bottom-right" ? "bottom-8" : "bottom-8",
            )}
          >
            {tooltipText}
            <div
              className={cn(
                "absolute w-2 h-2 bg-gray-900 dark:bg-gray-100 rotate-45",
                position === "bottom-right"
                  ? "-right-1 top-1/2 -translate-y-1/2"
                  : "-left-1 top-1/2 -translate-y-1/2",
              )}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success Tooltip */}
      <AnimatePresence>
        {showSuccessTooltip && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-lg shadow-lg bg-green-500 text-white text-sm font-medium flex items-center gap-2"
          >
            <CheckCircle className="w-4 h-4" />
            Opening WhatsApp...
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button Container */}
      <motion.div
        ref={buttonRef}
        initial={{ scale: 0, opacity: 0 }}
        animate={{
          scale: isVisible ? 1 : 0,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className={cn("fixed z-50", positionClasses[position])}
        style={{ zIndex }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Main Button */}
        <button
          onClick={() => {
            setIsOpen(!isOpen);
            trackAnalytics(isOpen ? "close_menu" : "open_menu", "main_button");
          }}
          className={cn(
            "relative rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 group",
            "bg-linear-to-r",
            activeTheme.gradient,
            activeTheme.hoverGradient,
            "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background",
            "active:scale-95 transition-transform",
            currentSize.button,
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
                <X className={cn("text-white", currentSize.icon)} />
              </motion.div>
            ) : (
              <motion.div
                key="whatsapp"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <MessageCircle className={cn("text-white", currentSize.icon)} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Pulse Ring - only when closed and available */}
          {!isOpen && isAvailable && (
            <span
              className={cn(
                "absolute inset-0 rounded-full animate-ping",
                activeTheme.bg + "/30",
              )}
            />
          )}

          {/* Availability Badge */}
          {showAvailability && (
            <span
              className={cn(
                "absolute -top-1 -right-1 w-3 h-3 rounded-full border-2 border-white",
                isAvailable ? "bg-green-500" : "bg-gray-400",
              )}
            />
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
                "absolute",
                menuPositionClasses[position],
                currentSize.menu,
              )}
            >
              <div
                className={cn(
                  "glass-surface rounded-2xl shadow-2xl border overflow-hidden",
                  activeTheme.border,
                )}
              >
                {/* Header */}
                <div
                  className={cn(
                    "bg-linear-to-r p-4 text-white",
                    activeTheme.gradient,
                  )}
                >
                  <div className="flex items-center gap-3">
                    <MessageCircle className="w-5 h-5" />
                    <div className="flex-1">
                      <p className="font-black text-sm uppercase tracking-wider">
                        Quick Contact
                      </p>
                      <p className="text-xs opacity-90">
                        We typically respond within minutes
                      </p>
                    </div>
                    {showAvailability && (
                      <div className="text-right">
                        <div
                          className={cn(
                            "text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/20",
                            !isAvailable && "opacity-70",
                          )}
                        >
                          {isAvailable ? "Online" : "Offline"}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Options */}
                <div className="p-3 space-y-2">
                  {/* WhatsApp Direct */}
                  <button
                    onClick={handleWhatsAppClick}
                    className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-green-50 dark:hover:bg-green-950/20 transition-all group"
                  >
                    <div
                      className={cn(
                        "rounded-full flex items-center justify-center transition-colors",
                        currentSize.iconContainer,
                        activeTheme.bgLight,
                        "group-hover:bg-green-500/20",
                      )}
                    >
                      <MessageCircle
                        className={cn("w-5 h-5", activeTheme.text)}
                      />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="font-black text-sm uppercase tracking-tight">
                        WhatsApp Chat
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Instant messaging with our team
                      </p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-green-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>

                  {/* Call */}
                  <button
                    onClick={handleCallClick}
                    className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-primary-50 dark:hover:bg-primary-950/20 transition-all group"
                  >
                    <div className="w-10 h-10 rounded-full bg-primary-500/10 flex items-center justify-center group-hover:bg-primary-500/20 transition-colors">
                      <Phone className="w-5 h-5 text-primary-500" />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="font-black text-sm uppercase tracking-tight">
                        Call Us
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {phoneNumber.replace(
                          /(\d{3})(\d{3})(\d{4})/,
                          "$1 $2 $3",
                        )}
                      </p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-primary-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>

                  {/* Email */}
                  <button
                    onClick={handleEmailClick}
                    className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-primary-50 dark:hover:bg-primary-950/20 transition-all group"
                  >
                    <div className="w-10 h-10 rounded-full bg-primary-500/10 flex items-center justify-center group-hover:bg-primary-500/20 transition-colors">
                      <Mail className="w-5 h-5 text-primary-500" />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="font-black text-sm uppercase tracking-tight">
                        Send Email
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {email}
                      </p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-primary-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                </div>

                {/* Footer Info */}
                <div className="p-3 border-t border-border/50 bg-muted/30 space-y-2">
                  {showAvailability && availabilityHours && (
                    <div className="flex items-center justify-center gap-2 text-[10px] text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      <span>
                        {availabilityHours.start} - {availabilityHours.end}{" "}
                        {availabilityHours.timezone}
                      </span>
                      <Globe className="w-3 h-3 ml-1" />
                    </div>
                  )}

                  <div className="flex items-center justify-center gap-2 text-[10px] text-muted-foreground">
                    <Shield className="w-3 h-3" />
                    <span>100% Secure & Encrypted</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}