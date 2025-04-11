import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("query");
    const lat = searchParams.get("lat");
    const lng = searchParams.get("lng");
    const radius = searchParams.get("radius") || "5000";

    if (!query) {
      return NextResponse.json(
        { error: "検索クエリが必要です" },
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

    let url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(
      query
    )}&type=park&key=${apiKey}&language=ja`;

    if (lat && lng) {
      url += `&location=${lat},${lng}&radius=${radius}`;
    }

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Google Places APIからのレスポンスが不正です");
    }

    const data = await response.json();

    if (data.status !== "OK") {
      return NextResponse.json(
        { error: data.error_message || "検索に失敗しました" },
        { status: 500 }
      );
    }

    return NextResponse.json({ results: data.results });
  } catch (error) {
    console.error("検索エラー:", error);
    return NextResponse.json({ error: "検索に失敗しました" }, { status: 500 });
  }
}
