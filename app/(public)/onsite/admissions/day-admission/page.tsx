// app/(marketing)/onsite/day-admission/page.tsx
import { Metadata } from "next";
import DayAdmissionClient from "./day-admission-client";

export const metadata: Metadata = {
  title: "Day Programme Admission | Daar-ul-Maysaroh",
  description:
    "Apply for the Day Programme at Daar-ul-Maysaroh. Full-time Quran memorization with flexible scheduling.",
  keywords: "day programme, Quran memorization, Ibadan, Daar-ul-Maysaroh",
  authors: [{ name: "Daar-ul-Maysaroh" }],
  openGraph: {
    title: "Day Programme Admission - Daar-ul-Maysaroh",
    description: "Apply for the Day Programme at Daar-ul-Maysaroh.",
    type: "website",
    locale: "en_NG",
  },
};

export default function DayAdmissionPage() {
  return <DayAdmissionClient />;
}
