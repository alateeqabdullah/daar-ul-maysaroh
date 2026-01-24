import { prisma } from "@/lib/prisma";
import { Reveal } from "@/components/shared/section-animation";
import { Verified, GraduationCap } from "lucide-react";
import { FacultyListClient } from "@/components/public/teachers/faculty-list-client";

export default async function FacultyPage() {
  let dbTeachers = [];

  try {
    const fetched = await prisma.teacher.findMany({
      include: { user: true },
      where: { isAvailable: true },
    });

    // Clean data for React 19 Serialization
    dbTeachers = fetched.map((t) => ({
      id: t.id,
      name: t.user.name,
      rank: t.specialization || "Faculty Member",
      credentials: t.expertise || [],
      philosophy: t.bio || "Dedicated to preserving the Divine Word.",
      availability: t.contractType,
      isMock: false,
      department: "General Studies", // You can add a department field to Schema later
    }));
  } catch (e) {
    console.error("Teacher fetch failed, using mock catalog.");
  }

  return (
    <main className="pt-40 pb-20 bg-background relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-700/5 blur-[120px] -z-10 rounded-full" />

      <div className="container mx-auto px-6">
        <div className="max-w-4xl mb-24">
          <Reveal>
            <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-2xl glass-surface border border-primary-100 text-primary-700 text-[10px] font-black uppercase tracking-[0.3em] shadow-xl mb-8">
              <Verified className="w-5 h-5 animate-pulse" /> Scholarly Council
              Authenticated
            </div>
            <h1 className="text-7xl lg:text-9xl font-black tracking-tighter font-heading leading-[0.85] mb-10">
              The Noble <br />{" "}
              <span className="text-primary-700 italic">Faculty.</span>
            </h1>
            <p className="text-2xl text-muted-foreground font-medium leading-relaxed border-l-4 border-primary-700 pl-8 max-w-2xl">
              Each educator is a verified carrier of the{" "}
              <span className="text-foreground font-bold">Divine Sanad</span>,
              ensuring the preservation of the Quran's authentic recitation.
            </p>
          </Reveal>
        </div>

        {/* This handles the merging and filtering logic */}
        <FacultyListClient dbTeachers={dbTeachers} />
      </div>
    </main>
  );
}
