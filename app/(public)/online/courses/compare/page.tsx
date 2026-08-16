// app/compare/page.tsx
import { Metadata } from "next";
import CompareClient from "./compare-client";

export const metadata: Metadata = {
  title: "Compare Courses | Al-Maysaroh International Institute",
  description:
    "Compare our Quran programs side-by-side. Find the perfect course for your goals - Hifz, Tajweed, Arabic, Tafsir, and more.",
  keywords:
    "compare Quran courses, Hifz vs Tajweed, Quran program comparison, Islamic studies",
  authors: [{ name: "Al-Maysaroh International Institute" }],
  openGraph: {
    title: "Compare Quran Programs | Al-Maysaroh",
    description:
      "Find your perfect learning path by comparing our courses side-by-side.",
    type: "website",
    locale: "en_US",
    url: "https://almaysaroh.com/compare",
    images: [
      {
        url: "/og/compare.jpg",
        width: 1200,
        height: 630,
        alt: "Compare Al-Maysaroh Courses",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Compare Quran Programs",
    description: "Find your perfect learning path.",
    images: ["/og/compare.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://almaysaroh.com/compare",
  },
};

export default function ComparePage() {
  return <CompareClient />;
}
