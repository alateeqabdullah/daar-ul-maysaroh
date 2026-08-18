// app/(marketing)/onsite/programs/full-time-boarding/page.tsx
import { Metadata } from "next";
import ProgramRegistrationClient from "../[program]/program-registration-client";

export const metadata: Metadata = {
  title: "Full-Time Boarding | Daar-ul-Maysaroh",
  description:
    "Join our Full-Time Boarding programme at Daar-ul-Maysaroh. Complete Quran memorization with accommodation in Ibadan.",
  keywords: "full-time boarding, Quran memorization, Ibadan, Daar-ul-Maysaroh",
  authors: [{ name: "Daar-ul-Maysaroh" }],
  openGraph: {
    title: "Full-Time Boarding - Daar-ul-Maysaroh",
    description: "Complete Quran memorization with accommodation in Ibadan.",
    type: "website",
    locale: "en_NG",
  },
};

export default function FullTimeBoardingPage() {
  return (
    <ProgramRegistrationClient
      program={{
        title: "Full-Time Boarding",
        subtitle: "Complete Quran Memorization",
        icon: "Moon",
        schedule: "Daily",
        time: "Full-time residential",
        badge: "Premium",
        description:
          "Complete immersion in the Quranic environment with 24/7 supervision, support, and accelerated memorization.",
        features: [
          "Full-time campus living",
          "Immersive environment",
          "24/7 supervision",
          "Accelerated memorization",
          "Complete curriculum",
        ],
        price: "₦250,000/term",
      }}
    />
  );
}
