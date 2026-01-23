"use client";

import { useState, useMemo } from "react";
import {
  Search,
  Filter,
  Download,
  BookOpen,
  FileText,
  Video,
  Music,
  Image as ImageIcon, // Renamed to avoid conflict with next/image
  Folder,
  Star,
  Eye,
  MoreVertical,
  ChevronDown,
  ExternalLink,
  Calendar,
  User,
  Book,
  GraduationCap,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

// Mock data
const resources = [
  {
    id: 1,
    name: "Complete Tajweed Rules Guide",
    type: "pdf",
    subject: "Tajweed",
    size: "3.2 MB",
    date: "2024-01-15",
    downloads: 245,
    rating: 4.8,
    description: "Comprehensive guide covering all tajweed rules with examples.",
    tags: ["tajweed", "rules", "guide", "beginner"],
  },
  {
    id: 2,
    name: "Quran Memorization Schedule",
    type: "pdf",
    subject: "Quran",
    size: "1.5 MB",
    date: "2024-01-10",
    downloads: 189,
    rating: 4.9,
    description: "Daily schedule for Quran memorization with revision plans.",
    tags: ["memorization", "schedule", "planning"],
  },
  {
    id: 3,
    name: "Arabic Vocabulary List",
    type: "pdf",
    subject: "Arabic",
    size: "2.1 MB",
    date: "2024-01-08",
    downloads: 312,
    rating: 4.7,
    description: "Common Arabic words and phrases with English translation.",
    tags: ["arabic", "vocabulary", "language"],
  },
  {
    id: 4,
    name: "Fiqh of Salah - Video Series",
    type: "video",
    subject: "Fiqh",
    size: "45 MB",
    date: "2024-01-05",
    downloads: 156,
    rating: 4.9,
    description: "Step-by-step video guide on how to pray correctly.",
    tags: ["fiqh", "salah", "prayer", "video"],
  },
  {
    id: 5,
    name: "Seerah Timeline Infographic",
    type: "image",
    subject: "Seerah",
    size: "5.8 MB",
    date: "2024-01-03",
    downloads: 278,
    rating: 4.8,
    description: "Visual timeline of Prophet Muhammad's (PBUH) life.",
    tags: ["seerah", "timeline", "infographic"],
  },
  {
    id: 6,
    name: "Quran Recitation - Sheikh Sudais",
    type: "audio",
    subject: "Quran",
    size: "12 MB",
    date: "2024-01-01",
    downloads: 421,
    rating: 5.0,
    description: "Beautiful recitation of Juz 30 by Sheikh Sudais.",
    tags: ["recitation", "audio", "quran", "juz-30"],
  },
  {
    id: 7,
    name: "Islamic Studies Workbook",
    type: "pdf",
    subject: "Islamic Studies",
    size: "4.3 MB",
    date: "2023-12-28",
    downloads: 198,
    rating: 4.6,
    description: "Interactive workbook with exercises and questions.",
    tags: ["workbook", "exercises", "islamic-studies"],
  },
  {
    id: 8,
    name: "Advanced Tajweed - Live Session",
    type: "video",
    subject: "Tajweed",
    size: "68 MB",
    date: "2023-12-25",
    downloads: 134,
    rating: 4.9,
    description: "Live class recording on advanced tajweed rules.",
    tags: ["advanced", "tajweed", "live", "recording"],
  },
];

const subjects = [
  "All Subjects",
  "Quran",
  "Tajweed",
  "Arabic",
  "Fiqh",
  "Seerah",
  "Islamic Studies",
];

const resourceTypes = [
  "All Types",
  "pdf",
  "video",
  "audio",
  "image",
  "document",
];

export default function ResourcesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("All Subjects");
  const [selectedType, setSelectedType] = useState("All Types");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Optimized filtering logic
  const filteredResources = useMemo(() => {
    return resources.filter((resource) => {
      const matchesSearch =
        resource.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        );

      const matchesSubject =
        selectedSubject === "All Subjects" ||
        resource.subject === selectedSubject;
      const matchesType =
        selectedType === "All Types" || resource.type === selectedType;
      const matchesTags =
        selectedTags.length === 0 ||
        selectedTags.every((tag) => resource.tags.includes(tag));

      return matchesSearch && matchesSubject && matchesType && matchesTags;
    });
  }, [searchQuery, selectedSubject, selectedType, selectedTags]);

  const allTags = useMemo(() => 
    Array.from(new Set(resources.flatMap((r) => r.tags))), 
  []);

  const handleDownload = (resourceId: number, resourceName: string) => {
    toast.success(`Downloading ${resourceName}...`, {
      description: "Your download will start shortly.",
    });
  };

  const handlePreview = (resourceId: number, resourceName: string) => {
    toast.info(`Opening preview for ${resourceName}...`);
  };

  const getTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "pdf":
      case "document":
        return <FileText className="h-5 w-5" />;
      case "video":
        return <Video className="h-5 w-5" />;
      case "audio":
        return <Music className="h-5 w-5" />;
      case "image":
        return <ImageIcon className="h-5 w-5" />;
      default:
        return <FileText className="h-5 w-5" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "pdf":
      case "document":
        return "bg-red-100 text-red-600";
      case "video":
        return "bg-purple-100 text-purple-600";
      case "audio":
        return "bg-blue-100 text-blue-600";
      case "image":
        return "bg-green-100 text-green-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Resource Library
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Access learning materials, guides, and resources
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Bulk Download
          </Button>
          <Button className="bg-gradient-primary gap-2">
            <BookOpen className="h-4 w-4" />
            Request Resource
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="space-y-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search resources, descriptions, or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-4">
              <div>
                <label className="mb-2 block text-sm font-medium">Subject</label>
                <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select subject" />
                  </SelectTrigger>
                  <SelectContent>
                    {subjects.map((subject) => (
                      <SelectItem key={subject} value={subject}>
                        {subject}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium">Type</label>
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    {resourceTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        <div className="flex items-center gap-2">
                          {getTypeIcon(type)}
                          <span className="capitalize">{type}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium">Sort By</label>
                <Select defaultValue="date">
                  <SelectTrigger>
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="date">Date Added</SelectItem>
                    <SelectItem value="downloads">Most Downloaded</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="name">Name (A-Z)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium">View</label>
                <div className="flex gap-2">
                  <Button
                    variant={viewMode === "grid" ? "default" : "outline"}
                    onClick={() => setViewMode("grid")}
                    className="flex-1"
                  >
                    Grid
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "outline"}
                    onClick={() => setViewMode("list")}
                    className="flex-1"
                  >
                    List
                  </Button>
                </div>
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">Filter by Tags</label>
              <div className="flex flex-wrap gap-2">
                {allTags.map((tag) => (
                  <Button
                    key={tag}
                    variant={selectedTags.includes(tag) ? "default" : "outline"}
                    size="sm"
                    onClick={() => {
                      setSelectedTags((prev) =>
                        prev.includes(tag)
                          ? prev.filter((t) => t !== tag)
                          : [...prev, tag]
                      );
                    }}
                  >
                    {tag}
                  </Button>
                ))}
                {selectedTags.length > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedTags([])}
                  >
                    Clear All
                  </Button>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Area */}
      {filteredResources.length > 0 ? (
        viewMode === "grid" ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredResources.map((resource) => (
              <Card key={resource.id} className="flex flex-col">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className={`rounded-lg p-2 ${getTypeColor(resource.type)}`}>
                      {getTypeIcon(resource.type)}
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-medium">{resource.rating}</span>
                    </div>
                  </div>
                  <CardTitle className="mt-4 line-clamp-1">{resource.name}</CardTitle>
                  <CardDescription className="line-clamp-2">{resource.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <div className="space-y-3">
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline">{resource.subject}</Badge>
                      <Badge variant="outline" className="uppercase">{resource.type}</Badge>
                      {resource.tags.slice(0, 2).map((tag) => (
                        <Badge key={tag} variant="secondary">{tag}</Badge>
                      ))}
                    </div>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" /> Added {resource.date}
                        </span>
                        <span>{resource.size}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex gap-2">
                  <Button variant="outline" className="flex-1" onClick={() => handlePreview(resource.id, resource.name)}>
                    <Eye className="mr-2 h-4 w-4" /> Preview
                  </Button>
                  <Button className="flex-1 bg-gradient-primary" onClick={() => handleDownload(resource.id, resource.name)}>
                    <Download className="mr-2 h-4 w-4" /> Download
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="px-6 py-3 text-left text-sm font-medium">Name</th>
                      <th className="px-6 py-3 text-left text-sm font-medium">Subject</th>
                      <th className="px-6 py-3 text-left text-sm font-medium">Type</th>
                      <th className="px-6 py-3 text-left text-sm font-medium">Size</th>
                      <th className="px-6 py-3 text-left text-sm font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredResources.map((resource) => (
                      <tr key={resource.id} className="border-b hover:bg-gray-50 dark:hover:bg-gray-800">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className={`rounded-lg p-2 ${getTypeColor(resource.type)}`}>
                              {getTypeIcon(resource.type)}
                            </div>
                            <div>
                              <p className="font-medium">{resource.name}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <Badge variant="outline">{resource.subject}</Badge>
                        </td>
                        <td className="px-6 py-4">
                          <Badge className="uppercase">{resource.type}</Badge>
                        </td>
                        <td className="px-6 py-4 text-sm">{resource.size}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <Button size="sm" variant="outline" onClick={() => handlePreview(resource.id, resource.name)}>
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button size="sm" className="bg-gradient-primary" onClick={() => handleDownload(resource.id, resource.name)}>
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )
      ) : (
        /* Empty State */
        <Card>
          <CardContent className="p-12 text-center">
            <BookOpen className="mx-auto h-12 w-12 text-gray-300" />
            <h3 className="mt-4 text-lg font-semibold">No resources found</h3>
            <p className="mt-2 text-gray-500">Try adjusting your search or filters</p>
            <Button
              className="mt-4"
              variant="outline"
              onClick={() => {
                setSearchQuery("");
                setSelectedSubject("All Subjects");
                setSelectedType("All Types");
                setSelectedTags([]);
              }}
            >
              Clear Filters
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Stats and Info */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Library Stats</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between"><span className="text-sm">Total Resources</span><span className="font-bold">48</span></div>
            <div className="flex justify-between"><span className="text-sm">Total Downloads</span><span className="font-bold">2,145</span></div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Access</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start"><Book className="mr-2 h-4 w-4" /> Quran Materials</Button>
            <Button variant="outline" className="w-full justify-start"><GraduationCap className="mr-2 h-4 w-4" /> Teacher Uploads</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Uploads</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="flex items-center gap-2"><FileText className="h-4 w-4" /> Tajweed Sheets</span>
              <span className="text-gray-500">2 days ago</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}