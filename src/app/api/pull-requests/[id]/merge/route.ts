import { NextResponse } from "next/server";
import { tryDb } from "@/lib/db";

export async function POST(_request: Request, { params }: { params: { id: string } }) {
  const merged = await tryDb(
    (db) =>
      db.pullRequest.update({
        where: { id: params.id },
        data: { status: "MERGED", mergedAt: new Date() },
      }),
    { id: params.id, status: "Merged", mergedAt: new Date().toISOString() },
  );

  return NextResponse.json(merged);
}
