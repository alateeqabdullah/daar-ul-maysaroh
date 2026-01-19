// src/app/(public)/layout.tsx
import { Inter, Noto_Sans_Arabic } from "next/font/google";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { ThemeProvider } from "@/components/providers/theme-provider";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const notoSansArabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
  variable: "--font-arabic",
});

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
    >
      <div className={`${inter.variable} ${notoSansArabic.variable} font-sans`}>
        <div className="min-h-screen bg-linear-to-b from-white via-purple-50/20 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
          <Header />
          <main className="pt-16">{children}</main>
          <Footer />
        </div>
      </div>
    </ThemeProvider>
  );
}
