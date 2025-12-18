// src/components/admin/financial-management-client.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  DollarSign,
  CreditCard,
  TrendingUp,
  TrendingDown,
  Calendar,
  Download,
  Filter,
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
  const [selectedStatus, setSelectedStatus] = useState(filters.status || "ALL");
  const [selectedMonth, setSelectedMonth] = useState(filters.month || "");
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
      if (selectedMonth) params.set("month", selectedMonth);
      if (selectedYear) params.set("year", selectedYear);

      router.push(`/admin/financial?${params.toString()}`);
    } finally {
      setIsLoading(false);
    }
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

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to update payment status");
      }

      toast.success(`Payment marked as ${status.toLowerCase()}`);

      // Update local state
      setPayments(
        payments.map((payment) =>
          payment.id === paymentId ? { ...payment, status } : payment
        )
      );
    } catch (error) {
      toast.error("Failed to update payment", {
        description:
          error instanceof Error ? error.message : "Please try again.",
      });
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return (
          <Badge className="bg-green-100 text-green-800">
            <CheckCircle className="mr-1 h-3 w-3" /> Paid
          </Badge>
        );
      case "PENDING":
        return (
          <Badge className="bg-yellow-100 text-yellow-800">
            <Clock className="mr-1 h-3 w-3" /> Pending
          </Badge>
        );
      case "FAILED":
        return (
          <Badge className="bg-red-100 text-red-800">
            <XCircle className="mr-1 h-3 w-3" /> Failed
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "PENDING":
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case "FAILED":
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  // Mock chart data - Replace with real data from API
  const revenueData = [
    { month: "Jan", revenue: 4000 },
    { month: "Feb", revenue: 4500 },
    { month: "Mar", revenue: 5200 },
    { month: "Apr", revenue: 5800 },
    { month: "May", revenue: 6200 },
    { month: "Jun", revenue: 6800 },
    { month: "Jul", revenue: 7200 },
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
    { value: "", label: "All Months" },
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Financial Management
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Manage payments, invoices, and financial reports
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button className="bg-gradient-primary gap-2">
            <FileText className="h-4 w-4" />
            Generate Report
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {statsData.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    {stat.label}
                  </p>
                  <p className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
                    {stat.value}
                  </p>
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
                        {stat.changePercent}% from last month
                      </span>
                    </div>
                  )}
                </div>
                <div className={`rounded-lg bg-${stat.color}-100 p-3`}>
                  <stat.icon className={`h-6 w-6 text-${stat.color}-600`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Revenue Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
            <CardDescription>
              Monthly revenue for the past 7 months
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="month" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #E5E7EB",
                      borderRadius: "8px",
                    }}
                    formatter={(value) => [`$${value}`, "Revenue"]}
                  />
                  <Bar dataKey="revenue" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Payment Methods Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Payment Methods</CardTitle>
            <CardDescription>Distribution of payment methods</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    data={paymentMethodsData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) =>
                      `${name}: ${(percent * 100).toFixed(0)}%`
                    }
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {paymentMethodsData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #E5E7EB",
                      borderRadius: "8px",
                    }}
                    formatter={(value) => [`${value}%`, "Usage"]}
                  />
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
            <div>
              <label className="mb-2 block text-sm font-medium">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search by name or ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                  disabled={isLoading}
                />
              </div>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium">Status</label>
              <Select
                value={selectedStatus}
                onValueChange={setSelectedStatus}
                disabled={isLoading}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">All Status</SelectItem>
                  <SelectItem value="COMPLETED">Completed</SelectItem>
                  <SelectItem value="PENDING">Pending</SelectItem>
                  <SelectItem value="FAILED">Failed</SelectItem>
                  <SelectItem value="REFUNDED">Refunded</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium">Month</label>
              <Select
                value={selectedMonth}
                onValueChange={setSelectedMonth}
                disabled={isLoading}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Month" />
                </SelectTrigger>
                <SelectContent>
                  {months.map((month) => (
                    <SelectItem key={month.value} value={month.value}>
                      {month.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium">Year</label>
              <Select
                value={selectedYear}
                onValueChange={setSelectedYear}
                disabled={isLoading}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Year" />
                </SelectTrigger>
                <SelectContent>
                  {years.map((year) => (
                    <SelectItem key={year} value={year}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="sm:col-span-4 flex justify-end space-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setSelectedStatus("ALL");
                  setSelectedMonth("");
                  setSelectedYear(new Date().getFullYear().toString());
                  setSearchQuery("");
                  router.push("/admin/financial");
                }}
                disabled={isLoading}
              >
                Clear Filters
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Applying...
                  </>
                ) : (
                  <>
                    <Filter className="mr-2 h-4 w-4" />
                    Apply Filters
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Payments Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>All Payments</CardTitle>
              <CardDescription>
                {pagination.total} payments found • Page {pagination.page} of{" "}
                {pagination.pages}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex h-64 items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-purple-500" />
            </div>
          ) : payments.length === 0 ? (
            <div className="py-12 text-center">
              <CreditCard className="mx-auto h-12 w-12 text-gray-300" />
              <h3 className="mt-4 text-lg font-semibold">No payments found</h3>
              <p className="mt-2 text-gray-500">
                No payments match your search criteria.
              </p>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                        Payment
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                        Student/Parent
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                        Amount
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                        Status
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                        Date
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {payments.map((payment) => (
                      <tr key={payment.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3">
                          <div className="space-y-1">
                            <p className="font-medium">
                              #{payment.invoiceNumber || payment.id.slice(0, 8)}
                            </p>
                            <p className="text-sm text-gray-500 capitalize">
                              {payment.paymentMethod
                                ?.replace("_", " ")
                                .toLowerCase()}
                            </p>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center space-x-3">
                            <Avatar>
                              <AvatarFallback className="bg-gradient-primary text-white">
                                {getInitials(
                                  payment.student?.user.name ||
                                    payment.parent?.user.name ||
                                    "Unknown"
                                )}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">
                                {payment.student?.user.name ||
                                  payment.parent?.user.name ||
                                  "Unknown"}
                              </p>
                              <p className="text-sm text-gray-500">
                                {payment.student ? "Student" : "Parent"}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="space-y-1">
                            <p className="font-medium">
                              {formatCurrency(
                                Number(payment.amount),
                                payment.currency
                              )}
                            </p>
                            <p className="text-sm text-gray-500">
                              {payment.description}
                            </p>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          {getStatusBadge(payment.status)}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-500">
                          {payment.paidAt
                            ? formatDate(payment.paidAt)
                            : "Not paid"}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                // View payment details
                              }}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button size="sm" variant="ghost">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <FileText className="mr-2 h-4 w-4" />
                                  View Invoice
                                </DropdownMenuItem>
                                {payment.status === "PENDING" && (
                                  <DropdownMenuItem
                                    onClick={() =>
                                      handleUpdatePaymentStatus(
                                        payment.id,
                                        "COMPLETED"
                                      )
                                    }
                                  >
                                    <CheckCircle className="mr-2 h-4 w-4" />
                                    Mark as Paid
                                  </DropdownMenuItem>
                                )}
                                {payment.status === "COMPLETED" && (
                                  <DropdownMenuItem
                                    onClick={() =>
                                      handleUpdatePaymentStatus(
                                        payment.id,
                                        "REFUNDED"
                                      )
                                    }
                                  >
                                    <DollarSign className="mr-2 h-4 w-4" />
                                    Issue Refund
                                  </DropdownMenuItem>
                                )}
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
                  <div className="text-sm text-gray-700">
                    Showing {(pagination.page - 1) * pagination.limit + 1} to{" "}
                    {Math.min(
                      pagination.page * pagination.limit,
                      pagination.total
                    )}{" "}
                    of {pagination.total} results
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(pagination.page - 1)}
                      disabled={pagination.page === 1 || isLoading}
                    >
                      <ChevronLeft className="h-4 w-4" />
                      Previous
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(pagination.page + 1)}
                      disabled={
                        pagination.page === pagination.pages || isLoading
                      }
                    >
                      Next
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
