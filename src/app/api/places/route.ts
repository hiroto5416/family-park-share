import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const lat = searchParams.get("lat");
    const lng = searchParams.get("lng");

    if (!lat || !lng) {
      return NextResponse.json(
        { error: "緯度と経度が必要です" },
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

    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=5000&type=park&key=${apiKey}&language=ja`
    );

    if (!response.ok) {
      throw new Error("Google Places APIからのレスポンスが不正です");
    }

    const data = await response.json();

    if (data.status !== "OK") {
      return NextResponse.json(
        { error: data.error_message || "公園データの取得に失敗しました" },
        { status: 500 }
      );
    }

    return NextResponse.json({ parks: data.results });
  } catch (error) {
    console.error("公園データ取得エラー:", error);
    return NextResponse.json(
      { error: "公園データの取得に失敗しました" },
      { status: 500 }
    );
  }
}
