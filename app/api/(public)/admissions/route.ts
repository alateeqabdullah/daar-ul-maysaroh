import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { AdmissionSchema } from "@/lib/validations/admission";

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { planId, paymentMethod } = AdmissionSchema.parse(body);

    // 1. Fetch Plan & Student
    const [plan, student] = await Promise.all([
      prisma.pricingPlan.findUnique({ where: { id: planId } }),
      prisma.student.findUnique({ where: { userId: session.user.id } }),
    ]);

    if (!plan || !student) {
      return new NextResponse("Resource not found", { status: 404 });
    }

    // 2. Database Transaction (Atomic)
    // We create the subscription and payment record together
    const result = await prisma.$transaction(async (tx) => {
      const subscription = await tx.subscription.create({
        data: {
          studentId: student.id,
          planId: plan.id,
          status: "PENDING",
          basePrice: plan.basePrice,
          finalPrice: plan.basePrice,
          duration: plan.minDuration,
          daysPerWeek: plan.daysPerWeek[0],
          sessionsPerWeek: plan.sessionsPerWeek[0],
        },
      });

      const payment = await tx.payment.create({
        data: {
          studentId: student.id,
          amount: Number(plan.basePrice),
          description: `Enrollment for ${plan.name}`,
          paymentMethod: paymentMethod,
          paymentGateway: paymentMethod === "CREDIT_CARD" ? "STRIPE" : "MANUAL",
          status: "PENDING",
        },
      });

      return { subscription, payment };
    });

    // 3. Logic for Stripe vs Manual
    if (paymentMethod === "CREDIT_CARD") {
      // Here you would call a Stripe utility to get a URL
      // const stripeUrl = await createStripeUrl(result.payment.id);
      return NextResponse.json({ url: "/checkout/stripe-placeholder" });
    }

    // If Bank Transfer, send them to a "Thank You/Instructions" page
    return NextResponse.json({
      success: true,
      message: "Admission recorded. Please complete your bank transfer.",
      redirectUrl: `/admissions/transfer-instructions?id=${result.payment.id}`,
    });
  } catch (error) {
    console.error("[ADMISSION_ERROR]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}







{
  /* 
  
  import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user)
      return new NextResponse("Unauthorized", { status: 401 });

    const { planId, paymentMethod, customSetup } = await req.json();

    // 1. Transactional Creation
    const result = await prisma.$transaction(async (tx) => {
      // Find or Create Student Profile
      const student = await tx.student.upsert({
        where: { userId: session.user.id },
        update: {},
        create: {
          userId: session.user.id,
          academicYear: "2026",
          gender: "MALE", // Default to be updated in profile
        },
      });

      // Create Pending Subscription
      const subscription = await tx.subscription.create({
        data: {
          studentId: student.id,
          planId: planId,
          status: "PENDING",
          duration: customSetup.duration,
          daysPerWeek: customSetup.frequency,
          sessionsPerWeek: customSetup.frequency,
          basePrice: customSetup.total,
          finalPrice: customSetup.total,
        },
      });

      // Create Pending Payment record
      const payment = await tx.payment.create({
        data: {
          studentId: student.id,
          amount: customSetup.total,
          description: `Enrollment for ${customSetup.discipline}`,
          paymentMethod: paymentMethod, // BANK_TRANSFER or CREDIT_CARD
          paymentGateway: paymentMethod === "CREDIT_CARD" ? "STRIPE" : "MANUAL",
          status: "PENDING",
        },
      });

      return { subscription, payment };
    });

    // 2. Logic: Where to send the student?
    if (paymentMethod === "CREDIT_CARD") {
      // Return Stripe URL logic here
      return NextResponse.json({ url: "/checkout/stripe" });
    }

    // Manual Transfer Path
    return NextResponse.json({
      success: true,
      redirectUrl: `/admissions/bursar-memo?paymentId=${result.payment.id}`,
    });
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

  
  */
}
