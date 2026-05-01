import { Reveal } from "@/components/shared/section-animation";
import { Scale, ShieldCheck, Clock, Ban } from "lucide-react";

export default function TermsPage() {
  return (
    <main className="pt-40 pb-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto space-y-12">
          <Reveal>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted text-muted-foreground text-[10px] font-black uppercase tracking-widest border">
              <Scale className="w-4 h-4" /> Academic Governance
            </div>
            <h1 className="text-6xl lg:text-8xl font-black tracking-tighter font-heading mt-6">
              Institutional <br />
              <span className="text-primary-700 italic">Terms.</span>
            </h1>
          </Reveal>

          <div className="prose prose-slate dark:prose-invert max-w-none space-y-12">
            <section className="space-y-4">
              <h2 className="text-2xl font-black uppercase tracking-tight flex items-center gap-3">
                <ShieldCheck className="text-primary-700" /> 1. Enrollment &
                Sanad
              </h2>
              <p className="text-muted-foreground font-medium leading-relaxed">
                By enrolling in Al-Maysaroh Institute, students commit to a
                scholarly path. The issuance of an Ijazah (Sanad) is at the sole
                discretion of the assigned scholar based on the student's
                mastery and character (Adab).
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-black uppercase tracking-tight flex items-center gap-3">
                <Clock className="text-primary-700" /> 2. Attendance & Makeup
                Policy
              </h2>
              <p className="text-muted-foreground font-medium leading-relaxed">
                Students must provide at least 24 hours' notice for
                cancellations. Sessions missed without notice are
                non-refundable. Makeup sessions are granted based on scholar
                availability.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-black uppercase tracking-tight flex items-center gap-3">
                <Ban className="text-primary-700" /> 3. Tuition & Refunds
              </h2>
              <p className="text-muted-foreground font-medium leading-relaxed">
                Tuition is settled monthly. We offer a 14-day satisfaction
                guarantee for new students. Manual bank transfers must be
                verified by the Bursar before portal activation.
              </p>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
