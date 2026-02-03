"use client";

import { useState, useTransition, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Wallet,
  TrendingUp,
  AlertCircle,
  Plus,
  Search,
  ChevronRight,
  Banknote,
  Clock,
  ShieldAlert,
  X,
  Loader2,
  Send,
  Zap,
  CreditCard,
  History,
  Gift,
  RotateCcw,
  UserPlus,
  Fingerprint,
  Receipt,
  CheckCircle2,
  Download,
  Trash2,
  ArrowUpRight,
} from "lucide-react";

import {
  createManualInvoice,
  recordManualPayment,
  bulkNudgeOverdue,
  applyDiscount,
  processRefund,
  voidInvoiceNode,
  generateMonthlyInvoices,
} from "@/app/actions/admin/finance/actions";

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
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
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

export default function FinancialTerminalClient({
  initialInvoices,
  parents,
  stats,
}: any) {
  const [isPending, startTransition] = useTransition();
  const [search, setSearch] = useState("");

  // DRIVER STATES
  const [activeInv, setActiveInv] = useState<any>(null);
  const [activeModal, setActiveModal] = useState<
    "MANUAL" | "PAY" | "DISCOUNT" | "REFUND" | "BULK" | null
  >(null);

  const filtered = useMemo(
    () =>
      initialInvoices.filter((inv: any) =>
        inv.parent.user.name.toLowerCase().includes(search.toLowerCase()),
      ),
    [initialInvoices, search],
  );

  // Logic: Execute Actions
  const handleBulkGen = () => {
    const month = new Date().toLocaleString("default", {
      month: "long",
      year: "numeric",
    });
    startTransition(async () => {
      try {
        const res = await generateMonthlyInvoices(month);
        toast.success(`Deployment Successful: ${res.count} Nodes Invoiced`);
        setActiveModal(null);
      } catch (e: any) {
        toast.error(e.message);
      }
    });
  };

  const handleManualInvoice = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const d = Object.fromEntries(new FormData(e.currentTarget));
    startTransition(async () => {
      try {
        await createManualInvoice(d);
        toast.success("Fee Node Injected Successfully");
        setActiveModal(null);
      } catch (e: any) {
        toast.error(e.message);
      }
    });
  };

  const handlePayment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const d = Object.fromEntries(new FormData(e.currentTarget));
    startTransition(async () => {
      try {
        await recordManualPayment({ ...d, invoiceId: activeInv.id });
        toast.success("Disbursement Reconciled");
        setActiveModal(null);
        setActiveInv(null);
      } catch (e: any) {
        toast.error(e.message);
      }
    });
  };

  return (
    <div className="max-w-[1700px] mx-auto space-y-6 md:space-y-12 pb-40 px-2 md:px-10">
      {/* --- ELITE ANALYTICS (Horizontal Swipe Mobile) --- */}
      <div className="flex md:grid md:grid-cols-3 gap-4 overflow-x-auto no-scrollbar pb-4 md:pb-0">
        <SummaryCard
          label="Gross Realized"
          value={`$${stats.revenue}`}
          icon={TrendingUp}
          color="emerald"
          trend="Real-time Revenue"
        />
        <SummaryCard
          label="Active Leakage"
          value={`$${stats.pending}`}
          icon={AlertCircle}
          color="rose"
          trend="Outstanding Dues"
        />
        <SummaryCard
          label="Recovery Rate"
          value={`${stats.rate}%`}
          icon={Zap}
          color="purple"
          trend="Institutional Efficiency"
        />
      </div>

      {/* --- COMMAND CENTER HEADER --- */}
      <header className="flex flex-col gap-8">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div className="space-y-2">
            <Badge className="bg-primary-700/10 text-primary-700 dark:text-primary-300 border-0 font-black text-[10px] uppercase tracking-widest px-4 py-1 rounded-full">
              Financial Orchestrator v2.6
            </Badge>
            <h1 className="text-6xl md:text-9xl font-black tracking-tighter leading-none text-slate-900 dark:text-white">
              Revenue <span className="text-primary-700">Node</span>
            </h1>
          </div>
          <div className="flex flex-wrap gap-2 w-full lg:w-auto">
            <Button
              onClick={() => setActiveModal("BULK")}
              variant="outline"
              className="flex-1 md:flex-none h-14 md:h-16 rounded-2xl border-2 border-slate-200 dark:border-slate-800 font-black uppercase text-[10px] tracking-widest"
            >
              <History className="mr-2 h-4 w-4" /> Bulk Protocol
            </Button>
            <Button
              onClick={() => setActiveModal("MANUAL")}
              className="flex-1 md:flex-none h-14 md:h-16 rounded-2xl bg-primary-700 text-white font-black uppercase text-[10px] tracking-widest shadow-royal active:scale-95 transition-all"
            >
              <Plus className="mr-2 h-4 w-4" /> Manual Entry
            </Button>
          </div>
        </div>

        <div className="relative group">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-primary-700" />
          <input
            placeholder="Deep search financial registry..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-16 md:h-20 pl-16 glass-surface rounded-[1.5rem] md:rounded-[2.5rem] border-0 focus:ring-4 ring-primary-700/10 font-bold dark:bg-slate-900"
          />
        </div>
      </header>

      {/* --- INVOICE GRID --- */}
      <motion.div
        variants={kContainer}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((inv: any) => (
            <motion.div
              key={inv.id}
              layout
              variants={kItem}
              onClick={() => setActiveInv(inv)}
              className="institutional-card glass-surface p-6 md:p-10 cursor-pointer group hover:border-primary-700 transition-all dark:bg-slate-900/40 min-h-[350px] flex flex-col justify-between"
            >
              <div className="space-y-6">
                <div className="flex justify-between items-start">
                  <div
                    className={`p-4 rounded-2xl ${inv.status === "COMPLETED" ? "bg-emerald-500/10 text-emerald-600 shadow-emerald-500/10" : "bg-rose-500/10 text-rose-600 shadow-rose-500/10"} shadow-xl`}
                  >
                    <Banknote className="h-6 w-6" />
                  </div>
                  <Badge
                    className={`px-4 py-1.5 rounded-full font-black text-[9px] uppercase tracking-widest border-0 ${
                      inv.status === "COMPLETED"
                        ? "bg-emerald-500 text-white"
                        : "bg-amber-500 text-white"
                    }`}
                  >
                    {inv.status}
                  </Badge>
                </div>
                <div>
                  <p className="text-[10px] font-black text-primary-700 uppercase tracking-widest mb-1">
                    {inv.month}
                  </p>
                  <h3 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tight leading-none truncate">
                    {inv.parent.user.name}
                  </h3>
                  <div className="flex items-center gap-3 mt-4">
                    <Avatar className="h-6 w-6 border-2 border-white dark:border-slate-800">
                      <AvatarImage src={inv.parent.user.image} />
                    </Avatar>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
                      Hash: {inv.id.slice(-6)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-8 border-t border-slate-100 dark:border-slate-800 flex justify-between items-end">
                <div>
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">
                    Fee Amount
                  </p>
                  <p className="text-4xl font-black text-slate-900 dark:text-white leading-none tracking-tighter">
                    ${inv.amount}
                  </p>
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

      {/* --- INVOICE DEEP-DIVE DRAWER --- */}
      <Sheet open={!!activeInv} onOpenChange={() => setActiveInv(null)}>
        <SheetContent
          side="right"
          className="w-full sm:max-w-3xl lg:max-w-4xl dark:bg-slate-950 border-0 p-0 overflow-y-auto no-scrollbar shadow-2xl"
        >
          <SheetHeader className="sr-only">
            <SheetTitle>Invoice Deep-Dive</SheetTitle>
            <SheetDescription>
              Identity: {activeInv?.parent.user.name}
            </SheetDescription>
          </SheetHeader>

          <div className="p-10 md:p-16 bg-slate-900 text-white relative overflow-hidden min-h-[350px] md:min-h-[450px] flex flex-col justify-end">
            <div className="absolute top-0 right-0 p-12 opacity-10 rotate-12 scale-75 md:scale-125">
              <CreditCard size={300} />
            </div>
            <div className="relative z-10 space-y-6">
              <Badge className="bg-primary-700 px-5 py-2 rounded-full text-[10px] uppercase font-black tracking-widest">
                Financial Payload
              </Badge>
              <h2 className="text-5xl md:text-8xl font-black tracking-tighter leading-none">
                {activeInv?.parent.user.name}
              </h2>
              <div className="flex flex-wrap gap-8 pt-6 border-t border-white/10">
                <MetricBlock
                  label="Current Dues"
                  value={`$${activeInv?.amount}`}
                />
                <MetricBlock
                  label="Threshold"
                  value={new Date(activeInv?.dueDate).toLocaleDateString()}
                />
                <MetricBlock label="Status" value={activeInv?.status} />
              </div>
            </div>
          </div>

          <div className="p-8 md:p-16 space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activeInv?.status !== "COMPLETED" && (
                <>
                  <Button
                    onClick={() => setActiveModal("PAY")}
                    className="h-20 rounded-[2rem] bg-emerald-600 text-white font-black uppercase text-xs shadow-xl active:scale-95"
                  >
                    <Banknote className="mr-3 h-6 w-6" /> Record Disbursement
                  </Button>
                  <Button
                    onClick={() =>
                      nudgeInvoice(activeInv.id).then(() =>
                        toast.success("Nudge Protocol Dispatched"),
                      )
                    }
                    variant="outline"
                    className="h-20 rounded-[2rem] border-primary-700/20 text-primary-700 font-black uppercase text-xs"
                  >
                    <Send className="mr-3 h-6 w-6" /> Dispatch Nudge
                  </Button>
                </>
              )}
              {activeInv?.status === "COMPLETED" && (
                <Button
                  onClick={() => setActiveModal("REFUND")}
                  variant="outline"
                  className="h-20 rounded-[2rem] border-rose-100 text-rose-500 font-black uppercase text-xs col-span-full"
                >
                  <RotateCcw className="mr-3 h-6 w-6" /> Initiate Refund
                  Protocol
                </Button>
              )}
            </div>

            {/* Action Island */}
            <div className="p-8 bg-slate-50 dark:bg-slate-900 rounded-[3rem] space-y-8">
              <div className="flex justify-between items-center">
                <h4 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400">
                  Node Management
                </h4>
                <Fingerprint className="h-5 w-5 text-slate-300" />
              </div>
              <div className="grid gap-3">
                <Button
                  onClick={() => setActiveModal("DISCOUNT")}
                  variant="ghost"
                  className="h-16 rounded-2xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-black uppercase text-[10px] tracking-widest justify-between px-8"
                >
                  <div className="flex items-center gap-3">
                    <Gift className="h-4 w-4 text-primary-700" /> Apply
                    Scholarship / Credit
                  </div>
                  <ChevronRight className="h-4 w-4 opacity-30" />
                </Button>
                <Button
                  variant="ghost"
                  onClick={() =>
                    voidInvoiceNode(activeInv.id).then(() =>
                      toast.warning("Invoice Voided"),
                    )
                  }
                  className="h-16 rounded-2xl text-rose-500 font-black uppercase text-[10px] tracking-widest justify-between px-8"
                >
                  <div className="flex items-center gap-3">
                    <Trash2 className="h-4 w-4" /> Permanent Void
                  </div>
                </Button>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* --- MANUAL ENTRY DIALOG (FIXED & COMPREHENSIVE) --- */}
      <Dialog
        open={activeModal === "MANUAL"}
        onOpenChange={() => setActiveModal(null)}
      >
        <DialogContent className="max-w-2xl w-full h-[100dvh] md:h-auto md:max-h-[90vh] rounded-none md:rounded-[4rem] p-8 md:p-16 dark:bg-slate-950 border-0 shadow-royal overflow-y-auto no-scrollbar">
          <DialogHeader className="mb-10 text-left">
            <DialogTitle className="text-4xl md:text-6xl font-black tracking-tighter leading-none">
              Invoice <span className="text-primary-700">Injection</span>
            </DialogTitle>
            <DialogDescription className="font-bold text-slate-400 uppercase text-[10px] tracking-widest pt-2">
              Administrative Billing Override
            </DialogDescription>
          </DialogHeader>

          <form
            onSubmit={handleManualInvoice}
            className="space-y-6 md:space-y-10"
          >
            <div className="space-y-3">
              <Label className="text-[10px] font-black uppercase text-slate-400 ml-6">
                Target Academic Parent
              </Label>
              <Select name="parentId" required>
                <SelectTrigger className="h-16 md:h-20 rounded-[1.5rem] md:rounded-[2.5rem] bg-slate-100 dark:bg-slate-900 border-0 font-bold px-8 text-lg">
                  <SelectValue placeholder="Identify Recipient Node..." />
                </SelectTrigger>
                <SelectContent className="rounded-3xl border-0 shadow-2xl">
                  {parents.map((p: any) => (
                    <SelectItem
                      key={p.id}
                      value={p.id}
                      className="py-4 font-bold border-b last:border-0"
                    >
                      {p.user.name} ({p.user.email})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <Label className="text-[10px] font-black uppercase text-slate-400 ml-6">
                  Fee Payload ($)
                </Label>
                <Input
                  name="amount"
                  type="number"
                  step="0.01"
                  required
                  className="h-16 md:h-20 rounded-[1.5rem] md:rounded-[2.5rem] glass-surface border-0 px-8 font-black text-3xl text-primary-700"
                  placeholder="0.00"
                />
              </div>
              <div className="space-y-3">
                <Label className="text-[10px] font-black uppercase text-slate-400 ml-6">
                  Billing Cycle
                </Label>
                <Input
                  name="month"
                  defaultValue={new Date().toLocaleString("default", {
                    month: "long",
                    year: "numeric",
                  })}
                  className="h-16 md:h-20 rounded-[1.5rem] md:rounded-[2.5rem] glass-surface border-0 px-8 font-bold"
                />
              </div>
            </div>

            <div className="space-y-3">
              <Label className="text-[10px] font-black uppercase text-slate-400 ml-6">
                Final Synchronization Deadline
              </Label>
              <Input
                name="dueDate"
                type="date"
                required
                className="h-16 md:h-20 rounded-[1.5rem] md:rounded-[2.5rem] glass-surface border-0 px-8 font-bold uppercase text-sm"
              />
            </div>

            <Button
              type="submit"
              disabled={isPending}
              className="w-full h-20 md:h-28 rounded-[2.5rem] md:rounded-[4rem] bg-primary-700 text-white font-black text-xl shadow-royal transition-all active:scale-95 group"
            >
              {isPending ? (
                <Loader2 className="animate-spin" />
              ) : (
                <span className="flex items-center gap-3">
                  INITIALIZE DEPLOYMENT{" "}
                  <ArrowUpRight className="h-6 w-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </span>
              )}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* --- PAYMENT DIALOG --- */}
      <Dialog
        open={activeModal === "PAY"}
        onOpenChange={() => setActiveModal(null)}
      >
        <DialogContent className="max-w-xl rounded-[3.5rem] p-12 dark:bg-slate-950 border-0 shadow-royal">
          <DialogHeader className="mb-8">
            <DialogTitle className="text-4xl font-black tracking-tighter">
              Record <span className="text-emerald-500">Disbursement</span>
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handlePayment} className="space-y-6">
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase text-slate-400 ml-6">
                Collected Amount ($)
              </Label>
              <Input
                name="amount"
                type="number"
                step="0.01"
                defaultValue={activeInv?.amount}
                required
                className="h-20 rounded-2xl glass-surface border-0 font-black text-5xl px-8 text-emerald-600"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase text-slate-400 ml-6">
                Handover Method
              </Label>
              <Select name="method" defaultValue="CASH">
                <SelectTrigger className="h-16 rounded-2xl bg-slate-100 dark:bg-slate-900 border-0 font-bold px-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-2xl">
                  <SelectItem value="CASH" className="py-4 font-bold">
                    CASH Handover
                  </SelectItem>
                  <SelectItem value="BANK_TRANSFER" className="py-4 font-bold">
                    BANK Wire Node
                  </SelectItem>
                  <SelectItem value="CHECK" className="py-4 font-bold">
                    Institutional CHECK
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button
              type="submit"
              disabled={isPending}
              className="w-full h-20 rounded-3xl bg-emerald-600 text-white font-black text-lg shadow-xl shadow-emerald-600/20 active:scale-95 transition-all"
            >
              {isPending ? (
                <Loader2 className="animate-spin" />
              ) : (
                "COMMIT DISBURSEMENT"
              )}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* --- BULK RUN DIALOG --- */}
      <Dialog
        open={activeModal === "BULK"}
        onOpenChange={() => setActiveModal(null)}
      >
        <DialogContent className="max-w-md rounded-[3rem] p-12 dark:bg-slate-950 border-0">
          <DialogHeader className="text-center mb-10">
            <Zap className="h-16 w-16 text-primary-700 mx-auto mb-6 animate-pulse" />
            <DialogTitle className="text-4xl font-black tracking-tighter">
              Bulk Generation
            </DialogTitle>
            <DialogDescription className="font-bold text-slate-400 uppercase text-[9px] tracking-widest pt-2">
              Subscription Synchronization
            </DialogDescription>
          </DialogHeader>
          <p className="text-center text-sm font-medium text-slate-500 mb-10 px-4">
            Identify all active student nodes and deploy individual monthly
            invoices based on their plan weightage.
          </p>
          <Button
            onClick={handleBulkGen}
            disabled={isPending}
            className="w-full h-20 rounded-3xl bg-primary-700 text-white font-black text-xl shadow-royal active:scale-95 transition-all"
          >
            {isPending ? (
              <Loader2 className="animate-spin" />
            ) : (
              "EXECUTE REVENUE RUN"
            )}
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// --- SUB-COMPONENTS ---

function SummaryCard({
  label,
  value,
  icon: Icon,
  color,
  trend,
  className,
}: any) {
  const themes: any = {
    emerald:
      "bg-emerald-500/5 text-emerald-600 border-emerald-500/20 shadow-emerald-500/5",
    rose: "bg-rose-500/5 text-rose-600 border-rose-500/20 shadow-rose-500/5",
    purple:
      "bg-primary-700/5 text-primary-700 border-primary-700/20 shadow-primary-700/5",
  };
  return (
    <div
      className={`p-8 rounded-[3rem] border ${themes[color]} glass-surface shrink-0 min-w-[280px] md:min-w-0 transition-all hover:-translate-y-1 shadow-2xl relative overflow-hidden group ${className}`}
    >
      <Icon className="absolute -right-4 -bottom-4 h-24 w-24 opacity-[0.03] group-hover:rotate-12 group-hover:scale-125 transition-transform duration-700" />
      <div className="flex justify-between items-start mb-8 relative z-10">
        <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 shadow-sm">
          <Icon className="h-6 w-6" />
        </div>
        <p className="text-[9px] font-black uppercase text-slate-400 tracking-widest opacity-60 bg-white/40 dark:bg-slate-800/40 px-3 py-1 rounded-full">
          {trend}
        </p>
      </div>
      <p className="text-[10px] font-black uppercase tracking-[0.4em] mb-1 opacity-50 relative z-10">
        {label}
      </p>
      <h4 className="text-5xl font-black text-slate-900 dark:text-white tracking-tighter leading-none relative z-10">
        {value}
      </h4>
    </div>
  );
}

function MetricBlock({ label, value }: any) {
  return (
    <div>
      <p className="text-[9px] font-black uppercase tracking-[0.4em] text-slate-500 mb-1.5">
        {label}
      </p>
      <p className="text-2xl md:text-4xl font-black text-white leading-none tracking-tight">
        {value}
      </p>
    </div>
  );
}
