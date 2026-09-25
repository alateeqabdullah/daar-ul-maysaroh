// app/global-error.tsx
"use client";

import { useEffect } from "react";
import { RotateCw, AlertTriangle } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          fontFamily:
            "Inter, ui-sans-serif, system-ui, -apple-system, sans-serif",
          background:
            "radial-gradient(120% 100% at 50% 50%, #faf8f4 0%, #f6f2ea 60%, #f2ece1 100%)",
          color: "#1a1a1a",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem",
          WebkitFontSmoothing: "antialiased",
        }}
      >
        <div style={{ maxWidth: "34rem", width: "100%" }}>
          {/* Colophon */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              marginBottom: "3rem",
            }}
          >
            <span
              style={{
                display: "block",
                height: "1px",
                width: "3rem",
                background: "linear-gradient(90deg, #7c3aed, #d4af37)",
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontSize: "0.6875rem",
                fontWeight: 600,
                letterSpacing: "0.24em",
                textTransform: "uppercase",
                color: "rgba(0,0,0,0.55)",
                whiteSpace: "nowrap",
              }}
            >
              The application could not start
            </span>
            <span
              style={{
                display: "block",
                height: "1px",
                flex: 1,
                background: "rgba(0,0,0,0.08)",
              }}
            />
            <span
              dir="rtl"
              style={{
                fontFamily: "'Amiri', ui-serif, Georgia, serif",
                fontSize: "0.8125rem",
                lineHeight: 1,
                color: "rgba(0,0,0,0.4)",
                whiteSpace: "nowrap",
              }}
            >
              خطأ حرج
            </span>
          </div>

          {/* Icon */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: "3.5rem",
              height: "3.5rem",
              borderRadius: "1rem",
              background:
                "linear-gradient(135deg, #7c3aed 0%, #a855f7 55%, #d4af37 100%)",
              color: "#fff",
              marginBottom: "2rem",
              boxShadow: "0 12px 30px -12px rgba(124,58,237,0.35)",
            }}
          >
            <AlertTriangle size={24} strokeWidth={1.75} />
          </div>

          <h1
            style={{
              fontFamily: "'Playfair Display', ui-serif, Georgia, serif",
              fontSize: "2rem",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              lineHeight: 1.15,
              margin: 0,
            }}
          >
            A critical error has occurred.
          </h1>

          <p
            style={{
              marginTop: "1.5rem",
              fontSize: "1rem",
              lineHeight: 1.65,
              color: "rgba(0,0,0,0.65)",
            }}
          >
            The application failed to load. This is usually temporary —
            reloading the page will often resolve it.
          </p>

          {error.digest && (
            <p
              style={{
                marginTop: "1.5rem",
                fontFamily:
                  "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace",
                fontSize: "0.6875rem",
                color: "rgba(0,0,0,0.4)",
                wordBreak: "break-all",
              }}
            >
              Reference: {error.digest}
            </p>
          )}

          <div style={{ marginTop: "2.5rem" }}>
            <button
              onClick={reset}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.75rem 1.5rem",
                borderRadius: "9999px",
                border: "none",
                background: "linear-gradient(90deg, #7c3aed, #a855f7, #d4af37)",
                color: "white",
                fontSize: "0.8125rem",
                fontWeight: 600,
                letterSpacing: "0.02em",
                cursor: "pointer",
                boxShadow: "0 10px 25px -12px rgba(124,58,237,0.35)",
                fontFamily: "inherit",
              }}
            >
              <RotateCw size={14} strokeWidth={1.75} />
              Reload the application
            </button>
          </div>

          <p
            style={{
              marginTop: "4rem",
              fontSize: "0.75rem",
              lineHeight: 1.65,
              color: "rgba(0,0,0,0.4)",
            }}
          >
            If the problem persists, contact the administration at
            admin@almaysaroh.com.
          </p>
        </div>
      </body>
    </html>
  );
}
