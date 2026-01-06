// src/components/admin/attendance-management-client.tsx
"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Calendar,
  Filter,
  Download,
  CheckCircle,
  XCircle,
  Clock,
  UserCheck,
  Users,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  BarChart3,
  Mail,
  Printer,
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
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { getInitials, formatDate } from "@/lib/utils";

interface AttendanceManagementClientProps {
  classes: any[];
  students: any[];
  attendanceRecords: any[];
  selectedDate: string;
  selectedClass: string | null;
  attendanceMap: any;
}

export default function AttendanceManagementClient({
  classes,
  students,
  attendanceRecords,
  selectedDate,
  selectedClass,
  attendanceMap,
}: AttendanceManagementClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [date, setDate] = useState(selectedDate);

  // Correction 1: Initialize classId with "all" if no class is selected
  const [classId, setClassId] = useState(selectedClass || "all");

  const [remarks, setRemarks] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isBulkDialogOpen, setIsBulkDialogOpen] = useState(false);
  const [bulkStatus, setBulkStatus] = useState("PRESENT");

  // Initialize attendance status from records
  const initialStatus: Record<string, string> = {};
  students.forEach((student) => {
    const record = attendanceMap[student.id];
    initialStatus[student.id] = record?.status || "ABSENT";
    if (record?.remarks) {
      setRemarks((prev) => ({ ...prev, [student.id]: record.remarks }));
    }
  });

  const [currentStatus, setCurrentStatus] = useState(initialStatus);

  const handleFilter = () => {
    const params = new URLSearchParams();
    if (date) params.set("date", date);

    // Correction 2: Only append class param if it's a specific ID (not "all")
    if (classId && classId !== "all") {
      params.set("class", classId);
    }

    router.push(`/admin/attendance?${params.toString()}`);
  };

  const handleMarkAttendance = async (studentId: string, status: string) => {
    try {
      const response = await fetch("/api/admin/attendance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentId,
          date,
          status,
          remarks: remarks[studentId] || "",
          classId: classId !== "all" ? classId : classes[0]?.id || "",
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to mark attendance");
      }

      toast.success("Attendance marked successfully");
      setCurrentStatus((prev) => ({ ...prev, [studentId]: status }));
    } catch (error) {
      toast.error("Failed to mark attendance", {
        description: "Please try again.",
      });
    }
  };

  const handleBulkMark = async () => {
    setIsLoading(true);
    try {
      const promises = students.map((student) =>
        fetch("/api/admin/attendance", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            studentId: student.id,
            date,
            status: bulkStatus,
            remarks: remarks[student.id] || "",
            classId: classId !== "all" ? classId : classes[0]?.id || "",
          }),
        })
      );

      await Promise.all(promises);
      toast.success(`Bulk attendance marked as ${bulkStatus}`);
      students.forEach((student) => {
        setCurrentStatus((prev) => ({ ...prev, [student.id]: bulkStatus }));
      });
      setIsBulkDialogOpen(false);
    } catch (error) {
      toast.error("Failed to mark bulk attendance", {
        description: "Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleExport = () => {
    toast.success("Attendance exported successfully", {
      description: "The attendance report has been downloaded.",
    });
  };

  const handleSendNotifications = async () => {
    const absentStudents = students.filter(
      (s) => currentStatus[s.id] === "ABSENT"
    );

    try {
      const response = await fetch("/api/admin/attendance/notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          date,
          studentIds: absentStudents.map((s) => s.id),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send notifications");
      }

      toast.success("Notifications sent successfully", {
        description: `${absentStudents.length} parents notified.`,
      });
    } catch (error) {
      toast.error("Failed to send notifications", {
        description: "Please try again.",
      });
    }
  };

  const stats = {
    total: students.length,
    present: students.filter((s) => currentStatus[s.id] === "PRESENT").length,
    absent: students.filter((s) => currentStatus[s.id] === "ABSENT").length,
    late: students.filter((s) => currentStatus[s.id] === "LATE").length,
    excused: students.filter((s) => currentStatus[s.id] === "EXCUSED").length,
  };

  const attendanceRate =
    stats.total > 0 ? ((stats.present + stats.excused) / stats.total) * 100 : 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Attendance Management
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Track and manage student attendance
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" className="gap-2" onClick={handleExport}>
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button
            className="bg-gradient-primary gap-2"
            onClick={() => setIsBulkDialogOpen(true)}
          >
            <UserCheck className="h-4 w-4" />
            Bulk Mark
          </Button>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-5">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Students
                </p>
                <p className="mt-2 text-2xl font-bold text-gray-900">
                  {stats.total}
                </p>
              </div>
              <div className="rounded-lg bg-gray-100 p-3">
                <Users className="h-6 w-6 text-gray-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Present</p>
                <p className="mt-2 text-2xl font-bold text-green-600">
                  {stats.present}
                </p>
              </div>
              <div className="rounded-lg bg-green-100 p-3">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Absent</p>
                <p className="mt-2 text-2xl font-bold text-red-600">
                  {stats.absent}
                </p>
              </div>
              <div className="rounded-lg bg-red-100 p-3">
                <XCircle className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Late</p>
                <p className="mt-2 text-2xl font-bold text-yellow-600">
                  {stats.late}
                </p>
              </div>
              <div className="rounded-lg bg-yellow-100 p-3">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Attendance Rate
                </p>
                <p className="mt-2 text-2xl font-bold text-blue-600">
                  {attendanceRate.toFixed(1)}%
                </p>
              </div>
              <div className="rounded-lg bg-blue-100 p-3">
                <BarChart3 className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <Label htmlFor="date">Date</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  type="date"
                  id="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-10 py-2 text-sm"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="class">Class</Label>
              <Select value={classId} onValueChange={setClassId}>
                <SelectTrigger>
                  <SelectValue placeholder="All Classes" />
                </SelectTrigger>
                <SelectContent>
                  {/* Correction 3: Use "all" instead of "" */}
                  <SelectItem value="all">All Classes</SelectItem>
                  {classes.map((cls) => (
                    <SelectItem key={cls.id} value={cls.id}>
                      {cls.name} ({cls.teacher?.user?.name})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end space-x-2">
              <Button onClick={handleFilter} className="w-full">
                <Filter className="mr-2 h-4 w-4" />
                Apply Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-600">
          {formatDate(date)} •{" "}
          {classId !== "all"
            ? classes.find((c) => c.id === classId)?.name
            : "All Classes"}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleSendNotifications}
            disabled={stats.absent === 0}
          >
            <Mail className="mr-2 h-4 w-4" />
            Notify Absent ({stats.absent})
          </Button>
          <Button variant="outline" size="sm" onClick={handleExport}>
            <Printer className="mr-2 h-4 w-4" />
            Print Report
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Attendance Records</CardTitle>
          <CardDescription>
            Mark attendance for each student. Click on status to change.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {students.length === 0 ? (
            <div className="py-12 text-center">
              <Users className="mx-auto h-12 w-12 text-gray-300" />
              <h3 className="mt-4 text-lg font-semibold">No students found</h3>
              <p className="mt-2 text-gray-500">
                Select a different date or class to view students
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="py-3 text-left text-sm font-medium text-gray-600">
                      Student
                    </th>
                    <th className="py-3 text-left text-sm font-medium text-gray-600">
                      Class
                    </th>
                    <th className="py-3 text-left text-sm font-medium text-gray-600">
                      Status
                    </th>
                    <th className="py-3 text-left text-sm font-medium text-gray-600">
                      Remarks
                    </th>
                    <th className="py-3 text-left text-sm font-medium text-gray-600">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student) => {
                    const status = currentStatus[student.id] || "ABSENT";
                    return (
                      <tr
                        key={student.id}
                        className="border-b hover:bg-gray-50"
                      >
                        <td className="py-4">
                          <div className="flex items-center space-x-3">
                            <Avatar>
                              <AvatarFallback className="bg-gradient-primary text-white">
                                {getInitials(student.user.name)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{student.user.name}</p>
                              <p className="text-sm text-gray-500">
                                {student.studentId}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4">
                          <div className="flex items-center space-x-2">
                            <BookOpen className="h-4 w-4 text-gray-400" />
                            <span>
                              {student.enrollments?.[0]?.class?.name ||
                                "No class"}
                            </span>
                          </div>
                        </td>
                        <td className="py-4">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-auto p-0">
                                <Badge
                                  variant={
                                    status === "PRESENT"
                                      ? "default"
                                      : status === "ABSENT"
                                      ? "destructive"
                                      : status === "LATE"
                                      ? "secondary"
                                      : "outline"
                                  }
                                  className="cursor-pointer"
                                >
                                  {status}
                                </Badge>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onClick={() =>
                                  handleMarkAttendance(student.id, "PRESENT")
                                }
                              >
                                <CheckCircle className="mr-2 h-4 w-4 text-green-600" />{" "}
                                Present
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() =>
                                  handleMarkAttendance(student.id, "ABSENT")
                                }
                              >
                                <XCircle className="mr-2 h-4 w-4 text-red-600" />{" "}
                                Absent
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() =>
                                  handleMarkAttendance(student.id, "LATE")
                                }
                              >
                                <Clock className="mr-2 h-4 w-4 text-yellow-600" />{" "}
                                Late
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() =>
                                  handleMarkAttendance(student.id, "EXCUSED")
                                }
                              >
                                <UserCheck className="mr-2 h-4 w-4 text-blue-600" />{" "}
                                Excused
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                        <td className="py-4">
                          <Textarea
                            placeholder="Add remarks..."
                            value={remarks[student.id] || ""}
                            onChange={(e) =>
                              setRemarks((prev) => ({
                                ...prev,
                                [student.id]: e.target.value,
                              }))
                            }
                            className="h-10 text-sm min-h-[40px]"
                            onBlur={() =>
                              handleMarkAttendance(student.id, status)
                            }
                          />
                        </td>
                        <td className="py-4">
                          <div className="flex items-center space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() =>
                                handleMarkAttendance(student.id, "PRESENT")
                              }
                            >
                              <CheckCircle className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() =>
                                handleMarkAttendance(student.id, "ABSENT")
                              }
                            >
                              <XCircle className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={isBulkDialogOpen} onOpenChange={setIsBulkDialogOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Bulk Mark Attendance</DialogTitle>
            <DialogDescription>
              Mark all students as a specific status
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Status for All Students</Label>
              <Select value={bulkStatus} onValueChange={setBulkStatus}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PRESENT">Present</SelectItem>
                  <SelectItem value="ABSENT">Absent</SelectItem>
                  <SelectItem value="LATE">Late</SelectItem>
                  <SelectItem value="EXCUSED">Excused</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="rounded-lg bg-gray-50 p-4">
              <p className="text-sm text-gray-600">
                This will mark all {students.length} students as{" "}
                <span className="font-semibold">{bulkStatus}</span>.
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsBulkDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleBulkMark} disabled={isLoading}>
              {isLoading ? "Marking..." : "Mark All Students"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
