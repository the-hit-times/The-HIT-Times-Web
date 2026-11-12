import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const KNOWN_DRIVE_IDS = new Set([
  "1mIX6cQCOYcIBWHZVglwg1UMDMmT6LUaB", // Issue 12
  "1veba6c-gUBntMdCxoOeiTsQ42G1lEHWD", // Issue 11
  "1aGkUuleaTzujKY6XwoL8HLLfVJCCZNaN", // Issue 10
  "19R0ctZ-LhKZ1IeKrukeoh3UW41v-C6wK", // Issue 9
  "10qmuUj5wjXc9hNwl2Ufti8ciPN61DRIt", // Issue 7
  "1-bYArvJOkEIDpdXsiBNy0ytExBORAUIM", // Issue 6
  "1mmXAH5GmZJ60P51dOtugnjmQMdJr5DyC", // Issue 5
  "1Vb8aXIpXgdVlFrBL_q6u9_JvVlHvLQeq", // Issue 4
  "1mYZm3aN7f4wc3a4kI4g0Ku8sTEsFewog", // Issue 3
  "1aUrkYqHeodrx9MrnjpaKqQSf1o9f_JxV", // Issue 2
  "1bh226035gJwsREEfF0BddWCdfajhsd-F", // Issue 1
]);

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id || !KNOWN_DRIVE_IDS.has(id)) {
    return NextResponse.json({ error: "Invalid or unauthorized tabloid ID" }, { status: 400 });
  }

  const driveUrl = `https://drive.usercontent.google.com/download?id=${id}&export=download`;

  const headers: Record<string, string> = {};
  const rangeHeader = request.headers.get("range");
  if (rangeHeader) {
    headers["range"] = rangeHeader;
  }

  try {
    const upstreamRes = await fetch(driveUrl, {
      headers,
      cache: "force-cache",
    });

    if (!upstreamRes.ok && upstreamRes.status !== 206) {
      return NextResponse.json(
        { error: "Failed to fetch PDF from storage", status: upstreamRes.status },
        { status: upstreamRes.status }
      );
    }

    const responseHeaders = new Headers();
    responseHeaders.set("Content-Type", "application/pdf");
    responseHeaders.set("Access-Control-Allow-Origin", "*");
    responseHeaders.set("Cache-Control", "public, max-age=86400, stale-while-revalidate=604800");

    const acceptRanges = upstreamRes.headers.get("accept-ranges");
    if (acceptRanges) responseHeaders.set("Accept-Ranges", acceptRanges);

    const contentRange = upstreamRes.headers.get("content-range");
    if (contentRange) responseHeaders.set("Content-Range", contentRange);

    const contentLength = upstreamRes.headers.get("content-length");
    if (contentLength) responseHeaders.set("Content-Length", contentLength);

    return new Response(upstreamRes.body, {
      status: upstreamRes.status,
      headers: responseHeaders,
    });
  } catch (error) {
    console.error("PDF proxy error:", error);
    return NextResponse.json({ error: "Internal server error fetching PDF" }, { status: 500 });
  }
}
