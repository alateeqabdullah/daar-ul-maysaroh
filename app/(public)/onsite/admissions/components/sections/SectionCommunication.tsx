// app/(marketing)/onsite/admissions/components/sections/SectionCommunication.tsx
"use client";

import { cn } from "@/lib/utils";
import { SectionProps } from "../../types";

export function SectionCommunication({ formData, handleChange }: SectionProps) {
  return (
    <div className="space-y-5">
      <div className="space-y-1.5">
        <label className="text-xs font-black uppercase tracking-wider text-slate-400">
          75. How would you prefer to receive updates about your ward?
        </label>
        <div className="flex flex-wrap gap-2">
          {["WhatsApp", "Phone call", "Email"].map((option) => (
            <button
              key={option}
              type="button"
              onClick={() =>
                handleChange({
                  target: { name: "updatePreference", value: option },
                } as any)
              }
              className={cn(
                "px-6 py-2 rounded-full text-xs font-black transition-all min-h-[40px]",
                formData.updatePreference === option
                  ? "bg-amber-600/40 text-amber-300 border border-amber-500"
                  : "bg-slate-800/50 text-slate-400 border border-slate-800 hover:border-slate-700",
              )}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-black uppercase tracking-wider text-slate-400">
          76. How frequently would you like general progress updates?
        </label>
        <div className="flex flex-wrap gap-2">
          {["Weekly", "Bi-weekly", "Monthly", "As necessary"].map((option) => (
            <button
              key={option}
              type="button"
              onClick={() =>
                handleChange({
                  target: { name: "updateFrequency", value: option },
                } as any)
              }
              className={cn(
                "px-6 py-2 rounded-full text-xs font-black transition-all min-h-[40px]",
                formData.updateFrequency === option
                  ? "bg-purple-600/40 text-purple-300 border border-purple-500"
                  : "bg-slate-800/50 text-slate-400 border border-slate-800 hover:border-slate-700",
              )}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-black uppercase tracking-wider text-slate-400">
          77. Are you comfortable with the Madrasah contacting you whenever
          there is an important concern regarding your ward?
        </label>
        <div className="flex gap-4">
          {["Yes", "No"].map((option) => (
            <button
              key={option}
              type="button"
              onClick={() =>
                handleChange({
                  target: { name: "comfortableContact", value: option },
                } as any)
              }
              className={cn(
                "px-6 py-2 rounded-full text-xs font-black transition-all min-h-[40px]",
                formData.comfortableContact === option
                  ? "bg-purple-600/40 text-purple-300 border border-purple-500"
                  : "bg-slate-800/50 text-slate-400 border border-slate-800 hover:border-slate-700",
              )}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-black uppercase tracking-wider text-slate-400">
          78. Are there any specific communication arrangements you would like
          us to observe?
        </label>
        <textarea
          name="communicationNotes"
          value={formData.communicationNotes}
          onChange={handleChange}
          rows={2}
          className="w-full p-3 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all resize-none"
          placeholder="Any communication preferences..."
        />
      </div>
    </div>
  );
}
