import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { DEMO_COOKIE_NAME, generateSessionToken } from "./lib/auth";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow static assets, next internal files, and favicon
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api/auth") ||
    pathname === "/login" ||
    pathname === "/favicon.ico" ||
    pathname.includes(".") // static files like .svg, .png, etc.
  ) {
    return NextResponse.next();
  }

  const sessionCookie = request.cookies.get(DEMO_COOKIE_NAME)?.value;
  const validToken = generateSessionToken();

  if (!sessionCookie || sessionCookie !== validToken) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
