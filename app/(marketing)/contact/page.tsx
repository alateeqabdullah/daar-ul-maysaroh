"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  MessageCircle,
  Send,
  Clock,
  Landmark,
  ChevronRight,
  Laptop,
  GraduationCap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/shared/section-animation";
import { cn } from "@/lib/utils";

const DEPARTMENTS = [
  {
    id: "admissions",
    name: "Admissions Council",
    email: "admissions@al-maysaroh.com",
    desc: "For new student assessments, scholar matching, and Ijazah track inquiries.",
    icon: GraduationCap,
  },
  {
    id: "bursar",
    name: "Financial Bursar",
    email: "bursar@al-maysaroh.com",
    desc: "For manual bank transfers, receipt verification, and scholarship grants.",
    icon: Landmark,
  },
  {
    id: "academic",
    name: "Academic Support",
    email: "registrar@al-maysaroh.com",
    desc: "For existing students requiring schedule changes or teacher transitions.",
    icon: BookOpen,
  },
  {
    id: "tech",
    name: "Technical Desk",
    email: "systems@al-maysaroh.com",
    desc: "For portal access issues, mobile app feedback, and classroom connectivity.",
    icon: Laptop,
  },
];

export default function ContactHub() {
  const [isOfficeOpen, setIsOfficeOpen] = useState(false);
  const [selectedDept, setSelectedDept] = useState("admissions");

  // Real-world: Check if Doha Office (UTC+3) is open (8 AM - 6 PM)
  useEffect(() => {
    const checkStatus = () => {
      const d = new Date();
      const utc = d.getTime() + d.getTimezoneOffset() * 60000;
      const dohaTime = new Date(utc + 3600000 * 3);
      const hours = dohaTime.getHours();
      setIsOfficeOpen(hours >= 8 && hours < 18);
    };
    checkStatus();
    const timer = setInterval(checkStatus, 60000);
    return () => clearInterval(timer);
  }, []);

  return (
    <main className="pt-40 pb-20 bg-background relative overflow-hidden">
      <div className="container mx-auto px-6">
        {/* --- SECTION 1: HUB HEADER --- */}
        <div className="grid lg:grid-cols-2 gap-20 items-end mb-24">
          <Reveal>
            <div className="space-y-8">
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full glass-academic border-primary-200/50 text-primary-700 text-[10px] font-black uppercase tracking-[0.2em] shadow-xl">
                <span
                  className={cn(
                    "w-2 h-2 rounded-full animate-pulse",
                    isOfficeOpen ? "bg-accent" : "bg-red-500",
                  )}
                />
                Office Status:{" "}
                {isOfficeOpen ? "Digital Campus Open" : "Closed (After Hours)"}
              </div>
              <h1 className="text-7xl lg:text-9xl font-black tracking-tighter font-heading leading-[0.85]">
                Global <br />
                <span className="text-primary-700 italic">Consulate.</span>
              </h1>
              <p className="text-2xl text-muted-foreground font-medium leading-relaxed max-w-xl">
                Connect with our administrative and scholarly council. We
                provide specialized support across four major departments.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="grid grid-cols-2 gap-6">
              <div className="p-8 rounded-[2.5rem] bg-muted/30 border space-y-4">
                <Clock className="w-6 h-6 text-primary-700" />
                <p className="text-[10px] font-black uppercase tracking-widest opacity-40">
                  Standard Hours
                </p>
                <p className="text-sm font-bold">08:00 — 18:00 (UTC+3)</p>
                <p className="text-[10px] font-medium opacity-60">
                  Serving students in 50+ timezones.
                </p>
              </div>
              <div className="p-8 rounded-[2.5rem] bg-muted/30 border space-y-4">
                <MessageCircle className="w-6 h-6 text-accent" />
                <p className="text-[10px] font-black uppercase tracking-widest opacity-40">
                  Urgent Support
                </p>
                <p className="text-sm font-bold">WhatsApp: +44 700 000 0000</p>
                <p className="text-[10px] font-medium opacity-60">
                  Avg response: 2 hours.
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        {/* --- SECTION 2: DEPARTMENTAL TRIAGE --- */}
        <div className="grid lg:grid-cols-12 gap-16 items-start">
          <div className="lg:col-span-5 space-y-4">
            <h3 className="text-xl font-black uppercase tracking-widest mb-8 ml-2 opacity-40">
              Select Department
            </h3>
            {DEPARTMENTS.map((dept) => (
              <button
                key={dept.id}
                onClick={() => setSelectedDept(dept.id)}
                className={cn(
                  "w-full p-8 rounded-[2rem] border-2 transition-all duration-500 text-left group flex items-center justify-between",
                  selectedDept === dept.id
                    ? "glass-academic border-primary-700 shadow-2xl scale-[1.02]"
                    : "hover:border-primary-700/30",
                )}
              >
                <div className="flex items-center gap-6">
                  <div
                    className={cn(
                      "w-12 h-12 rounded-xl flex items-center justify-center transition-colors",
                      selectedDept === dept.id
                        ? "bg-primary-700 text-white"
                        : "bg-muted text-muted-foreground group-hover:bg-primary-50",
                    )}
                  >
                    <dept.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-black text-sm uppercase tracking-tight">
                      {dept.name}
                    </p>
                    <p className="text-xs font-medium text-muted-foreground mt-1 line-clamp-1">
                      {dept.email}
                    </p>
                  </div>
                </div>
                <ChevronRight
                  className={cn(
                    "w-5 h-5 transition-transform",
                    selectedDept === dept.id
                      ? "translate-x-0 opacity-100"
                      : "-translate-x-4 opacity-0",
                  )}
                />
              </button>
            ))}
          </div>

          {/* --- SECTION 3: INTELLIGENT INQUIRY FORM --- */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedDept}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="glass-academic p-10 lg:p-16 rounded-[4rem] border shadow-3xl space-y-12 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-12 opacity-5">
                  {/* Background Large Icon */}
                  {(() => {
                    const Icon =
                      DEPARTMENTS.find((d) => d.id === selectedDept)?.icon ||
                      Mail;
                    return <Icon className="w-40 h-40" />;
                  })()}
                </div>

                <div className="space-y-2">
                  <h2 className="text-4xl font-black uppercase tracking-tighter">
                    Message to{" "}
                    <span className="text-primary-700">
                      {DEPARTMENTS.find((d) => d.id === selectedDept)?.name}
                    </span>
                  </h2>
                  <p className="text-muted-foreground font-medium max-w-md">
                    {DEPARTMENTS.find((d) => d.id === selectedDept)?.desc}
                  </p>
                </div>

                <form className="grid gap-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest ml-1 opacity-60">
                        Full Legal Name
                      </label>
                      <input className="w-full h-14 px-6 rounded-2xl bg-background border-2 border-transparent focus:border-primary-700/30 outline-none font-bold text-sm transition-all" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest ml-1 opacity-60">
                        Student ID (If Applicable)
                      </label>
                      <input
                        placeholder="AM-XXXX"
                        className="w-full h-14 px-6 rounded-2xl bg-background border-2 border-transparent focus:border-primary-700/30 outline-none font-bold text-sm transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest ml-1 opacity-60">
                      Inquiry Subject
                    </label>
                    <input className="w-full h-14 px-6 rounded-2xl bg-background border-2 border-transparent focus:border-primary-700/30 outline-none font-bold text-sm transition-all" />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest ml-1 opacity-60">
                      Detailed Transcription
                    </label>
                    <textarea
                      rows={5}
                      className="w-full p-6 rounded-2xl bg-background border-2 border-transparent focus:border-primary-700/30 outline-none font-medium text-sm transition-all"
                    />
                  </div>

                  <Button className="w-full h-20 rounded-[2rem] bg-primary-700 text-white font-black text-xs tracking-[0.3em] uppercase shadow-2xl relative overflow-hidden group">
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      TRANSMIT INQUIRY <Send className="w-4 h-4" />
                    </span>
                    <div className="absolute inset-0 bg-white/10 -translate-x-full group-hover:animate-shimmer" />
                  </Button>
                </form>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </main>
  );
}

// Re-using simplified Icon for readability
function BookOpen(props: any) {
  return (
    <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
      />
    </svg>
  );
}
