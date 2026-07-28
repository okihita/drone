import { NextRequest, NextResponse } from "next/server";
import { searchPoliciesServer } from "@/services/policies";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q") || "";
  const category = searchParams.get("category") || "";

  try {
    const data = await searchPoliciesServer({ q, category });
    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "s-maxage=300, stale-while-revalidate=60",
        "Server-Timing": "cache;desc=MISS",
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    );
  }
}
