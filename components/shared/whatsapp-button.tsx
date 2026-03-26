"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Phone, Mail, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface WhatsAppButtonProps {
  phoneNumber?: string; // Format: "2349110163930" (country code without +)
  message?: string; // Pre-filled message
  showOnMobile?: boolean;
  showOnDesktop?: boolean;
}

export function WhatsAppButton({
  phoneNumber = "2349110163930", // Nigeria +234
  message = "Assalamu Alaikum! I'm interested in learning more about Al-Maysaroh programs.",
  showOnMobile = true,
  showOnDesktop = true,
}: WhatsAppButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

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

  // Don't show if not on desired devices
  if ((isMobile && !showOnMobile) || (!isMobile && !showOnDesktop)) {
    return null;
  }

  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  return (
    <>
      {/* Floating Button */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ 
          scale: isVisible ? 1 : 0, 
          opacity: isVisible ? 1 : 0 
        }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="fixed bottom-6 right-4 sm:bottom-8 sm:right-6 z-50"
      >
        {/* WhatsApp Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "relative w-14 h-14 sm:w-16 sm:h-16 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 group",
            "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700",
            "focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-background"
          )}
          aria-label="Contact us on WhatsApp"
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

          {/* Pulse Ring */}
          <span className="absolute inset-0 rounded-full animate-ping bg-green-500/30" />
        </button>

        {/* Expanded Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-full right-0 mb-4 w-72 sm:w-80"
            >
              <div className="glass-surface rounded-2xl shadow-2xl border border-green-500/20 overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-green-500 to-green-600 p-4 text-white">
                  <div className="flex items-center gap-3">
                    <MessageCircle className="w-5 h-5" />
                    <div>
                      <p className="font-black text-sm uppercase tracking-wider">
                        Quick Contact
                      </p>
                      <p className="text-xs opacity-90">We typically respond within minutes</p>
                    </div>
                  </div>
                </div>

                {/* Options */}
                <div className="p-3 space-y-2">
                  {/* WhatsApp Direct */}
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
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
                        Instant messaging with our team
                      </p>
                    </div>
                    <Send className="w-4 h-4 text-green-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>

                  {/* Call */}
                  <a
                    href="tel:+2349110163930"
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
                  </a>

                  {/* Email */}
                  <a
                    href="mailto:info.almaysaroh@gmail.com"
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
                  </a>
                </div>

                {/* Footer Note */}
                <div className="p-3 border-t border-border/50 bg-muted/30">
                  <p className="text-[10px] text-center text-muted-foreground">
                    Available 7 days a week • 9AM - 9PM WAT
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}

