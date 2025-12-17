// src/app/(auth)/register/page.tsx
import RegisterForm from "@/components/auth/register-form";

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-primary p-4">
      <div className="w-full max-w-2xl">
        <div className="rounded-2xl bg-white p-8 shadow-2xl dark:bg-gray-900">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gradient bg-gradient-primary bg-clip-text text-transparent">
              Join MadrasahPro
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Create an account to start your Islamic education journey
            </p>
          </div>
          <RegisterForm />
        </div>
      </div>
    </div>
  );
}









// // src/app/(auth)/register/page.tsx
// "use client"

// import { useState } from "react"
// import { useRouter } from "next/navigation"
// import Link from "next/link"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Alert, AlertDescription } from "@/components/ui/alert"
// import { Loader2, CheckCircle, BookOpen, UserPlus } from "lucide-react"
// import { cn } from "@/lib/utils"

// export default function RegisterPage() {
//   const router = useRouter()
//   const [isLoading, setIsLoading] = useState(false)
//   const [error, setError] = useState<string | null>(null)
//   const [success, setSuccess] = useState(false)

//   async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
//     event.preventDefault()
//     setIsLoading(true)
//     setError(null)
//     setSuccess(false)

//     const formData = new FormData(event.currentTarget)
//     const data = {
//       name: formData.get("name") as string,
//       email: formData.get("email") as string,
//       phone: formData.get("phone") as string,
//       password: formData.get("password") as string,
//       confirmPassword: formData.get("confirmPassword") as string,
//       role: formData.get("role") as string,
//     }

//     // Validation
//     if (data.password !== data.confirmPassword) {
//       setError("Passwords do not match")
//       setIsLoading(false)
//       return
//     }

//     try {
//       const response = await fetch("/api/auth/register", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(data),
//       })

//       const result = await response.json()

//       if (!response.ok) {
//         throw new Error(result.message || "Registration failed")
//       }

//       setSuccess(true)
//       // Auto redirect after 3 seconds
//       setTimeout(() => {
//         router.push("/login?message=Registration successful! Please wait for admin approval.")
//       }, 3000)
//     } catch (error: any) {
//       setError(error.message || "Something went wrong")
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   if (success) {
//     return (
//       <div className="container flex h-screen w-screen flex-col items-center justify-center">
//         <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]">
//           <div className="flex flex-col items-center space-y-4 text-center">
//             <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
//               <CheckCircle className="h-10 w-10 text-green-600 dark:text-green-400" />
//             </div>
//             <h1 className="text-2xl font-semibold tracking-tight">
//               Registration Successful!
//             </h1>
//             <p className="text-sm text-gray-600 dark:text-gray-400">
//               Your account has been created and is pending admin approval.
//               You will receive an email when your account is approved.
//               Redirecting to login...
//             </p>
//           </div>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="container flex min-h-screen items-center justify-center py-12">
//       <div className="mx-auto w-full max-w-md">
//         <div className="mb-8 text-center">
//           <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-primary">
//             <UserPlus className="h-8 w-8 text-white" />
//           </div>
//           <h1 className="text-3xl font-bold tracking-tight">
//             Create Account
//           </h1>
//           <p className="mt-2 text-gray-600 dark:text-gray-400">
//             Join our Islamic education platform
//           </p>
//         </div>

//         <Card className="border-gray-200/50 bg-white/50 backdrop-blur-sm dark:border-gray-700/50 dark:bg-gray-800/50">
//           <CardHeader>
//             <CardTitle className="text-xl">Register</CardTitle>
//             <CardDescription>
//               Fill in your details to create an account
//             </CardDescription>
//           </CardHeader>
//           <CardContent>
//             <form onSubmit={onSubmit} className="space-y-4">
//               {error && (
//                 <Alert variant="destructive">
//                   <AlertDescription>{error}</AlertDescription>
//                 </Alert>
//               )}

//               <div className="space-y-2">
//                 <Label htmlFor="name">Full Name</Label>
//                 <Input
//                   id="name"
//                   name="name"
//                   placeholder="Enter your full name"
//                   required
//                   disabled={isLoading}
//                 />
//               </div>

//               <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
//                 <div className="space-y-2">
//                   <Label htmlFor="email">Email</Label>
//                   <Input
//                     id="email"
//                     name="email"
//                     type="email"
//                     placeholder="you@example.com"
//                     required
//                     disabled={isLoading}
//                   />
//                 </div>

//                 <div className="space-y-2">
//                   <Label htmlFor="phone">Phone Number</Label>
//                   <Input
//                     id="phone"
//                     name="phone"
//                     type="tel"
//                     placeholder="+1234567890"
//                     required
//                     disabled={isLoading}
//                   />
//                 </div>
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="role">I am a</Label>
//                 <Select name="role" required disabled={isLoading}>
//                   <SelectTrigger>
//                     <SelectValue placeholder="Select your role" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="STUDENT">Student</SelectItem>
//                     <SelectItem value="PARENT">Parent</SelectItem>
//                     <SelectItem value="TEACHER">Teacher</SelectItem>
//                   </SelectContent>
//                 </Select>
//                 <p className="text-xs text-gray-500 dark:text-gray-400">
//                   All registrations require admin approval
//                 </p>
//               </div>

//               <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
//                 <div className="space-y-2">
//                   <Label htmlFor="password">Password</Label>
//                   <Input
//                     id="password"
//                     name="password"
//                     type="password"
//                     placeholder="••••••••"
//                     required
//                     disabled={isLoading}
//                     minLength={8}
//                   />
//                 </div>

//                 <div className="space-y-2">
//                   <Label htmlFor="confirmPassword">Confirm Password</Label>
//                   <Input
//                     id="confirmPassword"
//                     name="confirmPassword"
//                     type="password"
//                     placeholder="••••••••"
//                     required
//                     disabled={isLoading}
//                   />
//                 </div>
//               </div>

//               <div className="space-y-4">
//                 <div className="flex items-center space-x-2">
//                   <div className="h-4 w-4 rounded border" />
//                   <label className="text-sm text-gray-600 dark:text-gray-400">
//                     By creating an account, you agree to our{" "}
//                     <Link href="/terms" className="text-purple-600 hover:underline dark:text-purple-400">
//                       Terms of Service
//                     </Link>{" "}
//                     and{" "}
//                     <Link href="/privacy" className="text-purple-600 hover:underline dark:text-purple-400">
//                       Privacy Policy
//                     </Link>
//                   </label>
//                 </div>

//                 <Button
//                   type="submit"
//                   className="w-full bg-gradient-primary"
//                   disabled={isLoading}
//                 >
//                   {isLoading ? (
//                     <>
//                       <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                       Creating Account...
//                     </>
//                   ) : (
//                     "Create Account"
//                   )}
//                 </Button>
//               </div>
//             </form>
//           </CardContent>
//           <CardFooter className="flex flex-col space-y-4">
//             <div className="text-center text-sm text-gray-600 dark:text-gray-400">
//               Already have an account?{" "}
//               <Link
//                 href="/login"
//                 className="font-medium text-purple-600 hover:underline dark:text-purple-400"
//               >
//                 Sign in
//               </Link>
//             </div>
//           </CardFooter>
//         </Card>

//         <div className="mt-8 text-center">
//           <div className="inline-flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
//             <BookOpen className="h-4 w-4" />
//             <span>Admin approval required for all accounts</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }