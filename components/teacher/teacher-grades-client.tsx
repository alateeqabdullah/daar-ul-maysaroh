"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, Plus, MoreVertical, Edit, Trash2, 
  BarChart3, TrendingUp, TrendingDown, Award,
  Download, LayoutGrid, List as ListIcon, Loader2, X,
  ArrowLeft, Save
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { getInitials, cn } from "@/lib/utils";
import { Counter } from "@/components/admin/dashboard-ui";
import { GradeData, ClassOption, GradeStats } from "@/types/grades";

// --- ANIMATION ---
const containerVariants = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.05 } } };
const itemVariants = { hidden: { y: 20, opacity: 0 }, show: { y: 0, opacity: 1 } };
const slideUpVariants = { hidden: { y: "100%" }, visible: { y: 0, transition: { type: "spring", damping: 25, stiffness: 200 } } };

interface Props {
  initialGrades: GradeData[];
  myClasses: ClassOption[];
  stats: GradeStats;
}

// Form State Interface
interface GradeFormState {
  classId: string;
  studentId: string;
  subjectId: string;
  score: string;
  totalScore: string;
  examType: "MIDTERM" | "FINAL" | "QUIZ" | "ASSIGNMENT" | "RECITATION_TEST" | "MEMORIZATION_TEST" | "ORAL_EXAM" | "WRITTEN_EXAM";
  remarks: string;
}

export default function TeacherGradesClient({
  initialGrades, myClasses, stats: serverStats
}: Props) {
  const router = useRouter();
  const [grades, setGrades] = useState<GradeData[]>(initialGrades);
  const [isLoading, setIsLoading] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  
  // View State
  const [mode, setMode] = useState<"LIST" | "CREATE" | "EDIT">("LIST");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterClass, setFilterClass] = useState("ALL");

  // Form Data
  const [selectedGradeId, setSelectedGradeId] = useState<string | null>(null);
  const [formData, setFormData] = useState<GradeFormState>({
    classId: "", 
    studentId: "", 
    subjectId: "", 
    score: "", 
    totalScore: "100",
    examType: "MIDTERM", 
    remarks: ""
  });

  // --- FILTER LOGIC ---
  const filteredGrades = useMemo(() => {
    return grades.filter(g => {
      const term = searchQuery.toLowerCase();
      const matchesSearch = g.studentName.toLowerCase().includes(term) || 
                            g.subjectName.toLowerCase().includes(term);
      const matchesClass = filterClass === "ALL" || g.className === filterClass;
      return matchesSearch && matchesClass;
    });
  }, [grades, searchQuery, filterClass]);

  // Derived Options for Form
  const selectedClass = myClasses.find(c => c.id === formData.classId);
  const availableStudents = selectedClass?.students || [];
  const availableSubjects = selectedClass?.subjects || [];

  // Dynamic Stats Calculation
  const currentStats = useMemo(() => {
    const total = grades.length;
    if (total === 0) return serverStats;
    const avg = Math.round(grades.reduce((a, b) => a + b.percentage, 0) / total);
    const fail = grades.filter(g => g.percentage < 50).length;
    const top = grades.reduce((prev, cur) => (prev.percentage > cur.percentage) ? prev : cur, grades[0]);
    
    return { 
      totalGrades: total, 
      averageScore: avg, 
      failingCount: fail, 
      topStudentName: top?.studentName || "N/A" 
    };
  }, [grades, serverStats]);

  // --- ACTIONS ---

  const handleSave = async () => {
    if(!formData.studentId || !formData.subjectId || !formData.score) return toast.error("Missing fields");
    setIsLoading(true);

    try {
      const res = await fetch("/api/teacher/grades/manage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: mode === "EDIT" ? "UPDATE" : "CREATE",
          gradeId: selectedGradeId,
          data: formData
        }),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.error);

      if (mode === "EDIT") {
        setGrades(prev => prev.map(g => g.id === selectedGradeId ? result.grade : g));
        toast.success("Grade Updated");
      } else {
        setGrades([result.grade, ...grades]);
        toast.success("Grade Recorded");
      }
      setMode("LIST");
      resetForm();
    } catch (e) {
      toast.error("Failed to save");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if(!confirm("Delete grade?")) return;
    setGrades(prev => prev.filter(g => g.id !== id));
    try {
      await fetch("/api/teacher/grades/manage", {
        method: "POST",
        body: JSON.stringify({ action: "DELETE", gradeId: id })
      });
      toast.success("Deleted");
    } catch {
      toast.error("Failed");
      router.refresh();
    }
  };

  // --- HELPERS ---
  const resetForm = () => {
    setFormData({ classId: "", studentId: "", subjectId: "", score: "", totalScore: "100", examType: "MIDTERM", remarks: "" });
    setSelectedGradeId(null);
  };

  const openEdit = (g: GradeData) => {
    setSelectedGradeId(g.id);
    const cls = myClasses.find(c => c.name === g.className);
    
    setFormData({
      classId: cls?.id || "",
      studentId: g.studentId, 
      subjectId: g.subjectId || "", 
      score: g.score.toString(), 
      totalScore: g.totalScore.toString(),
      examType: g.examType as GradeFormState["examType"], 
      remarks: g.remarks || ""
    });
    setMode("EDIT");
  };

  const getGradeColor = (percentage: number) => {
    if (percentage >= 90) return "text-emerald-600 bg-emerald-50 border-emerald-200";
    if (percentage >= 75) return "text-blue-600 bg-blue-50 border-blue-200";
    if (percentage >= 50) return "text-amber-600 bg-amber-50 border-amber-200";
    return "text-rose-600 bg-rose-50 border-rose-200";
  };

  const getLetterGrade = (percentage: number) => {
    if (percentage >= 90) return "A";
    if (percentage >= 80) return "B";
    if (percentage >= 70) return "C";
    if (percentage >= 60) return "D";
    return "F";
  };

  // Helper for live preview calculation
  const currentStudent = availableStudents.find(s => s.id === formData.studentId);
  const currentSubject = availableSubjects.find(s => s.id === formData.subjectId);
  const previewPercentage = (parseFloat(formData.score) / parseFloat(formData.totalScore)) * 100 || 0;

  // --- RENDER: LIST VIEW ---
  if (mode === "LIST") {
    const statCards = [
       { label: "Total Grades", value: currentStats.totalGrades, icon: BarChart3, color: "from-purple-500 to-indigo-500", shadow: "shadow-purple-500/20" },
       { label: "Class Average", value: `${currentStats.averageScore}%`, icon: TrendingUp, color: "from-emerald-500 to-teal-500", shadow: "shadow-emerald-500/20" },
       { label: "Top Student", value: currentStats.topStudentName.split(' ')[0], icon: Award, color: "from-blue-500 to-cyan-500", shadow: "shadow-blue-500/20", isText: true },
       { label: "Failing", value: currentStats.failingCount, icon: TrendingDown, color: "from-rose-500 to-red-500", shadow: "shadow-rose-500/20" },
    ];

    return (
      <motion.div variants={containerVariants} initial="hidden" animate="show" className="space-y-8 pb-10">
        
        {/* HEADER */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
           <div><h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Grades & Results</h1><p className="text-muted-foreground mt-1">Record and analyze student performance</p></div>
           <div className="flex gap-2">
             <div className="flex items-center bg-muted p-1 rounded-lg border">
                <Button 
                  size="icon" 
                  variant="ghost" 
                  className={cn("h-7 w-7 rounded-md", viewMode === "grid" ? "bg-white dark:bg-slate-800 shadow-sm text-foreground" : "text-muted-foreground")}
                  onClick={() => setViewMode("grid")}
                >
                  <LayoutGrid className="h-4 w-4"/>
                </Button>
                <Button 
                  size="icon" 
                  variant="ghost" 
                  className={cn("h-7 w-7 rounded-md", viewMode === "list" ? "bg-white dark:bg-slate-800 shadow-sm text-foreground" : "text-muted-foreground")}
                  onClick={() => setViewMode("list")}
                >
                  <ListIcon className="h-4 w-4"/>
                </Button>
              </div>
             <Button variant="outline"><Download className="h-4 w-4 mr-2"/> Export</Button>
             <Button className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md hover:scale-105 transition-all gap-2" onClick={() => { resetForm(); setMode("CREATE"); }}>
               <Plus className="h-4 w-4 mr-2" /> Record Grade
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
                    <div><p className="text-xs font-semibold text-muted-foreground uppercase">{stat.label}</p><div className="text-2xl font-bold mt-2">{stat.isText ? stat.value : <Counter value={stat.value as number} />}</div></div>
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
             <Input placeholder="Search student or subject..." className="pl-9 bg-white dark:bg-slate-950 border-muted" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
           </div>
           <Select value={filterClass} onValueChange={setFilterClass}>
              <SelectTrigger className="w-[200px] bg-white dark:bg-slate-950 border-muted"><SelectValue placeholder="Filter Class" /></SelectTrigger>
              <SelectContent>
                 <SelectItem value="ALL">All Classes</SelectItem>
                 {myClasses.map(c => <SelectItem key={c.id} value={c.name}>{c.name}</SelectItem>)}
              </SelectContent>
           </Select>
        </motion.div>

        {/* CONTENT */}
        {viewMode === "grid" ? (
           <motion.div variants={containerVariants} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
             {filteredGrades.map((g) => (
                <motion.div key={g.id} variants={itemVariants} layoutId={g.id}>
                   <Card className="group h-full border hover:border-emerald-300 dark:hover:border-emerald-800 transition-all hover:shadow-xl bg-card">
                      <CardContent className="p-6 flex flex-col h-full">
                         <div className="flex justify-between items-start mb-4">
                            <Badge variant="outline" className={cn("font-bold", getGradeColor(g.percentage))}>{g.percentage.toFixed(0)}%</Badge>
                            <DropdownMenu>
                               <DropdownMenuTrigger asChild><Button size="icon" variant="ghost" className="h-8 w-8 -mr-2"><MoreVertical className="h-4 w-4"/></Button></DropdownMenuTrigger>
                               <DropdownMenuContent align="end">
                                  <DropdownMenuItem onClick={() => openEdit(g)}><Edit className="mr-2 h-4 w-4"/> Edit</DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => handleDelete(g.id)} className="text-red-600"><Trash2 className="mr-2 h-4 w-4"/> Delete</DropdownMenuItem>
                               </DropdownMenuContent>
                            </DropdownMenu>
                         </div>
                         <div className="flex items-center gap-3 mb-4">
                            <Avatar className="h-10 w-10 border"><AvatarImage src={g.studentImage || undefined} /><AvatarFallback>{getInitials(g.studentName)}</AvatarFallback></Avatar>
                            <div><p className="font-bold text-sm leading-tight">{g.studentName}</p><p className="text-xs text-muted-foreground">{g.className}</p></div>
                         </div>
                         <div className="mt-auto pt-4 border-t space-y-1">
                            <div className="flex justify-between text-xs"><span className="text-muted-foreground">Subject</span><span className="font-medium">{g.subjectName}</span></div>
                            <div className="flex justify-between text-xs"><span className="text-muted-foreground">Type</span><span className="font-medium capitalize">{g.examType.toLowerCase()}</span></div>
                            <div className="flex justify-between text-xs"><span className="text-muted-foreground">Grade</span><span className="font-bold text-emerald-600">{getLetterGrade(g.percentage)}</span></div>
                         </div>
                      </CardContent>
                   </Card>
                </motion.div>
             ))}
           </motion.div>
        ) : (
           <motion.div variants={containerVariants}>
              <Card className="border-none shadow-sm overflow-hidden bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
                 <CardContent className="p-0">
                    <div className="overflow-x-auto">
                       <table className="w-full text-sm">
                          <thead className="bg-muted/30 border-b"><tr><th className="px-6 py-4 text-left">Student</th><th className="px-6 py-4 text-left">Class</th><th className="px-6 py-4 text-left">Subject</th><th className="px-6 py-4 text-left">Type</th><th className="px-6 py-4 text-left">Score</th><th className="px-6 py-4 text-right">Actions</th></tr></thead>
                          <tbody className="divide-y">
                             {filteredGrades.map((g) => (
                                <motion.tr key={g.id} variants={itemVariants} className="group hover:bg-muted/40 transition-colors">
                                   <td className="px-6 py-4 font-medium flex items-center gap-2"><Avatar className="h-6 w-6"><AvatarImage src={g.studentImage || undefined} /><AvatarFallback>{getInitials(g.studentName)}</AvatarFallback></Avatar> {g.studentName}</td>
                                   <td className="px-6 py-4">{g.className}</td>
                                   <td className="px-6 py-4">{g.subjectName}</td>
                                   <td className="px-6 py-4 capitalize">{g.examType.toLowerCase()}</td>
                                   <td className="px-6 py-4"><Badge variant="outline" className={getGradeColor(g.percentage)}>{g.percentage}% ({getLetterGrade(g.percentage)})</Badge></td>
                                   <td className="px-6 py-4 text-right"><Button variant="ghost" size="icon" onClick={() => openEdit(g)}><Edit className="h-4 w-4 text-muted-foreground"/></Button></td>
                                </motion.tr>
                             ))}
                          </tbody>
                       </table>
                    </div>
                 </CardContent>
              </Card>
           </motion.div>
        )}
      </motion.div>
    );
  }

  // --- RENDER: CREATE / EDIT VIEW ---
  return (
    <motion.div initial="hidden" animate="visible" variants={slideUpVariants} className="min-h-screen bg-slate-50/50 dark:bg-slate-950 pb-20">
       <div className="max-w-6xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
             <div className="flex items-center gap-4">
               <Button variant="ghost" size="icon" onClick={() => setMode("LIST")} className="rounded-full hover:bg-slate-200"><ArrowLeft className="h-5 w-5" /></Button>
               <div><h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">{mode === "EDIT" ? "Edit Grade" : "Record Grade"}</h1><p className="text-muted-foreground text-sm">Enter student assessment results</p></div>
             </div>
             <div className="flex gap-3">
               <Button variant="outline" onClick={() => setMode("LIST")}>Cancel</Button>
               <Button className="bg-emerald-600 hover:bg-emerald-700 text-white min-w-[140px]" onClick={handleSave} disabled={isLoading}>{isLoading ? <Loader2 className="animate-spin h-4 w-4 mr-2"/> : <Save className="h-4 w-4 mr-2"/>} Save Result</Button>
             </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
             {/* FORM */}
             <div className="lg:col-span-2 space-y-6">
                <Card className="border-0 shadow-lg ring-1 ring-slate-200 dark:ring-slate-800">
                   <CardHeader><CardTitle>Details</CardTitle></CardHeader>
                   <CardContent className="space-y-6">
                      {/* Class Selection */}
                      <div className="space-y-2"><Label>Class</Label><Select value={formData.classId} onValueChange={v => setFormData({...formData, classId: v, studentId: "", subjectId: ""})}><SelectTrigger className="h-11"><SelectValue placeholder="Select Class"/></SelectTrigger><SelectContent>{myClasses.map((c:any) => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}</SelectContent></Select></div>
                      
                      <div className="grid grid-cols-2 gap-6">
                         <div className="space-y-2"><Label>Student</Label><Select value={formData.studentId} onValueChange={v => setFormData({...formData, studentId: v})} disabled={!formData.classId}><SelectTrigger className="h-11"><SelectValue placeholder="Select Student"/></SelectTrigger><SelectContent>{availableStudents.map((s) => <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>)}</SelectContent></Select></div>
                         <div className="space-y-2"><Label>Subject</Label><Select value={formData.subjectId} onValueChange={v => setFormData({...formData, subjectId: v})} disabled={!formData.classId}><SelectTrigger className="h-11"><SelectValue placeholder="Select Subject"/></SelectTrigger><SelectContent>{availableSubjects.map((s) => <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>)}</SelectContent></Select></div>
                      </div>

                      <div className="grid grid-cols-2 gap-6">
                         <div className="space-y-2"><Label>Score</Label><Input type="number" className="h-11 font-mono" value={formData.score} onChange={e => setFormData({...formData, score: e.target.value})} /></div>
                         <div className="space-y-2"><Label>Total Marks</Label><Input type="number" className="h-11 font-mono" value={formData.totalScore} onChange={e => setFormData({...formData, totalScore: e.target.value})} /></div>
                      </div>

                      <div className="space-y-2"><Label>Exam Type</Label><Select value={formData.examType} onValueChange={(v: any) => setFormData({...formData, examType: v})}><SelectTrigger className="h-11"><SelectValue/></SelectTrigger><SelectContent><SelectItem value="MIDTERM">Midterm</SelectItem><SelectItem value="FINAL">Final</SelectItem><SelectItem value="QUIZ">Quiz</SelectItem></SelectContent></Select></div>
                      <div className="space-y-2"><Label>Remarks</Label><Textarea value={formData.remarks} onChange={e => setFormData({...formData, remarks: e.target.value})} placeholder="Feedback..." /></div>
                   </CardContent>
                </Card>
             </div>

             {/* PREVIEW */}
             <div className="space-y-6">
                <div className="sticky top-6">
                   <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4 px-1">Report Card Preview</h3>
                   <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-1.5 h-full bg-emerald-500"></div>
                      <CardContent className="p-6">
                         <div className="flex justify-between items-start mb-4">
                            <Badge variant="secondary">{formData.examType}</Badge>
                            <span className="text-xs text-muted-foreground">{new Date().toLocaleDateString()}</span>
                         </div>
                         
                         <div className="text-center my-6">
                            <div className="w-24 h-24 rounded-full border-4 border-emerald-100 flex items-center justify-center mx-auto mb-2">
                               <span className="text-3xl font-extrabold text-emerald-600">{getLetterGrade(previewPercentage)}</span>
                            </div>
                            <p className="text-2xl font-bold text-slate-900 dark:text-white">{previewPercentage.toFixed(1)}%</p>
                         </div>

                         <div className="space-y-3 pt-4 border-t border-dashed">
                            <div className="flex justify-between text-sm"><span>Student</span><span className="font-semibold">{currentStudent?.name || "Select..."}</span></div>
                            <div className="flex justify-between text-sm"><span>Subject</span><span className="font-semibold">{currentSubject?.name || "Select..."}</span></div>
                            <div className="flex justify-between text-sm"><span>Raw Score</span><span className="font-mono">{formData.score}/{formData.totalScore}</span></div>
                         </div>
                      </CardContent>
                   </Card>
                </div>
             </div>
          </div>
       </div>
    </motion.div>
  );
}










// "use client";

// import { useState, useMemo } from "react";
// import { useRouter } from "next/navigation";
// import { motion, AnimatePresence, Variants } from "framer-motion";
// import {
//   Search,
//   Plus,
//   MoreVertical,
//   Edit,
//   Trash2,
//   BarChart3,
//   TrendingUp,
//   TrendingDown,
//   Award,
//   Download,
//   LayoutGrid,
//   List as ListIcon,
//   Loader2,
//   X,
//   ArrowLeft,
//   Save,
// } from "lucide-react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
// import { Textarea } from "@/components/ui/textarea";
// import { toast } from "sonner";
// import { getInitials, cn } from "@/lib/utils";
// import { Counter } from "@/components/admin/dashboard-ui";

// // --- TYPES ---

// export interface GradeData {
//   id: string;
//   studentId: string;
//   studentName: string;
//   studentImage: string | null;
//   className: string;
//   subjectName: string;
//   subjectId?: string;
//   examType: string;
//   score: number;
//   totalScore: number;
//   percentage: number;
//   grade: string;
//   remarks: string | null;
//   date: string;
// }

// export interface StudentOption {
//   id: string;
//   name: string;
//   image: string | null;
// }

// export interface SubjectOption {
//   id: string;
//   name: string;
// }

// export interface ClassOption {
//   id: string;
//   name: string;
//   subjects: SubjectOption[];
//   students: StudentOption[];
// }

// export interface GradeStats {
//   totalGrades: number;
//   averageScore: number;
//   topStudentName: string;
//   failingCount: number;
// }

// interface Props {
//   initialGrades: GradeData[];
//   myClasses: ClassOption[];
//   stats: GradeStats;
// }

// interface GradeFormState {
//   classId: string;
//   studentId: string;
//   subjectId: string;
//   score: string;
//   totalScore: string;
//   examType: string;
//   remarks: string;
// }

// // --- ANIMATION VARIANTS (Strictly Typed) ---

// const containerVariants: Variants = {
//   hidden: { opacity: 0 },
//   show: {
//     opacity: 1,
//     transition: { staggerChildren: 0.05 },
//   },
// };

// const itemVariants: Variants = {
//   hidden: { y: 20, opacity: 0 },
//   show: {
//     y: 0,
//     opacity: 1,
//     transition: { type: "spring", stiffness: 50 },
//   },
// };

// // Fixed the specific error here by typing as Variants and using string literal for type
// const slideUpVariants: Variants = {
//   hidden: { y: "100%" },
//   visible: {
//     y: 0,
//     transition: { type: "spring", damping: 25, stiffness: 200 },
//   },
// };

// export default function TeacherGradesClient({
//   initialGrades,
//   myClasses,
//   stats: serverStats,
// }: Props) {
//   const router = useRouter();
//   const [grades, setGrades] = useState<GradeData[]>(initialGrades);
//   const [isLoading, setIsLoading] = useState(false);
//   const [viewMode, setViewMode] = useState<"grid" | "list">("list");

//   // View State
//   const [mode, setMode] = useState<"LIST" | "CREATE" | "EDIT">("LIST");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [filterClass, setFilterClass] = useState("ALL");

//   // Form Data
//   const [selectedGradeId, setSelectedGradeId] = useState<string | null>(null);
//   const [formData, setFormData] = useState<GradeFormState>({
//     classId: "",
//     studentId: "",
//     subjectId: "",
//     score: "",
//     totalScore: "100",
//     examType: "MIDTERM",
//     remarks: "",
//   });

//   // --- FILTER LOGIC ---
//   const filteredGrades = useMemo(() => {
//     return grades.filter((g) => {
//       const term = searchQuery.toLowerCase();
//       const matchesSearch =
//         g.studentName.toLowerCase().includes(term) ||
//         g.subjectName.toLowerCase().includes(term);
//       const matchesClass = filterClass === "ALL" || g.className === filterClass;
//       return matchesSearch && matchesClass;
//     });
//   }, [grades, searchQuery, filterClass]);

//   // Derived Options for Form
//   const selectedClass = myClasses.find((c) => c.id === formData.classId);
//   const availableStudents = selectedClass?.students || [];
//   const availableSubjects = selectedClass?.subjects || [];

//   // Dynamic Stats Calculation
//   const currentStats = useMemo(() => {
//     const total = grades.length;
//     if (total === 0) return serverStats;
//     const avg = Math.round(
//       grades.reduce((a, b) => a + b.percentage, 0) / total
//     );
//     // Failing < 50%
//     const fail = grades.filter((g) => g.percentage < 50).length;
//     const top = grades.reduce(
//       (prev, cur) => (prev.percentage > cur.percentage ? prev : cur),
//       grades[0]
//     );

//     return {
//       totalGrades: total,
//       averageScore: avg,
//       failingCount: fail,
//       topStudentName: top?.studentName || "N/A",
//     };
//   }, [grades, serverStats]);

//   // --- ACTIONS ---

//   const handleSave = async () => {
//     if (!formData.studentId || !formData.subjectId || !formData.score)
//       return toast.error("Missing fields");
//     setIsLoading(true);

//     try {
//       const res = await fetch("/api/teacher/grades/manage", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           action: mode === "EDIT" ? "UPDATE" : "CREATE",
//           gradeId: selectedGradeId,
//           data: formData,
//         }),
//       });

//       const result = await res.json();
//       if (!res.ok) throw new Error(result.error);

//       if (mode === "EDIT") {
//         setGrades((prev) =>
//           prev.map((g) => (g.id === selectedGradeId ? result.grade : g))
//         );
//         toast.success("Grade Updated");
//       } else {
//         setGrades([result.grade, ...grades]);
//         toast.success("Grade Recorded");
//       }
//       setMode("LIST");
//       resetForm();
//     } catch (e) {
//       toast.error("Failed to save");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleDelete = async (id: string) => {
//     if (!confirm("Delete grade?")) return;
//     setGrades((prev) => prev.filter((g) => g.id !== id));
//     try {
//       await fetch("/api/teacher/grades/manage", {
//         method: "POST",
//         body: JSON.stringify({ action: "DELETE", gradeId: id }),
//       });
//       toast.success("Deleted");
//     } catch {
//       toast.error("Failed");
//       router.refresh();
//     }
//   };

//   // --- HELPERS ---
//   const resetForm = () => {
//     setFormData({
//       classId: "",
//       studentId: "",
//       subjectId: "",
//       score: "",
//       totalScore: "100",
//       examType: "MIDTERM",
//       remarks: "",
//     });
//     setSelectedGradeId(null);
//   };

//   const openEdit = (g: GradeData) => {
//     setSelectedGradeId(g.id);
//     const cls = myClasses.find((c) => c.name === g.className);

//     setFormData({
//       classId: cls?.id || "",
//       studentId: g.studentId,
//       subjectId: g.subjectId || "",
//       score: g.score.toString(),
//       totalScore: g.totalScore.toString(),
//       examType: g.examType,
//       remarks: g.remarks || "",
//     });
//     setMode("EDIT");
//   };

//   const getGradeColor = (grade: string) => {
//     // Safely check first char if grade exists
//     const letter = grade ? grade.charAt(0) : "F";
//     switch (letter) {
//       case "A":
//         return "text-emerald-600 bg-emerald-50 border-emerald-200";
//       case "B":
//         return "text-blue-600 bg-blue-50 border-blue-200";
//       case "C":
//         return "text-amber-600 bg-amber-50 border-amber-200";
//       case "D":
//         return "text-orange-600 bg-orange-50 border-orange-200";
//       default:
//         return "text-rose-600 bg-rose-50 border-rose-200";
//     }
//   };

//   const getLetterGrade = (percentage: number) => {
//     if (percentage >= 90) return "A";
//     if (percentage >= 80) return "B";
//     if (percentage >= 70) return "C";
//     if (percentage >= 60) return "D";
//     return "F";
//   };

//   // Helper for live preview calculation
//   const currentStudent = availableStudents.find(
//     (s) => s.id === formData.studentId
//   );
//   const currentSubject = availableSubjects.find(
//     (s) => s.id === formData.subjectId
//   );
//   const previewPercentage =
//     (parseFloat(formData.score) / parseFloat(formData.totalScore)) * 100 || 0;

//   // --- RENDER: LIST VIEW ---
//   if (mode === "LIST") {
//     const statCards = [
//       {
//         label: "Total Grades",
//         value: currentStats.totalGrades,
//         icon: BarChart3,
//         color: "from-purple-500 to-indigo-500",
//         shadow: "shadow-purple-500/20",
//         isText: false,
//       },
//       {
//         label: "Class Average",
//         value: `${currentStats.averageScore}%`,
//         icon: TrendingUp,
//         color: "from-emerald-500 to-teal-500",
//         shadow: "shadow-emerald-500/20",
//         isText: true,
//       },
//       {
//         label: "Top Student",
//         value: currentStats.topStudentName.split(" ")[0],
//         icon: Award,
//         color: "from-blue-500 to-cyan-500",
//         shadow: "shadow-blue-500/20",
//         isText: true,
//       },
//       {
//         label: "Failing",
//         value: currentStats.failingCount,
//         icon: TrendingDown,
//         color: "from-rose-500 to-red-500",
//         shadow: "shadow-rose-500/20",
//         isText: false,
//       },
//     ];

//     return (
//       <motion.div
//         variants={containerVariants}
//         initial="hidden"
//         animate="show"
//         className="space-y-8 pb-10"
//       >
//         {/* HEADER */}
//         <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
//           <div>
//             <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
//               Grades & Results
//             </h1>
//             <p className="text-muted-foreground mt-1">
//               Record and analyze student performance
//             </p>
//           </div>
//           <div className="flex gap-2">
//             <div className="flex items-center bg-muted p-1 rounded-lg border">
//               <Button
//                 size="icon"
//                 variant={viewMode === "grid" ? "white" : "ghost"}
//                 onClick={() => setViewMode("grid")}
//               >
//                 <LayoutGrid className="h-4 w-4" />
//               </Button>
//               <Button
//                 size="icon"
//                 variant={viewMode === "list" ? "white" : "ghost"}
//                 onClick={() => setViewMode("list")}
//               >
//                 <ListIcon className="h-4 w-4" />
//               </Button>
//             </div>
//             <Button variant="outline">
//               <Download className="h-4 w-4 mr-2" /> Export
//             </Button>
//             <Button
//               className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md hover:scale-105 transition-all gap-2"
//               onClick={() => {
//                 resetForm();
//                 setMode("CREATE");
//               }}
//             >
//               <Plus className="h-4 w-4 mr-2" /> Record Grade
//             </Button>
//           </div>
//         </div>

//         {/* STATS */}
//         <motion.div
//           variants={containerVariants}
//           className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
//         >
//           {statCards.map((stat, i) => (
//             <motion.div key={i} variants={itemVariants}>
//               <Card className="border-none shadow-sm bg-white/50 backdrop-blur-sm dark:bg-slate-900/50 hover:shadow-md transition-all relative overflow-hidden">
//                 <div
//                   className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${stat.color} opacity-10 rounded-bl-full`}
//                 />
//                 <CardContent className="p-6 relative z-10 flex items-center justify-between">
//                   <div>
//                     <p className="text-xs font-semibold text-muted-foreground uppercase">
//                       {stat.label}
//                     </p>
//                     <div className="text-2xl font-bold mt-2">
//                       {stat.isText ? (
//                         stat.value
//                       ) : (
//                         <Counter value={stat.value as number} />
//                       )}
//                     </div>
//                   </div>
//                   <div
//                     className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} text-white ${stat.shadow} shadow-lg`}
//                   >
//                     <stat.icon className="h-6 w-6" />
//                   </div>
//                 </CardContent>
//               </Card>
//             </motion.div>
//           ))}
//         </motion.div>

//         {/* FILTERS */}
//         <motion.div
//           variants={itemVariants}
//           className="flex flex-col sm:flex-row gap-4 bg-white/60 dark:bg-slate-900/60 backdrop-blur-md p-4 rounded-xl border shadow-sm"
//         >
//           <div className="relative flex-1">
//             <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//             <Input
//               placeholder="Search student or subject..."
//               className="pl-9 bg-white dark:bg-slate-950 border-muted"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//             />
//           </div>
//           <Select value={filterClass} onValueChange={setFilterClass}>
//             <SelectTrigger className="w-[200px] bg-white dark:bg-slate-950 border-muted">
//               <SelectValue placeholder="Filter Class" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="ALL">All Classes</SelectItem>
//               {myClasses.map((c) => (
//                 <SelectItem key={c.id} value={c.name}>
//                   {c.name}
//                 </SelectItem>
//               ))}
//             </SelectContent>
//           </Select>
//         </motion.div>

//         {/* CONTENT */}
//         {viewMode === "grid" ? (
//           <motion.div
//             variants={containerVariants}
//             className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
//           >
//             {filteredGrades.map((g) => (
//               <motion.div key={g.id} variants={itemVariants} layoutId={g.id}>
//                 <Card className="group h-full border hover:border-emerald-300 dark:hover:border-emerald-800 transition-all hover:shadow-xl bg-card">
//                   <CardContent className="p-6 flex flex-col h-full">
//                     <div className="flex justify-between items-start mb-4">
//                       <Badge
//                         variant="outline"
//                         className={cn(
//                           "font-bold",
//                           getGradeColor(g.grade || "F")
//                         )}
//                       >
//                         {g.percentage.toFixed(0)}%
//                       </Badge>
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
//                           <DropdownMenuItem onClick={() => openEdit(g)}>
//                             <Edit className="mr-2 h-4 w-4" /> Edit
//                           </DropdownMenuItem>
//                           <DropdownMenuItem
//                             onClick={() => handleDelete(g.id)}
//                             className="text-red-600"
//                           >
//                             <Trash2 className="mr-2 h-4 w-4" /> Delete
//                           </DropdownMenuItem>
//                         </DropdownMenuContent>
//                       </DropdownMenu>
//                     </div>
//                     <div className="flex items-center gap-3 mb-4">
//                       <Avatar className="h-10 w-10 border">
//                         <AvatarImage src={g.studentImage || undefined} />
//                         <AvatarFallback>
//                           {getInitials(g.studentName)}
//                         </AvatarFallback>
//                       </Avatar>
//                       <div>
//                         <p className="font-bold text-sm leading-tight">
//                           {g.studentName}
//                         </p>
//                         <p className="text-xs text-muted-foreground">
//                           {g.className}
//                         </p>
//                       </div>
//                     </div>
//                     <div className="mt-auto pt-4 border-t space-y-1">
//                       <div className="flex justify-between text-xs">
//                         <span className="text-muted-foreground">Subject</span>
//                         <span className="font-medium">{g.subjectName}</span>
//                       </div>
//                       <div className="flex justify-between text-xs">
//                         <span className="text-muted-foreground">Type</span>
//                         <span className="font-medium capitalize">
//                           {g.examType.toLowerCase()}
//                         </span>
//                       </div>
//                       <div className="flex justify-between text-xs">
//                         <span className="text-muted-foreground">Grade</span>
//                         <span className="font-bold text-emerald-600">
//                           {getLetterGrade(g.percentage)}
//                         </span>
//                       </div>
//                     </div>
//                   </CardContent>
//                 </Card>
//               </motion.div>
//             ))}
//           </motion.div>
//         ) : (
//           <motion.div variants={containerVariants}>
//             <Card className="border-none shadow-sm overflow-hidden bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
//               <CardContent className="p-0">
//                 <div className="overflow-x-auto">
//                   <table className="w-full text-sm">
//                     <thead className="bg-muted/30 border-b">
//                       <tr>
//                         <th className="px-6 py-4 text-left">Student</th>
//                         <th className="px-6 py-4 text-left">Class</th>
//                         <th className="px-6 py-4 text-left">Subject</th>
//                         <th className="px-6 py-4 text-left">Type</th>
//                         <th className="px-6 py-4 text-left">Score</th>
//                         <th className="px-6 py-4 text-right">Actions</th>
//                       </tr>
//                     </thead>
//                     <tbody className="divide-y">
//                       {filteredGrades.map((g) => (
//                         <motion.tr
//                           key={g.id}
//                           variants={itemVariants}
//                           className="group hover:bg-muted/40 transition-colors"
//                         >
//                           <td className="px-6 py-4 font-medium flex items-center gap-2">
//                             <Avatar className="h-6 w-6">
//                               <AvatarImage src={g.studentImage || undefined} />
//                               <AvatarFallback>
//                                 {getInitials(g.studentName)}
//                               </AvatarFallback>
//                             </Avatar>{" "}
//                             {g.studentName}
//                           </td>
//                           <td className="px-6 py-4">{g.className}</td>
//                           <td className="px-6 py-4">{g.subjectName}</td>
//                           <td className="px-6 py-4 capitalize">
//                             {g.examType.toLowerCase()}
//                           </td>
//                           <td className="px-6 py-4">
//                             <Badge
//                               variant="outline"
//                               className={getGradeColor(g.grade || "F")}
//                             >
//                               {g.percentage}% (
//                               {getLetterGrade(g.percentage)})
//                             </Badge>
//                           </td>
//                           <td className="px-6 py-4 text-right">
//                             <Button
//                               variant="ghost"
//                               size="icon"
//                               onClick={() => openEdit(g)}
//                             >
//                               <Edit className="h-4 w-4 text-muted-foreground" />
//                             </Button>
//                           </td>
//                         </motion.tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               </CardContent>
//             </Card>
//           </motion.div>
//         )}
//       </motion.div>

//       {/* --- RENDER: CREATE / EDIT VIEW --- */}
//       <AnimatePresence>
//         {mode !== "LIST" && (
//           <motion.div
//             initial="hidden"
//             animate="visible"
//             variants={slideUpVariants}
//             className="fixed inset-0 z-50 bg-slate-50/95 dark:bg-slate-950/95 backdrop-blur-sm overflow-y-auto"
//           >
//             <div className="min-h-screen py-10 px-4">
//               <div className="max-w-6xl mx-auto space-y-6">
//                 {/* Header */}
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center gap-4">
//                     <Button
//                       variant="ghost"
//                       size="icon"
//                       onClick={() => setMode("LIST")}
//                       className="rounded-full hover:bg-slate-200"
//                     >
//                       <ArrowLeft className="h-5 w-5" />
//                     </Button>
//                     <div>
//                       <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
//                         {mode === "EDIT" ? "Edit Grade" : "Record Grade"}
//                       </h1>
//                       <p className="text-muted-foreground text-sm">
//                         Enter student assessment results
//                       </p>
//                     </div>
//                   </div>
//                   <div className="flex gap-3">
//                     <Button variant="outline" onClick={() => setMode("LIST")}>
//                       Cancel
//                     </Button>
//                     <Button
//                       className="bg-emerald-600 hover:bg-emerald-700 text-white min-w-[140px]"
//                       onClick={handleSave}
//                       disabled={isLoading}
//                     >
//                       {isLoading ? (
//                         <Loader2 className="animate-spin h-4 w-4 mr-2" />
//                       ) : (
//                         <Save className="h-4 w-4 mr-2" />
//                       )}{" "}
//                       Save Result
//                     </Button>
//                   </div>
//                 </div>

//                 <div className="grid gap-8 lg:grid-cols-3">
//                   {/* FORM */}
//                   <div className="lg:col-span-2 space-y-6">
//                     <Card className="border-0 shadow-lg ring-1 ring-slate-200 dark:ring-slate-800">
//                       <CardHeader>
//                         <CardTitle>Details</CardTitle>
//                       </CardHeader>
//                       <CardContent className="space-y-6">
//                         {/* Class Selection */}
//                         <div className="space-y-2">
//                           <Label>Class</Label>
//                           <Select
//                             value={formData.classId}
//                             onValueChange={(v) =>
//                               setFormData({
//                                 ...formData,
//                                 classId: v,
//                                 studentId: "",
//                                 subjectId: "",
//                               })
//                             }
//                           >
//                             <SelectTrigger className="h-11">
//                               <SelectValue placeholder="Select Class" />
//                             </SelectTrigger>
//                             <SelectContent>
//                               {myClasses.map((c) => (
//                                 <SelectItem key={c.id} value={c.id}>
//                                   {c.name}
//                                 </SelectItem>
//                               ))}
//                             </SelectContent>
//                           </Select>
//                         </div>

//                         <div className="grid grid-cols-2 gap-6">
//                           <div className="space-y-2">
//                             <Label>Student</Label>
//                             <Select
//                               value={formData.studentId}
//                               onValueChange={(v) =>
//                                 setFormData({ ...formData, studentId: v })
//                               }
//                               disabled={!formData.classId}
//                             >
//                               <SelectTrigger className="h-11">
//                                 <SelectValue placeholder="Select Student" />
//                               </SelectTrigger>
//                               <SelectContent>
//                                 {availableStudents.map((s) => (
//                                   <SelectItem key={s.id} value={s.id}>
//                                     {s.name}
//                                   </SelectItem>
//                                 ))}
//                               </SelectContent>
//                             </Select>
//                           </div>
//                           <div className="space-y-2">
//                             <Label>Subject</Label>
//                             <Select
//                               value={formData.subjectId}
//                               onValueChange={(v) =>
//                                 setFormData({ ...formData, subjectId: v })
//                               }
//                               disabled={!formData.classId}
//                             >
//                               <SelectTrigger className="h-11">
//                                 <SelectValue placeholder="Select Subject" />
//                               </SelectTrigger>
//                               <SelectContent>
//                                 {availableSubjects.map((s) => (
//                                   <SelectItem key={s.id} value={s.id}>
//                                     {s.name}
//                                   </SelectItem>
//                                 ))}
//                               </SelectContent>
//                             </Select>
//                           </div>
//                         </div>

//                         <div className="grid grid-cols-2 gap-6">
//                           <div className="space-y-2">
//                             <Label>Score</Label>
//                             <Input
//                               type="number"
//                               className="h-11 font-mono"
//                               value={formData.score}
//                               onChange={(e) =>
//                                 setFormData({
//                                   ...formData,
//                                   score: e.target.value,
//                                 })
//                               }
//                             />
//                           </div>
//                           <div className="space-y-2">
//                             <Label>Total Marks</Label>
//                             <Input
//                               type="number"
//                               className="h-11 font-mono"
//                               value={formData.totalScore}
//                               onChange={(e) =>
//                                 setFormData({
//                                   ...formData,
//                                   totalScore: e.target.value,
//                                 })
//                               }
//                             />
//                           </div>
//                         </div>

//                         <div className="space-y-2">
//                           <Label>Exam Type</Label>
//                           <Select
//                             value={formData.examType}
//                             onValueChange={(v: any) =>
//                               setFormData({ ...formData, examType: v })
//                             }
//                           >
//                             <SelectTrigger className="h-11">
//                               <SelectValue />
//                             </SelectTrigger>
//                             <SelectContent>
//                               <SelectItem value="MIDTERM">Midterm</SelectItem>
//                               <SelectItem value="FINAL">Final</SelectItem>
//                               <SelectItem value="QUIZ">Quiz</SelectItem>
//                             </SelectContent>
//                           </Select>
//                         </div>
//                         <div className="space-y-2">
//                           <Label>Remarks</Label>
//                           <Textarea
//                             value={formData.remarks}
//                             onChange={(e) =>
//                               setFormData({
//                                 ...formData,
//                                 remarks: e.target.value,
//                               })
//                             }
//                             placeholder="Feedback..."
//                           />
//                         </div>
//                       </CardContent>
//                     </Card>
//                   </div>

//                   {/* PREVIEW */}
//                   <div className="space-y-6">
//                     <div className="sticky top-6">
//                       <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4 px-1">
//                         Report Card Preview
//                       </h3>
//                       <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden">
//                         <div className="absolute top-0 left-0 w-1.5 h-full bg-emerald-500"></div>
//                         <CardContent className="p-6">
//                           <div className="flex justify-between items-start mb-4">
//                             <Badge variant="secondary">
//                               {formData.examType}
//                             </Badge>
//                             <span className="text-xs text-muted-foreground">
//                               {new Date().toLocaleDateString()}
//                             </span>
//                           </div>

//                           <div className="text-center my-6">
//                             <div className="w-24 h-24 rounded-full border-4 border-emerald-100 flex items-center justify-center mx-auto mb-2">
//                               <span className="text-3xl font-extrabold text-emerald-600">
//                                 {getLetterGrade(previewPercentage)}
//                               </span>
//                             </div>
//                             <p className="text-2xl font-bold text-slate-900 dark:text-white">
//                               {previewPercentage.toFixed(1)}%
//                             </p>
//                           </div>

//                           <div className="space-y-3 pt-4 border-t border-dashed">
//                             <div className="flex justify-between text-sm">
//                               <span>Student</span>
//                               <span className="font-semibold">
//                                 {currentStudent?.name || "Select..."}
//                               </span>
//                             </div>
//                             <div className="flex justify-between text-sm">
//                               <span>Subject</span>
//                               <span className="font-semibold">
//                                 {currentSubject?.name || "Select..."}
//                               </span>
//                             </div>
//                             <div className="flex justify-between text-sm">
//                               <span>Raw Score</span>
//                               <span className="font-mono">
//                                 {formData.score}/{formData.totalScore}
//                               </span>
//                             </div>
//                           </div>
//                         </CardContent>
//                       </Card>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </motion.div>
//   );
// }