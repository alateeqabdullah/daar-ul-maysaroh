// src/app/(dashboard)/teacher/attendance/page.tsx
"use client";

import { useState, useEffect } from "react";
import {
  Users,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  Download,
  Upload,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  BarChart3,
  Eye,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import {
  format,
  addDays,
  subDays,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isToday,
} from "date-fns";
import Link from "next/link";

interface AttendanceRecord {
  id: string;
  student: {
    id: string;
    name: string;
    avatar?: string;
  };
  date: string;
  status: "present" | "absent" | "late" | "excused";
  arrivalTime?: string;
  remarks?: string;
  markedBy: string;
}

interface Class {
  id: string;
  name: string;
  code: string;
  totalStudents: number;
}

export default function AttendancePage() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedClass, setSelectedClass] = useState<string>("");
  const [classes, setClasses] = useState<Class[]>([]);
  const [attendance, setAttendance] = useState<AttendanceRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [attendanceStats, setAttendanceStats] = useState({
    present: 0,
    absent: 0,
    late: 0,
    excused: 0,
    total: 0,
  });

  // Get week dates
  const weekStart = startOfWeek(selectedDate, { weekStartsOn: 0 });
  const weekEnd = endOfWeek(selectedDate, { weekStartsOn: 0 });
  const weekDays = eachDayOfInterval({ start: weekStart, end: weekEnd });

  useEffect(() => {
    fetchClasses();
  }, []);

  useEffect(() => {
    if (selectedClass) {
      fetchAttendance();
    }
  }, [selectedClass, selectedDate]);

  const fetchClasses = async () => {
    try {
      const response = await fetch("/api/teacher/classes");
      if (response.ok) {
        const data = await response.json();
        setClasses(data);
        if (data.length > 0) {
          setSelectedClass(data[0].id);
        }
      }
    } catch (error) {
      toast.error("Failed to load classes");
    }
  };

  const fetchAttendance = async () => {
    if (!selectedClass) return;

    try {
      setIsLoading(true);
      const dateStr = format(selectedDate, "yyyy-MM-dd");
      const response = await fetch(
        `/api/teacher/attendance?classId=${selectedClass}&date=${dateStr}`
      );

      if (response.ok) {
        const data = await response.json();
        setAttendance(data.records);
        setAttendanceStats(data.stats);
      }
    } catch (error) {
      toast.error("Failed to load attendance");
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusChange = (
    studentId: string,
    newStatus: AttendanceRecord["status"]
  ) => {
    setAttendance((prev) =>
      prev.map((record) =>
        record.student.id === studentId
          ? { ...record, status: newStatus }
          : record
      )
    );
  };

  const saveAttendance = async () => {
    if (!selectedClass) return;

    try {
      setIsSaving(true);
      const dateStr = format(selectedDate, "yyyy-MM-dd");
      const response = await fetch("/api/teacher/attendance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          classId: selectedClass,
          date: dateStr,
          records: attendance.map((record) => ({
            studentId: record.student.id,
            status: record.status,
            remarks: record.remarks,
          })),
        }),
      });

      if (response.ok) {
        toast.success("Attendance saved successfully");
        fetchAttendance(); // Refresh data
      } else {
        throw new Error("Failed to save attendance");
      }
    } catch (error) {
      toast.error("Failed to save attendance");
    } finally {
      setIsSaving(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "present":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
      case "absent":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300";
      case "late":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300";
      case "excused":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "present":
        return <CheckCircle className="h-4 w-4" />;
      case "absent":
        return <XCircle className="h-4 w-4" />;
      case "late":
        return <Clock className="h-4 w-4" />;
      case "excused":
        return <AlertCircle className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const selectedClassObj = classes.find((c) => c.id === selectedClass);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Attendance Management
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Mark and track student attendance
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button variant="outline" className="gap-2">
            <Upload className="h-4 w-4" />
            Import
          </Button>
          <Button
            className="bg-gradient-primary gap-2"
            onClick={saveAttendance}
            disabled={isSaving}
          >
            {isSaving ? "Saving..." : "Save Attendance"}
          </Button>
        </div>
      </div>

      {/* Date and Class Selector */}
      <Card>
        <CardContent className="p-6">
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <label className="mb-2 block text-sm font-medium">
                Select Class
              </label>
              <Select value={selectedClass} onValueChange={setSelectedClass}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a class" />
                </SelectTrigger>
                <SelectContent>
                  {classes.map((cls) => (
                    <SelectItem key={cls.id} value={cls.id}>
                      {cls.name} ({cls.code})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium">Date</label>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setSelectedDate(subDays(selectedDate, 1))}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Input
                  type="date"
                  value={format(selectedDate, "yyyy-MM-dd")}
                  onChange={(e) => setSelectedDate(new Date(e.target.value))}
                  className="text-center"
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setSelectedDate(addDays(selectedDate, 1))}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium">
                Quick Actions
              </label>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedDate(new Date())}
                >
                  Today
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/teacher/attendance/class/${selectedClass}`}>
                    <BarChart3 className="mr-2 h-4 w-4" />
                    View Reports
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Weekly Calendar View */}
      <Card>
        <CardHeader>
          <CardTitle>Week View</CardTitle>
          <CardDescription>Quick navigation through the week</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-2">
            {weekDays.map((day, index) => {
              const isSelected =
                format(day, "yyyy-MM-dd") ===
                format(selectedDate, "yyyy-MM-dd");
              const isTodayDate = isToday(day);

              return (
                <button
                  key={index}
                  onClick={() => setSelectedDate(day)}
                  className={`
                    flex flex-col items-center justify-center rounded-lg p-3 transition-colors
                    ${
                      isSelected
                        ? "bg-gradient-primary text-white"
                        : "bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
                    }
                    ${
                      isTodayDate && !isSelected
                        ? "border-2 border-purple-500"
                        : ""
                    }
                  `}
                >
                  <span className="text-sm font-medium">
                    {format(day, "EEE")}
                  </span>
                  <span className="text-lg font-bold">{format(day, "d")}</span>
                  <span className="text-xs opacity-70">
                    {format(day, "MMM")}
                  </span>
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      {selectedClassObj && (
        <div className="grid gap-6 sm:grid-cols-5">
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-sm font-medium text-gray-600">
                  Total Students
                </p>
                <p className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
                  {selectedClassObj.totalStudents}
                </p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-sm font-medium text-gray-600">Present</p>
                <p className="mt-2 text-2xl font-bold text-green-600">
                  {attendanceStats.present}
                </p>
                <p className="text-xs text-gray-500">
                  {attendanceStats.total > 0
                    ? Math.round(
                        (attendanceStats.present / attendanceStats.total) * 100
                      )
                    : 0}
                  %
                </p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-sm font-medium text-gray-600">Absent</p>
                <p className="mt-2 text-2xl font-bold text-red-600">
                  {attendanceStats.absent}
                </p>
                <p className="text-xs text-gray-500">
                  {attendanceStats.total > 0
                    ? Math.round(
                        (attendanceStats.absent / attendanceStats.total) * 100
                      )
                    : 0}
                  %
                </p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-sm font-medium text-gray-600">Late</p>
                <p className="mt-2 text-2xl font-bold text-yellow-600">
                  {attendanceStats.late}
                </p>
                <p className="text-xs text-gray-500">
                  {attendanceStats.total > 0
                    ? Math.round(
                        (attendanceStats.late / attendanceStats.total) * 100
                      )
                    : 0}
                  %
                </p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-sm font-medium text-gray-600">
                  Attendance Rate
                </p>
                <p className="mt-2 text-2xl font-bold text-purple-600">
                  {attendanceStats.total > 0
                    ? Math.round(
                        ((attendanceStats.present + attendanceStats.late) /
                          attendanceStats.total) *
                          100
                      )
                    : 0}
                  %
                </p>
                <p className="text-xs text-gray-500">Overall</p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Attendance Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>
                {selectedClassObj?.name} -{" "}
                {format(selectedDate, "MMMM d, yyyy")}
              </CardTitle>
              <CardDescription>
                Click on status buttons to mark attendance
              </CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setAttendance((prev) =>
                    prev.map((record) => ({
                      ...record,
                      status: "present",
                    }))
                  );
                }}
              >
                Mark All Present
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setAttendance((prev) =>
                    prev.map((record) => ({
                      ...record,
                      status: "absent",
                    }))
                  );
                }}
              >
                Mark All Absent
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex h-64 items-center justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-purple-500 border-t-transparent"></div>
            </div>
          ) : attendance.length === 0 ? (
            <div className="py-12 text-center">
              <Users className="mx-auto h-12 w-12 text-gray-300" />
              <h3 className="mt-4 text-lg font-semibold">No students found</h3>
              <p className="mt-2 text-gray-500">
                Select a class to view students
              </p>
            </div>
          ) : (
            <div className="overflow-hidden rounded-lg border">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-gray-50 dark:bg-gray-800">
                    <th className="px-6 py-3 text-left text-sm font-semibold">
                      Student
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">
                      Time
                    </th>
                    <th className="px6 py-3 text-left text-sm font-semibold">
                      Remarks
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {attendance.map((record) => (
                    <tr
                      key={record.id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-800"
                    >
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-primary text-white">
                            {record.student.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")
                              .toUpperCase()}
                          </div>
                          <div>
                            <p className="font-medium">{record.student.name}</p>
                            <p className="text-sm text-gray-500">
                              ID: {record.student.id.slice(0, 8)}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="flex space-x-2">
                          {(
                            ["present", "absent", "late", "excused"] as const
                          ).map((status) => (
                            <button
                              key={status}
                              onClick={() =>
                                handleStatusChange(record.student.id, status)
                              }
                              className={`
                                flex items-center space-x-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors
                                ${
                                  record.status === status
                                    ? getStatusColor(status)
                                    : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                                }
                              `}
                            >
                              {getStatusIcon(status)}
                              <span className="capitalize">{status}</span>
                            </button>
                          ))}
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {record.arrivalTime ? (
                          <div className="flex items-center space-x-2">
                            <Clock className="h-4 w-4 text-gray-400" />
                            <span>{record.arrivalTime}</span>
                          </div>
                        ) : (
                          <span className="text-gray-400">Not recorded</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <Input
                          placeholder="Add remarks..."
                          value={record.remarks || ""}
                          onChange={(e) => {
                            setAttendance((prev) =>
                              prev.map((r) =>
                                r.id === record.id
                                  ? { ...r, remarks: e.target.value }
                                  : r
                              )
                            );
                          }}
                          className="w-full"
                        />
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                              <Link
                                href={`/teacher/students/${record.student.id}/attendance`}
                              >
                                <Eye className="mr-2 h-4 w-4" />
                                View History
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Clock className="mr-2 h-4 w-4" />
                              Record Arrival Time
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <AlertCircle className="mr-2 h-4 w-4" />
                              Add Note
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Attendance Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Attendance Summary</CardTitle>
          <CardDescription>Monthly overview</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">This Month</span>
              <span className="text-green-600">85% average attendance</span>
            </div>
            <div className="h-2 w-full rounded-full bg-gray-200 dark:bg-gray-700">
              <div className="h-full w-4/5 rounded-full bg-gradient-primary"></div>
            </div>
            <div className="grid grid-cols-4 gap-4 text-center">
              <div>
                <p className="text-sm text-gray-600">Present Days</p>
                <p className="text-2xl font-bold text-green-600">18</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Absent Days</p>
                <p className="text-2xl font-bold text-red-600">2</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Late Arrivals</p>
                <p className="text-2xl font-bold text-yellow-600">3</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Best Student</p>
                <p className="text-lg font-bold text-purple-600">Ahmed Khan</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
