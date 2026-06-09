import { NextResponse } from "next/server";
import { issues } from "@/lib/demo-data";
import { tryDb } from "@/lib/db";

export async function POST(_request: Request, { params }: { params: { id: string } }) {
  const issue = issues.find((item) => item.id === params.id);
  const result = await tryDb(
    (db) =>
      db.issue.update({
        where: { id: params.id },
        data: { status: "ASSIGNED" },
      }),
    { ...issue, status: "Assigned" },
  );

  return NextResponse.json(result);
}
