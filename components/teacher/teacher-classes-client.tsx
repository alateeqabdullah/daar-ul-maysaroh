"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  BookOpen,
  Users,
  Clock,
  MoreVertical,
  ArrowRight,
  FileText,
  Plus,
  Loader2,
  X,
} from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
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
import { Progress } from "@/components/ui/progress";
import { Label } from "@/components/ui/label";
import { getInitials, cn } from "@/lib/utils";
import { toast } from "sonner";
import Link from "next/link";
import { useRouter } from "next/navigation";

// --- ANIMATION ---
const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } },
};
const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1 },
};

const GRADIENTS = [
  "from-blue-600 to-indigo-600",
  "from-emerald-600 to-teal-600",
  "from-violet-600 to-purple-600",
  "from-orange-500 to-red-600",
  "from-cyan-600 to-blue-600",
];

interface ClassData {
  id: string;
  name: string;
  code: string;
  level: string;
  capacity: number;
  studentsCount: number;
  assignmentsCount: number;
  subjects: string;
  schedules: any[]; // Changed: pass raw schedules to calculate locally
  studentPreviews: { image: string | null; name: string }[];
}

interface Props {
  classes: ClassData[];
}

export default function TeacherClassesClient({ classes }: Props) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [isRequestOpen, setIsRequestOpen] = useState(false);
  const [requestData, setRequestData] = useState({
    className: "",
    subject: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  // --- CLIENT SIDE DATE LOGIC ---
  const getNextSession = (schedules: any[]) => {
    if (!schedules || schedules.length === 0) return null;

    const now = new Date();
    const today = now.getDay(); // 0-6
    const currentTime = now.getHours() * 60 + now.getMinutes();

    // 1. Find later today
    const laterToday = schedules.find((s: any) => {
      const [h, m] = s.startTime.split(":").map(Number);
      return s.dayOfWeek === today && h * 60 + m > currentTime;
    });

    if (laterToday)
      return { day: "Today", time: laterToday.startTime, isToday: true };

    // 2. Find next day in week
    const upcoming = schedules.find((s: any) => s.dayOfWeek > today);
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    if (upcoming)
      return {
        day: days[upcoming.dayOfWeek],
        time: upcoming.startTime,
        isToday: false,
      };

    // 3. Wrap to next week
    const first = schedules[0];
    return {
      day: days[first.dayOfWeek],
      time: first.startTime,
      isToday: false,
    };
  };

  const filteredClasses = classes.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // --- ACTIONS ---

  const handleStartClass = async (id: string) => {
    toast.loading("Initializing session...");
    try {
      const res = await fetch("/api/teacher/classes/actions", {
        method: "POST",
        body: JSON.stringify({
          action: "START_SESSION",
          data: { classId: id },
        }),
      });

      if (res.ok) {
        toast.dismiss();
        toast.success("Class Started", {
          description: "Redirecting to classroom...",
        });
        router.push(`/teacher/classes/${id}`); // Redirect to details page
      } else {
        throw new Error();
      }
    } catch (error) {
      toast.dismiss();
      toast.error("Failed to start session");
    }
  };

  const handleRequestClass = async () => {
    if (!requestData.className) return toast.error("Class name required");
    setIsLoading(true);

    try {
      const res = await fetch("/api/teacher/classes/actions", {
        method: "POST",
        body: JSON.stringify({ action: "REQUEST_CLASS", data: requestData }),
      });

      if (res.ok) {
        toast.success("Request sent to Admin");
        setIsRequestOpen(false);
        setRequestData({ className: "", subject: "" });
      } else {
        throw new Error();
      }
    } catch (e) {
      toast.error("Failed to send request");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-8 pb-10"
    >
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            My Classes
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage your active courses and curriculum
          </p>
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <div className="relative flex-1 md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search classes..."
              className="pl-9 bg-white dark:bg-slate-900"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button
            className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-md"
            onClick={() => setIsRequestOpen(true)}
          >
            <Plus className="h-4 w-4 mr-2" /> Request Class
          </Button>
        </div>
      </div>

      {/* GRID */}
      {filteredClasses.length === 0 ? (
        <div className="text-center py-20 bg-muted/20 rounded-3xl border border-dashed border-slate-200 dark:border-slate-800">
          <BookOpen className="h-16 w-16 mx-auto text-slate-300 mb-4" />
          <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-300">
            No Classes Found
          </h3>
          <p className="text-slate-500">
            You haven't been assigned any classes yet.
          </p>
        </div>
      ) : (
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
        >
          {filteredClasses.map((cls, idx) => {
            const nextSession = getNextSession(cls.schedules);

            return (
              <motion.div
                key={cls.id}
                variants={itemVariants}
                className="h-full"
              >
                <Card
                  className="group h-full border-0 shadow-lg overflow-hidden flex flex-col relative bg-white dark:bg-slate-900 hover:ring-2 ring-indigo-500/20 transition-all cursor-pointer"
                  onClick={() => router.push(`/teacher/classes/${cls.id}`)}
                >
                  {/* Visual Header */}
                  <div
                    className={cn(
                      "h-32 bg-gradient-to-br p-6 relative flex flex-col justify-between",
                      GRADIENTS[idx % GRADIENTS.length]
                    )}
                  >
                    <div className="flex justify-between items-start">
                      <Badge className="bg-white/20 text-white border-0 backdrop-blur-md font-mono hover:bg-white/30">
                        {cls.code}
                      </Badge>
                      <div
                        className="bg-black/20 hover:bg-black/30 text-white p-1 rounded-md cursor-pointer backdrop-blur-md transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <MoreVertical className="h-4 w-4 outline-none" />
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            <DropdownMenuItem>Mark Attendance</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-white leading-tight drop-shadow-md">
                      {cls.name}
                    </h3>
                  </div>

                  <CardContent className="p-6 flex-1 flex flex-col gap-6">
                    {/* Key Stats Row */}
                    <div className="flex justify-between items-center text-sm">
                      <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                        <Users className="h-4 w-4 text-indigo-500" />
                        <span className="font-semibold text-slate-900 dark:text-white">
                          {cls.studentsCount}
                        </span>{" "}
                        Students
                      </div>
                      <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                        <FileText className="h-4 w-4 text-pink-500" />
                        <span className="font-semibold text-slate-900 dark:text-white">
                          {cls.assignmentsCount}
                        </span>{" "}
                        Tasks
                      </div>
                    </div>

                    {/* Capacity Progress */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Level: {cls.level}</span>
                        <span>
                          {Math.round((cls.studentsCount / cls.capacity) * 100)}
                          % Full
                        </span>
                      </div>
                      <Progress
                        value={(cls.studentsCount / cls.capacity) * 100}
                        className="h-1.5"
                      />
                    </div>

                    {/* Next Session Info */}
                    <div
                      className={cn(
                        "p-3 rounded-xl border flex items-center gap-3 transition-colors",
                        nextSession?.isToday
                          ? "bg-green-50 border-green-100 dark:bg-green-900/20 dark:border-green-900/50"
                          : "bg-slate-50 border-slate-100 dark:bg-slate-800/50 dark:border-slate-800"
                      )}
                    >
                      <div
                        className={cn(
                          "p-2 rounded-lg",
                          nextSession?.isToday
                            ? "bg-green-100 text-green-600"
                            : "bg-white dark:bg-slate-700 text-slate-500"
                        )}
                      >
                        <Clock className="h-4 w-4" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-bold text-muted-foreground uppercase">
                          {nextSession?.isToday
                            ? "Happening Today"
                            : "Next Session"}
                        </p>
                        <p className="text-sm font-semibold">
                          {nextSession
                            ? `${nextSession.day} at ${nextSession.time}`
                            : "No schedule set"}
                        </p>
                      </div>
                    </div>
                  </CardContent>

                  {/* Footer Actions */}
                  <CardFooter className="p-6 pt-0 flex items-center justify-between mt-auto">
                    {/* Student Stack */}
                    <div className="flex -space-x-2">
                      {cls.studentPreviews.slice(0, 3).map((s, i) => (
                        <Avatar
                          key={i}
                          className="w-8 h-8 border-2 border-white dark:border-slate-900"
                        >
                          <AvatarImage src={s.image || undefined} />
                          <AvatarFallback className="text-[10px] bg-slate-200">
                            {getInitials(s.name)}
                          </AvatarFallback>
                        </Avatar>
                      ))}
                      {cls.studentsCount > 3 && (
                        <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 border-2 border-white dark:border-slate-900 flex items-center justify-center text-[10px] font-bold text-slate-500">
                          +{cls.studentsCount - 3}
                        </div>
                      )}
                    </div>

                    <Button
                      size="sm"
                      className="group bg-slate-900 text-white dark:bg-white dark:text-slate-900 hover:bg-slate-800"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleStartClass(cls.id);
                      }}
                    >
                      Enter Class{" "}
                      <ArrowRight className="ml-2 h-3 w-3 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      )}

      {/* REQUEST MODAL */}
      <AnimatePresence>
        {isRequestOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsRequestOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-white dark:bg-slate-950 w-full max-w-md rounded-2xl p-6 shadow-2xl border"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Request New Class</h2>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => setIsRequestOpen(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <div className="space-y-4">
                <div>
                  <Label>Class Name</Label>
                  <Input
                    value={requestData.className}
                    onChange={(e) =>
                      setRequestData({
                        ...requestData,
                        className: e.target.value,
                      })
                    }
                    placeholder="e.g. Advanced Tajweed"
                  />
                </div>
                <div>
                  <Label>Subject / Topic</Label>
                  <Input
                    value={requestData.subject}
                    onChange={(e) =>
                      setRequestData({
                        ...requestData,
                        subject: e.target.value,
                      })
                    }
                    placeholder="e.g. Quranic Sciences"
                  />
                </div>
                <Button
                  className="w-full mt-2 bg-indigo-600 hover:bg-indigo-700 text-white"
                  onClick={handleRequestClass}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    "Send Request"
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
