import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    provider: process.env.NEXT_PUBLIC_SUPABASE_URL ? "supabase-realtime" : "local-custom-events",
    channel: "simulator-activity",
  });
}
