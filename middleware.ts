import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const COOKIE_NAME = "rails-doctor-token";
const SECRET_KEY = new TextEncoder().encode(
  process.env.JWT_SECRET ?? "rails-doctor-secret-key-change-in-production-2025"
);

async function isAuthenticated(token: string | undefined): Promise<boolean> {
  if (!token) return false;
  try {
    await jwtVerify(token, SECRET_KEY);
    return true;
  } catch {
    return false;
  }
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get(COOKIE_NAME)?.value;
  const authenticated = await isAuthenticated(token);

  if (pathname === "/") {
    return NextResponse.redirect(new URL("/home", req.url));
  }

  if (pathname === "/login") {
    const url = req.nextUrl.clone();
    url.pathname = "/home";
    return NextResponse.redirect(url);
  }

  const needsAuth =
    pathname === "/mc-rails" ||
    pathname === "/paujauran" ||
    pathname.startsWith("/mc-rails/dashboard") ||
    pathname.startsWith("/paujauran/dashboard");

  if (needsAuth && !authenticated) {
    const homeUrl = new URL("/home", req.url);
    homeUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(homeUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/home",
    "/login",
    "/mc-rails",
    "/paujauran",
    "/mc-rails/dashboard/:path*",
    "/paujauran/dashboard/:path*",
  ],
};
