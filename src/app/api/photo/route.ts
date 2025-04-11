import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const reference = searchParams.get("reference");
    const width = searchParams.get("width") || "400";

    if (!reference) {
      return NextResponse.json(
        { error: "写真の参照が必要です" },
        { status: 400 }
      );
    }

    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "APIキーが設定されていません" },
        { status: 500 }
      );
    }

    const photoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=${width}&photo_reference=${reference}&key=${apiKey}`;

    const response = await fetch(photoUrl);
    if (!response.ok) {
      throw new Error("写真の取得に失敗しました");
    }

    const imageBuffer = await response.arrayBuffer();
    const contentType = response.headers.get("content-type") || "image/jpeg";

    return new NextResponse(imageBuffer, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000",
      },
    });
  } catch (error) {
    console.error("写真取得エラー:", error);
    return NextResponse.json(
      { error: "写真の取得に失敗しました" },
      { status: 500 }
    );
  }
}
