"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Download,
  PieChart as PieIcon,
  BarChart3,
  TrendingUp,
  Users,
  DollarSign,
  CalendarCheck,
  FileText,
  Loader2,
  ArrowUpRight,
  ArrowDownRight,
  Wallet,
  Badge,
  Clock,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  AreaChart,
  Area,
} from "recharts";
import { toast } from "sonner";
import { getInitials } from "@/lib/utils";
import { Counter } from "@/components/admin/dashboard-ui";

// --- ANIMATIONS ---
const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } },
};
const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1 },
};

interface ReportsClientProps {
  data: {
    studentStats: { total: number; male: number; female: number };
    attendanceStats: {
      present: number;
      absent: number;
      late: number;
      total: number;
    };
    financialStats: { total: number; average: number; count: number };
    teacherStats: { available: number; unavailable: number };
    recentActivities: any[];
  };
}

export default function ReportsClient({ data }: ReportsClientProps) {
  const [isExporting, setIsExporting] = useState(false);

  // --- CHART DATA PREP ---
  const genderData = [
    { name: "Male", value: data.studentStats.male, color: "#3b82f6" },
    { name: "Female", value: data.studentStats.female, color: "#ec4899" },
  ];

  const attendanceData = [
    { name: "Present", value: data.attendanceStats.present, color: "#10b981" },
    { name: "Absent", value: data.attendanceStats.absent, color: "#ef4444" },
    { name: "Late", value: data.attendanceStats.late, color: "#f59e0b" },
  ];

  // Mock trend data for visuals (replace with real historical data if available)
  const financialTrend = [
    { name: "Week 1", amount: data.financialStats.total * 0.15 },
    { name: "Week 2", amount: data.financialStats.total * 0.25 },
    { name: "Week 3", amount: data.financialStats.total * 0.2 },
    { name: "Week 4", amount: data.financialStats.total * 0.4 },
  ];

  // --- EXPORT ACTION ---
  const handleExport = async () => {
    setIsExporting(true);
    try {
      const res = await fetch("/api/admin/reports?type=export&range=30d");
      const result = await res.json();

      if (!res.ok) throw new Error("Failed to fetch data");

      // Generate CSV for Payments as an example
      const headers = ["Invoice", "Amount", "Status", "Date"];
      const rows = result.payments.map((p: any) => [
        p.invoiceNumber || "N/A",
        p.amount,
        p.status,
        new Date(p.createdAt).toLocaleDateString(),
      ]);

      const csvContent =
        "data:text/csv;charset=utf-8," +
        [headers.join(","), ...rows.map((e: any) => e.join(","))].join("\n");
      const link = document.createElement("a");
      link.setAttribute("href", encodeURI(csvContent));
      link.setAttribute(
        "download",
        `report_${new Date().toISOString().split("T")[0]}.csv`
      );
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast.success("Report downloaded");
    } catch (error) {
      toast.error("Export failed");
    } finally {
      setIsExporting(false);
    }
  };

  const formatCurrency = (val: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(val);

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-8 pb-10"
    >
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
            Reports & Analytics
          </h1>
          <p className="text-muted-foreground mt-1">
            System-wide performance metrics and insights
          </p>
        </div>
        <Button
          onClick={handleExport}
          disabled={isExporting}
          variant="outline"
          className="gap-2"
        >
          {isExporting ? (
            <Loader2 className="animate-spin h-4 w-4" />
          ) : (
            <Download className="h-4 w-4" />
          )}
          Download Report
        </Button>
      </div>

      {/* TABS */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="bg-slate-100 dark:bg-slate-800 p-1 rounded-xl w-full justify-start overflow-x-auto">
          <TabsTrigger value="overview" className="rounded-lg gap-2 px-4">
            <PieIcon className="h-4 w-4" /> Overview
          </TabsTrigger>
          <TabsTrigger value="students" className="rounded-lg gap-2 px-4">
            <Users className="h-4 w-4" /> Demographics
          </TabsTrigger>
          <TabsTrigger value="financial" className="rounded-lg gap-2 px-4">
            <DollarSign className="h-4 w-4" /> Financials
          </TabsTrigger>
        </TabsList>

        <div className="mt-6">
          {/* OVERVIEW TAB */}
          <TabsContent value="overview" className="space-y-6">
            {/* Quick Stats Bento */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Card 1: Students */}
              <Card className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white border-0 shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <Users className="h-24 w-24" />
                </div>
                <CardContent className="p-6 relative z-10">
                  <p className="text-indigo-100 text-xs font-bold uppercase tracking-wider">
                    Total Students
                  </p>
                  <h3 className="text-4xl font-extrabold mt-2">
                    <Counter value={data.studentStats.total} />
                  </h3>
                  <div className="mt-4 flex items-center text-xs bg-white/20 w-fit px-2 py-1 rounded backdrop-blur-sm">
                    <ArrowUpRight className="h-3 w-3 mr-1" /> 12% Growth
                  </div>
                </CardContent>
              </Card>

              {/* Card 2: Revenue */}
              <Card className="bg-white dark:bg-slate-900 border-emerald-100 dark:border-emerald-900/30 shadow-sm relative overflow-hidden">
                <div className="absolute bottom-0 right-0 p-4 opacity-5">
                  <DollarSign className="h-24 w-24 text-emerald-500" />
                </div>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-emerald-600 text-xs font-bold uppercase tracking-wider">
                        Revenue (YTD)
                      </p>
                      <h3 className="text-3xl font-bold text-slate-900 dark:text-white mt-2">
                        {formatCurrency(data.financialStats.total)}
                      </h3>
                    </div>
                    <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 rounded-lg">
                      <TrendingUp className="h-5 w-5" />
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-4">
                    {data.financialStats.count} Transactions processed
                  </p>
                </CardContent>
              </Card>

              {/* Card 3: Attendance */}
              <Card className="bg-white dark:bg-slate-900 border-blue-100 dark:border-blue-900/30 shadow-sm relative">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-blue-600 text-xs font-bold uppercase tracking-wider">
                        Attendance Rate
                      </p>
                      <h3 className="text-3xl font-bold text-slate-900 dark:text-white mt-2">
                        {data.attendanceStats.total > 0
                          ? Math.round(
                              (data.attendanceStats.present /
                                data.attendanceStats.total) *
                                100
                            )
                          : 0}
                        %
                      </h3>
                    </div>
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-lg">
                      <CalendarCheck className="h-5 w-5" />
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-4">
                    Average this month
                  </p>
                </CardContent>
              </Card>

              {/* Card 4: Teachers */}
              <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">
                        Faculty
                      </p>
                      <h3 className="text-3xl font-bold text-slate-900 dark:text-white mt-2">
                        <Counter value={data.teacherStats.available} />
                      </h3>
                    </div>
                    <div className="p-2 bg-slate-100 dark:bg-slate-800 text-slate-600 rounded-lg">
                      <FileText className="h-5 w-5" />
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-4">
                    Active Instructors
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Recent Activity */}
              <Card className="lg:col-span-2 border-slate-200 dark:border-slate-800 bg-white/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <FileText className="h-5 w-5 text-purple-500" /> Recent
                    Registrations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {data.recentActivities.length > 0 ? (
                      data.recentActivities.map((user: any) => (
                        <div
                          key={user.id}
                          className="flex items-center justify-between p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm transition-all hover:shadow-md"
                        >
                          <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10 border-2 border-white dark:border-slate-800 shadow-sm">
                              <AvatarImage src={user.image} />
                              <AvatarFallback className="bg-gradient-to-br from-blue-50 to-indigo-50 text-indigo-600">
                                {getInitials(user.name)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="text-sm font-bold text-slate-900 dark:text-white">
                                {user.name}
                              </p>
                              <Badge
                                variant="secondary"
                                className="text-[10px] h-5"
                              >
                                {user.role}
                              </Badge>
                            </div>
                          </div>
                          <span className="text-xs text-slate-400 font-mono">
                            {new Date(user.date).toLocaleDateString()}
                          </span>
                        </div>
                      ))
                    ) : (
                      <p className="text-muted-foreground text-center py-12">
                        No recent activity.
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Gender Pie Chart */}
              <Card className="border-slate-200 dark:border-slate-800">
                <CardHeader>
                  <CardTitle className="text-lg">Demographics</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center">
                  <div className="h-[200px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={genderData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {genderData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip
                          contentStyle={{ borderRadius: "8px", border: "none" }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex gap-6 mt-4 justify-center w-full">
                    {genderData.map((g) => (
                      <div
                        key={g.name}
                        className="flex items-center gap-2 text-sm"
                      >
                        <span
                          className="w-3 h-3 rounded-full shadow-sm"
                          style={{ backgroundColor: g.color }}
                        />
                        <span className="text-slate-600 dark:text-slate-400 font-medium">
                          {g.name} ({g.value})
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* DEMOGRAPHICS TAB */}
          <TabsContent value="students" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-slate-200 dark:border-slate-800">
                <CardHeader>
                  <CardTitle>Attendance Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={attendanceData}
                        layout="vertical"
                        margin={{ left: 20 }}
                      >
                        <CartesianGrid
                          strokeDasharray="3 3"
                          horizontal={true}
                          vertical={false}
                        />
                        <XAxis type="number" hide />
                        <YAxis
                          dataKey="name"
                          type="category"
                          axisLine={false}
                          tickLine={false}
                          width={80}
                        />
                        <Tooltip
                          cursor={{ fill: "transparent" }}
                          contentStyle={{ borderRadius: "8px" }}
                        />
                        <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={32}>
                          {attendanceData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card className="flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-900 border-dashed border-2 border-slate-200 dark:border-slate-800 p-8">
                <BarChart3 className="h-16 w-16 text-slate-300 mb-4" />
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                  Academic Performance
                </h3>
                <p className="text-slate-500 text-center max-w-xs mt-2">
                  Detailed grade analysis reports will appear here once more
                  data is collected.
                </p>
              </Card>
            </div>
          </TabsContent>

          {/* FINANCIAL TAB */}
          <TabsContent value="financial" className="space-y-6">
            <Card className="border-slate-200 dark:border-slate-800">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Revenue Trend</CardTitle>
                <Badge
                  variant="outline"
                  className="bg-emerald-50 text-emerald-700 border-emerald-200"
                >
                  Monthly View
                </Badge>
              </CardHeader>
              <CardContent>
                <div className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={financialTrend}>
                      <defs>
                        <linearGradient
                          id="colorFinancial"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#10b981"
                            stopOpacity={0.3}
                          />
                          <stop
                            offset="95%"
                            stopColor="#10b981"
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        vertical={false}
                        stroke="#e2e8f0"
                      />
                      <XAxis
                        dataKey="name"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: "#94a3b8" }}
                        dy={10}
                      />
                      <YAxis
                        tickFormatter={(val) => `$${val}`}
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: "#94a3b8" }}
                      />
                      <Tooltip
                        contentStyle={{
                          borderRadius: "12px",
                          border: "none",
                          boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                        }}
                        formatter={(value: any) =>
                          formatCurrency(Number(value))
                        }
                      />
                      <Area
                        type="monotone"
                        dataKey="amount"
                        stroke="#10b981"
                        strokeWidth={3}
                        fillOpacity={1}
                        fill="url(#colorFinancial)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="p-6 flex items-center justify-between bg-blue-50 border-blue-100">
                <div>
                  <p className="text-xs uppercase font-bold text-blue-600">
                    Avg Transaction
                  </p>
                  <h3 className="text-2xl font-bold text-blue-900">
                    {formatCurrency(data.financialStats.average)}
                  </h3>
                </div>
                <Wallet className="h-8 w-8 text-blue-400 opacity-50" />
              </Card>
              <Card className="p-6 flex items-center justify-between bg-purple-50 border-purple-100">
                <div>
                  <p className="text-xs uppercase font-bold text-purple-600">
                    Total Volume
                  </p>
                  <h3 className="text-2xl font-bold text-purple-900">
                    {data.financialStats.count}
                  </h3>
                </div>
                <FileText className="h-8 w-8 text-purple-400 opacity-50" />
              </Card>
              <Card className="p-6 flex items-center justify-between bg-amber-50 border-amber-100">
                <div>
                  <p className="text-xs uppercase font-bold text-amber-600">
                    Pending
                  </p>
                  <h3 className="text-2xl font-bold text-amber-900">$0.00</h3>
                </div>
                <Clock className="h-8 w-8 text-amber-400 opacity-50" />
              </Card>
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </motion.div>
  );
}
