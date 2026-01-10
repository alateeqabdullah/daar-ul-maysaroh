"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
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
import { LockKeyhole, Eye, EyeOff, Loader2, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

// Schema for password validation
const resetPasswordSchema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type ResetPasswordData = z.infer<typeof resetPasswordSchema>;

export default function ResetPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [strength, setStrength] = useState(0);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ResetPasswordData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const password = watch("password", "");

  // Password Strength Logic
  useEffect(() => {
    let score = 0;
    if (password.length > 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    setStrength(score);
  }, [password]);

  const onSubmit = async (data: ResetPasswordData) => {
    setIsLoading(true);
    try {
      // Mocking API call to update password
      await new Promise((resolve) => setTimeout(resolve, 2000));
      toast.success("Password updated successfully!");
      router.push("/login");
    } catch (error) {
      toast.error("Failed to reset password. Link may have expired.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-purple-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <Card className="border-none shadow-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl overflow-hidden">
          <CardHeader className="space-y-1 text-center pt-10">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100 text-green-600 dark:bg-green-900/30">
              <LockKeyhole className="h-6 w-6" />
            </div>
            <CardTitle className="text-2xl font-bold">New Password</CardTitle>
            <CardDescription>
             {` Please enter a strong password you haven't used before.`}
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
              {/* New Password Field */}
              <div className="space-y-2">
                <Label className="text-sm font-semibold">New Password</Label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    className={cn(
                      "pr-10 h-11 rounded-xl",
                      errors.password && "border-red-500"
                    )}
                    {...register("password")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>

                {/* Strength Meter */}
                <div className="flex gap-1 mt-2">
                  {[1, 2, 3, 4].map((step) => (
                    <div
                      key={step}
                      className={cn(
                        "h-1.5 w-full rounded-full transition-all duration-500",
                        strength >= step
                          ? "bg-green-500"
                          : "bg-slate-200 dark:bg-slate-800"
                      )}
                    />
                  ))}
                </div>
              </div>

              {/* Confirm Password Field */}
              <div className="space-y-2">
                <Label className="text-sm font-semibold">
                  Confirm Password
                </Label>
                <Input
                  type="password"
                  className={cn(
                    "h-11 rounded-xl",
                    errors.confirmPassword && "border-red-500"
                  )}
                  {...register("confirmPassword")}
                />
                {errors.confirmPassword && (
                  <p className="text-xs text-red-500 font-medium">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
            </CardContent>

            <CardFooter className="pb-10 pt-4">
              <Button
                type="submit"
                disabled={isLoading || strength < 3}
                className="w-full h-12 bg-slate-900 hover:bg-black text-white font-bold rounded-xl transition-all active:scale-[0.98] disabled:opacity-50"
              >
                {isLoading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  "Update Password"
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
