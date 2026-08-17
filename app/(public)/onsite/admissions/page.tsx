// app/(marketing)/onsite/admissions/page.tsx
import { Metadata } from "next";
import OnsiteAdmissionsClient from "./onsite-admissions-client";

export const metadata: Metadata = {
  title: "Admissions | Daar-ul-Maysaroh - Quran Memorization Institute",
  description:
    "Apply to Daar-ul-Maysaroh. Join our full-time Quran memorization programme in Ibadan. Boarding and day options available.",
  keywords:
    "admissions, Quran memorization, Ibadan, boarding school, day programme, Tahfeedh",
  authors: [{ name: "Daar-ul-Maysaroh" }],
  openGraph: {
    title: "Admissions - Daar-ul-Maysaroh",
    description:
      "Apply to Daar-ul-Maysaroh and begin your Quran memorization journey.",
    type: "website",
    locale: "en_NG",
  },
};

export default function AdmissionsPage() {
  return <OnsiteAdmissionsClient />;
}
