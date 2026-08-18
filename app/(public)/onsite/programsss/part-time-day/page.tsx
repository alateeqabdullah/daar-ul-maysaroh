// app/(marketing)/onsite/programs/part-time-day/page.tsx
import { Metadata } from "next";
import {
  ProgramDetailClient,
  ProgramData,
} from "../components/ProgramDetailClient";
import { Sun } from "lucide-react";

export const metadata: Metadata = {
  title: "Part-Time Day Programme | Daar-ul-Maysaroh",
  description:
    "Weekend Quran memorization programme at Daar-ul-Maysaroh. Sat-Sun, 9:00 AM - 4:30 PM.",
  keywords: "part-time day, Quran memorization, weekend programme, Ibadan",
  authors: [{ name: "Daar-ul-Maysaroh" }],
  openGraph: {
    title: "Part-Time Day Programme - Daar-ul-Maysaroh",
    description: "Weekend Quran memorization programme in Ibadan.",
    type: "website",
    locale: "en_NG",
  },
};

const programData: ProgramData = {
  title: "Part-Time Day",
  subtitle: "Weekend Quran Memorization",
  icon: Sun,
  color: "amber",
  schedule: "Saturday - Sunday",
  time: "9:00 AM - 4:30 PM",
  badge: "Weekend",
  description:
    "Perfect for students who want to focus on Quran on weekends while maintaining weekday commitments. This programme offers structured memorization with full academic support.",
  features: [
    "2 days per week (Saturday & Sunday)",
    "Full academic program",
    "Tahfeedh & Tajweed instruction",
    "Islamic Studies & Arabic",
    "Progress tracking",
  ],
  curriculum: [
    "Tahfeedh (Quran Memorization)",
    "Tajweed (Recitation Rules)",
    "Islamic Studies",
    "Arabic Language",
    "Muraja'ah (Revision)",
    "Tarbiyah (Character Development)",
  ],
  price: "₦120,000/term",
  slug: "part-time-day",
  audience: "All Ages",
};

export default function PartTimeDayPage() {
  return <ProgramDetailClient program={programData} />;
}
