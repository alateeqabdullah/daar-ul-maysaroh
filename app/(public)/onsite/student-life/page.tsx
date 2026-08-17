// app/(marketing)/onsite/student-life/page.tsx
import { Metadata } from "next";
import OnsiteStudentLifeClient from "./onsite-student-life-client";

export const metadata: Metadata = {
  title: "Student Life | Daar-ul-Maysaroh - Quran Memorization Institute",
  description: "Experience daily life at Daar-ul-Maysaroh. A structured routine of Quran memorization, spiritual growth, and community living.",
  keywords: "student life, Quran memorization, daily routine, Islamic boarding, Ibadan, Nigeria",
  authors: [{ name: "Daar-ul-Maysaroh" }],
  openGraph: {
    title: "Student Life - Daar-ul-Maysaroh",
    description: "A day in the life at Daar-ul-Maysaroh - structured Quran memorization and community living.",
    type: "website",
    locale: "en_NG",
  },
};

export default function StudentLifePage() {
  return <OnsiteStudentLifeClient />;
}