import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect"; // Your database connection file
import MatchPost from "@/models/Match"; // Your MatchPost model

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
