// src/components/admin/reports-client.tsx
"use client";

import { useState } from "react";
import {
  BarChart3,
  Download,
  Filter,
  Calendar,
  Users,
  UserCheck,
  DollarSign,
  GraduationCap,
  TrendingUp,
  TrendingDown,
  PieChart,
  LineChart,
  FileText,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Line,
  Legend,
} from "recharts";
import { toast } from "sonner";
import { formatCurrency, formatDate } from "@/lib/utils";

interface ReportsClientProps {
  reportsData: any;
}

export default function ReportsClient({ reportsData }: ReportsClientProps) {
  const [reportType, setReportType] = useState("OVERVIEW");
  const [dateRange, setDateRange] = useState("30d");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateReport = async () => {
    setIsGenerating(true);
    // Simulate report generation
    setTimeout(() => {
      toast.success("Report generated successfully", {
        description:
          "Your report has been generated and is ready for download.",
      });
      setIsGenerating(false);
    }, 2000);
  };

  const handlePrintReport = () => {
    window.print();
  };

  // Mock data for charts
  const studentEnrollmentData = [
    { month: "Jan", students: 45 },
    { month: "Feb", students: 52 },
    { month: "Mar", students: 61 },
    { month: "Apr", students: 68 },
    { month: "May", students: 74 },
    { month: "Jun", students: 82 },
  ];

  const revenueTrendData = [
    { month: "Jan", revenue: 4000 },
    { month: "Feb", revenue: 4500 },
    { month: "Mar", revenue: 5200 },
    { month: "Apr", revenue: 5800 },
    { month: "May", revenue: 6200 },
    { month: "Jun", revenue: 6800 },
  ];

  const attendanceDistributionData = reportsData
    ? [
        {
          name: "Present",
          value: reportsData.attendanceStats.present,
          color: "#10b981",
        },
        {
          name: "Absent",
          value: reportsData.attendanceStats.absent,
          color: "#ef4444",
        },
        {
          name: "Late",
          value: reportsData.attendanceStats.late,
          color: "#f59e0b",
        },
      ]
    : [];

  const studentGenderData = reportsData
    ? [
        {
          name: "Male",
          value: reportsData.studentStats.male,
          color: "#3b82f6",
        },
        {
          name: "Female",
          value: reportsData.studentStats.female,
          color: "#8b5cf6",
        },
      ]
    : [];

  const reportTypes = [
    { value: "OVERVIEW", label: "Overview" },
    { value: "STUDENTS", label: "Student Reports" },
    { value: "FINANCIAL", label: "Financial Reports" },
    { value: "ATTENDANCE", label: "Attendance Reports" },
    { value: "TEACHERS", label: "Teacher Reports" },
  ];

  const dateRanges = [
    { value: "7d", label: "Last 7 Days" },
    { value: "30d", label: "Last 30 Days" },
    { value: "90d", label: "Last 90 Days" },
    { value: "1y", label: "Last Year" },
    { value: "custom", label: "Custom Range" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Reports & Analytics
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Generate and analyze system reports
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            className="gap-2"
            onClick={handlePrintReport}
          >
            <Printer className="h-4 w-4" />
            Print
          </Button>
          <Button
            className="bg-gradient-primary gap-2"
            onClick={handleGenerateReport}
            disabled={isGenerating}
          >
            {isGenerating ? (
              <>
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Generating...
              </>
            ) : (
              <>
                <Download className="h-4 w-4" />
                Generate Report
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <Label htmlFor="report-type">Report Type</Label>
              <Select value={reportType} onValueChange={setReportType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select report type" />
                </SelectTrigger>
                <SelectContent>
                  {reportTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="date-range">Date Range</Label>
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select date range" />
                </SelectTrigger>
                <SelectContent>
                  {dateRanges.map((range) => (
                    <SelectItem key={range.value} value={range.value}>
                      {range.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button className="w-full gap-2">
                <Filter className="h-4 w-4" />
                Apply Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Summary Stats */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Students
                </p>
                <p className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
                  {reportsData?.studentStats.total || 0}
                </p>
                <div className="mt-1 flex items-center text-sm text-green-600">
                  <TrendingUp className="mr-1 h-4 w-4" />
                  <span>12% increase</span>
                </div>
              </div>
              <div className="rounded-lg bg-blue-100 p-3">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Attendance Rate
                </p>
                <p className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
                  {reportsData?.attendanceStats.present > 0
                    ? `${(
                        (reportsData.attendanceStats.present /
                          (reportsData.attendanceStats.present +
                            reportsData.attendanceStats.absent +
                            reportsData.attendanceStats.late)) *
                        100
                      ).toFixed(1)}%`
                    : "0%"}
                </p>
                <div className="mt-1 flex items-center text-sm text-green-600">
                  <TrendingUp className="mr-1 h-4 w-4" />
                  <span>5% increase</span>
                </div>
              </div>
              <div className="rounded-lg bg-green-100 p-3">
                <UserCheck className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Revenue
                </p>
                <p className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
                  {formatCurrency(reportsData?.financialStats.total || 0)}
                </p>
                <div className="mt-1 flex items-center text-sm text-green-600">
                  <TrendingUp className="mr-1 h-4 w-4" />
                  <span>18% increase</span>
                </div>
              </div>
              <div className="rounded-lg bg-purple-100 p-3">
                <DollarSign className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Active Teachers
                </p>
                <p className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
                  {reportsData?.teacherStats.available || 0}
                </p>
                <div className="mt-1 flex items-center text-sm text-green-600">
                  <TrendingUp className="mr-1 h-4 w-4" />
                  <span>8% increase</span>
                </div>
              </div>
              <div className="rounded-lg bg-yellow-100 p-3">
                <GraduationCap className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Student Enrollment Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Student Enrollment Trend</CardTitle>
            <CardDescription>
              Monthly student enrollment over time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={studentEnrollmentData}>
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
                    dataKey="students"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    dot={{ fill: "#3b82f6", strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Revenue Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue Trend</CardTitle>
            <CardDescription>Monthly revenue over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueTrendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="month" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #E5E7EB",
                      borderRadius: "8px",
                    }}
                    formatter={(value) => [`$${value}`, "Revenue"]}
                  />
                  <Bar dataKey="revenue" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Distribution Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Attendance Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Attendance Distribution</CardTitle>
            <CardDescription>Breakdown of attendance status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    data={attendanceDistributionData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) =>
                      `${name}: ${(percent * 100).toFixed(1)}%`
                    }
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {attendanceDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #E5E7EB",
                      borderRadius: "8px",
                    }}
                    formatter={(value) => [`${value} records`, "Count"]}
                  />
                  <Legend />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Student Gender Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Student Gender Distribution</CardTitle>
            <CardDescription>Breakdown of students by gender</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    data={studentGenderData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) =>
                      `${name}: ${(percent * 100).toFixed(1)}%`
                    }
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {studentGenderData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #E5E7EB",
                      borderRadius: "8px",
                    }}
                    formatter={(value) => [`${value} students`, "Count"]}
                  />
                  <Legend />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activities */}
      <Card>
        <CardHeader>
          <CardTitle>Recent User Registrations</CardTitle>
          <CardDescription>
            New users registered in the last 30 days
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                    Name
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                    Role
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                    Registration Date
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {reportsData?.recentActivities.map((activity: any) => (
                  <tr key={activity.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium">{activity.name}</td>
                    <td className="px-4 py-3">
                      <Badge variant="outline" className="capitalize">
                        {activity.role.toLowerCase()}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-gray-500">
                      {formatDate(activity.createdAt)}
                    </td>
                    <td className="px-4 py-3">
                      <Badge className="bg-green-100 text-green-800">
                        Active
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
