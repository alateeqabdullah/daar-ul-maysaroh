"use client";

import { useState, useMemo } from "react";
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
  MonitorPlay,
  Loader2,
  X,
  ShieldCheck,
  Globe,
  Repeat,
  Users,
  Hash,
  Lock,
  AlertTriangle,
} from "lucide-react";
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
import { manageSchedule } from "@/app/actions/admin/schedule/actions";

export default function ScheduleManagementClient({
  initialSchedules,
  classes,
  filters,
}: any) {
  const [schedules, setSchedules] = useState(initialSchedules);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDay, setSelectedDay] = useState(filters.day);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // FULL SCHEMA STATE
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
    recurrenceRule: "Weekly",
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

  const filteredSchedules = useMemo(() => {
    return schedules.filter(
      (s: any) =>
        s.dayOfWeek.toString() === selectedDay &&
        (s.class.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.class.teacher.user.name
            .toLowerCase()
            .includes(searchQuery.toLowerCase())),
    );
  }, [schedules, selectedDay, searchQuery]);

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const res = await manageSchedule({ ...formData, id: editingId });
      setSchedules((prev: any) =>
        editingId
          ? prev.map((s: any) => (s.id === editingId ? res.schedule : s))
          : [...prev, res.schedule],
      );
      toast.success("Timeline Updated");
      setIsModalOpen(false);
    } catch (e: any) {
      toast.error(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-[1600px] mx-auto space-y-8">
      {/* ELITE HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-800">
        <div className="space-y-2">
          <Badge className="bg-indigo-50 text-indigo-600 border-indigo-100 px-4 py-1 rounded-full uppercase tracking-widest text-[10px] font-black">
            Admin Panel
          </Badge>
          <h1 className="text-4xl font-black text-slate-900 dark:text-white">
            Schedule <span className="text-indigo-600">Commander</span>
          </h1>
          <p className="text-slate-400 font-medium">
            Manage global class timings and meeting credentials
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative group flex-1 min-w-[300px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
            <Input
              placeholder="Search classes or teachers..."
              className="pl-12 h-14 bg-slate-50 dark:bg-slate-800 border-0 rounded-2xl focus:ring-2 ring-indigo-500/10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button
            onClick={() => {
              setEditingId(null);
              setIsModalOpen(true);
            }}
            className="h-14 px-8 rounded-2xl bg-indigo-600 hover:bg-indigo-700 shadow-xl shadow-indigo-200 dark:shadow-none font-bold"
          >
            <Plus className="h-5 w-5 mr-2" /> Add Entry
          </Button>
        </div>
      </div>

      {/* DAY SELECTOR */}
      <div className="flex items-center gap-2 p-2 bg-white dark:bg-slate-900 rounded-[2rem] shadow-sm border border-slate-100 dark:border-slate-800 overflow-x-auto no-scrollbar">
        {days.map((day, i) => (
          <button
            key={day}
            onClick={() => setSelectedDay(i.toString())}
            className={`flex-1 min-w-[120px] py-4 rounded-[1.5rem] text-xs font-black transition-all ${
              selectedDay === i.toString()
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200 scale-[1.02]"
                : "text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
            }`}
          >
            {day.toUpperCase()}
          </button>
        ))}
      </div>

      {/* SCHEDULE GRID */}
      <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredSchedules.map((s: any) => (
            <motion.div
              key={s.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <Card className="border-0 shadow-sm bg-white dark:bg-slate-900 rounded-[2rem] overflow-hidden hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500">
                <CardContent className="p-0">
                  {/* Top Color Bar */}
                  <div
                    className={`h-2 w-full ${s.isLive ? "bg-indigo-500" : "bg-emerald-500"}`}
                  />

                  <div className="p-8 space-y-6">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Badge
                            variant="outline"
                            className="text-[10px] font-black uppercase tracking-tighter border-slate-200"
                          >
                            {s.class.code}
                          </Badge>
                          {s.isRecurring && (
                            <Badge className="bg-slate-100 text-slate-500 border-0">
                              <Repeat className="h-3 w-3 mr-1" /> Weekly
                            </Badge>
                          )}
                        </div>
                        <h3 className="text-xl font-black text-slate-900 dark:text-white leading-tight">
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
                            <MoreVertical className="h-5 w-5" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="rounded-xl">
                          <DropdownMenuItem
                            onClick={() => openEdit(s)}
                            className="py-2"
                          >
                            <Edit className="h-4 w-4 mr-2" /> Edit Session
                          </DropdownMenuItem>
                          <DropdownMenuItem className="py-2 text-red-600">
                            <Trash2 className="h-4 w-4 mr-2" /> Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    <div className="grid grid-cols-2 gap-4 py-4 border-y border-slate-50 dark:border-slate-800">
                      <div className="flex items-center gap-3">
                        <div className="p-3 bg-indigo-50 dark:bg-indigo-900/30 rounded-2xl text-indigo-600">
                          <Clock className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                            Time Slot
                          </p>
                          <p className="text-sm font-black text-slate-700 dark:text-slate-200">
                            {s.startTime} - {s.endTime}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="p-3 bg-emerald-50 dark:bg-emerald-900/30 rounded-2xl text-emerald-600">
                          <Globe className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                            Zone
                          </p>
                          <p className="text-sm font-black text-slate-700 dark:text-slate-200">
                            {s.timezone}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* LIVE CREDENTIALS (SCHEMA DATA) */}
                    {s.isLive && (
                      <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl space-y-3">
                        <div className="flex items-center justify-between text-xs">
                          <span className="flex items-center gap-2 text-slate-500 font-bold uppercase tracking-tighter">
                            <Hash className="h-3 w-3" /> Meeting ID
                          </span>
                          <span className="font-mono font-bold text-indigo-600">
                            {s.meetingId || "Not Set"}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="flex items-center gap-2 text-slate-500 font-bold uppercase tracking-tighter">
                            <Lock className="h-3 w-3" /> Password
                          </span>
                          <span className="font-mono font-bold text-slate-700 dark:text-slate-300">
                            {s.meetingPassword || "None"}
                          </span>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10 ring-4 ring-slate-50 dark:ring-slate-800">
                          <AvatarImage src={s.class.teacher.user.image} />
                          <AvatarFallback className="font-black">
                            {s.class.teacher.user.name[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-xs font-black text-slate-900 dark:text-white leading-none">
                            {s.class.teacher.user.name}
                          </p>
                          <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-tighter">
                            Instructor
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] font-black uppercase text-slate-400 mb-1">
                          Capacity
                        </p>
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-xs font-black ${s.class.currentEnrollment >= s.class.capacity ? "text-red-500" : "text-slate-700"}`}
                          >
                            {s.class.currentEnrollment}/{s.class.capacity}
                          </span>
                          <div className="w-12 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-indigo-500"
                              style={{
                                width: `${(s.class.currentEnrollment / s.class.capacity) * 100}%`,
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* FULL-FEATURED MODAL */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/80 backdrop-blur-xl"
              onClick={() => setIsModalOpen(false)}
            />
            <motion.div
              initial={{ scale: 0.95, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 30 }}
              className="relative bg-white dark:bg-slate-900 w-full max-w-2xl rounded-[3rem] shadow-2xl overflow-hidden border border-white/10"
            >
              <div className="p-10 space-y-8">
                <div className="flex justify-between items-center">
                  <h2 className="text-3xl font-black text-slate-900 dark:text-white">
                    {editingId ? "Edit Configuration" : "Global Scheduler"}
                  </h2>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsModalOpen(false)}
                    className="rounded-full h-12 w-12 hover:bg-slate-100"
                  >
                    <X />
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2 space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
                      Target Academic Class
                    </Label>
                    <Select
                      value={formData.classId}
                      onValueChange={(v) =>
                        setFormData({ ...formData, classId: v })
                      }
                    >
                      <SelectTrigger className="h-14 rounded-2xl border-slate-100 bg-slate-50/50 dark:bg-slate-800/50">
                        <SelectValue placeholder="Select Class Record" />
                      </SelectTrigger>
                      <SelectContent className="rounded-2xl">
                        {classes.map((c: any) => (
                          <SelectItem
                            key={c.id}
                            value={c.id}
                            className="py-3 font-bold"
                          >
                            {c.name} ({c.code})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* TYPABLE TIME INPUTS */}
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
                      Start Time (24h)
                    </Label>
                    <Input
                      type="time"
                      className="h-14 rounded-2xl border-slate-100 font-bold text-lg"
                      value={formData.startTime}
                      onChange={(e) =>
                        setFormData({ ...formData, startTime: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
                      End Time (24h)
                    </Label>
                    <Input
                      type="time"
                      className="h-14 rounded-2xl border-slate-100 font-bold text-lg"
                      value={formData.endTime}
                      onChange={(e) =>
                        setFormData({ ...formData, endTime: e.target.value })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
                      Platform
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
                      <SelectContent className="rounded-2xl">
                        <SelectItem value="ZOOM">Zoom Video</SelectItem>
                        <SelectItem value="GOOGLE_MEET">Google Meet</SelectItem>
                        <SelectItem value="MICROSOFT_TEAMS">Teams</SelectItem>
                        <SelectItem value="OTHER">
                          Physical Classroom
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
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
                      <SelectContent className="rounded-2xl">
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

                  <div className="md:col-span-2 grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">
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
                        placeholder="982 123 4567"
                        className="h-14 rounded-2xl"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                        Meeting Password
                      </Label>
                      <Input
                        value={formData.meetingPassword}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            meetingPassword: e.target.value,
                          })
                        }
                        placeholder="Passcode"
                        className="h-14 rounded-2xl"
                      />
                    </div>
                  </div>

                  <div className="md:col-span-2 flex items-center justify-between p-6 bg-slate-50 dark:bg-slate-800/50 rounded-3xl border border-slate-100 dark:border-slate-700">
                    <div className="flex gap-4">
                      <div className="p-3 bg-white dark:bg-slate-700 rounded-2xl shadow-sm">
                        <Video className="text-indigo-600" />
                      </div>
                      <div>
                        <p className="text-sm font-black text-slate-900 dark:text-white">
                          Enable Live Session
                        </p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                          Automatic Link Generation
                        </p>
                      </div>
                    </div>
                    <Switch
                      checked={formData.isLive}
                      onCheckedChange={(v) =>
                        setFormData({ ...formData, isLive: v })
                      }
                    />
                  </div>
                </div>

                <Button
                  className="w-full h-16 rounded-[1.5rem] bg-indigo-600 hover:bg-indigo-700 text-white font-black text-lg shadow-2xl shadow-indigo-500/30 transition-all"
                  onClick={handleSave}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="animate-spin mr-2" />
                  ) : editingId ? (
                    "Update Timetable Entry"
                  ) : (
                    "Finalize Timetable Entry"
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
      recurrenceRule: s.recurrenceRule || "Weekly",
    });
    setIsModalOpen(true);
  }
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
