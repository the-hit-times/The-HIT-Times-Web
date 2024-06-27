import dbConnect from "@/lib/dbConnect";
import Post from "@/models/Post";
import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";
import admin from '@/lib/firebase'


export const dynamic = "force-dynamic"; // defaults to force-static



const NOTIFICATION_POST = "posts_notification";
const NOTIFICATION_LIVE = "live_notification";

export async function POST(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (token === null || token?.role !== "admin") {
    return Response.json(
      { success: false, msg: "Unauthorized" },
      { status: 401 }
    );
  }

  try {

    const data = await request.json();


    const title = data.title;
    const body = data.body;
    const imageURL = data.imageURL;
    var postId = data.postId;
    var notificationType = "POST";

    if (postId == undefined) {
      postId = "";
    }

    const payload = {
      notification: {
        title: title,
        body: body,
        image: imageURL,
      },
      data: {
        postId: postId.toString(),
        type: notificationType,
      },
    };

    await admin.messaging().sendToTopic(NOTIFICATION_POST, payload);

    const myBlob = {
      success: true,
      msg: "Notification Sent",
    };
    const myOptions = { status: 200 };

    return Response.json(myBlob, myOptions);

  } catch (error: any) {
    const myBlob = {
      success: false,
      msg: error.message,
    };
    const myOptions = { status: 400 };
    return Response.json(myBlob, myOptions);
  }
}
