// app/(marketing)/onsite/admissions/boarding-admission-client.tsx
"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
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
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/shared/section-animation";
import { toast } from "sonner";

// Types
import { FormData, Section, FormErrors } from "../types";

// Components
import { ProgressIndicator } from "../components/ProgressIndicator";
import { NavigationButtons } from "../components/NavigationButtons";

// Section Components
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
// INITIAL FORM DATA
// ============================================================

const INITIAL_FORM_DATA: FormData = {
  // Section 1: Programme Selection
  programmeType: "",
  programmeOfStudy: [],
  enrolmentPeriod: "",
  resumptionDate: "",
  weekendDays: [],
  // Section 2: Student Information
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
  // Section 3: Parent/Guardian
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
  // Section 4: Passport Photo
  passportPhoto: null,
  passportPhotoUrl: "",
  // Section 5: Qur'an Background
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
  // Section 6: Islamic Education
  studiedIslamicStudies: "",
  islamicStudiesAreas: [],
  islamicKnowledgeLevel: "",
  studiedArabic: "",
  arabicLevel: "",
  islamicEducationGoals: "",
  // Section 7: Learning Profile
  motivation: "",
  desiredAchievement: "",
  enjoysMemorization: "",
  responseToCorrection: "",
  concentrationDifficulty: "",
  learningDifficulties: "",
  learningDifficultiesDetails: "",
  greatestStrength: "",
  needsImprovement: "",
  // Section 8: Boarding & Tarbiyah
  whyBoarding: "",
  livedAwayFromParents: "",
  awayFromHomeResponse: "",
  routineDifficulty: "",
  wakesForSalah: "",
  generalDiscipline: "",
  behavioralConcerns: "",
  personalityNotes: "",
  tarbiyahGoals: "",
  // Section 9: Health & Welfare
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
  // Section 10: Communication
  updatePreference: "",
  updateFrequency: "",
  comfortableContact: "",
  communicationNotes: "",
  // Section 11: Visitation
  authorisedVisitors: "",
  authorisedCollectors: "",
  restrictedPersons: "",
  restrictedPersonsDetails: "",
  // Section 12: Declaration
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
    >,
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
          result.message || "Submission failed. Please try again.",
        );
      }
    } catch (error) {
      setSubmitError(
        "Network error. Please check your connection and try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // ============================================================
  // SUCCESS VIEW
  // ============================================================

  if (showSuccess) {
    return (
      <main className="relative bg-slate-950 overflow-hidden min-h-screen pt-24 md:pt-28">
        <div className="container mx-auto px-4 xs:px-5 sm:px-6">
          <div className="max-w-2xl mx-auto text-center py-20">
            <div className="w-20 h-20 rounded-full bg-linear-to-br from-purple-600 to-amber-500 flex items-center justify-center mx-auto mb-6 shadow-2xl">
              <CheckCircle2 className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
              Application Submitted! 🎉
            </h2>
            <p className="text-slate-300 mb-6">
              Your application has been received. Our team will review it and
              contact you within 24-48 hours.
            </p>
            <div className="p-4 rounded-xl bg-purple-600/10 border border-purple-800/30 text-slate-300 text-sm mb-6">
              <p className="font-black text-amber-500">Next Steps:</p>
              <ul className="text-left mt-2 space-y-1">
                <li>• Review of your application by our admissions team</li>
                <li>• Contact within 24-48 hours</li>
                <li>• Assessment session scheduling</li>
              </ul>
            </div>
            <Link href="/onsite">
              <Button className="rounded-full px-8 py-3 font-black bg-linear-to-r from-purple-600 to-amber-500 text-white shadow-lg shadow-purple-500/20 hover:shadow-xl transition-all">
                Return to Home
              </Button>
            </Link>
          </div>
        </div>
      </main>
    );
  }

  // ============================================================
  // RENDER
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
    <main className="relative bg-slate-950 overflow-hidden min-h-screen pt-24 md:pt-28">
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.02] bg-[url('/islamic-pattern.svg')] bg-center bg-repeat"
          style={{ backgroundSize: "300px" }}
        />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[150px]" />
      </div>

      <div className="container mx-auto px-4 xs:px-5 sm:px-6 relative z-10">
        {/* Breadcrumb */}
        <nav className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 flex items-center gap-2 mb-4 flex-wrap">
          <Link
            href="/onsite"
            className="hover:text-amber-500 transition-colors"
          >
            Home
          </Link>
          <span className="opacity-30">/</span>
          <span className="text-amber-500">Admissions</span>
        </nav>

        {/* Hero */}
        <section className="py-4 md:py-6">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 text-amber-500 font-black text-xs uppercase tracking-wider mb-3">
                <GraduationCap className="w-4 h-4" />
                Application Form • 2026/2027 Session
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter font-heading leading-[1.1] text-white">
                Boarding{" "}
                <span className="bg-linear-to-r from-purple-400 to-amber-400 bg-clip-text text-transparent">
                  Admission
                </span>
              </h1>
              <p className="text-sm md:text-base text-slate-300 max-w-2xl mx-auto mt-3">
                Application for admission into the Daar-ul-Maysaroh Boarding
                Programme.
              </p>
            </div>
          </Reveal>
        </section>

        {/* Error Message */}
        {submitError && (
          <div className="max-w-4xl mx-auto mb-4 p-4 rounded-xl bg-red-600/20 border border-red-500/30 text-red-300 text-sm">
            {submitError}
          </div>
        )}

        {/* Progress Indicator */}
        <ProgressIndicator
          sections={SECTIONS}
          currentSection={currentSection}
          setCurrentSection={setCurrentSection}
          isMobile={isMobile}
        />

        {/* Form */}
        <form onSubmit={handleSubmit} className="py-4 md:py-6">
          <div className="max-w-4xl mx-auto">
            <div className="p-4 md:p-8 rounded-3xl bg-slate-900/30 hover:bg-slate-900/50 transition-all">
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
                    <div className="w-10 h-10 rounded-xl bg-linear-to-r from-purple-600 to-amber-500 flex items-center justify-center shrink-0">
                      <currentSectionData.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-amber-500 uppercase tracking-wider">
                        Section {currentSection + 1} of {SECTIONS.length}
                      </p>
                      <h2 className="text-lg md:text-xl font-black text-white">
                        {currentSectionData.title}
                      </h2>
                    </div>
                  </div>

                  {/* Section Content */}
                  {renderSection()}

                  {/* Navigation Buttons */}
                  <NavigationButtons
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
          <div className="inline-flex flex-wrap items-center justify-center gap-4 px-6 py-3 rounded-2xl bg-slate-900/30">
            <span className="flex items-center gap-2 text-xs text-slate-400">
              <Shield className="w-4 h-4 text-purple-400" />
              Ijazah Certified
            </span>
            <span className="flex items-center gap-2 text-xs text-slate-400">
              <Crown className="w-4 h-4 text-amber-400" />
              Authentic Sanad
            </span>
            <span className="flex items-center gap-2 text-xs text-slate-400">
              <FileCheck className="w-4 h-4 text-purple-400" />
              Secure Application
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}
