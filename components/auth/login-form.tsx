// src/app/(auth)/login/page.tsx
import LoginForm from "@/components/auth/login-form";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-primary p-4">
      <div className="w-full max-w-md">
        <div className="rounded-2xl bg-white p-8 shadow-2xl dark:bg-gray-900">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gradient bg-gradient-primary bg-clip-text text-transparent">
              Welcome Back
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Sign in to your MadrasahPro account
            </p>
          </div>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}

// // src/components/auth/login-form.tsx

// "use client";

// import { useState } from "react";
// import { signIn } from "next-auth/react";
// import { useRouter } from "next/navigation";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import * as z from "zod";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Alert, AlertDescription } from "@/components/ui/alert";
// import { Loader2 } from "lucide-react";

// const loginSchema = z.object({
//   email: z.string().email("Invalid email address"),
//   password: z.string().min(6, "Password must be at least 6 characters"),
// });

// type LoginFormValues = z.infer<typeof loginSchema>;

// export default function LoginForm() {
//   const router = useRouter();
//   const [error, setError] = useState<string | null>(null);
//   const [isLoading, setIsLoading] = useState(false);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<LoginFormValues>({
//     resolver: zodResolver(loginSchema),
//   });

//   const onSubmit = async (data: LoginFormValues) => {
//     setIsLoading(true);
//     setError(null);

//     const result = await signIn("credentials", {
//       email: data.email,
//       password: data.password,
//       redirect: false,
//     });

//     if (result?.error) {
//       setError(result.error);
//       setIsLoading(false);
//     } else {
//       router.push("/dashboard");
//       router.refresh();
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//       {error && (
//         <Alert variant="destructive">
//           <AlertDescription>{error}</AlertDescription>
//         </Alert>
//       )}

//       <div className="space-y-2">
//         <Label htmlFor="email">Email</Label>
//         <Input
//           id="email"
//           type="email"
//           placeholder="Enter your email"
//           {...register("email")}
//           disabled={isLoading}
//         />
//         {errors.email && (
//           <p className="text-sm text-red-500">{errors.email.message}</p>
//         )}
//       </div>

//       <div className="space-y-2">
//         <Label htmlFor="password">Password</Label>
//         <Input
//           id="password"
//           type="password"
//           placeholder="Enter your password"
//           {...register("password")}
//           disabled={isLoading}
//         />
//         {errors.password && (
//           <p className="text-sm text-red-500">{errors.password.message}</p>
//         )}
//       </div>

//       <Button type="submit" className="w-full" disabled={isLoading}>
//         {isLoading ? (
//           <>
//             <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//             Signing in...
//           </>
//         ) : (
//           "Sign In"
//         )}
//       </Button>

//       <div className="text-center text-sm">
//         <p className="text-gray-600 dark:text-gray-400">
//           Don&apos;t have an account?{" "}
//           <a
//             href="/register"
//             className="text-primary font-medium hover:underline"
//           >
//             Register here
//           </a>
//         </p>
//       </div>
//     </form>
//   );
// }
