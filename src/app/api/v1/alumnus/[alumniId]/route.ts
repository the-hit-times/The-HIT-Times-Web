import dbConnect from "@/lib/dbConnect";
import Alumnus from "@/models/Alumnus";
import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";

export const dynamic = "force-dynamic"; // defaults to force-static

export async function GET(
  request: NextRequest,
  { params }: { params: { alumniId: string } }
) {
  try {
    dbConnect();
    const alumni = await Alumnus.findById(params.alumniId);
    return Response.json({ data: alumni }, { status: 200 });
  } catch (error) {
    return Response.json(
      { success: false, msg: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { alumniId: string } }
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
    dbConnect();
    const data = await request.json();
    const alumni = await Alumnus.findByIdAndUpdate(params.alumniId, data, {
      new: true,
    });
    return Response.json({ success: true, data: alumni }, { status: 200 });
  } catch (error) {
    return Response.json(
      { success: false, msg: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { alumniId: string } }
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
    dbConnect();
    const alumni = await Alumnus.deleteOne({
      _id: params.alumniId,
    });
    return Response.json({ success: true }, { status: 200 });
  } catch (error) {
    return Response.json(
      { success: false, msg: "Internal Server Error" },
      { status: 500 }
    );
  }
}
