import dbConnect from "@/lib/dbConnect";
import Post from "@/models/Post";
import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";

export const dynamic = "force-dynamic"; // defaults to force-static

export async function GET(
  request: NextRequest,
  { params }: { params: { postId: string } }
) {
  await dbConnect();

  try {
    const postId = params.postId;

    const post = await Post.findById(postId);

    if (!post) {
      throw new Error("Post not found");
    }

    return Response.json({ code: "success", data: post });
  } catch (error: any) {
    const myBlob = {
      success: false,
      msg: error.message,
    };
    const myOptions = { status: 400 };
    return Response.json(myBlob, myOptions);
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { postId: string } }
) {
  await dbConnect();
  try {
    const postId = params.postId;
    const post = await Post.findByIdAndDelete(postId);
    if (!post) {
      throw new Error("Post not found");
    }
    return Response.json({ success: true });
  } catch (error: any) {
    const myBlob = {
      success: false,
      msg: error.message,
    };
    const myOptions = { status: 400 };
    return Response.json(myBlob, myOptions);
  }
}
