// app/admissions/success/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  CheckCircle2,
  ArrowRight,
  Mail,
  Phone,
  MessageCircle,
  Sparkles,
  Home,
  Clock,
  Calendar,
  Users,
  Copy,
  Check,
  Download,
  Loader2,
  Instagram,
  Facebook,
  Twitter,
  Youtube,
  ChevronRight,
  Send,
  Shield,
} from "lucide-react";

export default function AdmissionsSuccessPage() {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [applicationData, setApplicationData] = useState({
    reference: "",
    email: "",
    name: "",
    timestamp: "",
  });
  const [timeRemaining, setTimeRemaining] = useState({
    hours: 24,
    minutes: 0,
    seconds: 0,
  });

  // Check authorization on mount
  useEffect(() => {
    const hasSubmitted = sessionStorage.getItem("applicationSubmitted");
    const reference = sessionStorage.getItem("applicationReference");
    const email = sessionStorage.getItem("applicationEmail");
    const name = sessionStorage.getItem("applicationName");
    const timestamp = sessionStorage.getItem("applicationTimestamp");

    if (hasSubmitted === "true" && reference && email) {
      setIsAuthorized(true);
      setApplicationData({
        reference,
        email,
        name: name || "Student",
        timestamp: timestamp || new Date().toISOString(),
      });
    } else {
      // Redirect to home page if unauthorized
      router.replace("/");
    }

    setIsLoading(false);
  }, [router]);

  // Countdown timer
  useEffect(() => {
    const targetTime = new Date();
    targetTime.setHours(targetTime.getHours() + 24);

    const timer = setInterval(() => {
      const now = new Date();
      const diff = targetTime.getTime() - now.getTime();

      if (diff <= 0) {
        clearInterval(timer);
        setTimeRemaining({ hours: 0, minutes: 0, seconds: 0 });
      } else {
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        setTimeRemaining({ hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const copyReferenceNumber = () => {
    navigator.clipboard.writeText(applicationData.reference);
    setCopied(true);
    toast.success("Reference number copied!", {
      description: "Save this for future reference",
      duration: 2000,
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadApplicationSummary = () => {
    const summary = `
Al-Maysaroh Academy - Application Summary
===========================================
Reference Number: ${applicationData.reference}
Name: ${applicationData.name}
Email: ${applicationData.email}
Date Submitted: ${new Date(applicationData.timestamp).toLocaleString()}
Status: Pending Review

Next Steps:
1. Check your email for confirmation
2. Await contact within 24-48 hours
3. Schedule free assessment
4. Receive teacher matching

Contact Information:
Email: info.almaysaroh@gmail.com
Phone: +234 911 016 3930
WhatsApp: +234 911 016 3930

Thank you for choosing Al-Maysaroh!
    `;

    const blob = new Blob([summary], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Al-Maysaroh-Application-${applicationData.reference}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("Application summary downloaded!");
  };

  const addToCalendar = () => {
    const event = {
      title: "Al-Maysaroh Application Follow-up",
      description: "Check status of my application to Al-Maysaroh Academy",
      startTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
      endTime: new Date(
        Date.now() + 2 * 24 * 60 * 60 * 1000 + 30 * 60 * 1000,
      ).toISOString(),
    };

    const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&details=${encodeURIComponent(event.description)}&dates=${event.startTime.replace(/[-:]/g, "").split(".")[0]}/${event.endTime.replace(/[-:]/g, "").split(".")[0]}`;
    window.open(calendarUrl, "_blank");
    toast.success("Calendar reminder set!");
  };

  // Show loading state
  if (isLoading) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-purple-600 mx-auto mb-4" />
          <p className="text-muted-foreground">Verifying access...</p>
        </div>
      </main>
    );
  }

  // Don't render if not authorized
  if (!isAuthorized) {
    return null;
  }

  return (
    <main className="pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 md:pb-20 bg-background min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-3 xs:px-4 sm:px-6 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="bg-card rounded-xl sm:rounded-2xl border border-border hover:border-purple-300 transition-all p-6 sm:p-8 md:p-10 lg:p-12 text-center shadow-xl"
        >
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-5 sm:mb-6 rounded-full bg-gradient-to-br from-purple-100 to-amber-100 dark:from-purple-900/30 dark:to-amber-900/30 flex items-center justify-center"
          >
            <CheckCircle2 className="w-10 h-10 sm:w-12 sm:h-12 text-purple-600" />
          </motion.div>

          {/* Title */}
          <h1 className="text-2xl xs:text-3xl sm:text-4xl font-black tracking-tighter mb-3 sm:mb-4 px-2">
            Application{" "}
            <span className="bg-gradient-to-r from-purple-600 to-amber-600 bg-clip-text text-transparent">
              Submitted!
            </span>{" "}
            🎉
          </h1>

          {/* Description */}
          <p className="text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8 px-4">
            Thank you for applying to Al-Maysaroh, {applicationData.name}. Our
            admissions team will review your application within 24 hours.
          </p>

          {/* Reference Number */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="mb-6 p-4 rounded-xl bg-gradient-to-r from-purple-50 to-amber-50 dark:from-purple-950/30 dark:to-amber-950/30 border border-purple-200 dark:border-purple-800"
          >
            <p className="text-[10px] font-black uppercase tracking-wider text-muted-foreground mb-1">
              Application Reference Number
            </p>
            <div className="flex items-center justify-center gap-2">
              <p className="text-lg sm:text-xl font-black text-purple-600 font-mono">
                {applicationData.reference}
              </p>
              <button
                onClick={copyReferenceNumber}
                className="p-1.5 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/50 transition-colors"
                title="Copy reference number"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-green-500" />
                ) : (
                  <Copy className="w-4 h-4 text-purple-600" />
                )}
              </button>
            </div>
            <p className="text-[8px] text-muted-foreground mt-1">
              Save this number for future reference
            </p>
          </motion.div>

          {/* Estimated Response Timer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.27 }}
            className="mb-6 sm:mb-8 p-3 sm:p-4 rounded-lg bg-muted/30 border border-border"
          >
            <div className="flex items-center justify-center gap-2 text-xs sm:text-sm mb-2">
              <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-600" />
              <span className="font-black">Estimated Response In:</span>
            </div>
            <div className="flex justify-center gap-3 sm:gap-4">
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-black text-purple-600">
                  {timeRemaining.hours}
                </div>
                <div className="text-[8px] sm:text-[9px] font-black uppercase tracking-wider text-muted-foreground">
                  Hours
                </div>
              </div>
              <div className="text-xl sm:text-2xl font-black text-purple-600">
                :
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-black text-purple-600">
                  {timeRemaining.minutes.toString().padStart(2, "0")}
                </div>
                <div className="text-[8px] sm:text-[9px] font-black uppercase tracking-wider text-muted-foreground">
                  Minutes
                </div>
              </div>
              <div className="text-xl sm:text-2xl font-black text-purple-600">
                :
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-black text-purple-600">
                  {timeRemaining.seconds.toString().padStart(2, "0")}
                </div>
                <div className="text-[8px] sm:text-[9px] font-black uppercase tracking-wider text-muted-foreground">
                  Seconds
                </div>
              </div>
            </div>
          </motion.div>

          {/* Next Steps Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="p-5 sm:p-6 md:p-7 rounded-xl bg-gradient-to-br from-purple-50/50 to-amber-50/50 dark:from-purple-950/30 dark:to-amber-950/30 border border-purple-200 dark:border-purple-800 mb-6 sm:mb-8 text-left"
          >
            <h3 className="font-black text-sm sm:text-base mb-4 flex items-center gap-2">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500" />
              <span className="bg-gradient-to-r from-purple-600 to-amber-600 bg-clip-text text-transparent">
                What Happens Next?
              </span>
            </h3>

            {/* Progress Tracker */}
            <div className="mb-4">
              <div className="flex justify-between mb-1">
                <span className="text-[8px] sm:text-[9px] font-black uppercase tracking-wider text-purple-600">
                  Application Progress
                </span>
                <span className="text-[8px] sm:text-[9px] font-black text-muted-foreground">
                  25% Complete
                </span>
              </div>
              <div className="h-1.5 bg-purple-100 dark:bg-purple-900/30 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "25%" }}
                  transition={{ delay: 0.5, duration: 1 }}
                  className="h-full bg-gradient-to-r from-purple-600 to-amber-500 rounded-full"
                />
              </div>
            </div>

            <div className="space-y-3 sm:space-y-4">
              {[
                {
                  icon: Mail,
                  text: "Check your email for application confirmation",
                  color: "purple",
                },
                {
                  icon: Clock,
                  text: "Our team will contact you within 24-48 hours",
                  color: "amber",
                },
                {
                  icon: Calendar,
                  text: "You'll be invited for a free assessment session",
                  color: "purple",
                },
                {
                  icon: Users,
                  text: "Receive teacher matching and enrollment details",
                  color: "amber",
                },
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className="flex gap-3 sm:gap-4 items-start group"
                  >
                    <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gradient-to-r from-purple-600 to-purple-700 text-white flex items-center justify-center text-[10px] sm:text-xs font-black shrink-0 mt-0.5 shadow-md group-hover:scale-110 transition-transform">
                      {idx + 1}
                    </div>
                    <div className="flex items-start gap-2 flex-1">
                      <Icon
                        className={`w-3.5 h-3.5 sm:w-4 sm:h-4 text-${item.color === "purple" ? "purple-600" : "amber-500"} shrink-0 mt-0.5`}
                      />
                      <p className="text-xs sm:text-sm text-foreground leading-relaxed">
                        {item.text}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="grid grid-cols-2 gap-3 mb-6 sm:mb-8"
          >
            <button
              onClick={downloadApplicationSummary}
              className="flex items-center justify-center gap-2 px-3 py-2 rounded-lg border border-purple-200 dark:border-purple-800 text-purple-600 font-black text-xs hover:bg-purple-50 transition-all"
            >
              <Download className="w-3.5 h-3.5" />
              Download Summary
            </button>
            <button
              onClick={addToCalendar}
              className="flex items-center justify-center gap-2 px-3 py-2 rounded-lg border border-amber-200 dark:border-amber-800 text-amber-600 font-black text-xs hover:bg-amber-50 transition-all"
            >
              <Calendar className="w-3.5 h-3.5" />
              Add to Calendar
            </button>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-3 sm:space-y-4"
          >
            <p className="text-xs sm:text-sm text-muted-foreground">
              Have questions? Contact us directly:
            </p>
            <div className="flex flex-col xs:flex-row gap-2 sm:gap-3 justify-center">
              <a
                href="mailto:info.almaysaroh@gmail.com"
                className="inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-full bg-purple-50 dark:bg-purple-950/30 text-purple-600 font-black text-xs sm:text-sm hover:bg-purple-100 transition-all"
              >
                <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                info.almaysaroh@gmail.com
              </a>
              <a
                href="tel:+2349110163930"
                className="inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-full bg-amber-50 dark:bg-amber-950/30 text-amber-600 font-black text-xs sm:text-sm hover:bg-amber-100 transition-all"
              >
                <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                +234 911 016 3930
              </a>
              <a
                href="https://wa.me/2349110163930"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-full bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 font-black text-xs sm:text-sm hover:bg-emerald-100 transition-all"
              >
                <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                WhatsApp
              </a>
            </div>
          </motion.div>

          {/* Social Media Follow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="mt-6 pt-4 border-t border-border/30"
          >
            <p className="text-[10px] font-black uppercase tracking-wider text-muted-foreground mb-3">
              Follow us for updates
            </p>
            <div className="flex justify-center gap-3">
              {[
                {
                  icon: Instagram,
                  url: "https://instagram.com",
                  label: "Instagram",
                  color: "hover:text-pink-600",
                },
                {
                  icon: Facebook,
                  url: "https://facebook.com",
                  label: "Facebook",
                  color: "hover:text-blue-600",
                },
                {
                  icon: Twitter,
                  url: "https://twitter.com",
                  label: "Twitter",
                  color: "hover:text-sky-500",
                },
                {
                  icon: Youtube,
                  url: "https://youtube.com",
                  label: "YouTube",
                  color: "hover:text-red-600",
                },
              ].map((social, i) => {
                const Icon = social.icon;
                return (
                  <a
                    key={i}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-2 rounded-full bg-muted/30 hover:bg-muted/50 transition-all ${social.color}`}
                    aria-label={social.label}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-6 pt-4 border-t border-border/30"
          >
            <p className="text-[10px] font-black uppercase tracking-wider text-muted-foreground mb-3">
              Quick Links
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/faq"
                className="inline-flex items-center gap-1 text-[10px] font-black text-purple-600 hover:underline"
              >
                FAQ <ChevronRight className="w-3 h-3" />
              </Link>
              <Link
                href="/courses"
                className="inline-flex items-center gap-1 text-[10px] font-black text-purple-600 hover:underline"
              >
                Explore Courses
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-1 text-[10px] font-black text-purple-600 hover:underline"
              >
                Contact Support <Send className="w-3 h-3" />
              </Link>
            </div>
          </motion.div>

          {/* Divider */}
          <div className="relative my-6 sm:my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border/50"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-3 bg-background text-muted-foreground">
                or
              </span>
            </div>
          </div>

          {/* Return Home Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
          >
            <Link href="/">
              <Button
                variant="outline"
                className="rounded-full px-6 sm:px-8 py-2.5 sm:py-3 font-black text-sm border-purple-300 text-purple-600 hover:bg-purple-50 transition-all group"
              >
                <Home className="w-3.5 h-3.5 mr-1.5 group-hover:scale-110 transition-transform" />
                Return to Home
                <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>

          {/* Share Your Journey */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-border/30"
          >
            <p className="text-[10px] sm:text-xs text-muted-foreground">
              ✨ Share your excitement with family and friends ✨
            </p>
            <div className="flex justify-center gap-2 mt-2">
              {[
                {
                  name: "Twitter",
                  icon: "🐦",
                  url: "https://twitter.com/intent/tweet?text=I%27ve%20just%20applied%20to%20Al-Maysaroh%20to%20study%20the%20Quran!",
                },
                {
                  name: "Facebook",
                  icon: "📘",
                  url: "https://www.facebook.com/sharer/sharer.php?u=almaysaroh.org",
                },
                {
                  name: "WhatsApp",
                  icon: "💬",
                  url: "https://wa.me/?text=I%27ve%20just%20applied%20to%20Al-Maysaroh%20to%20study%20the%20Quran!",
                },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xl hover:scale-110 transition-transform"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Email Reminder */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.65 }}
            className="mt-4"
          >
            <p className="text-[8px] text-muted-foreground flex items-center justify-center gap-1">
              <Mail className="w-2.5 h-2.5" />
             {` Didn't receive confirmation email? Check your spam folder`}
            </p>
          </motion.div>

          {/* Security Notice */}
          <div className="mt-4">
            <p className="text-[8px] text-muted-foreground flex items-center justify-center gap-1">
              <Shield className="w-2.5 h-2.5" />
              This is a secured page. Your information is protected.
            </p>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
