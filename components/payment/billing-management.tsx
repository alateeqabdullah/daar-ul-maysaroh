"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  CreditCard,
  Calendar,
  Download,
  AlertCircle,
  CheckCircle,
  Receipt,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";

interface BillingManagementProps {
  className?: string;
}

interface SubscriptionData {
  status: "active" | "canceled" | "past_due" | "incomplete";
  currentPeriodEnd: Date;
  plan: string;
  price: number;
  stripeSubscriptionId?: string;
}

interface PaymentHistory {
  id: string;
  date: string;
  amount: number;
  status: "paid" | "pending" | "failed";
  description: string;
  invoiceUrl?: string;
}

export function BillingManagement({ className }: BillingManagementProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  // Mock data - in real app, fetch from API
  const subscription: SubscriptionData = {
    status: "active",
    currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    plan: "Standard Plan",
    price: 89,
    stripeSubscriptionId: "sub_123",
  };

  const paymentHistory: PaymentHistory[] = [
    {
      id: "1",
      date: "2024-12-01",
      amount: 89,
      status: "paid",
      description: "Monthly Subscription - Standard Plan",
      invoiceUrl: "#",
    },
    {
      id: "2",
      date: "2024-11-01",
      amount: 89,
      status: "paid",
      description: "Monthly Subscription - Standard Plan",
      invoiceUrl: "#",
    },
    {
      id: "3",
      date: "2024-10-01",
      amount: 89,
      status: "paid",
      description: "Monthly Subscription - Standard Plan",
      invoiceUrl: "#",
    },
  ];

  const handleBillingPortal = async (): Promise<void> => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/billing/portal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const { success, url, error } = await response.json();

      if (success && url) {
        window.location.href = url;
      } else {
        console.error("Billing portal error:", error);
        alert("Failed to access billing portal. Please try again.");
      }
    } catch (error) {
      console.error("Billing portal error:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusConfig = (status: SubscriptionData["status"]) => {
    switch (status) {
      case "active":
        return {
          color: "bg-green-100 text-green-800",
          icon: CheckCircle,
          label: "Active",
        };
      case "canceled":
        return {
          color: "bg-red-100 text-red-800",
          icon: AlertCircle,
          label: "Canceled",
        };
      case "past_due":
        return {
          color: "bg-yellow-100 text-yellow-800",
          icon: AlertCircle,
          label: "Past Due",
        };
      case "incomplete":
        return {
          color: "bg-blue-100 text-blue-800",
          icon: AlertCircle,
          label: "Incomplete",
        };
      default:
        return {
          color: "bg-gray-100 text-gray-800",
          icon: AlertCircle,
          label: "Unknown",
        };
    }
  };

  const statusConfig = getStatusConfig(subscription.status);
  const StatusIcon = statusConfig.icon;

  return (
    <div className={className}>
      <div className="space-y-6">
        {/* Current Plan */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-xl border shadow-sm p-6"
        >
          <h3 className="text-lg font-heading font-bold mb-6">Current Plan</h3>

          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="font-semibold text-card-foreground text-lg">
                {subscription.plan}
              </h4>
              <p className="text-muted-foreground">
                ${subscription.price}/month
              </p>
            </div>

            <div
              className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium ${statusConfig.color}`}
            >
              <StatusIcon className="w-4 h-4" />
              <span>{statusConfig.label}</span>
            </div>
          </div>

          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span>
              {subscription.status === "active" ? "Renews" : "Ends"} on{" "}
              {subscription.currentPeriodEnd.toLocaleDateString()}
            </span>
          </div>
        </motion.div>

        {/* Billing Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card rounded-xl border shadow-sm p-6"
        >
          <h3 className="text-lg font-heading font-bold mb-6">
            Billing Management
          </h3>

          <div className="space-y-4">
            <Button
              onClick={handleBillingPortal}
              disabled={isLoading}
              className="w-full justify-start"
              variant="outline"
            >
              <CreditCard className="w-4 h-4 mr-3" />
              Manage Payment Methods
            </Button>

            <Button
              onClick={handleBillingPortal}
              disabled={isLoading}
              className="w-full justify-start"
              variant="outline"
            >
              <Download className="w-4 h-4 mr-3" />
              Download Invoices
            </Button>

            <Button
              onClick={handleBillingPortal}
              disabled={isLoading}
              className="w-full justify-start"
              variant="outline"
            >
              <Calendar className="w-4 h-4 mr-3" />
              Update Subscription
            </Button>
          </div>

          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-700">
              Need help with billing? Contact our support team at{" "}
              <a
                href="mailto:support@almaysaroh.com"
                className="font-medium underline"
              >
                support@almaysaroh.com
              </a>
            </p>
          </div>
        </motion.div>

        {/* Payment History */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card rounded-xl border shadow-sm p-6"
        >
          <h3 className="text-lg font-heading font-bold mb-6">
            Payment History
          </h3>

          <div className="space-y-4">
            {paymentHistory.map((payment, index) => (
              <div
                key={payment.id}
                className="flex items-center justify-between p-3 border rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <Receipt className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium text-card-foreground">
                      {new Date(payment.date).toLocaleDateString("en-US", {
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {payment.description}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-card-foreground">
                    ${payment.amount}
                  </p>
                  <p
                    className={`text-sm ${
                      payment.status === "paid"
                        ? "text-green-600"
                        : payment.status === "pending"
                          ? "text-yellow-600"
                          : "text-red-600"
                    }`}
                  >
                    {payment.status.charAt(0).toUpperCase() +
                      payment.status.slice(1)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {paymentHistory.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <Receipt className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>No payment history available</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

// // src/components/payment/billing-management.tsx
// "use client";

// import { useState } from "react";
// import { motion } from "framer-motion";
// import {
//   CreditCard,
//   Calendar,
//   Download,
//   AlertCircle,
//   CheckCircle,
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { useAuth } from "@/hooks/use-auth";

// export function BillingManagement() {
//   const { user } = useAuth();
//   const [isLoading, setIsLoading] = useState(false);

//   const handleBillingPortal = async () => {
//     setIsLoading(true);
//     try {
//       const response = await fetch("/api/billing/portal", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });

//       const { success, url, error } = await response.json();

//       if (success && url) {
//         window.location.href = url;
//       } else {
//         console.error("Billing portal error:", error);
//         alert("Failed to access billing portal. Please try again.");
//       }
//     } catch (error) {
//       console.error("Billing portal error:", error);
//       alert("An error occurred. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Mock subscription data - in real app, fetch from API
//   const subscription = {
//     status: "active",
//     currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
//     plan: "Standard Plan",
//     price: 89,
//   };

//   return (
//     <div className="space-y-6">
//       {/* Current Plan */}
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="bg-card rounded-xl border shadow-sm p-6"
//       >
//         <h3 className="text-lg font-heading font-bold mb-6">Current Plan</h3>

//         <div className="flex items-center justify-between mb-4">
//           <div>
//             <h4 className="font-semibold text-card-foreground text-lg">
//               {subscription.plan}
//             </h4>
//             <p className="text-muted-foreground">${subscription.price}/month</p>
//           </div>

//           <div
//             className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium ${
//               subscription.status === "active"
//                 ? "bg-green-100 text-green-800"
//                 : "bg-yellow-100 text-yellow-800"
//             }`}
//           >
//             {subscription.status === "active" ? (
//               <>
//                 <CheckCircle className="w-4 h-4" />
//                 <span>Active</span>
//               </>
//             ) : (
//               <>
//                 <AlertCircle className="w-4 h-4" />
//                 <span>Inactive</span>
//               </>
//             )}
//           </div>
//         </div>

//         <div className="flex items-center space-x-2 text-sm text-muted-foreground">
//           <Calendar className="w-4 h-4" />
//           <span>
//             Renews on {subscription.currentPeriodEnd.toLocaleDateString()}
//           </span>
//         </div>
//       </motion.div>

//       {/* Billing Actions */}
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.1 }}
//         className="bg-card rounded-xl border shadow-sm p-6"
//       >
//         <h3 className="text-lg font-heading font-bold mb-6">
//           Billing Management
//         </h3>

//         <div className="space-y-4">
//           <Button
//             onClick={handleBillingPortal}
//             disabled={isLoading}
//             className="w-full justify-start"
//             variant="outline"
//           >
//             <CreditCard className="w-4 h-4 mr-3" />
//             Manage Payment Methods
//           </Button>

//           <Button
//             onClick={handleBillingPortal}
//             disabled={isLoading}
//             className="w-full justify-start"
//             variant="outline"
//           >
//             <Download className="w-4 h-4 mr-3" />
//             Download Invoices
//           </Button>

//           <Button
//             onClick={handleBillingPortal}
//             disabled={isLoading}
//             className="w-full justify-start"
//             variant="outline"
//           >
//             <Calendar className="w-4 h-4 mr-3" />
//             Update Subscription
//           </Button>
//         </div>

//         <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
//           <p className="text-sm text-blue-700">
//             Need help with billing? Contact our support team at{" "}
//             <a
//               href="mailto:support@almaysaroh.com"
//               className="font-medium underline"
//             >
//               support@almaysaroh.com
//             </a>
//           </p>
//         </div>
//       </motion.div>

//       {/* Payment History */}
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.2 }}
//         className="bg-card rounded-xl border shadow-sm p-6"
//       >
//         <h3 className="text-lg font-heading font-bold mb-6">Payment History</h3>

//         <div className="space-y-4">
//           {[
//             { date: "2024-12-01", amount: 89, status: "Paid" },
//             { date: "2024-11-01", amount: 89, status: "Paid" },
//             { date: "2024-10-01", amount: 89, status: "Paid" },
//           ].map((payment, index) => (
//             <div
//               key={index}
//               className="flex items-center justify-between p-3 border rounded-lg"
//             >
//               <div>
//                 <p className="font-medium text-card-foreground">
//                   {new Date(payment.date).toLocaleDateString("en-US", {
//                     month: "long",
//                     year: "numeric",
//                   })}
//                 </p>
//                 <p className="text-sm text-muted-foreground">
//                   Monthly Subscription
//                 </p>
//               </div>
//               <div className="text-right">
//                 <p className="font-semibold text-card-foreground">
//                   ${payment.amount}
//                 </p>
//                 <p className="text-sm text-green-600">{payment.status}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </motion.div>
//     </div>
//   );
// }
