// app/(marketing)/onsite/admissions/components/sections/SectionIslamic.tsx
"use client";

import { cn } from "@/lib/utils";
import { SectionProps } from "../../types";

export function SectionIslamic({
  formData,
  handleChange,
  handleArrayChange,
  errors,
  touched,
}: SectionProps) {
  return (
    <div className="space-y-5">
      {/* Studied Islamic Studies */}
      <div className="space-y-1.5">
        <label className="text-xs font-black uppercase tracking-wider text-slate-400">
          46. Has the student studied Islamic Studies?{" "}
          <span className="text-amber-500">*</span>
        </label>
        <div className="flex gap-4">
          {["Yes", "No"].map((option) => (
            <button
              key={option}
              type="button"
              onClick={() =>
                handleChange({
                  target: { name: "studiedIslamicStudies", value: option },
                } as any)
              }
              className={cn(
                "px-6 py-2 rounded-full text-xs font-black transition-all min-h-[40px]",
                formData.studiedIslamicStudies === option
                  ? "bg-purple-600/40 text-purple-300 border border-purple-500"
                  : "bg-slate-800/50 text-slate-400 border border-slate-800 hover:border-slate-700",
              )}
            >
              {option}
            </button>
          ))}
        </div>
        {errors.studiedIslamicStudies && touched?.studiedIslamicStudies && (
          <p className="text-xs text-red-400 mt-1 error-message">
            {errors.studiedIslamicStudies}
          </p>
        )}
      </div>

      {/* Islamic Studies Areas */}
      <div className="space-y-1.5">
        <label className="text-xs font-black uppercase tracking-wider text-slate-400">
          47. Which areas has the student studied?
        </label>
        <div className="flex flex-wrap gap-2">
          {[
            "Ṣalāh",
            "Fiqh",
            "Ḥadīth",
            "‘Aqīdah",
            "Sīrah",
            "Adhkār",
            "Islamic manners/adab",
            "Other",
          ].map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => handleArrayChange?.("islamicStudiesAreas", option)}
              className={cn(
                "px-4 py-2 rounded-full text-xs font-black transition-all min-h-[40px]",
                formData.islamicStudiesAreas.includes(option)
                  ? "bg-purple-600/40 text-purple-300 border border-purple-500"
                  : "bg-slate-800/50 text-slate-400 border border-slate-800 hover:border-slate-700",
              )}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {/* Islamic Knowledge Level */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-xs font-black uppercase tracking-wider text-slate-400">
            48. How would you describe the student's general Islamic knowledge?{" "}
            <span className="text-amber-500">*</span>
          </label>
          <select
            name="islamicKnowledgeLevel"
            value={formData.islamicKnowledgeLevel}
            onChange={handleChange}
            onBlur={handleChange as any}
            className={cn(
              "w-full h-12 px-4 rounded-xl border bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all",
              errors.islamicKnowledgeLevel && touched?.islamicKnowledgeLevel
                ? "border-red-500"
                : "border-slate-800",
            )}
          >
            <option value="">Select level</option>
            <option value="Beginner">Beginner</option>
            <option value="Basic">Basic</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
            <option value="Not sure">Not sure</option>
          </select>
          {errors.islamicKnowledgeLevel && touched?.islamicKnowledgeLevel && (
            <p className="text-xs text-red-400 mt-1 error-message">
              {errors.islamicKnowledgeLevel}
            </p>
          )}
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-black uppercase tracking-wider text-slate-400">
            49. Has the student studied Arabic?{" "}
            <span className="text-amber-500">*</span>
          </label>
          <div className="flex gap-4">
            {["Yes", "No"].map((option) => (
              <button
                key={option}
                type="button"
                onClick={() =>
                  handleChange({
                    target: { name: "studiedArabic", value: option },
                  } as any)
                }
                className={cn(
                  "px-6 py-2 rounded-full text-xs font-black transition-all min-h-[40px]",
                  formData.studiedArabic === option
                    ? "bg-purple-600/40 text-purple-300 border border-purple-500"
                    : "bg-slate-800/50 text-slate-400 border border-slate-800 hover:border-slate-700",
                )}
              >
                {option}
              </button>
            ))}
          </div>
          {errors.studiedArabic && touched?.studiedArabic && (
            <p className="text-xs text-red-400 mt-1 error-message">
              {errors.studiedArabic}
            </p>
          )}
        </div>
      </div>

      {formData.studiedArabic === "Yes" && (
        <div className="space-y-1.5 pl-4 border-l-2 border-purple-500/30">
          <label className="text-xs font-black uppercase tracking-wider text-slate-400">
            Level:
          </label>
          <input
            name="arabicLevel"
            value={formData.arabicLevel}
            onChange={handleChange}
            className="w-full h-12 px-4 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all"
            placeholder="e.g., Beginner, Intermediate"
          />
        </div>
      )}

      {/* Islamic Education Goals */}
      <div className="space-y-1.5">
        <label className="text-xs font-black uppercase tracking-wider text-slate-400">
          50. What areas of Islamic education would you particularly like the
          student to improve?
        </label>
        <textarea
          name="islamicEducationGoals"
          value={formData.islamicEducationGoals}
          onChange={handleChange}
          rows={2}
          className="w-full p-3 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all resize-none"
          placeholder="e.g., Salah practice, Adab, Aqidah..."
        />
      </div>
    </div>
  );
}
