// app/(marketing)/onsite/programs/page.tsx
import { Metadata } from "next";
import OnsiteProgramsClient from "./onsite-programs-client";

export const metadata: Metadata = {
  title: "Programs | Daar-ul-Maysaroh - Full-Time Quran Memorization",
  description:
    "Explore our full-time Quran memorization programs at Daar-ul-Maysaroh in Ibadan. Day and boarding options available.",
  keywords:
    "Quran memorization, Tahfeedh, Ibadan, boarding school, day programme, Islamic education",
  authors: [{ name: "Daar-ul-Maysaroh" }],
  openGraph: {
    title: "Programs - Daar-ul-Maysaroh",
    description: "Full-time Quran memorization programs in Ibadan, Nigeria.",
    type: "website",
    locale: "en_NG",
  },
};

export default function ProgramsPage() {
  return <OnsiteProgramsClient />;
}
