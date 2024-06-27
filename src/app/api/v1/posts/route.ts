import dbConnect from "@/lib/dbConnect";
import Post from "@/models/Post";

export const dynamic = "force-dynamic"; // defaults to force-static

export async function GET(request: Request) {
  await dbConnect();
  try {
    const { searchParams } = new URL(request.url);
    const limit = Number(searchParams.get("limit"));
    const page =
      Number(searchParams.get("page")) - 1 <= 0
        ? 0
        : Number(searchParams.get("page")) - 1;

    const post = await Post.find()
      .sort({ createdAt: -1 })
      .skip(page * limit)
      .limit(limit);
    return Response.json({ post });
  } catch (error: any) {
    const myBlob = {
      success: false,
      msg: error.message,
    };
    const myOptions = { status: 400 };
    return Response.json(myBlob, myOptions);
  }
}

export async function POST(request: Request) {
  return Response.json({ message: "POST request", request: request });
}
