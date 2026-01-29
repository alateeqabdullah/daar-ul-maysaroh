"use client";

import { Search, Filter, Grid3X3, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CourseFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  courseType: string;
  onCourseTypeChange: (value: string) => void;
  level: string;
  onLevelChange: (value: string) => void;
  viewMode: "grid" | "list";
  onViewModeChange: (mode: "grid" | "list") => void;
  resultsCount: number;
  totalCount: number;
  onClearFilters: () => void;
}

export function CourseFilters({
  searchTerm,
  onSearchChange,
  courseType,
  onCourseTypeChange,
  level,
  onLevelChange,
  viewMode,
  onViewModeChange,
  resultsCount,
  totalCount,
  onClearFilters,
}: CourseFiltersProps) {
  const hasActiveFilters =
    searchTerm || courseType !== "all" || level !== "all";

  return (
    <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
      {/* Search */}
      <div className="flex-1 w-full lg:max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <input
            type="text"
            placeholder="Search courses..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background"
          />
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 items-center">
        {/* Course Type Filter */}
        <div className="flex items-center space-x-2">
          <Filter className="w-4 h-4 text-muted-foreground" />
          <select
            value={courseType}
            onChange={(e) => onCourseTypeChange(e.target.value)}
            className="px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-sm"
          >
            <option value="all">All Types</option>
            <option value="ONE_ON_ONE">One-on-One</option>
            <option value="GROUP">Group Courses</option>
          </select>
        </div>

        {/* Level Filter */}
        <select
          value={level}
          onChange={(e) => onLevelChange(e.target.value)}
          className="px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-sm"
        >
          <option value="all">All Levels</option>
          <option value="BEGINNER">Beginner</option>
          <option value="INTERMEDIATE">Intermediate</option>
          <option value="ADVANCED">Advanced</option>
        </select>

        {/* View Toggle */}
        <div className="flex border border-border rounded-lg p-1">
          <button
            onClick={() => onViewModeChange("grid")}
            className={cn(
              "p-2 rounded-md transition-colors",
              viewMode === "grid"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Grid3X3 className="w-4 h-4" />
          </button>
          <button
            onClick={() => onViewModeChange("list")}
            className={cn(
              "p-2 rounded-md transition-colors",
              viewMode === "list"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Results Count & Clear Filters */}
      <div className="flex items-center space-x-4">
        <p className="text-sm text-muted-foreground">
          Showing {resultsCount} of {totalCount} courses
        </p>
        {hasActiveFilters && (
          <Button variant="outline" size="sm" onClick={onClearFilters}>
            Clear Filters
          </Button>
        )}
      </div>
    </div>
  );
}
