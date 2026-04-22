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
} from "lucide-react";

export default function AdmissionsSuccessPage() {
  return (
    <main className="pt-32 pb-20 bg-background min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-4 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="institutional-card p-8 sm:p-12 text-center"
        >
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-accent/10 flex items-center justify-center">
            <CheckCircle2 className="w-12 h-12 text-accent" />
          </div>

          <h1 className="text-3xl sm:text-4xl font-black mb-4">
            Application Submitted! 🎉
          </h1>

          <p className="text-muted-foreground mb-6">
            Thank you for applying to Al-Maysaroh. Our admissions team will
            review your application within 24 hours.
          </p>

          <div className="p-6 rounded-xl bg-primary-50/50 dark:bg-primary-950/30 mb-8 text-left">
            <h3 className="font-black text-sm mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary-700" />
              Next Steps
            </h3>
            <div className="space-y-4">
              {[
                "Check your email for application confirmation",
                "Our team will contact you within 24-48 hours",
                "You'll be invited for a free assessment session",
                "Receive teacher matching and enrollment details",
              ].map((text, idx) => (
                <div key={idx} className="flex gap-3 items-start">
                  <div className="w-6 h-6 rounded-full bg-primary-700 text-white flex items-center justify-center text-xs font-black shrink-0 mt-0.5">
                    {idx + 1}
                  </div>
                  <p className="text-sm">{text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Have questions? Contact us directly:
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="mailto:admissions@almaysaroh.org"
                className="inline-flex items-center justify-center gap-2 text-sm text-primary-700 font-black"
              >
                <Mail className="w-4 h-4" />
                admissions@almaysaroh.org
              </a>
              <a
                href="tel:+2349110163930"
                className="inline-flex items-center justify-center gap-2 text-sm text-primary-700 font-black"
              >
                <Phone className="w-4 h-4" />
                +234 911 016 3930
              </a>
              <a
                href="https://wa.me/2349110163930"
                className="inline-flex items-center justify-center gap-2 text-sm text-primary-700 font-black"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp
              </a>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-border/50">
            <Link href="/">
              <Button variant="outline" className="rounded-full px-8">
                Return to Home
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
