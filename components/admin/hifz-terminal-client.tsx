"use client";

import { useState, useTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  Star,
  AlertCircle,
  CheckCircle2,
  History,
  Plus,
  Save,
  MessageSquare,
  ListFilter,
  ChevronRight,
  Hash,
  Award,
  Timer,
  Loader2,
  X,
  Search,
} from "lucide-react";
import { logHifzSession } from "@/app/actions/admin/hifz/actions";

// Brand UI
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

export default function HifzTerminalClient({
  initialStudents,
}: {
  initialStudents: any[];
}) {
  const [isPending, startTransition] = useTransition();
  const [selectedStudent, setSelectedStudent] = useState<any>(
    initialStudents[0],
  );
  const [search, setSearch] = useState("");

  const [formData, setFormData] = useState({
    surah: "",
    startAyah: "1",
    endAyah: "",
    status: "PASS",
    mistakes: "0",
    comments: "",
  });

  const filteredStudents = initialStudents.filter((s) =>
    s.user.name.toLowerCase().includes(search.toLowerCase()),
  );

  const handleSubmit = async () => {
    if (!formData.surah || !formData.endAyah)
      return toast.error("Surah and Ayah range required");

    startTransition(async () => {
      try {
        await logHifzSession({ ...formData, studentId: selectedStudent.id });
        toast.success(`Hifz Logged for ${selectedStudent.user.name}`, {
          icon: <Award className="text-gold" />,
        });
        // Reset partial form
        setFormData((prev) => ({
          ...prev,
          startAyah: (parseInt(prev.endAyah) + 1).toString(),
          endAyah: "",
          mistakes: "0",
        }));
      } catch (e) {
        toast.error("Handshake failed with database");
      }
    });
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* --- ELITE HEADER --- */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-gold animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">
              Quranic Mastery Terminal
            </span>
          </div>
          <h1 className="text-5xl font-black tracking-tighter text-slate-900 dark:text-white">
            Hifz <span className="text-primary-700">Recording</span>
          </h1>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* --- LEFT: STUDENT FEED --- */}
        <div className="lg:col-span-4 space-y-4">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              placeholder="Filter nodes..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-14 pl-12 glass-surface rounded-2xl outline-none focus:ring-2 ring-primary/20 dark:bg-slate-900"
            />
          </div>

          <div className="space-y-3 max-h-[70vh] overflow-y-auto no-scrollbar pr-2">
            {filteredStudents.map((student) => (
              <motion.div
                key={student.id}
                onClick={() => setSelectedStudent(student)}
                className={`p-4 rounded-3xl border-2 cursor-pointer transition-all ${
                  selectedStudent?.id === student.id
                    ? "bg-primary-700 border-primary-700 text-white shadow-royal scale-[1.02]"
                    : "bg-white dark:bg-slate-900 border-transparent hover:border-primary-100"
                }`}
              >
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12 border-2 border-white/20">
                    <AvatarImage src={student.user.image} />
                    <AvatarFallback className="font-black">
                      {student.user.name[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 overflow-hidden">
                    <p
                      className={`text-sm font-black truncate ${selectedStudent?.id === student.id ? "text-white" : "text-slate-900 dark:text-white"}`}
                    >
                      {student.user.name}
                    </p>
                    <p
                      className={`text-[10px] font-bold uppercase tracking-tight ${selectedStudent?.id === student.id ? "text-primary-100" : "text-slate-400"}`}
                    >
                      {student.studentId} • {student.currentLevel || "Standard"}
                    </p>
                  </div>
                  {selectedStudent?.id === student.id && (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* --- RIGHT: THE LOGGING ENGINE --- */}
        <div className="lg:col-span-8 space-y-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedStudent?.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              {/* Active Profile Stats */}
              <div className="institutional-card glass-surface p-8 grid grid-cols-2 md:grid-cols-4 gap-6">
                <StatMini
                  label="Surahs Completed"
                  value={selectedStudent?.quranProgress?.length || 0}
                  icon={CheckCircle2}
                  color="emerald"
                />
                <StatMini
                  label="Last Rating"
                  value={selectedStudent?.hifzLogs[0]?.status || "N/A"}
                  icon={Star}
                  color="gold"
                />
                <StatMini
                  label="Avg Mistakes"
                  value="1.4"
                  icon={AlertCircle}
                  color="rose"
                />
                <StatMini
                  label="Juz Level"
                  value={selectedStudent?.hifzLevel || "30"}
                  icon={Hash}
                  color="primary"
                />
              </div>

              {/* Recording Terminal */}
              <div className="institutional-card bg-white dark:bg-slate-900 p-8 md:p-12 space-y-10 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-5">
                  <BookOpen className="h-48 w-48 rotate-12" />
                </div>

                <div className="relative z-10 space-y-8">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-black tracking-tight">
                      Session{" "}
                      <span className="text-primary-700">Parameters</span>
                    </h3>
                    <Badge className="bg-primary-50 text-primary-700 border-primary-100 dark:bg-primary-900/30">
                      Active Recording
                    </Badge>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-3">
                      <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">
                        Surah Number
                      </Label>
                      <Input
                        type="number"
                        className="h-16 rounded-2xl bg-slate-50 dark:bg-slate-800 border-0 text-xl font-black px-6"
                        value={formData.surah}
                        onChange={(e) =>
                          setFormData({ ...formData, surah: e.target.value })
                        }
                        placeholder="1-114"
                      />
                    </div>
                    <div className="space-y-3">
                      <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">
                        Ayah Start
                      </Label>
                      <Input
                        type="number"
                        className="h-16 rounded-2xl bg-slate-50 dark:bg-slate-800 border-0 text-xl font-black px-6"
                        value={formData.startAyah}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            startAyah: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="space-y-3">
                      <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">
                        Ayah End
                      </Label>
                      <Input
                        type="number"
                        className="h-16 rounded-2xl bg-slate-50 dark:bg-slate-800 border-0 text-xl font-black px-6"
                        value={formData.endAyah}
                        onChange={(e) =>
                          setFormData({ ...formData, endAyah: e.target.value })
                        }
                        placeholder="..."
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">
                        Evaluation Status
                      </Label>
                      <Select
                        value={formData.status}
                        onValueChange={(v) =>
                          setFormData({ ...formData, status: v })
                        }
                      >
                        <SelectTrigger className="h-16 rounded-2xl border-0 bg-slate-50 dark:bg-slate-800 font-black">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="rounded-2xl border-0 shadow-2xl">
                          <SelectItem
                            value="EXCELLENT"
                            className="font-bold py-3 text-emerald-600"
                          >
                            EXCELLENT (Mumtaz)
                          </SelectItem>
                          <SelectItem
                            value="PASS"
                            className="font-bold py-3 text-indigo-600"
                          >
                            PASS (Jayyid)
                          </SelectItem>
                          <SelectItem
                            value="NEEDS_PRACTICE"
                            className="font-bold py-3 text-amber-600"
                          >
                            NEEDS PRACTICE
                          </SelectItem>
                          <SelectItem
                            value="FAIL"
                            className="font-bold py-3 text-rose-600"
                          >
                            FAIL (I'adah)
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-3">
                      <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">
                        Mistakes Count
                      </Label>
                      <div className="flex gap-2">
                        {[0, 1, 2, 3, 4, 5].map((n) => (
                          <button
                            key={n}
                            onClick={() =>
                              setFormData({
                                ...formData,
                                mistakes: n.toString(),
                              })
                            }
                            className={`flex-1 h-16 rounded-2xl font-black transition-all ${
                              formData.mistakes === n.toString()
                                ? "bg-primary-700 text-white shadow-lg"
                                : "bg-slate-50 dark:bg-slate-800 text-slate-400"
                            }`}
                          >
                            {n}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">
                      Teacher's Observations
                    </Label>
                    <Textarea
                      className="rounded-[2rem] bg-slate-50 dark:bg-slate-800 border-0 p-6 min-h-[120px] font-medium"
                      placeholder="Tajweed notes, fluency, melody observations..."
                      value={formData.comments}
                      onChange={(e) =>
                        setFormData({ ...formData, comments: e.target.value })
                      }
                    />
                  </div>

                  <Button
                    onClick={handleSubmit}
                    disabled={isPending}
                    className="w-full h-20 rounded-[2.5rem] bg-primary-700 hover:bg-primary-800 text-white font-black text-xl shadow-royal transition-all hover:scale-[1.01] active:scale-95 group"
                  >
                    {isPending ? (
                      <Loader2 className="animate-spin" />
                    ) : (
                      <span className="flex items-center gap-3">
                        <Save className="h-6 w-6" /> COMMIT TO REGISTRY
                      </span>
                    )}
                  </Button>
                </div>
              </div>

              {/* Recent History Feed */}
              <div className="institutional-card glass-surface p-8">
                <div className="flex items-center gap-2 mb-6">
                  <History className="h-4 w-4 text-primary-700" />
                  <h4 className="text-xs font-black uppercase tracking-widest text-slate-400">
                    Node History
                  </h4>
                </div>
                <div className="space-y-4">
                  {selectedStudent?.hifzLogs.length > 0 ? (
                    selectedStudent.hifzLogs.map((log: any) => (
                      <div
                        key={log.id}
                        className="flex items-center justify-between p-4 bg-white/50 dark:bg-slate-900/50 rounded-2xl border border-white/20"
                      >
                        <div>
                          <p className="text-sm font-black text-slate-900 dark:text-white">
                            Surah {log.surah} ({log.startAyah}-{log.endAyah})
                          </p>
                          <p className="text-[10px] font-bold text-slate-400 uppercase">
                            {new Date(log.date).toLocaleDateString()}
                          </p>
                        </div>
                        <Badge
                          className={`${log.status === "EXCELLENT" ? "bg-emerald-500" : "bg-primary-700"} text-[9px] font-black`}
                        >
                          {log.status}
                        </Badge>
                      </div>
                    ))
                  ) : (
                    <p className="text-center py-6 text-slate-400 font-bold uppercase text-[10px]">
                      No historical data found
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function StatMini({ label, value, icon: Icon, color }: any) {
  const styles: any = {
    emerald: "text-emerald-600 bg-emerald-50",
    gold: "text-gold bg-gold/5",
    rose: "text-rose-600 bg-rose-50",
    primary: "text-primary-700 bg-primary-50",
  };
  return (
    <div className="flex flex-col items-center text-center space-y-2">
      <div className={`p-3 rounded-2xl ${styles[color]}`}>
        <Icon className="h-4 w-4" />
      </div>
      <div>
        <p className="text-[8px] font-black uppercase tracking-tighter text-slate-400">
          {label}
        </p>
        <p className="text-sm font-black text-slate-900 dark:text-white">
          {value}
        </p>
      </div>
    </div>
  );
}
