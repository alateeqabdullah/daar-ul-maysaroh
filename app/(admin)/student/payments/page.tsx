// src/app/student/payments/page.tsx
"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import {
  CreditCard,
  Receipt,
  Calendar,
  CheckCircle,
  XCircle,
  Clock,
  Download,
  Repeat,
  AlertCircle,
  TrendingUp
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { formatCurrency, formatDate } from "@/lib/utils"
import { toast } from "sonner"
import PaymentModal from "@/components/payment/payment-modal"

interface Payment {
  id: string
  amount: number
  currency: string
  description: string
  status: string
  createdAt: string
  paidAt?: string
  invoiceNumber?: string
  period?: string
}

interface Subscription {
  id: string
  plan: string
  amount: number
  currency: string
  status: string
  currentPeriodStart: string
  currentPeriodEnd: string
  cancelAtPeriodEnd: boolean
}

export default function PaymentsPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  
  const [payments, setPayments] = useState<Payment[]>([])
  const [subscription, setSubscription] = useState<Subscription | null>(null)
  const [loading, setLoading] = useState(true)
  const [paymentModalOpen, setPaymentModalOpen] = useState(false)

  useEffect(() => {
    if (status === "loading") return
    
    if (!session) {
      router.push("/login")
      return
    }
  }, [session, status, router])

  useEffect(() => {
    if (session) {
      fetchPayments()
      fetchSubscription()
    }
  }, [session])

  const fetchPayments = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/payments")
      const data = await response.json()
      
      if (response.ok) {
        setPayments(data.payments)
      } else {
        toast.error(data.message || "Failed to fetch payments")
      }
    } catch (error) {
      console.error("Error fetching payments:", error)
    } finally {
      setLoading(false)
    }
  }

  const fetchSubscription = async () => {
    try {
      const response = await fetch("/api/subscriptions")
      const data = await response.json()
      
      if (response.ok) {
        setSubscription(data.subscription)
      }
    } catch (error) {
      console.error("Error fetching subscription:", error)
    }
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      COMPLETED: { label: "Paid", color: "bg-green-100 text-green-800", icon: CheckCircle },
      PENDING: { label: "Pending", color: "bg-yellow-100 text-yellow-800", icon: Clock },
      FAILED: { label: "Failed", color: "bg-red-100 text-red-800", icon: XCircle },
      PROCESSING: { label: "Processing", color: "bg-blue-100 text-blue-800", icon: Clock },
    }
    const variant = variants[status as keyof typeof variants] || variants.PENDING
    const Icon = variant.icon
    return (
      <Badge className={variant.color}>
        <Icon className="mr-1 h-3 w-3" />
        {variant.label}
      </Badge>
    )
  }

  const getPlanBadge = (plan: string) => {
    const variants = {
      MONTHLY: { label: "Monthly", color: "bg-blue-100 text-blue-800" },
      TERMLY: { label: "Termly", color: "bg-purple-100 text-purple-800" },
      YEARLY: { label: "Yearly", color: "bg-green-100 text-green-800" },
      LIFETIME: { label: "Lifetime", color: "bg-yellow-100 text-yellow-800" },
    }
    const variant = variants[plan as keyof typeof variants] || { label: plan, color: "bg-gray-100 text-gray-800" }
    return <Badge className={variant.color}>{variant.label}</Badge>
  }

  const handleMakePayment = async () => {
    setPaymentModalOpen(true)
  }

  const handlePaymentSuccess = () => {
    fetchPayments()
    fetchSubscription()
    toast.success("Payment successful!")
  }

  const totalPaid = payments
    .filter(p => p.status === "COMPLETED")
    .reduce((sum, p) => sum + p.amount, 0)

  const pendingPayments = payments.filter(p => p.status === "PENDING")

  if (status === "loading" || loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-purple-600 border-t-transparent" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Payments</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your subscription and payment history
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Statements
          </Button>
          <Button onClick={handleMakePayment}>
            <CreditCard className="mr-2 h-4 w-4" />
            Make Payment
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-6 sm:grid-cols-3">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Paid</p>
                <p className="text-3xl font-bold">{formatCurrency(totalPaid)}</p>
              </div>
              <div className="rounded-lg bg-green-100 p-3 dark:bg-green-900/30">
                <TrendingUp className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Pending</p>
                <p className="text-3xl font-bold">{pendingPayments.length}</p>
                <p className="text-sm text-gray-500">
                  {formatCurrency(pendingPayments.reduce((sum, p) => sum + p.amount, 0))}
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
                <p className="text-sm text-gray-600 dark:text-gray-400">Next Due</p>
                <p className="text-3xl font-bold">
                  {subscription ? formatDate(subscription.currentPeriodEnd) : "None"}
                </p>
              </div>
              <div className="rounded-lg bg-blue-100 p-3 dark:bg-blue-900/30">
                <Calendar className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Subscription Status */}
      {subscription && (
        <Card>
          <CardHeader>
            <CardTitle>Current Subscription</CardTitle>
            <CardDescription>
              Your active subscription details
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border border-gray-200 p-6 dark:border-gray-700">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Plan</span>
                    <div className="flex items-center space-x-2">
                      {getPlanBadge(subscription.plan)}
                      <Badge className={
                        subscription.status === "active" 
                          ? "bg-green-100 text-green-800" 
                          : "bg-red-100 text-red-800"
                      }>
                        {subscription.status}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Amount</span>
                    <span className="font-bold">{formatCurrency(subscription.amount, subscription.currency)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Billing Cycle</span>
                    <span className="font-medium capitalize">{subscription.plan.toLowerCase()}</span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Current Period</span>
                    <span className="font-medium">
                      {formatDate(subscription.currentPeriodStart)} - {formatDate(subscription.currentPeriodEnd)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Auto-renew</span>
                    <Badge className={
                      subscription.cancelAtPeriodEnd 
                        ? "bg-red-100 text-red-800" 
                        : "bg-green-100 text-green-800"
                    }>
                      {subscription.cancelAtPeriodEnd ? "Cancels at end" : "Active"}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Actions</span>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <Receipt className="mr-2 h-4 w-4" />
                        Invoice
                      </Button>
                      <Button size="sm" variant="outline">
                        <Repeat className="mr-2 h-4 w-4" />
                        Change Plan
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Payment History */}
      <Tabs defaultValue="all" className="space-y-6">
        <TabsList>
          <TabsTrigger value="all">All Payments</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="failed">Failed</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Payment History</CardTitle>
              <CardDescription>
                All your payment transactions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {payments.length === 0 ? (
                  <div className="text-center py-8">
                    <CreditCard className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-4 text-lg font-semibold">No payments found</h3>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">
                      Your payment history will appear here
                    </p>
                  </div>
                ) : (
                  payments.map((payment) => (
                    <div key={payment.id} className="flex items-center justify-between rounded-lg border border-gray-200 p-4 dark:border-gray-700">
                      <div className="flex items-center space-x-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900/30">
                          <Receipt className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                        </div>
                        <div>
                          <h4 className="font-medium">{payment.description}</h4>
                          <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                            <span>#{payment.invoiceNumber}</span>
                            <span>•</span>
                            <span>{payment.period}</span>
                            <span>•</span>
                            <span>{formatDate(payment.createdAt)}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="text-lg font-bold">
                          {formatCurrency(payment.amount, payment.currency)}
                        </div>
                        <div className="mt-2">
                          {getStatusBadge(payment.status)}
                        </div>
                        {payment.paidAt && (
                          <div className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                            Paid on {formatDate(payment.paidAt)}
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Payment Methods */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Methods</CardTitle>
          <CardDescription>
            Manage your saved payment methods
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30">
                    <CreditCard className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h4 className="font-medium">Visa ending in 4242</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Expires 12/2025 • Default
                    </p>
                  </div>
                </div>
                <Button size="sm" variant="outline">
                  Remove
                </Button>
              </div>
            </div>

            <Button variant="outline" className="w-full">
              <Plus className="mr-2 h-4 w-4" />
              Add Payment Method
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Payment Modal */}
      <PaymentModal
        open={paymentModalOpen}
        onOpenChange={setPaymentModalOpen}
        onSuccess={handlePaymentSuccess}
      />
    </div>
  )
}
