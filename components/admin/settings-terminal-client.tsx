"use client";

import { useState, useTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Settings,
  Shield,
  User,
  Bell,
  Globe,
  Lock,
  Save,
  Loader2,
  Zap,
  Database,
  ChevronRight,
  School,
  CreditCard,
  Cloud,
  RefreshCcw,
  Mail,
  Palette,
  Hash,
  LayoutGrid,
  ShieldCheck,
  AlertTriangle,
  KeyRound,
  Award,
  GraduationCap,
} from "lucide-react";

import {
  updateAdminProfile,
  toggleMaintenanceMode,
  togglePublicRegistration,
  purgeNotifications,
  updateAcademicTerm,
} from "@/app/actions/admin/settings/actions";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@radix-ui/react-select";

const kContainer = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } },
};
const kItem = { hidden: { y: 20, opacity: 0 }, show: { y: 0, opacity: 1 } };

export default function SettingsTerminalClient({
  initialSettings,
  currentUser,
}: any) {
  const [isPending, startTransition] = useTransition();

  // Parse specific settings
  const isMaintenance =
    initialSettings.find((s: any) => s.key === "MAINTENANCE_MODE")?.value ===
    "true";
  const allowReg =
    initialSettings.find((s: any) => s.key === "ALLOW_PUBLIC_REGISTRATION")
      ?.value === "true";

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6 md:space-y-12 pb-40">
      {/* --- SOVEREIGN HEADER --- */}
      <header className="px-4 md:px-0 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mt-6 md:mt-10">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-primary-700 animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
              Institutional Vault v2.6
            </span>
          </div>
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-none">
            System <span className="text-primary-700">Vault</span>
          </h1>
        </div>
        <Badge className="bg-primary-700 h-10 px-6 rounded-full font-black uppercase tracking-widest text-[9px]">
          Root Access Active
        </Badge>
      </header>

      <Tabs defaultValue="general" className="w-full">
        {/* MOBILE TACTICAL TAB LIST (Swipeable) */}
        <div className="px-4 md:px-0 sticky top-0 z-30 bg-slate-50/80 dark:bg-black/80 backdrop-blur-xl py-2 -mx-4 md:mx-0">
          <TabsList className="bg-white dark:bg-slate-900 h-16 p-1.5 rounded-[1.5rem] border w-full md:w-fit justify-start overflow-x-auto no-scrollbar gap-2 shadow-sm">
            <TabsTrigger
              value="general"
              className="rounded-xl font-black text-[10px] uppercase px-8 h-full gap-2 transition-all data-[state=active]:bg-primary-700 data-[state=active]:text-white"
            >
              <LayoutGrid className="h-4 w-4" /> General
            </TabsTrigger>
            <TabsTrigger
              value="academic"
              className="rounded-xl font-black text-[10px] uppercase px-8 h-full gap-2 transition-all data-[state=active]:bg-primary-700 data-[state=active]:text-white"
            >
              <GraduationCap className="h-4 w-4" /> Academic
            </TabsTrigger>
            <TabsTrigger
              value="security"
              className="rounded-xl font-black text-[10px] uppercase px-8 h-full gap-2 transition-all data-[state=active]:bg-primary-700 data-[state=active]:text-white"
            >
              <ShieldCheck className="h-4 w-4" /> Security
            </TabsTrigger>
            <TabsTrigger
              value="identity"
              className="rounded-xl font-black text-[10px] uppercase px-8 h-full gap-2 transition-all data-[state=active]:bg-primary-700 data-[state=active]:text-white"
            >
              <User className="h-4 w-4" /> Identity
            </TabsTrigger>
          </TabsList>
        </div>

        {/* --- 1. GENERAL --- */}
        <TabsContent value="general" className="mt-8 px-4 md:px-0">
          <motion.div
            variants={kContainer}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <SettingsCard
              title="Institutional ID"
              icon={School}
              description="Manage public branding and node name."
            >
              <form className="space-y-4 pt-4">
                <div className="space-y-1">
                  <Label className="text-[9px] font-black uppercase text-slate-400 ml-2">
                    School Name
                  </Label>
                  <Input
                    defaultValue="Daar-ul-Maysaroh"
                    className="h-14 rounded-2xl glass-surface border-0 font-bold px-6"
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-[9px] font-black uppercase text-slate-400 ml-2">
                    Registry Support
                  </Label>
                  <Input
                    defaultValue="admin@daarulmaysaroh.com"
                    className="h-14 rounded-2xl glass-surface border-0 font-bold px-6"
                  />
                </div>
                <Button className="w-full h-14 bg-primary-700 rounded-2xl font-black uppercase text-xs shadow-royal mt-2">
                  Commit Branded Node
                </Button>
              </form>
            </SettingsCard>
            <SettingsCard
              title="Temporal Sync"
              icon={Globe}
              description="Configure universal timing parameters."
            >
              <div className="space-y-4 pt-4">
                <div className="space-y-1">
                  <Label className="text-[9px] font-black uppercase text-slate-400 ml-2">
                    System Timezone
                  </Label>
                  <Select defaultValue="UTC">
                    <SelectTrigger className="h-14 rounded-2xl border-0 bg-slate-100 dark:bg-slate-800 font-bold px-6">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="rounded-2xl border-0 shadow-2xl">
                      <SelectItem value="UTC" className="font-bold">
                        UTC Universal
                      </SelectItem>
                      <SelectItem value="AST" className="font-bold">
                        AST Arabia
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center justify-between p-6 bg-slate-100 dark:bg-slate-900 rounded-3xl mt-2">
                  <div>
                    <p className="font-black text-xs uppercase">Auto-Sync</p>
                    <p className="text-[9px] font-bold text-slate-400">
                      Fetch time from global node
                    </p>
                  </div>
                  <Switch
                    defaultChecked
                    className="data-[state=checked]:bg-primary-700"
                  />
                </div>
              </div>
            </SettingsCard>
          </motion.div>
        </TabsContent>

        {/* --- 2. ACADEMIC --- */}
        <TabsContent value="academic" className="mt-8 px-4 md:px-0">
          <motion.div
            variants={kContainer}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <SettingsCard
              title="Cycle Orchestrator"
              icon={RefreshCcw}
              description="Set the active academic term and dates."
            >
              <form className="space-y-4 pt-4">
                <div className="space-y-1">
                  <Label className="text-[9px] font-black uppercase text-slate-400 ml-2">
                    Active Term Name
                  </Label>
                  <Input
                    placeholder="Fall 2026"
                    className="h-14 rounded-2xl glass-surface border-0 font-bold px-6"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <Label className="text-[9px] font-black uppercase text-slate-400">
                      Start Date
                    </Label>
                    <Input
                      type="date"
                      className="h-14 rounded-2xl glass-surface border-0 px-4"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-[9px] font-black uppercase text-slate-400">
                      End Date
                    </Label>
                    <Input
                      type="date"
                      className="h-14 rounded-2xl glass-surface border-0 px-4"
                    />
                  </div>
                </div>
                <Button className="w-full h-14 bg-primary-700 rounded-2xl font-black uppercase text-xs mt-2">
                  Sync Academic Cycle
                </Button>
              </form>
            </SettingsCard>
            <SettingsCard
              title="Performance Scale"
              icon={Award}
              description="Define letter grade mastery thresholds."
            >
              <div className="grid grid-cols-3 gap-3 pt-4">
                <ThresholdInput label="A+" val={95} />
                <ThresholdInput label="A" val={85} />
                <ThresholdInput label="B" val={75} />
              </div>
              <Button
                variant="outline"
                className="w-full h-14 rounded-2xl mt-4 font-black uppercase text-[10px] border-2 border-slate-100"
              >
                Apply Scale Node
              </Button>
            </SettingsCard>
          </motion.div>
        </TabsContent>

        {/* --- 3. SECURITY --- */}
        <TabsContent value="security" className="mt-8 px-4 md:px-0 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SettingsCard
              title="Sovereign Control"
              icon={Shield}
              description="High-level system overrides."
            >
              <div className="space-y-4 pt-4">
                <SecurityToggle
                  title="Maintenance Protocol"
                  desc="Freeze portal for all non-admins"
                  checked={isMaintenance}
                  onToggle={(v) => toggleMaintenanceMode(v)}
                  color="rose"
                />
                <SecurityToggle
                  title="Public Registration"
                  desc="Allow new identities to apply"
                  checked={allowReg}
                  onToggle={(v) => togglePublicRegistration(v)}
                  color="primary"
                />
              </div>
            </SettingsCard>
            <SettingsCard
              title="System Hygiene"
              icon={Database}
              description="Database maintenance and audit cleanup."
            >
              <div className="space-y-4 pt-4">
                <Button
                  onClick={() => purgeNotifications()}
                  variant="ghost"
                  className="w-full h-16 rounded-2xl border-2 border-dashed border-rose-100 text-rose-500 font-black uppercase text-[10px] hover:bg-rose-50"
                >
                  <RefreshCcw className="h-4 w-4 mr-2" /> Purge Old
                  Notifications
                </Button>
                <Button
                  variant="ghost"
                  className="w-full h-16 rounded-2xl border-2 border-dashed border-slate-100 text-slate-400 font-black uppercase text-[10px] hover:bg-slate-50"
                >
                  <Cloud className="h-4 w-4 mr-2" /> Download DB Snapshot
                </Button>
              </div>
            </SettingsCard>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

// --- SUB-COMPONENTS ---

function SettingsCard({ title, icon: Icon, description, children }: any) {
  return (
    <div className="institutional-card glass-surface p-8 md:p-10 space-y-6 relative overflow-hidden group">
      <Icon className="absolute -right-4 -top-4 h-24 w-24 opacity-[0.03] group-hover:rotate-12 transition-transform duration-700 text-primary-700" />
      <div className="flex justify-between items-start relative z-10">
        <div className="space-y-1">
          <h3 className="text-2xl font-black tracking-tight leading-none">
            {title}
          </h3>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            {description}
          </p>
        </div>
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  );
}

function SecurityToggle({ title, desc, checked, onToggle, color }: any) {
  const styles: any = { rose: "bg-rose-500", primary: "bg-primary-700" };
  return (
    <div className="flex items-center justify-between p-6 bg-slate-50 dark:bg-slate-900 rounded-[2rem] border border-slate-100 dark:border-slate-800">
      <div className="flex items-center gap-4">
        <div
          className={`h-10 w-10 rounded-xl flex items-center justify-center text-white shadow-lg ${checked ? styles[color] : "bg-slate-200"}`}
        >
          <Zap className="h-5 w-5" />
        </div>
        <div>
          <p className="font-black text-xs uppercase leading-none mb-1">
            {title}
          </p>
          <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">
            {desc}
          </p>
        </div>
      </div>
      <Switch
        checked={checked}
        onCheckedChange={onToggle}
        className={`scale-110 data-[state=checked]:${styles[color]}`}
      />
    </div>
  );
}

function ThresholdInput({ label, val }: any) {
  return (
    <div className="space-y-1 text-center">
      <Label className="text-[9px] font-black uppercase text-slate-400">
        {label} Mastery
      </Label>
      <Input
        type="number"
        defaultValue={val}
        className="h-14 rounded-2xl glass-surface border-0 font-black text-xl text-center text-primary-700"
      />
    </div>
  );
}
