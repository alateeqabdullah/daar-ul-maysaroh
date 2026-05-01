// src/app/(dashboard)/parent/quran/page.tsx
"use client";

import { useState, useEffect } from "react";
import {
  Book,
  Target,
  Award,
  CheckCircle,
  Download,
  Share2,
  MessageSquare,
  BarChart3,
  Calendar,
  Play,
  Volume2,
  Star,
  Trophy,
  RefreshCw,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { formatDate } from "@/lib/utils";
import { toast } from "sonner";

interface QuranProgress {
  id: string;
  childName: string;
  surahNumber: number;
  surahName: string;
  surahNameArabic: string;
  juzNumber: number;
  fromAyah: number;
  toAyah: number;
  totalAyahs: number;
  type: "MEMORIZATION" | "REVISION" | "STUDY" | "RECITATION";
  status: "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED" | "REVIEWED" | "MASTERED";
  progress: number;
  startedAt?: string;
  completedAt?: string;
  reviewedAt?: string;
  evaluationScore?: number;
  evaluationNotes?: string;
  evaluatedBy?: string;
  evaluatedAt?: string;
  recordingUrl?: string;
  recordingDuration?: number;
  lastRevisedAt?: string;
  revisionCount: number;
}

interface JuzProgress {
  juzNumber: number;
  totalSurahs: number;
  completedSurahs: number;
  progress: number;
  lastActivity: string;
  averageScore?: number;
}

interface Milestone {
  id: string;
  childName: string;
  title: string;
  description: string;
  achievedAt: string;
  type:
    | "JUZ_COMPLETION"
    | "SURAH_MASTERY"
    | "PERFECT_SCORE"
    | "REVISION_STREAK"
    | "SPEED_RECORD";
  icon: string;
}

export default function ParentQuranPage() {
  const [progress, setProgress] = useState<QuranProgress[]>([]);
  const [juzProgress, setJuzProgress] = useState<JuzProgress[]>([]);
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [selectedChild, setSelectedChild] = useState("ALL");
  const [selectedJuz, setSelectedJuz] = useState("ALL");
  const [selectedType, setSelectedType] = useState("ALL");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchQuranProgress = async () => {
      setIsLoading(true);
      try {
        // Mock data - Replace with API calls
        const mockProgress: QuranProgress[] = [
          {
            id: "1",
            childName: "Omar Ahmed",
            surahNumber: 78,
            surahName: "An-Naba",
            surahNameArabic: "النبأ",
            juzNumber: 30,
            fromAyah: 1,
            toAyah: 40,
            totalAyahs: 40,
            type: "MEMORIZATION",
            status: "COMPLETED",
            progress: 100,
            startedAt: "2024-01-01",
            completedAt: "2024-01-10",
            evaluationScore: 8,
            evaluationNotes: "Good memorization, needs work on tajweed",
            evaluatedBy: "Sheikh Ahmed",
            evaluatedAt: "2024-01-11",
            lastRevisedAt: "2024-01-15",
            revisionCount: 5,
          },
          {
              id: "2",
              childName: "Omar Ahmed",
              surahNumber: 79,
              surahName: "An-Naziat",
              surahNameArabic: "النازعات",
              juzNumber: 30,
              fromAyah: 1,
              toAyah: 46,
              totalAyahs: 46,
              type: "MEMORIZATION",
              status: "IN_PROGRESS",
              progress: 75,
              startedAt: "2024-01-11",
              evaluationScore: 7,
              evaluationNotes: "Good progress, focus on difficult verses",
              evaluatedBy: "Sheikh Ahmed",
              evaluatedAt: "2024-01-20",
              revisionCount: 0
          },
          {
              id: "3",
              childName: "Omar Ahmed",
              surahNumber: 80,
              surahName: "Abasa",
              surahNameArabic: "عبس",
              juzNumber: 30,
              fromAyah: 1,
              toAyah: 42,
              totalAyahs: 42,
              type: "MEMORIZATION",
              status: "NOT_STARTED",
              progress: 0,
              revisionCount: 0
          },
          {
            id: "4",
            childName: "Aisha Ahmed",
            surahNumber: 67,
            surahName: "Al-Mulk",
            surahNameArabic: "الملك",
            juzNumber: 29,
            fromAyah: 1,
            toAyah: 30,
            totalAyahs: 30,
            type: "MEMORIZATION",
            status: "MASTERED",
            progress: 100,
            startedAt: "2023-12-01",
            completedAt: "2023-12-20",
            reviewedAt: "2024-01-05",
            evaluationScore: 10,
            evaluationNotes: "Perfect memorization with excellent tajweed",
            evaluatedBy: "Sheikh Ahmed",
            evaluatedAt: "2024-01-06",
            lastRevisedAt: "2024-01-10",
            revisionCount: 12,
          },
          {
            id: "5",
            childName: "Aisha Ahmed",
            surahNumber: 68,
            surahName: "Al-Qalam",
            surahNameArabic: "القلم",
            juzNumber: 29,
            fromAyah: 1,
            toAyah: 52,
            totalAyahs: 52,
            type: "REVISION",
            status: "REVIEWED",
            progress: 100,
            startedAt: "2023-11-15",
            completedAt: "2023-12-10",
            reviewedAt: "2024-01-08",
            evaluationScore: 9,
            revisionCount: 8,
          },
        ];

        const mockJuzProgress: JuzProgress[] = [
          {
            juzNumber: 30,
            totalSurahs: 37,
            completedSurahs: 12,
            progress: 32,
            lastActivity: "2024-01-20",
            averageScore: 7.5,
          },
          {
            juzNumber: 29,
            totalSurahs: 11,
            completedSurahs: 8,
            progress: 73,
            lastActivity: "2024-01-10",
            averageScore: 9.0,
          },
          {
            juzNumber: 28,
            totalSurahs: 9,
            completedSurahs: 0,
            progress: 0,
            lastActivity: "Never",
          },
        ];

        const mockMilestones: Milestone[] = [
          {
            id: "m1",
            childName: "Omar Ahmed",
            title: "First Juz Started",
            description: "Began memorization of Juz 30",
            achievedAt: "2024-01-01",
            type: "JUZ_COMPLETION",
            icon: "🎯",
          },
          {
            id: "m2",
            childName: "Omar Ahmed",
            title: "10 Surahs Memorized",
            description: "Completed memorization of 10 surahs",
            achievedAt: "2024-01-15",
            type: "SURAH_MASTERY",
            icon: "🏆",
          },
          {
            id: "m3",
            childName: "Aisha Ahmed",
            title: "Perfect Score",
            description: "Scored 10/10 in Surah Al-Mulk evaluation",
            achievedAt: "2024-01-06",
            type: "PERFECT_SCORE",
            icon: "⭐",
          },
          {
            id: "m4",
            childName: "Aisha Ahmed",
            title: "30-Day Revision Streak",
            description: "Revised Quran daily for 30 consecutive days",
            achievedAt: "2024-01-10",
            type: "REVISION_STREAK",
            icon: "🔥",
          },
          {
            id: "m5",
            childName: "Omar Ahmed",
            title: "Fastest Memorizer",
            description: "Memorized Surah An-Naba in 10 days",
            achievedAt: "2024-01-10",
            type: "SPEED_RECORD",
            icon: "⚡",
          },
        ];

        setProgress(mockProgress);
        setJuzProgress(mockJuzProgress);
        setMilestones(mockMilestones);
      } catch (error) {
        toast.error("Failed to load Quran progress");
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuranProgress();
  }, []);

  const filteredProgress = progress.filter((item) => {
    const matchesChild =
      selectedChild === "ALL" || item.childName.includes(selectedChild);
    const matchesJuz =
      selectedJuz === "ALL" || item.juzNumber.toString() === selectedJuz;
    const matchesType = selectedType === "ALL" || item.type === selectedType;
    return matchesChild && matchesJuz && matchesType;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "MASTERED":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400";
      case "REVIEWED":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case "COMPLETED":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
      case "IN_PROGRESS":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
      case "NOT_STARTED":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "MEMORIZATION":
        return "bg-gradient-primary text-white";
      case "REVISION":
        return "bg-green-500 text-white";
      case "STUDY":
        return "bg-blue-500 text-white";
      case "RECITATION":
        return "bg-purple-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  const getProgressData = () => {
    const data = juzProgress.map((juz) => ({
      name: `Juz ${juz.juzNumber}`,
      progress: juz.progress,
      completed: juz.completedSurahs,
      total: juz.totalSurahs,
    }));
    return data;
  };

  const getPerformanceData = () => {
    const completed = progress.filter(
      (p) =>
        p.status === "COMPLETED" ||
        p.status === "REVIEWED" ||
        p.status === "MASTERED"
    );
    const inProgress = progress.filter((p) => p.status === "IN_PROGRESS");
    const notStarted = progress.filter((p) => p.status === "NOT_STARTED");

    return [
      { name: "Completed", value: completed.length, color: "#10b981" },
      { name: "In Progress", value: inProgress.length, color: "#f59e0b" },
      { name: "Not Started", value: notStarted.length, color: "#ef4444" },
    ];
  };

  const handlePlayRecording = (url?: string) => {
    if (url) {
      window.open(url, "_blank");
      toast.success("Playing recording...");
    } else {
      toast.info("No recording available");
    }
  };

  const handleDownloadReport = () => {
    toast.success("Downloading Quran progress report...");
    // In production: Generate and download PDF report
  };

  const handleShareProgress = () => {
    toast.success("Progress shared successfully");
    // In production: Generate shareable link
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Quran Progress
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Track your children&apos;s Quran memorization journey
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export Report
          </Button>
          <Button className="bg-gradient-primary gap-2">
            <MessageSquare className="h-4 w-4" />
            Discuss Progress
          </Button>
        </div>
      </div>

      {/* Overall Stats */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Total Surahs
                </p>
                <p className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
                  {progress.length}
                </p>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  Across all children
                </p>
              </div>
              <div className="rounded-lg bg-gradient-primary p-3">
                <Book className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Memorized
                </p>
                <p className="mt-2 text-2xl font-bold text-green-600 dark:text-green-400">
                  {
                    progress.filter(
                      (p) =>
                        p.status === "COMPLETED" ||
                        p.status === "REVIEWED" ||
                        p.status === "MASTERED"
                    ).length
                  }
                </p>
                <div className="mt-2">
                  <Progress
                    value={Math.round(
                      (progress.filter(
                        (p) =>
                          p.status === "COMPLETED" ||
                          p.status === "REVIEWED" ||
                          p.status === "MASTERED"
                      ).length /
                        progress.length) *
                        100
                    )}
                    className="h-2"
                  />
                </div>
              </div>
              <div className="rounded-lg bg-green-100 p-3 dark:bg-green-900/30">
                <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Active Juz
                </p>
                <p className="mt-2 text-2xl font-bold text-purple-600 dark:text-purple-400">
                  Juz{" "}
                  {juzProgress.find((j) => j.progress > 0 && j.progress < 100)
                    ?.juzNumber || "N/A"}
                </p>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  Currently memorizing
                </p>
              </div>
              <div className="rounded-lg bg-purple-100 p-3 dark:bg-purple-900/30">
                <Target className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Average Score
                </p>
                <p className="mt-2 text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {progress.filter((p) => p.evaluationScore).length > 0
                    ? (
                        progress
                          .filter((p) => p.evaluationScore)
                          .reduce(
                            (sum, p) => sum + (p.evaluationScore || 0),
                            0
                          ) / progress.filter((p) => p.evaluationScore).length
                      ).toFixed(1)
                    : "N/A"}
                  /10
                </p>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  Teacher evaluations
                </p>
              </div>
              <div className="rounded-lg bg-blue-100 p-3 dark:bg-blue-900/30">
                <Star className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <label className="mb-2 block text-sm font-medium">
                Select Child
              </label>
              <Select value={selectedChild} onValueChange={setSelectedChild}>
                <SelectTrigger>
                  <SelectValue placeholder="All Children" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">All Children</SelectItem>
                  <SelectItem value="Omar">Omar Ahmed</SelectItem>
                  <SelectItem value="Aisha">Aisha Ahmed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium">
                Juz Number
              </label>
              <Select value={selectedJuz} onValueChange={setSelectedJuz}>
                <SelectTrigger>
                  <SelectValue placeholder="All Juz" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">All Juz</SelectItem>
                  <SelectItem value="30">Juz 30 (Amma)</SelectItem>
                  <SelectItem value="29">Juz 29</SelectItem>
                  <SelectItem value="28">Juz 28</SelectItem>
                  <SelectItem value="1">Juz 1</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium">
                Progress Type
              </label>
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger>
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">All Types</SelectItem>
                  <SelectItem value="MEMORIZATION">Memorization</SelectItem>
                  <SelectItem value="REVISION">Revision</SelectItem>
                  <SelectItem value="STUDY">Study</SelectItem>
                  <SelectItem value="RECITATION">Recitation</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Juz Progress Overview</CardTitle>
            <CardDescription>Completion rate by Juz</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={getProgressData()}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="name" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" domain={[0, 100]} />
                  <Tooltip
                    formatter={(value, name) => {
                      if (name === "progress")
                        return [`${value}%`, "Completion"];
                      if (name === "completed")
                        return [value, "Completed Surahs"];
                      return [value, "Total Surahs"];
                    }}
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #E5E7EB",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar
                    dataKey="progress"
                    fill="#8b5cf6"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Progress Distribution</CardTitle>
            <CardDescription>Breakdown by status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={getPerformanceData()}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) =>
                      `${name}: ${(percent * 100).toFixed(0)}%`
                    }
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {getPerformanceData().map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #E5E7EB",
                      borderRadius: "8px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="surahs" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="surahs">Surah Progress</TabsTrigger>
          <TabsTrigger value="juz">Juz Progress</TabsTrigger>
          <TabsTrigger value="milestones">Milestones</TabsTrigger>
        </TabsList>

        {/* Surah Progress Tab */}
        <TabsContent value="surahs">
          <Card>
            <CardHeader>
              <CardTitle>Surah Progress Details</CardTitle>
              <CardDescription>
                Detailed progress for each surah
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredProgress.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-lg border border-gray-200 p-4 dark:border-gray-700"
                  >
                    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-primary">
                            <span className="font-bold text-white">
                              {item.surahNumber}
                            </span>
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold">
                                {item.surahName}
                              </h3>
                              <Badge variant="outline" className="text-xs">
                                Juz {item.juzNumber}
                              </Badge>
                              <Badge
                                className={`text-xs ${getTypeColor(item.type)}`}
                              >
                                {item.type}
                              </Badge>
                            </div>
                            <p className="mt-1 text-2xl font-arabic">
                              {item.surahNameArabic}
                            </p>
                            <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                              <span>
                                Ayahs: {item.fromAyah}-{item.toAyah}
                              </span>
                              <span>•</span>
                              <span>Total: {item.totalAyahs} ayahs</span>
                              {item.evaluationScore && (
                                <>
                                  <span>•</span>
                                  <span>Score: {item.evaluationScore}/10</span>
                                </>
                              )}
                              {item.lastRevisedAt && (
                                <>
                                  <span>•</span>
                                  <span>
                                    Revised: {formatDate(item.lastRevisedAt)}
                                  </span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="mt-4">
                          <div className="mb-2 flex items-center justify-between">
                            <span className="text-sm font-medium">
                              Progress
                            </span>
                            <span className="font-bold">{item.progress}%</span>
                          </div>
                          <Progress value={item.progress} className="h-2" />
                        </div>

                        {/* Evaluation Notes */}
                        {item.evaluationNotes && (
                          <div className="mt-3 rounded-lg bg-gray-50 p-3 dark:bg-gray-800">
                            <p className="text-sm text-gray-700 dark:text-gray-300">
                              <span className="font-medium">
                                Teacher&apos;s Note:
                              </span>{" "}
                              {item.evaluationNotes}
                            </p>
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col items-end gap-3">
                        <Badge className={getStatusColor(item.status)}>
                          {item.status.replace("_", " ")}
                        </Badge>

                        <div className="flex gap-2">
                          {item.recordingUrl && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() =>
                                handlePlayRecording(item.recordingUrl)
                              }
                            >
                              <Play className="h-4 w-4" />
                            </Button>
                          )}
                          <Button size="sm" variant="outline">
                            <Volume2 className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <RefreshCw className="h-4 w-4" />
                          </Button>
                        </div>

                        {item.revisionCount > 0 && (
                          <div className="text-center">
                            <p className="text-sm font-medium">Revisions</p>
                            <p className="text-lg font-bold">
                              {item.revisionCount}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Juz Progress Tab */}
        <TabsContent value="juz">
          <Card>
            <CardHeader>
              <CardTitle>Juz Progress</CardTitle>
              <CardDescription>
                Track progress by Juz (parts of the Quran)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {juzProgress.map((juz) => (
                  <Card key={juz.juzNumber}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-lg font-bold">
                              Juz {juz.juzNumber}
                            </h3>
                            {juz.juzNumber === 30 && (
                              <Badge variant="secondary" className="text-xs">
                                Amma
                              </Badge>
                            )}
                          </div>
                          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                            {juz.completedSurahs}/{juz.totalSurahs} surahs
                          </p>
                          <div className="mt-4">
                            <Progress value={juz.progress} className="h-2" />
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold">{juz.progress}%</p>
                          {juz.averageScore && (
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              Avg: {juz.averageScore}/10
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <p className="text-gray-600 dark:text-gray-400">
                            Last Activity
                          </p>
                          <p className="font-medium">{juz.lastActivity}</p>
                        </div>
                        <div>
                          <p className="text-gray-600 dark:text-gray-400">
                            Status
                          </p>
                          <Badge
                            variant={
                              juz.progress === 0
                                ? "destructive"
                                : juz.progress < 50
                                ? "secondary"
                                : juz.progress < 100
                                ? "outline"
                                : "default"
                            }
                          >
                            {juz.progress === 0
                              ? "Not Started"
                              : juz.progress < 50
                              ? "In Progress"
                              : juz.progress < 100
                              ? "Advanced"
                              : "Completed"}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full">
                        View Details
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Milestones Tab */}
        <TabsContent value="milestones">
          <Card>
            <CardHeader>
              <CardTitle>Achievement Milestones</CardTitle>
              <CardDescription>
                Celebrate your children&apos;s Quran memorization achievements
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {milestones.map((milestone) => (
                  <div
                    key={milestone.id}
                    className="rounded-lg border border-gray-200 p-4 dark:border-gray-700"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-primary text-2xl">
                          {milestone.icon}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold">{milestone.title}</h3>
                            <Badge variant="outline" className="text-xs">
                              {milestone.childName.split(" ")[0]}
                            </Badge>
                          </div>
                          <p className="mt-1 text-gray-600 dark:text-gray-400">
                            {milestone.description}
                          </p>
                          <div className="mt-3 flex items-center gap-4 text-sm">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4 text-gray-400" />
                              <span>{formatDate(milestone.achievedAt)}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Award className="h-4 w-4 text-yellow-500" />
                              <span className="capitalize">
                                {milestone.type.replace("_", " ")}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <Button size="sm" variant="outline">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <div className="w-full text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Keep encouraging your children! Every ayah memorized is a
                  blessing.
                </p>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Quick Actions */}
      <div className="grid gap-6 sm:grid-cols-3">
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 rounded-full bg-gradient-primary p-3">
                <BarChart3 className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold">Progress Report</h3>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Download detailed progress analysis
              </p>
              <Button className="mt-4 w-full" onClick={handleDownloadReport}>
                Download PDF
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 rounded-full bg-green-100 p-3 dark:bg-green-900/30">
                <MessageSquare className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="font-semibold">Discuss Progress</h3>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Schedule meeting with Quran teacher
              </p>
              <Button className="mt-4 w-full" variant="outline">
                Book Meeting
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 rounded-full bg-purple-100 p-3 dark:bg-purple-900/30">
                <Trophy className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="font-semibold">Set Goals</h3>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Create new memorization targets
              </p>
              <Button className="mt-4 w-full" variant="outline">
                Set New Goal
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
