import { getToken } from "next-auth/jwt";
import { NextResponse, NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (token) {
    const url = new URL(req.url);

    if (url.pathname === "/signin" || url.pathname === "/register") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }
  if (!token) {
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/forum/:path*", "/profile/:path*", "/signin", "/register"],
};
