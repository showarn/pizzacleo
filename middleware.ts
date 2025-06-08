import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyJwt } from "@/lib/jwt";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/admin")) {
    const token = req.cookies.get("token")?.value;
    console.log("Middleware - token:", token);

    if (!token) {
      console.log("Middleware - Ingen token");
      return NextResponse.redirect(new URL("/login", req.url));
    }

    const payload = verifyJwt(token);
    console.log("Middleware - verifierad payload:", payload);

    if (!payload || (payload as any).role !== "admin") {
      console.log("Middleware - ogiltig payload eller icke-admin");
      return NextResponse.redirect(new URL("/login", req.url));
    }

    console.log("Middleware - access granted");
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
