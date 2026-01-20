import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

// --- TYPE DEFINITIONS ---

type SendMessageData = {
  receiverId: string;
  content: string;
};

type MarkReadData = {
  senderId: string;
};

// Discriminated Union for strict type checking on 'action'
type RequestBody = 
  | { action: "SEND"; data: SendMessageData }
  | { action: "MARK_READ"; data: MarkReadData };

// --- POST HANDLER ---

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Cast the request body to our defined type
    const body = (await req.json()) as RequestBody;

    // 1. ACTION: SEND MESSAGE
    if (body.action === "SEND") {
      const { content, receiverId } = body.data;

      // Strict validation
      if (!content || typeof content !== "string" || !receiverId) {
        return NextResponse.json({ error: "Invalid content or receiver ID" }, { status: 400 });
      }

      const message = await prisma.message.create({
        data: {
          content,
          senderId: session.user.id,
          receiverId,
          isRead: false,
        },
        include: {
          sender: { select: { name: true, image: true } },
        },
      });

      return NextResponse.json({
        success: true,
        message: {
          ...message,
          createdAt: message.createdAt.toISOString(),
          senderName: message.sender.name,
          senderImage: message.sender.image,
        },
      });
    }

    // 2. ACTION: MARK READ
    if (body.action === "MARK_READ") {
      const { senderId } = body.data;

      if (!senderId) {
        return NextResponse.json({ error: "Missing senderId" }, { status: 400 });
      }

      await prisma.message.updateMany({
        where: {
          senderId: senderId,
          receiverId: session.user.id,
          isRead: false,
        },
        data: { isRead: true },
      });

      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: "Invalid Action" }, { status: 400 });

  } catch (error: unknown) {
    // Proper error typing (avoiding 'any')
    console.error("Communication API Error:", error);
    
    const errorMessage = error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

// --- GET HANDLER ---

export async function GET(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const otherUserId = searchParams.get("userId");

    if (!otherUserId) {
      return NextResponse.json({ error: "Missing User ID" }, { status: 400 });
    }

    const messages = await prisma.message.findMany({
      where: {
        OR: [
          { senderId: session.user.id, receiverId: otherUserId },
          { senderId: otherUserId, receiverId: session.user.id },
        ],
      },
      orderBy: { createdAt: "asc" },
      take: 100,
      include: {
        sender: { select: { name: true, image: true } },
      },
    });

    return NextResponse.json(
      messages.map((m) => ({
        ...m,
        createdAt: m.createdAt.toISOString(),
        senderName: m.sender.name,
        senderImage: m.sender.image,
      }))
    );
  } catch (error: unknown) {
    console.error("Fetch Messages Error:", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to fetch messages";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}