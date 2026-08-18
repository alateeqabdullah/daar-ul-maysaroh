// app/(marketing)/onsite/admissions/components/sections/SectionTarbiyah.tsx
"use client";

import { SectionProps } from "../../types";

export function SectionTarbiyah({ formData, handleChange }: SectionProps) {
  return (
    <div className="space-y-5">
      <div className="space-y-1.5">
        <label className="text-xs font-black uppercase tracking-wider text-slate-400">
          59. Why are you choosing a boarding Madrasah for the student?
        </label>
        <textarea
          name="whyBoarding"
          value={formData.whyBoarding}
          onChange={handleChange}
          rows={2}
          className="w-full p-3 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all resize-none"
          placeholder="Why boarding?"
        />
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-black uppercase tracking-wider text-slate-400">
          60. Has the student lived away from parents before?
        </label>
        <div className="flex gap-4">
          {["Yes", "No"].map((option) => (
            <button
              key={option}
              type="button"
              onClick={() =>
                handleChange({
                  target: { name: "livedAwayFromParents", value: option },
                } as any)
              }
              className={cn(
                "px-6 py-2 rounded-full text-xs font-black transition-all min-h-[40px]",
                formData.livedAwayFromParents === option
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
          61. How does the student normally respond to being away from home?
        </label>
        <input
          name="awayFromHomeResponse"
          value={formData.awayFromHomeResponse}
          onChange={handleChange}
          className="w-full h-12 px-4 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all"
          placeholder="e.g., Adapts well, homesick at first..."
        />
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-black uppercase tracking-wider text-slate-400">
          62. Does the student have any difficulty following a structured
          routine?
        </label>
        <div className="flex flex-wrap gap-2">
          {["Yes", "No", "Sometimes"].map((option) => (
            <button
              key={option}
              type="button"
              onClick={() =>
                handleChange({
                  target: { name: "routineDifficulty", value: option },
                } as any)
              }
              className={cn(
                "px-6 py-2 rounded-full text-xs font-black transition-all min-h-[40px]",
                formData.routineDifficulty === option
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
          63. Does the student normally wake up for Ṣalāh without difficulty?
        </label>
        <input
          name="wakesForSalah"
          value={formData.wakesForSalah}
          onChange={handleChange}
          className="w-full h-12 px-4 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all"
          placeholder="e.g., Yes, always; Sometimes needs encouragement"
        />
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-black uppercase tracking-wider text-slate-400">
          64. How would you describe the student's general discipline?
        </label>
        <input
          name="generalDiscipline"
          value={formData.generalDiscipline}
          onChange={handleChange}
          className="w-full h-12 px-4 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all"
          placeholder="e.g., Very disciplined, Needs reminders..."
        />
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-black uppercase tracking-wider text-slate-400">
          65. Are there any behavioural concerns we should know about?
        </label>
        <input
          name="behavioralConcerns"
          value={formData.behavioralConcerns}
          onChange={handleChange}
          className="w-full h-12 px-4 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all"
          placeholder="Any concerns..."
        />
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-black uppercase tracking-wider text-slate-400">
          66. Is there anything about the student's personality, habits or
          character that would help our Ustadhs care for them better?
        </label>
        <textarea
          name="personalityNotes"
          value={formData.personalityNotes}
          onChange={handleChange}
          rows={2}
          className="w-full p-3 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all resize-none"
          placeholder="Any notes about personality..."
        />
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-black uppercase tracking-wider text-slate-400">
          67. Are there any specific Tarbiyah goals you would like us to work on
          with the student?
        </label>
        <textarea
          name="tarbiyahGoals"
          value={formData.tarbiyahGoals}
          onChange={handleChange}
          rows={2}
          className="w-full p-3 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all resize-none"
          placeholder="Any character goals..."
        />
      </div>
    </div>
  );
}
