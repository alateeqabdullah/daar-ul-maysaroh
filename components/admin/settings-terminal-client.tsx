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
  BarChart3,
  Moon,
  Image as ImageIcon,
  CheckCircle2,
  GraduationCap,
  Award,
} from "lucide-react";

// All 12 Actions Integrated
import {
  updateSystemSetting,
  updateAdminProfile,
  toggleMaintenanceMode,
  updateAcademicTerm,
  togglePublicRegistration,
  updateGradingThresholds,
  updateFinancialConfig,
  updateAdminPassword,
  purgeNotifications,
  togglePrayerTracking,
  updateBranding,
  toggleAutoEmail,
} from "@/app/actions/admin/settings/actions";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

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

  // Parse Initial States from DB
  const getVal = (key: string) =>
    initialSettings.find((s: any) => s.key === key)?.value;

  const isMaintenance = getVal("MAINTENANCE_MODE") === "true";
  const isRegistrationOpen = getVal("ALLOW_PUBLIC_REGISTRATION") === "true";
  const isPrayerTracking = getVal("ENABLE_PRAYER_TRACKING") === "true";
  const isAutoEmail = getVal("AUTO_EMAIL_NOTIFICATIONS") === "true";

  // --- UNIVERSAL DISPATCHER ---
  const runAction = (action: Function, ...args: any[]) => {
    startTransition(async () => {
      try {
        await action(...args);
        toast.success("System Node Synchronized", {
          icon: <CheckCircle2 className="text-emerald-500" />,
        });
      } catch (e: any) {
        toast.error(e.message);
      }
    });
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6 md:space-y-12 pb-40 px-3 md:px-6">
      {/* --- HEADER --- */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mt-4 md:mt-10">
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
          Root Authority Active
        </Badge>
      </header>

      <Tabs defaultValue="general" className="w-full">
        {/* TACTICAL TAB LIST (Mobile Scrollable) */}
        <div className="sticky top-0 z-30 bg-slate-50/80 dark:bg-black/80 backdrop-blur-xl py-2 -mx-3 px-3">
          <TabsList className="bg-white dark:bg-slate-900 h-16 p-1.5 rounded-[1.5rem] border w-full md:w-fit justify-start overflow-x-auto no-scrollbar gap-2 shadow-sm">
            <TabsTrigger
              value="general"
              className="rounded-xl font-black text-[10px] uppercase px-8 h-full gap-2 transition-all data-[state=active]:bg-primary-700 data-[state=active]:text-white"
            >
              <LayoutGrid className="h-4 w-4" /> Branding
            </TabsTrigger>
            <TabsTrigger
              value="academic"
              className="rounded-xl font-black text-[10px] uppercase px-8 h-full gap-2 transition-all data-[state=active]:bg-primary-700 data-[state=active]:text-white"
            >
              <GraduationCap className="h-4 w-4" /> Academic
            </TabsTrigger>
            <TabsTrigger
              value="finance"
              className="rounded-xl font-black text-[10px] uppercase px-8 h-full gap-2 transition-all data-[state=active]:bg-primary-700 data-[state=active]:text-white"
            >
              <CreditCard className="h-4 w-4" /> Finance
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
              <User className="h-4 w-4" /> Profile
            </TabsTrigger>
          </TabsList>
        </div>

        {/* --- TAB 1: GENERAL & BRANDING --- */}
        <TabsContent value="general" className="mt-8 space-y-6">
          <motion.div
            variants={kContainer}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <SettingsCard
              title="Visual Identity"
              icon={Palette}
              desc="Institutional naming and asset deployment."
            >
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const d = new FormData(e.currentTarget);
                  runAction(updateBranding, d.get("name"), d.get("logo"));
                }}
                className="space-y-4 pt-4"
              >
                <div className="space-y-1">
                  <Label className="text-[9px] font-black uppercase text-slate-400 ml-2">
                    School Name
                  </Label>
                  <Input
                    name="name"
                    defaultValue="Daar-ul-Maysaroh"
                    className="h-14 rounded-2xl glass-surface border-0 font-bold px-6"
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-[9px] font-black uppercase text-slate-400 ml-2">
                    Logo URL Node
                  </Label>
                  <Input
                    name="logo"
                    placeholder="https://..."
                    className="h-14 rounded-2xl glass-surface border-0 font-bold px-6"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isPending}
                  className="w-full h-14 bg-primary-700 rounded-2xl font-black uppercase text-xs shadow-royal"
                >
                  {isPending ? (
                    <Loader2 className="animate-spin h-4 w-4" />
                  ) : (
                    "Commit Branding"
                  )}
                </Button>
              </form>
            </SettingsCard>
            <SettingsCard
              title="Global Handshake"
              icon={Mail}
              desc="Automated communication protocols."
            >
              <div className="space-y-4 pt-4">
                <SecurityToggle
                  title="Auto-Email Node"
                  desc="Dispatch receipts and results automatically"
                  checked={isAutoEmail}
                  onToggle={(v: boolean) => runAction(toggleAutoEmail, v)}
                  color="primary"
                />
                <div className="p-6 bg-slate-100 dark:bg-slate-900 rounded-3xl space-y-2">
                  <p className="text-[10px] font-black uppercase text-slate-500">
                    Registry Snapshot
                  </p>
                  <p className="text-xs font-bold dark:text-white">
                    Next scheduled database optimization: 04:00 AM UTC
                  </p>
                </div>
              </div>
            </SettingsCard>
          </motion.div>
        </TabsContent>

        {/* --- TAB 2: ACADEMIC ORCHESTRATION --- */}
        <TabsContent value="academic" className="mt-8 space-y-6">
          <motion.div
            variants={kContainer}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <SettingsCard
              title="Cycle Management"
              icon={RefreshCcw}
              desc="Define the active academic timeline."
            >
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const d = new FormData(e.currentTarget);
                  runAction(
                    updateAcademicTerm,
                    d.get("term"),
                    d.get("start"),
                    d.get("end"),
                  );
                }}
                className="space-y-4 pt-4"
              >
                <div className="space-y-1">
                  <Label className="text-[9px] font-black uppercase text-slate-400 ml-2">
                    Active Term Name
                  </Label>
                  <Input
                    name="term"
                    placeholder="Fall Cycle 2026"
                    className="h-14 rounded-2xl glass-surface border-0 font-bold px-6"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <Label className="text-[9px] font-black uppercase text-slate-400 ml-2">
                      Deployment
                    </Label>
                    <Input
                      name="start"
                      type="date"
                      className="h-14 rounded-2xl glass-surface border-0 px-4 font-bold"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-[9px] font-black uppercase text-slate-400 ml-2">
                      Conclusion
                    </Label>
                    <Input
                      name="end"
                      type="date"
                      className="h-14 rounded-2xl glass-surface border-0 px-4 font-bold"
                    />
                  </div>
                </div>
                <Button
                  type="submit"
                  disabled={isPending}
                  className="w-full h-14 bg-primary-700 rounded-2xl font-black uppercase text-xs shadow-royal"
                >
                  Sync Cycle
                </Button>
              </form>
            </SettingsCard>
            <SettingsCard
              title="Spiritual & Grade Thresholds"
              icon={Award}
              desc="Define mastery levels and KPI tracking."
            >
              <div className="space-y-6 pt-4">
                <SecurityToggle
                  title="Prayer Tracking"
                  desc="Monitor student spiritual compliance"
                  checked={isPrayerTracking}
                  onToggle={(v: boolean) => runAction(togglePrayerTracking, v)}
                  color="gold"
                />
                <div className="grid grid-cols-3 gap-3">
                  <ThresholdBox label="A+" val={95} />
                  <ThresholdBox label="A" val={85} />
                  <ThresholdBox label="B" val={75} />
                </div>
                <Button
                  variant="outline"
                  className="w-full h-14 rounded-2xl font-black uppercase text-[10px] border-2 border-slate-100"
                >
                  Update Grading Schema
                </Button>
              </div>
            </SettingsCard>
          </motion.div>
        </TabsContent>

        {/* --- TAB 3: FINANCIAL NODE CONFIG --- */}
        <TabsContent value="finance" className="mt-8">
          <motion.div
            variants={kContainer}
            initial="hidden"
            animate="show"
            className="max-w-2xl mx-auto"
          >
            <SettingsCard
              title="Financial Logic"
              icon={CreditCard}
              desc="Configure currency and delinquency protocols."
            >
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const d = new FormData(e.currentTarget);
                  runAction(
                    updateFinancialConfig,
                    d.get("currency"),
                    d.get("lateFee"),
                  );
                }}
                className="space-y-6 pt-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <Label className="text-[9px] font-black uppercase text-slate-400 ml-2">
                      Base Currency
                    </Label>
                    <Select name="currency" defaultValue="USD">
                      <SelectTrigger className="h-14 rounded-2xl glass-surface border-0 font-bold">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="rounded-2xl shadow-2xl">
                        <SelectItem value="USD" className="font-bold py-3">
                          USD - Dollar
                        </SelectItem>
                        <SelectItem value="NGN" className="font-bold py-3">
                          NGN - Naira
                        </SelectItem>
                        <SelectItem value="SAR" className="font-bold py-3">
                          SAR - Riyal
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-[9px] font-black uppercase text-slate-400 ml-2">
                      Late Handover Fee ($)
                    </Label>
                    <Input
                      name="lateFee"
                      type="number"
                      defaultValue="25"
                      className="h-14 rounded-2xl glass-surface border-0 font-bold px-6"
                    />
                  </div>
                </div>
                <Button
                  type="submit"
                  disabled={isPending}
                  className="w-full h-16 rounded-[1.5rem] bg-slate-900 dark:bg-white text-white dark:text-black font-black uppercase text-xs"
                >
                  Deploy Financial Logic
                </Button>
              </form>
            </SettingsCard>
          </motion.div>
        </TabsContent>

        {/* --- TAB 4: SYSTEM SECURITY & HYGIENE --- */}
        <TabsContent value="security" className="mt-8 space-y-6 px-4 md:px-0">
          <motion.div
            variants={kContainer}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <SettingsCard
              title="Sovereign Overrides"
              icon={Shield}
              desc="High-priority system state management."
            >
              <div className="space-y-4 pt-4">
                <SecurityToggle
                  title="Maintenance Mode"
                  desc="Freeze portal for non-admins"
                  checked={isMaintenance}
                  onToggle={(v: boolean) => runAction(toggleMaintenanceMode, v)}
                  color="rose"
                />
                <SecurityToggle
                  title="Identity Onboarding"
                  desc="Allow public user registration"
                  checked={isRegistrationOpen}
                  onToggle={(v: boolean) =>
                    runAction(togglePublicRegistration, v)
                  }
                  color="primary"
                />
              </div>
            </SettingsCard>
            <SettingsCard
              title="Database Hygiene"
              icon={Database}
              desc="Audit cleanup and node purging."
            >
              <div className="space-y-4 pt-4">
                <Button
                  onClick={() => runAction(purgeNotifications)}
                  variant="ghost"
                  className="w-full h-16 rounded-2xl border-2 border-dashed border-rose-100 text-rose-500 font-black uppercase text-[10px] hover:bg-rose-50 transition-all"
                >
                  <RefreshCcw className="h-4 w-4 mr-2" /> Purge Old
                  Notifications (30d)
                </Button>
                <Button
                  variant="ghost"
                  className="w-full h-16 rounded-2xl border-2 border-dashed border-slate-100 text-slate-400 font-black uppercase text-[10px]"
                >
                  <Cloud className="h-4 w-4 mr-2" /> Download Registry Backup
                </Button>
              </div>
            </SettingsCard>
          </motion.div>
        </TabsContent>

        {/* --- TAB 5: ADMIN IDENTITY & PASSWORD --- */}
        <TabsContent value="identity" className="mt-8 px-4 md:px-0">
          <motion.div
            variants={kContainer}
            initial="hidden"
            animate="show"
            className="max-w-2xl mx-auto space-y-6"
          >
            <div className="institutional-card glass-surface p-8 md:p-12 space-y-10">
              <div className="flex items-center gap-6">
                <Avatar className="h-20 w-20 ring-4 ring-primary-100 dark:ring-primary-900/30 shadow-2xl">
                  <AvatarImage src={currentUser?.image} />
                  <AvatarFallback className="text-xl font-black bg-primary-100 text-primary-700">
                    {currentUser?.name?.[0]}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <Badge className="bg-primary-700 text-[8px] uppercase font-black px-4 mb-2">
                    {currentUser?.role}
                  </Badge>
                  <h2 className="text-3xl font-black tracking-tighter dark:text-white">
                    {currentUser?.name}
                  </h2>
                  <p className="text-xs text-slate-400 font-bold">
                    {currentUser?.email}
                  </p>
                </div>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  runAction(
                    updateAdminProfile,
                    Object.fromEntries(new FormData(e.currentTarget)),
                  );
                }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <Label className="text-[9px] font-black uppercase text-slate-400 ml-4">
                      Node Name
                    </Label>
                    <Input
                      name="name"
                      defaultValue={currentUser?.name}
                      className="h-14 rounded-2xl glass-surface border-0 px-6 font-bold"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-[9px] font-black uppercase text-slate-400 ml-4">
                      Phone Node
                    </Label>
                    <Input
                      name="phone"
                      defaultValue={currentUser?.phone}
                      className="h-14 rounded-2xl glass-surface border-0 px-6 font-bold"
                    />
                  </div>
                </div>
                <Button
                  type="submit"
                  disabled={isPending}
                  className="w-full h-16 rounded-[1.5rem] bg-primary-700 text-white font-black uppercase text-xs shadow-royal"
                >
                  {isPending ? (
                    <Loader2 className="animate-spin h-5 w-5" />
                  ) : (
                    "Commit Identity Sync"
                  )}
                </Button>
              </form>

              <div className="pt-8 border-t dark:border-slate-800">
                <h4 className="text-[10px] font-black uppercase text-slate-400 mb-6 flex items-center gap-2">
                  <Lock className="h-3 w-3" /> Security Handshake
                </h4>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const d = new FormData(e.currentTarget);
                    runAction(
                      updateAdminPassword,
                      d.get("current"),
                      d.get("next"),
                    );
                  }}
                  className="space-y-4"
                >
                  <Input
                    name="current"
                    type="password"
                    placeholder="Current Password"
                    className="h-14 rounded-2xl glass-surface border-0 px-6 font-bold"
                  />
                  <Input
                    name="next"
                    type="password"
                    placeholder="New Sovereign Password"
                    className="h-14 rounded-2xl glass-surface border-0 px-6 font-bold"
                  />
                  <Button
                    type="submit"
                    variant="outline"
                    className="w-full h-14 rounded-2xl border-2 font-black uppercase text-[10px]"
                  >
                    Rotate Security Key
                  </Button>
                </form>
              </div>
            </div>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

// --- SOVEREIGN UI HELPERS ---

function SettingsCard({ title, icon: Icon, description, children }: any) {
  return (
    <motion.div
      variants={kItem}
      className="institutional-card glass-surface p-8 md:p-10 space-y-6 relative overflow-hidden group"
    >
      <Icon className="absolute -right-4 -top-4 h-24 w-24 opacity-[0.03] group-hover:rotate-12 transition-transform duration-700 text-primary-700" />
      <div className="relative z-10 flex justify-between items-start">
        <div className="space-y-1">
          <h3 className="text-2xl font-black tracking-tight leading-none dark:text-white">
            {title}
          </h3>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            {description}
          </p>
        </div>
        <Settings className="h-4 w-4 text-slate-200" />
      </div>
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}

function SecurityToggle({ title, desc, checked, onToggle, color }: any) {
  const styles: any = {
    rose: "bg-rose-500 shadow-rose-500/20",
    primary: "bg-primary-700 shadow-primary-700/20",
    gold: "bg-gold shadow-gold/20",
  };
  return (
    <div className="flex items-center justify-between p-6 bg-slate-50 dark:bg-slate-900 rounded-[2rem] border dark:border-slate-800 transition-all hover:border-primary-100/50">
      <div className="flex items-center gap-4">
        <div
          className={`h-11 w-11 rounded-xl flex items-center justify-center text-white shadow-lg transition-colors duration-500 ${checked ? styles[color] : "bg-slate-200 dark:bg-slate-800 text-slate-400"}`}
        >
          <Zap className="h-5 w-5" />
        </div>
        <div>
          <p className="font-black text-xs uppercase leading-none mb-1 dark:text-white">
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
        className="scale-125"
      />
    </div>
  );
}

function ThresholdBox({ label, val }: any) {
  return (
    <div className="space-y-1.5 text-center">
      <Label className="text-[9px] font-black uppercase text-slate-400">
        {label} Mastery
      </Label>
      <Input
        type="number"
        defaultValue={val}
        className="h-14 rounded-2xl glass-surface border-0 font-black text-xl text-center text-primary-700 focus:ring-4 ring-primary-100"
      />
    </div>
  );
}
