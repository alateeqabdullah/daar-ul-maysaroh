// app/(marketing)/onsite/programs/part-time-boarding/page.tsx
import { Metadata } from "next";
import ProgramRegistrationClient from "../[program]/program-registration-client";

export const metadata: Metadata = {
  title: "Part-Time Boarding | Daar-ul-Maysaroh",
  description:
    "Join our Part-Time Boarding programme at Daar-ul-Maysaroh. Weekend intensive Quran memorization in Ibadan.",
  keywords: "part-time boarding, Quran memorization, Ibadan, Daar-ul-Maysaroh",
  authors: [{ name: "Daar-ul-Maysaroh" }],
  openGraph: {
    title: "Part-Time Boarding - Daar-ul-Maysaroh",
    description:
      "Weekend intensive Quran memorization with accommodation in Ibadan.",
    type: "website",
    locale: "en_NG",
  },
};

export default function PartTimeBoardingPage() {
  return (
    <ProgramRegistrationClient
      program={{
        title: "Part-Time Boarding",
        subtitle: "Weekend Intensive Quran Memorization",
        icon: "Moon",
        schedule: "Friday - Sunday",
        time: "Fri 4:30PM - Sun 4:30PM",
        badge: "Weekend Intensive",
        description:
          "Weekend immersion with on-campus accommodation, perfect for out-of-town students seeking focused memorization.",
        features: [
          "Weekend immersion",
          "On-campus accommodation",
          "Full supervision",
          "Community experience",
          "Accelerated progress",
        ],
        price: "₦200,000/term",
      }}
    />
  );
}
