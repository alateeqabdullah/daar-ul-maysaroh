// app/(marketing)/onsite/admissions/components/sections/SectionLearning.tsx
"use client";

import { cn } from "@/lib/utils";
import { SectionProps } from "../../types";

export function SectionLearning({ formData, handleChange }: SectionProps) {
  return (
    <div className="space-y-5">
      <div className="space-y-1.5">
        <label className="text-xs font-black uppercase tracking-wider text-slate-400">
          51. What motivates you to enrol your ward at Daar-ul-Maysaroh?
        </label>
        <textarea
          name="motivation"
          value={formData.motivation}
          onChange={handleChange}
          rows={2}
          className="w-full p-3 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all resize-none"
          placeholder="Why are you choosing Daar-ul-Maysaroh?"
        />
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-black uppercase tracking-wider text-slate-400">
          52. What would you like the student to achieve during their time with us?
        </label>
        <textarea
          name="desiredAchievement"
          value={formData.desiredAchievement}
          onChange={handleChange}
          rows={2}
          className="w-full p-3 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all resize-none"
          placeholder="What are your hopes for your child?"
        />
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-black uppercase tracking-wider text-slate-400">
          53. Does the student enjoy Qur'ān memorisation?
        </label>
        <div className="flex flex-wrap gap-2">
          {["Very much", "Somewhat", "Not really", "Not sure"].map((option) => (
            <button
              key={option}
              type="button"
              onClick={() =>
                handleChange({ target: { name: "enjoysMemorization", value: option } } as any)
              }
              className={cn(
                "px-6 py-2 rounded-full text-xs font-black transition-all min-h-[40px]",
                formData.enjoysMemorization === option
                  ? "bg-amber-600/40 text-amber-300 border border-amber-500"
                  : "bg-slate-800/50 text-slate-400 border border-slate-800 hover:border-slate-700"
              )}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-black uppercase tracking-wider text-slate-400">
          54. How does the student usually respond when corrected by a teacher?
        </label>
        <input
          name="responseToCorrection"
          value={formData.responseToCorrection}
          onChange={handleChange}
          className="w-full h-12 px-4 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all"
          placeholder="e.g., Receptive, shy, frustrated..."
        />
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-black uppercase tracking-wider text-slate-400">
          55. Does the student have difficulty maintaining concentration during Qur'ān lessons?
        </label>
        <div className="flex flex-wrap gap-2">
          {["Yes", "No", "Sometimes"].map((option) => (
            <button
              key={option}
              type="button"
              onClick={() =>
                handleChange({
                  target: { name: "concentrationDifficulty", value: option },
                } as any)
              }
              className={cn(
                "px-6 py-2 rounded-full text-xs font-black transition-all min-h-[40px]",
                formData.concentrationDifficulty === option
                  ? "bg-purple-600/40 text-purple-300 border border-purple-500"
                  : "bg-slate-800/50 text-slate-400 border border-slate-800 hover:border-slate-700"
              )}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-black uppercase tracking-wider text-slate-400">
          56. Are there any learning difficulties or circumstances that may affect the student's
          Tahfeedh?
        </label>
        <div className="flex gap-4">
          {["Yes", "No"].map((option) => (
            <button
              key={option}
              type="button"
              onClick={() =>
                handleChange({
                  target: { name: "learningDifficulties", value: option },
                } as any)
              }
              className={cn(
                "px-6 py-2 rounded-full text-xs font-black transition-all min-h-[40px]",
                formData.learningDifficulties === option
                  ? "bg-purple-600/40 text-purple-300 border border-purple-500"
                  : "bg-slate-800/50 text-slate-400 border border-slate-800 hover:border-slate-700"
              )}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
      {formData.learningDifficulties === "Yes" && (
        <div className="space-y-1.5 pl-4 border-l-2 border-purple-500/30">
          <label className="text-xs font-black uppercase tracking-wider text-slate-400">
            Please explain:
          </label>
          <textarea
            name="learningDifficultiesDetails"
            value={formData.learningDifficultiesDetails}
            onChange={handleChange}
            rows={2}
            className="w-full p-3 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all resize-none"
            placeholder="Any learning difficulties..."
          />
        </div>
      )}

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-xs font-black uppercase tracking-wider text-slate-400">
            57. What do you consider the student's greatest strength in Qur'ān learning?
          </label>
          <input
            name="greatestStrength"
            value={formData.greatestStrength}
            onChange={handleChange}
            className="w-full h-12 px-4 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all"
            placeholder="e.g., Good memory, loves reciting..."
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-black uppercase tracking-wider text-slate-400">
            58. What area do you believe the student needs the most improvement?
          </label>
          <input
            name="needsImprovement"
            value={formData.needsImprovement}
            onChange={handleChange}
            className="w-full h-12 px-4 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all"
            placeholder="e.g., Tajweed, consistency, focus..."
          />
        </div>
      </div>
    </div>
  );
}