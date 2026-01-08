// src/app/(dashboard)/teacher/resources/page.tsx
"use client";

import { useState } from "react";
import {
 
  FileText,
  Video,

  Download,
  Share2,
  MoreVertical,
  Plus,
  Search,
  ImageIcon,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ResourcesPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const resources = [
    {
      id: 1,
      name: "Tajweed Rules Guide",
      type: "pdf",
      size: "2.4 MB",
      class: "Quran 101",
      uploaded: "2 days ago",
    },
    {
      id: 2,
      name: "Fiqh of Salah Video",
      type: "video",
      size: "45.2 MB",
      class: "Fiqh Basics",
      uploaded: "1 week ago",
    },
    {
      id: 3,
      name: "Arabic Vocabulary List",
      type: "doc",
      size: "1.1 MB",
      class: "Arabic 101",
      uploaded: "3 days ago",
    },
    {
      id: 4,
      name: "Islamic History Timeline",
      type: "image",
      size: "3.8 MB",
      class: "Seerah",
      uploaded: "2 weeks ago",
    },
    {
      id: 5,
      name: "Quran Recitation Audio",
      type: "audio",
      size: "12.5 MB",
      class: "Quran 201",
      uploaded: "5 days ago",
    },
  ];

  const getFileIcon = (type: string) => {
    switch (type) {
      case "pdf":
        return <FileText className="h-5 w-5 text-red-500" />;
      case "video":
        return <Video className="h-5 w-5 text-purple-500" />;
      case "doc":
        return <FileText className="h-5 w-5 text-blue-500" />;
      case "image":
        return <ImageIcon className="h-5 w-5 text-green-500" />;
      case "audio":
        return <Video className="h-5 w-5 text-yellow-500" />;
      default:
        return <FileText className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Teaching Resources
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Share and manage educational materials with students
          </p>
        </div>
        <Button className="bg-gradient-primary gap-2">
          <Plus className="h-4 w-4" />
          Upload Resource
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium">
                Search Resources
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search by name, class, or type..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium">Class</label>
              <select className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 dark:border-gray-700 dark:bg-gray-800">
                <option>All Classes</option>
                <option>Quran 101</option>
                <option>Fiqh Basics</option>
                <option>Arabic 101</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid gap-6 sm:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-sm font-medium text-gray-600">
                Total Resources
              </p>
              <p className="mt-2 text-2xl font-bold text-purple-600">128</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-sm font-medium text-gray-600">Videos</p>
              <p className="mt-2 text-2xl font-bold text-blue-600">42</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-sm font-medium text-gray-600">Documents</p>
              <p className="mt-2 text-2xl font-bold text-green-600">68</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-sm font-medium text-gray-600">Total Size</p>
              <p className="mt-2 text-2xl font-bold text-yellow-600">2.4 GB</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All Resources</TabsTrigger>
          <TabsTrigger value="videos">Videos</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="audio">Audio</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <Card>
            <CardHeader>
              <CardTitle>Resource Library</CardTitle>
              <CardDescription>All uploaded teaching materials</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {resources.map((resource) => (
                  <div
                    key={resource.id}
                    className="flex items-center justify-between rounded-lg border border-gray-200 p-4 dark:border-gray-700"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="rounded-lg bg-gray-100 p-3 dark:bg-gray-800">
                        {getFileIcon(resource.type)}
                      </div>
                      <div>
                        <h3 className="font-semibold">{resource.name}</h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span className="uppercase">{resource.type}</span>
                          <span>{resource.size}</span>
                          <Badge variant="outline">{resource.class}</Badge>
                          <span>Uploaded {resource.uploaded}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button size="sm" variant="ghost">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost">
                        <Share2 className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
