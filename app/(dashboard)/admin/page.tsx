// src/app/(dashboard)/admin/page.tsx
"use client";

import { useState, useEffect } from "react";
import {
  Users,
  UserCheck,
  BookOpen,
  GraduationCap,
  DollarSign,
  TrendingUp,
  AlertCircle,
  Clock,
  CheckCircle,
  XCircle,
  MoreVertical,
  Download,
  Filter,
  Search,
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
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { getInitials } from "@/lib/utils";
import { toast } from "sonner";

// Mock data - In production, this would come from API
const stats = [
  {
    name: "Total Users",
    value: "1,234",
    icon: Users,
    change: "+12%",
    color: "bg-purple-500",
  },
  {
    name: "Pending Approvals",
    value: "24",
    icon: UserCheck,
    change: "+3",
    color: "bg-yellow-500",
  },
  {
    name: "Active Classes",
    value: "56",
    icon: BookOpen,
    change: "+8%",
    color: "bg-blue-500",
  },
  {
    name: "Active Teachers",
    value: "42",
    icon: GraduationCap,
    change: "+5%",
    color: "bg-green-500",
  },
  {
    name: "Revenue",
    value: "$12,450",
    icon: DollarSign,
    change: "+18%",
    color: "bg-emerald-500",
  },
  {
    name: "Attendance Rate",
    value: "94%",
    icon: TrendingUp,
    change: "+2%",
    color: "bg-indigo-500",
  },
];

const pendingUsers = [
  {
    id: 1,
    name: "Ahmed Khan",
    email: "ahmed@example.com",
    role: "STUDENT",
    applied: "2 hours ago",
  },
  {
    id: 2,
    name: "Fatima Ali",
    email: "fatima@example.com",
    role: "TEACHER",
    applied: "5 hours ago",
  },
  {
    id: 3,
    name: "Omar Hassan",
    email: "omar@example.com",
    role: "STUDENT",
    applied: "1 day ago",
  },
  {
    id: 4,
    name: "Sara Mohamed",
    email: "sara@example.com",
    role: "PARENT",
    applied: "2 days ago",
  },
  {
    id: 5,
    name: "Yusuf Abdullah",
    email: "yusuf@example.com",
    role: "TEACHER",
    applied: "3 days ago",
  },
];

const recentActivities = [
  {
    id: 1,
    user: "Admin",
    action: "approved student registration",
    time: "5 min ago",
    type: "success",
  },
  {
    id: 2,
    user: "System",
    action: "sent monthly reports",
    time: "1 hour ago",
    type: "info",
  },
  {
    id: 3,
    user: "Teacher Ahmed",
    action: "added new assignment",
    time: "2 hours ago",
    type: "info",
  },
  {
    id: 4,
    user: "Student Omar",
    action: "submitted assignment late",
    time: "3 hours ago",
    type: "warning",
  },
  {
    id: 5,
    user: "Parent Sara",
    action: "made payment",
    time: "5 hours ago",
    type: "success",
  },
];

const attendanceData = [
  { day: "Mon", present: 65, absent: 5 },
  { day: "Tue", present: 70, absent: 2 },
  { day: "Wed", present: 68, absent: 4 },
  { day: "Thu", present: 72, absent: 0 },
  { day: "Fri", present: 66, absent: 6 },
  { day: "Sat", present: 60, absent: 2 },
  { day: "Sun", present: 55, absent: 7 },
];

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

export default function AdminDashboardPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Simulate loading data
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  const handleApproveUser = (userId: number) => {
    toast.success("User approved", {
      description: "The user has been approved successfully.",
    });
    // In production: API call to approve user
  };

  const handleRejectUser = (userId: number) => {
    toast.error("User rejected", {
      description: "The user has been rejected.",
    });
    // In production: API call to reject user
  };

  const filteredUsers = pendingUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-purple-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Admin Dashboard
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Overview of your madrasah&apos;s performance and activities
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export Report
          </Button>
          <Button className="bg-gradient-primary gap-2">
            <UserCheck className="h-4 w-4" />
            Quick Actions
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {stats.map((stat) => (
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

        {/* Right Column - Pending Approvals & Activities */}
        <div className="space-y-6">
          {/* Pending Approvals */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Pending Approvals</CardTitle>
                  <CardDescription>
                    {pendingUsers.length} users waiting for approval
                  </CardDescription>
                </div>
                <Badge variant="destructive">New</Badge>
              </div>
              <div className="mt-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <Input
                    placeholder="Search users..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredUsers.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center justify-between rounded-lg border border-gray-200 p-4 dark:border-gray-700"
                  >
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarFallback className="bg-gradient-primary text-white">
                          {getInitials(user.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-gray-500">{user.email}</p>
                        <div className="mt-1 flex items-center space-x-2">
                          <Badge variant="outline" className="capitalize">
                            {user.role.toLowerCase()}
                          </Badge>
                          <span className="text-xs text-gray-500">
                            {user.applied}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        size="sm"
                        className="h-8 bg-green-500 hover:bg-green-600"
                        onClick={() => handleApproveUser(user.id)}
                      >
                        <CheckCircle className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        className="h-8"
                        onClick={() => handleRejectUser(user.id)}
                      >
                        <XCircle className="h-4 w-4" />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 w-8 p-0"
                          >
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Send Message</DropdownMenuItem>
                          <DropdownMenuItem>Request More Info</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))}
                {filteredUsers.length === 0 && (
                  <div className="py-8 text-center">
                    <UserCheck className="mx-auto h-12 w-12 text-gray-300" />
                    <p className="mt-2 text-gray-500">No pending users found</p>
                  </div>
                )}
              </div>
              <Button variant="outline" className="mt-4 w-full" asChild>
                <a href="/admin/approvals">View All Pending Approvals</a>
              </Button>
            </CardContent>
          </Card>

          {/* Recent Activities */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activities</CardTitle>
              <CardDescription>Latest system activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3">
                    <div
                      className={`mt-0.5 flex h-8 w-8 items-center justify-center rounded-full ${
                        activity.type === "success"
                          ? "bg-green-100 text-green-600"
                          : activity.type === "warning"
                          ? "bg-yellow-100 text-yellow-600"
                          : "bg-blue-100 text-blue-600"
                      }`}
                    >
                      {activity.type === "success" ? (
                        <CheckCircle className="h-4 w-4" />
                      ) : activity.type === "warning" ? (
                        <AlertCircle className="h-4 w-4" />
                      ) : (
                        <Clock className="h-4 w-4" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm">
                        <span className="font-medium">{activity.user}</span>{" "}
                        {activity.action}
                      </p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
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
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
