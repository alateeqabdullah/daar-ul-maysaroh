// src/app/(auth)/layout.tsx
import { AuthProvider } from "@/components/providers/auth-provider";
import { Toaster } from "@/components/ui/sonner";


export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
  
        <AuthProvider>
          {children}
          <Toaster />
        </AuthProvider>
     
  );
}
