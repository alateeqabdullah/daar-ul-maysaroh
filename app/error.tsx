// app/error.tsx
"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Home, RotateCw, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const BRAND = {
  gradientRule: "bg-gradient-to-r from-purple-600 to-amber-500",
  gradientFill:
    "bg-gradient-to-r from-purple-700 via-purple-600 to-amber-500 dark:from-purple-600 dark:via-purple-600 dark:to-amber-400",
  gradientFillHover:
    "hover:from-purple-800 hover:via-purple-700 hover:to-amber-600 dark:hover:from-purple-500 dark:hover:via-purple-500 dark:hover:to-amber-300",
};

function getContext(pathname: string | null) {
  const p = pathname ?? "";
  if (p.startsWith("/online")) {
    return { homeHref: "/online", homeLabel: "the Online Campus" };
  }
  if (p.startsWith("/onsite") || p.startsWith("/physical")) {
    return { homeHref: "/onsite", homeLabel: "the Physical Campus" };
  }
  return { homeHref: "/", homeLabel: "the home page" };
}

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const pathname = usePathname();
  const ctx = getContext(pathname);

  useEffect(() => {
    console.error(error);
  }, [error]);

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
          {/* Colophon */}
          <div className="mb-12 flex items-center gap-4">
            <span aria-hidden className={cn("h-px w-12", BRAND.gradientRule)} />
            <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-foreground/60">
              Something went wrong
            </span>
            <span aria-hidden className="h-px flex-1 bg-foreground/10" />
            <span
              dir="rtl"
              lang="ar"
              className="font-arabic text-[13px] leading-none text-foreground/45"
            >
              حدث خطأ
            </span>
          </div>

          <h1 className="font-heading text-3xl font-bold leading-[1.15] tracking-[-0.02em] text-foreground sm:text-4xl md:text-[2.75rem]">
            An error has occurred.
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-foreground/65 sm:text-[17px]">
            The page could not be loaded. This is usually temporary — you can
            try again, or return to {ctx.homeLabel}.
          </p>

          {error.digest && (
            <p className="mt-6 font-mono text-[11px] text-foreground/40">
              Reference: {error.digest}
            </p>
          )}

          {/* Actions */}
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <button
              onClick={reset}
              className={cn(
                "group inline-flex items-center gap-2 rounded-full px-6 py-3 text-[13px] font-semibold tracking-wide text-white shadow-lg shadow-purple-700/20 transition-all duration-300",
                BRAND.gradientFill,
                BRAND.gradientFillHover,
              )}
            >
              <RotateCw
                className="h-[14px] w-[14px] transition-transform duration-700 group-hover:rotate-180"
                strokeWidth={1.75}
              />
              Try again
            </button>

            <Link
              href={ctx.homeHref}
              className="group inline-flex items-center gap-2 rounded-full border border-foreground/15 bg-background px-6 py-3 text-[13px] font-semibold tracking-wide text-foreground/80 transition-colors duration-300 hover:border-purple-700/40 hover:text-purple-700 dark:hover:border-purple-300/40 dark:hover:text-purple-300"
            >
              <Home className="h-[14px] w-[14px]" strokeWidth={1.75} />
              Return home
              <ArrowRight
                className="h-[14px] w-[14px] transition-transform duration-300 group-hover:translate-x-1"
                strokeWidth={1.75}
              />
            </Link>
          </div>

          <p className="mt-16 text-[12px] leading-relaxed text-foreground/45">
            If the problem persists, please{" "}
            <Link
              href="/physical/contact"
              className="font-medium text-foreground/70 underline decoration-foreground/20 underline-offset-4 transition-colors hover:text-purple-700 hover:decoration-purple-700/40 dark:hover:text-purple-300"
            >
              contact the administration
            </Link>
            .
          </p>
        </div>
      </div>
    </main>
  );
}
