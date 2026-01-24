import { NextResponse } from "next/server";
import { CouncilInquirySchema } from "@/lib/validations/council";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // 1. Validate the data
    const validatedData = CouncilInquirySchema.parse(body);

    // 2. Real-World Logic:
    // - You could save this to a new model `Inquiry` in Prisma
    // - Or use Resend/Nodemailer to email the Dean
    console.log("Council Inquiry Received:", validatedData);

    return NextResponse.json({
      success: true,
      message: "Inquiry submitted to the Scholarly Council successfully.",
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Internal Server Error",
      },
      { status: 400 },
    );
  }
}
