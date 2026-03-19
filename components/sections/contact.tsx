// "use client";

// import { Reveal } from "@/components/shared/section-animation";
// import {

//   Globe,
//   Send,
//   Landmark,
//   ShieldCheck,
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import Link from "next/link";

// export function Contact() {
//   return (
//     <section className="py-32 bg-background relative overflow-hidden">
//       <div className="container mx-auto px-6">
//         <div className="grid lg:grid-cols-2 gap-20 items-center">
//           <div className="space-y-12">
//             <Reveal>
//               <div className="space-y-6">
//                 <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 text-primary-700 text-[10px] font-black uppercase tracking-[0.2em] border border-primary-200/50">
//                   <Globe className="w-4 h-4" /> Global Admissions Office
//                 </div>
//                 <h2 className="text-6xl lg:text-8xl font-black tracking-tighter font-heading leading-tight">
//                   Begin Your <br />
//                   <span className="text-primary-700 italic">Sanad.</span>
//                 </h2>
//                 <p className="text-xl text-muted-foreground font-medium leading-relaxed max-w-md">
//                   Inquire about scholarly assignments, academic grants, or
//                   international bank transfer activations.
//                 </p>
//               </div>
//             </Reveal>

//             <div className="grid sm:grid-cols-2 gap-6">
//               <Reveal delay={0.2}>
//                 <div className="p-8 rounded-[2rem] border-2 border-primary-100 hover:border-primary-700 transition-all group">
//                   <Landmark className="w-8 h-8 text-primary-700 mb-4" />
//                   <h4 className="font-black uppercase text-xs tracking-widest mb-2">
//                     Admissions Council
//                   </h4>
//                   <p className="text-xs text-muted-foreground font-bold">
//                     info.almaysaroh@gmail.com
//                   </p>
//                 </div>
//               </Reveal>
//               <Reveal delay={0.3}>
//                 <div className="p-8 rounded-[2rem] border-2 border-accent/10 hover:border-accent transition-all group">
//                   <ShieldCheck className="w-8 h-8 text-accent mb-4" />
//                   <h4 className="font-black uppercase text-xs tracking-widest mb-2">
//                     Technical Registrar
//                   </h4>
//                   <p className="text-xs text-muted-foreground font-bold">
//                    info.ysaroh.com
//                   </p>
//                 </div>
//               </Reveal>
//             </div>

//             <Reveal delay={0.4}>
//               <div className="flex items-center gap-6 pt-6 border-t">
//                 <div className="flex -space-x-3">
//                   {[1, 2, 3].map((i) => (
//                     <div
//                       key={i}
//                       className="w-12 h-12 rounded-full border-4 border-background bg-muted"
//                     />
//                   ))}
//                 </div>
//                 <p className="text-sm font-bold text-muted-foreground">
//                   Our council currently serves{" "}
//                   <span className="text-foreground">5+ Nations</span> across
//                   all major timezones.
//                 </p>
//               </div>
//             </Reveal>
//           </div>

//           <Reveal delay={0.5}>
//             <div className="glass-surface p-10 lg:p-16 rounded-[4rem] border shadow-3xl relative overflow-hidden">
//               <div className="absolute top-0 right-0 w-64 h-64 bg-primary-700/5 blur-[80px] -z-10" />

//               <h3 className="text-2xl font-black uppercase tracking-tighter mb-8">
//                 Official Inquiry
//               </h3>

//               <form className="space-y-6">
//                 <div className="space-y-2">
//                   <label className="text-[10px] font-black uppercase tracking-widest ml-1 opacity-60">
//                     Full Legal Name
//                   </label>
//                   <input className="w-full h-14 px-6 rounded-2xl bg-background border-2 border-transparent focus:border-primary-700/30 outline-none font-bold text-sm transition-all shadow-inner" />
//                 </div>

//                 <div className="space-y-2">
//                   <label className="text-[10px] font-black uppercase tracking-widest ml-1 opacity-60">
//                     Academic Interest
//                   </label>
//                   <select className="w-full h-14 px-6 rounded-2xl bg-background border-2 border-transparent focus:border-primary-700/30 outline-none font-bold text-sm appearance-none cursor-pointer shadow-inner">
//                     <option>Hifz Mastery Track</option>
//                     <option>Tajweed Phonetics</option>
//                     <option>Classical Arabic</option>
//                     <option>Other Inquiry</option>
//                   </select>
//                 </div>

//                 <div className="space-y-2">
//                   <label className="text-[10px] font-black uppercase tracking-widest ml-1 opacity-60">
//                     Message to the Council
//                   </label>
//                   <textarea
//                     rows={4}
//                     className="w-full p-6 rounded-2xl bg-background border-2 border-transparent focus:border-primary-700/30 outline-none font-medium text-sm transition-all shadow-inner"
//                   />
//                 </div>

//                 <Button className="w-full h-20 rounded-[2rem] bg-primary-700 text-white font-black text-[11px] tracking-[0.3em] uppercase shadow-2xl relative overflow-hidden group">
//                   <span className="relative z-10 flex items-center justify-center gap-2">
//                     TRANSMIT INQUIRY <Send className="w-4 h-4" />
//                   </span>
//                   <div className="absolute inset-0 bg-white/10 -translate-x-full group-hover:animate-shimmer" />
//                 </Button>
//               </form>
//             </div>
//           </Reveal>
//         </div>
//       </div>
//     </section>
//   );
// }




"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Reveal } from "@/components/shared/section-animation";
import {
  Globe,
  Send,
  Landmark,
  ShieldCheck,
  Loader2,
  Mail,
  Phone,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

// Form validation schema
const contactSchema = z.object({
  fullName: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().optional(),
  academicInterest: z.string().min(1, "Please select an option"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactForm = z.infer<typeof contactSchema>;

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      academicInterest: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactForm) => {
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to send");
      }

      setIsSuccess(true);
      toast.success("Inquiry sent!", {
        description: "Our admissions council will respond within 24 hours.",
      });

      reset();

      // Reset success state after 5 seconds
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (error) {
      toast.error("Something went wrong", {
        description: "Please try again or email us directly.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 sm:py-24 lg:py-32 bg-background relative overflow-hidden">
      {/* Background decorative elements */}
      <div
        className="absolute inset-0 opacity-[0.02] bg-[url('/islamic-pattern.svg')] bg-center bg-repeat"
        style={{ backgroundSize: "300px" }}
      />
      <div className="absolute top-40 right-0 w-96 h-96 bg-primary-700/5 rounded-full blur-3xl" />
      <div className="absolute bottom-40 left-0 w-96 h-96 bg-primary-700/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* LEFT COLUMN - Information */}
          <div className="space-y-8 sm:space-y-12">
            <Reveal>
              <div className="space-y-4 sm:space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 dark:bg-primary-950/40 text-primary-700 text-[10px] font-black uppercase tracking-[0.2em] border border-primary-200/50 dark:border-primary-800/50">
                  <Globe className="w-4 h-4" /> Global Admissions Office
                </div>
                <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tighter font-heading leading-tight">
                  Begin Your <br />
                  <span className="text-primary-700 italic">Sanad.</span>
                </h2>
                <p className="text-lg sm:text-xl text-muted-foreground font-light leading-relaxed max-w-md">
                  Inquire about scholarly assignments, academic grants, or
                  international bank transfer activations. Our council is ready
                  to guide you.
                </p>
              </div>
            </Reveal>

            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
              <Reveal delay={0.2}>
                <div className="p-6 sm:p-8 rounded-2xl sm:rounded-[2rem] border-2 border-primary-100 dark:border-primary-900/30 hover:border-primary-700 dark:hover:border-primary-700 transition-all group bg-gradient-to-br from-background to-primary-50/20">
                  <Landmark className="w-6 h-6 sm:w-8 sm:h-8 text-primary-700 mb-3 sm:mb-4 group-hover:scale-110 transition-transform" />
                  <h4 className="font-black uppercase text-xs tracking-widest mb-2">
                    Admissions Council
                  </h4>
                  <a
                    href="mailto:admissions@almaysaroh.org"
                    className="text-xs text-muted-foreground font-bold hover:text-primary-700 transition-colors break-all"
                  >
                    admissions@almaysaroh.org
                  </a>
                </div>
              </Reveal>

              <Reveal delay={0.3}>
                <div className="p-6 sm:p-8 rounded-2xl sm:rounded-[2rem] border-2 border-accent/10 hover:border-accent transition-all group bg-gradient-to-br from-background to-accent/5">
                  <ShieldCheck className="w-6 h-6 sm:w-8 sm:h-8 text-accent mb-3 sm:mb-4 group-hover:scale-110 transition-transform" />
                  <h4 className="font-black uppercase text-xs tracking-widest mb-2">
                    Technical Registrar
                  </h4>
                  <a
                    href="mailto:registrar@almaysaroh.org"
                    className="text-xs text-muted-foreground font-bold hover:text-accent transition-colors break-all"
                  >
                    registrar@almaysaroh.org
                  </a>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.4}>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 pt-6 border-t border-border/50">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-4 border-background bg-gradient-to-br from-primary-600 to-primary-800 shadow-xl"
                    />
                  ))}
                </div>
                <div>
                  <p className="text-sm font-bold text-muted-foreground">
                    Our council serves{" "}
                    <span className="text-foreground">15+ countries</span>{" "}
                    across all major timezones.
                  </p>
                  <p className="text-xs text-primary-700 mt-1">
                    ⚡ Average response: 4 hours
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          {/* RIGHT COLUMN - Form */}
          <Reveal delay={0.5}>
            <div className="glass-surface p-6 sm:p-8 lg:p-12 xl:p-16 rounded-3xl sm:rounded-[3rem] lg:rounded-[4rem] border border-primary-700/20 shadow-xl lg:shadow-3xl relative overflow-hidden">
              {/* Background glow */}
              <div className="absolute top-0 right-0 w-32 sm:w-48 lg:w-64 h-32 sm:h-48 lg:h-64 bg-primary-700/5 blur-[60px] lg:blur-[80px] -z-10 rounded-full" />

              {/* Success overlay */}
              {isSuccess && (
                <div className="absolute inset-0 bg-primary-700/5 backdrop-blur-sm z-20 flex items-center justify-center">
                  <div className="bg-background/90 p-8 rounded-3xl text-center max-w-sm mx-4">
                    <CheckCircle2 className="w-16 h-16 text-primary-700 mx-auto mb-4" />
                    <h3 className="font-black text-xl mb-2">Inquiry Sent!</h3>
                    <p className="text-sm text-muted-foreground">
                      Our admissions council will respond within 24 hours.
                    </p>
                  </div>
                </div>
              )}

              <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tighter mb-6 sm:mb-8">
                Official Inquiry
              </h3>

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-4 sm:space-y-6"
              >
                {/* Full Name */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest ml-1 opacity-60 flex justify-between">
                    <span>Full Legal Name</span>
                    {errors.fullName && (
                      <span className="text-red-500 dark:text-red-400 opacity-100 text-[9px]">
                        {errors.fullName.message}
                      </span>
                    )}
                  </label>
                  <input
                    {...register("fullName")}
                    className={cn(
                      "w-full h-12 sm:h-14 px-4 sm:px-6 rounded-xl sm:rounded-2xl bg-background border-2 outline-none font-bold text-sm transition-all shadow-inner",
                      errors.fullName
                        ? "border-red-500/50 focus:border-red-500"
                        : "border-transparent focus:border-primary-700/30",
                    )}
                    placeholder="Enter your full name"
                    disabled={isSubmitting}
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest ml-1 opacity-60 flex justify-between">
                    <span>Email Address</span>
                    {errors.email && (
                      <span className="text-red-500 dark:text-red-400 opacity-100 text-[9px]">
                        {errors.email.message}
                      </span>
                    )}
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 sm:left-4 top-3.5 sm:top-4 w-4 h-4 text-muted-foreground" />
                    <input
                      {...register("email")}
                      type="email"
                      className={cn(
                        "w-full h-12 sm:h-14 pl-9 sm:pl-11 pr-4 sm:pr-6 rounded-xl sm:rounded-2xl bg-background border-2 outline-none font-bold text-sm transition-all shadow-inner",
                        errors.email
                          ? "border-red-500/50 focus:border-red-500"
                          : "border-transparent focus:border-primary-700/30",
                      )}
                      placeholder="your@email.com"
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                {/* Phone (Optional) */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest ml-1 opacity-60 flex justify-between">
                    <span>Phone (Optional)</span>
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 sm:left-4 top-3.5 sm:top-4 w-4 h-4 text-muted-foreground" />
                    <input
                      {...register("phone")}
                      type="tel"
                      className="w-full h-12 sm:h-14 pl-9 sm:pl-11 pr-4 sm:pr-6 rounded-xl sm:rounded-2xl bg-background border-2 border-transparent focus:border-primary-700/30 outline-none font-bold text-sm transition-all shadow-inner"
                      placeholder="+1 (555) 000-0000"
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                {/* Academic Interest */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest ml-1 opacity-60 flex justify-between">
                    <span>Academic Interest</span>
                    {errors.academicInterest && (
                      <span className="text-red-500 dark:text-red-400 opacity-100 text-[9px]">
                        {errors.academicInterest.message}
                      </span>
                    )}
                  </label>
                  <select
                    {...register("academicInterest")}
                    className={cn(
                      "w-full h-12 sm:h-14 px-4 sm:px-6 rounded-xl sm:rounded-2xl bg-background border-2 outline-none font-bold text-sm appearance-none cursor-pointer shadow-inner",
                      errors.academicInterest
                        ? "border-red-500/50 focus:border-red-500"
                        : "border-transparent focus:border-primary-700/30",
                    )}
                    disabled={isSubmitting}
                  >
                    <option value="">Select a program</option>
                    <option value="hifz">Hifz Mastery Track</option>
                    <option value="tajweed">Tajweed Phonetics</option>
                    <option value="arabic">Classical Arabic</option>
                    <option value="ijazah">Ijazah Certification</option>
                    <option value="qiroah">Group Qiro'ah (Children)</option>
                    <option value="juz-amma">Juz Amma (Children)</option>
                    <option value="other">Other Inquiry</option>
                  </select>
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest ml-1 opacity-60 flex justify-between">
                    <span>Message to the Council</span>
                    {errors.message && (
                      <span className="text-red-500 dark:text-red-400 opacity-100 text-[9px]">
                        {errors.message.message}
                      </span>
                    )}
                  </label>
                  <textarea
                    {...register("message")}
                    rows={4}
                    className={cn(
                      "w-full p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-background border-2 outline-none font-medium text-sm transition-all shadow-inner resize-none",
                      errors.message
                        ? "border-red-500/50 focus:border-red-500"
                        : "border-transparent focus:border-primary-700/30",
                    )}
                    placeholder="I'm interested in learning more about..."
                    disabled={isSubmitting}
                  />
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-14 sm:h-16 lg:h-20 rounded-2xl sm:rounded-[2rem] bg-primary-700 hover:bg-primary-800 text-white font-black text-[10px] sm:text-[11px] tracking-[0.2em] sm:tracking-[0.3em] uppercase shadow-xl relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        SENDING...
                      </>
                    ) : (
                      <>
                        TRANSMIT INQUIRY{" "}
                        <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </span>

                  {/* Shimmer effect */}
                  {!isSubmitting && (
                    <div className="absolute inset-0 -z-10 overflow-hidden rounded-2xl sm:rounded-[2rem]">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 animate-shimmer" />
                    </div>
                  )}
                </Button>
              </form>

              {/* Privacy Note */}
              <p className="text-[10px] text-center text-muted-foreground/50 mt-4">
                🔒 We'll respond within 24 hours. Your information is protected.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}