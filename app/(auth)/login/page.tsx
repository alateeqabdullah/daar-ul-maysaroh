// // "use client";

// // import { useState, useEffect, Suspense, useRef, useCallback } from "react";
// // import { signIn } from "next-auth/react";
// // import { useRouter, useSearchParams } from "next/navigation";
// // import Link from "next/link";
// // import { zodResolver } from "@hookform/resolvers/zod";
// // import { useForm, Controller } from "react-hook-form";
// // import { z } from "zod";
// // import { motion, AnimatePresence } from "framer-motion";
// // import { Reveal } from "@/components/shared/section-animation";
// // import { Button } from "@/components/ui/button";
// // import { Input } from "@/components/ui/input";
// // import { Label } from "@/components/ui/label";
// // import { Checkbox } from "@/components/ui/checkbox";
// // import { toast } from "sonner";
// // import {
// //   Loader2,
// //   Mail,
// //   Lock,
// //   BookOpen,
// //   AlertCircle,
// //   Eye,
// //   EyeOff,
// //   Sparkles,
// //   Shield,
// //   ArrowRight,
// //   BookMarked,
// //   GraduationCap,
// // } from "lucide-react";
// // import { cn } from "@/lib/utils";

// // // Fixed Zod schema with proper honeypot validation
// // const loginSchema = z.object({
// //   email: z
// //     .string()
// //     .email("Please enter a valid email address")
// //     .min(1, "Email is required")
// //     .max(100, "Email is too long"),
// //   password: z
// //     .string()
// //     .min(1, "Password is required")
// //     .min(6, "Password must be at least 6 characters")
// //     .max(50, "Password is too long"),
// //   rememberMe: z.boolean().default(false),
// //   // Fixed honeypot: use optional string with transform
// //   website: z
// //     .string()
// //     .optional()
// //     .transform((val) => val || ""),
// // });

// // // Add honeypot validation in the onSubmit function instead
// // const validateHoneypot = (data: any) => {
// //   if (data.website && data.website.trim() !== "") {
// //     return false; // Bot detected
// //   }
// //   return true; // Human
// // };

// // type LoginFormData = z.infer<typeof loginSchema>;

// // function LoginForm() {
// //   const router = useRouter();
// //   const searchParams = useSearchParams();
// //   const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";
// //   const emailInputRef = useRef<HTMLInputElement>(null);
// //   const [isMounted, setIsMounted] = useState(false);

// //   const [isLoading, setIsLoading] = useState(false);
// //   const [showPassword, setShowPassword] = useState(false);
// //   const [error, setError] = useState<string | null>(null);
// //   const [loginAttempts, setLoginAttempts] = useState(0);

// //   // Mount check
// //   useEffect(() => {
// //     setIsMounted(true);
// //   }, []);

// //   const {
// //     register,
// //     handleSubmit,
// //     control,
// //     formState: { errors, isValid, isSubmitting },
// //     setValue,
// //   } = useForm<LoginFormData>({
// //     resolver: zodResolver(loginSchema),
// //     defaultValues: {
// //       email: "",
// //       password: "",
// //       rememberMe: false,
// //       website: "", // Initialize as empty string instead of undefined
// //     },
// //     mode: "onChange",
// //   });

// //   // Restore saved email on mount
// //   useEffect(() => {
// //     if (!isMounted) return;

// //     const saved = localStorage.getItem("rememberedEmail");
// //     if (saved) {
// //       setValue("email", saved);
// //       setValue("rememberMe", true);
// //     }

// //     // Auto-focus email field
// //     setTimeout(() => {
// //       emailInputRef.current?.focus();
// //     }, 100);
// //   }, [setValue, isMounted]);

// //   const onSubmit = useCallback(
// //     async (data: LoginFormData) => {
// //       // Honeypot validation - moved from Zod to here
// //       if (!validateHoneypot(data)) {
// //         toast.error("Invalid request detected");
// //         return;
// //       }

// //       if (loginAttempts >= 5) {
// //         setError("Too many attempts. Please try again in 15 minutes.");
// //         toast.error("Too many login attempts");
// //         return;
// //       }

// //       setIsLoading(true);
// //       setError(null);

// //       try {
// //         if (data.rememberMe) {
// //           localStorage.setItem("rememberedEmail", data.email);
// //         } else {
// //           localStorage.removeItem("rememberedEmail");
// //         }

// //         const result = await signIn("credentials", {
// //           email: data.email,
// //           password: data.password,
// //           redirect: false,
// //           callbackUrl,
// //         });

// //         if (result?.error) {
// //           setLoginAttempts((prev) => prev + 1);
// //           const errorMessages: Record<string, string> = {
// //             CredentialsSignin: "Invalid email or password",
// //             AccessDenied: "Your account needs activation",
// //             OAuthAccountNotLinked: "Account not linked",
// //             Default: "An error occurred. Please try again.",
// //           };

// //           const msg = errorMessages[result.error] || errorMessages.Default;
// //           setError(msg);
// //           toast.error(msg);
// //         } else {
// //           setLoginAttempts(0);
// //           toast.success("Welcome back!", {
// //             description: "Redirecting to your dashboard...",
// //           });
// //           router.push(callbackUrl);
// //           router.refresh();
// //         }
// //       } catch (err) {
// //         setError("Network error. Please check your connection.");
// //         toast.error("Network error");
// //       } finally {
// //         setIsLoading(false);
// //       }
// //     },
// //     [callbackUrl, loginAttempts, router],
// //   );

// //   // Handle enter key submission
// //   const handleKeyDown = useCallback(
// //     (e: React.KeyboardEvent) => {
// //       if (e.key === "Enter" && !isLoading && isValid) {
// //         handleSubmit(onSubmit)();
// //       }
// //     },
// //     [isLoading, isValid, handleSubmit, onSubmit],
// //   );

// //   return (
// //     <div className="glass-surface border border-primary-700/20 rounded-2xl sm:rounded-3xl md:rounded-[2.5rem] overflow-hidden w-full max-w-full sm:max-w-md md:max-w-lg shadow-lg sm:shadow-xl md:shadow-2xl relative">
// //       {/* Background elements - reduced on mobile */}
// //       <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full blur-lg sm:blur-xl -translate-y-6 sm:-translate-y-8 md:-translate-y-12 translate-x-6 sm:translate-x-8 md:translate-x-12 opacity-50 sm:opacity-70">
// //         <div className="w-full h-full bg-gradient-to-bl from-primary-700/10 to-transparent rounded-full" />
// //       </div>
// //       <div className="absolute bottom-0 left-0 w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full blur-lg sm:blur-xl translate-y-6 sm:translate-y-8 md:translate-y-12 -translate-x-6 sm:-translate-x-8 md:-translate-x-12 opacity-50 sm:opacity-70">
// //         <div className="w-full h-full bg-gradient-to-tr from-primary-700/10 to-transparent rounded-full" />
// //       </div>

// //       <div className="relative z-10">
// //         {/* Header */}
// //         <div className="pt-4 sm:pt-6 md:pt-8 pb-3 sm:pb-4 md:pb-6 px-4 sm:px-5 md:px-6 text-center border-b border-border/30">
// //           <Reveal>
// //             <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-3 sm:py-2 rounded-full bg-primary-700/10 border border-primary-700/20 mb-3 sm:mb-4 md:mb-6">
// //               <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-primary-700" />
// //               <span className="text-[10px] sm:text-[11px] md:text-[12px] font-black text-primary-700 uppercase tracking-wider md:tracking-[0.2em]">
// //                 SCHOLAR PORTAL
// //               </span>
// //               <Shield className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-primary-700" />
// //             </div>
// //           </Reveal>

// //           <Reveal delay={0.1}>
// //             <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black tracking-tighter font-heading mb-2 sm:mb-3">
// //               <span className="text-primary-700 italic">Sacred</span> Knowledge
// //               <br />
// //               Portal
// //             </h1>
// //           </Reveal>

// //           <Reveal delay={0.2}>
// //             <p className="text-xs sm:text-sm md:text-base text-muted-foreground font-medium px-2">
// //               Enter your credentials to access your learning journey
// //             </p>
// //           </Reveal>
// //         </div>

// //         {/* Form */}
// //         <form
// //           onSubmit={handleSubmit(onSubmit)}
// //           className="p-4 sm:p-5 md:p-6 lg:p-8"
// //           onKeyDown={handleKeyDown}
// //         >
// //           {/* Honeypot - Hidden and simplified */}
// //           <div className="sr-only" aria-hidden="true">
// //             <Input
// //               {...register("website")}
// //               id="website"
// //               type="text"
// //               tabIndex={-1}
// //               autoComplete="off"
// //               className="opacity-0 h-0 w-0 absolute"
// //               aria-hidden="true"
// //             />
// //           </div>

// //           {/* Error Display */}
// //           <AnimatePresence mode="wait">
// //             {error && (
// //               <motion.div
// //                 initial={{ opacity: 0, y: -5 }}
// //                 animate={{ opacity: 1, y: 0 }}
// //                 exit={{ opacity: 0, scale: 0.95 }}
// //                 className="mb-3 sm:mb-4 md:mb-6 p-3 sm:p-4 rounded-lg md:rounded-xl border border-red-200 dark:border-red-900/30 bg-red-50/50 dark:bg-red-950/20"
// //                 role="alert"
// //               >
// //                 <div className="flex items-start gap-2 sm:gap-3">
// //                   <AlertCircle className="h-4 w-4 sm:h-4 sm:w-4 md:h-5 md:w-5 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
// //                   <p className="text-xs sm:text-sm font-black text-red-700 dark:text-red-300 leading-tight">
// //                     {error}
// //                   </p>
// //                 </div>
// //               </motion.div>
// //             )}
// //           </AnimatePresence>

// //           <div className="space-y-3 sm:space-y-4 md:space-y-6">
// //             {/* Email Field */}
// //             <Reveal delay={0.3}>
// //               <div className="space-y-1.5 sm:space-y-2">
// //                 <Label
// //                   htmlFor="email"
// //                   className="text-xs font-black uppercase tracking-widest text-primary-700"
// //                 >
// //                   INSTITUTIONAL EMAIL
// //                 </Label>
// //                 <div className="relative">
// //                   <Mail className="absolute left-3 sm:left-4 top-3 h-4 w-4 sm:h-4 sm:w-4 md:h-5 md:w-5 text-primary-700 z-10 pointer-events-none" />
// //                   <Input
// //                     {...register("email")}
// //                     ref={emailInputRef}
// //                     id="email"
// //                     type="email"
// //                     inputMode="email"
// //                     autoComplete="email"
// //                     placeholder="student@almaysaroh.edu"
// //                     className={cn(
// //                       "pl-9 sm:pl-10 md:pl-12 h-10 sm:h-11 md:h-12 lg:h-14 border-2",
// //                       "text-sm sm:text-base md:text-lg font-medium",
// //                       "rounded-lg sm:rounded-xl md:rounded-2xl",
// //                       "transition-all duration-200",
// //                       errors.email
// //                         ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
// //                         : "border-border focus:border-primary-700 focus:ring-2 focus:ring-primary-500/20",
// //                     )}
// //                     disabled={isLoading}
// //                     aria-invalid={!!errors.email}
// //                     aria-describedby={
// //                       errors.email ? "email-error" : "email-help"
// //                     }
// //                   />
// //                 </div>
// //                 <div className="min-h-[18px]">
// //                   {errors.email ? (
// //                     <p
// //                       id="email-error"
// //                       className="text-xs text-red-500 font-black mt-1 animate-in fade-in"
// //                     >
// //                       {errors.email.message}
// //                     </p>
// //                   ) : (
// //                     <p
// //                       id="email-help"
// //                       className="text-xs text-muted-foreground mt-1"
// //                     >
// //                       Enter your institutional email address
// //                     </p>
// //                   )}
// //                 </div>
// //               </div>
// //             </Reveal>

// //             {/* Password Field */}
// //             <Reveal delay={0.4}>
// //               <div className="space-y-1.5 sm:space-y-2">
// //                 <div className="flex items-center justify-between">
// //                   <Label
// //                     htmlFor="password"
// //                     className="text-xs font-black uppercase tracking-widest text-primary-700"
// //                   >
// //                     SECURE PASSWORD
// //                   </Label>
// //                   <Link
// //                     href="/forgot-password"
// //                     className="text-xs text-primary-700 hover:text-primary-800 font-black transition-all hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded"
// //                     tabIndex={0}
// //                   >
// //                     FORGOT?
// //                   </Link>
// //                 </div>
// //                 <div className="relative">
// //                   <Lock className="absolute left-3 sm:left-4 top-3 h-4 w-4 sm:h-4 sm:w-4 md:h-5 md:w-5 text-primary-700 z-10 pointer-events-none" />
// //                   <Input
// //                     {...register("password")}
// //                     id="password"
// //                     type={showPassword ? "text" : "password"}
// //                     inputMode="text"
// //                     autoComplete="current-password"
// //                     placeholder="Enter your password"
// //                     className={cn(
// //                       "pl-9 sm:pl-10 md:pl-12 pr-10 sm:pr-11 md:pr-12 h-10 sm:h-11 md:h-12 lg:h-14 border-2",
// //                       "text-sm sm:text-base md:text-lg font-medium",
// //                       "rounded-lg sm:rounded-xl md:rounded-2xl",
// //                       "transition-all duration-200",
// //                       errors.password
// //                         ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
// //                         : "border-border focus:border-primary-700 focus:ring-2 focus:ring-primary-500/20",
// //                     )}
// //                     disabled={isLoading}
// //                     aria-invalid={!!errors.password}
// //                     aria-describedby={
// //                       errors.password ? "password-error" : "password-help"
// //                     }
// //                   />
// //                   <button
// //                     type="button"
// //                     onClick={() => setShowPassword(!showPassword)}
// //                     className="absolute right-3 sm:right-4 top-3 text-primary-700 hover:text-primary-800 transition-colors p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500/30 active:scale-95"
// //                     aria-label={
// //                       showPassword ? "Hide password" : "Show password"
// //                     }
// //                     aria-pressed={showPassword}
// //                     disabled={isLoading}
// //                     tabIndex={0}
// //                   >
// //                     <AnimatePresence mode="wait" initial={false}>
// //                       <motion.div
// //                         key={showPassword ? "eye-off" : "eye-on"}
// //                         initial={{ opacity: 0, scale: 0.8 }}
// //                         animate={{ opacity: 1, scale: 1 }}
// //                         exit={{ opacity: 0, scale: 0.8 }}
// //                         transition={{ duration: 0.15 }}
// //                       >
// //                         {showPassword ? (
// //                           <EyeOff className="h-4 w-4 sm:h-4 sm:w-4 md:h-5 md:w-5" />
// //                         ) : (
// //                           <Eye className="h-4 w-4 sm:h-4 sm:w-4 md:h-5 md:w-5" />
// //                         )}
// //                       </motion.div>
// //                     </AnimatePresence>
// //                   </button>
// //                 </div>
// //                 <div className="min-h-[18px]">
// //                   {errors.password ? (
// //                     <p
// //                       id="password-error"
// //                       className="text-xs text-red-500 font-black mt-1 animate-in fade-in"
// //                     >
// //                       {errors.password.message}
// //                     </p>
// //                   ) : (
// //                     <p
// //                       id="password-help"
// //                       className="text-xs text-muted-foreground mt-1"
// //                     >
// //                       Minimum 6 characters required
// //                     </p>
// //                   )}
// //                 </div>
// //               </div>
// //             </Reveal>

// //             {/* Remember Me */}
// //             <Reveal delay={0.5}>
// //               <div className="flex items-center gap-3 p-2.5 sm:p-3 md:p-4 rounded-lg sm:rounded-xl md:rounded-2xl bg-muted/30 border border-border">
// //                 <Controller
// //                   name="rememberMe"
// //                   control={control}
// //                   render={({ field }) => (
// //                     <Checkbox
// //                       id="rememberMe"
// //                       checked={field.value}
// //                       onCheckedChange={field.onChange}
// //                       disabled={isLoading}
// //                       className="h-4 w-4 sm:h-4.5 sm:w-4.5 md:h-5 md:w-5 data-[state=checked]:bg-primary-700 data-[state=checked]:border-primary-700"
// //                       aria-label="Remember me on this device"
// //                     />
// //                   )}
// //                 />
// //                 <Label
// //                   htmlFor="rememberMe"
// //                   className="text-xs sm:text-sm md:text-base font-black text-foreground cursor-pointer select-none grow leading-tight"
// //                 >
// //                   Keep me signed in on this device
// //                 </Label>
// //               </div>
// //             </Reveal>

// //             {/* Submit Button */}
// //             <Reveal delay={0.6}>
// //               <Button
// //                 type="submit"
// //                 disabled={isLoading || !isValid || isSubmitting}
// //                 className={cn(
// //                   "w-full h-11 sm:h-12 md:h-14 rounded-lg sm:rounded-xl md:rounded-full font-black text-white",
// //                   "shadow-md hover:shadow-lg transition-all duration-300",
// //                   "relative overflow-hidden",
// //                   "min-h-[44px] sm:min-h-[48px] md:min-h-[56px]", // Touch target minimum
// //                   isLoading || !isValid
// //                     ? "bg-primary-700/70 cursor-not-allowed"
// //                     : "bg-primary-700 hover:bg-primary-800",
// //                 )}
// //               >
// //                 <span className="relative z-10 flex items-center justify-center gap-2 sm:gap-3 text-sm sm:text-base md:text-lg">
// //                   {isLoading ? (
// //                     <>
// //                       <Loader2 className="h-4 w-4 sm:h-4.5 sm:w-4.5 md:h-5 md:w-5 animate-spin" />
// //                       <span>ACCESSING...</span>
// //                     </>
// //                   ) : (
// //                     <>
// //                       <span>ACCESS PORTAL</span>
// //                       <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-4 md:w-4 transition-transform duration-300 group-hover:translate-x-1 md:group-hover:translate-x-2" />
// //                     </>
// //                   )}
// //                 </span>
// //                 {/* Shimmer effect only when enabled */}
// //                 {!isLoading && isValid && (
// //                   <div className="absolute inset-0 -z-10 overflow-hidden rounded-lg sm:rounded-xl md:rounded-full">
// //                     <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 animate-shimmer" />
// //                   </div>
// //                 )}
// //               </Button>
// //             </Reveal>
// //           </div>
// //         </form>

// //         {/* Footer */}
// //         <div className="px-4 sm:px-5 md:px-6 pb-4 sm:pb-5 md:pb-6 pt-3 sm:pt-4 md:pt-5 border-t border-border/30">
// //           <Reveal delay={0.7}>
// //             <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
// //               <p className="text-xs sm:text-sm text-muted-foreground font-medium text-center sm:text-left">
// //                 Need an institutional account?
// //               </p>
// //               <Link href="/register" className="w-full sm:w-auto">
// //                 <Button
// //                   variant="outline"
// //                   className="w-full rounded-lg sm:rounded-xl md:rounded-full px-4 sm:px-5 md:px-6 py-2.5 sm:py-3 md:py-4 font-black border-2 border-primary-700/30 hover:bg-primary-700/10 text-xs sm:text-sm md:text-base min-h-[40px] sm:min-h-[44px] md:min-h-[48px]"
// //                   tabIndex={0}
// //                 >
// //                   <span className="flex items-center gap-2">
// //                     <BookMarked className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-4 md:w-4" />
// //                     REQUEST ACCESS
// //                   </span>
// //                 </Button>
// //               </Link>
// //             </div>
// //           </Reveal>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // export default function LoginPage() {
// //   return (
// //     <div className="relative min-h-screen bg-background overflow-hidden">
// //       {/* Background with progressive enhancement */}
// //       <div
// //         className="absolute inset-0"
// //         style={{
// //           background:
// //             "linear-gradient(to bottom, hsl(var(--background)) 0%, hsl(var(--background)) 50%, rgba(124, 58, 237, 0.02) 100%)",
// //         }}
// //       />

// //       {/* Subtle pattern - only on larger screens */}
// //       <div
// //         className="hidden md:block absolute inset-0 opacity-[0.015] bg-[url('/islamic-pattern.svg')] bg-center bg-repeat"
// //         style={{ backgroundSize: "300px" }}
// //       />

// //       {/* Subtle floating elements - reduced on mobile */}
// //       <div
// //         className="absolute top-6 sm:top-8 left-3 sm:left-4 w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-64 lg:h-64 rounded-full blur-lg sm:blur-xl opacity-40 sm:opacity-50"
// //         style={{
// //           background:
// //             "radial-gradient(circle at 30% 30%, rgba(124, 58, 237, 0.08) 0%, transparent 70%)",
// //         }}
// //       />
// //       <div
// //         className="absolute bottom-6 sm:bottom-8 right-3 sm:right-4 w-36 h-36 sm:w-44 sm:h-44 md:w-56 md:h-56 lg:w-72 lg:h-72 rounded-full blur-lg sm:blur-xl opacity-40 sm:opacity-50"
// //         style={{
// //           background:
// //             "radial-gradient(circle at 70% 70%, rgba(124, 58, 237, 0.08) 0%, transparent 70%)",
// //         }}
// //       />

// //       {/* Main Content */}
// //       <div className="container mx-auto flex items-center justify-center px-3 sm:px-4 md:px-6 py-4 sm:py-6 md:py-8 lg:py-12 min-h-screen relative z-10">
// //         <div className="w-full max-w-full sm:max-w-md md:max-w-lg space-y-4 sm:space-y-6 md:space-y-8 lg:space-y-10">
// //           {/* Institutional Header */}
// //           <Reveal>
// //             <div className="flex flex-col items-center text-center space-y-3 sm:space-y-4 md:space-y-6">
// //               <Link
// //                 href="/"
// //                 className="group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded-2xl"
// //                 aria-label="Al-Maysaroh Home"
// //               >
// //                 <div className="mx-auto mb-3 sm:mb-4 md:mb-5 flex h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 lg:h-20 lg:w-20 items-center justify-center rounded-lg sm:rounded-xl md:rounded-2xl bg-gradient-to-br from-primary-700 to-primary-800 text-white shadow-md sm:shadow-lg group-hover:rotate-3 transition-transform duration-300">
// //                   <BookOpen className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 lg:h-10 lg:w-10" />
// //                 </div>
// //                 <h1 className="text-2xl sm:text-2.5xl md:text-3xl lg:text-4xl xl:text-5xl font-black tracking-tighter font-heading text-foreground uppercase leading-tight">
// //                   AL-MAYSAROH
// //                 </h1>
// //                 <div className="flex items-center justify-center gap-1.5 sm:gap-2 md:gap-3 mt-2 sm:mt-3">
// //                   <div className="h-px w-4 sm:w-5 md:w-6 lg:w-8 bg-gradient-to-r from-transparent to-primary-700" />
// //                   <p className="text-primary-700 font-black uppercase tracking-wider sm:tracking-[0.2em] md:tracking-[0.3em] text-[10px] sm:text-[11px] md:text-xs lg:text-sm">
// //                     INTERNATIONAL INSTITUTE
// //                   </p>
// //                   <div className="h-px w-4 sm:w-5 md:w-6 lg:w-8 bg-gradient-to-l from-transparent to-primary-700" />
// //                 </div>
// //               </Link>
// //             </div>
// //           </Reveal>

// //           {/* Login Card */}
// //           <Suspense
// //             fallback={
// //               <div className="glass-surface border border-primary-700/20 rounded-2xl h-[480px] sm:h-[520px] md:h-[580px] animate-pulse" />
// //             }
// //           >
// //             <LoginForm />
// //           </Suspense>

// //           {/* Security Footer */}
// //           <Reveal delay={0.8}>
// //             <div className="text-center space-y-3 sm:space-y-4 md:space-y-6">
// //               <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 md:gap-4 lg:gap-6 text-xs sm:text-sm md:text-base text-muted-foreground font-medium">
// //                 <div className="flex items-center gap-1.5 sm:gap-2">
// //                   <Shield className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-4 md:w-4 lg:h-5 lg:w-5 text-primary-700" />
// //                   <span>End-to-End Encrypted</span>
// //                 </div>
// //                 <div className="hidden sm:block h-4 md:h-5 w-px bg-border" />
// //                 <div className="sm:hidden h-px w-16 sm:w-20 bg-border/50 mx-auto" />
// //                 <div className="flex items-center gap-1.5 sm:gap-2">
// //                   <GraduationCap className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-4 md:w-4 lg:h-5 lg:w-5 text-primary-700" />
// //                   <span>Academic Integrity</span>
// //                 </div>
// //               </div>

// //               <p className="text-[10px] sm:text-xs md:text-sm text-muted-foreground font-black uppercase tracking-wider md:tracking-[0.2em] lg:tracking-[0.3em]">
// //                 &copy; {new Date().getFullYear()} AL-MAYSAROH &bull; ALL RIGHTS
// //                 RESERVED
// //               </p>
// //             </div>
// //           </Reveal>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

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







"use client";

import { useState, useTransition, useEffect, Suspense } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import {
  Loader2,
  Mail,
  Lock,
  ShieldCheck,
  Eye,
  EyeOff,
  ChevronRight,
  Home,
  ArrowRight,
  Sparkles,
  Globe,
} from "lucide-react";
import { cn } from "@/lib/utils";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
  rememberMe: z.boolean().default(false),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-[#02040a] overflow-hidden flex items-center justify-center p-4">
      {/* 1. ANIMATED AMBIENT BACKGROUND */}
      <AmbientBackground />

      <div className="w-full max-w-[1000px] grid grid-cols-1 lg:grid-cols-2 gap-0 bg-white/70 dark:bg-slate-900/70 backdrop-blur-3xl rounded-[2.5rem] md:rounded-[3.5rem] border border-white dark:border-white/10 shadow-2xl overflow-hidden relative z-10">
        {/* LEFT PANEL: BRAND STORY (Hidden on small screens) */}
        <div className="hidden lg:flex flex-col justify-between p-16 bg-primary-700 relative overflow-hidden">
          {/* Subtle Islamic Geometric Pattern Overlay */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l30 30-30 30-30-30z' fill='%23ffffff'/%3E%3C/svg%3E")`,
            }}
          />

          <div className="relative z-10 space-y-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 transition-all text-white border border-white/10"
            >
              <Home className="h-4 w-4 text-gold" />
              <span className="text-[10px] font-black uppercase tracking-widest">
                Back to Homepage
              </span>
            </Link>

            <div className="space-y-6">
              <h2 className="text-6xl font-black text-white tracking-tighter leading-none text-balance">
                Dedicated to{" "}
                <span className="text-gold italic">Excellence.</span>
              </h2>
              <p className="text-primary-100 text-lg font-medium max-w-sm leading-relaxed opacity-80">
                Welcome to the Daar-ul-Maysaroh portal. Manage your studies,
                track progress, and stay connected.
              </p>
            </div>
          </div>

          <div className="relative z-10 flex items-center gap-4 text-white/40">
            <Globe className="h-5 w-5" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">
              Institutional Network v2.6
            </span>
          </div>
        </div>

        {/* RIGHT PANEL: LOGIN FORM (Visible on all screens) */}
        <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center">
          {/* MOBILE LOGO & WELCOME (Visible on mobile) */}
          <div className="mb-10 text-center lg:text-left flex flex-col items-center lg:items-start gap-4">
            <Link href="/" className="lg:hidden">
              <div className="h-16 w-16 rounded-2xl bg-primary-700 flex items-center justify-center text-white shadow-royal animate-bounce-slow">
                <ShieldCheck className="h-10 w-10" />
              </div>
            </Link>
            <div className="space-y-1">
              <h1 className="text-3xl md:text-4xl font-black tracking-tighter text-slate-900 dark:text-white leading-none">
                Welcome <span className="text-primary-700 italic">Back</span>
              </h1>
              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">
                Sign in to your account
              </p>
            </div>
          </div>

          <Suspense
            fallback={
              <Loader2 className="animate-spin text-primary-700 mx-auto" />
            }
          >
            <LoginForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

function LoginForm() {
  const [isPending, startTransition] = useTransition();
  const [showPass, setShowPass] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard/admin";

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    startTransition(async () => {
      const res = await signIn("credentials", { ...data, redirect: false });
      if (res?.error) {
        toast.error("Invalid email or password. Please try again.");
      } else {
        toast.success("Welcome back!", {
          description: "Redirecting to your dashboard...",
        });
        router.push(callbackUrl);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-4">
        {/* EMAIL FIELD */}
        <div className="space-y-2">
          <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">
            Email Address
          </Label>
          <div className="relative group">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-300 group-focus-within:text-primary-700 transition-colors" />
            <input
              {...register("email")}
              className="w-full h-14 md:h-16 pl-12 pr-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border-2 border-transparent focus:border-primary-700/20 focus:bg-white dark:focus:bg-slate-800 outline-none font-bold text-slate-900 dark:text-white transition-all"
              placeholder="name@email.com"
            />
          </div>
          {errors.email && (
            <p className="text-[10px] text-rose-500 font-bold ml-2">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* PASSWORD FIELD */}
        <div className="space-y-2">
          <div className="flex justify-between items-center px-2">
            <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">
              Password
            </Label>
            <Link
              href="/forgot-password"
              title="Reset your password"
              className="text-[10px] font-black text-primary-700 hover:text-gold uppercase tracking-widest transition-all"
            >
              Forgot?
            </Link>
          </div>
          <div className="relative group">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-300 group-focus-within:text-primary-700 transition-colors" />
            <input
              {...register("password")}
              type={showPass ? "text" : "password"}
              className="w-full h-14 md:h-16 pl-12 pr-12 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border-2 border-transparent focus:border-primary-700/20 focus:bg-white dark:focus:bg-slate-800 outline-none font-bold text-slate-900 dark:text-white transition-all"
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 hover:text-primary-700 transition-colors"
            >
              {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* REMEMBER ME TOGGLE */}
      <div className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800 hover:border-primary-700/20 transition-all cursor-pointer">
        <Controller
          name="rememberMe"
          control={control}
          render={({ field }) => (
            <Checkbox
              id="rem"
              checked={field.value}
              onCheckedChange={field.onChange}
              className="h-5 w-5 rounded-lg data-[state=checked]:bg-primary-700"
            />
          )}
        />
        <label
          htmlFor="rem"
          className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 cursor-pointer select-none"
        >
          Keep me signed in for 30 days
        </label>
      </div>

      {/* SIGN IN BUTTON */}
      <Button
        disabled={isPending}
        className="w-full h-16 md:h-20 rounded-[1.5rem] md:rounded-[2rem] bg-primary-700 hover:bg-primary-800 text-white font-black text-xl shadow-royal active:scale-95 transition-all group"
      >
        {isPending ? (
          <Loader2 className="animate-spin h-6 w-6" />
        ) : (
          <span className="flex items-center gap-3 tracking-tighter uppercase">
            Sign In{" "}
            <ArrowRight className="h-6 w-6 group-hover:translate-x-2 transition-transform" />
          </span>
        )}
      </Button>

      {/* FOOTER LINKS */}
      <div className="text-center pt-4">
        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
          New here?{" "}
          <Link
            href="/register"
            className="text-primary-700 font-black hover:underline ml-1"
          >
            Create an account
          </Link>
        </p>
      </div>
    </form>
  );
}

function AmbientBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
      {/* Soft moving glows */}
      <motion.div
        animate={{
          x: [0, 50, 0],
          y: [0, 30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-[10%] -left-[10%] w-[60%] h-[60%] bg-primary-700/10 rounded-full blur-[120px]"
      />
      <motion.div
        animate={{
          x: [0, -50, 0],
          y: [0, -30, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-[10%] -right-[10%] w-[60%] h-[60%] bg-gold/10 rounded-full blur-[120px]"
      />

      {/* Delicate grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.08]"
        style={{
          backgroundImage: `radial-gradient(var(--color-primary-700) 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }}
      />
    </div>
  );
}