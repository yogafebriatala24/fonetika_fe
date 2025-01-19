import { getToken } from "next-auth/jwt";
import { NextResponse, NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  const url = new URL(req.url);

  const isPublicProfilePage =
    url.pathname.startsWith("/profile/") &&
    url.pathname.split("/").length === 3 &&
    !url.pathname.includes("/create-berita") &&
    !url.pathname.includes("/edit-profile");

  if (token && (url.pathname === "/signin" || url.pathname === "/register")) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (
    !token &&
    (url.pathname === "/profile" || url.pathname.startsWith("/profile/"))
  ) {
    return NextResponse.redirect(new URL("/signin", req.url));
  }
  if (
    !token &&
    (url.pathname === "/forum" || url.pathname.startsWith("/forum"))
  ) {
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  if (!token && (url.pathname === "/signin" || url.pathname === "/register")) {
    return NextResponse.next();
  }

  if (!token && url.pathname.startsWith("/profile/") && !isPublicProfilePage) {
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  if (
    req.nextUrl.pathname.startsWith("/profile") &&
    req.nextUrl.searchParams.has("preview")
  ) {
    return NextResponse.next();
  }
  if (
    req.nextUrl.pathname.startsWith("/forum") &&
    req.nextUrl.searchParams.has("preview")
  ) {
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/forum/:path*", "/profile/:path*", "/signin", "/register"],
};
