// // "use client";

// // import { useState, useTransition, useMemo } from "react";
// // import { CourseCard } from "./course-card";
// // import { Reveal } from "@/components/shared/section-animation";
// // import {
// //   LayoutGrid,
// //   List,
// //   Search,
// //   GraduationCap,
// //   BookOpen,
// //   ScrollText,
// // } from "lucide-react";
// // import { cn } from "@/lib/utils";

// // export function CourseListClient({ dbPrograms }: { dbPrograms: any[] }) {
// //   const [isPending, startTransition] = useTransition();
// //   const [activeCategory, setActiveCategory] = useState("ALL");
// //   const [searchQuery, setSearchQuery] = useState("");
// //   const [viewType, setViewType] = useState<"grid" | "list">("grid");

// //   const categories = [
// //     { id: "ALL", label: "All Curriculum", icon: LayoutGrid },
// //     { id: "QURAN", label: "Hifz & Qira'at", icon: BookOpen },
// //     { id: "TAJWEED", label: "Tajweed Mastery", icon: ScrollText },
// //     { id: "ARABIC", label: "Classical Arabic", icon: GraduationCap },
// //   ];

// //   // Elite Filter Logic
// //   const filtered = useMemo(() => {
// //     return dbPrograms.filter((p) => {
// //       const matchesCat =
// //         activeCategory === "ALL" || p.category === activeCategory;
// //       const matchesSearch = p.name
// //         .toLowerCase()
// //         .includes(searchQuery.toLowerCase());
// //       return matchesCat && matchesSearch;
// //     });
// //   }, [activeCategory, searchQuery, dbPrograms]);

// //   const handleCategoryChange = (id: string) => {
// //     startTransition(() => {
// //       setActiveCategory(id);
// //     });
// //   };

// //   return (
// //     <div className="space-y-12">
// //       {/* --- COMMAND CENTER (SEARCH & FILTERS) --- */}
// //       <Reveal delay={0.3}>
// //         <div className="glass-surface p-6 rounded-4xl border shadow-xl space-y-6">
// //           <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
// //             {/* Search Architecture */}
// //             <div className="relative w-full lg:max-w-md group">
// //               <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary-700 transition-colors" />
// //               <input
// //                 type="text"
// //                 placeholder="Search curriculum, scholars, or sciences..."
// //                 className="w-full h-14 pl-12 pr-6 rounded-2xl bg-background border-2 border-transparent focus:border-primary-700/30 outline-none font-medium transition-all"
// //                 onChange={(e) => setSearchQuery(e.target.value)}
// //               />
// //             </div>

// //             {/* Category Command Bar */}
// //             <div className="flex items-center gap-2 p-1.5 bg-muted/50 rounded-2xl overflow-x-auto max-w-full hide-scrollbar">
// //               {categories.map((cat) => (
// //                 <button
// //                   key={cat.id}
// //                   onClick={() => handleCategoryChange(cat.id)}
// //                   className={cn(
// //                     "flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap",
// //                     activeCategory === cat.id
// //                       ? "bg-primary-700 text-white shadow-lg"
// //                       : "text-muted-foreground hover:text-primary-700 hover:bg-white dark:hover:bg-slate-900",
// //                   )}
// //                 >
// //                   <cat.icon className="w-4 h-4" /> {cat.label}
// //                 </button>
// //               ))}
// //             </div>

// //             {/* View Switcher */}
// //             <div className="hidden lg:flex items-center gap-2 border-l pl-6 border-border">
// //               <button
// //                 onClick={() => setViewType("grid")}
// //                 className={cn(
// //                   "p-3 rounded-lg transition-all",
// //                   viewType === "grid"
// //                     ? "bg-primary-700 text-white"
// //                     : "hover:bg-muted",
// //                 )}
// //               >
// //                 <LayoutGrid className="w-5 h-5" />
// //               </button>
// //               <button
// //                 onClick={() => setViewType("list")}
// //                 className={cn(
// //                   "p-3 rounded-lg transition-all",
// //                   viewType === "list"
// //                     ? "bg-primary-700 text-white"
// //                     : "hover:bg-muted",
// //                 )}
// //               >
// //                 <List className="w-5 h-5" />
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       </Reveal>

// //       {/* --- ACADEMIC GRID --- */}
// //       <div
// //         className={cn(
// //           "grid gap-8 transition-all duration-500",
// //           viewType === "grid"
// //             ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
// //             : "grid-cols-1",
// //         )}
// //       >
// //         {filtered.map((program, index) => (
// //           <Reveal key={program.id} delay={index * 0.05}>
// //             <CourseCard program={program} viewType={viewType} />
// //           </Reveal>
// //         ))}
// //       </div>

// //       {/* Empty State */}
// //       {filtered.length === 0 && (
// //         <Reveal>
// //           <div className="text-center py-40 glass-surface rounded-[4rem] border-2 border-dashed">
// //             <Search className="w-16 h-16 mx-auto mb-6 text-muted-foreground opacity-20" />
// //             <h3 className="text-2xl font-black uppercase tracking-tighter">
// //               No Curriculum Found
// //             </h3>
// //             <p className="text-muted-foreground font-medium">
// //               Try adjusting your search or category filters.
// //             </p>
// //           </div>
// //         </Reveal>
// //       )}
// //     </div>
// //   );
// // }










"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  BookOpen,
  Mic,
  Globe,
  GraduationCap,
  Heart,
  Award,
  Users,
  Star,
  Clock,
  Calendar,
  Filter,
  X,
  Sparkles,
  ArrowRight,
  Search,
  TrendingUp,
  Zap,
  Landmark,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";

// Icon mapping object
const iconMap = {
  BookOpen,
  Mic,
  Globe,
  GraduationCap,
  Heart,
  Award,
  Users,
  Star,
  Clock,
  Calendar,
  Sparkles,
  TrendingUp,
  Zap,
  Landmark,
};

interface Program {
  id: string;
  name: string;
  description: string;
  longDescription?: string;
  basePrice?: number;
  startingPrice?: number;
  category: string;
  subcategory?: string;
  duration: string;
  durationMonths?: number;
  level: string;
  format: string;
  nextStart: string;
  sessionsPerWeek: number;
  sessionDuration: string;
  students: number;
  rating: number;
  reviewCount: number;
  features: string[];
  curriculum?: string[];
  prerequisites?: string;
  outcomes?: string[];
  isMock: boolean;
  popular?: boolean;
  badge?: string;
  iconName: string;
  color: string;
  isFixedPrice?: boolean;
}

interface Category {
  id: string;
  name: string;
  iconName: string;
  count: number;
}

interface Level {
  id: string;
  name: string;
}

interface Format {
  id: string;
  name: string;
}

interface Duration {
  id: string;
  name: string;
  minMonths?: number;
  maxMonths?: number;
}

interface CourseListClientProps {
  programs: Program[];
  categories: Category[];
  levels: Level[];
  formats: Format[];
  durations: Duration[];
}

// ==================== COURSE CARD COMPONENT ====================
function CourseCard({ program }: { program: Program }) {
  const router = useRouter();

  const handleEnroll = (e: React.MouseEvent) => {
    e.preventDefault();
    if (program.isMock) {
      toast.info("Admission for this scholarly track opens soon.", {
        description:
          "We are currently finalizing the scholarly council for this program.",
        className: "glass-surface border-gold/50",
      });
    } else {
      router.push(`/admissions/apply?courseId=${program.id}`);
    }
  };

  const getPriceDisplay = () => {
    if (program.isFixedPrice) {
      return `$${program.basePrice}`;
    }
    return `$${program.startingPrice || program.basePrice} +`;
  };

  const IconComponent =
    iconMap[program.iconName as keyof typeof iconMap] || BookOpen;

  return (
    <motion.div
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className="institutional-card relative overflow-hidden group bg-card transition-all duration-500 flex flex-col p-8 sm:p-10 h-full"
    >
      {/* TOP BAR: STATUS & BADGE */}
      <div className="flex justify-between items-center mb-8">
        <div className="relative">
          <div className="absolute inset-0 bg-primary-700/20 blur-lg rounded-full" />
          <div className="relative px-4 py-1.5 bg-primary-700 text-white rounded-full text-[9px] font-black uppercase tracking-[0.2em] shadow-xl flex items-center gap-1.5">
            <IconComponent className="w-3 h-3" />
            {program.category}
          </div>
        </div>
        {program.isMock && (
          <div className="flex items-center gap-1.5 text-[9px] font-black text-gold uppercase tracking-widest bg-gold/5 px-3 py-1.5 rounded-lg border border-gold/20">
            <Sparkles className="w-3 h-3 fill-current" /> Scholar Sanad
          </div>
        )}
      </div>

      {/* CONTENT AREA */}
      <div className="grow space-y-6 w-full">
        <div>
          <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tighter leading-none group-hover:text-primary-700 transition-colors mb-2">
            {program.name}
          </h3>
          <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] opacity-60">
            {program.subcategory || program.category} • {program.level}
          </p>
        </div>

        <p className="text-muted-foreground font-medium leading-relaxed line-clamp-3 text-sm">
          {program.description}
        </p>

        {/* Technical Specs Grid */}
        <div className="grid grid-cols-2 gap-4 py-6 border-y border-border/50">
          <div className="space-y-1">
            <p className="text-[8px] font-black uppercase opacity-40 tracking-widest">
              Duration
            </p>
            <div className="flex items-center gap-2 text-xs font-bold uppercase">
              <Clock className="w-3.5 h-3.5 text-primary-700" />{" "}
              {program.duration}
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-[8px] font-black uppercase opacity-40 tracking-widest">
              Format
            </p>
            <div className="flex items-center gap-2 text-xs font-bold uppercase">
              <Users className="w-3.5 h-3.5 text-accent" /> {program.format}
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-[8px] font-black uppercase opacity-40 tracking-widest">
              Sessions
            </p>
            <div className="flex items-center gap-2 text-xs font-bold uppercase">
              <Calendar className="w-3.5 h-3.5 text-primary-700" />{" "}
              {program.sessionsPerWeek}x week
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-[8px] font-black uppercase opacity-40 tracking-widest">
              Rating
            </p>
            <div className="flex items-center gap-2 text-xs font-bold uppercase">
              <Star className="w-3.5 h-3.5 text-gold fill-gold" />{" "}
              {program.rating}
              <span className="text-[9px] text-muted-foreground">
                ({program.reviewCount})
              </span>
            </div>
          </div>
        </div>

        {/* Features as Tags */}
        <div className="flex flex-wrap gap-2 pt-2">
          {program.features?.slice(0, 3).map((feature: string, i: number) => (
            <span
              key={i}
              className="px-3 py-1 bg-muted/50 rounded-md text-[10px] font-bold text-muted-foreground uppercase border border-border/50 transition-colors hover:bg-primary-50 hover:text-primary-700"
            >
              {feature}
            </span>
          ))}
        </div>
      </div>

      {/* COMMAND FOOTER */}
      <div className="mt-8 space-y-5 w-full pt-4 border-t border-border/30">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-sm font-black tracking-tighter text-primary-700">
                {getPriceDisplay()}
              </span>
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                /mo
              </span>
            </div>
            {!program.isFixedPrice && (
              <p className="text-[9px] font-black text-accent uppercase tracking-widest mt-0.5">
                Customizable plan
              </p>
            )}
          </div>

          <Button
          
            className="h-12 px-6 rounded-xl bg-primary-700 text-white font-black text-[10px] tracking-[0.15em] uppercase shadow-lg relative overflow-hidden group/btn transition-all active:scale-95"
          >
             <Link href="/admissions">
            <span className="relative z-10 flex items-center gap-2">
              Enroll{" "}
              <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover/btn:animate-shimmer" />
            </Link>
          </Button>
        </div>
      </div>

      {/* Decoration */}
      <div className="absolute -bottom-10 -right-10 opacity-[0.03] scale-150 pointer-events-none font-quran text-9xl group-hover:opacity-[0.06] group-hover:scale-[1.6] transition-all duration-700">
        قرآن
      </div>

      {/* Popular Badge */}
      {/* {program.popular && (
        <div className="absolute top-5 right-5">
          <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-gold/20 text-gold text-[8px] font-black uppercase tracking-wider">
            <Sparkles className="w-3 h-3" />
            Popular
          </div>
        </div>
      )} */}
    </motion.div>
  );
}

// ==================== MAIN COMPONENT ====================
export function CourseListClient({
  programs,
  categories,
  levels,
  formats,
  durations,
}: CourseListClientProps) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [selectedFormat, setSelectedFormat] = useState("all");
  const [selectedDuration, setSelectedDuration] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("popular");
  const [visibleCount, setVisibleCount] = useState(6);

  // Filter programs
  const filteredPrograms = useMemo(() => {
    return programs.filter((program) => {
      if (selectedCategory !== "all" && program.category !== selectedCategory)
        return false;
      if (selectedLevel !== "all" && program.level !== selectedLevel)
        return false;
      if (selectedFormat !== "all" && !program.format.includes(selectedFormat))
        return false;
      if (selectedDuration !== "all") {
        if (program.durationMonths) {
          const duration = durations.find((d) => d.id === selectedDuration);
          if (
            duration?.minMonths &&
            program.durationMonths < duration.minMonths
          )
            return false;
          if (
            duration?.maxMonths &&
            program.durationMonths > duration.maxMonths
          )
            return false;
        }
      }
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          program.name.toLowerCase().includes(query) ||
          program.description.toLowerCase().includes(query) ||
          program.category.toLowerCase().includes(query)
        );
      }
      return true;
    });
  }, [
    programs,
    selectedCategory,
    selectedLevel,
    selectedFormat,
    selectedDuration,
    searchQuery,
    durations,
  ]);

  // Sort programs
  const sortedPrograms = useMemo(() => {
    const sorted = [...filteredPrograms];
    switch (sortBy) {
      case "popular":
        return sorted.sort((a, b) => (b.popular ? 1 : 0) - (a.popular ? 1 : 0));
      case "rating":
        return sorted.sort((a, b) => b.rating - a.rating);
      case "price-low":
        return sorted.sort(
          (a, b) =>
            (a.basePrice || a.startingPrice || 0) -
            (b.basePrice || b.startingPrice || 0),
        );
      case "price-high":
        return sorted.sort(
          (a, b) =>
            (b.basePrice || b.startingPrice || 0) -
            (a.basePrice || a.startingPrice || 0),
        );
      case "students":
        return sorted.sort((a, b) => b.students - a.students);
      default:
        return sorted;
    }
  }, [filteredPrograms, sortBy]);

  const visiblePrograms = sortedPrograms.slice(0, visibleCount);
  const hasMore = visibleCount < sortedPrograms.length;

  const clearFilters = () => {
    setSelectedCategory("all");
    setSelectedLevel("all");
    setSelectedFormat("all");
    setSelectedDuration("all");
    setSearchQuery("");
    setSortBy("popular");
    setVisibleCount(6);
  };

  const activeFilterCount = [
    selectedCategory !== "all" ? 1 : 0,
    selectedLevel !== "all" ? 1 : 0,
    selectedFormat !== "all" ? 1 : 0,
    selectedDuration !== "all" ? 1 : 0,
    searchQuery ? 1 : 0,
    sortBy !== "popular" ? 1 : 0,
  ].reduce((a, b) => a + b, 0);

  return (
    <div className="space-y-10">
      {/* ==================== SEARCH BAR ==================== */}
      <div className="relative max-w-md">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search programs..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-11 pr-4 py-6 rounded-full border-2 border-primary-100/50 focus:border-primary-700 transition-all bg-background"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="absolute right-4 top-1/2 -translate-y-1/2"
          >
            <X className="w-4 h-4 text-muted-foreground hover:text-primary-700 transition-colors" />
          </button>
        )}
      </div>

      {/* ==================== CATEGORY PILLS ==================== */}
      <div className="overflow-x-auto pb-2 scrollbar-hide">
        <div className="flex items-center gap-3 min-w-max">
          <Filter className="w-4 h-4 text-primary-700 mr-1" />
          {categories.map((cat) => {
            const IconComponent =
              iconMap[cat.iconName as keyof typeof iconMap] || BookOpen;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  setSearchQuery("");
                  setVisibleCount(6);
                }}
                className={cn(
                  "inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-wider transition-all whitespace-nowrap",
                  selectedCategory === cat.id
                    ? "bg-primary-700 text-white shadow-md"
                    : "bg-primary-50 dark:bg-primary-950/40 text-primary-700 hover:bg-primary-100 dark:hover:bg-primary-900/60 border border-primary-100 dark:border-primary-800",
                )}
              >
                <IconComponent className="w-4 h-4" />
                {cat.name}
                <span
                  className={cn(
                    "text-[10px]",
                    selectedCategory === cat.id
                      ? "text-white/70"
                      : "text-primary-700/70",
                  )}
                >
                  {cat.count}
                </span>
              </button>
            );
          })}
   <div className="flex flex-wrap items-center gap-4">
          {/* Level Filter */}
          {/* <div className="flex items-center gap-2">
            <span className="text-xs font-black uppercase tracking-wider text-muted-foreground">
              Level:
            </span>
            <select
              value={selectedLevel}
              onChange={(e) => {
                setSelectedLevel(e.target.value);
                setVisibleCount(6);
              }}
              className="px-3 py-2 rounded-full text-xs font-black border border-border bg-background focus:border-primary-700 outline-none transition-all"
            >
              {levels.map((level) => (
                <option key={level.id} value={level.id}>
                  {level.name}
                </option>
              ))}
            </select>
          </div> */}

          {/* Format Filter */}
          {/* <div className="flex items-center gap-2">
            <span className="text-xs font-black uppercase tracking-wider text-muted-foreground">
              Format:
            </span>
            <select
              value={selectedFormat}
              onChange={(e) => {
                setSelectedFormat(e.target.value);
                setVisibleCount(6);
              }}
              className="px-3 py-2 rounded-full text-xs font-black border border-border bg-background focus:border-primary-700 outline-none transition-all"
            >
              {formats.map((format) => (
                <option key={format.id} value={format.id}>
                  {format.name}
                </option>
              ))}
            </select>
          </div> */}

          {/* Duration Filter */}
          {/* <div className="flex items-center gap-2">
            <span className="text-xs font-black uppercase tracking-wider text-muted-foreground">
              Duration:
            </span>
            <select
              value={selectedDuration}
              onChange={(e) => {
                setSelectedDuration(e.target.value);
                setVisibleCount(6);
              }}
              className="px-3 py-2 rounded-full text-xs font-black border border-border bg-background focus:border-primary-700 outline-none transition-all"
            >
              {durations.map((duration) => (
                <option key={duration.id} value={duration.id}>
                  {duration.name}
                </option>
              ))}
            </select>
          </div> */}

          {/* Sort */}
          {/* <div className="flex items-center gap-2">
            <span className="text-xs font-black uppercase tracking-wider text-muted-foreground">
              Sort:
            </span>
            <select
              value={sortBy}
              onChange={(e) => {
                setSortBy(e.target.value);
                setVisibleCount(6);
              }}
              className="px-3 py-2 rounded-full text-xs font-black border border-border bg-background focus:border-primary-700 outline-none transition-all"
            >
              <option value="popular">Most Popular</option>
              <option value="rating">Highest Rated</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="students">Most Students</option>
            </select>
          </div> */}
        </div>
      </div>
      </div>

      {/* ==================== FILTERS SECTION ==================== */}
      {/* <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-border/50"> */}
       
        {/* {activeFilterCount > 0 && (
          <Button
            variant="ghost"
            onClick={clearFilters}
            className="text-xs text-primary-700 hover:text-primary-800 gap-1"
          >
            <X className="w-3.5 h-3.5" />
            Clear ({activeFilterCount})
          </Button>
        )} */}
      {/* </div> */}

      {/* ==================== RESULTS COUNT ==================== */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing{" "}
          <span className="font-black text-primary-700">
            {visiblePrograms.length}
          </span>{" "}
          of{" "}
          <span className="font-black text-primary-700">
            {sortedPrograms.length}
          </span>{" "}
          programs
        </p>
      </div>

      {/* ==================== COURSE GRID ==================== */}
      {sortedPrograms.length === 0 ? (
        <div className="text-center py-20">
          <div className="w-20 h-20 mx-auto rounded-full bg-primary-50 dark:bg-primary-950/40 flex items-center justify-center mb-4">
            <Search className="w-10 h-10 text-primary-700/50" />
          </div>
          <h3 className="text-2xl font-black tracking-tighter mb-2">
            No programs found
          </h3>
          <p className="text-muted-foreground mb-6">
            Try adjusting your filters or search query
          </p>
          <Button
            onClick={clearFilters}
            variant="outline"
            className="rounded-full"
          >
            Clear all filters
          </Button>
        </div>
      ) : (
        <>
          <div className="grid md:grid-cols-2 gap-8">
            {visiblePrograms.map((program) => (
              <CourseCard key={program.id} program={program} />
            ))}
          </div>

          {/* Load More */}
          {hasMore && (
            <div className="text-center mt-12">
              <Button
                onClick={() => setVisibleCount((prev) => prev + 6)}
                variant="outline"
                className="rounded-full px-8 py-4 font-black group"
              >
                Load More Programs
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}