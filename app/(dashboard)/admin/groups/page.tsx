// // src/app/admin/groups/page.tsx
// "use client";

// import { useState, useEffect } from "react";
// import { useSession } from "next-auth/react";
// import { useRouter } from "next/navigation";
// import Link from "next/link";
// import {
//   Users,
//   Plus,
//   Search,
//   Filter,
//   Edit,
//   Trash2,
//   Eye,

//   UserCheck,
//   BarChart,
//   MoreVertical,
//   Download,

// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { toast } from "sonner";

// interface Group {
//   id: string;
//   name: string;
//   type: string;
//   description?: string;
//   capacity: number;
//   currentCount: number;
//   teacher?: {
//     user: {
//       name: string;
//     };
//   };
//   class?: {
//     name: string;
//   };
//   isActive: boolean;
//   createdAt: string;
//   schedules: any[];
// }

// export default function GroupsPage() {
//   const { data: session, status } = useSession();
//   const router = useRouter();

//   const [groups, setGroups] = useState<Group[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [search, setSearch] = useState("");
//   const [typeFilter, setTypeFilter] = useState("");
//   const [statusFilter, setStatusFilter] = useState("");

//   // Check admin access
//   useEffect(() => {
//     if (status === "loading") return;

//     if (!session) {
//       router.push("/login");
//       return;
//     }

//     if (!["SUPER_ADMIN", "ADMIN", "TEACHER"].includes(session.user.role)) {
//       router.push("/dashboard");
//     }
//   }, [session, status, router]);

//   // Fetch groups
//   const fetchGroups = async () => {
//     setLoading(true);
//     try {
//       const response = await fetch("/api/groups");
//       const data = await response.json();

//       if (response.ok) {
//         setGroups(data.groups);
//       } else {
//         toast.error(data.message || "Failed to fetch groups");
//       }
//     } catch (error) {
//       toast.error("An error occurred");
//       console.error("Error fetching groups:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (
//       session &&
//       ["SUPER_ADMIN", "ADMIN", "TEACHER"].includes(session.user.role)
//     ) {
//       fetchGroups();
//     }
//   }, [session]);

//   const handleDeleteGroup = async (groupId: string) => {
//     if (!confirm("Are you sure you want to delete this group?")) return;

//     try {
//       const response = await fetch(`/api/groups/${groupId}`, {
//         method: "DELETE",
//       });

//       const data = await response.json();

//       if (response.ok) {
//         toast.success(data.message);
//         fetchGroups();
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       toast.error("An error occurred");
//     }
//   };

//   const getTypeBadge = (type: string) => {
//     const variants = {
//       ACADEMIC: { label: "Academic", color: "bg-blue-100 text-blue-800" },
//       HIFZ: { label: "Hifz", color: "bg-purple-100 text-purple-800" },
//       REVISION: { label: "Revision", color: "bg-green-100 text-green-800" },
//       SUPPORT: { label: "Support", color: "bg-yellow-100 text-yellow-800" },
//       PROJECT: { label: "Project", color: "bg-indigo-100 text-indigo-800" },
//       OTHER: { label: "Other", color: "bg-gray-100 text-gray-800" },
//     };

//     const variant = variants[type as keyof typeof variants] || variants.OTHER;
//     return <Badge className={variant.color}>{variant.label}</Badge>;
//   };

//   const filteredGroups = groups.filter((group) => {
//     if (
//       search &&
//       !group.name.toLowerCase().includes(search.toLowerCase()) &&
//       !group.description?.toLowerCase().includes(search.toLowerCase())
//     ) {
//       return false;
//     }
//     // FIX 1: Allow empty string "" or the new "all" value to pass the filter
//     if (typeFilter && typeFilter !== "all" && group.type !== typeFilter)
//       return false;

//     // FIX 2: Allow empty string "" or the new "all" value to pass the filter
//     if (statusFilter && statusFilter !== "all") {
//       if (statusFilter === "active" && !group.isActive) return false;
//       if (statusFilter === "inactive" && group.isActive) return false;
//     }

//     return true;
//   });

//   if (status === "loading") {
//     return (
//       <div className="flex h-screen items-center justify-center">
//         <div className="h-8 w-8 animate-spin rounded-full border-4 border-purple-600 border-t-transparent" />
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
//         <div>
//           <h1 className="text-3xl font-bold tracking-tight">
//             Groups Management
//           </h1>
//           <p className="text-gray-600 dark:text-gray-400">
//             Create and manage student groups for targeted learning
//           </p>
//         </div>

//         <div className="flex items-center gap-3">
//           <Button variant="outline">
//             <Download className="mr-2 h-4 w-4" />
//             Export
//           </Button>
//           <Button onClick={() => router.push("/admin/groups/new")}>
//             <Plus className="mr-2 h-4 w-4" />
//             Create Group
//           </Button>
//         </div>
//       </div>

//       {/* Filters */}
//       <Card>
//         <CardContent className="p-6">
//           <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
//             {/* Search */}
//             <div className="relative">
//               <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
//               <Input
//                 placeholder="Search groups..."
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//                 className="pl-10"
//               />
//             </div>

//             {/* Type filter */}
//             <Select value={typeFilter} onValueChange={setTypeFilter}>
//               <SelectTrigger>
//                 <SelectValue placeholder="All Types" />
//               </SelectTrigger>
//               <SelectContent>
//                 {/* FIX 3: Changed value="" to value="all" */}
//                 <SelectItem value="all">All Types</SelectItem>
//                 <SelectItem value="ACADEMIC">Academic</SelectItem>
//                 <SelectItem value="HIFZ">Hifz</SelectItem>
//                 <SelectItem value="REVISION">Revision</SelectItem>
//                 <SelectItem value="SUPPORT">Support</SelectItem>
//                 <SelectItem value="PROJECT">Project</SelectItem>
//               </SelectContent>
//             </Select>

//             {/* Status filter */}
//             <Select value={statusFilter} onValueChange={setStatusFilter}>
//               <SelectTrigger>
//                 <SelectValue placeholder="All Status" />
//               </SelectTrigger>
//               <SelectContent>
//                 {/* FIX 4: Changed value="" to value="all" */}
//                 <SelectItem value="all">All Status</SelectItem>
//                 <SelectItem value="active">Active</SelectItem>
//                 <SelectItem value="inactive">Inactive</SelectItem>
//               </SelectContent>
//             </Select>

//             {/* Clear filters */}
//             <Button
//               variant="outline"
//               onClick={() => {
//                 setSearch("");
//                 setTypeFilter("");
//                 setStatusFilter("");
//               }}
//             >
//               <Filter className="mr-2 h-4 w-4" />
//               Clear Filters
//             </Button>
//           </div>
//         </CardContent>
//       </Card>

//       {/* Groups Grid */}
//       {loading ? (
//         <div className="flex h-64 items-center justify-center">
//           <div className="h-8 w-8 animate-spin rounded-full border-4 border-purple-600 border-t-transparent" />
//         </div>
//       ) : filteredGroups.length === 0 ? (
//         <Card>
//           <CardContent className="flex h-64 flex-col items-center justify-center text-center">
//             <Users className="h-12 w-12 text-gray-400" />
//             <h3 className="mt-4 text-lg font-semibold">No groups found</h3>
//             <p className="mt-2 text-gray-600 dark:text-gray-400">
//               Create your first group to organize students effectively
//             </p>
//             <Button
//               className="mt-4"
//               onClick={() => router.push("/admin/groups/new")}
//             >
//               <Plus className="mr-2 h-4 w-4" />
//               Create Group
//             </Button>
//           </CardContent>
//         </Card>
//       ) : (
//         <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//           {filteredGroups.map((group) => (
//             <Card key={group.id} className="overflow-hidden">
//               <CardHeader className="pb-3">
//                 <div className="flex items-start justify-between">
//                   <div className="space-y-1">
//                     <CardTitle className="text-lg">{group.name}</CardTitle>
//                     <CardDescription className="line-clamp-2">
//                       {group.description || "No description"}
//                     </CardDescription>
//                   </div>
//                   <DropdownMenu>
//                     <DropdownMenuTrigger asChild>
//                       <Button variant="ghost" size="icon">
//                         <MoreVertical className="h-4 w-4" />
//                       </Button>
//                     </DropdownMenuTrigger>
//                     <DropdownMenuContent align="end">
//                       <DropdownMenuItem asChild>
//                         <Link href={`/admin/groups/${group.id}`}>
//                           <Eye className="mr-2 h-4 w-4" />
//                           View Details
//                         </Link>
//                       </DropdownMenuItem>
//                       <DropdownMenuItem asChild>
//                         <Link href={`/admin/groups/${group.id}/edit`}>
//                           <Edit className="mr-2 h-4 w-4" />
//                           Edit
//                         </Link>
//                       </DropdownMenuItem>
//                       <DropdownMenuItem
//                         className="text-red-600"
//                         onClick={() => handleDeleteGroup(group.id)}
//                       >
//                         <Trash2 className="mr-2 h-4 w-4" />
//                         Delete
//                       </DropdownMenuItem>
//                     </DropdownMenuContent>
//                   </DropdownMenu>
//                 </div>
//               </CardHeader>

//               <CardContent>
//                 <div className="space-y-4">
//                   {/* Stats */}
//                   <div className="grid grid-cols-2 gap-4">
//                     <div className="rounded-lg bg-gray-50 p-3 dark:bg-gray-800">
//                       <div className="text-sm text-gray-600 dark:text-gray-400">
//                         Students
//                       </div>
//                       <div className="text-2xl font-bold">
//                         {group.currentCount}/{group.capacity}
//                       </div>
//                     </div>
//                     <div className="rounded-lg bg-gray-50 p-3 dark:bg-gray-800">
//                       <div className="text-sm text-gray-600 dark:text-gray-400">
//                         Type
//                       </div>
//                       <div className="mt-1">{getTypeBadge(group.type)}</div>
//                     </div>
//                   </div>

//                   {/* Details */}
//                   <div className="space-y-2">
//                     <div className="flex items-center justify-between text-sm">
//                       <span className="text-gray-600 dark:text-gray-400">
//                         Teacher
//                       </span>
//                       <span className="font-medium">
//                         {group.teacher?.user.name || "Not assigned"}
//                       </span>
//                     </div>
//                     <div className="flex items-center justify-between text-sm">
//                       <span className="text-gray-600 dark:text-gray-400">
//                         Class
//                       </span>
//                       <span className="font-medium">
//                         {group.class?.name || "Independent"}
//                       </span>
//                     </div>
//                     <div className="flex items-center justify-between text-sm">
//                       <span className="text-gray-600 dark:text-gray-400">
//                         Sessions
//                       </span>
//                       <span className="font-medium">
//                         {group.schedules?.length || 0} weekly
//                       </span>
//                     </div>
//                   </div>

//                   {/* Actions */}
//                   <div className="flex gap-2">
//                     <Button
//                       variant="outline"
//                       size="sm"
//                       className="flex-1"
//                       asChild
//                     >
//                       <Link href={`/admin/groups/${group.id}/members`}>
//                         <UserCheck className="mr-2 h-4 w-4" />
//                         Manage
//                       </Link>
//                     </Button>
//                     <Button
//                       variant="outline"
//                       size="sm"
//                       className="flex-1"
//                       asChild
//                     >
//                       <Link href={`/admin/groups/${group.id}/attendance`}>
//                         <BarChart className="mr-2 h-4 w-4" />
//                         Attendance
//                       </Link>
//                     </Button>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// src/app/(dashboard)/admin/groups/page.tsx

import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import GroupsManagementClient from "@/components/admin/groups-management-client";
import { auth } from "@/lib/auth";

export default async function GroupsManagementPage() {
  const session = await auth();
  if (!session) {
    redirect("/login");
  }

  if (!["SUPER_ADMIN", "ADMIN"].includes(session.user.role)) {
    redirect("/dashboard");
  }

  // Initialize data variables
  let serializedData = {
    groups: [],
    teachers: [],
    students: [],
    classes: [],
  };

  try {
    const [groups, teachers, students, classes] = await Promise.all([
      prisma.studentGroup.findMany({
        include: {
          teacher: { include: { user: true } },
          members: { include: { student: { include: { user: true } } } },
          class: true,
        },
        orderBy: { createdAt: "desc" },
      }),
      prisma.teacher.findMany({
        include: { user: true },
        where: { isAvailable: true },
      }),
      prisma.student.findMany({
        include: {
          user: true,
          enrollments: { include: { class: true } },
        },
        where: { user: { status: "APPROVED" } },
      }),
      prisma.class.findMany({
        where: { isActive: true },
        include: { teacher: { include: { user: true } } },
      }),
    ]);

    // Serialize data inside the try block
    serializedData = {
      groups: JSON.parse(JSON.stringify(groups)),
      teachers: JSON.parse(JSON.stringify(teachers)),
      students: JSON.parse(JSON.stringify(students)),
      classes: JSON.parse(JSON.stringify(classes)),
    };
  } catch (error) {
    console.error("Error loading groups data:", error);
    // Note: serializedData keeps its initial empty arrays from above
  }

  // Return JSX outside of the try/catch block
  return (
    <GroupsManagementClient
      initialGroups={serializedData.groups}
      teachers={serializedData.teachers}
      students={serializedData.students}
      classes={serializedData.classes}
    />
  );
}