// app/(portal)/dashboard/admin/classes/[id]/view-class-client.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Edit,
  Calendar,
  Users,
  BookOpen,
  Clock,
  UserCheck,
  Download,
  Mail,
  Phone,
  MoreHorizontal,
  ChevronRight,
  School,
  Trash2,
  Plus,
  X,
  Loader2,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { ClassWithRelations } from "../../actions/classes";
import { ScheduleType } from "@/app/generated/prisma/enums";

interface ViewClassClientProps {
  classData: ClassWithRelations;
}

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
  return days[day];
};

const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

export function ViewClassClient({ classData }: ViewClassClientProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("overview");
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteClass = async () => {
    setIsDeleting(true);
    try {
      const response = await fetch(`/api/admin/classes/${classData.id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        toast.success("Class deleted successfully");
        router.push("/dashboard/admin/classes");
        router.refresh();
      } else {
        throw new Error("Failed to delete");
      }
    } catch (error) {
      toast.error("Failed to delete class");
    } finally {
      setIsDeleting(false);
      setOpenDeleteDialog(false);
    }
  };

  const enrollmentPercentage =
    (classData.currentEnrollment / classData.capacity) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-1">
            <School className="w-5 h-5 text-amber-500" />
            <span className="text-xs font-black uppercase tracking-wider text-amber-600 dark:text-amber-400">
              Class Management
            </span>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex items-center gap-4">
              <Link href="/dashboard/admin/classes">
                <Button variant="outline" size="icon" className="rounded-full">
                  <ArrowLeft className="w-4 h-4" />
                </Button>
              </Link>
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-2xl sm:text-3xl font-black tracking-tighter">
                    {classData.name}
                  </h1>
                  <Badge
                    className={cn(
                      classData.isActive
                        ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400"
                        : "bg-gray-100 text-gray-600",
                    )}
                  >
                    {classData.isActive ? "Active" : "Inactive"}
                  </Badge>
                </div>
                <p className="text-muted-foreground text-sm mt-1">
                  Code: {classData.code}
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <Link href={`/dashboard/admin/classes/${classData.id}/edit`}>
                <Button variant="outline" className="rounded-full">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Class
                </Button>
              </Link>
              <Link href={`/dashboard/admin/classes/${classData.id}/schedule`}>
                <Button variant="outline" className="rounded-full">
                  <Calendar className="w-4 h-4 mr-2" />
                  Manage Schedule
                </Button>
              </Link>
              <Link href={`/dashboard/admin/classes/${classData.id}/students`}>
                <Button variant="outline" className="rounded-full">
                  <Users className="w-4 h-4 mr-2" />
                  Manage Students
                </Button>
              </Link>
              <Button
                variant="outline"
                className="rounded-full text-red-600 hover:text-red-700 hover:bg-red-50"
                onClick={() => setOpenDeleteDialog(true)}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Enrollment</p>
                  <p className="text-2xl font-black">
                    {classData.currentEnrollment} / {classData.capacity}
                  </p>
                </div>
                <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-950/40 flex items-center justify-center">
                  <Users className="w-5 h-5 text-purple-600" />
                </div>
              </div>
              <Progress value={enrollmentPercentage} className="mt-3 h-1.5" />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Subjects</p>
                  <p className="text-2xl font-black">
                    {classData.subjects?.length || 0}
                  </p>
                </div>
                <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-950/40 flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Schedules</p>
                  <p className="text-2xl font-black">
                    {classData.schedules?.length || 0}
                  </p>
                </div>
                <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-950/40 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-amber-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Teacher</p>
                  <p className="text-sm font-black truncate max-w-[150px]">
                    {classData.teacher?.user?.name || "Not Assigned"}
                  </p>
                </div>
                <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-950/40 flex items-center justify-center">
                  <UserCheck className="w-5 h-5 text-emerald-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="grid w-full max-w-lg grid-cols-4 rounded-full bg-slate-100 dark:bg-slate-800 p-1">
            <TabsTrigger value="overview" className="rounded-full">
              Overview
            </TabsTrigger>
            <TabsTrigger value="schedule" className="rounded-full">
              Schedule
            </TabsTrigger>
            <TabsTrigger value="students" className="rounded-full">
              Students
            </TabsTrigger>
            <TabsTrigger value="subjects" className="rounded-full">
              Subjects
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Class Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Class Name</p>
                    <p className="font-medium">{classData.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Class Code</p>
                    <p className="font-mono font-medium">{classData.code}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Level</p>
                    <p>{classData.level}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Section</p>
                    <p>{classData.section || "Not specified"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Academic Year
                    </p>
                    <p>{classData.academicYear}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Term</p>
                    <p>{classData.term || "Not specified"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Schedule Type
                    </p>
                    <p>{classData.scheduleType}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Created By</p>
                    <p>{classData.createdBy?.name || "Unknown"}</p>
                  </div>
                </div>
                {classData.description && (
                  <div>
                    <p className="text-sm text-muted-foreground">Description</p>
                    <p className="text-sm mt-1">{classData.description}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Teacher Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <Avatar className="w-12 h-12">
                    <AvatarFallback className="bg-gradient-to-br from-purple-600 to-amber-500 text-white">
                      {getInitials(classData.teacher?.user?.name || "Unknown")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-black">
                      {classData.teacher?.user?.name || "Not Assigned"}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {classData.teacher?.user?.email}
                    </p>
                    {classData.teacher?.specialization && (
                      <p className="text-xs text-purple-600 mt-1">
                        {classData.teacher.specialization}
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Schedule Tab */}
          <TabsContent value="schedule" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Class Schedule</CardTitle>
                <CardDescription>Weekly class timings</CardDescription>
              </CardHeader>
              <CardContent>
                {classData.schedules && classData.schedules.length > 0 ? (
                  <div className="space-y-3">
                    {classData.schedules.map((schedule) => (
                      <div
                        key={schedule.id}
                        className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-24 text-sm font-black">
                            {getDayName(schedule.dayOfWeek)}
                          </div>
                          <div className="text-sm">
                            {schedule.startTime} - {schedule.endTime}
                          </div>
                        </div>
                        <Badge variant="outline">{schedule.timezone}</Badge>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <Clock className="w-12 h-12 mx-auto mb-3 opacity-30" />
                    <p>No schedule set for this class</p>
                    <Link
                      href={`/dashboard/admin/classes/${classData.id}/schedule`}
                    >
                      <Button variant="link" className="mt-2">
                        Add Schedule
                      </Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Students Tab */}
          <TabsContent value="students" className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Enrolled Students</CardTitle>
                  <CardDescription>
                    {classData.enrollments?.length || 0} students enrolled
                  </CardDescription>
                </div>
                <Link
                  href={`/dashboard/admin/classes/${classData.id}/students`}
                >
                  <Button
                    size="sm"
                    className="rounded-full bg-purple-600 hover:bg-purple-700"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Students
                  </Button>
                </Link>
              </CardHeader>
              <CardContent>
                {classData.enrollments && classData.enrollments.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Student</TableHead>
                        <TableHead>Enrolled Date</TableHead>
                        <TableHead>Progress</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {classData.enrollments.map((enrollment) => (
                        <TableRow key={enrollment.id}>
                          <TableCell>
                            <div>
                              <p className="font-medium">
                                {enrollment.studentName}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {enrollment.studentEmail}
                              </p>
                            </div>
                          </TableCell>
                          <TableCell>
                            {new Date(
                              enrollment.enrolledAt,
                            ).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium">
                                {enrollment.progress || 0}%
                              </span>
                              <Progress
                                value={enrollment.progress || 0}
                                className="w-20 h-1.5"
                              />
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="capitalize">
                              {enrollment.status.toLowerCase()}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8"
                                >
                                  <MoreHorizontal className="w-4 h-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  View Profile
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  Update Progress
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-red-600">
                                  Remove from Class
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <Users className="w-12 h-12 mx-auto mb-3 opacity-30" />
                    <p>No students enrolled yet</p>
                    <Link
                      href={`/dashboard/admin/classes/${classData.id}/students`}
                    >
                      <Button variant="link" className="mt-2">
                        Add Students
                      </Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Subjects Tab */}
          <TabsContent value="subjects" className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Subjects</CardTitle>
                  <CardDescription>
                    Subjects taught in this class
                  </CardDescription>
                </div>
                <Link
                  href={`/dashboard/admin/classes/${classData.id}/subjects/add`}
                >
                  <Button
                    size="sm"
                    className="rounded-full bg-purple-600 hover:bg-purple-700"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Subject
                  </Button>
                </Link>
              </CardHeader>
              <CardContent>
                {classData.subjects && classData.subjects.length > 0 ? (
                  <div className="space-y-3">
                    {classData.subjects.map((subject) => (
                      <div
                        key={subject.id}
                        className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <BookOpen className="w-5 h-5 text-purple-500" />
                          <div>
                            <p className="font-medium">{subject.name}</p>
                            <p className="text-xs text-muted-foreground">
                              Teacher: {subject.teacherName}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{subject.code}</Badge>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                              >
                                <MoreHorizontal className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>Edit Subject</DropdownMenuItem>
                              <DropdownMenuItem>
                                View Gradebook
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600">
                                Remove Subject
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-30" />
                    <p>No subjects added yet</p>
                    <Link
                      href={`/dashboard/admin/classes/${classData.id}/subjects/add`}
                    >
                      <Button variant="link" className="mt-2">
                        Add Subjects
                      </Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Class</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{classData.name}"? This action
              cannot be undone.
              {classData.currentEnrollment > 0 && (
                <div className="mt-2 p-2 bg-amber-50 dark:bg-amber-950/30 rounded-lg flex items-center gap-2 text-amber-600">
                  <AlertCircle className="w-4 h-4" />
                  <span className="text-sm">
                    This class has {classData.currentEnrollment} enrolled
                    students.
                  </span>
                </div>
              )}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setOpenDeleteDialog(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleDeleteClass}
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-700"
            >
              {isDeleting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Delete Class
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
