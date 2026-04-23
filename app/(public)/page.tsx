// import { Hero } from "@/components/sections/hero";
// import { Teachers } from "@/components/sections/teachers";
// import { Testimonials } from "@/components/sections/testimonials";
// // import { PaymentPlansWithStripe } from "@/components/payment/payment-plans-with-stripe";
// import { Features } from "@/components/sections/features";
// import { Stats } from "@/components/sections/stats";
// import { QuranicVerse } from "@/components/sections/quranic-verse";
// import { LearningProcess } from "@/components/sections/learning-process";
// import { TrustIndicators } from "@/components/sections/trust-indicators";
// import { Contact } from "@/components/sections/contact";
// import { FeaturedCourses } from "@/components/sections/featured-courses";
// import { CTA } from "@/components/sections/cta";
// import { FAQ } from "@/components/sections/faq";

// export default async function HomePage() {

//   // await new Promise((resolve) => setTimeout(resolve, 2000));
  
//   return (
//     <main className="min-h-screen">
//       <Hero />
//       <TrustIndicators />
//       <QuranicVerse />
//       <Features />
//       <FeaturedCourses />
//       <LearningProcess />
//       <Teachers />
//       <Stats />
//       <Testimonials />
//       <FAQ />
//       <CTA />
//       {/* <PaymentPlansWithStripe /> */}
//       <Contact />
//     </main>
//   );
// }










// app/page.tsx
import { Hero } from "@/components/sections/hero";
import { Teachers } from "@/components/sections/teachers";
import { Testimonials } from "@/components/sections/testimonials";
import { Features } from "@/components/sections/features";
import { Stats } from "@/components/sections/stats";
import { QuranicVerse } from "@/components/sections/quranic-verse";
import { LearningProcess } from "@/components/sections/learning-process";
import { TrustIndicators } from "@/components/sections/trust-indicators";
import { Contact } from "@/components/sections/contact";
import { FeaturedCourses } from "@/components/sections/featured-courses";
import { CTA } from "@/components/sections/cta";
import { FAQ } from "@/components/sections/faq";
import { SectionNavigator } from "@/components/shared/section-navigator";

export default async function HomePage() {
  return (
    <main className="min-h-screen">
      {/* Add id props to each section for navigation */}
      <section id="hero">
        <Hero />
      </section>
      
      <section id="trust-indicators">
        <TrustIndicators />
      </section>
      
      <section id="quranic-verse">
        <QuranicVerse />
      </section>
      
      <section id="features">
        <Features />
      </section>
      
      <section id="featured-courses">
        <FeaturedCourses />
      </section>
      
      <section id="learning-process">
        <LearningProcess />
      </section>
      
      <section id="teachers">
        <Teachers />
      </section>
      
      <section id="stats">
        <Stats />
      </section>
      
      <section id="testimonials">
        <Testimonials />
      </section>
      
      <section id="faq">
        <FAQ />
      </section>
      
      <section id="cta">
        <CTA />
      </section>
      
      <section id="contact">
        <Contact />
      </section>
      
      {/* Floating Navigation Helper */}
      <SectionNavigator />
    </main>
  );
}