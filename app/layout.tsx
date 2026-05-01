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
import { OfflineProvider } from "@/components/providers/offline-detector";
import { GlobalScrollProgress } from "@/components/layoutt/globallScroll";
import { WhatsAppButton } from "@/components/shared/whatsapp-button";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const noto = Noto_Sans_Arabic({ subsets: ["arabic"], variable: "--font-noto" });

const amiri = Amiri({
  weight: ["400", "700"],
  subsets: ["arabic"],
  variable: "--font-quran",
});

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

// JSON-LD Schema for Rich Results
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: "Al-Maysaroh International Institute",
  url: "https://almaysaroh.com",
  logo: "https://almaysaroh.com/icons/icon-512x512.png",
  description:
    "Preserving the sacred tradition of Quranic recitation through scholarly excellence with authentic Sanad-based education.",
  foundingDate: "2024",
  founder: {
    "@type": "Person",
    name: "Daarul Maysaroh",
  },
  address: {
    "@type": "PostalAddress",
    addressCountry: "NG",
  },
  sameAs: [
    // Add your social media URLs when available
    // "https://www.facebook.com/almaysaroh",
    // "https://twitter.com/almaysaroh",
    // "https://www.instagram.com/almaysaroh"i
  ],
  offers: {
    "@type": "Offer",
    category: "Islamic Education",
    priceSpecification: {
      "@type": "PriceSpecification",
      priceCurrency: "USD",
    },
  },
  knowsAbout: [
    "Quran Memorization",
    "Tajweed",
    "Arabic Language",
    "Islamic Studies",
    "Ijazah Certification",
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL("https://almaysaroh.com"),
  applicationName: "Al-Maysaroh International Institute",
  referrer: "origin-when-cross-origin",
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  themeColor: "#10b981",
  viewport: viewport,

  title: {
    default: "Al-Maysaroh Institute | Online Quranic Excellence",
    template: "%s | Al-Maysaroh",
  },
  description:
    "Preserving the sacred tradition of Quranic recitation through scholarly excellence. Ijazah-certified scholars, authentic Sanad, and personalized 1-on-1 Quran education.",
  keywords: [
    "Quran",
    "Islamic Institute",
    "Quranic Institute",
    "Al-Maysaroh Institute",
    "Almaysaroh Institute",
    "Almaysaroh Quran Institute",
    "Al-Maysaroh Quran Institute",
    "Al-Maysaroh",
    "Almaysaroh",
    "Hifz",
    "Tahfiz",
    "Tahfeedh",
    "Islamic Education",
    "Tajweed",
    "Quranic Studies",
    "Online Quran Classes",
    "Hifz Program",
    "Ijazah Certification",
    "Sanad",
    "Quran Memorization",
    "Islamic Learning",
    "Religious Education",
    "Quran Teacher",
    "Learn Quran Online",
    "Quran Recitation",
    "Quranic Excellence",
    "Quranic Tradition",
    
  ],
  authors: [{ name: "Daarul Maysaroh", url: "https://almaysaroh.com" }],
  creator: "Daarul Maysaroh",
  publisher: "Daarul Maysaroh",

  // Canonical URL
  alternates: {
    canonical: "https://almaysaroh.com",
    // Add language versions when available
    // languages: {
    //   'en': 'https://almaysaroh.com',
    //   'ar': 'https://almaysaroh.com/ar',
    // },
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://almaysaroh.com",
    title: "Al-Maysaroh Institute | Online Quranic Excellence",
    description:
      "Preserving the sacred tradition of Quranic recitation through scholarly excellence. Ijazah-certified scholars, authentic Sanad, and personalized 1-on-1 Quran education.",
    siteName: "Al-Maysaroh International Institute",
    images: [
      {
        url: "/icons/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Al-Maysaroh Institute - Quranic Education",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Al-Maysaroh Institute | Online Quranic Excellence",
    description:
      "Preserving the sacred tradition of Quranic recitation through scholarly excellence.",
    images: ["/icons/twitter-image.jpg"],
  },

  // PWA Metadata
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

  manifest: "/manifest.json",

  // JSON-LD Schema for rich search results
  other: {
    "application/ld+json": JSON.stringify(organizationSchema),
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body
        className={`${inter.variable} ${noto.variable} ${amiri.variable} ${playfair.variable} font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
        >
          <AuthProvider>
            <GlobalScrollProgress />
            <OfflineProvider>
              {children}
              {/* WhatsApp Floating Button - Appears on all pages */}
           
              <WhatsAppButton
                phoneNumber="2349110163930"
                email="info.almaysaroh@gmail.com"
                theme="green"
                size="lg"
                position="bottom-right"
                message="Assalamu Alaikum! I'm interested in learning more about Al-Maysaroh Institute. Can you provide more information?"
                showTooltip={true}
                tooltipText="Need help? Click here! 💬"
                enableAnalytics={true}
                
                // availabilityHours={{
                //   start: "06:00",
                //   end: "22:00",
                //   timezone: "America/New_York",
                // }}
              />
            </OfflineProvider>
            <Toaster position="top-center" richColors />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
