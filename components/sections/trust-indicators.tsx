"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Landmark, Award, ScrollText } from "lucide-react";

const TRUST_SEALS = [
  {
    icon: ShieldCheck,
    label: "Ijazah Authenticated",
    sub: "Verified Sanad Chains",
  },
  {
    icon: Landmark,
    label: "Global Council",
    sub: "Al-Azhar Affiliated Faculty",
  },
  { icon: Award, label: "Premium Pedagogy", sub: "1-on-1 Academic Focus" },
  {
    icon: ScrollText,
    label: "Traditional Science",
    sub: "Classical Tajweed Poem Study",
  },
];

export function TrustIndicators() {
  return (
    <section className="py-12 border-y border-border/50 bg-muted/20 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {TRUST_SEALS.map((seal, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center gap-4 group"
            >
              <div className="w-12 h-12 rounded-xl bg-background border flex items-center justify-center shadow-sm group-hover:border-primary-700 transition-colors">
                <seal.icon className="w-6 h-6 text-primary-700" />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary-700">
                  {seal.label}
                </p>
                <p className="text-xs font-bold text-muted-foreground opacity-60 uppercase">
                  {seal.sub}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
