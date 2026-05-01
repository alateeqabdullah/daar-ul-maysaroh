// src/app/(dashboard)/student/grades/page.tsx
"use client";

import { useState } from "react";
import {
  Search,
  Download,
  BarChart3,
  TrendingUp,
  TrendingDown,
  Award,
  Star,
  BookOpen,
  Calendar,
  Eye,
  ChevronDown,
  ChevronUp,
  Target,
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
import { Progress } from "@/components/ui/progress";
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
} from "recharts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Mock data
const gradesData = [
  {
    id: 1,
    subject: "Quran Memorization",
    exam: "Midterm",
    score: 85.5,
    total: 100,
    grade: "A-",
    date: "2024-01-15",
    weight: 30,
  },
  {
    id: 2,
    subject: "Quran Memorization",
    exam: "Final",
    score: 88,
    total: 100,
    grade: "A-",
    date: "2024-02-01",
    weight: 40,
  },
  {
    id: 3,
    subject: "Tajweed Rules",
    exam: "Quiz 1",
    score: 92,
    total: 100,
    grade: "A",
    date: "2024-01-10",
    weight: 20,
  },
  {
    id: 4,
    subject: "Tajweed Rules",
    exam: "Quiz 2",
    score: 90,
    total: 100,
    grade: "A-",
    date: "2024-01-24",
    weight: 20,
  },
  {
    id: 5,
    subject: "Tajweed Rules",
    exam: "Final",
    score: 94,
    total: 100,
    grade: "A",
    date: "2024-02-05",
    weight: 60,
  },
  {
    id: 6,
    subject: "Fiqh",
    exam: "Assignment",
    score: 78,
    total: 100,
    grade: "B+",
    date: "2024-01-08",
    weight: 25,
  },
  {
    id: 7,
    subject: "Fiqh",
    exam: "Midterm",
    score: 82,
    total: 100,
    grade: "B+",
    date: "2024-01-20",
    weight: 35,
  },
  {
    id: 8,
    subject: "Fiqh",
    exam: "Final",
    score: 85,
    total: 100,
    grade: "A-",
    date: "2024-02-03",
    weight: 40,
  },
  {
    id: 9,
    subject: "Arabic Language",
    exam: "Quiz 1",
    score: 88,
    total: 100,
    grade: "A-",
    date: "2024-01-12",
    weight: 20,
  },
  {
    id: 10,
    subject: "Arabic Language",
    exam: "Oral Exam",
    score: 90,
    total: 100,
    grade: "A-",
    date: "2024-01-28",
    weight: 30,
  },
];

const subjectAverages = [
  { subject: "Quran Memorization", average: 86.8, grade: "A-", trend: "up" },
  { subject: "Tajweed Rules", average: 92, grade: "A", trend: "up" },
  { subject: "Fiqh", average: 81.7, grade: "B+", trend: "stable" },
  { subject: "Arabic Language", average: 89, grade: "A-", trend: "up" },
];

const gradeDistribution = [
  { grade: "A", count: 4, color: "#10b981" },
  { grade: "A-", count: 5, color: "#34d399" },
  { grade: "B+", count: 1, color: "#f59e0b" },
  { grade: "B", count: 0, color: "#fbbf24" },
  { grade: "C+", count: 0, color: "#f97316" },
];

const performanceTrend = [
  { month: "Sep", score: 78 },
  { month: "Oct", score: 82 },
  { month: "Nov", score: 85 },
  { month: "Dec", score: 84 },
  { month: "Jan", score: 87 },
];

export default function GradesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("all");
  const [selectedTerm, setSelectedTerm] = useState("all");
  const [expandedGrade, setExpandedGrade] = useState<number | null>(null);

  const filteredGrades = gradesData.filter((grade) => {
    const matchesSearch =
      grade.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      grade.exam.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesSubject =
      selectedSubject === "all" || grade.subject === selectedSubject;
    const matchesTerm = selectedTerm === "all" || true; // Add term filtering logic

    return matchesSearch && matchesSubject && matchesTerm;
  });

  const calculateGPA = () => {
    const gradePoints = gradesData.map((grade) => {
      switch (grade.grade) {
        case "A":
          return 4.0;
        case "A-":
          return 3.7;
        case "B+":
          return 3.3;
        case "B":
          return 3.0;
        case "B-":
          return 2.7;
        case "C+":
          return 2.3;
        case "C":
          return 2.0;
        case "C-":
          return 1.7;
        case "D+":
          return 1.3;
        case "D":
          return 1.0;
        case "F":
          return 0.0;
        default:
          return 0.0;
      }
    });

    const totalPoints = gradePoints.reduce((sum, point) => sum + point, 0);
    return (totalPoints / gradePoints.length).toFixed(2);
  };

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case "A":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case "A-":
        return "bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300";
      case "B+":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
      case "B":
        return "bg-yellow-50 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-300";
      case "C+":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400";
      case "C":
        return "bg-orange-50 text-orange-700 dark:bg-orange-900/20 dark:text-orange-300";
      case "D":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
      case "F":
        return "bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400";
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case "down":
        return <TrendingDown className="h-4 w-4 text-red-500" />;
      default:
        return <div className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Grades & Performance
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Track your academic progress and grades
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export Transcript
          </Button>
          <Button className="bg-gradient-primary gap-2">
            <Target className="h-4 w-4" />
            Set Goals
          </Button>
        </div>
      </div>

      {/* Overall Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Overall GPA</p>
                <p className="mt-2 text-2xl font-bold text-gray-900">
                  {calculateGPA()}
                </p>
                <p className="text-sm text-green-600">4.0 Scale</p>
              </div>
              <div className="rounded-lg bg-gradient-primary p-3">
                <Award className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Average Score
                </p>
                <p className="mt-2 text-2xl font-bold text-gray-900">86.5%</p>
                <div className="flex items-center gap-1 text-sm text-green-600">
                  <TrendingUp className="h-4 w-4" />
                  +2.5% from last term
                </div>
              </div>
              <div className="rounded-lg bg-blue-100 p-3 dark:bg-blue-900/30">
                <BarChart3 className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Grades
                </p>
                <p className="mt-2 text-2xl font-bold text-gray-900">
                  {gradesData.length}
                </p>
                <p className="text-sm text-blue-600">
                  Across {new Set(gradesData.map((g) => g.subject)).size}{" "}
                  subjects
                </p>
              </div>
              <div className="rounded-lg bg-purple-100 p-3 dark:bg-purple-900/30">
                <BookOpen className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Top Subject</p>
                <p className="mt-2 text-2xl font-bold text-gray-900">
                  Tajweed Rules
                </p>
                <p className="text-sm text-green-600">92% Average</p>
              </div>
              <div className="rounded-lg bg-green-100 p-3 dark:bg-green-900/30">
                <Star className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Performance Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Performance Trend</CardTitle>
            <CardDescription>Your average score over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsLineChart data={performanceTrend}>
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
                    dataKey="score"
                    stroke="#8b5cf6"
                    strokeWidth={2}
                    dot={{ fill: "#8b5cf6", strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </RechartsLineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Grade Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Grade Distribution</CardTitle>
            <CardDescription>Breakdown of your grades</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    data={gradeDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ grade, percent }) =>
                      `${grade}: ${(percent * 100).toFixed(0)}%`
                    }
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="count"
                  >
                    {gradeDistribution.map((entry, index) => (
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
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Subject Averages */}
      <Card>
        <CardHeader>
          <CardTitle>Subject Averages</CardTitle>
          <CardDescription>Your performance by subject</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {subjectAverages.map((subject) => (
              <div
                key={subject.subject}
                className="rounded-lg border border-gray-200 p-4 dark:border-gray-700"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">{subject.subject}</h3>
                    <div className="mt-1 flex items-center gap-2">
                      <Badge className={getGradeColor(subject.grade)}>
                        {subject.grade}
                      </Badge>
                      <span className="text-2xl font-bold">
                        {subject.average}%
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getTrendIcon(subject.trend)}
                    <Progress value={subject.average} className="w-24" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Grades Table */}
      <Card>
        <CardHeader>
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <CardTitle>All Grades</CardTitle>
              <CardDescription>
                Detailed view of all your grades
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search grades..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select
                value={selectedSubject}
                onValueChange={setSelectedSubject}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Subjects</SelectItem>
                  <SelectItem value="Quran Memorization">
                    Quran Memorization
                  </SelectItem>
                  <SelectItem value="Tajweed Rules">Tajweed Rules</SelectItem>
                  <SelectItem value="Fiqh">Fiqh</SelectItem>
                  <SelectItem value="Arabic Language">
                    Arabic Language
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Subject</TableHead>
                  <TableHead>Exam/Assignment</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Score</TableHead>
                  <TableHead>Grade</TableHead>
                  <TableHead>Weight</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredGrades.map((grade) => (
                  <>
                    <TableRow key={grade.id}>
                      <TableCell className="font-medium">
                        {grade.subject}
                      </TableCell>
                      <TableCell>{grade.exam}</TableCell>
                      <TableCell>{grade.date}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">
                            {grade.score}/{grade.total}
                          </span>
                          <span className="text-sm text-gray-500">
                            ({((grade.score / grade.total) * 100).toFixed(1)}%)
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getGradeColor(grade.grade)}>
                          {grade.grade}
                        </Badge>
                      </TableCell>
                      <TableCell>{grade.weight}%</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() =>
                              setExpandedGrade(
                                expandedGrade === grade.id ? null : grade.id
                              )
                            }
                          >
                            {expandedGrade === grade.id ? (
                              <ChevronUp className="h-4 w-4" />
                            ) : (
                              <ChevronDown className="h-4 w-4" />
                            )}
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                    {expandedGrade === grade.id && (
                      <TableRow>
                        <TableCell
                          colSpan={7}
                          className="bg-gray-50 dark:bg-gray-800"
                        >
                          <div className="p-4">
                            <div className="grid gap-4 md:grid-cols-2">
                              <div>
                                <h4 className="mb-2 font-medium">Details</h4>
                                <div className="space-y-2 text-sm">
                                  <div className="flex justify-between">
                                    <span className="text-gray-600">
                                      Subject Average:
                                    </span>
                                    <span className="font-medium">
                                      {
                                        subjectAverages.find(
                                          (s) => s.subject === grade.subject
                                        )?.average
                                      }
                                      %
                                    </span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-600">
                                      Class Average:
                                    </span>
                                    <span className="font-medium">84.2%</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-600">
                                      Your Rank:
                                    </span>
                                    <span className="font-medium">Top 15%</span>
                                  </div>
                                </div>
                              </div>
                              <div>
                                <h4 className="mb-2 font-medium">
                                  Teacher Feedback
                                </h4>
                                <div className="rounded-lg bg-blue-50 p-3 dark:bg-blue-900/20">
                                  <p className="text-sm text-blue-800 dark:text-blue-300">
                                    {grade.subject === "Quran Memorization" &&
                                      "Excellent memorization! Work on tajweed rules for better fluency."}
                                    {grade.subject === "Tajweed Rules" &&
                                      "Perfect application of tajweed rules. Keep practicing daily."}
                                    {grade.subject === "Fiqh" &&
                                      "Good understanding of concepts. Study the examples more carefully."}
                                    {grade.subject === "Arabic Language" &&
                                      "Great progress in vocabulary. Practice conversation more."}
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="mt-4 flex justify-end gap-2">
                              <Button variant="outline" size="sm">
                                <Download className="mr-2 h-3 w-3" />
                                Download Exam
                              </Button>
                              <Button variant="outline" size="sm">
                                <Eye className="mr-2 h-3 w-3" />
                                View Solutions
                              </Button>
                            </div>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <p className="text-sm text-gray-600">
            Showing {filteredGrades.length} of {gradesData.length} grades
          </p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              Previous
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        </CardFooter>
      </Card>

      {/* Improvement Suggestions */}
      <Card>
        <CardHeader>
          <CardTitle>Improvement Suggestions</CardTitle>
          <CardDescription>Areas to focus on for better grades</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="rounded-full bg-yellow-100 p-2 dark:bg-yellow-900/30">
                <Target className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <h4 className="font-medium">Focus on Fiqh</h4>
                <p className="text-sm text-gray-600">
                  Your Fiqh scores are below your average. Consider spending
                  extra time studying the examples and practice questions.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="rounded-full bg-blue-100 p-2 dark:bg-blue-900/30">
                <Calendar className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h4 className="font-medium">Consistent Revision</h4>
                <p className="text-sm text-gray-600">
                  Set aside 30 minutes daily for Quran revision to maintain your
                  high scores in memorization.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="rounded-full bg-green-100 p-2 dark:bg-green-900/30">
                <TrendingUp className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <h4 className="font-medium">Excellent Progress</h4>
                <p className="text-sm text-gray-600">
                  Your Tajweed scores show excellent improvement. Consider
                  helping classmates who are struggling.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full bg-gradient-primary">
            <Target className="mr-2 h-4 w-4" />
            Create Study Plan
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
