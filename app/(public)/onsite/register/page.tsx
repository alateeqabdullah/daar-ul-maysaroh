// app/(marketing)/onsite/register/page.tsx
import { Metadata } from "next";
import RegisterClient from "./register-client";

export const metadata: Metadata = {
  title: "Program Registration | Daar-ul-Maysaroh",
  description: "Register for your chosen Quran memorization programme at Daar-ul-Maysaroh in Ibadan.",
  keywords: "registration, Quran memorization, Ibadan, Daar-ul-Maysaroh",
  authors: [{ name: "Daar-ul-Maysaroh" }],
  openGraph: {
    title: "Program Registration - Daar-ul-Maysaroh",
    description: "Register for your Quran memorization programme.",
    type: "website",
    locale: "en_NG",
  },
};

export default function RegisterPage() {
  return <RegisterClient />;
}