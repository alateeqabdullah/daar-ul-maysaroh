// "use client";

// import { PricingPlan } from "@/app/generated/prisma/client";
// import { PricingCalculator } from "@/components/public/pricing/pricing-calculator";
// import { Button } from "@/components/ui/button";
// import {
//   ArrowRight,
//   Banknote,
//   Building2,
//   Calendar,
//   Check,
//   Clock,
//   Copy,
//   CreditCard,
//   GraduationCap,
//   Heart,
//   HelpCircle,
//   Landmark,
//   Mail,
//   Phone,
//   Shield,
//   Sparkles,
//   Star,
//   Upload,
//   Zap
// } from "lucide-react";
// import Link from "next/link";
// import { useState } from "react";

// // Copy Button Component
// function CopyButton({ text }: { text: string }) {
//   const [copied, setCopied] = useState(false);

//   const handleCopy = async () => {
//     await navigator.clipboard.writeText(text);
//     setCopied(true);
//     setTimeout(() => setCopied(false), 2000);
//   };

//   return (
//     <button
//       onClick={handleCopy}
//       className="inline-flex items-center gap-1 text-xs text-primary-700 hover:text-primary-800 transition-colors ml-2"
//       aria-label="Copy to clipboard"
//     >
//       {copied ? (
//         <Check className="w-3 h-3 text-green-500" />
//       ) : (
//         <Copy className="w-3 h-3" />
//       )}
//     </button>
//   );
// }

// const FAQS = [
//   {
//     q: "How do I submit a Bank Transfer receipt?",
//     a: "Once you register, your dashboard will have a 'Submit Receipt' portal where you can upload a photo of your transfer confirmation. Activation occurs within 12 business hours.",
//   },
//   {
//     q: "Is the pricing inclusive of learning materials?",
//     a: "Yes. All digital Mushafs, Tajweed PDFs, and tracking software are included in your monthly tuition.",
//   },
//   {
//     q: "Can family members share a plan?",
//     a: "Plans are 1-on-1 for quality assurance. However, we offer a 15% 'Family Discount' for 3 or more enrollments from the same household.",
//   },
//   {
//     q: "Do I get a certificate upon completion?",
//     a: "Upon completing any major level or the full Hifz, students undergo a final exam to receive their Ijazah or Certificate of Excellence.",
//   },
//   {
//     q: "What is the refund policy?",
//     a: "Tuition is non-refundable. We offer a free assessment session before enrollment to ensure program fit. This helps you make an informed decision.",
//   },
//   {
//     q: "How do I schedule a free assessment?",
//     a: "Click the 'Book Free Assessment' button above or visit our Contact page. Our admissions team will reach out within 24 hours to schedule your session.",
//   },
// ];

// export default function AdmissionsPricingPage() {
//   // const [dbPlans, setDbPlans] = useState([]);
//   // const [isLoading, setIsLoading] = useState(true);

//   // useEffect(() => {
//   //   const fetchPlans = async () => {
//   //     try {
//   //       const response = await fetch("/api/(public)/pricing-plans");
//   //       const data = await response.json();
//   //       setDbPlans(data);
//   //     } catch (error) {
//   //       console.error("Failed to fetch pricing plans:", error);
//   //     } finally {
//   //       setIsLoading(false);
//   //     }
//   //   };
//   //   fetchPlans();
//   // }, []);

//   // if (isLoading) {
//   //   return (
//   //     <main className="pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 md:pb-20 bg-background min-h-screen">
//   //       <div className="container mx-auto px-4 sm:px-6 flex items-center justify-center min-h-[60vh]">
//   //         <div className="text-center">
//   //           <div className="w-12 h-12 border-4 border-primary-700 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
//   //           <p className="text-muted-foreground">Loading pricing information...</p>
//   //         </div>
//   //       </div>
//   //     </main>
//   //   );
//   // }

//   const dbPlans: PricingPlan[] = [];

//   return (
//     <main className="pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 md:pb-20 bg-background">
//       <div className="container mx-auto px-4 sm:px-6">
//         {/* ==================== HERO SECTION ==================== */}
//         <div className="max-w-5xl mx-auto text-center mb-16 sm:mb-20 md:mb-24 lg:mb-32">
//           <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 text-xs font-black uppercase tracking-wider mb-6">
//             <Landmark className="w-3.5 h-3.5" /> Admissions 2026 Now Open
//           </div>
//           <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter font-heading leading-[1.1] mb-6">
//             Admission <br />
//             <span className="text-primary-700 italic">Framework.</span>
//           </h1>
//           <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
//             Al-Maysaroh provides a globally accessible enrollment system,
//             accommodating diverse banking infrastructures from over 50 nations.
//           </p>

//           {/* Payment Methods */}
//           <div className="flex flex-wrap justify-center gap-2 mt-8">
//             {[
//               // { icon: CreditCard, label: "Visa / Mastercard" },
//               { icon: Banknote, label: "Bank Transfer" },
//               // { icon: Globe, label: "Mobile Money" },
//               // { icon: Building2, label: "Western Union" },
//             ].map((method, i) => (
//               <div
//                 key={i}
//                 className="flex items-center gap-2 px-4 py-2 rounded-full bg-muted/30 border border-border text-xs font-black uppercase tracking-wider"
//               >
//                 <method.icon className="w-3.5 h-3.5 text-primary-700" />
//                 <span>{method.label}</span>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* ==================== FINANCIAL CHANNELS & ROADMAP ==================== */}
//         <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 mb-20 sm:mb-28 md:mb-32">

//           {/* LEFT: Financial Channels */}
//           <div className="space-y-8">
//             <div>
//               <h2 className="text-3xl sm:text-4xl font-black tracking-tighter mb-4">
//                 Financial <span className="text-primary-700 italic">Channels</span>
//               </h2>
//               <p className="text-muted-foreground text-lg">
//                 Choose between instant digital activation or manual approval—both designed for global accessibility.
//               </p>
//             </div>

//             <div className="space-y-4">
//               {/* Instant Card */}
//               <div className="group relative p-6 rounded-2xl bg-linear-to-br from-background to-primary-50/20 border border-primary-100 dark:border-primary-900/30 hover:border-primary-700/50 transition-all duration-300 hover:shadow-xl">
//                 <div className="flex items-start gap-5">
//                   <div className="w-14 h-14 rounded-2xl bg-primary-700 flex items-center justify-center shrink-0 shadow-lg">
//                     <CreditCard className="w-7 h-7 text-white" />
//                   </div>
//                   <div className="flex-1">
//                     <h3 className="font-black text-xl uppercase tracking-tight mb-2">Instant Digital Activation</h3>
//                     <p className="text-muted-foreground text-sm leading-relaxed">
//                       Secure card processing via Stripe. Use any international Credit/Debit card for immediate portal access and teacher assignment.
//                     </p>
//                     <div className="mt-3 flex items-center gap-2">
//                       <Zap className="w-4 h-4 text-primary-700" />
//                       <span className="text-xs font-black text-primary-700 uppercase tracking-wider">Instant Access</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Manual Card */}
//               <div className="group relative p-6 rounded-2xl bg-linear-to-br from-background to-accent/5 border border-accent/10 hover:border-accent/30 transition-all duration-300 hover:shadow-xl">
//                 <div className="flex items-start gap-5">
//                   <div className="w-14 h-14 rounded-2xl bg-accent flex items-center justify-center shrink-0 shadow-lg">
//                     <Banknote className="w-7 h-7 text-white" />
//                   </div>
//                   <div className="flex-1">
//                     <h3 className="font-black text-xl uppercase tracking-tight mb-2">Manual Scholarly Approval</h3>
//                     <p className="text-muted-foreground text-sm leading-relaxed">
//                       Bank Transfer, Mobile Money, or Western Union. Submit receipt for manual portal activation within 12 hours.
//                     </p>
//                     <div className="mt-3 flex items-center gap-2">
//                       <Clock className="w-4 h-4 text-accent" />
//                       <span className="text-xs font-black text-accent uppercase tracking-wider">12-Hour Activation</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* No Refund Notice */}
//             <div className="mt-6 p-4 rounded-xl bg-amber-500/5 border border-amber-500/20">
//               <div className="flex items-start gap-3">
//                 <Shield className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
//                 <p className="text-xs text-amber-600 dark:text-amber-400">
//                   Tuition is non-refundable. A free assessment session is available to ensure program fit before enrollment.
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* RIGHT: Admissions Roadmap */}
//           <div className="glass-surface p-6 sm:p-8 rounded-3xl border relative overflow-hidden">
//             <div className="absolute top-0 right-0 p-6 opacity-10">
//               <GraduationCap className="w-24 h-24 text-primary-700" />
//             </div>

//             <div className="relative z-10">
//               <div className="flex items-center gap-3 mb-8">
//                 <div className="w-10 h-10 rounded-xl bg-primary-700/10 flex items-center justify-center">
//                   <Star className="w-5 h-5 text-primary-700" />
//                 </div>
//                 <h3 className="font-black text-xl uppercase tracking-tight">Your Admissions Journey</h3>
//               </div>

//               <div className="space-y-8">
//                 {[
//                   { step: "01", title: "Structure Your Plan", desc: "Use the calculator below to define your frequency and program." },
//                   { step: "02", title: "Academic Registry", desc: "Complete the admission form with your educational background." },
//                   { step: "03", title: "Settle Tuition", desc: "Choose instant card payment or manual bank transfer." },
//                   { step: "04", title: "Scholar Match", desc: "Our Council assigns a teacher matching your level." },
//                 ].map((item, idx) => (
//                   <div key={idx} className="flex gap-5 group">
//                     <div className="w-12 h-12 rounded-xl bg-primary-700 text-white flex items-center justify-center text-lg font-black shadow-md group-hover:scale-105 transition-transform shrink-0">
//                       {item.step}
//                     </div>
//                     <div>
//                       <h4 className="font-black text-base uppercase tracking-tight">{item.title}</h4>
//                       <p className="text-sm text-muted-foreground mt-1">{item.desc}</p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* ==================== PRICING CALCULATOR ==================== */}
//         <div className="mb-20 sm:mb-28 md:mb-32 pt-12 sm:pt-16 border-t border-border/50">
//           <div className="max-w-4xl mx-auto text-center mb-12">
//             <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter font-heading mb-4">
//               Calculated <span className="text-primary-700 italic">Tuition</span>
//             </h2>
//             <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
//               Every soul is unique. Our tuition adjusts based on your intensity, duration, and chosen discipline.
//             </p>
//           </div>

//           <PricingCalculator dbPlans={dbPlans} />

//           <div className="text-center mt-6">
//             <p className="text-xs text-muted-foreground">💰 All prices are in USD. International currency conversion fees may apply.</p>
//           </div>
//         </div>

//         {/* ==================== GRANTS & BANK DETAILS ==================== */}
//         <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mb-20 sm:mb-28 md:mb-32">

//           {/* LEFT: Grants + Free Assessment */}
//           <div className="space-y-8">
//             {/* Grants Card */}
//             <div className="p-6 sm:p-8 rounded-2xl bg-linear-to-br from-background to-primary-50/10 border border-primary-100 dark:border-primary-900/30">
//               <div className="flex items-center gap-3 mb-4">
//                 <Heart className="w-8 h-8 text-primary-700" />
//                 <h3 className="font-black text-2xl uppercase tracking-tight">Scholarly Grants</h3>
//               </div>
//               <p className="text-muted-foreground mb-4">
//                 Are you a dedicated student of knowledge facing extreme financial hardship? Al-Maysaroh offers Zakat-funded grants for eligible students.
//               </p>
//               <div className="p-3 rounded-lg bg-primary-50 dark:bg-primary-950/30 mb-4">
//                 <p className="text-xs font-medium flex items-center gap-2">
//                   <Calendar className="w-3.5 h-3.5 text-primary-700" />
//                   Grant applications close: August 15, 2026
//                 </p>
//               </div>
//               <Link href="/financial-aid">
//                 <Button variant="outline" className="w-full sm:w-auto rounded-full font-black group">
//                   APPLY FOR GRANTS
//                   <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
//                 </Button>
//               </Link>
//             </div>

//             {/* Free Assessment Card */}
//             <div className="p-6 sm:p-8 rounded-2xl bg-linear-to-br from-accent/5 to-accent/10 border border-accent/20 text-center">
//               <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 mb-4">
//                 <Sparkles className="w-8 h-8 text-accent" />
//               </div>
//               <h3 className="font-black text-2xl uppercase tracking-tight mb-2">Free Assessment Session</h3>
//               <p className="text-muted-foreground mb-4">
//                 Not sure which program fits your level? Schedule a complimentary assessment with our scholars to determine your ideal learning path.
//               </p>
//               <Link href="/contact">
//                 <Button className="w-full rounded-full bg-accent hover:bg-accent/90 text-white font-black group">
//                   BOOK FREE ASSESSMENT
//                   <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
//                 </Button>
//               </Link>
//               <p className="text-xs text-muted-foreground/70 mt-3">No commitment. No payment required.</p>
//             </div>
//           </div>

//           {/* RIGHT: Bank Details */}
//           <div className="p-6 sm:p-8 rounded-2xl glass-surface border-2 border-primary-200 dark:border-primary-800">
//             <div className="flex items-center gap-3 mb-6">
//               <div className="w-12 h-12 rounded-xl bg-primary-700/10 flex items-center justify-center">
//                 <Building2 className="w-6 h-6 text-primary-700" />
//               </div>
//               <h3 className="font-black text-2xl uppercase tracking-tight">Bank Transfer Details</h3>
//             </div>

//             <div className="space-y-4">
//               {[
//                 { label: "Bank Name", value: "Lead Bank", copyable: true },
//                 // { label: "Account Name", value: "Al-Maysaroh International Institute", copyable: true },
//                 { label: "Account Name", value: "Abubakar Abdullah", copyable: true },
//                 { label: "Account Number", value: "219056090769", copyable: true, highlight: true },
//                 { label: "Routing Number", value: "101019644", copyable: true },
//               ].map((field, idx) => (
//                 <div key={idx} className="flex justify-between items-center flex-wrap gap-2 py-2 border-b border-border/50 last:border-0">
//                   <span className="text-xs font-black uppercase tracking-wider text-muted-foreground">{field.label}</span>
//                   <div className="flex items-center gap-1">
//                     <span className={`font-mono text-sm ${field.highlight ? 'text-primary-700 font-black' : ''}`}>{field.value}</span>
//                     {field.copyable && <CopyButton text={field.value} />}
//                   </div>
//                 </div>
//               ))}
//               <div className="mt-4 pt-2">
//                 <p className="text-xs text-muted-foreground mb-1 font-black uppercase tracking-wider">Reference</p>
//                 <p className="text-sm font-medium">Use your registered email as payment reference</p>
//               </div>
//             </div>

//             <div className="mt-6 p-4 rounded-xl bg-accent/5 border border-accent/20">
//               <div className="flex items-start gap-3">
//                 <Upload className="w-4 h-4 text-accent shrink-0 mt-0.5" />
//                 <div>
//                   <p className="text-xs font-black uppercase tracking-wider text-accent">After Transfer</p>
//                   <p className="text-xs text-muted-foreground mt-1">Upload receipt via email (info.almaysaroh@gmail.com) or WhatsApp (+2349110163930)</p>
//                 </div>
//               </div>
//             </div>

//             <div className="mt-4 p-3 rounded-xl bg-primary-50 dark:bg-primary-950/30 text-center">
//               <p className="text-xs font-medium">⏱️ Manual verification typically completed within 12 business hours</p>
//             </div>
//           </div>
//         </div>

//         {/* ==================== FAQ SECTION ==================== */}
//         <div className="text-center mb-12">
//           <h2 className="text-4xl sm:text-5xl font-black tracking-tighter mb-4">Admissions <span className="text-primary-700 italic">FAQ</span></h2>
//           <p className="text-muted-foreground">Frequently asked questions about the Al-Maysaroh admission process.</p>
//         </div>

//         <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-12">
//           {FAQS.map((faq, idx) => (
//             <div key={idx} className="p-6 rounded-2xl bg-card border hover:border-primary-700 transition-all group">
//               <div className="flex gap-4">
//                 <HelpCircle className="w-5 h-5 text-primary-700 shrink-0 mt-0.5" />
//                 <div>
//                   <p className="font-black text-sm uppercase tracking-tight mb-1">{faq.q}</p>
//                   <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Contact Bar */}
//         <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8 pb-4">
//           <Link href="/contact">
//             <Button variant="outline" className="rounded-full px-6 py-3 font-black gap-2 group">
//               <Mail className="w-4 h-4" />
//               CONTACT ADMISSIONS
//               <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
//             </Button>
//           </Link>

//           <div className="flex items-center gap-6">
//             <div className="flex items-center gap-2 text-sm text-muted-foreground">
//               <Phone className="w-4 h-4 text-primary-700" />
//               <span>(+234) 911-016-3930</span>
//             </div>
//             <div className="w-px h-4 bg-border" />
//             <div className="flex items-center gap-2 text-sm text-muted-foreground">
//               <Mail className="w-4 h-4 text-primary-700" />
//               <span>info.almaysaroh@gmail.com</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// }

"use client";

import { PricingPlan } from "@/app/generated/prisma/client";
import { PricingCalculator } from "@/components/public/pricing/pricing-calculator";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Banknote,
  Building2,
  Calendar,
  Check,
  Clock,
  Copy,
  CreditCard,
  GraduationCap,
  Heart,
  HelpCircle,
  Landmark,
  Mail,
  Phone,
  Shield,
  Sparkles,
  Star,
  Upload,
  Zap,
  Globe,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

// Copy Button Component
function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="inline-flex items-center gap-1 text-xs text-purple-600 hover:text-purple-700 transition-colors ml-2"
      aria-label="Copy to clipboard"
    >
      {copied ? (
        <Check className="w-3 h-3 text-green-500" />
      ) : (
        <Copy className="w-3 h-3" />
      )}
    </button>
  );
}

const FAQS = [
  {
    q: "How do I submit a Bank Transfer receipt?",
    a: "Once you register, your dashboard will have a 'Submit Receipt' portal where you can upload a photo of your transfer confirmation. Activation occurs within 12 business hours.",
  },
  {
    q: "Is the pricing inclusive of learning materials?",
    a: "Yes. All digital Mushafs, Tajweed PDFs, and tracking software are included in your monthly tuition.",
  },
  {
    q: "Can family members share a plan?",
    a: "Plans are 1-on-1 for quality assurance. However, we offer a 15% 'Family Discount' for 3 or more enrollments from the same household.",
  },
  {
    q: "Do I get a certificate upon completion?",
    a: "Upon completing any major level or the full Hifz, students undergo a final exam to receive their Ijazah or Certificate of Excellence.",
  },
  {
    q: "What is the refund policy?",
    a: "Tuition is non-refundable. We offer a free assessment session before enrollment to ensure program fit. This helps you make an informed decision.",
  },
  {
    q: "How do I schedule a free assessment?",
    a: "Click the 'Book Free Assessment' button above or visit our Contact page. Our admissions team will reach out within 24 hours to schedule your session.",
  },
];

export default function AdmissionsPricingPage() {
  const dbPlans: PricingPlan[] = [];

  return (
    <main className="pt-30 xs:pt-24 sm:pt-28 md:pt-32 lg:pt-36 pb-12 xs:pb-16 sm:pb-20 md:pb-24 bg-gradient-to-b from-background via-purple-50/5 to-amber-50/5">
      <div className="container mx-auto px-4 xs:px-5 sm:px-6">
        {/* ==================== HERO SECTION ==================== */}
        <div className="max-w-5xl mx-auto text-center mb-12 xs:mb-16 sm:mb-20 md:mb-24 lg:mb-28">
          <div className="inline-flex items-center gap-1.5 xs:gap-2 px-3 xs:px-4 py-1.5 xs:py-2 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 text-[8px] xs:text-[9px] sm:text-[10px] font-black uppercase tracking-wider border border-purple-200 dark:border-purple-800 mb-4 xs:mb-5 sm:mb-6">
            <Landmark className="w-3 h-3 xs:w-3.5 xs:h-3.5 text-amber-500" />
            Admissions 2026 Now Open
          </div>
          <h1 className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter font-heading leading-[1.1] mb-4 xs:mb-5 sm:mb-6">
            Admission <br />
            <span className="bg-gradient-to-r from-purple-600 to-amber-600 bg-clip-text text-transparent italic">
              Framework.
            </span>
          </h1>
          <p className="text-base xs:text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
            Al-Maysaroh provides a globally accessible enrollment system,
            accommodating diverse banking infrastructures from over 50 nations.
          </p>

          {/* Payment Methods */}
          <div className="flex flex-wrap justify-center gap-2 mt-6 xs:mt-8">
            {[
              { icon: CreditCard, label: "Card Payment", color: "purple" },
              { icon: Banknote, label: "Bank Transfer", color: "amber" },
              { icon: Globe, label: "Global Access", color: "purple" },
            ].map((method, i) => {
              const Icon = method.icon;
              return (
                <div
                  key={i}
                  className={`flex items-center gap-1.5 xs:gap-2 px-3 xs:px-4 py-1.5 xs:py-2 rounded-full bg-${method.color === "purple" ? "purple" : "amber"}-50 dark:bg-${method.color === "purple" ? "purple" : "amber"}-950/30 border border-${method.color === "purple" ? "purple" : "amber"}-200 dark:border-${method.color === "purple" ? "purple" : "amber"}-800 text-${method.color === "purple" ? "purple" : "amber"}-600 text-[9px] xs:text-[10px] font-black uppercase tracking-wider`}
                >
                  <Icon className="w-3 h-3 xs:w-3.5 xs:h-3.5" />
                  <span>{method.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* ==================== FINANCIAL CHANNELS & ROADMAP ==================== */}
        <div className="grid lg:grid-cols-2 gap-6 xs:gap-8 lg:gap-12 xl:gap-16 mb-16 xs:mb-20 sm:mb-24 md:mb-28 lg:mb-32">
          {/* LEFT: Financial Channels */}
          <div className="space-y-6 xs:space-y-8">
            <div>
              <h2 className="text-3xl xs:text-4xl sm:text-5xl font-black tracking-tighter mb-3 xs:mb-4">
                Financial{" "}
                <span className="bg-gradient-to-r from-purple-600 to-amber-600 bg-clip-text text-transparent italic">
                  Channels
                </span>
              </h2>
              <p className="text-muted-foreground text-base xs:text-lg">
                Choose between instant digital activation or manual
                approval—both designed for global accessibility.
              </p>
            </div>

            <div className="space-y-4 xs:space-y-5">
              {/* Instant Card - Purple */}
              <div className="group relative p-5 xs:p-6 rounded-xl xs:rounded-2xl bg-card border-2 border-purple-200 dark:border-purple-800 hover:border-purple-300 transition-all duration-300 hover:shadow-xl">
                <div className="flex items-start gap-4 xs:gap-5">
                  <div className="w-12 h-12 xs:w-14 xs:h-14 rounded-xl bg-gradient-to-r from-purple-600 to-purple-700 flex items-center justify-center shrink-0 shadow-lg">
                    <CreditCard className="w-6 h-6 xs:w-7 xs:h-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-black text-lg xs:text-xl uppercase tracking-tight mb-1 xs:mb-2">
                      Instant Digital Activation
                    </h3>
                    <p className="text-muted-foreground text-xs xs:text-sm leading-relaxed">
                      Secure card processing via Stripe. Use any international
                      Credit/Debit card for immediate portal access and teacher
                      assignment.
                    </p>
                    <div className="mt-2 xs:mt-3 flex items-center gap-2">
                      <Zap className="w-3.5 h-3.5 text-purple-600" />
                      <span className="text-[9px] xs:text-[10px] font-black text-purple-600 uppercase tracking-wider">
                        Instant Access
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Manual Card - Amber */}
              <div className="group relative p-5 xs:p-6 rounded-xl xs:rounded-2xl bg-card border-2 border-amber-200 dark:border-amber-800 hover:border-amber-300 transition-all duration-300 hover:shadow-xl">
                <div className="flex items-start gap-4 xs:gap-5">
                  <div className="w-12 h-12 xs:w-14 xs:h-14 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 flex items-center justify-center shrink-0 shadow-lg">
                    <Banknote className="w-6 h-6 xs:w-7 xs:h-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-black text-lg xs:text-xl uppercase tracking-tight mb-1 xs:mb-2">
                      Manual Scholarly Approval
                    </h3>
                    <p className="text-muted-foreground text-xs xs:text-sm leading-relaxed">
                      Bank Transfer, Mobile Money, or Western Union. Submit
                      receipt for manual portal activation within 12 hours.
                    </p>
                    <div className="mt-2 xs:mt-3 flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-amber-600" />
                      <span className="text-[9px] xs:text-[10px] font-black text-amber-600 uppercase tracking-wider">
                        12-Hour Activation
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* No Refund Notice */}
            <div className="mt-4 xs:mt-6 p-3 xs:p-4 rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800">
              <div className="flex items-start gap-2 xs:gap-3">
                <Shield className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                <p className="text-[10px] xs:text-xs text-amber-700 dark:text-amber-400">
                  Tuition is non-refundable. A free assessment session is
                  available to ensure program fit before enrollment.
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT: Admissions Roadmap */}
          <div className="bg-card p-5 xs:p-6 sm:p-7 md:p-8 rounded-xl xs:rounded-2xl border-2 border-purple-200 dark:border-purple-800 relative overflow-hidden shadow-lg">
            <div className="absolute top-0 right-0 p-4 xs:p-5 opacity-10">
              <GraduationCap className="w-16 h-16 xs:w-20 xs:h-20 text-purple-600" />
            </div>

            <div className="relative z-10">
              <div className="flex items-center gap-2 xs:gap-3 mb-5 xs:mb-6 sm:mb-8">
                <div className="w-8 h-8 xs:w-10 xs:h-10 rounded-lg bg-purple-100 dark:bg-purple-950/40 flex items-center justify-center">
                  <Star className="w-4 h-4 xs:w-5 xs:h-5 text-purple-600" />
                </div>
                <h3 className="font-black text-lg xs:text-xl uppercase tracking-tight">
                  Your Admissions Journey
                </h3>
              </div>

              <div className="space-y-5 xs:space-y-6 sm:space-y-7 md:space-y-8">
                {[
                  {
                    step: "01",
                    title: "Structure Your Plan",
                    desc: "Use the calculator below to define your frequency and program.",
                    color: "purple",
                  },
                  {
                    step: "02",
                    title: "Academic Registry",
                    desc: "Complete the admission form with your educational background.",
                    color: "amber",
                  },
                  {
                    step: "03",
                    title: "Settle Tuition",
                    desc: "Choose instant card payment or manual bank transfer.",
                    color: "purple",
                  },
                  {
                    step: "04",
                    title: "Scholar Match",
                    desc: "Our Council assigns a teacher matching your level.",
                    color: "amber",
                  },
                ].map((item, idx) => {
                  const colors =
                    item.color === "purple"
                      ? "bg-gradient-to-r from-purple-600 to-purple-700"
                      : "bg-gradient-to-r from-amber-500 to-amber-600";
                  const textColor =
                    item.color === "purple"
                      ? "text-purple-600"
                      : "text-amber-600";

                  return (
                    <div
                      key={idx}
                      className="flex gap-3 xs:gap-4 sm:gap-5 group"
                    >
                      <div
                        className={`w-10 h-10 xs:w-11 xs:h-11 sm:w-12 sm:h-12 rounded-xl ${colors} text-white flex items-center justify-center text-base xs:text-lg font-black shadow-md group-hover:scale-105 transition-transform shrink-0`}
                      >
                        {item.step}
                      </div>
                      <div>
                        <h4
                          className={`font-black text-sm xs:text-base uppercase tracking-tight ${textColor}`}
                        >
                          {item.title}
                        </h4>
                        <p className="text-xs xs:text-sm text-muted-foreground mt-0.5 xs:mt-1">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* ==================== PRICING CALCULATOR ==================== */}
        <div className="mb-16 xs:mb-20 sm:mb-24 md:mb-28 lg:mb-32 pt-8 xs:pt-10 sm:pt-12 border-t border-border/50">
          <div className="max-w-4xl mx-auto text-center mb-8 xs:mb-10 sm:mb-12">
            <h2 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter font-heading mb-3 xs:mb-4">
              Calculated{" "}
              <span className="bg-gradient-to-r from-purple-600 to-amber-600 bg-clip-text text-transparent italic">
                Tuition
              </span>
            </h2>
            <p className="text-base xs:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
              Every soul is unique. Our tuition adjusts based on your intensity,
              duration, and chosen discipline.
            </p>
          </div>

          <PricingCalculator dbPlans={dbPlans} />

          <div className="text-center mt-5 xs:mt-6">
            <p className="text-[10px] xs:text-xs text-muted-foreground">
              💰 All prices are in USD. International currency conversion fees
              may apply.
            </p>
          </div>
        </div>

        {/* ==================== GRANTS & BANK DETAILS ==================== */}
        <div className="grid lg:grid-cols-2 gap-6 xs:gap-8 lg:gap-12 mb-16 xs:mb-20 sm:mb-24 md:mb-28 lg:mb-32">
          {/* LEFT: Grants + Free Assessment */}
          <div className="space-y-6 xs:space-y-8">
            {/* Grants Card - Purple */}
            <div className="p-5 xs:p-6 sm:p-7 md:p-8 rounded-xl xs:rounded-2xl bg-card border-2 border-purple-200 dark:border-purple-800 hover:border-purple-300 transition-all">
              <div className="flex items-center gap-2 xs:gap-3 mb-3 xs:mb-4">
                <Heart className="w-6 h-6 xs:w-7 xs:h-7 text-purple-600" />
                <h3 className="font-black text-xl xs:text-2xl uppercase tracking-tight">
                  Scholarly Grants
                </h3>
              </div>
              <p className="text-muted-foreground text-xs xs:text-sm mb-3 xs:mb-4">
                Are you a dedicated student of knowledge facing extreme
                financial hardship? Al-Maysaroh offers Zakat-funded grants for
                eligible students.
              </p>
              <div className="p-2.5 xs:p-3 rounded-lg bg-purple-50 dark:bg-purple-950/30 mb-3 xs:mb-4">
                <p className="text-[10px] xs:text-xs font-medium flex items-center gap-1.5 xs:gap-2">
                  <Calendar className="w-3 h-3 xs:w-3.5 xs:h-3.5 text-purple-600" />
                  Grant applications close: August 15, 2026
                </p>
              </div>
              <Link href="/financial-aid">
                <Button
                  variant="outline"
                  className="w-full sm:w-auto rounded-full font-black text-xs sm:text-sm border-purple-300 text-purple-600 hover:bg-purple-50 group"
                >
                  APPLY FOR GRANTS
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>

            {/* Free Assessment Card - Amber */}
            <div className="p-5 xs:p-6 sm:p-7 md:p-8 rounded-xl xs:rounded-2xl bg-gradient-to-br from-amber-50/30 to-amber-50/10 dark:from-amber-950/20 dark:to-amber-950/10 border-2 border-amber-200 dark:border-amber-800 text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 xs:w-16 xs:h-16 rounded-full bg-amber-100 dark:bg-amber-950/40 mb-3 xs:mb-4">
                <Sparkles className="w-7 h-7 xs:w-8 xs:h-8 text-amber-500" />
              </div>
              <h3 className="font-black text-xl xs:text-2xl uppercase tracking-tight mb-2">
                Free Assessment Session
              </h3>
              <p className="text-muted-foreground text-xs xs:text-sm mb-3 xs:mb-4">
                Not sure which program fits your level? Schedule a complimentary
                assessment with our scholars to determine your ideal learning
                path.
              </p>
              <Link href="/contact">
                <Button className="w-full rounded-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-black text-xs sm:text-sm shadow-md group">
                  BOOK FREE ASSESSMENT
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <p className="text-[9px] xs:text-[10px] text-muted-foreground/70 mt-2 xs:mt-3">
                No commitment. No payment required.
              </p>
            </div>
          </div>

          {/* RIGHT: Bank Details */}
          <div className="p-5 xs:p-6 sm:p-7 md:p-8 rounded-xl xs:rounded-2xl bg-card border-2 border-purple-200 dark:border-purple-800 shadow-lg">
            <div className="flex items-center gap-2 xs:gap-3 mb-4 xs:mb-5 sm:mb-6">
              <div className="w-10 h-10 xs:w-11 xs:h-11 rounded-lg bg-purple-100 dark:bg-purple-950/40 flex items-center justify-center">
                <Building2 className="w-5 h-5 xs:w-5.5 xs:h-5.5 text-purple-600" />
              </div>
              <h3 className="font-black text-xl xs:text-2xl uppercase tracking-tight">
                Bank Transfer Details
              </h3>
            </div>

            <div className="space-y-3 xs:space-y-4">
              {[
                {
                  label: "Bank Name",
                  value: "Lead Bank",
                  copyable: true,
                  color: "purple",
                },
                {
                  label: "Account Name",
                  value: "Abubakar Abdullah",
                  copyable: true,
                  color: "amber",
                },
                {
                  label: "Account Number",
                  value: "219056090769",
                  copyable: true,
                  highlight: true,
                  color: "purple",
                },
                {
                  label: "Routing Number",
                  value: "101019644",
                  copyable: true,
                  color: "amber",
                },
              ].map((field, idx) => {
                const textColor = field.highlight
                  ? "text-purple-600 dark:text-purple-400"
                  : field.color === "purple"
                    ? "text-purple-700 dark:text-purple-300"
                    : "text-amber-700 dark:text-amber-300";

                return (
                  <div
                    key={idx}
                    className="flex justify-between items-center flex-wrap gap-2 py-2 border-b border-border/50 last:border-0"
                  >
                    <span className="text-[9px] xs:text-[10px] font-black uppercase tracking-wider text-muted-foreground">
                      {field.label}
                    </span>
                    <div className="flex items-center gap-1">
                      <span
                        className={`font-mono text-xs xs:text-sm ${textColor} ${field.highlight ? "font-black" : "font-medium"}`}
                      >
                        {field.value}
                      </span>
                      {field.copyable && <CopyButton text={field.value} />}
                    </div>
                  </div>
                );
              })}
              <div className="mt-3 xs:mt-4 pt-1 xs:pt-2">
                <p className="text-[9px] xs:text-[10px] text-muted-foreground mb-0.5 xs:mb-1 font-black uppercase tracking-wider">
                  Reference
                </p>
                <p className="text-[10px] xs:text-xs font-medium text-purple-600 dark:text-purple-400">
                  Use your registered email as payment reference
                </p>
              </div>
            </div>

            <div className="mt-4 xs:mt-5 sm:mt-6 p-3 xs:p-4 rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800">
              <div className="flex items-start gap-2 xs:gap-3">
                <Upload className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-[10px] xs:text-xs font-black uppercase tracking-wider text-amber-600 dark:text-amber-400">
                    After Transfer
                  </p>
                  <p className="text-[9px] xs:text-[10px] text-muted-foreground mt-0.5 xs:mt-1">
                    Upload receipt via email (info.almaysaroh@gmail.com) or
                    WhatsApp (+2349110163930)
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-3 xs:mt-4 p-2.5 xs:p-3 rounded-lg bg-purple-50 dark:bg-purple-950/30 text-center">
              <p className="text-[9px] xs:text-[10px] font-medium text-purple-700 dark:text-purple-400">
                ⏱️ Manual verification typically completed within 12 business
                hours
              </p>
            </div>
          </div>
        </div>

        {/* ==================== FAQ SECTION ==================== */}
        <div className="text-center mb-8 xs:mb-10 sm:mb-12">
          <h2 className="text-3xl xs:text-4xl sm:text-5xl font-black tracking-tighter mb-3 xs:mb-4">
            Admissions{" "}
            <span className="bg-gradient-to-r from-purple-600 to-amber-600 bg-clip-text text-transparent italic">
              FAQ
            </span>
          </h2>
          <p className="text-muted-foreground text-sm xs:text-base">
            Frequently asked questions about the Al-Maysaroh admission process.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4 xs:gap-5 sm:gap-6 max-w-5xl mx-auto mb-10 xs:mb-12 sm:mb-16">
          {FAQS.map((faq, idx) => (
            <div
              key={idx}
              className="p-4 xs:p-5 sm:p-6 rounded-xl xs:rounded-2xl bg-card border border-purple-200 dark:border-purple-800 hover:border-purple-300 transition-all group"
            >
              <div className="flex gap-3 xs:gap-4">
                <HelpCircle className="w-4 h-4 xs:w-5 xs:h-5 text-purple-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-black text-xs xs:text-sm uppercase tracking-tight mb-1">
                    {faq.q}
                  </p>
                  <p className="text-[10px] xs:text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 xs:gap-4 pt-6 xs:pt-8 pb-3 xs:pb-4">
          <Link href="/contact">
            <Button
              variant="outline"
              className="rounded-full px-5 xs:px-6 py-2.5 xs:py-3 font-black text-xs sm:text-sm gap-1.5 xs:gap-2 border-purple-300 text-purple-600 hover:bg-purple-50 group"
            >
              <Mail className="w-3.5 h-3.5" />
              CONTACT ADMISSIONS
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>

          <div className="flex flex-wrap items-center justify-center gap-3 xs:gap-4 sm:gap-6">
            <div className="flex items-center gap-1.5 xs:gap-2 text-[10px] xs:text-xs sm:text-sm text-muted-foreground">
              <Phone className="w-3.5 h-3.5 text-purple-600" />
              <span>(+234) 911-016-3930</span>
            </div>
            <div className="hidden xs:block w-px h-3 bg-border" />
            <div className="flex items-center gap-1.5 xs:gap-2 text-[10px] xs:text-xs sm:text-sm text-muted-foreground">
              <Mail className="w-3.5 h-3.5 text-amber-500" />
              <span>info.almaysaroh@gmail.com</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}