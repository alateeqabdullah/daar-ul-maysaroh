"use client";

import { useState } from "react";
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
  PieChart as PieIcon,
  Loader2,
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
import { format } from "date-fns";
import { toast } from "sonner";
import { ReportsPageData } from "@/types/reports";
import { Counter } from "@/components/admin/dashboard-ui";

interface Props {
  initialData: ReportsPageData;
}

export default function ReportsClient({ initialData }: Props) {
  const [timeRange, setTimeRange] = useState("30");
  const [isGenerating, setIsGenerating] = useState(false);

  // --- ACTIONS ---
  const handleGenerateReport = async (type: string) => {
    setIsGenerating(true);
    try {
      const res = await fetch("/api/teacher/reports/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, timeRange }),
      });
      if (res.ok) {
        toast.success(
          `${type.charAt(0).toUpperCase() + type.slice(1)} report generated!`,
        );
      } else {
        throw new Error("Failed");
      }
    } catch {
      toast.error("Could not generate report");
    } finally {
      setIsGenerating(false);
    }
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
    <div className="space-y-6 p-4 md:p-6 max-w-[1600px] mx-auto min-h-screen bg-slate-50/50 dark:bg-slate-900/50">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            Reports & Analytics
          </h1>
          <p className="mt-1 text-slate-500 dark:text-slate-400">
            Academic performance insights and generated logs.
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" className="gap-2 bg-background">
            <Printer className="h-4 w-4" /> Print
          </Button>
          <Button
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white gap-2 shadow-md hover:shadow-lg transition-all"
            onClick={() => handleGenerateReport("comprehensive")}
            disabled={isGenerating}
          >
            {isGenerating ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <BarChart3 className="h-4 w-4" />
            )}
            Generate Report
          </Button>
        </div>
      </div>

      {/* Controls */}
      <Card className="border-none shadow-sm bg-white dark:bg-slate-900">
        <CardContent className="p-4 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7">Last 7 Days</SelectItem>
                  <SelectItem value="30">Last 30 Days</SelectItem>
                  <SelectItem value="90">Last 3 Months</SelectItem>
                  <SelectItem value="180">Last 6 Months</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button variant="ghost" size="sm" className="text-muted-foreground">
              <Filter className="h-4 w-4 mr-2" /> More Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Metrics Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {[
          {
            l: "Avg Attendance",
            v: `${initialData.stats.avgAttendance}%`,
            i: Users,
            c: "text-green-600",
            bg: "bg-green-100",
          },
          {
            l: "Avg Performance",
            v: `${initialData.stats.avgPerformance}%`,
            i: TrendingUp,
            c: "text-blue-600",
            bg: "bg-blue-100",
          },
          {
            l: "Assignments",
            v: initialData.stats.totalAssignments,
            i: FileText,
            c: "text-purple-600",
            bg: "bg-purple-100",
          },
          {
            l: "Active Students",
            v: initialData.stats.activeStudents,
            i: BookOpen,
            c: "text-amber-600",
            bg: "bg-amber-100",
          },
        ].map((m, i) => (
          <Card key={i} className="hover:shadow-md transition-all">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {m.l}
                </p>
                <p className={`mt-2 text-2xl font-bold ${m.c}`}>{m.v}</p>
              </div>
              <div
                className={`p-3 rounded-full ${m.bg} ${m.c.replace("text", "bg").replace("600", "50")}`}
              >
                <m.i className={`h-6 w-6 ${m.c}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="analytics" className="space-y-6">
        <TabsList className="bg-white dark:bg-slate-900 border p-1">
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="class">Class Performance</TabsTrigger>
          <TabsTrigger value="reports">File Archive</TabsTrigger>
        </TabsList>

        {/* --- ANALYTICS TAB --- */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Attendance Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base font-semibold flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-blue-500" /> Attendance
                  Trend
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={initialData.attendanceData}
                      margin={{ top: 5, right: 10, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid
                        strokeDasharray="3 3"
                        vertical={false}
                        stroke="#e5e7eb"
                      />
                      <XAxis
                        dataKey="month"
                        stroke="#9ca3af"
                        tickLine={false}
                        axisLine={false}
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
                          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="present"
                        stroke="#10b981"
                        strokeWidth={3}
                        dot={{ r: 4, fill: "#10b981" }}
                        activeDot={{ r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Grades Pie */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base font-semibold flex items-center gap-2">
                  <PieIcon className="h-4 w-4 text-purple-500" /> Grade
                  Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex flex-col items-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={initialData.gradeData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {initialData.gradeData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={entry.color}
                            strokeWidth={0}
                          />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="flex gap-3 justify-center pb-4">
                    {initialData.gradeData.map((g) => (
                      <div
                        key={g.name}
                        className="flex items-center gap-1 text-xs text-muted-foreground"
                      >
                        <span
                          className="w-2 h-2 rounded-full"
                          style={{ background: g.color }}
                        />{" "}
                        {g.name}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Performance Bar Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-semibold">
                Performance History
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={initialData.performanceData}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      stroke="#e5e7eb"
                    />
                    <XAxis
                      dataKey="month"
                      stroke="#9ca3af"
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis
                      stroke="#9ca3af"
                      tickLine={false}
                      axisLine={false}
                      domain={[0, 100]}
                    />
                    <Tooltip
                      cursor={{ fill: "#f3f4f6" }}
                      contentStyle={{ borderRadius: "8px", border: "none" }}
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

        {/* --- CLASS TAB --- */}
        <TabsContent value="class" className="space-y-6">
          <div className="grid gap-4">
            {initialData.classMetrics.map((cls) => (
              <Card key={cls.id} className="hover:shadow-md transition-all">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="space-y-3 flex-1">
                      <div className="flex items-center gap-3">
                        <h3 className="font-bold text-lg">{cls.name}</h3>
                        <Badge variant="outline" className="font-mono">
                          {cls.code}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <p className="text-xs text-muted-foreground uppercase">
                            Avg Score
                          </p>
                          <p className="text-xl font-bold">
                            {cls.averageScore}%
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground uppercase">
                            Attendance
                          </p>
                          <p className="text-xl font-bold">
                            {cls.attendanceRate}%
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground uppercase">
                            Students
                          </p>
                          <p className="text-xl font-bold">
                            {cls.studentCount}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4 mr-2" /> Details
                      </Button>
                      <Button size="sm" variant="secondary">
                        <Download className="h-4 w-4 mr-2" /> CSV
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* --- REPORTS TAB --- */}
        <TabsContent value="reports">
          <Card>
            <CardHeader>
              <CardTitle>Generated Reports</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {initialData.recentReports.map((report) => (
                <div
                  key={report.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg">
                      {getReportIcon(report.type)}
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{report.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {format(new Date(report.generatedAt), "MMM d, yyyy")} •{" "}
                        {report.size}
                      </p>
                    </div>
                  </div>
                  <Button size="sm" variant="ghost">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Footer Quick Gen */}
      <Card className="bg-slate-900 text-white border-none">
        <CardContent className="p-6">
          <h3 className="font-semibold mb-4">Quick Generate</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {["attendance", "performance", "progress", "grades"].map((t) => (
              <Button
                key={t}
                variant="secondary"
                className="h-auto flex-col gap-2 p-4 bg-white/10 hover:bg-white/20 text-white border-0"
                onClick={() => handleGenerateReport(t)}
              >
                <div className="p-2 bg-white/10 rounded-full">
                  {getReportIcon(t)}
                </div>
                <span className="capitalize">{t} Report</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
