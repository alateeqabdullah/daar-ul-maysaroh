import { Hero } from "@/components/public/hero";
import { Features } from "@/components/public/features";
// import { Stats } from "@/components/public/stats";
import { CTA } from "@/components/public/cta";
import { Pricing } from "@/components/public/pricing"; // We will build this
// import { Testimonials } from "@/components/public/testimonials"; // And this

export default function LandingPage() {
  return (
    <>
      <Hero />
      {/* <Stats /> */}
      <Features />
      {/* <Testimonials /> */}
      <Pricing />
      <CTA />
    </>
  );
}
