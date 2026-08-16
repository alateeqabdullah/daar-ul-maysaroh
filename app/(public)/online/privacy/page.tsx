import { Reveal } from "@/components/shared/section-animation";
import { Lock, EyeOff, Database, Fingerprint } from "lucide-react";

export default function PrivacyPage() {
  return (
    <main className="pt-40 pb-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto space-y-12">
          <Reveal>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted text-muted-foreground text-[10px] font-black uppercase tracking-widest border">
              <Lock className="w-4 h-4" /> Data Sanctuary
            </div>
            <h1 className="text-6xl lg:text-8xl font-black tracking-tighter font-heading mt-6">
              Privacy <br />
              <span className="text-primary-700 italic">Protection.</span>
            </h1>
          </Reveal>

          <div className="space-y-16">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="institutional-card p-8 space-y-4">
                <Database className="w-8 h-8 text-primary-700" />
                <h3 className="text-lg font-black uppercase tracking-tight">
                  Audio Recordings
                </h3>
                <p className="text-sm text-muted-foreground font-medium">
                  Recitation recordings are stored exclusively for scholarly
                  review and student progress tracking. They are never shared
                  with third parties.
                </p>
              </div>
              <div className="institutional-card p-8 space-y-4">
                <Fingerprint className="w-8 h-8 text-primary-700" />
                <h3 className="text-lg font-black uppercase tracking-tight">
                  Personal Identity
                </h3>
                <p className="text-sm text-muted-foreground font-medium">
                  Your legal name and contact details are encrypted and used
                  only for institutional communications and billing.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
