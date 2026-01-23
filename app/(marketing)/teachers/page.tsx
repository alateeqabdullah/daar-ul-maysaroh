"use client";

import { motion } from "framer-motion";
import {
  Award,
  BookOpen,
  GraduationCap,
  ShieldCheck,
  CheckCircle,
  Verified,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const departments = [
  {
    name: "Department of Hifz & Qira'at",
    head: "Sheikh Dr. Ahmad Al-Maysari",
    description:
      "Focusing on the preservation of the Quranic text with precise articulation (Itqan).",
    faculty: [
      {
        name: "Sheikh Dr. Ahmad Al-Maysari",
        rank: "Senior Scholar & Dean",
        credentials: [
          "PhD in Quranic Sciences (Al-Azhar)",
          "Ijazah in 10 Qira'at",
          "30+ Years Experience",
        ],
        specialty: "Advanced Hifz & Mutashabihat",
        availability: "Mon, Wed, Fri",
        philosophy:
          "Memorization is not just in the mind, but the cultivation of the heart.",
      },
      {
        name: "Ustadha Fatima Zahra",
        rank: "Head of Female Hifz",
        credentials: [
          "Ijazah in Hafs 'an 'Asim",
          "Master's in Islamic Studies",
          "Verified Sanad Holder",
        ],
        specialty: "Children & Adult Female Hifz",
        availability: "Tue, Thu, Sat",
        philosophy:
          "Nurturing a love for the Quran through patience and consistency.",
      },
    ],
  },
  {
    name: "Department of Tajweed & Phonetics",
    head: "Sheikh Omar Al-Farooq",
    description: "The scientific application of Quranic pronunciation rules.",
    faculty: [
      {
        name: "Sheikh Omar Al-Farooq",
        rank: "Lead Tajweed Instructor",
        credentials: [
          "Expert in Al-Jazariyyah Poem",
          "Certification in Arabic Phonetics",
        ],
        specialty: "Makharij & Sifaat Correction",
        availability: "Daily",
        philosophy:
          "Recitation is an art that requires precision and spiritual presence.",
      },
    ],
  },
];

export default function FacultyPage() {
  return (
    <main className="pt-40 pb-20 bg-background">
      <div className="container mx-auto px-6">
        {/* Header Section */}
        <div className="max-w-4xl mb-24">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-3 text-primary-700 font-black text-xs uppercase tracking-[0.3em] mb-6"
          >
            <Verified className="w-5 h-5" /> Verified Scholarly Council
          </motion.div>
          <h1 className="text-7xl lg:text-9xl font-black tracking-tighter font-heading leading-tight mb-8">
            The Noble <br />
            <span className="text-primary-700 italic">Faculty.</span>
          </h1>
          <p className="text-2xl text-muted-foreground font-medium leading-relaxed border-l-4 border-primary-700 pl-8">
            Our teachers are not mere employees; they are part of a continuous
            chain of narration (Sanad) dating back to the Prophet (ﷺ). Every
            instructor undergoes a rigorous vetting process by our Scholarly
            Council.
          </p>
        </div>

        {/* Departments Grid */}
        <div className="space-y-32">
          {departments.map((dept, idx) => (
            <section key={dept.name} className="space-y-12">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border pb-8">
                <div className="max-w-2xl space-y-2">
                  <h2 className="text-4xl font-black uppercase tracking-tighter">
                    {dept.name}
                  </h2>
                  <p className="text-muted-foreground font-medium">
                    {dept.description}
                  </p>
                </div>
                <div className="text-xs font-black uppercase tracking-widest bg-muted px-4 py-2 rounded-lg">
                  Dept Head: {dept.head}
                </div>
              </div>

              <div className="grid lg:grid-cols-2 gap-10">
                {dept.faculty.map((teacher, tIdx) => (
                  <motion.div
                    whileHover={{ y: -10 }}
                    key={teacher.name}
                    className="institutional-card p-10 flex flex-col gap-8"
                  >
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <h3 className="text-3xl font-black">{teacher.name}</h3>
                        <p className="text-primary-700 font-bold text-xs uppercase tracking-widest">
                          {teacher.rank}
                        </p>
                      </div>
                      <div className="w-16 h-16 bg-primary-50 dark:bg-primary-950/40 rounded-2xl flex items-center justify-center">
                        <GraduationCap className="text-primary-700 w-8 h-8" />
                      </div>
                    </div>

                    <div className="space-y-6 flex-grow">
                      <div>
                        <p className="text-[10px] font-black uppercase opacity-40 mb-3 tracking-[0.2em]">
                          Verified Credentials
                        </p>
                        <ul className="grid grid-cols-1 gap-2">
                          {teacher.credentials.map((c) => (
                            <li
                              key={c}
                              className="flex items-center gap-2 text-sm font-bold"
                            >
                              <CheckCircle className="w-4 h-4 text-accent" />{" "}
                              {c}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="p-6 bg-muted/30 rounded-2xl italic text-sm font-medium text-muted-foreground">
                       {` "${teacher.philosophy}"`}
                      </div>
                    </div>

                    <div className="pt-8 border-t flex items-center justify-between text-[10px] font-black uppercase tracking-widest">
                      <span className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-primary-700" />{" "}
                        {teacher.availability}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="font-black text-[10px]"
                      >
                        View Profile
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
