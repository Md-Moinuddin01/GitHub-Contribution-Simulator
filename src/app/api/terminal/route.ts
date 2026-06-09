import { NextResponse } from "next/server";
import { simulateTerminalCommand } from "@/lib/git-simulator";

export async function POST(request: Request) {
  const body = await request.json();
  return NextResponse.json({ output: simulateTerminalCommand(body.command, body.state) });
}
