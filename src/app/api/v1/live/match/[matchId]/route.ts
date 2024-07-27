import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect"; // Your database connection file
import MatchPost from "@/models/Match"; // Your MatchPost model
import admin from "@/lib/firebase";

export const dynamic = "force-dynamic"; // defaults to force-static

export async function GET(
  request: NextRequest,
  { params }: { params: { matchId: string } }
) {
  try {
    await dbConnect(); // Ensure the database is connected
    const { matchId } = params;

    const doc = await MatchPost.findOne({ firebase_match_id: matchId });

    if (!doc) {
      return NextResponse.json({ msg: "Match not found" }, { status: 404 });
    }

    return NextResponse.json({ data: doc, code: "success" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ msg: error.message }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { matchId: string } }
) {
  try {
    await dbConnect(); // Ensure the database is connected
    const { matchId } = params;
    const data = await request.json();

    const db = admin.firestore();
    const matchPostFirebaseRef = db.collection("live_sessions");
    const match_date = new Date(data.match_date);
    const matchDocument = await matchPostFirebaseRef.doc(matchId).set({
      ...data,
      match_date: match_date,
    });
    await MatchPost.findOneAndUpdate(
      { firebase_match_id: matchId },
      {
        ...data,
      }
    );
    return NextResponse.json(
      { msg: "success", updateData: matchDocument },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ msg: error.message }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { matchId: string } }
) {
  try {
    await dbConnect(); // Ensure the database is connected
    const { matchId } = params;

    const db = admin.firestore();
    await db.collection("live_sessions").doc(matchId).delete();
    await MatchPost.findOneAndDelete({ firebase_match_id: matchId });

    return NextResponse.json({ msg: "success" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ msg: error.message }, { status: 500 });
  }
}
