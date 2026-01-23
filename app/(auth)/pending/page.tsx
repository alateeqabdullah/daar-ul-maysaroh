// // // // src/app/pending/page.tsx
// // // import { auth } from "@/lib/auth";
// // // import { redirect } from "next/navigation";
// // // import { signOut } from "@/lib/auth";

// // // export default async function PendingApprovalPage() {
// // //   const session = await auth();

// // //   // If not logged in, redirect to login
// // //   if (!session) {
// // //     redirect("/login");
// // //   }

// // //   // If already approved, redirect to dashboard
// // //   if (session.user.status === "APPROVED") {
// // //     redirect("/dashboard");
// // //   }

// // //   return (
// // //     <div className="flex min-h-screen items-center justify-center bg-gradient-primary p-4">
// // //       <div className="w-full max-w-md">
// // //         <div className="rounded-2xl bg-white p-8 shadow-2xl dark:bg-gray-900 text-center">
// // //           <div className="mb-6">
// // //             <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900">
// // //               <span className="text-3xl">🕌</span>
// // //             </div>
// // //           </div>
// // //           <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
// // //             Account Pending Approval
// // //           </h1>
// // //           <p className="text-gray-600 dark:text-gray-400 mb-6">
// // //             Thank you for registering with MadrasahPro! Your account is
// // //             currently under review by our administration team. You will receive
// // //             an email notification once your account has been approved.
// // //           </p>
// // //           <div className="space-y-4">
// // //             <div className="rounded-lg bg-purple-50 dark:bg-purple-900/30 p-4">
// // //               <p className="text-sm text-purple-800 dark:text-purple-300">
// // //                 <strong>Note:</strong> This process usually takes 24-48 hours.
// // //                 If you have any questions, please contact us at
// // //                 admin@madrasah.com.
// // //               </p>
// // //             </div>
// // //             <form
// // //               action={async () => {
// // //                 "use server";
// // //                 await signOut({ redirectTo: "/login" });
// // //               }}
// // //             >
// // //               <button
// // //                 type="submit"
// // //                 className="w-full rounded-lg bg-gray-100 dark:bg-gray-800 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
// // //               >
// // //                 Sign Out
// // //               </button>
// // //             </form>
// // //           </div>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // }






// // // src/app/(auth)/pending/page.tsx
// // "use client"

// // import { useSession } from "next-auth/react"
// // import { useRouter } from "next/navigation"
// // import { useEffect } from "react"
// // import { Button } from "@/components/ui/button"
// // import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// // import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
// // import { Loader2, Clock, Mail, Shield, LogOut } from "lucide-react"
// // import { signOut } from "next-auth/react"

// // export default function PendingApprovalPage() {
// //   const { data: session, status } = useSession()
// //   const router = useRouter()

// //   useEffect(() => {
// //     if (status === "unauthenticated") {
// //       router.push("/login")
// //     } else if (session?.user?.status === "APPROVED") {
// //       router.push("/dashboard")
// //     }
// //   }, [session, status, router])

// //   if (status === "loading") {
// //     return (
// //       <div className="container flex min-h-screen items-center justify-center">
// //         <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
// //       </div>
// //     )
// //   }

// //   if (session?.user?.status !== "PENDING") {
// //     return null
// //   }

// //   const handleSignOut = async () => {
// //     await signOut({ redirect: false })
// //     router.push("/login")
// //   }

// //   return (
// //     <div className="container flex min-h-screen items-center justify-center py-12">
// //       <div className="mx-auto w-full max-w-2xl">
// //         <div className="mb-8 text-center">
// //           <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-yellow-100 dark:bg-yellow-900/30">
// //             <Clock className="h-10 w-10 text-yellow-600 dark:text-yellow-400" />
// //           </div>
// //           <h1 className="text-3xl font-bold tracking-tight">
// //             Account Pending Approval
// //           </h1>
// //           <p className="mt-2 text-gray-600 dark:text-gray-400">
// //             Your registration is being reviewed by our administration team
// //           </p>
// //         </div>

// //         <Card className="border-yellow-200/50 bg-yellow-50/30 backdrop-blur-sm dark:border-yellow-800/50 dark:bg-yellow-900/10">
// //           <CardHeader>
// //             <CardTitle className="flex items-center gap-2 text-xl">
// //               <Shield className="h-5 w-5" />
// //               Approval Required
// //             </CardTitle>
// //             <CardDescription>
// //               Your account status: <span className="font-semibold text-yellow-600">PENDING</span>
// //             </CardDescription>
// //           </CardHeader>
// //           <CardContent className="space-y-4">
// //             <Alert className="bg-white dark:bg-gray-800">
// //               <Mail className="h-4 w-4" />
// //               <AlertTitle>What happens next?</AlertTitle>
// //               <AlertDescription className="mt-2 space-y-2">
// //                 <p>1. Our administration team will review your registration details</p>
// //                 <p>2. You will receive an email notification once your account is approved</p>
// //                 <p>3. After approval, you can log in and access all features</p>
// //               </AlertDescription>
// //             </Alert>

// //             <div className="rounded-lg border border-yellow-200 bg-white p-4 dark:border-yellow-800 dark:bg-gray-800">
// //               <h3 className="font-semibold text-gray-900 dark:text-white">
// //                 Registration Details
// //               </h3>
// //               <div className="mt-2 grid grid-cols-1 gap-2 text-sm sm:grid-cols-2">
// //                 <div>
// //                   <span className="text-gray-600 dark:text-gray-400">Name:</span>
// //                   <span className="ml-2 font-medium">{session?.user?.name}</span>
// //                 </div>
// //                 <div>
// //                   <span className="text-gray-600 dark:text-gray-400">Email:</span>
// //                   <span className="ml-2 font-medium">{session?.user?.email}</span>
// //                 </div>
// //                 <div>
// //                   <span className="text-gray-600 dark:text-gray-400">Role:</span>
// //                   <span className="ml-2 font-medium capitalize">
// //                     {session?.user?.role.toLowerCase()}
// //                   </span>
// //                 </div>
// //                 <div>
// //                   <span className="text-gray-600 dark:text-gray-400">Registered:</span>
// //                   <span className="ml-2 font-medium">Just now</span>
// //                 </div>
// //               </div>
// //             </div>

// //             <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-800/50">
// //               <h3 className="font-semibold text-gray-900 dark:text-white">
// //                 Need help?
// //               </h3>
// //               <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
// //                 If you have any questions about your registration, please contact our support team at{" "}
// //                 <a href="mailto:support@madrasah.com" className="text-purple-600 hover:underline dark:text-purple-400">
// //                   support@madrasah.com
// //                 </a>
// //               </p>
// //             </div>
// //           </CardContent>
// //           <CardFooter className="flex flex-col space-y-3">
// //             <Button
// //               variant="outline"
// //               className="w-full border-yellow-300 text-yellow-700 hover:bg-yellow-50 dark:border-yellow-700 dark:text-yellow-400 dark:hover:bg-yellow-900/20"
// //               onClick={handleSignOut}
// //             >
// //               <LogOut className="mr-2 h-4 w-4" />
// //               Sign Out
// //             </Button>
// //             <p className="text-center text-sm text-gray-500 dark:text-gray-400">
// //               Typically, approvals are processed within 24-48 hours
// //             </p>
// //           </CardFooter>
// //         </Card>
// //       </div>
// //     </div>
// //   )
// // }





// // src/app/(auth)/pending/page.tsx
// "use client"

// import { useEffect, useState } from "react"
// import { useSession } from "next-auth/react"
// import { useRouter } from "next/navigation"
// import Link from "next/link"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { toast } from "sonner"
// import { Loader2, CheckCircle, Clock, Mail, AlertCircle, LogOut } from "lucide-react"
// import { prisma } from "@/lib/prisma"

// export default function PendingApprovalPage() {
//   const { data: session, status, update } = useSession()
//   const router = useRouter()
//   const [isRefreshing, setIsRefreshing] = useState(false)
//   const [lastChecked, setLastChecked] = useState<Date>(new Date())

//   // Redirect if already approved
//   useEffect(() => {
//     if (status === "authenticated" && session?.user?.status === "APPROVED") {
//       router.push("/dashboard")
//     }
//   }, [status, session, router])

//   const handleCheckStatus = async () => {
//     setIsRefreshing(true)
//     try {
//       // Update session to get latest status
//       await update()
//       setLastChecked(new Date())
      
//       if (session?.user?.status === "APPROVED") {
//         toast.success("Account approved!", {
//           description: "Redirecting to dashboard...",
//         })
//         router.push("/dashboard")
//       } else {
//         toast.info("Still pending approval", {
//           description: "Your account is still under review.",
//         })
//       }
//     } catch (error) {
//       toast.error("Failed to check status", {
//         description: "Please try again",
//       })
//     } finally {
//       setIsRefreshing(false)
//     }
//   }

//   const handleSignOut = async () => {
//     // You can add sign out logic here
//     router.push("/")
//   }

//   if (status === "loading") {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
//       <div className="container mx-auto px-4 py-12">
//         <div className="mx-auto max-w-2xl">
//           <Card className="border-gray-200/50 shadow-xl dark:border-gray-700/50">
//             <CardHeader className="space-y-1 text-center">
//               <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900/30">
//                 <Clock className="h-10 w-10 text-purple-600 dark:text-purple-400" />
//               </div>
//               <CardTitle className="text-2xl font-bold">Account Pending Approval</CardTitle>
//               <CardDescription className="text-lg">
//                 Your registration is under review
//               </CardDescription>
//             </CardHeader>

//             <CardContent className="space-y-6">
//               <div className="rounded-lg bg-blue-50 p-6 dark:bg-blue-900/20">
//                 <div className="flex items-start">
//                   <CheckCircle className="mr-3 h-6 w-6 text-blue-600 dark:text-blue-400" />
//                   <div className="space-y-2">
//                     <h3 className="font-semibold text-blue-900 dark:text-blue-100">
//                       Registration Successful!
//                     </h3>
//                     <p className="text-blue-800 dark:text-blue-200">
//                       Your account has been created successfully and is now pending admin approval.
//                       You&apos;ll be able to access all features once approved.
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               <div className="space-y-4">
//                 <div className="flex items-center justify-between rounded-lg border border-gray-200 p-4 dark:border-gray-700">
//                   <div className="flex items-center space-x-3">
//                     <Mail className="h-5 w-5 text-gray-400" />
//                     <div>
//                       <p className="font-medium">Email</p>
//                       <p className="text-sm text-gray-600 dark:text-gray-400">
//                         {session?.user?.email}
//                       </p>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="flex items-center justify-between rounded-lg border border-gray-200 p-4 dark:border-gray-700">
//                   <div className="flex items-center space-x-3">
//                     <Clock className="h-5 w-5 text-gray-400" />
//                     <div>
//                       <p className="font-medium">Account Status</p>
//                       <div className="flex items-center space-x-2">
//                         <span className="inline-flex items-center rounded-full bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300">
//                           Pending Approval
//                         </span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {session?.user?.role && (
//                   <div className="flex items-center justify-between rounded-lg border border-gray-200 p-4 dark:border-gray-700">
//                     <div className="flex items-center space-x-3">
//                       <AlertCircle className="h-5 w-5 text-gray-400" />
//                       <div>
//                         <p className="font-medium">Account Type</p>
//                         <p className="text-sm text-gray-600 dark:text-gray-400 capitalize">
//                           {session.user.role.toLowerCase().replace('_', ' ')}
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </div>

//               <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
//                 <h4 className="mb-2 font-semibold">What happens next?</h4>
//                 <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
//                   <li className="flex items-start">
//                     <span className="mr-2">•</span>
//                     <span>Our admin team will review your application within 24-48 hours</span>
//                   </li>
//                   <li className="flex items-start">
//                     <span className="mr-2">•</span>
//                     <span>You&apos;ll receive an email notification once approved</span>
//                   </li>
//                   <li className="flex items-start">
//                     <span className="mr-2">•</span>
//                     <span>You can check your approval status on this page</span>
//                   </li>
//                   <li className="flex items-start">
//                     <span className="mr-2">•</span>
//                     <span>Once approved, you&apos;ll have full access to your dashboard</span>
//                   </li>
//                 </ul>
//               </div>

//               <div className="text-center text-sm text-gray-500 dark:text-gray-400">
//                 Last checked: {lastChecked.toLocaleTimeString()}
//               </div>
//             </CardContent>

//             <CardFooter className="flex flex-col space-y-4">
//               <div className="grid w-full gap-3 sm:grid-cols-2">
//                 <Button
//                   onClick={handleCheckStatus}
//                   disabled={isRefreshing}
//                   className="bg-gradient-primary"
//                 >
//                   {isRefreshing ? (
//                     <>
//                       <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                       Checking...
//                     </>
//                   ) : (
//                     "Check Approval Status"
//                   )}
//                 </Button>
//                 <Button
//                   variant="outline"
//                   onClick={handleSignOut}
//                 >
//                   <LogOut className="mr-2 h-4 w-4" />
//                   Return Home
//                 </Button>
//               </div>

//               <div className="text-center text-sm text-gray-600 dark:text-gray-400">
//                 Need help?{" "}
//                 <Link
//                   href="/contact"
//                   className="font-medium text-purple-600 hover:text-purple-500 dark:text-purple-400"
//                 >
//                   Contact our support team
//                 </Link>
//               </div>
//             </CardFooter>
//           </Card>

//           <div className="mt-8 text-center">
//             <p className="text-sm text-gray-600 dark:text-gray-400">
//               While waiting, you can explore our{" "}
//               <Link href="/courses" className="font-medium text-purple-600 hover:text-purple-500 dark:text-purple-400">
//                 course catalog
//               </Link>{" "}
//               or read our{" "}
//               <Link href="/faq" className="font-medium text-purple-600 hover:text-purple-500 dark:text-purple-400">
//                 FAQs
//               </Link>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }



"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Clock,
  CheckCircle2,
  Mail,
  ArrowLeft,
  ShieldCheck,
} from "lucide-react";

export default function PendingApprovalPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-purple-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg"
      >
        <Card className="border-none shadow-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl overflow-hidden text-center">
          <CardHeader className="pt-12 pb-6">
            <div className="relative mx-auto mb-6">
              {/* Outer Glow Ring */}
              <div className="absolute inset-0 rounded-full bg-purple-200 animate-ping opacity-20" />
              <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-purple-600 text-white shadow-xl">
                <Clock className="h-12 w-12" />
              </div>
            </div>
            <h1 className="text-3xl font-extrabold text-slate-800 dark:text-white">
              Application Received
            </h1>
            <p className="text-purple-600 font-bold text-sm uppercase tracking-widest mt-2">
              Awaiting Admin Review
            </p>
          </CardHeader>

          <CardContent className="px-10 space-y-6">
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              JazakAllah Khayran for registering with{" "}
              <strong>Daar-Ul-Maysaroh</strong>. To maintain the quality of our
              community, all new accounts are reviewed by our administration.
            </p>

            {/* Timeline Steps */}
            <div className="grid gap-4 py-4 text-left">
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-slate-100 dark:bg-slate-800/50">
                <div className="mt-1 bg-green-100 text-green-600 p-1 rounded-full">
                  <CheckCircle2 className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-bold">Registration Submitted</p>
                  <p className="text-xs text-slate-500 font-medium">
                    Your details have been safely stored.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl bg-purple-50 border border-purple-100 dark:bg-purple-900/20">
                <div className="mt-1 bg-purple-600 text-white p-1 rounded-full animate-pulse">
                  <ShieldCheck className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-bold text-purple-700">
                    Verification in Progress
                  </p>
                  <p className="text-xs text-purple-500 font-medium">
                    Review typically takes 24-48 hours.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 opacity-50">
                <div className="mt-1 bg-slate-200 text-slate-400 p-1 rounded-full">
                  <Mail className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-400">
                    Confirmation Email
                  </p>
                  <p className="text-xs text-slate-400 font-medium">
                    You will receive an email once approved.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col gap-4 p-10 pt-0">
            <Button
              asChild
              variant="outline"
              className="w-full h-12 rounded-xl border-slate-200 font-bold text-slate-600 hover:bg-slate-50"
            >
              <Link href="/login">
                <ArrowLeft className="mr-2 h-4 w-4" /> Return to Login
              </Link>
            </Button>
            <p className="text-[11px] text-slate-400 font-medium">
              Need urgent help?{" "}
              <Link href="#" className="underline hover:text-purple-600">
                Contact Support
              </Link>
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}