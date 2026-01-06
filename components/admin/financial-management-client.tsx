"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  DollarSign,

  TrendingUp,
  TrendingDown,
  Calendar,
  Download,

  Search,
  MoreVertical,
  CheckCircle,
  Clock,
  XCircle,
  Eye,
  ChevronLeft,
  ChevronRight,
  Loader2,
  FileText,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
} from "recharts";
import { toast } from "sonner";
import { formatCurrency, formatDate, getInitials } from "@/lib/utils";

interface FinancialManagementClientProps {
  initialPayments: any[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
  filters: {
    status?: string;
    month?: string;
    year?: string;
  };
  stats: {
    totalRevenue: number;
    pendingPayments: number;
    completedPayments: number;
    thisMonthRevenue: number;
    lastMonthRevenue: number;
  };
}

// Map for Tailwind dynamic classes to ensure they are compiled correctly
const statColorMap: Record<string, { bg: string; text: string }> = {
  purple: {
    bg: "bg-purple-100 dark:bg-purple-900/30",
    text: "text-purple-600 dark:text-purple-400",
  },
  blue: {
    bg: "bg-blue-100 dark:bg-blue-900/30",
    text: "text-blue-600 dark:text-blue-400",
  },
  green: {
    bg: "bg-green-100 dark:bg-green-900/30",
    text: "text-green-600 dark:text-green-400",
  },
  yellow: {
    bg: "bg-yellow-100 dark:bg-yellow-900/30",
    text: "text-yellow-600 dark:text-yellow-400",
  },
};

export default function FinancialManagementClient({
  initialPayments,
  pagination,
  filters,
  stats,
}: FinancialManagementClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [payments, setPayments] = useState(initialPayments);
  const [isLoading, setIsLoading] = useState(false);

  // Dialog State
  const [selectedPayment, setSelectedPayment] = useState<any>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  // Filter States - Fixed: Use "all" instead of empty string for Select values
  const [selectedStatus, setSelectedStatus] = useState(filters.status || "ALL");
  const [selectedMonth, setSelectedMonth] = useState(filters.month || "all");
  const [selectedYear, setSelectedYear] = useState(
    filters.year || new Date().getFullYear().toString()
  );
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setPayments(initialPayments);
  }, [initialPayments]);

  const refreshData = async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams(searchParams.toString());

      if (selectedStatus !== "ALL") params.set("status", selectedStatus);
      else params.delete("status");

      if (selectedMonth !== "all") params.set("month", selectedMonth);
      else params.delete("month");

      if (selectedYear) params.set("year", selectedYear);

      if (searchQuery) params.set("q", searchQuery);
      else params.delete("q");

      params.set("page", "1");
      router.push(`/admin/financial?${params.toString()}`);
    } finally {
      setIsLoading(false);
    }
  };

  const exportToCSV = () => {
    const headers = ["Invoice,Customer,Amount,Status,Method,Date"];
    const rows = payments.map((p: any) => {
      const name = p.student?.user.name || p.parent?.user.name || "Unknown";
      return `${p.invoiceNumber || p.id},${name},${p.amount},${p.status},${
        p.paymentMethod
      },${p.paidAt}`;
    });

    const csvContent =
      "data:text/csv;charset=utf-8," + [headers, ...rows].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `payments_report_${new Date().toISOString().split("T")[0]}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("CSV Export successful");
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    refreshData();
  };

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    router.push(`/admin/financial?${params.toString()}`);
  };

  const handleUpdatePaymentStatus = async (
    paymentId: string,
    status: string
  ) => {
    try {
      const response = await fetch(`/api/admin/payments/${paymentId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) throw new Error("Failed to update status");

      toast.success(`Payment marked as ${status.toLowerCase()}`);
      setPayments(
        payments.map((p) => (p.id === paymentId ? { ...p, status } : p))
      );
    } catch (error) {
      toast.error("Update failed. Please try again.");
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return (
          <Badge className="bg-green-100 text-green-800 border-none">
            <CheckCircle className="mr-1 h-3 w-3" /> Paid
          </Badge>
        );
      case "PENDING":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 border-none">
            <Clock className="mr-1 h-3 w-3" /> Pending
          </Badge>
        );
      case "FAILED":
        return (
          <Badge className="bg-red-100 text-red-800 border-none">
            <XCircle className="mr-1 h-3 w-3" /> Failed
          </Badge>
        );
      case "REFUNDED":
        return (
          <Badge className="bg-blue-100 text-blue-800 border-none">
            Refunded
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const revenueData = [
    { month: "Jan", revenue: 4000 },
    { month: "Feb", revenue: 4500 },
    { month: "Mar", revenue: 5200 },
    { month: "Apr", revenue: 5800 },
    { month: "May", revenue: 6200 },
    { month: "Jun", revenue: 6800 },
    { month: "Jul", revenue: stats.thisMonthRevenue || 7200 },
  ];

  const paymentMethodsData = [
    { name: "Credit Card", value: 65, color: "#8b5cf6" },
    { name: "Bank Transfer", value: 20, color: "#3b82f6" },
    { name: "Mobile Money", value: 10, color: "#10b981" },
    { name: "Cash", value: 5, color: "#f59e0b" },
  ];

  const statsData = [
    {
      label: "Total Revenue",
      value: formatCurrency(stats.totalRevenue),
      icon: DollarSign,
      color: "purple",
      change: stats.thisMonthRevenue > stats.lastMonthRevenue ? "up" : "down",
      changePercent:
        stats.lastMonthRevenue > 0
          ? Math.abs(
              ((stats.thisMonthRevenue - stats.lastMonthRevenue) /
                stats.lastMonthRevenue) *
                100
            ).toFixed(1)
          : "0",
    },
    {
      label: "This Month",
      value: formatCurrency(stats.thisMonthRevenue),
      icon: Calendar,
      color: "blue",
    },
    {
      label: "Completed Payments",
      value: stats.completedPayments.toString(),
      icon: CheckCircle,
      color: "green",
    },
    {
      label: "Pending Payments",
      value: stats.pendingPayments.toString(),
      icon: Clock,
      color: "yellow",
    },
  ];

  const months = [
    { value: "all", label: "All Months" }, // Changed from "" to "all"
    { value: "01", label: "January" },
    { value: "02", label: "February" },
    { value: "03", label: "March" },
    { value: "04", label: "April" },
    { value: "05", label: "May" },
    { value: "06", label: "June" },
    { value: "07", label: "July" },
    { value: "08", label: "August" },
    { value: "09", label: "September" },
    { value: "10", label: "October" },
    { value: "11", label: "November" },
    { value: "12", label: "December" },
  ];

  const years = Array.from({ length: 5 }, (_, i) =>
    (new Date().getFullYear() - i).toString()
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Financial Management
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Manage payments, invoices, and financial reports
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" onClick={exportToCSV} className="gap-2">
            <Download className="h-4 w-4" /> Export
          </Button>
          <Button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white gap-2">
            <FileText className="h-4 w-4" /> Generate Report
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {statsData.map((stat, index) => {
          const colors = statColorMap[stat.color];
          return (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      {stat.label}
                    </p>
                    <p className="mt-2 text-2xl font-bold">{stat.value}</p>
                    {stat.change && (
                      <div className="mt-1 flex items-center text-sm">
                        {stat.change === "up" ? (
                          <TrendingUp className="mr-1 h-4 w-4 text-green-500" />
                        ) : (
                          <TrendingDown className="mr-1 h-4 w-4 text-red-500" />
                        )}
                        <span
                          className={
                            stat.change === "up"
                              ? "text-green-600"
                              : "text-red-600"
                          }
                        >
                          {stat.changePercent}% vs last month
                        </span>
                      </div>
                    )}
                  </div>
                  <div className={`rounded-lg p-3 ${colors.bg}`}>
                    <stat.icon className={`h-6 w-6 ${colors.text}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
            <CardDescription>Monthly revenue trends</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="revenue" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Payment Methods</CardTitle>
            <CardDescription>Distribution of usage</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    data={paymentMethodsData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {paymentMethodsData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <form onSubmit={handleSearch} className="grid gap-4 sm:grid-cols-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Invoice or name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Status</label>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">All Status</SelectItem>
                  <SelectItem value="COMPLETED">Completed</SelectItem>
                  <SelectItem value="PENDING">Pending</SelectItem>
                  <SelectItem value="FAILED">Failed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Month</label>
              <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Month" />
                </SelectTrigger>
                <SelectContent>
                  {months.map((m) => (
                    <SelectItem key={m.value} value={m.value}>
                      {m.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Year</label>
              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger>
                  <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent>
                  {years.map((y) => (
                    <SelectItem key={y} value={y}>
                      {y}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="sm:col-span-4 flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/admin/financial")}
              >
                Clear
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}{" "}
                Apply Filters
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Payments Table */}
      <Card>
        <CardHeader>
          <CardTitle>Transactions</CardTitle>
          <CardDescription>{pagination.total} records found</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr className="border-b">
                  <th className="px-4 py-3 text-left font-medium">Invoice</th>
                  <th className="px-4 py-3 text-left font-medium">User</th>
                  <th className="px-4 py-3 text-left font-medium">Amount</th>
                  <th className="px-4 py-3 text-left font-medium">Status</th>
                  <th className="px-4 py-3 text-left font-medium">Date</th>
                  <th className="px-4 py-3 text-right font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {payments.map((payment) => (
                  <tr
                    key={payment.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors"
                  >
                    <td className="px-4 py-3 font-mono text-xs">
                      #{payment.invoiceNumber || payment.id.slice(0, 8)}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-purple-600 text-white text-[10px]">
                            {getInitials(
                              payment.student?.user.name ||
                                payment.parent?.user.name ||
                                "?"
                            )}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium">
                          {payment.student?.user.name ||
                            payment.parent?.user.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 font-semibold">
                      {formatCurrency(payment.amount)}
                    </td>
                    <td className="px-4 py-3">
                      {getStatusBadge(payment.status)}
                    </td>
                    <td className="px-4 py-3 text-gray-500">
                      {formatDate(payment.paidAt)}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => {
                            setSelectedPayment(payment);
                            setIsDetailsOpen(true);
                          }}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button size="icon" variant="ghost">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() =>
                                handleUpdatePaymentStatus(
                                  payment.id,
                                  "COMPLETED"
                                )
                              }
                            >
                              Mark as Paid
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-red-600"
                              onClick={() =>
                                handleUpdatePaymentStatus(payment.id, "FAILED")
                              }
                            >
                              Mark Failed
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {pagination.pages > 1 && (
            <div className="mt-6 flex items-center justify-between">
              <p className="text-sm text-gray-500">
                Page {pagination.page} of {pagination.pages}
              </p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(pagination.page - 1)}
                  disabled={pagination.page === 1}
                >
                  <ChevronLeft className="h-4 w-4" /> Prev
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(pagination.page + 1)}
                  disabled={pagination.page === pagination.pages}
                >
                  Next <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Details Dialog */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Transaction Details</DialogTitle>
            <DialogDescription>
              Invoice Details for #
              {selectedPayment?.invoiceNumber ||
                selectedPayment?.id.slice(0, 8)}
            </DialogDescription>
          </DialogHeader>
          {selectedPayment && (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4 border-b pb-4">
                <div>
                  <p className="text-xs text-gray-500 uppercase">Customer</p>
                  <p className="font-medium">
                    {selectedPayment.student?.user.name ||
                      selectedPayment.parent?.user.name}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase">Method</p>
                  <p className="capitalize">
                    {selectedPayment.paymentMethod?.replace("_", " ")}
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Amount</span>
                  <span className="font-bold">
                    {formatCurrency(selectedPayment.amount)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Tax (0%)</span>
                  <span>$0.00</span>
                </div>
                <div className="flex justify-between border-t pt-2 font-bold text-lg">
                  <span>Total</span>
                  <span>{formatCurrency(selectedPayment.amount)}</span>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
