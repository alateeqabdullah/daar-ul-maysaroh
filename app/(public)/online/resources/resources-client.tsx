// app/resources/resources-client.tsx
"use client";

import { useState } from "react";
import { Reveal } from "@/components/shared/section-animation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  BookOpen,
  Download,
  FileText,
  Mic,
  Star,
  Users,
  ArrowRight,
  Sparkles,
  Search,
  X,
  Filter,
  CheckCircle2,
  Clock,
  Eye,
  Heart,
  Award,
  Crown,
  Scroll,
  Shield,
  GraduationCap,
  Globe,
  Video,
  Headphones,
  PenTool,
  Calendar,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Resource Categories
const CATEGORIES = [
  { id: "all", name: "All Resources", icon: BookOpen, count: 24 },
  { id: "guides", name: "Learning Guides", icon: FileText, count: 8 },
  { id: "worksheets", name: "Worksheets", icon: PenTool, count: 6 },
  { id: "audio", name: "Audio Resources", icon: Headphones, count: 4 },
  { id: "video", name: "Video Tutorials", icon: Video, count: 3 },
  { id: "trackers", name: "Progress Trackers", icon: Calendar, count: 3 },
];

// Resources Data
const RESOURCES = [
  {
    id: "tajweed-guide",
    title: "Complete Tajweed Guide",
    description:
      "A comprehensive guide to Tajweed rules with examples and practice exercises.",
    type: "guide",
    format: "PDF",
    pages: 48,
    level: "Beginner to Advanced",
    icon: BookOpen,
    color: "purple",
    downloads: 1240,
    featured: true,
    downloadUrl: "/resources/tajweed-guide.pdf",
    previewUrl: "/resources/preview/tajweed-guide",
  },
  {
    id: "hifz-tracker",
    title: "Hifz Progress Tracker",
    description:
      "Track your memorization progress with daily, weekly, and monthly logs.",
    type: "tracker",
    format: "Excel/PDF",
    pages: 12,
    level: "All Levels",
    icon: Calendar,
    color: "amber",
    downloads: 890,
    featured: true,
    downloadUrl: "/resources/hifz-tracker.xlsx",
    previewUrl: "/resources/preview/hifz-tracker",
  },
  {
    id: "arabic-alphabet",
    title: "Arabic Alphabet Worksheet",
    description:
      "Practice writing Arabic letters with guided tracing exercises.",
    type: "worksheet",
    format: "PDF",
    pages: 34,
    level: "Beginner",
    icon: PenTool,
    color: "purple",
    downloads: 2100,
    featured: true,
    downloadUrl: "/resources/arabic-alphabet.pdf",
    previewUrl: "/resources/preview/arabic-alphabet",
  },
  {
    id: "makharij-guide",
    title: "Makharij (Articulation Points)",
    description:
      "Learn the correct pronunciation points of Arabic letters with diagrams.",
    type: "guide",
    format: "PDF",
    pages: 28,
    level: "Intermediate",
    icon: Mic,
    color: "amber",
    downloads: 980,
    featured: false,
    downloadUrl: "/resources/makharij-guide.pdf",
    previewUrl: "/resources/preview/makharij-guide",
  },
  {
    id: "daily-revision-planner",
    title: "Daily Revision Planner",
    description:
      "Plan your Quran revision with structured daily and weekly schedules.",
    type: "tracker",
    format: "PDF",
    pages: 8,
    level: "All Levels",
    icon: Calendar,
    color: "purple",
    downloads: 1560,
    featured: false,
    downloadUrl: "/resources/revision-planner.pdf",
    previewUrl: "/resources/preview/revision-planner",
  },
  {
    id: "surah-list",
    title: "Complete Surah List (Arabic/English)",
    description: "Full list of 114 Surahs with meanings and page references.",
    type: "guide",
    format: "PDF",
    pages: 24,
    level: "All Levels",
    icon: BookOpen,
    color: "amber",
    downloads: 3420,
    featured: true,
    downloadUrl: "/resources/surah-list.pdf",
    previewUrl: "/resources/preview/surah-list",
  },
  {
    id: "tajweed-rules-poster",
    title: "Tajweed Rules Poster",
    description:
      "Visual poster summarizing key Tajweed rules for quick reference.",
    type: "guide",
    format: "PDF",
    pages: 1,
    level: "All Levels",
    icon: Award,
    color: "purple",
    downloads: 2870,
    featured: false,
    downloadUrl: "/resources/tajweed-poster.pdf",
    previewUrl: "/resources/preview/tajweed-poster",
  },
  {
    id: "recitation-practice",
    title: "Recitation Practice Audio Set",
    description:
      "Audio recordings of common Surahs for practice and repetition.",
    type: "audio",
    format: "MP3",
    pages: 15,
    level: "Beginner",
    icon: Headphones,
    color: "amber",
    downloads: 430,
    featured: false,
    downloadUrl: "/resources/recitation-audio.zip",
    previewUrl: "/resources/preview/recitation-audio",
  },
];

const getColorStyles = (color: string) => {
  const styles = {
    purple: {
      text: "text-purple-600 dark:text-purple-400",
      border: "border-purple-200 dark:border-purple-800",
      bg: "bg-purple-100 dark:bg-purple-950/40",
      gradient: "from-purple-600 to-purple-700",
      badge: "bg-purple-600",
    },
    amber: {
      text: "text-amber-600 dark:text-amber-400",
      border: "border-amber-200 dark:border-amber-800",
      bg: "bg-amber-100 dark:bg-amber-950/40",
      gradient: "from-amber-500 to-amber-600",
      badge: "bg-amber-500",
    },
  };
  return styles[color as keyof typeof styles] || styles.purple;
};

// Structured data for JSON-LD
const structuredData = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Al-Maysaroh Learning Resources",
  description:
    "Free Quran learning resources including guides, worksheets, audio, and video materials.",
  url: "https://almaysaroh.com/resources",
  numberOfItems: RESOURCES.length,
};

export default function ResourcesClient() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredResources = RESOURCES.filter((resource) => {
    const matchesCategory =
      activeCategory === "all" || resource.type === activeCategory;
    const matchesSearch =
      searchQuery === "" ||
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredResources = RESOURCES.filter((r) => r.featured);
  const regularResources = filteredResources.filter((r) => !r.featured);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <main className="relative bg-background overflow-hidden min-h-screen">
        {/* Background */}
        <div className="hidden sm:block fixed inset-0 pointer-events-none">
          <div
            className="absolute inset-0 opacity-[0.02] bg-[url('/islamic-pattern.svg')] bg-center bg-repeat"
            style={{ backgroundSize: "300px" }}
          />
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-600/5 rounded-full blur-[150px]" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-[150px]" />
        </div>

        <div className="container mx-auto px-4 xs:px-5 sm:px-6">
          {/* Breadcrumb */}
          <div className="pt-20 xs:pt-24 sm:pt-28 md:pt-32 lg:pt-36">
            <nav className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground flex items-center gap-2 mb-6 xs:mb-8 flex-wrap">
              <Link
                href="/"
                className="hover:text-purple-600 transition-colors"
              >
                Home
              </Link>
              <span className="opacity-30">/</span>
              <span className="text-purple-600">Resources</span>
            </nav>
          </div>

          {/* Hero Section */}
          <div className="text-center max-w-3xl mx-auto mb-10 xs:mb-12 sm:mb-16">
            <Reveal>
              <div className="inline-flex items-center gap-1.5 px-2.5 xs:px-3 py-1 xs:py-1.5 rounded-full bg-purple-100 dark:bg-purple-900/30 border border-purple-200 dark:border-purple-800 mb-3 xs:mb-4">
                <Sparkles className="w-3 h-3 xs:w-3.5 xs:h-3.5 text-amber-500" />
                <span className="text-[8px] xs:text-[9px] sm:text-[10px] font-black uppercase tracking-wider text-purple-700">
                  Free Learning Materials
                </span>
              </div>
              <h1 className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl font-black tracking-tighter font-heading leading-[1.1] mb-3 xs:mb-4">
                Quran Learning{" "}
                <span className="bg-gradient-to-r from-purple-600 to-amber-600 bg-clip-text text-transparent italic">
                  Resources
                </span>
              </h1>
              <p className="text-sm xs:text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
                Free downloadable guides, worksheets, and tools to support your
                Quran learning journey. All resources are created by our
                certified scholars.
              </p>
            </Reveal>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 xs:gap-4 mb-10 xs:mb-12 sm:mb-16">
            {[
              {
                value: "24+",
                label: "Free Resources",
                icon: BookOpen,
                color: "purple",
              },
              {
                value: "15k+",
                label: "Downloads",
                icon: Download,
                color: "amber",
              },
              {
                value: "8",
                label: "Learning Guides",
                icon: FileText,
                color: "purple",
              },
              {
                value: "100%",
                label: "Free Access",
                icon: Heart,
                color: "amber",
              },
            ].map((stat, idx) => {
              const Icon = stat.icon;
              const colors = getColorStyles(stat.color);
              return (
                <Reveal key={idx} delay={idx * 0.1}>
                  <div className="text-center p-2 xs:p-3 rounded-xl bg-card border border-purple-200 dark:border-purple-800">
                    <Icon
                      className={`w-4 h-4 xs:w-5 xs:h-5 ${colors.text} mx-auto mb-1`}
                    />
                    <div
                      className={`text-lg xs:text-xl sm:text-2xl font-black ${colors.text}`}
                    >
                      {stat.value}
                    </div>
                    <div className="text-[8px] xs:text-[9px] font-black uppercase tracking-wider text-muted-foreground">
                      {stat.label}
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>

          {/* Featured Resources */}
          <div className="mb-12 xs:mb-16">
            <div className="flex items-center gap-2 mb-4 xs:mb-5">
              <Crown className="w-4 h-4 text-amber-500" />
              <h2 className="text-sm xs:text-base font-black uppercase tracking-wider text-purple-600">
                Featured Resources
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 xs:gap-6">
              {featuredResources.map((resource, idx) => {
                const Icon = resource.icon;
                const colors = getColorStyles(resource.color);
                return (
                  <Reveal key={resource.id} delay={idx * 0.1}>
                    <div
                      className={`bg-card rounded-xl border-2 ${colors.border} hover:border-purple-300 transition-all p-5 xs:p-6 h-full flex flex-col group`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div
                          className={`w-10 h-10 rounded-lg ${colors.bg} flex items-center justify-center group-hover:scale-110 transition-transform`}
                        >
                          <Icon className={`w-5 h-5 ${colors.text}`} />
                        </div>
                        <span
                          className={`px-2 py-0.5 rounded-full text-[8px] font-black text-white ${colors.badge}`}
                        >
                          {resource.format}
                        </span>
                      </div>
                      <h3 className="font-black text-base xs:text-lg mb-1 group-hover:text-purple-600 transition-colors">
                        {resource.title}
                      </h3>
                      <p className="text-xs xs:text-sm text-muted-foreground mb-3 flex-1">
                        {resource.description}
                      </p>
                      <div className="flex items-center gap-3 text-[9px] xs:text-[10px] text-muted-foreground mb-3">
                        <span>{resource.pages} pages</span>
                        <span>•</span>
                        <span>{resource.level}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Download className="w-2.5 h-2.5" />{" "}
                          {resource.downloads}
                        </span>
                      </div>
                      <Link href={resource.downloadUrl} download>
                        <Button className="w-full rounded-lg py-2 text-xs font-black bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white">
                          Download Now
                          <Download className="w-3 h-3 ml-1.5" />
                        </Button>
                      </Link>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>

          {/* Search & Filter */}
          <div className="mb-8 xs:mb-10">
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
              <div className="relative w-full sm:max-w-md">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search resources..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-10 py-2.5 xs:py-3 rounded-full border-2 border-purple-200 dark:border-purple-800 bg-background focus:border-purple-500 outline-none text-sm transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-4 top-1/2 -translate-y-1/2"
                  >
                    <X className="w-4 h-4 text-muted-foreground hover:text-purple-600" />
                  </button>
                )}
              </div>

              <div className="flex gap-1 p-1 rounded-lg bg-muted/30">
                <button
                  onClick={() => setViewMode("grid")}
                  className={cn(
                    "p-1.5 rounded-md transition-all",
                    viewMode === "grid"
                      ? "bg-purple-600 text-white"
                      : "text-muted-foreground",
                  )}
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                    />
                  </svg>
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={cn(
                    "p-1.5 rounded-md transition-all",
                    viewMode === "list"
                      ? "bg-purple-600 text-white"
                      : "text-muted-foreground",
                  )}
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Categories */}
            <div className="flex flex-wrap justify-center gap-2 mt-4 xs:mt-6">
              {CATEGORIES.map((cat) => {
                const Icon = cat.icon;
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={cn(
                      "px-3 xs:px-4 py-1.5 xs:py-2 rounded-full text-[8px] xs:text-[9px] sm:text-[10px] font-black uppercase tracking-wider transition-all flex items-center gap-1.5",
                      isActive
                        ? "bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-md"
                        : "bg-muted/30 hover:bg-purple-100 dark:hover:bg-purple-950/40 border border-purple-200 dark:border-purple-800",
                    )}
                  >
                    <Icon className="w-3 h-3" />
                    {cat.name}
                    <span className="text-[7px] xs:text-[8px] opacity-70">
                      ({cat.count})
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="text-center mt-4 xs:mt-5">
              <p className="text-[9px] xs:text-[10px] text-muted-foreground">
                Showing{" "}
                <span className="font-black text-purple-600">
                  {filteredResources.length}
                </span>{" "}
                resources
              </p>
            </div>
          </div>

          {/* Resources Grid/List */}
          {filteredResources.length === 0 ? (
            <div className="text-center py-12 xs:py-16">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted/30 flex items-center justify-center">
                <Search className="w-8 h-8 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground">
                No resources found matching your criteria.
              </p>
              <button
                onClick={() => {
                  setActiveCategory("all");
                  setSearchQuery("");
                }}
                className="text-purple-600 font-black text-sm mt-2 hover:underline"
              >
                Clear all filters
              </button>
            </div>
          ) : viewMode === "grid" ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 xs:gap-6">
              {regularResources.map((resource, idx) => {
                const Icon = resource.icon;
                const colors = getColorStyles(resource.color);
                return (
                  <Reveal key={resource.id} delay={idx * 0.05}>
                    <div
                      className={`bg-card rounded-xl border ${colors.border} hover:border-purple-300 transition-all p-5 xs:p-6 h-full flex flex-col group`}
                    >
                      <div className="flex items-center justify-between mb-2 xs:mb-3">
                        <div
                          className={`w-9 h-9 xs:w-10 xs:h-10 rounded-lg ${colors.bg} flex items-center justify-center group-hover:scale-110 transition-transform`}
                        >
                          <Icon
                            className={`w-4.5 h-4.5 xs:w-5 xs:h-5 ${colors.text}`}
                          />
                        </div>
                        <span
                          className={`px-1.5 py-0.5 rounded-full text-[6px] xs:text-[7px] font-black text-white ${colors.badge}`}
                        >
                          {resource.format}
                        </span>
                      </div>
                      <h3 className="font-black text-sm xs:text-base mb-1 group-hover:text-purple-600 transition-colors">
                        {resource.title}
                      </h3>
                      <p className="text-xs xs:text-sm text-muted-foreground mb-3 flex-1 line-clamp-2">
                        {resource.description}
                      </p>
                      <div className="flex items-center gap-3 text-[8px] xs:text-[9px] text-muted-foreground mb-3">
                        <span>{resource.pages} pages</span>
                        <span>•</span>
                        <span>{resource.level}</span>
                      </div>
                      <Link href={resource.downloadUrl} download>
                        <Button
                          variant="outline"
                          className="w-full rounded-lg py-2 text-[9px] xs:text-[10px] font-black border-purple-300 text-purple-600 hover:bg-purple-50"
                        >
                          Download
                          <Download className="w-2.5 h-2.5 ml-1" />
                        </Button>
                      </Link>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          ) : (
            <div className="space-y-3 xs:space-y-4">
              {regularResources.map((resource, idx) => {
                const Icon = resource.icon;
                const colors = getColorStyles(resource.color);
                return (
                  <Reveal key={resource.id} delay={idx * 0.05}>
                    <div
                      className={`bg-card rounded-xl border ${colors.border} hover:border-purple-300 transition-all p-4 xs:p-5 flex flex-col xs:flex-row gap-3 xs:gap-4 items-start xs:items-center group`}
                    >
                      <div
                        className={`w-10 h-10 rounded-lg ${colors.bg} flex items-center justify-center shrink-0`}
                      >
                        <Icon className={`w-5 h-5 ${colors.text}`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <h3 className="font-black text-sm xs:text-base group-hover:text-purple-600 transition-colors">
                            {resource.title}
                          </h3>
                          <span
                            className={`px-1.5 py-0.5 rounded-full text-[6px] xs:text-[7px] font-black text-white ${colors.badge}`}
                          >
                            {resource.format}
                          </span>
                        </div>
                        <p className="text-xs xs:text-sm text-muted-foreground line-clamp-1">
                          {resource.description}
                        </p>
                        <div className="flex items-center gap-3 text-[8px] xs:text-[9px] text-muted-foreground mt-1">
                          <span>{resource.pages} pages</span>
                          <span>•</span>
                          <span>{resource.level}</span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Download className="w-2 h-2" />{" "}
                            {resource.downloads}
                          </span>
                        </div>
                      </div>
                      <Link href={resource.downloadUrl} download>
                        <Button
                          variant="outline"
                          className="rounded-lg px-3 xs:px-4 py-1.5 xs:py-2 text-[9px] xs:text-[10px] font-black border-purple-300 text-purple-600 hover:bg-purple-50 shrink-0"
                        >
                          Download
                        </Button>
                      </Link>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          )}

          {/* Request Resource CTA */}
          <div className="mt-12 xs:mt-16 mb-12">
            <div className="bg-gradient-to-br from-purple-600/10 to-amber-500/10 rounded-xl p-6 xs:p-8 text-center max-w-2xl mx-auto border border-purple-200 dark:border-purple-800">
              <Heart className="w-8 h-8 text-amber-500 mx-auto mb-3" />
              <h3 className="text-lg xs:text-xl font-black mb-2">
                Can't find what you're looking for?
              </h3>
              <p className="text-xs xs:text-sm text-muted-foreground mb-4">
                We're constantly adding new resources. Let us know what you need
                and we'll create it for you.
              </p>
              <Link href="/contact">
                <Button className="rounded-full px-5 xs:px-6 py-2.5 xs:py-3 font-black text-xs bg-gradient-to-r from-purple-600 to-purple-700 text-white">
                  Request a Resource
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Trust Message */}
          <div className="text-center pb-12 xs:pb-16">
            <div className="inline-flex flex-wrap items-center justify-center gap-3 p-3 rounded-xl bg-gradient-to-r from-purple-50/30 to-amber-50/30 border border-purple-200 dark:border-purple-800">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-purple-600" />
                <span className="text-[8px] xs:text-[9px] font-black uppercase tracking-wider">
                  Created by Certified Scholars
                </span>
              </div>
              <div className="w-px h-4 bg-border hidden xs:block" />
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-amber-500" />
                <span className="text-[8px] xs:text-[9px] font-black uppercase tracking-wider">
                  Free for Everyone
                </span>
              </div>
              <div className="w-px h-4 bg-border hidden xs:block" />
              <div className="flex items-center gap-2">
                <Download className="w-4 h-4 text-purple-600" />
                <span className="text-[8px] xs:text-[9px] font-black uppercase tracking-wider">
                  Instant Download
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
