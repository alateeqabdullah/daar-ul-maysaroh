"use client";

import { useState, useEffect, Suspense, useRef } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal } from "@/components/shared/section-animation";
import { Button } from "@/components/ui/button";
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
  Sparkles,
  Shield,
  ArrowRight,
  BookMarked,
  GraduationCap,
} from "lucide-react";
import { cn } from "@/lib/utils";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
  rememberMe: z.boolean().default(false),
  website: z.string().optional(),
});

type LoginFormData = z.infer<typeof loginSchema>;

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";
  const emailInputRef = useRef<HTMLInputElement>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loginAttempts, setLoginAttempts] = useState(0);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
      website: "",
    },
  });

  useEffect(() => {
    const saved = localStorage.getItem("rememberedEmail");
    if (saved) {
      setValue("email", saved);
      setValue("rememberMe", true);
    }

    // Auto-focus email field on mount
    setTimeout(() => {
      emailInputRef.current?.focus();
    }, 100);
  }, [setValue]);

  const onSubmit = async (data: LoginFormData) => {
    if (data.website) return;

    if (loginAttempts >= 5) {
      setError("Too many attempts. Please try again in 15 minutes.");
      toast.error("Too many login attempts");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      if (data.rememberMe) {
        localStorage.setItem("rememberedEmail", data.email);
      } else {
        localStorage.removeItem("rememberedEmail");
      }

      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
        callbackUrl,
      });

      if (result?.error) {
        setLoginAttempts((prev) => prev + 1);
        const errorMessages: Record<string, string> = {
          CredentialsSignin: "Invalid email or password",
          AccessDenied: "Your account needs activation",
          OAuthAccountNotLinked: "Account not linked",
        };

        const msg =
          errorMessages[result.error] || "An error occurred during sign in";
        setError(msg);
        toast.error(msg);
      } else {
        setLoginAttempts(0);
        toast.success("Welcome back!", {
          description: "Redirecting to your dashboard...",
        });
        router.push(callbackUrl);
        router.refresh();
      }
    } catch (err) {
      setError("Network error. Please check your connection.");
      toast.error("Network error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="glass-surface border border-primary-700/20 rounded-3xl sm:rounded-[2.5rem] overflow-hidden w-full max-w-[95vw] sm:max-w-lg shadow-xl sm:shadow-2xl relative">
      {/* Mobile-optimized background elements */}
      <div className="absolute top-0 right-0 w-16 h-16 sm:w-32 sm:h-32 bg-linear-to-bl from-primary-500/5 to-transparent rounded-full blur-lg sm:blur-xl -translate-y-8 sm:-translate-y-16 translate-x-8 sm:translate-x-16" />
      <div className="absolute bottom-0 left-0 w-16 h-16 sm:w-32 sm:h-32 bg-linear-to-tr from-primary-500/5 to-transparent rounded-full blur-lg sm:blur-xl translate-y-8 sm:translate-y-16 -translate-x-8 sm:-translate-x-16" />

      <div className="relative z-10">
        {/* Header - Mobile optimized spacing */}
        <div className="pt-6 sm:pt-8 md:pt-10 pb-4 sm:pb-6 px-4 sm:px-6 md:px-8 text-center border-b border-border/30">
          <Reveal>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-primary-700/10 border border-primary-700/20 mb-4 sm:mb-6">
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-primary-700" />
              <span className="text-[10px] sm:text-[11px] font-black text-primary-700 uppercase tracking-wider sm:tracking-[0.3em]">
                SCHOLAR PORTAL
              </span>
              <Shield className="w-3 h-3 sm:w-4 sm:h-4 text-primary-700" />
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tighter font-heading mb-2 sm:mb-3">
              <span className="text-primary-700 italic">Sacred</span> Knowledge
              <br />
              Portal
            </h1>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="text-xs sm:text-sm text-muted-foreground font-medium px-2">
              Enter your credentials to access your learning journey
            </p>
          </Reveal>
        </div>

        {/* Form - Mobile optimized padding and spacing */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-4 sm:p-6 md:p-8">
          {/* Honeypot - Hidden but accessible for screen readers */}
          <div className="sr-only">
            <Label htmlFor="website">Website</Label>
            <Input
              {...register("website")}
              id="website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
            />
          </div>

          {/* Error Display - Mobile optimized */}
          <AnimatePresence mode="wait">
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="mb-4 sm:mb-6 p-3 sm:p-4 rounded-lg sm:rounded-xl bg-linear-to-r from-red-50/50 to-red-100/30 dark:from-red-950/20 dark:to-red-900/10 border border-red-200 dark:border-red-900/30"
                role="alert"
              >
                <div className="flex items-start gap-2 sm:gap-3">
                  <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
                  <p className="text-xs sm:text-sm font-black text-red-700 dark:text-red-300 leading-tight">
                    {error}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="space-y-4 sm:space-y-6">
            {/* Email Field - Fixed selection issue */}
            <Reveal delay={0.3}>
              <div className="space-y-2 sm:space-y-3">
                <Label
                  htmlFor="email"
                  className="text-xs font-black uppercase tracking-widest text-primary-700"
                >
                  INSTITUTIONAL EMAIL
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 sm:left-4 top-3 sm:top-3.5 h-4 w-4 sm:h-5 sm:w-5 text-primary-700 z-10" />
                  <Input
                    {...register("email")}
                    ref={emailInputRef}
                    id="email"
                    type="email"
                    placeholder="student@almaysaroh.edu"
                    className={cn(
                      "pl-9 sm:pl-12 h-11 sm:h-12 border border-border bg-background text-sm sm:text-base font-medium",
                      "focus:border-primary-700 focus:ring-2 focus:ring-primary-500/20 transition-all",
                      "rounded-lg sm:rounded-xl",
                      errors.email && "border-red-500 focus:border-red-500",
                    )}
                    disabled={isLoading}
                    aria-describedby={errors.email ? "email-error" : undefined}
                  />
                </div>
                {errors.email && (
                  <p
                    id="email-error"
                    className="text-xs text-red-500 font-black mt-1"
                  >
                    {errors.email.message}
                  </p>
                )}
              </div>
            </Reveal>

            {/* Password Field - Fixed selection issue */}
            <Reveal delay={0.4}>
              <div className="space-y-2 sm:space-y-3">
                <div className="flex items-center justify-between">
                  <Label
                    htmlFor="password"
                    className="text-xs font-black uppercase tracking-widest text-primary-700"
                  >
                    SECURE PASSWORD
                  </Label>
                  <Link
                    href="/forgot-password"
                    className="text-xs text-primary-700 hover:text-primary-800 font-black transition-all hover:underline"
                  >
                    FORGOT?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 sm:left-4 top-3 sm:top-3.5 h-4 w-4 sm:h-5 sm:w-5 text-primary-700 z-10" />
                  <Input
                    {...register("password")}
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className={cn(
                      "pl-9 sm:pl-12 pr-10 sm:pr-12 h-11 sm:h-12 border border-border bg-background text-sm sm:text-base font-medium",
                      "focus:border-primary-700 focus:ring-2 focus:ring-primary-500/20 transition-all",
                      "rounded-lg sm:rounded-xl",
                      errors.password && "border-red-500 focus:border-red-500",
                    )}
                    disabled={isLoading}
                    aria-describedby={
                      errors.password ? "password-error" : undefined
                    }
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 sm:right-4 top-3 sm:top-3.5 text-primary-700 hover:text-primary-800 transition-colors p-1 rounded focus:outline-none focus:ring-2 focus:ring-primary-500/50"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    disabled={isLoading}
                    tabIndex={0}
                  >
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.div
                        key={showPassword ? "eye-off" : "eye-on"}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.15 }}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 sm:h-5 sm:w-5" />
                        ) : (
                          <Eye className="h-4 w-4 sm:h-5 sm:w-5" />
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </button>
                </div>
                {errors.password && (
                  <p
                    id="password-error"
                    className="text-xs text-red-500 font-black mt-1"
                  >
                    {errors.password.message}
                  </p>
                )}
              </div>
            </Reveal>

            {/* Remember Me - Mobile optimized */}
            <Reveal delay={0.5}>
              <div className="flex items-center gap-3 p-3 sm:p-4 rounded-lg sm:rounded-xl bg-muted/50 border border-border">
                <Controller
                  name="rememberMe"
                  control={control}
                  render={({ field }) => (
                    <Checkbox
                      id="rememberMe"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled={isLoading}
                      className="h-4 w-4 sm:h-5 sm:w-5 data-[state=checked]:bg-primary-700 data-[state=checked]:border-primary-700"
                    />
                  )}
                />
                <Label
                  htmlFor="rememberMe"
                  className="text-xs sm:text-sm font-black text-foreground cursor-pointer select-none grow leading-tight"
                >
                  Keep me signed in on this device
                </Label>
              </div>
            </Reveal>

            {/* Submit Button - Mobile optimized */}
            <Reveal delay={0.6}>
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-11 sm:h-12 md:h-14 rounded-full font-black bg-primary-700 hover:bg-primary-800 text-white shadow-lg hover:shadow-xl transition-all duration-300 group relative overflow-hidden min-h-11"
              >
                <span className="relative z-10 flex items-center justify-center gap-2 sm:gap-3 text-sm sm:text-base">
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 sm:h-5 sm:w-5 animate-spin" />
                      <span>ACCESSING...</span>
                    </>
                  ) : (
                    <>
                      <span>ACCESS PORTAL</span>
                      <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 transition-transform duration-300 group-hover:translate-x-1 sm:group-hover:translate-x-2" />
                    </>
                  )}
                </span>
              </Button>
            </Reveal>
          </div>
        </form>

        {/* Footer - Mobile optimized */}
        <div className="px-4 sm:px-6 md:px-8 pb-6 sm:pb-8 pt-3 sm:pt-4 border-t border-border/30">
          <Reveal delay={0.7}>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
              <p className="text-xs sm:text-sm text-muted-foreground font-medium text-center sm:text-left">
                Need an institutional account?
              </p>
              <Link href="/register" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  className="w-full rounded-full px-4 sm:px-6 py-2.5 sm:py-3 font-black border border-primary-700/30 hover:bg-primary-700/10 text-xs sm:text-sm min-h-11"
                >
                  <span className="flex items-center gap-1.5 sm:gap-2">
                    <BookMarked className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    REQUEST ACCESS
                  </span>
                </Button>
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setReducedMotion(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    );
  }, []);

  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      {/* Mobile-optimized background */}
      <div className="absolute inset-0 bg-linear-to-b from-background via-background to-primary-50/5 dark:to-primary-950/10" />

      {/* Subtle pattern - lighter on mobile */}
      <div className="absolute inset-0 opacity-[0.01] sm:opacity-[0.015] bg-[url('/islamic-pattern.svg')] bg-center bg-repeat bg-size-[200px] sm:bg-size-[300px]" />

      {/* Mobile-optimized floating elements */}
      {!reducedMotion && (
        <>
          <div className="absolute top-10 left-4 w-40 h-40 sm:w-64 sm:h-64 bg-linear-to-br from-primary-700/5 to-transparent rounded-full blur-2xl sm:blur-3xl" />
          <div className="absolute bottom-10 right-4 w-48 h-48 sm:w-96 sm:h-96 bg-linear-to-tl from-primary-700/5 to-transparent rounded-full blur-2xl sm:blur-3xl" />
        </>
      )}

      {/* Main Content - Mobile optimized */}
      <div className="container mx-auto flex items-center justify-center px-3 sm:px-4 py-4 sm:py-6 md:py-8 min-h-screen relative z-10">
        <div className="w-full max-w-full sm:max-w-lg space-y-4 sm:space-y-6 md:space-y-8">
          {/* Institutional Header - Mobile optimized */}
          <Reveal>
            <div className="flex flex-col items-center text-center space-y-3 sm:space-y-4">
              <Link href="/" className="group" aria-label="Al-Maysaroh Home">
                <div className="mx-auto mb-3 sm:mb-4 flex h-14 w-14 sm:h-16 sm:w-16 md:h-20 md:w-20 items-center justify-center rounded-xl sm:rounded-2xl bg-linear-to-br from-primary-700 to-primary-800 text-white shadow-lg sm:shadow-xl group-hover:rotate-3 sm:group-hover:rotate-6 transition-transform duration-300">
                  <BookOpen className="h-7 w-7 sm:h-8 sm:w-8 md:h-10 md:w-10" />
                </div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tighter font-heading text-foreground uppercase leading-tight">
                  AL-MAYSAROH
                </h1>
                <div className="flex items-center justify-center gap-1.5 sm:gap-2 mt-2">
                  <div className="h-px w-4 sm:w-6 bg-linear-to-r from-transparent to-primary-700" />
                  <p className="text-primary-700 font-black uppercase tracking-wider sm:tracking-[0.3em] text-[9px] sm:text-[10px] md:text-[11px]">
                    INTERNATIONAL INSTITUTE
                  </p>
                  <div className="h-px w-4 sm:w-6 bg-linear-to-l from-transparent to-primary-700" />
                </div>
              </Link>
            </div>
          </Reveal>

          {/* Login Card */}
          <Suspense
            fallback={
              <div className="glass-surface border border-primary-700/20 rounded-3xl h-[500px] sm:h-[550px] animate-pulse" />
            }
          >
            <LoginForm />
          </Suspense>

          {/* Security Footer - Mobile optimized */}
          <Reveal delay={0.8}>
            <div className="text-center space-y-3 sm:space-y-4">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-xs sm:text-sm text-muted-foreground font-medium">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <Shield className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary-700" />
                  <span>End-to-End Encrypted</span>
                </div>
                <div className="hidden sm:block h-4 w-px bg-border" />
                <div className="sm:hidden h-px w-16 bg-border/50 mx-auto" />
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <GraduationCap className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary-700" />
                  <span>Academic Integrity</span>
                </div>
              </div>

              <p className="text-[9px] sm:text-[10px] text-muted-foreground font-black uppercase tracking-wider sm:tracking-[0.3em]">
                &copy; {new Date().getFullYear()} AL-MAYSAROH &bull; ALL RIGHTS
                RESERVED
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}















// "use client";

// import { useState, useEffect, Suspense } from "react";
// import { signIn } from "next-auth/react";
// import { useRouter, useSearchParams } from "next/navigation";
// import Link from "next/link";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm, Controller } from "react-hook-form";
// import { z } from "zod";
// import { motion, AnimatePresence } from "framer-motion";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Checkbox } from "@/components/ui/checkbox";
// import { toast } from "sonner";
// import {
//   Loader2,
//   Mail,
//   Lock,
//   BookOpen,
//   AlertCircle,
//   Eye,
//   EyeOff,
// } from "lucide-react";
// import { cn } from "@/lib/utils";

// const loginSchema = z.object({
//   email: z.string().email("Invalid email address"),
//   password: z.string().min(1, "Password is required"),
//   rememberMe: z.boolean().default(false),
// });

// type LoginFormData = z.infer<typeof loginSchema>;

// function LoginForm() {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";

//   const [isLoading, setIsLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const {
//     register,
//     handleSubmit,
//     control,
//     formState: { errors },
//     setValue,
//   } = useForm<LoginFormData>({
//     resolver: zodResolver(loginSchema),
//     defaultValues: { email: "", password: "", rememberMe: false },
//   });

//   useEffect(() => {
//     const saved = localStorage.getItem("rememberedEmail");
//     if (saved) {
//       setValue("email", saved);
//       setValue("rememberMe", true);
//     }
//   }, [setValue]);

//   const onSubmit = async (data: LoginFormData) => {
//     setIsLoading(true);
//     setError(null);

//     try {
//       if (data.rememberMe) localStorage.setItem("rememberedEmail", data.email);
//       else localStorage.removeItem("rememberedEmail");

//       const result = await signIn("credentials", {
//         email: data.email,
//         password: data.password,
//         redirect: false,
//         callbackUrl,
//       });

//       if (result?.error) {
//         const msg = result.error.includes("CredentialsSignin")
//           ? "Invalid email or password"
//           : "An error occurred during sign in";
//         setError(msg);
//         toast.error(msg);
//       } else {
//         toast.success("Welcome back!", {
//           description: "Redirecting to your dashboard...",
//         });
//         router.push(callbackUrl);
//         router.refresh();
//       }
//     } catch (err) {
//       setError("Network error. Please check your connection.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Shake animation variant for errors
//   const shakeVariants = {
//     shake: {
//       x: [-2, 2, -2, 2, 0],
//       transition: { duration: 0.4 },
//     },
//   };

//   return (
//     <Card className="border-none shadow-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl overflow-hidden">
//       <CardHeader className="space-y-2 text-center pt-10 pb-6 bg-linear-to-b from-purple-50/50 to-transparent dark:from-purple-900/10">
//         <CardTitle className="text-3xl font-extrabold tracking-tight text-slate-800 dark:text-white">
//           Welcome Back
//         </CardTitle>
//         <CardDescription className="text-base font-medium">
//           Enter your credentials to access your portal
//         </CardDescription>
//       </CardHeader>

//       <form onSubmit={handleSubmit(onSubmit)}>
//         <CardContent className="p-8 pt-2 space-y-6">
//           <AnimatePresence mode="wait">
//             {error && (
//               <motion.div
//                 initial={{ opacity: 0, y: -10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, scale: 0.95 }}
//                 className="flex items-center gap-3 rounded-xl bg-red-50 dark:bg-red-950/30 p-4 text-red-600 dark:text-red-400 border border-red-100 dark:border-red-900"
//               >
//                 <AlertCircle className="h-5 w-5 shrink-0" />
//                 <p className="text-sm font-bold leading-tight">{error}</p>
//               </motion.div>
//             )}
//           </AnimatePresence>

//           <motion.div
//             className="space-y-2"
//             animate={errors.email ? "shake" : ""}
//             variants={shakeVariants}
//           >
//             <Label className="text-sm font-semibold">Email Address</Label>
//             <div className="relative">
//               <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
//               <Input
//                 {...register("email")}
//                 type="email"
//                 placeholder="abdullah@ilm.com"
//                 className={cn(
//                   "pl-10 h-11 border-slate-200 transition-all focus:ring-2 focus:ring-purple-500/20",
//                   errors.email && "border-red-500 ring-red-500/10"
//                 )}
//                 disabled={isLoading}
//               />
//             </div>
//             {errors.email && (
//               <p className="text-xs text-red-500 font-medium">
//                 {errors.email.message}
//               </p>
//             )}
//           </motion.div>

//           <motion.div
//             className="space-y-2"
//             animate={errors.password ? "shake" : ""}
//             variants={shakeVariants}
//           >
//             <div className="flex items-center justify-between">
//               <Label className="text-sm font-semibold">Password</Label>
//               <Link
//                 href="/forgot-password"
//                 className="text-xs text-purple-600 hover:text-purple-700 font-bold transition-all hover:underline"
//               >
//                 Forgot password?
//               </Link>
//             </div>
//             <div className="relative">
//               <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
//               <Input
//                 {...register("password")}
//                 type={showPassword ? "text" : "password"}
//                 placeholder="••••••••"
//                 className={cn(
//                   "pl-10 pr-10 h-11 border-slate-200 transition-all focus:ring-2 focus:ring-purple-500/20",
//                   errors.password && "border-red-500 ring-red-500/10"
//                 )}
//                 disabled={isLoading}
//               />
//               <button
//                 type="button"
//                 tabIndex={-1}
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="absolute right-3 top-3 text-slate-400 hover:text-purple-600 transition-colors"
//               >
//                 <AnimatePresence mode="wait" initial={false}>
//                   <motion.div
//                     key={showPassword ? "eye-off" : "eye-on"}
//                     initial={{ opacity: 0, rotate: -45 }}
//                     animate={{ opacity: 1, rotate: 0 }}
//                     exit={{ opacity: 0, rotate: 45 }}
//                     transition={{ duration: 0.15 }}
//                   >
//                     {showPassword ? (
//                       <EyeOff className="h-4 w-4" />
//                     ) : (
//                       <Eye className="h-4 w-4" />
//                     )}
//                   </motion.div>
//                 </AnimatePresence>
//               </button>
//             </div>
//           </motion.div>

//           <div className="flex items-center space-x-3 p-3 bg-slate-50/50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800 transition-colors hover:bg-slate-100/50 dark:hover:bg-slate-800/80">
//             <Controller
//               name="rememberMe"
//               control={control}
//               render={({ field }) => (
//                 <Checkbox
//                   id="rememberMe"
//                   checked={field.value}
//                   onCheckedChange={field.onChange}
//                   disabled={isLoading}
//                 />
//               )}
//             />
//             <Label
//               htmlFor="rememberMe"
//               className="text-xs font-bold text-slate-700 dark:text-slate-300 cursor-pointer select-none grow"
//             >
//               Keep me logged in for 30 days
//             </Label>
//           </div>
//         </CardContent>

//         <CardFooter className="flex flex-col gap-5 p-8 pt-0">
//           <Button
//             type="submit"
//             className="w-full h-12 bg-purple-600 hover:bg-purple-700 font-extrabold shadow-lg shadow-purple-200 dark:shadow-none transition-all active:scale-[0.98] group"
//             disabled={isLoading}
//           >
//             {isLoading ? (
//               <Loader2 className="h-5 w-5 animate-spin" />
//             ) : (
//               <span className="flex items-center gap-2">Sign In to Portal</span>
//             )}
//           </Button>

//           <p className="text-sm text-center text-slate-500 font-medium">
//             Don&apos;t have an account?{" "}
//             <Link
//               href="/register"
//               className="text-purple-600 font-bold hover:underline ml-1 transition-all"
//             >
//               Create Account
//             </Link>
//           </p>
//         </CardFooter>
//       </form>
//     </Card>
//   );
// }

// export default function LoginPage() {
//   return (
//     <div className="relative min-h-screen bg-linear-to-br from-indigo-100 via-white to-purple-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 overflow-hidden">
//       {/* Background Aura Animations */}
//       <div className="absolute inset-0 overflow-hidden -z-10">
//         <motion.div
//           animate={{ x: [0, 40, 0], y: [0, 60, 0] }}
//           transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
//           className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] rounded-full bg-purple-200/30 dark:bg-purple-900/10 blur-[120px]"
//         />
//         <motion.div
//           animate={{ x: [0, -40, 0], y: [0, -60, 0] }}
//           transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
//           className="absolute -bottom-[10%] -right-[10%] w-[50%] h-[50%] rounded-full bg-indigo-200/30 dark:bg-indigo-900/10 blur-[120px]"
//         />
//       </div>

//       <div className="container mx-auto flex items-center justify-center px-4 py-12 min-h-screen relative z-10">
//         <div className="w-full max-w-md space-y-8">
//           {/* Header/Logo Section */}
//           <motion.div
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="flex flex-col items-center text-center"
//           >
//             <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-purple-600 text-white shadow-xl rotate-3 hover:rotate-0 transition-transform duration-500">
//               <BookOpen className="h-10 w-10" />
//             </div>
//             <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white uppercase">
//               Daar-Ul-Maysaroh
//             </h1>
//             <p className="text-slate-500 dark:text-slate-400 mt-2 font-bold uppercase tracking-widest text-[10px]">
//               Institution Management System
//             </p>
//           </motion.div>

//           <motion.div
//             initial={{ opacity: 0, scale: 0.95 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ delay: 0.1 }}
//           >
//             <Suspense
//               fallback={
//                 <div className="h-[450px] w-full bg-white/50 dark:bg-slate-800/50 animate-pulse rounded-3xl" />
//               }
//             >
//               <LoginForm />
//             </Suspense>
//           </motion.div>

//           <motion.p
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.3 }}
//             className="text-center text-[11px] text-slate-400 font-bold uppercase tracking-widest"
//           >
//             &copy; {new Date().getFullYear()} Daar-Ul-Maysaroh &bull; Secure
//             Access
//           </motion.p>
//         </div>
//       </div>
//     </div>
//   );
// }
