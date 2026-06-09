import { NextResponse } from "next/server";
import { reviewPullRequest } from "@/lib/ai-review";
import { tryDb } from "@/lib/db";

export async function POST(request: Request, { params }: { params: { id: string } }) {
  const body = await request.json();
  const review = await reviewPullRequest(body);

  await tryDb(
    (db) =>
      db.pullRequest.update({
        where: { id: params.id },
        data: {
          status: review.decision === "APPROVE" ? "APPROVED" : "CHANGES_REQUESTED",
          reviews: {
            create: {
              reviewerName: review.reviewerName,
              decision: review.decision,
              summary: review.summary,
              lineComments: review.lineComments,
              score: review.score,
            },
          },
        },
      }),
    null,
  );

  return NextResponse.json(review);
}
