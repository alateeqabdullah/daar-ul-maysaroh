"use client";

import { useState, useMemo, useTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Plus,
  MoreHorizontal,
  UserCheck,
  UserX,
  ShieldAlert,
  Mail,
  Phone,
  Calendar,
  Trash2,
  ExternalLink,
  Hash,
  X,
  Loader2,
  GraduationCap,
  Users,
  UserRound,
  MapPin,
  Globe,
  Link,
} from "lucide-react";
import {
  updateUserStatus,
  createUserNode,
  deleteUserNode,
  linkParentToStudent,
} from "@/app/actions/admin/users/actions";

// Brand Components
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

export default function UserRegistryClient({
  initialUsers,
}: {
  initialUsers: any[];
}) {
  const [isPending, startTransition] = useTransition();
  const [users, setUsers] = useState(initialUsers);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("ALL");

  // Modals
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [parentEmail, setParentEmail] = useState("");

  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      const matchSearch =
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase());
      const matchTab = activeTab === "ALL" || u.role === activeTab;
      return matchSearch && matchTab;
    });
  }, [users, search, activeTab]);

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    startTransition(async () => {
      const res = await createUserNode(data);
      if (res.success) {
        setIsAddModalOpen(false);
        toast.success("Node Injected Successfully");
      }
    });
  };

  const handleLinkParent = async (studentId: string) => {
    startTransition(async () => {
      try {
        await linkParentToStudent(studentId, parentEmail);
        toast.success("Guardian link established");
        setParentEmail("");
      } catch (e: any) {
        toast.error(e.message);
      }
    });
  };

  return (
    <div className="space-y-8 pb-20">
      {/* --- HEADER --- */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="space-y-2">
          <Badge className="bg-primary-700/10 text-primary-700 dark:text-primary-300 border-0">
            Identity Hub
          </Badge>
          <h1 className="text-5xl font-black tracking-tighter text-slate-900 dark:text-white leading-none">
            Registry <span className="text-primary-700">Terminal</span>
          </h1>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-80 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              placeholder="Search by identity..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-14 pl-12 glass-surface rounded-2xl outline-none focus:ring-2 ring-primary/20 dark:bg-slate-950"
            />
          </div>
          <Button
            onClick={() => setIsAddModalOpen(true)}
            className="h-14 px-8 rounded-2xl bg-primary-700 text-white font-black uppercase text-[10px] tracking-widest shadow-royal hover:scale-105 transition-all"
          >
            <Plus className="mr-2 h-4 w-4" /> Inject Node
          </Button>
        </div>
      </header>

      {/* --- TAB FILTERS --- */}
      <div className="flex gap-2 p-1.5 glass-surface rounded-2xl w-fit overflow-x-auto no-scrollbar max-w-full">
        {["ALL", "STUDENT", "TEACHER", "PARENT", "ADMIN"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${
              activeTab === tab
                ? "bg-primary-700 text-white shadow-xl"
                : "text-slate-400 hover:text-primary-700"
            }`}
          >
            {tab}s
          </button>
        ))}
      </div>

      {/* --- REGISTRY TABLE --- */}
      <div className="institutional-card glass-surface overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50/50 dark:bg-slate-900/50 border-b dark:border-slate-800">
              <tr>
                <th className="p-6 text-[10px] font-black uppercase tracking-widest text-slate-400">
                  Node / Identity
                </th>
                <th className="p-6 text-[10px] font-black uppercase tracking-widest text-slate-400">
                  Classification
                </th>
                <th className="p-6 text-[10px] font-black uppercase tracking-widest text-slate-400">
                  Status
                </th>
                <th className="p-6"></th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr
                  key={user.id}
                  onClick={() => setSelectedUser(user)}
                  className="border-b dark:border-slate-800 group hover:bg-slate-50/50 dark:hover:bg-slate-900/50 transition-all cursor-pointer"
                >
                  <td className="p-6">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12 border-2 border-white dark:border-slate-800">
                        <AvatarImage src={user.image} />
                        <AvatarFallback className="font-black text-primary-700">
                          {user.name[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-black text-slate-900 dark:text-white">
                          {user.name}
                        </p>
                        <p className="text-[10px] font-bold text-slate-400 flex items-center gap-1">
                          <Mail className="h-3 w-3" />
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="p-6">
                    <Badge
                      variant="outline"
                      className={`text-[9px] font-black uppercase tracking-widest px-3 py-1 ${getRoleStyle(user.role)}`}
                    >
                      {user.role}
                    </Badge>
                  </td>
                  <td className="p-6">
                    <div className="flex items-center gap-2">
                      <div
                        className={`h-1.5 w-1.5 rounded-full animate-pulse ${user.status === "APPROVED" ? "bg-emerald-500" : "bg-amber-500"}`}
                      />
                      <span className="text-[10px] font-black uppercase text-slate-500 dark:text-slate-300">
                        {user.status}
                      </span>
                    </div>
                  </td>
                  <td
                    className="p-6 text-right"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="rounded-full"
                        >
                          <MoreHorizontal className="h-5 w-5 text-slate-400" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="end"
                        className="w-52 rounded-2xl p-2 shadow-royal dark:bg-slate-900 border-0"
                      >
                        <DropdownMenuItem
                          onClick={() => updateUserStatus(user.id, "APPROVED")}
                          className="rounded-xl py-3 font-bold text-[11px] gap-2"
                        >
                          <UserCheck className="h-4 w-4 text-emerald-500" />{" "}
                          Approve Node
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => setSelectedUser(user)}
                          className="rounded-xl py-3 font-bold text-[11px] gap-2"
                        >
                          <ExternalLink className="h-4 w-4 text-primary-700" />{" "}
                          View Identity
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => deleteUserNode(user.id)}
                          className="rounded-xl py-3 font-bold text-[11px] gap-2 text-rose-600"
                        >
                          <Trash2 className="h-4 w-4" /> Decommission
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- ADD MODAL --- */}
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent className="max-w-xl rounded-[3rem] p-10 dark:bg-slate-950 border-0">
          <DialogHeader className="mb-6">
            <DialogTitle className="text-3xl font-black tracking-tighter">
              Manual Node <span className="text-primary-700">Injection</span>
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleCreate} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase text-slate-400 ml-1">
                  Node Name
                </Label>
                <Input
                  name="name"
                  required
                  className="h-14 rounded-2xl glass-surface"
                  placeholder="Ahmad Youssef"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase text-slate-400 ml-1">
                  Node Email
                </Label>
                <Input
                  name="email"
                  type="email"
                  required
                  className="h-14 rounded-2xl glass-surface"
                  placeholder="ahmad@node.com"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase text-slate-400 ml-1">
                  Classification
                </Label>
                <Select name="role" defaultValue="STUDENT">
                  <SelectTrigger className="h-14 rounded-2xl border-0 bg-slate-100 dark:bg-slate-900">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="rounded-2xl border-0 shadow-2xl">
                    <SelectItem value="STUDENT" className="font-bold py-3">
                      STUDENT
                    </SelectItem>
                    <SelectItem value="TEACHER" className="font-bold py-3">
                      TEACHER
                    </SelectItem>
                    <SelectItem value="PARENT" className="font-bold py-3">
                      PARENT
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase text-slate-400 ml-1">
                  Node ID (Specific)
                </Label>
                <Input
                  name="specificId"
                  required
                  className="h-14 rounded-2xl glass-surface"
                  placeholder="ID-2026-XXXX"
                />
              </div>
            </div>
            <Button
              type="submit"
              disabled={isPending}
              className="w-full h-16 rounded-2xl bg-primary-700 text-white font-black shadow-royal hover:scale-[1.02] transition-all"
            >
              {isPending ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Verify & Inject Node"
              )}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* --- IDENTITY DRAWER --- */}
      <Sheet open={!!selectedUser} onOpenChange={() => setSelectedUser(null)}>
        <SheetContent className="sm:max-w-2xl dark:bg-slate-950 border-0 shadow-2xl overflow-y-auto no-scrollbar">
          <SheetHeader className="mb-10 text-left">
            <div className="flex items-center gap-6">
              <Avatar className="h-24 w-24 ring-4 ring-primary-100 dark:ring-primary-900/30 shadow-2xl">
                <AvatarImage src={selectedUser?.image} />
                <AvatarFallback className="text-3xl font-black">
                  {selectedUser?.name[0]}
                </AvatarFallback>
              </Avatar>
              <div>
                <SheetTitle className="text-4xl font-black tracking-tighter text-slate-900 dark:text-white leading-none mb-2">
                  {selectedUser?.name}
                </SheetTitle>
                <div className="flex gap-2">
                  <Badge className="bg-primary-700 rounded-full px-3 text-[9px] font-black uppercase">
                    {selectedUser?.role}
                  </Badge>
                  <Badge
                    variant="outline"
                    className="rounded-full border-slate-200 dark:border-slate-800 text-[9px] font-black uppercase"
                  >
                    {selectedUser?.status}
                  </Badge>
                </div>
              </div>
            </div>
          </SheetHeader>

          <Tabs defaultValue="identity" className="w-full">
            <TabsList className="bg-slate-100 dark:bg-slate-900 p-1 rounded-2xl w-full justify-start mb-8 h-12">
              <TabsTrigger
                value="identity"
                className="rounded-xl font-black text-[9px] uppercase tracking-widest px-6 h-10"
              >
                Deep Identity
              </TabsTrigger>
              <TabsTrigger
                value="academic"
                className="rounded-xl font-black text-[9px] uppercase tracking-widest px-6 h-10"
              >
                Academic
              </TabsTrigger>
              {selectedUser?.role === "STUDENT" && (
                <TabsTrigger
                  value="guardian"
                  className="rounded-xl font-black text-[9px] uppercase tracking-widest px-6 h-10"
                >
                  Guardian Link
                </TabsTrigger>
              )}
            </TabsList>

            <TabsContent value="identity" className="grid grid-cols-2 gap-4">
              <InfoCard
                label="Registry Email"
                value={selectedUser?.email}
                icon={Mail}
              />
              <InfoCard
                label="Contact Frequency"
                value={selectedUser?.phone || "Not Encrypted"}
                icon={Phone}
              />
              <InfoCard
                label="Node Nationality"
                value={selectedUser?.studentProfile?.nationality || "Global"}
                icon={Globe}
              />
              <InfoCard
                label="Location Code"
                value={selectedUser?.studentProfile?.city || "Remote"}
                icon={MapPin}
              />
            </TabsContent>

            <TabsContent value="academic" className="grid grid-cols-2 gap-4">
              <InfoCard
                label="Unique ID"
                value={
                  selectedUser?.studentProfile?.studentId ||
                  selectedUser?.teacherProfile?.teacherId
                }
                icon={Hash}
              />
              <InfoCard
                label="Cycle / Year"
                value={
                  selectedUser?.studentProfile?.academicYear || "2025-2026"
                }
                icon={Calendar}
              />
              <InfoCard
                label="Level Node"
                value={selectedUser?.studentProfile?.currentLevel || "Primary"}
                icon={GraduationCap}
              />
              <InfoCard
                label="Join Handshake"
                value={new Date(selectedUser?.createdAt).toLocaleDateString()}
                icon={UserRound}
              />
            </TabsContent>

            <TabsContent value="guardian" className="space-y-6">
              <div className="p-6 bg-slate-50 dark:bg-slate-900 rounded-[2rem] border dark:border-slate-800">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2">
                  <Link className="h-3 w-3" /> Connect Parent Node
                </h4>
                <div className="flex gap-2">
                  <Input
                    placeholder="parent@identity.com"
                    value={parentEmail}
                    onChange={(e) => setParentEmail(e.target.value)}
                    className="h-14 rounded-2xl glass-surface"
                  />
                  <Button
                    onClick={() =>
                      handleLinkParent(selectedUser.studentProfile.id)
                    }
                    disabled={isPending}
                    className="h-14 px-6 rounded-2xl bg-indigo-600"
                  >
                    {isPending ? <Loader2 className="animate-spin" /> : "Link"}
                  </Button>
                </div>
              </div>
              {selectedUser?.studentProfile?.parent && (
                <div className="p-6 institutional-card glass-surface">
                  <p className="text-[9px] font-black uppercase text-emerald-500 mb-2">
                    Verified Guardian
                  </p>
                  <p className="font-bold">
                    {selectedUser.studentProfile.parent.user.name}
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </SheetContent>
      </Sheet>
    </div>
  );
}

function InfoCard({ label, value, icon: Icon }: any) {
  return (
    <div className="p-5 rounded-[1.8rem] bg-slate-50 dark:bg-slate-900/50 border dark:border-slate-800 transition-all hover:border-primary-200">
      <div className="flex items-center gap-2 mb-2">
        <Icon className="h-3.5 w-3.5 text-primary-700" />
        <span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">
          {label}
        </span>
      </div>
      <p className="text-sm font-black text-slate-900 dark:text-white truncate">
        {value || "NONE"}
      </p>
    </div>
  );
}

function getRoleStyle(role: string) {
  switch (role) {
    case "ADMIN":
      return "border-primary-700 text-primary-700 bg-primary-700/5";
    case "TEACHER":
      return "border-gold text-gold bg-gold/5";
    case "STUDENT":
      return "border-indigo-600 text-indigo-600 bg-indigo-600/5";
    default:
      return "border-slate-400 text-slate-400 bg-slate-50";
  }
}
