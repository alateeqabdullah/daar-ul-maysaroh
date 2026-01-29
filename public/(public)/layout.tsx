import { Inter, Noto_Sans_Arabic } from "next/font/google";
import { Navbar } from "@/components/public/navbar"; // Use our fancy navbar
import Footer from "@/components/public/footer"; // We will create this
import { ThemeProvider } from "@/components/providers/theme-provider";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const notoSansArabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
  variable: "--font-arabic",
});

export const metadata = {
  title: "MadrasahPro - The OS for Islamic Education",
  description: "Comprehensive management system for modern madrasahs and Islamic schools.",
};

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
      <div className={`${inter.variable} ${notoSansArabic.variable} font-sans min-h-screen bg-white dark:bg-slate-950 selection:bg-emerald-100 selection:text-emerald-900`}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}