"use client";

import { useState, useTransition, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Search,
  FileText,
  Video,
  Mic,
  Trash2,
  Edit,
  ChevronRight,
  Globe,
  Lock,
  Clock,
  Eye,
  CloudUpload,
  Settings2,
  X,
  Loader2,
  Link2,
  Share2,
  EyeOff,
  FolderSync,
  Download,
} from "lucide-react";

// The 10 Sovereign Actions
import {
  uploadResourceNode,
  decommissionResource,
  toggleResourcePublic,
  migrateResource,
  logDownload,
  generateNodeLink,
  updateResourceMetadata,
} from "@/app/actions/admin/resources/actions";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function ResourcesTerminalClient({
  initialResources,
  classes,
  subjects,
}: any) {
  const [isPending, startTransition] = useTransition();
  const [search, setSearch] = useState("");
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  // Selection Node
  const [selectedRes, setSelectedRes] = useState<any>(null);

  const allResources = useMemo(
    () => [
      ...initialResources.classMaterials.map((m: any) => ({
        ...m,
        origin: "class",
      })),
      ...initialResources.subjectMaterials.map((m: any) => ({
        ...m,
        origin: "subject",
      })),
    ],
    [initialResources],
  );

  const filtered = allResources.filter((r) =>
    r.title.toLowerCase().includes(search.toLowerCase()),
  );

  // Handlers
  const handleInjection = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    startTransition(async () => {
      try {
        await uploadResourceNode(data);
        setIsUploadOpen(false);
        toast.success("Knowledge Node Synchronized");
      } catch (err: any) {
        toast.error(err.message);
      }
    });
  };

  const handleTogglePublic = (id: string, origin: string, current: boolean) => {
    startTransition(async () => {
      await toggleResourcePublic(id, origin, !current);
      toast.success(`Access set to ${!current ? "PUBLIC" : "ENCRYPTED"}`);
      setSelectedRes(null);
    });
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 md:space-y-10 pb-40 px-4 md:px-0">
      {/* --- COMMAND HEADER --- */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mt-10">
        <div className="space-y-1">
          <h1 className="text-4xl md:text-7xl font-black tracking-tighter text-slate-900 dark:text-white leading-none">
            Vault <span className="text-primary-700">Nodes</span>
          </h1>
          <p className="text-[10px] font-black uppercase text-slate-400 tracking-[0.3em]">
            Knowledge Registry v2.6
          </p>
        </div>
        <Button
          onClick={() => setIsUploadOpen(true)}
          className="h-16 px-10 rounded-[2rem] bg-primary-700 text-white font-black uppercase text-xs shadow-royal active:scale-95 transition-all w-full md:w-auto"
        >
          <Plus className="mr-2 h-5 w-5" /> Inject Resource
        </Button>
      </header>

      {/* --- TACTICAL SEARCH --- */}
      <div className="relative group">
        <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-primary-700 transition-colors" />
        <input
          placeholder="Deep search identity registry..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full h-16 md:h-20 pl-16 glass-surface rounded-2xl md:rounded-[2.5rem] border-0 focus:ring-4 ring-primary-700/10 font-bold dark:bg-slate-900"
        />
      </div>

      {/* --- RESOURCE GRID --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <AnimatePresence mode="popLayout">
          {filtered.map((res: any) => (
            <motion.div
              key={res.id}
              layout
              onClick={() => setSelectedRes(res)}
              className="institutional-card glass-surface p-6 md:p-8 flex flex-col justify-between min-h-[220px] cursor-pointer group hover:border-primary-700 transition-all active:scale-[0.98]"
            >
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div className="p-3 rounded-2xl bg-white dark:bg-slate-800 shadow-sm transition-transform group-hover:rotate-12">
                    <FileIcon type={res.type} />
                  </div>
                  <Badge
                    className={`text-[8px] font-black uppercase border-0 ${res.isPublic ? "bg-emerald-500" : "bg-rose-500"} text-white`}
                  >
                    {res.isPublic ? "Public" : "Encrypted"}
                  </Badge>
                </div>
                <div>
                  <h3 className="text-lg font-black dark:text-white leading-tight truncate">
                    {res.title}
                  </h3>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    {res.origin} context
                  </p>
                </div>
              </div>
              <div className="flex justify-between items-center pt-4 border-t dark:border-slate-800">
                <p className="text-[10px] font-black text-primary-700">
                  {(res.fileSize / 1024).toFixed(0)} KB
                </p>
                <ChevronRight className="h-4 w-4 text-slate-300 group-hover:text-primary-700" />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* --- ORCHESTRATOR DRAWER (THE OTHER 9 ACTIONS) --- */}
      <Sheet open={!!selectedRes} onOpenChange={() => setSelectedRes(null)}>
        <SheetContent
          side="right"
          className="w-full sm:max-w-2xl dark:bg-slate-950 border-0 p-0 shadow-2xl"
        >
          <SheetHeader className="sr-only">
            <SheetTitle>Manage Node</SheetTitle>
          </SheetHeader>

          <div className="p-10 md:p-16 bg-slate-900 text-white relative overflow-hidden min-h-[300px] flex flex-col justify-end">
            <div className="absolute top-0 right-0 p-12 opacity-10 rotate-12 scale-150">
              <FileIcon type={selectedRes?.type} size={200} />
            </div>
            <div className="relative z-10 space-y-4">
              <Badge className="bg-primary-700 border-0 font-black px-4 py-1 rounded-full uppercase text-[9px]">
                Identity Node
              </Badge>
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-none">
                {selectedRes?.title}
              </h2>
              <p className="text-sm font-medium opacity-60 max-w-sm">
                {selectedRes?.description ||
                  "No pedagogical description provided."}
              </p>
            </div>
          </div>

          <div className="p-8 md:p-12 space-y-10">
            {/* PRIMARY ACTIONS */}
            <div className="grid grid-cols-2 gap-4">
              <Button
                className="h-20 rounded-[2rem] bg-emerald-600 text-white font-black uppercase text-xs"
                onClick={() => window.open(selectedRes?.fileUrl)}
              >
                <Download className="mr-3 h-5 w-5" /> Download
              </Button>
              <Button
                variant="outline"
                className="h-20 rounded-[2rem] border-primary-700/20 text-primary-700 font-black uppercase text-xs"
                onClick={() =>
                  generateNodeLink(selectedRes.id).then((r) =>
                    toast.success("URL Node Created: " + r.shareableUrl),
                  )
                }
              >
                <Share2 className="mr-3 h-5 w-5" /> Generate Link
              </Button>
            </div>

            {/* TACTICAL SETTINGS (THE 9 ACTIONS) */}
            <div className="p-8 bg-slate-50 dark:bg-slate-900 rounded-[3rem] space-y-6">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 border-b dark:border-slate-800 pb-4">
                Sovereign Overrides
              </h4>
              <div className="grid gap-3">
                <Button
                  onClick={() =>
                    handleTogglePublic(
                      selectedRes.id,
                      selectedRes.origin,
                      selectedRes.isPublic,
                    )
                  }
                  variant="ghost"
                  className="h-16 rounded-2xl bg-white dark:bg-slate-800 justify-between px-8 font-black uppercase text-[10px]"
                >
                  <div className="flex items-center gap-3">
                    {selectedRes?.isPublic ? (
                      <EyeOff className="h-4 w-4 text-rose-500" />
                    ) : (
                      <Eye className="h-4 w-4 text-emerald-500" />
                    )}
                    {selectedRes?.isPublic
                      ? "Restrict Access"
                      : "Publish for Students"}
                  </div>
                  <ChevronRight className="h-3 w-3 opacity-20" />
                </Button>

                <Button
                  variant="ghost"
                  className="h-16 rounded-2xl bg-white dark:bg-slate-800 justify-between px-8 font-black uppercase text-[10px]"
                >
                  <div className="flex items-center gap-3">
                    <FolderSync className="h-4 w-4 text-primary-700" /> Migrate
                    Target Class
                  </div>
                  <ChevronRight className="h-3 w-3 opacity-20" />
                </Button>

                <Button
                  onClick={() =>
                    decommissionResource(
                      selectedRes.id,
                      selectedRes.origin,
                    ).then(() => setSelectedRes(null))
                  }
                  variant="ghost"
                  className="h-16 rounded-2xl text-rose-500 font-black uppercase text-[10px] justify-between px-8"
                >
                  <div className="flex items-center gap-3">
                    <Trash2 className="h-4 w-4" /> Decommission Node
                  </div>
                </Button>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* --- INJECTION MODAL --- */}
      <Dialog open={isUploadOpen} onOpenChange={setIsUploadOpen}>
        <DialogContent className="max-w-2xl w-full h-[100dvh] md:h-auto md:max-h-[90vh] rounded-none md:rounded-[4rem] p-8 md:p-16 dark:bg-slate-950 border-0 shadow-royal overflow-y-auto no-scrollbar">
          <DialogHeader className="mb-10 text-left">
            <DialogTitle className="text-4xl md:text-6xl font-black tracking-tighter leading-none">
              Resource <span className="text-primary-700">Injection</span>
            </DialogTitle>
            <DialogDescription className="font-bold text-slate-400 uppercase text-[10px] tracking-widest pt-2">
              Identity Deployment Protocol v2.6
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleInjection} className="space-y-6 md:space-y-8">
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase text-slate-400 ml-4">
                Title Node
              </Label>
              <Input
                name="title"
                required
                className="h-16 rounded-[1.5rem] md:rounded-[2.5rem] glass-surface border-0 px-8 font-bold"
                placeholder="Surah An-Naba Tajweed PDF"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase text-slate-400 ml-4">
                  Classification
                </Label>
                <Select name="type" defaultValue="DOCUMENT">
                  <SelectTrigger className="h-16 rounded-[1.5rem] border-0 bg-slate-100 dark:bg-slate-900 font-bold px-8">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="rounded-2xl shadow-2xl border-0">
                    <SelectItem value="DOCUMENT" className="py-4 font-bold">
                      DOCUMENT PDF
                    </SelectItem>
                    <SelectItem value="AUDIO" className="py-4 font-bold">
                      AUDIO Payload
                    </SelectItem>
                    <SelectItem value="VIDEO" className="py-4 font-bold">
                      VIDEO node
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase text-slate-400 ml-4">
                  Registry Target
                </Label>
                <Select name="classId">
                  <SelectTrigger className="h-16 rounded-[1.5rem] border-0 bg-slate-100 dark:bg-slate-900 font-bold px-8">
                    <SelectValue placeholder="Identify Class..." />
                  </SelectTrigger>
                  <SelectContent className="rounded-2xl border-0 shadow-2xl">
                    {classes.map((c: any) => (
                      <SelectItem
                        key={c.id}
                        value={c.id}
                        className="py-4 font-bold"
                      >
                        {c.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase text-slate-400 ml-4">
                Direct File Link (Sync with S3/Vercel)
              </Label>
              <Input
                name="fileUrl"
                required
                className="h-16 rounded-[1.5rem] glass-surface border-0 px-8 font-bold"
                placeholder="https://storage.daarulmaysaroh.com/node-123.pdf"
              />
            </div>

            <Button
              type="submit"
              disabled={isPending}
              className="w-full h-20 md:h-24 rounded-[2.5rem] md:rounded-[3.5rem] bg-primary-700 text-white font-black text-xl shadow-royal transition-all active:scale-95"
            >
              {isPending ? (
                <Loader2 className="animate-spin h-8 w-8" />
              ) : (
                "DEPLOY KNOWLEDGE NODE"
              )}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function FileIcon({ type, size = 20 }: { type: string; size?: number }) {
  if (type === "VIDEO") return <Video size={size} className="text-rose-500" />;
  if (type === "AUDIO") return <Mic size={size} className="text-gold" />;
  return <FileText size={size} className="text-primary-700" />;
}
