// middleware.ts

import { NextResponse } from "next/server";
import { auth } from "./auth";

export default auth((req) => {
  if (!req.auth && req.nextUrl.pathname !== "/login" && req.nextUrl.pathname !== "/register") {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (req.auth && (req.nextUrl.pathname === "/login" || req.nextUrl.pathname === "/register")) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};