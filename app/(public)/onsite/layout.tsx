// app/(marketing)/physical/layout.tsx
import type { Metadata } from "next";
import { OnsiteHeader } from "./components/layout/PhysicalHeader";
import { OnsiteFooter } from "./components/layout/PhysicalFooter";
// import { WhatsAppButton } from "@/components/shared/WhatsAppButton";

export const metadata: Metadata = {
  title: {
    default: "Daar-ul-Maysaroh - Quran Memorization Institute",
    template: "%s | Daar-ul-Maysaroh",
  },
  description:
    "Full-time Quran memorization and Islamic studies in Ibadan, Nigeria. Boarding and day programs with Ijazah certification.",
  keywords:
    "Quran school, Tahfeedh, boarding school, Islamic education, Ibadan, Quran memorization, Tajweed, Ijazah",
  openGraph: {
    title: "Daar-ul-Maysaroh - Quran Memorization Institute",
    description: "Full-time Quran memorization and Islamic studies in Ibadan",
    type: "website",
    locale: "en_NG",
    images: [
      {
        url: "/og/physical.jpg",
        width: 1200,
        height: 630,
        alt: "Daar-ul-Maysaroh Physical Campus",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Daar-ul-Maysaroh - Quran Memorization Institute",
    description: "Full-time Quran memorization and Islamic studies in Ibadan",
    images: ["/og/physical.jpg"],
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
    canonical: "https://almaysaroh.com/onsite",
  },
};

export default function PhysicalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="physical-campus min-h-screen flex flex-col bg-gradient-to-b from-background via-purple-50/5 to-amber-50/5">
      <OnsiteHeader />
      <main className="flex-1 pt-[--header-height]">{children}</main>
      <OnsiteFooter />
      {/* <WhatsAppButton /> */}
    </div>
  );
}
