import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect"; // Your database connection file
import MatchPost from "@/models/Match"; // Your MatchPost model

export async function GET(request: NextRequest) {
  try {
    await dbConnect(); // Ensure the database is connected
    const count = await MatchPost.find({ is_live: true }).countDocuments();
    return NextResponse.json({ count: count }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ msg: error.message }, { status: 500 });
  }
}
