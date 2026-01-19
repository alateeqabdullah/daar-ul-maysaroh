"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar, Clock, MapPin, Video, MonitorPlay, 
  Download, Plus, Trash2, LayoutGrid, Layers, BookOpen,
  Loader2, X, CheckCircle
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Counter } from "@/components/admin/dashboard-ui";
import { TeacherScheduleItem, TeacherClassOption, ScheduleStats } from "@/types/teacher";

// --- ANIMATION ---
const containerVariants = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } };
const itemVariants = { hidden: { y: 20, opacity: 0 }, show: { y: 0, opacity: 1 } };

interface Props {
  schedules: TeacherScheduleItem[];
  classes: TeacherClassOption[];
  stats: ScheduleStats;
}

export default function TeacherScheduleClient({ schedules: initialSchedules, classes, stats }: Props) {
  const [schedules, setSchedules] = useState<TeacherScheduleItem[]>(initialSchedules);
  const [selectedDay, setSelectedDay] = useState(new Date().getDay());
  const [currentTime, setCurrentTime] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  // Modal State
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [formData, setFormData] = useState({
    classId: "", dayOfWeek: new Date().getDay().toString(), startTime: "09:00", endTime: "10:00",
    isLive: true, meetingUrl: "", meetingPlatform: "ZOOM"
  });

  // Clock
  useEffect(() => {
    const now = new Date();
    setCurrentTime(`${now.getHours()}:${now.getMinutes()}`);
    const timer = setInterval(() => {
      const n = new Date();
      setCurrentTime(`${n.getHours()}:${n.getMinutes()}`);
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  // --- ACTIONS ---



  const handleCreate = async () => {
    if(!formData.classId || !formData.startTime || !formData.endTime) {
       return toast.error("Please fill in Class, Start Time, and End Time");
    }
    
    setIsLoading(true);

    try {
      const res = await fetch("/api/teacher/schedule/manage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
            action: "CREATE", 
            data: {
                ...formData,
                // Ensure dayOfWeek is sent as string to match API parsing expectation
                dayOfWeek: formData.dayOfWeek.toString() 
            } 
        }),
      });
      
      const result = await res.json();
      
      if(!res.ok) {
         // THROW THE SPECIFIC ERROR FROM API
         throw new Error(result.error || "Failed to create session");
      }

      setSchedules([...schedules, result.schedule]);
      toast.success("Session Added Successfully");
      setIsAddOpen(false);
      // Reset form but keep the day selected
      setFormData(prev => ({ ...prev, classId: "", startTime: "09:00", endTime: "10:00" }));

    } catch (e: any) {
      // DISPLAY THE REAL ERROR
      toast.error(e.message);
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };


  const handleDelete = async (id: string) => {
    if(!confirm("Delete this session?")) return;
    setSchedules(prev => prev.filter(s => s.id !== id));
    try {
       await fetch("/api/teacher/schedule/manage", {
         method: "POST",
         body: JSON.stringify({ action: "DELETE", scheduleId: id })
       });
       toast.success("Deleted");
    } catch {
       toast.error("Failed");
    }
  };

  // --- HELPERS ---
  const isNow = (start: string, end: string, day: number) => {
    const today = new Date().getDay();
    if (day !== today) return false;
    if (!currentTime) return false;

    const [ch, cm] = currentTime.split(':').map(Number);
    const curr = ch * 60 + cm;
    const [sh, sm] = start.split(':').map(Number);
    const startM = sh * 60 + sm;
    const [eh, em] = end.split(':').map(Number);
    const endM = eh * 60 + em;

    return curr >= startM && curr <= endM;
  };

  const dailySchedules = useMemo(() => schedules.filter(s => s.dayOfWeek === selectedDay), [schedules, selectedDay]);

  const statCards = [
    { label: "Total Sessions", value: stats.totalSessions, icon: Calendar, color: "from-blue-500 to-cyan-500", shadow: "shadow-blue-500/20" },
    { label: "Online", value: stats.onlineSessions, icon: Video, color: "from-purple-500 to-pink-500", shadow: "shadow-purple-500/20" },
    { label: "Active Classes", value: stats.uniqueClasses, icon: BookOpen, color: "from-emerald-500 to-green-500", shadow: "shadow-emerald-500/20" },
    { label: "Busiest Day", value: stats.busiestDay, icon: Clock, color: "from-amber-400 to-orange-500", shadow: "shadow-amber-500/20", isText: true },
  ];

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="show" className="space-y-8 pb-10">
      
      {/* HEADER */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Schedule</h1>
          <p className="text-muted-foreground mt-1">Manage weekly timetables and sessions</p>
        </div>
        <div className="flex gap-2">
           <Button variant="outline"><Download className="h-4 w-4 mr-2"/> Export Calendar</Button>
           <Button className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md hover:scale-105 transition-all gap-2" onClick={() => setIsAddOpen(true)}>
             <Plus className="h-4 w-4 mr-2" /> Add Session
           </Button>
        </div>
      </div>

      {/* BENTO STATS */}
      <motion.div variants={containerVariants} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat, i) => (
          <motion.div key={i} variants={itemVariants}>
            <Card className="border-none shadow-sm bg-white/50 backdrop-blur-sm dark:bg-slate-900/50 hover:shadow-md transition-all relative overflow-hidden">
               <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${stat.color} opacity-10 rounded-bl-full`} />
               <CardContent className="p-6 relative z-10 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase">{stat.label}</p>
                    <div className="text-2xl font-bold mt-2">{stat.isText ? stat.value : <Counter value={stat.value as number} />}</div>
                  </div>
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} text-white ${stat.shadow} shadow-lg`}><stat.icon className="h-6 w-6" /></div>
               </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* DAY TABS */}
      <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
        {days.map((day, index) => (
          <button
            key={day}
            onClick={() => setSelectedDay(index)}
            className={cn(
              "px-6 py-3 rounded-2xl text-sm font-bold transition-all whitespace-nowrap border flex items-center gap-2",
              selectedDay === index
                ? "bg-indigo-600 text-white border-indigo-600 shadow-lg shadow-indigo-200 dark:shadow-none"
                : "bg-white dark:bg-slate-900 text-slate-500 border-slate-200 dark:border-slate-800 hover:bg-slate-50"
            )}
          >
            {day}
            {schedules.some(s => s.dayOfWeek === index) && <span className={cn("w-1.5 h-1.5 rounded-full", selectedDay === index ? "bg-white" : "bg-indigo-500")} />}
          </button>
        ))}
      </div>

      {/* TIMELINE */}
      <div className="relative min-h-[400px]">
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-slate-200 dark:bg-slate-800 hidden md:block" />
        
        <AnimatePresence mode="wait">
          {dailySchedules.length === 0 ? (
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center justify-center py-20 text-slate-400">
                <div className="h-16 w-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4"><Calendar className="h-8 w-8 opacity-50"/></div>
                <p>No classes on {days[selectedDay]}</p>
             </motion.div>
          ) : (
             <div className="space-y-6">
                {dailySchedules.map(s => {
                   const active = isNow(s.startTime, s.endTime, s.dayOfWeek);
                   return (
                     <motion.div key={s.id} variants={itemVariants} className="relative md:pl-20 group">
                        {/* Time Label */}
                        <div className="hidden md:flex absolute left-0 top-6 w-16 flex-col items-end pr-4">
                           <span className="text-sm font-bold text-slate-900 dark:text-white">{s.startTime}</span>
                           <span className="text-xs text-slate-400">{s.endTime}</span>
                        </div>
                        {/* Dot */}
                        <div className={cn("hidden md:block absolute left-[29px] top-8 w-4 h-4 rounded-full border-4 border-white dark:border-slate-950 z-10 transition-colors", active ? "bg-green-500 shadow-[0_0_0_4px_rgba(34,197,94,0.2)]" : "bg-slate-300 dark:bg-slate-700")} />
                        
                        {/* Card */}
                        <Card className={cn("border transition-all duration-300 hover:shadow-lg overflow-hidden", active ? "border-green-500/50 shadow-md ring-1 ring-green-500/20" : "border-slate-200 dark:border-slate-800")}>
                           <div className={cn("h-1.5 w-full", active ? "bg-green-500" : "bg-gradient-to-r from-indigo-500 to-purple-500")} />
                           <CardContent className="p-6 flex flex-col md:flex-row gap-6 items-start md:items-center">
                              <div className="flex-1">
                                 <div className="flex items-center gap-3 mb-2">
                                    <Badge variant={active ? "default" : "secondary"} className={active ? "bg-green-100 text-green-700 hover:bg-green-100" : "bg-slate-100 text-slate-600"}>
                                       {active ? "Happening Now" : `${s.startTime} - ${s.endTime}`}
                                    </Badge>
                                    <span className="text-xs font-mono text-slate-400 border px-1.5 py-0.5 rounded">{s.classCode}</span>
                                 </div>
                                 <h3 className="text-xl font-bold mb-1">{s.className}</h3>
                                 <p className="text-sm text-slate-500 flex items-center gap-2"><Layers className="h-3 w-3"/> {s.classLevel} <span>•</span> <Users className="h-3 w-3"/> {s.studentCount} Students</p>
                              </div>
                              <div className="flex flex-col items-end gap-3 min-w-[140px]">
                                 <div className="flex items-center gap-2 text-sm font-medium">
                                    {s.isLive ? <><Video className="h-4 w-4 text-blue-500"/><span className="text-blue-700">Online</span></> : <><MapPin className="h-4 w-4 text-amber-500"/><span className="text-amber-700">On Campus</span></>}
                                 </div>
                                 <div className="flex gap-2">
                                   {s.isLive && <Button size="sm" className={active ? "bg-green-600 hover:bg-green-700" : "bg-indigo-600 hover:bg-indigo-700"} onClick={() => window.open(s.meetingUrl || '', '_blank')}><MonitorPlay className="h-4 w-4 mr-2"/> Start</Button>}
                                   <Button size="icon" variant="ghost" className="text-rose-500 hover:bg-rose-50" onClick={() => handleDelete(s.id)}><Trash2 className="h-4 w-4"/></Button>
                                 </div>
                              </div>
                           </CardContent>
                        </Card>
                     </motion.div>
                   );
                })}
             </div>
          )}
        </AnimatePresence>
      </div>

      {/* ADD MODAL */}
      <AnimatePresence>
        {isAddOpen && (
           <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setIsAddOpen(false)}>
              <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} onClick={e => e.stopPropagation()} className="bg-white dark:bg-slate-950 w-full max-w-md rounded-2xl shadow-2xl border p-6">
                 <div className="flex justify-between mb-6"><h2 className="text-xl font-bold">Add Session</h2><X className="cursor-pointer" onClick={() => setIsAddOpen(false)}/></div>
                 <div className="space-y-4">
                    <div><Label>Class</Label><Select onValueChange={v => setFormData({...formData, classId: v})}><SelectTrigger><SelectValue placeholder="Select Class"/></SelectTrigger><SelectContent>{classes.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}</SelectContent></Select></div>
                    <div className="grid grid-cols-2 gap-4">
                       <div><Label>Day</Label><Select onValueChange={v => setFormData({...formData, dayOfWeek: v})} defaultValue={selectedDay.toString()}><SelectTrigger><SelectValue/></SelectTrigger><SelectContent>{days.map((d, i) => <SelectItem key={i} value={i.toString()}>{d}</SelectItem>)}</SelectContent></Select></div>
                       <div><Label>Platform</Label><Select onValueChange={v => setFormData({...formData, meetingPlatform: v})} defaultValue="ZOOM"><SelectTrigger><SelectValue/></SelectTrigger><SelectContent><SelectItem value="ZOOM">Zoom</SelectItem><SelectItem value="GOOGLE_MEET">Meet</SelectItem><SelectItem value="OTHER">Other</SelectItem></SelectContent></Select></div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                       <div><Label>Start</Label><Input type="time" value={formData.startTime} onChange={e => setFormData({...formData, startTime: e.target.value})} /></div>
                       <div><Label>End</Label><Input type="time" value={formData.endTime} onChange={e => setFormData({...formData, endTime: e.target.value})} /></div>
                    </div>
                    <div className="flex items-center justify-between border p-3 rounded-lg">
                       <Label>Online Class?</Label>
                       <Switch checked={formData.isLive} onCheckedChange={v => setFormData({...formData, isLive: v})} />
                    </div>
                    {formData.isLive && <div><Label>Meeting URL</Label><Input value={formData.meetingUrl} onChange={e => setFormData({...formData, meetingUrl: e.target.value})} placeholder="https://..." /></div>}
                    <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white mt-2" onClick={handleCreate} disabled={isLoading}>{isLoading ? <Loader2 className="animate-spin"/> : "Add Session"}</Button>
                 </div>
              </motion.div>
           </motion.div>
        )}
      </AnimatePresence>

    </motion.div>
  );
}