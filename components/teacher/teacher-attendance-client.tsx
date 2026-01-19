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
  Filter,
  Check,
  User,
  ChevronRight,
  UserCheck,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
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
  show: { opacity: 1, transition: { staggerChildren: 0.05 } },
};
const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1 },
};

interface Props {
  classes: any[];
  students: any[];
  initialAttendance: Record<string, any>;
  selectedDate: string;
  selectedClassId: string;
  scheduleId: string | null;
  sessionDetails: any;
}

export default function TeacherAttendanceClient({
  classes,
  students,
  initialAttendance,
  selectedDate,
  selectedClassId,
  scheduleId,
  sessionDetails,
}: Props) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Local State for Optimistic UI
  const [attendance, setAttendance] = useState<
    Record<string, { status: string; remarks: string }>
  >({});
  const [hasChanges, setHasChanges] = useState(false);

  // Initialize
  useEffect(() => {
    const data: any = {};
    students.forEach((s) => {
      data[s.studentId] = initialAttendance[s.studentId] || {
        status: "UNMARKED",
        remarks: "",
      };
    });
    setAttendance(data);
    setHasChanges(false);
  }, [students, initialAttendance]);

  // --- ACTIONS ---

  const handleNav = (key: string, val: string) => {
    const params = new URLSearchParams(window.location.search);
    params.set(key, val);
    router.push(`?${params.toString()}`);
  };

  const markStatus = (studentId: string, status: string) => {
    setAttendance((prev) => ({
      ...prev,
      [studentId]: { ...prev[studentId], status },
    }));
    setHasChanges(true);
  };

  const updateRemarks = (studentId: string, remarks: string) => {
    setAttendance((prev) => ({
      ...prev,
      [studentId]: { ...prev[studentId], remarks },
    }));
    setHasChanges(true);
  };

  const markAll = (status: string) => {
    const newData = { ...attendance };
    students.forEach((s) => {
      newData[s.studentId] = { ...newData[s.studentId], status };
    });
    setAttendance(newData);
    setHasChanges(true);
    toast.success(`Marked all ${status.toLowerCase()}`);
  };

  const handleSave = async () => {
    if (!scheduleId)
      return toast.error(
        "Cannot save: No active class session found for this date."
      );

    setIsLoading(true);
    try {
      const records = Object.entries(attendance)
        .filter(([_, val]) => val.status !== "UNMARKED")
        .map(([studentId, val]) => ({
          studentId,
          status: val.status,
          remarks: val.remarks,
        }));

      const res = await fetch("/api/teacher/attendance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          classId: selectedClassId,
          date: selectedDate,
          scheduleId,
          records,
        }),
      });

      if (!res.ok) throw new Error("Failed");

      toast.success("Attendance Saved Successfully");
      setHasChanges(false);
      router.refresh();
    } catch (e) {
      toast.error("Save failed");
    } finally {
      setIsLoading(false);
    }
  };

  // --- STATS CALCULATION ---
  const stats = useMemo(() => {
    const vals = Object.values(attendance);
    const total = vals.length;
    if (total === 0) return { present: 0, absent: 0, late: 0, rate: 0 };

    const present = vals.filter((v) => v.status === "PRESENT").length;
    const absent = vals.filter((v) => v.status === "ABSENT").length;
    const late = vals.filter((v) => v.status === "LATE").length;

    const rate = Math.round(((present + late) / total) * 100);
    return { present, absent, late, rate };
  }, [attendance]);

  const filteredStudents = students.filter((s) =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Status Button Sub-component
  const StatusButton = ({ id, type, icon: Icon, color, label }: any) => {
    const isActive = attendance[id]?.status === type;
    const colors: any = {
      PRESENT:
        "bg-emerald-500 text-white border-emerald-600 shadow-md shadow-emerald-200",
      ABSENT:
        "bg-rose-500 text-white border-rose-600 shadow-md shadow-rose-200",
      LATE: "bg-amber-500 text-white border-amber-600 shadow-md shadow-amber-200",
    };

    return (
      <button
        onClick={() => markStatus(id, type)}
        className={cn(
          "flex-1 flex flex-col items-center justify-center py-2 rounded-lg text-xs font-medium transition-all duration-200 border",
          isActive
            ? colors[type]
            : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-500 hover:bg-slate-50 hover:border-slate-300"
        )}
      >
        <Icon
          className={cn(
            "h-4 w-4 mb-1",
            isActive ? "text-white" : "text-slate-400"
          )}
        />
        {label}
      </button>
    );
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-6 pb-32"
    >
      {/* 1. HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Attendance
          </h1>
          <div className="flex items-center gap-2 mt-1 text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>
              {new Date(selectedDate).toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
            </span>
            {sessionDetails && (
              <>
                <span>•</span>
                <span className="text-indigo-600 font-medium">
                  {sessionDetails.startTime} - {sessionDetails.endTime}
                </span>
              </>
            )}
          </div>
        </div>

        {/* Date & Class Selectors */}
        <div className="flex gap-2">
          <Input
            type="date"
            value={selectedDate}
            onChange={(e) => handleNav("date", e.target.value)}
            className="w-40 bg-white dark:bg-slate-900"
          />
          <Select
            value={selectedClassId}
            onValueChange={(v) => handleNav("classId", v)}
          >
            <SelectTrigger className="w-[200px] bg-white dark:bg-slate-900">
              <SelectValue placeholder="Select Class" />
            </SelectTrigger>
            <SelectContent>
              {classes.map((c: any) => (
                <SelectItem key={c.id} value={c.id}>
                  {c.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* 2. STATS BAR */}
      {selectedClassId && students.length > 0 && (
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          <Card className="bg-indigo-50 dark:bg-indigo-900/10 border-indigo-100 dark:border-indigo-900/30">
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-indigo-500 uppercase">
                  Rate
                </p>
                <p className="text-2xl font-bold text-indigo-700 dark:text-indigo-300">
                  <Counter value={stats.rate} />%
                </p>
              </div>
              <div className="h-10 w-10 bg-indigo-100 dark:bg-indigo-900/40 rounded-full flex items-center justify-center text-indigo-600">
                <CheckCircle2 className="h-5 w-5" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-emerald-50 dark:bg-emerald-900/10 border-emerald-100 dark:border-emerald-900/30">
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-emerald-600 uppercase">
                  Present
                </p>
                <p className="text-2xl font-bold text-emerald-800 dark:text-emerald-300">
                  <Counter value={stats.present} />
                </p>
              </div>
              <div className="h-10 w-10 bg-emerald-100 dark:bg-emerald-900/40 rounded-full flex items-center justify-center text-emerald-600">
                <UserCheck className="h-5 w-5" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-rose-50 dark:bg-rose-900/10 border-rose-100 dark:border-rose-900/30">
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-rose-600 uppercase">
                  Absent
                </p>
                <p className="text-2xl font-bold text-rose-800 dark:text-rose-300">
                  <Counter value={stats.absent} />
                </p>
              </div>
              <div className="h-10 w-10 bg-rose-100 dark:bg-rose-900/40 rounded-full flex items-center justify-center text-rose-600">
                <XCircle className="h-5 w-5" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-amber-50 dark:bg-amber-900/10 border-amber-100 dark:border-amber-900/30">
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-amber-600 uppercase">
                  Late
                </p>
                <p className="text-2xl font-bold text-amber-800 dark:text-amber-300">
                  <Counter value={stats.late} />
                </p>
              </div>
              <div className="h-10 w-10 bg-amber-100 dark:bg-amber-900/40 rounded-full flex items-center justify-center text-amber-600">
                <Clock className="h-5 w-5" />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* 3. QUICK ACTIONS */}
      {selectedClassId && students.length > 0 && (
        <div className="flex flex-col sm:flex-row gap-3 bg-white/60 dark:bg-slate-900/60 backdrop-blur-md p-3 rounded-xl border shadow-sm">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Search students..."
              className="pl-9 bg-white dark:bg-slate-950 border-slate-200"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              className="border-emerald-200 text-emerald-700 bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-900/20"
              onClick={() => markAll("PRESENT")}
            >
              All Present
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="border-rose-200 text-rose-700 bg-rose-50 hover:bg-rose-100 dark:bg-rose-900/20"
              onClick={() => markAll("ABSENT")}
            >
              All Absent
            </Button>
          </div>
        </div>
      )}

      {/* 4. STUDENT GRID */}
      {!selectedClassId ? (
        <div className="text-center py-20 bg-muted/20 rounded-3xl border border-dashed">
          <Calendar className="h-16 w-16 mx-auto text-slate-300 mb-4" />
          <h3 className="text-lg font-semibold text-slate-600">
            Select a Class
          </h3>
        </div>
      ) : !scheduleId ? (
        <div className="p-12 text-center bg-amber-50 rounded-3xl border border-amber-100">
          <AlertCircle className="h-12 w-12 mx-auto text-amber-400 mb-4" />
          <h3 className="text-lg font-bold text-amber-800">
            No Session Scheduled
          </h3>
          <p className="text-amber-600 mt-1">
            There is no class scheduled for{" "}
            {new Date(selectedDate).toLocaleDateString("en-US", {
              weekday: "long",
            })}
            .
          </p>
        </div>
      ) : (
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"
        >
          {filteredStudents.map((s) => {
            const data = attendance[s.studentId] || {
              status: "UNMARKED",
              remarks: "",
            };
            return (
              <motion.div
                key={s.studentId}
                variants={itemVariants}
                layoutId={s.studentId}
              >
                <Card
                  className={cn(
                    "group transition-all duration-300 hover:shadow-lg border-l-4",
                    data.status === "PRESENT"
                      ? "border-l-emerald-500 bg-emerald-50/10"
                      : data.status === "ABSENT"
                      ? "border-l-rose-500 bg-rose-50/10"
                      : data.status === "LATE"
                      ? "border-l-amber-500 bg-amber-50/10"
                      : "border-l-slate-200 dark:border-l-slate-800"
                  )}
                >
                  <CardContent className="p-5">
                    <div className="flex items-start gap-4 mb-4">
                      <div
                        className={cn(
                          "p-0.5 rounded-full border-2 transition-colors",
                          data.status === "PRESENT"
                            ? "border-emerald-500"
                            : data.status === "ABSENT"
                            ? "border-rose-500"
                            : data.status === "LATE"
                            ? "border-amber-500"
                            : "border-slate-100"
                        )}
                      >
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={s.image} />
                          <AvatarFallback>{getInitials(s.name)}</AvatarFallback>
                        </Avatar>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-slate-900 dark:text-white truncate">
                          {s.name}
                        </h4>
                        <p className="text-xs text-slate-500 font-mono mt-0.5">
                          {s.studentCode}
                        </p>
                        {data.remarks && (
                          <div className="flex items-center gap-1 mt-2 text-xs text-indigo-600 bg-indigo-50 px-2 py-1 rounded w-fit max-w-full">
                            <MessageSquare className="h-3 w-3 flex-shrink-0" />
                            <span className="truncate">{data.remarks}</span>
                          </div>
                        )}
                      </div>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-8 w-8 text-slate-300 hover:text-indigo-600"
                          >
                            <MessageSquare className="h-4 w-4" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-64 p-3" align="end">
                          <p className="text-xs font-bold text-slate-500 uppercase mb-2">
                            Remarks
                          </p>
                          <Textarea
                            placeholder="Reason for absence..."
                            className="min-h-[80px] text-sm resize-none"
                            value={data.remarks}
                            onChange={(e) =>
                              updateRemarks(s.studentId, e.target.value)
                            }
                          />
                        </PopoverContent>
                      </Popover>
                    </div>

                    <div className="flex gap-2">
                      <StatusButton
                        id={s.studentId}
                        type="PRESENT"
                        label="Present"
                        icon={CheckCircle2}
                      />
                      <StatusButton
                        id={s.studentId}
                        type="ABSENT"
                        label="Absent"
                        icon={XCircle}
                      />
                      <StatusButton
                        id={s.studentId}
                        type="LATE"
                        label="Late"
                        icon={Clock}
                      />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      )}

      {/* FLOATING SAVE BAR */}
      <AnimatePresence>
        {hasChanges && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-8 left-0 right-0 mx-auto w-full max-w-md px-4 z-50"
          >
            <div className="bg-slate-900/90 backdrop-blur-md text-white p-2 pl-6 pr-2 rounded-full shadow-2xl flex justify-between items-center border border-slate-700">
              <span className="text-sm font-medium">
                You have unsaved changes
              </span>
              <Button
                size="sm"
                onClick={handleSave}
                disabled={isLoading}
                className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-full px-6 h-9"
              >
                {isLoading ? (
                  <Loader2 className="animate-spin h-4 w-4" />
                ) : (
                  "Save Now"
                )}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
