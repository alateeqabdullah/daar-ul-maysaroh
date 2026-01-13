"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Plus,
  MoreVertical,
  Download,
  Loader2,
  X,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Wallet,
  CreditCard,
  User,
  Building,
  Receipt,
  Clock,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { getInitials } from "@/lib/utils";
import { Counter } from "@/components/admin/dashboard-ui";
import { AreaChart, Area, Tooltip, ResponsiveContainer } from "recharts";

// --- ANIMATION ---
const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } },
};
const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1 },
};

interface Props {
  initialPayments: any[];
  initialDonations: any[];
  initialExpenses: any[];
  initialPayrolls: any[];
  parents: any[];
  teachers: any[];
  stats: any;
  pagination: any;
}

export default function FinancialManagementClient({
  initialPayments,
  initialDonations,
  initialExpenses,
  initialPayrolls,
  parents = [],
  teachers = [],
  stats,
  pagination,
}: Props) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("invoices");

  // Data States
  const [payments, setPayments] = useState(initialPayments);
  const [donations, setDonations] = useState(initialDonations);
  const [expenses, setExpenses] = useState(initialExpenses);
  const [payrolls, setPayrolls] = useState(initialPayrolls);
  const [isLoading, setIsLoading] = useState(false);

  // Modals
  const [isInvoiceOpen, setIsInvoiceOpen] = useState(false);
  const [isDonationOpen, setIsDonationOpen] = useState(false);
  const [isExpenseOpen, setIsExpenseOpen] = useState(false);
  const [isPayrollOpen, setIsPayrollOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<any>(null);

  // Generic Form Data
  const [formData, setFormData] = useState<any>({});

  // Chart Data (Mock)
  const chartData = [
    { name: "M", v: 400 },
    { name: "T", v: 300 },
    { name: "W", v: 550 },
    { name: "T", v: 450 },
    { name: "F", v: 600 },
    { name: "S", v: 800 },
    { name: "S", v: 200 },
  ];

  // --- ACTIONS ---

  const handleAction = async (
    action: string,
    endpointData: any,
    callback: Function
  ) => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/admin/payments/manage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action, data: endpointData }),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error);

      callback(result);
      toast.success("Saved successfully");
      setFormData({});
    } catch (error: any) {
      toast.error(error.message || "Failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusChange = async (paymentId: string, status: string) => {
    setPayments((prev) =>
      prev.map((p) => (p.id === paymentId ? { ...p, status } : p))
    );
    if (selectedPayment?.id === paymentId)
      setSelectedPayment((prev) => ({ ...prev, status }));

    try {
      const res = await fetch("/api/admin/payments/manage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "UPDATE_STATUS",
          paymentId,
          data: { status },
        }),
      });
      if (!res.ok) throw new Error();
      toast.success("Status updated");
    } catch {
      toast.error("Update failed");
      router.refresh();
    }
  };

  // --- HELPERS ---
  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return "text-emerald-600 bg-emerald-50 border-emerald-200";
      case "PENDING":
        return "text-amber-600 bg-amber-50 border-amber-200";
      case "FAILED":
        return "text-rose-600 bg-rose-50 border-rose-200";
      default:
        return "text-slate-600 bg-slate-50 border-slate-200";
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-8 pb-10"
    >
      {/* HEADER */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Finance OS
          </h1>
          <p className="text-muted-foreground mt-1">
            Full financial oversight for your institution
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" /> Report
          </Button>
          {activeTab === "invoices" && (
            <Button
              className="bg-emerald-600 hover:bg-emerald-700"
              onClick={() => setIsInvoiceOpen(true)}
            >
              <Plus className="mr-2 h-4 w-4" /> Invoice
            </Button>
          )}
          {activeTab === "donations" && (
            <Button
              className="bg-blue-600 hover:bg-blue-700"
              onClick={() => setIsDonationOpen(true)}
            >
              <Plus className="mr-2 h-4 w-4" /> Donation
            </Button>
          )}
          {activeTab === "expenses" && (
            <Button
              className="bg-rose-600 hover:bg-rose-700"
              onClick={() => setIsExpenseOpen(true)}
            >
              <Plus className="mr-2 h-4 w-4" /> Expense
            </Button>
          )}
          {activeTab === "payroll" && (
            <Button
              className="bg-amber-600 hover:bg-amber-700"
              onClick={() => setIsPayrollOpen(true)}
            >
              <Plus className="mr-2 h-4 w-4" /> Run Payroll
            </Button>
          )}
        </div>
      </div>

      {/* BENTO STATS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-slate-900 text-white border-0 shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 p-6 opacity-10">
            <DollarSign className="h-24 w-24" />
          </div>
          <CardContent className="p-6 relative z-10">
            <p className="text-slate-400 text-xs font-bold uppercase">
              Net Income
            </p>
            <h3 className="text-3xl font-bold mt-2">
              {formatCurrency(stats.netIncome)}
            </h3>
            <div className="mt-4 h-16">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#fff" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#fff" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Area
                    type="monotone"
                    dataKey="v"
                    stroke="#fff"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorTotal)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-emerald-50 dark:bg-emerald-900/10 border-emerald-100">
          <CardContent className="p-6 flex justify-between items-center">
            <div>
              <p className="text-emerald-600 text-xs font-bold uppercase">
                Revenue
              </p>
              <h3 className="text-2xl font-bold text-emerald-900 dark:text-emerald-100 mt-1">
                {formatCurrency(stats.revenue)}
              </h3>
            </div>
            <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl text-emerald-600">
              <TrendingUp className="h-6 w-6" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-blue-50 dark:bg-blue-900/10 border-blue-100">
          <CardContent className="p-6 flex justify-between items-center">
            <div>
              <p className="text-blue-600 text-xs font-bold uppercase">
                Donations
              </p>
              <h3 className="text-2xl font-bold text-blue-900 dark:text-blue-100 mt-1">
                {formatCurrency(stats.donations)}
              </h3>
            </div>
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl text-blue-600">
              <Wallet className="h-6 w-6" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-rose-50 dark:bg-rose-900/10 border-rose-100">
          <CardContent className="p-6 flex justify-between items-center">
            <div>
              <p className="text-rose-600 text-xs font-bold uppercase">
                Expenses
              </p>
              <h3 className="text-2xl font-bold text-rose-900 dark:text-rose-100 mt-1">
                {formatCurrency(stats.expenses)}
              </h3>
            </div>
            <div className="p-3 bg-rose-100 dark:bg-rose-900/30 rounded-xl text-rose-600">
              <TrendingDown className="h-6 w-6" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* TABS & TABLES */}
      <Tabs
        defaultValue="invoices"
        className="w-full"
        onValueChange={setActiveTab}
      >
        <TabsList className="bg-slate-100 dark:bg-slate-800 p-1 rounded-xl w-full justify-start overflow-x-auto">
          <TabsTrigger value="invoices" className="rounded-lg">
            Invoices
          </TabsTrigger>
          <TabsTrigger value="donations" className="rounded-lg">
            Donations
          </TabsTrigger>
          <TabsTrigger value="expenses" className="rounded-lg">
            Expenses
          </TabsTrigger>
          <TabsTrigger value="payroll" className="rounded-lg">
            Payroll
          </TabsTrigger>
        </TabsList>

        <div className="mt-6">
          {/* 1. INVOICES */}
          <TabsContent value="invoices">
            <Card>
              <CardContent className="p-0">
                <table className="w-full text-sm">
                  <thead className="bg-muted/50 text-left border-b">
                    <tr>
                      <th className="p-4">User</th>
                      <th className="p-4">Amount</th>
                      <th className="p-4">Status</th>
                      <th className="p-4">Date</th>
                      <th className="p-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {payments.map((p: any) => (
                      <tr
                        key={p.id}
                        className="border-b last:border-0 hover:bg-muted/20"
                      >
                        <td className="p-4 flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={p.userImage} />
                            <AvatarFallback>
                              {getInitials(p.userName)}
                            </AvatarFallback>
                          </Avatar>{" "}
                          <div>
                            <p className="font-medium">{p.userName}</p>
                            <p className="text-xs text-muted-foreground">
                              {p.invoiceNumber}
                            </p>
                          </div>
                        </td>
                        <td className="p-4 font-bold">
                          {formatCurrency(p.amount)}
                        </td>
                        <td className="p-4">
                          <Badge
                            variant="outline"
                            className={getStatusColor(p.status)}
                          >
                            {p.status}
                          </Badge>
                        </td>
                        <td className="p-4 text-muted-foreground">
                          {new Date(p.createdAt).toLocaleDateString()}
                        </td>
                        <td className="p-4 text-right">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => setSelectedPayment(p)}
                          >
                            View
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 2. DONATIONS */}
          <TabsContent value="donations">
            <Card>
              <CardContent className="p-0">
                <table className="w-full text-sm">
                  <thead className="bg-muted/50 text-left border-b">
                    <tr>
                      <th className="p-4">Donor</th>
                      <th className="p-4">Type</th>
                      <th className="p-4">Amount</th>
                      <th className="p-4">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {donations.map((d: any) => (
                      <tr
                        key={d.id}
                        className="border-b last:border-0 hover:bg-muted/20"
                      >
                        <td className="p-4 font-medium">{d.donorName}</td>
                        <td className="p-4">
                          <Badge variant="outline">{d.type}</Badge>
                        </td>
                        <td className="p-4 font-bold text-blue-600">
                          {formatCurrency(d.amount)}
                        </td>
                        <td className="p-4 text-muted-foreground">
                          {new Date(d.date).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 3. EXPENSES */}
          <TabsContent value="expenses">
            <Card>
              <CardContent className="p-0">
                <table className="w-full text-sm">
                  <thead className="bg-muted/50 text-left border-b">
                    <tr>
                      <th className="p-4">Title</th>
                      <th className="p-4">Category</th>
                      <th className="p-4">Amount</th>
                      <th className="p-4">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {expenses.map((e: any) => (
                      <tr
                        key={e.id}
                        className="border-b last:border-0 hover:bg-muted/20"
                      >
                        <td className="p-4 font-medium">{e.title}</td>
                        <td className="p-4">
                          <Badge variant="secondary">{e.category}</Badge>
                        </td>
                        <td className="p-4 font-bold text-rose-600">
                          {formatCurrency(e.amount)}
                        </td>
                        <td className="p-4 text-muted-foreground">
                          {new Date(e.date).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 4. PAYROLL */}
          <TabsContent value="payroll">
            <Card>
              <CardContent className="p-0">
                <table className="w-full text-sm">
                  <thead className="bg-muted/50 text-left border-b">
                    <tr>
                      <th className="p-4">Teacher</th>
                      <th className="p-4">Month</th>
                      <th className="p-4">Amount</th>
                      <th className="p-4">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {payrolls.map((p: any) => (
                      <tr
                        key={p.id}
                        className="border-b last:border-0 hover:bg-muted/20"
                      >
                        <td className="p-4 flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={p.teacherImage} />
                            <AvatarFallback>T</AvatarFallback>
                          </Avatar>{" "}
                          {p.teacherName}
                        </td>
                        <td className="p-4">{p.month}</td>
                        <td className="p-4 font-bold text-amber-600">
                          {formatCurrency(p.amount)}
                        </td>
                        <td className="p-4">
                          <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                            {p.status}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </TabsContent>
        </div>
      </Tabs>

      {/* --- INVOICE MODAL --- */}
      <AnimatePresence>
        {isInvoiceOpen && (
          <ModalWrapper
            onClose={() => setIsInvoiceOpen(false)}
            title="Create Invoice"
          >
            <div className="space-y-4">
              <div className="space-y-1">
                <Label>Parent</Label>
                <Select
                  onValueChange={(v) =>
                    setFormData({ ...formData, parentId: v })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Parent" />
                  </SelectTrigger>
                  <SelectContent>
                    {parents?.map((p: any) => (
                      <SelectItem key={p.id} value={p.id}>
                        {p.name} ({p.email})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label>Amount ($)</Label>
                  <Input
                    type="number"
                    onChange={(e) =>
                      setFormData({ ...formData, amount: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-1">
                  <Label>Due Date</Label>
                  <Input
                    type="date"
                    onChange={(e) =>
                      setFormData({ ...formData, dueDate: e.target.value })
                    }
                  />
                </div>
              </div>
              <Button
                className="w-full bg-emerald-600"
                onClick={() =>
                  handleAction("CREATE_INVOICE", formData, (res: any) => {
                    setPayments([res.payment, ...payments]);
                    setIsInvoiceOpen(false);
                  })
                }
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  "Generate Invoice"
                )}
              </Button>
            </div>
          </ModalWrapper>
        )}
      </AnimatePresence>

      {/* --- DONATION MODAL --- */}
      <AnimatePresence>
        {isDonationOpen && (
          <ModalWrapper
            onClose={() => setIsDonationOpen(false)}
            title="Record Donation"
          >
            <div className="space-y-4">
              <div className="space-y-1">
                <Label>Donor Name</Label>
                <Input
                  onChange={(e) =>
                    setFormData({ ...formData, donorName: e.target.value })
                  }
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label>Amount</Label>
                  <Input
                    type="number"
                    onChange={(e) =>
                      setFormData({ ...formData, amount: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-1">
                  <Label>Type</Label>
                  <Select
                    onValueChange={(v) => setFormData({ ...formData, type: v })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="SADAQAH">Sadaqah</SelectItem>
                      <SelectItem value="ZAKAT">Zakat</SelectItem>
                      <SelectItem value="BUILDING_FUND">
                        Building Fund
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button
                className="w-full bg-blue-600"
                onClick={() =>
                  handleAction("CREATE_DONATION", formData, (res: any) => {
                    setDonations([res.donation, ...donations]);
                    setIsDonationOpen(false);
                  })
                }
                disabled={isLoading}
              >
                Save Donation
              </Button>
            </div>
          </ModalWrapper>
        )}
      </AnimatePresence>

      {/* --- EXPENSE MODAL --- */}
      <AnimatePresence>
        {isExpenseOpen && (
          <ModalWrapper
            onClose={() => setIsExpenseOpen(false)}
            title="Add Expense"
          >
            <div className="space-y-4">
              <div className="space-y-1">
                <Label>Title</Label>
                <Input
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label>Amount</Label>
                  <Input
                    type="number"
                    onChange={(e) =>
                      setFormData({ ...formData, amount: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-1">
                  <Label>Category</Label>
                  <Select
                    onValueChange={(v) =>
                      setFormData({ ...formData, category: v })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="RENT">Rent</SelectItem>
                      <SelectItem value="UTILITIES">Utilities</SelectItem>
                      <SelectItem value="SUPPLIES">Supplies</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button
                className="w-full bg-rose-600"
                onClick={() =>
                  handleAction("CREATE_EXPENSE", formData, (res: any) => {
                    setExpenses([res.expense, ...expenses]);
                    setIsExpenseOpen(false);
                  })
                }
                disabled={isLoading}
              >
                Save Expense
              </Button>
            </div>
          </ModalWrapper>
        )}
      </AnimatePresence>

      {/* --- PAYROLL MODAL (FIXED) --- */}
      <AnimatePresence>
        {isPayrollOpen && (
          <ModalWrapper
            onClose={() => setIsPayrollOpen(false)}
            title="Run Payroll"
          >
            <div className="space-y-4">
              <div className="space-y-1">
                <Label>Select Teacher</Label>
                <Select
                  onValueChange={(v) =>
                    setFormData({ ...formData, teacherId: v })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Search teacher..." />
                  </SelectTrigger>
                  <SelectContent>
                    {teachers?.map((t: any) => (
                      <SelectItem key={t.id} value={t.id}>
                        {t.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1">
                <Label>Amount</Label>
                <Input
                  type="number"
                  onChange={(e) =>
                    setFormData({ ...formData, amount: e.target.value })
                  }
                  placeholder="e.g. 500.00"
                />
              </div>
              <Button
                className="w-full bg-amber-600"
                onClick={() =>
                  handleAction("RUN_PAYROLL", formData, (res: any) => {
                    setPayrolls([res.payroll, ...payrolls]);
                    setIsPayrollOpen(false);
                  })
                }
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  "Process Payment"
                )}
              </Button>
            </div>
          </ModalWrapper>
        )}
      </AnimatePresence>

      {/* --- RECEIPT MODAL --- */}
      <AnimatePresence>
        {selectedPayment && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedPayment(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-slate-950 w-full max-w-md rounded-xl shadow-2xl border overflow-hidden relative"
            >
              <div className="bg-slate-50 dark:bg-slate-900 p-6 text-center border-b border-dashed border-slate-300 dark:border-slate-800">
                <div className="h-12 w-12 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  Payment Receipt
                </h3>
                <p className="text-sm text-slate-500">
                  {new Date(selectedPayment.createdAt).toLocaleString()}
                </p>
              </div>
              <div className="p-6 space-y-6">
                <div className="text-center">
                  <p className="text-sm text-slate-500 uppercase tracking-widest font-bold">
                    Total Paid
                  </p>
                  <h2 className="text-4xl font-extrabold text-slate-900 dark:text-white mt-2">
                    {formatCurrency(selectedPayment.amount)}
                  </h2>
                </div>
                <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Invoice ID</span>
                    <span className="font-mono">
                      {selectedPayment.invoiceNumber ||
                        selectedPayment.id.slice(0, 8)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Status</span>
                    <Badge
                      variant="outline"
                      className={getStatusColor(selectedPayment.status)}
                    >
                      {selectedPayment.status}
                    </Badge>
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  {selectedPayment.status !== "COMPLETED" && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-emerald-600"
                      onClick={() =>
                        handleStatusChange(selectedPayment.id, "COMPLETED")
                      }
                    >
                      Mark Paid
                    </Button>
                  )}
                  <Button
                    className="w-full bg-slate-900 text-white hover:bg-slate-800"
                    onClick={() => setSelectedPayment(null)}
                  >
                    Close
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// Simple wrapper for consistency
const ModalWrapper = ({ children, onClose, title }: any) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
  >
    <motion.div
      initial={{ scale: 0.95 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0.95 }}
      className="bg-background w-full max-w-md rounded-2xl shadow-2xl border p-6"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">{title}</h2>
        <Button size="icon" variant="ghost" onClick={onClose}>
          <X className="h-5 w-5" />
        </Button>
      </div>
      {children}
    </motion.div>
  </motion.div>
);
