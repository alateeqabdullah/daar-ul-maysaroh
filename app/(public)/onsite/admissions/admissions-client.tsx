// app/(marketing)/onsite/admissions/admissions-client.tsx
"use client";

import { Reveal } from "@/components/shared/section-animation";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  Calendar,
  MapPin,
  Mail,
  Phone,
  Shield,
  Rocket,
  BookOpen,
  Heart,
  Star,
  Crown,
  Target,
  Compass,
  Home,
  Sun,
  Moon,
  User,
  Mail as MailIcon,
  MessageCircle,
  Send,
  GraduationCap,
  Sparkles,
  Users,
  FileText,
  Upload,
  Award,
  Brain,
  HeartPulse,
  UserCheck,
  FileCheck,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";

type FormData = {
  // Section 1: Programme Selection
  programmeType: string;
  programmeOfStudy: string[];
  enrolmentPeriod: string;
  resumptionDate: string;
  weekendDays: string[];

  // Section 2: Student Information
  studentFullName: string;
  preferredName: string;
  gender: string;
  dateOfBirth: string;
  age: string;
  nationality: string;
  countryOfResidence: string;
  stateOfOrigin: string;
  residentialAddress: string;
  livedAwayFromHome: string;
  livedAwayFromHomeDetails: string;
  boardedBefore: string;
  previousMadrasah: string;
  previousMadrasahLocation: string;
  previousMadrasahDuration: string;
  previousMadrasahReason: string;

  // Section 3: Parent/Guardian Information
  fatherName: string;
  motherName: string;
  guardianName: string;
  guardianRelationship: string;
  guardianPhone: string;
  guardianWhatsApp: string;
  guardianEmail: string;
  guardianCountry: string;
  guardianAddress: string;
  preferredCommunication: string;
  emergencyContactName: string;
  emergencyContactRelationship: string;
  emergencyContactPhone: string;
  emergencyContactWhatsApp: string;
  hasEmergencyContact: string;

  // Section 4: Qur'an Background
  startedQuran: string;
  quranReadingLevel: string;
  studiedNoorAlBayan: string;
  noorAlBayanMethod: string;
  startedMemorization: string;
  memorizationAmount: string;
  currentMemorizing: string;
  memorizationFrequency: string;
  memorizationAmountDescription: string;
  memorizationStrength: string;
  murajaahFrequency: string;
  hasMurajaahRoutine: string;
  murajaahRoutineDescription: string;
  studiedTajweed: string;
  tajweedLevel: string;
  studiedQiraat: string;
  qiraatDetails: string;
  currentTeacher: string;
  teacherName: string;
  parentQuranGoals: string[];
  quranJourneyNotes: string;

  // Section 5: Islamic Education
  studiedIslamicStudies: string;
  islamicStudiesAreas: string[];
  islamicKnowledgeLevel: string;
  studiedArabic: string;
  arabicLevel: string;
  islamicEducationGoals: string;

  // Section 6: Tahfeedh / Learning Profile
  motivation: string;
  desiredAchievement: string;
  enjoysMemorization: string;
  responseToCorrection: string;
  concentrationDifficulty: string;
  learningDifficulties: string;
  learningDifficultiesDetails: string;
  greatestStrength: string;
  needsImprovement: string;

  // Section 7: Boarding & Tarbiyah
  whyBoarding: string;
  livedAwayFromParents: string;
  awayFromHomeResponse: string;
  routineDifficulty: string;
  wakesForSalah: string;
  generalDiscipline: string;
  behavioralConcerns: string;
  personalityNotes: string;
  tarbiyahGoals: string;

  // Section 8: Health & Welfare
  medicalCondition: string;
  medicalConditionDetails: string;
  allergies: string;
  allergiesDetails: string;
  medication: string;
  medicationDetails: string;
  dietaryRestrictions: string;
  dietaryRestrictionsDetails: string;
  seriousMedicalHistory: string;
  specialNeeds: string;
  specialNeedsDetails: string;
  healthNotes: string;

  // Section 9: Communication & Parent Involvement
  updatePreference: string;
  updateFrequency: string;
  comfortableContact: string;
  communicationNotes: string;

  // Section 10: Visitation & Authorised Persons
  authorisedVisitors: string;
  authorisedCollectors: string;
  restrictedPersons: string;
  restrictedPersonsDetails: string;

  // Section 11: Declaration
  parentFullName: string;
  declarationDate: string;
  agreeDeclaration: boolean;
};

const SECTIONS = [
  { id: "programme", title: "Programme Selection", icon: GraduationCap },
  { id: "student", title: "Student Information", icon: User },
  { id: "parent", title: "Parent/Guardian", icon: Users },
  { id: "quran", title: "Qur'an Background", icon: BookOpen },
  { id: "islamic", title: "Islamic Education", icon: Award },
  { id: "learning", title: "Learning Profile", icon: Brain },
  { id: "tarbiyah", title: "Boarding & Tarbiyah", icon: Heart },
  { id: "health", title: "Health & Welfare", icon: HeartPulse },
  { id: "communication", title: "Communication", icon: MessageCircle },
  { id: "visitation", title: "Visitation", icon: UserCheck },
  { id: "declaration", title: "Declaration", icon: FileCheck },
];

const getColorStyles = (color: string) => {
  const map = {
    purple: {
      text: "text-purple-400",
      border: "border-purple-800/30",
      bg: "bg-purple-600/20",
      gradient: "from-purple-500 to-purple-600",
      glow: "shadow-purple-500/30",
    },
    amber: {
      text: "text-amber-400",
      border: "border-amber-800/30",
      bg: "bg-amber-500/20",
      gradient: "from-amber-500 to-amber-600",
      glow: "shadow-amber-500/30",
    },
  } as const;
  return map[color as keyof typeof map] ?? map.purple;
};

export default function AdmissionsClient() {
  const [currentSection, setCurrentSection] = useState(0);
  const [formData, setFormData] = useState<FormData>({
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
    emergencyContactName: "",
    emergencyContactRelationship: "",
    emergencyContactPhone: "",
    emergencyContactWhatsApp: "",
    hasEmergencyContact: "",
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
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleArrayChange = (name: string, value: string) => {
    const current = formData[name as keyof FormData] as string[];
    if (current.includes(value)) {
      setFormData({ ...formData, [name]: current.filter((item) => item !== value) });
    } else {
      setFormData({ ...formData, [name]: [...current, value] });
    }
  };

  const nextSection = () => {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  const colors = getColorStyles("purple");

  return (
        <main className="relative bg-slate-950 overflow-hidden min-h-screen pt-24 md:pt-28">
          {/* Background */}
          <div className="fixed inset-0 pointer-events-none">
            <div className="absolute inset-0 opacity-[0.02] bg-[url('/islamic-pattern.svg')] bg-center bg-repeat" style={{ backgroundSize: "300px" }} />
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[150px]" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[150px]" />
          </div>
    
          <div className="container mx-auto px-4 xs:px-5 sm:px-6 relative z-10">
            {/* Breadcrumb */}
            <nav className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 flex items-center gap-2 mb-6 flex-wrap">
              <Link href="/onsite" className="hover:text-amber-500 transition-colors">Home</Link>
              <span className="opacity-30">/</span>
              <span className="text-amber-500">Admissions</span>
            </nav>
    
            {/* ===== HERO ===== */}
            <section className="py-4 md:py-8">
              <Reveal>
                <div className="text-center max-w-3xl mx-auto">
                  <div className="inline-flex items-center gap-2 text-amber-500 font-black text-xs uppercase tracking-wider mb-3">
                    <GraduationCap className="w-4 h-4" />
                    Application Form • 2026/2027 Session
                  </div>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter font-heading leading-[1.1] text-white">
                    Boarding{" "}
                    <span className="bg-gradient-to-r from-purple-400 to-amber-400 bg-clip-text text-transparent">
                      Admission
                    </span>
                  </h1>
                  <p className="text-base text-slate-300 max-w-2xl mx-auto mt-3">
                    Application for admission into the Daar-ul-Maysaroh Boarding Programme.
                  </p>
                </div>
              </Reveal>
            </section>
    
            {/* ===== PROGRESS ===== */}
            <div className="py-4">
              <div className="max-w-4xl mx-auto">
                <div className="flex items-center justify-between gap-1 mb-2 overflow-x-auto pb-2">
                  {SECTIONS.map((section, idx) => {
                    const Icon = section.icon;
                    const isActive = idx === currentSection;
                    const isCompleted = idx < currentSection;
                    return (
                      <button
                        key={section.id}
                        onClick={() => setCurrentSection(idx)}
                        className="flex flex-col items-center min-w-[50px] group"
                      >
                        <div
                          className={cn(
                            "w-10 h-10 rounded-full flex items-center justify-center transition-all",
                            isActive
                              ? "bg-gradient-to-r from-purple-600 to-amber-500 text-white shadow-lg"
                              : isCompleted
                              ? "bg-purple-600/40 text-purple-300"
                              : "bg-slate-800/50 text-slate-500"
                          )}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className={cn(
                          "text-[6px] font-black uppercase mt-1 whitespace-nowrap",
                          isActive ? "text-amber-400" : "text-slate-500"
                        )}>
                          {section.title.split(" ")[0]}
                        </span>
                      </button>
                    );
                  })}
                </div>
                <div className="w-full h-1 bg-slate-800/50 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-purple-600 to-amber-500 rounded-full"
                    initial={{ width: "0%" }}
                    animate={{ width: `${((currentSection + 1) / SECTIONS.length) * 100}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>
            </div>
    
            {/* ===== FORM ===== */}
            <form onSubmit={handleSubmit} className="py-4 md:py-8">
              <div className="max-w-4xl mx-auto">
                <div className="p-6 md:p-8 rounded-3xl bg-slate-900/30 hover:bg-slate-900/50 transition-all">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentSection}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* Section Header - FIXED */}
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-purple-600 to-amber-500 flex items-center justify-center">
                          {(() => {
                            const SectionIcon = SECTIONS[currentSection]?.icon;
                            return SectionIcon ? <SectionIcon className="w-5 h-5 text-white" /> : null;
                          })()}
                        </div>
                        <div>
                          <p className="text-[10px] font-black text-amber-500 uppercase tracking-wider">
                            Section {currentSection + 1} of {SECTIONS.length}
                          </p>
                          <h2 className="text-xl font-black text-white">{SECTIONS[currentSection]?.title || ""}</h2>
                        </div>
                      </div>
    
                      {/* ===== SECTION CONTENT ===== */}
                      {currentSection === 0 && <ProgrammeSection formData={formData} handleChange={handleChange} handleArrayChange={handleArrayChange} />}
                      {currentSection === 1 && <StudentSection formData={formData} handleChange={handleChange} />}
                      {currentSection === 2 && <ParentSection formData={formData} handleChange={handleChange} />}
                      {currentSection === 3 && <QuranSection formData={formData} handleChange={handleChange} handleArrayChange={handleArrayChange} />}
                      {currentSection === 4 && <IslamicSection formData={formData} handleChange={handleChange} handleArrayChange={handleArrayChange} />}
                      {currentSection === 5 && <LearningSection formData={formData} handleChange={handleChange} />}
                      {currentSection === 6 && <TarbiyahSection formData={formData} handleChange={handleChange} />}
                      {currentSection === 7 && <HealthSection formData={formData} handleChange={handleChange} />}
                      {currentSection === 8 && <CommunicationSection formData={formData} handleChange={handleChange} />}
                      {currentSection === 9 && <VisitationSection formData={formData} handleChange={handleChange} />}
                      {currentSection === 10 && <DeclarationSection formData={formData} handleChange={handleChange} />}
    
                      {/* Navigation Buttons */}
                      <div className="flex justify-between gap-4 mt-8 pt-6 border-t border-slate-800/50">
                        <Button
                          type="button"
                          onClick={prevSection}
                          disabled={currentSection === 0}
                          className="rounded-xl py-2.5 font-black text-xs bg-slate-800 hover:bg-slate-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <ChevronLeft className="w-4 h-4 mr-1" />
                          Previous
                        </Button>
    
                        {currentSection === SECTIONS.length - 1 ? (
                          <Button
                            type="submit"
                            disabled={!formData.agreeDeclaration}
                            className="rounded-xl py-2.5 font-black text-xs bg-gradient-to-r from-purple-600 to-amber-500 hover:from-purple-700 hover:to-amber-600 text-white shadow-lg shadow-purple-500/20 transition-all group disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            Submit Application
                            <Send className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                          </Button>
                        ) : (
                          <Button
                            type="button"
                            onClick={nextSection}
                            className="rounded-xl py-2.5 font-black text-xs bg-gradient-to-r from-purple-600 to-amber-500 hover:from-purple-700 hover:to-amber-600 text-white shadow-lg shadow-purple-500/20 transition-all group"
                          >
                            Next
                            <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                          </Button>
                        )}
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </form>
    
            {/* ===== TRUST BADGE ===== */}
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
    


// ============================================================
// SECTION COMPONENTS
// ============================================================

// Section 1: Programme Selection
function ProgrammeSection({ formData, handleChange, handleArrayChange }: any) {
  return (
    <div className="space-y-5">
      <div className="space-y-1.5">
        <label className="text-xs font-black uppercase tracking-wider text-slate-400">
          1. Which programme are you applying for? <span className="text-amber-500">*</span>
        </label>
        <div className="grid sm:grid-cols-2 gap-3">
          {["Full-Time Boarding", "Part-Time / Weekend Boarding"].map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => handleChange({ target: { name: "programmeType", value: option } })}
              className={cn(
                "p-4 rounded-xl border-2 text-left transition-all",
                formData.programmeType === option
                  ? "border-purple-500 bg-purple-600/20 text-white"
                  : "border-slate-800 text-slate-400 hover:border-slate-700"
              )}
            >
              <div className="font-black text-sm">{option}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-black uppercase tracking-wider text-slate-400">
          2. Preferred programme of study <span className="text-amber-500">*</span>
        </label>
        <div className="flex flex-wrap gap-2">
          {["Tahfeedh", "Tahfeedh & Murāja‘ah", "Murāja‘ah", "Tajweed", "Qirā’aat", "Arabic & Islamic Studies", "General Madrasah", "Other"].map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => handleArrayChange("programmeOfStudy", option)}
              className={cn(
                "px-4 py-2 rounded-full text-xs font-black transition-all",
                formData.programmeOfStudy.includes(option)
                  ? "bg-purple-600/40 text-purple-300 border border-purple-500"
                  : "bg-slate-800/50 text-slate-400 border border-slate-800 hover:border-slate-700"
              )}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-xs font-black uppercase tracking-wider text-slate-400">
            3. Intended period of enrolment
          </label>
          <select
            name="enrolmentPeriod"
            value={formData.enrolmentPeriod}
            onChange={handleChange}
            className="w-full h-11 px-4 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all"
          >
            <option value="">Select period</option>
            <option value="Full Academic Session">Full Academic Session</option>
            <option value="One Term">One Term</option>
            <option value="Several Months">Several Months</option>
            <option value="Short-Term">Short-Term</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-black uppercase tracking-wider text-slate-400">
            4. Preferred date of resumption
          </label>
          <input
            type="date"
            name="resumptionDate"
            value={formData.resumptionDate}
            onChange={handleChange}
            className="w-full h-11 px-4 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all"
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-black uppercase tracking-wider text-slate-400">
          5. If Part-Time / Weekend Boarding, which days will the student normally stay?
        </label>
        <div className="flex flex-wrap gap-2">
          {["Friday", "Saturday", "Sunday", "Other"].map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => handleArrayChange("weekendDays", option)}
              className={cn(
                "px-4 py-2 rounded-full text-xs font-black transition-all",
                formData.weekendDays.includes(option)
                  ? "bg-amber-600/40 text-amber-300 border border-amber-500"
                  : "bg-slate-800/50 text-slate-400 border border-slate-800 hover:border-slate-700"
              )}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// Section 2: Student Information
function StudentSection({ formData, handleChange }: any) {
  return (
    <div className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-xs font-black uppercase tracking-wider text-slate-400">
            6. Student's Full Name <span className="text-amber-500">*</span>
          </label>
          <input
            name="studentFullName"
            value={formData.studentFullName}
            onChange={handleChange}
            className="w-full h-11 px-4 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all"
            placeholder="Enter full name"
            required
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-black uppercase tracking-wider text-slate-400">
            7. Preferred Name
          </label>
          <input
            name="preferredName"
            value={formData.preferredName}
            onChange={handleChange}
            className="w-full h-11 px-4 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all"
            placeholder="Preferred name"
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        <div className="space-y-1.5">
          <label className="text-xs font-black uppercase tracking-wider text-slate-400">
            8. Gender <span className="text-amber-500">*</span>
          </label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full h-11 px-4 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all"
            required
          >
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-black uppercase tracking-wider text-slate-400">
            9. Date of Birth
          </label>
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            className="w-full h-11 px-4 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all"
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-black uppercase tracking-wider text-slate-400">
            10. Age
          </label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className="w-full h-11 px-4 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all"
            placeholder="Age"
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-xs font-black uppercase tracking-wider text-slate-400">
            11. Nationality
          </label>
          <input
            name="nationality"
            value={formData.nationality}
            onChange={handleChange}
            className="w-full h-11 px-4 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all"
            placeholder="Nationality"
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-black uppercase tracking-wider text-slate-400">
            12. Country of Current Residence
          </label>
          <input
            name="countryOfResidence"
            value={formData.countryOfResidence}
            onChange={handleChange}
            className="w-full h-11 px-4 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all"
            placeholder="Country of residence"
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-xs font-black uppercase tracking-wider text-slate-400">
            13. State of Origin
          </label>
          <input
            name="stateOfOrigin"
            value={formData.stateOfOrigin}
            onChange={handleChange}
            className="w-full h-11 px-4 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all"
            placeholder="State of origin"
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-black uppercase tracking-wider text-slate-400">
            14. Current Residential Address
          </label>
          <input
            name="residentialAddress"
            value={formData.residentialAddress}
            onChange={handleChange}
            className="w-full h-11 px-4 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all"
            placeholder="Residential address"
          />
        </div>
      </div>

      <div className="space-y-3">
        <div className="space-y-1.5">
          <label className="text-xs font-black uppercase tracking-wider text-slate-400">
            15. Has the student previously lived or studied away from home?
          </label>
          <div className="flex gap-4">
            {["Yes", "No"].map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => handleChange({ target: { name: "livedAwayFromHome", value: option } })}
                className={cn(
                  "px-6 py-2 rounded-full text-xs font-black transition-all",
                  formData.livedAwayFromHome === option
                    ? "bg-purple-600/40 text-purple-300 border border-purple-500"
                    : "bg-slate-800/50 text-slate-400 border border-slate-800 hover:border-slate-700"
                )}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
        {formData.livedAwayFromHome === "Yes" && (
          <div className="space-y-1.5 pl-4 border-l-2 border-purple-500/30">
            <label className="text-xs font-black uppercase tracking-wider text-slate-400">
              Please briefly explain:
            </label>
            <textarea
              name="livedAwayFromHomeDetails"
              value={formData.livedAwayFromHomeDetails}
              onChange={handleChange}
              rows={2}
              className="w-full p-3 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all resize-none"
              placeholder="Brief explanation..."
            />
          </div>
        )}
      </div>

      <div className="space-y-3">
        <div className="space-y-1.5">
          <label className="text-xs font-black uppercase tracking-wider text-slate-400">
            16. Has the student boarded in a Madrasah before?
          </label>
          <div className="flex gap-4">
            {["Yes", "No"].map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => handleChange({ target: { name: "boardedBefore", value: option } })}
                className={cn(
                  "px-6 py-2 rounded-full text-xs font-black transition-all",
                  formData.boardedBefore === option
                    ? "bg-purple-600/40 text-purple-300 border border-purple-500"
                    : "bg-slate-800/50 text-slate-400 border border-slate-800 hover:border-slate-700"
                )}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
        {formData.boardedBefore === "Yes" && (
          <div className="pl-4 border-l-2 border-purple-500/30 space-y-3">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-black uppercase tracking-wider text-slate-400">
                  Name of previous Madrasah
                </label>
                <input
                  name="previousMadrasah"
                  value={formData.previousMadrasah}
                  onChange={handleChange}
                  className="w-full h-11 px-4 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all"
                  placeholder="Madrasah name"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-black uppercase tracking-wider text-slate-400">
                  Location
                </label>
                <input
                  name="previousMadrasahLocation"
                  value={formData.previousMadrasahLocation}
                  onChange={handleChange}
                  className="w-full h-11 px-4 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all"
                  placeholder="Location"
                />
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-black uppercase tracking-wider text-slate-400">
                  Duration of boarding
                </label>
                <input
                  name="previousMadrasahDuration"
                  value={formData.previousMadrasahDuration}
                  onChange={handleChange}
                  className="w-full h-11 px-4 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all"
                  placeholder="e.g., 1 year"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-black uppercase tracking-wider text-slate-400">
                  Reason for leaving
                </label>
                <input
                  name="previousMadrasahReason"
                  value={formData.previousMadrasahReason}
                  onChange={handleChange}
                  className="w-full h-11 px-4 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all"
                  placeholder="Reason"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Section 3: Parent/Guardian Information
function ParentSection({ formData, handleChange }: any) {
  return (
    <div className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-xs font-black uppercase tracking-wider text-slate-400">
            17. Father's Full Name
          </label>
          <input
            name="fatherName"
            value={formData.fatherName}
            onChange={handleChange}
            className="w-full h-11 px-4 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all"
            placeholder="Father's name"
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-black uppercase tracking-wider text-slate-400">
            18. Mother's Full Name
          </label>
          <input
            name="motherName"
            value={formData.motherName}
            onChange={handleChange}
            className="w-full h-11 px-4 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all"
            placeholder="Mother's name"
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-xs font-black uppercase tracking-wider text-slate-400">
            19. Parent/Guardian submitting this application <span className="text-amber-500">*</span>
          </label>
          <input
            name="guardianName"
            value={formData.guardianName}
            onChange={handleChange}
            className="w-full h-11 px-4 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all"
            placeholder="Full name"
            required
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-black uppercase tracking-wider text-slate-400">
            20. Relationship to Student <span className="text-amber-500">*</span>
          </label>
          <input
            name="guardianRelationship"
            value={formData.guardianRelationship}
            onChange={handleChange}
            className="w-full h-11 px-4 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all"
            placeholder="e.g., Father, Mother, Uncle"
            required
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-xs font-black uppercase tracking-wider text-slate-400">
            21. Phone Number <span className="text-amber-500">*</span>
          </label>
          <input
            name="guardianPhone"
            value={formData.guardianPhone}
            onChange={handleChange}
            className="w-full h-11 px-4 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all"
            placeholder="+234 800 000 0000"
            required
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-black uppercase tracking-wider text-slate-400">
            22. WhatsApp Number
          </label>
          <input
            name="guardianWhatsApp"
            value={formData.guardianWhatsApp}
            onChange={handleChange}
            className="w-full h-11 px-4 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all"
            placeholder="+234 800 000 0000"
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-xs font-black uppercase tracking-wider text-slate-400">
            23. Email Address <span className="text-amber-500">*</span>
          </label>
          <input
            type="email"
            name="guardianEmail"
            value={formData.guardianEmail}
            onChange={handleChange}
            className="w-full h-11 px-4 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all"
            placeholder="email@example.com"
            required
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-black uppercase tracking-wider text-slate-400">
            24. Country of Residence
          </label>
          <input
            name="guardianCountry"
            value={formData.guardianCountry}
            onChange={handleChange}
            className="w-full h-11 px-4 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all"
            placeholder="Country"
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-black uppercase tracking-wider text-slate-400">
          25. Residential Address
        </label>
        <input
          name="guardianAddress"
          value={formData.guardianAddress}
          onChange={handleChange}
          className="w-full h-11 px-4 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all"
          placeholder="Residential address"
        />
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-black uppercase tracking-wider text-slate-400">
          26. Preferred method of communication <span className="text-amber-500">*</span>
        </label>
        <div className="flex flex-wrap gap-2">
          {["WhatsApp", "Phone Call", "Email"].map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => handleChange({ target: { name: "preferredCommunication", value: option } })}
              className={cn(
                "px-4 py-2 rounded-full text-xs font-black transition-all",
                formData.preferredCommunication === option
                  ? "bg-amber-600/40 text-amber-300 border border-amber-500"
                  : "bg-slate-800/50 text-slate-400 border border-slate-800 hover:border-slate-700"
              )}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <div className="space-y-1.5">
          <label className="text-xs font-black uppercase tracking-wider text-slate-400">
            27. Is there another person we should contact regarding this student?
          </label>
          <div className="flex gap-4">
            {["Yes", "No"].map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => handleChange({ target: { name: "hasEmergencyContact", value: option } })}
                className={cn(
                  "px-6 py-2 rounded-full text-xs font-black transition-all",
                  formData.hasEmergencyContact === option
                    ? "bg-purple-600/40 text-purple-300 border border-purple-500"
                    : "bg-slate-800/50 text-slate-400 border border-slate-800 hover:border-slate-700"
                )}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
        {formData.hasEmergencyContact === "Yes" && (
          <div className="pl-4 border-l-2 border-purple-500/30 space-y-3">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-black uppercase tracking-wider text-slate-400">
                  Full Name
                </label>
                <input
                  name="emergencyContactName"
                  value={formData.emergencyContactName}
                  onChange={handleChange}
                  className="w-full h-11 px-4 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all"
                  placeholder="Full name"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-black uppercase tracking-wider text-slate-400">
                  Relationship
                </label>
                <input
                  name="emergencyContactRelationship"
                  value={formData.emergencyContactRelationship}
                  onChange={handleChange}
                  className="w-full h-11 px-4 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all"
                  placeholder="Relationship"
                />
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-black uppercase tracking-wider text-slate-400">
                  Phone
                </label>
                <input
                  name="emergencyContactPhone"
                  value={formData.emergencyContactPhone}
                  onChange={handleChange}
                  className="w-full h-11 px-4 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all"
                  placeholder="Phone number"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-black uppercase tracking-wider text-slate-400">
                  WhatsApp
                </label>
                <input
                  name="emergencyContactWhatsApp"
                  value={formData.emergencyContactWhatsApp}
                  onChange={handleChange}
                  className="w-full h-11 px-4 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all"
                  placeholder="WhatsApp number"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Section 4: Qur'an Background
function QuranSection({ formData, handleChange, handleArrayChange }: any) {
  return (
    <div className="space-y-5">
      <p className="text-xs text-amber-500/70 italic">
        This section is particularly important. Please answer as accurately as possible so that we can properly assess and place the student.
      </p>

      <div className="space-y-1.5">
        <label className="text-xs font-black uppercase tracking-wider text-slate-400">
          28. Has the student started reading the Qur'ān? <span className="text-amber-500">*</span>
        </label>
        <div className="flex gap-4">
          {["Yes", "No"].map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => handleChange({ target: { name: "startedQuran", value: option } })}
              className={cn(
                "px-6 py-2 rounded-full text-xs font-black transition-all",
                formData.startedQuran === option
                  ? "bg-purple-600/40 text-purple-300 border border-purple-500"
                  : "bg-slate-800/50 text-slate-400 border border-slate-800 hover:border-slate-700"
              )}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-black uppercase tracking-wider text-slate-400">
          29. How would you describe the student's Qur'ān reading? <span className="text-amber-500">*</span>
        </label>
        <select
          name="quranReadingLevel"
          value={formData.quranReadingLevel}
          onChange={handleChange}
          className="w-full h-11 px-4 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all"
          required
        >
          <option value="">Select level</option>
          <option value="Beginner — still learning Arabic letters">Beginner — still learning Arabic letters</option>
          <option value="Can read with assistance">Can read with assistance</option>
          <option value="Can read independently">Can read independently</option>
          <option value="Fluent">Fluent</option>
          <option value="Very fluent">Very fluent</option>
        </select>
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-black uppercase tracking-wider text-slate-400">
          30. Has the student studied Noor al-Bayān or another Qur'ān reading method?
        </label>
        <div className="flex gap-4">
          {["Yes", "No"].map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => handleChange({ target: { name: "studiedNoorAlBayan", value: option } })}
              className={cn(
                "px-6 py-2 rounded-full text-xs font-black transition-all",
                formData.studiedNoorAlBayan === option
                  ? "bg-purple-600/40 text-purple-300 border border-purple-500"
                  : "bg-slate-800/50 text-slate-400 border border-slate-800 hover:border-slate-700"
              )}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
      {formData.studiedNoorAlBayan === "Yes" && (
        <div className="space-y-1.5 pl-4 border-l-2 border-purple-500/30">
          <label className="text-xs font-black uppercase tracking-wider text-slate-400">
            Which one?
          </label>
          <input
            name="noorAlBayanMethod"
            value={formData.noorAlBayanMethod}
            onChange={handleChange}
            className="w-full h-11 px-4 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all"
            placeholder="Method name"
          />
        </div>
      )}

      <div className="space-y-1.5">
        <label className="text-xs font-black uppercase tracking-wider text-slate-400">
          31. Has the student started Qur'ān memorisation? <span className="text-amber-500">*</span>
        </label>
        <div className="flex gap-4">
          {["Yes", "No"].map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => handleChange({ target: { name: "startedMemorization", value: option } })}
              className={cn(
                "px-6 py-2 rounded-full text-xs font-black transition-all",
                formData.startedMemorization === option
                  ? "bg-purple-600/40 text-purple-300 border border-purple-500"
                  : "bg-slate-800/50 text-slate-400 border border-slate-800 hover:border-slate-700"
              )}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-black uppercase tracking-wider text-slate-400">
          32. Approximately how much Qur'ān has the student memorised?
        </label>
        <select
          name="memorizationAmount"
          value={formData.memorizationAmount}
          onChange={handleChange}
          className="w-full h-11 px-4 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all"
        >
          <option value="">Select amount</option>
          <option value="Less than Juz' 30">Less than Juz' 30</option>
          <option value="Juz' 30">Juz' 30</option>
          <option value="2–5 Juz'">2–5 Juz'</option>
          <option value="6–10 Juz'">6–10 Juz'</option>
          <option value="11–20 Juz'">11–20 Juz'</option>
          <option value="21–29 Juz'">21–29 Juz'</option>
          <option value="Complete Qur'ān">Complete Qur'ān</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-xs font-black uppercase tracking-wider text-slate-400">
            33. Which Juz'/Sūrah is the student currently memorising?
          </label>
          <input
            name="currentMemorizing"
            value={formData.currentMemorizing}
            onChange={handleChange}
            className="w-full h-11 px-4 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all"
            placeholder="e.g., Juz' 29, Surah Al-Baqarah"
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-black uppercase tracking-wider text-slate-400">
            34. How regularly does the student currently memorise Qur'ān?
          </label>
          <select
            name="memorizationFrequency"
            value={formData.memorizationFrequency}
            onChange={handleChange}
            className="w-full h-11 px-4 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all"
          >
            <option value="">Select frequency</option>
            <option value="Daily">Daily</option>
            <option value="Several times a week">Several times a week</option>
            <option value="Occasionally">Occasionally</option>
            <option value="Currently not memorising">Currently not memorising</option>
          </select>
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-black uppercase tracking-wider text-slate-400">
          35. How much new memorisation does the student normally complete?
        </label>
        <input
          name="memorizationAmountDescription"
          value={formData.memorizationAmountDescription}
          onChange={handleChange}
          className="w-full h-11 px-4 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all"
          placeholder="e.g., half a page daily, one page daily, 2 pages weekly"
        />
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-black uppercase tracking-wider text-slate-400">
          36. How strong is the student's existing memorisation?
        </label>
        <select
          name="memorizationStrength"
          value={formData.memorizationStrength}
          onChange={handleChange}
          className="w-full h-11 px-4 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all"
        >
          <option value="">Select strength</option>
          <option value="Needs significant revision">Needs significant revision</option>
          <option value="Fair">Fair</option>
          <option value="Good">Good</option>
          <option value="Very good">Very good</option>
          <option value="Excellent">Excellent</option>
        </select>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-xs font-black uppercase tracking-wider text-slate-400">
            37. How regularly does the student perform Murāja‘ah?
          </label>
          <select
            name="murajaahFrequency"
            value={formData.murajaahFrequency}
            onChange={handleChange}
            className="w-full h-11 px-4 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all"
          >
            <option value="">Select frequency</option>
            <option value="Daily">Daily</option>
            <option value="Several times a week">Several times a week</option>
            <option value="Occasionally">Occasionally</option>
            <option value="Rarely">Rarely</option>
            <option value="Not currently doing Murāja‘ah">Not currently doing Murāja‘ah</option>
          </select>
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-black uppercase tracking-wider text-slate-400">
            38. Does the student have a current Murāja‘ah routine?
          </label>
          <div className="flex gap-4">
            {["Yes", "No"].map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => handleChange({ target: { name: "hasMurajaahRoutine", value: option } })}
                className={cn(
                  "px-6 py-2 rounded-full text-xs font-black transition-all",
                  formData.hasMurajaahRoutine === option
                    ? "bg-purple-600/40 text-purple-300 border border-purple-500"
                    : "bg-slate-800/50 text-slate-400 border border-slate-800 hover:border-slate-700"
                )}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </div>
      {formData.hasMurajaahRoutine === "Yes" && (
        <div className="space-y-1.5 pl-4 border-l-2 border-purple-500/30">
          <label className="text-xs font-black uppercase tracking-wider text-slate-400">
            Please describe it:
          </label>
          <textarea
            name="murajaahRoutineDescription"
            value={formData.murajaahRoutineDescription}
            onChange={handleChange}
            rows={2}
            className="w-full p-3 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all resize-none"
            placeholder="Describe the Murāja‘ah routine..."
          />
        </div>
      )}

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-xs font-black uppercase tracking-wider text-slate-400">
            39. Has the student studied Tajweed?
          </label>
          <div className="flex gap-4">
            {["Yes", "No"].map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => handleChange({ target: { name: "studiedTajweed", value: option } })}
                className={cn(
                  "px-6 py-2 rounded-full text-xs font-black transition-all",
                  formData.studiedTajweed === option
                    ? "bg-purple-600/40 text-purple-300 border border-purple-500"
                    : "bg-slate-800/50 text-slate-400 border border-slate-800 hover:border-slate-700"
                )}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-black uppercase tracking-wider text-slate-400">
            40. How would you describe the student's Tajweed level?
          </label>
          <select
            name="tajweedLevel"
            value={formData.tajweedLevel}
            onChange={handleChange}
            className="w-full h-11 px-4 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all"
          >
            <option value="">Select level</option>
            <option value="Beginner">Beginner</option>
            <option value="Basic">Basic</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
            <option value="Not sure">Not sure</option>
          </select>
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-black uppercase tracking-wider text-slate-400">
          41. Has the student studied Qirā’aat?
        </label>
        <div className="flex gap-4">
          {["Yes", "No"].map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => handleChange({ target: { name: "studiedQiraat", value: option } })}
              className={cn(
                "px-6 py-2 rounded-full text-xs font-black transition-all",
                formData.studiedQiraat === option
                  ? "bg-purple-600/40 text-purple-300 border border-purple-500"
                  : "bg-slate-800/50 text-slate-400 border border-slate-800 hover:border-slate-700"
              )}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
      {formData.studiedQiraat === "Yes" && (
        <div className="space-y-1.5 pl-4 border-l-2 border-purple-500/30">
          <label className="text-xs font-black uppercase tracking-wider text-slate-400">
            Please specify:
          </label>
          <input
            name="qiraatDetails"
            value={formData.qiraatDetails}
            onChange={handleChange}
            className="w-full h-11 px-4 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all"
            placeholder="e.g., Hafs, Warsh, Qalun"
          />
        </div>
      )}

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-xs font-black uppercase tracking-wider text-slate-400">
            42. Who currently teaches the student Qur'ān?
          </label>
          <select
            name="currentTeacher"
            value={formData.currentTeacher}
            onChange={handleChange}
            className="w-full h-11 px-4 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all"
          >
            <option value="">Select</option>
            <option value="Parent">Parent</option>
            <option value="Private Ustadh/Ustadhah">Private Ustadh/Ustadhah</option>
            <option value="Madrasah">Madrasah</option>
            <option value="School">School</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-black uppercase tracking-wider text-slate-400">
            43. Name of current/previous Qur'ān teacher or Madrasah
          </label>
          <input
            name="teacherName"
            value={formData.teacherName}
            onChange={handleChange}
            className="w-full h-11 px-4 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all"
            placeholder="Teacher or Madrasah name"
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-black uppercase tracking-wider text-slate-400">
          44. What are the parent's main Qur'ān goals for the student?
        </label>
        <div className="flex flex-wrap gap-2">
          {[
            "Begin Qur'ān memorisation",
            "Increase memorisation",
            "Strengthen existing memorisation",
            "Improve Murāja‘ah",
            "Improve Tajweed",
            "Improve Qur'ān reading",
            "Study Qirā’aat",
            "Complete memorisation",
            "Maintain memorisation",
            "Other"
          ].map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => handleArrayChange("parentQuranGoals", option)}
              className={cn(
                "px-4 py-2 rounded-full text-xs font-black transition-all",
                formData.parentQuranGoals.includes(option)
                  ? "bg-amber-600/40 text-amber-300 border border-amber-500"
                  : "bg-slate-800/50 text-slate-400 border border-slate-800 hover:border-slate-700"
              )}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-black uppercase tracking-wider text-slate-400">
          45. Please tell us anything else about the student's Qur'ān journey that will help us understand their level.
        </label>
        <textarea
          name="quranJourneyNotes"
          value={formData.quranJourneyNotes}
          onChange={handleChange}
          rows={3}
          className="w-full p-3 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all resize-none"
          placeholder="Any additional information..."
        />
      </div>
    </div>
  );
}

// Section 5: Islamic Education
function IslamicSection({ formData, handleChange, handleArrayChange }: any) {
  return (
    <div className="space-y-5">
      <div className="space-y-1.5">
        <label className="text-xs font-black uppercase tracking-wider text-slate-400">
          46. Has the student studied Islamic Studies?
        </label>
        <div className="flex gap-4">
          {["Yes", "No"].map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => handleChange({ target: { name: "studiedIslamicStudies", value: option } })}
              className={cn(
                "px-6 py-2 rounded-full text-xs font-black transition-all",
                formData.studiedIslamicStudies === option
                  ? "bg-purple-600/40 text-purple-300 border border-purple-500"
                  : "bg-slate-800/50 text-slate-400 border border-slate-800 hover:border-slate-700"
              )}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-black uppercase tracking-wider text-slate-400">
          47. Which areas has the student studied?
        </label>
        <div className="flex flex-wrap gap-2">
          {["Ṣalāh", "Fiqh", "Ḥadīth", "‘Aqīdah", "Sīrah", "Adhkār", "Islamic manners/adab", "Other"].map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => handleArrayChange("islamicStudiesAreas", option)}
              className={cn(
                "px-4 py-2 rounded-full text-xs font-black transition-all",
                formData.islamicStudiesAreas.includes(option)
                  ? "bg-purple-600/40 text-purple-300 border border-purple-500"
                  : "bg-slate-800/50 text-slate-400 border border-slate-800 hover:border-slate-700"
              )}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-xs font-black uppercase tracking-wider text-slate-400">
            48. How would you describe the student's general Islamic knowledge?
          </label>
          <select
            name="islamicKnowledgeLevel"
            value={formData.islamicKnowledgeLevel}
            onChange={handleChange}
            className="w-full h-11 px-4 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all"
          >
            <option value="">Select level</option>
            <option value="Beginner">Beginner</option>
            <option value="Basic">Basic</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
            <option value="Not sure">Not sure</option>
          </select>
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-black uppercase tracking-wider text-slate-400">
            49. Has the student studied Arabic?
          </label>
          <div className="flex gap-4">
            {["Yes", "No"].map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => handleChange({ target: { name: "studiedArabic", value: option } })}
                className={cn(
                  "px-6 py-2 rounded-full text-xs font-black transition-all",
                  formData.studiedArabic === option
                    ? "bg-purple-600/40 text-purple-300 border border-purple-500"
                    : "bg-slate-800/50 text-slate-400 border border-slate-800 hover:border-slate-700"
                )}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </div>
      {formData.studiedArabic === "Yes" && (
        <div className="space-y-1.5 pl-4 border-l-2 border-purple-500/30">
          <label className="text-xs font-black uppercase tracking-wider text-slate-400">
            Level:
          </label>
          <input
            name="arabicLevel"
            value={formData.arabicLevel}
            onChange={handleChange}
            className="w-full h-11 px-4 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all"
            placeholder="e.g., Beginner, Intermediate"
          />
        </div>
      )}

      <div className="space-y-1.5">
        <label className="text-xs font-black uppercase tracking-wider text-slate-400">
          50. What areas of Islamic education would you particularly like the student to improve?
        </label>
        <textarea
          name="islamicEducationGoals"
          value={formData.islamicEducationGoals}
          onChange={handleChange}
          rows={2}
          className="w-full p-3 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all resize-none"
          placeholder="e.g., Salah practice, Adab, Aqidah..."
        />
      </div>
    </div>
  );
}

// Section 6: Learning Profile
function LearningSection({ formData, handleChange }: any) {
  return (
    <div className="space-y-5">
      <div className="space-y-1.5">
        <label className="text-xs font-black uppercase tracking-wider text-slate-400">
          51. What motivates you to enrol your ward at Daar-ul-Maysaroh?
        </label>
        <textarea
          name="motivation"
          value={formData.motivation}
          onChange={handleChange}
          rows={2}
          className="w-full p-3 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all resize-none"
          placeholder="Why are you choosing Daar-ul-Maysaroh?"
        />
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-black uppercase tracking-wider text-slate-400">
          52. What would you like the student to achieve during their time with us?
        </label>
        <textarea
          name="desiredAchievement"
          value={formData.desiredAchievement}
          onChange={handleChange}
          rows={2}
          className="w-full p-3 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all resize-none"
          placeholder="What are your hopes for your child?"
        />
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-black uppercase tracking-wider text-slate-400">
          53. Does the student enjoy Qur'ān memorisation?
        </label>
        <div className="flex flex-wrap gap-2">
          {["Very much", "Somewhat", "Not really", "Not sure"].map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => handleChange({ target: { name: "enjoysMemorization", value: option } })}
              className={cn(
                "px-6 py-2 rounded-full text-xs font-black transition-all",
                formData.enjoysMemorization === option
                  ? "bg-amber-600/40 text-amber-300 border border-amber-500"
                  : "bg-slate-800/50 text-slate-400 border border-slate-800 hover:border-slate-700"
              )}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-black uppercase tracking-wider text-slate-400">
          54. How does the student usually respond when corrected by a teacher?
        </label>
        <input
          name="responseToCorrection"
          value={formData.responseToCorrection}
          onChange={handleChange}
          className="w-full h-11 px-4 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all"
          placeholder="e.g., Receptive, shy, frustrated..."
        />
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-black uppercase tracking-wider text-slate-400">
          55. Does the student have difficulty maintaining concentration during Qur'ān lessons?
        </label>
        <div className="flex flex-wrap gap-2">
          {["Yes", "No", "Sometimes"].map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => handleChange({ target: { name: "concentrationDifficulty", value: option } })}
              className={cn(
                "px-6 py-2 rounded-full text-xs font-black transition-all",
                formData.concentrationDifficulty === option
                  ? "bg-purple-600/40 text-purple-300 border border-purple-500"
                  : "bg-slate-800/50 text-slate-400 border border-slate-800 hover:border-slate-700"
              )}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-black uppercase tracking-wider text-slate-400">
          56. Are there any learning difficulties or circumstances that may affect the student's Tahfeedh?
        </label>
        <div className="flex gap-4">
          {["Yes", "No"].map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => handleChange({ target: { name: "learningDifficulties", value: option } })}
              className={cn(
                "px-6 py-2 rounded-full text-xs font-black transition-all",
                formData.learningDifficulties === option
                  ? "bg-purple-600/40 text-purple-300 border border-purple-500"
                  : "bg-slate-800/50 text-slate-400 border border-slate-800 hover:border-slate-700"
              )}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
      {formData.learningDifficulties === "Yes" && (
        <div className="space-y-1.5 pl-4 border-l-2 border-purple-500/30">
          <label className="text-xs font-black uppercase tracking-wider text-slate-400">
            Please explain:
          </label>
          <textarea
            name="learningDifficultiesDetails"
            value={formData.learningDifficultiesDetails}
            onChange={handleChange}
            rows={2}
            className="w-full p-3 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all resize-none"
            placeholder="Any learning difficulties..."
          />
        </div>
      )}

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-xs font-black uppercase tracking-wider text-slate-400">
            57. What do you consider the student's greatest strength in Qur'ān learning?
          </label>
          <input
            name="greatestStrength"
            value={formData.greatestStrength}
            onChange={handleChange}
            className="w-full h-11 px-4 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all"
            placeholder="e.g., Good memory, loves reciting..."
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-black uppercase tracking-wider text-slate-400">
            58. What area do you believe the student needs the most improvement?
          </label>
          <input
            name="needsImprovement"
            value={formData.needsImprovement}
            onChange={handleChange}
            className="w-full h-11 px-4 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all"
            placeholder="e.g., Tajweed, consistency, focus..."
          />
        </div>
      </div>
    </div>
  );
}

// Section 7: Boarding & Tarbiyah
function TarbiyahSection({ formData, handleChange }: any) {
  return (
    <div className="space-y-5">
      <div className="space-y-1.5">
        <label className="text-xs font-black uppercase tracking-wider text-slate-400">
          59. Why are you choosing a boarding Madrasah for the student?
        </label>
        <textarea
          name="whyBoarding"
          value={formData.whyBoarding}
          onChange={handleChange}
          rows={2}
          className="w-full p-3 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all resize-none"
          placeholder="Why boarding?"
        />
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-black uppercase tracking-wider text-slate-400">
          60. Has the student lived away from parents before?
        </label>
        <div className="flex gap-4">
          {["Yes", "No"].map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => handleChange({ target: { name: "livedAwayFromParents", value: option } })}
              className={cn(
                "px-6 py-2 rounded-full text-xs font-black transition-all",
                formData.livedAwayFromParents === option
                  ? "bg-purple-600/40 text-purple-300 border border-purple-500"
                  : "bg-slate-800/50 text-slate-400 border border-slate-800 hover:border-slate-700"
              )}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-black uppercase tracking-wider text-slate-400">
          61. How does the student normally respond to being away from home?
        </label>
        <input
          name="awayFromHomeResponse"
          value={formData.awayFromHomeResponse}
          onChange={handleChange}
          className="w-full h-11 px-4 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all"
          placeholder="e.g., Adapts well, homesick at first..."
        />
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-black uppercase tracking-wider text-slate-400">
          62. Does the student have any difficulty following a structured routine?
        </label>
        <div className="flex flex-wrap gap-2">
          {["Yes", "No", "Sometimes"].map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => handleChange({ target: { name: "routineDifficulty", value: option } })}
              className={cn(
                "px-6 py-2 rounded-full text-xs font-black transition-all",
                formData.routineDifficulty === option
                  ? "bg-purple-600/40 text-purple-300 border border-purple-500"
                  : "bg-slate-800/50 text-slate-400 border border-slate-800 hover:border-slate-700"
              )}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-black uppercase tracking-wider text-slate-400">
          63. Does the student normally wake up for Ṣalāh without difficulty?
        </label>
        <input
          name="wakesForSalah"
          value={formData.wakesForSalah}
          onChange={handleChange}
          className="w-full h-11 px-4 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all"
          placeholder="e.g., Yes, always; Sometimes needs encouragement"
        />
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-black uppercase tracking-wider text-slate-400">
          64. How would you describe the student's general discipline?
        </label>
        <input
          name="generalDiscipline"
          value={formData.generalDiscipline}
          onChange={handleChange}
          className="w-full h-11 px-4 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all"
          placeholder="e.g., Very disciplined, Needs reminders..."
        />
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-black uppercase tracking-wider text-slate-400">
          65. Are there any behavioural concerns we should know about?
        </label>
        <input
          name="behavioralConcerns"
          value={formData.behavioralConcerns}
          onChange={handleChange}
          className="w-full h-11 px-4 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all"
          placeholder="Any concerns..."
        />
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-black uppercase tracking-wider text-slate-400">
          66. Is there anything about the student's personality, habits or character that would help our Ustadhs care for them better?
        </label>
        <textarea
          name="personalityNotes"
          value={formData.personalityNotes}
          onChange={handleChange}
          rows={2}
          className="w-full p-3 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all resize-none"
          placeholder="Any notes about personality..."
        />
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-black uppercase tracking-wider text-slate-400">
          67. Are there any specific Tarbiyah goals you would like us to work on with the student?
        </label>
        <textarea
          name="tarbiyahGoals"
          value={formData.tarbiyahGoals}
          onChange={handleChange}
          rows={2}
          className="w-full p-3 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all resize-none"
          placeholder="Any character goals..."
        />
      </div>
    </div>
  );
}

// Section 8: Health & Welfare
function HealthSection({ formData, handleChange }: any) {
  return (
    <div className="space-y-5">
      <div className="space-y-1.5">
        <label className="text-xs font-black uppercase tracking-wider text-slate-400">
          68. Does the student have any medical condition?
        </label>
        <div className="flex gap-4">
          {["Yes", "No"].map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => handleChange({ target: { name: "medicalCondition", value: option } })}
              className={cn(
                "px-6 py-2 rounded-full text-xs font-black transition-all",
                formData.medicalCondition === option
                  ? "bg-red-600/40 text-red-300 border border-red-500"
                  : "bg-slate-800/50 text-slate-400 border border-slate-800 hover:border-slate-700"
              )}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
      {formData.medicalCondition === "Yes" && (
        <div className="space-y-1.5 pl-4 border-l-2 border-red-500/30">
          <label className="text-xs font-black uppercase tracking-wider text-slate-400">
            Please explain:
          </label>
          <input
            name="medicalConditionDetails"
            value={formData.medicalConditionDetails}
            onChange={handleChange}
            className="w-full h-11 px-4 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all"
            placeholder="Medical condition details..."
          />
        </div>
      )}

      <div className="space-y-1.5">
        <label className="text-xs font-black uppercase tracking-wider text-slate-400">
          69. Does the student have any allergies?
        </label>
        <div className="flex gap-4">
          {["Yes", "No"].map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => handleChange({ target: { name: "allergies", value: option } })}
              className={cn(
                "px-6 py-2 rounded-full text-xs font-black transition-all",
                formData.allergies === option
                  ? "bg-red-600/40 text-red-300 border border-red-500"
                  : "bg-slate-800/50 text-slate-400 border border-slate-800 hover:border-slate-700"
              )}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
      {formData.allergies === "Yes" && (
        <div className="space-y-1.5 pl-4 border-l-2 border-red-500/30">
          <label className="text-xs font-black uppercase tracking-wider text-slate-400">
            Please explain:
          </label>
          <input
            name="allergiesDetails"
            value={formData.allergiesDetails}
            onChange={handleChange}
            className="w-full h-11 px-4 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all"
            placeholder="Allergy details..."
          />
        </div>
      )}

      <div className="space-y-1.5">
        <label className="text-xs font-black uppercase tracking-wider text-slate-400">
          70. Is the student currently taking any medication?
        </label>
        <div className="flex gap-4">
          {["Yes", "No"].map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => handleChange({ target: { name: "medication", value: option } })}
              className={cn(
                "px-6 py-2 rounded-full text-xs font-black transition-all",
                formData.medication === option
                  ? "bg-red-600/40 text-red-300 border border-red-500"
                  : "bg-slate-800/50 text-slate-400 border border-slate-800 hover:border-slate-700"
              )}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
      {formData.medication === "Yes" && (
        <div className="space-y-1.5 pl-4 border-l-2 border-red-500/30">
          <label className="text-xs font-black uppercase tracking-wider text-slate-400">
            Please provide details:
          </label>
          <input
            name="medicationDetails"
            value={formData.medicationDetails}
            onChange={handleChange}
            className="w-full h-11 px-4 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all"
            placeholder="Medication details..."
          />
        </div>
      )}

      <div className="space-y-1.5">
        <label className="text-xs font-black uppercase tracking-wider text-slate-400">
          71. Does the student have any dietary restrictions?
        </label>
        <div className="flex gap-4">
          {["Yes", "No"].map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => handleChange({ target: { name: "dietaryRestrictions", value: option } })}
              className={cn(
                "px-6 py-2 rounded-full text-xs font-black transition-all",
                formData.dietaryRestrictions === option
                  ? "bg-amber-600/40 text-amber-300 border border-amber-500"
                  : "bg-slate-800/50 text-slate-400 border border-slate-800 hover:border-slate-700"
              )}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
      {formData.dietaryRestrictions === "Yes" && (
        <div className="space-y-1.5 pl-4 border-l-2 border-amber-500/30">
          <label className="text-xs font-black uppercase tracking-wider text-slate-400">
            Please explain:
          </label>
          <input
            name="dietaryRestrictionsDetails"
            value={formData.dietaryRestrictionsDetails}
            onChange={handleChange}
            className="w-full h-11 px-4 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all"
            placeholder="Dietary restriction details..."
          />
        </div>
      )}

      <div className="space-y-1.5">
        <label className="text-xs font-black uppercase tracking-wider text-slate-400">
          72. Has the student ever experienced any serious medical condition or emergency that the Madrasah should know about?
        </label>
        <input
          name="seriousMedicalHistory"
          value={formData.seriousMedicalHistory}
          onChange={handleChange}
          className="w-full h-11 px-4 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all"
          placeholder="Any serious medical history..."
        />
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-black uppercase tracking-wider text-slate-400">
          73. Does the student have any special physical, emotional, behavioural or learning needs?
        </label>
        <div className="flex gap-4">
          {["Yes", "No"].map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => handleChange({ target: { name: "specialNeeds", value: option } })}
              className={cn(
                "px-6 py-2 rounded-full text-xs font-black transition-all",
                formData.specialNeeds === option
                  ? "bg-purple-600/40 text-purple-300 border border-purple-500"
                  : "bg-slate-800/50 text-slate-400 border border-slate-800 hover:border-slate-700"
              )}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
      {formData.specialNeeds === "Yes" && (
        <div className="space-y-1.5 pl-4 border-l-2 border-purple-500/30">
          <label className="text-xs font-black uppercase tracking-wider text-slate-400">
            Please explain:
          </label>
          <input
            name="specialNeedsDetails"
            value={formData.specialNeedsDetails}
            onChange={handleChange}
            className="w-full h-11 px-4 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all"
            placeholder="Special needs details..."
          />
        </div>
      )}

      <div className="space-y-1.5">
        <label className="text-xs font-black uppercase tracking-wider text-slate-400">
          74. Is there any other health or welfare information we should know?
        </label>
        <textarea
          name="healthNotes"
          value={formData.healthNotes}
          onChange={handleChange}
          rows={2}
          className="w-full p-3 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all resize-none"
          placeholder="Any additional health information..."
        />
      </div>
    </div>
  );
}

// Section 9: Communication
function CommunicationSection({ formData, handleChange }: any) {
  return (
    <div className="space-y-5">
      <div className="space-y-1.5">
        <label className="text-xs font-black uppercase tracking-wider text-slate-400">
          75. How would you prefer to receive updates about your ward?
        </label>
        <div className="flex flex-wrap gap-2">
          {["WhatsApp", "Phone call", "Email"].map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => handleChange({ target: { name: "updatePreference", value: option } })}
              className={cn(
                "px-6 py-2 rounded-full text-xs font-black transition-all",
                formData.updatePreference === option
                  ? "bg-amber-600/40 text-amber-300 border border-amber-500"
                  : "bg-slate-800/50 text-slate-400 border border-slate-800 hover:border-slate-700"
              )}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-black uppercase tracking-wider text-slate-400">
          76. How frequently would you like general progress updates?
        </label>
        <div className="flex flex-wrap gap-2">
          {["Weekly", "Bi-weekly", "Monthly", "As necessary"].map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => handleChange({ target: { name: "updateFrequency", value: option } })}
              className={cn(
                "px-6 py-2 rounded-full text-xs font-black transition-all",
                formData.updateFrequency === option
                  ? "bg-purple-600/40 text-purple-300 border border-purple-500"
                  : "bg-slate-800/50 text-slate-400 border border-slate-800 hover:border-slate-700"
              )}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-black uppercase tracking-wider text-slate-400">
          77. Are you comfortable with the Madrasah contacting you whenever there is an important concern regarding your ward?
        </label>
        <div className="flex gap-4">
          {["Yes", "No"].map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => handleChange({ target: { name: "comfortableContact", value: option } })}
              className={cn(
                "px-6 py-2 rounded-full text-xs font-black transition-all",
                formData.comfortableContact === option
                  ? "bg-purple-600/40 text-purple-300 border border-purple-500"
                  : "bg-slate-800/50 text-slate-400 border border-slate-800 hover:border-slate-700"
              )}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-black uppercase tracking-wider text-slate-400">
          78. Are there any specific communication arrangements you would like us to observe?
        </label>
        <textarea
          name="communicationNotes"
          value={formData.communicationNotes}
          onChange={handleChange}
          rows={2}
          className="w-full p-3 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all resize-none"
          placeholder="Any communication preferences..."
        />
      </div>
    </div>
  );
}

// Section 10: Visitation
function VisitationSection({ formData, handleChange }: any) {
  return (
    <div className="space-y-5">
      <div className="space-y-1.5">
        <label className="text-xs font-black uppercase tracking-wider text-slate-400">
          79. Who is authorised to visit the student?
        </label>
        <div className="grid grid-cols-3 gap-2">
          <input
            name="authorisedVisitors"
            value={formData.authorisedVisitors}
            onChange={handleChange}
            className="col-span-2 w-full h-11 px-4 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all"
            placeholder="Full Name"
          />
          <input
            name="authorisedVisitors"
            value={formData.authorisedVisitors}
            onChange={handleChange}
            className="w-full h-11 px-4 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all"
            placeholder="Phone"
          />
        </div>
        <p className="text-[10px] text-slate-500 italic">Add multiple visitors separated by commas</p>
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-black uppercase tracking-wider text-slate-400">
          80. Who is authorised to collect the student from the Madrasah?
        </label>
        <div className="grid grid-cols-3 gap-2">
          <input
            name="authorisedCollectors"
            value={formData.authorisedCollectors}
            onChange={handleChange}
            className="col-span-2 w-full h-11 px-4 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all"
            placeholder="Full Name"
          />
          <input
            name="authorisedCollectors"
            value={formData.authorisedCollectors}
            onChange={handleChange}
            className="w-full h-11 px-4 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all"
            placeholder="Phone"
          />
        </div>
        <p className="text-[10px] text-slate-500 italic">Add multiple collectors separated by commas</p>
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-black uppercase tracking-wider text-slate-400">
          81. Is there anyone who should NOT be permitted to collect or visit the student?
        </label>
        <div className="flex gap-4">
          {["Yes", "No"].map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => handleChange({ target: { name: "restrictedPersons", value: option } })}
              className={cn(
                "px-6 py-2 rounded-full text-xs font-black transition-all",
                formData.restrictedPersons === option
                  ? "bg-red-600/40 text-red-300 border border-red-500"
                  : "bg-slate-800/50 text-slate-400 border border-slate-800 hover:border-slate-700"
              )}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
      {formData.restrictedPersons === "Yes" && (
        <div className="space-y-1.5 pl-4 border-l-2 border-red-500/30">
          <label className="text-xs font-black uppercase tracking-wider text-slate-400">
            Please provide details:
          </label>
          <input
            name="restrictedPersonsDetails"
            value={formData.restrictedPersonsDetails}
            onChange={handleChange}
            className="w-full h-11 px-4 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all"
            placeholder="Details of restricted persons..."
          />
        </div>
      )}
    </div>
  );
}

// Section 11: Declaration
function DeclarationSection({ formData, handleChange }: any) {
  return (
    <div className="space-y-6">
      <div className="p-6 rounded-2xl bg-purple-600/10 border border-purple-800/30">
        <div className="flex items-start gap-3 mb-4">
          <FileCheck className="w-6 h-6 text-purple-400 shrink-0 mt-1" />
          <div>
            <h3 className="font-black text-white text-lg">Parent/Guardian Declaration</h3>
            <p className="text-sm text-slate-300">
              I confirm that the information provided in this application is accurate and complete to the best of my knowledge.
            </p>
          </div>
        </div>

        <div className="space-y-3 text-sm text-slate-300 pl-9">
          <p className="flex items-start gap-2">
            <span className="text-amber-500">•</span>
            Admission is subject to assessment and approval by Daar-ul-Maysaroh.
          </p>
          <p className="flex items-start gap-2">
            <span className="text-amber-500">•</span>
            The student may be placed according to their Qur'ān and Islamic learning level.
          </p>
          <p className="flex items-start gap-2">
            <span className="text-amber-500">•</span>
            I am responsible for providing accurate information about the student's health, welfare and educational background.
          </p>
          <p className="flex items-start gap-2">
            <span className="text-amber-500">•</span>
            I will inform the Madrasah of any important change affecting my ward.
          </p>
          <p className="flex items-start gap-2">
            <span className="text-amber-500">•</span>
            I agree to abide by the rules, policies and regulations of Daar-ul-Maysaroh.
          </p>
          <p className="flex items-start gap-2">
            <span className="text-amber-500">•</span>
            I understand that submission of this form does not by itself constitute confirmation of admission.
          </p>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-xs font-black uppercase tracking-wider text-slate-400">
            Parent/Guardian Full Name <span className="text-amber-500">*</span>
          </label>
          <input
            name="parentFullName"
            value={formData.parentFullName}
            onChange={handleChange}
            className="w-full h-11 px-4 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all"
            placeholder="Full name"
            required
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-black uppercase tracking-wider text-slate-400">
            Date <span className="text-amber-500">*</span>
          </label>
          <input
            type="date"
            name="declarationDate"
            value={formData.declarationDate}
            onChange={handleChange}
            className="w-full h-11 px-4 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all"
            required
          />
        </div>
      </div>

      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          id="agreeDeclaration"
          name="agreeDeclaration"
          checked={formData.agreeDeclaration}
          onChange={handleChange}
          className="w-5 h-5 mt-0.5 rounded border-slate-700 bg-slate-900/50 text-purple-600 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-slate-950"
          required
        />
        <label htmlFor="agreeDeclaration" className="text-sm text-slate-300">
          I confirm that I have read and understood the above declaration.
          <span className="text-amber-500"> *</span>
        </label>
      </div>
    </div>
  );
}