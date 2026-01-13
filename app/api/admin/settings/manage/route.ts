import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session || !["ADMIN", "SUPER_ADMIN"].includes(session.user.role)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { settings } = body;

    // Prepare transactions
    // We convert everything to String for storage
    const transactions = Object.entries(settings).map(([key, value]) =>
      prisma.systemSetting.upsert({
        where: { key },
        update: { value: String(value) },
        create: {
          key,
          value: String(value),
          type:
            typeof value === "boolean"
              ? "BOOLEAN"
              : typeof value === "number"
              ? "NUMBER"
              : "STRING",
          category: "SYSTEM", // Default category
        },
      })
    );

    await prisma.$transaction(transactions);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Settings API Error:", error);
    return NextResponse.json(
      { error: error.message || "Server Error" },
      { status: 500 }
    );
  }
}
