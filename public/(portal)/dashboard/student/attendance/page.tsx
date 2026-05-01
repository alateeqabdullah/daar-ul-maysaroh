// src/app/(dashboard)/student/attendance/page.tsx
"use client";

import { useState } from "react";
import {
  Search,
  Filter,
  Calendar,
  CheckCircle,
  XCircle,
  Clock,
  TrendingUp,
  CalendarDays,
  Download,
  BarChart3,
  AlertCircle,
  ChevronDown,
  Eye,
  MoreVertical,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LineChart,
  Line,
} from "recharts";

// Mock data
const attendanceRecords = [
  {
    id: 1,
    date: "2024-01-15",
    class: "Quran Memorization",
    teacher: "Sheikh Ahmed",
    status: "present",
    time: "09:00-10:30",
    remarks: "",
  },
  {
    id: 2,
    date: "2024-01-16",
    class: "Tajweed Rules",
    teacher: "Ustadha Fatima",
    status: "present",
    time: "14:00-15:30",
    remarks: "",
  },
  {
    id: 3,
    date: "2024-01-17",
    class: "Quran Memorization",
    teacher: "Sheikh Ahmed",
    status: "absent",
    time: "09:00-10:30",
    remarks: "Sick",
  },
  {
    id: 4,
    date: "2024-01-18",
    class: "Tajweed Rules",
    teacher: "Ustadha Fatima",
    status: "present",
    time: "14:00-15:30",
    remarks: "",
  },
  {
    id: 5,
    date: "2024-01-19",
    class: "Quran Memorization",
    teacher: "Sheikh Ahmed",
    status: "present",
    time: "09:00-10:30",
    remarks: "Late (5 min)",
  },
  {
    id: 6,
    date: "2024-01-20",
    class: "Fiqh",
    teacher: "Ustadh Muhammad",
    status: "present",
    time: "16:00-17:30",
    remarks: "",
  },
  {
    id: 7,
    date: "2024-01-21",
    class: "Fiqh",
    teacher: "Ustadh Muhammad",
    status: "excused",
    time: "16:00-17:30",
    remarks: "Family event",
  },
  {
    id: 8,
    date: "2024-01-22",
    class: "Quran Memorization",
    teacher: "Sheikh Ahmed",
    status: "present",
    time: "09:00-10:30",
    remarks: "",
  },
  {
    id: 9,
    date: "2024-01-23",
    class: "Tajweed Rules",
    teacher: "Ustadha Fatima",
    status: "present",
    time: "14:00-15:30",
    remarks: "",
  },
  {
    id: 10,
    date: "2024-01-24",
    class: "Quran Memorization",
    teacher: "Sheikh Ahmed",
    status: "present",
    time: "09:00-10:30",
    remarks: "",
  },
];

const monthlyAttendance = [
  { month: "Sep", present: 18, absent: 2, excused: 1 },
  { month: "Oct", present: 20, absent: 0, excused: 0 },
  { month: "Nov", present: 19, absent: 1, excused: 0 },
  { month: "Dec", present: 17, absent: 2, excused: 2 },
  { month: "Jan", present: 16, absent: 1, excused: 1 },
];

const classWiseAttendance = [
  { class: "Quran Memorization", present: 24, total: 26, rate: 92.3 },
  { class: "Tajweed Rules", present: 22, total: 24, rate: 91.7 },
  { class: "Fiqh", present: 18, total: 20, rate: 90.0 },
  { class: "Arabic Language", present: 20, total: 20, rate: 100.0 },
];

export default function AttendancePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedClass, setSelectedClass] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedMonth, setSelectedMonth] = useState("all");

  const filteredRecords = attendanceRecords.filter((record) => {
    const matchesSearch =
      record.class.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.teacher.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesClass =
      selectedClass === "all" || record.class === selectedClass;
    const matchesStatus =
      selectedStatus === "all" || record.status === selectedStatus;

    return matchesSearch && matchesClass && matchesStatus;
  });

  const calculateStats = () => {
    const total = attendanceRecords.length;
    const present = attendanceRecords.filter(
      (r) => r.status === "present"
    ).length;
    const absent = attendanceRecords.filter(
      (r) => r.status === "absent"
    ).length;
    const excused = attendanceRecords.filter(
      (r) => r.status === "excused"
    ).length;

    return {
      total,
      present,
      absent,
      excused,
      rate: total > 0 ? Math.round((present / total) * 100) : 0,
    };
  };

  const stats = calculateStats();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "present":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case "absent":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
      case "excused":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
      case "late":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "present":
        return <CheckCircle className="h-4 w-4" />;
      case "absent":
        return <XCircle className="h-4 w-4" />;
      case "excused":
        return <AlertCircle className="h-4 w-4" />;
      case "late":
        return <Clock className="h-4 w-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Attendance
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Track your class attendance and history
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export Report
          </Button>
          <Button className="bg-gradient-primary gap-2">
            <CalendarDays className="h-4 w-4" />
            View Calendar
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Attendance Rate
                </p>
                <p className="mt-2 text-2xl font-bold text-green-600">
                  {stats.rate}%
                </p>
                <div className="flex items-center gap-1 text-sm text-green-600">
                  <TrendingUp className="h-4 w-4" />
                  +3% from last month
                </div>
              </div>
              <div className="rounded-lg bg-green-100 p-3 dark:bg-green-900/30">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Classes Attended
                </p>
                <p className="mt-2 text-2xl font-bold text-blue-600">
                  {stats.present}
                </p>
                <p className="text-sm text-blue-600">Out of {stats.total}</p>
              </div>
              <div className="rounded-lg bg-blue-100 p-3 dark:bg-blue-900/30">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Absences</p>
                <p className="mt-2 text-2xl font-bold text-red-600">
                  {stats.absent}
                </p>
                <p className="text-sm text-red-600">Unexcused</p>
              </div>
              <div className="rounded-lg bg-red-100 p-3 dark:bg-red-900/30">
                <XCircle className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Current Streak
                </p>
                <p className="mt-2 text-2xl font-bold text-purple-600">
                  14 days
                </p>
                <p className="text-sm text-purple-600">Perfect attendance</p>
              </div>
              <div className="rounded-lg bg-purple-100 p-3 dark:bg-purple-900/30">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Monthly Attendance */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Attendance Trend</CardTitle>
            <CardDescription>Attendance pattern over months</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyAttendance}>
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
                  <Bar dataKey="present" fill="#10b981" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="absent" fill="#ef4444" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="excused" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Class-wise Attendance */}
        <Card>
          <CardHeader>
            <CardTitle>Class-wise Attendance Rate</CardTitle>
            <CardDescription>Attendance percentage by class</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {classWiseAttendance.map((item) => (
                <div key={item.class} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{item.class}</span>
                    <span className="font-bold">{item.rate}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-gray-200">
                    <div
                      className="h-full rounded-full bg-gradient-primary"
                      style={{ width: `${item.rate}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>{item.present} present</span>
                    <span>{item.total} total classes</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="grid gap-4 sm:grid-cols-4">
            <div>
              <label className="mb-2 block text-sm font-medium">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search classes or teachers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium">Class</label>
              <Select value={selectedClass} onValueChange={setSelectedClass}>
                <SelectTrigger>
                  <SelectValue placeholder="All Classes" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Classes</SelectItem>
                  <SelectItem value="Quran Memorization">
                    Quran Memorization
                  </SelectItem>
                  <SelectItem value="Tajweed Rules">Tajweed Rules</SelectItem>
                  <SelectItem value="Fiqh">Fiqh</SelectItem>
                  <SelectItem value="Arabic Language">
                    Arabic Language
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium">Status</label>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="present">Present</SelectItem>
                  <SelectItem value="absent">Absent</SelectItem>
                  <SelectItem value="excused">Excused</SelectItem>
                  <SelectItem value="late">Late</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium">Month</label>
              <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                <SelectTrigger>
                  <SelectValue placeholder="All Months" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Months</SelectItem>
                  <SelectItem value="january">January 2024</SelectItem>
                  <SelectItem value="december">December 2023</SelectItem>
                  <SelectItem value="november">November 2023</SelectItem>
                  <SelectItem value="october">October 2023</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Attendance Records */}
      <Card>
        <CardHeader>
          <CardTitle>Attendance Records</CardTitle>
          <CardDescription>Detailed history of your attendance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Class</TableHead>
                  <TableHead>Teacher</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Remarks</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRecords.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell className="font-medium">
                      <div className="flex flex-col">
                        <span>{record.date}</span>
                        <span className="text-xs text-gray-500">
                          {new Date(record.date).toLocaleDateString("en-US", {
                            weekday: "long",
                          })}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>{record.class}</TableCell>
                    <TableCell>{record.teacher}</TableCell>
                    <TableCell>{record.time}</TableCell>
                    <TableCell>
                      <Badge
                        className={`gap-1 ${getStatusColor(record.status)}`}
                      >
                        {getStatusIcon(record.status)}
                        {record.status.charAt(0).toUpperCase() +
                          record.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {record.remarks ? (
                        <span className="text-sm text-gray-600">
                          {record.remarks}
                        </span>
                      ) : (
                        <span className="text-sm text-gray-400">-</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <p className="text-sm text-gray-600">
            Showing {filteredRecords.length} of {attendanceRecords.length}{" "}
            records
          </p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              Previous
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        </CardFooter>
      </Card>

      {/* Attendance Policy */}
      <Card>
        <CardHeader>
          <CardTitle>Attendance Policy</CardTitle>
          <CardDescription>
            Important information about attendance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
              <h4 className="font-medium text-blue-800 dark:text-blue-300">
                Minimum Attendance Requirement
              </h4>
              <p className="mt-2 text-sm text-blue-700 dark:text-blue-400">
                Students must maintain at least 80% attendance in each class to
                be eligible for final exams.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <h4 className="font-medium">Excused Absences</h4>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>• Medical emergencies (with doctor's note)</li>
                  <li>• Family emergencies</li>
                  <li>• Religious holidays</li>
                  <li>• Pre-approved family events</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">Unexcused Absences</h4>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>• More than 3 unexcused absences may affect grades</li>
                  <li>• Consistent late arrivals count as partial absences</li>
                  <li>
                    • Notify teacher at least 2 hours before class if absent
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full">
            <AlertCircle className="mr-2 h-4 w-4" />
            Report Attendance Issue
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
