import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-slate-50 dark:bg-slate-900">
      <div className="container px-4 mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-slate-900 dark:text-white mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Start for free, upgrade as you grow. No hidden fees.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Starter */}
          <div className="p-8 rounded-3xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col">
             <h3 className="text-lg font-bold text-slate-900 dark:text-white">Starter</h3>
             <div className="mt-4 flex items-baseline text-slate-900 dark:text-white">
                <span className="text-4xl font-extrabold tracking-tight">$0</span>
                <span className="ml-1 text-xl font-semibold text-slate-500">/mo</span>
             </div>
             <p className="mt-2 text-sm text-slate-500">Up to 50 students</p>
             <ul className="mt-6 space-y-4 flex-1">
                {["Core LMS Features", "Attendance Tracking", "Basic Reports", "Email Support"].map(f => (
                   <li key={f} className="flex items-center text-sm text-slate-600 dark:text-slate-300"><Check className="h-4 w-4 text-emerald-500 mr-2"/> {f}</li>
                ))}
             </ul>
             <Button variant="outline" className="w-full mt-8 rounded-xl">Get Started</Button>
          </div>

          {/* Pro */}
          <div className="p-8 rounded-3xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-xl flex flex-col relative ring-4 ring-emerald-500/20">
             <div className="absolute top-0 right-0 bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-bl-xl">POPULAR</div>
             <h3 className="text-lg font-bold">Pro</h3>
             <div className="mt-4 flex items-baseline">
                <span className="text-4xl font-extrabold tracking-tight">$49</span>
                <span className="ml-1 text-xl font-semibold opacity-80">/mo</span>
             </div>
             <p className="mt-2 text-sm opacity-80">Up to 500 students</p>
             <ul className="mt-6 space-y-4 flex-1">
                {["Everything in Starter", "Hifz Tracking", "Parent Portal", "Financial Management", "Priority Support"].map(f => (
                   <li key={f} className="flex items-center text-sm opacity-90"><Check className="h-4 w-4 text-emerald-400 mr-2"/> {f}</li>
                ))}
             </ul>
             <Button className="w-full mt-8 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white border-0">Start Free Trial</Button>
          </div>

          {/* Enterprise */}
          <div className="p-8 rounded-3xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col">
             <h3 className="text-lg font-bold text-slate-900 dark:text-white">Institution</h3>
             <div className="mt-4 flex items-baseline text-slate-900 dark:text-white">
                <span className="text-4xl font-extrabold tracking-tight">$199</span>
                <span className="ml-1 text-xl font-semibold text-slate-500">/mo</span>
             </div>
             <p className="mt-2 text-sm text-slate-500">Unlimited students</p>
             <ul className="mt-6 space-y-4 flex-1">
                {["Everything in Pro", "Multiple Branches", "Custom Domain", "White Labeling", "Dedicated Account Manager"].map(f => (
                   <li key={f} className="flex items-center text-sm text-slate-600 dark:text-slate-300"><Check className="h-4 w-4 text-emerald-500 mr-2"/> {f}</li>
                ))}
             </ul>
             <Button variant="outline" className="w-full mt-8 rounded-xl">Contact Sales</Button>
          </div>
        </div>
      </div>
    </section>
  );
}