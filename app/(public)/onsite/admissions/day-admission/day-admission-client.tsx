// // app/(marketing)/onsite/day-admission/day-admission-client.tsx
// "use client";

// import { useState } from "react";
// import { Reveal } from "@/components/shared/section-animation";
// import { Button } from "@/components/ui/button";
// import {
//   ArrowRight,
//   CheckCircle2,
//   Shield,
//   Crown,
//   FileCheck,
//   Sparkles,
//   GraduationCap,
//   User,
//   Users,
//   BookOpen,
//   Heart,
//   MessageCircle,
//   Phone,
//   Mail,
//   Send,
//   Sun,
//   Clock,
//   Calendar,
//   ChevronRight,
//   ChevronLeft,
// } from "lucide-react";
// import Link from "next/link";
// import { cn } from "@/lib/utils";

// type DayFormData = {
//   // Student Information
//   studentFullName: string;
//   gender: string;
//   age: string;
//   dateOfBirth: string;
//   nationality: string;
//   countryOfResidence: string;
//   stateOfOrigin: string;
//   residentialAddress: string;

//   // Parent/Guardian Information
//   guardianName: string;
//   guardianRelationship: string;
//   guardianPhone: string;
//   guardianWhatsApp: string;
//   guardianEmail: string;
//   guardianAddress: string;

//   // Programme Selection
//   programmeType: "full-time-day" | "part-time-day";
//   preferredSchedule: string;
//   startDate: string;

//   // Quran Background
//   startedQuran: string;
//   quranReadingLevel: string;
//   startedMemorization: string;
//   memorizationAmount: string;
//   memorizationFrequency: string;
//   studiedTajweed: string;
//   tajweedLevel: string;

//   // Goals & Motivation
//   motivation: string;
//   goals: string;

//   // Communication
//   preferredCommunication: string;
//   updateFrequency: string;

//   // Declaration
//   parentFullName: string;
//   declarationDate: string;
//   agreeDeclaration: boolean;
// };

// const DAY_SECTIONS = [
//   { id: "student", title: "Student Information", icon: User },
//   { id: "parent", title: "Parent/Guardian", icon: Users },
//   { id: "programme", title: "Programme Selection", icon: Sun },
//   { id: "quran", title: "Quran Background", icon: BookOpen },
//   { id: "goals", title: "Goals & Motivation", icon: Heart },
//   { id: "declaration", title: "Declaration", icon: FileCheck },
// ];

// const SNAPIT_ACCESS_KEY = "sf_154d98b73e50288b5327caec3d844896";

// export default function DayAdmissionClient() {
//   const [currentSection, setCurrentSection] = useState(0);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [showSuccess, setShowSuccess] = useState(false);
//   const [submitError, setSubmitError] = useState("");

//   const [formData, setFormData] = useState<DayFormData>({
//     studentFullName: "",
//     gender: "",
//     age: "",
//     dateOfBirth: "",
//     nationality: "",
//     countryOfResidence: "",
//     stateOfOrigin: "",
//     residentialAddress: "",
//     guardianName: "",
//     guardianRelationship: "",
//     guardianPhone: "",
//     guardianWhatsApp: "",
//     guardianEmail: "",
//     guardianAddress: "",
//     programmeType: "full-time-day",
//     preferredSchedule: "",
//     startDate: "",
//     startedQuran: "",
//     quranReadingLevel: "",
//     startedMemorization: "",
//     memorizationAmount: "",
//     memorizationFrequency: "",
//     studiedTajweed: "",
//     tajweedLevel: "",
//     motivation: "",
//     goals: "",
//     preferredCommunication: "",
//     updateFrequency: "",
//     parentFullName: "",
//     declarationDate: "",
//     agreeDeclaration: false,
//   });

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
//   };

//   const nextSection = () => {
//     if (currentSection < DAY_SECTIONS.length - 1) {
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

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     setSubmitError("");

//     try {
//       const response = await fetch("https://api.snapitforms.com/submit", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           access_key: SNAPIT_ACCESS_KEY,
//           ...formData,
//           _subject: "Daar-ul-Maysaroh Day Programme Application",
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

//   if (showSuccess) {
//     return (
//       <main className="relative bg-slate-950 overflow-hidden min-h-screen pt-24 md:pt-28">
//         <div className="container mx-auto px-4 xs:px-5 sm:px-6">
//           <div className="max-w-2xl mx-auto text-center py-20">
//             <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-600 to-amber-500 flex items-center justify-center mx-auto mb-6 shadow-2xl">
//               <CheckCircle2 className="w-10 h-10 text-white" />
//             </div>
//             <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
//               Application Submitted! 🎉
//             </h2>
//             <p className="text-slate-300 mb-6">
//               Your Day Programme application has been received. Our team will
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
//               <Button className="rounded-full px-8 py-3 font-black bg-gradient-to-r from-purple-600 to-amber-500 text-white">
//                 Return to Home
//               </Button>
//             </Link>
//           </div>
//         </div>
//       </main>
//     );
//   }

//   const currentSectionData = DAY_SECTIONS[currentSection];

//   return (
//     <main className="relative bg-slate-950 overflow-hidden min-h-screen pt-24 md:pt-28">
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
//           <span className="text-amber-500">Day Programme</span>
//         </nav>

//         {/* Hero */}
//         <section className="py-4 md:py-6">
//           <Reveal>
//             <div className="text-center max-w-3xl mx-auto">
//               <div className="inline-flex items-center gap-2 text-amber-500 font-black text-xs uppercase tracking-wider mb-3">
//                 <Sun className="w-4 h-4" />
//                 Day Programme Application
//               </div>
//               <h1 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter font-heading leading-[1.1] text-white">
//                 Day{" "}
//                 <span className="bg-gradient-to-r from-purple-400 to-amber-400 bg-clip-text text-transparent">
//                   Admission
//                 </span>
//               </h1>
//               <p className="text-sm md:text-base text-slate-300 max-w-2xl mx-auto mt-3">
//                 Apply for the Day Programme at Daar-ul-Maysaroh.
//               </p>
//             </div>
//           </Reveal>
//         </section>

//         {/* Progress */}
//         <div className="max-w-4xl mx-auto mb-6">
//           <div className="flex items-center gap-1">
//             {DAY_SECTIONS.map((section, idx) => {
//               const Icon = section.icon;
//               const isActive = idx === currentSection;
//               const isCompleted = idx < currentSection;
//               return (
//                 <button
//                   key={section.id}
//                   onClick={() => setCurrentSection(idx)}
//                   className="flex flex-col items-center flex-1 min-w-[40px] group"
//                 >
//                   <div
//                     className={cn(
//                       "w-8 h-8 rounded-full flex items-center justify-center transition-all",
//                       isActive
//                         ? "bg-gradient-to-r from-purple-600 to-amber-500 text-white shadow-lg"
//                         : isCompleted
//                           ? "bg-purple-600/40 text-purple-300"
//                           : "bg-slate-800/50 text-slate-500",
//                     )}
//                   >
//                     <Icon className="w-3.5 h-3.5" />
//                   </div>
//                   <span
//                     className={cn(
//                       "text-[5px] font-black uppercase mt-0.5",
//                       isActive ? "text-amber-400" : "text-slate-500",
//                     )}
//                   >
//                     {section.title.split(" ")[0].slice(0, 4)}
//                   </span>
//                 </button>
//               );
//             })}
//           </div>
//           <div className="w-full h-1 bg-slate-800/50 rounded-full overflow-hidden mt-1">
//             <div
//               className="h-full bg-gradient-to-r from-purple-600 to-amber-500 rounded-full transition-all duration-300"
//               style={{
//                 width: `${((currentSection + 1) / DAY_SECTIONS.length) * 100}%`,
//               }}
//             />
//           </div>
//         </div>

//         {/* Form */}
//         <form onSubmit={handleSubmit} className="py-4 md:py-6">
//           <div className="max-w-4xl mx-auto">
//             <div className="p-4 md:p-8 rounded-3xl bg-slate-900/30 hover:bg-slate-900/50 transition-all">
//               {/* Section Header */}
//               <div className="flex items-center gap-3 mb-6">
//                 <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-purple-600 to-amber-500 flex items-center justify-center shrink-0">
//                   <currentSectionData.icon className="w-5 h-5 text-white" />
//                 </div>
//                 <div>
//                   <p className="text-[10px] font-black text-amber-500 uppercase tracking-wider">
//                     Section {currentSection + 1} of {DAY_SECTIONS.length}
//                   </p>
//                   <h2 className="text-lg md:text-xl font-black text-white">
//                     {currentSectionData.title}
//                   </h2>
//                 </div>
//               </div>

//               {/* Section Content */}
//               {currentSection === 0 && (
//                 <DayStudentSection
//                   formData={formData}
//                   handleChange={handleChange}
//                 />
//               )}
//               {currentSection === 1 && (
//                 <DayParentSection
//                   formData={formData}
//                   handleChange={handleChange}
//                 />
//               )}
//               {currentSection === 2 && (
//                 <DayProgrammeSection
//                   formData={formData}
//                   handleChange={handleChange}
//                 />
//               )}
//               {currentSection === 3 && (
//                 <DayQuranSection
//                   formData={formData}
//                   handleChange={handleChange}
//                 />
//               )}
//               {currentSection === 4 && (
//                 <DayGoalsSection
//                   formData={formData}
//                   handleChange={handleChange}
//                 />
//               )}
//               {currentSection === 5 && (
//                 <DayDeclarationSection
//                   formData={formData}
//                   handleChange={handleChange}
//                 />
//               )}

//               {/* Navigation */}
//               <div className="mt-6 pt-6 border-t-2 border-purple-800/20">
//                 <div className="flex flex-col sm:flex-row justify-between gap-4">
//                   <Button
//                     type="button"
//                     onClick={prevSection}
//                     disabled={currentSection === 0}
//                     className="rounded-xl py-3 font-black text-sm bg-slate-800 hover:bg-slate-700 text-white disabled:opacity-50 disabled:cursor-not-allowed min-h-[48px] px-6 w-full sm:w-auto order-2 sm:order-1"
//                   >
//                     <ChevronLeft className="w-4 h-4 mr-2" />
//                     Previous
//                   </Button>

//                   {currentSection === DAY_SECTIONS.length - 1 ? (
//                     <Button
//                       type="submit"
//                       disabled={!formData.agreeDeclaration || isSubmitting}
//                       className="rounded-xl py-3 font-black text-sm bg-gradient-to-r from-purple-600 to-amber-500 hover:from-purple-700 hover:to-amber-600 text-white shadow-lg shadow-purple-500/20 transition-all group disabled:opacity-50 disabled:cursor-not-allowed min-h-[48px] px-8 w-full sm:w-auto order-1 sm:order-2"
//                     >
//                       {isSubmitting ? (
//                         <>
//                           <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
//                           Submitting...
//                         </>
//                       ) : (
//                         <>
//                           Submit Application
//                           <Send className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
//                         </>
//                       )}
//                     </Button>
//                   ) : (
//                     <Button
//                       type="button"
//                       onClick={nextSection}
//                       className="rounded-xl py-3 font-black text-sm bg-gradient-to-r from-purple-600 to-amber-500 hover:from-purple-700 hover:to-amber-600 text-white shadow-lg shadow-purple-500/20 transition-all group min-h-[48px] px-8 w-full sm:w-auto order-1 sm:order-2"
//                     >
//                       Next
//                       <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
//                     </Button>
//                   )}
//                 </div>
//               </div>
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

// // ============================================================
// // SECTION COMPONENTS
// // ============================================================

// // Student Section
// function DayStudentSection({ formData, handleChange }: any) {
//   return (
//     <div className="space-y-4">
//       <div className="grid sm:grid-cols-2 gap-4">
//         <div className="space-y-1.5">
//           <label className="text-xs font-black uppercase tracking-wider text-slate-400">
//             Student's Full Name <span className="text-amber-500">*</span>
//           </label>
//           <input
//             name="studentFullName"
//             value={formData.studentFullName}
//             onChange={handleChange}
//             className="w-full h-12 px-4 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all"
//             placeholder="Enter full name"
//             required
//           />
//         </div>
//         <div className="space-y-1.5">
//           <label className="text-xs font-black uppercase tracking-wider text-slate-400">
//             Gender <span className="text-amber-500">*</span>
//           </label>
//           <select
//             name="gender"
//             value={formData.gender}
//             onChange={handleChange}
//             className="w-full h-12 px-4 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all"
//             required
//           >
//             <option value="">Select</option>
//             <option value="Male">Male</option>
//             <option value="Female">Female</option>
//           </select>
//         </div>
//       </div>

//       <div className="grid sm:grid-cols-2 gap-4">
//         <div className="space-y-1.5">
//           <label className="text-xs font-black uppercase tracking-wider text-slate-400">
//             Age <span className="text-amber-500">*</span>
//           </label>
//           <input
//             type="number"
//             name="age"
//             value={formData.age}
//             onChange={handleChange}
//             className="w-full h-12 px-4 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all"
//             placeholder="Age"
//             required
//           />
//         </div>
//         <div className="space-y-1.5">
//           <label className="text-xs font-black uppercase tracking-wider text-slate-400">
//             Date of Birth
//           </label>
//           <input
//             type="date"
//             name="dateOfBirth"
//             value={formData.dateOfBirth}
//             onChange={handleChange}
//             className="w-full h-12 px-4 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all"
//           />
//         </div>
//       </div>

//       <div className="grid sm:grid-cols-2 gap-4">
//         <div className="space-y-1.5">
//           <label className="text-xs font-black uppercase tracking-wider text-slate-400">
//             Nationality
//           </label>
//           <input
//             name="nationality"
//             value={formData.nationality}
//             onChange={handleChange}
//             className="w-full h-12 px-4 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all"
//             placeholder="Nationality"
//           />
//         </div>
//         <div className="space-y-1.5">
//           <label className="text-xs font-black uppercase tracking-wider text-slate-400">
//             Country of Residence
//           </label>
//           <input
//             name="countryOfResidence"
//             value={formData.countryOfResidence}
//             onChange={handleChange}
//             className="w-full h-12 px-4 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all"
//             placeholder="Country of residence"
//           />
//         </div>
//       </div>

//       <div className="grid sm:grid-cols-2 gap-4">
//         <div className="space-y-1.5">
//           <label className="text-xs font-black uppercase tracking-wider text-slate-400">
//             State of Origin
//           </label>
//           <input
//             name="stateOfOrigin"
//             value={formData.stateOfOrigin}
//             onChange={handleChange}
//             className="w-full h-12 px-4 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all"
//             placeholder="State of origin"
//           />
//         </div>
//         <div className="space-y-1.5">
//           <label className="text-xs font-black uppercase tracking-wider text-slate-400">
//             Residential Address
//           </label>
//           <input
//             name="residentialAddress"
//             value={formData.residentialAddress}
//             onChange={handleChange}
//             className="w-full h-12 px-4 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all"
//             placeholder="Residential address"
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

// // Parent Section
// function DayParentSection({ formData, handleChange }: any) {
//   return (
//     <div className="space-y-4">
//       <div className="grid sm:grid-cols-2 gap-4">
//         <div className="space-y-1.5">
//           <label className="text-xs font-black uppercase tracking-wider text-slate-400">
//             Parent/Guardian Name <span className="text-amber-500">*</span>
//           </label>
//           <input
//             name="guardianName"
//             value={formData.guardianName}
//             onChange={handleChange}
//             className="w-full h-12 px-4 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all"
//             placeholder="Full name"
//             required
//           />
//         </div>
//         <div className="space-y-1.5">
//           <label className="text-xs font-black uppercase tracking-wider text-slate-400">
//             Relationship <span className="text-amber-500">*</span>
//           </label>
//           <input
//             name="guardianRelationship"
//             value={formData.guardianRelationship}
//             onChange={handleChange}
//             className="w-full h-12 px-4 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all"
//             placeholder="e.g., Father, Mother"
//             required
//           />
//         </div>
//       </div>

//       <div className="grid sm:grid-cols-2 gap-4">
//         <div className="space-y-1.5">
//           <label className="text-xs font-black uppercase tracking-wider text-slate-400">
//             Phone Number <span className="text-amber-500">*</span>
//           </label>
//           <input
//             name="guardianPhone"
//             type="tel"
//             value={formData.guardianPhone}
//             onChange={handleChange}
//             className="w-full h-12 px-4 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all"
//             placeholder="+234 800 000 0000"
//             required
//           />
//         </div>
//         <div className="space-y-1.5">
//           <label className="text-xs font-black uppercase tracking-wider text-slate-400">
//             WhatsApp Number
//           </label>
//           <input
//             name="guardianWhatsApp"
//             type="tel"
//             value={formData.guardianWhatsApp}
//             onChange={handleChange}
//             className="w-full h-12 px-4 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all"
//             placeholder="+234 800 000 0000"
//           />
//         </div>
//       </div>

//       <div className="grid sm:grid-cols-2 gap-4">
//         <div className="space-y-1.5">
//           <label className="text-xs font-black uppercase tracking-wider text-slate-400">
//             Email Address <span className="text-amber-500">*</span>
//           </label>
//           <input
//             name="guardianEmail"
//             type="email"
//             value={formData.guardianEmail}
//             onChange={handleChange}
//             className="w-full h-12 px-4 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all"
//             placeholder="email@example.com"
//             required
//           />
//         </div>
//         <div className="space-y-1.5">
//           <label className="text-xs font-black uppercase tracking-wider text-slate-400">
//             Address
//           </label>
//           <input
//             name="guardianAddress"
//             value={formData.guardianAddress}
//             onChange={handleChange}
//             className="w-full h-12 px-4 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all"
//             placeholder="Residential address"
//           />
//         </div>
//       </div>

//       <div className="grid sm:grid-cols-2 gap-4">
//         <div className="space-y-1.5">
//           <label className="text-xs font-black uppercase tracking-wider text-slate-400">
//             Preferred Communication <span className="text-amber-500">*</span>
//           </label>
//           <select
//             name="preferredCommunication"
//             value={formData.preferredCommunication}
//             onChange={handleChange}
//             className="w-full h-12 px-4 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all"
//             required
//           >
//             <option value="">Select</option>
//             <option value="WhatsApp">WhatsApp</option>
//             <option value="Phone Call">Phone Call</option>
//             <option value="Email">Email</option>
//           </select>
//         </div>
//         <div className="space-y-1.5">
//           <label className="text-xs font-black uppercase tracking-wider text-slate-400">
//             Update Frequency
//           </label>
//           <select
//             name="updateFrequency"
//             value={formData.updateFrequency}
//             onChange={handleChange}
//             className="w-full h-12 px-4 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all"
//           >
//             <option value="">Select</option>
//             <option value="Weekly">Weekly</option>
//             <option value="Bi-weekly">Bi-weekly</option>
//             <option value="Monthly">Monthly</option>
//             <option value="As necessary">As necessary</option>
//           </select>
//         </div>
//       </div>
//     </div>
//   );
// }

// // Programme Section
// function DayProgrammeSection({ formData, handleChange }: any) {
//   return (
//     <div className="space-y-4">
//       <div className="space-y-1.5">
//         <label className="text-xs font-black uppercase tracking-wider text-slate-400">
//           Programme Type <span className="text-amber-500">*</span>
//         </label>
//         <div className="grid sm:grid-cols-2 gap-3">
//           {[
//             {
//               value: "full-time-day",
//               label: "Full-Time Day",
//               desc: "Sat-Sun (9-4:30) + Mon-Wed (4:30-6:30)",
//             },
//             {
//               value: "part-time-day",
//               label: "Part-Time Day",
//               desc: "Sat-Sun (9:00 AM - 4:30 PM)",
//             },
//           ].map((option) => (
//             <button
//               key={option.value}
//               type="button"
//               onClick={() =>
//                 handleChange({
//                   target: { name: "programmeType", value: option.value },
//                 } as any)
//               }
//               className={cn(
//                 "p-4 rounded-xl border-2 text-left transition-all min-h-[70px]",
//                 formData.programmeType === option.value
//                   ? "border-purple-500 bg-purple-600/20 text-white"
//                   : "border-slate-800 text-slate-400 hover:border-slate-700",
//               )}
//             >
//               <div className="font-black text-sm">{option.label}</div>
//               <div className="text-xs text-slate-500 mt-1">{option.desc}</div>
//             </button>
//           ))}
//         </div>
//       </div>

//       <div className="grid sm:grid-cols-2 gap-4">
//         <div className="space-y-1.5">
//           <label className="text-xs font-black uppercase tracking-wider text-slate-400">
//             Preferred Schedule
//           </label>
//           <input
//             name="preferredSchedule"
//             value={formData.preferredSchedule}
//             onChange={handleChange}
//             className="w-full h-12 px-4 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all"
//             placeholder="Any specific schedule requests?"
//           />
//         </div>
//         <div className="space-y-1.5">
//           <label className="text-xs font-black uppercase tracking-wider text-slate-400">
//             Preferred Start Date
//           </label>
//           <input
//             type="date"
//             name="startDate"
//             value={formData.startDate}
//             onChange={handleChange}
//             className="w-full h-12 px-4 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all"
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

// // Quran Section
// function DayQuranSection({ formData, handleChange }: any) {
//   return (
//     <div className="space-y-4">
//       <div className="space-y-1.5">
//         <label className="text-xs font-black uppercase tracking-wider text-slate-400">
//           Has the student started reading the Qur'ān?{" "}
//           <span className="text-amber-500">*</span>
//         </label>
//         <div className="flex gap-4">
//           {["Yes", "No"].map((option) => (
//             <button
//               key={option}
//               type="button"
//               onClick={() =>
//                 handleChange({
//                   target: { name: "startedQuran", value: option },
//                 } as any)
//               }
//               className={cn(
//                 "px-6 py-2 rounded-full text-xs font-black transition-all min-h-[40px]",
//                 formData.startedQuran === option
//                   ? "bg-purple-600/40 text-purple-300 border border-purple-500"
//                   : "bg-slate-800/50 text-slate-400 border border-slate-800 hover:border-slate-700",
//               )}
//             >
//               {option}
//             </button>
//           ))}
//         </div>
//       </div>

//       <div className="space-y-1.5">
//         <label className="text-xs font-black uppercase tracking-wider text-slate-400">
//           Quran Reading Level
//         </label>
//         <select
//           name="quranReadingLevel"
//           value={formData.quranReadingLevel}
//           onChange={handleChange}
//           className="w-full h-12 px-4 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all"
//         >
//           <option value="">Select level</option>
//           <option value="Beginner — still learning Arabic letters">
//             Beginner — still learning Arabic letters
//           </option>
//           <option value="Can read with assistance">
//             Can read with assistance
//           </option>
//           <option value="Can read independently">Can read independently</option>
//           <option value="Fluent">Fluent</option>
//           <option value="Very fluent">Very fluent</option>
//         </select>
//       </div>

//       <div className="space-y-1.5">
//         <label className="text-xs font-black uppercase tracking-wider text-slate-400">
//           Has the student started Qur'ān memorisation?
//         </label>
//         <div className="flex gap-4">
//           {["Yes", "No"].map((option) => (
//             <button
//               key={option}
//               type="button"
//               onClick={() =>
//                 handleChange({
//                   target: { name: "startedMemorization", value: option },
//                 } as any)
//               }
//               className={cn(
//                 "px-6 py-2 rounded-full text-xs font-black transition-all min-h-[40px]",
//                 formData.startedMemorization === option
//                   ? "bg-purple-600/40 text-purple-300 border border-purple-500"
//                   : "bg-slate-800/50 text-slate-400 border border-slate-800 hover:border-slate-700",
//               )}
//             >
//               {option}
//             </button>
//           ))}
//         </div>
//       </div>

//       <div className="grid sm:grid-cols-2 gap-4">
//         <div className="space-y-1.5">
//           <label className="text-xs font-black uppercase tracking-wider text-slate-400">
//             Amount Memorised
//           </label>
//           <select
//             name="memorizationAmount"
//             value={formData.memorizationAmount}
//             onChange={handleChange}
//             className="w-full h-12 px-4 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all"
//           >
//             <option value="">Select</option>
//             <option value="Less than Juz' 30">Less than Juz' 30</option>
//             <option value="Juz' 30">Juz' 30</option>
//             <option value="2–5 Juz'">2–5 Juz'</option>
//             <option value="6–10 Juz'">6–10 Juz'</option>
//             <option value="11–20 Juz'">11–20 Juz'</option>
//             <option value="21–29 Juz'">21–29 Juz'</option>
//             <option value="Complete Qur'ān">Complete Qur'ān</option>
//           </select>
//         </div>
//         <div className="space-y-1.5">
//           <label className="text-xs font-black uppercase tracking-wider text-slate-400">
//             Memorisation Frequency
//           </label>
//           <select
//             name="memorizationFrequency"
//             value={formData.memorizationFrequency}
//             onChange={handleChange}
//             className="w-full h-12 px-4 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all"
//           >
//             <option value="">Select</option>
//             <option value="Daily">Daily</option>
//             <option value="Several times a week">Several times a week</option>
//             <option value="Occasionally">Occasionally</option>
//             <option value="Currently not memorising">
//               Currently not memorising
//             </option>
//           </select>
//         </div>
//       </div>

//       <div className="grid sm:grid-cols-2 gap-4">
//         <div className="space-y-1.5">
//           <label className="text-xs font-black uppercase tracking-wider text-slate-400">
//             Has the student studied Tajweed?
//           </label>
//           <div className="flex gap-4">
//             {["Yes", "No"].map((option) => (
//               <button
//                 key={option}
//                 type="button"
//                 onClick={() =>
//                   handleChange({
//                     target: { name: "studiedTajweed", value: option },
//                   } as any)
//                 }
//                 className={cn(
//                   "px-6 py-2 rounded-full text-xs font-black transition-all min-h-[40px]",
//                   formData.studiedTajweed === option
//                     ? "bg-purple-600/40 text-purple-300 border border-purple-500"
//                     : "bg-slate-800/50 text-slate-400 border border-slate-800 hover:border-slate-700",
//                 )}
//               >
//                 {option}
//               </button>
//             ))}
//           </div>
//         </div>
//         <div className="space-y-1.5">
//           <label className="text-xs font-black uppercase tracking-wider text-slate-400">
//             Tajweed Level
//           </label>
//           <select
//             name="tajweedLevel"
//             value={formData.tajweedLevel}
//             onChange={handleChange}
//             className="w-full h-12 px-4 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all"
//           >
//             <option value="">Select</option>
//             <option value="Beginner">Beginner</option>
//             <option value="Basic">Basic</option>
//             <option value="Intermediate">Intermediate</option>
//             <option value="Advanced">Advanced</option>
//             <option value="Not sure">Not sure</option>
//           </select>
//         </div>
//       </div>
//     </div>
//   );
// }

// // Goals Section
// function DayGoalsSection({ formData, handleChange }: any) {
//   return (
//     <div className="space-y-4">
//       <div className="space-y-1.5">
//         <label className="text-xs font-black uppercase tracking-wider text-slate-400">
//           What motivates you to enrol your ward at Daar-ul-Maysaroh?
//         </label>
//         <textarea
//           name="motivation"
//           value={formData.motivation}
//           onChange={handleChange}
//           rows={2}
//           className="w-full p-3 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all resize-none"
//           placeholder="Why are you choosing Daar-ul-Maysaroh?"
//         />
//       </div>

//       <div className="space-y-1.5">
//         <label className="text-xs font-black uppercase tracking-wider text-slate-400">
//           What would you like the student to achieve during their time with us?
//         </label>
//         <textarea
//           name="goals"
//           value={formData.goals}
//           onChange={handleChange}
//           rows={2}
//           className="w-full p-3 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all resize-none"
//           placeholder="What are your hopes for your child?"
//         />
//       </div>
//     </div>
//   );
// }

// // Declaration Section
// function DayDeclarationSection({ formData, handleChange }: any) {
//   return (
//     <div className="space-y-6">
//       <div className="p-6 rounded-2xl bg-purple-600/10 border border-purple-800/30">
//         <div className="flex items-start gap-3 mb-4">
//           <FileCheck className="w-6 h-6 text-purple-400 shrink-0 mt-1" />
//           <div>
//             <h3 className="font-black text-white text-lg">
//               Parent/Guardian Declaration
//             </h3>
//             <p className="text-sm text-slate-300">
//               I confirm that the information provided in this application is
//               accurate and complete to the best of my knowledge.
//             </p>
//           </div>
//         </div>
//         <div className="space-y-2 text-sm text-slate-300 pl-9">
//           <p className="flex items-start gap-2">
//             <span className="text-amber-500">•</span>
//             Admission is subject to assessment and approval by Daar-ul-Maysaroh.
//           </p>
//           <p className="flex items-start gap-2">
//             <span className="text-amber-500">•</span>I agree to abide by the
//             rules and regulations of Daar-ul-Maysaroh.
//           </p>
//           <p className="flex items-start gap-2">
//             <span className="text-amber-500">•</span>I understand that
//             submission does not constitute confirmation of admission.
//           </p>
//         </div>
//       </div>

//       <div className="grid sm:grid-cols-2 gap-4">
//         <div className="space-y-1.5">
//           <label className="text-xs font-black uppercase tracking-wider text-slate-400">
//             Parent/Guardian Full Name <span className="text-amber-500">*</span>
//           </label>
//           <input
//             name="parentFullName"
//             value={formData.parentFullName}
//             onChange={handleChange}
//             className="w-full h-12 px-4 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all"
//             placeholder="Full name"
//             required
//           />
//         </div>
//         <div className="space-y-1.5">
//           <label className="text-xs font-black uppercase tracking-wider text-slate-400">
//             Date <span className="text-amber-500">*</span>
//           </label>
//           <input
//             type="date"
//             name="declarationDate"
//             value={formData.declarationDate}
//             onChange={handleChange}
//             className="w-full h-12 px-4 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all"
//             required
//           />
//         </div>
//       </div>

//       <div className="flex items-start gap-3">
//         <input
//           type="checkbox"
//           id="agreeDeclaration"
//           name="agreeDeclaration"
//           checked={formData.agreeDeclaration}
//           onChange={handleChange}
//           className="w-5 h-5 mt-0.5 rounded border-slate-700 bg-slate-900/50 text-purple-600 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-slate-950"
//         />
//         <label htmlFor="agreeDeclaration" className="text-sm text-slate-300">
//           I confirm that I have read and understood the above declaration.
//           <span className="text-amber-500"> *</span>
//         </label>
//       </div>
//     </div>
//   );
// }






// app/(marketing)/onsite/admissions/day-admission-client.tsx
"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  GraduationCap,
  User,
  Users,
  BookOpen,
  Award,
  CheckCircle2,
  Shield,
  Crown,
  Sparkles,
  Sun,
  Camera,
  Heart,
  MessageCircle,
  FileCheck,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/shared/section-animation";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

// Types
import { FormData, Section, FormErrors } from "../types";

// Components
import { ProgressIndicator } from "../components/ProgressIndicator";
import { NavigationButtons } from "../components/NavigationButtons";
import { SectionPassport } from "../components/sections/SectionPassport";

// Day-specific sections
import { SectionProgramme } from "../components/sections/SectionProgramme";
import { SectionStudent } from "../components/sections/SectionStudent";
import { SectionParent } from "../components/sections/SectionParent";
import { SectionQuran } from "../components/sections/SectionQuran";
import { SectionIslamic } from "../components/sections/SectionIslamic";
import { SectionLearning } from "../components/sections/SectionLearning";
import { SectionCommunication } from "../components/sections/SectionCommunication";
import { SectionDeclaration } from "../components/sections/SectionDeclaration";

// Validation
import { validateSection } from "../utils/formValidation";

// ============================================================
// SECTIONS DEFINITION (Day - Shorter)
// ============================================================

const SECTIONS: Section[] = [
  { id: "programme", title: "Programme Selection", icon: GraduationCap },
  { id: "student", title: "Student Information", icon: User },
  { id: "parent", title: "Parent/Guardian", icon: Users },
  { id: "passport", title: "Passport Photo", icon: Camera },
  { id: "quran", title: "Qur'an Background", icon: BookOpen },
  { id: "islamic", title: "Islamic Education", icon: Award },
  { id: "learning", title: "Goals & Motivation", icon: Heart },
  { id: "communication", title: "Communication", icon: MessageCircle },
  { id: "declaration", title: "Declaration", icon: Award },
];

// ============================================================
// INITIAL FORM DATA (Day - Shorter)
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

export default function DayAdmissionClient() {
  const [currentSection, setCurrentSection] = useState(0);
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const SNAPIT_ACCESS_KEY = process.env.NEXT_PUBLIC_SNAPIT_ACCESS_KEY || "sf_154d98b73e50288b5327caec3d844896";

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
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
      setFormData({ ...formData, [name]: current.filter((item) => item !== value) });
    } else {
      setFormData({ ...formData, [name]: [...current, value] });
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

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
          _subject: "Daar-ul-Maysaroh Day Programme Application",
          _replyto: formData.guardianEmail,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setShowSuccess(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        setSubmitError(result.message || "Submission failed. Please try again.");
      }
    } catch (error) {
      setSubmitError("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (showSuccess) {
    return (
      <main className="relative bg-slate-950 overflow-hidden min-h-screen pt-24 md:pt-28">
        <div className="container mx-auto px-4 xs:px-5 sm:px-6">
          <div className="max-w-2xl mx-auto text-center py-20">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-600 to-amber-500 flex items-center justify-center mx-auto mb-6 shadow-2xl">
              <CheckCircle2 className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
              Application Submitted! 🎉
            </h2>
            <p className="text-slate-300 mb-6">
              Your Day Programme application has been received. Our team will contact you within 24-48 hours.
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
              <Button className="rounded-full px-8 py-3 font-black bg-gradient-to-r from-purple-600 to-amber-500 text-white shadow-lg shadow-purple-500/20 hover:shadow-xl transition-all">
                Return to Home
              </Button>
            </Link>
          </div>
        </div>
      </main>
    );
  }

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
        return <SectionCommunication {...props} />;
      case 8:
        return <SectionDeclaration {...props} />;
      default:
        return null;
    }
  };

  const currentSectionData = SECTIONS[currentSection];

  return (
    <main className="relative bg-slate-950 overflow-hidden min-h-screen pt-24 md:pt-28">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.02] bg-[url('/islamic-pattern.svg')] bg-center bg-repeat" style={{ backgroundSize: "300px" }} />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[150px]" />
      </div>

      <div className="container mx-auto px-4 xs:px-5 sm:px-6 relative z-10">
        <nav className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 flex items-center gap-2 mb-4 flex-wrap">
          <Link href="/onsite" className="hover:text-amber-500 transition-colors">Home</Link>
          <span className="opacity-30">/</span>
          <span className="text-amber-500">Day Programme</span>
        </nav>

        <section className="py-4 md:py-6">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 text-amber-500 font-black text-xs uppercase tracking-wider mb-3">
                <Sun className="w-4 h-4" />
                Day Programme Application
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter font-heading leading-[1.1] text-white">
                Day{" "}
                <span className="bg-gradient-to-r from-purple-400 to-amber-400 bg-clip-text text-transparent">
                  Admission
                </span>
              </h1>
              <p className="text-sm md:text-base text-slate-300 max-w-2xl mx-auto mt-3">
                Apply for the Day Programme at Daar-ul-Maysaroh.
              </p>
            </div>
          </Reveal>
        </section>

        {submitError && (
          <div className="max-w-4xl mx-auto mb-4 p-4 rounded-xl bg-red-600/20 border border-red-500/30 text-red-300 text-sm">
            {submitError}
          </div>
        )}

        <ProgressIndicator
          sections={SECTIONS}
          currentSection={currentSection}
          setCurrentSection={setCurrentSection}
          isMobile={isMobile}
        />

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
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-purple-600 to-amber-500 flex items-center justify-center shrink-0">
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

                  {renderSection()}

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