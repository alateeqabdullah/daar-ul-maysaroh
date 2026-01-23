// // src/app/pending/page.tsx
// import { auth } from "@/lib/auth";
// import { redirect } from "next/navigation";
// import { signOut } from "@/lib/auth";

// export default async function PendingApprovalPage() {
//   const session = await auth();

//   // If not logged in, redirect to login
//   if (!session) {
//     redirect("/login");
//   }

//   // If already approved, redirect to dashboard
//   if (session.user.status === "APPROVED") {
//     redirect("/dashboard");
//   }

//   return (
//     <div className="flex min-h-screen items-center justify-center bg-gradient-primary p-4">
//       <div className="w-full max-w-md">
//         <div className="rounded-2xl bg-white p-8 shadow-2xl dark:bg-gray-900 text-center">
//           <div className="mb-6">
//             <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900">
//               <span className="text-3xl">🕌</span>
//             </div>
//           </div>
//           <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
//             Account Pending Approval
//           </h1>
//           <p className="text-gray-600 dark:text-gray-400 mb-6">
//             Thank you for registering with MadrasahPro! Your account is
//             currently under review by our administration team. You will receive
//             an email notification once your account has been approved.
//           </p>
//           <div className="space-y-4">
//             <div className="rounded-lg bg-purple-50 dark:bg-purple-900/30 p-4">
//               <p className="text-sm text-purple-800 dark:text-purple-300">
//                 <strong>Note:</strong> This process usually takes 24-48 hours.
//                 If you have any questions, please contact us at
//                 admin@madrasah.com.
//               </p>
//             </div>
//             <form
//               action={async () => {
//                 "use server";
//                 await signOut({ redirectTo: "/login" });
//               }}
//             >
//               <button
//                 type="submit"
//                 className="w-full rounded-lg bg-gray-100 dark:bg-gray-800 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
//               >
//                 Sign Out
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }






// src/app/(auth)/pending/page.tsx
"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Loader2, Clock, Mail, Shield, LogOut } from "lucide-react"
import { signOut } from "next-auth/react"

export default function PendingApprovalPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login")
    } else if (session?.user?.status === "APPROVED") {
      router.push("/dashboard")
    }
  }, [session, status, router])

  if (status === "loading") {
    return (
      <div className="container flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
      </div>
    )
  }

  if (session?.user?.status !== "PENDING") {
    return null
  }

  const handleSignOut = async () => {
    await signOut({ redirect: false })
    router.push("/login")
  }

  return (
    <div className="container flex min-h-screen items-center justify-center py-12">
      <div className="mx-auto w-full max-w-2xl">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-yellow-100 dark:bg-yellow-900/30">
            <Clock className="h-10 w-10 text-yellow-600 dark:text-yellow-400" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">
            Account Pending Approval
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Your registration is being reviewed by our administration team
          </p>
        </div>

        <Card className="border-yellow-200/50 bg-yellow-50/30 backdrop-blur-sm dark:border-yellow-800/50 dark:bg-yellow-900/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <Shield className="h-5 w-5" />
              Approval Required
            </CardTitle>
            <CardDescription>
              Your account status: <span className="font-semibold text-yellow-600">PENDING</span>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert className="bg-white dark:bg-gray-800">
              <Mail className="h-4 w-4" />
              <AlertTitle>What happens next?</AlertTitle>
              <AlertDescription className="mt-2 space-y-2">
                <p>1. Our administration team will review your registration details</p>
                <p>2. You will receive an email notification once your account is approved</p>
                <p>3. After approval, you can log in and access all features</p>
              </AlertDescription>
            </Alert>

            <div className="rounded-lg border border-yellow-200 bg-white p-4 dark:border-yellow-800 dark:bg-gray-800">
              <h3 className="font-semibold text-gray-900 dark:text-white">
                Registration Details
              </h3>
              <div className="mt-2 grid grid-cols-1 gap-2 text-sm sm:grid-cols-2">
                <div>
                  <span className="text-gray-600 dark:text-gray-400">Name:</span>
                  <span className="ml-2 font-medium">{session?.user?.name}</span>
                </div>
                <div>
                  <span className="text-gray-600 dark:text-gray-400">Email:</span>
                  <span className="ml-2 font-medium">{session?.user?.email}</span>
                </div>
                <div>
                  <span className="text-gray-600 dark:text-gray-400">Role:</span>
                  <span className="ml-2 font-medium capitalize">
                    {session?.user?.role.toLowerCase()}
                  </span>
                </div>
                <div>
                  <span className="text-gray-600 dark:text-gray-400">Registered:</span>
                  <span className="ml-2 font-medium">Just now</span>
                </div>
              </div>
            </div>

            <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-800/50">
              <h3 className="font-semibold text-gray-900 dark:text-white">
                Need help?
              </h3>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                If you have any questions about your registration, please contact our support team at{" "}
                <a href="mailto:support@madrasah.com" className="text-purple-600 hover:underline dark:text-purple-400">
                  support@madrasah.com
                </a>
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-3">
            <Button
              variant="outline"
              className="w-full border-yellow-300 text-yellow-700 hover:bg-yellow-50 dark:border-yellow-700 dark:text-yellow-400 dark:hover:bg-yellow-900/20"
              onClick={handleSignOut}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </Button>
            <p className="text-center text-sm text-gray-500 dark:text-gray-400">
              Typically, approvals are processed within 24-48 hours
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}