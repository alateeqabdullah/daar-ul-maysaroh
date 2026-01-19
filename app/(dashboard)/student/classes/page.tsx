// // src/app/(dashboard)/student/classes/page.tsx
// "use client";

// import { useState } from "react";
// import {
//   Search,
//   Filter,
//   Video,
//   Users,
//   Calendar,
//   Clock,
//   BookOpen,
//   Download,
//   Star,
//   Award,
//   ChevronRight,
//   ExternalLink,
//   MoreVertical,
// } from "lucide-react";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Badge } from "@/components/ui/badge";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Avatar, AvatarFallback } from "@/components/ui/avatar";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { Progress } from "@/components/ui/progress";
// import { toast } from "sonner";
// import Link from "next/link";

// // Mock data
// const enrolledClasses = [
//   {
//     id: 1,
//     name: "Quran Memorization - Level 1",
//     code: "QUR-101",
//     teacher: "Sheikh Ahmed Al-Qari",
//     description:
//       "Start your journey of Quran memorization with proper tajweed rules",
//     schedule: "Mon & Wed, 09:00-10:30",
//     progress: 65,
//     nextSession: "Today, 09:00",
//     resources: 12,
//     assignments: 3,
//     zoomLink: "https://zoom.us/j/123456",
//   },
//   {
//     id: 2,
//     name: "Tajweed Rules - Beginner",
//     code: "TAJ-101",
//     teacher: "Ustadha Fatima Zahra",
//     description: "Learn basic tajweed rules with practical examples",
//     schedule: "Tue & Thu, 14:00-15:30",
//     progress: 42,
//     nextSession: "Tomorrow, 14:00",
//     resources: 8,
//     assignments: 2,
//     zoomLink: "https://zoom.us/j/789012",
//   },
//   {
//     id: 3,
//     name: "Fiqh of Worship",
//     code: "FIQ-201",
//     teacher: "Ustadh Muhammad Ali",
//     description:
//       "Detailed study of purification, prayer, fasting, zakat, and hajj",
//     schedule: "Sat & Sun, 16:00-17:30",
//     progress: 28,
//     nextSession: "Saturday, 16:00",
//     resources: 15,
//     assignments: 4,
//   },
// ];

// const classMaterials = [
//   {
//     id: 1,
//     name: "Surah An-Naba Audio",
//     type: "audio",
//     class: "QUR-101",
//     date: "2 days ago",
//     size: "12 MB",
//   },
//   {
//     id: 2,
//     name: "Tajweed Rules PDF",
//     type: "document",
//     class: "TAJ-101",
//     date: "1 week ago",
//     size: "3 MB",
//   },
//   {
//     id: 3,
//     name: "Fiqh Slides",
//     type: "presentation",
//     class: "FIQ-201",
//     date: "2 weeks ago",
//     size: "8 MB",
//   },
//   {
//     id: 4,
//     name: "Recorded Lecture",
//     type: "video",
//     class: "QUR-101",
//     date: "3 days ago",
//     size: "45 MB",
//   },
// ];

// const teachers = [
//   {
//     id: 1,
//     name: "Sheikh Ahmed Al-Qari",
//     specialization: "Quran Memorization",
//     classes: 3,
//     rating: 4.9,
//   },
//   {
//     id: 2,
//     name: "Ustadha Fatima Zahra",
//     specialization: "Tajweed",
//     classes: 2,
//     rating: 4.8,
//   },
//   {
//     id: 3,
//     name: "Ustadh Muhammad Ali",
//     specialization: "Fiqh",
//     classes: 4,
//     rating: 4.7,
//   },
// ];

// export default function StudentClassesPage() {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [activeTab, setActiveTab] = useState("enrolled");

//   const handleJoinClass = (classId: number, className: string) => {
//     toast.success(`Joining ${className}...`, {
//       description: "Opening Zoom meeting.",
//     });
//   };

//   const handleDownloadMaterial = (materialId: number, materialName: string) => {
//     toast.info(`Downloading ${materialName}...`);
//   };

//   const filteredClasses = enrolledClasses.filter(
//     (cls) =>
//       cls.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       cls.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       cls.teacher.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
//         <div>
//           <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
//             My Classes
//           </h1>
//           <p className="mt-2 text-gray-600 dark:text-gray-400">
//             Manage your enrolled classes and access learning materials
//           </p>
//         </div>
//         <div className="flex items-center gap-3">
//           <Button variant="outline" className="gap-2">
//             <Filter className="h-4 w-4" />
//             Filter
//           </Button>
//           <Button className="bg-gradient-primary gap-2">
//             <BookOpen className="h-4 w-4" />
//             Explore More Classes
//           </Button>
//         </div>
//       </div>

//       {/* Search Bar */}
//       <div className="relative">
//         <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
//         <Input
//           placeholder="Search classes, teachers, or codes..."
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           className="pl-10"
//         />
//       </div>

//       {/* Tabs */}
//       <Tabs
//         value={activeTab}
//         onValueChange={setActiveTab}
//         className="space-y-6"
//       >
//         <TabsList>
//           <TabsTrigger value="enrolled">
//             Enrolled Classes ({enrolledClasses.length})
//           </TabsTrigger>
//           <TabsTrigger value="materials">
//             Learning Materials ({classMaterials.length})
//           </TabsTrigger>
//           <TabsTrigger value="teachers">
//             Teachers ({teachers.length})
//           </TabsTrigger>
//           <TabsTrigger value="schedule">Class Schedule</TabsTrigger>
//         </TabsList>

//         {/* Enrolled Classes Tab */}
//         <TabsContent value="enrolled" className="space-y-6">
//           {filteredClasses.length === 0 ? (
//             <Card>
//               <CardContent className="p-12 text-center">
//                 <BookOpen className="mx-auto h-12 w-12 text-gray-300" />
//                 <h3 className="mt-4 text-lg font-semibold">No classes found</h3>
//                 <p className="mt-2 text-gray-500">
//                   Try adjusting your search or explore available classes
//                 </p>
//                 <Button className="mt-4 bg-gradient-primary">
//                   Explore Classes
//                 </Button>
//               </CardContent>
//             </Card>
//           ) : (
//             <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//               {filteredClasses.map((cls) => (
//                 <Card key={cls.id} className="flex flex-col">
//                   <CardHeader>
//                     <div className="flex items-start justify-between">
//                       <div>
//                         <Badge className="mb-2">{cls.code}</Badge>
//                         <CardTitle className="line-clamp-1">
//                           {cls.name}
//                         </CardTitle>
//                         <CardDescription className="mt-2 flex items-center gap-1">
//                           <Users className="h-4 w-4" />
//                           {cls.teacher}
//                         </CardDescription>
//                       </div>
//                       <DropdownMenu>
//                         <DropdownMenuTrigger asChild>
//                           <Button variant="ghost" size="icon">
//                             <MoreVertical className="h-4 w-4" />
//                           </Button>
//                         </DropdownMenuTrigger>
//                         <DropdownMenuContent align="end">
//                           <DropdownMenuItem>View Details</DropdownMenuItem>
//                           <DropdownMenuItem>Share Class</DropdownMenuItem>
//                           <DropdownMenuItem>Request Leave</DropdownMenuItem>
//                         </DropdownMenuContent>
//                       </DropdownMenu>
//                     </div>
//                   </CardHeader>
//                   <CardContent className="flex-1">
//                     <p className="mb-4 text-sm text-gray-600 line-clamp-2">
//                       {cls.description}
//                     </p>

//                     <div className="space-y-3">
//                       <div className="flex items-center justify-between text-sm">
//                         <span className="text-gray-600">Progress</span>
//                         <span className="font-medium">{cls.progress}%</span>
//                       </div>
//                       <Progress value={cls.progress} />

//                       <div className="space-y-2 text-sm">
//                         <div className="flex items-center gap-2">
//                           <Calendar className="h-4 w-4 text-gray-400" />
//                           {cls.schedule}
//                         </div>
//                         <div className="flex items-center gap-2">
//                           <Clock className="h-4 w-4 text-gray-400" />
//                           Next: {cls.nextSession}
//                         </div>
//                         <div className="flex items-center gap-4">
//                           <span className="flex items-center gap-1">
//                             <BookOpen className="h-4 w-4 text-gray-400" />
//                             {cls.resources} resources
//                           </span>
//                           <span className="flex items-center gap-1">
//                             <Award className="h-4 w-4 text-gray-400" />
//                             {cls.assignments} assignments
//                           </span>
//                         </div>
//                       </div>
//                     </div>
//                   </CardContent>
//                   <CardFooter className="flex gap-2">
//                     {cls.zoomLink ? (
//                       <Button
//                         className="flex-1 bg-gradient-primary"
//                         onClick={() => handleJoinClass(cls.id, cls.name)}
//                       >
//                         <Video className="mr-2 h-4 w-4" />
//                         Join Class
//                       </Button>
//                     ) : (
//                       <Button className="flex-1" variant="outline" disabled>
//                         <Clock className="mr-2 h-4 w-4" />
//                         Upcoming
//                       </Button>
//                     )}
//                     <Button variant="outline" size="icon" asChild>
//                       <Link href={`/student/classes/${cls.id}`}>
//                         <ChevronRight className="h-4 w-4" />
//                       </Link>
//                     </Button>
//                   </CardFooter>
//                 </Card>
//               ))}
//             </div>
//           )}
//         </TabsContent>

//         {/* Learning Materials Tab */}
//         <TabsContent value="materials">
//           <Card>
//             <CardHeader>
//               <CardTitle>Learning Materials</CardTitle>
//               <CardDescription>
//                 All resources from your enrolled classes
//               </CardDescription>
//             </CardHeader>
//             <CardContent>
//               <div className="overflow-x-auto">
//                 <table className="w-full">
//                   <thead>
//                     <tr className="border-b">
//                       <th className="px-4 py-3 text-left text-sm font-medium">
//                         Name
//                       </th>
//                       <th className="px-4 py-3 text-left text-sm font-medium">
//                         Type
//                       </th>
//                       <th className="px-4 py-3 text-left text-sm font-medium">
//                         Class
//                       </th>
//                       <th className="px-4 py-3 text-left text-sm font-medium">
//                         Date
//                       </th>
//                       <th className="px-4 py-3 text-left text-sm font-medium">
//                         Size
//                       </th>
//                       <th className="px-4 py-3 text-left text-sm font-medium">
//                         Actions
//                       </th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {classMaterials.map((material) => (
//                       <tr
//                         key={material.id}
//                         className="border-b hover:bg-gray-50 dark:hover:bg-gray-800"
//                       >
//                         <td className="px-4 py-3">
//                           <div className="flex items-center gap-3">
//                             <div
//                               className={`rounded-lg p-2 ${
//                                 material.type === "video"
//                                   ? "bg-red-100 text-red-600"
//                                   : material.type === "audio"
//                                   ? "bg-blue-100 text-blue-600"
//                                   : material.type === "document"
//                                   ? "bg-green-100 text-green-600"
//                                   : "bg-purple-100 text-purple-600"
//                               }`}
//                             >
//                               {material.type === "video" && (
//                                 <Video className="h-4 w-4" />
//                               )}
//                               {material.type === "audio" && (
//                                 <Download className="h-4 w-4" />
//                               )}
//                               {material.type === "document" && (
//                                 <BookOpen className="h-4 w-4" />
//                               )}
//                               {material.type === "presentation" && (
//                                 <ExternalLink className="h-4 w-4" />
//                               )}
//                             </div>
//                             <span className="font-medium">{material.name}</span>
//                           </div>
//                         </td>
//                         <td className="px-4 py-3">
//                           <Badge variant="outline" className="capitalize">
//                             {material.type}
//                           </Badge>
//                         </td>
//                         <td className="px-4 py-3 text-sm">{material.class}</td>
//                         <td className="px-4 py-3 text-sm text-gray-500">
//                           {material.date}
//                         </td>
//                         <td className="px-4 py-3 text-sm text-gray-500">
//                           {material.size}
//                         </td>
//                         <td className="px-4 py-3">
//                           <div className="flex items-center gap-2">
//                             <Button
//                               size="sm"
//                               variant="outline"
//                               onClick={() =>
//                                 handleDownloadMaterial(
//                                   material.id,
//                                   material.name
//                                 )
//                               }
//                             >
//                               <Download className="h-4 w-4" />
//                             </Button>
//                             <Button size="sm" variant="ghost">
//                               <ExternalLink className="h-4 w-4" />
//                             </Button>
//                           </div>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </CardContent>
//             <CardFooter>
//               <Button variant="outline" className="w-full">
//                 View All Materials
//               </Button>
//             </CardFooter>
//           </Card>
//         </TabsContent>

//         {/* Teachers Tab */}
//         <TabsContent value="teachers">
//           <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//             {teachers.map((teacher) => (
//               <Card key={teacher.id}>
//                 <CardContent className="p-6">
//                   <div className="flex items-start gap-4">
//                     <Avatar className="h-12 w-12">
//                       <AvatarFallback className="bg-gradient-primary text-white">
//                         {teacher.name
//                           .split(" ")
//                           .map((n) => n[0])
//                           .join("")}
//                       </AvatarFallback>
//                     </Avatar>
//                     <div className="flex-1">
//                       <h3 className="font-semibold">{teacher.name}</h3>
//                       <p className="text-sm text-gray-600">
//                         {teacher.specialization}
//                       </p>
//                       <div className="mt-3 flex items-center justify-between">
//                         <div className="flex items-center gap-1">
//                           <Star className="h-4 w-4 text-yellow-500 fill-current" />
//                           <span className="font-medium">{teacher.rating}</span>
//                           <span className="text-sm text-gray-500">/5.0</span>
//                         </div>
//                         <Badge variant="outline">
//                           {teacher.classes} classes
//                         </Badge>
//                       </div>
//                       <Button className="mt-4 w-full" variant="outline" asChild>
//                         <Link href={`/student/teachers/${teacher.id}`}>
//                           View Profile
//                         </Link>
//                       </Button>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         </TabsContent>

//         {/* Schedule Tab */}
//         <TabsContent value="schedule">
//           <Card>
//             <CardHeader>
//               <CardTitle>Class Schedule</CardTitle>
//               <CardDescription>Your weekly timetable</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <div className="overflow-x-auto">
//                 <table className="w-full">
//                   <thead>
//                     <tr className="border-b">
//                       <th className="px-4 py-3 text-left text-sm font-medium">
//                         Time
//                       </th>
//                       <th className="px-4 py-3 text-left text-sm font-medium">
//                         Monday
//                       </th>
//                       <th className="px-4 py-3 text-left text-sm font-medium">
//                         Tuesday
//                       </th>
//                       <th className="px-4 py-3 text-left text-sm font-medium">
//                         Wednesday
//                       </th>
//                       <th className="px-4 py-3 text-left text-sm font-medium">
//                         Thursday
//                       </th>
//                       <th className="px-4 py-3 text-left text-sm font-medium">
//                         Friday
//                       </th>
//                       <th className="px-4 py-3 text-left text-sm font-medium">
//                         Saturday
//                       </th>
//                       <th className="px-4 py-3 text-left text-sm font-medium">
//                         Sunday
//                       </th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {/* Morning Session */}
//                     <tr className="border-b">
//                       <td className="px-4 py-3 text-sm font-medium">
//                         09:00 - 10:30
//                       </td>
//                       <td className="px-4 py-3">
//                         <div className="rounded-lg bg-purple-100 p-3 dark:bg-purple-900/30">
//                           <p className="font-medium">Quran Memorization</p>
//                           <p className="text-sm text-purple-600">
//                             Sheikh Ahmed
//                           </p>
//                         </div>
//                       </td>
//                       <td className="px-4 py-3"></td>
//                       <td className="px-4 py-3">
//                         <div className="rounded-lg bg-purple-100 p-3 dark:bg-purple-900/30">
//                           <p className="font-medium">Quran Memorization</p>
//                           <p className="text-sm text-purple-600">
//                             Sheikh Ahmed
//                           </p>
//                         </div>
//                       </td>
//                       <td className="px-4 py-3"></td>
//                       <td className="px-4 py-3">
//                         <div className="rounded-lg bg-purple-100 p-3 dark:bg-purple-900/30">
//                           <p className="font-medium">Quran Memorization</p>
//                           <p className="text-sm text-purple-600">
//                             Sheikh Ahmed
//                           </p>
//                         </div>
//                       </td>
//                       <td className="px-4 py-3"></td>
//                       <td className="px-4 py-3"></td>
//                     </tr>
//                     {/* Afternoon Session */}
//                     <tr className="border-b">
//                       <td className="px-4 py-3 text-sm font-medium">
//                         14:00 - 15:30
//                       </td>
//                       <td className="px-4 py-3"></td>
//                       <td className="px-4 py-3">
//                         <div className="rounded-lg bg-blue-100 p-3 dark:bg-blue-900/30">
//                           <p className="font-medium">Tajweed Rules</p>
//                           <p className="text-sm text-blue-600">
//                             Ustadha Fatima
//                           </p>
//                         </div>
//                       </td>
//                       <td className="px-4 py-3"></td>
//                       <td className="px-4 py-3">
//                         <div className="rounded-lg bg-blue-100 p-3 dark:bg-blue-900/30">
//                           <p className="font-medium">Tajweed Rules</p>
//                           <p className="text-sm text-blue-600">
//                             Ustadha Fatima
//                           </p>
//                         </div>
//                       </td>
//                       <td className="px-4 py-3"></td>
//                       <td className="px-4 py-3"></td>
//                       <td className="px-4 py-3"></td>
//                     </tr>
//                     {/* Evening Session */}
//                     <tr>
//                       <td className="px-4 py-3 text-sm font-medium">
//                         16:00 - 17:30
//                       </td>
//                       <td className="px-4 py-3"></td>
//                       <td className="px-4 py-3"></td>
//                       <td className="px-4 py-3"></td>
//                       <td className="px-4 py-3"></td>
//                       <td className="px-4 py-3"></td>
//                       <td className="px-4 py-3">
//                         <div className="rounded-lg bg-green-100 p-3 dark:bg-green-900/30">
//                           <p className="font-medium">Fiqh of Worship</p>
//                           <p className="text-sm text-green-600">
//                             Ustadh Muhammad
//                           </p>
//                         </div>
//                       </td>
//                       <td className="px-4 py-3">
//                         <div className="rounded-lg bg-green-100 p-3 dark:bg-green-900/30">
//                           <p className="font-medium">Fiqh of Worship</p>
//                           <p className="text-sm text-green-600">
//                             Ustadh Muhammad
//                           </p>
//                         </div>
//                       </td>
//                     </tr>
//                   </tbody>
//                 </table>
//               </div>
//             </CardContent>
//             <CardFooter>
//               <Button variant="outline" className="w-full">
//                 <Download className="mr-2 h-4 w-4" />
//                 Download Schedule (PDF)
//               </Button>
//             </CardFooter>
//           </Card>
//         </TabsContent>
//       </Tabs>
//     </div>
//   );
// }




// src/app/(dashboard)/student/classes/page.tsx
"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  Search,
  Filter,
  BookOpen,
  Users,
  Calendar,
  Clock,
  Video,
  ChevronRight,
  Plus
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { getInitials } from '@/lib/utils'

interface Class {
  id: string
  name: string
  code: string
  description: string
  teacher: {
    id: string
    name: string
    avatar: string
  }
  schedule: Array<{
    day: number
    time: string
    type: string
    platform: string
  }>
  students: number
  progress: number
  status: string
}

export default function StudentClassesPage() {
  const [classes, setClasses] = useState<Class[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/student/classes");
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch classes");
      }

      setClasses(data.classes);
    } catch (error) {
      console.error("Error fetching classes:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredClasses = classes.filter((cls) => {
    const matchesSearch =
      cls.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cls.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cls.teacher.name.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter =
      filter === "all" ||
      (filter === "active" && cls.status === "ACTIVE") ||
      (filter === "completed" && cls.status === "COMPLETED");

    return matchesSearch && matchesFilter;
  });

  const getDayName = (day: number) => {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    return days[day] || "Unknown";
  };

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-purple-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            My Classes
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            View and manage all your enrolled classes
          </p>
        </div>
        <Button className="bg-gradient-primary gap-2">
          <Plus className="h-4 w-4" />
          Enroll in New Class
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-6 sm:grid-cols-3">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Classes
                </p>
                <p className="mt-2 text-2xl font-bold text-purple-600">
                  {classes.length}
                </p>
              </div>
              <div className="rounded-lg bg-purple-100 p-3 dark:bg-purple-900/30">
                <BookOpen className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Active Classes
                </p>
                <p className="mt-2 text-2xl font-bold text-green-600">
                  {classes.filter((c) => c.status === "ACTIVE").length}
                </p>
              </div>
              <div className="rounded-lg bg-green-100 p-3 dark:bg-green-900/30">
                <Video className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Average Progress
                </p>
                <p className="mt-2 text-2xl font-bold text-blue-600">
                  {classes.length > 0
                    ? Math.round(
                        classes.reduce((sum, cls) => sum + cls.progress, 0) /
                          classes.length
                      )
                    : 0}
                  %
                </p>
              </div>
              <div className="rounded-lg bg-blue-100 p-3 dark:bg-blue-900/30">
                <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <label className="mb-2 block text-sm font-medium">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search classes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium">Status</label>
              <Select value={filter} onValueChange={setFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Classes" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Classes</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="upcoming">Upcoming</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium">Sort By</label>
              <Select defaultValue="progress">
                <SelectTrigger>
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="progress">Progress</SelectItem>
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="recent">Recently Added</SelectItem>
                  <SelectItem value="schedule">Schedule</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Classes Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredClasses.length === 0 ? (
          <div className="col-span-full">
            <Card>
              <CardContent className="p-12 text-center">
                <BookOpen className="mx-auto h-12 w-12 text-gray-300" />
                <h3 className="mt-4 text-lg font-semibold">No classes found</h3>
                <p className="mt-2 text-gray-500">
                  {searchQuery
                    ? "Try a different search term"
                    : "You are not enrolled in any classes yet"}
                </p>
                <Button className="mt-4 bg-gradient-primary">
                  Browse Available Classes
                </Button>
              </CardContent>
            </Card>
          </div>
        ) : (
          filteredClasses.map((cls) => (
            <Card
              key={cls.id}
              className="overflow-hidden hover:shadow-lg transition-shadow"
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <Badge className="mb-2 bg-gradient-primary">
                      {cls.code}
                    </Badge>
                    <CardTitle className="text-xl">{cls.name}</CardTitle>
                    <CardDescription className="mt-2 line-clamp-2">
                      {cls.description}
                    </CardDescription>
                  </div>
                  <div
                    className={`h-3 w-3 rounded-full ${
                      cls.status === "ACTIVE"
                        ? "bg-green-500"
                        : cls.status === "COMPLETED"
                        ? "bg-blue-500"
                        : "bg-yellow-500"
                    }`}
                  />
                </div>
              </CardHeader>

              <CardContent>
                {/* Teacher Info */}
                <div className="mb-4 flex items-center space-x-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={cls.teacher.avatar} />
                    <AvatarFallback className="bg-gradient-primary text-white">
                      {getInitials(cls.teacher.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">Teacher</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {cls.teacher.name}
                    </p>
                  </div>
                </div>

                {/* Schedule */}
                <div className="mb-4 space-y-2">
                  <p className="text-sm font-medium">Schedule</p>
                  {cls.schedule.map((session, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between text-sm"
                    >
                      <span className="text-gray-600 dark:text-gray-400">
                        {getDayName(session.day)} • {session.time}
                      </span>
                      <Badge variant="outline" className="text-xs">
                        {session.type === "live" ? "Live" : "Recorded"}
                      </Badge>
                    </div>
                  ))}
                </div>

                {/* Progress */}
                <div className="mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">Progress</span>
                    <span className="font-medium text-purple-600">
                      {cls.progress}%
                    </span>
                  </div>
                  <Progress value={cls.progress} className="mt-2 h-2" />
                </div>

                {/* Class Stats */}
                <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center space-x-1">
                    <Users className="h-4 w-4" />
                    <span>{cls.students} students</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Video className="h-4 w-4" />
                    <span>Live Classes</span>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="flex space-x-2 border-t pt-4">
                <Button className="flex-1" asChild>
                  <Link href={`/student/classes/${cls.id}`}>Enter Class</Link>
                </Button>
                <Button variant="outline" size="icon" asChild>
                  <Link href={`/student/classes/${cls.id}/materials`}>
                    <BookOpen className="h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))
        )}
      </div>

      {/* Class Categories */}
      <Card>
        <CardHeader>
          <CardTitle>Available Categories</CardTitle>
          <CardDescription>Browse classes by subject</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                name: "Quran Memorization",
                count: 12,
                icon: BookOpen,
                color: "bg-purple-500",
              },
              {
                name: "Tajweed Rules",
                count: 8,
                icon: Video,
                color: "bg-blue-500",
              },
              {
                name: "Fiqh Studies",
                count: 6,
                icon: BookOpen,
                color: "bg-green-500",
              },
              {
                name: "Arabic Language",
                count: 10,
                icon: Users,
                color: "bg-yellow-500",
              },
            ].map((category) => (
              <Button
                key={category.name}
                variant="outline"
                className="h-auto flex-col items-start p-4"
                asChild
              >
                <Link
                  href={`/student/classes/category/${category.name.toLowerCase()}`}
                >
                  <div className={`mb-3 rounded-lg p-2 ${category.color}`}>
                    <category.icon className="h-5 w-5 text-white" />
                  </div>
                  <span className="font-medium">{category.name}</span>
                  <span className="mt-1 text-xs text-gray-600">
                    {category.count} classes
                  </span>
                </Link>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
