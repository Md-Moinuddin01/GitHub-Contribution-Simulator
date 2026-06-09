import { NextResponse } from "next/server";

export function GET(request: Request) {
  const host = request.headers.get("host") ?? "localhost:3000";
  const protocol = request.headers.get("x-forwarded-proto") ?? "http";
  const response = NextResponse.redirect(new URL("/dashboard", `${protocol}://${host}`));

  response.cookies.set("simulator-auth", "maya", {
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
    sameSite: "lax",
  });

  return response;
}
