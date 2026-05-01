// app/contact/page.tsx (Server Component - for metadata)
import { Metadata } from "next";
import ContactClient from "./contact-client";

// Generate metadata for SEO
export const metadata: Metadata = {
  title: "Contact Us | Al-Maysaroh Institute",
  description:
    "Reach our scholarly council directly. Get answers about admissions, financial aid, academic support, or technical assistance. Our team responds within 2-8 hours.",
  keywords:
    "contact Al-Maysaroh, Quran institute contact, Islamic education inquiries, admissions support, scholarship questions, technical support Quran",
  authors: [{ name: "Al-Maysaroh International Institute" }],
  openGraph: {
    title: "Contact Our Scholars | Al-Maysaroh Institute",
    description:
      "Connect directly with our scholarly council. Whether you seek knowledge, need guidance, or wish to begin your journey - we're here.",
    type: "website",
    locale: "en_US",
    url: "https://almaysaroh.com/contact",
    images: [
      {
        url: "/og/contact.jpg",
        width: 1200,
        height: 630,
        alt: "Al-Maysaroh Contact Page",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Al-Maysaroh Scholars",
    description:
      "Connect directly with our scholarly council for admissions, support, or guidance.",
    images: ["/og/contact.jpg"],
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
    canonical: "https://almaysaroh.com/contact",
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
