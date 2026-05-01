"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, Bell, Users, FileText, UploadCloud, 
  Trash2, Send, Paperclip, CheckCircle2, Link as LinkIcon,
  Plus, Video, Calendar, MoreVertical, Clock, Settings,
  MessageSquare, Mail, GraduationCap, Loader2, X,
  BookOpen
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { getInitials, cn } from "@/lib/utils";

// --- ANIMATION ---
const containerVariants = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.05 } } };
const itemVariants = { hidden: { y: 10, opacity: 0 }, show: { y: 0, opacity: 1 } };

interface Props {
  classData: any;
  teacherId: string;
}

export default function ClassDetailsClient({ classData, teacherId }: Props) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("stream");
  const [isLoading, setIsLoading] = useState(false);

  // Data States (Local state to allow instant updates)
  const [announcements, setAnnouncements] = useState(classData.announcements || []);
  const [materials, setMaterials] = useState(classData.materials || []);
  // In a real app, assignments would be passed in classData. using placeholder state for demo
  const [assignments, setAssignments] = useState<any[]>([]); 

  // Forms
  const [postContent, setPostContent] = useState({ title: "", content: "" });
  const [materialForm, setMaterialForm] = useState({ title: "", description: "", fileUrl: "" });
  const [assignmentForm, setAssignmentForm] = useState({ title: "", type: "HOMEWORK", totalMarks: "100", dueDate: "" });
  
  // Modal States
  const [isMaterialOpen, setIsMaterialOpen] = useState(false);
  const [isAssignmentOpen, setIsAssignmentOpen] = useState(false);

  // --- ACTIONS ---

  const handleStartClass = async () => {
    toast.loading("Initializing virtual classroom...");
    try {
      await fetch("/api/teacher/classes/actions", {
        method: "POST",
        body: JSON.stringify({ action: "START_SESSION", data: { classId: classData.id } })
      });
      toast.dismiss();
      toast.success("Class Session Started", { description: "Attendance is now open." });
      // In production: router.push(`/classroom/${classData.id}`);
    } catch {
      toast.error("Failed to start session");
    }
  };

  const handlePostAnnouncement = async () => {
    if (!postContent.title || !postContent.content) return toast.error("Title and Content required");
    setIsLoading(true);
    try {
      const res = await fetch("/api/teacher/classes/details", {
        method: "POST",
        body: JSON.stringify({ action: "POST_ANNOUNCEMENT", classId: classData.id, data: postContent })
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error);
      
      setAnnouncements([result.item, ...announcements]);
      setPostContent({ title: "", content: "" });
      toast.success("Posted to Stream");
    } catch (e) {
      toast.error("Failed to post");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUploadMaterial = async () => {
    if (!materialForm.title) return toast.error("Title required");
    setIsLoading(true);
    try {
      const res = await fetch("/api/teacher/classes/details", {
        method: "POST",
        body: JSON.stringify({ action: "UPLOAD_MATERIAL", classId: classData.id, data: materialForm })
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error);
      
      setMaterials([result.item, ...materials]);
      setMaterialForm({ title: "", description: "", fileUrl: "" });
      setIsMaterialOpen(false);
      toast.success("Material Added");
    } catch (e) {
      toast.error("Failed to upload");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateAssignment = async () => {
    // Reuse the existing Assignments API for consistency
    if (!assignmentForm.title || !assignmentForm.dueDate) return toast.error("Details required");
    setIsLoading(true);
    try {
      // Mocking the optimistic update since we don't have the full assignment API route connected in this specific file view
      // In real implementation: Call /api/admin/assignments/manage
      const newAssignment = {
        id: Date.now().toString(),
        ...assignmentForm,
        createdAt: new Date().toISOString(),
        submissionCount: 0
      };
      setAssignments([newAssignment, ...assignments]);
      setIsAssignmentOpen(false);
      setAssignmentForm({ title: "", type: "HOMEWORK", totalMarks: "100", dueDate: "" });
      toast.success("Assignment Created");
    } catch (e) {
      toast.error("Failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string, type: "ANNOUNCEMENT" | "MATERIAL") => {
    if (!confirm("Are you sure?")) return;
    if (type === "ANNOUNCEMENT") setAnnouncements(prev => prev.filter((a: any) => a.id !== id));
    else setMaterials(prev => prev.filter((m: any) => m.id !== id));

    try {
      await fetch("/api/teacher/classes/details", {
        method: "POST",
        body: JSON.stringify({ action: "DELETE_ITEM", classId: classData.id, data: { id, type } })
      });
      toast.success("Deleted");
    } catch (e) {
      toast.error("Delete failed");
    }
  };

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="show" className="space-y-6 pb-20">
      
      {/* 1. HERO BANNER */}
      <div className="relative h-56 rounded-3xl overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-700 shadow-xl group">
        <div className="absolute inset-0 bg-[url('/pattern-grid.svg')] opacity-20"></div>
        
        {/* Top Actions */}
        <div className="absolute top-6 left-6 z-10">
          <Button variant="secondary" size="sm" className="bg-white/20 hover:bg-white/30 text-white border-0 backdrop-blur-md" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" /> All Classes
          </Button>
        </div>
        <div className="absolute top-6 right-6 z-10 flex gap-2">
           <Button onClick={handleStartClass} className="bg-emerald-500 hover:bg-emerald-600 text-white border-0 shadow-lg shadow-emerald-900/20">
              <Video className="h-4 w-4 mr-2"/> Start Live Class
           </Button>
           <Button variant="secondary" size="icon" className="bg-white/20 hover:bg-white/30 text-white border-0 backdrop-blur-md">
              <Settings className="h-4 w-4"/>
           </Button>
        </div>

        {/* Class Info */}
        <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="text-white">
              <div className="flex items-center gap-3 mb-2">
                 <Badge className="bg-white/20 hover:bg-white/30 text-white border-0 backdrop-blur-md font-mono">{classData.code}</Badge>
                 <span className="text-sm font-medium opacity-90">{classData.academicYear} • {classData.level}</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">{classData.name}</h1>
            </div>
            {/* Quick Stats */}
            <div className="flex gap-6 text-white/90">
               <div className="text-center">
                  <p className="text-2xl font-bold">{classData.students.length}</p>
                  <p className="text-[10px] uppercase tracking-wider font-medium opacity-70">Students</p>
               </div>
               <div className="text-center">
                  <p className="text-2xl font-bold">92%</p>
                  <p className="text-[10px] uppercase tracking-wider font-medium opacity-70">Attendance</p>
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. MAIN INTERFACE */}
      <Tabs defaultValue="stream" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="bg-white dark:bg-slate-900 p-1 rounded-xl w-full justify-start border shadow-sm">
          <TabsTrigger value="stream" className="gap-2 px-6 data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-600"><MessageSquare className="h-4 w-4"/> Stream</TabsTrigger>
          <TabsTrigger value="classwork" className="gap-2 px-6 data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-600"><BookOpen className="h-4 w-4"/> Classwork</TabsTrigger>
          <TabsTrigger value="people" className="gap-2 px-6 data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-600"><Users className="h-4 w-4"/> People</TabsTrigger>
        </TabsList>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT SIDEBAR (Schedule & Info) */}
          <div className="hidden lg:block lg:col-span-3 space-y-6">
             <Card className="border-slate-200 dark:border-slate-800 shadow-sm">
                <CardHeader><CardTitle className="text-sm uppercase tracking-wider text-muted-foreground">Class Schedule</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                   {classData.schedules.length > 0 ? classData.schedules.map((s:any) => (
                      <div key={s.id} className="flex items-center gap-3">
                         <div className="w-10 h-10 rounded-lg bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 font-bold text-xs">
                            {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"][s.dayOfWeek]}
                         </div>
                         <div>
                            <p className="text-sm font-medium">{s.startTime}</p>
                            <p className="text-xs text-muted-foreground">to {s.endTime}</p>
                         </div>
                      </div>
                   )) : <p className="text-sm text-slate-500 italic">No schedule set.</p>}
                </CardContent>
             </Card>
             
             <Card className="bg-gradient-to-b from-indigo-50 to-white dark:from-slate-900 dark:to-slate-950 border-indigo-100 dark:border-slate-800">
                <CardContent className="p-6">
                   <h3 className="font-bold text-indigo-900 dark:text-indigo-200 mb-2">Upcoming</h3>
                   <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">No work due soon.</p>
                   <Button variant="link" className="p-0 h-auto text-indigo-600">View all</Button>
                </CardContent>
             </Card>
          </div>

          {/* MAIN CONTENT AREA */}
          <div className="lg:col-span-9 space-y-6">
            
            {/* --- STREAM TAB --- */}
            <TabsContent value="stream" className="m-0 space-y-6">
               {/* Composer */}
               <Card className="shadow-md border-0 ring-1 ring-slate-200 dark:ring-slate-800 overflow-hidden">
                  <div className="p-4 bg-slate-50/50 dark:bg-slate-900/50 border-b">
                     <Input 
                       placeholder="Title your announcement..." 
                       className="border-0 bg-transparent shadow-none font-bold text-lg px-0 h-auto focus-visible:ring-0 placeholder:text-slate-400" 
                       value={postContent.title}
                       onChange={e => setPostContent({...postContent, title: e.target.value})}
                     />
                  </div>
                  <div className="p-4">
                     <Textarea 
                        placeholder="Share updates, reminders, or welcome messages..." 
                        className="border-0 shadow-none resize-none min-h-[100px] px-0 focus-visible:ring-0 text-base"
                        value={postContent.content}
                        onChange={e => setPostContent({...postContent, content: e.target.value})}
                     />
                     <div className="flex justify-between items-center mt-4 pt-4 border-t border-dashed">
                        <Button variant="ghost" size="sm" className="text-slate-500 hover:text-indigo-600 hover:bg-indigo-50"><Paperclip className="h-4 w-4 mr-2"/> Attach File</Button>
                        <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700 text-white px-6" onClick={handlePostAnnouncement} disabled={isLoading}>
                          {isLoading ? <Loader2 className="animate-spin h-4 w-4"/> : <><Send className="h-3 w-3 mr-2"/> Post</>}
                        </Button>
                     </div>
                  </div>
               </Card>

               {/* Feed */}
               <div className="space-y-4">
                  <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider ml-1">Class Stream</h3>
                  <motion.div variants={containerVariants} initial="hidden" animate="show" className="space-y-4">
                    {announcements.length === 0 && (
                       <div className="text-center py-12 text-slate-400"><MessageSquare className="h-12 w-12 mx-auto mb-2 opacity-20"/> <p>No announcements yet.</p></div>
                    )}
                    {announcements.map((a: any) => (
                      <motion.div key={a.id} variants={itemVariants}>
                        <Card className="group hover:border-indigo-200 transition-colors">
                          <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-3">
                             <div className="flex gap-4">
                                <div className="h-10 w-10 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600"><Bell className="h-5 w-5"/></div>
                                <div>
                                   <h3 className="font-bold text-slate-900 dark:text-white text-base">{a.title}</h3>
                                   <p className="text-xs text-slate-500 mt-0.5">{new Date(a.createdAt).toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}</p>
                                </div>
                             </div>
                             <DropdownMenu>
                                <DropdownMenuTrigger asChild><Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"><MoreVertical className="h-4 w-4"/></Button></DropdownMenuTrigger>
                                <DropdownMenuContent align="end"><DropdownMenuItem className="text-red-600" onClick={() => handleDelete(a.id, "ANNOUNCEMENT")}>Delete</DropdownMenuItem></DropdownMenuContent>
                             </DropdownMenu>
                          </CardHeader>
                          <CardContent>
                             <div className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl">
                                {a.content}
                             </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </motion.div>
               </div>
            </TabsContent>

            {/* --- CLASSWORK TAB --- */}
            <TabsContent value="classwork" className="m-0 space-y-8">
               
               {/* 1. Assignments Section */}
               <div className="space-y-4">
                  <div className="flex justify-between items-center">
                     <h3 className="text-lg font-bold flex items-center gap-2"><GraduationCap className="h-5 w-5 text-purple-600"/> Assignments</h3>
                     <Dialog open={isAssignmentOpen} onOpenChange={setIsAssignmentOpen}>
                        <DialogTrigger asChild><Button size="sm" variant="outline" className="border-purple-200 text-purple-700 hover:bg-purple-50"><Plus className="h-4 w-4 mr-2"/> Create</Button></DialogTrigger>
                        <DialogContent>
                           <DialogHeader><DialogTitle>Create Assignment</DialogTitle></DialogHeader>
                           <div className="space-y-4 py-2">
                              <Input placeholder="Title" value={assignmentForm.title} onChange={e => setAssignmentForm({...assignmentForm, title: e.target.value})}/>
                              <div className="grid grid-cols-2 gap-4">
                                 <Select onValueChange={v => setAssignmentForm({...assignmentForm, type: v})} defaultValue="HOMEWORK"><SelectTrigger><SelectValue/></SelectTrigger><SelectContent><SelectItem value="HOMEWORK">Homework</SelectItem><SelectItem value="QUIZ">Quiz</SelectItem></SelectContent></Select>
                                 <Input type="date" value={assignmentForm.dueDate} onChange={e => setAssignmentForm({...assignmentForm, dueDate: e.target.value})}/>
                              </div>
                              <Button className="w-full bg-purple-600" onClick={handleCreateAssignment}>Create</Button>
                           </div>
                        </DialogContent>
                     </Dialog>
                  </div>
                  
                  {assignments.length === 0 ? (
                     <div className="p-8 border border-dashed rounded-2xl text-center text-slate-500 text-sm bg-slate-50/50">No active assignments</div>
                  ) : (
                     <div className="grid gap-3">
                        {assignments.map((a: any) => (
                           <div key={a.id} className="flex items-center justify-between p-4 bg-white dark:bg-slate-900 border rounded-xl shadow-sm hover:border-purple-300 transition-all cursor-pointer group">
                              <div className="flex items-center gap-4">
                                 <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600"><FileText className="h-5 w-5"/></div>
                                 <div><h4 className="font-bold text-sm">{a.title}</h4><p className="text-xs text-muted-foreground">Due: {new Date(a.dueDate).toLocaleDateString()}</p></div>
                              </div>
                              <Badge variant="secondary">{a.type}</Badge>
                           </div>
                        ))}
                     </div>
                  )}
               </div>

               {/* 2. Resources Section */}
               <div className="space-y-4">
                  <div className="flex justify-between items-center">
                     <h3 className="text-lg font-bold flex items-center gap-2"><BookOpen className="h-5 w-5 text-blue-600"/> Learning Materials</h3>
                     <Dialog open={isMaterialOpen} onOpenChange={setIsMaterialOpen}>
                        <DialogTrigger asChild><Button size="sm" variant="outline" className="border-blue-200 text-blue-700 hover:bg-blue-50"><Plus className="h-4 w-4 mr-2"/> Upload</Button></DialogTrigger>
                        <DialogContent>
                           <DialogHeader><DialogTitle>Upload Resource</DialogTitle></DialogHeader>
                           <div className="space-y-4 py-2">
                              <Input placeholder="Title" value={materialForm.title} onChange={e => setMaterialForm({...materialForm, title: e.target.value})}/>
                              <Input placeholder="Description" value={materialForm.description} onChange={e => setMaterialForm({...materialForm, description: e.target.value})}/>
                              <Input placeholder="Link URL" value={materialForm.fileUrl} onChange={e => setMaterialForm({...materialForm, fileUrl: e.target.value})}/>
                              <Button className="w-full bg-blue-600" onClick={handleUploadMaterial}>Upload</Button>
                           </div>
                        </DialogContent>
                     </Dialog>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     {materials.map((m: any) => (
                        <Card key={m.id} className="group hover:border-blue-300 transition-colors cursor-pointer">
                           <CardContent className="p-4 flex gap-4">
                              <div className="h-12 w-12 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center shrink-0"><FileText className="h-6 w-6"/></div>
                              <div className="flex-1 min-w-0">
                                 <h4 className="font-bold text-sm truncate">{m.title}</h4>
                                 <p className="text-xs text-muted-foreground line-clamp-1">{m.description}</p>
                                 <div className="flex items-center gap-3 mt-2">
                                    <a href={m.fileUrl} target="_blank" className="text-xs font-medium text-blue-600 hover:underline flex items-center gap-1"><LinkIcon className="h-3 w-3"/> Open</a>
                                    <button onClick={() => handleDelete(m.id, "MATERIAL")} className="text-xs text-rose-500 opacity-0 group-hover:opacity-100 transition-opacity hover:underline">Delete</button>
                                 </div>
                              </div>
                           </CardContent>
                        </Card>
                     ))}
                  </div>
               </div>
            </TabsContent>

            {/* --- PEOPLE TAB --- */}
            <TabsContent value="people" className="m-0">
               <Card className="border-0 shadow-sm">
                  <div className="p-4 border-b flex justify-between items-center bg-slate-50/50">
                     <h3 className="font-bold text-sm uppercase tracking-wider text-slate-500">{classData.students.length} Students</h3>
                     <Button size="sm" variant="ghost" className="text-indigo-600"><Mail className="h-4 w-4 mr-2"/> Email All</Button>
                  </div>
                  <div className="divide-y">
                     {classData.students.map((s:any) => (
                        <div key={s.id} className="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors group">
                           <div className="flex items-center gap-4">
                              <Avatar className="h-10 w-10 border"><AvatarImage src={s.image}/><AvatarFallback>{getInitials(s.name)}</AvatarFallback></Avatar>
                              <div>
                                 <p className="font-bold text-sm text-slate-900 dark:text-white">{s.name}</p>
                                 <p className="text-xs text-slate-500">{s.email}</p>
                              </div>
                           </div>
                           <div className="flex items-center gap-6">
                              <div className="text-right hidden sm:block">
                                 <p className="text-[10px] font-bold text-slate-400 uppercase">Progress</p>
                                 <div className="flex items-center gap-2 w-24">
                                    <Progress value={s.progress || 75} className="h-1.5 flex-1" />
                                    <span className="text-xs font-medium">{s.progress || 75}%</span>
                                 </div>
                              </div>
                              <Button variant="ghost" size="icon" className="text-slate-400 hover:text-indigo-600"><MessageSquare className="h-4 w-4"/></Button>
                           </div>
                        </div>
                     ))}
                  </div>
               </Card>
            </TabsContent>

          </div>
        </div>
      </Tabs>
    </motion.div>
  );
}