"use client";

import { useState, useEffect, Suspense, useRef, useCallback } from "react";
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
  email: z
    .string()
    .email("Please enter a valid email address")
    .min(1, "Email is required")
    .max(100, "Email is too long"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters")
    .max(50, "Password is too long"),
  rememberMe: z.boolean().default(false),
  website: z.string().max(0, "Invalid input").optional(), // Honeypot validation
});

type LoginFormData = z.infer<typeof loginSchema>;

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";
  const emailInputRef = useRef<HTMLInputElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Check mobile on mount
  useEffect(() => {
    setIsMounted(true);
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid, isSubmitting },
    setValue,
    watch,
    trigger,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
      website: "",
    },
    mode: "onChange", // Validate on change for better UX
  });

  // Watch form values for real-time validation
  const watchedFields = watch();

  // Validate on mobile input
  useEffect(() => {
    if (isMounted && isMobile) {
      const timer = setTimeout(() => {
        trigger();
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [
    watchedFields.email,
    watchedFields.password,
    isMobile,
    trigger,
    isMounted,
  ]);

  useEffect(() => {
    if (!isMounted) return;

    const saved = localStorage.getItem("rememberedEmail");
    if (saved) {
      setValue("email", saved);
      setValue("rememberMe", true);
    }

    // Auto-focus email field on mount
    setTimeout(() => {
      emailInputRef.current?.focus();
    }, 100);
  }, [setValue, isMounted]);

  const onSubmit = useCallback(
    async (data: LoginFormData) => {
      // Honeypot validation
      if (data.website && data.website.trim() !== "") {
        toast.error("Invalid request detected");
        return;
      }

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
            Default: "An error occurred. Please try again.",
          };

          const msg = errorMessages[result.error] || errorMessages.Default;
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
    },
    [callbackUrl, loginAttempts, router],
  );

  // Handle enter key submission
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && !isLoading && isValid) {
        handleSubmit(onSubmit)();
      }
    },
    [isLoading, isValid, handleSubmit, onSubmit],
  );

  return (
    <div className="glass-surface border border-primary-700/20 rounded-3xl sm:rounded-[2.5rem] overflow-hidden w-full max-w-[95vw] sm:max-w-lg shadow-xl sm:shadow-2xl relative">
      {/* Performance-optimized background elements */}
      <div
        className="absolute top-0 right-0 w-16 h-16 sm:w-32 sm:h-32 rounded-full blur-lg sm:blur-xl -translate-y-8 sm:-translate-y-16 translate-x-8 sm:translate-x-16"
        style={{
          background:
            "linear-gradient(225deg, rgba(124, 58, 237, 0.05) 0%, transparent 100%)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-16 h-16 sm:w-32 sm:h-32 rounded-full blur-lg sm:blur-xl translate-y-8 sm:translate-y-16 -translate-x-8 sm:-translate-x-16"
        style={{
          background:
            "linear-gradient(45deg, rgba(124, 58, 237, 0.05) 0%, transparent 100%)",
        }}
      />

      <div className="relative z-10">
        {/* Header */}
        <div className="pt-6 sm:pt-8 md:pt-10 pb-4 sm:pb-6 px-4 sm:px-6 md:px-8 text-center border-b border-border/30">
          <Reveal>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-primary-700/10 border border-primary-700/20 mb-4 sm:mb-6">
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-primary-700" />
              <span className="text-[11px] sm:text-[12px] font-black text-primary-700 uppercase tracking-wider sm:tracking-[0.3em]">
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
            <p className="text-sm sm:text-base text-muted-foreground font-medium px-2">
              Enter your credentials to access your learning journey
            </p>
          </Reveal>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-4 sm:p-6 md:p-8"
          onKeyDown={handleKeyDown}
        >
          {/* Honeypot - Hidden with better validation */}
          <div className="sr-only" aria-hidden="true">
            <Label htmlFor="website">Don't fill this out</Label>
            <Input
              {...register("website")}
              id="website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              className="opacity-0 h-0"
            />
            {errors.website && (
              <p className="text-xs text-red-500">{errors.website.message}</p>
            )}
          </div>

          {/* Error Display */}
          <AnimatePresence mode="wait">
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="mb-4 sm:mb-6 p-3 sm:p-4 rounded-lg sm:rounded-xl border border-red-200 dark:border-red-900/30 bg-red-50/50 dark:bg-red-950/20"
                role="alert"
              >
                <div className="flex items-start gap-2 sm:gap-3">
                  <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
                  <p className="text-sm font-black text-red-700 dark:text-red-300 leading-tight">
                    {error}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="space-y-4 sm:space-y-6">
            {/* Email Field */}
            <Reveal delay={0.3}>
              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-xs font-black uppercase tracking-widest text-primary-700"
                >
                  INSTITUTIONAL EMAIL
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 sm:left-4 top-3.5 h-4 w-4 sm:h-5 sm:w-5 text-primary-700 z-10 pointer-events-none" />
                  <Input
                    {...register("email", {
                      onChange: () => {
                        if (isMobile) trigger("email");
                      },
                    })}
                    ref={emailInputRef}
                    id="email"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    placeholder="student@almaysaroh.edu"
                    className={cn(
                      "pl-10 sm:pl-12 h-12 sm:h-14 border-2",
                      "text-base sm:text-lg font-medium",
                      "rounded-xl sm:rounded-2xl",
                      "transition-all duration-200",
                      errors.email
                        ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                        : "border-border focus:border-primary-700 focus:ring-2 focus:ring-primary-500/20",
                    )}
                    disabled={isLoading}
                    aria-invalid={!!errors.email}
                    aria-describedby={
                      errors.email ? "email-error" : "email-help"
                    }
                  />
                </div>
                <div className="min-h-[20px]">
                  {errors.email ? (
                    <p
                      id="email-error"
                      className="text-xs text-red-500 font-black mt-1 animate-in fade-in"
                    >
                      {errors.email.message}
                    </p>
                  ) : (
                    <p
                      id="email-help"
                      className="text-xs text-muted-foreground mt-1"
                    >
                      Enter your institutional email address
                    </p>
                  )}
                </div>
              </div>
            </Reveal>

            {/* Password Field */}
            <Reveal delay={0.4}>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label
                    htmlFor="password"
                    className="text-xs font-black uppercase tracking-widest text-primary-700"
                  >
                    SECURE PASSWORD
                  </Label>
                  <Link
                    href="/forgot-password"
                    className="text-xs text-primary-700 hover:text-primary-800 font-black transition-all hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded"
                    tabIndex={0}
                  >
                    FORGOT?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 sm:left-4 top-3.5 h-4 w-4 sm:h-5 sm:w-5 text-primary-700 z-10 pointer-events-none" />
                  <Input
                    {...register("password", {
                      onChange: () => {
                        if (isMobile) trigger("password");
                      },
                    })}
                    id="password"
                    type={showPassword ? "text" : "password"}
                    inputMode="text"
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    className={cn(
                      "pl-10 sm:pl-12 pr-12 h-12 sm:h-14 border-2",
                      "text-base sm:text-lg font-medium",
                      "rounded-xl sm:rounded-2xl",
                      "transition-all duration-200",
                      errors.password
                        ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                        : "border-border focus:border-primary-700 focus:ring-2 focus:ring-primary-500/20",
                    )}
                    disabled={isLoading}
                    aria-invalid={!!errors.password}
                    aria-describedby={
                      errors.password ? "password-error" : "password-help"
                    }
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 sm:right-4 top-3.5 text-primary-700 hover:text-primary-800 transition-colors p-1.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500/30 active:scale-95"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    aria-pressed={showPassword}
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
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </button>
                </div>
                <div className="min-h-[20px]">
                  {errors.password ? (
                    <p
                      id="password-error"
                      className="text-xs text-red-500 font-black mt-1 animate-in fade-in"
                    >
                      {errors.password.message}
                    </p>
                  ) : (
                    <p
                      id="password-help"
                      className="text-xs text-muted-foreground mt-1"
                    >
                      Minimum 6 characters required
                    </p>
                  )}
                </div>
              </div>
            </Reveal>

            {/* Remember Me */}
            <Reveal delay={0.5}>
              <div className="flex items-center gap-3 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-muted/30 border border-border">
                <Controller
                  name="rememberMe"
                  control={control}
                  render={({ field }) => (
                    <Checkbox
                      id="rememberMe"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled={isLoading}
                      className="h-5 w-5 sm:h-6 sm:w-6 data-[state=checked]:bg-primary-700 data-[state=checked]:border-primary-700"
                      aria-label="Remember me on this device"
                    />
                  )}
                />
                <Label
                  htmlFor="rememberMe"
                  className="text-sm sm:text-base font-black text-foreground cursor-pointer select-none grow leading-tight"
                >
                  Keep me signed in on this device
                </Label>
              </div>
            </Reveal>

            {/* Submit Button */}
            <Reveal delay={0.6}>
              <Button
                type="submit"
                disabled={isLoading || !isValid || isSubmitting}
                className={cn(
                  "w-full h-14 sm:h-16 rounded-full font-black text-white",
                  "shadow-lg hover:shadow-xl transition-all duration-300",
                  "relative overflow-hidden",
                  "min-h-[56px] sm:min-h-[64px]",
                  isLoading || !isValid
                    ? "bg-primary-700/70 cursor-not-allowed"
                    : "bg-primary-700 hover:bg-primary-800",
                )}
              >
                <span className="relative z-10 flex items-center justify-center gap-3 text-base sm:text-lg">
                  {isLoading ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      <span>ACCESSING...</span>
                    </>
                  ) : (
                    <>
                      <span>ACCESS PORTAL</span>
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-2" />
                    </>
                  )}
                </span>
                {/* Shimmer effect only when enabled */}
                {!isLoading && isValid && (
                  <div className="absolute inset-0 -z-10 overflow-hidden rounded-full">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 animate-shimmer" />
                  </div>
                )}
              </Button>
            </Reveal>
          </div>
        </form>

        {/* Footer */}
        <div className="px-4 sm:px-6 md:px-8 pb-6 sm:pb-8 pt-4 sm:pt-6 border-t border-border/30">
          <Reveal delay={0.7}>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-sm text-muted-foreground font-medium text-center sm:text-left">
                Need an institutional account?
              </p>
              <Link href="/register" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  className="w-full rounded-full px-6 sm:px-8 py-3 sm:py-4 font-black border-2 border-primary-700/30 hover:bg-primary-700/10 text-sm sm:text-base min-h-[48px] sm:min-h-[52px]"
                  tabIndex={0}
                >
                  <span className="flex items-center gap-2">
                    <BookMarked className="h-4 w-4 sm:h-5 sm:w-5" />
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
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) =>
      setReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      {/* Optimized background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, hsl(var(--background)) 0%, hsl(var(--background)) 50%, rgba(124, 58, 237, 0.03) 100%)",
        }}
      />

      {/* Subtle pattern - only on desktop */}
      <div
        className="hidden sm:block absolute inset-0 opacity-[0.015] bg-[url('/islamic-pattern.svg')] bg-center bg-repeat"
        style={{ backgroundSize: "300px" }}
      />

      {/* Conditional floating elements */}
      {!reducedMotion && (
        <>
          <div
            className="absolute top-10 left-4 w-40 h-40 sm:w-64 sm:h-64 rounded-full blur-2xl sm:blur-3xl"
            style={{
              background:
                "radial-gradient(circle at 30% 30%, rgba(124, 58, 237, 0.08) 0%, transparent 70%)",
            }}
          />
          <div
            className="absolute bottom-10 right-4 w-48 h-48 sm:w-96 sm:h-96 rounded-full blur-2xl sm:blur-3xl"
            style={{
              background:
                "radial-gradient(circle at 70% 70%, rgba(124, 58, 237, 0.08) 0%, transparent 70%)",
            }}
          />
        </>
      )}

      {/* Main Content */}
      <div className="container mx-auto flex items-center justify-center px-4 sm:px-6 py-6 sm:py-8 md:py-12 min-h-screen relative z-10">
        <div className="w-full max-w-full sm:max-w-lg space-y-6 sm:space-y-8 md:space-y-10">
          {/* Institutional Header */}
          <Reveal>
            <div className="flex flex-col items-center text-center space-y-4 sm:space-y-6">
              <Link
                href="/"
                className="group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded-2xl"
                aria-label="Al-Maysaroh Home"
              >
                <div className="mx-auto mb-4 sm:mb-6 flex h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-700 to-primary-800 text-white shadow-lg sm:shadow-xl group-hover:rotate-3 transition-transform duration-300">
                  <BookOpen className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12" />
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter font-heading text-foreground uppercase leading-tight">
                  AL-MAYSAROH
                </h1>
                <div className="flex items-center justify-center gap-2 sm:gap-3 mt-3">
                  <div className="h-px w-6 sm:w-8 bg-gradient-to-r from-transparent to-primary-700" />
                  <p className="text-primary-700 font-black uppercase tracking-wider sm:tracking-[0.3em] text-xs sm:text-sm">
                    INTERNATIONAL INSTITUTE
                  </p>
                  <div className="h-px w-6 sm:w-8 bg-gradient-to-l from-transparent to-primary-700" />
                </div>
              </Link>
            </div>
          </Reveal>

          {/* Login Card */}
          <Suspense
            fallback={
              <div className="glass-surface border border-primary-700/20 rounded-3xl h-[580px] sm:h-[620px] animate-pulse" />
            }
          >
            <LoginForm />
          </Suspense>

          {/* Security Footer */}
          <Reveal delay={0.8}>
            <div className="text-center space-y-4 sm:space-y-6">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-sm sm:text-base text-muted-foreground font-medium">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-primary-700" />
                  <span>End-to-End Encrypted</span>
                </div>
                <div className="hidden sm:block h-5 w-px bg-border" />
                <div className="sm:hidden h-px w-20 bg-border/50 mx-auto" />
                <div className="flex items-center gap-2">
                  <GraduationCap className="h-4 w-4 sm:h-5 sm:w-5 text-primary-700" />
                  <span>Academic Integrity</span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-muted-foreground font-black uppercase tracking-wider sm:tracking-[0.3em]">
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
