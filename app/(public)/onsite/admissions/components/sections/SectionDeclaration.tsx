// app/(marketing)/onsite/admissions/components/sections/SectionDeclaration.tsx
"use client";

import { cn } from "@/lib/utils";
import { SectionProps } from "../../types";

export function SectionDeclaration({
  formData,
  handleChange,
  errors,
  touched,
}: SectionProps) {
  return (
    <div className="space-y-6">
      <div className="p-6 rounded-2xl bg-purple-600/10 border border-purple-800/30">
        <div className="flex items-start gap-3 mb-4">
          <FileCheck className="w-6 h-6 text-purple-400 shrink-0 mt-1" />
          <div>
            <h3 className="font-black text-white text-lg">
              Parent/Guardian Declaration
            </h3>
            <p className="text-sm text-slate-300">
              I confirm that the information provided in this application is
              accurate and complete to the best of my knowledge.
            </p>
          </div>
        </div>

        <div className="space-y-3 text-sm text-slate-300 pl-9">
          <p className="flex items-start gap-2">
            <span className="text-amber-500">•</span>
            Admission is subject to assessment and approval by Daar-ul-Maysaroh.
          </p>
          <p className="flex items-start gap-2">
            <span className="text-amber-500">•</span>
            The student may be placed according to their Qur'ān and Islamic
            learning level.
          </p>
          <p className="flex items-start gap-2">
            <span className="text-amber-500">•</span>I am responsible for
            providing accurate information about the student's health, welfare
            and educational background.
          </p>
          <p className="flex items-start gap-2">
            <span className="text-amber-500">•</span>I will inform the Madrasah
            of any important change affecting my ward.
          </p>
          <p className="flex items-start gap-2">
            <span className="text-amber-500">•</span>I agree to abide by the
            rules, policies and regulations of Daar-ul-Maysaroh.
          </p>
          <p className="flex items-start gap-2">
            <span className="text-amber-500">•</span>I understand that
            submission of this form does not by itself constitute confirmation
            of admission.
          </p>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-xs font-black uppercase tracking-wider text-slate-400">
            Parent/Guardian Full Name <span className="text-amber-500">*</span>
          </label>
          <input
            name="parentFullName"
            value={formData.parentFullName}
            onChange={handleChange}
            onBlur={handleChange as any}
            className={cn(
              "w-full h-12 px-4 rounded-xl border bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all",
              errors.parentFullName && touched?.parentFullName
                ? "border-red-500"
                : "border-slate-800",
            )}
            placeholder="Full name"
          />
          {errors.parentFullName && touched?.parentFullName && (
            <p className="text-xs text-red-400 mt-1 error-message">
              {errors.parentFullName}
            </p>
          )}
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-black uppercase tracking-wider text-slate-400">
            Date <span className="text-amber-500">*</span>
          </label>
          <input
            type="date"
            name="declarationDate"
            value={formData.declarationDate}
            onChange={handleChange}
            onBlur={handleChange as any}
            className={cn(
              "w-full h-12 px-4 rounded-xl border bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all",
              errors.declarationDate && touched?.declarationDate
                ? "border-red-500"
                : "border-slate-800",
            )}
          />
          {errors.declarationDate && touched?.declarationDate && (
            <p className="text-xs text-red-400 mt-1 error-message">
              {errors.declarationDate}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          id="agreeDeclaration"
          name="agreeDeclaration"
          checked={formData.agreeDeclaration}
          onChange={handleChange}
          className="w-5 h-5 mt-0.5 rounded border-slate-700 bg-slate-900/50 text-purple-600 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-slate-950"
        />
        <label htmlFor="agreeDeclaration" className="text-sm text-slate-300">
          I confirm that I have read and understood the above declaration.
          <span className="text-amber-500"> *</span>
        </label>
      </div>
      {errors.agreeDeclaration && touched?.agreeDeclaration && (
        <p className="text-xs text-red-400 mt-1 error-message">
          {errors.agreeDeclaration}
        </p>
      )}
    </div>
  );
}
