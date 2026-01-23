"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe"; // Assuming you have stripe initialized
import { redirect } from "next/navigation";

export async function createCheckoutSession(planId: string) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login?callbackUrl=/pricing");
  }

  const plan = await prisma.pricingPlan.findUnique({
    where: { id: planId },
  });

  if (!plan) throw new Error("Plan not found");

  // This is real-world functionality: Creating the Stripe session
  const stripeSession = await stripe.checkout.sessions.create({
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: [
      {
        price: plan.stripePriceId, // This comes from your Prisma model
        quantity: 1,
      },
    ],
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing`,
    metadata: {
      userId: session.user.id,
      planId: plan.id,
    },
  });

  redirect(stripeSession.url!);
}
