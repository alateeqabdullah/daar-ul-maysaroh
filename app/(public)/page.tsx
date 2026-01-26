import { Hero } from "@/components/sections/hero";
import { Courses } from "@/components/sections/courses";
import { Teachers } from "@/components/sections/teachers";
import { Testimonials } from "@/components/sections/testimonials";
import { PaymentPlansWithStripe } from "@/components/payment/payment-plans-with-stripe";
import { Features } from "@/components/sections/features";
import { Stats } from "@/components/sections/stats";
import { QuranicVerse } from "@/components/sections/quranic-verse";
import { LearningProcess } from "@/components/sections/learning-process";
import { TrustIndicators } from "@/components/sections/trust-indicators";
import { Contact } from "@/components/sections/contact";
import { FeaturedCourses } from "@/components/sections/featured-courses";
import { CTA } from "@/components/sections/cta";
import { FAQ } from "@/components/sections/faq";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Hero />
      <TrustIndicators />
      <QuranicVerse />
      <Features />
      <FeaturedCourses />
      <LearningProcess />
      <Teachers />
      <Stats />
      <Testimonials />
      <FAQ />
      <CTA />
      {/* <PaymentPlansWithStripe /> */}
      <Contact />
    </main>
  );
}
