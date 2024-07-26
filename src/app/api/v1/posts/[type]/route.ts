import dbConnect from "@/lib/dbConnect";
import Post from "@/models/Post";
import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";

export const dynamic = "force-dynamic"; // defaults to force-static

export async function GET(
  request: NextRequest,
  { params }: { params: { type: string } }
) {
  await dbConnect();

  const typeToQuery: {
    [key: string]: { dropdown: { $nin?: string[]; $in?: string[] } };
  } = {
    weeklies: {
      dropdown: { $nin: ["06", "07", "08", "09", "10"] },
    },
    appx: {
      dropdown: { $in: ["06", "07", "08"] },
    },
    gazette: {
      dropdown: { $in: ["09"] },
    },
    reportopolis: {
      dropdown: { $in: ["10"] },
    },
  };

  try {
    const { searchParams } = new URL(request.url);
    const limit = Number(searchParams.get("limit"));
    const page =
      Number(searchParams.get("page")) - 1 <= 0
        ? 0
        : Number(searchParams.get("page")) - 1;

    const type = params.type;

    if (!typeToQuery[type]) {
      throw new Error("Invalid type");
    }

    const query = typeToQuery[type];

    const post = await Post.find(query)
      .sort({ createdAt: -1 })
      .skip(page * limit)
      .limit(limit);
    return Response.json([...post]);
  } catch (error: any) {
    const myBlob = {
      success: false,
      msg: error.message,
    };
    const myOptions = { status: 400 };
    return Response.json(myBlob, myOptions);
  }
}
