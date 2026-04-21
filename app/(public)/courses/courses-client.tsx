// components/public/courses/courses-client.tsx
"use client";

import { CourseCard } from "@/components/public/courses/course-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { ArrowRight, BookOpen, Filter, Globe, GraduationCap, Heart, Loader2, Mic, Search, X } from "lucide-react";
import { useMemo, useState } from "react";

 // Categories
 const CATEGORIES = [
   { id: "all", name: "All Programs", icon: BookOpen, count: 0 },
   { id: "QURAN", name: "Quran", icon: BookOpen, count: 0 },
   { id: "TAJWEED", name: "Tajweed", icon: Mic, count: 0 },
   { id: "ARABIC", name: "Arabic", icon: Globe, count: 0 },
   { id: "TAFSIR", name: "Tafsir", icon: GraduationCap, count: 0 },
   { id: "CHILDREN", name: "Children", icon: Heart, count: 0 },
 ];

// Sort Options
const SORT_OPTIONS = [
  { id: "popular", name: "Most Popular" },
  { id: "rating", name: "Highest Rated" },
  { id: "price-low", name: "Price: Low to High" },
  { id: "price-high", name: "Price: High to Low" },
  { id: "students", name: "Most Students" },
];

interface Program {
  id: string;
  name: string;
  description: string;
  category: string;
  subcategory: string;
  duration: string;
  level: string;
  format: string;
  basePrice: number;
  price: string;
  rating: number;
  students: number;
  features: string[];
  popular: boolean;
  badge?: string;
  iconName: string;
  color: string;
  href: string;
  isMock: boolean;
}

interface CoursesClientProps {
  initialPrograms: Program[];
}

export function CoursesClient({ initialPrograms }: CoursesClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("popular");
  const [visibleCount, setVisibleCount] = useState(6);
  const [isLoading, setIsLoading] = useState(false);
  const [viewType, setViewType] = useState<"grid" | "list">("grid");



    // Calculate category counts
  const categoriesWithCounts = CATEGORIES.map((cat) => ({
    ...cat,
    count: cat.id === "all" 
      ? initialPrograms.length 
      : initialPrograms.filter((c) => c.category === cat.id).length,
  }));

  // Filter and sort courses
  const filteredCourses = useMemo(() => {
    const filtered = initialPrograms.filter((course) => {
      const matchesCategory =
        selectedCategory === "all" || course.category === selectedCategory;
      const matchesSearch =
        searchQuery === "" ||
        course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });

    switch (sortBy) {
      case "popular":
        filtered.sort((a, b) => (b.popular ? 1 : 0) - (a.popular ? 1 : 0));
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "price-low":
        filtered.sort((a, b) => a.basePrice - b.basePrice);
        break;
      case "price-high":
        filtered.sort((a, b) => b.basePrice - a.basePrice);
        break;
      case "students":
        filtered.sort((a, b) => b.students - a.students);
        break;
    }
    return filtered;
  }, [initialPrograms, selectedCategory, searchQuery, sortBy]);

  const visibleCourses = filteredCourses.slice(0, visibleCount);
  const hasMore = visibleCount < filteredCourses.length;

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSortBy("popular");
  };

  const activeFilterCount = [
    selectedCategory !== "all" ? 1 : 0,
    searchQuery ? 1 : 0,
    sortBy !== "popular" ? 1 : 0,
  ].reduce((a, b) => a + b, 0);

  const loadMore = () => {
    setIsLoading(true);
    setTimeout(() => {
      setVisibleCount((prev) => prev + 6);
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Search Bar */}
      <div className="relative max-w-full sm:max-w-md">
        <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search programs..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9 sm:pl-11 pr-8 sm:pr-12 py-3.5 sm:py-5 rounded-full border-2 border-primary-100/50 focus:border-primary-700 transition-all bg-background text-sm sm:text-base"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2"
          >
            <X className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-muted-foreground hover:text-primary-700 transition-colors" />
          </button>
        )}
      </div>

   
      {/* Category Pills - Horizontal Scroll on Mobile with better UX */}
          <div className="overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4">
            <div className="flex items-center gap-1.5 sm:gap-2 min-w-max">
              <Filter className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary-600 mr-0.5 sm:mr-1 shrink-0" />
              {categoriesWithCounts.map((cat) => {
                const Icon = cat.icon;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={cn(
                      "inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-[9px] sm:text-xs font-black uppercase tracking-wider transition-all whitespace-nowrap touch-target",
                      selectedCategory === cat.id
                        ? "bg-primary-700 text-white shadow-md"
                        : "bg-primary-50 dark:bg-primary-950/40 text-primary-700 hover:bg-primary-100 dark:hover:bg-primary-900/60 border border-primary-100 dark:border-primary-800"
                    )}
                  >
                    <Icon className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    {cat.name}
                    <span className={cn(
                      "text-[8px] sm:text-[10px]",
                      selectedCategory === cat.id ? "text-white/70" : "text-primary-700/70"
                    )}>
                      ({cat.count})
                    </span>
                  </button>
                );
              })}
            </div>
          </div>


      {/* Sort, View Toggle & Clear Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 pt-1 sm:pt-2">
        <div className="flex items-center gap-2 sm:gap-3">
          <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-muted-foreground">
            Sort by:
          </span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-full text-[10px] sm:text-xs font-black border border-border bg-background focus:border-primary-700 outline-none transition-all"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.id} value={opt.id}>
                {opt.name}
              </option>
            ))}
          </select>
        </div>

        {/* View Toggle */}
        <div className="flex items-center gap-1 p-0.5 sm:p-1 rounded-full bg-muted/30 border border-border self-start sm:self-auto">
          <button
            onClick={() => setViewType("grid")}
            className={cn(
              "px-3 sm:px-3 py-1.5 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-black transition-all",
              viewType === "grid"
                ? "bg-primary-700 text-white"
                : "hover:bg-primary-100",
            )}
          >
            Grid
          </button>
          <button
            onClick={() => setViewType("list")}
            className={cn(
              "px-3 sm:px-3 py-1.5 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-black transition-all",
              viewType === "list"
                ? "bg-primary-700 text-white"
                : "hover:bg-primary-100",
            )}
          >
            List
          </button>
        </div>

        {activeFilterCount > 0 && (
          <Button
            variant="ghost"
            onClick={clearFilters}
            className="text-[10px] sm:text-xs text-primary-700 hover:text-primary-800 gap-1 px-2 sm:px-3 py-1.5 h-auto self-start sm:self-auto"
          >
            <X className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            Clear ({activeFilterCount})
          </Button>
        )}
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-[11px] sm:text-sm text-muted-foreground">
          Showing{" "}
          <span className="font-black text-primary-700">
            {visibleCourses.length}
          </span>{" "}
          of{" "}
          <span className="font-black text-primary-700">
            {filteredCourses.length}
          </span>{" "}
          programs
        </p>
      </div>

      {/* Course Grid/List */}
      {filteredCourses.length === 0 ? (
        <div className="text-center py-12 sm:py-16 md:py-20">
          <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-full bg-primary-50 dark:bg-primary-950/40 flex items-center justify-center mb-3 sm:mb-4">
            <Search className="w-8 h-8 sm:w-10 sm:h-10 text-primary-700/50" />
          </div>
          <h3 className="text-xl sm:text-2xl font-black tracking-tighter mb-2">
            No programs found
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground mb-4 sm:mb-6">
            Try adjusting your filters or search query
          </p>
          <Button
            onClick={clearFilters}
            variant="outline"
            className="rounded-full text-sm sm:text-base"
          >
            Clear all filters
          </Button>
        </div>
      ) : (
        <>
          <div
            className={cn(
              "grid gap-3 sm:gap-4 md:gap-6 lg:gap-8",
              viewType === "grid"
                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                : "grid-cols-1",
            )}
          >
            {visibleCourses.map((course) => (
              <CourseCard
                key={course.id}
                program={course}
                viewType={viewType}
              />
            ))}
          </div>

          {/* Load More */}
          {hasMore && (
            <div className="text-center mt-8 sm:mt-10 md:mt-12">
              <Button
                onClick={loadMore}
                disabled={isLoading}
                variant="outline"
                className="rounded-full px-6 sm:px-8 py-3 sm:py-4 font-black text-sm sm:text-base group"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    Load More Programs
                    <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-1.5 sm:ml-2 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
