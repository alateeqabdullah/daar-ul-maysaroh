"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, Plus, MoreVertical, Edit, Trash2, 
  FileText, Video, Image as ImageIcon, Music, 
  Download, Share2, Loader2, X, UploadCloud, 
  HardDrive, LayoutGrid, List as ListIcon, 
  ExternalLink
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Counter } from "@/components/admin/dashboard-ui";
import { cn } from "@/lib/utils";

// --- ANIMATION ---
const containerVariants = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.05 } } };
const itemVariants = { hidden: { y: 20, opacity: 0 }, show: { y: 0, opacity: 1 } };

// --- STRICT TYPES ---
export interface ResourceData {
  id: string;
  title: string;
  description: string | null;
  type: "DOCUMENT" | "VIDEO" | "AUDIO" | "IMAGE"; // Specific union type
  fileUrl: string;
  fileSize: string;
  classId: string;
  className: string;
  classCode: string;
  downloads: number;
  createdAt: string;
}

export interface ClassOption {
  id: string;
  name: string;
}

export interface ResourceStats {
  totalFiles: number;
  totalSize: string;
  videos: number;
  docs: number;
}

interface Props {
  resources: ResourceData[];
  classes: ClassOption[];
  stats: ResourceStats;
}

interface ResourceFormState {
  title: string;
  description: string;
  classId: string;
  type: "DOCUMENT" | "VIDEO" | "AUDIO" | "IMAGE";
  fileUrl: string;
}

export default function TeacherResourcesClient({ resources: initialResources, classes, stats }: Props) {
  const router = useRouter();
  const [resources, setResources] = useState<ResourceData[]>(initialResources);
  const [isLoading, setIsLoading] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  
  // Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<string>("ALL");
  const [filterClass, setFilterClass] = useState("ALL");
  
  // Modal
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [formData, setFormData] = useState<ResourceFormState>({ 
    title: "", 
    description: "", 
    classId: "", 
    type: "DOCUMENT", 
    fileUrl: "" 
  });

  // --- FILTER LOGIC ---
  const filteredResources = useMemo(() => {
    return resources.filter(r => {
      const term = searchQuery.toLowerCase();
      const matchesSearch = r.title.toLowerCase().includes(term) || r.className.toLowerCase().includes(term);
      const matchesType = filterType === "ALL" || r.type === filterType;
      const matchesClass = filterClass === "ALL" || r.classId === filterClass;
      return matchesSearch && matchesType && matchesClass;
    });
  }, [resources, searchQuery, filterType, filterClass]);

  // --- ACTIONS ---

  const handleUpload = async () => {
    if (!formData.title || !formData.classId || !formData.fileUrl) return toast.error("Required fields missing");
    setIsLoading(true);

    try {
      const res = await fetch("/api/teacher/resources/manage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "UPLOAD", data: formData }),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.error);

      setResources([result.resource, ...resources]);
      toast.success("Resource Uploaded");
      setIsUploadOpen(false);
      setFormData({ title: "", description: "", classId: "", type: "DOCUMENT", fileUrl: "" });
    } catch {
      toast.error("Upload failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if(!confirm("Delete this file?")) return;
    setResources(prev => prev.filter(r => r.id !== id));
    try {
      await fetch("/api/teacher/resources/manage", {
        method: "POST",
        body: JSON.stringify({ action: "DELETE", resourceId: id }),
      });
      toast.success("Deleted");
    } catch {
      toast.error("Failed");
      router.refresh();
    }
  };

  // --- HELPERS ---
  const getFileIcon = (type: string) => {
    switch (type) {
      case "DOCUMENT": return { icon: FileText, color: "text-blue-500 bg-blue-100" };
      case "VIDEO": return { icon: Video, color: "text-rose-500 bg-rose-100" };
      case "AUDIO": return { icon: Music, color: "text-purple-500 bg-purple-100" };
      case "IMAGE": return { icon: ImageIcon, color: "text-amber-500 bg-amber-100" };
      default: return { icon: FileText, color: "text-slate-500 bg-slate-100" };
    }
  };

  const statCards = [
    { label: "Total Resources", value: resources.length, icon: HardDrive, color: "from-blue-500 to-indigo-500", shadow: "shadow-blue-500/20" },
    { label: "Videos", value: stats.videos, icon: Video, color: "from-rose-500 to-pink-500", shadow: "shadow-rose-500/20" },
    { label: "Documents", value: stats.docs, icon: FileText, color: "from-emerald-500 to-green-500", shadow: "shadow-emerald-500/20" },
    { label: "Total Size", value: stats.totalSize, icon: UploadCloud, color: "from-amber-400 to-orange-500", shadow: "shadow-amber-500/20", isText: true },
  ];

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="show" className="space-y-8 pb-10">
      
      {/* HEADER */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Resources</h1>
          <p className="text-muted-foreground mt-1">Manage educational materials</p>
        </div>
        <div className="flex gap-2">
           <div className="flex items-center bg-muted p-1 rounded-lg border">
              <Button size="icon" variant={viewMode === "grid" ? "white" : "ghost"} onClick={() => setViewMode("grid")}><LayoutGrid className="h-4 w-4"/></Button>
              <Button size="icon" variant={viewMode === "list" ? "white" : "ghost"} onClick={() => setViewMode("list")}><ListIcon className="h-4 w-4"/></Button>
            </div>
           <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-md hover:scale-105 transition-all gap-2" onClick={() => setIsUploadOpen(true)}>
             <Plus className="h-4 w-4 mr-2" /> Upload
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
                    <div className="text-2xl font-bold mt-2">{stat.isText ? stat.value : <Counter value={stat.value as number} />}</div>
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
           <Input placeholder="Search resources..." className="pl-9 bg-white dark:bg-slate-950 border-muted" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
        </div>
        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger className="w-[180px] bg-white dark:bg-slate-950 border-muted"><SelectValue placeholder="Type" /></SelectTrigger>
          <SelectContent><SelectItem value="ALL">All Types</SelectItem><SelectItem value="DOCUMENT">Documents</SelectItem><SelectItem value="VIDEO">Videos</SelectItem><SelectItem value="AUDIO">Audio</SelectItem></SelectContent>
        </Select>
        <Select value={filterClass} onValueChange={setFilterClass}>
          <SelectTrigger className="w-[200px] bg-white dark:bg-slate-950 border-muted"><SelectValue placeholder="Class" /></SelectTrigger>
          <SelectContent><SelectItem value="ALL">All Classes</SelectItem>{classes.map((c) => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}</SelectContent>
        </Select>
      </motion.div>

      {/* CONTENT: GRID OR LIST */}
      {viewMode === "grid" ? (
        <motion.div variants={containerVariants} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredResources.map((r) => {
            const iconData = getFileIcon(r.type);
            const Icon = iconData.icon;
            
            return (
              <motion.div key={r.id} variants={itemVariants} layoutId={r.id}>
                <Card className="group h-full border hover:border-blue-300 dark:hover:border-blue-800 transition-all hover:shadow-xl bg-card">
                  <CardContent className="p-6 flex flex-col h-full">
                     <div className="flex justify-between items-start mb-4">
                        <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center shadow-sm", iconData.color)}>
                           <Icon className="h-6 w-6"/>
                        </div>
                        <DropdownMenu>
                           <DropdownMenuTrigger asChild><Button size="icon" variant="ghost" className="h-8 w-8 -mr-2"><MoreVertical className="h-4 w-4"/></Button></DropdownMenuTrigger>
                           <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => window.open(r.fileUrl, '_blank')}><ExternalLink className="mr-2 h-4 w-4"/> Open</DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleDelete(r.id)} className="text-red-600"><Trash2 className="mr-2 h-4 w-4"/> Delete</DropdownMenuItem>
                           </DropdownMenuContent>
                        </DropdownMenu>
                     </div>
                     
                     <h3 className="font-bold text-lg mb-2 truncate" title={r.title}>{r.title}</h3>
                     <p className="text-xs text-muted-foreground line-clamp-2 mb-4">{r.description || "No description."}</p>

                     <div className="mt-auto pt-4 border-t flex justify-between items-center text-xs text-muted-foreground">
                        <span className="font-medium bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">{r.className}</span>
                        <span>{r.fileSize}</span>
                     </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      ) : (
        /* LIST VIEW */
        <motion.div variants={containerVariants}>
          <Card className="border-none shadow-sm overflow-hidden bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
            <CardContent className="p-0">
               <div className="overflow-x-auto">
                 <table className="w-full text-sm">
                    <thead className="bg-muted/30 border-b"><tr><th className="px-6 py-4 text-left">Name</th><th className="px-6 py-4 text-left">Class</th><th className="px-6 py-4 text-left">Type</th><th className="px-6 py-4 text-left">Size</th><th className="px-6 py-4 text-right">Actions</th></tr></thead>
                    <tbody className="divide-y">
                       {filteredResources.map((r) => {
                          const Icon = getFileIcon(r.type).icon;
                          return (
                            <motion.tr key={r.id} variants={itemVariants} className="group hover:bg-muted/40 transition-colors">
                               <td className="px-6 py-4 font-medium flex items-center gap-3">
                                  <div className={cn("p-1.5 rounded-lg", getFileIcon(r.type).color)}><Icon className="h-4 w-4"/></div>
                                  {r.title}
                               </td>
                               <td className="px-6 py-4">{r.className}</td>
                               <td className="px-6 py-4"><Badge variant="outline">{r.type}</Badge></td>
                               <td className="px-6 py-4 text-muted-foreground">{r.fileSize}</td>
                               <td className="px-6 py-4 text-right">
                                  <div className="flex justify-end gap-2">
                                     <Button size="icon" variant="ghost" onClick={() => window.open(r.fileUrl, '_blank')}><Download className="h-4 w-4 text-slate-500"/></Button>
                                     <Button size="icon" variant="ghost" onClick={() => handleDelete(r.id)}><Trash2 className="h-4 w-4 text-red-500"/></Button>
                                  </div>
                               </td>
                            </motion.tr>
                          );
                       })}
                    </tbody>
                 </table>
               </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* --- UPLOAD MODAL --- */}
      <AnimatePresence>
        {isUploadOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
             <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} className="bg-background w-full max-w-lg rounded-2xl shadow-2xl border p-6">
                <div className="flex justify-between items-center mb-6"><h2 className="text-xl font-bold">Upload Resource</h2><Button size="icon" variant="ghost" onClick={() => setIsUploadOpen(false)}><X className="h-5 w-5"/></Button></div>
                <div className="space-y-4">
                   <div className="space-y-1"><Label>Title</Label><Input value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} placeholder="e.g. Tajweed Rules PDF" /></div>
                   <div className="space-y-1"><Label>Description</Label><Input value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} /></div>
                   
                   <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1"><Label>Class</Label><Select onValueChange={v => setFormData({...formData, classId: v})}><SelectTrigger><SelectValue placeholder="Select Class"/></SelectTrigger><SelectContent>{classes.map((c) => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}</SelectContent></Select></div>
                      <div className="space-y-1"><Label>Type</Label><Select onValueChange={v => setFormData({...formData, type: v as any})} defaultValue="DOCUMENT"><SelectTrigger><SelectValue/></SelectTrigger><SelectContent><SelectItem value="DOCUMENT">Document</SelectItem><SelectItem value="VIDEO">Video</SelectItem><SelectItem value="AUDIO">Audio</SelectItem><SelectItem value="IMAGE">Image</SelectItem></SelectContent></Select></div>
                   </div>

                   <div className="space-y-1"><Label>File URL</Label><div className="flex gap-2"><Input value={formData.fileUrl} onChange={e => setFormData({...formData, fileUrl: e.target.value})} placeholder="https://..." /><Button size="icon" variant="outline"><UploadCloud className="h-4 w-4"/></Button></div></div>
                   
                   <Button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white" onClick={handleUpload} disabled={isLoading}>
                      {isLoading ? <Loader2 className="animate-spin mr-2"/> : "Upload File"}
                   </Button>
                </div>
             </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </motion.div>
  );
}