import dbConnect from "@/lib/dbConnect";
import Team from "@/models/Team";
import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";

export const dynamic = "force-dynamic"; // defaults to force-static

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
    await dbConnect();

    const data = await request.json();

    const team = await Team.create(data);
    const myBlob = {
      success: true,
      teamId: team._id,
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
