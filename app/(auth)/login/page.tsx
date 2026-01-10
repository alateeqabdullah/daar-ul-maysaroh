"use client";

import { useState, useEffect, Suspense } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
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
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import {
  Loader2,
  Mail,
  Lock,
  BookOpen,
  AlertCircle,
  Eye,
  EyeOff,
} from "lucide-react";
import { cn } from "@/lib/utils";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
  rememberMe: z.boolean().default(false),
});

type LoginFormData = z.infer<typeof loginSchema>;

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "", rememberMe: false },
  });

  useEffect(() => {
    const saved = localStorage.getItem("rememberedEmail");
    if (saved) {
      setValue("email", saved);
      setValue("rememberMe", true);
    }
  }, [setValue]);

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setError(null);

    try {
      if (data.rememberMe) localStorage.setItem("rememberedEmail", data.email);
      else localStorage.removeItem("rememberedEmail");

      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
        callbackUrl,
      });

      if (result?.error) {
        const msg = result.error.includes("CredentialsSignin")
          ? "Invalid email or password"
          : "An error occurred during sign in";
        setError(msg);
        toast.error(msg);
      } else {
        toast.success("Welcome back!", {
          description: "Redirecting to your dashboard...",
        });
        router.push(callbackUrl);
        router.refresh();
      }
    } catch (err) {
      setError("Network error. Please check your connection.");
    } finally {
      setIsLoading(false);
    }
  };

  // Shake animation variant for errors
  const shakeVariants = {
    shake: {
      x: [-2, 2, -2, 2, 0],
      transition: { duration: 0.4 },
    },
  };

  return (
    <Card className="border-none shadow-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl overflow-hidden">
      <CardHeader className="space-y-2 text-center pt-10 pb-6 bg-gradient-to-b from-purple-50/50 to-transparent dark:from-purple-900/10">
        <CardTitle className="text-3xl font-extrabold tracking-tight text-slate-800 dark:text-white">
          Welcome Back
        </CardTitle>
        <CardDescription className="text-base font-medium">
          Enter your credentials to access your portal
        </CardDescription>
      </CardHeader>

      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="p-8 pt-2 space-y-6">
          <AnimatePresence mode="wait">
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex items-center gap-3 rounded-xl bg-red-50 dark:bg-red-950/30 p-4 text-red-600 dark:text-red-400 border border-red-100 dark:border-red-900"
              >
                <AlertCircle className="h-5 w-5 shrink-0" />
                <p className="text-sm font-bold leading-tight">{error}</p>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div
            className="space-y-2"
            animate={errors.email ? "shake" : ""}
            variants={shakeVariants}
          >
            <Label className="text-sm font-semibold">Email Address</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
              <Input
                {...register("email")}
                type="email"
                placeholder="abdullah@ilm.com"
                className={cn(
                  "pl-10 h-11 border-slate-200 transition-all focus:ring-2 focus:ring-purple-500/20",
                  errors.email && "border-red-500 ring-red-500/10"
                )}
                disabled={isLoading}
              />
            </div>
            {errors.email && (
              <p className="text-xs text-red-500 font-medium">
                {errors.email.message}
              </p>
            )}
          </motion.div>

          <motion.div
            className="space-y-2"
            animate={errors.password ? "shake" : ""}
            variants={shakeVariants}
          >
            <div className="flex items-center justify-between">
              <Label className="text-sm font-semibold">Password</Label>
              <Link
                href="/forgot-password"
                className="text-xs text-purple-600 hover:text-purple-700 font-bold transition-all hover:underline"
              >
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
              <Input
                {...register("password")}
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className={cn(
                  "pl-10 pr-10 h-11 border-slate-200 transition-all focus:ring-2 focus:ring-purple-500/20",
                  errors.password && "border-red-500 ring-red-500/10"
                )}
                disabled={isLoading}
              />
              <button
                type="button"
                tabIndex={-1}
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-slate-400 hover:text-purple-600 transition-colors"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={showPassword ? "eye-off" : "eye-on"}
                    initial={{ opacity: 0, rotate: -45 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: 45 }}
                    transition={{ duration: 0.15 }}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </motion.div>
                </AnimatePresence>
              </button>
            </div>
          </motion.div>

          <div className="flex items-center space-x-3 p-3 bg-slate-50/50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800 transition-colors hover:bg-slate-100/50 dark:hover:bg-slate-800/80">
            <Controller
              name="rememberMe"
              control={control}
              render={({ field }) => (
                <Checkbox
                  id="rememberMe"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  disabled={isLoading}
                />
              )}
            />
            <Label
              htmlFor="rememberMe"
              className="text-xs font-bold text-slate-700 dark:text-slate-300 cursor-pointer select-none grow"
            >
              Keep me logged in for 30 days
            </Label>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-5 p-8 pt-0">
          <Button
            type="submit"
            className="w-full h-12 bg-purple-600 hover:bg-purple-700 font-extrabold shadow-lg shadow-purple-200 dark:shadow-none transition-all active:scale-[0.98] group"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <span className="flex items-center gap-2">Sign In to Portal</span>
            )}
          </Button>

          <p className="text-sm text-center text-slate-500 font-medium">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="text-purple-600 font-bold hover:underline ml-1 transition-all"
            >
              Create Account
            </Link>
          </p>
        </CardFooter>
      </form>
    </Card>
  );
}

export default function LoginPage() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-indigo-100 via-white to-purple-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 overflow-hidden">
      {/* Background Aura Animations */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <motion.div
          animate={{ x: [0, 40, 0], y: [0, 60, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] rounded-full bg-purple-200/30 dark:bg-purple-900/10 blur-[120px]"
        />
        <motion.div
          animate={{ x: [0, -40, 0], y: [0, -60, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-[10%] -right-[10%] w-[50%] h-[50%] rounded-full bg-indigo-200/30 dark:bg-indigo-900/10 blur-[120px]"
        />
      </div>

      <div className="container mx-auto flex items-center justify-center px-4 py-12 min-h-screen relative z-10">
        <div className="w-full max-w-md space-y-8">
          {/* Header/Logo Section */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center text-center"
          >
            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-purple-600 text-white shadow-xl rotate-3 hover:rotate-0 transition-transform duration-500">
              <BookOpen className="h-10 w-10" />
            </div>
            <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white uppercase">
              Daar-Ul-Maysaroh
            </h1>
            <p className="text-slate-500 dark:text-slate-400 mt-2 font-bold uppercase tracking-widest text-[10px]">
              Institution Management System
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
          >
            <Suspense
              fallback={
                <div className="h-[450px] w-full bg-white/50 dark:bg-slate-800/50 animate-pulse rounded-3xl" />
              }
            >
              <LoginForm />
            </Suspense>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-center text-[11px] text-slate-400 font-bold uppercase tracking-widest"
          >
            &copy; {new Date().getFullYear()} Daar-Ul-Maysaroh &bull; Secure
            Access
          </motion.p>
        </div>
      </div>
    </div>
  );
}
