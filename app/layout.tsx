import { AuthProvider } from "@/components/providers/auth-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import type { Metadata } from "next";
import {
  Amiri,
  Amiri_Quran,
  Inter,
  Noto_Sans_Arabic,
  Playfair_Display,
} from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const noto = Noto_Sans_Arabic({ subsets: ["arabic"], variable: "--font-noto" });

const amiri = Amiri({
  weight: ["400", "700"],
  subsets: ["arabic"],
  variable: "--font-quran",
});
const amiriQuran = Amiri_Quran({
  subsets: ["arabic"],
  variable: "--font-quran-arabic",
  weight: "400"
});
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading",
});

export const metadata: Metadata = {
  title: "Al-Maysaroh Institute | Online Quranic Excellence",
  description:
    "Preserving the sacred tradition of Quranic recitation through scholarly excellence.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${noto.variable} ${amiri.variable} ${playfair.variable} ${amiriQuran.variable} font-sans antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <AuthProvider>
            {children}
            <Toaster position="top-center" richColors />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
