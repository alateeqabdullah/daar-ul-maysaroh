"use client";

import { useState, useTransition, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  Search,
  ChevronRight,
  Zap,
  CheckCircle2,
  Plus,
  UserPlus,
  Filter,
  ShieldCheck,
  ArrowRight,
  Loader2,
  GraduationCap,
} from "lucide-react";
import { bulkEnroll } from "@/app/actions/admin/enrollment/actions";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

export default function EnrollmentClient({ classes, students }: any) {
  const [isPending, startTransition] = useTransition();
  const [selectedClassId, setSelectedClassId] = useState<string | null>(null);
  const [selectedStudentIds, setSelectedStudentIds] = useState<string[]>([]);
  const [search, setSearch] = useState("");

  const targetClass = useMemo(
    () => classes.find((c: any) => c.id === selectedClassId),
    [selectedClassId, classes],
  );

  // Logic: Only show students NOT already in the selected class
  const availableStudents = useMemo(() => {
    return students.filter((s: any) => {
      const isAlreadyIn = s.enrollments.some(
        (e: any) => e.classId === selectedClassId,
      );
      const matchesSearch =
        s.user.name.toLowerCase().includes(search.toLowerCase()) ||
        s.studentId.toLowerCase().includes(search.toLowerCase());
      return !isAlreadyIn && matchesSearch;
    });
  }, [students, selectedClassId, search]);

  const toggleStudent = (id: string) => {
    setSelectedStudentIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const handleEnroll = () => {
    if (!selectedClassId || selectedStudentIds.length === 0)
      return toast.error("Select both class and students");

    startTransition(async () => {
      try {
        const res = await bulkEnroll({
          classId: selectedClassId,
          studentIds: selectedStudentIds,
          type: "REGULAR",
        });
        if (res.success) {
          toast.success(
            `${res.count} Students Injected into ${targetClass.name}`,
          );
          setSelectedStudentIds([]);
        }
      } catch (e: any) {
        toast.error(e.message);
      }
    });
  };

  return (
    <div className="max-w-[1600px] mx-auto space-y-8">
      {/* --- HEADER --- */}
      <header className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-700 dark:text-primary-300">
              Deployment Engine
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter dark:text-white leading-none">
            Enrollment <span className="text-primary-700">Terminal</span>
          </h1>
        </div>

        {selectedStudentIds.length > 0 && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            <Button
              onClick={handleEnroll}
              disabled={isPending}
              className="h-20 px-12 rounded-[2rem] bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-black text-xl shadow-2xl hover:scale-105 transition-all"
            >
              {isPending ? (
                <Loader2 className="animate-spin mr-2" />
              ) : (
                <Zap className="mr-3 h-6 w-6 text-gold" />
              )}
              INITIATE BULK INJECTION ({selectedStudentIds.length})
            </Button>
          </motion.div>
        )}
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* --- LEFT COLUMN: CLASS SELECTION --- */}
        <div className="lg:col-span-4 space-y-6">
          <div className="institutional-card glass-surface p-8 space-y-6">
            <h3 className="text-xl font-black tracking-tight uppercase">
              1. Select Target Node
            </h3>
            <div className="space-y-3 max-h-[60vh] overflow-y-auto no-scrollbar">
              {classes.map((c: any) => (
                <div
                  key={c.id}
                  onClick={() => setSelectedClassId(c.id)}
                  className={`p-5 rounded-[2rem] border-2 cursor-pointer transition-all ${
                    selectedClassId === c.id
                      ? "bg-primary-700 border-primary-700 text-white shadow-royal scale-[1.02]"
                      : "bg-white dark:bg-slate-900 border-transparent hover:border-primary-100"
                  }`}
                >
                  <div className="flex justify-between items-start mb-4">
                    <Badge
                      className={
                        selectedClassId === c.id
                          ? "bg-white/20"
                          : "bg-primary-50 text-primary-700"
                      }
                    >
                      {c.code}
                    </Badge>
                    <Users
                      className={`h-4 w-4 ${selectedClassId === c.id ? "text-primary-200" : "text-slate-300"}`}
                    />
                  </div>
                  <p className="text-lg font-black leading-tight">{c.name}</p>
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between text-[9px] font-black uppercase">
                      <span>Capacity</span>
                      <span>
                        {c._count.enrollments} / {c.capacity}
                      </span>
                    </div>
                    <Progress
                      value={(c._count.enrollments / c.capacity) * 100}
                      className={selectedClassId === c.id ? "bg-white/20" : ""}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* --- RIGHT COLUMN: STUDENT SELECTION --- */}
        <div className="lg:col-span-8 space-y-6">
          <div className="institutional-card bg-white dark:bg-slate-900 p-8 md:p-12 shadow-2xl min-h-[70vh] flex flex-col">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-10 pb-8 border-b dark:border-slate-800">
              <div>
                <h3 className="text-2xl font-black tracking-tight uppercase">
                  2. Identify Available Nodes
                </h3>
                <p className="text-xs font-bold text-slate-400 mt-1">
                  Showing {availableStudents.length} candidates for injection
                </p>
              </div>
              <div className="relative w-full md:w-80 group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  placeholder="Search by name or ID..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full h-14 pl-12 glass-surface rounded-2xl outline-none focus:ring-2 ring-primary-700/10 dark:bg-slate-800"
                />
              </div>
            </div>

            {!selectedClassId ? (
              <div className="flex-1 flex flex-col items-center justify-center opacity-20 text-center space-y-4">
                <ShieldCheck className="h-24 w-24" />
                <p className="font-black uppercase tracking-[0.3em]">
                  Locked: Select Target Class First
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <AnimatePresence mode="popLayout">
                  {availableStudents.map((s: any) => (
                    <motion.div
                      layout
                      key={s.id}
                      onClick={() => toggleStudent(s.id)}
                      className={`p-4 rounded-[2rem] border-2 cursor-pointer flex items-center justify-between group transition-all ${
                        selectedStudentIds.includes(s.id)
                          ? "bg-emerald-500/10 border-emerald-500 shadow-lg shadow-emerald-500/10"
                          : "bg-slate-50 dark:bg-slate-800 border-transparent hover:border-slate-200"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          <Avatar className="h-12 w-12 border-2 border-white dark:border-slate-700">
                            <AvatarImage src={s.user.image} />
                            <AvatarFallback className="font-black">
                              {s.user.name[0]}
                            </AvatarFallback>
                          </Avatar>
                          {selectedStudentIds.includes(s.id) && (
                            <div className="absolute -top-1 -right-1 h-5 w-5 bg-emerald-500 rounded-full flex items-center justify-center text-white border-2 border-white">
                              <CheckCircle2 className="h-3 w-3" />
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-black dark:text-white leading-none mb-1">
                            {s.user.name}
                          </p>
                          <p className="text-[10px] font-bold text-slate-400 uppercase">
                            {s.studentId}
                          </p>
                        </div>
                      </div>
                      <Badge
                        variant="outline"
                        className="text-[8px] opacity-0 group-hover:opacity-100 transition-opacity font-black"
                      >
                        SELECT NODE
                      </Badge>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}

            {selectedClassId && availableStudents.length === 0 && (
              <div className="flex-1 flex flex-col items-center justify-center text-slate-300">
                <GraduationCap className="h-16 w-16 mb-4 opacity-10" />
                <p className="font-bold uppercase text-xs">
                  No eligible students found for this class node
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* --- MOBILE ACTION BAR --- */}
      {selectedStudentIds.length > 0 && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 w-[90%] md:hidden">
          <Button
            onClick={handleEnroll}
            disabled={isPending}
            className="w-full h-16 rounded-2xl bg-primary-700 text-white font-black shadow-royal"
          >
            {isPending
              ? "INJECTING..."
              : `ENROLL ${selectedStudentIds.length} NODES`}
          </Button>
        </div>
      )}
    </div>
  );
}
