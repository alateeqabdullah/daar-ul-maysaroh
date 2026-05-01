import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const dbPlans = await prisma.pricingPlan.findMany({
      where: { isActive: true },
      include: { pricingTiers: true },
      orderBy: { orderIndex: "asc" },
    });

    return NextResponse.json(dbPlans);
  } catch (error) {
    console.error("Failed to fetch pricing plans:", error);
    return NextResponse.json(
      { error: "Failed to fetch pricing plans" },
      { status: 500 },
    );
  }
}
