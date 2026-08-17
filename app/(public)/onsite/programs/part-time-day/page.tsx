// app/(marketing)/onsite/programs/part-time-day/page.tsx
import { Metadata } from "next";
import ProgramRegistrationClient from "./program-registration-client";

export const metadata: Metadata = {
  title: "Part-Time Day Programme | Daar-ul-Maysaroh",
  description:
    "Join our Part-Time Day programme at Daar-ul-Maysaroh. Weekend Quran memorization in Ibadan, Nigeria.",
  keywords:
    "part-time Quran memorization, weekend programme, Ibadan, Daar-ul-Maysaroh",
  authors: [{ name: "Daar-ul-Maysaroh" }],
  openGraph: {
    title: "Part-Time Day Programme - Daar-ul-Maysaroh",
    description: "Weekend Quran memorization programme in Ibadan.",
    type: "website",
    locale: "en_NG",
  },
};

export default function PartTimeDayPage() {
  return (
    <ProgramRegistrationClient
      program={{
        title: "Part-Time Day",
        subtitle: "Weekend Quran Memorization",
        icon: "Sun",
        schedule: "Saturday - Sunday",
        time: "9:00 AM - 4:30 PM",
        badge: "Weekend",
        description:
          "Perfect for students who want to focus on Quran on weekends while maintaining weekday commitments.",
        features: [
          "2 days per week (Saturday & Sunday)",
          "Full academic program",
          "Tahfeedh & Tajweed instruction",
          "Islamic Studies & Arabic",
          "Progress tracking",
        ],
        price: "₦120,000/term",
      }}
    />
  );
}
