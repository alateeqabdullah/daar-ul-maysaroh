// src/app/(dashboard)/parent/progress/page.tsx
"use client";

import { useState, useEffect } from "react";
import {
  BarChart3,
  Download,
  Filter,
  Calendar,
  TrendingUp,
  TrendingDown,
  Target,
  Award,
  BookOpen,
  Users,
  FileText,
  Printer,
  Share2,
  Eye,
  MoreVertical,
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
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { formatDate } from "@/lib/utils";
import { toast } from "sonner";

interface ProgressReport {
  id: string;
  childName: string;
  reportType: "WEEKLY" | "MONTHLY" | "TERM" | "ANNUAL";
  period: string;
  generatedDate: string;
  overallGrade: string;
  gradePoint: number;
  attendanceRate: number;
  teacherComments: string;
  recommendations: string[];
  subjects: Array<{
    name: string;
    grade: string;
    score: number;
    totalScore: number;
    teacher: string;
    comments: string;
  }>;
  achievements: Array<{
    title: string;
    description: string;
    date: string;
  }>;
}

export default function ParentProgressPage() {
  const [reports, setReports] = useState<ProgressReport[]>([]);
  const [selectedReport, setSelectedReport] = useState<string>("");
  const [selectedChild, setSelectedChild] = useState("ALL");
  const [selectedPeriod, setSelectedPeriod] = useState("ALL");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      setIsLoading(true);
      try {
        // Mock data - Replace with API call
        const mockReports: ProgressReport[] = [
          {
            id: "1",
            childName: "Omar Ahmed",
            reportType: "MONTHLY",
            period: "January 2024",
            generatedDate: "2024-02-01",
            overallGrade: "A-",
            gradePoint: 3.7,
            attendanceRate: 92,
            teacherComments:
              "Omar has shown remarkable improvement in Quran memorization. His dedication to daily revision is commendable.",
            recommendations: [
              "Increase daily Quran revision to 45 minutes",
              "Focus on tajweed rules application",
              "Participate in class discussions more actively",
            ],
            subjects: [
              {
                name: "Quran Memorization",
                grade: "A-",
                score: 85,
                totalScore: 100,
                teacher: "Sheikh Ahmed",
                comments: "Excellent progress on Surah An-Naziat",
              },
              {
                name: "Tajweed Rules",
                grade: "B+",
                score: 88,
                totalScore: 100,
                teacher: "Sheikh Ahmed",
                comments: "Good application of ghunnah rules",
              },
              {
                name: "Fiqh of Purification",
                grade: "B",
                score: 82,
                totalScore: 100,
                teacher: "Ustadh Muhammad",
                comments: "Needs more practice on theoretical concepts",
              },
              {
                name: "Arabic Language",
                grade: "A",
                score: 92,
                totalScore: 100,
                teacher: "Ustadha Fatima",
                comments: "Outstanding vocabulary acquisition",
              },
            ],
            achievements: [
              {
                title: "Perfect Attendance",
                description: "No absences in January",
                date: "2024-01-31",
              },
              {
                title: "Quran Competition",
                description: "2nd place in class recitation",
                date: "2024-01-25",
              },
              {
                title: "Fastest Memorizer",
                description: "Memorized 2 surahs this month",
                date: "2024-01-20",
              },
            ],
          },
          {
            id: "2",
            childName: "Aisha Ahmed",
            reportType: "TERM",
            period: "Fall Term 2024",
            generatedDate: "2024-01-15",
            overallGrade: "A",
            gradePoint: 4.0,
            attendanceRate: 96,
            teacherComments:
              "Aisha has been an exemplary student. Her analytical skills in Fiqh studies are exceptional.",
            recommendations: [
              "Continue current study habits",
              "Consider advanced Fiqh studies",
              "Mentor other students in Arabic",
            ],
            subjects: [
              {
                name: "Fiqh of Worship",
                grade: "A+",
                score: 98,
                totalScore: 100,
                teacher: "Ustadh Muhammad",
                comments: "Exceptional understanding of prayer rulings",
              },
              {
                name: "Islamic History",
                grade: "A",
                score: 94,
                totalScore: 100,
                teacher: "Ustadh Ibrahim",
                comments: "Excellent research skills",
              },
              {
                name: "Arabic Grammar",
                grade: "A-",
                score: 90,
                totalScore: 100,
                teacher: "Ustadha Fatima",
                comments: "Strong grasp of sentence structure",
              },
              {
                name: "Quran Recitation",
                grade: "A",
                score: 95,
                totalScore: 100,
                teacher: "Sheikh Ahmed",
                comments: "Beautiful recitation with proper tajweed",
              },
            ],
            achievements: [
              {
                title: "Academic Excellence",
                description: "Top of class in Fiqh",
                date: "2024-01-10",
              },
              {
                title: "Class Representative",
                description: "Elected by peers",
                date: "2024-01-05",
              },
              {
                title: "Quran Memorization",
                description: "Completed Juz 25",
                date: "2023-12-30",
              },
            ],
          },
        ];

        setReports(mockReports);
        setSelectedReport(mockReports[0]?.id || "");
      } catch (error) {
        toast.error("Failed to load progress reports");
      } finally {
        setIsLoading(false);
      }
    };

    fetchReports();
  }, []);

  const selectedReportData = reports.find((r) => r.id === selectedReport);

  const filteredReports = reports.filter((report) => {
    const matchesChild =
      selectedChild === "ALL" || report.childName.includes(selectedChild);
    const matchesPeriod =
      selectedPeriod === "ALL" || report.reportType === selectedPeriod;
    return matchesChild && matchesPeriod;
  });

  const subjectData =
    selectedReportData?.subjects.map((subject) => ({
      subject: subject.name,
      score: subject.score,
      grade: subject.grade,
    })) || [];

  const handleDownloadReport = (reportId: string) => {
    toast.success("Downloading report...");
    // In production: API call to generate/download PDF
  };

  const handleShareReport = (reportId: string) => {
    toast.success("Share link copied to clipboard");
    // In production: Generate shareable link
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Progress Reports
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Detailed academic progress and performance analysis
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" className="gap-2">
            <Printer className="h-4 w-4" />
            Print All
          </Button>
          <Button className="bg-gradient-primary gap-2">
            <Download className="h-4 w-4" />
            Export All
          </Button>
        </div>
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
                Report Type
              </label>
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger>
                  <SelectValue placeholder="All Reports" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">All Reports</SelectItem>
                  <SelectItem value="WEEKLY">Weekly</SelectItem>
                  <SelectItem value="MONTHLY">Monthly</SelectItem>
                  <SelectItem value="TERM">Term</SelectItem>
                  <SelectItem value="ANNUAL">Annual</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium">
                Date Range
              </label>
              <Select defaultValue="LAST_3_MONTHS">
                <SelectTrigger>
                  <SelectValue placeholder="Last 3 months" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="LAST_MONTH">Last Month</SelectItem>
                  <SelectItem value="LAST_3_MONTHS">Last 3 Months</SelectItem>
                  <SelectItem value="LAST_6_MONTHS">Last 6 Months</SelectItem>
                  <SelectItem value="THIS_YEAR">This Year</SelectItem>
                  <SelectItem value="CUSTOM">Custom Range</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Reports List */}
        <div className="space-y-4 lg:col-span-1">
          <h2 className="text-lg font-semibold">Available Reports</h2>
          <div className="space-y-3">
            {filteredReports.map((report) => (
              <button
                key={report.id}
                onClick={() => setSelectedReport(report.id)}
                className={`flex w-full flex-col rounded-lg border p-4 text-left transition-all hover:shadow-md ${
                  selectedReport === report.id
                    ? "border-purple-300 bg-purple-50 dark:border-purple-700 dark:bg-purple-900/20"
                    : "border-gray-200 dark:border-gray-700"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{report.childName}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {report.reportType} Report • {report.period}
                    </p>
                  </div>
                  <Badge
                    variant={
                      report.overallGrade.includes("A")
                        ? "default"
                        : report.overallGrade.includes("B")
                        ? "secondary"
                        : report.overallGrade.includes("C")
                        ? "outline"
                        : "destructive"
                    }
                  >
                    {report.overallGrade}
                  </Badge>
                </div>
                <div className="mt-3 flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">
                    Generated: {formatDate(report.generatedDate)}
                  </span>
                  <span className="font-medium">
                    {report.attendanceRate}% Attendance
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Report Details */}
        {selectedReportData && (
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>
                      {selectedReportData.childName}&apos;s Progress Report
                    </CardTitle>
                    <CardDescription>
                      {selectedReportData.reportType} Report for{" "}
                      {selectedReportData.period}
                    </CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleShareReport(selectedReportData.id)}
                    >
                      <Share2 className="mr-2 h-4 w-4" />
                      Share
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() =>
                        handleDownloadReport(selectedReportData.id)
                      }
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Summary Stats */}
                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="rounded-lg bg-gradient-primary p-4 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm opacity-90">Overall Grade</p>
                        <p className="mt-2 text-3xl font-bold">
                          {selectedReportData.overallGrade}
                        </p>
                        <p className="text-sm opacity-90">
                          GPA: {selectedReportData.gradePoint}
                        </p>
                      </div>
                      <Award className="h-8 w-8 opacity-80" />
                    </div>
                  </div>
                  <div className="rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-green-800 dark:text-green-300">
                          Attendance Rate
                        </p>
                        <p className="mt-2 text-3xl font-bold text-green-600 dark:text-green-400">
                          {selectedReportData.attendanceRate}%
                        </p>
                        <div className="mt-2">
                          <Progress
                            value={selectedReportData.attendanceRate}
                            className="h-2"
                          />
                        </div>
                      </div>
                      <TrendingUp className="h-8 w-8 text-green-600 dark:text-green-400" />
                    </div>
                  </div>
                  <div className="rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-blue-800 dark:text-blue-300">
                          Subjects
                        </p>
                        <p className="mt-2 text-3xl font-bold text-blue-600 dark:text-blue-400">
                          {selectedReportData.subjects.length}
                        </p>
                        <p className="mt-1 text-sm text-blue-700 dark:text-blue-400">
                          {
                            selectedReportData.subjects.filter((s) =>
                              s.grade.includes("A")
                            ).length
                          }{" "}
                          A Grades
                        </p>
                      </div>
                      <BookOpen className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                    </div>
                  </div>
                </div>

                {/* Subject Performance Chart */}
                <div>
                  <h3 className="mb-4 font-semibold">Subject Performance</h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={subjectData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                        <XAxis dataKey="subject" stroke="#9CA3AF" />
                        <YAxis stroke="#9CA3AF" domain={[0, 100]} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "white",
                            border: "1px solid #E5E7EB",
                            borderRadius: "8px",
                          }}
                        />
                        <Bar
                          dataKey="score"
                          fill="#8b5cf6"
                          radius={[4, 4, 0, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Subjects Details */}
                <div>
                  <h3 className="mb-4 font-semibold">Subject Details</h3>
                  <div className="space-y-4">
                    {selectedReportData.subjects.map((subject, index) => (
                      <div
                        key={index}
                        className="rounded-lg border border-gray-200 p-4 dark:border-gray-700"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">{subject.name}</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              Teacher: {subject.teacher}
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center gap-2">
                              <span className="text-lg font-bold">
                                {subject.score}/{subject.totalScore}
                              </span>
                              <Badge
                                variant={
                                  subject.grade.includes("A")
                                    ? "default"
                                    : subject.grade.includes("B")
                                    ? "secondary"
                                    : subject.grade.includes("C")
                                    ? "outline"
                                    : "destructive"
                                }
                              >
                                {subject.grade}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {Math.round(
                                (subject.score / subject.totalScore) * 100
                              )}
                              %
                            </p>
                          </div>
                        </div>
                        {subject.comments && (
                          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                            {subject.comments}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Teacher Comments */}
                <div>
                  <h3 className="mb-2 font-semibold">
                    Teacher&apos;s Comments
                  </h3>
                  <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
                    <p className="text-gray-700 dark:text-gray-300">
                      {selectedReportData.teacherComments}
                    </p>
                  </div>
                </div>

                {/* Recommendations */}
                <div>
                  <h3 className="mb-2 font-semibold">Recommendations</h3>
                  <div className="space-y-2">
                    {selectedReportData.recommendations.map((rec, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <Target className="mt-0.5 h-4 w-4 text-purple-600" />
                        <span>{rec}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Achievements */}
                {selectedReportData.achievements.length > 0 && (
                  <div>
                    <h3 className="mb-2 font-semibold">Recent Achievements</h3>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {selectedReportData.achievements.map(
                        (achievement, index) => (
                          <div
                            key={index}
                            className="rounded-lg border border-yellow-200 bg-yellow-50 p-3 dark:border-yellow-700/50 dark:bg-yellow-900/20"
                          >
                            <div className="flex items-start gap-2">
                              <Award className="mt-0.5 h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                              <div>
                                <p className="font-medium">
                                  {achievement.title}
                                </p>
                                <p className="text-sm text-yellow-700 dark:text-yellow-300">
                                  {achievement.description}
                                </p>
                                <p className="mt-1 text-xs text-yellow-600 dark:text-yellow-400">
                                  {formatDate(achievement.date)}
                                </p>
                              </div>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" className="gap-2">
                  <FileText className="h-4 w-4" />
                  Request Detailed Report
                </Button>
                <Button className="bg-gradient-primary gap-2">
                  <Calendar className="h-4 w-4" />
                  Schedule Parent-Teacher Meeting
                </Button>
              </CardFooter>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
