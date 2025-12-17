// src/app/api/payments/route.ts
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";

export async function GET(request: NextRequest) {
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const payments = await prisma.payment.findMany({
      where: {
        OR: [
          { student: { userId: session.user.id } },
          { parent: { userId: session.user.id } },
        ],
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ payments });
  } catch (error) {
    console.error("Error fetching payments:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { amount, description, period, studentId, parentId } = body;

    // Create Stripe payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency: "usd",
      metadata: {
        userId: session.user.id,
        studentId,
        parentId,
        description,
        period,
      },
    });

    // Create payment record in database
    const payment = await prisma.payment.create({
      data: {
        amount,
        currency: "USD",
        description,
        period,
        studentId,
        parentId,
        paymentMethod: "CREDIT_CARD",
        paymentGateway: "STRIPE",
        gatewayReference: paymentIntent.id,
        status: "PENDING",
      },
    });

    return NextResponse.json({
      message: "Payment initiated",
      payment,
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error("Error creating payment:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
