// "use client";

// // ============= IMPORTS =============
// import { useState, useEffect, useCallback, useMemo, useRef } from "react";
// import {
//   motion,
//   useScroll,
//   useTransform,
//   AnimatePresence,
// } from "framer-motion";
// import {
//   Calendar,
//   CreditCard,
//   Banknote,
//   CheckCircle2,
//   Shield,
//   Users,
//   Clock,
//   BookOpen,
//   Sparkles,
//   Award,
//   ArrowRight,
//   FileText,
//   Mail,
//   Phone,
//   User,
//   MapPin,
//   Loader2,
//   AlertCircle,
//   Check,
//   Globe,
//   Heart,
//   GraduationCap,
//   Star,
//   TrendingUp,
//   Zap,
//   Lock,
//   Eye,
//   EyeOff,
//   Send,
//   MessageCircle,
//   Building,
//   School,
//   ChevronDown,
//   Menu,
//   X,
//   Sun,
//   Moon,
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import Link from "next/link";
// import { toast, Toaster } from "sonner";
// import { useForm, Controller } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";
// import PhoneInput from "react-phone-input-2";
// import "react-phone-input-2/lib/style.css";

// // ============= TYPES & SCHEMAS =============

// // Form validation schema with Zod
// const admissionSchema = z.object({
//   fullName: z
//     .string()
//     .min(2, "Name must be at least 2 characters")
//     .max(100, "Name must be less than 100 characters")
//     .regex(
//       /^[a-zA-Z\s\-']+$/,
//       "Name can only contain letters, spaces, hyphens, and apostrophes",
//     ),
//   email: z
//     .string()
//     .email("Invalid email address")
//     .max(100, "Email must be less than 100 characters"),
//   phone: z
//     .string()
//     .min(8, "Valid phone number required")
//     .max(20, "Phone number too long"),
//   country: z.string().min(1, "Please select your country"),
//   program: z.string().min(1, "Please select a program"),
//   message: z
//     .string()
//     .max(500, "Message must be less than 500 characters")
//     .optional(),
//   preferredTime: z.string().optional(),
//   newsletterOptIn: z.boolean().optional(),
// });

// type AdmissionFormData = z.infer<typeof admissionSchema>;

// // Program data with enhanced structure
// const PROGRAMS = {
//   qiroahAdult: {
//     id: "qiroah-adult",
//     name: "Qiro'ah Al-Quran (Adult)",
//     category: "Quran Reading",
//     price: "$2.25+",
//     duration: "Flexible",
//     level: "Beginner to Advanced",
//     popular: true,
//     features: [
//       "Individual pacing",
//       "Regular assessments",
//       "Certificate upon completion",
//     ],
//     icon: BookOpen,
//   },
//   qiroahChildren: {
//     id: "qiroah-children",
//     name: "Group Qiro'ah - Children",
//     category: "Children",
//     price: "$2+",
//     duration: "6 months",
//     level: "Beginner",
//     popular: true,
//     features: ["Fun activities", "Peer learning", "Progress tracking"],
//     icon: Users,
//   },
//   hifz: {
//     id: "hifz",
//     name: "Hifz Al-Quran",
//     category: "Memorization",
//     price: "$2.25+",
//     duration: "2-5 years",
//     level: "Intermediate",
//     popular: true,
//     features: ["Revision system", "Ijazah track", "Weekly tests"],
//     icon: Award,
//   },
//   tajweed: {
//     id: "tajweed",
//     name: "Tajweed Al-Itqan",
//     category: "Tajweed",
//     price: "$2+",
//     duration: "6-12 months",
//     level: "Intermediate",
//     popular: false,
//     features: ["Rule mastery", "Practice sessions", "Error correction"],
//     icon: Star,
//   },
//   arabic: {
//     id: "arabic",
//     name: "Quranic Arabic",
//     category: "Arabic",
//     price: "$2+",
//     duration: "9-12 months",
//     level: "Beginner",
//     popular: false,
//     features: ["Vocabulary building", "Grammar basics", "Quranic context"],
//     icon: Globe,
//   },
//   ijazah: {
//     id: "ijazah",
//     name: "Ijazah Certification",
//     category: "Advanced",
//     price: "$3+",
//     duration: "Variable",
//     level: "Advanced",
//     popular: false,
//     features: ["Sanad chain", "Teacher authorization", "Global recognition"],
//     icon: Shield,
//   },
// };

// // Countries data
// const COUNTRIES = [
//   { code: "US", name: "United States", dialCode: "1" },
//   { code: "GB", name: "United Kingdom", dialCode: "44" },
//   { code: "CA", name: "Canada", dialCode: "1" },
//   { code: "AU", name: "Australia", dialCode: "61" },
//   { code: "NG", name: "Nigeria", dialCode: "234" },
//   { code: "ZA", name: "South Africa", dialCode: "27" },
//   { code: "EG", name: "Egypt", dialCode: "20" },
//   { code: "SA", name: "Saudi Arabia", dialCode: "966" },
//   { code: "AE", name: "UAE", dialCode: "971" },
//   { code: "PK", name: "Pakistan", dialCode: "92" },
//   { code: "IN", name: "India", dialCode: "91" },
//   { code: "MY", name: "Malaysia", dialCode: "60" },
//   { code: "ID", name: "Indonesia", dialCode: "62" },
//   { code: "TR", name: "Turkey", dialCode: "90" },
//   { code: "MA", name: "Morocco", dialCode: "212" },
//   { code: "JO", name: "Jordan", dialCode: "962" },
//   { code: "KW", name: "Kuwait", dialCode: "965" },
//   { code: "QA", name: "Qatar", dialCode: "974" },
//   { code: "BH", name: "Bahrain", dialCode: "973" },
//   { code: "OM", name: "Oman", dialCode: "968" },
//   { code: "LB", name: "Lebanon", dialCode: "961" },
//   { code: "PS", name: "Palestine", dialCode: "970" },
//   { code: "SY", name: "Syria", dialCode: "963" },
//   { code: "IQ", name: "Iraq", dialCode: "964" },
//   { code: "YE", name: "Yemen", dialCode: "967" },
//   { code: "SD", name: "Sudan", dialCode: "249" },
//   { code: "LY", name: "Libya", dialCode: "218" },
//   { code: "TN", name: "Tunisia", dialCode: "216" },
//   { code: "DZ", name: "Algeria", dialCode: "213" },
//   { code: "FR", name: "France", dialCode: "33" },
//   { code: "DE", name: "Germany", dialCode: "49" },
//   { code: "NL", name: "Netherlands", dialCode: "31" },
//   { code: "SE", name: "Sweden", dialCode: "46" },
//   { code: "NO", name: "Norway", dialCode: "47" },
//   { code: "DK", name: "Denmark", dialCode: "45" },
//   { code: "FI", name: "Finland", dialCode: "358" },
//   { code: "CH", name: "Switzerland", dialCode: "41" },
//   { code: "AT", name: "Austria", dialCode: "43" },
//   { code: "BE", name: "Belgium", dialCode: "32" },
//   { code: "ES", name: "Spain", dialCode: "34" },
//   { code: "IT", name: "Italy", dialCode: "39" },
//   { code: "PT", name: "Portugal", dialCode: "351" },
//   { code: "GR", name: "Greece", dialCode: "30" },
//   { code: "PL", name: "Poland", dialCode: "48" },
//   { code: "RU", name: "Russia", dialCode: "7" },
//   { code: "CN", name: "China", dialCode: "86" },
//   { code: "JP", name: "Japan", dialCode: "81" },
//   { code: "KR", name: "South Korea", dialCode: "82" },
//   { code: "BR", name: "Brazil", dialCode: "55" },
//   { code: "MX", name: "Mexico", dialCode: "52" },
//   { code: "AR", name: "Argentina", dialCode: "54" },
//   { code: "CL", name: "Chile", dialCode: "56" },
//   { code: "PE", name: "Peru", dialCode: "51" },
//   { code: "CO", name: "Colombia", dialCode: "57" },
//   { code: "VE", name: "Venezuela", dialCode: "58" },
//   { code: "Other", name: "Other", dialCode: "" },
// ];

// // Timezone options
// const TIMEZONES = [
//   "EST (Eastern Time)",
//   "CST (Central Time)",
//   "MST (Mountain Time)",
//   "PST (Pacific Time)",
//   "GMT (London)",
//   "CET (Central Europe)",
//   "EET (Eastern Europe)",
//   "GST (Gulf)",
//   "AST (Arabia)",
//   "IST (India)",
//   "PKT (Pakistan)",
//   "AWST (Australia West)",
//   "AEST (Australia East)",
//   "JST (Japan)",
//   "NZST (New Zealand)",
// ];

// // ============= CUSTOM HOOKS =============

// // Dark mode hook
// const useDarkMode = () => {
//   const [isDark, setIsDark] = useState(false);

//   useEffect(() => {
//     const isDarkMode =
//       localStorage.getItem("darkMode") === "true" ||
//       window.matchMedia("(prefers-color-scheme: dark)").matches;
//     setIsDark(isDarkMode);
//     if (isDarkMode) document.documentElement.classList.add("dark");
//   }, []);

//   const toggleDarkMode = useCallback(() => {
//     setIsDark((prev) => {
//       const newValue = !prev;
//       localStorage.setItem("darkMode", String(newValue));
//       if (newValue) document.documentElement.classList.add("dark");
//       else document.documentElement.classList.remove("dark");
//       return newValue;
//     });
//   }, []);

//   return { isDark, toggleDarkMode };
// };

// // Scroll progress hook
// const useScrollProgress = () => {
//   const [progress, setProgress] = useState(0);

//   useEffect(() => {
//     const updateProgress = () => {
//       const scrollTop = window.scrollY;
//       const docHeight =
//         document.documentElement.scrollHeight - window.innerHeight;
//       const scrollPercent = (scrollTop / docHeight) * 100;
//       setProgress(scrollPercent);
//     };

//     window.addEventListener("scroll", updateProgress);
//     return () => window.removeEventListener("scroll", updateProgress);
//   }, []);

//   return progress;
// };

// // ============= COMPONENTS =============

// // Animated number counter
// const AnimatedCounter = ({
//   value,
//   label,
//   icon: Icon,
// }: {
//   value: string;
//   label: string;
//   icon: any;
// }) => {
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//       className="p-4 rounded-2xl bg-linear-to-br from-amber-50/50 to-orange-50/50 dark:from-amber-950/20 dark:to-orange-950/20 border border-amber-100 dark:border-amber-800 text-center"
//     >
//       <Icon className="w-5 h-5 text-amber-600 mx-auto mb-2" />
//       <div className="text-2xl sm:text-3xl font-black text-amber-600">
//         {value}
//       </div>
//       <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mt-1">
//         {label}
//       </div>
//     </motion.div>
//   );
// };

// // Progress bar
// const ProgressBar = ({ progress }: { progress: number }) => (
//   <motion.div
//     className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 z-50"
//     initial={{ width: 0 }}
//     animate={{ width: `${progress}%` }}
//     transition={{ duration: 0.1 }}
//   />
// );

// // Toast notification component
// const CustomToast = ({
//   type,
//   title,
//   message,
// }: {
//   type: "success" | "error";
//   title: string;
//   message: string;
// }) => (
//   <div className="flex items-start gap-3 p-4 rounded-xl bg-white dark:bg-gray-800 shadow-xl border border-gray-200 dark:border-gray-700">
//     {type === "success" ? (
//       <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
//     ) : (
//       <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
//     )}
//     <div>
//       <p className="font-black text-sm">{title}</p>
//       <p className="text-xs text-muted-foreground mt-1">{message}</p>
//     </div>
//   </div>
// );

// // ============= MAIN PAGE COMPONENT =============

// export default function AdmissionsPage() {
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [showChat, setShowChat] = useState(false);
//   const [selectedProgram, setSelectedProgram] = useState<string | null>(null);
//   const { isDark, toggleDarkMode } = useDarkMode();
//   const scrollProgress = useScrollProgress();
//   const heroRef = useRef<HTMLElement>(null);

//   const { scrollYProgress } = useScroll({
//     target: heroRef,
//     offset: ["start start", "end start"],
//   });
//   const heroY = useTransform(scrollYProgress, [0, 1], [0, -100]);

//   // React Hook Form setup
//   const {
//     register,
//     handleSubmit,
//     control,
//     formState: { errors },
//     reset,
//     watch,
//     setValue,
//   } = useForm<AdmissionFormData>({
//     resolver: zodResolver(admissionSchema),
//     defaultValues: {
//       fullName: "",
//       email: "",
//       phone: "",
//       country: "",
//       program: "",
//       message: "",
//       preferredTime: "",
//       newsletterOptIn: false,
//     },
//   });

//   const selectedProgramValue = watch("program");

//   // Get program details
//   const getProgramDetails = useCallback((programId: string) => {
//     return Object.values(PROGRAMS).find((p) => p.id === programId);
//   }, []);

//   // Form submission handler
//   const onSubmit = async (data: AdmissionFormData) => {
//     setIsSubmitting(true);

//     const formPayload = new FormData();
//     Object.entries(data).forEach(([key, value]) => {
//       if (value) formPayload.append(key, String(value));
//     });
//     formPayload.append(
//       "_subject",
//       `New Admission: ${data.fullName} - ${data.program}`,
//     );
//     formPayload.append("_replyto", data.email);

//     const endpoint =
//       process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT ||
//       "https://formspree.io/f/mykljjbl";

//     try {
//       const response = await fetch(endpoint, {
//         method: "POST",
//         body: formPayload,
//         headers: { Accept: "application/json" },
//       });

//       if (response.ok) {
//         toast.custom(
//           () => (
//             <CustomToast
//               type="success"
//               title="Application Submitted! 🎉"
//               message="Our admissions council will review your application within 24 hours."
//             />
//           ),
//           { duration: 6000 },
//         );

//         reset();
//         setSelectedProgram(null);
//       } else {
//         throw new Error("Submission failed");
//       }
//     } catch (error) {
//       toast.custom(
//         () => (
//           <CustomToast
//             type="error"
//             title="Submission Failed"
//             message="Please check your information and try again."
//           />
//         ),
//         { duration: 5000 },
//       );
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // Program cards component
//   const ProgramCard = ({
//     program,
//   }: {
//     program: (typeof PROGRAMS)[keyof typeof PROGRAMS];
//   }) => {
//     const Icon = program.icon;
//     const isSelected = selectedProgram === program.id;

//     return (
//       <motion.div
//         whileHover={{ y: -5 }}
//         onClick={() => {
//           setSelectedProgram(program.id);
//           setValue("program", program.id);
//         }}
//         className={`cursor-pointer p-6 rounded-2xl border-2 transition-all ${
//           isSelected
//             ? "border-amber-500 bg-amber-50 dark:bg-amber-950/20 shadow-lg"
//             : "border-border hover:border-amber-300 bg-card"
//         }`}
//       >
//         <div className="flex items-start justify-between mb-4">
//           <div className="w-12 h-12 rounded-xl bg-amber-100 dark:bg-amber-950/50 flex items-center justify-center">
//             <Icon className="w-6 h-6 text-amber-600" />
//           </div>
//           {program.popular && (
//             <span className="text-[9px] font-black px-2 py-1 rounded-full bg-amber-500 text-white">
//               POPULAR
//             </span>
//           )}
//         </div>
//         <h4 className="font-black text-lg mb-1">{program.name}</h4>
//         <p className="text-xs text-muted-foreground mb-3">
//           {program.duration} • {program.level}
//         </p>
//         <div className="text-2xl font-black text-amber-600 mb-3">
//           {program.price}
//         </div>
//         <div className="space-y-1.5">
//           {program.features.slice(0, 2).map((feature, i) => (
//             <div
//               key={i}
//               className="flex items-center gap-2 text-[10px] text-muted-foreground"
//             >
//               <Check className="w-3 h-3 text-amber-500" />
//               {feature}
//             </div>
//           ))}
//         </div>
//       </motion.div>
//     );
//   };

//   return (
//     <>
//       <ProgressBar progress={scrollProgress} />
//       <Toaster position="top-right" richColors closeButton />

//       {/* Dark mode toggle */}
//       <button
//         onClick={toggleDarkMode}
//         className="fixed top-24 right-4 z-50 p-2 rounded-full bg-card border border-border shadow-lg hover:scale-110 transition-transform"
//         aria-label="Toggle dark mode"
//       >
//         {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
//       </button>

//       <main className="relative bg-background overflow-x-hidden">
//         {/* Hero Section */}
//         <section
//           ref={heroRef}
//           className="relative min-h-screen flex items-center"
//         >
//           <motion.div
//             style={{ y: heroY }}
//             className="container mx-auto px-4 sm:px-6 py-20"
//           >
//             <div className="max-w-6xl mx-auto">
//               {/* Animated badge */}
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5 }}
//                 className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-100 dark:bg-amber-950/50 text-amber-700 text-[10px] font-black uppercase tracking-wider mb-8"
//               >
//                 <Sparkles className="w-3.5 h-3.5 animate-pulse" />
//                 2026 Academic Intake Now Open • Limited Slots Available
//               </motion.div>

//               <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
//                 <div>
//                   <motion.h1
//                     initial={{ opacity: 0, x: -30 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ duration: 0.6, delay: 0.1 }}
//                     className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.9] mb-6"
//                   >
//                     Begin Your{" "}
//                     <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-orange-600 to-rose-600">
//                       Sacred Journey
//                     </span>
//                   </motion.h1>

//                   <motion.p
//                     initial={{ opacity: 0, x: -30 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ duration: 0.6, delay: 0.2 }}
//                     className="text-lg sm:text-xl text-muted-foreground leading-relaxed mb-8"
//                   >
//                     Join a global community of learners. Our streamlined
//                     admission process welcomes students from 50+ countries with
//                     flexible payment options.
//                   </motion.p>

//                   <motion.div
//                     initial={{ opacity: 0, y: 30 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.6, delay: 0.3 }}
//                     className="flex flex-col sm:flex-row gap-4"
//                   >
//                     <Button className="rounded-full px-8 py-6 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-black shadow-xl group">
//                       START YOUR APPLICATION
//                       <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
//                     </Button>
//                     <Button
//                       variant="outline"
//                       className="rounded-full px-8 py-6 font-black border-2"
//                     >
//                       REQUEST INFO PACKET
//                     </Button>
//                   </motion.div>
//                 </div>

//                 <motion.div
//                   initial={{ opacity: 0, scale: 0.9 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   transition={{ duration: 0.6, delay: 0.2 }}
//                   className="grid grid-cols-2 gap-4"
//                 >
//                   <AnimatedCounter
//                     value="24-48"
//                     label="Hours Processing"
//                     icon={Clock}
//                   />
//                   <AnimatedCounter value="50+" label="Countries" icon={Globe} />
//                   <AnimatedCounter
//                     value="100%"
//                     label="Online Process"
//                     icon={Shield}
//                   />
//                   <AnimatedCounter
//                     value="95%"
//                     label="Success Rate"
//                     icon={TrendingUp}
//                   />
//                 </motion.div>
//               </div>
//             </div>
//           </motion.div>
//         </section>

//         {/* Programs Section */}
//         <section className="py-20 bg-gradient-to-b from-transparent to-amber-50/10 dark:to-amber-950/5">
//           <div className="container mx-auto px-4 sm:px-6">
//             <div className="text-center max-w-2xl mx-auto mb-12">
//               <h2 className="text-4xl sm:text-5xl font-black tracking-tighter mb-4">
//                 Choose Your{" "}
//                 <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600">
//                   Path
//                 </span>
//               </h2>
//               <p className="text-muted-foreground">
//                 Select the program that aligns with your goals and schedule
//               </p>
//             </div>

//             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {Object.values(PROGRAMS).map((program, idx) => (
//                 <ProgramCard key={idx} program={program} />
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* Application Form Section */}
//         <section id="apply-now" className="py-20 scroll-mt-24">
//           <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
//             <motion.div
//               initial={{ opacity: 0, y: 50 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6 }}
//               className="bg-card/80 backdrop-blur-sm rounded-3xl border border-amber-500/20 p-6 sm:p-8 md:p-12 shadow-2xl"
//             >
//               <div className="text-center mb-10">
//                 <h2 className="text-3xl sm:text-4xl font-black mb-3">
//                   Begin Your Application
//                 </h2>
//                 <p className="text-muted-foreground">
//                   Complete the form below and our admissions team will contact
//                   you within 24 hours
//                 </p>
//               </div>

//               <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
//                 {/* Personal Information */}
//                 <div className="space-y-4">
//                   <h3 className="text-sm font-black uppercase tracking-wider text-amber-600 flex items-center gap-2">
//                     <User className="w-4 h-4" /> Personal Information
//                   </h3>
//                   <div className="grid md:grid-cols-2 gap-5">
//                     <div>
//                       <input
//                         {...register("fullName")}
//                         placeholder="Full Name *"
//                         className={`w-full h-12 px-4 rounded-xl border ${
//                           errors.fullName ? "border-red-500" : "border-border"
//                         } bg-background focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all`}
//                       />
//                       {errors.fullName && (
//                         <p className="text-xs text-red-500 mt-1">
//                           {errors.fullName.message}
//                         </p>
//                       )}
//                     </div>
//                     <div>
//                       <input
//                         {...register("email")}
//                         type="email"
//                         placeholder="Email Address *"
//                         className={`w-full h-12 px-4 rounded-xl border ${
//                           errors.email ? "border-red-500" : "border-border"
//                         } bg-background focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all`}
//                       />
//                       {errors.email && (
//                         <p className="text-xs text-red-500 mt-1">
//                           {errors.email.message}
//                         </p>
//                       )}
//                     </div>
//                     <div>
//                       <Controller
//                         name="phone"
//                         control={control}
//                         render={({ field }) => (
//                           <PhoneInput
//                             country={"us"}
//                             value={field.value}
//                             onChange={field.onChange}
//                             inputClass="!w-full !h-12 !pl-12 !rounded-xl !border-border !bg-background"
//                             containerClass="!w-full"
//                             buttonClass="!rounded-l-xl !border-border"
//                             dropdownClass="!rounded-xl"
//                             enableSearch
//                             searchPlaceholder="Search country..."
//                           />
//                         )}
//                       />
//                       {errors.phone && (
//                         <p className="text-xs text-red-500 mt-1">
//                           {errors.phone.message}
//                         </p>
//                       )}
//                     </div>
//                     <div>
//                       <select
//                         {...register("country")}
//                         className={`w-full h-12 px-4 rounded-xl border ${
//                           errors.country ? "border-red-500" : "border-border"
//                         } bg-background focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all`}
//                       >
//                         <option value="">Select Country *</option>
//                         {COUNTRIES.map((country) => (
//                           <option key={country.code} value={country.name}>
//                             {country.name}{" "}
//                             {country.dialCode && `(+${country.dialCode})`}
//                           </option>
//                         ))}
//                       </select>
//                       {errors.country && (
//                         <p className="text-xs text-red-500 mt-1">
//                           {errors.country.message}
//                         </p>
//                       )}
//                     </div>
//                   </div>
//                 </div>

//                 {/* Program Selection */}
//                 <div className="space-y-4">
//                   <h3 className="text-sm font-black uppercase tracking-wider text-amber-600 flex items-center gap-2">
//                     <GraduationCap className="w-4 h-4" /> Academic Program
//                   </h3>
//                   <div>
//                     <select
//                       {...register("program")}
//                       className={`w-full h-12 px-4 rounded-xl border ${
//                         errors.program ? "border-red-500" : "border-border"
//                       } bg-background focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all`}
//                     >
//                       <option value="">Select a Program *</option>
//                       {Object.values(PROGRAMS).map((program) => (
//                         <option key={program.id} value={program.id}>
//                           {program.name} - {program.price}/month
//                         </option>
//                       ))}
//                     </select>
//                     {errors.program && (
//                       <p className="text-xs text-red-500 mt-1">
//                         {errors.program.message}
//                       </p>
//                     )}
//                   </div>

//                   {selectedProgramValue &&
//                     getProgramDetails(selectedProgramValue) && (
//                       <motion.div
//                         initial={{ opacity: 0, height: 0 }}
//                         animate={{ opacity: 1, height: "auto" }}
//                         className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800"
//                       >
//                         <p className="text-sm font-medium">
//                           {getProgramDetails(selectedProgramValue)?.description}
//                         </p>
//                       </motion.div>
//                     )}
//                 </div>

//                 {/* Additional Information */}
//                 <div className="space-y-4">
//                   <h3 className="text-sm font-black uppercase tracking-wider text-amber-600 flex items-center gap-2">
//                     <MessageCircle className="w-4 h-4" /> Additional Information
//                   </h3>
//                   <div>
//                     <textarea
//                       {...register("message")}
//                       rows={4}
//                       placeholder="Tell us about your goals, current level, or any questions..."
//                       className="w-full p-4 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all resize-none"
//                     />
//                   </div>
//                   <div>
//                     <select
//                       {...register("preferredTime")}
//                       className="w-full h-12 px-4 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
//                     >
//                       <option value="">
//                         Preferred Contact Time (Optional)
//                       </option>
//                       {TIMEZONES.map((tz) => (
//                         <option key={tz} value={tz}>
//                           {tz}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                 </div>

//                 {/* Terms & Submit */}
//                 <div className="space-y-6">
//                   <label className="flex items-center gap-3 cursor-pointer">
//                     <input
//                       type="checkbox"
//                       {...register("newsletterOptIn")}
//                       className="w-4 h-4 rounded border-border text-amber-600 focus:ring-amber-500"
//                     />
//                     <span className="text-xs text-muted-foreground">
//                       I agree to receive updates about my application and
//                       programs
//                     </span>
//                   </label>

//                   <Button
//                     type="submit"
//                     disabled={isSubmitting}
//                     className="w-full rounded-full py-6 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-black text-lg shadow-xl disabled:opacity-70"
//                   >
//                     {isSubmitting ? (
//                       <span className="flex items-center justify-center gap-2">
//                         <Loader2 className="w-5 h-5 animate-spin" />
//                         SUBMITTING APPLICATION...
//                       </span>
//                     ) : (
//                       <span className="flex items-center justify-center gap-2">
//                         SUBMIT APPLICATION
//                         <Send className="w-4 h-4" />
//                       </span>
//                     )}
//                   </Button>

//                   <p className="text-center text-[10px] text-muted-foreground">
//                     By submitting, you agree to our{" "}
//                     <Link
//                       href="/privacy"
//                       className="underline hover:text-amber-600"
//                     >
//                       Privacy Policy
//                     </Link>{" "}
//                     and{" "}
//                     <Link
//                       href="/terms"
//                       className="underline hover:text-amber-600"
//                     >
//                       Terms of Service
//                     </Link>
//                   </p>
//                 </div>
//               </form>
//             </motion.div>
//           </div>
//         </section>

//         {/* Features Section */}
//         <section className="py-20 bg-gradient-to-b from-amber-50/10 to-transparent dark:from-amber-950/5">
//           <div className="container mx-auto px-4 sm:px-6">
//             <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
//               {[
//                 {
//                   icon: Zap,
//                   title: "Fast Processing",
//                   desc: "24-48 hour application review",
//                 },
//                 {
//                   icon: Shield,
//                   title: "Secure Payment",
//                   desc: "Multiple global payment options",
//                 },
//                 {
//                   icon: Users,
//                   title: "Global Community",
//                   desc: "Students from 50+ countries",
//                 },
//                 {
//                   icon: Award,
//                   title: "Certified Teachers",
//                   desc: "Qualified Ijazah holders",
//                 },
//                 {
//                   icon: Calendar,
//                   title: "Flexible Schedule",
//                   desc: "Learn at your own pace",
//                 },
//                 {
//                   icon: Heart,
//                   title: "Supportive Environment",
//                   desc: "Personalized attention",
//                 },
//               ].map((feature, idx) => (
//                 <motion.div
//                   key={idx}
//                   initial={{ opacity: 0, y: 20 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   transition={{ delay: idx * 0.1 }}
//                   className="text-center p-6 rounded-2xl bg-card border border-border hover:border-amber-300 transition-all"
//                 >
//                   <feature.icon className="w-10 h-10 text-amber-500 mx-auto mb-4" />
//                   <h3 className="font-black mb-2">{feature.title}</h3>
//                   <p className="text-sm text-muted-foreground">
//                     {feature.desc}
//                   </p>
//                 </motion.div>
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* FAQ Section */}
//         <section className="py-20">
//           <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
//             <div className="text-center mb-12">
//               <h2 className="text-4xl sm:text-5xl font-black tracking-tighter mb-4">
//                 Frequently Asked{" "}
//                 <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600">
//                   Questions
//                 </span>
//               </h2>
//             </div>

//             <div className="space-y-4">
//               {[
//                 {
//                   q: "How long does admission take?",
//                   a: "Applications are reviewed within 24 hours. You'll receive a response within 48 hours.",
//                 },
//                 {
//                   q: "What payment methods are accepted?",
//                   a: "We accept credit cards, bank transfers, mobile money, and Western Union.",
//                 },
//                 {
//                   q: "Can I switch programs later?",
//                   a: "Yes, you can switch programs with proper assessment and availability.",
//                 },
//                 {
//                   q: "Is financial aid available?",
//                   a: "Yes, Zakat-funded grants are available for eligible students.",
//                 },
//               ].map((faq, idx) => (
//                 <motion.div
//                   key={idx}
//                   initial={{ opacity: 0 }}
//                   whileInView={{ opacity: 1 }}
//                   transition={{ delay: idx * 0.1 }}
//                   className="p-6 rounded-2xl bg-card border border-border hover:border-amber-300 transition-all"
//                 >
//                   <h3 className="font-black mb-2">{faq.q}</h3>
//                   <p className="text-muted-foreground">{faq.a}</p>
//                 </motion.div>
//               ))}
//             </div>
//           </div>
//         </section>
//       </main>
//     </>
//   );
// }










// app/admissions/page.tsx
"use client";

import { Reveal } from "@/components/shared/section-animation";
import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useRef } from "react";
import {
  ArrowRight,
  CreditCard,
  Banknote,
  CheckCircle2,
  Shield,
  Users,
  BookOpen,
  Sparkles,
  FileText,
  UserCheck,
  MessageCircle,
  GraduationCap,
  Heart,
  Target,
  Compass,
  Globe,
} from "lucide-react";

// ============= UNIFIED COLOR SYSTEM =============
// Royal Purple + Gold Theme
const COLORS = {
  // Primary Purple
  primary: {
    light: "purple-50",
    DEFAULT: "purple-600",
    dark: "purple-700",
    darker: "purple-800",
    gradient: "from-purple-600 to-purple-700",
    gradientHover: "from-purple-700 to-purple-800",
    soft: "purple-100",
    text: "purple-600",
    border: "purple-200",
    ring: "purple-500",
  },
  // Secondary Gold/Amber
  secondary: {
    light: "amber-50",
    DEFAULT: "amber-500",
    dark: "amber-600",
    darker: "amber-700",
    gradient: "from-amber-500 to-amber-600",
    gradientHover: "from-amber-600 to-amber-700",
    soft: "amber-100",
    text: "amber-600",
    border: "amber-200",
  },
};

// Program data for pre-selection
const PROGRAMS = {
  hifz: { name: "Hifz Al-Quran", color: "purple", path: "/courses/hifz" },
  tajweed: { name: "Tajweed Al-Itqan", color: "purple", path: "/courses/tajweed" },
  "group-tajweed": { name: "Group Tajweed", color: "purple", path: "/courses/group-tajweed" },
  arabic: { name: "Al-Lughah Al-Arabiyyah", color: "purple", path: "/courses/arabic" },
  tafsir: { name: "Tafsir Al-Mubin", color: "purple", path: "/courses/tafsir" },
  qiroah: { name: "Qiro'ah Program", color: "purple", path: "/courses/qiroah" },
  "group-qiroah": { name: "Group Qiro'ah", color: "purple", path: "/courses/group-qiroah" },
  "juz-amma": { name: "Juz Amma", color: "purple", path: "/courses/juz-amma" },
  "juz-tabarak": { name: "Juz Tabarak", color: "purple", path: "/courses/juz-tabarak" },
  murojaah: { name: "Muroja'ah Program", color: "purple", path: "/courses/murojaah" },
};

export default function AdmissionsPage() {
  const searchParams = useSearchParams();
  const preSelectedProgram = searchParams.get("program");
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);

  const preSelectedProgramInfo = preSelectedProgram ? PROGRAMS[preSelectedProgram as keyof typeof PROGRAMS] : null;

  return (
    <main ref={containerRef} className="relative pt-0 sm:pt-10 bg-background overflow-hidden">
      {/* Background - Hidden on mobile */}
      <div className="hidden sm:block fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.02] bg-[url('/islamic-pattern.svg')] bg-center bg-repeat" style={{ backgroundSize: "300px" }} />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-600/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-[150px]" />
      </div>

      {/* Hero Section */}
      <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative pt-16 sm:pt-24 md:pt-28 lg:pt-32 pb-12 sm:pb-16">
        <div className="container mx-auto px-3 xs:px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-linear-to-r from-purple-500/10 to-purple-600/10 border border-purple-500/20 text-purple-700 text-[9px] sm:text-[11px] font-black uppercase tracking-wider mb-4 sm:mb-6"
            >
              <Sparkles className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 text-amber-500" /> 🎓 Begin Your Sacred Journey 🎓
            </motion.div>

            <h1 className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter font-heading leading-[1.1] mb-4 sm:mb-6 px-2">
              Al-Maysaroh{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-600 via-purple-700 to-amber-600 whitespace-normal">
                Admissions
              </span>
            </h1>

            <p className="text-base sm:text-xl text-muted-foreground font-light max-w-2xl mx-auto mb-6 sm:mb-8 px-4">
              Begin your journey to Quranic mastery. Join a community of dedicated learners and certified scholars.
            </p>

            {/* Pre-selected Program Banner */}
            {preSelectedProgramInfo && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 rounded-xl bg-purple-50/50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800"
              >
                <p className="text-xs sm:text-sm">
                  <span className="font-black text-purple-600">You're applying for:</span>{" "}
                  <Link href={preSelectedProgramInfo.path} className="text-amber-600 font-black hover:underline">
                    {preSelectedProgramInfo.name}
                  </Link>
                </p>
              </motion.div>
            )}

            <div className="flex flex-col xs:flex-row gap-3 sm:gap-4 justify-center px-4">
              <Link href="/admissions/apply" className="w-full xs:w-auto">
                <Button className="w-full rounded-full px-6 sm:px-8 py-3.5 sm:py-4 font-black bg-linear-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white text-sm sm:text-base shadow-xl transition-all duration-300">
                  <span className="flex items-center justify-center gap-2">
                    START YOUR APPLICATION
                    <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </span>
                </Button>
              </Link>
              <Link href="/assessment" className="w-full xs:w-auto">
                <Button variant="outline" className="w-full rounded-full px-6 sm:px-8 py-3.5 sm:py-4 font-black text-sm sm:text-base border-amber-500 text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-950/20 transition-all duration-300">
                  FREE ASSESSMENT
                </Button>
              </Link>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-10 sm:mt-12 pt-6 sm:pt-8 border-t border-border/50 px-2">
              {[
                { label: "Active Students", value: "500+", icon: Users },
                { label: "Certified Scholars", value: "15+", icon: GraduationCap },
                { label: "Countries", value: "15+", icon: Globe },
                { label: "Success Rate", value: "94%", icon: Target },
              ].map((stat, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="p-2.5 sm:p-4 rounded-xl sm:rounded-2xl bg-linear-to-br from-purple-50/50 to-purple-100/30 dark:from-purple-950/20 dark:to-purple-900/20 border border-purple-100 dark:border-purple-800">
                  <stat.icon className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 mx-auto mb-1.5 sm:mb-2" />
                  <div className="text-lg sm:text-2xl md:text-3xl font-black text-purple-600">{stat.value}</div>
                  <div className="text-[10px] sm:text-xs text-muted-foreground mt-0.5 sm:mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Admissions Process - 4 Steps */}
      <section className="py-12 sm:py-16 bg-linear-to-b from-background via-purple-50/5 to-amber-50/5">
        <div className="container mx-auto px-3 xs:px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <div className="inline-flex items-center gap-2 text-amber-600 font-black text-[8px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.3em] mb-3 sm:mb-4">
              <Compass className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> Your Journey
            </div>
            <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter font-heading mb-3 sm:mb-4 px-2">
              Four-Step <span className="bg-linear-to-r from-purple-600 to-amber-600 bg-clip-text text-transparent italic">Admissions</span> Protocol
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground px-4">
              A clear path from application to your first class
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              { step: "01", icon: FileText, title: "Application", desc: "Complete online form with your educational background and goals", color: "from-purple-500 to-purple-600" },
              { step: "02", icon: UserCheck, title: "Assessment", desc: "Meet with our scholars for level evaluation", color: "from-purple-600 to-purple-700" },
              { step: "03", icon: CreditCard, title: "Enrollment", desc: "Choose payment method and complete registration", color: "from-amber-500 to-amber-600" },
              { step: "04", icon: Users, title: "Scholar Match", desc: "Get assigned to your perfect teacher", color: "from-purple-700 to-purple-800" },
            ].map((step, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="bg-card rounded-xl sm:rounded-2xl border border-border hover:border-purple-300 transition-all p-5 sm:p-6 text-center h-full group">
                  <div className={`w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-xl sm:rounded-2xl bg-linear-to-br ${step.color} flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg`}>
                    <step.icon className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                  </div>
                  <div className="text-[10px] sm:text-xs text-amber-600 font-black mb-1">{step.step}</div>
                  <h3 className="font-black text-base sm:text-lg md:text-xl mb-1.5 sm:mb-2">{step.title}</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">{step.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Financial Channels */}
      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-3 xs:px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <div className="inline-flex items-center gap-2 text-amber-600 font-black text-[8px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.3em] mb-3 sm:mb-4">
              <CreditCard className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> Financial Channels
            </div>
            <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter font-heading mb-3 sm:mb-4 px-2">
              Flexible <span className="bg-linear-to-r from-purple-600 to-amber-600 bg-clip-text text-transparent italic">Payment</span> Options
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground px-4">
              Choose the payment method that works best for you
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8">
            {/* Instant Digital - Purple Theme */}
            <div className="bg-card rounded-xl sm:rounded-2xl border-2 border-purple-600/10 hover:border-purple-600/30 transition-all p-6 sm:p-8">
              <div className="flex items-start justify-between mb-6">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-linear-to-br from-purple-600 to-purple-700 flex items-center justify-center shadow-lg">
                  <CreditCard className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                </div>
                <div className="px-2 sm:px-3 py-0.5 sm:py-1 rounded-full bg-purple-600/10 text-purple-600 text-[8px] sm:text-[10px] font-black uppercase tracking-wider">
                  Instant
                </div>
              </div>
              <h3 className="text-lg sm:text-xl font-black mb-2 bg-linear-to-r from-purple-600 to-purple-700 bg-clip-text text-transparent">Digital Settlement</h3>
              <p className="text-muted-foreground text-xs sm:text-sm mb-6">
                Secure card processing via Stripe. Use any international Credit/Debit card for immediate portal access.
              </p>
              <ul className="space-y-2 mb-6">
                {["Immediate portal activation", "Secure Stripe processing", "Multi-currency support", "Auto-ledgering"].map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-xs sm:text-sm">
                    <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-600 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button className="w-full rounded-full py-2.5 sm:py-3 bg-linear-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-black text-xs sm:text-sm transition-all duration-300">
                PAY WITH CARD
              </Button>
            </div>

            {/* Manual Payment - Gold/Amber Theme */}
            <div className="bg-card rounded-xl sm:rounded-2xl border-2 border-amber-500/10 hover:border-amber-500/30 transition-all p-6 sm:p-8">
              <div className="flex items-start justify-between mb-6">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-linear-to-br from-amber-500 to-amber-600 flex items-center justify-center shadow-lg">
                  <Banknote className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                </div>
                <div className="px-2 sm:px-3 py-0.5 sm:py-1 rounded-full bg-amber-500/10 text-amber-600 text-[8px] sm:text-[10px] font-black uppercase tracking-wider">
                  Manual
                </div>
              </div>
              <h3 className="text-lg sm:text-xl font-black mb-2 bg-linear-to-r from-amber-500 to-amber-600 bg-clip-text text-transparent">Bank Remittance</h3>
              <p className="text-muted-foreground text-xs sm:text-sm mb-6">
                Bank Transfer, Mobile Money, or Western Union. Submit receipt for manual portal activation.
              </p>
              <ul className="space-y-2 mb-6">
                {["Bank details on application", "Upload receipt for verification", "Portal active in 12-24 hours", "Local remittance support"].map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-xs sm:text-sm">
                    <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-600 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button variant="outline" className="w-full rounded-full py-2.5 sm:py-3 border-amber-500 text-amber-600 font-black hover:bg-amber-50 dark:hover:bg-amber-950/20 text-xs sm:text-sm transition-all duration-300">
                CHOOSE BANK TRANSFER
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Tuition & Aid */}
      <section className="py-12 sm:py-16 bg-linear-to-b from-background via-purple-50/5 to-amber-50/5">
        <div className="container mx-auto px-3 xs:px-4 sm:px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Standard Tuition - Purple */}
            <div className="bg-card rounded-xl sm:rounded-2xl border border-border hover:border-purple-300 transition-all p-6 sm:p-8">
              <BookOpen className="w-8 h-8 sm:w-10 sm:h-10 text-purple-600 mb-4" />
              <h3 className="text-lg sm:text-xl font-black mb-2">Standard Tuition</h3>
              <p className="text-muted-foreground text-xs sm:text-sm mb-6">Monthly tuition includes all digital materials and portal access.</p>
              <div className="space-y-3">
                {[
                  { program: "Hifz Program", price: "From $2.25+" },
                  { program: "Tajweed Mastery", price: "From $2+" },
                  { program: "Arabic Fluency", price: "From $2+" },
                  { program: "Group Programs", price: "$6" },
                ].map((item, i) => (
                  <div key={i} className="flex justify-between items-center py-2 border-b border-border/50">
                    <span className="text-xs sm:text-sm font-black">{item.program}</span>
                    <span className="text-purple-600 font-black text-xs sm:text-sm">{item.price}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Zakat Grants - Gold/Amber */}
            <div className="bg-card rounded-xl sm:rounded-2xl border-2 border-amber-500/20 bg-amber-500/5 p-6 sm:p-8">
              <Shield className="w-8 h-8 sm:w-10 sm:h-10 text-amber-500 mb-4" />
              <h3 className="text-lg sm:text-xl font-black mb-2 text-amber-600">Zakat Grants</h3>
              <p className="text-muted-foreground text-xs sm:text-sm mb-6">For dedicated students facing financial hardship. Applications reviewed quarterly.</p>
              <ul className="space-y-2 mb-6">
                {["Council Review", "Proof of Dedication", "Limited Slots"].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-xs sm:text-sm">
                    <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-500 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Button className="w-full rounded-full py-2.5 sm:py-3 bg-linear-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-black text-xs sm:text-sm transition-all duration-300">
                APPLY FOR AID
              </Button>
            </div>

            {/* Family Rates - Purple + Gold Mix */}
            <div className="bg-card rounded-xl sm:rounded-2xl border-2 border-purple-500/20 bg-purple-500/5 p-6 sm:p-8">
              <Heart className="w-8 h-8 sm:w-10 sm:h-10 text-purple-600 mb-4" />
              <h3 className="text-lg sm:text-xl font-black mb-2 bg-linear-to-r from-purple-600 to-amber-600 bg-clip-text text-transparent">Family Rates(1-on-1)</h3>
              <p className="text-muted-foreground text-xs sm:text-sm mb-6">Special rates for families learning together within one household.</p>
              <div className="p-4 rounded-xl bg-white dark:bg-black/20 border border-purple-500/20 mb-6 text-center">
                <div className="text-xl sm:text-2xl font-black bg-linear-to-r from-purple-600 to-amber-600 bg-clip-text text-transparent">15% Discount</div>
                <div className="text-[10px] sm:text-xs text-muted-foreground">For 3+ Household Members</div>
              </div>
              <Button variant="outline" className="w-full rounded-full py-2.5 sm:py-3 border-purple-500 text-purple-600 font-black hover:bg-purple-50 dark:hover:bg-purple-950/20 text-xs sm:text-sm transition-all duration-300">
                INQUIRE RATES
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-3 xs:px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <div className="inline-flex items-center gap-2 text-amber-600 font-black text-[8px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.3em] mb-3 sm:mb-4">
              <MessageCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> Common Questions
            </div>
            <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter font-heading mb-3 sm:mb-4 px-2">
              Frequently Asked <span className="bg-linear-to-r from-purple-600 to-amber-600 bg-clip-text text-transparent italic">Questions</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 max-w-4xl mx-auto">
            {[
              { q: "How long does the admission process take?", a: "Applications are reviewed within 24 hours. Portal activation typically occurs 48 hours after tuition settlement." },
              { q: "Can I change programs after enrollment?", a: "Yes, curriculum shifts are permitted within the first academic month of your enrollment." },
              { q: "Is financial aid available?", a: "Yes, Zakat-funded grants are available for eligible students facing financial hardship." },
              { q: "What documents do I need to apply?", a: "A valid ID, educational background information, and proof of payment method are required." },
              { q: "Is there an age requirement for programs?", a: "Children's programs accept ages 5-12. Adult programs are open to all ages 13 and above." },
              { q: "Can I get a refund if I'm not satisfied?", a: "We offer a free assessment session before enrollment to ensure program fit." },
            ].map((faq, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <div className="bg-card rounded-xl sm:rounded-2xl border border-border hover:border-purple-300 transition-all p-5 sm:p-6">
                  <div className="flex items-start gap-2 sm:gap-3">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center shrink-0 mt-0.5">
                      <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-black text-sm sm:text-base mb-1 sm:mb-2">{faq.q}</h3>
                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA - Purple + Gold linear */}
      <section className="py-12 sm:py-20">
        <div className="container mx-auto px-3 xs:px-4 sm:px-6">
          <div className="bg-card rounded-xl sm:rounded-2xl border border-border hover:border-purple-300 transition-all p-6 sm:p-8 md:p-12 text-center max-w-4xl mx-auto bg-linear-to-br from-purple-600/5 via-purple-500/5 to-amber-500/5">
            <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-linear-to-br from-purple-600 to-amber-500 mb-4 sm:mb-6 shadow-lg">
              <GraduationCap className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
            </div>
            <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-black mb-3 sm:mb-4 px-2 bg-linear-to-r from-purple-600 to-amber-600 bg-clip-text text-transparent">Ready to Begin Your Journey?</h2>
            <p className="text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8 max-w-md mx-auto px-4">
              Join hundreds of students who have chosen Al-Maysaroh for their Quranic education.
            </p>
            <div className="flex flex-col xs:flex-row gap-3 sm:gap-4 justify-center px-4">
              <Link href="/admissions/apply" className="w-full xs:w-auto">
                <Button className="w-full rounded-full px-6 sm:px-8 py-3 sm:py-4 font-black bg-linear-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white text-sm sm:text-base transition-all duration-300 shadow-lg hover:shadow-xl">
                  APPLY NOW
                  <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-1.5 sm:ml-2" />
                </Button>
              </Link>
              <Link href="/contact" className="w-full xs:w-auto">
                <Button variant="outline" className="w-full rounded-full px-6 sm:px-8 py-3 sm:py-4 font-black text-sm sm:text-base border-purple-500 text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-950/20 transition-all duration-300">
                  CONTACT ADMISSIONS
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}