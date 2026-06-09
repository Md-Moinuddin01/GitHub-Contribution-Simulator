import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { content } = await request.json();
  const valid =
    typeof content === "string" &&
    !content.includes("<<<<<<<") &&
    !content.includes("=======") &&
    !content.includes(">>>>>>>") &&
    content.includes("const title");

  return NextResponse.json({
    valid,
    message: valid ? "Conflict resolved cleanly." : "Remove all conflict markers and keep one valid title assignment.",
  });
}
