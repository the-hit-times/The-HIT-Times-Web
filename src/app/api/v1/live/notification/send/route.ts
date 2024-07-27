import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import admin from '@/lib/firebase'; // Make sure to initialize Firebase admin in this file

const NOTIFICATION_LIVE = "live_notification";

export async function POST(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (token === null || token?.role !== "admin") {
    return NextResponse.json(
      { success: false, msg: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const data = await request.json();
    const notificationType = "LIVE";
    const notificationContent = {
      ...data,
    };
    const payload = {
      data: {
        type: notificationType,
        data: JSON.stringify(notificationContent),
      },
    };

    await admin.messaging().sendToTopic(NOTIFICATION_LIVE, payload);

    return NextResponse.json(
      { success: true, msg: "success" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, msg: error.message },
      { status: 400 }
    );
  }
}
