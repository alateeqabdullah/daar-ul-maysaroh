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

import { useState, useMemo, useCallback, Fragment } from "react";
import {
  BookOpen,
  Mic,
  Globe,
  GraduationCap,
  Heart,
  Users,
  Award,
  Star,
  Clock,
  Calendar,
  Search,
  Filter,
  ChevronDown,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"; // Assuming you have a Shadcn Sheet component

// --- Interfaces for Type Safety ---
interface Program {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  basePrice: number;
  category: string;
  subcategory: string;
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
  curriculum: string[];
  prerequisites: string;
  outcomes: string[];
  isMock: boolean;
  popular: boolean;
  badge: string;
  iconName: string;
  color: string;
}

interface FilterOption {
  id: string;
  name: string;
  iconName?: string; // For categories
  count?: number; // For categories
}

interface CourseListClientProps {
  programs: Program[];
  categories: FilterOption[];
  levels: FilterOption[];
  formats: FilterOption[];
  durations: FilterOption[];
}

// --- Icon Map for dynamic rendering ---
const iconMap: { [key: string]: React.ElementType } = {
  BookOpen,
  Mic,
  Globe,
  GraduationCap,
  Heart,
  Users,
  Award,
  Star,
  Clock,
  Calendar,
  Filter,
  // Add any other Lucide icons that you might want to render dynamically via their string name
};

// --- Course Card Component ---
const CourseCard = ({ course }: { course: Program }) => {
  const IconComponent = iconMap[course.iconName || "BookOpen"]; // Default icon for safety

  return (
    <Link href={`/courses/${course.id}`} className="block h-full group">
      <div
        className={cn(
          "relative bg-background border border-border rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all transform hover:-translate-y-1 h-full flex flex-col justify-between",
          `bg-gradient-to-br ${course.color || "from-gray-100 to-gray-50"} dark:from-gray-900 dark:to-gray-800`, // Dynamic background gradient
        )}
      >
        {course.badge && (
          <span className="absolute top-4 right-4 px-3 py-1 bg-primary-700 text-white text-xs font-bold rounded-full z-10 shadow-md">
            {course.badge}
          </span>
        )}

        {/* Icon and Title */}
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 flex-shrink-0 rounded-full bg-white/20 flex items-center justify-center border border-white/30 shadow-inner">
            {IconComponent && <IconComponent className="w-6 h-6 text-white" />}
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white leading-tight">
            {course.name}
          </h3>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-200 mb-4 flex-grow line-clamp-3">
          {course.description}
        </p>

        {/* Details (Level, Format, Duration, Next Start) */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs text-gray-100 mb-4">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-4 h-4 opacity-70" />
            <span>{course.level}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 opacity-70" />
            <span>{course.format}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 opacity-70" />
            <span>{course.duration}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 opacity-70" />
            <span>{course.nextStart}</span>
          </div>
        </div>

        {/* Price and Rating */}
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/10">
          <span className="text-lg font-bold text-white">
            ${course.basePrice}
            <span className="text-sm font-normal">/month</span>
          </span>
          <span className="flex items-center gap-1 text-yellow-300 font-medium">
            <Star className="w-4 h-4" fill="currentColor" />
            {course.rating.toFixed(1)} ({course.reviewCount})
          </span>
        </div>
      </div>
    </Link>
  );
};

// --- CourseListClient Component ---
export function CourseListClient({
  programs,
  categories,
  levels,
  formats,
  durations,
}: CourseListClientProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [selectedFormat, setSelectedFormat] = useState("all");
  const [selectedDuration, setSelectedDuration] = useState("all");
  const [isFilterSheetOpen, setIsFilterSheetOpen] = useState(false); // State for mobile filter sheet

  // Memoized filtering logic to optimize performance
  const filteredPrograms = useMemo(() => {
    let filtered = programs;

    // 1. Search Filter
    if (searchTerm) {
      filtered = filtered.filter(
        (p: Program) =>
          p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.category.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    // 2. Category Filter
    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (p: Program) => p.category === selectedCategory,
      );
    }

    // 3. Level Filter
    if (selectedLevel !== "all") {
      filtered = filtered.filter((p: Program) => p.level === selectedLevel);
    }

    // 4. Format Filter
    if (selectedFormat !== "all") {
      filtered = filtered.filter((p: Program) => p.format === selectedFormat);
    }

    // 5. Duration Filter (Robust parsing logic)
    if (selectedDuration !== "all") {
      filtered = filtered.filter((p: Program) => {
        const pDuration = p.duration;
        if (!pDuration) return false;

        let pMinMonths = 0;
        let pMaxMonths = Infinity;

        // Simple parsing for common formats
        const monthMatch = pDuration.match(/(\d+)-?(\d+)?\s*month/);
        const yearMatch = pDuration.match(/(\d+)-?(\d+)?\s*year/);

        if (monthMatch) {
          pMinMonths = parseInt(monthMatch[1], 10);
          pMaxMonths = monthMatch[2] ? parseInt(monthMatch[2], 10) : pMinMonths;
        } else if (yearMatch) {
          pMinMonths = parseInt(yearMatch[1], 10) * 12;
          pMaxMonths = yearMatch[2]
            ? parseInt(yearMatch[2], 10) * 12
            : pMinMonths;
        } else {
          // Handle specific hardcoded durations if they don't fit the pattern
          switch (pDuration) {
            case "3-6 months":
              pMinMonths = 3;
              pMaxMonths = 6;
              break;
            case "6 months":
              pMinMonths = 6;
              pMaxMonths = 6;
              break;
            case "8 months":
              pMinMonths = 8;
              pMaxMonths = 8;
              break;
            case "1 year":
              pMinMonths = 12;
              pMaxMonths = 12;
              break;
            case "1.5 years":
              pMinMonths = 18;
              pMaxMonths = 18;
              break;
            case "2-3 years":
              pMinMonths = 24;
              pMaxMonths = 36;
              break;
            case "3-6 months":
              pMinMonths = 3;
              pMaxMonths = 6;
              break;
            case "TBD":
              return false; // Exclude programs with TBD duration
            default:
              return true; // Include if duration cannot be parsed
          }
        }

        // Apply filter logic based on selectedDuration
        switch (selectedDuration) {
          case "3-6":
            return pMaxMonths >= 3 && pMinMonths <= 6;
          case "6-12":
            return pMaxMonths >= 6 && pMinMonths <= 12;
          case "1-2":
            return pMaxMonths >= 12 && pMinMonths <= 24;
          case "2+":
            return pMaxMonths > 24; // strictly greater than 2 years (24 months)
          default:
            return true;
        }
      });
    }

    return filtered;
  }, [
    searchTerm,
    selectedCategory,
    selectedLevel,
    selectedFormat,
    selectedDuration,
    programs,
  ]);

  // Check if any filters are active to show a clear button/indicator
  const hasActiveFilters = useMemo(() => {
    return (
      searchTerm !== "" ||
      selectedCategory !== "all" ||
      selectedLevel !== "all" ||
      selectedFormat !== "all" ||
      selectedDuration !== "all"
    );
  }, [
    searchTerm,
    selectedCategory,
    selectedLevel,
    selectedFormat,
    selectedDuration,
  ]);

  // Callback to clear all filters
  const clearAllFilters = useCallback(() => {
    setSearchTerm("");
    setSelectedCategory("all");
    setSelectedLevel("all");
    setSelectedFormat("all");
    setSelectedDuration("all");
    setIsFilterSheetOpen(false); // Close the sheet if open
  }, []);

  // Icon map for categories in filter (can be a subset if needed)
  const filterIconMap: { [key: string]: React.ElementType } = {
    BookOpen,
    Mic,
    Globe,
    GraduationCap,
    Heart,
    Award,
    Users,
    Clock,
  };

  return (
    <div className="px-2 sm:px-0">
      {/* Search Input and Mobile Filter Button */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mb-6">
        {/* Search Input */}
        <div className="relative flex-grow">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search programs..."
            className="w-full pl-12 pr-4 py-6 rounded-full border-2 border-primary-100/50 focus:border-primary-700 transition-all text-base"
            aria-label="Search courses"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full"
              onClick={() => setSearchTerm("")}
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>

        {/* Mobile Filter Sheet Trigger */}
        <Sheet open={isFilterSheetOpen} onOpenChange={setIsFilterSheetOpen}>
          <SheetTrigger asChild className="sm:hidden">
            {" "}
            {/* Only show on mobile */}
            <Button
              variant="outline"
              className="flex items-center gap-2 rounded-full px-5 py-6 h-auto text-base font-medium border-2 border-primary-100/50 hover:bg-primary-50 dark:hover:bg-primary-900/20"
            >
              <Filter className="w-4 h-4" />
              Filters{" "}
              {hasActiveFilters && (
                <span className="w-2 h-2 bg-primary-700 rounded-full" />
              )}
            </Button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="w-full sm:max-w-md p-6 overflow-y-auto"
          >
            <SheetHeader className="pb-4 border-b border-border">
              <SheetTitle className="text-2xl font-bold">
                Filter Courses
              </SheetTitle>
              <SheetDescription>
                Refine your search with specific criteria.
              </SheetDescription>
            </SheetHeader>

            <div className="grid gap-6 mt-8">
              {/* Category Filter in Sheet */}
              <div>
                <h3 className="text-lg font-semibold mb-3 text-foreground">
                  Category
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {categories.map((cat) => {
                    const CategoryIcon =
                      filterIconMap[cat.iconName || "BookOpen"];
                    return (
                      <Button
                        key={cat.id}
                        variant={
                          selectedCategory === cat.id ? "default" : "outline"
                        }
                        onClick={() => setSelectedCategory(cat.id)}
                        className={cn(
                          "rounded-lg px-4 py-3 text-sm font-medium transition-all h-auto",
                          selectedCategory === cat.id
                            ? "bg-primary-700 text-white hover:bg-primary-800"
                            : "border-border text-muted-foreground hover:bg-muted/50 dark:border-gray-700 dark:hover:bg-gray-800",
                          "flex items-center justify-start gap-2",
                        )}
                      >
                        {CategoryIcon && <CategoryIcon className="w-4 h-4" />}
                        {cat.name} ({cat.count})
                      </Button>
                    );
                  })}
                </div>
              </div>

              {/* Other Dropdown Filters in Sheet */}
              <div>
                <h3 className="text-lg font-semibold mb-3 text-foreground">
                  Level
                </h3>
                <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                  <SelectTrigger className="w-full rounded-lg h-12">
                    <SelectValue placeholder="Select Level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {levels.map((level) => (
                        <SelectItem key={level.id} value={level.id}>
                          {level.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3 text-foreground">
                  Format
                </h3>
                <Select
                  value={selectedFormat}
                  onValueChange={setSelectedFormat}
                >
                  <SelectTrigger className="w-full rounded-lg h-12">
                    <SelectValue placeholder="Select Format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {formats.map((format) => (
                        <SelectItem key={format.id} value={format.id}>
                          {format.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3 text-foreground">
                  Duration
                </h3>
                <Select
                  value={selectedDuration}
                  onValueChange={setSelectedDuration}
                >
                  <SelectTrigger className="w-full rounded-lg h-12">
                    <SelectValue placeholder="Select Duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {durations.map((duration) => (
                        <SelectItem key={duration.id} value={duration.id}>
                          {duration.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              {/* Clear Filters Button in Sheet */}
              {hasActiveFilters && (
                <Button
                  variant="ghost"
                  onClick={clearAllFilters}
                  className="w-full rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 mt-4 h-12"
                >
                  <X className="w-4 h-4 mr-2" />
                  Clear All Filters
                </Button>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Category Buttons (Horizontal Scroll for Mobile, Wrap for Desktop) */}
      <div className="mb-8 flex flex-nowrap overflow-x-auto gap-2 sm:gap-4 pb-2 -mx-2 sm:mx-0 px-2 sm:px-0 scrollbar-hide">
        {categories.map((cat) => {
          const CategoryIcon = filterIconMap[cat.iconName || "BookOpen"];
          return (
            <Button
              key={cat.id}
              variant={selectedCategory === cat.id ? "default" : "outline"}
              onClick={() => setSelectedCategory(cat.id)}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-all flex-shrink-0 whitespace-nowrap h-auto",
                selectedCategory === cat.id
                  ? "bg-primary-700 text-white hover:bg-primary-800"
                  : "border-border text-muted-foreground hover:bg-muted/50 dark:border-gray-700 dark:hover:bg-gray-800",
                "flex items-center gap-1.5",
              )}
            >
              {CategoryIcon && <CategoryIcon className="w-4 h-4" />}
              {cat.name} ({cat.count})
            </Button>
          );
        })}
      </div>

      {/* Desktop Filter Dropdowns (Hidden on Mobile) */}
      <div className="hidden sm:flex flex-wrap items-center gap-4 mb-8">
        {/* Clear Filters Button for Desktop */}
        {hasActiveFilters && (
          <Button
            variant="ghost"
            onClick={clearAllFilters}
            className="rounded-full text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20"
          >
            <X className="w-4 h-4 mr-1" />
            Clear Filters
          </Button>
        )}

        <Select value={selectedLevel} onValueChange={setSelectedLevel}>
          <SelectTrigger className="w-[180px] rounded-full">
            <Filter className="w-4 h-4 mr-2 text-muted-foreground" />
            <SelectValue placeholder="Filter by Level" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {levels.map((level) => (
                <SelectItem key={level.id} value={level.id}>
                  {level.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select value={selectedFormat} onValueChange={setSelectedFormat}>
          <SelectTrigger className="w-[180px] rounded-full">
            <Users className="w-4 h-4 mr-2 text-muted-foreground" />
            <SelectValue placeholder="Filter by Format" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {formats.map((format) => (
                <SelectItem key={format.id} value={format.id}>
                  {format.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select value={selectedDuration} onValueChange={setSelectedDuration}>
          <SelectTrigger className="w-[200px] rounded-full">
            <Clock className="w-4 h-4 mr-2 text-muted-foreground" />
            <SelectValue placeholder="Filter by Duration" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {durations.map((duration) => (
                <SelectItem key={duration.id} value={duration.id}>
                  {duration.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* Course Grid */}
      {filteredPrograms.length === 0 ? (
        <div className="text-center py-10 text-muted-foreground text-lg sm:text-xl">
          No programs found matching your criteria.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPrograms.map((program) => (
            <CourseCard key={program.id} course={program} />
          ))}
        </div>
      )}
    </div>
  );
}