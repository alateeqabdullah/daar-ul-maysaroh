// // app/(portal)/dashboard/admin/dashboard-client.tsx
// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import {
//   Users,
//   GraduationCap,
//   BookOpen,
//   CreditCard,
//   Clock,
//   Calendar,
//   Bell,
//   Activity,
//   DollarSign,
//   Award,
//   Shield,
//   Crown,
//   Sparkles,
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Progress } from "@/components/ui/progress";
// import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import {
//   AreaChart,
//   Area,
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
//   PieChart,
//   Pie,
//   Cell,
// } from "recharts";
// import {
//   DashboardStats,
//   RevenueData,
//   EnrollmentTrend,
//   RecentActivity,
//   SubscriptionAnalytics,
//   AttendanceSummary,
//   AnnouncementData,
//   EventData,
// } from "./actions/dashboard";

// interface DashboardClientProps {
//   stats: DashboardStats;
//   revenueData: RevenueData;
//   enrollmentTrends: EnrollmentTrend[];
//   recentActivities: RecentActivity[];
//   subscriptionAnalytics: SubscriptionAnalytics;
//   attendanceSummary: AttendanceSummary;
//   recentAnnouncements: AnnouncementData[];
//   upcomingEvents: EventData[];
// }

// const COLORS = {
//   purple: "#8B5CF6",
//   amber: "#F59E0B",
//   green: "#10B981",
//   red: "#EF4444",
//   blue: "#3B82F6",
//   emerald: "#059669",
//   rose: "#F43F5E",
// };

// const getStatusColor = (status: string) => {
//   const colors: Record<string, string> = {
//     COMPLETED: "text-green-600 bg-green-100 dark:bg-green-950/30",
//     PENDING: "text-amber-600 bg-amber-100 dark:bg-amber-950/30",
//     ACTIVE: "text-emerald-600 bg-emerald-100 dark:bg-emerald-950/30",
//     CANCELLED: "text-red-600 bg-red-100 dark:bg-red-950/30",
//     APPROVED: "text-green-600 bg-green-100 dark:bg-green-950/30",
//     REJECTED: "text-red-600 bg-red-100 dark:bg-red-950/30",
//     SUSPENDED: "text-orange-600 bg-orange-100 dark:bg-orange-950/30",
//     PRESENT: "text-green-600 bg-green-100 dark:bg-green-950/30",
//     ABSENT: "text-red-600 bg-red-100 dark:bg-red-950/30",
//     LATE: "text-amber-600 bg-amber-100 dark:bg-amber-950/30",
//   };
//   return colors[status] || "text-gray-600 bg-gray-100 dark:bg-gray-800";
// };

// const formatDate = (date: Date) => {
//   return new Intl.DateTimeFormat("en-US", {
//     month: "short",
//     day: "numeric",
//     hour: "2-digit",
//     minute: "2-digit",
//   }).format(new Date(date));
// };

// const formatCurrency = (amount: number) => {
//   return new Intl.NumberFormat("en-US", {
//     style: "currency",
//     currency: "USD",
//     minimumFractionDigits: 0,
//     maximumFractionDigits: 0,
//   }).format(amount);
// };

// export function DashboardClient({
//   stats,
//   revenueData,
//   enrollmentTrends,
//   recentActivities,
//   subscriptionAnalytics,
//   attendanceSummary,
//   recentAnnouncements,
//   upcomingEvents,
// }: DashboardClientProps) {
//   const [isLoading, setIsLoading] = useState(false);
//   const [revenuePeriod, setRevenuePeriod] = useState<
//     "daily" | "weekly" | "monthly"
//   >("daily");

//   const getRevenueChartData = () => {
//     switch (revenuePeriod) {
//       case "daily":
//         return revenueData.daily;
//       case "weekly":
//         return revenueData.weekly;
//       case "monthly":
//         return revenueData.monthly;
//       default:
//         return revenueData.daily;
//     }
//   };

//   const subscriptionPieData = subscriptionAnalytics.byPlan.map((plan, idx) => ({
//     name: plan.planName,
//     value: plan.count,
//     color: idx % 2 === 0 ? COLORS.purple : COLORS.amber,
//   }));

//   return (
//     <div className="min-h-screen bg-linear-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
//       <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
//         {/* Header */}
//         <div className="mb-8">
//           <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//             <div>
//               <div className="flex items-center gap-2 mb-1">
//                 <Crown className="w-5 h-5 text-amber-500" />
//                 <span className="text-xs font-black uppercase tracking-wider text-amber-600 dark:text-amber-400">
//                   Admin Dashboard
//                 </span>
//               </div>
//               <h1 className="text-3xl sm:text-4xl font-black tracking-tighter bg-linear-to-r from-purple-600 to-amber-600 bg-clip-text text-transparent">
//                 Welcome Back
//               </h1>
//               <p className="text-muted-foreground text-sm mt-1">
//                 Here's what's happening with your institute today.
//               </p>
//             </div>
//             <div className="flex gap-3">
//               <Button variant="outline" className="rounded-full">
//                 <Bell className="w-4 h-4 mr-2" />
//                 Notifications
//               </Button>
//               <Button className="rounded-full bg-linear-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800">
//                 <Sparkles className="w-4 h-4 mr-2" />
//                 Generate Report
//               </Button>
//             </div>
//           </div>
//         </div>

//         {/* Stats Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
//           <Card className="border-l-4 border-l-purple-500">
//             <CardContent className="p-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm text-muted-foreground">
//                     Total Students
//                   </p>
//                   <p className="text-3xl font-black">{stats.totalStudents}</p>
//                   <p className="text-xs text-green-600 mt-1">+12 this month</p>
//                 </div>
//                 <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-950/40 flex items-center justify-center">
//                   <GraduationCap className="w-6 h-6 text-purple-600" />
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//           <Card className="border-l-4 border-l-amber-500">
//             <CardContent className="p-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm text-muted-foreground">
//                     Total Teachers
//                   </p>
//                   <p className="text-3xl font-black">{stats.totalTeachers}</p>
//                   <p className="text-xs text-green-600 mt-1">+2 this month</p>
//                 </div>
//                 <div className="w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-950/40 flex items-center justify-center">
//                   <Users className="w-6 h-6 text-amber-600" />
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//           <Card className="border-l-4 border-l-emerald-500">
//             <CardContent className="p-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm text-muted-foreground">
//                     Monthly Revenue
//                   </p>
//                   <p className="text-3xl font-black">
//                     {formatCurrency(stats.totalRevenueThisMonth)}
//                   </p>
//                   <p className="text-xs text-green-600 mt-1">
//                     +8% from last month
//                   </p>
//                 </div>
//                 <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-950/40 flex items-center justify-center">
//                   <DollarSign className="w-6 h-6 text-emerald-600" />
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//           <Card className="border-l-4 border-l-rose-500">
//             <CardContent className="p-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm text-muted-foreground">
//                     Pending Approvals
//                   </p>
//                   <p className="text-3xl font-black">
//                     {stats.totalPendingUsers}
//                   </p>
//                   <p className="text-xs text-amber-600 mt-1">Awaiting review</p>
//                 </div>
//                 <div className="w-12 h-12 rounded-full bg-rose-100 dark:bg-rose-950/40 flex items-center justify-center">
//                   <Clock className="w-6 h-6 text-rose-600" />
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Main Content Grid */}
//         <div className="grid lg:grid-cols-3 gap-6">
//           {/* Left Column - Charts */}
//           <div className="lg:col-span-2 space-y-6">
//             {/* Revenue Chart */}
//             <Card>
//               <CardHeader className="flex flex-row items-center justify-between">
//                 <div>
//                   <CardTitle>Revenue Overview</CardTitle>
//                   <CardDescription>
//                     Track your institute's financial performance
//                   </CardDescription>
//                 </div>
//                 <Tabs
//                   value={revenuePeriod}
//                   onValueChange={(v) => setRevenuePeriod(v as any)}
//                   className="w-auto"
//                 >
//                   <TabsList>
//                     <TabsTrigger value="daily">Daily</TabsTrigger>
//                     <TabsTrigger value="weekly">Weekly</TabsTrigger>
//                     <TabsTrigger value="monthly">Monthly</TabsTrigger>
//                   </TabsList>
//                 </Tabs>
//               </CardHeader>
//               <CardContent>
//                 <div className="h-80">
//                   <ResponsiveContainer width="100%" height="100%">
//                     <AreaChart data={getRevenueChartData()}>
//                       <CartesianGrid strokeDasharray="3 3" />
//                       <XAxis
//                         dataKey={
//                           revenuePeriod === "daily"
//                             ? "date"
//                             : revenuePeriod === "weekly"
//                               ? "week"
//                               : "month"
//                         }
//                       />
//                       <YAxis />
//                       <Tooltip
//                         formatter={(value) => formatCurrency(value as number)}
//                       />
//                       <Area
//                         type="monotone"
//                         dataKey="amount"
//                         stroke={COLORS.purple}
//                         fill={COLORS.purple}
//                         fillOpacity={0.1}
//                       />
//                     </AreaChart>
//                   </ResponsiveContainer>
//                 </div>
//               </CardContent>
//             </Card>

//             {/* Enrollment Trends */}
//             <Card>
//               <CardHeader>
//                 <CardTitle>Enrollment Trends</CardTitle>
//                 <CardDescription>
//                   Monthly enrollment and completion rates
//                 </CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <div className="h-80">
//                   <ResponsiveContainer width="100%" height="100%">
//                     <LineChart data={enrollmentTrends}>
//                       <CartesianGrid strokeDasharray="3 3" />
//                       <XAxis dataKey="month" />
//                       <YAxis />
//                       <Tooltip />
//                       <Legend />
//                       <Line
//                         type="monotone"
//                         dataKey="enrollments"
//                         stroke={COLORS.purple}
//                         name="Enrollments"
//                       />
//                       <Line
//                         type="monotone"
//                         dataKey="completions"
//                         stroke={COLORS.amber}
//                         name="Completions"
//                       />
//                     </LineChart>
//                   </ResponsiveContainer>
//                 </div>
//               </CardContent>
//             </Card>

//             {/* Subscription Analytics */}
//             <Card>
//               <CardHeader>
//                 <CardTitle>Subscription Analytics</CardTitle>
//                 <CardDescription>Active subscriptions by plan</CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <div className="grid md:grid-cols-2 gap-6">
//                   <div className="h-64">
//                     <ResponsiveContainer width="100%" height="100%">
//                       <PieChart>
//                         <Pie
//                           data={subscriptionPieData}
//                           cx="50%"
//                           cy="50%"
//                           innerRadius={60}
//                           outerRadius={80}
//                           paddingAngle={5}
//                           dataKey="value"
//                           label={({ name, percent = 0 }) =>
//                             `${name} (${(percent * 100).toFixed(0)}%)`
//                           }
//                         >
//                           {subscriptionPieData.map((entry, index) => (
//                             <Cell key={`cell-${index}`} fill={entry.color} />
//                           ))}
//                         </Pie>
//                         <Tooltip />
//                       </PieChart>
//                     </ResponsiveContainer>
//                   </div>
//                   <div className="space-y-4">
//                     <div className="flex justify-between items-center">
//                       <span className="text-sm">Active Subscriptions</span>
//                       <span className="font-black text-lg">
//                         {subscriptionAnalytics.active}
//                       </span>
//                     </div>
//                     <div className="flex justify-between items-center">
//                       <span className="text-sm">Monthly Recurring Revenue</span>
//                       <span className="font-black text-lg text-green-600">
//                         {formatCurrency(
//                           subscriptionAnalytics.monthlyRecurringRevenue,
//                         )}
//                       </span>
//                     </div>
//                     <div className="flex justify-between items-center">
//                       <span className="text-sm">Churn Rate</span>
//                       <span className="font-black text-lg text-red-600">
//                         {subscriptionAnalytics.churnRate}%
//                       </span>
//                     </div>
//                     <Progress
//                       value={100 - subscriptionAnalytics.churnRate}
//                       className="h-2"
//                     />
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>

//           {/* Right Column - Activity & Events */}
//           <div className="space-y-6">
//             {/* Attendance Summary */}
//             <Card>
//               <CardHeader>
//                 <CardTitle>Attendance Overview</CardTitle>
//                 <CardDescription>Student attendance rates</CardDescription>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 <div className="flex justify-between items-center">
//                   <span className="text-sm">Today</span>
//                   <span className="font-black text-lg">
//                     {attendanceSummary.today}%
//                   </span>
//                   <Progress
//                     value={attendanceSummary.today}
//                     className="w-32 h-2"
//                   />
//                 </div>
//                 <div className="flex justify-between items-center">
//                   <span className="text-sm">This Week</span>
//                   <span className="font-black text-lg">
//                     {attendanceSummary.week}%
//                   </span>
//                   <Progress
//                     value={attendanceSummary.week}
//                     className="w-32 h-2"
//                   />
//                 </div>
//                 <div className="flex justify-between items-center">
//                   <span className="text-sm">This Month</span>
//                   <span className="font-black text-lg">
//                     {attendanceSummary.month}%
//                   </span>
//                   <Progress
//                     value={attendanceSummary.month}
//                     className="w-32 h-2"
//                   />
//                 </div>
//                 <div className="pt-4 border-t">
//                   <div className="flex justify-between items-center">
//                     <span className="text-sm font-black">Average Rate</span>
//                     <span className="text-2xl font-black text-purple-600">
//                       {attendanceSummary.averageRate}%
//                     </span>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>

//             {/* Recent Announcements */}
//             <Card>
//               <CardHeader>
//                 <CardTitle>Recent Announcements</CardTitle>
//                 <CardDescription>Latest updates from the team</CardDescription>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 {recentAnnouncements.map((announcement) => (
//                   <div key={announcement.id} className="group">
//                     <div className="flex items-start gap-3">
//                       <div className="w-2 h-2 rounded-full bg-purple-500 mt-2" />
//                       <div className="flex-1">
//                         <div className="flex items-center justify-between">
//                           <p className="font-black text-sm">
//                             {announcement.title}
//                           </p>
//                           <span className="text-[10px] text-muted-foreground">
//                             {formatDate(announcement.createdAt)}
//                           </span>
//                         </div>
//                         <p className="text-xs text-muted-foreground line-clamp-2">
//                           {announcement.content}
//                         </p>
//                         <p className="text-[10px] text-purple-600 mt-1">
//                           By {announcement.createdBy.name}
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </CardContent>
//             </Card>

//             {/* Upcoming Events */}
//             <Card>
//               <CardHeader>
//                 <CardTitle>Upcoming Events</CardTitle>
//                 <CardDescription>Scheduled activities</CardDescription>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 {upcomingEvents.map((event) => (
//                   <div key={event.id} className="flex items-start gap-3">
//                     <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-950/40 flex items-center justify-center shrink-0">
//                       <Calendar className="w-5 h-5 text-purple-600" />
//                     </div>
//                     <div className="flex-1">
//                       <p className="font-black text-sm">{event.title}</p>
//                       <p className="text-xs text-muted-foreground">
//                         {formatDate(event.startDate)}
//                       </p>
//                       {event.location && (
//                         <p className="text-[10px] text-muted-foreground mt-1">
//                           {event.location}
//                         </p>
//                       )}
//                     </div>
//                     <Badge variant="outline" className="text-[9px]">
//                       {event.type}
//                     </Badge>
//                   </div>
//                 ))}
//               </CardContent>
//             </Card>

//             {/* Recent Activity Feed */}
//             <Card>
//               <CardHeader>
//                 <CardTitle>Recent Activity</CardTitle>
//                 <CardDescription>
//                   Latest actions across the platform
//                 </CardDescription>
//               </CardHeader>
//               <CardContent className="space-y-4 max-h-96 overflow-y-auto">
//                 {recentActivities.map((activity, idx) => (
//                   <div key={idx} className="flex items-start gap-3">
//                     <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0">
//                       {activity.type === "user" && (
//                         <Users className="w-4 h-4 text-purple-600" />
//                       )}
//                       {activity.type === "payment" && (
//                         <DollarSign className="w-4 h-4 text-green-600" />
//                       )}
//                       {activity.type === "enrollment" && (
//                         <GraduationCap className="w-4 h-4 text-amber-600" />
//                       )}
//                       {activity.type === "certificate" && (
//                         <Award className="w-4 h-4 text-blue-600" />
//                       )}
//                     </div>
//                     <div className="flex-1">
//                       <p className="text-sm font-medium">
//                         {activity.user.name}
//                       </p>
//                       <p className="text-xs text-muted-foreground">
//                         {activity.details}
//                       </p>
//                       <p className="text-[9px] text-muted-foreground mt-1">
//                         {formatDate(activity.timestamp)}
//                       </p>
//                     </div>
//                     <Badge
//                       className={getStatusColor(activity.action.toUpperCase())}
//                     >
//                       {activity.action}
//                     </Badge>
//                   </div>
//                 ))}
//               </CardContent>
//             </Card>
//           </div>
//         </div>

//         {/* Quick Actions */}
//         <div className="mt-8">
//           <Card>
//             <CardHeader>
//               <CardTitle>Quick Actions</CardTitle>
//               <CardDescription>Common administrative tasks</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
//                 <Link href="/dashboard/admin/users">
//                   <Button variant="outline" className="w-full">
//                     <Users className="w-4 h-4 mr-2" />
//                     Manage Users
//                   </Button>
//                 </Link>
//                 <Link href="/dashboard/admin/classes">
//                   <Button variant="outline" className="w-full">
//                     <BookOpen className="w-4 h-4 mr-2" />
//                     Manage Classes
//                   </Button>
//                 </Link>
//                 <Link href="/dashboard/admin/payments">
//                   <Button variant="outline" className="w-full">
//                     <CreditCard className="w-4 h-4 mr-2" />
//                     View Payments
//                   </Button>
//                 </Link>
//                 <Link href="/dashboard/admin/announcements">
//                   <Button variant="outline" className="w-full">
//                     <Bell className="w-4 h-4 mr-2" />
//                     Post Announcement
//                   </Button>
//                 </Link>
//                 <Link href="/dashboard/admin/reports">
//                   <Button variant="outline" className="w-full">
//                     <Activity className="w-4 h-4 mr-2" />
//                     Generate Report
//                   </Button>
//                 </Link>
//                 <Link href="/dashboard/admin/settings">
//                   <Button variant="outline" className="w-full">
//                     <Shield className="w-4 h-4 mr-2" />
//                     Settings
//                   </Button>
//                 </Link>
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import {
  Users,
  GraduationCap,
  BookOpen,
  CreditCard,
  Clock,
  Calendar,
  Bell,
  Activity,
  DollarSign,
  Award,
  Shield,
  Crown,
  Sparkles,
  RefreshCw,
  Download,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AreaChart,
  Area,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  DashboardStats,
  RevenueData,
  EnrollmentTrend,
  RecentActivity,
  SubscriptionAnalytics,
  AttendanceSummary,
  AnnouncementData,
  EventData,
} from "./actions/dashboard";

interface DashboardClientProps {
  stats: DashboardStats;
  revenueData: RevenueData;
  enrollmentTrends: EnrollmentTrend[];
  recentActivities: RecentActivity[];
  subscriptionAnalytics: SubscriptionAnalytics;
  attendanceSummary: AttendanceSummary;
  recentAnnouncements: AnnouncementData[];
  upcomingEvents: EventData[];
}

const COLORS = {
  purple: "#8B5CF6",
  amber: "#F59E0B",
  green: "#10B981",
  red: "#EF4444",
  blue: "#3B82F6",
  emerald: "#059669",
  rose: "#F43F5E",
};

const getStatusColor = (status: string) => {
  const colors: Record<string, string> = {
    COMPLETED: "text-green-600 bg-green-100 dark:bg-green-950/30",
    PENDING: "text-amber-600 bg-amber-100 dark:bg-amber-950/30",
    ACTIVE: "text-emerald-600 bg-emerald-100 dark:bg-emerald-950/30",
    CANCELLED: "text-red-600 bg-red-100 dark:bg-red-950/30",
    APPROVED: "text-green-600 bg-green-100 dark:bg-green-950/30",
    REJECTED: "text-red-600 bg-red-100 dark:bg-red-950/30",
    SUSPENDED: "text-orange-600 bg-orange-100 dark:bg-orange-950/30",
    PRESENT: "text-green-600 bg-green-100 dark:bg-green-950/30",
    ABSENT: "text-red-600 bg-red-100 dark:bg-red-950/30",
    LATE: "text-amber-600 bg-amber-100 dark:bg-amber-950/30",
    REGISTERED: "text-blue-600 bg-blue-100 dark:bg-blue-950/30",
    ENROLLED: "text-purple-600 bg-purple-100 dark:bg-purple-950/30",
  };
  return colors[status] || "text-gray-600 bg-gray-100 dark:bg-gray-800";
};

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
};

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export function DashboardClient({
  stats,
  revenueData,
  enrollmentTrends,
  recentActivities,
  subscriptionAnalytics,
  attendanceSummary,
  recentAnnouncements,
  upcomingEvents,
}: DashboardClientProps) {
  const { data: session } = useSession();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [revenuePeriod, setRevenuePeriod] = useState<
    "daily" | "weekly" | "monthly"
  >("daily");

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    // Trigger server-side revalidation
    await fetch("/api/revalidate?path=/dashboard/admin");
    window.location.reload();
  }, []);

  const getRevenueChartData = () => {
    switch (revenuePeriod) {
      case "daily":
        return revenueData.daily;
      case "weekly":
        return revenueData.weekly;
      case "monthly":
        return revenueData.monthly;
      default:
        return revenueData.daily;
    }
  };

  const subscriptionPieData = subscriptionAnalytics.byPlan.map((plan, idx) => ({
    name: plan.planName,
    value: plan.count,
    color: idx % 2 === 0 ? COLORS.purple : COLORS.amber,
  }));

  // Role-based visibility for certain sections
  const isAdmin =
    session?.user?.role === "SUPER_ADMIN" || session?.user?.role === "ADMIN";
  const isFinanceAdmin =
    session?.user?.role === "SUPER_ADMIN" || session?.user?.role === "ADMIN";
  const isContentManager = session?.user?.role === "CONTENT_MANAGER";

  return (
    <div className="min-h-screen bg-linear-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Crown className="w-5 h-5 text-amber-500" />
                <span className="text-xs font-black uppercase tracking-wider text-amber-600 dark:text-amber-400">
                  Admin Dashboard
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-black tracking-tighter bg-linear-to-r from-purple-600 to-amber-600 bg-clip-text text-transparent">
                Welcome Back, {session?.user?.name?.split(" ")[0] || "Admin"}
              </h1>
              <p className="text-muted-foreground text-sm mt-1">
                Here's what's happening with your institute today.
              </p>
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="rounded-full"
                onClick={handleRefresh}
                disabled={isRefreshing}
              >
                <RefreshCw
                  className={`w-4 h-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`}
                />
                Refresh
              </Button>
              <Button className="rounded-full bg-linear-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800">
                <Sparkles className="w-4 h-4 mr-2" />
                Generate Report
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="border-l-4 border-l-purple-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Total Students
                  </p>
                  <p className="text-3xl font-black">{stats.totalStudents}</p>
                  <p className="text-xs text-green-600 mt-1">Active students</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-950/40 flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-amber-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Total Teachers
                  </p>
                  <p className="text-3xl font-black">{stats.totalTeachers}</p>
                  <p className="text-xs text-green-600 mt-1">Active teachers</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-950/40 flex items-center justify-center">
                  <Users className="w-6 h-6 text-amber-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          {isFinanceAdmin && (
            <Card className="border-l-4 border-l-emerald-500">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Monthly Revenue
                    </p>
                    <p className="text-3xl font-black">
                      {formatCurrency(stats.totalRevenueThisMonth)}
                    </p>
                    <p className="text-xs text-green-600 mt-1">This month</p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-950/40 flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-emerald-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
          <Card className="border-l-4 border-l-rose-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Pending Approvals
                  </p>
                  <p className="text-3xl font-black">
                    {stats.totalPendingUsers}
                  </p>
                  <p className="text-xs text-amber-600 mt-1">Awaiting review</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-rose-100 dark:bg-rose-950/40 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-rose-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Charts */}
          <div className="lg:col-span-2 space-y-6">
            {/* Revenue Chart - Only for finance admins */}
            {isFinanceAdmin && (
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Revenue Overview</CardTitle>
                    <CardDescription>
                      Track your institute's financial performance
                    </CardDescription>
                  </div>
                  <Tabs
                    value={revenuePeriod}
                    onValueChange={(v) => setRevenuePeriod(v as any)}
                    className="w-auto"
                  >
                    <TabsList>
                      <TabsTrigger value="daily">Daily</TabsTrigger>
                      <TabsTrigger value="weekly">Weekly</TabsTrigger>
                      <TabsTrigger value="monthly">Monthly</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={getRevenueChartData()}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                          dataKey={
                            revenuePeriod === "daily"
                              ? "date"
                              : revenuePeriod === "weekly"
                                ? "week"
                                : "month"
                          }
                        />
                        <YAxis />
                        <Tooltip
                          formatter={(value) => formatCurrency(value as number)}
                        />
                        <Area
                          type="monotone"
                          dataKey="amount"
                          stroke={COLORS.purple}
                          fill={COLORS.purple}
                          fillOpacity={0.1}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Enrollment Trends */}
            <Card>
              <CardHeader>
                <CardTitle>Enrollment Trends</CardTitle>
                <CardDescription>
                  Monthly enrollment and completion rates
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={enrollmentTrends}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="enrollments"
                        stroke={COLORS.purple}
                        name="Enrollments"
                        strokeWidth={2}
                      />
                      <Line
                        type="monotone"
                        dataKey="completions"
                        stroke={COLORS.amber}
                        name="Completions"
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Subscription Analytics - Only for finance admins */}
            {isFinanceAdmin && subscriptionPieData.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Subscription Analytics</CardTitle>
                  <CardDescription>
                    Active subscriptions by plan
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={subscriptionPieData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                            label={({ name, percent = 0 }) =>
                              `${name} (${(percent * 100).toFixed(0)}%)`
                            }
                          >
                            {subscriptionPieData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Active Subscriptions</span>
                        <span className="font-black text-lg">
                          {subscriptionAnalytics.active}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">
                          Monthly Recurring Revenue
                        </span>
                        <span className="font-black text-lg text-green-600">
                          {formatCurrency(
                            subscriptionAnalytics.monthlyRecurringRevenue,
                          )}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Churn Rate</span>
                        <span className="font-black text-lg text-red-600">
                          {subscriptionAnalytics.churnRate}%
                        </span>
                      </div>
                      <Progress
                        value={100 - subscriptionAnalytics.churnRate}
                        className="h-2"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Column - Activity & Events */}
          <div className="space-y-6">
            {/* Attendance Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Attendance Overview</CardTitle>
                <CardDescription>Student attendance rates</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Today</span>
                  <span className="font-black text-lg">
                    {attendanceSummary.today}%
                  </span>
                  <Progress
                    value={attendanceSummary.today}
                    className="w-32 h-2"
                  />
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">This Week</span>
                  <span className="font-black text-lg">
                    {attendanceSummary.week}%
                  </span>
                  <Progress
                    value={attendanceSummary.week}
                    className="w-32 h-2"
                  />
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">This Month</span>
                  <span className="font-black text-lg">
                    {attendanceSummary.month}%
                  </span>
                  <Progress
                    value={attendanceSummary.month}
                    className="w-32 h-2"
                  />
                </div>
                <div className="pt-4 border-t">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-black">Average Rate</span>
                    <span className="text-2xl font-black text-purple-600">
                      {attendanceSummary.averageRate}%
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Announcements */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Announcements</CardTitle>
                <CardDescription>Latest updates from the team</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 max-h-96 overflow-y-auto">
                {recentAnnouncements.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-8">
                    No announcements yet
                  </p>
                ) : (
                  recentAnnouncements.map((announcement) => (
                    <div key={announcement.id} className="group">
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-purple-500 mt-2" />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <p className="font-black text-sm">
                              {announcement.title}
                            </p>
                            <span className="text-[10px] text-muted-foreground">
                              {formatDate(announcement.createdAt)}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground line-clamp-2">
                            {announcement.content}
                          </p>
                          <p className="text-[10px] text-purple-600 mt-1">
                            By {announcement.createdBy.name}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>

            {/* Upcoming Events */}
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Events</CardTitle>
                <CardDescription>Scheduled activities</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 max-h-96 overflow-y-auto">
                {upcomingEvents.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-8">
                    No upcoming events
                  </p>
                ) : (
                  upcomingEvents.map((event) => (
                    <div key={event.id} className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-950/40 flex items-center justify-center shrink-0">
                        <Calendar className="w-5 h-5 text-purple-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-black text-sm">{event.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {formatDate(event.startDate)}
                        </p>
                        {event.location && (
                          <p className="text-[10px] text-muted-foreground mt-1">
                            📍 {event.location}
                          </p>
                        )}
                      </div>
                      <Badge variant="outline" className="text-[9px] uppercase">
                        {event.type}
                      </Badge>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>

            {/* Recent Activity Feed */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>
                  Latest actions across the platform
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 max-h-96 overflow-y-auto">
                {recentActivities.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-8">
                    No recent activity
                  </p>
                ) : (
                  recentActivities.map((activity) => (
                    <div key={activity.id} className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0">
                        {activity.type === "user" && (
                          <Users className="w-4 h-4 text-purple-600" />
                        )}
                        {activity.type === "payment" && (
                          <DollarSign className="w-4 h-4 text-green-600" />
                        )}
                        {activity.type === "enrollment" && (
                          <GraduationCap className="w-4 h-4 text-amber-600" />
                        )}
                        {activity.type === "certificate" && (
                          <Award className="w-4 h-4 text-blue-600" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">
                          {activity.user.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {activity.details}
                        </p>
                        <p className="text-[9px] text-muted-foreground mt-1">
                          {formatDate(activity.timestamp)}
                        </p>
                      </div>
                      <Badge
                        className={getStatusColor(
                          activity.action.toUpperCase(),
                        )}
                      >
                        {activity.action}
                      </Badge>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common administrative tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                <Link href="/dashboard/admin/users">
                  <Button variant="outline" className="w-full">
                    <Users className="w-4 h-4 mr-2" />
                    Manage Users
                  </Button>
                </Link>
                <Link href="/dashboard/admin/classes">
                  <Button variant="outline" className="w-full">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Manage Classes
                  </Button>
                </Link>
                {isFinanceAdmin && (
                  <Link href="/dashboard/admin/payments">
                    <Button variant="outline" className="w-full">
                      <CreditCard className="w-4 h-4 mr-2" />
                      View Payments
                    </Button>
                  </Link>
                )}
                <Link href="/dashboard/admin/announcements">
                  <Button variant="outline" className="w-full">
                    <Bell className="w-4 h-4 mr-2" />
                    Post Announcement
                  </Button>
                </Link>
                <Link href="/dashboard/admin/reports">
                  <Button variant="outline" className="w-full">
                    <Activity className="w-4 h-4 mr-2" />
                    Generate Report
                  </Button>
                </Link>
                {isAdmin && (
                  <Link href="/dashboard/admin/settings">
                    <Button variant="outline" className="w-full">
                      <Shield className="w-4 h-4 mr-2" />
                      Settings
                    </Button>
                  </Link>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}