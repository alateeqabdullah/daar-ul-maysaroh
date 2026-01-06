"use client";

import React, { useState, useMemo } from "react";
import {
  Calendar,
  Clock,
  Plus,
  Trash2,
  Video,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Download,
  Search,
  AlertTriangle,
  CheckCircle2,
  X,
  Filter,
  Info,
  Layers,
  Settings2,
  MoreHorizontal,
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
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

// --- Types & Constants ---

const DAYS = [
  { id: 0, name: "Sunday", short: "Sun" },
  { id: 1, name: "Monday", short: "Mon" },
  { id: 2, name: "Tuesday", short: "Tue" },
  { id: 3, name: "Wednesday", short: "Wed" },
  { id: 4, name: "Thursday", short: "Thu" },
  { id: 5, name: "Friday", short: "Fri" },
  { id: 6, name: "Saturday", short: "Sat" },
];

const TIME_SLOTS = Array.from(
  { length: 15 },
  (_, i) => `${(i + 7).toString().padStart(2, "0")}:00`
);

// --- Logic Helpers ---

const checkOverlap = (
  s1Start: string,
  s1End: string,
  s2Start: string,
  s2End: string
) => {
  return s1Start < s2End && s2Start < s1End;
};

// --- Main Component ---

export default function ScheduleManagementClient({
  initialClasses,
  scheduleByDay: initialSchedules,
}: any) {
  // State
  const [schedules, setSchedules] = useState(initialSchedules);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // New Schedule State
  const [newSchedule, setNewSchedule] = useState({
    classId: "",
    dayOfWeek: new Date().getDay(),
    startTime: "09:00",
    endTime: "10:00",
    isLive: true,
    meetingPlatform: "ZOOM",
    physicalLocation: "",
    isRecurring: true,
  });

  // --- Memoized Values ---

  const weekDates = useMemo(() => {
    const start = new Date(currentDate);
    start.setDate(start.getDate() - start.getDay());
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(start);
      d.setDate(d.getDate() + i);
      return d;
    });
  }, [currentDate]);

  // Conflict Detection Engine
  const conflicts = useMemo(() => {
    const foundConflicts: Record<string, boolean> = {};

    Object.keys(schedules).forEach((dayId) => {
      const daySessions = schedules[dayId] || [];
      daySessions.forEach((s1: any) => {
        daySessions.forEach((s2: any) => {
          if (s1.id === s2.id) return;

          const overlaps = checkOverlap(
            s1.startTime,
            s1.endTime,
            s2.startTime,
            s2.endTime
          );

          // Conflict: Same Location or Same Teacher (if teacherId exists)
          const sameLocation =
            !s1.isLive &&
            !s2.isLive &&
            s1.physicalLocation === s2.physicalLocation;

          if (overlaps && sameLocation) {
            foundConflicts[s1.id] = true;
            foundConflicts[s2.id] = true;
          }
        });
      });
    });
    return foundConflicts;
  }, [schedules]);

  // --- Handlers ---

  const handleCreate = async () => {
    if (!newSchedule.classId) return toast.error("Select a class first");
    setIsLoading(true);
    try {
      const res = await fetch("/api/admin/schedules", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newSchedule),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setSchedules((prev: any) => ({
        ...prev,
        [newSchedule.dayOfWeek]: [
          ...(prev[newSchedule.dayOfWeek] || []),
          data.schedule,
        ],
      }));
      setIsCreateDialogOpen(false);
      toast.success("Schedule successfully created");
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string, day: number) => {
    try {
      const res = await fetch(`/api/admin/schedules/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error();
      setSchedules((prev: any) => ({
        ...prev,
        [day]: prev[day].filter((s: any) => s.id !== id),
      }));
      toast.success("Entry removed");
    } catch {
      toast.error("Failed to delete");
    }
  };

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto p-4">
      {/* 1. Dashboard Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 bg-white dark:bg-slate-900 p-6 rounded-2xl border shadow-sm">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight">
            Academic Scheduler
          </h1>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" /> Conflict
              Detection Active
            </span>
            <span className="flex items-center gap-1">
              <Layers className="h-4 w-4 text-indigo-500" />{" "}
              {Object.values(schedules).flat().length} Total Sessions
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center bg-muted rounded-xl p-1 shadow-inner">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                const d = new Date(currentDate);
                d.setDate(d.getDate() - 7);
                setCurrentDate(d);
              }}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="px-4 text-sm font-bold min-w-[140px] text-center">
              {weekDates[0].toLocaleDateString(undefined, {
                month: "short",
                day: "numeric",
              })}{" "}
              -{" "}
              {weekDates[6].toLocaleDateString(undefined, {
                month: "short",
                day: "numeric",
              })}
            </span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                const d = new Date(currentDate);
                d.setDate(d.getDate() + 7);
                setCurrentDate(d);
              }}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" /> Export
          </Button>
          <Dialog
            open={isCreateDialogOpen}
            onOpenChange={setIsCreateDialogOpen}
          >
            <DialogTrigger asChild>
              <Button className="bg-indigo-600 hover:bg-indigo-700">
                <Plus className="h-4 w-4 mr-2" /> Add Session
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>New Schedule Entry</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Assign Class</Label>
                  <Select
                    onValueChange={(v) =>
                      setNewSchedule({ ...newSchedule, classId: v })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Search class..." />
                    </SelectTrigger>
                    <SelectContent>
                      {initialClasses.map((c: any) => (
                        <SelectItem key={c.id} value={c.id}>
                          {c.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Start</Label>
                    <Input
                      type="time"
                      value={newSchedule.startTime}
                      onChange={(e) =>
                        setNewSchedule({
                          ...newSchedule,
                          startTime: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>End</Label>
                    <Input
                      type="time"
                      value={newSchedule.endTime}
                      onChange={(e) =>
                        setNewSchedule({
                          ...newSchedule,
                          endTime: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-xl bg-muted/30">
                  <div className="text-sm font-medium">
                    Remote/Virtual Class
                  </div>
                  <Switch
                    checked={newSchedule.isLive}
                    onCheckedChange={(v) =>
                      setNewSchedule({ ...newSchedule, isLive: v })
                    }
                  />
                </div>
                {newSchedule.isLive ? (
                  <Input
                    placeholder="Meeting URL (Optional)"
                    onChange={(e) =>
                      setNewSchedule({
                        ...newSchedule,
                        physicalLocation: e.target.value,
                      })
                    }
                  />
                ) : (
                  <Input
                    placeholder="Classroom Number (e.g. Room 101)"
                    onChange={(e) =>
                      setNewSchedule({
                        ...newSchedule,
                        physicalLocation: e.target.value,
                      })
                    }
                  />
                )}
              </div>
              <DialogFooter>
                <Button
                  onClick={handleCreate}
                  disabled={isLoading}
                  className="w-full"
                >
                  {isLoading ? "Processing..." : "Confirm Schedule"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* 2. Grid UI */}
      <div className="bg-card rounded-2xl border shadow-xl overflow-hidden">
        {/* Search Bar Container */}
        <div className="p-4 border-b bg-muted/10 flex items-center gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by class name..."
              className="pl-9 bg-background shadow-none border-none focus-visible:ring-1"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSearchQuery("")}
            className={!searchQuery ? "hidden" : ""}
          >
            Clear
          </Button>
        </div>

        <div className="relative overflow-x-auto">
          <div className="grid grid-cols-8 border-b bg-muted/20">
            <div className="p-4 text-[10px] font-black uppercase text-muted-foreground tracking-widest border-r">
              Timeline
            </div>
            {DAYS.map((day, i) => (
              <div
                key={day.id}
                className={cn(
                  "p-4 text-center border-r last:border-r-0",
                  new Date().getDay() === day.id &&
                    "bg-indigo-50/50 dark:bg-indigo-900/10"
                )}
              >
                <span className="block text-xs font-bold text-muted-foreground uppercase">
                  {day.short}
                </span>
                <span
                  className={cn(
                    "text-xl font-black mt-1 inline-block h-8 w-8 leading-8 rounded-full",
                    new Date().getDate() === weekDates[i].getDate() &&
                      "bg-indigo-600 text-white"
                  )}
                >
                  {weekDates[i].getDate()}
                </span>
              </div>
            ))}
          </div>

          <div className="max-h-[70vh] overflow-y-auto custom-scrollbar">
            {TIME_SLOTS.map((time) => (
              <div
                key={time}
                className="grid grid-cols-8 border-b last:border-b-0 hover:bg-muted/5 transition-colors group/row min-h-[120px]"
              >
                <div className="p-4 text-xs font-mono font-medium text-muted-foreground border-r bg-card sticky left-0 z-10">
                  {time}
                </div>
                {DAYS.map((day) => {
                  const daySessions = (schedules[day.id] || []).filter((s) => {
                    const matchesTime = s.startTime.startsWith(
                      time.split(":")[0]
                    );
                    const matchesSearch = s.class?.name
                      ?.toLowerCase()
                      .includes(searchQuery.toLowerCase());
                    return matchesTime && (searchQuery ? matchesSearch : true);
                  });

                  return (
                    <div
                      key={day.id}
                      className="p-2 border-r last:border-r-0 relative overflow-hidden flex flex-col gap-2"
                    >
                      {daySessions.map((session: any) => {
                        const hasConflict = conflicts[session.id];
                        return (
                          <div
                            key={session.id}
                            className={cn(
                              "group/card relative p-3 rounded-xl border-l-4 shadow-sm transition-all hover:scale-[1.02] cursor-default",
                              session.isLive
                                ? "bg-blue-50/50 border-l-blue-500 border-blue-100"
                                : "bg-emerald-50/50 border-l-emerald-500 border-emerald-100",
                              hasConflict &&
                                "bg-red-50 border-red-200 border-l-red-600 animate-in fade-in zoom-in duration-300"
                            )}
                          >
                            {hasConflict && (
                              <div className="absolute top-1 right-1 flex items-center gap-1 text-[10px] font-bold text-red-600 bg-red-100 px-1.5 py-0.5 rounded-full">
                                <AlertTriangle className="h-3 w-3" /> Conflict
                              </div>
                            )}

                            <div className="flex justify-between items-start mb-2 pr-4">
                              <h4 className="font-bold text-sm leading-tight text-slate-900 dark:text-slate-100">
                                {session.class?.name}
                              </h4>
                              <button
                                onClick={() => handleDelete(session.id, day.id)}
                                className="opacity-0 group-hover/card:opacity-100 p-1 text-slate-400 hover:text-red-500 transition-opacity"
                              >
                                <X className="h-3 w-3" />
                              </button>
                            </div>

                            <div className="space-y-1 text-[10px] font-medium text-muted-foreground">
                              <div className="flex items-center gap-1.5">
                                <Clock className="h-3 w-3 opacity-60" />{" "}
                                {session.startTime} - {session.endTime}
                              </div>
                              <div className="flex items-center gap-1.5">
                                {session.isLive ? (
                                  <Video className="h-3 w-3 text-blue-500" />
                                ) : (
                                  <MapPin className="h-3 w-3 text-emerald-500" />
                                )}
                                <span className="truncate">
                                  {session.isLive
                                    ? session.meetingPlatform
                                    : session.physicalLocation ||
                                      "No Room Assigned"}
                                </span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
