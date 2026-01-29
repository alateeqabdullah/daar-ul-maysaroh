"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface SidebarSearchProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export function SidebarSearch({
  searchQuery,
  onSearchChange,
}: SidebarSearchProps) {
  return (
    <div className="shrink-0 px-4 py-4">
      <div className="relative group">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary-700 dark:group-focus-within:text-primary-400" />
        <Input
          type="search"
          placeholder="Search menu..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full border-border/50 bg-background/50 pl-10 text-sm focus-visible:ring-primary-700 focus-visible:border-primary-700 rounded-2xl h-10 backdrop-blur-sm"
          aria-label="Search navigation menu"
        />
      </div>
    </div>
  );
}
