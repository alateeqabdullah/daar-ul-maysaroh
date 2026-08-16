// app/(marketing)/physical/components/shared/WhatsAppButton.tsx
"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import Link from "next/link";

export function WhatsAppButton() {
  const phoneNumber = "2349110163930";
  const message =
    "Hello! I'm interested in learning more about Al-Maysaroh Institute.";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1 }}
      className="fixed bottom-6 right-6 z-50"
    >
      <Link
        href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-emerald-500 rounded-full blur-lg animate-pulse opacity-75" />
          <div className="relative w-14 h-14 md:w-16 md:h-16 rounded-full bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/40 hover:shadow-emerald-500/60 transition-all duration-300">
            <MessageCircle className="w-7 h-7 md:w-8 md:h-8 text-white" />
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}
