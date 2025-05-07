import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import admin from "@/lib/firebase";

const NOTIFICATION_LIVE_TOPIC = "live_notification";

// Updated types to include team and score information
interface NotificationPayload {
  team1?: { team_name: string; team_score: string };
  team2?: { team_name: string; team_score: string };
  match_status?: string;
  imageURL?: string;
  postId?: string | number;
}

interface NotificationMessage {
  topic: string;
  notification: {
    title?: string;
    body: string;
    image?: string;
  };
  data: {
    postId: string;
    type: "LIVE";
  };
}

export async function POST(request: NextRequest) {
  console.log("🚀 Received request at /api/v1/sendnotification");

  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (!token || token.role !== "admin") {
    console.log("🔒 Unauthorized access attempt");
    return NextResponse.json(
      { success: false, msg: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const data: NotificationPayload = await request.json();
    console.log("📩 Received payload:", data);

    // Construct notification body with score
    const body = data.team1 && data.team2
      ? `${data.team1.team_name} ${data.team1.team_score} - ${data.team2.team_score} ${data.team2.team_name}\n${data.match_status || "Live Match Update"}`
      : data.match_status || "New live event is happening now!";
    
    const imageURL = data.imageURL || "";
    const postId = data.postId?.toString() || "";

    const message: NotificationMessage = {
      topic: NOTIFICATION_LIVE_TOPIC,
      notification: {
        title: "Live Match Update",
        body,
        ...(imageURL && { image: imageURL }),
      },
      data: {
        postId,
        type: "LIVE",
      },
    };

    const response = await admin.messaging().send(message);
    console.log("✅ Notification sent successfully. Response:", response);

    return NextResponse.json(
      { success: true, msg: "Notification Sent", response },
      { status: 200 }
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
    console.error("🔥 Error sending notification:", {
      message: errorMessage,
      stack: error instanceof Error ? error.stack : undefined,
    });

    return NextResponse.json(
      { success: false, msg: errorMessage },
      { status: 400 }
    );
  }
}

export const runtime = "nodejs";