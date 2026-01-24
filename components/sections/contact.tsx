"use client";

import { Reveal } from "@/components/shared/section-animation";
import {
  Mail,
  MessageCircle,
  Globe,
  Send,
  Landmark,
  ShieldCheck,
  ArrowUpRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Contact() {
  return (
    <section className="py-32 bg-background relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-12">
            <Reveal>
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 text-primary-700 text-[10px] font-black uppercase tracking-[0.2em] border border-primary-200/50">
                  <Globe className="w-4 h-4" /> Global Admissions Office
                </div>
                <h2 className="text-6xl lg:text-8xl font-black tracking-tighter font-heading leading-tight">
                  Begin Your <br />
                  <span className="text-primary-700 italic">Sanad.</span>
                </h2>
                <p className="text-xl text-muted-foreground font-medium leading-relaxed max-w-md">
                  Inquire about scholarly assignments, academic grants, or
                  international bank transfer activations.
                </p>
              </div>
            </Reveal>

            <div className="grid sm:grid-cols-2 gap-6">
              <Reveal delay={0.2}>
                <div className="p-8 rounded-[2rem] border-2 border-primary-100 hover:border-primary-700 transition-all group">
                  <Landmark className="w-8 h-8 text-primary-700 mb-4" />
                  <h4 className="font-black uppercase text-xs tracking-widest mb-2">
                    Admissions Council
                  </h4>
                  <p className="text-xs text-muted-foreground font-bold">
                    admissions@almaysaroh.com
                  </p>
                </div>
              </Reveal>
              <Reveal delay={0.3}>
                <div className="p-8 rounded-[2rem] border-2 border-accent/10 hover:border-accent transition-all group">
                  <ShieldCheck className="w-8 h-8 text-accent mb-4" />
                  <h4 className="font-black uppercase text-xs tracking-widest mb-2">
                    Technical Registrar
                  </h4>
                  <p className="text-xs text-muted-foreground font-bold">
                    systems@almaysaroh.com
                  </p>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.4}>
              <div className="flex items-center gap-6 pt-6 border-t">
                <div className="flex -space-x-3">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="w-12 h-12 rounded-full border-4 border-background bg-muted"
                    />
                  ))}
                </div>
                <p className="text-sm font-bold text-muted-foreground">
                  Our council currently serves{" "}
                  <span className="text-foreground">50+ Nations</span> across
                  all major timezones.
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.5}>
            <div className="glass-surface p-10 lg:p-16 rounded-[4rem] border shadow-3xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary-700/5 blur-[80px] -z-10" />

              <h3 className="text-2xl font-black uppercase tracking-tighter mb-8">
                Official Inquiry
              </h3>

              <form className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest ml-1 opacity-60">
                    Full Legal Name
                  </label>
                  <input className="w-full h-14 px-6 rounded-2xl bg-background border-2 border-transparent focus:border-primary-700/30 outline-none font-bold text-sm transition-all shadow-inner" />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest ml-1 opacity-60">
                    Academic Interest
                  </label>
                  <select className="w-full h-14 px-6 rounded-2xl bg-background border-2 border-transparent focus:border-primary-700/30 outline-none font-bold text-sm appearance-none cursor-pointer shadow-inner">
                    <option>Hifz Mastery Track</option>
                    <option>Tajweed Phonetics</option>
                    <option>Classical Arabic</option>
                    <option>Other Inquiry</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest ml-1 opacity-60">
                    Message to the Council
                  </label>
                  <textarea
                    rows={4}
                    className="w-full p-6 rounded-2xl bg-background border-2 border-transparent focus:border-primary-700/30 outline-none font-medium text-sm transition-all shadow-inner"
                  />
                </div>

                <Button className="w-full h-20 rounded-[2rem] bg-primary-700 text-white font-black text-[11px] tracking-[0.3em] uppercase shadow-2xl relative overflow-hidden group">
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    TRANSMIT INQUIRY <Send className="w-4 h-4" />
                  </span>
                  <div className="absolute inset-0 bg-white/10 -translate-x-full group-hover:animate-shimmer" />
                </Button>
              </form>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
