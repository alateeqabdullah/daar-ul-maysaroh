// src/app/(dashboard)/student/quran/history/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  TrendingUp,
  Calendar,
  Star,
  Target,
  Award,
  Download,
  Filter,
  Search,
  BarChart3,
  FileText,
  Clock,
  CheckCircle,
  AlertCircle,
  ChevronRight,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Cell,
} from "recharts";

const juzData = [
  {
    juz: 30,
    name: "Amma",
    status: "completed",
    completedDate: "2024-01-10",
    revisionCount: 12,
    mastery: 95,
  },
  {
    juz: 29,
    name: "Al-Mulk",
    status: "completed",
    completedDate: "2024-01-24",
    revisionCount: 8,
    mastery: 92,
  },
  {
    juz: 28,
    name: "Al-Qasas",
    status: "in_progress",
    completedDate: null,
    revisionCount: 3,
    mastery: 75,
  },
  {
    juz: 27,
    name: "An-Naml",
    status: "not_started",
    completedDate: null,
    revisionCount: 0,
    mastery: 0,
  },
  {
    juz: 26,
    name: "Ash-Shu'ara",
    status: "not_started",
    completedDate: null,
    revisionCount: 0,
    mastery: 0,
  },
];

const surahProgress = [
  {
    surah: 78,
    name: "An-Naba",
    status: "completed",
    ayahs: 40,
    mastery: 95,
    lastRevised: "2 days ago",
  },
  {
    surah: 79,
    name: "An-Naziat",
    status: "completed",
    ayahs: 46,
    mastery: 92,
    lastRevised: "5 days ago",
  },
  {
    surah: 80,
    name: "Abasa",
    status: "in_progress",
    ayahs: 42,
    mastery: 60,
    lastRevised: "Today",
  },
  {
    surah: 81,
    name: "At-Takwir",
    status: "not_started",
    ayahs: 29,
    mastery: 0,
    lastRevised: null,
  },
  {
    surah: 82,
    name: "Al-Infitar",
    status: "not_started",
    ayahs: 19,
    mastery: 0,
    lastRevised: null,
  },
];

const monthlyProgress = [
  { month: "Sep", memorized: 1, revised: 0 },
  { month: "Oct", memorized: 1, revised: 1 },
  { month: "Nov", memorized: 0, revised: 2 },
  { month: "Dec", memorized: 1, revised: 3 },
  { month: "Jan", memorized: 1, revised: 4 },
];

const evaluations = [
  {
    id: 1,
    date: "2024-01-15",
    evaluator: "Sheikh Ahmed",
    juz: 29,
    score: 9,
    feedback: "Excellent tajweed, need to work on flow",
  },
  {
    id: 2,
    date: "2024-01-05",
    evaluator: "Sheikh Ahmed",
    juz: 30,
    score: 8,
    feedback: "Good memorization, some minor mistakes",
  },
  {
    id: 3,
    date: "2023-12-20",
    evaluator: "Ustadha Fatima",
    juz: 30,
    score: 7,
    feedback: "Good progress, practice more with tajweed rules",
  },
];

export default function QuranHistoryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedJuz, setSelectedJuz] = useState("all");
  const [timeRange, setTimeRange] = useState("all");

  const totalJuz = 30;
  const completedJuz = juzData.filter((j) => j.status === "completed").length;
  const progressPercentage = Math.round((completedJuz / totalJuz) * 100);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case "in_progress":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4" />;
      case "in_progress":
        return <Clock className="h-4 w-4" />;
      default:
        return <AlertCircle className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Quran Memorization History
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Track your Hifz journey and progress over time
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export Report
          </Button>
          <Button className="bg-gradient-primary gap-2">
            <BarChart3 className="h-4 w-4" />
            Analytics
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Juz Completed
                </p>
                <p className="mt-2 text-2xl font-bold text-purple-600">
                  {completedJuz}/30
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  {progressPercentage}% of Quran
                </p>
              </div>
              <div className="rounded-lg bg-purple-100 p-3 dark:bg-purple-900/30">
                <BookOpen className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
            <Progress value={progressPercentage} className="mt-4" />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Surah Memorized
                </p>
                <p className="mt-2 text-2xl font-bold text-green-600">
                  {surahProgress.filter((s) => s.status === "completed").length}
                </p>
                <p className="mt-1 text-sm text-gray-500">From Juz 30 & 29</p>
              </div>
              <div className="rounded-lg bg-green-100 p-3 dark:bg-green-900/30">
                <Star className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Revision Count
                </p>
                <p className="mt-2 text-2xl font-bold text-blue-600">
                  {juzData.reduce((sum, juz) => sum + juz.revisionCount, 0)}
                </p>
                <p className="mt-1 text-sm text-gray-500">Total revisions</p>
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
                <p className="text-sm font-medium text-gray-600">
                  Average Mastery
                </p>
                <p className="mt-2 text-2xl font-bold text-yellow-600">
                  {Math.round(
                    juzData
                      .filter((j) => j.status === "completed")
                      .reduce((sum, juz) => sum + juz.mastery, 0) / completedJuz
                  )}
                  %
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  Overall proficiency
                </p>
              </div>
              <div className="rounded-lg bg-yellow-100 p-3 dark:bg-yellow-900/30">
                <Award className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
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
              <label className="mb-2 block text-sm font-medium">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search surah or juz..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium">
                Juz Filter
              </label>
              <Select value={selectedJuz} onValueChange={setSelectedJuz}>
                <SelectTrigger>
                  <SelectValue placeholder="All Juz" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Juz</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="in_progress">In Progress</SelectItem>
                  <SelectItem value="not_started">Not Started</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium">
                Time Range
              </label>
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger>
                  <SelectValue placeholder="All Time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Time</SelectItem>
                  <SelectItem value="last_week">Last Week</SelectItem>
                  <SelectItem value="last_month">Last Month</SelectItem>
                  <SelectItem value="last_year">Last Year</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="juz" className="space-y-6">
        <TabsList>
          <TabsTrigger value="juz">Juz Progress</TabsTrigger>
          <TabsTrigger value="surah">Surah Details</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="evaluations">Evaluations</TabsTrigger>
        </TabsList>

        {/* Juz Progress Tab */}
        <TabsContent value="juz" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Juz-by-Juz Progress</CardTitle>
              <CardDescription>
                Your memorization progress for each Juz of the Quran
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {juzData.map((juz) => (
                  <div
                    key={juz.juz}
                    className="rounded-lg border border-gray-200 p-6 dark:border-gray-700"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-primary text-lg font-bold text-white">
                            {juz.juz}
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold">
                              Juz {juz.juz} - {juz.name}
                            </h3>
                            <div className="mt-1 flex items-center space-x-3">
                              <Badge className={getStatusColor(juz.status)}>
                                <span className="flex items-center gap-1">
                                  {getStatusIcon(juz.status)}
                                  {juz.status === "completed"
                                    ? "Completed"
                                    : juz.status === "in_progress"
                                    ? "In Progress"
                                    : "Not Started"}
                                </span>
                              </Badge>
                              {juz.completedDate && (
                                <span className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                                  <Calendar className="mr-1 h-3 w-3" />
                                  Completed: {juz.completedDate}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="mt-6 grid gap-6 sm:grid-cols-3">
                          <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              Mastery Level
                            </p>
                            <div className="mt-2 flex items-center">
                              <div className="flex-1">
                                <Progress value={juz.mastery} className="h-2" />
                              </div>
                              <span className="ml-3 font-medium">
                                {juz.mastery}%
                              </span>
                            </div>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              Revisions
                            </p>
                            <p className="mt-2 text-2xl font-bold">
                              {juz.revisionCount}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              Last Activity
                            </p>
                            <p className="mt-2 font-medium">
                              {juz.status === "completed"
                                ? "Revision"
                                : juz.status === "in_progress"
                                ? "Memorizing"
                                : "Not started"}
                            </p>
                          </div>
                        </div>

                        <div className="mt-6 flex space-x-3">
                          {juz.status === "in_progress" && (
                            <Button size="sm" asChild>
                              <Link href={`/student/quran/practice/${juz.juz}`}>
                                Practice Now
                              </Link>
                            </Button>
                          )}
                          {juz.status === "completed" && (
                            <Button size="sm" variant="outline">
                              Revise Now
                            </Button>
                          )}
                          <Button size="sm" variant="outline">
                            View Details
                          </Button>
                          <Button size="sm" variant="outline">
                            Request Evaluation
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Surah Details Tab */}
        <TabsContent value="surah">
          <Card>
            <CardHeader>
              <CardTitle>Surah Memorization Details</CardTitle>
              <CardDescription>
                Detailed progress for each Surah in current Juz
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800">
                      <th className="px-6 py-3 text-left text-sm font-semibold">
                        Surah
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold">
                        Ayahs
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold">
                        Mastery
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold">
                        Last Revised
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {surahProgress.map((surah) => (
                      <tr key={surah.surah}>
                        <td className="px-6 py-4">
                          <div className="text-lg font-bold text-purple-600 dark:text-purple-400">
                            {surah.surah}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="font-medium">{surah.name}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-gray-600 dark:text-gray-400">
                            {surah.ayahs} ayahs
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <Badge className={getStatusColor(surah.status)}>
                            {surah.status === "completed"
                              ? "Completed"
                              : surah.status === "in_progress"
                              ? "In Progress"
                              : "Not Started"}
                          </Badge>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div className="w-24">
                              <Progress value={surah.mastery} className="h-2" />
                            </div>
                            <span className="ml-2 text-sm font-medium">
                              {surah.mastery}%
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-gray-600 dark:text-gray-400">
                            {surah.lastRevised || "Never"}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex space-x-2">
                            {surah.status === "in_progress" && (
                              <Button size="sm" variant="outline">
                                Practice
                              </Button>
                            )}
                            <Button size="sm" variant="ghost">
                              <ChevronRight className="h-4 w-4" />
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
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Progress</CardTitle>
                <CardDescription>
                  Juz memorized and revised per month
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
                      <Bar
                        dataKey="memorized"
                        name="Memorized"
                        fill="#8b5cf6"
                        radius={[4, 4, 0, 0]}
                      />
                      <Bar
                        dataKey="revised"
                        name="Revised"
                        fill="#10b981"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Mastery Over Time</CardTitle>
                <CardDescription>
                  Average mastery percentage trend
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={[
                        { month: "Sep", mastery: 70 },
                        { month: "Oct", mastery: 75 },
                        { month: "Nov", mastery: 78 },
                        { month: "Dec", mastery: 85 },
                        { month: "Jan", mastery: 88 },
                      ]}
                    >
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
                      <Line
                        type="monotone"
                        dataKey="mastery"
                        stroke="#8b5cf6"
                        strokeWidth={2}
                        dot={{ fill: "#8b5cf6", strokeWidth: 2, r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Evaluations Tab */}
        <TabsContent value="evaluations">
          <Card>
            <CardHeader>
              <CardTitle>Teacher Evaluations</CardTitle>
              <CardDescription>
                Feedback and scores from your teachers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {evaluations.map((evalItem) => (
                  <div
                    key={evalItem.id}
                    className="rounded-lg border border-gray-200 p-6 dark:border-gray-700"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3">
                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-primary">
                            <div className="text-xl font-bold text-white">
                              {evalItem.score}/10
                            </div>
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold">
                              Juz {evalItem.juz} Evaluation
                            </h3>
                            <div className="mt-1 flex items-center space-x-3">
                              <span className="text-sm text-gray-600 dark:text-gray-400">
                                Evaluated by {evalItem.evaluator}
                              </span>
                              <span className="text-sm text-gray-600 dark:text-gray-400">
                                •
                              </span>
                              <span className="text-sm text-gray-600 dark:text-gray-400">
                                {evalItem.date}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="mt-6">
                          <h4 className="mb-2 font-medium">Feedback</h4>
                          <p className="rounded-lg bg-gray-50 p-4 text-gray-700 dark:bg-gray-800 dark:text-gray-300">
                            {evalItem.feedback}
                          </p>
                        </div>

                        <div className="mt-6 flex items-center space-x-4">
                          <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              Overall Score
                            </p>
                            <div className="mt-1 flex items-center">
                              {[...Array(10)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-5 w-5 ${
                                    i < evalItem.score
                                      ? "fill-yellow-400 text-yellow-400"
                                      : "text-gray-300 dark:text-gray-600"
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              Areas to Improve
                            </p>
                            <div className="mt-1 flex flex-wrap gap-2">
                              <Badge variant="outline">Tajweed Rules</Badge>
                              <Badge variant="outline">Flow & Pace</Badge>
                              <Badge variant="outline">
                                Memorization Accuracy
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 flex space-x-3">
                      <Button size="sm" variant="outline">
                        <Download className="mr-2 h-4 w-4" />
                        Download Report
                      </Button>
                      <Button size="sm" variant="outline">
                        <FileText className="mr-2 h-4 w-4" />
                        View Details
                      </Button>
                      <Button size="sm">Schedule Follow-up</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Manage your Quran memorization</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Button
              variant="outline"
              className="h-auto flex-col items-start p-4"
              asChild
            >
              <Link href="/student/quran/practice">
                <BookOpen className="mb-2 h-5 w-5" />
                <span className="font-medium">Practice Now</span>
                <span className="mt-1 text-xs text-gray-600">
                  Continue memorization
                </span>
              </Link>
            </Button>
            <Button
              variant="outline"
              className="h-auto flex-col items-start p-4"
              asChild
            >
              <Link href="/student/quran/revision">
                <Target className="mb-2 h-5 w-5" />
                <span className="font-medium">Revision Session</span>
                <span className="mt-1 text-xs text-gray-600">
                  Revise memorized portions
                </span>
              </Link>
            </Button>
            <Button
              variant="outline"
              className="h-auto flex-col items-start p-4"
              asChild
            >
              <Link href="/student/quran/evaluation">
                <Award className="mb-2 h-5 w-5" />
                <span className="font-medium">Request Evaluation</span>
                <span className="mt-1 text-xs text-gray-600">
                  Get teacher feedback
                </span>
              </Link>
            </Button>
            <Button
              variant="outline"
              className="h-auto flex-col items-start p-4"
              asChild
            >
              <Link href="/student/quran/settings">
                <Filter className="mb-2 h-5 w-5" />
                <span className="font-medium">Settings</span>
                <span className="mt-1 text-xs text-gray-600">
                  Manage preferences
                </span>
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
