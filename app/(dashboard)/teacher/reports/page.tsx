// src/app/(dashboard)/teacher/reports/page.tsx
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
import { format, subMonths, startOfMonth, endOfMonth } from "date-fns";

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

export default function ReportsPage() {
  const [timeRange, setTimeRange] = useState("30");
  const [selectedClass, setSelectedClass] = useState("ALL");
  const [reports, setReports] = useState<Report[]>([]);
  const [classPerformance, setClassPerformance] = useState<ClassPerformance[]>(
    []
  );

  // Mock data for charts
  const attendanceData = Array.from({ length: 12 }, (_, i) => ({
    month: format(subMonths(new Date(), 11 - i), "MMM"),
    present: Math.floor(Math.random() * 30) + 70,
    absent: Math.floor(Math.random() * 10) + 5,
  }));

  const gradeDistributionData = [
    { name: "A", value: 25, color: "#10b981" },
    { name: "B", value: 35, color: "#3b82f6" },
    { name: "C", value: 20, color: "#f59e0b" },
    { name: "D", value: 12, color: "#f97316" },
    { name: "F", value: 8, color: "#ef4444" },
  ];

  const performanceTrendData = Array.from({ length: 6 }, (_, i) => ({
    month: format(subMonths(new Date(), 5 - i), "MMM"),
    score: Math.floor(Math.random() * 15) + 75,
  }));

  useEffect(() => {
    // Fetch reports and class performance data
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
        improvement: 8,
      },
      {
        id: "3",
        name: "Fiqh of Worship",
        code: "FIQ-201",
        averageScore: 92,
        attendanceRate: 95,
        studentCount: 15,
        improvement: 15,
      },
    ];

    setReports(mockReports);
    setClassPerformance(mockClassPerformance);
  }, []);

  const generateReport = (type: string) => {
    // Report generation logic would go here
    alert(`Generating ${type} report...`);
  };

  const getReportIcon = (type: string) => {
    switch (type) {
      case "attendance":
        return <Users className="h-5 w-5" />;
      case "performance":
        return <TrendingUp className="h-5 w-5" />;
      case "progress":
        return <BarChart3 className="h-5 w-5" />;
      default:
        return <FileText className="h-5 w-5" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Reports & Analytics
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Generate and analyze reports for your classes
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" className="gap-2">
            <Printer className="h-4 w-4" />
            Print
          </Button>
          <Button className="bg-gradient-primary gap-2">
            <BarChart3 className="h-4 w-4" />
            Generate Report
          </Button>
        </div>
      </div>

      {/* Time Range Selector */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Time Range
                </label>
                <Select value={timeRange} onValueChange={setTimeRange}>
                  <SelectTrigger className="w-40">
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
                <label className="mb-2 block text-sm font-medium">Class</label>
                <Select value={selectedClass} onValueChange={setSelectedClass}>
                  <SelectTrigger className="w-40">
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
            <div className="flex items-center space-x-2">
              <Button variant="outline">
                <Calendar className="mr-2 h-4 w-4" />
                Custom Range
              </Button>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                More Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <div className="grid gap-6 sm:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-sm font-medium text-gray-600">
                Avg Attendance
              </p>
              <p className="mt-2 text-2xl font-bold text-green-600">92%</p>
              <div className="mt-2 flex items-center justify-center text-sm">
                <TrendingUp className="mr-1 h-4 w-4 text-green-500" />
                <span className="text-green-600">+5% from last month</span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-sm font-medium text-gray-600">
                Avg Performance
              </p>
              <p className="mt-2 text-2xl font-bold text-blue-600">85%</p>
              <div className="mt-2 flex items-center justify-center text-sm">
                <TrendingUp className="mr-1 h-4 w-4 text-blue-500" />
                <span className="text-blue-600">+8% from last month</span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-sm font-medium text-gray-600">Assignments</p>
              <p className="mt-2 text-2xl font-bold text-purple-600">42</p>
              <p className="mt-1 text-sm text-gray-500">3 pending grading</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-sm font-medium text-gray-600">
                Active Students
              </p>
              <p className="mt-2 text-2xl font-bold text-yellow-600">156</p>
              <div className="mt-2 flex items-center justify-center text-sm">
                <Users className="mr-1 h-4 w-4 text-yellow-500" />
                <span className="text-yellow-600">12 new this month</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="analytics">
        <TabsList>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reports">Generated Reports</TabsTrigger>
          <TabsTrigger value="class">Class Reports</TabsTrigger>
          <TabsTrigger value="student">Student Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="analytics">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Attendance Trend */}
            <Card>
              <CardHeader>
                <CardTitle>Attendance Trend</CardTitle>
                <CardDescription>
                  Monthly attendance rate over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={attendanceData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="month" stroke="#9CA3AF" />
                      <YAxis stroke="#9CA3AF" domain={[0, 100]} />
                      <Tooltip
                        formatter={(value) => [`${value}%`, "Attendance"]}
                        contentStyle={{
                          backgroundColor: "white",
                          border: "1px solid #E5E7EB",
                          borderRadius: "8px",
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="present"
                        stroke="#10b981"
                        strokeWidth={2}
                        dot={{ fill: "#10b981", strokeWidth: 2, r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Grade Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Grade Distribution</CardTitle>
                <CardDescription>
                  Overall grade distribution across all classes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={gradeDistributionData}
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
                        {gradeDistributionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value) => [`${value} students`, "Count"]}
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

          {/* Performance Trend */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Performance Trend</CardTitle>
              <CardDescription>
                Average score trend over the last 6 months
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={performanceTrendData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="month" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" domain={[0, 100]} />
                    <Tooltip
                      formatter={(value) => [`${value}%`, "Average Score"]}
                      contentStyle={{
                        backgroundColor: "white",
                        border: "1px solid #E5E7EB",
                        borderRadius: "8px",
                      }}
                    />
                    <Bar dataKey="score" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports">
          <Card>
            <CardHeader>
              <CardTitle>Generated Reports</CardTitle>
              <CardDescription>Previously generated reports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {reports.map((report) => (
                  <div
                    key={report.id}
                    className="flex items-center justify-between rounded-lg border border-gray-200 p-4 dark:border-gray-700"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="rounded-lg bg-gray-100 p-3 dark:bg-gray-800">
                        {getReportIcon(report.type)}
                      </div>
                      <div>
                        <h3 className="font-semibold">{report.title}</h3>
                        <div className="mt-1 flex items-center space-x-4 text-sm text-gray-500">
                          <span className="capitalize">{report.type}</span>
                          <span>Period: {report.period}</span>
                          <span>
                            Generated:{" "}
                            {format(
                              new Date(report.generatedAt),
                              "MMM d, yyyy"
                            )}
                          </span>
                          <span>{report.size}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button size="sm" variant="outline">
                        <Eye className="mr-2 h-4 w-4" />
                        View
                      </Button>
                      <Button size="sm" variant="outline">
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </Button>
                      <Button size="sm" variant="ghost">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="class">
          <Card>
            <CardHeader>
              <CardTitle>Class Performance Reports</CardTitle>
              <CardDescription>
                Detailed performance analysis by class
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {classPerformance.map((cls) => (
                  <Card key={cls.id}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="flex items-center space-x-2">
                            <h3 className="text-lg font-bold">{cls.name}</h3>
                            <Badge variant="outline">{cls.code}</Badge>
                            <Badge className="bg-gradient-primary text-white">
                              {cls.studentCount} students
                            </Badge>
                          </div>
                          <div className="mt-4 grid grid-cols-3 gap-4">
                            <div>
                              <p className="text-sm font-medium text-gray-600">
                                Average Score
                              </p>
                              <div className="mt-2 flex items-center space-x-2">
                                <span className="text-2xl font-bold text-blue-600">
                                  {cls.averageScore}%
                                </span>
                                {cls.improvement > 0 ? (
                                  <Badge className="bg-green-100 text-green-800">
                                    <TrendingUp className="mr-1 h-3 w-3" />+
                                    {cls.improvement}%
                                  </Badge>
                                ) : (
                                  <Badge className="bg-red-100 text-red-800">
                                    <TrendingDown className="mr-1 h-3 w-3" />
                                    {cls.improvement}%
                                  </Badge>
                                )}
                              </div>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-600">
                                Attendance Rate
                              </p>
                              <p className="mt-2 text-2xl font-bold text-green-600">
                                {cls.attendanceRate}%
                              </p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-600">
                                Student Count
                              </p>
                              <p className="mt-2 text-2xl font-bold text-purple-600">
                                {cls.studentCount}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col space-y-2">
                          <Button size="sm" variant="outline">
                            <FileText className="mr-2 h-4 w-4" />
                            Detailed Report
                          </Button>
                          <Button size="sm" variant="outline">
                            <Users className="mr-2 h-4 w-4" />
                            Student List
                          </Button>
                          <Button size="sm" className="bg-gradient-primary">
                            <Download className="mr-2 h-4 w-4" />
                            Export
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Quick Report Generation */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Report Generation</CardTitle>
          <CardDescription>
            Generate common reports with one click
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-4">
            <Button
              variant="outline"
              className="h-auto flex-col gap-2 p-4"
              onClick={() => generateReport("attendance")}
            >
              <Users className="h-6 w-6" />
              <span>Attendance Report</span>
            </Button>
            <Button
              variant="outline"
              className="h-auto flex-col gap-2 p-4"
              onClick={() => generateReport("performance")}
            >
              <TrendingUp className="h-6 w-6" />
              <span>Performance Report</span>
            </Button>
            <Button
              variant="outline"
              className="h-auto flex-col gap-2 p-4"
              onClick={() => generateReport("progress")}
            >
              <BarChart3 className="h-6 w-6" />
              <span>Progress Report</span>
            </Button>
            <Button
              variant="outline"
              className="h-auto flex-col gap-2 p-4"
              onClick={() => generateReport("grades")}
            >
              <BookOpen className="h-6 w-6" />
              <span>Grade Report</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
