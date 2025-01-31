import { getToken } from "next-auth/jwt";
import { NextResponse, NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  const url = new URL(req.url);

  const isPublicProfilePage =
    url.pathname.startsWith("/profile/") &&
    url.pathname.split("/").length === 3 &&
    !url.pathname.includes("/create-berita/") &&
    !url.pathname.includes("/manajemen-artikel/") &&
    !url.pathname.includes("/kelola-profile/");

  if (token && (url.pathname === "/signin" || url.pathname === "/register")) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (
    !token &&
    (url.pathname === "/profile" ||
      url.pathname.startsWith("/profile/create-berita") ||
      url.pathname.startsWith("/profile/manajemen-artikel") ||
      url.pathname.startsWith("/profile/kelola-profile"))
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

  if (isPublicProfilePage) {
    return NextResponse.next();
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
  matcher: ["/forum/:path*", "/signin", "/register", "/profile/:path*"],
};
