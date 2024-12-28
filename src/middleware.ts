import { NextResponse } from "next/server";
import NextAuth from "next-auth";

import authConfig from "@/lib/auth-config";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isAuthenticated = !!req.auth;

  const isPrivateRoute = nextUrl.pathname === "/documentos" || nextUrl.pathname.startsWith("/c/");
  const isLoginRoute = nextUrl.pathname === "/login";

  if (isPrivateRoute && !isAuthenticated) {
    return Response.redirect(new URL("/login", nextUrl));
  }

  if (isLoginRoute && isAuthenticated) {
    return Response.redirect(new URL("/documentos", nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/documentos", "/c/:path*", "/login"],
};