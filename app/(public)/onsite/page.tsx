// app/(marketing)/physical/page.tsx
import { PhysicalHero } from "./components/sections/PhysicalHero";
import { PhysicalAbout } from "./components/sections/PhysicalAbout";
import { PhysicalStats } from "./components/sections/PhysicalStats";
import { PhysicalPrograms } from "./components/sections/PhysicalPrograms";
import { PhysicalBoarding } from "./components/sections/PhysicalBoarding";
import { PhysicalStudentLife } from "./components/sections/PhysicalStudentLife";
import { PhysicalFees } from "./components/sections/PhysicalFees";
import { PhysicalSchedule } from "./components/sections/PhysicalSchedule";
import { ProgrammesSection } from "./components/sections/ProgrammesSection";
import { PhysicalTestimonials } from "./components/sections/PhysicalTestimonials";
import { PhysicalFAQ } from "./components/sections/PhysicalFAQ";
import { PhysicalCTA } from "./components/sections/PhysicalCTA";
import { QuranicVerse } from "@/components/sections/quranic-verse";
import { PhysicalAttendance } from "./components/sections/PhysicalAttendance";
import { PhysicalAdmissionsProcess } from "./components/sections/PhysicalAdmissionsProcess";
import { PhysicalWhyChoose } from "./components/sections/PhysicalWhyChoose";
import { PhysicalEvents } from "./components/sections/PhysicalEvents";
// import { PhysicalEvents } from "./components/sections/PhysicalEvents";

export default function PhysicalPage() {
  return (
    <main className="min-h-screen">
      <PhysicalHero />
      <PhysicalAbout />
      <PhysicalStats />
      <PhysicalWhyChoose />
      <QuranicVerse/> 
      <PhysicalPrograms />
      <PhysicalAttendance />
      <PhysicalBoarding />
      <PhysicalStudentLife />
      <PhysicalAdmissionsProcess />
      {/* <PhysicalFees /> */}
      {/* <PhysicalSchedule /> */}
      {/* <ProgrammesSection /> */}
      <PhysicalTestimonials />
      <PhysicalEvents/> 
      <PhysicalFAQ />
      <PhysicalCTA />
    </main>
  );
}
