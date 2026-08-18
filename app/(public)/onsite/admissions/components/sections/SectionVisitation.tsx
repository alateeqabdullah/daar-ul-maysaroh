// app/(marketing)/onsite/admissions/components/sections/SectionVisitation.tsx
"use client";

import { cn } from "@/lib/utils";
import { SectionProps } from "../../types";

export function SectionVisitation({ formData, handleChange }: SectionProps) {
  return (
    <div className="space-y-5">
      <div className="space-y-1.5">
        <label className="text-xs font-black uppercase tracking-wider text-slate-400">
          79. Who is authorised to visit the student?
        </label>
        <div className="grid grid-cols-3 gap-2">
          <input
            name="authorisedVisitors"
            value={formData.authorisedVisitors}
            onChange={handleChange}
            className="col-span-2 w-full h-12 px-4 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all"
            placeholder="Full Name"
          />
          <input
            name="authorisedVisitors"
            value={formData.authorisedVisitors}
            onChange={handleChange}
            className="w-full h-12 px-4 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all"
            placeholder="Phone"
          />
        </div>
        <p className="text-[10px] text-slate-500 italic">
          Add multiple visitors separated by commas
        </p>
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-black uppercase tracking-wider text-slate-400">
          80. Who is authorised to collect the student from the Madrasah?
        </label>
        <div className="grid grid-cols-3 gap-2">
          <input
            name="authorisedCollectors"
            value={formData.authorisedCollectors}
            onChange={handleChange}
            className="col-span-2 w-full h-12 px-4 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all"
            placeholder="Full Name"
          />
          <input
            name="authorisedCollectors"
            value={formData.authorisedCollectors}
            onChange={handleChange}
            className="w-full h-12 px-4 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all"
            placeholder="Phone"
          />
        </div>
        <p className="text-[10px] text-slate-500 italic">
          Add multiple collectors separated by commas
        </p>
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-black uppercase tracking-wider text-slate-400">
          81. Is there anyone who should NOT be permitted to collect or visit
          the student?
        </label>
        <div className="flex gap-4">
          {["Yes", "No"].map((option) => (
            <button
              key={option}
              type="button"
              onClick={() =>
                handleChange({
                  target: { name: "restrictedPersons", value: option },
                } as any)
              }
              className={cn(
                "px-6 py-2 rounded-full text-xs font-black transition-all min-h-[40px]",
                formData.restrictedPersons === option
                  ? "bg-red-600/40 text-red-300 border border-red-500"
                  : "bg-slate-800/50 text-slate-400 border border-slate-800 hover:border-slate-700",
              )}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
      {formData.restrictedPersons === "Yes" && (
        <div className="space-y-1.5 pl-4 border-l-2 border-red-500/30">
          <label className="text-xs font-black uppercase tracking-wider text-slate-400">
            Please provide details:
          </label>
          <input
            name="restrictedPersonsDetails"
            value={formData.restrictedPersonsDetails}
            onChange={handleChange}
            className="w-full h-12 px-4 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all"
            placeholder="Details of restricted persons..."
          />
        </div>
      )}
    </div>
  );
}
