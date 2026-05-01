// // // app/(portal)/dashboard/admin/page.tsx
// // "use client";

// // import { useState, useEffect } from "react";
// // import {
// //   Users,
// //   GraduationCap,
// //   Clock,
// //   DollarSign,
// //   TrendingUp,
// //   TrendingDown,
// //   Calendar,
// //   BookOpen,
// //   CheckCircle,
// //   XCircle,
// //   AlertCircle,
// //   UserPlus,
// //   CreditCard,
// //   FileText,
// //   ArrowRight,
// //   RefreshCw,
// //   Loader2,
// //   Eye,
// //   MoreVertical,
// //   Search,
// //   Filter,
// //   Download,
// // } from "lucide-react";
// // import { motion, AnimatePresence } from "framer-motion";
// // import { Button } from "@/components/ui/button";
// // import Link from "next/link";
// // import { cn } from "@/lib/utils";
// // import {
// //   getDashboardStats,
// //   getQuickStats,
// //   getRevenueChartData,
// //   getEnrollmentChartData,
// // } from "./actions/dashboard";

// // // Types
// // interface DashboardData {
// //   totalUsers: number;
// //   activeStudents: number;
// //   activeTeachers: number;
// //   pendingApprovals: number;
// //   totalClasses: number;
// //   activeClasses: number;
// //   totalEnrollments: number;
// //   newEnrollmentsThisMonth: number;
// //   monthlyRevenue: number;
// //   pendingInvoices: number;
// //   revenueChange: number;
// //   enrollmentChange: number;
// //   userGrowth: Array<{ month: string; count: number }>;
// //   roleDistribution: Array<{ role: string; count: number }>;
// //   recentActivities: {
// //     recentUsers: Array<{
// //       name: string;
// //       email: string;
// //       role: string;
// //       createdAt: Date;
// //     }>;
// //     recentEnrollments: Array<{
// //       studentName: string;
// //       className: string;
// //       enrolledAt: Date;
// //     }>;
// //     recentPayments: Array<{
// //       studentName: string;
// //       amount: number;
// //       status: string;
// //       paidAt: Date;
// //     }>;
// //     pendingApprovalsList: Array<{
// //       name: string;
// //       email: string;
// //       role: string;
// //       createdAt: Date;
// //     }>;
// //   };
// // }

// // // Stats Card Component
// // function StatCard({
// //   title,
// //   value,
// //   icon: Icon,
// //   change,
// //   color,
// // }: {
// //   title: string;
// //   value: number | string;
// //   icon: any;
// //   change?: number;
// //   color: "purple" | "amber" | "green" | "blue";
// // }) {
// //   const colors = {
// //     purple: "bg-purple-100 dark:bg-purple-950/40 text-purple-600",
// //     amber: "bg-amber-100 dark:bg-amber-950/40 text-amber-600",
// //     green: "bg-green-100 dark:bg-green-950/40 text-green-600",
// //     blue: "bg-blue-100 dark:bg-blue-950/40 text-blue-600",
// //   };

// //   return (
// //     <div className="bg-card rounded-xl border border-purple-200 dark:border-purple-800 p-5 sm:p-6 hover:shadow-lg transition-all">
// //       <div className="flex items-center justify-between mb-3">
// //         <div
// //           className={cn(
// //             "w-10 h-10 rounded-lg flex items-center justify-center",
// //             colors[color],
// //           )}
// //         >
// //           <Icon className="w-5 h-5" />
// //         </div>
// //         {change !== undefined && (
// //           <div
// //             className={cn(
// //               "flex items-center gap-1 text-xs font-black",
// //               change >= 0 ? "text-green-600" : "text-red-600",
// //             )}
// //           >
// //             {change >= 0 ? (
// //               <TrendingUp className="w-3 h-3" />
// //             ) : (
// //               <TrendingDown className="w-3 h-3" />
// //             )}
// //             <span>{Math.abs(change)}%</span>
// //           </div>
// //         )}
// //       </div>
// //       <p className="text-2xl sm:text-3xl font-black">
// //         {value.toLocaleString()}
// //       </p>
// //       <p className="text-xs text-muted-foreground mt-1 font-medium">{title}</p>
// //     </div>
// //   );
// // }

// // // Chart Component (Simple bar chart)
// // function SimpleBarChart({
// //   data,
// //   color,
// // }: {
// //   data: Array<{ month: string; count: number }>;
// //   color: string;
// // }) {
// //   const maxValue = Math.max(...data.map((d) => d.count), 1);

// //   return (
// //     <div className="h-48 sm:h-56 mt-4">
// //       <div className="flex h-full items-end gap-2 sm:gap-3">
// //         {data.map((item, idx) => (
// //           <div key={idx} className="flex-1 flex flex-col items-center gap-2">
// //             <div
// //               className={cn(
// //                 "w-full rounded-t-lg transition-all duration-500 hover:opacity-80",
// //                 color === "purple" ? "bg-purple-500" : "bg-amber-500",
// //               )}
// //               style={{
// //                 height: `${(item.count / maxValue) * 100}%`,
// //                 minHeight: "4px",
// //               }}
// //             />
// //             <span className="text-[10px] sm:text-xs text-muted-foreground rotate-45 sm:rotate-0 origin-left sm:origin-center">
// //               {item.month}
// //             </span>
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // }

// // // Donut Chart Component
// // function DonutChart({
// //   data,
// // }: {
// //   data: Array<{ role: string; count: number }>;
// // }) {
// //   const total = data.reduce((sum, item) => sum + item.count, 0);
// //   const colors = [
// //     "#8B5CF6",
// //     "#F59E0B",
// //     "#10B981",
// //     "#3B82F6",
// //     "#EF4444",
// //     "#06B6D4",
// //   ];

// //   let currentAngle = 0;
// //   const segments = data.map((item, idx) => {
// //     const percentage = (item.count / total) * 100;
// //     const angle = (percentage / 100) * 360;
// //     const start = currentAngle;
// //     const end = currentAngle + angle;
// //     currentAngle = end;
// //     return {
// //       ...item,
// //       percentage,
// //       start,
// //       end,
// //       color: colors[idx % colors.length],
// //     };
// //   });

// //   return (
// //     <div className="flex flex-col items-center">
// //       <div className="relative w-32 h-32 sm:w-40 sm:h-40">
// //         <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
// //           {segments.map((segment, idx) => {
// //             const startAngle = (segment.start / 360) * 2 * Math.PI;
// //             const endAngle = (segment.end / 360) * 2 * Math.PI;
// //             const x1 = 50 + 40 * Math.cos(startAngle);
// //             const y1 = 50 + 40 * Math.sin(startAngle);
// //             const x2 = 50 + 40 * Math.cos(endAngle);
// //             const y2 = 50 + 40 * Math.sin(endAngle);
// //             const largeArc = segment.percentage > 50 ? 1 : 0;

// //             return (
// //               <path
// //                 key={idx}
// //                 d={`M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArc} 1 ${x2} ${y2} Z`}
// //                 fill={segment.color}
// //                 className="transition-all duration-300 hover:opacity-80 cursor-pointer"
// //               />
// //             );
// //           })}
// //           <circle
// //             cx="50"
// //             cy="50"
// //             r="25"
// //             fill="white"
// //             className="dark:fill-slate-950"
// //           />
// //         </svg>
// //       </div>
// //       <div className="flex flex-wrap justify-center gap-3 mt-4">
// //         {segments.map((segment, idx) => (
// //           <div key={idx} className="flex items-center gap-1.5">
// //             <div
// //               className="w-3 h-3 rounded-full"
// //               style={{ backgroundColor: segment.color }}
// //             />
// //             <span className="text-[10px] sm:text-xs font-medium">
// //               {segment.role} ({segment.count})
// //             </span>
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // }

// // export default function AdminDashboard() {
// //   const [loading, setLoading] = useState(true);
// //   const [dashboardData, setDashboardData] = useState<DashboardData | null>(
// //     null,
// //   );
// //   const [quickStats, setQuickStats] = useState<any>(null);
// //   const [revenueData, setRevenueData] = useState<
// //     Array<{ month: string; revenue: number }>
// //   >([]);
// //   const [enrollmentData, setEnrollmentData] = useState<
// //     Array<{ month: string; enrollments: number }>
// //   >([]);
// //   const [activeTab, setActiveTab] = useState<
// //     "overview" | "users" | "financial"
// //   >("overview");
// //   const [refreshing, setRefreshing] = useState(false);

// //   useEffect(() => {
// //     fetchAllData();
// //   }, []);

// //   const fetchAllData = async () => {
// //     setLoading(true);
// //     try {
// //       const [stats, quick, revenue, enrollment] = await Promise.all([
// //         getDashboardStats(),
// //         getQuickStats(),
// //         getRevenueChartData(6),
// //         getEnrollmentChartData(6),
// //       ]);

// //       if (stats.success) setDashboardData(stats.data as DashboardData);
// //       if (quick.success) setQuickStats(quick.data);
// //       if (revenue.success) setRevenueData(revenue.data);
// //       if (enrollment.success) setEnrollmentData(enrollment.data);
// //     } catch (error) {
// //       console.error("Error fetching dashboard data:", error);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const refreshData = async () => {
// //     setRefreshing(true);
// //     await fetchAllData();
// //     setRefreshing(false);
// //   };

// //   if (loading) {
// //     return (
// //       <div className="min-h-screen bg-background flex items-center justify-center">
// //         <div className="text-center">
// //           <Loader2 className="w-8 h-8 animate-spin text-purple-600 mx-auto mb-4" />
// //           <p className="text-muted-foreground">Loading dashboard...</p>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="min-h-screen bg-gradient-to-b from-background via-purple-50/5 to-amber-50/5">
// //       <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
// //         {/* Header */}
// //         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
// //           <div>
// //             <h1 className="text-2xl sm:text-3xl font-black tracking-tighter">
// //               Admin Dashboard
// //             </h1>
// //             <p className="text-sm text-muted-foreground">
// //               Welcome back! Here's what's happening today.
// //             </p>
// //           </div>
// //           <div className="flex gap-2">
// //             <Button
// //               variant="outline"
// //               onClick={refreshData}
// //               disabled={refreshing}
// //               className="rounded-full border-purple-300 text-purple-600"
// //             >
// //               <RefreshCw
// //                 className={cn("w-4 h-4 mr-2", refreshing && "animate-spin")}
// //               />
// //               Refresh
// //             </Button>
// //             <Button className="rounded-full bg-purple-600 hover:bg-purple-700 text-white">
// //               <Download className="w-4 h-4 mr-2" />
// //               Export
// //             </Button>
// //           </div>
// //         </div>

// //         {/* Stats Grid */}
// //         <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-6 sm:mb-8">
// //           <StatCard
// //             title="Total Users"
// //             value={dashboardData?.totalUsers || 0}
// //             icon={Users}
// //             color="purple"
// //           />
// //           <StatCard
// //             title="Active Students"
// //             value={dashboardData?.activeStudents || 0}
// //             icon={GraduationCap}
// //             change={dashboardData?.enrollmentChange}
// //             color="green"
// //           />
// //           <StatCard
// //             title="Pending Approvals"
// //             value={dashboardData?.pendingApprovals || 0}
// //             icon={Clock}
// //             color="amber"
// //           />
// //           <StatCard
// //             title="Monthly Revenue"
// //             value={`$${dashboardData?.monthlyRevenue || 0}`}
// //             icon={DollarSign}
// //             change={dashboardData?.revenueChange}
// //             color="blue"
// //           />
// //         </div>

// //         {/* Tabs */}
// //         <div className="flex gap-1 border-b border-purple-200 dark:border-purple-800 mb-6">
// //           {[
// //             { id: "overview", label: "Overview", icon: Eye },
// //             { id: "users", label: "Users & Activity", icon: Users },
// //             { id: "financial", label: "Financial", icon: DollarSign },
// //           ].map((tab) => {
// //             const Icon = tab.icon;
// //             return (
// //               <button
// //                 key={tab.id}
// //                 onClick={() => setActiveTab(tab.id as any)}
// //                 className={cn(
// //                   "flex items-center gap-2 px-4 py-2 text-sm font-black uppercase tracking-wider transition-all",
// //                   activeTab === tab.id
// //                     ? "border-b-2 border-purple-600 text-purple-600"
// //                     : "text-muted-foreground hover:text-purple-600",
// //                 )}
// //               >
// //                 <Icon className="w-4 h-4" />
// //                 {tab.label}
// //               </button>
// //             );
// //           })}
// //         </div>

// //         {/* Overview Tab */}
// //         {activeTab === "overview" && (
// //           <div className="space-y-6">
// //             {/* Charts Row */}
// //             <div className="grid lg:grid-cols-2 gap-5 sm:gap-6">
// //               {/* User Growth Chart */}
// //               <div className="bg-card rounded-xl border border-purple-200 dark:border-purple-800 p-5 sm:p-6">
// //                 <div className="flex items-center justify-between mb-4">
// //                   <h3 className="font-black text-base">User Growth</h3>
// //                   <Users className="w-4 h-4 text-muted-foreground" />
// //                 </div>
// //                 {dashboardData?.userGrowth &&
// //                 dashboardData.userGrowth.length > 0 ? (
// //                   <SimpleBarChart
// //                     data={dashboardData.userGrowth}
// //                     color="purple"
// //                   />
// //                 ) : (
// //                   <p className="text-center text-muted-foreground py-12">
// //                     No data available
// //                   </p>
// //                 )}
// //               </div>

// //               {/* Role Distribution */}
// //               <div className="bg-card rounded-xl border border-purple-200 dark:border-purple-800 p-5 sm:p-6">
// //                 <div className="flex items-center justify-between mb-4">
// //                   <h3 className="font-black text-base">Role Distribution</h3>
// //                   <Users className="w-4 h-4 text-muted-foreground" />
// //                 </div>
// //                 {dashboardData?.roleDistribution &&
// //                 dashboardData.roleDistribution.length > 0 ? (
// //                   <DonutChart data={dashboardData.roleDistribution} />
// //                 ) : (
// //                   <p className="text-center text-muted-foreground py-12">
// //                     No data available
// //                   </p>
// //                 )}
// //               </div>
// //             </div>

// //             {/* Recent Activity */}
// //             <div className="bg-card rounded-xl border border-purple-200 dark:border-purple-800 p-5 sm:p-6">
// //               <h3 className="font-black text-base mb-4">Recent Activity</h3>
// //               <div className="space-y-4">
// //                 {dashboardData?.recentActivities.recentUsers
// //                   .slice(0, 5)
// //                   .map((user, idx) => (
// //                     <div
// //                       key={idx}
// //                       className="flex items-center justify-between py-2 border-b border-border/50 last:border-0"
// //                     >
// //                       <div>
// //                         <p className="font-black text-sm">{user.name}</p>
// //                         <p className="text-xs text-muted-foreground">
// //                           {user.email}
// //                         </p>
// //                       </div>
// //                       <div className="flex items-center gap-2">
// //                         <span className="text-[10px] font-black uppercase tracking-wider text-purple-600">
// //                           {user.role}
// //                         </span>
// //                         <span className="text-[9px] text-muted-foreground">
// //                           {new Date(user.createdAt).toLocaleDateString()}
// //                         </span>
// //                       </div>
// //                     </div>
// //                   ))}
// //               </div>
// //             </div>
// //           </div>
// //         )}

// //         {/* Users Tab */}
// //         {activeTab === "users" && (
// //           <div className="grid lg:grid-cols-2 gap-5 sm:gap-6">
// //             {/* Pending Approvals */}
// //             <div className="bg-card rounded-xl border border-purple-200 dark:border-purple-800 p-5 sm:p-6">
// //               <div className="flex items-center justify-between mb-4">
// //                 <h3 className="font-black text-base">Pending Approvals</h3>
// //                 <AlertCircle className="w-4 h-4 text-amber-500" />
// //               </div>
// //               {dashboardData?.recentActivities.pendingApprovalsList.length ===
// //               0 ? (
// //                 <p className="text-center text-muted-foreground py-8">
// //                   No pending approvals
// //                 </p>
// //               ) : (
// //                 <div className="space-y-3">
// //                   {dashboardData?.recentActivities.pendingApprovalsList.map(
// //                     (user, idx) => (
// //                       <div
// //                         key={idx}
// //                         className="flex items-center justify-between py-2 border-b border-border/50 last:border-0"
// //                       >
// //                         <div>
// //                           <p className="font-black text-sm">
// //                             {user.name || "Unnamed"}
// //                           </p>
// //                           <p className="text-xs text-muted-foreground">
// //                             {user.email}
// //                           </p>
// //                         </div>
// //                         <div className="flex items-center gap-2">
// //                           <span className="text-[10px] font-black uppercase tracking-wider text-amber-600">
// //                             {user.role}
// //                           </span>
// //                           <Button
// //                             size="sm"
// //                             className="h-7 px-3 text-xs bg-purple-600 hover:bg-purple-700"
// //                           >
// //                             Review
// //                           </Button>
// //                         </div>
// //                       </div>
// //                     ),
// //                   )}
// //                 </div>
// //               )}
// //             </div>

// //             {/* Recent Enrollments */}
// //             <div className="bg-card rounded-xl border border-purple-200 dark:border-purple-800 p-5 sm:p-6">
// //               <div className="flex items-center justify-between mb-4">
// //                 <h3 className="font-black text-base">Recent Enrollments</h3>
// //                 <BookOpen className="w-4 h-4 text-green-500" />
// //               </div>
// //               {dashboardData?.recentActivities.recentEnrollments.length ===
// //               0 ? (
// //                 <p className="text-center text-muted-foreground py-8">
// //                   No recent enrollments
// //                 </p>
// //               ) : (
// //                 <div className="space-y-3">
// //                   {dashboardData?.recentActivities.recentEnrollments.map(
// //                     (enrollment, idx) => (
// //                       <div
// //                         key={idx}
// //                         className="py-2 border-b border-border/50 last:border-0"
// //                       >
// //                         <p className="font-black text-sm">
// //                           {enrollment.studentName}
// //                         </p>
// //                         <p className="text-xs text-muted-foreground">
// //                           Enrolled in: {enrollment.className}
// //                         </p>
// //                         <p className="text-[9px] text-purple-600 mt-0.5">
// //                           {new Date(enrollment.enrolledAt).toLocaleDateString()}
// //                         </p>
// //                       </div>
// //                     ),
// //                   )}
// //                 </div>
// //               )}
// //             </div>
// //           </div>
// //         )}

// //         {/* Financial Tab */}
// //         {activeTab === "financial" && (
// //           <div className="grid lg:grid-cols-2 gap-5 sm:gap-6">
// //             {/* Revenue Chart */}
// //             <div className="bg-card rounded-xl border border-purple-200 dark:border-purple-800 p-5 sm:p-6">
// //               <div className="flex items-center justify-between mb-4">
// //                 <h3 className="font-black text-base">Monthly Revenue</h3>
// //                 <DollarSign className="w-4 h-4 text-green-500" />
// //               </div>
// //               {revenueData.length > 0 ? (
// //                 <>
// //                   <div className="mb-4">
// //                     <p className="text-2xl font-black text-green-600">
// //                       ${dashboardData?.monthlyRevenue || 0}
// //                     </p>
// //                     <p className="text-xs text-muted-foreground">This month</p>
// //                   </div>
// //                   <SimpleBarChart
// //                     data={revenueData.map((d) => ({
// //                       month: d.month,
// //                       count: d.revenue,
// //                     }))}
// //                     color="green"
// //                   />
// //                 </>
// //               ) : (
// //                 <p className="text-center text-muted-foreground py-12">
// //                   No revenue data available
// //                 </p>
// //               )}
// //             </div>

// //             {/* Enrollment Chart */}
// //             <div className="bg-card rounded-xl border border-purple-200 dark:border-purple-800 p-5 sm:p-6">
// //               <div className="flex items-center justify-between mb-4">
// //                 <h3 className="font-black text-base">Monthly Enrollments</h3>
// //                 <GraduationCap className="w-4 h-4 text-purple-500" />
// //               </div>
// //               {enrollmentData.length > 0 ? (
// //                 <>
// //                   <div className="mb-4">
// //                     <p className="text-2xl font-black text-purple-600">
// //                       {dashboardData?.newEnrollmentsThisMonth || 0}
// //                     </p>
// //                     <p className="text-xs text-muted-foreground">
// //                       New this month
// //                     </p>
// //                   </div>
// //                   <SimpleBarChart
// //                     data={enrollmentData.map((d) => ({
// //                       month: d.month,
// //                       count: d.enrollments,
// //                     }))}
// //                     color="purple"
// //                   />
// //                 </>
// //               ) : (
// //                 <p className="text-center text-muted-foreground py-12">
// //                   No enrollment data available
// //                 </p>
// //               )}
// //             </div>

// //             {/* Recent Payments */}
// //             <div className="bg-card rounded-xl border border-purple-200 dark:border-purple-800 p-5 sm:p-6 lg:col-span-2">
// //               <div className="flex items-center justify-between mb-4">
// //                 <h3 className="font-black text-base">Recent Payments</h3>
// //                 <CreditCard className="w-4 h-4 text-blue-500" />
// //               </div>
// //               {dashboardData?.recentActivities.recentPayments.length === 0 ? (
// //                 <p className="text-center text-muted-foreground py-8">
// //                   No recent payments
// //                 </p>
// //               ) : (
// //                 <div className="overflow-x-auto">
// //                   <table className="w-full text-sm">
// //                     <thead className="border-b border-purple-200 dark:border-purple-800">
// //                       <tr className="text-left">
// //                         <th className="pb-2 font-black">Student</th>
// //                         <th className="pb-2 font-black">Amount</th>
// //                         <th className="pb-2 font-black">Status</th>
// //                         <th className="pb-2 font-black">Date</th>
// //                       </tr>
// //                     </thead>
// //                     <tbody>
// //                       {dashboardData?.recentActivities.recentPayments.map(
// //                         (payment, idx) => (
// //                           <tr key={idx} className="border-b border-border/50">
// //                             <td className="py-2">{payment.studentName}</td>
// //                             <td className="py-2 font-black text-green-600">
// //                               ${payment.amount}
// //                             </td>
// //                             <td className="py-2">
// //                               <span className="text-[9px] font-black uppercase text-green-600">
// //                                 {payment.status}
// //                               </span>
// //                             </td>
// //                             <td className="py-2 text-xs text-muted-foreground">
// //                               {new Date(payment.paidAt).toLocaleDateString()}
// //                             </td>
// //                           </tr>
// //                         ),
// //                       )}
// //                     </tbody>
// //                   </table>
// //                 </div>
// //               )}
// //             </div>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }

// // app/(portal)/dashboard/admin/page.tsx
// import { Metadata } from "next";
// import { DashboardClient } from "./dashboard-client";
// import {
//   getDashboardStats,
//   getRevenueData,
//   getEnrollmentTrends,
//   getRecentActivities,
//   getSubscriptionAnalytics,
//   getAttendanceSummary,
//   getRecentAnnouncements,
//   getUpcomingEvents,
// } from "./actions/dashboard";

// export const metadata: Metadata = {
//   title: "Admin Dashboard | Al-Maysaroh",
//   description: "Comprehensive overview of institute operations",
// };

// export default async function AdminDashboardPage() {
//   const [
//     stats,
//     revenueData,
//     enrollmentTrends,
//     recentActivities,
//     subscriptionAnalytics,
//     attendanceSummary,
//     recentAnnouncements,
//     upcomingEvents,
//   ] = await Promise.all([
//     getDashboardStats(),
//     getRevenueData(30),
//     getEnrollmentTrends(6),
//     getRecentActivities(10),
//     getSubscriptionAnalytics(),
//     getAttendanceSummary(),
//     getRecentAnnouncements(5),
//     getUpcomingEvents(5),
//   ]);

//   return (
//     <DashboardClient
//       stats={stats}
//       revenueData={revenueData}
//       enrollmentTrends={enrollmentTrends}
//       recentActivities={recentActivities}
//       subscriptionAnalytics={subscriptionAnalytics}
//       attendanceSummary={attendanceSummary}
//       recentAnnouncements={recentAnnouncements}
//       upcomingEvents={upcomingEvents}
//     />
//   );
// }

import { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { DashboardClient } from "./dashboard-client";
import {
  getDashboardStats,
  getRevenueData,
  getEnrollmentTrends,
  getRecentActivities,
  getSubscriptionAnalytics,
  getAttendanceSummary,
  getRecentAnnouncements,
  getUpcomingEvents,
} from "./actions/dashboard";

export const metadata: Metadata = {
  title: "Admin Dashboard | Al-Maysaroh",
  description: "Comprehensive overview of institute operations",
};

// Revalidate data every 60 seconds
export const revalidate = 60;

export default async function AdminDashboardPage() {
  const session = await auth();

  // Check authentication
  if (!session) {
    redirect("/api/auth/signin");
  }

  // Check authorization
  const allowedRoles = ["SUPER_ADMIN", "ADMIN", "CONTENT_MANAGER", "SUPPORT"];
  if (!allowedRoles.includes(session.user?.role)) {
    redirect("/unauthorized");
  }

  let data;
  try {
    data = await Promise.all([
        getDashboardStats(),
        getRevenueData(30),
        getEnrollmentTrends(6),
        getRecentActivities(10),
        getSubscriptionAnalytics(),
        getAttendanceSummary(),
        getRecentAnnouncements(5),
        getUpcomingEvents(5),
      ]);
  } catch (error) {
    console.error("Error loading dashboard:", error);
    data = null;
  }

  if (data) {
    const [
      stats,
      revenueData,
      enrollmentTrends,
      recentActivities,
      subscriptionAnalytics,
      attendanceSummary,
      recentAnnouncements,
      upcomingEvents,
    ] = data;

    return (
      <DashboardClient
        stats={stats}
        revenueData={revenueData}
        enrollmentTrends={enrollmentTrends}
        recentActivities={recentActivities}
        subscriptionAnalytics={subscriptionAnalytics}
        attendanceSummary={attendanceSummary}
        recentAnnouncements={recentAnnouncements}
        upcomingEvents={upcomingEvents}
      />
    );
  } else {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">
            Error Loading Dashboard
          </h2>
          <p className="text-muted-foreground">Please try again later.</p>
        </div>
      </div>
    );
  }
}