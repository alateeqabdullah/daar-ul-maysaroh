"use client";

import { useState, useTransition, useMemo, useEffect, useRef } from "react";
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
  ShieldCheck,
  RefreshCcw,
  Eye,
  EyeOff,
  UserPlus,
  Hash,
  Globe,
} from "lucide-react";

// Handshake with your 11 Actions
import {
  manageAnnouncement,
  deleteAnnouncement,
  sendPrivateMessage,
  toggleAnnouncementLive,
  purgeNotificationNodes,
  markMessageRead,
  deleteMessageNode,
  getThreadHistory,
  startNewConversation,
  replyToThread,
} from "@/app/actions/admin/communication/actions";

// UI System
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  DialogHeader,
  DialogTitle,
  DialogDescription,
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
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

const kContainer = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.04 } },
};
const kItem = { hidden: { y: 20, opacity: 0 }, show: { y: 0, opacity: 1 } };

export default function CommunicationTerminalClient({
  initialAnnouncements,
  initialMessages,
  users,
  currentUser,
}: any) {
  const [isPending, startTransition] = useTransition();
  const [activeTab, setActiveTab] = useState("broadcasts");
  const scrollRef = useRef<HTMLDivElement>(null);

  // --- STATE NODES ---
  const [announcements, setAnnouncements] = useState(initialAnnouncements);
  const [messages, setMessages] = useState(initialMessages);
  const [search, setSearch] = useState("");

  // Direct Messaging States
  const [selectedThreadId, setSelectedThreadId] = useState<string | null>(null);
  const [currentThreadHistory, setCurrentThreadHistory] = useState<any[]>([]);
  const [replyContent, setReplyContent] = useState("");
  const [isHistoryLoading, setIsHistoryLoading] = useState(false);

  // Modal Controllers
  const [isAddAnnouncementOpen, setIsAddAnnouncementOpen] = useState(false);
  const [isDiscoveryOpen, setIsDiscoveryOpen] = useState(false);
  const [discoverySearch, setDiscoverySearch] = useState("");
  const [discoveredUser, setDiscoveredUser] = useState<any>(null);

  // --- ANALYTICS HANDSHAKE ---
  const stats = useMemo(
    () => ({
      announcements: announcements.filter((a: any) => a.isPublished).length,
      unreadMessages: messages.filter((m: any) => !m.isRead).length,
      totalUsers: users.length,
    }),
    [announcements, messages, users],
  );

  // --- AUTO-SCROLL CHAT ---
  useEffect(() => {
    if (scrollRef.current)
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [currentThreadHistory]);

  // --- ACTION HANDLERS ---

  // 1. Fetch Thread Context
  const handleSelectThread = async (msg: any) => {
    setSelectedThreadId(msg.id);
    setIsHistoryLoading(true);
    try {
      const history = await getThreadHistory(msg.id);
      setCurrentThreadHistory(history);
      if (!msg.isRead) await markMessageRead(msg.id);
    } catch (e) {
      toast.error("Thread Sync Failed");
    } finally {
      setIsHistoryLoading(false);
    }
  };

  // 2. Deploy New Announcement
  const onDeployAnnouncement = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const d = Object.fromEntries(new FormData(e.currentTarget));
    startTransition(async () => {
      try {
        await manageAnnouncement({
          ...d,
          isPublished: "true",
          targetAudience: ["ALL"],
        });
        setIsAddAnnouncementOpen(false);
        toast.success("Broadcast Node Active");
      } catch (e: any) {
        toast.error(e.message);
      }
    });
  };

  // 3. Dispatch DM Reply
  const onSendReply = () => {
    if (!replyContent || !selectedThreadId) return;
    startTransition(async () => {
      try {
        const res = await replyToThread(selectedThreadId, replyContent);
        setCurrentThreadHistory((prev) => [...prev, res.message]);
        setReplyContent("");
        toast.success("Payload Delivered");
      } catch (e: any) {
        toast.error(e.message);
      }
    });
  };

  // 4. Identity Discovery (Start New Conversation)
  const onStartNewThread = () => {
    if (!replyContent || !discoveredUser) return;
    startTransition(async () => {
      try {
        const res = await startNewConversation(discoveredUser.id, replyContent);
        setMessages((prev) => [res.message, ...prev]);
        setIsDiscoveryOpen(false);
        setReplyContent("");
        setSelectedThreadId(res.message.id);
        setCurrentThreadHistory([res.message]);
        toast.success("New Handshake Established");
      } catch (e: any) {
        toast.error(e.message);
      }
    });
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 md:space-y-10 pb-40 px-2 md:px-6 mt-4 md:mt-10">
      {/* --- SOVEREIGN HUD --- */}
      <header className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 px-2">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-surface border-primary-100 dark:border-primary-900/50">
            <Zap className="h-3 w-3 text-gold animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary-700 dark:text-primary-300">
              Institutional Comms Terminal
            </span>
          </div>
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-none text-slate-900 dark:text-white">
            Sovereign <span className="text-primary-700">Comms</span>
          </h1>
        </div>
        <div className="flex gap-2 w-full lg:w-auto">
          <Button
            onClick={() => setIsDiscoveryOpen(true)}
            variant="outline"
            className="flex-1 md:flex-none h-14 md:h-16 rounded-2xl border-2 font-black uppercase text-[10px] tracking-widest active:scale-95"
          >
            <UserPlus className="mr-2 h-4 w-4" /> Start New DM
          </Button>
          <Button
            onClick={() => setIsAddAnnouncementOpen(true)}
            className="flex-1 md:flex-none h-14 md:h-16 px-8 rounded-2xl bg-primary-700 text-white font-black uppercase text-[10px] shadow-royal active:scale-95"
          >
            <Megaphone className="mr-2 h-4 w-4" /> Broadcast
          </Button>
        </div>
      </header>

      {/* --- STATS RIBBON --- */}
      <div className="grid grid-cols-3 gap-3 md:gap-6 px-2">
        <StatBadge
          label="Unread DMs"
          value={stats.unreadMessages}
          color="rose"
          icon={MessageSquare}
        />
        <StatBadge
          label="Live Broadcasts"
          value={stats.announcements}
          color="purple"
          icon={Megaphone}
        />
        <StatBadge
          label="Network Nodes"
          value={stats.totalUsers}
          color="emerald"
          icon={Users}
        />
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        {/* MOBILE STICKY NAV */}
        <div className="sticky top-0 z-30 bg-slate-50/80 dark:bg-black/80 backdrop-blur-xl py-2 -mx-2 px-2">
          <TabsList className="bg-white dark:bg-slate-900 h-16 p-1.5 rounded-[1.5rem] border w-full md:w-fit justify-start overflow-x-auto no-scrollbar gap-2 shadow-sm">
            <TabsTrigger
              value="broadcasts"
              className="rounded-xl font-black text-[10px] uppercase px-10 h-full gap-2 transition-all data-[state=active]:bg-primary-700 data-[state=active]:text-white"
            >
              <Globe className="h-4 w-4" /> Global
            </TabsTrigger>
            <TabsTrigger
              value="direct"
              className="rounded-xl font-black text-[10px] uppercase px-10 h-full gap-2 transition-all data-[state=active]:bg-primary-700 data-[state=active]:text-white"
            >
              <Inbox className="h-4 w-4" /> Direct
            </TabsTrigger>
            <TabsTrigger
              value="alerts"
              className="rounded-xl font-black text-[10px] uppercase px-10 h-full gap-2 transition-all data-[state=active]:bg-primary-700 data-[state=active]:text-white"
            >
              <Bell className="h-4 w-4" /> Alerts
            </TabsTrigger>
          </TabsList>
        </div>

        {/* --- TAB 1: ANNOUNCEMENTS --- */}
        <TabsContent value="broadcasts" className="mt-8 space-y-6 px-2">
          <div className="relative group max-w-2xl">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              placeholder="Deep search registry broadcast..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-14 md:h-16 pl-14 glass-surface rounded-2xl md:rounded-[2.5rem] border-0 outline-none focus:ring-4 ring-primary-700/10 font-bold dark:bg-slate-900"
            />
          </div>

          <motion.div
            variants={kContainer}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {announcements.map((ann: any) => (
              <motion.div
                key={ann.id}
                variants={kItem}
                className="institutional-card glass-surface p-8 md:p-10 flex flex-col justify-between min-h-[350px] relative overflow-hidden group"
              >
                <div className="space-y-4 relative z-10">
                  <div className="flex justify-between items-start">
                    <Badge className="bg-primary-700/10 text-primary-700 border-0 font-black text-[8px] uppercase tracking-widest px-3 py-1 rounded-lg">
                      {ann.type}
                    </Badge>
                    <div className="flex gap-1">
                      <Button
                        onClick={() =>
                          toggleAnnouncementLive(ann.id, !ann.isPublished)
                        }
                        variant="ghost"
                        size="icon"
                        className="h-9 w-9 rounded-xl bg-white dark:bg-slate-800 shadow-sm border border-slate-100"
                      >
                        {ann.isPublished ? (
                          <Eye className="h-4 w-4 text-emerald-500" />
                        ) : (
                          <EyeOff className="h-4 w-4 text-slate-300" />
                        )}
                      </Button>
                      <Button
                        onClick={() => deleteAnnouncement(ann.id)}
                        variant="ghost"
                        size="icon"
                        className="h-9 w-9 rounded-xl bg-rose-50 text-rose-500 border border-rose-100"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white leading-tight tracking-tight">
                    {ann.title}
                  </h3>
                  <p className="text-sm font-medium text-slate-500 leading-relaxed line-clamp-4">
                    {ann.content}
                  </p>
                </div>
                <div className="pt-6 border-t dark:border-slate-800 flex justify-between items-center relative z-10">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8 border-2 border-primary-50">
                      <AvatarImage src={ann.createdBy.image} />
                    </Avatar>
                    <p className="text-[10px] font-black uppercase text-slate-400">
                      {ann.createdBy.name}
                    </p>
                  </div>
                  <span className="text-[9px] font-black text-primary-700 uppercase tracking-widest">
                    {new Date(ann.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </TabsContent>

        {/* --- TAB 2: DIRECT MESSAGING (CHAT UI) --- */}
        <TabsContent value="direct" className="mt-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[70vh] lg:h-[80vh]">
            {/* Sidebar: Mobile horizontal list, Desktop vertical sidebar */}
            <div className="lg:col-span-4 flex flex-row lg:flex-col gap-3 overflow-x-auto lg:overflow-y-auto no-scrollbar pb-2 lg:pb-0 px-2 lg:px-0">
              {messages.map((msg: any) => (
                <button
                  key={msg.id}
                  onClick={() => handleSelectThread(msg)}
                  className={`p-4 md:p-6 rounded-[2rem] lg:rounded-[2.5rem] transition-all border-2 shrink-0 w-64 lg:w-full flex items-center gap-4 text-left ${
                    selectedThreadId === msg.id
                      ? "bg-primary-700 border-primary-700 text-white shadow-royal scale-[1.02]"
                      : "glass-surface border-transparent hover:bg-slate-50"
                  }`}
                >
                  <div className="relative">
                    <Avatar className="h-12 w-12 border-2 border-white/20">
                      <AvatarImage src={msg.sender.image} />
                    </Avatar>
                    {!msg.isRead && (
                      <div className="absolute -top-1 -right-1 h-4 w-4 bg-rose-500 rounded-full border-2 border-white animate-bounce" />
                    )}
                  </div>
                  <div className="truncate">
                    <p className="font-black text-sm">{msg.sender.name}</p>
                    <p
                      className={`text-[10px] truncate opacity-60 ${selectedThreadId === msg.id ? "text-white" : "text-slate-500"}`}
                    >
                      {msg.content}
                    </p>
                  </div>
                </button>
              ))}
            </div>

            {/* Chat Terminal Area */}
            <div className="lg:col-span-8 institutional-card glass-surface flex flex-col h-full relative overflow-hidden">
              <AnimatePresence mode="wait">
                {selectedThreadId ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex-1 flex flex-col h-full"
                  >
                    {/* Thread Header */}
                    <div className="p-6 md:p-8 border-b dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-900/50 backdrop-blur-md">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-12 w-12 border-4 border-white">
                          <AvatarImage
                            src={
                              messages.find(
                                (m: any) => m.id === selectedThreadId,
                              )?.sender.image
                            }
                          />
                        </Avatar>
                        <div>
                          <h3 className="text-xl font-black text-slate-900 dark:text-white leading-none">
                            {
                              messages.find(
                                (m: any) => m.id === selectedThreadId,
                              )?.sender.name
                            }
                          </h3>
                          <p className="text-[10px] font-black uppercase text-emerald-500 tracking-widest mt-1.5 flex items-center gap-1">
                            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />{" "}
                            Active Node
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteMessageNode(selectedThreadId)}
                        className="text-rose-500 hover:bg-rose-50"
                      >
                        <Trash2 className="h-5 w-5" />
                      </Button>
                    </div>

                    {/* Messages Feed */}
                    <div
                      ref={scrollRef}
                      className="flex-1 overflow-y-auto p-6 md:p-10 space-y-6 no-scrollbar bg-white/30 dark:bg-black/20"
                    >
                      {isHistoryLoading ? (
                        <div className="flex justify-center py-20">
                          <Loader2 className="animate-spin h-10 w-10 text-primary-700" />
                        </div>
                      ) : (
                        currentThreadHistory.map((h: any) => (
                          <motion.div
                            key={h.id}
                            initial={{
                              opacity: 0,
                              x: h.senderId === currentUser.id ? 20 : -20,
                            }}
                            animate={{ opacity: 1, x: 0 }}
                            className={`flex ${h.senderId === currentUser.id ? "justify-end" : "justify-start"}`}
                          >
                            <div
                              className={`max-w-[85%] md:max-w-[70%] p-5 md:p-6 rounded-[2rem] shadow-sm ${
                                h.senderId === currentUser.id
                                  ? "bg-primary-700 text-white rounded-br-none"
                                  : "bg-white dark:bg-slate-800 border dark:border-slate-700 rounded-bl-none"
                              }`}
                            >
                              <p className="text-sm font-medium leading-relaxed">
                                {h.content}
                              </p>
                              <div
                                className={`mt-2 flex items-center gap-2 text-[8px] font-black uppercase opacity-40 ${h.senderId === currentUser.id ? "justify-end" : "justify-start"}`}
                              >
                                <Clock className="h-2 w-2" />{" "}
                                {new Date(h.createdAt).toLocaleTimeString([], {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </div>
                            </div>
                          </motion.div>
                        ))
                      )}
                    </div>

                    {/* Input Protocol */}
                    <div className="p-6 md:p-8 border-t dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl">
                      <div className="flex gap-3 items-center">
                        <Input
                          placeholder="Synchronize response payload..."
                          value={replyContent}
                          onChange={(e) => setReplyContent(e.target.value)}
                          className="h-16 rounded-[1.5rem] glass-surface border-0 px-8 font-bold text-base focus:ring-4 ring-primary-700/10"
                          onKeyDown={(e) => e.key === "Enter" && onSendReply()}
                        />
                        <Button
                          onClick={onSendReply}
                          disabled={isPending || !replyContent}
                          className="h-16 w-16 md:w-24 rounded-[1.5rem] bg-primary-700 text-white shadow-royal active:scale-90 transition-all"
                        >
                          {isPending ? (
                            <Loader2 className="animate-spin" />
                          ) : (
                            <Send className="h-6 w-6" />
                          )}
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center space-y-6 opacity-30">
                    <div className="p-10 rounded-full bg-slate-100 dark:bg-slate-800 animate-pulse">
                      <Inbox size={64} />
                    </div>
                    <div className="text-center">
                      <p className="font-black text-lg uppercase tracking-widest">
                        Identify Message Node
                      </p>
                      <p className="text-xs font-bold uppercase mt-1">
                        Select a thread to begin synchronization
                      </p>
                    </div>
                  </div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </TabsContent>

        {/* --- TAB 3: SYSTEM NOTIFICATIONS (ALERTS) --- */}
        <TabsContent value="alerts" className="mt-8 space-y-6 px-2">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">
              Node Activity Feed
            </h3>
            <Button
              onClick={() => purgeNotificationNodes()}
              variant="ghost"
              className="text-rose-500 font-black text-[10px] uppercase gap-2 hover:bg-rose-50 transition-all"
            >
              <RefreshCcw className="h-3 w-3" /> Purge Read Nodes
            </Button>
          </div>
          <div className="grid gap-3">
            {/* Mapping of System Notifications would go here */}
            <div className="p-6 institutional-card glass-surface border-primary-100 border-l-8 border-l-primary-700 flex items-center justify-between group cursor-default">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-2xl bg-primary-50 dark:bg-primary-900/30 flex items-center justify-center text-primary-700">
                  <Bell />
                </div>
                <div>
                  <p className="font-black text-slate-900 dark:text-white">
                    New Enrollment Protocol Initiated
                  </p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Source: Registration Node 402 • Just now
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="opacity-0 group-hover:opacity-100"
              >
                <ChevronRight />
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* --- BROADCAST DEPLOYMENT DIALOG --- */}
      <Dialog
        open={isAddAnnouncementOpen}
        onOpenChange={setIsAddAnnouncementOpen}
      >
        <DialogContent className="max-w-2xl w-full h-[100dvh] md:h-auto md:max-h-[90vh] rounded-none md:rounded-[4rem] p-8 md:p-16 dark:bg-slate-950 border-0 shadow-royal overflow-y-auto no-scrollbar">
          <DialogHeader className="mb-10 text-left">
            <div className="flex justify-between items-start md:block">
              <DialogTitle className="text-4xl md:text-6xl font-black tracking-tighter leading-none">
                Deploy <span className="text-primary-700">Broadcast</span>
              </DialogTitle>
              <Button
                variant="ghost"
                onClick={() => setIsAddAnnouncementOpen(false)}
                className="md:hidden h-12 w-12 rounded-full bg-slate-100 dark:bg-slate-900"
              >
                <X />
              </Button>
            </div>
            <DialogDescription className="font-bold text-slate-400 uppercase text-[10px] tracking-widest pt-2">
              Global Institutional Communication Node
            </DialogDescription>
          </DialogHeader>

          <form
            onSubmit={onDeployAnnouncement}
            className="space-y-8 md:space-y-12"
          >
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase text-slate-400 ml-6">
                Transmission Header
              </Label>
              <Input
                name="title"
                required
                className="h-16 rounded-[1.5rem] md:rounded-[2.5rem] glass-surface border-0 px-10 font-black text-xl"
                placeholder="Eid-ul-Fitr Break Announcement"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase text-slate-400 ml-6">
                  Priority Scale
                </Label>
                <Select name="priority" defaultValue="NORMAL">
                  <SelectTrigger className="h-16 rounded-2xl bg-slate-100 dark:bg-slate-900 border-0 font-bold px-8 text-base">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="rounded-2xl shadow-2xl">
                    <SelectItem value="NORMAL" className="font-bold">
                      NORMAL Node
                    </SelectItem>
                    <SelectItem
                      value="URGENT"
                      className="font-bold text-rose-500 uppercase"
                    >
                      URGENT Dispatch
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase text-slate-400 ml-6">
                  Classification
                </Label>
                <Select name="type" defaultValue="GENERAL">
                  <SelectTrigger className="h-16 rounded-2xl bg-slate-100 dark:bg-slate-900 border-0 font-bold px-8 text-base">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="rounded-2xl shadow-2xl">
                    <SelectItem value="GENERAL" className="font-bold">
                      GENERAL Handshake
                    </SelectItem>
                    <SelectItem value="ACADEMIC" className="font-bold">
                      ACADEMIC Hub
                    </SelectItem>
                    <SelectItem
                      value="HOLIDAY"
                      className="font-bold text-indigo-500"
                    >
                      HOLIDAY Protocol
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase text-slate-400 ml-6">
                Payload Content
              </Label>
              <Textarea
                name="content"
                required
                className="rounded-[3rem] bg-slate-100 dark:bg-slate-900 border-0 p-10 min-h-[250px] font-medium text-lg"
                placeholder="Enter transmission body here..."
              />
            </div>
            <Button
              type="submit"
              disabled={isPending}
              className="w-full h-24 rounded-[3.5rem] bg-primary-700 text-white font-black text-xl shadow-royal transition-all active:scale-95 group"
            >
              {isPending ? (
                <Loader2 className="animate-spin h-8 w-8" />
              ) : (
                <span className="flex items-center gap-4">
                  INITIALIZE TRANSMISSION{" "}
                  <ArrowUpRight className="h-8 w-8 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" />
                </span>
              )}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* --- NODE DISCOVERY / NEW MESSAGE DIALOG --- */}
      <Dialog open={isDiscoveryOpen} onOpenChange={setIsDiscoveryOpen}>
        <DialogContent className="max-w-xl w-full h-[100dvh] md:h-auto md:max-h-[85vh] rounded-none md:rounded-[3rem] p-0 dark:bg-slate-950 border-0 shadow-royal overflow-hidden flex flex-col">
          <DialogHeader className="p-8 border-b dark:border-slate-800">
            <div className="flex justify-between items-center mb-6">
              <DialogTitle className="text-3xl font-black tracking-tighter">
                Node <span className="text-primary-700">Discovery</span>
              </DialogTitle>
              <Button
                variant="ghost"
                onClick={() => setIsDiscoveryOpen(false)}
                className="rounded-full"
              >
                <X />
              </Button>
            </div>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                placeholder="Search by name, role, or identity..."
                value={discoverySearch}
                onChange={(e) => setDiscoverySearch(e.target.value)}
                className="w-full h-12 pl-12 glass-surface rounded-xl border-0 font-bold text-sm outline-none focus:ring-2 ring-primary-500"
              />
            </div>
          </DialogHeader>

          <div className="flex-1 overflow-y-auto p-4 space-y-2 no-scrollbar bg-slate-50/50 dark:bg-black/20">
            {users
              .filter((u: any) =>
                u.name.toLowerCase().includes(discoverySearch.toLowerCase()),
              )
              .map((u: any) => (
                <div
                  key={u.id}
                  onClick={() => setDiscoveredUser(u)}
                  className={`p-4 rounded-2xl cursor-pointer transition-all flex items-center justify-between border-2 ${
                    discoveredUser?.id === u.id
                      ? "bg-primary-700/10 border-primary-700"
                      : "hover:bg-white dark:hover:bg-slate-900 border-transparent"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <Avatar className="h-10 w-10 border-2 border-white">
                      <AvatarImage src={u.image} />
                    </Avatar>
                    <div>
                      <p className="text-sm font-black dark:text-white">
                        {u.name}
                      </p>
                      <Badge
                        variant="outline"
                        className="text-[8px] font-black uppercase opacity-60 px-2"
                      >
                        {u.role}
                      </Badge>
                    </div>
                  </div>
                  {discoveredUser?.id === u.id && (
                    <CheckCircle2 className="h-5 w-5 text-primary-700" />
                  )}
                </div>
              ))}
          </div>

          {discoveredUser && (
            <div className="p-8 bg-white dark:bg-slate-900 border-t dark:border-slate-800 animate-in slide-in-from-bottom-4">
              <div className="space-y-4">
                <Label className="text-[10px] font-black uppercase text-slate-400 ml-2">
                  Initial Payload to {discoveredUser.name}
                </Label>
                <div className="flex gap-3">
                  <Input
                    placeholder="Synchronize message..."
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                    className="h-14 rounded-xl glass-surface border-0 font-bold px-6"
                  />
                  <Button
                    onClick={onStartNewThread}
                    disabled={isPending || !replyContent}
                    className="h-14 w-14 rounded-xl bg-primary-700 text-white shadow-xl"
                  >
                    {isPending ? (
                      <Loader2 className="animate-spin" />
                    ) : (
                      <Send className="h-5 w-5" />
                    )}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

// --- SUB-COMPONENTS ---

function StatBadge({ label, value, icon: Icon, color }: any) {
  const styles: any = {
    rose: "bg-rose-500/10 text-rose-600 border-rose-500/20 shadow-rose-500/5",
    emerald:
      "bg-emerald-500/10 text-emerald-600 border-emerald-500/20 shadow-emerald-500/5",
    purple:
      "bg-primary-700/10 text-primary-700 border-primary-700/20 shadow-primary-700/5",
  };
  return (
    <div
      className={`p-4 md:p-6 rounded-[1.8rem] md:rounded-[2.5rem] border ${styles[color]} glass-surface flex items-center justify-between group transition-all hover:-translate-y-1 relative overflow-hidden`}
    >
      <div className="space-y-1 relative z-10">
        <p className="text-[8px] md:text-[10px] font-black uppercase text-slate-400 tracking-widest">
          {label}
        </p>
        <h4 className="text-xl md:text-3xl font-black dark:text-white leading-none tracking-tighter">
          {value}
        </h4>
      </div>
      <div className="p-2.5 md:p-4 rounded-xl bg-white dark:bg-slate-900 shadow-sm border border-slate-100 dark:border-slate-800 transition-transform group-hover:rotate-12 relative z-10">
        <Icon className="h-4 w-4 md:h-5 md:w-5" />
      </div>
    </div>
  );
}
