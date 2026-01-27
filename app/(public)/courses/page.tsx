import { prisma } from "@/lib/prisma";
import { Reveal } from "@/components/shared/section-animation";
import { Landmark } from "lucide-react";
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
    <main className="pt-24 sm:pt-28 md:pt-32 lg:pt-36 xl:pt-40 pb-12 sm:pb-16 md:pb-20 bg-background relative overflow-hidden">
      {/* Immersive Background Lighting - Mobile Optimized */}
      <div className="absolute top-0 right-0 w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] md:w-[600px] md:h-[600px] lg:w-[800px] lg:h-[800px] bg-primary-700/5 blur-2xl sm:blur-[60px] md:blur-[100px] lg:blur-[150px] -z-10 rounded-full translate-x-1/4 -translate-y-1/4" />
      <div className="absolute bottom-0 left-0 w-[250px] h-[250px] sm:w-[350px] sm:h-[350px] md:w-[500px] md:h-[500px] lg:w-[600px] lg:h-[600px] bg-gold/5 blur-[30px] sm:blur-[50px] md:blur-[80px] lg:blur-[120px] -z-10 rounded-full -translate-x-1/4 translate-y-1/4" />

      <div className="container mx-auto px-4 sm:px-6">
        {/* --- INSTITUTIONAL PROSPECTUS HEADER --- */}
        <div className="max-w-4xl mb-12 sm:mb-16 md:mb-20 lg:mb-24 space-y-6 sm:space-y-8 md:space-y-10">
          <Reveal>
            <div className="inline-flex items-center gap-2 sm:gap-3 px-4 py-2.5 sm:px-5 sm:py-2.5 rounded-xl sm:rounded-2xl glass-surface border border-primary-100/50 text-primary-700 text-xs sm:text-[10px] font-black uppercase tracking-wider sm:tracking-[0.3em] shadow-lg sm:shadow-xl min-h-11">
              <Landmark className="w-4 h-4 sm:w-4 sm:h-4 animate-pulse" />
              Scholarly Curriculum 2026
            </div>
          </Reveal>

          <div className="space-y-4 sm:space-y-6">
            <Reveal delay={0.1}>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-black tracking-tighter font-heading leading-[0.9] sm:leading-[0.85] text-balance">
                Academic <br />
                <span className="text-primary-700 italic">Inventory.</span>
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-2xl font-medium leading-relaxed border-l-4 border-primary-700 pl-4 sm:pl-6 md:pl-8">
                Al-Maysaroh offers a rigorous, tiered curriculum designed for
                those seeking deep connection with the Divine Word through
                scholarly tradition.
              </p>
            </Reveal>
          </div>
        </div>

        {/* --- CLIENT CONTROLLER (INTERACTIVE EXPLORER) --- */}
        <div className="px-2 sm:px-0">
          {" "}
          {/* Added container padding for mobile */}
          <CourseListClient dbPrograms={allPrograms} />
        </div>
      </div>
    </main>
  );
}
