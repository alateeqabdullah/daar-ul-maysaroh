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
  FileText,
  Printer,
  PieChart as PieIcon,
  Loader2,
  RefreshCcw,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  LineChart,
  Line,
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
  AreaChart,
  Area,
} from "recharts";
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

      const data = await res.json();
      if (res.ok) {
        toast.success("Success", { description: data.message });
      } else {
        throw new Error(data.error);
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
    <div className="space-y-6 pb-20">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Reports & Analytics
          </h1>
          <p className="text-muted-foreground mt-1">
            Live academic performance insights
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2">
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

      {/* FILTER BAR */}
      <Card className="border-0 shadow-sm bg-white/60 dark:bg-slate-900/60 backdrop-blur-md">
        <CardContent className="p-4 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-white dark:bg-slate-950 p-1 rounded-lg border">
              <Calendar className="h-4 w-4 text-muted-foreground ml-2" />
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-[140px] border-0 bg-transparent shadow-none focus:ring-0">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7">Last 7 Days</SelectItem>
                  <SelectItem value="30">Last 30 Days</SelectItem>
                  <SelectItem value="90">Last 3 Months</SelectItem>
                  <SelectItem value="180">Last Semester</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button variant="ghost" size="sm" className="text-muted-foreground">
              <Filter className="h-4 w-4 mr-2" /> Filters
            </Button>
          </div>
          <div className="text-xs text-muted-foreground flex items-center gap-2">
            <RefreshCcw className="h-3 w-3" /> Data updated live
          </div>
        </CardContent>
      </Card>

      {/* KPI GRID (Real Data) */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          {
            l: "Avg Attendance",
            v: initialData.stats.avgAttendance,
            i: Users,
            c: "text-emerald-600",
            bg: "bg-emerald-50 border-emerald-100",
            suffix: "%",
          },
          {
            l: "Avg Performance",
            v: initialData.stats.avgPerformance,
            i: TrendingUp,
            c: "text-blue-600",
            bg: "bg-blue-50 border-blue-100",
            suffix: "%",
          },
          {
            l: "Assignments",
            v: initialData.stats.totalAssignments,
            i: FileText,
            c: "text-purple-600",
            bg: "bg-purple-50 border-purple-100",
            suffix: "",
          },
          {
            l: "Active Students",
            v: initialData.stats.activeStudents,
            i: BookOpen,
            c: "text-amber-600",
            bg: "bg-amber-50 border-amber-100",
            suffix: "",
          },
        ].map((m, i) => (
          <Card
            key={i}
            className={`border hover:shadow-md transition-all ${m.bg}`}
          >
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider opacity-70">
                  {m.l}
                </p>
                <div className={`mt-1 text-3xl font-extrabold ${m.c}`}>
                  <Counter value={m.v} />
                  {m.suffix}
                </div>
              </div>
              <div
                className={`p-3 rounded-xl bg-white/60 backdrop-blur-sm ${m.c}`}
              >
                <m.i className="h-6 w-6" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* TABS & CHARTS */}
      <Tabs defaultValue="analytics" className="space-y-6">
        <TabsList className="bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
          <TabsTrigger value="analytics" className="px-6 gap-2">
            <PieIcon className="h-4 w-4" /> Analytics
          </TabsTrigger>
          <TabsTrigger value="class" className="px-6 gap-2">
            <Users className="h-4 w-4" /> Class Performance
          </TabsTrigger>
          <TabsTrigger value="reports" className="px-6 gap-2">
            <FileText className="h-4 w-4" /> File Archive
          </TabsTrigger>
        </TabsList>

        {/* ANALYTICS TAB */}
        <TabsContent value="analytics" className="space-y-6 m-0">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* 1. Attendance Trend (Line) */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base font-semibold flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-emerald-500" /> Attendance
                  Trend (6 Months)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={initialData.attendanceData}
                      margin={{ top: 5, right: 10, left: 0, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient
                          id="colorAtt"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#10b981"
                            stopOpacity={0.8}
                          />
                          <stop
                            offset="95%"
                            stopColor="#10b981"
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis
                        dataKey="month"
                        axisLine={false}
                        tickLine={false}
                      />
                      <YAxis
                        domain={[0, 100]}
                        axisLine={false}
                        tickLine={false}
                      />
                      <Tooltip
                        contentStyle={{ borderRadius: "8px", border: "none" }}
                      />
                      <Area
                        type="monotone"
                        dataKey="present"
                        stroke="#10b981"
                        fillOpacity={1}
                        fill="url(#colorAtt)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* 2. Grade Distribution (Pie) */}
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
                  <div className="flex gap-4 justify-center pb-2 flex-wrap">
                    {initialData.gradeData.map((g) => (
                      <div
                        key={g.name}
                        className="flex items-center gap-1 text-xs text-muted-foreground"
                      >
                        <span
                          className="w-2 h-2 rounded-full"
                          style={{ background: g.color }}
                        />{" "}
                        {g.name} ({g.value})
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 3. Performance History (Bar) */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="text-base font-semibold">
                  Average Class Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={initialData.performanceData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis
                        dataKey="month"
                        axisLine={false}
                        tickLine={false}
                      />
                      <YAxis
                        axisLine={false}
                        tickLine={false}
                        domain={[0, 100]}
                      />
                      <Tooltip
                        cursor={{ fill: "transparent" }}
                        contentStyle={{ borderRadius: "8px" }}
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
          </div>
        </TabsContent>

        {/* CLASS TAB (Real Data) */}
        <TabsContent value="class" className="m-0 space-y-4">
          {initialData.classMetrics.map((cls) => (
            <Card
              key={cls.id}
              className="hover:border-indigo-200 transition-all"
            >
              <CardContent className="p-6 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-bold text-lg">{cls.name}</h3>
                    <Badge variant="outline" className="font-mono">
                      {cls.code}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">Active Term</p>
                </div>
                <div className="flex gap-8 text-center">
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase">
                      Avg Score
                    </p>
                    <p className="text-xl font-bold text-slate-900 dark:text-white">
                      {cls.averageScore}%
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase">
                      Attendance
                    </p>
                    <p className="text-xl font-bold text-slate-900 dark:text-white">
                      {cls.attendanceRate}%
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase">
                      Students
                    </p>
                    <p className="text-xl font-bold text-slate-900 dark:text-white">
                      {cls.studentCount}
                    </p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleGenerateReport("class_summary")}
                >
                  <Download className="h-4 w-4 mr-2" /> Summary
                </Button>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* REPORTS TAB */}
        <TabsContent value="reports" className="m-0">
          <Card>
            <CardHeader>
              <CardTitle>Generated Reports</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {initialData.recentReports.map((report) => (
                <div
                  key={report.id}
                  className="flex items-center justify-between p-3 border rounded-lg hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-slate-100 rounded-lg">
                      {getReportIcon(report.type)}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{report.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(report.generatedAt).toLocaleDateString()} •{" "}
                        {report.size}
                      </p>
                    </div>
                  </div>
                  <Button size="icon" variant="ghost">
                    <Download className="h-4 w-4 text-slate-400" />
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
