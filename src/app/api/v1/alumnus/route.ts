import dbConnect from "@/lib/dbConnect";
import Alumnus from "@/models/Alumnus";
import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";

export const dynamic = "force-dynamic"; // defaults to force-static

export async function GET(request: NextRequest) {
  try {
    dbConnect();
    const { searchParams } = new URL(request.url);
    const limit = Number(searchParams.get("limit"));
    const page =
      Number(searchParams.get("page")) - 1 <= 0
        ? 0
        : Number(searchParams.get("page")) - 1;

    const startSession = searchParams.get("startSession");
    const endSession = searchParams.get("endSession");

    var query = {};

    if (startSession && endSession) {
      query = {
        session_end: { $gte: startSession, $lte: endSession },
      };
    }

    const alumni = await Alumnus.find(query)
      .sort({
        session_end: -1,
      })
      .skip(page * limit)
      .limit(limit);

    return Response.json({ code: "success", data: alumni }, { status: 200 });
  } catch (error) {
    console.log(error);
    return Response.json(
      { success: false, msg: "Internal Server Error" },
      { status: 500 }
    );
  }
}

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
    dbConnect();
    const data = await request.json();
    const alumni = await Alumnus.create(data);
    return Response.json({ success: true, data: alumni }, { status: 200 });
  } catch (error) {
    return Response.json(
      { success: false, msg: "Internal Server Error" },
      { status: 500 }
    );
  }
}
