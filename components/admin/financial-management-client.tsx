"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Download,
  MoreVertical,
  CheckCircle2,
  Clock,
  XCircle,
  LayoutGrid,
  List as ListIcon,
  Loader2,
  DollarSign,
  TrendingUp,
  TrendingDown,
  FileText,
  CreditCard,
  ChevronRight,
  X,
  Plus,
  Calendar,
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
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { toast } from "sonner";
import { getInitials } from "@/lib/utils";
import { Counter } from "@/components/admin/dashboard-ui";

// --- ANIMATION ---
const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } },
};
const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 50 } },
};

interface Props {
  initialPayments: any[];
  stats: any;
  pagination: any;
}

export default function FinancialManagementClient({
  initialPayments,
  stats: serverStats,
  pagination,
}: Props) {
  const router = useRouter();
  const [payments, setPayments] = useState(initialPayments);
  const [isLoading, setIsLoading] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("list"); // Default to list for finance
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("ALL");
  const [selectedPayment, setSelectedPayment] = useState<any>(null);

  // --- FILTER LOGIC ---
  const filteredPayments = useMemo(() => {
    return payments.filter((p) => {
      const term = searchQuery.toLowerCase();
      const matchesSearch =
        p.invoiceNumber?.toLowerCase().includes(term) ||
        p.userName.toLowerCase().includes(term);
      const matchesStatus = filterStatus === "ALL" || p.status === filterStatus;
      return matchesSearch && matchesStatus;
    });
  }, [payments, searchQuery, filterStatus]);

  // --- CHART DATA (Mock for Demo, in prod calculate from history) ---
  const chartData = [
    { name: "Mon", total: 400 },
    { name: "Tue", total: 300 },
    { name: "Wed", total: 550 },
    { name: "Thu", total: 450 },
    { name: "Fri", total: 600 },
    { name: "Sat", total: 800 },
    { name: "Sun", total: 200 },
  ];

  // --- ACTIONS ---
  const handleStatusChange = async (paymentId: string, status: string) => {
    // Optimistic Update
    setPayments((prev) =>
      prev.map((p) => (p.id === paymentId ? { ...p, status } : p))
    );
    if (selectedPayment?.id === paymentId)
      setSelectedPayment((prev) => ({ ...prev, status }));

    try {
      const res = await fetch("/api/admin/payments/manage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "UPDATE_STATUS", paymentId, status }),
      });
      if (!res.ok) throw new Error();
      toast.success("Status updated");
    } catch {
      toast.error("Update failed");
      router.refresh();
    }
  };

  const handleExport = () => {
    // CSV Logic ...
    toast.success("Export started");
  };

  // --- HELPERS ---
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

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
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
            Financials
          </h1>
          <p className="text-muted-foreground mt-1">
            Revenue tracking and invoice management
          </p>
        </div>
        <div className="flex gap-2">
          <div className="flex items-center bg-muted p-1 rounded-lg border">
            <Button
              size="icon"
              variant={viewMode === "grid" ? "white" : "ghost"}
              className={`h-7 w-7 rounded-md ${
                viewMode === "grid" ? "shadow-sm" : ""
              }`}
              onClick={() => setViewMode("grid")}
            >
              <LayoutGrid className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              variant={viewMode === "list" ? "white" : "ghost"}
              className={`h-7 w-7 rounded-md ${
                viewMode === "list" ? "shadow-sm" : ""
              }`}
              onClick={() => setViewMode("list")}
            >
              <ListIcon className="h-4 w-4" />
            </Button>
          </div>
          <Button variant="outline" onClick={handleExport}>
            <Download className="h-4 w-4 mr-2" /> Export CSV
          </Button>
          <Button className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md hover:scale-105 transition-all gap-2">
            <Plus className="h-4 w-4 mr-2" /> Create Invoice
          </Button>
        </div>
      </div>

      {/* STATS & CHART */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Revenue Card */}
        <Card className="lg:col-span-2 bg-gradient-to-br from-indigo-900 to-slate-900 text-white border-0 shadow-xl overflow-hidden relative">
          <div className="absolute top-0 right-0 p-6 opacity-10">
            <DollarSign className="h-32 w-32" />
          </div>
          <CardContent className="p-8 relative z-10">
            <div className="flex justify-between items-start mb-8">
              <div>
                <p className="text-indigo-200 text-xs font-bold uppercase tracking-wider mb-1">
                  Total Revenue
                </p>
                <h2 className="text-5xl font-extrabold tracking-tight">
                  {formatCurrency(serverStats.totalRevenue)}
                </h2>
              </div>
              <Badge className="bg-emerald-500/20 text-emerald-300 border-0 backdrop-blur-md">
                <TrendingUp className="h-3 w-3 mr-1" /> +12.5%
              </Badge>
            </div>

            {/* Chart */}
            <div className="h-[180px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#818cf8" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#818cf8" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Tooltip
                    contentStyle={{
                      borderRadius: "8px",
                      border: "none",
                      backgroundColor: "#1e293b",
                      color: "#fff",
                    }}
                    itemStyle={{ color: "#fff" }}
                  />
                  <Area
                    type="monotone"
                    dataKey="total"
                    stroke="#818cf8"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#colorTotal)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Side Stats */}
        <div className="flex flex-col gap-4">
          <Card className="flex-1 bg-white/50 backdrop-blur-sm border-slate-200 shadow-sm dark:bg-slate-900/50">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase">
                  This Month
                </p>
                <div className="text-2xl font-bold mt-1 text-slate-900 dark:text-white">
                  {formatCurrency(serverStats.thisMonthRevenue)}
                </div>
              </div>
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-xl">
                <Calendar className="h-6 w-6" />
              </div>
            </CardContent>
          </Card>
          <Card className="flex-1 bg-white/50 backdrop-blur-sm border-slate-200 shadow-sm dark:bg-slate-900/50">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase">
                  Pending
                </p>
                <div className="text-2xl font-bold mt-1 text-amber-600">
                  {formatCurrency(serverStats.pendingAmount)}
                </div>
              </div>
              <div className="p-3 bg-amber-100 dark:bg-amber-900/30 text-amber-600 rounded-xl">
                <Clock className="h-6 w-6" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* FILTERS */}
      <motion.div
        variants={itemVariants}
        className="flex flex-col sm:flex-row gap-4 bg-white/60 dark:bg-slate-900/60 backdrop-blur-md p-4 rounded-xl border shadow-sm"
      >
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search invoice #, name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 bg-white dark:bg-slate-950 border-muted"
          />
        </div>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-[180px] bg-white dark:bg-slate-950 border-muted">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All Status</SelectItem>
            <SelectItem value="COMPLETED">Paid</SelectItem>
            <SelectItem value="PENDING">Pending</SelectItem>
            <SelectItem value="FAILED">Failed</SelectItem>
          </SelectContent>
        </Select>
      </motion.div>

      {/* LIST VIEW (Preferred for Finance) */}
      <motion.div variants={containerVariants}>
        <Card className="border-none shadow-sm overflow-hidden bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-muted/30 border-b">
                  <tr>
                    <th className="px-6 py-4 text-left">Invoice</th>
                    <th className="px-6 py-4 text-left">User</th>
                    <th className="px-6 py-4 text-left">Amount</th>
                    <th className="px-6 py-4 text-left">Date</th>
                    <th className="px-6 py-4 text-center">Status</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {filteredPayments.map((p) => (
                    <motion.tr
                      key={p.id}
                      variants={itemVariants}
                      className="group hover:bg-muted/40 transition-colors cursor-pointer"
                      onClick={() => setSelectedPayment(p)}
                    >
                      <td className="px-6 py-4 font-mono text-slate-500 text-xs">
                        #{p.invoiceNumber || p.id.slice(0, 8).toUpperCase()}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={p.userImage} />
                            <AvatarFallback>
                              {getInitials(p.userName)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-slate-900 dark:text-white">
                              {p.userName}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {p.userRole}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-bold text-slate-700 dark:text-slate-300">
                        {formatCurrency(p.amount)}
                      </td>
                      <td className="px-6 py-4 text-muted-foreground">
                        {new Date(p.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <Badge
                          variant="outline"
                          className={getStatusColor(p.status)}
                        >
                          {p.status}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button size="icon" variant="ghost">
                              <MoreVertical className="h-4 w-4 text-muted-foreground" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => setSelectedPayment(p)}
                            >
                              <Eye className="mr-2 h-4 w-4" /> View Receipt
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() =>
                                handleStatusChange(p.id, "COMPLETED")
                              }
                            >
                              <CheckCircle2 className="mr-2 h-4 w-4 text-green-600" />{" "}
                              Mark Paid
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleStatusChange(p.id, "FAILED")}
                            >
                              <XCircle className="mr-2 h-4 w-4 text-red-600" />{" "}
                              Mark Failed
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </motion.div>

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
              {/* Receipt Header */}
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

              {/* Receipt Body */}
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
                    <span className="text-slate-500">Payment Method</span>
                    <span>{selectedPayment.paymentMethod}</span>
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

                <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-xl flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src={selectedPayment.userImage} />
                    <AvatarFallback>
                      {getInitials(selectedPayment.userName)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">
                      {selectedPayment.userName}
                    </p>
                    <p className="text-xs text-slate-500">
                      {selectedPayment.userEmail}
                    </p>
                  </div>
                </div>

                <Button
                  className="w-full bg-slate-900 text-white hover:bg-slate-800"
                  onClick={() => setSelectedPayment(null)}
                >
                  Close Receipt
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
