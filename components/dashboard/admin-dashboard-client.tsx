// src/components/dashboard/admin-dashboard-client.tsx
"use client";

import { useState } from "react";
import {
  Users,
  UserCheck,
  BookOpen,
  GraduationCap,
  DollarSign,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  Download,
  Filter,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
import { formatCurrency, formatDate } from "@/lib/utils";
import { toast } from "sonner";

interface AdminDashboardClientProps {
  stats: any;
  activities: any[];
}

// Mock attendance data for chart (replace with real data)
const attendanceData = [
  { day: "Mon", present: 65, absent: 5 },
  { day: "Tue", present: 70, absent: 2 },
  { day: "Wed", present: 68, absent: 4 },
  { day: "Thu", present: 72, absent: 0 },
  { day: "Fri", present: 66, absent: 6 },
  { day: "Sat", present: 60, absent: 2 },
  { day: "Sun", present: 55, absent: 7 },
];

// Mock revenue data for chart (replace with real data)
const revenueData = [
  { month: "Jan", revenue: 4000 },
  { month: "Feb", revenue: 4500 },
  { month: "Mar", revenue: 5200 },
  { month: "Apr", revenue: 5800 },
  { month: "May", revenue: 6200 },
  { month: "Jun", revenue: 6800 },
  { month: "Jul", revenue: 7200 },
];

const userDistributionData = [
  { name: "Students", value: 65, color: "#8b5cf6" },
  { name: "Teachers", value: 15, color: "#3b82f6" },
  { name: "Parents", value: 12, color: "#10b981" },
  { name: "Admins", value: 8, color: "#f59e0b" },
];

export default function AdminDashboardClient({
  stats,
  activities,
}: AdminDashboardClientProps) {
  const [isLoading, setIsLoading] = useState(false);

  const statsData = stats
    ? [
        {
          name: "Total Users",
          value: stats.totalUsers.toString(),
          icon: Users,
          change: "+12%",
          color: "bg-purple-500",
        },
        {
          name: "Pending Approvals",
          value: stats.pendingUsers.toString(),
          icon: UserCheck,
          change: `+${stats.pendingUsers}`,
          color: "bg-yellow-500",
        },
        {
          name: "Active Classes",
          value: stats.activeClasses.toString(),
          icon: BookOpen,
          change: "+8%",
          color: "bg-blue-500",
        },
        {
          name: "Active Teachers",
          value: stats.activeTeachers.toString(),
          icon: GraduationCap,
          change: "+5%",
          color: "bg-green-500",
        },
        {
          name: "Revenue",
          value: formatCurrency(stats.totalRevenue),
          icon: DollarSign,
          change: "+18%",
          color: "bg-emerald-500",
        },
        {
          name: "Attendance Rate",
          value: `${stats.attendanceRate}%`,
          icon: TrendingUp,
          change: "+2%",
          color: "bg-indigo-500",
        },
      ]
    : [];

  const handleExportReport = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      toast.success("Report exported successfully", {
        description: "The dashboard report has been downloaded.",
      });
      setIsLoading(false);
    }, 1500);
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "APPROVAL":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "PAYMENT":
        return <DollarSign className="h-4 w-4 text-blue-600" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-600" />;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case "APPROVAL":
        return "bg-green-100 text-green-600";
      case "PAYMENT":
        return "bg-blue-100 text-blue-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Admin Dashboard
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Real-time overview of your madrasah&apos;s performance
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            className="gap-2"
            onClick={handleExportReport}
            disabled={isLoading}
          >
            <Download className="h-4 w-4" />
            {isLoading ? "Exporting..." : "Export Report"}
          </Button>
          <Button className="bg-gradient-primary gap-2">
            <Filter className="h-4 w-4" />
            Quick Actions
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {statsData.map((stat) => (
          <Card key={stat.name} className="overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {stat.name}
                  </p>
                  <p className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-sm text-green-600 dark:text-green-400">
                    {stat.change} from last month
                  </p>
                </div>
                <div className={`rounded-lg ${stat.color} p-3`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column - Charts */}
        <div className="lg:col-span-2 space-y-6">
          {/* Revenue Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Revenue Overview</CardTitle>
              <CardDescription>
                Monthly revenue for the past 7 months
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={revenueData}>
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
                    <Line
                      type="monotone"
                      dataKey="revenue"
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

          {/* Attendance Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Weekly Attendance</CardTitle>
              <CardDescription>
                Student attendance for the current week
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={attendanceData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="day" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "white",
                        border: "1px solid #E5E7EB",
                        borderRadius: "8px",
                      }}
                    />
                    <Bar
                      dataKey="present"
                      fill="#10b981"
                      radius={[4, 4, 0, 0]}
                    />
                    <Bar
                      dataKey="absent"
                      fill="#ef4444"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Activities & Quick Stats */}
        <div className="space-y-6">
          {/* Recent Activities */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activities</CardTitle>
              <CardDescription>Latest system activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activities.length > 0 ? (
                  activities.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-start space-x-3"
                    >
                      <div
                        className={`mt-0.5 flex h-8 w-8 items-center justify-center rounded-full ${getActivityColor(
                          activity.type
                        )}`}
                      >
                        {getActivityIcon(activity.type)}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm">
                          <span className="font-medium">{activity.user}</span>{" "}
                          {activity.action}
                        </p>
                        <p className="text-xs text-gray-500">
                          {formatDate(activity.time)}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="py-4 text-center text-gray-500">
                    No recent activities
                  </div>
                )}
              </div>
              <Button variant="outline" className="mt-4 w-full" asChild>
                <a href="/admin/activities">View All Activities</a>
              </Button>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Stats</CardTitle>
              <CardDescription>At a glance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {stats && (
                  <>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">
                        Total Students
                      </span>
                      <span className="font-semibold">
                        {stats.totalStudents}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">
                        Total Parents
                      </span>
                      <span className="font-semibold">
                        {stats.totalParents}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">
                       {` Today's Attendance`}
                      </span>
                      <span className="font-semibold">
                        {stats.todayAttendance.length}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">
                        Recent Payments
                      </span>
                      <span className="font-semibold">
                        {stats.recentPayments.length}
                      </span>
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* User Distribution Chart */}
      <Card>
        <CardHeader>
          <CardTitle>User Distribution</CardTitle>
          <CardDescription>
            Breakdown of user roles in the system
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={userDistributionData}
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
                  {userDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #E5E7EB",
                    borderRadius: "8px",
                  }}
                  formatter={(value, name) => [`${value}%`, name]}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
