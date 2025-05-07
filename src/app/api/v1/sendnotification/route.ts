import { NextRequest } from "next/server";
import admin from '@/lib/firebase';

export async function POST(request: NextRequest) {
  console.log("🚀 Received request at /api/v1/sendnotification");

  try {
    const data = await request.json();
    console.log("📩 Received payload:", data);

    const title = data.title;
    const body = data.body;
    const imageURL = data.imageURL;
    let postId = data.postId || "";
    let notificationType = "POST";

const message = {
  topic: "live_notification",  // ✅ This is required for topic-based notifications
  notification: { title, body, image: imageURL },
  data: { postId: postId.toString(), type: notificationType },
};

// ✅ Correct way to send to a specific device
const response = await admin.messaging().send(message);
    console.log("✅ Notification sent to topic. Response:", response);
    return Response.json({ success: true, msg: "Notification Sent" }, { status: 200 });

  } catch (error: any) {
    console.error("🔥 Error while sending notification:", error.message);
    return Response.json({ success: false, msg: error.message }, { status: 400 });
  }
}