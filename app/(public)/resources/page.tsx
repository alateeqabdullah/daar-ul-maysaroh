// app/resources/page.tsx
import { Metadata } from "next";
import ResourcesClient from "./resources-client";

export const metadata: Metadata = {
  title: "Free Quran Learning Resources | Al-Maysaroh Institute",
  description:
    "Access free Quran learning resources including downloadable PDFs, recitation guides, Tajweed rules, memorization trackers, and more.",
  keywords:
    "Quran learning resources, Tajweed rules PDF, Hifz tracker, Arabic alphabet, Quran recitation guide, free Islamic resources",
  authors: [{ name: "Al-Maysaroh International Institute" }],
  openGraph: {
    title: "Free Quran Learning Resources | Al-Maysaroh",
    description:
      "Download free Quran learning materials - Tajweed guides, memorization trackers, Arabic worksheets, and more.",
    type: "website",
    locale: "en_US",
    url: "https://almaysaroh.com/resources",
    images: [
      {
        url: "/og/resources.jpg",
        width: 1200,
        height: 630,
        alt: "Al-Maysaroh Learning Resources",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Quran Resources",
    description: "Download free Quran learning materials.",
    images: ["/og/resources.jpg"],
  },
};

export default function ResourcesPage() {
  return <ResourcesClient />;
}
