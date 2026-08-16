// app/(marketing)/onsite/boarding/page.tsx
import { Metadata } from "next";
import OnsiteBoardingClient from "./onsite-boarding-client";

export const metadata: Metadata = {
  title: "Boarding & Day Programmes | Daar-ul-Maysaroh",
  description:
    "Explore our boarding and day programme options at Daar-ul-Maysaroh. Full-time Quran memorization in Ibadan, Nigeria.",
  keywords:
    "boarding school, Quran memorization, Ibadan, day programme, Islamic boarding, Tahfeedh",
  authors: [{ name: "Daar-ul-Maysaroh" }],
  openGraph: {
    title: "Boarding & Day Programmes - Daar-ul-Maysaroh",
    description:
      "Full-time Quran memorization with boarding and day options in Ibadan.",
    type: "website",
    locale: "en_NG",
  },
};

export default function BoardingPage() {
  return <OnsiteBoardingClient />;
}
