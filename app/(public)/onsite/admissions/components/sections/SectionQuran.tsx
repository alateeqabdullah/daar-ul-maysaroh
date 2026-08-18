// app/(marketing)/onsite/admissions/components/sections/SectionQuran.tsx
"use client";

import { cn } from "@/lib/utils";
import { SectionProps } from "../../types";

export function SectionQuran({
  formData,
  handleChange,
  handleArrayChange,
  errors,
  touched,
}: SectionProps) {
  return (
    <div className="space-y-5">
      <p className="text-xs text-amber-500/70 italic">
        This section is particularly important. Please answer as accurately as
        possible so that we can properly assess and place the student.
      </p>

      {/* Started Reading Quran */}
      <div className="space-y-1.5">
        <label className="text-xs font-black uppercase tracking-wider text-slate-400">
          28. Has the student started reading the Qur'ān?{" "}
          <span className="text-amber-500">*</span>
        </label>
        <div className="flex gap-4">
          {["Yes", "No"].map((option) => (
            <button
              key={option}
              type="button"
              onClick={() =>
                handleChange({
                  target: { name: "startedQuran", value: option },
                } as any)
              }
              className={cn(
                "px-6 py-2 rounded-full text-xs font-black transition-all min-h-[40px]",
                formData.startedQuran === option
                  ? "bg-purple-600/40 text-purple-300 border border-purple-500"
                  : "bg-slate-800/50 text-slate-400 border border-slate-800 hover:border-slate-700",
              )}
            >
              {option}
            </button>
          ))}
        </div>
        {errors.startedQuran && touched?.startedQuran && (
          <p className="text-xs text-red-400 mt-1 error-message">
            {errors.startedQuran}
          </p>
        )}
      </div>

      {/* Quran Reading Level */}
      <div className="space-y-1.5">
        <label className="text-xs font-black uppercase tracking-wider text-slate-400">
          29. How would you describe the student's Qur'ān reading?{" "}
          <span className="text-amber-500">*</span>
        </label>
        <select
          name="quranReadingLevel"
          value={formData.quranReadingLevel}
          onChange={handleChange}
          onBlur={handleChange as any}
          className={cn(
            "w-full h-12 px-4 rounded-xl border bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all",
            errors.quranReadingLevel && touched?.quranReadingLevel
              ? "border-red-500"
              : "border-slate-800",
          )}
        >
          <option value="">Select level</option>
          <option value="Beginner — still learning Arabic letters">
            Beginner — still learning Arabic letters
          </option>
          <option value="Can read with assistance">
            Can read with assistance
          </option>
          <option value="Can read independently">Can read independently</option>
          <option value="Fluent">Fluent</option>
          <option value="Very fluent">Very fluent</option>
        </select>
        {errors.quranReadingLevel && touched?.quranReadingLevel && (
          <p className="text-xs text-red-400 mt-1 error-message">
            {errors.quranReadingLevel}
          </p>
        )}
      </div>

      {/* Noor Al-Bayan */}
      <div className="space-y-1.5">
        <label className="text-xs font-black uppercase tracking-wider text-slate-400">
          30. Has the student studied Noor al-Bayān or another Qur'ān reading
          method?
        </label>
        <div className="flex gap-4">
          {["Yes", "No"].map((option) => (
            <button
              key={option}
              type="button"
              onClick={() =>
                handleChange({
                  target: { name: "studiedNoorAlBayan", value: option },
                } as any)
              }
              className={cn(
                "px-6 py-2 rounded-full text-xs font-black transition-all min-h-[40px]",
                formData.studiedNoorAlBayan === option
                  ? "bg-purple-600/40 text-purple-300 border border-purple-500"
                  : "bg-slate-800/50 text-slate-400 border border-slate-800 hover:border-slate-700",
              )}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
      {formData.studiedNoorAlBayan === "Yes" && (
        <div className="space-y-1.5 pl-4 border-l-2 border-purple-500/30">
          <label className="text-xs font-black uppercase tracking-wider text-slate-400">
            Which one?
          </label>
          <input
            name="noorAlBayanMethod"
            value={formData.noorAlBayanMethod}
            onChange={handleChange}
            className="w-full h-12 px-4 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all"
            placeholder="Method name"
          />
        </div>
      )}

      {/* Started Memorization */}
      <div className="space-y-1.5">
        <label className="text-xs font-black uppercase tracking-wider text-slate-400">
          31. Has the student started Qur'ān memorisation?{" "}
          <span className="text-amber-500">*</span>
        </label>
        <div className="flex gap-4">
          {["Yes", "No"].map((option) => (
            <button
              key={option}
              type="button"
              onClick={() =>
                handleChange({
                  target: { name: "startedMemorization", value: option },
                } as any)
              }
              className={cn(
                "px-6 py-2 rounded-full text-xs font-black transition-all min-h-[40px]",
                formData.startedMemorization === option
                  ? "bg-purple-600/40 text-purple-300 border border-purple-500"
                  : "bg-slate-800/50 text-slate-400 border border-slate-800 hover:border-slate-700",
              )}
            >
              {option}
            </button>
          ))}
        </div>
        {errors.startedMemorization && touched?.startedMemorization && (
          <p className="text-xs text-red-400 mt-1 error-message">
            {errors.startedMemorization}
          </p>
        )}
      </div>

      {/* Memorization Amount */}
      <div className="space-y-1.5">
        <label className="text-xs font-black uppercase tracking-wider text-slate-400">
          32. Approximately how much Qur'ān has the student memorised?
        </label>
        <select
          name="memorizationAmount"
          value={formData.memorizationAmount}
          onChange={handleChange}
          className="w-full h-12 px-4 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all"
        >
          <option value="">Select amount</option>
          <option value="Less than Juz' 30">Less than Juz' 30</option>
          <option value="Juz' 30">Juz' 30</option>
          <option value="2–5 Juz'">2–5 Juz'</option>
          <option value="6–10 Juz'">6–10 Juz'</option>
          <option value="11–20 Juz'">11–20 Juz'</option>
          <option value="21–29 Juz'">21–29 Juz'</option>
          <option value="Complete Qur'ān">Complete Qur'ān</option>
          <option value="Other">Other</option>
        </select>
      </div>

      {/* Current Memorizing & Frequency */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-xs font-black uppercase tracking-wider text-slate-400">
            33. Which Juz'/Sūrah is the student currently memorising?
          </label>
          <input
            name="currentMemorizing"
            value={formData.currentMemorizing}
            onChange={handleChange}
            className="w-full h-12 px-4 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all"
            placeholder="e.g., Juz' 29, Surah Al-Baqarah"
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-black uppercase tracking-wider text-slate-400">
            34. How regularly does the student currently memorise Qur'ān?{" "}
            <span className="text-amber-500">*</span>
          </label>
          <select
            name="memorizationFrequency"
            value={formData.memorizationFrequency}
            onChange={handleChange}
            onBlur={handleChange as any}
            className={cn(
              "w-full h-12 px-4 rounded-xl border bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all",
              errors.memorizationFrequency && touched?.memorizationFrequency
                ? "border-red-500"
                : "border-slate-800",
            )}
          >
            <option value="">Select frequency</option>
            <option value="Daily">Daily</option>
            <option value="Several times a week">Several times a week</option>
            <option value="Occasionally">Occasionally</option>
            <option value="Currently not memorising">
              Currently not memorising
            </option>
          </select>
          {errors.memorizationFrequency && touched?.memorizationFrequency && (
            <p className="text-xs text-red-400 mt-1 error-message">
              {errors.memorizationFrequency}
            </p>
          )}
        </div>
      </div>

      {/* Memorization Amount Description */}
      <div className="space-y-1.5">
        <label className="text-xs font-black uppercase tracking-wider text-slate-400">
          35. How much new memorisation does the student normally complete?
        </label>
        <input
          name="memorizationAmountDescription"
          value={formData.memorizationAmountDescription}
          onChange={handleChange}
          className="w-full h-12 px-4 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all"
          placeholder="e.g., half a page daily, one page daily, 2 pages weekly"
        />
      </div>

      {/* Memorization Strength */}
      <div className="space-y-1.5">
        <label className="text-xs font-black uppercase tracking-wider text-slate-400">
          36. How strong is the student's existing memorisation?
        </label>
        <select
          name="memorizationStrength"
          value={formData.memorizationStrength}
          onChange={handleChange}
          className="w-full h-12 px-4 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all"
        >
          <option value="">Select strength</option>
          <option value="Needs significant revision">
            Needs significant revision
          </option>
          <option value="Fair">Fair</option>
          <option value="Good">Good</option>
          <option value="Very good">Very good</option>
          <option value="Excellent">Excellent</option>
        </select>
      </div>

      {/* Muraja'ah Frequency & Routine */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-xs font-black uppercase tracking-wider text-slate-400">
            37. How regularly does the student perform Murāja‘ah?{" "}
            <span className="text-amber-500">*</span>
          </label>
          <select
            name="murajaahFrequency"
            value={formData.murajaahFrequency}
            onChange={handleChange}
            onBlur={handleChange as any}
            className={cn(
              "w-full h-12 px-4 rounded-xl border bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all",
              errors.murajaahFrequency && touched?.murajaahFrequency
                ? "border-red-500"
                : "border-slate-800",
            )}
          >
            <option value="">Select frequency</option>
            <option value="Daily">Daily</option>
            <option value="Several times a week">Several times a week</option>
            <option value="Occasionally">Occasionally</option>
            <option value="Rarely">Rarely</option>
            <option value="Not currently doing Murāja‘ah">
              Not currently doing Murāja‘ah
            </option>
          </select>
          {errors.murajaahFrequency && touched?.murajaahFrequency && (
            <p className="text-xs text-red-400 mt-1 error-message">
              {errors.murajaahFrequency}
            </p>
          )}
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-black uppercase tracking-wider text-slate-400">
            38. Does the student have a current Murāja‘ah routine?
          </label>
          <div className="flex gap-4">
            {["Yes", "No"].map((option) => (
              <button
                key={option}
                type="button"
                onClick={() =>
                  handleChange({
                    target: { name: "hasMurajaahRoutine", value: option },
                  } as any)
                }
                className={cn(
                  "px-6 py-2 rounded-full text-xs font-black transition-all min-h-[40px]",
                  formData.hasMurajaahRoutine === option
                    ? "bg-purple-600/40 text-purple-300 border border-purple-500"
                    : "bg-slate-800/50 text-slate-400 border border-slate-800 hover:border-slate-700",
                )}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </div>
      {formData.hasMurajaahRoutine === "Yes" && (
        <div className="space-y-1.5 pl-4 border-l-2 border-purple-500/30">
          <label className="text-xs font-black uppercase tracking-wider text-slate-400">
            Please describe it:
          </label>
          <textarea
            name="murajaahRoutineDescription"
            value={formData.murajaahRoutineDescription}
            onChange={handleChange}
            rows={2}
            className="w-full p-3 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all resize-none"
            placeholder="Describe the Murāja‘ah routine..."
          />
        </div>
      )}

      {/* Tajweed & Qira'at */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-xs font-black uppercase tracking-wider text-slate-400">
            39. Has the student studied Tajweed?
          </label>
          <div className="flex gap-4">
            {["Yes", "No"].map((option) => (
              <button
                key={option}
                type="button"
                onClick={() =>
                  handleChange({
                    target: { name: "studiedTajweed", value: option },
                  } as any)
                }
                className={cn(
                  "px-6 py-2 rounded-full text-xs font-black transition-all min-h-[40px]",
                  formData.studiedTajweed === option
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
            40. How would you describe the student's Tajweed level?
          </label>
          <select
            name="tajweedLevel"
            value={formData.tajweedLevel}
            onChange={handleChange}
            className="w-full h-12 px-4 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all"
          >
            <option value="">Select level</option>
            <option value="Beginner">Beginner</option>
            <option value="Basic">Basic</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
            <option value="Not sure">Not sure</option>
          </select>
        </div>
      </div>

      {/* Qira'at */}
      <div className="space-y-1.5">
        <label className="text-xs font-black uppercase tracking-wider text-slate-400">
          41. Has the student studied Qirā’aat?
        </label>
        <div className="flex gap-4">
          {["Yes", "No"].map((option) => (
            <button
              key={option}
              type="button"
              onClick={() =>
                handleChange({
                  target: { name: "studiedQiraat", value: option },
                } as any)
              }
              className={cn(
                "px-6 py-2 rounded-full text-xs font-black transition-all min-h-[40px]",
                formData.studiedQiraat === option
                  ? "bg-purple-600/40 text-purple-300 border border-purple-500"
                  : "bg-slate-800/50 text-slate-400 border border-slate-800 hover:border-slate-700",
              )}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
      {formData.studiedQiraat === "Yes" && (
        <div className="space-y-1.5 pl-4 border-l-2 border-purple-500/30">
          <label className="text-xs font-black uppercase tracking-wider text-slate-400">
            Please specify:
          </label>
          <input
            name="qiraatDetails"
            value={formData.qiraatDetails}
            onChange={handleChange}
            className="w-full h-12 px-4 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all"
            placeholder="e.g., Hafs, Warsh, Qalun"
          />
        </div>
      )}

      {/* Current Teacher */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-xs font-black uppercase tracking-wider text-slate-400">
            42. Who currently teaches the student Qur'ān?
          </label>
          <select
            name="currentTeacher"
            value={formData.currentTeacher}
            onChange={handleChange}
            className="w-full h-12 px-4 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all"
          >
            <option value="">Select</option>
            <option value="Parent">Parent</option>
            <option value="Private Ustadh/Ustadhah">
              Private Ustadh/Ustadhah
            </option>
            <option value="Madrasah">Madrasah</option>
            <option value="School">School</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-black uppercase tracking-wider text-slate-400">
            43. Name of current/previous Qur'ān teacher or Madrasah
          </label>
          <input
            name="teacherName"
            value={formData.teacherName}
            onChange={handleChange}
            className="w-full h-12 px-4 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all"
            placeholder="Teacher or Madrasah name"
          />
        </div>
      </div>

      {/* Parent Quran Goals */}
      <div className="space-y-1.5">
        <label className="text-xs font-black uppercase tracking-wider text-slate-400">
          44. What are the parent's main Qur'ān goals for the student?
        </label>
        <div className="flex flex-wrap gap-2">
          {[
            "Begin Qur'ān memorisation",
            "Increase memorisation",
            "Strengthen existing memorisation",
            "Improve Murāja‘ah",
            "Improve Tajweed",
            "Improve Qur'ān reading",
            "Study Qirā’aat",
            "Complete memorisation",
            "Maintain memorisation",
            "Other",
          ].map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => handleArrayChange?.("parentQuranGoals", option)}
              className={cn(
                "px-4 py-2 rounded-full text-xs font-black transition-all min-h-[40px]",
                formData.parentQuranGoals.includes(option)
                  ? "bg-amber-600/40 text-amber-300 border border-amber-500"
                  : "bg-slate-800/50 text-slate-400 border border-slate-800 hover:border-slate-700",
              )}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {/* Quran Journey Notes */}
      <div className="space-y-1.5">
        <label className="text-xs font-black uppercase tracking-wider text-slate-400">
          45. Please tell us anything else about the student's Qur'ān journey
          that will help us understand their level.
        </label>
        <textarea
          name="quranJourneyNotes"
          value={formData.quranJourneyNotes}
          onChange={handleChange}
          rows={3}
          className="w-full p-3 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all resize-none"
          placeholder="Any additional information..."
        />
      </div>
    </div>
  );
}
