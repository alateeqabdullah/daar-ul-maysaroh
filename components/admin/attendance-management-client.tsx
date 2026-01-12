"use client";

import { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Calendar,
  Save,
  CheckCircle2,
  XCircle,
  Clock,
  Loader2,
  Download,
  MessageSquare,
  AlertCircle,
  UserCheck,
  Check,
  Filter,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { getInitials, cn } from "@/lib/utils";
import { Counter } from "@/components/admin/dashboard-ui";

// --- ANIMATION ---
const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.03 } },
};
const itemVariants = {
  hidden: { y: 10, opacity: 0 },
  show: { y: 0, opacity: 1 },
};

interface AttendanceClientProps {
  classes: any[];
  students: any[];
  attendanceMap: Record<string, any>;
  selectedDate: string;
  selectedClassId: string;
  activeScheduleId: string | null;
  stats: any;
}

export default function AttendanceManagementClient({
  classes,
  students,
  attendanceMap,
  selectedDate,
  selectedClassId,
  activeScheduleId,
  stats,
}: AttendanceClientProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Local State for Optimistic UI
  const [localAttendance, setLocalAttendance] = useState<
    Record<string, { status: string; remarks: string }>
  >({});
  const [hasChanges, setHasChanges] = useState(false);

  // Initialize
  useEffect(() => {
    const initialData: Record<string, { status: string; remarks: string }> = {};
    students.forEach((s) => {
      const record = attendanceMap[s.studentId];
      initialData[s.studentId] = record
        ? { status: record.status, remarks: record.remarks || "" }
        : { status: "UNMARKED", remarks: "" };
    });
    setLocalAttendance(initialData);
    setHasChanges(false);
  }, [students, attendanceMap]);

  // --- FILTERS ---
  const handleClassChange = (value: string) => {
    setIsLoading(true);
    const params = new URLSearchParams();
    params.set("date", selectedDate);
    if (value !== "none") params.set("classId", value);
    router.push(`/admin/attendance?${params.toString()}`);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsLoading(true);
    const params = new URLSearchParams();
    params.set("date", e.target.value);
    if (selectedClassId) params.set("classId", selectedClassId);
    router.push(`/admin/attendance?${params.toString()}`);
  };

  // --- ACTIONS ---
  const markStatus = (studentId: string, status: string) => {
    setLocalAttendance((prev) => ({
      ...prev,
      [studentId]: { ...prev[studentId], status },
    }));
    setHasChanges(true);
  };

  const updateRemarks = (studentId: string, remarks: string) => {
    setLocalAttendance((prev) => ({
      ...prev,
      [studentId]: { ...prev[studentId], remarks },
    }));
    setHasChanges(true);
  };

  const markAll = (status: string) => {
    const newData = { ...localAttendance };
    students.forEach((s) => {
      newData[s.studentId] = { ...newData[s.studentId], status };
    });
    setLocalAttendance(newData);
    setHasChanges(true);
    toast.success(`Marked all ${status.toLowerCase()}`);
  };

  const saveAttendance = async () => {
    if (!selectedClassId || !activeScheduleId)
      return toast.error("No active schedule for this date.");
    setIsLoading(true);
    try {
      const updates = Object.entries(localAttendance)
        .filter(([_, data]) => data.status !== "UNMARKED")
        .map(([studentId, data]) => ({
          studentId,
          status: data.status,
          remarks: data.remarks,
        }));

      const res = await fetch("/api/admin/attendance/mark", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          date: selectedDate,
          classId: selectedClassId,
          scheduleId: activeScheduleId,
          updates,
        }),
      });

      if (!res.ok) throw new Error("Failed");
      toast.success("Attendance saved successfully");
      setHasChanges(false);
      router.refresh();
    } catch (error) {
      toast.error("Error saving attendance");
    } finally {
      setIsLoading(false);
    }
  };

  // --- CALCULATE STATS ---
  const currentStats = useMemo(() => {
    const values = Object.values(localAttendance);
    const total = values.length;
    if (total === 0) return { present: 0, absent: 0, late: 0, rate: 0 };

    const present = values.filter((v) => v.status === "PRESENT").length;
    const absent = values.filter((v) => v.status === "ABSENT").length;
    const late = values.filter((v) => v.status === "LATE").length;

    const rate = Math.round(((present + late) / total) * 100);
    return { present, absent, late, rate };
  }, [localAttendance]);

  const filteredStudents = students.filter(
    (s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.studentCode.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // --- STATS CARDS ---
  const statCards = [
    {
      label: "Attendance Rate",
      value: currentStats.rate + "%",
      icon: UserCheck,
      color: "from-blue-500 to-indigo-500",
      shadow: "shadow-blue-500/20",
    },
    {
      label: "Present",
      value: currentStats.present,
      icon: CheckCircle2,
      color: "from-emerald-500 to-green-500",
      shadow: "shadow-emerald-500/20",
    },
    {
      label: "Absent",
      value: currentStats.absent,
      icon: XCircle,
      color: "from-rose-500 to-red-500",
      shadow: "shadow-rose-500/20",
    },
    {
      label: "Late",
      value: currentStats.late,
      icon: Clock,
      color: "from-amber-400 to-orange-500",
      shadow: "shadow-amber-500/20",
    },
  ];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-8 pb-20"
    >
      {/* 1. HEADER */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
            Attendance
          </h1>
          <p className="text-muted-foreground mt-1">
            {selectedClassId
              ? `Marking for ${new Date(selectedDate).toLocaleDateString(
                  "en-US",
                  { weekday: "long", month: "long", day: "numeric" }
                )}`
              : "Select a class and date to begin"}
          </p>
        </div>

        {/* Floating Save Button */}
        <div className="flex items-center gap-3">
          <AnimatePresence>
            {hasChanges && (
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
              >
                <Button
                  onClick={saveAttendance}
                  disabled={isLoading}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-200 dark:shadow-none transition-all"
                >
                  {isLoading ? (
                    <Loader2 className="animate-spin mr-2 h-4 w-4" />
                  ) : (
                    <Save className="mr-2 h-4 w-4" />
                  )}
                  Save Changes
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" /> Report
          </Button>
        </div>
      </div>

      {/* 2. TOOLBAR (Glassmorphism) */}
      <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-md p-4 rounded-xl border shadow-sm flex flex-col md:flex-row gap-4 items-center">
        <div className="flex-1 flex gap-3 w-full">
          <Input
            type="date"
            value={selectedDate}
            onChange={handleDateChange}
            className="w-full sm:w-48 bg-white dark:bg-slate-950 border-muted"
          />
          <Select value={selectedClassId} onValueChange={handleClassChange}>
            <SelectTrigger className="w-full sm:w-64 bg-white dark:bg-slate-950 border-muted">
              <SelectValue placeholder="Select Class" />
            </SelectTrigger>
            <SelectContent>
              {classes.map((c) => (
                <SelectItem key={c.id} value={c.id}>
                  {c.name} ({c.code})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {selectedClassId && students.length > 0 && (
          <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto">
            <div className="h-8 w-px bg-slate-200 dark:bg-slate-800 mx-2" />
            <Button
              size="sm"
              variant="outline"
              className="border-emerald-200 text-emerald-700 hover:bg-emerald-50"
              onClick={() => markAll("PRESENT")}
            >
              All Present
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="border-rose-200 text-rose-700 hover:bg-rose-50"
              onClick={() => markAll("ABSENT")}
            >
              All Absent
            </Button>
            <div className="relative w-full md:w-48 ml-2">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 h-9 bg-white dark:bg-slate-950"
              />
            </div>
          </div>
        )}
      </div>

      {/* 3. STATS CARDS */}
      {selectedClassId && (
        <motion.div
          variants={containerVariants}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {statCards.map((stat) => (
            <motion.div key={stat.label} variants={itemVariants}>
              <Card className="border-none shadow-sm bg-white/50 backdrop-blur-sm dark:bg-slate-900/50 hover:shadow-md transition-all relative overflow-hidden">
                <div
                  className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${stat.color} opacity-10 rounded-bl-full`}
                />
                <CardContent className="p-6 relative z-10 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase">
                      {stat.label}
                    </p>
                    <div className="text-2xl font-bold mt-2">
                      <Counter value={stat.value} />
                    </div>
                  </div>
                  <div
                    className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} text-white ${stat.shadow} shadow-lg`}
                  >
                    <stat.icon className="h-6 w-6" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* 4. STUDENT LIST */}
      {!selectedClassId ? (
        <motion.div
          variants={itemVariants}
          className="text-center py-24 bg-muted/20 rounded-3xl border border-dashed border-slate-200 dark:border-slate-800"
        >
          <Calendar className="h-16 w-16 mx-auto text-slate-300 mb-4" />
          <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-300">
            No Class Selected
          </h3>
          <p className="text-slate-500">
            Choose a class and date above to start tracking attendance.
          </p>
        </motion.div>
      ) : !activeScheduleId ? (
        <motion.div
          variants={itemVariants}
          className="p-12 text-center bg-amber-50 dark:bg-amber-900/10 border border-amber-100 rounded-3xl"
        >
          <AlertCircle className="h-12 w-12 mx-auto text-amber-500 mb-3" />
          <h3 className="text-lg font-semibold text-amber-800">
            No Class Scheduled
          </h3>
          <p className="text-amber-600">
            There is no scheduled session for this class on{" "}
            {new Date(selectedDate).toLocaleDateString("en-US", {
              weekday: "long",
            })}
            .
          </p>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 gap-3">
          <div className="hidden md:grid grid-cols-12 px-6 py-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
            <div className="col-span-4">Student</div>
            <div className="col-span-4 text-center">Status</div>
            <div className="col-span-4 text-right">Remarks</div>
          </div>

          <AnimatePresence>
            {filteredStudents.map((s) => {
              const data = localAttendance[s.studentId] || {
                status: "UNMARKED",
                remarks: "",
              };

              return (
                <motion.div
                  key={s.studentId}
                  layoutId={s.studentId}
                  variants={itemVariants}
                  className={cn(
                    "group relative flex flex-col md:grid md:grid-cols-12 items-center p-4 rounded-xl border transition-all duration-200",
                    data.status === "PRESENT"
                      ? "bg-white border-green-200 shadow-sm shadow-green-50 dark:bg-slate-900 dark:border-green-900"
                      : data.status === "ABSENT"
                      ? "bg-rose-50/30 border-rose-200 dark:bg-rose-900/10 dark:border-rose-900"
                      : data.status === "LATE"
                      ? "bg-amber-50/30 border-amber-200 dark:bg-amber-900/10 dark:border-amber-900"
                      : "bg-slate-50 border-transparent opacity-80 hover:opacity-100 dark:bg-slate-800"
                  )}
                >
                  {/* Name & Avatar */}
                  <div className="col-span-4 w-full flex items-center gap-4">
                    <div
                      className={cn(
                        "p-0.5 rounded-full border-2 transition-colors",
                        data.status === "PRESENT"
                          ? "border-green-500"
                          : data.status === "ABSENT"
                          ? "border-rose-500"
                          : data.status === "LATE"
                          ? "border-amber-500"
                          : "border-transparent"
                      )}
                    >
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={s.image} />
                        <AvatarFallback className="bg-slate-200 text-slate-600 font-bold">
                          {getInitials(s.name)}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white">
                        {s.name}
                      </p>
                      <p className="text-xs text-slate-500 font-mono">
                        {s.studentCode}
                      </p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="col-span-4 w-full flex justify-center gap-2 my-3 md:my-0">
                    <button
                      onClick={() => markStatus(s.studentId, "PRESENT")}
                      className={cn(
                        "flex-1 md:flex-none h-10 px-4 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 border",
                        data.status === "PRESENT"
                          ? "bg-green-100 border-green-500 text-green-700 dark:bg-green-900/40 dark:text-green-300"
                          : "bg-white border-slate-200 text-slate-400 hover:text-slate-600 dark:bg-slate-950 dark:border-slate-800"
                      )}
                    >
                      <CheckCircle2 className="h-4 w-4" /> Present
                    </button>

                    <button
                      onClick={() => markStatus(s.studentId, "ABSENT")}
                      className={cn(
                        "flex-1 md:flex-none h-10 px-4 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 border",
                        data.status === "ABSENT"
                          ? "bg-rose-100 border-rose-500 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300"
                          : "bg-white border-slate-200 text-slate-400 hover:text-slate-600 dark:bg-slate-950 dark:border-slate-800"
                      )}
                    >
                      <XCircle className="h-4 w-4" /> Absent
                    </button>

                    <button
                      onClick={() => markStatus(s.studentId, "LATE")}
                      className={cn(
                        "flex-1 md:flex-none h-10 px-4 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 border",
                        data.status === "LATE"
                          ? "bg-amber-100 border-amber-500 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300"
                          : "bg-white border-slate-200 text-slate-400 hover:text-slate-600 dark:bg-slate-950 dark:border-slate-800"
                      )}
                    >
                      <Clock className="h-4 w-4" /> Late
                    </button>
                  </div>

                  {/* Remarks Popover */}
                  <div className="col-span-4 md:col-span-4 w-full flex justify-end">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className={cn(
                            "gap-2 h-9 w-full md:w-auto justify-end",
                            data.remarks
                              ? "text-indigo-600"
                              : "text-slate-400 hover:text-slate-600"
                          )}
                        >
                          {data.remarks && (
                            <span className="text-xs italic truncate max-w-[150px] mr-2">
                              "{data.remarks}"
                            </span>
                          )}
                          <MessageSquare className="h-4 w-4" />
                          <span className="text-xs">
                            {data.remarks ? "Edit" : "Note"}
                          </span>
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-80 p-4" align="end">
                        <div className="space-y-2">
                          <h4 className="font-medium text-sm">Add Remark</h4>
                          <Textarea
                            placeholder="Reason for absence or lateness..."
                            className="min-h-[100px] resize-none text-sm"
                            value={data.remarks || ""}
                            onChange={(e) =>
                              updateRemarks(s.studentId, e.target.value)
                            }
                          />
                          <p className="text-xs text-slate-400 text-right">
                            Auto-saves on 'Save Changes'
                          </p>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}
    </motion.div>
  );
}
