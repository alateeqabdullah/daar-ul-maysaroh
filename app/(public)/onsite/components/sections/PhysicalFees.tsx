// app/(marketing)/physical/components/sections/PhysicalFees.tsx
"use client";

import { motion } from "framer-motion";
import {
  DollarSign,
  Wallet,
  CreditCard,
  Banknote,
  Calendar,
  Users,
} from "lucide-react";

const FEE_STRUCTURE = {
  admission: {
    title: "Admission Fee",
    amount: "₦50,000",
    description: "One-time fee upon enrollment",
  },
  programs: [
    {
      title: "Tahfeedh",
      monthly: "₦100,000",
      termly: "₦250,000",
      description: "Full Quran memorization program",
    },
    {
      title: "Muraja'ah",
      monthly: "₦80,000",
      termly: "₦200,000",
      description: "Quran revision program",
    },
    {
      title: "Tajweed",
      monthly: "₦70,000",
      termly: "₦180,000",
      description: "Recitation improvement",
    },
    {
      title: "General Madrasah",
      monthly: "₦60,000",
      termly: "₦150,000",
      description: "Islamic studies program",
    },
  ],
  boarding: {
    title: "Boarding Package",
    monthly: "₦200,000",
    termly: "₦500,000",
    includes: [
      "Accommodation",
      "Feeding (Breakfast & Dinner)",
      "Supervision",
      "Structured Daily Routine",
      "Welfare & Care",
    ],
  },
  paymentOptions: [
    "Monthly installments",
    "Termly payments (discount available)",
    "Bank transfer",
    "Cash payment",
    "Payment plan available upon request",
  ],
};

export function PhysicalFees() {
  return (
    <section className="py-12 md:py-20 bg-gradient-to-b from-background via-emerald-50/5 to-amber-50/5">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 mb-4">
            <DollarSign className="w-4 h-4 text-emerald-600" />
            <span className="text-xs font-black uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
              Fees & Payment
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-4">
            Transparent <span className="text-emerald-600">Fee</span> Structure
          </h2>
          <p className="text-lg text-muted-foreground">
            Clear and affordable pricing for quality Quranic education
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* Admission Fee */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-card p-6 md:p-8 rounded-2xl border border-emerald-200 dark:border-emerald-800"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-black">
                  {FEE_STRUCTURE.admission.title}
                </h3>
                <p className="text-muted-foreground">
                  {FEE_STRUCTURE.admission.description}
                </p>
              </div>
              <div className="text-2xl md:text-3xl font-black text-emerald-600">
                {FEE_STRUCTURE.admission.amount}
              </div>
            </div>
          </motion.div>

          {/* Program Fees */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h3 className="text-xl font-black text-center">Program Fees</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {FEE_STRUCTURE.programs.map((program, index) => (
                <div
                  key={index}
                  className="bg-card p-6 rounded-xl border border-border hover:border-emerald-300 transition"
                >
                  <h4 className="font-black text-lg">{program.title}</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    {program.description}
                  </p>
                  <div className="flex flex-col gap-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Monthly:</span>
                      <span className="font-black text-emerald-600">
                        {program.monthly}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Termly:</span>
                      <span className="font-black">{program.termly}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Boarding Fee */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-emerald-600/10 to-amber-500/10 p-6 md:p-8 rounded-2xl border border-emerald-200 dark:border-emerald-800"
          >
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
              <div>
                <h3 className="text-xl font-black">
                  {FEE_STRUCTURE.boarding.title}
                </h3>
                <ul className="space-y-1 mt-2">
                  {FEE_STRUCTURE.boarding.includes.map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="text-right shrink-0">
                <div className="text-2xl md:text-3xl font-black text-emerald-600">
                  {FEE_STRUCTURE.boarding.monthly}
                </div>
                <div className="text-sm text-muted-foreground">/ monthly</div>
                <div className="text-sm font-medium mt-1">
                  Termly: {FEE_STRUCTURE.boarding.termly}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Payment Options */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-card p-6 md:p-8 rounded-2xl border border-border"
          >
            <h3 className="text-xl font-black mb-4 flex items-center gap-2">
              <Wallet className="w-5 h-5 text-emerald-600" />
              Payment Options
            </h3>
            <ul className="grid sm:grid-cols-2 gap-3">
              {FEE_STRUCTURE.paymentOptions.map((option, i) => (
                <li key={i} className="flex items-center gap-2 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                  {option}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
