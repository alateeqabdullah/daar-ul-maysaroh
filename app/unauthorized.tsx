// app/unauthorized.tsx
import Link from "next/link";
import { ArrowRight, Lock, Home, LogIn } from "lucide-react";
import { cn } from "@/lib/utils";

const BRAND = {
  gradientText:
    "bg-gradient-to-r from-purple-700 via-purple-600 to-amber-500 bg-clip-text text-transparent dark:from-purple-300 dark:via-purple-300 dark:to-amber-400",
  gradientRule: "bg-gradient-to-r from-purple-600 to-amber-500",
  gradientFill:
    "bg-gradient-to-r from-purple-700 via-purple-600 to-amber-500 dark:from-purple-600 dark:via-purple-600 dark:to-amber-400",
  gradientFillHover:
    "hover:from-purple-800 hover:via-purple-700 hover:to-amber-600 dark:hover:from-purple-500 dark:hover:via-purple-500 dark:hover:to-amber-300",
};

export const metadata = {
  title: "Sign in required — Al-Maysaroh Institute",
};

export default function Unauthorized() {
  return (
    <main className="relative overflow-hidden bg-background">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(900px 500px at 50% -10%, rgba(147,51,234,0.08), transparent 60%), radial-gradient(700px 400px at 50% 110%, rgba(212,175,55,0.07), transparent 60%)",
        }}
      />

      <div className="container relative mx-auto flex min-h-screen items-center px-6 py-24 lg:px-8">
        <div className="mx-auto w-full max-w-2xl">
          <div className="mb-12 flex items-center gap-4">
            <span aria-hidden className={cn("h-px w-12", BRAND.gradientRule)} />
            <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-foreground/60">
              Authentication required
            </span>
            <span aria-hidden className="h-px flex-1 bg-foreground/10" />
            <span
              dir="rtl"
              lang="ar"
              className="font-arabic text-[13px] leading-none text-foreground/45"
            >
              يجب تسجيل الدخول
            </span>
          </div>

          <span
            className={cn(
              "mb-8 flex h-14 w-14 items-center justify-center rounded-2xl shadow-lg shadow-purple-700/20",
              BRAND.gradientFill,
            )}
          >
            <Lock className="h-6 w-6 text-white" strokeWidth={1.75} />
          </span>

          <h1 className="font-heading text-3xl font-bold leading-[1.15] tracking-[-0.02em] text-foreground sm:text-4xl md:text-[2.75rem]">
            You need to sign in to continue.
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-foreground/65 sm:text-[17px]">
            This page is available to registered students and staff. Please sign
            in with your Al-Maysaroh account, or return to the home page if you
            arrived here by mistake.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/login"
              className={cn(
                "group inline-flex items-center gap-2 rounded-full px-6 py-3 text-[13px] font-semibold tracking-wide text-white shadow-lg shadow-purple-700/20 transition-all duration-300",
                BRAND.gradientFill,
                BRAND.gradientFillHover,
              )}
            >
              <LogIn className="h-[14px] w-[14px]" strokeWidth={1.75} />
              Sign in
              <ArrowRight
                className="h-[14px] w-[14px] transition-transform duration-300 group-hover:translate-x-1"
                strokeWidth={1.75}
              />
            </Link>

            <Link
              href="/"
              className="group inline-flex items-center gap-2 rounded-full border border-foreground/15 bg-background px-6 py-3 text-[13px] font-semibold tracking-wide text-foreground/80 transition-colors duration-300 hover:border-purple-700/40 hover:text-purple-700 dark:hover:border-purple-300/40 dark:hover:text-purple-300"
            >
              <Home className="h-[14px] w-[14px]" strokeWidth={1.75} />
              Return home
            </Link>
          </div>

          <p className="mt-16 text-[12px] leading-relaxed text-foreground/45">
            Don&apos;t have an account yet?{" "}
            <Link
              href="/onsite/admissions"
              className="font-medium text-foreground/70 underline decoration-foreground/20 underline-offset-4 transition-colors hover:text-purple-700 hover:decoration-purple-700/40 dark:hover:text-purple-300"
            >
              Begin admissions
            </Link>
            .
          </p>
        </div>
      </div>
    </main>
  );
}
