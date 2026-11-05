import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Force HTTPS in production (behind a proxy/CDN that sets x-forwarded-proto).
export function proxy(request: NextRequest) {
  const host = request.nextUrl.hostname;
  const local = host === "localhost" || host === "127.0.0.1";
  if (process.env.NODE_ENV === "production" && !local && request.headers.get("x-forwarded-proto") === "http") {
    const url = request.nextUrl.clone();
    url.protocol = "https:";
    url.port = "";
    return NextResponse.redirect(url, 308);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
