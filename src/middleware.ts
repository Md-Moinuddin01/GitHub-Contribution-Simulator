import { NextResponse, type NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

const protectedPaths = ["/dashboard", "/editor", "/admin"];

export async function middleware(request: NextRequest) {
  const isProtected = protectedPaths.some((path) => request.nextUrl.pathname.startsWith(path));
  if (!isProtected) return NextResponse.next();

  const localSession = request.cookies.get("simulator-auth")?.value;
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
  if (localSession || token) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = "/auth/login";
  url.searchParams.set("next", request.nextUrl.pathname);
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/dashboard/:path*", "/editor/:path*", "/admin/:path*"],
};
