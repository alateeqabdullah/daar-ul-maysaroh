import { z } from "zod";

export const CouncilInquirySchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Invalid scholarly email address"),
  currentLevel: z.enum(["BEGINNER", "INTERMEDIATE", "ADVANCED", "HAFIDH"]),
  timezone: z.string().min(1, "Preferred timezone is required"),
  scholarPreference: z.string().optional(),
  message: z.string().min(10, "Please provide more details for the Council"),
});

export type CouncilInquiryValues = z.infer<typeof CouncilInquirySchema>;
