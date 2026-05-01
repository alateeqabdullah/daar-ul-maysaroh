"use client";

import { useState, useTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Users,
  Search,
  ChevronRight,
  BookOpen,
  Layers,
  Calendar,
  MoreVertical,
  X,
  Loader2,
  UserPlus,
  Hash,
  Globe,
  Sparkles,
  Settings2,
  Trophy,
  ShieldAlert,
  Send,
} from "lucide-react";
import {
  manageGroup,
  updateMemberRole,
  removeMemberFromGroup,
  transmitBroadcast,
  addMemberToGroup,
} from "@/app/actions/admin/groups/actions";

// Brand UI
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";

export default function GroupTerminalClient({
  initialGroups,
  teachers,
  students,
}: any) {
  const [isPending, startTransition] = useTransition();
  const [activeGroup, setActiveGroup] = useState<any>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [search, setSearch] = useState("");

  // Local states for management
  const [broadcast, setBroadcast] = useState({ title: "", content: "" });
  const [selectedStudentId, setSelectedStudentId] = useState("");

  const filtered = initialGroups.filter((g: any) =>
    g.name.toLowerCase().includes(search.toLowerCase()),
  );

  const handleBroadcast = async () => {
    if (!broadcast.title) return toast.error("Transmission Heading Required");
    startTransition(async () => {
      try {
        await transmitBroadcast(
          activeGroup.id,
          broadcast.title,
          broadcast.content,
        );
        toast.success("Node Broadcast Synchronized");
        setBroadcast({ title: "", content: "" });
      } catch (e) {
        toast.error("Transmission Interrupted");
      }
    });
  };

  const handleAddMember = async () => {
    if (!selectedStudentId) return;
    startTransition(async () => {
      await addMemberToGroup(activeGroup.id, selectedStudentId);
      toast.success("Node Membership Injected");
      setSelectedStudentId("");
    });
  };

  return (
    <div className="max-w-[1800px] mx-auto space-y-10 pb-32">
      {/* --- HUD HEADER --- */}
      <header className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6">
        <div className="space-y-4">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full glass-surface border-primary-100 dark:border-primary-900/50 w-fit">
            <Sparkles className="h-3 w-3 text-gold" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary-700 dark:text-primary-300">
              Social Architecture v2.6
            </span>
          </div>
          <h1 className="text-7xl font-black tracking-tighter dark:text-white leading-none">
            Group <span className="text-primary-700">Hub</span>
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-4 w-full lg:w-auto">
          <div className="relative flex-1 min-w-[300px] group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-primary-700" />
            <input
              placeholder="Search collective nodes..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-16 pl-14 glass-surface rounded-3xl outline-none border-0 focus:ring-4 ring-primary-700/10 font-bold dark:bg-slate-950 dark:text-white"
            />
          </div>
          <Button
            onClick={() => setIsAddModalOpen(true)}
            className="h-16 px-10 rounded-3xl bg-primary-700 text-white font-black uppercase text-[11px] tracking-widest shadow-royal hover:scale-105 transition-all"
          >
            <Plus className="mr-2 h-5 w-5" /> Initialize Group
          </Button>
        </div>
      </header>

      {/* --- BENTO GRID --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        <AnimatePresence mode="popLayout">
          {filtered.map((group: any) => (
            <motion.div
              layout
              key={group.id}
              onClick={() => setActiveGroup(group)}
              className="institutional-card glass-surface p-10 cursor-pointer group hover:border-primary-700/50 transition-all dark:bg-slate-900/40 flex flex-col justify-between min-h-[400px]"
            >
              <div className="space-y-8">
                <div className="flex justify-between items-start">
                  <div className="h-16 w-16 rounded-[2rem] bg-primary-700/10 text-primary-700 flex items-center justify-center dark:bg-primary-900/20 dark:text-primary-300">
                    <Layers className="h-8 w-8" />
                  </div>
                  <Badge className="bg-primary-700 text-white border-0 font-black text-[10px] uppercase px-5 py-2 rounded-xl tracking-widest">
                    {group.type}
                  </Badge>
                </div>

                <div>
                  <h3 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white group-hover:text-primary-700 transition-colors leading-none mb-3">
                    {group.name}
                  </h3>
                  <p className="text-base font-bold text-slate-400 line-clamp-2">
                    {group.description ||
                      "Active social node with verified registry."}
                  </p>
                </div>

                <div className="flex items-center gap-4 p-5 bg-slate-50 dark:bg-slate-800 rounded-[2.5rem]">
                  <Avatar className="h-12 w-12 border-2 border-white dark:border-slate-700 shadow-xl">
                    <AvatarImage src={group.teacher?.user.image} />
                    <AvatarFallback className="font-black text-primary-700">
                      {group.teacher?.user.name[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-black text-slate-900 dark:text-white leading-none">
                      {group.teacher?.user.name}
                    </p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase mt-1">
                      Lead Supervisor
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-12 space-y-4">
                <div className="flex justify-between items-center text-[11px] font-black uppercase tracking-[0.2em]">
                  <span className="text-slate-400">Node Occupancy</span>
                  <span className="text-primary-700 dark:text-primary-300">
                    {group.members.length} / {group.capacity}
                  </span>
                </div>
                <Progress
                  value={(group.members.length / group.capacity) * 100}
                  className="h-2.5 bg-primary-100 dark:bg-slate-800"
                />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* --- DEEP-DIVE MANAGEMENT DRAWER --- */}
      <Sheet open={!!activeGroup} onOpenChange={() => setActiveGroup(null)}>
        <SheetContent className="sm:max-w-4xl dark:bg-slate-950 border-0 overflow-y-auto no-scrollbar shadow-[0_0_120px_rgba(0,0,0,0.5)]">
          <SheetHeader className="mb-12 text-left space-y-4">
            <div className="flex items-center gap-4">
              <div className="h-20 w-20 rounded-[2.5rem] bg-primary-700 flex items-center justify-center text-white shadow-royal">
                <Users className="h-10 w-10" />
              </div>
              <div>
                <Badge className="bg-primary-700 font-black text-[10px] mb-2 px-6">
                  NODE TYPE: {activeGroup?.type}
                </Badge>
                <SheetTitle className="text-6xl font-black tracking-tighter dark:text-white leading-none">
                  {activeGroup?.name}
                </SheetTitle>
              </div>
            </div>
          </SheetHeader>

          <Tabs defaultValue="roster" className="w-full">
            <TabsList className="bg-slate-100 dark:bg-slate-900 p-2 rounded-[2.5rem] w-full justify-start h-20 mb-12">
              <TabsTrigger
                value="roster"
                className="rounded-[2rem] font-black text-xs uppercase tracking-widest px-12 h-full"
              >
                The Roster
              </TabsTrigger>
              <TabsTrigger
                value="broadcast"
                className="rounded-[2rem] font-black text-xs uppercase tracking-widest px-12 h-full"
              >
                Broadcast
              </TabsTrigger>
              <TabsTrigger
                value="routine"
                className="rounded-[2rem] font-black text-xs uppercase tracking-widest px-12 h-full"
              >
                Routine
              </TabsTrigger>
            </TabsList>

            {/* --- ROSTER TAB --- */}
            <TabsContent value="roster" className="space-y-10">
              {/* Member Injection Area */}
              <div className="p-8 glass-surface rounded-[3rem] border-primary-100 dark:border-primary-900/50 flex gap-4 items-end">
                <div className="flex-1 space-y-3">
                  <Label className="text-[10px] font-black uppercase text-slate-400 ml-4">
                    Select Node to Inject
                  </Label>
                  <Select
                    value={selectedStudentId}
                    onValueChange={setSelectedStudentId}
                  >
                    <SelectTrigger className="h-16 rounded-2xl bg-white dark:bg-slate-900 border-0 font-bold">
                      <SelectValue placeholder="Identify student node..." />
                    </SelectTrigger>
                    <SelectContent className="rounded-2xl border-0 shadow-2xl">
                      {students.map((s: any) => (
                        <SelectItem
                          key={s.id}
                          value={s.id}
                          className="py-4 font-bold border-b last:border-0"
                        >
                          {s.user.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button
                  onClick={handleAddMember}
                  disabled={isPending}
                  className="h-16 px-10 rounded-2xl bg-primary-700 text-white font-black uppercase text-[11px] shadow-lg"
                >
                  {isPending ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    <Plus className="h-6 w-6" />
                  )}
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {activeGroup?.members.map((m: any) => (
                  <div
                    key={m.id}
                    className="p-6 rounded-[2.5rem] bg-white dark:bg-slate-900/50 border-2 dark:border-slate-800 flex items-center justify-between group hover:border-primary-700/30 transition-all"
                  >
                    <div className="flex items-center gap-5">
                      <Avatar className="h-16 w-16 border-4 border-white dark:border-slate-800 shadow-xl">
                        <AvatarImage src={m.student.user.image} />
                      </Avatar>
                      <div>
                        <p className="text-xl font-black dark:text-white leading-none mb-2">
                          {m.student.user.name}
                        </p>
                        <div className="flex gap-2">
                          <Badge
                            className={`text-[9px] font-black uppercase ${m.role === "LEADER" ? "bg-gold text-white" : "bg-slate-100 text-slate-500 dark:bg-slate-800"}`}
                          >
                            {m.role}
                          </Badge>
                          <Badge
                            variant="outline"
                            className="text-[9px] font-black border-slate-200 dark:border-slate-700 text-slate-400 uppercase"
                          >
                            {m.student.studentId}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="rounded-full h-12 w-12"
                        >
                          <Settings2 className="h-6 w-6 text-slate-400" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="end"
                        className="w-64 rounded-2xl p-2 border-0 shadow-royal dark:bg-slate-900"
                      >
                        <DropdownMenuItem
                          onClick={() => updateMemberRole(m.id, "LEADER")}
                          className="py-4 font-bold text-xs gap-3"
                        >
                          <Trophy className="h-4 w-4 text-gold" /> Promote to
                          Naqeeb (Leader)
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => updateMemberRole(m.id, "MONITOR")}
                          className="py-4 font-bold text-xs gap-3"
                        >
                          <ShieldAlert className="h-4 w-4 text-primary-700" />{" "}
                          Assign Monitor Duty
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => removeMemberFromGroup(m.id)}
                          className="py-4 font-bold text-xs gap-3 text-rose-500"
                        >
                          <X className="h-4 w-4" /> Decommission Member
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* --- BROADCAST TAB --- */}
            <TabsContent value="broadcast" className="space-y-8">
              <div className="institutional-card bg-slate-900 text-white p-12 space-y-10 relative overflow-hidden">
                <div className="relative z-10 space-y-8">
                  <div>
                    <h4 className="text-3xl font-black tracking-tight leading-none text-emerald-400 mb-2 uppercase">
                      Secure Broadcast
                    </h4>
                    <p className="text-sm font-bold text-slate-400">
                      Transmitting to {activeGroup?.members.length} group
                      identity nodes.
                    </p>
                  </div>
                  <div className="space-y-5">
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase text-slate-500 ml-4 tracking-widest">
                        Heading
                      </Label>
                      <Input
                        value={broadcast.title}
                        onChange={(e) =>
                          setBroadcast({ ...broadcast, title: e.target.value })
                        }
                        className="h-16 rounded-2xl bg-white/5 border-white/10 text-white font-black px-8"
                        placeholder="Emergency Notification..."
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase text-slate-500 ml-4 tracking-widest">
                        Payload Content
                      </Label>
                      <textarea
                        value={broadcast.content}
                        onChange={(e) =>
                          setBroadcast({
                            ...broadcast,
                            content: e.target.value,
                          })
                        }
                        className="w-full min-h-[200px] p-8 rounded-[2.5rem] bg-white/5 border-white/10 text-white font-medium outline-none focus:ring-4 ring-primary-700/20"
                        placeholder="Type message nodes should receive..."
                      />
                    </div>
                  </div>
                  <Button
                    onClick={handleBroadcast}
                    disabled={isPending}
                    className="w-full h-24 rounded-[3rem] bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-2xl shadow-2xl group transition-all"
                  >
                    {isPending ? (
                      <Loader2 className="animate-spin" />
                    ) : (
                      <span className="flex items-center gap-4">
                        INITIALIZE TRANSMISSION{" "}
                        <Send className="h-8 w-8 group-hover:translate-x-2 transition-transform" />
                      </span>
                    )}
                  </Button>
                </div>
              </div>
            </TabsContent>

            {/* --- ROUTINE TAB --- */}
            <TabsContent value="routine" className="space-y-6">
              {activeGroup?.schedules.map((s: any) => (
                <div
                  key={s.id}
                  className="p-10 rounded-[3rem] glass-surface flex justify-between items-center dark:bg-slate-900/50"
                >
                  <div className="flex items-center gap-8">
                    <div className="h-16 w-16 rounded-[2rem] bg-primary-700 text-white flex items-center justify-center shadow-royal">
                      <Calendar className="h-8 w-8" />
                    </div>
                    <div>
                      <p className="text-3xl font-black dark:text-white leading-none mb-2">
                        {s.startTime} — {s.endTime}
                      </p>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                        Zone: {s.timezone} • Recursive Node
                      </p>
                    </div>
                  </div>
                  <Badge className="bg-slate-900 text-white dark:bg-white dark:text-slate-900 rounded-full px-10 py-3 font-black uppercase text-xs tracking-widest">
                    {
                      ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"][
                        s.dayOfWeek
                      ]
                    }
                  </Badge>
                </div>
              ))}
            </TabsContent>
          </Tabs>
        </SheetContent>
      </Sheet>

      {/* --- ADD MODAL --- */}
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent className="max-w-2xl rounded-[4rem] p-16 dark:bg-slate-950 border-0 shadow-[0_0_100px_rgba(124,58,237,0.2)]">
          <DialogHeader className="mb-10 text-left">
            <DialogTitle className="text-5xl font-black tracking-tighter">
              New <span className="text-primary-700">Group</span>
            </DialogTitle>
          </DialogHeader>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              manageGroup(
                Object.fromEntries(new FormData(e.currentTarget)),
              ).then(() => setIsAddModalOpen(false));
            }}
            className="space-y-8"
          >
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase text-slate-400 ml-5 tracking-widest">
                Node Name
              </Label>
              <Input
                name="name"
                required
                className="h-16 rounded-3xl glass-surface px-8 font-bold"
                placeholder="e.g. Fajr Revision Circle"
              />
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase text-slate-400 ml-5 tracking-widest">
                  Classification
                </Label>
                <Select name="type" defaultValue="HIFZ">
                  <SelectTrigger className="h-16 rounded-3xl bg-slate-100 dark:bg-slate-900 border-0 font-bold">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="rounded-3xl border-0 shadow-2xl">
                    {["ACADEMIC", "HIFZ", "REVISION", "SUPPORT", "OTHER"].map(
                      (t) => (
                        <SelectItem
                          key={t}
                          value={t}
                          className="font-bold py-4 uppercase text-[10px] tracking-widest"
                        >
                          {t}
                        </SelectItem>
                      ),
                    )}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase text-slate-400 ml-5 tracking-widest">
                  Capacity
                </Label>
                <Input
                  name="capacity"
                  type="number"
                  defaultValue={20}
                  className="h-16 rounded-3xl glass-surface px-8 font-bold"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase text-slate-400 ml-5 tracking-widest">
                Supervisor Node
              </Label>
              <Select name="teacherId">
                <SelectTrigger className="h-16 rounded-3xl bg-slate-100 dark:bg-slate-900 border-0 font-bold">
                  <SelectValue placeholder="Identify Instructor..." />
                </SelectTrigger>
                <SelectContent className="rounded-3xl border-0 shadow-2xl">
                  {teachers.map((t: any) => (
                    <SelectItem
                      key={t.id}
                      value={t.id}
                      className="font-bold py-4 border-b last:border-0"
                    >
                      {t.user.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button
              type="submit"
              className="w-full h-24 rounded-[3rem] bg-primary-700 text-white font-black text-2xl shadow-royal hover:scale-[1.02] transition-all"
            >
              INITIALIZE NODE
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function MetricTile({ label, value, icon: Icon, color }: any) {
  const styles: any = {
    purple: "bg-primary-700/10 text-primary-700 shadow-royal/10",
    emerald: "bg-emerald-500/10 text-emerald-500",
    gold: "bg-gold/10 text-gold",
  };
  return (
    <div className="institutional-card glass-surface p-10 flex flex-col items-center text-center space-y-4 group">
      <div
        className={`p-5 rounded-[2.5rem] ${styles[color]} transition-transform group-hover:rotate-12`}
      >
        <Icon className="h-8 w-8" />
      </div>
      <div>
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-2 leading-none">
          {label}
        </p>
        <p className="text-4xl font-black tracking-tighter dark:text-white leading-none">
          {value}
        </p>
      </div>
    </div>
  );
}
