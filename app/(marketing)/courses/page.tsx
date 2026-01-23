import { CourseCard } from "@/components/public/courses/course-card";
import { prisma } from "@/lib/prisma";
import { BookOpen } from "lucide-react";

// THE ELITE MOCK DATA
const MOCK_PROGRAMS = [
  {
    id: "mock-hifz",
    name: "Elite Hifz Program",
    description:
      "A traditional path to memorization with a focus on precision (Itqan) and Mutashabihat mastery. Led by scholars with authentic Sanad.",
    basePrice: 149,
    category: "QURAN",
    features: [
      "Daily 1-on-1 Recitation",
      "Individual Memorization Plan",
      "Direct Scholarly Ijazah",
      "Mutashabihat Analysis",
    ],
    isMock: true,
  },
  {
    id: "mock-tajweed",
    name: "Tajweed Mastery",
    description:
      "The scientific study of Quranic phonetics. Master the makharij and sifaat using the classical poem of Al-Jazariyyah.",
    basePrice: 89,
    category: "TAJWEED",
    features: [
      "Weekly Practical Exams",
      "Makharij Correction",
      "Classical Text Study",
      "Certification of Completion",
    ],
    isMock: true,
  },
  {
    id: "mock-arabic",
    name: "Classical Arabic",
    description:
      "Unlock the linguistic miracles of the Quran. Study Nahw (Grammar) and Sarf (Morphology) to understand the Divine Word directly.",
    basePrice: 69,
    category: "ARABIC",
    features: [
      "Grammar Foundation",
      "Vocabulary Expansion",
      "Quranic Translation",
      "Live Group Discussions",
    ],
    isMock: true,
  },
];

export default async function CoursesPage() {
  // 1. Fetch real courses from Prisma
  let dbPrograms = [];
  try {
    dbPrograms = await prisma.pricingPlan.findMany({
      where: { isActive: true },
      orderBy: { orderIndex: "asc" },
    });
  } catch (error) {
    console.error("Database fetch failed, falling back to mocks.");
  }

  // 2. Merge Logic: DB courses first, then Mocks if DB is small/empty
  const allPrograms = [...dbPrograms, ...MOCK_PROGRAMS];

  return (
    <main className="pt-40 pb-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mb-20 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-100 text-primary-700 text-[10px] font-black uppercase tracking-widest">
            <span className="w-2 h-2 rounded-full bg-primary-700 animate-pulse" />
            Admissions Open 2026
          </div>
          <h1 className="text-6xl lg:text-8xl font-black tracking-tighter font-heading leading-none">
            Institutional <br />
            <span className="text-primary-700 italic">Curriculum.</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl font-medium leading-relaxed">
            Select an academic track. Our curriculum bridges traditional
            Sanad-based learning with modern accessibility.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-10">
          {allPrograms.map((program) => (
            // Passing the individual program correctly
            <CourseCard key={program.id} program={program} />
          ))}
        </div>
      </div>
    </main>
  );
}
