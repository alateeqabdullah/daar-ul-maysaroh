import { Hero } from "@/components/sections/hero";
import { Courses } from "@/components/sections/courses";
import { Teachers } from "@/components/sections/teachers";
import { Testimonials } from "@/components/sections/testimonials";
import { PaymentPlansWithStripe } from "@/components/payment/payment-plans-with-stripe"
import { Features } from "@/components/sections/features";
import { Stats } from "@/components/sections/stats";
import { QuranicVerse } from "@/components/sections/quranic-verse";
import { LearningProcess } from "@/components/sections/learning-process";
import { TrustIndicators } from "@/components/sections/trust-indicators";
import { Contact } from "@/components/sections/contact";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Hero />
      <TrustIndicators />
      <QuranicVerse />
      <Features />
      <Courses />
      <LearningProcess />
      <Teachers />
      <Stats />
      <Testimonials />
      <PaymentPlansWithStripe />
      <Contact />
    </main>
  );
}
