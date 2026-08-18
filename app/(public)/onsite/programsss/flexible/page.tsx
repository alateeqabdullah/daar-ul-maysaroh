// app/(marketing)/onsite/programs/flexible/page.tsx
import { Metadata } from "next";
import ProgramRegistrationClient from "../[program]/program-registration-client";

export const metadata: Metadata = {
  title: "Flexible Programme | Daar-ul-Maysaroh",
  description:
    "Join our Flexible programme at Daar-ul-Maysaroh. Customized Quran memorization in Ibadan, Nigeria.",
  keywords:
    "flexible Quran memorization, custom schedule, Ibadan, Daar-ul-Maysaroh",
  authors: [{ name: "Daar-ul-Maysaroh" }],
  openGraph: {
    title: "Flexible Programme - Daar-ul-Maysaroh",
    description: "Customized Quran memorization programme in Ibadan.",
    type: "website",
    locale: "en_NG",
  },
};

export default function FlexiblePage() {
  return (
    <ProgramRegistrationClient
      program={{
        title: "Flexible",
        subtitle: "Customized Quran Memorization",
        icon: "Home",
        schedule: "Custom Schedule",
        time: "Flexible timing",
        badge: "Custom",
        description:
          "Tailored attendance plan to fit your family's needs. Choose specific days and times that work for you.",
        features: [
          "Custom schedule",
          "Flexible days",
          "Hybrid learning options",
          "Personalized attention",
          "Regular assessments",
        ],
        price: "Contact for pricing",
      }}
    />
  );
}
