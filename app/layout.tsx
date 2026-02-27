import { AuthProvider } from "@/components/providers/auth-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import type { Metadata, Viewport } from "next";
import {
  Amiri,
  Inter,
  Noto_Sans_Arabic,
  Playfair_Display,
} from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import { OfflineDetector } from "@/components/providers/offline-detector";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const noto = Noto_Sans_Arabic({ subsets: ["arabic"], variable: "--font-noto" });

const amiri = Amiri({
  weight: ["400", "700"],
  subsets: ["arabic"],
  variable: "--font-quran",
});

// const amiriQuran = Amiri_Quran({
//   subsets: ["arabic"],
//   variable: "--font-quran-arabic",
//   weight: "400"
// });


const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading",
});




export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false, 
  themeColor: "#10b981",
};



export const metadata: Metadata = {
  applicationName: "Al-Maysaroh Institute",
  referrer: "origin-when-cross-origin",
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  viewport: viewport,
  themeColor: "#10b981", 

  title: {
    default: "Al-Maysaroh Quran Institute | Online Quranic Excellence",
    template: "%s | Al-Maysaroh",
  },
  description:
    "Preserving the sacred tradition of Quranic recitation through scholarly excellence.",
  keywords: [
    "Quran",
    "Islamic Education",
    "Tajweed",
    "Quranic Studies",
    "Online Quran Classes",
    "Hifz Program",
    "Islamic Institute",
    "Quran Recitation",
    "Islamic Learning",
    "Religious Education",
  ],
  authors: [
    { name: "Daarul Maysaroh", url: "https://daarulmaysaroh.org" },
  ],
  creator: "Daarul Maysaroh",
  publisher: "Daarul Maysaroh",
  metadataBase: new URL("https://almaysaroh.org"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://almaysaroh.org",
    title: "Al-Maysaroh Quran Institute | Online Quranic Excellence",
    description:
      "Preserving the sacred tradition of Quranic recitation through scholarly excellence.",
    siteName: "Al-Maysaroh Quran Institute",
  },
  twitter: {
    card: "summary_large_image",
    title: "Al-Maysaroh Quran Institute | Online Quranic Excellence",
    description:
      "Preserving the sacred tradition of Quranic recitation through scholarly excellence.",
  },

  // Standard PWA Metadata
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Al-Maysaroh",
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    icon: [
      { url: "/icons/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      {
        url: "/icons/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        url: "/icons/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  },

  manifest: "/manifest.json", // Next.js automatically maps manifest.ts to this

};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${noto.variable} ${amiri.variable} ${playfair.variable} font-sans antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <AuthProvider>
            <OfflineDetector>
              {children}
            </OfflineDetector>
            <Toaster position="top-center" richColors />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
