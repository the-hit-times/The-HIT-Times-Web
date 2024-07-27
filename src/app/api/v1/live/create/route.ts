import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import admin from "@/lib/firebase"; // Make sure to initialize Firebase admin in this file
import dbConnect from "@/lib/dbConnect"; // Your database connection file
import MatchPost from "@/models/Match"; // Your MatchPost model

const matchPostFirebaseRef = admin.firestore().collection("live_sessions"); // Your Firestore collection reference

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
    await dbConnect(); // Ensure the database is connected
    const data = await request.json();
    const match_date = new Date(data.match_date);

    const matchDocument = await matchPostFirebaseRef.add({
      ...data,
      match_date: match_date,
    });

    await MatchPost.create({
      ...data,
      firebase_match_id: matchDocument.id,
      match_date: match_date,
      timeline: [],
    });

    return NextResponse.json(
      { success: true, msg: "success", matchId: matchDocument.id },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, msg: error.message },
      { status: 400 }
    );
  }
}
