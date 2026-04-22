// app/admissions/success/page.tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
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
} from "lucide-react";

export default function AdmissionsSuccessPage() {
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
            Thank you for applying to Al-Maysaroh. Our admissions team will
            review your application within 24 hours.
          </p>

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

          {/* Estimated Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-6 sm:mb-8 p-3 sm:p-4 rounded-lg bg-muted/30 border border-border"
          >
            <div className="flex items-center justify-center gap-2 text-xs sm:text-sm">
              <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-600" />
              <span className="font-black">Estimated Timeline:</span>
              <span className="text-muted-foreground">
                24-48 hours for initial contact
              </span>
            </div>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="space-y-3 sm:space-y-4"
          >
            <p className="text-xs sm:text-sm text-muted-foreground">
              Have questions? Contact us directly:
            </p>
            <div className="flex flex-col xs:flex-row gap-2 sm:gap-3 justify-center">
              <a
                href="mailto:admissions@almaysaroh.org"
                className="inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-full bg-purple-50 dark:bg-purple-950/30 text-purple-600 font-black text-xs sm:text-sm hover:bg-purple-100 dark:hover:bg-purple-950/50 transition-all duration-300"
              >
                <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                admissions@almaysaroh.org
              </a>
              <a
                href="tel:+2349110163930"
                className="inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-full bg-amber-50 dark:bg-amber-950/30 text-amber-600 font-black text-xs sm:text-sm hover:bg-amber-100 dark:hover:bg-amber-950/50 transition-all duration-300"
              >
                <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                +234 911 016 3930
              </a>
              <a
                href="https://wa.me/2349110163930"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-full bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 font-black text-xs sm:text-sm hover:bg-emerald-100 dark:hover:bg-emerald-950/50 transition-all duration-300"
              >
                <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                WhatsApp
              </a>
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
            transition={{ delay: 0.6 }}
          >
            <Link href="/">
              <Button
                variant="outline"
                className="rounded-full px-6 sm:px-8 py-2.5 sm:py-3 font-black text-sm border-purple-300 text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-950/20 transition-all duration-300 group"
              >
                <Home className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 group-hover:scale-110 transition-transform" />
                Return to Home
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-1.5 sm:ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>

          {/* Share Your Journey - Optional */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
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
                  url: "https://twitter.com/intent/tweet?text=I%27ve%20just%20applied%20to%20Al-Maysaroh%20to%20study%20the%20Quran!%20Excited%20to%20begin%20this%20journey%20%F0%9F%93%96%F0%9F%8C%99",
                },
                {
                  name: "Facebook",
                  icon: "📘",
                  url: "https://www.facebook.com/sharer/sharer.php?u=almaysaroh.org",
                },
                {
                  name: "WhatsApp",
                  icon: "💬",
                  url: "https://wa.me/?text=I%27ve%20just%20applied%20to%20Al-Maysaroh%20to%20study%20the%20Quran!%20Excited%20to%20begin%20this%20journey%20%F0%9F%93%96%F0%9F%8C%99",
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
        </motion.div>
      </div>
    </main>
  );
}
