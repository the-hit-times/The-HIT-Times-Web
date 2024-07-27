import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect"; // Your database connection file
import MatchPost from "@/models/Match"; // Your MatchPost model
import admin from "@/lib/firebase";

const db = admin.firestore();
const matchPostFirebaseRef = db.collection("live_sessions");

export async function POST(
  request: NextRequest,
  { params }: { params: { matchId: string } }
) {
  try {
    await dbConnect(); // Ensure the database is connected
    const { matchId } = params;
    const timeline = await request.json();

    const timelineFirebaseRef = await matchPostFirebaseRef
      .doc(matchId)
      .collection("timeline");
    const timelineFirebaseDoc = await timelineFirebaseRef.add(timeline);

    const timelineId = timelineFirebaseDoc.id;

    await MatchPost.updateOne(
      { firebase_match_id: matchId },
      {
        $push: {
          timeline: {
            firebase_timeline_id: timelineId,
            ...timeline,
          },
        },
      }
    );

    return NextResponse.json(
      {
        success: "success",
        data: {
          firebase_timeline_id: timelineId,
          ...timeline,
        },
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ msg: error.message }, { status: 500 });
  }
}
