"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  BookOpen, Calendar, Clock, Award, Video, FileText, 
  TrendingUp, Download, CreditCard, ChevronRight, 
  Bell, Search, Settings, ArrowRight, Play,
  CheckCircle2, AlertCircle, Sparkles, Zap, GraduationCap, 
  X, UploadCloud, Heart, Star, Map, History, ShieldCheck,
  MoreHorizontal, Plus, Headphones, MessageSquare, Wallet
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

// --- TYPES ---
import { EnrollmentStatus, AttendanceStatus, SubmissionStatus, PrayerType, PrayerStatus } from "@/app/generated/prisma";

// --- ANIMATION VARIANTS ---
const staggerContainer = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } }
};

const fadeInUp = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } }
};

export default function StudentDashboardClient({ data }: { data: any }) {
  const router = useRouter();
  
  // MODAL & INTERACTION STATE
  const [activeView, setActiveView] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // --- ACTIONS ---
  const handleAction = (type: string, payload?: any) => {
    setSelectedItem(payload);
    setActiveView(type);
  };

  const closeOverlay = () => {
    setActiveView(null);
    setSelectedItem(null);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FB] dark:bg-[#020202] pb-24 selection:bg-primary/30">
      
      {/* 1. SPATIAL TOP NAVIGATION */}
      <header className="sticky top-0 z-[60] w-full border-b bg-white/70 dark:bg-black/70 backdrop-blur-xl px-4 md:px-8 py-3">
        <div className="max-w-[1600px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="h-10 w-10 bg-primary rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20 rotate-3">
              <GraduationCap className="text-white h-6 w-6" />
            </div>
            <div className="hidden lg:block">
              <h1 className="text-lg font-black tracking-tighter uppercase leading-none">Al-Ateeq Elite</h1>
              <p className="text-[10px] text-muted-foreground font-black tracking-[0.3em] uppercase opacity-60">Command Center</p>
            </div>
          </div>

          <div className="flex-1 max-w-xl mx-10 hidden md:block">
            <div className="relative group">
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
               <input 
                 placeholder="Search Quran, Assignments, or Schedule (⌘K)" 
                 className="w-full pl-12 h-11 rounded-2xl bg-secondary/40 border-none text-sm focus:ring-2 ring-primary/20 transition-all outline-none" 
               />
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <Badge variant="outline" className="hidden xl:flex border-primary/20 bg-primary/5 rounded-full px-4 h-9 items-center gap-2 font-bold text-primary">
              <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </Badge>
            <Button variant="ghost" size="icon" className="rounded-2xl bg-secondary/40 h-10 w-10">
              <Bell className="h-5 w-5" />
            </Button>
            <Avatar onClick={() => router.push('/profile')} className="h-11 w-11 border-2 border-background shadow-xl cursor-pointer hover:scale-110 transition-transform">
              <AvatarImage src={data.user.image} />
              <AvatarFallback className="font-black bg-primary text-white">{data.user.name[0]}</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <motion.main 
        variants={staggerContainer} 
        initial="hidden" 
        animate="show" 
        className="max-w-[1600px] mx-auto px-4 md:px-8 mt-8 space-y-8"
      >
        {/* 2. DYNAMIC HERO SECTION */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
          <div className="lg:col-span-8 space-y-2">
            <motion.div variants={fadeInUp} className="flex items-center gap-2 text-primary font-black text-xs uppercase tracking-widest">
              <Sparkles className="h-3 w-3" /> Spiritual Productivity: High
            </motion.div>
            <motion.h2 variants={fadeInUp} className="text-4xl md:text-6xl font-black tracking-tight leading-[0.9]">
              Marhaba, <span className="text-primary italic">{data.user.name.split(' ')[0]}</span>.
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-muted-foreground font-medium text-lg max-w-2xl">
              Today is <span className="text-foreground font-bold underline decoration-primary/40 underline-offset-4">Thursday, 29th Rajab</span>. You have 2 classes today.
            </motion.p>
          </div>
          <div className="lg:col-span-4 flex gap-3 w-full">
            <Button onClick={() => handleAction('schedule')} className="flex-1 h-14 rounded-[1.5rem] font-black shadow-2xl shadow-primary/20 bg-primary text-white hover:bg-primary/90 transition-all">
              Full Schedule <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="secondary" className="h-14 w-14 rounded-[1.5rem] p-0 bg-white shadow-xl">
              <MessageSquare className="h-6 w-6" />
            </Button>
          </div>
        </section>

        {/* 3. THE BENTO COMMAND GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* LEFT: CORE ACADEMIC & SPIRITUAL (8 COLS) */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* KPI STRIP - INTELLIGENT ANALYTICS */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
               {[
                 { label: "Attendance", val: `${data.stats.attendance}%`, trend: "+2%", icon: CheckCircle2, col: "text-emerald-500", bg: "bg-emerald-500/10" },
                 { label: "Tasks", val: data.stats.assignments, trend: "4 Overdue", icon: Zap, col: "text-amber-500", bg: "bg-amber-500/10" },
                 { label: "GPA", val: "3.85", trend: "Elite", icon: Award, col: "text-blue-500", bg: "bg-blue-500/10" },
                 { label: "Balance", val: data.stats.walletBalance > 0 ? `$${data.stats.walletBalance}` : "Clear", icon: Wallet, col: "text-rose-500", bg: "bg-rose-500/10" },
               ].map((s) => (
                 <motion.div key={s.label} variants={fadeInUp}>
                   <Card className="border-none shadow-sm rounded-3xl bg-white/50 dark:bg-zinc-900/50 backdrop-blur-md group hover:shadow-xl transition-all">
                      <CardContent className="p-4 flex flex-col gap-3">
                         <div className={cn("h-10 w-10 rounded-xl flex items-center justify-center", s.bg, s.col)}>
                            <s.icon className="h-5 w-5" />
                         </div>
                         <div>
                            <p className="text-[10px] font-black uppercase text-muted-foreground tracking-tighter">{s.label}</p>
                            <p className="text-xl font-black">{s.val}</p>
                         </div>
                      </CardContent>
                   </Card>
                 </motion.div>
               ))}
            </div>

            {/* THE MASTER HIFZ BENTO */}
            <motion.div variants={fadeInUp}>
              <Card 
                onClick={() => handleAction('hifz')}
                className="cursor-pointer border-none bg-slate-900 text-white rounded-[2.5rem] shadow-2xl overflow-hidden relative group h-[340px]"
              >
                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity duration-1000 rotate-12">
                  <BookOpen className="h-[400px] w-[400px]" />
                </div>
                <CardContent className="p-10 relative z-10 flex flex-col h-full justify-between">
                   <div className="flex justify-between items-start">
                      <div className="space-y-4">
                        <Badge className="bg-primary/20 text-primary border-none font-black px-4 py-1 tracking-widest text-[10px]">CURRENT PATHWAY</Badge>
                        <h3 className="text-5xl md:text-6xl font-black tracking-tighter">Surah {data.hifz.currentSurah}</h3>
                        <p className="text-slate-400 text-lg font-medium leading-tight max-w-md">Currently reviewing <span className="text-white italic">Juz 29</span>. Your pronunciation stability is 94%.</p>
                      </div>
                      <div className="h-24 w-24 rounded-full border-4 border-slate-800 flex items-center justify-center flex-col bg-slate-900/50 backdrop-blur-xl">
                         <span className="text-2xl font-black italic">65%</span>
                         <span className="text-[8px] font-bold uppercase text-slate-500">Juz Progress</span>
                      </div>
                   </div>

                   <div className="space-y-6">
                      <div className="flex items-center gap-3">
                         <Avatar className="h-8 w-8 ring-2 ring-primary">
                            <AvatarFallback className="bg-primary text-white text-[10px]">TM</AvatarFallback>
                         </Avatar>
                         <p className="text-sm font-bold text-slate-300 italic-none">Reviewed by Prof. Abdullah yesterday</p>
                      </div>
                      <div className="h-2.5 w-full bg-slate-800 rounded-full overflow-hidden">
                        <motion.div initial={{ width: 0 }} animate={{ width: "65%" }} transition={{ duration: 2 }} className="h-full bg-gradient-to-r from-primary via-indigo-400 to-indigo-600" />
                      </div>
                   </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* LIVE CLASS TIMELINE */}
            <motion.div variants={fadeInUp}>
               <Card className="border-none bg-white shadow-xl rounded-[2.5rem] overflow-hidden">
                  <div className="p-8 pb-0 flex items-center justify-between">
                     <h3 className="text-2xl font-black flex items-center gap-3">
                        <Video className="h-6 w-6 text-primary" /> Live Sessions
                     </h3>
                     <Badge className="bg-rose-500 text-white animate-pulse">2 LIVE NOW</Badge>
                  </div>
                  <CardContent className="p-8 space-y-4">
                    {data.sessions.map((session: any) => (
                      <div key={session.id} className="flex flex-col md:flex-row items-center justify-between p-6 rounded-[2rem] bg-slate-50 hover:bg-slate-100 transition-all group">
                         <div className="flex items-center gap-6">
                            <div className="h-16 w-16 rounded-[1.5rem] bg-white flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
                               <Play className="h-6 w-6 text-primary fill-primary" />
                            </div>
                            <div>
                               <p className="text-xl font-black leading-none mb-1">{session.className}</p>
                               <p className="text-sm text-muted-foreground font-bold">{session.startTime} - {session.endTime} • {session.teacherName}</p>
                            </div>
                         </div>
                         <Button onClick={() => handleJoinClass(session.meetingUrl)} className="w-full md:w-auto mt-4 md:mt-0 rounded-2xl h-14 px-10 font-black shadow-xl shadow-primary/10">
                            Enter Classroom
                         </Button>
                      </div>
                    ))}
                  </CardContent>
               </Card>
            </motion.div>
          </div>

          {/* RIGHT: SIDEBAR (4 COLS) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* SPIRITUAL CHECKLIST (PRAYER TRACKER) */}
            <motion.div variants={fadeInUp}>
               <Card className="border-none bg-indigo-600 text-white rounded-[2.5rem] shadow-xl p-8">
                  <h3 className="text-xl font-black mb-6 flex items-center gap-2">
                     <Heart className="h-5 w-5 fill-white" /> Daily Adhkar & Prayer
                  </h3>
                  <div className="space-y-3">
                     {["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"].map((prayer) => (
                       <div key={prayer} className="flex items-center justify-between p-4 rounded-2xl bg-white/10 hover:bg-white/20 transition-all cursor-pointer border border-white/5">
                          <span className="font-bold">{prayer}</span>
                          <CheckCircle2 className="h-5 w-5 text-indigo-200" />
                       </div>
                     ))}
                  </div>
                  <Button variant="outline" className="w-full mt-6 border-white/20 text-white hover:bg-white/10 rounded-2xl py-6 font-bold">
                     Update Prayer Log
                  </Button>
               </Card>
            </motion.div>

            {/* ASSIGNMENTS MODULE */}
            <motion.div variants={fadeInUp}>
               <Card className="border-none bg-white shadow-xl rounded-[2.5rem] p-8">
                  <div className="flex justify-between items-center mb-6">
                     <h3 className="text-xl font-black">Open Tasks</h3>
                     <Badge className="bg-amber-100 text-amber-600 border-none font-bold">{data.assignments.length}</Badge>
                  </div>
                  <div className="space-y-4">
                     {data.assignments.map((task: any) => (
                       <div 
                         key={task.id} 
                         onClick={() => handleAction('assignment', task)}
                         className="p-5 rounded-[1.5rem] border hover:border-primary transition-all cursor-pointer group flex flex-col gap-4"
                       >
                          <div className="flex justify-between items-start">
                             <p className="font-bold text-sm leading-tight group-hover:text-primary transition-colors">{task.title}</p>
                             <div className="h-8 w-8 bg-secondary rounded-lg flex items-center justify-center">
                                <Plus className="h-4 w-4" />
                             </div>
                          </div>
                          <div className="flex items-center justify-between">
                             <span className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">{task.type}</span>
                             <span className="text-[10px] font-black text-rose-500 uppercase">DUE: {new Date(task.dueDate).toLocaleDateString()}</span>
                          </div>
                       </div>
                     ))}
                  </div>
               </Card>
            </motion.div>

            {/* QUICK WALLET / BILLING */}
            {data.stats.walletBalance > 0 && (
              <motion.div variants={fadeInUp}>
                 <Card className="border-none bg-rose-50 dark:bg-rose-950/20 rounded-[2.5rem] p-8 border border-rose-100">
                    <div className="flex items-center gap-3 text-rose-600 mb-4">
                       <AlertCircle className="h-5 w-5" />
                       <p className="text-xs font-black uppercase tracking-[0.2em]">Pending Invoice</p>
                    </div>
                    <p className="text-3xl font-black text-slate-900 dark:text-white">${data.stats.walletBalance}</p>
                    <p className="text-sm text-rose-600/70 font-medium mt-2 leading-snug italic-none">Your "Advanced Arabic" subscription is due. Settle now to avoid interruption.</p>
                    <Button onClick={() => handleAction('billing')} className="w-full mt-6 bg-rose-600 hover:bg-rose-700 text-white h-14 rounded-2xl font-black shadow-lg shadow-rose-200 transition-all active:scale-95">
                       Secure Pay
                    </Button>
                 </Card>
              </motion.div>
            )}
          </div>
        </div>
      </motion.main>

      {/* --- THE ELITE SPATIAL MODAL ENGINE --- */}
      <AnimatePresence>
        {activeView && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={closeOverlay}
              className="absolute inset-0 bg-black/70 backdrop-blur-2xl"
            />
            
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 40 }}
              className="relative w-full max-w-2xl bg-white dark:bg-zinc-950 rounded-[3rem] shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] overflow-hidden"
            >
              {/* Modal Header */}
              <div className="p-10 pb-6 border-b flex justify-between items-center bg-slate-50/50 dark:bg-zinc-900/50 backdrop-blur-md">
                 <div className="space-y-1">
                    <h2 className="text-3xl font-black tracking-tight uppercase">
                      {activeView === 'hifz' ? "Memorization Map" : 
                       activeView === 'assignment' ? "Submission Portal" : 
                       activeView === 'billing' ? "Secure Checkout" : "Navigation"}
                    </h2>
                    <p className="text-sm text-muted-foreground font-medium italic-none">Context: Student ID {data.studentId}</p>
                 </div>
                 <Button variant="ghost" size="icon" className="rounded-full h-12 w-12 hover:bg-muted" onClick={closeOverlay}>
                    <X className="h-6 w-6" />
                 </Button>
              </div>

              {/* Modal Content Logic */}
              <div className="p-10 max-h-[70vh] overflow-y-auto custom-scrollbar">
                
                {/* INTERACTIVE HIFZ LOGS */}
                {activeView === 'hifz' && (
                  <div className="space-y-8">
                    <div className="grid grid-cols-2 gap-4">
                       <div className="p-6 rounded-[2rem] bg-indigo-50 border border-indigo-100 flex flex-col items-center">
                          <span className="text-xs font-black text-indigo-600 uppercase mb-2">Current Goal</span>
                          <p className="text-2xl font-black">15 Juz</p>
                       </div>
                       <div className="p-6 rounded-[2rem] bg-emerald-50 border border-emerald-100 flex flex-col items-center">
                          <span className="text-xs font-black text-emerald-600 uppercase mb-2">Mastery Rate</span>
                          <p className="text-2xl font-black text-emerald-600">92%</p>
                       </div>
                    </div>
                    <div className="space-y-4">
                       <h4 className="text-xs font-black uppercase text-muted-foreground tracking-widest">Recent Activity</h4>
                       {data.hifz.logs.map((log: any) => (
                         <div key={log.id} className="p-5 rounded-3xl border border-muted/50 flex justify-between items-center group hover:bg-muted/20 transition-all">
                            <div className="flex items-center gap-4">
                               <div className="h-10 w-10 rounded-xl bg-slate-100 flex items-center justify-center font-bold text-xs">{log.surah}</div>
                               <div>
                                  <p className="font-bold text-lg">Ayah {log.startAyah} - {log.endAyah}</p>
                                  <p className="text-xs text-muted-foreground">{new Date(log.date).toDateString()}</p>
                               </div>
                            </div>
                            <Badge className={cn("rounded-lg", log.status === 'PASS' ? 'bg-emerald-500' : 'bg-amber-500')}>
                               {log.status}
                            </Badge>
                         </div>
                       ))}
                    </div>
                  </div>
                )}

                {/* ADVANCED ASSIGNMENT SUBMISSION */}
                {activeView === 'assignment' && selectedItem && (
                  <div className="space-y-8">
                    <div className="p-8 rounded-[2rem] bg-amber-50 border border-amber-200 space-y-3">
                       <div className="flex items-center gap-2 text-amber-600 font-black text-xs uppercase tracking-widest">
                          <AlertCircle className="h-4 w-4" /> Instructor Guidance
                       </div>
                       <p className="text-sm font-bold text-amber-900 leading-relaxed italic-none">{selectedItem.description || "Refer to the module resources before submitting."}</p>
                    </div>

                    <div className="space-y-4">
                       <h4 className="text-xs font-black uppercase text-muted-foreground tracking-widest">Submit Work</h4>
                       <div className="group relative">
                          <div className="h-56 border-2 border-dashed border-muted-foreground/30 rounded-[2.5rem] flex flex-col items-center justify-center gap-4 hover:border-primary hover:bg-primary/5 transition-all cursor-pointer">
                             <div className="h-16 w-16 rounded-full bg-secondary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                                <UploadCloud className="h-8 w-8" />
                             </div>
                             <div className="text-center">
                                <p className="text-lg font-black tracking-tight">Recitation / PDF / Image</p>
                                <p className="text-sm text-muted-foreground font-medium">Max file size: 50MB</p>
                             </div>
                          </div>
                          <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" />
                       </div>
                    </div>

                    <div className="flex gap-3">
                       <Button variant="outline" className="flex-1 h-16 rounded-2xl font-bold">Save Draft</Button>
                       <Button className="flex-2 h-16 rounded-2xl font-black text-lg px-12 shadow-2xl shadow-primary/20" onClick={() => { toast.success("Submitted Successfully!"); closeOverlay(); }}>
                          Final Submit
                       </Button>
                    </div>
                  </div>
                )}

                {/* FINANCIAL / STRIPE CHECKOUT PEAK */}
                {activeView === 'billing' && (
                  <div className="space-y-8 text-center">
                    <div className="h-24 w-24 bg-rose-50 rounded-full flex items-center justify-center mx-auto shadow-inner text-rose-500">
                       <ShieldCheck className="h-12 w-12" />
                    </div>
                    <div>
                       <h3 className="text-4xl font-black tracking-tight">$ {data.stats.walletBalance}</h3>
                       <p className="text-muted-foreground font-bold mt-1 italic-none uppercase tracking-widest text-xs">Total Outstanding Amount</p>
                    </div>
                    <div className="grid grid-cols-1 gap-3">
                       <Button className="h-16 rounded-2xl font-black text-lg bg-[#635BFF] hover:bg-[#534acc] transition-all">Pay with Stripe</Button>
                       <Button variant="outline" className="h-16 rounded-2xl font-bold flex gap-2">
                          <Download className="h-4 w-4" /> Download Statement
                       </Button>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Modal Footer (Always visible) */}
              <div className="p-8 border-t bg-slate-50/50 dark:bg-zinc-900/50 flex items-center justify-center gap-4">
                 <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Secured by Al-Ateeq Academy Framework v2.0</p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}









// "use client";

// import { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import { useRouter } from "next/navigation";
// import {
//   Calendar,
//   Book,
//   TrendingUp,
//   Award,
//   Clock,
//   CheckCircle,
//   Users,
//   FileText,
//   GraduationCap,
//   Video,
//   AlertCircle,
//   Star,
//   BarChart3,
// } from "lucide-react";
// import { format, formatDistanceToNow } from "date-fns";

// // UI Components
// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Progress } from "@/components/ui/progress";

// // Animation
// const containerVariants = {
//   hidden: { opacity: 0 },
//   show: { opacity: 1, transition: { staggerChildren: 0.05 } },
// };

// const itemVariants = {
//   hidden: { y: 10, opacity: 0 },
//   show: { y: 0, opacity: 1, transition: { duration: 0.3 } },
// };

// export default function StudentDashboardClient({ data }: any) {
//   const router = useRouter();
//   const [time, setTime] = useState(new Date());

//   useEffect(() => {
//     const timer = setInterval(() => setTime(new Date()), 60000);
//     return () => clearInterval(timer);
//   }, []);

//   const getGreeting = () => {
//     const hour = time.getHours();
//     if (hour < 12) return { text: "Good Morning", emoji: "☀️" };
//     if (hour < 18) return { text: "Good Afternoon", emoji: "🌤️" };
//     return { text: "Good Evening", emoji: "🌙" };
//   };

//   const greeting = getGreeting();

//   // Quick stats for the header
//   const headerStats = [
//     { label: "Classes", value: data.stats.activeClasses, icon: Users, color: "text-blue-600" },
//     { label: "Attendance", value: `${data.stats.attendanceRate}%`, icon: CheckCircle, color: "text-emerald-600" },
//     { label: "GPA", value: data.stats.averageGrade || "A", icon: Star, color: "text-amber-600" },
//     { label: "Ayahs", value: data.stats.memorizedAyahs, icon: Book, color: "text-purple-600" },
//   ];

//   // Quick actions
//   const quickActions = [
//     { label: "Join Class", icon: Video, path: "#join", color: "bg-gradient-to-r from-primary-600 to-primary-700" },
//     { label: "Assignments", icon: FileText, path: "/student/assignments", color: "bg-gradient-to-r from-blue-600 to-cyan-600" },
//     { label: "Grades", icon: Award, path: "/student/grades", color: "bg-gradient-to-r from-emerald-600 to-teal-600" },
//     { label: "Quran", icon: Book, path: "/student/quran", color: "bg-gradient-to-r from-purple-600 to-violet-600" },
//   ];

//   return (
//     <motion.div
//       variants={containerVariants}
//       initial="hidden"
//       animate="show"
//       className="space-y-6 pb-10"
//     >
//       {/* HEADER */}
//       <motion.div variants={itemVariants}>
//         <Card className="border-none shadow-lg bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/10">
//           <CardContent className="p-8">
//             <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
//               <div>
//                 <div className="flex items-center gap-3 mb-3">
//                   <span className="text-2xl">{greeting.emoji}</span>
//                   <h1 className="text-3xl font-bold">
//                     {greeting.text}, {data.student.name.split(" ")[0]}!
//                   </h1>
//                 </div>
//                 <p className="text-muted-foreground flex items-center gap-2">
//                   <Clock className="h-4 w-4" />
//                   {format(time, "h:mm a • EEEE, MMMM d")}
//                 </p>
//                 <div className="flex flex-wrap gap-2 mt-4">
//                   <Badge className="bg-primary/10 text-primary border-primary/20">
//                     {data.student.currentLevel}
//                   </Badge>
//                   <Badge variant="outline">ID: {data.student.studentId}</Badge>
//                   {data.student.memorizationGoal && (
//                     <Badge className="bg-amber-500/10 text-amber-600 border-amber-500/20">
//                       {data.student.memorizationGoal}
//                     </Badge>
//                   )}
//                 </div>
//               </div>

//               <div className="grid grid-cols-2 gap-4">
//                 {headerStats.map((stat) => (
//                   <div key={stat.label} className="text-center p-3 bg-white dark:bg-slate-900 rounded-xl shadow">
//                     <p className="text-2xl font-bold">{stat.value}</p>
//                     <p className="text-sm text-muted-foreground">{stat.label}</p>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//       </motion.div>

//       {/* QUICK ACTIONS */}
//       <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-3">
//         {quickActions.map((action) => (
//           <button
//             key={action.label}
//             onClick={() => action.path.startsWith("/") ? router.push(action.path) : null}
//             className={`${action.color} text-white p-4 rounded-xl text-left transition-transform hover:scale-[1.02]`}
//           >
//             <action.icon className="h-6 w-6 mb-2" />
//             <p className="font-semibold">{action.label}</p>
//           </button>
//         ))}
//       </motion.div>

//       {/* MAIN CONTENT */}
//       <div className="grid gap-6 lg:grid-cols-3">
//         {/* LEFT COLUMN */}
//         <div className="lg:col-span-2 space-y-6">
//           {/* CLASSES */}
//           <motion.div variants={itemVariants}>
//             <Card>
//               <div className="p-6">
//                 <div className="flex items-center justify-between mb-4">
//                   <h2 className="text-xl font-bold flex items-center gap-2">
//                     <GraduationCap className="h-5 w-5 text-primary" />
//                     My Classes
//                   </h2>
//                   <Badge variant="outline">
//                     {data.enrollments.length} Active
//                   </Badge>
//                 </div>
//                 <div className="space-y-4">
//                   {data.enrollments.map((cls: any) => (
//                     <div key={cls.id} className="flex items-center justify-between p-4 border rounded-lg">
//                       <div>
//                         <p className="font-semibold">{cls.className}</p>
//                         <p className="text-sm text-muted-foreground">{cls.teacher}</p>
//                       </div>
//                       <div className="text-right">
//                         <p className="font-bold text-primary">{cls.progress}%</p>
//                         <Progress value={cls.progress} className="w-24 h-2" />
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </Card>
//           </motion.div>

//           {/* UPCOMING ASSIGNMENTS */}
//           {data.upcomingAssignments.length > 0 && (
//             <motion.div variants={itemVariants}>
//               <Card>
//                 <div className="p-6">
//                   <h2 className="text-xl font-bold flex items-center gap-2 mb-4">
//                     <AlertCircle className="h-5 w-5 text-amber-500" />
//                     Upcoming Deadlines
//                   </h2>
//                   <div className="space-y-3">
//                     {data.upcomingAssignments.slice(0, 3).map((assignment: any) => (
//                       <div key={assignment.id} className="flex items-center justify-between p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
//                         <div>
//                           <p className="font-medium">{assignment.title}</p>
//                           <p className="text-sm text-muted-foreground">{assignment.subject}</p>
//                         </div>
//                         <Badge variant="outline">
//                           {formatDistanceToNow(new Date(assignment.dueDate), { addSuffix: true })}
//                         </Badge>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </Card>
//             </motion.div>
//           )}
//         </div>

//         {/* RIGHT COLUMN */}
//         <div className="space-y-6">
//           {/* NEXT CLASS */}
//           {data.quickView.nextClass && (
//             <motion.div variants={itemVariants}>
//               <Card className="bg-gradient-to-br from-primary-600 to-primary-800 text-white">
//                 <div className="p-6">
//                   <div className="flex items-center gap-2 mb-4">
//                     <Calendar className="h-5 w-5" />
//                     <h3 className="font-bold">Next Class</h3>
//                   </div>
//                   <p className="text-xl font-bold mb-2">{data.quickView.nextClass.title}</p>
//                   <p className="opacity-90 mb-4">with {data.quickView.nextClass.teacher}</p>
//                   <div className="flex items-center justify-between">
//                     <Badge className="bg-white/20">
//                       <Clock className="h-3 w-3 mr-1" />
//                       {data.quickView.nextClass.time}
//                     </Badge>
//                     {data.quickView.nextClass.meetingUrl && (
//                       <Button
//                         size="sm"
//                         className="bg-white text-primary hover:bg-white/90"
//                         onClick={() => window.open(data.quickView.nextClass.meetingUrl, "_blank")}
//                       >
//                         <Video className="h-4 w-4 mr-2" />
//                         Join
//                       </Button>
//                     )}
//                   </div>
//                 </div>
//               </Card>
//             </motion.div>
//           )}

//           {/* RECENT ACTIVITY */}
//           <motion.div variants={itemVariants}>
//             <Card>
//               <div className="p-6">
//                 <h3 className="font-bold flex items-center gap-2 mb-4">
//                   <TrendingUp className="h-5 w-5 text-primary" />
//                   Recent Activity
//                 </h3>
//                 <div className="space-y-3">
//                   {data.recentActivity.slice(0, 3).map((activity: any) => (
//                     <div key={activity.id} className="text-sm">
//                       <div className="flex justify-between">
//                         <span className="font-medium">{activity.title}</span>
//                         {activity.grade && (
//                           <Badge className="bg-emerald-500/10 text-emerald-600">
//                             {activity.grade}%
//                           </Badge>
//                         )}
//                       </div>
//                       <p className="text-muted-foreground text-xs">
//                         {activity.subject} • {formatDistanceToNow(new Date(activity.submittedAt), { addSuffix: true })}
//                       </p>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </Card>
//           </motion.div>

//           {/* QUICK STATS */}
//           <motion.div variants={itemVariants}>
//             <Card>
//               <div className="p-6">
//                 <h3 className="font-bold flex items-center gap-2 mb-4">
//                   <BarChart3 className="h-5 w-5 text-primary" />
//                   Quick Stats
//                 </h3>
//                 <div className="space-y-4">
//                   <div>
//                     <div className="flex justify-between text-sm mb-1">
//                       <span>Hifz Progress</span>
//                       <span className="font-semibold">{data.quickView.hifzProgress}%</span>
//                     </div>
//                     <Progress value={data.quickView.hifzProgress} />
//                   </div>
//                   <div className="grid grid-cols-2 gap-4">
//                     <div className="text-center p-3 bg-muted rounded-lg">
//                       <p className="text-2xl font-bold">{data.stats.certificates}</p>
//                       <p className="text-xs text-muted-foreground">Certificates</p>
//                     </div>
//                     <div className="text-center p-3 bg-muted rounded-lg">
//                       <p className="text-2xl font-bold">{data.stats.materials}</p>
//                       <p className="text-xs text-muted-foreground">Materials</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </Card>
//           </motion.div>
//         </div>
//       </div>
//     </motion.div>
//   );
// }

// // "use client";

// // import { useState, useEffect } from "react";
// // import { motion } from "framer-motion";
// // import {
// //   Calendar,
// //   Book,
// //   TrendingUp,
// //   Award,
// //   Clock,
// //   ChevronRight,
// //   CheckCircle,
// //   AlertCircle,
// //   Users,
// //   Target,
// //   FileText,
// //   Sparkles,
// //   GraduationCap,
// //   Clock3,
// //   BarChart3,
// //   Trophy,
// //   Zap,
// //   Sun,
// //   Moon,
// //   Coffee,
// //   Video,
// // } from "lucide-react";
// // import { format, formatDistanceToNow } from "date-fns";

// // // UI Components
// // import {
// //   Card,
// //   CardContent,
// //   CardHeader,
// //   CardTitle,
// //   CardDescription,
// // } from "@/components/ui/card";
// // import { Button } from "@/components/ui/button";
// // import { Badge } from "@/components/ui/badge";
// // import { Progress } from "@/components/ui/progress";
// // import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// // import { ScrollArea } from "@/components/ui/scroll-area";
// // import {
// //   BarChart,
// //   Bar,
// //   XAxis,
// //   YAxis,
// //   CartesianGrid,
// //   Tooltip,
// //   ResponsiveContainer,
// // } from "recharts";

// // // Animation Variants
// // const containerVariants = {
// //   hidden: { opacity: 0 },
// //   show: { opacity: 1, transition: { staggerChildren: 0.1 } },
// // };
// // const itemVariants = {
// //   hidden: { y: 20, opacity: 0 },
// //   show: {
// //     y: 0,
// //     opacity: 1,
// //     transition: { type: "spring", stiffness: 50, damping: 15 },
// //   },
// // };
// // const shimmerVariants = {
// //   initial: { x: "-100%" },
// //   animate: {
// //     x: "200%",
// //     transition: { repeat: Infinity, duration: 2, ease: "linear" },
// //   },
// // };

// // export default function StudentDashboardClient({
// //   student,
// //   enrollments,
// //   stats,
// //   upcomingClasses,
// //   recentActivity,
// // }: any) {
// //   const [mounted, setMounted] = useState(false);
// //   const [currentTime, setCurrentTime] = useState(new Date());

// //   useEffect(() => {
// //     setMounted(true);
// //     const timer = setInterval(() => setCurrentTime(new Date()), 60000);
// //     return () => clearInterval(timer);
// //   }, []);

// //   if (!mounted) return null;

// //   const getGreeting = () => {
// //     const hour = currentTime.getHours();
// //     if (hour < 12)
// //       return {
// //         label: "Good Morning",
// //         icon: <Sun className="h-6 w-6 text-amber-500" />,
// //       };
// //     if (hour < 18)
// //       return {
// //         label: "Good Afternoon",
// //         icon: <Coffee className="h-6 w-6 text-orange-500" />,
// //       };
// //     return {
// //       label: "Good Evening",
// //       icon: <Moon className="h-6 w-6 text-indigo-500" />,
// //     };
// //   };

// //   const greeting = getGreeting();

// //   return (
// //     <motion.div
// //       variants={containerVariants}
// //       initial="hidden"
// //       animate="show"
// //       className="space-y-6 pb-10"
// //     >
// //       {/* --- HERO HEADER --- */}
// //       <motion.div
// //         variants={itemVariants}
// //         className="relative overflow-hidden rounded-3xl"
// //       >
// //         <div className="absolute inset-0 bg-gradient-to-br from-primary-600/20 via-primary-500/10 to-transparent" />
// //         <div className="absolute inset-0 bg-grid-pattern opacity-5" />
// //         <motion.div
// //           variants={shimmerVariants}
// //           initial="initial"
// //           animate="animate"
// //           className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
// //         />

// //         <Card className="relative border-none shadow-2xl overflow-hidden backdrop-blur-sm bg-background/80">
// //           <CardContent className="p-8">
// //             <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
// //               <div className="flex-1 space-y-4">
// //                 <div className="flex items-center gap-4">
// //                   <div className="p-3 rounded-2xl bg-white shadow-xl dark:bg-slate-900 border border-primary/10">
// //                     {greeting.icon}
// //                   </div>
// //                   <div>
// //                     <h1 className="text-3xl lg:text-4xl font-black tracking-tight bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
// //                       {greeting.label}, {student.name.split(" ")[0]}!
// //                     </h1>
// //                     <div className="flex items-center gap-2 mt-1 text-muted-foreground font-medium">
// //                       <Clock className="h-4 w-4" />
// //                       {format(currentTime, "h:mm a")} •{" "}
// //                       {format(currentTime, "EEEE, MMMM do")}
// //                     </div>
// //                   </div>
// //                 </div>

// //                 <div className="flex flex-wrap items-center gap-3">
// //                   <Badge className="rounded-full bg-primary/10 text-primary hover:bg-primary/20 border-primary/20 px-4 py-1.5 font-bold">
// //                     <GraduationCap className="h-3.5 w-3.5 mr-2" />
// //                     {student.currentLevel}
// //                   </Badge>
// //                   <Badge className="rounded-full bg-emerald-500/10 text-emerald-600 border-emerald-500/20 px-4 py-1.5 font-bold">
// //                     <Trophy className="h-3.5 w-3.5 mr-2" />
// //                     {stats.certificates} Certificates
// //                   </Badge>
// //                   <Badge
// //                     variant="outline"
// //                     className="rounded-full px-4 py-1.5 font-bold"
// //                   >
// //                     ID: {student.studentId}
// //                   </Badge>
// //                 </div>
// //               </div>

// //               <div className="flex items-center gap-6 bg-white/50 dark:bg-black/20 p-6 rounded-3xl border border-white/40">
// //                 <HeaderStat
// //                   label="Attendance"
// //                   value={`${stats.attendanceRate}%`}
// //                   color="text-emerald-600"
// //                 />
// //                 <div className="w-px h-10 bg-border" />
// //                 <HeaderStat
// //                   label="GPA"
// //                   value={stats.averageGrade || "A"}
// //                   color="text-primary"
// //                 />
// //                 <div className="w-px h-10 bg-border" />
// //                 <HeaderStat
// //                   label="Ayahs"
// //                   value={stats.memorizedAyahs}
// //                   color="text-amber-600"
// //                 />
// //               </div>
// //             </div>
// //           </CardContent>
// //         </Card>
// //       </motion.div>

// //       {/* --- QUICK STATS GRID --- */}
// //       <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
// //         <MetricCard
// //           title="Active Classes"
// //           value={stats.activeClasses}
// //           icon={Users}
// //           color="from-blue-500 to-indigo-600"
// //           progress={80}
// //         />
// //         <MetricCard
// //           title="Hifz Goals"
// //           value={`${Math.floor(stats.memorizedAyahs / 20)} Juz`}
// //           icon={Book}
// //           color="from-purple-500 to-violet-600"
// //           progress={(stats.memorizedAyahs / 6236) * 100}
// //         />
// //         <MetricCard
// //           title="Completed"
// //           value={stats.assignmentsCompleted}
// //           icon={FileText}
// //           color="from-emerald-500 to-teal-600"
// //           progress={stats.assignmentsCompleted * 10}
// //         />
// //         <MetricCard
// //           title="Next Session"
// //           value="14:00"
// //           icon={Zap}
// //           color="from-amber-500 to-orange-600"
// //           progress={100}
// //         />
// //       </div>

// //       <div className="grid gap-6 lg:grid-cols-3">
// //         {/* LEFT COLUMN */}
// //         <div className="lg:col-span-2 space-y-6">
// //           {/* Today's Schedule */}
// //           <Card className="shadow-xl border-none overflow-hidden">
// //             <CardHeader className="bg-muted/30 border-b border-border/50">
// //               <CardTitle className="flex items-center gap-2">
// //                 <Calendar className="h-5 w-5 text-primary" />
// //                 Live Classes Today
// //               </CardTitle>
// //             </CardHeader>
// //             <CardContent className="p-0">
// //               <ScrollArea className="h-[320px]">
// //                 <div className="p-6 space-y-4">
// //                   {upcomingClasses.length === 0 ? (
// //                     <div className="text-center py-12 text-muted-foreground">
// //                       No classes scheduled for today.
// //                     </div>
// //                   ) : (
// //                     upcomingClasses.map((cls: any) => (
// //                       <div
// //                         key={cls.id}
// //                         className="flex items-center justify-between p-5 rounded-2xl bg-muted/30 border border-border/50 group hover:border-primary/40 transition-all"
// //                       >
// //                         <div className="flex items-center gap-4">
// //                           <Avatar className="h-12 w-12 border-2 border-background shadow-lg">
// //                             <AvatarImage src={cls.teacher.image} />
// //                             <AvatarFallback>T</AvatarFallback>
// //                           </Avatar>
// //                           <div>
// //                             <p className="font-bold text-lg">{cls.title}</p>
// //                             <p className="text-sm text-muted-foreground flex items-center gap-2">
// //                               {cls.teacher.name} • <Clock className="h-3 w-3" />{" "}
// //                               {cls.startTime}
// //                             </p>
// //                           </div>
// //                         </div>
// //                         <Button
// //                           className="rounded-full px-6 bg-primary hover:bg-primary-700 shadow-lg shadow-primary/20"
// //                           disabled={!cls.meetingUrl}
// //                           onClick={() => window.open(cls.meetingUrl, "_blank")}
// //                         >
// //                           <Video className="h-4 w-4 mr-2" /> Join
// //                         </Button>
// //                       </div>
// //                     ))
// //                   )}
// //                 </div>
// //               </ScrollArea>
// //             </CardContent>
// //           </Card>

// //           {/* Subjects Grid */}
// //           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //             {enrollments.map((e: any) => (
// //               <Card
// //                 key={e.id}
// //                 className="border-none shadow-lg group hover:-translate-y-1 transition-all"
// //               >
// //                 <CardContent className="p-6">
// //                   <div className="flex justify-between items-start mb-4">
// //                     <div
// //                       className={`p-2 rounded-xl bg-primary/10 text-primary`}
// //                     >
// //                       <Book className="h-5 w-5" />
// //                     </div>
// //                     <Badge
// //                       variant="outline"
// //                       className="text-[10px] font-bold uppercase"
// //                     >
// //                       {e.class.code}
// //                     </Badge>
// //                   </div>
// //                   <h4 className="font-bold text-xl mb-1">{e.class.name}</h4>
// //                   <p className="text-sm text-muted-foreground mb-4">
// //                     Instructor: {e.class.teacher.user.name}
// //                   </p>
// //                   <div className="space-y-2">
// //                     <div className="flex justify-between text-xs font-bold text-muted-foreground">
// //                       <span>Course Progress</span>
// //                       <span>{e.progress}%</span>
// //                     </div>
// //                     <Progress
// //                       value={e.progress}
// //                       className="h-1.5 bg-muted"
// //                       indicatorClassName="bg-primary"
// //                     />
// //                   </div>
// //                 </CardContent>
// //               </Card>
// //             ))}
// //           </div>
// //         </div>

// //         {/* RIGHT COLUMN */}
// //         <div className="space-y-6">
// //           {/* Achievement Progress */}
// //           <Card className="border-none shadow-xl bg-gradient-to-br from-primary-600 to-indigo-700 text-white overflow-hidden">
// //             <div className="absolute top-0 right-0 p-8 opacity-10">
// //               <Trophy className="h-32 w-32" />
// //             </div>
// //             <CardContent className="p-6 space-y-6">
// //               <div className="flex items-center gap-2">
// //                 <Sparkles className="h-5 w-5 text-amber-300" />
// //                 <span className="font-bold text-sm tracking-wider uppercase">
// //                   Next Milestone
// //                 </span>
// //               </div>
// //               <div>
// //                 <h3 className="text-2xl font-black">
// //                   {student.memorizationGoal || "Hafiz Mastery"}
// //                 </h3>
// //                 <p className="text-primary-100 text-sm mt-1">
// //                   Keep up your daily recitation!
// //                 </p>
// //               </div>
// //               <div className="space-y-2">
// //                 <Progress
// //                   value={75}
// //                   className="h-2 bg-white/20"
// //                   indicatorClassName="bg-amber-400"
// //                 />
// //                 <p className="text-[10px] font-bold text-right opacity-80 uppercase">
// //                   75% Complete
// //                 </p>
// //               </div>
// //             </CardContent>
// //           </Card>

// //           {/* Recent Activity Feed */}
// //           <Card className="border-none shadow-xl">
// //             <CardHeader>
// //               <CardTitle className="text-lg flex items-center gap-2">
// //                 <TrendingUp className="h-5 w-5 text-primary" />
// //                 Recent Activity
// //               </CardTitle>
// //             </CardHeader>
// //             <CardContent>
// //               <div className="space-y-6">
// //                 {recentActivity.map((activity: any) => (
// //                   <div key={activity.id} className="flex gap-4 group">
// //                     <div
// //                       className={`mt-1 p-2 rounded-xl h-fit ${activity.type === "GRADE" ? "bg-emerald-500/10 text-emerald-600" : "bg-primary/10 text-primary"}`}
// //                     >
// //                       {activity.type === "GRADE" ? (
// //                         <Award className="h-4 w-4" />
// //                       ) : (
// //                         <FileText className="h-4 w-4" />
// //                       )}
// //                     </div>
// //                     <div className="flex-1">
// //                       <p className="text-sm font-bold group-hover:text-primary transition-colors">
// //                         {activity.title}
// //                       </p>
// //                       <p className="text-xs text-muted-foreground line-clamp-1">
// //                         {activity.description}
// //                       </p>
// //                       <p className="text-[10px] text-muted-foreground mt-1 uppercase font-bold tracking-tighter">
// //                         {formatDistanceToNow(new Date(activity.timestamp), {
// //                           addSuffix: true,
// //                         })}
// //                       </p>
// //                     </div>
// //                   </div>
// //                 ))}
// //               </div>
// //             </CardContent>
// //           </Card>

// //           {/* Study Analytics Chart */}
// //           <Card className="border-none shadow-xl">
// //             <CardHeader>
// //               <CardTitle className="text-lg flex items-center gap-2">
// //                 <BarChart3 className="h-5 w-5 text-primary" />
// //                 Study Intensity
// //               </CardTitle>
// //             </CardHeader>
// //             <CardContent className="h-[200px] w-full mt-4">
// //               <ResponsiveContainer width="100%" height="100%">
// //                 <BarChart data={MOCK_CHART}>
// //                   <XAxis dataKey="day" hide />
// //                   <Tooltip
// //                     contentStyle={{
// //                       borderRadius: "12px",
// //                       border: "none",
// //                       boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
// //                     }}
// //                   />
// //                   <Bar
// //                     dataKey="val"
// //                     fill="hsl(var(--primary))"
// //                     radius={[4, 4, 0, 0]}
// //                   />
// //                 </BarChart>
// //               </ResponsiveContainer>
// //             </CardContent>
// //           </Card>
// //         </div>
// //       </div>
// //     </motion.div>
// //   );
// // }

// // // Sub-components
// // function HeaderStat({ label, value, color }: any) {
// //   return (
// //     <div className="text-center px-2">
// //       <p className="text-[10px] uppercase font-black text-muted-foreground tracking-widest">
// //         {label}
// //       </p>
// //       <p className={`text-2xl font-black ${color}`}>{value}</p>
// //     </div>
// //   );
// // }

// // function MetricCard({ title, value, icon: Icon, color, progress }: any) {
// //   return (
// //     <Card className="border-none shadow-lg overflow-hidden group hover:shadow-2xl transition-all duration-300">
// //       <CardContent className="p-6">
// //         <div className="flex justify-between items-start mb-4">
// //           <div>
// //             <p className="text-sm font-bold text-muted-foreground uppercase tracking-tighter">
// //               {title}
// //             </p>
// //             <h3 className="text-3xl font-black mt-1">{value}</h3>
// //           </div>
// //           <div
// //             className={`p-3 rounded-2xl bg-gradient-to-br ${color} text-white shadow-xl group-hover:rotate-12 transition-transform`}
// //           >
// //             <Icon className="h-6 w-6" />
// //           </div>
// //         </div>
// //         <Progress
// //           value={progress}
// //           className="h-1.5 bg-muted"
// //           indicatorClassName={`bg-gradient-to-r ${color}`}
// //         />
// //       </CardContent>
// //     </Card>
// //   );
// // }

// // const MOCK_CHART = [
// //   { day: "M", val: 40 },
// //   { day: "T", val: 70 },
// //   { day: "W", val: 50 },
// //   { day: "T", val: 90 },
// //   { day: "F", val: 30 },
// //   { day: "S", val: 60 },
// //   { day: "S", val: 45 },
// // ];

// // // "use client";

// // // import { useState, useEffect } from "react";
// // // import { motion } from "framer-motion";
// // // import {
// // //   Sun,
// // //   Moon,
// // //   Coffee,
// // //   Video,
// // //   BookOpen,
// // //   Clock,
// // //   Calendar,
// // //   CheckCircle,
// // //   ChevronRight,
// // //   Zap,
// // //   Bell,
// // //   CreditCard,
// // //   Target,
// // //   GraduationCap,
// // //   FileText,
// // //   Download,
// // //   Star,
// // //   Heart,
// // //   MessageSquare,
// // //   Award,
// // //   TrendingUp,
// // //   AlertCircle,
// // // } from "lucide-react";
// // // import { format, formatDistanceToNow } from "date-fns";
// // // import {
// // //   Card,
// // //   CardContent,
// // //   CardHeader,
// // //   CardTitle,
// // //   CardDescription,
// // // } from "@/components/ui/card";
// // // import { Button } from "@/components/ui/button";
// // // import { Badge } from "@/components/ui/badge";
// // // import { Progress } from "@/components/ui/progress";
// // // import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// // // import { ScrollArea } from "@/components/ui/scroll-area";
// // // import {
// // //   BarChart,
// // //   Bar,
// // //   XAxis,
// // //   YAxis,
// // //   CartesianGrid,
// // //   Tooltip,
// // //   ResponsiveContainer,
// // // } from "recharts";

// // // const container = { show: { transition: { staggerChildren: 0.1 } } };
// // // const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

// // // export default function StudentDashboardClient({
// // //   student,
// // //   enrollments,
// // //   stats,
// // //   upcomingClasses,
// // //   recentActivity,
// // //   prayers,
// // //   hifzComments,
// // //   materials,
// // // }: any) {
// // //   const [mounted, setMounted] = useState(false);
// // //   useEffect(() => setMounted(true), []);
// // //   if (!mounted) return null;

// // //   const getGreeting = () => {
// // //     const h = new Date().getHours();
// // //     if (h < 12)
// // //       return { t: "Good Morning", i: <Sun className="text-amber-500" /> };
// // //     if (h < 18)
// // //       return { t: "Good Afternoon", i: <Coffee className="text-orange-500" /> };
// // //     return { t: "Good Evening", i: <Moon className="text-indigo-400" /> };
// // //   };

// // //   const greet = getGreeting();

// // //   return (
// // //     <motion.div
// // //       variants={container}
// // //       initial="hidden"
// // //       animate="show"
// // //       className="space-y-6 pb-12"
// // //     >
// // //       {/* --- HERO SECTION --- */}
// // //       <motion.div
// // //         variants={item}
// // //         className="relative overflow-hidden rounded-[2.5rem] border border-primary/10 shadow-2xl"
// // //       >
// // //         <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/5 to-transparent" />
// // //         <Card className="relative border-none bg-background/40 backdrop-blur-md p-8">
// // //           <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
// // //             <div className="flex items-center gap-6">
// // //               <div className="p-4 rounded-3xl bg-background shadow-2xl border border-primary/10">
// // //                 {greet.i}
// // //               </div>
// // //               <div>
// // //                 <h1 className="text-4xl font-black tracking-tight">
// // //                   {greet.t}, {student.name.split(" ")[0]}!
// // //                 </h1>
// // //                 <p className="text-muted-foreground font-medium flex items-center gap-2">
// // //                   <Clock className="w-4 h-4" />{" "}
// // //                   {format(new Date(), "EEEE, MMMM do")}
// // //                 </p>
// // //               </div>
// // //             </div>
// // //             <div className="flex gap-6">
// // //               <HUDStat
// // //                 label="Hifz Rank"
// // //                 value={student.hifzLevel || "Beginner"}
// // //               />
// // //               <div className="w-px h-12 bg-border" />
// // //               <HUDStat label="Attendance" value={`${stats.attendanceRate}%`} />
// // //               <div className="w-px h-12 bg-border" />
// // //               <HUDStat label="Ayahs" value={stats.memorizedAyahs} />
// // //             </div>
// // //           </div>
// // //         </Card>
// // //       </motion.div>

// // //       {/* --- STATS GRID --- */}
// // //       <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
// // //         <MetricCard
// // //           title="Active Classes"
// // //           value={stats.activeClasses}
// // //           icon={GraduationCap}
// // //           color="from-blue-500 to-indigo-600"
// // //           progress={80}
// // //         />
// // //         <MetricCard
// // //           title="Completed"
// // //           value={stats.assignmentsCompleted}
// // //           icon={CheckCircle}
// // //           color="from-emerald-500 to-teal-600"
// // //           progress={70}
// // //         />
// // //         <MetricCard
// // //           title="Spiritual Balance"
// // //           value="Active"
// // //           icon={Heart}
// // //           color="from-purple-500 to-pink-600"
// // //           progress={100}
// // //         />
// // //         <MetricCard
// // //           title="Dues"
// // //           value={`$${stats.pendingInvoice}`}
// // //           icon={CreditCard}
// // //           color="from-amber-500 to-orange-600"
// // //           progress={40}
// // //         />
// // //       </div>

// // //       <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
// // //         {/* LEFT AREA: Learning Cockpit */}
// // //         <div className="lg:col-span-8 space-y-6">
// // //           {/* Priority Focus: Next Class */}
// // //           <Card className="rounded-[2.5rem] border-none bg-primary text-primary-foreground shadow-xl overflow-hidden">
// // //             <CardContent className="p-8 flex flex-col md:flex-row justify-between items-center gap-6">
// // //               <div className="space-y-1">
// // //                 <Badge className="bg-black/20 text-white border-none">
// // //                   Next Priority
// // //                 </Badge>
// // //                 <h2 className="text-4xl font-black">
// // //                   {upcomingClasses[0]?.title || "Self Study"}
// // //                 </h2>
// // //                 <p className="opacity-80 flex items-center gap-2">
// // //                   <Clock className="w-4 h-4" /> Starting at{" "}
// // //                   {upcomingClasses[0]?.startTime || "--:--"}
// // //                 </p>
// // //               </div>
// // //               <Button
// // //                 size="lg"
// // //                 className="bg-white text-primary font-black hover:bg-slate-100 h-14 rounded-2xl"
// // //                 disabled={!upcomingClasses[0]?.meetingUrl}
// // //                 onClick={() =>
// // //                   window.open(upcomingClasses[0]?.meetingUrl, "_blank")
// // //                 }
// // //               >
// // //                 <Video className="w-5 h-5 mr-2" /> Join Studio
// // //               </Button>
// // //             </CardContent>
// // //           </Card>

// // //           {/* Academic Courses List */}
// // //           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// // //             {enrollments.map((e: any) => (
// // //               <Card key={e.id} className="rounded-[2rem] border-none shadow-lg">
// // //                 <CardContent className="p-6 space-y-4">
// // //                   <div className="flex justify-between">
// // //                     <Badge
// // //                       variant="secondary"
// // //                       className="bg-primary/10 text-primary uppercase text-[10px]"
// // //                     >
// // //                       {e.class.code}
// // //                     </Badge>
// // //                     <TrendingUp className="w-4 h-4 text-slate-300" />
// // //                   </div>
// // //                   <h4 className="text-xl font-black">{e.class.name}</h4>
// // //                   <div className="space-y-1.5">
// // //                     <div className="flex justify-between text-[10px] font-black uppercase">
// // //                       <span>Course Mastery</span>
// // //                       <span>{e.progress}%</span>
// // //                     </div>
// // //                     <Progress value={e.progress} className="h-1.5" />
// // //                   </div>
// // //                 </CardContent>
// // //               </Card>
// // //             ))}
// // //           </div>

// // //           {/* Download Center (New Feature) */}
// // //           <Card className="rounded-[2rem] border-none shadow-lg">
// // //             <CardHeader className="flex flex-row items-center justify-between">
// // //               <CardTitle className="font-black flex items-center gap-2">
// // //                 <Download className="w-5 h-5 text-primary" /> Learning Resources
// // //               </CardTitle>
// // //               <Button variant="ghost" size="sm" className="text-xs font-bold">
// // //                 View Archive
// // //               </Button>
// // //             </CardHeader>
// // //             <CardContent className="space-y-3">
// // //               {materials.map((m: any) => (
// // //                 <div
// // //                   key={m.id}
// // //                   className="flex items-center justify-between p-3 rounded-2xl bg-muted/50 hover:bg-muted transition-colors cursor-pointer"
// // //                 >
// // //                   <div className="flex items-center gap-3">
// // //                     <FileText className="w-4 h-4 text-slate-400" />
// // //                     <p className="text-sm font-bold truncate max-w-[200px]">
// // //                       {m.title}
// // //                     </p>
// // //                   </div>
// // //                   <Badge variant="outline" className="text-[9px]">
// // //                     {m.fileType || "PDF"}
// // //                   </Badge>
// // //                 </div>
// // //               ))}
// // //             </CardContent>
// // //           </Card>
// // //         </div>

// // //         {/* RIGHT AREA: Sidebar Intelligence */}
// // //         <div className="lg:col-span-4 space-y-6">
// // //           {/* 1. Prayer Habit Tracker (New Feature) */}
// // //           <Card className="rounded-[2rem] border-none shadow-xl bg-slate-900 text-white p-6">
// // //             <CardTitle className="text-sm font-black flex items-center gap-2 mb-6 uppercase tracking-widest">
// // //               <Zap className="w-4 h-4 text-primary" /> Prayer Habit
// // //             </CardTitle>
// // //             <div className="flex justify-between">
// // //               {["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"].map((p) => (
// // //                 <div key={p} className="flex flex-col items-center gap-2">
// // //                   <div
// // //                     className={`w-10 h-10 rounded-xl flex items-center justify-center ${prayers.find((r: any) => r.prayer === p.toUpperCase())?.status === "PERFORMED" ? "bg-primary text-black" : "bg-white/5 text-slate-500"}`}
// // //                   >
// // //                     <Star className="w-4 h-4 fill-current" />
// // //                   </div>
// // //                   <span className="text-[9px] font-black uppercase opacity-60">
// // //                     {p[0]}
// // //                   </span>
// // //                 </div>
// // //               ))}
// // //             </div>
// // //           </Card>

// // //           {/* 2. Latest Teacher Feedback (New Feature) */}
// // //           <Card className="rounded-[2rem] border-none shadow-xl bg-primary/5 p-6 border-l-4 border-primary">
// // //             <div className="flex items-center gap-2 font-black text-xs uppercase mb-4 text-primary">
// // //               <MessageSquare className="w-4 h-4" /> Teacher Remarks
// // //             </div>
// // //             <p className="text-sm italic text-slate-600 dark:text-slate-400 font-medium">
// // //               "{hifzComments}"
// // //             </p>
// // //             <div className="mt-4 flex items-center gap-2">
// // //               <Avatar className="w-6 h-6">
// // //                 <AvatarFallback>T</AvatarFallback>
// // //               </Avatar>
// // //               <span className="text-[10px] font-bold opacity-60">
// // //                 Lead Instructor
// // //               </span>
// // //             </div>
// // //           </Card>

// // //           {/* 3. Upcoming Deadlines */}
// // //           <Card className="rounded-[2rem] border-none shadow-xl p-6">
// // //             <CardTitle className="text-sm font-black flex items-center gap-2 mb-6 uppercase tracking-widest text-slate-500">
// // //               Deadlines
// // //             </CardTitle>
// // //             <div className="space-y-4">
// // //               {recentActivity.slice(0, 3).map((act: any) => (
// // //                 <div key={act.id} className="flex gap-3">
// // //                   <div className="p-2 bg-muted rounded-lg">
// // //                     <Clock className="w-4 h-4" />
// // //                   </div>
// // //                   <div>
// // //                     <p className="text-xs font-bold leading-tight">
// // //                       {act.title}
// // //                     </p>
// // //                     <p className="text-[9px] text-muted-foreground uppercase">
// // //                       {formatDistanceToNow(new Date(act.timestamp))} left
// // //                     </p>
// // //                   </div>
// // //                 </div>
// // //               ))}
// // //             </div>
// // //           </Card>

// // //           {/* 4. Support Shortcut */}
// // //           <div className="p-6 rounded-[2rem] bg-gradient-to-br from-indigo-600 to-primary text-white shadow-xl">
// // //             <p className="text-xs font-black uppercase opacity-80 mb-2">
// // //               Need help?
// // //             </p>
// // //             <h4 className="font-bold mb-4">Contact Student Affairs</h4>
// // //             <Button
// // //               variant="secondary"
// // //               className="w-full rounded-xl h-10 font-bold text-xs bg-white text-black"
// // //             >
// // //               Chat with Admin
// // //             </Button>
// // //           </div>
// // //         </div>
// // //       </div>
// // //     </motion.div>
// // //   );
// // // }

// // // function HUDStat({ label, value }: any) {
// // //   return (
// // //     <div className="text-center">
// // //       <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">
// // //         {label}
// // //       </p>
// // //       <p className="text-2xl font-black">{value}</p>
// // //     </div>
// // //   );
// // // }

// // // function MetricCard({ title, value, icon: Icon, color, progress }: any) {
// // //   return (
// // //     <Card className="border-none shadow-lg group hover:scale-[1.02] transition-all duration-300">
// // //       <CardContent className="p-6">
// // //         <div className="flex justify-between items-start mb-4">
// // //           <div>
// // //             <p className="text-[10px] font-black text-slate-500 uppercase">
// // //               {title}
// // //             </p>
// // //             <h3 className="text-2xl font-black mt-1">{value}</h3>
// // //           </div>
// // //           <div
// // //             className={`p-3 rounded-2xl bg-gradient-to-br ${color} text-white shadow-lg`}
// // //           >
// // //             <Icon className="w-5 h-5" />
// // //           </div>
// // //         </div>
// // //         <Progress value={progress} className="h-1" />
// // //       </CardContent>
// // //     </Card>
// // //   );
// // // }
