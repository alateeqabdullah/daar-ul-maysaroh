// src/app/student/quran/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  BookOpen,
  Award,
  TrendingUp,
  Calendar,
  PlayCircle,
  Mic,
  CheckCircle,
  Clock,
  Star,
  Target,
  FileText,
  Download,
  Share2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

interface QuranProgress {
  id: string;
  surahName: string;
  surahNumber: number;
  juzNumber: number;
  fromAyah: number;
  toAyah: number;
  status: string;
  evaluationScore?: number;
  lastRevisedAt?: string;
  revisionCount: number;
}

export default function QuranPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [progress, setProgress] = useState<QuranProgress[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("memorization");

  useEffect(() => {
    if (status === "loading") return;

    if (!session) {
      router.push("/login");
      return;
    }

    if (
      !["STUDENT", "TEACHER", "ADMIN", "SUPER_ADMIN"].includes(
        session.user.role
      )
    ) {
      router.push("/dashboard");
    }
  }, [session, status, router]);

  useEffect(() => {
    if (session) {
      fetchProgress();
    }
  }, [session]);

  const fetchProgress = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `/api/quran/progress?studentId=${session?.user?.studentProfile?.id}`
      );
      const data = await response.json();

      if (response.ok) {
        setProgress(data.progress);
      } else {
        toast.error(data.message || "Failed to fetch Quran progress");
      }
    } catch (error) {
      console.error("Error fetching progress:", error);
    } finally {
      setLoading(false);
    }
  };

  const getCompletionPercentage = () => {
    const completed = progress.filter((p) => p.status === "COMPLETED").length;
    const total = progress.length || 1;
    return Math.round((completed / total) * 100);
  };

  const getJuzProgress = (juzNumber: number) => {
    const juzProgress = progress.filter((p) => p.juzNumber === juzNumber);
    const completed = juzProgress.filter(
      (p) => p.status === "COMPLETED"
    ).length;
    const total = juzProgress.length || 1;
    return Math.round((completed / total) * 100);
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      COMPLETED: { label: "Completed", color: "bg-green-100 text-green-800" },
      IN_PROGRESS: {
        label: "In Progress",
        color: "bg-yellow-100 text-yellow-800",
      },
      REVIEWED: { label: "Reviewed", color: "bg-blue-100 text-blue-800" },
      NOT_STARTED: { label: "Not Started", color: "bg-gray-100 text-gray-800" },
    };
    const variant =
      variants[status as keyof typeof variants] || variants.NOT_STARTED;
    return <Badge className={variant.color}>{variant.label}</Badge>;
  };

  if (status === "loading" || loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-purple-600 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Quran Progress</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Track your Quran memorization and revision
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
          <Button>
            <Mic className="mr-2 h-4 w-4" />
            New Recording
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Overall Progress
                </p>
                <p className="text-3xl font-bold">
                  {getCompletionPercentage()}%
                </p>
                <p className="text-sm text-gray-500">
                  {progress.length} surahs tracked
                </p>
              </div>
              <div className="rounded-lg bg-purple-100 p-3 dark:bg-purple-900/30">
                <TrendingUp className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
            <Progress value={getCompletionPercentage()} className="mt-4" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Juz Completed
                </p>
                <p className="text-3xl font-bold">4/30</p>
                <p className="text-sm text-gray-500">13% of Quran</p>
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
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Recent Revision
                </p>
                <p className="text-3xl font-bold">3 days</p>
                <p className="text-sm text-gray-500">Since last revision</p>
              </div>
              <div className="rounded-lg bg-blue-100 p-3 dark:bg-blue-900/30">
                <Clock className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Avg. Score
                </p>
                <p className="text-3xl font-bold">8.5/10</p>
                <p className="text-sm text-gray-500">Teacher evaluations</p>
              </div>
              <div className="rounded-lg bg-yellow-100 p-3 dark:bg-yellow-900/30">
                <Star className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:inline-flex">
          <TabsTrigger value="memorization">Memorization</TabsTrigger>
          <TabsTrigger value="revision">Revision</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        {/* Memorization Tab */}
        <TabsContent value="memorization" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Surah Progress</CardTitle>
              <CardDescription>
                Track your memorization progress surah by surah
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {progress.slice(0, 5).map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between rounded-lg border border-gray-200 p-4 dark:border-gray-700"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900/30">
                        <BookOpen className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                      </div>
                      <div>
                        <h4 className="font-medium">
                          {item.surahName} (Surah {item.surahNumber})
                        </h4>
                        <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                          <span>Juz {item.juzNumber}</span>
                          <span>•</span>
                          <span>
                            Ayah {item.fromAyah}-{item.toAyah}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div>
                        {getStatusBadge(item.status)}
                        {item.evaluationScore && (
                          <div className="mt-1 text-center text-sm font-medium">
                            {item.evaluationScore}/10
                          </div>
                        )}
                      </div>

                      <Button size="sm" variant="outline">
                        <PlayCircle className="mr-2 h-4 w-4" />
                        Play
                      </Button>
                    </div>
                  </div>
                ))}

                {progress.length === 0 && (
                  <div className="text-center py-8">
                    <BookOpen className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-4 text-lg font-semibold">
                      No progress recorded
                    </h3>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">
                      Start your Quran memorization journey today
                    </p>
                    <Button className="mt-4">
                      <Mic className="mr-2 h-4 w-4" />
                      Start Recording
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Juz Progress */}
          <Card>
            <CardHeader>
              <CardTitle>Juz Progress</CardTitle>
              <CardDescription>
                Track completion percentage for each Juz
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6">
                {Array.from({ length: 30 }, (_, i) => i + 1).map((juz) => {
                  const progress = getJuzProgress(juz);
                  return (
                    <div key={juz} className="text-center">
                      <div className="relative mx-auto mb-2 h-16 w-16">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-xl font-bold">ج{juz}</div>
                        </div>
                        <svg className="h-16 w-16 -rotate-90 transform">
                          <circle
                            cx="32"
                            cy="32"
                            r="28"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="none"
                            className="text-gray-200 dark:text-gray-700"
                          />
                          <circle
                            cx="32"
                            cy="32"
                            r="28"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="none"
                            strokeDasharray={`${progress * 1.76} 176`}
                            className="text-green-500"
                          />
                        </svg>
                      </div>
                      <div className="text-sm font-medium">Juz {juz}</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">
                        {progress}%
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Revision Tab */}
        <TabsContent value="revision" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Revision Schedule</CardTitle>
              <CardDescription>
                Plan and track your Quran revision
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    day: "Monday",
                    surahs: "Al-Fatihah, Al-Baqarah (1-50)",
                    time: "After Fajr",
                  },
                  {
                    day: "Tuesday",
                    surahs: "Al-Baqarah (51-100)",
                    time: "After Dhuhr",
                  },
                  {
                    day: "Wednesday",
                    surahs: "Al-Baqarah (101-150)",
                    time: "After Asr",
                  },
                  {
                    day: "Thursday",
                    surahs: "Al-Baqarah (151-200)",
                    time: "After Maghrib",
                  },
                  {
                    day: "Friday",
                    surahs: "Juz 30 Complete",
                    time: "After Isha",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between rounded-lg border border-gray-200 p-4 dark:border-gray-700"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30">
                        <Calendar className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <h4 className="font-medium">{item.day}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {item.surahs}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className="bg-green-100 text-green-800">
                        {item.time}
                      </Badge>
                      <Button size="sm" variant="ghost" className="mt-2">
                        Mark Complete
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Progress Timeline</CardTitle>
                <CardDescription>
                  Your memorization journey over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { month: "Jan", progress: 20 },
                    { month: "Feb", progress: 35 },
                    { month: "Mar", progress: 50 },
                    { month: "Apr", progress: 65 },
                    { month: "May", progress: 78 },
                    { month: "Jun", progress: 85 },
                  ].map((item) => (
                    <div key={item.month} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{item.month}</span>
                        <span>{item.progress}%</span>
                      </div>
                      <Progress value={item.progress} />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
                <CardDescription>
                  Detailed analysis of your memorization
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Target className="h-5 w-5 text-purple-600" />
                      <span>Retention Rate</span>
                    </div>
                    <span className="font-bold">92%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-5 w-5 text-blue-600" />
                      <span>Avg. Study Time/Day</span>
                    </div>
                    <span className="font-bold">45 min</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Award className="h-5 w-5 text-yellow-600" />
                      <span>Best Surah</span>
                    </div>
                    <span className="font-bold">Al-Mulk (9.8/10)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <FileText className="h-5 w-5 text-green-600" />
                      <span>Recordings</span>
                    </div>
                    <span className="font-bold">24 files</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks for Quran study</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <Button variant="outline" className="h-auto flex-col p-4">
              <Mic className="mb-2 h-6 w-6" />
              <span>New Recording</span>
            </Button>
            <Button variant="outline" className="h-auto flex-col p-4">
              <Calendar className="mb-2 h-6 w-6" />
              <span>Schedule Revision</span>
            </Button>
            <Button variant="outline" className="h-auto flex-col p-4">
              <Share2 className="mb-2 h-6 w-6" />
              <span>Share Progress</span>
            </Button>
            <Button variant="outline" className="h-auto flex-col p-4">
              <FileText className="mb-2 h-6 w-6" />
              <span>Generate Report</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
