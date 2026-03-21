// import { Reveal } from "@/components/shared/section-animation";
// import {
//   Award,
//   ShieldCheck,
//   BookOpen,
//   ScrollText,
//   GraduationCap,
//   ArrowLeft,
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import Link from "next/link";

// export default function ScholarProfilePage({
//   params,
// }: {
//   params: { id: string };
// }) {
//   return (
//     <main className="pt-40 pb-20">
//       <div className="container mx-auto px-6">
//         <Link
//           href="/teachers"
//           className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-primary-700 transition-colors mb-12"
//         >
//           <ArrowLeft className="w-4 h-4" /> Back to Faculty
//         </Link>

//         <div className="grid lg:grid-cols-12 gap-16">
//           {/* LEFT: Portrait & Brief */}
//           <div className="lg:col-span-4 space-y-8">
//             <div className="aspect-[3/4] bg-muted rounded-[3rem] border-8 border-white dark:border-slate-800 shadow-3xl overflow-hidden relative">
//               <div className="absolute inset-0 flex items-center justify-center opacity-10">
//                 <GraduationCap className="w-32 h-32" />
//               </div>
//             </div>
//             <div className="institutional-card p-8 space-y-6">
//               <h4 className="font-black uppercase text-xs tracking-widest border-b pb-4">
//                 Scholarly Rank
//               </h4>
//               <div className="flex items-center gap-4">
//                 <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center text-gold">
//                   <Award className="w-6 h-6" />
//                 </div>
//                 <p className="font-bold text-sm">
//               {`    Grand Ijazah Holder in 10 Qira'at`}
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* RIGHT: The Sanad & History */}
//           <div className="lg:col-span-8 space-y-12">
//             <div className="space-y-4">
//               <h2 className="text-5xl font-black tracking-tighter uppercase">
//                 Scholarly Profile
//               </h2>
//               <p className="text-xl text-muted-foreground font-medium leading-relaxed italic">
//                {` "The Quran is a trust passed from heart to heart. My mission is
//                 to ensure that trust is delivered with perfection."`}
//               </p>
//             </div>

//             {/* THE SANAD TREE (Elite Visual) */}
//             <div className="glass-surface p-10 lg:p-16 rounded-[4rem] border shadow-2xl relative overflow-hidden">
//               <div className="absolute top-0 right-0 p-8 opacity-5 font-quran text-8xl">
//                 سند
//               </div>
//               <h3 className="text-xl font-black uppercase tracking-[0.2em] mb-12 flex items-center gap-3">
//                 <ScrollText className="text-primary-700" /> Authentic Scholarly
//                 Lineage
//               </h3>

//               <div className="space-y-8 relative">
//                 <div className="absolute left-[1.45rem] top-2 h-full w-px bg-linear-to-b from-primary-700 to-transparent opacity-20" />

//                 {[
//                   {
//                     role: "Current Scholar",
//                     name: "Sheikh Abubakar Al-Maysari",
//                   },
//                   {
//                     role: "Authorized by",
//                     name: "Sheikh Idrees Abdulkadir (Dean of )",
//                   },
//                   {
//                     role: "Lineage Path",
//                     name: "Continuous Chain to the Sahaba (RA)",
//                   },
//                   { role: "Source", name: "The Prophet Muhammad (ﷺ)" },
//                 ].map((link, i) => (
//                   <div key={i} className="flex gap-8 items-center group">
//                     <div className="w-12 h-12 rounded-full bg-background border-2 border-primary-700 flex items-center justify-center relative z-10 shadow-xl group-hover:scale-110 transition-transform">
//                       <div className="w-2 h-2 rounded-full bg-primary-700" />
//                     </div>
//                     <div>
//                       <p className="text-[10px] font-black uppercase tracking-widest opacity-40">
//                         {link.role}
//                       </p>
//                       <p className="text-lg font-bold">{link.name}</p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <div className="grid md:grid-cols-2 gap-8">
//               <div className="institutional-card p-10">
//                 <h4 className="font-black text-sm uppercase mb-6 tracking-widest">
//                   Academic History
//                 </h4>
//                 <ul className="space-y-4">
//                   {[
//                     "PhD in Quranic Sciences",
//                     "Ijazah in Ashara Sughra",
//                     "20+ Years at Al-Azhar",
//                   ].map((item) => (
//                     <li
//                       key={item}
//                       className="flex items-center gap-3 text-sm font-bold text-muted-foreground"
//                     >
//                       <ShieldCheck className="w-4 h-4 text-accent" /> {item}
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//               <div className="institutional-card p-10 bg-primary-700 text-white">
//                 <h4 className="font-black text-sm uppercase mb-6 tracking-widest">
//                   Student Match
//                 </h4>
//                 <p className="text-sm font-medium leading-relaxed opacity-90">
//                  {` Best suited for Advanced Hifz students and those seeking
//                   Ijazah in specific Qira'at styles.`}
//                 </p>
//                 <Button className="w-full mt-8 bg-white text-primary-700 font-black text-[10px] tracking-widest uppercase rounded-xl">
//                   Request Assignment
//                 </Button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// }



import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/shared/section-animation";
import {
  Award,
  ShieldCheck,
  BookOpen,
  ScrollText,
  ArrowLeft,
  User,
  Globe,
  Quote,
  Star,
  Sparkles,
  Mic,
  Users,
  Clock,
  MapPin,
  Mail,
  Calendar,
  GraduationCap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

// Generate metadata dynamically
export async function generateMetadata({
  params,
}: {
  params: { id: string } | Promise<{ id: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;

  try {
    const teacher = await prisma.teacher.findUnique({
      where: { id: resolvedParams.id },
      include: { user: true },
    });

    if (!teacher || !teacher.user) {
      return {
        title: "Scholar Not Found | Al-Maysaroh",
        description: "The requested scholar profile could not be found.",
      };
    }

    return {
      title: `${teacher.user.name} | Al-Maysaroh Faculty`,
      description:
        teacher.bio?.slice(0, 160) ||
        `Learn about ${teacher.user.name}, our Ijazah-certified scholar in ${teacher.specialization || "Quranic Studies"}.`,
    };
  } catch (error) {
    return {
      title: "Scholar Profile | Al-Maysaroh",
    };
  }
}

export default async function ScholarProfilePage({
  params,
}: {
  params: { id: string } | Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const id = resolvedParams.id;

  // Fetch teacher data with SanadChain
  let teacher = null;
  let sanadChain = [];

  try {
    teacher = await prisma.teacher.findUnique({
      where: { id },
      include: {
        user: true,
        classes: {
          take: 3,
          orderBy: { createdAt: "desc" },
        },
        subjects: {
          take: 5,
        },
        sanadChains: {
          orderBy: { generation: "asc" },
        },
      },
    });

    // If teacher has sanadChains in DB, use them
    if (teacher?.sanadChains && teacher.sanadChains.length > 0) {
      sanadChain = teacher.sanadChains;
    }
  } catch (error) {
    console.error("Failed to fetch teacher:", error);
  }

  // Handle 404
  if (!teacher || !teacher.user) {
    notFound();
  }

  // If no sanad chain in DB, use mock data for demonstration
  if (sanadChain.length === 0) {
    sanadChain = getMockSanadChain();
  }

  // Group chain by famous scholars
  const famousScholars = sanadChain.filter((s) => s.isFamous);
  const fullChain = sanadChain.sort((a, b) => a.generation - b.generation);

  // Calculate availability status using existing fields
  const currentClasses = teacher.classes?.length || 0;
  const maxStudents = teacher.maxStudents || 20;
  const isAvailable = teacher.isAvailable && currentClasses < maxStudents;
  const availableSpots = maxStudents - currentClasses;

  // Teacher data using ONLY existing schema fields
  const teacherData = {
    id: teacher.id,
    name: teacher.user.name || "Scholar",
    email: teacher.user.email,
    image: teacher.user.image,
    rank: teacher.specialization || "Ijazah-Certified Scholar",
    quote:
      teacher.bio?.split(".")[0] ||
      "The Quran is a trust passed from heart to heart.",
    bio:
      teacher.bio ||
      "Dedicated to preserving the authentic recitation of the Quran through unbroken chains of transmission.",
    expertise: teacher.expertise || [
      "Quranic Recitation",
      "Tajweed Sciences",
      "Qira'at Studies",
    ],
    contractType: teacher.contractType || "FULL_TIME",
    specialization: teacher.specialization || "Quranic Studies",
    experience: teacher.experienceYears || 0,
    qualification: teacher.qualification || "Ijazah Certified",
    isAvailable: isAvailable,
    availableSpots: availableSpots,
    teachingStyle: teacher.teachingStyle || "Traditional with Modern Application",
    maxStudents: maxStudents,
    currentStudents: currentClasses,
    yearsActive: teacher.experienceYears || 0,
    // Location info would need to be added to schema
    location: "Global",
  };

  return (
    <main className="min-h-screen bg-background relative overflow-hidden">
      {/* Hero Background */}
      <div className="absolute inset-0 bg-linear-to-b from-primary-900/5 via-transparent to-transparent" />
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary-700/5 blur-[120px] rounded-full -z-10" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary-700/5 blur-[100px] rounded-full -z-10" />

      {/* Islamic Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-[0.02] bg-[url('/islamic-pattern.svg')] bg-repeat"
        style={{ backgroundSize: "300px" }}
      />

      <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20 lg:py-24">
        {/* Back Link */}
        <Link
          href="/teachers"
          className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-muted-foreground hover:text-primary-700 transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Faculty
        </Link>

        {/* ==================== HEADER SECTION ==================== */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 mb-16 lg:mb-20">
          {/* Profile Image */}
          <div className="lg:w-1/3">
            <div className="relative group">
              <div className="absolute -inset-1 bg-linear-to-r from-primary-700 via-gold to-primary-700 rounded-[2.5rem] blur opacity-20 group-hover:opacity-30 transition-opacity" />
              <div className="relative aspect-[3/4] rounded-[2.5rem] overflow-hidden border-4 border-white dark:border-slate-800 shadow-2xl">
                {teacherData.image ? (
                  <Image
                    src={teacherData.image}
                    alt={teacherData.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    priority
                  />
                ) : (
                  <div className="absolute inset-0 bg-linear-to-br from-primary-900 to-primary-700 flex items-center justify-center">
                    <User className="w-32 h-32 text-white/30" />
                  </div>
                )}

                {/* Verification Badge */}
                {teacher.isAvailable && (
                  <div className="absolute top-4 left-4 bg-primary-700 text-white px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider shadow-xl flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4" />
                    Ijazah Certified
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Header Content */}
          <div className="lg:w-2/3 space-y-6">
            <Reveal>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 text-xs font-black uppercase tracking-wider">
                <Sparkles className="w-4 h-4" />
                Sanad Holder • {teacherData.experience}+ Years
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tighter font-heading leading-[0.9]">
                {teacherData.name}
              </h1>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="flex flex-wrap gap-3">
                <span className="px-4 py-2 rounded-full bg-gold/10 text-gold text-sm font-black">
                  {teacherData.rank}
                </span>
                <span className="px-4 py-2 rounded-full bg-primary-700/10 text-primary-700 text-sm font-black">
                  {teacherData.specialization}
                </span>
              </div>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
                {[
                  {
                    icon: Users,
                    label: "Classes",
                    value: teacherData.currentStudents,
                  },
                  {
                    icon: BookOpen,
                    label: "Subjects",
                    value: teacher.subjects?.length || 0,
                  },
                  {
                    icon: Clock,
                    label: "Experience",
                    value: `${teacherData.experience} yrs`,
                  },
                  {
                    icon: MapPin,
                    label: "Location",
                    value: teacherData.location,
                  },
                ].map((stat, idx) => (
                  <div key={idx} className="text-center p-2">
                    <stat.icon className="w-5 h-5 mx-auto mb-2 text-primary-700" />
                    <p className="text-sm font-black">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>

        {/* ==================== QUOTE SECTION ==================== */}
        <Reveal delay={0.4}>
          <div className="max-w-4xl mx-auto mb-16 p-8 sm:p-10 glass-surface rounded-[2.5rem] border border-primary-700/20 relative">
            <Quote className="absolute top-6 left-6 w-12 h-12 text-primary-700/10" />
            <p className="text-xl sm:text-2xl md:text-3xl font-light italic text-center relative z-10">
              {` "${teacherData.quote}"`}
            </p>
            <p className="text-center text-primary-700 font-black text-sm uppercase tracking-widest mt-4">
              — Personal Teaching Philosophy —
            </p>
          </div>
        </Reveal>

        {/* ==================== MAIN CONTENT GRID ==================== */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
          {/* LEFT COLUMN - Bio & Details */}
          <div className="lg:col-span-4 space-y-6">
            {/* Bio Card */}
            <Reveal delay={0.1}>
              <div className="institutional-card p-6 sm:p-8">
                <h3 className="font-black text-lg uppercase tracking-tight mb-4 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-primary-700" />
                  Biography
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {teacherData.bio}
                </p>
              </div>
            </Reveal>

            {/* Expertise Card */}
            <Reveal delay={0.15}>
              <div className="institutional-card p-6 sm:p-8 bg-linear-to-br from-primary-700/5 to-primary-700/10">
                <h3 className="font-black text-lg uppercase tracking-tight mb-4 flex items-center gap-2">
                  <Award className="w-5 h-5 text-primary-700" />
                  Areas of Expertise
                </h3>
                <div className="flex flex-wrap gap-2">
                  {teacherData.expertise.map((item) => (
                    <span
                      key={item}
                      className="px-4 py-2 rounded-full bg-primary-700/10 text-primary-700 text-sm font-black"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Qualifications & Contact */}
            <Reveal delay={0.2}>
              <div className="institutional-card p-6 sm:p-8">
                <h3 className="font-black text-lg uppercase tracking-tight mb-4 flex items-center gap-2">
                  <Globe className="w-5 h-5 text-primary-700" />
                  Qualifications & Contact
                </h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-xs text-muted-foreground mb-2">
                      Qualification
                    </p>
                    <p className="font-black text-sm">{teacherData.qualification}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-2">
                      Contract Type
                    </p>
                    <p className="font-black text-sm capitalize">
                      {teacherData.contractType.toLowerCase().replace("_", " ")}
                    </p>
                  </div>
                  <div className="pt-4 border-t border-border/50">
                    <Link href={`/contact?teacher=${teacherData.id}`}>
                      <Button className="w-full rounded-full" variant="outline">
                        <Mail className="w-4 h-4 mr-2" />
                        Contact Scholar
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Teaching Schedule Preview */}
            {teacher.classes && teacher.classes.length > 0 && (
              <Reveal delay={0.25}>
                <div className="institutional-card p-6 sm:p-8">
                  <h3 className="font-black text-lg uppercase tracking-tight mb-4 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-primary-700" />
                    Current Classes
                  </h3>
                  <div className="space-y-3">
                    {teacher.classes.slice(0, 3).map((cls) => (
                      <div key={cls.id} className="p-3 rounded-lg bg-muted/30">
                        <p className="font-black text-sm">{cls.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {cls.level} • {cls.section || "Main"}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            )}
          </div>

          {/* RIGHT COLUMN - Sanad Chain & Teaching */}
          <div className="lg:col-span-8 space-y-8">
            {/* Sanad Chain - Interactive Tree */}
            <Reveal delay={0.2}>
              <div className="institutional-card p-6 sm:p-8 lg:p-10 overflow-hidden relative">
                {/* Background Arabic */}
                <div className="absolute top-0 right-0 p-8 opacity-5 font-quran text-8xl">
                  سند
                </div>

                <h3 className="text-2xl font-black uppercase tracking-tight mb-4 flex items-center gap-3">
                  <ScrollText className="w-6 h-6 text-primary-700" />
                  Noble Chain of Transmission
                </h3>

                <p className="text-sm text-muted-foreground mb-6">
                  {teacherData.name}'s unbroken lineage to the Prophet Muhammad (ﷺ) through
                  generations of dedicated scholars. Each link represents a carrier of the sacred
                  trust, preserving the authentic recitation for over 1400 years.
                </p>

                {/* Famous Scholars Highlight */}
                {famousScholars.length > 0 && (
                  <div className="mb-8 p-4 rounded-xl bg-linear-to-r from-primary-700/10 to-transparent border border-primary-700/20">
                    <p className="text-xs font-black uppercase tracking-widest text-primary-700 mb-3">
                      KEY FIGURES IN THIS CHAIN
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {famousScholars.slice(0, 5).map((scholar) => (
                        <div
                          key={scholar.generation}
                          className="flex items-center gap-2"
                        >
                          <Star className="w-4 h-4 text-gold fill-gold" />
                          <span className="font-bold">{scholar.scholarName}</span>
                          <span className="text-xs text-muted-foreground">
                            ({scholar.era})
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Chain Visualization */}
                <div className="relative max-h-[600px] overflow-y-auto pr-4 custom-scrollbar">
                  {/* Vertical Line */}
                  <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-linear-to-b from-primary-700 via-primary-700/50 to-transparent" />

                  <div className="space-y-6">
                    {fullChain.slice(0, 30).map((link, index) => (
                      <div key={index} className="relative flex gap-4 sm:gap-6">
                        {/* Node */}
                        <div
                          className={`
                          w-10 h-10 sm:w-12 sm:h-12 rounded-full border-4 flex items-center justify-center shrink-0 relative z-10 bg-background
                          ${
                            link.isFamous
                              ? "border-gold bg-linear-to-br from-gold/20 to-gold/5"
                              : "border-primary-700"
                          }
                        `}
                        >
                          {link.isFamous ? (
                            <Star className="w-4 h-4 sm:w-5 sm:h-5 text-gold" />
                          ) : (
                            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-primary-700" />
                          )}
                        </div>

                        {/* Content */}
                        <div className="flex-1 pb-6">
                          <div className="flex flex-wrap items-center gap-2 mb-1">
                            <p className="font-black text-base sm:text-lg">
                              {link.scholarName}
                            </p>
                            {link.isFamous && (
                              <span className="px-2 py-0.5 rounded-full bg-gold/10 text-gold text-[9px] sm:text-[10px] font-black uppercase tracking-wider">
                                Renowned
                              </span>
                            )}
                          </div>
                          {link.bio && (
                            <p className="text-xs sm:text-sm text-muted-foreground mb-1">
                              {link.bio}
                            </p>
                          )}
                          <div className="flex flex-wrap gap-2 sm:gap-3 text-xs">
                            <span className="text-primary-700 font-black">
                              {link.era}
                            </span>
                            <span className="text-muted-foreground">•</span>
                            <span className="text-muted-foreground">
                              {link.region}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Chain Stats */}
                <div className="mt-8 pt-6 border-t border-border/50 grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-black text-primary-700">
                      {fullChain.length}
                    </p>
                    <p className="text-xs text-muted-foreground">Generations</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-black text-primary-700">
                      {famousScholars.length}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Renowned Scholars
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-black text-primary-700">
                      1400+
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Years Unbroken
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Teaching Style & Availability */}
            <Reveal delay={0.3}>
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="institutional-card p-5 sm:p-6">
                  <h4 className="font-black text-xs sm:text-sm uppercase mb-3 tracking-widest flex items-center gap-2">
                    <Mic className="w-4 h-4 text-primary-700" />
                    Teaching Style
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {teacherData.teachingStyle}
                  </p>
                </div>

                <div className={cn(
                  "institutional-card p-5 sm:p-6",
                  teacherData.isAvailable 
                    ? "bg-primary-700 text-white" 
                    : "bg-muted/50"
                )}>
                  <h4 className={cn(
                    "font-black text-xs sm:text-sm uppercase mb-3 tracking-widest flex items-center gap-2",
                    teacherData.isAvailable ? "text-white/80" : "text-primary-700"
                  )}>
                    <Users className="w-4 h-4" />
                    Availability
                  </h4>
                  <p className={cn(
                    "text-sm mb-4",
                    teacherData.isAvailable ? "text-white/80" : "text-muted-foreground"
                  )}>
                    {teacherData.isAvailable
                      ? `${teacherData.availableSpots} of ${teacherData.maxStudents} spots available`
                      : "Currently at capacity"}
                  </p>
                  <Link href="/admissions">
                    <Button 
                      className={cn(
                        "w-full font-black text-xs tracking-widest uppercase rounded-xl",
                        teacherData.isAvailable
                          ? "bg-white text-primary-700 hover:bg-white/90"
                          : "bg-primary-700 text-white hover:bg-primary-800"
                      )}
                    >
                      {teacherData.isAvailable ? "Request Assignment" : "Join Waitlist"}
                    </Button>
                  </Link>
                </div>
              </div>
            </Reveal>

            {/* Subjects Taught */}
            {teacher.subjects && teacher.subjects.length > 0 && (
              <Reveal delay={0.35}>
                <div className="institutional-card p-5 sm:p-6">
                  <h4 className="font-black text-xs sm:text-sm uppercase mb-3 tracking-widest flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-primary-700" />
                    Subjects Taught
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {teacher.subjects.map((subject) => (
                      <span
                        key={subject.id}
                        className="px-3 py-1.5 rounded-full bg-primary-50 dark:bg-primary-950/30 text-primary-700 text-xs font-black"
                      >
                        {subject.name}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

// Helper function for mock Sanad Chain
function getMockSanadChain() {
  return [
    {
      generation: 1,
      scholarName: "Sheikh Muhammad Al-Madani",
      bio: "Senior Scholar at Islamic University",
      era: "15th Century Hijri",
      region: "Madinah",
      isFamous: false,
    },
    {
      generation: 2,
      scholarName: "Sheikh Ibrahim Al-Misri",
      bio: "Renowned Quranic Scholar",
      era: "14th Century Hijri",
      region: "Cairo",
      isFamous: true,
    },
    {
      generation: 3,
      scholarName: "Sheikh Yusuf Al-Andalusi",
      bio: "Master of Qira'at",
      era: "13th Century Hijri",
      region: "Andalus",
      isFamous: false,
    },
    {
      generation: 8,
      scholarName: "Imam Al-Jazari",
      bio: "Father of Tajweed Science",
      era: "9th Century Hijri",
      region: "Damascus",
      isFamous: true,
    },
    {
      generation: 25,
      scholarName: "Imam Nafi' Al-Madani",
      bio: "One of the Seven Qira'at Masters",
      era: "2nd Century Hijri",
      region: "Madinah",
      isFamous: true,
    },
    {
      generation: 35,
      scholarName: "The Prophet Muhammad (ﷺ)",
      bio: "Source of All Sanads",
      era: "1st Century Hijri",
      region: "Makkah/Madinah",
      isFamous: true,
    },
  ];
}
