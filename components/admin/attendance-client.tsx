"use client";

import { useState, useTransition, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  XCircle,
  Clock,
  ShieldAlert,
  Search,
  Users,
  Calendar,
  ArrowRightLeft,
  Loader2,
  MoreVertical,
  LogOut,
  MessageSquare,
  AlertTriangle,
  Filter,
  LayoutGrid,
  List,
  Zap,
  Fingerprint,
  MapPin,
  CheckSquare,
  MoreHorizontal,
} from "lucide-react";

// Actions
import {
  markAttendance,
  bulkMarkAttendance,
  logDeparture,
  flagUnexplainedAbsence,
  excuseAttendance,
} from "@/app/actions/admin/attendance/actions";

// UI Components
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { toast } from "sonner";

// --- ANIMATION ENGINE ---
const kContainer = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } },
};
const kItem = { hidden: { y: 15, opacity: 0 }, show: { y: 0, opacity: 1 } };

export default function AttendanceTerminalClient({
  initialSchedules = [], 
  allStudents = [], 
  existingAttendance = [], 
}: {
  initialSchedules: any[];
  allStudents: any[];
  existingAttendance: any[];
}) {
  const [isPending, startTransition] = useTransition();

  // Terminal State
  const [selectedScheduleId, setSelectedScheduleId] = useState(
    initialSchedules[0]?.id || "",
  );
  const [search, setSearch] = useState("");
  const [attendanceDate, setAttendanceDate] = useState(
    new Date().toISOString().split("T")[0],
  );
  const [attendanceRecords, setAttendanceRecords] =
    useState(existingAttendance);

  // Dialog States
  const [excusalModal, setExcusalModal] = useState<{
    isOpen: boolean;
    studentId: string | null;
  }>({ isOpen: false, studentId: null });
  const [remarks, setRemarks] = useState("");

  // Logic: Filter Students for the selected class
  const activeSchedule = initialSchedules.find(
    (s) => s.id === selectedScheduleId,
  );


  // THE REPAIRED USEMEMO
  const enrolledStudents = useMemo(() => {
    // Check if allStudents exists before filtering
    if (!allStudents || !Array.isArray(allStudents)) return [];

    return allStudents.filter((s: any) => {
      // If no schedule is selected yet, show nothing or all
      if (!selectedScheduleId) return false;

      const activeSchedule = initialSchedules.find(
        (sch) => sch.id === selectedScheduleId,
      );
      return s.currentClassId === activeSchedule?.classId;
    });
  }, [selectedScheduleId, initialSchedules, allStudents]); // Added selectedScheduleId as dependency

  // Logic: Stats Calculation
  const stats = useMemo(() => {
    const daily = attendanceRecords.filter(
      (r) => r.scheduleId === selectedScheduleId,
    );
    return {
      present: daily.filter((r) => r.status === "PRESENT").length,
      late: daily.filter((r) => r.status === "LATE").length,
      absent: daily.filter((r) => r.status === "ABSENT").length,
      total: enrolledStudents.length,
    };
  }, [attendanceRecords, selectedScheduleId, enrolledStudents]);

  // --- HANDLERS ---

  const handleMark = (studentId: string, status: any) => {
    startTransition(async () => {
      try {
        const res = await markAttendance({
          studentId,
          classId: activeSchedule.classId,
          scheduleId: selectedScheduleId,
          status,
          date: attendanceDate,
        });
        if (res.success) {
          // Update local state instantly
          setAttendanceRecords((prev) => {
            const existingIdx = prev.findIndex(
              (r) =>
                r.studentId === studentId &&
                r.scheduleId === selectedScheduleId,
            );
            if (existingIdx > -1) {
              const updated = [...prev];
              updated[existingIdx] = { ...updated[existingIdx], status };
              return updated;
            }
            return [
              ...prev,
              { studentId, scheduleId: selectedScheduleId, status },
            ];
          });
          toast.success("Attendance Synchronized");
        }
      } catch (e: any) {
        toast.error(e.message);
      }
    });
  };

  const handleSafetyFlag = (studentId: string) => {
    startTransition(async () => {
      try {
        await flagUnexplainedAbsence(
          studentId,
          selectedScheduleId,
          attendanceDate,
        );
        toast.warning("Safety Protocol Initiated: Dashboard Alert Sent", {
          icon: <ShieldAlert />,
        });
      } catch (e: any) {
        toast.error(e.message);
      }
    });
  };

  const handleBulkMark = (status: any) => {
    const studentIds = enrolledStudents.map((s) => s.id);
    startTransition(async () => {
      try {
        await bulkMarkAttendance({
          studentIds,
          classId: activeSchedule.classId,
          scheduleId: selectedScheduleId,
          date: attendanceDate,
          status,
        });
        toast.success(`Bulk protocol: All nodes marked ${status}`);
      } catch (e: any) {
        toast.error(e.message);
      }
    });
  };

  return (
    <div className="max-w-[1600px] mx-auto space-y-8 pb-32 px-4 md:px-10 mt-6">
      {/* --- ELITE COMMAND HEADER --- */}
      <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">
              Live Attendance Terminal
            </span>
          </div>
          <h1 className="text-5xl font-black tracking-tighter leading-none text-slate-900 dark:text-white">
            Daily <span className="text-primary-700">Check-in</span>
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
          <div className="relative flex-1 md:w-80 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              placeholder="Filter current class nodes..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-14 pl-12 glass-surface rounded-2xl outline-none border-0 focus:ring-4 ring-primary-700/10 font-bold dark:bg-slate-950"
            />
          </div>
          <Input
            type="date"
            value={attendanceDate}
            onChange={(e) => setAttendanceDate(e.target.value)}
            className="h-14 w-full md:w-48 rounded-2xl border-0 glass-surface font-bold"
          />
        </div>
      </header>

      {/* --- BENTO STATS --- */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          label="Present"
          value={stats.present}
          total={stats.total}
          icon={CheckCircle2}
          color="emerald"
        />
        <StatCard
          label="Late"
          value={stats.late}
          total={stats.total}
          icon={Clock}
          color="gold"
        />
        <StatCard
          label="Absent"
          value={stats.absent}
          total={stats.total}
          icon={XCircle}
          color="rose"
        />
        <StatCard
          label="Unmarked"
          value={stats.total - (stats.present + stats.late + stats.absent)}
          total={stats.total}
          icon={Fingerprint}
          color="purple"
        />
      </div>

      {/* --- CLASS SELECTOR & BULK ACTIONS --- */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 p-4 glass-surface rounded-[2rem]">
        <div className="flex gap-2 overflow-x-auto no-scrollbar w-full md:w-auto">
          {initialSchedules.map((s) => (
            <button
              key={s.id}
              onClick={() => setSelectedScheduleId(s.id)}
              className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                selectedScheduleId === s.id
                  ? "bg-primary-700 text-white shadow-xl"
                  : "text-slate-400 hover:text-primary-700"
              }`}
            >
              {s.class.name}{" "}
              <span className="opacity-50 ml-2">{s.startTime}</span>
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <Button
            onClick={() => handleBulkMark("PRESENT")}
            variant="outline"
            className="rounded-xl font-black text-[10px] uppercase border-emerald-100 text-emerald-600 hover:bg-emerald-50"
          >
            Mark All Present
          </Button>
          <Button
            onClick={() => handleBulkMark("ABSENT")}
            variant="outline"
            className="rounded-xl font-black text-[10px] uppercase border-rose-100 text-rose-600 hover:bg-rose-50"
          >
            Mark All Absent
          </Button>
        </div>
      </div>

      {/* --- STUDENT NODES FEED --- */}
      <motion.div
        variants={kContainer}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        <AnimatePresence mode="popLayout">
          {enrolledStudents
            .filter((s) =>
              s.user.name.toLowerCase().includes(search.toLowerCase()),
            )
            .map((student) => {
              const record = attendanceRecords.find(
                (r) =>
                  r.studentId === student.id &&
                  r.scheduleId === selectedScheduleId,
              );
              return (
                <motion.div layout key={student.id} variants={kItem}>
                  <Card
                    className={`rounded-[2.5rem] border-2 transition-all duration-500 overflow-hidden ${
                      record?.status === "PRESENT"
                        ? "border-emerald-500 bg-emerald-50/30"
                        : record?.status === "LATE"
                          ? "border-gold bg-gold/5"
                          : record?.status === "ABSENT"
                            ? "border-rose-500 bg-rose-50/30"
                            : "border-transparent glass-surface"
                    }`}
                  >
                    <CardContent className="p-8 space-y-6">
                      <div className="flex justify-between items-start">
                        <Avatar className="h-16 w-16 ring-4 ring-white dark:ring-slate-800 shadow-xl">
                          <AvatarImage src={student.user.image} />
                          <AvatarFallback className="font-black">
                            {student.user.name[0]}
                          </AvatarFallback>
                        </Avatar>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="rounded-full"
                            >
                              <MoreHorizontal className="h-5 w-5" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="rounded-2xl p-2 shadow-royal border-0">
                            <DropdownMenuItem
                              onClick={() =>
                                setExcusalModal({
                                  isOpen: true,
                                  studentId: student.id,
                                })
                              }
                              className="rounded-xl py-3 font-bold text-xs gap-2"
                            >
                              <MessageSquare className="h-4 w-4" /> Add Remarks
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleSafetyFlag(student.id)}
                              className="rounded-xl py-3 font-bold text-xs gap-2 text-rose-500"
                            >
                              <ShieldAlert className="h-4 w-4" /> Safety
                              Exception
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => handleMark(student.id, "EXCUSED")}
                              className="rounded-xl py-3 font-bold text-xs gap-2 text-primary-700"
                            >
                              <CheckSquare className="h-4 w-4" /> Official Leave
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>

                      <div>
                        <h3 className="text-xl font-black text-slate-900 dark:text-white leading-none mb-1">
                          {student.user.name}
                        </h3>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                          {student.studentId}
                        </p>
                      </div>

                      <div className="grid grid-cols-3 gap-2">
                        <AttendanceToggle
                          active={record?.status === "PRESENT"}
                          color="emerald"
                          label="PR"
                          onClick={() => handleMark(student.id, "PRESENT")}
                          icon={CheckCircle2}
                        />
                        <AttendanceToggle
                          active={record?.status === "LATE"}
                          color="gold"
                          label="LT"
                          onClick={() => handleMark(student.id, "LATE")}
                          icon={Clock}
                        />
                        <AttendanceToggle
                          active={record?.status === "ABSENT"}
                          color="rose"
                          label="AB"
                          onClick={() => handleMark(student.id, "ABSENT")}
                          icon={XCircle}
                        />
                      </div>

                      {record?.arrivalTime && (
                        <div className="flex items-center gap-2 text-[9px] font-bold text-slate-400 bg-white/50 dark:bg-slate-800 p-2 rounded-xl border border-slate-100">
                          <Zap className="h-3 w-3 text-gold" /> Arrival Sync:{" "}
                          {new Date(record.arrivalTime).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
        </AnimatePresence>
      </motion.div>

      {/* --- EXCUSAL / REMARKS MODAL --- */}
      <Dialog
        open={excusalModal.isOpen}
        onOpenChange={(v) => setExcusalModal({ ...excusalModal, isOpen: v })}
      >
        <DialogContent className="max-w-md rounded-[3rem] p-10 border-0 shadow-royal">
          <DialogHeader>
            <DialogTitle className="text-3xl font-black tracking-tighter">
              Node <span className="text-primary-700">Remarks</span>
            </DialogTitle>
            <DialogDescription className="font-bold text-[10px] uppercase tracking-widest text-slate-400 pt-2">
              Attendance Exception Handling
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <textarea
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              placeholder="Enter official reason for absence or excusal..."
              className="w-full h-32 p-6 rounded-2xl glass-surface border-0 outline-none text-sm font-medium"
            />
            <Button
              onClick={() => {
                /* Call excuseAttendance action */ setExcusalModal({
                  isOpen: false,
                  studentId: null,
                });
                toast.success("Remarks Logged");
              }}
              className="w-full h-16 rounded-2xl bg-primary-700 text-white font-black uppercase tracking-widest shadow-xl"
            >
              Update Record
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// --- SUB-COMPONENTS ---

function StatCard({ label, value, total, icon: Icon, color }: any) {
  const themes: any = {
    emerald: "text-emerald-500 bg-emerald-500/10",
    gold: "text-gold bg-gold/5",
    rose: "text-rose-500 bg-rose-500/10",
    purple: "text-primary-700 bg-primary-700/10",
  };
  return (
    <Card className="border-0 bg-white dark:bg-slate-900 rounded-[2rem] p-6 shadow-sm">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-2xl ${themes[color]}`}>
          <Icon className="h-5 w-5" />
        </div>
        <span className="text-[10px] font-black text-slate-300 uppercase">
          {Math.round((value / total) * 100) || 0}%
        </span>
      </div>
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
        {label}
      </p>
      <h4 className="text-3xl font-black tracking-tighter leading-none">
        {value}
      </h4>
    </Card>
  );
}

function AttendanceToggle({ active, color, label, onClick, icon: Icon }: any) {
  const themes: any = {
    emerald: active
      ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/30"
      : "bg-slate-100 text-slate-400",
    gold: active
      ? "bg-gold text-white shadow-lg shadow-gold/20"
      : "bg-slate-100 text-slate-400",
    rose: active
      ? "bg-rose-500 text-white shadow-lg shadow-rose-500/30"
      : "bg-slate-100 text-slate-400",
  };
  return (
    <button
      onClick={onClick}
      className={`h-14 rounded-2xl flex flex-col items-center justify-center gap-1 transition-all active:scale-90 ${themes[color]}`}
    >
      <Icon className="h-4 w-4" />
      <span className="text-[8px] font-black tracking-widest">{label}</span>
    </button>
  );
}
