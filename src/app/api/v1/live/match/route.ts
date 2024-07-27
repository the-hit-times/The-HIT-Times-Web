import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect"; // Your database connection file
import MatchPost from "@/models/Match"; // Your MatchPost model
import admin from "@/lib/firebase";

export const dynamic = "force-dynamic"; // defaults to force-static

export async function GET(request: NextRequest) {
  try {
    await dbConnect(); // Ensure the database is connected

    const { searchParams } = new URL(request.url);
    const limit = Number(searchParams.get("limit"));
    const page =
      Number(searchParams.get("page")) - 1 <= 0
        ? 0
        : Number(searchParams.get("page")) - 1;

    const post = await MatchPost.find()
      .sort({
        is_live: -1,
        match_date: -1,
      })
      .skip(page * limit)
      .limit(limit);

    return NextResponse.json({ data: post, code: "success" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ msg: error.message }, { status: 500 });
  }
}
