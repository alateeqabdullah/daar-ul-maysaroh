"use client";

import { useState, useTransition, useMemo } from "react";
import { CourseCard } from "./course-card";
import { Reveal } from "@/components/shared/section-animation";
import {
  LayoutGrid,
  List,
  Search,
  GraduationCap,
  BookOpen,
  ScrollText,
} from "lucide-react";
import { cn } from "@/lib/utils";

export function CourseListClient({ dbPrograms }: { dbPrograms: any[] }) {
  const [isPending, startTransition] = useTransition();
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewType, setViewType] = useState<"grid" | "list">("grid");

  const categories = [
    { id: "ALL", label: "All Curriculum", icon: LayoutGrid },
    { id: "QURAN", label: "Hifz & Qira'at", icon: BookOpen },
    { id: "TAJWEED", label: "Tajweed Mastery", icon: ScrollText },
    { id: "ARABIC", label: "Classical Arabic", icon: GraduationCap },
  ];

  // Elite Filter Logic
  const filtered = useMemo(() => {
    return dbPrograms.filter((p) => {
      const matchesCat =
        activeCategory === "ALL" || p.category === activeCategory;
      const matchesSearch = p.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      return matchesCat && matchesSearch;
    });
  }, [activeCategory, searchQuery, dbPrograms]);

  const handleCategoryChange = (id: string) => {
    startTransition(() => {
      setActiveCategory(id);
    });
  };

  return (
    <div className="space-y-12">
      {/* --- COMMAND CENTER (SEARCH & FILTERS) --- */}
      <Reveal delay={0.3}>
        <div className="glass-surface p-6 rounded-4xl border shadow-xl space-y-6">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search Architecture */}
            <div className="relative w-full lg:max-w-md group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary-700 transition-colors" />
              <input
                type="text"
                placeholder="Search curriculum, scholars, or sciences..."
                className="w-full h-14 pl-12 pr-6 rounded-2xl bg-background border-2 border-transparent focus:border-primary-700/30 outline-none font-medium transition-all"
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Category Command Bar */}
            <div className="flex items-center gap-2 p-1.5 bg-muted/50 rounded-2xl overflow-x-auto max-w-full hide-scrollbar">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryChange(cat.id)}
                  className={cn(
                    "flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap",
                    activeCategory === cat.id
                      ? "bg-primary-700 text-white shadow-lg"
                      : "text-muted-foreground hover:text-primary-700 hover:bg-white dark:hover:bg-slate-900",
                  )}
                >
                  <cat.icon className="w-4 h-4" /> {cat.label}
                </button>
              ))}
            </div>

            {/* View Switcher */}
            <div className="hidden lg:flex items-center gap-2 border-l pl-6 border-border">
              <button
                onClick={() => setViewType("grid")}
                className={cn(
                  "p-3 rounded-lg transition-all",
                  viewType === "grid"
                    ? "bg-primary-700 text-white"
                    : "hover:bg-muted",
                )}
              >
                <LayoutGrid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewType("list")}
                className={cn(
                  "p-3 rounded-lg transition-all",
                  viewType === "list"
                    ? "bg-primary-700 text-white"
                    : "hover:bg-muted",
                )}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </Reveal>

      {/* --- ACADEMIC GRID --- */}
      <div
        className={cn(
          "grid gap-8 transition-all duration-500",
          viewType === "grid"
            ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            : "grid-cols-1",
        )}
      >
        {filtered.map((program, index) => (
          <Reveal key={program.id} delay={index * 0.05}>
            <CourseCard program={program} viewType={viewType} />
          </Reveal>
        ))}
      </div>

      {/* Empty State */}
      {filtered.length === 0 && (
        <Reveal>
          <div className="text-center py-40 glass-surface rounded-[4rem] border-2 border-dashed">
            <Search className="w-16 h-16 mx-auto mb-6 text-muted-foreground opacity-20" />
            <h3 className="text-2xl font-black uppercase tracking-tighter">
              No Curriculum Found
            </h3>
            <p className="text-muted-foreground font-medium">
              Try adjusting your search or category filters.
            </p>
          </div>
        </Reveal>
      )}
    </div>
  );
}
