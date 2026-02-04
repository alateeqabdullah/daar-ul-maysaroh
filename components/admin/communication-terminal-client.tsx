"use client";

import { useState, useTransition, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  Bell,
  MessageSquare,
  Megaphone,
  Plus,
  Search,
  MoreVertical,
  X,
  Loader2,
  Trash2,
  ShieldAlert,
  CheckCircle2,
  Users,
  GraduationCap,
  User,
  Clock,
  ChevronRight,
  ArrowUpRight,
  Inbox,
  Mail,
  Zap,
  Filter,
} from "lucide-react";

import {
  manageAnnouncement,
  deleteAnnouncement,
  sendPrivateMessage,
  toggleAnnouncementLive,
  purgeNotificationNodes,
} from "@/app/actions/admin/communication/actions";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { toast } from "sonner";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@radix-ui/react-dropdown-menu";

const kContainer = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } },
};
const kItem = { hidden: { y: 20, opacity: 0 }, show: { y: 0, opacity: 1 } };

export default function CommunicationTerminalClient({
  initialAnnouncements,
  initialMessages,
  users,
}: any) {
  const [isPending, startTransition] = useTransition();
  const [activeTab, setActiveTab] = useState("broadcasts");
  const [search, setSearch] = useState("");

  // MODALS
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedThread, setSelectedThread] = useState<any>(null);
  const [msgContent, setMsgContent] = useState("");

  const filteredAnnouncements = initialAnnouncements.filter((a: any) =>
    a.title.toLowerCase().includes(search.toLowerCase()),
  );

  const handleBroadcast = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const d = Object.fromEntries(new FormData(e.currentTarget));
    startTransition(async () => {
      try {
        await manageAnnouncement({
          ...d,
          targetAudience: ["ALL"],
          isPublished: "true",
        });
        setIsAddModalOpen(false);
        toast.success("Broadcast Node Transmitted");
      } catch (e: any) {
        toast.error(e.message);
      }
    });
  };

  const handleMessage = async () => {
    if (!msgContent || !selectedThread) return;
    startTransition(async () => {
      try {
        await sendPrivateMessage(selectedThread.senderId, msgContent);
        setMsgContent("");
        toast.success("Payload Delivered");
      } catch (e: any) {
        toast.error(e.message);
      }
    });
  };

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6 md:space-y-10 pb-40 px-3 md:px-6 mt-4 md:mt-10">
      {/* --- ELITE HEADER --- */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-primary-700 animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
              Institutional Comms Node
            </span>
          </div>
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-slate-900 dark:text-white leading-none">
            Command{" "}
            <span className="text-primary-700 text-3xl md:text-8xl block md:inline">
              Voice
            </span>
          </h1>
        </div>
        <Button
          onClick={() => setIsAddModalOpen(true)}
          className="h-14 md:h-16 px-10 rounded-2xl bg-primary-700 text-white font-black uppercase text-xs tracking-widest shadow-royal active:scale-95 transition-all w-full md:w-auto"
        >
          <Plus className="mr-2 h-5 w-5" /> New Broadcast
        </Button>
      </header>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        {/* MOBILE STICKY NAV */}
        <div className="sticky top-0 z-30 bg-slate-50/80 dark:bg-black/80 backdrop-blur-xl py-2 -mx-3 px-3">
          <TabsList className="bg-white dark:bg-slate-900 h-16 p-1.5 rounded-[1.5rem] border w-full md:w-fit justify-start overflow-x-auto no-scrollbar gap-2 shadow-sm">
            <TabsTrigger
              value="broadcasts"
              className="rounded-xl font-black text-[10px] uppercase px-8 h-full gap-2 transition-all data-[state=active]:bg-primary-700 data-[state=active]:text-white"
            >
              <Megaphone className="h-4 w-4" /> Global
            </TabsTrigger>
            <TabsTrigger
              value="direct"
              className="rounded-xl font-black text-[10px] uppercase px-8 h-full gap-2 transition-all data-[state=active]:bg-primary-700 data-[state=active]:text-white"
            >
              <MessageSquare className="h-4 w-4" /> Direct
            </TabsTrigger>
            <TabsTrigger
              value="notifications"
              className="rounded-xl font-black text-[10px] uppercase px-8 h-full gap-2 transition-all data-[state=active]:bg-primary-700 data-[state=active]:text-white"
            >
              <Bell className="h-4 w-4" /> Alerts
            </TabsTrigger>
          </TabsList>
        </div>

        {/* --- 1. BROADCASTS SECTION --- */}
        <TabsContent value="broadcasts" className="mt-8 space-y-6">
          <div className="relative group max-w-2xl">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              placeholder="Search global announcements..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-14 pl-12 glass-surface rounded-2xl border-0 outline-none focus:ring-4 ring-primary-700/10 font-bold dark:bg-slate-900"
            />
          </div>

          <motion.div
            variants={kContainer}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
          >
            {filteredAnnouncements.map((ann: any) => (
              <motion.div
                key={ann.id}
                variants={kItem}
                className="institutional-card glass-surface p-6 md:p-10 flex flex-col justify-between min-h-[300px] relative overflow-hidden group"
              >
                <div className="space-y-4 relative z-10">
                  <div className="flex justify-between items-start">
                    <Badge className="bg-primary-700/10 text-primary-700 border-0 font-black text-[8px] uppercase">
                      {ann.type}
                    </Badge>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-full"
                        >
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="rounded-2xl p-2 border-0 shadow-royal">
                        <DropdownMenuItem
                          onClick={() => deleteAnnouncement(ann.id)}
                          className="rounded-xl py-3 font-bold text-rose-500 gap-2"
                        >
                          <Trash2 className="h-4 w-4" /> Decommission
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white leading-tight tracking-tight">
                    {ann.title}
                  </h3>
                  <p className="text-sm font-medium text-slate-500 line-clamp-3 leading-relaxed">
                    {ann.content}
                  </p>
                </div>
                <div className="pt-6 border-t dark:border-slate-800 flex justify-between items-center relative z-10">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={ann.createdBy.image} />
                    </Avatar>
                    <span className="text-[10px] font-bold text-slate-400 uppercase">
                      {ann.createdBy.name}
                    </span>
                  </div>
                  <span className="text-[9px] font-black text-primary-700 uppercase tracking-widest">
                    {new Date(ann.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <Megaphone className="absolute -right-6 -bottom-6 h-32 w-32 opacity-[0.03] group-hover:rotate-12 transition-transform duration-700" />
              </motion.div>
            ))}
          </motion.div>
        </TabsContent>

        {/* --- 2. DIRECT MESSAGING (MOBILE FIRST SEQUENTIAL) --- */}
        <TabsContent value="direct" className="mt-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 min-h-[60vh]">
            {/* Sidebar Nodes */}
            <div className="lg:col-span-4 space-y-3">
              {initialMessages.map((msg: any) => (
                <div
                  key={msg.id}
                  onClick={() => setSelectedThread(msg)}
                  className={`p-5 rounded-[2rem] cursor-pointer transition-all border-2 flex items-center gap-4 ${
                    selectedThread?.id === msg.id
                      ? "bg-primary-700 border-primary-700 text-white shadow-royal scale-[1.02]"
                      : "glass-surface border-transparent"
                  }`}
                >
                  <Avatar className="h-12 w-12 border-2 border-white/20">
                    <AvatarImage src={msg.sender.image} />
                  </Avatar>
                  <div className="truncate">
                    <p className="font-black text-sm">{msg.sender.name}</p>
                    <p
                      className={`text-[10px] truncate opacity-60 ${selectedThread?.id === msg.id ? "text-white" : "text-slate-500"}`}
                    >
                      {msg.content}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Chat Terminal */}
            <div className="lg:col-span-8 institutional-card glass-surface p-6 md:p-10 flex flex-col min-h-[500px]">
              <AnimatePresence mode="wait">
                {selectedThread ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex-1 flex flex-col"
                  >
                    <div className="flex items-center gap-4 border-b dark:border-slate-800 pb-6 mb-6">
                      <Avatar className="h-14 w-14 border-4 border-primary-100">
                        <AvatarImage src={selectedThread.sender.image} />
                      </Avatar>
                      <div>
                        <h3 className="text-xl font-black dark:text-white leading-none">
                          {selectedThread.sender.name}
                        </h3>
                        <p className="text-[10px] font-black uppercase text-emerald-500 tracking-widest mt-1">
                          Sovereign Node Active
                        </p>
                      </div>
                    </div>
                    <div className="flex-1 space-y-4 overflow-y-auto no-scrollbar max-h-[400px]">
                      {/* Message Nodes */}
                      <div className="max-w-[80%] bg-slate-100 dark:bg-slate-800 p-6 rounded-[2rem] rounded-tl-none">
                        <p className="text-sm font-medium leading-relaxed dark:text-slate-300">
                          {selectedThread.content}
                        </p>
                      </div>
                    </div>
                    <div className="pt-6 mt-auto flex gap-3">
                      <Input
                        placeholder="Type response payload..."
                        value={msgContent}
                        onChange={(e) => setMsgContent(e.target.value)}
                        className="h-16 rounded-[1.5rem] glass-surface border-0 font-bold px-6"
                      />
                      <Button
                        onClick={handleMessage}
                        className="h-16 w-16 rounded-[1.5rem] bg-primary-700 text-white shadow-royal"
                      >
                        <Send className="h-6 w-6" />
                      </Button>
                    </div>
                  </motion.div>
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center opacity-20">
                    <Inbox className="h-20 w-20 mb-4" />
                    <p className="font-black uppercase tracking-widest text-xs">
                      Select Node to Synchronize
                    </p>
                  </div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* --- INJECTION MODAL (MOBILE FULL SCREEN) --- */}
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent className="max-w-2xl w-full h-[100dvh] md:h-auto md:max-h-[90vh] rounded-none md:rounded-[4rem] p-8 md:p-16 dark:bg-slate-950 border-0 shadow-royal overflow-y-auto no-scrollbar">
          <DialogHeader className="mb-10 text-left">
            <DialogTitle className="text-4xl md:text-6xl font-black tracking-tighter leading-none">
              Deploy <span className="text-primary-700">Broadcast</span>
            </DialogTitle>
            <DialogDescription className="font-bold text-slate-400 uppercase text-[10px] tracking-widest pt-2">
              Global Announcement Protocol v2.6
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleBroadcast} className="space-y-6 md:space-y-10">
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase text-slate-400 ml-4">
                Transmission Header
              </Label>
              <Input
                name="title"
                required
                className="h-16 rounded-[1.5rem] md:rounded-[2.5rem] glass-surface border-0 px-8 font-black text-lg"
                placeholder="Emergency School Closure"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase text-slate-400 ml-4">
                Deployment Classification
              </Label>
              <Select name="type" defaultValue="GENERAL">
                <SelectTrigger className="h-16 rounded-[1.5rem] md:rounded-[2.5rem] bg-slate-100 dark:bg-slate-900 border-0 font-bold px-8 text-lg">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-3xl border-0 shadow-2xl">
                  <SelectItem
                    value="GENERAL"
                    className="py-4 font-bold border-b"
                  >
                    GENERAL Handshake
                  </SelectItem>
                  <SelectItem
                    value="URGENT"
                    className="py-4 font-bold border-b text-rose-500"
                  >
                    URGENT Protocol
                  </SelectItem>
                  <SelectItem value="ACADEMIC" className="py-4 font-bold">
                    ACADEMIC Dispatch
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase text-slate-400 ml-4">
                Payload Payload
              </Label>
              <Textarea
                name="content"
                required
                className="rounded-[2rem] bg-slate-100 dark:bg-slate-900 border-0 p-8 min-h-[200px] font-medium text-base"
              />
            </div>
            <Button
              type="submit"
              disabled={isPending}
              className="w-full h-20 md:h-28 rounded-[2.5rem] md:rounded-[4rem] bg-primary-700 text-white font-black text-xl md:text-2xl shadow-royal transition-all active:scale-95 group"
            >
              {isPending ? (
                <Loader2 className="animate-spin" />
              ) : (
                <span className="flex items-center gap-3">
                  INITIALIZE TRANSMISSION{" "}
                  <ArrowUpRight className="h-6 w-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </span>
              )}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
