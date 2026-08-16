// app/(marketing)/onsite/about/page.tsx
import { Metadata } from "next";
import OnsiteAboutClient from "./onsite-about-client";

// Generate metadata for SEO
export const metadata: Metadata = {
  title: "About Daar-ul-Maysaroh | Quran Memorization Institute Ibadan",
  description:
    "Learn about Daar-ul-Maysaroh - a full-time Quran memorization institute in Ibadan, Nigeria. Discover our mission to preserve authentic Sanad and produce carriers of the Quran.",
  keywords:
    "Daar-ul-Maysaroh, Quran memorization, Ibadan, Nigeria, Quran institute, Tahfeedh, Sanad, Ijazah, Islamic education",
  authors: [{ name: "Al-Maysaroh International Institute" }],
  openGraph: {
    title: "About Daar-ul-Maysaroh - A Sanctuary for Quranic Excellence",
    description:
      "Daar-ul-Maysaroh is a full-time Quran memorization institute dedicated to producing carriers of the Quran in Ibadan, Nigeria.",
    type: "website",
    locale: "en_NG",
    url: "https://almaysaroh.com/onsite/about",
    images: [
      {
        url: "/og/onsite-about.jpg",
        width: 1200,
        height: 630,
        alt: "Daar-ul-Maysaroh - Quran Memorization Institute",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Daar-ul-Maysaroh",
    description: "A sanctuary for Quranic excellence in Ibadan, Nigeria.",
    images: ["/og/onsite-about.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://almaysaroh.com/onsite/about",
  },
};

export default function OnsiteAboutPage() {
  return <OnsiteAboutClient />;
}
