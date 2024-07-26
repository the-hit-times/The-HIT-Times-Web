import dbConnect from "@/lib/dbConnect";
import Team from "@/models/Team";
import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";

export const dynamic = "force-dynamic"; // defaults to force-static

export async function GET(
  request: NextRequest,
  { params }: { params: { teamCode: string } }
) {
  await dbConnect();
  try {
    const team = await Team.findOne({ team_code: params.teamCode });

    if (team === null) {
      return Response.json(
        { success: false, msg: "Team not found" },
        { status: 404 }
      );
    }
    const myBlob = {
      code: "success",
      data: team,
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

export async function PUT(
  request: NextRequest,
  { params }: { params: { teamCode: string } }
) {
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

    // delete _id from data

    delete data._id;
    
    let team = await Team.findOneAndUpdate(
      { team_code: params.teamCode },
      data,
      { new: true }
    );
    if (team === null) {
      team = await Team.create({ ...data, team_code: params.teamCode });

    }
    const myBlob = {
      code: "success",
      data: team,
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
