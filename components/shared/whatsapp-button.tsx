"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import {
  MessageCircle,
  X,
  Phone,
  Mail,
  Send,
  Sparkles,
  Clock,
  CheckCircle2,
  Shield,
  Star,
  Users,
  BookOpen,
  Heart,
  ArrowRight,
  Calendar,
  MessageSquare,
  Globe,
  Zap,
  Award,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface WhatsAppButtonProps {
  phoneNumber?: string;
  defaultMessage?: string;
  position?: "bottom-right" | "bottom-left";
  theme?: "dark" | "light" | "auto";
  showOnMobile?: boolean;
  showOnDesktop?: boolean;
  autoOpen?: boolean;
  autoOpenDelay?: number;
  showGreeting?: boolean;
  greetingMessage?: string;
  preQualify?: boolean;
  trackAnalytics?: boolean;
}

export function WhatsAppButton({
  phoneNumber = "2349110163930",
  defaultMessage = "Assalamu Alaikum! I'm interested in learning more about Al-Maysaroh programs. Can you guide me?",
  position = "bottom-right",
  theme = "auto",
  showOnMobile = true,
  showOnDesktop = true,
  autoOpen = false,
  autoOpenDelay = 3000,
  showGreeting = true,
  greetingMessage = "Need help? We're here for you! 💚",
  preQualify = true,
  trackAnalytics = true,
}: WhatsAppButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [hasAutoOpened, setHasAutoOpened] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<string>("");
  const [customMessage, setCustomMessage] = useState("");
  const [showPreQualify, setShowPreQualify] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<Array<{ text: string; isUser: boolean; timestamp: Date }>>([]);
  const [step, setStep] = useState<"greeting" | "pre-qualify" | "message" | "confirmation">("greeting");
  
  const buttonRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  
  // Mouse follower for micro-interactions
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 500, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 500, damping: 30 });

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Hide on scroll down
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

  // Auto-open after delay
  useEffect(() => {
    if (autoOpen && !hasAutoOpened && !isOpen && isVisible) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        setHasAutoOpened(true);
        if (trackAnalytics) {
          // Track auto-open event
          console.log("[Analytics] WhatsApp button auto-opened");
        }
      }, autoOpenDelay);
      return () => clearTimeout(timer);
    }
  }, [autoOpen, hasAutoOpened, isOpen, isVisible, autoOpenDelay, trackAnalytics]);

  // Track when message is sent
  const handleSendMessage = useCallback(() => {
    let finalMessage = defaultMessage;
    
    if (preQualify && selectedProgram) {
      finalMessage = `Assalamu Alaikum! I'm interested in the **${selectedProgram}** program. ${customMessage}`;
    } else if (customMessage) {
      finalMessage = customMessage;
    }
    
    const encodedMessage = encodeURIComponent(finalMessage);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    if (trackAnalytics) {
      // Track conversion
      console.log("[Analytics] WhatsApp conversion", {
        program: selectedProgram,
        messageLength: finalMessage.length,
        timestamp: new Date().toISOString(),
      });
    }
    
    window.open(whatsappUrl, "_blank");
    
    // Add to local messages for UI
    setMessages(prev => [...prev, {
      text: finalMessage,
      isUser: true,
      timestamp: new Date(),
    }]);
    
    setStep("confirmation");
    setTimeout(() => {
      setIsOpen(false);
      setTimeout(() => {
        setStep("greeting");
        setSelectedProgram("");
        setCustomMessage("");
        setMessages([]);
      }, 500);
    }, 2000);
  }, [phoneNumber, defaultMessage, preQualify, selectedProgram, customMessage, trackAnalytics]);

  // Programs for pre-qualification
  const programs = [
    { id: "hifz", name: "Hifz Program", icon: BookOpen, color: "from-emerald-500 to-emerald-600" },
    { id: "tajweed", name: "Tajweed Mastery", icon: Star, color: "from-blue-500 to-blue-600" },
    { id: "arabic", name: "Arabic Fluency", icon: Globe, color: "from-amber-500 to-amber-600" },
    { id: "children", name: "Children's Program", icon: Heart, color: "from-pink-500 to-pink-600" },
    { id: "ijazah", name: "Ijazah Certification", icon: Award, color: "from-purple-500 to-purple-600" },
    { id: "general", name: "General Inquiry", icon: MessageSquare, color: "from-slate-500 to-slate-600" },
  ];

  // Quick reply options
  const quickReplies = [
    { text: "Tell me about Hifz program", program: "hifz" },
    { text: "How much is tuition?", program: "pricing" },
    { text: "Free assessment session", program: "assessment" },
    { text: "Children's classes", program: "children" },
  ];

  // Pre-qualify flow
  const startPreQualify = () => {
    setStep("pre-qualify");
    setMessages([{
      text: "Hi there! 👋 I'm here to help. Which program are you interested in?",
      isUser: false,
      timestamp: new Date(),
    }]);
  };

  const selectProgram = (programId: string) => {
    const program = programs.find(p => p.id === programId);
    setSelectedProgram(programId);
    setMessages(prev => [...prev, {
      text: program?.name || "Selected",
      isUser: true,
      timestamp: new Date(),
    }]);
    setTimeout(() => {
      setMessages(prev => [...prev, {
        text: `Great choice! ${program?.name} is one of our most popular programs. Would you like to share any specific questions?`,
        isUser: false,
        timestamp: new Date(),
      }]);
      setStep("message");
      setTimeout(() => inputRef.current?.focus(), 100);
    }, 500);
  };

  // Don't show if not on desired devices
  if ((isMobile && !showOnMobile) || (!isMobile && !showOnDesktop)) {
    return null;
  }

  const positionClasses = {
    "bottom-right": "bottom-6 right-4 sm:bottom-8 sm:right-6",
    "bottom-left": "bottom-6 left-4 sm:bottom-8 sm:left-6",
  };

  const themeClasses = {
    dark: "dark",
    light: "light",
    auto: "auto",
  };

  return (
    <>
      {/* Floating Button */}
      <motion.div
        ref={buttonRef}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: isVisible ? 1 : 0, opacity: isVisible ? 1 : 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className={`fixed ${positionClasses[position]} z-50`}
        onMouseMove={(e) => {
          const rect = buttonRef.current?.getBoundingClientRect();
          if (rect) {
            mouseX.set(e.clientX - rect.left - rect.width / 2);
            mouseY.set(e.clientY - rect.top - rect.height / 2);
          }
        }}
        onMouseLeave={() => {
          mouseX.set(0);
          mouseY.set(0);
        }}
      >
        {/* Magnetic Effect Button */}
        <motion.button
          style={{
            x: springX,
            y: springY,
          }}
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "relative w-14 h-14 sm:w-16 sm:h-16 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 group",
            "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700",
            "focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-background"
          )}
          aria-label="Contact us on WhatsApp"
          whileTap={{ scale: 0.95 }}
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

          {/* Pulse Rings */}
          <span className="absolute inset-0 rounded-full animate-ping bg-green-500/30" />
          <span className="absolute inset-0 rounded-full animate-pulse bg-green-500/20" style={{ animationDuration: "1.5s" }} />
          
          {/* Availability Badge */}
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-green-400 border-2 border-background animate-pulse" />
        </motion.button>

        {/* Chat Window */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className={cn(
                "absolute bottom-full right-0 mb-4 w-[90vw] sm:w-96 max-w-[90vw] sm:max-w-none",
                position === "bottom-left" ? "left-0 right-auto" : "right-0 left-auto"
              )}
            >
              <div className="glass-surface rounded-3xl shadow-2xl border border-green-500/20 overflow-hidden backdrop-blur-xl">
                {/* Header */}
                <div className="bg-gradient-to-r from-green-500 to-green-600 p-4 text-white">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <MessageCircle className="w-6 h-6" />
                      <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-green-300 animate-pulse" />
                    </div>
                    <div className="flex-1">
                      <p className="font-black text-sm uppercase tracking-wider flex items-center gap-2">
                        Al-Maysaroh Support
                        <Shield className="w-3 h-3 opacity-80" />
                      </p>
                      <div className="flex items-center gap-2 text-xs opacity-90">
                        <Clock className="w-3 h-3" />
                        <span>Typically responds in &lt; 2 min</span>
                        <CheckCircle2 className="w-3 h-3" />
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex -space-x-2">
                        {[1, 2, 3].map((i) => (
                          <div
                            key={i}
                            className="w-6 h-6 rounded-full bg-white/20 border border-white/30 flex items-center justify-center"
                          >
                            <span className="text-[8px] font-black">👤</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Greeting Banner */}
                {showGreeting && step === "greeting" && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 border-b border-green-500/20"
                  >
                    <div className="flex items-start gap-3">
                      <Sparkles className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-black text-sm">{greetingMessage}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Our admissions team is online and ready to assist you.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Chat Messages */}
                {preQualify && messages.length > 0 && (
                  <div className="h-64 overflow-y-auto p-4 space-y-3 bg-muted/5">
                    <AnimatePresence>
                      {messages.map((msg, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: msg.isUser ? 20 : -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          className={cn(
                            "flex",
                            msg.isUser ? "justify-end" : "justify-start"
                          )}
                        >
                          <div
                            className={cn(
                              "max-w-[80%] p-3 rounded-2xl",
                              msg.isUser
                                ? "bg-gradient-to-r from-green-500 to-green-600 text-white rounded-br-none"
                                : "bg-muted/50 border border-border rounded-bl-none"
                            )}
                          >
                            <p className="text-sm">{msg.text}</p>
                            <p className="text-[9px] opacity-50 mt-1">
                              {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                    
                    {isTyping && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-center gap-2 p-3 rounded-2xl bg-muted/50 w-20"
                      >
                        <div className="flex gap-1">
                          <span className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                          <span className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                          <span className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                        </div>
                      </motion.div>
                    )}
                  </div>
                )}

                {/* Pre-qualify Options */}
                {preQualify && step === "pre-qualify" && (
                  <div className="p-4 space-y-3 border-t border-border/50">
                    <p className="text-xs font-black uppercase tracking-wider text-muted-foreground">
                      Select a program to get started:
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      {programs.map((program) => (
                        <motion.button
                          key={program.id}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => selectProgram(program.id)}
                          className={cn(
                            "flex items-center gap-2 p-2 rounded-xl text-left transition-all",
                            "bg-gradient-to-r from-muted/30 to-muted/20 hover:from-primary-50/20 hover:to-primary-100/20 border border-border/50"
                          )}
                        >
                          <div className={cn("w-8 h-8 rounded-lg bg-gradient-to-r flex items-center justify-center", program.color)}>
                            <program.icon className="w-4 h-4 text-white" />
                          </div>
                          <span className="text-xs font-black">{program.name}</span>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quick Replies */}
                {step === "greeting" && (
                  <div className="p-4 border-t border-border/50">
                    <p className="text-xs font-black uppercase tracking-wider text-muted-foreground mb-3">
                      Quick replies:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {quickReplies.map((reply) => (
                        <motion.button
                          key={reply.text}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={startPreQualify}
                          className="px-3 py-1.5 rounded-full bg-primary-700/10 text-primary-700 text-xs font-black hover:bg-primary-700/20 transition-colors"
                        >
                          {reply.text}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Message Input */}
                {(step === "greeting" || step === "message") && (
                  <div className="p-4 border-t border-border/50 bg-muted/20">
                    <div className="flex gap-2">
                      <textarea
                        ref={inputRef}
                        rows={1}
                        placeholder="Type your message here..."
                        value={customMessage}
                        onChange={(e) => setCustomMessage(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            if (customMessage.trim()) handleSendMessage();
                          }
                        }}
                        className="flex-1 p-3 rounded-xl bg-background border border-border focus:border-primary-700 focus:ring-2 focus:ring-primary-500/20 outline-none resize-none text-sm"
                      />
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleSendMessage}
                        disabled={!customMessage.trim() && !selectedProgram}
                        className={cn(
                          "w-10 h-10 rounded-full flex items-center justify-center transition-all",
                          customMessage.trim() || selectedProgram
                            ? "bg-gradient-to-r from-green-500 to-green-600 text-white"
                            : "bg-muted text-muted-foreground"
                        )}
                      >
                        <Send className="w-4 h-4" />
                      </motion.button>
                    </div>
                    <p className="text-[9px] text-muted-foreground mt-2 text-center">
                      Powered by Al-Maysaroh • 24/7 Support
                    </p>
                  </div>
                )}

                {/* Confirmation Screen */}
                {step === "confirmation" && (
                  <div className="p-8 text-center space-y-3">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="w-16 h-16 mx-auto rounded-full bg-green-500/10 flex items-center justify-center"
                    >
                      <CheckCircle2 className="w-8 h-8 text-green-500" />
                    </motion.div>
                    <p className="font-black">Message Sent! 🎉</p>
                    <p className="text-xs text-muted-foreground">
                      Our team will respond to you shortly via WhatsApp.
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Floating Particles Background */}
      <AnimatePresence>
        {isOpen && (
          <>
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: [0, 0.5, 0], scale: [0, 1, 0] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 2, delay: i * 0.2, repeat: Infinity }}
                className="fixed pointer-events-none z-40"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
              >
                <Sparkles className="w-4 h-4 text-green-500/30" />
              </motion.div>
            ))}
          </>
        )}
      </AnimatePresence>
    </>
  );
}

















// "use client";

// import { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { MessageCircle, X, Phone, Mail, Send } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import Link from "next/link";
// import { cn } from "@/lib/utils";

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
//             "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700",
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
//                 <div className="bg-gradient-to-r from-green-500 to-green-600 p-4 text-white">
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
//                   <a
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
//                   </a>

//                   {/* Call */}
//                   <a
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
//                   </a>

//                   {/* Email */}
//                   <a
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
//                   </a>
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

