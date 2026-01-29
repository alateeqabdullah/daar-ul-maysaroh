"use client";

import React, { useState, useMemo, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import {
  BookOpen,
  Calendar,
  Clock,
  Video,
  Download,
  ChevronRight,
  Search,
  LayoutGrid,
  List as ListIcon,
  Plus,
  MoreVertical,
  ExternalLink,
  CheckCircle2,
  TrendingUp,
  X,
  PlayCircle,
  Loader2,
  ArrowUpRight,
  GraduationCap,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { cn, getInitials } from "@/lib/utils";

// Import our strict types
import {
  Enrollment,
  AvailableClass,
  DashboardStats,
  ClassStatus,
} from "@/types/(dashboard)/student/student"

interface Props {
  student: {
    name: string;
    email: string;
    image?: string | null;
    studentId: string;
  };
  enrollments: Enrollment[]; // Renamed from initialEnrollments
  availableClasses: AvailableClass[]; // Renamed from initialAvailable
  stats: DashboardStats;
  schedule: any[];
  filters: { view: string; status: string; search: string };
}

// Helper for status-based styling
const getStatusTheme = (status: ClassStatus) => {
  const themes: Record<
    ClassStatus,
    { color: string; bg: string; border: string }
  > = {
    ACTIVE: {
      color: "text-emerald-600",
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/20",
    },
    COMPLETED: {
      color: "text-blue-600",
      bg: "bg-blue-500/10",
      border: "border-blue-500/20",
    },
    DROPPED: {
      color: "text-rose-600",
      bg: "bg-rose-500/10",
      border: "border-rose-500/20",
    },
    UPCOMING: {
      color: "text-amber-600",
      bg: "bg-amber-500/10",
      border: "border-amber-500/20",
    },
  };
  return themes[status];
};

export default function StudentClassesClient({
  student,
  enrollments: serverEnrollments = [], // Default to empty array
  availableClasses: serverAvailable = [], // Default to empty array
  stats,
  schedule = [],
  filters,
}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  // --- STATE MANAGEMENT ---
  const [enrollments, setEnrollments] =
    useState<Enrollment[]>(serverEnrollments);
  const [available, setAvailable] =
    useState<AvailableClass[]>(serverAvailable);
  const [search, setSearch] = useState<string>(
    searchParams.get("search") || "",
  );
  const [viewMode, setViewMode] = useState<"grid" | "list">(
    (searchParams.get("view") as any) || "grid",
  );
  const [activeTab, setActiveTab] = useState<string>("my-classes");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  // --- COMPUTED DATA ---
  const filteredEnrollments = useMemo(
    () =>
      (enrollments || []).filter(
        // Added extra safety check
        (e) =>
          e.className.toLowerCase().includes(search.toLowerCase()) ||
          e.classCode.toLowerCase().includes(search.toLowerCase()),
      ),
    [enrollments, search],
  );

  const selectedClass = useMemo(
    () => enrollments.find((e) => e.id === selectedId),
    [enrollments, selectedId],
  );

  // --- HANDLERS ---
  const handleAction = (id: string, action: () => Promise<void>) => {
    setLoadingId(id);
    action().finally(() => setLoadingId(null));
  };

  const onEnroll = async (cls: AvailableClass) => {
    await handleAction(cls.id, async () => {
      await new Promise((r) => setTimeout(r, 1200)); // Simulate API
      setAvailable((prev) => prev.filter((c) => c.id !== cls.id));
      setEnrollments((prev) => [
        ...prev,
        {
          id: cls.id,
          className: cls.name,
          classCode: cls.code,
          teacher: { name: cls.teacher, email: "" },
          status: "ACTIVE",
          progress: 0,
        },
      ]);
      toast.success(`Successfully enrolled in ${cls.name}`);
    });
  };

  return (
    <div className="max-w-7xl mx-auto space-y-10 pb-20">
      {/* 1. ULTRA-MODERN HEADER */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-[0.2em]">
            <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
            Live Dashboard
          </div>
          <h1 className="text-5xl font-black tracking-tight bg-gradient-to-b from-foreground to-foreground/70 bg-clip-text text-transparent">
            My Academy
          </h1>
        </div>

        <div className="flex items-center gap-4 bg-background/50 backdrop-blur-xl p-2 rounded-2xl border shadow-2xl shadow-primary/5">
          <div className="flex p-1 bg-muted/50 rounded-xl">
            {(["grid", "list"] as const).map((mode) => (
              <Button
                key={mode}
                variant={viewMode === mode ? "white" : "ghost"}
                size="sm"
                className={cn(
                  "h-9 w-9 p-0 rounded-lg transition-all",
                  viewMode === mode && "shadow-sm",
                )}
                onClick={() => setViewMode(mode)}
              >
                {mode === "grid" ? (
                  <LayoutGrid className="h-4 w-4" />
                ) : (
                  <ListIcon className="h-4 w-4" />
                )}
              </Button>
            ))}
          </div>
          <Button className="rounded-xl px-6 font-bold shadow-lg shadow-primary/20 transition-transform active:scale-95">
            <Plus className="h-4 w-4 mr-2" /> Explore Courses
          </Button>
        </div>
      </header>

      {/* 2. KPI BENTO BOXES */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: "Active Nodes",
            val: stats.activeClasses,
            icon: BookOpen,
            color: "from-blue-600 to-indigo-600",
          },
          {
            label: "Stability",
            val: `${stats.attendanceRate}%`,
            icon: CheckCircle2,
            color: "from-emerald-600 to-teal-600",
          },
          {
            label: "Velocity",
            val: `${stats.averageProgress}%`,
            icon: TrendingUp,
            color: "from-orange-600 to-rose-600",
          },
          {
            label: "Milestones",
            val: stats.completedClasses,
            icon: GraduationCap,
            color: "from-purple-600 to-pink-600",
          },
        ].map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="group relative overflow-hidden border-none bg-secondary/30 backdrop-blur-sm">
              <div
                className={cn(
                  "absolute inset-0 bg-gradient-to-br opacity-[0.03] transition-opacity group-hover:opacity-[0.08]",
                  s.color,
                )}
              />
              <CardContent className="p-6 flex items-center justify-between relative z-10">
                <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                    {s.label}
                  </p>
                  <p className="text-3xl font-black">{s.val}</p>
                </div>
                <div
                  className={cn(
                    "p-3 rounded-2xl bg-gradient-to-br text-white shadow-2xl",
                    s.color,
                  )}
                >
                  <s.icon className="h-6 w-6" />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* 3. MAIN CONTENT ENGINE */}
        <main className="lg:col-span-8 space-y-8">
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full sm:w-auto"
            >
              <TabsList className="bg-muted/50 p-1.5 rounded-2xl h-14 border border-border/50">
                <TabsTrigger
                  value="my-classes"
                  className="rounded-xl px-8 h-full data-[state=active]:shadow-lg font-bold"
                >
                  Enrolled
                </TabsTrigger>
                <TabsTrigger
                  value="available"
                  className="rounded-xl px-8 h-full data-[state=active]:shadow-lg font-bold"
                >
                  Catalog
                </TabsTrigger>
              </TabsList>
            </Tabs>
            <div className="relative w-full sm:w-72 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <Input
                placeholder="Search resources..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-11 h-14 rounded-2xl bg-background/50 border-border/50 focus:ring-primary focus:border-primary transition-all"
              />
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              layout
              key={activeTab + viewMode}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className={cn(
                "grid gap-6",
                viewMode === "grid"
                  ? "grid-cols-1 sm:grid-cols-2"
                  : "grid-cols-1",
              )}
            >
              <LayoutGroup>
                {activeTab === "my-classes"
                  ? filteredEnrollments.map((e) => (
                      <ClassCard
                        key={e.id}
                        enrollment={e}
                        onClick={() => setSelectedId(e.id)}
                      />
                    ))
                  : available.map((c) => (
                      <AvailableCard
                        key={c.id}
                        cls={c}
                        onEnroll={() => onEnroll(c)}
                        isLoading={loadingId === c.id}
                      />
                    ))}
              </LayoutGroup>
            </motion.div>
          </AnimatePresence>
        </main>

        {/* 4. THE COMMAND SIDEBAR */}
        <aside className="lg:col-span-4 space-y-6">
          <Card className="border-none bg-slate-900 text-white rounded-[2.5rem] shadow-2xl p-4 overflow-hidden sticky top-6">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-10">
                <div className="space-y-1">
                  <h3 className="text-2xl font-black">Live Feed</h3>
                  <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-tighter">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Synchronized
                  </div>
                </div>
                <div className="h-12 w-12 rounded-2xl bg-white/10 flex items-center justify-center backdrop-blur-md">
                  <Clock className="h-6 w-6" />
                </div>
              </div>

              <div className="space-y-8">
                {schedule.map((item, idx) => (
                  <div key={item.id} className="group flex gap-6 relative">
                    {idx !== schedule.length - 1 && (
                      <div className="absolute left-[11px] top-8 w-[2px] h-full bg-slate-800" />
                    )}
                    <div className="relative z-10 h-6 w-6 rounded-full border-4 border-slate-900 bg-primary group-hover:scale-125 transition-transform" />
                    <div className="space-y-1 pb-4">
                      <p className="text-[10px] font-black text-primary uppercase tracking-widest">
                        {item.day} • {item.time}
                      </p>
                      <h4 className="font-bold text-slate-200">
                        {item.className}
                      </h4>
                      {item.meetingUrl && (
                        <button className="text-xs text-slate-500 hover:text-white flex items-center gap-1 mt-2 transition-colors">
                          <Video className="h-3 w-3" /> Digital Classroom
                          Available
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </aside>
      </div>

      {/* 5. THE SPATIAL DETAIL MODAL */}
      <AnimatePresence>
        {selectedClass && (
          <ModalContent
            enrollment={selectedClass}
            onClose={() => setSelectedId(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// --- SUB-COMPONENTS (Typesafe) ---

function ClassCard({
  enrollment,
  onClick,
}: {
  enrollment: Enrollment;
  onClick: () => void;
}) {
  const theme = getStatusTheme(enrollment.status);

  return (
    <motion.div layout>
      <Card
        className="group cursor-pointer border-border/40 bg-background/40 backdrop-blur-md hover:border-primary/50 transition-all hover:shadow-2xl hover:shadow-primary/5 rounded-[2rem] overflow-hidden"
        onClick={onClick}
      >
        <CardContent className="p-8">
          <div className="flex justify-between items-start mb-6">
            <Badge
              variant="outline"
              className={cn(
                "rounded-lg font-black tracking-widest text-[10px] border-none px-3 py-1",
                theme.bg,
                theme.color,
              )}
            >
              {enrollment.status}
            </Badge>
            <div className="p-2 bg-muted/50 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity">
              <ArrowUpRight className="h-4 w-4" />
            </div>
          </div>

          <div className="space-y-1 mb-8">
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
              {enrollment.classCode}
            </p>
            <h3 className="text-2xl font-black group-hover:text-primary transition-colors">
              {enrollment.className}
            </h3>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
              <span>Completion Velocity</span>
              <span className="text-foreground">{enrollment.progress}%</span>
            </div>
            <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${enrollment.progress}%` }}
                className="h-full bg-primary"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function AvailableCard({
  cls,
  onEnroll,
  isLoading,
}: {
  cls: AvailableClass;
  onEnroll: () => void;
  isLoading: boolean;
}) {
  return (
    <Card className="border-dashed border-2 border-border/60 hover:border-primary/50 bg-transparent transition-all rounded-[2rem]">
      <CardContent className="p-8 h-full flex flex-col justify-between">
        <div className="space-y-2">
          <Badge className="bg-primary/10 text-primary border-none font-bold">
            {cls.code}
          </Badge>
          <h3 className="text-xl font-bold">{cls.name}</h3>
          <p className="text-sm text-muted-foreground font-medium">
            with {cls.teacher}
          </p>
        </div>

        <div className="mt-8 flex items-center justify-between">
          <div className="text-xs font-bold text-muted-foreground">
            {cls.capacity - cls.enrolled} Slots Left
          </div>
          <Button
            onClick={onEnroll}
            disabled={isLoading}
            className="rounded-xl font-bold px-6 h-11"
          >
            {isLoading ? (
              <Loader2 className="animate-spin h-4 w-4" />
            ) : (
              "Request Enrollment"
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function ModalContent({
  enrollment,
  onClose,
}: {
  enrollment: Enrollment;
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xl"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 30 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 30 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-background w-full max-w-4xl h-[85vh] rounded-[3rem] shadow-3xl border border-white/10 overflow-hidden flex flex-col"
      >
        {/* Modal Header */}
        <div className="h-64 bg-slate-900 relative p-12 flex flex-col justify-end">
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
              backgroundSize: "24px 24px",
            }}
          />
          <Button
            onClick={onClose}
            className="absolute top-8 right-8 h-12 w-12 rounded-full bg-white/10 hover:bg-white/20 border-0"
            size="icon"
          >
            <X className="h-6 w-6 text-white" />
          </Button>

          <div className="relative z-10 space-y-2">
            <Badge className="bg-primary text-white border-none px-4 py-1 rounded-lg">
              {enrollment.classCode}
            </Badge>
            <h2 className="text-5xl font-black text-white">
              {enrollment.className}
            </h2>
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-12 grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="md:col-span-2 space-y-10">
            <section className="space-y-4">
              <h4 className="text-xs font-black uppercase tracking-widest text-primary">
                Intelligence Report
              </h4>
              <p className="text-xl text-muted-foreground leading-relaxed">
                You are currently in the top{" "}
                <span className="text-foreground font-bold italic">
                  15% of this class
                </span>
                . Your engagement levels have increased by 20% compared to last
                week.
              </p>
            </section>

            <section className="grid grid-cols-2 gap-4">
              <div className="p-6 rounded-3xl bg-muted/30 border space-y-1">
                <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">
                  Instructor
                </p>
                <p className="text-lg font-bold">{enrollment.teacher.name}</p>
              </div>
              <div className="p-6 rounded-3xl bg-muted/30 border space-y-1">
                <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">
                  Course Load
                </p>
                <p className="text-lg font-bold">Medium</p>
              </div>
            </section>
          </div>

          <div className="space-y-6">
            <Card className="rounded-[2rem] border-primary/20 bg-primary/5">
              <CardContent className="p-8 text-center space-y-4">
                <PlayCircle className="h-12 w-12 mx-auto text-primary" />
                <div className="space-y-1">
                  <p className="text-sm font-bold">Resume Next Lesson</p>
                  <p className="text-xs text-muted-foreground">
                    Advanced Theoretical Frameworks
                  </p>
                </div>
                <Button className="w-full rounded-xl py-6 font-bold">
                  Launch Environment
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

















// "use client";

// import { useState, useMemo } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { useRouter } from "next/navigation";
// import {
//   Calendar,
//   Clock,
//   FileText,
//   Download,
//   ChevronRight,
//   Search,
//   Grid3x3,
//   List,
//   ArrowUpRight,
// } from "lucide-react";

// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Progress } from "@/components/ui/progress";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Input } from "@/components/ui/input";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { ScrollArea } from "@/components/ui/scroll-area";

// // --- ANIMATION CONFIG ---
// const container = { show: { transition: { staggerChildren: 0.05 } } };
// const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

// export default function StudentClassesClient({
//   enrollments,
//   availableClasses,
//   stats,
//   schedule,
//   studentId,
// }: any) {
//   const router = useRouter();
//   const [query, setQuery] = useState("");
//   const [view, setView] = useState<"grid" | "list">("grid");
//   const [selectedCategory, setSelectedCategory] = useState("ALL");

//   // --- LOGIC: INTELLIGENT FILTERING ---
//   const filtered = useMemo(() => {
//     return enrollments.filter((e: any) => {
//       const matchesQuery =
//         e.class.name.toLowerCase().includes(query.toLowerCase()) ||
//         e.class.code.toLowerCase().includes(query.toLowerCase());
//       const matchesCat =
//         selectedCategory === "ALL" ||
//         e.class.subjects.some((s: any) => s.category === selectedCategory);
//       return matchesQuery && matchesCat;
//     });
//   }, [query, selectedCategory, enrollments]);

//   const categories = ["ALL", "QURAN", "ARABIC", "TAJWEED", "FIQH", "HADITH"];

//   return (
//     <motion.div
//       variants={container}
//       initial="hidden"
//       animate="show"
//       className="space-y-8 pb-20"
//     >
//       {/* --- APEX HUD HEADER --- */}
//       <motion.div
//         variants={item}
//         className="relative overflow-hidden rounded-[2.5rem] border border-primary/10 shadow-2xl bg-slate-950 text-white p-10"
//       >
//         <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/10 to-transparent pointer-events-none" />
//         <div className="relative flex flex-col lg:flex-row justify-between items-center gap-10">
//           <div className="space-y-4 text-center lg:text-left">
//             <div className="flex justify-center lg:justify-start gap-2">
//               <Badge className="bg-primary text-black font-bold px-4 py-1">
//                 ST-ID: {studentId}
//               </Badge>
//               <Badge variant="outline" className="border-white/20 text-white">
//                 Academic Year 2026
//               </Badge>
//             </div>
//             <h1 className="text-5xl lg:text-6xl font-black tracking-tighter">
//               Academic <span className="text-slate-500">Command</span>
//             </h1>
//             <p className="text-slate-400 font-medium text-lg max-w-md">
//               Centralized oversight of your classes, curriculum mastery, and
//               live studio sessions.
//             </p>
//           </div>

//           <div className="grid grid-cols-3 gap-6 bg-white/5 p-8 rounded-[2.5rem] border border-white/10 backdrop-blur-xl">
//             <HUDStat
//               label="Active"
//               value={stats.activeClasses}
//               color="text-primary"
//             />
//             <HUDStat
//               label="Progress"
//               value={`${stats.averageProgress}%`}
//               color="text-emerald-500"
//             />
//             <HUDStat label="Attendance" value="94%" color="text-blue-400" />
//           </div>
//         </div>
//       </motion.div>

//       {/* --- QUICK ACTION STRIP --- */}
//       <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
//         <div className="lg:col-span-8 flex flex-col md:flex-row gap-4">
//           <div className="relative flex-1 group">
//             <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-primary transition-colors" />
//             <Input
//               placeholder="Search classes, teachers, or codes..."
//               className="h-14 pl-12 rounded-2xl border-none bg-muted/50 focus:ring-primary shadow-inner"
//               value={query}
//               onChange={(e) => setQuery(e.target.value)}
//             />
//           </div>
//           <div className="flex gap-2 p-1 bg-muted/30 rounded-2xl border border-border/50">
//             <Button
//               variant={view === "grid" ? "secondary" : "ghost"}
//               size="icon"
//               onClick={() => setView("grid")}
//               className="rounded-xl h-12 w-12"
//             >
//               <Grid3x3 className="w-5 h-5" />
//             </Button>
//             <Button
//               variant={view === "list" ? "secondary" : "ghost"}
//               size="icon"
//               onClick={() => setView("list")}
//               className="rounded-xl h-12 w-12"
//             >
//               <List className="w-5 h-5" />
//             </Button>
//           </div>
//         </div>
//         <div className="lg:col-span-4 flex gap-2">
//           <Button className="flex-1 h-14 rounded-2xl bg-primary text-black font-bold shadow-lg shadow-primary/20">
//             <Calendar className="w-4 h-4 mr-2" /> Full Schedule
//           </Button>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
//         {/* --- MAIN CONTENT AREA --- */}
//         <div className="xl:col-span-8 space-y-8">
//           {/* Category Filter Pills */}
//           <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
//             {categories.map((cat) => (
//               <Button
//                 key={cat}
//                 onClick={() => setSelectedCategory(cat)}
//                 variant={selectedCategory === cat ? "default" : "outline"}
//                 className={`rounded-full px-6 h-10 font-bold transition-all ${selectedCategory === cat ? "bg-primary text-black border-none shadow-md shadow-primary/30" : "text-muted-foreground"}`}
//               >
//                 {cat}
//               </Button>
//             ))}
//           </div>

//           <Tabs defaultValue="my-classes" className="w-full">
//             <TabsList className="bg-transparent border-b border-border w-full justify-start rounded-none h-12 p-0 space-x-10">
//               <TabsTrigger
//                 value="my-classes"
//                 className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent font-black uppercase text-[11px] tracking-[0.2em] text-slate-500"
//               >
//                 My Curriculum ({filtered.length})
//               </TabsTrigger>
//               <TabsTrigger
//                 value="available"
//                 className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent font-black uppercase text-[11px] tracking-[0.2em] text-slate-500"
//               >
//                 Discovery Catalog
//               </TabsTrigger>
//             </TabsList>

//             <TabsContent value="my-classes" className="pt-8">
//               <div
//                 className={
//                   view === "grid"
//                     ? "grid grid-cols-1 md:grid-cols-2 gap-6"
//                     : "space-y-4"
//                 }
//               >
//                 <AnimatePresence mode="popLayout">
//                   {filtered.map((enrollment: any) => (
//                     <ClassApexCard
//                       key={enrollment.id}
//                       enrollment={enrollment}
//                       view={view}
//                     />
//                   ))}
//                 </AnimatePresence>
//               </div>
//             </TabsContent>
//           </Tabs>
//         </div>

//         {/* --- APEX SIDEBAR COCKPIT --- */}
//         <div className="xl:col-span-4 space-y-8">
//           {/* 1. Live Agenda (High Visual Density) */}
//           <Card className="border-none shadow-2xl rounded-[2.5rem] bg-[#080808] text-white overflow-hidden border border-white/5">
//             <CardHeader className="border-b border-white/5 p-8 flex flex-row items-center justify-between bg-gradient-to-br from-white/[0.02] to-transparent">
//               <CardTitle className="text-xl font-black flex items-center gap-3">
//                 <Clock className="w-6 h-6 text-primary" /> Live Agenda
//               </CardTitle>
//               <Badge
//                 variant="outline"
//                 className="border-primary/20 text-primary"
//               >
//                 Next 7 Days
//               </Badge>
//             </CardHeader>
//             <CardContent className="p-0">
//               <ScrollArea className="h-[480px]">
//                 <div className="p-8 space-y-10">
//                   {[
//                     "Monday",
//                     "Tuesday",
//                     "Wednesday",
//                     "Thursday",
//                     "Friday",
//                     "Saturday",
//                     "Sunday",
//                   ].map((day) => {
//                     const sessions = schedule.filter(
//                       (s: any) => s.dayName === day,
//                     );
//                     if (sessions.length === 0) return null;
//                     return (
//                       <div key={day} className="space-y-6">
//                         <p className="text-[11px] font-black uppercase text-slate-500 tracking-[0.3em]">
//                           {day}
//                         </p>
//                         {sessions.map((s: any) => (
//                           <div key={s.id} className="flex gap-6 group relative">
//                             <div className="text-center min-w-[60px]">
//                               <p className="text-sm font-black text-white">
//                                 {s.startTime}
//                               </p>
//                               <p className="text-[10px] text-slate-500 font-bold uppercase mt-1">
//                                 Start
//                               </p>
//                             </div>
//                             <div className="w-[1px] bg-white/10 rounded-full group-hover:bg-primary transition-colors" />
//                             <div className="pb-2">
//                               <p className="text-sm font-bold text-slate-200 group-hover:text-primary transition-colors">
//                                 {s.class.name}
//                               </p>
//                               <p className="text-[10px] text-slate-500 font-medium uppercase mt-1">
//                                 Lead: {s.class.teacher.name}
//                               </p>
//                               {s.meetingUrl && (
//                                 <Button
//                                   variant="link"
//                                   className="text-primary text-[10px] p-0 h-auto mt-2"
//                                 >
//                                   Join Virtual Studio{" "}
//                                   <ArrowUpRight className="w-3 h-3 ml-1" />
//                                 </Button>
//                               )}
//                             </div>
//                           </div>
//                         ))}
//                       </div>
//                     );
//                   })}
//                 </div>
//               </ScrollArea>
//             </CardContent>
//           </Card>

//           {/* 2. Global Material Access */}
//           <Card className="border-none shadow-xl rounded-[2.5rem] p-8 space-y-6">
//             <div className="flex items-center justify-between">
//               <h3 className="font-black text-lg flex items-center gap-2">
//                 <Download className="w-5 h-5 text-primary" /> Download Center
//               </h3>
//               <Button
//                 variant="ghost"
//                 size="sm"
//                 className="text-[10px] font-black uppercase tracking-widest"
//               >
//                 Archive
//               </Button>
//             </div>
//             <div className="space-y-3">
//               {enrollments
//                 .flatMap((e: any) => e.class.recentMaterials)
//                 .slice(0, 5)
//                 .map((m: any) => (
//                   <div
//                     key={m.id}
//                     className="flex items-center justify-between p-4 rounded-2xl bg-muted/30 group hover:bg-primary/5 transition-all cursor-pointer"
//                   >
//                     <div className="flex items-center gap-4">
//                       <div className="p-2.5 bg-background rounded-xl text-slate-400 group-hover:text-primary group-hover:bg-primary/10 transition-all">
//                         <FileText className="w-4 h-4" />
//                       </div>
//                       <div className="max-w-[160px]">
//                         <p className="text-xs font-bold truncate text-slate-700">
//                           {m.title}
//                         </p>
//                         <p className="text-[9px] text-slate-400 font-black uppercase mt-0.5">
//                           {m.type}
//                         </p>
//                       </div>
//                     </div>
//                     <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-primary group-hover:translate-x-1 transition-all" />
//                   </div>
//                 ))}
//             </div>
//           </Card>
//         </div>
//       </div>
//     </motion.div>
//   );
// }

// // --- SUB-COMPONENT: HUD STAT ---
// function HUDStat({
//   label,
//   value,
//   color,
// }: {
//   label: string;
//   value: string | number;
//   color: string;
// }) {
//   return (
//     <div className="text-center px-4">
//       <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest mb-2">
//         {label}
//       </p>
//       <p className={`text-3xl font-black ${color} tracking-tighter`}>{value}</p>
//     </div>
//   );
// }

// // --- SUB-COMPONENT: CLASS APEX CARD ---
// function ClassApexCard({ enrollment, view }: any) {
//   const { class: cls, progress, attendanceRate, status } = enrollment;

//   return (
//     <motion.div layout variants={item} whileHover={{ y: -5 }}>
//       <Card
//         className={`border-none shadow-xl bg-card overflow-hidden group hover:shadow-primary/5 transition-all duration-500 ${view === "list" ? "flex flex-row items-center p-2" : ""}`}
//       >
//         <div
//           className={
//             view === "grid"
//               ? "h-1.5 bg-muted group-hover:bg-primary transition-all duration-500"
//               : "w-1.5 h-16 bg-primary rounded-full ml-4"
//           }
//         />

//         <CardContent
//           className={`p-8 ${view === "list" ? "flex-1 flex items-center justify-between py-4" : "space-y-8"}`}
//         >
//           {/* Header Info */}
//           <div
//             className={
//               view === "list" ? "flex items-center gap-6" : "space-y-6"
//             }
//           >
//             <div className="flex justify-between items-start">
//               <div className="flex gap-2">
//                 <Badge className="bg-primary/10 text-primary border-none font-black text-[10px] uppercase tracking-widest">
//                   {cls.code}
//                 </Badge>
//                 <Badge
//                   variant="outline"
//                   className="border-border text-[10px] uppercase font-bold text-slate-400"
//                 >
//                   {cls.level}
//                 </Badge>
//               </div>
//               {view === "grid" && (
//                 <Avatar className="h-12 w-12 border-2 border-background shadow-lg">
//                   <AvatarImage src={cls.teacher.image || ""} />
//                   <AvatarFallback>T</AvatarFallback>
//                 </Avatar>
//               )}
//             </div>

//             <div>
//               <h3
//                 className={`${view === "list" ? "text-lg" : "text-2xl"} font-black leading-tight group-hover:text-primary transition-colors`}
//               >
//                 {cls.name}
//               </h3>
//               <p className="text-xs text-slate-500 font-medium mt-1">
//                 Led by{" "}
//                 <span className="text-slate-700 font-bold">
//                   {cls.teacher.name}
//                 </span>
//               </p>
//             </div>
//           </div>

//           {/* Metrics Hud for Card */}
//           <div
//             className={
//               view === "list"
//                 ? "flex items-center gap-10"
//                 : "grid grid-cols-2 gap-4 bg-muted/30 p-4 rounded-2xl"
//             }
//           >
//             <div className="space-y-1">
//               <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
//                 Attendance
//               </p>
//               <p
//                 className={`text-sm font-black ${attendanceRate > 90 ? "text-emerald-500" : "text-amber-500"}`}
//               >
//                 {attendanceRate}%
//               </p>
//             </div>
//             <div className="space-y-1">
//               <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
//                 Progress
//               </p>
//               <p className="text-sm font-black text-primary">{progress}%</p>
//             </div>
//           </div>

//           {/* Curriculum Bar */}
//           <div
//             className={view === "list" ? "hidden sm:block w-48" : "space-y-2"}
//           >
//             <div className="flex justify-between text-[10px] font-black uppercase text-slate-500">
//               <span>Course Mastery</span>
//               <span>{progress}%</span>
//             </div>
//             <Progress value={progress} className="h-1.5" />
//           </div>

//           {/* Footer Actions */}
//           <div className={view === "list" ? "flex gap-2" : "flex gap-2 pt-2"}>
//             <Button
//               variant="outline"
//               className="flex-1 rounded-xl font-bold h-11 border-border/50 hover:bg-muted text-xs uppercase tracking-widest"
//             >
//               Resources
//             </Button>
//             <Button className="flex-1 rounded-xl font-bold h-11 bg-primary text-black shadow-lg shadow-primary/20 text-xs uppercase tracking-widest group-hover:bg-primary/90">
//               Go to Studio
//             </Button>
//           </div>
//         </CardContent>
//       </Card>
//     </motion.div>
//   );
// }
