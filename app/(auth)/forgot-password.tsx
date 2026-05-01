"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, ArrowLeft, Loader2, CheckCircle2, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type ForgotPasswordData = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordData) => {
    setIsLoading(true);
    try {
      // Mocking API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("Reset link sent to:", data.email);
      setIsSubmitted(true);
      toast.success("Reset link sent!");
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-purple-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <Link
          href="/login"
          className="group flex items-center gap-2 text-slate-500 hover:text-purple-600 transition-colors mb-6 font-semibold text-sm"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to Login
        </Link>

        <Card className="border-none shadow-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl overflow-hidden">
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.div
                key="request"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                <CardHeader className="space-y-2 text-center pt-10">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-100 text-purple-600 dark:bg-purple-900/30">
                    <Send className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-2xl font-bold">
                    Forgot Password?
                  </CardTitle>
                  <CardDescription>
                  {`  Enter your email and we'll send you a link to reset your
                    password.`}
                  </CardDescription>
                </CardHeader>

                <form onSubmit={handleSubmit(onSubmit)}>
                  <CardContent className="space-y-4 pt-4">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-semibold">
                        Email Address
                      </Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="name@example.com"
                          className={cn(
                            "pl-10 h-11 rounded-xl border-slate-200",
                            errors.email && "border-red-500"
                          )}
                          {...register("email")}
                        />
                      </div>
                      {errors.email && (
                        <p className="text-xs text-red-500 font-medium">
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter className="pb-10 pt-4">
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="w-full h-12 bg-purple-600 hover:bg-purple-700 font-bold rounded-xl shadow-lg shadow-purple-200 dark:shadow-none transition-all active:scale-[0.98]"
                    >
                      {isLoading ? (
                        <Loader2 className="h-5 w-5 animate-spin" />
                      ) : (
                        "Send Reset Link"
                      )}
                    </Button>
                  </CardFooter>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center p-10 space-y-6"
              >
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900/30">
                  <CheckCircle2 className="h-10 w-10" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold">Check your email</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">
                 {`   We've sent a password reset link to your email address.
                    Please check your inbox (and spam folder).`}
                  </p>
                </div>
                <Button
                  variant="outline"
                  onClick={() => setIsSubmitted(false)}
                  className="w-full h-11 rounded-xl border-slate-200 font-semibold"
                >
                 {` Didn't get the email? Try again`}
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>
      </div>
    </div>
  );
}
