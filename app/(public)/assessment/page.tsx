
// // app/assessment/page.tsx
// "use client";

// import { useState } from "react";
// import {
//   Clock,
//   User,
//   Mail,
//   Phone,
//   Sparkles,
//   ArrowRight,
//   CheckCircle2,
//   Loader2,
//   Users,
//   Heart,
//   Crown,
//   Shield,
//   GraduationCap,
//   Globe,
//   Quote,
//   Scroll,
//   ChevronLeft,
//   ChevronRight,
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Reveal } from "@/components/shared/section-animation";
// import Link from "next/link";
// import { toast } from "sonner";
// import { cn } from "@/lib/utils";
// import { motion, AnimatePresence } from "framer-motion";

// // Dean Abubakar Al-Maysariy
// const DEAN = {
//   name: "Shaykh Abubakar Al-Maysariy",
//   title: "Dean of Academic Affairs & Chief Scholar",
//   credentials: "Ijazah in Qira'at",
//   experience: "15+ years",
//   students: "500+",
//   sanad: "Unbroken chain to Prophet Muhammad (ﷺ)",
//   image: "أ",
//   bio: "Shaykh Abubakar personally oversees every student's assessment, ensuring each receives a tailored learning path with proper teacher matching.",
//   quote: "Every soul has a unique path to the Quran. My duty is to illuminate that path for you.",
// };

// // Time slots
// const TIME_SLOTS = [
//   "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM",
//   "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM",
//   "01:00 PM", "01:30 PM", "02:00 PM", "02:30 PM",
//   "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM",
// ];

// // Formspree Endpoint
// const FORMSPREE_ENDPOINT = "https://formspree.io/f/xjgjrobk";

// export default function AssessmentPage() {
//   const [step, setStep] = useState(1);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [isSuccess, setIsSuccess] = useState(false);
//   const [selectedDate, setSelectedDate] = useState("");
//   const [selectedTime, setSelectedTime] = useState("");
//   const [formData, setFormData] = useState({
//     fullName: "",
//     email: "",
//     phone: "",
//     age: "",
//     country: "",
//     currentLevel: "",
//     programInterest: "",
//     notes: "",
//   });

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
//   ) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     const formDataToSend = new FormData();
//     formDataToSend.append("fullName", formData.fullName);
//     formDataToSend.append("email", formData.email);
//     formDataToSend.append("phone", formData.phone);
//     formDataToSend.append("age", formData.age);
//     formDataToSend.append("country", formData.country);
//     formDataToSend.append("currentLevel", formData.currentLevel);
//     formDataToSend.append("programInterest", formData.programInterest);
//     formDataToSend.append("preferredDate", selectedDate);
//     formDataToSend.append("preferredTime", selectedTime);
//     formDataToSend.append("notes", formData.notes);
//     formDataToSend.append("_subject", "[Al-Maysaroh] Assessment Request");

//     try {
//       const response = await fetch(FORMSPREE_ENDPOINT, {
//         method: "POST",
//         body: formDataToSend,
//         headers: { Accept: "application/json" },
//       });

//       if (response.ok) {
//         setIsSuccess(true);
//         toast.success("Assessment Request Submitted!", {
//           description: "Shaykh Abubakar's office will contact you within 24 hours.",
//         });
//       } else {
//         toast.error("Submission Failed", {
//           description: "Please check your information and try again.",
//         });
//       }
//     } catch (error) {
//       toast.error("Network Error", {
//         description: "Please check your connection and try again.",
//       });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const getNext7Days = () => {
//     const days = [];
//     const today = new Date();
//     for (let i = 1; i <= 7; i++) {
//       const date = new Date(today);
//       date.setDate(today.getDate() + i);
//       days.push(date);
//     }
//     return days;
//   };

//   const days = getNext7Days();
  
//   const canProceed = () => {
//     if (step === 1) return formData.fullName && formData.email && formData.phone;
//     if (step === 2) return formData.currentLevel && formData.programInterest;
//     if (step === 3) return selectedDate && selectedTime;
//     return true;
//   };

//   const nextStep = () => setStep((prev) => prev + 1);
//   const prevStep = () => setStep((prev) => prev - 1);

//   if (isSuccess) {
//     return (
//       <main className="min-h-screen bg-background flex items-center justify-center py-20 sm:py-40 px-3 xs:px-4">
//         <motion.div
//           initial={{ opacity: 0, scale: 0.95 }}
//           animate={{ opacity: 1, scale: 1 }}
//           className="bg-card rounded-xl sm:rounded-2xl border border-border hover:border-purple-300 transition-all p-6 sm:p-8 md:p-12 text-center max-w-xl w-full mx-auto shadow-xl"
//         >
//           <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-5 sm:mb-6 rounded-full bg-linear-to-br from-purple-100 to-amber-100 dark:from-purple-900/30 dark:to-amber-900/30 flex items-center justify-center">
//             <CheckCircle2 className="w-10 h-10 sm:w-12 sm:h-12 text-purple-600" />
//           </div>
//           <h1 className="text-2xl xs:text-3xl sm:text-4xl font-black mb-3 sm:mb-4">
//             Assessment Request{" "}
//             <span className="bg-gradient-to-r from-purple-600 to-amber-600 bg-clip-text text-transparent">
//               Received!
//             </span>
//           </h1>
//           <p className="text-muted-foreground text-sm sm:text-base mb-6">
//             Shaykh Abubakar's office will contact you within 24 hours to
//             schedule your personalized assessment session.
//           </p>

//           <div className="p-5 sm:p-6 rounded-xl bg-gradient-to-br from-purple-50/50 to-amber-50/50 dark:from-purple-950/30 dark:to-amber-950/30 border border-purple-200 dark:border-purple-800 mb-6 text-left">
//             <h3 className="font-black text-sm mb-4 flex items-center gap-2">
//               <Crown className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500" />
//               <span className="bg-gradient-to-r from-purple-600 to-amber-600 bg-clip-text text-transparent">
//                 Your Journey Ahead
//               </span>
//             </h3>
//             <div className="space-y-3">
//               {[
//                 "Dean's office confirms your 20-minute assessment slot",
//                 "Meet Shaykh Abubakar for personal level evaluation",
//                 "Receive tailored teacher matching based on your level",
//                 "Begin your sacred journey with the perfect guide",
//               ].map((text, idx) => (
//                 <div key={idx} className="flex gap-3 items-start group">
//                   <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-600 to-purple-700 text-white flex items-center justify-center text-[10px] font-black shrink-0 mt-0.5 shadow-md group-hover:scale-110 transition-transform">
//                     {idx + 1}
//                   </div>
//                   <p className="text-xs sm:text-sm font-medium leading-relaxed">{text}</p>
//                 </div>
//               ))}
//             </div>
//           </div>

//           <div className="flex flex-col xs:flex-row gap-3 justify-center">
//             <Link href="/" className="w-full xs:w-auto">
//               <Button variant="outline" className="w-full rounded-full px-6 py-2.5 border-purple-300 text-purple-600 hover:bg-purple-50">
//                 Return Home
//               </Button>
//             </Link>
//             <Link href="/courses" className="w-full xs:w-auto">
//               <Button className="w-full rounded-full px-6 py-2.5 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white">
//                 Explore Programs
//               </Button>
//             </Link>
//           </div>
//         </motion.div>
//       </main>
//     );
//   }

//   return (
//     <main className="min-h-screen bg-background overflow-hidden py-12 sm:py-20 md:py-24 lg:py-32">
//       {/* Background Elements */}
//       <div className="fixed inset-0 pointer-events-none">
//         <div className="absolute inset-0 opacity-[0.02] bg-[url('/islamic-pattern.svg')] bg-center bg-repeat" style={{ backgroundSize: "300px" }} />
//         <div className="absolute top-0 right-0 w-64 h-64 sm:w-96 sm:h-96 bg-purple-600/5 rounded-full blur-3xl" />
//         <div className="absolute bottom-0 left-0 w-64 h-64 sm:w-96 sm:h-96 bg-amber-500/5 rounded-full blur-3xl" />
//       </div>

//       <div className="container mx-auto px-3 xs:px-4 sm:px-6">
//         {/* Hero Section */}
//         <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 md:mb-16">
//           <Reveal>
//             <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 text-[8px] sm:text-[10px] font-black uppercase tracking-wider mb-3 sm:mb-4 border border-amber-200 dark:border-amber-800">
//               <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
//               Free Service • No Commitment
//             </div>
//             <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter font-heading leading-[1.1] mb-3 sm:mb-4 px-2">
//               Your{" "}
//               <span className="bg-gradient-to-r from-purple-600 via-purple-700 to-amber-600 bg-clip-text text-transparent">
//                 Sacred Journey
//               </span>
//               <br className="hidden xs:block" />
//               Begins Here
//             </h1>
//             <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto px-4">
//               Receive a personal assessment from Shaykh Abubakar Al-Maysariy.
//               Get evaluated, matched with the perfect teacher, and start your
//               path to Quranic mastery.
//             </p>
//           </Reveal>
//         </div>

//         {/* Dean Profile Card */}
//         <Reveal delay={0.1}>
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             className="max-w-4xl mx-auto mb-8 sm:mb-12 md:mb-16"
//           >
//             <div className="bg-card rounded-xl sm:rounded-2xl border-2 border-purple-600/20 hover:border-purple-600/30 transition-all p-5 sm:p-6 md:p-8 overflow-hidden shadow-xl">
//               <div className="h-1 bg-gradient-to-r from-amber-500 via-purple-600 to-amber-500 -mt-5 sm:-mt-6 md:-mt-8 mb-5 sm:mb-6 md:mb-8" />

//               <div className="flex flex-col md:flex-row gap-6 items-center md:items-start text-center md:text-left">
//                 <div className="relative shrink-0">
//                   <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-purple-600 rounded-full blur opacity-30" />
//                   <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full bg-gradient-to-br from-purple-600 to-purple-700 flex items-center justify-center text-white text-3xl sm:text-4xl font-black shadow-2xl">
//                     {DEAN.image}
//                   </div>
//                   <div className="absolute -bottom-1 -right-1 bg-amber-500 rounded-full p-1 shadow-lg">
//                     <Crown className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
//                   </div>
//                 </div>

//                 <div className="flex-1">
//                   <div className="inline-flex items-center gap-2 px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 mb-2">
//                     <Shield className="w-3 h-3 text-amber-500" />
//                     <span className="text-[8px] font-black text-amber-600 uppercase tracking-wider">
//                       Dean of Academic Affairs
//                     </span>
//                   </div>

//                   <h2 className="text-xl sm:text-2xl md:text-3xl font-black mb-1">
//                     {DEAN.name}
//                   </h2>
//                   <p className="text-purple-600 font-black text-xs mb-3">
//                     {DEAN.credentials}
//                   </p>

//                   <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-3">
//                     <div className="flex items-center gap-1 text-[10px] bg-muted/30 px-2 py-1 rounded-full">
//                       <GraduationCap className="w-3 h-3 text-purple-600" />
//                       <span>{DEAN.experience}</span>
//                     </div>
//                     <div className="flex items-center gap-1 text-[10px] bg-muted/30 px-2 py-1 rounded-full">
//                       <Users className="w-3 h-3 text-purple-600" />
//                       <span>{DEAN.students} Students</span>
//                     </div>
//                     <div className="flex items-center gap-1 text-[10px] bg-muted/30 px-2 py-1 rounded-full">
//                       <Scroll className="w-3 h-3 text-amber-500" />
//                       <span className="truncate max-w-[100px]">
//                         Sanad: {DEAN.sanad.substring(0, 20)}...
//                       </span>
//                     </div>
//                   </div>

//                   <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed mb-3">
//                     {DEAN.bio}
//                   </p>

//                   <div className="relative pt-2">
//                     <Quote className="absolute -top-1 -left-1 w-4 h-4 text-amber-500/20" />
//                     <p className="text-xs italic text-muted-foreground/80 pl-4">
//                       "{DEAN.quote}"
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </motion.div>
//         </Reveal>

//         {/* Multi-Step Form */}
//         <div className="max-w-4xl mx-auto">
//           {/* Progress Steps */}
//           <div className="flex items-center justify-center mb-6 sm:mb-8">
//             {[1, 2, 3].map((s) => (
//               <div key={s} className="flex items-center">
//                 <div
//                   className={cn(
//                     "w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-black text-xs sm:text-sm transition-all",
//                     step >= s
//                       ? "bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-md"
//                       : "bg-muted text-muted-foreground",
//                   )}
//                 >
//                   {step > s ? <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5" /> : s}
//                 </div>
//                 {s < 3 && (
//                   <div
//                     className={cn(
//                       "w-8 sm:w-12 md:w-16 h-0.5 mx-1 sm:mx-2",
//                       step > s ? "bg-gradient-to-r from-purple-600 to-amber-500" : "bg-muted",
//                     )}
//                   />
//                 )}
//               </div>
//             ))}
//           </div>

//           {/* Form Card */}
//           <div className="bg-card rounded-xl sm:rounded-2xl border border-border hover:border-purple-300 transition-all p-5 sm:p-6 md:p-8 lg:p-10 shadow-lg">
//             <form onSubmit={handleSubmit}>
//               <input type="text" name="_gotcha" style={{ display: "none" }} />

//               <AnimatePresence mode="wait">
//                 {/* Step 1: Personal Information */}
//                 {step === 1 && (
//                   <motion.div
//                     key="step1"
//                     initial={{ opacity: 0, x: 20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     exit={{ opacity: 0, x: -20 }}
//                     transition={{ duration: 0.3 }}
//                     className="space-y-4 sm:space-y-5"
//                   >
//                     <div className="text-center mb-4 sm:mb-6">
//                       <h2 className="text-xl sm:text-2xl font-black mb-1 bg-gradient-to-r from-purple-600 to-amber-600 bg-clip-text text-transparent">
//                         Tell us about yourself
//                       </h2>
//                       <p className="text-xs sm:text-sm text-muted-foreground">
//                         We'll match you with the right scholar
//                       </p>
//                     </div>

//                     <div className="space-y-3 sm:space-y-4">
//                       <div className="space-y-1.5">
//                         <label className="text-[10px] sm:text-xs font-black uppercase tracking-wider">
//                           Full Name *
//                         </label>
//                         <div className="relative">
//                           <User className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-500" />
//                           <input
//                             name="fullName"
//                             value={formData.fullName}
//                             onChange={handleChange}
//                             required
//                             placeholder="Enter your full name"
//                             className="w-full h-10 sm:h-11 pl-9 pr-3 rounded-xl border-2 border-border focus:border-purple-500 outline-none transition-all bg-background text-sm"
//                           />
//                         </div>
//                       </div>

//                       <div className="space-y-1.5">
//                         <label className="text-[10px] sm:text-xs font-black uppercase tracking-wider">
//                           Email *
//                         </label>
//                         <div className="relative">
//                           <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-500" />
//                           <input
//                             name="email"
//                             type="email"
//                             value={formData.email}
//                             onChange={handleChange}
//                             required
//                             placeholder="your@email.com"
//                             className="w-full h-10 sm:h-11 pl-9 pr-3 rounded-xl border-2 border-border focus:border-purple-500 outline-none transition-all bg-background text-sm"
//                           />
//                         </div>
//                       </div>

//                       <div className="space-y-1.5">
//                         <label className="text-[10px] sm:text-xs font-black uppercase tracking-wider">
//                           Phone *
//                         </label>
//                         <div className="relative">
//                           <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-500" />
//                           <input
//                             name="phone"
//                             type="tel"
//                             value={formData.phone}
//                             onChange={handleChange}
//                             required
//                             placeholder="+123 456 7890"
//                             className="w-full h-10 sm:h-11 pl-9 pr-3 rounded-xl border-2 border-border focus:border-purple-500 outline-none transition-all bg-background text-sm"
//                           />
//                         </div>
//                       </div>

//                       <div className="grid grid-cols-2 gap-3">
//                         <div className="space-y-1.5">
//                           <label className="text-[10px] sm:text-xs font-black uppercase tracking-wider">
//                             Age
//                           </label>
//                           <input
//                             name="age"
//                             type="number"
//                             value={formData.age}
//                             onChange={handleChange}
//                             placeholder="Age"
//                             min="1"
//                             max="120"
//                             className="w-full h-10 sm:h-11 px-3 rounded-xl border-2 border-border focus:border-purple-500 outline-none transition-all bg-background text-sm"
//                           />
//                         </div>

//                         <div className="space-y-1.5">
//                           <label className="text-[10px] sm:text-xs font-black uppercase tracking-wider">
//                             Country
//                           </label>
//                           <div className="relative">
//                             <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-500" />
//                             <input
//                               name="country"
//                               value={formData.country}
//                               onChange={handleChange}
//                               placeholder="Your country"
//                               className="w-full h-10 sm:h-11 pl-9 pr-3 rounded-xl border-2 border-border focus:border-purple-500 outline-none transition-all bg-background text-sm"
//                             />
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </motion.div>
//                 )}

//                 {/* Step 2: Academic Information */}
//                 {step === 2 && (
//                   <motion.div
//                     key="step2"
//                     initial={{ opacity: 0, x: 20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     exit={{ opacity: 0, x: -20 }}
//                     transition={{ duration: 0.3 }}
//                     className="space-y-4 sm:space-y-5"
//                   >
//                     <div className="text-center mb-4 sm:mb-6">
//                       <h2 className="text-xl sm:text-2xl font-black mb-1 bg-gradient-to-r from-purple-600 to-amber-600 bg-clip-text text-transparent">
//                         Your Academic Background
//                       </h2>
//                       <p className="text-xs sm:text-sm text-muted-foreground">
//                         Help us understand your current level
//                       </p>
//                     </div>

//                     <div className="space-y-3 sm:space-y-4">
//                       <div className="space-y-1.5">
//                         <label className="text-[10px] sm:text-xs font-black uppercase tracking-wider">
//                           Program Interest *
//                         </label>
//                         <select
//                           name="programInterest"
//                           value={formData.programInterest}
//                           onChange={handleChange}
//                           required
//                           className="w-full h-10 sm:h-11 px-3 rounded-xl border-2 border-border focus:border-purple-500 outline-none transition-all bg-background text-sm"
//                         >
//                           <option value="">Select a program</option>
//                           <option value="hifz">Hifz Al-Quran</option>
//                           <option value="qiroah">Qiro'ah Al-Quran</option>
//                           <option value="tajweed">Tajweed Mastery</option>
//                           <option value="arabic">Quranic Arabic</option>
//                           <option value="tafsir">Tafsir Studies</option>
//                           <option value="group-qiroah">Group Qiro'ah (Children)</option>
//                           <option value="juz-amma">Juz Amma (Children)</option>
//                         </select>
//                       </div>

//                       <div className="space-y-1.5">
//                         <label className="text-[10px] sm:text-xs font-black uppercase tracking-wider">
//                           Current Quran Reading Level *
//                         </label>
//                         <select
//                           name="currentLevel"
//                           value={formData.currentLevel}
//                           onChange={handleChange}
//                           required
//                           className="w-full h-10 sm:h-11 px-3 rounded-xl border-2 border-border focus:border-purple-500 outline-none transition-all bg-background text-sm"
//                         >
//                           <option value="">Select your level</option>
//                           <option value="beginner">Beginner - Cannot read Arabic</option>
//                           <option value="some">Some Knowledge - Can read slowly</option>
//                           <option value="intermediate">Intermediate - Can read fluently</option>
//                           <option value="advanced">Advanced - Some memorization</option>
//                           <option value="master">Master - Complete Quran / Ijazah candidate</option>
//                         </select>
//                       </div>

//                       <div className="space-y-1.5">
//                         <label className="text-[10px] sm:text-xs font-black uppercase tracking-wider">
//                           Additional Notes (Optional)
//                         </label>
//                         <textarea
//                           name="notes"
//                           value={formData.notes}
//                           onChange={handleChange}
//                           rows={3}
//                           placeholder="Any specific questions, goals, or areas you'd like to focus on?"
//                           className="w-full p-3 rounded-xl border-2 border-border focus:border-purple-500 outline-none transition-all resize-none bg-background text-sm"
//                         />
//                       </div>
//                     </div>
//                   </motion.div>
//                 )}

//                 {/* Step 3: Schedule */}
//                 {step === 3 && (
//                   <motion.div
//                     key="step3"
//                     initial={{ opacity: 0, x: 20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     exit={{ opacity: 0, x: -20 }}
//                     transition={{ duration: 0.3 }}
//                     className="space-y-4 sm:space-y-5"
//                   >
//                     <div className="text-center mb-4 sm:mb-6">
//                       <h2 className="text-xl sm:text-2xl font-black mb-1 bg-gradient-to-r from-purple-600 to-amber-600 bg-clip-text text-transparent">
//                         Schedule Your Assessment
//                       </h2>
//                       <p className="text-xs sm:text-sm text-muted-foreground">
//                         Choose a preferred date and time
//                       </p>
//                     </div>

//                     <div className="space-y-4 sm:space-y-5">
//                       {/* Date Selection */}
//                       <div>
//                         <label className="text-[10px] sm:text-xs font-black uppercase tracking-wider mb-2 block">
//                           Select Date *
//                         </label>
//                         <div className="overflow-x-auto pb-2 -mx-1 px-1">
//                           <div className="flex gap-2 min-w-max">
//                             {days.map((date, idx) => (
//                               <button
//                                 key={idx}
//                                 type="button"
//                                 onClick={() => setSelectedDate(date.toLocaleDateString())}
//                                 className={cn(
//                                   "p-2 sm:p-3 rounded-xl border-2 text-center transition-all shrink-0 w-14 sm:w-20",
//                                   selectedDate === date.toLocaleDateString()
//                                     ? "border-purple-600 bg-purple-600/5 shadow-md"
//                                     : "border-border hover:border-purple-600/30",
//                                 )}
//                               >
//                                 <p className="text-[9px] sm:text-[10px] font-black">
//                                   {date.toLocaleDateString("en-US", { weekday: "short" })}
//                                 </p>
//                                 <p className="text-base sm:text-lg font-black">
//                                   {date.getDate()}
//                                 </p>
//                                 <p className="text-[7px] sm:text-[8px] text-muted-foreground">
//                                   {date.toLocaleDateString("en-US", { month: "short" })}
//                                 </p>
//                               </button>
//                             ))}
//                           </div>
//                         </div>
//                       </div>

//                       {/* Time Selection */}
//                       <div>
//                         <label className="text-[10px] sm:text-xs font-black uppercase tracking-wider mb-2 block">
//                           Select Time *
//                         </label>
//                         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
//                           {TIME_SLOTS.map((time) => (
//                             <button
//                               key={time}
//                               type="button"
//                               onClick={() => setSelectedTime(time)}
//                               className={cn(
//                                 "p-2 sm:p-3 rounded-xl border-2 text-center transition-all text-xs sm:text-sm",
//                                 selectedTime === time
//                                   ? "border-purple-600 bg-purple-600/5 text-purple-600 font-black"
//                                   : "border-border hover:border-purple-600/30",
//                               )}
//                             >
//                               {time}
//                             </button>
//                           ))}
//                         </div>
//                       </div>
//                     </div>
//                   </motion.div>
//                 )}
//               </AnimatePresence>

//               {/* Navigation Buttons */}
//               <div className="flex flex-col xs:flex-row justify-between gap-3 mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-border/50">
//                 {step > 1 && (
//                   <Button
//                     type="button"
//                     onClick={prevStep}
//                     variant="outline"
//                     className="rounded-full px-5 sm:px-6 py-2 sm:py-2.5 font-black text-sm border-purple-300 text-purple-600 hover:bg-purple-50 order-2 xs:order-1"
//                   >
//                     <ChevronLeft className="w-3.5 h-3.5 mr-1" />
//                     Back
//                   </Button>
//                 )}
//                 {step < 3 ? (
//                   <Button
//                     type="button"
//                     onClick={nextStep}
//                     disabled={!canProceed()}
//                     className={cn(
//                       "rounded-full px-5 sm:px-6 py-2 sm:py-2.5 font-black text-sm bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white order-1 xs:order-2",
//                       !canProceed() && "opacity-50 cursor-not-allowed",
//                       step === 1 && "ml-auto"
//                     )}
//                   >
//                     Continue
//                     <ChevronRight className="w-3.5 h-3.5 ml-1" />
//                   </Button>
//                 ) : (
//                   <Button
//                     type="submit"
//                     disabled={!canProceed() || isSubmitting}
//                     className="rounded-full px-5 sm:px-6 py-2 sm:py-2.5 font-black text-sm bg-gradient-to-r from-purple-600 to-amber-600 hover:from-purple-700 hover:to-amber-700 text-white order-1 xs:order-2 ml-auto"
//                   >
//                     {isSubmitting ? (
//                       <Loader2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 animate-spin" />
//                     ) : (
//                       <>
//                         Submit Request
//                         <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-1" />
//                       </>
//                     )}
//                   </Button>
//                 )}
//               </div>
//             </form>
//           </div>

//           {/* Trust Indicators */}
//           <div className="mt-6 sm:mt-8 grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 text-center">
//             {[
//               { icon: Crown, label: "Dean-Led", value: "Personally assessed", color: "amber" },
//               { icon: Users, label: "Teacher Matching", value: "Perfect fit", color: "purple" },
//               { icon: Clock, label: "20-Minute", value: "Focused", color: "amber" },
//               { icon: Heart, label: "Free", value: "No commitment", color: "purple" },
//             ].map((item, idx) => {
//               const Icon = item.icon;
//               return (
//                 <motion.div
//                   key={idx}
//                   initial={{ opacity: 0, y: 10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 0.3 + idx * 0.1 }}
//                   className="p-2 sm:p-3 rounded-xl bg-muted/20 border border-border/50 hover:border-purple-300 transition-all"
//                 >
//                   <Icon className={`w-4 h-4 sm:w-5 sm:h-5 mx-auto mb-1 text-${item.color === 'purple' ? 'purple-600' : 'amber-500'}`} />
//                   <p className="text-[9px] sm:text-[10px] font-black">{item.label}</p>
//                   <p className="text-[7px] sm:text-[8px] text-muted-foreground">{item.value}</p>
//                 </motion.div>
//               );
//             })}
//           </div>

//           {/* Sanad Callout */}
//           <div className="mt-6 text-center">
//             <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800">
//               <Scroll className="w-3 h-3 text-amber-500" />
//               <p className="text-[7px] sm:text-[8px] font-black uppercase tracking-wider text-muted-foreground">
//                 Complete Sanad • Unbroken Chain to Prophet Muhammad (ﷺ)
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// }














// app/assessment/page.tsx
"use client";

import { useState, useEffect } from "react";
import {
  Clock,
  User,
  Mail,
  Phone,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Loader2,
  Users,
  Heart,
  Crown,
  Shield,
  GraduationCap,
  Globe,
  Quote,
  Scroll,
  ChevronLeft,
  ChevronRight,
  Calendar,
  MapPin,
  Languages,
  Video,
  Mic,
  AlertCircle,
  Sun,
  Moon,
  AlertTriangle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/shared/section-animation";
import Link from "next/link";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

// Dean Abubakar Al-Maysariy
const DEAN = {
  name: "Shaykh Abubakar Al-Maysariy",
  title: "Dean of Academic Affairs & Chief Scholar",
  credentials: "Ijazah in Qira'at",
  experience: "15+ years",
  students: "100+",
  sanad: "Unbroken chain to Prophet Muhammad (ﷺ)",
  image: "أ",
  bio: "Shaykh Abubakar personally oversees every student's assessment, ensuring each receives a tailored learning path with proper teacher matching.",
  quote: "Every soul has a unique path to the Quran. My duty is to illuminate that path for you.",
};

// Enhanced Time slots with availability status
const TIME_SLOTS = [
  { time: "09:00 AM", available: true, type: "morning" },
  { time: "09:30 AM", available: true, type: "morning" },
  { time: "10:00 AM", available: true, type: "morning" },
  { time: "10:30 AM", available: true, type: "morning" },
  { time: "11:00 AM", available: true, type: "morning" },
  { time: "11:30 AM", available: true, type: "morning" },
  { time: "12:00 PM", available: true, type: "afternoon" },
  { time: "12:30 PM", available: true, type: "afternoon" },
  { time: "01:00 PM", available: true, type: "afternoon" },
  { time: "01:30 PM", available: true, type: "afternoon" },
  { time: "02:00 PM", available: false, type: "afternoon" }, // Example unavailable slot
  { time: "02:30 PM", available: true, type: "afternoon" },
  { time: "03:00 PM", available: true, type: "afternoon" },
  { time: "03:30 PM", available: true, type: "evening" },
  { time: "04:00 PM", available: true, type: "evening" },
  { time: "04:30 PM", available: true, type: "evening" },
];

// Time zones
const TIME_ZONES = [
  "America/New_York (EST)",
  "America/Chicago (CST)",
  "America/Denver (MST)",
  "America/Los_Angeles (PST)",
  "Europe/London (GMT)",
  "Europe/Paris (CET)",
  "Asia/Dubai (GST)",
  "Asia/Riyadh (AST)",
  "Asia/Karachi (PKT)",
  "Asia/Kolkata (IST)",
  "Asia/Jakarta (WIB)",
  "Australia/Sydney (AEST)",
  "Africa/Lagos (WAT)",
  "Africa/Cairo (EET)",
  "Africa/Johannesburg (SAST)",
];

// Assessment types
const ASSESSMENT_TYPES = [
  { value: "video", label: "Video Call (Zoom/Google Meet)", icon: Video, recommended: true },
  { value: "audio", label: "Audio Call Only", icon: Mic, recommended: false },
  { value: "inperson", label: "In-Person (Limited Locations)", icon: MapPin, recommended: false },
];

// Languages
const LANGUAGES = [
  { value: "english", label: "English", fluency: "Native/Professional" },
  { value: "arabic", label: "Arabic", fluency: "Native/Professional" },
  // { value: "urdu", label: "Urdu", fluency: "Fluent" },
  // { value: "hindi", label: "Hindi", fluency: "Fluent" },
  // { value: "bengali", label: "Bengali", fluency: "Fluent" },
  // { value: "french", label: "French", fluency: "Fluent" },
  { value: "hausa", label: "Hausa", fluency: "Fluent" },
  { value: "yoruba", label: "Yoruba", fluency: "Fluent" },
];

// How did you hear options
const HEAR_OPTIONS = [
  "Search Engine (Google/Bing)",
  "Social Media (Instagram/Facebook)",
  "YouTube",
  "Friend or Family",
  "Email Newsletter",
  "Advertisement",
  "Podcast",
  "Other",
];

// Formspree Endpoint
const FORMSPREE_ENDPOINT = "https://formspree.io/f/xjgjrobk";

export default function AssessmentPage() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [userTimeZone, setUserTimeZone] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isLoadingAvailability, setIsLoadingAvailability] = useState(false);
  
  const [formData, setFormData] = useState({
    // Personal Information
    fullName: "",
    email: "",
    phone: "",
    emergencyPhone: "",
    age: "",
    country: "",
    city: "",
    timeZone: "",
    
    // Academic Information
    currentLevel: "",
    programInterest: "",
    previousStudy: "",
    goals: "",
    
    // Assessment Preferences
    assessmentType: "video",
    preferredLanguage: "english",
    accessibilityNeeds: "",
    
    // Additional
    howDidYouHear: "",
    referralCode: "",
    notes: "",
    
    // Consent
    agreeTerms: false,
    agreeContact: false,
  });

  // Auto-detect user's time zone
  useEffect(() => {
    const detectedTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const formattedTimeZone = TIME_ZONES.find(tz => tz.includes(detectedTimeZone.split('/')[1])) || TIME_ZONES[0];
    setUserTimeZone(formattedTimeZone);
    setFormData(prev => ({ ...prev, timeZone: formattedTimeZone }));
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    validateField(name, formData[name as keyof typeof formData] as string);
  };

  const validateField = (name: string, value: string) => {
    let error = "";
    
    switch (name) {
      case "fullName":
        if (!value.trim()) error = "Full name is required";
        else if (value.length < 2) error = "Name must be at least 2 characters";
        break;
      case "email":
        if (!value.trim()) error = "Email is required";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = "Invalid email format";
        break;
      case "phone":
        if (!value.trim()) error = "Phone number is required";
        else if (!/^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,6}[-\s\.]?[0-9]{1,6}$/.test(value)) 
          error = "Invalid phone number";
        break;
      case "currentLevel":
        if (!value) error = "Please select your current level";
        break;
      case "programInterest":
        if (!value) error = "Please select a program";
        break;
    }
    
    setErrors(prev => ({ ...prev, [name]: error }));
    return !error;
  };

  const validateStep = () => {
    const fieldsToValidate = step === 1 
      ? ["fullName", "email", "phone"]
      : step === 2 
      ? ["currentLevel", "programInterest"]
      : [];
    
    let isValid = true;
    fieldsToValidate.forEach(field => {
      const value = formData[field as keyof typeof formData] as string;
      if (!validateField(field, value)) isValid = false;
    });
    
    if (step === 3) {
      if (!selectedDate) {
        toast.error("Please select a date");
        isValid = false;
      } else if (!selectedTime) {
        toast.error("Please select a time");
        isValid = false;
      }
    }
    
    return isValid;
  };

  const getNext7Days = () => {
    const days = [];
    const today = new Date();
    for (let i = 1; i <= 14; i++) { // Show 14 days instead of 7
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      // Skip weekends if needed (optional)
      // if (date.getDay() === 0 || date.getDay() === 6) continue;
      days.push(date);
    }
    return days;
  };

  const days = getNext7Days();
  
  // Check if a date is available (you can implement logic here)
  const isDateAvailable = (date: Date) => {
    // Example: Block Sundays
    // if (date.getDay() === 0) return false;
    return true;
  };

  const canProceed = () => {
    if (step === 1) return formData.fullName && formData.email && formData.phone && !errors.fullName && !errors.email && !errors.phone;
    if (step === 2) return formData.currentLevel && formData.programInterest;
    if (step === 3) return selectedDate && selectedTime;
    return true;
  };

  const nextStep = () => {
    if (validateStep()) {
      setStep((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const prevStep = () => {
    setStep((prev) => prev - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.agreeTerms) {
      toast.error("Please agree to the Terms & Conditions");
      return;
    }
    
    setIsSubmitting(true);

    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value) formDataToSend.append(key, value.toString());
    });
    formDataToSend.append("preferredDate", selectedDate);
    formDataToSend.append("preferredTime", selectedTime);
    formDataToSend.append("userTimeZone", userTimeZone);
    formDataToSend.append("_subject", `[Al-Maysaroh] Assessment Request - ${formData.fullName}`);
    formDataToSend.append("_replyto", formData.email);

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: formDataToSend,
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        setIsSuccess(true);
        toast.success("Assessment Request Submitted!", {
          description: "Shaykh Abubakar's office will contact you within 24 hours.",
          duration: 5000,
        });
      } else {
        throw new Error("Submission failed");
      }
    } catch (error) {
      toast.error("Submission Failed", {
        description: "Please check your information and try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Get time slots by period
  const morningSlots = TIME_SLOTS.filter(slot => slot.type === "morning" && slot.available);
  const afternoonSlots = TIME_SLOTS.filter(slot => slot.type === "afternoon" && slot.available);
  const eveningSlots = TIME_SLOTS.filter(slot => slot.type === "evening" && slot.available);

  if (isSuccess) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center py-20 sm:py-40 px-3 xs:px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-card rounded-xl sm:rounded-2xl border border-border hover:border-purple-300 transition-all p-6 sm:p-8 md:p-12 text-center max-w-xl w-full mx-auto shadow-xl"
        >
          <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-5 sm:mb-6 rounded-full bg-linear-to-br from-purple-100 to-amber-100 dark:from-purple-900/30 dark:to-amber-900/30 flex items-center justify-center">
            <CheckCircle2 className="w-10 h-10 sm:w-12 sm:h-12 text-purple-600" />
          </div>
          <h1 className="text-2xl xs:text-3xl sm:text-4xl font-black mb-3 sm:mb-4">
            Assessment Request{" "}
            <span className="bg-linear-to-r from-purple-600 to-amber-600 bg-clip-text text-transparent">
              Received!
            </span>
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base mb-6">
            {`Shaykh Abubakar's office will contact you within 24 hours to
            schedule your personalized assessment session.`}
          </p>

          {/* Confirmation Details */}
          <div className="p-4 sm:p-5 rounded-xl bg-linear-to-br from-purple-50/50 to-amber-50/50 dark:from-purple-950/30 dark:to-amber-950/30 border border-purple-200 dark:border-purple-800 mb-6 text-left">
            <h3 className="font-black text-sm mb-3 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-amber-500" />
              <span className="bg-linear-to-r from-purple-600 to-amber-600 bg-clip-text text-transparent">
                Request Details
              </span>
            </h3>
            <div className="space-y-2 text-sm">
              <p><span className="font-black">Preferred Date:</span> {selectedDate}</p>
              <p><span className="font-black">Preferred Time:</span> {selectedTime}</p>
              <p><span className="font-black">Assessment Type:</span> {ASSESSMENT_TYPES.find(t => t.value === formData.assessmentType)?.label}</p>
            </div>
          </div>

          <div className="p-5 sm:p-6 rounded-xl bg-linear-to-br from-purple-50/50 to-amber-50/50 dark:from-purple-950/30 dark:to-amber-950/30 border border-purple-200 dark:border-purple-800 mb-6 text-left">
            <h3 className="font-black text-sm mb-4 flex items-center gap-2">
              <Crown className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500" />
              <span className="bg-linear-to-r from-purple-600 to-amber-600 bg-clip-text text-transparent">
                Your Journey Ahead
              </span>
            </h3>
            <div className="space-y-3">
              {[
                "Dean's office confirms your 20-minute assessment slot",
                "Meet Shaykh Abubakar for personal level evaluation",
                "Receive tailored teacher matching based on your level",
                "Begin your sacred journey with the perfect guide",
              ].map((text, idx) => (
                <div key={idx} className="flex gap-3 items-start group">
                  <div className="w-6 h-6 rounded-full bg-linear-to-r from-purple-600 to-purple-700 text-white flex items-center justify-center text-[10px] font-black shrink-0 mt-0.5 shadow-md group-hover:scale-110 transition-transform">
                    {idx + 1}
                  </div>
                  <p className="text-xs sm:text-sm font-medium leading-relaxed">{text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col xs:flex-row gap-3 justify-center">
            <Link href="/" className="w-full xs:w-auto">
              <Button variant="outline" className="w-full rounded-full px-6 py-2.5 border-purple-300 text-purple-600 hover:bg-purple-50">
                Return Home
              </Button>
            </Link>
            <Link href="/courses" className="w-full xs:w-auto">
              <Button className="w-full rounded-full px-6 py-2.5 bg-linear-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white">
                Explore Programs
              </Button>
            </Link>
          </div>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background overflow-hidden py-30 sm:py-30 md:py-24 lg:py-32">
      {/* Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.02] bg-[url('/islamic-pattern.svg')] bg-center bg-repeat" style={{ backgroundSize: "300px" }} />
        <div className="absolute top-0 right-0 w-64 h-64 sm:w-96 sm:h-96 bg-purple-600/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 sm:w-96 sm:h-96 bg-amber-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-3 xs:px-4 sm:px-6">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 md:mb-16">
          <Reveal>
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 text-[8px] sm:text-[10px] font-black uppercase tracking-wider mb-3 sm:mb-4 border border-amber-200 dark:border-amber-800">
              <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
              Free Service • No Commitment • 20-Minute Session
            </div>
            <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter font-heading leading-[1.1] mb-3 sm:mb-4 px-2">
              Your{" "}
              <span className="bg-linear-to-r from-purple-600 via-purple-700 to-amber-600 bg-clip-text text-transparent">
                Sacred Journey
              </span>
              <br className="hidden xs:block" />
              Begins Here
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto px-4">
              Receive a personal assessment from Shaykh Abubakar Al-Maysariy.
              Get evaluated, matched with the perfect teacher, and start your
              path to Quranic mastery.
            </p>
          </Reveal>
        </div>

        {/* Dean Profile Card */}
        <Reveal delay={0.1}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto mb-8 sm:mb-12 md:mb-16"
          >
            <div className="bg-card rounded-xl sm:rounded-2xl border-2 border-purple-600/20 hover:border-purple-600/30 transition-all p-5 sm:p-6 md:p-8 overflow-hidden shadow-xl">
              <div className="h-1 bg-linear-to-r from-amber-500 via-purple-600 to-amber-500 -mt-5 sm:-mt-6 md:-mt-8 mb-5 sm:mb-6 md:mb-8" />

              <div className="flex flex-col md:flex-row gap-6 items-center md:items-start text-center md:text-left">
                <div className="relative shrink-0">
                  <div className="absolute -inset-1 bg-linear-to-r from-amber-500 to-purple-600 rounded-full blur opacity-30" />
                  <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full bg-linear-to-br from-purple-600 to-purple-700 flex items-center justify-center text-white text-3xl sm:text-4xl font-black shadow-2xl">
                    {DEAN.image}
                  </div>
                  <div className="absolute -bottom-1 -right-1 bg-amber-500 rounded-full p-1 shadow-lg">
                    <Crown className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                  </div>
                </div>

                <div className="flex-1">
                  <div className="inline-flex items-center gap-2 px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 mb-2">
                    <Shield className="w-3 h-3 text-amber-500" />
                    <span className="text-[8px] font-black text-amber-600 uppercase tracking-wider">
                      Dean of Academic Affairs
                    </span>
                  </div>

                  <h2 className="text-xl sm:text-2xl md:text-3xl font-black mb-1">
                    {DEAN.name}
                  </h2>
                  <p className="text-purple-600 font-black text-xs mb-3">
                    {DEAN.credentials}
                  </p>

                  <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-3">
                    <div className="flex items-center gap-1 text-[10px] bg-muted/30 px-2 py-1 rounded-full">
                      <GraduationCap className="w-3 h-3 text-purple-600" />
                      <span>{DEAN.experience}</span>
                    </div>
                    <div className="flex items-center gap-1 text-[10px] bg-muted/30 px-2 py-1 rounded-full">
                      <Users className="w-3 h-3 text-purple-600" />
                      <span>{DEAN.students} Students</span>
                    </div>
                    <div className="flex items-center gap-1 text-[10px] bg-muted/30 px-2 py-1 rounded-full">
                      <Scroll className="w-3 h-3 text-amber-500" />
                      <span className="truncate max-w-[100px]">
                        Sanad: {DEAN.sanad.substring(0, 20)}...
                      </span>
                    </div>
                  </div>

                  <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed mb-3">
                    {DEAN.bio}
                  </p>

                  <div className="relative pt-2">
                    <Quote className="absolute -top-1 -left-1 w-4 h-4 text-amber-500/20" />
                    <p className="text-xs italic text-muted-foreground/80 pl-4">
                     {` "${DEAN.quote}"`}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </Reveal>

        {/* Multi-Step Form */}
        <div className="max-w-4xl mx-auto">
          {/* Progress Steps */}
          <div className="flex items-center justify-center mb-6 sm:mb-8">
            {[
              { step: 1, label: "Personal Info" },
              { step: 2, label: "Academic" },
              { step: 3, label: "Schedule" },
            ].map((s) => (
              <div key={s.step} className="flex items-center">
                <div
                  className={cn(
                    "w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-black text-xs sm:text-sm transition-all",
                    step >= s.step
                      ? "bg-linear-to-r from-purple-600 to-purple-700 text-white shadow-md"
                      : "bg-muted text-muted-foreground",
                  )}
                >
                  {step > s.step ? <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5" /> : s.step}
                </div>
                <span className="hidden sm:block text-[10px] font-black ml-1 text-muted-foreground">
                  {s.label}
                </span>
                {s.step < 3 && (
                  <div
                    className={cn(
                      "w-8 sm:w-12 md:w-16 h-0.5 mx-1 sm:mx-2",
                      step > s.step ? "bg-linear-to-r from-purple-600 to-amber-500" : "bg-muted",
                    )}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Form Card */}
          <div className="bg-card rounded-xl sm:rounded-2xl border border-border hover:border-purple-300 transition-all p-5 sm:p-6 md:p-8 lg:p-10 shadow-lg">
            <form onSubmit={handleSubmit}>
              <input type="text" name="_gotcha" style={{ display: "none" }} />

              <AnimatePresence mode="wait">
                {/* Step 1: Personal Information - Enhanced */}
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4 sm:space-y-5"
                  >
                    <div className="text-center mb-4 sm:mb-6">
                      <h2 className="text-xl sm:text-2xl font-black mb-1 bg-linear-to-r from-purple-600 to-amber-600 bg-clip-text text-transparent">
                        Tell us about yourself
                      </h2>
                      <p className="text-xs sm:text-sm text-muted-foreground">
                       {` We'll match you with the right scholar`}
                      </p>
                    </div>

                    <div className="space-y-3 sm:space-y-4">
                      {/* Full Name */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] sm:text-xs font-black uppercase tracking-wider">
                          Full Name <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-500" />
                          <input
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            required
                            placeholder="Enter your full name"
                            className={cn(
                              "w-full h-10 sm:h-11 pl-9 pr-3 rounded-xl border-2 transition-all bg-background text-sm",
                              errors.fullName && touched.fullName
                                ? "border-red-500 focus:border-red-500"
                                : "border-border focus:border-purple-500"
                            )}
                          />
                        </div>
                        {errors.fullName && touched.fullName && (
                          <p className="text-[10px] text-red-500 mt-1 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            {errors.fullName}
                          </p>
                        )}
                      </div>

                      {/* Email */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] sm:text-xs font-black uppercase tracking-wider">
                          Email <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-500" />
                          <input
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            required
                            placeholder="your@email.com"
                            className={cn(
                              "w-full h-10 sm:h-11 pl-9 pr-3 rounded-xl border-2 transition-all bg-background text-sm",
                              errors.email && touched.email
                                ? "border-red-500 focus:border-red-500"
                                : "border-border focus:border-purple-500"
                            )}
                          />
                        </div>
                        {errors.email && touched.email && (
                          <p className="text-[10px] text-red-500 mt-1 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            {errors.email}
                          </p>
                        )}
                      </div>

                      {/* Phone */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] sm:text-xs font-black uppercase tracking-wider">
                          Phone Number <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-500" />
                          <input
                            name="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            required
                            placeholder="+123 456 7890"
                            className={cn(
                              "w-full h-10 sm:h-11 pl-9 pr-3 rounded-xl border-2 transition-all bg-background text-sm",
                              errors.phone && touched.phone
                                ? "border-red-500 focus:border-red-500"
                                : "border-border focus:border-purple-500"
                            )}
                          />
                        </div>
                        {errors.phone && touched.phone && (
                          <p className="text-[10px] text-red-500 mt-1 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            {errors.phone}
                          </p>
                        )}
                      </div>

                      {/* Emergency Phone - NEW */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] sm:text-xs font-black uppercase tracking-wider">
                          Emergency Contact Phone <span className="text-amber-500">(Optional)</span>
                        </label>
                        <div className="relative">
                          <AlertTriangle className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-500" />
                          <input
                            name="emergencyPhone"
                            value={formData.emergencyPhone}
                            onChange={handleChange}
                            placeholder="Emergency contact number"
                            className="w-full h-10 sm:h-11 pl-9 pr-3 rounded-xl border-2 border-border focus:border-purple-500 outline-none transition-all bg-background text-sm"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        {/* Age */}
                        <div className="space-y-1.5">
                          <label className="text-[10px] sm:text-xs font-black uppercase tracking-wider">
                            Age
                          </label>
                          <input
                            name="age"
                            type="number"
                            value={formData.age}
                            onChange={handleChange}
                            placeholder="Age"
                            min="1"
                            max="120"
                            className="w-full h-10 sm:h-11 px-3 rounded-xl border-2 border-border focus:border-purple-500 outline-none transition-all bg-background text-sm"
                          />
                        </div>

                        {/* Country */}
                        <div className="space-y-1.5">
                          <label className="text-[10px] sm:text-xs font-black uppercase tracking-wider">
                            Country
                          </label>
                          <div className="relative">
                            <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-500" />
                            <input
                              name="country"
                              value={formData.country}
                              onChange={handleChange}
                              placeholder="Your country"
                              className="w-full h-10 sm:h-11 pl-9 pr-3 rounded-xl border-2 border-border focus:border-purple-500 outline-none transition-all bg-background text-sm"
                            />
                          </div>
                        </div>
                      </div>

                      {/* City - NEW */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] sm:text-xs font-black uppercase tracking-wider">
                          City
                        </label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-500" />
                          <input
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            placeholder="Your city"
                            className="w-full h-10 sm:h-11 pl-9 pr-3 rounded-xl border-2 border-border focus:border-purple-500 outline-none transition-all bg-background text-sm"
                          />
                        </div>
                      </div>

                      {/* Time Zone - Auto-detected */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] sm:text-xs font-black uppercase tracking-wider">
                          Time Zone
                        </label>
                        <div className="relative">
                          <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-500" />
                          <select
                            name="timeZone"
                            value={formData.timeZone}
                            onChange={handleChange}
                            className="w-full h-10 sm:h-11 pl-9 pr-3 rounded-xl border-2 border-border focus:border-purple-500 outline-none transition-all bg-background text-sm"
                          >
                            {TIME_ZONES.map((tz) => (
                              <option key={tz} value={tz}>{tz}</option>
                            ))}
                          </select>
                        </div>
                        <p className="text-[8px] text-muted-foreground">
                          Detected: {userTimeZone} • Used for scheduling
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Academic Information - Enhanced */}
                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4 sm:space-y-5"
                  >
                    <div className="text-center mb-4 sm:mb-6">
                      <h2 className="text-xl sm:text-2xl font-black mb-1 bg-linear-to-r from-purple-600 to-amber-600 bg-clip-text text-transparent">
                        Your Academic Background
                      </h2>
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        Help us understand your current level
                      </p>
                    </div>

                    <div className="space-y-3 sm:space-y-4">
                      {/* Program Interest */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] sm:text-xs font-black uppercase tracking-wider">
                          Program of Interest <span className="text-red-500">*</span>
                        </label>
                        <select
                          name="programInterest"
                          value={formData.programInterest}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          required
                          className={cn(
                            "w-full h-10 sm:h-11 px-3 rounded-xl border-2 transition-all bg-background text-sm",
                            errors.programInterest && touched.programInterest
                              ? "border-red-500 focus:border-red-500"
                              : "border-border focus:border-purple-500"
                          )}
                        >
                          <option value="">Select a program</option>
                          <option value="hifz">Hifz Al-Quran (Full Memorization)</option>
                          <option value="qiroah">{`Qiro'ah Al-Quran (Reading)`}</option>
                          <option value="tajweed">Tajweed Mastery</option>
                          <option value="juz-amma">{`Muroja'ah`}</option>
                          <option value="arabic">Quranic Arabic</option>
                          <option value="tafsir">Tafsir Studies</option>
                          <option value="group-qiroah">{`Group Qiro'ah`}</option>
                          <option value="juz-amma">{`Group Tajweed`}</option>
                        </select>
                        {errors.programInterest && touched.programInterest && (
                          <p className="text-[10px] text-red-500 mt-1 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            {errors.programInterest}
                          </p>
                        )}
                      </div>

                      {/* Current Level */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] sm:text-xs font-black uppercase tracking-wider">
                          Current Quran Reading Level <span className="text-red-500">*</span>
                        </label>
                        <select
                          name="currentLevel"
                          value={formData.currentLevel}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          required
                          className={cn(
                            "w-full h-10 sm:h-11 px-3 rounded-xl border-2 transition-all bg-background text-sm",
                            errors.currentLevel && touched.currentLevel
                              ? "border-red-500 focus:border-red-500"
                              : "border-border focus:border-purple-500"
                          )}
                        >
                          <option value="">Select your level</option>
                          <option value="beginner">Beginner - Cannot read Arabic</option>
                          <option value="some">Some Knowledge - Can read slowly</option>
                          <option value="intermediate">Intermediate - Can read fluently</option>
                          <option value="advanced">Advanced - Some memorization</option>
                          <option value="master">Master - Complete Quran / Ijazah candidate</option>
                        </select>
                        {errors.currentLevel && touched.currentLevel && (
                          <p className="text-[10px] text-red-500 mt-1 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            {errors.currentLevel}
                          </p>
                        )}
                      </div>

                      {/* Assessment Type - NEW */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] sm:text-xs font-black uppercase tracking-wider">
                          Preferred Assessment Method
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                          {ASSESSMENT_TYPES.map((type) => {
                            const Icon = type.icon;
                            return (
                              <button
                                key={type.value}
                                type="button"
                                onClick={() => setFormData(prev => ({ ...prev, assessmentType: type.value }))}
                                className={cn(
                                  "p-2 sm:p-3 rounded-xl border-2 text-center transition-all",
                                  formData.assessmentType === type.value
                                    ? "border-purple-600 bg-purple-600/5"
                                    : "border-border hover:border-purple-600/30"
                                )}
                              >
                                <Icon className="w-4 h-4 sm:w-5 sm:h-5 mx-auto mb-1 text-purple-600" />
                                <p className="text-[9px] sm:text-[10px] font-black">{type.label}</p>
                                {type.recommended && (
                                  <span className="text-[7px] text-amber-500 font-black">Recommended</span>
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Preferred Language - NEW */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] sm:text-xs font-black uppercase tracking-wider">
                          Preferred Language
                        </label>
                        <div className="relative">
                          <Languages className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-500" />
                          <select
                            name="preferredLanguage"
                            value={formData.preferredLanguage}
                            onChange={handleChange}
                            className="w-full h-10 sm:h-11 pl-9 pr-3 rounded-xl border-2 border-border focus:border-purple-500 outline-none transition-all bg-background text-sm"
                          >
                            {LANGUAGES.map((lang) => (
                              <option key={lang.value} value={lang.value}>
                                {lang.label} ({lang.fluency})
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {/* Previous Study */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] sm:text-xs font-black uppercase tracking-wider">
                          Previous Quran Study
                        </label>
                        <textarea
                          name="previousStudy"
                          value={formData.previousStudy}
                          onChange={handleChange}
                          rows={2}
                          placeholder="Describe any previous Quran study experience..."
                          className="w-full p-3 rounded-xl border-2 border-border focus:border-purple-500 outline-none transition-all resize-none bg-background text-sm"
                        />
                      </div>

                      {/* Goals */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] sm:text-xs font-black uppercase tracking-wider">
                          Your Goals
                        </label>
                        <textarea
                          name="goals"
                          value={formData.goals}
                          onChange={handleChange}
                          rows={2}
                          placeholder="What are your goals for studying with us?"
                          className="w-full p-3 rounded-xl border-2 border-border focus:border-purple-500 outline-none transition-all resize-none bg-background text-sm"
                        />
                      </div>

                      {/* How did you hear - NEW */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] sm:text-xs font-black uppercase tracking-wider">
                          How did you hear about us?
                        </label>
                        <select
                          name="howDidYouHear"
                          value={formData.howDidYouHear}
                          onChange={handleChange}
                          className="w-full h-10 sm:h-11 px-3 rounded-xl border-2 border-border focus:border-purple-500 outline-none transition-all bg-background text-sm"
                        >
                          <option value="">Select an option</option>
                          {HEAR_OPTIONS.map((option) => (
                            <option key={option} value={option}>{option}</option>
                          ))}
                        </select>
                      </div>

                      {/* Accessibility Needs - NEW */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] sm:text-xs font-black uppercase tracking-wider">
                          Accessibility Needs <span className="text-amber-500">(Optional)</span>
                        </label>
                        <textarea
                          name="accessibilityNeeds"
                          value={formData.accessibilityNeeds}
                          onChange={handleChange}
                          rows={2}
                          placeholder="Any accessibility requirements we should know about?"
                          className="w-full p-3 rounded-xl border-2 border-border focus:border-purple-500 outline-none transition-all resize-none bg-background text-sm"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Schedule - Enhanced Calendar View */}
                {step === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4 sm:space-y-5"
                  >
                    <div className="text-center mb-4 sm:mb-6">
                      <h2 className="text-xl sm:text-2xl font-black mb-1 bg-linear-to-r from-purple-600 to-amber-600 bg-clip-text text-transparent">
                        Schedule Your Assessment
                      </h2>
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        Choose a preferred date and time (All times in {formData.timeZone})
                      </p>
                    </div>

                    <div className="space-y-4 sm:space-y-5">
                      {/* Enhanced Date Selection */}
                      <div>
                        <label className="text-[10px] sm:text-xs font-black uppercase tracking-wider mb-2 block">
                          Select Date <span className="text-red-500">*</span>
                        </label>
                        <div className="overflow-x-auto pb-2 -mx-1 px-1">
                          <div className="flex gap-2 min-w-max">
                            {days.map((date, idx) => {
                              const isAvailable = isDateAvailable(date);
                              const isSelected = selectedDate === date.toLocaleDateString();
                              return (
                                <button
                                  key={idx}
                                  type="button"
                                  onClick={() => isAvailable && setSelectedDate(date.toLocaleDateString())}
                                  disabled={!isAvailable}
                                  className={cn(
                                    "p-2 sm:p-3 rounded-xl border-2 text-center transition-all shrink-0 w-14 sm:w-20",
                                    isSelected
                                      ? "border-purple-600 bg-purple-600/5 shadow-md"
                                      : isAvailable
                                      ? "border-border hover:border-purple-600/30"
                                      : "border-border bg-muted/30 cursor-not-allowed opacity-50",
                                  )}
                                >
                                  <p className="text-[9px] sm:text-[10px] font-black">
                                    {date.toLocaleDateString("en-US", { weekday: "short" })}
                                  </p>
                                  <p className="text-base sm:text-lg font-black">
                                    {date.getDate()}
                                  </p>
                                  <p className="text-[7px] sm:text-[8px] text-muted-foreground">
                                    {date.toLocaleDateString("en-US", { month: "short" })}
                                  </p>
                                  {!isAvailable && (
                                    <p className="text-[6px] text-red-500 mt-1">Full</p>
                                  )}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      </div>

                      {/* Enhanced Time Selection with Categories */}
                      {selectedDate && (
                        <div>
                          <label className="text-[10px] sm:text-xs font-black uppercase tracking-wider mb-2 block">
                            Select Time <span className="text-red-500">*</span>
                          </label>
                          
                          {/* Morning Slots */}
                          {morningSlots.length > 0 && (
                            <div className="mb-4">
                              <div className="flex items-center gap-2 mb-2">
                                <Sun className="w-3 h-3 text-amber-500" />
                                <span className="text-[9px] font-black uppercase tracking-wider text-muted-foreground">Morning</span>
                              </div>
                              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                                {morningSlots.map((slot) => (
                                  <button
                                    key={slot.time}
                                    type="button"
                                    onClick={() => setSelectedTime(slot.time)}
                                    className={cn(
                                      "p-2 sm:p-3 rounded-xl border-2 text-center transition-all text-xs sm:text-sm",
                                      selectedTime === slot.time
                                        ? "border-purple-600 bg-purple-600/5 text-purple-600 font-black"
                                        : "border-border hover:border-purple-600/30",
                                    )}
                                  >
                                    {slot.time}
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Afternoon Slots */}
                          {afternoonSlots.length > 0 && (
                            <div className="mb-4">
                              <div className="flex items-center gap-2 mb-2">
                                <Sun className="w-3 h-3 text-orange-500" />
                                <span className="text-[9px] font-black uppercase tracking-wider text-muted-foreground">Afternoon</span>
                              </div>
                              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                                {afternoonSlots.map((slot) => (
                                  <button
                                    key={slot.time}
                                    type="button"
                                    onClick={() => setSelectedTime(slot.time)}
                                    className={cn(
                                      "p-2 sm:p-3 rounded-xl border-2 text-center transition-all text-xs sm:text-sm",
                                      selectedTime === slot.time
                                        ? "border-purple-600 bg-purple-600/5 text-purple-600 font-black"
                                        : "border-border hover:border-purple-600/30",
                                    )}
                                  >
                                    {slot.time}
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Evening Slots */}
                          {eveningSlots.length > 0 && (
                            <div>
                              <div className="flex items-center gap-2 mb-2">
                                <Moon className="w-3 h-3 text-blue-500" />
                                <span className="text-[9px] font-black uppercase tracking-wider text-muted-foreground">Evening</span>
                              </div>
                              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                                {eveningSlots.map((slot) => (
                                  <button
                                    key={slot.time}
                                    type="button"
                                    onClick={() => setSelectedTime(slot.time)}
                                    className={cn(
                                      "p-2 sm:p-3 rounded-xl border-2 text-center transition-all text-xs sm:text-sm",
                                      selectedTime === slot.time
                                        ? "border-purple-600 bg-purple-600/5 text-purple-600 font-black"
                                        : "border-border hover:border-purple-600/30",
                                    )}
                                  >
                                    {slot.time}
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Selected Summary */}
                      {selectedDate && selectedTime && (
                        <div className="p-3 rounded-lg bg-linear-to-r from-purple-50 to-amber-50 dark:from-purple-950/30 dark:to-amber-950/30 border border-purple-200">
                          <p className="text-xs text-center">
                            <span className="font-black">Selected:</span> {selectedDate} at {selectedTime} ({formData.timeZone})
                          </p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Navigation Buttons */}
              <div className="flex flex-col xs:flex-row justify-between gap-3 mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-border/50">
                {step > 1 && (
                  <Button
                    type="button"
                    onClick={prevStep}
                    variant="outline"
                    className="rounded-full px-5 sm:px-6 py-2 sm:py-2.5 font-black text-sm border-purple-300 text-purple-600 hover:bg-purple-50 order-2 xs:order-1"
                  >
                    <ChevronLeft className="w-3.5 h-3.5 mr-1" />
                    Back
                  </Button>
                )}
                {step < 3 ? (
                  <Button
                    type="button"
                    onClick={nextStep}
                    disabled={!canProceed()}
                    className={cn(
                      "rounded-full px-5 sm:px-6 py-2 sm:py-2.5 font-black text-sm bg-linear-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white order-1 xs:order-2",
                      !canProceed() && "opacity-50 cursor-not-allowed",
                      step === 1 && "ml-auto"
                    )}
                  >
                    Continue
                    <ChevronRight className="w-3.5 h-3.5 ml-1" />
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    disabled={!canProceed() || isSubmitting || !formData.agreeTerms}
                    className="rounded-full px-5 sm:px-6 py-2 sm:py-2.5 font-black text-sm bg-linear-to-r from-purple-600 to-amber-600 hover:from-purple-700 hover:to-amber-700 text-white order-1 xs:order-2 ml-auto"
                  >
                    {isSubmitting ? (
                      <Loader2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 animate-spin" />
                    ) : (
                      <>
                        Submit Request
                        <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-1" />
                      </>
                    )}
                  </Button>
                )}
              </div>

              {/* Terms & Conditions - Moved to Step 3 */}
              {step === 3 && (
                <div className="mt-6 space-y-3 pt-4 border-t border-border/50">
                  <div className="flex items-start gap-2 sm:gap-3">
                    <input
                      type="checkbox"
                      id="agreeTerms"
                      checked={formData.agreeTerms}
                      onChange={(e) => setFormData(prev => ({ ...prev, agreeTerms: e.target.checked }))}
                      className="mt-0.5 w-4 h-4 rounded border-purple-300 text-purple-600 focus:ring-purple-500"
                    />
                    <label htmlFor="agreeTerms" className="text-xs sm:text-sm font-medium cursor-pointer leading-relaxed">
                      I agree to the{" "}
                      <Link href="/legal" className="text-purple-600 font-black hover:underline">
                        Terms & Conditions
                      </Link>{" "}
                      and{" "}
                      <Link href="/privacy" className="text-purple-600 font-black hover:underline">
                        Privacy Policy
                      </Link>{" "}
                      <span className="text-red-500">*</span>
                    </label>
                  </div>

                  <div className="flex items-start gap-2 sm:gap-3">
                    <input
                      type="checkbox"
                      id="agreeContact"
                      checked={formData.agreeContact}
                      onChange={(e) => setFormData(prev => ({ ...prev, agreeContact: e.target.checked }))}
                      className="mt-0.5 w-4 h-4 rounded border-purple-300 text-purple-600 focus:ring-purple-500"
                    />
                    <label htmlFor="agreeContact" className="text-xs sm:text-sm font-medium cursor-pointer leading-relaxed">
                      I agree to receive communications about my assessment via email and SMS
                    </label>
                  </div>
                </div>
              )}
            </form>
          </div>

          {/* Trust Indicators */}
          <div className="mt-6 sm:mt-8 grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 text-center">
            {[
              { icon: Crown, label: "Dean-Led", value: "Personally assessed", color: "amber" },
              { icon: Users, label: "Teacher Matching", value: "Perfect fit", color: "purple" },
              { icon: Clock, label: "20-Minute", value: "Focused session", color: "amber" },
              { icon: Heart, label: "Free", value: "No commitment", color: "purple" },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + idx * 0.1 }}
                  className="p-2 sm:p-3 rounded-xl bg-muted/20 border border-border/50 hover:border-purple-300 transition-all"
                >
                  <Icon className={`w-4 h-4 sm:w-5 sm:h-5 mx-auto mb-1 text-${item.color === 'purple' ? 'purple-600' : 'amber-500'}`} />
                  <p className="text-[9px] sm:text-[10px] font-black">{item.label}</p>
                  <p className="text-[7px] sm:text-[8px] text-muted-foreground">{item.value}</p>
                </motion.div>
              );
            })}
          </div>

          {/* Sanad Callout */}
          <div className="mt-6 text-center">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800">
              <Scroll className="w-3 h-3 text-amber-500" />
              <p className="text-[7px] sm:text-[8px] font-black uppercase tracking-wider text-muted-foreground">
                Complete Sanad • Unbroken Chain to Prophet Muhammad (ﷺ)
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}