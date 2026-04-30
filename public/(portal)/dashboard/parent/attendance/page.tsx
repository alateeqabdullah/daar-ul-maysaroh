// src/app/(dashboard)/parent/attendance/page.tsx
"use client";

import { useState, useEffect } from "react";
import {
  Calendar,
  Download,
  Filter,
  TrendingUp,
  TrendingDown,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  BarChart3,
  CalendarDays,
  Users,
  Eye,
  Printer,
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
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie,
  Legend,
} from "recharts";
import { formatDate } from "@/lib/utils";
import { toast } from "sonner";

interface AttendanceRecord {
  id: string;
  childName: string;
  date: string;
  day: string;
  className: string;
  teacher: string;
  status: "PRESENT" | "ABSENT" | "LATE" | "EXCUSED" | "LEAVE";
  arrivalTime?: string;
  departureTime?: string;
  remarks?: string;
}

interface AttendanceSummary {
  childName: string;
  totalClasses: number;
  present: number;
  absent: number;
  late: number;
  excused: number;
  attendanceRate: number;
  streak: number;
}

export default function ParentAttendancePage() {
  const [attendanceRecords, setAttendanceRecords] = useState<
    AttendanceRecord[]
  >([]);
  const [summary, setSummary] = useState<AttendanceSummary[]>([]);
  const [selectedChild, setSelectedChild] = useState("ALL");
  const [selectedMonth, setSelectedMonth] = useState("CURRENT");
  const [selectedStatus, setSelectedStatus] = useState("ALL");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAttendance = async () => {
      setIsLoading(true);
      try {
        // Mock data - Replace with API calls
        const mockRecords: AttendanceRecord[] = [
          {
            id: "1",
            childName: "Omar Ahmed",
            date: "2024-01-15",
            day: "Monday",
            className: "Quran Class",
            teacher: "Sheikh Ahmed",
            status: "PRESENT",
            arrivalTime: "9:05 AM",
            departureTime: "10:30 AM",
          },
          {
            id: "2",
            childName: "Omar Ahmed",
            date: "2024-01-14",
            day: "Sunday",
            className: "Tajweed Class",
            teacher: "Sheikh Ahmed",
            status: "PRESENT",
            arrivalTime: "9:00 AM",
          },
          {
            id: "3",
            childName: "Omar Ahmed",
            date: "2024-01-13",
            day: "Saturday",
            className: "Quran Class",
            teacher: "Sheikh Ahmed",
            status: "LATE",
            arrivalTime: "9:15 AM",
            remarks: "Traffic delay",
          },
          {
            id: "4",
            childName: "Omar Ahmed",
            date: "2024-01-12",
            day: "Friday",
            className: "Fiqh Class",
            teacher: "Ustadh Muhammad",
            status: "ABSENT",
            remarks: "Sick leave",
          },
          {
            id: "5",
            childName: "Omar Ahmed",
            date: "2024-01-11",
            day: "Thursday",
            className: "Arabic Class",
            teacher: "Ustadha Fatima",
            status: "PRESENT",
          },
          {
            id: "6",
            childName: "Aisha Ahmed",
            date: "2024-01-15",
            day: "Monday",
            className: "Fiqh Class",
            teacher: "Ustadh Muhammad",
            status: "PRESENT",
          },
          {
            id: "7",
            childName: "Aisha Ahmed",
            date: "2024-01-14",
            day: "Sunday",
            className: "Arabic Class",
            teacher: "Ustadha Fatima",
            status: "PRESENT",
          },
          {
            id: "8",
            childName: "Aisha Ahmed",
            date: "2024-01-13",
            day: "Saturday",
            className: "Fiqh Class",
            teacher: "Ustadh Muhammad",
            status: "PRESENT",
          },
          {
            id: "9",
            childName: "Aisha Ahmed",
            date: "2024-01-12",
            day: "Friday",
            className: "Islamic History",
            teacher: "Ustadh Ibrahim",
            status: "PRESENT",
          },
          {
            id: "10",
            childName: "Aisha Ahmed",
            date: "2024-01-11",
            day: "Thursday",
            className: "Quran Recitation",
            teacher: "Sheikh Ahmed",
            status: "EXCUSED",
            remarks: "Family event",
          },
        ];

        const mockSummary: AttendanceSummary[] = [
          {
            childName: "Omar Ahmed",
            totalClasses: 20,
            present: 15,
            absent: 3,
            late: 2,
            excused: 0,
            attendanceRate: 85,
            streak: 5,
          },
          {
            childName: "Aisha Ahmed",
            totalClasses: 20,
            present: 18,
            absent: 0,
            late: 0,
            excused: 2,
            attendanceRate: 95,
            streak: 12,
          },
        ];

        setAttendanceRecords(mockRecords);
        setSummary(mockSummary);
      } catch (error) {
        toast.error("Failed to load attendance data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAttendance();
  }, []);

  const filteredRecords = attendanceRecords.filter((record) => {
    const matchesChild =
      selectedChild === "ALL" || record.childName.includes(selectedChild);
    const matchesStatus =
      selectedStatus === "ALL" || record.status === selectedStatus;
    return matchesChild && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PRESENT":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case "ABSENT":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
      case "LATE":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
      case "EXCUSED":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "PRESENT":
        return <CheckCircle className="h-4 w-4" />;
      case "ABSENT":
        return <XCircle className="h-4 w-4" />;
      case "LATE":
        return <Clock className="h-4 w-4" />;
      case "EXCUSED":
        return <AlertCircle className="h-4 w-4" />;
      default:
        return null;
    }
  };

  // Prepare chart data
  const chartData = summary.map((child) => ({
    name: child.childName.split(" ")[0],
    attendance: child.attendanceRate,
  }));

  const statusData = [
    {
      name: "Present",
      value: summary.reduce((sum, s) => sum + s.present, 0),
      color: "#10b981",
    },
    {
      name: "Absent",
      value: summary.reduce((sum, s) => sum + s.absent, 0),
      color: "#ef4444",
    },
    {
      name: "Late",
      value: summary.reduce((sum, s) => sum + s.late, 0),
      color: "#f59e0b",
    },
    {
      name: "Excused",
      value: summary.reduce((sum, s) => sum + s.excused, 0),
      color: "#3b82f6",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Attendance
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Monitor your children&apos;s class attendance and patterns
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" className="gap-2">
            <Printer className="h-4 w-4" />
            Print Report
          </Button>
          <Button className="bg-gradient-primary gap-2">
            <Download className="h-4 w-4" />
            Export Data
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {summary.map((child) => (
          <Card key={child.childName}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {child.childName.split(" ")[0]}
                  </p>
                  <p className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
                    {child.attendanceRate}%
                  </p>
                  <div className="mt-2 flex items-center gap-2">
                    {child.attendanceRate >= 90 ? (
                      <TrendingUp className="h-4 w-4 text-green-600" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-600" />
                    )}
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {child.streak} day streak
                    </span>
                  </div>
                </div>
                <div
                  className={`rounded-lg p-3 ${
                    child.attendanceRate >= 90
                      ? "bg-green-100 dark:bg-green-900/30"
                      : child.attendanceRate >= 80
                      ? "bg-yellow-100 dark:bg-yellow-900/30"
                      : "bg-red-100 dark:bg-red-900/30"
                  }`}
                >
                  <Users
                    className={`h-6 w-6 ${
                      child.attendanceRate >= 90
                        ? "text-green-600 dark:text-green-400"
                        : child.attendanceRate >= 80
                        ? "text-yellow-600 dark:text-yellow-400"
                        : "text-red-600 dark:text-red-400"
                    }`}
                  />
                </div>
              </div>
              <Progress value={child.attendanceRate} className="mt-4" />
            </CardContent>
          </Card>
        ))}

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Total Classes
                </p>
                <p className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
                  {summary.reduce((sum, s) => sum + s.totalClasses, 0)}
                </p>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  This month
                </p>
              </div>
              <div className="rounded-lg bg-purple-100 p-3 dark:bg-purple-900/30">
                <CalendarDays className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Overall Rate
                </p>
                <p className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
                  {summary.length > 0
                    ? Math.round(
                        summary.reduce((sum, s) => sum + s.attendanceRate, 0) /
                          summary.length
                      )
                    : 0}
                  %
                </p>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  Family average
                </p>
              </div>
              <div className="rounded-lg bg-blue-100 p-3 dark:bg-blue-900/30">
                <BarChart3 className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Attendance Rate by Child</CardTitle>
            <CardDescription>
              Comparative attendance performance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="name" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" domain={[0, 100]} />
                  <Tooltip
                    formatter={(value) => [`${value}%`, "Attendance Rate"]}
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #E5E7EB",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar dataKey="attendance" radius={[4, 4, 0, 0]}>
                    {chartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={
                          entry.attendance >= 90
                            ? "#10b981"
                            : entry.attendance >= 80
                            ? "#f59e0b"
                            : "#ef4444"
                        }
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Attendance Distribution</CardTitle>
            <CardDescription>Breakdown by status type</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusData}
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
                    {statusData.map((entry, index) => (
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
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <label className="mb-2 block text-sm font-medium">
                Select Child
              </label>
              <Select value={selectedChild} onValueChange={setSelectedChild}>
                <SelectTrigger>
                  <SelectValue placeholder="All Children" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">All Children</SelectItem>
                  <SelectItem value="Omar">Omar Ahmed</SelectItem>
                  <SelectItem value="Aisha">Aisha Ahmed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium">Month</label>
              <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                <SelectTrigger>
                  <SelectValue placeholder="Current Month" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="CURRENT">Current Month</SelectItem>
                  <SelectItem value="JANUARY">January 2024</SelectItem>
                  <SelectItem value="DECEMBER">December 2023</SelectItem>
                  <SelectItem value="NOVEMBER">November 2023</SelectItem>
                  <SelectItem value="OCTOBER">October 2023</SelectItem>
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
                  <SelectItem value="ALL">All Status</SelectItem>
                  <SelectItem value="PRESENT">Present</SelectItem>
                  <SelectItem value="ABSENT">Absent</SelectItem>
                  <SelectItem value="LATE">Late</SelectItem>
                  <SelectItem value="EXCUSED">Excused</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Attendance Records */}
      <Tabs defaultValue="detailed" className="space-y-6">
        <TabsList>
          <TabsTrigger value="detailed">Detailed View</TabsTrigger>
          <TabsTrigger value="calendar">Calendar View</TabsTrigger>
          <TabsTrigger value="summary">Monthly Summary</TabsTrigger>
        </TabsList>

        <TabsContent value="detailed">
          <Card>
            <CardHeader>
              <CardTitle>Attendance Records</CardTitle>
              <CardDescription>
                {filteredRecords.length} records found
              </CardDescription>
            </CardHeader>
            <CardContent>
              {filteredRecords.length === 0 ? (
                <div className="py-12 text-center">
                  <Calendar className="mx-auto h-12 w-12 text-gray-300" />
                  <p className="mt-4 text-gray-500">
                    No attendance records found
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredRecords.map((record) => (
                    <div
                      key={record.id}
                      className="flex flex-col justify-between rounded-lg border border-gray-200 p-4 dark:border-gray-700 sm:flex-row sm:items-center"
                    >
                      <div className="mb-4 sm:mb-0">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{record.className}</h3>
                          <Badge variant="outline" className="text-xs">
                            {record.childName}
                          </Badge>
                        </div>
                        <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                          <span>{formatDate(record.date)}</span>
                          <span>•</span>
                          <span>{record.day}</span>
                          <span>•</span>
                          <span>Teacher: {record.teacher}</span>
                          {record.arrivalTime && (
                            <>
                              <span>•</span>
                              <span>Arrived: {record.arrivalTime}</span>
                            </>
                          )}
                        </div>
                        {record.remarks && (
                          <p className="mt-2 text-sm text-gray-500">
                            {record.remarks}
                          </p>
                        )}
                      </div>
                      <div className="flex items-center gap-4">
                        <Badge
                          className={`gap-1 ${getStatusColor(record.status)}`}
                        >
                          {getStatusIcon(record.status)}
                          {record.status}
                        </Badge>
                        <Button size="sm" variant="ghost">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Request Attendance Report</Button>
              <Button className="bg-gradient-primary gap-2">
                <Download className="h-4 w-4" />
                Download Records
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Attendance Tips */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
        <CardContent className="p-6">
          <div className="flex items-start">
            <AlertCircle className="mr-3 h-6 w-6 text-blue-600 dark:text-blue-400" />
            <div>
              <h3 className="font-semibold text-blue-900 dark:text-blue-100">
                Attendance Tips
              </h3>
              <ul className="mt-2 space-y-2 text-sm text-blue-800 dark:text-blue-200">
                <li>
                  • Regular attendance improves learning continuity and
                  retention
                </li>
                <li>• Notify teachers in advance for planned absences</li>
                <li>• Review missed class materials with your child</li>
                <li>
                  • Maintain a consistent daily routine for better attendance
                </li>
                <li>• Contact administration for extended leave requests</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
