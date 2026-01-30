"use client";

import { useState, useMemo, useTransition, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Plus,
  MoreVertical,
  Edit,
  Trash2,
  Calendar,
  Clock,
  Video,
  MapPin,
  Loader2,
  X,
  Globe,
  Repeat,
  Users,
  ChevronRight,
  Sparkles,
  Hash,
  Lock,
  CheckCircle2,
  AlertCircle,
  CalendarDays,
} from "lucide-react";

// UI Components
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

// Actions
import { manageSchedule } from "@/app/actions/admin/schedule/actions";

export default function ScheduleManagementClient({
  initialSchedules,
  classes,
  filters,
}: any) {
  const [isPending, startTransition] = useTransition();
  const [schedules, setSchedules] = useState(initialSchedules);

  // State for Instant Updates
  const [selectedDay, setSelectedDay] = useState(
    filters.day?.toString() || new Date().getDay().toString(),
  );
  const [searchQuery, setSearchQuery] = useState("");

  // Modal Management
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    classId: "",
    dayOfWeek: 1,
    startTime: "09:00",
    endTime: "10:00",
    isLive: true,
    meetingUrl: "",
    meetingPlatform: "ZOOM",
    meetingId: "",
    meetingPassword: "",
    timezone: "UTC",
    isRecurring: true,
  });

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  // THE FIX: Instant Filter Logic
  const filteredSchedules = useMemo(() => {
    return schedules
      .filter((s: any) => s.dayOfWeek.toString() === selectedDay.toString())
      .filter(
        (s: any) =>
          s.class.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.class.teacher.user.name
            .toLowerCase()
            .includes(searchQuery.toLowerCase()),
      )
      .sort((a: any, b: any) => a.startTime.localeCompare(b.startTime));
  }, [schedules, selectedDay, searchQuery]);

  const handleSave = async () => {
    if (!formData.classId)
      return toast.error("Please assign an academic class");

    startTransition(async () => {
      try {
        const res = await manageSchedule({ ...formData, id: editingId });
        if (res.success) {
          setSchedules((prev: any) =>
            editingId
              ? prev.map((s: any) => (s.id === editingId ? res.schedule : s))
              : [...prev, res.schedule],
          );
          toast.success(editingId ? "Node Updated" : "Session Deployed", {
            icon: <CheckCircle2 className="text-emerald-500" />,
          });
          setIsModalOpen(false);
        }
      } catch (e: any) {
        toast.error(e.message);
      }
    });
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 md:space-y-10 pb-32 md:pb-20 px-4 md:px-0 mt-4 md:mt-8">
      {/* --- ELITE HEADER --- */}
      <div className="relative overflow-hidden bg-slate-900 rounded-[2rem] md:rounded-[3rem] p-8 md:p-12 text-white shadow-2xl border border-white/5">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-emerald-500/10 to-transparent pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-indigo-600/20 blur-[100px] pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-[10px] font-black tracking-widest uppercase">
              <Sparkles className="h-3 w-3 text-emerald-400" />
              <span>System Orchestrator</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter leading-none">
              Master <span className="text-emerald-400">Timetable</span>
            </h1>
            <p className="text-slate-400 max-w-md font-medium text-base md:text-lg hidden md:block">
              Real-time synchronization of academic sessions and global
              instructor nodes.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <div className="relative group w-full md:w-64">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
              <Input
                placeholder="Search..."
                className="pl-12 h-14 bg-white/5 border-white/10 rounded-2xl text-white focus:ring-emerald-500/30 transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button
              onClick={() => {
                setEditingId(null);
                setIsModalOpen(true);
              }}
              className="h-14 px-8 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-black shadow-[0_0_20px_rgba(16,185,129,0.2)] transition-all hover:scale-105"
            >
              <Plus className="h-5 w-5 mr-2" /> New Entry
            </Button>
          </div>
        </div>
      </div>

      {/* --- BENTO STATS (Mobile Responsive) --- */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
        <StatCard
          label="Active Load"
          value={schedules.length}
          color="indigo"
          icon={Calendar}
        />
        <StatCard
          label="Virtual Nodes"
          value={schedules.filter((s: any) => s.isLive).length}
          color="emerald"
          icon={Video}
        />
        <StatCard label="Capacity" value="84%" color="amber" icon={Users} />
        <StatCard
          label="Day"
          value={days[parseInt(selectedDay)]}
          color="blue"
          icon={Globe}
          isText
        />
      </div>

      {/* --- DAY SELECTOR --- */}
      <div className="sticky top-4 z-30 flex justify-center">
        <div className="inline-flex p-1.5 bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-xl overflow-x-auto no-scrollbar max-w-full">
          {days.map((day, i) => (
            <button
              key={day}
              onClick={() => setSelectedDay(i.toString())}
              className={`px-5 md:px-7 py-3 rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest transition-all duration-300 whitespace-nowrap ${
                selectedDay === i.toString()
                  ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-xl scale-105"
                  : "text-slate-400 hover:text-indigo-600"
              }`}
            >
              {day.substring(0, 3)}
            </button>
          ))}
        </div>
      </div>

      {/* --- FEED GRID --- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8">
        <AnimatePresence mode="popLayout" initial={false}>
          {filteredSchedules.length === 0 ? (
            <motion.div
              key="empty"
              className="lg:col-span-2 py-20 text-center opacity-40"
            >
              <CalendarDays className="h-16 w-16 mx-auto mb-4" />
              <p className="font-black uppercase tracking-widest text-xs">
                No Nodes Scheduled
              </p>
            </motion.div>
          ) : (
            filteredSchedules.map((s: any) => (
              <motion.div
                key={s.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              >
                <Card className="group relative overflow-hidden rounded-[2.5rem] border-0 bg-white dark:bg-slate-900 shadow-xl shadow-slate-200/50 dark:shadow-none transition-all hover:shadow-2xl">
                  <div
                    className={`absolute top-0 left-0 w-2 h-full ${s.isLive ? "bg-indigo-500" : "bg-emerald-500"}`}
                  />
                  <CardContent className="p-0 flex flex-col md:flex-row">
                    {/* Time Module */}
                    <div className="md:w-36 bg-slate-50 dark:bg-slate-800/50 p-6 md:p-8 flex md:flex-col items-center justify-between md:justify-center border-b md:border-b-0 md:border-r border-slate-100 dark:border-slate-800">
                      <div className="text-center">
                        <span className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white leading-none">
                          {s.startTime}
                        </span>
                        <div className="hidden md:block w-8 h-1 bg-indigo-500/20 rounded-full mx-auto my-2" />
                        <span className="text-xs md:text-sm font-bold text-slate-400">
                          {s.endTime}
                        </span>
                      </div>
                      <Badge
                        variant="ghost"
                        className="md:mt-4 text-[9px] font-black text-indigo-500 uppercase"
                      >
                        {s.timezone}
                      </Badge>
                    </div>

                    {/* Content Module */}
                    <div className="flex-1 p-6 md:p-8 space-y-6">
                      <div className="flex justify-between items-start">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-black uppercase text-indigo-500 tracking-widest bg-indigo-50 px-2 py-0.5 rounded">
                              {s.class.code}
                            </span>
                            {s.isRecurring && (
                              <Repeat className="h-3 w-3 text-slate-300" />
                            )}
                          </div>
                          <h3 className="text-2xl font-black text-slate-900 dark:text-white leading-tight tracking-tight">
                            {s.class.name}
                          </h3>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="rounded-full hover:bg-slate-100"
                            >
                              <MoreVertical className="h-5 w-5 text-slate-400" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent
                            align="end"
                            className="rounded-2xl p-2 border-slate-100"
                          >
                            <DropdownMenuItem
                              onClick={() => openEdit(s)}
                              className="rounded-xl py-3 font-bold"
                            >
                              <Edit className="h-4 w-4 mr-2" /> Modify Entry
                            </DropdownMenuItem>
                            <DropdownMenuItem className="rounded-xl py-3 font-bold text-red-500">
                              <Trash2 className="h-4 w-4 mr-2" /> Delete Entry
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>

                      <div className="flex items-center gap-6">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10 md:h-12 md:w-12 ring-4 ring-slate-100 dark:ring-slate-800">
                            <AvatarImage src={s.class.teacher.user.image} />
                            <AvatarFallback className="font-black">
                              {s.class.teacher.user.name[0]}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex flex-col">
                            <span className="text-xs font-black text-slate-900 dark:text-white">
                              {s.class.teacher.user.name}
                            </span>
                            <span className="text-[9px] font-bold text-slate-400 uppercase">
                              Instructor
                            </span>
                          </div>
                        </div>
                        <div className="flex-1 hidden sm:block">
                          <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">
                            <span>Fill Rate</span>
                            <span className="text-indigo-500">
                              {s.class.currentEnrollment}/{s.class.capacity}
                            </span>
                          </div>
                          <Progress
                            value={
                              (s.class.currentEnrollment / s.class.capacity) *
                              100
                            }
                            className="h-1.5 bg-slate-100 dark:bg-slate-800"
                          />
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-slate-50 dark:border-slate-800">
                        <div
                          className={`flex items-center gap-2 text-[10px] font-black uppercase ${s.isLive ? "text-indigo-600" : "text-emerald-600"}`}
                        >
                          {s.isLive ? (
                            <Video className="h-3.5 w-3.5" />
                          ) : (
                            <MapPin className="h-3.5 w-3.5" />
                          )}
                          {s.isLive
                            ? `Live Sync (${s.meetingPlatform})`
                            : "Physical Node"}
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 px-4 rounded-full bg-slate-50 dark:bg-slate-800 font-bold text-[9px] uppercase hover:bg-slate-100"
                        >
                          Inspect <ChevronRight className="h-3 w-3 ml-1" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>

      {/* --- SESSION CONFIG MODAL (ELITE REDESIGN) --- */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-950/60 backdrop-blur-xl"
              onClick={() => setIsModalOpen(false)}
            />

            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 30 }}
              className="relative bg-white dark:bg-slate-900 w-full max-w-2xl rounded-[3rem] shadow-2xl border border-white/10 overflow-hidden"
            >
              {/* Header */}
              <div className="bg-slate-900 dark:bg-slate-800 p-8 text-white flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-black">
                    Session <span className="text-emerald-400">Config</span>
                  </h2>
                  <p className="text-slate-400 text-[10px] uppercase font-bold tracking-widest mt-1">
                    Manual Node Override
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-full h-12 w-12 hover:bg-white/10 text-white"
                >
                  <X />
                </Button>
              </div>

              <div className="p-8 md:p-12 space-y-8 max-h-[75vh] overflow-y-auto no-scrollbar">
                {/* Section 1: Identity */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-[10px] font-black uppercase text-emerald-600 tracking-tighter">
                    <span className="w-4 h-4 rounded-full bg-emerald-100 flex items-center justify-center">
                      1
                    </span>
                    Assignment
                  </div>
                  <Select
                    value={formData.classId}
                    onValueChange={(v) =>
                      setFormData({ ...formData, classId: v })
                    }
                  >
                    <SelectTrigger className="h-16 rounded-2xl border-slate-100 bg-slate-50/50 dark:bg-slate-800/50 text-base font-bold shadow-none">
                      <SelectValue placeholder="Identify Target Academic Class..." />
                    </SelectTrigger>
                    <SelectContent className="rounded-2xl">
                      {classes.map((c: any) => (
                        <SelectItem
                          key={c.id}
                          value={c.id}
                          className="py-4 font-bold border-b last:border-0"
                        >
                          {c.name} — {c.code}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Section 2: Temporal Parameters */}
                <div className="space-y-4 pt-4 border-t border-slate-50 dark:border-slate-800">
                  <div className="flex items-center gap-2 text-[10px] font-black uppercase text-emerald-600 tracking-tighter">
                    <span className="w-4 h-4 rounded-full bg-emerald-100 flex items-center justify-center">
                      2
                    </span>
                    Temporal Control
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase text-slate-400 ml-2">
                        Day of Week
                      </Label>
                      <Select
                        value={formData.dayOfWeek.toString()}
                        onValueChange={(v) =>
                          setFormData({ ...formData, dayOfWeek: parseInt(v) })
                        }
                      >
                        <SelectTrigger className="h-14 rounded-2xl border-slate-100">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl">
                          {days.map((d, i) => (
                            <SelectItem
                              key={i}
                              value={i.toString()}
                              className="font-bold"
                            >
                              {d}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase text-slate-400 ml-2">
                        Timezone
                      </Label>
                      <Input
                        value={formData.timezone}
                        onChange={(e) =>
                          setFormData({ ...formData, timezone: e.target.value })
                        }
                        className="h-14 rounded-2xl border-slate-100 bg-slate-50/30"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase text-slate-400 ml-2">
                        Start Time
                      </Label>
                      <Input
                        type="time"
                        className="h-16 rounded-2xl border-slate-100 bg-slate-50 font-black text-2xl px-6"
                        value={formData.startTime}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            startTime: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase text-slate-400 ml-2">
                        End Time
                      </Label>
                      <Input
                        type="time"
                        className="h-16 rounded-2xl border-slate-100 bg-slate-50 font-black text-2xl px-6"
                        value={formData.endTime}
                        onChange={(e) =>
                          setFormData({ ...formData, endTime: e.target.value })
                        }
                      />
                    </div>
                  </div>
                </div>

                {/* Section 3: Connectivity */}
                <div className="space-y-4 pt-4 border-t border-slate-50 dark:border-slate-800">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-[10px] font-black uppercase text-emerald-600 tracking-tighter">
                      <span className="w-4 h-4 rounded-full bg-emerald-100 flex items-center justify-center">
                        3
                      </span>
                      Transmission
                    </div>
                    <div className="flex items-center gap-3 bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-full">
                      <span className="text-[9px] font-black uppercase text-slate-500">
                        Live Virtual Session
                      </span>
                      <Switch
                        checked={formData.isLive}
                        onCheckedChange={(v) =>
                          setFormData({ ...formData, isLive: v })
                        }
                      />
                    </div>
                  </div>

                  <AnimatePresence mode="wait">
                    {formData.isLive ? (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="space-y-4 overflow-hidden pt-2"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label className="text-[10px] font-bold text-slate-400 ml-2">
                              Platform Provider
                            </Label>
                            <Select
                              value={formData.meetingPlatform}
                              onValueChange={(v) =>
                                setFormData({ ...formData, meetingPlatform: v })
                              }
                            >
                              <SelectTrigger className="h-14 rounded-2xl border-slate-100">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent className="rounded-xl">
                                <SelectItem value="ZOOM">Zoom Video</SelectItem>
                                <SelectItem value="GOOGLE_MEET">
                                  Google Meet
                                </SelectItem>
                                <SelectItem value="MICROSOFT_TEAMS">
                                  Teams
                                </SelectItem>
                                <SelectItem value="OTHER">
                                  Other/Custom
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label className="text-[10px] font-bold text-slate-400 ml-2">
                              Meeting ID
                            </Label>
                            <Input
                              value={formData.meetingId}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  meetingId: e.target.value,
                                })
                              }
                              placeholder="982 000 0000"
                              className="h-14 rounded-2xl border-slate-100"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-[10px] font-bold text-slate-400 ml-2">
                            Direct Meeting URL
                          </Label>
                          <Input
                            value={formData.meetingUrl}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                meetingUrl: e.target.value,
                              })
                            }
                            placeholder="https://zoom.us/j/..."
                            className="h-14 rounded-2xl border-slate-100"
                          />
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="p-6 bg-emerald-50 dark:bg-emerald-900/10 rounded-2xl border border-emerald-100 dark:border-emerald-900/20"
                      >
                        <div className="flex gap-4">
                          <MapPin className="h-6 w-6 text-emerald-500" />
                          <div>
                            <p className="text-sm font-black text-slate-900 dark:text-white leading-none">
                              Physical Classroom Logic
                            </p>
                            <p className="text-xs text-slate-500 mt-1">
                              This session will be marked as On-Campus. No
                              meeting links will be generated.
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <Button
                  className="w-full h-20 rounded-[2rem] bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xl shadow-2xl shadow-indigo-500/30 transition-all hover:scale-[1.01] active:scale-95 disabled:opacity-50"
                  onClick={handleSave}
                  disabled={isPending}
                >
                  {isPending ? (
                    <Loader2 className="animate-spin" />
                  ) : editingId ? (
                    "Update Timetable Node"
                  ) : (
                    "Initialize Session Entry"
                  )}
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );

  function openEdit(s: any) {
    setEditingId(s.id);
    setFormData({
      classId: s.classId,
      dayOfWeek: s.dayOfWeek,
      startTime: s.startTime,
      endTime: s.endTime,
      isLive: s.isLive,
      meetingUrl: s.meetingUrl || "",
      meetingPlatform: s.meetingPlatform,
      meetingId: s.meetingId || "",
      meetingPassword: s.meetingPassword || "",
      timezone: s.timezone,
      isRecurring: s.isRecurring,
    });
    setIsModalOpen(true);
  }
}

// Sub-Component for Bento Stats
function StatCard({ label, value, icon: Icon, color, isText }: any) {
  const themes: any = {
    indigo: "text-indigo-600 bg-indigo-50 shadow-indigo-200/50",
    emerald: "text-emerald-600 bg-emerald-50 shadow-emerald-200/50",
    amber: "text-amber-600 bg-amber-50 shadow-amber-200/50",
    blue: "text-blue-600 bg-blue-50 shadow-blue-200/50",
  };
  return (
    <Card className="border-0 shadow-sm bg-white dark:bg-slate-900 rounded-[2rem] p-4 md:p-6 flex items-center gap-4 transition-all hover:shadow-md">
      <div className={`p-3 rounded-2xl ${themes[color]}`}>
        <Icon className="h-5 w-5 md:h-6 md:w-6" />
      </div>
      <div className="min-w-0">
        <p className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none truncate">
          {label}
        </p>
        <p className="text-base md:text-xl font-black text-slate-900 dark:text-white leading-none mt-1 truncate">
          {value}
        </p>
      </div>
    </Card>
  );
}

// "use client";

// import { useState, useMemo, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   Search,
//   Plus,
//   MoreVertical,
//   Edit,
//   Trash2,
//   Calendar,
//   Download,
//   Clock,
//   Video,
//   MapPin,
//   MonitorPlay,
//   Loader2,
//   X,
//   BookOpen,
// } from "lucide-react";
// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Badge } from "@/components/ui/badge";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Label } from "@/components/ui/label";
// import { toast } from "sonner";
// import { getInitials } from "@/lib/utils";
// import { Counter } from "@/components/admin/dashboard-ui";

// // --- ANIMATION ---
// const containerVariants = {
//   hidden: { opacity: 0 },
//   show: { opacity: 1, transition: { staggerChildren: 0.05 } },
// };
// const itemVariants = {
//   hidden: { y: 20, opacity: 0 },
//   show: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 50 } },
// };

// interface Props {
//   initialSchedules: any[];
//   classes: any[];
//   teachers: any[];
//   stats: any; // Server stats (used as fallback/initial)
//   filters: any; // URL params
// }

// export default function ScheduleManagementClient({
//   initialSchedules,
//   classes,
//   teachers,
//   filters,
// }: Props) {
//   const router = useRouter();
//   const [schedules, setSchedules] = useState(initialSchedules);
//   const [isLoading, setIsLoading] = useState(false);

//   // 1. Initialize State from URL Filters
//   const [selectedDay, setSelectedDay] = useState(() => {
//     // If URL has a specific day, use it. Otherwise use Today.
//     if (filters?.day && filters.day !== "all") return filters.day;
//     return new Date().getDay().toString();
//   });

//   const [searchQuery, setSearchQuery] = useState(filters?.search || "");

//   // Modals
//   const [isAddModalOpen, setIsAddModalOpen] = useState(false);
//   const [selectedSchedule, setSelectedSchedule] = useState<any>(null);
//   const [isEditing, setIsEditing] = useState(false);

//   // Form
//   const [formData, setFormData] = useState({
//     classId: "",
//     dayOfWeek: "0",
//     startTime: "09:00",
//     endTime: "10:00",
//     isOnline: true,
//     meetingUrl: "",
//     meetingPlatform: "ZOOM",
//   });

//   // --- DYNAMIC STATS CALCULATION ---
//   // Calculates stats on the fly so they update when you add/delete items
//   const dynamicStats = useMemo(() => {
//     const totalSessions = schedules.length;
//     const onlineSessions = schedules.filter((s) => s.isOnline).length;
//     const uniqueClasses = new Set(schedules.map((s) => s.classId)).size;

//     // Calculate Busiest Day
//     const dayCounts = [0, 0, 0, 0, 0, 0, 0];
//     schedules.forEach((s) => dayCounts[s.dayOfWeek]++);
//     const maxSessions = Math.max(...dayCounts);
//     const busiestDayIndex = dayCounts.indexOf(maxSessions);
//     const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

//     return {
//       totalSessions,
//       onlineSessions,
//       uniqueClasses,
//       busiestDay: days[busiestDayIndex],
//     };
//   }, [schedules]);

//   // --- FILTERING ---
//   const days = [
//     "Sunday",
//     "Monday",
//     "Tuesday",
//     "Wednesday",
//     "Thursday",
//     "Friday",
//     "Saturday",
//   ];

//   const filteredSchedules = useMemo(() => {
//     return schedules.filter((s) => {
//       const matchesDay = s.dayOfWeek.toString() === selectedDay;
//       const matchesSearch =
//         s.class.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         s.class.teacher.user.name
//           .toLowerCase()
//           .includes(searchQuery.toLowerCase());
//       return matchesDay && matchesSearch;
//     });
//   }, [schedules, selectedDay, searchQuery]);

//   // --- ACTIONS ---
//   const handleCreateOrUpdate = async () => {
//     if (!formData.classId || !formData.startTime || !formData.endTime) {
//       return toast.error("Class and Time are required");
//     }
//     setIsLoading(true);

//     try {
//       const res = await fetch("/api/admin/schedule/manage", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           action: isEditing ? "UPDATE" : "CREATE",
//           scheduleId: selectedSchedule?.id,
//           data: formData,
//         }),
//       });

//       const result = await res.json();
//       if (!res.ok) throw new Error(result.error);

//       if (isEditing) {
//         setSchedules((prev) =>
//           prev.map((s) =>
//             s.id === selectedSchedule.id ? { ...s, ...result.schedule } : s
//           )
//         );
//         toast.success("Schedule updated");
//       } else {
//         setSchedules([...schedules, result.schedule]);
//         toast.success("Session added");
//       }
//       setIsAddModalOpen(false);
//       resetForm();
//     } catch (error: any) {
//       toast.error(error.message || "Failed");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleDelete = async (scheduleId: string) => {
//     if (!confirm("Delete this session?")) return;
//     const previousSchedules = [...schedules];
//     setSchedules((prev) => prev.filter((s) => s.id !== scheduleId));

//     try {
//       const res = await fetch("/api/admin/schedule/manage", {
//         method: "POST",
//         body: JSON.stringify({ action: "DELETE", scheduleId }),
//       });
//       if (!res.ok) throw new Error();
//       toast.success("Session removed");
//     } catch {
//       setSchedules(previousSchedules); // Revert
//       toast.error("Delete failed");
//     }
//   };

//   const handleDayChange = (index: string) => {
//     setSelectedDay(index);
//     // Optional: Update URL without refreshing page for bookmarking
//     const params = new URLSearchParams(window.location.search);
//     params.set("day", index);
//     router.replace(`?${params.toString()}`, { scroll: false });
//   };

//   // --- HELPERS ---
//   const resetForm = () => {
//     setFormData({
//       classId: "",
//       dayOfWeek: selectedDay,
//       startTime: "09:00",
//       endTime: "10:00",
//       isOnline: true,
//       meetingUrl: "",
//       meetingPlatform: "ZOOM",
//     });
//     setIsEditing(false);
//   };

//   const openEdit = (s: any) => {
//     setSelectedSchedule(s);
//     setFormData({
//       classId: s.classId,
//       dayOfWeek: s.dayOfWeek.toString(),
//       startTime: s.startTime,
//       endTime: s.endTime,
//       isOnline: s.isOnline,
//       meetingUrl: s.meetingUrl || "",
//       meetingPlatform: s.meetingPlatform || "ZOOM",
//     });
//     setIsEditing(true);
//     setIsAddModalOpen(true);
//   };

//   const formatTime = (time: string) => {
//     const [h, m] = time.split(":");
//     const hour = parseInt(h);
//     const ampm = hour >= 12 ? "PM" : "AM";
//     const hour12 = hour % 12 || 12;
//     return `${hour12}:${m} ${ampm}`;
//   };

//   const statCards = [
//     {
//       label: "Total Sessions",
//       value: dynamicStats.totalSessions,
//       icon: Calendar,
//       color: "from-blue-500 to-cyan-500",
//       shadow: "shadow-blue-500/20",
//     },
//     {
//       label: "Online",
//       value: dynamicStats.onlineSessions,
//       icon: Video,
//       color: "from-purple-500 to-pink-500",
//       shadow: "shadow-purple-500/20",
//     },
//     {
//       label: "Active Classes",
//       value: dynamicStats.uniqueClasses,
//       icon: BookOpen,
//       color: "from-emerald-500 to-green-500",
//       shadow: "shadow-emerald-500/20",
//     },
//     {
//       label: "Busiest Day",
//       value: dynamicStats.busiestDay,
//       icon: Clock,
//       color: "from-amber-400 to-orange-500",
//       shadow: "shadow-amber-500/20",
//       isText: true,
//     },
//   ];

//   return (
//     <motion.div
//       variants={containerVariants}
//       initial="hidden"
//       animate="show"
//       className="space-y-8 pb-10"
//     >
//       {/* HEADER */}
//       <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
//         <div>
//           <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
//             Schedule
//           </h1>
//           <p className="text-muted-foreground mt-1">
//             Manage weekly timetables and sessions
//           </p>
//         </div>
//         <div className="flex gap-2">
//           <Button variant="outline">
//             <Download className="h-4 w-4 mr-2" /> Export
//           </Button>
//           <Button
//             className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md hover:scale-105 transition-all"
//             onClick={() => {
//               resetForm();
//               setIsAddModalOpen(true);
//             }}
//           >
//             <Plus className="h-4 w-4 mr-2" /> Add Session
//           </Button>
//         </div>
//       </div>

//       {/* STATS */}
//       <motion.div
//         variants={containerVariants}
//         className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
//       >
//         {statCards.map((stat) => (
//           <motion.div key={stat.label} variants={itemVariants}>
//             <Card className="border-none shadow-sm bg-white/50 backdrop-blur-sm dark:bg-slate-900/50 hover:shadow-md transition-all relative overflow-hidden">
//               <div
//                 className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${stat.color} opacity-10 rounded-bl-full`}
//               />
//               <CardContent className="p-6 relative z-10 flex items-center justify-between">
//                 <div>
//                   <p className="text-xs font-semibold text-muted-foreground uppercase">
//                     {stat.label}
//                   </p>
//                   <div className="text-2xl font-bold mt-2">
//                     {stat.isText ? stat.value : <Counter value={stat.value} />}
//                   </div>
//                 </div>
//                 <div
//                   className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} text-white ${stat.shadow} shadow-lg`}
//                 >
//                   <stat.icon className="h-6 w-6" />
//                 </div>
//               </CardContent>
//             </Card>
//           </motion.div>
//         ))}
//       </motion.div>

//       {/* TABS & SEARCH */}
//       <div className="space-y-4">
//         <div className="flex items-center gap-4 bg-white/60 dark:bg-slate-900/60 backdrop-blur-md p-2 rounded-xl border shadow-sm overflow-x-auto">
//           {days.map((day, index) => (
//             <button
//               key={day}
//               onClick={() => handleDayChange(index.toString())}
//               className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
//                 selectedDay === index.toString()
//                   ? "bg-white dark:bg-slate-800 text-purple-600 shadow-sm"
//                   : "text-muted-foreground hover:bg-white/50"
//               }`}
//             >
//               {day}
//             </button>
//           ))}
//         </div>

//         <div className="relative">
//           <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//           <Input
//             placeholder="Search classes or teachers..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="pl-9 bg-white/50 dark:bg-slate-900/50 border-0 shadow-sm"
//           />
//         </div>
//       </div>

//       {/* SCHEDULE GRID */}
//       <motion.div variants={containerVariants} className="space-y-4">
//         {filteredSchedules.length === 0 ? (
//           <div className="text-center py-20 bg-muted/20 rounded-xl border border-dashed">
//             <Calendar className="h-10 w-10 mx-auto mb-3 opacity-20" />
//             <p className="text-muted-foreground">
//               No sessions scheduled for {days[parseInt(selectedDay)]}.
//             </p>
//           </div>
//         ) : (
//           <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
//             {filteredSchedules.map((s) => (
//               <motion.div key={s.id} variants={itemVariants} layoutId={s.id}>
//                 <Card className="group h-full border hover:border-purple-300 dark:hover:border-purple-800 transition-all hover:shadow-lg bg-card">
//                   <CardContent className="p-5 flex flex-col h-full">
//                     {/* Time Header */}
//                     <div className="flex justify-between items-start mb-4">
//                       <div className="flex items-center gap-2 text-sm font-bold text-purple-600 bg-purple-50 dark:bg-purple-900/20 px-3 py-1 rounded-full">
//                         <Clock className="h-3.5 w-3.5" />
//                         {formatTime(s.startTime)} - {formatTime(s.endTime)}
//                       </div>
//                       <DropdownMenu>
//                         <DropdownMenuTrigger asChild>
//                           <Button
//                             size="icon"
//                             variant="ghost"
//                             className="h-8 w-8 -mr-2"
//                           >
//                             <MoreVertical className="h-4 w-4" />
//                           </Button>
//                         </DropdownMenuTrigger>
//                         <DropdownMenuContent align="end">
//                           <DropdownMenuItem onClick={() => openEdit(s)}>
//                             <Edit className="mr-2 h-4 w-4" /> Edit
//                           </DropdownMenuItem>
//                           <DropdownMenuItem
//                             onClick={() => handleDelete(s.id)}
//                             className="text-red-600"
//                           >
//                             <Trash2 className="mr-2 h-4 w-4" /> Delete
//                           </DropdownMenuItem>
//                         </DropdownMenuContent>
//                       </DropdownMenu>
//                     </div>

//                     {/* Class Info */}
//                     <h3 className="font-bold text-lg mb-1">{s.class.name}</h3>
//                     <p className="text-xs text-muted-foreground font-mono mb-4">
//                       {s.class.code}
//                     </p>

//                     {/* Meta */}
//                     <div className="space-y-2 mb-4">
//                       <div className="flex items-center gap-2 text-sm text-muted-foreground">
//                         <Avatar className="h-6 w-6">
//                           <AvatarImage src={s.class.teacher.user.image} />
//                           <AvatarFallback>T</AvatarFallback>
//                         </Avatar>
//                         <span>{s.class.teacher.user.name}</span>
//                       </div>
//                       <div className="flex items-center gap-2 text-sm">
//                         {s.isOnline ? (
//                           <span className="flex items-center gap-2 text-blue-600 bg-blue-50 px-2 py-1 rounded text-xs font-medium">
//                             <Video className="h-3 w-3" /> Online
//                           </span>
//                         ) : (
//                           <span className="flex items-center gap-2 text-amber-600 bg-amber-50 px-2 py-1 rounded text-xs font-medium">
//                             <MapPin className="h-3 w-3" /> On Campus
//                           </span>
//                         )}
//                       </div>
//                     </div>

//                     {/* Action */}
//                     {s.meetingUrl && (
//                       <Button
//                         variant="outline"
//                         size="sm"
//                         className="w-full mt-auto gap-2"
//                         onClick={() => window.open(s.meetingUrl, "_blank")}
//                       >
//                         <MonitorPlay className="h-3.5 w-3.5" /> Join Meeting
//                       </Button>
//                     )}
//                   </CardContent>
//                 </Card>
//               </motion.div>
//             ))}
//           </div>
//         )}
//       </motion.div>

//       {/* --- ADD/EDIT MODAL --- */}
//       <AnimatePresence>
//         {isAddModalOpen && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
//           >
//             <motion.div
//               initial={{ scale: 0.95 }}
//               animate={{ scale: 1 }}
//               exit={{ scale: 0.95 }}
//               className="bg-background w-full max-w-lg rounded-2xl shadow-2xl border p-6"
//             >
//               <div className="flex justify-between items-center mb-6">
//                 <h2 className="text-xl font-bold">
//                   {isEditing ? "Edit Session" : "Add Session"}
//                 </h2>
//                 <Button
//                   size="icon"
//                   variant="ghost"
//                   onClick={() => setIsAddModalOpen(false)}
//                 >
//                   <X className="h-5 w-5" />
//                 </Button>
//               </div>
//               <div className="grid gap-4">
//                 <div className="space-y-1">
//                   <Label>Class</Label>
//                   <Select
//                     value={formData.classId}
//                     onValueChange={(v) =>
//                       setFormData({ ...formData, classId: v })
//                     }
//                   >
//                     <SelectTrigger>
//                       <SelectValue placeholder="Select Class" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       {classes.map((c) => (
//                         <SelectItem key={c.id} value={c.id}>
//                           {c.name} ({c.code})
//                         </SelectItem>
//                       ))}
//                     </SelectContent>
//                   </Select>
//                 </div>

//                 <div className="grid grid-cols-2 gap-4">
//                   <div className="space-y-1">
//                     <Label>Day</Label>
//                     <Select
//                       value={formData.dayOfWeek}
//                       onValueChange={(v) =>
//                         setFormData({ ...formData, dayOfWeek: v })
//                       }
//                     >
//                       <SelectTrigger>
//                         <SelectValue />
//                       </SelectTrigger>
//                       <SelectContent>
//                         {days.map((d, i) => (
//                           <SelectItem key={i} value={i.toString()}>
//                             {d}
//                           </SelectItem>
//                         ))}
//                       </SelectContent>
//                     </Select>
//                   </div>
//                   <div className="space-y-1">
//                     <Label>Platform</Label>
//                     <Select
//                       value={formData.meetingPlatform}
//                       onValueChange={(v) =>
//                         setFormData({ ...formData, meetingPlatform: v })
//                       }
//                     >
//                       <SelectTrigger>
//                         <SelectValue />
//                       </SelectTrigger>
//                       <SelectContent>
//                         <SelectItem value="ZOOM">Zoom</SelectItem>
//                         <SelectItem value="GOOGLE_MEET">Google Meet</SelectItem>
//                         <SelectItem value="OTHER">Physical</SelectItem>
//                       </SelectContent>
//                     </Select>
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-2 gap-4">
//                   <div className="space-y-1">
//                     <Label>Start Time</Label>
//                     <Input
//                       type="time"
//                       value={formData.startTime}
//                       onChange={(e) =>
//                         setFormData({ ...formData, startTime: e.target.value })
//                       }
//                     />
//                   </div>
//                   <div className="space-y-1">
//                     <Label>End Time</Label>
//                     <Input
//                       type="time"
//                       value={formData.endTime}
//                       onChange={(e) =>
//                         setFormData({ ...formData, endTime: e.target.value })
//                       }
//                     />
//                   </div>
//                 </div>

//                 <div className="space-y-1">
//                   <Label>Meeting URL (Optional)</Label>
//                   <Input
//                     value={formData.meetingUrl}
//                     onChange={(e) =>
//                       setFormData({ ...formData, meetingUrl: e.target.value })
//                     }
//                     placeholder="https://zoom.us/..."
//                   />
//                 </div>

//                 <Button
//                   className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 text-white"
//                   onClick={handleCreateOrUpdate}
//                   disabled={isLoading}
//                 >
//                   {isLoading ? (
//                     <Loader2 className="animate-spin mr-2" />
//                   ) : isEditing ? (
//                     "Save Changes"
//                   ) : (
//                     "Add Session"
//                   )}
//                 </Button>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </motion.div>
//   );
// }
