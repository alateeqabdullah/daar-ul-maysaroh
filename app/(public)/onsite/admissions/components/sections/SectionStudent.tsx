// app/(marketing)/onsite/admissions/components/sections/SectionStudent.tsx
"use client";

import { cn } from "@/lib/utils";
import { SectionProps } from "../../types";

export function SectionStudent({
  formData,
  handleChange,
  errors,
  touched,
}: SectionProps) {
  return (
    <div className="space-y-5">
      {/* Full Name & Preferred Name */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-xs font-black uppercase tracking-wider text-slate-400">
            6. Student's Full Name <span className="text-amber-500">*</span>
          </label>
          <input
            name="studentFullName"
            value={formData.studentFullName}
            onChange={handleChange}
            onBlur={handleChange as any}
            className={cn(
              "w-full h-12 px-4 rounded-xl border bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all",
              errors.studentFullName && touched?.studentFullName
                ? "border-red-500"
                : "border-slate-800",
            )}
            placeholder="Enter full name"
          />
          {errors.studentFullName && touched?.studentFullName && (
            <p className="text-xs text-red-400 mt-1 error-message">
              {errors.studentFullName}
            </p>
          )}
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-black uppercase tracking-wider text-slate-400">
            7. Preferred Name
          </label>
          <input
            name="preferredName"
            value={formData.preferredName}
            onChange={handleChange}
            className="w-full h-12 px-4 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all"
            placeholder="Preferred name"
          />
        </div>
      </div>

      {/* Gender, DOB, Age */}
      <div className="grid sm:grid-cols-3 gap-4">
        <div className="space-y-1.5">
          <label className="text-xs font-black uppercase tracking-wider text-slate-400">
            8. Gender <span className="text-amber-500">*</span>
          </label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            onBlur={handleChange as any}
            className={cn(
              "w-full h-12 px-4 rounded-xl border bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all",
              errors.gender && touched?.gender
                ? "border-red-500"
                : "border-slate-800",
            )}
          >
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          {errors.gender && touched?.gender && (
            <p className="text-xs text-red-400 mt-1 error-message">
              {errors.gender}
            </p>
          )}
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-black uppercase tracking-wider text-slate-400">
            9. Date of Birth
          </label>
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            className="w-full h-12 px-4 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all"
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-black uppercase tracking-wider text-slate-400">
            10. Age <span className="text-amber-500">*</span>
          </label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            onBlur={handleChange as any}
            className={cn(
              "w-full h-12 px-4 rounded-xl border bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all",
              errors.age && touched?.age
                ? "border-red-500"
                : "border-slate-800",
            )}
            placeholder="Age"
          />
          {errors.age && touched?.age && (
            <p className="text-xs text-red-400 mt-1 error-message">
              {errors.age}
            </p>
          )}
        </div>
      </div>

      {/* Nationality & Country of Residence */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-xs font-black uppercase tracking-wider text-slate-400">
            11. Nationality
          </label>
          <input
            name="nationality"
            value={formData.nationality}
            onChange={handleChange}
            className="w-full h-12 px-4 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all"
            placeholder="Nationality"
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-black uppercase tracking-wider text-slate-400">
            12. Country of Current Residence{" "}
            <span className="text-amber-500">*</span>
          </label>
          <input
            name="countryOfResidence"
            value={formData.countryOfResidence}
            onChange={handleChange}
            onBlur={handleChange as any}
            className={cn(
              "w-full h-12 px-4 rounded-xl border bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all",
              errors.countryOfResidence && touched?.countryOfResidence
                ? "border-red-500"
                : "border-slate-800",
            )}
            placeholder="Country of residence"
          />
          {errors.countryOfResidence && touched?.countryOfResidence && (
            <p className="text-xs text-red-400 mt-1 error-message">
              {errors.countryOfResidence}
            </p>
          )}
        </div>
      </div>

      {/* State of Origin & Residential Address */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-xs font-black uppercase tracking-wider text-slate-400">
            13. State of Origin
          </label>
          <input
            name="stateOfOrigin"
            value={formData.stateOfOrigin}
            onChange={handleChange}
            className="w-full h-12 px-4 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all"
            placeholder="State of origin"
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-black uppercase tracking-wider text-slate-400">
            14. Current Residential Address
          </label>
          <input
            name="residentialAddress"
            value={formData.residentialAddress}
            onChange={handleChange}
            className="w-full h-12 px-4 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all"
            placeholder="Residential address"
          />
        </div>
      </div>

      {/* Lived Away From Home */}
      <div className="space-y-3">
        <div className="space-y-1.5">
          <label className="text-xs font-black uppercase tracking-wider text-slate-400">
            15. Has the student previously lived or studied away from home?
          </label>
          <div className="flex gap-4">
            {["Yes", "No"].map((option) => (
              <button
                key={option}
                type="button"
                onClick={() =>
                  handleChange({
                    target: { name: "livedAwayFromHome", value: option },
                  } as any)
                }
                className={cn(
                  "px-6 py-2 rounded-full text-xs font-black transition-all min-h-[40px]",
                  formData.livedAwayFromHome === option
                    ? "bg-purple-600/40 text-purple-300 border border-purple-500"
                    : "bg-slate-800/50 text-slate-400 border border-slate-800 hover:border-slate-700",
                )}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
        {formData.livedAwayFromHome === "Yes" && (
          <div className="space-y-1.5 pl-4 border-l-2 border-purple-500/30">
            <label className="text-xs font-black uppercase tracking-wider text-slate-400">
              Please briefly explain:
            </label>
            <textarea
              name="livedAwayFromHomeDetails"
              value={formData.livedAwayFromHomeDetails}
              onChange={handleChange}
              rows={2}
              className="w-full p-3 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all resize-none"
              placeholder="Brief explanation..."
            />
          </div>
        )}
      </div>

      {/* Boarded Before */}
      <div className="space-y-3">
        <div className="space-y-1.5">
          <label className="text-xs font-black uppercase tracking-wider text-slate-400">
            16. Has the student boarded in a Madrasah before?
          </label>
          <div className="flex gap-4">
            {["Yes", "No"].map((option) => (
              <button
                key={option}
                type="button"
                onClick={() =>
                  handleChange({
                    target: { name: "boardedBefore", value: option },
                  } as any)
                }
                className={cn(
                  "px-6 py-2 rounded-full text-xs font-black transition-all min-h-[40px]",
                  formData.boardedBefore === option
                    ? "bg-purple-600/40 text-purple-300 border border-purple-500"
                    : "bg-slate-800/50 text-slate-400 border border-slate-800 hover:border-slate-700",
                )}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
        {formData.boardedBefore === "Yes" && (
          <div className="pl-4 border-l-2 border-purple-500/30 space-y-3">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-black uppercase tracking-wider text-slate-400">
                  Name of previous Madrasah
                </label>
                <input
                  name="previousMadrasah"
                  value={formData.previousMadrasah}
                  onChange={handleChange}
                  className="w-full h-12 px-4 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all"
                  placeholder="Madrasah name"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-black uppercase tracking-wider text-slate-400">
                  Location
                </label>
                <input
                  name="previousMadrasahLocation"
                  value={formData.previousMadrasahLocation}
                  onChange={handleChange}
                  className="w-full h-12 px-4 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all"
                  placeholder="Location"
                />
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-black uppercase tracking-wider text-slate-400">
                  Duration of boarding
                </label>
                <input
                  name="previousMadrasahDuration"
                  value={formData.previousMadrasahDuration}
                  onChange={handleChange}
                  className="w-full h-12 px-4 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all"
                  placeholder="e.g., 1 year"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-black uppercase tracking-wider text-slate-400">
                  Reason for leaving
                </label>
                <input
                  name="previousMadrasahReason"
                  value={formData.previousMadrasahReason}
                  onChange={handleChange}
                  className="w-full h-12 px-4 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all"
                  placeholder="Reason"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
