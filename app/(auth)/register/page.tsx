"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import {
  Loader2,
  Mail,
  Lock,
  User,
  Phone,
  MapPin,
  BookOpen,
  Eye,
  EyeOff,
  CheckCircle2,
  GraduationCap,
  Users,
  Heart,
  Briefcase,
  Award,
} from "lucide-react";
import { cn } from "@/lib/utils";

const registerSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(8, "Please confirm your password"),
    phone: z.string().min(5, "Phone number is required"),
    role: z.enum(["STUDENT", "TEACHER", "PARENT"]),
    gender: z.enum(["MALE", "FEMALE"]),
    dateOfBirth: z.string().min(1, "Date of birth is required"),
    country: z.string().min(2, "Country is required"),
    hifzLevel: z.string().optional(),
    memorizationGoal: z.string().optional(),
    qualification: z.string().optional(),
    specialization: z.string().optional(),
    occupation: z.string().optional(),
    acceptTerms: z
      .boolean()
      .refine((val) => val === true, "You must accept the terms"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const totalSteps = 3;

  const {
    register,
    handleSubmit,
    watch,
    trigger,
    formState: { errors },
    setValue,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      role: "STUDENT",
      gender: "MALE",
      acceptTerms: false,
      country: "Morocco",
    },
  });

  const selectedRole = watch("role");
  const selectedGender = watch("gender");
  const password = watch("password") || "";

  // Enhancement: Password Strength Meter Logic
  const passwordStrength = useMemo(() => {
    let score = 0;
    if (!password) return 0;
    if (password.length > 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    return score;
  }, [password]);

  const nextStep = async () => {
    let fieldsToValidate: (keyof RegisterFormData)[] = [];
    if (step === 1)
      fieldsToValidate = ["name", "email", "password", "confirmPassword"];
    if (step === 2)
      fieldsToValidate = ["phone", "dateOfBirth", "country", "gender", "role"];

    const isValid = await trigger(fieldsToValidate);
    if (isValid) {
      setStep((s) => s + 1);
    } else {
      toast.error("Please fix the errors on this page");
    }
  };

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Registration failed");

      toast.success("Welcome to Daar-Ul-Maysaroh!", {
        description: "Registration successful. Awaiting admin approval.",
      });
      router.push("/pending");
    } catch (error) {
      toast.error("Error", {
        description:
          error instanceof Error ? error.message : "Registration failed",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-purple-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="container mx-auto flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-2xl">
          {/* Progress Indicator with Glow Enhancement */}
          <div className="mb-10 px-6">
            <div className="flex items-center justify-between mb-4">
              {["Credential", "Personal", "Profile"].map((label, i) => (
                <div key={label} className="flex flex-col items-center gap-2">
                  <div
                    className={cn(
                      "h-10 w-10 rounded-full flex items-center justify-center border-2 transition-all duration-500",
                      step > i + 1
                        ? "bg-purple-600 border-purple-600 text-white shadow-[0_0_15px_rgba(147,51,234,0.4)]"
                        : step === i + 1
                        ? "border-purple-600 text-purple-600 shadow-lg shadow-purple-200 bg-white"
                        : "border-slate-200 text-slate-400 bg-slate-50"
                    )}
                  >
                    {step > i + 1 ? (
                      <CheckCircle2 className="h-6 w-6" />
                    ) : (
                      <span className="font-bold">{i + 1}</span>
                    )}
                  </div>
                  <span
                    className={cn(
                      "text-[10px] uppercase tracking-widest font-bold",
                      step === i + 1 ? "text-purple-600" : "text-slate-400"
                    )}
                  >
                    {label}
                  </span>
                </div>
              ))}
            </div>
            <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden shadow-inner">
              <motion.div
                className="h-full bg-purple-600 shadow-[0_0_10px_rgba(147,51,234,0.8)]"
                initial={{ width: "33.3%" }}
                animate={{ width: `${(step / totalSteps) * 100}%` }}
              />
            </div>
          </div>

          <Card className="border-none shadow-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl overflow-hidden rounded-3xl">
            <CardHeader className="space-y-2 text-center pt-10 pb-6 bg-gradient-to-b from-purple-50/50 to-transparent dark:from-purple-900/10">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-purple-600 text-white shadow-xl rotate-3 hover:rotate-0 transition-transform cursor-pointer">
                <BookOpen className="h-8 w-8" />
              </div>
              <CardTitle className="text-3xl font-extrabold tracking-tight text-slate-800 dark:text-white">
                Daar-Ul-Maysaroh
              </CardTitle>
              <CardDescription className="text-base font-medium">
                Create your account to start your journey of Ilm
              </CardDescription>
            </CardHeader>

            <form onSubmit={handleSubmit(onSubmit)}>
              <CardContent className="p-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-6"
                  >
                    {step === 1 && (
                      <div className="grid gap-6">
                        <div className="space-y-2">
                          <Label className="text-sm font-semibold">
                            Full Name
                          </Label>
                          <div className="relative">
                            <User className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                            <Input
                              className={cn(
                                "pl-10 h-11 border-slate-200 focus:ring-purple-500 rounded-xl",
                                errors.name && "border-red-500"
                              )}
                              placeholder="Abdullah ibn Ahmad"
                              {...register("name")}
                            />
                          </div>
                          {errors.name && (
                            <p className="text-xs text-red-500 font-medium">
                              {errors.name.message}
                            </p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label className="text-sm font-semibold">
                            Email Address
                          </Label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                            <Input
                              type="email"
                              className={cn(
                                "pl-10 h-11 border-slate-200 rounded-xl",
                                errors.email && "border-red-500"
                              )}
                              placeholder="abdullah@ilm.com"
                              {...register("email")}
                            />
                          </div>
                          {errors.email && (
                            <p className="text-xs text-red-500 font-medium">
                              {errors.email.message}
                            </p>
                          )}
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                          <div className="space-y-2">
                            <Label className="text-sm font-semibold">
                              Password
                            </Label>
                            <div className="relative">
                              <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                              <Input
                                type={showPassword ? "text" : "password"}
                                className={cn(
                                  "pl-10 h-11 rounded-xl",
                                  errors.password && "border-red-500"
                                )}
                                {...register("password")}
                              />
                              <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-3 text-slate-400 hover:text-purple-600 transition-colors"
                              >
                                {showPassword ? (
                                  <EyeOff className="h-4 w-4" />
                                ) : (
                                  <Eye className="h-4 w-4" />
                                )}
                              </button>
                            </div>

                            {/* Enhancement: Password Strength Meter */}
                            <div className="flex gap-1 mt-2 px-1">
                              {[1, 2, 3, 4].map((bar) => (
                                <div
                                  key={bar}
                                  className={cn(
                                    "h-1.5 flex-1 rounded-full transition-all duration-300",
                                    passwordStrength >= bar
                                      ? passwordStrength <= 2
                                        ? "bg-red-500"
                                        : passwordStrength === 3
                                        ? "bg-yellow-500"
                                        : "bg-green-500"
                                      : "bg-slate-100"
                                  )}
                                />
                              ))}
                            </div>

                            {errors.password && (
                              <p className="text-xs text-red-500 font-medium">
                                {errors.password.message}
                              </p>
                            )}
                          </div>
                          <div className="space-y-2">
                            <Label className="text-sm font-semibold">
                              Confirm Password
                            </Label>
                            <div className="relative">
                              <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                              <Input
                                type={showPassword ? "text" : "password"}
                                className={cn(
                                  "pl-10 h-11 rounded-xl",
                                  errors.confirmPassword && "border-red-500"
                                )}
                                {...register("confirmPassword")}
                              />
                            </div>
                            {errors.confirmPassword && (
                              <p className="text-xs text-red-500 font-medium">
                                {errors.confirmPassword.message}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    {step === 2 && (
                      <div className="grid gap-6">
                        <div className="grid gap-4 sm:grid-cols-2">
                          <div className="space-y-2">
                            <Label className="text-sm font-semibold">
                              Phone Number
                            </Label>
                            <Input
                              className={cn(
                                "h-11 rounded-xl",
                                errors.phone && "border-red-500"
                              )}
                              placeholder="+212 ..."
                              {...register("phone")}
                            />
                            {errors.phone && (
                              <p className="text-xs text-red-500 font-medium">
                                {errors.phone.message}
                              </p>
                            )}
                          </div>
                          <div className="space-y-2">
                            <Label className="text-sm font-semibold">
                              Date of Birth
                            </Label>
                            <Input
                              type="date"
                              className={cn(
                                "h-11 rounded-xl",
                                errors.dateOfBirth && "border-red-500"
                              )}
                              {...register("dateOfBirth")}
                            />
                            {errors.dateOfBirth && (
                              <p className="text-xs text-red-500 font-medium">
                                Required
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label className="text-sm font-semibold">
                            Country
                          </Label>
                          <div className="relative">
                            <MapPin className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                            <Input
                              className={cn(
                                "pl-10 h-11 rounded-xl",
                                errors.country && "border-red-500"
                              )}
                              placeholder="Morocco"
                              {...register("country")}
                            />
                          </div>
                        </div>

                        {/* Enhancement: Gender Selection UI (Toggle Switch Style) */}
                        <div className="space-y-3">
                          <Label className="text-sm font-semibold text-slate-700">
                            I am a...
                          </Label>
                          <div className="flex p-1 bg-slate-100 rounded-2xl w-full">
                            {[
                              { id: "MALE", label: "Brother" },
                              { id: "FEMALE", label: "Sister" },
                            ].map((g) => (
                              <button
                                key={g.id}
                                type="button"
                                onClick={() => setValue("gender", g.id as any)}
                                className={cn(
                                  "flex-1 flex items-center justify-center py-2.5 rounded-xl font-bold transition-all duration-300",
                                  selectedGender === g.id
                                    ? "bg-white text-purple-600 shadow-sm scale-[1.02]"
                                    : "text-slate-500 hover:text-slate-700"
                                )}
                              >
                                {g.label}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Account Type Selection with Larger Icons and Purple Tint */}
                        <div className="space-y-3">
                          <Label className="text-sm font-semibold text-slate-700">
                            Account Type
                          </Label>
                          <div className="grid grid-cols-3 gap-3">
                            {[
                              {
                                id: "STUDENT",
                                label: "Talib",
                                sub: "Student",
                                icon: GraduationCap,
                              },
                              {
                                id: "TEACHER",
                                label: "Mu'allim",
                                sub: "Teacher",
                                icon: BookOpen,
                              },
                              {
                                id: "PARENT",
                                label: "Wali",
                                sub: "Parent",
                                icon: Users,
                              },
                            ].map((item) => (
                              <button
                                key={item.id}
                                type="button"
                                onClick={() => setValue("role", item.id as any)}
                                className={cn(
                                  "flex flex-col items-center gap-2 rounded-2xl border-2 p-5 transition-all duration-300",
                                  selectedRole === item.id
                                    ? "border-purple-600 bg-purple-50/50 text-purple-700 shadow-[0_8px_20px_-6px_rgba(147,51,234,0.3)]"
                                    : "border-slate-100 bg-slate-50/50 hover:border-purple-200"
                                )}
                              >
                                <item.icon
                                  className={cn(
                                    "h-8 w-8 mb-1",
                                    selectedRole === item.id
                                      ? "text-purple-600 animate-pulse"
                                      : "text-slate-400"
                                  )}
                                />
                                <div className="text-center">
                                  <div className="text-xs font-bold leading-tight">
                                    {item.label}
                                  </div>
                                  <div className="text-[10px] opacity-60 uppercase font-medium">
                                    {item.sub}
                                  </div>
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {step === 3 && (
                      <div className="space-y-6">
                        {selectedRole === "STUDENT" && (
                          <div className="space-y-4 p-6 rounded-3xl bg-slate-50 border border-slate-100 dark:bg-slate-800/50">
                            <Label className="text-purple-700 font-bold flex items-center gap-2 text-sm uppercase tracking-wider">
                              <Heart className="h-4 w-4" /> Hifz Details
                            </Label>
                            <Select
                              onValueChange={(v) => setValue("hifzLevel", v)}
                            >
                              <SelectTrigger className="h-11 bg-white border-slate-200 rounded-xl">
                                <SelectValue placeholder="Current Quran Level" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="BEGINNER">
                                  Beginner (Juz 30)
                                </SelectItem>
                                <SelectItem value="INTERMEDIATE">
                                  Intermediate (Juz 15-29)
                                </SelectItem>
                                <SelectItem value="ADVANCED">
                                  Advanced (Juz 1-14)
                                </SelectItem>
                                <SelectItem value="HAFIZ">
                                  Complete Hafiz
                                </SelectItem>
                              </SelectContent>
                            </Select>
                            <Input
                              placeholder="Memorization Goal (e.g. 2 years)"
                              className="h-11 bg-white rounded-xl"
                              {...register("memorizationGoal")}
                            />
                          </div>
                        )}

                        {selectedRole === "TEACHER" && (
                          <div className="space-y-4 p-6 rounded-3xl bg-slate-50 border border-slate-100 dark:bg-slate-800/50">
                            <Label className="text-purple-700 font-bold flex items-center gap-2 text-sm uppercase tracking-wider">
                              <Award className="h-4 w-4" /> Academic Info
                            </Label>
                            <Input
                              placeholder="Highest Qualification (e.g. Masters)"
                              className="h-11 bg-white rounded-xl"
                              {...register("qualification")}
                            />
                            <Input
                              placeholder="Specialization (e.g. Tajweed)"
                              className="h-11 bg-white rounded-xl"
                              {...register("specialization")}
                            />
                          </div>
                        )}

                        {selectedRole === "PARENT" && (
                          <div className="space-y-4 p-6 rounded-3xl bg-slate-50 border border-slate-100 dark:bg-slate-800/50">
                            <Label className="text-purple-700 font-bold flex items-center gap-2 text-sm uppercase tracking-wider">
                              <Briefcase className="h-4 w-4" /> Guardian Info
                            </Label>
                            <Input
                              placeholder="Occupation / Relation to Student"
                              className="h-11 bg-white rounded-xl"
                              {...register("occupation")}
                            />
                          </div>
                        )}

                        <div className="flex items-start space-x-3 p-4 bg-purple-50/50 rounded-2xl border border-purple-100 transition-colors hover:bg-purple-50">
                          <Checkbox
                            id="terms"
                            checked={watch("acceptTerms")}
                            onCheckedChange={(c) =>
                              setValue("acceptTerms", c === true)
                            }
                            className="mt-1"
                          />
                          <div className="grid gap-1.5 leading-none">
                            <Label
                              htmlFor="terms"
                              className="text-xs font-bold text-slate-700 cursor-pointer"
                            >
                              Accept Terms & Conditions
                            </Label>
                            <p className="text-[11px] text-slate-500 font-medium leading-relaxed">
                              I understand that registration requires admin
                              review within 24-48 hours.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </CardContent>

              <CardFooter className="flex flex-col gap-4 p-8 pt-0">
                <div className="flex w-full gap-3">
                  {step > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      className="flex-1 h-12 font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
                      onClick={() => setStep(step - 1)}
                    >
                      Back
                    </Button>
                  )}
                  <Button
                    type={step === totalSteps ? "submit" : "button"}
                    className="flex-1 h-12 bg-purple-600 hover:bg-purple-700 font-extrabold shadow-lg transition-all active:scale-[0.98] rounded-xl"
                    onClick={step < totalSteps ? nextStep : undefined}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <Loader2 className="animate-spin mr-2 h-5 w-5" />
                    ) : step === totalSteps ? (
                      "Submit Request"
                    ) : (
                      "Continue"
                    )}
                  </Button>
                </div>
                <p className="text-sm text-center text-slate-500 font-medium">
                  Already a member?{" "}
                  <Link
                    href="/login"
                    className="text-purple-600 font-bold hover:underline ml-1"
                  >
                    Log in
                  </Link>
                </p>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}
