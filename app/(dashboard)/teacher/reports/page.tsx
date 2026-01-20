"use client";

import { useState, useEffect } from "react";
import {
  BarChart3,
  Download,
  Filter,
  Calendar,
  Users,
  BookOpen,
  TrendingUp,
  TrendingDown,
  FileText,
  Eye,
  Share2,
  Printer,
  PieChart as PieChartIcon,
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";
import { format, subMonths } from "date-fns";

// --- Types ---
interface Report {
  id: string;
  title: string;
  type: string;
  generatedAt: string;
  period: string;
  size: string;
  downloadUrl: string;
}

interface ClassPerformance {
  id: string;
  name: string;
  code: string;
  averageScore: number;
  attendanceRate: number;
  studentCount: number;
  improvement: number;
}

// --- Mock Data Generators ---
const attendanceData = Array.from({ length: 12 }, (_, i) => ({
  month: format(subMonths(new Date(), 11 - i), "MMM"),
  present: Math.floor(Math.random() * 30) + 70,
  absent: Math.floor(Math.random() * 10) + 5,
}));

const gradeDistributionData = [
  { name: "A", value: 25, color: "#10b981" }, // Emerald
  { name: "B", value: 35, color: "#3b82f6" }, // Blue
  { name: "C", value: 20, color: "#f59e0b" }, // Amber
  { name: "D", value: 12, color: "#f97316" }, // Orange
  { name: "F", value: 8, color: "#ef4444" }, // Red
];

const performanceTrendData = Array.from({ length: 6 }, (_, i) => ({
  month: format(subMonths(new Date(), 5 - i), "MMM"),
  score: Math.floor(Math.random() * 15) + 75,
}));

export default function ReportsPage() {
  const [timeRange, setTimeRange] = useState("30");
  const [selectedClass, setSelectedClass] = useState("ALL");
  const [reports, setReports] = useState<Report[]>([]);
  const [classPerformance, setClassPerformance] = useState<ClassPerformance[]>(
    [],
  );

  useEffect(() => {
    // Simulate Data Fetching
    const mockReports: Report[] = [
      {
        id: "1",
        title: "Monthly Attendance Report",
        type: "attendance",
        generatedAt: "2024-01-15",
        period: "January 2024",
        size: "2.4 MB",
        downloadUrl: "#",
      },
      {
        id: "2",
        title: "Quarterly Performance Analysis",
        type: "performance",
        generatedAt: "2024-01-10",
        period: "Q4 2023",
        size: "3.1 MB",
        downloadUrl: "#",
      },
      {
        id: "3",
        title: "Student Progress Report",
        type: "progress",
        generatedAt: "2024-01-05",
        period: "December 2023",
        size: "1.8 MB",
        downloadUrl: "#",
      },
    ];

    const mockClassPerformance: ClassPerformance[] = [
      {
        id: "1",
        name: "Quran Memorization - Level 1",
        code: "QUR-101",
        averageScore: 85,
        attendanceRate: 92,
        studentCount: 24,
        improvement: 12,
      },
      {
        id: "2",
        name: "Tajweed Rules - Beginner",
        code: "TAJ-101",
        averageScore: 78,
        attendanceRate: 88,
        studentCount: 18,
        improvement: -3, // Changed to negative to show red badge logic
      },
      {
        id: "3",
        name: "Fiqh of Worship",
        code: "FIQ-201",
        averageScore: 92,
        attendanceRate: 95,
        studentCount: 15,
        improvement: 5,
      },
    ];

    setReports(mockReports);
    setClassPerformance(mockClassPerformance);
  }, []);

  const generateReport = (type: string) => {
    alert(`Generating ${type} report...`);
  };

  const getReportIcon = (type: string) => {
    switch (type) {
      case "attendance":
        return <Users className="h-5 w-5 text-blue-500" />;
      case "performance":
        return <TrendingUp className="h-5 w-5 text-green-500" />;
      case "progress":
        return <BarChart3 className="h-5 w-5 text-purple-500" />;
      default:
        return <FileText className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6 p-6 max-w-[1600px] mx-auto min-h-screen bg-slate-50/50 dark:bg-slate-900/50">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            Reports & Analytics
          </h1>
          <p className="mt-2 text-gray-500 dark:text-gray-400">
            Generate and analyze academic performance and attendance reports.
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            className="gap-2 bg-white dark:bg-slate-900"
          >
            <Printer className="h-4 w-4" />
            Print
          </Button>
          <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white gap-2 shadow-md">
            <BarChart3 className="h-4 w-4" />
            Generate Report
          </Button>
        </div>
      </div>

      {/* Time Range Selector */}
      <Card className="border-none shadow-sm bg-white dark:bg-slate-900">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div>
                <label className="mb-2 block text-xs font-semibold uppercase text-gray-500">
                  Time Range
                </label>
                <Select value={timeRange} onValueChange={setTimeRange}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7">Last 7 days</SelectItem>
                    <SelectItem value="30">Last 30 days</SelectItem>
                    <SelectItem value="90">Last 90 days</SelectItem>
                    <SelectItem value="180">Last 6 months</SelectItem>
                    <SelectItem value="365">Last year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="mb-2 block text-xs font-semibold uppercase text-gray-500">
                  Class
                </label>
                <Select value={selectedClass} onValueChange={setSelectedClass}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="All Classes" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ALL">All Classes</SelectItem>
                    <SelectItem value="QUR-101">Quran 101</SelectItem>
                    <SelectItem value="TAJ-101">Tajweed 101</SelectItem>
                    <SelectItem value="FIQ-201">Fiqh 201</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Calendar className="mr-2 h-4 w-4" />
                Custom Range
              </Button>
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="hover:shadow-md transition-all">
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                Avg Attendance
              </p>
              <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                92%
              </p>
              <div className="mt-2 flex items-center justify-center text-sm">
                <Badge
                  variant="outline"
                  className="bg-green-50 text-green-700 border-green-200 gap-1"
                >
                  <TrendingUp className="h-3 w-3" /> +5%
                </Badge>
                <span className="ml-2 text-gray-400 text-xs">
                  vs last month
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="hover:shadow-md transition-all">
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                Avg Performance
              </p>
              <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                85%
              </p>
              <div className="mt-2 flex items-center justify-center text-sm">
                <Badge
                  variant="outline"
                  className="bg-blue-50 text-blue-700 border-blue-200 gap-1"
                >
                  <TrendingUp className="h-3 w-3" /> +8%
                </Badge>
                <span className="ml-2 text-gray-400 text-xs">
                  vs last month
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="hover:shadow-md transition-all">
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                Assignments
              </p>
              <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                42
              </p>
              <div className="mt-2 flex items-center justify-center text-sm">
                <Badge variant="secondary" className="gap-1">
                  3 Pending
                </Badge>
                <span className="ml-2 text-gray-400 text-xs">grading</span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="hover:shadow-md transition-all">
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                Active Students
              </p>
              <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                156
              </p>
              <div className="mt-2 flex items-center justify-center text-sm">
                <Badge
                  variant="outline"
                  className="bg-amber-50 text-amber-700 border-amber-200 gap-1"
                >
                  <Users className="h-3 w-3" /> +12
                </Badge>
                <span className="ml-2 text-gray-400 text-xs">new enrolled</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="analytics" className="space-y-6">
        <TabsList className="bg-white dark:bg-slate-900 p-1 border">
          <TabsTrigger value="analytics">Analytics Dashboard</TabsTrigger>
          <TabsTrigger value="class">Class Performance</TabsTrigger>
          <TabsTrigger value="reports">Generated Files</TabsTrigger>
        </TabsList>

        {/* --- ANALYTICS TAB --- */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Attendance Trend */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-500" /> Attendance
                  Trend
                </CardTitle>
                <CardDescription>
                  Monthly student presence vs absence
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={attendanceData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="#e5e7eb"
                        vertical={false}
                      />
                      <XAxis
                        dataKey="month"
                        stroke="#9ca3af"
                        tickLine={false}
                        axisLine={false}
                        tickMargin={10}
                      />
                      <YAxis
                        stroke="#9ca3af"
                        tickLine={false}
                        axisLine={false}
                        domain={[0, 100]}
                      />
                      <Tooltip
                        contentStyle={{
                          borderRadius: "8px",
                          border: "none",
                          boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                        }}
                        formatter={(value: number) => [
                          `${value}%`,
                          "Attendance",
                        ]}
                      />
                      <Line
                        type="monotone"
                        dataKey="present"
                        stroke="#10b981"
                        strokeWidth={3}
                        dot={{ fill: "#10b981", strokeWidth: 2, r: 4 }}
                        activeDot={{ r: 6, strokeWidth: 0 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Grade Distribution */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChartIcon className="h-4 w-4 text-gray-500" /> Grade
                  Distribution
                </CardTitle>
                <CardDescription>Overall academic spread</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={gradeDistributionData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {gradeDistributionData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={entry.color}
                            strokeWidth={0}
                          />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          borderRadius: "8px",
                          border: "none",
                          boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                        }}
                        formatter={(value: number) => [
                          `${value} students`,
                          "Count",
                        ]}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="flex justify-center gap-4 mt-4">
                    {gradeDistributionData.map((item, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-1.5 text-xs"
                      >
                        <span
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="text-gray-600 dark:text-gray-400 font-medium">
                          {item.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Performance Trend */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-gray-500" /> Performance
                History
              </CardTitle>
              <CardDescription>
                Average test scores over the last 6 months
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={performanceTrendData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="#e5e7eb"
                      vertical={false}
                    />
                    <XAxis
                      dataKey="month"
                      stroke="#9ca3af"
                      tickLine={false}
                      axisLine={false}
                      tickMargin={10}
                    />
                    <YAxis
                      stroke="#9ca3af"
                      tickLine={false}
                      axisLine={false}
                      domain={[0, 100]}
                    />
                    <Tooltip
                      cursor={{ fill: "#f3f4f6" }}
                      contentStyle={{
                        borderRadius: "8px",
                        border: "none",
                        boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                      }}
                      formatter={(value: number) => [`${value}%`, "Avg Score"]}
                    />
                    <Bar
                      dataKey="score"
                      fill="#6366f1"
                      radius={[4, 4, 0, 0]}
                      barSize={40}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* --- REPORTS FILE LIST --- */}
        <TabsContent value="reports">
          <Card>
            <CardHeader>
              <CardTitle>Generated Reports Archive</CardTitle>
              <CardDescription>
                Access your previously generated PDF and CSV reports.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {reports.map((report) => (
                  <div
                    key={report.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border border-gray-100 bg-white dark:bg-slate-900 dark:border-gray-800 hover:shadow-md transition-all"
                  >
                    <div className="flex items-center space-x-4 mb-4 sm:mb-0">
                      <div className="rounded-full bg-slate-100 p-3 dark:bg-slate-800">
                        {getReportIcon(report.type)}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {report.title}
                        </h3>
                        <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-500">
                          <Badge
                            variant="secondary"
                            className="capitalize text-xs font-normal"
                          >
                            {report.type}
                          </Badge>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" /> {report.period}
                          </span>
                          <span>
                            {format(
                              new Date(report.generatedAt),
                              "MMM d, yyyy",
                            )}
                          </span>
                          <span>{report.size}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button size="sm" variant="ghost">
                        <Eye className="mr-2 h-4 w-4" /> View
                      </Button>
                      <Button size="sm" variant="outline">
                        <Download className="mr-2 h-4 w-4" /> PDF
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* --- CLASS PERFORMANCE LIST --- */}
        <TabsContent value="class">
          <Card>
            <CardHeader>
              <CardTitle>Class Performance Summary</CardTitle>
              <CardDescription>
                Detailed metrics for your active classes.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                {classPerformance.map((cls) => (
                  <div
                    key={cls.id}
                    className="group rounded-xl border p-6 hover:border-indigo-200 hover:shadow-lg transition-all bg-white dark:bg-slate-900 dark:hover:border-indigo-900"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                      <div className="space-y-4 flex-1">
                        <div className="flex items-center flex-wrap gap-2">
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 transition-colors">
                            {cls.name}
                          </h3>
                          <Badge variant="outline" className="font-mono">
                            {cls.code}
                          </Badge>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                          <div>
                            <p className="text-xs font-medium text-gray-500 uppercase">
                              Avg Score
                            </p>
                            <div className="mt-1 flex items-center gap-2">
                              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                                {cls.averageScore}%
                              </span>
                              <Badge
                                variant={
                                  cls.improvement >= 0
                                    ? "default"
                                    : "destructive"
                                }
                                className={
                                  cls.improvement >= 0
                                    ? "bg-green-100 text-green-700 hover:bg-green-200"
                                    : "bg-red-100 text-red-700 hover:bg-red-200"
                                }
                              >
                                {cls.improvement >= 0 ? (
                                  <TrendingUp className="h-3 w-3 mr-1" />
                                ) : (
                                  <TrendingDown className="h-3 w-3 mr-1" />
                                )}
                                {Math.abs(cls.improvement)}%
                              </Badge>
                            </div>
                          </div>
                          <div>
                            <p className="text-xs font-medium text-gray-500 uppercase">
                              Attendance
                            </p>
                            <p className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">
                              {cls.attendanceRate}%
                            </p>
                          </div>
                          <div>
                            <p className="text-xs font-medium text-gray-500 uppercase">
                              Students
                            </p>
                            <p className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">
                              {cls.studentCount}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-row md:flex-col gap-2 justify-end">
                        <Button
                          size="sm"
                          variant="outline"
                          className="w-full justify-start"
                        >
                          <FileText className="mr-2 h-4 w-4" /> Full Report
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="w-full justify-start"
                        >
                          <Users className="mr-2 h-4 w-4" /> Students
                        </Button>
                        <Button
                          size="sm"
                          className="w-full justify-start bg-indigo-600 hover:bg-indigo-700 text-white"
                        >
                          <Download className="mr-2 h-4 w-4" /> Export CSV
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Quick Actions Footer */}
      <Card className="bg-gradient-to-br from-slate-900 to-slate-800 text-white border-none">
        <CardHeader>
          <CardTitle className="text-white">Quick Report Generation</CardTitle>
          <CardDescription className="text-slate-300">
            Generate standardized reports instantly.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { id: "attendance", label: "Attendance", icon: Users },
              { id: "performance", label: "Performance", icon: TrendingUp },
              { id: "progress", label: "Progress", icon: BarChart3 },
              { id: "grades", label: "Grades", icon: BookOpen },
            ].map((action) => (
              <Button
                key={action.id}
                variant="secondary"
                className="h-auto flex-col gap-3 p-6 bg-white/10 hover:bg-white/20 text-white border-0 transition-all hover:scale-105"
                onClick={() => generateReport(action.id)}
              >
                <div className="p-3 bg-white/10 rounded-full">
                  <action.icon className="h-6 w-6" />
                </div>
                <span>{action.label} Report</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
