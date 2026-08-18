// app/(marketing)/onsite/admissions/components/sections/SectionHealth.tsx
"use client";

import { cn } from "@/lib/utils";
import { SectionProps } from "../../types";

export function SectionHealth({ formData, handleChange }: SectionProps) {
  return (
    <div className="space-y-5">
      <div className="space-y-1.5">
        <label className="text-xs font-black uppercase tracking-wider text-slate-400">
          68. Does the student have any medical condition?
        </label>
        <div className="flex gap-4">
          {["Yes", "No"].map((option) => (
            <button
              key={option}
              type="button"
              onClick={() =>
                handleChange({
                  target: { name: "medicalCondition", value: option },
                } as any)
              }
              className={cn(
                "px-6 py-2 rounded-full text-xs font-black transition-all min-h-[40px]",
                formData.medicalCondition === option
                  ? "bg-red-600/40 text-red-300 border border-red-500"
                  : "bg-slate-800/50 text-slate-400 border border-slate-800 hover:border-slate-700",
              )}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
      {formData.medicalCondition === "Yes" && (
        <div className="space-y-1.5 pl-4 border-l-2 border-red-500/30">
          <label className="text-xs font-black uppercase tracking-wider text-slate-400">
            Please explain:
          </label>
          <input
            name="medicalConditionDetails"
            value={formData.medicalConditionDetails}
            onChange={handleChange}
            className="w-full h-12 px-4 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all"
            placeholder="Medical condition details..."
          />
        </div>
      )}

      <div className="space-y-1.5">
        <label className="text-xs font-black uppercase tracking-wider text-slate-400">
          69. Does the student have any allergies?
        </label>
        <div className="flex gap-4">
          {["Yes", "No"].map((option) => (
            <button
              key={option}
              type="button"
              onClick={() =>
                handleChange({
                  target: { name: "allergies", value: option },
                } as any)
              }
              className={cn(
                "px-6 py-2 rounded-full text-xs font-black transition-all min-h-[40px]",
                formData.allergies === option
                  ? "bg-red-600/40 text-red-300 border border-red-500"
                  : "bg-slate-800/50 text-slate-400 border border-slate-800 hover:border-slate-700",
              )}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
      {formData.allergies === "Yes" && (
        <div className="space-y-1.5 pl-4 border-l-2 border-red-500/30">
          <label className="text-xs font-black uppercase tracking-wider text-slate-400">
            Please explain:
          </label>
          <input
            name="allergiesDetails"
            value={formData.allergiesDetails}
            onChange={handleChange}
            className="w-full h-12 px-4 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all"
            placeholder="Allergy details..."
          />
        </div>
      )}

      <div className="space-y-1.5">
        <label className="text-xs font-black uppercase tracking-wider text-slate-400">
          70. Is the student currently taking any medication?
        </label>
        <div className="flex gap-4">
          {["Yes", "No"].map((option) => (
            <button
              key={option}
              type="button"
              onClick={() =>
                handleChange({
                  target: { name: "medication", value: option },
                } as any)
              }
              className={cn(
                "px-6 py-2 rounded-full text-xs font-black transition-all min-h-[40px]",
                formData.medication === option
                  ? "bg-red-600/40 text-red-300 border border-red-500"
                  : "bg-slate-800/50 text-slate-400 border border-slate-800 hover:border-slate-700",
              )}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
      {formData.medication === "Yes" && (
        <div className="space-y-1.5 pl-4 border-l-2 border-red-500/30">
          <label className="text-xs font-black uppercase tracking-wider text-slate-400">
            Please provide details:
          </label>
          <input
            name="medicationDetails"
            value={formData.medicationDetails}
            onChange={handleChange}
            className="w-full h-12 px-4 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all"
            placeholder="Medication details..."
          />
        </div>
      )}

      <div className="space-y-1.5">
        <label className="text-xs font-black uppercase tracking-wider text-slate-400">
          71. Does the student have any dietary restrictions?
        </label>
        <div className="flex gap-4">
          {["Yes", "No"].map((option) => (
            <button
              key={option}
              type="button"
              onClick={() =>
                handleChange({
                  target: { name: "dietaryRestrictions", value: option },
                } as any)
              }
              className={cn(
                "px-6 py-2 rounded-full text-xs font-black transition-all min-h-[40px]",
                formData.dietaryRestrictions === option
                  ? "bg-amber-600/40 text-amber-300 border border-amber-500"
                  : "bg-slate-800/50 text-slate-400 border border-slate-800 hover:border-slate-700",
              )}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
      {formData.dietaryRestrictions === "Yes" && (
        <div className="space-y-1.5 pl-4 border-l-2 border-amber-500/30">
          <label className="text-xs font-black uppercase tracking-wider text-slate-400">
            Please explain:
          </label>
          <input
            name="dietaryRestrictionsDetails"
            value={formData.dietaryRestrictionsDetails}
            onChange={handleChange}
            className="w-full h-12 px-4 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all"
            placeholder="Dietary restriction details..."
          />
        </div>
      )}

      <div className="space-y-1.5">
        <label className="text-xs font-black uppercase tracking-wider text-slate-400">
          72. Has the student ever experienced any serious medical condition or
          emergency that the Madrasah should know about?
        </label>
        <input
          name="seriousMedicalHistory"
          value={formData.seriousMedicalHistory}
          onChange={handleChange}
          className="w-full h-12 px-4 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all"
          placeholder="Any serious medical history..."
        />
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-black uppercase tracking-wider text-slate-400">
          73. Does the student have any special physical, emotional, behavioural
          or learning needs?
        </label>
        <div className="flex gap-4">
          {["Yes", "No"].map((option) => (
            <button
              key={option}
              type="button"
              onClick={() =>
                handleChange({
                  target: { name: "specialNeeds", value: option },
                } as any)
              }
              className={cn(
                "px-6 py-2 rounded-full text-xs font-black transition-all min-h-[40px]",
                formData.specialNeeds === option
                  ? "bg-purple-600/40 text-purple-300 border border-purple-500"
                  : "bg-slate-800/50 text-slate-400 border border-slate-800 hover:border-slate-700",
              )}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
      {formData.specialNeeds === "Yes" && (
        <div className="space-y-1.5 pl-4 border-l-2 border-purple-500/30">
          <label className="text-xs font-black uppercase tracking-wider text-slate-400">
            Please explain:
          </label>
          <input
            name="specialNeedsDetails"
            value={formData.specialNeedsDetails}
            onChange={handleChange}
            className="w-full h-12 px-4 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all"
            placeholder="Special needs details..."
          />
        </div>
      )}

      <div className="space-y-1.5">
        <label className="text-xs font-black uppercase tracking-wider text-slate-400">
          74. Is there any other health or welfare information we should know?
        </label>
        <textarea
          name="healthNotes"
          value={formData.healthNotes}
          onChange={handleChange}
          rows={2}
          className="w-full p-3 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all resize-none"
          placeholder="Any additional health information..."
        />
      </div>
    </div>
  );
}
