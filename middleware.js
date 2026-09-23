import { NextResponse } from "next/server";
import { verifyToken, COOKIE_NAME } from "@/lib/auth";

// Runs on the edge, so the token is verified with jose (not jsonwebtoken)
// and no database call happens here.
export async function middleware(request) {
  const token = request.cookies.get(COOKIE_NAME)?.value;
  const session = await verifyToken(token);
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/dashboard") && !session) {
    const url = new URL("/login", request.url);
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  if (pathname === "/login" && session) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login"]
};
