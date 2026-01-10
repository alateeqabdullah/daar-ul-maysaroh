"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { formatDistanceToNow } from "date-fns";
import {
  Users,
  UserCheck,
  BookOpen,
  GraduationCap,
  DollarSign,
  TrendingUp,
  Clock,
  Download,
  CalendarCheck,
  CheckCircle2,
  ArrowRight,
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
import { Skeleton } from "@/components/ui/skeleton";
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
  AreaChart,
  Area,
  Legend,
} from "recharts";
import { toast } from "sonner";
import { ApprovalsTable } from "@/components/dashboard/ApprovalsTable";
import { Counter } from "@/components/admin/dashboard-ui"; // Import the counter we made
import type { DashboardApiResponse, PendingUser } from "@/types/dashboard";

// --- ANIMATION VARIANTS ---
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // Stagger effect
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 50, damping: 10 },
  },
};

export default function AdminDashboardPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<DashboardApiResponse | null>(null);
  const [localPendingUsers, setLocalPendingUsers] = useState<PendingUser[]>([]);

  // 1. Fetch Data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<DashboardApiResponse>(
          "/api/admin/dashboard"
        );
        setData(response.data);
        setLocalPendingUsers(response.data.pendingUsers);
      } catch (error: any) {
        if (error.response?.status === 401 || error.response?.status === 403) {
          toast.error("Unauthorized Access");
          router.push("/auth/login");
          return;
        }
        toast.error("Failed to load dashboard data");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [router]);

  // 2. Export Functionality (CSV Generator)
  const handleExport = () => {
    if (!data) return;

    try {
      const headers = ["Metric", "Value"];
      const rows = [
        ["Total Users", data.stats.totalUsers],
        ["Revenue", data.stats.revenue],
        ["Active Classes", data.stats.activeClasses],
        ["Pending Approvals", data.stats.pendingUsers],
      ];

      // Convert to CSV format
      const csvContent =
        "data:text/csv;charset=utf-8," +
        headers.join(",") +
        "\n" +
        rows.map((e) => e.join(",")).join("\n");

      // Create download link
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute(
        "download",
        `dashboard_report_${new Date().toISOString().split("T")[0]}.csv`
      );
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast.success("Report downloaded successfully");
    } catch (error) {
      toast.error("Failed to export data");
    }
  };

  // 3. Scroll to Table Action
  const scrollToApprovals = () => {
    const element = document.getElementById("approvals-section");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // 4. Approve/Reject Logic
  const handleUserAction = async (
    userId: string,
    action: "APPROVE" | "REJECT"
  ) => {
    setLocalPendingUsers((prev) => prev.filter((u) => u.id !== userId));
    try {
      await axios.post("/api/admin/users/action", { userId, action });
      toast.success(action === "APPROVE" ? "User Approved" : "User Rejected");
    } catch (error) {
      toast.error("Action failed");
      // Optional: Refetch data here to sync
    }
  };

  if (isLoading) return <DashboardSkeleton />;
  if (!data) return null;

  // Configuration for Stats Cards
  const statCards = [
    {
      name: "Total Users",
      value: data.stats.totalUsers,
      icon: Users,
      color: "from-violet-500 to-purple-600",
      shadow: "shadow-purple-500/20",
    },
    {
      name: "Pending",
      value: data.stats.pendingUsers,
      icon: UserCheck,
      color: "from-amber-400 to-orange-500",
      shadow: "shadow-orange-500/20",
    },
    {
      name: "Classes",
      value: data.stats.activeClasses,
      icon: BookOpen,
      color: "from-blue-400 to-cyan-500",
      shadow: "shadow-blue-500/20",
    },
    {
      name: "Teachers",
      value: data.stats.activeTeachers,
      icon: GraduationCap,
      color: "from-emerald-400 to-teal-500",
      shadow: "shadow-emerald-500/20",
    },
    {
      name: "Revenue",
      value: data.stats.revenue,
      prefix: "$",
      icon: DollarSign,
      color: "from-green-500 to-emerald-700",
      shadow: "shadow-green-500/20",
    },
    {
      name: "Attendance",
      value: data.stats.attendanceRate,
      suffix: "%",
      icon: TrendingUp,
      color: "from-indigo-400 to-blue-600",
      shadow: "shadow-indigo-500/20",
    },
  ];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-8 pb-10"
    >
      {/* --- HEADER --- */}
      <motion.div
        variants={itemVariants}
        className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
            Admin Dashboard
          </h1>
          <p className="text-muted-foreground mt-1">
            Overview of your madrasah&apos;s performance.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={handleExport}
            className="gap-2 hover:bg-muted/50 transition-colors"
          >
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button
            size="sm"
            onClick={scrollToApprovals}
            className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-lg gap-2 transition-all hover:scale-105"
          >
            <UserCheck className="h-4 w-4" />
            Review Requests
          </Button>
        </div>
      </motion.div>

      {/* --- STATS GRID --- */}
      <motion.div
        variants={containerVariants}
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {statCards.map((stat, i) => (
          <motion.div
            key={stat.name}
            variants={itemVariants}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="group"
          >
            <Card
              className={`border-none shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden relative`}
            >
              {/* Gradient Background Decoration */}
              <div
                className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${stat.color} opacity-10 rounded-bl-full group-hover:scale-110 transition-transform`}
              />

              <CardContent className="p-6 flex justify-between items-center relative z-10">
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    {stat.name}
                  </p>
                  <div className="text-3xl font-bold mt-2 text-foreground">
                    <Counter
                      value={stat.value}
                      prefix={stat.prefix}
                      suffix={stat.suffix}
                    />
                  </div>
                </div>
                <div
                  className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} text-white ${stat.shadow} shadow-lg group-hover:rotate-6 transition-transform`}
                >
                  <stat.icon className="h-6 w-6" />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* --- MAIN CONTENT GRID --- */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* LEFT COLUMN */}
        <div className="lg:col-span-2 space-y-6">
          {/* Revenue Area Chart (More Premium than Line) */}
          <motion.div variants={itemVariants}>
            <Card className="shadow-md border-muted/50">
              <CardHeader>
                <CardTitle>Revenue Analytics</CardTitle>
                <CardDescription>Monthly income trends</CardDescription>
              </CardHeader>
              <CardContent className="h-[320px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data.charts.revenue}>
                    <defs>
                      <linearGradient
                        id="colorRevenue"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#8b5cf6"
                          stopOpacity={0.3}
                        />
                        <stop
                          offset="95%"
                          stopColor="#8b5cf6"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      stroke="#e5e7eb"
                      opacity={0.5}
                    />
                    <XAxis
                      dataKey="month"
                      axisLine={false}
                      tickLine={false}
                      dy={10}
                      tick={{ fontSize: 12, fill: "#6b7280" }}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tickFormatter={(v) => `$${v}`}
                      tick={{ fontSize: 12, fill: "#6b7280" }}
                    />
                    <Tooltip
                      contentStyle={{
                        borderRadius: "12px",
                        border: "none",
                        boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
                      }}
                      formatter={(value) => [
                        `$${Number(value).toLocaleString()}`,
                        "Revenue",
                      ]}
                    />
                    <Area
                      type="monotone"
                      dataKey="revenue"
                      stroke="#8b5cf6"
                      strokeWidth={3}
                      fillOpacity={1}
                      fill="url(#colorRevenue)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>

          {/* Attendance Bar Chart */}
          <motion.div variants={itemVariants}>
            <Card className="shadow-md border-muted/50">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Attendance Overview</CardTitle>
                  <CardDescription>Weekly student presence</CardDescription>
                </div>
                <Badge variant="outline" className="gap-1">
                  <CalendarCheck className="h-3 w-3" /> Last 7 Days
                </Badge>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data.charts.attendance} barGap={8}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      stroke="#e5e7eb"
                      opacity={0.5}
                    />
                    <XAxis
                      dataKey="day"
                      axisLine={false}
                      tickLine={false}
                      dy={10}
                      tick={{ fontSize: 12, fill: "#6b7280" }}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12, fill: "#6b7280" }}
                    />
                    <Tooltip
                      cursor={{ fill: "#f3f4f6", opacity: 0.4 }}
                      contentStyle={{
                        borderRadius: "12px",
                        border: "none",
                        boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                      }}
                    />
                    <Legend
                      iconType="circle"
                      wrapperStyle={{ paddingTop: "20px" }}
                    />
                    <Bar
                      dataKey="present"
                      name="Present"
                      fill="#8b5cf6"
                      radius={[6, 6, 0, 0]}
                      maxBarSize={50}
                    />
                    <Bar
                      dataKey="absent"
                      name="Absent"
                      fill="#ef4444"
                      radius={[6, 6, 0, 0]}
                      maxBarSize={50}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>

          {/* Pending Approvals (Scroll Target) */}
          <motion.div variants={itemVariants} id="approvals-section">
            <Card
              className={`shadow-md border-muted/50 ${
                localPendingUsers.length > 0
                  ? "border-l-4 border-l-yellow-400"
                  : "border-l-4 border-l-green-400"
              }`}
            >
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Pending Approvals</CardTitle>
                  <CardDescription>New users awaiting access</CardDescription>
                </div>
                <Badge
                  className={`${
                    localPendingUsers.length > 0
                      ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
                      : "bg-green-100 text-green-800"
                  }`}
                >
                  {localPendingUsers.length} Requests
                </Badge>
              </CardHeader>
              <CardContent>
                {localPendingUsers.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground flex flex-col items-center animate-in fade-in zoom-in duration-500">
                    <div className="h-16 w-16 bg-green-50 rounded-full flex items-center justify-center mb-4">
                      <CheckCircle2 className="h-8 w-8 text-green-500" />
                    </div>
                    <p className="font-medium text-lg">All Caught Up!</p>
                    <p className="text-sm">
                      There are no pending registration requests.
                    </p>
                  </div>
                ) : (
                  <ApprovalsTable
                    users={localPendingUsers}
                    onApprove={(id) => handleUserAction(id, "APPROVE")}
                    onReject={(id) => handleUserAction(id, "REJECT")}
                  />
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-6">
          {/* Pie Chart */}
          <motion.div variants={itemVariants}>
            <Card className="shadow-md border-muted/50">
              <CardHeader>
                <CardTitle>User Demographics</CardTitle>
                <CardDescription>Role distribution</CardDescription>
              </CardHeader>
              <CardContent className="h-[250px] flex justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={data.charts.userDistribution}
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                      stroke="none"
                    >
                      {data.charts.userDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        borderRadius: "12px",
                        border: "none",
                        boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                      }}
                    />
                    <Legend
                      verticalAlign="bottom"
                      height={36}
                      iconType="circle"
                    />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>

          {/* Activity Feed */}
          <motion.div variants={itemVariants}>
            <Card className="shadow-md border-muted/50 h-fit">
              <CardHeader>
                <CardTitle>Live Activity</CardTitle>
                <CardDescription>Recent system events</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-0">
                  {data.recentActivity.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <Clock className="h-8 w-8 mx-auto mb-2 opacity-50" />
                      <p>No recent activity</p>
                    </div>
                  ) : (
                    data.recentActivity.map((activity, idx) => (
                      <div
                        key={activity.id}
                        className="relative flex gap-4 pb-6 last:pb-0"
                      >
                        {/* Timeline Line */}
                        {idx !== data.recentActivity.length - 1 && (
                          <span className="absolute left-4 top-8 bottom-0 w-[2px] bg-gradient-to-b from-border to-transparent" />
                        )}

                        <div
                          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full shadow-sm z-10 
                          ${
                            activity.type === "PAYMENT"
                              ? "bg-green-100 text-green-600"
                              : "bg-blue-100 text-blue-600"
                          }`}
                        >
                          {activity.type === "PAYMENT" ? (
                            <DollarSign className="h-4 w-4" />
                          ) : (
                            <Users className="h-4 w-4" />
                          )}
                        </div>

                        <div className="space-y-1 flex-1">
                          <div className="flex justify-between items-start">
                            <p className="text-sm font-semibold leading-none text-foreground">
                              {activity.title}
                            </p>
                            <span className="text-[10px] text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                              {formatDistanceToNow(
                                new Date(activity.timestamp),
                                { addSuffix: false }
                              )}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground line-clamp-2">
                            {activity.description}
                          </p>
                          {activity.amount && (
                            <p className="text-xs font-medium text-green-600">
                              +${activity.amount.toLocaleString()}
                            </p>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Quick Tip / Promo Card */}
          <motion.div variants={itemVariants}>
            <div className="rounded-xl bg-gradient-to-br from-indigo-600 to-purple-700 p-6 text-white shadow-lg">
              <h3 className="font-bold text-lg mb-2">Need Help?</h3>
              <p className="text-indigo-100 text-sm mb-4">
                Check our documentation for advanced reports and system
                configuration.
              </p>
              <Button
                variant="secondary"
                size="sm"
                className="w-full text-indigo-700 font-semibold hover:bg-white/90"
              >
                View Docs <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

// --- SKELETON LOADER (Matches new layout) ---
function DashboardSkeleton() {
  return (
    <div className="space-y-8 pb-10">
      <div className="flex justify-between items-center">
        <div className="space-y-2">
          <Skeleton className="h-8 w-[200px]" />
          <Skeleton className="h-4 w-[300px]" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-9 w-[100px]" />
          <Skeleton className="h-9 w-[140px]" />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} className="h-[120px] rounded-xl" />
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Skeleton className="h-[350px] rounded-xl" />
          <Skeleton className="h-[350px] rounded-xl" />
          <Skeleton className="h-[300px] rounded-xl" />
        </div>
        <div className="space-y-6">
          <Skeleton className="h-[300px] rounded-xl" />
          <Skeleton className="h-[500px] rounded-xl" />
        </div>
      </div>
    </div>
  );
}
