"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, Plus, MoreVertical, Edit, Trash2, 
  FileText, Calendar, CheckCircle2, AlertCircle, 
  BookOpen, Clock, Download, LayoutGrid, List as ListIcon,
  Loader2, X, ChevronRight
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Counter } from "@/components/admin/dashboard-ui";

// --- ANIMATION ---
const containerVariants = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.05 } } };
const itemVariants = { hidden: { y: 20, opacity: 0 }, show: { y: 0, opacity: 1 } };

interface Props {
  initialAssignments: any[];
  classes: any[];
  stats: any;
}

export default function TeacherAssignmentsClient({
  initialAssignments, classes, stats
}: Props) {
  const router = useRouter();
  const [assignments, setAssignments] = useState(initialAssignments);
  const [isLoading, setIsLoading] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterClass, setFilterClass] = useState("ALL");
  
  // Modal
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "", description: "", classId: "", type: "HOMEWORK", totalMarks: "100", dueDate: ""
  });

  // Filter Logic
  const filteredAssignments = useMemo(() => {
    return assignments.filter(a => {
      const term = searchQuery.toLowerCase();
      const matchesSearch = a.title.toLowerCase().includes(term) || a.subjectName.toLowerCase().includes(term);
      const matchesClass = filterClass === "ALL" || a.className === filterClass;
      return matchesSearch && matchesClass;
    });
  }, [assignments, searchQuery, filterClass]);

  // --- ACTIONS ---

  const handleCreate = async () => {
    if(!formData.title || !formData.classId || !formData.dueDate) return toast.error("Required fields missing");
    setIsLoading(true);
    
    try {
      const res = await fetch("/api/teacher/assignments/manage", {
        method: "POST",
        body: JSON.stringify({ action: "CREATE", data: formData })
      });
      const result = await res.json();
      if(!res.ok) throw new Error(result.error);
      
      setAssignments([result.assignment, ...assignments]);
      setIsAddModalOpen(false);
      setFormData({ title: "", description: "", classId: "", type: "HOMEWORK", totalMarks: "100", dueDate: "" });
      toast.success("Assignment Created");
    } catch {
      toast.error("Failed to create");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if(!confirm("Delete this assignment?")) return;
    setAssignments(prev => prev.filter(a => a.id !== id));
    try {
      await fetch("/api/teacher/assignments/manage", {
        method: "POST",
        body: JSON.stringify({ action: "DELETE", assignmentId: id })
      });
      toast.success("Deleted");
    } catch {
      toast.error("Delete failed");
    }
  };

  // --- HELPERS ---
  const getDaysLeft = (date: string) => {
    const diff = Math.ceil((new Date(date).getTime() - new Date().getTime()) / (1000 * 3600 * 24));
    if (diff < 0) return "Expired";
    if (diff === 0) return "Due Today";
    return `${diff} Days Left`;
  };

  const getStatusColor = (date: string) => {
    const diff = (new Date(date).getTime() - new Date().getTime()) / (1000 * 3600 * 24);
    if (diff < 0) return "text-rose-600 bg-rose-50 border-rose-200";
    if (diff < 3) return "text-amber-600 bg-amber-50 border-amber-200";
    return "text-emerald-600 bg-emerald-50 border-emerald-200";
  };

  const statCards = [
    { label: "Total Assignments", value: stats.total, icon: FileText, color: "from-blue-500 to-indigo-500", shadow: "shadow-blue-500/20" },
    { label: "Active", value: stats.active, icon: Calendar, color: "from-emerald-500 to-teal-500", shadow: "shadow-emerald-500/20" },
    { label: "Overdue", value: stats.overdue, icon: AlertCircle, color: "from-rose-500 to-red-500", shadow: "shadow-rose-500/20" },
    { label: "Submissions", value: stats.submissions, icon: CheckCircle2, color: "from-amber-400 to-orange-500", shadow: "shadow-amber-500/20" },
  ];

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="show" className="space-y-8 pb-10">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Assignments</h1>
          <p className="text-muted-foreground mt-1">Create and manage classwork</p>
        </div>
        <div className="flex gap-2">
           <div className="flex items-center bg-muted p-1 rounded-lg border">
              <Button size="icon" variant={viewMode === "grid" ? "white" : "ghost"} onClick={() => setViewMode("grid")}><LayoutGrid className="h-4 w-4"/></Button>
              <Button size="icon" variant={viewMode === "list" ? "white" : "ghost"} onClick={() => setViewMode("list")}><ListIcon className="h-4 w-4"/></Button>
            </div>
           <Button className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-md hover:scale-105 transition-all gap-2" onClick={() => setIsAddModalOpen(true)}>
             <Plus className="h-4 w-4 mr-2" /> Create Assignment
           </Button>
        </div>
      </div>

      {/* STATS */}
      <motion.div variants={containerVariants} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat, i) => (
          <motion.div key={i} variants={itemVariants}>
            <Card className="border-none shadow-sm bg-white/50 backdrop-blur-sm dark:bg-slate-900/50 hover:shadow-md transition-all relative overflow-hidden">
               <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${stat.color} opacity-10 rounded-bl-full`} />
               <CardContent className="p-6 relative z-10 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase">{stat.label}</p>
                    <div className="text-2xl font-bold mt-2"><Counter value={stat.value} /></div>
                  </div>
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} text-white ${stat.shadow} shadow-lg`}><stat.icon className="h-6 w-6" /></div>
               </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* FILTERS */}
      <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 bg-white/60 dark:bg-slate-900/60 backdrop-blur-md p-4 rounded-xl border shadow-sm">
        <div className="relative flex-1">
           <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
           <Input placeholder="Search assignments..." className="pl-9 bg-white dark:bg-slate-950 border-muted" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
        </div>
        <Select value={filterClass} onValueChange={setFilterClass}>
          <SelectTrigger className="w-[180px] bg-white dark:bg-slate-950 border-muted"><SelectValue placeholder="Filter Class" /></SelectTrigger>
          <SelectContent><SelectItem value="ALL">All Classes</SelectItem>{classes.map((c: any) => <SelectItem key={c.id} value={c.name}>{c.name}</SelectItem>)}</SelectContent>
        </Select>
      </motion.div>

      {/* GRID VIEW */}
      {viewMode === "grid" ? (
        <motion.div variants={containerVariants} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredAssignments.map((a) => (
            <motion.div key={a.id} variants={itemVariants} layoutId={a.id} className="cursor-pointer" onClick={() => router.push(`/teacher/assignments/${a.id}`)}>
              <Card className="group h-full border hover:border-indigo-300 dark:hover:border-indigo-800 transition-all hover:shadow-xl bg-card">
                 <CardContent className="p-6 flex flex-col h-full">
                    <div className="flex justify-between items-start mb-4">
                       <Badge variant="outline" className={cn("text-xs font-bold border", getStatusColor(a.dueDate))}>{getDaysLeft(a.dueDate)}</Badge>
                       <DropdownMenu>
                          <DropdownMenuTrigger asChild><Button size="icon" variant="ghost" className="h-8 w-8 -mr-2"><MoreVertical className="h-4 w-4"/></Button></DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                             <DropdownMenuItem onClick={() => router.push(`/teacher/assignments/${a.id}`)}>Grade Submissions</DropdownMenuItem>
                             <DropdownMenuItem onClick={() => handleDelete(a.id)} className="text-red-600"><Trash2 className="mr-2 h-4 w-4"/> Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                       </DropdownMenu>
                    </div>
                    <h3 className="font-bold text-lg mb-2 line-clamp-2">{a.title}</h3>
                    <p className="text-xs text-muted-foreground line-clamp-2 mb-4">{a.description || "No description."}</p>
                    
                    <div className="mt-auto pt-4 border-t flex justify-between items-center text-xs text-muted-foreground">
                       <span className="font-medium text-slate-700 dark:text-slate-300">{a.className}</span>
                       <span className="flex items-center gap-1"><BookOpen className="h-3 w-3"/> {a.submissionCount} Subs</span>
                    </div>
                 </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        /* LIST VIEW */
        <motion.div variants={containerVariants}>
          <Card className="border-none shadow-sm overflow-hidden bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
            <CardContent className="p-0">
               <div className="overflow-x-auto">
                 <table className="w-full text-sm">
                    <thead className="bg-muted/30 border-b"><tr><th className="px-6 py-4 text-left">Title</th><th className="px-6 py-4 text-left">Class</th><th className="px-6 py-4 text-left">Due Date</th><th className="px-6 py-4 text-left">Status</th><th className="px-6 py-4 text-right">Action</th></tr></thead>
                    <tbody className="divide-y">
                       {filteredAssignments.map((a) => (
                          <motion.tr key={a.id} variants={itemVariants} className="group hover:bg-muted/40 transition-colors cursor-pointer" onClick={() => router.push(`/teacher/assignments/${a.id}`)}>
                             <td className="px-6 py-4 font-medium">{a.title}</td>
                             <td className="px-6 py-4">{a.className}</td>
                             <td className="px-6 py-4 text-muted-foreground">{new Date(a.dueDate).toLocaleDateString()}</td>
                             <td className="px-6 py-4"><Badge variant="outline" className={getStatusColor(a.dueDate)}>{getDaysLeft(a.dueDate)}</Badge></td>
                             <td className="px-6 py-4 text-right"><ChevronRight className="h-4 w-4 ml-auto text-muted-foreground" /></td>
                          </motion.tr>
                       ))}
                    </tbody>
                 </table>
               </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* ADD MODAL */}
      <AnimatePresence>
        {isAddModalOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
             <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} className="bg-white dark:bg-slate-950 w-full max-w-lg rounded-2xl shadow-2xl border p-6">
                <div className="flex justify-between items-center mb-6"><h2 className="text-xl font-bold">New Assignment</h2><Button size="icon" variant="ghost" onClick={() => setIsAddModalOpen(false)}><X className="h-5 w-5"/></Button></div>
                <div className="grid gap-4">
                   <div className="space-y-1"><Label>Title</Label><Input value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} placeholder="e.g. Surah Review" /></div>
                   <div className="space-y-1"><Label>Description</Label><Textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} /></div>
                   <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1"><Label>Class</Label><Select onValueChange={v => setFormData({...formData, classId: v})}><SelectTrigger><SelectValue placeholder="Select"/></SelectTrigger><SelectContent>{classes.map((c:any) => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}</SelectContent></Select></div>
                      <div className="space-y-1"><Label>Due Date</Label><Input type="date" value={formData.dueDate} onChange={e => setFormData({...formData, dueDate: e.target.value})} /></div>
                   </div>
                   <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1"><Label>Type</Label><Select onValueChange={v => setFormData({...formData, type: v})}><SelectTrigger><SelectValue/></SelectTrigger><SelectContent><SelectItem value="HOMEWORK">Homework</SelectItem><SelectItem value="QUIZ">Quiz</SelectItem></SelectContent></Select></div>
                      <div className="space-y-1"><Label>Marks</Label><Input type="number" value={formData.totalMarks} onChange={e => setFormData({...formData, totalMarks: e.target.value})} /></div>
                   </div>
                   <Button className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 text-white" onClick={handleCreate} disabled={isLoading}>{isLoading ? <Loader2 className="animate-spin mr-2"/> : "Create"}</Button>
                </div>
             </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </motion.div>
  );
}