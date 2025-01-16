import { getToken } from "next-auth/jwt";
import { NextResponse, NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  const url = new URL(req.url);

  if (token && (url.pathname === "/signin" || url.pathname === "/register")) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (!token && (url.pathname === "/signin" || url.pathname === "/register")) {
    return NextResponse.next();
  }
  if (
    req.nextUrl.pathname.startsWith("/profile") &&
    req.nextUrl.searchParams.has("preview")
  ) {
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/forum/:path*", "/profile/:path*", "/signin", "/register"],
};
