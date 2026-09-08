import { randomUUID } from "crypto";
import { NextResponse } from "next/server";
import ImageKit from "imagekit";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const publicKey = process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY;
    const urlEndpoint = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT;
    const privateKey = process.env.IMAGEKIT_PRIVATE_KEY;

    if (!publicKey || !urlEndpoint || !privateKey) {
      console.error("Missing ImageKit environment variables");
      return NextResponse.json(
        { error: "ImageKit configuration is missing on the server" },
        { status: 500 }
      );
    }

    const imagekit = new ImageKit({
      publicKey,
      privateKey,
      urlEndpoint,
    });

    const authenticationParameters = imagekit.getAuthenticationParameters(
      randomUUID(),
    );
    return NextResponse.json({...authenticationParameters, publicKey}, {
      status: 200,
      headers: { "Cache-Control": "no-store" },
    });
  } catch (error: any) {
    console.error("Error generating ImageKit authentication parameters:", error);
    return NextResponse.json(
      { error: error.message || "Failed to generate authentication parameters" },
      { status: 500 }
    );
  }
}
