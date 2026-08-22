// // app/(marketing)/onsite/admissions/boarding-admission-client.tsx
// "use client";

// import { useState, useEffect } from "react";
// import { AnimatePresence, motion } from "framer-motion";
// import {
//   GraduationCap,
//   User,
//   Users,
//   BookOpen,
//   Award,
//   Brain,
//   Heart,
//   HeartPulse,
//   MessageCircle,
//   UserCheck,
//   FileCheck,
//   CheckCircle2,
//   Shield,
//   Crown,
 
//   Camera,
// } from "lucide-react";
// import Link from "next/link";
// import { Button } from "@/components/ui/button";
// import { Reveal } from "@/components/shared/section-animation";
// import { toast } from "sonner";

// // Types
// import { FormData, Section, FormErrors } from "../types";

// // Components
// import { ProgressIndicator } from "../components/ProgressIndicator";
// import { NavigationButtons } from "../components/NavigationButtons";

// // Section Components
// import { SectionProgramme } from "../components/sections/SectionProgramme";
// import { SectionStudent } from "../components/sections/SectionStudent";
// import { SectionParent } from "../components/sections/SectionParent";
// import { SectionPassport } from "../components/sections/SectionPassport";
// import { SectionQuran } from "../components/sections/SectionQuran";
// import { SectionIslamic } from "../components/sections/SectionIslamic";
// import { SectionLearning } from "../components/sections/SectionLearning";
// import { SectionTarbiyah } from "../components/sections/SectionTarbiyah";
// import { SectionHealth } from "../components/sections/SectionHealth";
// import { SectionCommunication } from "../components/sections/SectionCommunication";
// import { SectionVisitation } from "../components/sections/SectionVisitation";
// import { SectionDeclaration } from "../components/sections/SectionDeclaration";

// // Validation
// import { validateSection } from "../utils/formValidation";

// // ============================================================
// // SECTIONS DEFINITION
// // ============================================================

// const SECTIONS: Section[] = [
//   { id: "programme", title: "Programme Selection", icon: GraduationCap },
//   { id: "student", title: "Student Information", icon: User },
//   { id: "parent", title: "Parent/Guardian", icon: Users },
//   { id: "passport", title: "Passport Photo", icon: Camera },
//   { id: "quran", title: "Qur'an Background", icon: BookOpen },
//   { id: "islamic", title: "Islamic Education", icon: Award },
//   { id: "learning", title: "Learning Profile", icon: Brain },
//   { id: "tarbiyah", title: "Boarding & Tarbiyah", icon: Heart },
//   { id: "health", title: "Health & Welfare", icon: HeartPulse },
//   { id: "communication", title: "Communication", icon: MessageCircle },
//   { id: "visitation", title: "Visitation", icon: UserCheck },
//   { id: "declaration", title: "Declaration", icon: FileCheck },
// ];

// // ============================================================
// // INITIAL FORM DATA
// // ============================================================

// const INITIAL_FORM_DATA: FormData = {
//   // Section 1: Programme Selection
//   programmeType: "",
//   programmeOfStudy: [],
//   enrolmentPeriod: "",
//   resumptionDate: "",
//   weekendDays: [],
//   // Section 2: Student Information
//   studentFullName: "",
//   preferredName: "",
//   gender: "",
//   dateOfBirth: "",
//   age: "",
//   nationality: "",
//   countryOfResidence: "",
//   stateOfOrigin: "",
//   residentialAddress: "",
//   livedAwayFromHome: "",
//   livedAwayFromHomeDetails: "",
//   boardedBefore: "",
//   previousMadrasah: "",
//   previousMadrasahLocation: "",
//   previousMadrasahDuration: "",
//   previousMadrasahReason: "",
//   // Section 3: Parent/Guardian
//   fatherName: "",
//   motherName: "",
//   guardianName: "",
//   guardianRelationship: "",
//   guardianPhone: "",
//   guardianWhatsApp: "",
//   guardianEmail: "",
//   guardianCountry: "",
//   guardianAddress: "",
//   preferredCommunication: "",
//   hasEmergencyContact: "",
//   emergencyContactName: "",
//   emergencyContactRelationship: "",
//   emergencyContactPhone: "",
//   emergencyContactWhatsApp: "",
//   // Section 4: Passport Photo
//   passportPhoto: null,
//   passportPhotoUrl: "",
//   // Section 5: Qur'an Background
//   startedQuran: "",
//   quranReadingLevel: "",
//   studiedNoorAlBayan: "",
//   noorAlBayanMethod: "",
//   startedMemorization: "",
//   memorizationAmount: "",
//   currentMemorizing: "",
//   memorizationFrequency: "",
//   memorizationAmountDescription: "",
//   memorizationStrength: "",
//   murajaahFrequency: "",
//   hasMurajaahRoutine: "",
//   murajaahRoutineDescription: "",
//   studiedTajweed: "",
//   tajweedLevel: "",
//   studiedQiraat: "",
//   qiraatDetails: "",
//   currentTeacher: "",
//   teacherName: "",
//   parentQuranGoals: [],
//   quranJourneyNotes: "",
//   // Section 6: Islamic Education
//   studiedIslamicStudies: "",
//   islamicStudiesAreas: [],
//   islamicKnowledgeLevel: "",
//   studiedArabic: "",
//   arabicLevel: "",
//   islamicEducationGoals: "",
//   // Section 7: Learning Profile
//   motivation: "",
//   desiredAchievement: "",
//   enjoysMemorization: "",
//   responseToCorrection: "",
//   concentrationDifficulty: "",
//   learningDifficulties: "",
//   learningDifficultiesDetails: "",
//   greatestStrength: "",
//   needsImprovement: "",
//   // Section 8: Boarding & Tarbiyah
//   whyBoarding: "",
//   livedAwayFromParents: "",
//   awayFromHomeResponse: "",
//   routineDifficulty: "",
//   wakesForSalah: "",
//   generalDiscipline: "",
//   behavioralConcerns: "",
//   personalityNotes: "",
//   tarbiyahGoals: "",
//   // Section 9: Health & Welfare
//   medicalCondition: "",
//   medicalConditionDetails: "",
//   allergies: "",
//   allergiesDetails: "",
//   medication: "",
//   medicationDetails: "",
//   dietaryRestrictions: "",
//   dietaryRestrictionsDetails: "",
//   seriousMedicalHistory: "",
//   specialNeeds: "",
//   specialNeedsDetails: "",
//   healthNotes: "",
//   // Section 10: Communication
//   updatePreference: "",
//   updateFrequency: "",
//   comfortableContact: "",
//   communicationNotes: "",
//   // Section 11: Visitation
//   authorisedVisitors: "",
//   authorisedCollectors: "",
//   restrictedPersons: "",
//   restrictedPersonsDetails: "",
//   // Section 12: Declaration
//   parentFullName: "",
//   declarationDate: "",
//   agreeDeclaration: false,
// };

// // ============================================================
// // MAIN COMPONENT
// // ============================================================

// export default function BoardingAdmissionClient() {
//   const [currentSection, setCurrentSection] = useState(0);
//   const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA);
//   const [errors, setErrors] = useState<FormErrors>({});
//   const [touched, setTouched] = useState<{ [key: string]: boolean }>({});
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [isMobile, setIsMobile] = useState(false);
//   const [showSuccess, setShowSuccess] = useState(false);
//   const [submitError, setSubmitError] = useState("");

//   const SNAPIT_ACCESS_KEY =
//     process.env.NEXT_PUBLIC_SNAPIT_ACCESS_KEY ||
//     "sf_154d98b73e50288b5327caec3d844896";

//   // Detect mobile
//   useEffect(() => {
//     const checkMobile = () => setIsMobile(window.innerWidth < 768);
//     checkMobile();
//     window.addEventListener("resize", checkMobile);
//     return () => window.removeEventListener("resize", checkMobile);
//   }, []);

//   // ============================================================
//   // FORM HANDLERS
//   // ============================================================

//   const handleChange = (
//     e: React.ChangeEvent<
//       HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
//     >,
//   ) => {
//     const { name, value, type } = e.target;
//     const checked = (e.target as HTMLInputElement).checked;

//     setFormData((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));

//     if (errors[name as keyof FormErrors]) {
//       setErrors((prev) => ({ ...prev, [name]: undefined }));
//     }

//     setTouched((prev) => ({ ...prev, [name]: true }));
//   };

//   const handleArrayChange = (name: string, value: string) => {
//     const current = formData[name as keyof FormData] as string[];
//     if (current.includes(value)) {
//       setFormData({
//         ...formData,
//         [name]: current.filter((item) => item !== value),
//       });
//     } else {
//       setFormData({ ...formData, [name]: [...current, value] });
//     }
//   };

//   // ============================================================
//   // PASSPORT UPLOAD HANDLERS
//   // ============================================================

//   const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       const validTypes = ["image/jpeg", "image/png", "image/jpg"];
//       if (!validTypes.includes(file.type)) {
//         toast.error("Please upload a JPG or PNG image");
//         return;
//       }

//       if (file.size > 5 * 1024 * 1024) {
//         toast.error("File size must be less than 5MB");
//         return;
//       }

//       const url = URL.createObjectURL(file);
//       setFormData((prev) => ({
//         ...prev,
//         passportPhoto: file,
//         passportPhotoUrl: url,
//       }));
//     }
//   };

//   const removePassportPhoto = () => {
//     if (formData.passportPhotoUrl) {
//       URL.revokeObjectURL(formData.passportPhotoUrl);
//     }
//     setFormData((prev) => ({
//       ...prev,
//       passportPhoto: null,
//       passportPhotoUrl: "",
//     }));
//   };

//   // ============================================================
//   // NAVIGATION
//   // ============================================================

//   const nextSection = () => {
//     const sectionErrors = validateSection(currentSection, formData);
//     if (Object.keys(sectionErrors).length > 0) {
//       setErrors(sectionErrors);
//       const firstError = document.querySelector(".error-message");
//       if (firstError) {
//         firstError.scrollIntoView({ behavior: "smooth", block: "center" });
//       }
//       return;
//     }

//     if (currentSection < SECTIONS.length - 1) {
//       setCurrentSection(currentSection + 1);
//       window.scrollTo({ top: 0, behavior: "smooth" });
//     }
//   };

//   const prevSection = () => {
//     if (currentSection > 0) {
//       setCurrentSection(currentSection - 1);
//       window.scrollTo({ top: 0, behavior: "smooth" });
//     }
//   };

//   // ============================================================
//   // SUBMIT
//   // ============================================================

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     // Validate all sections
//     const allErrors: FormErrors = {};
//     for (let i = 0; i < SECTIONS.length; i++) {
//       const sectionErrors = validateSection(i, formData);
//       Object.assign(allErrors, sectionErrors);
//     }

//     if (Object.keys(allErrors).length > 0) {
//       setErrors(allErrors);
//       for (let i = 0; i < SECTIONS.length; i++) {
//         const sectionErrors = validateSection(i, formData);
//         if (Object.keys(sectionErrors).length > 0) {
//           setCurrentSection(i);
//           break;
//         }
//       }
//       window.scrollTo({ top: 0, behavior: "smooth" });
//       return;
//     }

//     setIsSubmitting(true);
//     setSubmitError("");

//     try {
//       const submissionData: Record<string, any> = {};

//       Object.entries(formData).forEach(([key, value]) => {
//         if (key === "passportPhoto" || key === "passportPhotoUrl") return;
//         if (Array.isArray(value)) {
//           submissionData[key] = value.join(", ");
//         } else if (value !== undefined && value !== "") {
//           submissionData[key] = value;
//         }
//       });

//       if (formData.passportPhoto) {
//         submissionData.passportPhoto = formData.passportPhoto.name;
//       }

//       const response = await fetch("https://api.snapitforms.com/submit", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           access_key: SNAPIT_ACCESS_KEY,
//           ...submissionData,
//           _subject: "Daar-ul-Maysaroh Admission Application",
//           _replyto: formData.guardianEmail,
//         }),
//       });

//       const result = await response.json();

//       if (result.success) {
//         setShowSuccess(true);
//         window.scrollTo({ top: 0, behavior: "smooth" });
//       } else {
//         setSubmitError(
//           result.message || "Submission failed. Please try again.",
//         );
//       }
//     } catch (error) {
//       setSubmitError(
//         "Network error. Please check your connection and try again.",
//       );
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // ============================================================
//   // SUCCESS VIEW
//   // ============================================================

//   if (showSuccess) {
//     return (
//       <main className="relative bg-slate-950 overflow-hidden min-h-screen pt-24 md:pt-28">
//         <div className="container mx-auto px-4 xs:px-5 sm:px-6">
//           <div className="max-w-2xl mx-auto text-center py-20">
//             <div className="w-20 h-20 rounded-full bg-linear-to-br from-purple-600 to-amber-500 flex items-center justify-center mx-auto mb-6 shadow-2xl">
//               <CheckCircle2 className="w-10 h-10 text-white" />
//             </div>
//             <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
//               Application Submitted! 🎉
//             </h2>
//             <p className="text-slate-300 mb-6">
//               Your application has been received. Our team will review it and
//               contact you within 24-48 hours.
//             </p>
//             <div className="p-4 rounded-xl bg-purple-600/10 border border-purple-800/30 text-slate-300 text-sm mb-6">
//               <p className="font-black text-amber-500">Next Steps:</p>
//               <ul className="text-left mt-2 space-y-1">
//                 <li>• Review of your application by our admissions team</li>
//                 <li>• Contact within 24-48 hours</li>
//                 <li>• Assessment session scheduling</li>
//               </ul>
//             </div>
//             <Link href="/onsite">
//               <Button className="rounded-full px-8 py-3 font-black bg-linear-to-r from-purple-600 to-amber-500 text-white shadow-lg shadow-purple-500/20 hover:shadow-xl transition-all">
//                 Return to Home
//               </Button>
//             </Link>
//           </div>
//         </div>
//       </main>
//     );
//   }

//   // ============================================================
//   // RENDER
//   // ============================================================

//   const renderSection = () => {
//     const props = {
//       formData,
//       handleChange,
//       handleArrayChange,
//       errors,
//       touched,
//     };

//     switch (currentSection) {
//       case 0:
//         return <SectionProgramme {...props} />;
//       case 1:
//         return <SectionStudent {...props} />;
//       case 2:
//         return <SectionParent {...props} />;
//       case 3:
//         return (
//           <SectionPassport
//             {...props}
//             handleFileUpload={handleFileUpload}
//             removePassportPhoto={removePassportPhoto}
//           />
//         );
//       case 4:
//         return <SectionQuran {...props} />;
//       case 5:
//         return <SectionIslamic {...props} />;
//       case 6:
//         return <SectionLearning {...props} />;
//       case 7:
//         return <SectionTarbiyah {...props} />;
//       case 8:
//         return <SectionHealth {...props} />;
//       case 9:
//         return <SectionCommunication {...props} />;
//       case 10:
//         return <SectionVisitation {...props} />;
//       case 11:
//         return <SectionDeclaration {...props} />;
//       default:
//         return null;
//     }
//   };

//   const currentSectionData = SECTIONS[currentSection];

//   return (
//     <main className="relative bg-slate-950 overflow-hidden min-h-screen pt-24 md:pt-28">
//       {/* Background */}
//       <div className="fixed inset-0 pointer-events-none">
//         <div
//           className="absolute inset-0 opacity-[0.02] bg-[url('/islamic-pattern.svg')] bg-center bg-repeat"
//           style={{ backgroundSize: "300px" }}
//         />
//         <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[150px]" />
//         <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[150px]" />
//       </div>

//       <div className="container mx-auto px-4 xs:px-5 sm:px-6 relative z-10">
//         {/* Breadcrumb */}
//         <nav className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 flex items-center gap-2 mb-4 flex-wrap">
//           <Link
//             href="/onsite"
//             className="hover:text-amber-500 transition-colors"
//           >
//             Home
//           </Link>
//           <span className="opacity-30">/</span>
//           <span className="text-amber-500">Admissions</span>
//         </nav>

//         {/* Hero */}
//         <section className="py-4 md:py-6">
//           <Reveal>
//             <div className="text-center max-w-3xl mx-auto">
//               <div className="inline-flex items-center gap-2 text-amber-500 font-black text-xs uppercase tracking-wider mb-3">
//                 <GraduationCap className="w-4 h-4" />
//                 Application Form • 2026/2027 Session
//               </div>
//               <h1 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter font-heading leading-[1.1] text-white">
//                 Boarding{" "}
//                 <span className="bg-linear-to-r from-purple-400 to-amber-400 bg-clip-text text-transparent">
//                   Admission
//                 </span>
//               </h1>
//               <p className="text-sm md:text-base text-slate-300 max-w-2xl mx-auto mt-3">
//                 Application for admission into the Daar-ul-Maysaroh Boarding
//                 Programme.
//               </p>
//             </div>
//           </Reveal>
//         </section>

//         {/* Error Message */}
//         {submitError && (
//           <div className="max-w-4xl mx-auto mb-4 p-4 rounded-xl bg-red-600/20 border border-red-500/30 text-red-300 text-sm">
//             {submitError}
//           </div>
//         )}

//         {/* Progress Indicator */}
//         <ProgressIndicator
//           sections={SECTIONS}
//           currentSection={currentSection}
//           setCurrentSection={setCurrentSection}
//           isMobile={isMobile}
//         />

//         {/* Form */}
//         <form onSubmit={handleSubmit} className="py-4 md:py-6">
//           <div className="max-w-4xl mx-auto">
//             <div className="p-4 md:p-8 rounded-3xl bg-slate-900/30 hover:bg-slate-900/50 transition-all">
//               <AnimatePresence mode="wait">
//                 <motion.div
//                   key={currentSection}
//                   initial={{ opacity: 0, x: 20 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   exit={{ opacity: 0, x: -20 }}
//                   transition={{ duration: 0.3 }}
//                 >
//                   {/* Section Header */}
//                   <div className="flex items-center gap-3 mb-6">
//                     <div className="w-10 h-10 rounded-xl bg-linear-to-r from-purple-600 to-amber-500 flex items-center justify-center shrink-0">
//                       <currentSectionData.icon className="w-5 h-5 text-white" />
//                     </div>
//                     <div>
//                       <p className="text-[10px] font-black text-amber-500 uppercase tracking-wider">
//                         Section {currentSection + 1} of {SECTIONS.length}
//                       </p>
//                       <h2 className="text-lg md:text-xl font-black text-white">
//                         {currentSectionData.title}
//                       </h2>
//                     </div>
//                   </div>

//                   {/* Section Content */}
//                   {renderSection()}

//                   {/* Navigation Buttons */}
//                   <NavigationButtons
//                     currentSection={currentSection}
//                     totalSections={SECTIONS.length}
//                     prevSection={prevSection}
//                     nextSection={nextSection}
//                     isSubmitting={isSubmitting}
//                     isLastSection={currentSection === SECTIONS.length - 1}
//                     canSubmit={formData.agreeDeclaration}
//                   />
//                 </motion.div>
//               </AnimatePresence>
//             </div>
//           </div>
//         </form>

//         {/* Trust Badge */}
//         <div className="text-center pb-8">
//           <div className="inline-flex flex-wrap items-center justify-center gap-4 px-6 py-3 rounded-2xl bg-slate-900/30">
//             <span className="flex items-center gap-2 text-xs text-slate-400">
//               <Shield className="w-4 h-4 text-purple-400" />
//               Ijazah Certified
//             </span>
//             <span className="flex items-center gap-2 text-xs text-slate-400">
//               <Crown className="w-4 h-4 text-amber-400" />
//               Authentic Sanad
//             </span>
//             <span className="flex items-center gap-2 text-xs text-slate-400">
//               <FileCheck className="w-4 h-4 text-purple-400" />
//               Secure Application
//             </span>
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// }






// app/(marketing)/onsite/admissions/boarding-admission-client.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import {
  GraduationCap,
  User,
  Users,
  BookOpen,
  Award,
  Brain,
  Heart,
  HeartPulse,
  MessageCircle,
  UserCheck,
  FileCheck,
  CheckCircle2,
  Shield,
  Crown,
  Camera,
  Sparkles,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

// Types
import { FormData, Section, FormErrors } from "../types";

// Components
import { SectionProgramme } from "../components/sections/SectionProgramme";
import { SectionStudent } from "../components/sections/SectionStudent";
import { SectionParent } from "../components/sections/SectionParent";
import { SectionPassport } from "../components/sections/SectionPassport";
import { SectionQuran } from "../components/sections/SectionQuran";
import { SectionIslamic } from "../components/sections/SectionIslamic";
import { SectionLearning } from "../components/sections/SectionLearning";
import { SectionTarbiyah } from "../components/sections/SectionTarbiyah";
import { SectionHealth } from "../components/sections/SectionHealth";
import { SectionCommunication } from "../components/sections/SectionCommunication";
import { SectionVisitation } from "../components/sections/SectionVisitation";
import { SectionDeclaration } from "../components/sections/SectionDeclaration";

// Validation
import { validateSection } from "../utils/formValidation";
import { cn } from "@/lib/utils";

// ============================================================
// SECTIONS DEFINITION
// ============================================================

const SECTIONS: Section[] = [
  { id: "programme", title: "Programme Selection", icon: GraduationCap },
  { id: "student", title: "Student Information", icon: User },
  { id: "parent", title: "Parent/Guardian", icon: Users },
  { id: "passport", title: "Passport Photo", icon: Camera },
  { id: "quran", title: "Qur'an Background", icon: BookOpen },
  { id: "islamic", title: "Islamic Education", icon: Award },
  { id: "learning", title: "Learning Profile", icon: Brain },
  { id: "tarbiyah", title: "Boarding & Tarbiyah", icon: Heart },
  { id: "health", title: "Health & Welfare", icon: HeartPulse },
  { id: "communication", title: "Communication", icon: MessageCircle },
  { id: "visitation", title: "Visitation", icon: UserCheck },
  { id: "declaration", title: "Declaration", icon: FileCheck },
];

// ============================================================
// COLOR STYLES - SUPPORTS BOTH LIGHT & DARK
// ============================================================

const getColorStyles = (color: string) => {
  const map = {
    purple: {
      text: "text-purple-700 dark:text-purple-400",
      border: "border-purple-200 dark:border-purple-800/30",
      bg: "bg-purple-100 dark:bg-purple-600/20",
      lightBg: "bg-purple-50 dark:bg-purple-950/40",
      gradient: "from-purple-600 to-purple-700 dark:from-purple-500 dark:to-purple-600",
      glow: "shadow-purple-500/30 dark:shadow-purple-500/30",
      hover: "hover:bg-purple-50 dark:hover:bg-purple-600/10",
    },
    amber: {
      text: "text-amber-700 dark:text-amber-400",
      border: "border-amber-200 dark:border-amber-800/30",
      bg: "bg-amber-100 dark:bg-amber-500/20",
      lightBg: "bg-amber-50 dark:bg-amber-950/40",
      gradient: "from-amber-500 to-amber-600 dark:from-amber-500 dark:to-amber-600",
      glow: "shadow-amber-500/30 dark:shadow-amber-500/30",
      hover: "hover:bg-amber-50 dark:hover:bg-amber-500/10",
    },
  } as const;
  return map[color as keyof typeof map] ?? map.purple;
};

// ============================================================
// PROGRESS INDICATOR - PREMIUM
// ============================================================

function PremiumProgressIndicator({
  sections,
  currentSection,
  setCurrentSection,
  isMobile,
}: any) {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Steps */}
      <div className="flex items-center gap-1 mb-3">
        {sections.map((section: Section, idx: number) => {
          const Icon = section.icon;
          const isActive = idx === currentSection;
          const isCompleted = idx < currentSection;

          // Show fewer steps on mobile
          if (isMobile && idx % 2 !== 0 && idx !== sections.length - 1) return null;

          return (
            <button
              key={section.id}
              onClick={() => setCurrentSection(idx)}
              className="flex flex-col items-center min-w-[36px] md:min-w-[50px] group flex-1"
            >
              <div
                className={cn(
                  "w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-all duration-300",
                  isActive
                    ? "bg-gradient-to-r from-purple-600 to-amber-500 text-white shadow-lg scale-105"
                    : isCompleted
                    ? "bg-purple-600/40 text-purple-300"
                    : "bg-muted/50 text-muted-foreground"
                )}
              >
                {isCompleted ? (
                  <CheckCircle2 className="w-3 h-3 md:w-4 md:h-4" />
                ) : (
                  <Icon className="w-3 h-3 md:w-4 md:h-4" />
                )}
              </div>
              <span
                className={cn(
                  "text-[5px] md:text-[6px] font-black uppercase mt-0.5 whitespace-nowrap",
                  isActive ? "text-amber-600 dark:text-amber-400" : "text-muted-foreground"
                )}
              >
                {isMobile
                  ? section.title.split(" ")[0].slice(0, 3)
                  : section.title.split(" ")[0]}
              </span>
            </button>
          );
        })}
      </div>

      {/* Progress Bar */}
      <div className="w-full h-1.5 bg-muted/30 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-purple-600 to-amber-500 rounded-full"
          initial={{ width: "0%" }}
          animate={{ width: `${((currentSection + 1) / sections.length) * 100}%` }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
      </div>

      {/* Section Counter */}
      <div className="text-center mt-2">
        <p className="text-[10px] text-muted-foreground">
          {currentSection + 1} of {sections.length} • {sections[currentSection]?.title}
        </p>
      </div>
    </div>
  );
}

// ============================================================
// NAVIGATION BUTTONS - PREMIUM
// ============================================================

function PremiumNavigationButtons({
  currentSection,
  totalSections,
  prevSection,
  nextSection,
  isSubmitting,
  isLastSection,
  canSubmit,
}: any) {
  return (
    <>
      <div className="h-6 md:h-8" />
      
      <div className="flex flex-col sm:flex-row justify-between gap-4 mt-4 pt-6 border-t-2 border-purple-200/20 dark:border-purple-800/20">
        <Button
          type="button"
          onClick={prevSection}
          disabled={currentSection === 0}
          className="rounded-xl py-3 md:py-3.5 font-black text-xs md:text-sm bg-muted/30 hover:bg-muted/50 text-foreground disabled:opacity-50 disabled:cursor-not-allowed min-h-[48px] px-6 w-full sm:w-auto order-2 sm:order-1 transition-all duration-300"
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          <span>Previous</span>
        </Button>

        {isLastSection ? (
          <Button
            type="submit"
            disabled={!canSubmit || isSubmitting}
            className="rounded-xl py-3 md:py-3.5 font-black text-xs md:text-sm bg-gradient-to-r from-purple-600 to-amber-500 hover:from-purple-700 hover:to-amber-600 text-white shadow-2xl shadow-purple-500/30 hover:shadow-purple-500/50 transition-all duration-300 group disabled:opacity-50 disabled:cursor-not-allowed min-h-[48px] px-8 w-full sm:w-auto order-1 sm:order-2 relative overflow-hidden"
          >
            {isSubmitting ? (
              <>
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                Submitting...
              </>
            ) : (
              <>
                <span className="relative z-10 flex items-center">
                  Submit Application
                  <Sparkles className="w-4 h-4 ml-2 group-hover:scale-110 transition-transform" />
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                />
              </>
            )}
          </Button>
        ) : (
          <Button
            type="button"
            onClick={nextSection}
            className="rounded-xl py-3 md:py-3.5 font-black text-xs md:text-sm bg-gradient-to-r from-purple-600 to-purple-700 dark:from-purple-600 dark:to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white shadow-2xl shadow-purple-500/30 hover:shadow-purple-500/50 transition-all duration-300 group min-h-[48px] px-8 w-full sm:w-auto order-1 sm:order-2"
          >
            <span className="flex items-center">
              Next
              <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </span>
          </Button>
        )}
      </div>
    </>
  );
}

// ============================================================
// FLOATING PARTICLES
// ============================================================

function FloatingParticles({ count = 6 }: { count?: number }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(count)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-purple-500/30 dark:bg-purple-500/20"
          animate={{
            y: [0, -60 + i * 5],
            x: [0, (i % 2 === 0 ? 30 : -30) + i * 2],
            opacity: [0, 0.4, 0],
          }}
          transition={{
            duration: 5 + i,
            repeat: Infinity,
            delay: i * 0.4,
            ease: "easeInOut",
          }}
          style={{
            left: `${10 + i * 12}%`,
            top: `${20 + i * 10}%`,
          }}
        />
      ))}
    </div>
  );
}

// ============================================================
// INITIAL FORM DATA
// ============================================================

const INITIAL_FORM_DATA: FormData = {
  programmeType: "",
  programmeOfStudy: [],
  enrolmentPeriod: "",
  resumptionDate: "",
  weekendDays: [],
  studentFullName: "",
  preferredName: "",
  gender: "",
  dateOfBirth: "",
  age: "",
  nationality: "",
  countryOfResidence: "",
  stateOfOrigin: "",
  residentialAddress: "",
  livedAwayFromHome: "",
  livedAwayFromHomeDetails: "",
  boardedBefore: "",
  previousMadrasah: "",
  previousMadrasahLocation: "",
  previousMadrasahDuration: "",
  previousMadrasahReason: "",
  fatherName: "",
  motherName: "",
  guardianName: "",
  guardianRelationship: "",
  guardianPhone: "",
  guardianWhatsApp: "",
  guardianEmail: "",
  guardianCountry: "",
  guardianAddress: "",
  preferredCommunication: "",
  hasEmergencyContact: "",
  emergencyContactName: "",
  emergencyContactRelationship: "",
  emergencyContactPhone: "",
  emergencyContactWhatsApp: "",
  passportPhoto: null,
  passportPhotoUrl: "",
  startedQuran: "",
  quranReadingLevel: "",
  studiedNoorAlBayan: "",
  noorAlBayanMethod: "",
  startedMemorization: "",
  memorizationAmount: "",
  currentMemorizing: "",
  memorizationFrequency: "",
  memorizationAmountDescription: "",
  memorizationStrength: "",
  murajaahFrequency: "",
  hasMurajaahRoutine: "",
  murajaahRoutineDescription: "",
  studiedTajweed: "",
  tajweedLevel: "",
  studiedQiraat: "",
  qiraatDetails: "",
  currentTeacher: "",
  teacherName: "",
  parentQuranGoals: [],
  quranJourneyNotes: "",
  studiedIslamicStudies: "",
  islamicStudiesAreas: [],
  islamicKnowledgeLevel: "",
  studiedArabic: "",
  arabicLevel: "",
  islamicEducationGoals: "",
  motivation: "",
  desiredAchievement: "",
  enjoysMemorization: "",
  responseToCorrection: "",
  concentrationDifficulty: "",
  learningDifficulties: "",
  learningDifficultiesDetails: "",
  greatestStrength: "",
  needsImprovement: "",
  whyBoarding: "",
  livedAwayFromParents: "",
  awayFromHomeResponse: "",
  routineDifficulty: "",
  wakesForSalah: "",
  generalDiscipline: "",
  behavioralConcerns: "",
  personalityNotes: "",
  tarbiyahGoals: "",
  medicalCondition: "",
  medicalConditionDetails: "",
  allergies: "",
  allergiesDetails: "",
  medication: "",
  medicationDetails: "",
  dietaryRestrictions: "",
  dietaryRestrictionsDetails: "",
  seriousMedicalHistory: "",
  specialNeeds: "",
  specialNeedsDetails: "",
  healthNotes: "",
  updatePreference: "",
  updateFrequency: "",
  comfortableContact: "",
  communicationNotes: "",
  authorisedVisitors: "",
  authorisedCollectors: "",
  restrictedPersons: "",
  restrictedPersonsDetails: "",
  parentFullName: "",
  declarationDate: "",
  agreeDeclaration: false,
};

// ============================================================
// MAIN COMPONENT
// ============================================================

export default function BoardingAdmissionClient() {
  const [currentSection, setCurrentSection] = useState(0);
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const SNAPIT_ACCESS_KEY =
    process.env.NEXT_PUBLIC_SNAPIT_ACCESS_KEY ||
    "sf_154d98b73e50288b5327caec3d844896";

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // ============================================================
  // FORM HANDLERS
  // ============================================================

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }

    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const handleArrayChange = (name: string, value: string) => {
    const current = formData[name as keyof FormData] as string[];
    if (current.includes(value)) {
      setFormData({
        ...formData,
        [name]: current.filter((item) => item !== value),
      });
    } else {
      setFormData({ ...formData, [name]: [...current, value] });
    }
  };

  // ============================================================
  // PASSPORT UPLOAD HANDLERS
  // ============================================================

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const validTypes = ["image/jpeg", "image/png", "image/jpg"];
      if (!validTypes.includes(file.type)) {
        toast.error("Please upload a JPG or PNG image");
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size must be less than 5MB");
        return;
      }

      const url = URL.createObjectURL(file);
      setFormData((prev) => ({
        ...prev,
        passportPhoto: file,
        passportPhotoUrl: url,
      }));
    }
  };

  const removePassportPhoto = () => {
    if (formData.passportPhotoUrl) {
      URL.revokeObjectURL(formData.passportPhotoUrl);
    }
    setFormData((prev) => ({
      ...prev,
      passportPhoto: null,
      passportPhotoUrl: "",
    }));
  };

  // ============================================================
  // NAVIGATION
  // ============================================================

  const nextSection = () => {
    const sectionErrors = validateSection(currentSection, formData);
    if (Object.keys(sectionErrors).length > 0) {
      setErrors(sectionErrors);
      const firstError = document.querySelector(".error-message");
      if (firstError) {
        firstError.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }

    if (currentSection < SECTIONS.length - 1) {
      setCurrentSection(currentSection + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const prevSection = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // ============================================================
  // SUBMIT
  // ============================================================

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all sections
    const allErrors: FormErrors = {};
    for (let i = 0; i < SECTIONS.length; i++) {
      const sectionErrors = validateSection(i, formData);
      Object.assign(allErrors, sectionErrors);
    }

    if (Object.keys(allErrors).length > 0) {
      setErrors(allErrors);
      for (let i = 0; i < SECTIONS.length; i++) {
        const sectionErrors = validateSection(i, formData);
        if (Object.keys(sectionErrors).length > 0) {
          setCurrentSection(i);
          break;
        }
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");

    try {
      const submissionData: Record<string, any> = {};

      Object.entries(formData).forEach(([key, value]) => {
        if (key === "passportPhoto" || key === "passportPhotoUrl") return;
        if (Array.isArray(value)) {
          submissionData[key] = value.join(", ");
        } else if (value !== undefined && value !== "") {
          submissionData[key] = value;
        }
      });

      if (formData.passportPhoto) {
        submissionData.passportPhoto = formData.passportPhoto.name;
      }

      const response = await fetch("https://api.snapitforms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: SNAPIT_ACCESS_KEY,
          ...submissionData,
          _subject: "Daar-ul-Maysaroh Admission Application",
          _replyto: formData.guardianEmail,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setShowSuccess(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        setSubmitError(
          result.message || "Submission failed. Please try again."
        );
      }
    } catch (error) {
      setSubmitError(
        "Network error. Please check your connection and try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // ============================================================
  // SUCCESS VIEW - ULTRA PREMIUM
  // ============================================================

  if (showSuccess) {
    return (
      <main className="relative bg-background dark:bg-slate-950 overflow-hidden min-h-screen pt-24 md:pt-28">
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.02] bg-[url('/islamic-pattern.svg')] bg-center bg-repeat" style={{ backgroundSize: "300px" }} />
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-600/10 dark:bg-purple-600/10 rounded-full blur-[150px]" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-amber-500/10 dark:bg-amber-500/10 rounded-full blur-[150px]" />
        </div>
        <div className="container mx-auto px-4 xs:px-5 sm:px-6">
          <div className="max-w-2xl mx-auto text-center py-20">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-600 to-amber-500 flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-purple-500/30"
            >
              <CheckCircle2 className="w-12 h-12 text-white" />
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-3xl md:text-4xl font-black text-foreground mb-4"
            >
              Application Submitted! 🎉
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-muted-foreground mb-6"
            >
              Your application has been received. Our team will review it and
              contact you within 24-48 hours.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="p-5 rounded-xl bg-gradient-to-br from-purple-50/50 to-amber-50/50 dark:from-purple-600/10 dark:to-amber-500/10 border border-purple-200 dark:border-purple-800/30 text-left"
            >
              <p className="font-black text-amber-600 dark:text-amber-400">Next Steps:</p>
              <ul className="mt-2 space-y-1.5 text-muted-foreground">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  Review of your application by our admissions team
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                  Contact within 24-48 hours
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  Assessment session scheduling
                </li>
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-6"
            >
              <Link href="/onsite">
                <Button className="rounded-full px-8 py-3 font-black bg-gradient-to-r from-purple-600 to-amber-500 hover:from-purple-700 hover:to-amber-600 text-white shadow-2xl shadow-purple-500/30 hover:shadow-purple-500/50 transition-all duration-300 group">
                  Return to Home
                  <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </main>
    );
  }

  // ============================================================
  // RENDER SECTION
  // ============================================================

  const renderSection = () => {
    const props = {
      formData,
      handleChange,
      handleArrayChange,
      errors,
      touched,
    };

    switch (currentSection) {
      case 0:
        return <SectionProgramme {...props} />;
      case 1:
        return <SectionStudent {...props} />;
      case 2:
        return <SectionParent {...props} />;
      case 3:
        return (
          <SectionPassport
            {...props}
            handleFileUpload={handleFileUpload}
            removePassportPhoto={removePassportPhoto}
          />
        );
      case 4:
        return <SectionQuran {...props} />;
      case 5:
        return <SectionIslamic {...props} />;
      case 6:
        return <SectionLearning {...props} />;
      case 7:
        return <SectionTarbiyah {...props} />;
      case 8:
        return <SectionHealth {...props} />;
      case 9:
        return <SectionCommunication {...props} />;
      case 10:
        return <SectionVisitation {...props} />;
      case 11:
        return <SectionDeclaration {...props} />;
      default:
        return null;
    }
  };

  const currentSectionData = SECTIONS[currentSection];

  return (
    <main className="relative bg-background dark:bg-slate-950 overflow-hidden min-h-screen pt-24 md:pt-28">
      {/* Premium Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.02] bg-[url('/islamic-pattern.svg')] bg-center bg-repeat" style={{ backgroundSize: "300px" }} />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-600/10 dark:bg-purple-600/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-amber-500/10 dark:bg-amber-500/10 rounded-full blur-[150px]" />
        <FloatingParticles count={8} />
      </div>

      <div className="container mx-auto px-4 xs:px-5 sm:px-6 relative z-10">
        {/* Breadcrumb */}
        <nav className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground flex items-center gap-2 mb-6 flex-wrap">
          <Link href="/onsite" className="hover:text-purple-600 dark:hover:text-amber-500 transition-colors">
            Home
          </Link>
          <span className="opacity-30">/</span>
          <span className="text-purple-600 dark:text-amber-500">Admissions</span>
        </nav>

        {/* Hero */}
        <section className="py-4 md:py-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 text-amber-600 dark:text-amber-500 font-black text-xs uppercase tracking-wider mb-4">
              <GraduationCap className="w-4 h-4" />
              Application Form • 2026/2027 Session
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter font-heading leading-[1.1] text-foreground">
              Boarding{" "}
              <span className="bg-gradient-to-r from-purple-600 to-amber-600 dark:from-purple-400 dark:to-amber-400 bg-clip-text text-transparent">
                Admission
              </span>
            </h1>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mt-3">
              Application for admission into the Daar-ul-Maysaroh Boarding
              Programme.
            </p>
          </motion.div>
        </section>

        {/* Error Message */}
        {submitError && (
          <div className="max-w-4xl mx-auto mb-4 p-4 rounded-xl bg-red-600/20 dark:bg-red-600/10 border border-red-500/30 text-red-600 dark:text-red-400 text-sm">
            {submitError}
          </div>
        )}

        {/* Premium Progress Indicator */}
        <PremiumProgressIndicator
          sections={SECTIONS}
          currentSection={currentSection}
          setCurrentSection={setCurrentSection}
          isMobile={isMobile}
        />

        {/* Form */}
        <form onSubmit={handleSubmit} className="py-4 md:py-6">
          <div className="max-w-4xl mx-auto">
            <div className="p-4 md:p-8 rounded-3xl bg-card/50 dark:bg-slate-900/30 hover:bg-card/60 dark:hover:bg-slate-900/50 transition-all duration-500 border border-border dark:border-slate-800/30 shadow-xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSection}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Section Header */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-purple-600 to-amber-500 flex items-center justify-center shrink-0 shadow-lg">
                      <currentSectionData.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-amber-600 dark:text-amber-400 uppercase tracking-wider">
                        Section {currentSection + 1} of {SECTIONS.length}
                      </p>
                      <h2 className="text-lg md:text-xl font-black text-foreground">
                        {currentSectionData.title}
                      </h2>
                    </div>
                  </div>

                  {/* Section Content */}
                  {renderSection()}

                  {/* Premium Navigation Buttons */}
                  <PremiumNavigationButtons
                    currentSection={currentSection}
                    totalSections={SECTIONS.length}
                    prevSection={prevSection}
                    nextSection={nextSection}
                    isSubmitting={isSubmitting}
                    isLastSection={currentSection === SECTIONS.length - 1}
                    canSubmit={formData.agreeDeclaration}
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </form>

        {/* Trust Badge */}
        <div className="text-center pb-8">
          <div className="inline-flex flex-wrap items-center justify-center gap-4 px-6 py-3 rounded-2xl bg-card/50 dark:bg-slate-900/30 border border-border dark:border-slate-800/30">
            <span className="flex items-center gap-2 text-xs text-muted-foreground">
              <Shield className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              Ijazah Certified
            </span>
            <span className="flex items-center gap-2 text-xs text-muted-foreground">
              <Crown className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              Authentic Sanad
            </span>
            <span className="flex items-center gap-2 text-xs text-muted-foreground">
              <FileCheck className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              Secure Application
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}