"use client";

import { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Plus,
  MoreVertical,
  Edit,
  Trash2,
  Calendar,
  Download,
  Clock,
  Video,
  MapPin,
  MonitorPlay,
  Loader2,
  X,
  BookOpen,
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
import { toast } from "sonner";
import { getInitials } from "@/lib/utils";
import { Counter } from "@/components/admin/dashboard-ui";

// --- ANIMATION ---
const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } },
};
const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 50 } },
};

interface Props {
  initialSchedules: any[];
  classes: any[];
  teachers: any[];
  stats: any; // Server stats (used as fallback/initial)
  filters: any; // URL params
}

export default function ScheduleManagementClient({
  initialSchedules,
  classes,
  teachers,
  filters,
}: Props) {
  const router = useRouter();
  const [schedules, setSchedules] = useState(initialSchedules);
  const [isLoading, setIsLoading] = useState(false);

  // 1. Initialize State from URL Filters
  const [selectedDay, setSelectedDay] = useState(() => {
    // If URL has a specific day, use it. Otherwise use Today.
    if (filters?.day && filters.day !== "all") return filters.day;
    return new Date().getDay().toString();
  });

  const [searchQuery, setSearchQuery] = useState(filters?.search || "");

  // Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);

  // Form
  const [formData, setFormData] = useState({
    classId: "",
    dayOfWeek: "0",
    startTime: "09:00",
    endTime: "10:00",
    isOnline: true,
    meetingUrl: "",
    meetingPlatform: "ZOOM",
  });

  // --- DYNAMIC STATS CALCULATION ---
  // Calculates stats on the fly so they update when you add/delete items
  const dynamicStats = useMemo(() => {
    const totalSessions = schedules.length;
    const onlineSessions = schedules.filter((s) => s.isOnline).length;
    const uniqueClasses = new Set(schedules.map((s) => s.classId)).size;

    // Calculate Busiest Day
    const dayCounts = [0, 0, 0, 0, 0, 0, 0];
    schedules.forEach((s) => dayCounts[s.dayOfWeek]++);
    const maxSessions = Math.max(...dayCounts);
    const busiestDayIndex = dayCounts.indexOf(maxSessions);
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return {
      totalSessions,
      onlineSessions,
      uniqueClasses,
      busiestDay: days[busiestDayIndex],
    };
  }, [schedules]);

  // --- FILTERING ---
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
    return schedules.filter((s) => {
      const matchesDay = s.dayOfWeek.toString() === selectedDay;
      const matchesSearch =
        s.class.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.class.teacher.user.name
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
      return matchesDay && matchesSearch;
    });
  }, [schedules, selectedDay, searchQuery]);

  // --- ACTIONS ---
  const handleCreateOrUpdate = async () => {
    if (!formData.classId || !formData.startTime || !formData.endTime) {
      return toast.error("Class and Time are required");
    }
    setIsLoading(true);

    try {
      const res = await fetch("/api/admin/schedule/manage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: isEditing ? "UPDATE" : "CREATE",
          scheduleId: selectedSchedule?.id,
          data: formData,
        }),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.error);

      if (isEditing) {
        setSchedules((prev) =>
          prev.map((s) =>
            s.id === selectedSchedule.id ? { ...s, ...result.schedule } : s
          )
        );
        toast.success("Schedule updated");
      } else {
        setSchedules([...schedules, result.schedule]);
        toast.success("Session added");
      }
      setIsAddModalOpen(false);
      resetForm();
    } catch (error: any) {
      toast.error(error.message || "Failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (scheduleId: string) => {
    if (!confirm("Delete this session?")) return;
    const previousSchedules = [...schedules];
    setSchedules((prev) => prev.filter((s) => s.id !== scheduleId));

    try {
      const res = await fetch("/api/admin/schedule/manage", {
        method: "POST",
        body: JSON.stringify({ action: "DELETE", scheduleId }),
      });
      if (!res.ok) throw new Error();
      toast.success("Session removed");
    } catch {
      setSchedules(previousSchedules); // Revert
      toast.error("Delete failed");
    }
  };

  const handleDayChange = (index: string) => {
    setSelectedDay(index);
    // Optional: Update URL without refreshing page for bookmarking
    const params = new URLSearchParams(window.location.search);
    params.set("day", index);
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  // --- HELPERS ---
  const resetForm = () => {
    setFormData({
      classId: "",
      dayOfWeek: selectedDay,
      startTime: "09:00",
      endTime: "10:00",
      isOnline: true,
      meetingUrl: "",
      meetingPlatform: "ZOOM",
    });
    setIsEditing(false);
  };

  const openEdit = (s: any) => {
    setSelectedSchedule(s);
    setFormData({
      classId: s.classId,
      dayOfWeek: s.dayOfWeek.toString(),
      startTime: s.startTime,
      endTime: s.endTime,
      isOnline: s.isOnline,
      meetingUrl: s.meetingUrl || "",
      meetingPlatform: s.meetingPlatform || "ZOOM",
    });
    setIsEditing(true);
    setIsAddModalOpen(true);
  };

  const formatTime = (time: string) => {
    const [h, m] = time.split(":");
    const hour = parseInt(h);
    const ampm = hour >= 12 ? "PM" : "AM";
    const hour12 = hour % 12 || 12;
    return `${hour12}:${m} ${ampm}`;
  };

  const statCards = [
    {
      label: "Total Sessions",
      value: dynamicStats.totalSessions,
      icon: Calendar,
      color: "from-blue-500 to-cyan-500",
      shadow: "shadow-blue-500/20",
    },
    {
      label: "Online",
      value: dynamicStats.onlineSessions,
      icon: Video,
      color: "from-purple-500 to-pink-500",
      shadow: "shadow-purple-500/20",
    },
    {
      label: "Active Classes",
      value: dynamicStats.uniqueClasses,
      icon: BookOpen,
      color: "from-emerald-500 to-green-500",
      shadow: "shadow-emerald-500/20",
    },
    {
      label: "Busiest Day",
      value: dynamicStats.busiestDay,
      icon: Clock,
      color: "from-amber-400 to-orange-500",
      shadow: "shadow-amber-500/20",
      isText: true,
    },
  ];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-8 pb-10"
    >
      {/* HEADER */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
            Schedule
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage weekly timetables and sessions
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" /> Export
          </Button>
          <Button
            className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md hover:scale-105 transition-all"
            onClick={() => {
              resetForm();
              setIsAddModalOpen(true);
            }}
          >
            <Plus className="h-4 w-4 mr-2" /> Add Session
          </Button>
        </div>
      </div>

      {/* STATS */}
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
                    {stat.isText ? stat.value : <Counter value={stat.value} />}
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

      {/* TABS & SEARCH */}
      <div className="space-y-4">
        <div className="flex items-center gap-4 bg-white/60 dark:bg-slate-900/60 backdrop-blur-md p-2 rounded-xl border shadow-sm overflow-x-auto">
          {days.map((day, index) => (
            <button
              key={day}
              onClick={() => handleDayChange(index.toString())}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                selectedDay === index.toString()
                  ? "bg-white dark:bg-slate-800 text-purple-600 shadow-sm"
                  : "text-muted-foreground hover:bg-white/50"
              }`}
            >
              {day}
            </button>
          ))}
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search classes or teachers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 bg-white/50 dark:bg-slate-900/50 border-0 shadow-sm"
          />
        </div>
      </div>

      {/* SCHEDULE GRID */}
      <motion.div variants={containerVariants} className="space-y-4">
        {filteredSchedules.length === 0 ? (
          <div className="text-center py-20 bg-muted/20 rounded-xl border border-dashed">
            <Calendar className="h-10 w-10 mx-auto mb-3 opacity-20" />
            <p className="text-muted-foreground">
              No sessions scheduled for {days[parseInt(selectedDay)]}.
            </p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredSchedules.map((s) => (
              <motion.div key={s.id} variants={itemVariants} layoutId={s.id}>
                <Card className="group h-full border hover:border-purple-300 dark:hover:border-purple-800 transition-all hover:shadow-lg bg-card">
                  <CardContent className="p-5 flex flex-col h-full">
                    {/* Time Header */}
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-2 text-sm font-bold text-purple-600 bg-purple-50 dark:bg-purple-900/20 px-3 py-1 rounded-full">
                        <Clock className="h-3.5 w-3.5" />
                        {formatTime(s.startTime)} - {formatTime(s.endTime)}
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-8 w-8 -mr-2"
                          >
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => openEdit(s)}>
                            <Edit className="mr-2 h-4 w-4" /> Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDelete(s.id)}
                            className="text-red-600"
                          >
                            <Trash2 className="mr-2 h-4 w-4" /> Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    {/* Class Info */}
                    <h3 className="font-bold text-lg mb-1">{s.class.name}</h3>
                    <p className="text-xs text-muted-foreground font-mono mb-4">
                      {s.class.code}
                    </p>

                    {/* Meta */}
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={s.class.teacher.user.image} />
                          <AvatarFallback>T</AvatarFallback>
                        </Avatar>
                        <span>{s.class.teacher.user.name}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        {s.isOnline ? (
                          <span className="flex items-center gap-2 text-blue-600 bg-blue-50 px-2 py-1 rounded text-xs font-medium">
                            <Video className="h-3 w-3" /> Online
                          </span>
                        ) : (
                          <span className="flex items-center gap-2 text-amber-600 bg-amber-50 px-2 py-1 rounded text-xs font-medium">
                            <MapPin className="h-3 w-3" /> On Campus
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Action */}
                    {s.meetingUrl && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full mt-auto gap-2"
                        onClick={() => window.open(s.meetingUrl, "_blank")}
                      >
                        <MonitorPlay className="h-3.5 w-3.5" /> Join Meeting
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>

      {/* --- ADD/EDIT MODAL --- */}
      <AnimatePresence>
        {isAddModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-background w-full max-w-lg rounded-2xl shadow-2xl border p-6"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">
                  {isEditing ? "Edit Session" : "Add Session"}
                </h2>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => setIsAddModalOpen(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <div className="grid gap-4">
                <div className="space-y-1">
                  <Label>Class</Label>
                  <Select
                    value={formData.classId}
                    onValueChange={(v) =>
                      setFormData({ ...formData, classId: v })
                    }
                  >
                    <SelectTrigger>
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

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <Label>Day</Label>
                    <Select
                      value={formData.dayOfWeek}
                      onValueChange={(v) =>
                        setFormData({ ...formData, dayOfWeek: v })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {days.map((d, i) => (
                          <SelectItem key={i} value={i.toString()}>
                            {d}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1">
                    <Label>Platform</Label>
                    <Select
                      value={formData.meetingPlatform}
                      onValueChange={(v) =>
                        setFormData({ ...formData, meetingPlatform: v })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ZOOM">Zoom</SelectItem>
                        <SelectItem value="GOOGLE_MEET">Google Meet</SelectItem>
                        <SelectItem value="OTHER">Physical</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <Label>Start Time</Label>
                    <Input
                      type="time"
                      value={formData.startTime}
                      onChange={(e) =>
                        setFormData({ ...formData, startTime: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-1">
                    <Label>End Time</Label>
                    <Input
                      type="time"
                      value={formData.endTime}
                      onChange={(e) =>
                        setFormData({ ...formData, endTime: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <Label>Meeting URL (Optional)</Label>
                  <Input
                    value={formData.meetingUrl}
                    onChange={(e) =>
                      setFormData({ ...formData, meetingUrl: e.target.value })
                    }
                    placeholder="https://zoom.us/..."
                  />
                </div>

                <Button
                  className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 text-white"
                  onClick={handleCreateOrUpdate}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="animate-spin mr-2" />
                  ) : isEditing ? (
                    "Save Changes"
                  ) : (
                    "Add Session"
                  )}
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
