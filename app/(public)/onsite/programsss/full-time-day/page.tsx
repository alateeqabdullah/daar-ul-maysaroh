// app/(marketing)/onsite/programs/full-time-day/page.tsx
import { Metadata } from "next";
import ProgramRegistrationClient from "../[program]/program-registration-client";

export const metadata: Metadata = {
  title: "Full-Time Day Programme | Daar-ul-Maysaroh",
  description:
    "Join our Full-Time Day programme at Daar-ul-Maysaroh. Comprehensive Quran memorization in Ibadan, Nigeria.",
  keywords:
    "full-time Quran memorization, day programme, Ibadan, Daar-ul-Maysaroh",
  authors: [{ name: "Daar-ul-Maysaroh" }],
  openGraph: {
    title: "Full-Time Day Programme - Daar-ul-Maysaroh",
    description: "Comprehensive Quran memorization programme in Ibadan.",
    type: "website",
    locale: "en_NG",
  },
};

export default function FullTimeDayPage() {
  return (
    <ProgramRegistrationClient
      program={{
        title: "Full-Time Day",
        subtitle: "Comprehensive Quran Memorization",
        icon: "Sun",
        schedule: "Sat-Sun & Mon-Wed",
        time: "Sat-Sun: 9-4:30 • Mon-Wed: 4:30-6:30",
        badge: "Most Popular",
        description:
          "Ideal for students seeking a comprehensive program with extended learning hours and accelerated progress.",
        features: [
          "5 days per week",
          "Extended learning hours",
          "Complete curriculum",
          "Accelerated progress",
          "Regular assessments",
        ],
        price: "₦150,000/term",
      }}
    />
  );
}
