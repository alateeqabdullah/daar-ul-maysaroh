// // src/app/(auth)/register/page.tsx
// import RegisterForm from "@/components/auth/register-form";

// export default function RegisterPage() {
//   return (
//     <div className="flex min-h-screen items-center justify-center bg-gradient-primary p-4">
//       <div className="w-full max-w-2xl">
//         <div className="rounded-2xl bg-white p-8 shadow-2xl dark:bg-gray-900">
//           <div className="mb-8 text-center">
//             <h1 className="text-3xl font-bold text-gradient bg-gradient-primary bg-clip-text text-transparent">
//               Join MadrasahPro
//             </h1>
//             <p className="mt-2 text-gray-600 dark:text-gray-400">
//               Create an account to start your Islamic education journey
//             </p>
//           </div>
//           <RegisterForm />
//         </div>
//       </div>
//     </div>
//   );
// }









// // // src/app/(auth)/register/page.tsx
// // "use client"

// // import { useState } from "react"
// // import { useRouter } from "next/navigation"
// // import Link from "next/link"
// // import { Button } from "@/components/ui/button"
// // import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// // import { Input } from "@/components/ui/input"
// // import { Label } from "@/components/ui/label"
// // import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// // import { Alert, AlertDescription } from "@/components/ui/alert"
// // import { Loader2, CheckCircle, BookOpen, UserPlus } from "lucide-react"
// // import { cn } from "@/lib/utils"

// // export default function RegisterPage() {
// //   const router = useRouter()
// //   const [isLoading, setIsLoading] = useState(false)
// //   const [error, setError] = useState<string | null>(null)
// //   const [success, setSuccess] = useState(false)

// //   async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
// //     event.preventDefault()
// //     setIsLoading(true)
// //     setError(null)
// //     setSuccess(false)

// //     const formData = new FormData(event.currentTarget)
// //     const data = {
// //       name: formData.get("name") as string,
// //       email: formData.get("email") as string,
// //       phone: formData.get("phone") as string,
// //       password: formData.get("password") as string,
// //       confirmPassword: formData.get("confirmPassword") as string,
// //       role: formData.get("role") as string,
// //     }

// //     // Validation
// //     if (data.password !== data.confirmPassword) {
// //       setError("Passwords do not match")
// //       setIsLoading(false)
// //       return
// //     }

// //     try {
// //       const response = await fetch("/api/auth/register", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify(data),
// //       })

// //       const result = await response.json()

// //       if (!response.ok) {
// //         throw new Error(result.message || "Registration failed")
// //       }

// //       setSuccess(true)
// //       // Auto redirect after 3 seconds
// //       setTimeout(() => {
// //         router.push("/login?message=Registration successful! Please wait for admin approval.")
// //       }, 3000)
// //     } catch (error: any) {
// //       setError(error.message || "Something went wrong")
// //     } finally {
// //       setIsLoading(false)
// //     }
// //   }

// //   if (success) {
// //     return (
// //       <div className="container flex h-screen w-screen flex-col items-center justify-center">
// //         <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]">
// //           <div className="flex flex-col items-center space-y-4 text-center">
// //             <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
// //               <CheckCircle className="h-10 w-10 text-green-600 dark:text-green-400" />
// //             </div>
// //             <h1 className="text-2xl font-semibold tracking-tight">
// //               Registration Successful!
// //             </h1>
// //             <p className="text-sm text-gray-600 dark:text-gray-400">
// //               Your account has been created and is pending admin approval.
// //               You will receive an email when your account is approved.
// //               Redirecting to login...
// //             </p>
// //           </div>
// //         </div>
// //       </div>
// //     )
// //   }

// //   return (
// //     <div className="container flex min-h-screen items-center justify-center py-12">
// //       <div className="mx-auto w-full max-w-md">
// //         <div className="mb-8 text-center">
// //           <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-primary">
// //             <UserPlus className="h-8 w-8 text-white" />
// //           </div>
// //           <h1 className="text-3xl font-bold tracking-tight">
// //             Create Account
// //           </h1>
// //           <p className="mt-2 text-gray-600 dark:text-gray-400">
// //             Join our Islamic education platform
// //           </p>
// //         </div>

// //         <Card className="border-gray-200/50 bg-white/50 backdrop-blur-sm dark:border-gray-700/50 dark:bg-gray-800/50">
// //           <CardHeader>
// //             <CardTitle className="text-xl">Register</CardTitle>
// //             <CardDescription>
// //               Fill in your details to create an account
// //             </CardDescription>
// //           </CardHeader>
// //           <CardContent>
// //             <form onSubmit={onSubmit} className="space-y-4">
// //               {error && (
// //                 <Alert variant="destructive">
// //                   <AlertDescription>{error}</AlertDescription>
// //                 </Alert>
// //               )}

// //               <div className="space-y-2">
// //                 <Label htmlFor="name">Full Name</Label>
// //                 <Input
// //                   id="name"
// //                   name="name"
// //                   placeholder="Enter your full name"
// //                   required
// //                   disabled={isLoading}
// //                 />
// //               </div>

// //               <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
// //                 <div className="space-y-2">
// //                   <Label htmlFor="email">Email</Label>
// //                   <Input
// //                     id="email"
// //                     name="email"
// //                     type="email"
// //                     placeholder="you@example.com"
// //                     required
// //                     disabled={isLoading}
// //                   />
// //                 </div>

// //                 <div className="space-y-2">
// //                   <Label htmlFor="phone">Phone Number</Label>
// //                   <Input
// //                     id="phone"
// //                     name="phone"
// //                     type="tel"
// //                     placeholder="+1234567890"
// //                     required
// //                     disabled={isLoading}
// //                   />
// //                 </div>
// //               </div>

// //               <div className="space-y-2">
// //                 <Label htmlFor="role">I am a</Label>
// //                 <Select name="role" required disabled={isLoading}>
// //                   <SelectTrigger>
// //                     <SelectValue placeholder="Select your role" />
// //                   </SelectTrigger>
// //                   <SelectContent>
// //                     <SelectItem value="STUDENT">Student</SelectItem>
// //                     <SelectItem value="PARENT">Parent</SelectItem>
// //                     <SelectItem value="TEACHER">Teacher</SelectItem>
// //                   </SelectContent>
// //                 </Select>
// //                 <p className="text-xs text-gray-500 dark:text-gray-400">
// //                   All registrations require admin approval
// //                 </p>
// //               </div>

// //               <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
// //                 <div className="space-y-2">
// //                   <Label htmlFor="password">Password</Label>
// //                   <Input
// //                     id="password"
// //                     name="password"
// //                     type="password"
// //                     placeholder="••••••••"
// //                     required
// //                     disabled={isLoading}
// //                     minLength={8}
// //                   />
// //                 </div>

// //                 <div className="space-y-2">
// //                   <Label htmlFor="confirmPassword">Confirm Password</Label>
// //                   <Input
// //                     id="confirmPassword"
// //                     name="confirmPassword"
// //                     type="password"
// //                     placeholder="••••••••"
// //                     required
// //                     disabled={isLoading}
// //                   />
// //                 </div>
// //               </div>

// //               <div className="space-y-4">
// //                 <div className="flex items-center space-x-2">
// //                   <div className="h-4 w-4 rounded border" />
// //                   <label className="text-sm text-gray-600 dark:text-gray-400">
// //                     By creating an account, you agree to our{" "}
// //                     <Link href="/terms" className="text-purple-600 hover:underline dark:text-purple-400">
// //                       Terms of Service
// //                     </Link>{" "}
// //                     and{" "}
// //                     <Link href="/privacy" className="text-purple-600 hover:underline dark:text-purple-400">
// //                       Privacy Policy
// //                     </Link>
// //                   </label>
// //                 </div>

// //                 <Button
// //                   type="submit"
// //                   className="w-full bg-gradient-primary"
// //                   disabled={isLoading}
// //                 >
// //                   {isLoading ? (
// //                     <>
// //                       <Loader2 className="mr-2 h-4 w-4 animate-spin" />
// //                       Creating Account...
// //                     </>
// //                   ) : (
// //                     "Create Account"
// //                   )}
// //                 </Button>
// //               </div>
// //             </form>
// //           </CardContent>
// //           <CardFooter className="flex flex-col space-y-4">
// //             <div className="text-center text-sm text-gray-600 dark:text-gray-400">
// //               Already have an account?{" "}
// //               <Link
// //                 href="/login"
// //                 className="font-medium text-purple-600 hover:underline dark:text-purple-400"
// //               >
// //                 Sign in
// //               </Link>
// //             </div>
// //           </CardFooter>
// //         </Card>

// //         <div className="mt-8 text-center">
// //           <div className="inline-flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
// //             <BookOpen className="h-4 w-4" />
// //             <span>Admin approval required for all accounts</span>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   )
// // }




// src/app/(auth)/register/page.tsx
"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { toast } from "sonner"
import { Loader2, Mail, Lock, User, Phone, Calendar, MapPin, BookOpen } from "lucide-react"
import { cn } from "@/lib/utils"

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string().min(8, "Please confirm your password"),
  phone: z.string().min(5, "Phone number is required"),
  role: z.enum(["STUDENT", "TEACHER", "PARENT"]),
  gender: z.enum(["MALE", "FEMALE"]),
  dateOfBirth: z.string().optional(),
  country: z.string().min(2, "Country is required"),
  
  // Student specific
  hifzLevel: z.string().optional(),
  memorizationGoal: z.string().optional(),
  
  // Teacher specific
  qualification: z.string().optional(),
  specialization: z.string().optional(),
  
  // Parent specific
  occupation: z.string().optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

type RegisterFormData = z.infer<typeof registerSchema>

export default function RegisterPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [step, setStep] = useState(1)
  const totalSteps = 3

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      role: "STUDENT",
      gender: "MALE",
    },
  })

  const selectedRole = watch("role")

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true)
    
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || "Registration failed")
      }

      toast.success("Registration successful!", {
        description: "Your account is pending admin approval. You'll receive an email once approved.",
      })

      // Redirect to pending approval page
      router.push("/pending")
    } catch (error) {
      toast.error("Registration failed", {
        description: error instanceof Error ? error.message : "Please try again",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-2xl">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Step {step} of {totalSteps}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {step === 1 && "Account Details"}
                {step === 2 && "Personal Information"}
                {step === 3 && "Role Details"}
              </div>
            </div>
            <div className="h-2 w-full rounded-full bg-gray-200 dark:bg-gray-700">
              <div 
                className="h-full rounded-full bg-gradient-primary transition-all duration-300"
                style={{ width: `${(step / totalSteps) * 100}%` }}
              />
            </div>
          </div>

          <Card className="border-gray-200/50 shadow-xl dark:border-gray-700/50">
            <CardHeader className="space-y-1 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-primary">
                <BookOpen className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold">Join MadrasahPro</CardTitle>
              <CardDescription>
                Create your account and start your Islamic education journey
              </CardDescription>
            </CardHeader>

            <form onSubmit={handleSubmit(onSubmit)}>
              <CardContent className="space-y-6">
                {/* Step 1: Account Details */}
                {step === 1 && (
                  <div className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name *</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            id="name"
                            className="pl-10"
                            placeholder="John Doe"
                            {...register("name")}
                          />
                        </div>
                        {errors.name && (
                          <p className="text-sm text-red-500">{errors.name.message}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            id="email"
                            type="email"
                            className="pl-10"
                            placeholder="john@example.com"
                            {...register("email")}
                          />
                        </div>
                        {errors.email && (
                          <p className="text-sm text-red-500">{errors.email.message}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="password">Password *</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            id="password"
                            type="password"
                            className="pl-10"
                            placeholder="••••••••"
                            {...register("password")}
                          />
                        </div>
                        {errors.password && (
                          <p className="text-sm text-red-500">{errors.password.message}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirm Password *</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            id="confirmPassword"
                            type="password"
                            className="pl-10"
                            placeholder="••••••••"
                            {...register("confirmPassword")}
                          />
                        </div>
                        {errors.confirmPassword && (
                          <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: Personal Information */}
                {step === 2 && (
                  <div className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number *</Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            id="phone"
                            type="tel"
                            className="pl-10"
                            placeholder="+1234567890"
                            {...register("phone")}
                          />
                        </div>
                        {errors.phone && (
                          <p className="text-sm text-red-500">{errors.phone.message}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="dateOfBirth">Date of Birth</Label>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            id="dateOfBirth"
                            type="date"
                            className="pl-10"
                            {...register("dateOfBirth")}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="country">Country *</Label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            id="country"
                            className="pl-10"
                            placeholder="Your country"
                            {...register("country")}
                          />
                        </div>
                        {errors.country && (
                          <p className="text-sm text-red-500">{errors.country.message}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label>Gender *</Label>
                        <RadioGroup
                          defaultValue="MALE"
                          onValueChange={(value) => setValue("gender", value as "MALE" | "FEMALE")}
                          className="flex space-x-4"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="MALE" id="male" />
                            <Label htmlFor="male">Male</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="FEMALE" id="female" />
                            <Label htmlFor="female">Female</Label>
                          </div>
                        </RadioGroup>
                        {errors.gender && (
                          <p className="text-sm text-red-500">{errors.gender.message}</p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Account Type *</Label>
                      <Select
                        defaultValue="STUDENT"
                        onValueChange={(value) => setValue("role", value as any)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select your role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="STUDENT">Student (Talib al-Ilm)</SelectItem>
                          <SelectItem value="TEACHER">{`Teacher (Mu'allim)`}</SelectItem>
                          <SelectItem value="PARENT">Parent (Wali)</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.role && (
                        <p className="text-sm text-red-500">{errors.role.message}</p>
                      )}
                    </div>
                  </div>
                )}

                {/* Step 3: Role-specific Details */}
                {step === 3 && (
                  <div className="space-y-4">
                    {/* Student Details */}
                    {selectedRole === "STUDENT" && (
                      <>
                        <div className="space-y-2">
                          <Label htmlFor="hifzLevel">Current Quran Level</Label>
                          <Select onValueChange={(value) => setValue("hifzLevel", value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select your current level" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="BEGINNER">Beginner (Starting Juz 30)</SelectItem>
                              <SelectItem value="INTERMEDIATE">Intermediate (Juz 20-29)</SelectItem>
                              <SelectItem value="ADVANCED">Advanced (Juz 1-19)</SelectItem>
                              <SelectItem value="HAFIZ">Hafiz (Complete Quran)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="memorizationGoal">Memorization Goal</Label>
                          <Input
                            id="memorizationGoal"
                            placeholder="e.g., Complete Quran in 3 years"
                            {...register("memorizationGoal")}
                          />
                        </div>
                      </>
                    )}

                    {/* Teacher Details */}
                    {selectedRole === "TEACHER" && (
                      <>
                        <div className="space-y-2">
                          <Label htmlFor="qualification">Qualifications</Label>
                          <Input
                            id="qualification"
                            placeholder="e.g., BA in Islamic Studies, Ijazah in Hafs"
                            {...register("qualification")}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="specialization">Specialization</Label>
                          <Input
                            id="specialization"
                            placeholder="e.g., Quran Memorization, Fiqh, Arabic Language"
                            {...register("specialization")}
                          />
                        </div>
                      </>
                    )}

                    {/* Parent Details */}
                    {selectedRole === "PARENT" && (
                      <div className="space-y-2">
                        <Label htmlFor="occupation">Occupation (Optional)</Label>
                        <Input
                          id="occupation"
                          placeholder="e.g., Business, Doctor, Engineer"
                          {...register("occupation")}
                        />
                      </div>
                    )}

                    {/* Terms and Conditions */}
                    <div className="space-y-4 pt-4">
                      <div className="flex items-start space-x-2 rounded-lg border border-gray-200 p-4 dark:border-gray-700">
                        <div className="mt-0.5">
                          <div className="h-5 w-5 rounded border border-gray-300 dark:border-gray-600" />
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm font-medium">Terms & Conditions</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            By creating an account, you agree to our Terms of Service and Privacy Policy. 
                            Your account will be reviewed by administrators before activation.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>

              <CardFooter className="flex flex-col space-y-4">
                <div className="flex w-full justify-between">
                  {step > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setStep(step - 1)}
                      disabled={isLoading}
                    >
                      Back
                    </Button>
                  )}

                  <div className={cn("ml-auto", step === 1 && "w-full")}>
                    {step < totalSteps ? (
                      <Button
                        type="button"
                        className="w-full bg-gradient-primary sm:w-auto"
                        onClick={() => setStep(step + 1)}
                      >
                        Continue
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        className="w-full bg-gradient-primary sm:w-auto"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Creating Account...
                          </>
                        ) : (
                          "Create Account"
                        )}
                      </Button>
                    )}
                  </div>
                </div>

                <div className="w-full text-center text-sm text-gray-600 dark:text-gray-400">
                  Already have an account?{" "}
                  <Link
                    href="/login"
                    className="font-medium text-purple-600 hover:text-purple-500 dark:text-purple-400"
                  >
                    Sign in
                  </Link>
                </div>

                <div className="text-center text-xs text-gray-500 dark:text-gray-400">
                  Your account requires admin approval. You&apos;ll receive an email once approved.
                </div>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </div>
  )
}