// app/(marketing)/onsite/admissions/components/sections/SectionParent.tsx
"use client";

import { cn } from "@/lib/utils";
import { SectionProps } from "../../types";

export function SectionParent({
  formData,
  handleChange,
  errors,
  touched,
}: SectionProps) {
  return (
    <div className="space-y-5">
      {/* Father & Mother Names */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-xs font-black uppercase tracking-wider text-slate-400">
            17. Father's Full Name
          </label>
          <input
            name="fatherName"
            value={formData.fatherName}
            onChange={handleChange}
            className="w-full h-12 px-4 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all"
            placeholder="Father's name"
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-black uppercase tracking-wider text-slate-400">
            18. Mother's Full Name
          </label>
          <input
            name="motherName"
            value={formData.motherName}
            onChange={handleChange}
            className="w-full h-12 px-4 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all"
            placeholder="Mother's name"
          />
        </div>
      </div>

      {/* Guardian Name & Relationship */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-xs font-black uppercase tracking-wider text-slate-400">
            19. Parent/Guardian submitting this application{" "}
            <span className="text-amber-500">*</span>
          </label>
          <input
            name="guardianName"
            value={formData.guardianName}
            onChange={handleChange}
            onBlur={handleChange as any}
            className={cn(
              "w-full h-12 px-4 rounded-xl border bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all",
              errors.guardianName && touched?.guardianName
                ? "border-red-500"
                : "border-slate-800"
            )}
            placeholder="Full name"
          />
          {errors.guardianName && touched?.guardianName && (
            <p className="text-xs text-red-400 mt-1 error-message">{errors.guardianName}</p>
          )}
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-black uppercase tracking-wider text-slate-400">
            20. Relationship to Student <span className="text-amber-500">*</span>
          </label>
          <input
            name="guardianRelationship"
            value={formData.guardianRelationship}
            onChange={handleChange}
            onBlur={handleChange as any}
            className={cn(
              "w-full h-12 px-4 rounded-xl border bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all",
              errors.guardianRelationship && touched?.guardianRelationship
                ? "border-red-500"
                : "border-slate-800"
            )}
            placeholder="e.g., Father, Mother, Uncle"
          />
          {errors.guardianRelationship && touched?.guardianRelationship && (
            <p className="text-xs text-red-400 mt-1 error-message">{errors.guardianRelationship}</p>
          )}
        </div>
      </div>

      {/* Phone & WhatsApp */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-xs font-black uppercase tracking-wider text-slate-400">
            21. Phone Number <span className="text-amber-500">*</span>
          </label>
          <input
            name="guardianPhone"
            type="tel"
            value={formData.guardianPhone}
            onChange={handleChange}
            onBlur={handleChange as any}
            className={cn(
              "w-full h-12 px-4 rounded-xl border bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all",
              errors.guardianPhone && touched?.guardianPhone
                ? "border-red-500"
                : "border-slate-800"
            )}
            placeholder="+234 800 000 0000"
          />
          {errors.guardianPhone && touched?.guardianPhone && (
            <p className="text-xs text-red-400 mt-1 error-message">{errors.guardianPhone}</p>
          )}
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-black uppercase tracking-wider text-slate-400">
            22. WhatsApp Number
          </label>
          <input
            name="guardianWhatsApp"
            type="tel"
            value={formData.guardianWhatsApp}
            onChange={handleChange}
            className="w-full h-12 px-4 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all"
            placeholder="+234 800 000 0000"
          />
        </div>
      </div>

      {/* Email & Country */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-xs font-black uppercase tracking-wider text-slate-400">
            23. Email Address <span className="text-amber-500">*</span>
          </label>
          <input
            name="guardianEmail"
            type="email"
            value={formData.guardianEmail}
            onChange={handleChange}
            onBlur={handleChange as any}
            className={cn(
              "w-full h-12 px-4 rounded-xl border bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all",
              errors.guardianEmail && touched?.guardianEmail
                ? "border-red-500"
                : "border-slate-800"
            )}
            placeholder="email@example.com"
          />
          {errors.guardianEmail && touched?.guardianEmail && (
            <p className="text-xs text-red-400 mt-1 error-message">{errors.guardianEmail}</p>
          )}
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-black uppercase tracking-wider text-slate-400">
            24. Country of Residence <span className="text-amber-500">*</span>
          </label>
          <input
            name="guardianCountry"
            value={formData.guardianCountry}
            onChange={handleChange}
            onBlur={handleChange as any}
            className={cn(
              "w-full h-12 px-4 rounded-xl border bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all",
              errors.guardianCountry && touched?.guardianCountry
                ? "border-red-500"
                : "border-slate-800"
            )}
            placeholder="Country"
          />
          {errors.guardianCountry && touched?.guardianCountry && (
            <p className="text-xs text-red-400 mt-1 error-message">{errors.guardianCountry}</p>
          )}
        </div>
      </div>

      {/* Residential Address */}
      <div className="space-y-1.5">
        <label className="text-xs font-black uppercase tracking-wider text-slate-400">
          25. Residential Address
        </label>
        <input
          name="guardianAddress"
          value={formData.guardianAddress}
          onChange={handleChange}
          className="w-full h-12 px-4 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all"
          placeholder="Residential address"
        />
      </div>

      {/* Preferred Communication */}
      <div className="space-y-1.5">
        <label className="text-xs font-black uppercase tracking-wider text-slate-400">
          26. Preferred method of communication <span className="text-amber-500">*</span>
        </label>
        <div className="flex flex-wrap gap-2">
          {["WhatsApp", "Phone Call", "Email"].map((option) => (
            <button
              key={option}
              type="button"
              onClick={() =>
                handleChange({ target: { name: "preferredCommunication", value: option } } as any)
              }
              className={cn(
                "px-4 py-2 rounded-full text-xs font-black transition-all min-h-[40px]",
                formData.preferredCommunication === option
                  ? "bg-amber-600/40 text-amber-300 border border-amber-500"
                  : "bg-slate-800/50 text-slate-400 border border-slate-800 hover:border-slate-700"
              )}
            >
              {option}
            </button>
          ))}
        </div>
        {errors.preferredCommunication && touched?.preferredCommunication && (
          <p className="text-xs text-red-400 mt-1 error-message">
            {errors.preferredCommunication}
          </p>
        )}
      </div>

      {/* Emergency Contact */}
      <div className="space-y-3">
        <div className="space-y-1.5">
          <label className="text-xs font-black uppercase tracking-wider text-slate-400">
            27. Is there another person we should contact regarding this student?
          </label>
          <div className="flex gap-4">
            {["Yes", "No"].map((option) => (
              <button
                key={option}
                type="button"
                onClick={() =>
                  handleChange({ target: { name: "hasEmergencyContact", value: option } } as any)
                }
                className={cn(
                  "px-6 py-2 rounded-full text-xs font-black transition-all min-h-[40px]",
                  formData.hasEmergencyContact === option
                    ? "bg-purple-600/40 text-purple-300 border border-purple-500"
                    : "bg-slate-800/50 text-slate-400 border border-slate-800 hover:border-slate-700"
                )}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
        {formData.hasEmergencyContact === "Yes" && (
          <div className="pl-4 border-l-2 border-purple-500/30 space-y-3">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-black uppercase tracking-wider text-slate-400">
                  Full Name
                </label>
                <input
                  name="emergencyContactName"
                  value={formData.emergencyContactName}
                  onChange={handleChange}
                  onBlur={handleChange as any}
                  className={cn(
                    "w-full h-12 px-4 rounded-xl border bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all",
                    errors.emergencyContactName && touched?.emergencyContactName
                      ? "border-red-500"
                      : "border-slate-800"
                  )}
                  placeholder="Full name"
                />
                {errors.emergencyContactName && touched?.emergencyContactName && (
                  <p className="text-xs text-red-400 mt-1 error-message">
                    {errors.emergencyContactName}
                  </p>
                )}
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-black uppercase tracking-wider text-slate-400">
                  Relationship
                </label>
                <input
                  name="emergencyContactRelationship"
                  value={formData.emergencyContactRelationship}
                  onChange={handleChange}
                  className="w-full h-12 px-4 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all"
                  placeholder="Relationship"
                />
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-black uppercase tracking-wider text-slate-400">
                  Phone
                </label>
                <input
                  name="emergencyContactPhone"
                  value={formData.emergencyContactPhone}
                  onChange={handleChange}
                  onBlur={handleChange as any}
                  className={cn(
                    "w-full h-12 px-4 rounded-xl border bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all",
                    errors.emergencyContactPhone && touched?.emergencyContactPhone
                      ? "border-red-500"
                      : "border-slate-800"
                  )}
                  placeholder="Phone number"
                />
                {errors.emergencyContactPhone && touched?.emergencyContactPhone && (
                  <p className="text-xs text-red-400 mt-1 error-message">
                    {errors.emergencyContactPhone}
                  </p>
                )}
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-black uppercase tracking-wider text-slate-400">
                  WhatsApp
                </label>
                <input
                  name="emergencyContactWhatsApp"
                  value={formData.emergencyContactWhatsApp}
                  onChange={handleChange}
                  className="w-full h-12 px-4 rounded-xl border border-slate-800 bg-slate-900/50 focus:border-purple-500 outline-none text-slate-200 text-sm transition-all"
                  placeholder="WhatsApp number"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}