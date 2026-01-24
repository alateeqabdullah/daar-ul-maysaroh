import { prisma } from "@/lib/prisma";
import { Reveal } from "@/components/shared/section-animation";
import { GraduationCap, Landmark } from "lucide-react";
import { CourseListClient } from "@/components/public/courses/course-list-client";

const MOCK_DATA = [
  {
    id: "mock-hifz",
    name: "Hifz Itqan Program",
    description:
      "The preservation of the Word with absolute precision. Focusing on Mutashabihat mastery and Sanad preparation.",
    basePrice: 149,
    category: "QURAN",
    features: ["1-on-1 Sessions", "Digital Tracking", "Weekly Revision"],
    isMock: true,
  },
  {
    id: "mock-tajweed",
    name: "Phonetic Mastery",
    description:
      "A scientific study of Tajweed based on the classical poem of Al-Jazariyyah. From Makharij to Sifaat.",
    basePrice: 89,
    category: "TAJWEED",
    features: ["Recitation Exam", "Practical Drill", "Theory PDF"],
    isMock: true,
  },
  {
    id: "mock-arabic",
    name: "Quranic Linguistics",
    description:
      "Unlock the linguistic miracles of the Quran by studying Classical Arabic grammar and morphology.",
    basePrice: 69,
    category: "ARABIC",
    features: ["Nahw Foundation", "Sarf Mastery", "Vocabulary"],
    isMock: true,
  },
];

export default async function CoursesPage() {
  let dbPrograms = [];

  try {
    const fetched = await prisma.pricingPlan.findMany({
      where: { isActive: true },
      orderBy: { orderIndex: "asc" },
    });

    dbPrograms = fetched.map((p) => ({
      id: p.id,
      name: p.name,
      description: p.description,
      basePrice: Number(p.basePrice),
      category: p.category,
      features: p.features,
      isMock: false,
    }));
  } catch (error) {
    console.error("DB connection error - loading catalog with mock backup.");
  }

  // Final List: Database data + Mock data to ensure the campus looks active
  const allPrograms = [...dbPrograms, ...MOCK_DATA];

  return (
    <main className="pt-40 pb-20 bg-background relative overflow-hidden">
      {/* Immersive Background Lighting */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary-700/5 blur-[150px] -z-10 rounded-full" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gold/5 blur-[120px] -z-10 rounded-full" />

      <div className="container mx-auto px-6">
        {/* --- INSTITUTIONAL PROSPECTUS HEADER --- */}
        <div className="max-w-4xl mb-24 space-y-10">
          <Reveal>
            <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-2xl glass-surface border border-primary-100/50 text-primary-700 text-[10px] font-black uppercase tracking-[0.3em] shadow-xl">
              <Landmark className="w-4 h-4 animate-pulse" /> Scholarly
              Curriculum 2026
            </div>
          </Reveal>

          <div className="space-y-4">
            <Reveal delay={0.1}>
              <h1 className="text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter font-heading leading-[0.85] text-balance">
                Academic <br />
                <span className="text-primary-700 italic">Inventory.</span>
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-2xl text-muted-foreground max-w-2xl font-medium leading-relaxed border-l-4 border-primary-700 pl-8">
                Al-Maysaroh offers a rigorous, tiered curriculum designed for
                those seeking deep connection with the Divine Word through
                scholarly tradition.
              </p>
            </Reveal>
          </div>
        </div>

        {/* --- CLIENT CONTROLLER (INTERACTIVE EXPLORER) --- */}
        <CourseListClient dbPrograms={allPrograms} />
      </div>
    </main>
  );
}
