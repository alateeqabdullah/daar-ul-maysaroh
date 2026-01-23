import { z } from "zod";

export const AdmissionSchema = z.object({
  planId: z.string().min(1, "Plan selection is required"),
  paymentMethod: z.enum([
    "CREDIT_CARD",
    "BANK_TRANSFER",
    "CASH",
    "MOBILE_MONEY",
  ]),
  // Add other fields like preferred schedule if needed
});
