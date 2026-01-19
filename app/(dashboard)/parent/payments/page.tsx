// src/app/(dashboard)/parent/payments/page.tsx
"use client";

import { useState, useEffect } from "react";
import {
  DollarSign,
  Download,
  Filter,
  Calendar,
  CheckCircle,
  Clock,
  AlertCircle,
  Receipt,
  CreditCard,
  Banknote,
  Smartphone,
  QrCode,
  Eye,
  FileText,
  History,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatCurrency, formatDate } from "@/lib/utils";
import { toast } from "sonner";

interface Payment {
  id: string;
  childName: string;
  description: string;
  amount: number;
  dueDate: string;
  paidDate?: string;
  status: "PENDING" | "PAID" | "OVERDUE" | "PARTIAL";
  paymentMethod?: string;
  invoiceNumber: string;
  invoiceUrl?: string;
  category: "TUITION" | "EXAM_FEE" | "COMPETITION" | "MATERIALS" | "OTHER";
}

export default function ParentPaymentsPage() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [selectedChild, setSelectedChild] = useState("ALL");
  const [selectedStatus, setSelectedStatus] = useState("ALL");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPayments = async () => {
      setIsLoading(true);
      try {
        // Mock data - Replace with API call
        const mockPayments: Payment[] = [
          {
            id: "1",
            childName: "Omar Ahmed",
            description: "January 2024 Tuition",
            amount: 150,
            dueDate: "2024-01-31",
            paidDate: "2024-01-15",
            status: "PAID",
            paymentMethod: "Credit Card",
            invoiceNumber: "INV-2024-001",
            category: "TUITION",
          },
          {
            id: "2",
            childName: "Aisha Ahmed",
            description: "January 2024 Tuition",
            amount: 150,
            dueDate: "2024-01-31",
            paidDate: "2024-01-16",
            status: "PAID",
            paymentMethod: "Bank Transfer",
            invoiceNumber: "INV-2024-002",
            category: "TUITION",
          },
          {
            id: "3",
            childName: "Omar Ahmed",
            description: "February 2024 Tuition",
            amount: 150,
            dueDate: "2024-02-28",
            status: "PENDING",
            invoiceNumber: "INV-2024-003",
            category: "TUITION",
          },
          {
            id: "4",
            childName: "Aisha Ahmed",
            description: "Quran Competition Fee",
            amount: 25,
            dueDate: "2024-01-20",
            status: "OVERDUE",
            invoiceNumber: "INV-2024-004",
            category: "COMPETITION",
          },
          {
            id: "5",
            childName: "Omar Ahmed",
            description: "Study Materials",
            amount: 35,
            dueDate: "2024-02-15",
            paidDate: "2024-01-10",
            status: "PAID",
            paymentMethod: "Mobile Money",
            invoiceNumber: "INV-2024-005",
            category: "MATERIALS",
          },
        ];

        setPayments(mockPayments);
      } catch (error) {
        toast.error("Failed to load payments");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPayments();
  }, []);

  const filteredPayments = payments.filter((payment) => {
    const matchesChild =
      selectedChild === "ALL" || payment.childName.includes(selectedChild);
    const matchesStatus =
      selectedStatus === "ALL" || payment.status === selectedStatus;
    const matchesCategory =
      selectedCategory === "ALL" || payment.category === selectedCategory;

    return matchesChild && matchesStatus && matchesCategory;
  });

  const totalPaid = payments
    .filter((p) => p.status === "PAID")
    .reduce((sum, p) => sum + p.amount, 0);
  const totalPending = payments
    .filter((p) => p.status === "PENDING")
    .reduce((sum, p) => sum + p.amount, 0);
  const totalOverdue = payments
    .filter((p) => p.status === "OVERDUE")
    .reduce((sum, p) => sum + p.amount, 0);

  const handleMakePayment = (paymentId: string) => {
    toast.success("Redirecting to payment gateway...");
    // In production: Redirect to payment gateway
  };

  const handleDownloadInvoice = (invoiceUrl?: string) => {
    if (invoiceUrl) {
      window.open(invoiceUrl, "_blank");
    } else {
      toast.info("Invoice will be generated after payment");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Payments
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Manage tuition fees and other payments
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export Statements
          </Button>
          <Button className="bg-gradient-primary gap-2">
            <History className="h-4 w-4" />
            Payment History
          </Button>
        </div>
      </div>

      {/* Payment Summary */}
      <div className="grid gap-6 sm:grid-cols-3">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Total Paid
                </p>
                <p className="mt-2 text-2xl font-bold text-green-600 dark:text-green-400">
                  {formatCurrency(totalPaid)}
                </p>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  {payments.filter((p) => p.status === "PAID").length} payments
                </p>
              </div>
              <div className="rounded-lg bg-green-100 p-3 dark:bg-green-900/30">
                <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Pending Payments
                </p>
                <p className="mt-2 text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                  {formatCurrency(totalPending)}
                </p>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  Due within 30 days
                </p>
              </div>
              <div className="rounded-lg bg-yellow-100 p-3 dark:bg-yellow-900/30">
                <Clock className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Overdue Payments
                </p>
                <p className="mt-2 text-2xl font-bold text-red-600 dark:text-red-400">
                  {formatCurrency(totalOverdue)}
                </p>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  Requires immediate attention
                </p>
              </div>
              <div className="rounded-lg bg-red-100 p-3 dark:bg-red-900/30">
                <AlertCircle className="h-6 w-6 text-red-600 dark:text-red-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <label className="mb-2 block text-sm font-medium">
                Filter by Child
              </label>
              <Select value={selectedChild} onValueChange={setSelectedChild}>
                <SelectTrigger>
                  <SelectValue placeholder="All Children" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">All Children</SelectItem>
                  <SelectItem value="Omar">Omar Ahmed</SelectItem>
                  <SelectItem value="Aisha">Aisha Ahmed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium">
                Filter by Status
              </label>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">All Status</SelectItem>
                  <SelectItem value="PENDING">Pending</SelectItem>
                  <SelectItem value="PAID">Paid</SelectItem>
                  <SelectItem value="OVERDUE">Overdue</SelectItem>
                  <SelectItem value="PARTIAL">Partial</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium">
                Filter by Category
              </label>
              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">All Categories</SelectItem>
                  <SelectItem value="TUITION">Tuition</SelectItem>
                  <SelectItem value="EXAM_FEE">Exam Fees</SelectItem>
                  <SelectItem value="COMPETITION">Competition</SelectItem>
                  <SelectItem value="MATERIALS">Materials</SelectItem>
                  <SelectItem value="OTHER">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Methods */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Methods</CardTitle>
          <CardDescription>
            Choose your preferred payment method
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Button variant="outline" className="h-auto flex-col gap-2 py-6">
              <CreditCard className="h-8 w-8" />
              <span>Credit/Debit Card</span>
            </Button>
            <Button variant="outline" className="h-auto flex-col gap-2 py-6">
              <Banknote className="h-8 w-8" />
              <span>Bank Transfer</span>
            </Button>
            <Button variant="outline" className="h-auto flex-col gap-2 py-6">
              <Smartphone className="h-8 w-8" />
              <span>Mobile Money</span>
            </Button>
            <Button variant="outline" className="h-auto flex-col gap-2 py-6">
              <QrCode className="h-8 w-8" />
              <span>QR Code</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Payments List */}
      <Tabs defaultValue="all" className="space-y-6">
        <TabsList>
          <TabsTrigger value="all">All Payments</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="paid">Paid</TabsTrigger>
          <TabsTrigger value="overdue">Overdue</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>All Payments</CardTitle>
              <CardDescription>
                {filteredPayments.length} payments found
              </CardDescription>
            </CardHeader>
            <CardContent>
              {filteredPayments.length === 0 ? (
                <div className="py-12 text-center">
                  <DollarSign className="mx-auto h-12 w-12 text-gray-300" />
                  <p className="mt-4 text-gray-500">No payments found</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredPayments.map((payment) => (
                    <div
                      key={payment.id}
                      className="flex flex-col justify-between rounded-lg border border-gray-200 p-4 dark:border-gray-700 sm:flex-row sm:items-center"
                    >
                      <div className="mb-4 sm:mb-0">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">
                            {payment.description}
                          </h3>
                          <Badge variant="outline" className="text-xs">
                            {payment.childName}
                          </Badge>
                        </div>
                        <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            Due: {formatDate(payment.dueDate)}
                          </span>
                          <span>•</span>
                          <span>Invoice: {payment.invoiceNumber}</span>
                          {payment.paidDate && (
                            <>
                              <span>•</span>
                              <span>Paid: {formatDate(payment.paidDate)}</span>
                            </>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-lg font-bold">
                            {formatCurrency(payment.amount)}
                          </p>
                          <Badge
                            variant={
                              payment.status === "PAID"
                                ? "default"
                                : payment.status === "PENDING"
                                ? "secondary"
                                : payment.status === "OVERDUE"
                                ? "destructive"
                                : "outline"
                            }
                          >
                            {payment.status}
                          </Badge>
                        </div>
                        <div className="flex space-x-2">
                          {payment.status === "PAID" && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() =>
                                handleDownloadInvoice(payment.invoiceUrl)
                              }
                            >
                              <Receipt className="mr-2 h-4 w-4" />
                              Invoice
                            </Button>
                          )}
                          {payment.status !== "PAID" && (
                            <Button
                              size="sm"
                              className="bg-gradient-primary"
                              onClick={() => handleMakePayment(payment.id)}
                            >
                              Pay Now
                            </Button>
                          )}
                          <Button size="sm" variant="ghost">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Payment History Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Payment History Summary</CardTitle>
          <CardDescription>Monthly breakdown of payments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="px-4 py-3 text-left text-sm font-medium">
                    Month
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium">
                    Tuition
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium">
                    Fees
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium">
                    Materials
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium">
                    Total
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="px-4 py-3">January 2024</td>
                  <td className="px-4 py-3">{formatCurrency(300)}</td>
                  <td className="px-4 py-3">{formatCurrency(25)}</td>
                  <td className="px-4 py-3">{formatCurrency(35)}</td>
                  <td className="px-4 py-3 font-bold">{formatCurrency(360)}</td>
                  <td className="px-4 py-3">
                    <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                      Paid
                    </Badge>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="px-4 py-3">February 2024</td>
                  <td className="px-4 py-3">{formatCurrency(300)}</td>
                  <td className="px-4 py-3">{formatCurrency(0)}</td>
                  <td className="px-4 py-3">{formatCurrency(0)}</td>
                  <td className="px-4 py-3 font-bold">{formatCurrency(300)}</td>
                  <td className="px-4 py-3">
                    <Badge variant="secondary">Pending</Badge>
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-bold">Total</td>
                  <td className="px-4 py-3 font-bold">{formatCurrency(600)}</td>
                  <td className="px-4 py-3 font-bold">{formatCurrency(25)}</td>
                  <td className="px-4 py-3 font-bold">{formatCurrency(35)}</td>
                  <td className="px-4 py-3 font-bold text-purple-600">
                    {formatCurrency(660)}
                  </td>
                  <td className="px-4 py-3"></td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full gap-2">
            <FileText className="h-4 w-4" />
            Download Detailed Statement (PDF)
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
