import { NextResponse } from "next/server";
import { pullRequests } from "@/lib/demo-data";
import { tryDb } from "@/lib/db";

export async function GET() {
  const prs = await tryDb(
    (db) =>
      db.pullRequest.findMany({
        include: { commits: true, reviews: true },
        orderBy: { updatedAt: "desc" },
      }),
    pullRequests,
  );
  return NextResponse.json(prs);
}

export async function POST(request: Request) {
  const body = await request.json();
  const created = await tryDb(
    (db) =>
      db.pullRequest.create({
        data: {
          number: body.number ?? Math.floor(Math.random() * 900) + 100,
          repositoryId: body.repositoryId,
          issueId: body.issueId,
          authorId: body.authorId,
          title: body.title,
          description: body.description,
          sourceBranch: body.sourceBranch,
          targetBranch: body.targetBranch ?? "main",
          status: "OPEN",
          checklist: body.checklist ?? [],
          changedFiles: body.changedFiles ?? [],
        },
      }),
    { ...body, id: `local-pr-${Date.now()}`, status: "Open" },
  );
  return NextResponse.json(created);
}
