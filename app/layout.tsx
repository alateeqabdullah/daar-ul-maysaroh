// src/app/layout.tsx - ROOT LAYOUT
import type { Metadata } from "next";
<<<<<<< HEAD
import { Inter, Noto_Sans_Arabic } from "next/font/google";
=======
import { Amiri, Inter, Noto_Sans_Arabic } from "next/font/google";
>>>>>>> 5a5d906 (Fresh start on Zorin Lite)
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { AuthProvider } from "@/components/providers/auth-provider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const notoSansArabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
  variable: "--font-arabic",
});

<<<<<<< HEAD
=======
const amiri = Amiri({
  subsets: ["arabic"],
  weight: ["400", "700"],
  variable: "--font-quran",
});

>>>>>>> 5a5d906 (Fresh start on Zorin Lite)
export const metadata: Metadata = {
  title: "Daar-Ul-Maysaroh Institute - Quran Memorization Institute ",
  description:
    "Comprehensive management system for online madrasahs with Quran tracking, attendance, grades, and more.",
  keywords: [
    "madrasah",
    "islamic education",
    "quran",
    "online learning",
    "management system",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <body
<<<<<<< HEAD
        className={`${inter.variable} ${notoSansArabic.variable} font-sans antialiased`}
=======
        className={`${inter.variable} ${notoSansArabic.variable} ${amiri.variable} font-sans antialiased`}
>>>>>>> 5a5d906 (Fresh start on Zorin Lite)
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            {children}
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
