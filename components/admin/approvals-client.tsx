"use client";

import { useState, useTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck,
  ShieldX,
  User,
  Info,
  Search,
  CheckCircle2,
  XCircle,
  Loader2,
  MapPin,
  GraduationCap,
  Briefcase,
  Mail,
  Calendar,
  Fingerprint,
  Sparkles,
  ChevronRight,
} from "lucide-react";
import { processApproval } from "@/app/actions/admin/approvals/actions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

export default function ApprovalsClient({
  initialUsers,
}: {
  initialUsers: any[];
}) {
  const [isPending, startTransition] = useTransition();
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [search, setSearch] = useState("");

  const users = initialUsers.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase()),
  );
  const currentUser = users[selectedIdx];

  const handleAction = (action: "APPROVE" | "REJECT") => {
    startTransition(async () => {
      const res = await processApproval(currentUser.id, action);
      if (res.success) {
        toast.success(
          `Identity ${action === "APPROVE" ? "Verified" : "Decommissioned"}`,
        );
      } else {
        toast.error(res.error);
      }
    });
  };

  if (initialUsers.length === 0) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center opacity-30 text-center space-y-4">
        <ShieldCheck className="h-20 w-20 text-emerald-500" />
        <p className="font-black uppercase tracking-[0.4em] text-xs">
          Registry Clean: No Pending Nodes
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-10">
      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Sparkles className="h-3 w-3 text-gold animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-700">
              Security Firewall
            </span>
          </div>
          <h1 className="text-5xl font-black tracking-tighter text-slate-900 dark:text-white">
            Identity <span className="text-primary-700">Gatekeeper</span>
          </h1>
        </div>

        <div className="relative w-full md:w-80 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-primary-700" />
          <input
            placeholder="Deep search pending nodes..."
            className="w-full h-12 pl-11 glass-surface rounded-2xl outline-none focus:ring-2 ring-primary-700/20 text-xs font-bold"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* --- TACTICAL DESK --- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* LEFT: THE WAITLIST FEED */}
        <div className="lg:col-span-4 space-y-4 max-h-[70vh] overflow-y-auto no-scrollbar pr-2">
          {users.map((user, i) => (
            <motion.div
              key={user.id}
              onClick={() => setSelectedIdx(i)}
              className={`p-5 rounded-[2rem] border-2 cursor-pointer transition-all flex items-center justify-between group ${
                selectedIdx === i
                  ? "bg-primary-700 border-primary-700 text-white shadow-royal"
                  : "institutional-card glass-surface border-transparent"
              }`}
            >
              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12 border-2 border-white/20 shadow-lg">
                  <AvatarImage src={user.image} />
                  <AvatarFallback className="font-black text-primary-700">
                    {user.name[0]}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-black truncate max-w-[150px] leading-none mb-1">
                    {user.name}
                  </p>
                  <Badge
                    variant="outline"
                    className={`text-[8px] font-black uppercase border-0 p-0 ${selectedIdx === i ? "text-primary-200" : "text-slate-400"}`}
                  >
                    {user.role}
                  </Badge>
                </div>
              </div>
              <ChevronRight
                className={`h-4 w-4 transition-transform ${selectedIdx === i ? "translate-x-1" : "opacity-20"}`}
              />
            </motion.div>
          ))}
        </div>

        {/* RIGHT: THE INSPECTION TERMINAL */}
        <div className="lg:col-span-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentUser?.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="institutional-card bg-white dark:bg-slate-900 p-8 md:p-12 space-y-12 shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none rotate-12">
                <Fingerprint className="h-64 w-64" />
              </div>

              <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b dark:border-slate-800 pb-10">
                <div className="flex items-center gap-6">
                  <Avatar className="h-24 w-24 ring-4 ring-primary-100 dark:ring-primary-900 shadow-royal">
                    <AvatarImage src={currentUser?.image} />
                    <AvatarFallback className="text-3xl font-black">
                      {currentUser?.name[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="text-4xl font-black tracking-tighter leading-none mb-2">
                      {currentUser?.name}
                    </h2>
                    <div className="flex gap-2">
                      <Badge className="bg-primary-700 font-black uppercase text-[9px] px-3">
                        {currentUser?.role}
                      </Badge>
                      <Badge
                        variant="outline"
                        className="text-slate-400 border-slate-200 uppercase text-[9px] font-black"
                      >
                        {currentUser?.status}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">
                    Entry Logged
                  </p>
                  <p className="text-sm font-bold text-slate-900 dark:text-white">
                    {new Date(currentUser?.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* IDENTITY PARAMETERS (Dynamic based on Role) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                <InfoNode
                  icon={Mail}
                  label="Registry Email"
                  value={currentUser?.email}
                />

                {/* Role Specific Data */}
                {currentUser?.role === "STUDENT" && (
                  <>
                    <InfoNode
                      icon={Fingerprint}
                      label="Proposed Student ID"
                      value={currentUser?.studentProfile?.studentId}
                    />
                    <InfoNode
                      icon={MapPin}
                      label="Nationality"
                      value={currentUser?.studentProfile?.nationality}
                    />
                    <InfoNode
                      icon={GraduationCap}
                      label="Academic Year"
                      value={currentUser?.studentProfile?.academicYear}
                    />
                  </>
                )}
                {currentUser?.role === "TEACHER" && (
                  <>
                    <InfoNode
                      icon={ShieldCheck}
                      label="Proposed Teacher ID"
                      value={currentUser?.teacherProfile?.teacherId}
                    />
                    <InfoNode
                      icon={Briefcase}
                      label="Specialization"
                      value={currentUser?.teacherProfile?.specialization}
                    />
                  </>
                )}
                {currentUser?.role === "PARENT" && (
                  <>
                    <InfoNode
                      icon={Briefcase}
                      label="Occupation"
                      value={currentUser?.parentProfile?.occupation}
                    />
                    <InfoNode
                      icon={User}
                      label="Relationship"
                      value={currentUser?.parentProfile?.relationship}
                    />
                  </>
                )}
              </div>

              {/* ACTION PANEL */}
              <div className="pt-10 flex flex-col sm:flex-row gap-4 relative z-10 border-t dark:border-slate-800">
                <Button
                  disabled={isPending}
                  onClick={() => handleAction("REJECT")}
                  className="flex-1 h-20 rounded-[2rem] bg-rose-500 hover:bg-rose-600 text-white font-black text-lg shadow-xl shadow-rose-500/20 transition-all active:scale-95"
                >
                  {isPending ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    <>
                      <ShieldX className="mr-2 h-6 w-6" /> DENY ACCESS
                    </>
                  )}
                </Button>
                <Button
                  disabled={isPending}
                  onClick={() => handleAction("APPROVE")}
                  className="flex-1 h-20 rounded-[2rem] bg-emerald-500 hover:bg-emerald-600 text-white font-black text-lg shadow-xl shadow-emerald-500/20 transition-all active:scale-95"
                >
                  {isPending ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    <>
                      <ShieldCheck className="mr-2 h-6 w-6" /> VERIFY IDENTITY
                    </>
                  )}
                </Button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function InfoNode({ icon: Icon, label, value }: any) {
  return (
    <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 transition-all hover:border-primary-100">
      <div className="flex items-center gap-3 mb-2">
        <Icon className="h-4 w-4 text-primary-700" />
        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
          {label}
        </span>
      </div>
      <p className="text-base font-black text-slate-900 dark:text-white truncate">
        {value || "DATA MISSING"}
      </p>
    </div>
  );
}
