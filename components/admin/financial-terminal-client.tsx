"use client";

import { useState, useTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  TrendingUp,
  AlertCircle,
  Plus,
  Search,
  FileText,
  ChevronRight,
  Banknote,
  Loader2,
  Send,
  Zap,
  CreditCard,
  History,
} from "lucide-react";

import {
  generateMonthlyInvoices,
  recordManualPayment,
  nudgeInvoice,
  voidInvoiceNode,
} from "@/app/actions/admin/finance/actions";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
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

// --- ANIMATION ENGINE ---
const kContainer = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } },
};
const kItem = { hidden: { y: 20, opacity: 0 }, show: { y: 0, opacity: 1 } };

export default function FinancialTerminalClient({
  initialInvoices,
  stats,
}: any) {
  const [isPending, startTransition] = useTransition();
  const [search, setSearch] = useState("");
  const [activeInvoice, setActiveInvoice] = useState<any>(null);
  const [isGenModalOpen, setIsGenModalOpen] = useState(false);
  const [isPayModalOpen, setIsPayModalOpen] = useState(false);

  const filtered = initialInvoices.filter(
    (inv: any) =>
      inv.parent.user.name.toLowerCase().includes(search.toLowerCase()) ||
      inv.month.toLowerCase().includes(search.toLowerCase()),
  );

  const handleBulkGenerate = () => {
    const month = new Date().toLocaleString("default", {
      month: "long",
      year: "numeric",
    });
    startTransition(async () => {
      try {
        const res = await generateMonthlyInvoices(month);
        toast.success(`Protocol Success: ${res.count} Invoices Generated`);
        setIsGenModalOpen(false);
      } catch (e: any) {
        toast.error(e.message);
      }
    });
  };

  return (
    <div className="max-w-[1700px] mx-auto space-y-6 md:space-y-12 pb-40 px-4 md:px-10 mt-4 md:mt-10">
      {/* --- ELITE REVENUE RADAR --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
        <RevenueCard
          label="Gross Revenue"
          value={`$${stats.revenue}`}
          icon={TrendingUp}
          color="emerald"
          trend="+14% Delta"
        />
        <RevenueCard
          label="Total Leakage"
          value={`$${stats.pending}`}
          icon={AlertCircle}
          color="rose"
          trend="Action Required"
        />
        <RevenueCard
          label="Collection Rate"
          value={`${stats.rate}%`}
          icon={Zap}
          color="purple"
          trend="Institutional Health"
        />
      </div>

      {/* --- COMMAND BAR --- */}
      <header className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-slate-900 dark:text-white leading-none">
            Revenue <span className="text-primary-700">Terminal</span>
          </h1>
          <div className="flex gap-3 w-full md:w-auto">
            <Button
              onClick={() => setIsGenModalOpen(true)}
              variant="outline"
              className="h-16 px-8 rounded-2xl border-2 font-black uppercase text-[10px] tracking-widest"
            >
              <History className="mr-2 h-4 w-4" /> Bulk Run
            </Button>
            <Button className="h-16 px-10 rounded-2xl bg-primary-700 text-white font-black uppercase text-xs tracking-widest shadow-royal hover:scale-105 transition-all">
              <Plus className="mr-2 h-5 w-5" /> Manual Entry
            </Button>
          </div>
        </div>

        <div className="relative group">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-primary-700 transition-colors" />
          <input
            placeholder="Deep search financial records (Parent name, month)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-16 md:h-20 pl-16 glass-surface rounded-[1.5rem] md:rounded-[2.5rem] outline-none border-0 focus:ring-4 ring-primary-700/10 font-bold dark:bg-slate-900"
          />
        </div>
      </header>

      {/* --- INVOICE FEED --- */}
      <motion.div
        variants={kContainer}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((inv: any) => (
            <motion.div
              key={inv.id}
              layout
              variants={kItem}
              onClick={() => setActiveInvoice(inv)}
              className="institutional-card glass-surface p-8 cursor-pointer group hover:border-primary-700 transition-all dark:bg-slate-900/40 flex flex-col justify-between min-h-[350px] relative overflow-hidden"
            >
              <div className="space-y-6 relative z-10">
                <div className="flex justify-between items-start">
                  <div
                    className={`p-4 rounded-2xl ${inv.status === "COMPLETED" ? "bg-emerald-500/10 text-emerald-600" : "bg-rose-500/10 text-rose-600"}`}
                  >
                    <Banknote className="h-6 w-6" />
                  </div>
                  <Badge
                    className={`border-0 font-black text-[9px] uppercase tracking-widest px-4 py-1.5 rounded-full ${
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
                  <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight leading-none truncate">
                    {inv.parent.user.name}
                  </h3>
                  <div className="flex items-center gap-2 mt-4">
                    <Avatar className="h-6 w-6 border border-white">
                      <AvatarImage src={inv.parent.user.image} />
                    </Avatar>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      ID: {inv.parent.id.slice(-6)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-8 border-t border-slate-100 dark:border-slate-800 flex justify-between items-end relative z-10">
                <div>
                  <p className="text-[9px] font-black text-slate-400 uppercase mb-1">
                    Fee Payload
                  </p>
                  <p className="text-3xl font-black text-slate-900 dark:text-white">
                    ${inv.amount}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full bg-slate-50 dark:bg-slate-800 h-12 w-12"
                >
                  <ChevronRight />
                </Button>
              </div>

              <div className="absolute -right-6 -bottom-6 opacity-[0.03] group-hover:scale-110 transition-transform">
                <FileText className="h-48 w-48" />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* --- INVOICE DEEP-DIVE (DRAWER) --- */}
      <Sheet open={!!activeInvoice} onOpenChange={() => setActiveInvoice(null)}>
        <SheetContent
          side="right"
          className="w-full sm:max-w-3xl lg:max-w-4xl dark:bg-slate-950 border-0 p-0 overflow-y-auto no-scrollbar shadow-2xl"
        >
          <SheetHeader className="sr-only">
            <SheetTitle>Invoice Deep-Dive</SheetTitle>
            <SheetDescription>
              Financial synchronization for {activeInvoice?.parent.user.name}
            </SheetDescription>
          </SheetHeader>

          <div className="p-10 md:p-16 bg-slate-900 text-white relative overflow-hidden min-h-[350px] flex flex-col justify-end">
            <div className="absolute top-0 right-0 p-12 opacity-10 rotate-12">
              <CreditCard className="h-80 w-80" />
            </div>
            <div className="relative z-10 space-y-4">
              <Badge className="bg-primary-700 border-0 font-black px-4 py-1 rounded-full uppercase text-[9px]">
                Invoice Payload
              </Badge>
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-none">
                {activeInvoice?.parent.user.name}
              </h2>
              <div className="flex gap-8 pt-6">
                <Metric
                  label="Due Date"
                  value={new Date(activeInvoice?.dueDate).toLocaleDateString()}
                />
                <Metric label="Month" value={activeInvoice?.month} />
                <Metric label="Status" value={activeInvoice?.status} />
              </div>
            </div>
          </div>

          <div className="p-8 md:p-16 space-y-12">
            <div className="institutional-card glass-surface p-10 flex flex-col md:flex-row justify-between items-center gap-8 border-primary-700/20">
              <div className="space-y-2 text-center md:text-left">
                <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">
                  Outstanding Balance
                </p>
                <p className="text-6xl font-black text-slate-900 dark:text-white leading-none tracking-tighter">
                  ${activeInvoice?.amount}
                </p>
              </div>
              <div className="flex flex-col gap-3 w-full md:w-auto">
                {activeInvoice?.status !== "COMPLETED" && (
                  <>
                    <Button
                      onClick={() => setIsPayModalOpen(true)}
                      className="h-16 px-10 rounded-2xl bg-emerald-600 text-white font-black uppercase text-xs shadow-xl shadow-emerald-600/20"
                    >
                      <Banknote className="mr-2 h-5 w-5" /> Record Payment
                    </Button>
                    <Button
                      onClick={() => nudgeInvoice(activeInvoice.id)}
                      variant="outline"
                      className="h-16 px-10 rounded-2xl font-black uppercase text-xs border-slate-200"
                    >
                      <Send className="mr-2 h-4 w-4" /> Broadcast Nudge
                    </Button>
                  </>
                )}
                <Button
                  variant="ghost"
                  className="h-16 text-rose-500 font-black uppercase text-xs"
                  onClick={() => voidInvoiceNode(activeInvoice.id)}
                >
                  Void Invoice
                </Button>
              </div>
            </div>

            <div className="space-y-6">
              <h4 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400">
                Student Nodes Linked
              </h4>
              {/* Mock student list linked to parent */}
              <div className="p-6 rounded-[2.5rem] bg-slate-50 dark:bg-slate-900 border flex items-center gap-4">
                <Avatar>
                  <AvatarImage src="" />
                </Avatar>
                <div>
                  <p className="font-black text-slate-900 dark:text-white leading-none">
                    Identity synchronization active.
                  </p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase mt-1">
                    Fetching student hierarchy...
                  </p>
                </div>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* --- PAYMENT MODAL --- */}
      <Dialog open={isPayModalOpen} onOpenChange={setIsPayModalOpen}>
        <DialogContent className="max-w-xl rounded-[3.5rem] p-12 md:p-16 dark:bg-slate-950 border-0 shadow-royal overflow-y-auto no-scrollbar">
          <DialogHeader className="mb-10 text-left">
            <DialogTitle className="text-4xl font-black tracking-tighter leading-none">
              Record <span className="text-primary-700">Payment</span>
            </DialogTitle>
            <DialogDescription className="font-bold text-slate-400 uppercase text-[10px] tracking-widest pt-2">
              Manual Disbursement Protocol
            </DialogDescription>
          </DialogHeader>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const d = Object.fromEntries(new FormData(e.currentTarget));
              startTransition(async () => {
                try {
                  await recordManualPayment({
                    ...d,
                    invoiceId: activeInvoice.id,
                  });
                  setIsPayModalOpen(false);
                  setActiveInvoice(null);
                  toast.success("Payment Synchronized Successfully");
                } catch (err: any) {
                  toast.error(err.message);
                }
              });
            }}
            className="space-y-6"
          >
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase text-slate-400 ml-6">
                Amount Collected ($)
              </Label>
              <Input
                name="amount"
                type="number"
                step="0.01"
                defaultValue={activeInvoice?.amount}
                required
                className="h-20 rounded-[1.5rem] glass-surface border-0 font-black text-5xl px-8 text-primary-700"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase text-slate-400 ml-6">
                Payment Method
              </Label>
              <Select name="method" defaultValue="CASH">
                <SelectTrigger className="h-16 rounded-[1.5rem] bg-slate-100 dark:bg-slate-900 border-0 font-bold px-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-2xl border-0 shadow-2xl">
                  <SelectItem value="CASH" className="py-4 font-bold">
                    CASH on delivery
                  </SelectItem>
                  <SelectItem value="BANK_TRANSFER" className="py-4 font-bold">
                    BANK Wire Transfer
                  </SelectItem>
                  <SelectItem value="CHECK" className="py-4 font-bold">
                    Institutional CHECK
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase text-slate-400 ml-6">
                Internal Note
              </Label>
              <Input
                name="description"
                className="h-16 rounded-[1.5rem] glass-surface px-8 font-bold"
                placeholder="Reference number or details..."
              />
            </div>
            <Button
              type="submit"
              disabled={isPending}
              className="w-full h-24 rounded-[3.5rem] bg-primary-700 text-white font-black text-xl shadow-royal transition-all hover:scale-[1.02] active:scale-95"
            >
              {isPending ? (
                <Loader2 className="animate-spin" />
              ) : (
                "COMMIT PAYMENT"
              )}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* --- BULK GENERATE MODAL --- */}
      <Dialog open={isGenModalOpen} onOpenChange={setIsGenModalOpen}>
        <DialogContent className="max-w-md rounded-[3rem] p-12 dark:bg-slate-950 border-0 shadow-royal">
          <DialogHeader className="mb-10 text-center">
            <Zap className="h-16 w-16 text-primary-700 mx-auto mb-6 animate-pulse" />
            <DialogTitle className="text-4xl font-black tracking-tighter leading-none">
              Bulk Generation
            </DialogTitle>
            <DialogDescription className="font-bold text-slate-400 uppercase text-[10px] tracking-widest pt-2">
              Automated Billing Protocol
            </DialogDescription>
          </DialogHeader>
          <p className="text-center text-sm font-medium text-slate-500 mb-10">
            This will scan all{" "}
            <span className="text-primary-700 font-bold">
              Active Subscriptions
            </span>{" "}
            and deploy invoices for the current month. This process is
            irreversible.
          </p>
          <Button
            onClick={handleBulkGenerate}
            disabled={isPending}
            className="w-full h-20 rounded-[2rem] bg-primary-700 text-white font-black text-lg shadow-xl active:scale-95 transition-all"
          >
            {isPending ? (
              <Loader2 className="animate-spin" />
            ) : (
              "EXECUTE BILLING RUN"
            )}
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// --- SUB-COMPONENTS ---

function RevenueCard({ label, value, icon: Icon, color, trend }: any) {
  const themes: any = {
    emerald: "bg-emerald-500/5 text-emerald-600 border-emerald-500/20",
    rose: "bg-rose-500/5 text-rose-600 border-rose-500/20",
    purple: "bg-primary-700/5 text-primary-700 border-primary-700/20",
  };
  return (
    <div
      className={`p-8 rounded-[3rem] border ${themes[color]} glass-surface relative overflow-hidden group transition-all hover:-translate-y-1`}
    >
      <div className="flex justify-between items-start mb-6">
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 shadow-sm">
          <Icon className="h-6 w-6" />
        </div>
        <p className="text-[10px] font-black uppercase text-slate-400 tracking-tighter">
          {trend}
        </p>
      </div>
      <p className="text-[10px] font-black uppercase text-slate-400 tracking-[0.4em] mb-1 opacity-60">
        {label}
      </p>
      <h4 className="text-5xl font-black text-slate-900 dark:text-white tracking-tighter leading-none">
        {value}
      </h4>
    </div>
  );
}

function Metric({ label, value }: any) {
  return (
    <div>
      <p className="text-[8px] font-black uppercase tracking-[0.4em] text-slate-500 mb-1">
        {label}
      </p>
      <p className="text-2xl font-black text-white leading-none tracking-tight">
        {value}
      </p>
    </div>
  );
}
