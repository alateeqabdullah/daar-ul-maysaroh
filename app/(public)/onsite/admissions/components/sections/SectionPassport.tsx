// app/(marketing)/onsite/admissions/components/sections/SectionPassport.tsx
"use client";

import { SectionProps } from "../../types";
import { Upload, X, User, Camera } from "lucide-react";
import { cn } from "@/lib/utils";

interface PassportSectionProps extends SectionProps {
  handleFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  removePassportPhoto: () => void;
}

export function SectionPassport({
  formData,
  errors,
  touched,
  handleFileUpload,
  removePassportPhoto,
}: PassportSectionProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-1.5">
        <label className="text-xs font-black uppercase tracking-wider text-slate-400">
          Passport Photograph <span className="text-amber-500">*</span>
        </label>
        <p className="text-xs text-slate-500">
          Upload a recent passport-sized photograph (JPG or PNG, max 5MB)
        </p>
      </div>

      {formData.passportPhotoUrl ? (
        // Preview
        <div className="relative inline-block">
          <div className="w-32 h-32 rounded-xl overflow-hidden border-2 border-purple-500/50 bg-slate-800">
            <img
              src={formData.passportPhotoUrl}
              alt="Passport"
              className="w-full h-full object-cover"
            />
          </div>
          <button
            type="button"
            onClick={removePassportPhoto}
            className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-red-500/80 hover:bg-red-500 text-white flex items-center justify-center transition-all"
          >
            <X className="w-4 h-4" />
          </button>
          <p className="text-xs text-green-400 mt-2">
            ✓ Photo uploaded successfully
          </p>
        </div>
      ) : (
        // Upload Button
        <div className="relative">
          <input
            type="file"
            id="passportPhoto"
            accept=".jpg,.jpeg,.png"
            onChange={handleFileUpload}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
          />
          <div className="flex items-center justify-center w-full h-32 rounded-xl border-2 border-dashed border-slate-700 hover:border-purple-500 transition-all bg-slate-900/50 hover:bg-slate-800/50 group">
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-purple-600/20 flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform">
                <Camera className="w-6 h-6 text-purple-400" />
              </div>
              <p className="text-sm font-medium text-slate-400">
                Click to upload
              </p>
              <p className="text-xs text-slate-500">JPG or PNG • Max 5MB</p>
            </div>
          </div>
        </div>
      )}

      {errors?.passportPhoto && touched?.passportPhoto && (
        <p className="text-xs text-red-400 mt-1 error-message">
          {errors.passportPhoto}
        </p>
      )}
    </div>
  );
}
