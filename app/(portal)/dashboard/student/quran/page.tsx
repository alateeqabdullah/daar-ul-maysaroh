// src/app/(dashboard)/student/quran/page.tsx
"use client";

import { useState } from "react";
import {
  Book,
  Target,
  TrendingUp,
  Calendar,
  CheckCircle,
  Clock,
  Award,
  Share2,
  Printer,
  Bookmark,
  Volume2,
  Play,
  Pause,
  RefreshCw,
  ChevronDown,
  ChevronUp,
  History,
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
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Link from "next/link";

// Mock data
const juzData = [
  {
    number: 1,
    name: "Al-Fatihah - Al-Baqarah 141",
    status: "completed",
    progress: 100,
    pages: 20,
    revisionCount: 15,
  },
  {
    number: 2,
    name: "Al-Baqarah 142-252",
    status: "completed",
    progress: 100,
    pages: 20,
    revisionCount: 12,
  },
  {
    number: 3,
    name: "Al-Baqarah 253 - Al-Imran 92",
    status: "completed",
    progress: 100,
    pages: 20,
    revisionCount: 10,
  },
  {
    number: 30,
    name: "An-Naba - An-Nas",
    status: "completed",
    progress: 100,
    pages: 20,
    revisionCount: 20,
  },
  {
    number: 29,
    name: "Al-Mulk - Al-Mursalat",
    status: "in-progress",
    progress: 65,
    pages: 20,
    revisionCount: 8,
  },
  {
    number: 28,
    name: "Al-Mujadila - At-Tahrim",
    status: "not-started",
    progress: 0,
    pages: 20,
    revisionCount: 0,
  },
];

const surahProgress = [
  {
    surah: 78,
    name: "An-Naba",
    status: "completed",
    ayahs: 40,
    memorized: 40,
    lastRevised: "2024-01-10",
  },
  {
    surah: 79,
    name: "An-Naziat",
    status: "in-progress",
    ayahs: 46,
    memorized: 25,
    lastRevised: "2024-01-12",
  },
  {
    surah: 80,
    name: "Abasa",
    status: "not-started",
    ayahs: 42,
    memorized: 0,
    lastRevised: null,
  },
  {
    surah: 81,
    name: "At-Takwir",
    status: "not-started",
    ayahs: 29,
    memorized: 0,
    lastRevised: null,
  },
  {
    surah: 82,
    name: "Al-Infitar",
    status: "not-started",
    ayahs: 19,
    memorized: 0,
    lastRevised: null,
  },
];

const monthlyProgress = [
  { month: "Sep", pages: 5, revision: 12 },
  { month: "Oct", pages: 8, revision: 15 },
  { month: "Nov", pages: 12, revision: 18 },
  { month: "Dec", pages: 15, revision: 20 },
  { month: "Jan", pages: 10, revision: 16 },
];

const goals = [
  {
    id: 1,
    title: "Complete Juz 29",
    target: "2024-02-15",
    progress: 65,
    daysLeft: 21,
  },
  {
    id: 2,
    title: "Daily Revision",
    target: "Daily",
    progress: 85,
    daysLeft: 0,
  },
  {
    id: 3,
    title: "Improve Tajweed",
    target: "2024-03-01",
    progress: 40,
    daysLeft: 35,
  },
];

const recentActivities = [
  {
    id: 1,
    action: "Memorized An-Naziat (1-10)",
    date: "Today, 09:00",
    type: "memorization",
  },
  {
    id: 2,
    action: "Revised Juz 30",
    date: "Yesterday, 14:00",
    type: "revision",
  },
  {
    id: 3,
    action: "Teacher evaluation",
    date: "2 days ago",
    type: "evaluation",
    score: 8.5,
  },
  {
    id: 4,
    action: "Group revision session",
    date: "3 days ago",
    type: "revision",
  },
];

export default function QuranProgressPage() {
  const [activeJuz, setActiveJuz] = useState(29);
  const [isRecording, setIsRecording] = useState(false);
  const [expandedSurah, setExpandedSurah] = useState<number | null>(79);

  const handleStartRecording = () => {
    setIsRecording(true);
    toast.info("Recording started", {
      description: "Recite the ayahs clearly.",
    });
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    toast.success("Recording saved", {
      description: "Your recitation has been saved for teacher review.",
    });
  };

  const handleMarkComplete = (surahNumber: number) => {
    toast.success("Marked as completed", {
      description: `Surah ${surahNumber} marked as memorized.`,
    });
  };

  const handleRequestEvaluation = (surahNumber: number) => {
    toast.info("Evaluation requested", {
      description: "Teacher will review your recitation soon.",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case "in-progress":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4" />;
      case "in-progress":
        return <Clock className="h-4 w-4" />;
      default:
        return <Book className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Quran Progress Tracker
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Track your memorization journey and set goals
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2">
            <Printer className="h-4 w-4" />
            Print Report
          </Button>
          <Button variant="outline" className="gap-2">
            <Share2 className="h-4 w-4" />
            Share Progress
          </Button>
          <Button className="bg-gradient-primary gap-2">
            <Target className="h-4 w-4" />
            Set New Goal
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Juz Completed
                </p>
                <p className="mt-2 text-2xl font-bold text-gray-900">4/30</p>
                <Progress value={(4 / 30) * 100} className="mt-2" />
              </div>
              <div className="rounded-lg bg-purple-100 p-3 dark:bg-purple-900/30">
                <Book className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Surah Memorized
                </p>
                <p className="mt-2 text-2xl font-bold text-gray-900">15</p>
                <p className="text-sm text-green-600">+2 this month</p>
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
                <p className="text-sm font-medium text-gray-600">
                  Revision Streak
                </p>
                <p className="mt-2 text-2xl font-bold text-gray-900">14 days</p>
                <p className="text-sm text-blue-600">Keep it up!</p>
              </div>
              <div className="rounded-lg bg-blue-100 p-3 dark:bg-blue-900/30">
                <TrendingUp className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg. Score</p>
                <p className="mt-2 text-2xl font-bold text-gray-900">8.2/10</p>
                <p className="text-sm text-yellow-600">Good progress</p>
              </div>
              <div className="rounded-lg bg-yellow-100 p-3 dark:bg-yellow-900/30">
                <Award className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column - Juz Progress */}
        <div className="lg:col-span-2 space-y-6">
          {/* Juz Progress */}
          <Card>
            <CardHeader>
              <CardTitle>Juz Progress</CardTitle>
              <CardDescription>
                Your progress through each Juz of the Quran
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {juzData.map((juz) => (
                  <div
                    key={juz.number}
                    className={`rounded-lg border p-4 transition-all hover:shadow-md ${
                      activeJuz === juz.number
                        ? "border-purple-300 bg-purple-50 dark:border-purple-700 dark:bg-purple-900/20"
                        : "border-gray-200 dark:border-gray-700"
                    }`}
                    onClick={() => setActiveJuz(juz.number)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-primary text-white">
                          {juz.number}
                        </div>
                        <div>
                          <h3 className="font-semibold">Juz {juz.number}</h3>
                          <p className="text-sm text-gray-600">{juz.name}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge className={getStatusColor(juz.status)}>
                          {getStatusIcon(juz.status)}
                          <span className="ml-1 capitalize">
                            {juz.status.replace("-", " ")}
                          </span>
                        </Badge>
                        <span className="text-sm text-gray-500">
                          {juz.pages} pages
                        </span>
                      </div>
                    </div>
                    <div className="mt-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Progress</span>
                        <span className="font-medium">{juz.progress}%</span>
                      </div>
                      <Progress value={juz.progress} className="mt-2" />
                      <div className="mt-2 flex items-center justify-between text-sm">
                        <span className="text-gray-600">
                          Revisions:{" "}
                          <span className="font-medium">
                            {juz.revisionCount}
                          </span>
                        </span>
                        {juz.status === "in-progress" && (
                          <Button size="sm" variant="outline">
                            Continue
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View All Juz Progress
              </Button>
            </CardFooter>
          </Card>

          {/* Surah Progress */}
          <Card>
            <CardHeader>
              <CardTitle>Surah Progress - Juz {activeJuz}</CardTitle>
              <CardDescription>
                Detailed progress for each surah
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {surahProgress.map((surah) => (
                  <div
                    key={surah.surah}
                    className="rounded-lg border border-gray-200 p-4 dark:border-gray-700"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400">
                          {surah.surah}
                        </div>
                        <div>
                          <h3 className="font-semibold">Surah {surah.name}</h3>
                          <p className="text-sm text-gray-600">
                            {surah.ayahs} ayahs
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() =>
                          setExpandedSurah(
                            expandedSurah === surah.surah ? null : surah.surah
                          )
                        }
                      >
                        {expandedSurah === surah.surah ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </Button>
                    </div>

                    <div className="mt-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Memorized</span>
                        <span className="font-medium">
                          {surah.memorized}/{surah.ayahs}
                        </span>
                      </div>
                      <Progress
                        value={(surah.memorized / surah.ayahs) * 100}
                        className="mt-2"
                      />
                    </div>

                    {expandedSurah === surah.surah && (
                      <div className="mt-4 space-y-3 border-t pt-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">
                            Last Revised
                          </span>
                          <span className="text-sm font-medium">
                            {surah.lastRevised || "Never"}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleMarkComplete(surah.surah)}
                          >
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Mark Complete
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleRequestEvaluation(surah.surah)}
                          >
                            <Award className="mr-2 h-4 w-4" />
                            Request Evaluation
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Goals & Activities */}
        <div className="space-y-6">
          {/* Goals */}
          <Card>
            <CardHeader>
              <CardTitle>Your Goals</CardTitle>
              <CardDescription>
                Memorization targets and deadlines
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {goals.map((goal) => (
                  <div
                    key={goal.id}
                    className="rounded-lg border border-gray-200 p-4 dark:border-gray-700"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold">{goal.title}</h3>
                        <div className="mt-1 flex items-center gap-2 text-sm text-gray-600">
                          <Calendar className="h-3 w-3" />
                          Target: {goal.target}
                          {goal.daysLeft > 0 && (
                            <Badge variant="outline">
                              {goal.daysLeft} days left
                            </Badge>
                          )}
                        </div>
                      </div>
                      <Badge className="bg-gradient-primary">
                        {goal.progress}%
                      </Badge>
                    </div>
                    <Progress value={goal.progress} className="mt-3" />
                  </div>
                ))}
              </div>
              <Button className="mt-4 w-full" variant="outline">
                <Target className="mr-2 h-4 w-4" />
                Set New Goal
              </Button>
            </CardContent>
          </Card>

          {/* Recording */}
          <Card>
            <CardHeader>
              <CardTitle>Record Your Recitation</CardTitle>
              <CardDescription>Record for teacher evaluation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-lg bg-purple-50 p-4 dark:bg-purple-900/20">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Current Surah: An-Naziat</p>
                      <p className="text-sm text-purple-600">Ayahs 1-25</p>
                    </div>
                    <Bookmark className="h-5 w-5 text-purple-600" />
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Recording Duration</span>
                    <span className="font-medium">00:00</span>
                  </div>
                  <div className="h-2 rounded-full bg-gray-200">
                    <div className="h-full w-1/3 rounded-full bg-purple-600"></div>
                  </div>
                </div>

                <div className="flex justify-center gap-4">
                  {isRecording ? (
                    <Button
                      className="bg-red-500 hover:bg-red-600"
                      onClick={handleStopRecording}
                    >
                      <Pause className="mr-2 h-4 w-4" />
                      Stop Recording
                    </Button>
                  ) : (
                    <Button
                      className="bg-gradient-primary"
                      onClick={handleStartRecording}
                    >
                      <Play className="mr-2 h-4 w-4" />
                      Start Recording
                    </Button>
                  )}
                  <Button variant="outline">
                    <Volume2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activities */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activities</CardTitle>
              <CardDescription>
                Your recent memorization activities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3">
                    <div
                      className={`mt-0.5 rounded-full p-1 ${
                        activity.type === "memorization"
                          ? "bg-green-100 text-green-600"
                          : activity.type === "revision"
                          ? "bg-blue-100 text-blue-600"
                          : "bg-purple-100 text-purple-600"
                      }`}
                    >
                      {activity.type === "memorization" && (
                        <Book className="h-4 w-4" />
                      )}
                      {activity.type === "revision" && (
                        <RefreshCw className="h-4 w-4" />
                      )}
                      {activity.type === "evaluation" && (
                        <Award className="h-4 w-4" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm">
                        <span className="font-medium">{activity.action}</span>
                      </p>
                      <div className="mt-1 flex items-center justify-between">
                        <p className="text-xs text-gray-500">{activity.date}</p>
                        {activity.score && (
                          <Badge variant="outline" className="text-xs">
                            {activity.score}/10
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <Button className="mt-4 w-full" variant="outline" asChild>
                <Link href="/student/quran/history">
                  <History className="mr-2 h-4 w-4" />
                  View Full History
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Charts Section */}
      <Card>
        <CardHeader>
          <CardTitle>Progress Analytics</CardTitle>
          <CardDescription>
            Monthly memorization and revision trends
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyProgress}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="month" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #E5E7EB",
                    borderRadius: "8px",
                  }}
                />
                <Bar dataKey="pages" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="revision" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
