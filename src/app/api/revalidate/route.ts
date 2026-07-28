import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

const SECRET = process.env.REVALIDATION_SECRET || process.env.NEXT_PUBLIC_REVALIDATION_SECRET || "drone-revalidate-secret";

/**
 * ISR revalidation webhook.
 * POST /api/revalidate?tag=policies&secret=...
 * Can be triggered by Supabase database webhooks on INSERT/UPDATE/DELETE.
 */
export async function POST(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const tag = searchParams.get("tag");
  const secret = searchParams.get("secret");

  if (secret !== SECRET) {
    return NextResponse.json({ error: "Invalid secret" }, { status: 401 });
  }

  if (!tag) {
    return NextResponse.json({ error: "Missing tag parameter" }, { status: 400 });
  }

  try {
    revalidateTag(tag, "max");
    return NextResponse.json({ revalidated: true, tag });
  } catch (err) {
    return NextResponse.json(
      { revalidated: false, error: String(err) },
      { status: 500 },
    );
  }
}
