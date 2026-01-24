"use client";

import { useState } from "react";
import { Reveal } from "@/components/shared/section-animation";
import {
  ShieldAlert,
  Scale,
  Lock,
  RefreshCw,
  FileText,
  CheckCircle2,
  Landmark,
  Clock,
} from "lucide-react";
import { cn } from "@/lib/utils";

const LEGAL_SECTIONS = [
  {
    id: "academic",
    title: "Academic Integrity & Sanad",
    icon: Scale,
    content: `Participation in Al-Maysaroh programs is a commitment to sacred knowledge. 
    1.1 The issuance of an Ijazah (Certificate of Sanad) is not guaranteed by payment but by the exclusive scholarly discretion of the assigned teacher. 
    1.2 Academic dishonesty, including the use of AI for recitation or faking hifz progress, will result in immediate expulsion without refund. 
    1.3 Students must maintain Adab (Islamic Etiquette) toward their scholars at all times.`,
  },
  {
    id: "financial",
    title: "Tuition & Financial Policy",
    icon: Landmark,
    content: `2.1 Tuition is settled in advance of the academic month. 
    2.2 For manual transfers (Bank/Mobile Money), students must provide proof of payment via the bursar portal. Portal activation occurs only after the Bursar verifies receipt of funds. 
    2.3 Refund Policy: We offer a 14-day Satisfaction Guarantee for new enrollments. After 14 days, tuition is non-refundable but can be credited toward future sessions.`,
  },
  {
    id: "attendance",
    title: "Attendance & Rescheduling",
    icon: Clock,
    content: `3.1 Rescheduling requires a minimum of 24 hours' notice. 
    3.2 Sessions missed without 24-hour notice are forfeited and non-refundable. 
    3.3 If a scholar misses a session, a makeup class will be scheduled at the student's earliest convenience.`,
  },
  {
    id: "privacy",
    title: "Data & Audio Privacy",
    icon: Lock,
    content: `4.1 Audio and video of recitations are recorded solely for scholarly review and progress tracking. 
    4.2 Al-Maysaroh adheres to GDPR standards. Student data is encrypted and never sold or shared with third parties. 
    4.3 By enrolling, parents of minor students consent to the educational recording of sessions.`,
  },
];

export default function LegalHub() {
  const [activeTab, setActiveTab] = useState("academic");

  return (
    <main className="pt-40 pb-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-16">
          {/* Sidebar Nav */}
          <div className="lg:col-span-4 space-y-10">
            <Reveal>
              <h1 className="text-6xl font-black tracking-tighter font-heading leading-tight mb-8">
                Institutional <br />
                <span className="text-primary-700 italic">Governance.</span>
              </h1>
              <p className="text-muted-foreground font-medium border-l-4 border-primary-700 pl-6">
                The legal and ethical framework governing the Al-Maysaroh
                International Institute.
              </p>
            </Reveal>

            <div className="flex flex-col gap-3">
              {LEGAL_SECTIONS.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveTab(section.id)}
                  className={cn(
                    "p-6 rounded-2xl border-2 transition-all duration-500 text-left flex items-center gap-4 group",
                    activeTab === section.id
                      ? "glass-academic border-primary-700 text-primary-700 shadow-xl"
                      : "hover:border-primary-700/20 opacity-60",
                  )}
                >
                  <section.icon className="w-6 h-6" />
                  <span className="font-black uppercase text-xs tracking-widest">
                    {section.title}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Main Legal Content */}
          <div className="lg:col-span-8">
            <Reveal key={activeTab}>
              <div className="glass-academic p-10 lg:p-20 rounded-[4rem] border shadow-2xl min-h-[600px] relative overflow-hidden">
                <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                  <ShieldAlert className="w-64 h-64" />
                </div>

                <div className="space-y-12 relative z-10">
                  <h2 className="text-4xl font-black uppercase tracking-tighter border-b pb-8">
                    {LEGAL_SECTIONS.find((s) => s.id === activeTab)?.title}
                  </h2>

                  <div className="space-y-8">
                    {LEGAL_SECTIONS.find((s) => s.id === activeTab)
                      ?.content.split("\n")
                      .map((line, i) => (
                        <div key={i} className="flex gap-6 items-start">
                          <CheckCircle2 className="w-6 h-6 text-primary-700 shrink-0 mt-1" />
                          <p className="text-xl text-muted-foreground font-medium leading-relaxed">
                            {line.trim()}
                          </p>
                        </div>
                      ))}
                  </div>

                  <div className="pt-12 border-t mt-20">
                    <p className="text-[10px] font-black uppercase tracking-widest opacity-40">
                      Last Revision: January 2026
                    </p>
                    <p className="text-xs font-bold mt-2">
                      Authenticated by the Scholarly Council Office.
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </main>
  );
}
