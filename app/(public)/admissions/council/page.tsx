"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  UserCheck,
  Globe,
  Send,
  ShieldCheck,
  BookOpen,
  Sparkles,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/shared/section-animation";
import {
  CouncilInquirySchema,
  type CouncilInquiryValues,
} from "@/lib/validations/council";

export default function CouncilInquiryPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CouncilInquiryValues>({
    resolver: zodResolver(CouncilInquirySchema),
  });

  const onSubmit = async (data: CouncilInquiryValues) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/admissions/council", {
        method: "POST",
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (!result.success) throw new Error(result.message);

      toast.success("Inquiry Received", {
        description:
          "The Scholarly Council will review your request and contact you via email.",
      });
      reset();
    } catch (error: any) {
      toast.error("Submission Failed", { description: error.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="pt-40 pb-20 bg-background relative overflow-hidden">
      {/* Background Polish */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-700/5 blur-[120px] -z-10" />

      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center mb-20 space-y-8">
          <Reveal>
            <div className="w-20 h-20 bg-primary-700 rounded-3xl flex items-center justify-center mx-auto shadow-2xl mb-8">
              <UserCheck className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl lg:text-7xl font-black tracking-tighter font-heading">
              Admissions{" "}
              <span className="text-primary-700 italic">Inquiry.</span>
            </h1>
            <p className="text-xl text-muted-foreground font-medium max-w-2xl mx-auto leading-relaxed">
              Request a formal scholarly assessment or inquire about specific
              faculty assignments for your path to Ijazah.
            </p>
          </Reveal>
        </div>

        <div className="max-w-3xl mx-auto glass-surface p-10 lg:p-16 rounded-[4rem] border shadow-3xl relative">
          <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none">
            <Sparkles className="w-32 h-32" />
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Personal Identity */}
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest ml-1 opacity-60">
                  Legal Full Name
                </label>
                <input
                  {...register("fullName")}
                  placeholder="Enter your name"
                  className="w-full h-14 px-6 rounded-2xl bg-background border-2 border-transparent focus:border-primary-700/30 outline-none font-bold text-sm transition-all shadow-sm"
                />
                {errors.fullName && (
                  <p className="text-[10px] text-red-500 font-bold ml-1 uppercase">
                    {errors.fullName.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest ml-1 opacity-60">
                  Scholarly Email
                </label>
                <input
                  {...register("email")}
                  type="email"
                  placeholder="student@example.com"
                  className="w-full h-14 px-6 rounded-2xl bg-background border-2 border-transparent focus:border-primary-700/30 outline-none font-bold text-sm transition-all shadow-sm"
                />
                {errors.email && (
                  <p className="text-[10px] text-red-500 font-bold ml-1 uppercase">
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>

            {/* Academic Context */}
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest ml-1 opacity-60">
                  Current Quranic Level
                </label>
                <select
                  {...register("currentLevel")}
                  className="w-full h-14 px-6 rounded-2xl bg-background border-2 border-transparent focus:border-primary-700/30 outline-none font-bold text-sm appearance-none shadow-sm cursor-pointer"
                >
                  <option value="BEGINNER">Beginner (Qaida)</option>
                  <option value="INTERMEDIATE">Intermediate (Juz Amma)</option>
                  <option value="ADVANCED">Advanced (Multi-Juz)</option>
                  <option value="HAFIDH">Hafidh (Seeking Ijazah)</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest ml-1 opacity-60">
                  Preferred Timezone
                </label>
                <div className="relative">
                  <Globe className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    {...register("timezone")}
                    placeholder="e.g. GMT+3 / Qatar"
                    className="w-full h-14 pl-12 pr-6 rounded-2xl bg-background border-2 border-transparent focus:border-primary-700/30 outline-none font-bold text-sm shadow-sm"
                  />
                </div>
                {errors.timezone && (
                  <p className="text-[10px] text-red-500 font-bold ml-1 uppercase">
                    {errors.timezone.message}
                  </p>
                )}
              </div>
            </div>

            {/* Scholar Assignment */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest ml-1 opacity-60">
                Scholar Preference (Optional)
              </label>
              <div className="relative">
                <BookOpen className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  {...register("scholarPreference")}
                  placeholder="Requested Scholar Name"
                  className="w-full h-14 pl-12 pr-6 rounded-2xl bg-background border-2 border-transparent focus:border-primary-700/30 outline-none font-bold text-sm shadow-sm"
                />
              </div>
            </div>

            {/* Inquiry Details */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest ml-1 opacity-60">
                Inquiry & Objectives
              </label>
              <textarea
                {...register("message")}
                rows={5}
                placeholder="How can our Scholarly Council assist in your path to Hifz?"
                className="w-full p-6 rounded-2xl bg-background border-2 border-transparent focus:border-primary-700/30 outline-none font-medium text-sm transition-all shadow-sm"
              />
              {errors.message && (
                <p className="text-[10px] text-red-500 font-bold ml-1 uppercase">
                  {errors.message.message}
                </p>
              )}
            </div>

            {/* Submission Command */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-16 rounded-2xl bg-primary-700 text-white font-black text-[11px] tracking-[0.2em] uppercase shadow-2xl relative overflow-hidden group active:scale-[0.98] transition-all"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {isSubmitting ? (
                  <>
                    Processing Request{" "}
                    <Loader2 className="w-4 h-4 animate-spin" />
                  </>
                ) : (
                  <>
                    Submit to Admissions Council <Send className="w-4 h-4" />
                  </>
                )}
              </span>
              <div className="absolute inset-0 bg-white/10 -translate-x-full group-hover:animate-shimmer" />
            </Button>

            <div className="flex items-center justify-center gap-6 pt-4 grayscale opacity-40">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" />
                <span className="text-[8px] font-black tracking-widest uppercase">
                  Traditional Sanad Verified
                </span>
              </div>
              <div className="flex items-center gap-2">
                <UserCheck className="w-4 h-4" />
                <span className="text-[8px] font-black tracking-widest uppercase">
                  Academic Privacy Guaranteed
                </span>
              </div>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
