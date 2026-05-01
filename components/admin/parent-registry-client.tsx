"use client";

import { useState, useTransition, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Search,
  Users,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Heart,
  Wallet,
  Download,
  ChevronRight,
  Loader2,
  Zap,
} from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import {
  manageParentNode,
  decommissionParent,
  getFamilyStatement,
} from "@/app/actions/admin/parents/actions";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

export default function ParentRegistryClient({
  initialParents,
  students,
}: any) {
  const [isPending, startTransition] = useTransition();
  const [search, setSearch] = useState("");
  const [activeParent, setActiveParent] = useState<any>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const filtered = useMemo(
    () =>
      initialParents.filter(
        (p: any) =>
          p.user.name.toLowerCase().includes(search.toLowerCase()) ||
          p.user.email.toLowerCase().includes(search.toLowerCase()),
      ),
    [initialParents, search],
  );

  // --- PDF GENERATION PROTOCOL ---
  const generateFamilyStatement = async (parent: any) => {
    const data = await getFamilyStatement(parent.id);
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.setTextColor(124, 58, 237);
    doc.text(`Financial Statement: ${parent.user.name}`, 14, 22);
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(`Family Node ID: ${parent.id}`, 14, 30);

    autoTable(doc, {
      startY: 40,
      head: [["Month", "Amount", "Status", "Due Date"]],
      body: data.map((inv: any) => [
        inv.month,
        `$${inv.amount}`,
        inv.status,
        new Date(inv.dueDate).toLocaleDateString(),
      ]),
      headStyles: { fillColor: [124, 58, 237] },
    });

    doc.save(`Statement_${parent.user.name}.pdf`);
    toast.success("Statement Exported");
  };

  const handleCreate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const d = Object.fromEntries(new FormData(e.currentTarget));
    startTransition(async () => {
      try {
        await manageParentNode(d);
        setIsAddModalOpen(false);
        toast.success("Guardian Node Injected");
      } catch (e: any) {
        toast.error(e.message);
      }
    });
  };

  return (
    <div className="max-w-[1600px] mx-auto space-y-6 md:space-y-12 pb-40 px-4 md:px-10 mt-4 md:mt-10">
      {/* --- HEADER --- */}
      <header className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="space-y-2">
            <Badge className="bg-primary-700/10 text-primary-700 border-0 font-black text-[10px] uppercase tracking-widest px-4 py-1.5 rounded-full">
              Stakeholder Registry v2.6
            </Badge>
            <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-slate-900 dark:text-white leading-none">
              Guardian <span className="text-primary-700">Nodes</span>
            </h1>
          </div>
          <Button
            onClick={() => setIsAddModalOpen(true)}
            className="h-16 px-10 rounded-2xl bg-primary-700 text-white font-black uppercase text-xs tracking-widest shadow-royal active:scale-95 transition-all"
          >
            <Plus className="mr-2 h-5 w-5" /> Inject Guardian
          </Button>
        </div>
        <div className="relative group">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-primary-700 transition-colors" />
          <input
            placeholder="Search guardian registry (Name, Email, Phone)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-16 md:h-20 pl-16 glass-surface rounded-[1.5rem] md:rounded-[2.5rem] border-0 focus:ring-4 ring-primary-700/10 font-bold dark:bg-slate-900"
          />
        </div>
      </header>

      {/* --- BENTO GRID --- */}
      <motion.div
        variants={kContainer}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((parent: any) => (
            <motion.div
              key={parent.id}
              layout
              variants={kItem}
              onClick={() => setActiveParent(parent)}
              className="institutional-card glass-surface p-8 cursor-pointer group hover:border-primary-700 transition-all dark:bg-slate-900/40 min-h-[350px] flex flex-col justify-between"
            >
              <div className="space-y-6">
                <div className="flex justify-between items-start">
                  <Avatar className="h-16 w-16 border-4 border-white dark:border-slate-800 shadow-xl transition-transform group-hover:scale-110">
                    <AvatarImage src={parent.user.image} />
                    <AvatarFallback className="font-black text-primary-700">
                      {parent.user.name[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col items-end gap-2">
                    <Badge className="bg-emerald-500/10 text-emerald-600 border-0 text-[8px] font-black uppercase tracking-widest px-3 py-1">
                      Verified Node
                    </Badge>
                    {parent.students.length > 0 && (
                      <Badge
                        variant="outline"
                        className="text-[8px] font-black"
                      >
                        {parent.students.length} Children
                      </Badge>
                    )}
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl md:text-3xl font-black dark:text-white leading-tight mb-1">
                    {parent.user.name}
                  </h3>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2 truncate">
                    <Mail className="h-3 w-3" /> {parent.user.email}
                  </p>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
                <div className="flex -space-x-3">
                  {parent.students.map((s: any) => (
                    <Avatar
                      key={s.id}
                      className="h-8 w-8 border-2 border-white dark:border-slate-900"
                    >
                      <AvatarImage src={s.user.image} />
                      <AvatarFallback className="text-[8px] font-black">
                        {s.user.name[0]}
                      </AvatarFallback>
                    </Avatar>
                  ))}
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-12 w-12 rounded-full bg-slate-50 dark:bg-slate-800"
                >
                  <ChevronRight />
                </Button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* --- IDENTITY DRAWER (DEEP-DIVE) --- */}
      <Sheet open={!!activeParent} onOpenChange={() => setActiveParent(null)}>
        <SheetContent
          side="right"
          className="w-full sm:max-w-3xl lg:max-w-4xl dark:bg-slate-950 border-0 p-0 overflow-y-auto no-scrollbar shadow-2xl"
        >
          <SheetHeader className="sr-only">
            <SheetTitle>Guardian Identity</SheetTitle>
          </SheetHeader>

          <div className="p-10 md:p-16 bg-primary-700 text-white relative overflow-hidden min-h-[350px] flex flex-col justify-end">
            <div className="absolute -right-10 -bottom-10 opacity-10 rotate-12">
              <Heart className="h-80 w-80" />
            </div>
            <div className="relative z-10 space-y-6">
              <Badge className="bg-white/20 text-white border-0 backdrop-blur-md font-black px-6 py-2 rounded-full uppercase text-[10px]">
                Family Node Leader
              </Badge>
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-none">
                {activeParent?.user.name}
              </h2>
              <div className="flex flex-wrap gap-8">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-white/10 shadow-inner">
                    <Users className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-[9px] font-black uppercase text-primary-200 tracking-widest leading-none mb-1">
                      Family Size
                    </p>
                    <p className="text-lg font-black">
                      {activeParent?.familySize || 0}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-white/10 shadow-inner">
                    <Briefcase className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-[9px] font-black uppercase text-primary-200 tracking-widest leading-none mb-1">
                      Occupation
                    </p>
                    <p className="text-lg font-black">
                      {activeParent?.occupation || "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-8 md:p-16">
            <Tabs defaultValue="identity" className="w-full">
              <TabsList className="bg-slate-100 dark:bg-slate-900 p-1.5 rounded-[2rem] w-full justify-start h-16 mb-12 shadow-inner overflow-x-auto no-scrollbar">
                <TabsTrigger
                  value="identity"
                  className="rounded-xl font-black text-xs uppercase px-10 h-full"
                >
                  The Identity
                </TabsTrigger>
                <TabsTrigger
                  value="family"
                  className="rounded-xl font-black text-xs uppercase px-10 h-full"
                >
                  Family Node
                </TabsTrigger>
                <TabsTrigger
                  value="finance"
                  className="rounded-xl font-black text-xs uppercase px-10 h-full"
                >
                  Billing
                </TabsTrigger>
                <TabsTrigger
                  value="ops"
                  className="rounded-xl font-black text-xs uppercase px-10 h-full text-rose-500"
                >
                  Security
                </TabsTrigger>
              </TabsList>

              <TabsContent value="identity" className="space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InfoBlock
                    label="Personal Email"
                    value={activeParent?.user.email}
                    icon={Mail}
                  />
                  <InfoBlock
                    label="Direct Phone"
                    value={activeParent?.user.phone}
                    icon={Phone}
                  />
                  <InfoBlock
                    label="Current Employer"
                    value={activeParent?.employer}
                    icon={Briefcase}
                  />
                  <InfoBlock
                    label="Residential Address"
                    value={activeParent?.address}
                    icon={MapPin}
                  />
                </div>
                <div className="institutional-card glass-surface p-8 space-y-4">
                  <p className="text-[10px] font-black uppercase text-primary-700 tracking-widest">
                    Spousal Metadata
                  </p>
                  <div className="flex justify-between border-b pb-4">
                    <span className="text-sm font-bold text-slate-400">
                      Name
                    </span>
                    <span className="text-sm font-black dark:text-white">
                      {activeParent?.spouseName || "None"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-bold text-slate-400">
                      Contact
                    </span>
                    <span className="text-sm font-black dark:text-white">
                      {activeParent?.spousePhone || "None"}
                    </span>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="family" className="space-y-6">
                <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-4 mb-4 uppercase">
                  Connected Student Nodes
                </h4>
                <div className="grid gap-4">
                  {activeParent?.students.map((child: any) => (
                    <div
                      key={child.id}
                      className="p-6 rounded-[2.5rem] glass-surface flex justify-between items-center border border-slate-100 dark:border-slate-800"
                    >
                      <div className="flex items-center gap-6">
                        <Avatar className="h-14 w-14 border-2 border-primary-100 shadow-sm">
                          <AvatarImage src={child.user.image} />
                        </Avatar>
                        <div>
                          <p className="text-lg font-black dark:text-white leading-none mb-1">
                            {child.user.name}
                          </p>
                          <p className="text-[9px] font-black uppercase text-primary-700">
                            {child.studentId} • {child.currentLevel}
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full h-12 w-12"
                      >
                        <ChevronRight />
                      </Button>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="finance" className="space-y-8">
                <div className="p-10 bg-slate-900 rounded-[3rem] text-white flex flex-col md:flex-row justify-between items-center gap-8 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-8 opacity-5 scale-150 rotate-12">
                    <Wallet size={200} />
                  </div>
                  <div className="relative z-10 space-y-2 text-center md:text-left">
                    <p className="text-[10px] font-black uppercase text-primary-300">
                      Financial Transparency
                    </p>
                    <h4 className="text-4xl font-black tracking-tighter">
                      Export Ledger
                    </h4>
                    <p className="text-xs font-bold text-slate-400 max-w-xs">
                      Generate a complete PDF statement of family node invoices
                      and disbursements.
                    </p>
                  </div>
                  <Button
                    onClick={() => generateFamilyStatement(activeParent)}
                    className="relative z-10 h-16 px-10 rounded-2xl bg-white text-slate-900 font-black uppercase text-xs shadow-xl active:scale-95 transition-all"
                  >
                    <Download className="mr-3 h-5 w-5" /> Download Statement
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="ops" className="space-y-4">
                <Button
                  variant="outline"
                  className="w-full h-16 rounded-2xl border-2 font-black uppercase text-[10px] tracking-widest"
                >
                  <Zap className="mr-3 h-4 w-4" /> Reset Portal Access
                </Button>
                <Button
                  onClick={() => decommissionParent(activeParent.id)}
                  variant="ghost"
                  className="w-full h-24 rounded-[3rem] border-4 border-dashed border-rose-100 text-rose-500 font-black uppercase text-xs hover:bg-rose-500 hover:text-white transition-all"
                >
                  Decommission Node
                </Button>
              </TabsContent>
            </Tabs>
          </div>
        </SheetContent>
      </Sheet>

      {/* --- INJECTION MODAL --- */}
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent className="max-w-2xl w-full h-[100dvh] md:h-auto md:max-h-[90vh] rounded-none md:rounded-[4rem] p-8 md:p-16 dark:bg-slate-950 border-0 shadow-royal overflow-y-auto no-scrollbar">
          <DialogHeader className="mb-10 text-left">
            <DialogTitle className="text-4xl md:text-6xl font-black tracking-tighter leading-none">
              Initialize <span className="text-primary-700">Guardian</span>
            </DialogTitle>
            <DialogDescription className="font-bold text-slate-400 uppercase text-[10px] tracking-widest pt-2">
              Identity Deployment Protocol v2.6
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleCreate} className="space-y-6 md:space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase text-slate-400 ml-4">
                  Full Identity Name
                </Label>
                <Input
                  name="name"
                  required
                  className="h-16 rounded-[1.5rem] md:rounded-[2.5rem] glass-surface border-0 px-8 font-bold text-lg"
                  placeholder="Ahmad Abdullah"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase text-slate-400 ml-4">
                  Registry Email
                </Label>
                <Input
                  name="email"
                  type="email"
                  required
                  className="h-16 rounded-[1.5rem] md:rounded-[2.5rem] glass-surface border-0 px-8 font-bold text-lg"
                  placeholder="guardian@identity.com"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase text-slate-400 ml-4">
                  Direct Phone
                </Label>
                <Input
                  name="phone"
                  required
                  className="h-16 rounded-[1.5rem] md:rounded-[2.5rem] glass-surface border-0 px-8 font-bold text-lg"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase text-slate-400 ml-4">
                  Relation Node
                </Label>
                <Select name="relationship" defaultValue="FATHER">
                  <SelectTrigger className="h-16 rounded-[1.5rem] md:rounded-[2.5rem] bg-slate-100 dark:bg-slate-900 border-0 font-bold px-8 text-lg">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="rounded-3xl border-0 shadow-2xl">
                    <SelectItem value="FATHER" className="py-4 font-bold">
                      FATHER Node
                    </SelectItem>
                    <SelectItem value="MOTHER" className="py-4 font-bold">
                      MOTHER Node
                    </SelectItem>
                    <SelectItem value="GUARDIAN" className="py-4 font-bold">
                      GUARDIAN Node
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button
              type="submit"
              disabled={isPending}
              className="w-full h-20 md:h-28 rounded-[2.5rem] md:rounded-[4rem] bg-primary-700 text-white font-black text-xl md:text-2xl shadow-royal transition-all active:scale-95 group"
            >
              {isPending ? (
                <Loader2 className="animate-spin" />
              ) : (
                "DEPLOY GUARDIAN BLUEPRINT"
              )}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function InfoBlock({ label, value, icon: Icon }: any) {
  return (
    <div className="p-6 rounded-[2.5rem] glass-surface border dark:border-slate-800 transition-all hover:border-primary-100">
      <div className="flex items-center gap-3 mb-2">
        <Icon className="h-4 w-4 text-primary-700" />
        <span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">
          {label}
        </span>
      </div>
      <p className="text-base font-black text-slate-900 dark:text-white truncate">
        {value || "NODE_DATA_ABSENT"}
      </p>
    </div>
  );
}

function Metric({ label, value }: any) {
  return (
    <div>
      <p className="text-[9px] font-black uppercase text-primary-200 tracking-[0.4em] text-primary-200 mb-1 leading-none">
        {label}
      </p>
      <p className="text-xl md:text-3xl font-black text-white leading-none tracking-tighter truncate">
        {value}
      </p>
    </div>
  );
}
