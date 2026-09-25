// app/not-found.tsx
import Link from "next/link";
import {
  ArrowRight,
  Home,
  Compass,
  BookOpen,
  MessageCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

const BRAND = {
  purple: "text-purple-700 dark:text-purple-300",
  gradientText:
    "bg-gradient-to-r from-purple-700 via-purple-600 to-amber-500 bg-clip-text text-transparent dark:from-purple-300 dark:via-purple-300 dark:to-amber-400",
  gradientRule: "bg-gradient-to-r from-purple-600 to-amber-500",
  gradientFill:
    "bg-gradient-to-r from-purple-700 via-purple-600 to-amber-500 dark:from-purple-600 dark:via-purple-600 dark:to-amber-400",
  gradientFillHover:
    "hover:from-purple-800 hover:via-purple-700 hover:to-amber-600 dark:hover:from-purple-500 dark:hover:via-purple-500 dark:hover:to-amber-300",
};

const SUGGESTIONS = [
  {
    href: "/onsite/programs",
    label: "The Curriculum",
    description: "Six disciplines taught under scholars of Ijazah",
    icon: BookOpen,
  },
  {
    href: "/onsite/admissions",
    label: "Admissions",
    description: "Begin with a short conversation about your path",
    icon: Compass,
  },
  {
    href: "/physical/contact",
    label: "Speak with the Administration",
    description: "If you need guidance, we are here",
    icon: MessageCircle,
  },
] as const;

export default function NotFound() {
  return (
    <main className="relative overflow-hidden bg-background">
      {/* The one quiet brand wash — same as the rest of the site */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(900px 500px at 50% -10%, rgba(147,51,234,0.08), transparent 60%), radial-gradient(700px 400px at 50% 110%, rgba(212,175,55,0.07), transparent 60%)",
        }}
      />

      <div className="container relative mx-auto flex min-h-screen items-center px-6 py-24 lg:px-8">
        <div className="mx-auto w-full max-w-3xl">
          {/* ---------- Colophon: label · rule · Arabic ---------- */}
          <div className="mb-12 flex items-center gap-4">
            <span aria-hidden className={cn("h-px w-12", BRAND.gradientRule)} />
            <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-foreground/60">
              Page Not Found
            </span>
            <span aria-hidden className="h-px flex-1 bg-foreground/10" />
            <span
              dir="rtl"
              lang="ar"
              className="font-arabic text-[13px] leading-none text-foreground/45"
            >
              الصفحة غير موجودة
            </span>
          </div>

          {/* ---------- The 404, typographic — no rotating zeros ---------- */}
          <div className="mb-10">
            <span
              className={cn(
                "font-heading text-[5rem] font-bold leading-[1] tracking-[-0.04em] tabular-nums sm:text-[7rem] md:text-[9rem]",
                BRAND.gradientText,
              )}
            >
              404
            </span>
          </div>

          {/* ---------- The message ---------- */}
          <h1 className="font-heading text-3xl font-bold leading-[1.15] tracking-[-0.02em] text-foreground sm:text-4xl md:text-[2.75rem]">
            This page does not exist —
            <br />
            <span className="text-foreground/45">
              but the path forward does.
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-foreground/65 sm:text-[17px]">
            The address you followed may have changed, or the page may no longer
            be published. The links below will take you to the places visitors
            most often need.
          </p>

          {/* ---------- Primary return CTA ---------- */}
          <div className="mt-10">
            <Link
              href="/"
              className={cn(
                "group inline-flex items-center gap-2 rounded-full px-6 py-3 text-[13px] font-semibold tracking-wide text-white shadow-lg shadow-purple-700/20 transition-all duration-300",
                BRAND.gradientFill,
                BRAND.gradientFillHover,
              )}
            >
              <Home className="h-[14px] w-[14px]" strokeWidth={1.75} />
              Return to the home page
              <ArrowRight
                className="h-[14px] w-[14px] transition-transform duration-300 group-hover:translate-x-1"
                strokeWidth={1.75}
              />
            </Link>
          </div>

          {/* ---------- Suggestions — three, in a hairline grid ---------- */}
          <div className="mt-16 border-t border-foreground/10 pt-10">
            <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-foreground/45">
              Perhaps you were looking for
            </span>

            <div className="mt-6 grid gap-px overflow-hidden rounded-lg border border-foreground/10 bg-foreground/10 sm:grid-cols-3">
              {SUGGESTIONS.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="group flex flex-col bg-background p-6 transition-colors duration-300 hover:bg-purple-50/40 dark:hover:bg-purple-950/15"
                  >
                    <Icon
                      className="mb-5 h-[18px] w-[18px] text-purple-700/80 dark:text-purple-300/80"
                      strokeWidth={1.5}
                    />
                    <span className="font-heading text-[15px] font-medium tracking-[-0.005em] text-foreground transition-colors duration-300 group-hover:text-purple-700 dark:group-hover:text-purple-300">
                      {item.label}
                    </span>
                    <span className="mt-1.5 text-[12px] leading-relaxed text-foreground/55">
                      {item.description}
                    </span>
                    <span
                      aria-hidden
                      className={cn(
                        "pointer-events-none absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100",
                        BRAND.gradientRule,
                      )}
                    />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* ---------- Quiet closing line ---------- */}
          <p className="mt-16 text-[12px] leading-relaxed text-foreground/45">
            If you believe this is an error, please{" "}
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
