"use client";

import { useState } from "react";
import { CreditCard, Loader, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { cn } from "@/lib/utils";

interface StripeCheckoutButtonProps {
  priceId: string;
  courseId: string;
  children: React.ReactNode;
  className?: string;
  size?: "default" | "sm" | "lg" | "icon";
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
}

export function StripeCheckoutButton({
  priceId,
  courseId,
  children,
  className,
  size = "default",
  variant = "default",
}: StripeCheckoutButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { isAuthenticated } = useAuth();

  const handleCheckout = async (): Promise<void> => {
    if (!isAuthenticated) {
      window.location.href = `/auth/signin?callbackUrl=${encodeURIComponent(window.location.href)}`;
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          priceId,
          courseId,
          successUrl: `${window.location.origin}/dashboard?payment=success`,
          cancelUrl: `${window.location.origin}/courses`,
        }),
      });

      const { success, url, error } = await response.json();

      if (success && url) {
        window.location.href = url;
      } else {
        console.error("Checkout error:", error);
        alert(error || "Failed to start checkout. Please try again.");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handleCheckout}
      disabled={isLoading}
      className={cn("relative overflow-hidden", className)}
      size={size}
      variant={variant}
    >
      {isLoading ? (
        <>
          <Loader className="w-4 h-4 mr-2 animate-spin" />
          Processing...
        </>
      ) : (
        <>
          <Lock className="w-4 h-4 mr-2" />
          {children}
        </>
      )}

      {/* Secure payment badge */}
      <div className="absolute -bottom-6 -right-6 w-12 h-12 bg-green-500 rotate-45 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
    </Button>
  );
}

// // src/components/payment/stripe-checkout-button.tsx
// "use client";

// import { useState } from "react";
// import { loadStripe } from "@stripe/stripe-js";
// import { Button } from "@/components/ui/button";
// import { CreditCard, Loader } from "lucide-react";
// import { useAuth } from "@/hooks/use-auth";

// const stripePromise = loadStripe(
//   process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
// );

// interface StripeCheckoutButtonProps {
//   priceId: string;
//   courseId: string;
//   children: React.ReactNode;
//   className?: string;
// }

// export function StripeCheckoutButton({
//   priceId,
//   courseId,
//   children,
//   className,
// }: StripeCheckoutButtonProps) {
//   const [isLoading, setIsLoading] = useState(false);
//   const { isAuthenticated } = useAuth();

//   const handleCheckout = async () => {
//     if (!isAuthenticated) {
//       // Redirect to sign in
//       window.location.href = "/auth/signin";
//       return;
//     }

//     setIsLoading(true);

//     try {
//       const response = await fetch("/api/checkout", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           priceId,
//           courseId,
//           successUrl: `${window.location.origin}/dashboard?payment=success`,
//           cancelUrl: `${window.location.origin}/courses/${courseId}`,
//         }),
//       });

//       const { success, url, error } = await response.json();

//       if (success && url) {
//         window.location.href = url;
//       } else {
//         console.error("Checkout error:", error);
//         alert("Failed to start checkout. Please try again.");
//       }
//     } catch (error) {
//       console.error("Checkout error:", error);
//       alert("An error occurred. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <Button
//       onClick={handleCheckout}
//       disabled={isLoading}
//       className={className}
//       size="lg"
//     >
//       {isLoading ? (
//         <>
//           <Loader className="w-4 h-4 mr-2 animate-spin" />
//           Processing...
//         </>
//       ) : (
//         <>
//           <CreditCard className="w-4 h-4 mr-2" />
//           {children}
//         </>
//       )}
//     </Button>
//   );
// }
