import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect"; // Your database connection file
import MatchPost from "@/models/Match"; // Your MatchPost model
import admin from "@/lib/firebase";

const db = admin.firestore();
const matchPostFirebaseRef = db.collection("live_sessions");

export async function DELETE(
  request: NextRequest,
  { params }: { params: { matchId: string; timelineId: string } }
) {
  try {
    await dbConnect(); // Ensure the database is connected
    const { matchId, timelineId } = params;

    const timelineFirebaseRef = await matchPostFirebaseRef
      .doc(matchId)
      .collection("timeline");
    await timelineFirebaseRef.doc(timelineId).delete();

    await MatchPost.updateOne(
      { firebase_match_id: matchId },
      {
        $pull: {
          timeline: {
            firebase_timeline_id: timelineId,
          },
        },
      }
    );

    return NextResponse.json({ msg: "success" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ msg: error.message }, { status: 500 });
  }
}
