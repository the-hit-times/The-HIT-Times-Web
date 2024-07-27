import dbConnect from "@/lib/dbConnect";
import Post from "@/models/Post";
import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";

export const dynamic = "force-dynamic"; // defaults to force-static

export async function GET(request: NextRequest) {
  await dbConnect();
  try {
    const { searchParams } = new URL(request.url);
    const limit = Number(searchParams.get("limit"));
    const page =
      Number(searchParams.get("page")) - 1 <= 0
        ? 0
        : Number(searchParams.get("page")) - 1;

    const query: { [key: string]: string } = {};
    const keys = Object.keys(Post.schema.paths);

    if ("_id" in keys) {
      const post = await Post.findById(searchParams.get("_id"));
      return Response.json(post);
    }

    keys.forEach((key) => {
      const value = searchParams.get(key);
      if (value) {
        query[key] = value;
      }
    });

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

    const post = await Post.create(data);
    const myBlob = {
      success: true,
      postId: post._id,
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
