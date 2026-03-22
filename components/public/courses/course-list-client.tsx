// "use client";

// import { useState, useTransition, useMemo } from "react";
// import { CourseCard } from "./course-card";
// import { Reveal } from "@/components/shared/section-animation";
// import {
//   LayoutGrid,
//   List,
//   Search,
//   GraduationCap,
//   BookOpen,
//   ScrollText,
// } from "lucide-react";
// import { cn } from "@/lib/utils";

// export function CourseListClient({ dbPrograms }: { dbPrograms: any[] }) {
//   const [isPending, startTransition] = useTransition();
//   const [activeCategory, setActiveCategory] = useState("ALL");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [viewType, setViewType] = useState<"grid" | "list">("grid");

//   const categories = [
//     { id: "ALL", label: "All Curriculum", icon: LayoutGrid },
//     { id: "QURAN", label: "Hifz & Qira'at", icon: BookOpen },
//     { id: "TAJWEED", label: "Tajweed Mastery", icon: ScrollText },
//     { id: "ARABIC", label: "Classical Arabic", icon: GraduationCap },
//   ];

//   // Elite Filter Logic
//   const filtered = useMemo(() => {
//     return dbPrograms.filter((p) => {
//       const matchesCat =
//         activeCategory === "ALL" || p.category === activeCategory;
//       const matchesSearch = p.name
//         .toLowerCase()
//         .includes(searchQuery.toLowerCase());
//       return matchesCat && matchesSearch;
//     });
//   }, [activeCategory, searchQuery, dbPrograms]);

//   const handleCategoryChange = (id: string) => {
//     startTransition(() => {
//       setActiveCategory(id);
//     });
//   };

//   return (
//     <div className="space-y-12">
//       {/* --- COMMAND CENTER (SEARCH & FILTERS) --- */}
//       <Reveal delay={0.3}>
//         <div className="glass-surface p-6 rounded-4xl border shadow-xl space-y-6">
//           <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
//             {/* Search Architecture */}
//             <div className="relative w-full lg:max-w-md group">
//               <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary-700 transition-colors" />
//               <input
//                 type="text"
//                 placeholder="Search curriculum, scholars, or sciences..."
//                 className="w-full h-14 pl-12 pr-6 rounded-2xl bg-background border-2 border-transparent focus:border-primary-700/30 outline-none font-medium transition-all"
//                 onChange={(e) => setSearchQuery(e.target.value)}
//               />
//             </div>

//             {/* Category Command Bar */}
//             <div className="flex items-center gap-2 p-1.5 bg-muted/50 rounded-2xl overflow-x-auto max-w-full hide-scrollbar">
//               {categories.map((cat) => (
//                 <button
//                   key={cat.id}
//                   onClick={() => handleCategoryChange(cat.id)}
//                   className={cn(
//                     "flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap",
//                     activeCategory === cat.id
//                       ? "bg-primary-700 text-white shadow-lg"
//                       : "text-muted-foreground hover:text-primary-700 hover:bg-white dark:hover:bg-slate-900",
//                   )}
//                 >
//                   <cat.icon className="w-4 h-4" /> {cat.label}
//                 </button>
//               ))}
//             </div>

//             {/* View Switcher */}
//             <div className="hidden lg:flex items-center gap-2 border-l pl-6 border-border">
//               <button
//                 onClick={() => setViewType("grid")}
//                 className={cn(
//                   "p-3 rounded-lg transition-all",
//                   viewType === "grid"
//                     ? "bg-primary-700 text-white"
//                     : "hover:bg-muted",
//                 )}
//               >
//                 <LayoutGrid className="w-5 h-5" />
//               </button>
//               <button
//                 onClick={() => setViewType("list")}
//                 className={cn(
//                   "p-3 rounded-lg transition-all",
//                   viewType === "list"
//                     ? "bg-primary-700 text-white"
//                     : "hover:bg-muted",
//                 )}
//               >
//                 <List className="w-5 h-5" />
//               </button>
//             </div>
//           </div>
//         </div>
//       </Reveal>

//       {/* --- ACADEMIC GRID --- */}
//       <div
//         className={cn(
//           "grid gap-8 transition-all duration-500",
//           viewType === "grid"
//             ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
//             : "grid-cols-1",
//         )}
//       >
//         {filtered.map((program, index) => (
//           <Reveal key={program.id} delay={index * 0.05}>
//             <CourseCard program={program} viewType={viewType} />
//           </Reveal>
//         ))}
//       </div>

//       {/* Empty State */}
//       {filtered.length === 0 && (
//         <Reveal>
//           <div className="text-center py-40 glass-surface rounded-[4rem] border-2 border-dashed">
//             <Search className="w-16 h-16 mx-auto mb-6 text-muted-foreground opacity-20" />
//             <h3 className="text-2xl font-black uppercase tracking-tighter">
//               No Curriculum Found
//             </h3>
//             <p className="text-muted-foreground font-medium">
//               Try adjusting your search or category filters.
//             </p>
//           </div>
//         </Reveal>
//       )}
//     </div>
//   );
// }

"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  ChevronRight,
  Filter,
  X,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

// Icon mapping object - maps string names to actual components
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
};

interface Program {
  id: string;
  name: string;
  description: string;
  longDescription?: string;
  basePrice: number;
  category: string;
  subcategory?: string;
  duration: string;
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
  iconName: string; // ✅ This is a string now!
  color: string;
}

interface Category {
  id: string;
  name: string;
  iconName: string; // ✅ This is a string now!
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
}

interface CourseListClientProps {
  programs: Program[];
  categories: Category[];
  levels: Level[];
  formats: Format[];
  durations: Duration[];
}

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
  const [showFilters, setShowFilters] = useState(false);
  const [visibleCount, setVisibleCount] = useState(6);

  // Filter programs based on selections
  const filteredPrograms = useMemo(() => {
    return programs.filter((program) => {
      // Category filter
      if (selectedCategory !== "all" && program.category !== selectedCategory) {
        return false;
      }

      // Level filter
      if (selectedLevel !== "all" && program.level !== selectedLevel) {
        return false;
      }

      // Format filter
      if (
        selectedFormat !== "all" &&
        !program.format.includes(selectedFormat)
      ) {
        return false;
      }

      // Duration filter
      if (selectedDuration !== "all") {
        const duration = program.duration;
        if (selectedDuration === "3-6" && !duration.includes("6 months"))
          return false;
        if (
          selectedDuration === "6-12" &&
          !duration.includes("1 year") &&
          !duration.includes("8 months")
        )
          return false;
        if (
          selectedDuration === "1-2" &&
          !duration.includes("1.5") &&
          !duration.includes("2")
        )
          return false;
        if (
          selectedDuration === "2+" &&
          !duration.includes("2-3") &&
          !duration.includes("3")
        )
          return false;
      }

      // Search query
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
        return sorted.sort((a, b) => a.basePrice - b.basePrice);
      case "price-high":
        return sorted.sort((a, b) => b.basePrice - a.basePrice);
      case "students":
        return sorted.sort((a, b) => b.students - a.students);
      default:
        return sorted;
    }
  }, [filteredPrograms, sortBy]);

  // Paginate
  const visiblePrograms = sortedPrograms.slice(0, visibleCount);
  const hasMore = visibleCount < sortedPrograms.length;

  // Reset visible count when filters change
  useEffect(() => {
    setVisibleCount(6);
  }, [
    selectedCategory,
    selectedLevel,
    selectedFormat,
    selectedDuration,
    searchQuery,
    sortBy,
  ]);

  // Clear all filters
  const clearFilters = () => {
    setSelectedCategory("all");
    setSelectedLevel("all");
    setSelectedFormat("all");
    setSelectedDuration("all");
    setSearchQuery("");
    setSortBy("popular");
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
    <div className="space-y-8">
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden flex items-center justify-between">
        <Button
          variant="outline"
          onClick={() => setShowFilters(!showFilters)}
          className="w-full justify-between"
        >
          <span className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4" />
            Filters & Sort
          </span>
          <span className="flex items-center gap-2">
            {activeFilterCount > 0 && (
              <span className="bg-primary-700 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
            <ChevronRight
              className={cn(
                "w-4 h-4 transition-transform",
                showFilters && "rotate-90",
              )}
            />
          </span>
        </Button>
      </div>

      {/* Filter Section */}
      <div className={cn("space-y-6", !showFilters && "hidden lg:block")}>
        <AnimatePresence>
          {(showFilters || true) && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-6 overflow-hidden"
            >
              {/* Categories */}
              <div>
                <h3 className="text-sm font-black uppercase tracking-wider text-primary-700 mb-3">
                  Categories
                </h3>
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => {
                    const IconComponent =
                      iconMap[cat.iconName as keyof typeof iconMap] || BookOpen;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id)}
                        className={cn(
                          "inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider transition-all",
                          selectedCategory === cat.id
                            ? "bg-primary-700 text-white"
                            : "bg-primary-50 dark:bg-primary-950/40 text-primary-700 hover:bg-primary-100 dark:hover:bg-primary-900/60",
                        )}
                      >
                        <IconComponent className="w-3.5 h-3.5" />
                        {cat.name}
                        <span className="text-[10px] opacity-70">
                          ({cat.count})
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Levels & Formats Grid */}
              <div className="grid md:grid-cols-3 gap-6">
                {/* Level Filter */}
                <div>
                  <h3 className="text-sm font-black uppercase tracking-wider text-primary-700 mb-3">
                    Level
                  </h3>
                  <select
                    value={selectedLevel}
                    onChange={(e) => setSelectedLevel(e.target.value)}
                    className="w-full p-3 rounded-xl border border-border bg-background focus:border-primary-700 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
                  >
                    {levels.map((level) => (
                      <option key={level.id} value={level.id}>
                        {level.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Format Filter */}
                <div>
                  <h3 className="text-sm font-black uppercase tracking-wider text-primary-700 mb-3">
                    Format
                  </h3>
                  <select
                    value={selectedFormat}
                    onChange={(e) => setSelectedFormat(e.target.value)}
                    className="w-full p-3 rounded-xl border border-border bg-background focus:border-primary-700 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
                  >
                    {formats.map((format) => (
                      <option key={format.id} value={format.id}>
                        {format.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Duration Filter */}
                <div>
                  <h3 className="text-sm font-black uppercase tracking-wider text-primary-700 mb-3">
                    Duration
                  </h3>
                  <select
                    value={selectedDuration}
                    onChange={(e) => setSelectedDuration(e.target.value)}
                    className="w-full p-3 rounded-xl border border-border bg-background focus:border-primary-700 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
                  >
                    {durations.map((duration) => (
                      <option key={duration.id} value={duration.id}>
                        {duration.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Sort & Clear */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-4 border-t border-border/50">
                <div className="flex items-center gap-4">
                  <span className="text-sm font-black uppercase tracking-wider text-primary-700">
                    Sort by:
                  </span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="p-2 rounded-lg border border-border bg-background text-sm"
                  >
                    <option value="popular">Most Popular</option>
                    <option value="rating">Highest Rated</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="students">Most Students</option>
                  </select>
                </div>

                {activeFilterCount > 0 && (
                  <Button
                    variant="ghost"
                    onClick={clearFilters}
                    className="text-sm text-primary-700 hover:text-primary-800"
                  >
                    <X className="w-4 h-4 mr-1" />
                    Clear all filters ({activeFilterCount})
                  </Button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Results Count */}
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
        {sortedPrograms.length === 0 && (
          <p className="text-sm text-muted-foreground">
            Try adjusting your filters
          </p>
        )}
      </div>

      {/* Course Grid */}
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
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visiblePrograms.map((program, index) => {
              // Get the actual component from the map using the string name
              const IconComponent =
                iconMap[program.iconName as keyof typeof iconMap] || BookOpen;
              return (
                <motion.div
                  key={program.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="group relative h-full"
                >
                  <Link href={`/courses/${program.id}`}>
                    <div className="institutional-card p-5 sm:p-6 h-full flex flex-col hover:border-primary-700/30 transition-all duration-300 cursor-pointer">
                      {/* Badge */}
                      {program.badge && (
                        <div className="absolute top-4 right-4 z-10">
                          <div className="px-3 py-1 rounded-full bg-gradient-to-r from-primary-700 to-primary-800 text-white text-[10px] font-black uppercase tracking-wider">
                            {program.badge}
                          </div>
                        </div>
                      )}

                      {/* Icon - Now using mapped component */}
                      <div className="mb-4">
                        <div
                          className={cn(
                            "w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center",
                            program.color,
                          )}
                        >
                          <IconComponent className="w-6 h-6 text-white" />
                        </div>
                      </div>

                      {/* Title & Category */}
                      <h3 className="text-lg sm:text-xl font-black uppercase tracking-tight mb-1">
                        {program.name}
                      </h3>
                      <p className="text-xs text-primary-700 font-black uppercase tracking-wider mb-3">
                        {program.subcategory || program.category}
                      </p>

                      {/* Description */}
                      <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 mb-4 flex-grow">
                        {program.description}
                      </p>

                      {/* Meta Grid */}
                      <div className="grid grid-cols-2 gap-2 mb-4">
                        <div className="flex items-center gap-1.5 text-xs">
                          <Clock className="w-3.5 h-3.5 text-primary-700" />
                          <span className="font-medium">
                            {program.duration}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs">
                          <Users className="w-3.5 h-3.5 text-primary-700" />
                          <span className="font-medium">{program.format}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs">
                          <Calendar className="w-3.5 h-3.5 text-primary-700" />
                          <span className="font-medium">
                            {program.nextStart}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs">
                          <Star className="w-3.5 h-3.5 text-primary-700" />
                          <span className="font-medium">{program.rating}</span>
                          <span className="text-[10px] text-muted-foreground">
                            ({program.reviewCount})
                          </span>
                        </div>
                      </div>

                      {/* Price & CTA */}
                      <div className="flex items-center justify-between pt-4 border-t border-border/50">
                        <div>
                          <span className="text-xl font-black text-primary-700">
                            ${program.basePrice}
                          </span>
                          <span className="text-xs text-muted-foreground ml-1">
                            /mo
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-primary-700 font-black text-xs uppercase tracking-wider group-hover:gap-2 transition-all">
                          View Details
                          <ChevronRight className="w-4 h-4" />
                        </div>
                      </div>

                      {/* Popular Indicator */}
                      {program.popular && (
                        <div className="absolute top-4 left-4">
                          <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-gold/20 text-gold text-[8px] font-black uppercase tracking-wider">
                            <Sparkles className="w-3 h-3" />
                            Popular
                          </div>
                        </div>
                      )}
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* Load More */}
          {hasMore && (
            <div className="text-center mt-12">
              <Button
                onClick={() => setVisibleCount((prev) => prev + 6)}
                variant="outline"
                className="rounded-full px-8 py-4 font-black"
              >
                Load More Programs
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}