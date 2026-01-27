// // src/app/(dashboard)/student/page.tsx
// "use client";

// import { useState, useEffect } from "react";
// import {
//   BookOpen,
//   Calendar,
//   Clock,
//   TrendingUp,
//   Award,
//   CheckCircle,
//   FileText,
//   Video,
//   Download,
//   Bell,
//   Target,
//   Star,
//   Users,
//   Book,
//   CalendarDays,
//   CheckSquare,
//   AlertCircle,
//   ChevronRight,
//   MoreVertical,
// } from "lucide-react";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Progress } from "@/components/ui/progress";
// import { Avatar, AvatarFallback } from "@/components/ui/avatar";
// import { toast } from "sonner";
// import Link from "next/link";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
//   PieChart,
//   Pie,
//   Cell,
// } from "recharts";

// // Mock data - In production, this would come from API
// const studentStats = {
//   name: "Omar Ahmed",
//   studentId: "STD-2024-001",
//   currentClass: "Quran Memorization - Level 1",
//   teacher: "Sheikh Ahmed Al-Qari",
//   hifzLevel: "Juz 30",
//   tajweedLevel: "Beginner",
//   attendanceRate: 94,
//   averageGrade: 88,
//   quranProgress: 65,
//   streak: 14,
// };

// const upcomingClasses = [
//   {
//     id: 1,
//     subject: "Quran Memorization",
//     time: "Today, 09:00 - 10:30",
//     teacher: "Sheikh Ahmed",
//     status: "upcoming",
//     zoomLink: "#",
//   },
//   {
//     id: 2,
//     subject: "Tajweed Rules",
//     time: "Tomorrow, 14:00 - 15:30",
//     teacher: "Ustadha Fatima",
//     status: "upcoming",
//   },
//   {
//     id: 3,
//     subject: "Islamic Studies",
//     time: "Wednesday, 16:00 - 17:30",
//     teacher: "Ustadh Muhammad",
//     status: "upcoming",
//   },
// ];

// const pendingAssignments = [
//   {
//     id: 1,
//     title: "Memorize Surah An-Naziat (1-20)",
//     subject: "Quran",
//     dueDate: "Tomorrow",
//     points: 20,
//     status: "pending",
//   },
//   {
//     id: 2,
//     title: "Tajweed Practice Sheet",
//     subject: "Tajweed",
//     dueDate: "2 days",
//     points: 15,
//     status: "pending",
//   },
//   {
//     id: 3,
//     title: "Fiqh of Wudu Project",
//     subject: "Fiqh",
//     dueDate: "1 week",
//     points: 30,
//     status: "pending",
//   },
// ];

// const recentGrades = [
//   {
//     id: 1,
//     subject: "Quran Memorization",
//     exam: "Midterm",
//     score: 85.5,
//     total: 100,
//     grade: "A-",
//     date: "2024-01-15",
//   },
//   {
//     id: 2,
//     subject: "Tajweed Rules",
//     exam: "Quiz 1",
//     score: 92,
//     total: 100,
//     grade: "A",
//     date: "2024-01-10",
//   },
//   {
//     id: 3,
//     subject: "Fiqh",
//     exam: "Assignment",
//     score: 78,
//     total: 100,
//     grade: "B+",
//     date: "2024-01-08",
//   },
// ];

// const quranProgressData = [
//   { surah: "An-Naba", status: "completed", ayahs: 40, revisionCount: 12 },
//   { surah: "An-Naziat", status: "in-progress", ayahs: 46, revisionCount: 3 },
//   { surah: "Abasa", status: "not-started", ayahs: 42, revisionCount: 0 },
//   { surah: "At-Takwir", status: "not-started", ayahs: 29, revisionCount: 0 },
//   { surah: "Al-Infitar", status: "not-started", ayahs: 19, revisionCount: 0 },
// ];

// const weeklyAttendance = [
//   { day: "Mon", present: true, time: "09:00-10:30" },
//   { day: "Tue", present: true, time: "14:00-15:30" },
//   { day: "Wed", present: false, reason: "Sick", time: "09:00-10:30" },
//   { day: "Thu", present: true, time: "14:00-15:30" },
//   { day: "Fri", present: true, time: "09:00-10:30" },
//   { day: "Sat", present: true, time: "14:00-15:30" },
//   { day: "Sun", present: true, time: "09:00-10:30" },
// ];

// const memorizationData = [
//   { month: "Sep", pages: 5 },
//   { month: "Oct", pages: 8 },
//   { month: "Nov", pages: 12 },
//   { month: "Dec", pages: 15 },
//   { month: "Jan", pages: 10 },
// ];

// const progressDistribution = [
//   { name: "Completed", value: 40, color: "#10b981" },
//   { name: "In Progress", value: 25, color: "#f59e0b" },
//   { name: "Not Started", value: 35, color: "#ef4444" },
// ];

// export default function StudentDashboardPage() {
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     // Simulate loading data
//     setTimeout(() => setIsLoading(false), 1000);
//   }, []);

//   const handleJoinClass = (classId: number) => {
//     toast.success("Joining class...", {
//       description: "Opening Zoom meeting.",
//     });
//     // In production: Open Zoom link or meeting
//   };

//   const handleSubmitAssignment = (assignmentId: number) => {
//     toast.info("Opening assignment submission...", {
//       description: "You can upload your work now.",
//     });
//     // In production: Open submission modal
//   };

//   if (isLoading) {
//     return (
//       <div className="flex h-64 items-center justify-center">
//         <div className="h-8 w-8 animate-spin rounded-full border-4 border-purple-500 border-t-transparent"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       {/* Welcome Header */}
//       <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
//         <div>
//           <div className="flex items-center gap-3">
//             <Avatar className="h-12 w-12 border-2 border-purple-200">
//               <AvatarFallback className="bg-gradient-primary text-lg text-white">
//                 OA
//               </AvatarFallback>
//             </Avatar>
//             <div>
//               <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
//                 Welcome back, {studentStats.name}!
//               </h1>
//               <p className="text-gray-600 dark:text-gray-400">
//                 Here&apos;s your learning progress and upcoming activities
//               </p>
//             </div>
//           </div>
//         </div>
//         <div className="flex items-center gap-3">
//           <Badge className="gap-1 bg-gradient-primary">
//             <Target className="h-3 w-3" />
//             Day {studentStats.streak} Streak
//           </Badge>
//           <Button variant="outline" className="gap-2">
//             <Bell className="h-4 w-4" />
//             Notifications
//           </Button>
//         </div>
//       </div>

//       {/* Stats Grid */}
//       <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
//         <Card>
//           <CardContent className="p-6">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium text-gray-600">
//                   Quran Progress
//                 </p>
//                 <p className="mt-2 text-2xl font-bold text-gray-900">
//                   {studentStats.quranProgress}%
//                 </p>
//                 <Progress value={studentStats.quranProgress} className="mt-2" />
//               </div>
//               <div className="rounded-lg bg-purple-100 p-3 dark:bg-purple-900/30">
//                 <BookOpen className="h-6 w-6 text-purple-600 dark:text-purple-400" />
//               </div>
//             </div>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardContent className="p-6">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium text-gray-600">Attendance</p>
//                 <p className="mt-2 text-2xl font-bold text-gray-900">
//                   {studentStats.attendanceRate}%
//                 </p>
//                 <p className="text-sm text-green-600">Perfect this week!</p>
//               </div>
//               <div className="rounded-lg bg-green-100 p-3 dark:bg-green-900/30">
//                 <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
//               </div>
//             </div>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardContent className="p-6">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium text-gray-600">
//                   Average Grade
//                 </p>
//                 <p className="mt-2 text-2xl font-bold text-gray-900">
//                   {studentStats.averageGrade}%
//                 </p>
//                 <p className="text-sm text-blue-600">A- Average</p>
//               </div>
//               <div className="rounded-lg bg-blue-100 p-3 dark:bg-blue-900/30">
//                 <TrendingUp className="h-6 w-6 text-blue-600 dark:text-blue-400" />
//               </div>
//             </div>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardContent className="p-6">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium text-gray-600">
//                   Current Level
//                 </p>
//                 <p className="mt-2 text-2xl font-bold text-gray-900">
//                   {studentStats.hifzLevel}
//                 </p>
//                 <p className="text-sm text-yellow-600">
//                   {studentStats.tajweedLevel} Tajweed
//                 </p>
//               </div>
//               <div className="rounded-lg bg-yellow-100 p-3 dark:bg-yellow-900/30">
//                 <Award className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Main Content Grid */}
//       <div className="grid gap-6 lg:grid-cols-3">
//         {/* Left Column - Upcoming & Assignments */}
//         <div className="lg:col-span-2 space-y-6">
//           {/* Upcoming Classes */}
//           <Card>
//             <CardHeader className="flex flex-row items-center justify-between">
//               <div>
//                 <CardTitle>Upcoming Classes</CardTitle>
//                 <CardDescription>
//                   Your schedule for the next few days
//                 </CardDescription>
//               </div>
//               <Button variant="outline" size="sm" asChild>
//                 <Link href="/student/schedule">
//                   View Full Schedule
//                   <ChevronRight className="ml-1 h-4 w-4" />
//                 </Link>
//               </Button>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-4">
//                 {upcomingClasses.map((classItem) => (
//                   <div
//                     key={classItem.id}
//                     className="flex items-center justify-between rounded-lg border border-gray-200 p-4 dark:border-gray-700"
//                   >
//                     <div className="flex items-start space-x-4">
//                       <div className="rounded-lg bg-purple-100 p-2 dark:bg-purple-900/30">
//                         <Calendar className="h-5 w-5 text-purple-600 dark:text-purple-400" />
//                       </div>
//                       <div>
//                         <h3 className="font-semibold">{classItem.subject}</h3>
//                         <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-gray-600">
//                           <span className="flex items-center gap-1">
//                             <Clock className="h-3 w-3" />
//                             {classItem.time}
//                           </span>
//                           <span className="flex items-center gap-1">
//                             <Users className="h-3 w-3" />
//                             {classItem.teacher}
//                           </span>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="flex items-center gap-2">
//                       {classItem.zoomLink ? (
//                         <Button
//                           size="sm"
//                           className="bg-gradient-primary"
//                           onClick={() => handleJoinClass(classItem.id)}
//                         >
//                           <Video className="mr-2 h-4 w-4" />
//                           Join Now
//                         </Button>
//                       ) : (
//                         <Badge variant="outline">Upcoming</Badge>
//                       )}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </CardContent>
//           </Card>

//           {/* Pending Assignments */}
//           <Card>
//             <CardHeader className="flex flex-row items-center justify-between">
//               <div>
//                 <CardTitle>Pending Assignments</CardTitle>
//                 <CardDescription>
//                   Assignments that need your attention
//                 </CardDescription>
//               </div>
//               <Button variant="outline" size="sm" asChild>
//                 <Link href="/student/assignments">
//                   View All
//                   <ChevronRight className="ml-1 h-4 w-4" />
//                 </Link>
//               </Button>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-4">
//                 {pendingAssignments.map((assignment) => (
//                   <div
//                     key={assignment.id}
//                     className="flex items-center justify-between rounded-lg border border-gray-200 p-4 dark:border-gray-700"
//                   >
//                     <div className="flex items-start space-x-4">
//                       <div className="rounded-lg bg-blue-100 p-2 dark:bg-blue-900/30">
//                         <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
//                       </div>
//                       <div>
//                         <h3 className="font-semibold">{assignment.title}</h3>
//                         <div className="mt-1 flex flex-wrap items-center gap-3 text-sm text-gray-600">
//                           <Badge variant="outline">{assignment.subject}</Badge>
//                           <span className="flex items-center gap-1">
//                             <CalendarDays className="h-3 w-3" />
//                             Due in {assignment.dueDate}
//                           </span>
//                           <span className="flex items-center gap-1">
//                             <Star className="h-3 w-3" />
//                             {assignment.points} points
//                           </span>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="flex items-center gap-2">
//                       <Button
//                         size="sm"
//                         variant="outline"
//                         onClick={() => handleSubmitAssignment(assignment.id)}
//                       >
//                         <CheckSquare className="mr-2 h-4 w-4" />
//                         Submit
//                       </Button>
//                       <Button size="sm" variant="ghost">
//                         <MoreVertical className="h-4 w-4" />
//                       </Button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Right Column - Quick Stats & Progress */}
//         <div className="space-y-6">
//           {/* Quran Progress */}
//           <Card>
//             <CardHeader>
//               <CardTitle className="flex items-center gap-2">
//                 <Book className="h-5 w-5" />
//                 Quran Progress
//               </CardTitle>
//               <CardDescription>Juz Amma memorization</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-4">
//                 {quranProgressData.map((surah, index) => (
//                   <div
//                     key={index}
//                     className="flex items-center justify-between"
//                   >
//                     <div className="flex items-center gap-3">
//                       <div
//                         className={`h-2 w-2 rounded-full ${
//                           surah.status === "completed"
//                             ? "bg-green-500"
//                             : surah.status === "in-progress"
//                             ? "bg-yellow-500"
//                             : "bg-gray-300"
//                         }`}
//                       />
//                       <span className="text-sm">{surah.surah}</span>
//                     </div>
//                     <div className="flex items-center gap-2">
//                       <span className="text-xs text-gray-500">
//                         {surah.ayahs} ayahs
//                       </span>
//                       {surah.revisionCount > 0 && (
//                         <Badge variant="outline" className="text-xs">
//                           {surah.revisionCount} rev
//                         </Badge>
//                       )}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//               <Button className="mt-4 w-full" variant="outline" asChild>
//                 <Link href="/student/quran">View Full Progress</Link>
//               </Button>
//             </CardContent>
//           </Card>

//           {/* Weekly Attendance */}
//           <Card>
//             <CardHeader>
//               <CardTitle>This Week&apos;s Attendance</CardTitle>
//               <CardDescription>Your attendance record</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-3">
//                 {weeklyAttendance.map((day, index) => (
//                   <div
//                     key={index}
//                     className="flex items-center justify-between"
//                   >
//                     <div className="flex items-center gap-3">
//                       <div
//                         className={`h-2 w-2 rounded-full ${
//                           day.present ? "bg-green-500" : "bg-red-500"
//                         }`}
//                       />
//                       <span className="font-medium">{day.day}</span>
//                     </div>
//                     <div className="flex items-center gap-2">
//                       <span className="text-sm text-gray-500">{day.time}</span>
//                       {day.present ? (
//                         <CheckCircle className="h-4 w-4 text-green-500" />
//                       ) : (
//                         <div className="flex items-center gap-1">
//                           <AlertCircle className="h-4 w-4 text-red-500" />
//                           <span className="text-xs text-red-500">
//                             {day.reason}
//                           </span>
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//               <div className="mt-4 rounded-lg bg-green-50 p-3 dark:bg-green-900/20">
//                 <p className="text-sm text-green-800 dark:text-green-300">
//                   <span className="font-semibold">Perfect attendance</span> this
//                   week! Keep it up!
//                 </p>
//               </div>
//             </CardContent>
//           </Card>

//           {/* Recent Grades */}
//           <Card>
//             <CardHeader>
//               <CardTitle>Recent Grades</CardTitle>
//               <CardDescription>Your latest assessments</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-4">
//                 {recentGrades.map((grade) => (
//                   <div
//                     key={grade.id}
//                     className="flex items-center justify-between"
//                   >
//                     <div>
//                       <p className="font-medium">{grade.subject}</p>
//                       <p className="text-sm text-gray-500">{grade.exam}</p>
//                     </div>
//                     <div className="text-right">
//                       <div className="flex items-center gap-2">
//                         <span className="font-bold">
//                           {grade.score}/{grade.total}
//                         </span>
//                         <Badge
//                           className={
//                             grade.score >= 90
//                               ? "bg-green-100 text-green-800"
//                               : grade.score >= 80
//                               ? "bg-blue-100 text-blue-800"
//                               : grade.score >= 70
//                               ? "bg-yellow-100 text-yellow-800"
//                               : "bg-red-100 text-red-800"
//                           }
//                         >
//                           {grade.grade}
//                         </Badge>
//                       </div>
//                       <p className="text-xs text-gray-500">{grade.date}</p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//               <Button className="mt-4 w-full" variant="outline" asChild>
//                 <Link href="/student/grades">View All Grades</Link>
//               </Button>
//             </CardContent>
//           </Card>
//         </div>
//       </div>

//       {/* Charts Section */}
//       <div className="grid gap-6 lg:grid-cols-2">
//         {/* Memorization Progress Chart */}
//         <Card>
//           <CardHeader>
//             <CardTitle>Memorization Progress</CardTitle>
//             <CardDescription>Pages memorized per month</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div className="h-80">
//               <ResponsiveContainer width="100%" height="100%">
//                 <LineChart data={memorizationData}>
//                   <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
//                   <XAxis dataKey="month" stroke="#9CA3AF" />
//                   <YAxis stroke="#9CA3AF" />
//                   <Tooltip
//                     contentStyle={{
//                       backgroundColor: "white",
//                       border: "1px solid #E5E7EB",
//                       borderRadius: "8px",
//                     }}
//                   />
//                   <Line
//                     type="monotone"
//                     dataKey="pages"
//                     stroke="#8b5cf6"
//                     strokeWidth={2}
//                     dot={{ fill: "#8b5cf6", strokeWidth: 2, r: 4 }}
//                     activeDot={{ r: 6 }}
//                   />
//                 </LineChart>
//               </ResponsiveContainer>
//             </div>
//           </CardContent>
//         </Card>

//         {/* Progress Distribution */}
//         <Card>
//           <CardHeader>
//             <CardTitle>Progress Distribution</CardTitle>
//             <CardDescription>Status of your Quran memorization</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div className="h-80">
//               <ResponsiveContainer width="100%" height="100%">
//                 <PieChart>
//                   <Pie
//                     data={progressDistribution}
//                     cx="50%"
//                     cy="50%"
//                     labelLine={false}
//                     label={({ name, percent }) =>
//                       `${name}: ${(percent * 100).toFixed(0)}%`
//                     }
//                     outerRadius={80}
//                     fill="#8884d8"
//                     dataKey="value"
//                   >
//                     {progressDistribution.map((entry, index) => (
//                       <Cell key={`cell-${index}`} fill={entry.color} />
//                     ))}
//                   </Pie>
//                   <Tooltip
//                     contentStyle={{
//                       backgroundColor: "white",
//                       border: "1px solid #E5E7EB",
//                       borderRadius: "8px",
//                     }}
//                   />
//                 </PieChart>
//               </ResponsiveContainer>
//             </div>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Quick Actions */}
//       <Card>
//         <CardHeader>
//           <CardTitle>Quick Actions</CardTitle>
//           <CardDescription>Frequently used features</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
//             <Button
//               variant="outline"
//               className="h-auto flex-col gap-2 p-4"
//               asChild
//             >
//               <Link href="/student/classes">
//                 <BookOpen className="h-6 w-6" />
//                 <span>My Classes</span>
//               </Link>
//             </Button>
//             <Button
//               variant="outline"
//               className="h-auto flex-col gap-2 p-4"
//               asChild
//             >
//               <Link href="/student/assignments">
//                 <FileText className="h-6 w-6" />
//                 <span>Assignments</span>
//               </Link>
//             </Button>
//             <Button
//               variant="outline"
//               className="h-auto flex-col gap-2 p-4"
//               asChild
//             >
//               <Link href="/student/quran">
//                 <Book className="h-6 w-6" />
//                 <span>Quran Tracker</span>
//               </Link>
//             </Button>
//             <Button
//               variant="outline"
//               className="h-auto flex-col gap-2 p-4"
//               asChild
//             >
//               <Link href="/student/resources">
//                 <Download className="h-6 w-6" />
//                 <span>Resources</span>
//               </Link>
//             </Button>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }






// src/app/(dashboard)/student/page.tsx
"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  Calendar, 
  FileText, 
  BookOpen, 
  TrendingUp, 
  Award,
  Clock,
  CheckCircle,
  AlertCircle,
  ChevronRight,
  Book,
  Target,
  Users,
  Video
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { getInitials } from '@/lib/utils'

// Mock data
const upcomingClasses = [
  { id: 1, name: 'Quran Memorization', time: 'Today, 14:00', teacher: 'Sheikh Ahmed', status: 'upcoming' },
  { id: 2, name: 'Tajweed Rules', time: 'Tomorrow, 10:00', teacher: 'Ustadha Fatima', status: 'upcoming' },
  { id: 3, name: 'Fiqh of Worship', time: 'Tomorrow, 16:00', teacher: 'Ustadh Muhammad', status: 'upcoming' },
]

const pendingAssignments = [
  { id: 1, title: 'Memorize Surah Al-Mulk (1-15)', subject: 'Quran', dueDate: 'Tomorrow', progress: 60 },
  { id: 2, title: 'Fiqh Project: Wudu Steps', subject: 'Fiqh', dueDate: '2 days', progress: 30 },
  { id: 3, title: 'Arabic Vocabulary Quiz', subject: 'Arabic', dueDate: '3 days', progress: 0 },
]

const recentGrades = [
  { id: 1, subject: 'Quran Recitation', score: 95, total: 100, grade: 'A+', date: 'Jan 15' },
  { id: 2, subject: 'Tajweed Test', score: 88, total: 100, grade: 'A-', date: 'Jan 10' },
  { id: 3, subject: 'Fiqh Midterm', score: 92, total: 100, grade: 'A', date: 'Jan 5' },
]

const quranProgress = {
  currentJuz: 28,
  juzName: 'Al-Qasas',
  progress: 75,
  lastRevision: '2 days ago',
  nextTarget: 'Complete Juz 28 by Jan 20',
}

const quickStats = [
  { label: 'Attendance Rate', value: '94%', icon: CheckCircle, color: 'text-green-600' },
  { label: 'Current Streak', value: '7 days', icon: TrendingUp, color: 'text-purple-600' },
  { label: 'Assignments Done', value: '12/15', icon: FileText, color: 'text-blue-600' },
  { label: 'Certificates', value: '3', icon: Award, color: 'text-yellow-600' },
]

export default function StudentDashboardPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [timeOfDay, setTimeOfDay] = useState('')

  useEffect(() => {
    // Set greeting based on time
    const hour = new Date().getHours()
    if (hour < 12) setTimeOfDay('morning')
    else if (hour < 18) setTimeOfDay('afternoon')
    else setTimeOfDay('evening')

    // Simulate loading
    setTimeout(() => setIsLoading(false), 1000)
  }, [])

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-purple-500 border-t-transparent"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="rounded-2xl bg-gradient-to-r from-purple-600 to-blue-600 p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">
              Good {timeOfDay}, Omar! 👋
            </h1>
            <p className="mt-2 text-purple-100">
              Welcome back to your learning journey. You have {pendingAssignments.length} pending assignments.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Badge className="bg-white/20 hover:bg-white/30">Current Level: Intermediate</Badge>
              <Badge className="bg-white/20 hover:bg-white/30">Student ID: STD-2024-001</Badge>
              <Badge className="bg-white/20 hover:bg-white/30">Enrolled: 3 Classes</Badge>
            </div>
          </div>
          <div className="hidden md:block">
            <Avatar className="h-20 w-20 border-4 border-white/20">
              <AvatarImage src="" />
              <AvatarFallback className="bg-white/20 text-2xl">
                {getInitials('Omar Ahmed')}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {quickStats.map((stat) => (
          <Card key={stat.label} className="overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {stat.label}
                  </p>
                  <p className={`mt-2 text-2xl font-bold ${stat.color}`}>
                    {stat.value}
                  </p>
                </div>
                <div className="rounded-lg bg-gray-100 p-3 dark:bg-gray-800">
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Pending Assignments */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Pending Assignments</CardTitle>
                  <CardDescription>
                    {pendingAssignments.length} assignments need your attention
                  </CardDescription>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/student/assignments">
                    View All
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingAssignments.map((assignment) => (
                  <div
                    key={assignment.id}
                    className="flex items-center justify-between rounded-lg border border-gray-200 p-4 dark:border-gray-700"
                  >
                    <div className="flex items-start space-x-3">
                      <div className={`rounded-lg p-2 ${
                        assignment.subject === 'Quran' ? 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400' :
                        assignment.subject === 'Fiqh' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' :
                        'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400'
                      }`}>
                        <FileText className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-medium">{assignment.title}</h4>
                        <div className="mt-1 flex items-center space-x-3 text-sm text-gray-600 dark:text-gray-400">
                          <span>{assignment.subject}</span>
                          <span>•</span>
                          <span className="flex items-center">
                            <Clock className="mr-1 h-3 w-3" />
                            Due in {assignment.dueDate}
                          </span>
                        </div>
                        <div className="mt-3">
                          <div className="flex items-center justify-between text-sm">
                            <span>Progress</span>
                            <span className="font-medium">{assignment.progress}%</span>
                          </div>
                          <Progress value={assignment.progress} className="mt-1 h-2" />
                        </div>
                      </div>
                    </div>
                    <Button size="sm" asChild>
                      <Link href={`/student/assignments/${assignment.id}`}>
                        Continue
                      </Link>
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quran Progress */}
          <Card>
            <CardHeader>
              <CardTitle>Quran Memorization Progress</CardTitle>
              <CardDescription>
                Track your Hifz journey
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-xl bg-gradient-to-r from-purple-50 to-blue-50 p-6 dark:from-gray-800 dark:to-gray-900">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center space-x-2">
                      <Book className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                      <h3 className="text-xl font-bold">Juz {quranProgress.currentJuz}</h3>
                    </div>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">
                      {quranProgress.juzName} • {quranProgress.progress}% Complete
                    </p>
                    <div className="mt-4">
                      <div className="flex items-center justify-between text-sm">
                        <span>Memorization Progress</span>
                        <span className="font-medium">{quranProgress.progress}%</span>
                      </div>
                      <Progress value={quranProgress.progress} className="mt-2 h-3" />
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600 dark:text-gray-400">Last Revision</p>
                        <p className="font-medium">{quranProgress.lastRevision}</p>
                      </div>
                      <div>
                        <p className="text-gray-600 dark:text-gray-400">Next Target</p>
                        <p className="font-medium">{quranProgress.nextTarget}</p>
                      </div>
                    </div>
                  </div>
                  <div className="hidden lg:block">
                    <div className="relative">
                      <div className="h-40 w-40">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center">
                            <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                              {quranProgress.progress}%
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">Complete</div>
                          </div>
                        </div>
                        <svg className="h-full w-full" viewBox="0 0 100 100">
                          <circle
                            cx="50"
                            cy="50"
                            r="45"
                            fill="none"
                            stroke="#e5e7eb"
                            strokeWidth="10"
                          />
                          <circle
                            cx="50"
                            cy="50"
                            r="45"
                            fill="none"
                            stroke="#8b5cf6"
                            strokeWidth="10"
                            strokeLinecap="round"
                            strokeDasharray={`${quranProgress.progress * 2.83} 283`}
                            transform="rotate(-90 50 50)"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex space-x-3">
                  <Button className="flex-1 bg-gradient-primary" asChild>
                    <Link href="/student/quran">
                      View Detailed Progress
                    </Link>
                  </Button>
                  <Button variant="outline" className="flex-1" asChild>
                    <Link href="/student/quran/history">
                      History
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Upcoming Classes */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Upcoming Classes</CardTitle>
              <CardDescription>Your schedule for today and tomorrow</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingClasses.map((classItem) => (
                  <div
                    key={classItem.id}
                    className="rounded-lg border border-gray-200 p-4 dark:border-gray-700"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center space-x-2">
                          <div className="rounded bg-purple-100 p-1 dark:bg-purple-900/30">
                            <Video className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                          </div>
                          <h4 className="font-medium">{classItem.name}</h4>
                        </div>
                        <div className="mt-2 space-y-1 text-sm text-gray-600 dark:text-gray-400">
                          <div className="flex items-center">
                            <Users className="mr-2 h-3 w-3" />
                            {classItem.teacher}
                          </div>
                          <div className="flex items-center">
                            <Clock className="mr-2 h-3 w-3" />
                            {classItem.time}
                          </div>
                        </div>
                      </div>
                      <Badge variant="outline" className="bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400">
                        {classItem.status}
                      </Badge>
                    </div>
                    <div className="mt-4 flex space-x-2">
                      <Button size="sm" className="flex-1" asChild>
                        <Link href={`/student/classes/${classItem.id}`}>
                          Join Class
                        </Link>
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        Add to Calendar
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="mt-4 w-full" asChild>
                <Link href="/student/schedule">
                  <Calendar className="mr-2 h-4 w-4" />
                  View Full Schedule
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Recent Grades */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Grades</CardTitle>
              <CardDescription>Your latest assessment results</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentGrades.map((grade) => (
                  <div key={grade.id} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{grade.subject}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Score: {grade.score}/{grade.total} • {grade.date}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className={`rounded-full px-3 py-1 text-sm font-medium ${
                        grade.grade === 'A+' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                        grade.grade === 'A' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' :
                        'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                      }`}>
                        {grade.grade}
                      </div>
                      <ChevronRight className="h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="mt-4 w-full" asChild>
                <Link href="/student/grades">
                  View All Grades
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Quick Links */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Links</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="h-auto flex-col items-start p-4" asChild>
                  <Link href="/student/classes">
                    <BookOpen className="mb-2 h-5 w-5" />
                    <span className="font-medium">My Classes</span>
                    <span className="mt-1 text-xs text-gray-600">3 enrolled</span>
                  </Link>
                </Button>
                <Button variant="outline" className="h-auto flex-col items-start p-4" asChild>
                  <Link href="/student/certificates">
                    <Award className="mb-2 h-5 w-5" />
                    <span className="font-medium">Certificates</span>
                    <span className="mt-1 text-xs text-gray-600">3 earned</span>
                  </Link>
                </Button>
                <Button variant="outline" className="h-auto flex-col items-start p-4" asChild>
                  <Link href="/student/messages">
                    <AlertCircle className="mb-2 h-5 w-5" />
                    <span className="font-medium">Messages</span>
                    <span className="mt-1 text-xs text-gray-600">2 unread</span>
                  </Link>
                </Button>
                <Button variant="outline" className="h-auto flex-col items-start p-4" asChild>
                  <Link href="/student/reports">
                    <Target className="mb-2 h-5 w-5" />
                    <span className="font-medium">Reports</span>
                    <span className="mt-1 text-xs text-gray-600">View progress</span>
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}