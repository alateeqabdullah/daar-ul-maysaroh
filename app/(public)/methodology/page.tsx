

// app/methodology/page.tsx
import { Metadata } from "next";
import MethodologyClient from "./methodology-client";

// Generate metadata for SEO
export const metadata: Metadata = {
  title: "Our Methodology | Al-Maysaroh Institute",
  description: "Discover our unique methodology that combines 1,400 years of scholarly tradition with modern learning science. Ijazah-certified teachers, authentic Sanad, and personalized attention.",
  keywords: "Quran teaching methodology, Ijazah certification, Sanad chain, Tajweed instruction, Hifz program, Quran learning method,  Al-Maysaroh method, Quran education approach, traditional Quran teaching, modern Quran learning, personalized Quran instruction, cognitive learning techniques, Quran memorization method, Quran recitation training, online Quran classes, Quran learning science, Quran teaching philosophy, ",
  authors: [{ name: "Al-Maysaroh Institute" }],
  openGraph: {
    title: "The Al-Maysaroh Methodology - Where Science Meets Sanctity",
    description: "Discover our unique methodology that combines 1,400 years of scholarly tradition with modern learning science.",
    type: "website",
    locale: "en_US",
    url: "https://almaysaroh.com/methodology",
    images: [
      {
        url: "/og/methodology.jpg",
        width: 1200,
        height: 630,
        alt: "Al-Maysaroh Methodology",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Al-Maysaroh Methodology",
    description: "Where Science Meets Sanctity - A revolutionary approach to Quran learning.",
    images: ["/og/methodology.jpg"],
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
    canonical: "https://almaysaroh.com/methodology",
  },
};

export default function MethodologyPage() {
  return <MethodologyClient />;
}