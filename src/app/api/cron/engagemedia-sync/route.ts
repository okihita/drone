import { NextRequest, NextResponse } from "next/server";
import { syncEngageMediaContent } from "@/services/engagemedia-sync";

export const maxDuration = 60; // Max execution time for Vercel Serverless Function (60s)
export const dynamic = "force-dynamic";

async function handleSync(req: NextRequest) {
  const cronSecret = process.env.CRON_SECRET;
  
  // Security check: If CRON_SECRET is set, validate Bearer token
  if (cronSecret) {
    const authHeader = req.headers.get("authorization");
    if (!authHeader || authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json(
        { error: "Unauthorized. Invalid or missing CRON_SECRET bearer token." },
        { status: 401 }
      );
    }
  } else {
    console.warn("⚠️ CRON_SECRET is not configured. Running in unauthenticated mode (Dev default).");
  }

  try {
    const report = await syncEngageMediaContent(30);
    return NextResponse.json(
      {
        message: "EngageMedia content sync execution completed.",
        timestamp: new Date().toISOString(),
        report,
      },
      { status: report.success ? 200 : 500 }
    );
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    return NextResponse.json(
      {
        error: "Fatal error executing EngageMedia sync pipeline",
        details: errorMsg,
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  return handleSync(req);
}

export async function POST(req: NextRequest) {
  return handleSync(req);
}
