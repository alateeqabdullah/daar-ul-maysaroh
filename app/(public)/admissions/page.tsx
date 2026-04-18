// "use client";

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
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Reveal } from "@/components/shared/section-animation";
// import Link from "next/link";

// export default function AdmissionsPage() {
//   return (
//     <main className="pt-24 lg:pt-32 bg-background overflow-x-hidden selection:bg-gold/30">
//       {/* Hero Section */}
//       <section className="relative">
//         <div className="container mx-auto px-6">
//           <div className="max-w-6xl mx-auto space-y-10">
//             {/* Breadcrumb - Refined tracking */}
//             <nav className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground flex items-center gap-2">
//               <Link
//                 href="/"
//                 className="hover:text-primary-700 transition-colors"
//               >
//                 Home
//               </Link>
//               <span className="opacity-30">/</span>
//               <span className="text-primary-700">Admissions Protocol</span>
//             </nav>

//             <div className="flex flex-col lg:flex-row gap-16 items-start">
//               <div className="lg:w-1/2 space-y-8">
//                 <Reveal>
//                   <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-50 dark:bg-primary-950/50 border border-primary-700/10 text-primary-700 text-[10px] font-black uppercase tracking-[0.2em]">
//                     <Sparkles className="w-3.5 h-3.5" /> 2026 Academic Intake
//                     Now Open
//                   </div>
//                 </Reveal>

//                 <Reveal delay={0.1}>
//                   <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter font-heading leading-[0.9]">
//                     Al-Maysaroh <br />
//                     <span className="text-primary-700 italic">Admissions</span>
//                   </h1>
//                 </Reveal>

//                 <Reveal delay={0.2}>
//                   <p className="text-lg sm:text-xl text-muted-foreground font-medium leading-relaxed max-w-xl border-l-4 border-gold pl-6 py-1">
//                     Begin your sacred journey with a streamlined, transparent
//                     admission process. Our global enrollment system accommodates
//                     students from 50+ countries.
//                   </p>
//                 </Reveal>

//                 <Reveal delay={0.3}>
//                   <div className="flex flex-col sm:flex-row gap-4 pt-4">
//                     <Link href="#apply-now" className="w-full sm:w-auto">
//                       <Button className="w-full rounded-full px-10 py-7 font-black bg-primary-700 hover:bg-primary-800 text-base shadow-royal group transition-all">
//                         START APPLICATION
//                         <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
//                       </Button>
//                     </Link>
//                     <Link
//                       href="#financial-channels"
//                       className="w-full sm:w-auto"
//                     >
//                       <Button
//                         variant="outline"
//                         className="w-full rounded-full px-10 py-7 font-black text-base border-2"
//                       >
//                         PAYMENT OPTIONS
//                       </Button>
//                     </Link>
//                   </div>
//                 </Reveal>
//               </div>

//               {/* Hero Stats Card - Using your glass-surface utility */}
//               <Reveal delay={0.4} className="lg:w-1/2 w-full">
//                 <div className="institutional-card p-8 bg-card/40 backdrop-blur-xl border-primary-700/20 shadow-royal relative overflow-hidden">
//                   <div className="absolute top-0 right-0 w-32 h-32 bg-primary-700/10 blur-3xl rounded-full" />

//                   <div className="grid grid-cols-2 gap-8 mb-10">
//                     {[
//                       {
//                         value: "24-48",
//                         label: "Hours Processing",
//                         icon: Clock,
//                       },
//                       { value: "50+", label: "Countries", icon: Users },
//                       {
//                         value: "Global",
//                         label: "Payment Channels",
//                         icon: CreditCard,
//                       },
//                       { value: "100%", label: "Online Process", icon: Shield },
//                     ].map((stat, idx) => (
//                       <div key={idx} className="space-y-1 group">
//                         <stat.icon className="w-4 h-4 text-primary-700 mb-2 opacity-50 group-hover:opacity-100 transition-opacity" />
//                         <div className="text-3xl font-black text-primary-700 tracking-tighter">
//                           {stat.value}
//                         </div>
//                         <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
//                           {stat.label}
//                         </div>
//                       </div>
//                     ))}
//                   </div>

//                   <div className="p-6 rounded-2xl bg-primary-50 dark:bg-primary-950/40 border border-primary-700/10">
//                     <div className="flex items-center gap-4 mb-2">
//                       <Award className="w-6 h-6 text-gold" />
//                       <div className="font-black text-sm uppercase tracking-[0.2em]">
//                         Global Accessibility
//                       </div>
//                     </div>
//                     <p className="text-xs text-muted-foreground font-bold italic leading-relaxed">
//                       Bank transfers, international cards, mobile money, and
//                       Western Union accepted for universal access.
//                     </p>
//                   </div>
//                 </div>
//               </Reveal>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Admissions Process - THE FOUR STEPS */}
//       <section className="py-24 sm:py-32 bg-linear-to-b from-transparent to-primary-50/10">
//         <div className="container mx-auto px-6">
//           <div className="max-w-6xl mx-auto">
//             <Reveal>
//               <div className="text-center mb-20 space-y-4">
//                 <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase">
//                   Four-Step{" "}
//                   <span className="text-primary-700 italic">Protocol</span>
//                 </h2>
//                 <div className="h-1.5 w-24 bg-gold mx-auto rounded-full" />
//               </div>
//             </Reveal>

//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//               {[
//                 {
//                   step: "01",
//                   icon: FileText,
//                   title: "Assessment",
//                   description:
//                     "Complete online form with educational background and goals",
//                 },
//                 {
//                   step: "02",
//                   icon: CreditCard,
//                   title: "Settlement",
//                   description:
//                     "Choose payment method and complete financial registration",
//                 },
//                 {
//                   step: "03",
//                   icon: Users,
//                   title: "Scholar Match",
//                   description:
//                     "Our council assigns teacher based on your level and schedule",
//                 },
//                 {
//                   step: "04",
//                   icon: Calendar,
//                   title: "Orientation",
//                   description:
//                     "Portal access, materials, and first class scheduling",
//                 },
//               ].map((step, index) => (
//                 <Reveal key={index} delay={index * 0.1}>
//                   <div className="institutional-card p-10 text-center hover:border-primary-700/40 transition-all relative group h-full">
//                     <div className="w-16 h-16 mx-auto mb-8 rounded-2xl bg-primary-50 dark:bg-primary-950/40 flex items-center justify-center relative group-hover:scale-110 transition-transform duration-500">
//                       <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-primary-700 text-white text-[10px] font-black flex items-center justify-center shadow-lg">
//                         {step.step}
//                       </div>
//                       <step.icon className="w-8 h-8 text-primary-700" />
//                     </div>
//                     <h3 className="text-lg font-black uppercase tracking-tight mb-4 italic">
//                       {step.title}
//                     </h3>
//                     <p className="text-sm text-muted-foreground font-medium leading-relaxed">
//                       {step.description}
//                     </p>
//                   </div>
//                 </Reveal>
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Global Payment Channels - THE TWO TIERS */}
//       <section id="financial-channels" className="py-24 sm:py-32">
//         <div className="container mx-auto px-6 max-w-6xl">
//           <Reveal>
//             <div className="text-center mb-20">
//               <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase">
//                 Global{" "}
//                 <span className="text-primary-700 italic">Financial</span>{" "}
//                 Channels
//               </h2>
//             </div>
//           </Reveal>

//           <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
//             {/* Instant Digital */}
//             <Reveal delay={0.1}>
//               <div className="institutional-card p-10 md:p-12 border-2 border-primary-700/10 hover:border-primary-700/30 transition-all flex flex-col h-full">
//                 <div className="flex items-start justify-between mb-10">
//                   <div className="w-20 h-20 rounded-2xl bg-primary-700 flex items-center justify-center shadow-royal">
//                     <CreditCard className="w-10 h-10 text-white" />
//                   </div>
//                   <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-700/10 text-primary-700 text-[10px] font-black uppercase tracking-widest">
//                     <Sparkles className="w-3 h-3" /> Instant
//                   </div>
//                 </div>

//                 <h3 className="text-3xl font-black uppercase tracking-tighter mb-4 italic">
//                   Digital Settlement
//                 </h3>
//                 <p className="text-muted-foreground font-medium italic leading-relaxed mb-8">
//                   For students utilizing international credit/debit cards via
//                   our secure gateway.
//                 </p>

//                 <div className="space-y-4 mb-10 grow">
//                   {[
//                     "Immediate portal activation",
//                     "Secure Stripe processing",
//                     "Multi-currency support",
//                     "Auto-ledgering",
//                   ].map((feat, i) => (
//                     <div
//                       key={i}
//                       className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-muted-foreground"
//                     >
//                       <CheckCircle2 className="w-4 h-4 text-primary-700 shrink-0" />
//                       {feat}
//                     </div>
//                   ))}
//                 </div>

//                 <div className="pt-8 border-t border-primary-700/5">
//                   <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-6">
//                     Supported: Visa, Mastercard, AMEX, Discover
//                   </div>
//                   <Button className="w-full rounded-full py-7 bg-primary-700 hover:bg-primary-800 font-black text-sm uppercase tracking-widest">
//                     PAY WITH CARD
//                   </Button>
//                 </div>
//               </div>
//             </Reveal>

//             {/* Manual Payment */}
//             <Reveal delay={0.2}>
//               <div className="institutional-card p-10 md:p-12 border-2 border-accent/10 hover:border-accent/30 transition-all flex flex-col h-full">
//                 <div className="flex items-start justify-between mb-10">
//                   <div className="w-20 h-20 rounded-2xl bg-accent flex items-center justify-center shadow-lg shadow-accent/20">
//                     <Banknote className="w-10 h-10 text-white" />
//                   </div>
//                   <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 text-accent text-[10px] font-black uppercase tracking-widest">
//                     <Shield className="w-3 h-3" /> Manual
//                   </div>
//                 </div>

//                 <h3 className="text-3xl font-black uppercase tracking-tighter mb-4 italic text-accent">
//                   Bank Remittance
//                 </h3>
//                 <p className="text-muted-foreground font-medium italic leading-relaxed mb-8">
//                   Preferred for regions utilizing Bank Transfers, M-Pesa, or
//                   Western Union.
//                 </p>

//                 <div className="space-y-4 mb-10 grow">
//                   {[
//                     "Bank details on application",
//                     "Upload receipt for verification",
//                     "Portal active in 12-24 hours",
//                     "Local remittance support",
//                   ].map((feat, i) => (
//                     <div
//                       key={i}
//                       className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-muted-foreground"
//                     >
//                       <CheckCircle2 className="w-4 h-4 text-accent shrink-0" />
//                       {feat}
//                     </div>
//                   ))}
//                 </div>

//                 <div className="pt-8 border-t border-accent/5">
//                   <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-6">
//                     Processing: 12-24 Hours post-submission
//                   </div>
//                   <Button className="w-full rounded-full py-7 bg-accent hover:bg-accent/90 font-black text-sm uppercase tracking-widest">
//                     CHOOSE BANK TRANSFER
//                   </Button>
//                 </div>
//               </div>
//             </Reveal>
//           </div>
//         </div>
//       </section>

//       {/* Tuition & Aid - Preserving your 3-column data exactly */}
//       <section className="py-24 sm:py-32 bg-linear-to-b from-transparent to-primary-50/10">
//         <div className="container mx-auto px-6 max-w-6xl">
//           <Reveal>
//             <div className="text-center mb-20 space-y-4">
//               <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase">
//                 Tuition &{" "}
//                 <span className="text-primary-700 italic">Support</span>
//               </h2>
//             </div>
//           </Reveal>

//           <div className="grid lg:grid-cols-3 gap-8">
//             {/* Standard Tuition Card */}
//             <Reveal delay={0.1}>
//               <div className="institutional-card p-10 h-full bg-card">
//                 <BookOpen className="w-10 h-10 text-primary-700 mb-6" />
//                 <h3 className="text-2xl font-black uppercase tracking-tighter mb-4">
//                   Standard Tuition
//                 </h3>
//                 <p className="text-sm text-muted-foreground font-medium italic leading-relaxed mb-8">
//                   Monthly tuition includes all digital materials and portal
//                   access.
//                 </p>

//                 <div className="space-y-4">
//                   {[
//                     { n: "Hifz Program", p: "$200-300" },
//                     { n: "Tajweed Mastery", p: "$150-200" },
//                     { n: "Arabic Fluency", p: "$100-150" },
//                   ].map((row, i) => (
//                     <div
//                       key={i}
//                       className="flex justify-between items-center py-3 border-b border-primary-700/5"
//                     >
//                       <span className="text-xs font-black uppercase tracking-widest opacity-60">
//                         {row.n}
//                       </span>
//                       <span className="font-black text-primary-700">
//                         {row.p}
//                       </span>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </Reveal>

//             {/* Zakat Card */}
//             <Reveal delay={0.2}>
//               <div className="institutional-card p-10 h-full border-2 border-accent/20 bg-accent/5">
//                 <Shield className="w-10 h-10 text-accent mb-6" />
//                 <h3 className="text-2xl font-black uppercase tracking-tighter mb-4 italic text-accent">
//                   Zakat Grants
//                 </h3>
//                 <p className="text-sm text-muted-foreground font-medium italic leading-relaxed mb-8">
//                   For dedicated students facing financial hardship. Applications
//                   reviewed quarterly.
//                 </p>

//                 <div className="space-y-4 mb-10">
//                   {[
//                     "Council Review",
//                     "Proof of Dedication",
//                     "Limited Slots",
//                   ].map((txt, i) => (
//                     <div
//                       key={i}
//                       className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-accent"
//                     >
//                       <CheckCircle2 className="w-3 h-3" /> {txt}
//                     </div>
//                   ))}
//                 </div>

//                 <Button className="w-full rounded-full py-6 bg-accent hover:bg-accent/90 font-black text-xs uppercase tracking-widest mt-auto">
//                   APPLY FOR AID
//                 </Button>
//               </div>
//             </Reveal>

//             {/* Family Card */}
//             <Reveal delay={0.3}>
//               <div className="institutional-card p-10 h-full border-2 border-gold/20 bg-gold/5">
//                 <Users className="w-10 h-10 text-gold mb-6" />
//                 <h3 className="text-2xl font-black uppercase tracking-tighter mb-4 italic text-gold">
//                   Family Rates
//                 </h3>
//                 <p className="text-sm text-muted-foreground font-medium italic leading-relaxed mb-8">
//                   Special rates for families learning together within one
//                   household.
//                 </p>

//                 <div className="p-6 rounded-2xl bg-white dark:bg-black/20 border border-gold/20 mb-6">
//                   <div className="text-2xl font-black text-gold tracking-tighter mb-1">
//                     15% Discount
//                   </div>
//                   <div className="text-[10px] font-black uppercase tracking-widest opacity-60">
//                     For 3+ Household Members
//                   </div>
//                 </div>

//                 <Button
//                   variant="outline"
//                   className="w-full rounded-full py-6 border-gold text-gold font-black text-xs uppercase tracking-widest mt-auto"
//                 >
//                   INQUIRE RATES
//                 </Button>
//               </div>
//             </Reveal>
//           </div>
//         </div>
//       </section>

//       {/* Gateway Form Preview - Using your animate-pulse skeletons */}
//       <section id="apply-now" className="py-24 sm:py-32">
//         <div className="container mx-auto px-6 max-w-4xl">
//           <Reveal>
//             <div className="institutional-card p-10 md:p-16 border-2 border-primary-700/20 bg-card/40 backdrop-blur-xl relative overflow-hidden">
//               <div className="absolute top-0 left-0 w-full h-2 bg-primary-700" />

//               <div className="text-center mb-16">
//                 <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase mb-4 leading-none">
//                   Admission{" "}
//                   <span className="text-primary-700 italic text-3xl md:text-4xl block mt-2 tracking-widest">
//                     Gateway
//                   </span>
//                 </h2>
//                 <div className="h-1 w-12 bg-gold mx-auto" />
//               </div>

//               <div className="space-y-12">
//                 <div className="space-y-6">
//                   <h3 className="text-xs font-black uppercase tracking-[0.4em] text-primary-700 border-b border-primary-700/10 pb-4 italic">
//                     01. Personal Information
//                   </h3>
//                   <div className="grid sm:grid-cols-2 gap-8">
//                     {[1, 2, 3, 4].map((i) => (
//                       <div key={i} className="space-y-3">
//                         <div className="w-24 h-2 bg-primary-700/5 rounded-full" />
//                         <div className="h-14 rounded-2xl bg-muted/30 border border-border animate-skeleton" />
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 <div className="space-y-6">
//                   <h3 className="text-xs font-black uppercase tracking-[0.4em] text-primary-700 border-b border-primary-700/10 pb-4 italic">
//                     02. Academic Intent
//                   </h3>
//                   <div className="space-y-4">
//                     {[1, 2].map((i) => (
//                       <div
//                         key={i}
//                         className="h-14 rounded-2xl bg-muted/30 border border-border animate-skeleton"
//                       />
//                     ))}
//                   </div>
//                 </div>

//                 <div className="pt-8">
//                   <Button className="w-full rounded-full py-8 bg-primary-700 hover:bg-primary-800 font-black text-lg shadow-royal group">
//                     COMPLETE DIGITAL APPLICATION{" "}
//                     <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform" />
//                   </Button>
//                   <p className="text-center text-[10px] font-black uppercase tracking-widest text-muted-foreground mt-6 opacity-60">
//                     Council review within 24 hours • Global processing active
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </Reveal>
//         </div>
//       </section>

//       {/* FAQ Section - PRESERVED DATA */}
//       <section className="pb-32 lg:pb-48">
//         <div className="container mx-auto px-6 max-w-4xl">
//           <Reveal>
//             <div className="text-center mb-20 space-y-4">
//               <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase italic text-primary-700">
//                 Admissions FAQ
//               </h2>
//               <div className="h-1 w-12 bg-gold mx-auto" />
//             </div>
//           </Reveal>

//           <div className="space-y-6">
//             {[
//               {
//                 q: "Admission timeframe?",
//                 a: "Applications reviewed in 24h. Activation typically 48h post-settlement.",
//               },
//               {
//                 q: "Can I change programs?",
//                 a: "Yes, curriculum shifts are permitted within the first academic month.",
//               },
//               {
//                 q: "Is aid available?",
//                 a: "Yes, Zakat-funded grants are available for eligible global students.",
//               },
//             ].map((faq, index) => (
//               <Reveal key={index} delay={index * 0.05}>
//                 <div className="institutional-card p-10 hover:border-primary-700/40 transition-all group">
//                   <h3 className="font-black text-xl uppercase tracking-tighter mb-4 group-hover:text-primary-700 transition-colors italic">
//                     {faq.q}
//                   </h3>
//                   <p className="text-muted-foreground font-medium leading-relaxed italic border-l-2 border-primary-700/10 pl-6">
//                     {faq.a}
//                   </p>
//                 </div>
//               </Reveal>
//             ))}
//           </div>
//         </div>
//       </section>
//     </main>
//   );
// }

"use client";

import { useState } from "react";
import {
  Calendar,
  CreditCard,
  Banknote,
  CheckCircle2,
  Shield,
  Users,
  Clock,
  BookOpen,
  Sparkles,
  Award,
  ArrowRight,
  FileText,
  Mail,
  Phone,
  User,
  MapPin,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/shared/section-animation";
import Link from "next/link";
import { toast } from "sonner";

export default function AdmissionsPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    country: "",
    program: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formPayload = new FormData();
    formPayload.append("fullName", formData.fullName);
    formPayload.append("email", formData.email);
    formPayload.append("phone", formData.phone);
    formPayload.append("country", formData.country);
    formPayload.append("program", formData.program);
    formPayload.append("message", formData.message);

    // Your Formspree endpoint
    const endpoint = "https://formspree.io/f/mykljjbl";

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        body: formPayload,
        headers: {
          Accept: "application/json",
        },
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Application Submitted!", {
          description:
            "Our admissions council will review your application within 24 hours.",
          duration: 5000,
        });
        // Reset form
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          country: "",
          program: "",
          message: "",
        });
      } else {
        const errorMessage =
          data.errors?.[0] || "Please check your information and try again.";
        toast.error("Submission Failed", {
          description: errorMessage,
          duration: 5000,
        });
      }
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error("Network Error", {
        description:
          "Unable to connect. Please check your internet connection and try again.",
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="pt-24 lg:pt-32 bg-background overflow-x-hidden selection:bg-gold/30">
      {/* Hero Section */}
      <section className="relative">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-6xl mx-auto space-y-10">
            {/* Breadcrumb */}
            <nav className="text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] text-muted-foreground flex items-center gap-2">
              <Link
                href="/"
                className="hover:text-primary-700 transition-colors"
              >
                Home
              </Link>
              <span className="opacity-30">/</span>
              <span className="text-primary-700">Admissions Protocol</span>
            </nav>

            <div className="flex flex-col lg:flex-row gap-16 items-start">
              <div className="lg:w-1/2 space-y-8">
                <Reveal>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-50 dark:bg-primary-950/50 border border-primary-700/10 text-primary-700 text-[10px] font-black uppercase tracking-[0.2em]">
                    <Sparkles className="w-3.5 h-3.5" /> 2026 Academic Intake
                    Now Open
                  </div>
                </Reveal>

                <Reveal delay={0.1}>
                  <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter font-heading leading-[0.9]">
                    Al-Maysaroh <br />
                    <span className="text-primary-700 italic">Admissions</span>
                  </h1>
                </Reveal>

                <Reveal delay={0.2}>
                  <p className="text-lg sm:text-xl text-muted-foreground font-medium leading-relaxed max-w-xl border-l-4 border-gold pl-6 py-1">
                    Begin your sacred journey with a streamlined, transparent
                    admission process. Our global enrollment system accommodates
                    students from 50+ countries.
                  </p>
                </Reveal>

                <Reveal delay={0.3}>
                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <Link href="#apply-now" className="w-full sm:w-auto">
                      <Button className="w-full rounded-full px-10 py-7 font-black bg-primary-700 hover:bg-primary-800 text-base shadow-royal group transition-all">
                        START APPLICATION
                        <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </Link>
                    <Link
                      href="#financial-channels"
                      className="w-full sm:w-auto"
                    >
                      <Button
                        variant="outline"
                        className="w-full rounded-full px-10 py-7 font-black text-base border-2"
                      >
                        PAYMENT OPTIONS
                      </Button>
                    </Link>
                  </div>
                </Reveal>
              </div>

              {/* Hero Stats Card */}
              <Reveal delay={0.4} className="lg:w-1/2 w-full">
                <div className="institutional-card p-6 sm:p-8 md:p-10 bg-card/40 backdrop-blur-xl border-primary-700/20 shadow-royal relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary-700/10 blur-3xl rounded-full" />

                  <div className="grid grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-10">
                    {[
                      {
                        value: "24-48",
                        label: "Hours Processing",
                        icon: Clock,
                      },
                      { value: "50+", label: "Countries", icon: Users },
                      {
                        value: "Global",
                        label: "Payment Channels",
                        icon: CreditCard,
                      },
                      { value: "100%", label: "Online Process", icon: Shield },
                    ].map((stat, idx) => (
                      <div key={idx} className="space-y-1 group">
                        <stat.icon className="w-4 h-4 text-primary-700 mb-2 opacity-50 group-hover:opacity-100 transition-opacity" />
                        <div className="text-2xl sm:text-3xl font-black text-primary-700 tracking-tighter">
                          {stat.value}
                        </div>
                        <div className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="p-4 sm:p-6 rounded-2xl bg-primary-50 dark:bg-primary-950/40 border border-primary-700/10">
                    <div className="flex items-center gap-4 mb-2">
                      <Award className="w-6 h-6 text-gold" />
                      <div className="font-black text-xs sm:text-sm uppercase tracking-[0.2em]">
                        Global Accessibility
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground font-bold italic leading-relaxed">
                      Bank transfers, international cards, mobile money, and
                      Western Union accepted for universal access.
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Admissions Process - THE FOUR STEPS */}
      <section className="py-24 sm:py-32 bg-linear-to-b from-transparent to-primary-50/10">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <Reveal>
              <div className="text-center mb-20 space-y-4">
                <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase">
                  Four-Step{" "}
                  <span className="text-primary-700 italic">Protocol</span>
                </h2>
                <div className="h-1.5 w-24 bg-gold mx-auto rounded-full" />
              </div>
            </Reveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {[
                {
                  step: "01",
                  icon: FileText,
                  title: "Assessment",
                  description:
                    "Complete online form with educational background and goals",
                },
                {
                  step: "02",
                  icon: CreditCard,
                  title: "Settlement",
                  description:
                    "Choose payment method and complete financial registration",
                },
                {
                  step: "03",
                  icon: Users,
                  title: "Scholar Match",
                  description:
                    "Our council assigns teacher based on your level and schedule",
                },
                {
                  step: "04",
                  icon: Calendar,
                  title: "Orientation",
                  description:
                    "Portal access, materials, and first class scheduling",
                },
              ].map((step, index) => (
                <Reveal key={index} delay={index * 0.1}>
                  <div className="institutional-card p-8 sm:p-10 text-center hover:border-primary-700/40 transition-all relative group h-full">
                    <div className="w-16 h-16 mx-auto mb-8 rounded-2xl bg-primary-50 dark:bg-primary-950/40 flex items-center justify-center relative group-hover:scale-110 transition-transform duration-500">
                      <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-primary-700 text-white text-[10px] font-black flex items-center justify-center shadow-lg">
                        {step.step}
                      </div>
                      <step.icon className="w-8 h-8 text-primary-700" />
                    </div>
                    <h3 className="text-lg font-black uppercase tracking-tight mb-4 italic">
                      {step.title}
                    </h3>
                    <p className="text-sm text-muted-foreground font-medium leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Global Payment Channels */}
      <section id="financial-channels" className="py-24 sm:py-32 scroll-mt-24">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          <Reveal>
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase">
                Global{" "}
                <span className="text-primary-700 italic">Financial</span>{" "}
                Channels
              </h2>
            </div>
          </Reveal>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Instant Digital */}
            <Reveal delay={0.1}>
              <div className="institutional-card p-8 sm:p-10 md:p-12 border-2 border-primary-700/10 hover:border-primary-700/30 transition-all flex flex-col h-full">
                <div className="flex items-start justify-between mb-8 sm:mb-10">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-primary-700 flex items-center justify-center shadow-royal">
                    <CreditCard className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                  </div>
                  <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-primary-700/10 text-primary-700 text-[10px] font-black uppercase tracking-widest">
                    <Sparkles className="w-3 h-3" /> Instant
                  </div>
                </div>

                <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tighter mb-4 italic">
                  Digital Settlement
                </h3>
                <p className="text-muted-foreground font-medium italic leading-relaxed mb-8">
                  For students utilizing international credit/debit cards via
                  our secure gateway.
                </p>

                <div className="space-y-4 mb-8 sm:mb-10 grow">
                  {[
                    "Immediate portal activation",
                    "Secure Stripe processing",
                    "Multi-currency support",
                    "Auto-ledgering",
                  ].map((feat, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-muted-foreground"
                    >
                      <CheckCircle2 className="w-4 h-4 text-primary-700 shrink-0" />
                      {feat}
                    </div>
                  ))}
                </div>

                <div className="pt-8 border-t border-primary-700/5">
                  <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-6">
                    Supported: Visa, Mastercard, AMEX, Discover
                  </div>
                  <Button className="w-full rounded-full py-6 sm:py-7 bg-primary-700 hover:bg-primary-800 font-black text-xs sm:text-sm uppercase tracking-widest">
                    PAY WITH CARD
                  </Button>
                </div>
              </div>
            </Reveal>

            {/* Manual Payment */}
            <Reveal delay={0.2}>
              <div className="institutional-card p-8 sm:p-10 md:p-12 border-2 border-accent/10 hover:border-accent/30 transition-all flex flex-col h-full">
                <div className="flex items-start justify-between mb-8 sm:mb-10">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-accent flex items-center justify-center shadow-lg shadow-accent/20">
                    <Banknote className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                  </div>
                  <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-accent/10 text-accent text-[10px] font-black uppercase tracking-widest">
                    <Shield className="w-3 h-3" /> Manual
                  </div>
                </div>

                <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tighter mb-4 italic text-accent">
                  Bank Remittance
                </h3>
                <p className="text-muted-foreground font-medium italic leading-relaxed mb-8">
                  Preferred for regions utilizing Bank Transfers, M-Pesa, or
                  Western Union.
                </p>

                <div className="space-y-4 mb-8 sm:mb-10 grow">
                  {[
                    "Bank details on application",
                    "Upload receipt for verification",
                    "Portal active in 12-24 hours",
                    "Local remittance support",
                  ].map((feat, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-muted-foreground"
                    >
                      <CheckCircle2 className="w-4 h-4 text-accent shrink-0" />
                      {feat}
                    </div>
                  ))}
                </div>

                <div className="pt-8 border-t border-accent/5">
                  <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-6">
                    Processing: 12-24 Hours post-submission
                  </div>
                  <Button className="w-full rounded-full py-6 sm:py-7 bg-accent hover:bg-accent/90 font-black text-xs sm:text-sm uppercase tracking-widest">
                    CHOOSE BANK TRANSFER
                  </Button>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Tuition & Aid */}
      <section className="py-24 sm:py-32 bg-linear-to-b from-transparent to-primary-50/10">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          <Reveal>
            <div className="text-center mb-20 space-y-4">
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase">
                Tuition &{" "}
                <span className="text-primary-700 italic">Support</span>
              </h2>
            </div>
          </Reveal>

          <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Standard Tuition Card */}
            <Reveal delay={0.1}>
              <div className="institutional-card p-8 sm:p-10 h-full bg-card">
                <BookOpen className="w-10 h-10 text-primary-700 mb-6" />
                <h3 className="text-2xl font-black uppercase tracking-tighter mb-4">
                  Standard Tuition
                </h3>
                <p className="text-sm text-muted-foreground font-medium italic leading-relaxed mb-8">
                  Monthly tuition includes all digital materials and portal
                  access.
                </p>

                <div className="space-y-4">
                  {[
                    { n: "Hifz Program", p: "$200-300" },
                    { n: "Tajweed Mastery", p: "$150-200" },
                    { n: "Arabic Fluency", p: "$100-150" },
                  ].map((row, i) => (
                    <div
                      key={i}
                      className="flex justify-between items-center py-3 border-b border-primary-700/5"
                    >
                      <span className="text-xs font-black uppercase tracking-widest opacity-60">
                        {row.n}
                      </span>
                      <span className="font-black text-primary-700">
                        {row.p}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Zakat Card */}
            <Reveal delay={0.2}>
              <div className="institutional-card p-8 sm:p-10 h-full border-2 border-accent/20 bg-accent/5">
                <Shield className="w-10 h-10 text-accent mb-6" />
                <h3 className="text-2xl font-black uppercase tracking-tighter mb-4 italic text-accent">
                  Zakat Grants
                </h3>
                <p className="text-sm text-muted-foreground font-medium italic leading-relaxed mb-8">
                  For dedicated students facing financial hardship. Applications
                  reviewed quarterly.
                </p>

                <div className="space-y-4 mb-8 sm:mb-10">
                  {[
                    "Council Review",
                    "Proof of Dedication",
                    "Limited Slots",
                  ].map((txt, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-accent"
                    >
                      <CheckCircle2 className="w-3 h-3" /> {txt}
                    </div>
                  ))}
                </div>

                <Button className="w-full rounded-full py-6 bg-accent hover:bg-accent/90 font-black text-xs uppercase tracking-widest mt-auto">
                  APPLY FOR AID
                </Button>
              </div>
            </Reveal>

            {/* Family Card */}
            <Reveal delay={0.3}>
              <div className="institutional-card p-8 sm:p-10 h-full border-2 border-gold/20 bg-gold/5">
                <Users className="w-10 h-10 text-gold mb-6" />
                <h3 className="text-2xl font-black uppercase tracking-tighter mb-4 italic text-gold">
                  Family Rates
                </h3>
                <p className="text-sm text-muted-foreground font-medium italic leading-relaxed mb-8">
                  Special rates for families learning together within one
                  household.
                </p>

                <div className="p-6 rounded-2xl bg-white dark:bg-black/20 border border-gold/20 mb-6">
                  <div className="text-2xl font-black text-gold tracking-tighter mb-1">
                    15% Discount
                  </div>
                  <div className="text-[10px] font-black uppercase tracking-widest opacity-60">
                    For 3+ Household Members
                  </div>
                </div>

                <Button
                  variant="outline"
                  className="w-full rounded-full py-6 border-gold text-gold font-black text-xs uppercase tracking-widest mt-auto"
                >
                  INQUIRE RATES
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Application Form - NOW FUNCTIONAL */}
      <section id="apply-now" className="py-24 sm:py-32 scroll-mt-24">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          <Reveal>
            <div className="institutional-card p-8 sm:p-10 md:p-16 border-2 border-primary-700/20 bg-card/40 backdrop-blur-xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-2 bg-primary-700" />

              <div className="text-center mb-12 sm:mb-16">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter uppercase mb-4 leading-none">
                  Admission{" "}
                  <span className="text-primary-700 italic text-2xl sm:text-3xl md:text-4xl block mt-2 tracking-widest">
                    Gateway
                  </span>
                </h2>
                <div className="h-1 w-12 bg-gold mx-auto rounded-full" />
              </div>

              <form
                onSubmit={handleSubmit}
                className="space-y-10 sm:space-y-12"
              >
                {/* Personal Information */}
                <div className="space-y-6">
                  <h3 className="text-xs font-black uppercase tracking-[0.4em] text-primary-700 border-b border-primary-700/10 pb-4">
                    01. Personal Information
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                        Full Name *
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <input
                          type="text"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleChange}
                          required
                          placeholder="Enter your full name"
                          className="w-full h-12 pl-10 pr-4 rounded-xl border border-border bg-background focus:border-primary-700 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                        Email Address *
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          placeholder="your@email.com"
                          className="w-full h-12 pl-10 pr-4 rounded-xl border border-border bg-background focus:border-primary-700 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                        Phone Number *
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          placeholder="+1 (555) 000-0000"
                          className="w-full h-12 pl-10 pr-4 rounded-xl border border-border bg-background focus:border-primary-700 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                        Country *
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <select
                          name="country"
                          value={formData.country}
                          onChange={handleChange}
                          required
                          className="w-full h-12 pl-10 pr-4 rounded-xl border border-border bg-background focus:border-primary-700 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all appearance-none"
                        >
                          <option value="">Select Country</option>
                          <option value="United States">United States</option>
                          <option value="United Kingdom">United Kingdom</option>
                          <option value="Canada">Canada</option>
                          <option value="Australia">Australia</option>
                          <option value="Nigeria">Nigeria</option>
                          <option value="South Africa">South Africa</option>
                          <option value="Egypt">Egypt</option>
                          <option value="Saudi Arabia">Saudi Arabia</option>
                          <option value="UAE">UAE</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Academic Intent */}
                <div className="space-y-6">
                  <h3 className="text-xs font-black uppercase tracking-[0.4em] text-primary-700 border-b border-primary-700/10 pb-4">
                    02. Academic Intent
                  </h3>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                        Select Program *
                      </label>
                      <select
                        name="program"
                        value={formData.program}
                        onChange={handleChange}
                        required
                        className="w-full h-12 px-4 rounded-xl border border-border bg-background focus:border-primary-700 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all appearance-none"
                      >
                        <option value="">Select a program</option>
                        <option value="hifz">Hifz Al-Quran (2-3 years)</option>
                        <option value="tajweed">
                          Tajweed Al-Itqan (6 months)
                        </option>
                        <option value="arabic">Quranic Arabic (1 year)</option>
                        <option value="tafsir">
                          Tafsir Al-Mubin (1.5 years)
                        </option>
                        <option value="qiroah">
                          Group Qiro'ah - Children (6 months)
                        </option>
                        <option value="juz-amma">
                          Juz Amma Group - Children (8 months)
                        </option>
                        <option value="ijazah">
                          Ijazah Certification Track
                        </option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                        Message / Additional Information
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={4}
                        placeholder="Tell us about your goals, current level, or any questions..."
                        className="w-full p-4 rounded-xl border border-border bg-background focus:border-primary-700 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all resize-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Honeypot spam protection */}
                <input type="text" name="_gotcha" style={{ display: "none" }} />

                {/* Submit Button */}
                <div className="pt-8">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full rounded-full py-6 sm:py-8 bg-primary-700 hover:bg-primary-800 font-black text-base sm:text-lg shadow-royal group disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <Loader2 className="w-5 h-5 animate-spin" />
                        SUBMITTING...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        COMPLETE DIGITAL APPLICATION
                        <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                      </span>
                    )}
                  </Button>
                  <p className="text-center text-[10px] font-black uppercase tracking-widest text-muted-foreground mt-6 opacity-60">
                    Council review within 24 hours • Global processing active
                  </p>
                </div>
              </form>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="pb-24 sm:pb-32 lg:pb-48">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          <Reveal>
            <div className="text-center mb-20 space-y-4">
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase italic text-primary-700">
                Admissions FAQ
              </h2>
              <div className="h-1 w-12 bg-gold mx-auto rounded-full" />
            </div>
          </Reveal>

          <div className="space-y-6">
            {[
              {
                q: "How long does the admission process take?",
                a: "Applications are reviewed within 24 hours. Portal activation typically occurs 48 hours after tuition settlement.",
              },
              {
                q: "Can I change programs after enrollment?",
                a: "Yes, curriculum shifts are permitted within the first academic month of your enrollment.",
              },
              {
                q: "Is financial aid available?",
                a: "Yes, Zakat-funded grants are available for eligible students facing financial hardship. Applications are reviewed quarterly.",
              },
              {
                q: "What documents do I need to apply?",
                a: "A valid ID, educational background information, and proof of payment method are required for complete registration.",
              },
              {
                q: "Is there an age requirement for programs?",
                a: "Children's programs accept ages 5-12. Adult programs are open to all ages 13 and above with appropriate reading levels.",
              },
            ].map((faq, index) => (
              <Reveal key={index} delay={index * 0.05}>
                <div className="institutional-card p-8 sm:p-10 hover:border-primary-700/40 transition-all group">
                  <h3 className="font-black text-lg sm:text-xl uppercase tracking-tighter mb-4 group-hover:text-primary-700 transition-colors italic">
                    {faq.q}
                  </h3>
                  <p className="text-muted-foreground font-medium leading-relaxed italic border-l-2 border-primary-700/10 pl-6">
                    {faq.a}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}